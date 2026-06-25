/**
 * LawJam design systems — the pickable gallery.
 *
 * Like bolt's pre-loaded design systems: you pick a LOOK (a coherent visual
 * system — palette, type, component style), then describe the tool you want in
 * chat and it's built to that look. LawJam *ships* the design systems, so every
 * tool a lawyer builds is credible-by-default — the thing a generic builder lacks.
 *
 * Each card shows a colour swatch so it's chosen by appearance. The seed prompt
 * sets the design system, then asks what to build.
 */

export interface LawJamDesignSystem {
  id: string;
  name: string;
  blurb: string;
  swatch: string[]; // bg / ink / accent — rendered as the card's visual preview
  prompt: string;
}

export const LAWJAM_DESIGN_SYSTEMS: LawJamDesignSystem[] = [
  {
    id: 'lawjam',
    name: 'LawJam',
    blurb: 'Clean and modern. Near-monochrome, bold sans, one oxblood accent.',
    swatch: ['#FFFFFF', '#141414', '#76232F'],
    prompt:
      'Use the "LawJam" design system for everything you build. Palette: pure white (#FFFFFF) canvas, near-black ink (#141414), a single oxblood accent (#76232F) used only on primary actions and links, light hairline borders (#E7E4E0). Type: Hanken Grotesk throughout — headings bold and tight (-0.02em tracking), body 16px/1.6. Geometry: 8px radius on cards and inputs, generous whitespace, a strict left-aligned grid with Swiss restraint. Signature move: a thin oxblood underline that animates in under the active section heading. First ask me what legal tool to build — then build it to this design system.',
  },
  {
    id: 'chambers',
    name: 'Chambers',
    blurb: 'Traditional and authoritative. Serif headings, ink and oxblood on warm paper.',
    swatch: ['#F4EFE6', '#1B1B1A', '#6E1F2B'],
    prompt:
      'Use the "Chambers" design system. Palette: warm paper background (#F4EFE6), deep ink text (#1B1B1A), oxblood accent (#6E1F2B), muted gold detail (#A98B4E). Type: Spectral for headings (medium weight, slightly larger leading) paired with Source Sans 3 for body and labels. Geometry: near-square 4px radius, ruled hairline dividers in ink at 10% opacity, formal two-column rhythm, restrained ornament. Signature move: small-caps section labels with letterspacing and a thin double-rule beneath each page title — the feel of a barristers’ chambers. First ask me what legal tool to build — then build it to this design system.',
  },
  {
    id: 'modern-firm',
    name: 'Modern firm',
    blurb: 'Contemporary and corporate. Clean sans, crisp white, a confident navy.',
    swatch: ['#FFFFFF', '#0F172A', '#1E3A8A'],
    prompt:
      'Use the "Modern firm" design system. Palette: crisp white (#FFFFFF), slate ink (#0F172A), confident navy accent (#1E3A8A), cool grey surfaces (#F1F5F9) for cards. Type: Inter throughout — semibold headings, 15px body, tight numeric tabular figures for any tables. Geometry: 10px radius, soft single-layer shadows on elevated cards, a clear 12-column grid with comfortable padding. Signature move: a navy left-border rule (3px) on key cards and a subtle navy-to-transparent gradient header band — a sharp, professional legal-tech feel. First ask me what legal tool to build — then build it to this design system.',
  },
  {
    id: 'approachable',
    name: 'Approachable',
    blurb: 'Warm and human, for client-facing tools. Soft palette, friendly rounded UI.',
    swatch: ['#FBF7F2', '#2A2622', '#C2613B'],
    prompt:
      'Use the "Approachable" design system. Palette: warm off-white (#FBF7F2), soft charcoal text (#2A2622), warm terracotta accent (#C2613B), gentle sage support (#7C8A6E). Type: Fraunces for friendly headings (soft optical, normal weight) with Hanken Grotesk for body at a comfortable 17px/1.7. Geometry: large 16px radius on cards and buttons, pill-shaped inputs, plenty of breathing room, no hard shadows. Signature move: rounded illustrative chips and a warm terracotta fill on primary buttons — gentle and human, for tools a client (not a lawyer) will actually use. First ask me what legal tool to build — then build it to this design system.',
  },
  {
    id: 'official',
    name: 'Official',
    blurb: 'Formal and accessible, public-sector feel. Blue, structured, high-contrast.',
    swatch: ['#FFFFFF', '#0B0C0C', '#1D70B8'],
    prompt:
      'Use the "Official" design system. Palette: white (#FFFFFF), near-black high-contrast text (#0B0C0C), government blue accent (#1D70B8), a focus yellow (#FFDD00) for keyboard focus states. Type: a clear functional sans (use "Public Sans", fallback system-ui) with strong 19px body and bold headings. Geometry: zero or 2px radius, square buttons, a thick (4px) accent bar under the masthead, generous line height and WCAG AA contrast everywhere. Signature move: gov.uk-style green/blue underlined links, visible focus boxes, and a left-aligned single-column reading width — formal, structured, trustworthy. First ask me what legal tool to build — then build it to this design system.',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    blurb: 'Swiss and stripped. Monochrome, tight type, nothing decorative.',
    swatch: ['#FFFFFF', '#111111', '#8A8A8A'],
    prompt:
      'Use the "Minimal" design system. Palette: pure monochrome only — white (#FFFFFF), black (#111111), and a single grey (#8A8A8A) for secondary text and 1px rules. No accent colour at all. Type: IBM Plex Sans, tight and precise, headings at regular weight with -0.01em tracking, body 15px. Geometry: zero radius (true squares), a strict modular grid, hairline 1px dividers, maximal whitespace and absolutely no shadows, gradients or decoration. Signature move: typographic hierarchy carries everything — size and weight only, restraint as the statement. First ask me what legal tool to build — then build it to this design system.',
  },
  {
    id: 'editorial',
    name: 'Editorial',
    blurb: 'Magazine-like and generous. Big serif display, wide measure, confident whitespace.',
    swatch: ['#FAF8F4', '#15110D', '#9A3B2E'],
    prompt:
      'Use the "Editorial" design system. Palette: soft ivory (#FAF8F4), rich near-black ink (#15110D), a burnt-red accent (#9A3B2E), warm grey captions (#8C857B). Type: Newsreader for large display headings (light weight, big sizes, generous leading) paired with Spectral for body set at a relaxed 18px/1.8 on a wide reading measure. Geometry: 6px radius, full-bleed section breaks, drop-cap or oversized lead-in on the first paragraph, asymmetric two-column layouts with pull-quotes. Signature move: a hanging burnt-red kicker label above each heading and generous magazine-style margins — long-form, considered, premium. First ask me what legal tool to build — then build it to this design system.',
  },
  {
    id: 'compact',
    name: 'Compact',
    blurb: 'Dense and data-heavy. Tight rows, mono figures, for litigation power users.',
    swatch: ['#0F1115', '#E6E9EF', '#3FA7A0'],
    prompt:
      'Use the "Compact" design system. Palette: dark slate canvas (#0F1115), light text (#E6E9EF), a teal accent (#3FA7A0) for active rows and primary actions, muted dividers (#2A2E37), amber (#E0A23B) for warnings/flags. Type: IBM Plex Sans for UI at a small 13px, IBM Plex Mono for all numbers, IDs, dates and case references (tabular figures). Geometry: 4px radius, tight 28px row height, dense tables with sticky headers, compact filters and inline editing, minimal padding to maximise information density. Signature move: zebra-striped data tables with a teal left-edge on the selected row and keyboard-first affordances — a litigation dashboard for power users. First ask me what legal tool to build — then build it to this design system.',
  },
];
