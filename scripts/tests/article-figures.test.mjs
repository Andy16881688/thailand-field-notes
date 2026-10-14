import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';

const modulePath = new URL('../../src/lib/article-figures.mjs', import.meta.url);
const load = async () => {
  assert.ok(existsSync(modulePath), 'Article illustration insertion must be implemented');
  return import(modulePath.href);
};
const figure = { src: '/assets/editorial/diagrams/route.svg', width: 640, height: 720,
  alt: 'Bangkok to Chiang Mai', caption: 'A route, not a map.', afterHeading: 'Choose & go' };

test('places the figure after the complete matching section without changing authored markup', async () => {
  const { addArticleFigures } = await load();
  const before = '<p>Intro.</p><h2>Choose &amp; <em>go</em></h2><p>A <a href="/post/x/">link</a>.</p>';
  const after = '<h2>Next</h2><p>End.</p>';
  const result = addArticleFigures(before + after, [figure]);
  assert.ok(result.startsWith(before));
  assert.ok(result.endsWith(after));
  assert.equal((result.match(/<figure /g) || []).length, 1);
  assert.match(result, /loading="lazy"/);
  assert.match(result, /width="640" height="720"/);
  assert.match(result, /<figcaption>A route, not a map\.<\/figcaption>/);
});
test('appends to the last section and escapes all prose attributes', async () => {
  const { addArticleFigures } = await load();
  const result = addArticleFigures('<h2>Choose &amp; go</h2><p>End.</p>', [{ ...figure, alt: '" onload="bad', caption: '<script>bad</script>' }]);
  assert.ok(result.indexOf('<figure') > result.indexOf('</p>'));
  assert.ok(result.includes('alt="&quot; onload=&quot;bad"'));
  assert.ok(result.includes('&lt;script&gt;'));
  assert.ok(!result.includes('<script>'));
});
test('fails closed for stale heading anchors or unsafe asset paths and dimensions', async () => {
  const { addArticleFigures } = await load();
  assert.throws(() => addArticleFigures('<h2>Changed</h2>', [figure]), /heading/i);
  for (const src of ['https://example.com/x.svg', '/assets/editorial/../secret.svg', 'javascript:bad']) {
    assert.throws(() => addArticleFigures('<h2>Choose &amp; go</h2>', [{ ...figure, src }]), /asset/i);
  }
  assert.throws(() => addArticleFigures('<h2>Choose &amp; go</h2>', [{ ...figure, width: 0 }]), /dimension/i);
});
test('no illustrations leaves source byte-for-byte intact', async () => {
  const { addArticleFigures } = await load();
  const html = '<h2 id="x">A</h2>\n<p>Exact &amp; original.</p>';
  assert.equal(addArticleFigures(html, []), html);
});
test('unknown article slugs and duplicate placements cannot silently lose illustrations', async () => {
  const module = await load();
  assert.equal(typeof module.validateArticleFigures, 'function', 'manifest validation is required before filtering');
  assert.throws(() => module.validateArticleFigures([{...figure, slug:'typo'}], ['real-post']), /unknown article/i);
  const item = {...figure, slug:'real-post'};
  assert.throws(() => module.validateArticleFigures([item,item], ['real-post']), /duplicate/i);
  assert.doesNotThrow(() => module.validateArticleFigures([item], ['real-post']));
});
