/**
 * LawJam PII redaction — types + the anonymisation system prompt.
 *
 * Adapted from Legalise's "UK legal-data anonymisation assistant" (the
 * Claude-only path). A single non-streaming Claude call detects UK legal PII
 * in firm reference text and returns a redacted body plus a stable token map,
 * so client names and other confidential matter data never reach the build
 * model. Presidio is deliberately skipped (Python-only).
 *
 * The route (app/routes/api.redact.ts) runs this server-side so the Anthropic
 * key never reaches the browser.
 */

export type RedactionMappingEntry = {
  /** The placeholder token, e.g. [PARTY_1], [EMAIL_1]. */
  token: string;
  /** The original PII span that was replaced. */
  original: string;
  /** How many times this original appeared in the source text. */
  count: number;
};

export type RedactionResult = {
  /** The text with every PII span replaced by a stable token. */
  redacted: string;
  /** One entry per distinct original span, with its token and occurrence count. */
  mapping: RedactionMappingEntry[];
};

export type RedactionResponse = RedactionResult | { error: string };

export const REDACTION_SYSTEM_PROMPT = `You are a UK legal-data anonymisation assistant.

You will be given the reference text a law firm wants to store as grounding
material (a playbook, house style, standard clauses, or matter notes). Your job
is to find every personally identifying span and rewrite the text with each span
replaced by a stable placeholder token, so no confidential client data leaves
the firm.

Detect and replace these PII types (choose stable token families):
  person names                  -> [PARTY_1], [PARTY_2], ...
  company / organisation names  -> [ORG_1], [ORG_2], ...
  street addresses, postcodes,
    named premises              -> [ADDRESS_1], ...
  email addresses               -> [EMAIL_1], ...
  phone numbers                 -> [PHONE_1], ...
  case / matter references      -> [REF_1], ...
  dates of birth                -> [DOB_1], ...
  National Insurance numbers    -> [NI_1], ...
  bank / account numbers        -> [ACCOUNT_1], ...

Rules:
- The SAME original span must always map to the SAME token (stable across the
  whole text). The first distinct person becomes [PARTY_1], the second
  [PARTY_2], and so on for each family.
- Do NOT redact generic role nouns ("the employer", "the claimant",
  "the tenant"), legislation ("Equality Act 2010"), court names, or ordinary
  legal terminology. Only redact specific named clients, witnesses, employers,
  addresses, contact details, and identifier-like references.
- Do NOT redact ordinary dates unless they are clearly a date of birth.
- Preserve the text's structure, formatting, and meaning exactly — only the PII
  spans change.

Return EXACTLY one JSON object, no prose, no markdown fences:
{
  "redacted": "<the full text with tokens substituted>",
  "mapping": [
    { "token": "[PARTY_1]", "original": "Jasmine Khan", "count": 3 },
    { "token": "[ORG_1]", "original": "Acme Logistics Limited", "count": 1 }
  ]
}

If the text contains no PII, return the text unchanged with an empty mapping
array.`;

/**
 * Defensive parse of the model's JSON envelope. Tolerates markdown fences and
 * stray prose around the object; always returns a well-shaped RedactionResult,
 * falling back to the original text with an empty mapping if nothing usable
 * comes back.
 */
export function parseRedactionEnvelope(raw: string, fallbackText: string): RedactionResult {
  const empty: RedactionResult = { redacted: fallbackText, mapping: [] };

  if (!raw) {
    return empty;
  }

  // Strip ```json fences if present, then isolate the outermost JSON object.
  let candidate = raw.trim().replace(/^```(?:json)?/i, '').replace(/```$/, '').trim();

  const first = candidate.indexOf('{');
  const last = candidate.lastIndexOf('}');

  if (first !== -1 && last !== -1 && last > first) {
    candidate = candidate.slice(first, last + 1);
  }

  try {
    const parsed = JSON.parse(candidate) as Partial<RedactionResult>;

    if (typeof parsed.redacted !== 'string') {
      return empty;
    }

    const mapping: RedactionMappingEntry[] = Array.isArray(parsed.mapping)
      ? parsed.mapping
          .filter((m): m is RedactionMappingEntry => !!m && typeof m.token === 'string' && typeof m.original === 'string')
          .map((m) => ({
            token: m.token,
            original: m.original,
            count: typeof m.count === 'number' && m.count > 0 ? m.count : 1,
          }))
      : [];

    return { redacted: parsed.redacted, mapping };
  } catch {
    return empty;
  }
}
