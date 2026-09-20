import type { Rule } from 'eslint';
import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import eslintPluginAstro from 'eslint-plugin-astro';
import markdownlint from 'eslint-plugin-markdownlint';
import markdownlintParser from 'eslint-plugin-markdownlint/parser.js';
import tseslint from 'typescript-eslint';

const compactObjectSingleLineRule: Rule.RuleModule = {
  meta: {
    type: 'layout',
    docs: {
      description:
        'Enforce single-line formatting for any object literals whose total width fits within the configured line width',
    },
    fixable: 'whitespace',
    schema: [
      {
        type: 'object',
        properties: { maxWidth: { type: 'integer', minimum: 1 } },
        additionalProperties: false,
      },
    ],
  },
  create(context) {
    const options =
      (context.options[0] as { maxWidth?: number } | undefined) || {};
    const maxWidth = options.maxWidth ?? 80;
    const sourceCode = context.sourceCode;

    return {
      ObjectExpression(node) {
        if (!node.loc || node.properties.length === 0) return;

        const firstToken = sourceCode.getFirstToken(node);
        const lastToken = sourceCode.getLastToken(node);
        if (
          !firstToken ||
          !lastToken ||
          firstToken.loc.end.line === lastToken.loc.start.line
        )
          return;

        // Check if all properties are single-line
        for (const prop of node.properties) {
          if (prop.type !== 'Property' && prop.type !== 'SpreadElement') return;
          if (prop.loc && prop.loc.start.line !== prop.loc.end.line) return;
        }

        if (sourceCode.getCommentsInside(node).length > 0) return;

        const propTexts = node.properties.map((p) => sourceCode.getText(p));
        const singleLineText = `{ ${propTexts.join(', ')} }`;

        const prefixLength = node.loc.start.column;
        const lineAfter =
          sourceCode.lines[node.loc.end.line - 1].slice(node.loc.end.column) ||
          '';
        const estimatedLength =
          prefixLength + singleLineText.length + lineAfter.length;

        if (estimatedLength > maxWidth) return;

        context.report({
          node,
          message: `Object literal fits within line width (${maxWidth}) and must be written on a single line`,
          fix(fixer) {
            return fixer.replaceText(node, singleLineText);
          },
        });
      },
    };
  },
};

export default [
  {
    ignores: [
      'dist/**',
      '.astro/**',
      'test-results/**',
      'playwright-report/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    plugins: {
      '@stylistic': stylistic,
      local: {
        rules: { 'compact-object-single-line': compactObjectSingleLineRule },
      },
    },
    rules: {
      curly: ['error', 'multi-or-nest'],
      'local/compact-object-single-line': ['error', { maxWidth: 80 }],
      '@stylistic/padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
      ],
      '@stylistic/spaced-comment': ['error', 'always', { markers: ['/'] }],
    },
  },
  {
    files: ['**/*.md'],
    plugins: { markdownlint },
    languageOptions: { parser: markdownlintParser },
    rules: { ...markdownlint.configs.recommended.rules },
  },
];
