#!/usr/bin/env node

/**
 * build-source-packet.js
 *
 * Builds the per-slug context packet that feeds the LLM transcript generator.
 * The packet now includes:
 *   - The target episode/challenge metadata (kind, title, description, concepts)
 *   - The primary source files (docs/*.md or challenge template+solution+chapters)
 *   - Companion artifacts (challenge<->chapter cross-link)
 *   - Classroom assignment material (classroom/challenge-content-review.md slice,
 *     plus the relevant assignment-day*.md when applicable)
 *   - Existing live transcript + chapter plan (for regression comparison)
 *   - Voice rules block (banned phrases, stale facts, current curriculum facts,
 *     voice exemplar) from podcasts/tools/voice-rules.js
 *
 * The packet is consumed by:
 *   - podcasts/llm-podcast-generator-review/src/generate-teaching-transcript.js
 *   - podcasts/llm-podcast-generator-review/src/execution/prepare-script-jobs.js
 *
 * Usage: node podcasts/tools/agentic-pilot/build-source-packet.js --slug <slug>
 */

const fs = require('fs');
const path = require('path');
const { episodes, resolveSourceName } = require('../../build-bundles');
const { challenges } = require('../../build-challenge-bundles');
const voiceRules = require('../voice-rules');

const ROOT = path.join(__dirname, '..', '..', '..');
const PODCASTS_DIR = path.join(ROOT, 'podcasts');
const DOCS_DIR = path.join(ROOT, 'docs');
const CLASSROOM_DIR = path.join(ROOT, 'classroom');
const OUTPUT_DIR = path.join(PODCASTS_DIR, 'logs', 'agentic-pilots');

function parseArgs(argv) {
  const args = { slug: null };
  for (let index = 0; index < argv.length; index += 1) {
    if (argv[index] === '--slug' && argv[index + 1]) {
      args.slug = argv[index + 1];
      index += 1;
    }
  }
  return args;
}

function readIfExists(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
}

function transcriptPathForSlug(slug) {
  for (const group of ['chapters', 'appendices', 'challenges']) {
    const candidate = path.join(PODCASTS_DIR, 'scripts', group, `${slug}.txt`);
    if (fs.existsSync(candidate)) return candidate;
  }
  return path.join(PODCASTS_DIR, 'scripts', `${slug}.txt`);
}

function segmentPlanPathForSlug(slug) {
  for (const group of ['chapters', 'appendices', 'challenges']) {
    const candidate = path.join(PODCASTS_DIR, 'transcripts', group, `${slug}-chapters.json`);
    if (fs.existsSync(candidate)) return candidate;
  }
  return path.join(PODCASTS_DIR, 'transcripts', `${slug}-chapters.json`);
}

function normalizeHeadingTitle(title) {
  return String(title || '').replace(/^#+\s*/, '').trim();
}

function collectHeadings(markdown) {
  const headings = [];
  for (const line of markdown.replace(/\r/g, '').split('\n')) {
    const match = line.match(/^(#{2,4})\s+(.+)$/);
    if (!match) continue;
    headings.push({ level: match[1].length, title: normalizeHeadingTitle(match[2]) });
  }
  return headings;
}

function findTarget(slug) {
  for (const episode of episodes) {
    const episodeSlug = `ep${String(episode.number).padStart(2, '0')}-${episode.slug}`;
    if (episodeSlug === slug) {
      return {
        kind: 'companion',
        slug,
        episode,
        title: `Episode ${episode.number}: ${episode.title}`,
        description: episode.description || '',
        concepts: Array.isArray(episode.concepts) ? episode.concepts : [],
        sourceFiles: (episode.sources || []).map(source => path.join(DOCS_DIR, resolveSourceName(source)))
      };
    }
  }

  for (const challenge of challenges) {
    const challengeSlug = `cc-${challenge.id}-${challenge.slug}`;
    if (challengeSlug === slug) {
      return {
        kind: 'challenge',
        slug,
        challenge,
        title: `Challenge ${challenge.id}: ${challenge.title}`,
        description: challenge.focus || '',
        concepts: [challenge.focus || '', `Challenge title: ${challenge.title}`].filter(Boolean),
        sourceFiles: [
          path.join(ROOT, challenge.template),
          path.join(ROOT, challenge.solution),
          ...(challenge.chapters || []).map(file => path.join(ROOT, file))
        ]
      };
    }
  }

  return null;
}

/**
 * Reverse-index: for a chapter docs filename like "06-working-with-pull-requests.md",
 * find every challenge whose .chapters list references it. This is how a chapter
 * podcast script learns about the challenges its content powers.
 */
function challengesReferencingFile(docsFile) {
  const target = path.basename(docsFile);
  const matches = [];
  for (const challenge of challenges) {
    const chapterFiles = (challenge.chapters || []).map(f => path.basename(f));
    if (chapterFiles.includes(target)) {
      matches.push({
        id: challenge.id,
        slug: `cc-${challenge.id}-${challenge.slug}`,
        title: challenge.title,
        focus: challenge.focus || '',
        day: challenge.day || ''
      });
    }
  }
  return matches;
}

/**
 * For a challenge target, list the docs/*.md chapters its instructions ground in.
 */
function chaptersForChallenge(challenge) {
  return (challenge.chapters || []).map(file => {
    const absPath = path.join(ROOT, file);
    return {
      path: absPath,
      relPath: file,
      exists: fs.existsSync(absPath),
      headings: collectHeadings(readIfExists(absPath))
    };
  });
}

/**
 * Pull just the per-challenge section from classroom/challenge-content-review.md.
 * The file is organized as "## Challenge NN: Title" sections; we slice the
 * relevant block so the prompt does not balloon.
 */
function extractClassroomReviewBlock(challengeId) {
  const fullText = readIfExists(path.join(CLASSROOM_DIR, 'challenge-content-review.md'));
  if (!fullText) return '';
  const lines = fullText.replace(/\r/g, '').split('\n');
  const headingPattern = new RegExp(`^##\\s+Challenge\\s+${challengeId}\\b`, 'i');
  let startIdx = -1;
  for (let i = 0; i < lines.length; i += 1) {
    if (headingPattern.test(lines[i])) { startIdx = i; break; }
  }
  if (startIdx === -1) return '';
  let endIdx = lines.length;
  for (let i = startIdx + 1; i < lines.length; i += 1) {
    if (/^##\s+Challenge\s+\d/i.test(lines[i])) { endIdx = i; break; }
  }
  return lines.slice(startIdx, endIdx).join('\n').trim();
}

function loadAssignmentContext(challenge) {
  const day = (challenge.day || '').toLowerCase();
  const assignments = [];
  if (day.includes('day 1') || day.includes('day1')) {
    assignments.push(path.join(CLASSROOM_DIR, 'assignment-day1-you-belong-here.md'));
  }
  if (day.includes('day 2') || day.includes('day2')) {
    assignments.push(path.join(CLASSROOM_DIR, 'assignment-day2-you-can-build-this.md'));
  }
  return assignments
    .map(p => ({ path: p, exists: fs.existsSync(p), content: readIfExists(p) }))
    .filter(item => item.exists);
}

function buildCompanionContext(target) {
  if (target.kind === 'companion') {
    const linked = [];
    for (const sourcePath of target.sourceFiles) {
      const refs = challengesReferencingFile(sourcePath);
      for (const ref of refs) {
        if (!linked.find(l => l.slug === ref.slug)) linked.push(ref);
      }
    }
    return {
      pairedChallenges: linked,
      pairedChapters: [],
      classroomReview: '',
      assignments: []
    };
  }
  return {
    pairedChallenges: [],
    pairedChapters: chaptersForChallenge(target.challenge),
    classroomReview: extractClassroomReviewBlock(target.challenge.id),
    assignments: loadAssignmentContext(target.challenge)
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.slug) {
    console.error('Usage: node podcasts/tools/agentic-pilot/build-source-packet.js --slug <slug>');
    process.exit(1);
  }

  const target = findTarget(args.slug);
  if (!target) {
    console.error(`Unknown podcast slug: ${args.slug}`);
    process.exit(1);
  }

  const transcriptPath = transcriptPathForSlug(args.slug);
  const chapterPlanPath = segmentPlanPathForSlug(args.slug);
  const sources = target.sourceFiles.map(filePath => ({
    exists: fs.existsSync(filePath),
    path: filePath,
    headings: collectHeadings(readIfExists(filePath)),
    content: readIfExists(filePath)
  }));

  const companions = buildCompanionContext(target);

  const packet = {
    generatedAt: new Date().toISOString(),
    schemaVersion: 2,
    kind: target.kind,
    slug: target.slug,
    title: target.title,
    description: target.description,
    concepts: target.concepts,
    transcriptPath,
    chapterPlanPath,
    transcriptText: readIfExists(transcriptPath),
    chapterPlanText: readIfExists(chapterPlanPath),
    sourceFiles: sources,
    companions,
    voiceRules: {
      bannedPhrases: voiceRules.BANNED_PHRASES,
      staleFacts: voiceRules.STALE_FACTS,
      currentFacts: voiceRules.CURRENT_FACTS,
      voiceExemplarPath: voiceRules.VOICE_EXEMPLAR_PATH,
      voiceExemplar: voiceRules.loadVoiceExemplar()
    }
  };

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const outPath = path.join(OUTPUT_DIR, `${target.slug}.packet.json`);
  fs.writeFileSync(outPath, JSON.stringify(packet, null, 2) + '\n', 'utf8');
  console.log(`Wrote source packet: ${outPath}`);
  console.log(`  kind: ${target.kind}`);
  console.log(`  sources: ${sources.filter(s => s.exists).length}/${sources.length} exist`);
  console.log(`  paired challenges: ${companions.pairedChallenges.length}`);
  console.log(`  paired chapters: ${companions.pairedChapters.length}`);
  console.log(`  classroom review block: ${companions.classroomReview ? 'yes' : 'no'}`);
  console.log(`  assignment docs: ${companions.assignments.length}`);
}

if (require.main === module) {
  main();
}

module.exports = { findTarget, buildCompanionContext, challengesReferencingFile };
