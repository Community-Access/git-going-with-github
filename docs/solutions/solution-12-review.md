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
