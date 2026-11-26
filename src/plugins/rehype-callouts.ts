interface HastNode {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
  value?: string;
}

const alerts: Record<string, { cls: string; label: string }> = {
  NOTE: { cls: 'notice--info', label: 'Note' },
  TIP: { cls: 'notice--success', label: 'Tip' },
  IMPORTANT: { cls: 'notice--info', label: 'Important' },
  WARNING: { cls: 'notice--warning', label: 'Warning' },
  CAUTION: { cls: 'notice--danger', label: 'Caution' },
};

const isElement = (node: HastNode | undefined, tagName: string) =>
  node?.type === 'element' && node.tagName === tagName;

export function rehypeCallouts() {
  return (tree: HastNode) => {
    function visit(node: HastNode) {
      node.children?.forEach((child, i) => {
        if (isElement(child, 'p')) {
          const last = child.children?.at(-1);
          const match =
            last?.type === 'text'
              ? last.value?.match(/\{:\s*\.(notice(?:--[a-z]+)?)\s*\}\s*$/)
              : null;
          if (last && match) {
            last.value = last.value!.slice(0, match.index).trimEnd();
            child.properties = {
              ...child.properties,
              className: ['notice', match[1]],
            };
          }
        }

        if (isElement(child, 'blockquote')) {
          const firstP = child.children?.find((c) => isElement(c, 'p'));
          const first = firstP?.children?.[0];
          const match =
            first?.type === 'text'
              ? first.value?.match(
                  /^\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\](?:\s*\n|\s+|$)/i
                )
              : null;
          const alert = match && alerts[match[1].toUpperCase()];
          if (firstP && first && match && alert) {
            const rest = first.value!.slice(match[0].length);
            first.value = rest ? ` ${rest}` : '';
            firstP.children!.unshift({
              type: 'element',
              tagName: 'strong',
              properties: {},
              children: [{ type: 'text', value: `${alert.label}:` }],
            });
            node.children![i] = {
              type: 'element',
              tagName: 'div',
              properties: { className: ['notice', alert.cls] },
              children: child.children,
            };
          }
        }

        visit(node.children![i]);
      });
    }

    visit(tree);
  };
}
