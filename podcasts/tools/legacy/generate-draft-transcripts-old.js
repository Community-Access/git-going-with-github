#!/usr/bin/env node
/**
 * Generate reviewable draft podcast transcripts from current catalog metadata.
 *
 * This intentionally stops before audio generation. The output is plain text
 * with [ALEX], [JAMIE], and [PAUSE] markers that Piper can synthesize later.
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
  return String(text || '')
    .normalize('NFKC')
    .replace(/\r/g, '')
    .replace(/[\u200B-\u200D\u2060\uFEFF\u202A-\u202E\u2066-\u2069]/g, '')
    .replace(/\u00a0/g, ' ')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/[\u2013\u2014]/g, '--')
    .replace(/\u2026/g, '...')
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
  return markdown
    .replace(/^>[ \t]*\*\*Listen to Episode[^\n]*\n?/gm, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/^#\s+.+$/m, '');
}

function naturalList(text) {
  return stripMarkdown(text)
    .replace(/\s+-\s+/g, '; ')
    .replace(/^[-;\s]+/, '')
    .trim();
}

function sentence(text) {
  const cleaned = stripMarkdown(text);
  if (!cleaned) return '';
  const match = cleaned.match(/^(.{50,360}?[.!?])\s/);
  return match ? match[1].trim() : cleaned.slice(0, 340).trim();
}

function headingsFromMarkdown(markdown, limit = 6) {
  const headings = [];
  for (const line of contentOnlyMarkdown(markdown).split('\n')) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (!match) continue;
    const text = stripMarkdown(match[2]);
    if (!text || /^listen to episode/i.test(text) || /^related appendices/i.test(text)) continue;
    if (!headings.includes(text)) headings.push(text);
    if (headings.length >= limit) break;
  }
  return headings;
}

function firstParagraph(markdown) {
  const paragraphs = contentOnlyMarkdown(markdown).split(/\n\s*\n/);
  for (const paragraph of paragraphs) {
    const cleaned = stripMarkdown(paragraph);
    if (cleaned.length > 80 && !/^listen to episode/i.test(cleaned) && !/^table of contents/i.test(cleaned)) {
      return sentence(cleaned);
    }
  }
  return '';
}

function chunk(items, size) {
  const chunks = [];
  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }
  return chunks;
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

function writeScriptAndSegments(fileName, script) {
  const scriptPath = path.join(SCRIPTS_DIR, fileName);
  fs.writeFileSync(scriptPath, script.trim() + '\n', 'utf8');

  const segmentName = fileName.replace(/\.txt$/, '-segments.json');
  const segmentPath = path.join(TRANSCRIPTS_DIR, segmentName);
  fs.writeFileSync(segmentPath, JSON.stringify(scriptToSegments(script), null, 2) + '\n', 'utf8');
}

function conceptLine(concepts) {
  if (!concepts || !concepts.length) return 'the practical ideas in the source material';
  if (concepts.length === 1) return concepts[0];
  return `${concepts.slice(0, -1).join(', ')}, and ${concepts[concepts.length - 1]}`;
}

function conceptTeaching(group) {
  if (!group.length) return 'The useful model is to find the structure, take one action, and verify what changed.';
  const [first, second, third] = group;
  const parts = [];
  parts.push(`Start with ${first}. That is the anchor idea.`);
  if (second) parts.push(`Then connect it to ${second}, so the learner can turn the idea into action.`);
  if (third) parts.push(`Finally, use ${third} as the verification step.`);
  parts.push('This sequence keeps the workflow clear: orient, act, then confirm.');
  return parts.join(' ');
}

function collectSourceSections(markdown) {
  const rows = [];
  let current = null;

  function ensureCurrent(title) {
    const cleaned = stripMarkdown(title || 'Core section');
    if (!cleaned) return;
    if (!current || current.title !== cleaned) {
      if (current && current.points.length) rows.push(current);
      current = { title: cleaned, points: [] };
    }
  }

  function addPoint(raw) {
    if (!current) ensureCurrent('Core section');
    if (!current) return;
    const text = sentence(raw);
    if (!text || text.length < 24) return;
    if (!current.points.includes(text)) current.points.push(text);
  }

  const lines = contentOnlyMarkdown(markdown).split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const heading = trimmed.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      ensureCurrent(heading[2]);
      continue;
    }

    const bullet = trimmed.match(/^[-*]\s+(.+)$/);
    if (bullet) {
      addPoint(bullet[1]);
      continue;
    }

    const numbered = trimmed.match(/^\d+\.\s+(.+)$/);
    if (numbered) {
      addPoint(numbered[1]);
      continue;
    }

    if (trimmed.startsWith('|') || /^[-:| ]+$/.test(trimmed)) continue;
    if (trimmed.length >= 40) addPoint(trimmed);
  }

  if (current && current.points.length) rows.push(current);
  return rows.filter(row => row.points.length);
}

function companionContextLines(episode) {
  const lines = [];
  const sourceNames = (episode.sources || []).map(resolveSourceName);

  if (episode.number === 0 || sourceNames.includes('01-choose-your-tools.md')) {
    lines.push(marker('JAMIE', 'I also want to name something important right away: people do not all use the same tools. Some learners will stay in the browser. Some will move into VS Code. Some may prefer GitHub Desktop or the command line. The course is designed to meet people where they are.'));
    lines.push(marker('ALEX', 'Exactly. We teach the core GitHub workflow first, then show multiple tool paths. The browser, github.dev, VS Code, GitHub Desktop, and the GitHub CLI are different doors into the same contribution workflow.'));
  }

  if (episode.number === 0 || sourceNames.includes('04-the-learning-room.md')) {
    lines.push(marker('JAMIE', 'And this is not just a pile of reading assignments. The workshop uses GitHub Classroom to give each student a guided private practice repository.'));
    lines.push(marker('ALEX', 'That private repository is the Learning Room. It is created from a template, assigned through GitHub Classroom, and structured so challenge issues unlock in sequence. Aria and the Student Progression Bot provide feedback and help keep the experience guided without taking away the learner\'s agency.'));
  }

  return lines;
}

function buildCompanionScript(episode, total) {
  const pad = String(episode.number).padStart(2, '0');
  const sourceEntries = (episode.sources || [])
    .map(source => ({ source, resolved: resolveSourceName(source), text: readDoc(source) }))
    .filter(entry => entry.text);
  const combined = sourceEntries.map(entry => entry.text).join('\n\n');
  const headings = headingsFromMarkdown(combined, 10);
  const overview = firstParagraph(combined) || episode.description;
  const conceptGroups = chunk((episode.concepts || []), 2);
  const headingText = headings.length ? headings.join('; ') : 'the main sections in the source material';
  const focusText = naturalList(episode.focus || episode.description);

  const lines = [];
  lines.push(marker('ALEX', `Welcome to Git Going with GitHub. This is episode ${episode.number}, ${episode.title}. I am Alex, and I will be your guide through the contributor skills behind today's topic.`));
  lines.push(marker('JAMIE', 'And I am Jamie. I will ask the questions a new contributor is likely to have so we can keep this practical and clear.'));
  lines.push(marker('ALEX', `The short answer is this: ${episode.description} The source opens with this idea: ${overview}`));
  lines.push(marker('JAMIE', `So this is not a word-for-word reading. It is the companion version: the map, the mental model, and the spots where people usually get turned around.`));
  lines.push(...companionContextLines(episode));
  lines.push(pause());

  lines.push(marker('ALEX', `Here is the shape of the episode. The current source is organized around ${headingText}.`));
  lines.push(marker('JAMIE', `I like that. Headings are not just decoration for screen reader users. They are the table of contents, the road signs, and occasionally the emergency exit.`));
  lines.push(marker('ALEX', `Exactly. Our focus today is ${focusText}`));

  conceptGroups.forEach((group, index) => {
    const questionOpeners = [
      'Let me check I have this right.',
      'Can we slow that down into steps?',
      'What is the practical move for a student here?',
      'Can you put that in plain language for the room?'
    ];
    lines.push(marker('JAMIE', `${questionOpeners[index % questionOpeners.length]} We need to cover ${conceptLine(group)}. What is the useful way to think about that?`));
    lines.push(marker('ALEX', conceptTeaching(group)));
    if (index % 2 === 1 || index === conceptGroups.length - 1) lines.push(pause());
  });

  if (sourceEntries.length) {
    lines.push(marker('JAMIE', 'Let us do a complete teaching walk through of every source file attached to this episode so listeners can learn from audio alone.'));
    lines.push(marker('ALEX', 'Perfect. I will cover each source one by one, section by section, and call out the actions and terms we want learners to retain.'));
    lines.push(pause());

    sourceEntries.forEach((entry, sourceIndex) => {
      const sections = collectSourceSections(entry.text);
      lines.push(marker('JAMIE', `Source ${sourceIndex + 1} is ${entry.resolved}. Give us the complete teaching walkthrough for this source.`));
      lines.push(marker('ALEX', `Great. We are now covering ${entry.resolved} in full. I will move section by section and account for every major point in the file.`));

      sections.forEach((section, sectionIndex) => {
        lines.push(marker('JAMIE', `Section ${sectionIndex + 1} is ${section.title}. What should the learner understand first?`));
        const pointGroups = chunk(section.points, 3);
        pointGroups.forEach((group, pointGroupIndex) => {
          lines.push(marker('ALEX', `In ${section.title}, pay attention to these points: ${group.join(' ')} Practice move: explain these points aloud in your own words, then map them to one concrete action in your workflow.`));
          if (pointGroupIndex % 2 === 1) {
            lines.push(marker('JAMIE', 'So what I am hearing is: this section is not just vocabulary. It is a sequence of decisions and checks a contributor can apply immediately.'));
          }
        });
        if (sectionIndex % 2 === 1 || sectionIndex === sections.length - 1) lines.push(pause());
      });
    });
  }

  lines.push(marker('JAMIE', `What should someone listen for when they move from this audio back into the written chapter or appendix?`));
  lines.push(marker('ALEX', `Listen for structure first: headings, landmarks, issue titles, pull request titles, file names, command output, and confirmation messages. Do not try to memorize everything. Use the structure to find the next small action.`));
  lines.push(marker('JAMIE', `That feels kinder. The goal is not to become a walking keyboard shortcut encyclopedia. The goal is to know how to recover when the page or editor gets loud.`));
  lines.push(marker('ALEX', `Yes. A good checkpoint for this episode is whether you can explain the main idea in your own words, name the next action the chapter asks you to take, and describe what success should sound or feel like with your tools.`));
  lines.push(pause());
  lines.push(marker('JAMIE', `Quick recap: this episode covered ${conceptLine((episode.concepts || []))}.`));
  lines.push(marker('ALEX', `Up next in the companion sequence is episode ${episode.number + 1 < total ? episode.number + 1 : 'after this series'}, where we keep building from this foundation.`));

  return { fileName: `ep${pad}-${episode.slug}.txt`, script: lines.join('\n') };
}

function extractTemplateDescription(templateText) {
  const match = templateText.match(/^description:\s*(.+)$/m);
  return match ? stripMarkdown(match[1].replace(/^['"]|['"]$/g, '')) : '';
}

function extractEvidenceLabel(templateText) {
  const match = templateText.match(/label:\s*["']?([^"'\n]+)["']?/);
  return match ? stripMarkdown(match[1]) : 'your evidence';
}

function checklistItems(templateText, limit = 5) {
  const items = [];
  for (const line of templateText.split('\n')) {
    const markerIndex = line.indexOf('- [ ]');
    if (markerIndex !== -1) items.push(stripMarkdown(line.slice(markerIndex + 5)));
    if (items.length >= limit) break;
  }
  return items;
}

function buildChallengeScript(challenge) {
  const templateText = readFileIfExists(challenge.template);
  const solutionText = readFileIfExists(challenge.solution);
  const chapterText = (challenge.chapters || []).map(readFileIfExists).join('\n\n');
  const templateDescription = extractTemplateDescription(templateText) || challenge.focus;
  const evidence = extractEvidenceLabel(templateText);
  const items = checklistItems(templateText, 20);
  const headings = headingsFromMarkdown(chapterText, 12);
  const solutionPreview = firstParagraph(solutionText) || 'The solution reference shows one acceptable path. Yours can differ if it proves the same learning objective.';
  const itemSentence = items.length ? items.join('; ') : 'follow the issue instructions, post evidence, and close the challenge issue';
  const headingSentence = headings.length ? headings.join('; ') : 'the relevant teaching chapter sections';
  const sourceWalkthrough = [
    { name: challenge.template, sections: collectSourceSections(templateText) },
    ...(challenge.chapters || []).map(chapter => ({ name: chapter, sections: collectSourceSections(readFileIfExists(chapter)) })),
    { name: challenge.solution, sections: collectSourceSections(solutionText) }
  ].filter(entry => entry.sections.length);

  const lines = [];
  lines.push(marker('ALEX', `Welcome to Challenge Coach. This is ${challenge.title}. I am Alex, and we are going to walk through the challenge the way an experienced contributor would approach it: calmly, one checkable step at a time.`));
  lines.push(marker('JAMIE', 'And I am Jamie. I will keep this grounded in what a student actually experiences while completing the challenge.'));
  lines.push(marker('ALEX', `The challenge description is: ${templateDescription}`));
  lines.push(marker('JAMIE', 'So the goal is straightforward: practice one contributor skill in the Learning Room, post clear evidence, and move to the next step with confidence.'));
  lines.push(pause());

  lines.push(marker('ALEX', `The teaching focus is ${challenge.focus}`));
  lines.push(marker('JAMIE', `And learners may use different tools here, right? Browser first, VS Code when the challenge calls for local work, and GitHub Desktop or the command line if that is the workflow that fits them.`));
  lines.push(marker('ALEX', `Right. The Learning Room is guided by challenge issues, evidence prompts, bot feedback, and reference solutions. The tool can vary. The learning target stays the same: understand the workflow well enough to complete it and explain what happened.`));
  lines.push(marker('JAMIE', `What is the learner anxiety for this one?`));
  lines.push(marker('ALEX', `Usually it is uncertainty. People wonder where they are in the repository, whether the action really worked, or whether their evidence is good enough. That is why the issue template breaks the work into observable steps.`));
  lines.push(marker('JAMIE', `Observable is the key word. If your screen reader announces a title, a field label, a branch name, a pull request status, or a bot comment, that is not background noise. That is evidence.`));
  lines.push(pause());

  lines.push(marker('ALEX', `Here is the task walkthrough in plain language. Work through these pieces: ${itemSentence}.`));
  lines.push(marker('JAMIE', `And if the list feels long, treat it like a checklist, not a speed test. One item, then the next item. The repository will wait for you.`));
  lines.push(marker('ALEX', `The supporting teaching material points you back to ${headingSentence}. Those sections explain the why behind the clicks, keys, comments, or commands.`));
  lines.push(marker('JAMIE', `What do they submit when they are done?`));
  lines.push(marker('ALEX', `They submit ${evidence}. The evidence should be specific enough that a facilitator, peer, or Aria can tell what happened without guessing.`));
  lines.push(marker('JAMIE', `So no mysterious victory lap comment like done. Give the future reader a breadcrumb trail.`));
  lines.push(pause());

  lines.push(marker('ALEX', `The reference solution says this in spirit: ${solutionPreview}`));
  lines.push(marker('JAMIE', `That is important. The solution is a comparison point, not a script you failed to memorize.`));

  if (sourceWalkthrough.length) {
    lines.push(marker('JAMIE', 'Before we close, let us do complete source coverage for this challenge so we do not miss any required learning point.'));
    lines.push(marker('ALEX', 'Agreed. We will walk each source file and cover every major section and action in plain language.'));
    lines.push(pause());

    sourceWalkthrough.forEach((entry, sourceIndex) => {
      lines.push(marker('JAMIE', `Source ${sourceIndex + 1} is ${entry.name}. What should learners extract from this source file?`));
      entry.sections.forEach((section, sectionIndex) => {
        lines.push(marker('ALEX', `In ${section.title}, the practical points are: ${section.points.join(' ')} Teaching action: complete one step from this section immediately, then verify the evidence you can submit.`));
        if (sectionIndex % 2 === 1 || sectionIndex === entry.sections.length - 1) {
          lines.push(marker('JAMIE', 'So what I am hearing is: each section maps to a concrete action and a concrete evidence artifact.'));
        }
      });
      lines.push(pause());
    });
  }

  lines.push(marker('ALEX', `Common recovery moves are simple. Reread the issue title, move back to the Code or Issues tab, use headings and landmarks, check the branch or pull request name, and read the latest bot or facilitator comment before changing anything else.`));
  lines.push(marker('JAMIE', `My favorite recovery move is also legal: pause, breathe, and ask a human. Professional developers do that constantly. They just call it collaboration.`));
  lines.push(marker('ALEX', `Success feels like this: you can name the skill you practiced, point to the evidence you posted, and explain how this challenge prepares you for the next contribution step.`));
  lines.push(pause());
  lines.push(marker('JAMIE', `Challenge Coach recap: ${challenge.title} is about ${challenge.focus}`));
  lines.push(marker('ALEX', `When this challenge is complete, the learner is ready to carry that confidence into the next contribution step.`));

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
  console.log(`Generated companion scripts: ${companionCount}`);
  console.log(`Generated challenge coach scripts: ${challengeCount}`);
  console.log(`Generated segment JSON files: ${companionCount + challengeCount}`);
  console.log('Next step: review scripts, then run Piper voice generation.');
}

if (require.main === module) {
  main();
}
