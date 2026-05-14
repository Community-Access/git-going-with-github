You are rewriting a podcast transcript for variety and teachability.
Use automatic model selection (no model is specified by caller).
Return ONLY the transcript text with valid speaker markers.

Hard format requirements:
- Allowed markers only: [ALEX], [JAMIE], [PAUSE]
- Marker line must be on its own line
- Keep script structure conversational and teachable
- Keep concept coverage aligned to source materials

Slug: ep05-working-with-issues
Title: Episode 5: Working with Issues
Description: Filing, searching, filtering, commenting on, and managing GitHub issues.

Concept checklist to preserve:
- What an issue is: a unit of work, bug report, or feature request
- The Issues tab: list view, filters, and search
- Issue anatomy: title, body (markdown), labels, assignees, milestone
- Filtering issues: by label, author, assignee, milestone, open/closed
- Using the search bar with qualifiers like is:open label:bug
- Reading an issue: the timeline of comments, events, and references
- Filing a new issue: writing a clear title and descriptive body
- Using markdown in issue bodies: code blocks, lists, task lists, links
- Commenting on issues: adding context, asking questions, reacting
- Reactions (emoji) as lightweight feedback
- Referencing issues from other issues or pull requests with #number
- Assigning an issue to yourself or someone else
- Applying and removing labels
- Closing an issue and what closed means
- Reopening a closed issue
- The connection between issues and pull requests
- Using gh issue commands from the terminal as an alternative

Source heading checklist to preserve (topic coverage, can paraphrase):
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
- ### Learning Cards: Filing a New Issue
- ### Tool Cards: File a New Issue
- ## Cross-Referencing Issues
- ### Closing keywords in PR descriptions or issue comments
- ### Mentioning another issue in a comment
- ### Cross-repo references

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
Welcome back to Git Going with GitHub. This is episode 5: Working with Issues. I am Alex, and today we are turning Working with Issues from a list of instructions into a working mental model that actually feels alive.

[JAMIE]
And I am Jamie. I will stop us whenever the instructions sound simple on paper but feel less magical at the keyboard with a screen reader.

[PAUSE]

[ALEX]
Filing, searching, filtering, commenting on, and managing GitHub issues. That is the surface description. Underneath it, we are building judgment: where to focus, what to ignore, and how to verify the result.

[JAMIE]
So we are not using the audio as a shortcut around learning. We are using it to make the learning easier to enter and easier to remember.

[ALEX]
Yes. A good audio lesson gives someone enough context to try the work with confidence, even before they open the written material.

[PAUSE]

[JAMIE]
Okay, set the room for us. What are we walking into?

[ALEX]
Filing, Managing, and Participating in GitHub Issues: Issues are where open source collaboration begins. The next useful detail is concrete: everything from finding the right issue to file a perfect bug report - all with your keyboard and screen reader.

[ALEX]
A solid issue habit is to read the title, the body, and the timeline before acting. You are listening for the requested action, the missing evidence, and the person who needs a response.

[ALEX]
The next layer is this. Here is the learner-facing version. Chapter 5 is the first issue-based challenge chapter with short, confidence-building tasks. Put another way, it supports Challenge 2 (File Your First Issue) and Challenge 3 (Join the Conversation). A good GitHub workflow is like a well-run meeting: everyone knows the topic, the next action, and who has the floor.

[ALEX]
Here are the anchors worth keeping. There are 2 core challenges plus one optional extension. Each challenge should take under 10 minutes. The evidence is issue comments and issue metadata. The pattern is claim - act - confirm.

[JAMIE]
What does the learner do first, second, and then after that?

[ALEX]
This is the move inside Chapter 5 Challenge Set: chapter 5 focuses on issue skills. That matters in practice: You do NOT need to create a branch or edit any files for these challenges.

[ALEX]
Walk it in order: Create your first issue - file a new issue with a clear title and description; Comment and @mention - leave a comment on a classmate's issue and tag them with an @mention; and Optional extension: Add a sub-issue - break a larger issue into smaller, trackable pieces if your repository has sub-issues enabled. Each step should leave a trace you can name.

[JAMIE]
That feels much more doable when you say it as one move.

[ALEX]
Right. The magic is not speed. The magic is knowing what changed and why it matters.

[PAUSE]

[JAMIE]
Turn that into a path someone can follow.

[ALEX]
Anchor this part on Challenge 2 Step-by-Step: Create Your First Issue. File a new issue in your Learning Room repository with a specific title and a meaningful description. This is the part to say slowly: Issues are the prompts that wake up AI.

[ALEX]
For a learner, the useful signals are concrete. "Agent Request: Add missing contributor background paragraph in welcome.md". "Keyboard shortcuts table has incorrect NVDA modifier key". "Setup guide link to accessibility settings is broken". What the problem is or what content is missing.

[ALEX]
Think of this as 4 checks: Open your Learning Room repository in your browser; Navigate to the Issues tab (press G then I to jump there with keyboard shortcuts, or find the "Issues" link in the repository navigation); Activate the New issue button; and If a template picker appears, select Open a blank issue (or choose a template if one fits). If one step does not match what you hear, stop there and re-orient.

[JAMIE]
What is the ordered workflow?

[ALEX]
The path is straightforward once it is named. Step one is in the Title field, type a clear, specific title (at least 12 characters). Step two is in the Body field, write a meaningful description (at least 80 characters). Step three is activate Submit new issue. Step four is copy the issue URL or note the issue number (for example, 150). You will reference this later. That is the rhythm: orient, act, verify, continue.

[JAMIE]
Give me the sequence, because order matters here.

[ALEX]
The reason this matters is simple: leave a comment on another student's issue and use an @mention to notify them. The listener should be able to check this: the Issues tab of your Learning Room repository on GitHub.com.

[ALEX]
The parts worth keeping in working memory are these. "@classmate I can confirm this - the link in setup-guide.md goes to a 404 page.". "@classmate Good catch! I think the correct shortcut is Insert+F7, not Insert+F5.". "@classmate I'd suggest adding the paragraph right after the 'Who Can Contribute' heading.".

[ALEX]
The path is straightforward once it is named. Step one is open the Issues tab in your Learning Room repository. Step two is find an issue created by a classmate (look for recent open issues, or use a facilitator-provided peer-simulation issue). Step three is open the issue by activating its title link. Step four is read the issue description to understand what they reported. That is the rhythm: orient, act, verify, continue.

[JAMIE]
How would you walk the room through that step by step?

[ALEX]
First, scroll to the comment box at the bottom of the issue. Then, write a helpful comment that @mentions the issue author by username. After that, activate the Comment button (or press Ctrl+Enter). That small check between steps is what makes the workflow reliable.

[ALEX]
The useful habit is simple: orient, act, verify, then continue. That pause between action and trust is part of the work.

[JAMIE]
Let's pause on Optional Extension Step-by-Step: Add a Sub-Issue. What should a learner take away from it?

[ALEX]
Do not treat Optional Extension Step-by-Step: Add a Sub-Issue as decoration. Break a larger issue into smaller, trackable pieces using GitHub's sub-issue feature. That is not trivia. the issue you created in Challenge 2 (or any open issue you have permission to edit). The workshop is closer to rehearsal than lecture. You hear the move, try the move, and then check what changed.

[ALEX]
On the ground, that means a few things. Sub-issue: "Add alt text to welcome banner image". Sub-issue: "Fix heading hierarchy in Getting Started section".

[ALEX]
First, open the issue you created in Challenge 2. Then, look for the Sub-issues section in the issue sidebar (right side on desktop). If you do not see it, look for an Add sub-issue button or the Create sub-issue option below the issue description. After that, activate Add sub-issue and choose Create new sub-issue. Finally, give the sub-issue a clear title that describes one specific piece of the parent issue. For example, if the parent is "Fix accessibility in welcome.md". That small check between steps is what makes the workflow reliable.

[JAMIE]
Before we leave Optional Extension Step-by-Step: Add a Sub-Issue, what is the practical point?

[ALEX]
Start here: Add a short description and activate Create. Then: The sub-issue now appears nested under the parent issue with a progress indicator. The sequence works because every action has a confirmation.

[PAUSE]

[JAMIE]
What should the learner prove to themselves after each small task?

[ALEX]
If the interface shifts, Completing Chapter 5: Submit Your Evidence is still useful because when you have finished the Chapter 5 issue challenges, go to your assigned Challenge 2 or Challenge 3 issue and post a comment with your evidence. For someone navigating by keyboard or screen reader, this detail matters: Replace [number] with the actual issue numbers.

[ALEX]
This is where the talk moves from concept to action. Expected Outcomes has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
The room should hear these as checkpoints. Student can create an issue with a clear title and description. Student can communicate in issue threads using @mentions. Student can organize work by breaking issues into sub-issues.

[JAMIE]
Now it sounds like a workflow instead of a wall of instructions.

[ALEX]
That is where confidence comes from: not from never getting lost, but from knowing how to recover.

[JAMIE]
Let's pause on If You Get Stuck. What should a learner take away from it?

[ALEX]
If You Get Stuck has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Think of this as 4 checks: Can't find a classmate's issue? Filter the Issues tab by is:open and look for recent ones; @mention not working? Make sure you type @ immediately followed by the username with no space; Sub-issue option not visible? Ask a facilitator - the feature may need to be enabled for the repository; and Still stuck? Ask a facilitator for a direct issue link. Pause after each step and listen for the confirmation before moving on.

[JAMIE]
Before we leave If You Get Stuck, what is the practical point?

[ALEX]
The path is straightforward once it is named. Step one is finished but not sure you did it right? Compare your work against the Challenge 2 reference solution or the Challenge 3 reference solution. The point is not speed; the point is never losing your place.

[PAUSE]

[ALEX]
Before the learner moves on. This part earns its place because issues are collaborative spaces, not just task lists. This is where the workflow starts to feel magical, because the result becomes visible and explainable: An @mention tells someone "I need your attention here." Sub-issues turn vague tasks into clear checklists. That is the difference between following directions and owning the workflow.

[JAMIE]
Let's pause on Learning Pattern Used in This Chapter. What should a learner take away from it?

[ALEX]
Learning Pattern Used in This Chapter has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
First, start with a small, safe action (create an issue). Then, practice communication in public issue threads (@mention a peer). After that, organize work into smaller pieces (sub-issues). Finally, leave clear evidence in the issue timeline. Each step should leave a trace you can name.

[JAMIE]
Before we leave Learning Pattern Used in This Chapter, what is the practical point?

[ALEX]
Start here: Build momentum for file editing and PR work in Chapter 6. If one step does not match what you hear, stop there and re-orient.

[ALEX]
Now slow down for the part people usually miss. Here is the learner-facing version. This chapter provides learning cards: expandable blocks that offer perspective-specific guidance for different ways of working. The next useful detail is concrete: Not every card appears at every step.

[PAUSE]

[JAMIE]
What should they understand before typing anything?

[ALEX]
This is the move inside Local Git Alternative: Working from Your Clone: if you cloned the learning-room in Block 0 and prefer working locally. Put another way, during Block 0 you cloned the Learning Room repository to your computer.

[ALEX]
Treat examples as spoken recipes, not decorations. You may hear something like cd /Documents/learning-room or wherever you cloned it; git status should show "On branch main". List your assigned challenge issues; gh issue list --assignee @me --label challenge; View a specific issue in the terminal; gh issue view 42; Leave a comment on an issue; gh issue comment 42 --body "I'd like to try this!"; Create a new issue interactively; gh. Read the command, understand what it changes, then run it only when the repository state matches the lesson.

[JAMIE]
That is the kind of detail that keeps a screen reader user oriented.

[ALEX]
Yes. The named thing - the heading, tab, field, branch, or button - is the handhold.

[ALEX]
A solid Git habit is to know which branch you are on, what changed, and what confirmation you expect before you run the next command.

[ALEX]
Here is the moment where the page starts to make sense. Anchor this part on What Is a GitHub Issue? An issue is a discussion thread attached to a repository. That matters in practice: Every issue has a number ( 42), a state (Open or Closed), a title, a description, and a comment thread. The durable skill is not memorizing one screen. It is knowing how to find your footing when the screen changes.

[ALEX]
Listen for the small confirmations in this list. Bug reports - "This feature doesn't work when usin

[...middle omitted for length...]

contrast." The second version gives maintainers something to. That is the difference between following directions and owning the workflow.

[ALEX]
The path is straightforward once it is named. Step one is problem statement -- Describe the pain point. What are you trying to do, and why is it hard or impossible right now? Step two is proposed solution -- Your best idea for fixing the problem. Be specific enough to discuss, but hold it loosely. Step three is alternatives considered -- Other approaches you thought about and why they fell short. This shows you have done your homework. Step four is who benefits -- Name the audience. "Screen reader users navigating large repositories" is more compelling than "everyone.". That small check between steps is what makes the workflow reliable.

[JAMIE]
Let's pause on General Issue Writing Principles. What should a learner take away from it?

[ALEX]
General Issue Writing Principles: These rules apply to every issue -- bugs, features, questions, and everything in between. The listener should be able to check this: If you discovered two bugs during the same session, file two separate issues.

[ALEX]
Keep the teaching thread moving. Here is the learner-facing version. I tried clicking and nothing happened. That is not trivia. The maintainer has to ask: What doesn't work?

[PAUSE]

[JAMIE]
Let's pause on Learning Cards: Writing Effective Issues. What should a learner take away from it?

[ALEX]
Learning Cards: Writing Effective Issues has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Here is the part to remember. Use fenced code blocks (triple backticks) when pasting error messages or screen reader output; your screen reader announces "code block" so listeners know the text is literal, not description. When writing "Steps to Reproduce," type each step as a numbered Markdown list item (1., 2., etc.) so screen readers announce "list with N items". Type in the comment body to trigger issue autocomplete; press Down Arrow to navigate matching issues and Enter to insert a cross-reference link. Use the Preview tab (next to Write) to check your Markdown rendering before submitting; headings, bold text, and code blocks are much easier to proofread in rendered form. Screenshots with alt text are valuable evidence; add them with the image button in the formatting toolbar or drag-and-drop into the body field. Keep paragraphs short (3-4 sentences max) so the issue is scannable at high zoom without excessive scrolling.

[JAMIE]
Let's pause on Try It: File Your First Issue. What should a learner take away from it?

[ALEX]
Anchor this part on Try It: File Your First Issue. Time: 3 minutes What you need: Browser, signed in to GitHub. The useful version is: Go to the Learning Room repository and file a real issue. The durable skill is not memorizing one screen. It is knowing how to find your footing when the screen changes.

[ALEX]
Think of this as 4 checks: Navigate to the Issues tab (press G then I in Focus Mode); Find and activate the "New issue" button (K to links, or Tab to it); In the title field, type: "Introduce myself - [Your Name]"; and In the description, write 2-3 sentences: who you are, what screen reader you use, and one thing you're hoping to learn today. The point is not speed; the point is never losing your place.

[JAMIE]
Before we leave Try It: File Your First Issue, what is the practical point?

[ALEX]
The path is straightforward once it is named. Step one is press Ctrl+Enter to submit (or Tab to the Submit button and press Enter). Each step should leave a trace you can name.

[JAMIE]
Let's pause on Learning Cards: Filing Your First Issue. What should a learner take away from it?

[ALEX]
The reason this matters is simple: day 2 Amplifier - Accessibility Agents: @issue-tracker File, read, comment on, and triage real issues manually before using any agent. That is the difference between guessing and knowing: If you have not done the triage work yourself - reading descriptions, assigning labels, identifying duplicates - you cannot evaluate whether an agent's priority scoring is correct.

[ALEX]
Here is the part to remember. After pressing Ctrl+Enter to submit, listen for the page reload; GitHub navigates to your new issue page where the title is the first heading -- press 1 to confirm it matches what you typed. Navigate the issue list with 3 (heading level 3) to jump between issue titles; this is faster than arrowing through every element on the page. If the template picker appears, use Tab and Enter to select "Open a blank issue"; template names are announced as link text. The "New issue" button is prominent and green on the Issues list page; at high zoom it remains visible near the top of the page and does not collapse into a menu.

[PAUSE]

[JAMIE]
What should people carry with them after this?

[ALEX]
Carry the map. Know what page or tool you are in, know which action you are taking, and know what confirmation should follow. If the confirmation is missing, pause. That pause is not wasted time; it is professional judgment, and it is how complex workflows start to feel magical instead of stressful.

[JAMIE]
That is a better way to say it than just follow the steps.

[ALEX]
Right. Steps matter, but understanding wins. That is episode 5. Next in the series is episode 6, where we keep building the same contributor muscles.
<<<END_TRANSCRIPT>>>
