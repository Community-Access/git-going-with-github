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
    return {
      sourcePath,
      sourceLabel: path.basename(sourcePath),
      exists,
      concepts: [],
      content: exists ? fs.readFileSync(sourcePath, 'utf8') : ''
    };
  });
  const concepts = [...new Set([...(packet.concepts || []), ...[]])].filter(Boolean);
  return {
    packetPath: absolute,
    packet,
    sourceFiles,
    concepts
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

function buildPrompt({ slug, sourceTexts, sourceLabels }) {
  const allHeadings = sourceTexts.flatMap(source => collectHeadings(source.content).map(item => ({
    sourceLabel: source.label,
    level: item.level,
    title: item.title
  })));
  const headings = allHeadings
    .map(item => `${'#'.repeat(item.level)} [${item.sourceLabel}] ${item.title}`)
    .join('\n');
  const sourceBody = sourceTexts.map(source => `## Source: ${source.label}\n\n\`\`\`markdown\n${compactSourceContent(source.content)}\n\`\`\``).join('\n\n');

  return `You are writing a Git Going with GitHub podcast script.

Audience:
Blind and low-vision learners studying GitHub, Git, VS Code, open source, and accessible contribution workflows.

Hosts:
- Alex: warm expert professor
- Jamie: curious professor who asks the questions learners may hesitate to ask

Goal:
Create a complete, conversational, two-host audio lesson. Teach every substantive concept from the Markdown source. Do not merely summarize. Do not omit administrative or accessibility content. Use varied phrasing and make it feel like a thoughtful NotebookLM-style teaching conversation.

Scale rules:
- The source set may be large. Prioritize complete conceptual coverage over quoting every line.
- Use concise turns and avoid unnecessary verbosity.

Required script markers:
Use only these markers on their own lines:
[ALEX]
[JAMIE]
[PAUSE]

Narration constraints:
- Do not say chapter titles, section names, or "chapter marker" language out loud.
- Keep transitions natural so chapter separation can be handled in metadata, not spoken labels.

Return JSON only:
{
  "script": "[ALEX]\\n...\\n",
  "chapters": [
    {
      "title": "Specific chapter title",
      "startSegmentIndex": 0,
      "sourceHeading": "Heading represented"
    }
  ],
  "coverageNotes": [
    {
      "sourceHeading": "Heading",
      "status": "covered | partial | risk",
      "notes": "Brief note"
    }
  ]
}

Slug: ${slug}
Sources:
${sourceLabels.map(label => `- ${label}`).join('\n')}

Headings that must be represented:
${headings || '(No headings detected.)'}

Markdown source:
${sourceBody}
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
      packetPath: packetData.packetPath
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
    packetPath: null
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
    sourceLabels: input.sourceLabels
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
