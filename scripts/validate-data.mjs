import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (name) => JSON.parse(fs.readFileSync(path.join(root, 'src', 'data', name), 'utf8'));
const site = read('site-settings.json');
const sections = read('sections.json');
const categories = read('categories.json');
const posts = read('posts.json');
const legal = read('legal.json');
const retiredMedia = JSON.parse(fs.readFileSync(path.join(root, 'docs/redesign/20261013/legacy-image-removal-20261014.json'), 'utf8'));

const fail = (message) => { throw new Error(message); };
if (site.site_id !== 'thailand-field-notes') fail('site_id mismatch');
if (sections.length !== 4 || categories.length !== 13 || posts.length !== 36) fail('hierarchy count mismatch');
for (const section of sections) {
  const sectionCategories = categories.filter((item) => (item.section_slug || item.section) === section.slug);
  if (sectionCategories.length < 2) fail(`section has too few categories: ${section.slug}`);
  for (const category of sectionCategories) {
    if (posts.filter((item) => (item.category_slug || item.category) === category.slug).length < 2) fail(`category has too few posts: ${category.slug}`);
  }
}
for (const post of posts) {
  const published = post.published || post.published_at?.slice(0, 10);
  const body = post.body || post.content;
  const hero = post.hero || post.featured_image;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(published || '')) fail(`invalid date: ${post.slug}`);
  if (!body || body.length < 500) fail(`short body: ${post.slug}`);
  // Text-led articles are intentional. Only the exact owner-retired slots may be empty.
  for (const field of ['featured_image','closing_image']) {
    const role=field==='featured_image'?'featured':'closing';
    const retirement=retiredMedia.images.find(image=>image.slug===post.slug && image.role===role);
    if (retirement) {
      if (post[field] !== '') fail(`retired image reference restored: ${post.slug} ${field}`);
      if (fs.existsSync(path.join(root, retirement.path))) fail(`retired image restored: ${retirement.path}`);
    } else if (!post[field]) fail(`unapproved empty image: ${post.slug} ${field}`);
  }
  if (hero && !fs.statSync(path.join(root, 'public', hero.replace(/^\/+/, '')), {throwIfNoEntry:false})?.isFile()) fail(`missing hero: ${post.slug}`);
}
if (legal.length !== 4 || legal.some((page) => !page.body || page.body.includes('[INSERT'))) fail('legal contract mismatch');
console.log(JSON.stringify({ status: 'PASS', site_id: site.site_id, sections: sections.length, categories: categories.length, posts: posts.length, legal_pages: legal.length }));
