# Ad Account Creation + Warmup Protocol
**Protocol ID:** WUP-ADACC-001
**Version:** 1.0
**Applies to:** ADACC_META_01, ADACC_META_02, ADACC_META_03
**Maintained by:** Contingency Squad
**Environment:** NON-PRODUCTION / CONTINGENCY ONLY

---

## Purpose

Ad Accounts are created inside the Business Manager after the BM has been established and warmed. Ad Accounts require billing to go live — billing is NEVER attached by the Contingency Squad. This protocol documents the structural setup only.

---

## Pre-Requisites

- BM linked to this Ad Account must be 2+ days old (WUP-BM-001 complete)
- Admin FBPRO must have 12+ days of warmup
- Pre-Session Isolation Certificate: CLEAR
- Owner must explicitly authorize Ad Account creation (A4 minimum — CEO Agent approval; A5 if treated as infrastructure action)

---

## Day 12 — Ad Account Creation

**Executor:** Asset Farming Operator

```
Step 1: Open BROWSER_META_0X → navigate to BM_META_0X
Step 2: Go to Business Settings → Ad Accounts → Add → Create New Ad Account
Step 3: Configure:
  - Account Name: [Descriptive name — e.g., "Felipe Reis Nutra WL 01"]
  - Currency: EUR (critical for DACH market)
  - Time Zone: Europe/Berlin
Step 4: DO NOT add payment method
Step 5: DO NOT create any campaigns, ad sets, or ads
Step 6: Log Ad Account ID in asset-registry.yaml
Step 7: Close session
```

---

## Post-Creation Status

After creation, Ad Account status:
- `billing_attached: false` — CORRECT. Do not change.
- `campaigns_created: false` — CORRECT. Do not change.
- `status: CREATED_UNACTIVATED` — CORRECT.

Ad Account is NOT READY for use. It is structurally present and waiting for Owner to attach billing at activation time.

**Owner Action Required for Activation:**
- Attach payment method (credit card or invoice) to Ad Account
- Set spending limit per period
- CEO Agent prepares Activation Packet and delivers to Owner for review

---

## Constraints — Absolute

- NO payment method attached by any agent — Owner-only action
- NO campaign creation — not even draft campaigns
- NO audience creation or pixel setup without Owner direction
- NO ad account shared with any non-contingency user

---

## Readiness Criteria

Ad Account is READY for Owner review when:
- [ ] Ad Account is created in correct BM
- [ ] Currency EUR, timezone Europe/Berlin
- [ ] Account ID logged in asset-registry.yaml
- [ ] No billing attached
- [ ] No campaigns created
- [ ] No policy flags from Meta

---

*Ad Account Creation Protocol — WUP-ADACC-001 — Contingency Squad.*
