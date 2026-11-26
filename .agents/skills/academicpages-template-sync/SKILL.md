---
name: academicpages-template-sync
description: Use when upgrading a personalized Academic Pages Astro site to a newer release of the upstream academicpages-astro template
---

# Academic Pages Astro Template Sync Skill 🔄

Upgrades a personalized site with improvements from `arghyadipchak/academicpages-astro` without adding a Git remote

> 📚 **Canonical Reference Guide**: Follow [`docs/SYNC.md`](../../../docs/SYNC.md) step by step to generate `template-update.patch`, apply it, bump the version and verify

---

## Merge Rules

When applying `template-update.patch`, resolve every hunk with these rules:

- **Port Upstream Improvements**: Merge updates to UI components, layouts, Tailwind styles, utilities, agent skills, documentation, and tooling
- **Preserve User Content**: Never overwrite or delete user files in `src/content/`, `public/files/`, or `public/images/`
- **Keep Retired Files Retired**: Skip hunks for files the user deliberately deleted, such as `tests/`, `playwright.config.ts` or template governance files
- **Preserve Identity**: Retain user profile details in `src/data/siteConfig.ts` and custom navigation in `src/data/navigation.ts`
- **Dependencies**: Upgrade core packages in `package.json` while preserving any additional user-installed packages
- **Clean Up**: Delete `template-update.patch` and any `.rej` files once every hunk is resolved
