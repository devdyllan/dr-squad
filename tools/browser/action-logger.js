/**
 * action-logger.js
 * Writes append-only farming logs for every browser action taken.
 * Required by Contingency Squad DNA v2.0 — all actions must be logged.
 *
 * Log format (per TP-CONT-001):
 *   asset_alias | action | timestamp | platform_response | session_status
 *
 * Files written to: data/contingency/farming-logs/YYYY-MM-DD_[ASSET-ALIAS]_FARM.md
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "../..");
const LOG_DIR = path.join(REPO_ROOT, "data/contingency/farming-logs");

function todayString() {
  return new Date().toISOString().slice(0, 10);
}

function timestamp() {
  return new Date().toISOString();
}

/**
 * Appends a log entry to the farming log for a specific asset alias.
 */
export function logAction({
  assetAlias,
  taskId,
  action,
  platformResponse = "OK",
  sessionStatus = "ACTIVE",
  notes = "",
}) {
  const date = todayString();
  const logFile = path.join(LOG_DIR, `${date}_${assetAlias}_FARM.md`);

  const entry = [
    `| ${timestamp()} | ${taskId} | ${assetAlias} | ${action} | ${platformResponse} | ${sessionStatus} | ${notes} |`,
  ].join("\n");

  // Create file with header if it doesn't exist
  if (!fs.existsSync(logFile)) {
    const header = [
      `# Asset Farming Log — ${assetAlias}`,
      `**Date:** ${date}`,
      `**Task ID:** ${taskId}`,
      "",
      "| Timestamp | Task ID | Asset Alias | Action | Platform Response | Session Status | Notes |",
      "|---|---|---|---|---|---|---|",
      "",
    ].join("\n");
    fs.writeFileSync(logFile, header, "utf8");
  }

  fs.appendFileSync(logFile, entry + "\n", "utf8");
}

/**
 * Logs a session open event.
 */
export function logSessionOpen({ assetAlias, taskId, browserAlias, proxyDesignation }) {
  logAction({
    assetAlias,
    taskId,
    action: `SESSION_OPEN — browser: ${browserAlias}, proxy: ${proxyDesignation}`,
    platformResponse: "OK",
    sessionStatus: "OPEN",
  });
}

/**
 * Logs a session close event with summary.
 */
export function logSessionClose({ assetAlias, taskId, actionCount, elapsedSeconds, isolationStatus }) {
  logAction({
    assetAlias,
    taskId,
    action: `SESSION_CLOSE — ${actionCount} actions in ${elapsedSeconds}s`,
    platformResponse: "OK",
    sessionStatus: "CLOSED",
    notes: `isolation_post_check: ${isolationStatus}`,
  });
}

/**
 * Logs a platform signal (verification request, checkpoint, policy notice).
 * These are high-priority — session must stop immediately after logging.
 */
export function logPlatformSignal({ assetAlias, taskId, signalType, signalText }) {
  logAction({
    assetAlias,
    taskId,
    action: `PLATFORM_SIGNAL_DETECTED — ${signalType}`,
    platformResponse: signalText.slice(0, 200), // truncate for log safety
    sessionStatus: "STOPPED — escalating to Contingency Chief",
    notes: "EXCEPTION_REPORT_REQUIRED",
  });
}

/**
 * Writes an Exception Report to the farming log and to a dedicated exception file.
 */
export function logException({ assetAlias, taskId, exceptionType, detail }) {
  // Append to farming log
  logAction({
    assetAlias,
    taskId,
    action: `EXCEPTION: ${exceptionType}`,
    platformResponse: "BLOCKED",
    sessionStatus: "HALTED",
    notes: detail,
  });

  // Write dedicated exception file
  const date = todayString();
  const exceptionFile = path.join(
    REPO_ROOT,
    "data/contingency/farming-logs",
    `${date}_${assetAlias}_EXCEPTION.md`
  );

  const content = [
    `# Exception Report`,
    `**Asset:** ${assetAlias}`,
    `**Task ID:** ${taskId}`,
    `**Timestamp:** ${timestamp()}`,
    `**Type:** ${exceptionType}`,
    `**Detail:** ${detail}`,
    "",
    `**Required Action:** Route to Contingency Chief immediately.`,
    `**Session Status:** HALTED — do not resume without Contingency Chief clearance.`,
  ].join("\n");

  fs.writeFileSync(exceptionFile, content, "utf8");
}
