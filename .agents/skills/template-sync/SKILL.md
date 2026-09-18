---
name: academicpages-template-sync
description: Tag-to-tag upstream template upgrade, ephemeral patch generation, dependency synchronization, and verification runbook for Academic Pages Astro
---

# Academic Pages Astro Template Sync Skill 🔄

Operational runbook for AI coding assistants upgrading personalized websites with upstream template improvements from `arghyadipchak/academicpages-astro` across the whole codebase without Git remote pollution.

> 📚 **Canonical Reference Guide**: [`docs/SYNC.md`](../../../docs/SYNC.md)

---

## 1. Upgrade Philosophy & Version Tracking

- **Version Authority**: The `"version"` property in the user's `package.json` records the template release version currently in use (e.g. `"version": "0.2.0"`)
- **Tag-Based Diffs**: Upstream upgrades are computed strictly between version tags (e.g. `v0.2.0` $\rightarrow$ `v0.3.0`)
- **Whole-Codebase Scope**: The diff captures all upstream changes across the entire repository — UI engine, styles, configs, dependencies, documentation, agent skills, and CI workflows
- **Ephemeral Isolation**: The template repository is cloned to `/tmp` solely to generate the diff and is deleted immediately
- **Intelligent Semantic Merging**: The AI assistant inspects the diff chunks, analyzes their semantic intent, and applies all template upgrades while preserving user content and custom profile identity

---

## 2. Autonomous Upgrade Protocol

Follow these sequential steps when prompted to update the site with upstream template improvements:

### Step 1: Detect Current Version Tag

1. Read `"version"` from `package.json` in the workspace root
2. Set `CURRENT_TAG="v${version}"` (e.g. `v0.2.0`)
3. If `"version"` is missing or personalized, prompt the user or allow setting the base tag manually

### Step 2: Ephemeral Bare Clone & Whole-Codebase Patch Generation

Execute the ephemeral clone and generate the complete patch across the entire codebase:

```bash
# 1. Ephemeral bare clone to /tmp (fast, lightweight refs and objects only)
git clone --bare https://github.com/arghyadipchak/academicpages-astro.git /tmp/academicpages-template

# 2. Identify target latest release tag
cd /tmp/academicpages-template
LATEST_TAG=$(git tag --sort=-v:refname | head -n 1)

# 3. Generate patch file across the whole codebase into the personal repository
git diff "$CURRENT_TAG".."$LATEST_TAG" > /path/to/personal-site/template-"$CURRENT_TAG"-to-"$LATEST_TAG".patch

# 4. Clean up temporary clone immediately
rm -rf /tmp/academicpages-template
```

### Step 3: Intelligent Semantic Merging Across Codebase Layers

Read `template-$CURRENT_TAG-to-$LATEST_TAG.patch` and apply changes across all repository layers:

1. **Template Engine & Layouts (`src/components/`, `src/layouts/`, `src/utils/`, `src/pages/api/`)**:
   - Port new UI features, accessibility enhancements, bug fixes, and utility helpers
   - Update component markup and logic to match the new release
2. **Design Tokens & Styles (`src/styles/global.css`)**:
   - Merge new Tailwind v4 theme tokens, CSS variables, and utility classes
   - Preserve any custom color overrides or user style customizations
3. **Agent Skills & Workflows (`.agents/skills/`, `AGENTS.md`)**:
   - Port updated operational skills, improved agent prompts, and workflow refinements
4. **Documentation (`docs/`, `README.md`)**:
   - Update canonical reference guides (`docs/CONFIG.md`, `docs/CONTENT.md`, `docs/MARKDOWN.md`, `docs/SYNC.md`) with upstream documentation additions
5. **Tooling & CI Workflows (`.github/workflows/`, `eslint.config.ts`, `prettier.config.ts`, `tsconfig.json`)**:
   - Upgrade GitHub Actions, linter rules, formatting configurations, and build scripts
6. **Configurations (`astro.config.ts`, `src/content.config.ts`, `src/data/siteConfig.ts`)**:
   - Ingest new schema fields, plugins, or configuration options introduced in the template
   - Preserve user's profile data, verified scholarly handles, custom categories, and navigation links
7. **Dependencies (`package.json`)**:
   - Bump Astro, Tailwind, KaTeX, ESLint, TypeScript, and template packages to upstream target versions
   - Retain any additional custom dependencies installed by the user
8. **Personal Content Isolation (`src/content/`, `public/files/`, `public/images/`)**:
   - Never overwrite, delete, or alter user research papers, talks, teaching, posts, or personal assets
   - Ignore upstream template demo markdown modifications

### Step 4: Bump Version & Clean Up

1. Update `"version"` in `package.json` to match the target release without the `v` prefix (e.g. `"version": "0.3.0"`)
2. Remove the temporary patch file:
   ```bash
   rm template-"$CURRENT_TAG"-to-"$LATEST_TAG".patch
   ```

### Step 5: Verification & Quality Gate

Run the full verification suite to guarantee zero errors or regressions:

```bash
# Install new or upgraded dependencies
pnpm install

# Run quality gate checks (linting, formatting, typecheck)
pnpm verify

# Build static production site
pnpm build
```

3. If `pnpm verify` reports any type errors or lint warnings from ported changes, fix them immediately before completing the upgrade
