#!/usr/bin/env node
/**
 * Podcast Bundle Generator for Git Going with GitHub
 *
 * Generates NotebookLM-ready source bundles for each episode by combining
 * episode-specific production prompts with chapter content from docs/.
 * Each bundle includes:
 *   - Episode-specific production prompt with tone/style direction
 *   - Concept coverage checklist (ensures depth)
 *   - Cross-referenced supplementary content from related chapters
 *   - Full primary source material
 *
 * Stage 2.2: data source migrated from a hardcoded array to the canonical
 * episode map (docs/EPISODE_MAP.json) plus per-episode bundle metadata in
 * podcasts/bundle-config.json. Public exports preserved for back-compat:
 *
 *   module.exports = { episodes, resolveSourceName, SOURCE_ALIASES }
 *
 * Usage: node podcasts/build-bundles.js
 */

const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, '..', 'docs');
const BUNDLES_DIR = path.join(__dirname, 'bundles');
const MAP_PATH = path.join(__dirname, '..', 'docs', 'EPISODE_MAP.json');
const CONFIG_PATH = path.join(__dirname, 'bundle-config.json');

// ---------------------------------------------------------------------------
// Load map + bundle config and synthesize the legacy `episodes` array
// ---------------------------------------------------------------------------

const _map = JSON.parse(fs.readFileSync(MAP_PATH, 'utf-8'));
const _config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));

const SOURCE_ALIASES = _config.source_aliases || {};

function resolveSourceName(sourceName) {
  return SOURCE_ALIASES[sourceName] || sourceName;
}

function _epNumberFromNarrationId(nid) {
  // 'ep00'..'ep56' -> 0..56; 'ep79' -> 79 (legacy duplicate retained)
  const m = /^ep(\d+)$/.exec(nid);
  if (!m) return null;
  return parseInt(m[1], 10);
}

// Build the legacy episode records. Each record retains the exact shape the
// previous hardcoded array exposed so downstream consumers (validate-catalog,
// generate-draft-transcripts, llm-podcast-generator-review, agentic-pilot
// scripts, etc.) keep working unchanged.
const episodes = [];
for (const e of _map.episodes) {
  if (e.group !== 'ep') continue;
  const cfg = (_config.bundles || {})[e.narration_id];
  if (!cfg) {
    console.warn(`  bundle-config.json missing entry for ${e.narration_id}; skipping`);
    continue;
  }
  episodes.push({
    number: _epNumberFromNarrationId(e.narration_id),
    // Legacy `slug` is the bare descriptive slug without the `epNN-` prefix.
    // The map stores the full legacy filename (without .mp3) in current_slug;
    // strip the leading `epNN-` so downstream consumers see the same value
    // they did before the data source switch.
    slug: e.current_slug.replace(/^ep\d+-/, ''),
    // Explicit audio filename from the map (Stage 3 cutover).
    audio: e.filename,
    title: cfg.title,
    description: cfg.description || '',
    duration: cfg.duration || '10-15 min',
    sources: cfg.sources || [],
    crossRefs: cfg.crossRefs || [],
    concepts: cfg.concepts || [],
    prerequisites: cfg.prerequisites || [],
    focus: cfg.focus || ''
  });
}
// Stable ordering by legacy episode number, matching the original array.
episodes.sort((a, b) => a.number - b.number);

// ---------------------------------------------------------------------------
// Series-wide prompt template (unchanged from previous revision)
// ---------------------------------------------------------------------------

function buildPrompt(ep, total) {
  // Build concept checklist section
  const conceptSection = ep.concepts && ep.concepts.length > 0
    ? `### Concept Coverage Checklist

Every concept below MUST be explained during the episode. Do not skip any.
When a concept is complex, use an analogy or real-world comparison to make it concrete.

${ep.concepts.map(c => `- [ ] **${c}**`).join('\n')}

`
    : '';

  // Build cross-reference note
  const xrefSection = ep.crossRefs && ep.crossRefs.length > 0
    ? `### Cross-Referenced Material

The following supplementary content is included after the primary source.
Reference it naturally when a concept would benefit from additional context,
but keep the main narrative focused on the primary chapter.

${ep.crossRefs.map(x => `- ${x.label}`).join('\n')}

`
    : '';

  // Build prerequisite note
  const prereqSection = ep.prerequisites && ep.prerequisites.length > 0
    ? `### Prerequisites (briefly recap these)

Listeners may have heard these earlier episodes. Briefly remind them of:

${ep.prerequisites.map(p => `- Episode ${p.ep}: ${p.concept}`).join('\n')}

`
    : '';

  return `# Git Going with GitHub - Audio Series

## Episode ${ep.number}: ${ep.title}

**Series:** Git Going with GitHub
**Episode:** ${ep.number} of ${total}
**Audience:** Blind and low-vision developers learning GitHub and open source
**Estimated length:** ${ep.duration || '10-15 min'}

---

### Audio Production Direction

Generate a conversational two-host podcast episode about this topic.
The audience is blind and low-vision developers attending a two-day workshop on GitHub.

**Tone and style:**

- Welcoming and encouraging - many listeners are encountering these concepts for the first time
- Preserve the Alex and Jamie banter style: Alex is the warm expert guide, Jamie is curious, funny, and willing to ask the questions learners may be afraid to ask
- Keep the humor kind and grounded in the learning moment; jokes should clarify the concept, not distract from it
- Use spatial and structural descriptions, not visual references
- Say "navigate to" or "move to the section called" instead of "look for" or "you will see"
- Define technical terms on first use - do not assume familiarity with programming jargon
- Focus on deep conceptual understanding - explain WHY, not just HOW
- Share practical tips, common mistakes, and real-world context
- When describing keyboard shortcuts, say the full key names: "Control plus Shift plus P" not "Ctrl+Shift+P"
- Keep the conversation natural - two hosts discussing the topic, not reading a script
- Include at least one real-world analogy per major concept
- End with a brief summary of key takeaways and what comes next
- When onboarding or classroom setup is relevant, explicitly explain the gentle path: GitHub Classroom link, private Learning Room repository, Challenge 1 issue, evidence prompt, bot feedback, and where to ask for help
- Emphasize tool choice without ranking learners: browser, github.dev, VS Code, GitHub Desktop, and command line are paths into the same workflow

**Required script format:**

- Use only these speaker markers on their own lines: [ALEX], [JAMIE], and [PAUSE]
- Do not include stage directions, music cues, markdown tables, bullet lists, citations, or headings in the final script
- Keep each speaker turn short enough for TTS, usually one to three spoken paragraphs
- Jamie should regularly restate the learner's mental model: "So what I am hearing is..."
- For challenge or exercise material, teach the skill first, then explain the evidence the learner must submit

**Episode focus:**

${ep.focus}

---

${conceptSection}${prereqSection}${xrefSection}### Primary Source Material

`;
}

// ---------------------------------------------------------------------------
// Build logic
// ---------------------------------------------------------------------------

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function buildBundles() {
  ensureDir(BUNDLES_DIR);

  const total = episodes.length;
  let built = 0;
  let skipped = 0;

  for (const ep of episodes) {
    const pad = String(ep.number).padStart(2, '0');
    if (!ep.audio) {
      throw new Error(`episode ${ep.number} missing canonical audio filename from EPISODE_MAP.json`);
    }
    const canonicalBase = ep.audio.replace(/\.mp3$/i, '');
    const outFile = path.join(BUNDLES_DIR, `${canonicalBase}.md`);

    // Read and concatenate source chapter(s)
    let sourceContent = '';
    let missingSource = false;

    for (const src of ep.sources) {
      const resolvedSrc = resolveSourceName(src);
      const srcPath = path.join(DOCS_DIR, resolvedSrc);
      if (!fs.existsSync(srcPath)) {
        console.error(`  Missing source: ${src} -> ${resolvedSrc} (Episode ${ep.number}: ${ep.title})`);
        missingSource = true;
        continue;
      }
      if (sourceContent) sourceContent += '\n\n---\n\n';
      if (resolvedSrc !== src) {
        sourceContent += `<!-- Source alias resolved from ${src} to ${resolvedSrc}. -->\n\n`;
      }
      sourceContent += fs.readFileSync(srcPath, 'utf-8');
    }

    if (missingSource && !sourceContent) {
      console.error(`  Skipped Episode ${ep.number}: all sources missing`);
      skipped++;
      continue;
    }

    // Read cross-referenced supplementary content
    let xrefContent = '';
    if (ep.crossRefs && ep.crossRefs.length > 0) {
      for (const xref of ep.crossRefs) {
        const resolvedXref = resolveSourceName(xref.file);
        const xrefPath = path.join(DOCS_DIR, resolvedXref);
        if (!fs.existsSync(xrefPath)) {
          console.warn(`  Warning: cross-ref missing: ${xref.file} -> ${resolvedXref} (Episode ${ep.number})`);
          continue;
        }
        xrefContent += `\n\n---\n\n### Supplementary: ${xref.label}\n\n`;
        if (resolvedXref !== xref.file) {
          xrefContent += `<!-- Cross-reference alias resolved from ${xref.file} to ${resolvedXref}. -->\n\n`;
        }
        xrefContent += fs.readFileSync(xrefPath, 'utf-8');
      }
    }

    // Build the bundle: prompt + primary source + cross-referenced content
    const prompt = buildPrompt(ep, total);
    const bundle = prompt + sourceContent + xrefContent;

    fs.writeFileSync(outFile, bundle, 'utf-8');
    built++;
    console.log(`  Episode ${pad}: ${ep.title}`);
  }

  console.log(`\nPodcast bundle build complete: ${built} episodes generated, ${skipped} skipped`);
  console.log(`Output directory: ${BUNDLES_DIR}`);

  // Write manifest JSON for use by generate-site.js and other consumers.
  const manifestPath = path.join(__dirname, 'manifest.json');
  const manifest = episodes.map(ep => {
    if (!ep.audio) {
      throw new Error(`episode ${ep.number} missing canonical audio filename from EPISODE_MAP.json`);
    }
    const canonicalBase = ep.audio.replace(/\.mp3$/i, '');
    return {
      number: ep.number,
      slug: ep.slug,
      title: ep.title,
      description: ep.description || '',
      duration: ep.duration || '10-15 min',
      sources: ep.sources.map(resolveSourceName),
      bundle: `${canonicalBase}.md`,
      audio: ep.audio,
      status: 'bundle-ready'
    };
  });
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf-8');
  console.log(`Manifest written: ${manifestPath}`);
}

// Export episodes for other scripts
module.exports = { episodes, resolveSourceName, SOURCE_ALIASES };

// Run when called directly
if (require.main === module) {
  buildBundles();
}
