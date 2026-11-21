import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, ExternalLink, GitBranch, X } from 'lucide-react';
import { featured, github as githubUser } from '../data/profile';
import type { Project, ProjectCategory } from '../data/profile';
import SectionHeading from './SectionHeading';
import { cn } from '../lib/utils';

const FILTERS = ['All', 'AI & Systems', 'Full-Stack', 'Experiments'] as const;
type Filter = (typeof FILTERS)[number];

const CATEGORY_COLOR: Record<ProjectCategory, string> = {
  'AI & Systems': '#f59e0b',
  'Full-Stack': '#06b6d4',
  Experiments: '#ec4899',
};

interface LiveRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics?: string[];
  fork?: boolean;
}

function TechTags({ tags }: { tags: string[] }) {
  const shown = tags.slice(0, 4);
  const rest = tags.length - shown.length;
  return (
    <div className="mt-4 flex flex-wrap gap-1.5">
      {shown.map((t) => (
        <span
          key={t}
          className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] text-white/45"
        >
          {t}
        </span>
      ))}
      {rest > 0 && <span className="px-1 py-1 font-mono text-[10px] text-white/30">+{rest}</span>}
    </div>
  );
}

/**
 * Showcase grid: curated featured projects + a live sync of the latest
 * public GitHub repos. On rate-limit/offline the curated set is kept quietly.
 */
export default function Projects() {
  const [filter, setFilter] = useState<Filter>('All');
  const [live, setLive] = useState<LiveRepo[]>([]);
  const [liveDown, setLiveDown] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  // Live GitHub repos — API is the explicitly allowed external endpoint.
  useEffect(() => {
    const controller = new AbortController();
    fetch(`https://api.github.com/users/${githubUser}/repos?sort=updated&per_page=6`, {
      signal: controller.signal,
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`github ${res.status}`);
        return res.json() as Promise<LiveRepo[]>;
      })
      .then((repos) => {
        if (controller.signal.aborted) return;
        setLive(repos.filter((r) => !r.fork));
      })
      .catch(() => {
        if (!controller.signal.aborted) setLiveDown(true);
      });
    return () => controller.abort();
  }, []);

  const liveProjects = useMemo<Project[]>(
    () =>
      live.map((r) => ({
        id: `gh-${r.id}`,
        title: r.name.replace(/[-_]+/g, ' '),
        description: r.description ?? 'Latest public repository — details live on GitHub.',
        tech: [r.language, ...(r.topics ?? [])]
          .filter((t): t is string => Boolean(t))
          .slice(0, 5),
        link: r.html_url,
        demo: r.homepage || undefined,
        category: 'Experiments' as const,
      })),
    [live],
  );

  const all = useMemo(() => [...featured, ...liveProjects], [liveProjects]);
  const shown = filter === 'All' ? all : all.filter((p) => p.category === filter);

  // native <dialog> open/close driven by selection state
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (selected && !dialog.open) dialog.showModal();
    if (!selected && dialog.open) dialog.close();
  }, [selected]);

  return (
    <div className="mx-auto w-full max-w-6xl px-6">
      <SectionHeading
        chapterId="projects"
        title="Selected work"
        description="Curated builds plus a live sync of my latest public repositories. Click any card for the full brief."
      />

      {/* filter pills */}
      <div className="mb-10 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const active = f === filter;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                'rounded-full border px-4 py-1.5 font-mono text-[11px] tracking-wider transition-all duration-300',
                active
                  ? 'border-pink-400/60 bg-pink-400/10 text-pink-300 shadow-[0_0_20px_rgba(236,72,153,0.15)]'
                  : 'border-white/10 bg-white/[0.03] text-white/45 hover:border-white/25 hover:text-white/80',
              )}
            >
              {f.toUpperCase()}
            </button>
          );
        })}
        {liveDown && (
          <span className="ml-auto self-center font-mono text-[10px] tracking-wider text-white/25">
            LIVE SYNC OFFLINE — CURATED SET SHOWN
          </span>
        )}
      </div>

      {/* cards */}
      <div key={filter} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p, i) => {
          const isLive = p.id.startsWith('gh-');
          const color = CATEGORY_COLOR[p.category];
          return (
            <article
              key={p.id}
              role="button"
              tabIndex={0}
              onClick={() => setSelected(p)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelected(p);
                }
              }}
              style={{ animationDelay: `${i * 70}ms` }}
              className="group flex animate-fade-up cursor-pointer flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.07] hover:shadow-[0_24px_70px_rgba(0,0,0,0.5)]"
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  className="rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-wider"
                  style={{ color, borderColor: `${color}55`, backgroundColor: `${color}11` }}
                >
                  {p.category.toUpperCase()}
                </span>
                {isLive && (
                  <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-wider text-emerald-400/90">
                    <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-emerald-400" />
                    LIVE
                  </span>
                )}
              </div>

              <h3 className="mt-4 font-display text-xl font-medium text-white transition-colors duration-300 group-hover:text-amber-200">
                {p.title}
              </h3>
              <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-white/50">{p.description}</p>
              <TechTags tags={p.tech} />

              <div className="mt-5 flex items-center gap-2 pt-1 font-mono text-[10px] tracking-[0.25em] text-white/35 transition-colors duration-300 group-hover:text-amber-300">
                VIEW
                <ArrowUpRight
                  size={13}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </div>
            </article>
          );
        })}
      </div>

      {/* project detail modal */}
      <dialog
        ref={dialogRef}
        onClose={() => setSelected(null)}
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current?.close();
        }}
        className="relative m-auto w-[min(560px,92vw)] rounded-2xl border border-white/15 bg-[#0d0b16] p-8 text-white shadow-[0_40px_120px_rgba(0,0,0,0.7)]"
      >
        {selected && (
          <div>
            <button
              type="button"
              aria-label="Close details"
              onClick={() => dialogRef.current?.close()}
              className="absolute right-5 top-5 rounded-full p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X size={16} />
            </button>
            <span
              className="rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-wider"
              style={{
                color: CATEGORY_COLOR[selected.category],
                borderColor: `${CATEGORY_COLOR[selected.category]}55`,
                backgroundColor: `${CATEGORY_COLOR[selected.category]}11`,
              }}
            >
              {selected.category.toUpperCase()}
            </span>
            <h3 className="mt-4 font-display text-2xl font-medium text-white md:text-3xl">
              {selected.title}
            </h3>
            <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-white/60">
              {selected.description}
            </p>
            <TechTags tags={selected.tech} />
            <div className="mt-8 flex flex-wrap gap-3">
              {selected.link && (
                <a
                  href={selected.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/85 transition-colors duration-300 hover:border-amber-400/60 hover:text-amber-300"
                >
                  <GitBranch size={15} />
                  GitHub Repository
                </a>
              )}
              {selected.demo && (
                <a
                  href={selected.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/85 transition-colors duration-300 hover:border-cyan-400/60 hover:text-cyan-300"
                >
                  <ExternalLink size={15} />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
