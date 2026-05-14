# Solution Reference: Challenge 6 -- Your First Pull Request

This shows what a complete pull request looks like.

## Example PR

**Title:** Fix TODO: add workshop schedule link to welcome.md

**Body:**

```markdown
## What this changes

Replaces the TODO placeholder on line 15 of `docs/welcome.md` with an actual
link to the workshop schedule.

## Why

Students need a working link to find session times. The TODO was a known gap
filed in issue #3.

Closes #3
```

## Key elements

### Title

- Describes the change clearly: someone reading just the title understands what happened
- Short enough to scan in a list

### Body

- **What:** Summarizes the change
- **Why:** Explains the motivation
- **Closes #N:** Links to the issue this PR resolves -- GitHub automatically closes the issue when the PR merges

### Linked issue

The `Closes #3` line creates a two-way link. The issue shows "referenced by PR #5" and the PR shows "Closes #3." When the PR merges, issue #3 closes automatically.

### Passing checks

If the repository has automated checks (the PR validation bot), a green checkmark appears. If checks fail, read the bot's feedback comment for specific guidance.

## Alternate linking syntax

All of these work identically:

- `Closes #3`
- `Fixes #3`
- `Resolves #3`

## What matters

The learning objective is connecting a change (PR) to a reason (issue) through GitHub's linking system. If your PR has a clear title, a description, and references an issue number, you completed this challenge.

## Authoritative Sources

Use these official references when you need the current source of truth for facts in this chapter.

- [GitHub Docs, home](https://docs.github.com/en)
- [GitHub Changelog](https://github.blog/changelog/)

### Section-Level Source Map

Use this map to verify facts for each major section in this file.

- **Example PR:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **What this changes:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **Why:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **Key elements:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **Alternate linking syntax:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **What matters:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
