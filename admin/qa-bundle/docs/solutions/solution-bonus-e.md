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
