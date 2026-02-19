# Browser Profile Setup + Isolation Protocol
**Protocol ID:** WUP-BROWSER-001
**Version:** 1.0
**Applies to:** BROWSER_META_01 through BROWSER_META_06
**Maintained by:** Contingency Squad / Dev Squad
**Environment:** NON-PRODUCTION / CONTINGENCY ONLY

---

## Purpose

Each contingency asset has a dedicated isolated browser profile. These profiles must:
1. Be completely isolated from production browser sessions
2. Never share cookies, sessions, or login state with production accounts
3. Be set up with human-like browser fingerprint via stealth configuration

---

## Profile Setup (One-time, before Day 1)

**Executor:** Dev Squad (tools/browser setup)

```
Profile Location: tools/browser/profiles/BROWSER_META_0X/
Each profile is a separate Chromium user-data-dir

Setup steps:
1. Launch browser with dedicated profile directory
2. Apply stealth plugin settings (playwright-extra + puppeteer-extra-plugin-stealth)
3. Set language to de-DE (German browser fingerprint)
4. Set timezone to Europe/Berlin (or Vienna/Zurich per asset)
5. DO NOT log into any Google or Facebook account yet
6. Visit 3–5 generic German websites to establish browsing history
   (e.g., spiegel.de, focus.de, t-online.de)
7. Close profile
8. Write Pre-Session Isolation Certificate confirming fresh state
```

**Profile naming convention:**
```
BROWSER_META_01 → tools/browser/profiles/profile-adv-01/
BROWSER_META_02 → tools/browser/profiles/profile-adv-02/
BROWSER_META_03 → tools/browser/profiles/profile-adv-03/
BROWSER_META_04 → tools/browser/profiles/profile-page-01/
BROWSER_META_05 → tools/browser/profiles/profile-page-02/
BROWSER_META_06 → tools/browser/profiles/profile-matriz-01/
```

---

## Isolation Verification Checklist (Run Before Every Session)

```
[ ] Profile directory matches asset alias in Task Packet
[ ] No facebook.com cookies in profile
[ ] No google.com cookies from production accounts in profile
[ ] No other Chromium instances open for other profiles
[ ] Proxy setting matches contingency designation (or direct IP if no proxy configured)
[ ] Browser language set to de-DE
[ ] No browser extensions that could leak identity (disable all non-stealth extensions)
```

All items CLEAR → issue Pre-Session Isolation Certificate with CLEAR status
Any item BLOCKED → issue Certificate with BLOCKED status → session does not begin

---

## Post-Session Closure Checklist

```
[ ] All tabs closed before profile close
[ ] Browser closed completely (not just window minimized)
[ ] No background browser processes running for this profile (check task manager)
[ ] Farming log updated with session summary
[ ] Post-Session Isolation Report written
```

---

## Profile Health Monitoring

Signs a profile may be compromised:
- Browser starts with unexpected bookmarks or history from other profiles
- Auto-fill suggests data from different accounts
- Cookies from domains not visited in this profile appear

Action: Treat as cross-contamination event. Halt. Escalate to CEO Agent immediately.

---

*Browser Profile Warmup Protocol — WUP-BROWSER-001 — Contingency Squad + Dev Squad.*
