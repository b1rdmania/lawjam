import type { MetaFunction } from '@remix-run/cloudflare';
import { PublicLayout } from '~/components/lawjam/PublicLayout';

export const meta: MetaFunction = () => [
  { title: 'Examples — LawJam' },
  {
    name: 'description',
    content: 'Real legal tools lawyers build with LawJam — letter before action drafters, NDA issue logs, disclosure builders and more. Start from one.',
  },
];

/**
 * Examples gallery — the proof gallery.
 *
 * The single biggest product risk is a lawyer hitting a blank prompt and
 * bouncing. This page shows concrete, credible legal tools they could build and
 * deep-links each "Start from this" into the builder with a seed prompt.
 *
 * Deep-link IS wired: the home/builder chat reads the `prompt` query param
 * (Chat.client.tsx ~line 181) and auto-submits it. So `/?prompt=<encoded seed>`
 * lands the lawyer in the builder with the tool already being built.
 */

type Example = {
  title: string;
  tag: string;
  description: string;
  /** The seed prompt sent into the builder. Concrete and method-led. */
  seed: string;
};

const EXAMPLES: Example[] = [
  {
    title: 'Letter Before Action drafter',
    tag: 'Litigation',
    description:
      'Generates a pre-action protocol letter from the claim facts — parties, the debt or breach, the remedy sought and a compliant response deadline — flagging where the relevant protocol applies.',
    seed: 'Build a Letter Before Action drafter for England & Wales. It should take the claimant and defendant details, the nature of the claim (debt, breach of contract, or professional negligence), the sum or remedy sought, and the key dates, then produce a Pre-Action Protocol compliant letter with a reasonable response deadline. Flag which Pre-Action Protocol applies and remind the user to check it.',
  },
  {
    title: 'NDA review & issues log',
    tag: 'Contracts',
    description:
      'Reads a non-disclosure agreement and returns a structured issues log — one-sided obligations, missing carve-outs, an unreasonable term length or governing-law gaps — with a suggested redline for each.',
    seed: 'Build an NDA review tool. Let me paste a non-disclosure agreement; it should return a structured issues log covering one-sided confidentiality obligations, missing standard carve-outs (publicly available, independently developed, legally compelled), term length, return/destruction of information, and governing law. For each issue give a severity and a suggested redline. Flag anything that needs a lawyer to confirm.',
  },
  {
    title: 'Tenancy agreement checker',
    tag: 'Property',
    description:
      'Checks an assured shorthold tenancy against the things landlords get wrong — deposit protection, prohibited fees under the Tenant Fees Act, and clauses that fall foul of the unfair-terms rules.',
    seed: 'Build a tenancy agreement checker for an England & Wales assured shorthold tenancy. Let me paste the agreement; it should check for deposit protection and the prescribed information, prohibited payments under the Tenant Fees Act 2019, repairing obligations under section 11 of the Landlord and Tenant Act 1985, and any clauses likely to be unfair terms. Return a checklist with pass/fail and a short note on each.',
  },
  {
    title: 'Disclosure list builder',
    tag: 'Litigation',
    description:
      'Turns a folder of documents into a structured CPR disclosure list — sorting into documents to be disclosed, privileged, and no-longer-in-control — ready for the standard disclosure statement.',
    seed: 'Build a disclosure list builder for civil litigation in England & Wales under CPR Part 31. Let me list documents with a date, description and source; it should sort them into: documents I will disclose and produce, documents I will disclose but claim privilege over (with the privilege ground), and documents once in my control but no longer held. Produce the list in the standard form and remind me of the disclosure statement wording.',
  },
  {
    title: 'Settlement offer letter',
    tag: 'Disputes',
    description:
      'Drafts a settlement or Part 36 offer from the figures — the sum, the terms, the time for acceptance and the costs consequences — with the right without-prejudice or Part 36 labelling.',
    seed: 'Build a settlement offer letter drafter for a civil dispute in England & Wales. Take the offeror and offeree, the sum offered, whether it is a Part 36 offer or an ordinary without-prejudice save as to costs offer, the relevant period for acceptance, and the issues it covers. Produce the letter with correct labelling and a plain explanation of the costs consequences. Flag where Part 36 formalities must be met exactly.',
  },
  {
    title: 'Client intake triage',
    tag: 'Client intake',
    description:
      'A guided intake form that captures the matter, runs a conflict prompt and limitation check, and returns a one-page summary with the next steps and which team should pick it up.',
    seed: 'Build a client intake triage tool for a law firm. Ask the prospective client for their name, the other side, a description of the problem, key dates and what outcome they want. From that, identify the likely area of law, prompt me to run a conflict check, flag any limitation or urgent-deadline risk, and produce a one-page intake summary with suggested next steps and which practice area should handle it.',
  },
  {
    title: 'Without-prejudice letter drafter',
    tag: 'Disputes',
    description:
      'Drafts correspondence aimed at settlement with the privilege correctly engaged — distinguishing genuine without-prejudice from open correspondence and avoiding the common labelling mistakes.',
    seed: 'Build a without-prejudice letter drafter for a dispute in England & Wales. Take the parties, the dispute, the offer or concession being made, and whether costs are reserved. Produce a settlement letter with correct "without prejudice" (or "without prejudice save as to costs") labelling, and explain in a note when the privilege is and is not engaged so I do not mislabel open correspondence.',
  },
  {
    title: 'Contract clause extractor',
    tag: 'Contracts',
    description:
      'Pulls the operative clauses out of a long agreement into a table — term, termination, liability cap, indemnities, governing law and assignment — so you can see the deal terms at a glance.',
    seed: 'Build a contract clause extractor. Let me paste a commercial contract; it should extract the key operative clauses into a table: term and renewal, termination rights, limitation and exclusion of liability (with any cap), indemnities, confidentiality, governing law and jurisdiction, and assignment/change of control. Quote the relevant wording for each and flag any clause that is missing or unusually one-sided.',
  },
  {
    title: 'Statutory deadline calculator',
    tag: 'Litigation',
    description:
      'Works dates forward from a trigger event — limitation periods, time for service, deadlines for a defence or appeal — applying clear-day rules and flagging weekends and court holidays.',
    seed: 'Build a statutory and procedural deadline calculator for England & Wales civil procedure. Take a trigger date and the event (e.g. cause of action accruing, service of a claim form, service of particulars, deemed service), then calculate the relevant deadline — limitation period, time for filing an acknowledgment of service or defence, time for service of the claim form — applying CPR clear-day rules and skipping non-business days. Show the working and warn me to verify the limitation position.',
  },
  {
    title: 'Bundle index generator',
    tag: 'Litigation',
    description:
      'Builds a paginated hearing-bundle index from a document list — sectioned into pleadings, witness statements, expert reports and correspondence — in the format the court expects.',
    seed: 'Build a hearing bundle index generator for England & Wales civil proceedings. Let me list documents with a description and date; it should organise them into the standard bundle sections (claim and statements of case, case management orders, witness statements, expert reports, disclosure, and correspondence), put them in date order within each section, assign tab and page references, and output a clean index ready to paginate. Remind me of the court bundle requirements.',
  },
];

function Card({ ex }: { ex: Example }) {
  return (
    <div className="group flex flex-col rounded-2xl bg-[#F4F4F3] border border-black/5 p-6 transition-colors hover:border-black/10">
      <span className="self-start text-[11px] font-semibold uppercase tracking-[0.12em] text-accent-700 mb-3">
        {ex.tag}
      </span>
      <h3 className="text-xl font-bold tracking-[-0.01em] leading-snug mb-2">{ex.title}</h3>
      <p className="text-sm text-[#52525B] leading-relaxed flex-1">{ex.description}</p>
      <a
        href={`/?prompt=${encodeURIComponent(ex.seed)}`}
        className="mt-5 inline-flex items-center self-start text-sm font-semibold text-accent-700 hover:text-accent transition-colors"
      >
        Start from this →
      </a>
    </div>
  );
}

export default function Examples() {
  return (
    <PublicLayout>
      <section className="pt-20 pb-10 max-w-3xl">
        <p className="text-sm text-accent-700 mb-4">Examples</p>
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight mb-6">
          What lawyers build with LawJam
        </h1>
        <p className="text-lg text-[#52525B] leading-relaxed">
          Real legal tools, built by describing them — no code. Start from any of these and change anything in plain
          English. Each one is a working draft aid; a qualified lawyer still signs the work.
        </p>
      </section>

      <section className="pb-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {EXAMPLES.map((ex) => (
          <Card key={ex.title} ex={ex} />
        ))}
      </section>

      <section className="py-12 max-w-3xl border-t border-black/5">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.02em] leading-tight">
          Have something else in mind?
        </h2>
        <p className="mt-4 text-[#52525B] leading-relaxed">
          These are starting points, not the limit. Open the builder and describe the tool you need.
        </p>
        <a
          href="/"
          className="inline-block mt-6 rounded-full bg-[#141414] hover:bg-black text-white px-6 py-3 transition-colors"
        >
          Open the builder
        </a>
      </section>
    </PublicLayout>
  );
}
