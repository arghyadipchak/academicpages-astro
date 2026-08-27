import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    modified: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    categories: z.array(z.string()).default([]),
    excerpt: z.string().optional(),
    read_time: z.boolean().default(true),
    author_profile: z.boolean().default(true),
    draft: z.boolean().default(false),
    permalink: z.string().optional(),
  }),
});

const publications = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/publications',
  }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    venue: z.string().optional(),
    category: z
      .enum(['books', 'manuscripts', 'conferences'])
      .default('manuscripts'),
    collection: z.string().default('publications'),
    permalink: z.string().optional(),
    citation: z.string().optional(),
    paperurl: z.string().optional(),
    codeurl: z.string().optional(),
    slidesurl: z.string().optional(),
    bibtexurl: z.string().optional(),
    excerpt: z.string().optional(),
  }),
});

const talks = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/talks' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    venue: z.string().optional(),
    location: z.string().optional(),
    type: z.string().optional(),
    talk_type: z.string().optional(),
    collection: z.string().default('talks'),
    permalink: z.string().optional(),
    slidesurl: z.string().optional(),
    excerpt: z.string().optional(),
  }),
});

const teaching = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/teaching' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    type: z.string().optional(),
    venue: z.string().optional(),
    location: z.string().optional(),
    collection: z.string().default('teaching'),
    permalink: z.string().optional(),
    excerpt: z.string().optional(),
  }),
});

const portfolio = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/portfolio' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date().optional(),
    collection: z.string().default('portfolio'),
    permalink: z.string().optional(),
    excerpt: z.string().optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    permalink: z.string().optional(),
    author_profile: z.boolean().default(true),
    redirect_from: z.array(z.string()).default([]),
    layout: z.string().optional(),
  }),
});

export const collections = {
  blog,
  publications,
  talks,
  teaching,
  portfolio,
  pages,
};
