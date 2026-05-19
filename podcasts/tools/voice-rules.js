/**
 * voice-rules.js
 *
 * Single source of truth for podcast script voice quality. Used by:
 *   - build-source-packet.js (injects rules into per-slug packets)
 *   - generate-teaching-transcript.js / buildPrompt (renders them into the
 *     model prompt as a stable, cache-friendly preamble)
 *   - quality scanners and gates (forbidden-phrase detection)
 *
 * Keep this file ordering-stable. The preamble is placed at the top of every
 * prompt so OpenAI / OpenRouter automatic prompt caching can match the prefix
 * across all 133 jobs and discount the cached portion.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');

/**
 * Phrases that mark the LLM-template "voice" we are eliminating. If the model
 * is about to emit any of these, it should rephrase. The triage scanner uses
 * the same list to score files; keep these strings exact.
 */
const BANNED_PHRASES = [
  'has three jobs',
  'name the idea',
  'give the learner a move',
  'show what counts as evidence',
  'Section-Level Source Map',
  'GitHub Docs, home, GitHub Changelog',
  'Think of this as',
  'The next useful detail is concrete',
  'The point is not speed; the point is never losing your place',
  'That is the difference between guessing and knowing',
  'This is the move inside',
  'Anchor this part on',
  'For someone navigating by keyboard or screen reader',
  'The teaching point here is not',
  'The durable skill is not memorizing one screen',
  'It is knowing how to find your footing when the screen changes',
  'Keep it that plain',
  'That is the rhythm: orient, act, verify, continue',
  'Each step should leave a trace you can name',
  'That small check between steps is what makes the workflow reliable',
  'This part earns its place because',
  'That matters in practice:'
];

/**
 * Stale facts / removed framings that contradict the current curriculum. The
 * model must never assert these as true.
 */
const STALE_FACTS = [
  'Fork the accessibility-agents repository',
  '80 AI-powered agents',
  'eighty AI-powered agents',
  'Build Your Agent (Capstone)',
  'Build Your Own Agent',
  'if you finish early',
  'cross-fork PR'
];

/**
 * Curriculum truths the model must align with. Phrased as statements so they
 * can be dropped directly into the prompt.
 */
const CURRENT_FACTS = [
  'The Accessibility Agents collection grows over time. Refer to it as a living catalog rather than asserting a fixed count of agents.',
  'Challenge 15 (Discover Accessibility Agents) is browse-first. Learners are not required to fork the accessibility-agents repository to complete it.',
  'Completing Challenge 15 unlocks Challenge 16 (Capstone Project) plus Bonus Challenges A through E. The bonus challenges are a structured unlock path, not "things to do if you finish early".',
  'Challenge 16 is titled "Capstone Project". It accepts contributions to Accessibility Agents, GLOW, or any other meaningful repository. Review-ready drafts and contribution plans are valid evidence of completion.',
  'The Learning Room repository is where Day 1 contributions happen (issue, branch, commit, pull request, merge). It is provisioned per learner.',
  'Hosts are Alex (warm expert) and Jamie (curious co-host who asks the questions learners hesitate to ask). They are colleagues, not teacher and student.'
];

const VOICE_EXEMPLAR_PATH = path.join(
  ROOT,
  'podcasts',
  'scripts',
  'challenges',
  'cc-14-design-an-issue-template.txt'
);

/**
 * Returns the first ~3000 characters of the voice exemplar (cc-14). This is
 * the gold-standard tone the model should match: short alternating turns,
 * concrete language, no template scaffolding, occasional [PAUSE] markers.
 */
function loadVoiceExemplar(maxChars = 3000) {
  try {
    const raw = fs.readFileSync(VOICE_EXEMPLAR_PATH, 'utf8');
    if (raw.length <= maxChars) return raw.trim();
    return raw.slice(0, maxChars).trim() + '\n\n[... exemplar continues; match this tone throughout ...]';
  } catch (err) {
    return '';
  }
}

/**
 * Renders the stable preamble that goes at the TOP of every prompt. Keep the
 * ordering and wording stable so prompt caching can match the prefix across
 * all jobs.
 */
function renderVoicePreamble() {
  const lines = [];
  lines.push('# Podcast Voice Rules (stable preamble)');
  lines.push('');
  lines.push('You are writing a Git Going with GitHub podcast script. The audience is blind and low-vision learners studying GitHub, Git, VS Code, open source, and accessible contribution workflows.');
  lines.push('');
  lines.push('## Hosts');
  lines.push('- Alex: warm expert. Explains the concept and grounds it in a real workflow.');
  lines.push('- Jamie: curious co-host. Asks the question a learner would hesitate to ask. Reflects back, summarizes, and occasionally challenges.');
  lines.push('- They are colleagues. They are not teacher and student. They build on each other.');
  lines.push('');
  lines.push('## Voice rules (hard requirements)');
  lines.push('1. Alternate [ALEX] and [JAMIE] turns. Most turns are one to four sentences. Occasionally a longer turn is fine when explaining something complex, but never a single turn longer than roughly six sentences.');
  lines.push('2. Each speaker tag MUST be on its own line, exactly: [ALEX] or [JAMIE]. The next line(s) are that speaker\'s lines.');
  lines.push('3. Use [PAUSE] on its own line at meaningful section transitions. Do not narrate the section title before or after a pause.');
  lines.push('4. Conversational, not template-driven. Vary sentence shape. Use contractions when natural.');
  lines.push('5. Never narrate the script\'s own structure. Do not say "in this section" or "next, we will cover". Just transition.');
  lines.push('6. When teaching a procedure, walk through it as one host explaining and the other reacting or asking. Do not output bulleted lists of steps as a monologue.');
  lines.push('7. Cover everything substantive from the source markdown, but in conversation, not as a recitation of headings.');
  lines.push('8. Plain language. If a technical term is needed, define it briefly the first time. No insider jargon left unexplained.');
  lines.push('');
  lines.push('## Banned phrases (do not output any of these, in any casing)');
  for (const phrase of BANNED_PHRASES) lines.push(`- ${phrase}`);
  lines.push('');
  lines.push('These phrases come from a previous generation pass that produced template-feeling output. They are now blacklisted. Rephrase any thought that would otherwise use them.');
  lines.push('');
  lines.push('## Stale facts (do not state any of these as true)');
  for (const fact of STALE_FACTS) lines.push(`- ${fact}`);
  lines.push('');
  lines.push('## Current curriculum facts (the model must align with these)');
  for (const fact of CURRENT_FACTS) lines.push(`- ${fact}`);
  lines.push('');
  lines.push('## Voice exemplar (this is the target tone)');
  lines.push('The following is a real podcast script from this series. Match its conversational rhythm, sentence length, contractions, and how the hosts react to each other. Do not copy its content; only its voice.');
  lines.push('');
  lines.push('```');
  const exemplar = loadVoiceExemplar();
  lines.push(exemplar || '(voice exemplar unavailable)');
  lines.push('```');
  lines.push('');
  return lines.join('\n');
}

module.exports = {
  BANNED_PHRASES,
  STALE_FACTS,
  CURRENT_FACTS,
  VOICE_EXEMPLAR_PATH,
  loadVoiceExemplar,
  renderVoicePreamble
};
