import React, { useEffect, useState } from 'react';

/**
 * LawJam dark full-screen landing hero.
 *
 * A self-contained FIXED overlay that sits on top of the empty-state chat surface
 * while `!chatStarted`. Pills are the starter prompts — clicking one calls
 * `onPick(seedPrompt)` which starts a real build (chatStarted flips → hero gone).
 * The primary pill / nav CTA call `onDismiss()` to reveal the chat box underneath.
 *
 * Faithful to the approved dark comp (lawjam-landing-comp.html), substituting the
 * already-loaded Hanken Grotesk for the comp's flaky web-font.
 */

const INK = '#0E0D0C';
const PAPER = '#F5F3EE';
const OXBLOOD = '#76232F';
const MUTED = 'rgba(245,243,238,0.55)';
const LINE = 'rgba(245,243,238,0.16)';

const HEADLINE = 'Describe a legal tool. Get a working one.';

interface Pill {
  label: string;
  prompt: string;
}

const PILLS: Pill[] = [
  {
    label: 'Draft a letter before action',
    prompt:
      'Build a Letter Before Action drafter for an unpaid invoice (England & Wales), grounded in the correct pre-action protocol. Single self-contained tool.',
  },
  {
    label: 'Review an NDA',
    prompt:
      'Build an NDA review tool that triages an NDA as green / amber / red against standard positions and lists the issues to fix. Single self-contained tool.',
  },
  {
    label: 'Build a disclosure list',
    prompt:
      'Build a CPR Part 31 disclosure list builder for a civil claim in England & Wales. Single self-contained tool.',
  },
  {
    label: 'Triage a new client',
    prompt: 'Build a multi-step client intake and triage form for a new legal matter. Single self-contained tool.',
  },
];

interface LawJamHeroProps {
  visible: boolean;
  onPick: (prompt: string) => void;
  onDismiss: () => void;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);

    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener?.('change', handler);

    return () => mq.removeEventListener?.('change', handler);
  }, []);

  return reduced;
}

export function LawJamHero({ visible, onPick, onDismiss }: LawJamHeroProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [typed, setTyped] = useState('');
  const [typingDone, setTypingDone] = useState(false);
  const [pillsIn, setPillsIn] = useState(false);

  useEffect(() => {
    if (!visible) {
      return undefined;
    }

    if (reducedMotion) {
      setTyped(HEADLINE);
      setTypingDone(true);
      setPillsIn(true);
      return undefined;
    }

    // reset on (re)show
    setTyped('');
    setTypingDone(false);
    setPillsIn(false);

    const timers: ReturnType<typeof setTimeout>[] = [];

    timers.push(
      setTimeout(() => setPillsIn(true), 450),
    );

    let i = 0;
    const tick = () => {
      if (i <= HEADLINE.length) {
        setTyped(HEADLINE.slice(0, i));
        i += 1;
        timers.push(setTimeout(tick, 42));
      } else {
        setTypingDone(true);
      }
    };
    timers.push(setTimeout(tick, 500));

    return () => timers.forEach(clearTimeout);
  }, [visible, reducedMotion]);

  if (!visible) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[60] overflow-hidden"
      style={{ background: INK, color: PAPER, fontFamily: '"Hanken Grotesk", sans-serif' }}
    >
      {/* faint oxblood vignette top-right + soft glow bottom-left + a cool rim-light
          behind the robot so its near-black silhouette separates from the bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(120% 90% at 80% 16%, rgba(118,35,47,0.22) 0%, rgba(118,35,47,0) 52%), radial-gradient(55% 70% at 80% 58%, rgba(245,243,238,0.06) 0%, rgba(245,243,238,0) 60%), radial-gradient(100% 80% at 10% 100%, rgba(245,243,238,0.05) 0%, rgba(245,243,238,0) 50%)',
        }}
      />

      {/* Robot — a shadowy suited figure with glowing red eyes on the right.
          Its body is near-black so it reads as a presence in the dark, not a cutout.
          Left edge masked to fade into the hero; hidden on mobile to never crowd the text. */}
      <img
        src="/lawjam-robot.png"
        alt=""
        aria-hidden="true"
        className="hidden md:block absolute bottom-0 right-0 z-0 pointer-events-none select-none"
        style={{
          height: '96%',
          width: 'auto',
          objectFit: 'contain',
          objectPosition: 'bottom right',
          opacity: 0.95,
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.35) 24%, #000 58%)',
          maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.35) 24%, #000 58%)',
        }}
      />

      {/* NAV */}
      <nav className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 sm:px-10 py-5">
        <div className="flex items-baseline gap-2.5">
          <span className="text-2xl font-semibold tracking-[-0.02em]" style={{ color: PAPER }}>
            LawJam
          </span>
          <span className="text-2xl" style={{ color: OXBLOOD, userSelect: 'none' }}>
            §
          </span>
        </div>
        <div className="hidden sm:flex gap-7 text-base">
          {[
            { label: 'Examples', href: '/examples' },
            { label: 'Connectors', href: '/connectors' },
            { label: 'About', href: '/about' },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="transition-colors hover:!text-[#F5F3EE]"
              style={{ color: MUTED, textDecoration: 'none' }}
            >
              {l.label}
            </a>
          ))}
        </div>
        <button
          type="button"
          onClick={onDismiss}
          className="text-base"
          style={{ color: PAPER, textDecoration: 'underline', textUnderlineOffset: '3px' }}
        >
          Open the builder
        </button>
      </nav>

      {/* HERO */}
      <section className="relative z-[1] h-screen w-full flex flex-col justify-center px-6 sm:px-12 lg:px-20">
        <div className="max-w-[720px]">
          <div
            className="text-[15px] uppercase mb-6"
            style={{ letterSpacing: '0.14em', color: MUTED }}
          >
            LawJam — legal tools, built from a sentence
          </div>

          <p
            className="font-semibold mb-[18px]"
            style={{
              fontSize: 'clamp(28px, 4vw, 46px)',
              lineHeight: 1.18,
              letterSpacing: '-0.015em',
              minHeight: '1.18em',
            }}
          >
            <span>{typed}</span>
            <span
              aria-hidden="true"
              className="inline-block align-[-0.06em] ml-1"
              style={{
                width: '3px',
                height: '0.92em',
                background: OXBLOOD,
                display: typingDone ? 'none' : 'inline-block',
                animation: 'lawjam-blink 1s step-end infinite',
              }}
            />
          </p>

          <p
            className="mb-[38px]"
            style={{ fontSize: 'clamp(16px, 1.5vw, 19px)', color: MUTED, lineHeight: 1.5, maxWidth: '560px' }}
          >
            Describe what you need in plain English. LawJam builds a working tool — grounded in real UK law, not
            guesses. No code.
          </p>

          <div
            className="flex flex-wrap gap-2.5"
            style={{
              opacity: pillsIn ? 1 : 0,
              transform: pillsIn ? 'none' : 'translateY(10px)',
              transition: 'opacity .5s ease, transform .5s ease',
            }}
          >
            {PILLS.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => onPick(p.prompt)}
                className="lawjam-pill inline-flex items-center gap-2 whitespace-nowrap rounded-full text-[15px]"
                style={{
                  padding: '9px 18px',
                  border: `1px solid ${LINE}`,
                  background: 'rgba(245,243,238,0.06)',
                  color: PAPER,
                  transition: 'all .18s ease',
                }}
              >
                <span
                  className="inline-block rounded-full"
                  style={{ width: '5px', height: '5px', background: OXBLOOD }}
                />
                {p.label}
              </button>
            ))}
            <button
              type="button"
              onClick={onDismiss}
              className="lawjam-pill-primary inline-flex items-center gap-2 whitespace-nowrap rounded-full text-[15px] font-semibold"
              style={{
                padding: '9px 18px',
                border: `1px solid ${OXBLOOD}`,
                background: OXBLOOD,
                color: PAPER,
                transition: 'all .18s ease',
              }}
            >
              Describe your own →
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER trust line */}
      <div
        className="absolute bottom-6 left-6 right-6 sm:left-12 sm:right-12 lg:left-20 lg:right-20 z-[5] flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between items-start sm:items-center pt-4"
        style={{ fontSize: '13px', color: MUTED, borderTop: `1px solid ${LINE}` }}
      >
        <span className="inline-flex items-center gap-2">
          <span className="inline-block rounded-full" style={{ width: '6px', height: '6px', background: OXBLOOD }} />
          Grounded in real UK case law &amp; legislation via Lex
        </span>
        <span>Built on Claude · your matter data stays yours</span>
      </div>

      <style>{`
        @keyframes lawjam-blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        .lawjam-pill:hover { background: ${PAPER} !important; color: ${INK} !important; border-color: ${PAPER} !important; }
        .lawjam-pill-primary:hover { background: #8a2a38 !important; }
      `}</style>
    </div>
  );
}

export default LawJamHero;
