---
name: academicpages-content-operations
description: Operational runbook for adding publications, talks, teaching, blog posts, and updating CV or author profiles in Academic Pages Astro
---

# Academic Pages Astro Content Operations Skill ✍️

Operational runbook for AI coding assistants and developers managing routine academic content, authoring publications, writing blog posts, and updating CV sections.

> 📚 **Canonical Reference Guides**:
>
> - **[Site Configuration (`docs/CONFIG.md`)](../../../docs/CONFIG.md)**: Profile handles, navigation items, and SEO settings
> - **[Content Authoring (`docs/CONTENT.md`)](../../../docs/CONTENT.md)**: Complete Zod frontmatter schemas, file naming conventions, action badges, and 1-click BibTeX
> - **[Markdown & Math Reference (`docs/MARKDOWN.md`)](../../../docs/MARKDOWN.md)**: KaTeX mathematical formulas, code highlighting, alert callouts, and Mermaid diagrams

---

## 1. Content Operations Workflow

Follow these rules when adding or modifying site content:

### Publications (`src/content/publications/`)

- **File Naming**: Date-prefixed kebab-case: `YYYY-MM-DD-paper-short-title.md`
- **Frontmatter & Schemas**: Follow the full schema in [`docs/CONTENT.md#2-publications`](../../../docs/CONTENT.md#2-publications)
- **Action Badges**: Populate `paperurl`, `code`, `slides`, `poster`, or `bibtex` to automatically render interactive buttons and 1-click BibTeX copy modals
- **KaTeX in Titles**: Wrap math expressions in `$...$` inside `title` (e.g. `'Analyzing $\mathcal{M}$'`)

### Talks & Presentations (`src/content/talks/`)

- **File Naming**: `YYYY-MM-DD-talk-title.md`
- **Frontmatter & Schemas**: Follow the template in [`docs/CONTENT.md#3-talks--presentations`](../../../docs/CONTENT.md#3-talks--presentations)

### Teaching & Courses (`src/content/teaching/`)

- **File Naming**: `YYYY-semester-course-name.md` (e.g. `2025-fall-cs101.md`)
- **Frontmatter & Schemas**: Follow the template in [`docs/CONTENT.md#4-teaching--courses`](../../../docs/CONTENT.md#4-teaching--courses)

### Blog Posts & Markdown Pages (`src/content/blog/`, `src/content/pages/`)

- **File Naming**: `YYYY-MM-DD-post-title.md`
- **Math Formatting**: Follow [`docs/MARKDOWN.md#1-katex--mathematical-typesetting`](../../../docs/MARKDOWN.md#1-katex--mathematical-typesetting) for inline math (`$...$`) and display equations (`$$...$$`)

### Curriculum Vitae & Bio Updates

- **CV Sections**: Edit structured sections in `src/pages/cv.astro` (Education, Appointments, Awards, Service)
- **Profile & Handles**: Edit `src/data/siteConfig.ts` following [`docs/CONFIG.md`](../../../docs/CONFIG.md)
- **Navigation Links**: Edit `src/data/navigation.ts` to reorder or toggle menu items

---

## 2. Verification Pipeline

Always verify changes after modifying content:

```bash
# Verify linting, formatting, and TypeScript types
pnpm verify

# Build static production site
pnpm build
```
