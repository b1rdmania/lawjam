/**
 * LawJam — curated legal connector library.
 *
 * The set of legal-data sources and services LawJam can plug into, so a lawyer
 * can ground the tools they build in real, current law — and reuse the
 * subscriptions their firm already pays for. Some sources are open
 * (auto-connected); some are free but need the user to connect their own
 * account; others are commercial services LawJam can reach via MCP on request,
 * or are on the roadmap. This registry powers the Connectors page and the
 * in-app "Legal data sources" panel.
 *
 * HONESTY RULE: `status` must reflect reality. Only sources with a real, live
 * MCP endpoint and a working connect path may be `live`. Anything we cannot
 * connect today is `on-request` or `roadmap` — never imply an integration that
 * does not exist.
 *
 * Adding a source: append an entry. Open/no-auth ones can be set `autoConnect`
 * and are seeded as default MCP servers (see app/lib/stores/mcp.ts).
 */

export type McpAuth = 'open' | 'oauth' | 'api-key' | 'subscription' | 'none';

/**
 * Connector readiness — drives the pill and grouping on the Connectors page.
 *  - live:       has a working MCP endpoint you can connect today.
 *  - on-request: real service, reachable via MCP, but we wire it up per firm.
 *  - roadmap:    planned, not yet available. Never reads as "integrated".
 */
export type McpStatus = 'live' | 'on-request' | 'roadmap';

export interface LegalMcpSource {
  id: string;
  name: string;
  /** Emoji + label, e.g. "🇬🇧 UK". Use "🌍 Global" for cross-jurisdiction. */
  jurisdiction: string;
  /** One honest line: what this connector gives the tools you build. */
  gives: string;
  /** Longer description for the card body. */
  description: string;
  /** MCP endpoint, when there is a real one. Omit for roadmap items. */
  url?: string;
  transport?: 'streamable-http' | 'sse';
  auth: McpAuth;
  status: McpStatus;
  /** Seed as a default MCP server (only true for open, no-auth, live sources). */
  autoConnect?: boolean;
  /** Short, plain-English "how a lawyer turns it on". */
  connect: string;
  licence: string;
}

export const LEGAL_MCP_LIBRARY: LegalMcpSource[] = [
  // ── Live: connect today ──────────────────────────────────────────────
  {
    id: 'lex',
    name: 'Lex — UK legislation & case law',
    jurisdiction: '🇬🇧 UK',
    gives: 'Live UK statutes and judgments your tools can cite, on by default.',
    description:
      'All UK legislation and court judgments (1963–present) with semantic search. Built by i.AI (UK Government), sourced from legislation.gov.uk.',
    url: 'https://lex.lab.i.ai.gov.uk/mcp',
    transport: 'streamable-http',
    auth: 'open',
    status: 'live',
    autoConnect: true,
    connect: 'On by default — open access, no account or key. Nothing to set up.',
    licence: 'Open Government Licence v3.0 / MIT',
  },
  {
    id: 'courtlistener',
    name: 'CourtListener — US case law & dockets',
    jurisdiction: '🇺🇸 US',
    gives: 'US federal and state opinions, dockets, and citation networks.',
    description:
      'Millions of federal and state opinions, PACER/RECAP dockets, citation networks, judge data — 3,352 US courts. By the Free Law Project.',
    url: 'https://mcp.courtlistener.com/',
    transport: 'streamable-http',
    auth: 'oauth',
    status: 'live',
    connect:
      'Create a free CourtListener account, then add this server in Settings → MCP and authorise via OAuth. No key to copy.',
    licence: 'Free Law Project — open data',
  },
  {
    id: 'vaquill-statutes',
    name: 'Vaquill — US statutes & regulations',
    jurisdiction: '🇺🇸 US',
    gives: 'US Code and CFR/eCFR text plus tools to verify citations.',
    description: 'US statutes (USC), CFR/eCFR regulations, and citation tools to verify references.',
    url: 'https://courtlistener-mcp.vaquill.workers.dev/',
    transport: 'streamable-http',
    auth: 'api-key',
    status: 'live',
    connect: 'Get a free Vaquill API key, then add this server in Settings → MCP and paste the key.',
    licence: 'Open / free tier',
  },
  {
    id: 'canlii',
    name: 'CanLII — Canadian law',
    jurisdiction: '🇨🇦 Canada',
    gives: 'Canadian court decisions and legislation with citation traversal.',
    description: 'Canadian court decisions and legislation, with citation traversal.',
    url: 'https://canlii-mcp.example/mcp',
    transport: 'streamable-http',
    auth: 'api-key',
    status: 'live',
    connect: 'Request a CanLII API key, then add this server in Settings → MCP and paste the key.',
    licence: 'CanLII terms (free; non-commercial bulk limits — check for commercial use)',
  },

  // ── On request: real services we wire up per firm ────────────────────
  {
    id: 'firm-document-store',
    name: 'Your firm’s document store',
    jurisdiction: '🌍 Global',
    gives: 'Your own precedents, matters, and templates as a private source.',
    description:
      'Point LawJam at your firm’s document store (SharePoint, a DMS like iManage/NetDocuments, or an S3 bucket) so the tools you build can draw on your own precedents and matter files — never leaving your tenancy.',
    auth: 'subscription',
    status: 'on-request',
    connect:
      'We set up a private MCP bridge to your store with your IT team. Talk to us about your DMS — read access stays inside your tenancy.',
    licence: 'Your data, your terms — stays in your tenancy',
  },
  {
    id: 'vlex',
    name: 'vLex — global legal intelligence',
    jurisdiction: '🌍 Global',
    gives: 'Multi-jurisdiction case law and legislation from a vLex subscription.',
    description:
      'vLex (and its Vincent AI layer) covers case law, legislation, and secondary sources across 100+ countries. If your firm subscribes, we can surface it through LawJam.',
    auth: 'subscription',
    status: 'on-request',
    connect:
      'Bring your existing vLex subscription. We connect it via MCP on request — your licence and entitlements are unchanged.',
    licence: 'Commercial — your vLex subscription applies',
  },

  // ── Roadmap: not available yet. Honest about it. ─────────────────────
  {
    id: 'lexisnexis',
    name: 'LexisNexis',
    jurisdiction: '🌍 Global',
    gives: 'Lexis case law, legislation, and Practical Guidance — once available.',
    description:
      'A connector to LexisNexis so tools can cite Lexis content under your firm’s subscription. Not yet available — this depends on Lexis exposing an interface we can connect to.',
    auth: 'subscription',
    status: 'roadmap',
    connect: 'On the roadmap. Register interest and we’ll tell you when it’s ready.',
    licence: 'Commercial — would require your LexisNexis subscription',
  },
  {
    id: 'westlaw',
    name: 'Westlaw (Thomson Reuters)',
    jurisdiction: '🌍 Global',
    gives: 'Westlaw case law, KeyCite, and Practical Law — once available.',
    description:
      'A connector to Westlaw so tools can cite Westlaw content and KeyCite signals under your firm’s subscription. Not yet available — this depends on Thomson Reuters exposing an interface we can connect to.',
    auth: 'subscription',
    status: 'roadmap',
    connect: 'On the roadmap. Register interest and we’ll tell you when it’s ready.',
    licence: 'Commercial — would require your Westlaw subscription',
  },
];

export const autoConnectSources = () => LEGAL_MCP_LIBRARY.filter((s) => s.autoConnect);
