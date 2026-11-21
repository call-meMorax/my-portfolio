import { useEffect, useState } from 'react';
import { chapters } from '../data/profile';

/**
 * Fixed bottom-left "current chapter" readout in monospace, e.g. `01 — HERO`.
 * IntersectionObserver watches each section; the accent colour comes from
 * profile.chapters so it shifts as the user scrolls.
 */
export default function ChapterIndicator() {
  const [activeId, setActiveId] = useState<string>(chapters[0]?.id ?? 'hero');

  useEffect(() => {
    const sections = chapters
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    // a narrow band around the vertical centre of the viewport decides
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: '-42% 0px -52% 0px', threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const index = Math.max(
    chapters.findIndex((c) => c.id === activeId),
    0,
  );
  const chapter = chapters[index] ?? chapters[0];
  if (!chapter) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed bottom-6 left-6 z-40 hidden items-center gap-3 font-mono text-[11px] md:flex"
    >
      <span className="tabular-nums" style={{ color: chapter.color }}>
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className="flex items-center gap-1.5">
        {chapters.map((c) => (
          <span
            key={c.id}
            className="h-1 rounded-full transition-all duration-500"
            style={{
              width: c.id === chapter.id ? '18px' : '5px',
              backgroundColor: c.id === chapter.id ? c.color : 'rgba(255,255,255,0.2)',
            }}
          />
        ))}
      </span>
      <span
        className="uppercase tracking-[0.3em] transition-colors duration-500"
        style={{ color: chapter.color, textShadow: `0 0 16px ${chapter.color}66` }}
      >
        {chapter.label}
      </span>
    </div>
  );
}
