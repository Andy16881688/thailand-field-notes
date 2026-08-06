# Thailand Field Notes — Skill 07 Local Launch QA

- Run ID: `skill07-20260806-local-01`
- Site ID: `thailand-field-notes`
- Project root: `C:\Users\rolel\Desktop\site\site-Thailand Field Notes`
- Mode: `production_qa_only` / local launch QA
- QA origin: `http://127.0.0.1:4321/`
- Admin handoff: PASS; 36 posts updated, 72 WebP assets copied; post-Apply validate/check/build/frontend refresh passed.

## Passed

- `pnpm run check`: PASS
- `pnpm run build`: PASS; 58 pages generated
- Homepage, Section, Category, 3 Post routes, About, Privacy Policy, Terms, User Agreement: HTTP 200
- Homepage, Section, Category and Legal mobile widths: no overflow at 360/375/390/414
- Homepage image DOM: local images rendered; no broken image response observed in the final route pass
- Post featured images: loaded with non-zero natural dimensions
- Console/page errors: no JavaScript page errors; one 404 response was observed during the route pass

## Blocking findings

1. Post body is rendered as escaped HTML text (`&lt;h2&gt;...`), so the required reader-facing HTML rendering gate fails.
2. Post route `/post/bangkok-first-timer-guide/` overflows horizontally at 360/375/390px (`scrollWidth=408`); the navigation is wider than the viewport.
3. Non-post canonical links for Section, Category, About, Privacy Policy, Terms, and User Agreement resolve to `/` instead of the current route.
4. `/robots.txt` returns 404 in the local preview.
5. `sitemap-index.xml` contains `https://thailand-field-notes.invalid/`, which is not a production canonical host.
6. `npx` is unavailable, so the Playwright CLI wrapper could not run; equivalent real-browser checks used the installed Chrome executable at `C:\Program Files\Google\Chrome\Application\chrome.exe`.

## Release decision

`BLOCKED_POST_RENDERING_RETURN_TO_04`

Git commit/push, Cloudflare operations, DNS, deployment, and final launch confirmation were not attempted.
