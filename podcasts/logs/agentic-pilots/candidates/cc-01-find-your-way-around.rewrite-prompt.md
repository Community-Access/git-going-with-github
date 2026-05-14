You are rewriting a podcast transcript for variety and teachability.
Use automatic model selection (no model is specified by caller).
Return ONLY the transcript text with valid speaker markers.

Hard format requirements:
- Allowed markers only: [ALEX], [JAMIE], [PAUSE]
- Marker line must be on its own line
- Keep script structure conversational and teachable
- Keep concept coverage aligned to source materials

Slug: cc-01-find-your-way-around
Title: Challenge 01: Find Your Way Around
Description: Repository orientation, headings, tabs, file tree navigation, and confidence in the Learning Room.

Concept checklist to preserve:
- Repository orientation, headings, tabs, file tree navigation, and confidence in the Learning Room.
- Challenge title: Find Your Way Around

Source heading checklist to preserve (topic coverage, can paraphrase):
- ## Expected findings
- ### Code tab
- ### Issues tab
- ### docs/welcome.md
- ### Repository description and README
- ## Alternate approaches
- ## What matters
- ## Authoritative Sources
- ### Section-Level Source Map
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
This is Challenge Coach for Find Your Way Around. I am Alex, and we are going to teach the move before asking you to prove it.

[JAMIE]
And I am Jamie. I will translate the challenge into the practical questions learners actually have while doing it.

[PAUSE]

[ALEX]
Repository orientation, headings, tabs, file tree navigation, and confidence in the Learning Room. That is the task layer. The teaching layer is understanding why the move belongs in a contributor workflow.

[JAMIE]
So evidence is not just proof for the facilitator. It is part of how the learner understands the workflow.

[ALEX]
Right. A good challenge produces something inspectable: a comment, issue, branch, commit, pull request, review, or clear note about what happened.

[PAUSE]

[JAMIE]
What makes this practice feel low-stakes but still real?

[ALEX]
Challenge 1: Find Your Way Around: What you will do: Explore the learning-room repository like a scavenger hunt. The next useful detail is concrete: Find the tabs, navigate the file tree, read the README, and locate key files.

[JAMIE]
How would you walk the room through that step by step?

[ALEX]
Here is the learner-facing version. You do not need to complete them in order. Put another way, for each item, write a short sentence about what you found." placeholder. A good GitHub workflow is like a well-run meeting: everyone knows the topic, the next action, and who has the floor.

[ALEX]
Here are the anchors worth keeping. [ ] Find the Code tab and count how many files are in the root of the repository. [ ] Open the Issues tab and find an open issue. [ ] Navigate to docs/welcome.md and read the first paragraph. [ ] Find the repository description (hint: it is near the top of the Code tab).

[ALEX]
Start here: I found files in the root of the repository. Then: The open issue I found was titled " ". Next: The first paragraph of welcome.md says. Last: The repository description is. The point is not speed; the point is never losing your place.

[JAMIE]
What does the learner do first, second, and then after that?

[ALEX]
Walk it in order: The README says this workshop is for; and The About section shows. Each step should leave a trace you can name.

[JAMIE]
What is the one idea that makes the next few steps less mysterious?

[ALEX]
This is the move inside Peer simulation check: after you submit your evidence, open the Peer Simulation: Welcome Link Needs Context issue in this repository and leave an encouraging comment or reaction. That matters in practice: If your facilitator gave you access to a real buddy repository, you may use your buddy's issue instead.

[JAMIE]
That feels much more doable when you say it as one move.

[ALEX]
Right. The magic is not speed. The magic is knowing what changed and why it matters.

[PAUSE]

[ALEX]
Now bring the learner back to the room. Code tab has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
For a learner, the useful signals are concrete. The root of the repository contains files like README.md, docs/, and.github/. The file count varies as the repository evolves -- any reasonable count is correct.

[JAMIE]
What would you say to someone who is already bracing for this to be too much?

[ALEX]
Issues tab has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
The parts worth keeping in working memory are these. You should have found at least one open issue. If no issues were open, noting that the tab exists is sufficient.

[ALEX]
A solid issue habit is to read the title, the body, and the timeline before acting. You are listening for the requested action, the missing evidence, and the person who needs a response.

[ALEX]
That matters because of the next idea. docs/welcome.md has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
On the ground, that means a few things. The first paragraph introduces the learning room and what students will do. You may have noticed TODO comments -- those are intentionally left for Challenge 2.

[ALEX]
The useful habit is simple: orient, act, verify, then continue. That pause between action and trust is part of the work.

[PAUSE]

[JAMIE]
Okay, set the room for us. What are we walking into?

[ALEX]
Repository description and README has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Here is what that changes in practice. The description appears at the top of the Code tab, below the repository name. The README renders automatically below the file list.

[ALEX]
This is where the talk moves from concept to action. Alternate approaches has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
The room should hear these as checkpoints. github.com: Click each tab in the top navigation bar. github.dev: press the period key on any repo page to open the web editor, then use the Explorer sidebar. VS Code with GitHub extension: Use the GitHub Repositories extension to browse remotely. GitHub CLI: gh repo view Community-Access/git-going-with-github --web opens the repo in a browser.

[JAMIE]
Now it sounds like a workflow instead of a wall of instructions.

[ALEX]
That is where confidence comes from: not from never getting lost, but from knowing how to recover.

[ALEX]
A solid pull request habit is to separate three questions: what changed, why it changed, and what still needs review. That keeps the conversation useful instead of noisy.

[JAMIE]
Where do you want a learner to place their attention here?

[ALEX]
The teaching point here is not the label; it is the move. The learning objective is familiarity with repository navigation, not memorizing exact file counts. That is the difference between guessing and knowing: If you explored the tabs and found the key files, you completed this challenge.

[PAUSE]

[ALEX]
Before the learner moves on. This part earns its place because use this map to verify facts for each major section in this file. That is the difference between following directions and owning the workflow.

[ALEX]
That becomes easier when you listen for these cues. Expected findings: GitHub Docs, home, GitHub Changelog. Alternate approaches: GitHub Docs, home, GitHub Changelog. What matters: GitHub Docs, home, GitHub Changelog.

[JAMIE]
Give me the version that sounds like an instructor, not a manual.

[ALEX]
How GitHub Is Organized, and How to Orient Yourself on Every Page: Read this before navigating GitHub for the first time. That gives the learner a foothold: the lesson is the mental model that makes every subsequent guide easier.

[ALEX]
Now slow down for the part people usually miss. Here is the learner-facing version. GitHub is not a single page or a single kind of page. The next useful detail is concrete: It is three nested levels, and understanding which level you are on changes how you navigate.

[PAUSE]

[JAMIE]
If I am listening before the workshop starts, what should settle in my mind first?

[ALEX]
This is the move inside 2. What Is Always on Every GitHub Page: no matter where you navigate on GitHub, the same global navigation bar is at the top of every page. Put another way, understanding its landmark structure means you always have a fixed orientation point.

[JAMIE]
That is the kind of detail that keeps a screen reader user oriented.

[ALEX]
Yes. The named thing - the heading, tab, field, branch, or button - is the handhold.

[ALEX]
Here is the moment where the page starts to make sense. Anchor this part on The Global Navigation Bar (always present). Visually, the top bar commonly contains the following controls. That matters in practice: The order and compactness can change with viewport width, account state, and product rollout. The durable skill is not memorizing one screen. It is knowing how to find your footing when the screen changes.

[JAMIE]
Let's pause on Secondary navigation (repository pages only). What should a learner take away from it?

[ALEX]
The reason this matters is simple: when you are inside a repository, a second navigation bar appears below the global bar. This is the part to say slowly: This contains the repository's tabs: Code, Issues, Pull requests, Actions, Projects, Wiki, Security, Insights, and Settings.

[ALEX]
A solid navigation habit is to prove where you are before activating controls. Headings, landmarks, and the address bar are not trivia; they are your map.

[PAUSE]

[ALEX]
The next point gives the learner a handle. Learning Cards: What Is Always on Every GitHub Page has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
This is where the lesson becomes something you can check. Press D to cycle landmarks; the first landmark on every page is "Navigation Menu" -- this is your fixed anchor point. Press G then N (two keystrokes in sequence) to jump directly to Notifications from any GitHub page. The global search field is reachable with S or /; after searching, results load into the Main landmark -- press D to jump there. The global navigation bar is pinned to the top of every page; at 200%+ zoom it may shrink icons but keeps all items in a single row. The notification bell shows an unread count as a blue dot (or a number badge); zoom in on the top-right corner to see it clearly. Repository tabs below the global bar highlight the active tab with a colored underline; switch to a high-contrast theme if the underline is hard to see.

[JAMIE]
Let's pause on 3. How to Tell Where You Are. What should a learner take away from it?

[ALEX]
If the interface shifts, 3. How to Tell Where You Are is still useful because three signals tell you exactly where you are on GitHub, without needing to see the visual layout.

[ALEX]
Hold that next to this. Put Signal 1: The URL into plain language. GitHub URLs are readable descriptions of your location. For someone navigating by keyboard or screen reader, this detail matters: Your browser's address bar is always reachable with Alt+D (Windows) or Cmd+L (Mac). The interface gets easier when it becomes a set of named places instead of a wall of controls.

[JAMIE]
So the learner is not behind if they stop there and check the page.

[ALEX]
Yes. Pausing to verify is not a detour; it is how you keep control of the workflow.

[PAUSE]

[JAMIE]
There are a lot of tools in play. How do we keep that from feeling like a contest?

[ALEX]
The teaching point here is not the label; it is the move. GitHub formats page titles consistently.

[ALEX]
That connects to another useful point. This part earns its place because press 1 (in Browse Mode) on any GitHub page to jump to the first H1 heading. That is the difference between guessing and knowing: What you hear tells you what type of page you are on.

[JAMIE]
Let's pause on Page Type 1: Repository Home (Code Tab). What should a learner take away from it?

[ALEX]
Page Type 1: Repository Home (Code Tab): This is the central hub of any project. This is where the workflow starts to feel magical, because the result becomes visible and explainable: It is where you find the file tree, the README, branch information, and links to all other parts of the repository.

[PAUSE]

[ALEX]
Here is the practical turn. What to expect has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
These are the details that keep the idea from floating away. H1: owner/repo-name. Repository navigation landmark (Code, Issues, PRs, Actions tabs). A file tree table - navigate with T then Ctrl+Alt+Arrow. A rendered README below the file tree. A sidebar with About, Topics, Releases, Contributors.

[JAMIE]
Let's pause on Page Type 2: Issues List. What should a learner take away from it?

[ALEX]
This is the move inside Page Type 2: Issues List: a searchable, filterable list of all issues in the repository.

[JAMIE]
That is a useful checkpoint before anyone starts pressing keys.

[ALEX]
Exactly. Checkpoints turn uncertainty into information.

[ALEX]
Keep the thread going. What to expect has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
If someone is taking notes, this is the short list. H1: Issues. A search and filter bar at the top. Each issue is a link with: issue title, labels, number, author, comment count. Issue titles are H3 headings - press 3 to jump between them. Landmark: "Search Results List".

[PAUSE]

[JAMIE]
Let's pause on Page Type 3: Issue Detail. What should a learner take away from it?

[ALEX]
The reason this matters is simple: the full view of a single

[...middle omitted for length...]

other students' PRs?": Not inside their Learning Room repos -- those are private to each student. For someone navigating by keyboard or screen reader, this detail matters: You can see other participants' work in two ways.

[ALEX]
Here is the part to remember. During Challenge 3 ("Join the Conversation") and Challenge 8 ("Culture"), the facilitators pair you with classmates and add you as a collaborator on each other's repos so you can review. During Day 2 (and the Bonus C challenge), everyone contributes to the public accessibility-agents repo, where every PR is visible to everyone.

[ALEX]
Keep the teaching thread moving. Here is the learner-facing version. When the facilitators pair you for peer review, the pairing is a starting point, not a mandate. The useful version is: You can request additional reviewers manually. A good GitHub workflow is like a well-run meeting: everyone knows the topic, the next action, and who has the floor.

[PAUSE]

[JAMIE]
Let's pause on "Will my PR get lost when everyone is working at once?". What should a learner take away from it?

[ALEX]
This is the move inside "Will my PR get lost when everyone is working at once?": your repo is your own; you only see your own PRs. That is the difference between guessing and knowing: Gandalf's feedback is on your PR alone, and any peer reviewer is specifically assigned to you.

[ALEX]
Keep the teaching thread moving. Anchor this part on "Can I comment on someone else's PR?". When the facilitators pair you for review, yes -- you will be added as a collaborator and can comment, approve, and request changes on their PR. This is where the workflow starts to feel magical, because the result becomes visible and explainable: On the public accessibility-agents repo, anyone can comment on any open PR.

[JAMIE]
Let's pause on "What if my reviewer doesn't respond?". What should a learner take away from it?

[ALEX]
The reason this matters is simple: mention them directly in a PR comment: "@name, any thoughts on the changes I pushed?" Or ask a facilitator to follow up.

[PAUSE]

[ALEX]
Keep the teaching thread moving. Do not treat "Can I work with a friend?" as decoration. The facilitators arrange peer pairings, but if you know someone else in the cohort and you want to review each other's work, ask either Jeff or Michael to add you to each other's repos. The workshop is closer to rehearsal than lecture. You hear the move, try the move, and then check what changed.

[JAMIE]
Let's pause on "How long does review take?". What should a learner take away from it?

[ALEX]
If the interface shifts, "How long does review take?" is still useful because when pairings happen during a workshop block, typically 15-60 minutes. Put another way, if a reviewer is slow, the facilitators can step in or assign someone else.

[ALEX]
Keep the teaching thread moving. Put "What if bot feedback is wrong?" into plain language. Gandalf is intentionally educational, not punitive -- if you disagree with a check, the facilitators can override it. That matters in practice: Gandalf is not perfect, which is exactly why human review still matters.

[PAUSE]

[JAMIE]
How do these exercises create confidence instead of pressure?

[ALEX]
The teaching point here is not the label; it is the move. The Learning Room has challenges for all skill levels. This is the part to say slowly: You can pick what interests you, complete at your pace, and continue after the workshop -- your repo stays yours.

[ALEX]
Keep the teaching thread moving. This part earns its place because every PR you open and merge in the Learning Room is a real contribution. The listener should be able to check this: You found something to improve You made a meaningful change You received feedback (technical + human) You incorporated suggestions You merged your work. That is the difference between following directions and owning the workflow.

[JAMIE]
Before we leave Section-Level Source Map, what is the practical point?

[ALEX]
Section-Level Source Map: Use this map to verify facts for each major section in this file.

[ALEX]
Here is the part to remember. What Is the Learning Room?: GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests. Why a Per-Student Repo?: GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests. Step-by-Step: Accept Your Classroom Assignment and Open Your Repo: GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests. Workshop Recommendation (Chapter 4): GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests. Two Tracks That Reinforce Each Other: GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests. Your Learning Room Folder Structure: GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests.

[PAUSE]

[JAMIE]
What is the final checkpoint?

[ALEX]
You should be able to point to the evidence, explain the action, and describe what you would do next if this were a real open source project. If you can teach the move back, you have learned it, and the challenge starts to feel much less intimidating.

[JAMIE]
And if they get stuck?

[ALEX]
Read the latest message, not the loudest worry. Check the issue, the branch, the pull request, the status check, or the bot comment. Then ask for help with those facts in hand. That is how professionals collaborate.
<<<END_TRANSCRIPT>>>
