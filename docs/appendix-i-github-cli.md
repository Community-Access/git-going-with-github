# Appendix I: GitHub CLI Reference
>
> **Episode coming soon:** GitHub CLI Reference - a conversational audio overview of this appendix. Listen before reading to preview the concepts, or after to reinforce what you learned.

> **Reference companion to:** [Chapter 01: Choose Your Tools](01-choose-your-tools.md) | Also relevant: [Chapter 14](14-git-in-practice.md)
>
> **Authoritative source:** [GitHub CLI Manual](https://cli.github.com/manual/) | [GitHub Accessibility Lab: CLI Guide](https://accessibility.github.com/documentation/guide/cli/)

## Your Terminal, Supercharged for GitHub

> **Who this is for:** You want to manage GitHub — issues, pull requests, repos, releases — from your terminal without opening a browser. The GitHub CLI (`gh`) gives you full access to GitHub from the command line, with clean plain-text output that works beautifully with screen readers.
>
> `gh` handles the GitHub side of things (issues, PRs, repos, releases). `git` handles the local version control side (commits, branches, history). You use both together.

### Getting started principles for accessible CLI workflows

- Follow a local-to-remote progression: learn `git` basics first, then layer `gh` workflows.
- Treat terminal output as the source of truth. Confirm each command result before moving on.
- Prefer short, reversible steps: clone, inspect, branch, edit, commit, push, open PR.
- Keep one reliable terminal profile and one reliable editor setup rather than constant tool switching.
- Use browser fallback strategically for verification, not as a replacement for command understanding.

---

## Table of Contents

1. [Installing and Authenticating](#1-installing-and-authenticating)
2. [Repos — Clone, Fork, Create, View](#2-repos--clone-fork-create-view)
3. [Issues — Create, List, View, Comment, Close](#3-issues--create-list-view-comment-close)
4. [Pull Requests — Create, Review, Merge, Check](#4-pull-requests--create-review-merge-check)
5. [Releases — Create, List, Upload](#5-releases--create-list-upload)
6. [Search — Issues, PRs, Repos, Code](#6-search--issues-prs-repos-code)
7. [Labels and Milestones](#7-labels-and-milestones)
8. [Output Formatting — JSON, jq, Templates](#8-output-formatting--json-jq-templates)
9. [Aliases — Create Your Own Shortcuts](#9-aliases--create-your-own-shortcuts)
10. [Extensions — Adding New Commands](#10-extensions--adding-new-commands)
11. [Copilot in the CLI](#11-copilot-in-the-cli)
12. [Screen Reader Tips](#12-screen-reader-tips)
13. [Quick Reference Card](#13-quick-reference-card)

---

## 1. Installing and Authenticating

### Installing

#### Windows

```bash
winget install GitHub.cli
```

Or download the installer from [cli.github.com](https://cli.github.com).

#### macOS

```bash
brew install gh
```

#### Linux (Debian/Ubuntu)

```bash
(type -p wget >/dev/null || (sudo apt update && sudo apt-get install wget -y)) \
&& sudo mkdir -p -m 755 /etc/apt/keyrings \
&& wget -qO- https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo tee /etc/apt/keyrings/githubcli-archive-keyring.gpg > /dev/null \
&& sudo chmod go+r /etc/apt/keyrings/githubcli-archive-keyring.gpg \
&& echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
&& sudo apt update \
&& sudo apt install gh -y
```

#### Verify installation

```bash
gh --version
```

### Authenticating

```bash
gh auth login
```

Follow the prompts:

- **Where do you use GitHub?** → GitHub.com (or Enterprise)
- **Preferred protocol?** → HTTPS (or SSH)
- **Authenticate with browser?** → Yes — your browser opens for OAuth sign-in

After signing in, return to the terminal. You're done.

```bash
# Check your auth status at any time
gh auth status

# Log out
gh auth logout

# Refresh credentials / add new scopes
gh auth refresh
```

> **Screen reader tip:** `gh auth login` is an interactive prompt — navigate with `Arrow` keys, confirm with `Enter`. All prompts are plain text and read naturally. The browser step opens automatically; switch back to the terminal when the browser confirms success.

> **Command safety guideline:** Use options documented in `gh --help` and the [GitHub CLI manual](https://cli.github.com/manual/). Avoid undocumented or experimental flags in classroom and production workflows.

### Windows Terminal setup pattern

If you are on Windows, configure Windows Terminal once and reuse it:

1. Keep a dedicated shell profile for your Git workflows.
2. Learn mark mode (`Ctrl+Shift+M`) to review and copy command output line by line.
3. Use command palette (`Ctrl+Shift+P`) to find terminal actions without memorizing every shortcut.
4. Keep your font size and contrast settings stable so output remains readable across sessions.

### Learning Cards: Getting Started with gh

<details>
<summary>Screen reader users</summary>

- `gh auth login` uses plain-text arrow-key prompts -- every option is announced as you arrow through the list
- After authentication, `gh auth status` confirms your login in a single readable line -- no browser needed
- All `gh` output is plain text with no hidden elements, making it one of the most screen-reader-friendly GitHub interfaces

</details>

<details>
<summary>Low vision users</summary>

- Increase your terminal font size before running `gh` commands -- all output scales with your terminal settings
- Use a high-contrast terminal theme (light text on dark background, or vice versa) for comfortable reading of command output
- `gh` output is plain text with no color-dependent meaning -- colors are supplementary labels, not the only indicator

</details>

<details>
<summary>Sighted users</summary>

- The interactive prompts use arrow-based selection with a highlight marker -- look for the `>` indicator next to your current choice
- After `gh auth login`, the terminal prints a success confirmation with your username -- verify it matches your GitHub account
- Install `gh` via winget or brew for the fastest setup; the binary is immediately available in your current terminal session

</details>

---

## 2. Repos — Clone, Fork, Create, View

```bash
# Clone a repository (automatically sets up the remote)
gh repo clone owner/repo-name

# Fork a repo and clone your fork in one step
gh repo fork owner/repo-name --clone

# Fork without cloning (creates the fork on GitHub only)
gh repo fork owner/repo-name

# Create a brand new repository
gh repo create my-new-project
gh repo create my-new-project --public --description "My project description"
gh repo create my-new-project --private

# View a repository's details
gh repo view
gh repo view owner/repo-name

# Open the repo in your browser
gh repo view --web

# List your repositories
gh repo list
gh repo list --limit 50

# List repos for an org
gh repo list my-org --limit 100

# Archive a repository
gh repo archive owner/repo-name

# Delete a repository (careful!)
gh repo delete owner/repo-name --confirm

# Sync your fork with upstream
gh repo sync
gh repo sync --branch main
```

---

## 3. Issues — Create, List, View, Comment, Close

### Creating issues

```bash
# Create an issue interactively (opens a prompt for title, body, labels, etc.)
gh issue create

# Create with all details inline
gh issue create \
  --title "Screen reader can't navigate the settings menu" \
  --body "When using NVDA with Firefox, the Settings menu items are not announced..." \
  --label "bug,accessibility" \
  --assignee "@me"

# Create from a Markdown file (great for detailed bug reports)
gh issue create --title "Accessibility audit findings" --body-file ./report.md
```

### Listing and filtering issues

```bash
# List open issues (current repo)
gh issue list

# List issues with filters
gh issue list --label "accessibility"
gh issue list --label "good first issue"
gh issue list --assignee "@me"
gh issue list --state closed
gh issue list --limit 50

# Search issues by keyword
gh issue list --search "screen reader"

# List issues across all repos you watch
gh issue list --repo owner/repo-name
```

### Viewing issues

```bash
# View an issue (renders Markdown as plain text in the terminal)
gh issue view 42

# Open the issue in your browser
gh issue view 42 --web

# View comments on an issue
gh issue view 42 --comments
```

> **Screen reader tip:** `gh issue view 42` outputs clean plain text — title, metadata, and body all formatted without noise. Read line by line with `Arrow` keys. Much faster than navigating a browser page with a screen reader.

### Commenting and updating

```bash
# Add a comment to an issue
gh issue comment 42 --body "I can reproduce this on Windows 11 with NVDA 2024.1."

# Comment from a file
gh issue comment 42 --body-file ./my-comment.md

# Edit an issue (title, body, labels, assignees)
gh issue edit 42 --title "Updated title"
gh issue edit 42 --add-label "needs-reproduction"
gh issue edit 42 --remove-label "bug"
gh issue edit 42 --add-assignee username

# Close an issue
gh issue close 42
gh issue close 42 --comment "Fixed in PR #56."
gh issue close 42 --reason "not planned"

# Reopen a closed issue
gh issue reopen 42
```

### Pinning and locking

```bash
# Pin an issue (shows at top of the Issues tab)
gh issue pin 42

# Lock an issue (prevents new comments)
gh issue lock 42 --reason "resolved"
```

---

## 4. Pull Requests — Create, Review, Merge, Check

### Creating a PR

```bash
# Create a PR interactively (prompts for title, body, base branch, etc.)
gh pr create

# Create with all details inline
gh pr create \
  --title "Add keyboard navigation to settings menu" \
  --body "Closes #42. Adds Tab/arrow key support to the settings dropdown." \
  --base main \
  --label "accessibility,enhancement"

# Create as a draft
gh pr create --draft

# Create from a file
gh pr create --title "Accessibility improvements" --body-file ./pr-description.md

# Open the PR creation form in your browser
gh pr create --web
```

### Listing and viewing PRs

```bash
# List open PRs
gh pr list

# List with filters
gh pr list --state closed
gh pr list --author "@me"
gh pr list --label "accessibility"
gh pr list --search "screen reader"

# View a PR (title, description, status, checks)
gh pr view 56

# View the diff of a PR
gh pr diff 56

# Open the PR in your browser
gh pr view 56 --web

# Check out a PR branch locally (to test it)
gh pr checkout 56
```

### Reviewing PRs

```bash
# Approve a PR
gh pr review 56 --approve
gh pr review 56 --approve --body "Tested with NVDA — keyboard nav works perfectly. LGTM!"

# Request changes
gh pr review 56 --request-changes --body "The focus indicator disappears on the last menu item."

# Leave a comment review (no approval/rejection)
gh pr review 56 --comment --body "A few observations — see inline comments."
```

### Checking CI status

```bash
# View all CI checks for a PR
gh pr checks 56

# Watch checks update in real time (refreshes every 10s)
gh pr checks 56 --watch

# View checks for the current branch
gh pr checks
```

### Merging PRs

```bash
# Merge a PR (interactive — prompts for merge strategy)
gh pr merge 56

# Merge with a specific strategy
gh pr merge 56 --merge          # Creates a merge commit
gh pr merge 56 --squash         # Squashes all commits into one
gh pr merge 56 --rebase         # Rebases commits onto base branch

# Auto-merge when checks pass (great for PRs waiting on CI)
gh pr merge 56 --auto --squash

# Delete the branch after merging
gh pr merge 56 --squash --delete-branch
```

### Other PR operations

```bash
# Convert a draft PR to ready for review
gh pr ready 56

# Mark a ready PR back as draft
gh pr ready 56 --undo

# Update your PR branch with the latest from base (equivalent to "Update branch" button)
gh pr update-branch 56
gh pr update-branch 56 --rebase

# Close a PR without merging
gh pr close 56
gh pr close 56 --comment "Superseded by #58."

# Reopen a closed PR
gh pr reopen 56

# Add a comment to a PR
gh pr comment 56 --body "Thanks for the thorough review! Addressing feedback now."
```

---

## 5. Releases — Create, List, Upload

```bash
# Create a release interactively
gh release create v1.2.0

# Create with all details
gh release create v1.2.0 \
  --title "Version 1.2.0 — Accessibility Improvements" \
  --notes "- Fixed keyboard navigation in settings\n- Added ARIA labels to all form inputs"

# Create from a notes file
gh release create v1.2.0 --notes-file ./CHANGELOG.md

# Create a pre-release
gh release create v1.2.0-beta.1 --prerelease

# Create a draft release (not published yet)
gh release create v1.2.0 --draft

# Upload files to a release
gh release upload v1.2.0 ./dist/app.zip ./dist/app.tar.gz

# List releases
gh release list

# View a release
gh release view v1.2.0

# Download release assets
gh release download v1.2.0
gh release download v1.2.0 --pattern "*.zip"

# Delete a release
gh release delete v1.2.0
```

> **See also:** [Appendix H: Releases, Tags, and Insights](appendix-s-releases-tags-insights.md) for the GitHub.com interface side of releases.

---

## 6. Search — Issues, PRs, Repos, Code

```bash
# Search issues across all of GitHub
gh search issues "screen reader navigation" --label accessibility
gh search issues "keyboard shortcut" --repo owner/repo-name
gh search issues "help wanted" --language javascript --limit 20

# Search pull requests
gh search prs "accessibility fix" --state open
gh search prs "WCAG" --author username

# Search repositories
gh search repos "accessible markdown editor" --language python --stars ">100"
gh search repos "screen reader" --topic accessibility

# Search code
gh search code "aria-label" --repo owner/repo-name
gh search code "git cherry-pick" --language markdown
```

---

## 7. Labels and Milestones

### Labels

```bash
# List labels in the current repo
gh label list

# Create a label
gh label create "accessibility" --color "0075ca" --description "Accessibility improvements"

# Clone labels from another repo (copies all their labels to yours)
gh label clone owner/source-repo

# Delete a label
gh label delete "wontfix"
```

### Milestones

```bash
# List milestones
gh api repos/{owner}/{repo}/milestones --jq '.[].title'

# Create a milestone
gh api repos/{owner}/{repo}/milestones \
  --method POST \
  --field title="v2.0 Launch" \
  --field description="All features for the v2.0 release" \
  --field due_on="2026-06-01T00:00:00Z"
```

---

## 8. Output Formatting — JSON, jq, Templates

By default `gh` outputs human-readable text. For scripting or custom display, you can get raw JSON and filter it.

### --json flag

```bash
# Get issue data as JSON
gh issue view 42 --json title,body,labels,state

# Get PR data as JSON
gh pr view 56 --json title,number,state,mergeable,reviews

# List issues as JSON
gh issue list --json number,title,labels,assignees
```

### --jq flag (filter JSON inline)

```bash
# List just issue numbers and titles
gh issue list --json number,title --jq '.[] | "\(.number): \(.title)"'

# Get the names of all labels on an issue
gh issue view 42 --json labels --jq '.labels[].name'

# Count open PRs
gh pr list --json number --jq 'length'

# List reviewers who approved a PR
gh pr view 56 --json reviews --jq '[.reviews[] | select(.state=="APPROVED") | .author.login] | unique'
```

### --template flag (Go templates)

```bash
# Custom formatted output
gh issue list --template '{{range .}}#{{.number}} {{.title}} ({{.state}}){{"\n"}}{{end}}'
```

> **Screen reader tip:** `--json` with `--jq` produces clean, predictable output — ideal for piping to a file or reading with a screen reader. The default human-readable output is also clean, but JSON gives you precise control over what's announced.

### Learning Cards: Output Formatting

<details>
<summary>Screen reader users</summary>

- Use `--json` with `--jq` to extract exactly the fields you need -- this eliminates table formatting noise and reads as clean key-value pairs
- Pipe long output to a file (`gh issue list --json title > issues.txt`) and open it in VS Code for structured navigation with `Alt+F2`
- Go templates (`--template`) let you define a single-line-per-item format that reads naturally with arrow keys

</details>

<details>
<summary>Low vision users</summary>

- The default table output aligns columns with spaces -- increase terminal font size so columns stay readable
- JSON output with `--jq` strips visual formatting and gives compact text that scales cleanly with any font size
- Pipe output to VS Code (`gh pr view 42 --json body --jq '.body' | code -`) to read it with your preferred editor theme and zoom

</details>

<details>
<summary>Sighted users</summary>

- Default table output is already human-readable with aligned columns -- scan the header row to orient on each column
- Use `--web` on any command to open the result in your browser if you prefer the GitHub web interface for detailed views
- Chain `| head -20` (macOS/Linux) or `| Select-Object -First 20` (PowerShell) to preview long output before reading the full list

</details>

---

## 9. Aliases — Create Your Own Shortcuts

Aliases let you create custom `gh` commands from long commands you run often.

```bash
# Create an alias
gh alias set bugs 'issue list --label bug'
gh alias set my-prs 'pr list --author @me'
gh alias set review-ready 'pr list --label "ready for review"'

# Use your alias
gh bugs
gh my-prs
gh review-ready

# List all aliases
gh alias list

# Delete an alias
gh alias delete bugs

# Create a shell alias (runs a shell command, not just gh commands)
gh alias set --shell open-pr 'gh pr view $1 --web'
gh open-pr 56   # opens PR #56 in the browser
```

### Useful aliases to set up

```bash
# Issues assigned to you
gh alias set mine 'issue list --assignee @me'

# Your open PRs
gh alias set mypr 'pr list --author @me --state open'

# Check CI on current branch's PR
gh alias set ci 'pr checks'

# View current PR
gh alias set pr 'pr view'
```

---

## 10. Extensions — Adding New Commands

Extensions add new `gh` subcommands written by the community.

```bash
# Browse available extensions
gh extension search

# Install an extension
gh extension install owner/gh-extension-name

# List installed extensions
gh extension list

# Update all extensions
gh extension upgrade --all

# Update a specific extension
gh extension upgrade owner/gh-extension-name

# Remove an extension
gh extension remove owner/gh-extension-name
```

### Useful extensions

| Extension | What it does | Install |
|-----------|-------------|---------|
| `github/gh-copilot` | Ask Copilot questions in the terminal | `gh extension install github/gh-copilot` |
| `nicokosi/gh-notify` | Desktop notifications for GitHub events | `gh extension install nicokosi/gh-notify` |
| `mislav/gh-branch` | Better branch switching with fuzzy search | `gh extension install mislav/gh-branch` |

---

## 11. Copilot in the CLI

Install the Copilot extension once, then ask coding and git questions without leaving the terminal.

```bash
# Install (one time)
gh extension install github/gh-copilot

# Ask for a command suggestion
gh copilot suggest "squash my last 4 commits into one"
gh copilot suggest "find which commit introduced a bug in auth.js"
gh copilot suggest "create a pull request from my current branch"

# Explain a command you don't recognize
gh copilot explain "git rebase -i HEAD~3"
gh copilot explain "git bisect start"
gh copilot explain "find . -name '*.md' -mtime -7"
```

Copilot CLI shows the suggested command, explains what it does, and asks whether to run it - perfect for learning while doing.

### Auto model selection

As of early 2026, `gh copilot` uses **auto model selection** by default - it picks the best available model for your request without you needing to specify one. You can still request a specific model using the `--model` flag if you prefer:

```bash
# Let Copilot choose automatically (default)
gh copilot suggest "create a pull request from my current branch"

# Request a specific model
gh copilot suggest --model gpt-5 "create a pull request from my current branch"
```

### Telemetry opt-out

As of gh CLI 2.70 (April 2026), `gh` collects anonymized usage telemetry by default to improve the product. To opt out:

```bash
gh config set telemetry disabled
```

Or set the environment variable `GH_NO_UPDATE_NOTIFIER=1` to suppress update notifications only.

> **See also:** [Appendix AA: Advanced Git Operations, Section 11](appendix-e-advanced-git.md#11-using-github-copilot-for-git-operations) for more Copilot CLI examples with git operations.

---

## 12. Screen Reader Tips

The GitHub CLI is one of the most screen-reader-friendly ways to use GitHub. Here's why and how to get the most out of it.

### Why the CLI works so well

- **Plain text output** — no visual noise, no unlabelled buttons, no hidden dialogs
- **Predictable structure** — every command produces consistent output you can navigate with arrow keys
- **No focus traps** — you control when you read output; nothing streams unexpectedly
- **Keyboard-first by design** — everything is a command you type

### Tips by task

**Reading issues and PRs:**

```bash
# Pipe output to less for page-by-page reading
gh issue view 42 | less

# Save to a file and open in your editor
gh pr view 56 > pr-56.md
code pr-56.md
```

**Navigating long lists:**

```bash
# Limit results to a manageable number
gh issue list --limit 10

# Combine with search to narrow down
gh issue list --search "keyboard" --limit 5
```

**Getting just what you need:**

```bash
# Get just the PR title
gh pr view 56 --json title --jq '.title'

# Get just the issue body
gh issue view 42 --json body --jq '.body'

# Get CI check status as a simple list
gh pr checks 56 --json name,state --jq '.[] | "\(.state): \(.name)"'
```

**Creating content without a browser:**

```bash
# Write your issue body in a text file first (easier with a screen reader)
# Then create the issue from the file
gh issue create --title "Bug: focus lost after modal closes" --body-file ./issue.md
```

### NVDA / JAWS (Windows)

- Run `gh` commands in Windows Terminal or the VS Code integrated terminal — both work well with NVDA/JAWS
- Use `Insert+Down` (NVDA) or `Insert+F12` (JAWS) to read the current line of terminal output
- For long output, use `| less` and navigate with `Space` (next page) and `b` (back)

### VoiceOver (macOS)

- Run `gh` in Terminal.app or VS Code integrated terminal
- `VO+Right` moves through terminal output character by character; `VO+Down` line by line
- Use `Ctrl+C` to stop a running command if output is too long

### Learning Cards: Screen Reader CLI Workflow

<details>
<summary>Screen reader users</summary>

- `gh` is keyboard-first by design -- no focus traps, no streaming, no unlabelled buttons; everything is typed and read as plain text
- Use `Insert+Down` (NVDA) or `Insert+F12` (JAWS) to read the current line, and arrow keys to move through multi-line output
- Write issue and PR bodies in a text file first, then use `--body-file ./issue.md` to submit -- much easier than composing inline

</details>

<details>
<summary>Low vision users</summary>

- Terminal output from `gh` has no icons or images -- all information is conveyed as text that scales with your terminal font
- Use `--limit 10` on list commands to keep output short enough to scan comfortably without scrolling
- Run `gh` in the VS Code integrated terminal to benefit from VS Code's zoom, themes, and Accessible View (`Alt+F2`)

</details>

<details>
<summary>Sighted users</summary>

- `gh` output uses subtle color coding (green for open, red for closed) -- these are supplementary; the text labels are always present
- Use `gh pr view --web` or `gh issue view --web` to jump to the browser when you want the full visual GitHub interface
- The `gh pr checks` command gives a quick pass/fail summary of CI checks without opening the browser

</details>

---

## 13. Quick Reference Card

### Authentication

| Command | What it does |
|---------|-------------|
| `gh auth login` | Sign in to GitHub |
| `gh auth status` | Check login status |
| `gh auth logout` | Sign out |

### Repos

| Command | What it does |
|---------|-------------|
| `gh repo clone owner/repo` | Clone a repo |
| `gh repo fork owner/repo --clone` | Fork and clone |
| `gh repo create name --public` | Create a new repo |
| `gh repo view` | View current repo info |
| `gh repo sync` | Sync fork with upstream |

### Issues

| Command | What it does |
|---------|-------------|
| `gh issue list` | List open issues |
| `gh issue view 42` | Read issue #42 |
| `gh issue create` | Create a new issue |
| `gh issue comment 42 --body "..."` | Add a comment |
| `gh issue close 42` | Close an issue |

### Pull Requests

| Command | What it does |
|---------|-------------|
| `gh pr list` | List open PRs |
| `gh pr view 56` | Read PR #56 |
| `gh pr create` | Create a PR |
| `gh pr diff 56` | See the diff |
| `gh pr checks 56` | See CI status |
| `gh pr review 56 --approve` | Approve |
| `gh pr merge 56 --squash` | Merge (squash) |
| `gh pr checkout 56` | Check out locally |
| `gh pr update-branch` | Update from base |

### Releases

| Command | What it does |
|---------|-------------|
| `gh release create v1.0.0` | Create a release |
| `gh release list` | List releases |
| `gh release download v1.0.0` | Download assets |

### Copilot

| Command | What it does |
|---------|-------------|
| `gh copilot suggest "..."` | Get a command suggestion |
| `gh copilot explain "..."` | Explain a command |

---

*Next: [Appendix J: Codespaces](appendix-j-cloud-editors.md)*  
*Back: [Appendix H: GitHub Desktop](appendix-h-github-desktop.md)*  
*Teaching chapter: [Chapter 01: Choose Your Tools](01-choose-your-tools.md)*

## Authoritative Sources

Use these official references when you need the current source of truth for facts in this chapter.

- [GitHub Docs, home](https://docs.github.com/en)
- [GitHub Changelog](https://github.blog/changelog/)
- [GitHub CLI manual](https://cli.github.com/manual/)
- [GitHub Copilot CLI docs](https://docs.github.com/en/copilot/github-copilot-in-the-cli)

### Section-Level Source Map

Use this map to verify facts for each major section in this file.

- **Your Terminal, Supercharged for GitHub:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub CLI manual](https://cli.github.com/manual/), [GitHub Copilot CLI docs](https://docs.github.com/en/copilot/github-copilot-in-the-cli), [About Git](https://docs.github.com/en/get-started/using-git/about-git)
- **1. Installing and Authenticating:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub CLI manual](https://cli.github.com/manual/), [GitHub Copilot CLI docs](https://docs.github.com/en/copilot/github-copilot-in-the-cli), [GitHub security features](https://docs.github.com/en/code-security/getting-started/github-security-features)
- **2. Repos — Clone, Fork, Create, View:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub CLI manual](https://cli.github.com/manual/), [GitHub Copilot CLI docs](https://docs.github.com/en/copilot/github-copilot-in-the-cli), [About Git](https://docs.github.com/en/get-started/using-git/about-git)
- **3. Issues — Create, List, View, Comment, Close:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub CLI manual](https://cli.github.com/manual/), [GitHub Copilot CLI docs](https://docs.github.com/en/copilot/github-copilot-in-the-cli), [About Git](https://docs.github.com/en/get-started/using-git/about-git)
- **4. Pull Requests — Create, Review, Merge, Check:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub CLI manual](https://cli.github.com/manual/), [GitHub Copilot CLI docs](https://docs.github.com/en/copilot/github-copilot-in-the-cli), [About Git](https://docs.github.com/en/get-started/using-git/about-git)
- **5. Releases — Create, List, Upload:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub CLI manual](https://cli.github.com/manual/), [GitHub Copilot CLI docs](https://docs.github.com/en/copilot/github-copilot-in-the-cli), [About releases](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases)
- **6. Search — Issues, PRs, Repos, Code:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub CLI manual](https://cli.github.com/manual/), [GitHub Copilot CLI docs](https://docs.github.com/en/copilot/github-copilot-in-the-cli), [About Git](https://docs.github.com/en/get-started/using-git/about-git)
- **7. Labels and Milestones:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub CLI manual](https://cli.github.com/manual/), [GitHub Copilot CLI docs](https://docs.github.com/en/copilot/github-copilot-in-the-cli), [GitHub Projects docs](https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/about-projects)
- **8. Output Formatting — JSON, jq, Templates:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub CLI manual](https://cli.github.com/manual/), [GitHub Copilot CLI docs](https://docs.github.com/en/copilot/github-copilot-in-the-cli)
- **9. Aliases — Create Your Own Shortcuts:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub CLI manual](https://cli.github.com/manual/), [GitHub Copilot CLI docs](https://docs.github.com/en/copilot/github-copilot-in-the-cli)
- **10. Extensions — Adding New Commands:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub CLI manual](https://cli.github.com/manual/), [GitHub Copilot CLI docs](https://docs.github.com/en/copilot/github-copilot-in-the-cli)
- **11. Copilot in the CLI:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub CLI manual](https://cli.github.com/manual/), [GitHub Copilot CLI docs](https://docs.github.com/en/copilot/github-copilot-in-the-cli), [GitHub Copilot docs](https://docs.github.com/en/copilot)
- **12. Screen Reader Tips:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub CLI manual](https://cli.github.com/manual/), [GitHub Copilot CLI docs](https://docs.github.com/en/copilot/github-copilot-in-the-cli), [W3C Web Content Accessibility Guidelines (WCAG) 2 overview](https://www.w3.org/WAI/standards-guidelines/wcag/)
