You are rewriting a podcast transcript for variety and teachability.
Use automatic model selection (no model is specified by caller).
Return ONLY the transcript text with valid speaker markers.

Hard format requirements:
- Allowed markers only: [ALEX], [JAMIE], [PAUSE]
- Marker line must be on its own line
- Keep script structure conversational and teachable
- Keep concept coverage aligned to source materials

Slug: ep02-github-web-structure
Title: Episode 2: Understanding GitHub on the Web
Description: How GitHub organizes its web pages, heading structure, landmarks, and keyboard shortcuts.

Concept checklist to preserve:
- GitHub page types: dashboard, repository, issue, pull request, profile, settings
- The HTML heading hierarchy GitHub uses on each page type
- ARIA landmarks and regions on GitHub pages
- The global navigation bar and how to reach it by keyboard
- GitHub built-in keyboard shortcuts: pressing ? to see them
- The jump-to-content skip link on every GitHub page
- How to orient yourself on an unfamiliar page using headings
- The command palette: / or Control+K for quick navigation
- The difference between GitHub.com and github.dev

Source heading checklist to preserve (topic coverage, can paraphrase):
- ## How GitHub Is Organized, and How to Orient Yourself on Every Page
- ## Table of Contents
- ## 1. GitHub's Three-Level Structure
- ## 2. What Is Always on Every GitHub Page
- ### The Global Navigation Bar (always present)
- ### Secondary navigation (repository pages only)
- ### Learning Cards: What Is Always on Every GitHub Page
- ## 3. How to Tell Where You Are
- ### Signal 1: The URL
- ### Signal 2: The browser tab title
- ### Signal 3: The first H1 heading
- ## 4. The Five Key Page Types
- ### Page Type 1: Repository Home (Code Tab)
- #### What to expect
- ### Page Type 2: Issues List
- #### What to expect
- ### Page Type 3: Issue Detail
- #### What to expect
- ### Page Type 4: Pull Request Detail
- #### What to expect
- ### Page Type 5: Your Personal Feed and Profile
- #### What to expect on your feed
- #### What to expect on your profile
- ### Learning Cards: The Five Key Page Types
- ## 5. Visual Map of a Repository Page
- ### Description
- ### Screen reader navigation of this page
- ## 6. Screen Reader Orientation Sequence
- ### Learning Cards: Screen Reader Orientation Sequence
- ## 7. Landmark Structure by Page Type
- ### Repository home page landmarks (in order)
- ### Issues list page landmarks
- ### Issue detail page landmarks
- ### Pull request Conversation tab landmarks
- ### Pull request Files Changed tab landmarks
- ## 8. GitHub's Heading Hierarchy in Practice
- ### Repository home
- ### Issues list
- ### Issue detail
- ### Pull request detail - Conversation tab
- ### Pull request detail - Files Changed tab
- ### Learning Cards: GitHub's Heading Hierarchy
- ## 9. How GitHub's Layout Changes by Viewport
- ### At full desktop width (1200px+)
- ### At tablet width (768-1199px)
- ### At mobile width (below 768px)
- ## 10. The Mental Model - Building Your Internal Map
- ### Learning Cards: Building Your Internal Map
- ## Try It: The 60-Second Orientation
- ## If You Get Stuck
- ## Day 2 Amplifier
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
This is Git Going with GitHub, episode 2: Understanding GitHub on the Web. I am Alex. By the end of this episode, Understanding GitHub on the Web should feel less like a wall of GitHub words and more like a set of moves with visible momentum.

[JAMIE]
And I am Jamie. I am here for the practical questions: what should I listen for, what can go wrong, and what is the next calm move?

[PAUSE]

[ALEX]
Today we are working on this: How GitHub organizes its web pages, heading structure, landmarks, and keyboard shortcuts. I want the learner to leave with a mental map, not just a remembered path through buttons.

[JAMIE]
So the goal is understanding first, then action, then confirmation.

[ALEX]
Right. We are building a rhythm: orient yourself, take one intentional action, then verify what changed before moving on. That rhythm is where the magic lives.

[PAUSE]

[JAMIE]
Okay, set the room for us. What are we walking into?

[ALEX]
How GitHub Is Organized, and How to Orient Yourself on Every Page: Read this before navigating GitHub for the first time. The next useful detail is concrete: the lesson is the mental model that makes every subsequent guide easier.

[ALEX]
The next layer is this. Here is the learner-facing version. GitHub is not a single page or a single kind of page. Put another way, it is three nested levels, and understanding which level you are on changes how you navigate. A good GitHub workflow is like a well-run meeting: everyone knows the topic, the next action, and who has the floor.

[JAMIE]
What is the one idea that makes the next few steps less mysterious?

[ALEX]
This is the move inside 2. What Is Always on Every GitHub Page: no matter where you navigate on GitHub, the same global navigation bar is at the top of every page. That matters in practice: Understanding its landmark structure means you always have a fixed orientation point.

[JAMIE]
That feels much more doable when you say it as one move.

[ALEX]
Right. The magic is not speed. The magic is knowing what changed and why it matters.

[PAUSE]

[ALEX]
Now bring the learner back to the room. Anchor this part on The Global Navigation Bar (always present). Visually, the top bar commonly contains the following controls. This is the part to say slowly: The order and compactness can change with viewport width, account state, and product rollout.

[ALEX]
A solid pull request habit is to separate three questions: what changed, why it changed, and what still needs review. That keeps the conversation useful instead of noisy.

[JAMIE]
What would you say to someone who is already bracing for this to be too much?

[ALEX]
The reason this matters is simple: when you are inside a repository, a second navigation bar appears below the global bar. The listener should be able to check this: This contains the repository's tabs: Code, Issues, Pull requests, Actions, Projects, Wiki, Security, Insights, and Settings.

[ALEX]
A solid navigation habit is to prove where you are before activating controls. Headings, landmarks, and the address bar are not trivia; they are your map.

[ALEX]
That matters because of the next idea. Learning Cards: What Is Always on Every GitHub Page has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
On the ground, that means a few things. Press D to cycle landmarks; the first landmark on every page is "Navigation Menu" -- this is your fixed anchor point. Press G then N (two keystrokes in sequence) to jump directly to Notifications from any GitHub page. The global search field is reachable with S or /; after searching, results load into the Main landmark -- press D to jump there. The global navigation bar is pinned to the top of every page; at 200%+ zoom it may shrink icons but keeps all items in a single row. The notification bell shows an unread count as a blue dot (or a number badge); zoom in on the top-right corner to see it clearly. Repository tabs below the global bar highlight the active tab with a colored underline; switch to a high-contrast theme if the underline is hard to see.

[ALEX]
The useful habit is simple: orient, act, verify, then continue. That pause between action and trust is part of the work.

[PAUSE]

[JAMIE]
If I am listening before the workshop starts, what should settle in my mind first?

[ALEX]
If the interface shifts, 3. How to Tell Where You Are is still useful because three signals tell you exactly where you are on GitHub, without needing to see the visual layout.

[ALEX]
This is where the talk moves from concept to action. Put Signal 1: The URL into plain language. GitHub URLs are readable descriptions of your location. The useful version is: Your browser's address bar is always reachable with Alt+D (Windows) or Cmd+L (Mac).

[JAMIE]
Now it sounds like a workflow instead of a wall of instructions.

[ALEX]
That is where confidence comes from: not from never getting lost, but from knowing how to recover.

[JAMIE]
What stays the same when the tool changes?

[ALEX]
The teaching point here is not the label; it is the move. GitHub formats page titles consistently.

[PAUSE]

[ALEX]
Before the learner moves on. This part earns its place because press 1 (in Browse Mode) on any GitHub page to jump to the first H1 heading. This is where the workflow starts to feel magical, because the result becomes visible and explainable: What you hear tells you what type of page you are on. That is the difference between following directions and owning the workflow.

[JAMIE]
Give me the version that sounds like an instructor, not a manual.

[ALEX]
Page Type 1: Repository Home (Code Tab): This is the central hub of any project. That gives the learner a foothold: it is where you find the file tree, the README, branch information, and links to all other parts of the repository.

[ALEX]
Now slow down for the part people usually miss. What to expect has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Here is the part that makes the next action easier. H1: owner/repo-name. Repository navigation landmark (Code, Issues, PRs, Actions tabs). A file tree table - navigate with T then Ctrl+Alt+Arrow. A rendered README below the file tree. A sidebar with About, Topics, Releases, Contributors.

[PAUSE]

[JAMIE]
Where do you want a learner to place their attention here?

[ALEX]
This is the move inside Page Type 2: Issues List: a searchable, filterable list of all issues in the repository.

[JAMIE]
That is the kind of detail that keeps a screen reader user oriented.

[ALEX]
Yes. The named thing - the heading, tab, field, branch, or button - is the handhold.

[ALEX]
A solid issue habit is to read the title, the body, and the timeline before acting. You are listening for the requested action, the missing evidence, and the person who needs a response.

[ALEX]
Here is the moment where the page starts to make sense. What to expect has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Listen for the small confirmations in this list. H1: Issues. A search and filter bar at the top. Each issue is a link with: issue title, labels, number, author, comment count. Issue titles are H3 headings - press 3 to jump between them. Landmark: "Search Results List".

[JAMIE]
Let's pause on Page Type 3: Issue Detail. What should a learner take away from it?

[ALEX]
The reason this matters is simple: the full view of a single issue: the original report, all comments, labels, assignees, and the timeline.

[PAUSE]

[ALEX]
The next point gives the learner a handle. What to expect has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
This is where the lesson becomes something you can check. H1: The issue title. H2: "Description" (original issue body). H2: "Activity" (comments and events). Landmark: "Add a comment" (the reply box at the bottom). Sidebar: assignees, labels, milestone, linked PRs.

[JAMIE]
Let's pause on Page Type 4: Pull Request Detail. What should a learner take away from it?

[ALEX]
If the interface shifts, Page Type 4: Pull Request Detail is still useful because the most complex page on GitHub - it has three tabs (Conversation, Commits, Files Changed), each with its own structure.

[ALEX]
Hold that next to this. What to expect has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Here are the anchors worth keeping. H1: The PR title. Landmark: "Pull request tabs" (Conversation, Commits, Files changed). Conversation tab: same structure as an issue detail. Files Changed tab: a file tree on the left + diff view on the right. Landmark: "Pull request navigation tabs" - use D to reach it, then Left/Right Arrow to switch tabs.

[JAMIE]
So the learner is not behind if they stop there and check the page.

[ALEX]
Yes. Pausing to verify is not a detour; it is how you keep control of the workflow.

[PAUSE]

[JAMIE]
Let's pause on Page Type 5: Your Personal Feed and Profile. What should a learner take away from it?

[ALEX]
The teaching point here is not the label; it is the move. Your personal home (github.com) shows activity from repositories you follow. The useful version is: Your profile (github.com/username) shows your contribution graph, pinned repos, and bio.

[ALEX]
That connects to another useful point. What to expect on your feed has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
For a learner, the useful signals are concrete. A "For you" activity stream - recent activity from repos you watch. A sidebar of suggested repositories and topics.

[JAMIE]
Let's pause on What to expect on your profile. What should a learner take away from it?

[ALEX]
What to expect on your profile has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
The parts worth keeping in working memory are these. H1: Your username. A contribution activity graph (visually prominent; read as a table by screen readers). Pinned repositories. A list of your recent public activity.

[PAUSE]

[ALEX]
Here is the practical turn. Learning Cards: The Five Key Page Types has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Here is what that changes in practice. On the Repository Home page, press T to jump to the file table, then Ctrl+Alt+Down Arrow to walk through files row by row. On an Issue Detail page, press 3 to jump between H3 comment headers; each announces the author and timestamp. On the PR Files Changed tab, press 3 to jump between file name headings; press 4 to jump between diff hunk headers inside each file. On the Repository Home page, the file tree uses alternating row shading; enable a high-contrast theme if rows blend together. Issue labels appear as small colored badges next to each title in the Issues list; zoom to 150%+ so the label text is readable. On the PR Files Changed tab, additions are shaded green and deletions are shaded red; high-contrast themes use bolder shading.

[JAMIE]
Let's pause on 5. Visual Map of a Repository Page. What should a learner take away from it?

[ALEX]
This is the move inside 5. Visual Map of a Repository Page: see also: Appendix A: Glossary defines every term used in this course. The next useful detail is concrete: Appendix B: Screen Reader Cheat Sheet has quick-reference keyboard shortcuts for navigating headings and landmarks.

[JAMIE]
That is a useful checkpoint before anyone starts pressing keys.

[ALEX]
Exactly. Checkpoints turn uncertainty into information.

[ALEX]
Keep the thread going. Anchor this part on Description. A repository home page is laid out from top to bottom as follows. Put another way, the Global Navigation bar (landmark: "Navigation Menu") contains the GitHub logo, Search, Copilot, Pull Requests, Issues, Notifications bell, and your avatar.

[PAUSE]

[JAMIE]
Let's pause on Screen reader navigation of this page. What should a learner take away from it?

[ALEX]
The reason this matters is simple: press 1 to hear "owner/repo-name" (the H1, confirms you are on the right repo). That matters in practice: Press D to hear "Navigation Menu," then D again for "Repository navigation," then D again for "Main" (the file tree area).

[JAMIE]
Give me the sequence, because order matters here.

[ALEX]
Do not treat 6. Screen Reader Orientation Sequence as decoration. Do this every time you land on a new GitHub page. This is the part to say slowly: It takes about 10 seconds once you are practiced. The workshop is closer to rehearsal than lecture. You

[...middle omitted for length...]

x). What should a learner take away from it?

[ALEX]
The reason this matters is simple: consistent experience recommendation: Use your browser maximized or at full desktop width during this workshop. Put another way, GitHub's landmark and heading structure is most consistent at desktop width.

[ALEX]
The room should hear these as checkpoints. Global navigation collapses to a hamburger-style menu. Tabs may scroll horizontally or collapse. The landmark structure is the same but the "Navigation Menu" landmark becomes a toggle.

[JAMIE]
What does the learner do first, second, and then after that?

[ALEX]
Do not treat 10. The Mental Model - Building Your Internal Map as decoration. After your first day of using GitHub, you will have an internal map. That matters in practice: Here is what that map should look like.

[ALEX]
First, press 1 - hear the H1 - know what floor you are on. Then, press D - hear the landmarks - know what rooms are available. After that, press NVDA+F7 - see the full outline - know what's in the room. If one step does not match what you hear, stop there and re-orient.

[PAUSE]

[JAMIE]
Let's pause on Learning Cards: Building Your Internal Map. What should a learner take away from it?

[ALEX]
Learning Cards: Building Your Internal Map has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
These are the details that keep the idea from floating away. Memorize the elevator shortcuts: G I (Issues), G P (Pull Requests), G C (Code), G A (Actions); press? on any page to see the full list. The "Add a comment" landmark is always at the bottom of Issue and PR Conversation pages; press D repeatedly until you hear it to jump directly to the reply box. If a page feels unfamiliar, fall back to the three-step sequence: 1, D, NVDA+F7 and you will re-orient within seconds. Think of GitHub like a building: the top bar (lobby) never changes, the tabs below it (floor selector) change per repo, and the main area (room) changes per page. When disoriented at high zoom, press Home to return to the top of the page where the navigation bar and repo tabs are always visible. The comment box ("mailbox") at the bottom of issue and PR pages has a distinct white input area with a green "Comment" button on its right.

[JAMIE]
Turn that into a path someone can follow.

[ALEX]
Put Try It: The 60-Second Orientation into plain language. Time: 1 minute What you need: A browser with your screen reader running. The listener should be able to check this: Open any GitHub repository - try github.com/community-access/accessibility-agents - and prove to yourself that the mental model works. The interface gets easier when it becomes a set of named places instead of a wall of controls.

[ALEX]
Walk it in order: Press 1 - your screen reader announces the repo name. You know where you are; Press D - you hear the first landmark. Press D again to hear the next one. You now know the rooms on this floor; Press 2 - you jump to the first section heading. Press 2 again to scan the page structure; and Press H three times - you're moving through headings at any level. You're reading the outline. That small check between steps is what makes the workflow reliable.

[JAMIE]
So this is less about memorizing and more about noticing.

[ALEX]
Right. Once the learner can name the move, the interface becomes much less intimidating.

[JAMIE]
Where does the workshop stop being a tour and start becoming contribution?

[ALEX]
The teaching point here is not the label; it is the move. Once you have this mental model solid, the Accessibility Agents make more sense. That is not trivia. The @daily-briefing agent reads your GitHub notifications and presents a structured report - but the report structure mirrors the landmark structure of GitHub itself: global activity, then per-repo activity, then per-issue and per-PR detail.

[PAUSE]

[ALEX]
Another way to ground it. This part earns its place because use this map to verify facts for each major section in this file.

[ALEX]
These are the pieces that turn the idea into a usable move. How GitHub Is Organized, and How to Orient Yourself on Every Page: GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests. GitHub's Three-Level Structure: GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests. What Is Always on Every GitHub Page: GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests. How to Tell Where You Are: GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests. The Five Key Page Types: GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests. Visual Map of a Repository Page: GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests.

[PAUSE]

[JAMIE]
What should people carry with them after this?

[ALEX]
Carry the map. Know what page or tool you are in, know which action you are taking, and know what confirmation should follow. If the confirmation is missing, pause. That pause is not wasted time; it is professional judgment, and it is how complex workflows start to feel magical instead of stressful.

[JAMIE]
That is a better way to say it than just follow the steps.

[ALEX]
Right. Steps matter, but understanding wins. That is episode 2. Next in the series is episode 3, where we keep building the same contributor muscles.
<<<END_TRANSCRIPT>>>
