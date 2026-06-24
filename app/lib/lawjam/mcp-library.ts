/**
 * LawJam — curated legal MCP library.
 *
 * The set of legal-data MCP servers LawJam recommends, so a lawyer can ground
 * the tools they build in real, current law for their jurisdiction. Some are
 * open (auto-connected); others are free but need the user to connect their own
 * account. This registry powers the in-app "Legal data sources" panel and the
 * connect guide (MCP-LIBRARY.md).
 *
 * Adding a source: append an entry. Open/no-auth ones can be set `autoConnect`
 * and are seeded as default MCP servers (see app/lib/stores/mcp.ts).
 */

export type McpAuth = 'open' | 'oauth' | 'api-key';

export interface LegalMcpSource {
  id: string;
  name: string;
  jurisdiction: string; // emoji + label
  description: string;
  url: string;
  transport: 'streamable-http' | 'sse';
  auth: McpAuth;
  /** Seed as a default MCP server (only true for open, no-auth sources). */
  autoConnect?: boolean;
  /** How the user connects it (shown in the library UI / guide). */
  connect: string;
  licence: string;
}

export const LEGAL_MCP_LIBRARY: LegalMcpSource[] = [
  {
    id: 'lex',
    name: 'Lex — UK legislation & case law',
    jurisdiction: '🇬🇧 UK',
    description:
      'All UK legislation and court judgments (1963–present) with semantic search. Built by i.AI (UK Government), sourced from legislation.gov.uk.',
    url: 'https://lex.lab.i.ai.gov.uk/mcp',
    transport: 'streamable-http',
    auth: 'open',
    autoConnect: true,
    connect: 'Connected automatically — open access, no account needed.',
    licence: 'Open Government Licence v3.0 / MIT',
  },
  {
    id: 'courtlistener',
    name: 'CourtListener — US case law & dockets',
    jurisdiction: '🇺🇸 US',
    description:
      'Millions of federal and state opinions, PACER/RECAP dockets, citation networks, judge data — 3,352 US courts. By the Free Law Project.',
    url: 'https://mcp.courtlistener.com/',
    transport: 'streamable-http',
    auth: 'oauth',
    connect:
      'Free: create a CourtListener account (every account includes API access), then add this server in Settings → MCP and authorise via OAuth.',
    licence: 'Free Law Project — open data',
  },
  {
    id: 'vaquill-statutes',
    name: 'Vaquill — US statutes & regulations',
    jurisdiction: '🇺🇸 US',
    description: 'US statutes (USC), CFR/eCFR regulations, and citation tools to verify references.',
    url: 'https://courtlistener-mcp.vaquill.workers.dev/',
    transport: 'streamable-http',
    auth: 'api-key',
    connect: 'Free: get a Vaquill API key, then add this server in Settings → MCP with the key.',
    licence: 'Open / free tier',
  },
  {
    id: 'canlii',
    name: 'CanLII — Canadian law',
    jurisdiction: '🇨🇦 Canada',
    description: 'Canadian court decisions and legislation, with citation traversal.',
    url: 'https://canlii-mcp.example/mcp',
    transport: 'streamable-http',
    auth: 'api-key',
    connect: 'Free: request a CanLII API key, then add this server in Settings → MCP.',
    licence: 'CanLII terms (free, non-commercial bulk limits — check for commercial use)',
  },
];

export const autoConnectSources = () => LEGAL_MCP_LIBRARY.filter((s) => s.autoConnect);
