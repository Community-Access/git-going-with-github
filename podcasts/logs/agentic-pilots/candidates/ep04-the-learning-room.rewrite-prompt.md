You are rewriting a podcast transcript for variety and teachability.
Use automatic model selection (no model is specified by caller).
Return ONLY the transcript text with valid speaker markers.

Hard format requirements:
- Allowed markers only: [ALEX], [JAMIE], [PAUSE]
- Marker line must be on its own line
- Keep script structure conversational and teachable
- Keep concept coverage aligned to source materials

Slug: ep04-the-learning-room
Title: Episode 4: The Learning Room
Description: Your shared practice environment: challenges, PR workflow, bot feedback, peer review.

Concept checklist to preserve:
- What the Learning Room repository is and its purpose
- How practice challenges are structured
- The fork-edit-PR workflow for submitting solutions
- How the automated bot provides feedback on your pull request
- Peer review: reading and commenting on classmate work
- Why low-stakes practice builds real confidence
- How to find your challenge and know when you are done

Source heading checklist to preserve (topic coverage, can paraphrase):
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
- ### Type 2: Peer Reviewer Feedback (15-60 minutes)
- ### Type 3: Progress Tracking (on merge)
- ## Study Groups (Optional)
- ### Example
- ## Key Differences: Skills Module vs. Your Learning Room
- ## Tips for Reviewing a Peer's PR
- ### Finding PRs to Review
- ### Reading a PR You're Assigned To

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
Welcome to Git Going with GitHub, episode 4: The Learning Room. I am Alex. Today we are going to make The Learning Room feel magical in practice: clear, teachable, and recoverable when the interface surprises you.

[JAMIE]
And I am Jamie. I will be the voice of the learner who is willing to ask, what is this for, where am I, and how do I know I did it right?

[PAUSE]

[ALEX]
The big idea today: Your shared practice environment: challenges, PR workflow, bot feedback, peer review. We will name the concept, explain why it matters, practice the move, and point out the checks that make the outcome feel almost magical because it is verifiable.

[JAMIE]
So the episode should work even if someone has not read the chapter yet.

[ALEX]
Exactly. The transcript has to stand on its own. It can point toward practice, but it should teach the concept right here in the conversation.

[PAUSE]

[JAMIE]
Okay, set the room for us. What are we walking into?

[ALEX]
What Is the Learning Room?: The Learning Room is your own private GitHub repository for the workshop. The next useful detail is concrete: When you accept the GitHub Classroom assignment in Block 0, GitHub copies the Community-Access/learning-room-template repository into the workshop classroom organization as the workshop organization/learning-room-your username.

[ALEX]
The next layer is this. Here is the learner-facing version. GitHub Classroom gives each participant their own repository for three reasons. Put another way, real open source projects are shared spaces, and you will absolutely contribute to one on Day 2 (accessibility-agents) and through the Bonus C challenge. A good GitHub workflow is like a well-run meeting: everyone knows the topic, the next action, and who has the floor.

[ALEX]
Here are the anchors worth keeping. Safety -- you can experiment, break things, and recover without affecting anyone else. Authenticity -- you practice real repository work: issues, branches, pull requests, checks, reviews, and merging. Pace -- you progress through the 9 Day 1 challenges as fast or as slow as you need; nobody is waiting on you and you are not blocking anybody else.

[JAMIE]
What is the one idea that makes the next few steps less mysterious?

[ALEX]
This is the move inside Step-by-Step: Accept Your Classroom Assignment and Open Your Repo: this is the very first hands-on step of Day 1. That matters in practice: By the end of this walkthrough you will have your own Learning Room repository on GitHub and your first challenge issue waiting for you.

[JAMIE]
That feels much more doable when you say it as one move.

[ALEX]
Right. The magic is not speed. The magic is knowing what changed and why it matters.

[PAUSE]

[JAMIE]
Turn that into a path someone can follow.

[ALEX]
1. Open the assignment link has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Think of this as 3 checks: In the same browser where you are signed into GitHub, open the Day 1 assignment link the facilitator shared; The page that loads is hosted on classroom.github.com. Your screen reader announces a heading with the assignment name (for example, "Git Going with GitHub -- Day 1"); and If the page asks you to authorize GitHub Classroom to access your GitHub account, activate Authorize GitHub Classroom. This is a one-time step. If one step does not match what you hear, stop there and re-orient.

[JAMIE]
What is the ordered workflow?

[ALEX]
The reason this matters is simple: GitHub Classroom may ask you to pick your name from a roster so the facilitators can match your GitHub username to the registration list.

[ALEX]
The path is straightforward once it is named. Step one is if a roster page appears, navigate the list with arrow keys or use Find-in-Page (Ctrl+F / Cmd+F) to search for your name. Step two is activate the link or button next to your name. Step three is if you do not see your name on the roster, activate the Skip to the next step link and tell the facilitator in chat. They will reconcile the roster after your repo is created. That is the rhythm: orient, act, verify, continue.

[ALEX]
The useful habit is simple: orient, act, verify, then continue. That pause between action and trust is part of the work.

[JAMIE]
Give me the sequence, because order matters here.

[ALEX]
Do not treat 3. Accept the assignment as decoration. The status page does not auto-announce when the repo is ready. That is not trivia. Use Browse mode and press K to step through links until you hear your repository link, or refresh the page until it appears. The workshop is closer to rehearsal than lecture. You hear the move, try the move, and then check what changed.

[ALEX]
First, you now see a screen with a button that says Accept this assignment (or just Accept the assignment ). Activate it. Then, the page changes to a status screen that says something like "You are ready to go!" with a refresh option. GitHub Classroom is now copying the learning-room-template repository into the workshop classroom organization and granting you access to your private. After that, activate the Refresh link (or reload the page with F5) every 15 seconds or so until you see a link to your new repository. The link looks like https://github.com/the workshop organization/learning-room-your username. That small check between steps is what makes the workflow reliable.

[PAUSE]

[JAMIE]
How would you walk the room through that step by step?

[ALEX]
4. Open your new repository has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Here is what that changes in practice. The repo name in the heading matches learning-room-your username. The About sidebar (or repo description) confirms this is a private workshop copy. You see folders like docs/,.github/, and files like README.md. These came from the template.

[ALEX]
Start here: Activate the link to your repository. You land on the standard GitHub repo page for the workshop organization/learning-room-your username. Then: Verify three things on this page. Next: Bookmark this page. You will return here for every Day 1 challenge. The sequence works because every action has a confirmation.

[JAMIE]
What does the learner do first, second, and then after that?

[ALEX]
Put 5. Find your first challenge issue into plain language. When your Learning Room repo is ready, Challenge 1 appears as a GitHub issue in your repo. The useful version is: The facilitators prepare this by running the Student Progression Bot after students accept the Classroom assignment.

[ALEX]
Walk it in order: From your repository page, navigate to the Issues tab. Keyboard shortcut: press G then I; You should see at least one open issue with a title like "Challenge 1: Find Your Way Around" authored by aria-bot (or github-actions[bot]); and Open Challenge 1. Read the issue body -- it tells you what to do, where to find evidence, and how to submit completion. Keep it that plain: know where you are, make the move, check the result.

[JAMIE]
Now it sounds like a workflow instead of a wall of instructions.

[ALEX]
That is where confidence comes from: not from never getting lost, but from knowing how to recover.

[ALEX]
A solid issue habit is to read the title, the body, and the timeline before acting. You are listening for the requested action, the missing evidence, and the person who needs a response.

[JAMIE]
Where do you want a learner to place their attention here?

[ALEX]
The teaching point here is not the label; it is the move. The PR validation bot, Gandalf, posts educational feedback whenever you open a pull request. That is the difference between guessing and knowing: To confirm Gandalf is wired up, open the Actions tab in your repo and look for a workflow named pr-validation-bot (or Gandalf PR Validation ).

[PAUSE]

[ALEX]
Before the learner moves on. This part earns its place because chapter 4 is a system orientation chapter. That is the difference between following directions and owning the workflow.

[ALEX]
That becomes easier when you listen for these cues. There are none. Automation check: none. Why: this chapter explains how your repo is set up and prepares you for the issue-based challenges that start in Chapter 5.

[JAMIE]
Let's pause on Readiness Checkpoint. What should a learner take away from it?

[ALEX]
Readiness Checkpoint has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
First, find docs/CHALLENGES.md in your Learning Room repository. Then, explain the flow: issue - branch - pull request - review - merge. After that, identify where Gandalf bot feedback appears on a PR (the Conversation tab). Each step should leave a trace you can name.

[ALEX]
Now slow down for the part people usually miss. Here is the learner-facing version. Throughout Day 1 you work on two parallel learning tracks, both in your own account.

[PAUSE]

[JAMIE]
If I am listening before the workshop starts, what should settle in my mind first?

[ALEX]
This is the move inside Track 1: GitHub Skills Modules (Optional Self-Paced Practice): scope: Your personal account, optional and self-paced Bot: Mona (GitHub's automated learning bot) guides each step Purpose: Hands-on practice of individual skills, complementary to the workshop.

[ALEX]
These are the pieces that turn the idea into a usable move. Introduction to GitHub - Create branch, open PR, merge. Communicate Using Markdown - Write headings, links, code, tables. Review Pull Requests - Comment, approve, suggest changes.

[JAMIE]
That is the kind of detail that keeps a screen reader user oriented.

[ALEX]
Yes. The named thing - the heading, tab, field, branch, or button - is the handhold.

[ALEX]
A solid pull request habit is to separate three questions: what changed, why it changed, and what still needs review. That keeps the conversation useful instead of noisy.

[ALEX]
Here is the moment where the page starts to make sense. Track 2: Your Learning Room Repository (Required Workshop Track) has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Listen for the small confirmations in this list. Blocks 1-4 (Day 1 morning/afternoon): Challenges 1-7 -- find your way, file an issue, branch, commit, open a PR, survive a merge conflict. Block 5 (Day 1 evening): Challenges 8-9 -- culture and merge day. Block 6 (Day 1 evening): Community tools (labels, milestones, notifications).

[JAMIE]
Can you translate that into plain choices?

[ALEX]
How the Two Tracks Compare has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Use the comparison to make a decision, not to recite a table. The main contrasts are: GitHub Skills (optional) means Your Learning Room (required). Create a branch in a Skills repo means Create a branch in your Learning Room. Open a PR means Open a PR.

[PAUSE]

[ALEX]
The next point gives the learner a handle. Learning Cards: Two Tracks, One Account has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
This is where the lesson becomes something you can check. GitHub Skills modules run in your personal account; press G I from any Skills repo to see the issue thread where Mona posts instructions. Your Learning Room repository lives at a different URL inside the workshop organization; bookmark it and use Alt+D (address bar) to confirm which repo you are in. Gandalf's bot comments on your PRs appear as PR conversation comments; press 3 on the PR page to jump between them. GitHub Skills repos have a distinct green banner at the top of the README that says "Start course"; your Learning Room repo has no such banner. Check the repository name in the top-left header to confirm which track you are working in (Skills repo vs. your Learning Room). Gandalf's avatar appears next to bot comments; your human reviewer's avatar appears next to peer review comments.

[JAMIE]
What would you say to someone who is already bracing for this to be too much?

[ALEX]
If the interface shifts, Your Learning Room Folder Structure is still useful because every Learning Room repository (yours and every other participant's) starts as an exact copy of learning-room-template and contains these files and folders.

[ALEX]
A few details make that real. README.md -- Getting started guide.github/. STUDENT GUIDE.md -- How the bot works. IMPLEMENTATION GUIDE.md -- Full setup walkthrough. SETUP AND MAINTENANCE.md -- Maintenance reference. workflows/ -- 3 automation workflows.

[ALEX]
Hold that next to this. Put Your P

[...middle omitted for length...]

ul detail is concrete: You can see other participants' work in two ways.

[ALEX]
Here is the part to remember. During Challenge 3 ("Join the Conversation") and Challenge 8 ("Culture"), the facilitators pair you with classmates and add you as a collaborator on each other's repos so you can review. During Day 2 (and the Bonus C challenge), everyone contributes to the public accessibility-agents repo, where every PR is visible to everyone.

[JAMIE]
Let's pause on "What if I don't agree with my assigned reviewer?". What should a learner take away from it?

[ALEX]
If the interface shifts, "What if I don't agree with my assigned reviewer?" is still useful because when the facilitators pair you for peer review, the pairing is a starting point, not a mandate. Put another way, you can request additional reviewers manually.

[PAUSE]

[ALEX]
Keep the teaching thread moving. Put "Will my PR get lost when everyone is working at once?" into plain language. Your repo is your own; you only see your own PRs. That matters in practice: Gandalf's feedback is on your PR alone, and any peer reviewer is specifically assigned to you. The interface gets easier when it becomes a set of named places instead of a wall of controls.

[JAMIE]
Let's pause on "Can I comment on someone else's PR?". What should a learner take away from it?

[ALEX]
The teaching point here is not the label; it is the move. When the facilitators pair you for review, yes -- you will be added as a collaborator and can comment, approve, and request changes on their PR. This is the part to say slowly: On the public accessibility-agents repo, anyone can comment on any open PR.

[ALEX]
Keep the teaching thread moving. This part earns its place because mention them directly in a PR comment: "@name, any thoughts on the changes I pushed?" Or ask a facilitator to follow up.

[PAUSE]

[JAMIE]
Let's pause on "Can I work with a friend?". What should a learner take away from it?

[ALEX]
"Can I work with a friend?": The facilitators arrange peer pairings, but if you know someone else in the cohort and you want to review each other's work, ask either Jeff or Michael to add you to each other's repos.

[ALEX]
Keep the teaching thread moving. Here is the learner-facing version. When pairings happen during a workshop block, typically 15-60 minutes. For someone navigating by keyboard or screen reader, this detail matters: If a reviewer is slow, the facilitators can step in or assign someone else. A good GitHub workflow is like a well-run meeting: everyone knows the topic, the next action, and who has the floor.

[JAMIE]
Let's pause on "What if bot feedback is wrong?". What should a learner take away from it?

[ALEX]
This is the move inside "What if bot feedback is wrong?": Gandalf is intentionally educational, not punitive -- if you disagree with a check, the facilitators can override it. The useful version is: Gandalf is not perfect, which is exactly why human review still matters.

[PAUSE]

[ALEX]
Keep the teaching thread moving. Anchor this part on "Do I need to complete every challenge?". The Learning Room has challenges for all skill levels. That is the difference between guessing and knowing: You can pick what interests you, complete at your pace, and continue after the workshop -- your repo stays yours.

[JAMIE]
Let's pause on Celebration: You're Contributing. What should a learner take away from it?

[ALEX]
The reason this matters is simple: every PR you open and merge in the Learning Room is a real contribution. This is where the workflow starts to feel magical, because the result becomes visible and explainable: You found something to improve You made a meaningful change You received feedback (technical + human) You incorporated suggestions You merged your work.

[ALEX]
Keep the teaching thread moving. Do not treat Section-Level Source Map as decoration. Use this map to verify facts for each major section in this file. The workshop is closer to rehearsal than lecture. You hear the move, try the move, and then check what changed.

[ALEX]
Here is the part to remember. What Is the Learning Room?: GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests. Why a Per-Student Repo?: GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests. Step-by-Step: Accept Your Classroom Assignment and Open Your Repo: GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests. Workshop Recommendation (Chapter 4): GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests. Two Tracks That Reinforce Each Other: GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests. Your Learning Room Folder Structure: GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests.

[PAUSE]

[JAMIE]
What should people carry with them after this?

[ALEX]
Carry the map. Know what page or tool you are in, know which action you are taking, and know what confirmation should follow. If the confirmation is missing, pause. That pause is not wasted time; it is professional judgment, and it is how complex workflows start to feel magical instead of stressful.

[JAMIE]
That is a better way to say it than just follow the steps.

[ALEX]
Right. Steps matter, but understanding wins. That is episode 4. Next in the series is episode 5, where we keep building the same contributor muscles.
<<<END_TRANSCRIPT>>>
