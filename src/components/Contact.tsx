import { ArrowUpRight, AtSign, Briefcase, GitBranch } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { github, socials } from '../data/profile';
import CTAButton from './CTAButton';
import SectionHeading from './SectionHeading';

interface SocialLink {
  label: string;
  href: string;
  Icon: LucideIcon;
}

function buildSocialLinks(): SocialLink[] {
  const links: SocialLink[] = [{ label: 'GitHub', href: socials.github, Icon: GitBranch }];
  if (socials.twitter) links.push({ label: 'Twitter', href: socials.twitter, Icon: AtSign });
  if (socials.linkedin) links.push({ label: 'LinkedIn', href: socials.linkedin, Icon: Briefcase });
  return links;
}

/** Contact / socials section — public handles only, no emails or phones. */
export default function Contact() {
  const socialLinks = buildSocialLinks();

  return (
    <div className="relative mx-auto w-full max-w-4xl px-6 text-center">
      {/* ambient glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-500/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/4 top-1/3 h-64 w-64 animate-spin-slow rounded-full border border-dashed border-rose-400/10"
      />

      <SectionHeading
        chapterId="contact"
        title="Open a channel"
        description="No forms, no tracking — the fastest route to me is GitHub: issues, discussions or a plain hello."
        align="center"
      />

      <h3 className="font-display text-3xl font-semibold text-white md:text-4xl">
        Let&apos;s build something <span className="text-glow-amber text-amber-300">improbable</span>.
      </h3>
      <p className="mx-auto mt-5 max-w-xl leading-relaxed text-white/50">
        Currently open to interesting systems work — agent infrastructure, real-time web, and the odd
        WebGL fever dream.
      </p>

      <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
        <CTAButton href={socials.github} external variant="lg">
          Find me on GitHub
          <ArrowUpRight size={17} />
        </CTAButton>
        <div className="flex items-center gap-2">
          {socialLinks.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-400/50 hover:text-amber-300"
            >
              <Icon size={17} />
            </a>
          ))}
        </div>
      </div>

      <p className="mt-8 font-mono text-[11px] tracking-[0.3em] text-white/30">@{github}</p>
    </div>
  );
}