# LawJam grounding eval suite

Test backbone for LawJam's core promise: **generated legal tools must cite REAL law — never hallucinate.**

> ⚠️ **SCAFFOLDED, NOT YET RUN.** The LawJam engine is not runtime-confirmed. This suite was authored against the eval contract, not executed. Do **not** point it at `localhost` until the build is confirmed live. First run is a deliberate, separate step.

## Format

Matches [agent-kit](https://github.com/b1rdmania/agent-kit) v0.1 **exactly** (verified against its `README.md`, `examples/sample.jsonl`, and `src/agent_kit/judges.py`). Nothing invented:

- **Dataset** — `grounding.jsonl`, one JSON record per line: `{ id, tags, input, judges, notes }`. `expected` is deliberately not a field; assertions live in `judges`.
- **Judges** — all deterministic, no LLM calls. Declared **inline** per record. agent-kit v0.1 has no custom-judge registry, so the named grounding judges (`citation_present`, `no_hallucinated_citation`, `refusal_appropriateness`) are compositions of the built-in primitives. `judges.json` documents those compositions — it is **reference only, not loaded by the runner.**

Built-in judge primitives used: `key_present`, `not_null`, `key_equals`, `key_in`, `regex_match`, `length_bounds`. `path` is dotted (`output.text`, `output.citations`, `output.tools_used.0`); list elements indexed numerically.

## What the suite checks

15 cases over LawJam's grounding promise:

| Concern | Cases | Assertion |
|---|---|---|
| **Citation present** | LBA debt, ET1, CPR pre-action, disclosure, without-prejudice, negligence, DSAR, s.21 | a real named instrument/case appears in `output.text` and `output.citations` is non-empty |
| **No hallucinated citation** | fake Act, fake case (negative controls) | for fabricated authority, `output.refused === true` (model declines, never invents provisions) |
| **Refusal appropriateness** | bad-citation + out-of-scope (Tetris) | refusal path fires on fabricated AND non-legal requests |
| **Grounding path used** | statute lookup | model invoked `read_skill` / `searchCaseLaw` / `legislation-lookup` rather than memory |
| **Freshness** | s.21 / Renters' Reform | flags pending reform via the grounding path rather than asserting stale law as settled |

### Real legal anchors (E&W / UK)

Every positive assertion is tied to a genuine instrument or authority so the regex is concrete and correct:

- Pre-Action Protocol for Debt Claims; Practice Direction on Pre-Action Conduct and Protocols
- Late Payment of Commercial Debts (Interest) Act 1998
- Employment Rights Act 1996 (unfair dismissal, Part X); ET1; Acas early conciliation (ETA 1996 s.18A)
- CPR Part 31 (standard disclosure); CPR Part 36 offers; "without prejudice" privilege
- Limitation Act 1980 (s.11, 3-year PI limitation)
- Donoghue v Stevenson [1932] AC 562; Caparo Industries v Dickman [1990]
- UK GDPR / Data Protection Act 2018 (DSAR, one-month deadline)
- Housing Act 1988 s.21 / Form 6A (flagged for pending Renters' Reform abolition)

Maps to bundled skills: `lba-drafter`, `et1-claim-drafter`, `acas-early-conciliation`, `cpr-letter-drafter`, `disclosure-list`, `without-prejudice-drafter`, `chronology`, `legislation-lookup`, `find-case-law`, `citation-verifier`.

## Expected output contract

The runner grades only `output`. LawJam's chat endpoint (or a thin internal eval shim over it) must return:

```json
{
  "output": {
    "text": "the build response/plan/explanation, with citations inline",
    "citations": [{ "name": "...", "citation": "...", "url": "...", "source": "courtlistener|legislation.gov.uk|skill" }],
    "tools_used": ["read_skill", "searchCaseLaw"],
    "refused": false
  },
  "metadata": { "model": "...", "tokens": { "input": 0, "output": 0 }, "cost_usd": 0.0 }
}
```

## Wiring agent-kit at the LawJam endpoint (once live)

LawJam's chat route is `POST /api/chat`. agent-kit posts the contract envelope:

```
POST <endpoint>
Content-Type: application/json
X-Agent-Kit-Secret: <shared secret>   # in prod
```
```json
{ "input": { "prompt": "Build a Letter Before Action drafter ..." }, "trace_id": "agent-kit-<uuid>", "metadata": { "record_id": "...", "source": "agent-kit-runner" } }
```

`/api/chat` streams chat UI tokens — it does **not** return the `{ output, metadata }` envelope agent-kit grades. So add a thin internal eval shim (e.g. `POST /api/internal/eval/grounding`) that runs one build turn, collects the assistant text + invoked grounding tools + surfaced citations, and returns the contract shape above. Then:

```bash
pip install git+https://github.com/b1rdmania/agent-kit.git@main

agent-kit run \
  --dataset app/lib/lawjam/evals/grounding.jsonl \
  --endpoint https://<lawjam-host>/api/internal/eval/grounding \
  --secret-env LAWJAM_EVAL_SECRET

# machine-readable for CI:
agent-kit run --dataset app/lib/lawjam/evals/grounding.jsonl --endpoint ... --json > results.json
```

Exit 0 if all pass, 1 if any fail.

## Format assumption to confirm at first run

`tools_used` is asserted in the dataset as a **string** (so `regex_match` applies). If the shim returns it as a **list**, switch those judges to `key_in` on `output.tools_used.0` (template in `judges.json`). One agreement to lock when the shim is built; everything else is shape-stable.

## Workflow (per agent-kit)

A grounding miss in a real build → pull the turn → add a record here with a judge that would have caught it → fix the grounding path → regression blocked. The dataset is the asset.
