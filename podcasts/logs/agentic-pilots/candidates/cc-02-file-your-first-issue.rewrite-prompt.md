You are rewriting a podcast transcript for variety and teachability.
Use automatic model selection (no model is specified by caller).
Return ONLY the transcript text with valid speaker markers.

Hard format requirements:
- Allowed markers only: [ALEX], [JAMIE], [PAUSE]
- Marker line must be on its own line
- Keep script structure conversational and teachable
- Keep concept coverage aligned to source materials

Slug: cc-02-file-your-first-issue
Title: Challenge 02: File Your First Issue
Description: Finding a TODO, creating a clear issue, and explaining what needs to change.

Concept checklist to preserve:
- Finding a TODO, creating a clear issue, and explaining what needs to change.
- Challenge title: File Your First Issue

Source heading checklist to preserve (topic coverage, can paraphrase):
- ## Example 1: Bug report style
- ## Example 2: Feature request style
- ## What makes a good issue
- ## Alternate approaches
- ## Authoritative Sources
- ### Section-Level Source Map
- ## Filing, Managing, and Participating in GitHub Issues
- ## Workshop Recommendation (Chapter 5 / Challenges 2-3)
- ### Chapter 5 Challenge Set
- ### Challenge 2 Step-by-Step: Create Your First Issue
- ### Challenge 3 Step-by-Step: Comment and @Mention
- ### Optional Extension Step-by-Step: Add a Sub-Issue
- ### Completing Chapter 5: Submit Your Evidence
- ### Expected Outcomes
- ### If You Get Stuck
- ### Learning Moment
- ### Learning Pattern Used in This Chapter
- ### About Learning Cards in This Chapter
- ## Local Git Alternative: Working from Your Clone
- ## What Is a GitHub Issue?
- ## Navigating to the Issues List
- ### From a repository page
- ### Direct URL
- ### Learning Cards: Navigating to the Issues List
- ## The Issues List Page
- ### Page structure
- ### How to read the issue list
- ### What is announced per issue
- ### Learning Cards: The Issues List Page
- ## Filtering and Searching Issues
- ### Using the search/filter bar
- #### Useful filter queries
- ### Using the filter buttons
- ### Open vs Closed filter
- ### Learning Cards: Filtering and Searching Issues
- ## Reading an Issue
- ### Landing on an issue page
- ### Quick navigation
- ### Reading the issue description
- ### Reading comments and activity
- ### Learning Cards: Reading an Issue
- ## Leaving a Comment
- ### Step-by-step
- ### Markdown formatting while typing
- ### GitHub shortcuts for the Issues pages
- #### On the Issues list page
- #### On an open issue
- ### Learning Cards: Leaving a Comment
- ## Filing a New Issue
- ### Navigating to New Issue
- ### Filling Out the Issue Form
- #### Title field
- #### Description / Body field
- ## What happened
- ## What I expected
- ## How to reproduce
- ## Environment
- ## Additional context
- ### Assigning labels from the sidebar
- ### Submitting the issue

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
Welcome back to Challenge Coach. Today we are taking on File Your First Issue, one careful step at a time.

[JAMIE]
And I am Jamie. I am listening for the confusing parts: where to start, what to submit, and how to tell whether it worked.

[PAUSE]

[ALEX]
In this challenge, the learner is practicing finding a TODO, creating a clear issue, and explaining what needs to change. The point is not to rush. The point is to leave a clear trace of good work that feels almost effortless once you know the pattern.

[JAMIE]
So we should name what success sounds like before the learner starts clicking or typing.

[ALEX]
Yes. When the checkpoint is clear, the learner can tell the difference between being stuck and simply not being finished yet.

[PAUSE]

[JAMIE]
What makes this practice feel low-stakes but still real?

[ALEX]
Challenge 2: File Your First Issue: What you will do: Find a TODO comment in docs/welcome.md, then file an issue describing the problem with a clear title and description.

[ALEX]
A solid issue habit is to read the title, the body, and the timeline before acting. You are listening for the requested action, the missing evidence, and the person who needs a response.

[JAMIE]
How would you walk the room through that step by step?

[ALEX]
Instructions has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Here are the anchors worth keeping. What needs to change. Where the problem is (file name and what section). Why it matters.

[ALEX]
Start here: Open docs/welcome.md and look for a line that contains TODO -- this marks something that needs fixing. Then: Go to the Issues tab and select New issue. Next: Write a clear, descriptive title (not just "Fix TODO"). Last: In the description, explain. The point is not speed; the point is never losing your place.

[JAMIE]
What is the one idea that makes the next few steps less mysterious?

[ALEX]
This is the move inside What makes a good issue title?: I found a TODO in docs/welcome.md that said.

[JAMIE]
That feels much more doable when you say it as one move.

[ALEX]
Right. The magic is not speed. The magic is knowing what changed and why it matters.

[PAUSE]

[ALEX]
Now bring the learner back to the room. Anchor this part on Peer simulation check. Open the Peer Simulation: Welcome Link Needs Context issue and leave a comment: Is the title clear? This is the part to say slowly: Would you know what needs fixing just from reading the title?

[JAMIE]
What would you say to someone who is already bracing for this to be too much?

[ALEX]
The reason this matters is simple: in docs/welcome.md, line 15, there is a TODO comment that says "add link to workshop schedule." This placeholder should be replaced with an actual link so students can find the schedule.

[ALEX]
The useful habit is simple: orient, act, verify, then continue. That pause between action and trust is part of the work.

[ALEX]
That matters because of the next idea. Do not treat Example 2: Feature request style as decoration. The welcome document covers what students will do but does not mention accessibility features. That is not trivia. A short section pointing students to screen reader shortcuts and keyboard navigation would help everyone start on equal footing. The workshop is closer to rehearsal than lecture. You hear the move, try the move, and then check what changed.

[PAUSE]

[JAMIE]
Okay, set the room for us. What are we walking into?

[ALEX]
What makes a good issue has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Here is what that changes in practice. Clear title: Someone scanning the issue list can understand the topic without opening it. Enough context: Another person could find and understand the problem from your description alone. Reproducible location: File name and line number (if relevant) so the fix is easy to find.

[ALEX]
This is where the talk moves from concept to action. Put Alternate approaches into plain language. Both bug reports and feature suggestions are valid for this challenge. The useful version is: The key is writing clearly enough that a stranger could act on your issue.

[JAMIE]
Now it sounds like a workflow instead of a wall of instructions.

[ALEX]
That is where confidence comes from: not from never getting lost, but from knowing how to recover.

[ALEX]
A solid pull request habit is to separate three questions: what changed, why it changed, and what still needs review. That keeps the conversation useful instead of noisy.

[JAMIE]
Where do you want a learner to place their attention here?

[ALEX]
The teaching point here is not the label; it is the move. Use this map to verify facts for each major section in this file.

[ALEX]
These are the details that keep the idea from floating away. Example 1: Bug report style: GitHub Docs, home, GitHub Changelog. Example 2: Feature request style: GitHub Docs, home, GitHub Changelog. What makes a good issue: GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests. Alternate approaches: GitHub Docs, home, GitHub Changelog.

[PAUSE]

[ALEX]
Before the learner moves on. This part earns its place because issues are where open source collaboration begins. This is where the workflow starts to feel magical, because the result becomes visible and explainable: everything from finding the right issue to file a perfect bug report - all with your keyboard and screen reader. That is the difference between following directions and owning the workflow.

[JAMIE]
How should they picture the shape of the workshop?

[ALEX]
Workshop Recommendation (Chapter 5 / Challenges 2-3): Chapter 5 is the first issue-based challenge chapter with short, confidence-building tasks. That gives the learner a foothold: it supports Challenge 2 (File Your First Issue) and Challenge 3 (Join the Conversation).

[ALEX]
If someone is taking notes, this is the short list. There are 2 core challenges plus one optional extension. Each challenge should take under 10 minutes. The evidence is issue comments and issue metadata. The pattern is claim - act - confirm.

[JAMIE]
What does the learner do first, second, and then after that?

[ALEX]
Here is the learner-facing version. Chapter 5 focuses on issue skills. The next useful detail is concrete: You do NOT need to create a branch or edit any files for these challenges.

[ALEX]
Start here: Create your first issue - file a new issue with a clear title and description. Then: Comment and @mention - leave a comment on a classmate's issue and tag them with an @mention. Next: Optional extension: Add a sub-issue - break a larger issue into smaller, trackable pieces if your repository has sub-issues enabled. If one step does not match what you hear, stop there and re-orient.

[PAUSE]

[JAMIE]
Turn that into a path someone can follow.

[ALEX]
This is the move inside Challenge 2 Step-by-Step: Create Your First Issue: file a new issue in your Learning Room repository with a specific title and a meaningful description. Put another way, issues are the prompts that wake up AI.

[ALEX]
These are the pieces that turn the idea into a usable move. "Agent Request: Add missing contributor background paragraph in welcome.md". "Keyboard shortcuts table has incorrect NVDA modifier key". "Setup guide link to accessibility settings is broken". What the problem is or what content is missing.

[ALEX]
Walk it in order: Open your Learning Room repository in your browser; Navigate to the Issues tab (press G then I to jump there with keyboard shortcuts, or find the "Issues" link in the repository navigation); Activate the New issue button; and If a template picker appears, select Open a blank issue (or choose a template if one fits). That is the rhythm: orient, act, verify, continue.

[JAMIE]
What is the ordered workflow?

[ALEX]
Think of this as 4 checks: In the Title field, type a clear, specific title (at least 12 characters); In the Body field, write a meaningful description (at least 80 characters); Activate Submit new issue; and Copy the issue URL or note the issue number (for example, 150). You will reference this later. That small check between steps is what makes the workflow reliable.

[JAMIE]
That is the kind of detail that keeps a screen reader user oriented.

[ALEX]
Yes. The named thing - the heading, tab, field, branch, or button - is the handhold.

[JAMIE]
Give me the sequence, because order matters here.

[ALEX]
Anchor this part on Challenge 3 Step-by-Step: Comment and @Mention. Leave a comment on another student's issue and use an @mention to notify them. That matters in practice: the Issues tab of your Learning Room repository on GitHub.com. The durable skill is not memorizing one screen. It is knowing how to find your footing when the screen changes.

[ALEX]
Listen for the small confirmations in this list. "@classmate I can confirm this - the link in setup-guide.md goes to a 404 page.". "@classmate Good catch! I think the correct shortcut is Insert+F7, not Insert+F5.". "@classmate I'd suggest adding the paragraph right after the 'Who Can Contribute' heading.".

[ALEX]
Think of this as 4 checks: Open the Issues tab in your Learning Room repository; Find an issue created by a classmate (look for recent open issues, or use a facilitator-provided peer-simulation issue); Open the issue by activating its title link; and Read the issue description to understand what they reported. That small check between steps is what makes the workflow reliable.

[JAMIE]
Let's pause on Challenge 3 Step-by-Step: Comment and @Mention. What should a learner take away from it?

[ALEX]
The path is straightforward once it is named. Step one is scroll to the comment box at the bottom of the issue. Step two is write a helpful comment that @mentions the issue author by username. Step three is activate the Comment button (or press Ctrl+Enter). The sequence works because every action has a confirmation.

[JAMIE]
Let's pause on Optional Extension Step-by-Step: Add a Sub-Issue. What should a learner take away from it?

[ALEX]
The reason this matters is simple: break a larger issue into smaller, trackable pieces using GitHub's sub-issue feature. This is the part to say slowly: the issue you created in Challenge 2 (or any open issue you have permission to edit).

[ALEX]
The useful version is not abstract; it sounds like this. Sub-issue: "Add alt text to welcome banner image". Sub-issue: "Fix heading hierarchy in Getting Started section".

[ALEX]
The path is straightforward once it is named. Step one is open the issue you created in Challenge 2. Step two is look for the Sub-issues section in the issue sidebar (right side on desktop). If you do not see it, look for an Add sub-issue button or the Create sub-issue option below the issue description. Step three is activate Add sub-issue and choose Create new sub-issue. Step four is give the sub-issue a clear title that describes one specific piece of the parent issue. For example, if the parent is "Fix accessibility in welcome.md". The sequence works because every action has a confirmation.

[JAMIE]
Before we leave Optional Extension Step-by-Step: Add a Sub-Issue, what is the practical point?

[ALEX]
First, add a short description and activate Create. Then, the sub-issue now appears nested under the parent issue with a progress indicator. Keep it that plain: know where you are, make the move, check the result.

[PAUSE]

[ALEX]
The next point gives the learner a handle. Do not treat Completing Chapter 5: Submit Your Evidence as decoration. When you have finished the Chapter 5 issue challenges, go to your assigned Challenge 2 or Challenge 3 issue and post a comment with your evidence. The listener should be able to check this: Replace [number] with the actual issue numbers.

[JAMIE]
Give me the version that sounds like an instructor, not a manual.

[ALEX]
Expected Outcomes has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
A few details make that real. Student can create an issue with a clear title and description. Student can communicate in issue threads using @mentions. Student can organize work by breaking issues into sub-issues.

[JAMIE]
Let's pause on If You Get Stuck. What should a learner take away from it?

[ALEX]
If You Get Stuck has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Walk it in order: Can't find a classmate's issue? Filter the Issues tab by is:open and look for recent ones; @mention not working? Make sure you type @ immediately followed by the username w

[...middle omitted for length...]

AMIE]
Let's pause on Feature Request Structure. What should a learner take away from it?

[ALEX]
The teaching point here is not the label; it is the move. Feature requests work best when they focus on the problem before jumping to the solution. Put another way, a feature request that starts with "I want a dark mode toggle" is weaker than one that starts with "Low-vision users report eyestrain after 20 minutes because the current theme has insufficient contrast." The second version gives maintainers something to.

[ALEX]
Think of this as 4 checks: Problem statement -- Describe the pain point. What are you trying to do, and why is it hard or impossible right now?; Proposed solution -- Your best idea for fixing the problem. Be specific enough to discuss, but hold it loosely; Alternatives considered -- Other approaches you thought about and why they fell short. This shows you have done your homework; and Who benefits -- Name the audience. "Screen reader users navigating large repositories" is more compelling than "everyone.". The sequence works because every action has a confirmation.

[ALEX]
Keep the teaching thread moving. This part earns its place because these rules apply to every issue -- bugs, features, questions, and everything in between. That matters in practice: If you discovered two bugs during the same session, file two separate issues.

[JAMIE]
What does someone need before they touch the keyboard?

[ALEX]
Before and After: A Vague Issue vs. a Clear Issue: I tried clicking and nothing happened. This is the part to say slowly: The maintainer has to ask: What doesn't work?

[PAUSE]

[ALEX]
Keep the teaching thread moving. Learning Cards: Writing Effective Issues has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Here is the part to remember. Use fenced code blocks (triple backticks) when pasting error messages or screen reader output; your screen reader announces "code block" so listeners know the text is literal, not description. When writing "Steps to Reproduce," type each step as a numbered Markdown list item (1., 2., etc.) so screen readers announce "list with N items". Type in the comment body to trigger issue autocomplete; press Down Arrow to navigate matching issues and Enter to insert a cross-reference link. Use the Preview tab (next to Write) to check your Markdown rendering before submitting; headings, bold text, and code blocks are much easier to proofread in rendered form. Screenshots with alt text are valuable evidence; add them with the image button in the formatting toolbar or drag-and-drop into the body field. Keep paragraphs short (3-4 sentences max) so the issue is scannable at high zoom without excessive scrolling.

[JAMIE]
Let's pause on Try It: File Your First Issue. What should a learner take away from it?

[ALEX]
This is the move inside Try It: File Your First Issue: time: 3 minutes What you need: Browser, signed in to GitHub. That is not trivia. Go to the Learning Room repository and file a real issue.

[ALEX]
Walk it in order: Navigate to the Issues tab (press G then I in Focus Mode); Find and activate the "New issue" button (K to links, or Tab to it); In the title field, type: "Introduce myself - [Your Name]"; and In the description, write 2-3 sentences: who you are, what screen reader you use, and one thing you're hoping to learn today. Each step should leave a trace you can name.

[JAMIE]
Before we leave Try It: File Your First Issue, what is the practical point?

[ALEX]
Think of this as 1 checks: Press Ctrl+Enter to submit (or Tab to the Submit button and press Enter). If one step does not match what you hear, stop there and re-orient.

[ALEX]
Keep the teaching thread moving. Anchor this part on Learning Cards: Filing Your First Issue. Day 2 Amplifier - Accessibility Agents: @issue-tracker File, read, comment on, and triage real issues manually before using any agent. For someone navigating by keyboard or screen reader, this detail matters: If you have not done the triage work yourself - reading descriptions, assigning labels, identifying duplicates - you cannot evaluate whether an agent's priority scoring is correct.

[ALEX]
Here is the part to remember. After pressing Ctrl+Enter to submit, listen for the page reload; GitHub navigates to your new issue page where the title is the first heading -- press 1 to confirm it matches what you typed. Navigate the issue list with 3 (heading level 3) to jump between issue titles; this is faster than arrowing through every element on the page. If the template picker appears, use Tab and Enter to select "Open a blank issue"; template names are announced as link text. The "New issue" button is prominent and green on the Issues list page; at high zoom it remains visible near the top of the page and does not collapse into a menu.

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
