# Business Manager Creation + Warmup Protocol
**Protocol ID:** WUP-BM-001
**Version:** 1.0
**Applies to:** BM_META_01, BM_META_02, BM_META_03
**Maintained by:** Contingency Squad
**Environment:** NON-PRODUCTION / CONTINGENCY ONLY

---

## Purpose

Business Managers must be created from warmed Facebook profiles (7+ days old, active). Creating a BM from a new account triggers immediate restriction. This protocol documents the BM creation sequence and the warmup actions that follow creation.

---

## Pre-Requisites

- FBPRO linked to this BM must have completed WUP-FBPRO-001 (7+ day warmup, green light criteria met)
- Pre-Session Isolation Certificate: CLEAR
- NO billing attached (ever — Owner-only action)
- NO campaigns created (ever in contingency phase)

---

## Day 12 — Business Manager Creation

**Executor:** Asset Farming Operator

```
Step 1: Open BROWSER_META_0X (profile linked to this BM's admin FBPRO)
Step 2: Navigate to business.facebook.com/create
Step 3: Create BM with:
  - Business Name: [Felipe Reis's company name or DBA — Owner provides]
  - Your Name: Felipe Reis
  - Business Email: EMAIL_META_0X (the linked warmup email)
Step 4: Complete BM setup — skip payment setup entirely
Step 5: Do NOT add any ad accounts yet
Step 6: Do NOT invite any additional users yet
Step 7: Log BM ID in asset-registry.yaml under the BM alias
```

**BM creation is R2 — reversible with effort. CEO Agent approval required (A3). Logged.**

---

## Post-Creation (Days 12–14) — BM Warmup

**Sessions:** 1 per day, 10–15 minutes

### Day 12 (post-creation):
- [ ] Navigate to BM — explore the interface (People, Assets tabs)
- [ ] Do NOT add payment method
- [ ] Do NOT create ad account
- [ ] Close session

### Day 13:
- [ ] Log into FBPRO → navigate to BM
- [ ] Visit Business Settings → review account structure
- [ ] Add business info (website field — can be a placeholder domain if available)
- [ ] Close session

### Day 14:
- [ ] Log into FBPRO → navigate to BM
- [ ] Create one Facebook Page inside the BM (if within this BM's scope per TP-CONT-001)
- [ ] DO NOT boost or advertise the page
- [ ] Close session

---

## Readiness Criteria (Day 14+)

BM is READY for Owner review when:
- [ ] BM is 2+ days old
- [ ] BM linked to FBPRO with 12+ days of warmup
- [ ] BM has business name and email configured
- [ ] NO billing attached
- [ ] NO campaigns created
- [ ] No BM warnings or policy flags in session logs

---

## Absolute Constraints

- **Billing**: Never. Owner attaches billing at activation — not before.
- **Ad Accounts**: Created only after Owner review and direction. Never in warmup phase.
- **Campaigns**: Never in contingency phase.
- **Users**: No additional users added without Owner direction.

---

*BM Warmup Protocol — WUP-BM-001 — Contingency Squad.*
