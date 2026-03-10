# Code Review: PRs, Diffs, and Constructive Feedback

> **Related appendices:** [Appendix G: VS Code Reference](appendix-g-vscode-reference.md) | [Appendix C: Markdown Reference](appendix-c-markdown-reference.md)
> **Authoritative sources:** [GitHub Docs: Reviewing changes in pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests) | [GitHub Accessibility Guide: Pull Request Reviews](https://accessibility.github.com/documentation/guide/pull-requests/)


> **Day 2, Block 2 Material**
>
> This chapter unifies PR management, accessible code review, and the reviewer's craft into one chapter. Part 1 covers the GitHub Pull Requests extension in VS Code. Part 2 covers accessible code review with diffs and inline comments. Part 3 (to be written in Phase 3) adds the reviewer's judgment framework.

---

## Part 1: The GitHub Pull Requests Extension

> **See also:** [Appendix G: VS Code Reference](appendix-g-vscode-reference.md) for the complete list of GitHub Pull Requests extension keyboard shortcuts.

>
> **Listen to Episode 13:** [The GitHub Pull Requests Extension](../PODCASTS.md) - a conversational audio overview of this chapter. Listen before reading to preview the concepts, or after to reinforce what you learned.

## Managing Pull Requests from VS Code

> **Day 2, Block 2 Material**
>
> This guide covers the GitHub Pull Requests and Issues extension: viewing open PRs, checking out PR branches for local testing, reviewing PRs with screen reader-accessible tools, creating PRs directly from VS Code, using PR templates, and syncing PR status with GitHub.
>
> **Prerequisites:** [Working with Pull Requests](06-working-with-pull-requests.md), [Git & Source Control in VS Code](14-git-in-practice.md)
>
> **Mac keyboard shortcuts:** Throughout this chapter, all `Ctrl+` shortcuts use `Cmd+` on Mac, and `Alt+` shortcuts use `Option+` on Mac. For example: `Ctrl+Shift+P` → `Cmd+Shift+P`, `Ctrl+Shift+G` → `Cmd+Shift+G`, `Alt+F2` → `Option+F2`. Context menus (`Shift+F10` on Windows) use `Ctrl+Return` on Mac.


## Workshop Recommendation (Chapter 12)

Chapter 12 introduces the **GitHub Pull Requests extension** for managing PRs directly from VS Code.

- **Challenge count:** 2 guided challenges
- **Automation check:** none (extension installation and review state are account-local)
- **Evidence:** issue comment with confirmation of actions completed
- **Pattern:** install, check out, review, comment

### Chapter 12 Challenge Set

1. **Install the GitHub Pull Requests extension** - add the extension to VS Code and sign in with your GitHub account.
2. **Check out a PR and post a review comment** - download a PR branch locally, read the diff, and post one constructive review comment.

### Challenge 12.1 Step-by-Step: Install the Extension

**Goal:** Install the GitHub Pull Requests and Issues extension and authenticate with your GitHub account.

**Where you are working:** VS Code desktop with the [learning-room](https://github.com/Community-Access/learning-room) repository open.

**Estimated time:** 3-5 minutes.

1. Open the Extensions sidebar: `Ctrl+Shift+X` (Mac: `Cmd+Shift+X`).
2. Your screen reader announces "Extensions: Marketplace." The search box has focus.
3. Type `GitHub Pull Requests` in the search box and press `Enter`.
4. Navigate down the results list. Select **GitHub Pull Requests** (publisher: GitHub).
5. Activate the **Install** button. VS Code installs the extension and may show a notification.
6. After installation, VS Code prompts you to sign in. Activate **Sign in to GitHub**.
7. A browser window opens for GitHub OAuth. Approve the authorization and return to VS Code.
8. Verify: open the Explorer sidebar (`Ctrl+Shift+E`). You should now see a **GitHub** section in the sidebar showing Pull Requests and Issues.

**Screen reader tip:** After step 5, if the install notification disappears before you can read it, open Command Palette (`Ctrl+Shift+P`) and run `Notifications: Focus Notification Toast`.

**You are done when:** The GitHub section appears in your Explorer sidebar and shows pull requests from the [learning-room](https://github.com/Community-Access/learning-room) repository.

### Challenge 12.2 Step-by-Step: Check Out a PR and Post a Comment

**Goal:** Check out someone else's PR branch locally, read the diff in VS Code, and post one constructive review comment.

**Where you are working:** VS Code with the GitHub Pull Requests extension installed.

**Estimated time:** 10-15 minutes.

1. Open the Command Palette: `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`).
2. Type `GitHub Pull Requests: Focus on Pull Requests View` and select it. The Pull Requests panel opens.
3. Navigate the list of open PRs. Find one that is **not yours** (a classmate's PR from Chapter 6, 7, or 11).
4. With the PR focused, press `Enter` or activate **Checkout** from the context menu (`Shift+F10` on Windows). VS Code switches to that PR's branch.
5. Open the Command Palette again and run `GitHub Pull Requests: Open Changed Files`. This shows the list of files the PR changed.
6. Open one changed file. VS Code opens the **Diff Editor** showing old content on the left and new content on the right.
7. Navigate the diff with the **Accessible Diff Viewer**: press `F7` to move to the next change, `Shift+F7` for the previous change. Your screen reader announces each change (added lines, removed lines).
8. Find one specific thing to comment on: a typo, an unclear sentence, a missing step, or something the author did well.
9. To add an inline comment: position your cursor on the line you want to comment on, then open Command Palette and run `GitHub Pull Requests: Add Comment`. Type your constructive comment and activate **Add Comment**.
10. If the inline comment method is difficult, navigate to the PR on GitHub.com instead and add your comment in the **Files changed** tab.

**If checkout is blocked by permissions:** You can still complete this challenge in read-only mode. Skip step 4 and instead open the PR on GitHub.com. Use the **Files changed** tab to read the diff and post your comment there.

**Screen reader tip:** In the Diff Editor, `F7` (Accessible Diff Viewer) is the most reliable way to navigate changes. It reads each hunk as a single block, which is much easier than navigating line by line.

**You are done when:** You have posted at least one constructive review comment on someone else's PR.

### Completing Chapter 12: Submit Your Evidence

Open your **assigned Chapter 12 challenge issue** and post a completion comment:

```text
Chapter 12 completed:
- Extension installed: yes / no
- Signed in to GitHub: yes / no
- PR reviewed: #[PR number by classmate]
- Comment posted: yes (inline / on GitHub.com)
- My comment was about: [one-sentence summary]
```

Close your Chapter 12 challenge issues when done.

### Expected Outcomes

- Student can install and authenticate the GitHub PR extension.
- Student can check out a PR branch in VS Code (or view it on GitHub.com).
- Student can navigate diffs using the Accessible Diff Viewer (`F7`).
- Student can post constructive, specific feedback on a classmate's work.

### If You Get Stuck

1. Extension does not install? Reload VS Code: `Ctrl+Shift+P`, then run `Developer: Reload Window`.
2. OAuth sign-in fails? Verify your GitHub account is active in the browser first, close VS Code, reopen, and retry.
3. PR list is empty? Switch to "All Open" view in the GitHub Pull Requests panel.
4. Checkout fails? Confirm you have write access to the repository. If not, use the read-only GitHub.com fallback.
5. Diff Editor is hard to navigate? Press `F7` for the Accessible Diff Viewer mode, which is purpose-built for screen readers.
6. Cannot find the Add Comment command? Use Command Palette and search for `GitHub Pull Requests: Add Comment`.
7. Ask facilitator to help verify the GitHub PR panel and model one review comment.

> **Continue learning:** The GitHub Skills course [Review Pull Requests](https://github.com/skills/review-pull-requests) practices approving, requesting changes, and using suggestions in an interactive format. See [Appendix Z](appendix-z-github-skills.md) for the full catalog.

### Learning Moment

PR tooling multiplies your impact. Reviewing others' work refines your own standards and builds community trust. The comment you just wrote helps another student learn - and you learn by articulating what makes documentation clear.

### Learning Pattern Used in This Chapter

1. Install and configure the tool before starting the task.
2. Practice on someone else's work first (reviewing is safer than authoring).
3. Use accessibility tools (`F7` Accessible Diff Viewer) to navigate efficiently.
4. Write specific, constructive feedback (not just "looks good").


## Table of Contents

1. [Installing the GitHub Pull Requests Extension](#1-installing-the-github-pull-requests-extension)
2. [Viewing Pull Requests](#2-viewing-pull-requests)
3. [Checking Out a Pull Request Branch](#3-checking-out-a-pull-request-branch)
4. [Reviewing Pull Requests in VS Code](#4-reviewing-pull-requests-in-vs-code)
5. [Creating a Pull Request from VS Code](#5-creating-a-pull-request-from-vs-code)
6. [Pull Request Description Templates](#6-pull-request-description-templates)
7. [Commenting and Requesting Changes](#7-commenting-and-requesting-changes)
8. [Merging Pull Requests](#8-merging-pull-requests)


## 1. Installing the GitHub Pull Requests Extension

The GitHub Pull Requests and Issues extension integrates GitHub's PR workflow directly into VS Code - no browser tab switching required.

### Installation Steps

#### Method 1: Extensions Sidebar

1. Open Extensions sidebar: `Ctrl+Shift+X` (Mac: `Cmd+Shift+X`)
2. Type "GitHub Pull Requests" in the search box
3. Find "GitHub Pull Requests and Issues" (publisher: GitHub)
4. Navigate to the extension in the results list
5. Press `Enter` to open the extension detail page
6. `Tab` to "Install" button → press `Enter`

#### Method 2: Command Palette

1. `Ctrl+Shift+P`
2. Type "install extensions"
3. Select "Extensions: Install Extensions"
4. Search for "GitHub Pull Requests"
5. Install "GitHub Pull Requests and Issues"

**Screen reader note:** The Extensions sidebar is a tree view. Use `Up/Down Arrow` to navigate, `Enter` to open an extension's detail page.

### Signing In to GitHub

After installation, VS Code prompts you to sign in:

1. A notification appears: "Sign in to GitHub to use Pull Requests"
2. Navigate to the notification (`Alt+N` / Mac: `Option+N`, or status bar navigation)
3. Select "Sign in"
4. VS Code opens your browser for GitHub OAuth authentication
5. Authorize VS Code in the browser
6. Return to VS Code - you're now signed in

#### Verify sign-in

- Open Command Palette: `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`)
- Type "GitHub Pull Requests: Sign in"
- If already signed in, the option shows "Sign out" instead

### What the Extension Adds

After installation, you gain:

- **GitHub view in the Activity Bar** (sidebar icon that looks like the GitHub logo)
- **Pull Requests and Issues tree** in the Explorer
- **PR creation commands** in the Command Palette
- **Inline PR review features** in the editor
- **Issue linking** when writing commit messages

### Learning Cards: Installing the PR Extension

<details>
<summary>Screen reader users</summary>

- Open Extensions with `Ctrl+Shift+X`, type "GitHub Pull Requests" -- your screen reader announces each result; press `Enter` on the correct one then `Tab` to "Install"
- After installation, verify sign-in via Command Palette (`Ctrl+Shift+P`): type "GitHub Pull Requests: Sign in" -- if already signed in, it shows "Sign out" instead
- The GitHub view appears as a new icon in the Activity Bar; press `F6` to cycle between panels until you hear "GitHub"

</details>

<details>
<summary>Low vision users</summary>

- A new GitHub logo icon appears in the Activity Bar (left sidebar) after installation -- it is the Octocat silhouette
- After signing in, the notification bar at the bottom confirms authentication with your username
- Increase sidebar width by dragging its edge so PR titles are not truncated at high zoom levels

</details>

<details>
<summary>Sighted users</summary>

- Look for the GitHub Octocat icon in the Activity Bar after installation -- click it to open the Pull Requests and Issues panel
- A blue notification badge appears on the icon when there are new PRs to review
- The Explorer sidebar also gains a "GitHub Pull Requests" section that you can expand or collapse

</details>


## 2. Viewing Pull Requests

### Opening the GitHub Pull Requests Panel

#### Method 1: Activity Bar

<details>
<summary>Visual / mouse users</summary>

Click the **GitHub logo icon** in the Activity Bar (the vertical strip of icons on the far left). It's usually the 5th or 6th icon. The GitHub Pull Requests panel opens.

</details>

<details>
<summary>Screen reader users (NVDA / JAWS / VoiceOver)</summary>

1. The Activity Bar is not always reachable by `Tab` from the editor
2. Use `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`) → type "GitHub Pull Requests: View Pull Request" or "Focus on Pull Requests View" → press `Enter`
3. Alternatively press `Ctrl+Shift+G` (Mac: `Cmd+Shift+G`) to open Source Control, then `Tab` until you reach the Activity Bar icon strip

The GitHub view opens, showing:

- "Pull Requests"
- "Issues"

</details>

<details>
<summary>Web alternative (github.com)</summary>

View pull requests directly on GitHub without VS Code:

1. Navigate to the repository on GitHub.com
2. Click the **Pull requests** tab
3. Click any PR title to view its conversation, commits, and changed files
4. Use the **Files changed** tab to review diffs

See [Working with Pull Requests](06-working-with-pull-requests.md) for the full web-based PR workflow.

</details>

<details>
<summary>GitHub CLI (gh) alternative</summary>

View PRs from your terminal:

```bash
# List open PRs
gh pr list

# View a specific PR
gh pr view 42

# Open a PR in your browser
gh pr view 42 --web

# Filter PRs waiting for your review
gh pr list --search "review-requested:@me"
```

</details>

## Method 2: Explorer Section

1. Open Explorer: `Ctrl+Shift+E` (Mac: `Cmd+Shift+E`)
2. Navigate with `Arrow` keys to find the "GitHub Pull Requests" section
3. Expand it with `Right Arrow`

### Pull Request Tree Structure

#### Description

The GitHub Pull Requests panel has two top-level sections. "My Pull Requests" contains four filters: Assigned to Me, Created by Me, Waiting for my Review, and All Open. The repository section shows Local Pull Request Branches (checked out locally), All Open Pull Requests, and All Closed Pull Requests.

#### Screen reader announcement example

"Pull Request #42: Add Timeline Guide, opened by jeffb, 2 days ago, 3 files changed"

### Filtering PR Lists

#### By status

- "All Open" - every open PR
- "Assigned to Me" - PRs where you're an assignee
- "Waiting for my Review" - PRs where you're requested as reviewer
- "Draft" - PRs marked as work-in-progress

#### By repository

The tree organizes PRs by repository. Expand a repo to see its PRs.

### Viewing PR Details

1. Navigate to a PR in the tree
2. Press `Enter`

A PR detail view opens in the editor area showing:

- PR title and number
- Author and creation date
- Status (Open, Merged, Closed)
- Description (full Markdown with inline rendering)
- Reviewers and their status (Approved, Requested Changes, Pending)
- Checks (CI status: passing, failing, pending)
- Files changed (clickable list)
- Comments timeline

#### Screen reader experience

- The detail view is Markdown-rendered HTML
- Use standard screen reader reading commands (`Arrow` keys in NVDA/JAWS virtual mode)
- Headings mark each section ("Description", "Reviewers", "Files Changed", "Comments")
- Links are clickable with `Enter`


## 3. Checking Out a Pull Request Branch

**Checking out a PR** means downloading its branch to your local machine so you can test it, review it interactively, or add commits to it.

### Why Check Out a PR

- **Test functionality:** Run the code locally to verify it works
- **Review with full context:** See the changes in your editor with full file access
- **Make suggestions:** Add commits to someone else's PR (if you have write access)
- **Verify accessibility:** Test with your screen reader to ensure changes don't break navigation

### How to Check Out a PR

#### Method 1: From the PR Detail View

1. Open a PR (see Section 2)
2. In the PR detail view, navigate to "Checkout" button
3. Press `Enter`

VS Code:

- Downloads the branch
- Switches your local repository to that branch
- Opens the changed files in the editor

#### Method 2: From the PR Tree

1. Navigate to the PR in the GitHub Pull Requests tree
2. Press `Shift+F10` (Mac: `Ctrl+Return`) to open context menu
3. Select "Checkout Pull Request"

#### Method 3: Command Palette

1. `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`)
2. Type "GitHub Pull Requests: Checkout"
3. Select "GitHub Pull Requests: Checkout Pull Request"
4. Choose the PR from the list

**Screen reader note:** After checkout, the bottom-left status bar shows the branch name (example: "jeffb/add-timeline-guide"). Your local files now match that branch.

### Returning to Your Original Branch

After reviewing:

1. `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`)
2. Type "git checkout"
3. Select "Git: Checkout to..."
4. Choose your original branch (usually `main` or your feature branch)

### Learning Cards: Checking Out a PR

<details>
<summary>Screen reader users</summary>

- After checkout, press `F6` to navigate to the Status Bar and hear the branch name (e.g., "jeffb/fix-alt-text") confirming you are on the PR branch
- Use `Ctrl+Shift+P` then "Git: Checkout to" to switch back to your original branch when done reviewing
- The PR detail view is Markdown-rendered HTML -- navigate with `h` (heading), `t` (table), and arrow keys in your screen reader's virtual mode

</details>

<details>
<summary>Low vision users</summary>

- The Status Bar in the bottom-left changes to show the PR branch name, confirming the checkout succeeded
- Files changed by the PR are highlighted in the Explorer sidebar with colored badges (M for modified, A for added)
- Use `Ctrl+=` to zoom the editor if diff annotations are hard to read

</details>

<details>
<summary>Sighted users</summary>

- After checkout, the branch name in the bottom-left Status Bar changes to the PR branch name
- Changed files appear in the Source Control panel with status badges so you can quickly see what was modified
- Right-click a file in the PR file list to open a side-by-side diff view

</details>


## 4. Reviewing Pull Requests in VS Code

Once you've checked out a PR (or opened it in the detail view), you can review its changes fully within VS Code.

### Reading the Files Changed List

#### In the PR detail view

1. Scroll down to "Files Changed" section
2. Each file is a link
3. Navigate with `Arrow` keys
4. Press `Enter` on a file to open its diff view

#### Screen reader announcement

"docs/11-vscode-interface.md, 42 additions, 3 deletions"

### Understanding the Diff View

When you open a file from "Files Changed":

#### Split view mode (default)

- Left side: original file (before changes)
- Right side: modified file (after changes)
- Changed lines highlighted (added = green, removed = red)

#### Inline view mode

- Single editor
- Removed lines shown with `-` prefix
- Added lines shown with `+` prefix

#### To toggle between views

- Command Palette: `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`) → "Diff: Toggle Inline View"

### Screen Reader Diff Review with Accessible Diff Viewer

#### Recommended workflow for screen reader users

1. Open a changed file from the PR detail view
2. Press `F7` to jump to the first diff hunk
3. Press `Alt+F2` (Mac: `Option+F2`) to open Accessible View
4. Read the hunk content:
   - Unchanged lines (for context)
   - Removed lines (prefixed with `-`)
   - Added lines (prefixed with `+`)
5. Press `Escape` to close Accessible View
6. Press `F7` to jump to the next hunk
7. Repeat until all hunks reviewed

#### Example Accessible Diff output

```text
Hunk 1 of 3 - lines 12 to 18
  Unchanged: ## VS Code Setup
- Removed: This guide covers VS Code basics.
+ Added: This guide covers VS Code basics and accessibility features.
  Unchanged:
  Unchanged: **Prerequisites:** Day 1 completion
```

#### This structured reading is far superior to navigating the visual diff manually
>
> **VS Code October 2025 update:** Deleted lines (shown with the `-` prefix) are now fully selectable and copyable in the diff editor. Previously, deleted code could only be read, not selected. This is useful when you want to copy a deleted function signature, old variable name, or removed text for reference while writing your review comment.

### Flagging Issues During Review

As you review, note any problems:

1. Navigate to the specific line in the diff
2. Press `Shift+F10` (Mac: `Ctrl+Return`) for context menu
3. Select "Add Comment"
4. Type your comment in the input that appears
5. Choose "Single Comment" or "Start Review"

**Single Comment** posts immediately.  
**Start Review** saves your comments as a draft until you submit the full review (see Section 7).

### Learning Cards: Reviewing Pull Requests in VS Code

**Screen reader users:**
- Press `F7` to enter the Accessible Diff Viewer and hear each hunk announced as "Change N of M" with clear "Removed:" and "Added:" labels -- this is far more reliable than navigating the raw split diff line by line
- After reviewing a hunk, press `Escape` to return to the diff editor, then `Shift+F10` on the target line and select "Add Comment" to place inline feedback exactly where the issue is
- Use `Alt+F2` (Accessible View) on any hunk for a plain-text rendering you can read with arrow keys at your own pace

**Low-vision users:**
- Switch from split diff to inline diff (`Ctrl+Shift+P` then "Toggle Inline View") to keep all changes in a single column -- much easier at high zoom than scanning two narrow panes
- Press `F7` / `Shift+F7` to jump between hunks; each hunk gains a visible focus outline that tracks your position so you do not lose your place at high magnification
- Added lines show a green gutter bar and removed lines a red gutter bar; in High Contrast themes these become bold solid borders visible at any zoom level

**Sighted users:**
- Scan the left gutter for green (added) and red (removed) bars to spot changes quickly, then click the `+` icon on any line to start an inline comment
- Use the minimap on the right edge of the diff editor to see the distribution of changes across the file and click directly on coloured blocks to jump there
- Right-click a file in the PR file list and choose "Open Changes" for a side-by-side diff, or "Open File" to see the final state without diff annotations


## 5. Creating a Pull Request from VS Code

### Tool Cards: Create a Pull Request (from your editor)

**VS Code Desktop (primary for Day 2):**
1. `Ctrl+Shift+P` > **GitHub Pull Requests: Create Pull Request**.
2. Fill in the title, description, and base branch.
3. Click **Create**.

**github.com (browser):**
1. Push your branch, then click the **Compare & pull request** banner on the repo page.
2. Fill in the form and click **Create pull request**.

**GitHub Desktop:**
1. After pushing, click **Create Pull Request** -- this opens gitub.com with the form pre-filled.

**Git CLI / GitHub CLI:**
```bash
git push -u origin your-branch
gh pr create --title "Title" --body "Description"
```

After you've pushed commits to a feature branch, you can create a PR without leaving VS Code.

### Prerequisites

1. You've created a branch (see [Git & Source Control: Branch Management](14-git-in-practice.md#3-branch-management))
2. You've made commits
3. You've pushed the branch to GitHub (`Ctrl+Shift+P` / Mac: `Cmd+Shift+P` → "Git: Push")

### Creating the PR

#### Method 1: Command Palette (Recommended)

1. `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`)
2. Type "GitHub Pull Requests: Create"
3. Select "GitHub Pull Requests: Create Pull Request"
4. A form opens in the editor

#### Method 2: Source Control Panel

1. Open Source Control: `Ctrl+Shift+G` (Mac: `Cmd+Shift+G`)
2. After pushing, a "Create Pull Request" button appears
3. Press `Enter` on that button

#### Method 3: GitHub Panel

1. Open GitHub view (Activity Bar → GitHub icon)
2. Right-click your branch in the tree
3. Select "Create Pull Request"

### Filling Out the PR Form

The form has these fields:

#### Title (required)

- Auto-filled with your most recent commit message
- Edit to make it descriptive (example: "Add Timeline View documentation")

#### Description (optional but recommended)

- Explain what changed and why
- Reference the issue you're fixing: "Fixes #42"
- If a PR template exists, VS Code loads it here (see Section 6)
- **Copilot-assisted description:** An AI sparkle icon in the description toolbar lets you generate a description from your commits. When a PR template exists, Copilot fills in the template sections intelligently rather than replacing the template - it populates the checklist items and description sections with content derived from your changes.

#### Base branch (target)

- Usually `main` or `develop`
- This is the branch your changes will merge into

#### Compare branch (source)

- Your feature branch (auto-selected)
- This is the branch with your changes

#### Reviewers (optional)

- Select people to review your PR
- Navigate the list with `Arrow` keys

#### Labels (optional)

- Add labels like `documentation`, `accessibility`, `good-first-issue`

#### Milestone (optional)

- Link the PR to a project milestone

#### Draft PR checkbox

- Check this if the PR is not ready for review yet
- Unchecked = "Ready for review"

#### Screen reader navigation

- All fields are standard form inputs
- `Tab` to move between fields
- Use `Arrow` keys in dropdowns (reviewers, labels, milestones)

### Submitting the PR

1. Review all fields
2. `Tab` to "Create" button
3. Press `Enter`

VS Code creates the PR on GitHub and shows a success message. The PR link appears in the notification - click it to open the PR on GitHub, or open it in the GitHub Pull Requests panel.

<details>
<summary>Web alternative (github.com) - creating a PR</summary>

Create a PR from your browser after pushing your branch:

1. Navigate to the repository on GitHub
2. If you recently pushed, a yellow banner "Compare & pull request" appears - click it
3. Otherwise: click **Pull requests** tab, then **New pull request**, then select your branch
4. Fill in the title and description
5. Click **Create pull request**

See [Working with Pull Requests - Opening a PR](06-working-with-pull-requests.md#opening-a-pull-request) for detailed screen reader steps.

</details>

<details>
<summary>GitHub CLI (gh) alternative - creating a PR</summary>

```bash
# Interactive: prompts for title, body, base branch
gh pr create

# Inline: provide details directly
gh pr create --title "Add Timeline View documentation" --body "Fixes #42"

# Create as draft
gh pr create --draft

# Open the form in your browser
gh pr create --web
```

</details>

### Learning Cards: Creating a Pull Request

<details>
<summary>Screen reader users</summary>

- Press `Ctrl+Shift+P` then type "GitHub Pull Requests: Create" -- the PR creation form opens with title, description, base branch, and reviewer fields navigable with `Tab`
- The description field supports full Markdown -- use `Ctrl+F` to find and replace `<!-- comment -->` placeholders in templates
- After creating, your screen reader announces the new PR number; the PR detail view opens automatically

</details>

<details>
<summary>Low vision users</summary>

- The PR creation form appears as a new editor tab with clearly labeled input fields for title, description, base branch, and reviewers
- Use `Ctrl+=` to zoom the form if the input fields are small; the form reflows to accommodate larger text
- The base branch dropdown is near the top of the form -- verify it shows `main` (or your target branch) before submitting

</details>

<details>
<summary>Sighted users</summary>

- Click the "Create Pull Request" button in the Source Control panel header (appears when you have unpushed changes on a feature branch)
- The PR form shows a preview pane for your Markdown description so you can verify formatting before submitting
- Use the reviewer picker to search for and add specific GitHub users to request reviews

</details>


## 6. Pull Request Description Templates

Many repositories include a **PR template** - a Markdown file that pre-fills the PR description with a checklist or structure.

### Where Templates Are Stored

Common locations:

- `.github/pull_request_template.md` (root)
- `.github/PULL_REQUEST_TEMPLATE.md`
- `.github/PULL_REQUEST_TEMPLATE/` (folder with multiple templates)
- `docs/pull_request_template.md`

When you create a PR in VS Code, the extension automatically loads the template into the description field.

### Example PR Template

```markdown
## Description
<!-- Briefly describe what this PR changes and why -->

## Related Issue
<!-- Link to the issue this PR fixes: Fixes #123 -->

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Accessibility improvement

## Testing
<!-- How did you test these changes? -->

## Checklist
- [ ] My code follows the project's style guidelines
- [ ] I have tested with a screen reader (NVDA, JAWS, or VoiceOver)
- [ ] I have updated the documentation
- [ ] All new and existing tests pass
- [ ] I have linked this PR to the related issue

## Screenshots (if applicable)
<!-- Add screenshots or screen recordings -->
```

### Filling Out a Template

#### Screen reader workflow

1. Create PR (Method 1-3 from Section 5)
2. The description field is pre-filled with the template
3. Navigate through the template with `Arrow` keys
4. Replace each `<!-- comment -->` with your content
5. Check checkboxes by typing `x` between the brackets: `- [x]`

**Keyboard tip:** Use `Ctrl+F` (Mac: `Cmd+F`) to jump to each `<!--` placeholder, fill it in, then `F3` to jump to the next one.


## 7. Commenting and Requesting Changes

When reviewing a PR, you can:

- Leave inline comments on specific lines
- Request changes before the PR can be merged
- Approve the PR
- Submit general feedback

### Adding an Inline Comment

1. Open a file from the PR's "Files Changed" list
2. Navigate to the line you want to comment on
3. Press `Shift+F10` (Mac: `Ctrl+Return`) to open context menu
4. Select "Add Comment"
5. Type your comment
6. Choose "Add Single Comment" (posts immediately) or "Start Review" (saves as a draft)

#### Comment format tips

- Be specific: "This heading should be H3, not H2"
- Provide context: "Screen readers announce this as 'list with 1 item' - should be a paragraph instead"
- Suggest a fix: "Consider rewording to: 'Click the button to save'"

### Starting a Review

#### If you have multiple comments to make, use "Start Review"

1. Add your first inline comment → select "Start Review"
2. Continue adding comments to other lines
3. All comments are saved as drafts (not visible to others yet)

### Submitting Your Review

When you've reviewed all files:

1. `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`)
2. Type "GitHub Pull Requests: Submit Review"
3. Select "GitHub Pull Requests: Finish Review"
4. Choose review type:
   - **Comment** - general feedback, no approval decision
   - **Approve** - PR looks good, ready to merge
   - **Request Changes** - issues must be fixed before merging
5. Optionally add a summary comment
6. Press `Enter` to submit

**Screen reader note:** The review type selector is a radio button group. Use `Arrow` keys to choose, `Enter` to confirm.

### What Happens After Submission

- All your draft comments post to GitHub
- The PR author receives a notification
- Your review status appears on the PR (Approved / Changes Requested / Commented)
- If you requested changes, the PR cannot merge until you approve it

<details>
<summary>Web alternative (github.com) - reviewing</summary>

Review PRs directly on GitHub.com:

1. Open the PR and click the **Files changed** tab
2. Read through each file's diff
3. Click the blue **+** button on any line to add an inline comment
4. Choose **Start a review** to batch comments
5. Click **Review changes** (top right) to select Comment / Approve / Request changes
6. Click **Submit review**

See [Accessible Code Review](15-code-review.md) for detailed screen reader steps.

</details>

<details>
<summary>GitHub CLI (gh) alternative - reviewing</summary>

```bash
# View the PR diff in your terminal
gh pr diff 42

# Approve
gh pr review 42 --approve --body "Looks good."

# Request changes
gh pr review 42 --request-changes --body "Heading hierarchy needs fixing."

# Comment-only (no verdict)
gh pr review 42 --comment --body "A few suggestions."
```

**Note:** For inline comments on specific lines, use the web interface or VS Code.

</details>

### Learning Cards: Commenting and Requesting Changes

<details>
<summary>Screen reader users</summary>

- In a diff view, navigate to a line and press `Shift+F10` for the context menu, then select "Add Comment" to leave inline feedback
- Choose "Start Review" instead of "Single Comment" to batch multiple comments before submitting them all at once
- When submitting a review, use `Ctrl+Shift+P` then "GitHub Pull Requests: Submit Review" and choose Approve, Request Changes, or Comment

</details>

<details>
<summary>Low vision users</summary>

- Inline comments appear as expandable banners within the diff view -- look for the text input box that opens below the target line
- The review submission dialog has radio buttons for Approve, Request Changes, and Comment with clear labels
- Increase diff view font size with `Ctrl+=` so line numbers and change annotations are easier to read

</details>

<details>
<summary>Sighted users</summary>

- Hover over the line gutter in a diff view to see a blue `+` icon -- click it to start an inline comment on that line
- A yellow banner appears for pending review comments; green for approved comments
- The "Submit Review" button in the PR detail view shows the count of pending comments ready to send

</details>


## 8. Merging Pull Requests

**Who can merge:** Repository maintainers, or contributors with write access.

### Prerequisites for Merging

Before merging, verify:

1. All required reviews are approved
2. All CI checks pass (green checkmarks)
3. No merge conflicts exist
4. Branch is up to date with base branch (main)

**Changing the base branch:** If the PR was opened against the wrong base branch, you can change it from the PR detail view in VS Code. Scroll to the base branch field in the PR detail view and activate the dropdown to select a different target branch. This saves opening the PR on GitHub.com.

**Converting to/from draft:** You can also convert a ready PR back to a draft (or mark a draft as ready for review) directly from the PR detail view. Scroll to the Status section and use the context menu on the PR title or the "..." more actions button.

### Merging from VS Code

#### Method 1: PR Detail View

1. Open the PR in VS Code
2. Scroll to the bottom of the PR detail view
3. Find "Merge Pull Request" button
4. Press `Enter`
5. Choose merge type (see below)
6. Confirm

#### Method 2: Command Palette

1. `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`)
2. Type "GitHub Pull Requests: Merge"
3. Select "GitHub Pull Requests: Merge Pull Request"
4. Choose the PR from the list
5. Select merge type
6. Confirm

### Merge Types

| Type | What It Does | When to Use |
| ------  | -------------  | ------------  |
| **Merge Commit** | Creates a merge commit preserving all branch commits | Default for most projects; preserves full history |
| **Squash and Merge** | Combines all commits into one before merging | Cleans up messy commit history; common for feature branches |
| **Rebase and Merge** | Replays commits onto base branch without a merge commit | Creates linear history; requires clean commit messages |

**Screen reader note:** The merge type selector is a dropdown or radio group. Navigate with `Arrow` keys, confirm with `Enter`.

#### Which merge type to use

- Check the repository's CONTRIBUTING.md for guidance
- If unsure, use **Merge Commit** (the default and safest option)

### After Merging

1. The PR closes automatically
2. The feature branch can be deleted (VS Code prompts: "Delete branch?")
3. Recommended: switch back to `main` and pull the merged changes

#### Switching to main and pulling

```text
Ctrl+Shift+P → "Git: Checkout to..." → select "main"
Ctrl+Shift+P → "Git: Pull"
```

*(Mac users: use `Cmd+Shift+P` instead of `Ctrl+Shift+P`)*

### Deleting the Feature Branch

After merging, the feature branch is no longer needed:

1. `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`)
2. Type "git delete branch"
3. Select "Git: Delete Branch..."
4. Choose the merged branch

This deletes the branch locally. To delete it on GitHub too:

<details>
<summary>Web alternative (github.com) - merging</summary>

Merge a PR directly on GitHub.com:

1. Open the PR's **Conversation** tab
2. Scroll to the merge button at the bottom
3. Click the dropdown arrow to choose a merge strategy (Squash, Rebase, or Merge commit)
4. Click **Merge pull request**, then **Confirm merge**
5. Click **Delete branch** to clean up

</details>

<details>
<summary>GitHub CLI (gh) alternative - merging</summary>

```bash
# Merge with default strategy
gh pr merge 42

# Squash and merge, then delete the branch
gh pr merge 42 --squash --delete-branch

# Enable auto-merge (merges when checks pass)
gh pr merge 42 --auto --squash
```

</details>

1. `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`)
2. Type "git push"
3. Select "Git: Push (delete remote branch)"

### Learning Cards: Merging Pull Requests

**Screen reader users:**
- The merge type selector (Merge Commit, Squash, Rebase) is announced as a dropdown or radio group -- use `Arrow` keys to move between options and `Enter` to confirm; if unsure, choose Merge Commit (the default and safest option)
- After merging, VS Code prompts "Delete branch?" as a notification -- press `Alt+N` to focus the notification and `Enter` to confirm, then run `Ctrl+Shift+P` then "Git: Checkout to" and select `main` to return to your default branch
- Confirm the merge succeeded by pressing `F6` to reach the Status Bar and verifying it now reads `main` instead of the feature branch name

**Low-vision users:**
- The merge button at the bottom of the PR detail view includes a dropdown arrow for selecting merge type -- at high zoom, widen the editor pane so the button label and dropdown are not truncated
- After merging, the PR detail view header changes from "Open" (green badge) to "Merged" (purple badge) -- verify this colour/label change before deleting the branch
- When switching back to `main`, the branch name in the bottom-left Status Bar updates immediately -- confirm it reads `main` before pulling new changes with `Ctrl+Shift+P` then "Git: Pull"

**Sighted users:**
- Click the dropdown arrow next to the green "Merge" button to choose between Merge Commit, Squash and Merge, or Rebase and Merge -- the dropdown shows a brief description of each strategy
- After merging, a "Delete branch" prompt appears as a blue link in the PR detail view; click it to clean up locally, then check the PR on GitHub.com where a similar button deletes the remote branch
- Pull merged changes immediately: click the sync icon in the Status Bar (circular arrows) or run `Ctrl+Shift+P` then "Git: Pull" to bring your local `main` up to date


## Keyboard Shortcuts - GitHub Pull Requests Extension

| Action | Windows | Mac |
| --------  | ---------  | -----  |
| Open GitHub view | Activity Bar → GitHub icon → `Enter` | Activity Bar → GitHub icon → `Enter` |
| Create Pull Request | `Ctrl+Shift+P` → "GitHub Pull Requests: Create" | `Cmd+Shift+P` → "GitHub Pull Requests: Create" |
| Checkout PR | `Ctrl+Shift+P` → "GitHub Pull Requests: Checkout" | `Cmd+Shift+P` → "GitHub Pull Requests: Checkout" |
| Submit Review | `Ctrl+Shift+P` → "GitHub Pull Requests: Finish Review" | `Cmd+Shift+P` → "GitHub Pull Requests: Finish Review" |
| Merge PR | `Ctrl+Shift+P` → "GitHub Pull Requests: Merge" | `Cmd+Shift+P` → "GitHub Pull Requests: Merge" |
| Add inline comment | `Shift+F10` (in diff view) → "Add Comment" | `Ctrl+Return` (in diff view) → "Add Comment" |
| Navigate diff hunks | `F7` (next), `Shift+F7` (previous) | `F7` (next), `Shift+F7` (previous) |
| Accessible Diff Viewer | `Alt+F2` (in diff view) | `Option+F2` (in diff view) |


## Troubleshooting

### "No pull requests found"

**Issue:** The GitHub Pull Requests panel is empty.

#### Solutions

1. Verify you're signed in: `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`) → "GitHub Pull Requests: Sign in"
2. Check you have a folder open containing a Git repository
3. Refresh the panel: `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`) → "GitHub Pull Requests: Refresh Pull Requests List"

### "Could not create pull request"

**Issue:** PR creation fails.

#### Solutions

1. Verify you've pushed your branch: `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`) → "Git: Push"
2. Check you have write access to the repository
3. Ensure your branch is ahead of the base branch (has new commits)

### "Authentication failed"

**Issue:** VS Code can't connect to GitHub.

#### Solutions

1. Sign out and sign back in: `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`) → "GitHub Pull Requests: Sign out" → then sign in again
2. Check your GitHub Personal Access Token (see [Appendix D: Git Authentication](appendix-d-git-authentication.md))
3. Verify network connection


## Try It: Review a PR from VS Code

**Time:** 3 minutes | **What you need:** VS Code with GitHub Pull Requests extension installed and signed in

1. **Open the PR view** - Press `Ctrl+Shift+P` → type `Pull Requests: Focus on GitHub Pull Requests View` → `Enter`.
2. **Find a PR** - Navigate the tree with arrow keys. Expand a PR to see its changed files.
3. **Open a diff** - Press `Enter` on a changed file. The diff editor opens.
4. **Use the Accessible Diff Viewer** - Press `F7` to jump to the first change. Your screen reader announces what was added or removed. Press `F7` again to move to the next change.
5. **Leave a comment** - Position your cursor on a line you want to comment on, then press `Ctrl+Shift+P` → `Pull Request: Add Comment on Current Diff Line`. Type a brief, constructive comment and submit.

**You're done.** You just reviewed a pull request entirely from VS Code.

> **What success feels like:** You read a diff, heard the changes announced by your screen reader, and left feedback - all without opening a browser. This is how many developers review code every day.


*Next: [GitHub Copilot](16-github-copilot.md)*  
*Back: [Git & Source Control in VS Code](14-git-in-practice.md)*  
*Related: [Working with Pull Requests](06-working-with-pull-requests.md) | [Issue Templates](17-issue-templates.md)*

---

## Part 2: Accessible Code Review
>
> **Listen to Episode 15:** [Accessible Code Review](../PODCASTS.md) - a conversational audio overview of this chapter. Listen before reading to preview the concepts, or after to reinforce what you learned.

## Conducting Pull Request Reviews with a Screen Reader

> This guide is focused entirely on the **reviewer experience** - navigating diffs, reading changes, leaving comments, and submitting a review - using only your keyboard and screen reader. For the full pull request lifecycle (opening PRs, merge options, conflict resolution), see [Working with Pull Requests](06-working-with-pull-requests.md).
>
> **Learning Room connection:** The exercises in this chapter use files from the Learning Room repository. You will review PRs that modify `docs/keyboard-shortcuts.md` (shortcut tables with intentional errors), `docs/setup-guide.md` (broken links and incomplete steps), and `docs/welcome.md` (`[TODO]` sections to complete). These are the same files you work on during the Day 1 contribution sprint.


## Workshop Recommendation (Chapter 14)

Chapter 14 is the **code review chapter** focused on practicing constructive feedback.

- **Challenge count:** 2 guided challenges
- **Automation check:** none (review quality is subjective and human-focused)
- **Evidence:** issue comment with summary of review and feedback posted
- **Pattern:** navigate diff, comment on specifics, submit verdict

### Chapter 14 Challenge Set

1. **Review a practice PR and leave 2-3 inline comments** - read the diff line by line, find specific items to comment on, and post constructive feedback.
2. **Submit a formal review verdict** - complete your review by choosing approve, request changes, or comment only.

### Challenge 14.1 Step-by-Step: Review a PR and Leave Inline Comments

**Goal:** Navigate a PR diff using screen reader-friendly tools and post 2-3 specific, constructive inline comments.

**Where you are working:** GitHub.com (Files changed tab of a PR) or VS Code with the GitHub Pull Requests extension.

**Estimated time:** 15-20 minutes.

1. Open the [learning-room](https://github.com/Community-Access/learning-room) repository on GitHub.com and navigate to the **Pull requests** tab.
2. Find a classmate's open PR (from Chapter 6, 7, or 11). Open it.
3. Activate the **Files changed** tab. This shows the diff - lines added in green, lines removed in red.
4. Navigate the diff:
   - **On GitHub.com:** Use heading navigation to jump between files (`H` in NVDA). Each file header is a heading. Within a file, use arrow keys to move line by line.
   - **In VS Code:** Press `F7` to open the Accessible Diff Viewer (see Chapter 12). Use `F7`/`Shift+F7` to move between changes.
5. Read through the changes carefully. Look for:
   - Typos or grammar issues
   - Unclear headings or link text
   - Missing steps in instructions
   - Accessibility concerns (missing alt text, unclear structure)
   - Things the author did well (note these too)
6. To leave an inline comment on GitHub.com: activate the `+` button that appears to the left of a line number when you hover or Tab to it. (Screen reader users: this button may be announced as "Add a comment to this line.") Type your comment in the text box that opens.
7. Post 2-3 inline comments. Each comment should be:
   - **Specific:** reference the exact line or phrase
   - **Constructive:** suggest an improvement or explain why something works well
   - **Kind:** frame suggestions as questions or "consider" statements
8. Examples of good inline comments:
   - "Line 12: 'Click here' should be more descriptive. Consider: 'Open the notification settings page'"
   - "Nice clear heading structure - the reader can scan this section quickly."
   - "Step 3 says 'do the thing' - could you add which menu or keyboard shortcut to use?"

**Screen reader tip:** On GitHub.com, the Files Changed tab uses a table-like layout. Each row is a line of the diff. The `+` button for commenting may not be visible until you Tab through the row controls. If you cannot find it, use the "Review changes" button at the top to add a general comment instead.

**You are done when:** You have posted 2-3 inline comments on a classmate's PR.

### Challenge 14.2 Step-by-Step: Submit a Formal Review Verdict

**Goal:** Complete your review by selecting a verdict that tells the author what action to take next.

**Where you are working:** GitHub.com (the same PR you reviewed in 14.1).

1. After posting your inline comments, scroll to the top of the **Files changed** tab.
2. Activate the **Review changes** button (at the top-right of the files changed area, or use heading navigation).
3. A dropdown opens with three options:
   - **Comment** - general feedback, no explicit approval or rejection
   - **Approve** - you think the PR is ready to merge
   - **Request changes** - you found something that should be fixed before merging
4. Choose the verdict that matches your review:
   - If the PR has clear documentation with only minor suggestions, choose **Approve**.
   - If you found issues that would confuse readers, choose **Request changes** and explain what needs fixing in the summary.
   - If you are unsure, choose **Comment** - this is always a safe option.
5. Write a brief summary in the review body (1-2 sentences). Example: "Clear improvement to the shortcut table. Two minor suggestions for link text clarity."
6. Activate **Submit review**.

**You are done when:** Your review verdict appears on the PR's conversation tab as a green (approved), red (changes requested), or gray (comment) review badge.

### Completing Chapter 14: Submit Your Evidence

Open your **assigned Chapter 14 challenge issue** and post a completion comment:

```text
Chapter 14 completed:
- PR reviewed: #[PR number]
- Inline comments posted: [number, e.g., 3]
- Review verdict: [Approve / Request Changes / Comment]
- One thing I learned from reviewing: [one sentence]
```

Close your Chapter 14 challenge issues when done.

### Expected Outcomes

- Student can navigate PR diffs with a screen reader.
- Student can post inline comments on specific lines of a diff.
- Student can write constructive, specific feedback that helps the author improve.
- Student can submit a formal review verdict.

### If You Get Stuck

1. Files Changed tab will not open? Reload the PR page and retry. Make sure you are on the PR page, not the issue page.
2. Cannot find the inline comment button? Tab through the line controls in the diff. The button may be announced as "Add a comment" or have a `+` label. If you cannot find it, use the "Review changes" button at the top to add a general comment instead.
3. Not sure what to comment on? Focus on clarity: is every heading descriptive? Is every link meaningful? Are steps complete? Are keyboard shortcuts correct?
4. Review verdict button not working? Make sure you have at least one comment or have written summary text. Try reloading the page.
5. Submitting the review fails? Check that you are not in draft mode and have at least read access to the repo.
6. Ask facilitator to model one inline comment and one verdict submission.

> **Continue learning:** The GitHub Skills courses [Review Pull Requests](https://github.com/skills/review-pull-requests) and [Code Review with GitHub Copilot](https://github.com/skills/copilot-codereview) cover review workflows and AI-assisted code review. See [Appendix Z](appendix-z-github-skills.md) for the full catalog.

### Learning Moment

Constructive review is a gift. Specific, kind feedback helps authors improve and builds trust in the community. Every comment you write is practice for the professional code review you will do on real projects.

### Learning Pattern Used in This Chapter

1. Read the full diff before commenting (understand the author's intent first).
2. Find specific items to comment on (lines, phrases, missing steps).
3. Write comments that help, not just criticize (suggest improvements, note what works).
4. Choose a verdict that matches the substance of your feedback.
5. Summarize your overall impression in 1-2 sentences.


## Prerequisites Checklist

### Before starting this chapter, verify you have completed

- [ ] Chapter 6: [Working with Pull Requests](06-working-with-pull-requests.md) - Understand PR structure, diffs, and comment workflows
- [ ] Chapter 13: [GitHub Copilot](16-github-copilot.md) - VS Code installed and configured
- [ ] Screen Reader Setup - NVDA, JAWS, or VoiceOver installed and ready to use
- [ ] Access to at least one pull request to review (your own fork or a practice repo)

**Estimated time for this chapter:** 1 hour (including exercises)


## Two Environments for Code Review

You can review pull requests in two places - each with different strengths:

| Environment | Best For | Key Accessibility Feature |
| -------------  | ----------  | --------------------------  |
| GitHub web (browser) | Quick reviews, inline comments on any machine | New Files Changed Experience + keyboard navigation |
| VS Code | Deep reviews, large diffs, local context | Accessible Diff Viewer (`F7`) |

Both environments give you full keyboard and screen reader access. Your choice depends on context, not accessibility.

### About Learning Cards in This Chapter

Each review step includes expandable learning cards for different interaction styles. Open the one that matches how you work:

The following table describes each learning card type and who it is for.

| Card | Who it is for |
| --- | --- |
| **Visual / mouse users** | Sighted users navigating with a mouse or trackpad |
| **Low vision users** | Users working with zoom (200%+), magnification, high contrast themes, or large cursors |
| **Screen reader users (NVDA / JAWS)** | Windows users navigating with NVDA or JAWS |
| **Screen reader users (VoiceOver)** | macOS users navigating with VoiceOver |
| **CLI (gh)** | Terminal review commands - predictable text output |

<details>
<summary>GitHub CLI (gh) alternative - review from your terminal</summary>

The GitHub CLI offers a third path for reviewing PRs - especially useful for reading diffs and submitting verdicts:

```bash
# View the full PR diff in your terminal
gh pr diff 42

# View PR details (description, status, checks)
gh pr view 42

# Checkout the PR branch locally for testing
gh pr checkout 42

# Approve the PR
gh pr review 42 --approve --body "Heading hierarchy looks correct. LGTM."

# Request changes
gh pr review 42 --request-changes --body "The alt text on line 34 needs to describe the image."

# Leave a comment-only review
gh pr review 42 --comment --body "A few observations - see details below."
```

**Best for:** Quickly reading diffs, approving/rejecting PRs, and checking out branches for local testing. For inline comments on specific lines, use the web interface or VS Code.

</details>


## Part 1 - Reviewing on GitHub.com

### Good News: Modern Interface is Default

As of January 2026, GitHub's improved Files Changed experience is enabled by default. The instructions below assume you have the modern interface (which you do).

If the interface seems different from what's described here, clear your browser cache and reload the page.


### Step 1: Reach the Files Changed Tab

From any pull request page:

<details>
<summary>Visual / mouse users</summary>

Click the **Files changed** tab at the top of the PR page. The tab label shows the number of changed files (e.g., "Files changed 4").

</details>

<details>
<summary>Low vision users (zoom, high contrast)</summary>

1. The PR tabs (Conversation, Commits, Checks, Files changed) are across the top of the PR page. At high zoom they may wrap to multiple lines.
2. The **Files changed** tab includes a badge with the number of changed files. This badge uses text (not colour alone) so it is visible in all themes.
3. After clicking Files changed, the diff page loads. At high zoom, the file tree panel on the left may collapse automatically. Click the **file tree toggle** (a small panel icon) or press `T` to toggle it back.
4. Added lines use a green background; removed lines use red. In high contrast browser settings (Windows: Settings > Accessibility > Contrast themes), these colours map to strong border indicators.
5. Use `Ctrl++` to zoom the browser if the diff text is too small, and `Ctrl+-` to zoom out.

</details>

<details>
<summary>Screen reader users (NVDA / JAWS)</summary>

```text
Press D → navigate to "Pull request navigation tabs" landmark
Press → or Tab → find "Files changed" link → Enter
```

The tab label announces the number of changed files: *"Files changed, 4 files changed"*

</details>

<details>
<summary>Screen reader users (VoiceOver - macOS)</summary>

```text
VO+U → Landmarks → navigate to "Pull request navigation tabs"
VO+Right or Quick Nav K → find "Files changed" link → VO+Space
```

VoiceOver announces the number of changed files: *"Files changed, 4 files changed"*

</details>


### Step 2: Use the File Tree to Orient Yourself

The file tree panel lists every changed file. Before reading any diff, scan this list to understand the scope of the PR.

<details>
<summary>Visual / mouse users</summary>

The file tree is the left panel on the Files Changed page. Each file shows its name and a `+N / -N` badge (lines added/removed). Click any filename to scroll directly to its diff.

</details>

<details>
<summary>Screen reader users (NVDA / JAWS)</summary>

```text
Press D → navigate to "File tree" region
Press ↓ to move through files
Each file reads: "[filename] - [N additions, N deletions]"
Press Enter on a file to scroll its diff into view
```

</details>

<details>
<summary>Screen reader users (VoiceOver - macOS)</summary>

```text
VO+U → Landmarks → navigate to "File tree" region
VO+Down to move through files
Each file reads: "[filename] - [N additions, N deletions]"
VO+Space on a file to scroll its diff into view
```

</details>

#### What to listen for / look for

- How many files changed?
- Which areas of the codebase are affected?
- Are there unexpected files (generated files, lock files, configuration changes)?

<details>
<summary>Low vision users (zoom, high contrast)</summary>

1. The file tree shows each filename with a colour-coded bar indicating lines added (green) and removed (red). In high contrast mode, these bars may be less visible - the `+N / -N` text badge next to each file is the reliable indicator.
2. At high zoom, long file paths truncate. Hover over a truncated name to see the full path in a tooltip.
3. If the file tree panel is too narrow at high zoom, drag its right edge to widen it, or toggle it off and use heading navigation (`H` key) to move between file diffs.

</details>


### Step 3: Navigate Between File Diffs

Each changed file in the main area is an `h3` heading containing the filename.

<details>
<summary>Visual / mouse users</summary>

Scroll through the page or click a filename in the file tree on the left. Collapsed files can be expanded by clicking the file header.

</details>

<details>
<summary>Screen reader users (NVDA / JAWS)</summary>

```text
Press 3 to jump file-by-file through the diff
Listen for: "learning-room/docs/keyboard-shortcuts.md - collapsed" or "expanded"
Press Enter or Space to expand a collapsed file
```

If a diff is very long, the file tree is usually faster than pressing `3` repeatedly.

</details>

<details>
<summary>Screen reader users (VoiceOver - macOS)</summary>

```text
Quick Nav H or VO+Cmd+H to jump file-by-file through the diff
Listen for: "learning-room/docs/keyboard-shortcuts.md - collapsed" or "expanded"
VO+Space to expand a collapsed file
```

If a diff is very long, the file tree is usually faster than using heading navigation.

</details>


### Step 4: Read a Diff

Each file's diff is a table. Every row is one line of code.

<details>
<summary>Visual / mouse users</summary>

- **Green highlighted lines** (with a `+`) = lines added
- **Red highlighted lines** (with a `-`) = lines removed
- **Plain/white lines** = unchanged context
- Use `Ctrl+F` to search within the page for specific text in the diff

</details>

<details>
<summary>Low vision users (zoom, high contrast)</summary>

1. **Colour is not the only indicator.** Every added line has a `+` character in the gutter; every removed line has a `-`. These text characters are reliable regardless of colour settings.
2. At high zoom, long lines of code wrap. The `+`/`-` gutter character stays at the beginning of the first line, so look left to determine the change type.
3. Use `Ctrl+F` (browser find) to search for specific text across the entire diff page.
4. If the diff is split view (side by side), it may be very wide at high zoom. Switch to **unified diff** mode: click the gear icon in the Files Changed toolbar and select "Unified" - this shows old and new in a single column.
5. High contrast themes in Windows (Settings > Accessibility > Contrast themes) make the `+`/`-` lines use bold border patterns instead of subtle colour shading.

</details>

<details>
<summary>Screen reader users - NVDA</summary>

```
Press T to jump to the diff table then Insert+Space (Focus Mode)
Press Down Arrow to move through lines one at a time
Press Ctrl+Alt+Right Arrow to read across columns: line number, change type, code content
```

</details>

<details>
<summary>Screen reader users - JAWS</summary>

```
Press T to jump to the diff table then Insert+Z (Virtual PC Cursor off)
Press Down Arrow to move through lines
Press Ctrl+Alt+Right Arrow for column-by-column reading
```

</details>

<details>
<summary>Screen reader users - VoiceOver (macOS)</summary>

```
Press T or VO+U then Tables then select the diff table
VO+Shift+Down Arrow to enter the table
VO+Right/Left to navigate columns, VO+Up/Down to navigate rows
```

</details>

#### What each line announces / shows

- Added lines: `"+ [code content]"` - or announced as "inserted"
- Removed lines: `"- [code content]"` - or announced as "deleted"
- Context lines: code without a `+` or `-`

**Tip:** If the code on a line is very long, the screen reader will read the full line. For minified or generated files, consider collapsing the file in the tree and skipping it.


### Step 5: Place an Inline Comment

When you have a specific observation about a particular line, place an inline comment directly on it.

<details>
<summary>Visual / mouse users</summary>

1. Hover your mouse over a line in the diff - a **blue `+`** (comment) button appears on the left
2. Click it to open the inline comment box
3. Type your comment
4. Click **"Start a review"** (not "Add single comment" - see note below)

</details>

<details>
<summary>Screen reader users (NVDA / JAWS)</summary>

```text
Step 1: Navigate to the target line in the diff table (see Step 4)
Step 2: While focused on that line, press Tab → look for a comment button
Step 3: Alternatively: press B to navigate buttons → look for "Add a comment to this line"
Step 4: Press Enter to open the inline comment box
Step 5: Insert+Space (NVDA) or Insert+Z (JAWS) → switch to Focus Mode
Step 6: Type your comment
Step 7: Tab to "Start a review" button (not "Add single comment" - see note below)
Step 8: Press Enter
```

</details>

<details>
<summary>Screen reader users (VoiceOver - macOS)</summary>

```text
Step 1: Navigate to the target line in the diff table (see Step 4)
Step 2: While focused on that line, Tab → look for a comment button
Step 3: Alternatively: Quick Nav B → look for "Add a comment to this line"
Step 4: VO+Space to open the inline comment box
Step 5: VO+Shift+Down to interact with the text area
Step 6: Type your comment
Step 7: VO+Shift+Up to stop interacting → Tab to "Start a review" button
Step 8: VO+Space
```

</details>

> **Why "Start a review" instead of "Add single comment":** A single comment posts immediately and sends a notification for each one. "Start a review" batches all your comments and sends one notification when you submit - far less disruptive for the author.

#### Placing a multi-line comment

<details>
<summary>Visual / mouse users</summary>

Click and drag across multiple line numbers in the diff gutter to select a range. A comment button appears for the selected range.

</details>

<details>
<summary>Screen reader users (NVDA / JAWS)</summary>

```text
Step 1: Navigate to the first line of the range
Step 2: Press Shift+↓ to extend selection to additional lines
Step 3: A comment button appears for the selected range
Step 4: Proceed as above
```

</details>

<details>
<summary>Screen reader users (VoiceOver - macOS)</summary>

```text
Step 1: Navigate to the first line of the range
Step 2: Shift+↓ to extend selection to additional lines
Step 3: A comment button appears for the selected range
Step 4: VO+Space to activate, then proceed as above
```

</details>


### Step 6: Read Existing Comments and Threads

Inline comments from other reviewers appear as `h3` headings within the diff table. Each thread shows: reviewer username, comment body, replies, a "Reply" link and resolution button.

<details>
<summary>Visual / mouse users</summary>

Comments appear inline within the diff as collapsible cards. Click **"Reply…"** to add to a thread. Click **"Resolve conversation"** to mark a thread done (requires write access).

</details>

<details>
<summary>Screen reader users (NVDA / JAWS)</summary>

Navigate them with `3` (jump to `h3` headings in the diff).

To add to a thread:

```text
Step 1: Navigate to the thread heading (3)
Step 2: Tab to "Reply…" link
Step 3: Enter → text area appears → Focus Mode → type reply
Step 4: Ctrl+Enter to submit the reply
```

To mark a thread as resolved (if you have write access):

```text
Tab to the "Resolve conversation" button → Enter
```

</details>

<details>
<summary>Screen reader users (VoiceOver - macOS)</summary>

Navigate with Quick Nav `H` or `VO+Cmd+H` (jump to headings in the diff).

To add to a thread:

```text
Step 1: Quick Nav H to navigate to the thread heading
Step 2: Tab to "Reply…" link
Step 3: VO+Space → text area appears → VO+Shift+Down → type reply
Step 4: Cmd+Return to submit the reply
```

To mark a thread as resolved (if you have write access):

```text
Tab to the "Resolve conversation" button → VO+Space
```

</details>


### Step 7: Submit Your Review

After adding all inline comments:

<details>
<summary>Visual / mouse users</summary>

1. Click the **"Review changes"** button (top-right of the Files Changed page or bottom of the PR)
2. A dialog opens with a summary text area and three radio buttons: Comment / Approve / Request changes
3. Optionally type an overall summary in the text area
4. Select your verdict
5. Click **"Submit review"**

</details>

<details>
<summary>Screen reader users (NVDA / JAWS)</summary>

```text
Step 1: Press D → navigate to "Pull request navigation tabs"
Step 2: Press ← to return to the Conversation tab → Enter
Step 3: Scroll to the bottom (End key, or ↓ repeatedly)
Step 4: Alternatively: press B repeatedly → find "Review changes" button
Step 5: Press Enter to open the review summary dialog
Step 6: Focus Mode → type your overall comment
Step 7: Tab to the radio button group → ↑/↓ to select a verdict
Step 8: Tab to "Submit review" button → Enter
```

</details>

<details>
<summary>Screen reader users (VoiceOver - macOS)</summary>

```text
Step 1: VO+U → Landmarks → navigate to "Pull request navigation tabs"
Step 2: VO+Left to return to the Conversation tab → VO+Space
Step 3: VO+End or VO+Down to reach the bottom of the page
Step 4: Alternatively: Quick Nav B → find "Review changes" button
Step 5: VO+Space to open the review summary dialog
Step 6: VO+Shift+Down → type your overall comment
Step 7: VO+Shift+Up → Tab to the radio button group → VO+Left/Right to select a verdict
Step 8: Tab to "Submit review" button → VO+Space
```

</details>

#### Verdicts and their meaning

| Verdict | When to use |
| ---------  | -------------  |
| Comment | You have observations but no strong position; does not block merge |
| Approve | You've reviewed and are satisfied; signals readiness to merge |
| Request changes | Changes are needed before this should merge; blocks merge |


### Step 8: Re-request Review (for Authors)

After you address review comments on your own PR:

<details>
<summary>Visual / mouse users</summary>

Look in the right sidebar for the **Reviewers** section. Click the **re-request icon** (circular arrows) next to the reviewer's name to notify them that you've pushed changes.

</details>

<details>
<summary>Screen reader users (NVDA / JAWS)</summary>

```text
Step 1: From your PR's Conversation tab, find the reviewer's name in the sidebar (3 → "Reviewers" heading)
Step 2: Activate the refresh/re-request icon next to their name
Step 3: This re-notifies the reviewer that you've made changes
```

</details>

<details>
<summary>Screen reader users (VoiceOver - macOS)</summary>

```text
Step 1: From your PR's Conversation tab, Quick Nav H or VO+Cmd+H to find the "Reviewers" heading in the sidebar
Step 2: Tab or Quick Nav B to find the re-request icon ("Re-request review") next to the reviewer's name
Step 3: VO+Space to activate - this re-notifies the reviewer that you've made changes
```

</details>

### Learning Cards: Reviewing on GitHub.com

**Screen reader users:**
- In the Files Changed tab, press `T` to jump to the diff table, then use Focus Mode (`Insert+Space` in NVDA, `Insert+Z` in JAWS) and `Down Arrow` to read line by line -- each added line starts with `+` and each removed line with `-`
- To place an inline comment, navigate to the target line and press `Tab` or `B` to find the "Add a comment to this line" button; after typing your comment, choose "Start a review" (not "Add single comment") to batch all feedback into one notification
- Submit your full review by pressing `B` repeatedly to find the "Review changes" button; the dialog contains a radio group (Comment / Approve / Request changes) navigable with `Arrow` keys, then `Tab` to "Submit review"

**Low-vision users:**
- Switch from split diff to unified diff (gear icon in the Files Changed toolbar then select "Unified") to show old and new code in a single column -- much easier to follow at high zoom than two side-by-side panes
- The blue `+` comment button appears in the line gutter on hover; at high zoom it may be small -- use `Ctrl++` to increase browser zoom and look just left of the line number column
- The "Review changes" dialog uses clearly labeled radio buttons for the three verdict types; each label includes a brief description, and the currently selected option has a filled circle indicator visible in all themes

**Sighted users:**
- Use the file tree on the left side of the Files Changed page to jump between files; each file shows a coloured bar indicating the ratio of additions (green) to deletions (red) so you can prioritize large changes
- Hover on any line in the diff gutter to reveal the blue `+` icon for inline comments; click and drag across multiple line numbers to comment on a range of lines at once
- After adding all inline comments, click the green "Review changes" button at the top right, write a summary sentence, select your verdict, and click "Submit review" to post everything in one batch


## Part 2 - Reviewing in VS Code with the Accessible Diff Viewer

When you check out a branch locally, VS Code's diff editor offers the **Accessible Diff Viewer** - a purpose-built, line-by-line reading mode designed specifically for screen readers.

### Opening a Diff in VS Code

If you have the GitHub Pull Requests extension:

1. Open the GitHub Pull Requests view (Explorer sidebar or Ctrl+Shift+P → "GitHub Pull Requests: View Pull Request")
2. Find the PR and open it - changed files appear in the file tree
3. Navigate to any file in the tree and press `Enter` to open its diff view

Without the extension, any `git diff` operation also opens the diff editor.

### Learning Cards: VS Code Code Review

<details>
<summary>Low vision users (zoom, high contrast)</summary>

VS Code's diff editor works well at high zoom:

1. **Split view vs. inline:** By default, VS Code shows diffs in a split (side-by-side) view. At high zoom this can be very cramped. Switch to inline mode: `Ctrl+Shift+P` then type "Toggle Inline View" in any diff editor. Inline mode shows old and new code in a single column.
2. **Colour indicators:** Added lines have a green gutter bar; removed lines have a red gutter bar. In high contrast themes, these use heavy solid borders that are visible even at extreme zoom levels.
3. **Change navigation:** Press `F7` to jump to the next change and `Shift+F7` for the previous. Each change is highlighted with a visible focus box that moves with your position - much easier than scrolling at high zoom.
4. **Minimap in diff view:** The minimap (right edge) shows an overview of changes as coloured blocks. At high zoom the minimap may be too small to be useful - disable it via Settings if it adds visual noise.
5. **Font size for diffs:** Diff editors use your configured editor font size (`editor.fontSize`). Increase this in Settings (`Ctrl+,`) if the diff text is too small at your zoom level.
6. **Comment highlight:** When you add a comment through the GitHub PR extension, the commented line gets a distinct background. In high contrast themes this is a solid colour band.

</details>

<details>
<summary>Screen reader users (NVDA / JAWS on Windows)</summary>

#### Opening the PR for review

1. Press `Ctrl+Shift+P`, type "GitHub Pull Requests: View Pull Request"
2. The PR tree appears in the sidebar - navigate with `Down Arrow`
3. Each changed file is announced with its name and change summary
4. Press `Enter` on a file to open its diff editor
5. The diff editor opens with the standard VS Code diff layout

#### Using the Accessible Diff Viewer

1. In the diff editor, press `F7` to open the Accessible Diff Viewer
2. NVDA announces: "Changed lines X to Y in filename, Change 1 of N"
3. The viewer shows each change with "Removed:" and "Added:" labels
4. Press `F7` to move to the next change, `Shift+F7` for previous
5. Press `Escape` when done to close the viewer

#### Placing a comment

1. Navigate to the line you want to comment on in the diff
2. Press `Ctrl+Shift+P`, type "GitHub Pull Requests: Add Comment"
3. A text area opens below the line - NVDA announces the input focus
4. Type your comment
5. Press `Tab` to the Submit button, then `Enter`

</details>

<details>
<summary>Screen reader users (VoiceOver on macOS)</summary>

#### Opening the PR

1. Press `Cmd+Shift+P`, type "GitHub Pull Requests: View Pull Request"
2. Navigate the PR tree with `VO+Down Arrow`
3. Press `Return` on a file to open its diff

#### Accessible Diff Viewer

1. Press `F7` in the diff editor
2. VoiceOver announces each change with clear "Removed" and "Added" labels
3. Navigate with `F7`/`Shift+F7`
4. Press `Escape` to close

#### Comment placement

1. Press `Cmd+Shift+P`, type "GitHub Pull Requests: Add Comment"
2. `VO+Shift+Down Arrow` to interact with the comment text area
3. Type your comment
4. `VO+Shift+Up Arrow` to stop interacting, then `Tab` to Submit

</details>

### Using the Accessible Diff Viewer (`F7`)

From any open diff editor:

```text
Press F7 → Accessible Diff Viewer opens as a panel below the diff
```

The Accessible Diff Viewer reads each change as a structured block:

```text
"Changed lines 14 to 14 in docs/keyboard-shortcuts.md
[Change 1 of 3]

Removed:
    #### NVDA Single-Key Navigation

Added:
    ### NVDA Single-Key Navigation"
```

This example is from a real Learning Room scenario: a contributor fixing the heading hierarchy in `docs/keyboard-shortcuts.md` by changing a level-4 heading to level-3, which is exactly what you look for when reviewing Challenge 2 PRs.

#### Navigation

- `F7` - jump to next change (next hunk)
- `Shift+F7` - jump to previous change
- `Alt+F2` - open VS Code's Accessible View for additional context on the current item
- `Escape` - close the Accessible Diff Viewer

#### What makes this better than the raw diff editor

- Each change is announced as a discrete unit with clear "Removed:" and "Added:" labels
- You hear the change number of total changes ("Change 3 of 12")
- No table navigation required - purpose-built for sequential listening
- Works with all three major screen readers without any special configuration

### Placing Comments in VS Code (GitHub PR Extension)

From the diff editor with the GitHub PR extension:

```text
Step 1: In the diff gutter, navigate to the line you want to comment on
Step 2: Ctrl+Shift+P → "GitHub Pull Requests: Add Comment"
Step 3: Or press Shift+F10 (Windows) or Control+Return (macOS) on the line → context menu → "GitHub Pull Requests: Add Comment"
Step 4: A text area opens - type your comment
Step 5: Submit from the inline UI
```

Comments placed in VS Code sync to GitHub - they appear in the PR's Files Changed tab and the author receives the same notification.


## Code Review Structure and Content

### The Anatomy of a Useful Review Comment

A comment that helps the author is:

1. **Specific** - link to the exact line and name the pattern you see
2. **Educational** - say *why* something matters, not just what to change
3. **Graduated** - signal whether this is blocking, or a preference

#### Blocking example (reviewing a PR for `docs/keyboard-shortcuts.md`)
>
> "The heading on line 34 uses `####` (level 4) directly after `##` (level 2), skipping heading level 3. Screen reader users who navigate by heading level will miss any content between those two levels. Please change `####` to `###` before this merges."

#### Non-blocking (nit) example (reviewing a PR for `docs/welcome.md`)
>
> "nit: The link text in the 'Getting Help' section reads 'click here for more information.' Screen reader users who navigate links out of context will hear only 'click here' with no destination. Consider 'See the accessibility setup guide' instead. Not blocking."

#### Question example (reviewing a PR for `docs/setup-guide.md`)
>
> "The PR description says this fixes broken links in the setup guide, but the link on line 12 still points to `/docs/old-setup`. Am I reading the diff correctly, or was this link intentionally left? Happy to re-review once I understand."

### Prefixes That Set Expectations

Using shorthand prefixes helps authors parse many comments quickly:

| Prefix | Meaning |
| --------  | ---------  |
| `nit:` | Non-blocking stylistic preference |
| `question:` | Genuine question; not blocking |
| `suggestion:` | Alternative to consider; take it or leave it |
| `important:` | Should be addressed; may block |
| `blocking:` | Must be addressed before merge |
| `praise:` | Positive callout - works well, good pattern |

### How Many Comments Is Too Many?

There is no hard limit, but quantity without prioritization is noise. If you have 15 comments, make clear which 2-3 are blocking. Authors can then focus energy on what matters most and address preferences in follow-up PRs.


## Keyboard Reference

### GitHub Web Review

| Action | Key |
| --------  | -----  |
| Navigate to Files Changed tab | `D` → PR tabs landmark → `→` → `Enter` |
| Jump between file diffs | `3` |
| Navigate diff lines (NVDA/JAWS) | Focus Mode + `↓` |
| Read across diff columns | `Ctrl+Alt+→` |
| Open inline comment box | Line focused → `B` → comment button |
| Submit entire review | `D` → Conversation → `B` → "Review changes" |
| Navigate existing threads | `3` |
| Reply to a thread | `3` → thread → `Tab` → "Reply" → `Enter` |

### VS Code Accessible Diff Viewer

| Action | Key |
| --------  | -----  |
| Open Accessible Diff Viewer | `F7` |
| Next change (hunk) | `F7` |
| Previous change (hunk) | `Shift+F7` |
| Open Accessible View | `Alt+F2` |
| Accessible Help (any widget) | `Alt+H` |
| Close Accessible Diff Viewer | `Escape` |


## Common Review Scenarios

### "I want to verify the PR only changes what it claims"

**Example:** A PR says "Challenge 2: Add NVDA shortcut" but the file tree shows changes to both `docs/keyboard-shortcuts.md` and `docs/welcome.md`.

```text
1. File tree → count the files, read the names
2. 3 → navigate each file heading → listen to the stats line (N additions, N deletions)
3. For keyboard-shortcuts.md: T → Focus Mode → ↓ through lines → verify the new shortcut row
4. For welcome.md: check if the change is related → if unrelated, leave a comment on the first line
```

### "I want to find all changes to one specific section"

**Example:** A PR for Challenge 3 modified `docs/welcome.md`. You want to verify the `[TODO]` in the "Who Can Contribute?" section was filled in correctly.

```text
1. In VS Code: open docs/welcome.md → Ctrl+G → jump to the "Who Can Contribute?" section
2. F7 → Accessible Diff Viewer → listen for changes near that heading
3. Or on GitHub: file tree → expand welcome.md → T → navigate the diff table to the [TODO] line
```

### "I agreed but then the author made more changes - did anything new appear?"

```text
1. Go to the Commits tab (D → PR tabs → "Commits" → Enter)
2. 3 to navigate commits - find any commits after your last review
3. Press `Enter` on the commit to see only what changed in that push (not the full diff)
```

### "A reviewer left a comment I don't understand"

```text
1. Read the full thread (3 → navigate to the thread heading)
2. Tab to the "Reply" button
3. Ask: "Can you clarify what change you're suggesting? I want to understand before I act on this."
4. Or: reference a specific line in your reply using the line number
```


## Exercises

These exercises use the files in `learning-room/docs/` in this repository. All examples involve documentation changes - no code required.


### Exercise A - Complete a Web Review

**Scenario:** A contributor has submitted a pull request titled "Add screen reader tips to the setup guide." The PR modifies `learning-room/docs/setup-guide.md`. Your job is to review it before it merges.

**What You'll Learn:** How to use screen reader heading navigation to spot accessibility issues in a GitHub PR diff.


#### Step 1: Navigate to the Pull Request

##### What to do

1. Open GitHub in your browser and navigate to the workshop repository (`github.com/[your-fork]/[workshop-repo]` or `community-access/accessibility-agents`)
2. Click the **Pull Requests** tab (top navigation)
3. Look for a PR titled "Add screen reader tips to the setup guide" - click it to open
4. You should now see the PR page with sections: Conversation, Commits, Files Changed

##### How to know you're in the right place

- The PR title is visible at the top
- You see a description box with text about what this PR does
- You see tabs labeled "Conversation," "Commits," "Files Changed"

##### If you can't find the PR

- Use `Ctrl+F` to search the PR list for "screen reader tips"
- Or ask in the workshop Slack - someone can share the exact URL


#### Step 2: Read the PR Description

##### What to do

1. You are currently on the **Conversation** tab
2. Read the PR description (the text immediately under the PR title)
3. Look for: "What does this PR change?" and "Why does it change it?"
4. **With screen reader:** Navigate to the description with `D` (NVDA) or press `Ctrl+Option+Up` (VoiceOver) to find main landmarks, then read the content region

##### What to look for

- Does the PR author explain what file changed? (should mention `setup-guide.md`)
- Does it explain why? (should mention "improve accessibility" or "add tips")
- Is it clear enough that a reviewer can understand the goal without reading the diff?

##### What success looks like

- You can answer: "This PR adds [specific content] to [specific file] because [clear reason]"
- Example: "This PR adds screen reader usage tips to the setup guide because new users need accessibility guidance"


#### Step 3: Navigate to "Files Changed"

##### What to do

1. Click the **Files Changed** tab (top of the PR page, to the right of "Commits")
2. You are now viewing the diff
3. **With keyboard (all screen readers):** Press `T` to jump to the diff table. The page focuses on the file comparison area.

##### What you should see

- A section showing the file name `setup-guide.md` with a small badge showing "+20 −0" (20 lines added, 0 lines removed)
- Below it, the diff with removed lines (preceded by `−`) and added lines (preceded by `+`)

##### If you see multiple files

- Scroll up to see if there are other files. For this exercise, only `setup-guide.md` should be changed.
- If you see other files, confirm they are not modified (the badge should show "+0 −0" or no changes)


#### Step 4: Activate Focus Mode for Better Diff Reading

##### What to do

1. Look for a button labeled "Focus Mode" or an icon (usually at the top right of the diff area)
2. **With keyboard:** Press `F` to toggle Focus Mode (may need to be in the diff area first)
3. **With mouse:** Click the Focus Mode button/icon

##### What happens in Focus Mode

- The page simplifies: sidebars disappear
- Only the diff is visible - easier for screen reader navigation and less cognitive load
- The diff is now the main content area

##### With screen reader (once in Focus Mode)

- NVDA/JAWS: Press `T` to jump to the diff table
- VoiceOver: Navigate with `VO+Right Arrow` to find the table/content region
- Read through the changes: `↓` arrow moves to each line


#### Step 5: Find the Heading Hierarchy Issue

##### What to do

1. **Read through the entire diff** line by line. Pay special attention to lines starting with `#`
2. You are looking for: a line with `####` (four hashes, heading level 4) that comes *directly after* a `##` (two hashes, heading level 2)
3. When you find it, **note the exact line number** shown in the diff

##### Example of what you're looking for

```text
  ## Setup Basics          ← Heading level 2
  ...several lines...
  #### Advanced Tips       ← Heading level 4 (skipped level 3!)
```

##### Why this matters

- Screen reader users navigate documents by heading level: `1` → `2` → `3` → `4`
- A skip from `##` to `####` breaks that navigation
- When a user presses "jump to heading level 3," they'll find none, wondering if content is missing

##### What success looks like

- You found the line with `####` that violates hierarchy
- You can say the line number and what heading text appears there
- You understand *why* this is an accessibility problem


#### Step 6: Place a Blocking Review Comment on the Heading

##### What to do

1. Find the diff line with the problematic `####` heading
2. **Hover your mouse over the line number** on the left side of that line (or if using keyboard, navigate to that line in the table)
3. A button should appear (or press the Add Comment hotkey - usually `C` in GitHub)
4. Click it or press `Enter` to open a comment box

##### In the comment box

1. Type: `blocking:` (tells reviewers this stops the PR from merging)
2. Press Space, then explain:

   ```text
   Heading hierarchy violation. This heading uses #### (level 4) directly 
   after ## (level 2), skipping level 3. Screen reader users navigating 
   by heading level will miss this section. Change to ### (level 3).
   ```

3. Click the **Comment** button (or press `Ctrl+Enter` for keyboard submit)

##### What happens next

- Your comment appears in the thread under that line
- The PR author sees it and can make the fix

##### If the comment button doesn't appear

- Make sure you're hovering over the *line number* area (left side of the line)
- Try refreshing the page and trying again
- Or use the "Add a reply" field at the bottom of the PR and mention the line number manually


#### Step 7: Find the Link Text Issue

##### What to do

1. **Continue reading the diff** (from where you left off)
2. Look for a line containing link text that reads `"click here"` or `"click here for more information"`
3. **Note the line number**

##### Why this matters

- Screen reader users can ask their reader to "list all links on this page" - they hear only the link text
- If the text is "click here," they have no context about where it goes
- Descriptive link text is WCAG 2.4.4 (Link Purpose)

##### What success looks like

- You found a link with non-descriptive text
- You can explain why "click here" is bad and what would be better


#### Step 8: Place a Comment on the Link

##### What to do

1. Find the line in the diff with the problematic link
2. Hover over the line number and click to open a comment box (or press `C`)
3. Type:

   ```text
   nit: Link text "click here" is not descriptive. Screen reader users 
   who list links won't know the context. Suggest: "Read the accessibility 
   checklist" or another descriptive phrase.
   ```

4. Click **Comment** or press `Ctrl+Enter`

**Note:** `nit:` means "nice-to-have improvement" (not blocking, but good to fix)


#### Step 9: Submit Your Review

##### What to do

1. Look for a button labeled **"Review changes"** (usually at the top right of the page or bottom of comments)
2. Click it (or navigate with keyboard and press `Enter`)
3. A dialog appears with options:
   - **Comment** - provide feedback but don't block (for minor notes)
   - **Approve** - the PR is ready to merge
   - **Request changes** - this PR cannot merge until changes are made

##### For this exercise

1. Select **"Request changes"** (you found two things to fix)
2. In the summary field, write: `Found 2 accessibility issues that must be fixed before merging.`
3. Click **"Submit review"**

##### What happens

- Your review is submitted
- The PR author gets a notification
- The PR shows your review with the two comments
- GitHub blocks merging until the author responds to or fixes the changes

##### What success looks like

- You see your review appear on the PR page
- It shows 2 comments you made
- The PR status shows "Changes requested"


#### Reflect on This Exercise

After submitting, answer:

1. **Did heading-level navigation help?** When you were looking for the `####` issue, was it easier to navigate by heading level (`1`-`6`) than to scan every line?
2. **Would you have caught this without the exercise prompt?** If you were a real reviewer not specifically looking for heading issues, would the diff have been obvious?
3. **Why does screen reader navigation matter?** In one sentence, explain why a screen reader user's ability to jump through heading levels is important for this document.

Keep your answers - you'll need them for Chapter 16's Accessibility Agents exercise to compare manual review with agent-assisted review.


### Exercise B - Use the VS Code Accessible Diff Viewer

**Scenario:** Review the same pull request from Exercise A, this time entirely in VS Code. You'll compare the browser experience with the VS Code experience.

**What You'll Learn:** How the VS Code Accessible Diff Viewer announces changes differently than the browser diff, and when each environment is most useful.


#### Prerequisites

Before starting:

- VS Code must be installed on your machine
- The GitHub Pull Requests extension must be installed (see [Chapter 12](15-code-review.md) for installation)
- You must be signed into GitHub from VS Code (use `Ctrl+Shift+P` → "GitHub: Sign in")


#### Step 1: Open the GitHub Pull Requests Extension

##### What to do

1. Open VS Code
2. **With keyboard (all screen readers):** Press `Ctrl+Shift+X` to open the Extensions sidebar
   - **With mouse:** Click the Extensions icon on the left sidebar (looks like four squares)
3. Search for "GitHub Pull Requests"
4. If it's not installed, click **Install**
5. If it is installed, click **GitHub Pull Requests** to view its details

##### What you should see

- The extension is listed as active
- It mentions: "Review and manage GitHub pull requests and issues"


#### Step 2: Open the Pull Requests Sidebar

##### What to do

1. Look for a **GitHub-themed icon** on the left sidebar (circle with octocat logo) - click it
   - **With keyboard:** The icon may not be keyboard-reachable directly; instead go to Step 3
2. A sidebar appears showing open pull requests on repositories you have access to
3. **Find the PR titled "Add screen reader tips to the setup guide"** - it should appear in a list
4. Click it to open

##### What happens

- VS Code opens a new editor tab for this PR
- Below the PR title, you see a "Changes" section listing modified files
- You should see `setup-guide.md` in the changes list

##### If you can't find the PR

- Use `Ctrl+Shift+P` → search `GitHub Pull Requests: Open Pull Request`
- Paste the PR URL: `https://github.com/[owner]/[repo]/pull/[number]`
- Press Enter


#### Step 3: View the File Changes

##### What to do

1. In the **Changes** section, locate `setup-guide.md`
2. Click on the filename to open it

##### What happens

- A diff editor opens showing two columns:
  - **Left:** the original file (before changes)
  - **Right:** the new file (after changes)
- Different colors show added (green), removed (red), and modified (blue) lines
- The file name appears at the top: `setup-guide.md`

##### With screen reader

- NVDA/JAWS: The editor announces "Diff Editor - setup-guide.md"
- Use `Ctrl+Home` to jump to the start of the diff
- Use `Ctrl+End` to jump to the end


#### Step 4: Access the Accessible Diff Viewer

##### What to do

1. **With keyboard:** Press `F7` to open the Accessible Diff Viewer
   - **With mouse:** Look for a button or menu option labeled "Accessible View" or "Open Accessible Diff"
   - If no button is visible, try `Alt+F2` (VS Code Accessible View toggle)

##### What happens

- A new panel opens at the bottom of VS Code
- The panel announces each change one at a time
- Changes appear in text format with labels: "Added: " and "Removed: "
- The panel is read-only (you read the changes, you don't edit here)

##### If the Accessible Diff Viewer doesn't open

- Make sure the diff editor is active (click in the diff area first)
- Try `Ctrl+Shift+P` → search `Open Accessible Diff`
- If available, select it


#### Step 5: Listen to and Understand the First Change

##### What to do

1. The first change is automatically announced when you open the Accessible Diff Viewer
2. **Let your screen reader read it completely** - don't interrupt
3. Write down the exact text announced:

   ```text
   Removed: [write what the viewer said]
   Added: [write what the viewer said]
   ```

4. Press the **Down arrow** to move to the next change

##### What to expect (example)

```text
Removed: ## Old Heading
Added: ## New Heading with More Details
```

##### With screen reader

- NVDA/JAWS: The Accessible Diff Viewer announces "Removed:" and "Added:" labels, followed by the line content
- VoiceOver: The announcement may be similar; listen for "removed" and "added" keywords


#### Step 6: Find the Heading Hierarchy Issue

##### What to do

1. Continue pressing **Down arrow** to move through changes
2. Listen carefully for a change involving headings (lines starting with `#`)
3. Specifically, listen for: "Added: ####" (four hashes)
4. When you hear this, **stop and write it down:**

   ```text
   Line number: [if available]
   Removed: [what was removed, if anything]
   Added: [the four-hash heading]
   Context: [is there a ## heading just before this?]
   ```

##### Why listen for this?

- Four hashes (`####`) indicate a level 4 heading
- In the diff, you're looking for it appearing after a level 2 heading (`##`)
- This creates the hierarchy skip you caught in Exercise A

##### What success looks like

- You found the explanation in the Accessible Diff Viewer's format
- You can explain: "The added line with `####` directly follows a `##`, skipping level 3"
- The Accessible Diff Viewer made this *pattern* clearer than scanning raw `+` characters


#### Step 7: Locate the Heading Line and Add an Inline Comment

##### What to do

1. Once you identified the problematic heading in the Accessible Diff Viewer, **close the Accessible Diff Viewer** (press `F7` again or `Alt+F2`)
2. You're back in the regular Diff Editor
3. **Find the line with the problematic `####` heading:**
   - Use `Ctrl+F` to open Find
   - Search for `####` to locate it quickly
   - Press `Enter` to jump to it
4. Close Find (`Escape`)
5. Place your cursor on that line
6. **Right-click** and select "Add Comment" or press the **Comment icon** that appears on the left margin
   - **With keyboard:** The comment button may appear on the current line; navigate to it and press `Enter`

##### What happens

- A comment box opens
- You can type your comment


#### Step 8: Write Your Accessible Diff Comment

##### What to do

1. In the comment box, type:

   ```text
   blocking: Heading hierarchy violation. The Accessible Diff Viewer 
   clearly showed this #### heading appearing directly after ##, skipping 
   level 3. Screen reader users navigating by heading level will miss this 
   content. Change to ###.
   ```

2. Press `Ctrl+Enter` or click **Comment** to submit

##### Why mention the Accessible Diff Viewer?

- It shows that the tool *itself* helps you see the issue
- It documents how you caught the problem (useful for learning)


#### Step 9: Create a GitHub Pull Request Comment

##### Special Section: Comparing Tools

Now you've reviewed the same PR in:

1. **Browser (Exercise A):** You spot-checked line numbers manually
2. **VS Code (Exercise B):** The Diff Editor plus Accessible Diff Viewer announced changes

##### What to do

1. Go to GitHub in your browser and open the same PR
2. Scroll to the bottom and leave a comment in the Conversation tab:

```text
I've now reviewed this PR in both the browser and VS Code. Here's 
what I found:

**Browser review:** I had to manually navigate with heading commands 
and scan for the skip visually. Found 2 issues.

**VS Code + Accessible Diff Viewer:** The Accessible Diff Viewer 
announced changes in a linear format, making it easier to follow 
the story of what changed without scanning back and forth.

**My conclusion:** [Choose one]
- The browser method was clearer for me
- VS Code was clearer for me
- Both have strengths; I'd use each for different purposes
  - Browser best for: [specific reason]
  - VS Code best for: [specific reason]
```

1. Click **Comment**


#### Reflect on This Exercise

After completing Steps 1-9, answer:

1. **Announcement clarity:** Did the "Added:" and "Removed:" labels from the Accessible Diff Viewer help you follow changes faster than reading `+` and `−` prefixes in the browser?
2. **Navigation pattern:** Which tool required less back-and-forth clicking/tabbing to understand each change?
3. **When would you use each?** In one sentence: describe a type of PR where you'd prefer to use each tool.

**Record your answers.** In Chapter 16, you'll compare these manual reviews with the `@pr-review` agent's suggested changes.


### Exercise C - Compare and Reflect

**Your Mission:** Synthesize what you learned from the manual code reviews (Exercises A & B) and document your findings.

**What You'll Learn:** Which tools work best for different scenarios, and how your manual review skills prepare you to use AI agents effectively.


#### Step 1: Gather Your Data

Before writing your reflection, collect all the information you gathered:

##### From Exercise A (Browser Review)

- Which line number had the heading hierarchy skip?
- Which line number had the link text issue?
- How many steps did it take to find each issue?
- Did you use screen reader commands or visual scanning more?

##### From Exercise B (VS Code Review)

- What did the Accessible Diff Viewer announce for the heading change?
- Was the announcement clearer than the browser's `+` and `−` format?
- Did you need to switch between the Accessible Diff Viewer and the regular editor?
- How many steps to find the problem?

**Write these down** (in a text editor, on paper, or mentally) - you'll reference them in Steps 2-4.


#### Step 2: Navigate to the PR and Leave Your Reflection Comment

##### What to do

1. Go to GitHub in your browser
2. Open the same PR ("Add screen reader tips to the setup guide")
3. Scroll to the **Conversation** tab
4. Scroll all the way down to the comment box at the bottom (labeled "Leave a comment" or "Add a comment")
5. Click in the comment box

##### What you should see

- A text editing area with formatting options (Bold, Italic, Link, etc.)
- A **Comment** button below the text area


#### Step 3: Write Your Comparison

##### What to do

Type your response to these three questions. Be specific - reference exact tools, steps, and what you discovered:

##### Question 1: Environment Preference

```text
After reviewing this PR in both environments, my preferred tool was:
[Browser / VS Code / Both equally]

Why: [1-2 sentences explaining your choice]

Example: "I preferred VS Code because the Accessible Diff Viewer 
separated changes into 'Added:' and 'Removed:', making it obvious 
what the new content was. In the browser, I had to mentally filter 
the + and − characters."
```

##### Question 2: Strengths of Each Environment

```text
Browser made this easier: [One specific task, e.g., "Finding the PR URL"] 
because [Why]

VS Code made this easier: [One specific task, e.g., "Following the diff linearly"] 
because [Why]

Example Browser: "Finding context about *why* the change was made, 
because all the discussion is in one place"

Example VS Code: "The Accessible Diff Viewer announcing changes sequentially 
meant I didn't miss anything by accidentally scrolling past it"
```

##### Question 3: Real-World Impact

```text
For someone reading the published document (not the diff), the heading 
skip matters because: [1-2 sentences]

Example: "A screen reader user pressing the '3' key to navigate to level-3 
headings will find none, and might think the document skipped a section. 
This breaks the information hierarchy."
```

##### Full template to copy into the comment box

```text
## Code Review Reflection - Browser vs VS Code

After reviewing this PR using both the browser and VS Code environments, 
here's what I found:

### Environment Preference

My preferred tool was: **[Browser / VS Code]**

Why: [1-2 sentences]

### Specific Strengths

#### Browser made this easier
- Task: [specific thing]
- Why: [explanation]

#### VS Code made this easier
- Task: [specific thing]
- Why: [explanation]

### Real-World Impact

The heading hierarchy skip in the published document matters because: 
[1-2 sentences about why screen reader users would be affected]
```


#### Step 4: Review Your Comment

##### What to do

1. Before submitting, **re-read your comment** using your screen reader or by reading aloud
2. Ask yourself:
   - Is it clear which tool I preferred?
   - Did I explain *why* with concrete examples?
   - Am I describing the real-world impact accurately?
   - Would someone else reading this understand how I caught the issue?
3. Make any corrections needed
4. **Do not submit yet** - continue to Step 5


#### Step 5: Submit Your Reflection

##### What to do

1. Locate the **Comment** button at the bottom right of the comment box
2. **With keyboard:** Press `Tab` until the Comment button is focused, then `Enter`
3. **With mouse:** Click the **Comment** button
4. Your comment is submitted and appears on the PR page

##### What happens

- Your comment is now visible on the PR
- Other reviewers can see your comparison
- You have completed the three-part exercise series

##### What success looks like

- Your comment appears on the PR thread
- It includes all three reflections
- The PR author and other reviewers can see your thought process


#### Step 6: Checkpoint - Validate Your Learning

Before moving forward, verify you understand:

1. **Heading Hierarchy:** Can you explain in one sentence why a `##` → `####` skip breaks screen reader navigation?
   - *Expected answer:* Something like "Screen readers let users navigate by heading level (pressing 3 jumps to H3), so skipping a level makes users think content is missing."

2. **Tool Strengths:** For each tool you used, name one task it made easier.
   - *Expected answer:* e.g., "Browser: finding context in discussions. VS Code: linear reading of changes."

3. **Real-World Testing:** How would you test the heading issue in the *published* document (not the PR diff)?
   - *Expected answer:* Something like "Open the document in a browser, use screen reader heading navigation, and confirm I can reach all levels (H2, H3, H4)."

If you can answer all three, you're ready for the next chapter.


## Part 3 - Using GitHub Copilot to Understand Code Changes

Reviewing code is about understanding *what changed*, *why it changed*, and *whether the change is safe and correct*. GitHub Copilot can help you gather and understand information about code changes - especially when diffs are large, complex, or involve unfamiliar frameworks.

### When to Use Copilot During Code Review

Copilot is most useful for answering these questions:

1. **"What does this code do?"** - you're reading unfamiliar syntax or a framework you don't know well
2. **"Why might this change break something?"** - you need to understand dependencies or side effects
3. **"Is this pattern safe?"** - you want to verify that the approach follows best practices
4. **"What would be a better way to write this?"** - you're looking for alternatives to suggest
5. **"Does this match the PR's description?"** - the change seems to do more (or less) than claimed

### How to Use Copilot During Review

#### In VS Code with an Open Diff

1. Open the PR using the GitHub Pull Requests extension (see Part 2)
2. Open the diff for any file
3. **Select** a block of code that confuses you (highlight it)
4. Open Copilot Chat: `Ctrl+Shift+I`
5. Type: `Explain what this code does` or `Why might this change affect [other file]?`
6. Copilot reads the selected code and answers in the chat

#### Example Exchange

```text
You (selected code):
  -  const oldParser = require('./old-parser.js');
  +  const newParser = require('fast-parser');

You ask Copilot:
  "Why would switching from require('./old-parser.js') to require('fast-parser') be risky?"

Copilot might respond:
  "The modules have different APIs. If the code calls oldParser.parseXML() 
  and newParser doesn't have that method, the diff would break existing code. 
  Check if the call sites were also updated in this PR."

You then:
  - Search the diff for calls to parseXML() to verify they were updated
  - Or leave a comment: "Did we confirm all oldParser.parseXML() calls were 
    updated to use the new parser's API?"
```

#### On GitHub.com (Web Interface)

1. Open the PR's Files Changed tab
2. Focus on a line or section you want to understand better
3. In VS Code Copilot Chat (not in the browser - Copilot Chat doesn't work directly in browser diffs yet)
4. Copy the confusing code, paste it into chat, and ask Copilot to explain

**Another option:** Use the GitHub Copilot inline suggestions on GitHub.com:

- Some GitHub PRs show Copilot insights directly in the diff (as of early 2026)
- If you see a lightbulb  icon, click it to see Copilot's suggestion about that line

### Copilot Limitations During Review (Critical to Know)

Copilot cannot:

- **See the whole project** - it sees only what you show it (the selected diff, not the context of the entire codebase)
- **Verify correctness** - it can explain what code does, but not whether it's correct for your specific use case
- **Understand intent** - it reads the code, not the author's mind or the PR description
- **Catch all risks** - it can spot common patterns, but not edge cases unique to your project

**This is why manual review is essential:** You have context (project history, team decisions, user impact) that Copilot does not. Use Copilot to *understand*, then use your judgment to *decide*.

### Best Practices

1. **Read the diff manually first** - you spot the big picture before asking Copilot details
2. **Ask Copilot specific questions** - not "review this code" but "does this regex handle Unicode?"
3. **Fact-check Copilot's answers** - it can be confidently wrong, especially about frameworks or domains it has less training data for
4. **Combine Copilot with manual analysis** - ask Copilot to explain, then verify by checking the PR description or looking for related files
5. **Use Copilot to draft comments** - type `Draft a comment about [issue] for this PR` and edit Copilot's suggestion to match your tone


### What Comes Next

Your manual code review skills - identifying heading issues, catching link text problems, understanding screen reader navigation, gathering information with Copilot - are the **foundation** for understanding automated review.

In **Chapter 16 (Accessibility Agents)**, you'll meet a full team of agents designed to **amplify** these skills:


## Part 4: The Reviewer's Craft

Parts 1 through 3 taught you the mechanics -- how to read diffs, leave comments, and use Copilot to understand unfamiliar code. This part covers something equally important: **how to think like a reviewer**. Good reviews are not about finding faults. They are about helping the author ship better work while learning something yourself.

### What to Look for in a Review

Every PR is different, but most reviews benefit from scanning across these five categories:

| Category | What you're checking | Example question |
|---|---|---|
| **Clarity** | Readable code, clear naming, consistent style | "Would another contributor understand this variable name six months from now?" |
| **Accuracy** | The code does what the PR description says it does | "The description says this fixes the heading hierarchy -- does it actually change the heading level?" |
| **Scope** | The change stays within the PR's stated goal | "This PR says it updates alt text, but it also refactors the navigation bar -- should that be a separate PR?" |
| **Regressions** | The change does not break existing behavior | "This function used to return a list. Now it returns a single item. Will callers still work?" |
| **Accessibility** | Screen reader support, keyboard navigation, WCAG basics | "Does this new button have an accessible label? Can a keyboard-only user reach it?" |

You do not need to check every category exhaustively on every PR. Skim the list, focus on whatever stands out, and flag anything you are unsure about as a question rather than a demand.

> **Screen reader tip:** When reading a diff in VS Code, you can jump between changed hunks with `Alt+F5` (next change) and `Shift+Alt+F5` (previous change). This helps you scan for scope creep -- changes that appear in files you did not expect.

### The Three Review Actions

When you submit a review on GitHub, you choose one of three actions. Picking the right one matters because it signals your intent to the author and to anyone else watching the PR.

**Approve** -- Use this when everything looks good, or when only trivial nits remain (typos, minor style preferences). An approval tells the author: "I've read this and I'm satisfied it can merge."

**Request Changes** -- Use this when something **must** be fixed before merge. Bugs, security issues, broken tests, accessibility regressions, or changes that do not match the PR's description all qualify. A request-changes review blocks the PR (in many team configurations) until you re-review.

**Comment** -- Use this when you have questions, suggestions, or discussion points that do **not** block the merge. Comments are for learning, brainstorming, and optional improvements. If you are not sure whether something is a blocker, use Comment and explain your uncertainty in the text.

**Decision tree:**

1. Did you find a bug, security issue, or broken test? -- **Request Changes**
2. Does the code do something different from what the description says? -- **Request Changes**
3. Does everything work, with maybe a few style nits? -- **Approve** (mention the nits in a comment)
4. Do you have questions or optional suggestions? -- **Comment**

### Writing Constructive Feedback

The way you phrase feedback determines whether the author feels supported or attacked. A few principles go a long way:

**Lead with what works.** Before pointing out problems, acknowledge something the author did well. "The new heading structure looks great -- much easier to follow" takes five seconds to write and sets a collaborative tone.

**Be specific about what to change.** "This doesn't look right" is frustrating. "Line 42 uses an `h4` immediately after an `h2`, which skips a heading level -- screen readers announce this as a navigation error" gives the author everything they need to fix it.

**Explain why, not just what.** "Change this to `h3`" is an instruction. "Change this to `h3` because screen readers use heading levels to build a page outline, and skipping from `h2` to `h4` creates a gap in that outline" teaches the author something they will remember next time.

**Offer alternatives, not just criticism.** Instead of "this naming is confusing," try "consider renaming `processData` to `parseUserInput` -- it would make the function's purpose clearer at the call site."

**Use soft language for suggestions, direct language for requirements.** "Consider using a `<button>` here instead of a `<div>` -- it gives you keyboard support for free" is a suggestion. "This `onclick` handler on a `<div>` must be changed to a `<button>` or given `role='button'` and a `keydown` handler -- without that, keyboard users cannot activate it" is a requirement. Match your tone to the severity.

### The Reviewer's Checklist

Run through this list mentally (or copy it into your notes) for every PR you review:

- [ ] I read the PR description before reading the code
- [ ] The code does what the description says it does
- [ ] The change does not include unrelated modifications
- [ ] Variable and function names are clear
- [ ] I checked for accessibility: labels, headings, keyboard reach, contrast
- [ ] I verified no existing behavior is broken by the change
- [ ] I left at least one positive comment
- [ ] I chose the right review action (Approve, Request Changes, or Comment)
- [ ] My feedback explains **why**, not just **what**

### Reviewing as a Learning Tool

Reviewing is not just a gate to keep bad code out. It is one of the fastest ways to grow as a developer.

**Reading other people's code teaches you patterns.** Every PR you review exposes you to a different way of solving a problem. Over time, you build a mental library of approaches -- some you will adopt, some you will avoid, all of which make you a stronger contributor. See [Chapter 8](08-open-source-culture.md) for more on learning through open source participation.

**Giving feedback forces you to articulate your understanding.** When you write "this heading skip will confuse screen reader users," you are not just helping the author -- you are reinforcing your own knowledge. If you struggle to explain why something is wrong, that struggle is a signal that you have more to learn about the topic. Follow that signal.

**Reviewing builds trust.** When you leave thoughtful, respectful reviews, authors start seeking your input. That trust turns into collaboration, mentorship, and eventually the kind of team culture where everyone improves together. See [Chapter 6](06-working-with-pull-requests.md) for how PRs fit into collaborative workflows.

> **Screen reader tip:** After submitting a review, GitHub returns you to the PR's Conversation tab. Press `h` in GitHub's keyboard shortcuts to jump by heading and confirm your review appears in the timeline.

### Learning Cards: The Reviewer's Craft

<details>
<summary>Screen reader users</summary>

- Jump between changed hunks in a diff with `Alt+F5` (next change) and `Shift+Alt+F5` (previous change) to scan for scope creep efficiently
- Use `Alt+F2` (Accessible View) on a Copilot-generated review summary to read the full text with arrow keys before posting
- When leaving feedback, mention specific line numbers ("Line 42 skips from h2 to h4") so the author can navigate directly with `Ctrl+G`

</details>

<details>
<summary>Low vision users</summary>

- The three review actions (Approve, Request Changes, Comment) are shown as clearly labeled radio buttons in the review submission form
- Use the reviewer checklist in this section as a mental framework -- copy it into your notes and check items off as you review each PR
- The diff view uses green and red backgrounds for added/removed lines; pair with a High Contrast theme if these colors are hard to distinguish

</details>

<details>
<summary>Sighted users</summary>

- The Files Changed tab on GitHub.com shows a progress bar indicating how many files you have viewed -- aim for 100% before submitting
- Green checkmarks next to file names mean you have already viewed that file; gray dots mean unreviewed
- Use the "Viewed" checkbox on each file to track your progress through large PRs

</details>


##  Day 2 Teaser: The Full Accessibility Agents Review Ecosystem

You now have the manual skills. Chapter 16 shows you how to leverage 50+ specialized agents to make your reviews faster, more consistent, and more thorough - while staying in full control of what you post.

### The Agents That Help With Code Review

**Pull Request Review Agents:**

- **`@pr-review`** - Generates a full-draft PR review with line-numbered diff maps, risk assessment, before/after snapshots, and suggested inline comments. You edit and post it under your name.
- **`@pr-author-checklist`** - Before you even submit your PR, use this to verify you haven't missed setup steps, accessibility checks, or documentation
- **`@insiders-a11y-tracker`** - Monitors your PR for accessibility-sensitive changes: WCAG violations, heading hierarchy issues, link text quality, keyboard navigation impacts

**Code Understanding Agents:**

- **`@developer-hub`** - Orchestrates explanations for unfamiliar code, patterns, or frameworks you're reviewing
- **`@python-specialist`** - If your PR contains Python code, this agent explains patterns, spots accessibility issues, and suggests improvements
- **`@wxpython-specialist`** - For desktop GUI code, helps verify accessible widget patterns and focus management

**Accessibility Review Agents** (when code affects UI/UX):

- **`@keyboard-navigator`** - Reviews changes to keyboard handling, tab order, focus management
- **`@aria-specialist`** - Verifies ARIA attributes, roles, states in interactive components
- **`@contrast-master`** - Checks color changes for WCAG AA contrast compliance
- **`@alt-text-headings`** - Reviews changes to alt text, heading hierarchy, document structure

**Comment & Communication Agents:**

- **`@text-quality-reviewer`** - Verifies alt text, aria-labels, and button names are descriptive and typo-free
- **`@link-checker`** - Flags ambiguous link text like "click here" or "read more"

### How It Works

1. **Review manually first** (you just did this with Exercises A, B, C)
2. **Run an agent** - `@pr-review review PR #14` generates a draft in seconds
3. **Edit the agent's draft** - you add context, remove noise, correct errors
4. **Post your review** - it now has both AI efficiency and your human judgment
5. **The agent tracks impact** - `@insiders-a11y-tracker` monitors whether your accessibility feedback was addressed

### The Principle: Skill First, Agent Second

Why do this manually before using agents? Because:

- You **understand** what the agent is doing (you did it manually)
- You **evaluate** the agent's output critically (you know what right looks like)
- You **add judgment** the agent lacks (context, intent, team decisions)
- You **verify** the agent didn't miss anything important

**Manual reviews teach you what to look for. Agents help you look for it faster.**


### A Real Example: The Flow

**Manual Review (your work in part 1-2):**
- Read diff, identify heading hierarchy skip
- Write comment explaining why it matters
- Submit your verdict

**Agent-Assisted Review (what you'll do in Chapter 16):**
1. Run: `@pr-review review PR #14` 
2. Agent generates a draft review covering the heading skip, link text, and 5 other issues
3. You read the draft and notice: "the agent's explanation of the heading skip is good, but it missed that the link text on line 23 is still vague. Let me add that."
4. You post the agent's review + your additions
5. Next time you review a similar PR, the agent works faster because it learned from your feedback

**Accessibility Agents are trained on 55 different agent patterns - each built by people who manually reviewed code first, saw repetitive patterns, and automated them.** The agents you'll use in Chapter 16 exist because expert reviewers looked at 100+ PRs and said "this error comes up in nearly every PR - let me build an agent to catch it automatically."

Your manual skills + agent efficiency = **leverage.**


> **What's coming later today (Chapter 16):**
>
> At the end of the day, Chapter 16 introduces the full 55-agent ecosystem - specialized agents for:
> - GitHub workflow automation (`@daily-briefing`, `@issue-tracker`, `@analytics`)
> - Web accessibility auditing (`@web-accessibility-wizard`, `@contrast-master`, `@keyboard-navigator`)
> - Document scanning (`@word-accessibility`, `@pdf-accessibility`, `@markdown-a11y-assistant`)
> - Framework-specific accessibility (`@react-specialist`, `@vue-specialist`, `@wxpython-specialist`)
> - And 35+ more, organized into three teams across five platforms
>
> **The ecosystem is designed to grow.** Agents 56, 57, 58... will be built by contributors like you who saw a gap and filled it.

---

*Next: [Chapter 16: GitHub Copilot](16-github-copilot.md)*  
*Back: [Chapter 14: Git in Practice](14-git-in-practice.md)*  
*Related appendices: [Appendix G: VS Code Reference](appendix-g-vscode-reference.md)*

