You are rewriting a podcast transcript for variety and teachability.
Use automatic model selection (no model is specified by caller).
Return ONLY the transcript text with valid speaker markers.

Hard format requirements:
- Allowed markers only: [ALEX], [JAMIE], [PAUSE]
- Marker line must be on its own line
- Keep script structure conversational and teachable
- Keep concept coverage aligned to source materials

Slug: ep26-github-projects
Title: Episode 26: GitHub Projects Deep Dive
Description: Project boards, table and roadmap views, custom fields, cross-repo management.

Concept checklist to preserve:
- GitHub Projects (new) versus Classic Project Boards
- Creating a new Project
- Board view: Kanban-style columns
- Table view: spreadsheet-style rows and columns
- Roadmap view: timeline-based planning
- Adding issues and pull requests to a Project
- Custom fields: text, number, date, single select, iteration
- Filtering and grouping items in a Project
- Cross-repository projects: tracking work across multiple repos
- Built-in automation: auto-add, auto-archive, status workflows
- Project workflows and actions integration

Source heading checklist to preserve (topic coverage, can paraphrase):
- ## Boards, Tables, Roadmaps, Automations, and Accessible Navigation
- ## Table of Contents
- ## 1. Projects v2: What Changed
- ## 2. Creating a Project
- ### Create from an Organization
- ### Create from a Repository
- ### Screen Reader: Project Creation
- ### Learning Cards: Creating a Project
- ## 3. The Three Layouts in Depth
- ### Table View
- #### Keyboard navigation
- #### Screen reader output per row
- ### Board View
- #### Keyboard navigation
- #### Change a card's column without dragging
- ### Roadmap View
- #### Setting dates
- ### Learning Cards: The Three Layouts
- ## 4. Custom Fields
- ### Field Types
- ### Creating a Custom Field
- #### Screen reader path
- ### Editing a Field Value on an Item
- ## 5. Adding and Managing Items
- ### Add an Existing Issue or PR
- ### Add a Draft Issue
- ### Promote a Draft to an Issue
- ### Bulk Edit Items
- ## 6. Built-In Automations
- ### Accessing Automations
- ### Available Built-In Workflows
- ### Setting Up Auto-Add
- ### GitHub Actions Integration
- ## 7. Iterations (Sprints)
- ### Creating an Iteration Field
- ### Using Iterations
- ### Iteration Insights
- ## 8. Views and Filters
- ### Creating a View
- ### Filter Syntax
- ### Grouping
- ### Sorting
- ## 9. Cross-Repository Projects
- ### Add a Repository to a Project
- ### Using the Repository Field
- ## 10. Screen Reader Navigation Reference
- ### Project Home Page (list of projects)
- ### Inside a Project - General
- ### Table View
- ### Board View
- ### Detail Panel (right sidebar, any view)
- ### Filter Bar
- ## 11. Accessibility Agents: `/project-status`
- ### What It Shows
- ### Example Output
- ### When to Use It
- ## 12. Exercises
- ### Exercise 1: Create a Personal Tracking Project
- ### Exercise 2: Set Up Automation
- ### Exercise 3: Create a Sprint View

Anti-repetition constraints:
- do not start with "Welcome to..." in most episodes
- do not use "And I am Jamie." as a fixed boilerplate line
- avoid repeating "orient, act, verify"
- avoid repeating "Carry the map"
- vary opening style across episodes; avoid repetitive intros
- avoid repeating long lines verbatim inside this script
- preserve the same overall script flow and marker order as the current transcript

Current transcript to rewrite:
<<<TRANSCRIPT>>>
[ALEX]
This is Git Going with GitHub, episode 26: GitHub Projects Deep Dive. I am Alex. By the end of this episode, GitHub Projects Deep Dive should feel less like a wall of GitHub words and more like a set of moves with visible momentum.

[JAMIE]
And I am Jamie. I am here for the practical questions: what should I listen for, what can go wrong, and what is the next calm move?

[PAUSE]

[ALEX]
Today we are working on this: Project boards, table and roadmap views, custom fields, cross-repo management. I want the learner to leave with a mental map, not just a remembered path through buttons.

[JAMIE]
So the goal is understanding first, then action, then confirmation.

[ALEX]
Right. We are building a rhythm: orient yourself, take one intentional action, then verify what changed before moving on. That rhythm is where the magic lives.

[PAUSE]

[JAMIE]
Okay, set the room for us. What are we walking into?

[ALEX]
Boards, Tables, Roadmaps, Automations, and Accessible Navigation: GitHub Projects is GitHub's built-in project management system. The next useful detail is concrete: It connects issues and pull requests from one or more repositories into a living, filterable view that your whole team can see and act on.

[ALEX]
A solid navigation habit is to prove where you are before activating controls. Headings, landmarks, and the address bar are not trivia; they are your map.

[ALEX]
The next layer is this. Here is the learner-facing version. GitHub has two generations of project tooling. Put another way, the current generation - called Projects (v2) - is what you'll find on any repository or organization page today. A good GitHub workflow is like a well-run meeting: everyone knows the topic, the next action, and who has the floor.

[ALEX]
A solid pull request habit is to separate three questions: what changed, why it changed, and what still needs review. That keeps the conversation useful instead of noisy.

[JAMIE]
What is the one idea that makes the next few steps less mysterious?

[ALEX]
This is the move inside 2. Creating a Project: projects can be created at the organization level (shared across all repos in an org) or at the repository level (scoped to one repo).

[JAMIE]
That feels much more doable when you say it as one move.

[ALEX]
Right. The magic is not speed. The magic is knowing what changed and why it matters.

[PAUSE]

[JAMIE]
Turn that into a path someone can follow.

[ALEX]
Create from an Organization has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Think of this as 4 checks: Navigate to your organization page (github.com/your-org); Select the Projects tab; Activate "New project" button; and Choose a template (blank table, blank board, feature release, etc.) or start empty. If one step does not match what you hear, stop there and re-orient.

[JAMIE]
What is the ordered workflow?

[ALEX]
The path is straightforward once it is named. Step one is give the project a name and select "Create project". That is the rhythm: orient, act, verify, continue.

[JAMIE]
Give me the sequence, because order matters here.

[ALEX]
Create from a Repository has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
The path is straightforward once it is named. Step one is navigate to any repository. Step two is select the Projects tab. Step three is activate "Link a project" or "New project". Step four is follow the same template/name flow. That is the rhythm: orient, act, verify, continue.

[ALEX]
The useful habit is simple: orient, act, verify, then continue. That pause between action and trust is part of the work.

[ALEX]
That matters because of the next idea. Learning Cards: Creating a Project has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
On the ground, that means a few things. The "New project" button is on the Projects tab of any org or repo page -- Tab to it and press Enter to open the template modal. Template cards in the modal are navigable with arrow keys -- each template announces its name and description; press Enter on your choice. After creation, you land on an empty project -- Tab to the "+ Add item" button at the bottom to start adding issues. The green "New project" button on the Projects tab is high-contrast and easy to spot even at high zoom. Template cards in the creation modal are displayed as a grid -- zoom in to read the titles and descriptions before selecting one. After the project is created, the empty Table view has a "+ Add item" row at the bottom -- it can scroll off screen at high zoom, so scroll down to find it.

[PAUSE]

[JAMIE]
If I am listening before the workshop starts, what should settle in my mind first?

[ALEX]
If the interface shifts, Table View is still useful because a spreadsheet-style grid where each row is an issue, PR, or draft item. For someone navigating by keyboard or screen reader, this detail matters: Columns are fields (Title, Status, Assignee, Labels, Priority, custom fields you create).

[ALEX]
This is where the talk moves from concept to action. Put Screen reader output per row into plain language. "Fix keyboard trap in modal dialog Status: In Progress Assignee: alice Priority: High Labels: bug, accessibility".

[JAMIE]
Now it sounds like a workflow instead of a wall of instructions.

[ALEX]
That is where confidence comes from: not from never getting lost, but from knowing how to recover.

[JAMIE]
Where do you want a learner to place their attention here?

[ALEX]
The teaching point here is not the label; it is the move. Each column represents a status value. That is the difference between guessing and knowing: Cards can be dragged between columns (or updated via keyboard by editing the Status field).

[PAUSE]

[JAMIE]
How would you walk the room through that step by step?

[ALEX]
Change a card's column without dragging has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
The path is straightforward once it is named. Step one is enter to open the card. Step two is navigate to the Status field in the right panel. Step three is activate the Status dropdown. Step four is select the new column value. The point is not speed; the point is never losing your place.

[JAMIE]
What does the learner do first, second, and then after that?

[ALEX]
First, escape to close. Each step should leave a trace you can name.

[JAMIE]
What would you say to someone who is already bracing for this to be too much?

[ALEX]
Roadmap View: Items appear as bars spanning their start/due dates. That gives the learner a foothold: iterations and milestones can be visualized against real calendar time.

[ALEX]
Now slow down for the part people usually miss. Setting dates has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Here is the part that makes the next action easier. Add a Date custom field (e.g., "Start Date", "Due Date") or use a Milestone field. Items without dates appear in the ungrouped section.

[PAUSE]

[JAMIE]
Give me the version that sounds like an instructor, not a manual.

[ALEX]
Learning Cards: The Three Layouts has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
These are the pieces that turn the idea into a usable move. Table view is the most accessible layout -- navigate with arrow keys (up/down for rows, left/right for columns) and press Enter to open an item's detail panel. Board view drag-and-drop is not keyboard accessible -- change a card's column by opening it (Enter), navigating to the Status field, and selecting a new value from the dropdown. Roadmap view is chart-based and not directly readable -- use Table view for all data access and editing, then switch to Roadmap only for visual context if needed. Table view works best at high zoom because it is a standard grid -- Board view columns can overflow horizontally and require scrolling. Board view cards show title, labels, and assignee -- zoom in on individual cards to read the small label badges and avatar icons. Roadmap view uses horizontal bars on a calendar timeline -- the bars can be narrow at default zoom; increase zoom or switch to Table for the same date data in text form.

[JAMIE]
That is the kind of detail that keeps a screen reader user oriented.

[ALEX]
Yes. The named thing - the heading, tab, field, branch, or button - is the handhold.

[ALEX]
Here is the moment where the page starts to make sense. Anchor this part on 4. Custom Fields. This is one of Projects v2's most powerful features. That matters in practice: You can add fields beyond the GitHub defaults (Title, Assignee, Labels, Milestone, Repository). The durable skill is not memorizing one screen. It is knowing how to find your footing when the screen changes.

[JAMIE]
Let's pause on Field Types. What should a learner take away from it?

[ALEX]
The reason this matters is simple: text: Free-form notes for things like acceptance criteria or design links. This is the part to say slowly: Number: Numeric values such as story points or estimates (for example, "Points: 3").

[PAUSE]

[JAMIE]
Let's pause on Creating a Custom Field. What should a learner take away from it?

[ALEX]
Creating a Custom Field has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
First, in Table view, scroll right to the + button at the end of the column header row. Then, activate the + button. After that, select a field type. Finally, name the field and configure options (for select fields, type each option, press Enter to add more). Keep it that plain: know where you are, make the move, check the result.

[JAMIE]
Before we leave Creating a Custom Field, what is the practical point?

[ALEX]
Start here: Confirm - the field appears as a new column. Pause after each step and listen for the confirmation before moving on.

[JAMIE]
Let's pause on Editing a Field Value on an Item. What should a learner take away from it?

[ALEX]
Editing a Field Value on an Item has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Start here: In Table view, navigate to the cell where the field intersects the row. Then: Enter or Space to activate the editor. Next: Type value (text/number) or select from dropdown (single select). Last: Enter or Tab to confirm. Pause after each step and listen for the confirmation before moving on.

[JAMIE]
Let's pause on Add an Existing Issue or PR. What should a learner take away from it?

[ALEX]
Put Add an Existing Issue or PR into plain language. The issue itself will now show which projects it belongs to in its sidebar. The interface gets easier when it becomes a set of named places instead of a wall of controls.

[ALEX]
Walk it in order: Activate the "+ Add item" button at the bottom of a table/column; Type to trigger the issue/PR search; Type a keyword or issue number; and Select the item - it's added to the project. The point is not speed; the point is never losing your place.

[JAMIE]
Before we leave Add an Existing Issue or PR, what is the practical point?

[ALEX]
Think of this as 1 checks: The issue/PR is now tracked in the project; it still lives in its repository. Each step should leave a trace you can name.

[JAMIE]
So the learner is not behind if they stop there and check the page.

[ALEX]
Yes. Pausing to verify is not a detour; it is how you keep control of the workflow.

[ALEX]
A solid issue habit is to read the title, the body, and the timeline before acting. You are listening for the requested action, the missing evidence, and the person who needs a response.

[PAUSE]

[JAMIE]
Let's pause on Add a Draft Issue. What should a learner take away from it?

[ALEX]
The teaching point here is not the label; it is the move. Draft issues live only inside the project (not in any repository) until you promote them. The useful version is: When to use drafts: Capturing ideas during planning before you're ready to commit them to a repo.

[ALEX]
Think of this as 4 checks: Activate "+ Add item"; Type the title directly (no ); Press Enter - a draft row appears; and Open the draft → "Convert to issue" button → select the repository. Each step should leave a trace you can name.

[JAMIE]
Let's pause on Promote a Draft to an Issue. What should a learner take away from it?

[ALEX]
Promote a Draft to an Issue has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
The path is straightforward once it is named. Step one is open the draft it

[...middle omitted for length...]

e Output: GitHub Project: Accessibility Agents Roadmap (3 active views). This is where the workflow starts to feel magical, because the result becomes visible and explainable: After the overview: "Want to see a specific column or check a team member's workload?".

[ALEX]
The useful version is not abstract; it sounds like this. Stale: "Update screen reader navigation guide" - In Review for 9 days, no activity. Unassigned: "Triage accessibility bug backlog" in In Progress.

[ALEX]
Put that beside the next piece. When to Use It has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
This is where the lesson becomes something you can check. During standup: quick status snapshot without leaving VS Code. Before filing a new issue: see if it's already tracked. During sprint planning: identify stale and blocked items before the next cycle. After a weekend: catch up on what moved while you were away.

[JAMIE]
Let's pause on Exercise 1: Create a Personal Tracking Project. What should a learner take away from it?

[ALEX]
Exercise 1: Create a Personal Tracking Project has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
The path is straightforward once it is named. Step one is create a new project at the organization level: name it "My Workshop Contributions". Step two is add the Board layout. Step three is add a custom Priority field with options: P0, P1, P2. Step four is add your fork of accessibility-agents as a linked repository. That is the rhythm: orient, act, verify, continue.

[JAMIE]
Before we leave Exercise 1: Create a Personal Tracking Project, what is the practical point?

[ALEX]
First, add any open issue you've filed to the project. That small check between steps is what makes the workflow reliable.

[PAUSE]

[JAMIE]
Let's pause on Exercise 2: Set Up Automation. What should a learner take away from it?

[ALEX]
Exercise 2: Set Up Automation has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
First, in your project's Workflows, enable "Item closed" → Status: Done. Then, file a test issue in your fork. After that, close that issue. Finally, verify it moved to "Done" automatically in the project board. That small check between steps is what makes the workflow reliable.

[JAMIE]
Let's pause on Exercise 3: Create a Sprint View. What should a learner take away from it?

[ALEX]
Exercise 3: Create a Sprint View has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Start here: Add an Iteration field named "Sprint" with 2-week iterations. Then: Assign your existing project items to the current sprint. Next: Switch to Roadmap view - observe the items on the timeline. Last: Check Insights to see the current iteration burndown. The sequence works because every action has a confirmation.

[JAMIE]
Let's pause on Exercise 4: Cross-Repo Project (Advanced). What should a learner take away from it?

[ALEX]
Put Exercise 4: Cross-Repo Project (Advanced) into plain language. From Chapter 9: For the introductory coverage of Labels, Milestones, and Projects including screen reader basics for getting started, see Chapter 9: Labels, Milestones, and Projects. This is the part to say slowly: Next: Appendix S: Releases and Insights Back: Appendix Q: GitHub Actions Teaching chapter: Chapter 09: Labels, Milestones, and Projects.

[ALEX]
Walk it in order: Create a cross-repo project connected to two of your repositories; Add the Repository field to the Table view; Create a view filtered to is:issue label:accessibility; and Set up Auto-add: any issue with the accessibility label in those repos goes to this project automatically. Keep it that plain: know where you are, make the move, check the result.

[PAUSE]

[JAMIE]
Let's pause on Section-Level Source Map. What should a learner take away from it?

[ALEX]
The teaching point here is not the label; it is the move. Use this map to verify facts for each major section in this file.

[ALEX]
A few details make that real. Boards, Tables, Roadmaps, Automations, and Accessible Navigation: GitHub Docs, home, GitHub Changelog, GitHub Projects docs, Labels docs, Milestones docs. Projects v2: What Changed: GitHub Docs, home, GitHub Changelog, GitHub Projects docs, Labels docs, Milestones docs. Creating a Project: GitHub Docs, home, GitHub Changelog, GitHub Projects docs, Labels docs, Milestones docs. The Three Layouts in Depth: GitHub Docs, home, GitHub Changelog, GitHub Projects docs, Labels docs, Milestones docs. Custom Fields: GitHub Docs, home, GitHub Changelog, GitHub Projects docs, Labels docs, Milestones docs. Adding and Managing Items: GitHub Docs, home, GitHub Changelog, GitHub Projects docs, Labels docs, Milestones docs.

[PAUSE]

[JAMIE]
What should people carry with them after this?

[ALEX]
Carry the map. Know what page or tool you are in, know which action you are taking, and know what confirmation should follow. If the confirmation is missing, pause. That pause is not wasted time; it is professional judgment, and it is how complex workflows start to feel magical instead of stressful.

[JAMIE]
That is a better way to say it than just follow the steps.

[ALEX]
Right. Steps matter, but understanding wins. That is episode 26. Next in the series is episode 27, where we keep building the same contributor muscles.
<<<END_TRANSCRIPT>>>
