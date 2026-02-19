# Owner Settings
**Classification:** Governance Layer — Human Owner Configuration
**Maintained by:** Human Owner only. No agent may modify this file.
**Status:** Active — configured 2026-02-19

---

## Instructions

This file stores the human owner's operational settings for the DR Squad AIOS. The CEO Agent reads this file at the start of every decision cycle. No agent may modify this file. All changes are made directly by the human owner.

---

## Operating Mode

```
owner.operating_mode: active
# Options: active | standard | delegated
# active = Owner reviews most decisions; CEO Agent surfaces all Tier 2+ decisions promptly.
# Starting in active mode for initial research phase — switch to standard once ops are running.
# See governance/governance-framework.md Section 1.2 for definitions.
```

---

## Budget Thresholds

```
budget.low_risk_ceiling: 0
# Research phase: no ad spend authorized. Set to 0 to block all autonomous spend.
# Update when transitioning from research phase to media buying phase.

budget.medium_risk_ceiling: 0
budget.high_risk_ceiling: 0

budget.period_ceiling: 0
# No campaign spend in research phase. All spend decisions require Owner approval (A5).

budget.warning_threshold: 0.80
```

---

## Platform Risk Settings

```
platform_risk.auto_halt_on: P3
# Set to P3 for maximum protection during research phase.
# Any policy flag triggers automatic hold before any action is taken.

platform_risk.notification_channel: whatsapp
# WhatsApp is the primary alert channel.
```

---

## Escalation Contact

```
escalation.primary_channel: whatsapp://+16176728278

escalation.urgent_response_window_hours: 4
# Hours within which you commit to respond to Urgent A5 escalations.

escalation.standard_response_window_hours: 24
# Hours within which you commit to respond to Standard A5 escalations.
```

---

## API Cost Governance

These thresholds are read exclusively by the API Cost Sentinel (`agents/api-cost-sentinel.md`). No agent may modify these values. All changes are made directly by the human owner.

```
# HARD CEILING: $100 USD total per month across ALL services.

# Daily aggregate ceiling (100 / 30 days = $3.33/day)
api_costs.daily_ceiling_usd.aggregate: 3.35

# Per-service daily ceilings (must sum to ≤ aggregate)
api_costs.daily_ceiling_usd.anthropic_api:        3.00   # Main LLM — $90/month
api_costs.daily_ceiling_usd.openai_api:           0.00   # Not in use — research phase
api_costs.daily_ceiling_usd.proxy_services:       0.17   # $5/month — research browsing
api_costs.daily_ceiling_usd.scraping_services:    0.00   # Free sources only — $0
api_costs.daily_ceiling_usd.transcription_services: 0.00 # Not in use — research phase
api_costs.daily_ceiling_usd.other_apis:           0.17   # $5/month buffer

# Weekly ceiling
api_costs.weekly_ceiling_usd.aggregate: 25.00

# Monthly ceiling — absolute hard cap
api_costs.monthly_ceiling_usd.aggregate: 100.00

# Threshold enforcement levels
api_costs.notify_threshold: 0.70   # $70 spent → Owner notified via WhatsApp
api_costs.freeze_threshold: 0.85   # $85 spent → Auto-freeze all automations
api_costs.halt_threshold:   1.00   # $100 spent → Emergency halt, full stop

# NO AUTO-RESUME. Owner WhatsApp approval required to lift any freeze or halt.
```

---

## Research Phase Settings

```
research.budget_usd: 0
# Research phase uses FREE sources only. Zero spend authorized.
# Authorized free sources: Facebook Ad Library, YouTube comments, Reddit,
# Instagram, health forums, German/Austrian/Swiss consumer blogs, Google Search.
# NO paid research tools, no API data purchases, no panel surveys.

research.target_markets: Luxembourg, Austria, Germany, Switzerland
research.target_niches: weight_loss, erectile_dysfunction
research.product_category: nutraceutical
research.primary_languages: de, fr, en
# de = German (primary for AT, DE, CH, partial LU)
# fr = French (primary for LU, partial CH)
# en = secondary / product research
```

---

## Contingency Infrastructure Settings

```
contingency.require_owner_approval_for_activation: true
# Cannot be set to false by any agent. Owner-only infrastructure gate.

contingency.default_to_stop_on_ambiguity: true
# Any ambiguous environment classification defaults to STOP and escalation.

contingency.cross_contamination_response: IMMEDIATE_HALT
# Cannot be overridden. Cross-contamination triggers full halt + Owner notification.
```

---

## Notes

- All budget thresholds are $0 during research phase — update when transitioning to media buying.
- This file uses YAML-style syntax for readability.
- The API Cost Governance section is the single source of truth for all API budget thresholds. The API Cost Sentinel reads only from this file.

---

## Amendment Log

| Date | Setting Changed | Old Value | New Value | Owner |
|---|---|---|---|---|
| 2026-02-19 | Initial configuration | — | Full config set | Owner |
| 2026-02-19 | operating_mode | pending | active | Owner |
| 2026-02-19 | api_costs.monthly_ceiling_usd.aggregate | TO BE SET | 100.00 | Owner |
| 2026-02-19 | budget.period_ceiling | 25000 | 0 (research phase) | Owner |
| 2026-02-19 | platform_risk.auto_halt_on | P4 | P3 (max protection) | Owner |
| 2026-02-19 | platform_risk.notification_channel | TO BE CONFIGURED | whatsapp | Owner |
| 2026-02-19 | research phase settings | — | Added research block | Owner |
| 2026-02-19 | escalation.primary_channel | TO BE CONFIGURED | whatsapp://+16176728278 | Owner |

---

*Owner Settings — human owner configuration file. No agent authority. Maintained in `governance/owner-settings.md`.*
