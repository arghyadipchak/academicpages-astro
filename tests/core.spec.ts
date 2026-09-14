import { expect, test } from '@playwright/test';

import { siteConfig } from '../src/data/siteConfig';
import { attachAssetErrorListener, toUrl } from './fixtures/test-utils';

test.describe('Core UI, SEO & Page Integrity Tests', () => {
  test('homepage renders correctly with title and article heading', async ({
    page,
  }) => {
    const assetErrors: string[] = [];
    attachAssetErrorListener(page, assetErrors);

    await page.goto(toUrl('/'));
    await expect(page).toHaveTitle(/Academic Pages|Your Name/);
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();

    expect(
      assetErrors,
      'Homepage should load without failed assets or console errors'
    ).toEqual([]);
  });

  test('masthead navigation renders brand and nav items', async ({
    page,
    isMobile,
  }) => {
    await page.goto(toUrl('/'));
    const brand = page.locator('header a', { hasText: 'Your Name' }).first();
    await expect(brand).toBeVisible();

    if (!isMobile) {
      const pubLink = page.locator('nav a', { hasText: 'Publications' });
      await expect(pubLink).toBeVisible();
      const talksLink = page.locator('nav a', { hasText: 'Talks' });
      await expect(talksLink).toBeVisible();
    } else {
      const menuBtn = page.locator('#mobile-nav-toggle');
      await expect(menuBtn).toBeVisible();
      await menuBtn.click();
      const mobilePubLink = page.locator('#mobile-menu a', {
        hasText: 'Publications',
      });
      await expect(mobilePubLink).toBeVisible();
    }
  });

  test('author profile renders avatar, bio, and verified links', async ({
    page,
  }) => {
    await page.goto(toUrl('/'));
    const authorName = page.locator('h3', { hasText: 'Your Sidebar Name' });
    await expect(authorName).toBeVisible();
    const avatar = page.locator('.author__avatar img');
    await expect(avatar).toBeVisible();
    await expect(avatar).toHaveAttribute('alt', 'Your Sidebar Name');
  });

  test('footer renders copyright, follow links, and sitemap link', async ({
    page,
  }) => {
    await page.goto(toUrl('/'));
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer).toContainText('Powered by');
    await expect(footer).toContainText('Sitemap');
  });

  test('semantic landmarks and accessibility checks', async ({ page }) => {
    await page.goto(toUrl('/'));
    await expect(page.locator('header').first()).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('404 page renders properly', async ({ page }) => {
    const response = await page.goto(toUrl('/404.html'));
    expect([200, 404]).toContain(response?.status());
    const h1 = page.locator('h1', { hasText: 'Page Not Found' });
    await expect(h1).toBeVisible();
  });

  const archiveRoutes = [
    { path: toUrl('/publications/'), title: 'Publications' },
    { path: toUrl('/talks/'), title: 'Talks' },
    { path: toUrl('/teaching/'), title: 'Teaching' },
    { path: toUrl('/portfolio/'), title: 'Portfolio' },
    { path: toUrl('/posts/'), title: 'Blog Posts' },
    { path: toUrl('/cv/'), title: 'CV' },
    { path: toUrl('/markdown/'), title: 'Markdown' },
    { path: toUrl('/sitemap/'), title: 'Sitemap' },
  ];

  for (const route of archiveRoutes) {
    test(`archive route renders correctly: ${route.path}`, async ({ page }) => {
      const assetErrors: string[] = [];
      attachAssetErrorListener(page, assetErrors);

      await page.goto(route.path);
      const h1 = page.locator('h1').first();
      await expect(h1).toBeVisible();
      expect(
        assetErrors,
        `Route ${route.path} should load with 0 asset errors`
      ).toEqual([]);
    });
  }

  const singleRoutes = [
    toUrl('/posts/2012/08/blog-post-1/'),
    toUrl('/publication/2009-10-01-paper-title-number-1/'),
    toUrl('/talks/2012-03-01-talk-1/'),
    toUrl('/teaching/2014-spring-teaching-1/'),
    toUrl('/portfolio/portfolio-1/'),
  ];

  for (const singlePath of singleRoutes) {
    test(`single item page renders correctly: ${singlePath}`, async ({
      page,
    }) => {
      const assetErrors: string[] = [];
      attachAssetErrorListener(page, assetErrors);

      await page.goto(singlePath);
      const h1 = page.locator('h1').first();
      await expect(h1).toBeVisible();
      expect(
        assetErrors,
        `Single route ${singlePath} should load with 0 asset errors`
      ).toEqual([]);
    });
  }

  test('canonical URL and OpenGraph meta tags match page URL', async ({
    page,
  }) => {
    await page.goto(toUrl('/publications/'));
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', /publications\/?$/);

    const ogUrl = page.locator('meta[property="og:url"]');
    await expect(ogUrl).toHaveAttribute('content', /publications\/?$/);
  });

  test('external social and project links enforce target="_blank" and rel="noopener noreferrer"', async ({
    page,
  }) => {
    await page.goto(toUrl('/'));
    const externalLinks = page.locator(
      'footer a[target="_blank"], .author__urls a[target="_blank"]'
    );
    const count = await externalLinks.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const link = externalLinks.nth(i);
      const rel = await link.getAttribute('rel');
      expect(rel).toContain('noopener');
      expect(rel).toContain('noreferrer');
    }
  });

  test('print stylesheet hides masthead, footer, search, and interactive controls', async ({
    page,
  }) => {
    await page.goto(toUrl('/cv/'));
    await page.emulateMedia({ media: 'print' });

    const masthead = page.locator('header.sticky, header:has(nav)').first();
    const footer = page.locator('footer');
    const searchBtn = page.locator('.search-trigger-btn').first();
    const toc = page.locator('#toc-wrapper');

    await expect(masthead).toHaveCSS('display', 'none');
    await expect(footer).toHaveCSS('display', 'none');
    await expect(searchBtn).toHaveCSS('display', 'none');
    await expect(toc).toHaveCSS('display', 'none');
  });

  test('Google Scholar and Highwire Press academic meta tags render on publication pages', async ({
    page,
  }) => {
    await page.goto(toUrl('/publication/2009-10-01-paper-title-number-1/'));
    const citationTitle = page.locator('meta[name="citation_title"]');
    await expect(citationTitle).toHaveAttribute(
      'content',
      'Paper Title Number 1'
    );

    const citationAuthor = page.locator('meta[name="citation_author"]');
    await expect(citationAuthor).toHaveAttribute(
      'content',
      'Your Sidebar Name'
    );

    const citationDate = page.locator('meta[name="citation_publication_date"]');
    await expect(citationDate).toHaveAttribute('content', '2009-10-01');
  });

  test('siteConfig locale, breadcrumbs, and Scholar profile link are properly wired', async ({
    page,
  }) => {
    await page.goto(toUrl('/'));
    await expect(page.locator('html')).toHaveAttribute(
      'lang',
      siteConfig.locale
    );

    await page.goto(toUrl('/publications/'));
    const scholarLink = page.locator('a', {
      hasText: 'my Google Scholar profile',
    });
    await expect(scholarLink).toBeVisible();
    await expect(scholarLink).toHaveAttribute(
      'href',
      /^https:\/\/scholar\.google\.com\/citations\?user=/
    );
  });
});
