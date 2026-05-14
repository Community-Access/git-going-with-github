# Solution Reference: Challenge 7 -- Resolve a Merge Conflict

This shows what conflict markers look like and how to resolve them.

## What conflict markers look like

When Git cannot automatically merge two changes to the same lines, it inserts markers:

```
<<<<<<< HEAD
Welcome to the Learning Room! This is the main branch version.
=======
Welcome to the Learning Room! This is my improved version with more detail.
>>>>>>> fix/welcome-update
```

### The three sections

- **Between `<<<<<<< HEAD` and `=======`**: The version on the branch you are merging INTO (usually main)
- **Between `=======` and `>>>>>>>`**: The version on YOUR branch
- **The marker lines themselves**: Must be deleted -- they are not content

## Example resolution

**Before (with conflict markers):**

```
<<<<<<< HEAD
Welcome to the Learning Room! This is the main branch version.
=======
Welcome to the Learning Room! This is my improved version with more detail.
>>>>>>> fix/welcome-update
```

**After (resolved):**

```
Welcome to the Learning Room! This is my improved version with more detail.
```

### Decision process

You chose one of three options:

1. **Keep yours:** Delete the HEAD section and all markers, keep your changes
2. **Keep theirs:** Delete your section and all markers, keep the HEAD version
3. **Combine both:** Write new text that incorporates ideas from both versions, delete all markers

All three are valid. The choice depends on which version is better for the project.

## On github.com

GitHub offers a conflict editor directly in the browser:

1. Click "Resolve conflicts" on the PR page
2. The editor highlights conflicting sections
3. Edit the file to remove markers and keep the content you want
4. Click "Mark as resolved" then "Commit merge"

## In VS Code

VS Code highlights conflicts and offers clickable options above each conflict:

- "Accept Current Change" (HEAD version)
- "Accept Incoming Change" (your version)
- "Accept Both Changes" (keeps both, you edit after)

## What matters

The learning objective is understanding that conflicts are normal and resolvable. If you removed all conflict markers and the file makes sense, you completed this challenge.

## Authoritative Sources

Use these official references when you need the current source of truth for facts in this chapter.

- [GitHub Docs, home](https://docs.github.com/en)
- [GitHub Changelog](https://github.blog/changelog/)

### Section-Level Source Map

Use this map to verify facts for each major section in this file.

- **What conflict markers look like:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **Example resolution:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **On github.com:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **In VS Code:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **What matters:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
