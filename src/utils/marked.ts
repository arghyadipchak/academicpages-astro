import katex from 'katex';
import { marked } from 'marked';
import markedKatex from 'marked-katex-extension';

import { resolveHtmlUrls } from './url';

// Configure marked with non-standard KaTeX inline math and enforced inline display mode
marked.use(markedKatex({ nonStandard: true }), {
  extensions: [
    {
      name: 'inlineKatex',
      level: 'inline',
      renderer: (token) =>
        katex.renderToString(token.text, { displayMode: false }),
    },
  ],
});

/**
 * Parses inline markdown and LaTeX math (e.g., $E=mc^2$) into HTML,
 * while automatically resolving relative Markdown links against the base URL.
 *
 * @param text - The raw string containing optional Markdown and KaTeX math
 * @returns Sanitized and formatted HTML string
 */
export function parseInline(text?: string | null): string {
  if (!text) return '';
  return resolveHtmlUrls(marked.parseInline(text) as string);
}
