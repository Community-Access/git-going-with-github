#!/usr/bin/env node
/**
 * Challenge Podcast Bundle Generator
 *
 * Creates local prompt bundles for short Challenge Coach episodes. These are
 * generated working files and are intentionally ignored by git.
 *
 * Stage 2.2: data source migrated from a hardcoded array to the canonical
 * episode map (docs/EPISODE_MAP.json) plus per-challenge bundle metadata in
 * podcasts/bundle-config.json (bundles_challenge and bundles_bonus sections).
 * Public exports preserved for back-compat:
 *
 *   module.exports = { challenges, buildChallengeBundles }
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const OUT_DIR = path.join(__dirname, 'challenge-bundles');
const MAP_PATH = path.join(ROOT, 'docs', 'EPISODE_MAP.json');
const CONFIG_PATH = path.join(__dirname, 'bundle-config.json');

const COMMON_SOURCES = [
  'docs/CHALLENGES.md',
  'classroom/assignment-day1-you-belong-here.md',
  'classroom/assignment-day2-you-can-build-this.md'
];

// ---------------------------------------------------------------------------
// Load map + bundle config and synthesize the legacy `challenges` array.
// Each record retains the exact shape the previous hardcoded array exposed
// so downstream consumers (generate-site, validate-listening-order, agentic
// pilot scripts, llm-podcast-generator-review, challenge-doc-consistency
// tests) keep working unchanged.
// ---------------------------------------------------------------------------

const _map = JSON.parse(fs.readFileSync(MAP_PATH, 'utf-8'));
const _config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
const _ccCfg = _config.bundles_challenge || {};
const _bonusCfg = _config.bundles_bonus || {};

function _idFromNarrationId(nid) {
  // 'cc-01'..'cc-16'   -> '01'..'16'
  // 'cc-bonus-a'..'-e' -> 'bonus-a'..'bonus-e'
  return nid.replace(/^cc-/, '');
}

function _bareSlug(currentSlug, nid) {
  // Map current_slug is like 'cc-01-find-your-way-around' or
  // 'cc-bonus-a-improve-agent'. Legacy slug stripped the cc-NN- or
  // cc-bonus-X- prefix.
  if (nid.startsWith('cc-bonus-')) {
    return currentSlug.replace(/^cc-bonus-[a-z]-/, '');
  }
  return currentSlug.replace(/^cc-\d+-/, '');
}

const challenges = [];
const _ccByTrack = _map.episodes
  .filter(e => e.group === 'challenge' || e.group === 'bonus')
  .slice()
  .sort((a, b) => (a.track_number || 0) - (b.track_number || 0));

for (const e of _ccByTrack) {
  const cfg = e.group === 'bonus' ? _bonusCfg[e.narration_id] : _ccCfg[e.narration_id];
  if (!cfg) {
    console.warn(`  bundle-config.json missing entry for ${e.narration_id}; skipping`);
    continue;
  }
  challenges.push({
    id: _idFromNarrationId(e.narration_id),
    slug: _bareSlug(e.current_slug, e.narration_id),
    title: cfg.title,
    day: cfg.day,
    template: cfg.template,
    solution: cfg.solution,
    chapters: cfg.chapters || [],
    focus: cfg.focus || ''
  });
}

// ---------------------------------------------------------------------------
// Build logic (unchanged from previous revision)
// ---------------------------------------------------------------------------

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function readRequired(relativePath) {
  const absolutePath = path.join(ROOT, relativePath);
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Missing required source: ${relativePath}`);
  }
  return fs.readFileSync(absolutePath, 'utf8');
}

function buildPrompt(challenge) {
  return `# Git Going with GitHub - Challenge Coach Bundle

## Challenge ${challenge.id}: ${challenge.title}

**Series:** Challenge Coach
**Group:** ${challenge.day}
**Audience:** Blind and low-vision learners completing the Learning Room challenges
**Target length:** 5-8 minutes

---

### Audio Production Direction

Generate a short, conversational two-host teaching episode for this challenge.

**Required script format:**

- Use only [ALEX], [JAMIE], and [PAUSE] markers on their own lines
- Do not include headings, bullet lists, stage directions, music cues, citations, or markdown tables in the final script
- Alex is the warm expert guide
- Jamie is curious, funny, and willing to ask the learner's nervous questions
- Keep the banter kind, practical, and tied to the teaching moment
- Use spatial and structural language instead of visual-only instructions
- Say full key names, such as "Control plus Shift plus P"

**Teaching structure:**

1. Set the scene: what skill this challenge teaches and why it matters
2. Name the anxiety: what usually feels confusing here
3. Teach the concept before the steps
4. Walk the task in screen-reader-friendly language
5. Explain the evidence the learner submits
6. Explain what Gandalf or the validation workflow checks, if applicable
7. Name common mistakes and recovery paths
8. Describe what success sounds or feels like
9. Bridge to the next challenge

**Challenge focus:**

${challenge.focus}

---

`;
}

function buildBundle(challenge) {
  const sections = [buildPrompt(challenge)];
  const sources = [
    ...COMMON_SOURCES,
    challenge.template,
    challenge.solution,
    ...challenge.chapters
  ];

  const seen = new Set();
  for (const source of sources) {
    if (seen.has(source)) continue;
    seen.add(source);
    sections.push(`\n---\n\n## Source: ${source}\n\n${readRequired(source)}\n`);
  }

  return sections.join('\n');
}

function buildChallengeBundles() {
  ensureDir(OUT_DIR);
  let built = 0;

  for (const challenge of challenges) {
    const fileName = `challenge-${challenge.id}-${challenge.slug}.md`;
    const outPath = path.join(OUT_DIR, fileName);
    fs.writeFileSync(outPath, buildBundle(challenge), 'utf8');
    built += 1;
    console.log(`  ${fileName}`);
  }

  console.log(`\nChallenge podcast bundles generated: ${built}`);
  console.log(`Output directory: ${OUT_DIR}`);
}

module.exports = { challenges, buildChallengeBundles };

if (require.main === module) {
  buildChallengeBundles();
}
