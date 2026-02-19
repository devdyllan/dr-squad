/**
 * mcp-server.js
 * MCP Server — exposes browser automation tools to Claude Code.
 *
 * Tools exposed:
 *   browser_open_session   — opens a browser for a specific persona alias
 *   browser_navigate       — navigates to a URL
 *   browser_click          — clicks an element (CSS selector or text)
 *   browser_type           — types text with human-like timing
 *   browser_scroll         — scrolls the page
 *   browser_screenshot     — captures a screenshot and saves it
 *   browser_get_text       — extracts text from the page or an element
 *   browser_close_session  — closes session and writes isolation report
 *
 * All actions are logged to data/contingency/farming-logs/ automatically.
 * Session limits are enforced — throws SessionLimitError at 25 actions.
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import { openSession } from "./session-manager.js";
import { actionDelay, humanType, humanScroll } from "./human-timing.js";
import { logAction, logPlatformSignal } from "./action-logger.js";
import { validateAllProxies } from "./proxy-config.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "../..");
const SCREENSHOTS_DIR = path.join(REPO_ROOT, "data/contingency/farming-logs/screenshots");

// ── Validate proxies at startup ───────────────────────────────
try {
  validateAllProxies();
  console.error("[DR Squad Browser MCP] All proxies configured. Starting server...");
} catch (err) {
  console.error(`[DR Squad Browser MCP] STARTUP BLOCKED: ${err.message}`);
  process.exit(1);
}

// ── Active sessions (one per persona at a time) ───────────────
const sessions = {}; // browserAlias → { page, browser, limiter, close, assetAlias, taskId }

// ── MCP Server ────────────────────────────────────────────────
const server = new McpServer({
  name: "dr-squad-browser",
  version: "1.0.0",
});

// ── Tool: browser_open_session ────────────────────────────────
server.tool(
  "browser_open_session",
  "Opens an isolated browser session for a Contingency Squad persona. Verifies isolation before opening.",
  {
    browser_alias: z.string().describe("Browser profile alias from asset-registry.yaml. e.g. BROWSER_META_ADV_01"),
    asset_alias: z.string().describe("Facebook profile alias this session is for. e.g. FBPRO_ADV_01"),
    task_id: z.string().describe("Task Packet ID authorizing this session. e.g. TP-CONT-001"),
    max_actions: z.number().optional().describe("Max sequential actions before session must close. Default: 25"),
  },
  async ({ browser_alias, asset_alias, task_id, max_actions }) => {
    if (sessions[browser_alias]) {
      return { content: [{ type: "text", text: `ERROR: Session for ${browser_alias} is already open. Close it first.` }] };
    }
    try {
      const session = await openSession({
        browserAlias: browser_alias,
        assetAlias: asset_alias,
        taskId: task_id,
        maxActions: max_actions ?? 25,
      });
      sessions[browser_alias] = { ...session, assetAlias: asset_alias, taskId: task_id };
      return {
        content: [{ type: "text", text: `Session opened for ${browser_alias} (${asset_alias}). Isolation: CLEAR. Ready for actions.` }],
      };
    } catch (err) {
      return { content: [{ type: "text", text: `SESSION BLOCKED: ${err.message}` }] };
    }
  }
);

// ── Tool: browser_navigate ─────────────────────────────────────
server.tool(
  "browser_navigate",
  "Navigates to a URL in the open session. Applies human-like delay before and after.",
  {
    browser_alias: z.string(),
    url: z.string().describe("Full URL to navigate to"),
    wait_for: z.enum(["load", "networkidle", "domcontentloaded"]).optional().describe("Default: networkidle"),
  },
  async ({ browser_alias, url, wait_for = "networkidle" }) => {
    const s = sessions[browser_alias];
    if (!s) return noSession(browser_alias);
    try {
      s.limiter.check(`navigate to ${url}`);
      await actionDelay();
      await s.page.goto(url, { waitUntil: wait_for, timeout: 30000 });
      await actionDelay(1000, 3000);
      const title = await s.page.title();
      logAction({ assetAlias: s.assetAlias, taskId: s.taskId, action: `NAVIGATE: ${url}`, notes: `title: ${title}` });
      return { content: [{ type: "text", text: `Navigated to ${url}. Page title: "${title}". ${s.limiter.summary()}` }] };
    } catch (err) {
      return handleError(err, browser_alias, s, `navigate to ${url}`);
    }
  }
);

// ── Tool: browser_click ────────────────────────────────────────
server.tool(
  "browser_click",
  "Clicks an element by CSS selector or visible text. Waits for element, applies human-like delay.",
  {
    browser_alias: z.string(),
    selector: z.string().describe("CSS selector or text content to click. For text: use 'text=Button Label'"),
  },
  async ({ browser_alias, selector }) => {
    const s = sessions[browser_alias];
    if (!s) return noSession(browser_alias);
    try {
      s.limiter.check(`click ${selector}`);
      await actionDelay();
      await s.page.waitForSelector(selector, { timeout: 10000 });
      await s.page.click(selector);
      logAction({ assetAlias: s.assetAlias, taskId: s.taskId, action: `CLICK: ${selector}` });
      return { content: [{ type: "text", text: `Clicked: ${selector}. ${s.limiter.summary()}` }] };
    } catch (err) {
      return handleError(err, browser_alias, s, `click ${selector}`);
    }
  }
);

// ── Tool: browser_type ─────────────────────────────────────────
server.tool(
  "browser_type",
  "Types text into an input field with human-like character-by-character timing.",
  {
    browser_alias: z.string(),
    selector: z.string().describe("CSS selector of the input field"),
    text: z.string().describe("Text to type"),
    clear_first: z.boolean().optional().describe("Clear the field before typing. Default: false"),
  },
  async ({ browser_alias, selector, text, clear_first = false }) => {
    const s = sessions[browser_alias];
    if (!s) return noSession(browser_alias);
    try {
      s.limiter.check(`type into ${selector}`);
      await actionDelay();
      if (clear_first) await s.page.fill(selector, "");
      await humanType(s.page, selector, text);
      logAction({ assetAlias: s.assetAlias, taskId: s.taskId, action: `TYPE into ${selector}`, notes: `${text.length} chars` });
      return { content: [{ type: "text", text: `Typed ${text.length} characters into ${selector}. ${s.limiter.summary()}` }] };
    } catch (err) {
      return handleError(err, browser_alias, s, `type into ${selector}`);
    }
  }
);

// ── Tool: browser_scroll ───────────────────────────────────────
server.tool(
  "browser_scroll",
  "Scrolls the page in a human-like manner.",
  {
    browser_alias: z.string(),
    pixels: z.number().optional().describe("Pixels to scroll down. Default: 400"),
  },
  async ({ browser_alias, pixels = 400 }) => {
    const s = sessions[browser_alias];
    if (!s) return noSession(browser_alias);
    try {
      s.limiter.check("scroll");
      await humanScroll(s.page, pixels);
      logAction({ assetAlias: s.assetAlias, taskId: s.taskId, action: `SCROLL: ${pixels}px` });
      return { content: [{ type: "text", text: `Scrolled ${pixels}px. ${s.limiter.summary()}` }] };
    } catch (err) {
      return handleError(err, browser_alias, s, "scroll");
    }
  }
);

// ── Tool: browser_screenshot ───────────────────────────────────
server.tool(
  "browser_screenshot",
  "Takes a screenshot of the current page and saves it to the farming log.",
  {
    browser_alias: z.string(),
    label: z.string().describe("Short description for the screenshot filename. e.g. 'profile-created'"),
  },
  async ({ browser_alias, label }) => {
    const s = sessions[browser_alias];
    if (!s) return noSession(browser_alias);
    try {
      if (!fs.existsSync(SCREENSHOTS_DIR)) fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
      const filename = `${new Date().toISOString().slice(0,19).replace(/:/g,"-")}_${browser_alias}_${label}.png`;
      const filepath = path.join(SCREENSHOTS_DIR, filename);
      await s.page.screenshot({ path: filepath, fullPage: false });
      logAction({ assetAlias: s.assetAlias, taskId: s.taskId, action: `SCREENSHOT: ${label}`, notes: filename });
      return { content: [{ type: "text", text: `Screenshot saved: ${filename}` }] };
    } catch (err) {
      return handleError(err, browser_alias, s, `screenshot ${label}`);
    }
  }
);

// ── Tool: browser_get_text ─────────────────────────────────────
server.tool(
  "browser_get_text",
  "Extracts visible text from the page or a specific element.",
  {
    browser_alias: z.string(),
    selector: z.string().optional().describe("CSS selector to extract from. Omit for full page text."),
  },
  async ({ browser_alias, selector }) => {
    const s = sessions[browser_alias];
    if (!s) return noSession(browser_alias);
    try {
      let text;
      if (selector) {
        await s.page.waitForSelector(selector, { timeout: 5000 });
        text = await s.page.textContent(selector);
      } else {
        text = await s.page.evaluate(() => document.body.innerText);
      }
      logAction({ assetAlias: s.assetAlias, taskId: s.taskId, action: `GET_TEXT: ${selector ?? "full page"}` });
      return { content: [{ type: "text", text: (text ?? "").slice(0, 3000) }] };
    } catch (err) {
      return handleError(err, browser_alias, s, `get text from ${selector}`);
    }
  }
);

// ── Tool: browser_close_session ───────────────────────────────
server.tool(
  "browser_close_session",
  "Closes the browser session cleanly and writes post-session isolation report.",
  {
    browser_alias: z.string(),
  },
  async ({ browser_alias }) => {
    const s = sessions[browser_alias];
    if (!s) return { content: [{ type: "text", text: `No open session for ${browser_alias}.` }] };
    await s.close();
    delete sessions[browser_alias];
    return { content: [{ type: "text", text: `Session closed for ${browser_alias}. Isolation report written.` }] };
  }
);

// ── Helpers ────────────────────────────────────────────────────

function noSession(alias) {
  return { content: [{ type: "text", text: `No open session for ${alias}. Call browser_open_session first.` }] };
}

function handleError(err, browserAlias, session, action) {
  const isLimit = err.name === "SessionLimitError";
  if (isLimit) {
    logAction({
      assetAlias: session.assetAlias,
      taskId: session.taskId,
      action: `SESSION_LIMIT_REACHED — attempted: ${action}`,
      sessionStatus: "MUST_CLOSE",
    });
    return { content: [{ type: "text", text: `SESSION LIMIT: ${err.message}` }] };
  }
  logAction({
    assetAlias: session.assetAlias,
    taskId: session.taskId,
    action: `ERROR during ${action}: ${err.message}`,
    platformResponse: "ERROR",
    sessionStatus: "DEGRADED",
  });
  return { content: [{ type: "text", text: `ERROR: ${err.message}` }] };
}

// ── Start transport ────────────────────────────────────────────
const transport = new StdioServerTransport();
await server.connect(transport);
