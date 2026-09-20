import js from '@eslint/js';
import * as astroParser from 'astro-eslint-parser';
import eslintPluginAstro from 'eslint-plugin-astro';
import markdownlint from 'eslint-plugin-markdownlint';
import markdownlintParser from 'eslint-plugin-markdownlint/parser.js';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: [
      'dist/**',
      '.astro/**',
      'node_modules/**',
      '.vscode/**',
      'test-results/**',
      'playwright-report/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.astro'],
      },
    },
  },
  {
    files: ['**/*.md'],
    plugins: {
      markdownlint,
    },
    languageOptions: {
      parser: markdownlintParser,
    },
    rules: {
      ...markdownlint.configs.recommended.rules,
    },
  },
];
