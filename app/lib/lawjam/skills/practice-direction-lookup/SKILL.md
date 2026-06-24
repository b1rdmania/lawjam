---
name: practice-direction-lookup
description: Looks up Civil Procedure Rules (CPR), Practice Directions, Pre-Action Protocols, and court guides for England & Wales civil proceedings. Returns the rule / PD / protocol text and any relevant cross-references. Use when the user references a CPR rule, Part, or Practice Direction, or says "CPR 31", "PD 57AD", "the disclosure pilot", "look up the rule on", "pre-action protocol for", "Commercial Court Guide".
argument-hint: "[reference]"
---

# /practice-direction-lookup

1. Parse the reference — CPR Part or rule, Practice Direction number, named protocol, or court guide.
2. Identify the canonical source on `https://www.justice.gov.uk/courts/procedure-rules/civil` (the Ministry of Justice procedure rules pages).
3. Retrieve the current text.
4. Return the rule text plus any cross-referenced rules / PDs / forms.

---

# Procedure rules lookup

## Sources

| Source | Where |
|---|---|
| Civil Procedure Rules + PDs | `https://www.justice.gov.uk/courts/procedure-rules/civil` |
| Pre-Action Protocols | `https://www.justice.gov.uk/courts/procedure-rules/civil/protocol` |
| Commercial Court Guide | `https://www.judiciary.uk/guidance-and-resources/the-commercial-court-guide/` |
| Chancery Guide | `https://www.judiciary.uk/guidance-and-resources/chancery-guide/` |
| TCC Guide | `https://www.judiciary.uk/guidance-and-resources/the-technology-and-construction-court-guide/` |
| Admiralty & Commercial Court Guide | as above |
| Family Procedure Rules | `https://www.justice.gov.uk/courts/procedure-rules/family` |
| Criminal Procedure Rules | `https://www.justice.gov.uk/courts/procedure-rules/criminal` |
| Tribunal Procedure Rules | various — Upper Tribunal, FtT, EAT |

CPR are amended at least three times per year via Update orders. Each Update has a coming-into-force date — always check the version retrieved is current.

## Inputs

- A reference of any of the forms:
  - `CPR 31.6` (Part 31 rule 6)
  - `CPR Part 24` (whole Part)
  - `PD 31A` (Practice Direction)
  - `PD 57AD` (the disclosure pilot, now permanent — supplementary to CPR Part 31)
  - `Pre-Action Protocol for [type]`
  - Named guide ("Commercial Court Guide")

## Key references that come up most often

- **CPR Part 1** — Overriding objective; cases dealt with justly and at proportionate cost.
- **CPR Part 3** — Court's case management powers (incl. strike-out, sanctions, relief from sanctions under r.3.9 — Mitchell / Denton).
- **CPR Part 7** — How to start proceedings (claim form).
- **CPR Part 8** — Alternative procedure (used where there is no substantial dispute of fact).
- **CPR Part 16** — Statements of case (particulars of claim, defence, reply).
- **CPR Part 17** — Amendments.
- **CPR Part 24** — Summary judgment.
- **CPR Part 26** — Allocation (small claims, fast, intermediate, multi-track) and the intermediate track introduced October 2023.
- **CPR Part 31** — Disclosure and inspection (general regime outside B&P Courts).
- **PD 57AD** — Disclosure Pilot (B&P Courts; permanent from October 2022).
- **CPR Part 32** — Evidence.
- **CPR Part 35** — Experts and assessors.
- **CPR Part 36** — Offers to settle (costs-protected offers).
- **CPR Part 44** — General costs rules (incl. proportionality test in r.44.3(5)).
- **CPR Part 52** — Appeals.
- **CPR Part 54** — Judicial review.
- **CPR Part 81** — Contempt of court.

## Workflow

### Step 1 — Identify
Parse the reference. Recognise abbreviations (PD = Practice Direction, PAP = Pre-Action Protocol, OO = overriding objective, etc.).

### Step 2 — Retrieve
Fetch the current version from the MoJ pages. Confirm the "Update N" version banner — flag if a recent Update may have changed the rule.

### Step 3 — Return
Rule text plus immediately related provisions (the rule + the PD that supplements it, or vice versa).

### Step 4 — Surface forms
Many CPR rules reference forms (N1 claim form, N9 acknowledgement, N244 application, N265 list of documents, etc.). Where the rule references a form, list it with a link to `https://www.gov.uk/government/collections/court-and-tribunal-forms`.

## Output template

# CPR / PD / Protocol — [reference]

**Source:** Civil Procedure Rules (Ministry of Justice)
**URL:** [canonical]
**Last updated:** [Update N — date]
**Current version retrieved:** [date]

## Text

[Verbatim rule / PD / protocol text.]

## Supplementary materials

- **PDs** supplementing this Part: [list]
- **Related rules**: [cross-references]
- **Forms**: [N1, N9, etc.]
- **Pre-Action Protocol**: [if applicable]

## Recent amendments

| Update | Date in force | What changed |
|---|---|---|

## Practitioner notes

[Where applicable, signpost the key cases interpreting the rule — e.g., for relief from sanctions under CPR 3.9, signpost Mitchell v News Group, Denton v TH White. Use `find-case-law` to retrieve the judgments.]

## Markers

- `[UPDATE PENDING — recent amendment in force from [date]]`
- `[INTERMEDIATE TRACK — confirm allocation if claim value £25k–£100k]`
- `[B&P COURTS — PD 57AD displaces CPR 31 standard disclosure for these courts]`

## What this skill does not do

- Interpret the rule. It retrieves and contextualises.
- Cover Scottish / NI civil procedure (Court of Session Rules; Rules of the Court of Judicature NI).
- Cover Family / Criminal / Tribunal Procedure Rules in detail beyond signposting.
- Provide commentary equivalent to the White Book or Civil Court Practice — paid sources.
