# 🎓 Academic Pages — Astro Edition

[![CI](https://img.shields.io/github/actions/workflow/status/arghyadipchak/academicpages-astro/ci.yml?logo=github-actions&logoColor=white)](https://github.com/arghyadipchak/academicpages-astro/actions/workflows/ci.yml)
[![GitHub Release](https://img.shields.io/github/v/release/arghyadipchak/academicpages-astro?logo=github&logoColor=white&color=0969da)](https://github.com/arghyadipchak/academicpages-astro/releases/latest)
[![Astro 7](https://img.shields.io/badge/Astro-v7-BC52EE?logo=astro&logoColor=white)](https://astro.build/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Commitizen Friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen?logo=git&logoColor=white)](https://commitizen.github.io/cz-cli/)
[![License](https://img.shields.io/github/license/arghyadipchak/academicpages-astro?color=8250DF)](LICENSE)

A modern, high-performance academic personal website and portfolio template built with **Astro 7**, **TypeScript**, and **Tailwind CSS v4**, ported from the classic [academicpages](https://github.com/academicpages/academicpages.github.io) Jekyll theme.

🌐 **Live Demo**: [arghyadipchak.github.io/academicpages-astro](https://arghyadipchak.github.io/academicpages-astro)

---

## ✨ Features

- ⚡ **Blazing Fast**: 100% static HTML generation with sub-second page loads and zero client-side JavaScript framework bloat
- 🎨 **Modern Aesthetic & Dark Mode**: Classic Academic Pages aesthetic modernized with clean light/dark themes, persisted via `localStorage` with OS preference fallback
- 📚 **Strict Content Collections**: Zod-validated TypeScript schemas for:
  - **Publications**: Papers, books, preprints with direct PDF, slides, DOI, and **1-click BibTeX copying**
  - **Blog Posts**: Grouped by year archive with KaTeX math rendering, syntax highlighting, and code-copy buttons
  - **Talks & Presentations**: Conference presentations, tutorials, workshops, and slides
  - **Teaching**: Courses, materials, and office hours
  - **Portfolio**: Research projects and software demos
  - **Dynamic CV**: Aggregated curriculum vitae with interactive, collapsible Table of Contents
- 🔍 **Instant Search (`Cmd + K`)**: Fast, lightweight client-side fuzzy search across all publications, talks, and blog posts
- 📐 **Mathematical Rigor ($\KaTeX$)**: Full LaTeX/MathJax support with static server-side rendering
- 🌐 **Scholarly SEO & Syndication**: Google Scholar and Highwire Press citation meta tags, RSS 2.0 (`/rss.xml`), Atom feed (`/feed.xml`), and XML sitemaps
- 📱 **Exhaustive Sidebar**: Sticky author profile on desktop supporting **50+ academic, code, and social platforms** with responsive mobile drawer
- 🧪 **Comprehensive Test Suite**: Automated Playwright browser tests covering desktop and mobile viewports
- 🛠️ **Editor & Cloud Ready**: Pre-configured for **VS Code** (`.vscode/`), **Zed** (`.zed/`), and **GitHub Codespaces** (`.devcontainer/`)

---

## 🛠️ Tech Stack

| Layer                  | Technologies                                                                         |
| :--------------------- | :----------------------------------------------------------------------------------- |
| **Framework**          | [Astro 7](https://astro.build/)                                                      |
| **Language**           | [TypeScript 5](https://www.typescriptlang.org/) (Strict mode)                        |
| **Styling & Design**   | [Tailwind CSS v4](https://tailwindcss.com/)                                          |
| **Math Engine**        | [KaTeX](https://katex.org/) (via `remark-math` & `rehype-katex`)                     |
| **Icons**              | [Astro Icon](https://www.astro-icon.dev/) (`academicons`, `fa6-brands`, `fa6-solid`) |
| **Search Engine**      | Fast client-side fuzzy search (`/api/search.json`)                                   |
| **Testing**            | [Playwright](https://playwright.dev/) (Desktop & Mobile Chrome)                      |
| **Automation & CI/CD** | GitHub Actions (`ci.yml`, `release.yml`), Dependabot, `git-cliff`                    |
| **Package Manager**    | [pnpm](https://pnpm.io/)                                                             |

---

## 🚀 Quick Start

### ⚡ One-Click Cloud Development

Launch an instant cloud development environment with zero local setup:

[![Open in GitHub Codespaces](https://img.shields.io/badge/Codespaces-Open-0969DA?logo=github&logoColor=white)](https://codespaces.new/arghyadipchak/academicpages-astro)
[![Open in StackBlitz](https://img.shields.io/badge/StackBlitz-Open-1389FD?logo=stackblitz&logoColor=white)](https://stackblitz.com/github/arghyadipchak/academicpages-astro)

### 💻 Local Development

#### 1. Prerequisites

- [Node.js](https://nodejs.org/) `>= 22.11.0` (Node 22, 24, or 26+)
- [pnpm](https://pnpm.io/) `>= 11.0.0`

#### 2. Installation

```bash
# 1. Clone the repository
git clone https://github.com/arghyadipchak/academicpages-astro.git
cd academicpages-astro

# 2. Install dependencies
pnpm install

# 3. Start development server
pnpm dev
```

Visit `http://localhost:4321` in your browser

---

## 🛠️ Commands

| Command             | Description                                                      |
| :------------------ | :--------------------------------------------------------------- |
| `pnpm dev`          | Starts the Astro development server at `localhost:4321`          |
| `pnpm build`        | Compiles production static HTML to `dist/`                       |
| `pnpm preview`      | Previews the production build locally                            |
| `pnpm typecheck`    | Runs Astro TypeScript typechecking                               |
| `pnpm verify`       | Runs quality gate checks (`lint` + `format:check` + `typecheck`) |
| `pnpm test`         | Runs the Playwright automated browser test suite                 |
| `pnpm format`       | Formats all code with Prettier and Tailwind class sorter         |
| `pnpm format:check` | Checks code formatting without writing changes                   |
| `pnpm lint`         | Runs ESLint 9 code quality checks                                |
| `pnpm lint:fix`     | Runs ESLint 9 autofix                                            |

---

## ⚙️ Customization Guide

### 🪄 Quick Setup with AI (Recommended)

If you are using an AI coding assistant (**Antigravity**, **Cursor**, **Claude Code**, or **GitHub Copilot**), you can personalize the entire site in a single step.

Copy and paste this prompt into your AI chat window:

> [!TIP]
> **One-Prompt Site Customization**:
>
> ```markdown
> Please personalize this academic portfolio website for me by following the runbooks in `AGENTS.md` and `.agents/skills/customization/SKILL.md`:
>
> 1. External Sources (Provide whatever you have):
>    - CV / Resume: [e.g. files placed in `cv/` directory (LaTeX `.tex`, Markdown, PDF, or text), or paste text/link]
>    - Google Scholar: [Profile URL, or leave blank]
>    - GitHub: [Profile URL or username, or leave blank]
>    - LinkedIn: [Profile URL, or leave blank]
>    - Existing / Old Website: [URL or directory path of old Jekyll/Hugo/WordPress site, or leave blank]
>    - Other Profiles / Links: [e.g. ORCID, Twitter/X, ResearchGate, personal lab page]
>
> 2. Source Discovery & Interactive Audit:
>    - Inspect `src/data/navigation.ts` and `src/content.config.ts` to discover available template sections and content collections
>    - Inspect all provided external sources above to extract my profile metadata and content matching the discovered collections
>    - Present a summary audit comparing what data was found against the template sections, and ask me:
>      - Which sections with data should be enabled and populated
>      - For empty sections (where no data was found): whether to disable/hide them from navigation, keep them as empty placeholder pages, or if I want to supply data from another source
>
> 3. Navigation & Site Configuration:
>    - Update `src/data/siteConfig.ts` with my name, bio, avatar, affiliation, location, and verified academic/social links
>    - Update `src/data/navigation.ts` based on my chosen sections and remove the starter demo Guide link (`/markdown/`)
>
> 4. Content Population & Cleanup:
>    - Populate each enabled collection and page with my actual data (creating `.md` files in `src/content/` with proper frontmatter and updating corresponding pages)
>    - Delete the demo starter items for any disabled or customized collections
>
> 5. Verification:
>    - Run `pnpm format`, `pnpm verify`, and `pnpm test` to confirm 0 errors and that all tests pass
> ```

---

### 🛠️ Manual Customization (Step-by-Step)

#### 1. Site Metadata & Author Profile

Edit [`src/data/siteConfig.ts`](src/data/siteConfig.ts) to update your site title, bio, avatar, and academic profile handles:

```typescript
export const siteConfig: SiteConfig = {
  locale: 'en-US',
  title: 'Your Name / Site Title',
  titleSeparator: '-',
  description: "Your Name's academic portfolio",
  url: 'https://username.github.io',
  breadcrumbs: true,
  author: {
    avatar: '/images/profile.png',
    name: 'Your Sidebar Name',
    bio: 'Short biography for the left-hand sidebar',
    location: 'Earth',
    employer: 'Red Brick University',
    website: 'https://example.org',
    email: 'none@example.org',

    // Academic & Scholarly Profiles (accepts username/ID or full URL)
    googlescholar: 'https://scholar.google.com/citations?user=your_scholar_id',
    orcid: '0000-0000-0000-0000',

    // Code & Professional Profiles
    github: 'your-github-username',
    linkedin: 'your-linkedin-username',
    x: 'your-x-handle',
  },
  publicationCategories: {
    books: { title: 'Books' },
    journals: { title: 'Journal Articles' },
    conferences: { title: 'Conference Papers' },
  },
};
```

#### 2. Navigation Items

Edit [`src/data/navigation.ts`](src/data/navigation.ts) to customize top navigation links and order. The starter **Guide** (`/markdown/`) link provides a formatting reference and can be removed when launching your personal site.

#### 3. Adding Content

Add Markdown (`.md`) files directly into `src/content/`:

- `src/content/publications/` $\rightarrow$ Research papers, journal articles, and preprints
- `src/content/blog/` $\rightarrow$ Blog posts and research notes
- `src/content/talks/` $\rightarrow$ Conference presentations, keynotes, and workshops
- `src/content/teaching/` $\rightarrow$ Courses, syllabi, and teaching materials
- `src/content/portfolio/` $\rightarrow$ Software projects, tools, and demos

---

## 🚢 Deployment to GitHub Pages

1. In your GitHub repository settings, go to **Settings** $\rightarrow$ **Pages**
2. Under **Build and deployment** $\rightarrow$ **Source**, select **GitHub Actions**
3. Configure `src/data/siteConfig.ts`:
   - User / organization site (`https://<username>.github.io`): set `url: 'https://<username>.github.io'`
   - Project site (`https://<username>.github.io/<repo-name>`): set `url: 'https://<username>.github.io/<repo-name>'`
   - GitHub Actions automatically provides `ASTRO_URL` during CI/CD build
4. Push to `main` — the workflow `.github/workflows/ci.yml` will automatically verify, build, and publish the site

---

## 🤖 AI Agent & Customization Skills

This repository includes first-class support for AI coding assistants:

- **[AGENTS.md](AGENTS.md)**: Repository constitution, architecture, coding guidelines, and verification rules
- **[.agents/skills/customization/SKILL.md](.agents/skills/customization/SKILL.md)**: Comprehensive guide with complete YAML frontmatter schemas for publications, talks, teaching, blog posts, CV editing, and dark mode theming

---

## 🤝 Contributing & Community

Contributions are welcome! Please check out the following resources before contributing:

- **[CONTRIBUTING.md](CONTRIBUTING.md)**: Development workflow, quality gate verification, and Conventional Commit guidelines
- **[SECURITY.md](SECURITY.md)**: Security policy and vulnerability disclosure instructions
- **[GitHub Discussions](https://github.com/arghyadipchak/academicpages-astro/discussions)**: Q&A, feature discussions, and community showcase

---

## 🙏 Acknowledgements & Credits

Academic Pages Astro is built upon the foundational work of the open-source community:

- **[Academic Pages (Jekyll)](https://github.com/academicpages/academicpages.github.io)** — The classic academic website template created by [Stuart Geiger](https://github.com/stuartgeiger) and contributors
- **[Minimal Mistakes](https://github.com/mmistakes/minimal-mistakes)** — The flexible Jekyll theme created by [Michael Rose](https://github.com/mmistakes)
- **[Astro](https://astro.build)** — The web framework for content-driven websites
- **[Tailwind CSS](https://tailwindcss.com)** — The utility-first CSS framework

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) © 2026 [Arghyadip Chakraborty](https://github.com/arghyadipchak). Derived from [academicpages](https://github.com/academicpages/academicpages.github.io)
