# Classroom Copy-Paste Pack

This folder is a facilitator-focused copy-paste pack for GitHub Classroom setup.

Use these files when you need to quickly configure assignments without jumping between multiple folders.

## What Is Included

- `day1-assignment-copy-paste.md` - Day 1 assignment body ready to paste into Classroom.
- `day2-assignment-copy-paste.md` - Day 2 assignment body ready to paste into Classroom.
- `autograding-setup.md` - **Deprecated.** Explains that autograding now runs as workflows in the template repo and that no Classroom UI test cases are needed.
- `seeding-ops.md` - Post-acceptance scripts to seed challenges and peer simulation content.
- `live-facilitation-flow.md` - Single-run checklist for creating assignments, verifying autograder workflows, publishing, seeding, and validating.

## Recommended Setup Order

1. Create the Classroom and import roster from `classroom/README.md`.
2. Create Day 1 assignment and paste content from `day1-assignment-copy-paste.md`. Leave the autograding tests area empty.
3. Create Day 2 assignment and paste content from `day2-assignment-copy-paste.md`. Leave the autograding tests area empty.
4. Confirm the autograder workflows are present in `Community-Access/learning-room-template` (see `autograding-setup.md` for the full list).
5. After each student accepts, run seeding commands from `seeding-ops.md`.
6. Use `live-facilitation-flow.md` during setup day to execute the full flow without missing steps.

## Source of Truth

This pack is derived from:

- `classroom/assignment-day1-you-belong-here.md`
- `classroom/assignment-day2-you-can-build-this.md`
- `learning-room/.github/workflows/autograder-*.yml` (the workflows that replaced Classroom test cases)
- `scripts/classroom/*.ps1`

If those source files change, update this folder to keep the copy-paste flow accurate.
