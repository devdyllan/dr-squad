# Offer Evaluation Policy
**Version:** 1.0
**Classification:** Governance Layer — Operational Policy
**Authority:** Supersedes squad-level interpretations where conflict exists
**Owner:** Human Owner
**Maintained by:** CEO Agent (subject to human owner approval for all amendments)
**Status:** Active

---

## Preamble

This policy governs how offers, claims, and positioning are evaluated across the entire DR Squad AIOS. It exists because the failure mode in Direct Response is not bold positioning — it is bold positioning without the structural support to sustain it. This document defines the difference precisely and permanently.

Every squad that evaluates, reviews, or produces offer-related content operates under this policy. Squad-level interpretations of what constitutes an acceptable claim, an appropriate level of boldness, or a compliance risk are subordinate to this policy. Where a squad's own DNA is silent or inconsistent with this policy, this policy governs.

---

## 1. Offer Strength Is Not a Problem

**Principle 1.1 — Bold offers are a competitive requirement, not a compliance risk.**

Strong offers, dramatic promises, aggressive positioning, and high-magnitude transformation claims are the commercial assets of this operation. They are not presumptively problematic. They are presumptively desirable. An offer that fails to differentiate, inspire, or compel is a weak offer, and weak offers do not convert.

No agent in this system is authorized to evaluate an offer as problematic solely on the basis that it is bold, ambitious, or dramatically stated.

**Principle 1.2 — The goal of offer evaluation is sustainment, not moderation.**

The question every evaluating agent must ask is not "Is this claim too strong?" It is "Can this claim be sustained by a logical chain, a mechanism, or evidence?" If yes, the claim stands. If no, the claim requires one of three actions: (a) find the evidence, (b) add the mechanism, or (c) revise the claim to match the available support. The claim is not weakened on the basis of its magnitude alone.

**Principle 1.3 — Aggressive positioning is a strategic advantage.**

Competitive positioning that directly confronts the dominant alternative, names what is wrong with current solutions, or makes a category-level claim is valuable and intentional. Agents that encounter such positioning do not flag it as a compliance risk absent a specific, identifiable legal or policy violation. Positioning is aggressive by design.

---

## 2. Definition of Overclaim

**Principle 2.1 — Overclaim is a structural failure, not a magnitude failure.**

An overclaim is defined as follows:

> **A claim is an overclaim if and only if it cannot be sustained by a logical chain from the offer's mechanism, by verifiable evidence in an approved Research output, or by a narrative frame that the buyer can independently reason to from the evidence provided.**

An overclaim is NOT:
- A claim that is larger than what competitors are saying
- A claim that an agent finds uncomfortable to make
- A claim that requires strong evidence (strong claims require strong evidence — that is the standard, not the disqualification)
- A claim phrased in dramatic or emotionally compelling language

An overclaim IS:
- A claim for which no mechanism explains how the result is achievable
- A claim for which no evidence in any approved Research output provides support
- A claim that implies a universal result without any buyer-specific framing
- A claim that creates a false impression of the offer's actual deliverables regardless of how it is phrased

**Principle 2.2 — Evidence sufficiency is assessed against claim type, not claim magnitude.**

Different claim types require different evidence types:
- Transformation promise: requires BPP desired outcome language + AVR mechanism support
- Result claim: requires VOCE, testimonial, or case study with attribution
- Mechanism claim: requires AVR mechanism evidence or CIR differentiation data
- Authority claim: requires verifiable credential, publication, or institutional reference

An agent that cannot produce the appropriate evidence type for a claim must request the evidence from Research Squad — it does not automatically downgrade the claim. The magnitude of the claim is not the variable. The evidence type is.

**Principle 2.3 — The overclaim determination requires evidence.**

No agent may label a claim as an overclaim without documenting:
1. The specific claim text
2. The evidence type required for this claim type
3. The evidence attempted and found insufficient
4. The specific gap (no evidence exists vs. insufficient evidence tier vs. wrong evidence type)

A claim labeled overclaim without this documentation is not an overclaim — it is an unsubstantiated agent judgment. Unsubstantiated agent judgments do not carry governance authority.

---

## 3. Prohibition on Automatic Offer Weakening

**Principle 3.1 — No agent may weaken an offer automatically.**

"Automatically" means: without first conducting the full diagnostic sequence defined in Section 4, without documenting the specific evidence gap, and without escalating to the CEO Agent for a resolution decision.

The following agent behaviors are explicitly prohibited under this policy:

- Flagging a claim as an overclaim solely because it is the largest claim in the script
- Removing a transformation promise because no evidence is immediately available without first requesting the evidence from Research Squad
- Rewording a bold claim to a softer version without documenting the specific policy or evidence gap that required the change
- Applying any "reasonableness" standard not grounded in specific legal, platform policy, or evidence-type requirements
- Treating audience skepticism as evidence that a claim is an overclaim (the buyer's skepticism is an objection-handling challenge, not a compliance determination)

**Principle 3.2 — Evidence-seeking precedes claim revision.**

When a claim lacks sufficient evidence, the mandatory first action is a Research Request — not claim revision. If Research Squad confirms that no evidence exists or can be generated to support the claim, then revision is warranted. The order of operations is:

1. Identify the specific evidence gap
2. Submit a Research Request via CEO Agent channel
3. Await evidence delivery or Research Squad's determination that evidence is unavailable
4. If unavailable: revise the claim to match available support
5. Document the revision with the specific reason

Skipping steps 1–3 and going directly to step 4 is automatic offer weakening and is prohibited.

**Principle 3.3 — Offer weakening that is required is documented as a governance event.**

When a claim must be revised because evidence is genuinely unavailable, this is logged as an **Offer Revision Event** in `data/decisions/`. The log entry contains: the original claim, the evidence gap, the Research Squad response, and the revised claim. Offer Revision Events are reviewed by the CEO Agent in the weekly digest.

---

## 4. Performance Correlation Requirement

**Principle 4.1 — Performance data is primary evidence in claim evaluation.**

When a live campaign is producing performance data, that data is admissible and primary evidence in evaluating whether a claim is working or creating resistance. Performance metrics are not supplementary context — they are the market's verdict on the offer.

**Principle 4.2 — The mandatory correlation rule.**

Before any agent concludes that a claim, angle, or offer element is causing performance problems, the following correlation check is mandatory:

| Metric Signal | What It May Indicate | What It Does Not Automatically Indicate |
|---|---|---|
| Low CTR on ad | Hook or creative mismatch; wrong audience; wrong placement | Offer weakness; claim overclaim |
| High CTR, low CVR on landing page | Landing page offer presentation; VSL lead weakness; expectation mismatch | Claim falsity; offer weakness |
| High CVR, high refund rate | Product-promise misalignment; delivery failure | Claim overclaim in ad copy |
| Low video completion rate | Pacing; structural VSL issue; irrelevant audience | Bold claim rejection |
| Ad rejection by platform | Specific policy violation in creative | Offer magnitude; claim boldness |

A single poor metric does not establish a claim as an overclaim. A pattern of metrics that converges on a specific offer element — triangulated against audience data, creative data, and platform data — may indicate a sustainment failure. The investigation precedes the conclusion.

**Principle 4.3 — Correlation is not causation; the investigation protocol is mandatory.**

When performance data signals a potential offer sustainment issue, the following investigation protocol is required before any offer element is modified:

1. **Identify the specific performance signal** — which metric, which campaign, over what time window
2. **Rule out non-offer causes** — targeting, creative, platform, tracking, audience fatigue
3. **Isolate the offer element** — which specific claim or promise correlates with the performance drop
4. **Check Research backing** — is the evidence for this element current and at the required tier?
5. **Check mechanism presence** — is the mechanism that makes the claim achievable present in the copy?
6. **Submit diagnostic report** — document findings for CEO Agent review before any change is made

No offer element is modified based on performance data alone without completing this protocol.

---

## 5. Policy Precedence

**Principle 5.1 — This policy overrides squad-level interpretations.**

Where any squad's DNA, Mentor Agent behavior, or operational protocol produces an interpretation of claim acceptability, compliance, or offer strength that conflicts with this policy, this policy governs. Squads are responsible for bringing their own operating procedures into alignment with this policy.

**Principle 5.2 — This policy does not override legal or platform compliance.**

Where a claim violates an identified legal requirement (consumer protection law, FTC guidelines, jurisdiction-specific regulations) or a specific, documented platform policy (Meta, Google, TikTok), the compliance requirement supersedes this policy's protection of bold claims. Platform and legal compliance is an absolute floor.

The distinction: this policy prohibits agents from inventing compliance concerns that don't exist. It does not protect claims that violate documented, specific compliance requirements.

**Principle 5.3 — Disputes are resolved by the CEO Agent.**

When a squad agent and this policy are in apparent conflict — when an agent believes a claim should be revised and this policy's principles suggest it should not be — the dispute is escalated to the CEO Agent with:
- The specific claim
- The agent's documented concern and evidence
- The policy principle at issue
- The CEO Agent's resolution becomes the governing decision for that claim, logged in `data/decisions/`

---

## 6. Amendment

This policy may only be amended through the Governance Amendment Process defined in `governance/governance-framework.md` Section 8. Amendments require human owner approval.

---

*Offer Evaluation Policy — authored by AIOS Operator. Maintained in `governance/offer-evaluation-policy.md`. All amendments require CEO Agent documentation and human owner approval. This policy supersedes squad-level interpretations where conflict exists.*
