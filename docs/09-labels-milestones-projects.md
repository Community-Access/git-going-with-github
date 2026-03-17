# Labels, Milestones, and Projects
>
> **Listen to Episode 9:** [Labels, Milestones, and Projects](../PODCASTS.md) - a conversational audio overview of this chapter. Listen before reading to preview the concepts, or after to reinforce what you learned.

> **Related appendices:** [Appendix R: Projects Deep Dive](appendix-r-projects-deep-dive.md) | [Appendix A: Glossary](appendix-a-glossary.md)
> **Authoritative sources:** [GitHub Docs: About labels](https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work/managing-labels) | [GitHub Docs: About milestones](https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work/about-milestones) | [GitHub Docs: About Projects](https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/about-projects)


## Organizing Work and Cross-Referencing on GitHub

> Labels, milestones, and projects are the organizational layer of GitHub. They turn a chaotic list of issues into a structured, navigable, prioritized body of work.


## Workshop Recommendation (Chapter 9)

Chapter 9 is a **guided triage chapter** focused on organization skills.

- **Challenge count:** 1 guided challenge
- **Automation check:** none by default
- **Evidence:** structured issue comment in assigned challenge issue
- **Pattern:** inspect, classify, explain

### Chapter 9 Challenge Set

1. **Post a triage recommendation** - read an issue, recommend labels/milestone/project placement, and explain your reasoning.

### Challenge 9.1 Step-by-Step: Triage Recommendation Comment

**Goal:** Read the details of a Learning Room issue and post a structured triage recommendation that a maintainer could act on immediately.

> **🛠️ Agentic Strategy:** Labels and issue states are how we wake up Agents. In the Day 2 Capstone, you can design an agent that only activates when an Issue gets a specific label (like \
eeds-review\ or \ccessibility-check\).

**Where you are working:** your assigned Chapter 9 challenge issue in the [learning-room](https://github.com/Community-Access/learning-room) repository on GitHub.com, plus one other open issue you will triage.

1. Open the **Issues** tab in the [learning-room](https://github.com/Community-Access/learning-room) repository.
2. Find any **open issue** that does not already have labels applied (or pick one your facilitator assigns).
3. Read the issue title and full description carefully. Note:
   - What type of work is it? (documentation fix, bug report, accessibility improvement, new content)
   - How urgent does it seem? (blocking other work, nice-to-have, unclear)
   - Which file or area of the repo does it affect?
4. Open your **assigned Chapter 9 challenge issue** (the one titled "Chapter 9.1: Triage Recommendation (@yourname)").
5. Scroll to the comment box and post a triage recommendation using this format:

```text
Chapter 9 triage recommendation for issue #[number]:
- Suggested labels: [pick 1-3 from: documentation, bug, accessibility, enhancement, good first issue]
- Suggested milestone: [pick one or write "none - reason"]
- Suggested project board column: [To Do, In Progress, or Needs Triage]
- One-sentence reason: [why you chose these categories]
```

6. If you have write access to the repository, apply the recommended labels and milestone directly on the issue you triaged.
7. Activate the **Comment** button.

**Screen reader tip:** When browsing available labels, open the Labels page (`/labels` path on the repo) to see all label names and descriptions. Your screen reader will read each label name and its description text.

**You are done when:** Your triage recommendation comment appears on your assigned challenge issue with all four fields filled in.

### Completing Chapter 9: Submit Your Evidence

Your triage recommendation comment is your evidence. Close your Chapter 9 challenge issue when done. If you also applied labels directly, mention that in your comment.

### Expected Outcomes

- Student can read an issue and recommend appropriate labels, milestone, and project placement.
- Student understands triage reasoning even without maintainer permissions.
- Student leaves a clear, reusable triage note that a maintainer could act on immediately.

### If You Get Stuck

1. Not sure which label to pick? Start with just one: `documentation`, `bug`, or `accessibility`. You can always add more.
2. Milestone is unclear? Write `none` and explain why - that is a valid triage decision.
3. Project board is unknown? Write `Needs Triage` - that is the correct default.
4. Not sure what the issue is about? Re-read the title and first paragraph. If still unclear, that itself is useful triage feedback ("Issue description is unclear - needs more detail").
5. Ask facilitator to review your one-sentence reason before posting.

### Learning Moment

Triage is about clarity, not authority. You do not need maintainer permissions to help organize work. A clear recommendation saves maintainers time and speeds up collaboration. This is a skill used daily in open source.

> **Continue learning:** The GitHub Skills course [Introduction to Repository Management](https://github.com/skills/introduction-to-repository-management) covers labels, milestones, and contributor settings in an interactive, self-paced format. See [Appendix Z](appendix-z-github-skills.md) for the full catalog.

### Learning Pattern Used in This Chapter

1. Inspect an issue carefully before acting (read before you write).
2. Classify work using a consistent vocabulary (labels, milestones).
3. Explain your reasoning in writing (one-sentence justification).
4. Build triage instincts that transfer to any open source project.


## Labels

### What Are Labels?

Labels are colored tags applied to issues and pull requests. They communicate at a glance what category, priority, or status an item belongs to. When you scan the issue list with your screen reader, labels are announced alongside each issue title.

Labels are announced as: "Label: bug" or "Labels: accessibility, good first issue" depending on how many are applied.

### Standard Labels You Will Find in Most Repos

| Label | Purpose |
| -------  | ---------  |
| `bug` | Something isn't working as expected |
| `enhancement` | A new feature or improvement |
| `documentation` | Changes or additions to documentation only |
| `good first issue` | Suitable for first-time contributors |
| `help wanted` | Maintainers are actively seeking community help |
| `question` | More information is needed before action |
| `invalid` | The issue doesn't meet the project's criteria |
| `wontfix` | The project won't address this (by design or out of scope) |
| `duplicate` | Another open issue covers the same topic |
| `accessibility` | Accessibility-related issue or change |
| `needs triage` | Not yet reviewed by a maintainer |

### Navigating to the Labels Page

From a repository:

<details>
<summary>Visual / mouse users</summary>

Go to the **Issues** tab, then click the **Labels** link/button (it’s in the filter toolbar above the issue list, next to Milestones). The Labels page shows every label with its colour, name, and description.

</details>

<details>
<summary>Screen reader users (NVDA / JAWS - Windows)</summary>

1. Navigate to the Issues tab
2. Press `K` to find the "Labels" link (near the "Milestones" link in the toolbar)
3. Press `Enter`

</details>

<details>
<summary>Screen reader users (VoiceOver - macOS)</summary>

1. Navigate to the Issues tab
2. Quick Nav `K` to find the "Labels" link (near the "Milestones" link in the toolbar)
3. `VO+Space` to activate

</details>

<details>
<summary>GitHub CLI (gh) alternative - viewing labels</summary>

List all labels in a repository from your terminal:

```bash
# List all labels with descriptions
gh label list

# List labels in a specific format
gh label list --json name,description
```

</details>

### Applying a Label to an Issue or PR

### Tool Cards: Apply a Label

**github.com (browser):**
1. Open the issue or PR.
2. In the right sidebar, click the gear icon next to **Labels**.
3. Select labels from the dropdown, then click outside to apply.

**github.dev (web editor):**
Not available -- labels are managed on the issue/PR page, not in the code editor.

**VS Code Desktop (GitHub Pull Requests extension):**
1. Open the issue in the **GitHub** sidebar panel.
2. Click the label area to add or remove labels.

**GitHub Desktop:**
Not directly supported. Use **Repository > View on GitHub** to manage labels in the browser.

**Git CLI / GitHub CLI:**
```bash
gh issue edit 42 --add-label "accessibility,good first issue"
gh pr edit 15 --add-label "documentation"
```

From an open issue or PR:

<details>
<summary>Visual / mouse users</summary>

In the right sidebar, click the gear icon () next to **Labels**. A dropdown opens showing all labels. Click a label to apply it (a checkmark appears). Click outside to close - the label appears immediately on the issue.

</details>

<details>
<summary>Screen reader users (NVDA / JAWS - Windows)</summary>

1. Navigate to the sidebar → press `H` or `3` to find the "Labels" heading
2. Activate the Labels gear/edit button (`B` until you hear "Labels" button → `Enter`)
3. Dropdown opens showing all available labels: use `↑/↓` to navigate
4. `Enter` to select or deselect a label; type to filter (e.g., type "access" to find "accessibility")
5. Press `Escape` to close - selections save automatically

</details>

<details>
<summary>Screen reader users (VoiceOver - macOS)</summary>

1. `VO+U` → Headings or Quick Nav `H` to find the "Labels" heading in the sidebar
2. Quick Nav `B` to find the "Labels" gear/edit button → `VO+Space`
3. Dropdown opens: `VO+Down` or arrow keys to navigate labels
4. `VO+Space` to select or deselect; type to filter
5. `Escape` to close - selections save automatically

</details>

<details>
<summary>GitHub CLI (gh) alternative - applying labels</summary>

Apply labels to issues or PRs from your terminal:

```bash
# Add a label to an issue
gh issue edit 42 --add-label "accessibility"

# Add multiple labels at once
gh issue edit 42 --add-label "bug,good first issue"

# Remove a label
gh issue edit 42 --remove-label "needs triage"

# Add a label to a PR
gh pr edit 42 --add-label "accessibility"
```

</details>

### Filtering Issues by Label

<details>
<summary>Visual / mouse users</summary>

- **Using the filter button:** From the Issues list, click the **Label** dropdown button above the issue list, choose the label(s) you want, then click outside to apply. The active filter shows in the search bar.
- **Using the search bar:** Click in the search/filter bar and type `label:accessibility` (for example) along with any other filters.

</details>

<details>
<summary>Screen reader users (NVDA / JAWS - Windows)</summary>

**Option A - Filter bar:** Press `F` → type `is:open label:accessibility` → `Enter`

**Option B - Filter button:** `B` → "Label" dropdown button → `Enter` → `↑/↓` to choose → `Enter` → `Esc`

**Option C - Combining labels:** `is:open label:accessibility label:"good first issue"`

</details>

<details>
<summary>Screen reader users (VoiceOver - macOS)</summary>

**Option A - Filter bar:** Quick Nav `F` to find the search bar → `VO+Shift+Down` to interact → type `is:open label:accessibility` → `Return`

**Option B - Filter button:** Quick Nav `B` → "Label" dropdown button → `VO+Space` → arrow keys to choose → `VO+Space` to select → `Esc`

**Option C - Combining labels:** `is:open label:accessibility label:"good first issue"`

</details>

<details>
<summary>GitHub CLI (gh) alternative - filtering by label</summary>

Filter issues by label from your terminal:

```bash
# List issues with a specific label
gh issue list --label "accessibility"

# Combine multiple labels
gh issue list --label "accessibility" --label "good first issue"

# Combine with state filter
gh issue list --label "accessibility" --state closed

# Search across labels
gh issue list --search "label:accessibility label:\"good first issue\""
```

</details>

### Creating a New Label

If you have write access:

1. Navigate to Issues → Labels page
2. Tab to "New label" button → Enter
3. Fill in: Label name (F for form field), Color (use the color picker or hex code), Description
4. Tab to "Create label" button → Enter

<details>
<summary>GitHub CLI (gh) alternative - creating labels</summary>

Create labels from your terminal:

```bash
# Create a new label
gh label create "accessibility" --description "Accessibility-related issue" --color "0075ca"

# Create with a specific color
gh label create "in progress" --description "Being actively worked on" --color "e4e669"
```

</details>

**Accessibility note for color:** Labels have color, but they also have a text name and description - the color is supplementary information. Screen readers announce the label name, not the color, so labels are fully accessible.

### Learning Cards: Labels

<details>
<summary>Screen reader users</summary>

- On the Issues list, labels are announced alongside each issue title: "Label: bug" or "Labels: accessibility, good first issue"
- Press `L` on an open issue (Focus Mode) to open the label picker directly; type to filter, `Down Arrow` to navigate, `Enter` to select
- When filtering issues by label, type `is:open label:accessibility` in the search bar and press `Enter`; the list updates to show only matching issues

</details>

<details>
<summary>Low vision users</summary>

- Labels appear as colored rounded rectangles next to issue titles in the list; in Windows High Contrast mode, labels use system border colors with readable text
- The Label dropdown from the sidebar gear icon is searchable: type the first few letters of a label name to filter the long list
- On the Labels management page (Issues tab, then Labels link), each label row shows its color swatch, name, and description in a table-like layout

</details>

<details>
<summary>Sighted users</summary>

- Labels appear as small colored pills next to issue titles in the Issues list; hover over a label to see its description in a tooltip
- Click the gear icon next to Labels in the issue sidebar to open a searchable dropdown; a checkmark appears next to selected labels
- The filter bar shows active label filters as text (e.g., `label:accessibility`); remove a filter by clicking the X next to it or clearing the search text

</details>


## Milestones

### What Are Milestones?

Milestones group issues and PRs toward a shared goal or deadline. Think of a milestone as a sprint, a version release, or an event (like "Hackathon Day 1 Deliverables"). A milestone shows:

- A title and optional description
- An optional due date
- A progress bar (percentage of closed issues vs total)

### Navigating to Milestones

From Issues tab:

1. Press `K` to find the "Milestones" link → Enter
2. You see a list of milestones, each with its title, progress, and due date

#### Reading a milestone

Each milestone is announced as a heading + progress information:

- "Hackathon Day 1 Deliverables, 3 of 8 issues closed, due April 20"

### Opening a Milestone

1. Press `3` to navigate milestone titles (they are h3 links)
2. Press `Enter` to open a milestone
3. The milestone detail page shows all issues and PRs belonging to it
4. Navigate the list with `3` (issue titles) or `I` (list items)

### Adding an Issue to a Milestone

<details>
<summary>Visual / mouse users</summary>

From the open issue, find the **Milestone** section in the right sidebar and click the gear icon. A dropdown lists available milestones - click one to assign it.

</details>

<details>
<summary>Screen reader users (NVDA / JAWS - Windows)</summary>

1. Navigate to the sidebar → "Milestone" heading (`H` or `3`)
2. Activate the Milestone gear button
3. Select a milestone from the dropdown (`↑/↓` → `Enter`)
4. `Esc` to close

</details>

<details>
<summary>Screen reader users (VoiceOver - macOS)</summary>

1. Quick Nav `H` or `VO+Cmd+H` to find the "Milestone" heading in the sidebar
2. Quick Nav `B` to find and activate the Milestone gear button (`VO+Space`)
3. Select a milestone from the dropdown (`VO+Down` or arrow keys → `VO+Space`)
4. `Esc` to close

</details>

<details>
<summary>GitHub CLI (gh) alternative - milestones</summary>

Manage milestones from your terminal:

```bash
# Assign an issue to a milestone
gh issue edit 42 --milestone "Hackathon Day 1"

# Remove from a milestone
gh issue edit 42 --milestone ""

# List issues in a milestone
gh issue list --milestone "Hackathon Day 1"
```

**Note:** Creating milestones requires the web interface or the GitHub API - the `gh` CLI does not have a `milestone create` command. Use `gh api` for advanced operations:

```bash
gh api repos/{owner}/{repo}/milestones -f title="Hackathon Day 1" -f description="Day 1 deliverables"
```

</details>

### Creating a Milestone

Requires write access:

1. Navigate to Milestones page
2. Tab to "New milestone" button → Enter
3. Fill in: Title, Description, Due date (optional)
4. Tab to "Create milestone" → Enter

**Due date field note:** The date field may render as a date picker. You can:

- Type the date in `YYYY-MM-DD` format directly (most reliable)
- Or use arrow keys to adjust month/day/year if spin buttons are provided
- Or press `Space` or `Enter` to open a calendar widget (if your screen reader supports it) and arrow through dates

Screen readers handle date pickers inconsistently - typing the date is most reliable across browsers.

### Learning Cards: Milestones

<details>
<summary>Screen reader users</summary>

- On the Milestones page, each milestone is an H3 heading link; it announces the title, progress ("3 of 8 issues closed"), and due date
- Press `Enter` on a milestone heading to open it; the detail page lists all assigned issues, navigable with `3` for titles or `I` for list items
- To assign an issue to a milestone, navigate to the sidebar "Milestone" heading (`H`), activate the gear button, then use `Up/Down Arrow` to select

</details>

<details>
<summary>Low vision users</summary>

- Each milestone row shows a progress bar (green fill) and a fraction like "3 / 8" next to the title; the bar is visible at any zoom level
- The due date appears as grey text to the right of the progress bar; at high zoom it may wrap below the title
- The due date field when creating a milestone accepts typed input in YYYY-MM-DD format, which is more reliable than using the date picker at high magnification

</details>

<details>
<summary>Sighted users</summary>

- Milestones are listed on the Milestones page (accessible from the Issues tab, via the "Milestones" link in the toolbar)
- Each milestone shows a green progress bar, an issue count (e.g., "3 of 8"), an optional due date, and a description
- When viewing an issue, the assigned milestone appears in the right sidebar; click the milestone name to see all issues in that milestone

</details>


## Cross-References

Cross-references are links between issues, PRs, and commits. GitHub automatically renders `#42` as a link to issue or PR #42. This creates a web of context so any contributor can trace the history of a decision.

### Types of Cross-References

| Syntax | Effect |
| --------  | --------  |
| `#42` | Links to issue or PR #42 in the same repo |
| `owner/repo#42` | Links to issue #42 in a different repository |
| `a1b2c3d` | Links to a specific commit by its SHA hash |
| `@username` | Notifies and links to a GitHub user's profile |
| `Closes #42` | Closes issue #42 when the PR merges |
| `Fixes #42` | Same as Closes - conventional for bugs |
| `Resolves #42` | Same as Closes - general use |
| `Refs #42` | Links without auto-closing |

### Typing a Cross-Reference

Inside any comment or PR description text area (Focus Mode):

1. Type `#` - a live-search dropdown appears
2. Continue typing the issue number or title fragment
3. Use `↓` to navigate the dropdown → `Enter` to select
4. The `#42` link is inserted automatically

For `@mentions`:

1. Type `@` followed by a username
2. A dropdown of suggestions appears
3. `↓` to navigate → `Enter` to select

### When the "Closes" Keyword Fires

The `Closes #42` keyword must appear in:

- The **PR description** (body text)
- A **commit message** pushed to the default branch

It does **not** fire from comments on the PR. If you write "Closes #42" in a comment, it creates a reference but does not auto-close the issue on merge.

### Learning Cards: Cross-References

<details>
<summary>Screen reader users</summary>

- Type `#` in any comment box (Focus Mode) to trigger a live-search dropdown of issues and PRs; press `Down Arrow` to navigate, `Enter` to insert the reference
- Type `@` followed by a username to trigger user autocomplete; press `Down Arrow` and `Enter` to insert the mention
- After a PR merges with `Closes #42` in the description, navigate to issue 42 and press `3` to find the "Closed by #XX" cross-reference comment

</details>

<details>
<summary>Low vision users</summary>

- Cross-reference links (`#42`, `@username`) render as blue clickable text in comments; they are distinct from surrounding text at any zoom level
- GitHub adds automatic back-links when you reference an issue or PR; look for them as timeline events (small text between comments) on the referenced item
- The `Closes #42` keyword in a PR description renders as a clickable link to the issue, with a small icon showing the issue's current state

</details>

<details>
<summary>Sighted users</summary>

- Typing `#` in a comment box opens a dropdown showing matching issues and PRs with their number, title, and open/closed state
- Cross-references create bidirectional links: issue 42 gets a timeline event "Referenced in PR #25" and the PR shows "Closes #42" as a clickable link
- Use `Closes #42`, `Fixes #42`, or `Resolves #42` in the PR description body (not in comments) to trigger automatic issue closure on merge

</details>


## GitHub Projects

> **See also:** [Appendix R: Projects Deep Dive](appendix-r-projects-deep-dive.md) covers advanced project board configuration, custom fields, and automation.

### What Is a GitHub Project?

GitHub Projects is a built-in project management tool. It can display issues and PRs from across multiple repositories in one view. Projects support three layouts:

| Layout | Description | Best For |
| --------  | -------------  | ----------  |
| **Table** | Spreadsheet-style with custom fields | Tracking detailed status |
| **Board** | Kanban columns (Todo, In Progress, Done) | Visual workflow |
| **Roadmap** | Timeline/Gantt view | Planning across time |

### Finding a Project

From an organization page or repository:

1. Navigate to the "Projects" tab
2. Press `3` to navigate project titles (they are h3 links)
3. `Enter` to open a project

### Navigating a Project - Table View

```text
Step 1: The main content is a large grid/table
Step 2: T to jump to the table
Step 3: Ctrl+Alt+↓ to navigate rows (each row is an issue or PR)
Step 4: Ctrl+Alt+→ to navigate columns (Title, Status, Priority, etc.)
Step 5: Enter on a row to open the issue/PR detail panel
```

#### What is announced per row

"Add keyboard navigation to carousel | Status: In Progress | Assignee: username | Priority: High"

### Navigating a Project - Board View

```text
Step 1: Switch to Board view using the view selector button
Step 2: Each column (Todo / In Progress / Done) is a region
Step 3: D to navigate between column landmarks
Step 4: Within a column: 3 to navigate card titles, I for list items
Step 5: Enter on a card to open the issue/PR panel
```

### Adding an Issue to a Project

From an open issue:

1. Navigate to the sidebar "Projects" section (`H` or `3`)
2. Activate the Projects gear button
3. Select the project from the dropdown

Or from within a project:

1. Activate "Add item" button at the bottom of a column/table
2. Type `#` to search for existing issues
3. Select the issue → it's added to the project

### Learning Cards: GitHub Projects

<details>
<summary>Screen reader users</summary>

- In Table view, press `T` to jump to the project table, then use `Ctrl+Alt+Down Arrow` for rows and `Ctrl+Alt+Right Arrow` for columns (Title, Status, Priority, Assignee)
- In Board view, press `D` to navigate between column landmarks (Todo, In Progress, Done), then `3` to jump between card titles within a column
- Press `Enter` on any card or table row to open the issue/PR detail panel without leaving the project view

</details>

<details>
<summary>Low vision users</summary>

- Board view shows issues as cards in vertical columns (Todo, In Progress, Done); each card displays the title, assignee avatar, and labels
- Table view is wider and has more columns; at high zoom, use horizontal scrolling to see columns like Priority and Assignee
- The view selector button (Table/Board/Roadmap) is near the top of the project page; it uses icon buttons that have text labels on hover

</details>

<details>
<summary>Sighted users</summary>

- Switch between Table, Board, and Roadmap views using the view selector buttons at the top of the project page
- Board view: drag and drop cards between columns, or click the Status field on a card to change it without dragging
- Table view: click column headers to sort, use the "+" button to add custom fields (Priority, Estimate, etc.), and click a row to open the issue detail panel

</details>


## Practical Organization Strategy for the Hackathon

Here is a recommended structure for the [learning-room](https://github.com/Community-Access/learning-room) sandbox project:

### Labels to create

```text
accessibility      - all a11y-related work
documentation      - docs-only changes
good first issue   - for new contributors
in progress        - being actively worked on
needs review       - PR is open, review needed
blocked            - waiting on something external
help wanted        - community assistance requested
```

### Milestone to create

```text
Name: Hackathon Day 1 Deliverables
Due: [Day 1 date]
Description: All contributions made during Day 1 of the Open Source AT Hackathon
```

### Workflow

```text
1. File an issue → add label + milestone
2. Comment "I'll work on this" → add "in progress" label
3. Make changes → open PR → link to issue
4. PR merged → issue closes automatically → milestone progress updates
```


## Try It: Label and Link

**Time:** 2 minutes | **What you need:** Browser, signed in to GitHub

Go to the Learning Room repository and do two things:

1. **Add a label to an issue** - Open any issue (press `G` then `I`, then `Enter` on an issue title). Press `L` (in Focus Mode) to open the label picker. Type `documentation` to filter, then press `Enter` to apply it. Press `Esc` to close.
2. **Use a cross-reference** - Leave a comment on that issue mentioning another issue number: `Related to #1` (or any issue number you've seen). Press `Ctrl+Enter` to submit.

**You're done.** You just organized work using labels and connected two issues with a cross-reference.

> **What success feels like:** The label now appears on the issue, and your cross-reference is a clickable link that connects the two issues. That's project management on GitHub - and you did it in under two minutes.


> ### Day 2 Amplifier - Accessibility Agents: `@issue-tracker` with Labels
>
> **Apply labels and milestones manually in today's exercises before using any agent.** Labels are the language that automation uses to filter, route, and prioritize work. If you have not designed and applied them yourself, you cannot configure them correctly for automated use - and you cannot tell when automation is applying the wrong ones.
>
> Once you have mastered manual organization:
>
> - **In VS Code** - `@issue-tracker find open issues labeled accessibility, severity-high` uses the exact label vocabulary you configured today, delivering prioritized cross-repository results with community engagement and release-impact scoring
> - **In your repo** - Accessibility Agents forks carry the label schema in `.github/ISSUE_TEMPLATE/`; your project's organizational language travels with every clone and does not require manual recreation
> - **In the cloud** - GitHub Agentic Workflows apply labels automatically when issues are opened, routing work into the right milestone and Project view without manual triage on every item - but only if your labels were designed with clear, consistent intent
>
> *Labeling today is not overhead. It is configuring the input layer that every agent downstream depends on.*

---

*Next: [Chapter 10: Notifications and Day 1 Close](10-notifications-and-day-1-close.md)*  
*Back: [Chapter 08: Open Source Culture](08-open-source-culture.md)*  
*Related appendices: [Appendix R: Projects Deep Dive](appendix-r-projects-deep-dive.md)*



