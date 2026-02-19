# Facebook Profile Warmup Protocol
**Protocol ID:** WUP-FBPRO-001
**Version:** 1.0
**Applies to:** FBPRO_ADV_01, FBPRO_ADV_02, FBPRO_ADV_03, FBPRO_PAGE_01, FBPRO_PAGE_02, FBPRO_MATRIZ_01
**Maintained by:** Contingency Squad
**Environment:** NON-PRODUCTION / CONTINGENCY ONLY

---

## Purpose

New Facebook profiles must establish trust signals before being used for Business Manager creation, page administration, or advertising. Meta's trust scoring system evaluates account age, activity patterns, and behavioral consistency. Profiles that register and immediately attempt BM or ad account creation are flagged and restricted.

This protocol builds minimum viable trust over a 7-day warmup period.

---

## Pre-Requisites

- Email account (EMAIL_META_0X) must be 3+ days old and warmup complete
- Pre-Session Isolation Certificate: CLEAR required before any session
- Browser profile: BROWSER_META_0X — same profile used for email warmup
- Owner available for phone verification during registration

---

## Day 5 — Facebook Registration (Owner-Assisted)

**Executor:** Asset Farming Operator + Owner (for phone verification)

```
Step 1: Open BROWSER_META_0X — confirm no FB cookies present
Step 2: Navigate to facebook.com/r.php (registration)
Step 3: Register with:
  - Name: Felipe Reis
  - Birthday: Owner's real birthday
  - Gender: Owner's real gender
  - Email: EMAIL_META_0X (the warmed email)
Step 4: Phone verification — PAUSE session
Step 5: Owner provides verification code
Step 6: Account created — skip "find friends" — close
Step 7: Log creation event in farming log
```

**Do NOT on Day 5:**
- Do not add profile photo yet (too fast looks bot-like)
- Do not search for anyone
- Do not send friend requests
- Do not attempt BM creation
- Do not enable 2FA yet (Day 6+)

---

## Days 5–7 — Foundation Warmup

**Sessions:** 1 per day, 15–20 minutes max
**Action limit:** 12 per session

### Day 5 (post-registration):
- [ ] Log in, complete basic profile (city: a DACH city, birthday already set)
- [ ] Browse News Feed for 5–7 minutes (scroll naturally — use human-timing delays)
- [ ] Like 1–2 public pages in health/wellness niche (search public pages only)
- [ ] Close session

### Day 6:
- [ ] Log in, check notifications
- [ ] Browse Feed — scroll 3–4 minutes
- [ ] Search for a public health-related group (do NOT join yet)
- [ ] Watch 1 short video in Feed (let it play 30+ seconds)
- [ ] Enable 2FA (SMS) — strengthens account trust
- [ ] Close session

### Day 7:
- [ ] Log in, check notifications
- [ ] Add a profile photo (generic, non-identifying — or a simple initial avatar)
- [ ] Browse Marketplace briefly (2–3 minutes)
- [ ] Like 2–3 posts from public pages
- [ ] Close session

---

## Days 8–11 — Trust Building

**Sessions:** 1 per day, 15–25 minutes
**Action limit:** 20 per session

### Days 8–9:
- [ ] Log in daily — browse Feed 5–10 minutes each day
- [ ] Like 3–5 posts from public pages (health, lifestyle, DACH topics)
- [ ] Watch at least one video each session (1–3 minutes)
- [ ] Join one public group (health/wellness/fitness theme)
- [ ] Comment on one public post (generic positive comment — do not post in groups yet)

### Days 10–11:
- [ ] Log in, browse Feed
- [ ] Post one status update (simple generic post — e.g., share a news article or public page post)
- [ ] Like 5–8 posts
- [ ] Browse Events tab (look, do not RSVP)
- [ ] Visit Marketplace — browse a few listings

---

## Day 12+ — Ready for Business Manager Creation

**Green light criteria for BM creation:**
- [ ] Account is 7+ days old from registration
- [ ] Daily sessions logged for at least 7 of the first 12 days
- [ ] Profile has: name, birthday, city, profile photo, 2FA enabled
- [ ] Account has: liked 5+ pages, joined 1+ group, made 1+ post
- [ ] No Meta warnings or security flags in any session log
- [ ] Pre-Session Isolation Certificate CLEAR

---

## FBPRO_MATRIZ_01 — Special Protocol

The Matriz profile has an additional constraint:

**`matriz_connection_authorized: false`** in asset-registry.yaml until Owner explicitly approves.

The Matriz profile goes through the same warmup protocol as other profiles. However:
- It does NOT connect to any BM, page, or ad account until Owner issues written activation approval
- The CEO Agent prepares the Matriz Activation Packet and delivers to Owner for review
- This is a Tier 3 / A5 / R3 action — Owner approval mandatory

---

## Isolation Requirements Per Session

Before every session:
1. Confirm BROWSER_META_0X is correct — check profile folder path
2. Confirm profile has ZERO cookies from:
   - Any production Facebook account
   - Any production Business Manager
   - Any other contingency profile
3. Confirm only one browser instance is open
4. Isolation Verification Operator issues Pre-Session Isolation Certificate

After every session:
1. Close browser completely
2. Log all actions with timestamp, asset alias, and platform response
3. Isolation Verification Operator issues Post-Session Isolation Report

---

## Exception Handling

| Platform Signal | Response |
|---|---|
| "Confirm your identity" checkpoint | STOP. Take screenshot. Log. Escalate to CEO Agent → Owner. |
| Phone re-verification request | PAUSE. Owner provides code. Log. Continue if cleared. |
| "Your account has been temporarily locked" | Mark ISOLATED. Escalate immediately. Do not attempt recovery independently. |
| "We noticed unusual activity" | STOP session. Log exact message. Escalate. |
| Captcha on login | Complete once manually. If recurring, log as platform signal and escalate. |
| Friend suggestions from known personal network | IGNORE. Do not connect to real network. Close suggestion tab. Log the signal. |

---

*Facebook Profile Warmup Protocol — WUP-FBPRO-001 — Contingency Squad. All sessions require Pre-Session Isolation Certificate before initiation.*
