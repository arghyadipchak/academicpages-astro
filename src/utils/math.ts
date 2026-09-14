import katex from 'katex';

const katexCache = new Map<string, string>();

function renderKaTeX(math: string): string {
  const trimmed = math.trim();
  const cached = katexCache.get(trimmed);
  if (cached !== undefined) return cached;

  try {
    const rendered = katex.renderToString(trimmed, {
      displayMode: false,
      throwOnError: false,
    });
    katexCache.set(trimmed, rendered);
    return rendered;
  } catch {
    return `$${math}$`;
  }
}

/**
 * Server-side render any LaTeX math ($...$, $$...$$, \(...\), \[...\]) within a text string
 * Converts math delimiters to compiled KaTeX HTML at build-time with zero client JS
 */
export function renderMath(text: string | undefined | null): string {
  if (!text) return '';

  // Fast path: skip 4 regex scans if text contains no math delimiters
  if (!text.includes('$') && !text.includes('\\[') && !text.includes('\\(')) {
    return text;
  }

  // 1. Display math: $$...$$ or \[...\]
  let result = text.replace(/\$\$([\s\S]+?)\$\$/g, (_, math) =>
    renderKaTeX(math)
  );

  result = result.replace(/\\\[([\s\S]+?)\\\]/g, (_, math) =>
    renderKaTeX(math)
  );

  // 2. Inline math: \(...\)
  result = result.replace(/\\\(([\s\S]+?)\\\)/g, (_, math) =>
    renderKaTeX(math)
  );

  // 3. Inline math: $...$ (ignoring escaped \$)
  result = result.replace(/(?<!\\)\$([^$\n]+?)(?<!\\)\$/g, (_, math) =>
    renderKaTeX(math)
  );

  return result;
}
