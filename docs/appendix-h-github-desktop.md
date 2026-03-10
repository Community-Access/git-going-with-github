# Appendix AB: GitHub Desktop
>
> **Episode coming soon:** GitHub Desktop - a conversational audio overview of this appendix. Listen before reading to preview the concepts, or after to reinforce what you learned.

## A Visual Git Client for Every Workflow

> **Who this is for:** You want a dedicated graphical Git application — something separate from your code editor, with a clear visual interface for cloning, branching, committing, and managing pull requests. GitHub Desktop is a great fit if you prefer working with a purpose-built Git GUI, or if VS Code's Source Control panel feels too embedded in the editor for your workflow.
>
> GitHub Desktop is free, open source, and made by GitHub. It works on Windows and macOS.

---

## Table of Contents

1. [What GitHub Desktop Does (and Doesn't Do)](#1-what-github-desktop-does-and-doesnt-do)
2. [Installing GitHub Desktop](#2-installing-github-desktop)
3. [Signing In and Authentication](#3-signing-in-and-authentication)
4. [The Interface at a Glance](#4-the-interface-at-a-glance)
5. [Cloning a Repository](#5-cloning-a-repository)
6. [Creating and Switching Branches](#6-creating-and-switching-branches)
7. [Staging and Committing Changes](#7-staging-and-committing-changes)
8. [Push and Pull](#8-push-and-pull)
9. [Syncing Your Fork](#9-syncing-your-fork)
10. [Resolving Merge Conflicts](#10-resolving-merge-conflicts)
11. [Viewing History](#11-viewing-history)
12. [Cherry-Pick in GitHub Desktop](#12-cherry-pick-in-github-desktop)
13. [Stashing Changes](#13-stashing-changes)
14. [Undoing Changes](#14-undoing-changes)
15. [Accessibility and Screen Reader Notes](#15-accessibility-and-screen-reader-notes)
16. [GitHub Desktop vs VS Code vs Git CLI — When to Use Each](#16-github-desktop-vs-vs-code-vs-git-cli--when-to-use-each)

---

## 1. What GitHub Desktop Does (and Doesn't Do)

GitHub Desktop covers the everyday Git workflow that most contributors use on most days.

### What it supports

- ✅ Clone repositories from GitHub
- ✅ Create, switch, and delete branches
- ✅ Stage files (and individual lines/hunks within files)
- ✅ Write commit messages and commit
- ✅ Push and pull from GitHub
- ✅ Open pull requests (launches GitHub.com in your browser)
- ✅ Resolve merge conflicts with a visual editor
- ✅ View commit history and diffs
- ✅ Cherry-pick commits between branches
- ✅ Stash and restore uncommitted changes
- ✅ Undo commits and discard changes

### What it does not support (use Git CLI or VS Code terminal instead)

- ❌ Interactive rebase (`git rebase -i`)
- ❌ `git bisect`
- ❌ `git clean`
- ❌ Creating annotated tags
- ❌ Commit signing (GPG/SSH)

For these operations, open the repository in your terminal directly from GitHub Desktop — **Repository → Open in Terminal** or **Repository → Open in Command Prompt** puts you in the right directory instantly.

---

## 2. Installing GitHub Desktop

### Windows

**Option A: Winget (recommended)**

```bash
winget install GitHub.GitHubDesktop
```

**Option B: Direct download**

1. Go to [desktop.github.com](https://desktop.github.com)
2. Select **"Download for Windows"**
3. Run the installer — it installs and launches automatically

### macOS

**Option A: Homebrew**

```bash
brew install --cask github
```

**Option B: Direct download**

1. Go to [desktop.github.com](https://desktop.github.com)
2. Select **"Download for macOS"**
3. Open the downloaded `.zip`, drag **GitHub Desktop** to your Applications folder

> **Linux:** GitHub Desktop does not officially support Linux. Linux users should use VS Code's Source Control panel or the Git CLI.

---

## 3. Signing In and Authentication

GitHub Desktop uses **browser-based OAuth sign-in** — no tokens or SSH keys needed. It handles authentication for you automatically.

### Sign in on first launch

1. Open GitHub Desktop
2. Select **"Sign in to GitHub.com"**
3. Your browser opens to a GitHub authorization page — sign in with your GitHub account
4. Authorize GitHub Desktop when prompted
5. Switch back to GitHub Desktop — you're signed in

That's it. GitHub Desktop stores your credentials securely in the system keychain. You won't be asked for a password again.

> **If you use GitHub Enterprise or a GitHub organization:** Select **"Sign in to GitHub Enterprise Server"** and enter your organization's server URL.

---

## 4. The Interface at a Glance

GitHub Desktop has three main areas:

```
┌─────────────────────────────────────────────────────────┐
│  Toolbar: Current Repository ▾  |  Current Branch ▾  |  │
│                                    Fetch/Push button      │
├─────────────────┬───────────────────────────────────────┤
│                 │                                         │
│  Left panel:    │  Main area:                            │
│  Changes tab    │  File diff view                        │
│  (staged /      │  (what changed in the selected file)   │
│  unstaged)      │                                        │
│                 │                                         │
│  OR             │                                         │
│                 │                                         │
│  History tab    │  Commit detail / diff                  │
│  (past commits) │                                        │
│                 │                                         │
├─────────────────┴───────────────────────────────────────┤
│  Commit area: Summary field | Description | Commit button │
└─────────────────────────────────────────────────────────┘
```

### Key controls

| Element | What it does |
|---------|-------------|
| **Current Repository** (top left) | Switch between your cloned repos |
| **Current Branch** (top middle) | Switch branches, create new branches |
| **Fetch/Push button** (top right) | Sync with GitHub (fetch, push, pull) |
| **Changes tab** | Shows your uncommitted changes |
| **History tab** | Shows your commit history |
| **Summary field** (bottom left) | Where you type your commit message |
| **Commit button** (bottom left) | Commits staged changes |

---

## 5. Cloning a Repository

### From GitHub.com

The easiest way is to go to the repository on GitHub.com and use the **Code** button:

1. On the repository page, activate **Code → Open with GitHub Desktop**
2. GitHub Desktop opens with a dialog confirming the URL
3. Choose where to save the repository on your computer
4. Select **"Clone"**

### From inside GitHub Desktop

1. Press `Ctrl+Shift+O` (Windows) or `Cmd+Shift+O` (macOS) — **"Clone a repository"**
2. Choose the **GitHub.com** tab to browse your own repositories, or the **URL** tab to paste any repo URL
3. Select or type the repository
4. Choose a local path
5. Select **"Clone"**

### GitHub CLI alternative

```bash
gh repo clone owner/repo-name
# Then open it in GitHub Desktop:
github /path/to/repo
```

---

## 6. Creating and Switching Branches

### Create a new branch

1. Click **Current Branch** in the toolbar (or press `Ctrl+Shift+N` / `Cmd+Shift+N`)
2. Type a name for your new branch
3. Select **"Create Branch"**
4. Choose whether to base it on the current branch or another — usually keep the default

GitHub Desktop switches to the new branch immediately.

### Switch to an existing branch

1. Click **Current Branch** in the toolbar
2. Type to search or scroll through the branch list
3. Click the branch name — GitHub Desktop switches and updates your files

### Delete a branch

1. Click **Current Branch** in the toolbar
2. Right-click the branch you want to delete
3. Select **"Delete..."**

> **Screen reader tip:** The branch selector is a dropdown that opens a searchable list. Screen readers announce the currently selected branch name in the toolbar. After switching, the branch name in the toolbar updates to confirm the switch.

---

## 7. Staging and Committing Changes

### Reviewing your changes

When you edit files in your editor and save them, GitHub Desktop automatically detects the changes and shows them in the **Changes** tab on the left.

- The **left panel** lists every changed file with a checkbox
- The **right panel** shows the diff for the selected file — red lines removed, green lines added

### Staging files

Every file with a checked checkbox will be included in your next commit.

- **Check all** — click the checkbox at the top of the list to stage everything
- **Uncheck** a file to exclude it from the commit (it stays as an uncommitted change)

### Staging individual lines (hunks)

If a file has multiple changes and you only want to commit some of them:

1. Select the file in the Changes list
2. In the diff view, **right-click** a line or block
3. Select **"Stage Line"** or **"Stage Hunk"** — only those lines get included in the commit

### Writing your commit message

1. In the **Summary** field at the bottom, type a short commit message (under 72 characters is ideal)
2. Optionally add a longer description in the **Description** field below it
3. Select **"Commit to [branch name]"** — your changes are committed locally

> **GitHub Copilot can help:** Not sure what to write? Open VS Code alongside GitHub Desktop, open Copilot Chat, and ask: *"Write a commit message for these changes: [describe what you changed]."* Or use the conventional commit format: `feat:`, `fix:`, `docs:`, `refactor:`.

> **Screen reader tip (Windows, NVDA/JAWS):** The Summary and Description fields are standard text inputs — navigate to them with `Tab` and type normally. The commit button is announced as a button labelled "Commit to [branch name]."

---

## 8. Push and Pull

After committing, your changes are saved locally but not yet on GitHub. The **Fetch/Push** button in the top-right toolbar handles syncing.

### Pushing commits to GitHub

After committing, the button changes to **"Push origin"** with an upward arrow and the number of commits waiting.

- Click **"Push origin"** — your commits go to GitHub

### Pulling changes from GitHub

When collaborators have pushed new commits, the button shows **"Pull origin"** with a downward arrow.

- Click **"Pull origin"** — GitHub Desktop downloads the new commits and updates your local branch

### Fetching (checking without pulling)

- Click **"Fetch origin"** — GitHub Desktop checks for new commits and shows you the count, but doesn't update your files yet
- This is safe to do at any time — it's read-only

### Keyboard shortcuts

| Action | Windows | macOS |
|--------|---------|-------|
| Push / Pull / Fetch | `Ctrl+P` | `Cmd+P` |

---

## 9. Syncing Your Fork

If you forked a repository and the original upstream repo has new commits you want to bring in:

1. Go to **Branch → Merge into current branch...**
2. In the branch picker, switch to the **"Other branches"** tab
3. Select `upstream/main` (or `upstream/master`) — the upstream remote's default branch
4. Select **"Create a merge commit"**
5. Then push to your fork with **"Push origin"**

### Setting up the upstream remote (if not already there)

GitHub Desktop adds the upstream remote automatically when you clone a fork from GitHub.com. If it's missing:

1. Open the repository in terminal: **Repository → Open in Terminal**
2. Run:
```bash
git remote add upstream https://github.com/ORIGINAL-OWNER/ORIGINAL-REPO.git
git fetch upstream
```
3. Switch back to GitHub Desktop — it will now see the upstream branches

---

## 10. Resolving Merge Conflicts

When you pull from GitHub or merge a branch and there are conflicts, GitHub Desktop shows a dialog listing the conflicting files.

### Step by step

1. GitHub Desktop shows a **"Resolve conflicts before merging"** screen
2. Each conflicting file has two options next to it:
   - **"Open in [your editor]"** — opens the file with conflict markers for manual editing
   - **"Use mine"** / **"Use theirs"** — accept one entire side of the conflict without editing

3. For simple conflicts (one side is clearly right), use **"Use mine"** or **"Use theirs"**
4. For conflicts where you need to keep parts of both, select **"Open in [editor]"** and resolve manually

### After resolving in your editor

1. Save the file
2. Switch back to GitHub Desktop — the file moves from "Conflicting" to "Resolved"
3. Once all conflicts are resolved, select **"Continue merge"**

> **GitHub Copilot can help:** Open the conflicting file in VS Code alongside GitHub Desktop. Place your cursor inside a conflict region and open Copilot Chat (`Ctrl+Shift+I`): *"Resolve this merge conflict — keep meaningful changes from both sides."* Copilot suggests a resolution; you review and save.

> **Screen reader tip:** The conflicts dialog lists files as a navigable list. Each file entry includes the action buttons ("Open in editor", "Use mine", "Use theirs"). Navigate with `Tab` between the file entries and buttons.

---

## 11. Viewing History

The **History** tab (next to the Changes tab in the left panel) shows every commit on the current branch.

### Navigating history

1. Click the **History** tab
2. Each commit appears as a row: author avatar, commit message, author name, and timestamp
3. Click any commit to see the full diff on the right — what changed in each file

### Filtering commits

Type in the **search field** above the commit list to filter by commit message, author, or SHA.

### Viewing a specific file's history

1. Right-click any file in your project (via the Files panel in the diff area)
2. Select **"Show in History"** — the commit list filters to only commits that touched that file

### Comparing branches

1. Click **History**
2. In the branch comparison bar above the commit list, switch to another branch
3. GitHub Desktop shows the commits that are different between your current branch and the selected branch

---

## 12. Cherry-Pick in GitHub Desktop

Cherry-pick lets you take a commit from another branch and apply it to your current branch — without merging the whole branch.

### How to cherry-pick

1. Switch to the **branch you want to copy the commit FROM** (the source branch)
2. Open the **History** tab
3. Find the commit you want to copy
4. **Right-click** the commit
5. Select **"Cherry-pick commit..."**
6. Choose the **destination branch** — the branch you want to apply the commit TO
7. GitHub Desktop applies the commit and switches to the destination branch

### If there's a conflict

GitHub Desktop shows the conflict resolution screen (same as merging). Resolve the conflicts in your editor, then switch back to GitHub Desktop to continue.

> **GitHub Copilot can help:** Before cherry-picking, open Copilot Chat and paste the commit diff: *"What does this commit do? Is it safe to cherry-pick onto a branch that doesn't have the surrounding context?"*

---

## 13. Stashing Changes

Stash saves your uncommitted changes temporarily so you can switch branches or pull without committing half-finished work.

### Stash your changes

1. Go to **Branch → Stash All Changes** (or press `Ctrl+Shift+H` / `Cmd+Shift+H`)
2. Your working directory reverts to the last commit
3. You can now switch branches safely

### Restore your stash

1. Switch back to the branch where you stashed
2. Go to **Branch → Pop Stash**
3. Your changes come back

> **Note:** GitHub Desktop supports one stash at a time per branch. For multiple stashes, use the Git CLI: `git stash list`, `git stash apply stash@{1}`. See [Chapter 11, Section 10](14-git-in-practice.md#10-stash-management) for the full stash guide.

---

## 14. Undoing Changes

### Undo the last commit

Go to **Edit → Undo Last Commit** (or press `Ctrl+Z` / `Cmd+Z` right after committing)

This is equivalent to `git reset --soft HEAD~1` — your changes come back as staged files. Nothing is lost.

### Discard changes to a file

In the **Changes** tab:

1. Right-click a file
2. Select **"Discard Changes..."**
3. Confirm the dialog — the file reverts to its last committed state

> **Warning:** Discarding changes cannot be undone. The changes are permanently deleted, not moved to trash.

### Discard all changes

1. Right-click anywhere in the Changes list
2. Select **"Discard All Changes..."**
3. Confirm — everything in your working directory reverts to the last commit

---

## 15. Accessibility and Screen Reader Notes

GitHub Desktop has partial screen reader support. Core workflows work well with keyboard navigation; some visual-only elements (like avatar images and some icons) don't have text equivalents.

### What works well

| Feature | Accessibility notes |
|---------|-------------------|
| Commit message fields | Standard text inputs, fully accessible |
| Branch selector | Searchable dropdown, keyboard navigable |
| File list (Changes/History) | Arrow keys to navigate, checkboxes announceable |
| Commit button | Labelled with branch name, activatable with `Enter` |
| Conflict resolution dialog | Buttons ("Use mine", "Use theirs") are labelled |
| Keyboard shortcut access | Most operations have keyboard shortcuts |

### What has limitations

| Feature | Limitation |
|---------|-----------|
| Diff view | The colored diff panel is partially accessible; individual lines may not be announced clearly on all platforms. **Workaround:** Open in VS Code for better diff navigation |
| File icons | Status icons (M for modified, A for added, D for deleted) may not always be announced — the filename is still readable |
| Context menus | Right-click context menus work via keyboard (`Shift+F10` on Windows; `Ctrl+Click` on macOS) |

### Windows — NVDA / JAWS

- Use `Tab` to move between panels; arrow keys within lists
- The commit summary field is reached with `Tab` after the file list
- Conflict dialogs are modal — screen reader focus moves into the dialog automatically

### macOS — VoiceOver

- Use `Tab` and `VO+Arrow` to navigate panels
- The diff view can be explored with `VO+Right` through the lines
- Branch selector opens a searchable popup — type to filter, `Down Arrow` to navigate, `Return` to select

### VS Code as a better accessible alternative

If screen reader navigation in GitHub Desktop is frustrating for a specific operation, VS Code's Source Control panel is often more accessible. The two tools complement each other — use whichever works best for the task at hand.

---

## 16. GitHub Desktop vs VS Code vs Git CLI — When to Use Each

| Situation | Best tool |
|-----------|-----------|
| You want a clean visual overview of changes before committing | GitHub Desktop |
| You want to stage individual lines or hunks | GitHub Desktop or VS Code |
| You're doing complex operations (rebase, bisect, clean) | Git CLI (terminal) |
| You want the fastest screen-reader-friendly experience | Git CLI or VS Code terminal |
| You want to open a PR or manage issues without leaving your tool | VS Code (GitHub Pull Requests extension) |
| You want to manage multiple repos at once with a visual switcher | GitHub Desktop |
| You're doing quick commits mid-coding session | VS Code (Source Control panel — already open) |

GitHub Desktop, VS Code, and the Git CLI all talk to the same Git repository. You can switch between them freely — use GitHub Desktop to stage and commit, then open the terminal for a `git rebase -i`. They don't conflict.

---

*Related chapters and appendices: [Chapter 11: Git & Source Control in VS Code](14-git-in-practice.md) · [Appendix AA: Advanced Git Operations](appendix-e-advanced-git.md) · [Appendix D: Git Authentication](appendix-d-git-authentication.md) · [Chapter 12: GitHub Pull Requests Extension](15-code-review.md)*
