import { parseFragment } from 'parse5';

// Parse structure, but patch only the opening H2 tag to preserve authored HTML.
export function prepareArticle(html) {
  const root = parseFragment(html, { sourceCodeLocationInfo: true });
  const nodes = [];
  const walk = node => {
    nodes.push(node);
    for (const child of node.childNodes || []) walk(child);
  };
  walk(root);
  const counts = new Map();
  const owners = new Map();
  for (const node of nodes) {
    const id = node.attrs?.find(attr => attr.name === 'id')?.value;
    if (id) {
      counts.set(id, (counts.get(id) || 0) + 1);
      if (!owners.has(id)) owners.set(id, node);
    }
  }
  const used = new Set(counts.keys());
  const retained = new Set();
  const textOf = node => node.nodeName === '#text' ? node.value : (node.childNodes || []).map(textOf).join('');
  const patches = [];
  const headings = [];
  for (const node of nodes.filter(node => node.tagName === 'h2')) {
    const loc = node.sourceCodeLocation;
    if (!loc?.startTag) continue;
    const text = textOf(node).replace(/\s+/g, ' ').trim();
    if (!text) continue;
    const oldId = node.attrs.find(attr => attr.name === 'id')?.value;
    let id = oldId;
    if (!id || retained.has(id) || owners.get(id) !== node) {
      const base = text.toLowerCase().normalize('NFC').replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '') || 'section';
      id = base;
      let suffix = 2;
      while (used.has(id)) id = `${base}-${suffix++}`;
      used.add(id);
      const attrLocation = loc.attrs?.id;
      if (attrLocation) patches.push({ start: attrLocation.startOffset, end: attrLocation.endOffset, value: `id="${id}"` });
      else patches.push({ start: loc.startTag.endOffset - 1, end: loc.startTag.endOffset - 1, value: ` id="${id}"` });
    }
    retained.add(id);
    headings.push({ id, text });
  }
  for (const patch of patches.sort((a, b) => b.start - a.start)) html = html.slice(0, patch.start) + patch.value + html.slice(patch.end);
  return { html, headings };
}
