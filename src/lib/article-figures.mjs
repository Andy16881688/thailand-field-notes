import { parseFragment } from 'parse5';

const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
const textOf = node => node.nodeName === '#text' ? node.value : (node.childNodes || []).map(textOf).join('');

export function validateArticleFigures(figures, articleSlugs) {
  const known = new Set(articleSlugs);
  const placements = new Set();
  for (const figure of figures) {
    if (!known.has(figure.slug)) throw new Error(`Unknown article for illustration: ${figure.slug}`);
    const placement = `${figure.slug}\n${figure.afterHeading}\n${figure.src}`;
    if (placements.has(placement)) throw new Error(`Duplicate illustration placement: ${figure.slug}`);
    placements.add(placement);
  }
}

// Keep the approved prose byte-for-byte intact; figures are a separate editorial layer.
export function addArticleFigures(html, figures = []) {
  if (!figures.length) return html;
  const root = parseFragment(html, { sourceCodeLocationInfo: true });
  const headings = root.childNodes.filter(node => node.tagName === 'h2');
  const patches = [];
  for (const figure of figures) {
    if (!/^\/assets\/editorial\/[a-zA-Z0-9/_-]+\.(svg|webp)$/.test(figure.src)) throw new Error('Invalid illustration asset path');
    if (![figure.width, figure.height].every(value => Number.isInteger(value) && value > 0)) throw new Error('Invalid illustration dimensions');
    if (!figure.alt?.trim() || !figure.caption?.trim()) throw new Error('Illustrations require alt and caption');
    const matches = headings.filter(node => textOf(node).replace(/\s+/g, ' ').trim() === figure.afterHeading);
    if (matches.length !== 1) throw new Error(`Illustration heading missing or ambiguous: ${figure.afterHeading}`);
    const index = headings.indexOf(matches[0]);
    const offset = headings[index + 1]?.sourceCodeLocation.startOffset ?? html.length;
    const markup = `<figure class="article-illustration"><img src="${escape(figure.src)}" width="${figure.width}" height="${figure.height}" alt="${escape(figure.alt)}" loading="lazy" decoding="async"/><figcaption>${escape(figure.caption)}</figcaption></figure>`;
    patches.push({ offset, markup });
  }
  for (const { offset, markup } of patches.sort((a, b) => b.offset - a.offset)) html = html.slice(0, offset) + markup + html.slice(offset);
  return html;
}
