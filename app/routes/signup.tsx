import type { MetaFunction } from '@remix-run/cloudflare';
import { useState } from 'react';
import { PublicLayout } from '~/components/lawjam/PublicLayout';

export const meta: MetaFunction = () => [
  { title: 'Start building — LawJam' },
  { name: 'description', content: 'Get early access to LawJam — build legal tools by describing them.' },
];

const field =
  'w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-[#1A1A1A] placeholder-[#9A9A96] focus:outline-none focus:border-accent-600 transition-colors';

export default function Signup() {
  // NOTE: client-side only for now — needs a backend (or a form service) to actually capture sign-ups.
  const [submitted, setSubmitted] = useState(false);

  return (
    <PublicLayout>
      <section className="pt-20 pb-20 max-w-xl">
        <p className="text-sm text-accent-700 mb-4">Early access</p>
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight mb-4">Start building.</h1>
        <p className="text-lg text-[#52525B] leading-relaxed mb-10">
          Tell us a little about your work and we’ll get you in. No code, grounded in real law, your first tool in
          minutes.
        </p>

        {submitted ? (
          <div className="rounded-2xl bg-[#F4F4F3] p-8">
            <h2 className="text-2xl mb-2">You’re on the list.</h2>
            <p className="text-[#52525B]">
              We’ll be in touch shortly. In the meantime, you can open the builder and try a template.
            </p>
            <a
              href="/"
              className="inline-block mt-5 rounded-full bg-[#141414] hover:bg-black text-white px-5 py-2.5 transition-colors"
            >
              Open the builder
            </a>
          </div>
        ) : (
          <form
            className="rounded-2xl bg-[#F4F4F3] p-8 flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <input className={field} name="name" placeholder="Your name" required />
              <input className={field} type="email" name="email" placeholder="Work email" required />
            </div>
            <input className={field} name="firm" placeholder="Firm or organisation (optional)" />
            <select className={field} name="role" defaultValue="">
              <option value="" disabled>
                Your role
              </option>
              <option>Litigation / disputes</option>
              <option>In-house counsel</option>
              <option>Private practice — other</option>
              <option>Legal operations / innovation</option>
              <option>Other</option>
            </select>
            <textarea
              className={`${field} min-h-[96px] resize-y`}
              name="idea"
              placeholder="What's the first tool you'd want to build? (optional)"
            />
            <button
              type="submit"
              className="mt-1 rounded-full bg-[#141414] hover:bg-black text-white px-6 py-3 transition-colors self-start"
            >
              Request access
            </button>
            <p className="text-xs text-[#9A9A96]">Assistive legal tooling — a qualified solicitor reviews the work.</p>
          </form>
        )}
      </section>
    </PublicLayout>
  );
}
