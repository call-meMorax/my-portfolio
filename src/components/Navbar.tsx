import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { chapters, displayName } from '../data/profile';
import CTAButton from './CTAButton';
import { cn } from '../lib/utils';

/**
 * Fixed floating frosted-glass navbar. Blur/border strengthen on scroll;
 * section links smooth-scroll via CSS `scroll-behavior` + `scroll-mt`.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav
        className={cn(
          'mx-auto flex max-w-4xl items-center justify-between gap-4 rounded-2xl border px-4 py-2.5 transition-all duration-500 md:rounded-full md:px-5',
          scrolled
            ? 'border-white/20 bg-white/[0.09] shadow-[0_12px_48px_rgba(0,0,0,0.5)] backdrop-blur-2xl'
            : 'border-white/10 bg-white/5 backdrop-blur-xl',
        )}
      >
        <a href="#hero" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.9)]" />
          <span className="font-mono text-sm tracking-[0.25em] text-white/90">
            {displayName.toUpperCase()}
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {chapters.map((c) => (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                className="group flex items-center gap-2 rounded-full px-3 py-1.5 text-sm text-white/60 transition-colors duration-300 hover:bg-white/5 hover:text-white"
              >
                <span
                  className="h-1 w-1 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ backgroundColor: c.color }}
                />
                {c.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <CTAButton href="#contact">Contact Me</CTAButton>
        </div>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white md:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* mobile panel */}
      <div
        className={cn(
          'mx-auto mt-2 max-w-4xl overflow-hidden rounded-2xl border bg-[#0d0b16]/95 backdrop-blur-xl transition-all duration-300 md:hidden',
          open ? 'max-h-96 border-white/10 opacity-100' : 'pointer-events-none max-h-0 border-transparent opacity-0',
        )}
      >
        <ul className="flex flex-col gap-1 p-3">
          {chapters.map((c, i) => (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
              >
                {c.label}
                <span className="font-mono text-[10px]" style={{ color: c.color }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </a>
            </li>
          ))}
          <li className="px-1 pb-1 pt-2">
            <CTAButton href="#contact" className="w-full justify-center" onClick={() => setOpen(false)}>
              Contact Me
            </CTAButton>
          </li>
        </ul>
      </div>
    </header>
  );
}
