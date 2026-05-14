You are rewriting a podcast transcript for variety and teachability.
Use automatic model selection (no model is specified by caller).
Return ONLY the transcript text with valid speaker markers.

Hard format requirements:
- Allowed markers only: [ALEX], [JAMIE], [PAUSE]
- Marker line must be on its own line
- Keep script structure conversational and teachable
- Keep concept coverage aligned to source materials

Slug: ep08-culture-and-etiquette
Title: Episode 8: Open Source Culture and Etiquette
Description: Communication norms, code review etiquette, inclusive language, and asking questions.

Concept checklist to preserve:
- The unwritten rules of open source communication
- How tone comes across in text without vocal cues
- Writing a good issue description: context, steps, expected versus actual
- Writing a good PR description: what, why, how to test
- The Code of Conduct: what it is and why it exists
- Giving code review feedback: be specific, be kind, focus on the code
- Receiving code review feedback: do not take it personally
- Inclusive language: why it matters and examples of inclusive phrasing
- When to ask questions and how to frame them clearly
- Understanding that maintainers are often volunteers with limited time
- Patience with response times on open source projects
- How to disagree respectfully

Source heading checklist to preserve (topic coverage, can paraphrase):
- ## How to Be an Effective and Respectful Open Source Contributor
- ## Workshop Recommendation (Chapter 8)
- ### Chapter 8 Challenge Set
- ### Challenge 8.1 Step-by-Step: Guided Reflection
- ### Completing Chapter 8: Submit Your Evidence
- ### Expected Outcomes
- ### If You Get Stuck
- ### Learning Moment
- ### Learning Pattern Used in This Chapter
- ## GitHub Flow - The Standard Contribution Workflow
- ### The Six Steps of GitHub Flow
- ### Why This Model Works
- ### GitHub Flow vs Git Flow
- #### What Git Flow Is
- #### How the Git Flow Cycle Works
- #### How GitHub Flow Differs
- #### When You Might See Git Flow
- #### Why This Workshop Uses GitHub Flow
- ### The Unwritten Rule: One Thing Per Branch
- ### Learning Cards: GitHub Flow
- ## Keeping Your Fork Up to Date
- ### Why Sync Your Fork?
- ### Method 1: GitHub Web Interface (Easiest)
- ### Method 2: Git Command Line (VS Code Terminal)
- #### One-time setup - add the upstream remote
- #### Sync process
- ## When to sync
- ### Method 3: GitHub Desktop
- ### Learning Cards: Keeping Your Fork Up to Date
- ## Writing Good Commit Messages
- ### The commit message format
- ### The First Line (Required)
- ### The Body (Optional)
- ### The Footer (Optional)
- ### Atomic Commits
- ### Common mistakes to avoid
- ### Good commit messages in practice
- ### Learning Cards: Writing Good Commit Messages
- ## The Nature of Open Source Communication
- ### In writing
- ### Asynchronously
- ### In public
- ## The Anatomy of Helpful Feedback
- ### 1. Acknowledge what's working
- ### 2. Identify the specific concern
- ### 3. Explain why it matters
- ### 4. Suggest a path forward (when you can)
- ### 5. Signal the weight of the concern
- ## Language and Tone
- ### Prefer "we" or describe the code, not the person
- ### Use tentative language for uncertainty
- ### Acknowledge cultural and language diversity
- ### Avoid urgency markers unless genuinely urgent
- ## Commenting Etiquette
- ### Keep comments focused
- ### Don't leave comments unresolved
- ### Resolving conversations
- ### Do not "pile on"
- ### Reactions
- ### Saved Replies - Your Accessibility Win

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
Welcome to Git Going with GitHub, episode 8: Open Source Culture and Etiquette. I am Alex. Today we are going to make Open Source Culture and Etiquette feel magical in practice: clear, teachable, and recoverable when the interface surprises you.

[JAMIE]
And I am Jamie. I will be the voice of the learner who is willing to ask, what is this for, where am I, and how do I know I did it right?

[PAUSE]

[ALEX]
The big idea today: Communication norms, code review etiquette, inclusive language, and asking questions. We will name the concept, explain why it matters, practice the move, and point out the checks that make the outcome feel almost magical because it is verifiable.

[JAMIE]
So the episode should work even if someone has not read the chapter yet.

[ALEX]
Exactly. The transcript has to stand on its own. It can point toward practice, but it should teach the concept right here in the conversation.

[PAUSE]

[JAMIE]
Okay, set the room for us. What are we walking into?

[ALEX]
How to Be an Effective and Respectful Open Source Contributor: Technical skills get your code into a project. The next useful detail is concrete: Communication skills keep you welcomed in the community.

[ALEX]
The next layer is this. Here is the learner-facing version. Chapter 8 is a communication and culture chapter. A good GitHub workflow is like a well-run meeting: everyone knows the topic, the next action, and who has the floor.

[ALEX]
Here are the anchors worth keeping. There are 1 guided reflection (no bot grading). Automation check: none - communication quality is too subjective for fair automated scoring. The evidence is structured reflection comment on your assigned challenge issue. The pattern is read, reflect, commit to one behavior.

[JAMIE]
What does the learner do first, second, and then after that?

[ALEX]
Chapter 8 Challenge Set has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Walk it in order: Guided reflection - read the chapter, then post a short reflection comment committing to three specific collaboration behaviors. Each step should leave a trace you can name.

[JAMIE]
That feels much more doable when you say it as one move.

[ALEX]
Right. The magic is not speed. The magic is knowing what changed and why it matters.

[PAUSE]

[JAMIE]
Turn that into a path someone can follow.

[ALEX]
Anchor this part on Challenge 8.1 Step-by-Step: Guided Reflection. Identify three concrete communication behaviors you will practice during the rest of the workshop. This is the part to say slowly: your assigned Chapter 8 challenge issue in your Learning Room repository on GitHub.com.

[ALEX]
For a learner, the useful signals are concrete. Good: "I will start review comments with what the author did well before suggesting changes.". Vague: "I will be nice.". Good: "I will include the exact step where I got stuck and what I already tried.". Vague: "I will ask good questions.".

[ALEX]
Think of this as 4 checks: Read through the chapter content below, paying attention to the sections on GitHub Flow, constructive feedback, and asking for help; As you read, think about one situation from Day 1 where communication helped (or could have helped) you; Open your assigned Chapter 8 challenge issue (the one titled "Chapter 8.1: Guided Reflection (@yourname)"); and Scroll to the comment box at the bottom of the issue. If one step does not match what you hear, stop there and re-orient.

[JAMIE]
What is the ordered workflow?

[ALEX]
The path is straightforward once it is named. Step one is post a reflection comment using this format. Step two is for each prompt, write one specific, actionable sentence - not a vague goal. Step three is activate the Comment button (or press Ctrl+Enter). That is the rhythm: orient, act, verify, continue.

[JAMIE]
What makes this practice feel low-stakes but still real?

[ALEX]
The reason this matters is simple: the reflection comment itself is your evidence. The listener should be able to check this: The facilitator reviews your comment for specificity.

[ALEX]
The useful habit is simple: orient, act, verify, then continue. That pause between action and trust is part of the work.

[ALEX]
That matters because of the next idea. Expected Outcomes has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
On the ground, that means a few things. Student can name specific, actionable respectful collaboration behaviors. Student can prepare a constructive feedback style before review work in later chapters. Student feels safer asking for help in public threads.

[PAUSE]

[JAMIE]
How would you walk the room through that step by step?

[ALEX]
If You Get Stuck has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Start here: Use one simple sentence per prompt - do not overthink it. Then: Focus on one real behavior you can start doing today, not an abstract principle. Next: If writing feels hard, draft bullet points first in a text editor, then paste into the comment. Last: Look at the "Giving Feedback" and "Asking for Help" sections in this chapter for concrete examples. The sequence works because every action has a confirmation.

[JAMIE]
Give me the sequence, because order matters here.

[ALEX]
Walk it in order: Ask facilitator for one example response and adapt it to your own words; and Finished but not sure you did it right? Compare your work against the Challenge 8 reference solution. Keep it that plain: know where you are, make the move, check the result.

[ALEX]
This is where the talk moves from concept to action. Put Learning Moment into plain language. Technical quality and communication quality work together. The useful version is: Respectful, clear communication helps good code get merged faster.

[JAMIE]
Now it sounds like a workflow instead of a wall of instructions.

[ALEX]
That is where confidence comes from: not from never getting lost, but from knowing how to recover.

[JAMIE]
Let's pause on Learning Pattern Used in This Chapter. What should a learner take away from it?

[ALEX]
Learning Pattern Used in This Chapter has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Think of this as 4 checks: Read and absorb community norms (not just rules, but reasons); Reflect on personal experience (what worked, what was hard); Commit to specific behaviors in writing (public accountability); and Apply those behaviors in upcoming chapters (reviews, comments, PRs). Pause after each step and listen for the confirmation before moving on.

[PAUSE]

[ALEX]
Before the learner moves on. This part earns its place because before diving into communication norms, it helps to understand the workflow that gives all of those conversations their context. This is where the workflow starts to feel magical, because the result becomes visible and explainable: GitHub Flow is the lightweight branching model recommended for open source contribution. That is the difference between following directions and owning the workflow.

[JAMIE]
What would you say to someone who is already bracing for this to be too much?

[ALEX]
Why This Model Works has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
If someone is taking notes, this is the short list. main is always deployable. Nothing goes into main directly - every change goes through a PR and review. This protects the project and all its users. Branches are cheap and disposable. Create a branch per task. Delete it after merging. There is no overhead to starting fresh. PRs are the unit of conversation. Everything about a change - the why, the tradeoffs, the review, the approval - lives in one place. Small changes move faster. A 5-file PR gets reviewed in an hour. A 50-file PR sits for days. The most effective contributors keep PRs small and focused.

[ALEX]
Now slow down for the part people usually miss. Here is the learner-facing version. You may encounter "Git Flow" (sometimes written "GitFlow") in older projects or enterprise environments. The next useful detail is concrete: This section explains what Git Flow is, how it differs from GitHub Flow, and why this workshop teaches GitHub Flow.

[ALEX]
A solid Git habit is to know which branch you are on, what changed, and what confirmation you expect before you run the next command.

[PAUSE]

[JAMIE]
If I am listening before the workshop starts, what should settle in my mind first?

[ALEX]
This is the move inside What Git Flow Is: Git Flow is a branching model published by Vincent Driessen in 2010. Put another way, it was designed for teams that ship versioned releases on a schedule (desktop software, mobile apps, embedded systems).

[JAMIE]
That is the kind of detail that keeps a screen reader user oriented.

[ALEX]
Yes. The named thing - the heading, tab, field, branch, or button - is the handhold.

[JAMIE]
Let's pause on How the Git Flow Cycle Works. What should a learner take away from it?

[ALEX]
How the Git Flow Cycle Works has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Think of this as 4 checks: Developers branch feature/my-feature off develop and work there; Completed features merge back into develop via pull request; When develop has enough features for a release, a release/1.2.0 branch is created; and The release branch gets final testing, bug fixes, and version number updates. That small check between steps is what makes the workflow reliable.

[JAMIE]
Before we leave How the Git Flow Cycle Works, what is the practical point?

[ALEX]
The path is straightforward once it is named. Step one is the release branch merges into main (tagged with the version) and back into develop. Step two is if a critical bug is found in production, a hotfix/ branch is created from main, fixed, and merged into both main and develop. The sequence works because every action has a confirmation.

[JAMIE]
What is the one idea that makes the next few steps less mysterious?

[ALEX]
The reason this matters is simple: the following table compares GitHub Flow and Git Flow across key dimensions.

[ALEX]
A solid pull request habit is to separate three questions: what changed, why it changed, and what still needs review. That keeps the conversation useful instead of noisy.

[PAUSE]

[ALEX]
The next point gives the learner a handle. When You Might See Git Flow has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
This is where the lesson becomes something you can check. Enterprise products with quarterly or annual release cycles. Mobile apps that go through app store review before release. Embedded systems or firmware where "deploying" means shipping hardware. Legacy projects that adopted it before continuous deployment became common.

[JAMIE]
What belongs in the live room, and what can wait until after?

[ALEX]
If the interface shifts, Why This Workshop Uses GitHub Flow is still useful because for open source contribution - especially at a hackathon or when contributing to web-based projects - GitHub Flow is what you want. That is not trivia. It is what GitHub itself uses and what most modern open source projects follow.

[ALEX]
Hold that next to this. Put The Unwritten Rule: One Thing Per Branch into plain language. A branch and its PR should do one thing. For someone navigating by keyboard or screen reader, this detail matters: If you are fixing a broken link and you notice a typo nearby, fix the typo in a separate branch and PR. The interface gets easier when it becomes a set of named places instead of a wall of controls.

[JAMIE]
So the learner is not behind if they stop there and check the page.

[ALEX]
Yes. Pausing to verify is not a detour; it is how you keep control of the workflow.

[PAUSE]

[JAMIE]
Where do you want a learner to place their attention here?

[ALEX]
Learning Cards: GitHub Flow has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
That shows up in the workshop in a few specific ways. The six steps (branch, commit, PR, review, checks, merge) map to six distinct pages on GitHub; you can verify your stage by pressing 1 to hear the page title on each. When you open a PR, press D to the "Pull request navigation tabs" landmark; the Conversation tab confirms your PR is open and shows the linked issue. After merge, press G I to jump to the Issues tab and verify the linked issue closed automatically (it now shows a purple "Closed" badge). Each PR in the Pull

[...middle omitted for length...]

your branch to the original repository's default branch. Last: Respond to review feedback - maintainers may ask for changes; this is normal and not a rejection. That small check between steps is what makes the workflow reliable.

[ALEX]
Keep the teaching thread moving. Here is the learner-facing version. Example: Fixed a broken link on line 34 of setup-guide.md. That matters in practice: The link pointed to /docs/old-setup which no longer exists. A good GitHub workflow is like a well-run meeting: everyone knows the topic, the next action, and who has the floor.

[ALEX]
Here is the part to remember. What did you change? Why was the change needed? How did you verify it works?

[PAUSE]

[JAMIE]
How should someone ask for help in a way that gets them unstuck faster?

[ALEX]
This is the move inside 7. Getting Help: it is always acceptable to ask a question on an issue or pull request. This is the part to say slowly: If you opened a PR and are waiting for a review, it is appropriate to leave one polite follow-up comment after a week or two.

[ALEX]
Here is the part to remember. Are specific: "I'm trying to fix the broken link on line 24 of setup-guide.md. The link currently points to /docs/old-setup. Where should it point?". Show what you tried: "I searched the repository for the correct URL but couldn't find a file at that path.". Are polite: Assume good intent from maintainers, even if they are slow to respond. Maintainers are often volunteers with day jobs.

[ALEX]
Keep the teaching thread moving. Anchor this part on 8. After Your Contribution Is Merged. This matters for your GitHub profile. The listener should be able to check this: Each merged contribution demonstrates real-world collaboration with a project team: you scoped a problem, communicated with maintainers, addressed feedback, and saw the work through.

[ALEX]
Here is the part to remember. Your name appears in the project's commit history permanently - it cannot be removed. The issue you fixed is closed. You are officially listed as a contributor to this project, visible on the repository's Contributors page.

[JAMIE]
Let's pause on 9. Building a Contribution Habit. What should a learner take away from it?

[ALEX]
The reason this matters is simple: the hardest part of open source contribution is starting. That is not trivia. Once you have one merged PR, the next is easier - you know the workflow, you have proof it is possible, and you have already navigated the social dynamics of working with a maintainer.

[PAUSE]

[ALEX]
Keep the teaching thread moving. Do not treat Practical habits as decoration. Challenge Time: Complete Challenge 8: The Culture Layer in the Challenge Hub, then advance to Chapter 09: Labels, Milestones and Projects. For someone navigating by keyboard or screen reader, this detail matters: Next: Chapter 09: Labels, Milestones, and Projects Back: Chapter 07: Merge Conflicts Related appendices: Appendix M: Accessibility Standards Appendix F: Git Security Appendix O: Branch Protection. The workshop is closer to rehearsal than lecture. You hear the move, try the move, and then check what changed.

[ALEX]
Here is the part to remember. Keep a list of projects you use and like. These are natural candidates for contributions because you already understand what they do. File bug reports when you encounter problems, even if you cannot fix them yourself. A clear, reproducible bug report is a real contribution. Review other PRs. Even as a new contributor, you can leave useful feedback: "Does this change affect screen reader users?" or "The example in the PR description is missing a step.". Set a low bar. A contribution does not need to be impressive. A fixed typo merged into a project used by thousands of people is more valuable than a perfect contribution never submitted.

[JAMIE]
Let's pause on Section-Level Source Map. What should a learner take away from it?

[ALEX]
If the interface shifts, Section-Level Source Map is still useful because use this map to verify facts for each major section in this file.

[ALEX]
Here is the part to remember. How to Be an Effective and Respectful Open Source Contributor: GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests. Workshop Recommendation (Chapter 8): GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests. GitHub Flow - The Standard Contribution Workflow: GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests. Keeping Your Fork Up to Date: GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests. When to sync: GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests. Writing Good Commit Messages: GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests.

[PAUSE]

[JAMIE]
What should people carry with them after this?

[ALEX]
Carry the map. Know what page or tool you are in, know which action you are taking, and know what confirmation should follow. If the confirmation is missing, pause. That pause is not wasted time; it is professional judgment, and it is how complex workflows start to feel magical instead of stressful.

[JAMIE]
That is a better way to say it than just follow the steps.

[ALEX]
Right. Steps matter, but understanding wins. That is episode 8. Next in the series is episode 9, where we keep building the same contributor muscles.
<<<END_TRANSCRIPT>>>
