import { tool, type ToolSet } from 'ai';
import { z } from 'zod';
import { LAWJAM_SKILLS_FULL } from './catalogue';
import { verifyQuoteTool } from '../verify-quote-tool';

/**
 * `read_skill` — loads ONE legal skill's full method body on demand.
 *
 * HARD CONTEXT DISCIPLINE. Skill bodies are large (multiple thousand tokens
 * each). With no cap the model drowned: on a non-UK task it read 10+ UK skills
 * hunting for a match, blew context past 300k tokens, and never built the tool
 * (and a creative build collapsed to ~380 completion tokens after 5 reads). So
 * this tool now refuses every read after the first one in a build — the model
 * gets at most ONE skill, then must build. Every result also tells it to stop
 * reading and build immediately. The reluctance lives in <legal_skills> too.
 */

// Count read_skill tool-calls already in the conversation handed to this step,
// so the cap holds regardless of maxSteps or length-continuations.
function priorReadSkillCalls(messages: unknown): number {
  if (!Array.isArray(messages)) {
    return 0;
  }

  let n = 0;

  for (const m of messages as Array<{ content?: unknown }>) {
    const content = m?.content;

    if (Array.isArray(content)) {
      for (const part of content as Array<{ type?: string; toolName?: string }>) {
        if (part?.type === 'tool-call' && part?.toolName === 'read_skill') {
          n++;
        }
      }
    }
  }

  return n;
}

const BUILD_NOW =
  '\n\n---\nYou have now read a skill. STOP — do NOT call read_skill again. Apply this method and BUILD the tool immediately.';

export const readSkillTool = tool({
  description:
    'Load the full method body for ONE LawJam legal skill — ONLY when the request is a clear England & Wales legal-practitioner task that closely matches a skill in <legal_skills>. Call it AT MOST ONCE per build, then build immediately. Do NOT call it for non-UK, general, or creative tools — build those directly. A second read in the same build is refused.',
  parameters: z.object({
    id: z.string().describe('The skill id exactly as listed in the <legal_skills> catalogue, e.g. "lba-drafter".'),
  }),
  execute: async ({ id }, options) => {
    // Hard cap: at most one skill read per build. This is what breaks the loop.
    if (priorReadSkillCalls((options as { messages?: unknown })?.messages) >= 1) {
      return 'LIMIT REACHED — you have already read one skill in this build. Do NOT call read_skill again. Build the tool NOW with what you have; reading more skills wastes context and will not improve the result.';
    }

    const body = LAWJAM_SKILLS_FULL[id];

    if (!body) {
      return `No skill with id "${id}". Do not search the catalogue further — build the tool now with your own knowledge.`;
    }

    return body + BUILD_NOW;
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
