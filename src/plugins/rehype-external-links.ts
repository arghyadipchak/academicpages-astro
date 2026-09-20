interface HastNode {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
}

/**
 * Rehype plugin that adds target="_blank" to external links (http://, https://, //)
 * and removes any rel attributes from <a> tags.
 */
export function rehypeExternalLinks() {
  return (tree: HastNode) => {
    function visit(node: HastNode) {
      if (!node || typeof node !== 'object') return;

      if (
        node.type === 'element' &&
        node.tagName === 'a' &&
        node.properties?.href
      ) {
        const href = String(node.properties.href);
        if (/^(https?:)?\/\//i.test(href)) node.properties.target = '_blank';
        delete node.properties.rel;
      }

      node.children?.forEach(visit);
    }

    visit(tree);
  };
}
