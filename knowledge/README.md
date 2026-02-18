# Knowledge Base — DR Squad Experiential Memory Layer

**Version:** 1.0
**Classification:** Shared Reference Infrastructure — Read by All Agents
**Maintained by:** CEO Agent (curation authority); all squads (contribution)
**Status:** Active

---

## Purpose

This directory is the **experiential memory layer** of the DR Squad.

It is not a repository of theory. It is a curated record of what has actually worked, what has failed, and why — drawn from real campaigns, real training material, and real market feedback. Every agent in the system treats this knowledge base as a **non-negotiable reference source** before generating hypotheses, writing copy, building campaigns, or making strategic recommendations.

The distinction between this directory and the `data/` directory:
- `data/` contains live operational outputs — active research, campaign metrics, execution logs
- `knowledge/` contains distilled, enduring reference material — patterns, frameworks, and case studies that have cleared curation review and are stable enough to inform future work

When a squad needs to understand what works in this market, this is where they look first.

---

## Directory Structure

```
knowledge/
│
├── swipes/                    # High-performing reference creative — studied, not copied
│   ├── vsl/                   # VSL scripts and transcript excerpts worth analyzing
│   ├── ads/                   # Ad creative (copy + structure) from high-performing campaigns
│   ├── hooks/                 # Proven hook patterns, opening lines, attention-capture structures
│   ├── headlines/             # Headline swipes by type: curiosity, pain, proof, identity, counter
│   └── emails/                # Email sequences and subject line patterns
│
├── frameworks/                # Structural models and decision tools — tested approaches
│   ├── copy/                  # Copywriting frameworks: structures, formulas, persuasion models
│   ├── traffic/               # Campaign structure frameworks, bid strategies, test designs
│   ├── offers/                # Offer architecture frameworks, value stack models, guarantee structures
│   └── vsl/                   # VSL structural frameworks, persuasion maps, section templates
│
├── trainings/                 # Knowledge extracted from courses, mentors, and expert sources
│   ├── transcripts/           # Raw or lightly edited transcripts of training material
│   ├── distilled-principles/  # Extracted, agent-ready principles from training content
│   └── call-notes/            # Notes from strategy calls, coaching sessions, expert interviews
│
├── case-studies/              # Documented campaign histories with analysis
│   ├── winners/               # What worked, why, and what made it repeatable
│   └── failures/              # What failed, root cause, and what it protects against
│
└── README.md                  # This file
```

---

## Usage Rules

### Who Uses This Directory

Every agent in the DR Squad is authorized to read this knowledge base. There are no read-access restrictions. Agents are expected to consult relevant sections before:

- Generating angles or hooks (→ `swipes/hooks/`, `swipes/headlines/`, `swipes/ads/`)
- Writing VSL scripts or sections (→ `swipes/vsl/`, `frameworks/vsl/`)
- Building landing page copy (→ `frameworks/copy/`, `swipes/ads/`)
- Structuring campaign tests (→ `frameworks/traffic/`)
- Designing or evaluating offers (→ `frameworks/offers/`, `case-studies/`)
- Synthesizing research into recommendations (→ `case-studies/`, `trainings/distilled-principles/`)

### Non-Negotiable Reference Requirement

When an agent generates a hypothesis, angle, or structural recommendation that conflicts with documented case study evidence in this directory, the conflict must be explicitly acknowledged in the agent's output. The agent states:
1. What the knowledge base evidence shows
2. Why the current recommendation departs from it
3. What additional evidence would be needed to validate the departure

Agents do not ignore documented failures. A framework or approach that is in `case-studies/failures/` is not used without an explicit documented rationale for why the current context differs from the failure case.

### Write Access — Curation Required

This directory is **curated, not open-write**. Agents do not autonomously add files to the knowledge base. Submissions follow this path:

1. **Any squad** may submit material for inclusion — via structured submission to Ops/QC
2. **Ops/QC** reviews for completeness and proper formatting
3. **ISA** evaluates strategic relevance and cross-squad utility
4. **CEO Agent** approves and assigns final placement
5. **CEO Agent** (or authorized squad lead) adds the file to the appropriate directory

This curation gate exists because an uncurated knowledge base degrades into noise faster than it accumulates signal. Every file in this directory has been reviewed and approved.

---

## File Naming Convention

All files in the knowledge base follow this naming format:

```
YYYY-MM-DD_[CATEGORY-TAG]_[DESCRIPTIVE-TITLE].md
```

Examples:
- `2024-01-15_VSL-HOOK_curiosity-open-health-niche.md`
- `2024-01-20_FRAMEWORK-COPY_4p-problem-agitation-proof-promise.md`
- `2024-01-22_CASE-STUDY-WIN_cold-traffic-vsl-scale-meta-q4.md`
- `2024-01-28_CASE-STUDY-FAIL_broad-targeting-with-weak-hook-q1.md`

The date reflects when the material was curated and added — not when the underlying campaign or training occurred (which is documented within the file itself).

---

## Content Standards

Every file in this knowledge base must include:

| Field | Requirement |
|---|---|
| **Source** | Where this material came from — campaign ID, training title, interview subject, external swipe (attributed) |
| **Date of source material** | When the campaign ran, the training occurred, or the swipe was captured |
| **Date curated** | When this was added to the knowledge base |
| **Curated by** | Which agent or human submitted it |
| **Approved by** | CEO Agent reference |
| **Key takeaway** | One to three sentences: what this material demonstrates and why it belongs here |
| **Application notes** | How agents should use this material — what to draw from it, what not to copy literally |

Files without these fields are returned to the submitter before inclusion.

---

## Relationship to Other System Components

| System Component | Relationship to Knowledge Base |
|---|---|
| `data/research/` | Live research outputs from the Research Squad; curated extracts may enter `knowledge/` after ISA review |
| `data/outputs/` | Live execution outputs; winning patterns from these outputs may enter `case-studies/winners/` after post-mortem |
| `agents/*.md` | Squad DNA files reference this knowledge base as a mandatory input source |
| `governance/` | Governance policy does not restrict knowledge base content, but compliance constraints noted in `case-studies/` entries inform what is and is not replicable |

---

*Knowledge Base README — authored by AIOS Operator. All amendments to this README require CEO Agent approval. All additions to the knowledge base require the curation process described above.*
