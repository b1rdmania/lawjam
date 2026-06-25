/**
 * LawJam persistent left rail (Lovable/Sana-style).
 *
 * Always-visible nav for the builder. bolt's own slide-out Menu (chat history,
 * settings) stays available via the header toggle; this rail is the calm,
 * persistent primary nav + brand.
 */

const NAV = [
  { label: 'New chat', href: '/', icon: 'i-ph:plus' },
  { label: 'My tools', href: '/tools', icon: 'i-ph:squares-four' },
  { label: 'Designs', href: '/#template-gallery', icon: 'i-ph:palette' },
  { label: 'Connectors', href: '/connectors', icon: 'i-ph:plugs-connected' },
];

const FOOTER = [
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
];

export function LawJamRail() {
  return (
    <aside className="hidden lg:flex shrink-0 w-[248px] h-full flex-col border-r border-bolt-elements-borderColor bg-bolt-elements-background-depth-1 px-3 py-4">
      <a href="/" className="px-3 py-2 text-2xl font-bold tracking-[-0.02em] text-bolt-elements-textPrimary">
        Law<span className="text-accent">Jam</span>
      </a>

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
