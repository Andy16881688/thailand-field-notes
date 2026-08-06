import site from '../data/site-settings.json';
import sections from '../data/sections.json';
import categories from '../data/categories.json';
import rawPosts from '../data/posts.json';
import legal from '../data/legal.json';

const normalizedCategories = categories.map((item) => ({
  ...item,
  section_slug: item.section_slug || (item as any).section,
}));

const posts = rawPosts.map((item) => ({
  ...item,
  category_slug: item.category_slug || (item as any).category,
  section_slug: item.section_slug || (item as any).section,
  published: item.published || (item as any).published_at?.slice(0, 10),
  hero: item.hero || (item as any).featured_image,
  body: String(item.body || (item as any).content || '').replace(/<p>\s*<img\b[^>]*>\s*<\/p>/gi, ''),
  body_format: (item as any).body_format || 'markdown',
  sources: item.sources || [],
  last_reviewed: item.last_reviewed || (item as any).updated_at?.slice(0, 10),
}));

export { site, sections, normalizedCategories as categories, posts, legal };
export const getSection = (slug: string) => sections.find((item) => item.slug === slug);
export const getCategory = (slug: string) => normalizedCategories.find((item) => item.slug === slug);
export const getPost = (slug: string) => posts.find((item) => item.slug === slug);
export const getPostsForCategory = (slug: string) => posts.filter((item) => item.category_slug === slug);
export const getPostsForSection = (slug: string) => posts.filter((item) => item.section_slug === slug);
