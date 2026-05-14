You are rewriting a podcast transcript for variety and teachability.
Use automatic model selection (no model is specified by caller).
Return ONLY the transcript text with valid speaker markers.

Hard format requirements:
- Allowed markers only: [ALEX], [JAMIE], [PAUSE]
- Marker line must be on its own line
- Keep script structure conversational and teachable
- Keep concept coverage aligned to source materials

Slug: ep09-labels-milestones-projects
Title: Episode 9: Labels, Milestones, and Projects
Description: Organizing and tracking work with labels, milestones, and GitHub Projects.

Concept checklist to preserve:
- What labels are: color-coded tags for categorizing issues and PRs
- Default labels GitHub provides: bug, enhancement, documentation, etc.
- Viewing the labels page on a repository
- Applying a label to an issue or pull request
- Filtering issues by label
- Creating a new custom label with name, description, and color
- What milestones are: grouping issues toward a release or goal
- Creating a milestone with a due date
- Adding issues to a milestone and tracking progress
- Introduction to GitHub Projects: the new project boards
- Board view, table view, and roadmap view (overview)
- How labels, milestones, and projects work together for team coordination
- Using gh commands for label and milestone management

Source heading checklist to preserve (topic coverage, can paraphrase):
- ## Organizing Work and Cross-Referencing on GitHub
- ## Workshop Recommendation (Chapter 9)
- ### Chapter 9 Challenge Set
- ### Challenge 9.1 Step-by-Step: Triage Recommendation Comment
- ### Completing Chapter 9: Submit Your Evidence
- ### Expected Outcomes
- ### If You Get Stuck
- ### Learning Moment
- ### Learning Pattern Used in This Chapter
- ## Labels
- ### What Are Labels?
- ### Standard Labels You Will Find in Most Repos
- ### Navigating to the Labels Page
- ### Applying a Label to an Issue or PR
- ### Tool Cards: Apply a Label
- ### Filtering Issues by Label
- ### Creating a New Label
- ### Learning Cards: Labels
- ## Milestones
- ### What Are Milestones?
- ### Navigating to Milestones
- #### Reading a milestone
- ### Opening a Milestone
- ### Adding an Issue to a Milestone
- ### Creating a Milestone
- ### Learning Cards: Milestones
- ## Cross-References
- ### Types of Cross-References
- ### Typing a Cross-Reference
- ### When the "Closes" Keyword Fires
- ### Learning Cards: Cross-References
- ## GitHub Projects
- ### What Is a GitHub Project?
- ### Finding a Project
- ### Navigating a Project - Table View
- #### What is announced per row
- ### Navigating a Project - Board View
- ### Adding an Issue to a Project
- ### Learning Cards: GitHub Projects
- ## Practical Organization Strategy for the Hackathon
- ### Labels to create
- ### Milestone to create
- ### Workflow
- ## Try It: Label and Link
- ## Authoritative Sources
- ### Section-Level Source Map

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
Welcome back to Git Going with GitHub. This is episode 9: Labels, Milestones, and Projects. I am Alex, and today we are turning Labels, Milestones, and Projects from a list of instructions into a working mental model that actually feels alive.

[JAMIE]
And I am Jamie. I will stop us whenever the instructions sound simple on paper but feel less magical at the keyboard with a screen reader.

[PAUSE]

[ALEX]
Organizing and tracking work with labels, milestones, and GitHub Projects. That is the surface description. Underneath it, we are building judgment: where to focus, what to ignore, and how to verify the result.

[JAMIE]
So we are not using the audio as a shortcut around learning. We are using it to make the learning easier to enter and easier to remember.

[ALEX]
Yes. A good audio lesson gives someone enough context to try the work with confidence, even before they open the written material.

[PAUSE]

[JAMIE]
Okay, set the room for us. What are we walking into?

[ALEX]
Organizing Work and Cross-Referencing on GitHub: Labels, milestones, and projects are the organizational layer of GitHub. The next useful detail is concrete: They turn a chaotic list of issues into a structured, navigable, prioritized body of work.

[ALEX]
The next layer is this. Here is the learner-facing version. Chapter 9 is a guided triage chapter focused on organization skills. A good GitHub workflow is like a well-run meeting: everyone knows the topic, the next action, and who has the floor.

[ALEX]
Here are the anchors worth keeping. There are 1 guided challenge. Automation check: none by default. The evidence is structured issue comment in assigned challenge issue. The pattern is inspect, classify, explain.

[JAMIE]
What does the learner do first, second, and then after that?

[ALEX]
Chapter 9 Challenge Set has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Walk it in order: Post a triage recommendation - read an issue, recommend labels/milestone/project placement, and explain your reasoning. Each step should leave a trace you can name.

[JAMIE]
That feels much more doable when you say it as one move.

[ALEX]
Right. The magic is not speed. The magic is knowing what changed and why it matters.

[PAUSE]

[JAMIE]
Turn that into a path someone can follow.

[ALEX]
Anchor this part on Challenge 9.1 Step-by-Step: Triage Recommendation Comment. Read the details of a Learning Room issue and post a structured triage recommendation that a maintainer could act on immediately. This is the part to say slowly: Labels and issue states are how we wake up agents.

[ALEX]
For a learner, the useful signals are concrete. What type of work is it? (documentation fix, bug report, accessibility improvement, new content). How urgent does it seem? (blocking other work, nice-to-have, unclear). Which file or area of the repo does it affect?

[ALEX]
Think of this as 4 checks: Open the Issues tab in your Learning Room repository; Find any open issue that does not already have labels applied (or pick one your facilitator assigns); Read the issue title and full description carefully. Note; and Open your assigned Chapter 9 challenge issue (the one titled "Chapter 9.1: Triage Recommendation (@yourname)"). If one step does not match what you hear, stop there and re-orient.

[JAMIE]
What is the ordered workflow?

[ALEX]
The path is straightforward once it is named. Step one is scroll to the comment box and post a triage recommendation using this format. Step two is if you have write access to the repository, apply the recommended labels and milestone directly on the issue you triaged. Step three is activate the Comment button. That is the rhythm: orient, act, verify, continue.

[JAMIE]
What makes this practice feel low-stakes but still real?

[ALEX]
The reason this matters is simple: your triage recommendation comment is your evidence. The listener should be able to check this: Close your Chapter 9 challenge issue when done.

[ALEX]
The useful habit is simple: orient, act, verify, then continue. That pause between action and trust is part of the work.

[ALEX]
That matters because of the next idea. Expected Outcomes has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
On the ground, that means a few things. Student can read an issue and recommend appropriate labels, milestone, and project placement. Student understands triage reasoning even without maintainer permissions. Student leaves a clear, reusable triage note that a maintainer could act on immediately.

[PAUSE]

[JAMIE]
How would you walk the room through that step by step?

[ALEX]
If You Get Stuck has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Start here: Not sure which label to pick? Start with just one: documentation, bug, or accessibility. You can always add more. Then: Milestone is unclear? Write none and explain why - that is a valid triage decision. Next: Project board is unknown? Write Needs Triage - that is the correct default. Last: Not sure what the issue is about? Re-read the title and first paragraph. If still unclear, that itself is useful triage feedback ("Issue description is unclear - needs more detail"). The sequence works because every action has a confirmation.

[JAMIE]
Give me the sequence, because order matters here.

[ALEX]
Walk it in order: Ask facilitator to review your one-sentence reason before posting. Keep it that plain: know where you are, make the move, check the result.

[ALEX]
This is where the talk moves from concept to action. Put Learning Moment into plain language. Triage is about clarity, not authority. The useful version is: You do not need maintainer permissions to help organize work.

[JAMIE]
Now it sounds like a workflow instead of a wall of instructions.

[ALEX]
That is where confidence comes from: not from never getting lost, but from knowing how to recover.

[JAMIE]
Let's pause on Learning Pattern Used in This Chapter. What should a learner take away from it?

[ALEX]
Learning Pattern Used in This Chapter has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Think of this as 4 checks: Inspect an issue carefully before acting (read before you write); Classify work using a consistent vocabulary (labels, milestones); Explain your reasoning in writing (one-sentence justification); and Build triage instincts that transfer to any open source project. Pause after each step and listen for the confirmation before moving on.

[PAUSE]

[ALEX]
Before the learner moves on. This part earns its place because labels are colored tags applied to issues and pull requests. This is where the workflow starts to feel magical, because the result becomes visible and explainable: They communicate at a glance what category, priority, or status an item belongs to. That is the difference between following directions and owning the workflow.

[ALEX]
A solid project habit is to treat metadata as decision support. Labels, status, assignees, and notifications tell you what kind of attention the work needs.

[JAMIE]
Let's pause on Navigating to the Labels Page. What should a learner take away from it?

[ALEX]
Navigating to the Labels Page: Go to the Issues tab, then click the Labels link/button (it's in the filter toolbar above the issue list, next to Milestones). That gives the learner a foothold: the Labels page shows every label with its colour, name, and description.

[ALEX]
First, navigate to the Issues tab. Then, press K to find the "Labels" link (near the "Milestones" link in the toolbar). After that, press Enter. Finally, quick Nav K to find the "Labels" link (near the "Milestones" link in the toolbar). Each step should leave a trace you can name.

[JAMIE]
Before we leave Navigating to the Labels Page, what is the practical point?

[ALEX]
Start here: VO+Space to activate. If one step does not match what you hear, stop there and re-orient.

[ALEX]
Treat examples as spoken recipes, not decorations. You may hear something like List all labels with descriptions; gh label list; List labels in a specific format; gh label list --json name,description. Read the command, understand what it changes, then run it only when the repository state matches the lesson.

[JAMIE]
Let's pause on Tool Cards: Apply a Label. What should a learner take away from it?

[ALEX]
Here is the learner-facing version. github.dev (web editor): Not available -- labels are managed on the issue/PR page, not in the code editor. The next useful detail is concrete: VS Code Desktop (GitHub Pull Requests extension).

[ALEX]
Start here: Open the issue or PR. Then: In the right sidebar, click the gear icon next to Labels. Next: Select labels from the dropdown, then click outside to apply. Last: Open the issue in the GitHub sidebar panel. If one step does not match what you hear, stop there and re-orient.

[JAMIE]
Before we leave Tool Cards: Apply a Label, what is the practical point?

[ALEX]
Walk it in order: Click the label area to add or remove labels; Navigate to the sidebar → press H or 3 to find the "Labels" heading; Activate the Labels gear/edit button (B until you hear "Labels" button → Enter); and Dropdown opens showing all available labels: use ↑/↓ to navigate. That is the rhythm: orient, act, verify, continue.

[ALEX]
Treat examples as spoken recipes, not decorations. You may hear something like gh issue edit 42 --add-label "accessibility,good first issue"; gh pr edit 15 --add-label "documentation". Add a label to an issue; gh issue edit 42 --add-label "accessibility"; Add multiple labels at once; gh issue edit 42 --add-label "bug,good first issue"; Remove a label; gh issue edit 42 --remove-label "needs triage"; Add a label to a PR; gh pr edit 42. Read the command, understand what it changes, then run it only when the repository state matches the lesson.

[PAUSE]

[JAMIE]
What should they understand before typing anything?

[ALEX]
This is the move inside Filtering Issues by Label: screen reader users (NVDA / JAWS - Windows). Put another way, option A - Filter bar: Press F → type is:open label:accessibility → Enter.

[ALEX]
These are the pieces that turn the idea into a usable move. Using the filter button: From the Issues list, click the Label dropdown button above the issue list, choose the label(s) you want, then click outside to apply. The active filter shows in the search bar. Using the search bar: Click in the search/filter bar and type label:accessibility (for example) along with any other filters.

[ALEX]
Treat examples as spoken recipes, not decorations. You may hear something like List issues with a specific label; gh issue list --label "accessibility"; Combine multiple labels; gh issue list --label "accessibility" --label "good first issue"; Combine with state filter; gh issue list --label "accessibility" --state closed; Search across. Read the command, understand what it changes, then run it only when the repository state matches the lesson.

[JAMIE]
That is the kind of detail that keeps a screen reader user oriented.

[ALEX]
Yes. The named thing - the heading, tab, field, branch, or button - is the handhold.

[ALEX]
A solid issue habit is to read the title, the body, and the timeline before acting. You are listening for the requested action, the missing evidence, and the person who needs a response.

[JAMIE]
Let's pause on Creating a New Label. What should a learner take away from it?

[ALEX]
Anchor this part on Creating a New Label. GitHub CLI (gh) alternative - creating labels. That matters in practice: Accessibility note for color: Labels have color, but they also have a text name and description - the color is supplementary information. The durable skill is not memorizing one screen. It is knowing how to find your footing when the screen changes.

[ALEX]
Think of this as 4 checks: Navigate to Issues → Labels page; Tab to "New label" button → Enter; Fill in: Label name (F for form field), Color (use the color picker or hex code), Description; and Tab to "Create label" button → Enter. That small check between steps is what makes the workflow reliable.

[ALEX]
Treat examples as spoken recipes, not decorations. You may hear something like Create a new label; gh label create "accessibility" --description "Accessibility-related issue" --color "0075ca"; Create with a specific color; gh label create "in progress" --description "Being actively worked on" --color "e4e669". Read the command, understand what it changes, then run it only when the repository state matches the lesson.

[JAM

[...middle omitted for length...]

arousel Status: In Progress Assignee: username Priority: High". That is the difference between following directions and owning the workflow.

[PAUSE]

[JAMIE]
What is the safe way to learn from that example?

[ALEX]
Navigating a Project - Board View has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Treat examples as spoken recipes, not decorations. You may hear something like Step 1: Switch to Board view using the view selector button; Step 2: Each column (Todo / In Progress / Done) is a region; Step 3: D to navigate between column landmarks; Step 4: Within a column: 3 to navigate card titles, I for list items; Step 5: Enter on a. Read the command, understand what it changes, then run it only when the repository state matches the lesson.

[JAMIE]
Let's pause on Adding an Issue to a Project. What should a learner take away from it?

[ALEX]
Adding an Issue to a Project has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Start here: Navigate to the sidebar "Projects" section (H or 3). Then: Activate the Projects gear button. Next: Select the project from the dropdown. Last: Activate "Add item" button at the bottom of a column/table. Keep it that plain: know where you are, make the move, check the result.

[JAMIE]
Before we leave Adding an Issue to a Project, what is the practical point?

[ALEX]
Walk it in order: Type to search for existing issues; and Select the issue → it's added to the project. Pause after each step and listen for the confirmation before moving on.

[JAMIE]
Give me the version that sounds like an instructor, not a manual.

[ALEX]
Learning Cards: GitHub Projects has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
A few details make that real. In Table view, press T to jump to the project table, then use Ctrl+Alt+Down Arrow for rows and Ctrl+Alt+Right Arrow for columns (Title, Status, Priority, Assignee). In Board view, press D to navigate between column landmarks (Todo, In Progress, Done), then 3 to jump between card titles within a column. Press Enter on any card or table row to open the issue/PR detail panel without leaving the project view. Board view shows issues as cards in vertical columns (Todo, In Progress, Done); each card displays the title, assignee avatar, and labels. Table view is wider and has more columns; at high zoom, use horizontal scrolling to see columns like Priority and Assignee. The view selector button (Table/Board/Roadmap) is near the top of the project page; it uses icon buttons that have text labels on hover.

[JAMIE]
That is the part I would want someone to say out loud while they work.

[ALEX]
Exactly. A learner should always know what they are trying to prove before they take the next action.

[PAUSE]

[ALEX]
This is where confidence starts to build. Anchor this part on Practical Organization Strategy for the Hackathon. Here is a recommended structure for your Learning Room sandbox project. The durable skill is not memorizing one screen. It is knowing how to find your footing when the screen changes.

[JAMIE]
Let's pause on Try It: Label and Link. What should a learner take away from it?

[ALEX]
The reason this matters is simple: time: 2 minutes What you need: Browser, signed in to GitHub. Put another way, go to the Learning Room repository and do two things.

[ALEX]
The path is straightforward once it is named. Step one is add a label to an issue - Open any issue (press G then I, then Enter on an issue title). Press L (in Focus Mode) to open the label picker. Type documentation to filter, then press Enter to apply it. Press Esc to close. Step two is use a cross-reference - Leave a comment on that issue mentioning another issue number: Related to 1 (or any issue number you've seen). Press Ctrl+Enter to submit. Each step should leave a trace you can name.

[ALEX]
That connects to another useful point. Do not treat Section-Level Source Map as decoration. Use this map to verify facts for each major section in this file.

[ALEX]
The room should hear these as checkpoints. Organizing Work and Cross-Referencing on GitHub: GitHub Docs, home, GitHub Changelog, GitHub Projects docs, Labels docs, Milestones docs. Workshop Recommendation (Chapter 9): GitHub Docs, home, GitHub Changelog, GitHub Projects docs, Labels docs, Milestones docs. Labels: GitHub Docs, home, GitHub Changelog, GitHub Projects docs, Labels docs, Milestones docs. Milestones: GitHub Docs, home, GitHub Changelog, GitHub Projects docs, Labels docs, Milestones docs. Cross-References: GitHub Docs, home, GitHub Changelog, GitHub Projects docs, Labels docs, Milestones docs. GitHub Projects: GitHub Docs, home, GitHub Changelog, GitHub Projects docs, Labels docs, Milestones docs.

[PAUSE]

[JAMIE]
What should people carry with them after this?

[ALEX]
Carry the map. Know what page or tool you are in, know which action you are taking, and know what confirmation should follow. If the confirmation is missing, pause. That pause is not wasted time; it is professional judgment, and it is how complex workflows start to feel magical instead of stressful.

[JAMIE]
That is a better way to say it than just follow the steps.

[ALEX]
Right. Steps matter, but understanding wins. That is episode 9. Next in the series is episode 10, where we keep building the same contributor muscles.
<<<END_TRANSCRIPT>>>
