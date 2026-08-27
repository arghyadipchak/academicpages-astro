import katex from 'katex';

/**
 * Server-side render any LaTeX math ($...$, $$...$$, \(...\), \[...\]) within a text string
 * Converts math delimiters to compiled KaTeX HTML at build-time with zero client JS
 */
export function renderMath(text: string | undefined | null): string {
  if (!text) return '';

  // 1. Display math: $$...$$ or \[...\]
  let result = text.replace(/\$\$([\s\S]+?)\$\$/g, (_, math) => {
    try {
      return katex.renderToString(math.trim(), {
        displayMode: false,
        throwOnError: false,
      });
    } catch {
      return `$$${math}$$`;
    }
  });

  result = result.replace(/\\\[([\s\S]+?)\\\]/g, (_, math) => {
    try {
      return katex.renderToString(math.trim(), {
        displayMode: false,
        throwOnError: false,
      });
    } catch {
      return `\\[${math}\\]`;
    }
  });

  // 2. Inline math: \(...\)
  result = result.replace(/\\\(([\s\S]+?)\\\)/g, (_, math) => {
    try {
      return katex.renderToString(math.trim(), {
        displayMode: false,
        throwOnError: false,
      });
    } catch {
      return `\\(${math}\\)`;
    }
  });

  // 3. Inline math: $...$ (ignoring escaped \$)
  result = result.replace(/(?<!\\)\$([^$\n]+?)(?<!\\)\$/g, (_, math) => {
    try {
      return katex.renderToString(math.trim(), {
        displayMode: false,
        throwOnError: false,
      });
    } catch {
      return `$${math}$`;
    }
  });

  return result;
}
