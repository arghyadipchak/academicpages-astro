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
  - Replace `public/images/profile.png` if an avatar is provided

### Step 3: Populate Content & Purge Demo Artifacts

- Create `.md` files in `src/content/<collection>/` using the templates in [`docs/CONTENT.md`](file:///docs/CONTENT.md)
- Update `src/pages/index.astro` (about/bio text) and `src/pages/cv.astro` (curriculum vitae)
- Execute the demo purge items in [`docs/CHECKLIST.md`](file:///docs/CHECKLIST.md):
  - Delete demo markdown files in `src/content/`
  - Delete starter PDFs/slides in `public/files/`
  - Delete unused starter images in `public/images/`

### Step 4: Retire Playwright Tests for Personal Sites

Personal sites should not maintain brittle demo-string Playwright browser tests. Follow Section 5 of [`docs/CHECKLIST.md`](file:///docs/CHECKLIST.md):

- Remove `tests/` and `playwright.config.ts`
- Remove `@playwright/test` and `"test"` script from `package.json`
- Remove browser install and test steps from `.github/workflows/ci.yml`

### Step 5: Verification & Quality Gate

Execute the verification pipeline from repository root:

```bash
pnpm format
pnpm verify
pnpm build
```

Ensure 0 errors across ESLint, Prettier, and Astro typecheck.

### Step 6: Self-Destruction

Once verification passes cleanly, delete the checklist:

```bash
rm docs/CHECKLIST.md
```
