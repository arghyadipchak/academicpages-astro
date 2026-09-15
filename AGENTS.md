# Academic Pages Astro Agent Guide 🚀

Guidelines and runbook for AI coding assistants (Antigravity, Cursor, Claude Code, GitHub Copilot, Codex) working on this repository.

---

## Repository Overview

`academicpages-astro` is a modern, high-performance academic portfolio template built with **Astro 7 + TypeScript + Tailwind CSS v4**. It serves as a modern drop-in replacement for the classic Jekyll-based AcademicPages.

### Template Usage & Contributions

- **Template Repositories**: Users typically generate their personal site via GitHub's "Use this template" feature
- **Personal Websites**: When customizing a user's personal website, AI coding assistants must **never** submit a pull request back to the template repository (`academicpages-astro` or upstream `academicpages.github.io`)
- **Template Contributions**: Pull requests to `academicpages-astro` must only be for template-level improvements (bug fixes, framework upgrades, accessibility enhancements, performance optimizations)
- **Preserve Footer Attribution**: The footer credit link in `src/components/Footer.astro` linking back to `academicpages-astro` (`https://github.com/arghyadipchak/academicpages-astro`) and upstream sources must **never** be removed, commented out, or hidden during personalization, redesigns, or automated refactoring

---

## Tech Stack & Architecture

- **Framework**: Astro 7+ (Static Site Generation mode)
- **Styling**: Tailwind CSS v4 with `@theme` design tokens and `@tailwindcss/typography`
- **Content**: Astro Content Collections (`src/content.config.ts`) with strict Zod schema validation
- **Math**: Server-side KaTeX rendering (`remark-math` + `rehype-katex`)
- **Icons**: `astro-icon` with FontAwesome 6 brands/solid and Academicons
- **Search**: Fast client-side modal search (`Cmd+K` / `Ctrl+K`) powered by `/api/search.json`
- **Quality Gates**: ESLint 9 Flat Config, Prettier with Tailwind class sorter, TypeScript strict mode, and Playwright automated tests

---

## Directory Structure

```
academicpages-astro/
├── src/
│   ├── components/         # UI components (Masthead, Footer, AuthorProfile, ActionBadges, etc.)
│   ├── content/            # Markdown content collections
│   │   ├── blog/           # Blog posts
│   │   ├── pages/          # Static markdown pages (terms, sitemap, markdown guide)
│   │   ├── portfolio/      # Project and research portfolio items
│   │   ├── publications/   # Academic papers, preprints, journal articles, books
│   │   ├── talks/          # Conference talks, tutorials, presentations
│   │   └── teaching/       # Courses and teaching materials
│   ├── data/
│   │   ├── navigation.ts   # Top navigation bar links
│   │   └── siteConfig.ts   # Author profile, site title, links, and category definitions
│   ├── layouts/            # BaseLayout, SingleLayout, ArchiveLayout
│   ├── pages/              # Astro routing pages (/cv, /publications, /talks, /posts, etc.)
│   └── styles/
│       └── global.css      # Design tokens, themes, and global prose styling
├── public/                 # Static downloads, PDFs, slides, and avatar images
├── tests/                  # Playwright end-to-end browser test suite
└── .agents/
    └── skills/             # Antigravity & AI assistant skills
```

---

## Customization & Documentation References

When personalizing a user's website, managing academic content collections, or configuring deployments, follow the canonical guides:

- **Setup & Cleanup Roadmap**: [`docs/CHECKLIST.md`](file:///docs/CHECKLIST.md) (itemized checklist covering profile personalization, demo content purge, asset cleanup, and test retirement)
- **Site & Deployment Configuration**: [`docs/CONFIG.md`](file:///docs/CONFIG.md) (complete reference for `siteConfig.ts`, 50+ academic/social handles, `navigation.ts`, base URL resolution, and redirect management)
- **Content Collections & Formatting**: [`docs/CONTENT.md`](file:///docs/CONTENT.md) (Zod frontmatter schemas, file naming conventions, KaTeX math authoring, 1-click BibTeX, and action badges)
- **Markdown & Mathematical Typesetting**: [`docs/MARKDOWN.md`](file:///docs/MARKDOWN.md) (comprehensive syntax reference for KaTeX math equations, tables, alert callouts, and Mermaid diagrams)
- **AI Customization Skill**: [`.agents/skills/customization/SKILL.md`](file:///file:///.agents/skills/customization/SKILL.md) (operational runbook for AI coding assistants orchestrating discovery and setup)

---

## Formatting & Code Style Rules

- **No Trailing Periods**: Never end single lines, bullet points, table cell descriptions, or standalone list items with a period
- **Canonical Tailwind v4 Syntax**: Use `border-(--global-border-color)`, `bg-(--global-base-color)`, `text-(--global-text-color)` instead of `[var(--...)]`
- **Semantic HTML**: Maintain landmarks (`<header>`, `<main>`, `<nav>`, `<footer>`, `<aside>`, `<article>`)
- **Strict Typing**: All components and helpers must pass TypeScript type checks with zero errors

---

## Verification & Quality Gates

Run these commands before committing any changes:

```bash
# Format code
pnpm format

# Run code quality verification (lint, format:check, typecheck)
pnpm verify

# Build static production site
pnpm build

# Run automated browser tests
pnpm test
```
