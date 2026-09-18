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
- 🌐 **Scholarly SEO & Syndication**: Google Scholar and Highwire Press citation meta tags, RSS 2.0 (`/rss.xml`), Atom feed (`/feed.xml`), XML sitemaps, crawlers index (`/robots.txt`), and LLM-friendly index (`/llms.txt`)
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
> Please personalize this academic portfolio website for me by following `.agents/skills/customization/SKILL.md` and `docs/CHECKLIST.md`:
>
> 1. My Profiles & External Sources:
>    - CV / Resume: [Files in `cv/` (LaTeX `.tex`, Markdown, PDF, or text), or paste text/link]
>    - Google Scholar: [Profile URL or ID, or leave blank]
>    - GitHub: [Username or URL, or leave blank]
>    - LinkedIn: [Profile URL, or leave blank]
>    - Existing / Old Website: [URL or directory path of old Jekyll/Hugo/WordPress site, or leave blank]
>    - Other Profiles / Links: [e.g. ORCID, Twitter/X, ResearchGate, personal lab page]
>
> 2. Execution Directives:
>    - Perform a discovery audit matching my data against template collections and ask me which sections to enable
>    - Update `src/data/siteConfig.ts` and `src/data/navigation.ts` with my verified profile and navigation links
>    - Populate `src/content/` with my publications, talks, teaching, and posts; purge all starter demo files and assets
>    - Retire starter Playwright tests and template governance files (`CONTRIBUTING.md`, `SECURITY.md`, etc.) as instructed in `docs/CHECKLIST.md`
>    - Personalize the repository `README.md` and verify the site with `pnpm verify && pnpm build`
>    - Self-destruct: Delete `docs/CHECKLIST.md` (`rm docs/CHECKLIST.md`) once personalization and verification are complete
> ```

---

### 🛠️ Manual Customization (Step-by-Step)

Follow the dedicated guides in `docs/` to personalize your site:

1. **[Setup & Cleanup Checklist](docs/CHECKLIST.md)**: Complete roadmap for site setup, demo content purge, asset cleanup, and test retirement
2. **[Site Configuration Guide](docs/CONFIG.md)**: Configure `src/data/siteConfig.ts`, 50+ scholarly/social profiles, header navigation in `src/data/navigation.ts`, and redirects
3. **[Content Authoring Guide](docs/CONTENT.md)**: Frontmatter schemas and conventions for publications, talks, teaching, portfolio projects, blog posts, and KaTeX math
4. **[Markdown Reference](docs/MARKDOWN.md)**: Complete syntax reference for KaTeX math, tables, alert callouts, and Mermaid diagrams with live rendered demo link

---

## 🚢 Deployment to GitHub Pages

1. In your GitHub repository settings, go to **Settings** $\rightarrow$ **Pages**
2. Under **Build and deployment** $\rightarrow$ **Source**, select **GitHub Actions**
3. Set your deployment `url` in `src/data/siteConfig.ts` (see [docs/CONFIG.md](docs/CONFIG.md#3-base-url--deployment-resolution-astroconfigts) for user vs project site details)
4. Push to `main` — `.github/workflows/ci.yml` will automatically verify, build, and publish the site

---

## 🤖 Documentation & AI Agent Skills

This repository includes first-class documentation and support for AI coding assistants:

- **[docs/CONFIG.md](docs/CONFIG.md)**: Complete configuration options and redirect handling
- **[docs/CONTENT.md](docs/CONTENT.md)**: Content schemas, KaTeX formatting, and frontmatter templates
- **[docs/CHECKLIST.md](docs/CHECKLIST.md)**: Self-destructing setup checklist and demo cleanup roadmap
- **[docs/MARKDOWN.md](docs/MARKDOWN.md)**: Complete Markdown, typography, and mathematical typesetting reference
- **[AGENTS.md](AGENTS.md)**: Repository constitution, architecture, coding guidelines, and verification rules
- **[.agents/skills/customization/SKILL.md](.agents/skills/customization/SKILL.md)**: Customization skill and AI runbook

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
