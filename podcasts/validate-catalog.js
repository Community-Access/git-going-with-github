#!/usr/bin/env node
/**
 * Validate podcast episode catalog health before regenerating transcripts/audio.
 *
 * This checks three things:
 * - every configured source and cross-reference resolves to a current docs file
 * - old generated bundle markdown files are not tracked in git
 * - current chapter/appendix coverage gaps are reported for planning
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { episodes, resolveSourceName } = require('./build-bundles');

const ROOT = path.join(__dirname, '..');
const DOCS_DIR = path.join(ROOT, 'docs');

function existsInDocs(sourceName) {
  return fs.existsSync(path.join(DOCS_DIR, sourceName));
}

function gitLsFiles(pattern) {
  try {
    return execFileSync('git', ['ls-files', pattern], {
      cwd: ROOT,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore']
    }).split(/\r?\n/).filter(Boolean);
  } catch (_) {
    return [];
  }
}

function currentCurriculumFiles() {
  return fs.readdirSync(DOCS_DIR)
    .filter(name => /^(\d{2}-.+|appendix-[a-z]-.+)\.md$/.test(name))
    .sort();
}

const errors = [];
const warnings = [];
const covered = new Set();

for (const episode of episodes) {
  for (const source of episode.sources || []) {
    const resolved = resolveSourceName(source);
    if (!existsInDocs(resolved)) {
      errors.push(`Episode ${episode.number} source missing: ${source} -> ${resolved}`);
    } else {
      covered.add(resolved);
    }
  }

  for (const crossRef of episode.crossRefs || []) {
    const resolved = resolveSourceName(crossRef.file);
    if (!existsInDocs(resolved)) {
      errors.push(`Episode ${episode.number} cross-reference missing: ${crossRef.file} -> ${resolved}`);
    } else {
      covered.add(resolved);
    }
  }
}

const trackedBundles = gitLsFiles('podcasts/bundles/*.md');
if (trackedBundles.length > 0) {
  errors.push(`Generated podcast bundles are tracked in git: ${trackedBundles.join(', ')}`);
}

for (const docFile of currentCurriculumFiles()) {
  if (!covered.has(docFile)) {
    warnings.push(`Current curriculum file is not covered by the episode catalog: docs/${docFile}`);
  }
}

console.log(`Podcast catalog episodes: ${episodes.length}`);
console.log(`Current chapter/appendix files: ${currentCurriculumFiles().length}`);
console.log(`Covered source files: ${covered.size}`);

if (warnings.length) {
  console.log('\nWarnings:');
  for (const warning of warnings) console.log(`- ${warning}`);
}

if (errors.length) {
  console.error('\nErrors:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('\nPodcast catalog validation passed.');
