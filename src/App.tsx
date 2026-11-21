import { lazy, Suspense, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';

// Three.js (~1 MB) is the heaviest dependency on the page — load it lazily so
// the name, tagline and CTAs paint first while the scene streams in.
const HeroCanvas = lazy(() => import('./components/HeroCanvas'));
import CTAButton from './components/CTAButton';
import ChapterIndicator from './components/ChapterIndicator';
import About from './components/About';
import Projects from './components/Projects';
import SkillsGrid from './components/SkillsGrid';
import Contact from './components/Contact';
import { displayName, tagline } from './data/profile';
import { cn } from './lib/utils';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-obsidian text-slate-200">
      {/* preloader is mounted first and removed from the DOM once finished */}
      {!loaded && <Preloader onDone={() => setLoaded(true)} />}

      <CustomCursor />
      <Navbar />

      <main>
        {/* ── 01 · HERO ──────────────────────────────────────────────── */}
        <section
          id="hero"
          className="relative flex min-h-screen items-center justify-center overflow-hidden"
        >
          {/* WebGL scene streams in after first paint; the glow keeps the
              composition readable while the chunk loads */}
          <Suspense
            fallback={
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.10),transparent_60%)]"
              />
            }
          >
            <HeroCanvas />
          </Suspense>

          {/* overlay content — passthrough to the canvas except on the CTAs */}
          <div className="pointer-events-none relative z-10 flex flex-col items-center px-6 pb-16 text-center">
            <p
              className={cn(
                'font-mono text-[11px] uppercase tracking-[0.4em] text-amber-300/90',
                loaded && 'animate-fade-up',
              )}
              style={{ animationDelay: '80ms' }}
            >
              Personal systems &amp; interfaces
            </p>
            <h1
              className={cn(
                'mt-6 font-display text-6xl font-semibold leading-none text-white md:text-8xl',
                loaded && 'animate-fade-up',
              )}
              style={{ animationDelay: '200ms', textShadow: '0 0 60px rgba(245,158,11,0.2)' }}
            >
              {displayName}
            </h1>
            <p
              className={cn(
                'mt-6 max-w-xl text-balance text-sm leading-relaxed text-white/55 md:text-base',
                loaded && 'animate-fade-up',
              )}
              style={{ animationDelay: '340ms' }}
            >
              {tagline}
            </p>
            <div
              className={cn(
                'pointer-events-auto mt-10 flex flex-wrap items-center justify-center gap-4',
                loaded && 'animate-fade-up',
              )}
              style={{ animationDelay: '480ms' }}
            >
              <CTAButton href="#projects" variant="lg">
                View Projects
              </CTAButton>
              <a
                href="#about"
                className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-sm text-white/70 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/40 hover:text-cyan-300"
              >
                About Me
                <ArrowDown size={15} className="transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* scroll hint */}
          <div aria-hidden="true" className="pointer-events-none absolute bottom-7 left-1/2 z-10 -translate-x-1/2">
            <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1.5">
              <span className="h-1.5 w-1 animate-bounce rounded-full bg-amber-400" />
            </div>
          </div>
        </section>

        {/* ── 02 · ABOUT ─────────────────────────────────────────────── */}
        <section id="about" className="scroll-mt-28 py-24 md:py-32">
          <About />
        </section>

        {/* ── 03 · PROJECTS ──────────────────────────────────────────── */}
        <section id="projects" className="scroll-mt-28 py-24 md:py-32">
          <Projects />
        </section>

        {/* ── 04 · SKILLS ────────────────────────────────────────────── */}
        <section id="skills" className="scroll-mt-28 py-24 md:py-32">
          <SkillsGrid />
        </section>

        {/* ── 05 · CONTACT ───────────────────────────────────────────── */}
        <section id="contact" className="relative scroll-mt-28 py-24 md:py-32">
          <Contact />
        </section>
      </main>

      <footer className="border-t border-white/5 py-8 text-center font-mono text-[11px] tracking-wider text-white/30">
        © {new Date().getFullYear()} {displayName} — React · Three.js · Tailwind. All systems nominal.
      </footer>

      <ChapterIndicator />
    </div>
  );
}
