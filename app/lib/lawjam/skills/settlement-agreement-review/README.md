# settlement-agreement-review

Reviews or drafts a UK settlement agreement under s.203 ERA 1996 (England & Wales). Flags apparent gaps in the statutory conditions for a solicitor to confirm, reviews the substantive terms against the party's position, and surfaces tax and enforceability risks. It does not rule on validity and is not legal advice.

For employment solicitors checking an agreement before sign-off, in-house teams reviewing a leaver's terms, and employees' advisers stress-testing an offer.

## Install

Part of the [claude-for-uk-legal](https://github.com/b1rdmania/claude-for-uk-legal) plugin suite:

```bash
/plugin marketplace add https://github.com/b1rdmania/claude-for-uk-legal
/plugin install uk-employment-legal@claude-for-uk-legal
```

Or install the single skill directly:

```bash
cp -r settlement-agreement-review ~/.claude/skills/settlement-agreement-review
```

## Usage

```
/settlement-agreement-review --mode=review --party=employee
/settlement-agreement-review --mode=draft --party=employer
```

Run it against the agreement text and the facts: who is leaving, on what terms, the payment breakdown, and which side you act for. In review mode it returns a marked-up review with risk flags; in draft mode, a clean draft to refine.

## What it does

- Checks the agreement against the six s.203 ERA conditions (writing, specific complaints, independent adviser, adviser identified, adviser insured, statement of conditions) and reports apparent status — flagging gaps for a solicitor to confirm.
- Reviews the substantive terms — payment breakdown, confidentiality and non-disparagement, reference, warranties, restrictive covenants, claims schedule, tax indemnity — against the party's position.
- Surfaces tax issues under ITEPA 2003, including PENP on a PILON, with every figure marked as an accountant prompt rather than authoritative.
- Outputs either a commented review with prioritised changes or a clean draft.
- Marks every uncertain point inline — `[CONDITION GAP]`, `[NOT TAX ADVICE]`, `[CITE NEEDED]`, `[SME VERIFY]` — so nothing reads as settled.

## What it doesn't do

- Provide legal advice — it flags apparent issues for a qualified adviser to confirm.
- Rule on whether the agreement is valid — it reports apparent s.203 status only; a solicitor confirms validity.
- Provide the independent advice the employee needs — that must come from a qualified adviser per s.203(3A) ERA.
- Compute tax authoritatively — every figure needs accountant or tax counsel sign-off.
- Verify case law or statute against a live source — check any authority it cites before relying on it.
- Cover Scotland or Northern Ireland (different statutory framing).

## Requirements

- Claude Code or Claude Cowork. No MCP connectors required.
- A matter to run against: the agreement text and the surrounding facts.

## License

Apache-2.0.
