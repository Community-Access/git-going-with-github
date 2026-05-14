You are rewriting a podcast transcript for variety and teachability.
Use automatic model selection (no model is specified by caller).
Return ONLY the transcript text with valid speaker markers.

Hard format requirements:
- Allowed markers only: [ALEX], [JAMIE], [PAUSE]
- Marker line must be on its own line
- Keep script structure conversational and teachable
- Keep concept coverage aligned to source materials

Slug: ep23-github-gists
Title: Episode 23: GitHub Gists
Description: Lightweight code sharing: creating, editing, forking, and embedding Gists.

Concept checklist to preserve:
- What a Gist is: a lightweight way to share code snippets
- Public versus secret Gists (secret is not private)
- Creating a Gist from gist.github.com
- Creating a Gist from the command line with gh gist create
- Adding multiple files to a single Gist
- Editing and versioning: Gists are Git repositories
- Forking and starring Gists
- Embedding a Gist in a web page
- When to use a Gist versus a full repository

Source heading checklist to preserve (topic coverage, can paraphrase):
- ## GitHub Discussions
- ## Forum-Style Conversations Beyond Issues and Pull Requests
- ### Support Hub Onboarding (Recommended For Workshop Alumni)
- ### Learning Cards: GitHub Discussions
- ## Table of Contents
- ## 1. Discussions vs. Issues: When to Use Which
- ### Common Discussions categories you'll encounter
- ## 2. Navigating to Discussions
- ### From a Repository
- ### From an Organization
- ## 3. Discussion Categories
- ### Navigating categories
- ### The side panel (left or right depending on view width) shows
- ## 4. Creating a Discussion
- ### Screen reader path
- ### Learning Cards: Creating a Discussion
- ## 5. Participating in Discussions
- ### Reading a Discussion
- #### Navigation
- ### Replying to a Discussion
- ### Replying to a Specific Comment (Nested Reply)
- ### Upvoting
- ## 6. Marking an Answer
- ### To mark an answer (as the discussion author)
- ## 7. Polls
- ### Creating a poll
- ### Voting in a poll
- ## 8. Screen Reader Navigation Reference
- ### Discussions List
- ### Inside a Discussion
- #### NVDA note
- #### JAWS note
- #### VoiceOver note
- ## 9. Organization-Level Discussions
- ## 10. Accessibility Agents: What's Different Here
- ## GitHub Gists
- ## Shareable Code Snippets and Notes
- ### Learning Cards: GitHub Gists
- ## What Is a Gist?
- ## When to Use a Gist vs a Repository
- ## Creating a Gist
- ### Via GitHub Web Interface
- #### Screen reader navigation
- ### Adding Multiple Files to a Gist
- ### Learning Cards: Creating a Gist
- ## Editing a Gist
- ## Embedding a Gist
- ## Cloning a Gist
- ## Forking a Gist
- ## Finding Your Gists
- ### Screen reader navigation
- ## Discovering Public Gists
- ## Gist Comments
- ### To add a comment
- ## Security and Privacy
- ### Public Gists
- ### Secret Gists
- ### Never put sensitive data in Gists
- ## Example Use Cases
- ### 1. Sharing Screen Reader Config

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
Welcome to episode 23 of Git Going with GitHub: GitHub Gists. I am Alex, and today we are teaching this topic as a conversation you can carry into the workshop, not as a page you have to memorize.

[JAMIE]
And I am Jamie. I will keep pulling the lesson back to real learners, real repositories, and the evidence that proves the work happened.

[PAUSE]

[ALEX]
The lesson focus is Lightweight code sharing: creating, editing, forking, and embedding Gists. We will treat every step as a teachable decision, because that is what makes the skill portable and the workflow feel smooth.

[JAMIE]
So we should explain the why clearly enough that the steps make sense when the learner meets them later and still feel doable.

[ALEX]
That is it. If a listener only has audio right now, they should still get the complete concept and know what evidence would prove success.

[PAUSE]

[JAMIE]
Okay, set the room for us. What are we walking into?

[ALEX]
Forum-Style Conversations Beyond Issues and Pull Requests: GitHub Discussions is a built-in community forum for repositories and organizations. The next useful detail is concrete: It's where open-ended conversations live - questions, ideas, announcements, polls, and community Q&A - separate from the action-oriented world of issues and pull requests.

[ALEX]
A solid issue habit is to read the title, the body, and the timeline before acting. You are listening for the requested action, the missing evidence, and the person who needs a response.

[JAMIE]
How would you walk the room through that step by step?

[ALEX]
Here is the learner-facing version. For ongoing support after the workshop, use. Put another way, suggested first steps for students. A good GitHub workflow is like a well-run meeting: everyone knows the topic, the next action, and who has the floor.

[ALEX]
Here are the anchors worth keeping. Support hub home: Community-Access/support. Q&A and community discussion: Support Hub Discussions. Trackable support requests: Support Hub Issues.

[ALEX]
Start here: Read the pinned Start Here resources in Discussions. Then: Search existing discussions before opening a new support thread. Next: Use issue templates for setup blockers or accessibility blockers so maintainers can help faster. The point is not speed; the point is never losing your place.

[JAMIE]
What is the one idea that makes the next few steps less mysterious?

[ALEX]
Learning Cards: GitHub Discussions has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
That shows up in the workshop in a few specific ways. The Discussions tab is in the repository's main navigation bar alongside Code, Issues, and Pull Requests -- press T to navigate tab items or K to find the "Discussions" link. Inside a discussion, replies are article elements -- in NVDA press A to jump between replies; in JAWS use A as well. The reply editor uses the same behavior as issue comments -- enter Focus Mode to type, then press Ctrl+Enter to submit. Discussion categories appear as a sidebar panel on the left or right depending on viewport width -- look for the category list with item counts. Answered discussions in the Q&A category display a green "Answered" badge next to the title, with the accepted answer pinned to the top. Polls show percentage bars next to each option after you vote -- the bars use color fill to indicate proportion.

[JAMIE]
That feels much more doable when you say it as one move.

[ALEX]
Right. The magic is not speed. The magic is knowing what changed and why it matters.

[PAUSE]

[JAMIE]
What is the judgment call here?

[ALEX]
Anchor this part on 1. Discussions vs. Issues: When to Use Which. Not every conversation belongs in an issue. This is the part to say slowly: GitHub Discussions exists for the conversations that don't fit.

[ALEX]
Use the comparison to make a decision, not to recite a table. The main contrasts are: Use Issues When means Use Discussions When. You found a bug means You have a question about how something works. You want to request a specific feature means You want to brainstorm ideas before filing a feature request.

[JAMIE]
What would you say to someone who is already bracing for this to be too much?

[ALEX]
Common Discussions categories you'll encounter has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
The parts worth keeping in working memory are these. Q&A - Support questions and answers (one answer can be marked correct). Ideas - Feature brainstorming before a formal feature request. Announcements - Maintainer posts about releases, breaking changes, roadmaps. General - Everything else. Show and Tell - Community members showing what they built.

[ALEX]
The useful habit is simple: orient, act, verify, then continue. That pause between action and trust is part of the work.

[JAMIE]
Give me the sequence, because order matters here.

[ALEX]
Do not treat From a Repository as decoration. If the tab is missing: Discussions is an opt-in feature. That is not trivia. The repository maintainer must enable it in Settings. The workshop is closer to rehearsal than lecture. You hear the move, try the move, and then check what changed.

[ALEX]
First, navigate to the repository. Then, there is a Discussions tab in the main navigation (alongside Code, Issues, Pull Requests, Actions, Projects). After that, press T to navigate tab items, or K to navigate links and find "Discussions". Finally, press Enter to open. That small check between steps is what makes the workflow reliable.

[PAUSE]

[JAMIE]
What does the learner do first, second, and then after that?

[ALEX]
If the interface shifts, From an Organization is still useful because large organizations can have organization-level Discussions separate from any individual repository.

[ALEX]
Start here: Navigate to the organization page. Then: Look for the Discussions tab at the organization level. Next: These are community-wide conversations, not repo-specific. The sequence works because every action has a confirmation.

[ALEX]
This is where the talk moves from concept to action. Put 3. Discussion Categories into plain language. The Discussions home page is organized by category. The useful version is: Each category is a section with its own heading.

[JAMIE]
Now it sounds like a workflow instead of a wall of instructions.

[ALEX]
That is where confidence comes from: not from never getting lost, but from knowing how to recover.

[JAMIE]
Where do you want a learner to place their attention here?

[ALEX]
The side panel (left or right depending on view width) shows has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
These are the details that keep the idea from floating away. All categories with item counts. Pin/announcements section at top. Most active discussions. Tags (if the repo uses them).

[PAUSE]

[JAMIE]
What is the ordered workflow?

[ALEX]
4. Creating a Discussion has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
That becomes easier when you listen for these cues. Title - Clear and searchable. "How do I use the daily-briefing agent?" not "Help". Body - Use Markdown. Same editor as issues. For Q&A category: phrase the title as a question.

[ALEX]
The path is straightforward once it is named. Step one is from the Discussions tab, activate "New discussion" button. Step two is select a category (required - affects which fields appear). Step three is fill in. Step four is activate "Start discussion". The point is not speed; the point is never losing your place.

[JAMIE]
Give me the version that sounds like an instructor, not a manual.

[ALEX]
Screen reader path: Before posting a question: Search existing discussions first. That gives the learner a foothold: use the search bar at the top of the Discussions page or GitHub's global search with repo:owner/name in:discussions.

[ALEX]
A solid navigation habit is to prove where you are before activating controls. Headings, landmarks, and the address bar are not trivia; they are your map.

[ALEX]
Now slow down for the part people usually miss. Learning Cards: Creating a Discussion has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Here is the part that makes the next action easier. Tab to the "New discussion" button from the Discussions tab, then press Enter -- the form loads with a category selector first; arrow through categories and press Enter to select. The title field comes after the category selector -- type a clear, searchable title; for Q&A category, phrase it as a question so it reads naturally in search results. The body editor is the same as the issue comment editor -- enter Focus Mode to type, use Markdown formatting, and press Ctrl+Enter to submit the discussion. The category selector appears as a list or grid of labeled options -- each category has a name and description; zoom in to read the descriptions and pick the right one. The title and body fields stack vertically in a single-column layout -- the form is the same width as the main content area, making it easy to scan at high zoom. After creating a discussion, a green success banner appears at the top -- scroll up if you do not see confirmation at your current zoom position.

[PAUSE]

[JAMIE]
If I am listening before the workshop starts, what should settle in my mind first?

[ALEX]
This is the move inside Reading a Discussion: a discussion page is structured similarly to an issue.

[ALEX]
These are the pieces that turn the idea into a usable move. The original post at the top. Replies in chronological order. An "Answered" reply pinned to the top (Q&A category only). A reply editor at the bottom.

[JAMIE]
That is the kind of detail that keeps a screen reader user oriented.

[ALEX]
Yes. The named thing - the heading, tab, field, branch, or button - is the handhold.

[JAMIE]
Turn that into a path someone can follow.

[ALEX]
Replying to a Discussion has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Think of this as 4 checks: Navigate to the bottom of the page (or use the "Reply" button on a specific comment); The reply text area behaves identically to issue comments; Focus Mode → type your reply; and Ctrl+Enter to submit. That small check between steps is what makes the workflow reliable.

[JAMIE]
Let's pause on Replying to a Specific Comment (Nested Reply). What should a learner take away from it?

[ALEX]
The reason this matters is simple: each comment has a Reply button below it.

[PAUSE]

[ALEX]
The next point gives the learner a handle. Do not treat Upvoting as decoration. Instead of leaving "+1" comments, use the thumbs-up reaction on the original post or replies. The listener should be able to check this: Many maintainers sort discussion responses by upvotes to prioritize most-needed answers.

[JAMIE]
Let's pause on 6. Marking an Answer. What should a learner take away from it?

[ALEX]
If the interface shifts, 6. Marking an Answer is still useful because in the Q&A category, one reply can be marked as the accepted answer. That is not trivia. This is similar to Stack Overflow's "accepted answer" mechanic.

[JAMIE]
Let's pause on To mark an answer (as the discussion author). What should a learner take away from it?

[ALEX]
Put To mark an answer (as the discussion author) into plain language. Why it matters: Marked answers make Q&A discussions into searchable documentation. For someone navigating by keyboard or screen reader, this detail matters: Anyone who searches for the same question later immediately sees the correct answer without reading the whole thread. The interface gets easier when it becomes a set of named places instead of a wall of controls.

[ALEX]
Walk it in order: Navigate to the reply you want to mark as the answer; Look for the "Mark as answer" button below the reply; and Activate it - the reply is pinned to the top and the discussion shows a green "Answered" badge. The point is not speed; the point is never losing your place.

[JAMIE]
So the learner is not behind if they stop there and check the page.

[ALEX]
Yes. Pausing to verify is not a detour; it is how you keep control of the workflow.

[PAUSE]

[JAMIE]
Let's pause on 7. Polls. What should a learner take away from it?

[ALEX]
The teaching point here is not the label; it is the move. Some discussion categories support embedded polls. The useful version is: A poll lets you gather structured vote data from the community.

[JAMIE]
Let's pause on Creating a poll.

[...middle omitted for length...]

ic, the next action, and who has the floor.

[ALEX]
Here is the part to remember. Asking questions about a snippet. Suggesting improvements. Discussing implementation details.

[PAUSE]

[JAMIE]
Let's pause on To add a comment. What should a learner take away from it?

[ALEX]
To add a comment has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Walk it in order: Scroll to the bottom of the Gist page; F to navigate form fields → Find the comment textarea; Type your comment (Markdown supported); and Ctrl+Enter or activate "Comment" button. Each step should leave a trace you can name.

[ALEX]
Before the learner moves on. Public Gists has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Here is the part to remember. Appear on your profile. Are indexed by search engines. Anyone can view, fork, and comment.

[JAMIE]
Let's pause on Secret Gists. What should a learner take away from it?

[ALEX]
Secret Gists has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Here is the part to remember. Do not appear on your profile. Are not indexed by search engines. Anyone with the URL can view. Still version-controlled and can be starred.

[PAUSE]

[JAMIE]
Let's pause on Never put sensitive data in Gists. What should a learner take away from it?

[ALEX]
Do not treat Never put sensitive data in Gists as decoration. If you accidentally post sensitive data. The workshop is closer to rehearsal than lecture. You hear the move, try the move, and then check what changed.

[ALEX]
Here is the part to remember. Passwords or API keys. Personal identifying information. Proprietary code you don't have permission to share.

[ALEX]
First, delete the Gist immediately. Then, revoke/regenerate any exposed credentials. After that, remember: Forks and clones may still exist. That small check between steps is what makes the workflow reliable.

[JAMIE]
What is the safe way to learn from that example?

[ALEX]
If the interface shifts, 1. Sharing Screen Reader Config is still useful because share the Gist URL with other screen reader users.

[ALEX]
Treat examples as spoken recipes, not decorations. You may hear something like Filename: nvda-github-config.txt; Content:; NVDA Settings for GitHub Web Navigation; - Browse Mode: Use screen layout (enabled); - Verbosity: Most punctuation; - Rate: 65%; - Keyboard shortcuts: Use standard GitHub shortcuts (G+I, G+P, etc.). Read the command, understand what it changes, then run it only when the repository state matches the lesson.

[ALEX]
Here is the moment where the page starts to make sense. Put 2. Quick Markdown Note into plain language. Reference it later or share with workshop participants.

[PAUSE]

[JAMIE]
Let's pause on 3. Code Snippet for a StackOverflow Answer. What should a learner take away from it?

[ALEX]
The teaching point here is not the label; it is the move. When answering questions, paste your code as a Gist and link to it. The listener should be able to check this: Readers get syntax highlighting, version history, and the ability to fork your solution.

[JAMIE]
Can you translate that into plain choices?

[ALEX]
Gists vs GitHub Repositories - Quick Comparison has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Use the comparison to make a decision, not to recite a table. The main contrasts are: Comments means Yes (on issues/PRs).

[JAMIE]
Let's pause on Deleting a Gist. What should a learner take away from it?

[ALEX]
Deleting a Gist: Next: Appendix V: GitHub Mobile Back: Appendix T: Community and Social Teaching chapter: Chapter 08: Open Source Culture.

[ALEX]
First, navigate to the Gist. Then, select "Edit". After that, select "Delete" (top-right, after Edit button). Finally, confirm deletion. Each step should leave a trace you can name.

[PAUSE]

[ALEX]
Hold that next to this. Here is the learner-facing version. Use this map to verify facts for each major section in this file.

[ALEX]
Here is the part to remember. GitHub Discussions: GitHub Docs, home, GitHub Changelog, GitHub Discussions docs, GitHub Gists docs, About Git. Forum-Style Conversations Beyond Issues and Pull Requests: GitHub Docs, home, GitHub Changelog, GitHub Discussions docs, GitHub Gists docs, About Git. Discussions vs. Issues: When to Use Which: GitHub Docs, home, GitHub Changelog, GitHub Discussions docs, GitHub Gists docs, About Git. Navigating to Discussions: GitHub Docs, home, GitHub Changelog, GitHub Discussions docs, GitHub Gists docs. Discussion Categories: GitHub Docs, home, GitHub Changelog, GitHub Discussions docs, GitHub Gists docs. Creating a Discussion: GitHub Docs, home, GitHub Changelog, GitHub Discussions docs, GitHub Gists docs.

[PAUSE]

[JAMIE]
What should people carry with them after this?

[ALEX]
Carry the map. Know what page or tool you are in, know which action you are taking, and know what confirmation should follow. If the confirmation is missing, pause. That pause is not wasted time; it is professional judgment, and it is how complex workflows start to feel magical instead of stressful.

[JAMIE]
That is a better way to say it than just follow the steps.

[ALEX]
Right. Steps matter, but understanding wins. That is episode 23. Next in the series is episode 24, where we keep building the same contributor muscles.
<<<END_TRANSCRIPT>>>
