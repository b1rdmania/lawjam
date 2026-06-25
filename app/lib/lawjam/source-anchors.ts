/**
 * Source Anchors — the one honest quote check, ported from Legalise.
 *
 * The single factual claim this module makes is "this exact quoted passage is
 * PRESENT in a given source text". That is all. It is a normalised, literal
 * substring match — tolerant of whitespace/reflow, but NOT a fuzzy or semantic
 * match.
 *
 * HONESTY CAVEAT (preserve this): a positive result proves only that the quote
 * appears verbatim in the source body you handed in (e.g. the user's uploaded
 * firm knowledge or a pasted document). It does NOT prove a legal citation is
 * real, that the source is authoritative, or that the underlying legal claim is
 * correct. There is deliberately no `verified` / `proven` flag — `false` means
 * "the quoted text was not located in this source", not "the claim is false".
 */

/**
 * Lowercase + collapse all whitespace runs to single spaces, then trim. Makes
 * the quote check tolerant of indentation/reflow without becoming fuzzy — it
 * stays a literal-text presence check.
 */
export function normalizeForMatch(text: string): string {
  return (text ?? '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * True iff the (normalised) quote occurs in the (normalised) source body.
 * Empty quote → false (nothing to locate).
 *
 * A `true` result means the passage is present in this source text — an honesty
 * check, NOT a legal-citation verification (see module caveat).
 */
export function quoteFoundInSource(quote: string, body: string): boolean {
  const q = normalizeForMatch(quote);
  if (!q) {
    return false;
  }
  return normalizeForMatch(body).includes(q);
}

/**
 * Hex SHA-256 of the source body, via Web Crypto. Pins the body so a later
 * version/body drift is detectable. Async because the edge runtime has no
 * synchronous SHA. Dependency-free.
 */
export async function bodySha256(body: string): Promise<string> {
  const bytes = new TextEncoder().encode(body ?? '');
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}
