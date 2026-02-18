# Access Control Policy
**Version:** 1.0
**Classification:** Governance Layer — Operational Policy
**Authority:** Applies to all agents and Executors operating within the DR Squad AIOS
**Owner:** Human Owner
**Maintained by:** CEO Agent (subject to human owner approval for all amendments)
**Cross-reference:** `governance/governance-framework.md`, `data/assets/asset-registry.yaml`
**Status:** Active

---

## Preamble

Access to operational assets — ad accounts, business managers, social profiles, browser profiles, pixels, domains, and email accounts — is not a free variable. Agents do not choose which accounts to use. Browsers are not interchangeable. Platform credentials do not flow through task packets or data files.

This policy defines exactly how asset access is authorized, assigned, and logged across every squad and every Executor in the DR Squad AIOS. It exists because uncontrolled asset access is how operations get accounts banned, attribution broken, and governance bypassed.

---

## 1. Core Access Principles

### Principle AC-01 — No Free Asset Selection

**Agents may NOT choose accounts or browser profiles freely.**

An agent that needs to operate on a platform asset receives the asset alias via its Task Packet. The asset alias was placed in the Task Packet by the issuing authority (Contingency Chief, CEO Agent, or Ops/QC). The agent operates on the specified alias. It does not browse the asset registry for alternatives. It does not substitute a "similar" asset if the assigned one is unavailable.

If the assigned asset alias is unavailable, the agent outputs `BLOCKED: ASSET UNAVAILABLE — [alias]` and routes to the issuing authority. It does not proceed with a different asset.

### Principle AC-02 — Alias-Only Operation

**Agents operate only on assets referenced by alias in an approved Task Packet.**

The canonical asset alias format is `TYPE_REGION_NN` (e.g., `BM_US_01`, `ADACC_US_01`, `FBPAGE_US_01`). This alias is the only identifier that appears in Task Packets, execution logs, and output documents. Real account names, email addresses, usernames, or platform IDs are never written into Task Packets, agent outputs, or any file in the `data/` or `agents/` directories.

Credentials and actual account identifiers are retrieved from the approved secrets manager at execution time by the executing agent — they are not passed between agents or embedded in files.

### Principle AC-03 — Browser Profile Isolation

**Browser access is restricted to approved, isolated profiles referenced by alias in the Task Packet.**

Each browser profile is:
- Isolated: dedicated to a specific platform and operational context
- Aliased: referenced only as `BROWSER_PROFILE_[PLATFORM]_[NN]`
- Assigned: designated by the issuing authority in the Task Packet — not chosen by the Executor
- Non-interchangeable: a profile designated for META operations is not used for Google operations, and vice versa

An Executor that does not receive a browser profile alias in its Task Packet does not begin browser-based work. Output is `BLOCKED: NO BROWSER PROFILE ASSIGNED`.

### Principle AC-04 — Human Approval for Active Asset Changes

**Human owner approval is required for any action that changes ACTIVE assets or adds new assets to the registry.**

"Changes ACTIVE assets" includes:
- Attaching or modifying billing information on an active or to-be-activated ad account
- Changing admin roles or user permissions on a Business Manager or ad account
- Permanently retiring an ACTIVE asset
- Modifying DNS records or domain configuration on a live domain
- Changing the payment processor or checkout configuration on a live funnel

"Adding new assets" includes:
- Registering any new domain
- Creating any new Business Manager
- Adding any new asset alias to the asset registry

These are R4 (irreversible or high-consequence) actions. They require explicit human owner approval per `governance/governance-framework.md` Section 5 and the Decision Authority Matrix. No CEO Agent override is sufficient — human owner approval is the floor.

### Principle AC-05 — All Actions Logged with Asset ID

**Every action taken on any asset must include the asset alias as a mandatory log field.**

An action log entry without an asset alias reference is a governance gap. The Contingency Auditor flags log entries missing this field as violations. The pattern of missing asset IDs in logs indicates either a process failure or an agent operating outside its Task Packet scope — both of which require investigation.

Minimum fields for every asset-touching action log entry:

```
timestamp:       [ISO 8601 UTC]
agent_id:        [executing agent identifier]
task_id:         [Task Packet ID that authorized this action]
asset_id:        [alias from registry — mandatory]
action_type:     [categorized action]
action_detail:   [what was done]
platform_response: [what the platform returned]
reversibility_class: [R1–R4]
authorization_ref:  [CEO Agent or human owner approval reference, if R3/R4]
```

---

## 2. Asset Status and Permitted Actions

The asset registry (`data/assets/asset-registry.yaml`) defines the current status and `allowed_actions` for every asset alias. Agents may only perform actions that appear in the `allowed_actions` list for the asset's current status.

| Status | Permitted Action Scope | Who May Authorize Action |
|---|---|---|
| WARMING | Warm-up protocol actions only (organic posting, profile completion, browsing cadence) | Contingency Chief |
| READY | All allowed_actions in registry entry; no billing or campaign operations | Contingency Chief (Mode A); CEO Agent (Mode B activation) |
| ACTIVE | Campaign operations as defined in allowed_actions | Ads/Traffic Squad (campaigns); CEO Agent (structural changes) |
| ISOLATED | No actions permitted | Human owner required to change status |
| RETIRED | No actions permitted | Permanent — no status reversal |

Any action not listed in the asset's `allowed_actions` is prohibited regardless of who requests it. A Task Packet that asks an Executor to perform an action not in the asset's `allowed_actions` is returned with `BLOCKED: ACTION NOT AUTHORIZED FOR ASSET STATUS`.

---

## 3. Credential Handling

No credentials are stored in:
- Any file in the `data/` directory
- Any file in the `agents/` directory
- Any file in the `governance/` directory
- Any Task Packet
- Any log entry or output document
- Any agent's operational memory between sessions

Credentials are stored exclusively in the approved secrets manager designated for this operation. The specific secrets manager is configured at the system level and is not named in this document.

When an Executor requires credentials to act on an asset:
1. The Task Packet provides the asset alias
2. The Executor requests the credential for that alias from the secrets manager at runtime
3. The credential is used for the session and not retained beyond the session scope
4. The credential is never written to any output, log, or intermediary file

Credential rotation is the responsibility of the human owner and the Contingency Chief. When a credential must be rotated (e.g., after an ISOLATED event), the rotation is performed by the human owner directly in the secrets manager.

---

## 4. Asset Registry Governance

### 4.1 Registry Authority
The `data/assets/asset-registry.yaml` file is the system-wide authoritative record of all operational assets. It is maintained by the Contingency Chief with CEO Agent authorization for every addition. Amendments to ACTIVE asset entries require human owner approval.

### 4.2 Registry Access
| Role | Access Level |
|---|---|
| Human owner | Full read/write |
| CEO Agent | Full read; write for WARMING/READY entries with authorization; no direct write for ACTIVE entries |
| Contingency Chief | Full read; write for WARMING/READY entries with CEO Agent authorization |
| Contingency Auditor | Read-only |
| All other agents | Read-only (alias lookup for Task Packet validation) |
| Executors | Read-only (alias verification only) |

### 4.3 Registry Integrity
The asset registry is versioned. Every amendment creates a new version entry. The previous version is preserved in `data/assets/archive/`. No entry is deleted — retired assets are marked RETIRED, not removed.

---

## 5. Enforcement

### 5.1 Violation Handling
When any agent takes an action on an asset without a valid Task Packet reference, or on an asset not in the asset registry, or on an asset whose allowed_actions do not permit the taken action, the Contingency Auditor or Ops/QC Squad issues a **Governance Violation Notice** to the CEO Agent and the human owner.

Governance violations related to asset access are treated as high-priority incidents. They trigger:
1. Immediate review of the affected asset's status (potential ISOLATION)
2. Investigation of which Task Packet (if any) authorized the action
3. An Incident Report per `agents/ops-squad.md` standards
4. Review of the Executor's recent log entries for pattern violations

### 5.2 Exception Process
If an operational situation genuinely requires acting on an asset in a way not currently authorized by its `allowed_actions`, the Contingency Chief submits a formal request to the CEO Agent with:
- The specific action required
- The asset alias
- The operational reason
- The proposed reversibility classification
- The risk assessment

The CEO Agent approves or rejects. Human owner approval is required for any R3/R4 actions. No exception is executed without the approval on file.

---

## 6. Amendment

This policy may only be amended through the Governance Amendment Process defined in `governance/governance-framework.md` Section 8. Amendments require human owner approval.

---

*Access Control Policy — authored by AIOS Operator. Maintained in `governance/access-control-policy.md`. All amendments require CEO Agent documentation and human owner approval.*
