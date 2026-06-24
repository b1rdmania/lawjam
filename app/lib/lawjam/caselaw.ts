/**
 * LawJam — Case-law battery.
 *
 * Real case-law retrieval so generated legal tools cite genuine authority
 * instead of hallucinating. Wraps the CourtListener REST API (v4).
 *
 * Grounding rule (see the LawJam system prompt): never invent case names or
 * citations. If a tool needs authority, call `searchCaseLaw` and use what it
 * returns, or surface "no authority found — verify manually" in the UI.
 *
 * Set COURTLISTENER_API_TOKEN in the environment for higher rate limits.
 * Free/anonymous use works for low volume. Get a token at
 * https://www.courtlistener.com/help/api/rest/
 *
 * NOTE: CourtListener is US-centric. For UK / England & Wales authority this is
 * a placeholder spine — swap or add a BAILII / Find Case Law (caselaw.nationalarchives.gov.uk)
 * adapter behind the same interface. The interface is the contract; the source is swappable.
 */

export interface CaseLawResult {
  caseName: string;
  citation: string | null;
  court: string | null;
  dateFiled: string | null;
  url: string;
  snippet: string | null;
}

export interface SearchOptions {
  /** Max results to return (default 5). */
  limit?: number;
  /** Override the API token (otherwise read from env). */
  token?: string;
}

const COURTLISTENER_BASE = 'https://www.courtlistener.com/api/rest/v4/search/';

/**
 * Search real case law by free-text query. Returns [] on any failure rather
 * than throwing — a tool that can't reach the API must degrade to "verify
 * manually", never to a fabricated citation.
 */
export async function searchCaseLaw(query: string, opts: SearchOptions = {}): Promise<CaseLawResult[]> {
  const limit = opts.limit ?? 5;
  const token = opts.token ?? (typeof process !== 'undefined' ? process.env?.COURTLISTENER_API_TOKEN : undefined);

  const url = `${COURTLISTENER_BASE}?q=${encodeURIComponent(query)}&type=o&order_by=score%20desc`;

  try {
    const res = await fetch(url, {
      headers: {
        Accept: 'application/json',
        ...(token ? { Authorization: `Token ${token}` } : {}),
      },
    });

    if (!res.ok) {
      return [];
    }

    const data = (await res.json()) as { results?: any[] };

    return (data.results ?? []).slice(0, limit).map((r) => ({
      caseName: r.caseName ?? r.caseNameFull ?? 'Unknown case',
      citation: Array.isArray(r.citation) ? r.citation[0] ?? null : r.citation ?? null,
      court: r.court ?? null,
      dateFiled: r.dateFiled ?? null,
      url: r.absolute_url ? `https://www.courtlistener.com${r.absolute_url}` : COURTLISTENER_BASE,
      snippet: r.snippet ?? null,
    }));
  } catch {
    return [];
  }
}
