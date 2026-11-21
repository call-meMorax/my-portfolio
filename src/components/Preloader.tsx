import { useEffect, useRef, useState } from 'react';

interface PreloaderProps {
  /** Called once the curtain has finished fading — the parent then unmounts us. */
  onDone: () => void;
}

const PHASES = [
  { at: 0, label: 'BOOT' },
  { at: 18, label: 'SHADERS' },
  { at: 36, label: 'GEOMETRY' },
  { at: 54, label: 'PARTICLES' },
  { at: 72, label: 'SCENE' },
  { at: 92, label: 'READY' },
] as const;

const DURATION_MS = 2000;
const HOLD_MS = 300;
const FADE_MS = 700;

/**
 * Full-screen obsidian curtain with a tabular monospace counter 0→100 and a
 * grid of boot-phase rows. Fades out, then hands control back via onDone.
 */
export default function Preloader({ onDone }: PreloaderProps) {
  const [count, setCount] = useState(0);
  const [fading, setFading] = useState(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    let raf = 0;
    let fadeTimer = 0;
    let doneTimer = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION_MS, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
        return;
      }
      fadeTimer = window.setTimeout(() => setFading(true), HOLD_MS);
      doneTimer = window.setTimeout(() => onDoneRef.current(), HOLD_MS + FADE_MS);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(fadeTimer);
      window.clearTimeout(doneTimer);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-obsidian transition-opacity duration-700 ease-out ${
        fading ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      {/* corner chrome */}
      <span className="absolute left-6 top-6 font-mono text-[10px] tracking-[0.35em] text-white/40">
        MORAX://PORTFOLIO
      </span>
      <span className="absolute right-6 top-6 font-mono text-[10px] tracking-[0.35em] text-white/40">
        OBSIDIAN
      </span>
      <span className="absolute bottom-6 left-6 font-mono text-[10px] tracking-[0.35em] text-white/40">
        INITIALIZING INTERFACE
      </span>
      <span className="absolute bottom-6 right-6 font-mono text-[10px] tabular-nums tracking-[0.35em] text-amber-500/80">
        {String(count).padStart(3, '0')}%
      </span>

      {/* big tabular counter */}
      <p className="bg-gradient-to-br from-amber-300 via-amber-400 to-cyan-400 bg-clip-text font-mono text-7xl tabular-nums text-transparent [text-shadow:0_0_60px_rgba(245,158,11,0.25)] md:text-8xl">
        {count}
        <span className="text-3xl text-white/30 md:text-4xl">/100</span>
      </p>

      {/* boot-phase rows */}
      <div className="mt-10 grid w-[min(420px,84vw)] grid-cols-1">
        {PHASES.map((phase, i) => {
          const next = PHASES[i + 1];
          const done = count >= (next ? next.at : 101);
          const active = !done && count >= phase.at;
          return (
            <div
              key={phase.label}
              className="flex items-center justify-between border-b border-white/5 py-2 font-mono text-[11px] last:border-b-0"
            >
              <span className="flex items-center gap-3">
                <span className="tabular-nums text-white/25">{String(i + 1).padStart(2, '0')}</span>
                <span className={done ? 'text-amber-300/90' : active ? 'text-cyan-300' : 'text-white/30'}>
                  {phase.label}
                </span>
              </span>
              <span className={done ? 'text-amber-400/80' : active ? 'animate-pulse-dot text-cyan-400' : 'text-white/20'}>
                {done ? 'OK' : active ? 'RUNNING' : 'QUEUED'}
              </span>
            </div>
          );
        })}
      </div>

      {/* progress line */}
      <div className="absolute bottom-0 left-0 h-px w-full bg-white/10">
        <div
          className="h-full bg-gradient-to-r from-amber-500 to-cyan-400 transition-[width] duration-150 ease-out"
          style={{ width: `${count}%` }}
        />
      </div>
    </div>
  );
}
