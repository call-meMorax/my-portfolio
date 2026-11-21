import { chapters } from '../data/profile';
import { cn } from '../lib/utils';

interface SectionHeadingProps {
  chapterId: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

/** Shared section header: numbered chapter kicker in the chapter colour + serif title. */
export default function SectionHeading({
  chapterId,
  title,
  description,
  align = 'left',
}: SectionHeadingProps) {
  const index = chapters.findIndex((c) => c.id === chapterId);
  const chapter = chapters[index] ?? chapters[0];
  if (!chapter) return null;

  return (
    <div className={cn('mb-12 md:mb-16', align === 'center' && 'text-center')}>
      <p
        className="mb-4 font-mono text-[11px] uppercase tracking-[0.35em]"
        style={{ color: chapter.color, textShadow: `0 0 18px ${chapter.color}55` }}
      >
        {String(index + 1).padStart(2, '0')} — {chapter.label}
      </p>
      <h2 className="font-display text-4xl font-semibold leading-tight text-white md:text-5xl">{title}</h2>
      {description && (
        <p className={cn('mt-5 max-w-2xl leading-relaxed text-white/50', align === 'center' && 'mx-auto')}>
          {description}
        </p>
      )}
    </div>
  );
}
