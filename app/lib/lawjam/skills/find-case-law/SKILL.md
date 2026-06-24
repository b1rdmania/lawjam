---
name: find-case-law
description: Queries the National Archives Find Case Law API for judgments from the senior English & Welsh courts and tribunals (Supreme Court, Court of Appeal, High Court divisions, Upper Tribunal, Employment Appeal Tribunal). Returns judgment metadata, neutral citation, court, judgment date, parties, and links to the official transcript. Use when the user says "find the judgment", "look up that case", "Find Case Law", "EWHC search", "Supreme Court ruling on", or wants a primary-source judgment retrieval.
argument-hint: "[query] [--court=ewca|ewhc|ukut|...] [--year=YYYY]"
---

# /find-case-law

1. Take the query (party name, neutral citation, keyword, or judge).
2. Hit the Find Case Law search endpoint at `https://caselaw.nationalarchives.gov.uk/`.
3. Parse the results — neutral citation, judgment date, court, parties, summary if available.
4. Return up to 10 results, ranked by relevance. Surface the source URL for each.
5. Tag each result with provenance — Find Case Law is the authoritative public register of senior court judgments under the Public Records Act, in partnership with HMCTS.

---

# Find Case Law

## What it is

The National Archives' Find Case Law service is the official public source for judgments from:

- Supreme Court (UKSC)
- Privy Council (UKPC)
- Court of Appeal — Civil and Criminal Divisions (EWCA Civ, EWCA Crim)
- High Court — King's Bench, Chancery, Family, Administrative (EWHC KB / Ch / Fam / Admin)
- Upper Tribunal (UKUT) — IAC, TC, LC, AAC
- Employment Appeal Tribunal (EAT)

It is the primary public-record source under the Public Records Act, operated under a Memorandum of Understanding with HMCTS. Coverage extends back several decades for senior courts and is being expanded.

It is **not** a substitute for paid services (Westlaw, LexisNexis, Practical Law) for headnotes, commentary, citator data, or unreported tribunal decisions outside its scope. It **is** authoritative for retrieving the official judgment text.

## API endpoint

Base URL: `https://caselaw.nationalarchives.gov.uk/`

Search: `https://caselaw.nationalarchives.gov.uk/judgments/search?query={query}&court={court}&from_date={YYYY-MM-DD}&to_date={YYYY-MM-DD}`

XML/JSON responses available via Atom feed and structured endpoints. Documentation: `https://caselaw.nationalarchives.gov.uk/structured_search`.

## Inputs

- Free-text query (party, citation, keyword).
- Court filter (optional).
- Date range (optional).
- Judge filter (optional).

## Workflow

### Step 1 — Parse query
If a neutral citation pattern (`[YYYY] EWCA Civ NNN`, `[YYYY] UKSC NN`, `[YYYY] EWHC NNNN (Div)`, etc.), prefer exact-citation lookup. Otherwise free-text search.

### Step 2 — Issue request
Use the search endpoint. Set `User-Agent` per Find Case Law guidance.

### Step 3 — Parse results
Extract: neutral citation, judgment date, court, division, parties, judges, URL, document URI.

### Step 4 — Surface
Return up to 10 most relevant, with a short summary or quoted first paragraph where available. Include the canonical Find Case Law URL.

### Step 5 — Caveat
Find Case Law coverage is not 100% retrospective. If a known older judgment is not returned, suggest a paid service (Westlaw, BAILII as a free secondary source — which has wider but less authoritative coverage).

## Output template

# Find Case Law — results for "[query]"

**Source:** National Archives Find Case Law (authoritative public-record source)
**Coverage caveat:** Senior courts and tribunals only. Older judgments may not be indexed.

| # | Neutral citation | Date | Court | Parties | Link |
|---|---|---|---|---|---|
| 1 | [2024] EWCA Civ 123 | 2024-03-15 | Court of Appeal (Civil) | Smith v Jones Ltd | [link] |

## Top result detail
[For the top result: court, judges, parties, headnote summary if extractable, first paragraph of the judgment, URL.]

## Markers
- `[NOT FOUND — try citation search]`
- `[COVERAGE GAP — check BAILII or paid service]`

## What this skill does not do

- Return headnotes, key passages, or citator information (use Westlaw / LexisNexis).
- Cover Scottish or NI judgments (different repositories — Scottish Courts and Tribunals; Judiciary NI).
- Provide commentary or annotation.
- Replace `citation-verifier` for verifying a specific citation against the official register.
