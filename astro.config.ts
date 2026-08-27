import { defineConfig, svgoOptimizer } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://arghyadipchak.github.io/academicpages-astro',
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
    '/wordpress/blog-posts': '/year-archive/',
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
