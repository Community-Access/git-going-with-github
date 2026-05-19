
**Table: Learning Room workflow automation and triggers**

**Table: Key documentation files for Learning Room automation**

# Learning Room Template: Implementation Guide

> **For full workshop deployment instructions, see
> [classroom/README.md](../../classroom/README.md).** That guide covers creating
> the GitHub Classroom, configuring assignments, and all facilitator setup steps.
>
> This document describes the automation that ships with the template repository
> and how to customize it.

---

## What This Template Contains

When a student accepts a GitHub Classroom assignment, they receive a private copy
of this repository. The following automation runs in each student's repo
automatically:

### Workflows (in `.github/workflows/`)

| Workflow | Trigger | What It Does |
|----------|---------|-------------|
| `pr-validation-bot.yml` | PR opened, edited, reviewed | Gandalf bot -- welcomes first-timers, validates PR structure, provides educational feedback |
| `content-validation.yml` | PR opened, edited | Checks links, Markdown structure, and accessibility |
| `student-progression.yml` | Workflow dispatch, issue closed | Creates the first challenge when triggered and unlocks the next challenge issue in sequence |
| `skills-progression.yml` | PR merged | Posts achievement and progress feedback |
| `autograder-conflicts.yml` | PR opened, edited | Validates merge conflict resolution (Challenge 07) |
| `autograder-local-commit.yml` | Push to branch | Validates local Git commit (Challenge 10) |
| `autograder-template.yml` | Issues created | Validates issue template creation (Challenge 14) |
| `autograder-capstone.yml` | PR opened | Validates capstone challenge (Challenge 16) |

### Scripts (in `.github/scripts/`)

| Script | Called By | Purpose |
|--------|----------|---------|
| `validate-pr.js` | `pr-validation-bot.yml` | PR requirement checks (issue reference, description, file location) |
| `validation-report.js` | `content-validation.yml` | Structured feedback formatting |
| `comment-responder.js` | `pr-validation-bot.yml` | Responds to `@gandalf-bot` mentions and help keywords |
| `check_links.py` | `content-validation.yml` | Link validation |
| `check_markdown.py` | `content-validation.yml` | Markdown structure validation |
| `check_accessibility.py` | `content-validation.yml` | Accessibility checks (headings, alt text, link text) |

### Challenge Issue Templates (in `.github/ISSUE_TEMPLATE/`)

21 challenge templates (16 core + 5 bonus) that the `skills-progression`
workflow uses to create issues in sequence:

- **Day 1 (Challenges 1-9):** Repository navigation, issues, branching, commits,
  PRs, merge conflicts, culture, merge day
- **Day 2 (Challenges 10-16):** Local Git, Day 2 PR, code review, Copilot, issue
  templates, accessibility agents, capstone
- **Bonus (A-E):** Agent improvement, documentation journey, group challenge,
  notifications, Git history

### Supporting Documents

| File | Audience | Purpose |
|------|----------|---------|
| `STUDENT_GUIDE.md` | Students | How to interact with Gandalf bot and read feedback |
| `FACILITATOR_GUIDE.md` | Facilitators | Quick reference for bot behavior and facilitator role |
| `SETUP_AND_MAINTENANCE.md` | Facilitators | Architecture details and customization |
| `DEPLOYMENT_VALIDATION.md` | Facilitators | Pre-workshop validation checklist |

---

## Customizing the Automation

### Changing Validation Rules

Edit `validate-pr.js` to adjust what the PR bot checks:

- `checkIssueReference()` -- require or relax issue link patterns
- `checkDescription()` -- adjust minimum description length
- `checkFileLocation()` -- change allowed directories

### Changing Challenge Progression

The `student-progression.yml` workflow uses the issue template filenames to determine challenge order. To change the sequence, rename the template files using the `challenge-NN-short-name.yml` pattern.

### Changing Bot Messages

Edit the `body:` fields in `pr-validation-bot.yml` workflow comments to
change Gandalf bot's tone, language, or resource links.

### Adding New Challenges

Create a new YAML file in `.github/ISSUE_TEMPLATE/` following the naming
convention: `challenge-NN-short-name.yml` or `bonus-X-short-name.yml`.

---

## Repository Permissions Required

For all automation to function, the template repo (and each student copy) needs:

- **Settings > Actions > General > Workflow permissions:** Read and write
- **Settings > Actions > General:** Allow GitHub Actions to create and approve
  pull requests (checkbox enabled)

These settings are configured once on the template repo. GitHub Classroom
preserves them when creating student copies.

---

## Related Documentation

- [Workshop Deployment Guide](../../classroom/README.md) -- full Classroom setup
- [Facilitator Guide](../../admin/FACILITATOR_GUIDE.md) -- workshop
  timeline and facilitation tips
- [Challenge Progression Config](../../.github/data/challenge-progression.json)
  -- level and badge definitions

## Authoritative Sources

Use these official references when you need the current source of truth for facts in this chapter.

- [GitHub Docs, home](https://docs.github.com/en)
- [GitHub Changelog](https://github.blog/changelog/)

### Section-Level Source Map

Use this map to verify facts for each major section in this file.

- **What This Template Contains:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **Customizing the Automation:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **Repository Permissions Required:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Related Documentation:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
