---
name: academicpages-customization
description: Comprehensive guide and runbook for customizing, managing content, and deploying the Academic Pages Astro portfolio template
---

# Academic Pages Astro Customization Skill 📚

Operational runbook for AI coding assistants personalizing this template for a user.

> 📋 **Canonical Documentation in `docs/`**:
>
> - **[Site Configuration (`docs/CONFIG.md`)](file:///docs/CONFIG.md)**: Details all options in `siteConfig.ts`, navigation, base URL resolution, and redirects
> - **[Content Authoring (`docs/CONTENT.md`)](file:///docs/CONTENT.md)**: Schemas, frontmatter templates, and rich formatting for all collections
> - **[Setup Checklist (`docs/CHECKLIST.md`)](file:///docs/CHECKLIST.md)**: Itemized onboarding, demo purge, and test retirement checklist
> - **[Markdown Reference (`docs/MARKDOWN.md`)](file:///docs/MARKDOWN.md)**: Complete syntax reference for KaTeX math, tables, alert callouts, and diagrams

---

## Agentic Personalization Workflow

Follow these sequential steps when prompted to personalize the website for a user:

### Step 1: Ingest Sources & Perform Discovery Audit

1. **Discover Collections**: Inspect `src/data/navigation.ts` and `src/content.config.ts` to identify active collections (`publications`, `talks`, `teaching`, `portfolio`, `blog`)
2. **Ingest External Data**: Review user-provided sources (CV, LaTeX resumes, Google Scholar, GitHub, personal links)
3. **Compare & Audit**: Present an interactive summary of data found against template sections, asking the user:
   - Which populated sections to enable in navigation
   - Whether to hide empty sections or supply content later

### Step 2: Configure Site Identity & Navigation

- Apply configuration options detailed in [`docs/CONFIG.md`](file:///docs/CONFIG.md):
  - Update `src/data/siteConfig.ts` with user profile, verified scholarly IDs, and deployment URL
  - Update `src/data/navigation.ts` to match the user's enabled sections and remove the demo `{ title: 'Guide', url: '/markdown/' }` link
  - Update `LICENSE` with the user's copyright notice while preserving upstream MIT lines
  - Replace `public/images/profile.png` if an avatar is provided
  - Never remove, hide, or comment out the footer credit link in `src/components/Footer.astro` pointing to `academicpages-astro`

### Step 3: Populate Content & Purge Demo Artifacts

- Create `.md` files in `src/content/<collection>/` using the templates in [`docs/CONTENT.md`](file:///docs/CONTENT.md)
- Update `src/pages/index.astro` (about/bio text) and `src/pages/cv.astro` (curriculum vitae)
- Execute the demo purge items in [`docs/CHECKLIST.md`](file:///docs/CHECKLIST.md):
  - Delete demo markdown files in `src/content/`
  - Delete starter PDFs/slides in `public/files/`
  - Delete unused starter images in `public/images/`

### Step 4: Retire Starter Scaffolding, Tests & Template Files

Follow Section 5 of [`docs/CHECKLIST.md`](file:///docs/CHECKLIST.md) to clean up starter artifacts:

1. **Retire Playwright Tests** (Section 5.B): Remove `tests/`, `playwright.config.ts`, `@playwright/test`, and CI browser test steps
2. **Retire Template Governance Files** (Section 5.C): Delete `CONTRIBUTING.md`, `SECURITY.md`, `cliff.toml`, `.github/FUNDING.yml`, `.github/pull_request_template.md`, `.github/ISSUE_TEMPLATE/`, `.github/workflows/release.yml`, and `.github/workflows/pr-lint.yml`
3. **Personalize `README.md`** (Section 5.D): Replace template README with personal website metadata and run commands

### Step 5: Verification & Self-Destruction

1. Execute the verification pipeline from repository root:
   ```bash
   pnpm format
   pnpm verify
   pnpm build
   ```
2. Once verification passes with 0 errors, delete the onboarding checklist:
   ```bash
   rm docs/CHECKLIST.md
   ```
