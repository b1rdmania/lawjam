# LawJam batteries

The legal-specific layer that makes LawJam more than a generic app builder. These are wired into the system prompt (`app/lib/common/prompts/new-prompt.ts`) and are meant to be available **both at build-time** (so the agent grounds itself in real law) **and at run-time** (so the tools it generates can call them).

## `caselaw.ts` — case-law battery
Real citation retrieval (CourtListener spine). Grounding over fluency: tools cite genuine authority or mark it for manual verification — never hallucinate. The interface is the contract; the source is swappable (add a BAILII / Find Case Law adapter for UK authority).

## `skills/` — skills battery
The Lawve catalogue of reusable UK legal skills. First skill: `pre-motion`. Keep it small and durable — three good skills beat twelve rotting ones.

## Not here (deliberately)
No sign-off / audit / provenance layer. That's Legalise's thesis; a lawyer prototyping a tool doesn't need provability. It can be added later *only* if an experiment graduates to client-facing use.

## Next build steps
- Expose `searchCaseLaw` and the skills as agent tools in the LLM tool-calling layer (so the model actually invokes them mid-build).
- Add a UK case-law adapter behind the `caselaw.ts` interface.
- Pre-styled legal starter template (Next + shadcn + restrained theme) the agent scaffolds from.
