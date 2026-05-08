# Classroom Copy-Paste Pack

This folder is a facilitator-focused copy-paste pack for GitHub Classroom setup.

Use these files when you need to quickly configure assignments without jumping between multiple folders.

## What Is Included

- `day1-assignment-copy-paste.md` - Day 1 assignment body ready to paste into Classroom.
- `day2-assignment-copy-paste.md` - Day 2 assignment body ready to paste into Classroom.
- `autograding-setup.md` - Exact Day 1 and Day 2 autograding entries, validation steps, and troubleshooting.
- `seeding-ops.md` - Post-acceptance scripts to seed challenges and peer simulation content.
- `live-facilitation-flow.md` - Single-run checklist for creating assignments, enabling autograding, publishing, seeding, and validating.

## Recommended Setup Order

1. Create the Classroom and import roster from `classroom/README.md`.
2. Create Day 1 assignment and paste content from `day1-assignment-copy-paste.md`.
3. Configure Day 1 tests using `autograding-setup.md`.
4. Create Day 2 assignment and paste content from `day2-assignment-copy-paste.md`.
5. Configure Day 2 tests using `autograding-setup.md`.
6. After each student accepts, run seeding commands from `seeding-ops.md`.
7. Use `live-facilitation-flow.md` during setup day to execute the full flow without missing steps.

## Source of Truth

This pack is derived from:

- `classroom/assignment-day1-you-belong-here.md`
- `classroom/assignment-day2-you-can-build-this.md`
- `classroom/autograding-day1.json`
- `classroom/autograding-day2.json`
- `scripts/classroom/*.ps1`

If those source files change, update this folder to keep the copy-paste flow accurate.
