import { defineConfig, svgoOptimizer } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';
import { siteConfig } from './src/data/siteConfig';

const site =
  process.env.ASTRO_SITE ||
  (siteConfig.url ? new URL(siteConfig.url).origin : undefined);

const base =
  process.env.ASTRO_BASE !== undefined
    ? process.env.ASTRO_BASE
    : siteConfig.baseurl ||
      (siteConfig.url && new URL(siteConfig.url).pathname !== '/'
        ? new URL(siteConfig.url).pathname
        : undefined);

// https://astro.build/config
export default defineConfig({
  site,
  base,
  integrations: [icon(), sitemap()],
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  build: {
    inlineStylesheets: 'auto',
  },
  experimental: {
    svgOptimizer: svgoOptimizer({
      multipass: true,
      floatPrecision: 2,
    }),
  },
  redirects: {
    '/about': '/',
    '/about.html': '/',
    '/resume': '/cv/',
    // Legacy redirects:
    // '/year-archive/': '/posts/',
    // '/wordpress/blog-posts/': '/posts/',
  },
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      wrap: true,
      langAlias: {
        plotly: 'json',
        R: 'r',
      },
    },
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
