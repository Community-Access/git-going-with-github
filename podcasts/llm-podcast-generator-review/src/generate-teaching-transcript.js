#!/usr/bin/env node
/**
 * LLM-first podcast transcript generator (review lane).
 * Supports OpenRouter/OpenAI and packet-driven source coverage.
 */

const fs = require('fs');
const path = require('path');
const { evaluateTranscript } = require('../../tools/agentic-pilot/evaluate-transcript');

const ROOT = process.cwd();
const DEFAULT_BASE_URL = process.env.OPENROUTER_BASE_URL || process.env.OPENAI_BASE_URL || 'https://openrouter.ai/api/v1';
const DEFAULT_MODEL = process.env.PODCAST_LLM_MODEL || 'openai/gpt-5.4-mini';
const DEFAULT_MAX_REPAIR_ATTEMPTS = Number.parseInt(process.env.PODCAST_LLM_MAX_REPAIR_ATTEMPTS || '3', 10);

function usage() {
  return 'Usage: node podcasts/llm-podcast-generator-review/src/generate-teaching-transcript.js --slug <slug> (--packet <packet.json> | --source <file> [--source <file> ...]) [--out <candidate.json>] [--model <model>] [--dry-run]';
}

function parseArgs(argv) {
  const args = {
    slug: null,
    source: [],
    packet: null,
    concepts: [],
    out: null,
    model: DEFAULT_MODEL,
    apiKey: process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY || '',
    baseUrl: DEFAULT_BASE_URL,
    provider: process.env.PODCAST_LLM_PROVIDER || 'openrouter',
    temperature: Number.parseFloat(process.env.PODCAST_LLM_TEMPERATURE || '0.7'),
    maxTokens: Number.parseInt(process.env.PODCAST_LLM_MAX_OUTPUT_TOKENS || '12000', 10),
    dryRun: false,
    requestTimeoutMs: Number.parseInt(process.env.PODCAST_LLM_TIMEOUT_MS || '120000', 10),
    promptOut: null,
    maxRepairAttempts: DEFAULT_MAX_REPAIR_ATTEMPTS
  };

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    const value = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : null;
    if (token === '--slug' && value) args.slug = value;
    else if (token === '--source' && value) args.source.push(value);
    else if (token === '--packet' && value) args.packet = value;
    else if (token === '--concept' && value) args.concepts.push(value);
    else if (token === '--out' && value) args.out = value;
    else if (token === '--model' && value) args.model = value;
    else if (token === '--api-key' && value) args.apiKey = value;
    else if (token === '--base-url' && value) args.baseUrl = value;
    else if (token === '--provider' && value) args.provider = value;
    else if (token === '--temperature' && value) args.temperature = Number.parseFloat(value);
    else if (token === '--max-tokens' && value) args.maxTokens = Number.parseInt(value, 10);
    else if (token === '--max-repair-attempts' && value) args.maxRepairAttempts = Number.parseInt(value, 10);
    else if (token === '--prompt-out' && value) args.promptOut = value;
    else if (token === '--dry-run') args.dryRun = true;
  }

  return args;
}

function readRequired(relativeOrAbsolutePath) {
  const filePath = path.isAbsolute(relativeOrAbsolutePath)
    ? relativeOrAbsolutePath
    : path.join(ROOT, relativeOrAbsolutePath);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing source file: ${filePath}`);
  }

  return fs.readFileSync(filePath, 'utf8');
}

function absolutePath(relativeOrAbsolutePath) {
  return path.isAbsolute(relativeOrAbsolutePath)
    ? relativeOrAbsolutePath
    : path.join(ROOT, relativeOrAbsolutePath);
}

function readPacket(packetPath) {
  const absolute = absolutePath(packetPath);
  const packet = JSON.parse(readRequired(absolute));
  const sourceFiles = (packet.sourceFiles || []).map(source => {
    const sourcePath = absolutePath(source.path);
    const exists = fs.existsSync(sourcePath);
    // Prefer content captured in the packet (so prompt building is reproducible
    // even if source files later change); fall back to live disk read for
    // backward compatibility with schemaVersion 1 packets.
    const content = typeof source.content === 'string'
      ? source.content
      : (exists ? fs.readFileSync(sourcePath, 'utf8') : '');
    return {
      sourcePath,
      sourceLabel: path.basename(sourcePath),
      exists,
      concepts: [],
      content
    };
  });
  const concepts = [...new Set([...(packet.concepts || []), ...[]])].filter(Boolean);
  return {
    packetPath: absolute,
    packet,
    sourceFiles,
    concepts,
    kind: packet.kind || null,
    title: packet.title || '',
    description: packet.description || '',
    companions: packet.companions || null,
    voiceRules: packet.voiceRules || null
  };
}

function cleanText(text) {
  return String(text || '')
    .replace(/\r/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function collectHeadings(markdown) {
  return markdown
    .replace(/\r/g, '')
    .split('\n')
    .map(line => line.match(/^(#{1,4})\s+(.+)$/))
    .filter(Boolean)
    .map(match => ({
      level: match[1].length,
      title: cleanText(match[2].replace(/[#*_`[\]()]/g, ''))
    }));
}

function compactSourceContent(text, maxChars = 14000) {
  const normalized = String(text || '');
  if (normalized.length <= maxChars) return normalized;
  const head = normalized.slice(0, Math.floor(maxChars * 0.7)).trim();
  const tail = normalized.slice(-Math.floor(maxChars * 0.3)).trim();
  return `${head}\n\n<!-- content omitted for length -->\n\n${tail}`;
}

/**
 * Render the stable voice preamble from the packet's voiceRules block. Falls
 * back to the live voice-rules module when an older packet did not include it.
 * The preamble is intentionally identical across all slugs so OpenAI /
 * OpenRouter automatic prompt caching can match the prefix and discount the
 * cached tokens (50% off for cached prefixes >= 1024 tokens).
 */
function renderVoicePreamble(voiceRulesBlock) {
  let banned = voiceRulesBlock && Array.isArray(voiceRulesBlock.bannedPhrases)
    ? voiceRulesBlock.bannedPhrases
    : null;
  let stale = voiceRulesBlock && Array.isArray(voiceRulesBlock.staleFacts)
    ? voiceRulesBlock.staleFacts
    : null;
  let current = voiceRulesBlock && Array.isArray(voiceRulesBlock.currentFacts)
    ? voiceRulesBlock.currentFacts
    : null;
  let exemplar = voiceRulesBlock && typeof voiceRulesBlock.voiceExemplar === 'string'
    ? voiceRulesBlock.voiceExemplar
    : '';

  if (!banned || !stale || !current || !exemplar) {
    try {
      const live = require('../../tools/voice-rules');
      banned = banned || live.BANNED_PHRASES;
      stale = stale || live.STALE_FACTS;
      current = current || live.CURRENT_FACTS;
      exemplar = exemplar || live.loadVoiceExemplar();
    } catch (err) {
      banned = banned || [];
      stale = stale || [];
      current = current || [];
      exemplar = exemplar || '';
    }
  }

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
  lines.push('9. ASCII ONLY. Every character in your output must be plain US-ASCII (codepoint 0 to 127). Use straight apostrophes, straight double quotes, hyphens instead of em-dash or en-dash, three periods instead of an ellipsis, and a normal space instead of a non-breaking space. The output goes to a neural TTS engine that mispronounces or skips smart-typography characters.');
  lines.push('10. Chapter markers must be GENUINE topic shifts. Produce between 6 and 9 chapters per script (closer to 9 for longer source material, closer to 6 for short scripts). Anchor each chapter at the FIRST [ALEX] or [JAMIE] segment that opens the new topic. segmentIndex 0 is the very first segment.');
  lines.push('11. Chapter titles must be 3 to 8 words, topic-focused, in sentence case, with NO trailing punctuation, NO question marks, NO narrator filler (no "Let us pause on", no "Now bring the learner back", no "Question:"). Write them like podcast app chapter labels that a listener would click to jump to a topic.');
  lines.push('');
  lines.push('## Banned phrases (do not output any of these, in any casing)');
  for (const phrase of banned) lines.push(`- ${phrase}`);
  lines.push('');
  lines.push('These phrases come from a previous generation pass that produced template-feeling output. Rephrase any thought that would otherwise use them.');
  lines.push('');
  lines.push('## Stale facts (do not state any of these as true)');
  for (const fact of stale) lines.push(`- ${fact}`);
  lines.push('');
  lines.push('## Current curriculum facts (the model must align with these)');
  for (const fact of current) lines.push(`- ${fact}`);
  lines.push('');
  lines.push('## Voice exemplar (this is the target tone)');
  lines.push('The following is a real podcast script from this series. Match its conversational rhythm, sentence length, contractions, and how the hosts react to each other. Do not copy its content; only its voice.');
  lines.push('');
  lines.push('```');
  lines.push(exemplar || '(voice exemplar unavailable)');
  lines.push('```');
  lines.push('');
  return lines.join('\n');
}

/**
 * Render the per-slug context block: kind, title, description, paired
 * challenges or chapters, classroom review, assignment context, headings.
 * This block changes per slug; it goes AFTER the cached preamble.
 */
function renderSlugContext({ slug, kind, title, description, concepts, companions, headings, sourceLabels }) {
  const lines = [];
  lines.push(`# Slug: ${slug}`);
  lines.push('');
  if (kind) lines.push(`Kind: ${kind} (${kind === 'challenge' ? 'challenge walkthrough' : 'chapter / appendix companion'})`);
  if (title) lines.push(`Title: ${title}`);
  if (description) lines.push(`Description: ${description}`);
  if (Array.isArray(concepts) && concepts.length) {
    lines.push('Concepts to cover:');
    for (const concept of concepts) lines.push(`- ${concept}`);
  }
  lines.push('');

  if (companions) {
    if (Array.isArray(companions.pairedChallenges) && companions.pairedChallenges.length) {
      lines.push('## Paired challenges that build on this material');
      lines.push('Mention these challenges naturally where relevant; they are how learners apply this content.');
      for (const ch of companions.pairedChallenges) {
        lines.push(`- Challenge ${ch.id} (${ch.day}): ${ch.title} - ${ch.focus}`);
      }
      lines.push('');
    }
    if (Array.isArray(companions.pairedChapters) && companions.pairedChapters.length) {
      lines.push('## Chapters this challenge grounds in');
      for (const ch of companions.pairedChapters) {
        lines.push(`- ${ch.relPath}`);
      }
      lines.push('');
    }
    if (typeof companions.classroomReview === 'string' && companions.classroomReview.trim()) {
      lines.push('## Classroom content-review block (authoritative challenge intent)');
      lines.push('');
      lines.push('```markdown');
      lines.push(companions.classroomReview.trim().slice(0, 4000));
      lines.push('```');
      lines.push('');
    }
    if (Array.isArray(companions.assignments) && companions.assignments.length) {
      lines.push('## Day assignment context');
      for (const asn of companions.assignments) {
        const excerpt = String(asn.content || '').slice(0, 1800);
        lines.push(`### ${path.basename(asn.path)}`);
        lines.push('');
        lines.push('```markdown');
        lines.push(excerpt);
        lines.push('```');
        lines.push('');
      }
    }
  }

  lines.push('## Sources provided');
  for (const label of sourceLabels) lines.push(`- ${label}`);
  lines.push('');
  lines.push('## Headings that must be represented (in conversation, never spoken aloud as labels)');
  lines.push(headings || '(No headings detected.)');
  lines.push('');
  return lines.join('\n');
}

function buildPrompt({ slug, sourceTexts, sourceLabels, kind, title, description, concepts, companions, voiceRules: voiceRulesBlock }) {
  const allHeadings = sourceTexts.flatMap(source => collectHeadings(source.content).map(item => ({
    sourceLabel: source.label,
    level: item.level,
    title: item.title
  })));
  const headings = allHeadings
    .map(item => `${'#'.repeat(item.level)} [${item.sourceLabel}] ${item.title}`)
    .join('\n');
  const sourceBody = sourceTexts.map(source => `## Source: ${source.label}\n\n\`\`\`markdown\n${compactSourceContent(source.content)}\n\`\`\``).join('\n\n');

  const preamble = renderVoicePreamble(voiceRulesBlock);
  const slugContext = renderSlugContext({
    slug,
    kind,
    title,
    description,
    concepts,
    companions,
    headings,
    sourceLabels
  });

  const outputContract = `# Output contract

Return JSON only. No prose outside the JSON. No code fences. The JSON must validate against this shape:

{
  "script": "[ALEX]\\nFirst line of dialogue.\\n\\n[JAMIE]\\nResponse.\\n\\n[PAUSE]\\n\\n[ALEX]\\n...",
  "chapters": [
    {
      "title": "Punchy topic label, 3 to 8 words, sentence case, no trailing punctuation",
      "startSegmentIndex": 0,
      "sourceHeading": "Heading or topic this chapter represents"
    }
  ],
  "coverageNotes": [
    {
      "sourceHeading": "Heading",
      "status": "covered | partial | risk",
      "notes": "Brief note about how this was covered or why it was condensed"
    }
  ]
}

Script format requirements:
- Speaker tags [ALEX], [JAMIE], [PAUSE] on their own lines.
- Blank line between turns.
- No spoken section labels.
- No phrase from the banned list.
- No stale fact.
- ASCII only. Straight apostrophes. Straight double quotes. Hyphens, not em-dashes or en-dashes. Three periods, not an ellipsis character. No curly typography of any kind.
- Match the voice exemplar's rhythm.

Chapter requirements:
- Produce 6 to 9 chapters. The first chapter MUST have startSegmentIndex 0.
- segmentIndex counts every [ALEX], [JAMIE], and [PAUSE] block in your script in order, starting at 0.
- Place each chapter at the FIRST spoken segment that opens its topic. Never anchor a chapter on a [PAUSE] segment.
- Titles 3 to 8 words. Sentence case. No trailing period. No question mark. No narrator filler.
- Titles must be specific enough that a listener could pick the right one to jump to that topic.

Quality self-check before finalizing (do this silently, do not include in output):
- Would this read like two real colleagues talking, or like a templated lecture?
- Did I say any banned phrase? If yes, rewrite.
- Did I assert any stale fact? If yes, replace with the current fact.
- Did either host monologue for more than ~6 sentences? If yes, break it up.
- Did I narrate the script's own structure? If yes, rewrite the transition.
- Are all my chapter titles 3 to 8 words and free of trailing punctuation? If not, rewrite.
- Is every character in my output ASCII (codepoint 0 to 127)? If not, replace it.
`;

  return `${preamble}

${slugContext}

# Markdown source

${sourceBody}

${outputContract}
`;
}

function extractJson(content) {
  const trimmed = String(content || '').trim();
  if (trimmed.startsWith('{')) return trimmed;
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced) return fenced[1].trim();
  return trimmed.slice(trimmed.indexOf('{'), trimmed.lastIndexOf('}') + 1);
}

function extractTranscriptFromContent(content) {
  const lines = String(content || '').replace(/\r/g, '').split('\n');
  const transcriptLines = [];
  let seenMarker = false;
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (seenMarker) transcriptLines.push('');
      continue;
    }
    if (/^\[(ALEX|JAMIE|PAUSE)]$/.test(trimmed)) {
      seenMarker = true;
      transcriptLines.push(trimmed);
      continue;
    }
    if (seenMarker) transcriptLines.push(trimmed);
  }
  const transcript = transcriptLines.join('\n').trim();
  if (!transcript || !transcript.includes('[ALEX]') || !transcript.includes('[JAMIE]')) {
    throw new Error('Model response did not include recoverable transcript markers.');
  }
  return transcript;
}

function parseModelResult(content) {
  try {
    const parsed = JSON.parse(extractJson(content));
    if (parsed && typeof parsed === 'object' && typeof parsed.script === 'string' && parsed.script.trim()) {
      return {
        script: parsed.script,
        chapters: Array.isArray(parsed.chapters) ? parsed.chapters : [],
        coverageNotes: Array.isArray(parsed.coverageNotes) ? parsed.coverageNotes : [],
        parseMode: 'json'
      };
    }
  } catch (error) {
    // Fallback to transcript extraction below.
  }

  const recoveredTranscript = extractTranscriptFromContent(content);
  return {
    script: recoveredTranscript,
    chapters: [],
    coverageNotes: [{
      sourceHeading: 'global',
      status: 'risk',
      notes: 'Recovered transcript from non-JSON model output.'
    }],
    parseMode: 'transcript-fallback'
  };
}

function makeFallbackResult() {
  return {
    script: [
      '[ALEX]',
      'I could not reliably parse the model response into the required script format.',
      '[JAMIE]',
      'Let us treat this as a failed candidate and rerun with tighter prompt controls.',
      '[PAUSE]'
    ].join('\n'),
    chapters: [],
    coverageNotes: [{
      sourceHeading: 'global',
      status: 'risk',
      notes: 'No valid JSON or transcript markers were recoverable from model output.'
    }],
    parseMode: 'unrecoverable-fallback'
  };
}

function parseSegments(script) {
  const segments = [];
  let currentSpeaker = null;
  let currentLines = [];

  function flush() {
    if (currentSpeaker && currentLines.length) {
      segments.push({ speaker: currentSpeaker, text: cleanText(currentLines.join(' ')) });
      currentLines = [];
    }
  }

  for (const [index, line] of String(script || '').replace(/\r/g, '').split('\n').entries()) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const marker = trimmed.match(/^\[(ALEX|JAMIE|PAUSE)]$/);
    if (marker) {
      flush();
      if (marker[1] === 'PAUSE') {
        segments.push({ speaker: 'PAUSE', text: '' });
        currentSpeaker = null;
      } else {
        currentSpeaker = marker[1];
      }
      continue;
    }

    if (!currentSpeaker) {
      throw new Error(`Text before speaker marker on line ${index + 1}: ${trimmed}`);
    }

    currentLines.push(trimmed);
  }

  flush();
  return segments;
}

function unresolvedCoverage(evaluation) {
  const unresolvedHeadings = [];
  for (const source of (evaluation.sourceCoverage || [])) {
    for (const heading of (source.headingCoverage || [])) {
      if (heading.status !== 'covered') {
        unresolvedHeadings.push(`${source.sourceLabel || 'source'}: ${heading.title}`);
      }
    }
  }
  const unresolvedConcepts = (evaluation.conceptCoverage || [])
    .filter(item => item.status !== 'covered')
    .map(item => item.concept);
  return {
    unresolvedHeadings: unresolvedHeadings.slice(0, 120),
    unresolvedConcepts: unresolvedConcepts.slice(0, 80)
  };
}

function strictFailureScore(evaluation) {
  const heading = evaluation.headingCoverageSummary || { partial: 0, missing: 0 };
  const concept = evaluation.conceptCoverageSummary || { partial: 0, missing: 0 };
  const dialogue = evaluation.dialogueBalance || { alexWordShare: 0, jamieWordShare: 0 };
  const gates = evaluation.gates || {};
  return (heading.missing * 1000)
    + (concept.missing * 1000)
    + (heading.partial * 50)
    + (concept.partial * 50)
    + (gates.stylePass ? 0 : 400)
    + (gates.repetitionPass ? 0 : 200)
    + (dialogue.alexWordShare > 0.68 ? 150 : 0)
    + (dialogue.jamieWordShare < 0.32 ? 150 : 0);
}

function mergeUsage(left, right) {
  if (!left && !right) return null;
  if (!left) return right;
  if (!right) return left;
  return {
    prompt_tokens: (left.prompt_tokens || 0) + (right.prompt_tokens || 0),
    completion_tokens: (left.completion_tokens || 0) + (right.completion_tokens || 0),
    total_tokens: (left.total_tokens || 0) + (right.total_tokens || 0),
    cost: (left.cost || 0) + (right.cost || 0),
    is_byok: Boolean(left.is_byok || right.is_byok)
  };
}

function needsRepair(evaluation) {
  const heading = evaluation.headingCoverageSummary || { partial: 0, missing: 0 };
  const concept = evaluation.conceptCoverageSummary || { partial: 0, missing: 0 };
  const dialogue = evaluation.dialogueBalance || { alexWordShare: 0, jamieWordShare: 0 };
  return heading.missing > 0
    || concept.missing > 0
    || heading.partial > 0
    || concept.partial > 0
    || dialogue.alexWordShare > 0.68
    || dialogue.jamieWordShare < 0.32
    || !(evaluation.gates && evaluation.gates.stylePass);
}

function buildRepairPrompt({ slug, previousScript, evaluation, attempt }) {
  const unresolved = unresolvedCoverage(evaluation);
  const unresolvedHeadings = unresolved.unresolvedHeadings.length
    ? unresolved.unresolvedHeadings.map(item => `- ${item}`).join('\n')
    : '- none';
  const unresolvedConcepts = unresolved.unresolvedConcepts.length
    ? unresolved.unresolvedConcepts.map(item => `- ${item}`).join('\n')
    : '- none';
  const dialogue = evaluation.dialogueBalance || { alexWordShare: 0, jamieWordShare: 0, maxConsecutiveTurns: 0 };
  const stricterStyle = attempt > 1
    ? '- Enforce strict alternation rhythm: at least one JAMIE turn after every one or two ALEX turns.\n- Ensure JAMIE asks clarification/probing questions in every major concept block.'
    : '- Keep turn cadence tight; avoid long ALEX monologues.';
  return `You are repairing a podcast transcript candidate that failed quality gates.

Return JSON only:
{
  "script": "[ALEX]\\n...\\n",
  "chapters": [],
  "coverageNotes": []
}

Hard requirements:
- Allowed markers only: [ALEX], [JAMIE], [PAUSE] on their own lines.
- Cover all unresolved headings and concepts listed below.
- Keep Alex and Jamie dialogue balanced. Target range: Alex 55-63% of spoken words; Jamie 37-45%.
- Explicitly fix previously partial headings by naturally including the missing heading keywords in the dialogue.
- Keep conversational teaching quality high.
- Do not add markdown, bullets, headings, or code fences to the script.
${stricterStyle}

Slug: ${slug}
Repair attempt: ${attempt}
Current dialogue balance:
- Alex share: ${Number((dialogue.alexWordShare || 0) * 100).toFixed(1)}%
- Jamie share: ${Number((dialogue.jamieWordShare || 0) * 100).toFixed(1)}%
- Max consecutive turns: ${dialogue.maxConsecutiveTurns || 0}

Unresolved headings:
${unresolvedHeadings}

Unresolved concepts:
${unresolvedConcepts}

Previous candidate transcript:
${previousScript}
`;
}

async function callOpenAI(args, prompt) {
  if (!args.apiKey) {
    throw new Error('OPENROUTER_API_KEY or OPENAI_API_KEY is required unless --dry-run is used.');
  }

  const controller = new AbortController();
  const timeoutHandle = setTimeout(() => controller.abort(), args.requestTimeoutMs);
  const requestHeaders = {
    Authorization: `Bearer ${args.apiKey}`,
    'Content-Type': 'application/json'
  };
  const provider = String(args.provider || '').toLowerCase();
  const baseUrlLower = String(args.baseUrl || '').toLowerCase();
  if (provider === 'openrouter' || baseUrlLower.includes('openrouter.ai')) {
    requestHeaders['HTTP-Referer'] = process.env.OPENROUTER_SITE_URL || 'https://github.com/Community-Access/git-going-with-github';
    requestHeaders['X-Title'] = process.env.OPENROUTER_APP_TITLE || 'git-going-with-github-podcast-review';
  }

  const response = await fetch(`${args.baseUrl.replace(/\/$/, '')}/chat/completions`, {
    method: 'POST',
    headers: requestHeaders,
    signal: controller.signal,
    body: JSON.stringify({
      model: args.model,
      temperature: args.temperature,
      max_tokens: args.maxTokens,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: 'You are an expert instructional podcast writer. Return JSON only.'
        },
        {
          role: 'user',
          content: prompt
        }
      ]
    })
  });
  clearTimeout(timeoutHandle);

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`OpenAI request failed: ${response.status} ${response.statusText}\n${detail}`);
  }

  const payload = await response.json();
  const content = payload.choices?.[0]?.message?.content || '';
  let result = null;
  try {
    result = parseModelResult(content);
  } catch (error) {
    result = makeFallbackResult();
  }
  return {
    result,
    usage: payload.usage || null,
    rawContent: content
  };
}

function resolveInput(args) {
  if (args.packet) {
    const packetData = readPacket(args.packet);
    const sourceTexts = packetData.sourceFiles.filter(source => source.exists).map(source => ({
      label: source.sourceLabel,
      path: source.sourcePath,
      content: source.content
    }));
    if (!sourceTexts.length) {
      throw new Error(`No readable source files found in packet: ${packetData.packetPath}`);
    }
    return {
      sourceTexts,
      sourceEntries: packetData.sourceFiles,
      sourceLabels: sourceTexts.map(source => source.label),
      concepts: [...new Set([...(packetData.concepts || []), ...args.concepts])],
      packetPath: packetData.packetPath,
      kind: packetData.kind,
      title: packetData.title,
      description: packetData.description,
      companions: packetData.companions,
      voiceRules: packetData.voiceRules
    };
  }

  if (!args.source.length) {
    throw new Error('Provide at least one --source path or use --packet <packet.json>.');
  }
  const sourceEntries = args.source.map(sourcePath => {
    const absolute = absolutePath(sourcePath);
    return {
      sourcePath: absolute,
      sourceLabel: path.basename(absolute),
      exists: fs.existsSync(absolute),
      content: readRequired(absolute),
      concepts: []
    };
  });
  return {
    sourceTexts: sourceEntries.map(source => ({
      label: source.sourceLabel,
      path: source.sourcePath,
      content: source.content
    })),
    sourceEntries,
    sourceLabels: sourceEntries.map(source => source.sourceLabel),
    concepts: [...args.concepts],
    packetPath: null,
    kind: null,
    title: '',
    description: '',
    companions: null,
    voiceRules: null
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.slug || (!args.packet && !args.source.length)) {
    console.error(usage());
    process.exit(1);
  }
  if (!Number.isFinite(args.temperature)) throw new Error('temperature must be numeric');
  if (!Number.isFinite(args.maxTokens) || args.maxTokens <= 0) throw new Error('max-tokens must be a positive integer');
  if (!Number.isInteger(args.maxRepairAttempts) || args.maxRepairAttempts < 0) throw new Error('max-repair-attempts must be a non-negative integer');

  const input = resolveInput(args);
  const prompt = buildPrompt({
    slug: args.slug,
    sourceTexts: input.sourceTexts,
    sourceLabels: input.sourceLabels,
    kind: input.kind,
    title: input.title,
    description: input.description,
    concepts: input.concepts,
    companions: input.companions,
    voiceRules: input.voiceRules
  });

  const outDir = path.join(ROOT, 'podcasts', 'llm-podcast-generator-review', 'generated');
  fs.mkdirSync(outDir, { recursive: true });

  const promptPath = args.promptOut
    ? path.resolve(ROOT, args.promptOut)
    : path.join(outDir, `${args.slug}.prompt.md`);
  fs.mkdirSync(path.dirname(promptPath), { recursive: true });
  fs.writeFileSync(promptPath, prompt, 'utf8');

  if (args.dryRun) {
    console.log(`Wrote prompt only: ${promptPath}`);
    return;
  }

  const response = await callOpenAI(args, prompt);
  let result = response.result;
  let segments = parseSegments(result.script);
  let evaluation = evaluateTranscript({
    transcriptPath: `${args.slug}.candidate`,
    transcript: result.script,
    sources: input.sourceEntries,
    concepts: input.concepts
  });
  let responseUsage = response.usage || null;
  const rawResponses = [{
    attempt: 0,
    mode: 'initial',
    content: response.rawContent || ''
  }];
  let repairAttempted = false;
  let repairSucceeded = false;
  let repairPasses = 0;

  if (needsRepair(evaluation)) {
    repairAttempted = true;
    let bestCandidate = {
      result,
      segments,
      evaluation,
      score: strictFailureScore(evaluation)
    };
    let seedScript = result.script;
    let seedEvaluation = evaluation;
    const startingScore = bestCandidate.score;

    for (let attempt = 1; attempt <= args.maxRepairAttempts; attempt += 1) {
      const repairPrompt = buildRepairPrompt({
        slug: args.slug,
        previousScript: seedScript,
        evaluation: seedEvaluation,
        attempt
      });
      const repaired = await callOpenAI(args, repairPrompt);
      responseUsage = mergeUsage(responseUsage, repaired.usage || null);
      rawResponses.push({
        attempt,
        mode: 'repair',
        content: repaired.rawContent || ''
      });

      const repairedResult = repaired.result;
      const repairedSegments = parseSegments(repairedResult.script);
      const repairedEvaluation = evaluateTranscript({
        transcriptPath: `${args.slug}.candidate.repair.${attempt}`,
        transcript: repairedResult.script,
        sources: input.sourceEntries,
        concepts: input.concepts
      });
      const repairedScore = strictFailureScore(repairedEvaluation);
      repairPasses = attempt;

      if (repairedScore < bestCandidate.score) {
        bestCandidate = {
          result: repairedResult,
          segments: repairedSegments,
          evaluation: repairedEvaluation,
          score: repairedScore
        };
      }

      seedScript = repairedResult.script;
      seedEvaluation = repairedEvaluation;
      if (bestCandidate.score === 0) break;
    }

    if (bestCandidate.score < startingScore) {
      result = bestCandidate.result;
      segments = bestCandidate.segments;
      evaluation = bestCandidate.evaluation;
      repairSucceeded = true;
    }
  }

  const output = {
    generatedAt: new Date().toISOString(),
    slug: args.slug,
    model: args.model,
    provider: args.provider,
    baseUrl: args.baseUrl,
    packet: input.packetPath,
    sources: input.sourceEntries.map(source => source.sourcePath),
    concepts: input.concepts,
    script: result.script,
    segments,
    chapters: result.chapters || [],
    coverageNotes: result.coverageNotes || [],
    parseMode: result.parseMode,
    evaluation,
    repairAttempted,
    repairSucceeded,
    repairPasses,
    usage: responseUsage
  };

  const outPath = args.out
    ? path.resolve(ROOT, args.out)
    : path.join(outDir, `${args.slug}.candidate.json`);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });

  fs.writeFileSync(outPath, JSON.stringify(output, null, 2) + '\n', 'utf8');
  const scriptOutPath = outPath.replace(/\.json$/i, '.txt');
  fs.writeFileSync(scriptOutPath, `${result.script.trim()}\n`, 'utf8');
  const rawOutPath = outPath.replace(/\.json$/i, '.raw-response.txt');
  const rawContent = rawResponses.map(item => {
    const header = `===== ${item.mode.toUpperCase()} ATTEMPT ${item.attempt} =====`;
    return `${header}\n${item.content || ''}`.trim();
  }).join('\n\n');
  fs.writeFileSync(rawOutPath, `${rawContent}\n`, 'utf8');
  console.log(`Wrote candidate: ${outPath}`);
  console.log(`Wrote transcript: ${scriptOutPath}`);
  console.log(`Wrote raw response: ${rawOutPath}`);
  console.log(`Quality gate: ${evaluation.gates.pass ? 'pass' : 'fail'}`);
}

if (require.main === module) {
  main().catch(error => {
    console.error(error.stack || error.message);
    process.exit(1);
  });
}

module.exports = {
  parseArgs,
  readPacket,
  collectHeadings,
  compactSourceContent,
  buildPrompt,
  parseModelResult,
  parseSegments,
  unresolvedCoverage,
  needsRepair,
  buildRepairPrompt,
  strictFailureScore,
  mergeUsage,
  callOpenAI,
  resolveInput,
  main
};
