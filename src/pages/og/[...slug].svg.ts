import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

import { siteConfig } from '@data/siteConfig';
import { formatDate } from '@utils/date';

interface OgItem {
  title: string;
  category?: string;
  date?: Date;
  venue?: string;
}

export async function getStaticPaths() {
  const blog = await getCollection('blog');
  const publications = await getCollection('publications');
  const talks = await getCollection('talks');
  const portfolio = await getCollection('portfolio');
  const pages = await getCollection('pages');

  const items: { params: { slug: string }; props: { item: OgItem } }[] = [];

  // Home / default
  items.push({
    params: { slug: 'default' },
    props: {
      item: {
        title: siteConfig.title,
        category: 'Academic Portfolio',
        venue: siteConfig.author.name,
      },
    },
  });

  for (const post of blog) {
    items.push({
      params: { slug: `posts/${post.id}` },
      props: {
        item: {
          title: post.data.title,
          category: 'Blog Post',
          date: post.data.date,
        },
      },
    });
  }

  for (const pub of publications) {
    items.push({
      params: { slug: `publications/${pub.id}` },
      props: {
        item: {
          title: pub.data.title,
          category: pub.data.category || 'Publication',
          date: pub.data.date,
          venue: pub.data.venue,
        },
      },
    });
  }

  for (const talk of talks) {
    items.push({
      params: { slug: `talks/${talk.id}` },
      props: {
        item: {
          title: talk.data.title,
          category: talk.data.type || 'Talk',
          date: talk.data.date,
          venue: talk.data.venue,
        },
      },
    });
  }

  for (const project of portfolio) {
    items.push({
      params: { slug: `portfolio/${project.id}` },
      props: {
        item: {
          title: project.data.title,
          category: 'Project',
          date: project.data.date,
          venue: project.data.venue,
        },
      },
    });
  }

  for (const page of pages) {
    items.push({
      params: { slug: `pages/${page.id}` },
      props: { item: { title: page.data.title, category: 'Page' } },
    });
  }

  return items;
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '&':
        return '&amp;';
      case "'":
        return '&apos;';
      case '"':
        return '&quot;';
      default:
        return c;
    }
  });
}

function wrapText(text: string, maxCharsPerLine: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    if ((currentLine + ' ' + word).trim().length <= maxCharsPerLine)
      currentLine = (currentLine + ' ' + word).trim();
    else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);

  return lines.slice(0, 3);
}

export const GET: APIRoute = async ({ props }) => {
  const item = (props as { item: OgItem }).item;
  const lines = wrapText(item.title, 42);
  const formattedDate = item.date ? formatDate(item.date) : '';
  const subtitle = [item.venue, formattedDate].filter(Boolean).join(' • ');

  const titleTspans = lines
    .map(
      (line, i) =>
        `<tspan x="80" dy="${i === 0 ? '0' : '1.25em'}">${escapeXml(line)}</tspan>`
    )
    .join('');

  const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg-grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1e222b"/>
      <stop offset="100%" stop-color="#12151a"/>
    </linearGradient>
    <linearGradient id="brand-grad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#0ea1c5"/>
      <stop offset="100%" stop-color="#2f7f93"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg-grad)"/>

  <!-- Top Accent Bar -->
  <rect x="0" y="0" width="1200" height="8" fill="url(#brand-grad)"/>

  <!-- Decorative Grid / Glow -->
  <circle cx="1080" cy="120" r="300" fill="#0ea1c5" opacity="0.08" filter="blur(80px)"/>
  <circle cx="100" cy="530" r="250" fill="#2f7f93" opacity="0.06" filter="blur(60px)"/>

  <!-- Category Badge -->
  ${
    item.category
      ? `
  <rect x="80" y="80" width="${item.category.length * 12 + 32}" height="36" rx="18" fill="#2f7f93" opacity="0.25"/>
  <text x="96" y="103" font-family="-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="600" fill="#0ea1c5" letter-spacing="0.05em">${escapeXml(item.category.toUpperCase())}</text>
  `
      : ''
  }

  <!-- Title -->
  <text x="80" y="220" font-family="-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif" font-size="46" font-weight="800" fill="#ffffff" letter-spacing="-0.02em">
    ${titleTspans}
  </text>

  <!-- Subtitle (Venue / Date) -->
  ${
    subtitle
      ? `
  <text x="80" y="440" font-family="-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="500" fill="#9ca3af">
    ${escapeXml(subtitle)}
  </text>
  `
      : ''
  }

  <!-- Footer Divider -->
  <line x1="80" y1="480" x2="1120" y2="480" stroke="#374151" stroke-width="1"/>

  <!-- Author & Site Branding -->
  <text x="80" y="540" font-family="-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="700" fill="#ffffff">
    ${escapeXml(siteConfig.author.name)}
  </text>
  <text x="80" y="568" font-family="-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="400" fill="#9ca3af">
    ${escapeXml(siteConfig.title)}
  </text>
</svg>
  `.trim();

  return new Response(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
