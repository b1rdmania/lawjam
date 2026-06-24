/**
 * LawJam — Skills battery.
 *
 * Reusable UK legal skills (the Lawve catalogue) the agent can lean on while
 * building, and that generated tools can call at run-time. Each skill is a
 * small, named, documented capability — not a model prompt buried in a tool.
 *
 * Add a skill by dropping a module here and registering it in `SKILLS`.
 * Keep the catalogue small and durable (three good skills beat twelve rotting
 * ones — plugin rot eats solo maintainers).
 */

export interface LegalSkill {
  id: string;
  name: string;
  /** One line the agent reads to decide whether this skill fits the task. */
  description: string;
  /** Jurisdiction the skill is written for. */
  jurisdiction: string;
  /** Guidance the agent should follow when applying the skill. */
  guidance: string;
}

import { preMotion } from './pre-motion';

export const SKILLS: Record<string, LegalSkill> = {
  [preMotion.id]: preMotion,
};

export function listSkills(): LegalSkill[] {
  return Object.values(SKILLS);
}

export function getSkill(id: string): LegalSkill | undefined {
  return SKILLS[id];
}
