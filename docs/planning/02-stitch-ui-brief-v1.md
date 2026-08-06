# Thailand Field Notes — Skill 02 UI Brief

```yaml
skill_id: "02"
site_id: thailand-field-notes
site_name: Thailand Field Notes
project_root: C:\Users\rolel\Desktop\site\site-Thailand Field Notes
source_blueprint: docs/site-blueprint/01-site-blueprint-seo-geo-map-v1.md
source_wireframe: prototypes/01-homepage-wireframe-v1.html
source_manifest: docs/site-blueprint/skill01-output-manifest-v1.json
homepage_content_mode: mixed
brand_asset_mode: text_wordmark
favicon_policy: required_before_launch
visual_lifecycle_stage: VISUAL_ARCHITECTURE
visual_source_status: awaiting_first_stitch_prompt_confirmation
existing_implementation_authority: none
planning_wireframe_authority: structural_only
production_visual_source: false
```

## 1. Upstream authority

Inherit Skill 01 identity, the four-Section / thirteen-Category / thirty-six-Post hierarchy, the four fixed Legal page keys, the `Asia/Bangkok` date-display policy, and the text wordmark direction. The formal domain remains `pending` and must not be invented in the visual prototype.

The Skill 01 wireframe supplies structure only. It is not the final visual authority. No Stitch result is approved yet.

## 2. Visual direction to test

Create an editorial-utility travel interface: calm, readable, field-note inspired, and useful before decorative. Use a warm paper background, dark ink text, a restrained terracotta accent, soft green utility panels, serif display headlines, and a neutral system sans-serif for body text. These are a candidate direction for review, not a final lock.

Use the approved text wordmark `Thailand Field Notes`. Do not invent a symbol, single-letter mark, mascot, official tourism emblem, or destination logo. A favicon is a launch requirement but is not part of this architecture-only approval.

## 3. Required page coverage

The Stitch candidate must cover these real page types:

| Page type | Example route | Required UI |
|---|---|---|
| Homepage | `/` | mixed editorial/utility entry, trip toolkit, Section paths, legal footer |
| Level 1 landing | `/section/plan-your-trip/` | Section purpose, Category discovery, featured/entry Posts, parent context |
| Level 2 hub | `/category/route-lengths/` | Category intro, Post listing, parent Section link, related Category link |
| Level 3 Post | `/post/thailand-in-10-days-balanced-first-trip/` | breadcrumb, title, Published state, long-form reading layout, images, related Posts |
| Legal / Trust | `/about/` and the other three fixed routes | long-form headings, paragraphs, lists, shared header/footer |

Do not create a fake hierarchy through breadcrumbs, tags, filters, or menus. Level 1 and Level 2 need independent page value.

## 4. Mobile-first rules

- Design mobile before desktop; show a compact header and explicit menu behavior.
- Keep touch targets at least comfortable for thumb use and preserve visible focus states.
- Avoid horizontal overflow, dense multi-column tables, tiny metadata, and heavy animation.
- Stack cards into one column on narrow screens; desktop may use two to four columns only when hierarchy remains clear.
- Long titles and paragraphs must wrap without clipping.
- Article images use consistent responsive ratios with descriptive placeholder alt text.
- Legal pages use readable measure, clear headings, lists, and footer links.
- The prototype must work without authentication, forms, live search, analytics, tracking, payment, API calls, or persistent state.

## 5. Page specifications

### Homepage

Hero headline: `Plan Thailand with more clarity.` Use the approved supporting idea about practical routes, local context, and first-time independent visitors. Follow with three utility entries: trip length, travel style, and destination. Then Start Here, four planning paths, selected route guides, an editorial trust note, and the four Legal links.

### Level 1

Show the Section promise, the live Categories beneath it, selected Posts, and a short explanation of how the Section helps the reader. Do not list future expansion as live navigation.

### Level 2

Show the Category problem and answer angle, Post cards with short publication-time placeholders, the parent Section link, and related Categories. The page must be a useful topic hub, not a bare archive.

### Post

Show breadcrumb, H1, short summary, Published state, optional Updated state only when supplied later, long-form body, inline image slots, source/caveat region where applicable, FAQ only when supported, parent Category link, and related Posts.

### Legal / Trust

Use the four Skill 01 page keys: `about`, `privacy_policy`, `terms`, and `user_agreement`. Render the complete adapted copy from Skill 01. Do not replace it with sample text or a one-paragraph stub.

## 6. Date states

Skill 02 defines only presentation states. Use illustrative labels such as `Published: [date]` in the prototype and mark them as placeholders. Do not hardcode the 2026-05-13 schedule into UI. Show `Updated: [date]` only in the conditional state where updated is later than published.

## 7. Image and asset rules

At `VISUAL_ARCHITECTURE`, remote references or clearly marked placeholders may be used and are informational. Do not treat them as production assets. Use only approved article-image roles if assets are shown; do not invent logos or unapproved article titles. Asset localization is a later gate.

## 8. Allowed prototype functions

Responsive navigation, menu open/close presentation, breadcrumbs, disclosure panels, static category filters, pagination appearance, image preview presentation, and keyboard focus states are allowed. All interactions are non-persistent and presentation-only.

## 9. Prohibited content and functions

Do not add accounts, login, newsletter signup, contact forms, payments, booking, shopping cart, analytics, cookies, tracking, live APIs, live search, database writes, deployment integrations, unsupported travel guarantees, unapproved article titles, source-template dates, or official-affiliation claims.

## 10. Acceptance state before first Prompt confirmation

```yaml
upstream_identity_valid: true
hierarchy_coverage_defined: true
mobile_first_defined: true
homepage_mode_inherited: true
legal_layout_defined: true
date_states_defined: true
candidate_authority_gate: PASS
visual_lifecycle_stage: VISUAL_ARCHITECTURE
asset_localization_gate: PRODUCTION_ASSET_LOCALIZATION_PENDING
approved_visual_source: false
final_status: WAITING_FOR_FIRST_PROMPT_CONFIRMATION
```
