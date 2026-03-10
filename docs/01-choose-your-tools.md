# Choose Your Adventure: A Tool Tour

> **Day 1, Opening Material**
>
> Before you write your first line of code, you need to know what tools are available and which ones match the way you work. This chapter is a guided tour of the five tool environments you can use throughout this workshop. You do not need to install anything right now -- just explore what is available so you can make confident choices later.

## Table of Contents

1. [Why This Matters](#1-why-this-matters)
2. [The Five Paths](#2-the-five-paths)
3. [Path 1: GitHub.com (Browser)](#3-path-1-githubcom-browser)
4. [Path 2: github.dev (Browser-Based Editor)](#4-path-2-githubdev-browser-based-editor)
5. [Path 3: VS Code (Desktop)](#5-path-3-vs-code-desktop)
6. [Path 4: GitHub Desktop](#6-path-4-github-desktop)
7. [Path 5: GitHub CLI](#7-path-5-github-cli)
8. [Which Path Should I Start With?](#8-which-path-should-i-start-with)
9. [Your First Confidence Exercise](#9-your-first-confidence-exercise)
10. [If You Get Stuck](#10-if-you-get-stuck)

---

## 1. Why This Matters

There is no single "right" way to use GitHub. Some people prefer a browser. Some prefer a desktop application. Some prefer a terminal. Some switch between all of them depending on the task.

The workshop is designed so that every exercise can be completed using any of the five paths described below. When a chapter gives step-by-step instructions, it always covers at least the browser path and one local path. In later chapters, you will see **tool cards** -- expandable blocks that show how to complete a step using each tool.

Your job in this chapter is not to pick one path forever. It is to understand what each path offers so that when a chapter says "open the file," you know where that happens in your tool of choice.

> **Screen reader note:** Every path in this chapter is described by its interface behavior, not its visual appearance. If a path works well with your screen reader, that information is stated up front.

---

## 2. The Five Paths

The following table summarizes all five environments at a glance. Read through the summaries first, then explore the sections that interest you.

| Path | What It Is | Needs Installation? | Best For |
|---|---|---|---|
| **GitHub.com** | The GitHub website in your browser | No | Issues, pull requests, repository navigation, code review |
| **github.dev** | A VS Code editor that runs inside your browser | No | Editing files, multi-file changes, quick commits |
| **VS Code** | A desktop code editor with Git built in | Yes | Full development, extensions, terminal, Copilot |
| **GitHub Desktop** | A desktop Git client with a visual interface | Yes | Branching, committing, and syncing without typing commands |
| **GitHub CLI** | A command-line tool called `gh` | Yes | Scripting, automation, power users who prefer the terminal |

> **You do not need all five.** Most students start with GitHub.com (Path 1) on Day 1 and add VS Code (Path 3) on Day 2. The other paths are available if they match your workflow.

---

## 3. Path 1: GitHub.com (Browser)

**What it is:** The GitHub website at [github.com](https://github.com). Every repository, issue, pull request, and setting lives here. If you have a browser, you have GitHub.

**No installation required.** Sign in at github.com and you are ready.

### What you can do here

- Browse repositories, files, and folders
- Create, comment on, and close issues
- Open, review, and merge pull requests
- Edit individual files using the built-in web editor (pencil icon)
- Manage labels, milestones, and project boards
- Configure repository settings and branch protection

### What you cannot do here

- Run code or tests locally
- Use a full-featured code editor with extensions
- Make offline changes

### Screen reader experience

GitHub.com has strong screen reader support. Every page uses ARIA landmarks, headings follow a consistent hierarchy, and keyboard shortcuts are available for most actions.

Key navigation patterns:

| Action | How to do it |
|---|---|
| Jump to main content | `S` shortcut on any page, or navigate to the "main" landmark |
| Open search | `/` or `S` key |
| Navigate tabs (Code, Issues, PRs) | `D` to the "Repository navigation" landmark, then arrow keys |
| Jump between headings | `H` key in browse mode |
| Jump between landmarks | `D` key in browse mode |

> **Screen reader tip:** [Chapter 2](02-understanding-github.md) covers GitHub's page structure in full detail. If you are new to GitHub with a screen reader, read that chapter next.

### Low vision experience

GitHub supports light and dark themes, high contrast themes, and responds to your operating system's contrast preferences. To configure your preferred theme:

1. Go to [github.com/settings/appearance](https://github.com/settings/appearance)
2. Choose from Light, Dark, Light high contrast, or Dark high contrast
3. Or select "Sync with system" to follow your OS setting

GitHub's layout adapts to browser zoom up to 400% without horizontal scrolling on most pages.

---

## 4. Path 2: github.dev (Browser-Based Editor)

**What it is:** A VS Code editor that runs entirely in your browser. Open any repository by pressing the `.` key on its GitHub page, or by changing `github.com` to `github.dev` in the URL.

**No installation required.** Same browser, same sign-in, richer editor.

### What you can do here

- Edit multiple files in a VS Code-like interface with a file explorer, tabs, and an integrated terminal preview
- View file diffs and stage changes
- Commit directly to a branch
- Use many VS Code extensions that run in the browser

### What you cannot do here

- Run code, build projects, or execute terminal commands (the terminal is read-only for Git operations)
- Use extensions that require a local runtime (debuggers, compiled tools)
- Work offline

### How to open it

| Method | Steps |
|---|---|
| From any repo page | Press the `.` (period) key on your keyboard |
| From the URL bar | Change `github.com` to `github.dev` in the URL |
| From a file | While viewing a file on GitHub.com, press `.` to open it in the editor |

### Screen reader experience

github.dev is VS Code running in the browser, so the same keyboard navigation and screen reader support applies. The command palette (`Ctrl+Shift+P` or `Cmd+Shift+P`) is available, and all editor keybindings work.

> **Note:** Some screen readers may need to switch to focus mode or application mode to interact with the editor area. If keystrokes are not reaching the editor, try pressing `Escape` to ensure focus is in the editor, then `Ctrl+Shift+P` for the command palette.

### When to use github.dev over GitHub.com

Use github.dev when you need to edit more than one file in a single commit, or when you want the code editor experience without installing anything. For single-file edits, the pencil icon on GitHub.com is simpler.

---

## 5. Path 3: VS Code (Desktop)

**What it is:** Visual Studio Code is a free desktop code editor from Microsoft. It has built-in Git support, an integrated terminal, thousands of extensions, and GitHub Copilot included.

**Installation required.** Download from [code.visualstudio.com](https://code.visualstudio.com/). Installation is covered in [Chapter 0, Step 6](00-pre-workshop-setup.md#step-6---install-git-and-visual-studio-code).

### What you can do here

- Edit files with full IntelliSense, syntax highlighting, and extension support
- Use the integrated terminal to run Git commands, scripts, and programs
- Stage, commit, push, and pull using the Source Control panel or the terminal
- Run and debug code
- Use GitHub Copilot for code suggestions, chat, and code review
- Work offline (Git operations sync when you reconnect)

### What you cannot do here (without extensions)

- Manage GitHub issues and pull requests directly (install the [GitHub Pull Requests extension](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github) for this)
- View repository insights or settings (use GitHub.com for that)

### Screen reader experience

VS Code has a dedicated accessibility mode that activates automatically when a screen reader is detected. Key features:

- Screen reader optimized mode announces line content, cursor position, and editor state
- The Accessibility Help dialog (`Alt+F1` or `Option+F1`) is available in every view
- All panels are reachable via keyboard shortcuts:

| Panel | Shortcut (Windows/Linux) | Shortcut (macOS) |
|---|---|---|
| File Explorer | `Ctrl+Shift+E` | `Cmd+Shift+E` |
| Source Control | `Ctrl+Shift+G` | `Cmd+Shift+G` |
| Terminal | `` Ctrl+` `` | `` Cmd+` `` |
| Command Palette | `Ctrl+Shift+P` | `Cmd+Shift+P` |
| Extensions | `Ctrl+Shift+X` | `Cmd+Shift+X` |
| Problems panel | `Ctrl+Shift+M` | `Cmd+Shift+M` |

> **Deep dive:** [Chapter 11](11-vscode-interface.md) covers the VS Code interface in detail. [Chapter 12](12-vscode-accessibility.md) covers accessibility-specific configuration. [Appendix G](appendix-g-vscode-reference.md) is the quick-reference card.

### Low vision experience

VS Code supports high contrast themes, custom zoom levels (`Ctrl+=` to zoom in, `Ctrl+-` to zoom out), and configurable font sizes. The minimap (the small code preview on the right side of the editor) can be disabled if it is distracting: open the command palette, type "minimap," and toggle the setting.

---

## 6. Path 4: GitHub Desktop

**What it is:** A desktop application that provides a graphical interface for Git operations. Instead of typing `git commit` in a terminal, you use buttons, lists, and visual diffs.

**Installation required.** Download from [desktop.github.com](https://desktop.github.com/). See [Appendix H](appendix-h-github-desktop.md) for setup details.

### What you can do here

- Clone repositories with one click
- Create, switch, and merge branches
- View file diffs in a side-by-side or unified view
- Stage individual files or specific lines within a file
- Commit with a message and push to GitHub
- Open pull requests (launches GitHub.com)

### What you cannot do here

- Edit code (GitHub Desktop is a Git client, not a code editor -- it opens your preferred editor)
- Review pull requests with inline comments
- Manage issues, labels, or project boards

### Screen reader experience

GitHub Desktop uses Electron and provides basic screen reader support. Branch switching, commit history, and file lists are navigable. However, the diff viewer has limited screen reader support compared to the VS Code diff viewer or the GitHub.com Files Changed tab.

> **Recommendation for screen reader users:** GitHub Desktop works best as a companion to VS Code or a text editor. Use VS Code for editing and reviewing diffs, and GitHub Desktop for visual branch management if you prefer a graphical tool.

### When to choose GitHub Desktop

Choose GitHub Desktop if you prefer a visual representation of branches and commits, and you do not want to memorize Git commands. It is a good stepping stone between the GitHub.com web editor and the full VS Code workflow.

---

## 7. Path 5: GitHub CLI

**What it is:** A command-line tool called `gh` that brings GitHub features to your terminal. It handles authentication, issue management, pull request workflows, and repository operations -- directly from the command line.

**Installation required.** Install via `winget install GitHub.cli` (Windows), `brew install gh` (macOS), or see [Appendix I](appendix-i-github-cli.md) for full instructions.

### What you can do here

- Create, view, and close issues: `gh issue create`, `gh issue view 42`
- Open, review, merge PRs: `gh pr create`, `gh pr review`, `gh pr merge`
- Clone repos and manage branches: `gh repo clone owner/repo`
- View CI/CD status: `gh run list`, `gh run view`
- Manage repository settings, labels, and releases
- Automate workflows with shell scripts

### What you cannot do here

- Edit files (the CLI manages GitHub operations, not file editing -- use your preferred editor)
- View visual diffs (use `git diff` for text-based diffs, or VS Code for a richer view)

### Screen reader experience

The GitHub CLI is a text-based tool running in a terminal. Screen reader users read its output directly as plain text -- no landmarks, headings, or ARIA to worry about. Output is generally well-formatted with tables and structured text.

> **Tip for terminal users:** The `gh` command integrates with `git` seamlessly. After running `gh repo clone`, all standard `git` commands work in the cloned directory. You can mix `git` and `gh` commands freely.

### When to choose GitHub CLI

Choose the CLI if you are comfortable in a terminal and want fast, scriptable access to GitHub features. It pairs well with VS Code's integrated terminal, giving you the best of both worlds.

---

## 8. Which Path Should I Start With?

There is no wrong answer, but here is practical guidance based on when different tools become most useful in the workshop.

### Day 1 recommendation

| Your comfort level | Recommended starting path | Why |
|---|---|---|
| New to GitHub, new to coding | **GitHub.com (browser)** | Everything happens in one window. No installs. Clear, labeled interface. |
| Some web experience, want to edit files | **GitHub.com + github.dev** | Use the browser for navigation, press `.` to edit when needed. |
| Already use VS Code | **VS Code + GitHub.com** | Edit locally, use the browser for issues and PRs. |

### Day 2 recommendation

On Day 2, you work with Git locally. Most students add VS Code (Path 3) at this point:

| Your Day 1 path | Day 2 addition | How they work together |
|---|---|---|
| GitHub.com only | Add **VS Code** | Clone the repo, edit locally, push changes, review PRs in the browser |
| GitHub.com + github.dev | Add **VS Code** | Transition from browser editing to local editing with full tool support |
| VS Code already | Add **GitHub CLI** (optional) | Speed up repetitive operations like creating issues and PRs |

### Switching paths is normal

You will likely use more than one tool during the workshop. The tools complement each other:

- **Browse** the repository on GitHub.com to understand its structure
- **Edit** files in VS Code or github.dev for a better coding experience
- **Manage** branches in GitHub Desktop if you prefer the visual workflow
- **Automate** repetitive tasks with the GitHub CLI

The workshop chapters always tell you which tool to use for each step. If a step says "open the file in your editor," use whichever editor you chose.

---

## 9. Your First Confidence Exercise

This exercise takes approximately five minutes. It verifies your tool is working and builds your confidence before Day 1 begins.

### The task

Open the workshop's learning-room repository and find the README file.

### Path 1: GitHub.com

1. Go to [github.com/Community-Access/learning-room](https://github.com/Community-Access/learning-room).
2. The README is displayed below the file list on the repository's home page.
3. Screen reader users: press `H` to navigate headings. The README's first heading announces the repository name.
4. You are done when you can read the first paragraph of the README.

### Path 2: github.dev

1. Go to [github.dev/Community-Access/learning-room](https://github.dev/Community-Access/learning-room).
2. The file explorer opens on the left. Press `Ctrl+Shift+E` (or `Cmd+Shift+E`) to focus it.
3. Navigate to `README.md` and press `Enter` to open it in a tab.
4. You are done when the file content appears in the editor.

### Path 3: VS Code (if set up)

1. Open VS Code.
2. Open the command palette: `Ctrl+Shift+P` (or `Cmd+Shift+P`).
3. Type "Git: Clone" and press `Enter`.
4. Paste the URL: `https://github.com/Community-Access/learning-room.git`
5. Choose a folder to clone into and wait for the download.
6. When it finishes, VS Code offers to open the repository. Accept.
7. Open the file explorer (`Ctrl+Shift+E`) and select `README.md`.
8. You are done when the file content appears in the editor.

### Path 4: GitHub Desktop

1. Open GitHub Desktop.
2. Go to File, then Clone repository (or press `Ctrl+Shift+O`).
3. Paste the URL: `https://github.com/Community-Access/learning-room.git`
4. Choose a local path and click Clone.
5. Once cloned, the repository appears in GitHub Desktop. Click "Open in Visual Studio Code" (or your preferred editor) to read the README.

### Path 5: GitHub CLI

1. Open your terminal.
2. Run:

```bash
gh repo clone Community-Access/learning-room
cd learning-room
```

3. Open the README in your preferred way:

```bash
cat README.md       # print to terminal
code README.md      # open in VS Code
```

4. You are done when you can read the first paragraph.

### What success looks like

You opened a real repository and found a real file. That is the core action of this entire workshop -- everything else builds on it.

---

## 10. If You Get Stuck

| Problem | What to try |
|---|---|
| Cannot sign in to GitHub.com | Verify your email and password. Check [Chapter 0, Step 1](00-pre-workshop-setup.md#step-1---create-your-github-account). |
| github.dev does not open | Ensure you are signed in to GitHub.com first. Some browsers block the redirect -- try Chrome or Firefox. |
| VS Code is not installed | Follow [Chapter 0, Step 6](00-pre-workshop-setup.md#step-6---install-git-and-visual-studio-code). |
| Git clone fails | Check your internet connection. Verify Git is installed: run `git --version` in a terminal. See [Appendix D](appendix-d-git-authentication.md) for authentication issues. |
| Screen reader does not announce page content | Ensure browse mode is active (NVDA: press `Escape`; JAWS: press `Num Pad Plus`). Maximize the browser window. |
| Not sure which path to choose | Start with GitHub.com in your browser. You can always add more tools later. |
| GitHub Desktop cannot find the repo | Verify the URL is correct and your GitHub account has access to the repository. |
| GitHub CLI says "not authenticated" | Run `gh auth login` and follow the prompts. See [Appendix I](appendix-i-github-cli.md). |

**If nothing in this table helps:** Post on your challenge issue with what you tried, what happened, and what you expected. A facilitator or buddy will help you before Day 1 begins.

---

*Next: [Understanding GitHub](02-understanding-github.md)*
*Back: [Pre-Workshop Setup](00-pre-workshop-setup.md)*
*Related: [VS Code Interface](11-vscode-interface.md) | [GitHub Desktop](appendix-h-github-desktop.md) | [GitHub CLI](appendix-i-github-cli.md) | [Cloud Editors](appendix-j-cloud-editors.md)*
