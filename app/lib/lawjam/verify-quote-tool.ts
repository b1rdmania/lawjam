import { tool } from 'ai';
import { z } from 'zod';
import { quoteFoundInSource } from './source-anchors';

/**
 * `verify_quote` — lets the LLM honestly check that a passage it intends to
 * quote actually appears in a given source text (e.g. the user's uploaded firm
 * knowledge or a pasted document) BEFORE relying on it.
 *
 * This is a literal presence check, not a legal-citation verification: a `found`
 * of `true` only means the quote occurs verbatim in `source`. It does NOT prove
 * the citation is real or the legal claim is correct (see source-anchors.ts).
 *
 * Executes server-side automatically inside the streamText `maxSteps` loop.
 */
export const verifyQuoteTool = tool({
  description:
    'Check whether an exact quoted passage actually appears in a given source text (e.g. the user\'s uploaded firm knowledge or a pasted document) before relying on it. Returns whether the quote was found — an honesty check, not a legal-citation verification.',
  parameters: z.object({
    quote: z.string().describe('The exact passage you intend to quote and want to check.'),
    source: z.string().describe('The source text to search within, e.g. uploaded firm knowledge or a pasted document.'),
  }),
  execute: async ({ quote, source }) => {
    return { found: quoteFoundInSource(quote, source) };
  },
});
