import React from 'react';
import { LAWJAM_TEMPLATES } from '~/lib/lawjam/templates';

/**
 * LawJam template gallery — the on-ramp.
 *
 * "Choose a template" is a pattern every lawyer already knows from Word /
 * PowerPoint, so it needs no learning. Pick a working legal tool, then customise
 * it in plain English — never face a blank box. Each card seeds a rich prompt.
 */
export function TemplateGallery(sendMessage?: {
  (event: React.UIEvent, messageInput?: string): void | undefined;
}) {
  return (
    <div id="template-gallery" className="w-full max-w-3xl mx-auto mt-2">
      <p className="text-center text-sm text-bolt-elements-textSecondary mb-4">
        Pick a design — then describe your legal content into it.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {LAWJAM_TEMPLATES.map((t) => (
          <button
            key={t.id}
            onClick={(event) => sendMessage?.(event, t.prompt)}
            className="group text-left rounded-2xl border border-transparent bg-bolt-elements-background-depth-2 hover:border-accent-500/40 hover:shadow-sm transition-theme p-5 flex flex-col gap-2.5"
          >
            <div className="flex items-center justify-between">
              <span className={`${t.icon} text-2xl text-accent-600`} />
              <span className="text-[11px] text-bolt-elements-textSecondary">{t.tag}</span>
            </div>
            <div className="text-base font-medium text-bolt-elements-textPrimary leading-snug mt-1">{t.name}</div>
            <div className="text-xs text-bolt-elements-textSecondary leading-relaxed">{t.blurb}</div>
          </button>
        ))}
      </div>
      <p className="text-center text-xs text-bolt-elements-textSecondary mt-4">
        …or just describe what you need in the box above.
      </p>
    </div>
  );
}
