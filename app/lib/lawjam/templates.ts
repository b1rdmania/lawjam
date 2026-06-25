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
      'Use the "LawJam" design system for everything you build: pure white background, near-black text, bold tight grotesque sans headings, a single oxblood (#76232F) accent used sparingly, soft rounded cards, generous whitespace, minimal Swiss restraint. First ask me what legal tool to build — then build it to this design system.',
  },
  {
    id: 'chambers',
    name: 'Chambers',
    blurb: 'Traditional and authoritative. Serif headings, ink and oxblood on warm paper.',
    swatch: ['#F4EFE6', '#1B1B1A', '#6E1F2B'],
    prompt:
      'Use the "Chambers" design system: warm cream/paper background, deep ink text, a refined transitional serif for headings with a clean sans for body, an oxblood accent, formal and authoritative with restrained ornament — the feel of a barristers’ chambers. First ask me what legal tool to build — then build it to this design system.',
  },
  {
    id: 'modern-firm',
    name: 'Modern firm',
    blurb: 'Contemporary and corporate. Clean sans, crisp white, a confident navy.',
    swatch: ['#FFFFFF', '#0F172A', '#1E3A8A'],
    prompt:
      'Use the "Modern firm" design system: crisp white background, slate/near-black text, a clean modern sans throughout, a confident navy (#1E3A8A) accent, generous spacing, a sharp professional legal-tech feel. First ask me what legal tool to build — then build it to this design system.',
  },
  {
    id: 'approachable',
    name: 'Approachable',
    blurb: 'Warm and human, for client-facing tools. Soft palette, friendly rounded UI.',
    swatch: ['#FBF7F2', '#2A2622', '#C2613B'],
    prompt:
      'Use the "Approachable" design system: warm off-white background, soft charcoal text, friendly rounded components, a warm terracotta (#C2613B) accent, gentle and human — for tools a client (not a lawyer) will actually use. First ask me what legal tool to build — then build it to this design system.',
  },
  {
    id: 'official',
    name: 'Official',
    blurb: 'Formal and accessible, public-sector feel. Blue, structured, high-contrast.',
    swatch: ['#FFFFFF', '#0B0C0C', '#1D70B8'],
    prompt:
      'Use the "Official" design system: white background, near-black high-contrast text, a clear functional sans, a government blue (#1D70B8) accent, strong structure and accessibility (gov.uk-like), formal and trustworthy. First ask me what legal tool to build — then build it to this design system.',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    blurb: 'Swiss and stripped. Monochrome, tight type, nothing decorative.',
    swatch: ['#FFFFFF', '#111111', '#8A8A8A'],
    prompt:
      'Use the "Minimal" design system: pure monochrome (white, black, greys), tight precise sans typography, a strict grid, generous whitespace and zero decoration — Swiss restraint. First ask me what legal tool to build — then build it to this design system.',
  },
];
