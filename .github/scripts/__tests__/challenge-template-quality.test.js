const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const templatesDir = path.resolve(__dirname, '../../../learning-room/.github/ISSUE_TEMPLATE');

function getTemplateFiles() {
  const all = fs.readdirSync(templatesDir).filter(name => name.endsWith('.yml'));
  const core = all.filter(name => /^challenge-\d{2}-.+\.yml$/.test(name)).sort();
  const bonus = all.filter(name => /^bonus-[a-e]-.+\.yml$/.test(name)).sort();
  return { core, bonus };
}

function readTemplate(fileName) {
  return fs.readFileSync(path.join(templatesDir, fileName), 'utf8');
}

function assertCommonTemplateQuality(fileName, content) {
  assert.match(content, /^name:\s*".+"/m, `${fileName}: missing or invalid name`);
  assert.match(content, /^description:\s*.+/m, `${fileName}: missing description`);
  assert.match(content, /^title:\s*".+\(@\{username\}\)"/m, `${fileName}: title should include (@{username}) placeholder`);
  assert.match(content, /^labels:\s*\[[^\]]+\]/m, `${fileName}: missing labels array`);
  assert.match(content, /^body:\s*$/m, `${fileName}: missing body section`);

  assert.match(
    content,
    /- type:\s*textarea[\s\S]*?id:\s*evidence[\s\S]*?validations:[\s\S]*?required:\s*true/,
    `${fileName}: missing required evidence textarea section`
  );

  assert.match(content, /### If you get stuck/, `${fileName}: missing troubleshooting section`);
  assert.match(content, /\| Symptom \| Try this \|/, `${fileName}: missing troubleshooting table header`);
  assert.match(content, /\|---\|---\|/, `${fileName}: missing troubleshooting table divider`);

  assert.match(
    content,
    /solution-[a-z0-9-]+\.md\)/i,
    `${fileName}: missing reference solution link`
  );
}

test('challenge template inventory remains 16 core + 5 bonus', () => {
  const { core, bonus } = getTemplateFiles();
  assert.equal(core.length, 16, 'Expected 16 core challenge templates');
  assert.equal(bonus.length, 5, 'Expected 5 bonus challenge templates');
});

test('core challenge template numbering is complete from 01 to 16', () => {
  const { core } = getTemplateFiles();
  const foundNumbers = core.map(name => Number(name.match(/^challenge-(\d{2})-/)[1])).sort((a, b) => a - b);
  const expected = Array.from({ length: 16 }, (_, i) => i + 1);
  assert.deepEqual(foundNumbers, expected);
});

test('bonus challenge template lettering is complete from A to E', () => {
  const { bonus } = getTemplateFiles();
  const foundLetters = bonus.map(name => name.match(/^bonus-([a-e])-/)[1]);
  assert.deepEqual(foundLetters, ['a', 'b', 'c', 'd', 'e']);
});

test('all core challenge templates meet quality gate', () => {
  const { core } = getTemplateFiles();
  const autogradedChallenges = new Set([7, 10, 14, 16]);

  core.forEach(fileName => {
    const content = readTemplate(fileName);
    const challengeNumber = Number(fileName.match(/^challenge-(\d{2})-/)[1]);

    assertCommonTemplateQuality(fileName, content);

    assert.match(
      content,
      new RegExp(`##\\s+Challenge\\s+${challengeNumber}\\b`, 'i'),
      `${fileName}: heading should include matching challenge number`
    );

    assert.match(content, /\*\*What you will do:\*\*/, `${fileName}: missing learning objective statement`);
    assert.match(content, /### Peer simulation check/, `${fileName}: missing peer simulation checkpoint`);

    if (autogradedChallenges.has(challengeNumber)) {
      assert.match(content, /labels:\s*\[[^\]]*autograded[^\]]*\]/i, `${fileName}: should include autograded label`);
      assert.match(content, /\*\*Autograded:\*\*/, `${fileName}: should describe autograded behavior`);
    }
  });
});

test('all bonus challenge templates meet quality gate', () => {
  const { bonus } = getTemplateFiles();

  bonus.forEach(fileName => {
    const content = readTemplate(fileName);

    assertCommonTemplateQuality(fileName, content);
    assert.match(content, /##\s+Bonus\s+[A-E]:/i, `${fileName}: heading should include bonus letter`);
    assert.match(content, /\*\*What you will do:\*\*/, `${fileName}: missing learning objective statement`);
  });
});
