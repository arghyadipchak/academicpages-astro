import type { Config } from 'prettier';

const config: Config = {
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  plugins: [
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-astro',
    'prettier-plugin-tailwindcss',
  ],
  importOrder: [
    '<TYPES>^(node:.*|node$)',
    '^(node:.*|node$)',
    '',
    '<TYPES>^(astro|astro/.*|astro:.*|@astrojs/.*)$',
    '^(astro|astro/.*|astro:.*|@astrojs/.*)$',
    '',
    '<TYPES>',
    '<THIRD_PARTY_MODULES>',
    '',
    '^@layouts/(.*)$',
    '^@components/(.*)$',
    '',
    '<TYPES>^@data/(.*)$',
    '^@data/(.*)$',
    '<TYPES>^@utils/(.*)$',
    '^@utils/(.*)$',
    '',
    '<TYPES>^\\.\\./(.*)$',
    '^\\.\\./(.*)$',
    '<TYPES>^\\./(.*)$',
    '^\\./(.*)$',
    '',
    '^@styles/(.*)$',
    '\\.css$',
  ],
  importOrderTypeScriptVersion: '5.0.0',
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
};

export default config;
