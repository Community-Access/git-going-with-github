# Git Going with GitHub Go-Live QA Guide

Use this guide before a cohort is opened to learners. It is the release gate for curriculum content, GitHub Classroom deployment, Learning Room automation, podcast materials, accessibility, and human test coverage.

The goal is simple: a facilitator should be able to create a classroom, seed test repositories, complete every challenge path, validate every generated artifact, and know exactly what remains before students arrive.

## Release Decision

Do not mark a cohort ready until all required items in this section are complete.

- [ ] Automated tests pass locally.
- [ ] HTML documentation builds from the current Markdown sources.
- [ ] Podcast catalog validation passes.
- [ ] RSS feed validation passes for the current audio state.
- [ ] Git diff whitespace check has no actual whitespace or conflict-marker errors.
- [ ] Day 1 Classroom assignment has been created from the current Learning Room template.
- [ ] Day 2 Classroom assignment has been created from the current Learning Room template.
- [ ] A test student account accepted the Day 1 invite and received a private repository.
- [ ] A test student account accepted the Day 2 invite and received a private repository.
- [ ] Challenge 1 can be seeded and completed.
- [ ] Challenge 10 can be seeded and completed.
- [ ] Aria posts PR feedback on a test pull request.
- [ ] Student Progression Bot creates the next challenge when a challenge issue is closed.
- [ ] Autograding runs and reports results in GitHub Classroom.
- [ ] Peer simulation artifacts can be seeded and used for review practice.
- [ ] Human testers completed the Day 1, Day 2, bonus, accessibility, and content-review passes below.
- [ ] All blocking findings have a fix, owner, or written release exception.

## Source Of Truth

The following table lists each release artifact and the document that controls it.

| Area | Source document |
|---|---|
| Classroom deployment | [classroom/README.md](classroom/README.md) |
| Classroom copy-paste setup pack | [admin/classroom/README.md](admin/classroom/README.md) |
| Human challenge walkthrough | [classroom/HUMAN_TEST_MATRIX.md](classroom/HUMAN_TEST_MATRIX.md) |
| Facilitator operations | [admin/FACILITATOR_OPERATIONS.md](admin/FACILITATOR_OPERATIONS.md) |
| Facilitator guide | [admin/FACILITATOR_GUIDE.md](admin/FACILITATOR_GUIDE.md) |
| Student challenge hub | [docs/CHALLENGES.md](docs/CHALLENGES.md) |
| Podcast pipeline | [podcasts/README.md](podcasts/README.md) |
| Podcast regeneration runbook | [podcasts/REGENERATION.md](podcasts/REGENERATION.md) |
| Post-workshop cleanup | [classroom/teardown-checklist.md](classroom/teardown-checklist.md) |

## Roles

- **Release owner:** owns the final go or no-go decision.
- **Classroom tester:** creates assignments, accepts invites with a test student account, and validates repository creation.
- **Automation tester:** checks workflows, seeding scripts, Aria feedback, progression, and autograding.
- **Accessibility tester:** tests with NVDA, JAWS, VoiceOver, keyboard-only navigation, zoom, and high contrast where available.
- **Curriculum tester:** reads chapters, appendices, challenge templates, solutions, and facilitator instructions for accuracy and consistency.
- **Podcast tester:** validates podcast scripts, transcripts, RSS metadata, and audio availability if audio has been generated.

One person may hold multiple roles, but the release owner should not be the only human tester.

## Phase 1: Local Repository Health

Run these commands from the repository root.

```powershell
npm run test:automation
npm run validate:podcasts
npm run validate:podcast-feed
npm run build:html
git diff --check
```

Expected results:

- `npm run test:automation` reports all tests passing.
- `npm run validate:podcasts` reports 54 catalog episodes and passes.
- `npm run validate:podcast-feed` passes. If audio files have not been generated yet, the transcript-only warning is acceptable.
- `npm run build:html` completes without errors.
- `git diff --check` has no trailing-whitespace or conflict-marker errors. On Windows, LF-to-CRLF warnings may appear and are not release blockers by themselves.

Record the command output summary in the release notes or QA issue.

## Phase 2: Content Inventory Review

Every content file must be reviewed before go-live. Use this checklist to assign coverage.

- [ ] Root docs: [README.md](README.md), [BUILD.md](BUILD.md), [REGISTER.md](REGISTER.md), [CONTRIBUTING.md](CONTRIBUTING.md), [SECURITY.md](SECURITY.md), [REPOSITORY_SECURITY.md](REPOSITORY_SECURITY.md).
- [ ] Student onboarding: [docs/get-going.md](docs/get-going.md), [docs/course-guide.md](docs/course-guide.md), and [docs/student-onboarding.md](docs/student-onboarding.md).
- [ ] Core chapters: [docs/00-pre-workshop-setup.md](docs/00-pre-workshop-setup.md) through [docs/21-next-steps.md](docs/21-next-steps.md).
- [ ] Appendices: [docs/appendix-a-glossary.md](docs/appendix-a-glossary.md) through [docs/appendix-z-github-skills.md](docs/appendix-z-github-skills.md).
- [ ] Challenge hub: [docs/CHALLENGES.md](docs/CHALLENGES.md).
- [ ] Challenge solutions: all files in [docs/solutions](docs/solutions/README.md).
- [ ] Learning Room template docs: all Markdown files under [learning-room](learning-room/README.md).
- [ ] Issue templates: all files under `learning-room/.github/ISSUE_TEMPLATE/`.
- [ ] Student automation guides: all Markdown files under `learning-room/.github/`.
- [ ] Facilitator guides: all Markdown files under [admin](admin/README.md) and [admin/classroom](admin/classroom/README.md).
- [ ] Classroom setup artifacts: all Markdown, JSON, CSV, and YAML files under [classroom](classroom/README.md).
- [ ] Podcast docs, scripts, manifests, transcripts, and generated site metadata under [podcasts](podcasts/README.md).
- [ ] Generated HTML under `html/` after `npm run build:html`.

For each file, verify:

- [ ] The title matches the current GitHub Classroom model.
- [ ] The file does not tell students they are working in a single shared repository unless it is explicitly discussing legacy history.
- [ ] Branch names use the current conventions: `learn/<username>` for the Day 1 practice branch, or short-lived `fix/...` branches for focused PR exercises.
- [ ] Challenge numbers, titles, and evidence requirements match [docs/CHALLENGES.md](docs/CHALLENGES.md).
- [ ] Links resolve or are intentionally broken practice targets in the Learning Room template.
- [ ] Instructions are concise enough for a facilitator to read aloud.
- [ ] Screen reader steps avoid visual-only wording when a keyboard or structural path is available.
- [ ] Tables have a preceding sentence explaining what they contain.
- [ ] Diagrams, images, and SVGs have nearby text alternatives in the surrounding documentation.

## Phase 3: Classroom Deployment Dry Run

Use a real GitHub Classroom with disposable test accounts. Do not use a facilitator account as the student account.

### Organization And Template Readiness

- [ ] Confirm the classroom organization exists and facilitators have owner or admin access.
- [ ] Confirm `Community-Access/learning-room-template` exists and is the template repository selected for both assignments.
- [ ] Confirm GitHub Actions is enabled for the template repository.
- [ ] Confirm `GITHUB_TOKEN` has read and write permissions in the template repository settings.
- [ ] Confirm Actions can create and approve pull requests if Classroom feedback PRs are used.
- [ ] Confirm the Learning Room template includes `.github/workflows/pr-validation-bot.yml`.
- [ ] Confirm the Learning Room template includes `.github/workflows/student-progression.yml`.
- [ ] Confirm the Learning Room template includes all autograder workflows.
- [ ] Confirm the Learning Room template includes all challenge issue templates and bonus templates.

### Day 1 Assignment

- [ ] Create the Day 1 assignment using [classroom/assignment-day1-you-belong-here.md](classroom/assignment-day1-you-belong-here.md).
- [ ] Use private individual repositories.
- [ ] Enable feedback pull requests.
- [ ] Add every Day 1 autograding test from [classroom/autograding-day1.json](classroom/autograding-day1.json).
- [ ] Save the Day 1 invite link.
- [ ] Accept the invite with a test student account.
- [ ] Confirm the student repository appears in the Classroom dashboard.
- [ ] Confirm the repository name follows the expected pattern.
- [ ] Confirm the template files copied correctly.
- [ ] Seed Challenge 1:

```powershell
scripts/classroom/Seed-LearningRoomChallenge.ps1 -Repository Community-Access-Classroom/learning-room-test-student -Challenge 1 -Assignee test-student
```

- [ ] Confirm Challenge 1 appears in the student repository.

### Day 2 Assignment

- [ ] Create the Day 2 assignment using [classroom/assignment-day2-you-can-build-this.md](classroom/assignment-day2-you-can-build-this.md).
- [ ] Use private individual repositories.
- [ ] Enable feedback pull requests.
- [ ] Add every Day 2 autograding test from [classroom/autograding-day2.json](classroom/autograding-day2.json).
- [ ] Save the Day 2 invite link.
- [ ] Accept the invite with the test student account.
- [ ] Confirm the Day 2 repository appears in the Classroom dashboard.
- [ ] Seed Challenge 10:

```powershell
scripts/classroom/Seed-LearningRoomChallenge.ps1 -Repository Community-Access-Classroom/learning-room-test-student-day2 -Challenge 10 -Assignee test-student
```

- [ ] Confirm Challenge 10 appears in the student repository.

## Phase 4: Workflow And Automation QA

Run these checks in disposable student repositories created by GitHub Classroom.

### Aria PR Validation Bot

- [ ] Open a PR with a clear title, body, and `Closes #N` reference.
- [ ] Confirm the first-time contributor welcome comment appears on the first PR.
- [ ] Confirm the PR Validation Report appears or updates within 60 seconds.
- [ ] Push another commit and confirm the existing validation comment updates instead of duplicating.
- [ ] Add an intentional issue, such as vague link text, and confirm the bot explains the problem.
- [ ] Fix the issue and confirm the validation result improves.
- [ ] Comment `@aria-bot help` and confirm the help responder answers.
- [ ] Comment with `merge conflict` and confirm the conflict guidance appears.
- [ ] Confirm bot-authored comments do not trigger an infinite response loop.

### Student Progression Bot

- [ ] Close Challenge 1 and confirm Challenge 2 appears.
- [ ] Continue closing challenges until Challenge 9 appears.
- [ ] Seed Challenge 10 and confirm the Day 2 sequence starts correctly.
- [ ] Close Challenge 10 and confirm Challenge 11 appears.
- [ ] Confirm duplicate challenge issues are not created if the workflow reruns.
- [ ] Confirm the assigned user is correct on each generated challenge.
- [ ] Confirm each generated challenge links to the right chapter and solution reference.

### Autograders

- [ ] Challenge 4 branch test passes when a non-default branch exists.
- [ ] Challenge 5 commit test passes when the student commits a real file change.
- [ ] Challenge 6 PR test passes when the PR references the correct issue.
- [ ] Challenge 7 conflict test fails while conflict markers remain.
- [ ] Challenge 7 conflict test passes after conflict markers are removed.
- [ ] Challenge 9 merge/readiness checks report useful results.
- [ ] Challenge 10 local commit test passes after clone, branch, commit, and push.
- [ ] Challenge 14 template test validates a structured issue template.
- [ ] Challenge 16 capstone test validates the required agent contribution evidence.

### Seeding Scripts

- [ ] `Seed-LearningRoomChallenge.ps1` creates the requested starting challenge.
- [ ] `Seed-PeerSimulation.ps1` creates the peer simulation issues, branch, file, and PR.
- [ ] `Start-MergeConflictChallenge.ps1` creates a real conflict against the student branch.
- [ ] `Test-LearningRoomTemplate.ps1` reports the template readiness state.
- [ ] Script failures show a clear error message and do not partially hide the problem.

## Phase 5: Human Challenge Walkthrough

Use [classroom/HUMAN_TEST_MATRIX.md](classroom/HUMAN_TEST_MATRIX.md) as the detailed scenario list. This section is the go-live summary gate.

### Day 1 Core Path

- [ ] Challenge 1: Find Your Way Around.
- [ ] Challenge 2: File Your First Issue.
- [ ] Challenge 3: Join the Conversation.
- [ ] Challenge 4: Branch Out.
- [ ] Challenge 5: Make Your Mark.
- [ ] Challenge 6: Open Your First Pull Request.
- [ ] Challenge 7: Survive a Merge Conflict.
- [ ] Challenge 8: The Culture Layer.
- [ ] Challenge 9: Merge Day.

### Day 2 Core Path

- [ ] Challenge 10: Go Local.
- [ ] Challenge 11: Open a Day 2 PR.
- [ ] Challenge 12: Review Like a Pro.
- [ ] Challenge 13: AI as Your Copilot.
- [ ] Challenge 14: Template Remix.
- [ ] Challenge 15: Meet the Agents.
- [ ] Challenge 16: Build Your Agent.

### Bonus Path

- [ ] Bonus A: Improve an Agent.
- [ ] Bonus B: Document Your Journey.
- [ ] Bonus C: Group Challenge.
- [ ] Bonus D: Notifications.
- [ ] Bonus E: Git History.

For each challenge, record:

- [ ] The issue appeared at the expected time.
- [ ] The issue instructions were understandable without facilitator translation.
- [ ] The linked chapter helped complete the task.
- [ ] The evidence prompt was clear.
- [ ] The bot or autograder response was useful.
- [ ] The next challenge unlocked correctly.
- [ ] The reference solution matched the challenge.

## Phase 6: Accessibility QA

Run accessibility testing with at least one screen reader and one keyboard-only tester. Use more assistive technology coverage when possible.

- [ ] NVDA with Firefox or Chrome: complete Challenge 1, Challenge 6, Challenge 7, and one Day 2 challenge.
- [ ] JAWS with Chrome or Edge: complete issue creation, PR creation, review, and merge checks.
- [ ] VoiceOver with Safari or Chrome: accept Classroom invite, navigate repo, edit file, and read PR diff.
- [ ] Keyboard-only: complete invite acceptance, issue creation, PR creation, and review submission without a mouse.
- [ ] Low vision: verify 200 percent zoom, high contrast, browser zoom, and focus visibility across GitHub, docs, and generated HTML.
- [ ] Confirm all critical links have descriptive text.
- [ ] Confirm all tables in docs have a preceding explanation.
- [ ] Confirm images and diagrams have meaningful surrounding text or alt text.
- [ ] Confirm generated HTML task-list checkboxes are not duplicated.
- [ ] Confirm conflict-marker examples render as examples and do not break Git diff checks.

## Phase 7: Podcast And Audio QA

The podcast material is part of the release. Test it even if audio has not been regenerated yet.

- [ ] `npm run validate:podcasts` passes.
- [ ] `npm run validate:podcast-feed` passes.
- [ ] Podcast catalog lists 54 companion episodes.
- [ ] Challenge Coach bundles exist for all 16 core challenges and 5 bonus challenges.
- [ ] Each chapter and appendix points to the intended podcast entry.
- [ ] Transcript scripts avoid stale shared-repository boilerplate.
- [ ] Speaker markers are consistent in generated scripts.
- [ ] RSS feed state is documented: transcript-only or audio-ready.
- [ ] If audio exists, every MP3 enclosure URL resolves.
- [ ] If audio exists, a human tester listens to a sample from Day 1, Day 2, appendices, and Challenge Coach.
- [ ] Podcast instructions do not contradict the current private Learning Room model.

## Phase 8: Facilitator Dry Run

Run this as a timed rehearsal before student testing.

- [ ] Facilitator can find this guide from [README.md](README.md), [admin/README.md](admin/README.md), and [classroom/README.md](classroom/README.md).
- [ ] Facilitator can explain the architecture in under 2 minutes.
- [ ] Facilitator can create Assignment 1 without guessing any setting.
- [ ] Facilitator can create Assignment 2 without guessing any setting.
- [ ] Facilitator can seed Challenge 1 and Challenge 10 from PowerShell.
- [ ] Facilitator can seed peer simulation artifacts.
- [ ] Facilitator can start a merge conflict challenge.
- [ ] Facilitator can read Aria feedback and decide whether it is correct.
- [ ] Facilitator can override or manually support a student if automation fails.
- [ ] Facilitator can explain how Day-2-only participants enter the course.
- [ ] Facilitator can explain what to do when a student joins late.
- [ ] Facilitator can run post-workshop teardown.

## Issue Severity

The following table defines release-blocking severity levels.

| Severity | Meaning | Release action |
|---|---|---|
| Blocker | Prevents assignment creation, repository creation, challenge progression, PR validation, accessibility use, or student safety | Fix before release |
| High | Causes confusing instructions, broken links in required paths, wrong challenge evidence, or broken generated content | Fix before release unless release owner approves exception |
| Medium | Causes friction but has a clear workaround | Fix before or immediately after release |
| Low | Typo, minor wording, or non-blocking polish | Fix when practical |

## QA Evidence Log Template

Copy this template into a release issue or testing document.

```markdown
## QA Evidence Log

Release candidate:
Date:
Release owner:
Classroom tester:
Automation tester:
Accessibility tester:
Curriculum tester:
Podcast tester:

### Automated Checks
- npm run test:automation:
- npm run validate:podcasts:
- npm run validate:podcast-feed:
- npm run build:html:
- git diff --check:

### Classroom Dry Run
- Day 1 assignment URL:
- Day 2 assignment URL:
- Test student account:
- Day 1 test repository:
- Day 2 test repository:

### Human Walkthrough
- Day 1 challenges completed:
- Day 2 challenges completed:
- Bonus challenges completed:
- Accessibility coverage:
- Podcast coverage:

### Findings
| ID | Severity | Area | Finding | Owner | Status |
|---|---|---|---|---|---|

### Release Decision
- [ ] Go
- [ ] No-go
- Notes:
```

## Final Go-Live Checklist

- [ ] All required automated checks passed.
- [ ] All required Classroom dry-run checks passed.
- [ ] Human testers completed Day 1, Day 2, bonus, accessibility, and podcast coverage.
- [ ] No open Blocker findings remain.
- [ ] No open High findings remain without written release-owner exception.
- [ ] Invite links are stored in the facilitator runbook and student communications.
- [ ] Facilitators know how to seed Challenge 1 and Challenge 10.
- [ ] Facilitators know how to recover when Aria, progression, or autograding fails.
- [ ] Student-facing instructions match the current GitHub Classroom private-repository model.
- [ ] Generated HTML and podcast site have been rebuilt from the final sources.
- [ ] Release owner has recorded the final decision.