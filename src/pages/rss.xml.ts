import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { siteConfig } from '../data/siteConfig';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const publications = await getCollection('publications');

  const postItems = posts.map((post) => {
    let link = `/posts/${post.id.replace(/\.md$/, '')}/`;
    if (post.data.permalink) {
      link = post.data.permalink;
    }
    return {
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.excerpt || post.data.description || '',
      link,
    };
  });

  const publicationItems = publications.map((pub) => {
    let link = `/publications/${pub.id.replace(/\.md$/, '')}/`;
    if (pub.data.permalink) {
      link = pub.data.permalink;
    }
    return {
      title: pub.data.title,
      pubDate: pub.data.date,
      description: pub.data.excerpt || pub.data.citation || '',
      link,
    };
  });

  const allItems = [...postItems, ...publicationItems].sort(
    (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  );

  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site?.toString() || siteConfig.url,
    items: allItems,
    customData: `<language>${siteConfig.locale}</language>`,
  });
}
