# Email Account Warmup Protocol
**Protocol ID:** WUP-EMAIL-001
**Version:** 1.0
**Applies to:** EMAIL_META_01 through EMAIL_META_06
**Maintained by:** Contingency Squad
**Environment:** NON-PRODUCTION / CONTINGENCY ONLY

---

## Purpose

Gmail accounts created for Meta asset registration must demonstrate organic usage patterns before being used to register or log into Facebook profiles. Cold-registration emails are flagged by Meta as bot-created accounts.

This protocol ensures each Gmail account has a minimal but credible usage history before being linked to any Facebook profile.

---

## Pre-Requisites

- Pre-Session Isolation Certificate: CLEAR required before any session
- Browser profile: Designated contingency profile for this asset alias (BROWSER_META_0X)
- Proxy designation: Per asset_registry.yaml (optional in current phase — direct IP acceptable)
- Account must be created and phone-verified (Owner action required for verification codes)

---

## Day 1 — Account Creation (Owner-Assisted)

**Executor:** Asset Farming Operator + Owner (for phone verification)
**Time estimate:** 10–15 minutes per account

```
Step 1: Open designated browser profile (BROWSER_META_0X) — fresh, no cookies
Step 2: Navigate to accounts.google.com/signup
Step 3: Create account with:
  - Name: Felipe Reis (Owner identity)
  - Username: [alias-derived — documented in asset-registry.yaml under email_username field]
  - Use a strong random password — document in secure notes, NEVER in repo
Step 4: Phone verification triggered — PAUSE session
Step 5: Owner enters verification code received on their phone
Step 6: Account created — log creation in farming-log
Step 7: Set recovery email to a designated backup (Owner provides)
Step 8: Do NOT immediately link to Facebook — warmup first
```

**Log entry required:**
```
asset_alias: EMAIL_META_0X
action: ACCOUNT_CREATED
timestamp: [ISO 8601]
platform_response: VERIFICATION_COMPLETE
session_status: PAUSED_FOR_VERIFICATION → COMPLETE
```

---

## Days 1–3 — Light Usage Warmup

**Executor:** Asset Farming Operator
**Sessions:** 1 session per day, 10–15 minutes max
**Action limit:** 8 actions per session

### Day 1 (post-creation, same session or next):
- [ ] Send one email to yourself (from account to another Gmail you control)
- [ ] Open and read 2–3 promotional emails from Google (they send welcome emails)
- [ ] Visit Google Search once from this browser profile
- [ ] Close session cleanly

### Day 2:
- [ ] Open Gmail — check inbox (simulating normal user)
- [ ] Visit Google Maps — search for a location in DACH region (builds geo signal)
- [ ] Search Google for a niche-relevant topic (health, wellness, fitness in German context)
- [ ] Close session cleanly

### Day 3:
- [ ] Open Gmail
- [ ] Subscribe to one legitimate German health newsletter (e.g., gesundheit.de, netdoktor.de)
- [ ] Confirm subscription email
- [ ] Close session cleanly

---

## Day 4+ — Ready for Facebook Registration

After 3 full days of light usage, the email account is ready to be used for Facebook profile registration.

**Green light criteria:**
- [ ] Account is 3+ days old
- [ ] At least 3 sessions with organic-pattern activity logged
- [ ] No Google account warnings or unusual activity flags logged
- [ ] Pre-Session Isolation Certificate CLEAR for the session

---

## Isolation Requirements Per Session

Before every session:
1. Confirm browser profile is BROWSER_META_0X (correct alias)
2. Confirm no cookies from facebook.com, google.com (production accounts) in this profile
3. Confirm no other browser profiles open simultaneously
4. Log Pre-Session Isolation Certificate

After every session:
1. Close browser — do not leave sessions open overnight
2. Log Post-Session Isolation Report
3. Update farming log with all actions taken

---

## Exception Handling

| Platform Signal | Response |
|---|---|
| "Unusual activity" warning from Google | STOP. Log. Escalate to CEO Agent. Do not attempt to bypass. |
| Captcha on login | Complete manually if simple. Log. If persistent, escalate. |
| Account suspended | Mark as ISOLATED in asset-registry.yaml. Escalate to Owner. |
| Phone re-verification requested | PAUSE. Owner provides code. Log and continue. |

---

*Email Warmup Protocol — WUP-EMAIL-001 — Contingency Squad. All sessions require Pre-Session Isolation Certificate.*
