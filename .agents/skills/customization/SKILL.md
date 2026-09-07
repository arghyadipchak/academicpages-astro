---
name: academicpages-customization
description: Comprehensive guide and runbook for customizing, managing content, and deploying the Academic Pages Astro portfolio template
---

# Academic Pages Astro Customization Skill 📚

This skill provides step-by-step instructions for customizing author profiles, managing academic content collections (publications, talks, teaching, blog posts, portfolio), adjusting themes, and verifying builds.

---

## 1. Quick Start Customization

### Author Profile & Site Identity

All author and site metadata lives in `src/data/siteConfig.ts`:

```ts
export const siteConfig: SiteConfig = {
  locale: 'en-US',
  title: 'Your Name / Site Title',
  titleSeparator: '-',
  name: 'Your Name',
  description: "Your Name's academic portfolio",
  url: 'https://username.github.io',
  baseurl: '', // Set if hosted on a subdirectory, e.g. '/portfolio'
  repository: 'username/portfolio',
  breadcrumbs: false,
  author: {
    avatar: '/images/profile.png',
    name: 'Your Sidebar Name',
    pronouns: 'they/them',
    bio: 'Short biography for the left-hand sidebar',
    location: 'Cambridge, MA',
    employer: 'University / Institute',
    uri: 'https://example.org',
    email: 'contact@example.org',
    googlescholar: 'https://scholar.google.com/citations?user=USER_ID',
    orcid: 'https://orcid.org/0000-0000-0000-0000',
    github: 'username',
    linkedin: 'username',
  },
  publicationCategories: {
    books: { title: 'Books' },
    manuscripts: { title: 'Journal Articles' },
    conferences: { title: 'Conference Papers' },
  },
};
```

### Avatar Image

Replace `public/images/profile.png` with your photo (square aspect ratio recommended, ~500x500px).

---

## 2. GitHub Pages Deployment: Base URL Configuration

- **User / Organization Site** (`https://<username>.github.io`):
  - `src/data/siteConfig.ts`: `url: 'https://<username>.github.io'`, `baseurl: ''`
- **Project Site** (`https://<username>.github.io/<repo-name>`):
  - `src/data/siteConfig.ts`: `url: 'https://<username>.github.io/<repo-name>'`, `baseurl: '/<repo-name>'`
- **Dynamic CI Resolution**:
  - In GitHub Actions CI (`.github/workflows/ci.yml`), `actions/configure-pages` automatically injects `ASTRO_SITE` and `ASTRO_BASE` into `pnpm build`
  - `astro.config.ts` reads `process.env.ASTRO_BASE` first, falling back to `siteConfig.baseurl`
- **Asset & URL Construction**:
  - Always use `resolveUrl(path)` from `src/utils/url.ts` when linking internal assets, routes, and API endpoints

---

## 3. Managing Content Collections

All content collections use strict Zod schemas defined in `src/content.config.ts`.

### Publications (`src/content/publications/`)

Create `.md` or `.mdx` files with frontmatter:

```yaml
---
title: Exact Paper Title Here
date: 2026-05-12
venue: Nature Communications
category: manuscripts # Options: manuscripts, conferences, books
paperurl: https://example.org/paper.pdf # Direct PDF download link
slidesurl: https://example.org/slides.pdf # Optional slide deck link
bibtexurl: https://example.org/paper.bib # Optional direct .bib file link
citation: 'Author, A., & Author, B. (2026). "Exact Paper Title Here." <i>Nature Communications</i>, 17(1).'
excerpt: A 1-2 sentence overview of the paper findings
---
Abstract and detailed notes go here. KaTeX math ($E=mc^2$) is supported in body text and titles.
```

### Talks & Presentations (`src/content/talks/`)

```yaml
---
title: Keynote Talk Title
date: 2026-03-20
type: Conference proceedings talk
venue: NeurIPS 2026
location: New Orleans, LA
talkurl: https://example.org/slides.pdf
excerpt: Abstract of the invited presentation
---
```

### Teaching & Courses (`src/content/teaching/`)

```yaml
---
title: 'CS 101: Introduction to Computer Science'
date: 2026-01-10
type: Undergraduate course
venue: Department of Computer Science
location: Red Brick University
excerpt: Course syllabus, lecture notes, and lab assignments
---
```

### Blog Posts (`src/content/blog/`)

```yaml
---
title: Thoughts on Generative AI in Academic Research
date: 2026-02-14
tags:
  - AI
  - Research
  - Opinion
excerpt: Exploring how AI pair programmers accelerate scientific discovery
---
```

### Portfolio Projects (`src/content/portfolio/`)

```yaml
---
title: Open Source Protein Folding Visualizer
date: 2026-04-01
excerpt: An interactive web-based 3D visualization tool for macromolecular structures
---
```

## 4. Customizing Navigation & Header Links

Edit `src/data/navigation.ts` to add, reorder, or remove top menu items. The starter `Guide` (`/markdown/`) link is included as a formatting demonstration and can be removed when launching your personal site:

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

---

## 5. Customizing the CV Page

The CV page is located at `src/pages/cv.astro`:

- Edit headings and experience entries directly
- Headings (`<h2>`, `<h3>`) automatically populate the collapsible Table of Contents
- To add a download link for your PDF resume, place your PDF in `public/files/cv.pdf` and link to `/files/cv.pdf`

---

## 6. Styling, Colors & Dark Mode

Edit `src/styles/global.css`:

```css
:root {
  --global-base-color: #2f7f93; /* Primary brand accent */
  --global-bg-color: #ffffff; /* Light background */
  --global-link-color: #52adc8; /* Hyperlink color */
  --global-link-color-hover: #235f6e; /* Hyperlink hover */
  --global-text-color: #494e52; /* Main body text */
  --global-text-color-light: #7a8288; /* Muted secondary text */
}

html[data-theme='dark'],
.dark {
  --global-base-color: #0ea1c5; /* Dark mode primary brand */
  --global-bg-color: #282c34; /* Dark background */
  --global-text-color: #e5e7eb; /* Dark mode text */
  --global-text-color-light: #9ca3af; /* Dark mode muted text */
}
```

---

## 7. Verification & Quality Gates

Always run the full verification pipeline before pushing changes:

```bash
# 1. Format code with Prettier and Tailwind class sorter
pnpm format

# 2. Run code quality checks (lint, format:check, typecheck)
pnpm verify

# 3. Build static production site
pnpm build

# 4. Run automated Playwright browser tests
pnpm test
```

---

## 8. Deploying to GitHub Pages

1. In your GitHub repository settings, go to **Settings > Pages**
2. Under **Build and deployment > Source**, select **GitHub Actions**
3. Push to `main` — the workflow `.github/workflows/ci.yml` will automatically build and publish the site
