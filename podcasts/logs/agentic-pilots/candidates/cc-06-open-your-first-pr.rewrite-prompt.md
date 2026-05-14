You are rewriting a podcast transcript for variety and teachability.
Use automatic model selection (no model is specified by caller).
Return ONLY the transcript text with valid speaker markers.

Hard format requirements:
- Allowed markers only: [ALEX], [JAMIE], [PAUSE]
- Marker line must be on its own line
- Keep script structure conversational and teachable
- Keep concept coverage aligned to source materials

Slug: cc-06-open-your-first-pr
Title: Challenge 06: Open Your First Pull Request
Description: Opening a pull request, comparing branches, and using closing keywords.

Concept checklist to preserve:
- Opening a pull request, comparing branches, and using closing keywords.
- Challenge title: Open Your First Pull Request

Source heading checklist to preserve (topic coverage, can paraphrase):
- ## Example PR
- ## What this changes
- ## Why
- ## Key elements
- ### Title
- ### Body
- ### Linked issue
- ### Passing checks
- ## Alternate linking syntax
- ## What matters
- ## Authoritative Sources
- ### Section-Level Source Map
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
Welcome back to Challenge Coach. Today we are taking on Open Your First Pull Request, one careful step at a time.

[JAMIE]
And I am Jamie. I am listening for the confusing parts: where to start, what to submit, and how to tell whether it worked.

[PAUSE]

[ALEX]
In this challenge, the learner is practicing opening a pull request, comparing branches, and using closing keywords. The point is not to rush. The point is to leave a clear trace of good work that feels almost effortless once you know the pattern.

[JAMIE]
So we should name what success sounds like before the learner starts clicking or typing.

[ALEX]
Yes. When the checkpoint is clear, the learner can tell the difference between being stuck and simply not being finished yet.

[PAUSE]

[JAMIE]
What makes this practice feel low-stakes but still real?

[ALEX]
Challenge 6: Open Your First Pull Request: What you will do: Open a pull request from your learn/YOUR-USERNAME branch to main, connecting it to the issue you filed in Challenge 2.

[ALEX]
A solid pull request habit is to separate three questions: what changed, why it changed, and what still needs review. That keeps the conversation useful instead of noisy.

[JAMIE]
How would you walk the room through that step by step?

[ALEX]
Instructions has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Start here: Go to the Pull requests tab. Then: Select New pull request. Next: Set base to main and compare to learn/YOUR-USERNAME. Last: Write a descriptive PR title. The point is not speed; the point is never losing your place.

[JAMIE]
What does the learner do first, second, and then after that?

[ALEX]
Walk it in order: In the PR description, include Closes XX (replace XX with your Challenge 2 issue number). This automatically links and closes the issue when the PR is merged; and Submit the pull request. Each step should leave a trace you can name.

[JAMIE]
What is the one idea that makes the next few steps less mysterious?

[ALEX]
This is the move inside PR description template: use this structure for your PR description.

[JAMIE]
That feels much more doable when you say it as one move.

[ALEX]
Right. The magic is not speed. The magic is knowing what changed and why it matters.

[PAUSE]

[ALEX]
Now bring the learner back to the room. Anchor this part on The magic of Closes XX. When you write Closes 12 in a PR description, GitHub automatically. This is the part to say slowly: This is one of GitHub's most powerful workflow features.

[ALEX]
For a learner, the useful signals are concrete. Links the PR to issue 12. Closes issue 12 when the PR is merged.

[JAMIE]
What would you say to someone who is already bracing for this to be too much?

[ALEX]
The reason this matters is simple: find the Peer Simulation: Improve contribution guidance PR and leave an encouraging comment. The listener should be able to check this: If you have access to a real buddy's PR, you may comment there too.

[ALEX]
The useful habit is simple: orient, act, verify, then continue. That pause between action and trust is part of the work.

[ALEX]
That matters because of the next idea. Example PR has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[PAUSE]

[JAMIE]
Okay, set the room for us. What are we walking into?

[ALEX]
Title has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Here is what that changes in practice. Describes the change clearly: someone reading just the title understands what happened. Short enough to scan in a list.

[ALEX]
This is where the talk moves from concept to action. Body has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
The room should hear these as checkpoints. What: Summarizes the change. Why: Explains the motivation. Closes N: Links to the issue this PR resolves -- GitHub automatically closes the issue when the PR merges.

[JAMIE]
Now it sounds like a workflow instead of a wall of instructions.

[ALEX]
That is where confidence comes from: not from never getting lost, but from knowing how to recover.

[JAMIE]
Where do you want a learner to place their attention here?

[ALEX]
The teaching point here is not the label; it is the move. The Closes 3 line creates a two-way link. That is the difference between guessing and knowing: The issue shows "referenced by PR 5" and the PR shows "Closes 3." When the PR merges, issue 3 closes automatically.

[ALEX]
A solid issue habit is to read the title, the body, and the timeline before acting. You are listening for the requested action, the missing evidence, and the person who needs a response.

[PAUSE]

[ALEX]
Before the learner moves on. This part earns its place because if the repository has automated checks (the PR validation bot), a green checkmark appears. This is where the workflow starts to feel magical, because the result becomes visible and explainable: If checks fail, read the bot's feedback comment for specific guidance. That is the difference between following directions and owning the workflow.

[JAMIE]
Give me the version that sounds like an instructor, not a manual.

[ALEX]
Alternate linking syntax has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
If someone is taking notes, this is the short list. Closes 3. Resolves 3.

[ALEX]
Now slow down for the part people usually miss. Here is the learner-facing version. The learning objective is connecting a change (PR) to a reason (issue) through GitHub's linking system. The next useful detail is concrete: If your PR has a clear title, a description, and references an issue number, you completed this challenge.

[PAUSE]

[JAMIE]
If I am listening before the workshop starts, what should settle in my mind first?

[ALEX]
This is the move inside Section-Level Source Map: use this map to verify facts for each major section in this file.

[ALEX]
These are the pieces that turn the idea into a usable move. Example PR: GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests. What this changes: GitHub Docs, home, GitHub Changelog. Why: GitHub Docs, home, GitHub Changelog. Key elements: GitHub Docs, home, GitHub Changelog. Alternate linking syntax: GitHub Docs, home, GitHub Changelog. What matters: GitHub Docs, home, GitHub Changelog.

[JAMIE]
That is the kind of detail that keeps a screen reader user oriented.

[ALEX]
Yes. The named thing - the heading, tab, field, branch, or button - is the handhold.

[ALEX]
Here is the moment where the page starts to make sense. Anchor this part on Creating, Reviewing, and Merging Pull Requests with a Screen Reader. See also: Chapter 15: Code Review covers the full review workflow including multi-file diffs and suggested changes. That matters in practice: Pull requests are where your work becomes a contribution. The durable skill is not memorizing one screen. It is knowing how to find your footing when the screen changes.

[JAMIE]
Where is the promise of the workshop, underneath all the logistics?

[ALEX]
The reason this matters is simple: chapter 6 is the first PR-validated chapter where students convert issue work into merge-ready contributions.

[ALEX]
The useful version is not abstract; it sounds like this. There are 3. Each challenge should take under 10 minutes each. The evidence is PR metadata, bot checks, and merged issue linkage. The pattern is small change - linked PR - green checks.

[PAUSE]

[JAMIE]
Give me the sequence, because order matters here.

[ALEX]
Do not treat Chapter 6 Challenge Set as decoration. This is the first chapter where you edit files and create branches. The listener should be able to check this: Use one of these two paths: - Web editor (recommended for beginners): When you edit a file on GitHub.com and click "Propose changes," GitHub creates a branch for you automatically.

[ALEX]
First, create one small branch change - edit a practice file on a new branch. Then, open a linked PR - use the PR template and include Closes XX. After that, pass required checks - respond to bot feedback until all required checks pass. Keep it that plain: know where you are, make the move, check the result.

[JAMIE]
Turn that into a path someone can follow.

[ALEX]
If the interface shifts, Challenge 6.1 Step-by-Step: Create One Small Branch Change is still useful because edit one of the practice files and save your change on a new branch. That is not trivia. your Learning Room repository on GitHub.com, using the web editor.

[ALEX]
A few details make that real. Screen reader users (NVDA/JAWS): Press B to navigate buttons, find "Edit this file," and press Enter. VoiceOver users: Press VO+U, open Buttons rotor, find "Edit this file," and press VO+Space. If your issue is about a [TODO] section: replace the [TODO] placeholder with the requested content (one to three sentences). If your issue is about a broken link: find and correct the URL.

[ALEX]
Start here: In your Learning Room repository, navigate to the file specified in your issue. Use the file tree or the "Go to file" button (T keyboard shortcut). Then: Open the file and activate the pencil icon (Edit this file) button. Next: The file opens in the web editor. Make your change. For. Last: Keep your change small and focused. Edit only what the issue asks for. Pause after each step and listen for the confirmation before moving on.

[JAMIE]
What is the ordered workflow?

[ALEX]
Walk it in order: After editing, activate the Commit changes button (green button above the editor); A dialog appears. In the Branch name field, type: fix/yourname-issueXX (replace yourname with your GitHub username, and XX with the issue number); Select Create a new branch for this commit and start a pull request; and Activate Propose changes. The point is not speed; the point is never losing your place.

[ALEX]
A solid Git habit is to know which branch you are on, what changed, and what confirmation you expect before you run the next command.

[JAMIE]
Let's pause on Challenge 6.2 Step-by-Step: Open a Linked PR. What should a learner take away from it?

[ALEX]
Put Challenge 6.2 Step-by-Step: Open a Linked PR into plain language. AI agents do not just deploy code directly; they submit pull requests. For someone navigating by keyboard or screen reader, this detail matters: Learning to edit a file, format it in Markdown, and review a PR today prepares you to audit and approve AI-generated changes tomorrow. The interface gets easier when it becomes a set of named places instead of a wall of controls.

[ALEX]
Here are the anchors worth keeping. "Complete the Who Can Contribute section in welcome.md". "Fix broken accessibility settings link in setup-guide.md". "Correct NVDA modifier key in keyboard-shortcuts.md". A summary of what you changed and why (at least 50 characters).

[ALEX]
Walk it in order: In the Title field, write a short description of your change; In the Body field, use the PR template if one is provided. Make sure to; Verify the base branch is main and the compare branch is your fix/yourname-issueXX branch; and Activate the Create pull request button. The point is not speed; the point is never losing your place.

[JAMIE]
So the learner is not behind if they stop there and check the page.

[ALEX]
Yes. Pausing to verify is not a detour; it is how you keep control of the workflow.

[PAUSE]

[JAMIE]
Let's pause on Challenge 6.3 Step-by-Step: Pass Required Checks. What should a learner take away from it?

[ALEX]
The teaching point here is not the label; it is the move. Read bot feedback, fix any issues it finds, and get all required checks to pass. The useful version is: the Conversation tab of your open pull request.

[ALEX]
That shows up in the workshop in a few specific ways. That your PR references an issue with Closes XX. That your PR description is detailed enough (50+ characters). That your changed files are in the learning-room/ folder. Accessibility checks: heading hierarchy, descriptive link text, valid alt text.

[ALEX]
Think of this as 4 checks: Wait approximately 30 seconds after opening the PR. The bot posts a validation comment; Read the bot comment carefully. It checks; If the bot reports failures; and Repeat step 3 until all required checks show a green checkmark. Each step should leave a trace you can name.

[JAMIE]
Before we leave Challenge 6.3 Step-by-Step: Pass Required Checks, what is the practical point?

[ALEX]
The path is straightforward once it is named. Step one is when all checks pass, request a review from a peer or the fa

[...middle omitted for length...]

scope? -- Which files changed, and roughly how big is the change? Next: How was it tested? -- Did you verify that the change works, and how? Last: What should I pay attention to? -- Are there tricky parts, trade-offs, or areas where you want a second opinion? The point is not speed; the point is never losing your place.

[JAMIE]
Let's pause on The Closes XX Pattern. What should a learner take away from it?

[ALEX]
This is the move inside The Closes XX Pattern: GitHub recognizes special keywords in PR descriptions that automatically close linked issues when the PR merges. That is not trivia. You do not need to close issues by hand -- just include the right keyword followed by the issue number.

[ALEX]
Keep the teaching thread moving. Anchor this part on Before/After Structure. One of the most effective patterns for PR descriptions is showing the state before your change and the state after. For someone navigating by keyboard or screen reader, this detail matters: This gives the reviewer an instant mental model of what changed without reading the diff line by line.

[PAUSE]

[JAMIE]
Let's pause on A PR Description Template. What should a learner take away from it?

[ALEX]
The reason this matters is simple: here is a template you can copy into your PR descriptions. The useful version is: Not every section applies to every PR, but filling in even a few sentences per section makes a meaningful difference.

[ALEX]
Keep the teaching thread moving. Do not treat Common Description Mistakes as decoration. Even experienced contributors make these mistakes. That is the difference between guessing and knowing: Knowing what to avoid is half the battle. The workshop is closer to rehearsal than lecture. You hear the move, try the move, and then check what changed.

[JAMIE]
Let's pause on Good vs. Bad: Side by Side. What should a learner take away from it?

[ALEX]
If the interface shifts, Good vs. Bad: Side by Side is still useful because no context, no linked issue, no explanation of what file or what was wrong with it. This is where the workflow starts to feel magical, because the result becomes visible and explainable: A reviewer seeing this has to open the diff, figure out which file changed, read every line, and guess at the intent.

[PAUSE]

[ALEX]
Keep the teaching thread moving. Learning Cards: Writing PR Descriptions That Get Reviewed has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Here is the part to remember. Use Markdown headings ( ) in your description (Summary, Changes, Related Issues, Testing) so reviewers can press H to jump between sections. Type Closes followed by the issue number to auto-close the linked issue on merge; GitHub autocompletes when you type. Press Ctrl+Shift+P in the description text area to toggle between Write and Preview modes; Preview renders your Markdown so you can check structure before submitting. Use the Preview tab to verify your Markdown renders correctly; headings, bullet lists, and code blocks are easier to proofread in rendered form. Keep bullet points short (one line each) so the description is scannable at high zoom without excessive horizontal scrolling. When including screenshots, add alt text in the Markdown image syntax: so every reader gets the same information.

[JAMIE]
Let's pause on Try It: Read a Real Pull Request. What should a learner take away from it?

[ALEX]
The teaching point here is not the label; it is the move. Time: 3 minutes What you need: Browser, signed in to GitHub. The next useful detail is concrete: Go to the Learning Room repository's Pull Requests tab and find any open or recently closed PR.

[ALEX]
Think of this as 4 checks: Navigate to Pull Requests (G then P in Focus Mode); Open the first PR in the list (press Enter on its title); Read the description - press 2 to jump to the first section heading, then arrow down to read. Look for: which file was changed (docs/welcome.md, docs/keyboard-shortcuts.md, or docs/setup-guide.md)? Which challenge was this PR solving? Does the description; and Check the conversation - press 3 to jump between comments. Read what the validation bot reported - did the bot find any accessibility issues like broken headings or non-descriptive links? How did the author respond? Pause after each step and listen for the confirmation before moving on.

[JAMIE]
Before we leave Try It: Read a Real Pull Request, what is the practical point?

[ALEX]
The path is straightforward once it is named. Step one is look at the diff - press D to the "Pull request tabs" landmark, then navigate to "Files changed" and press Enter. Press H to scan the changed file headings. If the PR touched docs/welcome.md, you should see + lines where the [TODO] sections were filled in. If. The point is not speed; the point is never losing your place.

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
