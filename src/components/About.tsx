import { Cpu, Globe, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { bio, displayName } from '../data/profile';
import SectionHeading from './SectionHeading';

const HIGHLIGHTS: Array<{ Icon: LucideIcon; title: string; body: string }> = [
  {
    Icon: Cpu,
    title: 'AI-native systems',
    body: 'Agent runtimes, tool routing and memory layers designed to run for days without hand-holding.',
  },
  {
    Icon: Globe,
    title: 'Web with depth',
    body: 'Real-time 3D, shaders and motion — interfaces that respond like physical objects.',
  },
  {
    Icon: Sparkles,
    title: 'Product instinct',
    body: 'Small, sharp surfaces: every pixel and every millisecond argued for, then earned.',
  },
];

const STATS: Array<[string, string]> = [
  ['STACK', 'TS · PY · R3F'],
  ['MODE', 'DEEP WORK'],
  ['STATUS', 'OPEN TO BUILD'],
];

/** About section: bio + stats on the left, terminal card on the right. */
export default function About() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6">
      <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading chapterId="about" title="The operator behind the machines" />
          <p className="whitespace-pre-line leading-relaxed text-white/55">{bio}</p>
          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 font-mono text-xs">
            {STATS.map(([key, value]) => (
              <div key={key}>
                <dt className="tracking-[0.3em] text-white/30">{key}</dt>
                <dd className="mt-1.5 tracking-[0.2em] text-cyan-300/90">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* terminal card */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/50 shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/5 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-rose-500/70" />
            <span className="h-3 w-3 rounded-full bg-amber-400/70" />
            <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
            <span className="ml-3 font-mono text-xs text-white/40">
              {displayName.toLowerCase()}@portfolio: ~
            </span>
          </div>
          <div className="p-5 font-mono text-[13px] leading-7 md:p-6">
            <p>
              <span className="text-amber-400">$</span> <span className="text-white/85">whoami</span>
            </p>
            <p className="text-cyan-300/90">{displayName.toLowerCase()} — agent infra × web systems</p>
            <p className="mt-3">
              <span className="text-amber-400">$</span> <span className="text-white/85">cat focus.txt</span>
            </p>
            <p className="text-white/55">llm orchestration · real-time 3d · product craft</p>
            <p className="mt-3">
              <span className="text-amber-400">$</span> <span className="text-white/85">uptime</span>
            </p>
            <p className="text-white/55">
              building continuously <span className="animate-pulse-dot text-emerald-400">▮</span>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {HIGHLIGHTS.map(({ Icon, title, body }) => (
          <div
            key={title}
            className="group rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/[0.07]"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/5 text-cyan-300 transition-shadow duration-300 group-hover:shadow-[0_0_24px_rgba(6,182,212,0.25)]">
              <Icon size={18} />
            </span>
            <h3 className="mt-4 font-display text-lg font-medium text-white">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/50">{body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
