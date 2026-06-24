/**
 * LawJam templates — DESIGN templates, not legal-task ideas.
 *
 * Like Word/PowerPoint: you pick a LAYOUT (a proven, good-looking design), then
 * describe your legal content into it. This removes two kinds of blank-canvas
 * load at once — what should it look like, and how should it be structured —
 * and leaves the lawyer only the part they know: the legal content.
 *
 * Each layout maps to a Mobbin-referenced UI pattern (see DESIGN.md P1–P4) and
 * its seed prompt builds the design as a working shell, then asks what it's for.
 */

export interface LawJamTemplate {
  id: string;
  name: string;
  tag: string; // what this design is good for
  blurb: string; // one line on the card
  icon: string; // iconify (phosphor) class
  prompt: string; // seed: build the layout, then ask for the legal content
}

export const LAWJAM_TEMPLATES: LawJamTemplate[] = [
  {
    id: 'form',
    name: 'Form & intake',
    tag: 'Intake · screeners · questionnaires',
    blurb: 'A clean sectioned form that collects answers and returns a structured result.',
    icon: 'i-ph:clipboard-text',
    prompt:
      'Build a multi-step intake/questionnaire tool, designed to the LawJam house style: a clean sectioned form that collects answers, validates them, and produces a clear structured result or summary at the end. Use sensible placeholder questions for now — then ask me what this form is for and what questions and outcomes it should have.',
  },
  {
    id: 'document',
    name: 'Document drafter',
    tag: 'Letters · notices · agreements',
    blurb: 'A form that turns inputs into a finished, properly formatted legal document.',
    icon: 'i-ph:envelope-simple',
    prompt:
      'Build a document-drafter tool, designed to the LawJam house style: a clean input form on the left and a live, properly formatted legal-document preview on the right that updates as fields are filled, with copy / print / export. Use a placeholder letter for now — then ask me what document it should draft and what fields and clauses it needs.',
  },
  {
    id: 'checker',
    name: 'Document checker',
    tag: 'Review · compliance · risk',
    blurb: 'Paste a document, get flagged issues with severity and the rule each engages.',
    icon: 'i-ph:file-magnifying-glass',
    prompt:
      'Build a document-checker tool, designed to the LawJam house style and following our results pattern: the user pastes a document; it returns a summary header with counts, then a list of flagged issues — each with a severity badge (oxblood for a flag, grey for minor), the point, and the provision it engages, expandable for detail — plus a summary banner. Use placeholder checks for now — then ask me what kind of document it checks and against what rules.',
  },
  {
    id: 'checklist',
    name: 'Checklist & tracker',
    tag: 'Procedure · due diligence',
    blurb: 'A structured checklist that works out what applies and tracks completion.',
    icon: 'i-ph:list-checks',
    prompt:
      'Build a checklist / tracker tool, designed to the LawJam house style: from a few inputs it works out which items apply, presents a structured checklist grouped by section, tracks completion, and can export the list. Use placeholder items for now — then ask me what process this checklist is for and what determines which items apply.',
  },
  {
    id: 'dashboard',
    name: 'Submissions dashboard',
    tag: 'Triage · matter tracking',
    blurb: 'Collect entries and review them in a clean table dashboard.',
    icon: 'i-ph:squares-four',
    prompt:
      'Build a submissions dashboard tool, designed to the LawJam house style: a simple intake that feeds a clean dashboard — summary count cards at the top, then a filterable table of entries with status, each expandable to detail. Store entries in browser storage. Use placeholder data for now — then ask me what is being collected and how entries should be classified.',
  },
  {
    id: 'comparison',
    name: 'Comparison',
    tag: 'Vs playbook · A / B',
    blurb: 'Compare a document against another or a standard, and show the differences.',
    icon: 'i-ph:rows',
    prompt:
      'Build a comparison tool, designed to the LawJam house style: two inputs (a document and a standard or playbook), a side-by-side view highlighting where they differ, each difference explained with a short position note. Use placeholder content for now — then ask me what is being compared and against what standard.',
  },
];
