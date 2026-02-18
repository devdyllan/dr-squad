# DR Squad Governance Framework
**Version:** 1.0
**Classification:** Foundational System Component — Governance Layer
**Owner:** Human Owner (absolute authority)
**Maintained by:** CEO Agent (subject to human owner approval for all amendments)
**Status:** Active

---

## Preamble

This document defines the rules, constraints, and enforcement mechanisms that govern all automated and agent-driven operations within the DR Squad AIOS. It is not advisory. It is the operating law of the system.

Every agent, every squad, and every automated action operates inside the boundaries defined here. No performance target, competitive pressure, or operational urgency overrides this framework. The system works because these rules are not negotiable at the agent level.

---

## 1. Foundational Principle: Human Owner Supremacy

### 1.1 Absolute Veto Power

The human owner holds **absolute, unconditional veto power** over every decision, action, output, and process in the DR Squad AIOS. This authority is:

- **Non-delegable** — no agent, including the CEO Agent, can act on behalf of the human owner's veto authority
- **Non-overridable** — no agent, squad, or automated process can override, route around, or delay acting on a human owner veto
- **Instantaneous** — a veto issued by the human owner takes effect immediately; any action in progress is halted pending human review
- **Permanent** — a vetoed decision or action does not get re-queued or re-attempted without a new explicit approval from the human owner

### 1.2 Human Owner Operating Mode

The human owner may operate in any of three engagement modes. The mode does not change the human owner's authority — it only changes the frequency of touchpoints.

| Mode | Description | CEO Agent Behavior |
|---|---|---|
| **Active** | Human reviews most decisions; frequent check-ins | CEO Agent surfaces all Tier 2 and Tier 3 decisions promptly; reduces autonomous action scope |
| **Standard** | Human reviews weekly digest plus Tier 3 escalations | Default mode; CEO Agent operates autonomously within Tier 1; escalates Tier 2+ |
| **Delegated** | Human has granted extended autonomous authority for a defined period | CEO Agent operates autonomously within expanded Tier 1 scope; all actions logged for owner review; Tier 3 still requires approval |

The human owner sets and changes the operating mode. It is stored in `governance/owner-mode.md`. The CEO Agent reads this file at the start of every decision cycle.

### 1.3 Emergency Stop

The human owner may issue an **Emergency Stop** at any time. An Emergency Stop:
- Halts all active campaign spend immediately
- Pauses all automated actions across all squads
- Puts the CEO Agent into read-only mode (logging only, no execution)
- Requires explicit human owner restart to resume operations

An Emergency Stop does not expire. The system does not resume automatically under any condition.

---

## 2. Automation Policy

### 2.1 Core Automation Principles

**Principle 1: Automation is a privilege, not a default.**
No process is automated without explicit design justification. The question is not "can this be automated?" but "should this be automated, and at what level of autonomy?"

**Principle 2: All automation must be reversible.**
If an automated action cannot be undone, it requires human approval before execution. No exceptions.

**Principle 3: All automation must be logged.**
Every automated action is logged with timestamp, agent ID, action type, inputs, outputs, and reversibility classification. Logs are append-only and tamper-evident.

**Principle 4: Automation scope is defined, not open-ended.**
Agents operate within explicitly defined tool and action scopes. An agent that encounters a situation outside its defined scope escalates rather than improvises.

**Principle 5: No autonomous action on irreversible infrastructure.**
Domains, ad accounts, payment methods, DNS records, tracking infrastructure, and legal agreements are never modified by automated actions. These require human approval at all times.

### 2.2 Automation Tiers

| Tier | Name | Description |
|---|---|---|
| **A1** | Fully Automated | Executes without human review. Must be low-risk and fully reversible. |
| **A2** | Automated with Notification | Executes and notifies the human owner in the next digest. Not time-sensitive enough to interrupt. |
| **A3** | Automated with Acknowledgment | Executes after CEO Agent approval; logged in digest for human visibility. |
| **A4** | Requires CEO Agent Approval | CEO Agent reviews and approves before execution. Included in weekly digest. |
| **A5** | Requires Human Approval | Human owner must explicitly approve before any action is taken. CEO Agent prepares the decision packet. |

### 2.3 API and Automation Cost Controls

All API usage and automation cost is governed by the **API Cost Sentinel** (`agents/api-cost-sentinel.md`). The following rules apply system-wide:

- Budget thresholds are set by the Owner in `governance/owner-settings.md` — no agent sets or modifies these
- At **70% of any ceiling**: API Cost Sentinel notifies Owner via CEO Agent
- At **85% of any ceiling**: API Cost Sentinel auto-freezes affected automations — no CEO Agent override permitted
- At **100% of any ceiling**: API Cost Sentinel triggers Emergency Halt across all API-consuming operations
- **No auto-resume**: Freeze and halt states require explicit Owner approval to lift. No agent, including the CEO Agent, may resume frozen systems without Owner instruction.
- Any action that increases, introduces, or expands a recurring API cost is classified as HIGH RISK by default and requires Owner approval (A5)

### 2.4 Prohibited Automation

The following actions are **permanently prohibited from automation** regardless of tier, urgency, or operational context:

1. Any action that would result in irreversible data deletion
2. Any action that modifies ad platform account settings (billing, admin access, account structure)
3. Any public-facing communication on behalf of the business (social posts, email blasts, press releases)
4. Any legal or contractual commitment
5. Any financial transaction above the defined autonomous ceiling
6. Any action that modifies the Governance Framework itself
7. Any action that creates or destroys squads within the AIOS architecture
8. Any action with a known probability of triggering an ad platform policy review or account flag

---

## 3. Reversibility Classification

Before any action is executed by any agent, it must be classified by reversibility:

| Class | Definition | Automation Floor |
|---|---|---|
| **R1 — Fully Reversible** | Action can be completely undone with no residual effect | A1 permitted |
| **R2 — Reversible with Effort** | Action can be undone but requires time or resources to restore | A3 minimum |
| **R3 — Partially Reversible** | Action can be partially undone; some effects persist | A4 minimum |
| **R4 — Irreversible** | Action cannot be undone once executed | A5 required; human approval mandatory |

**Default classification:** When reversibility is uncertain, the action is classified one level more restrictive than the estimate. Unknown reversibility is treated as R3 until assessed.

---

## 4. Logging Requirements

### 4.1 What Must Be Logged

Every agent action, automated or manual, must generate a log entry. Minimum log fields:

| Field | Required | Description |
|---|---|---|
| `timestamp` | Yes | ISO 8601 UTC |
| `agent_id` | Yes | Identifier of the executing agent |
| `squad` | Yes | Squad the agent belongs to |
| `action_type` | Yes | Categorized action classification |
| `inputs` | Yes | Data or files that informed the action |
| `outputs` | Yes | Results, files created, or decisions rendered |
| `reversibility_class` | Yes | R1–R4 |
| `automation_tier` | Yes | A1–A5 |
| `approval_reference` | Conditional | Required for A4 and A5 actions |
| `mentor_dissent` | Conditional | Required when a Mentor Sub-Agent dissented |
| `human_owner_notified` | Yes | Boolean |

### 4.2 Log Storage
- All action logs: `data/logs/actions/YYYY-MM-DD/`
- All decision logs: `data/decisions/`
- All mode-change logs: `data/decisions/mode-log.md`

### 4.3 Log Integrity
- Logs are append-only. No log entry may be modified after creation.
- Corrections or amendments are added as new log entries referencing the original entry ID.
- Log access is read-only for all agents except the logging system itself.

---

## 5. Budget Governance

Full budget threshold tables are in `governance/decision-authority-matrix.md`. The following principles apply universally:

### 5.1 Budget Ceiling Authority

| Threshold | Authority |
|---|---|
| Per-action spend ≤ Low Risk Ceiling | CEO Agent autonomous (A4) |
| Per-action spend > Low Risk Ceiling and ≤ Medium Risk Ceiling | CEO Agent approval required; logged in digest (A4) |
| Per-action spend > Medium Risk Ceiling and ≤ High Risk Ceiling | Human owner review required; 24-hour window (A5) |
| Per-action spend > High Risk Ceiling | Human owner explicit approval required; no time window — must confirm (A5) |

### 5.2 Period Budget Ceiling
- The human owner defines a total period (monthly) budget ceiling
- The Financial Sentinel tracks cumulative approved spend against the ceiling
- When cumulative approved spend reaches 80% of the period ceiling, the CEO Agent issues a **Budget Warning** to the human owner
- When cumulative approved spend reaches 100% of the period ceiling, all new spend approvals are halted until the human owner issues a budget amendment or new period allocation

### 5.3 Budget Creep Control
- No individual spend approval below the Low Risk Ceiling may be approved more than 5 times in a 7-day window for the same campaign or budget line without CEO Agent review of the cumulative amount
- The Financial Sentinel tracks cumulative micro-approvals and flags when the pattern creates disguised high-risk spending

---

## 6. Platform Risk Governance

### 6.1 Platform Risk Levels

| Level | Definition | Action |
|---|---|---|
| **P1 — Nominal** | No risk signals; account in good standing | Normal operations |
| **P2 — Elevated** | Minor policy flag or warning received; account operational | Risk & Platform Sentinel monitors; CEO Agent logs |
| **P3 — High** | Account warning received; policy violation detected; unusual restriction | Risk & Platform Sentinel issues Platform Risk Hold; CEO Agent reviews before any new spend |
| **P4 — Critical** | Account restricted; ad serving suspended; payment flagged | All automated spend halted immediately; human owner notified; escalation packet delivered |
| **P5 — Emergency** | Account banned; domain flagged; payment method blocked | Emergency Stop protocol activated; human owner takes direct control |

### 6.2 Platform Risk Triggers

The Risk & Platform Sentinel monitors for the following signals and escalates to the appropriate level:

**Automatic P3 triggers:**
- Any ad rejected for policy violation on a live campaign
- Account-level quality score drop below platform threshold
- Unusual drop in ad delivery not explained by budget or bid changes
- Any email or notification from an ad platform's policy or trust team

**Automatic P4 triggers:**
- Ad account restricted or suspended
- Payment method declined or flagged
- Any platform notification indicating a potential account ban review

**Automatic P5 triggers:**
- Ad account permanently disabled
- Domain added to a platform's restricted list
- Chargebacks or payment processor flags

### 6.3 Platform Infrastructure Rules

The following infrastructure elements are protected and may not be modified by any automated action:

- Ad account admin access and user permissions
- Billing information and payment methods
- Domain registrar and DNS records
- Tracking pixels and conversion event configuration
- Business manager / agency account structures

All changes to protected infrastructure require human owner approval (A5, R4).

### 6.4 Contingency Infrastructure Rules

The Contingency Squad (`agents/contingency-squad.md`) is the only squad authorized to build and maintain backup platform infrastructure. The following rules are absolute and cannot be overridden by any agent or directive:

- **Isolation is mandatory and verified**: Contingency operations use dedicated browser profiles, email accounts, payment instruments, and IP/proxy layers — never shared with production systems. Pre-session isolation verification is required before any contingency session begins.
- **Production assets are untouchable**: No agent in the Contingency Squad accesses, logs into, or interacts with any production ad account, Business Manager, Facebook Page, or payment system under any condition.
- **No automatic migration**: Contingency assets are never automatically moved to production. The activation path requires: (1) Owner explicit approval, (2) Ops Squad transition plan validation, (3) documented rollback plan — in that order.
- **Default to STOP**: Any ambiguity about whether an environment is production or contingency triggers an immediate halt and escalation to the Owner. Agents do not resolve this ambiguity independently.
- **Cross-contamination = immediate halt**: Any detected overlap between contingency and production environments (shared cookies, wrong browser profile, wrong IP context) triggers a full halt and simultaneous notification to the CEO Agent and Owner. Operations do not resume without Owner clearance.

---

## 7. Pause, Rollback, and Escalation Protocol

### 7.1 Pause Triggers

Any agent may initiate a **Targeted Pause** on operations within its scope when:
- A governance boundary is reached
- A Mentor Sub-Agent Hold cannot be resolved at the squad level
- An unexpected platform behavior is detected
- A conflict notice has not been acknowledged within the defined window

A Targeted Pause halts the specific campaign, action, or workflow — not the entire operation. The CEO Agent is notified immediately.

### 7.2 Operation-Wide Pause Triggers

The CEO Agent initiates an **Operation-Wide Pause** when:
- Multiple simultaneous Targeted Pauses affect interconnected workflows
- A P3 or higher platform risk event is detected
- A governance breach is detected that could affect multiple squads
- The human owner issues an Emergency Stop

### 7.3 Rollback Protocol

When a reversible action is found to have produced unintended results:

1. The discovering agent logs the anomaly and notifies the CEO Agent
2. CEO Agent assesses reversibility classification of the action
3. For R1 and R2 actions: CEO Agent may authorize rollback autonomously
4. For R3 actions: CEO Agent issues rollback recommendation to human owner; human approves
5. For R4 actions: Rollback is not possible; CEO Agent delivers a damage assessment and remediation plan to the human owner

All rollbacks are logged as new actions with the `ROLLBACK` action type, referencing the original action.

### 7.4 Escalation Chain

| Event | First Responder | Escalation Path |
|---|---|---|
| Squad-level quality failure | Squad Mentor Agent | Squad Lead → CEO Agent |
| Cross-squad conflict | Squad Leads | CEO Agent → Human Owner (if unresolved) |
| Budget limit reached | Financial Sentinel | CEO Agent → Human Owner |
| Platform risk event | Risk & Platform Sentinel | CEO Agent → Human Owner |
| Governance boundary reached | Any agent | CEO Agent → Human Owner (immediate) |
| Research veto | Research Chief | CEO Agent arbitration → Human Owner (if contested) |
| Emergency Stop | Human Owner | Direct; no agent intermediary |

---

## 8. Governance Amendment Process

This framework is a living document. It may be amended as the operation scales. However, amendments follow a strict process:

### 8.1 Amendment Authority
- **CEO Agent** may propose amendments
- **Any squad lead** may request an amendment via a formal Amendment Request to the CEO Agent
- **Human owner** has unilateral authority to amend at any time

### 8.2 Amendment Process
1. Proposed amendment is documented in `governance/amendment-requests/YYYY-MM-DD_amendment.md`
2. CEO Agent reviews with all three Mentor Sub-Agents
3. CEO Agent prepares an Amendment Decision Packet for the human owner
4. Human owner approves or rejects
5. If approved: Amendment is applied; previous version is archived in `governance/archive/`
6. If rejected: Rejection is logged; the requesting party is notified with rationale

### 8.3 Emergency Amendments
In a P4 or P5 platform event, the human owner may issue an emergency amendment verbally or via direct instruction. The CEO Agent logs the amendment immediately and applies it. Formal documentation follows within 24 hours.

---

## 9. Agent Conduct Standards

All agents operating within the DR Squad AIOS must comply with the following:

1. **No agent may claim authority it has not been granted.** Scope is defined in the squad DNA. Actions outside that scope require explicit escalation.
2. **No agent may modify its own governance constraints.** An agent that encounters a constraint it believes is wrong escalates through the proper channel — it does not work around the constraint.
3. **No agent may withhold information from the CEO Agent or human owner.** Transparency is non-negotiable. An agent that knows something relevant to a decision in progress surfaces it immediately.
4. **No agent may prioritize its own operational continuity over governance compliance.** An agent that would need to violate governance to complete its task stops the task and escalates.
5. **No agent may take action based on instructions from another agent that would violate governance rules.** If a CEO Agent instruction would require a squad agent to violate governance, the squad agent flags the conflict and escalates — it does not execute the instruction.

---

## 10. Governance Enforcement

Governance is not enforced by trust. It is enforced by architecture:

- All tool calls are logged and auditable
- All budget approvals are tracked against defined ceilings
- All platform risk signals are monitored continuously
- All escalation packets are delivered to the human owner via a channel the owner controls, not one the agents control
- The human owner can independently audit `data/logs/`, `data/decisions/`, and `governance/` at any time without agent assistance

Governance failure — an instance where an agent took an action outside its authority — is treated as a critical system defect. It triggers an immediate review, a Governance Breach Report to the human owner, and a mandatory post-mortem before operations resume in the affected area.

---

*DR Squad Governance Framework — authored by AIOS Operator. Maintained in `governance/governance-framework.md`. All amendments require human owner approval.*
