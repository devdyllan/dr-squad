# Browser Tools Execution Guide
**For:** Owner (Felipe Reis) — Local Execution Only
**Version:** 1.0
**Environment:** This script runs on YOUR local machine, not the server

---

## Why This Runs Locally

The Day 1 account creation requires:
1. A visible browser window (for phone verification)
2. You to physically enter SMS verification codes
3. Your phone nearby

The server does not have a browser installed. **You run this on your own computer.**

---

## Setup on Your Local Machine

### Prerequisites
- Node.js 18+ installed (`node --version`)
- npm installed (`npm --version`)

### Installation

```bash
# Clone or pull the repo to your local machine
git clone <repo-url> dr-squad
cd dr-squad/tools/browser

# Install dependencies
npm install

# Install Playwright browser (Chromium)
npx playwright install chromium
```

---

## Running Day 1 — Gmail Account Creation

```bash
cd dr-squad/tools/browser
node day1-account-creation.js
```

The script will:
1. Open a browser window for each Gmail account (one at a time)
2. Navigate to Gmail signup
3. **PAUSE** at the phone verification screen and wait for you
4. You enter the SMS code in the browser
5. Script continues and does brief organic warmup
6. Takes a 2-minute break, then starts next account

### What you need ready:
- Your phone (to receive SMS codes)
- A secure place to store the passwords you create (password manager)
- About 90 minutes of time (6 accounts × ~15 minutes each)

### IMPORTANT: Password Storage
- Create strong passwords for each Gmail account
- Store them in your password manager (1Password, Bitwarden, etc.)
- **NEVER** put passwords in any file in this repository

---

## Running Day 5 — Facebook Registration

After email warmup (Days 1–3 complete), run:

```bash
node day5-facebook-registration.js  # Will be created before Day 5
```

Same process — browser opens, you complete phone verification.

---

## Logs and Reports

All farming logs are written to:
- `data/contingency/farming-logs/` — action logs per asset
- `data/contingency/isolation-reports/` — pre/post session isolation certs

After running locally, commit and push the log files:
```bash
git add data/contingency/farming-logs/ data/contingency/isolation-reports/
git commit -m "contingency: Day 1 farming logs — 6 Gmail accounts"
git push
```

---

## If Something Goes Wrong

1. **Phone verification not received:** Wait 2 minutes, request resend in browser. If still fails, press Ctrl+C to skip this account. It will be logged as incomplete.

2. **Google blocks registration:** Script logs the exception. Move to next account. Come back to this one with a different IP (e.g., connect to different WiFi).

3. **Any other error:** Script logs it and continues to next account. Check `data/contingency/farming-logs/` for details.

4. **Contact CEO Agent:** Open Claude Code, describe the issue. CEO Agent will advise.

---

*Execution Guide — tools/browser/EXECUTION-GUIDE.md — Dev Squad*
