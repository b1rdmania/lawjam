import type { MetaFunction } from '@remix-run/cloudflare';
import { useEffect, useState } from 'react';
import { db, getAll, type ChatHistoryItem } from '~/lib/persistence';

export const meta: MetaFunction = () => [{ title: 'My tools — LawJam' }];

// My tools = the lawyer-facing view of bolt's chat history (each chat is a tool they built).
export default function MyTools() {
  const [tools, setTools] = useState<ChatHistoryItem[] | null>(null);

  useEffect(() => {
    if (!db) {
      setTools([]);
      return;
    }
    getAll(db)
      .then((list) => setTools(list.filter((t) => t.urlId && t.description).sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))))
      .catch(() => setTools([]));
  }, []);

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
          <h1 className="text-4xl sm:text-5xl font-bold tracking-[-0.02em] mb-3">My tools</h1>
          <p className="text-[#52525B]">Everything you've built. Open one to keep working on it.</p>
        </section>

        {tools === null ? (
          <p className="text-[#71717A] pb-24">Loading…</p>
        ) : tools.length === 0 ? (
          <div className="rounded-2xl bg-[#F4F4F3] p-10 text-center mb-24">
            <div className="text-lg font-semibold mb-2">No tools yet</div>
            <p className="text-sm text-[#52525B] mb-5">Pick a design system and describe what you want — your first tool takes a minute.</p>
            <a href="/" className="inline-block rounded-full bg-[#141414] hover:bg-black text-white text-sm px-5 py-2.5">
              Build your first tool
            </a>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-24">
            {tools.map((t) => (
              <a
                key={t.id}
                href={`/chat/${t.urlId}`}
                className="rounded-2xl border border-black/[0.06] bg-[#FCFCFC] hover:bg-[#F7F7F6] transition p-5 flex flex-col gap-2"
              >
                <div className="i-ph:wrench text-2xl text-accent-700" />
                <div className="text-base font-semibold leading-snug">{t.description}</div>
                <div className="text-xs text-[#A1A1AA] mt-auto pt-2">
                  {t.timestamp ? new Date(t.timestamp).toLocaleDateString() : ''}
                </div>
              </a>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
