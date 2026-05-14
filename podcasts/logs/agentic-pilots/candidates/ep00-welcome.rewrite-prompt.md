You are rewriting a podcast transcript for variety and teachability.
Use automatic model selection (no model is specified by caller).
Return ONLY the transcript text with valid speaker markers.

Hard format requirements:
- Allowed markers only: [ALEX], [JAMIE], [PAUSE]
- Marker line must be on its own line
- Keep script structure conversational and teachable
- Keep concept coverage aligned to source materials

Slug: ep00-welcome
Title: Episode 0: Welcome to Git Going with GitHub
Description: A tour of the workshop structure, the two-day arc, and what you will accomplish.

Concept checklist to preserve:
- What open source means and why it matters
- The two-day workshop structure: Day 1 (browser) and Day 2 (VS Code + agents)
- The learning philosophy: manual skill first, then automation
- What a repository, issue, pull request, and merge are (high-level preview)
- The 55 accessibility agents across 3 teams and what they do on Day 2
- How the chapters, appendices, and exercises fit together
- The exercise pattern: Try It, You are done when, What success feels like
- Encouragement for learners who are new to the command line or Git

Source heading checklist to preserve (topic coverage, can paraphrase):
- ## GitHub Learning Room - Your Complete Workshop Companion
- ## How This Course Works
- ### Live Agenda and Self-Paced Curriculum
- ### The Two Days
- #### Day 1 - GitHub Foundations (Browser)
- #### Day 2 - VS Code + Accessibility Agents (Desktop)
- ### The Journey Arc
- ## Before You Begin
- ## Companion Audio Series
- ## Day 1: GitHub Foundations
- ## Day 2: VS Code + Accessibility Agents
- ## Appendices - Reference Material
- ### Always Open (Bookmark These)
- ### Core Reference (C-D)
- ### Git Deep Dive (E-F)
- ### VS Code and Copilot (G-L)
- ### GitHub Platform (M-S)
- ### Community and Continuing (T-Z)
- ## Exercises at a Glance
- ## Getting Help
- ## Workshop at a Glance
- ## Authoritative Sources
- ### Section-Level Source Map
- ## What This Guide Does
- ## When Tools or Pages Change
- ## Step 1 - Know Your Starting Place
- ## Step 2 - Accept the GitHub Classroom Assignment
- ## Step 3 - Understand the Learning Room
- ## Step 4 - Find Challenge 1
- ## Step 5 - Choose the Tool That Fits the Moment
- ## Step 6 - What to Listen For with a Screen Reader
- ## Step 7 - Use the Support Built into the Course
- ## Step 8 - Your First Success Check
- ## Where to Go Next
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
Welcome to Git Going with GitHub, episode 0: Welcome to Git Going with GitHub. I am Alex. Today we are going to make the shape of the workshop feel magical in practice: clear, teachable, and recoverable when the interface surprises you.

[JAMIE]
And I am Jamie. I will be the voice of the learner who is willing to ask, what is this for, where am I, and how do I know I did it right?

[PAUSE]

[ALEX]
The big idea today: A tour of the workshop structure, the two-day arc, and what you will accomplish. We will name the concept, explain why it matters, practice the move, and point out the checks that make the outcome feel almost magical because it is verifiable.

[JAMIE]
So the episode should work even if someone has not read the chapter yet.

[ALEX]
Exactly. The transcript has to stand on its own. It can point toward practice, but it should teach the concept right here in the conversation.

[PAUSE]

[JAMIE]
How should they picture the shape of the workshop?

[ALEX]
GitHub Learning Room - Your Complete Workshop Companion: the learner is about to begin a two-day journey into open source collaboration using GitHub, VS Code, and GitHub Copilot - all designed for screen reader and keyboard-only navigation. The next useful detail is concrete: This guide is your starting point and table of contents for everything in this workshop.

[ALEX]
The next layer is this. Here is the learner-facing version. This is a two-day workshop built around one idea: you will make real contributions to a real open source project. A good GitHub workflow is like a well-run meeting: everyone knows the topic, the next action, and who has the floor.

[JAMIE]
What should feel predictable before the first live session starts?

[ALEX]
This is the move inside Live Agenda and Self-Paced Curriculum: the live hackathon agenda is intentionally smaller than the full curriculum. That matters in practice: Live sessions prioritize the core contribution path, while the complete chapter set remains available for self-paced preparation, catch-up, remote participation, and post-event continuation.

[ALEX]
That shows up in the workshop in a few specific ways. Live core: The facilitator chooses the minimum path needed for participants to make and understand a real contribution. Async follow-up: Chapters and challenges not covered live can be completed after the session using the Learning Room, solutions, podcasts, and Slack channel. Remote participation: Remote cohorts should use the same checkpoints and evidence prompts, with written instructions available before each live block.

[JAMIE]
That feels much more doable when you say it as one move.

[ALEX]
Right. The magic is not speed. The magic is knowing what changed and why it matters.

[PAUSE]

[ALEX]
Now bring the learner back to the room. Anchor this part on Day 1 - GitHub Foundations (Browser). You learn GitHub's web interface using only your keyboard and screen reader. This is the part to say slowly: The live Day 1 core path gets you through repository navigation, issues, branches, commits, and a first pull request.

[JAMIE]
Where is the promise of the workshop, underneath all the logistics?

[ALEX]
The reason this matters is simple: you move to Visual Studio Code, learn GitHub Copilot, and activate the Accessibility Agents ecosystem. The listener should be able to check this: The live Day 2 core path prepares you to make a real contribution, and the async continuation path gives you time to polish and submit it well.

[ALEX]
The useful habit is simple: orient, act, verify, then continue. That pause between action and trust is part of the work.

[ALEX]
That matters because of the next idea. Do not treat The Journey Arc as decoration. The key principle: Learn the manual skill first, then see how it is automated. That is not trivia. The agents only make sense when you already understand what they are doing. The workshop is closer to rehearsal than lecture. You hear the move, try the move, and then check what changed.

[PAUSE]

[JAMIE]
What is the pre-flight check here?

[ALEX]
If the interface shifts, Before You Begin is still useful because start with Get Going with GitHub if you want the most guided path. For someone navigating by keyboard or screen reader, this detail matters: It explains how GitHub Classroom creates your private Learning Room repository, how Challenge 1 appears, how evidence prompts work, and how to choose between browser, github.dev, VS Code, GitHub Desktop, and command-line paths.

[ALEX]
Here is what that changes in practice. Creating a GitHub account. Installing Git. Setting up VS Code (optional for Day 1, required for Day 2). Configuring your screen reader for GitHub.

[ALEX]
This is where the talk moves from concept to action. Put Companion Audio Series into plain language. The audio track is a standalone teaching companion for the same concepts. The useful version is: Use the episode whenever audio helps you enter or revisit the topic.

[ALEX]
The room should hear these as checkpoints. Browse the podcast episodes with HTML5 audio players. Subscribe via RSS in your preferred podcast app. Episodes are 8-18 minutes each - perfect for commutes, walks, or screen reader breaks.

[JAMIE]
Now it sounds like a workflow instead of a wall of instructions.

[ALEX]
That is where confidence comes from: not from never getting lost, but from knowing how to recover.

[JAMIE]
Where does the workshop stop being a tour and start becoming contribution?

[ALEX]
The teaching point here is not the label; it is the move. These chapters are designed to be read and practiced in order. That is the difference between guessing and knowing: The live Day 1 agenda covers the core path in a shorter Pacific-time event day and treats later challenges as stretch or async follow-up.

[PAUSE]

[ALEX]
Before the learner moves on. This part earns its place because day 2 moves you from the browser to the desktop. This is where the workflow starts to feel magical, because the result becomes visible and explainable: Every skill maps directly to what you learned on Day 1. That is the difference between following directions and owning the workflow.

[JAMIE]
What would you say to someone who is already bracing for this to be too much?

[ALEX]
Appendices - Reference Material: Open these at any time during the workshop. That gives the learner a foothold: they are not part of the chapter sequence - use them when you need them.

[ALEX]
Now slow down for the part people usually miss. Here is the learner-facing version. The workshop includes structured exercises across the curriculum. The next useful detail is concrete: Every exercise is designed to be completed in 1-5 minutes, is impossible to fail, and follows the same pattern: Try It - You're done when - What success feels like.

[PAUSE]

[JAMIE]
What do you want them to do when the plan breaks?

[ALEX]
This is the move inside Getting Help: if you get stuck at any point during the workshop, these resources are always available. Put another way, open a support issue at https://github.com/Community-Access/support/issues describing what you tried, what happened, and what you expected.

[JAMIE]
That is the kind of detail that keeps a screen reader user oriented.

[ALEX]
Yes. The named thing - the heading, tab, field, branch, or button - is the handhold.

[ALEX]
Here is the moment where the page starts to make sense. Anchor this part on Workshop at a Glance. Start with Chapter 00: Pre-Workshop Setup. The durable skill is not memorizing one screen. It is knowing how to find your footing when the screen changes.

[JAMIE]
What is the one idea that makes the next few steps less mysterious?

[ALEX]
The reason this matters is simple: use this map to verify facts for each major section in this file.

[ALEX]
The useful version is not abstract; it sounds like this. GitHub Learning Room - Your Complete Workshop Companion: GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests. How This Course Works: GitHub Docs, home, GitHub Changelog. Before You Begin: GitHub Docs, home, GitHub Changelog. Companion Audio Series: GitHub Docs, home, GitHub Changelog. Day 1: GitHub Foundations: GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests. Day 2: VS Code + Accessibility Agents: GitHub Docs, home, GitHub Changelog, GitHub Copilot docs, Custom instructions support matrix, About custom agents.

[PAUSE]

[ALEX]
The next point gives the learner a handle. Do not treat What This Guide Does as decoration. This workshop is designed so you are never left guessing what comes next. The listener should be able to check this: The goal is to build confidence one checkable step at a time.

[ALEX]
This is where the lesson becomes something you can check. A GitHub Classroom assignment link from the facilitator. Your own private Learning Room repository. Challenge issues that tell you exactly what to do. Evidence prompts that tell you what to post when you finish.

[JAMIE]
How would you walk the room through that step by step?

[ALEX]
If the interface shifts, When Tools or Pages Change is still useful because GitHub.com, GitHub Classroom, VS Code, GitHub Copilot, github.dev, browser extensions, and agent tools change often. That is not trivia. This course is actively maintained, and we use official sources and live checks wherever possible, but your screen may not always match the exact wording in a step.

[ALEX]
Start here: Check the URL and browser tab title. Then: Move by headings, landmarks, tabs, and button names instead of relying only on visual order. Next: Open keyboard shortcut help (? on GitHub) or the VS Code Command Palette when a shortcut or control differs. Last: Read the surrounding labels before activating a control. Pause after each step and listen for the confirmation before moving on.

[JAMIE]
What does the learner do first, second, and then after that?

[ALEX]
Walk it in order: Ask a facilitator or file a curriculum issue with the page link, the step that differed, and what you heard or observed. The point is not speed; the point is never losing your place.

[ALEX]
Hold that next to this. Put Step 1 - Know Your Starting Place into plain language. Before Day 1 starts, complete Chapter 00: Pre-Workshop Setup. For someone navigating by keyboard or screen reader, this detail matters: That chapter helps you create or verify your GitHub account, configure accessibility settings, choose a browser, install Git and VS Code, and confirm your screen reader setup. The interface gets easier when it becomes a set of named places instead of a wall of controls.

[JAMIE]
So the learner is not behind if they stop there and check the page.

[ALEX]
Yes. Pausing to verify is not a detour; it is how you keep control of the workflow.

[PAUSE]

[JAMIE]
Turn that into a path someone can follow.

[ALEX]
The teaching point here is not the label; it is the move. At the start of Day 1, the facilitator gives you a GitHub Classroom assignment link. The useful version is: It usually starts with https://classroom.github.com/a/.

[ALEX]
Think of this as 4 checks: Open the assignment link in the browser where you are signed in to GitHub; If GitHub asks you to authorize GitHub Classroom, activate Authorize GitHub Classroom; If you are asked to choose your name from a roster, find your name and select it. If your name is missing, use the skip option and tell the facilitator; and Activate Accept this assignment. Each step should leave a trace you can name.

[JAMIE]
What is the ordered workflow?

[ALEX]
The path is straightforward once it is named. Step one is wait while GitHub Classroom creates your private repository. Step two is refresh the page until the repository link appears. Step three is open the repository link and bookmark it. If one step does not match what you hear, stop there and re-orient.

[ALEX]
That connects to another useful point. This part earns its place because the Learning Room is a private repository created from a template. That is the difference between guessing and knowing: Everyone starts from the same materials, but your work belongs to you.

[ALEX]
For a learner, the useful signals are concrete. You have your own issues, branches, commits, and pull requests. Other students do not see your work unless the facilitator intentionally pairs you. Mistakes are expected and recoverable. Bot feedback is educational, not punitive.

[JAMIE]
Give me the sequence, because order matters here.

[ALEX]
Step 4 - Find Challenge 1: After your Learning Room repository is created, the Student Progression Bot creates your fir

[...middle omitted for length...]

led Challenge 1: Find Your Way Around. Finally, open the issue and read the body from top to bottom. That is the rhythm: orient, act, verify, continue.

[JAMIE]
Let's pause on Step 4 - Find Challenge 1. What should a learner take away from it?

[ALEX]
Start here: Follow the checklist in the issue. Then: Post your evidence in the evidence field or as the requested comment. Next: Close the challenge issue when the instructions tell you to close it. That small check between steps is what makes the workflow reliable.

[PAUSE]

[ALEX]
Here is the practical turn. Here is the learner-facing version. There is no single correct way to use GitHub. That gives the learner a foothold: the workshop teaches the workflow first, then offers tool paths. A good GitHub workflow is like a well-run meeting: everyone knows the topic, the next action, and who has the floor.

[ALEX]
On the ground, that means a few things. GitHub.com in the browser: Best for Day 1, issues, pull requests, repository navigation, and reviews. github.dev: Best when you want a VS Code-style editor in the browser without installing anything. Press the period key from many repository pages to open it. VS Code desktop: Best for Day 2, local Git, Copilot, extensions, and deeper editing work. GitHub Desktop: Best if you want a desktop Git workflow without typing Git commands.

[JAMIE]
Give me the version that sounds like an instructor, not a manual.

[ALEX]
This is the move inside Step 6 - What to Listen For with a Screen Reader: when you feel lost, listen for structure before you take action. The next useful detail is concrete: If you are not sure where you are, pause and navigate by headings or landmarks.

[ALEX]
These are the details that keep the idea from floating away. Page title. Repository name heading. Landmark names such as main content or repository navigation. Tab names such as Code, Issues, and Pull requests.

[JAMIE]
That is a useful checkpoint before anyone starts pressing keys.

[ALEX]
Exactly. Checkpoints turn uncertainty into information.

[ALEX]
A solid navigation habit is to prove where you are before activating controls. Headings, landmarks, and the address bar are not trivia; they are your map.

[ALEX]
Keep the thread going. Anchor this part on Step 7 - Use the Support Built into the Course. If something does not work, do not start over silently. Put another way, read the latest bot message, check the challenge issue, and ask for help with the link to the page where you are stuck.

[ALEX]
That becomes easier when you listen for these cues. Every challenge issue includes instructions and evidence prompts. Every chapter has an If You Get Stuck section. Every challenge has a reference solution in the solutions folder. Gandalf posts feedback on pull requests.

[PAUSE]

[JAMIE]
Let's pause on Step 8 - Your First Success Check. What should a learner take away from it?

[ALEX]
The reason this matters is simple: you are ready to continue when you can say these four things. That matters in practice: You do not need to understand every GitHub feature before you begin.

[ALEX]
The path is straightforward once it is named. Step one is I can open my Learning Room repository. Step two is I can find the Issues tab. Step three is I can open Challenge 1. Step four is I know where to post my evidence and how to ask for help. Pause after each step and listen for the confirmation before moving on.

[JAMIE]
Let's pause on Where to Go Next. What should a learner take away from it?

[ALEX]
Do not treat Where to Go Next as decoration. Use this order if you want the gentlest path. This is the part to say slowly: We will keep the path explicit, and we will keep giving you the next step. The workshop is closer to rehearsal than lecture. You hear the move, try the move, and then check what changed.

[ALEX]
First, chapter 00: Pre-Workshop Setup. Then, chapter 01: Choose Your Tools. After that, chapter 02: Understanding GitHub. Finally, chapter 03: Navigating Repositories. The point is not speed; the point is never losing your place.

[JAMIE]
Before we leave Where to Go Next, what is the practical point?

[ALEX]
Start here: Chapter 04: The Learning Room. Then: Your Challenge 1: Find Your Way Around issue in your Learning Room repository. Each step should leave a trace you can name.

[JAMIE]
Where do you want a learner to place their attention here?

[ALEX]
If the interface shifts, Section-Level Source Map is still useful because use this map to verify facts for each major section in this file.

[ALEX]
If someone is taking notes, this is the short list. What This Guide Does: GitHub Docs, home, GitHub Changelog. When Tools or Pages Change: GitHub Docs, home, GitHub Changelog, GitHub Pages docs, GitHub Pages quickstart. Where to Go Next: GitHub Docs, home, GitHub Changelog.

[PAUSE]

[JAMIE]
What should people carry with them after this?

[ALEX]
Carry the map. Know what page or tool you are in, know which action you are taking, and know what confirmation should follow. If the confirmation is missing, pause. That pause is not wasted time; it is professional judgment, and it is how complex workflows start to feel magical instead of stressful.

[JAMIE]
That is a better way to say it than just follow the steps.

[ALEX]
Right. Steps matter, but understanding wins. That is episode 0. Next in the series is episode 1, where we keep building the same contributor muscles.
<<<END_TRANSCRIPT>>>
