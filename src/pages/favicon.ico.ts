import type { APIRoute } from 'astro';

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="Thailand Field Notes">
  <rect width="64" height="64" rx="12" fill="#c9573e"/>
  <path fill="#fffaf3" d="M13 48h38v4H13zm4-5h30v4H17zm4-4h22v4H21zm4-18h14l4 4v14H21V25zm7-8 8 8H24zm-5 12h14v6H27zm0 8h14v6H27z"/>
</svg>`;

export const GET: APIRoute = () => new Response(favicon, {
  headers: {
    'Content-Type': 'image/svg+xml; charset=utf-8',
    'Cache-Control': 'public, max-age=86400',
  },
});
