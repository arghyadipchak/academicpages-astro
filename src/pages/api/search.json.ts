import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

import {
  getPortfolioUrl,
  getPostUrl,
  getPublicationUrl,
  getTalkUrl,
  getTeachingUrl,
  resolveUrl,
} from '../../utils/url';

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
      url: getPostUrl(p),
      type: 'Blog Post',
      date: p.data.date,
      description: p.data.description || '',
    })),
    ...publications.map((p) => ({
      title: p.data.title,
      url: getPublicationUrl(p),
      type: 'Publication',
      date: p.data.date,
      description: p.data.description || p.data.citation || '',
    })),
    ...talks.map((t) => ({
      title: t.data.title,
      url: getTalkUrl(t),
      type: 'Talk',
      date: t.data.date,
      description:
        t.data.description || `${t.data.venue || ''} ${t.data.location || ''}`,
    })),
    ...teaching.map((t) => ({
      title: t.data.title,
      url: getTeachingUrl(t),
      type: 'Teaching',
      date: t.data.date,
      description: t.data.description || t.data.venue || '',
    })),
    ...portfolio.map((p) => ({
      title: p.data.title,
      url: getPortfolioUrl(p),
      type: 'Portfolio',
      description: p.data.description || '',
    })),
    ...pages.map((p) => ({
      title: p.data.title,
      url: resolveUrl(p.id === 'about' ? '/' : `/${p.id}/`),
      type: 'Page',
      description: p.data.description || '',
    })),
    {
      title: 'CV',
      url: resolveUrl('/cv/'),
      type: 'Page',
      description: 'Curriculum Vitae',
    },
    {
      title: 'Sitemap',
      url: resolveUrl('/sitemap/'),
      type: 'Page',
      description: 'Overview of all pages and collections',
    },
  ];

  return new Response(JSON.stringify(items), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
