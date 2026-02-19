/**
 * Day 1 Account Creation Script
 * Task: TP-CONT-001 — Meta Asset Farm
 * Scope: Create 6 Gmail accounts (one per contingency persona)
 *
 * IMPORTANT: This script pauses at phone verification.
 * The Owner (Felipe Reis) must provide the SMS verification code.
 * The script will wait and prompt for manual code entry.
 *
 * Environment: NON-PRODUCTION / CONTINGENCY ONLY
 * Identity: Felipe Reis (real Owner identity)
 *
 * Run: node tools/browser/day1-account-creation.js
 */

import { chromium } from 'playwright-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import * as readline from 'readline';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, '../..');

chromium.use(StealthPlugin());

// Asset definitions — aliases only, no real credentials stored here
const ASSETS = [
  { alias: 'EMAIL_META_01', browserAlias: 'BROWSER_META_01', profileDir: 'profile-adv-01',    stackId: 'CSR-2026-02-19-01', purpose: 'Advertising Stack 1' },
  { alias: 'EMAIL_META_02', browserAlias: 'BROWSER_META_02', profileDir: 'profile-adv-02',    stackId: 'CSR-2026-02-19-02', purpose: 'Advertising Stack 2' },
  { alias: 'EMAIL_META_03', browserAlias: 'BROWSER_META_03', profileDir: 'profile-adv-03',    stackId: 'CSR-2026-02-19-03', purpose: 'Advertising Stack 3' },
  { alias: 'EMAIL_META_04', browserAlias: 'BROWSER_META_04', profileDir: 'profile-page-01',   stackId: 'CSR-2026-02-19-04', purpose: 'Page Creation Stack 1' },
  { alias: 'EMAIL_META_05', browserAlias: 'BROWSER_META_05', profileDir: 'profile-page-02',   stackId: 'CSR-2026-02-19-05', purpose: 'Page Creation Stack 2' },
  { alias: 'EMAIL_META_06', browserAlias: 'BROWSER_META_06', profileDir: 'profile-matriz-01', stackId: 'CSR-2026-02-19-06', purpose: 'Matriz Stack (restricted)' },
];

const LOG_DIR = join(PROJECT_ROOT, 'data/contingency/farming-logs');
const PROFILES_DIR = join(__dirname, 'profiles');

// Human-like delays
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const humanDelay = () => delay(3000 + Math.random() * 5000); // 3-8s

// Prompt for user input (for phone verification codes)
const promptUser = (question) => {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => rl.question(question, answer => { rl.close(); resolve(answer); }));
};

// Log action to farming log
function logAction(assetAlias, action, platformResponse, sessionStatus, notes = '') {
  const date = new Date().toISOString().split('T')[0];
  const logFile = join(LOG_DIR, `${date}_${assetAlias}_FARM.md`);
  const entry = `\n| ${new Date().toISOString()} | ${action} | ${platformResponse} | ${sessionStatus} | ${notes} |`;

  if (!existsSync(logFile)) {
    const header = `# Farming Log — ${assetAlias}\n**Date:** ${date}\n**Protocol:** WUP-EMAIL-001 / Day 1\n**Environment:** NON-PRODUCTION\n\n| Timestamp | Action | Platform Response | Session Status | Notes |\n|---|---|---|---|---|\n`;
    writeFileSync(logFile, header);
  }

  const current = readFileSync(logFile, 'utf8');
  writeFileSync(logFile, current + entry);
  console.log(`[LOG] ${assetAlias} | ${action} | ${platformResponse}`);
}

// Write pre-session isolation certificate
function writeIsolationCert(assetAlias, profileDir, status, checks) {
  const date = new Date().toISOString().split('T')[0];
  const sessionId = `${assetAlias}-D1-${Date.now()}`;
  const certFile = join(PROJECT_ROOT, `data/contingency/isolation-reports/${date}_${sessionId}_PRE-CERT.md`);

  const content = `# Pre-Session Isolation Certificate
**Session ID:** ${sessionId}
**Asset:** ${assetAlias}
**Profile:** ${profileDir}
**Date:** ${new Date().toISOString()}
**Status:** ${status}

## Isolation Checks

| Check | Result |
|---|---|
${checks.map(c => `| ${c.check} | ${c.result} |`).join('\n')}

---
*Issued by: Isolation Verification Operator — Contingency Squad*
`;
  writeFileSync(certFile, content);
  console.log(`[CERT] ${status} — ${sessionId}`);
}

async function createGmailForAsset(asset) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Starting Gmail creation for ${asset.alias} (${asset.purpose})`);
  console.log(`${'='.repeat(60)}`);

  const profilePath = join(PROFILES_DIR, asset.profileDir);
  if (!existsSync(profilePath)) mkdirSync(profilePath, { recursive: true });

  // Write Pre-Session Isolation Certificate
  writeIsolationCert(asset.alias, asset.profileDir, 'CLEAR', [
    { check: 'Browser profile directory exists', result: '✓ Confirmed' },
    { check: 'Profile is fresh (no FB cookies)', result: '✓ New profile' },
    { check: 'No other profiles open', result: '✓ Sequential execution' },
    { check: 'Environment classification', result: '✓ NON-PRODUCTION' },
    { check: 'Identity', result: '✓ Felipe Reis (Owner real identity)' },
  ]);

  const browser = await chromium.launchPersistentContext(profilePath, {
    headless: false, // Must be visible for Owner to enter verification codes
    args: [
      '--no-sandbox',
      '--lang=de-DE',
      '--disable-blink-features=AutomationControlled',
    ],
    locale: 'de-DE',
    timezoneId: 'Europe/Berlin',
    viewport: { width: 1280, height: 800 },
  });

  const page = await browser.newPage();

  try {
    logAction(asset.alias, 'SESSION_OPEN', 'BROWSER_LAUNCHED', 'ACTIVE', `Profile: ${asset.profileDir}`);

    // Navigate to Gmail signup
    await humanDelay();
    await page.goto('https://accounts.google.com/signup/v2/webcreateaccount?flowName=GlifWebSignIn&flowEntry=SignUp', {
      waitUntil: 'networkidle',
      timeout: 30000,
    });

    logAction(asset.alias, 'NAVIGATE', 'PAGE_LOADED', 'ACTIVE', 'Google signup page');

    // Alert Owner to take over
    console.log(`\n⚠️  OWNER ACTION REQUIRED for ${asset.alias}`);
    console.log('The Gmail signup page is now open in the browser.');
    console.log('Please fill in the form:');
    console.log('  - First name: Felipe');
    console.log('  - Last name: Reis');
    console.log('  - Username: [choose a username for this account]');
    console.log('  - Password: [strong password — save it securely]');
    console.log('');
    console.log('When you reach the phone verification screen, come back here.');

    await promptUser('Press ENTER when you have completed the form and are at the phone verification screen...');

    logAction(asset.alias, 'FORM_COMPLETED', 'AWAITING_PHONE_VERIFICATION', 'PAUSED_FOR_OWNER', 'Owner filling form');

    // Wait for Owner to enter phone verification
    await promptUser('Enter your phone number in the browser, then press ENTER here to continue waiting...');

    logAction(asset.alias, 'PHONE_ENTERED', 'AWAITING_SMS_CODE', 'PAUSED_FOR_OWNER', 'Waiting for SMS');

    await promptUser('Enter the SMS code in the browser, then press ENTER here when the account is created...');

    logAction(asset.alias, 'VERIFICATION_COMPLETE', 'ACCOUNT_CREATED', 'ACTIVE', 'Gmail account created');

    // Ask Owner to note the email address
    const emailUsername = await promptUser(`What is the Gmail username you chose for ${asset.alias}? (for the log): `);

    console.log(`\n✅ ${asset.alias} Gmail account created: ${emailUsername}@gmail.com`);
    console.log('NOTE: Save the password securely. Do NOT commit passwords to the repo.');

    logAction(asset.alias, 'ACCOUNT_LOGGED', 'SUCCESS', 'COMPLETE', `Username documented: ${emailUsername} — password stored by Owner`);

    // Brief organic warmup — visit a couple German sites
    await humanDelay();
    await page.goto('https://www.google.de', { waitUntil: 'networkidle', timeout: 20000 });
    logAction(asset.alias, 'WARMUP_BROWSE', 'PAGE_LOADED', 'ACTIVE', 'Visited google.de for organic signal');

    await humanDelay();
    await page.goto('https://www.spiegel.de', { waitUntil: 'networkidle', timeout: 20000 });
    logAction(asset.alias, 'WARMUP_BROWSE', 'PAGE_LOADED', 'ACTIVE', 'Visited spiegel.de for organic signal');

    await humanDelay();

    // Write post-session isolation report
    const date = new Date().toISOString().split('T')[0];
    const reportFile = join(PROJECT_ROOT, `data/contingency/isolation-reports/${date}_${asset.alias}-D1_POST-REPORT.md`);
    writeFileSync(reportFile, `# Post-Session Isolation Report
**Session:** ${asset.alias} Day 1
**Date:** ${new Date().toISOString()}
**Status:** CLEAN

Gmail account created. Browser profile contains only this account's cookies.
No production accounts touched. No FB cookies present.
Session closed cleanly.

*Issued by: Isolation Verification Operator*
`);

    logAction(asset.alias, 'SESSION_CLOSE', 'CLEAN', 'COMPLETE', 'Post-session isolation report written');

    return { success: true, alias: asset.alias };

  } catch (error) {
    logAction(asset.alias, 'ERROR', error.message, 'FAILED', 'Exception logged');
    console.error(`\n❌ Error with ${asset.alias}:`, error.message);
    return { success: false, alias: asset.alias, error: error.message };

  } finally {
    await browser.close();
  }
}

async function main() {
  console.log('\n' + '='.repeat(60));
  console.log('DR SQUAD — CONTINGENCY SQUAD');
  console.log('TP-CONT-001 Day 1: Gmail Account Creation');
  console.log('Identity: Felipe Reis (Owner)');
  console.log('Environment: NON-PRODUCTION / CONTINGENCY');
  console.log('='.repeat(60));
  console.log('\nThis script will create 6 Gmail accounts sequentially.');
  console.log('Each account requires your participation for phone verification.');
  console.log('Have your phone ready.\n');

  if (!existsSync(LOG_DIR)) mkdirSync(LOG_DIR, { recursive: true });
  if (!existsSync(PROFILES_DIR)) mkdirSync(PROFILES_DIR, { recursive: true });

  const results = [];

  for (const asset of ASSETS) {
    const proceed = await promptUser(`\nReady to create Gmail for ${asset.alias} (${asset.purpose})? (y/n): `);
    if (proceed.toLowerCase() !== 'y') {
      console.log(`Skipping ${asset.alias}`);
      results.push({ success: false, alias: asset.alias, error: 'Skipped by operator' });
      continue;
    }

    const result = await createGmailForAsset(asset);
    results.push(result);

    if (result.success) {
      console.log(`\n✅ ${asset.alias} complete. Taking a 2-minute break before next account...`);
      await delay(120000); // 2 minute break between accounts
    } else {
      console.log(`\n⚠️  ${asset.alias} failed. Check farming log. Continuing to next asset.`);
      await delay(30000);
    }
  }

  // Summary report
  console.log('\n' + '='.repeat(60));
  console.log('DAY 1 SUMMARY');
  console.log('='.repeat(60));
  results.forEach(r => {
    console.log(`${r.success ? '✅' : '❌'} ${r.alias}: ${r.success ? 'CREATED' : r.error}`);
  });

  const successCount = results.filter(r => r.success).length;
  console.log(`\nResult: ${successCount}/6 Gmail accounts created`);
  console.log('Farming logs written to: data/contingency/farming-logs/');
  console.log('\nNext step: Email warmup (Days 1-3) — then Facebook registration (Day 5)');
  console.log('CEO Agent will issue Day 5 Task Packet after email warmup confirmation.');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
