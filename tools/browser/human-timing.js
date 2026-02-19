/**
 * human-timing.js
 * Utilities for human-like timing patterns.
 * All delays are randomized within the ranges defined in TP-CONT-001.
 *
 * Rules from TP-CONT-001:
 *   - 3–8 seconds between UI actions (randomized)
 *   - 15–25 minute session lengths
 *   - Max 25 sequential actions per session
 *   - No persistent sessions — login at start, logout at end
 */

/**
 * Wait a random amount of time between actions.
 * Default: 3–8 seconds (TP-CONT-001 requirement).
 */
export async function actionDelay(minMs = 3000, maxMs = 8000) {
  const delay = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
  await new Promise((r) => setTimeout(r, delay));
}

/**
 * Shorter delay for within-element interactions (typing, hovering).
 * 200–800ms — simulates human typing/mouse movement.
 */
export async function microDelay(minMs = 200, maxMs = 800) {
  const delay = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
  await new Promise((r) => setTimeout(r, delay));
}

/**
 * Pause between distinct tasks within a session.
 * 10–20 seconds — simulates reading a page before acting.
 */
export async function readingPause(minMs = 10000, maxMs = 20000) {
  const delay = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
  await new Promise((r) => setTimeout(r, delay));
}

/**
 * Session action counter.
 * Tracks how many actions have been taken in the current session.
 * Throws when the session limit is reached.
 */
export class SessionLimiter {
  constructor(maxActions = 25) {
    this.maxActions = maxActions;
    this.count = 0;
    this.startTime = Date.now();
    this.maxSessionMs = (25 * 60 * 1000); // 25 minutes hard cap
  }

  /**
   * Call before each action. Throws if limits are exceeded.
   */
  check(actionDescription = "action") {
    this.count++;

    if (this.count > this.maxActions) {
      throw new SessionLimitError(
        `Session action limit reached (${this.maxActions}). ` +
        `Close session, log, and open a new session for remaining tasks. ` +
        `Last action attempted: ${actionDescription}`
      );
    }

    const elapsed = Date.now() - this.startTime;
    if (elapsed > this.maxSessionMs) {
      throw new SessionLimitError(
        `Session time limit reached (25 minutes). ` +
        `Close session cleanly. Last action: ${actionDescription}`
      );
    }

    return this.count;
  }

  summary() {
    const elapsed = Math.round((Date.now() - this.startTime) / 1000);
    return `${this.count}/${this.maxActions} actions, ${elapsed}s elapsed`;
  }
}

export class SessionLimitError extends Error {
  constructor(message) {
    super(message);
    this.name = "SessionLimitError";
  }
}

/**
 * Type text character by character with human-like delays.
 * @param {import('playwright').Page} page
 * @param {string} selector
 * @param {string} text
 */
export async function humanType(page, selector, text) {
  await page.click(selector);
  for (const char of text) {
    await page.type(selector, char, {
      delay: Math.floor(Math.random() * 120) + 40, // 40–160ms per character
    });
    // Occasional longer pause (simulates thinking/hesitation)
    if (Math.random() < 0.08) {
      await microDelay(300, 900);
    }
  }
}

/**
 * Scroll page slowly, like a human reading.
 * @param {import('playwright').Page} page
 * @param {number} scrollAmount pixels to scroll
 */
export async function humanScroll(page, scrollAmount = 400) {
  const steps = Math.floor(scrollAmount / 80);
  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel(0, 80);
    await microDelay(80, 300);
  }
}
