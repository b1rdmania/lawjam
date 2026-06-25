import type { MetaFunction } from '@remix-run/cloudflare';
import { PublicLayout } from '~/components/lawjam/PublicLayout';
import { LEGAL_MCP_LIBRARY, type LegalMcpSource, type McpStatus } from '~/lib/lawjam/mcp-library';

export const meta: MetaFunction = () => [
  { title: 'Connectors — LawJam' },
  { name: 'description', content: 'Connect the legal data your tools cite — UK legislation, US case law, and more.' },
];

const authLabel: Record<string, string> = {
  open: 'Open · no account',
  oauth: 'Free account',
  'api-key': 'Free API key',
  subscription: 'Your subscription',
  none: 'No account',
};

type StatusMeta = {
  pill: string;
  /** true = oxblood accent pill (enabled/available), false = muted grey. */
  accent: boolean;
  heading: string;
  blurb: string;
};

const STATUS_META: Record<McpStatus, StatusMeta> = {
  live: {
    pill: 'Available',
    accent: true,
    heading: 'Connect today',
    blurb: 'Live sources you can switch on now. UK case law is on by default.',
  },
  'on-request': {
    pill: 'On request',
    accent: false,
    heading: 'Bring what your firm already pays for',
    blurb: 'Real services we wire up per firm via MCP. Your licence and data stay yours.',
  },
  roadmap: {
    pill: 'Coming soon',
    accent: false,
    heading: 'On the roadmap',
    blurb: 'Not available yet. We won’t claim an integration we can’t deliver.',
  },
};

const STATUS_ORDER: McpStatus[] = ['live', 'on-request', 'roadmap'];

function StatusPill({ status }: { status: McpStatus }) {
  const meta = STATUS_META[status];
  return (
    <span
      className={
        'shrink-0 text-[11px] font-medium rounded-full px-2.5 py-1 ' +
        (meta.accent ? 'bg-accent/[0.08] text-accent-700' : 'bg-[#F1F1F0] text-[#71717A]')
      }
    >
      {meta.pill}
    </span>
  );
}

function ConnectorCard({ s }: { s: LegalMcpSource }) {
  return (
    <div className="rounded-2xl border border-black/[0.06] bg-[#FCFCFC] p-6 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-base font-semibold leading-snug">{s.name}</div>
          <div className="text-xs text-[#71717A] mt-1">
            {s.jurisdiction} · {authLabel[s.auth]}
          </div>
        </div>
        <StatusPill status={s.status} />
      </div>

      <p className="text-sm text-[#3F3F46] leading-relaxed font-medium">{s.gives}</p>
      <p className="text-sm text-[#52525B] leading-relaxed">{s.description}</p>

      <div className="mt-auto pt-3 border-t border-black/[0.05] text-xs text-[#71717A] leading-relaxed">
        {s.connect}
      </div>
      <div className="text-[11px] text-[#A1A1AA]">{s.licence}</div>
    </div>
  );
}

export default function Connectors() {
  return (
    <PublicLayout>
      <section className="pt-20 pb-8 max-w-3xl">
        <p className="text-sm text-accent-700 mb-3">Connectors</p>
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-[-0.02em] mb-4">
          Build from the law you already trust.
        </h1>
        <p className="text-lg text-[#52525B] leading-relaxed">
          LawJam ships with UK case law on by default. From there, connect the legal services your firm already pays
          for — case-law subscriptions, your document store, the jurisdictions you work in. It all runs over MCP, so a
          tool you build can cite live, current law instead of whatever the model half-remembers.
        </p>
        <p className="text-sm text-[#71717A] leading-relaxed mt-4">
          Manage every connector in the builder under Settings → MCP. Where it says “on request” or “coming soon”, that
          is honest — we don’t claim an integration we can’t deliver.
        </p>
      </section>

      {STATUS_ORDER.map((status) => {
        const sources = LEGAL_MCP_LIBRARY.filter((s) => s.status === status);
        if (sources.length === 0) {
          return null;
        }
        const meta = STATUS_META[status];
        return (
          <section key={status} className="pb-12">
            <div className="max-w-3xl mb-5">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold tracking-[-0.01em]">{meta.heading}</h2>
                <StatusPill status={status} />
              </div>
              <p className="text-sm text-[#71717A] leading-relaxed mt-1.5">{meta.blurb}</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {sources.map((s) => (
                <ConnectorCard key={s.id} s={s} />
              ))}
            </div>
          </section>
        );
      })}

      <section className="pb-24 pt-4 max-w-3xl">
        <div className="rounded-2xl bg-[#F4F4F3] p-7">
          <div className="text-lg font-semibold mb-1">Missing a source?</div>
          <p className="text-sm text-[#52525B] mb-4">
            LawJam speaks MCP, so any legal-data server or subscription you have access to can plug in. Tell us what your
            firm runs on and we’ll wire it up.
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
