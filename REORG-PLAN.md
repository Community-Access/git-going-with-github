# Git Going with GitHub - Reorganization Master Plan

Living document. Update checkboxes as work completes. Two repos in scope:

- **Content repo:** `c:\code\git-going-with-github` (Community-Access/git-going-with-github) - book, scripts, audio source of truth.
- **Site repo:** `c:\code\ggg` - lp.csedesigns.com static site, episode HTML, RSS feed, media folder.

Last updated: 2026-05-18.

---

## Launch posture

**Greenfield.** No published audience yet, no subscribers, no external inbound links worth preserving. Treat the entire reorg as preparation for a clean first launch.

Consequences:

- No 301 redirects, no `moved.html`, no Caddyfile redirect rules. Old paths simply disappear at cutover.
- RSS `<guid>` values can change freely until we publicly announce the feed. We still mint stable UUIDs now so we never have to break GUIDs once we *do* announce.
- No SEO carryover. New URLs are the only URLs.
- No subscriber re-download risk.

---

## Identity model

The architecture rests on a **two-axis identity model** in `docs/EPISODE_MAP.json`:

1. **Identity axis (immutable after launch).** `uuid` and `filename` are stable forever. They appear in mp3 ID3 frames, RSS `<guid>`, and enclosure URLs.
2. **Ordering axis (freely reassignable).** `track_number` and `pairs_with_uuid` drive the podcast feed and the website learning view. Rewriting them is a map edit plus a regenerate; no audio is touched, no filename is renamed.

This separation is why insertion, interleaving, and topic expansion all become map edits rather than cascade renames.

### Filename scheme

Filename pattern: `<topic-prefix>-<NN>[-<letter>]-<slug>.mp3`

| Group | Topic prefix | learning_band | Example |
|---|---|---|---|
| Chapter | `ch` | `chapter` | `ch-05-collaboration.mp3` |
| Code challenge | `cc` | `challenge` | `cc-05-fork-and-clone.mp3` |
| Bonus challenge | `cc-bonus` | `bonus` | `cc-bonus-a-improve-agent.mp3` |
| Reference appendix | `ref` | `reference` | `ref-01-glossary.mp3` |
| Git appendix | `git` | `git` | `git-03-security.mp3` |
| Tools appendix | `tools` | `tools` | `tools-01-vscode-reference.mp3` |
| Agents appendix | `agents` | `agents` | `agents-01-copilot-reference.mp3` |
| Security appendix | `sec` | `sec` | `sec-01-branch-protection.mp3` |
| Ops appendix | `ops` | `ops` | `ops-01-actions-and-workflows.mp3` |
| Reach appendix | `reach` | `reach` | `reach-01-community-and-social.mp3` |

Rules:

- `NN` is zero-padded two-digit within-topic. `ch-05` is the 6th chapter (00-indexed) regardless of feed position.
- Optional letter suffix (`ch-05a-`, `ch-05b-`) is reserved for mid-sequence insertion where the new content is logically part of the adjacent chapter.
- Slugs are lowercase ASCII kebab-case. No double dashes. No trailing dash. Max 60 chars.
- Within-topic numbers are append-only. Deleted entries leave the number reserved (entry stays in map with `archived: true`).
- Two digits is the cap. If a single topic exceeds 99 entries, that is a curriculum signal to split the topic, not to extend numbering.

### Track number

- `track_number` is a 1-based integer. Unique across the entire map. Contiguous after every `regenerate-all` run (no gaps).
- The feed is sorted strictly by `track_number`.
- ID3 `TRCK` frame is written from `track_number`.
- Listeners see "Episode N of M" by track number; titles still carry the within-topic identity ("Chapter 5: Collaboration").

### pairs_with_uuid

- Optional. Points from child (challenge, bonus, appendix) to parent (usually a chapter).
- Used by `regenerate-all` to compute interleaved track numbers automatically: parent track N, then all children of N in their `pair_order`, then parent track N+1.
- Must point to an existing UUID. Cannot cycle. Lint-enforced.
- A parent can have many children. A child has at most one parent.

### Narration-vs-display contract

- Within-topic number (`ch-05`) is the **curriculum truth** spoken in narration. It never changes after launch. Show notes, ID3 titles, site headings all use it.
- Track number is the **feed truth** for podcast apps. It can shift freely; nothing in the recorded audio refers to it.
- This is why interleaving challenges with chapters is safe: the narration in `cc-05` calling itself "Challenge 5" remains correct regardless of whether it plays at track 6 (paired with chapter 5) or track 30 (challenges grouped at end).

---

## Guiding principles

1. **Audio is sacred.** Once an mp3 is rendered, tagged, and chaptered, we do not re-render it to change a number or a name.
2. **One canonical map, many surfaces.** `docs/EPISODE_MAP.json` is the single source of truth. Every rename, feed regen, ID3 retag, site build, and deploy reads from it. No tool hardcodes a slug or number.
3. **All tooling conforms to the map.** Tools that currently hardcode slugs get refactored in Stage 2 before they touch anything in Stage 3.
4. **Stable UUIDs from day one.** Each episode gets a permanent UUID stored in the map, in its ID3 `TXXX:UUID` frame, and in its RSS `<guid isPermaLink="false">`.
5. **Decoupled identity and ordering.** Filename is identity. `track_number` is display. Never confuse the two.
6. **Clean cutover on the server.** Replace `scp -r` with `rsync --delete` plus pre-deploy tarball backup.
7. **Validate at every gate.** Schema check, link check, RSS validate, mp3 tag verify, server-side file-list diff. No stage closes without green.
8. **Two repos move in lockstep.** Content-repo renames produce matching site-repo updates in the same commit window.

---

## Decisions locked

1. **Appendix filenames** - track-prefixed per topic (`ref`, `git`, `tools`, `agents`, `sec`, `ops`, `reach`).
2. **Numbering** - within-topic two-digit, decoupled from feed track number.
3. **Challenges and bonus** - keep `cc-NN-` and `cc-bonus-x-` as topic prefixes.
4. **Map distribution** - content repo owns `docs/EPISODE_MAP.json`; `deploy-ggg.ps1` copies it to `c:\code\ggg\generator\episode-map.json` immediately before invoking the generator. Site repo `.gitignore` excludes the copy.
5. **Chapter 22 capstone** (currently ep79 "what comes next") - becomes `ch-22-what-comes-next.mp3`.
6. **Feed ordering** - interleaved: chapters and their paired challenges side by side, with unpaired bonuses and appendices following in topic-prefixed groups.
7. **Chapter timing source** - to be confirmed during Stage 0.4 by inspecting `podcasts/audio/segments/`. Path A (rerun timings-only mode) preferred; B (ffprobe segment scan) is fallback; C (heuristic split) is escape hatch.

---

## EPISODE_MAP.json schema

Each entry:

```jsonc
{
  "uuid": "string, UUID v4, immutable",
  "filename": "string, matches /^(ch|cc|cc-bonus|ref|git|tools|agents|sec|ops|reach)-[0-9]{2}[a-z]?-[a-z0-9-]+\\.mp3$/",
  "topic_prefix": "ch | cc | cc-bonus | ref | git | tools | agents | sec | ops | reach",
  "topic_number": "string, NN or NNa form, matches filename",
  "learning_band": "chapter | challenge | bonus | reference | git | tools | agents | sec | ops | reach",
  "title": "string, human-readable, used in ID3 TIT2 and feed <title>",
  "subtitle": "string, optional, used in feed <itunes:subtitle>",
  "summary": "string, plain text, used in feed <description> and ID3 COMM",
  "track_number": "integer >= 1, unique, contiguous, mutable",
  "pair_order": "integer >= 0, optional, sort order among children of the same parent",
  "pairs_with_uuid": "string UUID or null, points to parent entry",
  "duration_seconds": "integer, derived from mp3, refreshed by tagger",
  "published_at": "ISO 8601 datetime, set at first feed publish, then frozen",
  "source_script": "string, repo-relative path to the script file",
  "cover_art": "string, repo-relative path or null to use show default",
  "explicit": "boolean, default false",
  "archived": "boolean, default false; archived entries keep UUID reserved but are excluded from feed",
  "notes": "string, free-form maintainer notes"
}
```

Top-level:

```jsonc
{
  "schema_version": "1.0.0",
  "show": {
    "title": "Git Going with GitHub",
    "default_cover_art": "site/media/cover.jpg",
    "feed_url": "https://lp.csedesigns.com/ggg/feed.xml"
  },
  "episodes": [ /* array of entries */ ]
}
```

Schema lives at `docs/EPISODE-MAP-SCHEMA.json` (JSON Schema draft 2020-12) and is enforced by a Python validator in `podcasts/tools/episode_map.py`.

---

## Stage 0 - Lock audio identity (do this first)

Why first: once every mp3 carries its UUID, title, track number, and chapter markers in ID3, all subsequent renames are pure metadata operations.

### 0.1 - Audit current audio inventory [DONE 2026-05-18]
- [x] Run `podcasts/verify_audio_inventory.py`; **79 total mp3s confirmed** (58 ep, 16 cc-NN challenges, 5 cc-bonus). Verifier checks 50 of 79 in its listening-order subset; remaining 29 (bonuses, ep79 capstone, unreleased appendices) will be tagged in Stage 0.3 regardless.
- [x] `tmp-audio-inventory.csv` written: slug, filename, group, size, duration, sha256. Totals: 486.9 MB, 14.99 hours.
- [x] Spot-checked `ep05`, `cc-07`, `ep44`: mp3 duration vs segment-manifest sum diff under 0.1 s on all three. Pass.
- [x] Snapshot at `podcasts/_snapshot-pre-tagging-20260518/` (79 files).
- [x] **Cover art: DEFERRED.** None present in either repo; Stage 0.3 will skip the `APIC` frame and Stage 0.5+ feed work will leave `<itunes:image>` unset until art is supplied. No other stage is blocked.
- [x] Known finding: `ep04-the-learning-room` has 3 transcript-vs-script text mismatches (segments 16, 33, 64). Logged for Stage 3.4 disposition; not a re-render blocker.

### 0.2 - Mint EPISODE_MAP.json with stable UUIDs
- [ ] Generate UUID v4 per inventory entry.
- [ ] Create `docs/EPISODE-MAP-SCHEMA.json` first.
- [ ] Create `docs/EPISODE_MAP.json` with one entry per mp3.
  - Populate `uuid`, `filename` (CURRENT name for now), `topic_prefix` (current scheme), `topic_number` (current number), `learning_band`, `title`, `summary`, `duration_seconds`, `source_script`.
  - Leave `track_number` matching current listening order (placeholder; reassigned in Stage 1).
  - Leave `pairs_with_uuid` null for now; populated in Stage 1.
- [ ] Hand-verify 5 random entries against the audio inventory CSV.
- [ ] Run schema validator: zero errors.

### 0.3 - Build the ID3 tagger [DONE 2026-05-18]
- [x] Created `podcasts/tools/episode_map.py` (load, validate, lookup helpers).
- [x] Created `podcasts/tools/tag_id3.py` using mutagen. Writes per entry:
  - `TIT2` title (provisional from slug until Stage 1.1 supplies real titles)
  - `TPE1` show artist
  - `TALB` "Git Going with GitHub"
  - `TRCK` track_number (when present in map; populated in Stage 1.2)
  - `COMM` summary (when present in map; populated in Stage 1.x)
  - `APIC` cover art - **skipped until cover art supplied**
  - `TXXX:UUID` episode UUID
  - `TXXX:TOPIC` narration_id
  - `TXXX:LEARNING_BAND` learning_band (provisional for `ep` group; refined in Stage 1.1)
  - `TDRC` year from published_at if set
- [x] Ran tagger over all 79 mp3s. Idempotent: rerun reports 79 / 79 already in sync.
- [x] Verified with `podcasts/tools/verify_id3.py`: 79 / 79 pass. Every mp3 has all required frames; UUID matches map.

### 0.4 - Choose chapter timing source [DONE 2026-05-18]
- [x] Inspect `podcasts/audio/segments/` for per-episode segment manifests. Found `manifest.json` per slug with per-segment `duration`.
- [x] Discovered `podcasts/chapters/<slug>.json` exists for **all 79 episodes**, each with hand-authored `{startTime, title}` chapter lists (schema version 1.2.0). This is the canonical chapter source.
- [x] **Path A0 selected:** read `podcasts/chapters/<slug>.json` directly. No TTS rerun, no segment math, no ffprobe pass. `manifest.json` remains a verification cross-check (sum of durations vs mp3 length).
- [x] Choice documented inline above; `docs/CHAPTER-TIMING-DECISION.md` is no longer needed (the path is too simple to warrant its own doc).

### 0.5 - Build the chapter writer [DONE 2026-05-18]
- [x] Created `podcasts/tools/write_chapters.py` using mutagen `CHAP` and `CTOC` frames.
- [x] Input: `podcasts/chapters/<slug>.json` (already authored for all 79; chapter titles come from these files). End-time per chapter is the next chapter's start_time; final chapter ends at the mp3 duration.
- [x] Output: in-place mp3 update, idempotent. Existing CHAP / CTOC are replaced atomically; second run reports 79 / 79 already in sync.
- [x] Ran over all 79 mp3s. 1,047 chapter markers total (avg 13.3, min 4 for ep00 and ep49, max 42 for cc-bonus-b). Verified with `verify_id3.py --chapters`: 79 / 79 pass.

### 0.6 - Stage 0 verification
- [x] All 79 mp3s have UUID, TIT2, TALB, TPE1, TXXX:UUID, TXXX:TOPIC, TXXX:LEARNING_BAND. (`TRCK`, `COMM`, `APIC` deferred: `TRCK` populated in Stage 1.2 once feed order is locked; `COMM` populated alongside titles in Stage 1.1; `APIC` deferred pending cover art.)
- [x] All 79 mp3s have CHAP and CTOC frames.
- [ ] Open three random mp3s in a podcast app (Apple Podcasts, Pocket Casts, Overcast) and confirm chapter list displays. **User action - manual check required.**
- [ ] Tag and push: `audio-locked-20260518`. **Hold for user confirmation - hard to reverse.**

**Stage 0 gate:** all 79 mp3s carry full identity in ID3 (cover art may still be missing). Stop and confirm before moving to Stage 1.

---

## Stage 1 - Design the new structure

Stage 1 is design work only. No file renames yet.

### 1.1 - Plan new filenames [DONE 2026-05-18]
- [x] For each of the 79 entries in `EPISODE_MAP.json`, populated `filename`, `topic_prefix`, `topic_number`, `learning_band`, and `title`:
  - **23 Chapters**: `ch-00-welcome.mp3` through `ch-22-what-comes-next.mp3`.
    Mechanical for ch-00..ch-17 (ep00..ep17). User-approved promotions: ep46 -> ch-18 (How Git Works: The Mental Model), ep47 -> ch-19 (Fork and Contribute), ep48 -> ch-20 (Build Your Agent: Capstone), ep37 -> ch-21 (Contributing to Open Source), ep79 -> ch-22 (What Comes Next).
  - **16 Challenges**: `cc-NN-<slug>.mp3` preserved from current naming.
  - **5 Bonus**: `cc-bonus-<a..e>-<slug>.mp3` preserved.
  - **35 Appendices** across six bands (ops and reach dropped; a11y added):
    - `ref` (6): ep18, ep19, ep20, ep38, ep42, ep43
    - `git` (5): ep21, ep50, ep51, ep52, ep53
    - `tools` (12): ep22, ep23, ep24, ep25, ep26, ep27, ep31, ep32, ep33, ep34, ep35, ep36
    - `agents` (6): ep39, ep40, ep41, ep44, ep54, ep55
    - `sec` (2): ep28, ep29
    - `a11y` (4): ep30, ep45, ep49, ep56
- [x] Tool: `podcasts/tools/apply_stage_1_1.py`. Idempotent. Writes `tmp-proposed-stage-1-1.csv` as audit trail.
- [x] Schema updated to allow `a11y` and the bonus-letter filename pattern; `ops` and `reach` removed from enums.
- [x] Tagger rerun: 79 / 79 mp3s now carry final `TIT2` (e.g. "Reference 01: Glossary of Terms") and `TXXX:LEARNING_BAND` (e.g. `a11y`, `ref`, `chapter`). Idempotent rerun: 79 already in sync. Verify with chapters: 79 / 79 pass.

### 1.2 - Plan feed ordering [DONE 2026-05-18]
- [x] Populated `pairs_with_uuid` on every cc-NN (NN=01..16) pointing at the matching ch-NN UUID. `pair_order = 1` on each paired child.
- [x] **Bonus placement decision** (user-approved): all 5 bonuses (`cc-bonus-a..e`) grouped at the end of the chapter+challenge arc, before appendices. No `pairs_with_uuid`.
- [x] **Appendix placement decision** (user-approved): grouped by band in the order `ref -> git -> tools -> agents -> sec -> a11y`, ordered by `topic_number` within each band. No `pairs_with_uuid`.
- [x] Computed `track_number` 1..79 for every entry. Final layout:
  - track 1: ch-00
  - tracks 2..33: 16 paired (ch-NN, cc-NN) blocks for NN=01..16
  - tracks 34..39: ch-17 through ch-22 (no challenges)
  - tracks 40..44: cc-bonus-a..e
  - tracks 45..50: ref-01..ref-06
  - tracks 51..55: git-01..git-05
  - tracks 56..67: tools-01..tools-12
  - tracks 68..73: agents-01..agents-06
  - tracks 74..75: sec-01..sec-02
  - tracks 76..79: a11y-01..a11y-04
- [x] Tool: `podcasts/tools/apply_stage_1_2.py`. Writes `tmp-proposed-feed-order.csv` as audit trail. Idempotent.
- [x] Tagger rerun: all 79 mp3s now carry `TRCK = track_number`. Idempotency confirmed. Verify --chapters: 79 / 79.

### 1.3 - Site information architecture
- [x] Write `docs/SITE-IA.md` describing:
  - Homepage layout (curriculum view + feed view).
  - Track landing pages (`/chapters/`, `/challenges/`, `/bonus/`, `/ref/`, `/git/`, `/tools/`, `/agents/`, `/sec/`, `/a11y/`).
  - Per-episode page URL pattern: `/episodes/<filename-without-ext>/`.
  - Day-1 and Day-2 facilitator banners.
  - Inline player and chapter list component.

### 1.4 - Tooling inventory
- [x] Recursive grep across the whole content repo (admin/, agents/, classroom/, learning-room/, html/, docs/, scripts/, podcasts/, generate-podcast-scripts.py, generate-*.bat, build-rss-feed.bat) and the whole site repo for hardcoded slugs, episode numbers, appendix letters.
- [x] Write `docs/TOOLING-INVENTORY.md`: every script, its current hardcoded references, the refactor required.

### 1.5 - Stage 1 gate
- [x] All `new_filename` values assigned and reviewed.
- [x] All `pairs_with_uuid` populated.
- [x] Proposed `track_number` ordering reviewed and approved.
- [x] `SITE-IA.md` approved.
- [x] `TOOLING-INVENTORY.md` complete.

**Stage 1 gate:** stop and confirm before any rename, retag, or tooling refactor.

---

## Stage 2 - Tooling conformance

All tools read from `EPISODE_MAP.json`. No tool hardcodes a slug, episode number, appendix letter, or filename pattern.

### 2.1 - Shared loaders
- [ ] Python: `podcasts/tools/episode_map.py` already created in Stage 0.3. Extend with sort helpers, filter helpers, pairs lookup.
- [ ] Node: `c:\code\ggg\generator\episode-map.js` - load, validate, sort by `track_number`, lookup by UUID and by filename.
- [ ] PowerShell: `scripts/Get-EpisodeMap.ps1` - load and project a typed PSCustomObject array.
- [ ] All three loaders share the same JSON Schema validation (call out to `python -m podcasts.tools.episode_map --validate`).

### 2.2 - Refactor every tool in TOOLING-INVENTORY.md
- [ ] LLM pipeline (`podcasts/llm-podcast-generator-review/`): script paths and slugs come from map.
- [ ] TTS (`podcasts/tts/generate_all_kokoro.py`, `generate_audio.py`, `generate_episode.py`): slug lookup via map.
- [ ] Listening order (`podcasts/listening_plan.py`): order derived from `track_number`.
- [ ] Audio inventory (`podcasts/verify_audio_inventory.py`): expected files come from map.
- [ ] Transcript generator (`podcasts/tts/generate_transcripts.py`): slug list from map.
- [ ] Site generator (`c:\code\ggg\generator\generate-site.js`): episode list, ordering, per-episode page generation all from map.
- [ ] Feed generator (`c:\code\ggg\generator\generate-feed.js` or equivalent): RSS items from map, `<guid>` from UUID, `<itunes:episode>` from track_number, `<itunes:episodeType>` from learning_band.
- [ ] Validate feed (`c:\code\ggg\generator\validate-feed.js`): validates against the map.
- [ ] Link checker / cross-reference rewriter: see Stage 3.5.
- [ ] Build scripts (`build-rss-feed.bat`, `generate-*.bat`): call the refactored tools.

### 2.3 - Map distribution
- [ ] `deploy-ggg.ps1` adds a `Sync-EpisodeMap` step that copies `c:\code\git-going-with-github\docs\EPISODE_MAP.json` to `c:\code\ggg\generator\episode-map.json` and to `c:\code\ggg\site\episode-map.json` (public, for client-side use if needed).
- [ ] Site repo `.gitignore` excludes `generator/episode-map.json` and `site/episode-map.json`.
- [ ] Generator fails fast with a clear error if `generator/episode-map.json` is missing.

### 2.4 - Deploy refactor (`deploy-ggg.ps1`)
- [ ] Replace `Sync-Files` body with `rsync -av --delete --exclude=.git ${LocalGggPath}/ ${target}/`.
- [ ] Add `-DryRun` switch that runs `rsync -av --delete --dry-run` and prints planned changes.
- [ ] Add `-Confirm` switch that prompts before the destructive sync when `--delete` would remove more than 5 files.
- [ ] Add `Backup-RemoteSite` step that creates `~/ggg-backup-YYYYMMDD-HHMMSS.tar.gz` on the server before sync.
- [ ] Add `Verify-RemoteFiles` step that diffs server file list against local file list post-deploy.
- [ ] Keep `Update-RSSFeed` calling the refactored generator that now reads from map.

### 2.5 - Slug-lint
- [ ] `scripts/lint-no-hardcoded-slugs.ps1`: grep for forbidden patterns outside allowed files.
  - Forbidden: `ep\d{2}`, `appendix-[a-z]\b`, `chapter-\d+\b` in script files (except show-notes prose folders).
  - Allowed locations: `docs/EPISODE_MAP.json`, `docs/SITE-IA.md`, `docs/UPDATING-CONTENT.md`, `REORG-PLAN.md`, show-notes prose files.
- [ ] Returns non-zero on violation. Wired into pre-commit hook and CI.

### 2.6 - Contract test
- [ ] `scripts/test-tooling-conformance.ps1`: temporarily flips a single map entry's `track_number`, regenerates feed and site, asserts the changed entry's position moved and no audio file was touched. Reverts the map after.
- [ ] Run in CI on every PR that touches `docs/EPISODE_MAP.json`, `podcasts/tools/`, `c:\code\ggg\generator\`, or any tool.

### 2.7 - Map validators
- [ ] `episode_map.py --validate` enforces:
  - Schema (jsonschema).
  - UUID uniqueness across all entries.
  - UUID format (v4).
  - `filename` matches regex for its `topic_prefix`.
  - `topic_prefix` matches `learning_band` per allowed pairings.
  - `track_number` uniqueness.
  - `track_number` contiguity (1..N, no gaps) across non-archived entries.
  - `pairs_with_uuid` resolves to an existing UUID.
  - `pairs_with_uuid` does not cycle.
  - `pair_order` unique within a parent.
  - Every `filename` in map has a matching mp3 on disk (in source location).
  - Every mp3 on disk has a matching map entry (no orphans).
  - `learning_band` is one of the enum values.
- [ ] Wired into pre-commit and CI.

### 2.8 - Stage 2 gate
- [ ] All listed tools refactored.
- [ ] `slug-lint` clean.
- [ ] `test-tooling-conformance` green.
- [ ] `deploy-ggg.ps1 -DryRun` shows expected changes against current server state.
- [ ] Contract test green.

**Stage 2 gate:** every tool reads from the map. Nothing hardcodes a slug. Stop and confirm before cutover.

---

## Stage 3 - One-shot cutover

Execute in a single working session. Plan a 2-3 hour window. Branch: `cutover-20260518`.

### 3.1 - Final dry run
- [ ] Run `podcasts/tools/dry_run_rename.py`: prints every `current_filename -> new_filename` it will execute. No file system writes. Compare against `tmp-proposed-feed-order.csv`.
- [ ] Run `deploy-ggg.ps1 -DryRun`.

### 3.2 - Content-repo rename
- [ ] `podcasts/tools/rename_audio.py` renames every mp3 in `podcasts/audio/kokoro-am_liam-af_jessica/` from `filename` to `new_filename`. Atomic per file. Logs every move.
- [ ] After rename, set `filename = new_filename` in map, drop `new_filename` field.
- [ ] Commit: "Rename audio to topic-prefixed filenames".

### 3.3 - ID3 retag
- [ ] Run `podcasts/tools/tag_id3.py` over renamed mp3s. Same UUIDs (so tags remain consistent), updated `TRCK` if `track_number` shifted, updated `TIT2` if title changed, updated `TXXX:TOPIC`.
- [ ] CHAP and CTOC frames untouched.
- [ ] Idempotent: rerun produces no diff.

### 3.4 - Script-vs-audio drift policy
- [ ] Document in `docs/AUDIO-DRIFT-POLICY.md`:
  - **Recorded narration is frozen.** We do not re-render audio to fix episode-number drift.
  - **Within-topic identity is preserved.** Narration that says "Chapter 5" is still "Chapter 5" after the cutover because we kept topic numbers stable.
  - **Cross-episode references** ("in the last episode", "in the next episode") are reviewed per file. Each gets one of three dispositions:
    - `accept` - the reference still works under the new feed order.
    - `clarify-in-shownotes` - mention the change in show notes; audio unchanged.
    - `flag-for-rerender` - rare, only if the reference is materially wrong; tracked in `tmp-rerender-queue.csv` for a later batch.
- [ ] Walk every script with cross-episode language. Apply disposition per file.
- [ ] Commit: "Audio drift policy and dispositions".

### 3.5 - Cross-link rewrite
- [ ] `scripts/rewrite-cross-links.ps1` walks all markdown, HTML, and prose files in both repos. For every reference to an old slug, looks up the entry by UUID via map, rewrites to new slug.
- [ ] Patterns to rewrite: `ep\d{2}`, `appendix-[a-z]`, `chapter-\d+`, old mp3 filenames, old script slugs.
- [ ] Dry-run mode first; review diff; then apply.
- [ ] Commit: "Rewrite cross-links to new filename scheme".

### 3.6 - Site mirror
- [ ] In `c:\code\ggg\site\media\`, replace contents with the renamed mp3s. Use `robocopy /MIR` from content repo audio dir to site repo media dir.
- [ ] Confirm 84 files present, byte-identical to content repo source.

### 3.7 - Feed regeneration
- [ ] `node generator/generate-feed.js`. Reads map, emits `site/feed.xml`.
- [ ] Every `<item>`:
  - `<title>` from map `title`.
  - `<guid isPermaLink="false">` from map `uuid` (UUID URN form: `urn:uuid:<uuid>`).
  - `<enclosure url>` points to `https://lp.csedesigns.com/ggg/media/<filename>`.
  - `<itunes:episode>` from `track_number`.
  - `<itunes:episodeType>` from `learning_band` (full for chapter, bonus for bonus, full for everything else).
  - `<itunes:duration>` from `duration_seconds`.
  - `<itunes:image>` from cover art.
- [ ] `node generator/validate-feed.js` passes.
- [ ] W3C feed validator passes (manual one-off).

### 3.8 - Local site build and smoke
- [ ] `node generator/generate-site.js` builds all pages. No 404s in cross-link check.
- [ ] Local HTTP server: spot-check homepage, three episode pages, one track landing page, the feed.
- [ ] Run `scripts/lint-no-hardcoded-slugs.ps1` over both repos. Clean.

### 3.9 - Clean deploy
- [ ] `deploy-ggg.ps1 -Backup` creates server tarball.
- [ ] `deploy-ggg.ps1 -DryRun` shows the file list to add and to delete. Review.
- [ ] `deploy-ggg.ps1` runs the rsync --delete sync.
- [ ] `Verify-RemoteFiles` diff: server file list equals local file list.
- [ ] Smoke remote: homepage, three episode pages, feed.xml, three mp3 enclosure URLs return 200.

### 3.10 - Tag and announce internally
- [ ] Tag both repos: `v2-renumbered-20260518`.
- [ ] Internal team note (not public).

**Stage 3 gate:** site is live, feed validates, all mp3s reachable, server file list matches local. Audio untouched throughout.

---

## Stage 4 - Steady-state operations

### 4.1 - regenerate-all
- [ ] `scripts/regenerate-all.ps1` runs in order:
  1. `episode_map.py --validate`
  2. `tag_id3.py` (idempotent)
  3. `write_chapters.py` (idempotent, only if timings changed)
  4. `generate-site.js`
  5. `generate-feed.js`
  6. `validate-feed.js`
  7. `lint-no-hardcoded-slugs.ps1`
  8. (optional) `deploy-ggg.ps1 -DryRun`
- [ ] Single command that takes the project from any map edit to a verified site+feed.

### 4.2 - Author guide
- [ ] `docs/UPDATING-CONTENT.md`:
  - How to add a new chapter (append topic_number, mint UUID, set `pairs_with_uuid` if applicable, run regenerate-all).
  - How to add a challenge paired to a chapter (cc entry with `pairs_with_uuid = chapter UUID`).
  - How to insert mid-sequence (Pattern A: append topic, set track_number; Pattern B: letter suffix).
  - How to add a new topic group (just create entries with a new topic prefix; lint will not complain because prefixes are not hardcoded anywhere).
  - How to deprecate an episode (`archived: true`, keep UUID reserved, excluded from feed).
  - How to revise audio for an existing episode (same UUID, same filename, render new mp3, retag, redeploy).

### 4.3 - CI
- [ ] GitHub Actions workflow runs on every PR:
  - Schema + validator check on `docs/EPISODE_MAP.json`.
  - `slug-lint`.
  - `test-tooling-conformance`.
  - Site build dry run.

---

## Stage 5 - Polish (post-launch)

- [ ] Track landing pages styled with topic-specific accents.
- [ ] Day-1 / Day-2 facilitator banners on relevant pages.
- [ ] Inline player on each episode page with chapter list pulled from CHAP frames.
- [ ] Search index built from map.
- [ ] OPML export of feed.

---

## Validation matrix

| Check | Tool | When |
|---|---|---|
| Schema valid | `episode_map.py --validate` | Pre-commit, CI, Stage 0.2, Stage 1.5, Stage 2.7, Stage 3.1 |
| UUID unique | `episode_map.py --validate` | Same as above |
| UUID v4 format | `episode_map.py --validate` | Same |
| Filename regex per topic | `episode_map.py --validate` | Same |
| `track_number` unique and contiguous | `episode_map.py --validate` | Same |
| `pairs_with_uuid` resolves | `episode_map.py --validate` | Same |
| No `pairs_with_uuid` cycles | `episode_map.py --validate` | Same |
| Map filenames have mp3s | `episode_map.py --validate-files` | Stage 0.2, Stage 3.2 |
| No orphan mp3s | `episode_map.py --validate-files` | Same |
| ID3 frames present | `verify_id3.py` | Stage 0.3, Stage 0.6, Stage 3.3 |
| CHAP / CTOC present | `verify_id3.py --chapters` | Stage 0.5, Stage 0.6 |
| No hardcoded slugs | `lint-no-hardcoded-slugs.ps1` | Pre-commit, CI, Stage 2.5, Stage 3.8 |
| Tooling conforms to map | `test-tooling-conformance.ps1` | CI, Stage 2.6 |
| Feed valid | `validate-feed.js` + W3C | Stage 3.7, Stage 3.8, Stage 3.9 |
| Cross-links resolve | `scripts/check-cross-links.ps1` | Stage 3.5, Stage 3.8 |
| Server file list matches local | `Verify-RemoteFiles` | Stage 3.9 |
| Podcast app smoke | manual | Stage 0.6, Stage 3.9 |

---

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| ID3 retag corrupts mp3 | mutagen is widely used; tagger is idempotent; pre-tagging snapshot taken in Stage 0.1; spot-check after first run |
| `pairs_with_uuid` cycle introduced by human edit | Validator detects, blocks commit |
| `track_number` collision | Validator detects, blocks commit |
| `rsync --delete` removes wrong files | Pre-deploy tarball backup; DryRun shown and reviewed; `-Confirm` threshold |
| Map drifts from disk | `--validate-files` cross-checks both directions |
| Tool refactor misses a script | TOOLING-INVENTORY.md is the checklist; slug-lint catches stragglers |
| Cross-episode narration drift | Per-file disposition in Stage 3.4; show-notes clarifications; rare rerender only when material |
| Cover art missing | Stage 0.1 check; tagger fails fast if APIC source missing |
| Chapter timing source missing | Stage 0.4 explicit Path A/B/C decision |
| Site repo episode-map.json committed by accident | `.gitignore` covers both copies; pre-commit warns |
| Decoupled track number confuses listeners | Within-topic identity stays in titles ("Chapter 5: ..."); track_number only drives "Episode N of M" position |

---

## Rollback

- **Stage 0 rollback:** restore from `_snapshot-pre-tagging-20260518/`. ID3 tagging is reversible by re-rendering audio if absolutely needed, but the snapshot is the easy path.
- **Stage 1 rollback:** design-only; revert the map fields.
- **Stage 2 rollback:** tooling changes are git revertible; old tools kept on `pre-conformance-20260518` tag.
- **Stage 3 rollback:** revert content repo to `audio-locked-20260518`; restore server from pre-deploy tarball; rerun deploy from old site repo state. Greenfield means we have no public commitment to honor either way.

---

## Approval gates

- [ ] Stage 0 complete - confirmed by: ______ on ______
- [ ] Stage 1 complete - confirmed by: ______ on ______
- [ ] Stage 2 complete - confirmed by: ______ on ______
- [ ] Stage 3 complete - confirmed by: ______ on ______
- [ ] Stage 4 complete - confirmed by: ______ on ______
- [ ] Stage 5 complete - confirmed by: ______ on ______
