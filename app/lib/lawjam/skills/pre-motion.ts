import type { LegalSkill } from './index';

/**
 * Pre-Motion — first skill in the Lawve catalogue (accepted on lawve.ai).
 * Helps structure the work that comes before issuing an application/motion:
 * what to settle, what to evidence, and what to put the other side on notice of.
 */
export const preMotion: LegalSkill = {
  id: 'pre-motion',
  name: 'Pre-Motion',
  description:
    'Structure the steps before issuing an application or motion: narrow the issue, gather evidence, and put the other side on notice.',
  jurisdiction: 'UK / England & Wales',
  guidance: [
    'Identify the precise order sought and the rule or practice direction it sits under.',
    'List the facts that must be evidenced and where each comes from.',
    'Draft the notice / correspondence that should precede the application (CPR pre-action conduct).',
    'Flag the test the court will apply and the strongest counter-argument the other side has.',
    'Never assert a legal test or authority without grounding it — use the case-law battery or mark it for verification.',
  ].join('\n'),
};
