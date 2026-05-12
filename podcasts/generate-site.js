#!/usr/bin/env node
/**
 * Podcast Site Generator for Git Going with GitHub
 *
 * Reads podcasts/manifest.json and transcript scripts under podcasts/scripts,
 * then generates:
 *   1. admin/PODCASTS.md - Player page with audio + full transcripts per episode
 *   2. podcasts/feed.xml - RSS 2.0 podcast feed with transcript show notes
 *                          and MP3 enclosures (iTunes-compatible)
 *
 * Usage: node podcasts/generate-site.js
 *
 * The manifest is produced by build-bundles.js. To update episode status
 * (e.g. mark an episode as published), edit manifest.json directly and
 * re-run this script.
 */

const fs = require('fs');
const path = require('path');
const { challenges } = require('./build-challenge-bundles');
const listeningPlan = require('./lib/listening-plan');

const ROOT = path.join(__dirname, '..');
const MANIFEST_PATH = path.join(__dirname, 'manifest.json');
const SCRIPTS_DIR = path.join(__dirname, 'scripts');
const AUDIO_DIR = path.join(__dirname, 'audio');
const CHAPTERS_DIR = path.join(__dirname, 'chapters');
const PODCASTS_MD = path.join(ROOT, 'admin', 'PODCASTS.md');
const FEED_XML = path.join(__dirname, 'feed.xml');

const REPO_URL = 'https://github.com/Community-Access/git-going-with-github';
const SITE_URL = 'https://community-access.org/git-going-with-github';
const AUDIO_BASE = `${REPO_URL}/releases/download/podcasts`;
const CHAPTERS_BASE = `${SITE_URL}/podcasts/chapters`;
const COMMUNITY_ACCESS_NAME = 'Community Access';
const COMMUNITY_ACCESS_URL = 'http://www.community-access.org';
const DEFAULT_KOKORO_AUDIO_DIR = path.join(AUDIO_DIR, 'kokoro-am_liam-af_jessica');
const AUDIO_SEARCH_DIRS = [
  ...(process.env.PODCAST_AUDIO_DIR ? process.env.PODCAST_AUDIO_DIR.split(path.delimiter) : []),
  AUDIO_DIR,
  DEFAULT_KOKORO_AUDIO_DIR,
].filter(Boolean).filter((dir, index, dirs) => dirs.indexOf(dir) === index);

// ---------------------------------------------------------------------------
// Episode grouping (for the player page)
// ---------------------------------------------------------------------------

function chapterNumberFromSource(ep) {
  const src = ep.sources && ep.sources[0];
  const match = src && src.match(/^(\d{2})-/);
  return match ? Number(match[1]) : null;
}

function groupLabel(ep) {
  const chapterNumber = chapterNumberFromSource(ep);
  if (ep.number === 0 || (chapterNumber !== null && chapterNumber <= 10)) return 'day1';
  if (chapterNumber !== null && chapterNumber >= 11) return 'day2';
  return 'appendix';
}

// Map episode number to chapter/appendix source label
function sourceLabel(ep) {
  if (ep.number === 0) return '[Course Guide](docs/course-guide.md)';
  const src = ep.sources[0];
  const chapterNumber = chapterNumberFromSource(ep);
  if (chapterNumber !== null) {
    return `[Chapter ${chapterNumber}: ${ep.title}](docs/${src})`;
  }
  // Extract appendix letter from filename
  const match = src.match(/appendix-([a-z])-/);
  const letter = match ? match[1].toUpperCase() : '';
  return `[Appendix ${letter}: ${ep.title}](docs/${src})`;
}

// ---------------------------------------------------------------------------
// XML/HTML helpers
// ---------------------------------------------------------------------------

function escapeXml(str) {
  return sanitizeXmlText(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function sanitizeXmlText(str) {
  return String(str ?? '')
    .replace(/\r\n?/g, '\n')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\uFFFE\uFFFF]/g, '');
}

function cdata(str) {
  return sanitizeXmlText(str).replace(/\]\]>/g, ']]]]><![CDATA[>');
}

function audioUrlForFile(audioFile) {
  return `${AUDIO_BASE}/${audioFile}`;
}

function audioPathForFile(audioFile) {
  for (const dir of AUDIO_SEARCH_DIRS) {
    const candidate = path.join(dir, audioFile);
    if (fs.existsSync(candidate)) return candidate;
  }
  return path.join(AUDIO_DIR, audioFile);
}

function fileSizeBytes(filePath) {
  try {
    return fs.statSync(filePath).size;
  } catch {
    return 0;
  }
}

function pubDateForFile(filePath, fallbackDate) {
  try {
    return fs.statSync(filePath).mtime.toUTCString();
  } catch {
    return fallbackDate;
  }
}

function parseDurationMinutes(label) {
  if (!label) return null;
  const match = String(label).match(/(\d+)/);
  return match ? Number(match[1]) : null;
}

function formatDurationFromSeconds(seconds) {
  const total = Math.max(0, Math.round(seconds));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  if (h > 0) {
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }
  return `${m}:${String(s).padStart(2, '0')}`;
}

function durationFromSegments(slug) {
  const manifestPath = path.join(AUDIO_DIR, 'segments', slug, 'manifest.json');
  if (!fs.existsSync(manifestPath)) return null;
  try {
    const entries = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    const seconds = entries.reduce((sum, entry) => sum + (Number(entry.duration) || 0), 0);
    if (!seconds) return null;
    return formatDurationFromSeconds(seconds);
  } catch {
    return null;
  }
}

function companionAudioFile(ep) {
  const pad = String(ep.number).padStart(2, '0');
  return ep.audio || `ep${pad}-${ep.slug}.mp3`;
}

function challengeAudioFile(challenge) {
  return `cc-${challenge.id}-${challenge.slug}.mp3`;
}

function buildListeningItems(manifest) {
  return listeningPlan.buildListeningItems(manifest, challenges);
}

function chapterElementForSlug(slug) {
  const chapterFile = `${slug}.json`;
  const chapterPath = path.join(CHAPTERS_DIR, chapterFile);
  if (!fs.existsSync(chapterPath)) return '';
  return `      <podcast:chapters url="${CHAPTERS_BASE}/${chapterFile}" type="application/json+chapters" />`;
}

function listScriptFilesRecursive(dir) {
  if (!fs.existsSync(dir)) return [];
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...listScriptFilesRecursive(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.txt')) {
      files.push(fullPath);
    }
  }
  return files;
}

function findScriptByName(fileName) {
  const directPath = path.join(SCRIPTS_DIR, fileName);
  if (fs.existsSync(directPath)) return directPath;
  const files = listScriptFilesRecursive(SCRIPTS_DIR);
  return files.find(filePath => path.basename(filePath) === fileName) || null;
}

function findScriptByPrefix(prefix) {
  const files = listScriptFilesRecursive(SCRIPTS_DIR)
    .filter(filePath => path.basename(filePath).startsWith(prefix) && filePath.endsWith('.txt'))
    .sort();
  return files[0] || null;
}

// ---------------------------------------------------------------------------
// Transcript reading and formatting
// ---------------------------------------------------------------------------

/**
 * Find the transcript script file for an episode.
 * Script files are named epNN-slug.txt in podcasts/scripts/.
 * They may be stored directly in scripts/ or in categorized subfolders.
 */
function findScriptFile(ep) {
  const pad = String(ep.number).padStart(2, '0');
  const expected = `ep${pad}-${ep.slug}.txt`;
  const expectedPath = findScriptByName(expected);
  if (expectedPath) return expectedPath;

  // Fallback: scan for any file matching the episode number.
  return findScriptByPrefix(`ep${pad}-`);
}

/**
 * Parse a script file and return an array of segments:
 * [{ speaker: 'ALEX'|'JAMIE'|'PAUSE', text: string }]
 */
function parseScript(scriptText) {
  const segments = [];
  let currentSpeaker = null;
  let currentLines = [];

  for (const line of scriptText.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    if (trimmed === '[PAUSE]') {
      if (currentSpeaker && currentLines.length) {
        segments.push({ speaker: currentSpeaker, text: currentLines.join(' ').trim() });
        currentLines = [];
      }
      segments.push({ speaker: 'PAUSE', text: '' });
      continue;
    }

    const match = trimmed.match(/^\[(ALEX|JAMIE)\]$/);
    if (match) {
      if (currentSpeaker && currentLines.length) {
        segments.push({ speaker: currentSpeaker, text: currentLines.join(' ').trim() });
        currentLines = [];
      }
      currentSpeaker = match[1];
      continue;
    }

    // Handle [ALEX] Text on same line
    const inlineMatch = trimmed.match(/^\[(ALEX|JAMIE)\]\s+(.*)/);
    if (inlineMatch) {
      if (currentSpeaker && currentLines.length) {
        segments.push({ speaker: currentSpeaker, text: currentLines.join(' ').trim() });
        currentLines = [];
      }
      currentSpeaker = inlineMatch[1];
      if (inlineMatch[2]) currentLines.push(inlineMatch[2]);
      continue;
    }

    currentLines.push(trimmed);
  }

  if (currentSpeaker && currentLines.length) {
    segments.push({ speaker: currentSpeaker, text: currentLines.join(' ').trim() });
  }
  return segments;
}

/**
 * Format transcript segments into readable markdown for the PODCASTS.md page.
 * Each speaker turn becomes a bold-labeled paragraph.
 */
function formatTranscriptMarkdown(segments) {
  const lines = [];
  for (const seg of segments) {
    if (seg.speaker === 'PAUSE') {
      lines.push('---');
      lines.push('');
      continue;
    }
    const name = seg.speaker === 'ALEX' ? 'Alex' : 'Jamie';
    lines.push(`**${name}:** ${seg.text}`);
    lines.push('');
  }
  return lines.join('\n');
}

/**
 * Format transcript segments into clean HTML for RSS content:encoded.
 * Uses <p> tags with speaker names in <strong>.
 */
function formatTranscriptHtml(segments) {
  const parts = [];
  for (const seg of segments) {
    if (seg.speaker === 'PAUSE') {
      parts.push('<hr />');
      continue;
    }
    const name = seg.speaker === 'ALEX' ? 'Alex' : 'Jamie';
    parts.push(`<p><strong>${name}:</strong> ${escapeXml(seg.text)}</p>`);
  }
  return parts.join('\n');
}

/**
 * Format transcript as plain text for itunes:summary.
 */
function formatTranscriptPlainText(segments) {
  const lines = [];
  for (const seg of segments) {
    if (seg.speaker === 'PAUSE') continue;
    const name = seg.speaker === 'ALEX' ? 'Alex' : 'Jamie';
    lines.push(`${name}: ${seg.text}`);
  }
  return lines.join('\n\n');
}

/**
 * Load and parse transcript for an episode. Returns null if no script found.
 */
function loadTranscript(ep) {
  const script = loadEpisodeScript(ep);
  return script ? script.segments : null;
}

function loadEpisodeScript(ep) {
  const scriptPath = findScriptFile(ep);
  if (!scriptPath) return null;
  const rawText = fs.readFileSync(scriptPath, 'utf-8');
  return {
    scriptPath,
    rawText,
    segments: parseScript(rawText),
  };
}

function challengeScriptFile(challenge) {
  return findScriptByName(`cc-${challenge.id}-${challenge.slug}.txt`);
}

function loadChallengeTranscript(challenge) {
  const script = loadChallengeScript(challenge);
  return script ? script.segments : null;
}

function loadChallengeScript(challenge) {
  const scriptPath = challengeScriptFile(challenge);
  if (!scriptPath || !fs.existsSync(scriptPath)) return null;
  const rawText = fs.readFileSync(scriptPath, 'utf-8');
  return {
    scriptPath,
    rawText,
    segments: parseScript(rawText),
  };
}

function scriptElement(rawText) {
  if (!rawText) return '';
  const scriptText = sanitizeXmlText(rawText).trim() + '\n';
  return `
      <ca:script format="alex-jamie-pause-text"><![CDATA[${cdata(scriptText)}]]></ca:script>`;
}

function contentEncodedElement(html) {
  if (!html) return '';
  return `
      <content:encoded><![CDATA[${cdata(html)}]]></content:encoded>`;
}

// ---------------------------------------------------------------------------
// Generate PODCASTS.md
// ---------------------------------------------------------------------------

function generatePlayerPage(manifest) {
  const lines = [];
  const listeningItems = buildListeningItems(manifest);

  lines.push('# Podcasts');
  lines.push('');
  lines.push('## Git Going with GitHub - Audio Series');
  lines.push('');
  lines.push('Listen to the workshop as one end-to-end path. Companion lessons, Challenge Coach episodes, and reference material are interleaved so learners can hear the concept, practice it, and then keep moving through the course. Every episode includes a full transcript below the player.');
  lines.push('');
  lines.push(`**Subscribe:** Add the [podcast RSS feed](${SITE_URL}/podcasts/feed.xml) to your preferred podcast app - Apple Podcasts, Spotify, Overcast, or any RSS reader.`);
  lines.push('');
  lines.push('**Transcripts:** Every episode includes a complete, readable transcript. Expand the "Read Transcript" section below any episode to follow along or search the conversation.');
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## How to Use These Episodes');
  lines.push('');
  lines.push('- **Follow the path:** Listen in order when you want the full workshop experience.');
  lines.push('- **Practice in place:** Challenge Coach episodes appear near the chapters that prepare you for that task.');
  lines.push('- **Use references when needed:** Appendix and reference episodes are placed near the moments where they help most.');
  lines.push('');
  lines.push('---');
  lines.push('');

  let currentSection = null;

  for (const item of listeningItems) {
    if (item.section !== currentSection) {
      currentSection = item.section;
      lines.push(`## ${currentSection}`);
      lines.push('');
    }

    const audioFile = item.audioFile;
    const audioUrl = audioUrlForFile(audioFile);
    const audioPath = audioPathForFile(audioFile);
    const hasAudio = fs.existsSync(audioPath);
    const segments = item.kind === 'companion'
      ? loadTranscript(item.ep)
      : loadChallengeTranscript(item.challenge);
    const hasTranscript = segments && segments.length > 0;

    lines.push(`### ${item.sequence}. ${item.title}`);
    lines.push('');
    lines.push(item.description);
    lines.push('');
    if (item.kind === 'companion') {
      lines.push(`Based on: ${sourceLabel(item.ep)}`);
    } else {
      lines.push(`Practice focus: ${item.challenge.day}`);
    }
    lines.push('');
    if (hasAudio) {
      lines.push('<audio controls preload="none">');
      lines.push(`  <source src="${audioUrl}" type="audio/mpeg">`);
      lines.push(`  Your browser does not support the audio element. <a href="${audioUrl}">Download ${item.shortTitle} (MP3)</a>`);
      lines.push('</audio>');
      lines.push('');
      lines.push(`[Download ${item.shortTitle} (MP3)](${audioUrl})`);
      lines.push('');
    } else if (!hasAudio && hasTranscript) {
      lines.push('Audio and transcript are being regenerated for this episode.');
      lines.push('');
    } else {
      lines.push('Audio and transcript are being regenerated for this episode.');
      lines.push('');
    }

    // Transcript section
    if (hasTranscript) {
      const transcriptMd = formatTranscriptMarkdown(segments);
      lines.push('<details>');
      lines.push(`<summary>Read Transcript - ${item.title}</summary>`);
      lines.push('');
      lines.push(`#### Transcript`);
      lines.push('');
      lines.push(transcriptMd);
      lines.push('</details>');
      lines.push('');
    }

    lines.push('---');
    lines.push('');
  }

  // Footer
  lines.push('## Production');
  lines.push('');
  lines.push('These episodes are generated with local neural text-to-speech models. Each episode is produced from the workshop chapter content using episode-specific scripts that ensure concept coverage, accessible language, and screen reader-friendly descriptions.');
  lines.push('');
  lines.push('Source bundles and production documentation are in the [podcasts/](podcasts/) directory.');
  lines.push('');

  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Generate RSS 2.0 feed (podcasts/feed.xml)
// ---------------------------------------------------------------------------

function generateRssFeed(manifest) {
  const now = new Date().toUTCString();
  const listeningItems = buildListeningItems(manifest);

  const items = listeningItems.map(item => {
    const audioFile = item.audioFile;
    const audioSlug = path.basename(audioFile, path.extname(audioFile));
    const audioPath = audioPathForFile(audioFile);
    if (!fs.existsSync(audioPath)) return null;
    const audioUrl = audioUrlForFile(audioFile);
    const episodeUrl = `${SITE_URL}/admin/PODCASTS.html`;
    const enclosureLength = fileSizeBytes(audioPath);
    const pubDate = pubDateForFile(audioPath, now);
    const chapterTag = chapterElementForSlug(audioSlug);

    // Load script for show notes and embedded machine-readable script text.
    const script = item.kind === 'companion'
      ? loadEpisodeScript(item.ep)
      : loadChallengeScript(item.challenge);
    const segments = script ? script.segments : null;
    let contentEncoded = '';
    let itunesSummary = escapeXml(item.description);
    const duration = durationFromSegments(audioSlug)
      || (item.kind === 'companion' && parseDurationMinutes(item.ep.duration) ? `${parseDurationMinutes(item.ep.duration)}:00` : '8:00');

    if (segments && segments.length > 0) {
      const transcriptHtml = formatTranscriptHtml(segments);
      contentEncoded = contentEncodedElement(`
        <h2>${escapeXml(item.title)}</h2>
        <p>${escapeXml(item.description)}</p>
        <h3>Full Transcript</h3>
        ${transcriptHtml}
        <p><a href="${episodeUrl}">View all episodes on the web</a></p>
      `);

      itunesSummary = escapeXml(formatTranscriptPlainText(segments));
    }

    return `    <item>
      <title>${escapeXml(item.title)}</title>
      <description>${escapeXml(item.description)}</description>${contentEncoded}${scriptElement(script && script.rawText)}
      <link>${episodeUrl}</link>
      <guid isPermaLink="false">git-going-${audioFile}</guid>
      <pubDate>${pubDate}</pubDate>
      <enclosure url="${audioUrl}" type="audio/mpeg" length="${enclosureLength}" />${chapterTag ? `
    ${chapterTag}` : ''}
      <author>opensource@communityaccess.nyc (${COMMUNITY_ACCESS_NAME})</author>
      <itunes:episode>${item.sequence}</itunes:episode>
      <itunes:author>${COMMUNITY_ACCESS_NAME}</itunes:author>
      <itunes:title>${escapeXml(item.title)}</itunes:title>
      <itunes:summary>${itunesSummary}</itunes:summary>
      <itunes:duration>${duration}</itunes:duration>
      <itunes:episodeType>full</itunes:episodeType>
      <itunes:explicit>false</itunes:explicit>
    </item>`;
  }).filter(Boolean);

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:itunes="http://www.itunes.apple.com/dtds/podcast-1.0.dtd"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
    xmlns:atom="http://www.w3.org/2005/Atom"
    xmlns:podcast="https://podcastindex.org/namespace/1.0"
    xmlns:ca="https://community-access.org/podcast/ns">
  <channel>
    <title>Git Going with GitHub - Audio Series</title>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/podcasts/feed.xml" rel="self" type="application/rss+xml" />
    <description>Companion audio episodes for the Git Going with GitHub workshop. Standalone teaching conversations for every chapter and appendix, designed for blind and low-vision developers learning GitHub and open source collaboration.</description>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>
    <itunes:author>${COMMUNITY_ACCESS_NAME}</itunes:author>
    <ca:authorUrl>${escapeXml(COMMUNITY_ACCESS_URL)}</ca:authorUrl>
    <itunes:summary>${items.length} audio episodes for the Git Going with GitHub workshop, including companion and Challenge Coach tracks for blind and low-vision developers using GitHub and VS Code.</itunes:summary>
    <itunes:owner>
      <itunes:name>Community Access</itunes:name>
      <itunes:email>opensource@communityaccess.nyc</itunes:email>
    </itunes:owner>
    <itunes:explicit>false</itunes:explicit>
    <itunes:category text="Technology" />
    <itunes:category text="Education">
      <itunes:category text="How To" />
    </itunes:category>
    <itunes:type>serial</itunes:type>
${items.join('\n')}
  </channel>
</rss>
`;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  if (!fs.existsSync(MANIFEST_PATH)) {
    console.error('Error: manifest.json not found. Run build-bundles.js first.');
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8'));
  console.log(`Read manifest: ${manifest.length} episodes`);

  // Count available transcripts
  let transcriptCount = 0;
  for (const ep of manifest) {
    if (findScriptFile(ep)) transcriptCount++;
  }
  console.log(`Transcripts found: ${transcriptCount} of ${manifest.length}`);

  // Generate PODCASTS.md
  const playerPage = generatePlayerPage(manifest);
  fs.writeFileSync(PODCASTS_MD, playerPage, 'utf-8');
  console.log(`Generated: ${PODCASTS_MD}`);

  // Generate RSS feed
  const feed = generateRssFeed(manifest);
  fs.writeFileSync(FEED_XML, feed, 'utf-8');
  console.log(`Generated: ${FEED_XML}`);

  console.log('\nPodcast site generation complete.');
  if (transcriptCount > 0) {
    const companionAudioCount = manifest.filter(ep => fs.existsSync(audioPathForFile(companionAudioFile(ep)))).length;
    const challengeAudioCount = challenges.filter(challenge => fs.existsSync(audioPathForFile(challengeAudioFile(challenge)))).length;
    console.log(`  ${transcriptCount} companion episodes have embedded transcripts on the podcast page.`);
    console.log(`  ${companionAudioCount + challengeAudioCount} audio episodes have RSS feed enclosures.`);
  }
}

main();
