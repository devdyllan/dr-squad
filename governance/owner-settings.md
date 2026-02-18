# Owner Settings
**Classification:** Governance Layer — Human Owner Configuration
**Maintained by:** Human Owner only. No agent may modify this file.
**Status:** Pending owner configuration

---

## Instructions

This file stores the human owner's operational settings for the DR Squad AIOS. The CEO Agent reads this file at the start of every decision cycle. No agent may modify this file. All changes are made directly by the human owner.

---

## Operating Mode

```
owner.operating_mode: standard
# Options: active | standard | delegated
# See governance/governance-framework.md Section 1.2 for definitions.
```

---

## Budget Thresholds

```
budget.low_risk_ceiling: 500
# Currency: USD. Per-action spend at or below this amount — CEO Agent autonomous (A4).

budget.medium_risk_ceiling: 2000
# Per-action spend above low and at or below this amount — human review required (A5).

budget.high_risk_ceiling: 10000
# Per-action spend above medium and at or below this amount — human explicit approval (A5).
# Spend above this amount: human explicit approval, no time limit.

budget.period_ceiling: 25000
# Total monthly spend ceiling across all campaigns. CEO Agent pauses new approvals at 100%.

budget.warning_threshold: 0.80
# CEO Agent issues Budget Warning when cumulative spend reaches this % of period_ceiling.
```

---

## Platform Risk Settings

```
platform_risk.auto_halt_on: P4
# Options: P3 | P4 | P5
# At this risk level and above, all automated spend halts immediately pending human review.
# Default: P4. Setting to P3 provides earlier automatic protection.

platform_risk.notification_channel: [TO BE CONFIGURED]
# How the human owner receives escalation packets and risk alerts.
# Options: email | slack | webhook | file
```

---

## Escalation Contact

```
escalation.primary_channel: [TO BE CONFIGURED]
# Primary channel for CEO Agent to reach the human owner for A5 decisions and emergencies.

escalation.urgent_response_window_hours: 4
# Hours within which the human owner commits to respond to Urgent A5 escalations.

escalation.standard_response_window_hours: 24
# Hours within which the human owner commits to respond to Standard A5 escalations.
```

---

## API Cost Governance

These thresholds are read exclusively by the API Cost Sentinel (`agents/api-cost-sentinel.md`). No agent may modify these values. All changes are made directly by the human owner.

```
# Per-service daily ceilings (USD). Set to 0 to block a service entirely.
api_costs.daily_ceiling_usd.aggregate: [TO BE SET BY OWNER]
api_costs.daily_ceiling_usd.anthropic_api: [TO BE SET BY OWNER]
api_costs.daily_ceiling_usd.openai_api: [TO BE SET BY OWNER]
api_costs.daily_ceiling_usd.proxy_services: [TO BE SET BY OWNER]
api_costs.daily_ceiling_usd.scraping_services: [TO BE SET BY OWNER]
api_costs.daily_ceiling_usd.transcription_services: [TO BE SET BY OWNER]
api_costs.daily_ceiling_usd.other_apis: [TO BE SET BY OWNER]

# Weekly ceilings (USD)
api_costs.weekly_ceiling_usd.aggregate: [TO BE SET BY OWNER]

# Monthly ceilings (USD)
api_costs.monthly_ceiling_usd.aggregate: [TO BE SET BY OWNER]

# Threshold levels — do not change without understanding the enforcement actions
api_costs.notify_threshold: 0.70   # 70%  → Owner notification via CEO Agent
api_costs.freeze_threshold: 0.85   # 85%  → Auto-freeze of affected automations
api_costs.halt_threshold:   1.00   # 100% → Emergency halt — all API-consuming ops stop

# NO AUTO-RESUME. Freeze and halt require explicit Owner approval to lift.
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

- This file uses YAML-style syntax for readability. It is not parsed as YAML by default — confirm with your MCP configuration whether formal parsing is enabled.
- To update a setting, edit the value directly and note the change date in the amendment log below.
- The API Cost Governance section is the single source of truth for all API budget thresholds. The API Cost Sentinel reads only from this file — no other configuration source overrides it.

---

## Amendment Log

| Date | Setting Changed | Old Value | New Value | Owner |
|---|---|---|---|---|
| _(pending initial configuration)_ | — | — | — | — |

---

*Owner Settings — human owner configuration file. No agent authority. Maintained in `governance/owner-settings.md`.*
