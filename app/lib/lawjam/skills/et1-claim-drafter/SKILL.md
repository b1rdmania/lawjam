---
name: et1-claim-drafter
description: Drafts an ET1 Employment Tribunal claim form and Grounds of Claim for England & Wales. Covers single and multiple respondents, single and multiple heads of claim, and properly pleads each statutory cause of action with the facts mapped to the elements. Use when the user says "draft the ET1", "draft the grounds", "draft the particulars of claim for tribunal", or has an EC certificate ready and needs to file.
argument-hint: "[--heads=unfair-dismissal,discrimination,...]"
---

# /et1-claim-drafter

1. Confirm the EC certificate(s) are in hand and the issue deadline is computed.
2. Identify all claim heads. Don't omit heads — under-pleading is costly because amending an ET1 to add a new claim out of time requires permission and may fail.
3. Identify all respondents. In discrimination, name individual respondents where there is a personal liability claim under EqA 2010 s.110 / s.111.
4. Draft the ET1 sections + a separate Grounds of Claim document. ET1 boxes are too small for substantive pleading; the grounds carry the argument.
5. Surface time-limit, jurisdiction, and continuing-act issues.

---

# ET1 + Grounds of Claim

## Purpose

The ET1 (and accompanying Grounds of Claim) is the pleading that frames the case. It must:

1. Identify each cause of action.
2. Plead the material facts supporting each element of each cause.
3. Specify the remedies sought.
4. Comply with the rules on time limits and EC certificates.

## Inputs to gather

- Claimant: full name, address, dates of birth (sex/age discrimination cases), date employment started, date employment ended (or "ongoing").
- Respondent(s): legal entity name, registered address, ACAS EC certificate number per respondent.
- Heads of claim — be exhaustive.
- Facts — chronological, dated. Pleadings need facts, not adjectives.
- Remedy — reinstatement, re-engagement, compensation (basic + compensatory + interest), declaration, recommendations (in discrimination).
- Whether interim relief is sought (s.128 ERA — automatic unfair dismissal in trade union, whistleblowing, etc.; seven-day deadline).

## Common heads of claim

- **Unfair dismissal (s.94 ERA)** — two-year qualifying period (s.108) unless automatically unfair.
- **Wrongful dismissal** — breach of contract (notice). Capped at £25k in ET.
- **Automatically unfair dismissal** — whistleblowing (s.103A), TU activities (s.152 TULR(C)A), pregnancy (s.99 ERA), health & safety (s.100), asserting statutory right (s.104), TUPE-related (reg 7 TUPE 2006), etc. No qualifying period.
- **Discrimination (EqA 2010)** — direct (s.13), indirect (s.19), harassment (s.26), victimisation (s.27), failure to make reasonable adjustments (s.20), discrimination arising from disability (s.15). Protected characteristics: age, disability, gender reassignment, marriage/civil partnership, pregnancy/maternity, race, religion/belief, sex, sexual orientation.
- **Equal pay (s.66 EqA)** — different time limit (6 months from end of employment).
- **Unlawful deduction from wages (s.13 ERA)**.
- **Holiday pay (Working Time Regulations 1998)**.
- **TUPE — failure to inform/consult (reg 13–16 TUPE 2006)**.
- **Redundancy payment (s.135 ERA)**.

## Workflow

### Step 1 — Time-limit and EC gate

For each head, identify the time limit and confirm EC has been complied with (separate EC for each individual respondent in discrimination claims).

### Step 2 — Elements analysis

For each head, list the elements that must be proven, then identify facts that support each element. If an element has no supporting fact, **flag** — that head may not be sustainable.

Example for unfair dismissal:
- Employee status: [fact — contract type, control, mutuality of obligation]
- Qualifying service (≥2 years): [fact — start and end dates]
- Dismissed: [fact — date of EDT, who dismissed, basis (s.95 — express, constructive, expiry of fixed term)]
- Reason: [fact — what the employer said; if no reason given, s.98(1) shifts burden]
- Unfair: [fact — Burchell (reasonable belief + investigation + bands), Polkey (procedural unfairness affecting outcome)]

### Step 3 — Draft ET1 form sections

Sections 8 ("Type and details of claim") and 9 ("What do you want if your claim is successful?") are the main pleading sections. Section 8.2 ("Please set out the background and details of your claim") is where the narrative goes — but for anything beyond simple cases, plead succinctly and attach a separate Grounds of Claim.

### Step 4 — Draft Grounds of Claim

Number paragraphs. Plead chronologically. For each head, plead the facts then the cause of action with element-by-element analysis.

### Step 5 — Surface jurisdictional points

- Continuing act: in discrimination, a series of related acts is one continuing act with time running from the last act (s.123(3) EqA). Plead this expressly where relied on.
- Constructive dismissal: must resign in response to the repudiatory breach within reasonable time (no waiver/affirmation).
- Whistleblowing: s.43B ERA — qualifying disclosure (information, reasonable belief, in public interest, falls within categories).

## Output template

# ET1 — [Claimant] v [Respondent(s)]

## ET1 form summary

- Claimant name, NI number, address, dates of employment.
- Respondent 1: [legal entity, registered office, EC cert no.]
- Respondent 2 (if any): [as above]
- ACAS EC certificate(s): [...]
- Type of claim: [tick boxes — unfair dismissal, discrimination, wages, etc.]
- Remedy sought: [reinstatement / re-engagement / compensation; figures if quantifiable]
- Interim relief sought: [yes / no]

---

# Grounds of Claim

## Parties

1. The Claimant was employed by the First Respondent as [role] from [date] to [date].
2. [Other respondents and their relationship — employer, agency, principal, individual respondent in discrimination claim per s.110 EqA.]

## Facts

[Numbered chronological paragraphs. One material fact per paragraph. Dates. Roles. Decisions. Conversations.]

## First cause of action — [e.g., Unfair dismissal under s.94 ERA 1996]

[Paragraph: facts supporting each element.]
[Paragraph: reason for dismissal as advanced by the Respondent and Claimant's response.]
[Paragraph: why the dismissal was unfair (substantive and procedural). Cite Burchell where conduct, Polkey on procedure, Iceland Frozen Foods on range of reasonable responses.]

## Second cause of action — [e.g., Direct sex discrimination under s.13 EqA 2010]

[Paragraph: protected characteristic. Less favourable treatment. Comparator (actual or hypothetical).]
[Paragraph: causation — because of the protected characteristic.]

## [Further heads]

## Remedy

The Claimant seeks:
- A declaration that [...].
- Compensation comprising:
  - Basic award per s.119 ERA: £[X]
  - Compensatory award per s.123 ERA (subject to cap per s.124): £[Y]
  - Injury to feelings (Vento band [middle/upper/lower]): £[Z]
  - Loss of statutory rights: £[A]
  - Pension loss: £[B] (per Bevan Brittan / Tribunals President's Guidance)
  - Interest from [date of act] under EqA 2010 / Employment Tribunals (Interest on Awards in Discrimination Cases) Regulations 1996.
- [Reinstatement / re-engagement, if sought.]
- An ACAS Code uplift of up to 25% under s.207A TULR(C)A 1992.
- Costs in such circumstances as the Tribunal sees fit per ETR 2013 rule 76.

[Signature, date]

## Markers used

- `[TIME LIMIT — issue by [date]]`
- `[ELEMENT MISSING — [which element, which head]]` — when no fact supports an element. The claim may not survive a strike-out.
- `[CONTINUING ACT — plead expressly]` — for discrimination time-limit positioning.

## What this skill does not do

- File the ET1. The user files via the ET online portal.
- Compute pension loss. That needs actuarial input or the Tribunals' simplified-approach tables.
- Advise on whether to plead a head. That is counsel's strategic call.
