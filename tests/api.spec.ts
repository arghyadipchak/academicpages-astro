import { expect, test } from '@playwright/test';

import { toUrl } from './fixtures/test-utils';

test.describe('API & Static Endpoint Tests', () => {
  test('RSS 2.0 endpoint returns valid XML and blog items', async ({
    request,
  }) => {
    const res = await request.get(toUrl('/rss.xml'));
    expect(res.status()).toBe(200);
    const text = await res.text();
    expect(text).toContain('<rss');
    expect(text).toContain('Blog Post number 1');
  });

  test('Feed endpoint returns valid XML response', async ({ request }) => {
    const res = await request.get(toUrl('/feed.xml'));
    expect(res.status()).toBe(200);
    const text = await res.text();
    expect(text).toContain('<rss');
  });

  test('Robots.txt returns valid 200 response with sitemap index reference', async ({
    request,
  }) => {
    const res = await request.get(toUrl('/robots.txt'));
    expect(res.status()).toBe(200);
    const text = await res.text();
    expect(text).toContain('User-agent: *');
    expect(text).toContain('sitemap-index.xml');
  });

  test('Search JSON endpoint returns structured array of searchable items', async ({
    request,
  }) => {
    const res = await request.get(toUrl('/api/search.json'));
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data)).toBeTruthy();
    expect(data.length).toBeGreaterThan(0);
    expect(data[0]).toHaveProperty('title');
    expect(data[0]).toHaveProperty('url');
    expect(data[0]).toHaveProperty('type');
  });

  test('Critical static assets return 200 OK', async ({ request }) => {
    const assets = [
      toUrl('/favicon.ico'),
      toUrl('/favicon.svg'),
      toUrl('/images/profile.png'),
      toUrl('/images/manifest.json'),
    ];

    for (const assetUrl of assets) {
      const res = await request.get(assetUrl);
      expect(
        res.status(),
        `Expected asset ${assetUrl} to return HTTP 200`
      ).toBe(200);
    }
  });
});
