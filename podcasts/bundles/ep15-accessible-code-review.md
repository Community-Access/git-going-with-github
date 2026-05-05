# Git Going with GitHub - Audio Series

## Episode 15: Accessible Code Review

**Series:** Git Going with GitHub
**Episode:** 15 of 44
**Audience:** Blind and low-vision developers learning GitHub and open source
**Estimated length:** 15-18 min


### Audio Production Direction

Generate a conversational two-host podcast episode about this topic.
The audience is blind and low-vision developers attending a two-day workshop on GitHub.

**Tone and style:**

- Welcoming and encouraging - many listeners are encountering these concepts for the first time
- Use spatial and structural descriptions, not visual references
- Say "navigate to" or "move to the section called" instead of "look for" or "you will see"
- Define technical terms on first use - do not assume familiarity with programming jargon
- Focus on deep conceptual understanding - explain WHY, not just HOW
- Share practical tips, common mistakes, and real-world context
- When describing keyboard shortcuts, say the full key names: "Control plus Shift plus P" not "Ctrl+Shift+P"
- Keep the conversation natural - two hosts discussing the topic, not reading a script
- Include at least one real-world analogy per major concept
- End with a brief summary of key takeaways and what comes next

**Episode focus:**

- Why code review matters for quality and learning
- Navigating diffs with a screen reader
- The two environments: web browser and VS Code
- Reading additions, deletions, and context lines
- Writing review comments that are helpful and specific
- Building a habit of reviewing others' work


### Concept Coverage Checklist

Every concept below MUST be explained during the episode. Do not skip any.
When a concept is complex, use an analogy or real-world comparison to make it concrete.

- [ ] **Why code review is important for code quality and learning**
- [ ] **The two environments for review: web browser and VS Code**
- [ ] **Reading a diff: what unified diff format looks like**
- [ ] **Addition lines (+ prefix), deletion lines (- prefix), context lines**
- [ ] **Navigating the Files Changed tab on a pull request**
- [ ] **Using keyboard shortcuts to move between files in a diff**
- [ ] **The Accessible Diff Viewer in VS Code (Command Palette)**
- [ ] **How the accessible diff viewer announces additions and deletions**
- [ ] **Writing inline review comments on specific lines**
- [ ] **Writing a helpful review comment: be specific, suggest alternatives**
- [ ] **Submitting a review with approve, request changes, or comment**
- [ ] **The gh CLI as a third path for reviewing from the terminal**
- [ ] **Building a habit of reviewing others work regularly**
- [ ] **What to look for in a review: correctness, clarity, style, accessibility**

### Prerequisites (briefly recap these)

Listeners may have heard these earlier episodes. Briefly remind them of:

- Episode 6: Pull requests and the review process
- Episode 11: VS Code accessibility features

### Cross-Referenced Material

The following supplementary content is included after the primary source.
Reference it naturally when a concept would benefit from additional context,
but keep the main narrative focused on the primary chapter.

- Screen Reader Cheat Sheet - diff navigation keys

### Primary Source Material

# Accessible Code Review
> **Listen to Episode 15:** [Accessible Code Review](../PODCASTS.md) - a conversational audio overview of this chapter. Listen before reading to preview the concepts, or after to reinforce what you learned.

## Conducting Pull Request Reviews with a Screen Reader

> This guide is focused entirely on the **reviewer experience** - navigating diffs, reading changes, leaving comments, and submitting a review - using only your keyboard and screen reader. For the full pull request lifecycle (opening PRs, merge options, conflict resolution), see [Working with Pull Requests](06-working-with-pull-requests.md).
>
> **Learning Room connection:** The exercises in this chapter use files from the Learning Room repository. You will review PRs that modify `docs/keyboard-shortcuts.md` (shortcut tables with intentional errors), `docs/setup-guide.md` (broken links and incomplete steps), and `docs/welcome.md` (`[TODO]` sections to complete). These are the same files you work on during the Day 1 contribution sprint.


## Prerequisites Checklist

**Before starting this chapter, verify you have completed:**

- [ ] Chapter 6: [Working with Pull Requests](06-working-with-pull-requests.md) - Understand PR structure, diffs, and comment workflows
- [ ] Chapter 13: [GitHub Copilot](13-github-copilot.md) - VS Code installed and configured
- [ ] Screen Reader Setup - NVDA, JAWS, or VoiceOver installed and ready to use
- [ ] Access to at least one pull request to review (your own fork or a practice repo)

**Estimated time for this chapter:** 1 hour (including exercises)


## Two Environments for Code Review

You can review pull requests in two places - each with different strengths:

| Environment | Best For | Key Accessibility Feature |
|-------------|----------|--------------------------|
| GitHub web (browser) | Quick reviews, inline comments on any machine | New Files Changed Experience + keyboard navigation |
| VS Code | Deep reviews, large diffs, local context | Accessible Diff Viewer (`F7`) |

Both environments give you full keyboard and screen reader access. Your choice depends on context, not accessibility.

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
<summary>Screen reader users (NVDA / JAWS)</summary>

```
Press D → navigate to "Pull request navigation tabs" landmark
Press → or Tab → find "Files changed" link → Enter
```

The tab label announces the number of changed files: *"Files changed, 4 files changed"*

</details>

<details>
<summary>Screen reader users (VoiceOver - macOS)</summary>

```
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

```
Press D → navigate to "File tree" region
Press ↓ to move through files
Each file reads: "[filename] - [N additions, N deletions]"
Press Enter on a file to scroll its diff into view
```

</details>

<details>
<summary>Screen reader users (VoiceOver - macOS)</summary>

```
VO+U → Landmarks → navigate to "File tree" region
VO+Down to move through files
Each file reads: "[filename] - [N additions, N deletions]"
VO+Space on a file to scroll its diff into view
```

</details>

**What to listen for / look for:**
- How many files changed?
- Which areas of the codebase are affected?
- Are there unexpected files (generated files, lock files, configuration changes)?


### Step 3: Navigate Between File Diffs

Each changed file in the main area is an `h3` heading containing the filename.

<details>
<summary>Visual / mouse users</summary>

Scroll through the page or click a filename in the file tree on the left. Collapsed files can be expanded by clicking the file header.

</details>

<details>
<summary>Screen reader users (NVDA / JAWS)</summary>

```
Press 3 to jump file-by-file through the diff
Listen for: "learning-room/docs/keyboard-shortcuts.md - collapsed" or "expanded"
Press Enter or Space to expand a collapsed file
```

If a diff is very long, the file tree is usually faster than pressing `3` repeatedly.

</details>

<details>
<summary>Screen reader users (VoiceOver - macOS)</summary>

```
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
<summary>Screen reader users - NVDA</summary>

```
Press T to jump to the diff table → Insert+Space (Focus Mode)
Press ↓ to move through lines one at a time
Press Ctrl+Alt+→ to read across columns: [line number] | [change type] | [code content]
```

</details>

<details>
<summary>Screen reader users - JAWS</summary>

```
Press T to jump to the diff table → Insert+Z (Virtual PC Cursor off)
Press ↓ to move through lines
Press Ctrl+Alt+→ for column-by-column reading
```

</details>

<details>
<summary>Screen reader users - VoiceOver (macOS)</summary>

```
Press T or VO+U → Tables → select the diff table
VO+Shift+↓ to enter the table
VO+→/← to navigate columns, VO+↑/↓ to navigate rows
```

</details>

**What each line announces / shows:**
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

```
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

```
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

**Placing a multi-line comment:**

<details>
<summary>Visual / mouse users</summary>

Click and drag across multiple line numbers in the diff gutter to select a range. A comment button appears for the selected range.

</details>

<details>
<summary>Screen reader users (NVDA / JAWS)</summary>

```
Step 1: Navigate to the first line of the range
Step 2: Press Shift+↓ to extend selection to additional lines
Step 3: A comment button appears for the selected range
Step 4: Proceed as above
```

</details>

<details>
<summary>Screen reader users (VoiceOver - macOS)</summary>

```
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
```
Step 1: Navigate to the thread heading (3)
Step 2: Tab to "Reply…" link
Step 3: Enter → text area appears → Focus Mode → type reply
Step 4: Ctrl+Enter to submit the reply
```

To mark a thread as resolved (if you have write access):
```
Tab to the "Resolve conversation" button → Enter
```

</details>

<details>
<summary>Screen reader users (VoiceOver - macOS)</summary>

Navigate with Quick Nav `H` or `VO+Cmd+H` (jump to headings in the diff).

To add to a thread:
```
Step 1: Quick Nav H to navigate to the thread heading
Step 2: Tab to "Reply…" link
Step 3: VO+Space → text area appears → VO+Shift+Down → type reply
Step 4: Cmd+Return to submit the reply
```

To mark a thread as resolved (if you have write access):
```
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

```
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

```
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

**Verdicts and their meaning:**

| Verdict | When to use |
|---------|-------------|
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

```
Step 1: From your PR's Conversation tab, find the reviewer's name in the sidebar (3 → "Reviewers" heading)
Step 2: Activate the refresh/re-request icon next to their name
Step 3: This re-notifies the reviewer that you've made changes
```

</details>

<details>
<summary>Screen reader users (VoiceOver - macOS)</summary>

```
Step 1: From your PR's Conversation tab, Quick Nav H or VO+Cmd+H to find the "Reviewers" heading in the sidebar
Step 2: Tab or Quick Nav B to find the re-request icon ("Re-request review") next to the reviewer's name
Step 3: VO+Space to activate - this re-notifies the reviewer that you've made changes
```

</details>


## Part 2 - Reviewing in VS Code with the Accessible Diff Viewer

When you check out a branch locally, VS Code's diff editor offers the **Accessible Diff Viewer** - a purpose-built, line-by-line reading mode designed specifically for screen readers.

### Opening a Diff in VS Code

If you have the GitHub Pull Requests extension:
1. Open the GitHub Pull Requests view (Explorer sidebar or Ctrl+Shift+P → "GitHub Pull Requests: View Pull Request")
2. Find the PR and open it - changed files appear in the file tree
3. Navigate to any file in the tree and press `Enter` to open its diff view

Without the extension, any `git diff` operation also opens the diff editor.

### Using the Accessible Diff Viewer (`F7`)

From any open diff editor:

```
Press F7 → Accessible Diff Viewer opens as a panel below the diff
```

The Accessible Diff Viewer reads each change as a structured block:

```
"Changed lines 14 to 14 in docs/keyboard-shortcuts.md
[Change 1 of 3]

Removed:
    #### NVDA Single-Key Navigation

Added:
    ### NVDA Single-Key Navigation"
```

This example is from a real Learning Room scenario: a contributor fixing the heading hierarchy in `docs/keyboard-shortcuts.md` by changing a level-4 heading to level-3, which is exactly what you look for when reviewing Challenge 2 PRs.

**Navigation:**
- `F7` - jump to next change (next hunk)
- `Shift+F7` - jump to previous change
- `Alt+F2` - open VS Code's Accessible View for additional context on the current item
- `Escape` - close the Accessible Diff Viewer

**What makes this better than the raw diff editor:**
- Each change is announced as a discrete unit with clear "Removed:" and "Added:" labels
- You hear the change number of total changes ("Change 3 of 12")
- No table navigation required - purpose-built for sequential listening
- Works with all three major screen readers without any special configuration

### Placing Comments in VS Code (GitHub PR Extension)

From the diff editor with the GitHub PR extension:
```
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

**Blocking example (reviewing a PR for `docs/keyboard-shortcuts.md`):**
> "The heading on line 34 uses `####` (level 4) directly after `##` (level 2), skipping heading level 3. Screen reader users who navigate by heading level will miss any content between those two levels. Please change `####` to `###` before this merges."

**Non-blocking (nit) example (reviewing a PR for `docs/welcome.md`):**
> "nit: The link text in the 'Getting Help' section reads 'click here for more information.' Screen reader users who navigate links out of context will hear only 'click here' with no destination. Consider 'See the accessibility setup guide' instead. Not blocking."

**Question example (reviewing a PR for `docs/setup-guide.md`):**
> "The PR description says this fixes broken links in the setup guide, but the link on line 12 still points to `/docs/old-setup`. Am I reading the diff correctly, or was this link intentionally left? Happy to re-review once I understand."

### Prefixes That Set Expectations

Using shorthand prefixes helps authors parse many comments quickly:

| Prefix | Meaning |
|--------|---------|
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
|--------|-----|
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
|--------|-----|
| Open Accessible Diff Viewer | `F7` |
| Next change (hunk) | `F7` |
| Previous change (hunk) | `Shift+F7` |
| Open Accessible View | `Alt+F2` |
| Accessible Help (any widget) | `Alt+H` |
| Close Accessible Diff Viewer | `Escape` |


## Common Review Scenarios

### "I want to verify the PR only changes what it claims"

**Example:** A PR says "Challenge 2: Add NVDA shortcut" but the file tree shows changes to both `docs/keyboard-shortcuts.md` and `docs/welcome.md`.

```
1. File tree → count the files, read the names
2. 3 → navigate each file heading → listen to the stats line (N additions, N deletions)
3. For keyboard-shortcuts.md: T → Focus Mode → ↓ through lines → verify the new shortcut row
4. For welcome.md: check if the change is related → if unrelated, leave a comment on the first line
```

### "I want to find all changes to one specific section"

**Example:** A PR for Challenge 3 modified `docs/welcome.md`. You want to verify the `[TODO]` in the "Who Can Contribute?" section was filled in correctly.

```
1. In VS Code: open docs/welcome.md → Ctrl+G → jump to the "Who Can Contribute?" section
2. F7 → Accessible Diff Viewer → listen for changes near that heading
3. Or on GitHub: file tree → expand welcome.md → T → navigate the diff table to the [TODO] line
```

### "I agreed but then the author made more changes - did anything new appear?"

```
1. Go to the Commits tab (D → PR tabs → "Commits" → Enter)
2. 3 to navigate commits - find any commits after your last review
3. Press `Enter` on the commit to see only what changed in that push (not the full diff)
```

### "A reviewer left a comment I don't understand"

```
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

**What to do:**
1. Open GitHub in your browser and navigate to the workshop repository (`github.com/[your-fork]/[workshop-repo]` or `community-access/accessibility-agents`)
2. Click the **Pull Requests** tab (top navigation)
3. Look for a PR titled "Add screen reader tips to the setup guide" - click it to open
4. You should now see the PR page with sections: Conversation, Commits, Files Changed

**How to know you're in the right place:**
- The PR title is visible at the top
- You see a description box with text about what this PR does
- You see tabs labeled "Conversation," "Commits," "Files Changed"

**If you can't find the PR:**
- Use `Ctrl+F` to search the PR list for "screen reader tips"
- Or ask in the workshop Slack - someone can share the exact URL


#### Step 2: Read the PR Description

**What to do:**
1. You are currently on the **Conversation** tab
2. Read the PR description (the text immediately under the PR title)
3. Look for: "What does this PR change?" and "Why does it change it?"
4. **With screen reader:** Navigate to the description with `D` (NVDA) or press `Ctrl+Option+Up` (VoiceOver) to find main landmarks, then read the content region

**What to look for:**
- Does the PR author explain what file changed? (should mention `setup-guide.md`)
- Does it explain why? (should mention "improve accessibility" or "add tips")
- Is it clear enough that a reviewer can understand the goal without reading the diff?

**What success looks like:**
- You can answer: "This PR adds [specific content] to [specific file] because [clear reason]"
- Example: "This PR adds screen reader usage tips to the setup guide because new users need accessibility guidance"


#### Step 3: Navigate to "Files Changed"

**What to do:**
1. Click the **Files Changed** tab (top of the PR page, to the right of "Commits")
2. You are now viewing the diff
3. **With keyboard (all screen readers):** Press `T` to jump to the diff table. The page focuses on the file comparison area.

**What you should see:**
- A section showing the file name `setup-guide.md` with a small badge showing "+20 −0" (20 lines added, 0 lines removed)
- Below it, the diff with removed lines (preceded by `−`) and added lines (preceded by `+`)

**If you see multiple files:**
- Scroll up to see if there are other files. For this exercise, only `setup-guide.md` should be changed.
- If you see other files, confirm they are not modified (the badge should show "+0 −0" or no changes)


#### Step 4: Activate Focus Mode for Better Diff Reading

**What to do:**
1. Look for a button labeled "Focus Mode" or an icon (usually at the top right of the diff area)
2. **With keyboard:** Press `F` to toggle Focus Mode (may need to be in the diff area first)
3. **With mouse:** Click the Focus Mode button/icon

**What happens in Focus Mode:**
- The page simplifies: sidebars disappear
- Only the diff is visible - easier for screen reader navigation and less cognitive load
- The diff is now the main content area

**With screen reader (once in Focus Mode):**
- NVDA/JAWS: Press `T` to jump to the diff table
- VoiceOver: Navigate with `VO+Right Arrow` to find the table/content region
- Read through the changes: `↓` arrow moves to each line


#### Step 5: Find the Heading Hierarchy Issue

**What to do:**
1. **Read through the entire diff** line by line. Pay special attention to lines starting with `#`
2. You are looking for: a line with `####` (four hashes, heading level 4) that comes *directly after* a `##` (two hashes, heading level 2)
3. When you find it, **note the exact line number** shown in the diff

**Example of what you're looking for:**
```
  ## Setup Basics          ← Heading level 2
  ...several lines...
  #### Advanced Tips       ← Heading level 4 (skipped level 3!)
```

**Why this matters:**
- Screen reader users navigate documents by heading level: `1` → `2` → `3` → `4`
- A skip from `##` to `####` breaks that navigation
- When a user presses "jump to heading level 3," they'll find none, wondering if content is missing

**What success looks like:**
- You found the line with `####` that violates hierarchy
- You can say the line number and what heading text appears there
- You understand *why* this is an accessibility problem


#### Step 6: Place a Blocking Review Comment on the Heading

**What to do:**
1. Find the diff line with the problematic `####` heading
2. **Hover your mouse over the line number** on the left side of that line (or if using keyboard, navigate to that line in the table)
3. A button should appear (or press the Add Comment hotkey - usually `C` in GitHub)
4. Click it or press `Enter` to open a comment box

**In the comment box:**
1. Type: `blocking:` (tells reviewers this stops the PR from merging)
2. Press Space, then explain:
   ```
   Heading hierarchy violation. This heading uses #### (level 4) directly 
   after ## (level 2), skipping level 3. Screen reader users navigating 
   by heading level will miss this section. Change to ### (level 3).
   ```
3. Click the **Comment** button (or press `Ctrl+Enter` for keyboard submit)

**What happens next:**
- Your comment appears in the thread under that line
- The PR author sees it and can make the fix

**If the comment button doesn't appear:**
- Make sure you're hovering over the *line number* area (left side of the line)
- Try refreshing the page and trying again
- Or use the "Add a reply" field at the bottom of the PR and mention the line number manually


#### Step 7: Find the Link Text Issue

**What to do:**
1. **Continue reading the diff** (from where you left off)
2. Look for a line containing link text that reads `"click here"` or `"click here for more information"`
3. **Note the line number**

**Why this matters:**
- Screen reader users can ask their reader to "list all links on this page" - they hear only the link text
- If the text is "click here," they have no context about where it goes
- Descriptive link text is WCAG 2.4.4 (Link Purpose)

**What success looks like:**
- You found a link with non-descriptive text
- You can explain why "click here" is bad and what would be better


#### Step 8: Place a Comment on the Link

**What to do:**
1. Find the line in the diff with the problematic link
2. Hover over the line number and click to open a comment box (or press `C`)
3. Type:
   ```
   nit: Link text "click here" is not descriptive. Screen reader users 
   who list links won't know the context. Suggest: "Read the accessibility 
   checklist" or another descriptive phrase.
   ```
4. Click **Comment** or press `Ctrl+Enter`

**Note:** `nit:` means "nice-to-have improvement" (not blocking, but good to fix)


#### Step 9: Submit Your Review

**What to do:**
1. Look for a button labeled **"Review changes"** (usually at the top right of the page or bottom of comments)
2. Click it (or navigate with keyboard and press `Enter`)
3. A dialog appears with options:
   - **Comment** - provide feedback but don't block (for minor notes)
   - **Approve** - the PR is ready to merge
   - **Request changes** - this PR cannot merge until changes are made

**For this exercise:**
1. Select **"Request changes"** (you found two things to fix)
2. In the summary field, write: `Found 2 accessibility issues that must be fixed before merging.`
3. Click **"Submit review"**

**What happens:**
- Your review is submitted
- The PR author gets a notification
- The PR shows your review with the two comments
- GitHub blocks merging until the author responds to or fixes the changes

**What success looks like:**
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
- The GitHub Pull Requests extension must be installed (see [Chapter 12](12-github-pull-requests-extension.md) for installation)
- You must be signed into GitHub from VS Code (use `Ctrl+Shift+P` → "GitHub: Sign in")


#### Step 1: Open the GitHub Pull Requests Extension

**What to do:**
1. Open VS Code
2. **With keyboard (all screen readers):** Press `Ctrl+Shift+X` to open the Extensions sidebar
   - **With mouse:** Click the Extensions icon on the left sidebar (looks like four squares)
3. Search for "GitHub Pull Requests"
4. If it's not installed, click **Install**
5. If it is installed, click **GitHub Pull Requests** to view its details

**What you should see:**
- The extension is listed as active
- It mentions: "Review and manage GitHub pull requests and issues"


#### Step 2: Open the Pull Requests Sidebar

**What to do:**
1. Look for a **GitHub-themed icon** on the left sidebar (circle with octocat logo) - click it
   - **With keyboard:** The icon may not be keyboard-reachable directly; instead go to Step 3
2. A sidebar appears showing open pull requests on repositories you have access to
3. **Find the PR titled "Add screen reader tips to the setup guide"** - it should appear in a list
4. Click it to open

**What happens:**
- VS Code opens a new editor tab for this PR
- Below the PR title, you see a "Changes" section listing modified files
- You should see `setup-guide.md` in the changes list

**If you can't find the PR:**
- Use `Ctrl+Shift+P` → search `GitHub Pull Requests: Open Pull Request`
- Paste the PR URL: `https://github.com/[owner]/[repo]/pull/[number]`
- Press Enter


#### Step 3: View the File Changes

**What to do:**
1. In the **Changes** section, locate `setup-guide.md`
2. Click on the filename to open it

**What happens:**
- A diff editor opens showing two columns:
  - **Left:** the original file (before changes)
  - **Right:** the new file (after changes)
- Different colors show added (green), removed (red), and modified (blue) lines
- The file name appears at the top: `setup-guide.md`

**With screen reader:**
- NVDA/JAWS: The editor announces "Diff Editor - setup-guide.md"
- Use `Ctrl+Home` to jump to the start of the diff
- Use `Ctrl+End` to jump to the end


#### Step 4: Access the Accessible Diff Viewer

**What to do:**
1. **With keyboard:** Press `F7` to open the Accessible Diff Viewer
   - **With mouse:** Look for a button or menu option labeled "Accessible View" or "Open Accessible Diff"
   - If no button is visible, try `Alt+F2` (VS Code Accessible View toggle)

**What happens:**
- A new panel opens at the bottom of VS Code
- The panel announces each change one at a time
- Changes appear in text format with labels: "Added: " and "Removed: "
- The panel is read-only (you read the changes, you don't edit here)

**If the Accessible Diff Viewer doesn't open:**
- Make sure the diff editor is active (click in the diff area first)
- Try `Ctrl+Shift+P` → search `Open Accessible Diff`
- If available, select it


#### Step 5: Listen to and Understand the First Change

**What to do:**
1. The first change is automatically announced when you open the Accessible Diff Viewer
2. **Let your screen reader read it completely** - don't interrupt
3. Write down the exact text announced:
   ```
   Removed: [write what the viewer said]
   Added: [write what the viewer said]
   ```
4. Press the **Down arrow** to move to the next change

**What to expect (example):**
```
Removed: ## Old Heading
Added: ## New Heading with More Details
```

**With screen reader:**
- NVDA/JAWS: The Accessible Diff Viewer announces "Removed:" and "Added:" labels, followed by the line content
- VoiceOver: The announcement may be similar; listen for "removed" and "added" keywords


#### Step 6: Find the Heading Hierarchy Issue

**What to do:**
1. Continue pressing **Down arrow** to move through changes
2. Listen carefully for a change involving headings (lines starting with `#`)
3. Specifically, listen for: "Added: ####" (four hashes)
4. When you hear this, **stop and write it down:**
   ```
   Line number: [if available]
   Removed: [what was removed, if anything]
   Added: [the four-hash heading]
   Context: [is there a ## heading just before this?]
   ```

**Why listen for this?**
- Four hashes (`####`) indicate a level 4 heading
- In the diff, you're looking for it appearing after a level 2 heading (`##`)
- This creates the hierarchy skip you caught in Exercise A

**What success looks like:**
- You found the explanation in the Accessible Diff Viewer's format
- You can explain: "The added line with `####` directly follows a `##`, skipping level 3"
- The Accessible Diff Viewer made this *pattern* clearer than scanning raw `+` characters


#### Step 7: Locate the Heading Line and Add an Inline Comment

**What to do:**
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

**What happens:**
- A comment box opens
- You can type your comment


#### Step 8: Write Your Accessible Diff Comment

**What to do:**
1. In the comment box, type:
   ```
   blocking: Heading hierarchy violation. The Accessible Diff Viewer 
   clearly showed this #### heading appearing directly after ##, skipping 
   level 3. Screen reader users navigating by heading level will miss this 
   content. Change to ###.
   ```
2. Press `Ctrl+Enter` or click **Comment** to submit

**Why mention the Accessible Diff Viewer?**
- It shows that the tool *itself* helps you see the issue
- It documents how you caught the problem (useful for learning)


#### Step 9: Create a GitHub Pull Request Comment

**Special Section: Comparing Tools**

Now you've reviewed the same PR in:
1. **Browser (Exercise A):** You spot-checked line numbers manually
2. **VS Code (Exercise B):** The Diff Editor plus Accessible Diff Viewer announced changes

**What to do:**
1. Go to GitHub in your browser and open the same PR
2. Scroll to the bottom and leave a comment in the Conversation tab:

```
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

3. Click **Comment**


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

**From Exercise A (Browser Review):**
- Which line number had the heading hierarchy skip?
- Which line number had the link text issue?
- How many steps did it take to find each issue?
- Did you use screen reader commands or visual scanning more?

**From Exercise B (VS Code Review):**
- What did the Accessible Diff Viewer announce for the heading change?
- Was the announcement clearer than the browser's `+` and `−` format?
- Did you need to switch between the Accessible Diff Viewer and the regular editor?
- How many steps to find the problem?

**Write these down** (in a text editor, on paper, or mentally) - you'll reference them in Steps 2-4.


#### Step 2: Navigate to the PR and Leave Your Reflection Comment

**What to do:**
1. Go to GitHub in your browser
2. Open the same PR ("Add screen reader tips to the setup guide")
3. Scroll to the **Conversation** tab
4. Scroll all the way down to the comment box at the bottom (labeled "Leave a comment" or "Add a comment")
5. Click in the comment box

**What you should see:**
- A text editing area with formatting options (Bold, Italic, Link, etc.)
- A **Comment** button below the text area


#### Step 3: Write Your Comparison

**What to do:**
Type your response to these three questions. Be specific - reference exact tools, steps, and what you discovered:

**Question 1: Environment Preference**
```
After reviewing this PR in both environments, my preferred tool was:
[Browser / VS Code / Both equally]

Why: [1-2 sentences explaining your choice]

Example: "I preferred VS Code because the Accessible Diff Viewer 
separated changes into 'Added:' and 'Removed:', making it obvious 
what the new content was. In the browser, I had to mentally filter 
the + and − characters."
```

**Question 2: Strengths of Each Environment**
```
Browser made this easier: [One specific task, e.g., "Finding the PR URL"] 
because [Why]

VS Code made this easier: [One specific task, e.g., "Following the diff linearly"] 
because [Why]

Example Browser: "Finding context about *why* the change was made, 
because all the discussion is in one place"

Example VS Code: "The Accessible Diff Viewer announcing changes sequentially 
meant I didn't miss anything by accidentally scrolling past it"
```

**Question 3: Real-World Impact**
```
For someone reading the published document (not the diff), the heading 
skip matters because: [1-2 sentences]

Example: "A screen reader user pressing the '3' key to navigate to level-3 
headings will find none, and might think the document skipped a section. 
This breaks the information hierarchy."
```

**Full template to copy into the comment box:**

```
## Code Review Reflection - Browser vs VS Code

After reviewing this PR using both the browser and VS Code environments, 
here's what I found:

### Environment Preference

My preferred tool was: **[Browser / VS Code]**

Why: [1-2 sentences]

### Specific Strengths

**Browser made this easier:**
- Task: [specific thing]
- Why: [explanation]

**VS Code made this easier:**
- Task: [specific thing]
- Why: [explanation]

### Real-World Impact

The heading hierarchy skip in the published document matters because: 
[1-2 sentences about why screen reader users would be affected]
```


#### Step 4: Review Your Comment

**What to do:**
1. Before submitting, **re-read your comment** using your screen reader or by reading aloud
2. Ask yourself:
   - Is it clear which tool I preferred?
   - Did I explain *why* with concrete examples?
   - Am I describing the real-world impact accurately?
   - Would someone else reading this understand how I caught the issue?
3. Make any corrections needed
4. **Do not submit yet** - continue to Step 5


#### Step 5: Submit Your Reflection

**What to do:**
1. Locate the **Comment** button at the bottom right of the comment box
2. **With keyboard:** Press `Tab` until the Comment button is focused, then `Enter`
3. **With mouse:** Click the **Comment** button
4. Your comment is submitted and appears on the PR page

**What happens:**
- Your comment is now visible on the PR
- Other reviewers can see your comparison
- You have completed the three-part exercise series

**What success looks like:**
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


### What Comes Next

Your manual code review skills - identifying heading issues, catching link text problems, understanding screen reader navigation - are the **foundation** for understanding automated review.

In **Chapter 16 (Accessibility Agents)**, you'll use the `@pr-review` agent to generate a *draft* review of this same PR. The agent will:
- Suggest changes automatically
- Identify accessibility issues
- Create a review checklist

**But** - and this is critical - the agent's suggestions will only make sense *because you already know what to look for*. You'll be able to:
- Verify the agent didn't miss anything
- Add context the agent can't see
- Decide whether the agent's suggestions are correct

That's the power of "manual skill first, agent second." You're building that skill right now.


> ### Day 2 Amplifier - Accessibility Agents: `@pr-review`
>
> **Review at least two pull requests manually - using the techniques in this guide - before running `@pr-review`.** The agent generates a first-draft review: a line-numbered diff map, risk assessment, before/after snapshots, and suggested inline comments. Your job as reviewer is to read that draft, correct it, enrich it with context the diff cannot contain, and decide what is actually worth saying to the author.
>
> Once you have that manual foundation:
> - **In VS Code** - `@pr-review review PR #N` produces a structured, annotated review draft
> - **In your repo** - Accessibility Agents' review capabilities work in any repository you can access; fork `accessibility-agents` and those capabilities travel with your project
> - **In the cloud** - GitHub Agentic Workflows can auto-post PR summaries and accessibility impact assessments the moment a PR is opened, without anyone being online
>
> *The Accessible Diff Viewer teaches you to hear changes. The agent drafts the notes. You bring the judgment.*


*Next: [Issue Templates](15-issue-templates.md)*
*Back: [GitHub Copilot](13-github-copilot.md)*
*Related: [Screen Reader Cheat Sheet](appendix-b-screen-reader-cheatsheet.md) | [Merge Conflicts](07-merge-conflicts.md) | [Git & Source Control in VS Code](11-git-source-control.md)*



### Supplementary: Screen Reader Cheat Sheet - diff navigation keys

# Appendix B: Screen Reader Cheat Sheet
> **Listen to Episode 19:** [Screen Reader Cheat Sheet](../PODCASTS.md) - a conversational audio overview of this chapter. Listen before reading to preview the concepts, or after to reinforce what you learned.

## GitHub Navigation with NVDA, JAWS, and VoiceOver

> **How to use this sheet:** Keep it open in a second window or print it. Commands are organized by task so you can find what you need quickly while you work. All commands are keyboard-only - no mouse required.


## Screen Reader Mode Basics

Before navigating GitHub, understand the two fundamental modes that all screen readers use on the web:

### Browse Mode (also called Virtual Cursor / Reading Mode)

This is your primary mode for **reading and navigating** pages. The screen reader intercepts keystrokes and uses them as navigation commands - for example, pressing `H` jumps to the next heading rather than typing the letter H.

| Screen Reader | How to know you're in Browse Mode |
|---------------|----------------------------------|
| **NVDA** | Lower-pitched sound when switching; NVDA says "browse mode" |
| **JAWS** | JAWS says "virtual cursor on" |
| **VoiceOver** | No mode switching needed - VoiceOver uses the VO modifier keys |

### Focus Mode (also called Forms or Application Mode)

This mode is for **typing and interacting** with form fields, text areas, buttons, and interactive widgets. Your keystrokes go directly to the web page instead of being captured by the screen reader.

| Screen Reader | Toggle Focus/Browse Mode | When to use |
|---------------|--------------------------|-------------|
| **NVDA** | `NVDA+Space` (Insert+Space or CapsLock+Space) | Type in comment boxes, issue titles, PR descriptions |
| **JAWS** | `JAWS+Z` (Insert+Z) or automatic | Same |
| **VoiceOver** | `VO+Shift+Down` to interact with an element | Same |

> **Rule of thumb:** Browse mode to navigate, Focus mode to type.


## Quick Navigation Keys (Browse Mode)

These single-key shortcuts work in Browse Mode (NVDA and JAWS). VoiceOver users with Quick Nav enabled use the same keys.

### Heading Navigation - Your Most-Used Tool

GitHub structures pages with headings. Jumping between headings is the fastest way to navigate.

| Key | Action | VoiceOver |
|-----|--------|-----------|
| `H` | Next heading (any level) | `H` (Quick Nav on) |
| `Shift+H` | Previous heading | `Shift+H` |
| `1` | Next h1 (page title) | `1` |
| `2` | Next h2 (section heading) | `2` |
| `3` | Next h3 (issue/PR titles are h3) | `3` |
| `4` | Next h4 (commit titles in PRs) | `4` |

### Landmark Navigation - Jump Between Page Regions

Landmarks are named regions of a page (navigation, main content, sidebar, etc.). GitHub uses landmarks heavily.

| Key | Action | VoiceOver |
|-----|--------|-----------|
| `D` | Next landmark / region | `VO+U` → Landmarks rotor |
| `Shift+D` | Previous landmark | Same, navigate backwards |

**GitHub landmarks you will encounter:**

| Landmark Label | What It Contains |
|----------------|-----------------|
| Navigation Menu | Your avatar menu and global nav |
| Repository navigation | Code, Issues, PRs, Actions tabs |
| Main | The primary page content |
| Repository files navigation | README display |
| Pull requests list | The list of PRs |
| Search Results List | Issues or PR list results |
| Add a comment | Comment submission form |
| Pagination | Next/Previous page buttons |

### Link, Button, and Form Navigation

| Key | Action | JAWS Equivalent | VoiceOver |
|-----|--------|-----------------|-----------|
| `K` | Next link | `Tab` or `U` | `VO+U` → Links rotor |
| `Shift+K` | Previous link | `Shift+U` | - |
| `B` | Next button | `B` | `VO+U` → Buttons rotor |
| `Shift+B` | Previous button | `Shift+B` | - |
| `F` or `E` | Next edit/form field | `F` | `VO+U` → Form Controls |
| `Tab` | Next interactive element (any type) | `Tab` | `Tab` |
| `Shift+Tab` | Previous interactive element | `Shift+Tab` | `Shift+Tab` |
| `Enter` / `Space` | Activate link or button | Same | `VO+Space` |

### List and Table Navigation

| Key | Action | Notes |
|-----|--------|-------|
| `L` | Next list | Useful for spotting issue/PR lists |
| `I` | Next list item | Navigate within a list |
| `T` | Next table | **Use this for the files table in a repo** |
| `Ctrl+Alt+→` | Move right in a table cell | Navigate table columns |
| `Ctrl+Alt+←` | Move left in a table cell | |
| `Ctrl+Alt+↓` | Move down in a table (next row) | Navigate file list rows |
| `Ctrl+Alt+↑` | Move up in a table | |


## The Elements List - Your Navigation Superpower

This is one of the most powerful tools for navigating complex pages. It opens a dialog listing all headings, links, buttons, form fields, or landmarks on the page.

| Screen Reader | Open Elements List | What It Shows |
|---------------|-------------------|---------------|
| **NVDA** | `NVDA+F7` (Insert+F7 or CapsLock+F7) | Headings, Links, Form fields, Buttons, Landmarks (tabs within the dialog) |
| **JAWS** | `Insert+F6` (headings) / `Insert+F7` (links) | Headings list / Links list |
| **VoiceOver** | `VO+U` | Rotor - switch between Headings, Links, Landmarks, Form Controls |

**How to use it:**
1. Press the keyboard shortcut above
2. Navigate between the tabs (Headings, Links, etc.) with `Tab` or arrow keys
3. Type to filter the list (e.g., type "new issue" to find the New Issue button)
4. Press `Enter` to jump to the item on the page


## Per-Screen-Reader Command Reference

A compact reference organized by screen reader. For task-based navigation guides (navigating a PR, leaving a comment, etc.), see the sections below.

### NVDA (Windows)

**Single-key navigation (Browse Mode)**

| Key | Moves to |
|-----|----------|
| `H` / `Shift+H` | Next / previous heading |
| `1`-`6` | Next heading of that level |
| `K` | Next link |
| `B` | Next button |
| `F` or `E` | Next form field |
| `T` | Next table |
| `D` | Next landmark region |
| `L` | Next list |
| `I` | Next list item |

**Mode switching and reading**

| Key | Action |
|-----|--------|
| `Insert+Space` | Toggle Browse / Focus Mode |
| `Insert+F7` | Elements list (headings, links, form fields, buttons) |
| `NVDA+↓` | Start reading from cursor (Say All) |
| `NVDA+↑` | Read current line |
| `Ctrl` | Stop reading |

### JAWS (Windows)

**Single-key navigation (Virtual Cursor)**

| Key | Moves to |
|-----|----------|
| `H` / `Shift+H` | Next / previous heading |
| `1`-`6` | Next heading of that level |
| `U` | Next unvisited link |
| `K` | Next link |
| `B` | Next button |
| `F` | Next form field |
| `T` | Next table |
| `R` | Next landmark region |
| `L` | Next list |
| `I` | Next list item |

**Mode switching and reading**

| Key | Action |
|-----|--------|
| `Insert+Z` | Toggle Virtual PC Cursor (Browse / Focus) |
| `Num Pad Plus` | Exit forms mode (open PC Cursor) |
| `Insert+F6` | Headings list |
| `Insert+F7` | Links list |
| `Insert+↓` | Start reading from cursor (Say All) |
| `Insert+↑` | Read current line |
| `Ctrl` | Stop reading |

### VoiceOver (macOS)

Activate VoiceOver: `Cmd+F5`. The VO modifier key is `Control+Option` (abbreviated `VO`).

**Rotor navigation:** Open with `VO+U`, use `←/→` to switch between element types (Headings, Links, Form Controls, Tables, Landmarks), and `↑/↓` to navigate within a type.

| Command | Action |
|---------|--------|
| `VO+U` | Open Rotor |
| `VO+Right` / `VO+Left` | Move forward / backward |
| `VO+Space` | Activate current element |
| `VO+Shift+Down` | Interact with element (enter Focus Mode) |
| `VO+Shift+Up` | Stop interacting |
| `VO+A` | Start reading from cursor |
| `Ctrl` | Stop reading |
| `Cmd+F5` | Start / stop VoiceOver |


## Navigating Specific GitHub Pages

### Repository Main Page

| Goal | Key Sequence |
|------|-------------|
| Find the repo name and description | `1` - jumps to the h1 heading (the repo name) |
| Jump to repo navigation tabs | `D` to "Repository navigation" landmark |
| Open the files table | `T` (next table) |
| Navigate files | `Ctrl+Alt+Down Arrow` for next row, `Ctrl+Alt+Right Arrow` for next column |
| Open a file | `Enter` on the filename |
| Find the Clone or Download button | `B` (next button after the h1) |
| Switch branches | `B` to find the branch button, then `Enter` |
| Search for a file | `F` to reach the "go to file" field, then type filename |

### Issues List Page

| Goal | Key Sequence |
|------|-------------|
| Find the issue list | `1` then `L` (next list) or `D` to "Search Results List" landmark |
| Navigate issue titles | `3` (issue titles are h3 headings) |
| Navigate list items | `I` (next list item within the search results list) |
| Open an issue | `Enter` on the issue title link |
| Open in a new tab | `Ctrl+Enter` |
| Search or filter issues | `F` to the edit field, type search query, then `Enter` |
| Create a new issue | `Tab` from search field until "New issue" link |
| Filter by label | `Tab` to the filter toolbar buttons, `Enter`, then arrow keys in the dropdown |

### Issue Detail Page

| Goal | Key Sequence |
|------|-------------|
| Read the issue description | `2` to "Description" heading |
| Read activity and comments | `2` to "Activity" heading, then `Down Arrow` to read |
| Jump to the comment box | `D` to "Add a comment", then `E` to the edit field |
| Type a comment | Switch to Focus mode (`NVDA+Space`), then type |
| Submit the comment | `Tab` to the "Comment" button then `Enter` - or `Ctrl+Enter` from the text area |
| Close the issue | `Tab` to the "Close" button, then `Enter` |
| Navigate assignees and labels sidebar | `3` (sidebar items are h3 headings) |

### Pull Requests List Page

| Goal | Key Sequence |
|------|-------------|
| Find the PR list | `D` to "Pull requests list" landmark |
| Navigate PR titles | `Tab` (no per-item heading semantics - tab through) |
| Open a PR | `Enter` on the PR title |
| Create a new pull request | `K` to the "New pull request" link |
| Filter PRs | `F` to the search field, then `Enter` |

### Pull Request Detail - Conversation Tab

| Goal | Key Sequence |
|------|-------------|
| Read PR description | `2` to the first h2 heading |
| Navigate comment threads | `3` (comments are h3 headings) |
| Open pull request tabs | `D` to "Pull request tabs", then `K` to navigate links |
| Add a comment | `D` to "Add a comment", then `E`, then Focus mode, then type |
| Submit review | `B` to the "Submit review" button |

### Pull Request Detail - Commits Tab

| Goal | Key Sequence |
|------|-------------|
| Switch to Commits tab | `D` to "Pull request navigation tabs", then `Tab` between tab controls, then `Left` or `Right Arrow` |
| Navigate commits by date | `3` (date headings are h3) |
| Navigate individual commits | `4` (commit names are h4) or `I` (list items) |
| Open a commit | `Enter` on the commit heading or link |

### Pull Request Detail - Files Changed Tab

| Goal | Key Sequence |
|------|-------------|
| Navigate to Files Changed | `D` to "Pull request navigation tabs", then `Left` or `Right Arrow` to "Files changed", then `Enter` |
| Navigate file headings | `H` or `3` |
| Find a specific file | `E` to "Filter changed files" field, then type filename |
| Navigate file tree | `2` to "file tree", then `Up Arrow` or `Down Arrow` |
| Navigate diff lines | `NVDA+Space` for Focus mode, then arrow keys in the diff table |
| Read across a diff row | `Ctrl+Alt+Right Arrow` (columns: line number, change type, content) |
| Comment on a line | Focus the line, then `Enter` (activates comment mode) |
| Multi-line comment | Focus start line, then `Shift+Down Arrow` to extend, then `Enter` |
| Submit review | `1` then `B` to "Submit review" button |

### Checking and Enabling Feature Previews

GitHub Feature Previews are opt-in UI improvements. For screen reader users, two are especially important: **New Issues Experience** and **New Files Changed Experience**. Both may already be active - or may have graduated out of Feature Preview entirely.

**NVDA / JAWS (Browse Mode):**

| Goal | Key Sequence |
|------|--------------|
| Open User Menu | `B` repeatedly until "Open user navigation menu, button" → `Enter` |
| Open Feature Preview panel | `↓` or `K` to "Feature preview" → `Enter` |
| Navigate the feature list | `↓` or `I` (list items) |
| Check if a feature is enabled | Toggle announces **"Pressed"** or **"Disable"** = enabled; **"not Pressed"** or **"Enable"** = disabled |
| Enable a feature | `Enter` or `Space` on the toggle when it is not Pressed |
| Feature not listed | Feature has graduated - active automatically, no action needed |

**VoiceOver (macOS):**

| Goal | Key Sequence |
|------|--------------|
| Open User Menu | `VO+U` → Buttons → "Open user navigation menu" → `Enter` |
| Open Feature Preview panel | `VO+Down Arrow` to "Feature preview" → `VO+Space` |
| Check if a feature is enabled | Toggle announces **"checked"** = enabled; **"unchecked"** = disabled |
| Enable a feature | `VO+Space` on an unchecked toggle |

> See [Pre-Workshop Setup, Step 4](00-pre-workshop-setup.md#step-4-check-github-feature-preview-settings) for full details on what each feature enables and why it matters for screen reader users.


## Typing and Submitting Content

### Entering text in GitHub (Focus Mode required)

1. Navigate to the text field using Browse Mode: `F` or `E` for edit fields, `Tab` for any interactive element
2. **Switch to Focus Mode**:
   - NVDA: `Insert+Space`
   - JAWS: `Insert+Z` (or it switches automatically)
   - VoiceOver: `VO+Shift+Down` to interact with the text area
3. Type your content
4. **Return to Browse Mode** when done typing:
   - NVDA: `Insert+Space`
   - JAWS: `Insert+Z`
   - VoiceOver: `VO+Shift+Up` to stop interacting

### Markdown formatting shortcuts in GitHub text areas

These work while in Focus Mode inside a GitHub text area:

| Shortcut | Effect |
|----------|--------|
| `Ctrl+B` | **Bold** |
| `Ctrl+I` | *Italic* |
| `Ctrl+E` | `Inline code` |
| `Ctrl+K` | [Insert link] |
| `Ctrl+Shift+.` | > Blockquote |
| `Ctrl+Shift+L` | Unordered list |
| `Ctrl+Shift+7` | Ordered list |


## Dropdown Menus and Flyouts

GitHub uses popup flyout menus for labels, assignees, reviewers, and branch selection. Here is how to handle them:

```
Step 1: Navigate to the button (D for landmark, B for button, or Tab)
Step 2: Activate the button (Enter or Space) - flyout opens
Step 3: Type to filter results OR use ↑/↓ arrow keys to navigate
Step 4: Select an item (Enter)
Step 5: Close the flyout (Esc) - selections apply on close
```

**VoiceOver users:**
```
Step 1: Navigate to the button with Tab or VO+Right
Step 2: Activate with VO+Space
Step 3: VO+Down to enter the flyout
Step 4: VO+Right/Left to navigate items
Step 5: VO+Space to select, Esc to close
```


## GitHub Built-In Keyboard Shortcuts

GitHub has a dedicated keyboard shortcut system built into every page. These are completely separate from your screen reader's navigation keys - they are JavaScript-powered shortcuts that trigger GitHub actions directly without using the mouse.

### Using GitHub shortcuts alongside a screen reader

The key issue: when your screen reader is in Browse Mode, it intercepts keystrokes before they reach the page. GitHub's shortcut system relies on the page receiving the keystroke directly. Here is how to unlock them:

| Screen Reader | How to use GitHub shortcuts |
|---|---|
| **NVDA** | Press `NVDA+Space` to enter Focus Mode, use the shortcut, then `NVDA+Space` to return to Browse Mode |
| **JAWS** | Press `Insert+Z` to toggle Virtual Cursor off, use the shortcut, then `Insert+Z` to turn it back on |
| **VoiceOver** | GitHub shortcuts generally work without mode switching - VoiceOver handles this differently |

**Exceptions that always work in Browse Mode:** `?` (shows all shortcuts) and `S`/`/` (focus the search bar) work at any time because they immediately move browser focus to an interactive element.

**Practical sequence for `G` shortcuts:**
```
Step 1: Press NVDA+Space (or Insert+Z in JAWS) - enter Focus Mode
Step 2: Press G, pause half a second
Step 3: Press the second key (I, P, A, etc.)
Step 4: Press NVDA+Space to return to Browse Mode on the new page
```

### Discover shortcuts on any page - The `?` Key

> **Start here every time you're on an unfamiliar GitHub page.** The `?` key opens GitHub's built-in keyboard shortcut help dialog. It lists every shortcut for the exact page you are on - the set changes depending on whether you are on a repository, an issue, a PR, the notifications inbox, etc.

Press `?` (Shift+/) from any GitHub page **when not inside a text field** to open the shortcut dialog.

#### Reading the shortcut dialog with a screen reader

The dialog is a standard ARIA modal (`role="dialog"`). When it opens, browser focus moves inside it automatically.

**NVDA:**
```
Step 1: Press Shift+/ to open the dialog → NVDA announces "dialog" and reads the title
Step 2: Press NVDA+Space to enter Browse Mode inside the dialog
Step 3: Press H to navigate between shortcut categories (they are h2 headings)
Step 4: Press ↓ to read each shortcut row in the category
Step 5: Press Escape or Tab to the Close button → Enter to close
```

**JAWS:**
```
Step 1: Press Shift+/ → JAWS announces the dialog and its title
Step 2: Use ↓ to read through the contents, or Ctrl+Home to start from the top
Step 3: Use Tab to move between interactive elements (the Close button)
Step 4: Press Escape to close
```

**VoiceOver (macOS):**
```
Step 1: Press Shift+/ → VoiceOver announces the dialog
Step 2: Use VO+Right to move through the dialog contents
Step 3: Use VO+Command+H to jump between heading categories
Step 4: Press Escape or navigate to the Close button (VO+Space)
```

**Key facts about the shortcut dialog:**
- It is **context-aware** - the shortcuts shown change based on your current page
- It is **always current** - GitHub automatically updates it when they add new shortcuts
- The dialog is divided into sections: Site-wide, Source code browsing, Issues, Pull requests, Notifications, etc. - only sections relevant to the current page appear
- You do not need to be in Focus Mode to open it - `?` works from Browse Mode


### Site-wide - work on every GitHub page

| Shortcut | Action |
|---|---|
| `?` | Show all keyboard shortcuts for the current page |
| `S` or `/` | Focus the search bar |
| `G` then `N` | Go to your Notifications |


### Repository navigation - on any repository page

| Shortcut | Action | Screen reader note |
|---|---|---|
| `G` then `C` | Go to the Code tab | Safe - use Focus Mode first |
| `G` then `I` | Go to the Issues tab | Safe - use Focus Mode first |
| `G` then `P` | Go to the Pull Requests tab | Safe - use Focus Mode first |
| `G` then `A` | Go to the Actions tab | Safe - use Focus Mode first |
| `G` then `W` | Go to the Wiki tab | Safe - use Focus Mode first |
| `G` then `G` | Go to the Discussions tab | Safe - use Focus Mode first |
| `.` (period) | Open repository in github.dev, same tab | Opens VS Code in your browser |
| `>` (Shift+Period) | Open repository in github.dev, new tab | Preserves your GitHub page - preferred |
| `T` | Open file finder (Go to File) | Conflicts with NVDA `T` = next table - use `F` to find the field instead |

> **Shortcut spotlight - `.` and `>`:** These open github.dev, which is VS Code running inside your browser - same keyboard shortcuts, same screen reader mode. `>` opens a new tab so you keep your current GitHub page. This is the fastest way to start editing a file without installing anything.


### Source code browsing - viewing a file

| Shortcut | Action | Screen reader note |
|---|---|---|
| `T` | Activate the file finder | Conflicts with NVDA table nav - use `F` for the field instead |
| `L` | Jump to a specific line number | Conflicts with NVDA `L` = next list - use Focus Mode first |
| `W` | Switch to a new branch or tag | - |
| `Y` | Expand URL to its permanent canonical form | Useful for linking to a specific commit of a file - the URL never changes |
| `I` | Show or hide comments on diffs | - |
| `A` | Show or hide annotations on diffs | - |
| `B` | Open blame view (who changed each line, and when) | Conflicts with NVDA `B` = next button - use Focus Mode first |


### Issue and pull request lists

These shortcuts work on the Issues list page and the Pull Requests list page:

| Shortcut | Action | Screen reader note |
|---|---|---|
| `C` | Create a new issue | Use Focus Mode first |
| `Ctrl+/` (Win) or `Cmd+/` (Mac) | Focus the issues or PR search bar | Works in Browse Mode - uses Ctrl |
| `U` | Filter by author | Use Focus Mode first |
| `L` | Filter by or edit labels | Conflicts with NVDA `L` = next list - use Focus Mode |
| `M` | Filter by or edit milestones | Use Focus Mode first |
| `A` | Filter by or edit assignee | Use Focus Mode first |
| `O` or `Enter` | Open the currently selected issue or PR | - |


### Issue and pull request detail pages

When viewing an open issue or pull request:

| Shortcut | Action |
|---|---|
| `Q` | Request a reviewer (pull requests only) |
| `M` | Set a milestone |
| `L` | Apply a label |
| `A` | Set an assignee |
| `X` | Link an issue from the same repository |
| `Ctrl+Shift+P` (Win) or `Cmd+Shift+P` (Mac) | Toggle Write and Preview tabs in the comment editor |
| `R` | Quote selected text in your reply - select text first, then press `R` |

> **Tip for `R` - quote a specific part of a comment:** In Browse Mode, select the text you want to quote by holding `Shift` and pressing arrow keys. Then press `R` - GitHub puts it directly into the comment box as a Markdown blockquote, with the author attributed. This is much faster than manually typing `> `.


### Comments - inside any text area (Focus Mode required)

These shortcuts work while typing in any GitHub comment or description field:

| Action | Windows / Linux | Mac |
|---|---|---|
| Bold | `Ctrl+B` | `Cmd+B` |
| Italic | `Ctrl+I` | `Cmd+I` |
| Inline code | `Ctrl+E` | `Cmd+E` |
| Insert link | `Ctrl+K` | `Cmd+K` |
| Paste as Markdown link (over selected text) | `Ctrl+V` | `Cmd+V` |
| Paste HTML link as plain text | `Ctrl+Shift+V` | `Cmd+Shift+V` |
| Blockquote | `Ctrl+Shift+.` | `Cmd+Shift+.` |
| Ordered list | `Ctrl+Shift+7` | `Cmd+Shift+7` |
| Unordered list | `Ctrl+Shift+8` | `Cmd+Shift+8` |
| Toggle Write / Preview | `Ctrl+Shift+P` | `Cmd+Shift+P` |
| Insert a code suggestion block | `Ctrl+G` | `Cmd+G` |
| **Submit comment** | **`Ctrl+Enter`** | **`Cmd+Enter`** |

> **The most important one:** `Ctrl+Enter` submits a comment from inside the text area - you do not have to Tab to the Submit button and press Enter. Your focus stays in context.

> **Insert suggestion (`Ctrl+G`):** Select the code you want to suggest a change to (in the diff), then press `Ctrl+G`. GitHub wraps it in a ` ```suggestion ` block. The PR author can apply your exact change with one button press.


### Files Changed tab in pull requests

| Shortcut | Action |
|---|---|
| `C` | Open the commits dropdown - filter which commits are shown in the diffs |
| `T` | Move focus to the "Filter changed files" search field |
| `Ctrl+Shift+Enter` (Win) or `Cmd+Shift+Enter` (Mac) | Submit a review comment |


### Notifications page

On your Notifications page ([github.com/notifications](https://github.com/notifications)):

| Shortcut | Action |
|---|---|
| `E` | Mark notification as done |
| `Shift+U` | Mark as unread |
| `Shift+I` | Mark as read |
| `Shift+M` | Unsubscribe from thread |


### GitHub Actions

On any Actions page in a repository:

| Shortcut | Action |
|---|---|
| `G` then `F` | Go to the workflow file |
| `Shift+T` or `T` | Toggle timestamps in logs |
| `Shift+F` or `F` | Toggle full-screen log view |
| `Esc` | Exit full-screen log view |
| `Ctrl+Space` (Win) or `Cmd+Space` (Mac) | Get AI suggestions in the workflow editor |


### Projects (board and table view)

| Shortcut | Action |
|---|---|
| `Ctrl+F` or `Cmd+F` | Focus the filter field |
| `Enter` | Toggle edit mode for the focused cell |
| `Esc` | Cancel editing |
| `Shift+Space` | Select item |
| `Space` | Open selected item |
| `E` | Archive selected items |
| `Ctrl+Shift+\` or `Cmd+Shift+\` | Open row actions menu |


> **Keep the official reference handy:** [github.com/keyboard-shortcuts](https://docs.github.com/en/get-started/accessibility/keyboard-shortcuts) - and press `?` on any GitHub page for the context-specific subset.


## Common Navigation Patterns - Quick Reference

Print or bookmark this section:

| Action | Keys |
|--------|------|
| Switch browse or focus mode | `NVDA+Space` or `JAWS+Z` |
| Elements list | `NVDA+F7` / `JAWS+F6` or `F7` / `VO+U` |
| Next heading (any level) | `H` |
| Next h3 (issue or PR title) | `3` |
| Next landmark or region | `D` |
| Next link | `K` |
| Next button | `B` |
| Next form field | `F` or `E` |
| Next list item | `I` |
| Jump to file table | `T` then `Ctrl+Alt+Arrow` keys |
| Activate item | `Enter` or `Space` |
| Submit comment | `Ctrl+Enter` (in text area) |
| Open dropdown | `Enter`, then `Up` or `Down Arrow`, then `Enter`, then `Escape` |


## Troubleshooting Common Issues

### "The page doesn't match the instructions"

- **Solution:** Maximize your browser window. GitHub's layout changes at smaller widths, and landmarks/headings may appear in different positions. Full-screen or maximized window gives the most consistent experience.

### "I'm hearing too much or navigating too slowly"

- Disable hovercards in GitHub Accessibility Settings (see [Pre-Workshop Setup](00-pre-workshop-setup.md))
- Adjust your screen reader verbosity settings
- Use `NVDA+F7` / `VO+U` to get a filtered list rather than tabbing through everything
- **NVDA reads GitHub too slowly:** In NVDA Settings → Browse Mode → increase "Maximum number of characters on one line" to 10000. This prevents NVDA from pausing to wrap long lines.

### "I pressed H but it's typing the letter H"

- You are in **Focus Mode** - press `NVDA+Space` (or `JAWS+Z`) to return to Browse Mode
- In Browse Mode, H is a navigation key, not a typing key

### "I can't find the comment box"

- Use `D` to navigate to the "Add a comment" landmark
- Then `E` or `F` to jump to the edit field
- Switch to Focus Mode before typing

### "The diff/code area is hard to navigate"

- The Files Changed tab requires Focus Mode to navigate the diff table
- Use `NVDA+Space` to enter Focus Mode, then use arrow keys
- Use `Ctrl+Alt+Arrow` keys to move between table cells


## Official Screen Reader Resources

- [GitHub Repos Screen Reader Guide](https://accessibility.github.com/documentation/guide/repos/)
- [GitHub Issues Screen Reader Guide](https://accessibility.github.com/documentation/guide/issues/)
- [GitHub Pull Requests Screen Reader Guide](https://accessibility.github.com/documentation/guide/pull-requests/)
- [GitHub Copilot in VS Code Screen Reader Guide](https://accessibility.github.com/documentation/guide/github-copilot-vsc/)
- [GitHub Accessibility Settings Docs](https://docs.github.com/en/get-started/accessibility)
- [GitHub Keyboard Shortcuts Reference](https://docs.github.com/en/get-started/accessibility/keyboard-shortcuts)
- [NVDA User Guide](https://www.nvaccess.org/files/nvda/documentation/userGuide.html)
- [JAWS Getting Started Documentation](https://www.freedomscientific.com/training/jaws/getting-started/)
- [VoiceOver User Guide for Mac](https://support.apple.com/guide/voiceover/welcome/mac)
- [GitHub Accessibility Community Discussions](https://github.com/orgs/community/discussions/categories/accessibility)


## Keyboard Shortcuts in Other Appendices

This cheat sheet covers GitHub web navigation and screen reader commands. Additional keyboard shortcuts for specific tools are documented in:

| Topic | Location |
|-------|----------|
| VS Code keyboard navigation and accessibility | [Appendix M - VS Code Accessibility Reference](appendix-m-vscode-accessibility-reference.md) |
| GitHub Copilot Chat and inline suggestions | [Appendix W - GitHub Copilot Reference](appendix-w-github-copilot-reference.md) |
| VS Code setup and configuration shortcuts | [Chapter 5 - VS Code Basics](05-vscode-accessibility.md) |
| GitHub Copilot activation and model switching | [Chapter 13 - GitHub Copilot](13-github-copilot.md) |


## Screen Reader Compatibility Notes

The commands in this cheat sheet have been written for and tested with the following screen readers:

| Screen Reader | Platform | Version Tested | Notes |
|---------------|----------|---------------|-------|
| **NVDA** | Windows | 2025.3.3+ | Free, open source. Primary screen reader for this workshop. |
| **JAWS** | Windows | 2026+ | Commercial. Trial available. |
| **VoiceOver** | macOS | Built into macOS Sonoma+ | No installation required. |

**If a command doesn't work as described:**
1. Check that you are in the correct mode (Browse Mode vs. Focus Mode)
2. Verify your screen reader version - older versions may use different key assignments
3. Check GitHub's own shortcut dialog (`?` key) for the current page's shortcuts
4. See [Troubleshooting](#troubleshooting-common-issues) above for common fixes


*Appendix B - keep this open as a reference throughout both days.*
*Return to: [Day 1 Agenda](admin/DAY1_AGENDA.md) | [Understanding GitHub's Web Structure](01-understanding-github-web-structure.md)*
*See also: [GitHub Concepts Glossary](appendix-a-glossary.md)*
