# Repository Automation

This directory contains workflows, scripts, and data for two purposes:

1. **Curriculum repository CI/CD** -- workflows that build, test, and deploy this documentation project
2. **Legacy shared-model automation** -- PR validation and progression workflows from the original shared-repository workshop model

The student-facing automation (Aria bot, student progression, autograders) lives in the **template repository** directory at `learning-room/.github/`. GitHub Classroom copies that template to each student's individual repo. See [classroom/README.md](../classroom/README.md) for the full deployment guide.

---

## Curriculum Workflows

These workflows operate on this repository itself:

| Workflow | Purpose |
|----------|---------|
| `automation-tests.yml` | Runs the automated test suite |
| `build-epub.yml` | Builds ePub version of workshop content |
| `create-release.yml` | Creates tagged releases |
| `deploy-pages.yml` | Deploys content to GitHub Pages |
| `generate-diagram-svgs.yml` | Converts diagram sources to SVG |
| `registration.yml` | Processes student registration |
| `sync-docs-to-wiki.yml` | Syncs documentation to the repository wiki |

---

## Legacy Shared-Model Workflows

These workflows were designed for the original shared-repository workshop model. They remain in the repository for reference but are **not used** in the current GitHub Classroom deployment model.

| Workflow | Original Purpose |
|----------|-----------------|
| `learning-room-pr-bot.yml` | PR validation and educational feedback in the shared repo |
| `learning-room-validation.yml` | Content validation for learning-room changes |
| `skills-progression.yml` | Progress tracking and badge awards in the shared repo |
| `student-grouping.yml` | Automated peer review assignment and study groups |

The Classroom model equivalents live in [learning-room/.github/workflows/](../learning-room/.github/workflows/):

| Workflow | Purpose |
|----------|---------|
| `pr-validation-bot.yml` | Aria bot -- validates PRs and provides educational feedback |
| `student-progression.yml` | Creates Challenge 1 or Challenge 10 when triggered, then unlocks the next challenge issue when a student closes the current one |
| `skills-progression.yml` | Posts achievement and progress feedback |
| `autograder-conflicts.yml` | Validates merge conflict resolution (Challenge 07) |
| `autograder-local-commit.yml` | Validates local Git commit (Challenge 10) |
| `autograder-template.yml` | Validates issue template creation (Challenge 14) |
| `autograder-capstone.yml` | Validates capstone challenge (Challenge 16) |
| `content-validation.yml` | Validates Markdown content quality |

---

## Scripts

| Script | Purpose |
|--------|---------|
| `validate-pr.js` | Node.js validation logic called by PR bot workflows |
| `comment-responder.js` | Responds to `@aria-bot` mentions and help keywords |
| `validation-report.js` | Generates structured validation reports |
| `__tests__/` | Test suite for the scripts above |

---

## Data Files

| File | Purpose |
|------|---------|
| `challenge-progression.json` | Skill levels, badges, and milestone definitions |
| `student-roster.json` | Student information template (update per cohort) |
| `peer-reviewer-assignments.json` | Peer review pairing template |
| `progress-tracker-template.json` | Progress tracking template |
| `registrations.csv` | Registration data |
| `student-emails.csv` | Student contact information |
| `welcome-email.txt` | Welcome email template |
| `student-sync-report.txt` | Sync report output |

---

## Quick Links

- [Workshop Deployment Guide](../classroom/README.md) -- full setup using GitHub Classroom
- [Support Hub](https://github.com/Community-Access/git-going-open-support) -- post-workshop support and async Q&A
- [Template Repository Content](../learning-room/.github/) -- automation that runs in each student's repo
- [Student Guide](../learning-room/.github/STUDENT_GUIDE.md) -- how students interact with Aria bot
- [Challenge Progression Config](data/challenge-progression.json) -- level and badge definitions
