# Astro Data Contract v1

The Astro implementation consumes only `src/data/site-settings.json`, `sections.json`, `categories.json`, `posts.json`, and `legal.json`. Sections and categories are authoritative collections; routes are projections of those collections.

Each live category has at least two posts. Each post has a stable slug, title, real publication date, reader-facing body, local hero asset, and optional process asset. Legal pages are four static informational pages with no unsupported account, payment, community, tracking, or professional-advice assumptions.

The formal domain remains pending. Canonical output may be generated only after the production origin is explicitly supplied.
