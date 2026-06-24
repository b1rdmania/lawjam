# LawJam Legal Data Sources (MCP)

LawJam grounds the tools you build in **real, current law** by connecting to legal-data servers over MCP. UK law is connected for you; for other jurisdictions, connect the source your work needs. Manage these in **Settings → MCP**.

## Connected by default

### 🇬🇧 Lex — UK legislation & case law
All UK legislation and court judgments (1963–present), by i.AI (UK Government), from legislation.gov.uk. **Open access, no account needed — already on.** Open Government Licence.

## Connect your own (free)

### 🇺🇸 CourtListener — US case law & dockets
Millions of US federal and state opinions, PACER/RECAP dockets, citation networks and judge data across 3,352 courts (Free Law Project).
1. Create a free CourtListener account — every account includes API access.
2. Settings → MCP → add server: `https://mcp.courtlistener.com/` (streamable-http).
3. Authorise via OAuth when prompted.

### 🇺🇸 Vaquill — US statutes & regulations
US statutes (USC), CFR/eCFR, and citation verification. Free API key.
- Settings → MCP → add `https://courtlistener-mcp.vaquill.workers.dev/` with your key.

### 🇨🇦 CanLII — Canadian law
Canadian decisions and legislation. Free API key (check CanLII terms for commercial use).

## How grounding works

When a tool you build references a statute, regulation, or case, LawJam calls the connected source **for that jurisdiction** and cites the real provision — it does not rely on the model's memory. If nothing is connected for the jurisdiction, or the source returns nothing, the reference is **marked for you to verify** rather than fabricated. Connect the source for your jurisdiction and your tools cite live law; don't, and they'll flag what needs checking.

> Adding a source to the curated library: edit `mcp-library.ts`. Open/no-auth sources can be auto-connected; others appear here with connect steps.
