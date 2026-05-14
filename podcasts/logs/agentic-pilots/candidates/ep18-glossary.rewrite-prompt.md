You are rewriting a podcast transcript for variety and teachability.
Use automatic model selection (no model is specified by caller).
Return ONLY the transcript text with valid speaker markers.

Hard format requirements:
- Allowed markers only: [ALEX], [JAMIE], [PAUSE]
- Marker line must be on its own line
- Keep script structure conversational and teachable
- Keep concept coverage aligned to source materials

Slug: ep18-glossary
Title: Episode 18: Glossary of Terms
Description: Comprehensive glossary: Git, GitHub, open source, and accessibility terminology.

Concept checklist to preserve:
- Version control terms: repository, commit, branch, merge, push, pull, clone, fork
- GitHub terms: issue, pull request, review, draft, merge conflict, status check
- Collaboration terms: upstream, downstream, origin, remote, local
- Accessibility terms: screen reader, landmark, heading, ARIA, focus, tab order
- Agent terms: Copilot, agent, slash command, prompt, instruction file
- Pronunciation guidance for ambiguous terms

Source heading checklist to preserve (topic coverage, can paraphrase):
- ## Every Term You Need for Open Source Contribution
- ### Learning Cards: Navigating the Glossary
- ## Part 1: The Building Blocks
- ### Repository (Repo)
- ### Organization (Org)
- ### Fork
- ### Remote
- #### To see your remotes
- #### To add a remote
- ### Origin
- ### .gitignore
- #### Why use .gitignore?
- #### Example `.gitignore`
- ### Clone
- ### Branch
- #### Common branch names
- ### Commit
- ### Diff
- ## Part 2: Collaboration Workflow
- ### Issue
- ### Pull Request (PR)
- ### Code Review
- ### Merge
- ### Merge Conflict
- ### Upstream
- ### Label
- ### Milestone
- ### Project (GitHub Projects)
- ## Part 3: People and Roles
- ### Maintainer
- ### Contributor
- ### Triage
- ### Collaborator
- ## Part 4: Common Abbreviations and Slang
- ## Part 5: Technical GitHub Concepts
- ### HEAD
- ### Detached HEAD
- #### Why it happens
- #### What this means
- #### How to fix it
- ### Stash
- #### Common workflow
- ## Stash commands
- ### Rebase
- #### Merge
- #### Rebase
- #### When to use rebase
- #### When NOT to rebase
- #### Basic rebase workflow
- ### Cherry-Pick
- #### When to use
- ### Fetch vs Pull
- #### When to use fetch
- #### When to use pull
- ### Force Push
- #### When force push is okay
- #### When force push is NEVER okay
- #### Safer alternative: `--force-with-lease`
- #### Why force push is needed after rebase
- ### SHA / Hash

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
This is Git Going with GitHub, episode 18: Glossary of Terms. I am Alex. By the end of this episode, Glossary of Terms should feel less like a wall of GitHub words and more like a set of moves with visible momentum.

[JAMIE]
And I am Jamie. I am here for the practical questions: what should I listen for, what can go wrong, and what is the next calm move?

[PAUSE]

[ALEX]
Today we are working on this: Comprehensive glossary: Git, GitHub, open source, and accessibility terminology. I want the learner to leave with a mental map, not just a remembered path through buttons.

[JAMIE]
So the goal is understanding first, then action, then confirmation.

[ALEX]
Right. We are building a rhythm: orient yourself, take one intentional action, then verify what changed before moving on. That rhythm is where the magic lives.

[PAUSE]

[JAMIE]
Okay, set the room for us. What are we walking into?

[ALEX]
Every Term You Need for Open Source Contribution: This glossary is your reference for the entire two-day workshop. The next useful detail is concrete: When you hear a term you don't recognize - check here first.

[ALEX]
The next layer is this. Learning Cards: Navigating the Glossary has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Here are the anchors worth keeping. Press H to jump between term headings (h3 level) within each category section. Use the Elements List (NVDA+F7 or Insert+F6) to see all terms at once and type a few letters to filter. Jump to "Alphabetical Quick Reference" at the bottom for a flat A-Z lookup table. Each term is a bold h3 heading -- increase zoom and scan headings to browse terms quickly. The alphabetical table at the bottom works well at high zoom since each row is self-contained. Use Ctrl+F in your browser to search for any term by name.

[JAMIE]
What is the one idea that makes the next few steps less mysterious?

[ALEX]
This is the move inside Repository (Repo): a repository is the container for an entire project. That matters in practice: It holds all the project's files, folders, documentation, and the complete history of every change ever made.

[JAMIE]
That feels much more doable when you say it as one move.

[ALEX]
Right. The magic is not speed. The magic is knowing what changed and why it matters.

[PAUSE]

[ALEX]
Now bring the learner back to the room. Anchor this part on Organization (Org). An organization is a group account on GitHub that multiple people can belong to. This is the part to say slowly: Open source projects typically live inside an organization rather than under a personal account.

[JAMIE]
What would you say to someone who is already bracing for this to be too much?

[ALEX]
The reason this matters is simple: a fork is a personal copy of someone else's repository, living in your own GitHub account. The listener should be able to check this: When you fork a repo, you get all its files and history.

[ALEX]
The useful habit is simple: orient, act, verify, then continue. That pause between action and trust is part of the work.

[ALEX]
That matters because of the next idea. Do not treat Remote as decoration. A remote is a connection to a repository hosted elsewhere (usually on GitHub). That is not trivia. Your local Git repository can have multiple remotes. The workshop is closer to rehearsal than lecture. You hear the move, try the move, and then check what changed.

[ALEX]
On the ground, that means a few things. origin - your fork on GitHub. upstream - the original repository you forked from.

[PAUSE]

[JAMIE]
What is the safe way to learn from that example?

[ALEX]
To see your remotes has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Treat examples as spoken recipes, not decorations. You may hear something like git remote -v. Read the command, understand what it changes, then run it only when the repository state matches the lesson.

[JAMIE]
What should happen before anyone copies and runs it?

[ALEX]
To add a remote has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Treat examples as spoken recipes, not decorations. You may hear something like git remote add upstream https://github.com/original-owner/repo.git. Read the command, understand what it changes, then run it only when the repository state matches the lesson.

[JAMIE]
Now it sounds like a workflow instead of a wall of instructions.

[ALEX]
That is where confidence comes from: not from never getting lost, but from knowing how to recover.

[JAMIE]
Where do you want a learner to place their attention here?

[ALEX]
The teaching point here is not the label; it is the move. origin is the default name Git gives to the remote repository you cloned from. That is the difference between guessing and knowing: When you clone your fork, origin points to your fork on GitHub.

[PAUSE]

[ALEX]
Before the learner moves on. This part earns its place because.gitignore is a special file in the root of your repository that tells Git which files or folders to ignore - meaning Git will not track or commit them. That is the difference between following directions and owning the workflow.

[JAMIE]
Give me the version that sounds like an instructor, not a manual.

[ALEX]
Why use.gitignore? has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
If someone is taking notes, this is the short list. Prevent committing temporary files (.DS Store, Thumbs.db). Ignore build outputs (dist/, build/, node modules/). Keep secrets out of Git (.env files, API keys, credentials). Avoid committing IDE-specific files (.vscode/,.idea/).

[JAMIE]
What should they understand before typing anything?

[ALEX]
Here is the learner-facing version.gitignore only ignores untracked files. The next useful detail is concrete: If you already committed a file, you must remove it from Git's tracking first.

[ALEX]
Treat examples as spoken recipes, not decorations. You may hear something like git rm --cached filename. Read the command, understand what it changes, then run it only when the repository state matches the lesson.

[PAUSE]

[JAMIE]
How do you keep commands from becoming magic words?

[ALEX]
This is the move inside Clone: cloning copies a repository from GitHub to your local computer so you can work with it in VS Code or your preferred editor. Put another way, when you clone, you get all the files and the complete history.

[ALEX]
Treat examples as spoken recipes, not decorations. You may hear something like git clone https://github.com/your-username/repo-name.git. Read the command, understand what it changes, then run it only when the repository state matches the lesson.

[JAMIE]
That is the kind of detail that keeps a screen reader user oriented.

[ALEX]
Yes. The named thing - the heading, tab, field, branch, or button - is the handhold.

[ALEX]
Here is the moment where the page starts to make sense. Anchor this part on Branch. A branch is a separate line of development inside a repository. That matters in practice: The main branch (often called main or master) holds the stable, released version of the project. The durable skill is not memorizing one screen. It is knowing how to find your footing when the screen changes.

[ALEX]
A solid Git habit is to know which branch you are on, what changed, and what confirmation you expect before you run the next command.

[JAMIE]
If I am listening before the workshop starts, what should settle in my mind first?

[ALEX]
Common branch names has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
The useful version is not abstract; it sounds like this. main - the primary, stable branch. develop - integration branch (not all projects have this). feature/my-new-thing - convention for feature branches. fix/broken-button - convention for bug fix branches. docs/update-readme - convention for documentation-only branches.

[PAUSE]

[JAMIE]
Let's pause on Commit. What should a learner take away from it?

[ALEX]
Do not treat Commit as decoration. A commit is a saved snapshot of your changes at a moment in time. The listener should be able to check this: Good commit messages are in the imperative mood: "Fix typo in README" not "Fixed typo" or "Fixing typo.".

[ALEX]
This is where the lesson becomes something you can check. A message describing what changed and why. A unique SHA hash (a fingerprint like a1b2c3d). The author and timestamp. The changes (additions and deletions to files).

[ALEX]
Treat examples as spoken recipes, not decorations. You may hear something like Fix broken link in accessibility guide; The link to the NVDA download page was using an outdated URL.; Updated to the current direct download page.; Fixes 42. Read the command, understand what it changes, then run it only when the repository state matches the lesson.

[JAMIE]
Let's pause on Diff. What should a learner take away from it?

[ALEX]
If the interface shifts, Diff is still useful because a diff (short for difference) shows what changed between two versions of a file. That is not trivia. Lines that were added are shown in green (with a + prefix).

[ALEX]
A solid pull request habit is to separate three questions: what changed, why it changed, and what still needs review. That keeps the conversation useful instead of noisy.

[ALEX]
Hold that next to this. Put Issue into plain language. An issue is a discussion item in a GitHub repository. For someone navigating by keyboard or screen reader, this detail matters: Every issue gets a sequential number (like 42) and can have labels, assignees, milestones, and comments. The interface gets easier when it becomes a set of named places instead of a wall of controls.

[ALEX]
That shows up in the workshop in a few specific ways. Reporting bugs. Requesting features or improvements. Asking questions. Discussing ideas.

[JAMIE]
So the learner is not behind if they stop there and check the page.

[ALEX]
Yes. Pausing to verify is not a detour; it is how you keep control of the workflow.

[ALEX]
A solid issue habit is to read the title, the body, and the timeline before acting. You are listening for the requested action, the missing evidence, and the person who needs a response.

[PAUSE]

[JAMIE]
Let's pause on Pull Request (PR). What should a learner take away from it?

[ALEX]
The teaching point here is not the label; it is the move. A pull request is a proposal to merge changes from one branch into another. The useful version is: When you have finished working on your fork or feature branch, you open a PR to say "here is my work - please review it and consider merging it.".

[ALEX]
For a learner, the useful signals are concrete. Which branch you want to merge into which target branch. The diff (all changes you made). A description of what you changed and why. Discussion threads and reviews from others.

[ALEX]
That connects to another useful point. This part earns its place because code review is the process of one or more collaborators reading and providing feedback on a PR before it is merged. That is the difference between guessing and knowing: Good code reviews are kind, specific, and constructive.

[ALEX]
The parts worth keeping in working memory are these. Comment - leave a note on a line (not a formal verdict). Approve - signal that they are happy with the changes. Request Changes - indicate that specific things need to be addressed before merging.

[JAMIE]
Let's pause on Merge. What should a learner take away from it?

[ALEX]
Merge: Merging is combining changes from one branch into another. This is where the workflow starts to feel magical, because the result becomes visible and explainable: When a PR is approved, a maintainer merges it.

[PAUSE]

[ALEX]
Here is the practical turn. Here is the learner-facing version. A merge conflict happens when two branches have both changed the same part of the same file in different ways. That gives the learner a foothold: Git doesn't know which version to keep, so it pauses and asks you to resolve it manually. A good GitHub workflow is like a well-run meeting: everyone knows the topic, the next action, and who has the floor.

[JAMIE]
Let's pause on Upstream. What should a learner take away from it?

[ALEX]
This is the move inside Upstream: upstream refers to the original repository that you forked from. The next useful detail is concrete: When the upstream project has new changes that you want to bring into your fork, you "sync" your fork with upstream.

[JAMIE]
That is a useful checkpoint before anyone s

[...middle omitted for length...]

(e.g., a1b2c3d4e5f6.). This is where the workflow starts to feel magical, because the result becomes visible and explainable: the learner will see shortened versions like a1b2c3d in the GitHub UI. The durable skill is not memorizing one screen. It is knowing how to find your footing when the screen changes.

[PAUSE]

[JAMIE]
Let's pause on Tag / Release. What should a learner take away from it?

[ALEX]
The reason this matters is simple: a tag marks a specific commit as significant - usually a version release like v1.0.0. That gives the learner a foothold: tags are permanent references (unlike branches, which move with each new commit).

[ALEX]
Keep the teaching thread moving. Do not treat Actions / Workflow / CI/CD as decoration. GitHub Actions is an automation platform built into GitHub. The next useful detail is concrete: Workflows are automated scripts (written in YAML) that run in response to events - like a PR being opened or code being pushed.

[JAMIE]
Let's pause on Status Check. What should a learner take away from it?

[ALEX]
If the interface shifts, Status Check is still useful because a status check is the result of an automated test or workflow run on a PR. Put another way, maintainers often require status checks to pass before merging.

[ALEX]
Here is the part to remember. Green checkmark - all checks passed. Red X - one or more checks failed. Yellow dot - checks are still running.

[PAUSE]

[ALEX]
Keep the teaching thread moving. Put Webhook into plain language. A webhook is an automated notification that GitHub sends to another service when something happens (a push, a PR opened, etc.). That matters in practice: Webhooks power integrations with tools like Slack, project management systems, and CI services. The interface gets easier when it becomes a set of named places instead of a wall of controls.

[JAMIE]
Let's pause on GitHub Discussions. What should a learner take away from it?

[ALEX]
The teaching point here is not the label; it is the move. Discussions are a threaded forum built into GitHub, separate from Issues. This is the part to say slowly: They are used for open-ended conversation, Q&A, and community announcements.

[ALEX]
Keep the teaching thread moving. This part earns its place because your GitHub profile is your public identity. The listener should be able to check this: It shows your name, bio, location, repositories, contribution activity (the green squares), and pinned projects.

[PAUSE]

[JAMIE]
Let's pause on GitHub Copilot. What should a learner take away from it?

[ALEX]
GitHub Copilot: GitHub Copilot is an AI-powered coding assistant. That is not trivia. It suggests code, documentation, and commit messages.

[ALEX]
Keep the teaching thread moving. Here is the learner-facing version. Every healthy open source project has these files in the root of the repository. A good GitHub workflow is like a well-run meeting: everyone knows the topic, the next action, and who has the floor.

[JAMIE]
Let's pause on Learning Cards: Alphabetical Quick Reference. What should a learner take away from it?

[ALEX]
Learning Cards: Alphabetical Quick Reference has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Here is the part to remember. Press T to jump to the table, then use Ctrl+Alt+Arrow keys to navigate rows and columns. Each row has two cells: Term and Definition -- column headers are announced on first entry. For longer definitions, the table keeps them concise; see the full entry above for details. This table is designed for quick lookups -- each row fits on a single line at most zoom levels. If the table wraps awkwardly, try reducing zoom slightly or switching to a wider window. Bold term names in the left column create a visible scan line.

[PAUSE]

[ALEX]
Keep the teaching thread moving. Anchor this part on Alphabetical Quick Reference. Next: Appendix B: Screen Reader Cheat Sheet Teaching chapter: Chapter 02: Understanding GitHub.

[JAMIE]
Let's pause on Section-Level Source Map. What should a learner take away from it?

[ALEX]
The reason this matters is simple: use this map to verify facts for each major section in this file.

[ALEX]
Here is the part to remember. Every Term You Need for Open Source Contribution: GitHub Docs, home, GitHub Changelog. Part 1: The Building Blocks: GitHub Docs, home, GitHub Changelog. Part 2: Collaboration Workflow: GitHub Docs, home, GitHub Changelog, Workflow syntax for GitHub Actions, Secure use reference for GitHub Actions, GitHub Actions changelog. Part 3: People and Roles: GitHub Docs, home, GitHub Changelog. Part 4: Common Abbreviations and Slang: GitHub Docs, home, GitHub Changelog. Part 5: Technical GitHub Concepts: GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests.

[PAUSE]

[JAMIE]
What should people carry with them after this?

[ALEX]
Carry the map. Know what page or tool you are in, know which action you are taking, and know what confirmation should follow. If the confirmation is missing, pause. That pause is not wasted time; it is professional judgment, and it is how complex workflows start to feel magical instead of stressful.

[JAMIE]
That is a better way to say it than just follow the steps.

[ALEX]
Right. Steps matter, but understanding wins. That is episode 18. Next in the series is episode 19, where we keep building the same contributor muscles.
<<<END_TRANSCRIPT>>>
