import { test, expect } from '@playwright/test';
import { siteConfig } from '../src/data/siteConfig';

const rawUrl = process.env.ASTRO_URL || siteConfig.url;
const parsedBase = rawUrl ? new URL(rawUrl).pathname.replace(/\/+$/, '') : '';

const base = parsedBase.replace(/\/$/, '');
const toUrl = (p: string) => `${base}${p.startsWith('/') ? p : `/${p}`}`;

test.describe('Academic Pages Core UI & Content Tests', () => {
  test('homepage renders correctly with title and article heading', async ({
    page,
  }) => {
    await page.goto(toUrl('/'));
    await expect(page).toHaveTitle(/Academic Pages|Your Name/);
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
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

  test('author profile renders avatar, bio, and links', async ({ page }) => {
    await page.goto(toUrl('/'));
    const authorName = page.locator('h3', { hasText: 'Your Sidebar Name' });
    await expect(authorName).toBeVisible();
    const avatar = page.locator('.author__avatar img');
    await expect(avatar).toBeVisible();
    await expect(avatar).toHaveAttribute('alt', 'Your Sidebar Name');
  });

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

  test('footer renders copyright and sitemap link', async ({ page }) => {
    await page.goto(toUrl('/'));
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer).toContainText('Powered by');
    await expect(footer).toContainText('Sitemap');
  });

  test('all archive pages render correctly', async ({ page }) => {
    const routes = [
      { path: toUrl('/publications/'), heading: 'Publications' },
      { path: toUrl('/talks/'), heading: 'Talks and Presentations' },
      { path: toUrl('/teaching/'), heading: 'Teaching' },
      { path: toUrl('/portfolio/'), heading: 'Portfolio' },
      { path: toUrl('/posts/'), heading: 'Blog Posts' },
      { path: toUrl('/cv/'), heading: 'CV' },
      { path: toUrl('/markdown/'), heading: 'Markdown Guide' },
      { path: toUrl('/sitemap/'), heading: 'Sitemap' },
    ];

    for (const route of routes) {
      await page.goto(route.path);
      const h1 = page.locator('h1').first();
      await expect(h1).toBeVisible();
    }
  });

  test('single item pages render correctly', async ({ page }) => {
    const singleRoutes = [
      toUrl('/posts/2012/08/blog-post-1/'),
      toUrl('/publication/2009-10-01-paper-title-number-1/'),
      toUrl('/talks/2012-03-01-talk-1/'),
      toUrl('/teaching/2014-spring-teaching-1/'),
      toUrl('/portfolio/portfolio-1/'),
    ];

    for (const singlePath of singleRoutes) {
      await page.goto(singlePath);
      const h1 = page.locator('h1').first();
      await expect(h1).toBeVisible();
    }
  });

  test('RSS, Feed, Robots, and Search JSON endpoints return valid 200 response', async ({
    request,
  }) => {
    const rssRes = await request.get(toUrl('/rss.xml'));
    expect(rssRes.status()).toBe(200);
    const rssText = await rssRes.text();
    expect(rssText).toContain('<rss');
    expect(rssText).toContain('Blog Post number 1');

    const feedRes = await request.get(toUrl('/feed.xml'));
    expect(feedRes.status()).toBe(200);
    const feedText = await feedRes.text();
    expect(feedText).toContain('<rss');

    const robotsRes = await request.get(toUrl('/robots.txt'));
    expect(robotsRes.status()).toBe(200);
    const robotsText = await robotsRes.text();
    expect(robotsText).toContain('User-agent: *');
    expect(robotsText).toContain('sitemap-index.xml');

    const searchRes = await request.get(toUrl('/api/search.json'));
    expect(searchRes.status()).toBe(200);
    const searchJson = await searchRes.json();
    expect(Array.isArray(searchJson)).toBeTruthy();
    expect(searchJson.length).toBeGreaterThan(0);
    expect(searchJson[0]).toHaveProperty('title');
    expect(searchJson[0]).toHaveProperty('url');
  });

  test('404 page renders properly', async ({ page }) => {
    const response = await page.goto(toUrl('/404.html'));
    expect([200, 404]).toContain(response?.status());
    const h1 = page.locator('h1', { hasText: 'Page Not Found' });
    await expect(h1).toBeVisible();
  });

  test('semantic landmarks and accessibility checks', async ({ page }) => {
    await page.goto(toUrl('/'));
    await expect(page.locator('header').first()).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('Mobile author profile Follow button toggles social links list', async ({
    page,
    isMobile,
  }) => {
    if (!isMobile) return;
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

  // --- Phase 8: Modern UX & Academic Enhancements Tests ---

  test('Action badges and BibTeX 1-click copy functionality', async ({
    page,
  }) => {
    await page.goto(toUrl('/publications/'));
    const bibtexBtn = page.locator('.bibtex-toggle-btn').first();
    await expect(bibtexBtn).toBeVisible();
    await bibtexBtn.click();

    const bibtexBox = page.locator('.bibtex-box:not(.hidden)').first();
    await expect(bibtexBox).toBeVisible();
    await expect(bibtexBox).toContainText('@article');

    const copyBtn = bibtexBox.locator('.copy-bibtex-btn');
    await expect(copyBtn).toBeVisible();
    await copyBtn.click();
    await expect(copyBtn).toContainText('Copied!');
  });

  test('Publication category filter tabs work interactively', async ({
    page,
  }) => {
    await page.goto(toUrl('/publications/'));
    const confFilterBtn = page.locator('button[data-filter="conferences"]');
    await expect(confFilterBtn).toBeVisible();
    await confFilterBtn.click();

    // Verify Conferences section is visible, and Manuscripts section is hidden
    const confSection = page.locator('section[data-category="conferences"]');
    await expect(confSection).toBeVisible();

    const manuscriptsSection = page.locator(
      'section[data-category="manuscripts"]'
    );
    await expect(manuscriptsSection).toBeHidden();

    // Click 'All' and verify all sections visible again
    const allBtn = page.locator('button[data-filter="all"]');
    await allBtn.click();
    await expect(manuscriptsSection).toBeVisible();
  });

  test('Search modal opens with button and Cmd+K and performs search', async ({
    page,
  }) => {
    await page.goto(toUrl('/'));
    const searchBtn = page.locator('.search-trigger-btn:visible').first();
    await expect(searchBtn).toBeVisible();
    await searchBtn.click();

    const modal = page.locator('#search-modal');
    await expect(modal).toBeVisible();

    const searchInput = page.locator('#search-input');
    await searchInput.fill('Paper Title');

    const resultItem = page.locator('.search-result-item').first();
    await expect(resultItem).toBeVisible();
    await expect(resultItem).toContainText('Paper Title Number 1');

    // Press Escape to close modal
    await page.keyboard.press('Escape');
    await expect(modal).not.toBeVisible();
  });

  test('Table of contents renders on CV and guide pages and is retractable (hidden by default)', async ({
    page,
  }) => {
    await page.goto(toUrl('/cv/'));
    const toc = page.locator('#toc-wrapper');
    await expect(toc).toBeVisible();

    const toggleBtn = page.locator('#toc-toggle-btn');
    const collapseWrapper = page.locator('#toc-collapse-wrapper');

    // 1. Initial state: collapsed by default
    await expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');
    await expect(collapseWrapper).not.toBeVisible();

    // 2. Click to expand
    await toggleBtn.click();
    await expect(toggleBtn).toHaveAttribute('aria-expanded', 'true');
    await expect(collapseWrapper).toBeVisible();
    await expect(toc).toContainText('Education');
    await expect(toc).toContainText('Publications');

    const tocLinks = page.locator('.toc-link');
    const count = await tocLinks.count();
    expect(count).toBeGreaterThanOrEqual(4);

    // 3. Click to retract / collapse
    await toggleBtn.click();
    await expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');
    await expect(collapseWrapper).not.toBeVisible();
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

  test('Markdown guide renders KaTeX math, syntax highlighted code, notices, and copy buttons', async ({
    page,
    isMobile,
  }) => {
    await page.goto(toUrl('/markdown/'));

    // 1. KaTeX Math equations rendered server-side
    const katexDisplay = page.locator('.katex-display').first();
    await expect(katexDisplay).toBeVisible();

    // 2. Syntax-highlighted code blocks
    const astroCode = page.locator('pre.astro-code:visible').first();
    await expect(astroCode).toBeVisible();

    // 3. Notice Callouts
    const notice = page.locator('.notice').first();
    await expect(notice).toBeVisible();

    // 4. Code copy buttons
    const copyBtn = astroCode.locator('.code-copy-btn');
    if (!isMobile) {
      await astroCode.hover();
      await expect(copyBtn).toBeVisible();
      await copyBtn.click();
      await expect(copyBtn).toContainText('Copied!');
    } else {
      await expect(copyBtn).toBeAttached();
    }

    // 5. Heading anchor links
    const headingAnchor = page.locator('.heading-anchor').first();
    await expect(headingAnchor).toBeAttached();

    // 6. Semantic HTML tags: blockquote, q, cite, abbr
    await expect(page.locator('blockquote').first()).toBeVisible();
    await expect(page.locator('q').first()).toBeVisible();
    await expect(page.locator('cite').first()).toBeVisible();
    await expect(page.locator('abbr').first()).toBeVisible();
  });

  test('Frontmatter math ($E=mc^2$) compiles to KaTeX in titles and archive listings', async ({
    page,
  }) => {
    await page.goto(toUrl('/publications/'));
    const pubWithMath = page.locator('a:has-text("Paper Title Number 5")');
    await expect(pubWithMath).toBeVisible();
    await expect(pubWithMath.locator('.katex')).toBeVisible();

    await page.goto(toUrl('/publication/2025-06-08-paper-title-number-5/'));
    const h1 = page.locator('h1[itemprop="headline"]');
    await expect(h1).toBeVisible();
    await expect(h1.locator('.katex')).toBeVisible();
  });

  test('CV page breadcrumbs format acronyms like CV in uppercase', async ({
    page,
  }) => {
    await page.goto(toUrl('/cv/'));
    const breadcrumbs = page.locator('nav[aria-label="Breadcrumbs"]');
    await expect(breadcrumbs).toBeVisible();
    await expect(breadcrumbs).toContainText('Home');
    await expect(breadcrumbs).toContainText('CV');
  });

  test('Mermaid diagrams and Plotly graphs render with collapsible source code viewers', async ({
    page,
  }) => {
    await page.goto(toUrl('/markdown/'));

    // 1. Mermaid diagram
    const mermaidDiagram = page.locator('.mermaid-diagram').first();
    await expect(mermaidDiagram).toBeVisible();
    const mermaidDetails = page.locator('.mermaid-wrapper details').first();
    await expect(mermaidDetails).toBeAttached();

    // 2. Plotly chart
    const plotlyContainer = page.locator('.plotly-container').first();
    await expect(plotlyContainer).toBeVisible();
    const plotlyDetails = page.locator('.plotly-wrapper details').first();
    await expect(plotlyDetails).toBeAttached();
  });

  test('Markdown tables are automatically wrapped in responsive .table-wrapper containers', async ({
    page,
  }) => {
    await page.goto(toUrl('/markdown/'));
    const tableWrapper = page.locator('.table-wrapper').first();
    await expect(tableWrapper).toBeVisible();
    const table = tableWrapper.locator('table');
    await expect(table).toBeVisible();
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

  test('CV page list styles, nested list markers, and compact item spacings render correctly', async ({
    page,
  }) => {
    await page.goto(toUrl('/cv/'));

    // Top-level lists should render with disc markers
    const topUl = page.locator('.cv-content section ul').first();
    await expect(topUl).toBeVisible();
    const topUlStyle = await topUl.evaluate(
      (el) => window.getComputedStyle(el).listStyleType
    );
    expect(topUlStyle).toBe('disc');

    // Nested lists under work experience should render with circle markers
    const nestedUl = page.locator('.cv-content ul ul').first();
    await expect(nestedUl).toBeVisible();
    const nestedUlStyle = await nestedUl.evaluate(
      (el) => window.getComputedStyle(el).listStyleType
    );
    expect(nestedUlStyle).toBe('circle');

    // Publication citation should have compact top margin (not standard large prose margin)
    const citationP = page
      .locator('.cv-content section:has-text("Publications") li p')
      .first();
    await expect(citationP).toBeVisible();
    const pMargin = await citationP.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return {
        marginTop: parseFloat(style.marginTop),
        marginBottom: parseFloat(style.marginBottom),
      };
    });
    expect(pMargin.marginTop).toBeLessThanOrEqual(6);
    expect(pMargin.marginBottom).toBe(0);

    // Publication citation should be grouped closer to its title than to the subsequent publication
    const pubItems = page.locator(
      '.cv-content section:has-text("Publications") li'
    );
    const a1Box = await pubItems.nth(0).locator('a').boundingBox();
    const p1Box = await pubItems.nth(0).locator('p').boundingBox();
    const a2Box = await pubItems.nth(1).locator('a').boundingBox();
    expect(a1Box).not.toBeNull();
    expect(p1Box).not.toBeNull();
    expect(a2Box).not.toBeNull();
    if (a1Box && p1Box && a2Box) {
      const titleToSubtitle = p1Box.y - (a1Box.y + a1Box.height);
      const subtitleToNextTitle = a2Box.y - (p1Box.y + p1Box.height);
      expect(subtitleToNextTitle).toBeGreaterThan(titleToSubtitle * 2);
    }
  });

  test('Site-wide prose lists render multi-level markers and balanced item spacing', async ({
    page,
  }) => {
    await page.goto(toUrl('/markdown/'));

    // Unordered list multi-level markers: disc -> circle -> square
    const l1Ul = page.locator('.prose ul').first();
    await expect(l1Ul).toBeVisible();
    const l1Marker = await l1Ul.evaluate(
      (el) => window.getComputedStyle(el).listStyleType
    );
    expect(l1Marker).toBe('disc');

    const l2Ul = page.locator('.prose ul ul').first();
    await expect(l2Ul).toBeVisible();
    const l2Marker = await l2Ul.evaluate(
      (el) => window.getComputedStyle(el).listStyleType
    );
    expect(l2Marker).toBe('circle');

    const l3Ul = page.locator('.prose ul ul ul').first();
    await expect(l3Ul).toBeVisible();
    const l3Marker = await l3Ul.evaluate(
      (el) => window.getComputedStyle(el).listStyleType
    );
    expect(l3Marker).toBe('square');

    // Ordered list multi-level markers: decimal -> lower-alpha -> lower-roman
    const l1Ol = page.locator('.prose ol').first();
    await expect(l1Ol).toBeVisible();
    const l1OlMarker = await l1Ol.evaluate(
      (el) => window.getComputedStyle(el).listStyleType
    );
    expect(l1OlMarker).toBe('decimal');

    const l2Ol = page.locator('.prose ol ol').first();
    await expect(l2Ol).toBeVisible();
    const l2OlMarker = await l2Ol.evaluate(
      (el) => window.getComputedStyle(el).listStyleType
    );
    expect(l2OlMarker).toBe('lower-alpha');

    const l3Ol = page.locator('.prose ol ol ol').first();
    await expect(l3Ol).toBeVisible();
    const l3OlMarker = await l3Ol.evaluate(
      (el) => window.getComputedStyle(el).listStyleType
    );
    expect(l3OlMarker).toBe('lower-roman');

    // Balanced vertical rhythm: list item margins should be compact (<= 6px)
    const liItem = page.locator('.prose li').first();
    await expect(liItem).toBeVisible();
    const liMargins = await liItem.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return {
        marginTop: parseFloat(style.marginTop),
        marginBottom: parseFloat(style.marginBottom),
      };
    });
    expect(liMargins.marginTop).toBeLessThanOrEqual(6);
    expect(liMargins.marginBottom).toBeLessThanOrEqual(6);
  });

  test('Heading scales, callout internal margins, definition lists, and portfolio spacing render correctly', async ({
    page,
  }) => {
    await page.goto(toUrl('/markdown/'));

    // 1. Heading scales and margins (h4, h5, h6)
    const h4 = page.locator('.prose h4').first();
    await expect(h4).toBeVisible();
    const h4Styles = await h4.evaluate((el) => {
      const s = window.getComputedStyle(el);
      return {
        fontSize: parseFloat(s.fontSize),
        marginTop: parseFloat(s.marginTop),
      };
    });
    expect(h4Styles.fontSize).toBeGreaterThanOrEqual(16);
    expect(h4Styles.marginTop).toBeGreaterThan(0);

    const h5 = page.locator('.prose h5').first();
    await expect(h5).toBeVisible();
    const h5Styles = await h5.evaluate((el) => {
      const s = window.getComputedStyle(el);
      return {
        fontSize: parseFloat(s.fontSize),
        marginTop: parseFloat(s.marginTop),
      };
    });
    expect(h5Styles.fontSize).toBeGreaterThanOrEqual(15);
    expect(h5Styles.marginTop).toBeGreaterThan(0);

    const h6 = page.locator('.prose h6').first();
    await expect(h6).toBeVisible();
    const h6Styles = await h6.evaluate((el) => {
      const s = window.getComputedStyle(el);
      return {
        fontSize: parseFloat(s.fontSize),
        marginTop: parseFloat(s.marginTop),
        textTransform: s.textTransform,
      };
    });
    expect(h6Styles.fontSize).toBeGreaterThanOrEqual(13);
    expect(h6Styles.marginTop).toBeGreaterThan(0);
    expect(h6Styles.textTransform).toBe('uppercase');

    // 2. Callout notice child margins
    const notice = page.locator('.notice').first();
    await expect(notice).toBeVisible();
    const noticeChildMargins = await notice.evaluate((el) => {
      const first = el.firstElementChild;
      const last = el.lastElementChild;
      return {
        firstTop: first
          ? parseFloat(window.getComputedStyle(first).marginTop)
          : 0,
        lastBottom: last
          ? parseFloat(window.getComputedStyle(last).marginBottom)
          : 0,
      };
    });
    expect(noticeChildMargins.firstTop).toBe(0);
    expect(noticeChildMargins.lastBottom).toBe(0);

    // 3. Definition list indentation
    const dd = page.locator('.prose dd').first();
    await expect(dd).toBeVisible();
    const ddStyles = await dd.evaluate((el) => {
      const s = window.getComputedStyle(el);
      return {
        marginLeft: parseFloat(s.marginLeft),
        paddingLeft: parseFloat(s.paddingLeft),
      };
    });
    expect(ddStyles.marginLeft).toBeLessThanOrEqual(24);
    expect(ddStyles.paddingLeft).toBe(0);

    // 4. Portfolio card padding
    await page.goto(toUrl('/portfolio/'));
    const portfolioItem = page.locator('.archive__item').first();
    await expect(portfolioItem).toBeVisible();
    const portfolioPadding = await portfolioItem.evaluate((el) => {
      const s = window.getComputedStyle(el);
      return parseFloat(s.paddingBottom);
    });
    expect(portfolioPadding).toBeGreaterThanOrEqual(24);
  });

  test('Footnotes section, in-text references, and return links render correctly', async ({
    page,
  }) => {
    await page.goto(toUrl('/markdown/'));

    // 1. In-text footnote references
    const ref1 = page.locator('a[data-footnote-ref]').first();
    await expect(ref1).toBeVisible();
    const refStyles = await ref1.evaluate((el) => {
      const s = window.getComputedStyle(el);
      const before = window.getComputedStyle(el, '::before');
      const after = window.getComputedStyle(el, '::after');
      return {
        fontWeight: s.fontWeight,
        textDecorationLine: s.textDecorationLine,
        beforeContent: before.content,
        afterContent: after.content,
      };
    });
    expect(parseInt(refStyles.fontWeight, 10)).toBeGreaterThanOrEqual(600);
    expect(refStyles.beforeContent).toContain('[');
    expect(refStyles.afterContent).toContain(']');

    // 2. Footnotes section container and header
    const fnSection = page.locator('.footnotes, [data-footnotes]');
    await expect(fnSection).toBeVisible();
    const fnLabel = fnSection.locator('#footnote-label');
    await expect(fnLabel).toBeVisible();
    const fnLabelStyles = await fnLabel.evaluate((el) => {
      const s = window.getComputedStyle(el);
      return {
        textTransform: s.textTransform,
        fontSize: parseFloat(s.fontSize),
      };
    });
    expect(fnLabelStyles.textTransform).toBe('uppercase');
    expect(fnLabelStyles.fontSize).toBeLessThanOrEqual(15);

    // 3. Footnote list item sizing and backreference return link
    const fnItem = fnSection.locator('li').first();
    await expect(fnItem).toBeVisible();
    const fnItemStyles = await fnItem.evaluate((el) => {
      const s = window.getComputedStyle(el);
      return {
        fontSize: parseFloat(s.fontSize),
      };
    });
    expect(fnItemStyles.fontSize).toBeLessThanOrEqual(14);

    const backref = fnItem.locator('a.data-footnote-backref');
    await expect(backref).toBeVisible();
    const backrefStyles = await backref.evaluate((el) => {
      const s = window.getComputedStyle(el);
      return {
        marginLeft: parseFloat(s.marginLeft),
      };
    });
    expect(backrefStyles.marginLeft).toBeGreaterThanOrEqual(4);

    // 4. Click navigation
    await ref1.click();
    expect(page.url()).toContain('#user-content-fn-1');

    await backref.click();
    expect(page.url()).toContain('#user-content-fnref-1');
  });
});
