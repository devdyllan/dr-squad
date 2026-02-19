/**
 * proxy-config.js
 * Maps asset aliases (PROXY_CONT_01..06) to actual proxy URLs.
 * Proxy URLs are loaded from environment variables — never hardcoded.
 *
 * Format in .env:
 *   PROXY_CONT_01=http://user:pass@host:port
 *   PROXY_CONT_02=http://user:pass@host:port
 *   ...
 *
 * Each BROWSER_META_* alias maps to exactly one PROXY_CONT_* — see asset-registry.yaml.
 */

import "dotenv/config";

const PROXY_MAP = {
  PROXY_CONT_01: process.env.PROXY_CONT_01,
  PROXY_CONT_02: process.env.PROXY_CONT_02,
  PROXY_CONT_03: process.env.PROXY_CONT_03,
  PROXY_CONT_04: process.env.PROXY_CONT_04,
  PROXY_CONT_05: process.env.PROXY_CONT_05,
  PROXY_CONT_06: process.env.PROXY_CONT_06,
};

// Map browser profile alias → proxy designation (from asset-registry.yaml)
const BROWSER_TO_PROXY = {
  BROWSER_META_ADV_01:    "PROXY_CONT_01",
  BROWSER_META_ADV_02:    "PROXY_CONT_02",
  BROWSER_META_ADV_03:    "PROXY_CONT_03",
  BROWSER_META_PAGE_01:   "PROXY_CONT_04",
  BROWSER_META_PAGE_02:   "PROXY_CONT_05",
  BROWSER_META_MATRIZ_01: "PROXY_CONT_06",
};

/**
 * Returns the proxy URL for a given browser profile alias.
 * Throws if the proxy is not configured — sessions must not run without a proxy.
 */
export function getProxyForBrowser(browserAlias) {
  const proxyKey = BROWSER_TO_PROXY[browserAlias];
  if (!proxyKey) {
    throw new Error(`Unknown browser alias: ${browserAlias}. Not in asset registry.`);
  }

  const proxyUrl = PROXY_MAP[proxyKey];
  if (!proxyUrl) {
    throw new Error(
      `Proxy not configured: ${proxyKey} for browser ${browserAlias}. ` +
      `Set ${proxyKey} in tools/browser/.env before running sessions.`
    );
  }

  return proxyUrl;
}

/**
 * Validates that all 6 proxies are configured before any session begins.
 * Called at MCP server startup.
 */
export function validateAllProxies() {
  const missing = [];
  for (const [key, val] of Object.entries(PROXY_MAP)) {
    if (!val) missing.push(key);
  }
  if (missing.length > 0) {
    throw new Error(
      `Missing proxy configuration for: ${missing.join(", ")}. ` +
      `All proxies must be set in tools/browser/.env before sessions can run.`
    );
  }
  return true;
}
