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
- 📐 **Mathematical Rigor ($\LaTeX$ / KaTeX)**: Fast, static server-side math rendering across Markdown content, frontmatter titles, and archive listings via KaTeX
- 🌐 **Scholarly SEO & Syndication**: Google Scholar and Highwire Press citation meta tags, RSS 2.0 (`/rss.xml`), Atom feed (`/feed.xml`), XML sitemaps, and crawlers index (`/robots.txt`)
- 🤖 **AI-Native & Agent Ready**: Pre-equipped with turnkey prompts and specialized agent skills (`.agents/skills/`) for 1-step onboarding, routine content authoring, autonomous template upgrades, and machine-readable `/llms.txt` indexing
- 📱 **Exhaustive Sidebar**: Sticky author profile on desktop supporting **50+ academic, code, and social platforms** with responsive mobile drawer
- 🧪 **Comprehensive Test Suite**: Automated Playwright browser tests covering desktop and mobile viewports
- 🛠️ **Editor & Cloud Ready**: Pre-configured for **VS Code** (`.vscode/`), **Zed** (`.zed/`), and **GitHub Codespaces** (`.devcontainer/`)

---

## 🛠️ Tech Stack

| Layer                  | Technologies                                                                                  |
| :--------------------- | :-------------------------------------------------------------------------------------------- |
| **Framework**          | [Astro 7](https://astro.build/)                                                               |
| **Language**           | [TypeScript 5](https://www.typescriptlang.org/) (Strict mode)                                 |
| **Styling & Design**   | [Tailwind CSS v4](https://tailwindcss.com/)                                                   |
| **Math Engine**        | [KaTeX](https://katex.org/) (via `remark-math`, `rehype-katex`, and `marked-katex-extension`) |
| **Icons**              | [Astro Icon](https://www.astro-icon.dev/) (`academicons`, `fa6-brands`, `fa6-solid`)          |
| **Search Engine**      | Fast client-side fuzzy search (`/api/search.json`)                                            |
| **Testing**            | [Playwright](https://playwright.dev/) (Desktop & Mobile Chrome)                               |
| **Automation & CI/CD** | GitHub Actions (`ci.yml`, `release.yml`), Dependabot, `git-cliff`                             |
| **Package Manager**    | [pnpm](https://pnpm.io/)                                                                      |

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

## ⚙️ AI Prompt Playbook & Customization Guide

If you use an AI coding assistant (**Antigravity**, **Cursor**, **Claude Code**, or **GitHub Copilot**), use these turnkey prompts across each stage of your site's lifecycle:

### 🚀 Stage 1: Initial Onboarding & Personalization (One-Time)

Copy and paste this prompt to personalize your entire website in one step:

> [!TIP]
> **Stage 1 Prompt — Site Onboarding**:
>
> ```markdown
> Please personalize this academic portfolio website for me by following `.agents/skills/onboarding/SKILL.md` and `docs/ONBOARDING.md`:
>
> - CV / Resume: [Files in `cv/` (LaTeX `.tex`, Markdown, PDF, or text), or paste text/link]
> - Google Scholar: [Profile URL or ID, or leave blank]
> - GitHub: [Username or URL, or leave blank]
> - LinkedIn: [Profile URL, or leave blank]
> - Existing / Old Website: [URL or directory path of old Jekyll/Hugo/WordPress site, or leave blank]
> - Other Profiles / Links: [e.g. ORCID, Twitter/X, ResearchGate, personal lab page]
> ```

---

### ✍️ Stage 2: Routine Content Authoring (Ongoing)

Use these turnkey prompts to add new academic items into your collections:

#### Adding a Publication

```markdown
Please add a new publication to `src/content/publications/` following `.agents/skills/content-operations/SKILL.md` and `docs/CONTENT.md`:

- Title: [Paper title, e.g. "Deep Learning for Mathematical Reasoning $\mathcal{M}$"]
- Category: [conferences | journals | books]
- Venue: [e.g. "NeurIPS 2025"]
- Date: [YYYY-MM-DD]
- Authors: [List of authors, with asterisks for co-first authors if applicable]
- Links / Badges: [arXiv URL, GitHub code URL, PDF slide URL, poster URL]
- BibTeX: [Raw BibTeX snippet or leave blank to generate from metadata]
- Abstract / Summary: [Paste paper abstract or notes]
```

#### Adding Talks & Presentations

```markdown
Please add a new talk to `src/content/talks/` following `.agents/skills/content-operations/SKILL.md` and `docs/CONTENT.md`:

- Title: [Talk title]
- Type: [Keynote | Conference Talk | Tutorial | Seminar]
- Date: [YYYY-MM-DD]
- Venue: [Conference or department name]
- Location: [City, State / Country]
- Links: [Slides PDF, recording URL, or conference link]
- Abstract: [Brief description or talk outline]
```

#### Adding Teaching & Courses

```markdown
Please add a new course to `src/content/teaching/` following `.agents/skills/content-operations/SKILL.md` and `docs/CONTENT.md`:

- Title: [Course title, e.g. "Introduction to Machine Learning"]
- Semester: [e.g. "Fall 2025" or "Spring 2026"]
- Role: [Instructor | Teaching Assistant | Guest Lecturer]
- Institution: [Department or university name]
- Links: [Syllabus URL, slides URL, course website]
- Description: [Course description, office hours, syllabus outline]
```

#### Writing a Blog Post with Math

```markdown
Please create a new blog post in `src/content/blog/` following `.agents/skills/content-operations/SKILL.md` and `docs/MARKDOWN.md`:

- Title: [Post title, supports inline math like $E=mc^2$]
- Date: [YYYY-MM-DD]
- Tags: [List of tags]
- Description: [Brief summary for SEO and feed]
- Topic / Draft: [Topic outline, equations to typeset in KaTeX, and key takeaways]
```

---

### 🔄 Stage 3: Upstream Template Upgrades (Maintenance)

When new releases are published in `academicpages-astro`, update your site with:

> [!TIP]
> **Stage 3 Prompt — Template Synchronization**:
>
> ```markdown
> Please upgrade my website with the latest template improvements from `academicpages-astro` following `.agents/skills/template-sync/SKILL.md` and `docs/SYNC.md`.
> ```

---

## 🛠️ Manual Operations & Documentation Guides

Follow the dedicated guides in `docs/` for manual workflows:

1. **[Site Onboarding Guide](docs/ONBOARDING.md)**: Complete roadmap for site setup, demo content purge, asset cleanup, and test retirement
2. **[Site Configuration Guide](docs/CONFIG.md)**: Configure `src/data/siteConfig.ts`, 50+ scholarly/social profiles, header navigation in `src/data/navigation.ts`, and redirects
3. **[Content Authoring Guide](docs/CONTENT.md)**: Frontmatter schemas and conventions for publications, talks, teaching, portfolio projects, blog posts, and KaTeX math
4. **[Markdown Reference](docs/MARKDOWN.md)**: Complete syntax reference for KaTeX math, tables, alert callouts, and Mermaid diagrams with live rendered demo link
5. **[Template Synchronization Guide](docs/SYNC.md)**: Tag-to-tag template upgrades via ephemeral bare clone and targeted patches without Git remotes

---

## 🚢 Deployment to GitHub Pages

1. In your GitHub repository settings, go to **Settings** $\rightarrow$ **Pages**
2. Under **Build and deployment** $\rightarrow$ **Source**, select **GitHub Actions**
3. Set your deployment `url` in `src/data/siteConfig.ts` (see [docs/CONFIG.md](docs/CONFIG.md#3-base-url--deployment-resolution-astroconfigts) for user vs project site details)
4. Push to `main` — `.github/workflows/ci.yml` will automatically verify, build, and publish the site

---

## 🤖 Documentation & Operational Lifecycle

This repository is structured around a **3-phase operational lifecycle** for human maintainers and AI coding assistants:

1. **Phase 1: Initial Onboarding & Setup (One-Time)**
   - **[docs/ONBOARDING.md](docs/ONBOARDING.md)** & [`.agents/skills/onboarding/`](.agents/skills/onboarding/SKILL.md): Itemized checklist for profile personalization, demo purge, and scaffolding retirement
2. **Phase 2: Routine Content Authoring & Operations**
   - **[docs/CONFIG.md](docs/CONFIG.md)**: Configuration options for `siteConfig.ts`, navigation, and 50+ scholarly handles
   - **[docs/CONTENT.md](docs/CONTENT.md)** & [`.agents/skills/content-operations/`](.agents/skills/content-operations/SKILL.md): Schemas and conventions for publications, talks, teaching, and blog posts
   - **[docs/MARKDOWN.md](docs/MARKDOWN.md)**: Mathematical typesetting with KaTeX, callouts, tables, and Mermaid diagrams
3. **Phase 3: Upstream Template Synchronization**
   - **[docs/SYNC.md](docs/SYNC.md)** & [`.agents/skills/template-sync/`](.agents/skills/template-sync/SKILL.md): Tag-based template upgrades via ephemeral bare clones and intelligent merging without Git remotes

- **Master AI Constitution**: **[AGENTS.md](AGENTS.md)** (repository rules, quality gates, and agent guidelines)

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
