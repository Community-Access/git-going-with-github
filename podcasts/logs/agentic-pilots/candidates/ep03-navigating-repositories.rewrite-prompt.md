You are rewriting a podcast transcript for variety and teachability.
Use automatic model selection (no model is specified by caller).
Return ONLY the transcript text with valid speaker markers.

Hard format requirements:
- Allowed markers only: [ALEX], [JAMIE], [PAUSE]
- Marker line must be on its own line
- Keep script structure conversational and teachable
- Keep concept coverage aligned to source materials

Slug: ep03-navigating-repositories
Title: Episode 3: Navigating Repositories
Description: Exploring a repository: tabs, files, README, branches, and commit history.

Concept checklist to preserve:
- What a repository is: a project folder tracked by Git
- The repository tab bar: Code, Issues, Pull Requests, Actions, Settings
- The Code tab: file tree, README rendering, branch selector
- What a branch is and why repositories have them
- The default branch (usually main) and what it means
- Reading commit history: who changed what and when
- What cloning means: copying a remote repo to your computer
- The difference between cloning and forking
- Using gh repo clone versus git clone versus downloading a ZIP
- The About section, topics, and license on a repository page

Source heading checklist to preserve (topic coverage, can paraphrase):
- ## A Screen Reader Guide to GitHub Repositories
- ## Workshop Recommendation (Chapter 3)
- ### Safety-First Learning Pattern
- ### About Learning Cards in This Chapter
- ## What Is a Repository Page?
- ### Description
- ## Landing on a Repository - What to Expect
- ### Orientation sequence (do this on every new repo)
- ## Navigating the Repository Tabs
- ### How to reach the tabs
- ### Reading the tab labels
- ## The Files Table
- ### Reaching the files table
- ### Navigating the files table
- #### Reading a row
- ### Folder vs file
- ### Learning Cards: The Files Table
- ## The Branch Selector
- ### How to open the branch selector
- ### Inside the branch dropdown
- ### Switching to a tag
- ## Cloning a Repository
- ## Or with standard Git
- ### Learning Cards: Cloning a Repository
- ### Tool Cards: Clone a Repository
- ## Fork vs. Clone vs. Branch - What Is the Difference?
- ### Learning Cards: Fork vs. Clone vs. Branch
- ## Watching, Starring, and Forking
- ### Watching (subscribe to notifications)
- ### Forking (create your own copy)
- ### Starring (bookmarking)
- ## Viewing a Single File
- ### File page landmarks
- ### Reading a Markdown file (like README.md)
- ### Reading a code file
- ### The file action buttons
- #### How to reach these buttons
- ### Editing a file
- ### Learning Cards: Viewing a Single File
- ## The Blame View
- ### Navigating Blame
- ## Commit History
- ### Reading the Commits List Page
- ### Reading a Commit Page
- ## Searching for a File
- ### How to use Go to File
- ### Learning Cards: Searching for a File
- ## GitHub Shortcuts for Repository Navigation - Spotlight
- ### Navigating the sidebar
- ## The Repository About Section
- ## Practical Scenarios
- ### Scenario A: "I want to find out what this project does"
- ### Scenario B: "I want to find a good file to edit"
- ### Scenario C: "I want to know who has been working on this file recently"
- ### Scenario D: "I want to understand what changed in the last release"
- ### Scenario E: "I want to contribute - where do I start?"
- ## If You Get Stuck
- ## Try It: The Five-Tab Tour
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
Welcome to episode 3 of Git Going with GitHub: Navigating Repositories. I am Alex, and today we are teaching this topic as a conversation you can carry into the workshop, not as a page you have to memorize.

[JAMIE]
And I am Jamie. I will keep pulling the lesson back to real learners, real repositories, and the evidence that proves the work happened.

[PAUSE]

[ALEX]
The lesson focus is Exploring a repository: tabs, files, README, branches, and commit history. We will treat every step as a teachable decision, because that is what makes the skill portable and the workflow feel smooth.

[JAMIE]
So we should explain the why clearly enough that the steps make sense when the learner meets them later and still feel doable.

[ALEX]
That is it. If a listener only has audio right now, they should still get the complete concept and know what evidence would prove success.

[PAUSE]

[JAMIE]
Okay, set the room for us. What are we walking into?

[ALEX]
A Screen Reader Guide to GitHub Repositories: everything you need to explore a GitHub repository using your keyboard and screen reader. The next useful detail is concrete: Official GitHub Accessibility Guide: GitHub publishes an NVDA-focused guide for navigating repositories with a screen reader at Using GitHub Repositories with a Screen Reader.

[ALEX]
A solid navigation habit is to prove where you are before activating controls. Headings, landmarks, and the address bar are not trivia; they are your map.

[ALEX]
The next layer is this. Here is the learner-facing version. Chapter 3 is a confidence-building orientation chapter. A good GitHub workflow is like a well-run meeting: everyone knows the topic, the next action, and who has the floor.

[ALEX]
Here are the anchors worth keeping. There are none. Automation check: none. Why: this chapter teaches navigation foundations that are practiced in later issue and PR chapters.

[JAMIE]
What does the learner do first, second, and then after that?

[ALEX]
This is the move inside Safety-First Learning Pattern: use this sequence before moving to graded chapters.

[ALEX]
Walk it in order: Learn the page structure (heading, landmarks, tabs); Practice orientation (1, D, heading list); Confirm readiness with a peer or facilitator; and Move to Chapter 4 for Learning Room orientation, then Chapter 5 for issue-based, traceable challenges. Each step should leave a trace you can name.

[JAMIE]
That feels much more doable when you say it as one move.

[ALEX]
Right. The magic is not speed. The magic is knowing what changed and why it matters.

[PAUSE]

[ALEX]
Now bring the learner back to the room. Anchor this part on About Learning Cards in This Chapter. This chapter provides learning cards: expandable blocks that offer perspective-specific guidance for different ways of working. This is the part to say slowly: Not every card appears at every step.

[JAMIE]
What would you say to someone who is already bracing for this to be too much?

[ALEX]
The reason this matters is simple: when you navigate to a GitHub repository (e.g., https://github.com/owner/repo-name), you land on the repository home page (also called the Code tab). The listener should be able to check this: This page has several distinct regions.

[ALEX]
The useful habit is simple: orient, act, verify, then continue. That pause between action and trust is part of the work.

[ALEX]
That matters because of the next idea. Do not treat Description as decoration. GitHub can change visual placement based on viewport width, account features, repository settings, and product rollout. That is not trivia. The dependable structure is the set of named regions and controls: the global navigation, the repository H1 heading, the Repository navigation landmark, the Code tab, the branch selector, the file list, optional repository sidebar information, and the rendered. The workshop is closer to rehearsal than lecture. You hear the move, try the move, and then check what changed.

[PAUSE]

[JAMIE]
How would you walk the room through that step by step?

[ALEX]
If the interface shifts, Landing on a Repository - What to Expect is still useful because when you first navigate to a repo URL.

[ALEX]
Start here: The page title is announced with the format: owner/repo-name: Short description - GitHub. Then: First heading (1 key) will navigate to the repo name: "owner/repo-name". Next: The tab bar is a landmark labeled "Repository navigation". The sequence works because every action has a confirmation.

[JAMIE]
What should happen before anyone copies and runs it?

[ALEX]
Put Orientation sequence (do this on every new repo) into plain language. Key landmark names you will hear with D: Repository pages have three main landmark sections: "Repository Navigation" (the tab bar), "Main" (the file tree, branch selector, repo details, and contributors), and "Repository Files Navigation" (the rendered README. The useful version is: Within each landmark, press H or 2 to navigate subsections - most are organized under heading level 2.

[ALEX]
Treat examples as spoken recipes, not decorations. You may hear something like Step 1: Press 1 - hear the repo name; Step 2: Press D - navigate through landmarks to learn page structure; Step 3: Press NVDA+F7 (or VO+U) - scan headings to understand what's on the page. Read the command, understand what it changes, then run it only when the repository state matches the lesson.

[JAMIE]
Now it sounds like a workflow instead of a wall of instructions.

[ALEX]
That is where confidence comes from: not from never getting lost, but from knowing how to recover.

[JAMIE]
What is the one idea that makes the next few steps less mysterious?

[ALEX]
The teaching point here is not the label; it is the move. The main tabs are: Code, Issues, Pull Requests, Discussions, Actions, Projects, Wiki, Security, Insights, and Settings (Settings only visible to maintainers). That is the difference between guessing and knowing: Not all tabs appear on every repository - Discussions, Wiki, and Projects must be enabled by the repository owner.

[PAUSE]

[JAMIE]
What is the ordered workflow?

[ALEX]
This part earns its place because the tab bar is visible just below the repository name. This is where the workflow starts to feel magical, because the result becomes visible and explainable: Click the tab you want - Code, Issues, Pull requests, etc. That is the difference between following directions and owning the workflow.

[ALEX]
That becomes easier when you listen for these cues. The tabs may wrap to two lines. Each tab remains a standard link. The active tab is indicated by an underline. In Windows High Contrast mode, the underline uses the system accent color. Tab counts ("Issues · 14") appear as part of each tab's text and remain readable at high magnification. If tabs are hard to click at high zoom, press Tab from the repo heading to cycle through each tab link sequentially.

[ALEX]
The path is straightforward once it is named. Step one is press D to jump to the "Repository navigation" landmark. Step two is press K or Tab to navigate between the tab links. Step three is vO+U → Landmarks rotor → navigate to "Repository navigation". Step four is vO+Right to move through items in the landmark. The point is not speed; the point is never losing your place.

[JAMIE]
Give me the version that sounds like an instructor, not a manual.

[ALEX]
Reading the tab labels: Each tab link reads with its name and the count of items: "Issues, 14 open" or "Pull requests, 3 open." The active tab is marked with aria-selected="true" - your screen reader will announce it as "selected" or "current.".

[ALEX]
A solid project habit is to treat metadata as decision support. Labels, status, assignees, and notifications tell you what kind of attention the work needs.

[ALEX]
Now slow down for the part people usually miss. Here is the learner-facing version. See also: Appendix B: Screen Reader Cheat Sheet lists the keyboard shortcuts for navigating repository file trees. The next useful detail is concrete: The files table is the core of the Code tab - it shows every file and folder in the repo.

[PAUSE]

[JAMIE]
Turn that into a path someone can follow.

[ALEX]
This is the move inside Reaching the files table: the file table is the main panel of the Code tab, showing folders and files with their most recent commit message and how long ago each was changed. Put another way, it's visible immediately below the branch selector.

[ALEX]
These are the pieces that turn the idea into a usable move. The table has three columns: Name, Message (last commit), and Date. At 200%+ zoom, the Message and Date columns may be truncated. Hover over truncated text to see the full message in a tooltip. Folder icons appear before folder names; file icons appear before file names. In Windows High Contrast mode, these icons use system colors with visible outlines. Click any folder or file name to navigate into it. The names are standard links with hover underlines. Use Ctrl+F (browser Find) to search for a specific file name rather than scrolling a long file list at high zoom.

[ALEX]
Walk it in order: Name - file or folder name; Message - the most recent commit message that changed this file; and Age - how long ago that commit happened. That is the rhythm: orient, act, verify, continue.

[JAMIE]
That is the kind of detail that keeps a screen reader user oriented.

[ALEX]
Yes. The named thing - the heading, tab, field, branch, or button - is the handhold.

[ALEX]
Here is the moment where the page starts to make sense. Anchor this part on Reading a row. Navigate to the Name column, hear the filename, then move right to read the commit message, then right again for the age. That matters in practice: For example: "docs/ Add accessibility guide 3 days ago". The durable skill is not memorizing one screen. It is knowing how to find your footing when the screen changes.

[JAMIE]
Where do you want a learner to place their attention here?

[ALEX]
Folder vs file has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
The useful version is not abstract; it sounds like this. Folders end with a / in the Name column. When you open a folder, the page reloads showing the contents of that folder. Press the back button or use the breadcrumb links to go back up.

[PAUSE]

[ALEX]
The next point gives the learner a handle. Learning Cards: The Files Table has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
This is where the lesson becomes something you can check. Press T in Browse Mode to jump to the files table; NVDA announces "Table with N rows and 3 columns". Navigate rows with Ctrl+Alt+Down Arrow; each row reads: filename, last commit message, age. Press Enter on the Name column to open a file or folder; press Alt+Left Arrow in your browser to go back. The files table uses alternating row shading; switch to a high-contrast GitHub theme if rows blend together at your zoom level. Folder icons (small triangle) appear before folder names; file icons (small document) appear before file names. If the commit message column is truncated at high zoom, hover over it to see the full message in a tooltip.

[JAMIE]
If I am listening before the workshop starts, what should settle in my mind first?

[ALEX]
If the interface shifts, The Branch Selector is still useful because the branch selector button sits just above the files table. That is not trivia. It lets you switch which branch you are viewing.

[ALEX]
A solid Git habit is to know which branch you are on, what changed, and what confirmation you expect before you run the next command.

[JAMIE]
Give me the sequence, because order matters here.

[ALEX]
Put How to open the branch selector into plain language. Mouse users see the current branch name as a button with a dropdown arrow (e.g., main ▼) just above the file table. For someone navigating by keyboard or screen reader, this detail matters: Type to filter branches, then click a branch name to switch. The interface gets easier when it becomes a set of named places instead of a wall of controls.

[ALEX]
That shows up in the workshop in a few specific ways. At high magnification, the button may wrap next to other controls. It is a standard button with visible border and text. Click it to open a dropdown with a search field and branch list. Type part of a branch name to filter the list. In the dropdown, branch names can be long. At high zoom, they may truncate. Hover for the full name. In Windows High Contrast mode, the currently active branch is highligh

[...middle omitted for length...]

URL; Press 1 - hear the repo name; ↓ - read the description (announced as a paragraph after the heading); and Navigate to README: D → "Repository files navigation" → H within the README. Pause after each step and listen for the confirmation before moving on.

[JAMIE]
Let's pause on Scenario B: "I want to find a good file to edit". What should a learner take away from it?

[ALEX]
Scenario B: "I want to find a good file to edit" has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
The path is straightforward once it is named. Step one is open the files table with T. Step two is navigate rows with Ctrl+Alt+↓. Step three is move right with Ctrl+Alt+→ to read the commit message (what's been changing recently). Step four is when found, press Enter on the Name column to open the file. The point is not speed; the point is never losing your place.

[JAMIE]
Let's pause on Scenario C: "I want to know who has been working on this file recently". What should a learner take away from it?

[ALEX]
Scenario C: "I want to know who has been working on this file recently" has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
First, open the file. Then, activate the "Blame" button (B from the Repository files navigation landmark). After that, navigate the blame table to see authors. Each step should leave a trace you can name.

[PAUSE]

[JAMIE]
Let's pause on Scenario D: "I want to understand what changed in the last release". What should a learner take away from it?

[ALEX]
Scenario D: "I want to understand what changed in the last release" has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Start here: Navigate to the sidebar "Releases" section (H or 2). Then: Activate the latest release link. Next: Read the release notes (rendered Markdown with headings and lists). If one step does not match what you hear, stop there and re-orient.

[JAMIE]
Let's pause on Scenario E: "I want to contribute - where do I start?". What should a learner take away from it?

[ALEX]
Scenario E: "I want to contribute - where do I start?" has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Walk it in order: Navigate to the Code tab; Look for CONTRIBUTING.md in the files table; Open it and read the contributing guidelines; and Then go to Issues tab and filter by good first issue. That is the rhythm: orient, act, verify, continue.

[JAMIE]
Let's pause on Try It: The Five-Tab Tour. What should a learner take away from it?

[ALEX]
Anchor this part on Try It: The Five-Tab Tour. Time: 3 minutes What you need: Browser with screen reader, signed in to GitHub. This is where the workflow starts to feel magical, because the result becomes visible and explainable: Navigate to the Accessibility Agents repository and do this. The durable skill is not memorizing one screen. It is knowing how to find your footing when the screen changes.

[ALEX]
Think of this as 4 checks: Code tab - Press D to the "Repository navigation" landmark, then K to find "Code". Press Enter. You're on the file list; Issues tab - Press G then I (Focus Mode first: NVDA+Space). How many open issues are there? Press 3 to jump through issue titles; Pull Requests tab - Press G then P. Are there any open PRs?; and Find a file - Press T (in Focus Mode) to open the file finder. Type README and press Enter. You just navigated straight to a file without scrolling. That small check between steps is what makes the workflow reliable.

[JAMIE]
Before we leave Try It: The Five-Tab Tour, what is the practical point?

[ALEX]
The path is straightforward once it is named. Step one is read the README - Press 1 to find the page title, then 2 to scan sections. The sequence works because every action has a confirmation.

[PAUSE]

[JAMIE]
Let's pause on Section-Level Source Map. What should a learner take away from it?

[ALEX]
The reason this matters is simple: use this map to verify facts for each major section in this file.

[ALEX]
Here is the part to remember. A Screen Reader Guide to GitHub Repositories: GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests. Workshop Recommendation (Chapter 3): GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests. What Is a Repository Page?: GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests. Landing on a Repository - What to Expect: GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests. Navigating the Repository Tabs: GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests. The Files Table: GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests.

[PAUSE]

[JAMIE]
What should people carry with them after this?

[ALEX]
Carry the map. Know what page or tool you are in, know which action you are taking, and know what confirmation should follow. If the confirmation is missing, pause. That pause is not wasted time; it is professional judgment, and it is how complex workflows start to feel magical instead of stressful.

[JAMIE]
That is a better way to say it than just follow the steps.

[ALEX]
Right. Steps matter, but understanding wins. That is episode 3. Next in the series is episode 4, where we keep building the same contributor muscles.
<<<END_TRANSCRIPT>>>
