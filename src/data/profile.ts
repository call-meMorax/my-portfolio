// ─── Single source of truth for every editable string on the page ───────────
// PRIVACY RULE: never place private IPs, .ts.net hosts, Telegram handles,
// personal emails, API keys or tokens in this file. Only public handles
// (e.g. the GitHub username below) are allowed.

export type ProjectCategory = 'AI & Systems' | 'Full-Stack' | 'Experiments';

export interface Skill {
  name: string;
  /** 0–100 */
  level: number;
  category?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link?: string;
  demo?: string;
  category: ProjectCategory;
}

export interface Chapter {
  id: string;
  label: string;
  color: string;
}

export interface Socials {
  github: string;
  twitter?: string;
  linkedin?: string;
}

export const displayName = 'Morax';

export const tagline =
  'AI agent infrastructure, full-stack web apps and real-time WebGL experiments — built end-to-end, shipped to production.';

export const bio = [
  "I'm Morax — a builder working the seam between AI infrastructure and the modern web.",
  'Most of my time goes into agent runtimes: tool routing, memory layers, job orchestration and the observability needed to trust autonomous systems. The rest goes into interfaces — real-time 3D, motion and typography that make software feel physical.',
  'I like small, sharp systems that ship: typed end-to-end, observable in production, and pleasant to use at 2 a.m.',
].join('\n\n');

export const github = 'call-meMorax';

export const skills: Skill[] = [
  { name: 'TypeScript / React', level: 92, category: 'Frontend' },
  { name: 'Three.js / WebGL', level: 80, category: 'Frontend' },
  { name: 'Node.js', level: 86, category: 'Backend' },
  { name: 'Python', level: 88, category: 'Backend' },
  { name: 'LLM Agent Orchestration', level: 90, category: 'AI & Systems' },
  { name: 'RAG & Vector Pipelines', level: 82, category: 'AI & Systems' },
  { name: 'PostgreSQL / Redis', level: 78, category: 'Infrastructure' },
  { name: 'Docker / CI', level: 75, category: 'Infrastructure' },
];

export const featured: Project[] = [
  {
    id: 'ai-agent-infrastructure',
    title: 'AI Agent Infrastructure',
    description:
      'A multi-agent runtime built to run unattended: capability-scoped tool routing, layered memory, durable job queues and full observability — so autonomous LLM agents recover gracefully instead of failing silently.',
    tech: ['TypeScript', 'Node.js', 'LLM Orchestration', 'Redis'],
    link: 'https://github.com/call-meMorax',
    category: 'AI & Systems',
  },
  {
    id: 'full-stack-web-apps',
    title: 'Full-Stack Web Apps',
    description:
      'End-to-end product builds: typed APIs, relational schemas, auth flows and polished React frontends — taken from an empty repo to a deployed, observable production application.',
    tech: ['React', 'Vite', 'Node.js', 'PostgreSQL'],
    link: 'https://github.com/call-meMorax',
    category: 'Full-Stack',
  },
  {
    id: 'webgl-experiments',
    title: 'WebGL Experiments',
    description:
      'Interactive Three.js scenes and shader sketches — particle fields, wireframe geometry and scroll-driven cinematography that treat the browser as a creative medium.',
    tech: ['Three.js', 'React Three Fiber', 'GLSL'],
    link: 'https://github.com/call-meMorax',
    category: 'Experiments',
  },
];

export const socials: Socials = {
  github: 'https://github.com/call-meMorax',
};

export const chapters: Chapter[] = [
  { id: 'hero', label: 'Hero', color: '#f59e0b' },
  { id: 'about', label: 'About', color: '#06b6d4' },
  { id: 'projects', label: 'Projects', color: '#ec4899' },
  { id: 'skills', label: 'Skills', color: '#a855f7' },
  { id: 'contact', label: 'Contact', color: '#f43f5e' },
];
