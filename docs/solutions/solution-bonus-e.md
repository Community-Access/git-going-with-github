# Solution Reference: Bonus E -- Explore Git History Visually

This shows a visual history exploration.

## On github.com

### Viewing commit history

1. Navigate to any repository
2. Click the "X commits" link near the top (shows total commit count)
3. The history page shows each commit with author, date, message, and SHA
4. Click any commit to see what changed (green lines added, red lines removed)

### What you see

The commit history tells the story of a project:

- **Chronological order:** Most recent commits first
- **Author attribution:** Every change has a name attached
- **Commit messages:** Each entry explains what changed and (ideally) why
- **Diffs:** Click any commit to see exactly which lines were added, removed, or modified

## In GitHub Desktop

### Visual timeline

1. Open the repository in GitHub Desktop
2. Click the "History" tab
3. The left panel shows commits as a timeline
4. Click any commit to see the diff in the right panel
5. The branch visualization shows where branches diverged and merged

### Key observations from exploring history

- **Merge commits** show where two branches came together -- they have two parent commits
- **The first commit** in a repository is often called "initial commit" and creates the project structure
- **Commit frequency** varies -- some days have many commits, others have none. This is normal.

## In VS Code

The "Timeline" view in the Explorer sidebar shows the history for the currently open file. Each entry is a commit that changed that file. This is useful for understanding how a specific file evolved.

## What matters

The learning objective is understanding that Git history is a navigable record of every change. If you explored the commit history, clicked into at least one commit to see its diff, and can describe what the history tells you about the project, you completed this bonus.

## Authoritative Sources

Use these official references when you need the current source of truth for facts in this chapter.

- [GitHub Docs, home](https://docs.github.com/en)
- [GitHub Changelog](https://github.blog/changelog/)

### Section-Level Source Map

Use this map to verify facts for each major section in this file.

- **On github.com:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **In GitHub Desktop:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **In VS Code:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **What matters:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
