import { Link } from '@remix-run/react';
import type { ReactNode } from 'react';

/**
 * LawJam public surface layout — home / about / FAQ / sign up.
 * House style (DESIGN.md, modelled on Sana AI): warm paper, near-monochrome,
 * one oxblood accent, Newsreader serif headings + Hanken Grotesk UI, generous
 * whitespace, soft rounded cards. Calm and credible — no gimmicks.
 */

const NAV = [
  { label: 'Examples', href: '/examples' },
  { label: 'Connectors', href: '/connectors' },
  { label: 'FAQ', href: '/faq' },
  { label: 'About', href: '/about' },
];

export function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-full bg-[#FFFFFF] text-[#1A1A1A] font-[Hanken_Grotesk,ui-sans-serif,system-ui]">
      <header className="sticky top-0 z-10 bg-[#FFFFFF]/85 backdrop-blur border-b border-black/5">
        <div className="mx-auto max-w-5xl px-6 h-16 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold tracking-[-0.02em]">
            <span>Law</span>
            <span className="text-accent-700">Jam</span>
          </Link>
          <nav className="hidden sm:flex items-center gap-7 text-sm text-[#52525B]">
            {NAV.map((n) => (
              <a key={n.label} href={n.href} className="hover:text-[#1A1A1A] transition-colors">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-sm text-[#52525B] hover:text-[#1A1A1A]">
              Sign in
            </Link>
            <Link
              to="/"
              className="text-sm rounded-full bg-[#141414] hover:bg-black text-white px-4 py-2 transition-colors"
            >
              Start building
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6">{children}</main>

      <footer className="mt-24 border-t border-black/5">
        <div className="mx-auto max-w-5xl px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-[#71717A]">
          <div className="text-lg text-[#1A1A1A]">
            Law<span className="text-accent-700">Jam</span>
          </div>
          <nav className="flex flex-wrap items-center gap-6">
            <Link to="/about" className="hover:text-[#1A1A1A]">About</Link>
            <Link to="/faq" className="hover:text-[#1A1A1A]">FAQ</Link>
            <Link to="/security" className="hover:text-[#1A1A1A]">Security</Link>
            <Link to="/signup" className="hover:text-[#1A1A1A]">Sign up</Link>
            <Link to="/" className="hover:text-[#1A1A1A]">Open the builder</Link>
          </nav>
          <div>Build a legal tool. Just describe it.</div>
        </div>
      </footer>
    </div>
  );
}

/** Section heading — Sana-style: clean sans, BOLD, large, tight tracking. */
export function H({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <h2 className={`text-3xl sm:text-4xl font-bold tracking-[-0.02em] leading-tight ${className}`}>{children}</h2>;
}
