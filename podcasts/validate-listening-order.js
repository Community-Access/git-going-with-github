#!/usr/bin/env node
/**
 * Validate that podcasts/config/listening-order.json is the complete public
 * listening spine for companion and Challenge Coach episodes.
 */
const { episodes } = require('./build-bundles');
const { challenges } = require('./build-challenge-bundles');
const {
  loadListeningOrder,
  companionSlug,
  challengeSlug,
  buildListeningItems,
} = require('./lib/listening-plan');

const errors = [];
const order = loadListeningOrder();

if (!order.length) {
  errors.push('Listening order is empty or missing.');
}

const expected = new Set([
  ...episodes.map(ep => `companion:${companionSlug(ep)}`),
  ...challenges.map(challenge => `challenge:${challengeSlug(challenge)}`),
]);
const seen = new Set();
let sectionCount = 0;

for (const entry of order) {
  if (entry.kind === 'section') {
    sectionCount += 1;
    if (!entry.title) errors.push('Section entry is missing a title.');
    continue;
  }

  if (!entry.kind || !entry.slug) {
    errors.push(`Listening order entry is missing kind or slug: ${JSON.stringify(entry)}`);
    continue;
  }

  const key = `${entry.kind}:${entry.slug}`;
  if (seen.has(key)) {
    errors.push(`Duplicate listening order entry: ${key}`);
  }
  seen.add(key);

  if (!expected.has(key)) {
    errors.push(`Unknown listening order entry: ${key}`);
  }
}

for (const key of expected) {
  if (!seen.has(key)) errors.push(`Missing listening order entry: ${key}`);
}

if (sectionCount === 0) {
  errors.push('Listening order should include named section breaks.');
}

const items = buildListeningItems(episodes, challenges);
const additional = items.filter(item => item.section === 'Additional Episodes');
if (additional.length) {
  errors.push(`Listening order omitted ${additional.length} item(s), which fell into Additional Episodes.`);
}

if (errors.length) {
  console.error('Podcast listening order validation failed:\n');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Podcast listening order validation passed. Checked ${seen.size} items across ${sectionCount} sections.`);