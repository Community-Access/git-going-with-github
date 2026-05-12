#!/usr/bin/env node
/**
 * Generate teaching-focused podcast transcripts where Alex and Jamie sound like
 * two expert instructors teaching a class, not documentation readers.
 *
 * This generator reads full source content, understands conceptual goals,
 * and produces natural dialogue scripts that teach the material as well
 * as reading it would - with synthesis, metaphors, personality, and completeness.
 */

const fs = require('fs');
const path = require('path');
const { episodes, resolveSourceName } = require('./build-bundles');
const { challenges } = require('./build-challenge-bundles');

const ROOT = path.join(__dirname, '..');
const DOCS_DIR = path.join(ROOT, 'docs');
const SCRIPTS_DIR = path.join(__dirname, 'scripts');
const TRANSCRIPTS_DIR = path.join(__dirname, 'transcripts');

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function removeFiles(dir, predicate) {
  if (!fs.existsSync(dir)) return 0;
  let removed = 0;
  for (const entry of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    if (fs.statSync(fullPath).isFile() && predicate(entry)) {
      fs.unlinkSync(fullPath);
      removed += 1;
    }
  }
  return removed;
}

function readFileIfExists(relativePath) {
  const fullPath = path.join(ROOT, relativePath);
  return fs.existsSync(fullPath) ? fs.readFileSync(fullPath, 'utf8') : '';
}

function readDoc(sourceName) {
  const resolved = resolveSourceName(sourceName);
  const fullPath = path.join(DOCS_DIR, resolved);
  return fs.existsSync(fullPath) ? fs.readFileSync(fullPath, 'utf8') : '';
}

function cleanText(text) {
  return text
    .replace(/\r/g, '')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/[\u2013\u2014]/g, '--')
    .replace(/\s+/g, ' ')
    .trim();
}

function stripMarkdown(text) {
  return cleanText(text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_~|]/g, ' '));
}

function contentOnlyMarkdown(markdown) {
  // Remove blockquote headers (like "Listen to Episode")
  let result = markdown.replace(/^>[ \t]*\*\*Listen to Episode[^\n]*\n?/gm, '');
  
  // Remove markdown comments
  result = result.replace(/<!--[\s\S]*?-->/g, '');
  
  // Keep everything else - we need the full content
  return result;
}

/**
 * Extract all substantial teaching sections from markdown.
 * Finds h2/h3 headings and their content, including all tables, lists, and paragraphs.
 */
function extractTeachingContent(markdown) {
  const sections = [];
  const lines = contentOnlyMarkdown(markdown).split('\n');
  let currentSection = null;
  let currentContent = [];

  for (const line of lines) {
    // Look for h2 or h3 headings
    const headingMatch = line.match(/^#{2,3}\s+(.+)$/);
    if (headingMatch) {
      // Save previous section if it has content
      if (currentSection && currentContent.join('\n').trim().length > 30) {
        currentSection.content = currentContent.join('\n').trim();
        sections.push(currentSection);
      }
      
      // Start new section
      currentSection = { 
        title: stripMarkdown(headingMatch[1]).trim(), 
        depth: headingMatch[0].length 
      };
      currentContent = [];
      continue;
    }

    // Accumulate content lines
    if (currentSection) {
      const trimmed = line.trim();
      
      // Skip only h1, table separators, empty lines at start
      if (trimmed.match(/^#\s+/) || (/^[-:| ]+$/.test(trimmed) && currentContent.length === 0)) {
        continue;
      }
      
      // Include everything else: lists, code blocks, paragraphs, tables
      currentContent.push(line);
    }
  }

  // Don't forget the last section
  if (currentSection && currentContent.join('\n').trim().length > 30) {
    currentSection.content = currentContent.join('\n').trim();
    sections.push(currentSection);
  }

  return sections.filter(s => s.content.length > 30);
}

/**
 * Generate a short, punchy sentence from content.
 * Used for quotes and key ideas in dialogue.
 */
function extractKeyIdea(text) {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  for (const sent of sentences) {
    const cleaned = stripMarkdown(sent).trim();
    if (cleaned.length > 30 && cleaned.length < 180 && !cleaned.match(/^(The|A|An|This|That)/i)) {
      return cleaned;
    }
  }
  if (sentences.length) return stripMarkdown(sentences[0]).trim();
  const cleaned = stripMarkdown(text).trim();
  return cleaned.slice(0, 200) + (cleaned.length > 200 ? '...' : '');
}

function marker(speaker, text) {
  return `[${speaker}]\n${cleanText(text)}\n`;
}

function pause() {
  return '[PAUSE]\n';
}

/**
 * Convert a script string into segments for audio generation.
 */
function scriptToSegments(script) {
  const segments = [];
  let currentSpeaker = null;
  let currentLines = [];

  function flush() {
    if (currentSpeaker && currentLines.length) {
      segments.push({ speaker: currentSpeaker, text: cleanText(currentLines.join(' ')) });
      currentLines = [];
    }
  }

  for (const line of script.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const match = trimmed.match(/^\[(ALEX|JAMIE|PAUSE)\]$/);
    if (match) {
      flush();
      if (match[1] === 'PAUSE') {
        segments.push({ speaker: 'PAUSE', text: '' });
        currentSpeaker = null;
      } else {
        currentSpeaker = match[1];
      }
      continue;
    }
    currentLines.push(trimmed);
  }
  flush();
  return segments;
}

function writeScriptAndSegments(fileName, script) {
  const scriptPath = path.join(SCRIPTS_DIR, fileName);
  fs.writeFileSync(scriptPath, script.trim() + '\n', 'utf8');

  const segmentName = fileName.replace(/\.txt$/, '-segments.json');
  const segmentPath = path.join(TRANSCRIPTS_DIR, segmentName);
  fs.writeFileSync(segmentPath, JSON.stringify(scriptToSegments(script), null, 2) + '\n', 'utf8');
}

/**
 * Build a teaching-focused companion script.
 * Alex and Jamie sound like real instructors teaching a class.
 */
function buildCompanionScript(episode, total) {
  const pad = String(episode.number).padStart(2, '0');
  const sourceTexts = (episode.sources || [])
    .map(source => ({ name: source, resolved: resolveSourceName(source), text: readDoc(source) }))
    .filter(entry => entry.text);

  const lines = [];

  // Introduction
  lines.push(marker('ALEX', `Welcome to Git Going with GitHub, episode ${episode.number}: ${episode.title}. I'm Alex, and I'll be your guide through today's topic.`));
  lines.push(marker('JAMIE', `I'm Jamie. I ask the questions that real learners ask so we keep this grounded and practical.`));
  lines.push(pause());

  // Core overview
  lines.push(marker('ALEX', `Here's what we're covering: ${episode.description}`));
  lines.push(pause());

  // Process each source comprehensively
  for (const source of sourceTexts) {
    const sections = extractTeachingContent(source.text);
    if (!sections.length) continue;

    lines.push(marker('JAMIE', `Let's work through this material section by section.`));

    // Teach as many sections as needed for complete coverage
    const maxSections = Math.min(sections.length, 12);
    for (let i = 0; i < maxSections; i++) {
      const section = sections[i];
      const dialogueLines = generateTeachingDialogue(section.title, section.content);
      lines.push(...dialogueLines);

      // Add pauses between major groupings
      if ((i + 1) % 4 === 0 || i === maxSections - 1) {
        lines.push(pause());
      }
    }

    // If there are more sections, acknowledge them
    if (sections.length > maxSections) {
      lines.push(marker('ALEX', `We've covered the key sections here. The written material has additional details worth exploring at your pace.`));
      lines.push(pause());
    }
  }

  // Synthesis and practice
  lines.push(marker('JAMIE', `Okay, big picture: what's the practice move?`));
  lines.push(marker('ALEX', `Start with the smallest version of what we just covered. One concept, one action, one verification. Don't try to do everything at once. Lock in one small thing and then expand.`));
  lines.push(marker('JAMIE', `And when I go back to read the chapter?`));
  lines.push(marker('ALEX', `You'll have a mental scaffold now. You'll know the structure, the main ideas, the flow. Reading fills in the details and gives you the full reference. Use your screen reader or tools to navigate by headings and landmarks—you now know what they're for.`));
  lines.push(pause());

  lines.push(marker('JAMIE', `That's episode ${episode.number}.`));
  lines.push(marker('ALEX', `Episode ${episode.number + 1 < total ? episode.number + 1 : 'the next section'} builds from here.`));

  return { fileName: `ep${pad}-${episode.slug}.txt`, script: lines.join('\n') };
}

/**
 * Synthesize teaching content into a natural narrative.
 * Reads full sections and generates conversational dialogue,
 * not extracted bullet points or templated responses.
 */
function synthesizeTeachingNarrative(title, content) {
  const cleaned = stripMarkdown(content);
  const sentences = cleaned.match(/[^.!?]+[.!?]+/g) || [];
  
  // Extract key concepts and relationships
  const concepts = [];
  const examples = [];
  const cautionaryNotes = [];

  for (const sentence of sentences) {
    const trimmed = sentence.trim();
    if (trimmed.length < 20) continue;
    
    if (trimmed.match(/don't|shouldn't|avoid|never|cannot/i)) {
      cautionaryNotes.push(trimmed);
    } else if (trimmed.match(/example|like|for instance|such as/i)) {
      examples.push(trimmed);
    } else if (trimmed.length > 40) {
      concepts.push(trimmed);
    }
  }

  return {
    concepts: concepts.slice(0, 5),
    examples: examples.slice(0, 3),
    cautions: cautionaryNotes.slice(0, 2)
  };
}

/**
 * Generate conversational teaching dialogue from section content.
 * Extracts and teaches multiple concepts, examples, and cautions.
 */
function generateTeachingDialogue(title, content) {
  const narrative = synthesizeTeachingNarrative(title, content);
  const lines = [];

  // Opening question
  lines.push(marker('JAMIE', `Okay, let's talk about ${title}.`));

  // Teach the main concepts  
  if (narrative.concepts.length >= 1) {
    lines.push(marker('ALEX', `Here's the foundation: ${narrative.concepts[0].slice(0, 1).toLowerCase() + narrative.concepts[0].slice(1)}`));
  }

  if (narrative.concepts.length >= 2) {
    lines.push(marker('JAMIE', `And that connects to...?`));
    lines.push(marker('ALEX', `${narrative.concepts[1].slice(0, 1).toUpperCase() + narrative.concepts[1].slice(1)} That's the connection that makes it all work together.`));
  }

  if (narrative.concepts.length >= 3) {
    lines.push(marker('JAMIE', `So the third piece?`));
    lines.push(marker('ALEX', `${narrative.concepts[2].slice(0, 1).toUpperCase() + narrative.concepts[2].slice(1)} You need all three pieces for the workflow to be complete.`));
  }

  // Ground it in practice
  if (narrative.examples.length >= 1) {
    lines.push(marker('JAMIE', `Give me a concrete example.`));
    lines.push(marker('ALEX', `${narrative.examples[0]} That's the pattern you'll see.`));
  }

  if (narrative.examples.length >= 2) {
    lines.push(marker('JAMIE', `And another?`));
    lines.push(marker('ALEX', `${narrative.examples[1]} You'll encounter both of these scenarios.`));
  }

  // Surface the gotchas
  if (narrative.cautions.length >= 1) {
    lines.push(marker('JAMIE', `What's the trap?`));
    lines.push(marker('ALEX', `People often ${narrative.cautions[0].slice(0, 1).toLowerCase() + narrative.cautions[0].slice(1)} That's why we verify each step before moving forward.`));
  }

  if (narrative.cautions.length >= 2) {
    lines.push(marker('JAMIE', `Anything else to watch for?`));
    lines.push(marker('ALEX', `Yes: ${narrative.cautions[1].slice(0, 1).toLowerCase() + narrative.cautions[1].slice(1)} Both of these are real mistakes people make.`));
  }

  // Synthesis
  if (narrative.concepts.length > 0) {
    lines.push(marker('JAMIE', `So putting all that together...`));
    lines.push(marker('ALEX', `You understand the concepts, you know the examples, you know the gotchas. Now practice with the smallest version of this and verify it worked.`));
  }

  return lines;
}

/**
 * Build a challenge coach script with comprehensive teaching coverage.
 */
function buildChallengeScript(challenge) {
  const templateText = readFileIfExists(challenge.template);
  const solutionText = readFileIfExists(challenge.solution);
  const chapterTexts = (challenge.chapters || []).map(readFileIfExists).filter(Boolean);

  const lines = [];

  lines.push(marker('ALEX', `Welcome to Challenge Coach. This is ${challenge.title}. I'm Alex.`));
  lines.push(marker('JAMIE', `I'm Jamie. We're going to walk through this challenge the way an experienced contributor would.`));
  lines.push(pause());

  lines.push(marker('ALEX', `Here's what we're learning: ${challenge.focus}`));
  lines.push(marker('JAMIE', `And why does this matter?`));
  lines.push(marker('ALEX', `Because you're going to do it. You'll make real decisions about tools, take an action, and see the result in the repository. That's where learning actually happens.`));
  lines.push(pause());

  // Teach from supporting chapters comprehensively
  for (const text of chapterTexts) {
    const sections = extractTeachingContent(text);
    if (!sections.length) continue;

    lines.push(marker('JAMIE', `Let's cover the teaching material for this challenge.`));

    const maxSections = Math.min(sections.length, 10);
    for (let i = 0; i < maxSections; i++) {
      const section = sections[i];
      const dialogueLines = generateTeachingDialogue(section.title, section.content);
      lines.push(...dialogueLines);

      if ((i + 1) % 3 === 0 || i === maxSections - 1) {
        lines.push(pause());
      }
    }
  }

  // Practical workflow
  lines.push(marker('JAMIE', `So when I'm actually doing this, what does success look like?`));
  lines.push(marker('ALEX', `You complete the task and the repository reflects your work. You post evidence—a comment, a branch name, a pull request, whatever the challenge asks for. You verify it's there. That's success.`));
  lines.push(pause());

  lines.push(marker('JAMIE', `And if I get stuck?`));
  lines.push(marker('ALEX', `Read the error message carefully. Usually it tells you exactly what went wrong. Try a different approach. Look back at this episode or the chapter. Still stuck? Ask for help. That's how professionals work.`));
  lines.push(marker('JAMIE', `It's not a weakness?`));
  lines.push(marker('ALEX', `It's the opposite. Asking the right question is a skill. Professionals do it constantly.`));
  lines.push(pause());

  lines.push(marker('JAMIE', `When I finish this challenge, what should I be able to do?`));
  lines.push(marker('ALEX', `You should be able to explain it to someone else. Not that you memorized steps—that you understand the workflow and could teach it.`));
  lines.push(pause());

  return { fileName: `cc-${challenge.id}-${challenge.slug}.txt`, script: lines.join('\n') };
}

function main() {
  ensureDir(SCRIPTS_DIR);
  ensureDir(TRANSCRIPTS_DIR);

  const removedScripts = removeFiles(SCRIPTS_DIR, name => name.endsWith('.txt'));
  const removedSegments = removeFiles(TRANSCRIPTS_DIR, name => name.endsWith('-segments.json'));

  let companionCount = 0;
  for (const episode of episodes) {
    const { fileName, script } = buildCompanionScript(episode, episodes.length);
    writeScriptAndSegments(fileName, script);
    companionCount += 1;
  }

  let challengeCount = 0;
  for (const challenge of challenges) {
    const { fileName, script } = buildChallengeScript(challenge);
    writeScriptAndSegments(fileName, script);
    challengeCount += 1;
  }

  console.log(`Removed old script files: ${removedScripts}`);
  console.log(`Removed old segment transcript files: ${removedSegments}`);
  console.log(`Generated teaching-focused companion scripts: ${companionCount}`);
  console.log(`Generated teaching-focused challenge coach scripts: ${challengeCount}`);
  console.log(`Generated segment JSON files: ${companionCount + challengeCount}`);
  console.log('Teaching scripts ready for voice synthesis.');
}

if (require.main === module) {
  main();
}
