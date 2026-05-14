You are rewriting a podcast transcript for variety and teachability.
Use automatic model selection (no model is specified by caller).
Return ONLY the transcript text with valid speaker markers.

Hard format requirements:
- Allowed markers only: [ALEX], [JAMIE], [PAUSE]
- Marker line must be on its own line
- Keep script structure conversational and teachable
- Keep concept coverage aligned to source materials

Slug: ep06-working-with-pull-requests
Title: Episode 6: Working with Pull Requests
Description: Creating, reviewing, commenting on, and merging pull requests.

Concept checklist to preserve:
- What a pull request is: a proposal to merge changes from one branch into another
- The difference between an issue and a pull request
- PR anatomy: title, body, commits, files changed, reviewers, labels
- Creating a pull request from a fork (cross-repository)
- Creating a pull request from a branch (same repository)
- Writing a good PR description: what changed, why, and how to test
- The PR timeline: comments, reviews, status checks, merge
- Requesting a review from someone
- Reviewing a pull request: reading the diff
- What additions (green/+) and deletions (red/-) mean in a diff
- Leaving inline comments on specific lines
- Submitting a review: approve, request changes, or comment
- Status checks and what they mean for merging
- Merge options: merge commit, squash and merge, rebase and merge
- When to use each merge strategy
- Draft pull requests: signaling work in progress
- Converting a draft to ready for review
- Using gh pr commands from the terminal as an alternative

Source heading checklist to preserve (topic coverage, can paraphrase):
- ## Creating, Reviewing, and Merging Pull Requests with a Screen Reader
- ## Workshop Recommendation (Chapter 6)
- ### Chapter 6 Challenge Set
- ### Challenge 6.1 Step-by-Step: Create One Small Branch Change
- ### Challenge 6.2 Step-by-Step: Open a Linked PR
- ### Challenge 6.3 Step-by-Step: Pass Required Checks
- ### Expected Outcomes
- ### If You Get Stuck
- ### Learning Moment
- ### Why this feels achievable
- ### About Learning Cards in This Chapter
- ## Local Git Alternative: The Full Branch-Edit-PR Workflow
- ## What Is a Pull Request?
- ## Navigating to Pull Requests
- ### From a PR notification
- ### Learning Cards: Navigating to Pull Requests
- ## The Pull Request List Page
- ## Anatomy of a Pull Request Page
- ## Navigating the PR Tab Bar
- ## Reading the Conversation Tab
- ### PR Description
- ### Status Checks Section
- ### Review Comments
- #### Resolving conversations
- ### Learning Cards: Reading the Conversation Tab
- ## Reading the Commits Tab
- ## Reading the Checks Tab
- ### Learning Cards: Reading the Checks Tab
- ## Reading the Files Changed Tab
- ### File Tree (left panel)
- ### The Diff for a File
- #### Lines in a diff are read as
- ### Navigating the diff with a screen reader
- ### Placing an inline comment on a diff line
- #### Multi-line comment (Windows)
- #### Multi-line comment (macOS)
- ### Viewing comments within the diff
- ### Learning Cards: Reading the Files Changed Tab
- ## Opening a Pull Request
- ### Tool Cards: Open a Pull Request
- ### From the web editor workflow (editing a file on GitHub)
- ### From a fork or feature branch
- ### Filling out the PR form
- #### Title field
- #### Description field
- ## Summary
- ## Changes
- ## Related Issues
- ## Testing
- ## Screenshots / recordings
- ### Setting a Draft PR
- ### Draft Pull Requests - Full Lifecycle
- #### When to use a draft
- #### What a draft PR does differently
- #### Mark a draft ready for review
- #### Screen reader path
- #### Convert an open PR to draft (after opening)
- ### Learning Cards: Opening a Pull Request
- ## Requesting reviewers
- ## Submitting a Review

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
This is Git Going with GitHub, episode 6: Working with Pull Requests. I am Alex. By the end of this episode, Working with Pull Requests should feel less like a wall of GitHub words and more like a set of moves with visible momentum.

[JAMIE]
And I am Jamie. I am here for the practical questions: what should I listen for, what can go wrong, and what is the next calm move?

[PAUSE]

[ALEX]
Today we are working on this: Creating, reviewing, commenting on, and merging pull requests. I want the learner to leave with a mental map, not just a remembered path through buttons.

[JAMIE]
So the goal is understanding first, then action, then confirmation.

[ALEX]
Right. We are building a rhythm: orient yourself, take one intentional action, then verify what changed before moving on. That rhythm is where the magic lives.

[PAUSE]

[JAMIE]
Okay, set the room for us. What are we walking into?

[ALEX]
Creating, Reviewing, and Merging Pull Requests with a Screen Reader: See also: Chapter 15: Code Review covers the full review workflow including multi-file diffs and suggested changes. The next useful detail is concrete: Pull requests are where your work becomes a contribution.

[ALEX]
A solid pull request habit is to separate three questions: what changed, why it changed, and what still needs review. That keeps the conversation useful instead of noisy.

[ALEX]
The next layer is this. Here is the learner-facing version. Chapter 6 is the first PR-validated chapter where students convert issue work into merge-ready contributions. A good GitHub workflow is like a well-run meeting: everyone knows the topic, the next action, and who has the floor.

[ALEX]
Here are the anchors worth keeping. There are 3. Each challenge should take under 10 minutes each. The evidence is PR metadata, bot checks, and merged issue linkage. The pattern is small change - linked PR - green checks.

[JAMIE]
What does the learner do first, second, and then after that?

[ALEX]
This is the move inside Chapter 6 Challenge Set: this is the first chapter where you edit files and create branches. That matters in practice: Use one of these two paths: - Web editor (recommended for beginners): When you edit a file on GitHub.com and click "Propose changes," GitHub creates a branch for you automatically.

[ALEX]
Walk it in order: Create one small branch change - edit a practice file on a new branch; Open a linked PR - use the PR template and include Closes XX; and Pass required checks - respond to bot feedback until all required checks pass. Each step should leave a trace you can name.

[JAMIE]
That feels much more doable when you say it as one move.

[ALEX]
Right. The magic is not speed. The magic is knowing what changed and why it matters.

[PAUSE]

[JAMIE]
Turn that into a path someone can follow.

[ALEX]
Anchor this part on Challenge 6.1 Step-by-Step: Create One Small Branch Change. Edit one of the practice files and save your change on a new branch. This is the part to say slowly: your Learning Room repository on GitHub.com, using the web editor.

[ALEX]
For a learner, the useful signals are concrete. Screen reader users (NVDA/JAWS): Press B to navigate buttons, find "Edit this file," and press Enter. VoiceOver users: Press VO+U, open Buttons rotor, find "Edit this file," and press VO+Space. If your issue is about a [TODO] section: replace the [TODO] placeholder with the requested content (one to three sentences). If your issue is about a broken link: find and correct the URL.

[ALEX]
Think of this as 4 checks: In your Learning Room repository, navigate to the file specified in your issue. Use the file tree or the "Go to file" button (T keyboard shortcut); Open the file and activate the pencil icon (Edit this file) button; The file opens in the web editor. Make your change. For; and Keep your change small and focused. Edit only what the issue asks for. If one step does not match what you hear, stop there and re-orient.

[JAMIE]
What is the ordered workflow?

[ALEX]
The path is straightforward once it is named. Step one is after editing, activate the Commit changes button (green button above the editor). Step two is a dialog appears. In the Branch name field, type: fix/yourname-issueXX (replace yourname with your GitHub username, and XX with the issue number). Step three is select Create a new branch for this commit and start a pull request. Step four is activate Propose changes. That is the rhythm: orient, act, verify, continue.

[ALEX]
A solid Git habit is to know which branch you are on, what changed, and what confirmation you expect before you run the next command.

[JAMIE]
Give me the sequence, because order matters here.

[ALEX]
The reason this matters is simple: AI agents do not just deploy code directly; they submit pull requests. The listener should be able to check this: Learning to edit a file, format it in Markdown, and review a PR today prepares you to audit and approve AI-generated changes tomorrow.

[ALEX]
The parts worth keeping in working memory are these. "Complete the Who Can Contribute section in welcome.md". "Fix broken accessibility settings link in setup-guide.md". "Correct NVDA modifier key in keyboard-shortcuts.md". A summary of what you changed and why (at least 50 characters).

[ALEX]
The path is straightforward once it is named. Step one is in the Title field, write a short description of your change. Step two is in the Body field, use the PR template if one is provided. Make sure to. Step three is verify the base branch is main and the compare branch is your fix/yourname-issueXX branch. Step four is activate the Create pull request button. That is the rhythm: orient, act, verify, continue.

[JAMIE]
How would you walk the room through that step by step?

[ALEX]
Do not treat Challenge 6.3 Step-by-Step: Pass Required Checks as decoration. Read bot feedback, fix any issues it finds, and get all required checks to pass. That is not trivia. the Conversation tab of your open pull request. The workshop is closer to rehearsal than lecture. You hear the move, try the move, and then check what changed.

[ALEX]
On the ground, that means a few things. That your PR references an issue with Closes XX. That your PR description is detailed enough (50+ characters). That your changed files are in the learning-room/ folder. Accessibility checks: heading hierarchy, descriptive link text, valid alt text.

[ALEX]
First, wait approximately 30 seconds after opening the PR. The bot posts a validation comment. Then, read the bot comment carefully. It checks. After that, if the bot reports failures. Finally, repeat step 3 until all required checks show a green checkmark. That small check between steps is what makes the workflow reliable.

[JAMIE]
Let's pause on Challenge 6.3 Step-by-Step: Pass Required Checks. What should a learner take away from it?

[ALEX]
Start here: When all checks pass, request a review from a peer or the facilitator. The sequence works because every action has a confirmation.

[ALEX]
The useful habit is simple: orient, act, verify, then continue. That pause between action and trust is part of the work.

[PAUSE]

[JAMIE]
If I am listening before the workshop starts, what should settle in my mind first?

[ALEX]
Expected Outcomes has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Here is what that changes in practice. Student opens a focused PR that maps to one issue. Student uses Closes XX correctly. Student can interpret bot feedback and improve the PR.

[JAMIE]
Let's pause on If You Get Stuck. What should a learner take away from it?

[ALEX]
If You Get Stuck has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Walk it in order: Confirm your PR includes Closes XX in title or body; Check that changed files are only in learning-room/; Open the bot validation comment and resolve one required check at a time; and If checks still fail, ask for peer or facilitator review with the exact error message. Keep it that plain: know where you are, make the move, check the result.

[JAMIE]
Before we leave If You Get Stuck, what is the practical point?

[ALEX]
Think of this as 1 checks: Finished but not sure you did it right? Compare your work against the Challenge 6 reference solution. Pause after each step and listen for the confirmation before moving on.

[JAMIE]
Now it sounds like a workflow instead of a wall of instructions.

[ALEX]
That is where confidence comes from: not from never getting lost, but from knowing how to recover.

[JAMIE]
What is the one idea that makes the next few steps less mysterious?

[ALEX]
The teaching point here is not the label; it is the move. A great PR is small, linked to an issue, and easy to review. That is the difference between guessing and knowing: Faster feedback builds confidence and momentum.

[PAUSE]

[ALEX]
Before the learner moves on. Why this feels achievable has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
That becomes easier when you listen for these cues. Scope is intentionally small. Feedback is immediate and specific. Success is visible (green checks + closed issue).

[JAMIE]
What would you say to someone who is already bracing for this to be too much?

[ALEX]
About Learning Cards in This Chapter: This chapter provides learning cards: expandable blocks that offer perspective-specific guidance for different ways of working. That gives the learner a foothold: not every card appears at every step.

[JAMIE]
What should happen before anyone copies and runs it?

[ALEX]
Here is the learner-facing version. If you cloned the learning-room in Block 0 and prefer working locally. The next useful detail is concrete: The web editor workflow (pencil button, "Propose changes") is the primary path taught in this chapter.

[ALEX]
Treat examples as spoken recipes, not decorations. You may hear something like cd /Documents/learning-room; git checkout main; git pull origin main; git checkout -b fix/welcome-todos. code docs/welcome.md. Read the command, understand what it changes, then run it only when the repository state matches the lesson.

[PAUSE]

[JAMIE]
Where do you want a learner to place their attention here?

[ALEX]
This is the move inside What Is a Pull Request?: a pull request (PR) is a proposal to merge changes from one branch into another. Put another way,.you open a PR to request that those changes be merged into the target branch (usually main).

[ALEX]
These are the pieces that turn the idea into a usable move. Edited a file directly on GitHub (web editor). Made changes in your fork. Made changes on a feature branch. What changed - a diff of every file.

[JAMIE]
That is the kind of detail that keeps a screen reader user oriented.

[ALEX]
Yes. The named thing - the heading, tab, field, branch, or button - is the handhold.

[JAMIE]
Let's pause on Navigating to Pull Requests. What should a learner take away from it?

[ALEX]
Anchor this part on Navigating to Pull Requests. Global pull requests dashboard: GitHub now shows a global pull requests page at github.com/pulls listing all open PRs across every repository you have access to. That matters in practice: This is now the default landing page when you click "Pull requests" in the top navigation bar (the one above the repository content, not inside a repository). The durable skill is not memorizing one screen. It is knowing how to find your footing when the screen changes.

[ALEX]
Listen for the small confirmations in this list. In Windows High Contrast mode, the active tab is indicated by a system-colored underline, not just a color change. At high magnification, use Tab to move through the repository navigation links if the tab bar is hard to target with a pointer. Once in the PR list, PR titles are links with standard hover underlines. They remain clickable at any zoom level.

[ALEX]
Think of this as 4 checks: D → "Repository navigation" landmark; K to navigate tabs → "Pull requests, [N] open"; Enter to open; and VO+U → Landmarks → navigate to "Repository navigation". That small check between steps is what makes the workflow reliable.

[JAMIE]
Before we leave Navigating to Pull Requests, what is the practical point?

[ALEX]
The path is straightforward once it is named. Step one is quick Nav K or VO+Right to navigate tabs → "Pull requests". Step two is vO+Space to open. The sequence works because every action has a confirmation.

[JAMIE]
What is the safe way to learn from that example?

[ALEX]
The reason this matters is simple: if you received a notification about a PR,

[...middle omitted for length...]

lve, or what goal does it advance?; What is the scope? -- Which files changed, and roughly how big is the change?; How was it tested? -- Did you verify that the change works, and how?; and What should I pay attention to? -- Are there tricky parts, trade-offs, or areas where you want a second opinion? That is the rhythm: orient, act, verify, continue.

[PAUSE]

[ALEX]
Keep the thread going. This part earns its place because GitHub recognizes special keywords in PR descriptions that automatically close linked issues when the PR merges. This is the part to say slowly: You do not need to close issues by hand -- just include the right keyword followed by the issue number. That is the difference between following directions and owning the workflow.

[JAMIE]
What is the pre-flight check here?

[ALEX]
Before/After Structure: One of the most effective patterns for PR descriptions is showing the state before your change and the state after. The listener should be able to check this: This gives the reviewer an instant mental model of what changed without reading the diff line by line.

[ALEX]
Keep the teaching thread moving. Here is the learner-facing version. Here is a template you can copy into your PR descriptions. That is not trivia. Not every section applies to every PR, but filling in even a few sentences per section makes a meaningful difference.

[PAUSE]

[JAMIE]
Let's pause on Common Description Mistakes. What should a learner take away from it?

[ALEX]
This is the move inside Common Description Mistakes: even experienced contributors make these mistakes. For someone navigating by keyboard or screen reader, this detail matters: Knowing what to avoid is half the battle.

[ALEX]
Keep the teaching thread moving. Anchor this part on Good vs. Bad: Side by Side. No context, no linked issue, no explanation of what file or what was wrong with it. The useful version is: A reviewer seeing this has to open the diff, figure out which file changed, read every line, and guess at the intent. The durable skill is not memorizing one screen. It is knowing how to find your footing when the screen changes.

[JAMIE]
Let's pause on Learning Cards: Writing PR Descriptions That Get Reviewed. What should a learner take away from it?

[ALEX]
Learning Cards: Writing PR Descriptions That Get Reviewed has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Here is the part to remember. Use Markdown headings ( ) in your description (Summary, Changes, Related Issues, Testing) so reviewers can press H to jump between sections. Type Closes followed by the issue number to auto-close the linked issue on merge; GitHub autocompletes when you type. Press Ctrl+Shift+P in the description text area to toggle between Write and Preview modes; Preview renders your Markdown so you can check structure before submitting. Use the Preview tab to verify your Markdown renders correctly; headings, bullet lists, and code blocks are easier to proofread in rendered form. Keep bullet points short (one line each) so the description is scannable at high zoom without excessive horizontal scrolling. When including screenshots, add alt text in the Markdown image syntax: so every reader gets the same information.

[PAUSE]

[JAMIE]
Let's pause on Try It: Read a Real Pull Request. What should a learner take away from it?

[ALEX]
Do not treat Try It: Read a Real Pull Request as decoration. Time: 3 minutes What you need: Browser, signed in to GitHub. This is where the workflow starts to feel magical, because the result becomes visible and explainable: Go to the Learning Room repository's Pull Requests tab and find any open or recently closed PR.

[ALEX]
First, navigate to Pull Requests (G then P in Focus Mode). Then, open the first PR in the list (press Enter on its title). After that, read the description - press 2 to jump to the first section heading, then arrow down to read. Look for: which file was changed (docs/welcome.md, docs/keyboard-shortcuts.md, or docs/setup-guide.md)? Which challenge was this PR solving? Does the description. Finally, check the conversation - press 3 to jump between comments. Read what the validation bot reported - did the bot find any accessibility issues like broken headings or non-descriptive links? How did the author respond? If one step does not match what you hear, stop there and re-orient.

[JAMIE]
Before we leave Try It: Read a Real Pull Request, what is the practical point?

[ALEX]
Start here: Look at the diff - press D to the "Pull request tabs" landmark, then navigate to "Files changed" and press Enter. Press H to scan the changed file headings. If the PR touched docs/welcome.md, you should see + lines where the [TODO] sections were filled in. If. That is the rhythm: orient, act, verify, continue.

[PAUSE]

[JAMIE]
What should people carry with them after this?

[ALEX]
Carry the map. Know what page or tool you are in, know which action you are taking, and know what confirmation should follow. If the confirmation is missing, pause. That pause is not wasted time; it is professional judgment, and it is how complex workflows start to feel magical instead of stressful.

[JAMIE]
That is a better way to say it than just follow the steps.

[ALEX]
Right. Steps matter, but understanding wins. That is episode 6. Next in the series is episode 7, where we keep building the same contributor muscles.
<<<END_TRANSCRIPT>>>
