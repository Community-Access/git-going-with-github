# Git & Source Control in VS Code
>
> **Listen to Episode 12:** [Git and Source Control in VS Code](../admin/PODCASTS.md) - a conversational audio overview of this chapter. Listen before reading to preview the concepts, or after to reinforce what you learned.

> **Related appendices:** [Appendix E: Advanced Git](appendix-e-advanced-git.md) | [Appendix D: Git Authentication](appendix-d-git-authentication.md) | [Appendix H: GitHub Desktop](appendix-h-github-desktop.md)
> **Authoritative sources:** [VS Code Docs: Source Control](https://code.visualstudio.com/docs/sourcecontrol/overview) | [GitHub Docs: Using Git](https://docs.github.com/en/get-started/using-git)


## Managing Repositories, Branches, and Changes Accessibly

> **Day 2, Block 1-2 Material**
>
> This guide covers all Git operations in VS Code: cloning repositories, navigating the Source Control panel with screen readers, branch management, staging changes (including individual lines), push/pull operations, viewing file history with Timeline, resolving merge conflicts, and stash management.
>
> **Prerequisites:** [VS Code Setup & Accessibility Basics](11-vscode-interface.md), [Working with Pull Requests](06-working-with-pull-requests.md), [Merge Conflicts](07-merge-conflicts.md)
>
> **Mac keyboard shortcuts:** Throughout this chapter, all `Ctrl+` shortcuts use `Cmd+` on Mac, and `Alt+` shortcuts use `Option+`. Common equivalents: `Ctrl+Shift+G` → `Cmd+Shift+G`, `Ctrl+Shift+P` → `Cmd+Shift+P`, `Ctrl+Enter` → `Cmd+Enter`, `Ctrl+S` → `Cmd+S`.


## Workshop Recommendation (Chapter 14 / Challenge 10)

Chapter 14 is the first **local Git workflow chapter** with hands-on repository management. It supports Challenge 10: Go Local.

- **Challenge count:** 3
- **Time per challenge:** under 10 minutes each
- **Evidence:** PR metadata, branch names, and committed changes
- **Pattern:** clone, branch, edit, commit, push, PR

### Challenge 10 Practice Set

1. **Clone your Learning Room repository** - clone your private Learning Room repo to your local machine using VS Code.
2. **Create a branch and make one commit** - check out (or create) your `learn/<username>` branch, edit a file, stage, write a clear commit message, and commit locally.
3. **Push and open a linked PR** - push your branch and open a PR in your Learning Room repo that references your Challenge 10 or Day 2 PR issue.

### Practice 10.1 Step-by-Step: Clone Your Learning Room Repository

**Goal:** Get a local copy of your Learning Room repository on your machine using VS Code.

**Where you are working:** VS Code desktop (or github.dev if you cannot install desktop VS Code).

Your Learning Room repo is the same repo you have been working in all of Day 1 -- the private copy of `learning-room-template` that GitHub Classroom created for you. Cloning it locally lets you practice the full local Git workflow on a codebase you already know.

Do **not** clone `Community-Access/learning-room-template` for this challenge. That template is maintained by facilitators. Clone your own private Learning Room repository, the one whose URL looks like `https://github.com/<workshop-org>/learning-room-<your-username>.git`.

You do **not** need a GitHub organization or organization-level permissions to complete this workflow. If GitHub asks for authentication, sign in with your own GitHub account. If GitHub says you do not have access to the repo, confirm that you are using your private Learning Room URL and ask a facilitator for help.

1. Open VS Code. If no folder is open, you should see the Welcome tab.
2. Open the Command Palette: `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`).
3. Type `git clone` and select **Git: Clone**.
4. VS Code asks for a repository URL. Paste your Learning Room repo URL (it looks like `https://github.com/<workshop-org>/learning-room-<your-username>.git`). You can copy this from the green **Code** button on your repo's GitHub page.
5. Press `Enter`.
6. A file browser dialog opens asking where to save the clone. Choose a folder you can find easily (for example, `Documents` or `Desktop`). Press **Select as Repository Destination**.
7. VS Code clones the repository. When it finishes, a notification appears asking "Would you like to open the cloned repository?" Activate **Open**.
8. Verify the clone worked: press `Ctrl+Shift+E` (Mac: `Cmd+Shift+E`) to open Explorer. Your screen reader should announce the file tree with files like `README.md` and the `docs/` folder.

**Screen reader tip:** After step 6, VS Code shows a progress notification. NVDA reads this automatically. If you hear nothing for 30 seconds, open the Command Palette and run `Notifications: Focus Notification Toast` to check status.

**You are done when:** Your Learning Room repo folder is open in VS Code and you can see the `docs/` folder along with `README.md` in the Explorer panel.

> **After cloning: check what branches exist.** A fresh clone only checks out the default branch (`main`), but the remote may have other branches you created earlier on GitHub.com (such as your `learn/<username>` branch). Run `git branch -a` in the terminal (`` Ctrl+` ``) to see all branches -- local and remote:
>
> ```bash
> git branch -a
> ```
>
> You will see output like:
>
> ```text
> * main
>   remotes/origin/HEAD -> origin/main
>   remotes/origin/main
>   remotes/origin/learn/yourname
> ```
>
> The `*` marks your current branch. Lines starting with `remotes/origin/` are branches on GitHub that you can check out locally with `git checkout learn/yourname` or `git switch learn/yourname`.

### Practice 10.2 Step-by-Step: Create a Branch and Commit

> **See also:** [Chapter 13: How Git Works](13-how-git-works.md) explains the three areas (working directory, staging, repository) that make commits meaningful.

**Goal:** Check out (or create) a properly named branch, edit a file, stage the change, and commit with a clear message.

**Where you are working:** VS Code with your cloned Learning Room repository open.

1. Open the Command Palette: `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`).
2. If your `learn/<username>` branch already exists on the remote (because you created it during Day 1), type `git checkout` and select **Git: Checkout to...**, then pick `learn/<your-username>`. If the branch does not exist yet, type `git create branch` and select **Git: Create Branch...** and enter `learn/<your-username>`.
3. The status bar at the bottom of VS Code now shows your branch name instead of `main`. Your screen reader announces the branch name when you focus the status bar.
4. Open the Explorer (`Ctrl+Shift+E`) and navigate to the `docs/` folder. Open any file mentioned in your Challenge 10 issue (for example, `docs/welcome.md`).
5. Make one small, meaningful edit. For example, add a new sentence, fix a typo, or improve a description. Save the file with `Ctrl+S` (Mac: `Cmd+S`).
6. Open the Source Control panel: `Ctrl+Shift+G` (Mac: `Cmd+Shift+G`). Your screen reader announces "Source Control" and shows your changed file under "Changes."
7. Navigate to your changed file in the Changes list. Press `Enter` or activate the `+` (Stage Changes) button next to the filename. The file moves from "Changes" to "Staged Changes."
8. Move focus to the **Message** input box at the top of the Source Control panel. Type a clear commit message, for example: `docs: improve welcome.md introduction`
9. Press `Ctrl+Enter` (Mac: `Cmd+Enter`) to commit. The staged changes disappear, which means your commit succeeded.

**Screen reader tip:** In the Source Control panel, use arrow keys to navigate between changed files. Each file announces its name and change status (modified, added, deleted). The `+` button is announced as "Stage Changes" when you Tab to it.

**You are done when:** Your commit appears in the Source Control panel's history (no more staged or unstaged changes visible) and the status bar still shows your branch name.

### Practice 10.3 Step-by-Step: Push and Open a Linked PR

**Goal:** Push your branch to GitHub and open a PR in your Learning Room repo that references your challenge issue.

**Where you are working:** VS Code (for the push) and GitHub.com (for the PR).

1. Open the Command Palette: `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`).
2. Type `git push` and select **Git: Push**. If VS Code asks to publish the branch (because it is new), confirm by selecting **OK** or **Publish Branch**.
3. Wait for the push to complete. VS Code shows a progress notification. When done, the sync indicator in the status bar should show no pending changes.
4. Open your browser and navigate to your Learning Room repository on GitHub.
5. GitHub usually shows a yellow banner: "yourname recently pushed to learn/yourname." Activate the **Compare & pull request** button in that banner.
6. If you do not see the banner, activate the **Pull requests** tab, then activate **New pull request**. Set the base branch to `main` and the compare branch to your `learn/<your-username>` branch.
7. In the PR title, write a descriptive title (for example: "docs: improve welcome.md introduction").
8. In the PR description, type `Closes #XX` (replace `XX` with your Challenge 10 or Day 2 PR issue number). Because the issue lives in the same repo as the PR, you only need the short `#XX` form.
9. Activate the **Create pull request** button.

**Screen reader tip:** The "Compare & pull request" banner is a standard link element near the top of the repository page. If your screen reader does not find it, use the heading navigation to jump to the Pull Requests tab instead.

**Same-repo linking:** Because your challenge issue and your PR live in the same repository, the short form `Closes #XX` is enough -- GitHub automatically resolves the issue number to a closure link. (If you ever open a PR in a different repo, you would use the full `Closes <owner>/<repo>#XX` form, which works exactly the same way.)

**You are done when:** Your PR appears on the Pull requests tab of your Learning Room repo, shows your branch name, and the description contains the `Closes #XX` reference to your challenge issue.

### Completing Challenge 10: Submit Your Evidence

Open your **assigned Challenge 10 issue** in your Learning Room repo and post a completion comment:

```text
Challenge 10 completed:
- Repository cloned: <my Learning Room repo>
- Branch name: learn/<yourname>
- Commit message: [your commit message]
- PR number: #[your PR number]
- PR links to issue: yes (Closes #XX in description)
```

Close your Challenge 10 issue when your branch is pushed and the PR is open.

### Expected Outcomes

- Student can clone a repository using VS Code Command Palette.
- Student can create or check out a named branch following the workshop naming convention.
- Student can navigate the Source Control panel, stage files, and commit with a descriptive message.
- Student can push a branch and open a PR with same-repo issue linking.

### If You Get Stuck

1. Command Palette does not open? Confirm you are in VS Code (not the browser) and press `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`).
2. Source Control panel is empty? You may not have saved your file yet. Press `Ctrl+S` to save, then check again.
3. Push fails with authentication error? Open Command Palette, run `Git: Fetch` to test your connection. If it fails, run `GitHub: Sign In` from Command Palette.
4. Branch name wrong? Open Command Palette, run `Git: Rename Branch...` to fix it before pushing.
5. Cannot find the "Compare & pull request" banner on GitHub? Navigate to Pull requests tab and create the PR manually (step 6 above).
6. `Closes #XX` not linking? Make sure the format is exactly `Closes #XX` with a single space and no extra characters. The keyword is case-insensitive but must be one of `Closes`, `Fixes`, or `Resolves`.
7. Ask facilitator to verify your clone location, branch name, and help with one push.
8. Finished but not sure you did it right? Compare your work against the [Challenge 10 reference solution](solutions/solution-10-go-local.md).

> **Continue learning:** The GitHub Skills course [Introduction to Git](https://github.com/skills/introduction-to-git) walks through commits, branches, and merges in an interactive, self-paced format. See [Appendix Z](appendix-z-github-skills.md) for the full catalog.

### Learning Moment

Local Git operations give you full control and immediate feedback. You can see your changes, review them, and fix mistakes before they reach GitHub. The clone-branch-edit-commit-push-PR cycle you just completed is the daily workflow of every open source contributor. And now your Copilot Chat has custom sci-fi loading phrases as a bonus.

### Learning Pattern Used in This Chapter

1. Clone once to get a local copy of the project.
2. Branch before editing (never work directly on `main`).
3. Make small, focused edits with clear commit messages.
4. Push and open a PR that links to an issue for traceability.
5. Verify each step before moving to the next.

### About Learning Cards

Throughout this chapter, each major operation includes **learning cards** - expandable sections showing how to accomplish the same task from multiple perspectives. Open the card that matches how you work:

The following table describes each learning card type and who it is for.

| Card | Who it is for |
| --- | --- |
| **Visual / mouse users** | Sighted users navigating with a mouse or trackpad |
| **Low vision users** | Users working with zoom (200%+), magnification, high contrast themes, or large cursors |
| **Screen reader users (NVDA / JAWS)** | Windows users navigating with NVDA or JAWS in Browse/Virtual mode |
| **Screen reader users (VoiceOver)** | macOS users navigating with VoiceOver |
| **GitHub.com web interface** | Browser-only workflow - no local tools required |
| **CLI (git / gh)** | Terminal commands for Git and GitHub CLI - predictable text output, scriptable |

You do not need to read every card. Pick the one or two that match your setup and skip the rest.


## Table of Contents

1. [Cloning a Repository in VS Code](#1-cloning-a-repository-in-vs-code)
2. [The Source Control Panel - Complete Walkthrough](#2-the-source-control-panel---complete-walkthrough)
3. [Branch Management](#3-branch-management)
4. [Staging Changes - Files, Lines, and Chunks](#4-staging-changes---files-lines-and-chunks)
5. [Committing with Screen Readers](#5-committing-with-screen-readers)
6. [Push and Pull Operations](#6-push-and-pull-operations)
7. [Discarding Changes](#7-discarding-changes)
8. [Timeline View - File History and Blame](#8-timeline-view---file-history-and-blame)
9. [Resolving Merge Conflicts in VS Code](#9-resolving-merge-conflicts-in-vs-code)
10. [Stash Management](#10-stash-management)
11. [Emergency Recovery - git reflog](#10b-emergency-recovery---git-reflog)
12. [Alternative Git Interfaces](#11-alternative-git-interfaces)


## 1. Cloning a Repository in VS Code

### Tool Cards: Clone a Repository (Day 2)

**VS Code Desktop (primary for Day 2):**
1. `Ctrl+Shift+P` > **Git: Clone** > paste the HTTPS URL > choose a folder > **Open**.

**github.dev (web editor):**
No clone needed. Press `.` on any GitHub repository page to open it instantly.

**GitHub Desktop:**
1. **File > Clone Repository** > paste URL or select from your account > **Clone**.

**Git CLI (terminal):**
```bash
git clone https://github.com/owner/repo.git && cd repo
```

**GitHub CLI:**
```bash
gh repo clone owner/repo && cd repo
```

### Three ways to clone a repository

### Method 1: Command Palette (Recommended for Screen Readers)

1. Open Command Palette: `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`)
2. Type "git clone"
3. Select "Git: Clone"
4. Paste the repository URL (example: `https://github.com/community-access/accessibility-agents.git`)
5. Press `Enter`
6. Choose a local folder where the repository should be cloned
7. VS Code asks: "Would you like to open the cloned repository?" - select "Open"

#### Screen reader navigation

- The Command Palette is a searchable list - type to filter, `Up/Down Arrow` to navigate results
- The folder picker is a standard file dialog - navigate with `Arrow` keys, `Enter` to select

### Method 2: Start Page Clone Button

1. Open VS Code (no folder open)
2. The Start page appears
3. Navigate to "Clone Git Repository" button - press `Enter`
4. Paste repository URL → `Enter`
5. Choose destination folder
6. Open when prompted

**Screen reader note:** The Start page is keyboard-accessible. `Tab` to navigate between "New File," "Open Folder," and "Clone Repository" buttons.

### Method 3: From GitHub.com

1. On any GitHub repository page, click the green "Code" button
2. Copy the HTTPS URL (recommended) or SSH URL
3. Open VS Code → `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`) → "Git: Clone"
4. Paste URL → `Enter`
5. Choose destination → Open

### Learning Cards: Cloning a Repository

<details>
<summary>Low vision users (zoom, high contrast)</summary>

Cloning works the same as the Command Palette method above. A few tips for zoomed or magnified displays:

1. The Command Palette (`Ctrl+Shift+P`) appears at the top-center of VS Code and scales with your zoom level - it remains visible even at 200%+ zoom.
2. When the folder picker dialog opens, it may extend beyond your visible area at high zoom. Use `Alt+Up Arrow` to navigate up in the folder tree and `Enter` to select. The dialog title bar shows your current location.
3. After cloning, the Explorer panel (`Ctrl+Shift+E`) shows the file tree. At high zoom, use `Ctrl+-` to temporarily reduce zoom if the tree is hard to scan, then `Ctrl+=` to restore.
4. If you use a high contrast theme (Settings: `Ctrl+,` then search "color theme"), file status colours in the Explorer (green for added, yellow for modified) may be subtle. Enable **Editor Decorator Colors** or rely on the Source Control panel (`Ctrl+Shift+G`) where status letters (M, A, D) are shown as text.

</details>

<details>
<summary>GitHub.com web interface (no local tools needed)</summary>

If you cannot install Git or VS Code, you can work directly in the browser:

1. Navigate to the repository on GitHub.com
2. Press `.` (period) to open **github.dev** - a browser-based VS Code editor
3. The full repository opens in an editor with file tree, search, and editing
4. Changes are committed directly to GitHub from the browser

Alternatively, for quick edits:

1. Navigate to any file on GitHub
2. Press `E` to open the file editor
3. Make changes and commit from the web editor

**Note:** github.dev does not support terminal commands or local Git operations. For full Git workflows (branching, staging individual lines, stash), use desktop VS Code.

</details>

<details>
<summary>CLI (git / gh)</summary>

Clone from your terminal using either standard Git or GitHub CLI:

```bash
# Standard Git clone
git clone https://github.com/Community-Access/vscode-sci-fi-themes.git
cd vscode-sci-fi-themes

# GitHub CLI clone (shorter syntax, handles auth automatically)
gh repo clone Community-Access/vscode-sci-fi-themes
cd vscode-sci-fi-themes

# Clone into a specific folder
git clone https://github.com/Community-Access/vscode-sci-fi-themes.git ~/projects/themes

# Clone only the default branch (faster for large repos)
gh repo clone Community-Access/vscode-sci-fi-themes -- --single-branch

# Verify the clone
git status
git remote -v
```

**Screen reader advantage:** Terminal output is plain text. After cloning, `git status` confirms you are on the default branch with a clean working tree.

</details>

**Why HTTPS over SSH for this workshop:** HTTPS works immediately with no setup. SSH requires key generation and configuration (see [Appendix D: Git Authentication](appendix-d-git-authentication.md) for SSH setup).

### Try It Now: Clone the Sci-Fi Themes Repo 

To make your first clone meaningful and fun, try cloning the **VS Code Sci-Fi Thinking Phrases** repository:

**Repository URL:** `https://github.com/community-access/vscode-sci-fi-themes.git`

This repo contains custom loading phrases for GitHub Copilot Chat from three sci-fi universes:
- **Star Trek** — Engage warp drive and run diagnostics
- **The Hitchhiker's Guide** — Consult the Infinite Improbability Drive
- **Star Wars** — Read the ripples in the Force

#### Why Clone This?

-  It's a real, working repository with multiple files to explore
-  You'll see a practical use of cloning (customizing your personal VS Code setup)
-  After cloning, you can pick a theme and apply it to your `settings.json`
-  When you open Copilot Chat, you'll see your custom phrases appear! 

#### Quick Start

1. Clone: `Ctrl+Shift+P` → "Git: Clone" → paste URL above → `Enter`
2. Choose a destination folder and open when prompted
3. Navigate to the `themes/` folder and pick a `.json` file (star-trek, hitchhikers, or star-wars)
4. Copy the `chat.agent.thinking.phrases` setting into your VS Code `settings.json`
5. Reload VS Code: `Ctrl+Shift+P` → "Developer: Reload Window"
6. Open Copilot Chat (`Ctrl+Alt+I`, or **Chat: Open Chat** from the Command Palette if your keymap differs) and ask a question - watch your custom phrases appear!

See `CLONE-THIS-REPO.md` in that repo for full instructions.

<details>
<summary>Web alternative (github.com)</summary>

If you prefer not to clone locally, you can work entirely on GitHub.com:

1. Navigate to the repository on GitHub
2. Click any file to view it, then click the **pencil icon** (Edit) to modify it directly in the browser
3. GitHub automatically creates a branch and commit for your edit
4. When you save, GitHub prompts you to open a pull request

This approach requires no local tools - just a browser. It works well for documentation changes and small edits. For larger changes, cloning to VS Code gives you a full editor with multi-file editing, Git staging, and the Accessible Diff Viewer.

</details>

<details>
<summary>GitHub CLI (gh) alternative</summary>

Clone a repository with one command:

```bash
# Clone using owner/name (no URL needed)
gh repo clone community-access/vscode-sci-fi-themes

# Clone and cd into the folder
gh repo clone community-access/vscode-sci-fi-themes && cd vscode-sci-fi-themes

# Open the cloned repo in VS Code
gh repo clone community-access/vscode-sci-fi-themes && code vscode-sci-fi-themes
```

</details>


## 2. The Source Control Panel - Complete Walkthrough

The Source Control panel (`Ctrl+Shift+G` - Mac: `Cmd+Shift+G`) is where all Git operations happen in VS Code. This section provides a complete screen reader walkthrough of every interactive element.

### Opening the Source Control Panel

**Shortcut:** `Ctrl+Shift+G` (Mac: `Cmd+Shift+G`)

#### What opens

- A sidebar panel on the left side of VS Code
- Focus lands on the first interactive element (usually the commit message input or the first changed file)

#### Panel structure from top to bottom

1. **Source Control title bar** (heading level 2)
   - Branch name displayed (example: "main" or "feature/add-documentation")
   - View/More Actions button (three dots menu)

2. **Commit message input** (multi-line text field)
   - Type your commit message here
   - Announced as "Source Control Input, edit, multi-line"

3. **Commit button** (or "Publish Branch" if this is a new branch)
   - Shortcut: `Ctrl+Enter` (Mac: `Cmd+Enter`) when focused in the message input

4. **Changes section** (collapsible tree)
   - Lists all modified files not yet staged
   - Announced as "Changes, expanded" or "Changes, collapsed"
   - Count shown (example: "Changes 3")

5. **Staged Changes section** (collapsible tree)
   - Lists files staged for commit
   - Empty if nothing staged yet
   - Announced as "Staged Changes, expanded"

6. **Merge Changes section** (appears only during a merge)
   - Lists files with conflicts
   - See Section 9 for conflict resolution workflow

### Screen Reader Navigation in the Source Control Panel

#### NVDA/JAWS

- The panel is a web-based tree view
- Use `Up/Down Arrow` to navigate between items
- Use `Right Arrow` to expand a section (Changes, Staged Changes)
- Use `Left Arrow` to collapse a section
- Use `Enter` to open a file diff
- Use `Space` to stage/unstage a file (when focused on a file item)

#### VoiceOver

- Navigate with `VO+Arrow` keys
- `VO+Space` to activate (open diff or stage/unstage)
- The panel is announced as a "group" containing lists

**Key point:** The Source Control panel is **not** a standard file tree. It's a specialized Git status view. Each changed file is an interactive item with a context menu.

### What Each File Shows

When a file appears in the Changes or Staged Changes list, VS Code shows a status letter:

| Letter | Meaning |
| --------  | ---------  |
| M | Modified - file exists and was changed |
| A | Added - new file, not in Git yet |
| D | Deleted - file was removed |
| R | Renamed - file was moved or renamed |
| U | Untracked - file exists but Git is ignoring it |
| C | Conflict - file has merge conflicts (see Section 9) |

**Screen reader announcement:** "docs/GUIDE.md, Modified" or "README.md, Added"

### Context Menu Actions (Right-Click or Shift+F10)

When focused on any file in the Source Control panel:

| Action | What It Does |
| --------  | -------------  |
| Open File | Opens the file in the editor (same as `Enter`) |
| Open Changes | Opens side-by-side diff view (same as `Enter`) |
| Stage Changes | Moves file from Changes → Staged Changes |
| Unstage Changes | Moves file from Staged Changes → Changes |
| Discard Changes | **Dangerous** - deletes your local edits, restores file to last commit |
| Stage Selected Ranges | Stage only specific lines (see Section 4) |
| Revert Selected Ranges | Discard changes to specific lines only |

**Screen reader tip:** Use `Shift+F10` to open the context menu. Navigate options with `Up/Down Arrow`. Press `Enter` to select.

### Learning Cards: Source Control Panel

<details>
<summary>Low vision users (zoom, high contrast)</summary>

The Source Control panel adapts well to zoom and high contrast settings:

1. **At high zoom (200%+):** The panel may narrow. File names truncate but the status letter (M, A, D) remains visible at the end of each row. Hover over truncated names to see the full path in a tooltip.
2. **High contrast themes:** Status colours are reinforced by the status letter (M/A/D/R/U/C), so you do not rely on colour alone. To switch to a high contrast theme: `Ctrl+Shift+P` then type "Preferences: Color Theme" and select "High Contrast" or "High Contrast Light."
3. **The commit message input** is a multi-line text area. At high zoom it may appear narrow - it expands vertically as you type. Use `Ctrl+Enter` to commit from anywhere in the input (not `Enter`, which adds a new line).
4. **Diff views** opened from the panel use red/green highlighting. In high contrast themes these use distinct border patterns instead of subtle colour shading. Press `F7` to jump between change hunks rather than scrolling through large diffs visually.
5. **Minimap:** If the minimap (the narrow code preview strip on the right edge of the editor) is distracting at high zoom, disable it: Settings (`Ctrl+,`) then search "minimap enabled" and uncheck it.

</details>

<details>
<summary>CLI equivalent: viewing Git status</summary>

The Source Control panel shows the same information as these terminal commands:

```bash
# See all modified, staged, and untracked files
git status

# Short format (one letter per file, compact)
git status -s

# See what is staged (ready to commit)
git diff --cached --name-only

# See what is modified but not staged
git diff --name-only

# See both staged and unstaged differences with content
git diff          # unstaged changes
git diff --cached # staged changes
```

**The letters match:** `M` = modified, `A` = added, `D` = deleted, `R` = renamed, `??` = untracked.

</details>


## 3. Branch Management

Branches are how you organize work in Git. Every repository starts with a `main` or `master` branch. You create new branches for features, bug fixes, or experiments.

### Viewing the Current Branch

#### Where it's shown

1. Bottom-left corner of VS Code (status bar) - visual users see it immediately
2. Source Control panel title bar
3. Command Palette: `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`) → "Git: Show Git Output"

#### Keyboard access to status bar

- The status bar is not in the standard keyboard navigation flow
- Use the Command Palette for branch operations instead

> **Visual users:** You can also click the branch name in the bottom-left status bar to open the branch picker directly.

### Creating a New Branch

#### Command Palette method (recommended)

1. `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`)
2. Type "git create branch"
3. Select "Git: Create Branch..."
4. Type the new branch name (example: `feature/improve-docs`)
5. Press `Enter`

VS Code:

- Creates the branch
- Switches to it automatically
- Your working files stay exactly as they were

#### Naming conventions

- Use lowercase with hyphens: `feature/add-timeline-guide`
- Avoid spaces and special characters
- Be descriptive: `fix/heading-hierarchy` not `fix1`

<details>
<summary>Web alternative (github.com) - branch management</summary>

Create and switch branches without leaving your browser:

1. On the repository page, click the **branch dropdown** (shows "main" by default)
2. Type a new branch name in the search field
3. Click **"Create branch: your-branch-name from main"**
4. GitHub switches to the new branch immediately
5. Any file edits you make in the browser will be on this branch

To switch between branches, click the branch dropdown and select the branch you want.

</details>

<details>
<summary>Git CLI alternative - branch management</summary>

Manage branches from your terminal:

```bash
# Create and switch to a new branch
git checkout -b feature/improve-docs

# List all branches
git branch -a

# Switch to an existing branch
git checkout main

# Delete a branch (after merging)
git branch -d feature/improve-docs
```

</details>

### Switching Between Branches

#### Command Palette method

1. `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`)
2. Type "git checkout"
3. Select "Git: Checkout to..."
4. A list of all branches appears
5. `Up/Down Arrow` to navigate
6. `Enter` to switch

**Screen reader announcement:** "Branch: main" or "Branch: feature/add-timeline-guide"

#### What happens when you switch

- VS Code saves your current files
- Loads the files from the other branch
- If you have uncommitted changes, Git may block the switch (see "Stashing" in Section 10)

### Deleting a Branch

#### After your PR is merged, you can delete the branch

1. `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`)
2. Type "git delete branch"
3. Select "Git: Delete Branch..."
4. Choose the branch to delete from the list
5. Confirm

**Note:** You cannot delete the branch you're currently on. Switch to `main` first.

### Viewing All Branches

**Command:** `Ctrl+Shift+P` → "Git: Show Git Output" → Branch list appears

**Alternative:** Use the integrated terminal:

```bash
git branch          # Local branches only
git branch -a       # All branches (including remote)
```

### Learning Cards: Branch Management

<details>
<summary>Low vision users (zoom, high contrast)</summary>

1. **Branch name in the status bar:** The current branch name appears in the bottom-left corner of VS Code. At high zoom, the status bar may be partially off-screen. Use `Ctrl+Shift+P` then type "Git: Checkout to..." to see and switch branches from the Command Palette instead.
2. **Branch picker list:** When you open the branch picker from the Command Palette, the list shows all available branches. At high zoom, long branch names may truncate. Type the first few characters to filter the list - the filter is instant.
3. **Visual branch indicators in the Explorer:** Modified files on a branch show a coloured dot in the Explorer panel. In high contrast themes, these dots use distinct shapes or borders. The Source Control panel (`Ctrl+Shift+G`) is more reliable for seeing which files changed on your branch.

</details>

<details>
<summary>Screen reader users (NVDA / JAWS on Windows)</summary>

#### Creating a branch

1. Press `Ctrl+Shift+P` to open the Command Palette
2. Type "git create branch" - NVDA/JAWS announces results as you type
3. Press `Enter` on "Git: Create Branch..."
4. The input focus moves to a text field - type your branch name (e.g., `feature/add-docs`)
5. Press `Enter` - VS Code creates and switches to the branch
6. NVDA/JAWS announces the new branch name in the status bar notification

#### Switching branches

1. Press `Ctrl+Shift+P`, type "git checkout"
2. Select "Git: Checkout to..."
3. A list of branches appears - navigate with `Up/Down Arrow`
4. Each item is announced as the branch name (e.g., "main", "feature/add-docs")
5. Press `Enter` to switch
6. VS Code reloads files for that branch - you hear a status bar update

#### Deleting a branch

1. Switch to a different branch first (you cannot delete the branch you are on)
2. Press `Ctrl+Shift+P`, type "git delete branch"
3. Select "Git: Delete Branch..."
4. Navigate the list to find the branch to delete, press `Enter`

</details>

<details>
<summary>Screen reader users (VoiceOver on macOS)</summary>

#### Creating a branch

1. Press `Cmd+Shift+P` to open the Command Palette
2. Type "git create branch" - VoiceOver announces filtered results
3. Press `Return` on "Git: Create Branch..."
4. Type the branch name in the input field
5. Press `Return` to create and switch

#### Switching branches

1. Press `Cmd+Shift+P`, type "git checkout"
2. Select "Git: Checkout to..."
3. Use `VO+Down Arrow` to navigate the branch list
4. Press `Return` to switch

#### Getting the current branch name

1. Press `VO+M` to move to the menu bar, then `VO+Right Arrow` to the status bar area
2. Or use the Command Palette: `Cmd+Shift+P` then type "Git: Show Git Output" - the output pane includes the current branch

</details>

<details>
<summary>GitHub.com web interface</summary>

Create and switch branches without leaving your browser:

1. On the repository page, find the **branch dropdown** button (shows "main" by default) - it is above the file table
2. Click or activate the dropdown
3. Type a new branch name in the search field
4. Click **"Create branch: your-branch-name from main"** when it appears
5. GitHub switches to the new branch immediately
6. Any file edits in the browser will be on this branch

To switch between branches:

1. Click the branch dropdown
2. Select the branch you want - the page reloads with that branch's files

To delete a branch:

1. Navigate to the repository's Branches page: click the branch count link (e.g., "3 branches") near the branch dropdown, or go to `github.com/owner/repo/branches`
2. Find the branch
3. Click the trash can icon next to it

</details>

<details>
<summary>CLI (git / gh)</summary>

Manage branches from your terminal:

```bash
# Create and switch to a new branch
git checkout -b feature/improve-docs

# Or use the newer 'switch' command
git switch -c feature/improve-docs

# List local branches (current branch marked with *)
git branch

# List all branches including remote-tracking
git branch -a

# Switch to an existing branch
git checkout main
# or
git switch main

# Delete a branch (safe - only if merged)
git branch -d feature/improve-docs

# Force delete a branch (even if not merged)
git branch -D feature/improve-docs

# Rename the current branch
git branch -m new-name

# Push a new branch to GitHub for the first time
git push -u origin feature/improve-docs

# Delete a remote branch
git push origin --delete feature/improve-docs
```

Using GitHub CLI:

```bash
# Create a branch linked to an issue (auto-names from issue title)
gh issue develop 42 --checkout

# List remote branches
gh api repos/{owner}/{repo}/branches --jq '.[].name'
```

</details>


## 4. Staging Changes - Files, Lines, and Chunks

Git has a two-step commit process:

1. **Stage** the changes you want to include
2. **Commit** those staged changes

This lets you commit only part of your work, leaving the rest for a later commit.

### Staging an Entire File

<details>
<summary>Visual / mouse users</summary>

1. Open Source Control: `Ctrl+Shift+G` (Mac: `Cmd+Shift+G`)
2. Hover over a file in the "Changes" list - a **+** icon appears to its right
3. Click the **+** to stage that file
4. Or right-click a file → "Stage Changes"

</details>

<details>
<summary>Low vision users (zoom, high contrast)</summary>

1. Open Source Control: `Ctrl+Shift+G` (Mac: `Cmd+Shift+G`)
2. At high zoom, the **+** (stage), **undo** (discard), and **open file** icons may be small. Instead of hovering:
   - Right-click any file in the Changes list to get a full-size context menu with "Stage Changes", "Discard Changes", and other options
   - Or use `Ctrl+Shift+P` then type "Git: Stage Changes" to stage the currently open file
3. The file moves from "Changes" to "Staged Changes" - both section headings include a count (e.g., "Changes 2", "Staged Changes 1") so you can confirm the move without relying on colour alone.
4. In high contrast themes, staged files show a distinct background or border in the Staged Changes section.

</details>

<details>
<summary>Screen reader users (NVDA / JAWS / VoiceOver)</summary>

1. Open Source Control: `Ctrl+Shift+G` (Mac: `Cmd+Shift+G`)
2. Navigate to the file in the "Changes" list
3. Press `Ctrl+Enter` (Mac: `Cmd+Enter`) to stage immediately

#### Alternative (keyboard shortcut)

- Focus the file → press `Space`

#### Alternative (context menu)

- Focus the file → press `Shift+F10` (Mac: `Ctrl+Return`) → select "Stage Changes"

</details>

#### What happens

- The file moves from "Changes" → "Staged Changes"
- A green "A" or "M" indicator appears

### Staging Multiple Files at Once

1. `Ctrl+Shift+G` (Mac: `Cmd+Shift+G`) to open Source Control
2. Navigate to the "Changes" section heading
3. Press `Shift+F10` (Mac: `Ctrl+Return`) to open context menu on the section itself
4. Select "Stage All Changes"

All modified files move to "Staged Changes."

### Staging Individual Lines or Chunks

**This is one of Git's most powerful features:** You can stage only specific lines of a file, leaving other changes unstaged.

#### Workflow

1. Open Source Control: `Ctrl+Shift+G` (Mac: `Cmd+Shift+G`)
2. Navigate to a file in "Changes"
3. Press `Enter` to open the diff view
4. The diff shows your changes side-by-side or inline
5. Navigate to a changed line (use `Arrow` keys or `F7` for next hunk)
6. Press `Shift+F10` (Mac: `Ctrl+Return`) to open context menu
7. Select "Stage Selected Lines"

**Result:** Only those lines are staged. The rest of the file remains in "Changes."

#### Use case for this workshop

- You fixed a typo and added a new section in the same file
- You want to commit the typo fix separately from the new content
- Stage only the typo fix lines, commit them with message "fix: typo in heading"
- Then stage the new section, commit with message "docs: add Timeline View guide"

**Screen reader tip:** In the diff view, press `Alt+H` to see Accessible Help for diff-specific keyboard shortcuts.

<details>
<summary>Web alternative (github.com) - editing files</summary>

On GitHub.com, there is no staging step. When you edit a file in the browser:

1. Click the **pencil icon** on any file to open the web editor
2. Make your changes
3. Click **"Commit changes"** - GitHub creates the commit directly
4. Choose to commit to the current branch or create a new branch and PR

This is the simplest workflow if you are making a focused change to one file. For multi-file changes, VS Code's staging system gives you more control.

</details>

<details>
<summary>Git CLI alternative - staging</summary>

Stage files from your terminal:

```bash
# Stage a specific file
git add docs/GUIDE.md

# Stage all changes
git add .

# Stage specific lines interactively
git add -p docs/GUIDE.md
# Git shows each change hunk and asks: stage this? (y/n/s/e)

# Unstage a file
git restore --staged docs/GUIDE.md

# Check what is staged vs unstaged
git status
```

</details>

### Unstaging Files

#### Reverse the process

1. Focus the file in "Staged Changes"
2. Press `Ctrl+Enter` (Mac: `Cmd+Enter`) or `Space`
3. File moves back to "Changes"

### Learning Cards: Staging Changes

<details>
<summary>Screen reader users</summary>

- In Source Control (`Ctrl+Shift+G`), press `+` or `Space` on a file to stage it -- your screen reader announces the file moving from "Changes" to "Staged Changes"
- To stage individual lines, open the file diff (`Enter` on the file), select lines with `Shift+Up/Down`, then use Command Palette: "Git: Stage Selected Ranges"
- Press `Ctrl+Z` in the Source Control panel to unstage the last staged file if you staged the wrong one

</details>

<details>
<summary>Low vision users</summary>

- Staged files appear under a separate "Staged Changes" heading with a green `+` icon -- look for the section break in the Source Control panel
- The inline diff view highlights added lines in green and removed lines in red; use `Ctrl+=` to zoom if the colors are hard to distinguish
- Right-click a file in the Source Control panel for a context menu with "Stage Changes", "Discard Changes", and "Open File" options

</details>

<details>
<summary>Sighted users</summary>

- Hover over a file in the Changes list to see `+` (stage), curved arrow (discard), and file-open icons appear on the right
- Click the `+` icon next to "Changes" header to stage all files at once, or click `+` on individual files for selective staging
- The Source Control badge number on the Activity Bar decreases as you stage and commit changes

</details>


## 5. Committing with Screen Readers

### The Commit Workflow

#### Standard process

1. Open Source Control: `Ctrl+Shift+G` (Mac: `Cmd+Shift+G`)
2. Stage changes (see Section 4)
3. Focus the commit message input (usually `Tab` or `Shift+Tab` to reach it)
4. Type your commit message
5. Press `Ctrl+Enter` (Mac: `Cmd+Enter`) to commit

### Learning Cards: Committing

<details>
<summary>Visual / mouse users</summary>

1. Open Source Control (`Ctrl+Shift+G`)
2. Stage your files (click the **+** icon next to each file, or click **Stage All Changes** above the Changes section header)
3. Click in the **"Message"** text area at the top of the Source Control panel
4. Type your commit message
5. Click the **Commit** button (checkmark icon) or press `Ctrl+Enter`
6. If nothing is staged, VS Code asks if you want to stage all changes and commit directly - click "Yes" if that is what you want

</details>

<details>
<summary>Low vision users (zoom, high contrast)</summary>

1. The commit message input is at the top of the Source Control panel. At high zoom it may appear as a narrow rectangle - it expands vertically as you type.
2. The **Commit button** may show only as a small checkmark icon at high zoom. Use `Ctrl+Enter` from inside the message input instead - this is more reliable than finding the button visually.
3. After committing, the Staged Changes section clears. The count next to the section heading drops to 0, confirming the commit was recorded.
4. If you need to see your recent commits, use the Timeline view (`Ctrl+Shift+E`, navigate to the Timeline section at the bottom of Explorer) where each commit shows full message text at a readable size.

</details>

#### Screen reader experience

#### NVDA/JAWS

- The commit input is announced as "Source Control Input, edit, multi-line"
- You're automatically in Forms Mode - just start typing
- The input expands as you type (supports multi-line messages)
- Press `Ctrl+Enter` (Mac: `Cmd+Enter`) to commit (not `Enter`, which adds a new line)

#### VoiceOver

- `VO+Tab` to navigate to the input
- `VO+Shift+Down` to interact
- Type your message
- `Ctrl+Enter` to commit
- `VO+Shift+Up` to stop interacting

### Writing Good Commit Messages

See [Culture & Etiquette: Writing Good Commit Messages](08-open-source-culture.md#writing-good-commit-messages) for format guidance.

#### Quick reference

```text
fix: correct heading hierarchy in GUIDE.md

Fixes #42
```

#### Format

- First line: type + colon + short summary (50 characters max)
- Blank line
- Optional body: detailed explanation
- Optional footer: "Fixes #123" to link to issue

**Common types:** `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`

<details>
<summary>Git CLI alternative - committing</summary>

Commit from your terminal:

```bash
# Commit staged changes with a message
git commit -m "fix: correct heading hierarchy in GUIDE.md"

# Commit with a multi-line message (opens your editor)
git commit

# Stage all tracked files and commit in one step
git commit -am "docs: update screen reader instructions"
```

</details>

### What Happens After Commit

- The "Staged Changes" section clears
- Your changes are now part of Git history
- The commit exists locally only - you must **push** to send it to GitHub (see Section 6)


## 6. Push and Pull Operations

**Push** sends your local commits to GitHub.  
**Pull** downloads new commits from GitHub to your local repository.

### Pushing Your Commits to GitHub

#### After committing locally

1. Open Source Control: `Ctrl+Shift+G` (Mac: `Cmd+Shift+G`)
2. Look for the "Publish Branch" button (if this is a new branch) or "Sync Changes" button
3. Press `Enter` on that button

#### Alternative: Command Palette

1. `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`)
2. Type "git push"
3. Select "Git: Push"
4. VS Code pushes your commits to GitHub

### Learning Cards: Push and Pull

<details>
<summary>Low vision users (zoom, high contrast)</summary>

1. **The Sync/Publish button** appears in the Source Control panel header area. At high zoom it may display as a small cloud icon with an arrow. If you cannot find it, use the Command Palette (`Ctrl+Shift+P` then type "Git: Push") - this is always reliable.
2. **Progress indication:** While pushing, VS Code shows a spinning icon in the status bar (bottom-left). At high zoom this may be off-screen. After pushing, run `Ctrl+Shift+P` then "Git: Show Git Output" to read the push log as scrollable text.
3. **Pull indicators:** When your branch is behind the remote, the status bar shows a down-arrow with a number (e.g., "↓2" means 2 commits to pull). At high zoom, the Command Palette approach (`Ctrl+Shift+P` then "Git: Pull") avoids needing to read the status bar.
4. **Auto-fetch:** Enable auto-fetch (Settings: search "git autofetch") so VS Code checks for remote changes every few minutes. This prevents surprise conflicts when you push.

</details>

<details>
<summary>Screen reader users (NVDA / JAWS on Windows)</summary>

#### Pushing

1. After committing, press `Ctrl+Shift+P`, type "git push", select "Git: Push"
2. NVDA/JAWS announces "Pushing..." in the status bar
3. On success, a notification appears: "Successfully pushed" - if using NVDA, check `NVDA+N` to read recent notifications
4. For a new branch (first push), use "Git: Publish Branch" instead - this sets up the upstream tracking

#### Pulling

1. Press `Ctrl+Shift+P`, type "git pull", select "Git: Pull"
2. NVDA/JAWS announces "Pulling..." then the status changes
3. If there are conflicts, the Source Control panel shows a "Merge Changes" section - navigate there with `Ctrl+Shift+G` then `Down Arrow`

#### Checking sync status

1. Press `Ctrl+Shift+P`, type "Git: Show Git Output"
2. The output pane opens with push/pull log messages in plain text
3. Use `Up/Down Arrow` to read line by line

</details>

<details>
<summary>Screen reader users (VoiceOver on macOS)</summary>

#### Pushing

1. Press `Cmd+Shift+P`, type "git push", select "Git: Push"
2. VoiceOver announces progress from the status bar
3. On success, a notification toast appears - press `VO+F3` to read the latest notification

#### Pulling

1. Press `Cmd+Shift+P`, type "git pull", select "Git: Pull"
2. VoiceOver announces when the pull completes
3. If conflicts exist, navigate to Source Control (`Cmd+Shift+G`) and review the Merge Changes section

</details>

#### Screen reader feedback

- NVDA/JAWS: Status bar announces "Pushing..." then "Pushed successfully" or an error message
- Check the Source Control panel for any error messages (they appear as banner notifications)

<details>
<summary>Git CLI alternative - push and pull</summary>

Push and pull from your terminal:

```bash
# Push commits to GitHub
git push

# Push a new branch for the first time
git push -u origin feature/improve-docs

# Pull changes from GitHub
git pull

# Fetch without merging (see what changed first)
git fetch
git log HEAD..origin/main --oneline
```

</details>

<details>
<summary>Web alternative (github.com) - push and pull</summary>

On GitHub.com, there is no push/pull step - your commits are saved directly to GitHub when you use the web editor. If you edited on a branch, your changes are already on GitHub. Simply open a pull request from that branch.

If your branch is behind `main`, look for the **"Update branch"** button on your PR page to pull in the latest changes.

</details>

## What to do if push fails

- **Error: "No upstream branch"** → You need to publish the branch first (Command Palette → "Git: Publish Branch")
- **Error: "Permission denied"** → Check your authentication (see [Appendix D: Git Authentication](appendix-d-git-authentication.md))
- **Error: "Rejected - non-fast-forward"** → Someone else pushed changes; you need to pull first

### Pulling Changes from GitHub

#### When to pull

- Before you start work each day
- When GitHub shows your branch is behind the remote
- When preparing to merge a PR

#### How to pull

1. `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`)
2. Type "git pull"
3. Select "Git: Pull"
4. VS Code fetches and merges remote changes

**If there are conflicts:** See Section 9.

#### Auto-fetch setting

- VS Code can check for remote changes automatically every few minutes
- Enable: Settings (`Ctrl+,` - Mac: `Cmd+,`) → search "git autofetch" → set to `true`


## Syncing Your Fork with the Upstream Repository

When you fork a repository and the original (upstream) repository receives new commits, your fork gets out of date. Keeping your fork current prevents merge conflicts and ensures you're working with the latest code.

### The GitHub "Sync fork" Button (Quickest Method)

For straightforward updates, GitHub has a built-in sync button:

1. Navigate to your fork on GitHub
2. On the repository page, look for the **"This branch is N commits behind owner/repo:main"** notice
3. Activate the **"Sync fork"** button next to it
4. GitHub automatically merges upstream changes into your fork's default branch
5. Then pull those changes to your local clone: `Git: Pull` from the Command Palette

#### Screen reader path

```text
On your fork's main page:
→ H or 3 to find the sync notice heading
→ Tab to "Sync fork" button → Enter
→ "Update branch" in the dialog → Enter
```

**Limitation:** The GitHub sync button only syncs the default branch. For other branches, use the git method below.

### Adding the Upstream Remote (One-Time Setup)

To sync locally using git, you first configure the upstream remote. This only needs to be done once per clone.

```text
Step 1: Open the terminal in VS Code: Ctrl+` (backtick)
Step 2: Check your current remotes:
  git remote -v
  → You should see "origin" pointing to YOUR fork
Step 3: Add the upstream remote:
  git remote add upstream https://github.com/ORIGINAL-OWNER/ORIGINAL-REPO.git
Step 4: Verify:
  git remote -v
  → You should now see both "origin" (your fork) and "upstream" (original)
```

#### Example for Accessibility Agents

```bash
git remote add upstream https://github.com/community-access/accessibility-agents.git
```

### Fetching and Merging Upstream Changes

Once your upstream remote is configured:

```bash
# 1. Fetch all updates from upstream (does not change your files yet)
git fetch upstream

# 2. Make sure you are on your default branch
git checkout main

# 3. Merge upstream changes into your local branch
git merge upstream/main

# 4. Push the updated branch to your fork on GitHub
git push origin main
```

## Via VS Code Command Palette

```text
Ctrl+Shift+P → "Git: Fetch" → select "upstream"
Ctrl+Shift+P → "Git: Merge Branch" → select "upstream/main"
Ctrl+Shift+P → "Git: Push"
```

### When Conflicts Occur During Sync

> **See also:** [Chapter 07: Merge Conflicts](07-merge-conflicts.md) for a dedicated walkthrough of conflict resolution.

If you've made changes to the same files the upstream has changed, merge conflicts can occur during sync. The same conflict resolution flow applies - see Section 9 of this chapter.

**Best practice:** Always sync before starting new work on a fork. A quick `git fetch upstream` at the start of each session prevents conflicts from accumulating.


## 7. Discarding Changes

**Discarding = permanently deleting your local edits.** The file reverts to the state of the last commit. This is **irreversible.**

### When to Discard

- You made experimental changes and they didn't work
- You want to start over from the last commit
- You accidentally edited the wrong file

### How to Discard Changes

#### Single file

1. Open Source Control: `Ctrl+Shift+G`
2. Navigate to the file in "Changes"
3. Press `Shift+F10` for context menu
4. Select "Discard Changes"
5. Confirm in the warning dialog (VS Code will ask "Are you sure?")

#### All changes

1. `Ctrl+Shift+G`
2. Navigate to the "Changes" section heading
3. `Shift+F10` for context menu
4. Select "Discard All Changes"
5. Confirm (this affects every modified file)

**Screen reader warning:** VS Code shows a modal confirmation dialog. Navigate with `Tab`, select "Discard" or "Cancel" with `Enter`.

### Learning Cards: Discarding Changes

<details>
<summary>Low vision users (zoom, high contrast)</summary>

1. The **discard icon** (an undo arrow) appears when hovering over a file in the Changes list. At high zoom, right-click the file instead to get a full-size context menu with "Discard Changes."
2. The **confirmation dialog** that appears is a modal - it dims the background. In high contrast themes, the dialog has a clear border. The "Discard" button is typically the focused (primary) button.
3. For "Discard All Changes", right-click the "Changes" section heading to get the context menu.
4. After discarding, the file disappears from the Changes list. Check the file count in the section heading to confirm (e.g., "Changes 2" becomes "Changes 1").

</details>

<details>
<summary>Screen reader users (NVDA / JAWS on Windows)</summary>

#### Single file

1. Press `Ctrl+Shift+G` to open Source Control
2. Navigate to the file in the Changes section with `Down Arrow`
3. Press `Shift+F10` to open the context menu
4. Navigate to "Discard Changes" with `Down Arrow`, press `Enter`
5. A confirmation dialog appears - NVDA announces "Are you sure you want to discard changes" or similar
6. Press `Tab` to navigate between "Discard" and "Cancel", press `Enter` on your choice

#### All files

1. Navigate to the "Changes" section heading (announced as "Changes, expanded, N items")
2. Press `Shift+F10`, select "Discard All Changes"
3. Confirm in the dialog

</details>

<details>
<summary>Screen reader users (VoiceOver on macOS)</summary>

1. Press `Cmd+Shift+G` to open Source Control
2. Use `VO+Arrow` keys to navigate to the file
3. Press `VO+Shift+M` to open the context menu (or `Ctrl+Return`)
4. Navigate to "Discard Changes", press `VO+Space`
5. In the confirmation dialog, use `VO+Right Arrow` to reach the buttons, `VO+Space` to activate

</details>

<details>
<summary>CLI (git / gh)</summary>

Discard changes from your terminal:

```bash
# Discard changes to a specific file (restore to last commit)
git restore docs/GUIDE.md

# Discard all unstaged changes
git restore .

# Discard staged changes (unstage first, then restore)
git restore --staged docs/GUIDE.md
git restore docs/GUIDE.md

# Nuclear option: discard ALL changes (staged and unstaged)
git checkout -- .

# Preview what would be discarded before doing it
git diff              # shows unstaged changes
git diff --cached     # shows staged changes
```

> **Safety tip:** Run `git diff` before `git restore` to review what you are about to lose. Unlike VS Code's discard, there is no confirmation prompt in the terminal.

</details>

### Safer Alternative: Stash Instead of Discard

If you're not sure whether you'll need these changes later, use **stash** (Section 10) instead of discard. Stash saves your changes temporarily without committing them.

### Deleting a File from the Repository (Git Delete / git rm)

**Git Delete** removes a file from both your working directory AND Git's tracking. This is different from discarding changes - it permanently removes the file from the repository history going forward.

#### How to use

1. Open the file you want to remove in the editor
2. `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`)
3. Type "Git: Delete"
4. Confirm the deletion

The file is staged for deletion - you still need to commit to record the removal.

#### When to use Git Delete vs. just deleting the file

- Simply deleting a file from Explorer leaves it as an "untracked deletion" in Git
- Using `Git: Delete` (git rm) stages the deletion in one step
- Use `git rm` when you want to track the file removal as part of your next commit

### Learning Cards: Deleting a File from the Repository

<details>
<summary>Visual / mouse users</summary>

1. Right-click the file in the Explorer panel (`Ctrl+Shift+E`)
2. Select "Delete" to delete from your file system
3. The file appears in Source Control (`Ctrl+Shift+G`) under Changes with a "D" (deleted) status
4. Stage and commit the deletion to record it in Git

Alternatively: `Ctrl+Shift+P` then "Git: Delete" removes the file and stages the deletion in one step.

</details>

<details>
<summary>Low vision users (zoom, high contrast)</summary>

1. The easiest approach at high zoom is `Ctrl+Shift+P` then type "Git: Delete" - this works on the currently open file and avoids finding small context menu targets.
2. After deletion, confirm in Source Control (`Ctrl+Shift+G`) - the file appears with a "D" status letter. The "D" is text, not colour-only, so it works in all themes.
3. Stage and commit as normal.

</details>

<details>
<summary>Screen reader users (NVDA / JAWS / VoiceOver)</summary>

1. Open the file you want to remove in the editor
2. Press `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`), type "Git: Delete"
3. Select the command - the file is deleted and staged for removal
4. Navigate to Source Control (`Ctrl+Shift+G`) - the file is announced as "filename, Deleted" in the Staged Changes section
5. Write a commit message and press `Ctrl+Enter` to commit the removal

**NVDA/JAWS note:** The file disappears from the Explorer tree. If you navigate there, you will no longer hear the filename.

</details>

<details>
<summary>GitHub.com web interface</summary>

1. Navigate to the file on GitHub
2. Click the three-dot menu ("...") in the file header
3. Select "Delete file"
4. Write a commit message describing why the file was removed
5. Choose to commit directly or open a PR
6. Click "Commit changes"

For screen reader users on GitHub: press `Tab` to navigate to the file actions menu, then `Enter` to open it.

</details>

<details>
<summary>CLI (git / gh)</summary>

```bash
# Remove a file and stage the deletion in one step
git rm docs/old-file.md

# Remove a file but keep it locally (stop tracking only)
git rm --cached docs/old-file.md

# Remove an entire directory
git rm -r old-folder/

# Commit the deletion
git commit -m "chore: remove outdated documentation file"

# Verify the file is no longer tracked
git status
```

</details>


## 8. Timeline View - File History and Blame

The **Timeline view** shows the Git history of the currently open file: every commit that touched this file, who made it, and when.

### Opening Timeline View

#### Method 1: Explorer Sidebar

1. Open Explorer: `Ctrl+Shift+E`
2. At the bottom of the Explorer, there's a "Timeline" section
3. `Tab` or `Arrow` to navigate into Timeline
4. The list shows all commits affecting the currently open file

#### Method 2: Command Palette

1. Open a file in the editor
2. `Ctrl+Shift+P`
3. Type "timeline"
4. Select "View: Show Timeline"

### What Timeline Shows

For each commit entry:

- **Commit message** (first line)
- **Author name**
- **Relative time** (example: "3 days ago" or "2 hours ago")
- **Commit hash** (short form, like `a3f2b9c`)

**Screen reader announcement:** "docs: add Timeline Guide, Jeff, 2 days ago"

### Viewing a Commit's Changes

1. Navigate to a commit in the Timeline list
2. Press `Enter`
3. A diff view opens showing what changed in that specific commit

This is incredibly useful for understanding:

- When a particular line was added
- Why a section was removed
- What the file looked like at any point in history

### Git Blame - Line-by-Line History

**Git Blame** shows who last modified each line of the file.

#### How to access

1. Open a file in the editor
2. `Ctrl+Shift+P`
3. Type "git blame"
4. Select "Git: Toggle Blame"

#### What appears

- Inline annotations next to every line (visually)
- Hover over a line to see commit details

#### For screen reader users

- The inline blame annotations can add noise
- Use **Timeline view instead** to see recent changes to the whole file
- Use `Ctrl+F` to search the Timeline list for a specific author or date

**Useful blame settings** (add to `.vscode/settings.json` or user Settings):

| Setting | Default | What It Does |
| ---------  | ---------  | -------------  |
| `git.blame.ignoreWhitespace` | `false` | When `true`, whitespace-only changes (reformatting) are excluded from blame - useful when code was reformatted without logic changes |
| `git.blame.editorDecoration.disableHover` | `false` | When `true`, disables the hover tooltip on blame annotations - reduces screen reader noise if you find the blame decorations intrusive |

### Learning Cards: Timeline and History

<details>
<summary>Low vision users (zoom, high contrast)</summary>

1. **Timeline panel location:** It is at the bottom of the Explorer sidebar (`Ctrl+Shift+E`). At high zoom you may need to scroll down in the Explorer to find it. If the Timeline section is collapsed, click the **Timeline** heading to expand it.
2. **Reading commit entries:** Each entry shows the commit message, author, and time. At high zoom, long commit messages may truncate. Click any entry to open the diff view, which shows the full message in the editor tab title.
3. **Diff view at high zoom:** Red/green highlighting shows removed/added lines. In high contrast themes, changes use distinct borders or backgrounds. Press `F7` to jump through changes with a visible highlight that is easier to track than scrolling.
4. **Git Blame at high zoom:** The inline blame annotations are small grey text at the end of each line. At high zoom they may overlap with code. Use Timeline view instead for a more readable list of who changed what.

</details>

<details>
<summary>Screen reader users (NVDA / JAWS on Windows)</summary>

#### Opening Timeline

1. Press `Ctrl+Shift+E` to open Explorer
2. Press `Tab` repeatedly or `Down Arrow` to navigate past the file tree to the "Timeline" section
3. Press `Right Arrow` to expand it if collapsed
4. Navigate commit entries with `Up/Down Arrow`
5. Each entry is announced as: "commit message, author, time" (e.g., "docs: add Timeline Guide, Jeff, 2 days ago")
6. Press `Enter` on any entry to open its diff view

#### Reading a diff with screen reader

1. In the diff view, press `Alt+F2` to open the Accessible Diff Viewer
2. The Accessible Diff Viewer presents changes as a text list: each line shows `+` (added), `-` (removed), or unchanged
3. Navigate with `Up/Down Arrow` to read each line
4. Press `Escape` to close the Accessible Diff Viewer

#### Git Blame

1. Open a file, press `Ctrl+Shift+P`, type "Git: Toggle Blame"
2. Blame annotations appear inline - NVDA reads them when navigating lines
3. To reduce noise, disable blame (repeat the toggle command) and use Timeline instead

</details>

<details>
<summary>Screen reader users (VoiceOver on macOS)</summary>

#### Opening Timeline

1. Press `Cmd+Shift+E` to open Explorer
2. Use `VO+Down Arrow` to navigate below the file tree to the Timeline section
3. Press `VO+Space` to expand if collapsed
4. Navigate entries with `VO+Down Arrow`
5. Press `VO+Space` on a commit to open its diff

#### Accessible Diff Viewer

1. In any diff view, press `Option+F2` to open the Accessible Diff Viewer
2. Read changes line by line with `VO+Down Arrow`
3. Press `Escape` to close

</details>

<details>
<summary>CLI (git / gh) - history and blame</summary>

```bash
# View commit history for the entire repo
git log --oneline

# View history for a specific file
git log --oneline docs/GUIDE.md

# View history with what changed in each commit
git log -p docs/GUIDE.md

# View who last changed each line (blame)
git blame docs/GUIDE.md

# Blame with short commit hashes and author
git blame --date=short docs/GUIDE.md

# Show a specific commit's changes
git show abc1234

# Show what changed between two commits
git diff abc1234..def5678

# Show commits by a specific author
git log --author="Jeff" --oneline

# Show commits in the last 7 days
git log --since="7 days ago" --oneline
```

Using GitHub CLI:

```bash
# View recent commits from the web
gh api repos/{owner}/{repo}/commits --jq '.[0:5] | .[] | .commit.message'

# View PR history
gh pr list --state all --limit 10
```

**Screen reader advantage:** `git log --oneline` and `git blame` produce clean, columnar text output. Read line by line with arrow keys in the terminal.

</details>


## 9. Resolving Merge Conflicts in VS Code

Merge conflicts happen when two people edit the same lines of a file. Git can't decide which version to keep, so it asks you to choose.

**Prerequisite:** Read [Merge Conflicts](07-merge-conflicts.md) for the underlying concepts. This section covers the VS Code-specific workflow.

### How VS Code Displays Conflicts

When you open a file with conflicts, you see something like:

```markdown
<<<<<<< HEAD
## Timeline View - File History
=======
## Timeline View - Git History and Blame
>>>>>>> feature/improve-timeline-guide
```

**VS Code adds buttons above each conflict** (visually):

- "Accept Current Change" (keeps HEAD version)
- "Accept Incoming Change" (keeps the other branch's version)
- "Accept Both Changes" (keeps both, one after the other)
- "Compare Changes" (opens side-by-side diff)

### Screen Reader Workflow for Resolving Conflicts

**The buttons are NOT accessible via keyboard.** Use this method instead:

1. **Identify the conflict markers:**
   - `<<<<<<<` marks the start
   - `=======` separates the two versions
   - `>>>>>>>` marks the end

2. **Read both versions:**
   - The section between `<<<<<<<` and `=======` is **your current branch** (HEAD)
   - The section between `=======` and `>>>>>>>` is **the incoming branch** (the branch you're merging)

3. **Decide what to keep:**
   - Delete the conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`)
   - Delete the version you don't want
   - Or rewrite the section combining both versions
   - Save the file

4. **Stage the resolved file:**
   - `Ctrl+Shift+G` to open Source Control
   - The file appears in "Merge Changes" section
   - Stage it (presses `Ctrl+Enter` or `Space`)

5. **Commit the merge:**
   - Type commit message (or keep the auto-generated one: "Merge branch 'feature/...' into main")
   - `Ctrl+Enter` (Mac: `Cmd+Enter`) to commit

### Using Accessible Diff for Conflict Review

**Better approach:** Use the Accessible Diff Viewer (`F7`) to navigate conflict hunks systematically.

1. Open the conflicted file
2. Press `F7` to jump to the first conflict hunk
3. Press `Alt+F2` to open Accessible View
4. Read both versions clearly
5. Press `Escape` to return to editor
6. Manually edit to resolve
7. Press `F7` to jump to the next conflict
8. Repeat until all conflicts resolved

#### This gives you structured, hunk-by-hunk navigation instead of searching for markers manually

### Aborting a Merge

If you want to cancel the merge and go back to before you started:

1. `Ctrl+Shift+P`
2. Type "git abort"
3. Select "Git: Abort Merge"

Everything returns to the pre-merge state.

### Learning Cards: Resolving Merge Conflicts

<details>
<summary>Screen reader users</summary>

- Press `F7` in a conflict file to enter the Accessible Diff Viewer and step through conflicts hunk by hunk with announced change types
- Conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`) are read aloud as you arrow through lines -- listen for these to identify conflict boundaries
- After resolving all markers, stage the file with `Ctrl+Shift+G` then navigate to it and press `+`, then commit to complete the merge

</details>

<details>
<summary>Low vision users</summary>

- VS Code highlights conflict regions with colored backgrounds: green for "Current Change" (yours) and blue for "Incoming Change" (theirs)
- The inline action buttons ("Accept Current", "Accept Incoming", "Accept Both") appear above each conflict -- they are visible at high zoom levels
- Use `Ctrl+Shift+M` to check the Problems panel for any remaining conflict markers you may have missed

</details>

<details>
<summary>Sighted users</summary>

- Look for the colored conflict blocks in the editor: green background = your version, blue background = incoming version
- Click "Accept Current Change", "Accept Incoming Change", or "Accept Both Changes" above each conflict for one-click resolution
- The Source Control panel shows a merge badge when conflicts exist -- it clears after you commit the resolution

</details>


## 10. Stash Management

**Stash** temporarily saves your uncommitted changes so you can switch branches or pull updates without committing half-finished work.

### When to Use Stash

- You need to switch branches but have uncommitted changes
- You want to pull updates from GitHub but have local edits
- You want to save experimental work without committing it

### Creating a Stash

#### Method 1: Command Palette

1. `Ctrl+Shift+P`
2. Type "git stash"
3. Select "Git: Stash"
4. Optionally type a stash message (helps you remember what's in it)

#### What happens

- Your uncommitted changes disappear from the editor
- The files revert to the last commit
- Your changes are saved in a hidden Git stash
- You can now switch branches or pull safely

### Viewing Stashes

#### Command Palette

1. `Ctrl+Shift+P`
2. Type "git stash list"
3. Select "Git: Show Stash"

#### Alternative: Integrated Terminal

```bash
git stash list
```

Output looks like:

```text
stash@{0}: WIP on feature/docs: add Timeline guide
stash@{1}: WIP on main: fix typo
```

### Applying a Stash

#### To restore your stashed changes

1. `Ctrl+Shift+P`
2. Type "git stash apply"
3. Select "Git: Apply Latest Stash"

#### Or to apply a specific stash

1. `Ctrl+Shift+P`
2. Type "git stash pop"
3. Select "Git: Pop Stash..."
4. Choose which stash from the list

#### Difference between Apply and Pop

- **Apply**: restores changes and keeps the stash (you can apply it again later)
- **Pop**: restores changes and deletes the stash

### Dropping a Stash

If you no longer need what's in a stash:

1. `Ctrl+Shift+P`
2. Type "git stash drop"
3. Select "Git: Drop Stash..."
4. Choose which stash to delete

### Learning Cards: Stash Management

<details>
<summary>Visual / mouse users</summary>

1. Open Source Control: `Ctrl+Shift+G`
2. In the Source Control panel, there may be a **"Stashes"** section below Staged Changes (visible when stashes exist)
3. Click a stash to see what it contains
4. Right-click a stash to Apply, Pop, or Drop it

If the Stashes section is not visible, use the Command Palette: `Ctrl+Shift+P` then type "git stash" to access all stash commands.

</details>

<details>
<summary>Low vision users (zoom, high contrast)</summary>

1. The Stashes section in the Source Control panel may be below the fold at high zoom. Scroll down in the panel, or use the Command Palette (`Ctrl+Shift+P` then "git stash") which is always accessible regardless of zoom level.
2. Stash names in the Command Palette list are full text (e.g., "stash@{0}: WIP on feature/docs: add Timeline guide") and respect your font size settings.
3. After applying a stash, your files reappear in the Changes section of Source Control. Check the file count to confirm.

</details>

<details>
<summary>Screen reader users (NVDA / JAWS on Windows)</summary>

#### Creating a stash

1. Press `Ctrl+Shift+P`, type "git stash"
2. Select "Git: Stash" - NVDA announces the result
3. An input appears asking for a stash message - type something descriptive (e.g., "WIP: documentation changes for Timeline section")
4. Press `Enter` - your changes disappear from Source Control and are saved in the stash
5. NVDA announces the Source Control panel update (file counts drop to 0)

#### Applying a stash

1. Press `Ctrl+Shift+P`, type "git stash pop"
2. Select "Git: Pop Stash..."
3. A list of stashes appears - navigate with `Up/Down Arrow`
4. Each item is announced with the stash message you wrote
5. Press `Enter` to apply and delete the stash
6. Your changes reappear in the Changes section

#### Viewing stashes

1. Press `Ctrl+Shift+P`, type "git stash list"
2. Or in the terminal: type `git stash list` and read the output line by line

</details>

<details>
<summary>Screen reader users (VoiceOver on macOS)</summary>

1. Press `Cmd+Shift+P`, type "git stash"
2. Select "Git: Stash" and provide a message
3. Press `Return`
4. To apply: `Cmd+Shift+P`, type "git stash pop", select from the list with `VO+Down Arrow`, press `Return`

</details>

<details>
<summary>GitHub.com web interface</summary>

GitHub.com does not have a stash feature. Stash is a local Git operation only. If you need to save work-in-progress without committing on GitHub.com:

1. Create a draft commit on a temporary branch
2. Or use GitHub Codespaces (which runs a full VS Code environment in the browser and supports `git stash` in the terminal)

</details>

<details>
<summary>CLI (git / gh) - stash commands</summary>

```bash
# Stash all uncommitted changes with a message
git stash push -m "WIP: documentation changes"

# Stash including untracked (new) files
git stash push -u -m "WIP: including new files"

# List all stashes
git stash list

# Show what a specific stash contains
git stash show stash@{0}
git stash show -p stash@{0}    # with full diff

# Apply the most recent stash (keep stash)
git stash apply

# Apply and delete the most recent stash
git stash pop

# Apply a specific stash
git stash apply stash@{1}

# Delete a specific stash
git stash drop stash@{0}

# Delete ALL stashes (careful)
git stash clear
```

</details>


## 10b. Emergency Recovery - git reflog

`git reflog` is the safety net you reach for when something goes seriously wrong: an accidental hard reset, a lost branch, a rebase that destroyed commits you needed. It is the most underused recovery tool in Git.

**What reflog records:** Every time the `HEAD` pointer moves - from commits, resets, rebases, checkouts, merges - Git quietly records it in the reflog. These entries are kept for 90 days by default.

### When to Use Reflog

| Scenario | What happened | Reflog solution |
| ----------  | --------------  | ------------------  |
| Deleted a branch by mistake | `git branch -D feature/x` | Find the last commit SHA from reflog → recreate branch |
| `git reset --hard` lost commits | Moved HEAD to older commit | Find the SHA before the reset → reset back to it |
| Rebase went wrong | Commits appear lost | Find pre-rebase HEAD → reset to it |
| Accidentally force-pushed | Local history destroyed | Find the SHA from reflog → restore |

### Reading the Reflog in VS Code Terminal

```bash
git reflog
```

Output looks like:

```text
abc1234 HEAD@{0}: commit: Fix typo in README
bcd2345 HEAD@{1}: reset: moving to HEAD~1
cde3456 HEAD@{2}: commit: Add accessibility section
def4567 HEAD@{3}: checkout: moving from main to feature/docs
```

Each line: `<SHA> HEAD@{N}: <what happened>`

**Screen reader tip:** Run this in the integrated terminal (`Ctrl+Backtick`). The output is plain text - read line by line with ↓. You are looking for the SHA just before the action that caused the problem.

### Recovering Lost Commits

#### If you need to restore a commit that has been lost

```bash
# Step 1 - Find the last good commit SHA in reflog
git reflog

# Step 2 - Preview what that commit looked like
git show abc1234

# Step 3a - Create a new branch at that point (safest)
git branch recovery/my-lost-work abc1234

# Step 3b - OR reset the current branch to that point
git reset --hard abc1234
```

> **Use `git branch` over `git reset --hard` when recovering** - creating a branch is non-destructive; you keep both the current state and the recovered state, then decide which to keep.

### Recovering a Deleted Branch

```bash
# Find the last commit on the deleted branch
git reflog | grep 'feature/deleted-branch-name'

# Recreate the branch at that SHA
git checkout -b feature/deleted-branch-name abc1234
```

### Why Reflog Is Local-Only

Reflog records are stored in your local `.git/` directory and are **not pushed to GitHub**. If your entire local clone is destroyed (hard drive failure, `rm -rf`), reflog cannot help - but GitHub retains the pushed commits in the remote history.

**Workshop tip:** If you run a reset or rebase during the workshop and lose something, immediately run `git reflog` before doing anything else. The recovery window is open as long as you haven't run `git gc`.

### Learning Cards: Emergency Recovery

<details>
<summary>Screen reader users</summary>

- Run `git reflog --oneline` in the terminal and arrow through the output -- each line announces a HEAD movement with its SHA and action description
- Copy the SHA you want to recover to by selecting it in the terminal (`Shift+Arrow`) then pressing `Ctrl+C`, then run `git checkout -b recovery <SHA>`
- Reflog entries are kept for 90 days -- you have time to recover, so do not panic

</details>

<details>
<summary>Low vision users</summary>

- `git reflog` output is columnar text: SHA on the left, action description on the right -- increase terminal font size with `Ctrl+=` for readability
- Each reflog entry starts with `HEAD@{N}` where N is the number of steps back -- lower numbers are more recent
- Use `git log --oneline --graph` after recovery to visually confirm the branch history looks correct

</details>

<details>
<summary>Sighted users</summary>

- Look for the SHA hash in the leftmost column of `git reflog` output -- these are the restore points you can checkout or reset to
- The action column (e.g., "commit:", "reset:", "checkout:") tells you what caused each HEAD movement
- After recovering with `git checkout -b`, verify in the Source Control panel that the branch appears with the expected files

</details>


## 11. Alternative Git Interfaces

VS Code's Source Control panel is one way to use Git. These alternatives exist for different workflows.

### GitHub Desktop

- **Graphical Git client**
- Download: [desktop.github.com](https://desktop.github.com)
- Strengths: Visual diff review, simpler branch management for beginners
- Screen reader support: Partial - keyboard navigation works for core flows but some visual-only elements exist

### GitHub CLI (`gh`)

- **Command-line interface for GitHub operations**
- Install: `winget install GitHub.cli` (Windows) or `brew install gh` (macOS)
- Strengths: Fast, scriptable, plain-text output (predictable for screen readers)

#### Common commands

```bash
gh repo clone owner/repo       # Clone a repository
gh issue list                  # List issues
gh pr create                   # Create a PR interactively
gh pr list                     # List your PRs
gh pr view 14                  # Read PR #14
```

See [Culture & Etiquette](08-open-source-culture.md) for more `gh` examples.

### Git CLI (Terminal)

- **The standard Git command-line interface**
- Included with VS Code (integrated terminal: `Ctrl+Backtick`)

#### Common commands

```bash
git status                     # Show modified files
git add .                      # Stage all changes
git commit -m "message"        # Commit with message
git push                       # Push to GitHub
git pull                       # Pull from GitHub
git log                        # View commit history
```

**Screen reader tip:** Terminal output is plain text - more predictable than GUI elements for some operations.


## VS Code Keyboard Shortcuts - Git Operations Quick Reference

| Action | Shortcut |
| --------  | ----------  |
| Open Source Control | `Ctrl+Shift+G` |
| Stage file | `Ctrl+Enter` (on file in Changes) |
| Unstage file | `Ctrl+Enter` (on file in Staged Changes) |
| Commit | `Ctrl+Enter` (in message input) |
| View file diff | `Enter` (on file in Source Control) |
| Next diff hunk | `F7` |
| Previous diff hunk | `Shift+F7` |
| Open Accessible Diff Viewer | `Alt+F2` (in diff view) |
| Accessible Help | `Alt+H` (in any panel) |
| Open Timeline view | `Ctrl+Shift+E` → navigate to Timeline section |
| Integrated terminal | `Ctrl+Backtick` |
| Delete file from repo (git rm) | `Ctrl+Shift+P` → "Git: Delete" |


## Try It: Clone, Branch, Commit

**Time:** 5 minutes | **What you need:** VS Code with Git configured

Do the complete Git workflow once, start to finish:

1. **Clone** - Press `Ctrl+Shift+P`, type `Git: Clone`, press `Enter`. Paste `https://github.com/Community-Access/vscode-sci-fi-themes.git` and choose a folder. VS Code opens the repo.
2. **Create a branch** - Click the branch name in the status bar (bottom left) or press `Ctrl+Shift+P` → `Git: Create Branch`. Name it `chapter11/your-name`.
3. **Make a change** - Open a theme file in the `themes/` folder (for example, `star-trek-settings.json`). Add a new thinking phrase to the array.
4. **Stage** - Press `Ctrl+Shift+G` to open Source Control. Navigate to your changed file and press `Enter` to stage it (or use the `+` button).
5. **Commit** - Tab to the message input, type `feat: add new thinking phrase`, press `Ctrl+Enter`.
6. **Push** - Press `Ctrl+Shift+P` → `Git: Push`.

**You're done.** You just completed the full Git cycle: clone → branch → edit → stage → commit → push.

> **What success feels like:** Your change is on GitHub. You can verify by visiting the repository and switching to your branch. Every future contribution follows this same six-step pattern. And your Copilot Chat now has a custom sci-fi loading phrase you wrote.

---

*Next: [Chapter 15: Code Review](15-code-review.md)*  
*Back: [Chapter 13: How Git Works](13-how-git-works.md)*  
*Related appendices: [Appendix E: Advanced Git](appendix-e-advanced-git.md) | [Appendix D: Git Authentication](appendix-d-git-authentication.md)*

