# Working with Issues
>
> **Listen to Episode 5:** [Working with Issues](../PODCASTS.md) - a conversational audio overview of this chapter. Listen before reading to preview the concepts, or after to reinforce what you learned.

## Filing, Managing, and Participating in GitHub Issues

> Issues are where open source collaboration begins. This guide covers everything from finding the right issue to file a perfect bug report - all with your keyboard and screen reader.
>
> **Official GitHub Accessibility Guide:** GitHub publishes an NVDA-focused guide for working with issues using a screen reader at [Using GitHub Issues with a Screen Reader](https://accessibility.github.com/documentation/guide/issues/). This chapter covers the same material with additional perspectives (VoiceOver, low vision, CLI) and workshop-specific challenges. Use the official guide as a companion reference.
>
> **Screen reader note - New Issues Experience:** This guide uses GitHub's improved Issues experience, which provides better ARIA landmark structure and live-region announcements for screen readers. This feature may already be active for your account - it has been broadly rolled out and may no longer appear as a Feature Preview toggle at all.
>
> **To verify:** Activate the **User Menu** button (top-right of any GitHub page) → activate **"Feature preview"** → scan the list for **"New Issues Experience"**:
>
> - If listed and the toggle announces **"Pressed"** (or **"Disable"**) - already enabled, no action needed
> - If listed but **not Pressed** (or **"Enable"**) - activate the toggle to enable it
> - If not listed at all - the feature has graduated to the standard interface; it is active automatically
>
> Full step-by-step instructions with per-screen-reader commands are in [Pre-Workshop Setup, Step 4](00-pre-workshop-setup.md#step-4---check-github-feature-preview-settings).
>
> **Browse vs Focus Mode (NVDA):** Toggle between modes with `NVDA+Space` (NVDA key = `Insert` or `Caps Lock`). Use **Browse Mode** (the default) for reading lists, headings, and issue content. Switch to **Focus Mode** when typing in text fields and search boxes. Use `NVDA+F7` at any time to open a list of all headings, links, form fields, buttons, and landmarks on the page - this is your orientation tool.


## Workshop Recommendation (Chapter 4)

Chapter 4 is the first **issue-based challenge chapter** with short, confidence-building tasks.

- **Challenge count:** 3
- **Time per challenge:** under 10 minutes
- **Evidence:** issue comments and issue metadata
- **Pattern:** claim -> act -> confirm

### Chapter 4 Challenge Set

1. **Create your first issue** - file a new issue with a clear title and description.
2. **Comment and @mention** - leave a comment on a classmate's issue and tag them with an @mention.
3. **Add a sub-issue** - break a larger issue into smaller, trackable pieces.

> **Branch guidance for Chapter 4:** Chapter 4 focuses on issue skills. You do NOT need to create a branch or edit any files for these challenges. All your work happens in GitHub issue threads. File editing and branches start in Chapter 6.
>
> **How completion works:** When you finish all three challenges, post a comment on your assigned Chapter 4 challenge issue with links to the issues you created, commented on, and organized. The facilitator reviews your issue activity directly. No pull request is required for Chapter 4.

### Challenge 4.1 Step-by-Step: Create Your First Issue

**Goal:** File a new issue in the Learning Room repository with a specific title and a meaningful description.

**Where you are working:** the Issues tab of the [learning-room](https://github.com/Community-Access/learning-room) repository on GitHub.com.

1. Open the [learning-room](https://github.com/Community-Access/learning-room) repository in your browser.
2. Navigate to the **Issues** tab (press `G` then `I` to jump there with keyboard shortcuts, or find the "Issues" link in the repository navigation).
3. Activate the **New issue** button.
4. If a template picker appears, select **Open a blank issue** (or choose a template if one fits).
5. In the **Title** field, type a clear, specific title (at least 12 characters). Examples:
   - "Add missing contributor background paragraph in welcome.md"
   - "Keyboard shortcuts table has incorrect NVDA modifier key"
   - "Setup guide link to accessibility settings is broken"
6. In the **Body** field, write a meaningful description (at least 80 characters). Include:
   - What the problem is or what content is missing.
   - Where in the repository the problem exists (file name and section).
   - What you think the fix should be.
7. Activate **Submit new issue**.
8. Copy the issue URL or note the issue number (for example, `#150`). You will reference this later.

**You are done when:** Your new issue appears in the Issues list with your username as the author, a clear title, and a detailed description.

### Challenge 4.2 Step-by-Step: Comment and @Mention

**Goal:** Leave a comment on another student's issue and use an @mention to notify them.

**Where you are working:** the Issues tab of the [learning-room](https://github.com/Community-Access/learning-room) repository on GitHub.com.

1. Open the **Issues** tab in the [learning-room](https://github.com/Community-Access/learning-room) repository.
2. Find an issue created by a classmate (look for issues from Challenge 4.1, or browse recent open issues).
3. Open the issue by activating its title link.
4. Read the issue description to understand what they reported.
5. Scroll to the comment box at the bottom of the issue.
6. Write a helpful comment that **@mentions the issue author by username**. Examples:
   - "@classmate I can confirm this - the link in setup-guide.md goes to a 404 page."
   - "@classmate Good catch! I think the correct shortcut is Insert+F7, not Insert+F5."
   - "@classmate I'd suggest adding the paragraph right after the 'Who Can Contribute' heading."
7. Activate the **Comment** button (or press `Ctrl+Enter`).

**Why @mentions matter:** When you type `@username`, GitHub sends that person a notification. This is how real open source teams communicate - you signal who needs to see your message. It also bridges into Chapter 10 (Notifications) where you will configure how you receive these alerts.

**You are done when:** Your comment appears in the thread and includes an @mention (the username renders as a clickable link).

### Challenge 4.3 Step-by-Step: Add a Sub-Issue

**Goal:** Break a larger issue into smaller, trackable pieces using GitHub's sub-issue feature.

**Where you are working:** the issue you created in Challenge 4.1 (or any open issue you have permission to edit).

> **What are sub-issues?** Sub-issues let you decompose a big task into smaller steps, each tracked independently. The parent issue shows a progress bar as sub-issues are completed. This is how teams organize real work - a single "Fix accessibility in welcome.md" issue might have sub-issues for each specific fix.

1. Open the issue you created in Challenge 4.1.
2. Look for the **Sub-issues** section in the issue sidebar (right side on desktop). If you do not see it, look for an **Add sub-issue** button or the **Create sub-issue** option below the issue description.
3. Activate **Add sub-issue** and choose **Create new sub-issue**.
4. Give the sub-issue a clear title that describes one specific piece of the parent issue. For example, if the parent is "Fix accessibility in welcome.md":
   - Sub-issue: "Add alt text to welcome banner image"
   - Sub-issue: "Fix heading hierarchy in Getting Started section"
5. Add a short description and activate **Create**.
6. The sub-issue now appears nested under the parent issue with a progress indicator.

**You are done when:** Your parent issue shows at least one sub-issue in the Sub-issues section.

### Completing Chapter 4: Submit Your Evidence

When you have finished all three challenges, go to your **assigned Chapter 4 challenge issue** (the one titled "Chapter 4.1: Create Your First Issue (@yourusername)" or similar) and post a comment with your evidence:

```text
Chapter 4 completed:
- Challenge 4.1: Created issue #[number]
- Challenge 4.2: Commented with @mention on issue #[number]
- Challenge 4.3: Added sub-issue to issue #[number]
```

Replace `[number]` with the actual issue numbers. Then close your Chapter 4 challenge issues. The facilitator will review your issue activity.

### Expected Outcomes

- Student can create an issue with a clear title and description.
- Student can communicate in issue threads using @mentions.
- Student can organize work by breaking issues into sub-issues.

### If You Get Stuck

1. Can't find a classmate's issue? Filter the Issues tab by `is:open` and look for recent ones.
2. @mention not working? Make sure you type `@` immediately followed by the username with no space.
3. Sub-issue option not visible? Ask a facilitator - the feature may need to be enabled for the repository.
4. Still stuck? Ask a facilitator for a direct issue link.

### Learning Moment

Issues are collaborative spaces, not just task lists. An @mention tells someone "I need your attention here." Sub-issues turn vague tasks into clear checklists. Both skills are used daily in real open source projects.

### Learning Pattern Used in This Chapter

1. Start with a small, safe action (create an issue).
2. Practice communication in public issue threads (@mention a peer).
3. Organize work into smaller pieces (sub-issues).
4. Leave clear evidence in the issue timeline.
5. Build momentum for file editing and PR work in Chapter 6.


### About Learning Cards in This Chapter

This chapter provides learning cards: expandable blocks that offer perspective-specific guidance for different ways of working. Not every card appears at every step. Open the ones that match how you work.

The following table describes the five learning card types used in this chapter.

| Card | Who it helps | What it covers |
| --- | --- | --- |
| Visual / mouse | Sighted users navigating with a mouse or trackpad | Click targets, visual cues, layout orientation |
| Low vision | Users with magnification, zoom, or high-contrast themes | Zoom-friendly navigation, finding controls at high magnification, high contrast visibility |
| NVDA / JAWS (Windows) | Screen reader users on Windows | Keystroke sequences, Focus and Browse mode, landmark navigation |
| VoiceOver (macOS) | Screen reader users on macOS | VO key sequences, rotor usage, interaction model |
| CLI (gh) | Terminal users on any platform | GitHub CLI commands for issue management |


## Local Git Alternative: Working from Your Clone

<details>
<summary>If you cloned the learning-room in Block 0 and prefer working locally</summary>

During Block 0 you cloned the Learning Room repository to your computer. If you are comfortable in a terminal, you can use the GitHub CLI (`gh`) from inside that clone for every issue operation in this chapter. This is the same workflow covered in depth in [Chapter 11: Git and Source Control](14-git-in-practice.md).

**Verify your clone is ready:**

```bash
cd ~/Documents/learning-room   # or wherever you cloned it
git status                      # should show "On branch main"
```

**Common issue commands from your local terminal:**

```bash
# List your assigned challenge issues
gh issue list --assignee @me --label challenge

# View a specific issue in the terminal
gh issue view 42

# Leave a comment on an issue
gh issue comment 42 --body "I'd like to try this!"

# Create a new issue interactively
gh issue create
```

All of these produce the same result as the web interface. The chapter instructions work identically either way - choose whichever is more comfortable for you.

</details>


## What Is a GitHub Issue?

An issue is a discussion thread attached to a repository. Issues are used for:

- **Bug reports** - "This feature doesn't work when using a screen reader"
- **Feature requests** - "It would help if the submit button had an accessible label"
- **Questions** - "How do I configure X for Y use case?"
- **Tasks** - "Update the README with screen reader instructions"
- **Accessibility reports** - "The infinite scroll carousel is not keyboard accessible"

Every issue has a **number** (`#42`), a **state** (Open or Closed), a **title**, a **description**, and a **comment thread**. Issues are public by default on public repositories.

> **Learning Room connection:** In the [learning-room](https://github.com/Community-Access/learning-room) repo, every challenge from `docs/CHALLENGES.md` becomes an issue. For example, Challenge 1 ("Fix Broken Link") is filed as an issue pointing to `docs/welcome.md`, describing the broken link and linking to the challenge success criteria. When you open a PR to fix it, you reference the issue with `Closes #XX` to automatically close it on merge.


## Navigating to the Issues List

### From a repository page

<details>
<summary>Visual / mouse users</summary>

Click the **Issues** tab in the repository navigation bar below the repository name. The tab shows the open issue count (e.g., “Issues · 14”).

</details>

<details>
<summary>Screen reader users (NVDA / JAWS - Windows)</summary>

1. Press `D` to navigate to the "Repository navigation" landmark
2. Press `K` or `Tab` to move through the tab links
3. Find "Issues" - it will be announced with the count: "Issues, 14 open"
4. Press `Enter` to open the Issues tab

</details>

<details>
<summary>Screen reader users (VoiceOver - macOS)</summary>

1. `VO+U` → Landmarks → navigate to "Repository navigation"
2. `VO+Right` or Quick Nav `K` to move through tab links
3. Find "Issues" - VoiceOver announces the count: "Issues 14"
4. `VO+Space` to activate the Issues tab

</details>

<details>
<summary>GitHub CLI (gh) alternative</summary>

List open issues directly from your terminal:

```bash
gh issue list
```

Filter by label, assignee, or state:

```bash
gh issue list --label "good first issue"
gh issue list --assignee @me
gh issue list --state closed
```

**Setup:** Install the GitHub CLI from [cli.github.com](https://cli.github.com) and authenticate with `gh auth login`. See [Appendix D](appendix-d-git-authentication.md) for details.

</details>

### Direct URL

Navigate directly: `https://github.com/[owner]/[repo]/issues`


## The Issues List Page

### Page structure

```
[Search / filter bar]          -- controls at the top
[State tabs: Open / Closed]    -- filter by status
[Issues list]                  -- each issue is one list item or heading
[Pagination]                   -- at the bottom
```

> **Quick orientation tip:** Press `NVDA+F7` (or `VO+U` on macOS) to open a list of all headings, links, form fields, and buttons on the page. This is often faster than tabbing through many elements and helps you understand the full page structure before diving in. Use `Ctrl+/` (Windows) or `Cmd+/` (Mac) to jump directly to the search field from anywhere on the page.

### How to read the issue list

<details>
<summary>Visual / mouse users</summary>

The issues list shows each issue as a row with its title, labels, number, assignee avatars, and comment count. Closed issues show a purple merged/closed badge. Click any issue title to open it. Use the **Open** and **Closed** toggle links above the list to switch between states.

</details>

<details>
<summary>Low vision users (zoom, high contrast)</summary>

Each issue row shows the title, labels (colored badges), number, and comment count. At high magnification:

- Issue titles are the largest text in each row and remain readable at 200%+ zoom.
- Label badges use colored backgrounds with text inside. In Windows High Contrast mode, labels display with system border colors and readable text rather than colored backgrounds.
- The **Open** and **Closed** toggle links above the list let you switch views. The active toggle is bold or underlined.
- The comment count icon (a speech bubble) may be small at high zoom. It appears to the right of each issue row. Hover to see "N comments" tooltip.
- Use `Ctrl+F` (browser Find) to search for a specific issue title if the list is long.

</details>

<details>
<summary>Screen reader users (NVDA / JAWS)</summary>

1. Press `D` to reach the “Search Results List” landmark
2. Press `3` (h3) to navigate by issue titles - each issue title is an h3 link
3. Press `I` to move between list items if you want more detail per item
4. Press `Enter` on a title to open that issue

</details>

<details>
<summary>Screen reader users (VoiceOver)</summary>

1. `VO+U` → Landmarks → navigate to “Search Results List”
2. `VO+Down` to read through items
3. `H` (with Quick Nav on) or `VO+U` → Headings to jump by issue title

</details>

### What is announced per issue

When you navigate to an issue in the list, your screen reader will announce (in some order):

- Issue title (as a link)
- Issue number (`#42`)
- Labels (e.g., "bug, good first issue")
- Who opened it and when ("Opened 3 days ago by username")
- Number of comments ("5 comments")


## Filtering and Searching Issues

Filtering lets you narrow the list to find the right issue quickly.

### Using the search/filter bar

1. Press `F` or `E` to jump to the filter input field (or navigate from the landmark)
2. Switch to Focus Mode (`NVDA+Space` / `Insert+Z`) if not already in it
3. Type your filter or search query
4. Press `Enter` to apply

#### Useful filter queries

```text
is:open label:"good first issue"    ← great for finding your first contribution
is:open label:accessibility         ← accessibility-related open issues
is:open assignee:@me                ← issues assigned to you
is:open no:assignee                 ← unassigned issues
is:open author:@me                  ← issues you filed
mentions:@me                        ← where you were @mentioned
is:open is:unread                   ← issues with unread activity
```

### Using the filter buttons

Above the issue list, there is an **actions toolbar** with filter buttons for Labels, Milestones, Assignees, etc.

> **Screen reader note:** The filter buttons do not indicate the current filter state. After applying a filter, the button text does not change to reflect what is selected. To verify which filters are active, check the search/filter bar text - it updates to show the active filter conditions (for example, `is:open label:accessibility`).

<details>
<summary>Visual / mouse users</summary>

The filter bar sits above the issue list. Click **Label**, **Milestone**, or **Assignee** to open a dropdown, select the values you want, then click anywhere outside to close. The issue list updates immediately.

</details>

<details>
<summary>Low vision users (zoom, high contrast)</summary>

The filter bar sits above the issue list. At high magnification:

- The **Label**, **Milestone**, and **Assignee** buttons may wrap to a second row. Each button opens a dropdown with searchable options.
- Dropdown menus from filter buttons can extend below the visible viewport at high zoom. Scroll within the dropdown to see all options.
- Type in the search field at the top of each dropdown to narrow the list (for example, type "accessibility" in the Label dropdown).
- In Windows High Contrast mode, the selected filter values are indicated with a checkmark icon and system highlight color, not just a background color change.

</details>

<details>
<summary>Screen reader users (NVDA / JAWS - Windows)</summary>

1. Press `Tab` from the search bar (or `Shift+Tab` from the issue list) to reach the actions toolbar
2. Press `←/→` to move between toolbar options (Label, Milestone, Assignee, Sort)
3. Press `Enter` to open the selected dropdown
4. Use `↑/↓` to navigate options in the dropdown
5. Press `Enter` or `Space` to select
6. Press `Escape` to close (filter applies immediately)

</details>

<details>
<summary>Screen reader users (VoiceOver - macOS)</summary>

1. `Tab` forward from the search bar to reach the filter buttons, or use Quick Nav to find them
2. `VO+Left/Right` to move between Label, Milestone, Assignee, Sort buttons
3. `VO+Space` to open the selected dropdown
4. `VO+Down` or arrow keys to navigate the dropdown options
5. `VO+Space` to select/deselect
6. `Escape` to close (filter applies immediately)

</details>

<details>
<summary>GitHub CLI (gh) alternative - filtering</summary>

Filter issues by label, milestone, or assignee without navigating dropdown menus:

```bash
# Filter by label
gh issue list --label "accessibility"

# Combine filters
gh issue list --label "good first issue" --assignee @me

# Filter by milestone
gh issue list --milestone "Hackathon Day 1"

# Search with keywords
gh issue list --search "screen reader"
```

</details>

### Open vs Closed filter

The two state links "Open" and "Closed" appear near the top of the issue list. Press `K` to navigate links until you find them, or look for them as buttons near the search bar.


## Reading an Issue

### Landing on an issue page

When you open an issue, the page structure is:

```text
[Issue title - h1]
[Open/Closed status badge]
[Author, timestamp, comment count]
─────────────────────────────────
[Issue description - Main content]   ← the original post
[Labels, Assignees sidebar - h3s]
─────────────────────────────────
[Activity / Timeline]                ← comments and events
  [First comment - h3]
  [Second comment - h3]
  ...
─────────────────────────────────
[Add a comment - landmark]
[Comment text area]
[Close issue / Submit button]
```

### Quick navigation

| Goal | Key |
| ------  | -----  |
| Hear the issue title | `1` |
| Jump to description | `2` (first h2 is usually "Description") |
| Jump to Activity section | `2` → next h2 is "Activity" |
| Navigate between comments | `3` (each comment is h3) |
| Jump to comment box | `D` → "Add a comment" landmark |
| Navigate labels/assignees | `H` or `3` in the sidebar |

### Reading the issue description

1. Press `2` to reach the "Description" heading
2. Press `↓` to read the content line by line, OR
3. Use `NVDA+↓` (NVDA say all) to have it read continuously

> **Browse Mode recommended:** The issue detail page is primarily text-based. Stay in **Browse Mode** (not Focus Mode) for reading - it gives you full heading (`H`), section (`D`), and link (`K`) navigation throughout the page. Only switch to Focus Mode when you need to type in a comment box.

Markdown in the description renders as proper HTML: headings become actual headings, bullets become lists, code blocks become `<code>` elements with the text "code block" announced.

<details>
<summary>GitHub CLI (gh) alternative - reading an issue</summary>

View an issue's full content in your terminal:

```bash
# View issue in terminal (renders Markdown)
gh issue view 42

# Open the issue in your browser instead
gh issue view 42 --web

# View just the comments
gh issue view 42 --comments
```

The terminal output includes the title, state, labels, assignees, body, and comments. Markdown renders as plain text - headings use `#` symbols, lists use `-`, and code blocks are preserved.

</details>

### Reading comments and activity

Each comment in the thread is marked as an h3. Navigate between them with `3`.

Each comment announces:

- Commenter's username
- Timestamp ("2 days ago")
- Body text
- Reactions (if any - announced as a button with an emoji and count)
- A "Reply" link

Other timeline events (label added, PR linked, issue closed) appear between comments in the activity stream. They are typically announced as text paragraphs.


## Leaving a Comment

### Step-by-step

<details>
<summary>Visual / mouse users</summary>

1. Scroll to the bottom of the issue page
2. Click in the **Leave a comment** text area
3. Type your comment (Markdown is supported - use the toolbar buttons above the text for bold, italic, code, etc.)
4. Optionally click **Preview** to see how it will render
5. Click the green **Comment** button to post

To close the issue while commenting: click the arrow on the **Close issue** button and choose **Close with comment**.

</details>

<details>
<summary>Low vision users (zoom, high contrast)</summary>

The comment area is at the bottom of the issue page. At high magnification:

1. Scroll to the bottom to find the **Leave a comment** text area. At 200%+ zoom, this may require significant scrolling past the timeline.
2. The text area expands as you type. The formatting toolbar above it (bold, italic, code, etc.) wraps at high zoom but remains functional.
3. The **Preview** tab next to **Write** lets you check Markdown rendering before posting.
4. The green **Comment** button is full-width at high zoom and easy to target.
5. **Keyboard shortcut:** Press `Ctrl+Enter` (Windows) or `Cmd+Return` (macOS) from inside the text area to submit the comment without finding the button.
6. In Windows High Contrast mode, the text area border and the Comment button use system colors for clear visibility.

</details>

<details>
<summary>Screen reader users (NVDA / JAWS - Windows)</summary>

1. Navigate to the comment box: `D` → "Add a comment" landmark, or press `E` or `F` to focus the text area
2. Enter Focus Mode: NVDA: `Insert+Space` | JAWS: `Insert+Z`
3. Type your comment (plain text or Markdown)
4. To preview: `Tab` to the **Preview** button, press `Enter`; then `Tab` back to **Write** to continue editing
5. Submit: press `Ctrl+Enter` from inside the text area, OR press `Escape` → `Tab` to the **Comment** button → `Enter`

</details>

<details>
<summary>Screen reader users (VoiceOver - macOS)</summary>

1. Navigate to the comment box: `VO+U` → Landmarks → "Add a comment", or Quick Nav `F` to jump to the text area
2. Interact with the text area: `VO+Shift+Down`
3. Type your comment (plain text or Markdown)
4. To preview: `VO+Shift+Up` to stop interacting, then `Tab` to the **Preview** button and `VO+Space`
5. Submit: press `Cmd+Return` from inside the text area, OR `VO+Shift+Up` → `Tab` to the **Comment** button → `VO+Space`

</details>

<details>
<summary>GitHub CLI (gh) alternative - commenting</summary>

Leave a comment from your terminal:

```bash
# Interactive: opens your default editor ($EDITOR) to write the comment
gh issue comment 42

# Inline: provide the comment text directly
gh issue comment 42 --body "Thanks for reporting this. I can reproduce the issue with NVDA + Chrome."
```

</details>

### Markdown formatting while typing

These keyboard shortcuts work inside the text area (Focus Mode):

| Shortcut | Result |
| ----------  | --------  |
| `Ctrl+B` | **Bold text** |
| `Ctrl+I` | *Italic text* |
| `Ctrl+E` | `Code span` |
| `Ctrl+K` | [Link text](URL) dialog |
| `Ctrl+Shift+.` | > Blockquote |
| `Ctrl+Shift+L` | - Bullet list |
| `Ctrl+Shift+7` | 1. Numbered list |

### GitHub shortcuts for the Issues pages

These are the GitHub built-in shortcuts for working with issues. Enable Focus Mode first (NVDA: `NVDA+Space`, JAWS: `Insert+Z`) before using single-key shortcuts.

#### On the Issues list page

| Shortcut | Action |
| ---  | ---  |
| `?` | Show all shortcuts for this page |
| `G I` | Jump to the Issues tab from anywhere in the repo |
| `C` | Create a new issue |

**Shortcut note:** For `G I`, press `G`, release it, then press `I` (two sequential key presses, not simultaneous).
| `Ctrl+/` (Win) or `Cmd+/` (Mac) | Focus the issues search and filter bar |
| `U` | Filter by author |
| `L` | Filter by or edit labels |
| `M` | Filter by or edit milestones |
| `A` | Filter by or edit assignee |
| `O` or `Enter` | Open the selected issue |

#### On an open issue

| Shortcut | Action |
| ---  | ---  |
| `M` | Set a milestone |
| `L` | Apply a label |
| `A` | Set an assignee |
| `X` | Link a related issue from the same repository |
| `R` | Quote selected text in your reply (select text first) |
| `Ctrl+Shift+P` (Win) or `Cmd+Shift+P` (Mac) | Toggle Write and Preview tabs |
| `Ctrl+Enter` | Submit comment from inside the text area |

> **`R` to quote is a power move:** Select any text in a comment while in Browse Mode (`Shift+Arrow` to select), then press `R`. GitHub puts the quoted text in the comment box as a Markdown blockquote. Much faster than typing `>` manually.

For the full shortcut system, see [Screen Reader Cheat Sheet - GitHub Shortcuts section](appendix-b-screen-reader-cheatsheet.md#github-built-in-keyboard-shortcuts).

1. Navigate to your comment (`3` to jump to comments)
2. Find the "..." (ellipsis) menu button near your comment
3. Press `Enter` on "Edit" from that menu
4. The comment turns into a text area - switch to Focus Mode
5. Make your changes
6. Tab to "Update comment" button → Enter


## Filing a New Issue

### Navigating to New Issue

<details>
<summary>Visual / mouse users</summary>

From the Issues list page, click the green **New issue** button in the top-right of the issue list. If the repository has templates, a template picker page appears - click **Get started** next to the template that fits your needs, or click **Open a blank issue** to skip templates.

</details>

<details>
<summary>Low vision users (zoom, high contrast)</summary>

The green **New issue** button is in the top-right of the issue list page. At high magnification:

- At 200%+ zoom, the button may move below the search bar or wrap to its own line. It remains a prominent green button.
- If the repository has issue templates, a template picker page appears with each template as a card. Template descriptions may truncate at high zoom. Hover over a truncated description for the full text.
- The **Get started** button next to each template is small but uses standard link styling. Press `Tab` to move between templates and their Get started buttons.
- **Open a blank issue** link appears at the bottom of the template list. At high zoom, scroll down to find it.
- In Windows High Contrast mode, the New issue button uses the system button colors and the template cards have visible borders.

</details>

<details>
<summary>Screen reader users (NVDA / JAWS - Windows)</summary>

From the Issues list:

1. Press `K` to navigate links and find the "New issue" button/link
2. Press `Enter`
3. If a template picker appears: press `3` to navigate template names, read the description below each, then press `Enter` on "Get started" for the right template - or find "Open a blank issue." link if no template fits

</details>

<details>
<summary>Screen reader users (VoiceOver - macOS)</summary>

From the Issues list:

1. Quick Nav `B` or `VO+U` → Buttons to find the "New issue" button
2. `VO+Space` to activate it
3. If a template picker appears: Quick Nav `H` or `VO+Cmd+H` to navigate template names, then `VO+Space` on "Get started" for the right template - or Quick Nav `K` to find the "Open a blank issue" link

</details>

### Filling Out the Issue Form

The issue form has these fields (order may vary depending on the template):

#### Title field

1. Find the Title input field (`F` or by landmark)
2. Focus Mode → type a clear, specific title
3. Good title: "Screen reader announces wrong element count on Issues list with 50+ items"
4. Bad title: "Bug with screen reader"

#### Description / Body field

1. Tab to the body text area
2. Focus Mode → type using the Markdown template provided
3. If no template, use this structure:

```markdown
## What happened

Describe what you observed.

## What I expected

Describe what should have happened.

## How to reproduce

1. Step one
2. Step two
3. Step three

## Environment

- Screen reader: [NVDA 2025.3.3 / JAWS 2026 / VoiceOver macOS Sonoma]
- Browser: [Chrome 124 / Firefox 125 / Safari 17]
- OS: [Windows 11 / macOS 14]
- GitHub interface: [Modern experience (default since Jan 2026) / Classic experience]

## Additional context

Any other information, screenshots (with alt text), or links.
```

### Assigning labels from the sidebar

While the form is open, the sidebar has dropdowns for Labels, Assignees, and Milestone.

<details>
<summary>Visual / mouse users</summary>

In the right sidebar, click the gear icon () next to **Labels**. A dropdown opens - click a label to select it. Click outside to close. Repeat for **Assignees** and **Milestone**.

</details>

<details>
<summary>Screen reader users (NVDA / JAWS - Windows)</summary>

1. `Tab` away from the text area (or press `Escape` to leave Focus Mode)
2. Navigate to the sidebar - press `H` to find "Labels" heading
3. Press `Enter` on the Labels gear/button
4. Dropdown opens → `↑/↓` to navigate labels
5. `Enter` to select/deselect
6. `Escape` to close (selections save automatically)

</details>

<details>
<summary>Screen reader users (VoiceOver - macOS)</summary>

1. `VO+Shift+Up` to stop interacting with the text area
2. `VO+U` → Headings to find the "Labels" heading in the sidebar
3. `VO+Space` on the Labels gear/button to open the dropdown
4. `VO+Down` or arrow keys to navigate labels
5. `VO+Space` to select/deselect
6. `Escape` to close (selections save automatically)

</details>

### Submitting the issue

1. Tab to "Submit new issue" button
2. Press `Enter`

<details>
<summary>GitHub CLI (gh) alternative - filing a new issue</summary>

Create an issue from your terminal:

```bash
# Interactive: prompts for title, body, labels, and assignees
gh issue create

# Inline: provide everything on the command line
gh issue create --title "Screen reader announces wrong count on Issues list" \
  --body "## What happened\n\nThe count says 14 but only 12 issues are visible." \
  --label "bug,accessibility" \
  --assignee @me

# Use a template (if the repo has issue templates)
gh issue create --template "bug_report.md"
```

The interactive mode walks you step-by-step through title, body (opens your editor), labels, and assignees - fully usable from a terminal with a screen reader.

</details>


## Cross-Referencing Issues

Linking issues and PRs to each other creates a trail of context that helps everyone understand the project's history.

### Closing keywords in PR descriptions or issue comments

When you type these phrases in a PR description or comment (followed by an issue number), GitHub creates a connection:

| Keyword | Effect on merge |
| ---------  | ----------------  |
| `Closes #42` | Closes issue #42 when the PR merges |
| `Fixes #42` | Same - typically for bugs |
| `Resolves #42` | Same - general use |
| `refs #42` | Creates a reference without auto-closing |
| `cc @username` | Notifies the person |

### Mentioning another issue in a comment

Simply type `#` followed by a number anywhere in a comment body. GitHub autocompletes with a dropdown of matching issues and PRs:

```text
Step 1: Type # in the comment box (Focus Mode)
Step 2: A dropdown appears with issues and PRs
Step 3: ↑/↓ to navigate, or type more numbers to filter
Step 4: Enter to insert the reference
```

### Cross-repo references

`owner/repo#42` - references issue #42 in a different repository.


## Sub-Issues - Parent and Child Relationships

**Sub-issues** (released 2025) let you nest issues inside a parent issue to break large work into tracked pieces. A "parent" issue contains a list of child issues; each child is a full issue with its own discussion, labels, and assignees.

### When to Use Sub-Issues

| Use case | Example |
| ----------  | ---------  |
| Large feature broken down | Parent: "Redesign navigation"; Children: "Keyboard nav," "Screen reader nav," "Mobile nav" |
| Epic tracking | Parent: "WCAG 2.1 AA compliance"; Children: one issue per failing criterion |
| Release milestone | Parent: "v2.0 release"; Children: every required PR/fix |

### Creating a Sub-Issue

From any open issue:

```text
1. Open the parent issue page
2. Scroll to (or H-navigate to) the "Sub-issues" section in the issue body/sidebar
3. Tab to "Add sub-issue" button → Enter
4. Type the issue number or title to search
5. Select the issue from the dropdown → Enter to link
   Or: select "Create new issue" to create and link in one step
```

**Screen reader note:** The sub-issues section is announced as a region. After linking, the child issue appears as a list item with a checkbox showing its open/closed state. Tab through to read each child's title and status.

### Reading Sub-Issues on a Parent Issue

```text
H → "Sub-issues" heading
↓ → list of linked child issues
Each item: [checkbox state] [issue title] [#number] [open/closed badge]
Tab → "Add sub-issue" button (if you have write access)
```

**Progress indicator:** The parent issue shows a completion bar (e.g., "3 of 7 completed") based on how many child issues are closed. Screen readers announce this as a progress region.

### Viewing a Child Issue's Parent

Every child issue shows a "Parent issue" link near the top of the page (above the description). Navigate with `H` or links (`K`) to find it.

### Sub-Issues vs. Task Lists

| Feature | Task list checkboxes | Sub-issues |
| ---------  | ---------------------  | ------------  |
| Location | Issue description (Markdown) | Sidebar/section (structured data) |
| Each item is | Text line + checkbox | A full GitHub issue |
| Tracked in Projects | No (checkbox only) | Yes (each child tracks independently) |
| Cross-repo | No | Yes |
| Best for | Quick checklists in one issue | Multi-issue work tracking |

> **Workshop tip:** If you are working on a feature that requires multiple PRs or involves several team members, ask the maintainer to create a parent issue. You can then claim individual child issues without one person owning the whole feature.


## Managing Issues (for Maintainers and Triagers)

### Closing an issue

<details>
<summary>Visual / mouse users</summary>

Scroll to the bottom of the issue page. Click the **Close issue** button next to the comment box. Optionally type a closing comment first. If you want to record a reason, click the dropdown arrow on the button and choose **Close as completed** or **Close as not planned**.

</details>

<details>
<summary>Screen reader users (NVDA / JAWS - Windows)</summary>

1. **Keyboard shortcut (fastest):** Navigate to the comment text area (`D` → "Add a comment" landmark), switch to Focus Mode, then press `Ctrl+Shift+Enter` to close the issue
2. **Button approach:** `Tab` to the "Close issue" button (at the bottom of the page, near the comment box) and press `Enter`
3. Optionally leave a closing comment first

</details>

<details>
<summary>Screen reader users (VoiceOver - macOS)</summary>

1. **Keyboard shortcut (fastest):** `VO+U` → Landmarks → "Add a comment", interact with the text area (`VO+Shift+Down`), then press `Cmd+Shift+Return` to close the issue
2. **Button approach:** Quick Nav `B` or `Tab` to find the "Close issue" button, then `VO+Space`
3. Optionally leave a closing comment first

</details>

<details>
<summary>GitHub CLI (gh) alternative - closing and reopening</summary>

Close or reopen an issue from your terminal:

```bash
# Close an issue
gh issue close 42

# Close with a reason
gh issue close 42 --reason "completed"
gh issue close 42 --reason "not planned"

# Close with a comment
gh issue close 42 --comment "Fixed in PR #45."

# Reopen a closed issue
gh issue reopen 42
```

</details>

### Reopening a closed issue

If an issue is Closed, the "Close issue" button becomes "Reopen issue" - navigate and activate to reopen.

### Assigning an issue

From the issue sidebar:

1. Navigate to "Assignees" heading (`3` or `H`)
2. Activate the gear/plus button
3. Type a username in the search field
4. Select from the dropdown

<details>
<summary>GitHub CLI (gh) alternative - assigning and labeling</summary>

Manage assignments and labels from your terminal:

```bash
# Assign yourself
gh issue edit 42 --add-assignee @me

# Add labels
gh issue edit 42 --add-label "accessibility,in progress"

# Remove a label
gh issue edit 42 --remove-label "needs triage"

# Set a milestone
gh issue edit 42 --milestone "Hackathon Day 1"
```

</details>

### Changing labels

From the issue sidebar:

1. Navigate to "Labels" heading
2. Activate the gear button
3. Select/deselect labels from the dropdown
4. Press Escape to save

### Transferring or deleting an issue

Available from the "..." (ellipsis) button at the top of the issue - navigate buttons with `B` to find it.


## The "good first issue" Label - Your Entry Point

When looking for your first open source contribution:

1. Navigate to any project's Issues tab
2. Filter by label: type `is:open label:"good first issue"` in the search
3. Read through issues until you find one in your area of interest
4. Comment on the issue: "Hi, I'd like to work on this. Can I be assigned?"
5. Wait for a maintainer to respond and assign you before starting work

**Remember:** It's respectful to ask before starting. Maintainers juggle many discussions and need to know who is working on what to avoid duplicated effort.


## Accessibility-Specific Issue Writing Tips

When filing accessibility bugs, these details help maintainers reproduce and fix the problem:

1. **Screen reader and version** - "NVDA 2025.3.3" not just "screen reader"
2. **OS and version** - "Windows 11 22H2"
3. **Browser and version** - "Chrome 124.0.6367.82"
4. **GitHub interface** - "Modern experience (default since Jan 2026)" or "Classic experience (opted out)"
5. **What was announced** - quote the exact text your screen reader spoke
6. **What should have been announced** - describe the expected behavior
7. **ARIA issue if known** - e.g., "The button has no accessible name"
8. **Steps to reproduce** - numbered, step-by-step
9. **Frequency** - "This happens every time" vs "intermittent"

### Example of a well-filed accessibility issue

```text
Title: Issues list does not announce label filtering results to screen readers

## What happened
When I apply a label filter on the Issues list using the Labels dropdown,
the filtered list updates visually but NVDA does not announce that the
results changed or how many items are now shown.

## What I expected
After filtering, the screen reader should announce something like
"14 issues open, filtered by label: accessibility" or a live region
update indicating the results changed.

## How to reproduce
1. Navigate to any repo's Issues tab
2. Press B to navigate to the "Label" filter button
3. Press Enter to open the dropdown
4. Select the "accessibility" label
5. Press Escape to close
6. Notice: no announcement that filtering has been applied

## Environment
- Screen reader: NVDA 2025.3.3 (with NVDA+Chrome)
- Browser: Chrome 124.0.6367.82
- OS: Windows 11 22H2
- GitHub interface: Modern experience (default since Jan 2026)

## Additional context
JAWS 2026 also does not announce. VoiceOver on macOS Sonoma with
Safari 17 does announce "List updated" when filtering is applied,
so the macOS behavior appears correct.
```


## Try It: File Your First Issue

**Time:** 3 minutes | **What you need:** Browser, signed in to GitHub

Go to the Learning Room repository and file a real issue:

1. Navigate to the Issues tab (press `G` then `I` in Focus Mode)
2. Find and activate the "New issue" button (`K` to links, or `Tab` to it)
3. In the title field, type: **"Introduce myself - [Your Name]"**
4. In the description, write 2-3 sentences: who you are, what screen reader you use, and one thing you're hoping to learn today
5. Press `Ctrl+Enter` to submit (or Tab to the Submit button and press `Enter`)

**You're done.** You just filed your first GitHub issue. Go read someone else's introduction and leave a friendly comment - press `3` to jump between issue titles on the Issues list.

> **What success feels like:** Your issue is live. Other participants can see it. You just contributed to a real repository - and it took less than three minutes.


> ### Day 2 Amplifier - Accessibility Agents: `@issue-tracker`
>
> **File, read, comment on, and triage real issues manually before using any agent.** If you have not done the triage work yourself - reading descriptions, assigning labels, identifying duplicates - you cannot evaluate whether an agent's priority scoring is correct. The skill must exist before the amplifier is useful.
>
> Once you have mastered manual issue management:
>
> - **In VS Code** - `@issue-tracker find open issues labeled good-first-issue` searches cross-repository with community sentiment scoring, release-awareness prioritization, and batch-reply capability across every repo you have access to
> - **In your repo** - The issue templates in `accessibility-agents/.github/ISSUE_TEMPLATE/` structure both human filing and automated triage; fork [accessibility-agents](https://github.com/Community-Access/accessibility-agents) and that structure travels into any project you lead
> - **In the cloud** - GitHub Agentic Workflows triage new issues the moment they are opened: applying labels, posting first-response comments, adding to Project boards - the same triage actions you practiced manually today, running at scale
>
> *Today you are the triage engine. On Day 2, you understand the engine well enough to direct it.*


*Next: [VS Code Accessibility](11-vscode-interface.md)*
*Back: [The Learning Room](04-the-learning-room.md)*
*Related: [Issue Templates Guide](17-issue-templates.md) | [Labels & Milestones](09-labels-milestones-projects.md) | [Culture & Etiquette](08-open-source-culture.md)*
