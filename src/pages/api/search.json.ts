import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { resolveUrl } from '../../utils/url';

export const GET: APIRoute = async () => {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const publications = await getCollection('publications');
  const talks = await getCollection('talks');
  const teaching = await getCollection('teaching');
  const portfolio = await getCollection('portfolio');
  const pages = await getCollection('pages');

  const items = [
    ...posts.map((p) => ({
      title: p.data.title,
      url: resolveUrl(
        p.data.permalink || `/posts/${p.id.replace(/\.md$/, '')}/`
      ),
      type: 'Blog Post',
      date: p.data.date,
      excerpt: p.data.excerpt || '',
    })),
    ...publications.map((p) => ({
      title: p.data.title,
      url: resolveUrl(
        p.data.permalink || `/publications/${p.id.replace(/\.md$/, '')}/`
      ),
      type: 'Publication',
      date: p.data.date,
      excerpt: p.data.excerpt || p.data.citation || '',
    })),
    ...talks.map((t) => ({
      title: t.data.title,
      url: resolveUrl(
        t.data.permalink || `/talks/${t.id.replace(/\.md$/, '')}/`
      ),
      type: 'Talk',
      date: t.data.date,
      excerpt:
        t.data.excerpt || `${t.data.venue || ''} ${t.data.location || ''}`,
    })),
    ...teaching.map((t) => ({
      title: t.data.title,
      url: resolveUrl(
        t.data.permalink || `/teaching/${t.id.replace(/\.md$/, '')}/`
      ),
      type: 'Teaching',
      date: t.data.date,
      excerpt: t.data.excerpt || t.data.venue || '',
    })),
    ...portfolio.map((p) => ({
      title: p.data.title,
      url: resolveUrl(
        p.data.permalink || `/portfolio/${p.id.replace(/\.md$/, '')}/`
      ),
      type: 'Portfolio',
      date: p.data.date,
      excerpt: p.data.excerpt || '',
    })),
    ...pages.map((p) => ({
      title: p.data.title,
      url: resolveUrl(
        p.data.permalink || (p.id === 'about' ? '/' : `/${p.id}/`)
      ),
      type: 'Page',
      excerpt: '',
    })),
  ];

  return new Response(JSON.stringify(items), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
