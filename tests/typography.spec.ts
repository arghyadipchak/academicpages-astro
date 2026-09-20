import { expect, test } from '@playwright/test';

import { toUrl } from './fixtures/test-utils';

test.describe('Typography, Lists & Mathematical Layout Tests', () => {
  test('CV page list styles, nested list markers, and compact item spacings render correctly', async ({
    page,
  }) => {
    await page.goto(toUrl('/cv/'));

    // Breadcrumbs format acronyms like CV in uppercase
    const breadcrumbs = page.locator('nav[aria-label="Breadcrumbs"]');
    await expect(breadcrumbs).toBeVisible();
    await expect(breadcrumbs).toContainText('CV');

    // Top-level lists render with disc markers
    const topUl = page.locator('.cv-content section ul').first();
    await expect(topUl).toBeVisible();
    const topUlStyle = await topUl.evaluate(
      (el) => window.getComputedStyle(el).listStyleType
    );
    expect(topUlStyle).toBe('disc');

    // Nested lists under work experience render with circle markers
    const nestedUl = page.locator('.cv-content ul ul').first();
    await expect(nestedUl).toBeVisible();
    const nestedUlStyle = await nestedUl.evaluate(
      (el) => window.getComputedStyle(el).listStyleType
    );
    expect(nestedUlStyle).toBe('circle');

    // Publication citation has compact top margin and zero bottom margin
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

    // Publication citation grouped closer to its title than to the next publication (> 2:1 ratio)
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

  test('Markdown guide rich elements, typography, and media render correctly in a single pass', async ({
    page,
    isMobile,
  }) => {
    await page.goto(toUrl('/markdown/'));

    // 1. KaTeX Math equations rendered server-side
    const katexDisplay = page.locator('.katex-display').first();
    await expect(katexDisplay).toBeVisible();

    // 2. Syntax-highlighted code blocks with copy buttons
    const astroCode = page
      .locator('pre.astro-code:not([data-language="mermaid"]):visible')
      .first();
    await expect(astroCode).toBeVisible();
    const copyBtn = astroCode.locator('.code-copy-btn');
    if (!isMobile) {
      await astroCode.scrollIntoViewIfNeeded();
      await astroCode.hover();
      await expect(copyBtn).toBeVisible();
      await copyBtn.click();
      await expect(copyBtn).toContainText('Copied!');
      const announcer = page.locator('#a11y-announcer');
      await expect(announcer).toContainText('Code copied to clipboard');
    } else await expect(copyBtn).toBeAttached();

    // 3. Notice Callouts and first/last child margin containment
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

    // 4. Semantic HTML tags
    await expect(page.locator('blockquote').first()).toBeVisible();
    await expect(page.locator('q').first()).toBeVisible();
    await expect(page.locator('cite').first()).toBeVisible();
    await expect(page.locator('abbr').first()).toBeVisible();

    // 5. Mermaid diagrams and Plotly charts
    const mermaidDiagram = page.locator('.mermaid-diagram').first();
    await expect(mermaidDiagram).toBeVisible();
    const mermaidDetails = page.locator('.mermaid-wrapper details').first();
    await expect(mermaidDetails).toBeAttached();

    const plotlyContainer = page.locator('.plotly-container').first();
    await expect(plotlyContainer).toBeVisible();
    const plotlyDetails = page.locator('.plotly-wrapper details').first();
    await expect(plotlyDetails).toBeAttached();

    // 6. Responsive .table-wrapper around markdown tables
    const tableWrapper = page.locator('.table-wrapper').first();
    await expect(tableWrapper).toBeVisible();
    await expect(tableWrapper.locator('table')).toBeVisible();

    // 7. Definition lists indentation
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

    // 8. Unordered list multi-level markers: disc -> circle -> square
    const l1Ul = page.locator('.prose ul').first();
    await expect(l1Ul).toBeVisible();
    expect(
      await l1Ul.evaluate((el) => window.getComputedStyle(el).listStyleType)
    ).toBe('disc');

    const l2Ul = page.locator('.prose ul ul').first();
    await expect(l2Ul).toBeVisible();
    expect(
      await l2Ul.evaluate((el) => window.getComputedStyle(el).listStyleType)
    ).toBe('circle');

    const l3Ul = page.locator('.prose ul ul ul').first();
    await expect(l3Ul).toBeVisible();
    expect(
      await l3Ul.evaluate((el) => window.getComputedStyle(el).listStyleType)
    ).toBe('square');

    // 9. Ordered list multi-level markers: decimal -> lower-alpha -> lower-roman
    const l1Ol = page.locator('.prose ol').first();
    await expect(l1Ol).toBeVisible();
    expect(
      await l1Ol.evaluate((el) => window.getComputedStyle(el).listStyleType)
    ).toBe('decimal');

    const l2Ol = page.locator('.prose ol ol').first();
    await expect(l2Ol).toBeVisible();
    expect(
      await l2Ol.evaluate((el) => window.getComputedStyle(el).listStyleType)
    ).toBe('lower-alpha');

    const l3Ol = page.locator('.prose ol ol ol').first();
    await expect(l3Ol).toBeVisible();
    expect(
      await l3Ol.evaluate((el) => window.getComputedStyle(el).listStyleType)
    ).toBe('lower-roman');

    // 10. Heading scales (h4, h5, h6)
    const h4 = page.locator('.prose h4').first();
    await expect(h4).toBeVisible();
    const h4Styles = await h4.evaluate((el) => ({
      fontSize: parseFloat(window.getComputedStyle(el).fontSize),
      marginTop: parseFloat(window.getComputedStyle(el).marginTop),
    }));
    expect(h4Styles.fontSize).toBeGreaterThanOrEqual(16);
    expect(h4Styles.marginTop).toBeGreaterThan(0);

    const h5 = page.locator('.prose h5').first();
    await expect(h5).toBeVisible();
    const h5Styles = await h5.evaluate((el) => ({
      fontSize: parseFloat(window.getComputedStyle(el).fontSize),
      marginTop: parseFloat(window.getComputedStyle(el).marginTop),
    }));
    expect(h5Styles.fontSize).toBeGreaterThanOrEqual(15);
    expect(h5Styles.marginTop).toBeGreaterThan(0);

    const h6 = page.locator('.prose h6').first();
    await expect(h6).toBeVisible();
    const h6Styles = await h6.evaluate((el) => ({
      fontSize: parseFloat(window.getComputedStyle(el).fontSize),
      marginTop: parseFloat(window.getComputedStyle(el).marginTop),
      textTransform: window.getComputedStyle(el).textTransform,
    }));
    expect(h6Styles.fontSize).toBeGreaterThanOrEqual(13);
    expect(h6Styles.marginTop).toBeGreaterThan(0);
    expect(h6Styles.textTransform).toBe('uppercase');
  });

  test('Frontmatter math ($E=mc^2$) compiles to KaTeX in titles and archive listings', async ({
    page,
  }) => {
    await page.goto(toUrl('/publications/'));
    const pubWithMath = page.locator('a:has-text("Paper Title Number 4")');
    await expect(pubWithMath).toBeVisible();
    await expect(pubWithMath.locator('.katex')).toBeVisible();

    await page.goto(toUrl('/publications/2025-11-17-paper-4/'));
    const h1 = page.locator('h1[itemprop="headline"]');
    await expect(h1).toBeVisible();
    await expect(h1.locator('.katex')).toBeVisible();
  });

  test('Portfolio showcase cards have standard 16px vertical padding', async ({
    page,
  }) => {
    await page.goto(toUrl('/portfolio/'));
    const portfolioItem = page.locator('.archive__item').first();
    await expect(portfolioItem).toBeVisible();
    const padding = await portfolioItem.evaluate((el) =>
      parseFloat(window.getComputedStyle(el).paddingBottom)
    );
    expect(padding).toBeGreaterThanOrEqual(16);
  });

  test('Footnotes section, in-text references, and return links render correctly', async ({
    page,
  }) => {
    await page.goto(toUrl('/markdown/'));

    // 1. In-text footnote references enclosed in brackets [1]
    const ref1 = page.locator('a[data-footnote-ref]').first();
    await expect(ref1).toBeVisible();
    const refStyles = await ref1.evaluate((el) => {
      const s = window.getComputedStyle(el);
      const before = window.getComputedStyle(el, '::before');
      const after = window.getComputedStyle(el, '::after');

      return {
        fontWeight: s.fontWeight,
        beforeContent: before.content,
        afterContent: after.content,
      };
    });
    expect(parseInt(refStyles.fontWeight, 10)).toBeGreaterThanOrEqual(600);
    expect(refStyles.beforeContent).toContain('[');
    expect(refStyles.afterContent).toContain(']');

    // 2. Footnotes section container and uppercase visible header
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
    const fnItemStyles = await fnItem.evaluate((el) => ({
      fontSize: parseFloat(window.getComputedStyle(el).fontSize),
    }));
    expect(fnItemStyles.fontSize).toBeLessThanOrEqual(14);

    const backref = fnItem.locator('a.data-footnote-backref');
    await expect(backref).toBeVisible();
    const backrefStyles = await backref.evaluate((el) => ({
      marginLeft: parseFloat(window.getComputedStyle(el).marginLeft),
    }));
    expect(backrefStyles.marginLeft).toBeGreaterThanOrEqual(4);

    // 4. Two-way jump navigation
    await ref1.click();
    expect(page.url()).toContain('#user-content-fn-1');

    await backref.click();
    expect(page.url()).toContain('#user-content-fnref-1');
  });
});
