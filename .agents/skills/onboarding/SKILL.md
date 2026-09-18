---
name: academicpages-onboarding
description: First-time personalization, profile discovery, demo content purge, and repository onboarding runbook for Academic Pages Astro
---

# Academic Pages Astro Onboarding Skill 🚀

Operational runbook for AI coding assistants performing first-time personalization and onboarding for a user.

> ⚠️ **One-Time Lifecycle**: This skill and [`docs/ONBOARDING.md`](../../../docs/ONBOARDING.md) are intended solely for initial site setup. Once onboarding and verification are complete, follow Step 5 to delete this skill directory and `docs/ONBOARDING.md` to keep the repository clean.

---

## 1. Onboarding Workflow

Follow these sequential steps when prompted to personalize the website for a user:

### Step 1: Ingest Sources & Perform Discovery Audit

1. **Discover Collections**: Inspect `src/data/navigation.ts` and `src/content.config.ts` to identify active collections (`publications`, `talks`, `teaching`, `portfolio`, `blog`)
2. **Ingest External Data**: Review user-provided sources (CV, LaTeX resumes, Google Scholar profile, GitHub username, personal website, bio)
3. **Compare & Audit**: Present a summary of data found against template sections, asking the user:
   - Which populated sections to enable in navigation
   - Whether to hide empty sections or supply content later

### Step 2: Configure Site Identity & Navigation

- Apply configuration options detailed in [`docs/CONFIG.md`](../../../docs/CONFIG.md):
  - Update `src/data/siteConfig.ts` with user profile, verified scholarly handles (`googlescholar`, `orcid`, `github`, `linkedin`, `x`), and deployment URL
  - Update `src/data/navigation.ts` to match enabled sections and remove the demo `{ title: 'Guide', url: '/markdown/' }` link (and remove the Guide entry from `src/pages/sitemap.astro`)
  - Update `LICENSE` with the user's copyright notice while preserving upstream MIT lines
  - Replace `public/images/profile.png` if a personal headshot is provided
  - Never remove, hide, or comment out the template attribution link in `src/components/Footer.astro` pointing to `academicpages-astro`

### Step 3: Populate Content & Purge Demo Artifacts

- Create personal `.md` files in `src/content/<collection>/` using the templates in [`docs/CONTENT.md`](../../../docs/CONTENT.md)
- Update `src/pages/index.astro` (about/bio text) and `src/pages/cv.astro` (curriculum vitae)
- Customize `src/content/pages/terms.md` (institutional disclaimers, course reuse licensing, and hosting infrastructure references if deploying to platforms other than GitHub Pages such as Cloudflare Pages, Vercel, Netlify)
- Execute the demo purge items in [`docs/ONBOARDING.md`](../../../docs/ONBOARDING.md):
  - Delete demo markdown files in `src/content/publications/`, `src/content/talks/`, `src/content/teaching/`, `src/content/portfolio/`, and `src/content/blog/`
  - Delete demo markdown page `src/content/pages/markdown.md` and its route `src/pages/markdown.astro`
  - Delete starter PDFs/slides in `public/files/`
  - Delete unused starter images in `public/images/`

### Step 4: Retire Starter Scaffolding & Tests (Optional)

Follow Section 5 of [`docs/ONBOARDING.md`](../../../docs/ONBOARDING.md) to clean up starter artifacts if requested:

1. **Retire Playwright Tests** (Section 5.B): Remove `tests/`, `playwright.config.ts`, `@playwright/test`, and CI browser test steps
2. **Retire Template Governance Files** (Section 5.C): Delete `CONTRIBUTING.md`, `SECURITY.md`, `cliff.toml`, `.github/FUNDING.yml`, `.github/pull_request_template.md`, `.github/ISSUE_TEMPLATE/`, `.github/workflows/release.yml`, and `.github/workflows/pr-lint.yml`
3. **Personalize `README.md`** (Section 5.D): Replace template README with personal website metadata and run commands

### Step 5: Verification & Onboarding Self-Destruction

1. Execute the verification pipeline from repository root:
   ```bash
   pnpm format
   pnpm verify
   pnpm build
   ```
2. Once verification passes with 0 errors, delete the onboarding checklist and skill directory:
   ```bash
   rm docs/ONBOARDING.md
   rm -rf .agents/skills/onboarding/
   ```
3. Subsequent content authoring is handled by `.agents/skills/content-operations/` and template upgrades by `.agents/skills/template-sync/`
