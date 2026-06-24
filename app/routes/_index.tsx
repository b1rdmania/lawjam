import type { MetaFunction } from '@remix-run/cloudflare';
import { PublicLayout, H } from '~/components/lawjam/PublicLayout';
import { LAWJAM_TEMPLATES } from '~/lib/lawjam/templates';

export const meta: MetaFunction = () => [
  { title: 'LawJam — build a legal tool. Just describe it.' },
  {
    name: 'description',
    content:
      'LawJam lets lawyers build working legal tools by describing them — no code, grounded in real law. Start from a template and make it yours.',
  },
];

const STEPS = [
  {
    n: '1',
    title: 'Pick a template',
    body: 'Start from a working legal tool — the way you start a document in Word. No blank box, no spec to write.',
  },
  {
    n: '2',
    title: 'Describe your changes',
    body: 'Say what you want different in plain English. Point at part of the tool and change it. No code, ever.',
  },
  {
    n: '3',
    title: 'It builds — grounded in real law',
    body: 'The working tool appears as you talk, citing live legislation and case law. Anything to check is flagged, not faked.',
  },
];

export default function Landing() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="pt-24 pb-16 max-w-3xl">
        <h1 className="lj-serif text-5xl sm:text-6xl leading-[1.05] tracking-tight mb-6">
          Build a legal tool.
          <br />
          Just describe it.
        </h1>
        <p className="text-xl text-[#4A4A48] leading-relaxed mb-9 max-w-2xl">
          LawJam turns a plain-English idea into a working legal web tool — grounded in real law, no code required. For
          the lawyers already experimenting, finally built for them.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="/app"
            className="rounded-full bg-accent-700 hover:bg-accent-800 text-white px-6 py-3 transition-colors"
          >
            Start building
          </a>
          <a href="#how" className="text-[#4A4A48] hover:text-[#1A1A1A] px-2 py-3 transition-colors">
            See how it works →
          </a>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-16 scroll-mt-20">
        <H className="mb-10">How it works</H>
        <div className="grid sm:grid-cols-3 gap-6">
          {STEPS.map((s) => (
            <div key={s.n} className="rounded-2xl bg-[#F5F3F0] p-6">
              <div className="lj-serif text-2xl text-accent-700 mb-3">{s.n}</div>
              <div className="lj-serif text-lg mb-2">{s.title}</div>
              <p className="text-sm text-[#4A4A48] leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What you can build */}
      <section className="py-16">
        <H className="mb-3">Start from a template</H>
        <p className="text-[#4A4A48] mb-8 max-w-2xl">Working tools, ready to make yours — then change anything in plain English.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {LAWJAM_TEMPLATES.map((t) => (
            <a
              key={t.id}
              href="/app"
              className="group rounded-2xl bg-[#F5F3F0] hover:shadow-sm border border-transparent hover:border-accent-500/30 transition p-5 flex flex-col gap-2.5"
            >
              <div className="flex items-center justify-between">
                <span className={`${t.icon} text-2xl text-accent-700`} />
                <span className="text-[11px] text-[#6B6B68]">{t.jurisdiction}</span>
              </div>
              <div className="lj-serif text-base mt-1">{t.name}</div>
              <div className="text-xs text-[#6B6B68] leading-relaxed">{t.blurb}</div>
            </a>
          ))}
        </div>
      </section>

      {/* Grounding / credibility */}
      <section className="py-16 max-w-3xl">
        <H className="mb-4">It doesn't make up the law.</H>
        <p className="text-lg text-[#4A4A48] leading-relaxed">
          The one thing it's built not to do. Tools you build cite live legislation and case law from real sources — UK
          law from the Government's own data, US case law from CourtListener — and flag anything that needs a solicitor's
          eye, rather than asserting it. Grounding over fluency. An assistive tool, not legal advice.
        </p>
      </section>

      {/* Final CTA */}
      <section className="py-16 max-w-3xl">
        <H className="mb-6">Build your first tool in minutes.</H>
        <div className="flex items-center gap-4">
          <a href="/app" className="rounded-full bg-accent-700 hover:bg-accent-800 text-white px-6 py-3 transition-colors">
            Start building
          </a>
          <a href="/signup" className="text-[#4A4A48] hover:text-[#1A1A1A] px-2 py-3 transition-colors">
            Request early access
          </a>
        </div>
      </section>
    </PublicLayout>
  );
}
