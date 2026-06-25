/**
 * LawJam persistent left rail (Lovable/Sana-style).
 *
 * Always-visible nav for the builder. bolt's own slide-out Menu (chat history,
 * settings) stays available via the header toggle; this rail is the calm,
 * persistent primary nav + brand.
 */

import { useEffect, useState } from 'react';
import { db, getAll, type ChatHistoryItem } from '~/lib/persistence';

const NAV = [
  { label: 'New chat', href: '/', icon: 'i-ph:plus' },
  { label: 'My tools', href: '/tools', icon: 'i-ph:squares-four' },
  { label: 'Knowledge', href: '/knowledge', icon: 'i-ph:book-open' },
  { label: 'Designs', href: '/#template-gallery', icon: 'i-ph:palette' },
  { label: 'Examples', href: '/examples', icon: 'i-ph:lightbulb' },
  { label: 'Connectors', href: '/connectors', icon: 'i-ph:plugs-connected' },
];

const FOOTER = [
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
];

function Recents() {
  const [recents, setRecents] = useState<ChatHistoryItem[]>([]);

  useEffect(() => {
    if (!db) {
      return;
    }

    getAll(db)
      .then((list) =>
        setRecents(
          list
            .filter((t) => (t.urlId || t.id) && t.description)
            .sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))
            .slice(0, 6),
        ),
      )
      .catch(() => setRecents([]));
  }, []);

  if (recents.length === 0) {
    return null;
  }

  return (
    <div className="mt-6">
      <div className="px-3 mb-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-bolt-elements-textTertiary">
        Recents
      </div>
      <nav className="flex flex-col gap-0.5">
        {recents.map((t) => (
          <a
            key={t.id}
            href={`/chat/${t.urlId || t.id}`}
            title={t.description}
            className="truncate rounded-lg px-3 py-1.5 text-sm text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary hover:bg-bolt-elements-background-depth-2 transition-theme"
          >
            {t.description}
          </a>
        ))}
      </nav>
    </div>
  );
}

export function LawJamRail() {
  return (
    <aside className="hidden lg:flex shrink-0 w-[248px] h-full flex-col border-r border-bolt-elements-borderColor bg-bolt-elements-background-depth-1 px-3 py-4">
      <a href="/" className="px-3 py-2 text-2xl font-bold tracking-[-0.02em] text-bolt-elements-textPrimary">
        Law<span className="text-accent">Jam</span>
      </a>

      <div className="mt-2 flex items-center gap-2.5 rounded-lg bg-bolt-elements-background-depth-2 px-3 py-2">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-accent-700 text-white">
          <span className="i-ph:scales text-sm" />
        </span>
        <span className="text-xs text-bolt-elements-textTertiary">Your workspace</span>
      </div>

      <nav className="mt-4 flex flex-col gap-0.5">
        {NAV.map((n) => (
          <a
            key={n.label}
            href={n.href}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary hover:bg-bolt-elements-background-depth-2 transition-theme"
          >
            <span className={`${n.icon} text-lg`} />
            {n.label}
          </a>
        ))}
      </nav>

      <Recents />

      <div className="mt-auto flex flex-col gap-0.5 pt-4 border-t border-bolt-elements-borderColor">
        {FOOTER.map((n) => (
          <a
            key={n.label}
            href={n.href}
            className="rounded-lg px-3 py-2 text-sm text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary hover:bg-bolt-elements-background-depth-2 transition-theme"
          >
            {n.label}
          </a>
        ))}
      </div>
    </aside>
  );
}
