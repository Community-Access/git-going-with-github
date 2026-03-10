# Appendix I: GitHub Projects Deep Dive
>
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

**Layouts:** Classic v1 offered Kanban board only. V2 offers Board, Table, and Roadmap.

**Custom fields:** Classic v1 had none. V2 supports Text, Number, Date, Single Select, and Iteration fields.

**Automations:** Classic v1 had no built-in automations. V2 has native GitHub Actions integration.

**Cross-repo support:** Classic v1 did not support cross-repository tracking. V2 does.

**Filtering:** Classic v1 had limited filtering. V2 supports full field, label, assignee, and status queries.

**API:** Classic v1 had a limited API. V2 has full GraphQL support.

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

```text
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

#### Keyboard navigation

```text
T                     → Jump to table
↑/↓                   → Move between rows
←/→                   → Move between columns
Enter                 → Open item detail panel (right sidebar)
Escape                → Close detail panel
Space (on a cell)     → Edit that cell's value
F2 (on title cell)    → Edit title inline
```

#### Screen reader output per row
>
> "Fix keyboard trap in modal dialog | Status: In Progress | Assignee: alice | Priority: High | Labels: bug, accessibility"

### Board View

Kanban-style columns. Each column represents a status value. Cards can be dragged between columns (or updated via keyboard by editing the Status field).

**What it's best for:** Visual workflow tracking, seeing WIP (work in progress), standup-style status reviews.

**Screen reader note:** Drag-and-drop is not keyboard accessible. Change a card's column by opening it and editing the Status field instead.

#### Keyboard navigation

```text
Tab                   → Move between columns and cards
Enter (on a card)     → Open item detail panel
B                     → Jump to board regions (if heading navigation)
Within a card:
  Enter               → Open panel
  Space               → Toggle selection (for bulk moves)
```

#### Change a card's column without dragging

1. `Enter` to open the card
2. Navigate to the **Status** field in the right panel
3. Activate the Status dropdown
4. Select the new column value
5. `Escape` to close

### Roadmap View

A horizontal timeline. Items appear as bars spanning their start/due dates. Iterations and milestones can be visualized against real calendar time.

**What it's best for:** Release planning, sprint capacity planning, communicating timelines to stakeholders.

**Screen reader note:** Roadmap is chart-based. The underlying data is still fully accessible via the Table view - treat Roadmap as a visual summary, and use Table for all editing.

#### Setting dates

- Add a **Date** custom field (e.g., "Start Date", "Due Date") or use a **Milestone** field
- Items without dates appear in the ungrouped section


## 4. Custom Fields

This is one of Projects v2's most powerful features. You can add fields beyond the GitHub defaults (Title, Assignee, Labels, Milestone, Repository).

### Field Types

**Text:** Free-form notes for things like acceptance criteria or design links.

**Number:** Numeric values such as story points or estimates (for example, "Points: 3").

**Date:** Deadlines or start dates (for example, "Due: 2025-06-15").

**Single select:** A dropdown with predefined options, useful for priority, size, or type fields (for example, Priority: P0, P1, or P2).

**Iteration:** Sprint or cycle tracking. See Section 7 for details.

### Creating a Custom Field

From any project view:

1. In Table view, scroll right to the `+` button at the end of the column header row
2. Activate the `+` button
3. Select a field type
4. Name the field and configure options (for select fields, type each option, press Enter to add more)
5. Confirm - the field appears as a new column

#### Screen reader path

```text
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

**Item added to project:** When an item is manually added, its Status is set to a value you choose.

**Item reopened:** When an issue or pull request is reopened, its Status changes back (for example, to "In Progress").

**Item closed:** When an issue or pull request is closed, its Status is automatically set to "Done."

**Pull request merged:** When a pull request is merged, its Status is set to "Done."

**Auto-add to project:** Items matching a filter (by label, type, or repository) are automatically added to the project.

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

See [Appendix Q: GitHub Actions and Workflows](appendix-q-actions-workflows.md) for the foundation, and the [GitHub documentation on automating projects](https://docs.github.com/en/issues/planning-and-tracking-with-projects/automating-your-project) for advanced patterns.


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

`status:In Progress` shows only items with that Status value.

`assignee:@me` shows only items assigned to you.

`label:accessibility` shows items with the accessibility label.

`milestone:"v2.0"` shows items in a specific milestone.

`no:assignee` shows items with no assignee.

`is:pr` shows only pull requests. `is:issue` shows only issues.

`repo:owner/name` shows items from a specific repository, useful in cross-repo projects.

You can combine filters: `assignee:@me status:"In Progress"` shows your in-progress work.

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

```text
Filter: repo:community-access/accessibility-agents
→ Show only accessibility-agents issues in this cross-repo project
```

**Common use case:** An organization project tracking all accessibility bugs across every repo, labeled `accessibility`, with Auto-add enabled.


## 10. Screen Reader Navigation Reference

### Project Home Page (list of projects)

```text
3 → Jump to project titles (they are h3 links)
Enter → Open a project
```

### Inside a Project - General

```text
Tab → Move between interactive elements (view tabs, filters, fields, buttons)
F6 → Cycle between major panels (header, view tabs, content area)
/ → Focus the filter bar (if supported; otherwise Tab to reach it)
```

### Table View

```text
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

```text
Tab → Move between cards and column headers
Enter (on card) → Open detail panel
The "Status" field in the panel → Change the card's column
```

### Detail Panel (right sidebar, any view)

```text
Tab → Move between fields
Enter/Space → Activate a field editor
Select dropdowns → ↑/↓ to navigate options, Enter to select
Escape → Close the dropdown or the panel
```

### Filter Bar

```text
Click/Tab to filter bar → type query → Enter to apply
Backspace → Remove last filter token
Escape → Clear focus from filter bar
```


## 11. Accessibility Agents: `/project-status`

The **`/project-status`** command from Accessibility Agents gives you a live project board overview directly in VS Code Copilot Chat, without opening a browser.

### What It Shows

```text
/project-status community-access/accessibility-agents
```

- Items per column (Todo, In Progress, Done, etc.) with assignees and average age
- Blocked items (labeled "blocked" or flagged with a field value)
- Stale items - in the same column for 7+ days with no activity
- Unassigned items in active columns
- Team member workload (anyone with 5+ items in progress)
- Sprint/iteration progress if an Iteration field is configured

### Example Output

**GitHub Project: Accessibility Agents Roadmap** (3 active views)

**Column Breakdown:**

| Column | Items | Assignees | Avg Age | Stale (7d+) |
| --- | --- | --- | --- | --- |
| To Do | 8 | @alice (3), @bob (2) | 5 days | 1 |
| In Progress | 4 | @charlie (2) | 3 days | 0 |
| In Review | 2 | -- | 2 days | 0 |
| Done | 23 | -- | -- | -- |

**Attention Items:**
- Stale: "Update screen reader navigation guide" - In Review for 9 days, no activity
- Unassigned: "Triage accessibility bug backlog" in In Progress

After the overview: "Want to see a specific column or check a team member's workload?"

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
4. Add your fork of [accessibility-agents](https://github.com/Community-Access/accessibility-agents) as a linked repository
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

*Return to: [Resources](appendix-x-resources.md) | [Glossary](appendix-a-glossary.md)*
