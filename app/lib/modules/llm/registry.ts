/**
 * LawJam — provider registry.
 *
 * Deliberately Claude-only. A lawyer doesn't need 30 model providers; LawJam is
 * opinionated. Anthropic auto-fetches the live Claude lineup once a key is added
 * (see providers/anthropic.ts getDynamicModels). To widen later, re-add a
 * provider import + export here and it registers automatically.
 */
import AnthropicProvider from './providers/anthropic';

export { AnthropicProvider };
