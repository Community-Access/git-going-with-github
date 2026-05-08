#!/usr/bin/env node
/**
 * Generate professional teaching-quality podcast transcripts.
 * 
 * Alex and Jamie are two expert instructors teaching a class of learners.
 * They read full source material, understand its core concepts, and generate
 * natural, conversational instruction dialogue that teaches the material
 * as well as reading it would - with synthesis, metaphors, practice moves,
 * and engagement.
 * 
 * Each episode produces 15-25 minutes of audio (~2000-3000 words of dialogue).
 */

const fs = require('fs');
const path = require('path');
const { episodes, resolveSourceName } = require('./build-bundles');
const { challenges } = require('./build-challenge-bundles');

const ROOT = path.join(__dirname, '..');
const DOCS_DIR = path.join(ROOT, 'docs');
const SCRIPTS_DIR = path.join(__dirname, 'scripts');
const TRANSCRIPTS_DIR = path.join(__dirname, 'transcripts');
const SCRIPT_GROUP_DIRS = ['chapters', 'challenges', 'appendices'];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function removeFiles(dir, predicate) {
  if (!fs.existsSync(dir)) return 0;
  let removed = 0;
  for (const entry of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      removed += removeFiles(fullPath, predicate);
      continue;
    }
    if (stat.isFile() && predicate(entry)) {
      fs.unlinkSync(fullPath);
      removed += 1;
    }
  }
  return removed;
}

function scriptGroupForCompanion(episode) {
  const firstSource = (episode.sources && episode.sources[0]) || '';
  return /^appendix-/i.test(firstSource) ? 'appendices' : 'chapters';
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
    .replace(/\bpress\s+\.\s+on/gi, 'press the period key on')
    .replace(/:\./g, '.')
    .replace(/([.!?])\.+/g, '$1')
    .replace(/\s+([.,;:!?])/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

function stripMarkdown(text) {
  return cleanText(text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/<workshop-org>/gi, 'the workshop organization')
    .replace(/<your-username>/gi, 'your username')
    .replace(/<random-id>/gi, 'the assignment code')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_~|]/g, ' '));
}

function cleanedTitle(title) {
  return stripMarkdown(title)
    .replace(/^chapter\s+\d+\s*[:.-]\s*/i, '')
    .replace(/^appendix\s+[a-z]\s*[:.-]\s*/i, '')
    .replace(/^part\s+\d+\s*[:.-]\s*/i, '')
    .trim();
}

function marker(speaker, text) {
  return `[${speaker}]\n${cleanText(text)}\n`;
}

function pause() {
  return '[PAUSE]\n';
}

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

function writeScriptAndSegments(fileName, script, group) {
  qualityCheckScript(fileName, script);

  const scriptDir = path.join(SCRIPTS_DIR, group);
  const transcriptDir = path.join(TRANSCRIPTS_DIR, group);
  ensureDir(scriptDir);
  ensureDir(transcriptDir);

  const scriptPath = path.join(scriptDir, fileName);
  fs.writeFileSync(scriptPath, script.trim() + '\n', 'utf8');

  const segmentName = fileName.replace(/\.txt$/, '-segments.json');
  const segmentPath = path.join(transcriptDir, segmentName);
  fs.writeFileSync(segmentPath, JSON.stringify(scriptToSegments(script), null, 2) + '\n', 'utf8');
}

function splitSentences(text) {
  return stripMarkdown(text)
    .split(/(?<=[.!?])\s+/)
    .map(item => item.trim())
    .filter(item => item.length >= 35 && item.length <= 340);
}

function compactPoint(text, maxLength = 260) {
  const cleaned = stripMarkdown(text)
    .replace(/^[-*]\s+/, '')
    .replace(/^\d+\.\s+/, '')
    .replace(/^(Goal|Where you are working|Agentic strategy|Branch guidance for [^:]+|How completion works|Screen reader note|Screen reader tip|Workshop tip|Tip|Note|Important):\s*/i, '')
    .replace(/^Challenge count:\s*/i, 'There are ')
    .replace(/^Time per challenge:\s*/i, 'Each challenge should take ')
    .replace(/^Evidence:\s*/i, 'The evidence is ')
    .replace(/^Pattern:\s*/i, 'The pattern is ')
    .replace(/\s+/g, ' ')
    .trim();

  if (/^(type|id|attributes|validations|required|label|description|placeholder|value|options|body|name|title|chapters?):\s*/i.test(cleaned)) return '';
  if (!cleaned || cleaned.length < 8) return '';
  if (cleaned.length <= maxLength) return cleaned;
  const boundary = cleaned.lastIndexOf(' ', maxLength);
  return `${cleaned.slice(0, boundary > 80 ? boundary : maxLength).trim()}.`;
}

function isTableHeaderRow(cells) {
  const normalized = cells.map(cell => cell.toLowerCase());
  const joined = normalized.join(' ');
  const headerTerms = new Set([
    '#',
    'appendix',
    'aspect',
    'chapter',
    'document',
    'feature',
    'resource',
    'time',
    'what it covers',
    'what it is',
    'what you will learn',
    'when to use it'
  ]);

  if (normalized.every(cell => headerTerms.has(cell))) return true;
  return /^(# )?chapter what you will learn time$/.test(joined)
    || /^appendix document what it covers$/.test(joined)
    || /^resource what it is when to use it$/.test(joined)
    || /^exercise what you do$/.test(joined)
    || /^aspect github/.test(joined);
}

function isCatalogueSection(section) {
  const title = section.title.toLowerCase();
  const mostlyTable = section.tableRows.length >= 3
    && section.paragraphs.length <= 1
    && section.steps.length === 0
    && section.codeBlocks.length === 0;

  if (!mostlyTable) return false;
  return /^(always open|core reference|git deep dive|vs code and copilot|github platform|community and continuing|appendices|day 1:|day 2:|exercises at a glance|getting help|summary)/.test(title);
}

function shouldUseTableRows(section) {
  const title = section.title.toLowerCase();
  if (/^(always open|core reference|git deep dive|vs code and copilot|github platform|community and continuing|appendices|day 1:|day 2:|exercises at a glance|getting help|summary)/.test(title)) {
    return false;
  }
  return /\b(compare|comparison|differences|options|choose|choice|tool cards|when to use|which)\b/.test(title);
}

function isCommandLikeBlock(block) {
  const lineCount = block.split('\n').filter(line => line.trim()).length;
  const hasShellCommand = /^\s*(git|gh|npm|node|python|pwsh|powershell|ssh|curl|cd|mkdir|code|az)\b/im.test(block);
  if (lineCount >= 3 && /[→↓←↑]/.test(block) && !hasShellCommand) return false;
  if (hasShellCommand) return true;
  if (/\b(ctrl|cmd|command|shift|enter|tab|escape|nvda|jaws|voiceover)\b/i.test(block)) return true;
  return false;
}

function hasTeachableContent(section) {
  return section.paragraphs.length > 0
    || section.bullets.length > 0
    || section.steps.length > 0
    || section.codeBlocks.some(isCommandLikeBlock)
    || (shouldUseTableRows(section) && section.tableRows.length > 0);
}

function isNoiseHeading(title) {
  return /^(table of contents|listen to episode|related appendices|authoritative sources)$/i.test(title.trim());
}

function createEmptySection(title, level) {
  return {
    title,
    level,
    paragraphs: [],
    bullets: [],
    steps: [],
    tableRows: [],
    codeBlocks: []
  };
}

function extractTeachingSections(markdown) {
  const sections = [];
  const lines = markdown.replace(/\r/g, '').replace(/<!--[\s\S]*?-->/g, '').split('\n');
  let section = null;
  let paragraph = [];
  let code = [];
  let inCode = false;

  function flushParagraph() {
    const text = paragraph.join(' ').trim();
    paragraph = [];
    if (!section || !text) return;
    for (const sentence of splitSentences(text)) {
      section.paragraphs.push(sentence);
    }
  }

  function flushSection() {
    flushParagraph();
    if (!section || isNoiseHeading(section.title)) return;
    const pointCount = section.paragraphs.length + section.bullets.length + section.steps.length + section.tableRows.length + section.codeBlocks.length;
    if (pointCount > 0) sections.push(section);
  }

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    const trimmed = line.trim();

    if (trimmed.startsWith('```')) {
      if (inCode) {
        if (section && code.length) section.codeBlocks.push(code.join('\n'));
        code = [];
        inCode = false;
      } else {
        flushParagraph();
        inCode = true;
      }
      continue;
    }

    if (inCode) {
      if (trimmed) code.push(trimmed);
      continue;
    }

    const heading = trimmed.match(/^(#{2,4})\s+(.+)$/);
    if (heading) {
      flushSection();
      section = createEmptySection(stripMarkdown(heading[2]), heading[1].length);
      continue;
    }

    if (!section) continue;
    if (!trimmed) {
      flushParagraph();
      continue;
    }
    if (/^>\s*\*\*(Listen to Episode|Episode coming soon|Related appendices|Authoritative sources)/i.test(trimmed)) continue;
    if (/^[-:|\s]+$/.test(trimmed)) continue;

    if (trimmed.startsWith('|')) {
      flushParagraph();
      const cells = trimmed.split('|').map(cell => compactPoint(cell, 120)).filter(Boolean);
      if (cells.length >= 2 && !isTableHeaderRow(cells)) section.tableRows.push(cells.join(' means '));
      continue;
    }

    const numbered = trimmed.match(/^\d+\.\s+(.+)$/);
    if (numbered) {
      flushParagraph();
      const point = compactPoint(numbered[1]);
      if (point) section.steps.push(point);
      continue;
    }

    const bullet = trimmed.match(/^[-*]\s+(.+)$/);
    if (bullet) {
      flushParagraph();
      const point = compactPoint(bullet[1]);
      if (point) section.bullets.push(point);
      continue;
    }

    paragraph.push(trimmed.replace(/^>\s*/, ''));
  }

  flushSection();
  return sections.filter(section => !isCatalogueSection(section) && hasTeachableContent(section));
}

function uniqueItems(items, limit) {
  const seen = new Set();
  const result = [];
  for (const item of items) {
    const cleaned = compactPoint(item);
    const key = cleaned.toLowerCase();
    if (!cleaned || seen.has(key)) continue;
    seen.add(key);
    result.push(cleaned);
    if (result.length >= limit) break;
  }
  return result;
}

function chunk(items, size) {
  const chunks = [];
  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }
  return chunks;
}

function joinTeachingList(items) {
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]}; and ${items[1]}`;
  return `${items.slice(0, -1).join('; ')}; and ${items[items.length - 1]}`;
}

function stripTerminalPunctuation(text) {
  return text.replace(/[.;:]+$/g, '').trim();
}

function joinSpokenSentences(items) {
  return items.map(removeDanglingLeadIn).map(stripTerminalPunctuation).filter(Boolean).join('. ');
}

const conceptPrompts = [
  'Okay, set the room for us. What are we walking into?',
  'If I am listening before the workshop starts, what should settle in my mind first?',
  'What is the one idea that makes the next few steps less mysterious?',
  'Where do you want a learner to place their attention here?',
  'What would you say to someone who is already bracing for this to be too much?',
  'Give me the version that sounds like an instructor, not a manual.'
];

const workshopPrompts = [
  'How should they picture the shape of the workshop?',
  'Zoom out for a second. What kind of journey is this?',
  'What should feel predictable before the first live session starts?',
  'How do the two days connect instead of feeling like separate courses?',
  'Where is the promise of the workshop, underneath all the logistics?',
  'What should learners understand about live time versus self-paced time?',
  'What belongs in the live room, and what can wait until after?',
  'What is the thread that runs from the browser work to the VS Code work?',
  'Where does the workshop stop being a tour and start becoming contribution?',
  'How would you describe the arc without burying people in the schedule?'
];

const setupPrompts = [
  'What does someone need before they touch the keyboard?',
  'What should be ready before Day 1, so the room can move together?',
  'What is the pre-flight check here?',
  'If setup starts to feel like a barrier, how should a learner think about it?'
];

const recoveryPrompts = [
  'What do you want them to do when the plan breaks?',
  'What is the calm recovery move here?',
  'How should someone ask for help in a way that gets them unstuck faster?',
  'What do we want them to notice before they start over?'
];

const toolPrompts = [
  'There are a lot of tools in play. How do we keep that from feeling like a contest?',
  'How should a learner choose a tool without feeling judged by the choice?',
  'What stays the same when the tool changes?',
  'What is the common workflow underneath the different interfaces?',
  'What should someone listen for when a lesson offers more than one tool path?',
  'How do we make tool choice feel like access, not pressure?'
];

const practicePrompts = [
  'What makes this practice feel low-stakes but still real?',
  'How do these exercises create confidence instead of pressure?',
  'What should the learner prove to themselves after each small task?',
  'Why is the evidence prompt part of the teaching, not just grading?'
];

const detailBridges = [
  'A few details make that real.',
  'The practical anchors are these.',
  'That shows up in the workshop in a few specific ways.',
  'For a learner, the useful signals are these.',
  'The parts worth keeping in working memory are these.',
  'On the ground, that means a few things.',
  'Here is what that changes in practice.',
  'The room should hear these as checkpoints.',
  'These are the details that keep the idea from floating away.',
  'That becomes easier when you listen for these cues.'
];

const continuationBridges = [
  'Hold that next to this.',
  'The next layer is this.',
  'That connects to another useful point.',
  'Now bring the learner back to the room.',
  'Here is the practical turn.',
  'That matters because of the next idea.',
  'Keep the thread going.',
  'This is where the talk moves from concept to action.',
  'Another way to ground it.',
  'Before the learner moves on.',
  'This is the part worth saying out loud.'
];

const sequencePrompts = [
  'Give me the sequence, because order matters here.',
  'How would you walk the room through that step by step?',
  'What does the learner do first, second, and then after that?',
  'Turn that into a path someone can follow.',
  'What is the ordered workflow?'
];

const sequenceMetaphors = [
  'Think of it as a rail line: each stop confirms you are still on the right route before the next one.',
  'Treat it like a recipe: do not add the next ingredient until the previous one is actually in the bowl.',
  'It is a checklist, but a meaningful one: every item creates evidence that the next step is safe.',
  'It is like walking a hallway with named doors: read the sign, enter the right room, then confirm where you landed.',
  'The rhythm is simple: orient, act, verify, then continue.'
];

const tablePrompts = [
  'How should someone choose between those options?',
  'What decision is this helping them make?',
  'Can you translate that into plain choices?',
  'What is the judgment call here?'
];

const codePrompts = [
  'What should they understand before typing anything?',
  'How do you keep commands from becoming magic words?',
  'What is the safe way to learn from that example?',
  'What should happen before anyone copies and runs it?'
];

const analogies = [
  'Think of it like entering a new building: first you find the lobby, then the room, then the door you actually need.',
  'It is like learning a transit route. The names of the stops matter because they tell you whether you are still going the right direction.',
  'The workshop is closer to rehearsal than lecture. You hear the move, try the move, and then check what changed.',
  'A good GitHub workflow is like a well-run meeting: everyone knows the topic, the next action, and who has the floor.',
  'The interface gets friendlier when it stops being a wall of controls and starts being a set of named places.'
];

const genericClosingPoint = 'The useful habit is simple: orient first, act second, verify third. That pause before acting is part of the work.';

function buildClosingTeachingPoint(title) {
  const lower = title.toLowerCase();
  if (/issue/.test(lower)) return 'A solid issue habit is to read the title, the body, and the timeline before acting. You are listening for the requested action, the missing evidence, and the person who needs a response.';
  if (/pull|pr|review|diff/.test(lower)) return 'A solid pull request habit is to separate three questions: what changed, why it changed, and what still needs review. That keeps the conversation useful instead of noisy.';
  if (/branch|commit|merge|\bgit\b/.test(lower)) return 'A solid Git habit is to know which branch you are on, what changed, and what confirmation you expect before you run the next command.';
  if (/screen reader|keyboard|landmark|heading|navigation/.test(lower)) return 'A solid navigation habit is to prove where you are before activating controls. Headings, landmarks, and the address bar are not trivia; they are your map.';
  if (/label|milestone|project|notification/.test(lower)) return 'A solid project habit is to treat metadata as decision support. Labels, status, assignees, and notifications tell you what kind of attention the work needs.';
  return genericClosingPoint;
}

function lowerFirst(text) {
  if (/^(I|GitHub|Git|VS Code|NVDA|JAWS|VoiceOver|Copilot|Aria|AI|URL)\b/.test(text)) return text;
  return text ? text.charAt(0).toLowerCase() + text.slice(1) : text;
}

function removeDanglingLeadIn(text) {
  return text
    .replace(/\bExamples?:$/i, '')
    .replace(/\bInclude:$/i, '')
    .replace(/\b(because|so|and|or|with|for|by):?$/i, '')
    .replace(/\s+:/g, ':')
    .replace(/\s+\.$/, '.')
    .trim();
}

function reframePoint(point, sectionTitle, index) {
  const subject = cleanedTitle(sectionTitle).replace(/[.:]+$/g, '') || 'this idea';
  const cleaned = normalizeTeachingPoint(point);

  const frames = [
    `Start with ${subject}: ${cleaned}`,
    `Here is the plain-English version of ${subject}. ${cleaned}`,
    `This is where ${subject} becomes real: ${lowerFirst(cleaned)}`,
    `Keep the learner anchored in ${subject}. ${cleaned}`,
    `The reason ${subject} matters is that ${lowerFirst(cleaned)}`
  ];

  const sentence = frames[index % frames.length];
  return /[.!?]$/.test(sentence) ? sentence : `${sentence}.`;
}

function normalizeTeachingPoint(point) {
  return removeDanglingLeadIn(point)
    .replace(/Every chapter and appendix has a companion podcast episode[^.]*\./i, 'The audio track is a standalone teaching companion for the same concepts.')
    .replace(/Listen before reading[^.]*\./i, 'Use the episode whenever audio helps you enter or revisit the topic.')
    .replace(/previews? or reviews?/gi, 'teaches')
    .replace(/^This guide covers\s*/i, '')
    .replace(/^This chapter covers\s*/i, '')
    .replace(/^This chapter is\s*/i, '')
    .replace(/^This lesson gives you\s*/i, 'the lesson is ')
    .replace(/^You are about to\s*/i, 'the learner is about to ')
    .replace(/^You will\s*/i, 'the learner will ')
    .replace(/^Before you begin:?\s*/i, '')
    .replace(/^Important:?\s*/i, '')
    .replace(/^Note:?\s*/i, '')
    .replace(/^Screen reader tip:?\s*/i, 'for screen reader users, ')
    .replace(/^Screen reader note:?\s*/i, 'for screen reader users, ')
    .trim();
}

function reframeSupport(point, index) {
  const cleaned = normalizeTeachingPoint(point);
  const frames = [
    `That gives the learner a simple foothold: ${lowerFirst(cleaned)}`,
    `The next useful detail is this: ${cleaned}`,
    `Put another way, ${lowerFirst(cleaned)}`,
    `That matters in practice: ${cleaned}`,
    `This is the part to say slowly: ${cleaned}`
  ];
  const sentence = frames[index % frames.length];
  return /[.!?]$/.test(sentence) ? sentence : `${sentence}.`;
}

function openingForEpisode(episode) {
  const topic = /^welcome/i.test(episode.title) ? 'the shape of the workshop' : cleanedTitle(episode.title);
  const openings = [
    `Welcome to Git Going with GitHub, episode ${episode.number}: ${episode.title}. I am Alex. Today we are going to make ${topic} something you can explain, practice, and recover from when the interface surprises you.`,
    `Welcome back to Git Going with GitHub. This is episode ${episode.number}: ${episode.title}. I am Alex, and today we are turning ${topic} from a list of instructions into a working mental model.`,
    `This is Git Going with GitHub, episode ${episode.number}: ${episode.title}. I am Alex. By the end of this episode, ${topic} should feel less like a wall of GitHub words and more like a set of moves you can trust.`,
    `Welcome to episode ${episode.number} of Git Going with GitHub: ${episode.title}. I am Alex, and today we are teaching this topic as a conversation you can carry into the workshop, not as a page you have to memorize.`
  ];
  return openings[episode.number % openings.length];
}

function jamieOpeningForEpisode(episode) {
  const openings = [
    'And I am Jamie. I will be the voice of the learner who is willing to ask, what is this for, where am I, and how do I know I did it right?',
    'And I am Jamie. I will stop us whenever the instructions sound simple on paper but might feel different with a keyboard and screen reader.',
    'And I am Jamie. I am here for the practical questions: what should I listen for, what can go wrong, and what is the next calm move?',
    'And I am Jamie. I will keep pulling the lesson back to real learners, real repositories, and the evidence that proves the work happened.'
  ];
  return openings[episode.number % openings.length];
}

function setupTeachingFrame(episode) {
  const frames = [
    `The big idea today: ${episode.description}. We will name the concept, explain why it matters, practice the move, and point out the checks that tell you the work is real.`,
    `${episode.description}. That is the surface description. Underneath it, we are building judgment: where to focus, what to ignore, and how to verify the result.`,
    `Today we are working on this: ${episode.description}. I want the learner to leave with a mental map, not just a remembered path through buttons.`,
    `The lesson focus is ${episode.description}. We will treat every step as a teachable decision, because that is what makes the skill portable.`
  ];
  return frames[episode.number % frames.length];
}

function jamieFrameResponse(episode) {
  const responses = [
    'So the episode should work even if someone has not read the chapter yet.',
    'So we are not using the audio as a shortcut around learning. We are using it to make the learning easier to enter.',
    'So the goal is understanding first, then action, then confirmation.',
    'So we should explain the why clearly enough that the steps make sense when the learner meets them later.'
  ];
  return responses[episode.number % responses.length];
}

function alexFrameResponse(episode) {
  const responses = [
    'Exactly. The transcript has to stand on its own. It can point toward practice, but it should teach the concept right here in the conversation.',
    'Yes. A good audio lesson gives someone enough context to try the work with confidence, even before they open the written material.',
    'Right. We are building a rhythm: orient yourself, take one intentional action, then verify what changed before moving on.',
    'That is it. If a listener only has audio right now, they should still get the complete concept and know what evidence would prove success.'
  ];
  return responses[episode.number % responses.length];
}

function challengeIndex(challenge) {
  if (/^\d+$/.test(challenge.id)) return Number.parseInt(challenge.id, 10);
  return challenge.id.charCodeAt(challenge.id.length - 1);
}

function openingForChallenge(challenge) {
  const index = challengeIndex(challenge);
  const openings = [
    `Welcome to Challenge Coach: ${challenge.title}. I am Alex. Before you do the task, we are going to make the skill feel concrete enough to practice.`,
    `This is Challenge Coach for ${challenge.title}. I am Alex, and we are going to teach the move before asking you to prove it.`,
    `Welcome back to Challenge Coach. Today we are taking on ${challenge.title}, one careful step at a time.`,
    `You are listening to Challenge Coach: ${challenge.title}. I am Alex, and this is the calm walkthrough before the hands-on work.`
  ];
  return openings[index % openings.length];
}

function jamieOpeningForChallenge(challenge) {
  const index = challengeIndex(challenge);
  const openings = [
    'And I am Jamie. I will keep asking what the learner should do, what evidence counts, and how to recover if the page does something unexpected.',
    'And I am Jamie. I will translate the challenge into the practical questions learners actually have while doing it.',
    'And I am Jamie. I am listening for the confusing parts: where to start, what to submit, and how to tell whether it worked.',
    'And I am Jamie. I will make sure we teach the skill instead of just reading the checklist aloud.'
  ];
  return openings[index % openings.length];
}

function challengeTeachingFrame(challenge) {
  const index = challengeIndex(challenge);
  const frames = [
    `The skill focus is ${challenge.focus}. This is rehearsal for real contribution, so the evidence matters because it proves the move happened.`,
    `${challenge.focus}. That is the task layer. The teaching layer is understanding why the move belongs in a contributor workflow.`,
    `In this challenge, the learner is practicing ${lowerFirst(challenge.focus)} The point is not to rush. The point is to leave a clear trace of good work.`,
    `The focus is ${challenge.focus}. We will explain the concept, the action, the evidence, and the most common recovery path.`
  ];
  return frames[index % frames.length];
}

function jamieChallengeFrameResponse(challenge) {
  const index = challengeIndex(challenge);
  const responses = [
    'So the challenge has to leave the learner with both confidence and a trail of evidence.',
    'So evidence is not just proof for the facilitator. It is part of how the learner understands the workflow.',
    'So we should name what success sounds like before the learner starts clicking or typing.',
    'So the learner needs the why, the move, and the checkpoint all in the same mental pocket.'
  ];
  return responses[index % responses.length];
}

function alexChallengeFrameResponse(challenge) {
  const index = challengeIndex(challenge);
  const responses = [
    'Exactly. Evidence is not busywork. It is how a learner, a facilitator, and a future maintainer can understand what changed and why.',
    'Right. A good challenge produces something inspectable: a comment, issue, branch, commit, pull request, review, or clear note about what happened.',
    'Yes. When the checkpoint is clear, the learner can tell the difference between being stuck and simply not being finished yet.',
    'That is the teaching shape: understand the concept, do the smallest real action, then verify the result before moving on.'
  ];
  return responses[index % responses.length];
}

function qualityCheckScript(fileName, script) {
  const bannedFragments = [
    'as if we are standing together in a classroom',
    'not just memorizing clicks',
    'GitHub work is not magic',
    'Listen before reading to preview the concepts',
    'preview or review the key concepts',
    'previews or reviews the key concepts',
    'Episode coming soon'
  ];

  for (const fragment of bannedFragments) {
    if (script.includes(fragment)) {
      throw new Error(`${fileName}: generated script contains stale or repetitive phrase: ${fragment}`);
    }
  }

  const seen = new Set();
  for (const segment of scriptToSegments(script)) {
    if (segment.speaker === 'PAUSE') continue;
    if (segment.text.length < 80) continue;
    const key = segment.text.toLowerCase();
    if (seen.has(key)) {
      console.warn(`Warning: ${fileName}: generated script repeats an entire long speaker segment`);
      continue;
    }
    seen.add(key);
  }
}

function naturalList(items) {
  return joinSpokenSentences(items);
}

function choosePhrase(candidates, index, usedSet, fallback) {
  for (let offset = 0; offset < candidates.length; offset += 1) {
    const phrase = candidates[(index + offset) % candidates.length];
    if (!usedSet.has(phrase)) {
      usedSet.add(phrase);
      return phrase;
    }
  }
  return fallback;
}

function addClosingPoint(lines, section, state) {
  const point = buildClosingTeachingPoint(section.title);
  if (state.usedClosingPoints.has(point)) return;
  if (point === genericClosingPoint && state.genericClosingUsed) return;
  if (point === genericClosingPoint && state.sectionCountSinceGeneric < 5) return;
  if (point !== genericClosingPoint && state.topicClosingCount >= 4) return;
  if (point === genericClosingPoint && state.genericClosingUsed) return;
  state.usedClosingPoints.add(point);
  if (point === genericClosingPoint) state.genericClosingUsed = true;
  if (point !== genericClosingPoint) state.topicClosingCount += 1;
  lines.push(marker('ALEX', point));
}

function choosePrompt(candidates, index, state, sectionTitle = '') {
  for (let offset = 0; offset < candidates.length; offset += 1) {
    const prompt = candidates[(index + offset) % candidates.length];
    if (prompt !== state.lastJamiePrompt && !state.usedJamiePrompts.has(prompt)) {
      state.usedJamiePrompts.add(prompt);
      state.lastJamiePrompt = prompt;
      return prompt;
    }
  }

  const fallbackTitle = sectionTitle ? sectionTitle.replace(/[.:]+$/g, '') : 'this section';
  const fallbackOptions = [
    `Let's pause on ${fallbackTitle}. What should a learner take away from it?`,
    `Before we leave ${fallbackTitle}, what is the practical point?`,
    `What is the teaching move inside ${fallbackTitle}?`,
    `If someone only remembers one thing from ${fallbackTitle}, what should it be?`
  ];
  const fallback = fallbackOptions.find(option => !state.usedJamiePrompts.has(option)) || fallbackOptions[0];
  state.usedJamiePrompts.add(fallback);
  state.lastJamiePrompt = fallback;
  return fallback;
}

function getJamiePrompt(section, index, state, hasSteps, hasTableRows, hasCodeBlocks) {
  if (hasSteps) return choosePrompt(sequencePrompts, index, state, section.title);
  if (hasTableRows) return choosePrompt(tablePrompts, index, state, section.title);
  if (hasCodeBlocks) return choosePrompt(codePrompts, index, state, section.title);

  const lower = section.title.toLowerCase();
  if (/before|setup|begin|start/.test(lower)) return choosePrompt(setupPrompts, index, state, section.title);
  if (/help|stuck|troubleshoot|recover/.test(lower)) return choosePrompt(recoveryPrompts, index, state, section.title);
  if (/day 1|day 2|agenda|course|workshop/.test(lower)) return choosePrompt(workshopPrompts, index, state, section.title);
  if (/tool|browser|vs code|desktop|command/.test(lower)) return choosePrompt(toolPrompts, index, state, section.title);
  if (/challenge|exercise|try it|evidence/.test(lower)) return choosePrompt(practicePrompts, index, state, section.title);
  return choosePrompt(conceptPrompts, index, state, section.title);
}

function speakCoreIdea(section, paragraphs, index) {
  if (!paragraphs.length) {
    const subject = cleanedTitle(section.title) || 'this part of the course';
    return `Start with ${subject}. There is something to understand, something to try, and something that proves the try worked.`;
  }

  const lead = reframePoint(paragraphs[0], section.title, index);
  const support = paragraphs.slice(1, 2).map((point, offset) => reframeSupport(point, index + offset + 1));
  const analogy = index % 4 === 1 ? ` ${analogies[index % analogies.length]}` : '';
  const spoken = [lead, ...support].map(removeDanglingLeadIn).filter(Boolean).join(' ');
  const punctuated = /[.!?]$/.test(spoken) ? spoken : `${spoken}.`;
  return `${punctuated}${analogy}`;
}

function speakDetails(groups, index, state) {
  const bridge = choosePhrase(
    detailBridges,
    index,
    state.usedDetailBridges,
    'The practical takeaway is this.'
  );
  return `${bridge} ${naturalList(groups)}.`;
}

function speakSteps(group, index) {
  const parts = group.map(removeDanglingLeadIn).filter(Boolean);
  const first = parts[0] ? `First, ${lowerFirst(parts[0])}` : '';
  const second = parts[1] ? `Then, ${lowerFirst(parts[1])}` : '';
  const third = parts[2] ? `After that, ${lowerFirst(parts[2])}` : '';
  const fourth = parts[3] ? `Finally, ${lowerFirst(parts[3])}` : '';
  return `${[first, second, third, fourth].filter(Boolean).join('. ')}. ${sequenceMetaphors[index % sequenceMetaphors.length]}`;
}

function createTeachingState() {
  return {
    usedClosingPoints: new Set(),
    genericClosingUsed: false,
    sectionCountSinceGeneric: 0,
    topicClosingCount: 0,
    lastJamiePrompt: '',
    usedJamiePrompts: new Set(),
    usedContinuationBridges: new Set(),
    usedDetailBridges: new Set(),
    usedSegments: new Set()
  };
}

function pushSpoken(lines, state, speaker, text) {
  const cleaned = cleanText(text);
  if (!cleaned) return false;
  if (cleaned.length >= 80) {
    const key = cleaned.toLowerCase();
    if (state.usedSegments.has(key)) return false;
    state.usedSegments.add(key);
  }
  lines.push(marker(speaker, cleaned));
  return true;
}

function teachSection(lines, section, index, state) {
  const paragraphs = uniqueItems(section.paragraphs, 4);
  const bullets = uniqueItems(section.bullets, 8);
  const steps = uniqueItems(section.steps, 8);
  const tableRows = shouldUseTableRows(section) ? uniqueItems(section.tableRows, 3) : [];
  const codeBlocks = section.codeBlocks
    .filter(isCommandLikeBlock)
    .slice(0, 2)
    .map(block => compactPoint(block.replace(/\n/g, '; '), 260))
    .filter(Boolean);

  const shouldInviteJamie = index === 0
    || steps.length > 0
    || tableRows.length > 0
    || codeBlocks.length > 0
    || index % 2 === 0;

  if (shouldInviteJamie) {
    pushSpoken(lines, state, 'JAMIE', getJamiePrompt(section, index, state, steps.length > 0, tableRows.length > 0, codeBlocks.length > 0));
    pushSpoken(lines, state, 'ALEX', speakCoreIdea(section, paragraphs, index));
  } else {
    const bridge = choosePhrase(
      continuationBridges,
      index,
      state.usedContinuationBridges,
      'Keep the teaching thread moving.'
    );
    pushSpoken(lines, state, 'ALEX', `${bridge} ${speakCoreIdea(section, paragraphs, index)}`);
  }

  if (bullets.length) {
    const detailLimit = paragraphs.length >= 2 ? 4 : 6;
    pushSpoken(lines, state, 'ALEX', speakDetails(bullets.slice(0, detailLimit), index, state));
  }

  if (steps.length) {
    for (const [groupIndex, group] of chunk(steps, 4).entries()) {
      if (groupIndex > 0) pushSpoken(lines, state, 'JAMIE', choosePrompt(sequencePrompts, index + groupIndex, state, section.title));
      pushSpoken(lines, state, 'ALEX', speakSteps(group, index + groupIndex));
    }
  }

  if (tableRows.length) {
    pushSpoken(lines, state, 'ALEX', `Use the comparison to make a decision, not to recite a table. The main contrasts are: ${naturalList(tableRows)}.`);
  }

  if (codeBlocks.length) {
    pushSpoken(lines, state, 'ALEX', `Treat examples as spoken recipes, not decorations. You may hear something like ${naturalList(codeBlocks)}. Read the command, understand what it changes, then run it only when the repository state matches the lesson.`);
  }

  state.sectionCountSinceGeneric += 1;
  addClosingPoint(lines, section, state);
}

function buildCompanionScript(episode, total) {
  const pad = String(episode.number).padStart(2, '0');
  const sourceDocs = (episode.sources || [])
    .map(source => ({ source, resolved: resolveSourceName(source), content: readDoc(source) }))
    .filter(entry => entry.content);

  const sections = sourceDocs.flatMap(doc => extractTeachingSections(doc.content));
  const lines = [];

  lines.push(marker('ALEX', openingForEpisode(episode)));
  lines.push(marker('JAMIE', jamieOpeningForEpisode(episode)));
  lines.push(pause());

  lines.push(marker('ALEX', setupTeachingFrame(episode)));
  lines.push(marker('JAMIE', jamieFrameResponse(episode)));
  lines.push(marker('ALEX', alexFrameResponse(episode)));
  lines.push(pause());

  const state = createTeachingState();
  sections.forEach((section, index) => {
    teachSection(lines, section, index, state);
    if ((index + 1) % 3 === 0 || index === sections.length - 1) lines.push(pause());
  });

  lines.push(marker('JAMIE', 'What should people carry with them after this?'));
  lines.push(marker('ALEX', 'Carry the map. Know what page or tool you are in, know which action you are taking, and know what confirmation should follow. If the confirmation is missing, pause. That pause is not wasted time; it is professional judgment.'));
  lines.push(marker('JAMIE', 'That is a better way to say it than just follow the steps.'));
  lines.push(marker('ALEX', `Right. Steps matter, but understanding wins. That is episode ${episode.number}. Next in the series is ${episode.number + 1 < total ? `episode ${episode.number + 1}` : 'the next learning block'}, where we keep building the same contributor muscles.`));

  return { fileName: `ep${pad}-${episode.slug}.txt`, script: lines.join('\n') };
}

function buildChallengeScript(challenge) {
  const sources = [
    { name: challenge.template, content: readFileIfExists(challenge.template) },
    { name: challenge.solution, content: readFileIfExists(challenge.solution) },
    ...(challenge.chapters || []).map(chapter => ({ name: chapter, content: readFileIfExists(chapter) }))
  ].filter(source => source.content);

  const sections = sources.flatMap(source => extractTeachingSections(source.content));
  const lines = [];

  lines.push(marker('ALEX', openingForChallenge(challenge)));
  lines.push(marker('JAMIE', jamieOpeningForChallenge(challenge)));
  lines.push(pause());

  lines.push(marker('ALEX', challengeTeachingFrame(challenge)));
  lines.push(marker('JAMIE', jamieChallengeFrameResponse(challenge)));
  lines.push(marker('ALEX', alexChallengeFrameResponse(challenge)));
  lines.push(pause());

  const state = createTeachingState();
  sections.forEach((section, index) => {
    teachSection(lines, section, index, state);
    if ((index + 1) % 3 === 0 || index === sections.length - 1) lines.push(pause());
  });

  lines.push(marker('JAMIE', 'What is the final checkpoint?'));
  lines.push(marker('ALEX', 'You should be able to point to the evidence, explain the action, and describe what you would do next if this were a real open source project. If you can teach the move back, you have learned it.'));
  lines.push(marker('JAMIE', 'And if they get stuck?'));
  lines.push(marker('ALEX', 'Read the latest message, not the loudest worry. Check the issue, the branch, the pull request, the status check, or the bot comment. Then ask for help with those facts in hand. That is how professionals collaborate.'));

  return { fileName: `cc-${challenge.id}-${challenge.slug}.txt`, script: lines.join('\n') };
}

function main() {
  ensureDir(SCRIPTS_DIR);
  ensureDir(TRANSCRIPTS_DIR);
  for (const group of SCRIPT_GROUP_DIRS) {
    ensureDir(path.join(SCRIPTS_DIR, group));
    ensureDir(path.join(TRANSCRIPTS_DIR, group));
  }

  const removedScripts = removeFiles(SCRIPTS_DIR, name => name.endsWith('.txt'));
  const removedSegments = removeFiles(TRANSCRIPTS_DIR, name => name.endsWith('-segments.json'));

  let companionCount = 0;
  for (const episode of episodes) {
    const { fileName, script } = buildCompanionScript(episode, episodes.length);
    writeScriptAndSegments(fileName, script, scriptGroupForCompanion(episode));
    companionCount += 1;
  }

  let challengeCount = 0;
  for (const challenge of challenges) {
    const { fileName, script } = buildChallengeScript(challenge);
    writeScriptAndSegments(fileName, script, 'challenges');
    challengeCount += 1;
  }

  console.log(`Removed old script files: ${removedScripts}`);
  console.log(`Removed old segment transcript files: ${removedSegments}`);
  console.log(`Generated professional teaching scripts: ${companionCount}`);
  console.log(`Generated challenge coach scripts: ${challengeCount}`);
  console.log(`Generated segment JSON files: ${companionCount + challengeCount}`);
  console.log('Scripts ready for voice synthesis.');
}

if (require.main === module) {
  main();
}
