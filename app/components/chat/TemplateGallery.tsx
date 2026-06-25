import React from 'react';
import { LAWJAM_DESIGN_SYSTEMS } from '~/lib/lawjam/templates';

/**
 * LawJam design-system gallery — the on-ramp.
 *
 * Pick a LOOK (a coherent design system), then describe the tool in chat and
 * it's built to that look — like bolt's pre-loaded design systems. Chosen by
 * appearance via the colour swatch on each card.
 */
export function TemplateGallery(sendMessage?: {
  (event: React.UIEvent, messageInput?: string): void | undefined;
}) {
  return (
    <div id="template-gallery" className="w-full max-w-3xl mx-auto mt-2">
      <p className="text-center text-sm text-bolt-elements-textSecondary mb-4">
        Pick a design system — then describe the tool you want.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {LAWJAM_DESIGN_SYSTEMS.map((d) => (
          <button
            key={d.id}
            onClick={(event) => sendMessage?.(event, d.prompt)}
            className="group text-left rounded-2xl border border-transparent bg-bolt-elements-background-depth-2 hover:border-accent-500/40 hover:shadow-sm transition-theme overflow-hidden flex flex-col"
          >
            {/* visual preview — the look, as a swatch */}
            <div className="flex h-16 w-full" style={{ backgroundColor: d.swatch[0] }}>
              <div className="flex items-end gap-1.5 p-3 w-full">
                <div className="h-2 w-12 rounded-full" style={{ backgroundColor: d.swatch[1] }} />
                <div className="h-2 w-6 rounded-full" style={{ backgroundColor: d.swatch[2] }} />
              </div>
            </div>
            <div className="p-4 flex flex-col gap-1.5">
              <div className="text-base font-semibold text-bolt-elements-textPrimary">{d.name}</div>
              <div className="text-xs text-bolt-elements-textSecondary leading-relaxed">{d.blurb}</div>
            </div>
          </button>
        ))}
      </div>
      <p className="text-center text-xs text-bolt-elements-textSecondary mt-4">
        …or just describe what you need in the box above.
      </p>
    </div>
  );
}
