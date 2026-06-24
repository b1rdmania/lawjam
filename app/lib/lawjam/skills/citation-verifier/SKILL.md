---
name: citation-verifier
description: Verifies a UK case citation against the National Archives Find Case Law register. Confirms the citation exists, returns the official metadata (parties, court, date, judges), and flags fabricated, mis-transcribed, or otherwise unverifiable citations. Use before relying on any AI-generated citation in a brief, letter, or memo. Triggers include "verify this citation", "is this case real", "check the cite", "find the judgment for", "did the AI hallucinate this".
argument-hint: "[citation]"
---

# /citation-verifier

1. Parse the citation. UK neutral citation pattern: `[YYYY] COURT NN(N)` (e.g. `[2024] UKSC 12`, `[2023] EWCA Civ 1487`, `[2022] EWHC 1234 (Comm)`).
2. Query Find Case Law for the exact citation.
3. If found: return court, parties, judgment date, judges, link.
4. If not found: search variant forms (party-name search, year-and-number partial). Surface ambiguity.
5. If still not found: flag as **unverified** and recommend checking BAILII, Westlaw, or LexisNexis — do not assume the citation is fabricated until checked against at least one other source, but treat it as unsafe to rely on.

---

# Citation verifier

## Why this exists

AI models hallucinate case citations. Judgments have been struck down for relying on fabricated AI cites (Mata v Avianca, US; Harber v HMRC [2023] UKFTT 1007 (TC), UK). The risk is not theoretical and the cost is professional (Solicitors Disciplinary Tribunal in serious cases) plus reputational. Every AI-surfaced citation in a regulated workflow should be verified against the authoritative register before it appears in any deliverable.

## UK neutral citation format

Adopted 2001 (Practice Direction). Format: `[YYYY] COURT NN(N) (DIVISION)`.

Common courts:

| Code | Court |
|---|---|
| UKSC | Supreme Court |
| UKPC | Privy Council |
| EWCA Civ | Court of Appeal (Civil Division) |
| EWCA Crim | Court of Appeal (Criminal Division) |
| EWHC NN (Comm) | High Court, Commercial Court |
| EWHC NN (Ch) | High Court, Chancery |
| EWHC NN (TCC) | High Court, Technology & Construction |
| EWHC NN (KB) | High Court, King's Bench Division (was QB before Sept 2022) |
| EWHC NN (Admin) | High Court, Administrative Court |
| EWHC NN (Fam) | High Court, Family Division |
| UKUT NN (TCC) | Upper Tribunal, Tax & Chancery |
| UKUT NN (IAC) | Upper Tribunal, Immigration & Asylum |
| UKUT NN (AAC) | Upper Tribunal, Administrative Appeals |
| UKEAT NN | Employment Appeal Tribunal (UKEAT/NNNN/YY pre-2020; [YYYY] EAT NN post-2020) |

Pre-2001 citations are not neutral — they appear as `[YYYY] Volume Reporter Page` (e.g., `[1990] 1 AC 109`). Find Case Law has limited coverage of pre-2001 judgments. For pre-2001 cites, fall back to a paid service.

## Inputs

- One citation, ideally in the canonical format.
- Optionally: party name (helps disambiguate transcription errors).

## Workflow

### Step 1 — Parse

Normalise to canonical form. Strip extra spaces, fix common transcription issues (e.g., square brackets vs round). Identify the court code and division.

### Step 2 — Direct lookup

Hit Find Case Law with the citation as an exact match.

### Step 3 — Variant search

If no exact match:
- Try the citation with/without division suffix.
- Try a party-name search if a party is provided.
- Try `[YYYY] EWCA Civ N` ± 1 (off-by-one transcription error).

### Step 4 — Cross-source check

If still no match, do not declare the citation fabricated. Suggest the user check:
- BAILII (`https://www.bailii.org`) — broader coverage including older and tribunal cases.
- ICLR (`https://www.iclr.co.uk`) — authoritative law reports (paid).
- Westlaw / LexisNexis (paid).

A senior-court judgment from after 2001 should be on Find Case Law. If it isn't, the citation is **probably** wrong — but flag, don't accuse.

### Step 5 — Output

Structured verification report.

## Output template

# Citation verification — `[YYYY] COURT NN`

**Input:** `[as given]`
**Normalised:** `[canonical form]`
**Source consulted:** National Archives Find Case Law

## Result

[One of:]

✅ **Verified.**
- Parties: [Claimant v Defendant]
- Court: [Court, Division]
- Judgment date: [YYYY-MM-DD]
- Judges: [list]
- URL: [link]

⚠️ **Variant found.**
The exact citation was not found, but a close match exists: [match]. Likely a transcription error. Confirm with counsel.

❌ **Not verified.**
The citation was not found on Find Case Law. This may indicate:
- A pre-2001 citation outside Find Case Law's coverage — check BAILII, ICLR, or a paid service.
- A transcription error — verify the year, court code, and number.
- A fabricated citation — do not rely on this in any deliverable until verified against a primary source.

## Recommendation
- [Use / do not use / verify further] before quoting in any letter, brief, advice, or memo.

## Markers
- `[UNVERIFIED — flag clearly in any output]`
- `[PRE-2001 — likely outside Find Case Law]`
- `[POTENTIAL HALLUCINATION — flagged and not used]`

## What this skill does not do

- Verify the substance of the judgment (what it says). It verifies existence and metadata.
- Cover unreported decisions, county court judgments not promoted to neutral citation, or tribunal decisions outside the senior courts.
- Provide a citator (judicial history, treatment, distinguishing authorities) — use Westlaw / LexisNexis.
- Verify Scottish (Session Cases, Justiciary Cases) or NI citations.
