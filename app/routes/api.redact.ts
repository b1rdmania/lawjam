import { type ActionFunctionArgs } from '@remix-run/cloudflare';
import { createAnthropic } from '@ai-sdk/anthropic';
import { generateText } from 'ai';
import { createScopedLogger } from '~/utils/logger';
import {
  REDACTION_SYSTEM_PROMPT,
  parseRedactionEnvelope,
  type RedactionResponse,
} from '~/lib/lawjam/redaction';

const logger = createScopedLogger('api.redact');

const REDACT_MODEL = 'claude-sonnet-4-6';

// Keep redaction bounded — firm reference text is grounding material, not a
// whole disclosure bundle. Matches the knowledge store's injected-context cap
// order of magnitude.
const MAX_INPUT_CHARS = 20000;

export async function action(args: ActionFunctionArgs) {
  return redactAction(args);
}

function parseCookies(cookieHeader: string): Record<string, string> {
  const cookies: Record<string, string> = {};

  cookieHeader.split(';').forEach((cookie) => {
    const [name, ...rest] = cookie.trim().split('=');

    if (name && rest.length) {
      cookies[decodeURIComponent(name.trim())] = decodeURIComponent(rest.join('=').trim());
    }
  });

  return cookies;
}

/**
 * Resolve the Anthropic key SERVER-SIDE only — never sent to the client.
 * Mirrors api.chat.ts: prefer the Cloudflare env binding, then fall back to the
 * BYO key the user stored in the `apiKeys` cookie.
 */
function resolveApiKey(request: Request, env?: Env): string | undefined {
  const fromEnv = env?.ANTHROPIC_API_KEY;

  if (fromEnv) {
    return fromEnv;
  }

  try {
    const cookies = parseCookies(request.headers.get('Cookie') || '');
    const apiKeys = JSON.parse(cookies.apiKeys || '{}') as Record<string, string>;

    return apiKeys.Anthropic || apiKeys.ANTHROPIC_API_KEY || undefined;
  } catch {
    return undefined;
  }
}

function json(body: RedactionResponse, status = 200): Response {
  // Always 200 so the UI can render a calm message from { error } without a
  // throw; error detail lives in the body, never in a stack trace to the user.
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

async function redactAction({ context, request }: ActionFunctionArgs) {
  let text = '';

  try {
    const body = await request.json<{ text?: string }>();
    text = (body.text || '').trim();
  } catch {
    return json({ error: 'Could not read the text to redact.' });
  }

  if (!text) {
    return json({ error: 'There is no text to redact yet.' });
  }

  if (text.length > MAX_INPUT_CHARS) {
    return json({
      error: `That is a lot of text to redact at once (over ${MAX_INPUT_CHARS.toLocaleString()} characters). Trim it and try again.`,
    });
  }

  const apiKey = resolveApiKey(request, context.cloudflare?.env);

  if (!apiKey) {
    return json({ error: 'No Anthropic key is configured. Add a key to enable redaction.' });
  }

  try {
    const anthropic = createAnthropic({ apiKey });

    const { text: raw } = await generateText({
      model: anthropic(REDACT_MODEL),
      system: REDACTION_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: text }],
      maxTokens: 8000,
      temperature: 0,
    });

    const result = parseRedactionEnvelope(raw, text);

    return json(result);
  } catch (error: any) {
    logger.error('Redaction failed', error);

    const message = error?.message || '';

    if (/api key|unauthorized|authentication|401/i.test(message)) {
      return json({ error: 'The Anthropic key was rejected. Check the configured key and try again.' });
    }

    if (/rate limit|429/i.test(message)) {
      return json({ error: 'The model is busy right now. Wait a moment and try again.' });
    }

    return json({ error: 'Redaction could not complete. Your text was not changed.' });
  }
}
