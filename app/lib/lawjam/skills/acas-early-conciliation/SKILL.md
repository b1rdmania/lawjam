---
name: acas-early-conciliation
description: Prepares for ACAS early conciliation under s.18A Employment Tribunals Act 1996. Computes the "stop the clock" extension to ET time limits under s.207B ERA 1996, briefs the conciliator, and surfaces the strategic questions a claimant or respondent should resolve before EC begins. Use when the user says "start ACAS", "early conciliation", "EC certificate", "stop the clock", or asks how the time limit extension works.
argument-hint: "[--party=claimant|respondent]"
---

# /acas-early-conciliation

1. Compute the primary ET time limit (three months less one day from the act complained of for most claims; one month for some redundancy / TUPE).
2. Compute the EC extension under s.207B ERA 1996.
3. Brief the conciliator: claims, value, key facts, settlement appetite, deal-breakers.
4. Output a tracker the client can use through the EC window.

---

# ACAS early conciliation

## Purpose

ACAS early conciliation is a mandatory pre-claim step for most Employment Tribunal claims (s.18A ETA 1996). The prospective claimant must notify ACAS before issuing an ET1, and is issued an EC certificate at the end of the process. EC also pauses the running of the ET time limit ("stop the clock") under s.207B ERA 1996.

EC is mandatory for the claimant (you can't issue without an EC number) but participation in conciliation itself is voluntary on both sides.

## Time-limit mechanics (s.207B ERA 1996)

Two dates matter:

- **Day A** — the day the prospective claimant contacts ACAS (the EC notification).
- **Day B** — the day ACAS issues the EC certificate.

The clock stops between Day A and Day B. After Day B:

1. The original limitation period is extended by the number of days between Day A and Day B.
2. If the original time limit would have expired between Day A and one month after Day B, the limit is extended to one month after Day B.

In effect: a claimant always has at least one month from receipt of the EC certificate to issue. Practically, the latest issue date is **the later of**:

- (Original limit) + (Day B – Day A), OR
- Day B + 1 month.

Worked example: dismissal on 1 June. Primary limit expires 31 August (three months less one day). Day A is 15 August. Day B is 5 September. Days A–B = 21 days. Adjusted limit: 31 August + 21 days = 21 September. But Day B + 1 month = 5 October. Latest issue date: **5 October**.

**Surface this calculation explicitly in every run.** Time-limit miscalculations are the most common employment-claim malpractice.

## Inputs to gather

- Claimant name, address, contact details.
- Respondent name (the legal entity — Companies House verified for limited companies). Multiple respondents possible if individual respondents are named in a discrimination claim — each needs separate EC notification.
- Act(s) complained of and date(s).
- Brief description of claim(s).
- Whether settlement is wanted, and on roughly what terms (claimant) / whether the respondent will engage (respondent).
- Whether the claimant has independent legal advice (necessary for s.203 settlement agreement; not strictly necessary for ACAS COT3 but recommended).

## Workflow

### Step 1 — Confirm EC is required

EC is required for almost all ET claims. Exceptions: where another person has already complied with EC in the same matter (a connected claimant), and certain interim relief / national security cases.

### Step 2 — Compute the time limit

Use the s.207B method above. Output the latest issue date and the calculation showing it.

### Step 3 — Brief the conciliator

The ACAS conciliator runs a "shuttle" — they speak to each party and convey positions. They do not give legal advice. Give them: claim heads with statutory basis, indicative value (basic award, compensatory award, injury to feelings band per Vento, interest), specific settlement asks, deal-breakers (e.g., reference, confidentiality, mutual non-disparagement, tax treatment).

### Step 4 — Decide vehicle if settlement reached

ACAS COT3 (signed by the conciliator) or settlement agreement under s.203 ERA 1996 (requires the claimant's adviser to be identified, insured, and to certify they have given advice). COT3 is faster and simpler; settlement agreements allow more bespoke terms.

### Step 5 — Track the window

EC runs for up to six weeks (extendable by mutual agreement). Either party can ask ACAS to issue the certificate earlier if settlement is not realistic.

## Output template

# ACAS Early Conciliation — [Claimant v Respondent]

## Time-limit calculation

- Act complained of: [description]
- Date of act: [YYYY-MM-DD]
- Primary limit (3 months less 1 day): [YYYY-MM-DD]
- Day A (notification to ACAS): [YYYY-MM-DD or TBC]
- Day B (EC certificate issued): [YYYY-MM-DD or pending]
- Extension: max(primary + (B-A), B + 1 month) = **[YYYY-MM-DD]**

**Latest date to issue ET1: [DATE]** ⚠️

## Claims

| Head | Statutory basis | Indicative value | Notes |
|---|---|---|---|
| [Unfair dismissal] | s.94 ERA 1996 | Basic + comp award, capped per s.124 | [...] |
| [Discrimination — sex] | EqA 2010 s.13 | + injury to feelings (Vento) | [...] |

## Conciliator brief

- Settlement appetite: [open / firm position / not engaging]
- Opening position (if disclosing): [£X]
- Walk-away: [£Y — keep confidential to claimant side]
- Deal-breakers: [reference, confidentiality, agreed leaver narrative, tax treatment, payment timing]

## Vehicle if settled

[COT3 / s.203 settlement agreement] — reasons.

## Tracker

| Date | Event | Notes |
|---|---|---|
| [Day A] | EC notified | |
| | First ACAS call | |
| | Offer in | |
| | Counter | |
| [Day B] | EC certificate | |

## Markers used

- `[TIME LIMIT — issue by [date]]` — pinned to every output.
- `[SME VERIFY — multi-respondent EC]` — when individual respondents in discrimination claims need separate EC numbers.

## What this skill does not do

- Replace counsel's call on whether to engage in conciliation. Strategic call.
- Draft the COT3 — ACAS does that. See `settlement-agreement-review` for s.203 agreements.
- Cover the small number of EC-exempt claims.
- Cover Scotland / NI.
