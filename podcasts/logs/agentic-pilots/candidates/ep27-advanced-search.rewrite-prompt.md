You are rewriting a podcast transcript for variety and teachability.
Use automatic model selection (no model is specified by caller).
Return ONLY the transcript text with valid speaker markers.

Hard format requirements:
- Allowed markers only: [ALEX], [JAMIE], [PAUSE]
- Marker line must be on its own line
- Keep script structure conversational and teachable
- Keep concept coverage aligned to source materials

Slug: ep27-advanced-search
Title: Episode 27: Advanced Search
Description: GitHub search query language, qualifiers, and filtering for issues, PRs, and code.

Concept checklist to preserve:
- The search bar on GitHub: global search versus in-repository search
- Search scopes: repositories, code, issues, pull requests, users, topics
- Qualifier syntax: key:value pairs
- Issue qualifiers: is:open, is:closed, label:, author:, assignee:, milestone:
- PR qualifiers: is:pr, review:approved, draft:true, head:, base:
- Code qualifiers: language:, path:, extension:, org:, repo:
- Date range qualifiers: created:>2025-01-01, updated:<2026-01-01
- Combining qualifiers for precise searches
- Sorting results: sort:created-asc, sort:updated-desc
- Searching from the command line with gh search
- Saved searches and building a personal search library

Source heading checklist to preserve (topic coverage, can paraphrase):
- ## Finding Anything Across All of GitHub
- ## Table of Contents
- ## 1. The Search Interface
- ### Keyboard to global search
- ### Learning Cards: The Search Interface
- ## 2. Search Scopes
- ## 3. The Core Query Language
- ### Boolean Logic
- ### Common Qualifiers
- ### Date Qualifiers
- ## 4. Searching Issues and Pull Requests
- ### Going to the Issues search directly
- ### Practical queries
- #### Find all unassigned, open accessibility issues across an org
- #### Find good first issues in any language
- #### Find good first issues in a specific language
- #### Find all PRs you need to review
- #### Find all open PRs where you were mentioned
- #### Find your open issues across all repos
- #### Find issues that are stale (open, not updated in 6+ months)
- ### Learning Cards: Searching Issues and Pull Requests
- ## 5. Searching Code
- ### Basic code search
- ### Find uses of a function across a repo
- ### Find a pattern across all repos in an org
- ### Code search qualifiers
- ## 6. Searching Commits
- ### Find commits with a keyword in the message
- ### Find commits by a specific author
- ### Find commits in a date range
- ### Find commits that touched a specific file
- ## 7. Searching Repositories
- ### Find accessible repos by topic
- ### Find repos with a specific language, sorted by stars
- ### Repository qualifiers
- ## 8. Searching Users and Organizations
- ### Find users
- ### Find organizations
- ## 9. Practical Queries for This Workshop
- ### Find open contributions you can make right now in accessibility-agents
- ### Check whether your issue is already filed
- ### Find all accessibility-related issues in a project
- ### See all your merged PRs (proof of contribution)
- ### Find recent discussions about a topic
- ## 10. Saving and Reusing Searches
- ### Example bookmarkable URL
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
Welcome to episode 27 of Git Going with GitHub: Advanced Search. I am Alex, and today we are teaching this topic as a conversation you can carry into the workshop, not as a page you have to memorize.

[JAMIE]
And I am Jamie. I will keep pulling the lesson back to real learners, real repositories, and the evidence that proves the work happened.

[PAUSE]

[ALEX]
The lesson focus is GitHub search query language, qualifiers, and filtering for issues, PRs, and code. We will treat every step as a teachable decision, because that is what makes the skill portable and the workflow feel smooth.

[JAMIE]
So we should explain the why clearly enough that the steps make sense when the learner meets them later and still feel doable.

[ALEX]
That is it. If a listener only has audio right now, they should still get the complete concept and know what evidence would prove success.

[PAUSE]

[JAMIE]
Okay, set the room for us. What are we walking into?

[ALEX]
Finding Anything Across All of GitHub: GitHub's search engine is powerful and underused. The next useful detail is concrete: For screen reader users in particular, using the search bar with precise query syntax is often faster and more accessible than navigating filter dropdowns and checkbox menus.

[ALEX]
The next layer is this. Here is the learner-facing version. GitHub's search is accessible from nearly any page. A good GitHub workflow is like a well-run meeting: everyone knows the topic, the next action, and who has the floor.

[ALEX]
Here are the anchors worth keeping. Global search bar: At the top of every GitHub page - keyboard shortcut / to focus it from anywhere (press /, then type). Issues/PRs list: Each tab has its own search bar pre-scoped to that repository. Advanced Search UI: github.com/search/advanced - a form with individual fields for each filter. Accessible but verbose; query syntax below is faster.

[JAMIE]
What is the one idea that makes the next few steps less mysterious?

[ALEX]
Learning Cards: The Search Interface has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
That shows up in the workshop in a few specific ways. Press / on any GitHub page to jump straight to the global search bar -- no Tab hunting required. After pressing Enter on a query, results are grouped by type under headings (Code, Issues, PRs, Repositories) -- use H to jump between groups. Query syntax typed directly in the search bar is often faster and more accessible than the Advanced Search form at github.com/search/advanced. The search bar sits at the very top of every GitHub page -- if you lose it at high zoom, press / to refocus instantly. Search results use bold text for matched terms -- increase browser zoom to make the highlighted keywords easier to spot. Pin the Advanced Search page (github.com/search/advanced) as a bookmark for days when you prefer large labeled form fields over compact query syntax.

[JAMIE]
That feels much more doable when you say it as one move.

[ALEX]
Right. The magic is not speed. The magic is knowing what changed and why it matters.

[PAUSE]

[ALEX]
Now bring the learner back to the room. Anchor this part on 2. Search Scopes. By default, GitHub searches across all of GitHub. This is the part to say slowly: Example: repo:community-access/accessibility-agents in:title keyboard finds issues/PRs whose titles mention "keyboard" in the accessibility-agents repo.

[JAMIE]
What would you say to someone who is already bracing for this to be too much?

[ALEX]
The reason this matters is simple: GitHub's issue/PR search is at github.com/issues (your issues) or github.com/pulls (your PRs). The listener should be able to check this: The search bar there is pre-scoped to "repos you have access to involving you.".

[ALEX]
A solid issue habit is to read the title, the body, and the timeline before acting. You are listening for the requested action, the missing evidence, and the person who needs a response.

[ALEX]
That matters because of the next idea. Learning Cards: Searching Issues and Pull Requests has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
On the ground, that means a few things. The is:pr is:open review-requested:@me query is your daily go-to -- it lists every PR waiting for your review without navigating the Pulls tab. Combine assignee:@me with is:open to get your personal task list announced as a simple results list. Use in:title or in:body qualifiers to avoid noisy matches buried in long comment threads. Bookmark the URL after running a search -- the full query is encoded in the address bar so you can reuse it without retyping. The Issues search page (github.com/issues) pre-scopes to your repos -- at high zoom this single-column list is easier to scan than a full global search. Results show labels as colored badges next to each title -- zoom in or hover to read the label text if the color alone is hard to distinguish.

[PAUSE]

[JAMIE]
If I am listening before the workshop starts, what should settle in my mind first?

[ALEX]
If the interface shifts, 5. Searching Code is still useful because code search operates differently from issue search. For someone navigating by keyboard or screen reader, this detail matters: As of 2024, GitHub uses an improved code search engine (sometimes called "code search v2") with better indexing.

[ALEX]
The useful habit is simple: orient, act, verify, then continue. That pause between action and trust is part of the work.

[ALEX]
This is where the talk moves from concept to action. Put 9. Practical Queries for This Workshop into plain language. Bookmark these for use during the hackathon.

[JAMIE]
Now it sounds like a workflow instead of a wall of instructions.

[ALEX]
That is where confidence comes from: not from never getting lost, but from knowing how to recover.

[ALEX]
A solid pull request habit is to separate three questions: what changed, why it changed, and what still needs review. That keeps the conversation useful instead of noisy.

[JAMIE]
Turn that into a path someone can follow.

[ALEX]
The teaching point here is not the label; it is the move. GitHub does not have a built-in saved-search feature, but you can.

[ALEX]
Think of this as 3 checks: Bookmark the URL - every search result page has the query in the URL. Bookmark it in your browser for instant re-run; Pin in notifications - if you're watching a repo, set up notification filters; and Accessibility Agents - use /my-issues and /my-prs for your personal saved-search equivalents without leaving VS Code. Pause after each step and listen for the confirmation before moving on.

[PAUSE]

[ALEX]
Before the learner moves on. This part earns its place because next: Appendix O: Branch Protection Back: Appendix M: Accessibility Standards Teaching chapter: Chapter 05: Working with Issues. That is the difference between following directions and owning the workflow.

[JAMIE]
Give me the version that sounds like an instructor, not a manual.

[ALEX]
Section-Level Source Map: Use this map to verify facts for each major section in this file.

[ALEX]
If someone is taking notes, this is the short list. Finding Anything Across All of GitHub: GitHub Docs, home, GitHub Changelog, GitHub code search syntax, Advanced search docs, About Git. The Search Interface: GitHub Docs, home, GitHub Changelog, GitHub code search syntax, Advanced search docs. Search Scopes: GitHub Docs, home, GitHub Changelog, GitHub code search syntax, Advanced search docs. The Core Query Language: GitHub Docs, home, GitHub Changelog, GitHub code search syntax, Advanced search docs. Searching Issues and Pull Requests: GitHub Docs, home, GitHub Changelog, GitHub code search syntax, Advanced search docs, About Git. Searching Code: GitHub Docs, home, GitHub Changelog, GitHub code search syntax, Advanced search docs.

[PAUSE]

[JAMIE]
What should people carry with them after this?

[ALEX]
Carry the map. Know what page or tool you are in, know which action you are taking, and know what confirmation should follow. If the confirmation is missing, pause. That pause is not wasted time; it is professional judgment, and it is how complex workflows start to feel magical instead of stressful.

[JAMIE]
That is a better way to say it than just follow the steps.

[ALEX]
Right. Steps matter, but understanding wins. That is episode 27. Next in the series is episode 28, where we keep building the same contributor muscles.
<<<END_TRANSCRIPT>>>
