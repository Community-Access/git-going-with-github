You are rewriting a podcast transcript for variety and teachability.
Use automatic model selection (no model is specified by caller).
Return ONLY the transcript text with valid speaker markers.

Hard format requirements:
- Allowed markers only: [ALEX], [JAMIE], [PAUSE]
- Marker line must be on its own line
- Keep script structure conversational and teachable
- Keep concept coverage aligned to source materials

Slug: cc-04-branch-out
Title: Challenge 04: Branch Out
Description: Creating a safe working branch and understanding why branches protect main.

Concept checklist to preserve:
- Creating a safe working branch and understanding why branches protect main.
- Challenge title: Branch Out

Source heading checklist to preserve (topic coverage, can paraphrase):
- ## On github.com
- ## In VS Code (with Git)
- ## In GitHub Desktop
- ## With GitHub CLI
- ## Branch naming
- ## What matters
- ## Authoritative Sources
- ### Section-Level Source Map
- ## What Is the Learning Room?
- ## Why a Per-Student Repo?
- ## Step-by-Step: Accept Your Classroom Assignment and Open Your Repo
- ### 1. Open the assignment link
- ### 2. Identify yourself (if asked)
- ### 3. Accept the assignment
- ### 4. Open your new repository
- ### 5. Find your first challenge issue
- ### 6. Confirm Gandalf can talk to you
- ## Workshop Recommendation (Chapter 4)
- ### Readiness Checkpoint
- ## Two Tracks That Reinforce Each Other
- ### Track 1: GitHub Skills Modules (Optional Self-Paced Practice)
- ### Track 2: Your Learning Room Repository (Required Workshop Track)
- #### How the Two Tracks Compare
- ### Learning Cards: Two Tracks, One Account
- ## Your Learning Room Folder Structure
- ## Your Practice Branch
- ### Why you create a separate branch
- ### How to use your branch
- ### Learning Cards: Your Practice Branch
- ### Tool Cards: Switch to Your Practice Branch
- ## The Practice Files: What You Will Work On
- ### docs/welcome.md - Introduction to Open Source Contribution
- #### [TODO] 1 - "Who Can Contribute?" section
- #### [TODO] 2 - "Finding Something to Work On" section
- #### [TODO] 3 - "After Your Contribution Is Merged" section
- ### docs/keyboard-shortcuts.md - Screen Reader Shortcut Reference
- ### docs/setup-guide.md - Getting Ready to Contribute
- ### docs/CHALLENGES.md - Your Challenge Menu
- ### Bonus Challenges
- ## How PR Sharing Works
- ### Step 1: Student Opens a PR
- #### Student A (working on Challenge 3: Complete Welcome Guide)
- ### Step 2: Automation Bot Validates
- #### Bot (`.github/workflows/learning-room-pr-bot.yml`)
- ### Step 3: Peer Review (Facilitator-Arranged)
- #### Visibility
- ### Step 4: Reviewer Reads and Comments
- #### Your assigned peer reviewer (when one is paired with you)
- #### Visibility
- ### Step 5: Author Responds and Updates
- #### You (PR author)
- #### Visibility
- ### Step 6: Merge and Celebration
- #### When the review is approved (or you decide to self-merge)
- #### Progression Bot Posts the Next Challenge
- #### Visibility
- ### Learning Cards: How PR Sharing Works
- ## What You and Your Peers See
- ## The Learning Automation System
- ### Type 1: Automated Bot Feedback (30 seconds)

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
Welcome to Challenge Coach: Branch Out. I am Alex. Before you do the task, we are going to make the skill feel concrete enough to practice and memorable enough to reuse.

[JAMIE]
And I am Jamie. I will keep asking what the learner should do, what evidence counts, and how to recover if the page does something unexpected.

[PAUSE]

[ALEX]
The skill focus is Creating a safe working branch and understanding why branches protect main. This is rehearsal for real contribution, so the evidence matters because it proves the move happened.

[JAMIE]
So the challenge has to leave the learner with both confidence and a trail of evidence.

[ALEX]
Exactly. Evidence is not busywork. It is how a learner, a facilitator, and a future maintainer can understand what changed and why.

[PAUSE]

[JAMIE]
What makes this practice feel low-stakes but still real?

[ALEX]
Challenge 4: Branch Out: What you will do: Create a personal branch named learn/YOUR-USERNAME where you will make your Day 1 changes.

[ALEX]
A solid Git habit is to know which branch you are on, what changed, and what confirmation you expect before you run the next command.

[JAMIE]
How would you walk the room through that step by step?

[ALEX]
Instructions has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Start here: Make sure you are on the Code tab of the learning-room repository. Then: Find the branch dropdown (it shows "main" by default). Next: Type learn/YOUR-USERNAME (replace YOUR-USERNAME with your actual GitHub username). Last: Select Create branch: learn/YOUR-USERNAME from main. The point is not speed; the point is never losing your place.

[JAMIE]
What is the one idea that makes the next few steps less mysterious?

[ALEX]
This is the move inside Branch naming convention: your branch name must follow this pattern: learn/ followed by your GitHub username. That matters in practice: This naming convention helps facilitators and automation identify your work.

[ALEX]
That shows up in the workshop in a few specific ways. learn/octocat. learn/mona-lisa. learn/student42.

[JAMIE]
That feels much more doable when you say it as one move.

[ALEX]
Right. The magic is not speed. The magic is knowing what changed and why it matters.

[PAUSE]

[ALEX]
Now bring the learner back to the room. Anchor this part on Peer simulation check. Open the peer-simulation PR and notice its branch name. This is the part to say slowly: If you have a real buddy, ask whether they created their branch and help them find the branch dropdown if they are stuck.

[JAMIE]
What is the ordered workflow?

[ALEX]
The reason this matters is simple: you can switch to it using the same dropdown.

[ALEX]
The path is straightforward once it is named. Step one is go to the repository's Code tab. Step two is click the branch dropdown (it says "main"). Step three is type a new branch name like fix/welcome-todo. Step four is click "Create branch: fix/welcome-todo from main". That is the rhythm: orient, act, verify, continue.

[ALEX]
The useful habit is simple: orient, act, verify, then continue. That pause between action and trust is part of the work.

[JAMIE]
How do you keep commands from becoming magic words?

[ALEX]
Do not treat In VS Code (with Git) as decoration. Or use the Source Control sidebar: click the branch name in the bottom-left status bar, then select "Create new branch.". The workshop is closer to rehearsal than lecture. You hear the move, try the move, and then check what changed.

[ALEX]
Treat examples as spoken recipes, not decorations. You may hear something like git checkout -b fix/welcome-todo. Read the command, understand what it changes, then run it only when the repository state matches the lesson.

[PAUSE]

[JAMIE]
What does the learner do first, second, and then after that?

[ALEX]
In GitHub Desktop has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Start here: Click the Current Branch dropdown. Then: Click "New Branch". Next: Enter the name fix/welcome-todo. Last: Confirm it is based on main. The sequence works because every action has a confirmation.

[JAMIE]
What should happen before anyone copies and runs it?

[ALEX]
With GitHub CLI has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Treat examples as spoken recipes, not decorations. You may hear something like gh repo clone the workshop organization/learning-room-your username; cd learning-room; git checkout -b fix/welcome-todo. Read the command, understand what it changes, then run it only when the repository state matches the lesson.

[JAMIE]
Now it sounds like a workflow instead of a wall of instructions.

[ALEX]
That is where confidence comes from: not from never getting lost, but from knowing how to recover.

[JAMIE]
Where do you want a learner to place their attention here?

[ALEX]
The teaching point here is not the label; it is the move. Good branch names are short and descriptive. That is the difference between guessing and knowing: The convention type/description is common but not required.

[ALEX]
These are the details that keep the idea from floating away. fix/welcome-todo -- fixing a TODO in welcome.md. feature/add-schedule-link -- adding a new link. docs/update-readme -- documentation change.

[PAUSE]

[ALEX]
Before the learner moves on. This part earns its place because the learning objective is understanding that branches let you work in isolation without affecting main. This is where the workflow starts to feel magical, because the result becomes visible and explainable: If you created any branch with any name, you completed this challenge. That is the difference between following directions and owning the workflow.

[JAMIE]
What would you say to someone who is already bracing for this to be too much?

[ALEX]
Section-Level Source Map: Use this map to verify facts for each major section in this file.

[ALEX]
If someone is taking notes, this is the short list. On github.com: GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests. In VS Code (with Git): GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests. In GitHub Desktop: GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests. With GitHub CLI: GitHub Docs, home, GitHub Changelog, GitHub Copilot docs, Custom instructions support matrix, About custom agents. Branch naming: GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests. What matters: GitHub Docs, home, GitHub Changelog.

[ALEX]
Now slow down for the part people usually miss. Here is the learner-facing version. The Learning Room is your own private GitHub repository for the workshop. The next useful detail is concrete: When you accept the GitHub Classroom assignment in Block 0, GitHub copies the Community-Access/learning-room-template repository into the workshop classroom organization as the workshop organization/learning-room-your username.

[PAUSE]

[JAMIE]
Okay, set the room for us. What are we walking into?

[ALEX]
This is the move inside Why a Per-Student Repo?: GitHub Classroom gives each participant their own repository for three reasons. Put another way, real open source projects are shared spaces, and you will absolutely contribute to one on Day 2 (accessibility-agents) and through the Bonus C challenge.

[ALEX]
These are the pieces that turn the idea into a usable move. Safety -- you can experiment, break things, and recover without affecting anyone else. Authenticity -- you practice real repository work: issues, branches, pull requests, checks, reviews, and merging. Pace -- you progress through the 9 Day 1 challenges as fast or as slow as you need; nobody is waiting on you and you are not blocking anybody else.

[JAMIE]
That is the kind of detail that keeps a screen reader user oriented.

[ALEX]
Yes. The named thing - the heading, tab, field, branch, or button - is the handhold.

[ALEX]
Here is the moment where the page starts to make sense. Anchor this part on Step-by-Step: Accept Your Classroom Assignment and Open Your Repo. This is the very first hands-on step of Day 1. That matters in practice: By the end of this walkthrough you will have your own Learning Room repository on GitHub and your first challenge issue waiting for you. The durable skill is not memorizing one screen. It is knowing how to find your footing when the screen changes.

[JAMIE]
Give me the sequence, because order matters here.

[ALEX]
1. Open the assignment link has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
The path is straightforward once it is named. Step one is in the same browser where you are signed into GitHub, open the Day 1 assignment link the facilitator shared. Step two is the page that loads is hosted on classroom.github.com. Your screen reader announces a heading with the assignment name (for example, "Git Going with GitHub -- Day 1"). Step three is if the page asks you to authorize GitHub Classroom to access your GitHub account, activate Authorize GitHub Classroom. This is a one-time step. The sequence works because every action has a confirmation.

[PAUSE]

[JAMIE]
Turn that into a path someone can follow.

[ALEX]
Do not treat 2. Identify yourself (if asked) as decoration. GitHub Classroom may ask you to pick your name from a roster so the facilitators can match your GitHub username to the registration list.

[ALEX]
First, if a roster page appears, navigate the list with arrow keys or use Find-in-Page (Ctrl+F / Cmd+F) to search for your name. Then, activate the link or button next to your name. After that, if you do not see your name on the roster, activate the Skip to the next step link and tell the facilitator in chat. They will reconcile the roster after your repo is created. Keep it that plain: know where you are, make the move, check the result.

[JAMIE]
Let's pause on 3. Accept the assignment. What should a learner take away from it?

[ALEX]
If the interface shifts, 3. Accept the assignment is still useful because the status page does not auto-announce when the repo is ready. That is not trivia. Use Browse mode and press K to step through links until you hear your repository link, or refresh the page until it appears.

[ALEX]
Start here: You now see a screen with a button that says Accept this assignment (or just Accept the assignment ). Activate it. Then: The page changes to a status screen that says something like "You are ready to go!" with a refresh option. GitHub Classroom is now copying the learning-room-template repository into the workshop classroom organization and granting you access to your private. Next: Activate the Refresh link (or reload the page with F5) every 15 seconds or so until you see a link to your new repository. The link looks like https://github.com/the workshop organization/learning-room-your username. Pause after each step and listen for the confirmation before moving on.

[JAMIE]
Let's pause on 4. Open your new repository. What should a learner take away from it?

[ALEX]
4. Open your new repository has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Here are the anchors worth keeping. The repo name in the heading matches learning-room-your username. The About sidebar (or repo description) confirms this is a private workshop copy. You see folders like docs/,.github/, and files like README.md. These came from the template.

[ALEX]
Walk it in order: Activate the link to your repository. You land on the standard GitHub repo page for the workshop organization/learning-room-your username; Verify three things on this page; and Bookmark this page. You will return here for every Day 1 challenge. The point is not speed; the point is never losing your place.

[JAMIE]
So the learner is not behind if they stop there and check the page.

[ALEX]
Yes. Pausing to verify is not a detour; it is how you keep control of the workflow.

[PAUSE]

[JAMIE]
Let's pause on 5. Find your first challenge issue. What should a learner take away from it?

[ALEX]
The teaching point here is not the label; it is the move. When your Learning Room repo is ready, Challenge 1 appears as a GitHub issue in your repo. The useful version is: The facilitators prepare this by running the Student Progression Bot after students accept the Classroom assignment.

[ALEX]
Think of this as 3 checks: From your repository page, navigate to the Issues tab. Keyboard shortcut: press G then I; You should see at least one open issue with a

[...middle omitted for length...]

this change exist? -- What problem does it solve, or what goal does it advance? Then, what is the scope? -- Which files changed, and roughly how big is the change? After that, how was it tested? -- Did you verify that the change works, and how? Finally, what should I pay attention to? -- Are there tricky parts, trade-offs, or areas where you want a second opinion? The point is not speed; the point is never losing your place.

[JAMIE]
Let's pause on The Closes XX Pattern. What should a learner take away from it?

[ALEX]
If the interface shifts, The Closes XX Pattern is still useful because GitHub recognizes special keywords in PR descriptions that automatically close linked issues when the PR merges. This is the part to say slowly: You do not need to close issues by hand -- just include the right keyword followed by the issue number.

[PAUSE]

[ALEX]
Keep the teaching thread moving. Put Before/After Structure into plain language. One of the most effective patterns for PR descriptions is showing the state before your change and the state after. The listener should be able to check this: This gives the reviewer an instant mental model of what changed without reading the diff line by line.

[JAMIE]
Let's pause on A PR Description Template. What should a learner take away from it?

[ALEX]
The teaching point here is not the label; it is the move. Here is a template you can copy into your PR descriptions. That is not trivia. Not every section applies to every PR, but filling in even a few sentences per section makes a meaningful difference.

[ALEX]
Keep the teaching thread moving. This part earns its place because even experienced contributors make these mistakes. For someone navigating by keyboard or screen reader, this detail matters: Knowing what to avoid is half the battle. That is the difference between following directions and owning the workflow.

[PAUSE]

[JAMIE]
Let's pause on Good vs. Bad: Side by Side. What should a learner take away from it?

[ALEX]
Good vs. Bad: Side by Side: No context, no linked issue, no explanation of what file or what was wrong with it. The useful version is: A reviewer seeing this has to open the diff, figure out which file changed, read every line, and guess at the intent.

[ALEX]
Keep the teaching thread moving. Learning Cards: Writing PR Descriptions That Get Reviewed has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Here is the part to remember. Use Markdown headings ( ) in your description (Summary, Changes, Related Issues, Testing) so reviewers can press H to jump between sections. Type Closes followed by the issue number to auto-close the linked issue on merge; GitHub autocompletes when you type. Press Ctrl+Shift+P in the description text area to toggle between Write and Preview modes; Preview renders your Markdown so you can check structure before submitting. Use the Preview tab to verify your Markdown renders correctly; headings, bullet lists, and code blocks are easier to proofread in rendered form. Keep bullet points short (one line each) so the description is scannable at high zoom without excessive horizontal scrolling. When including screenshots, add alt text in the Markdown image syntax: so every reader gets the same information.

[JAMIE]
Let's pause on Try It: Read a Real Pull Request. What should a learner take away from it?

[ALEX]
This is the move inside Try It: Read a Real Pull Request: time: 3 minutes What you need: Browser, signed in to GitHub. This is where the workflow starts to feel magical, because the result becomes visible and explainable: Go to the Learning Room repository's Pull Requests tab and find any open or recently closed PR.

[ALEX]
Walk it in order: Navigate to Pull Requests (G then P in Focus Mode); Open the first PR in the list (press Enter on its title); Read the description - press 2 to jump to the first section heading, then arrow down to read. Look for: which file was changed (docs/welcome.md, docs/keyboard-shortcuts.md, or docs/setup-guide.md)? Which challenge was this PR solving? Does the description; and Check the conversation - press 3 to jump between comments. Read what the validation bot reported - did the bot find any accessibility issues like broken headings or non-descriptive links? How did the author respond? Pause after each step and listen for the confirmation before moving on.

[JAMIE]
Before we leave Try It: Read a Real Pull Request, what is the practical point?

[ALEX]
Think of this as 1 checks: Look at the diff - press D to the "Pull request tabs" landmark, then navigate to "Files changed" and press Enter. Press H to scan the changed file headings. If the PR touched docs/welcome.md, you should see + lines where the [TODO] sections were filled in. If. The point is not speed; the point is never losing your place.

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
