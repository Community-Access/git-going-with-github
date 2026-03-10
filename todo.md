# Curriculum v2 Build Tracker

Master checklist for the curriculum reorganization. Tracks every task across all 8 phases.
See [docs/REORGANIZATION-PLAN.md](docs/REORGANIZATION-PLAN.md) for the full rationale behind each item.

**Branch:** `build/curriculum-v2`
**Started:** 2026-03-09

---

## Phase 1: Scaffold (Week 1)

Create new files, rename existing files, update all internal links. Structurally complete, content-thin in new chapters.

- [x] Create Ch01 stub (`01-choose-your-tools.md`)
- [x] Create Ch13 stub (`13-how-git-works.md`)
- [x] Create Ch18 stub (`18-fork-and-contribute.md`)
- [x] Create Ch20 stub (`20-build-your-agent.md`)
- [x] Create Ch21 stub (`21-next-steps.md`)
- [x] Split Ch05 into Ch11 (`11-vscode-interface.md`, Sections 1-11) + Ch12 (`12-vscode-accessibility.md`, Sections 12-18)
- [x] Merge Ch12 + Ch14 into Ch15 (`15-code-review.md`)
- [x] Rename `01-understanding-github-web-structure.md` to `02-understanding-github.md`
- [x] Rename `02-navigating-repositories.md` to `03-navigating-repositories.md`
- [x] Rename `03-the-learning-room.md` to `04-the-learning-room.md`
- [x] Rename `04-working-with-issues.md` to `05-working-with-issues.md`
- [x] Keep `06-working-with-pull-requests.md` (same number)
- [x] Keep `07-merge-conflicts.md` (same number)
- [x] Rename `08-culture-etiquette.md` to `08-open-source-culture.md`
- [x] Keep `09-labels-milestones-projects.md` (same number)
- [x] Rename `10-notifications.md` to `10-notifications-and-day-1-close.md`
- [x] Rename `11-git-source-control.md` to `14-git-in-practice.md`
- [x] Rename `13-github-copilot.md` to `16-github-copilot.md`
- [x] Rename `15-issue-templates.md` to `17-issue-templates.md`
- [x] Rename `16-accessibility-agents.md` to `19-accessibility-agents.md`
- [x] Merge stub appendices: R + S + AE into `appendix-t-community-and-social.md`
- [x] Merge stub appendices: G + F into `appendix-u-discussions-and-gists.md`
- [x] Merge stub appendices: W + X into `appendix-k-copilot-reference.md`
- [x] Absorb `appendix-t-contributing-to-open-source.md` into Ch08
- [x] Rename `appendix-e-github-flavored-markdown.md` to `appendix-c-markdown-reference.md`
- [x] Rename `appendix-aa-advanced-git.md` to `appendix-e-advanced-git.md`
- [x] Rename `appendix-ad-git-security.md` to `appendix-f-git-security.md`
- [x] Rename `appendix-m-vscode-accessibility-reference.md` to `appendix-g-vscode-reference.md`
- [x] Rename `appendix-ab-github-desktop.md` to `appendix-h-github-desktop.md`
- [x] Rename `appendix-ac-github-cli.md` to `appendix-i-github-cli.md`
- [x] Rename `appendix-n-github-codespaces.md` to `appendix-j-cloud-editors.md`
- [x] Rename `appendix-v-accessibility-agents-reference.md` to `appendix-l-agents-reference.md`
- [x] Rename `appendix-c-accessibility-standards.md` to `appendix-m-accessibility-standards.md`
- [x] Rename `appendix-j-advanced-search.md` to `appendix-n-advanced-search.md`
- [x] Rename `appendix-k-branch-protection-rulesets.md` to `appendix-o-branch-protection.md`
- [x] Rename `appendix-l-github-security-features.md` to `appendix-p-security-features.md`
- [x] Retitle `appendix-q-github-actions-workflows.md` to `appendix-q-actions-workflows.md`
- [x] Rename `appendix-i-github-projects.md` to `appendix-r-projects-deep-dive.md`
- [x] Rename `appendix-h-releases-tags-insights.md` to `appendix-s-releases-tags-insights.md`
- [x] Rename `appendix-o-github-mobile.md` to `appendix-v-github-mobile.md`
- [x] Rename `appendix-p-github-pages.md` to `appendix-w-github-pages.md`
- [x] Rename `appendix-u-resources.md` to `appendix-x-resources.md`
- [x] Retitle `appendix-y-accessing-workshop-materials.md` to `appendix-y-workshop-materials.md`
- [x] Retitle `appendix-z-github-skills-catalog.md` to `appendix-z-github-skills.md`
- [x] Delete merged source files (appendix-t, appendix-x, appendix-r, appendix-s, appendix-ae, appendix-f, 12-github-pull-requests-extension, 14-accessible-code-review)
- [x] Update `course-guide.md` with new chapter/appendix numbers
- [x] Grep for all old filenames, fix cross-references
- [x] Verify no broken links

---

## Phase 2: New Chapter Content (Weeks 2-3)

Write the five new chapters with full content, learning cards, tool cards, and failsafe sections.

- [ ] Ch01: Choose Your Adventure -- tool tour with confidence exercises
- [ ] Ch13: How Git Works -- mental model from Pro Git book
- [ ] Ch18: Fork and Contribute -- end-to-end fork workflow walkthrough
- [ ] Ch20: Build Your Agent -- capstone phases (from classroom plan)
- [ ] Ch21: What Comes Next -- graduation, portfolio, roadmap

---

## Phase 3: Expand Existing Chapters (Weeks 3-4)

Fill content gaps in existing chapters.

- [ ] Ch05: Add "Writing Effective Issues" section
- [ ] Ch06: Add "Writing PR Descriptions That Get Reviewed" section
- [ ] Ch08: Absorb App T content + add "Writing Your First README" + "Community Health Files"
- [ ] Ch10: Add "What You Accomplished Today" recap + "What Day 2 Adds" preview
- [ ] Ch12: Add "Markdown Authoring in VS Code" section
- [ ] Ch15: Add "The Reviewer's Craft" section
- [ ] Ch16: Add "Critically Evaluating AI Output" section

---

## Phase 4: Learning Cards (Weeks 4-6)

Add tri-audience learning cards to every major section. Target: 250-300 card sets.

- [ ] Chapters 00-10 (Day 1)
- [ ] Chapters 11-21 (Day 2)
- [ ] Appendices A-F (Core + Git)
- [ ] Appendices G-L (VS Code + Copilot)
- [ ] Appendices M-S (GitHub Platform)
- [ ] Appendices T-Z (Community + Continuing)

---

## Phase 5: Tool Cards and Failsafe Sections (Weeks 5-7)

Add multi-tool-path cards and failsafe sections to every chapter.

- [ ] Tool cards in all Day 1 chapters
- [ ] Tool cards in all Day 2 chapters
- [ ] Failsafe "If You Get Stuck" tables in all 22 chapters
- [ ] Verify all tool cards cover: github.com, github.dev, VS Code, GitHub Desktop, CLI

---

## Phase 6: Cross-Linking and Attribution (Weeks 7-8)

Wire everything together with navigation and authoritative sources.

- [ ] Add header blocks (related appendices, authoritative sources) to all chapters
- [ ] Add header blocks (teaching chapter, authoritative sources) to all appendices
- [ ] Add footer navigation (prev/next + related) to all files
- [ ] Add inline forward/back refs throughout all chapters
- [ ] Add challenge references to relevant chapters
- [ ] Verify all authoritative source URLs are live

---

## Phase 7: Classroom Integration (Weeks 8-10)

Update classroom delivery, create all challenge artifacts, verify complete student flow.

### Classroom document updates

- [ ] Update challenge-to-chapter mapping in classroom.md
- [ ] Verify all evidence templates reference correct chapter numbers
- [ ] Update facilitator deployment checklist
- [ ] Update podcast episode references

### Challenge issue templates (learning-room)

- [ ] Create 16 core challenge YAML issue templates (`challenge-01` through `challenge-16`)
- [ ] Create 5 bonus challenge YAML issue templates (`bonus-a` through `bonus-e`)
- [ ] Each template: instructions, evidence prompt, buddy check, "If You Get Stuck" link
- [ ] Test: generate issues from every template with dummy account

### Starter and sample files (learning-room)

- [ ] Audit `docs/welcome.md` TODOs for Challenges 2 and 5
- [ ] Rename `docs/samples/chapter-15-registration-remix-example.yml` for Challenge 14
- [ ] Create `docs/samples/copilot-improvement-before.md` for Challenge 13
- [ ] Create `docs/samples/agent-file-template.md` for Challenge 16
- [ ] Create `docs/samples/fork-workflow-checklist.md` for Challenge 16
- [ ] Update `docs/CHALLENGES.md` with new numbering and solution links

### Autograding workflows (learning-room)

- [ ] Create `autograder-conflicts.yml` for Challenge 7
- [ ] Create `autograder-local-commit.yml` for Challenge 10
- [ ] Create `autograder-template.yml` for Challenge 14
- [ ] Create `autograder-capstone.yml` for Challenge 16 (accessibility-agents repo)
- [ ] Update `pr-validation-bot.yml` to be challenge-aware
- [ ] Test: push deliberate failures -- error messages are educational
- [ ] Test: push correct submissions -- pass messages are celebratory

### Solution files (git-going-with-github)

- [ ] Create `docs/solutions/` directory
- [ ] Create 16 core solution files (`solution-01` through `solution-16`)
- [ ] Create 5 bonus solution files (`solution-bonus-a` through `solution-bonus-e`)
- [ ] Each solution: annotated artifact, multiple valid approaches, accessible formatting
- [ ] Add solution links to every chapter "If You Get Stuck" table
- [ ] Add solution links to CHALLENGES.md expandable sections
- [ ] Verify all solution URLs resolve

### GitHub Skills integration (Day 2)

- [ ] Add Introduction to Git course link (Day 2, Block 1, supports Ch14)
- [ ] Add Getting Started with GitHub Copilot course link (Day 2, Block 2, supports Ch16)
- [ ] Add Copilot Code Review course link (Day 2, Block 3, supports Ch15)
- [ ] Add Mona Bridge callout boxes to Chapters 14, 15, 16
- [ ] Update Appendix Z courses table from 3 to 6
- [ ] Update DAY2_AGENDA.md with GitHub Skills setup instructions

### End-to-end verification

- [ ] Create dummy student GitHub account
- [ ] Run complete Day 1 flow: Challenges 1-9
- [ ] Run complete Day 2 flow: Challenges 10-16
- [ ] Verify all 4 autograded challenges pass/fail correctly
- [ ] Verify all 21 solution file URLs accessible from chapter text
- [ ] Verify all 6 GitHub Skills courses launch correctly
- [ ] Update learning-room template repo to match new structure

---

## Phase 8: GitHub Classroom Artifacts and Supplementary Rebuild (Weeks 10-12)

All supplementary files rewritten AFTER chapter/appendix content is final.

### GitHub Classroom setup artifacts (`classroom/`)

- [ ] Create `classroom/README.md` -- setup guide
- [ ] Create `classroom/assignment-day1-you-belong-here.md`
- [ ] Create `classroom/assignment-day2-you-can-build-this.md`
- [ ] Create `classroom/autograding-day1.json`
- [ ] Create `classroom/autograding-day2.json`
- [ ] Create `classroom/roster-template.csv`
- [ ] Create `classroom/cohort-checklist.md`
- [ ] Create `classroom/teardown-checklist.md`
- [ ] Create `classroom/scripts/export-grades.sh`
- [ ] Create `classroom/scripts/clone-student-repos.sh`
- [ ] Create `classroom/scripts/verify-template.sh`
- [ ] Create `classroom/scripts/archive-cohort.sh`
- [ ] Test: create test classroom, paste both descriptions, verify autograding
- [ ] Test: run all 4 scripts against test classroom

### Workshop operations files (root) -- rewrite all 29

- [ ] Rewrite `DAY1_AGENDA.md`
- [ ] Rewrite `DAY2_AGENDA.md`
- [ ] Rewrite `FACILITATOR.md`
- [ ] Rewrite `FACILITATOR_ASSESSMENT.md`
- [ ] Rewrite `FACILITATOR_CHALLENGES.md`
- [ ] Rewrite `FAQ.md`
- [ ] Rewrite `TROUBLESHOOTING.md`
- [ ] Rewrite `QUICK_REFERENCE.md`
- [ ] Rewrite `CONTRIBUTING.md`
- [ ] Rewrite `BUILD.md`
- [ ] Rewrite `REGISTER.md`
- [ ] Rewrite `REGISTRATION-ADMIN.md`
- [ ] Rewrite `ENROLLMENT_SUMMARY.md`
- [ ] Rewrite `STUDENT_MANAGEMENT.md`
- [ ] Rewrite `PROGRESS_TRACKER.md`
- [ ] Rewrite `WORKSHOP_READINESS.md`
- [ ] Rewrite `PODCASTS.md`
- [ ] Rewrite `ANNOUNCEMENT.md`
- [ ] Rewrite `ACCESSIBILITY_TESTING.md`
- [ ] Rewrite `ADMIN_TEST_PLAN.md`
- [ ] Rewrite `CHALLENGE_SYSTEM_ARCHITECTURE.md`
- [ ] Rewrite `LEARNING_ROOM_AUTOMATION_SUMMARY.md`
- [ ] Rewrite `docs/course-guide.md`
- [ ] Review `CODE_OF_CONDUCT.md`, `SECURITY.md`, `REPOSITORY_SECURITY.md`
- [ ] Evaluate `GITHUB_PROPOSAL.md`, `COMING_SOON.md`, `COMPREHENSIVE_VALIDATION_AUDIT.md` for deletion

### Learning-room guide files -- rewrite all 6

- [ ] Rewrite `learning-room/.github/FACILITATOR_GUIDE.md`
- [ ] Rewrite `learning-room/.github/SETUP_AND_MAINTENANCE.md`
- [ ] Rewrite `learning-room/.github/IMPLEMENTATION_GUIDE.md`
- [ ] Rewrite `learning-room/.github/DEPLOYMENT_VALIDATION.md`
- [ ] Rewrite `learning-room/.github/STUDENT_GUIDE.md`
- [ ] Rewrite `learning-room/.github/LEARNING_PATHS.md`

### Learning-room validation scripts -- rewrite all 6

- [ ] Rewrite `learning-room/.github/scripts/validate-pr.js`
- [ ] Rewrite `learning-room/.github/scripts/validation-report.js`
- [ ] Rewrite `learning-room/.github/scripts/comment-responder.js`
- [ ] Rewrite `learning-room/.github/scripts/check_links.py`
- [ ] Rewrite `learning-room/.github/scripts/check_markdown.py`
- [ ] Rewrite `learning-room/.github/scripts/check_accessibility.py`

### Main repo workflows -- rewrite or review all 11

- [ ] Rewrite `.github/workflows/learning-room-pr-bot.yml`
- [ ] Rewrite `.github/workflows/learning-room-validation.yml`
- [ ] Rewrite `.github/workflows/skills-progression.yml`
- [ ] Rewrite `.github/workflows/student-grouping.yml`
- [ ] Rewrite `.github/workflows/automation-tests.yml`
- [ ] Rewrite `.github/workflows/build-epub.yml`
- [ ] Rewrite `.github/workflows/deploy-pages.yml`
- [ ] Rewrite `.github/workflows/sync-docs-to-wiki.yml`
- [ ] Review `.github/workflows/registration.yml`
- [ ] Review `.github/workflows/create-release.yml`
- [ ] Review `.github/workflows/generate-diagram-svgs.yml`

### Main repo data files and issue templates

- [ ] Rewrite `.github/data/challenge-progression.json`
- [ ] Rewrite `.github/data/student-roster.json`
- [ ] Rewrite `.github/data/progress-tracker-template.json`
- [ ] Rewrite `.github/ISSUE_TEMPLATE/challenge-hub.md`
- [ ] Rewrite `.github/ISSUE_TEMPLATE/feedback-workshop.yml`
- [ ] Review all other issue templates for stale references

### Test suite -- rewrite all 6

- [ ] Delete + replace `validate-pr.chapter4.test.js`
- [ ] Delete + replace `validate-pr.chapter5-6-11.test.js`
- [ ] Rewrite `validate-pr.edge-cases.test.js`
- [ ] Rewrite `validation-integration.test.js`
- [ ] Rewrite `validation-report.test.js`
- [ ] Rewrite `comment-responder.test.js`

### Podcast system

- [ ] Rewrite `podcasts/manifest.json`
- [ ] Regenerate `podcasts/feed.xml`
- [ ] Review transcripts for old chapter title references
- [ ] Review build scripts for chapter path references

### Final verification

- [ ] Run `npm test` -- all suites pass
- [ ] Run `build-epub` workflow -- valid ePub produced
- [ ] Run `deploy-pages` workflow -- site builds, all links resolve
- [ ] Open test PR in learning-room -- bot responds correctly
- [ ] Verify all supplementary files use new chapter/appendix/challenge numbers only
- [ ] Grep entire repo for old chapter numbers and old appendix letters -- zero hits
