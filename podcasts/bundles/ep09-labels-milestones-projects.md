# Git Going with GitHub - Audio Series

## Episode 9: Labels, Milestones, and Projects

**Series:** Git Going with GitHub
**Episode:** 9 of 44
**Audience:** Blind and low-vision developers learning GitHub and open source
**Estimated length:** 12-15 min


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

- How labels organize and categorize issues and pull requests
- Creating, applying, and filtering by labels
- Milestones: grouping work toward a shared goal
- GitHub Projects: boards, tables, and roadmap views
- How these tools help teams coordinate at scale


### Concept Coverage Checklist

Every concept below MUST be explained during the episode. Do not skip any.
When a concept is complex, use an analogy or real-world comparison to make it concrete.

- [ ] **What labels are: color-coded tags for categorizing issues and PRs**
- [ ] **Default labels GitHub provides: bug, enhancement, documentation, etc.**
- [ ] **Viewing the labels page on a repository**
- [ ] **Applying a label to an issue or pull request**
- [ ] **Filtering issues by label**
- [ ] **Creating a new custom label with name, description, and color**
- [ ] **What milestones are: grouping issues toward a release or goal**
- [ ] **Creating a milestone with a due date**
- [ ] **Adding issues to a milestone and tracking progress**
- [ ] **Introduction to GitHub Projects: the new project boards**
- [ ] **Board view, table view, and roadmap view (overview)**
- [ ] **How labels, milestones, and projects work together for team coordination**
- [ ] **Using gh commands for label and milestone management**

### Prerequisites (briefly recap these)

Listeners may have heard these earlier episodes. Briefly remind them of:

- Episode 5: Issues and how labels appear on them

### Cross-Referenced Material

The following supplementary content is included after the primary source.
Reference it naturally when a concept would benefit from additional context,
but keep the main narrative focused on the primary chapter.

- GitHub Projects Deep Dive - boards, tables, custom fields

### Primary Source Material

# Labels, Milestones, and Projects
> **Listen to Episode 9:** [Labels, Milestones, and Projects](../PODCASTS.md) - a conversational audio overview of this chapter. Listen before reading to preview the concepts, or after to reinforce what you learned.

## Organizing Work and Cross-Referencing on GitHub

> Labels, milestones, and projects are the organizational layer of GitHub. They turn a chaotic list of issues into a structured, navigable, prioritized body of work.


## Labels

### What Are Labels?

Labels are colored tags applied to issues and pull requests. They communicate at a glance what category, priority, or status an item belongs to. When you scan the issue list with your screen reader, labels are announced alongside each issue title.

Labels are announced as: "Label: bug" or "Labels: accessibility, good first issue" depending on how many are applied.

### Standard Labels You Will Find in Most Repos

| Label | Purpose |
|-------|---------|
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

**Reading a milestone:**
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


## Cross-References

Cross-references are links between issues, PRs, and commits. GitHub automatically renders `#42` as a link to issue or PR #42. This creates a web of context so any contributor can trace the history of a decision.

### Types of Cross-References

| Syntax | Effect |
|--------|--------|
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


## GitHub Projects

### What Is a GitHub Project?

GitHub Projects is a built-in project management tool. It can display issues and PRs from across multiple repositories in one view. Projects support three layouts:

| Layout | Description | Best For |
|--------|-------------|----------|
| **Table** | Spreadsheet-style with custom fields | Tracking detailed status |
| **Board** | Kanban columns (Todo, In Progress, Done) | Visual workflow |
| **Roadmap** | Timeline/Gantt view | Planning across time |

### Finding a Project

From an organization page or repository:
1. Navigate to the "Projects" tab
2. Press `3` to navigate project titles (they are h3 links)
3. `Enter` to open a project

### Navigating a Project - Table View

```
Step 1: The main content is a large grid/table
Step 2: T to jump to the table
Step 3: Ctrl+Alt+↓ to navigate rows (each row is an issue or PR)
Step 4: Ctrl+Alt+→ to navigate columns (Title, Status, Priority, etc.)
Step 5: Enter on a row to open the issue/PR detail panel
```

**What is announced per row:**
"Add keyboard navigation to carousel | Status: In Progress | Assignee: username | Priority: High"

### Navigating a Project - Board View

```
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


## Practical Organization Strategy for the Hackathon

Here is a recommended structure for the `learning-room` sandbox project:

### Labels to create
```
accessibility      - all a11y-related work
documentation      - docs-only changes
good first issue   - for new contributors
in progress        - being actively worked on
needs review       - PR is open, review needed
blocked            - waiting on something external
help wanted        - community assistance requested
```

### Milestone to create
```
Name: Hackathon Day 1 Deliverables
Due: [Day 1 date]
Description: All contributions made during Day 1 of the Open Source AT Hackathon
```

### Workflow
```
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
> - **In VS Code** - `@issue-tracker find open issues labeled accessibility, severity-high` uses the exact label vocabulary you configured today, delivering prioritized cross-repository results with community engagement and release-impact scoring
> - **In your repo** - Accessibility Agents forks carry the label schema in `.github/ISSUE_TEMPLATE/`; your project's organizational language travels with every clone and does not require manual recreation
> - **In the cloud** - GitHub Agentic Workflows apply labels automatically when issues are opened, routing work into the right milestone and Project view without manual triage on every item - but only if your labels were designed with clear, consistent intent
>
> *Labeling today is not overhead. It is configuring the input layer that every agent downstream depends on.*


*Next: [Notifications](10-notifications.md)*
*Back: [Culture and Etiquette](08-culture-etiquette.md)*
*Related: [Working with Issues](04-working-with-issues.md) | [Day 1 Agenda](admin/DAY1_AGENDA.md)*



### Supplementary: GitHub Projects Deep Dive - boards, tables, custom fields

# Appendix I: GitHub Projects Deep Dive
> **Listen to Episode 26:** [GitHub Projects Deep Dive](../PODCASTS.md) - a conversational audio overview of this chapter. Listen before reading to preview the concepts, or after to reinforce what you learned.

## Boards, Tables, Roadmaps, Automations, and Accessible Navigation

> GitHub Projects is GitHub's built-in project management system. It connects issues and pull requests from one or more repositories into a living, filterable view that your whole team can see and act on. This appendix covers everything beyond the basics introduced in [Chapter 9: Labels, Milestones, and Projects](09-labels-milestones-projects.md).


## Table of Contents

1. [Projects v2: What Changed](#1-projects-v2-what-changed)
2. [Creating a Project](#2-creating-a-project)
3. [The Three Layouts in Depth](#3-the-three-layouts-in-depth)
4. [Custom Fields](#4-custom-fields)
5. [Adding and Managing Items](#5-adding-and-managing-items)
6. [Built-In Automations](#6-built-in-automations)
7. [Iterations (Sprints)](#7-iterations-sprints)
8. [Views and Filters](#8-views-and-filters)
9. [Cross-Repository Projects](#9-cross-repository-projects)
10. [Screen Reader Navigation Reference](#10-screen-reader-navigation-reference)
11. [Accessibility Agents: `/project-status`](#11-accessibility-agents-project-status)
12. [Exercises](#12-exercises)


## 1. Projects v2: What Changed

GitHub has two generations of project tooling. The current generation - called **Projects (v2)** - is what you'll find on any repository or organization page today.

| Feature | Classic Projects (v1) | Projects v2 (current) |
|---|---|---|
| Layouts | Kanban board only | Board, Table, Roadmap |
| Custom fields | None | Text, Number, Date, Select, Iteration |
| Automations | None built-in | Native GitHub Actions integration |
| Cross-repo | No | Yes |
| Filtering | Limited | Full field/label/assignee/status queries |
| API | Limited | Full GraphQL support |

If you see "Projects (Beta)" references in older documentation, those referred to the early rollout of v2. It is now stable and the default.


## 2. Creating a Project

Projects can be created at the **organization level** (shared across all repos in an org) or at the **repository level** (scoped to one repo).

### Create from an Organization

1. Navigate to your organization page (`github.com/your-org`)
2. Select the **Projects** tab
3. Activate **"New project"** button
4. Choose a template (blank table, blank board, feature release, etc.) or start empty
5. Give the project a name and select **"Create project"**

### Create from a Repository

1. Navigate to any repository
2. Select the **Projects** tab
3. Activate **"Link a project"** or **"New project"**
4. Follow the same template/name flow

### Screen Reader: Project Creation

```
1. Navigate to org or repo Projects tab
   → Tab to the green "New project" button → Enter
2. Template modal opens
   → Arrow keys to browse template cards
   → Enter to select a template
3. Name field: type your project name
4. "Create project" button: Tab → Enter
5. You land on the new empty project
```


## 3. The Three Layouts in Depth

### Table View

The default layout. A spreadsheet-style grid where each row is an issue, PR, or draft item. Columns are fields (Title, Status, Assignee, Labels, Priority, custom fields you create).

**What it's best for:** Bulk editing, sorting, filtering, seeing many items at once with their field values.

**Keyboard navigation:**
```
T                     → Jump to table
↑/↓                   → Move between rows
←/→                   → Move between columns
Enter                 → Open item detail panel (right sidebar)
Escape                → Close detail panel
Space (on a cell)     → Edit that cell's value
F2 (on title cell)    → Edit title inline
```

**Screen reader output per row:**
> "Fix keyboard trap in modal dialog | Status: In Progress | Assignee: alice | Priority: High | Labels: bug, accessibility"

### Board View

Kanban-style columns. Each column represents a status value. Cards can be dragged between columns (or updated via keyboard by editing the Status field).

**What it's best for:** Visual workflow tracking, seeing WIP (work in progress), standup-style status reviews.

**Screen reader note:** Drag-and-drop is not keyboard accessible. Change a card's column by opening it and editing the Status field instead.

**Keyboard navigation:**
```
Tab                   → Move between columns and cards
Enter (on a card)     → Open item detail panel
B                     → Jump to board regions (if heading navigation)
Within a card:
  Enter               → Open panel
  Space               → Toggle selection (for bulk moves)
```

**Change a card's column without dragging:**
1. `Enter` to open the card
2. Navigate to the **Status** field in the right panel
3. Activate the Status dropdown
4. Select the new column value
5. `Escape` to close

### Roadmap View

A horizontal timeline. Items appear as bars spanning their start/due dates. Iterations and milestones can be visualized against real calendar time.

**What it's best for:** Release planning, sprint capacity planning, communicating timelines to stakeholders.

**Screen reader note:** Roadmap is chart-based. The underlying data is still fully accessible via the Table view - treat Roadmap as a visual summary, and use Table for all editing.

**Setting dates:**
- Add a **Date** custom field (e.g., "Start Date", "Due Date") or use a **Milestone** field
- Items without dates appear in the ungrouped section


## 4. Custom Fields

This is one of Projects v2's most powerful features. You can add fields beyond the GitHub defaults (Title, Assignee, Labels, Milestone, Repository).

### Field Types

| Type | Use Case | Example |
|---|---|---|
| **Text** | Free-form notes | "Acceptance criteria", "Design link" |
| **Number** | Story points, estimates | "Points: 3" |
| **Date** | Deadlines, start dates | "Due: 2025-06-15" |
| **Single select** | Priority, size, type | Priority: P0 / P1 / P2 |
| **Iteration** | Sprint/cycle tracking | See Section 7 |

### Creating a Custom Field

From any project view:
1. In Table view, scroll right to the `+` button at the end of the column header row
2. Activate the `+` button
3. Select a field type
4. Name the field and configure options (for select fields, type each option, press Enter to add more)
5. Confirm - the field appears as a new column

**Screen reader path:**
```
Tab to "+" column header button → Enter
→ Field type menu opens → ↑/↓ to choose type → Enter
→ Name field: type field name
→ For "Single select": type option names, Tab/Enter between options
→ "Save" button → Enter
```

### Editing a Field Value on an Item

1. In Table view, navigate to the cell where the field intersects the row
2. `Enter` or `Space` to activate the editor
3. Type value (text/number) or select from dropdown (single select)
4. `Enter` or `Tab` to confirm


## 5. Adding and Managing Items

### Add an Existing Issue or PR

From any project view:
1. Activate the **"+ Add item"** button at the bottom of a table/column
2. Type `#` to trigger the issue/PR search
3. Type a keyword or issue number
4. Select the item - it's added to the project
5. The issue/PR is now tracked in the project; it still lives in its repository

**Tip:** The issue itself will now show which projects it belongs to in its sidebar.

### Add a Draft Issue

Draft issues live only inside the project (not in any repository) until you promote them.

1. Activate **"+ Add item"**
2. Type the title directly (no `#`)
3. Press `Enter` - a draft row appears
4. Open the draft → **"Convert to issue"** button → select the repository

**When to use drafts:** Capturing ideas during planning before you're ready to commit them to a repo.

### Promote a Draft to an Issue

1. Open the draft item (`Enter` on the row)
2. Activate **"Convert to issue"** in the panel
3. Select the target repository from the dropdown
4. Confirm - the draft becomes a real issue in that repo

### Bulk Edit Items

In Table view:
1. Check the checkbox on each row (first column, `Space` to toggle)
2. A bulk action bar appears at the top
3. Options: change Status, assign label, change assignee, archive, delete


## 6. Built-In Automations

Projects v2 has native automation rules - no GitHub Actions YAML required.

### Accessing Automations

From a project:
1. Select the `...` menu (project overflow) in the top-right
2. Select **"Workflows"**
3. You'll see a list of built-in automation rules you can enable/disable

### Available Built-In Workflows

| Workflow | What It Does |
|---|---|
| **Item added to project** | When an item is manually added, set its Status to a chosen value |
| **Item reopened** | When an issue/PR is reopened, change its Status (e.g., back to "In Progress") |
| **Item closed** | When an issue/PR is closed, set Status to "Done" automatically |
| **Pull request merged** | When a PR is merged, set its Status to "Done" |
| **Auto-add to project** | Items matching a filter (by label, type, repo) are automatically added to the project |

### Setting Up Auto-Add

This is the most powerful workflow for maintainers:

1. In **Workflows**, select **"Auto-add to project"**
2. Toggle it **On**
3. Configure the filter: e.g., `label:accessibility is:issue` adds any new issue with the accessibility label automatically
4. Save

Now any matching issue in linked repos is added to your project the moment it's filed - no manual triage step required.

### GitHub Actions Integration

For more complex automations, Projects v2 has a full GraphQL API and works with GitHub Actions. Example use cases:
- Auto-assign items based on repository when added
- Set due dates based on linked milestone
- Send Slack notifications when high-priority items are added

See [Appendix Q: GitHub Actions and Workflows](appendix-q-github-actions-workflows.md) for the foundation, and the [GitHub documentation on automating projects](https://docs.github.com/en/issues/planning-and-tracking-with-projects/automating-your-project) for advanced patterns.


## 7. Iterations (Sprints)

An **iteration** field lets you group work into time-boxed cycles - sprints, weeks, or any cadence you choose.

### Creating an Iteration Field

1. Add a new field (the `+` column button in Table view)
2. Select **"Iteration"** as the field type
3. Name it (e.g., "Sprint")
4. Set the iteration duration (1 week, 2 weeks, custom)
5. GitHub automatically generates current and upcoming iterations

### Using Iterations

- Each item can be assigned to an iteration via the Iteration field
- In Board view, you can group by iteration to see a sprint board
- In Roadmap view, iterations appear as blocks on the timeline
- **Burndown:** No built-in burndown chart, but the Insights charts (see below) can show progress

### Iteration Insights

From any project:
1. Select the **Insights** tab (the bar chart icon)
2. Select **"Current iteration"**
3. See: items by status, completion rate, items added vs closed over time


## 8. Views and Filters

A **view** is a saved configuration of layout + filters + grouping + sort. You can have many views on one project, each showing a different slice of the data.

### Creating a View

1. Activate the **"+ New view"** button in the view tab bar
2. Choose layout (Table, Board, Roadmap)
3. Configure filters, grouping, sort
4. The view saves automatically with a default name - rename by clicking/activating the tab label

### Filter Syntax

The filter bar accepts a query language similar to GitHub's issue search:

| Query | Meaning |
|---|---|
| `status:In Progress` | Show only items with that Status value |
| `assignee:@me` | Show only items assigned to you |
| `label:accessibility` | Items with the accessibility label |
| `milestone:"v2.0"` | Items in a specific milestone |
| `no:assignee` | Items with no assignee |
| `is:pr` | Only pull requests |
| `is:issue` | Only issues |
| `repo:owner/name` | Items from a specific repo (cross-repo projects) |

Combine filters: `assignee:@me status:"In Progress"` shows your in-progress work.

### Grouping

In Table or Board view, you can group rows:
1. Select **"Group by"** in the view configuration menu
2. Choose any field: Status, Assignee, Priority, Iteration, Label, Repository
3. Items are collapsible into group sections

### Sorting

Multiple sort levels are supported. Primary sort → secondary sort:
- Priority ascending, then due date ascending


## 9. Cross-Repository Projects

A single project can track issues and PRs from **multiple repositories** - including repos in different organizations (if you have access).

### Add a Repository to a Project

1. In project settings (the `...` overflow menu → **"Settings"**)
2. Select **"Manage access"** → **"Add repository"**
3. Search and select additional repositories
4. Items from those repos can now be added to the project

### Using the Repository Field

When a project spans multiple repos, the **"Repository"** field lets you see - and filter by - which repo each item belongs to:

```
Filter: repo:community-access/accessibility-agents
→ Show only accessibility-agents issues in this cross-repo project
```

**Common use case:** An organization project tracking all accessibility bugs across every repo, labeled `accessibility`, with Auto-add enabled.


## 10. Screen Reader Navigation Reference

### Project Home Page (list of projects)

```
3 → Jump to project titles (they are h3 links)
Enter → Open a project
```

### Inside a Project - General

```
Tab → Move between interactive elements (view tabs, filters, fields, buttons)
F6 → Cycle between major panels (header, view tabs, content area)
/ → Focus the filter bar (if supported; otherwise Tab to reach it)
```

### Table View

```
T or Region → Jump to the table data region
↑/↓ → Navigate rows
←/→ → Navigate columns within a row
Enter → Open item detail panel
Space → Toggle row selection
Escape → Close detail panel or cancel edit
F2 → Edit a title cell if focused
```

**NVDA note:** Use Browse mode (NVDA+Space to toggle) to read all cell content, then App mode (NVDA+Space again) for interactive editing. NVDA announces cell content as you navigate with arrow keys.

**JAWS note:** Use JAWS cursor (JAWS+P) to read grid cell content. For interactive editing, press Enter to enter application mode in the table.

**VoiceOver note:** Use VO+Shift+↓ to interact with the table. VO+←/→ moves between cells. Press VO+Space to activate a cell for editing.

### Board View

```
Tab → Move between cards and column headers
Enter (on card) → Open detail panel
The "Status" field in the panel → Change the card's column
```

### Detail Panel (right sidebar, any view)

```
Tab → Move between fields
Enter/Space → Activate a field editor
Select dropdowns → ↑/↓ to navigate options, Enter to select
Escape → Close the dropdown or the panel
```

### Filter Bar

```
Click/Tab to filter bar → type query → Enter to apply
Backspace → Remove last filter token
Escape → Clear focus from filter bar
```


## 11. Accessibility Agents: `/project-status`

The **`/project-status`** command from Accessibility Agents gives you a live project board overview directly in VS Code Copilot Chat, without opening a browser.

### What It Shows

```
/project-status community-access/accessibility-agents
```

- Items per column (Todo, In Progress, Done, etc.) with assignees and average age
- Blocked items (labeled "blocked" or flagged with a field value)
- Stale items - in the same column for 7+ days with no activity
- Unassigned items in active columns
- Team member workload (anyone with 5+ items in progress)
- Sprint/iteration progress if an Iteration field is configured

### Example Output

```
GitHub Project: Accessibility Agents Roadmap (3 active views)

Column Breakdown:
┌─────────────┬───────┬──────────────────┬─────────┬──────────────┐
│ Column      │ Items │ Assignees        │ Avg Age │ Stale (7d+) │
├─────────────┼───────┼──────────────────┼─────────┼──────────────┤
│ To Do       │   8   │ @alice(3),@bob(2) │ 5 days  │     1       │
│ In Progress │   4   │ @charlie(2)       │ 3 days  │     0       │
│ In Review   │   2   │ --               │ 2 days  │     0       │
│ Done        │  23   │ --               │  --     │    --       │
└─────────────┴───────┴──────────────────┴─────────┴──────────────┘

Attention Items:
  Stale: "Update screen reader navigation guide" - In Review for 9 days, no activity
  Unassigned: "Triage accessibility bug backlog" in In Progress

After the overview: "Want to see a specific column or check a team member's workload?"
```

### When to Use It

- During standup: quick status snapshot without leaving VS Code
- Before filing a new issue: see if it's already tracked
- During sprint planning: identify stale and blocked items before the next cycle
- After a weekend: catch up on what moved while you were away


## 12. Exercises

### Exercise 1: Create a Personal Tracking Project

1. Create a new project at the organization level: name it "My Workshop Contributions"
2. Add the **Board** layout
3. Add a custom **Priority** field with options: P0, P1, P2
4. Add your fork of `accessibility-agents` as a linked repository
5. Add any open issue you've filed to the project

### Exercise 2: Set Up Automation

1. In your project's **Workflows**, enable **"Item closed"** → Status: Done
2. File a test issue in your fork
3. Close that issue
4. Verify it moved to "Done" automatically in the project board

### Exercise 3: Create a Sprint View

1. Add an **Iteration** field named "Sprint" with 2-week iterations
2. Assign your existing project items to the current sprint
3. Switch to **Roadmap** view - observe the items on the timeline
4. Check **Insights** to see the current iteration burndown

### Exercise 4: Cross-Repo Project (Advanced)

1. Create a cross-repo project connected to two of your repositories
2. Add the **Repository** field to the Table view
3. Create a view filtered to `is:issue label:accessibility`
4. Set up Auto-add: any issue with the `accessibility` label in those repos goes to this project automatically


> **From Chapter 9:** For the introductory coverage of Labels, Milestones, and Projects including screen reader basics for getting started, see [Chapter 9: Labels, Milestones, and Projects](09-labels-milestones-projects.md).

*Return to: [Resources](appendix-u-resources.md) | [Glossary](appendix-a-glossary.md)*
