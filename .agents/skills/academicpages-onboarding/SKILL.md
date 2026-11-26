---
name: academicpages-onboarding
description: Use when personalizing this Academic Pages Astro site for a user for the first time, from a CV, Google Scholar, GitHub or an old website, including purging the demo content
---

# Academic Pages Astro Onboarding Skill 🚀

Operational runbook for AI coding assistants performing first-time personalization and repository onboarding for a user.

> 📚 **Canonical Reference Guides**:
>
> - **[Onboarding Checklist (`docs/ONBOARDING.md`)](../../../docs/ONBOARDING.md)**: Itemized checklist for identity, demo purge, route pruning, and scaffolding retirement
> - **[Site Configuration (`docs/CONFIG.md`)](../../../docs/CONFIG.md)**: Profile fields, verified handles, navigation structure, and redirects
> - **[Content Authoring (`docs/CONTENT.md`)](../../../docs/CONTENT.md)**: Frontmatter schemas and collection authoring templates

> ♻️ **Safe to Re-Run**: Keep this skill and [`docs/ONBOARDING.md`](../../../docs/ONBOARDING.md) after setup. When re-running, check which steps are already done and skip them

---

## 1. Onboarding Protocol

Follow these sequential phases when personalizing the website for a user:

### Phase 1: Discovery Audit & User Alignment

1. **Audit Available Sources**: Review user-provided materials (CV, LaTeX resume, Google Scholar profile, GitHub username, existing website)
2. **Align on Sections**: Present a discovery summary and confirm with the user:
   - Which content collections to enable (`publications`, `talks`, `teaching`, `portfolio`, `blog`)
   - Whether to hide empty sections from navigation or supply draft entries

### Phase 2: Site Identity & Configuration

Execute **Section 1 & Section 4** of [`docs/ONBOARDING.md`](../../../docs/ONBOARDING.md) following [`docs/CONFIG.md`](../../../docs/CONFIG.md):

- Update `src/data/siteConfig.ts` with profile information, verified handles, chosen `theme.light` / `theme.dark` presets, and remove `picker: true`
- Update `src/data/navigation.ts` and `src/pages/sitemap.astro` for enabled sections
- Update `LICENSE` copyright notice while preserving upstream MIT lines
- **Rule**: Never remove, hide, or comment out the template attribution link in `src/components/Footer.astro` pointing to `academicpages-astro`

### Phase 3: Content Population & Demo Purge

Execute **Section 2 & Section 3** of [`docs/ONBOARDING.md`](../../../docs/ONBOARDING.md) following [`docs/CONTENT.md`](../../../docs/CONTENT.md):

- Add each paper with [`.agents/skills/academicpages-add-publication/`](../academicpages-add-publication/SKILL.md), using DOIs or arXiv IDs from the CV or Scholar profile where available
- Populate other research entries, biography (`src/content/pages/about.md`), and CV (`src/pages/cv.astro`)
- Customize `src/content/pages/terms.md` for institutional and hosting requirements
- Purge all demo markdown files, starter PDFs/slides (`public/files/`), and unused starter images (`public/images/`)

### Phase 4: Starter Tooling & Governance Retirement

Execute **Section 5** of [`docs/ONBOARDING.md`](../../../docs/ONBOARDING.md) to retire starter demo tests (`tests/`, `playwright.config.ts`, and the Playwright steps in `.github/workflows/ci.yml` that target demo content) along with optional template governance files, and update the matching commands and references in `AGENTS.md`

### Phase 5: Verification

Execute the verification quality gate from repository root and fix every error:

```bash
pnpm format
pnpm verify
pnpm build
```
