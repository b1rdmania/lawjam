---
name: legislation-lookup
description: Looks up UK primary and secondary legislation on legislation.gov.uk and returns the section text, status (in force, prospective, repealed), amendments, and version date. Use when the user references a statute or SI by name or section, or says "look up s.94 ERA", "show me Article 5 ECHR", "what does s.13 Equality Act say", "is this in force", "the current version of the regulation".
argument-hint: "[reference]"
---

# /legislation-lookup

1. Parse the reference (statute short name + year + section, or SI year/number, or chapter).
2. Query `legislation.gov.uk` API.
3. Return the section/article text, status, amendments, and a link to the canonical version.
4. Surface "in force" status clearly — legislation.gov.uk has both "as enacted" and "latest available" views; for advisory purposes use the latest available with amendments tracked.

---

# legislation.gov.uk lookup

## Why this matters

legislation.gov.uk is the official public source of UK legislation, maintained by The National Archives. Other sources lag in tracking commencement orders, amendments, and repeals. Citing "as enacted" text for a provision that has been amended is the most common research error in UK practice.

## API

Base: `https://www.legislation.gov.uk/`

Section lookup: `https://www.legislation.gov.uk/{type}/{year}/{number}/section/{section}` — HTML.
Atom feed for structured data: append `/data.feed`.
XML: append `/data.xml`.

Type codes:
- `ukpga` — UK Public General Act
- `ukla` — UK Local Act
- `uksi` — UK Statutory Instrument
- `asp` — Act of the Scottish Parliament
- `anaw` — Act of the National Assembly for Wales
- `mwa` — Measure of the Welsh Assembly
- `nia` — Northern Ireland Assembly Act
- `eur` — Retained EU legislation

Example: `https://www.legislation.gov.uk/ukpga/1996/18/section/94` — s.94 ERA 1996 (unfair dismissal right).

## Inputs

- Statute short name (e.g., "Employment Rights Act 1996", "Equality Act 2010", "Companies Act 2006").
- Section / regulation / article number.
- Optionally: a specific point in time (legislation.gov.uk supports historic views).

## Workflow

### Step 1 — Identify the legislation

Map short name to type + year + chapter number. Common UK statutes:

| Short name | Type | Year/Chapter |
|---|---|---|
| Employment Rights Act 1996 | ukpga | 1996/18 |
| Equality Act 2010 | ukpga | 2010/15 |
| Companies Act 2006 | ukpga | 2006/46 |
| Insolvency Act 1986 | ukpga | 1986/45 |
| Data Protection Act 2018 | ukpga | 2018/12 |
| Limitation Act 1980 | ukpga | 1980/58 |
| Consumer Rights Act 2015 | ukpga | 2015/15 |
| Senior Courts Act 1981 | ukpga | 1981/54 |
| Children Act 1989 | ukpga | 1989/41 |
| Human Rights Act 1998 | ukpga | 1998/42 |
| Civil Procedure Rules 1998 | uksi | 1998/3132 |

### Step 2 — Construct URL

For an Act: `https://www.legislation.gov.uk/{type}/{year}/{chapter}/section/{number}`
For an SI: `https://www.legislation.gov.uk/uksi/{year}/{number}/regulation/{number}`

### Step 3 — Retrieve

Fetch the latest-available version (default). For a point-in-time view, the URL takes a date qualifier.

### Step 4 — Parse

Extract:
- Title of provision.
- Body text.
- Amendments (`Changes to legislation`) — list of amending instruments.
- Commencement status.
- Whether the provision is prospective (enacted but not in force).
- Repeal status.

### Step 5 — Surface

Section text plus a "status banner" — `In force`, `Prospective`, `Repealed`, `Partially in force`.

## Output template

# Legislation — [Statute] s.[N]

**Source:** legislation.gov.uk (latest available version)
**URL:** [canonical link]
**Status:** [In force / Prospective / Repealed / Partially in force]
**Last amended:** [date]
**Version retrieved:** [point-in-time view date]

## Provision

[Verbatim section / regulation / article text.]

## Amendments

| Date in force | Amending instrument | What changed |
|---|---|---|
| [date] | [SI / Act] | [substance] |

## Cross-references

[Other sections that interpret or interact with this one.]

## Markers

- `[PROSPECTIVE — in force date: X / awaiting commencement order]`
- `[AMENDED — original wording in [date] version differs]`
- `[REPEALED — by [instrument], date]`
- `[POINT-IN-TIME — viewing version as at [date]; current at time of search]`

## What this skill does not do

- Interpret the provision (offer commentary on what it means in practice). For that, use practitioner texts or counsel's advice.
- Provide secondary commentary (Blackstone, Halsbury, practitioner texts) — paid sources.
- Cover retained EU law beyond what legislation.gov.uk indexes.
- Track judicial interpretation of the section — use `find-case-law` and a citator.
