---
name: memo
description: Convert a paragraph-numbered legal memo into a plain-English client email, a junior lawyer's research brief, or a senior lawyer's risk note. Every claim cites the source paragraph with a confidence score. Use when the user pastes a legal memo or advice note and asks for a summary, translation, or "explain this to my client / junior / senior partner".
---

# Memo

Turns a legal memo into the right shape for whoever is reading it next.

Three audiences. One output per audience. No format picker. The tool decides the shape.

| Audience | Output | Roughly |
|---|---|---|
| **Client** | Plain-English email: decision up top, jargon stripped, actions listed | ~250 words |
| **Junior lawyer** | Research + drafting brief: what to read, what to draft, what to chase | ~400 words, bulleted |
| **Senior lawyer** | Risk & sign-off note: top risks, what to escalate, what's settled | ~300 words, structured |

Every factual claim in the output is cited back to the source paragraph it came from, with a confidence label.

## Required input format

The memo MUST be paragraph-numbered at ingest. Every paragraph starts with `[N]` where N is an integer:

```
[1] MEMORANDUM — Re: ...
[2] Background facts ...
[3] The statutory framework ...
```

Citations refer to these numbers. If the input is not numbered, refuse and ask the caller to number it first.

## Inputs

```json
{
  "memo": "string — paragraph-numbered memo text",
  "audience": "client | junior | senior"
}
```

## Output contract

Always return JSON with this exact shape. No prose outside the JSON.

```json
{
  "decision": "one sentence stating the decision the audience is being asked to make or sign off",
  "rendered": "the full output body, plain text with newlines",
  "claims": [
    {
      "claim": "a specific factual claim made in `rendered`",
      "source_paragraphs": [7, 8],
      "confidence": "high | med | low"
    }
  ]
}
```

## Rules

1. **Every factual claim in `rendered` must appear in `claims`** with the paragraph numbers it came from.
2. **Never cite a paragraph number that doesn't exist** in the input. If you cannot cite something, do not say it.
3. **Confidence calibration.** `high` only when the source paragraph(s) state the claim directly. `med` when the claim is a reasonable synthesis across paragraphs or an implication. `low` when inferred or contested.
4. **`decision` is mandatory.** Most memos bury the ask. Extract the literal decision being requested or implied. If genuinely no decision is asked, write "No decision requested — for information only."

## Audience-specific rules

### Client output

- Plain English. A bright 16-year-old should follow it.
- Run the [[plain-english]] discipline: no Latin, no case names (Burchell etc), no Latin section references (s.94 ERA 1996 → "the unfair dismissal rules"), no "the said", no "shall".
- Structure: **decision** → **situation** → **what's at stake** → **recommendation** → **what we need from you**.
- ~250 words. Tight.
- Address the client by name if the memo names them.

### Junior lawyer output

- Lawyerly vocabulary fine. Case names and section numbers retained.
- Structure: **decision** → **what to read** (cases, statutes, secondary sources) → **what to draft** (next document, with deadline) → **what to chase** (evidence gaps, witnesses, instructions).
- Bullets, not prose.
- ~400 words.
- Be specific: not "research the relevant case law" but "read *Burchell* and check whether *Sainsbury's Supermarkets v Hitt* still governs the reasonableness standard."

### Senior lawyer output

- Senior-partner register. Compressed.
- Structure: **decision** → **top risks** (3 max, ranked) → **what to escalate** (insurance, client, regulator) → **what's settled** (don't waste a partner's time on what's already decided) → **partner judgment required on**.
- ~300 words.
- Lead with risk, not facts. Senior reader already knows the facts in outline; they want your view on what could go wrong.

## Plain-English pass

After rendering, run the output through the [[plain-english]] rules:

- Cut filler words
- Active voice over passive
- Short word over long
- No banned AI vocabulary (delve, tapestry, navigate, leverage, robust, comprehensive, nuanced, holistic, pivotal, etc.)
- Em-dash budget: max one per ~200 words
- No preamble ("That's a great question"), no summary closer ("In conclusion")

Apply the pass **harder on the Client output** (full detox) and **lighter on Junior/Senior** (keep legal vocabulary, strip AI tics only).

## Failure modes

- **Unnumbered input** → refuse, return `{"error": "Input memo must be paragraph-numbered. Prepend [1], [2] etc. to each paragraph."}`
- **Memo too short to extract a decision** → `decision` field reads "No decision requested — for information only."
- **Memo contains material that triggers privilege concerns** → still process; the privilege banner is the caller's UI responsibility, not the skill's.

## Examples

See `samples/` in the repo:

- `samples/memo-khan.txt` — paragraph-numbered employment memo
- `samples/memo-khan-client.json` — Client audience output
- `samples/memo-khan-junior.json` — Junior audience output
- `samples/memo-khan-senior.json` — Senior audience output

## Scope boundaries

Memo does one thing: it reshapes an existing memo for an audience. It is not:

- A drafter (use a drafting skill)
- A research tool (use a research skill)
- A privilege checker (do that at the UI layer)
- A legal advice generator (the input *is* the legal advice)

If the user asks Memo to do any of those things, decline and route them to the right tool.
