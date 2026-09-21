import { expect, test } from '@playwright/test';

import { toUrl } from './fixtures/test-utils';

test.describe('Client-Side Interactive Components Tests', () => {
  test('theme toggle changes data-theme attribute and persists', async ({
    page,
  }) => {
    await page.goto(toUrl('/'));
    const initialTheme =
      (await page.locator('html').getAttribute('data-theme')) || 'light';
    const toggleBtn = page.locator('.theme-toggle-btn:visible').first();
    await expect(toggleBtn).toBeVisible();
    await toggleBtn.click();
    await expect(page.locator('html')).not.toHaveAttribute(
      'data-theme',
      initialTheme
    );

    const newTheme = await page.locator('html').getAttribute('data-theme');

    // Reload page to verify persistence in localStorage
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', newTheme!);
  });

  test('search modal opens with Cmd+K, supports ArrowDown/Up selection, and navigates with Enter', async ({
    page,
    isMobile,
  }) => {
    await page.goto(toUrl('/'));

    // Open via Cmd+K / Ctrl+K
    await page.keyboard.press('ControlOrMeta+KeyK');
    const modal = page.locator('#search-modal');
    await expect(modal).toBeVisible();

    const searchInput = page.locator('#search-input');
    await searchInput.fill('Paper Title');

    const resultItem = page.locator('.search-result-item').first();
    await expect(resultItem).toBeVisible();
    await expect(resultItem).toContainText('Paper Title Number 1');

    if (!isMobile) {
      // Keyboard selection via ArrowDown
      await page.keyboard.press('ArrowDown');
      await expect(resultItem).toHaveClass(/ring-1/);

      // Keyboard navigation via Enter
      await page.keyboard.press('Enter');
      await expect(page).toHaveURL(/publications\/paper-1/);
    } else {
      // Close modal on mobile
      await page.keyboard.press('Escape');
      await expect(modal).not.toBeVisible();
    }
  });

  test('search modal opens with button and closes with Escape', async ({
    page,
  }) => {
    await page.goto(toUrl('/'));
    const searchBtn = page.locator('.search-trigger-btn:visible').first();
    await expect(searchBtn).toBeVisible();
    await searchBtn.click();

    const modal = page.locator('#search-modal');
    await expect(modal).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(modal).not.toBeVisible();
  });

  test('search modal traps focus within dialog when open', async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, 'Desktop focus trapping test');

    await page.goto(toUrl('/'));
    const searchBtn = page.locator('.search-trigger-btn:visible').first();
    await searchBtn.click();

    const modal = page.locator('#search-modal');
    await expect(modal).toBeVisible();

    const searchInput = page.locator('#search-input');
    await expect(searchInput).toBeFocused();

    // Tab to next focusable element (close button)
    await page.keyboard.press('Tab');
    const closeBtn = page.locator('#search-close-btn');
    await expect(closeBtn).toBeFocused();

    // Tab again should wrap around to first focusable element (searchInput)
    await page.keyboard.press('Tab');
    await expect(searchInput).toBeFocused();

    // Shift+Tab should wrap in reverse to close button
    await page.keyboard.press('Shift+Tab');
    await expect(closeBtn).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(modal).not.toBeVisible();
  });

  test('Table of contents renders on CV and guide pages and is retractable', async ({
    page,
  }) => {
    await page.goto(toUrl('/cv/'));
    const toc = page.locator('#toc-wrapper');
    await expect(toc).toBeVisible();

    const toggleBtn = page.locator('#toc-toggle-btn');
    const collapseWrapper = page.locator('#toc-collapse-wrapper');

    // Initial state: collapsed by default
    await expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');
    await expect(collapseWrapper).not.toBeVisible();

    // Click to expand
    await toggleBtn.click();
    await expect(toggleBtn).toHaveAttribute('aria-expanded', 'true');
    await expect(collapseWrapper).toBeVisible();
    await expect(toc).toContainText('Education');
    await expect(toc).toContainText('Publications');

    const tocLinks = page.locator('.toc-link');
    const count = await tocLinks.count();
    expect(count).toBeGreaterThanOrEqual(4);

    // Click to retract / collapse
    await toggleBtn.click();
    await expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');
    await expect(collapseWrapper).not.toBeVisible();
  });

  test('Action badges and BibTeX 1-click copy functionality', async ({
    page,
  }) => {
    await page.goto(toUrl('/publications/'));

    // Verify publications with bibtex have the toggle button (paper 1 and book 1)
    const bibtexButtons = page.locator('.bibtex-toggle-btn');
    await expect(bibtexButtons).toHaveCount(2);

    const bibtexBtn = bibtexButtons.first();
    await expect(bibtexBtn).toBeVisible();
    await bibtexBtn.click();

    const bibtexBox = page.locator('.bibtex-box:not(.hidden)').first();
    await expect(bibtexBox).toBeVisible();
    await expect(bibtexBox).toContainText('@');
    const bibtexText = await bibtexBox.locator('code').first().innerText();
    expect(bibtexText.startsWith('@')).toBe(true);

    const copyBtn = bibtexBox.locator('.copy-bibtex-btn');
    await expect(copyBtn).toBeVisible();
    await copyBtn.click();
    await expect(copyBtn).toContainText('Copied!');

    const downloadLink = bibtexBox.locator('a[download="citation.bib"]');
    await expect(downloadLink).toBeVisible();

    // Verify Code badge is rendered and links to code_url
    const codeBadge = page.locator('a:has-text("Code")').first();
    await expect(codeBadge).toBeVisible();
    await expect(codeBadge).toHaveAttribute(
      'href',
      'https://github.com/arghyadipchak/academicpages-astro'
    );
  });

  test('Publication category filter tabs work interactively', async ({
    page,
  }) => {
    await page.goto(toUrl('/publications/'));
    const confFilterBtn = page.locator('button[data-filter="conferences"]');
    await expect(confFilterBtn).toBeVisible();
    await confFilterBtn.click();

    // Verify Conferences section is visible, and Journals section is hidden
    const confSection = page.locator('section[data-category="conferences"]');
    await expect(confSection).toBeVisible();

    const journalsSection = page.locator('section[data-category="journals"]');
    await expect(journalsSection).toBeHidden();

    // Click 'All' and verify all sections visible again
    const allBtn = page.locator('button[data-filter="all"]');
    await allBtn.click();
    await expect(journalsSection).toBeVisible();
  });

  test('Mobile author profile Follow button toggles social links list', async ({
    page,
    isMobile,
  }) => {
    test.skip(!isMobile, 'Mobile-only author profile test');

    await page.goto(toUrl('/'));
    const followBtn = page.locator('#author-urls-toggle');
    const urlsList = page.locator('#author-urls-list');

    await expect(followBtn).toBeVisible();
    await expect(urlsList).toHaveClass(/hidden/);

    await followBtn.click();
    await expect(urlsList).not.toHaveClass(/hidden/);

    await followBtn.click();
    await expect(urlsList).toHaveClass(/hidden/);
  });

  test('Reading progress bar updates width on scroll on article pages', async ({
    page,
  }) => {
    await page.goto(toUrl('/markdown/'));
    const progressBar = page.locator('#reading-progress');
    await expect(progressBar).toBeAttached();

    // Scroll down to middle of page
    await page.evaluate(() =>
      window.scrollTo(0, document.body.scrollHeight / 2)
    );
    await page.waitForTimeout(100);

    const widthStyle = await progressBar.getAttribute('style');
    expect(widthStyle).toMatch(/width:\s*\d+(\.\d+)?%/);
  });
});
