import type { MetaFunction } from '@remix-run/cloudflare';
import { PublicLayout } from '~/components/lawjam/PublicLayout';
import { LEGAL_MCP_LIBRARY } from '~/lib/lawjam/mcp-library';

export const meta: MetaFunction = () => [
  { title: 'Connectors — LawJam' },
  { name: 'description', content: 'Connect the legal data your tools cite — UK legislation, US case law, and more.' },
];

const authLabel: Record<string, string> = {
  open: 'Open · no account',
  oauth: 'Free account',
  'api-key': 'Free API key',
};

export default function Connectors() {
  return (
    <PublicLayout>
      <section className="pt-20 pb-6 max-w-3xl">
        <p className="text-sm text-accent-700 mb-3">Connectors</p>
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-[-0.02em] mb-4">
          Build from the law you already trust.
        </h1>
        <p className="text-lg text-[#52525B] leading-relaxed">
          Connectors let the tools you build cite live legislation and case law from real sources. UK law is on by
          default; connect the others for the jurisdictions you work in. Manage these any time in the builder under
          Settings → MCP.
        </p>
      </section>

      <section className="pb-24 grid sm:grid-cols-2 gap-4">
        {LEGAL_MCP_LIBRARY.map((s) => (
          <div key={s.id} className="rounded-2xl border border-black/[0.06] bg-[#FCFCFC] p-6 flex flex-col gap-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-base font-semibold">{s.name}</div>
                <div className="text-xs text-[#71717A] mt-0.5">
                  {s.jurisdiction} · {authLabel[s.auth]}
                </div>
              </div>
              {s.autoConnect ? (
                <span className="shrink-0 text-[11px] font-medium rounded-full bg-emerald-50 text-emerald-700 px-2.5 py-1">
                  Enabled
                </span>
              ) : (
                <span className="shrink-0 text-[11px] font-medium rounded-full bg-[#F1F1F0] text-[#52525B] px-2.5 py-1">
                  Connect
                </span>
              )}
            </div>
            <p className="text-sm text-[#52525B] leading-relaxed">{s.description}</p>
            <div className="mt-auto pt-2 border-t border-black/[0.05] text-xs text-[#71717A] leading-relaxed">
              {s.connect}
            </div>
            <div className="text-[11px] text-[#A1A1AA]">{s.licence}</div>
          </div>
        ))}
      </section>

      <section className="pb-24 max-w-3xl">
        <div className="rounded-2xl bg-[#F4F4F3] p-7">
          <div className="text-lg font-semibold mb-1">Missing a source?</div>
          <p className="text-sm text-[#52525B] mb-4">
            LawJam speaks MCP, so any legal-data server you have access to can plug in. Tell us what you need.
          </p>
          <a
            href="/signup"
            className="inline-block rounded-full bg-[#141414] hover:bg-black text-white text-sm px-5 py-2.5 transition-colors"
          >
            Request a connector
          </a>
        </div>
      </section>
    </PublicLayout>
  );
}
