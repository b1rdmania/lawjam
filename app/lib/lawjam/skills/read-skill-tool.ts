import { tool, type ToolSet } from 'ai';
import { z } from 'zod';
import { LAWJAM_SKILLS_FULL } from './catalogue';
import { verifyQuoteTool } from '../verify-quote-tool';

/**
 * `read_skill` — lets the LLM orchestrator load a legal skill's FULL method body
 * on demand. The system prompt only carries a terse skill index; once a skill
 * matches the user's task, the model calls this tool with the skill's id to pull
 * in the complete SKILL.md so it can follow the practitioner method exactly.
 *
 * Unlike MCP tools (which strip `execute` and round-trip through the client
 * approval flow), this tool executes server-side automatically inside the
 * streamText `maxSteps` loop — no user approval needed to read a bundled skill.
 */
export const readSkillTool = tool({
  description:
    "Load the full method body (SKILL.md) for a LawJam legal skill by its id, so you can follow the practitioner's exact approach rather than the one-line gist from the catalogue. Call this once a skill in <legal_skills> matches the user's task.",
  parameters: z.object({
    id: z.string().describe('The skill id exactly as listed in the <legal_skills> catalogue, e.g. "chronology".'),
  }),
  execute: async ({ id }) => {
    return LAWJAM_SKILLS_FULL[id] ?? `No such skill: ${id}`;
  },
});

/**
 * The LawJam-native server-side tools to merge into the tools passed to
 * streamText, alongside any connected MCP tools.
 */
export const LAWJAM_TOOLS: ToolSet = {
  read_skill: readSkillTool,
  verify_quote: verifyQuoteTool,
};
