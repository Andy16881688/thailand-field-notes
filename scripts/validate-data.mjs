import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (name) => JSON.parse(fs.readFileSync(path.join(root, 'src', 'data', name), 'utf8'));
const site = read('site-settings.json');
const sections = read('sections.json');
const categories = read('categories.json');
const posts = read('posts.json');
const legal = read('legal.json');

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
  const heroRelative = hero ? hero.replace(/^\/+/, '') : '';
  if (!fs.existsSync(path.join(root, 'public', heroRelative))) fail(`missing hero: ${post.slug}`);
}
if (legal.length !== 4 || legal.some((page) => !page.body || page.body.includes('[INSERT'))) fail('legal contract mismatch');
console.log(JSON.stringify({ status: 'PASS', site_id: site.site_id, sections: sections.length, categories: categories.length, posts: posts.length, legal_pages: legal.length }));
