# memo

A Claude skill that turns a legal memo into the right shape for whoever is reading it next.

**Live demo:** [memo-app-eta-tawny.vercel.app](https://memo-app-eta-tawny.vercel.app) — the skill running in a web app.
**Source:** this repo (skill) · [b1rdmania/memo-app](https://github.com/b1rdmania/memo-app) (app)

## What it does

Three audiences. One output per audience. No format picker — the tool decides the shape.

| Audience | Output |
|---|---|
| **Client** | Plain-English email. Decision up top, jargon stripped, actions listed. |
| **Junior lawyer** | Research and drafting brief. What to read, what to draft, what to chase. |
| **Senior lawyer** | Risk and sign-off note. Top risks, what to escalate, what's settled. |

Every factual claim in the output cites the source paragraph it came from, with a confidence label (`high`, `med`, `low`).

## Install

Drop into your Claude Code skills directory:

```bash
git clone https://github.com/b1rdmania/memo ~/.claude/skills/memo
```

Then ask Claude:

> Here's a legal memo. Give me the client version.
> ```
> [1] MEMORANDUM ...
> [2] ...
> ```

The skill auto-triggers on legal memo input.

## Input contract

The memo must be paragraph-numbered. Every paragraph starts with `[N]`:

```
[1] MEMORANDUM — Re: ...
[2] Background facts ...
[3] The statutory framework ...
```

Citations refer to these numbers. The skill refuses unnumbered input.

## Output contract

JSON only, no prose:

```json
{
  "decision": "one sentence — the decision the audience is being asked to make",
  "rendered": "the output body",
  "claims": [
    { "claim": "...", "source_paragraphs": [7, 8], "confidence": "high" }
  ]
}
```

See [`SKILL.md`](./SKILL.md) for the full contract.

## Examples

[`samples/`](./samples) contains two paragraph-numbered memos and all six audience outputs.

| File | What |
|---|---|
| [`memo-khan.txt`](./samples/memo-khan.txt) | 20-paragraph unfair dismissal advice (Khan v Acme) |
| [`memo-khan-client.json`](./samples/memo-khan-client.json) · [`junior`](./samples/memo-khan-junior.json) · [`senior`](./samples/memo-khan-senior.json) | Three audience outputs |
| [`memo-tidesync.txt`](./samples/memo-tidesync.txt) | 82-paragraph SPA warranty dispute (TideSync) |
| [`memo-tidesync-client.json`](./samples/memo-tidesync-client.json) · [`junior`](./samples/memo-tidesync-junior.json) · [`senior`](./samples/memo-tidesync-senior.json) | Three audience outputs |

Same memo. Three visibly different products.

## Design choices

**No format picker.** Briefly and similar tools ask the user to choose: short email, one-pager, Slack bullets. That's the tool's job, not the user's. Pick who's reading; the tool picks the shape.

**Citations first-class.** Every claim maps to a paragraph. If a claim can't be cited, the skill won't make it. This kills the hallucination objection up front.

**Confidence labels are honest.** `high` means the source states the claim directly. `med` means synthesised across paragraphs. `low` means inferred. Empty `source_paragraphs` with `low` confidence is allowed — that flags professional judgment, not memo content.

**Plain-English pass on client output.** No Latin, no case names, no section numbers. Junior and senior outputs keep legal vocabulary.

## What it doesn't do

- Drafting (use a separate drafting skill)
- Legal research (use a research skill — the input *is* the legal analysis)
- Privilege checking (do that at the UI layer)
- Privileged-material safety (callers should warn users; the skill processes whatever it receives)

## Status

Prototype. Citation accuracy validated on memos up to 82 paragraphs. See [`CHANGELOG.md`](./CHANGELOG.md) for what's shipped.

## License

MIT. © 2026 Birdmania.
