import type { MetaFunction } from '@remix-run/cloudflare';
import { PublicLayout } from '~/components/lawjam/PublicLayout';

export const meta: MetaFunction = () => [
  { title: 'FAQ — LawJam' },
  { name: 'description', content: 'How LawJam works — grounding, jurisdictions, accuracy, and what you can build.' },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: 'Do I need to know how to code?',
    a: 'No. You describe the tool you want in plain English — or start from a template and change it. You never see code or a file tree; you see the working tool.',
  },
  {
    q: 'Does it make up the law?',
    a: 'No — that is the one thing it is built not to do. Tools you build cite live legislation and case law from real sources, and where something depends on a rule, deadline, or authority, it is flagged for you to verify rather than asserted as fact. Grounding over fluency.',
  },
  {
    q: 'Which jurisdictions does it cover?',
    a: 'UK / England & Wales is connected by default (all legislation and judgments, from the Government’s own Lex service). Connect your free CourtListener account for US case law, and other jurisdictions through the legal-data sources in Settings. LawJam builds for whichever jurisdiction your tool targets.',
  },
  {
    q: 'What can I actually build?',
    a: 'Small, working legal tools: a tenancy-agreement checker, a letter-before-action drafter, an NDA review tool, a client-intake triage form, a settlement-letter drafter, a disclosure checklist — and anything else you can describe. Start from a template, then make it yours.',
  },
  {
    q: 'Can I use my existing legal subscriptions?',
    a: 'Where a platform exposes an open connector (MCP), you can connect it in Settings and ground your tools in it. Open sources like UK legislation and CourtListener work today; enterprise platforms depend on their own access terms.',
  },
  {
    q: 'Is this legal advice?',
    a: 'No. LawJam builds assistive drafting and triage tools — starting points for professional review. A qualified solicitor still reviews and signs the work. Every tool it produces makes that clear.',
  },
  {
    q: 'Who is it for?',
    a: 'Practising lawyers — litigation juniors, in-house counsel, small firms — who want to prototype a useful tool quickly without becoming a developer.',
  },
];

export default function FAQ() {
  return (
    <PublicLayout>
      <section className="pt-20 pb-8 max-w-3xl">
        <p className="text-sm text-accent-700 mb-4">FAQ</p>
        <h1 className="text-4xl sm:text-5xl leading-tight tracking-tight">Questions, answered plainly.</h1>
      </section>

      <section className="pb-16 max-w-3xl divide-y divide-black/5">
        {FAQS.map((f) => (
          <div key={f.q} className="py-7">
            <h3 className="text-xl mb-3">{f.q}</h3>
            <p className="text-[#52525B] leading-relaxed">{f.a}</p>
          </div>
        ))}
      </section>

      <section className="pb-20 max-w-3xl">
        <p className="text-[#52525B] mb-4">Still wondering something?</p>
        <a
          href="/app"
          className="inline-block rounded-full bg-accent-700 hover:bg-accent-800 text-white px-6 py-3 transition-colors"
        >
          Start building — see for yourself
        </a>
      </section>
    </PublicLayout>
  );
}
