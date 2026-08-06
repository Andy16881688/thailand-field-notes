# Skill 03 repair report

- run_id: `skill03-20260806-repair-01`
- site_id: `thailand-field-notes`
- scope: return from Skill 07 local QA; repair post rendering, mobile overflow, route canonical output, and robots output.
- authority: preserve the approved Skill 02 visual source; no Git, deploy, DNS, Admin, or release action.

## Changes

1. Admin HTML bodies are rendered as trusted HTML instead of escaped text.
2. Legacy inline image wrappers are removed from the Admin body adapter; the controlled closing image is rendered from `closing_image`.
3. Article body wrapping and mobile navigation overflow are constrained.
4. Canonical output defaults to the current route instead of `/`.
5. `robots.txt` is generated as an Astro route.

## Evidence

- `pnpm run check`: PASS
- `pnpm run build`: PASS; 58 pages generated, including `/robots.txt`
- `dist/post` directories: 36
- Static Chrome regression: 3 posts + 4 Legal pages at 360/390/414px; all tested documents had viewport-width `scrollWidth`, route-specific canonical paths, and no escaped `<h2` markers.
- Post body text was present (5,591–5,735 characters in sampled posts).

## Remaining boundary

The formal domain is still pending. `astro.config.mjs`, sitemap, and `robots.txt` therefore retain `https://thailand-field-notes.invalid`; this is intentionally not guessed or replaced. Skill 07 should be rerun after the formal domain is supplied.

## Status

`PASS_READY_FOR_SKILL07_RECHECK_WITH_DOMAIN_PENDING`
