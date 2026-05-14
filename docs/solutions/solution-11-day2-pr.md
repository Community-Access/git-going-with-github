# Solution Reference: Challenge 11 -- Day 2 Pull Request

This shows a PR created from a locally-pushed branch.

## Example PR

**Title:** docs: improve welcome page formatting and fix broken link

**Body:**

```markdown
## Changes

- Fixed the broken link to the schedule on line 22
- Added a "Getting Help" section after the introduction
- Cleaned up inconsistent heading levels

## How I made these changes

I cloned the repo locally (Challenge 10), created a branch called
`fix/welcome-improvements`, made the edits in VS Code, committed,
and pushed. This PR is the result.

Closes #8

## Pattern recognition

Compared to my Day 1 PR (Challenge 6), this one:
- Started from a local clone instead of the GitHub web editor
- Had multiple commits instead of just one
- Required a `git push` step that Day 1 did not need
```

## What is different from Day 1

| Day 1 PR (Challenge 6) | Day 2 PR (Challenge 11) |
|---|---|
| Edited on github.com or github.dev | Edited locally in VS Code, Desktop, or terminal |
| Single commit created through the web UI | One or more commits created with `git commit` |
| Branch created on GitHub | Branch created locally with `git checkout -b` |
| No push needed (already on GitHub) | Required `git push` to send branch to GitHub |
| PR created from the web prompt | PR created from the web prompt or `gh pr create` |

## What matters

The learning objective is recognizing the similarities and differences between web-based and local Git workflows. Both end with a PR. If you created a PR from a locally-pushed branch and noted what changed compared to Day 1, you completed this challenge.

## Authoritative Sources

Use these official references when you need the current source of truth for facts in this chapter.

- [GitHub Docs, home](https://docs.github.com/en)
- [GitHub Changelog](https://github.blog/changelog/)

### Section-Level Source Map

Use this map to verify facts for each major section in this file.

- **Example PR:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **Changes:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **How I made these changes:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **Pattern recognition:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **What is different from Day 1:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **What matters:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
