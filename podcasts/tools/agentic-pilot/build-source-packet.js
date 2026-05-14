#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { episodes, resolveSourceName } = require('../../build-bundles');
const { challenges } = require('../../build-challenge-bundles');

const ROOT = path.join(__dirname, '..', '..', '..');
const PODCASTS_DIR = path.join(ROOT, 'podcasts');
const DOCS_DIR = path.join(ROOT, 'docs');
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
  const matches = [];
  for (const group of ['chapters', 'appendices', 'challenges']) {
    const candidate = path.join(PODCASTS_DIR, 'scripts', group, `${slug}.txt`);
    if (fs.existsSync(candidate)) matches.push(candidate);
  }
  return matches[0] || path.join(PODCASTS_DIR, 'scripts', `${slug}.txt`);
}

function segmentPlanPathForSlug(slug) {
  const matches = [];
  for (const group of ['chapters', 'appendices', 'challenges']) {
    const candidate = path.join(PODCASTS_DIR, 'transcripts', group, `${slug}-chapters.json`);
    if (fs.existsSync(candidate)) matches.push(candidate);
  }
  return matches[0] || path.join(PODCASTS_DIR, 'transcripts', `${slug}-chapters.json`);
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
        title: `Episode ${episode.number}: ${episode.title}`,
        description: episode.description || '',
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
        title: `Challenge ${challenge.id}: ${challenge.title}`,
        description: challenge.focus || '',
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

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.slug) {
    console.error('Usage: node podcasts/tools/agentic-pilot/build-source-packet.js --slug <episode-slug>');
    process.exit(1);
  }

  const target = findTarget(args.slug);
  if (!target) {
    console.error(`Unknown podcast slug: ${args.slug}`);
    process.exit(1);
  }

  const transcriptPath = transcriptPathForSlug(args.slug);
  const chapterPlanPath = segmentPlanPathForSlug(args.slug);
  const sources = target.sourceFiles
    .filter(filePath => fs.existsSync(filePath))
    .map(filePath => ({
      path: filePath,
      headings: collectHeadings(readIfExists(filePath)),
      content: readIfExists(filePath)
    }));

  const packet = {
    generatedAt: new Date().toISOString(),
    kind: target.kind,
    slug: target.slug,
    title: target.title,
    description: target.description,
    transcriptPath,
    chapterPlanPath,
    transcriptText: readIfExists(transcriptPath),
    chapterPlanText: readIfExists(chapterPlanPath),
    sourceFiles: sources.map(source => ({
      path: source.path,
      headings: source.headings,
      content: source.content
    }))
  };

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const outPath = path.join(OUTPUT_DIR, `${target.slug}.packet.json`);
  fs.writeFileSync(outPath, JSON.stringify(packet, null, 2) + '\n', 'utf8');
  console.log(`Wrote source packet: ${outPath}`);
}

if (require.main === module) {
  main();
}