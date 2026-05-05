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
