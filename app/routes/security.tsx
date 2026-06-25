import type { MetaFunction } from '@remix-run/cloudflare';
import { PublicLayout, H } from '~/components/lawjam/PublicLayout';

export const meta: MetaFunction = () => [
  { title: 'Trust & security — LawJam' },
  {
    name: 'description',
    content:
      'How LawJam handles your key, your work, and your matter content — and what we are honest about not yet having.',
  },
];

const POSTURE: { title: string; body: string }[] = [
  {
    title: 'Your key, your cost',
    body: 'Model access is bring-your-own — you supply your own Anthropic key. In the current build, no model key is stored on our servers.',
  },
  {
    title: 'Not trained on your work',
    body: 'Your prompts and the tools you build are not used to train models. What you make here is yours.',
  },
  {
    title: 'Matter content stays yours',
    body: 'Tools and their data live in your browser or your own deployment. Matter content is not persisted on our servers.',
  },
  {
    title: 'Grounded, not guessed',
    body: 'Tools cite real legislation and case law from live sources, and flag anything that needs checking. LawJam is built not to fabricate law.',
  },
  {
    title: 'Assistive, not advice',
    body: 'LawJam builds drafting and triage aids. A qualified solicitor reviews and signs the work — and every tool it produces says so.',
  },
];

export default function Security() {
  return (
    <PublicLayout>
      <section className="pt-20 pb-12 max-w-3xl">
        <p className="text-sm text-accent-700 mb-4">Trust & security</p>
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-[-0.02em] mb-6">
          Built for work you can stand behind.
        </h1>
        <p className="text-lg text-[#52525B] leading-relaxed">
          Lawyers carry the consequences of what they sign. So we keep the posture simple and honest: your key, your
          work, and your matter content stay with you — and the tools you build are grounded in real law, never guessed.
        </p>
      </section>

      <section className="py-12 grid sm:grid-cols-2 gap-6 max-w-4xl">
        {POSTURE.map((p) => (
          <div key={p.title} className="bg-[#F4F4F3] rounded-2xl p-7">
            <H className="!text-2xl sm:!text-2xl">{p.title}</H>
            <p className="mt-3 text-[#52525B] leading-relaxed">{p.body}</p>
          </div>
        ))}
      </section>

      <section className="py-12 max-w-3xl">
        <div className="bg-[#F4F4F3] rounded-3xl p-8">
          <H>Honest about what we don't have yet</H>
          <p className="mt-4 text-[#52525B] leading-relaxed">
            We have no formal certifications today. Independent attestations like SOC 2 and ISO 27001 are on the
            roadmap, not yet in place. We would rather state our posture plainly than imply assurances we haven't earned.
          </p>
        </div>
      </section>

      <section className="py-16 max-w-3xl">
        <H>Build a legal tool you can stand behind.</H>
        <a
          href="/"
          className="inline-block mt-6 rounded-full bg-[#141414] hover:bg-black text-white px-6 py-3 transition-colors"
        >
          Start building
        </a>
      </section>
    </PublicLayout>
  );
}
