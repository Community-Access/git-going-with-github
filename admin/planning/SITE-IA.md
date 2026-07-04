# Site Information Architecture (Stage 1.3)

Status: draft for Stage 1.5 gate approval.
Authority: this doc, together with [EPISODE_MAP.json](../../docs/EPISODE_MAP.json), governs every URL emitted by the site generator in `c:\code\ggg\generator\`.

## Principles

1. **Identity-first URLs.** Every per-episode URL is keyed on the immutable map `filename` (without the `.mp3` extension). When `filename` is locked, the URL is locked. `track_number` is never in a URL.
2. **One landing page per learning band.** Nine top-level navigation routes, one per band. No "appendices" umbrella.
3. **Audio and learning views.** Listeners can browse by feed order (chronological / track) or by curriculum (paired view). Both views resolve to the same per-episode pages.
4. **No legacy redirects.** Greenfield launch. Old paths (`ep##-slug.html`, `appendix-x-*.html`, anything with `cc-NN-` only) simply do not exist on the new site.
5. **All pages are static.** No client-side routing. Every URL serves a real file from `c:\code\ggg\site\`.
6. **Accessibility is non-negotiable.** Semantic HTML, single H1 per page, named landmarks, keyboard-reachable controls, captions/transcripts linked from every episode page.

## URL map

All URLs are rooted at `https://lp.csedesigns.com/ggg/`. Local site build mirrors this layout under `c:\code\ggg\site\`.

| URL | Source | Description |
|-----|--------|-------------|
| `/` | `generator/templates/home.html` + map | Homepage. Curriculum view by default. Toggle for feed view. Hero, what-this-is, "Start here" CTA pointing at `/chapters/ch-00-welcome/`. |
| `/learn/` | `generator/templates/learn.html` + map | Full curriculum-ordered view: chapters 00..22 interleaved with their paired challenges, bonus block, then appendix bands in order ref / git / tools / agents / sec / a11y. Same ordering as `track_number`. |
| `/feed-order/` | `generator/templates/feed-order.html` + map | Strict `track_number` list 1..79 with no grouping. Direct mirror of the RSS feed. |
| `/feed.xml` | `generator/generate-feed.js` + map | Public RSS 2.0 + iTunes podcast feed. |
| `/chapters/` | `generator/templates/band-landing.html` + map filter `learning_band=chapter` | Lists 23 chapters in `topic_number` order. |
| `/challenges/` | same template, filter `learning_band=challenge` | Lists 16 code challenges in `topic_number` order. |
| `/bonus/` | same template, filter `learning_band=bonus` | Lists 5 bonus challenges in `topic_number` order. |
| `/ref/` | same template, filter `learning_band=reference` | Lists 6 reference appendices. |
| `/git/` | same template, filter `learning_band=git` | Lists 5 git appendices. |
| `/tools/` | same template, filter `learning_band=tools` | Lists 12 tools appendices. |
| `/agents/` | same template, filter `learning_band=agents` | Lists 6 agents appendices. |
| `/sec/` | same template, filter `learning_band=sec` | Lists 2 security appendices. |
| `/a11y/` | same template, filter `learning_band=a11y` | Lists 4 accessibility appendices. |
| `/episodes/<filename-without-ext>/` | `generator/templates/episode.html` + map entry | Per-episode page. One per map entry. 79 pages total. |
| `/media/<filename>.mp3` | `c:\code\ggg\site\media\` | Raw enclosure URL. Used by `<enclosure>` and `<audio src>`. Direct download supported. |
| `/about/`, `/contributors/`, `/contact/`, `/license/` | static templates | Standard site furniture. No map dependency. |
| `/search/` | `generator/templates/search.html` + `site/search-index.json` | Client-side search across episode titles, summaries, and chapter marker titles. Built from map. |
| `/sitemap.xml` | `generator/generate-sitemap.js` + map | XML sitemap including all 79 episode pages and all band landings. |
| `/robots.txt` | static | Standard. |
| `/opml.xml` | `generator/generate-opml.js` + map | OPML export of the feed. Stage 5 polish; can ship empty in Stage 3. |

### Per-episode URL examples

| Map entry | URL |
|-----------|-----|
| `ch-00-welcome.mp3` | `/episodes/ch-00-welcome/` |
| `ch-05-collaboration.mp3` | `/episodes/ch-05-collaboration/` |
| `cc-05-make-your-mark.mp3` | `/episodes/cc-05-make-your-mark/` |
| `cc-bonus-d-notifications.mp3` | `/episodes/cc-bonus-d-notifications/` |
| `ref-01-glossary.mp3` | `/episodes/ref-01-glossary/` |
| `a11y-04-document-developer-tools.mp3` | `/episodes/a11y-04-document-developer-tools/` |

## Page-level layout

### Homepage `/`

Sections, top to bottom:

1. Skip link to main content (visually hidden until focus).
2. Site header with primary nav (chapters, challenges, appendices dropdown opening to the six appendix-band routes, search).
3. Hero: show title, tagline, single CTA "Start with Chapter 00: Welcome" linking to `/episodes/ch-00-welcome/`.
4. "How to use this site" three-card row: Learn (curriculum view), Listen (feed view), Reference (band landings).
5. Latest two map entries by `track_number` (NOT by date) as a "Continue where the curriculum begins" strip.
6. Newsletter / register CTA. No-op for now.
7. Site footer with license, repo links, accessibility statement.

No date carousel. No "recent episodes" widget. Order is curriculum-driven, not chronological.

### Curriculum view `/learn/`

- Linear ordered list of all 79 entries by `track_number`.
- Visual grouping: chapter+challenge pairs share a card (the chapter on top, the challenge nested below in a `details`/`summary` block), bonuses get their own card-band, each appendix band gets a heading.
- Each card: track number ("Episode 7 of 79"), within-topic identity ("Challenge 03: Join the Conversation"), summary, duration, and a link to the per-episode page.
- Day 1 and Day 2 banner inserts at the relevant track positions (see "Facilitator banners" below).

### Feed view `/feed-order/`

- Flat ordered table of all 79 entries by `track_number`.
- Columns: track, topic id (ch-05), title, duration, link.
- Sortable column headers (client-side, JS optional - default order is correct).

### Band landing `/<band>/`

- H1: human-readable band name ("Chapters", "Code Challenges", "Bonus Challenges", "Reference", "Git", "Tools", "Copilot and Agents", "Security", "Accessibility").
- Lead paragraph: one sentence describing what this band covers.
- Ordered list by `topic_number`. Each item: within-topic id, title, summary, duration, link.
- For `/chapters/`: each item shows the paired challenge as a nested link (when `pairs_with_uuid` resolves the other direction).
- For `/challenges/`: each item shows its parent chapter as a nested link.
- For `/bonus/`, `/ref/`, `/git/`, `/tools/`, `/agents/`, `/sec/`, `/a11y/`: no pairing.

### Per-episode page `/episodes/<filename-without-ext>/`

Sections, top to bottom:

1. Skip link.
2. Site header (same as homepage).
3. Breadcrumb: Home -> band landing -> this episode.
4. H1: title from map (e.g. "Chapter 05: Collaboration").
5. Subtitle (when map `subtitle` is set).
6. Episode metadata block: track number, within-topic id, duration, learning band, paired-with link (when applicable).
7. **Inline player component** (see below).
8. **Chapter list component** (see below).
9. Summary (from map `summary`).
10. Show notes (rendered from `podcasts/scripts/<group>/<slug>.txt` companion show-notes file, or generated from script. Source TBD in Stage 5).
11. Authoritative sources block (from `scripts/add-authoritative-sources.js` output, keyed by `narration_id`).
12. Cross-references: links to prerequisites and follow-ups (from map `pairs_with_uuid` and a future `prerequisites` field, or static curation in bundles).
13. Transcript link (opens transcript page in same tab; transcript is its own file at `/episodes/<slug>/transcript/`).
14. Download link to mp3 enclosure URL.
15. Next / previous navigation by `track_number`.
16. Footer.

### Transcript page `/episodes/<filename-without-ext>/transcript/`

- H1: "Transcript: <episode title>".
- Static HTML rendering of the cleaned-up script text.
- Speaker name spans (Host A, Host B) styled but kept as plain text in the DOM.
- Download as `.txt` button.

## Facilitator banners

Day 1 and Day 2 are workshop-cohort orientation breakpoints. They appear ONLY on the curriculum view `/learn/` and on the relevant per-episode pages, never on the feed view, band landings, or homepage.

| Banner | Appears at | Content |
|--------|------------|---------|
| Day 1 | Above `ch-00` on `/learn/`; above the metadata block on `/episodes/ch-00-welcome/`, `/episodes/ch-01-pre-workshop-setup/` | "Day 1 of the workshop. Goal: get oriented and complete Challenge 01." |
| Day 1: Issues and Collaboration | Above `ch-05` on `/learn/`; above the metadata block on `ch-05` and `cc-05` episode pages | Day 1 mid-morning section header. |
| Day 1: Pull Requests and Merge Day | Above `ch-06` on `/learn/`; above the metadata block on `ch-06..ch-10` and `cc-06..cc-10` | Day 1 afternoon section header. |
| Day 2: Local Workflow | Above `ch-11` on `/learn/`; above the metadata block on `ch-11..ch-16` and `cc-11..cc-16` | Day 2 morning section header. |
| Day 2: Agents and Capstone | Above `ch-17` on `/learn/`; above the metadata block on `ch-17..ch-22` and `cc-bonus-a..e` | Day 2 afternoon section header. |

Banner block markup: `<aside class="facilitator-banner" aria-label="Workshop day marker">`. Visually a thin colored stripe with the day label and section title; programmatically a labelled landmark.

The banner placements above are driven by a small `facilitator-banners.json` config consumed by the generator. The config is NOT in `EPISODE_MAP.json` because it is a presentation concern, not an identity concern.

## Inline player component

Markup:

```html
<figure class="episode-player" role="region" aria-label="Episode audio player">
  <figcaption>Listen: Chapter 05: Collaboration</figcaption>
  <audio
    controls
    preload="metadata"
    src="/media/ch-05-collaboration.mp3"
    aria-describedby="player-help-ch-05-collaboration">
    Your browser does not support the audio element.
    <a href="/media/ch-05-collaboration.mp3">Download the mp3</a>.
  </audio>
  <p id="player-help-ch-05-collaboration" class="visually-hidden">
    Use Space to play and pause. Use arrow keys to scrub. Chapter markers are available below the player.
  </p>
</figure>
```

Requirements:

- Native `<audio controls>` with no JS wrapper for v1. Browser controls are accessible by default.
- `preload="metadata"` so duration shows without fetching the file body.
- `src` points to `/media/<filename>` which mirrors the map `filename`.
- A non-controls fallback `<a>` always provides the download link.
- ARIA `aria-describedby` ties to a visually hidden help paragraph that names the keyboard model.

Stage 5 enhancement (post-launch): a custom player that surfaces chapter markers as clickable jump links. v1 ships native controls only.

## Chapter list component

Markup:

```html
<section class="episode-chapters" aria-labelledby="chapters-heading">
  <h2 id="chapters-heading">Chapters</h2>
  <ol class="chapter-list">
    <li>
      <button type="button" class="chapter-jump" data-start="0">
        <span class="chapter-time">00:00</span>
        <span class="chapter-title">Welcome and overview</span>
      </button>
    </li>
    <!-- repeat per chapter marker -->
  </ol>
</section>
```

Requirements:

- Chapter data sourced from `podcasts/chapters/<slug>.json` (already authored for all 79; mirrors the CHAP frames in the mp3). Generator reads this file by `narration_id` (or by `filename-without-ext`, equivalent).
- Each marker is rendered as an `<ol><li>` with a button. The button's click handler sets `audio.currentTime = data.start`. JS file: `site/static/js/chapter-jump.js`. Progressive enhancement: if JS is off, the buttons are inert but the list is still readable.
- Time format `MM:SS` for under one hour, `H:MM:SS` for over. (None of the 79 entries exceed an hour, so v1 always uses `MM:SS`.)
- Button labels are full chapter titles (not truncated). Keyboard accessible by default.

## Cross-link rendering

Wherever a map entry references another entry (`pairs_with_uuid`, or a future `cross_refs` array, or a markdown link in show notes), the generator rewrites the link to the canonical URL `/episodes/<filename-without-ext>/`. The link text is the resolved entry's title.

Show notes prose may contain free-text references like "as we discussed in Chapter 5"; these are NOT auto-rewritten. The rewrite only fires when a structured reference (UUID or current slug) is present.

## Accessibility checklist (per page)

Every generated page MUST pass:

- One `<h1>`. Heading levels do not skip.
- `<main>` landmark contains the primary content.
- `<nav>` for the top nav. Skip link targets `<main id="content">`.
- All `<a>` and `<button>` have visible focus indicators (3:1 contrast against background).
- Color contrast meets WCAG 2.2 AA (4.5:1 body, 3:1 large text).
- All `<img>` have meaningful `alt` or `alt=""` for decorative.
- `<audio>` has a labelled `<figcaption>`.
- Language is set on `<html lang="en">`.
- Page title format: "<Episode title> | Git Going with GitHub" for episode pages; "<Section name> | Git Going with GitHub" for landings.
- Forms (search, newsletter) have associated `<label>` elements.

The generator runs axe-core in CI on a representative sample (homepage, one band landing, one episode page, one transcript page) and fails the build on any violation at impact >= serious.

## URL stability contract

| Field | Stability | Notes |
|-------|-----------|-------|
| `filename` (without extension) | Permanent after launch | Drives the per-episode URL. Renaming an episode requires either (a) a 301 redirect from the old URL, or (b) waiting until a future major site rev. Launch is greenfield so we set this once. |
| `track_number` | Mutable | Never appears in a URL. Drives feed order and "Episode N of M" labels only. |
| Band routes (`/chapters/` etc.) | Permanent after launch | Each route is a stable noun for a learning band. Adding a band later requires a new route; we do not rename existing ones. |
| `/learn/`, `/feed-order/`, `/feed.xml` | Permanent after launch | Top-level navigation anchors. |

## Open questions for Stage 1.5 review

1. **Subtitle field on the per-episode page.** The map does not currently populate `subtitle`. Should Stage 2 enrich the map with a one-sentence subtitle per entry, or do we collapse `summary` into the lead and skip the subtitle slot?
2. **Show notes vs script.** The show notes block currently renders the script. Should we generate a separate "show notes" markdown per entry, distinct from the spoken script? Decision deferred to Stage 5.
3. **Search index scope.** v1 search indexes title + summary + chapter marker titles. Should it also index the full transcript? Transcript-level search adds ~5 MB to `search-index.json`. Decision deferred to Stage 5.
4. **OPML export.** Stage 5 polish item. Confirm whether to ship a placeholder `opml.xml` in Stage 3 or defer entirely.

## Mapping to existing tooling

- `c:\code\ggg\generator\generate-site.js` (Stage 2.2 refactor target) emits every URL in this doc by reading `EPISODE_MAP.json`.
- `c:\code\ggg\generator\generate-feed.js` (new in Stage 3.7) emits `/feed.xml` from the same map.
- `c:\code\ggg\generator\generate-sitemap.js` (new in Stage 3.8) emits `/sitemap.xml`.
- `c:\code\ggg\generator\templates/` holds page templates.
- `c:\code\ggg\site\` is the build output; `c:\code\ggg\site\media\` mirrors `podcasts/audio/kokoro-am_liam-af_jessica/` post-rename.
- `c:\code\ggg\generator\config\listening-order.json` is REPLACED by map-derived ordering and removed in Stage 2.2.
- `c:\code\ggg\generator\manifest.json` is REPLACED by map-derived data and removed in Stage 2.2.

## Routing summary (one-screen reference)

```
/                                          home
/learn/                                    curriculum view (interleaved)
/feed-order/                               strict track_number list
/feed.xml                                  podcast RSS
/chapters/                                 23 entries
/challenges/                               16 entries
/bonus/                                    5 entries
/ref/                                      6 entries
/git/                                      5 entries
/tools/                                    12 entries
/agents/                                   6 entries
/sec/                                      2 entries
/a11y/                                     4 entries
/episodes/<filename-without-ext>/          per-episode page (79 total)
/episodes/<filename-without-ext>/transcript/  per-episode transcript (79 total)
/media/<filename>.mp3                      mp3 enclosure (79 total)
/search/                                   client-side search
/sitemap.xml                               sitemap
/robots.txt                                robots
/opml.xml                                  OPML export (Stage 5, placeholder OK)
/about/, /contributors/, /contact/, /license/   static furniture
```

Total static URLs generated by the build: roughly 12 + 9 + 79 + 79 = 179 HTML pages plus 79 mp3 enclosures plus feed/sitemap/opml. Buildable in a single `node generate-site.js` pass.

## Authoritative Sources

Use these official references when you need the current source of truth for this IA.

- [Episode map](../../docs/EPISODE_MAP.json)
- [Episode map schema](EPISODE-MAP-SCHEMA.json)
- [Reorganization master plan](REORG-PLAN.md)
- [Tooling inventory](TOOLING-INVENTORY.md)

### Section-Level Source Map

Use this map to verify facts for each major section in this file.

- **Principles:** [Episode map](../../docs/EPISODE_MAP.json), [Reorganization master plan](REORG-PLAN.md)
- **URL map:** [Episode map](../../docs/EPISODE_MAP.json), [Tooling inventory](TOOLING-INVENTORY.md)
- **Page-level layout:** [Reorganization master plan](REORG-PLAN.md), [Episode map](../../docs/EPISODE_MAP.json)
- **Facilitator banners / components / cross-link rendering:** [Episode map](../../docs/EPISODE_MAP.json), [Reorganization master plan](REORG-PLAN.md)
- **Accessibility checklist / URL stability contract:** [Site Information Architecture (Stage 1.3)](SITE-IA.md), [Reorganization master plan](REORG-PLAN.md)
- **Mapping to existing tooling / routing summary:** [Tooling inventory](TOOLING-INVENTORY.md), [Reorganization master plan](REORG-PLAN.md)
