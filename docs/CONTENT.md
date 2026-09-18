# ✍️ Content Authoring Guide (`CONTENT.md`)

This guide details how to write, structure, name, and organize content across all Astro content collections in `academicpages-astro`.

---

## 1. Directory Structure & File Naming Conventions

All content collections live in `src/content/`. Astro Content Layer validates every entry against schemas defined in [`src/content.config.ts`](../src/content.config.ts).

| Collection       | Directory                   | Recommended Naming             | URL Route                    |
| :--------------- | :-------------------------- | :----------------------------- | :--------------------------- |
| **Publications** | `src/content/publications/` | `YYYY-MM-DD-paper-title.md`    | `/publications/[...slug]/`   |
| **Talks**        | `src/content/talks/`        | `YYYY-MM-DD-talk-title.md`     | `/talks/[...slug]/`          |
| **Teaching**     | `src/content/teaching/`     | `YYYY-semester-course-name.md` | `/teaching/[...slug]/`       |
| **Portfolio**    | `src/content/portfolio/`    | `project-name.md`              | `/portfolio/[...slug]/`      |
| **Blog Posts**   | `src/content/blog/`         | `YYYY-MM-DD-post-title.md`     | `/posts/[...slug]/`          |
| **Pages**        | `src/content/pages/`        | `page-slug.md`                 | Rendered on dedicated routes |

---

## 2. Universal Frontmatter Fields

The following base properties are available across content collections and static pages (defined in `baseContentSchema` and `layoutSchema` in `src/content.config.ts`):

| Field            | Type         | Required      | Description                                                                       |
| :--------------- | :----------- | :------------ | :-------------------------------------------------------------------------------- |
| `title`          | `string`     | **Yes**       | Item title (supports inline KaTeX math, e.g. `$E=mc^2$`)                          |
| `description`    | `string`     | No            | Short summary for SEO meta tags, social cards, and live search (`Cmd+K`)          |
| `date`           | `YYYY-MM-DD` | _Collections_ | Publication or event date (required on publications, talks, blog, portfolio)      |
| `author_profile` | `boolean`    | No            | Shows author bio sidebar on desktop and follow toggle on mobile (default: `true`) |
| `toc`            | `boolean`    | No            | Renders retractable Table of Contents on wide viewports (default: `false`)        |
| `image`          | `string`     | No            | Optional hero or card preview banner path (e.g. `/images/project.png`)            |
| `permalink`      | `string`     | No            | Custom URL slug override                                                          |

---

## 3. Publications (`src/content/publications/`)

Research papers, preprints, books, and conference articles.

### Unique Fields

| Field        | Type     | Description                                                      |
| :----------- | :------- | :--------------------------------------------------------------- |
| `category`   | `enum`   | Category filter tab (`books`, `journals`, `conferences`)         |
| `venue`      | `string` | Journal or conference name                                       |
| `citation`   | `string` | Formatted academic citation (supports HTML tags like `<i>`)      |
| `pdf_url`    | `string` | Local download path (`/files/paper.pdf`) or external link        |
| `slides_url` | `string` | Slides presentation link                                         |
| `code_url`   | `string` | Code repository link                                             |
| `bibtex`     | `string` | Raw BibTeX entry rendered with an interactive 1-click copy badge |

### Example

```yaml
---
title: High-Throughput Learning of Neural Potentials
date: 2026-03-15
description: A scalable deep learning framework for molecular dynamics
category: journals
venue: Nature Machine Intelligence
citation: 'Doe, J., & Smith, A. (2026). "High-Throughput Learning of Neural Potentials." <i>Nature Machine Intelligence</i>, 8(3), 200-215.'
pdf_url: /files/paper1.pdf
slides_url: /files/slides1.pdf
code_url: https://github.com/username/project
bibtex: |
  @article{Doe2026,
    title   = {High-Throughput Learning of Neural Potentials},
    author  = {Doe, Jane and Smith, Alex},
    journal = {Nature Machine Intelligence},
    year    = {2026},
    volume  = {8},
    pages   = {200--215}
  }
author_profile: true
toc: false
---
Detailed abstract, methodology, results, and discussion go here. Standard Markdown, figures, and KaTeX math ($E=mc^2$) are fully supported.
```

---

## 4. Talks & Presentations (`src/content/talks/`)

Keynotes, conference talks, seminar presentations, and tutorials.

### Unique Fields

| Field        | Type     | Description                                                               |
| :----------- | :------- | :------------------------------------------------------------------------ |
| `type`       | `string` | Talk format (e.g. `Keynote Talk`, `Conference Talk`, `Workshop Tutorial`) |
| `venue`      | `string` | Event name, host institution, and location                                |
| `slides_url` | `string` | Presentation slides link                                                  |

### Example

```yaml
---
title: Scalable Graph Transformers for Protein Design
date: 2026-05-20
description: Keynote presentation on graph representation learning in biology
type: Keynote Talk
venue: International Conference on Machine Learning (ICML 2026), Vienna, Austria
slides_url: /files/slides2.pdf
author_profile: true
---
Talk summary, abstract, slide embed, or related video links.
```

---

## 5. Teaching (`src/content/teaching/`)

Undergraduate and graduate courses, guest lectures, and workshops.

### Unique Fields

| Field      | Type     | Description                                                               |
| :--------- | :------- | :------------------------------------------------------------------------ |
| `year`     | `number` | Academic year (e.g. `2026`)                                               |
| `semester` | `enum`   | Semester term (`Autumn`, `Fall`, `Spring`, `Summer`, `Winter`)            |
| `type`     | `string` | Course level (e.g. `Undergraduate Course`, `Graduate Course`, `Workshop`) |
| `venue`    | `string` | Department or university name                                             |

### Example

```yaml
---
title: 'CS 229: Machine Learning & Scientific Computing'
year: 2026
semester: Spring
description: Graduate-level introduction to statistical learning and optimization
type: Graduate Course
venue: Department of Computer Science, University of Science
author_profile: true
---
Course syllabus, grading policy, office hours, and lecture materials.
```

---

## 6. Portfolio Projects (`src/content/portfolio/`)

Software libraries, datasets, open-source projects, and research artifacts.

### Unique Fields

| Field        | Type     | Description                                         |
| :----------- | :------- | :-------------------------------------------------- |
| `timeline`   | `string` | Project active duration (e.g. `Aug 2025 – Present`) |
| `venue`      | `string` | Organization, lab, or institution name              |
| `code_url`   | `string` | Source code repository link                         |
| `pdf_url`    | `string` | Documentation or report link                        |
| `slides_url` | `string` | Presentation slides link                            |

### Example

```yaml
---
title: Neural Force Fields Library
date: 2025-08-01
timeline: Aug 2025 – Present
venue: AI for Science Lab
description: Open-source PyTorch framework for molecular simulation
image: /images/project-1.svg
code_url: https://github.com/username/project
pdf_url: https://example.com/paper.pdf
author_profile: true
---
Overview of the project, features, architectural diagram, and installation guide.
```

---

## 7. Blog Posts (`src/content/blog/`)

Articles, research thoughts, and release announcements.

### Unique Fields

| Field       | Type         | Description                                                  |
| :---------- | :----------- | :----------------------------------------------------------- |
| `tags`      | `string[]`   | Array of topic tags                                          |
| `modified`  | `YYYY-MM-DD` | Last updated date                                            |
| `draft`     | `boolean`    | Set to `true` to hide from listings, sitemaps, and RSS feeds |
| `read_time` | `boolean`    | Displays estimated reading time badge (default: `true`)      |

### Example

```yaml
---
title: Accelerating Scientific Discovery with Agentic AI
date: 2026-04-10
modified: 2026-04-12
description: How AI pair programmers streamline scientific experimentation
tags:
  - AI
  - Research
  - Tooling
draft: false
read_time: true
toc: true
author_profile: true
---
Post content with full Markdown, math equations, code blocks, and diagrams.
```

---

## 8. Static Pages (`src/content/pages/`)

Static markdown pages for institutional requirements or reference guides.

- `about.md`: Legacy bio page (note: default homepage is `src/pages/index.astro`)
- `terms.md`: Academic terms of use, content licensing, and privacy notices linked in the global footer (`/terms/`)
- `markdown.md`: Starter Markdown formatting demo (`/markdown/`, deleted during setup)

### Example

```yaml
---
title: Terms and Privacy Policy
description: Terms of use, content licensing, and privacy practices for this website
author_profile: true
toc: false
---
```

> 💡 **Customization**: Review `src/content/pages/terms.md` to tailor institutional disclaimers, course reuse licensing, and hosting infrastructure references if deploying to platforms other than GitHub Pages (e.g. Cloudflare Pages, Vercel, Netlify).

---

## 9. Rich Media, Diagrams & Mathematical Formatting

Academic Pages Astro supports KaTeX math, interactive Mermaid diagrams, Plotly scientific charts, callouts, and syntax-highlighted code blocks across all markdown entries.

For the comprehensive syntax reference, formatting examples, and live visual rendering, see [`docs/MARKDOWN.md`](MARKDOWN.md) or visit the [live markdown demo](https://arghyadipchak.github.io/academicpages-astro/markdown/).
