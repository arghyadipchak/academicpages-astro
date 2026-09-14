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
    '<TYPES>',
    '^(astro|astro:.*)$',
    '<THIRD_PARTY_MODULES>',
    '',
    '^@/(.*)$',
    '^[../]',
    '^[./]',
    '',
    '<TYPES>^[.]',
    '',
    '^(?!.*[.]css$)[./].*$',
    '.css$',
  ],
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
