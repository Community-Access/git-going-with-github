const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const CONFIG_LISTENING_ORDER_PATH = path.join(ROOT, 'config', 'listening-order.json');
const LEGACY_LISTENING_ORDER_PATH = path.join(ROOT, 'listening-order.json');

function loadListeningOrder() {
  const orderPath = fs.existsSync(CONFIG_LISTENING_ORDER_PATH)
    ? CONFIG_LISTENING_ORDER_PATH
    : LEGACY_LISTENING_ORDER_PATH;

  if (!fs.existsSync(orderPath)) return [];
  return JSON.parse(fs.readFileSync(orderPath, 'utf-8'));
}

function companionAudioFile(ep) {
  const pad = String(ep.number).padStart(2, '0');
  return ep.audio || `ep${pad}-${ep.slug}.mp3`;
}

function companionSlug(ep) {
  return path.basename(companionAudioFile(ep), '.mp3');
}

function challengeAudioFile(challenge) {
  return `cc-${challenge.id}-${challenge.slug}.mp3`;
}

function challengeSlug(challenge) {
  return path.basename(challengeAudioFile(challenge), '.mp3');
}

function makeCompanionItem(ep, section, sequence) {
  const audioFile = companionAudioFile(ep);
  return {
    kind: 'companion',
    section,
    sequence,
    ep,
    slug: path.basename(audioFile, '.mp3'),
    audioFile,
    title: `Episode ${ep.number}: ${ep.title}`,
    shortTitle: `Episode ${ep.number}`,
    description: ep.description,
  };
}

function makeChallengeItem(challenge, section, sequence) {
  const audioFile = challengeAudioFile(challenge);
  return {
    kind: 'challenge',
    section,
    sequence,
    challenge,
    slug: path.basename(audioFile, '.mp3'),
    audioFile,
    title: `Challenge ${challenge.id}: ${challenge.title}`,
    shortTitle: `Challenge ${challenge.id}`,
    description: challenge.focus,
  };
}

function buildListeningItems(manifest, challenges) {
  const companionBySlug = new Map(manifest.map(ep => [companionSlug(ep), ep]));
  const challengeBySlug = new Map(challenges.map(challenge => [challengeSlug(challenge), challenge]));
  const used = new Set();
  const items = [];
  let section = 'Audio Path';

  for (const entry of loadListeningOrder()) {
    if (entry.kind === 'section') {
      section = entry.title || section;
      continue;
    }

    const key = `${entry.kind}:${entry.slug}`;
    if (entry.kind === 'companion') {
      const ep = companionBySlug.get(entry.slug);
      if (!ep) {
        console.warn(`Listening order references unknown companion: ${entry.slug}`);
        continue;
      }
      used.add(key);
      items.push(makeCompanionItem(ep, section, items.length + 1));
    } else if (entry.kind === 'challenge') {
      const challenge = challengeBySlug.get(entry.slug);
      if (!challenge) {
        console.warn(`Listening order references unknown challenge: ${entry.slug}`);
        continue;
      }
      used.add(key);
      items.push(makeChallengeItem(challenge, section, items.length + 1));
    }
  }

  section = 'Additional Episodes';
  for (const ep of manifest) {
    const key = `companion:${companionSlug(ep)}`;
    if (!used.has(key)) {
      used.add(key);
      items.push(makeCompanionItem(ep, section, items.length + 1));
    }
  }
  for (const challenge of challenges) {
    const key = `challenge:${challengeSlug(challenge)}`;
    if (!used.has(key)) {
      used.add(key);
      items.push(makeChallengeItem(challenge, section, items.length + 1));
    }
  }

  return items;
}

module.exports = {
  CONFIG_LISTENING_ORDER_PATH,
  LEGACY_LISTENING_ORDER_PATH,
  loadListeningOrder,
  companionAudioFile,
  companionSlug,
  challengeAudioFile,
  challengeSlug,
  buildListeningItems,
};