# 📋 Site Personalization & Cleanup Checklist

Follow this checklist to convert the starter template into your personal academic website. Once you have completed all tasks, delete this file (`rm docs/CHECKLIST.md`) so your personal site repository remains clean.

---

## 1. Site Identity & Author Profile

- [ ] **Site Configuration**: Edit `src/data/siteConfig.ts` to update `title`, `description`, and `url` (see [`docs/CONFIG.md`](file:///docs/CONFIG.md))
- [ ] **Author Bio & Details**: In `src/data/siteConfig.ts`, update `author.name`, `author.bio`, `author.location`, `author.employer`, and `author.email`
- [ ] **Academic & Social Handles**: In `src/data/siteConfig.ts`, add your usernames or profile URLs for `googlescholar`, `orcid`, `github`, `linkedin`, `x`, etc.
- [ ] **Profile Photo**: Replace `public/images/profile.png` with your personal square headshot (~500x500px)

---

## 2. Content Migration & Demo Purge

- [ ] **Publications**: Delete demo files in `src/content/publications/2024-03-15-paper-*.md` and add your research papers (see [`docs/CONTENT.md`](file:///docs/CONTENT.md))
- [ ] **Talks & Presentations**: Delete demo files in `src/content/talks/2024-02-01-talk-*.md` or populate with your presentations
- [ ] **Teaching**: Delete demo files in `src/content/teaching/2024-01-10-course-*.md` or populate with your courses
- [ ] **Portfolio Projects**: Delete demo files in `src/content/portfolio/portfolio-*.md` or populate with your software/research projects
- [ ] **Blog Posts**: Delete demo files in `src/content/blog/2024-*-blog-post-*.md` or populate with your posts
- [ ] **Markdown Guide**: Delete `src/content/pages/markdown.md` (formatting demo page)
- [ ] **Homepage Bio**: Update `src/pages/index.astro` with your biography and research interests
- [ ] **CV**: Update `src/pages/cv.astro` (education, appointments, awards, service)

---

## 3. Demo Assets Cleanup

- [ ] **Sample PDFs & Slides**: Delete starter files in `public/files/`:
  - `paper1.pdf`, `paper2.pdf`, `paper3.pdf`, `paper4.pdf`
  - `slides1.pdf`, `slides2.pdf`, `slides3.pdf`, `slides4.pdf`
- [ ] **Sample Images**: Delete unused starter images in `public/images/`:
  - `bio-photo.jpg`, `bio-photo-2.jpg`, `editing-talk.png`, `500x300.png`

---

## 4. Navigation & Route Pruning

- [ ] **Remove Guide Link**: Delete `{ title: 'Guide', url: '/markdown/' }` from `src/data/navigation.ts`
- [ ] **Prune Unused Sections**: In `src/data/navigation.ts`, remove links to any collections you do not use (e.g. remove `Teaching` or `Talks`)
- [ ] **Clean Legacy Redirects**: In `astro.config.ts`, remove legacy redirects (`/wordpress/blog-posts/`, `/year-archive/`, `/guide`, `/md`) unless you are porting an existing Jekyll site with live inbound links (see [`docs/CONFIG.md`](file:///docs/CONFIG.md))

---

## 5. Retiring Playwright Tests (Recommended for Personal Repos)

The starter Playwright tests assert demo text (e.g. `'Your Name'`, `'Paper Title Number 1'`) and install browser binaries that add 2–4 minutes to GitHub Actions deployments. For a customized personal site, retire them:

1. **Delete Test Files**:

   ```bash
   rm -rf tests/ playwright.config.ts
   ```

2. **Update `package.json`**:
   - Remove `"test": "playwright test"` from `"scripts"`
   - Remove `@playwright/test` from `"devDependencies"`

3. **Update `.github/workflows/ci.yml`**:
   - Delete the `Install Playwright browsers` and `Run tests` steps:
     ```yaml
     - name: Install Playwright browsers
       run: pnpm exec playwright install --with-deps chromium

     - name: Run tests
       env:
         ASTRO_URL: ${{ steps.pages.outputs.base_url }}
       run: pnpm test
     ```

4. **Verify Quality Pipeline**:
   - Use `pnpm verify` (`astro check` + `eslint` + `prettier:check`) and `pnpm build`
   - This ensures strict schema validation, type safety, and error-free static HTML compilation without brittle browser assertions

---

## 6. Self-Destruct / Checklist Removal

Once you have completed and verified all the steps above:

- [ ] Delete this file:
  ```bash
  rm docs/CHECKLIST.md
  ```
