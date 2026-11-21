import type { ReactNode } from 'react';
import { cn } from '../lib/utils';

interface CTAButtonProps {
  children: ReactNode;
  /** Renders an <a> when set, otherwise a <button>. */
  href?: string;
  external?: boolean;
  onClick?: () => void;
  variant?: 'md' | 'lg';
  className?: string;
}

/**
 * Signature CTA: a spinning conic-gradient ring clipped to a pill border,
 * amber gradient-text glow and a small hover lift.
 */
export default function CTAButton({
  children,
  href,
  external,
  onClick,
  variant = 'md',
  className,
}: CTAButtonProps) {
  const contentClass = cn(
    'relative flex items-center gap-2 whitespace-nowrap rounded-full bg-[#0d0b16] font-medium tracking-wide text-amber-300',
    'transition-colors duration-300 [text-shadow:0_0_16px_rgba(245,158,11,0.55)] group-hover:text-amber-200',
    variant === 'lg' ? 'px-8 py-3.5 text-base' : 'px-6 py-2.5 text-sm',
  );

  const inner = (
    <>
      {/* oversized rotating conic gradient, clipped by the wrapper's overflow-hidden */}
      <span
        aria-hidden="true"
        className="absolute -left-full -top-full h-[300%] w-[300%] animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(245,158,11,0.95)_45deg,transparent_100deg,transparent_180deg,rgba(34,211,238,0.95)_225deg,transparent_280deg)]"
      />
      <span className={contentClass}>{children}</span>
    </>
  );

  const wrapperClass = cn(
    'group relative inline-flex cursor-pointer overflow-hidden rounded-full p-[1.5px]',
    'shadow-[0_0_0_rgba(245,158,11,0)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(245,158,11,0.25)]',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400',
    className,
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={wrapperClass}
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      >
        {inner}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={wrapperClass}>
      {inner}
    </button>
  );
}
