# chronology

Builds a UK civil litigation chronology from declared sources, with per-entry source attribution, a CPR 31.22 implied-undertaking check, a privilege screen, and case-theory significance tagging. Outputs a working chronology by default, or Statement-of-Facts and witness-specific variants on request.

## Install

Part of the [claude-for-uk-legal](https://github.com/b1rdmania/claude-for-uk-legal) plugin suite:

```bash
/plugin marketplace add https://github.com/b1rdmania/claude-for-uk-legal
/plugin install uk-litigation-legal@claude-for-uk-legal
```

Or install the single skill directly:

```bash
cp -r chronology ~/.claude/skills/chronology
```

## Usage

```
/chronology [slug] [--format=working|sof|witness-[name]]
```

Run it against a matter with the disclosure bundle, witness statements, case theory, pivot fact, and side. It returns a chronology with every event attributed to its source.

```
/chronology khan-v-acme --format=sof
```

Builds the chronology for the Khan v Acme matter and filters it to a Statement-of-Facts narrative — 🔴 and select 🟡 events, prose, disclosure references, privilege-flagged entries excluded.

## What it does

- Runs a CPR 31.22 implied-undertaking check before extracting from any disclosed document, and refuses or flags if the use looks like a different matter, a commercial purpose, or external publication.
- Determines the privilege posture (cleared / mixed / pause-and-screen) and tags entries `priv: ok` / `priv: flag` / `priv: review` where sources are unscreened.
- Extracts dated events across the bundle, witness statements, expert reports, public registers, and correspondence; de-duplicates the same event surfacing in multiple documents into one entry with multi-source attribution.
- Attributes every entry to its source — Bates / disclosure reference, file path, or witness-statement paragraph. Entries from web search, model knowledge, or in-session user statements are tagged for verification.
- Tags each event for significance against the case theory from the named side's view (🔴 moves a factfinder, 🟡 supportive but impeachable, ⚪ background).
- Produces a working chronology, a Statement-of-Facts narrative, or a witness-specific timeline, with a Key Events section, a Gaps section, and version tracking for incremental rebuilds.

## What it doesn't do

- Resolve contradictions between sources — both go in with flags.
- Fill gaps from web search or model knowledge silently — the user is asked first.
- Decide privilege status — the posture is selected and per-entry flags are first-pass; counsel decides distribution.
- Replace counsel's judgment on what goes into a pleading or before the court. The chronology and its tags are a draft for solicitor review, not legal advice.
- Cover Scottish or Northern Irish proceedings.

## Requirements

- Claude Code or Claude Cowork. No MCP connectors required.
- A matter to run against (a disclosure bundle, witness statements, or matter folder).
- The CPR 31.22 / privilege hard gate is enforced by the host workspace upstream. The skill's own check supplements it, not replaces it. Run standalone only on material you are permitted to use.

## License

Apache-2.0.
