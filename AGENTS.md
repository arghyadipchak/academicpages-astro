# Academic Pages Astro Agent Guide 🚀

Guidelines and runbook for AI coding assistants (Antigravity, Cursor, Claude Code, GitHub Copilot, Codex) working on this repository.

---

## Repository Overview

`academicpages-astro` is a modern, high-performance academic portfolio template built with **Astro 7 + TypeScript + Tailwind CSS v4**. It serves as a modern drop-in replacement for the classic Jekyll-based AcademicPages.

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

## Common Customization & Setup Workflows

### 1. Setting Up Site Identity & Author Profile

Edit [`src/data/siteConfig.ts`](file:///src/data/siteConfig.ts):

- Update `name`, `title`, `description`, `url`, `repository`
- Set `author.name`, `author.avatar`, `author.bio`, `author.location`, `author.employer`
- Add academic and social links (`googlescholar`, `orcid`, `github`, `linkedin`, plus 50+ supported platforms)

### 2. GitHub Pages Deployment: Base URL Configuration

- **User / Organization Site** (`https://<username>.github.io`):
  - `src/data/siteConfig.ts`: `url: 'https://<username>.github.io'`, `baseurl: ''`
- **Project Site** (`https://<username>.github.io/<repo-name>`):
  - `src/data/siteConfig.ts`: `url: 'https://<username>.github.io/<repo-name>'`, `baseurl: '/<repo-name>'`
- **Dynamic CI Auto-Detection**:
  - `astro.config.ts` dynamically resolves `site` and `base` from `ASTRO_SITE` and `ASTRO_BASE` injected by GitHub Actions (`actions/configure-pages`)
  - Internal assets, navigation links, and API endpoints must be wrapped using `resolveUrl` from `src/utils/url.ts` to ensure compatibility across root domains and repository subpaths

### 3. Customizing Top Navigation & Disabling Unused Sections

Edit [`src/data/navigation.ts`](file:///src/data/navigation.ts):

- Add, reorder, or remove navigation items
- If an author does not have teaching or talks, simply delete files in `src/content/<collection>/` and remove the corresponding entry from `navigation.ts`
- Note: The starter `Guide` (`/markdown/`) link is a formatting demonstration and can be removed when launching a personal site
  ```ts
  export const navigation: NavItem[] = [
    { title: 'Publications', url: '/publications/' },
    { title: 'Talks', url: '/talks/' },
    { title: 'Teaching', url: '/teaching/' },
    { title: 'Portfolio', url: '/portfolio/' },
    { title: 'Blog Posts', url: '/posts/' },
    { title: 'CV', url: '/cv/' },
    { title: 'Guide', url: '/markdown/' },
  ];
  ```

### 4. Adding a Publication

Create a new Markdown file inside `src/content/publications/YYYY-MM-DD-paper-title.md`:

```yaml
---
title: Paper Title Here
date: 2026-01-15
venue: IEEE Transactions on Software Engineering
category: manuscripts # Options: manuscripts, conferences, books
paperurl: https://example.org/paper.pdf
slidesurl: https://example.org/slides.pdf
bibtexurl: https://example.org/citation.bib
citation: 'Your Name. (2026). "Paper Title Here." <i>IEEE Transactions on Software Engineering</i>.'
excerpt: A short 1-2 sentence summary of the paper contributions
---
Detailed abstract, methodology, and notes can be written here using standard Markdown and KaTeX math ($E=mc^2$).
```

### 5. Updating the CV

Edit [`src/pages/cv.astro`](file:///src/pages/cv.astro):

- Update sections: Education, Research Experience, Teaching, Service, Awards
- Headings (`<h2>`, `<h3>`) automatically populate the retractable Table of Contents

### 6. Customizing Colors & Design Tokens

Edit [`src/styles/global.css`](file:///src/styles/global.css):

- Brand primary color: `--global-base-color` (default: `#2f7f93`)
- Link color: `--global-link-color` (default: `#52adc8`)
- Background: `--global-bg-color` (default: `#ffffff`)
- Dark mode overrides are set in `html[data-theme='dark']`

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
