# Assignment Issue Template Reference

Use this reference when pre-seeding issues for the Day 1 contribution sprint. Copy and modify it for each student participant. This file is not a GitHub issue template and should not be placed in `.github/ISSUE_TEMPLATE/`.

## Title

`Fix: [specific problem] in [filename]`

Example: `Fix: Heading hierarchy issue in keyboard-shortcuts.md`

## Description

```markdown
## What to Fix

[Specific description of the problem - be precise enough that the student knows exactly what line or section to look at. Include the exact error if applicable.]

Example: "In the keyboard-shortcuts.md file, the NVDA section heading jumps from h2 (##) directly to h4 (####). Section headings should be h2, and subsection headings should be h3. This makes the document harder to navigate with a screen reader."

## File to Edit

`learning-room/docs/[filename].md`

## Acceptance Criteria

- [ ] [Specific thing that should be true when the fix is complete]
- [ ] No new heading-level skips introduced
- [ ] Link text is descriptive (not "click here")
- [ ] Changes respect the existing document structure

Example:

- [ ] NVDA section heading is now ## (h2)
- [ ] All sub-section headings under NVDA are ### (h3)
- [ ] No heading-level gaps exist in the NVDA section
- [ ] Document still reads logically with a screen reader

## How to Contribute

See [Working with Issues](../docs/05-working-with-issues.md) and the [Day 1 Agenda](../admin/DAY1_AGENDA.md) for the full contribution workflow.

## Resources

- [Accessibility Standards Reference](../docs/appendix-m-accessibility-standards.md)
- [Markdown Reference](../docs/appendix-c-markdown-reference.md)
```

## Pre-Seeded Issues to Create

Use this table as a checklist. Create one issue per row per student, customizing the assigned student field.

| File | Problem | Acceptance Criteria | Labels | Difficulty |
|------|---------|-------------------|--------|------------|
| `keyboard-shortcuts.md` | Heading jumps from h2 to h4 (NVDA section) | Subheadings are h3, not h4 | `accessibility`, `good-first-issue` | Easy |
| `keyboard-shortcuts.md` | Broken link: `htps://nvaccess.org` | Link reads `https://nvaccess.org` | `bug`, `good-first-issue` | Easy |
| `setup-guide.md` | Broken link: `htps://github.com/settings/accessibility` | Link reads `https://github.com/settings/accessibility` | `bug`, `good-first-issue` | Easy |
| `setup-guide.md` | Missing workshop repo link in Step 6 | Step 6 has actual workshop repo URL | `documentation`, `good-first-issue` | Easy |
| `welcome.md` | `[TODO]` Who can contribute section | Paragraph explains diverse contributors | `documentation`, `good-first-issue` | Medium |
| `welcome.md` | `[TODO]` How to read an issue section | 2-3 sentences about evaluating issues | `documentation`, `good-first-issue` | Medium |
| `welcome.md` | `[TODO]` What merged PR means for profile | Sentence about GitHub profile/portfolio | `documentation`, `good-first-issue` | Medium |
| `welcome.md` | Missing "Last reviewed" date | Date placeholder replaced with today's date | `documentation`, `good-first-issue` | Easy |

## Tips for Assigning Issues

1. Ensure each student gets at least one issue, preferably assigned before the workshop starts.
2. Mix difficulty levels by combining one or two easy issues with medium ones per student.
3. Create extra issues for students who finish quickly.
4. Spread work across files so students see different parts of the repo.
5. Link to comprehensive resources in each issue so students can learn while fixing.
6. Set the milestone to "Day 1" so issues appear in the structured sprint view.

## Authoritative Sources

Use these official references when you need the current source of truth for facts in this chapter.

- [GitHub Docs, home](https://docs.github.com/en)
- [GitHub Changelog](https://github.blog/changelog/)
- [About Git](https://docs.github.com/en/get-started/using-git/about-git)
- [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow)
- [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- [About issues](https://docs.github.com/en/issues/tracking-your-work-with-issues/about-issues)
- [Contributing to a project](https://docs.github.com/en/get-started/exploring-projects-on-github/contributing-to-a-project)

### Section-Level Source Map

Use this map to verify facts for each major section in this file.

- **Title:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **What to Fix:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **File to Edit:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Acceptance Criteria:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **How to Contribute:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Resources:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Pre-Seeded Issues to Create:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Tips for Assigning Issues:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
