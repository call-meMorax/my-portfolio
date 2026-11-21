# Morax — Portfolio

Personal systems & interfaces — AI agent infrastructure, full-stack web apps, and real-time WebGL experiments. Built end-to-end, shipped to production.

[![Live Demo](https://img.shields.io/badge/demo-live-blue?style=for-the-badge)](https://call-meMorax.github.io/my-portfolio/)
[![GitHub Repo](https://img.shields.io/badge/github-call--meMorax/my--portfolio-black?style=for-the-badge)](https://github.com/call-meMorax/my-portfolio)
[![License: MIT](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)

---

## What This Is

A single-page portfolio built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS**. It serves as a showcase for three practice areas:

- **AI & Systems** — agent runtimes, tool routing, memory layers, job orchestration
- **Full-Stack** — typed APIs, relational schemas, auth flows, deployed React frontends
- **Experiments** — Three.js / WebGL scenes, shader sketches, scroll-driven cinematography

The site uses a **React Three Fiber** WebGL canvas in the hero section (lazy-loaded behind a Suspense boundary so the name and tagline paint first), a custom cursor, a preloader, and a scroll-driven chapter indicator.

---

## Technologies Used

| Layer | Tech | Purpose |
|-------|------|---------|
| Framework | **React 19** (TypeScript) | UI, component model, lazy loading |
| Build tool | **Vite 8** | Dev server, HMR, production bundling |
| Styling | **Tailwind CSS 3** | Utility-first CSS, design tokens |
| 3D / WebGL | **Three.js** + **React Three Fiber** | Hero canvas scene |
| Icons | **lucide-react** | Iconography |
| Utilities | **clsx**, **tailwind-merge** | Conditional class composition |
| Linting | **oxlint** | React purity and ref rules |
| Testing | **Playwright** | Desktop/mobile screenshots, console-error checks |
| Type checking | **TypeScript 7** | `tsc -b` in the build pipeline |
| Hosting | **GitHub Pages** | Free static hosting (GitHub Actions) |

---

## Project Structure

```
my-portfolio/
├── index.html              # Entry HTML with meta tags and preloads
├── vite.config.ts          # Vite config and build settings
├── tailwind.config.js      # Tailwind design tokens and animations
├── postcss.config.js       # PostCSS + Tailwind pipeline
├── tsconfig.json           # TypeScript project references
├── package.json            # Scripts: dev, build, lint, preview
├── .oxlintrc.json          # Oxlint rules
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── main.tsx            # React entry point
│   ├── App.tsx             # Layout: Hero → About → Projects → Skills → Contact
│   ├── index.css           # Base styles + Tailwind directives
│   ├── data/profile.ts     # Single source of truth: bio, skills, projects, socials
│   ├── lib/utils.ts        # cn() class-merge helper
│   ├── components/
│   │   ├── HeroCanvas.tsx      # Lazy-loaded Three.js WebGL scene
│   │   ├── Preloader.tsx       # Entry preloader
│   │   ├── Navbar.tsx          # Top navigation
│   │   ├── CTAButton.tsx       # Primary call-to-action
│   │   ├── ChapterIndicator.tsx# Scroll-driven section indicator
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   ├── SkillsGrid.tsx
│   │   ├── Contact.tsx
│   │   └── CustomCursor.tsx
│   └── components/...      # (see src/components/)
└── tests/
    └── portfolio.spec.ts   # Playwright tests (desktop + mobile screenshots)
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm, pnpm, or yarn

### Install

```bash
git clone https://github.com/call-meMorax/my-portfolio.git
cd my-portfolio
npm install
```

### Develop

```bash
npm run dev
```

Starts the Vite dev server (default port 5173). Open `http://localhost:5173/`.

### Build for Production

```bash
npm run build
```

Runs `tsc -b` for type checking, then `vite build` to output static assets to `dist/`.

### Preview Production Build

```bash
npm run preview
```

Serves the `dist/` directory locally to verify the production build.

### Lint

```bash
npm run lint
```

Runs `oxlint` across the source tree.

### Run Tests

```bash
npx playwright install chromium   # one-time browser install
npm run build                      # tests run against the built dist/
npx playwright test                # desktop + mobile screenshot verification
```

Tests expect the production build served on `http://127.0.0.1:4173/` (`vite preview`).

---

## Hosting on GitHub Pages (Free, Forever)

This repository is configured to host on **GitHub Pages** at no cost:

1. Push to the `master` branch (done — see deployment section below).
2. In the repository settings → **Pages**, set the build source to **GitHub Actions**.
3. The site publishes automatically on every push to `master`.
4. Your live URL: `https://call-meMorax.github.io/my-portfolio/`

GitHub Pages provides free static hosting with a custom domain option, HTTPS, and unlimited bandwidth for public and private repositories alike.

---

## Deployment

The repository has been initialized and pushed to GitHub as a private repository under `call-meMorax/my-portfolio`. GitHub Pages can be enabled from the repository settings to serve the `dist/` output for free.

---

## License

MIT License — see `LICENSE` for details.

---

Built by **Morax** — AI agent infrastructure, full-stack web apps, and real-time WebGL experiments.