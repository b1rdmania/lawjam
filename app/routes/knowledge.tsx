import type { MetaFunction } from '@remix-run/cloudflare';
import { useEffect, useState } from 'react';
import { addItem, getAll, removeItem, type KnowledgeItem } from '~/lib/lawjam/knowledge';
import type { RedactionResponse } from '~/lib/lawjam/redaction';

export const meta: MetaFunction = () => [{ title: 'Knowledge — LawJam' }];

// Knowledge = the firm's own reference text (playbook, house style, standard
// clauses) that grounds every tool the lawyer builds, alongside live UK law.
export default function Knowledge() {
  const [items, setItems] = useState<KnowledgeItem[] | null>(null);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [redacting, setRedacting] = useState(false);
  const [redactNote, setRedactNote] = useState<string | null>(null);
  const [redactError, setRedactError] = useState<string | null>(null);

  useEffect(() => {
    setItems(getAll());
  }, []);

  const redact = async () => {
    if (!text.trim() || redacting) {
      return;
    }

    setRedacting(true);
    setRedactNote(null);
    setRedactError(null);

    try {
      const res = await fetch('/api/redact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      const data = (await res.json()) as RedactionResponse;

      if ('error' in data) {
        setRedactError(data.error);
        return;
      }

      setText(data.redacted);

      const count = data.mapping.length;
      setRedactNote(
        count === 0 ? 'No client names or PII found.' : `${count} item${count === 1 ? '' : 's'} redacted before saving.`,
      );
    } catch {
      setRedactError('Redaction could not complete. Your text was not changed.');
    } finally {
      setRedacting(false);
    }
  };

  const save = () => {
    if (!title.trim() || !text.trim()) {
      return;
    }

    setItems(addItem(title, text));
    setTitle('');
    setText('');
  };

  const remove = (id: string) => {
    setItems(removeItem(id));
  };

  return (
    <div className="min-h-full bg-white text-[#1A1A1A] font-[Hanken_Grotesk,ui-sans-serif,system-ui]">
      <header className="border-b border-black/5">
        <div className="mx-auto max-w-5xl px-6 h-16 flex items-center justify-between">
          <a href="/" className="text-2xl font-bold tracking-[-0.02em]">
            Law<span className="text-accent-700">Jam</span>
          </a>
          <a
            href="/"
            className="text-sm rounded-full bg-[#141414] hover:bg-black text-white px-4 py-2 transition-colors"
          >
            New tool
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6">
        <section className="pt-16 pb-10">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-[-0.02em] mb-3">Knowledge</h1>
          <p className="text-[#52525B]">
            Add your firm's own reference text — a playbook, house style, standard clauses. Every tool you build is
            grounded in it, alongside live UK law.
          </p>
        </section>

        <section className="rounded-2xl bg-[#F4F4F3] p-6 sm:p-8 mb-10">
          <label className="block text-sm font-semibold mb-2">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. NDA house style"
            className="w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm mb-5 outline-none focus:border-accent-700"
          />

          <label className="block text-sm font-semibold mb-2">Reference text</label>
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setRedactNote(null);
              setRedactError(null);
            }}
            placeholder="Paste your playbook, standard clauses, or house style…"
            rows={8}
            className="w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-sm mb-3 outline-none focus:border-accent-700 resize-y"
          />

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-2">
            <button
              type="button"
              onClick={redact}
              disabled={!text.trim() || redacting}
              className="text-sm font-medium text-accent-700 hover:text-accent disabled:opacity-40 disabled:hover:text-accent-700 transition-colors"
            >
              {redacting ? 'Redacting…' : 'Redact client names & PII'}
            </button>
            {redactNote && <span className="text-xs text-[#71717A]">{redactNote}</span>}
            {redactError && <span className="text-xs text-[#52525B]">{redactError}</span>}
          </div>
          <p className="text-xs text-[#A1A1AA] mb-5">
            Strips client names, addresses, emails and references before the text is saved or sent to the model.
            Optional — saving without it keeps your text as-is.
          </p>

          <button
            onClick={save}
            disabled={!title.trim() || !text.trim()}
            className="rounded-full bg-[#141414] hover:bg-black disabled:opacity-40 disabled:hover:bg-[#141414] text-white text-sm px-5 py-2.5 transition-colors"
          >
            Save to knowledge
          </button>
        </section>

        <section className="pb-24">
          {items === null ? (
            <p className="text-[#71717A]">Loading…</p>
          ) : items.length === 0 ? (
            <div className="rounded-2xl bg-[#F4F4F3] p-10 text-center">
              <div className="text-lg font-semibold mb-2">Nothing saved yet</div>
              <p className="text-sm text-[#52525B]">Add your first reference above — it'll ground the next tool you build.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-black/[0.06] bg-[#FCFCFC] p-5 flex items-start justify-between gap-4"
                >
                  <div className="min-w-0">
                    <div className="text-base font-semibold leading-snug mb-1">{item.title || 'Untitled'}</div>
                    <p className="text-sm text-[#52525B] line-clamp-3 whitespace-pre-wrap">{item.text}</p>
                  </div>
                  <button
                    onClick={() => remove(item.id)}
                    className="shrink-0 text-sm text-[#71717A] hover:text-accent-700 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
