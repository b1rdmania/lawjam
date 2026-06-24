# LawJam Skill House-Style

The standard every owned LawJam skill follows — derived from the existing UK-legal stack. Use it when *you* author a skill, when *LawJam* generates one from a lawyer's described method, and as the rubric `skill-auditor` / `skill-security-audit` check against. A skill that doesn't meet this bar doesn't enter the stack.

## What a LawJam skill is

One practitioner's method for **one task**, encoding the rules a generic prompt misses. Not a topic overview, not "everything about disclosure" — the specific working method a good lawyer actually uses, with the trap that catches people built into it.

The value of a skill is almost always **picking the right regime**: which pre-action protocol applies, which disclosure model, which settlement footing, which limitation period. If a skill doesn't make a real choice the user would otherwise get wrong, it isn't pulling its weight.

## The grounding rule (non-negotiable — this is the signature)

Legal output that asserts the law as settled fact is dangerous. Every LawJam skill:

- **Surfaces, never asserts.** Deadlines, limitation periods, applicable rules, and authority are presented as *things to confirm*, not facts. Use the marker convention: `[SOLICITOR: confirm limitation date — primary limit appears to expire [date]; check accrual + exceptions]`.
- **States its defaults as defaults.** "These are general defaults only — starting points, not a settled opinion. The accrual date and any exceptions must be checked by a solicitor for the specific facts."
- **Names the exceptions that move the answer** (e.g. Limitation Act s.32 concealment, s.14A date of knowledge) so the user knows what to check — rather than hiding the uncertainty.
- **Never invents authority.** Cite real statute/rule/case or say it must be verified. No fabricated case names or section numbers, ever.

If a skill could let a litigant-in-person rely on a computed date as gospel, it's wrong.

## Originality rule (this is what makes the stack *ours*)

Author every skill **from primary sources** — the actual CPR, statutes, practice directions, case law. The legal procedure is fact; **facts aren't copyrightable, only their expression is.** A disclosure skill written from PD 57AD is original and clean. Reading someone else's skill and rewording it is a derivative work — exactly the licensing problem we're avoiding, with extra steps. Use other catalogues as a *map of which tasks are worth covering*, never as text to paraphrase.

## Frontmatter

```yaml
---
name: kebab-case-id
description: <the formula below>
argument-hint: "[--mode=a|b] [--depth=fast|thorough]"   # optional, only if the skill has real modes
metadata:
  author: "LawJam"
  license: "proprietary"
  jurisdiction: "England & Wales"   # or as applicable
  version: "YYYY-MM-DD"
---
```

**Description formula** (this is what the orchestrator peruses to match — get it right):
> *What it does in plain English. **The part it gets right that trips people up** — the specific regime/rule a generic version misses. Who it's built for (litigation juniors, in-house counsel, small firms). Use when the user says '...', '...'. [Verify reminder.]*

Keep it concrete and specific — name the mechanism (CPR 31.22, PD 57AD Model C, Unilever v P&G), not "handles disclosure well."

## Body structure

The recurring sections, in order:

1. `# Title — one-line what-and-jurisdiction`
2. `## Inputs` — what the skill needs from the user (and what it assumes).
3. **The regime choice** — e.g. `## Which regime?` / `## The three footings`. The decision that is the skill's core value, made explicitly.
4. `## Workflow` — numbered `### Step N — ...`. Each step a concrete action, not a description.
5. `## Output` — the actual template(s) the skill produces, ready to fill. Include the verify markers inline.
6. `## Markers` — the `[SOLICITOR: confirm ...]` conventions this skill uses.
7. `## What this skill does not do` — **required.** Bound the scope. State plainly it's an assistive drafting/triage aid, not legal advice, and a qualified solicitor must review.

## Voice

Plain English (Orwell/Gowers — run output through the `plain-english` pass). Name the user. Name the legal mechanism precisely. State the thing and stop — no hedging filler, no "it's important to note." A junior should be able to follow it without a partner translating.

## The bar (what gets a skill into the stack)

- Makes a real regime/rule choice the user would otherwise get wrong.
- Grounding rule fully applied — nothing asserted that should be verified.
- Authored from primary sources; original expression.
- Has the scope-limit section; never poses as legal advice.
- Reads as written by a practitioner, not generated.

A skill is generated or hand-written, then **audited against this spec** before it ships. That audit — not manual approval by one person — is how the owned stack scales.
