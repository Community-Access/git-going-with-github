const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const repoRoot = path.resolve(__dirname, '../../../');

function read(relativePath) {
    return fs.readFileSync(path.join(repoRoot, relativePath), 'utf8');
}

test('challenge issue templates inventory remains complete', () => {
    const templateDir = path.join(repoRoot, 'learning-room/.github/ISSUE_TEMPLATE');
    const files = fs.readdirSync(templateDir).filter(name => name.endsWith('.yml'));

    const core = files.filter(name => /^challenge-\d{2}-.+\.yml$/.test(name));
    const bonus = files.filter(name => /^bonus-[a-e]-.+\.yml$/.test(name));

    assert.equal(core.length, 16, 'Expected 16 core challenge templates');
    assert.equal(bonus.length, 5, 'Expected 5 bonus challenge templates');

    const expectedCore = Array.from({ length: 16 }, (_, i) => String(i + 1).padStart(2, '0'));
    const actualCore = core.map(name => name.match(/^challenge-(\d{2})-/)[1]).sort();
    assert.deepEqual(actualCore, expectedCore, 'Core challenge numbering should be 01..16');

    const actualBonus = bonus.map(name => name.match(/^bonus-([a-e])-/)[1]).sort();
    assert.deepEqual(actualBonus, ['a', 'b', 'c', 'd', 'e'], 'Bonus challenge lettering should be a..e');
});

test('runbook challenge tracking table includes all 1-16 plus bonus A-E rows', () => {
    const runbook = read('admin/LEARNING-ROOM-E2E-QA-RUNBOOK.md');

    for (let i = 1; i <= 16; i += 1) {
        assert.match(
            runbook,
            new RegExp(`\\|\\s*${i}\\s*\\|`),
            `Runbook tracker missing Challenge ${i} row`
        );
    }

    ['A', 'B', 'C', 'D', 'E'].forEach(letter => {
        assert.match(
            runbook,
            new RegExp(`\\|\\s*Bonus\\s+${letter}\\s*\\|`, 'i'),
            `Runbook tracker missing Bonus ${letter} row`
        );
    });
});

test('runbook contains required reliability variation categories', () => {
    const runbook = read('admin/LEARNING-ROOM-E2E-QA-RUNBOOK.md');

    const categories = [
        'Happy path completion',
        'Common student error path',
        'Recovery path after feedback',
        'Automation latency/idempotency behavior',
    ];

    categories.forEach(category => {
        assert.match(
            runbook,
            new RegExp(category.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'),
            `Runbook missing required variation category: ${category}`
        );
    });

    const requiredCrossCutting = [
        'Bot comment delay greater than expected window',
        'Workflow rerun without creating duplicate progression issues',
        'Student posts evidence in wrong place then corrects it',
        'Autograder false-negative suspicion escalated and resolved',
        'Permission/access prompt encountered and resolved',
    ];

    requiredCrossCutting.forEach(item => {
        assert.match(
            runbook,
            new RegExp(item.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'),
            `Runbook missing cross-cutting failure mode: ${item}`
        );
    });
});
