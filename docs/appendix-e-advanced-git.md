# Appendix E: Advanced Git Operations
>
> **Episode coming soon:** Advanced Git Operations - a conversational audio overview of this appendix. Listen before reading to preview the concepts, or after to reinforce what you learned.

> **Reference companion to:** [Chapter 13: How Git Works](13-how-git-works.md) | Also relevant: [Chapter 14](14-git-in-practice.md)
>
> **Authoritative source:** [Pro Git Book](https://git-scm.com/book/en/v2)

## Going Deeper with Git

> **Who this is for:** You have completed Chapter 11 (Git & Source Control) and feel comfortable with the basics — cloning, branching, committing, pushing, and pulling. This appendix covers the next tier of Git skills that come up constantly in real open source contribution: cherry-picking fixes across branches, cleaning up messy commit history before a PR, safely undoing mistakes, and understanding why your push sometimes gets blocked.
>
> Every section shows three paths: **VS Code**, **GitHub CLI (`gh`)**, and **Git CLI**. Use whichever fits your workflow — they all produce the same result.

---

## Table of Contents

1. [Cherry-Pick — Grabbing a Specific Commit](#1-cherry-pick--grabbing-a-specific-commit)
2. [Interactive Rebase — Cleaning Up Your History](#2-interactive-rebase--cleaning-up-your-history)
3. [git reset — Undoing at Different Depths](#3-git-reset--undoing-at-different-depths)
4. [git revert — The Safe Undo for Shared Branches](#4-git-revert--the-safe-undo-for-shared-branches)
5. [Tags — Marking Important Moments](#5-tags--marking-important-moments)
6. [Detached HEAD — What It Is and How to Get Out](#6-detached-head--what-it-is-and-how-to-get-out)
7. [Force Pushing Safely](#7-force-pushing-safely)
8. [git bisect — Finding the Commit That Broke Things](#8-git-bisect--finding-the-commit-that-broke-things)
9. [git clean — Clearing Out Untracked Files](#9-git-clean--clearing-out-untracked-files)
10. [Branch Protection — Why Your Push or Merge May Be Blocked](#10-branch-protection--why-your-push-or-merge-may-be-blocked)
11. [Using GitHub Copilot for Git Operations](#11-using-github-copilot-for-git-operations)

### Learning Cards: Using This Advanced Git Reference

<details>
<summary>Screen reader users</summary>

- Each operation is a numbered h2 section with three sub-paths: VS Code, GitHub CLI, and Git CLI
- Use H to jump between operations and 3 to jump between the tool-specific sub-headings within each
- The Table of Contents above has anchor links -- activate any link to jump directly to that operation

</details>

<details>
<summary>Low vision users</summary>

- Command examples are in labeled code blocks -- increase zoom and each command fits on one line
- Every section follows the same structure: what it is, when to use it, then tool-specific steps
- The Quick Reference table near the bottom gives a one-row-per-operation summary for fast lookup

</details>

<details>
<summary>Sighted users</summary>

- Scan the Table of Contents to find the Git operation you need -- sections are ordered from most to least common
- Each section has VS Code, CLI, and GitHub CLI paths shown side by side
- Jump to the Quick Reference table at the bottom for a compact summary of all commands

</details>

---

## 1. Cherry-Pick — Grabbing a Specific Commit

**What it is:** Cherry-pick lets you take a single commit from any branch and apply it to your current branch. Think of it like copy-pasting a specific change — without bringing the entire branch along with it.

**When you'd use it:**
- You fixed a bug on a feature branch, but `main` also needs that fix right now
- A teammate landed a commit on their branch and you need just that one change
- You accidentally committed to the wrong branch and need to move that commit somewhere else

### Finding the Commit SHA

Before cherry-picking, you need the commit's SHA (the unique ID for that commit).

#### VS Code

1. Open the **Timeline** panel: Click **View → Open View → Timeline** (or press `Ctrl+Shift+P` and type "Timeline")
2. Switch to the branch that has the commit you want, browse the Timeline, and copy the commit SHA shown in the details panel

#### Git CLI

```bash
# See commits on another branch without switching to it
git log feature/bug-fix --oneline

# Output:
# a1b2c3d Fix null pointer error in auth module
# e4f5g6h Add unit tests for login
```

The short SHA is the first 7 characters (`a1b2c3d`).

### Applying the Cherry-Pick

#### VS Code (Command Palette)

1. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS)
2. Type **"cherry"** and select **"Git: Cherry Pick..."**
3. Paste or type the commit SHA
4. Press `Enter` — VS Code applies the commit to your current branch

#### GitHub CLI

The GitHub CLI doesn't have a direct cherry-pick command (it's a local Git operation), but you can use it to find the SHA first:

```bash
# List commits on a branch via gh to find the one you want
gh api repos/{owner}/{repo}/commits?sha=feature/bug-fix --jq '.[].sha, .[].commit.message' | head -20

# Then cherry-pick using git
git cherry-pick a1b2c3d
```

#### Git CLI

```bash
# Apply a single commit
git cherry-pick a1b2c3d

# Apply a range of commits (from older to newer, exclusive of first)
git cherry-pick a1b2c3d..e4f5g6h

# Apply without automatically committing (lets you review changes first)
git cherry-pick --no-commit a1b2c3d
```

### If There's a Conflict

Cherry-pick can hit conflicts just like a merge. When it does:

1. Git pauses and marks the conflicting files (same `<<<<<<< HEAD` markers as merge conflicts)
2. Resolve the conflicts in VS Code's conflict editor (see [Chapter 7: Merge Conflicts](07-merge-conflicts.md))
3. Stage the resolved files
4. Then either:

```bash
# Continue the cherry-pick after resolving
git cherry-pick --continue

# Or cancel it entirely and go back to where you started
git cherry-pick --abort
```

> **Screen reader tip:** When a cherry-pick stops due to a conflict, run `git status` in the terminal — it announces exactly which files need attention. The conflict markers are plain text and read naturally line by line.

> **GitHub Copilot can help:** Before cherry-picking a commit you're not sure about, open Copilot Chat (`Ctrl+Shift+I`) and ask: *"What does commit a1b2c3d do? Should I cherry-pick it onto my branch?"* Paste the `git show a1b2c3d` output into the chat for context. After cherry-picking, if a conflict opens, Copilot can suggest a resolution — see [Section 11](#11-using-github-copilot-for-git-operations) for prompts.

---

## 2. Interactive Rebase — Cleaning Up Your History

**What it is:** Interactive rebase (`git rebase -i`) is like a time machine for your commits. Before you open a PR, you can reorder commits, combine several small commits into one clean commit, rewrite commit messages, or remove commits that were just experiments.

**When you'd use it:**
- You made 8 "WIP" commits while working and want to combine them into 1 clean commit for your PR
- You want to reword a commit message to better describe what changed
- You accidentally committed a debug file and want to remove that commit entirely

> **Golden rule:** Only rebase commits that have not been pushed to a shared branch yet. Rewriting public history creates problems for everyone who has pulled that branch. If you've already pushed, see [Force Pushing Safely](#7-force-pushing-safely).

### Starting an Interactive Rebase

#### VS Code

VS Code has basic rebase support via the Command Palette, but for full interactive rebase you'll want the terminal:

1. Open the Integrated Terminal: `Ctrl+Backtick`
2. Run the command below to rebase the last N commits (replace N with how many commits you want to edit)

```bash
git rebase -i HEAD~3
# This opens your last 3 commits for editing
```

3. Your default editor opens with a list of your commits. If it opens in `vim`, type `i` to enter insert mode, make your edits, then press `Esc` followed by `:wq` to save. If you'd prefer VS Code as the editor:

```bash
git config --global core.editor "code --wait"
```

After that, `git rebase -i` will open the commit list in VS Code itself — much more screen-reader-friendly.

#### Git CLI (Terminal)

```bash
# Rebase the last 3 commits
git rebase -i HEAD~3

# Or rebase everything since you branched from main
git rebase -i main
```

### The Commit List — What You're Looking At

When the editor opens, you see something like this:

```text
pick a1b2c3d Add accessibility section to README
pick e4f5g6h Fix typo in intro
pick f7g8h9i Fix another typo in intro
```

Each line starts with a **command word**. Change the word to change what happens to that commit:

| Command | What it does |
|---------|-------------|
| `pick` | Keep the commit as-is (default) |
| `squash` (or `s`) | Combine this commit into the one above it |
| `fixup` (or `f`) | Same as squash but discard this commit's message |
| `reword` (or `r`) | Keep the commit but edit the message |
| `drop` (or `d`) | Delete this commit entirely |
| `edit` (or `e`) | Pause here so you can amend the commit |

### Example: Squashing 3 Commits Into 1

Change the file to:

```text
pick a1b2c3d Add accessibility section to README
squash e4f5g6h Fix typo in intro
squash f7g8h9i Fix another typo in intro
```

Save and close. Git opens a second editor for you to write the combined commit message. Write a clean summary and save — done. You now have one tidy commit instead of three.

### Example: Rewriting a Commit Message

```text
reword a1b2c3d Add accessibility section to README
pick e4f5g6h Fix typo in intro
```

Save and close. Git opens the commit message for `a1b2c3d` for you to edit. Write the new message, save — done.

### If Something Goes Wrong

```bash
# Abort the rebase and go back to where you started
git rebase --abort

# If you're mid-rebase and hit a conflict, resolve it then continue
git rebase --continue
```

> **Screen reader tip:** Run `git rebase -i` with VS Code as your editor (`git config --global core.editor "code --wait"`) — the commit list opens in a VS Code tab that your screen reader can navigate normally with arrow keys.

> **GitHub Copilot can help:** Not sure how to word a squashed commit message? After combining your commits, open Copilot Chat and say: *"I just squashed these commits into one: [paste your old messages]. Write a clear, concise commit message that describes all the changes."* Copilot is also great at explaining what an interactive rebase file is asking you to do — paste the whole thing and ask: *"What will happen when I save this rebase file?"*

---

## 3. git reset — Undoing at Different Depths

**What it is:** `git reset` moves the tip of your current branch backward to a previous commit. The three modes (`--soft`, `--mixed`, `--hard`) control what happens to the changes that were in those commits.

**When you'd use it:**
- You committed too early and want to add more changes to that commit
- You staged the wrong files and want to unstage them
- You want to completely throw away the last few commits and start fresh

### The Three Modes

Think of Git as having three layers: your **working files** (what you can see in the editor), the **staging area** (what `git add` puts there), and the **commit history**.

| Mode | What gets reset | Your working files | Your staged changes |
|------|----------------|--------------------|---------------------|
| `--soft` | Commit history only | Kept | Kept (still staged) |
| `--mixed` (default) | History + staging | Kept | Unstaged (back to working files) |
| `--hard` | Everything | **Discarded** | **Discarded** |

> **`--hard` is the dangerous one.** It permanently discards your uncommitted changes. If you're not sure, use `--soft` or `--mixed` — they never lose work. And if you do accidentally use `--hard`, check `git reflog` immediately (see [Chapter 11, Section 10b](14-git-in-practice.md#10b-emergency-recovery---git-reflog)).

### VS Code — Undoing the Last Commit

#### Using the Source Control panel

1. Open Source Control: `Ctrl+Shift+G`
2. Click the **"..."** (More Actions) menu at the top of the panel
3. Select **"Commit → Undo Last Commit"**

This is equivalent to `git reset --soft HEAD~1` — your changes come back as staged files, nothing is lost.

#### Using the Command Palette

```
Ctrl+Shift+P → type "git undo" → select "Git: Undo Last Commit"
```

### Git CLI

```bash
# Undo last commit — keep changes staged (safest)
git reset --soft HEAD~1

# Undo last commit — keep changes but unstage them
git reset --mixed HEAD~1

# Undo last 3 commits — keep all changes unstaged
git reset --mixed HEAD~3

# Undo last commit — DISCARD all changes (cannot be undone without reflog)
git reset --hard HEAD~1

# Reset to a specific commit SHA
git reset --soft a1b2c3d
```

### Unstaging a File (Without Undoing the Commit)

If you just want to remove a file from the staging area without touching commit history:

#### VS Code

In the Source Control panel, click the **minus (–)** icon next to a staged file, or right-click it and select **"Unstage Changes"**.

#### Git CLI

```bash
# Unstage a specific file
git restore --staged docs/README.md

# Unstage everything
git restore --staged .
```

---

## 4. git revert — The Safe Undo for Shared Branches

**What it is:** `git revert` creates a **new commit** that undoes the changes from a previous commit. Unlike `git reset`, it does not rewrite history — it adds to it. This makes it the right choice when you need to undo something on a shared branch (like `main`) where other people may already have the history you'd be rewriting.

**When you'd use it:**
- A commit made it to `main` and it broke something — you need to roll it back without force-pushing
- You want to undo a change but keep a record that the undo happened
- You're working on a protected branch where force-push is disabled

### VS Code

1. Open the **Timeline** panel and navigate to the commit you want to undo
2. Right-click the commit and select **"Revert Commit"**
3. VS Code creates a new commit with message `Revert "your original message"` — review it and push

### Git CLI

```bash
# Revert a specific commit (opens editor to confirm the message)
git revert a1b2c3d

# Revert without opening the editor (uses default message)
git revert --no-edit a1b2c3d

# Stage the revert but don't commit yet (lets you edit the message manually)
git revert --no-commit a1b2c3d
git commit -m "Revert: remove broken auth change, will revisit in #42"

# Revert a merge commit (you must specify which parent to revert to)
git revert -m 1 a1b2c3d
```

### When to Use revert vs reset

| Situation | Use |
|-----------|-----|
| Commit is only local (not pushed) | `git reset` — cleaner, no extra commit |
| Commit is on a shared branch (`main`, `dev`) | `git revert` — preserves history, safe for others |
| Branch has protection rules (no force push) | `git revert` — the only option |
| You want a clear audit trail of the undo | `git revert` — the revert commit appears in history |

> **GitHub Copilot can help:** Not sure whether to use `reset` or `revert`? Describe your situation to Copilot Chat: *"I pushed a commit to main that broke the login page. Should I use git reset or git revert to undo it?"* Copilot will explain the tradeoffs and give you the exact command to run.

---

## 5. Tags — Marking Important Moments

**What it is:** A tag is a permanent label you attach to a specific commit — usually to mark a release version like `v1.0.0`. Unlike a branch (which moves as you commit), a tag always points to the exact same commit forever.

**When you'd use it:**
- Releasing a new version of a project
- Marking a stable checkpoint before starting a big refactor
- Documenting when a major feature shipped

> **GitHub's Releases feature builds on tags.** When you create a release on GitHub, you're creating a tag plus release notes and attached files. See [Appendix H: Releases, Tags, and Insights](appendix-s-releases-tags-insights.md) for the GitHub web interface side of this.

### Types of Tags

| Type | What it is |
|------|-----------|
| **Lightweight** | Just a pointer to a commit — like a bookmark |
| **Annotated** | Includes a message, author, and date — recommended for releases |

### Creating a Tag

#### VS Code (Command Palette)

```
Ctrl+Shift+P → type "git tag" → select "Git: Create Tag"
```

Type the tag name (e.g., `v1.2.0`) and optionally a message. VS Code creates an annotated tag.

#### GitHub CLI

```bash
# Create a tag and push it to GitHub in one step (using the API)
gh release create v1.2.0 --title "Version 1.2.0" --notes "Bug fixes and accessibility improvements"
# This creates both a GitHub Release and the underlying tag
```

#### Git CLI

```bash
# Create a lightweight tag at the current commit
git tag v1.2.0

# Create an annotated tag (recommended for releases)
git tag -a v1.2.0 -m "Release version 1.2.0 - bug fixes and accessibility improvements"

# Tag a specific past commit
git tag -a v1.1.5 a1b2c3d -m "Retroactive tag for 1.1.5"

# List all tags
git tag

# List tags matching a pattern
git tag -l "v1.*"

# Show details of an annotated tag
git show v1.2.0
```

### Pushing Tags to GitHub

Tags are **not** pushed automatically when you run `git push`. You need to push them explicitly:

```bash
# Push a specific tag
git push origin v1.2.0

# Push all local tags at once
git push origin --tags
```

### Deleting a Tag

```bash
# Delete a local tag
git tag -d v1.2.0

# Delete the tag on GitHub (remote)
git push origin --delete v1.2.0
```

---

## 6. Detached HEAD — What It Is and How to Get Out

**What it is:** Normally, you're working on a branch — Git tracks your commits and moves the branch forward as you commit. A "detached HEAD" happens when you check out a specific commit SHA (or a tag) directly instead of a branch. You're no longer on any branch — you're floating at a specific point in history.

**How you get into it:**

```bash
git checkout a1b2c3d        # Check out a specific commit
git checkout v1.0.0         # Check out a tag
```

Git warns you when this happens:

```text
Note: switching to 'a1b2c3d'.

You are in 'detached HEAD' state. You can look around, make experimental
changes and commit them, but any commits you make in this state will not be
associated with any branch...
```

**Why it matters:** Any commits you make in detached HEAD state are not attached to a branch. When you switch away, those commits become hard to find (and Git may eventually garbage-collect them).

### Getting Out of Detached HEAD

#### If you just want to go back to your branch

```bash
git checkout main
# or whatever branch you were on
git switch main
```

#### If you made commits in detached HEAD and want to keep them

```bash
# Create a new branch at the current (detached) position to save your work
git checkout -b my-experiment
# Now you're on a real branch and those commits are safe
```

#### VS Code

VS Code shows the current branch name in the bottom-left status bar. If you're in detached HEAD, it shows something like `(HEAD detached at a1b2c3d)` instead of a branch name.

To return to a branch: Click that status bar area, or use `Ctrl+Shift+P` → **"Git: Checkout to..."** and pick a branch from the list.

> **Screen reader tip:** In VS Code, the branch indicator is in the status bar at the bottom of the window. NVDA/JAWS users: press `Insert+End` to read the status bar, or navigate there with `Tab`. VoiceOver users: `VO+End`. If it says "detached", check out a branch before committing anything new.

---

## 7. Force Pushing Safely

**What it is:** After you rebase or amend commits that have already been pushed, the remote branch has a different history than your local branch. A regular `git push` will fail because Git sees them as diverged. A force push overwrites the remote with your local version.

> **Force pushing to `main` or a shared branch is almost always the wrong move.** It rewrites history that other people may have pulled, causing them significant pain. Force pushing is appropriate mainly on your own feature branches — and even then, use the safer variant.

### `--force-with-lease` vs `--force`

| Option | What it does |
|--------|-------------|
| `--force` | Overwrites the remote unconditionally — even if someone else pushed since you last pulled |
| `--force-with-lease` | Overwrites the remote **only if** no one else has pushed since your last fetch — safer |

**Always use `--force-with-lease` instead of `--force`.**

### When You'd Use It

- You rebased a feature branch to squash commits before a PR review
- You amended the last commit with `git commit --amend` after already pushing
- A reviewer asked you to rebase onto `main` and you've now done so

### VS Code

VS Code doesn't have a "force push" button in the UI — this is intentional to prevent accidents. Use the integrated terminal:

```
Ctrl+Backtick → then type the command below
```

### GitHub CLI

```bash
# Force push your current branch
gh repo sync   # This is for syncing FROM remote, not for force pushing

# For force pushing, use git directly:
git push --force-with-lease origin your-branch-name
```

### Git CLI

```bash
# Safe force push — fails if someone else pushed since your last fetch
git push --force-with-lease origin feature/my-branch

# Check what will happen before pushing
git push --force-with-lease --dry-run origin feature/my-branch

# Unconditional force push (avoid unless you know exactly what you're doing)
git push --force origin feature/my-branch
```

### The Typical Rebase + Force Push Workflow

```bash
# 1. You're on your feature branch — rebase onto main to get latest changes
git fetch origin
git rebase origin/main

# 2. Resolve any conflicts, then continue
git rebase --continue

# 3. Force push your rebased branch (origin already has the old version)
git push --force-with-lease origin feature/my-branch
```

---

## 8. git bisect — Finding the Commit That Broke Things

**What it is:** `git bisect` performs a binary search through your commit history to find exactly which commit introduced a bug. Instead of checking 100 commits one by one, Git cuts the search in half each time — usually finding the culprit in 7-10 steps.

**When you'd use it:**
- "This was working last week, now it's broken — what changed?"
- You need to find the exact commit so you can revert or fix it
- A test that used to pass now fails and you don't know why

### Starting a Bisect Session

```bash
# 1. Start bisect mode
git bisect start

# 2. Mark the current commit as bad (broken)
git bisect bad

# 3. Mark a commit you know was good (working)
# Use a tag, SHA, or branch name from before the problem started
git bisect good v1.0.0
# or
git bisect good a1b2c3d
```

Git now checks out a commit in the middle of your history. Test your code — does the bug exist here?

```bash
# If the bug IS present at this commit
git bisect bad

# If the bug is NOT present at this commit
git bisect good
```

Git cuts the range in half again and checks out another commit. Repeat until Git prints:

```text
a1b2c3d is the first bad commit
```

### Finishing

```bash
# End the bisect session and return to your original branch
git bisect reset
```

### Automating Bisect with a Test Script

If you have a test command that exits with code 0 on success and non-zero on failure, Git can run bisect automatically:

```bash
git bisect start
git bisect bad HEAD
git bisect good v1.0.0

# Run automatically — git runs your test script at each step
git bisect run npm test
# or
git bisect run python -m pytest tests/test_auth.py
```

> **Screen reader tip:** Bisect output is plain text — each step tells you exactly where it checked out and how many steps remain. The terminal reads it cleanly line by line.

---

## 9. git clean — Clearing Out Untracked Files

**What it is:** `git clean` removes untracked files and directories from your working directory — files that Git doesn't know about yet (not staged, not committed, not in `.gitignore`). This is useful when you have build artifacts, generated files, or experimental files cluttering your project.

> **git clean cannot be undone.** The files it removes are permanently deleted — they're not moved to the trash or recoverable from `git reflog`. Always run with `--dry-run` first.

**When you'd use it:**
- After a build that left temporary files everywhere
- You want a completely fresh state matching the last commit
- Clearing out generated files before running a clean build

### Always Dry-Run First

```bash
# See what WOULD be deleted without actually deleting anything
git clean -n
# or equivalently
git clean --dry-run
```

### VS Code

VS Code's Source Control panel shows untracked files in the "Changes" section. To remove them:

1. Open Source Control: `Ctrl+Shift+G`
2. Right-click an untracked file
3. Select **"Discard Changes"** — this removes new untracked files

For bulk removal, use the terminal (see Git CLI below).

### Git CLI

```bash
# Dry run — see what would be removed
git clean -n

# Remove untracked files (NOT directories)
git clean -f

# Remove untracked files AND directories
git clean -fd

# Remove untracked files AND ignored files (be careful — removes build artifacts AND things in .gitignore)
git clean -fx

# Interactive mode — confirm each file before deleting
git clean -i
```

### What `-n`, `-f`, `-d`, `-x` Mean

| Flag | Meaning |
|------|---------|
| `-n` | Dry run — show what would be removed |
| `-f` | Force — required to actually delete (safety measure) |
| `-d` | Also remove untracked directories |
| `-x` | Also remove files listed in `.gitignore` |
| `-i` | Interactive — confirm each deletion |

---

## 10. Branch Protection — Why Your Push or Merge May Be Blocked

**What it is:** Branch protection rules are settings a repository administrator applies to specific branches (usually `main` or `release` branches). They prevent direct pushes, require pull requests, require approvals before merging, and enforce status checks passing.

**You don't configure these as a contributor** — but you will encounter them, and understanding them helps you avoid frustration when your push or merge gets blocked.

### Common Things That Block You (and Why)

| What happened | Why it happened | What to do |
|---------------|-----------------|------------|
| `git push origin main` fails with "remote: error: GH006" | Direct push to `main` is blocked | Create a branch and open a PR instead |
| Your PR has a "Merge" button but it's grayed out | Required approvals not met, or status checks failing | Request a review; wait for CI to pass |
| PR says "Required review from code owners" | A `CODEOWNERS` file routes reviews to specific people | Wait for or ping the code owner |
| CI check is failing | An automated test or lint step failed | Fix the failing check and push again |
| PR says "Branch is out of date" | `main` moved forward after your PR opened | Update your branch (merge or rebase from `main`) |

### The Correct Flow for Protected Branches

```bash
# 1. Never push directly to main — always work on a branch
git checkout -b feature/my-change

# 2. Make your changes, commit them
git add .
git commit -m "Add screen reader support to navigation"

# 3. Push your branch (not main)
git push origin feature/my-change

# 4. Open a PR on GitHub — protection rules apply to the merge, not the push
gh pr create --title "Add screen reader support to navigation" --body "Closes #42"

# 5. Wait for reviews and CI checks to pass, then merge through the PR
```

### Updating a Branch That's Out of Date

When GitHub says your branch is out of date with `main`:

#### VS Code

1. Open Source Control → `Ctrl+Shift+P`
2. Type **"merge"** → select **"Git: Merge Branch..."**
3. Choose `origin/main` from the list
4. Resolve any conflicts, then push again

#### Git CLI

```bash
# Option A: Merge main into your branch (creates a merge commit)
git fetch origin
git merge origin/main

# Option B: Rebase onto main (cleaner history, requires force push after)
git fetch origin
git rebase origin/main
git push --force-with-lease origin feature/my-change
```

#### GitHub CLI

```bash
# Update your PR branch from the GitHub UI via CLI
gh pr update-branch --rebase
# or
gh pr update-branch  # uses merge by default
```

### Checking What Protection Rules Are Active

#### GitHub CLI

```bash
# View branch protection rules for main
gh api repos/{owner}/{repo}/branches/main/protection --jq '{
  required_reviews: .required_pull_request_reviews.required_approving_review_count,
  require_status_checks: .required_status_checks.contexts,
  enforce_admins: .enforce_admins.enabled
}'
```

#### On GitHub.com

Navigate to **Settings → Branches** in the repository. (You need admin access to see the full config; contributors can see the effect through blocked PRs and the merge box status.)

> **For a deep dive on branch protection rules, rulesets, and diagnosing why your PR can't merge:** See [Appendix K: Branch Protection and Rulesets](appendix-o-branch-protection.md) — it includes a full diagnosis guide, screen reader navigation of the merge box, and what each status check means.

### Learning Cards: Quick Reference Table

<details>
<summary>Screen reader users</summary>

- This table has four columns: Task, VS Code, Git CLI, and GitHub CLI -- column headers are announced on entry
- Use Ctrl+Alt+Arrow keys to navigate cells; the Task column on the left identifies each row
- Cells with a dash (--) mean that tool does not support the operation -- move right to try another column

</details>

<details>
<summary>Low vision users</summary>

- At high zoom the table may scroll horizontally -- use Shift+scroll or arrow keys to see all four columns
- The Task column is always the leftmost -- anchor your reading from there
- Consider copying this table into a text file or spreadsheet for easier viewing at your preferred zoom

</details>

<details>
<summary>Sighted users</summary>

- This is a single-page summary of every advanced operation -- scan the Task column for what you need
- The Git CLI column is always populated; VS Code and GitHub CLI columns show alternatives where available
- Bookmark this table as your daily reference for less-common Git commands

</details>

---

## Quick Reference — Advanced Git Commands

| Task | VS Code | Git CLI | GitHub CLI |
|------|---------|---------|-----------|
| Cherry-pick a commit | `Ctrl+Shift+P` → "Cherry Pick" | `git cherry-pick <sha>` | Find SHA via `gh`, then `git cherry-pick` |
| Squash commits | Terminal: `git rebase -i HEAD~N` | `git rebase -i HEAD~N` | — |
| Undo last commit (keep changes) | Source Control → "..." → "Undo Last Commit" | `git reset --soft HEAD~1` | — |
| Safely undo a pushed commit | Timeline → right-click → "Revert Commit" | `git revert <sha>` | — |
| Create a release tag | `Ctrl+Shift+P` → "Create Tag" | `git tag -a v1.0.0 -m "..."` | `gh release create v1.0.0` |
| Push tags to GitHub | — | `git push origin --tags` | (included in `gh release create`) |
| Exit detached HEAD | Status bar → pick a branch | `git switch main` | — |
| Force push safely | Terminal (no UI button) | `git push --force-with-lease origin <branch>` | — |
| Find bug-introducing commit | Terminal: `git bisect start` | `git bisect start/good/bad` | — |
| Remove untracked files | Source Control → Discard | `git clean -fd` (dry run: `-n`) | — |
| Update PR branch | Source Control → Merge Branch | `git fetch && git rebase origin/main` | `gh pr update-branch` |

---

## 11. Using GitHub Copilot for Git Operations

GitHub Copilot isn't just for writing code — it's genuinely useful for Git operations, especially when you're doing something unfamiliar, hit a conflict, or need to understand what a command did. Here's how to use it across the advanced operations in this appendix.

> **Opening Copilot Chat in VS Code:** Press `Ctrl+Shift+I` (Windows/Linux) or `Cmd+Option+I` (macOS), or click the Copilot Chat icon in the sidebar. Screen reader users: the chat input is a text field — type your prompt and press `Enter`.

### Resolving Merge Conflicts

When a cherry-pick, rebase, or branch merge stops due to a conflict, VS Code highlights the conflict regions. Place your cursor inside a conflict block and ask Copilot:

- *"Resolve this merge conflict. Keep meaningful changes from both sides."*
- *"Explain what each side of this conflict is trying to do."*
- *"Which version of this change should I keep, and why?"*

Copilot reads the conflict markers and suggests a resolution. You review it, accept or adjust, then stage the file and continue.

> **Tip:** If you have multiple conflict files, handle them one at a time — paste the conflicting block into Copilot Chat with context about what the file does. You'll get much better suggestions than if you just say "fix this."

### Writing Better Commit Messages

Copilot is excellent at turning "WIP: stuff" into a clear, conventional commit message.

Open Copilot Chat after staging your changes and try:

- *"Write a conventional commit message for these changes."* (Copilot can see open files)
- *"I changed the navigation component to add keyboard focus indicators. Write a commit message."*
- *"Here are my last 5 WIP commit messages: [paste them]. Write one clean message that summarizes all of them."*

Conventional commit format (`feat:`, `fix:`, `docs:`, `refactor:`) is especially useful on open source projects — ask Copilot to use it.

### Understanding Confusing Git Output

Git's error messages and status output can be cryptic. Paste them directly into Copilot Chat:

```
# Paste this kind of thing into Copilot and ask "what does this mean?"
error: Your local changes to the following files would be overwritten by merge:
    src/auth/login.js
Please commit your changes or stash them before you merge.
```

- *"I got this git error message: [paste it]. What does it mean and how do I fix it?"*
- *"My git status output looks like this: [paste it]. What happened and what should I do next?"*
- *"I accidentally ran git reset --hard. What are my options for recovering my changes?"*

### Choosing the Right Command

When you're not sure which git command to reach for, describe what you want to do:

- *"I committed a fix on my feature branch but main also needs it urgently. What's the right git command to use?"* → Copilot will suggest cherry-pick
- *"I have 6 messy commits on my PR branch before I open the PR. How do I clean them up?"* → Interactive rebase with squash
- *"I pushed a commit that broke CI and I need to undo it without force-pushing."* → git revert
- *"My PR branch hasn't been updated from main in two weeks. How do I bring it up to date?"* → fetch + rebase or merge

### Debugging a Failing Bisect

When `git bisect` lands on a commit and you're not sure what to test:

- *"I'm running git bisect to find a bug. Git just checked out commit a1b2c3d. Here's the diff: [paste `git show a1b2c3d`]. What changed in this commit and what should I test?"*

### Getting Help With Branch Protection Errors

Paste the full error message from a rejected push into Copilot:

```
remote: error: GH006: Protected branch update failed for refs/heads/main.
remote: error: Required status check "CI / build" is failing.
```

- *"I got this error when pushing to my repository: [paste error]. What does it mean and what do I do?"*
- *"My PR can't merge because of a required status check. Here's the check output: [paste it]. What's wrong?"*

### Copilot in the Terminal vs. Copilot Chat

| Use case | Best tool |
|----------|-----------|
| Explaining a git error or status message | Copilot Chat (paste the output) |
| Writing a commit message | Copilot Chat |
| Resolving a merge conflict | Copilot Chat (with cursor in conflict block) |
| Generating the right git command | Copilot Chat or GitHub Copilot CLI (`gh copilot suggest`) |
| Autocompleting a long command you've started | Copilot inline (in terminal with shell integration) |

#### GitHub Copilot CLI — Git Command Suggestions

If you have the GitHub CLI with Copilot extension installed, you can ask for git commands directly in the terminal:

```bash
# Ask Copilot to suggest a git command for what you want to do
gh copilot suggest "squash my last 4 commits into one"
gh copilot suggest "undo my last commit but keep the changes"
gh copilot suggest "find which commit broke the login tests"
```

Copilot CLI explains the command before running it and asks for confirmation — great for learning while doing.

> **See also:** [Chapter 13: GitHub Copilot](16-github-copilot.md) for the full guide to Copilot Chat, inline suggestions, and effective prompting. [Appendix W: Copilot Reference](appendix-k-copilot-reference.md) for the complete command and participant reference.

---

*Next: [Appendix F: Git Security](appendix-f-git-security.md)*  
*Back: [Appendix D: Git Authentication](appendix-d-git-authentication.md)*  
*Teaching chapter: [Chapter 13: How Git Works](13-how-git-works.md)*

