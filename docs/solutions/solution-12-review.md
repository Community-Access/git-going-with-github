# Solution Reference: Challenge 12 -- Code Review

This shows what a complete code review looks like.

## Example review on a buddy's PR

### Inline comment (on a specific line)

> **Line 18 of docs/welcome.md:**
>
> This heading says "## getting started" but the other headings in the file use title case ("## What You Will Learn"). Consider changing it to "## Getting Started" for consistency.

### Suggestion (using GitHub's suggestion feature)

```suggestion
## Getting Started
```

Using the suggestion feature lets the PR author accept the change with one click, which creates a commit automatically.

### Review verdict

> **Changes requested**
>
> Good work overall. The content additions are helpful and well-written. Two things to address before merging:
>
> 1. Heading capitalization inconsistency (see inline comment on line 18)
> 2. The new link on line 25 points to `http://` instead of `https://` -- please update for security
>
> Once those are fixed, this is ready to merge.

## Types of review comments

- **Praise:** "This section reads really clearly" -- positive feedback encourages good practices
- **Question:** "What happens if the user does not have a GitHub account yet?" -- surfaces assumptions
- **Suggestion:** Use the suggestion block to propose specific text changes
- **Required change:** "The YAML frontmatter is missing the `description` field, which is required"

## What matters

The learning objective is providing constructive feedback on someone else's work. If you left at least one specific, helpful comment on a buddy's PR, you completed this challenge. The quality of feedback matters more than the quantity.

## Authoritative Sources

Use these official references when you need the current source of truth for facts in this chapter.

- [GitHub Docs, home](https://docs.github.com/en)
- [GitHub Changelog](https://github.blog/changelog/)

### Section-Level Source Map

Use this map to verify facts for each major section in this file.

- **Example review on a buddy's PR:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Getting Started:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **Types of review comments:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **What matters:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
