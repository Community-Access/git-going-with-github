# Working with Issues
>
> **Listen to Episode 5:** [Working with Issues](../PODCASTS.md) - a conversational audio overview of this chapter. Listen before reading to preview the concepts, or after to reinforce what you learned.

> **Related appendices:** [Appendix N: Advanced Search](appendix-n-advanced-search.md) | [Appendix V: GitHub Mobile](appendix-v-github-mobile.md) | [Appendix B: Screen Reader Cheat Sheet](appendix-b-screen-reader-cheatsheet.md)
> **Authoritative sources:** [GitHub Docs: About issues](https://docs.github.com/en/issues/tracking-your-work-with-issues/about-issues) | [GitHub Accessibility Guide: Issues](https://accessibility.github.com/documentation/guide/issues/)


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
5. Finished but not sure you did it right? Compare your work against the [Challenge 2 reference solution](solutions/solution-02-first-issue.md) or the [Challenge 3 reference solution](solutions/solution-03-conversation.md).

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

### Learning Cards: Navigating to the Issues List

**Screen reader users:**
- Press `D` to jump to the "Repository navigation" landmark, then `K` or `Tab` to find the Issues link -- this is faster than arrowing through the entire page
- The Issues tab announces its open count ("Issues, 14 open"), giving you an instant sense of project activity without loading the list
- Use `gh issue list` in the terminal to bypass browser navigation entirely; pipe through `--label` or `--assignee @me` to pre-filter results

**Low-vision users:**
- The Issues tab count badge may be small at default zoom; at 200%+ the tab text reflows but the count remains visible next to the word "Issues"
- Bookmark the direct URL pattern (`github.com/owner/repo/issues`) to skip repository page navigation altogether
- In high-contrast mode, the active tab is indicated with an underline using system highlight color, not just a subtle background change

**Sighted users:**
- The Issues tab sits in the repository navigation bar directly below the repo name; the open count badge gives a quick pulse check on project health
- Memorize the `G I` keyboard shortcut (press G, release, press I) to jump to Issues from anywhere in the repository without scrolling
- The direct URL pattern works for any repository: swap `[owner]/[repo]` with real values and bookmark your most visited projects


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

### Learning Cards: The Issues List Page

<details>
<summary>Screen reader users</summary>

- Press `D` to jump to the "Search Results List" landmark, then press `3` to navigate issue titles (each is an H3 link)
- Press `I` to move between individual list items if you want full detail per issue (number, labels, author, age)
- After applying a filter, the issue list updates silently; press `3` again to re-navigate the updated list from the top

</details>

<details>
<summary>Low vision users</summary>

- Issue titles are the largest text per row and stay readable at 200%+ zoom; labels appear as small colored badges to the right of each title
- The Open/Closed toggle links are near the top of the list; the active state is bold or underlined depending on your theme
- If the comment count icon (speech bubble) is too small at your zoom level, hover over it for a tooltip showing the exact count

</details>

<details>
<summary>Sighted users</summary>

- Each issue row shows: open/closed icon (green circle = open, purple merged icon = closed), title, label badges, PR link icon, comment count, and assignee avatar
- Click the Open/Closed tabs above the list to switch between open and closed issues; the count next to each tab updates as you filter
- Issue labels appear as colored rounded rectangles inline with the title; hover over a label to see its description

</details>


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

### Learning Cards: Filtering and Searching Issues

**Screen reader users:**
- Switch to Focus Mode (`NVDA+Space`) before typing in the filter bar; switch back to Browse Mode after pressing Enter to read the filtered results
- The filter bar does not announce how many results remain after filtering; press `H` to jump to the issue list heading, then listen for the count in the heading text
- Combine `gh issue list` flags (e.g., `--label "accessibility" --assignee @me`) for instant filtered results without navigating dropdown menus

**Low-vision users:**
- Filter dropdown menus can extend below the viewport at high zoom; scroll within the dropdown or type in the search field at the top of each dropdown to narrow options
- After applying a filter, verify it took effect by checking the search bar text -- it updates to show active conditions like `is:open label:accessibility`
- The `Ctrl+/` (Windows) or `Cmd+/` (Mac) shortcut focuses the search bar instantly, avoiding the need to scroll up to find it

**Sighted users:**
- Build compound queries in the search bar for precision: `is:open label:"good first issue" no:assignee` finds unclaimed starter issues in one step
- The Open/Closed toggle near the top of the list preserves your current filter; click Closed to see resolved issues without losing your label or assignee filter
- Pin your most-used filter as a browser bookmark (the URL updates to reflect the active query) for one-click access


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

### Learning Cards: Reading an Issue

<details>
<summary>Screen reader users</summary>

- Press `1` to hear the issue title, then `2` to reach "Description" and "Activity" headings, and `3` to jump between individual comments
- Stay in Browse Mode for reading; only switch to Focus Mode (`NVDA+Space`) when you need to type in the comment box
- Press `D` to jump to the "Add a comment" landmark at the bottom of the page to skip directly to the reply area

</details>

<details>
<summary>Low vision users</summary>

- The issue title is the largest text on the page, followed by an Open/Closed badge in green or purple
- Comment blocks have a subtle border and a grey header bar showing the author's avatar and timestamp; zoom in on the header to identify commenters
- The sidebar (Labels, Assignees, Milestone) is on the right at desktop width; at high zoom it may move below the main content

</details>

<details>
<summary>Sighted users</summary>

- The issue page has a two-column layout: main content on the left (description, timeline, comment box) and sidebar on the right (labels, assignees, milestone, linked PRs)
- Each comment shows the author's avatar in the left margin, with a header bar containing their username and a relative timestamp
- Timeline events (label changes, assignments, cross-references) appear as small lines between comments with icons indicating the event type

</details>


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

### Learning Cards: Leaving a Comment

**Screen reader users:**
- Press `D` to jump to the "Add a comment" landmark, which places focus near the text area; then Enter Focus Mode to start typing
- Use `Ctrl+Enter` to submit your comment directly from inside the text area -- this avoids having to Tab through the formatting toolbar to find the Comment button
- To quote someone's text in your reply, select the text in Browse Mode (`Shift+Arrow`), then press `R`; GitHub inserts it as a blockquote in the comment box automatically

**Low-vision users:**
- The comment text area expands as you type and is full-width at high zoom, making it easy to target; use `Ctrl+Enter` to submit without hunting for the Comment button
- Use the Preview tab next to Write to check your Markdown formatting in rendered form before posting; bold, code blocks, and links are much easier to proofread there
- Keyboard formatting shortcuts (`Ctrl+B` for bold, `Ctrl+E` for inline code) work inside the text area and save time over clicking small toolbar icons

**Sighted users:**
- The formatting toolbar above the text area offers bold, italic, code, link, and list buttons; hover for tooltips showing the keyboard shortcut for each
- Use the `R` shortcut to quote selected text -- it creates a blockquote in your reply, making threaded conversations much easier to follow
- The Close with comment option (dropdown arrow on the Close button) lets you leave a final note and close the issue in a single action


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

> **See also:** [Chapter 09: Labels, Milestones, and Projects](09-labels-milestones-projects.md) covers the full label and milestone system.

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

### Learning Cards: Filing a New Issue

<details>
<summary>Screen reader users</summary>

- After pressing "New issue," if a template picker appears, press `3` to jump between template names; each has a "Get started" link next to it
- In the title field, type at least 12 characters for a meaningful title; press `Tab` to move to the body field
- Press `Ctrl+Enter` from inside the body text area to submit the issue without needing to find the Submit button

</details>

<details>
<summary>Low vision users</summary>

- The green "New issue" button is in the top-right of the Issues list page; at 200%+ zoom it may wrap below the search bar
- Template cards (if the repo uses them) show truncated descriptions at high zoom; hover over them for the full text
- The sidebar dropdowns for Labels, Assignees, and Milestone are gear icons that may be small at high zoom; they open searchable dropdown panels

</details>

<details>
<summary>Sighted users</summary>

- The new issue form has a Title field at the top and a large Body text area below; a formatting toolbar (bold, italic, code, etc.) appears above the body
- The Write/Preview tabs above the body let you toggle between editing and rendered Markdown views
- Sidebar options (Labels, Assignees, Milestone) appear to the right of the body field; click the gear icon next to each to open a dropdown

</details>

### Tool Cards: File a New Issue

**github.com (browser):**
1. Navigate to the repository's **Issues** tab (or press `G` then `I`).
2. Click **New issue**, choose a template or blank issue.
3. Fill in the title and description, then click **Submit new issue**.

**github.dev (web editor):**
Not available -- issues are managed through the repository's Issues tab, not the code editor.

**VS Code Desktop (GitHub Pull Requests extension):**
1. Open the **GitHub** panel in the sidebar.
2. Under **Issues**, click the **+** icon to create a new issue.
3. Fill in the title and body, then click **Create**.

**GitHub Desktop:**
Not directly supported. Click **Repository > View on GitHub** to open the browser, then file the issue there.

**Git CLI / GitHub CLI:**
```bash
gh issue create --title "Your title" --body "Description here"
# Or interactively:
gh issue create
```


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

### Learning Cards: Cross-Referencing Issues

**Screen reader users:**
- Type `#` in any comment body to trigger GitHub's autocomplete dropdown; press `Down Arrow` to browse matching issues and `Enter` to insert the reference link
- Use `Closes #42` (not just `#42`) in PR descriptions so GitHub automatically closes the issue on merge; your screen reader will confirm the link is created in the PR timeline
- Cross-references appear as timeline events on the linked issue; navigate with `H` to find "mentioned this issue" entries to trace the conversation history

**Low-vision users:**
- Cross-reference links (`#42`) render as colored, clickable links in both issue bodies and PR descriptions; at high zoom they remain inline with surrounding text
- The autocomplete dropdown triggered by `#` may overlap content at high magnification; type additional digits to narrow results and reduce dropdown size
- Back-links appear automatically on the referenced issue's timeline, so you can verify the connection was created by visiting either side

**Sighted users:**
- Use `Closes #42`, `Fixes #42`, or `Resolves #42` in PR descriptions for auto-closing on merge; `refs #42` creates a reference without auto-close, useful for "related but not solved" links
- GitHub's autocomplete (`#` then type) searches both issue titles and numbers, so you can find issues by keyword without memorizing numbers
- Cross-repo references use the format `owner/repo#42` -- useful when your PR in one repository fixes a bug tracked in another


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

### Learning Cards: Sub-Issues

**Screen reader users:**
- The sub-issues section is announced as a region; press `H` to navigate to the "Sub-issues" heading, then arrow down through the list where each child announces its checkbox state, title, and open/closed badge
- The parent issue shows a progress indicator ("3 of 7 completed") announced as a progress region; listen for this after the sub-issues heading to gauge overall status
- Every child issue includes a "Parent issue" link near the top of its page; navigate with `K` (links) to find it and jump back to the parent quickly

**Low-vision users:**
- The completion progress bar on the parent issue uses color to show progress; in high-contrast mode, completed vs. remaining segments use distinct system colors
- At high zoom, the "Add sub-issue" button may wrap below the sub-issues list; Tab past the last child item to reach it
- Each child issue's open/closed badge uses both color and text ("Open" or "Closed"), so status is readable without relying on color alone

**Sighted users:**
- Sub-issues appear as a checklist with a progress bar on the parent issue; each child links directly to its own issue page with full discussion and labels
- Use sub-issues instead of Markdown task-list checkboxes when each item needs its own assignee, labels, or cross-repo tracking -- sub-issues are structured data, not just text
- Creating a sub-issue from the parent's "Add sub-issue" button auto-links the new issue; you can also link existing issues by searching their number or title


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

### Learning Cards: Managing Issues

**Screen reader users:**
- Close an issue instantly with `Ctrl+Shift+Enter` from the comment text area (Focus Mode) -- no need to Tab to the Close button
- The sidebar sections (Assignees, Labels, Milestone) each have their own heading; press `H` or `3` to jump between them, then activate the gear icon to open each dropdown
- Use `gh issue edit 42 --add-label "accessibility" --add-assignee @me` to batch-update labels and assignments from the terminal without navigating sidebar controls

**Low-vision users:**
- Sidebar controls (Assignees, Labels, Milestone) are narrow at default width; at high zoom they stack vertically and each dropdown opens a searchable overlay that is easier to read
- The Close issue button turns green and its label changes to "Reopen issue" once closed; in high-contrast mode, both states use distinct system colors
- Type in the search field inside each sidebar dropdown (Labels, Assignees) to filter long lists rather than scrolling through all options at high magnification

**Sighted users:**
- The issue sidebar on the right contains Assignees, Labels, Projects, and Milestone in collapsible sections; click the gear icon next to each to open the edit dropdown
- Use the dropdown arrow on the Close button to choose "Close as completed" vs. "Close as not planned" -- this distinction helps with project tracking and search filtering
- The "..." menu at the top of any issue provides Transfer, Pin, Lock, and Delete options for repository maintainers


## The "good first issue" Label - Your Entry Point

When looking for your first open source contribution:

1. Navigate to any project's Issues tab
2. Filter by label: type `is:open label:"good first issue"` in the search
3. Read through issues until you find one in your area of interest
4. Comment on the issue: "Hi, I'd like to work on this. Can I be assigned?"
5. Wait for a maintainer to respond and assign you before starting work

**Remember:** It's respectful to ask before starting. Maintainers juggle many discussions and need to know who is working on what to avoid duplicated effort.

### Learning Cards: The "good first issue" Label

**Screen reader users:**
- Use the filter query `is:open label:"good first issue"` in the search bar to jump directly to beginner-friendly issues; `gh issue list --label "good first issue"` does the same in the terminal
- Before claiming an issue, read existing comments to check whether someone else has already been assigned; listen for "assigned to" in the sidebar metadata
- When you comment to claim an issue, include a sentence about your approach so the maintainer can give early feedback before you start coding

**Low-vision users:**
- The "good first issue" label renders with a distinct background color (typically light purple or teal); in high-contrast mode it uses system highlight colors with readable text
- Filter results may include issues with multiple labels stacked together; at high zoom, labels wrap to a second line but remain readable
- Bookmark the filtered URL (`/issues?q=is:open+label:"good first issue"`) in your browser for one-click access to beginner issues across your favorite repositories

**Sighted users:**
- The "good first issue" label is a GitHub convention recognized across the ecosystem; many projects also use "help wanted" for intermediate tasks
- Always comment before starting work -- even if unassigned -- to avoid duplicating effort with another contributor who may already be working quietly
- Read the issue's linked PR history (if any) to see whether previous attempts were made and why they were closed; this saves you from repeating known dead ends


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

### Learning Cards: Accessibility-Specific Issue Writing

**Screen reader users:**
- Always quote the exact text your screen reader announced in the issue body; wrap it in a fenced code block so readers know it is literal output, not your description
- Include your screen reader name and version (e.g., "NVDA 2025.3.3") plus browser and OS; this lets maintainers reproduce with the same toolchain
- Test with a second screen reader or browser if possible and note the results -- "Also fails in JAWS 2026 with Chrome; works in VoiceOver with Safari" dramatically narrows the debugging scope

**Low-vision users:**
- When filing zoom or contrast bugs, state your exact zoom level and whether you use Windows High Contrast, macOS Increase Contrast, or a browser extension
- Screenshots are powerful evidence; annotate them (circle the problem area, add a text callout) and always include alt text describing what the screenshot shows
- Note whether the issue occurs only at certain zoom levels or viewport widths; a bug at 400% that disappears at 200% points to a CSS breakpoint problem

**Sighted users:**
- Even if you do not use assistive technology, you can file accessibility issues by testing with keyboard-only navigation (Tab, Enter, Escape) and noting where focus is lost or trapped
- Include the ARIA role or attribute involved if you can identify it from browser DevTools (e.g., "The button has `role=presentation` and no accessible name")
- Link to the relevant WCAG success criterion when possible (e.g., "Fails WCAG 2.1 SC 1.3.1 Info and Relationships"); this gives maintainers a clear standard to design against


## Writing Effective Issues

> **See also:** [Appendix N: Advanced Search](appendix-n-advanced-search.md) covers search qualifiers to find existing issues before filing a new one.

A well-written issue saves everyone time -- the maintainer who reads it, the contributor who fixes it, and the future searcher who finds it six months later. This section gives you reusable templates for the two most common issue types and a set of principles that apply to every issue you file.

### Bug Report Structure

A strong bug report answers five questions. Use this template every time you report something broken.

| Section | What to write |
|---|---|
| **Title** | Follow the formula: "When I [action], [unexpected result] instead of [expected result]" |
| **Steps to Reproduce** | Numbered list -- start from the earliest relevant step |
| **Expected Behavior** | What *should* happen according to documentation or common sense |
| **Actual Behavior** | What *does* happen -- include exact error messages or screenshots |
| **Environment** | OS, browser, screen reader, app version -- anything that might matter |

The title formula is the most important part. A title like "When I press Enter on the Submit button, nothing happens instead of creating the issue" tells the maintainer exactly what is broken before they even open the issue.

> **Screen reader tip:** When pasting error messages into the Actual Behavior section, wrap them in a fenced code block (triple backticks). Screen readers will announce "code block" so the listener knows the text is a literal error, not your description.

**Steps to Reproduce matter more than you think.** Maintainers cannot fix what they cannot recreate. Number every step, starting from a clean slate -- "Open the repository" is better than "Go to the page." Include what you clicked, what keyboard shortcut you pressed, and what happened after each step.

### Feature Request Structure

Feature requests work best when they focus on the *problem* before jumping to the solution. Use this four-part structure:

1. **Problem statement** -- Describe the pain point. What are you trying to do, and why is it hard or impossible right now?
2. **Proposed solution** -- Your best idea for fixing the problem. Be specific enough to discuss, but hold it loosely.
3. **Alternatives considered** -- Other approaches you thought about and why they fell short. This shows you have done your homework.
4. **Who benefits** -- Name the audience. "Screen reader users navigating large repositories" is more compelling than "everyone."

A feature request that starts with "I want a dark mode toggle" is weaker than one that starts with "Low-vision users report eyestrain after 20 minutes because the current theme has insufficient contrast." The second version gives maintainers something to design around.

### General Issue Writing Principles

These rules apply to every issue -- bugs, features, questions, and everything in between.

**One issue per problem.** If you discovered two bugs during the same session, file two separate issues. Combining them makes it impossible to close one without the other and clutters the conversation.

**Write searchable titles.** Future contributors will search before filing. "Bug with button" will never surface in a search for "Submit button unresponsive on Safari." Front-load the title with the specific component or action.

**Include context, not assumptions.** Instead of "The API is broken," write "The `/repos` endpoint returns a 403 when I pass a valid token." Let maintainers draw their own conclusions from the evidence you provide.

**Link related issues.** If your bug might be connected to issue #42, mention it: "This might be related to #42." GitHub automatically creates a back-link, building a web of context that helps everyone. You will learn more about cross-referencing in [Chapter 6](06-working-with-pull-requests.md).

| Principle | Bad example | Good example |
|---|---|---|
| One issue per problem | "The button is broken and also the logo is wrong" | Two separate issues, each with its own title |
| Searchable title | "Help needed" | "Keyboard focus lost after closing modal dialog" |
| Context over assumptions | "Nothing works" | "After upgrading to v2.3, the dashboard returns a blank page on Firefox 124" |
| Link related issues | (no mention) | "Possibly related to #42 -- same component, different trigger" |

### Before and After: A Vague Issue vs. a Clear Issue

**Vague issue (hard to act on):**

> **Title:** Bug
>
> It doesn't work. I tried clicking and nothing happened. Please fix.

The maintainer has to ask: What doesn't work? Where did you click? What browser? What did you expect? Every follow-up question costs a round-trip of waiting.

**Clear issue (ready to fix):**

> **Title:** When I press Enter on the "New issue" button, nothing happens instead of opening the issue form
>
> **Steps to Reproduce:**
> 1. Navigate to github.com/org/repo
> 2. Press `G` then `I` to go to the Issues tab
> 3. Tab to the "New issue" button
> 4. Press `Enter`
>
> **Expected:** The new issue form opens.
>
> **Actual:** The page does not respond. No error in the console.
>
> **Environment:** Windows 11, Firefox 128, JAWS 2025

The maintainer can reproduce this in under a minute. No follow-up questions needed -- the fix can start immediately.

> **Screen reader tip:** You can use the issue template feature in GitHub to pre-fill these sections automatically. If the repository provides templates, your screen reader will announce each section heading as you Tab through the form. You will set up your own issue templates in [Chapter 9](09-managing-your-project.md).

### Learning Cards: Writing Effective Issues

<details>
<summary>Screen reader users</summary>

- Use fenced code blocks (triple backticks) when pasting error messages or screen reader output; your screen reader announces "code block" so listeners know the text is literal, not description
- When writing "Steps to Reproduce," type each step as a numbered Markdown list item (`1.`, `2.`, etc.) so screen readers announce "list with N items"
- Type `#` in the comment body to trigger issue autocomplete; press `Down Arrow` to navigate matching issues and `Enter` to insert a cross-reference link

</details>

<details>
<summary>Low vision users</summary>

- Use the Preview tab (next to Write) to check your Markdown rendering before submitting; headings, bold text, and code blocks are much easier to proofread in rendered form
- Screenshots with alt text are valuable evidence; add them with the image button in the formatting toolbar or drag-and-drop into the body field
- Keep paragraphs short (3-4 sentences max) so the issue is scannable at high zoom without excessive scrolling

</details>

<details>
<summary>Sighted users</summary>

- A well-structured issue uses H2 headings (##) for major sections: What happened, Expected, How to reproduce, Environment
- GitHub renders Markdown tables in issue bodies; use a table to compare expected vs. actual behavior side by side
- The title appears in issue lists, email notifications, and search results; front-load it with the specific component or action for discoverability

</details>


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

### Learning Cards: Filing Your First Issue

**Screen reader users:**
- After pressing `Ctrl+Enter` to submit, listen for the page reload; GitHub navigates to your new issue page where the title is the first heading -- press `1` to confirm it matches what you typed
- Navigate the issue list with `3` (heading level 3) to jump between issue titles; this is faster than arrowing through every element on the page
- If the template picker appears, use `Tab` and `Enter` to select "Open a blank issue"; template names are announced as link text

**Low-vision users:**
- The "New issue" button is prominent and green on the Issues list page; at high zoom it remains visible near the top of the page and does not collapse into a menu
- The title field is full-width and the body field expands as you type; both are easy to locate and target at any zoom level
- After submitting, your new issue page shows your avatar, title, and description in high-contrast-friendly layout; verify the content rendered correctly before moving on

**Sighted users:**
- Your issue immediately appears at the top of the Issues list; the green "Open" badge confirms it was created successfully
- Read a few other students' introduction issues and leave a comment to practice the commenting workflow from the Leaving a Comment section
- Notice how the issue number (e.g., #150) is auto-assigned and appears in the URL and page title; you will use this number for cross-references later


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

---

*Next: [Chapter 06: Working with Pull Requests](06-working-with-pull-requests.md)*  
*Back: [Chapter 04: The Learning Room](04-the-learning-room.md)*  
*Related appendices: [Appendix N: Advanced Search](appendix-n-advanced-search.md) | [Appendix V: GitHub Mobile](appendix-v-github-mobile.md)*

