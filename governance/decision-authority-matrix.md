# Decision Authority Matrix
**Version:** 1.0
**Classification:** Foundational System Component — Governance Layer
**Parent Document:** `governance/governance-framework.md`
**Owner:** Human Owner
**Maintained by:** CEO Agent (subject to human owner approval for all amendments)
**Status:** Active

---

## Overview

This matrix defines, for every significant decision type in the DR Squad AIOS:
- Who initiates the decision
- Who has authority to approve it autonomously
- When human owner approval is required
- The risk classification
- The reversibility classification
- Applicable budget thresholds

This matrix is the operational implementation of the authority structure defined in `governance/governance-framework.md`. When there is a conflict between this matrix and the framework, the framework governs.

---

## Budget Threshold Definitions

These thresholds apply globally. The human owner sets actual dollar values in `governance/owner-settings.md`. The tiers below define the decision tier required at each level.

| Threshold Name | Decision Tier | Notes |
|---|---|---|
| **Low Risk Ceiling** | A4 — CEO Agent autonomous | Single action or campaign spend ≤ this amount needs no human review |
| **Medium Risk Ceiling** | A5 — Human review required | Spend above Low but ≤ Medium requires human acknowledgment |
| **High Risk Ceiling** | A5 — Human explicit approval | Spend above Medium but ≤ High requires human explicit approval before execution |
| **Over High Risk Ceiling** | A5 — Human explicit approval, no time limit | Must wait for human confirmation; CEO Agent does not auto-proceed after any window |

**Default threshold values (owner must confirm or override in `governance/owner-settings.md`):**

| Threshold | Default Value | Owner Override Field |
|---|---|---|
| Low Risk Ceiling | $500 per action | `budget.low_risk_ceiling` |
| Medium Risk Ceiling | $2,000 per action | `budget.medium_risk_ceiling` |
| High Risk Ceiling | $10,000 per action | `budget.high_risk_ceiling` |
| Period (Monthly) Budget Ceiling | $25,000 total | `budget.period_ceiling` |
| Budget Warning Trigger | 80% of period ceiling | `budget.warning_threshold` |

---

## Platform Risk Threshold Definitions

| Level | Trigger Condition | Required Action |
|---|---|---|
| P1 — Nominal | No flags; account in good standing | Normal operations |
| P2 — Elevated | Minor rejection or warning; account operational | Monitor; log; include in digest |
| P3 — High | Account warning; policy violation detected | Platform Risk Hold; CEO Agent review before new spend |
| P4 — Critical | Account restricted; payment flagged | All spend halted; human owner notified immediately |
| P5 — Emergency | Account banned; domain flagged; payment blocked | Emergency Stop activated; human owner takes direct control |

---

## Decision Authority Matrix

### Section A: Research & Intelligence Decisions

| Decision | Initiator | Auto-Execute | CEO Approval | Human Approval | Risk | Reversibility | Notes |
|---|---|---|---|---|---|---|---|
| Issue research directive to Research Squad | CEO Agent | Yes (A3) | Logged | No | Low | R1 | Stored in `governance/directives/` |
| Approve delivery of an Intelligence Packet | Research Chief | Yes (A3) | Logged | No | Low | R1 | Must pass RQS ≥ 75 |
| Reject or return an Intelligence Packet | Research Chief | Yes (A3) | Logged | No | Low | R1 | Rejection reason logged |
| Override Research Squad veto | CEO Agent | No | Yes (A4) | No (unless contested) | Medium | R2 | CEO Agent must document evidence basis; logged |
| Initiate persona refresh | CEO Agent or Research Chief | No | Yes (A4) | No | Low | R1 | Triggered by market shift or quarterly cadence |
| Commission new VOC collection sprint | CEO Agent | No | Yes (A4) | No | Low | R1 | |
| Expand Research Squad tool access (new MCP integration) | CEO Agent | No | No | Yes (A5) | Medium | R3 | New tool integrations may affect platform compliance |

---

### Section B: Campaign & Creative Decisions

| Decision | Initiator | Auto-Execute | CEO Approval | Human Approval | Risk | Reversibility | Notes |
|---|---|---|---|---|---|---|---|
| Approve copy brief (new campaign) | Copy Squad submits; CEO Agent approves | No | Yes (A4) | No (if ≤ Low Risk Ceiling) | Low–Medium | R2 | Requires current BPP + AVR on file |
| Approve copy brief (new campaign, spend > Low Risk Ceiling) | Copy Squad submits; CEO Agent approves | No | Yes (A4) | Yes (A5) | Medium | R2 | |
| Reject copy brief | CEO Agent | No | Yes (A4) | No | Low | R1 | Rejection rationale documented |
| Approve creative variations within active campaign | CEO Agent | No | Yes (A4) | No | Low | R1 | Variations must align with approved angle |
| Approve new campaign launch (spend ≤ Low Risk Ceiling) | Ads Squad submits; CEO Agent approves | No | Yes (A4) | No | Low | R2 | |
| Approve new campaign launch (spend > Low Risk Ceiling, ≤ Medium) | Ads Squad submits; CEO Agent approves | No | Yes (A4) | Yes (A5) | Medium | R2 | Human has 24-hour review window |
| Approve new campaign launch (spend > Medium Risk Ceiling) | Ads Squad submits; CEO Agent approves | No | No | Yes (A5) | High | R2 | No time window; must wait for explicit confirmation |
| Pause a single ad or ad set | Ads Squad or CEO Agent | Yes (A3) | Logged | No | Low | R1 | Fully reversible |
| Pause an entire campaign | CEO Agent | No | Yes (A4) | No (if < 24 hours) | Medium | R2 | Human notified in digest; may override |
| Pause entire campaign portfolio | CEO Agent | No | No | Yes (A5) | High | R2 | Requires human approval; significant revenue impact |
| Shut down a campaign permanently | CEO Agent | No | No | Yes (A5) | High | R4 | Irreversible; human explicit approval required |
| Reactivate a paused campaign | CEO Agent | No | Yes (A4) | No (if original approval still valid) | Low | R1 | |
| Launch campaign on a new platform (not previously used) | Ads Squad submits; CEO Agent reviews | No | No | Yes (A5) | Medium | R3 | New platform = new account/compliance risk |
| Test a new ad format or placement | Ads Squad | No | Yes (A4) | No | Low | R2 | |

---

### Section C: Budget & Financial Decisions

| Decision | Initiator | Auto-Execute | CEO Approval | Human Approval | Risk | Reversibility | Notes |
|---|---|---|---|---|---|---|---|
| Reallocate budget between active campaigns (≤ Low Risk Ceiling net change) | CEO Agent | No | Yes (A4) | No | Low | R2 | Net change = amount moved, not total budget |
| Reallocate budget between active campaigns (> Low Risk Ceiling, ≤ Medium) | CEO Agent | No | Yes (A4) | Yes (A5) | Medium | R2 | |
| Reallocate budget (> Medium Risk Ceiling) | CEO Agent | No | No | Yes (A5) | High | R2 | |
| Approve period budget (monthly allocation) | CEO Agent recommends | No | No | Yes (A5) | High | R3 | Human sets period budget; CEO Agent operates within it |
| Amend period budget mid-cycle | CEO Agent recommends | No | No | Yes (A5) | High | R3 | Financial Sentinel prepares analysis |
| Issue Spend Hold | Financial Sentinel | Yes (A2) | Notified immediately | No | Low | R1 | Hold freezes pending approval; CEO Agent resolves or escalates |
| Override a Spend Hold | CEO Agent | No | Yes (A4) | No (below High Risk Ceiling) | Medium | R2 | CEO Agent documents override reason |
| Override a Spend Hold (above Medium Risk Ceiling) | CEO Agent | No | No | Yes (A5) | High | R2 | |
| Approve payment of a vendor invoice | CEO Agent | No | Yes (A4, if ≤ Low Risk Ceiling) | Yes (A5, if > Low) | Varies | R4 | Payments are irreversible |
| Negotiate or commit to a media buying contract | CEO Agent recommends | No | No | Yes (A5) | High | R4 | Legal commitment; irreversible |

---

### Section D: Platform & Infrastructure Decisions

| Decision | Initiator | Auto-Execute | CEO Approval | Human Approval | Risk | Reversibility | Notes |
|---|---|---|---|---|---|---|---|
| Update ad creative (within approved campaign) | Ads Squad | Yes (A3) | Logged | No | Low | R1 | |
| Update ad copy (within approved campaign) | Copy Squad / Ads Squad | No | Yes (A4) | No | Low | R1 | |
| Change targeting parameters (within approved campaign) | Ads Squad | No | Yes (A4) | No | Low | R2 | |
| Change bid strategy on active campaign | Ads Squad | No | Yes (A4) | No | Low–Medium | R2 | |
| Add a new ad account to the operation | CEO Agent recommends | No | No | Yes (A5) | Medium | R3 | New account = new compliance surface |
| Remove or close an ad account | CEO Agent recommends | No | No | Yes (A5) | High | R4 | Irreversible; audit first |
| Change ad account admin access | CEO Agent recommends | No | No | Yes (A5) | High | R4 | Infrastructure-level change |
| Change billing/payment method | N/A | No | No | Yes (A5) | High | R4 | Human only |
| Register a new domain | CEO Agent recommends | No | No | Yes (A5) | Medium | R3 | |
| Redirect or decommission a domain | CEO Agent recommends | No | No | Yes (A5) | High | R4 | |
| Modify DNS or hosting configuration | N/A | No | No | Yes (A5) | High | R4 | Human only; no agent authority |
| Install or modify tracking pixels | CEO Agent recommends | No | No | Yes (A5) | High | R3 | Compliance risk; human must review |
| Add a new MCP tool integration | CEO Agent recommends | No | No | Yes (A5) | Medium | R3 | Expands automation surface |
| Remove an MCP tool integration | CEO Agent recommends | No | Yes (A4) | No | Low | R2 | |
| Issue Platform Risk Hold | Risk & Platform Sentinel | Yes (A2) | Notified immediately | No | — | R1 | Hold freezes affected operations |
| Override a Platform Risk Hold (P2 event) | CEO Agent | No | Yes (A4) | No | Medium | R2 | CEO Agent accepts risk on record |
| Override a Platform Risk Hold (P3+ event) | CEO Agent recommends | No | No | Yes (A5) | High | R2 | Human must accept risk explicitly |

---

### Section E: Strategic Decisions

| Decision | Initiator | Auto-Execute | CEO Approval | Human Approval | Risk | Reversibility | Notes |
|---|---|---|---|---|---|---|---|
| Issue directive to any squad | CEO Agent | Yes (A3) | Logged | No | Low | R1 | Standard operating authority |
| Approve a new offer or product positioning | CEO Agent | No | No | Yes (A5) | High | R3 | Strategy Advisor prepares analysis |
| Approve entry into a new market or audience | CEO Agent recommends | No | No | Yes (A5) | High | R3 | Research Squad validates first |
| Approve a strategic pivot (major angle or offer shift) | CEO Agent recommends | No | No | Yes (A5) | High | R3 | Requires Research Squad MIB support |
| Approve a new partnership or vendor engagement | CEO Agent recommends | No | No | Yes (A5) | High | R4 | Legal/contractual; human only |
| Arbitrate a cross-squad conflict | CEO Agent | No | Yes (A4) | No (unless contested) | Medium | R2 | Binding; logs both sides' positions |
| Arbitrate a contested conflict (squad lead refuses arbitration) | CEO Agent | No | No | Yes (A5) | Medium | R2 | Human owner makes final call |
| Approve a competitive counter-campaign | CEO Agent | No | Yes (A4) if ≤ Medium Risk Ceiling | Yes (A5) if > Medium | Medium–High | R2 | Competitive Hawk alert is prerequisite |

---

### Section F: System & Governance Decisions

| Decision | Initiator | Auto-Execute | CEO Approval | Human Approval | Risk | Reversibility | Notes |
|---|---|---|---|---|---|---|---|
| Add a new squad to the AIOS | CEO Agent recommends | No | No | Yes (A5) | High | R3 | Architectural change |
| Remove a squad from the AIOS | CEO Agent recommends | No | No | Yes (A5) | High | R4 | Data/workflow implications |
| Add an agent to an existing squad | CEO Agent recommends | No | Yes (A4) | No | Low | R2 | Squad DNA must be updated |
| Remove an agent from an existing squad | CEO Agent recommends | No | No | Yes (A5) | Medium | R3 | May affect squad outputs |
| Amend any squad DNA file | CEO Agent or squad lead proposes | No | No | Yes (A5) | High | R3 | All squad DNA amendments require human approval |
| Amend Governance Framework | CEO Agent or squad lead proposes | No | No | Yes (A5) | High | R3 | Governance is human-owned |
| Amend Decision Authority Matrix | CEO Agent proposes | No | No | Yes (A5) | High | R3 | |
| Set or change owner operating mode | Human Owner only | N/A | N/A | Human only | High | R2 | No agent authority over this setting |
| Set or change budget thresholds | Human Owner only | N/A | N/A | Human only | High | R3 | Stored in `governance/owner-settings.md` |
| Issue Emergency Stop | Human Owner only | N/A | N/A | Human only | Critical | R1 | Immediate effect; requires human restart |
| Activate Emergency Stop rollback / resume | Human Owner only | N/A | N/A | Human only | High | R1 | CEO Agent prepares status briefing first |

---

## Escalation Response Time Standards

When the CEO Agent delivers a decision requiring human approval, the following response time standards apply:

| Decision Tier | Standard Response Window | Behavior if No Response |
|---|---|---|
| A5 — Standard | 24 hours | CEO Agent sends follow-up escalation flag at 24 hours; then again at 48 hours; does not auto-proceed |
| A5 — Urgent (time-sensitive opportunity or active risk) | 4 hours | CEO Agent flags as Urgent in escalation packet; follow-up at 4 hours and 8 hours; does not auto-proceed |
| A5 — Critical (P4/P5 platform event, financial loss in progress) | Immediate | CEO Agent uses highest-priority channel; operations in the affected area are paused; does not auto-proceed |

**The CEO Agent never auto-proceeds on a Tier A5 decision regardless of elapsed time.** If the human owner is unreachable and an A5 decision is blocking operations:
1. The blocked action remains paused
2. The CEO Agent logs the blockage with timestamp
3. The CEO Agent continues operating on all non-blocked Tier 1 decisions
4. When the human owner returns, they receive a full status brief before approving or rejecting

---

## Decision Log Reference

All decisions tracked by this matrix are logged in:
- `data/decisions/` — individual decision records
- `data/decisions/weekly-digest/` — weekly summary delivered to human owner
- `data/logs/actions/` — granular action-level logs

The human owner may audit any decision at any time by reading the log files directly. The CEO Agent does not filter or curate the decision log.

---

*Decision Authority Matrix — authored by AIOS Operator. Maintained in `governance/decision-authority-matrix.md`. All amendments require human owner approval. Cross-reference: `governance/governance-framework.md`.*
