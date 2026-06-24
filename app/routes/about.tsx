import type { MetaFunction } from '@remix-run/cloudflare';
import { PublicLayout, H } from '~/components/lawjam/PublicLayout';

export const meta: MetaFunction = () => [
  { title: 'About — LawJam' },
  { name: 'description', content: 'LawJam lets lawyers build working legal tools by describing them. No code, grounded in real law.' },
];

export default function About() {
  return (
    <PublicLayout>
      <section className="pt-20 pb-12 max-w-3xl">
        <p className="text-sm text-accent-700 mb-4">About</p>
        <h1 className="text-4xl sm:text-5xl leading-tight tracking-tight mb-6">
          Lawyers are already experimenting. They just don't have the right tool.
        </h1>
        <p className="text-lg text-[#52525B] leading-relaxed">
          The curious ones are building little tools today — in Replit, in a Claude chat. But those tools assume you can
          code, or evaporate the moment the conversation ends. So the lawyers who'd get the most from this are the ones
          who can't reach it. That's the gap LawJam closes.
        </p>
      </section>

      <section className="py-12 grid sm:grid-cols-2 gap-10 max-w-4xl">
        <div>
          <H>Describe it. Don't build it.</H>
          <p className="mt-4 text-[#52525B] leading-relaxed">
            Start from a template — the pattern you already know from Word and PowerPoint — then change anything in plain
            English. No blank canvas, no file tree, no code to read. The working tool appears as you describe it.
          </p>
        </div>
        <div>
          <H>Grounded in real law.</H>
          <p className="mt-4 text-[#52525B] leading-relaxed">
            Tools you build cite live legislation and case law — UK law from the Government's own data, US case law from
            CourtListener — not a model's memory. Where something needs a lawyer's eye, it's flagged to verify, never
            asserted as settled.
          </p>
        </div>
        <div>
          <H>Built on real method.</H>
          <p className="mt-4 text-[#52525B] leading-relaxed">
            Underneath sits a library of practitioner-authored skills — the working method a good lawyer actually uses,
            with the rules a generic prompt misses. The tool you build inherits that, not a guess.
          </p>
        </div>
        <div>
          <H>An assistant, not a replacement.</H>
          <p className="mt-4 text-[#52525B] leading-relaxed">
            LawJam builds drafting and triage aids. They're starting points for professional review — a qualified
            solicitor still signs the work. We make that boundary plain in everything it produces.
          </p>
        </div>
      </section>

      <section className="py-16 max-w-3xl">
        <H>Build a legal tool. Just describe it.</H>
        <a
          href="/app"
          className="inline-block mt-6 rounded-full bg-accent-700 hover:bg-accent-800 text-white px-6 py-3 transition-colors"
        >
          Start building
        </a>
      </section>
    </PublicLayout>
  );
}
