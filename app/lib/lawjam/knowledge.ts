/**
 * LawJam Knowledge store.
 *
 * A small localStorage-backed list of the firm's own reference material — a
 * playbook, house style, standard clauses — so the tools a lawyer builds are
 * grounded in their OWN materials, alongside live UK law (the Lex MCP server).
 *
 * Mirrors the localStorage read/write pattern used by app/lib/stores/mcp.ts.
 * Plain functions (no zustand) — the route reads/writes synchronously and the
 * chat flow only needs a one-shot read.
 */

const KNOWLEDGE_KEY = 'lawjam_knowledge';
const isBrowser = typeof window !== 'undefined';

export type KnowledgeItem = {
  id: string;
  title: string;
  text: string;
};

export function getAll(): KnowledgeItem[] {
  if (!isBrowser) {
    return [];
  }

  try {
    const raw = localStorage.getItem(KNOWLEDGE_KEY);

    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as KnowledgeItem[];

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Error parsing saved knowledge:', error);
    return [];
  }
}

function persist(items: KnowledgeItem[]): KnowledgeItem[] {
  if (isBrowser) {
    localStorage.setItem(KNOWLEDGE_KEY, JSON.stringify(items));
  }

  return items;
}

export function addItem(title: string, text: string): KnowledgeItem[] {
  const item: KnowledgeItem = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title: title.trim(),
    text: text.trim(),
  };

  return persist([...getAll(), item]);
}

export function removeItem(id: string): KnowledgeItem[] {
  return persist(getAll().filter((item) => item.id !== id));
}

const MAX_INJECTED_CHARS = 4000;

/**
 * Build a bounded context block from saved knowledge, to prepend to the first
 * build message. Returns '' when there's nothing saved.
 */
export function buildKnowledgeContext(): string {
  const items = getAll().filter((item) => item.text);

  if (items.length === 0) {
    return '';
  }

  let body = '';
  let truncated = false;

  for (const item of items) {
    const entry = `\n## ${item.title || 'Untitled'}\n${item.text}\n`;

    if (body.length + entry.length > MAX_INJECTED_CHARS) {
      body += entry.slice(0, Math.max(0, MAX_INJECTED_CHARS - body.length));
      truncated = true;
      break;
    }

    body += entry;
  }

  const note = truncated ? '\n(Knowledge truncated to keep the prompt bounded.)' : '';

  return `[Firm knowledge the tool should follow:\n${body}${note}\n]\n\n`;
}
