/**
 * LawJam template gallery — the on-ramp.
 *
 * A confused, time-poor lawyer can't spec a tool from a blank prompt — that's
 * the exact skill they lack. So LawJam leads with templates: pick a working
 * legal tool, then customise it in plain English. Each card seeds a rich prompt
 * that names the relevant skill and grounding, so the build comes out good.
 *
 * Add a template: append an entry. Keep the set tight and credible — these are
 * the proof gallery and the first thing a lawyer (and a partner like Antoine) sees.
 */

export interface LawJamTemplate {
  id: string;
  name: string;
  jurisdiction: string; // emoji + short label
  blurb: string; // one line on the card
  icon: string; // iconify (phosphor) class
  prompt: string; // the seed prompt sent on click
}

export const LAWJAM_TEMPLATES: LawJamTemplate[] = [
  {
    id: 'tenancy-checker',
    name: 'Tenancy Agreement Checker',
    jurisdiction: '🇬🇧 Housing',
    blurb: 'Flag clauses that breach UK housing law.',
    icon: 'i-ph:house-line',
    prompt:
      'Build a tenancy-agreement checker as a runnable web app. The user pastes a residential tenancy agreement; the tool checks each clause against UK housing law (Housing Act 1988, Tenant Fees Act 2019, Protection from Eviction Act 1977, and unfair terms under the Consumer Rights Act 2015) and returns a clear results table — clause, pass/fail, the provision it engages. Ground every legal reference via the UK law tool; mark anything uncertain for a solicitor to verify. Clean, credible UI; assistive tool, not legal advice.',
  },
  {
    id: 'lba-drafter',
    name: 'Letter Before Action',
    jurisdiction: '🇬🇧 Litigation',
    blurb: 'Draft a pre-action letter on the right protocol.',
    icon: 'i-ph:envelope-simple',
    prompt:
      'Build a letter-before-action drafter for England & Wales as a runnable web app, following the cpr-letter-drafter skill. From a short intake, pick the correct pre-action protocol (debt, professional negligence, housing disrepair, personal injury, or the default Practice Direction on Pre-Action Conduct), draft the letter, and surface the limitation deadline as something for a solicitor to confirm — never asserted. Form in, finished letter out.',
  },
  {
    id: 'nda-review',
    name: 'NDA Review',
    jurisdiction: '🤝 Commercial',
    blurb: 'Review an NDA from your side, flag the issues.',
    icon: 'i-ph:file-text',
    prompt:
      'Build an NDA review tool as a runnable web app. The user pastes a one-way NDA and picks their side (recipient or discloser); the tool returns an issues log with the problem terms and a suggested redline position for each, following the nda-triage / contract-review method. Clean results UI; flag anything that needs a lawyer’s eye.',
  },
  {
    id: 'wp-settlement',
    name: 'Settlement Letter',
    jurisdiction: '🇬🇧 Disputes',
    blurb: 'Draft a WP / Calderbank offer on the right footing.',
    icon: 'i-ph:handshake',
    prompt:
      'Build a settlement-letter drafter as a runnable web app, following the without-prejudice-drafter skill. Pick the correct footing (without prejudice, WP save as to costs / Calderbank, or open), draft the letter, and warn the user where marking it "without prejudice" won’t actually keep it out of court (the Unilever v Procter & Gamble exceptions). Form in, letter out.',
  },
  {
    id: 'intake-triage',
    name: 'Client Intake Triage',
    jurisdiction: '📋 Front door',
    blurb: 'Triage an enquiry — urgency, matter type, next step.',
    icon: 'i-ph:clipboard-text',
    prompt:
      'Build a client-intake triage tool as a runnable web app. A prospective client answers a short set of plain-English questions; the tool classifies the matter type, flags urgency and any limitation/deadline risk, and recommends a next step — storing each submission in a simple dashboard the firm can review. Clear, reassuring UI; make plain it is an assistive triage aid, not legal advice.',
  },
  {
    id: 'disclosure-checklist',
    name: 'Disclosure Checklist',
    jurisdiction: '🇬🇧 Litigation',
    blurb: 'Work out what must be disclosed (PD 57AD / CPR 31).',
    icon: 'i-ph:list-checks',
    prompt:
      'Build a disclosure checklist tool as a runnable web app, following the disclosure-list skill. From the case details, pick the regime (PD 57AD Disclosure Pilot with its Models A–E, or standard disclosure under CPR Part 31), choose a model per issue, and produce the structured list plus the disclosure certificate for the party to sign. Ground references in the rules; mark anything to confirm.',
  },
];
