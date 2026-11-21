import { useEffect, useState } from 'react';
import { BrainCircuit, Code2, Server, Wrench } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { skills } from '../data/profile';
import SectionHeading from './SectionHeading';

const CATEGORY_STYLE: Record<string, { Icon: LucideIcon; color: string }> = {
  Frontend: { Icon: Code2, color: '#f59e0b' },
  Backend: { Icon: Server, color: '#06b6d4' },
  'AI & Systems': { Icon: BrainCircuit, color: '#ec4899' },
  Infrastructure: { Icon: Wrench, color: '#a855f7' },
};
const FALLBACK_STYLE = { Icon: Wrench, color: '#94a3b8' };

/** Interactive skill cards with category-tinted glow and animated level bars. */
export default function SkillsGrid() {
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setArmed(true), 150);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className="mx-auto w-full max-w-6xl px-6">
      <SectionHeading
        chapterId="skills"
        title="Toolbox"
        description="Self-assessed, honestly weighted. Hover a card to feel the edge."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((skill, i) => {
          const { Icon, color } = CATEGORY_STYLE[skill.category ?? ''] ?? FALLBACK_STYLE;
          return (
            <div
              key={skill.name}
              style={{ animationDelay: `${i * 60}ms` }}
              className="group relative flex animate-fade-up flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.07]"
            >
              {/* hover glow tinted by category */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-25"
                style={{ backgroundColor: color }}
              />

              <div className="flex items-start justify-between gap-3">
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-xl border"
                  style={{ color, borderColor: `${color}44`, backgroundColor: `${color}0d` }}
                >
                  <Icon size={17} />
                </span>
                <span className="font-mono text-sm tabular-nums text-white/40 transition-colors duration-300 group-hover:text-white/80">
                  {skill.level}
                </span>
              </div>

              <h3 className="mt-4 text-sm font-medium text-white/90">{skill.name}</h3>
              {skill.category && (
                <p
                  className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em]"
                  style={{ color: `${color}aa` }}
                >
                  {skill.category}
                </p>
              )}

              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full transition-[width] duration-1000 ease-out"
                  style={{
                    width: armed ? `${skill.level}%` : '0%',
                    background: `linear-gradient(90deg, ${color}55, ${color})`,
                    boxShadow: `0 0 14px ${color}66`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
