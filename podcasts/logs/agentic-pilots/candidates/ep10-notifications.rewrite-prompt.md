You are rewriting a podcast transcript for variety and teachability.
Use automatic model selection (no model is specified by caller).
Return ONLY the transcript text with valid speaker markers.

Hard format requirements:
- Allowed markers only: [ALEX], [JAMIE], [PAUSE]
- Marker line must be on its own line
- Keep script structure conversational and teachable
- Keep concept coverage aligned to source materials

Slug: ep10-notifications
Title: Episode 10: Notifications and Mentions
Description: Managing your notification inbox, @mentions, and strategies for avoiding overload.

Concept checklist to preserve:
- How GitHub generates notifications: participating versus watching
- The notification inbox on github.com
- Notification types: mention, review request, assignment, CI status
- Marking notifications as read, done, or saved
- Unsubscribing from a noisy thread
- Watch settings: watching, not watching, ignoring, custom
- Using @mentions to get someone's attention in a comment
- Team mentions: @org/team-name
- Email notifications versus web notifications
- Configuring notification preferences in Settings
- Strategies for managing notification volume without missing important items
- Using gh CLI for notification-like workflows

Source heading checklist to preserve (topic coverage, can paraphrase):
- ## Managing Your GitHub Notification Inbox
- ## Workshop Recommendation (Chapter 10)
- ### Chapter 10 Challenge Set
- ### Challenge 10.1 Step-by-Step: Notification Inbox Walkthrough
- ### Completing Chapter 10: Submit Your Evidence
- ### Expected Outcomes
- ### If You Get Stuck
- ### Learning Moment
- ### Learning Pattern Used in This Chapter
- ## What Generates a Notification?
- ## Notification Subscription Levels
- ### Changing your watch settings for a repo
- ## The Notifications Inbox
- ### Tool Cards: Manage Notifications
- ### Page structure
- ### Navigating the notification list
- ### What is announced per notification
- ### Learning Cards: The Notifications Inbox
- ## Inbox Actions - Keyboard Shortcuts
- ## Filtering the Inbox
- ### Filtering by repository or organization
- ## Managing Notifications at Scale
- ### The "mark all as done" workflow
- ### Muting a noisy thread
- ### Dealing with @mentions you didn't expect
- ### Learning Cards: Managing Notifications at Scale
- ## Notification Settings - Per Your Account
- ## Starring vs. Watching - What Is the Difference?
- ### Starring a Repository
- ### Watching a Repository
- ### Common Mistake: Accidental Watching
- #### How to silence a repository you accidentally over-subscribed to
- ### Recommended Watching Strategy for This Workshop
- ### Learning Cards: Starring vs. Watching
- ## Screen Reader Tips for the Notification Inbox
- ### NVDA
- ### JAWS
- ### VoiceOver
- ## The GitHub Mobile App - A Reference Note
- ## Try It: Tame Your Inbox
- ## What You Accomplished Today
- ### If This Was Your First Time
- ### Confidence Check
- ### Your Challenge Progress
- ### Learning Cards: What You Accomplished Today
- ## What Day 2 Adds
- ### Between Days
- ### You Already Know More Than You Think
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
This is Git Going with GitHub, episode 10: Notifications and Mentions. I am Alex. By the end of this episode, Notifications and Mentions should feel less like a wall of GitHub words and more like a set of moves with visible momentum.

[JAMIE]
And I am Jamie. I am here for the practical questions: what should I listen for, what can go wrong, and what is the next calm move?

[PAUSE]

[ALEX]
Today we are working on this: Managing your notification inbox, @mentions, and strategies for avoiding overload. I want the learner to leave with a mental map, not just a remembered path through buttons.

[JAMIE]
So the goal is understanding first, then action, then confirmation.

[ALEX]
Right. We are building a rhythm: orient yourself, take one intentional action, then verify what changed before moving on. That rhythm is where the magic lives.

[PAUSE]

[JAMIE]
Okay, set the room for us. What are we walking into?

[ALEX]
Managing Your GitHub Notification Inbox: See also: Appendix V: GitHub Mobile for managing notifications on your phone. The next useful detail is concrete: GitHub notifications are how GitHub tells you when something needs your attention.

[ALEX]
A solid project habit is to treat metadata as decision support. Labels, status, assignees, and notifications tell you what kind of attention the work needs.

[ALEX]
The next layer is this. Here is the learner-facing version. For this workshop, Chapter 10 is a guided practice chapter, not a graded automation chapter. A good GitHub workflow is like a well-run meeting: everyone knows the topic, the next action, and who has the floor.

[ALEX]
Here are the anchors worth keeping. There are 1 guided walkthrough. Automation check: none - notification settings are account-level and cannot be validated by the Learning Room PR bot. The evidence is structured completion comment on your assigned challenge issue. The pattern is configure, filter, act.

[JAMIE]
What does the learner do first, second, and then after that?

[ALEX]
Chapter 10 Challenge Set has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Walk it in order: Configure notifications and practice inbox management - set your watch level, use filters to find relevant notifications, and perform one inbox action. Each step should leave a trace you can name.

[JAMIE]
That feels much more doable when you say it as one move.

[ALEX]
Right. The magic is not speed. The magic is knowing what changed and why it matters.

[PAUSE]

[JAMIE]
Turn that into a path someone can follow.

[ALEX]
Anchor this part on Challenge 10.1 Step-by-Step: Notification Inbox Walkthrough. Set up a useful notification workflow so you can keep up with reviews, mentions, and assignments without inbox overload. This is the part to say slowly: the GitHub.com notifications page and your Learning Room repository settings.

[ALEX]
For a learner, the useful signals are concrete. Press M to mute the thread (you will not receive future updates),. Press E to mark done (removes it from inbox but you can still get future updates).

[ALEX]
Think of this as 4 checks: Open your Learning Room repository on GitHub.com; Find the Watch button near the top-right of the repository page (next to Star and Fork); Activate the Watch dropdown and select Participating and @mentions. This means you only get notified when someone @mentions you or you are directly participating in a thread; and Open the notifications inbox by navigating to https://github.com/notifications (or activate the bell icon in the GitHub header). If one step does not match what you hear, stop there and re-orient.

[JAMIE]
What is the ordered workflow?

[ALEX]
The path is straightforward once it is named. Step one is in the notification filters, activate the Review requested filter. This shows only notifications where someone has asked you to review their PR. Step two is clear that filter and activate the Assigned filter. This shows notifications for issues and PRs assigned to you. Step three is open one notification by activating its title link. Read it briefly, then navigate back to the inbox. Step four is perform one inbox action on a non-critical notification thread. That is the rhythm: orient, act, verify, continue.

[JAMIE]
What makes this practice feel low-stakes but still real?

[ALEX]
The reason this matters is simple: open your assigned Chapter 10 challenge issue and post a completion comment. The listener should be able to check this: Close your Chapter 10 challenge issue when done.

[ALEX]
The useful habit is simple: orient, act, verify, then continue. That pause between action and trust is part of the work.

[ALEX]
That matters because of the next idea. Expected Outcomes has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
On the ground, that means a few things. Student can configure repository watch levels to reduce noise. Student can find review requests and assigned work quickly using filters. Student can reduce notification noise with mute or done actions.

[PAUSE]

[JAMIE]
How would you walk the room through that step by step?

[ALEX]
If You Get Stuck has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Start here: Can't find the Watch button? It is near the top-right of the repository page, in the same row as Star and Fork. Then: Notification inbox is empty? You may not have any notifications yet - that is fine. Switch to the Done tab and practice the mute/done action flow on an older notification. Next: Keyboard shortcuts not working? If your screen reader intercepts M or E, click on the notification row first to give it focus, then press the shortcut. Last: Filters not showing results? Clear all filters first (click the X next to each active filter), then apply one filter at a time. The sequence works because every action has a confirmation.

[JAMIE]
Give me the sequence, because order matters here.

[ALEX]
Walk it in order: Ask facilitator to model one inbox action live, then repeat the steps yourself; and Finished but not sure you did it right? Compare your work against the Challenge 9 reference solution. Keep it that plain: know where you are, make the move, check the result.

[ALEX]
This is where the talk moves from concept to action. Put Learning Moment into plain language. Notification management protects focus. The useful version is: You can stay responsive to your team without drowning in updates.

[JAMIE]
Now it sounds like a workflow instead of a wall of instructions.

[ALEX]
That is where confidence comes from: not from never getting lost, but from knowing how to recover.

[JAMIE]
Let's pause on Learning Pattern Used in This Chapter. What should a learner take away from it?

[ALEX]
Learning Pattern Used in This Chapter has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Think of this as 4 checks: Configure settings proactively (watch level) before work generates noise; Use filters to find signal in noise (review requests, assignments); Take decisive action on each notification (mute, done, or respond); and Build a daily routine that keeps your inbox manageable. Pause after each step and listen for the confirmation before moving on.

[PAUSE]

[ALEX]
Before the learner moves on. This part earns its place because GitHub sends you a notification when. That is the difference between following directions and owning the workflow.

[JAMIE]
What would you say to someone who is already bracing for this to be too much?

[ALEX]
Notification Subscription Levels: For each repository, you choose how many notifications to receive.

[JAMIE]
Let's pause on Changing your watch settings for a repo. What should a learner take away from it?

[ALEX]
Here is the learner-facing version. At the top of any repository page, find the Watch button (near Star and Fork). The next useful detail is concrete: Click it to open a dropdown with levels: Participating and @mentions, All Activity, Custom, and Ignore.

[ALEX]
Start here: Find the Watch button in the repo header (B to navigate buttons → find "Watch [N]" or "Unwatch" button). Then: Press Enter to open the dropdown. Next: Press ↑/↓ to navigate the subscription options. Last: Press Enter to select your preferred level. If one step does not match what you hear, stop there and re-orient.

[JAMIE]
Before we leave Changing your watch settings for a repo, what is the practical point?

[ALEX]
Walk it in order: The button label updates to confirm your choice; Quick Nav B to find the Watch button in the repo header (listen for "Watch" or "Unwatch"); VO+Space to open the dropdown; and VO+Down or arrow keys to navigate subscription options. That is the rhythm: orient, act, verify, continue.

[PAUSE]

[JAMIE]
Let's pause on Tool Cards: Manage Notifications. What should a learner take away from it?

[ALEX]
This is the move inside Tool Cards: Manage Notifications: VS Code Desktop (GitHub Pull Requests extension). Put another way, GitHub Desktop: GitHub Desktop does not manage notifications.

[ALEX]
Walk it in order: Go to github.com/notifications (or press G then N); Use E to mark done, I to mark read/unread, Shift+M to mute a thread; The Notifications view in the GitHub sidebar shows items needing attention; and Click a notification to open the related issue or PR directly in VS Code. That is the rhythm: orient, act, verify, continue.

[ALEX]
Treat examples as spoken recipes, not decorations. You may hear something like List PRs requesting your review (most common notification); gh search prs --review-requested @me --state open; Open the notifications page in your browser; gh browse notifications. Check your notification status (opens the GitHub notification inbox); gh api notifications --jq '.[].subject.title' head -20; View PRs that need your review (most common notification reason); gh search prs --review-requested @me --state open; View issues. Read the command, understand what it changes, then run it only when the repository state matches the lesson.

[JAMIE]
That is the kind of detail that keeps a screen reader user oriented.

[ALEX]
Yes. The named thing - the heading, tab, field, branch, or button - is the handhold.

[JAMIE]
Let's pause on Navigating the notification list. What should a learner take away from it?

[ALEX]
Anchor this part on Navigating the notification list. The inbox shows notifications grouped by date (Today, Yesterday, This week, Older). That matters in practice: Each row shows the repository, the issue or PR title, the event type, and the time. The durable skill is not memorizing one screen. It is knowing how to find your footing when the screen changes.

[ALEX]
Think of this as 4 checks: D → main content landmark; H to navigate group headings (Today / Yesterday / This week / Older); Tab through individual notifications - each row announces: repo name, issue/PR title, event type, time; and Enter to open the notification (goes to the issue/PR page). That small check between steps is what makes the workflow reliable.

[JAMIE]
Before we leave Navigating the notification list, what is the practical point?

[ALEX]
The path is straightforward once it is named. Step one is vO+U → Main → navigate to notification list. Step two is vO+Down to move through notifications. Step three is vO+Space to open a notification. The sequence works because every action has a confirmation.

[JAMIE]
What is the one idea that makes the next few steps less mysterious?

[ALEX]
The reason this matters is simple: "microsoft/vscode - Add keyboard shortcut for accessible view - @username mentioned you - 2 hours ago". This is the part to say slowly: Components: repo/org thread title event type timestamp.

[PAUSE]

[ALEX]
The next point gives the learner a handle. Learning Cards: The Notifications Inbox has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
This is where the lesson becomes something you can check. Press G N (two sequential keys, not simultaneous) from any GitHub page to jump directly to your notifications inbox. Press H to navigate date-group headings (Today, Yesterday, This Week, Older), then Tab through individual notification rows within each group. Each notification row announces: repository name, issue/PR title, event type (mentioned, review requested, assigned), and relative timestamp. The inbox has a three-panel layout: filters on the left, notification list in the center, and an optional detail preview on the right; at high zoom the detail pane may collapse. Unread notifica

[...middle omitted for length...]

ng you want to try on GitHub this week that you did not get to today? That is the rhythm: orient, act, verify, continue.

[ALEX]
Now bring the learner back to the room. Put Your Challenge Progress into plain language. Look at how many challenge issues you completed today. The listener should be able to check this: Each one represents a skill you did not just read about -- you practiced it, posted evidence, and moved on. The interface gets easier when it becomes a set of named places instead of a wall of controls.

[JAMIE]
So this is less about memorizing and more about noticing.

[ALEX]
Right. Once the learner can name the move, the interface becomes much less intimidating.

[JAMIE]
Let's pause on Learning Cards: What You Accomplished Today. What should a learner take away from it?

[ALEX]
Learning Cards: What You Accomplished Today has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
The room should hear these as checkpoints. You navigated GitHub entirely by keyboard: headings (H), landmarks (D), buttons (B), links (K), and form fields (F or E) became your primary navigation tools. You created issues, opened PRs, resolved conflicts, and managed notifications -- all skills that transfer to any repository on GitHub. Revisit any chapter by pressing Ctrl+L in your browser and typing the URL, or by navigating to the docs folder in the Learning Room repository. Everything you did today at your current zoom level and contrast settings will work the same way tomorrow; GitHub's layout adapts consistently to browser zoom up to 400%. If you found certain pages hard to read, revisit Settings, Accessibility on GitHub to try a different theme or motion preference before Day 2. Your profile page at github.com/your-username now shows contribution activity from today; zoom in on the contribution graph to see your green squares.

[PAUSE]

[ALEX]
Now slow down for the part people usually miss. This part earns its place because see also: Chapter 11: VS Code Interface is where Day 2 begins -- have VS Code installed and ready. For someone navigating by keyboard or screen reader, this detail matters: On Day 1, you worked entirely on GitHub.com.

[JAMIE]
Let's pause on Between Days. What should a learner take away from it?

[ALEX]
Between Days: If your workshop has a gap between Day 1 and Day 2, here are three optional things you can do to stay sharp. The useful version is: GitHub Skills courses use bot-driven feedback inside pull requests.

[ALEX]
First, explore your notification settings. Now that you understand how notifications work, visit github.com/settings/notifications and customize your email and web preferences. There is no wrong configuration -- just find what feels manageable. Then, read issues in a project you care about. Pick any open source project on GitHub and browse its issue tracker. You now know enough to understand labels, milestones, and comment threads. Notice how maintainers communicate -- you will recognize the patterns from. After that, try a GitHub Skills course. GitHub Skills offers free, self-paced courses that run inside real repositories. "Introduction to GitHub" is a good one if you want to reinforce what you learned today. See Appendix Z for the full list of recommended courses. Pause after each step and listen for the confirmation before moving on.

[ALEX]
Here is the moment where the page starts to make sense. Here is the learner-facing version. Think about where you started this morning. That is the difference between guessing and knowing: You may not have known what a repository was, or how to navigate one with a keyboard, or what happens when two people edit the same file. A good GitHub workflow is like a well-run meeting: everyone knows the topic, the next action, and who has the floor.

[PAUSE]

[JAMIE]
Let's pause on Section-Level Source Map. What should a learner take away from it?

[ALEX]
This is the move inside Section-Level Source Map: use this map to verify facts for each major section in this file.

[ALEX]
If someone is taking notes, this is the short list. Managing Your GitHub Notification Inbox: GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests. Workshop Recommendation (Chapter 10): GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests. What Generates a Notification?: GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests. Notification Subscription Levels: GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests. The Notifications Inbox: GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests. Inbox Actions - Keyboard Shortcuts: GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests.

[PAUSE]

[JAMIE]
What should people carry with them after this?

[ALEX]
Carry the map. Know what page or tool you are in, know which action you are taking, and know what confirmation should follow. If the confirmation is missing, pause. That pause is not wasted time; it is professional judgment, and it is how complex workflows start to feel magical instead of stressful.

[JAMIE]
That is a better way to say it than just follow the steps.

[ALEX]
Right. Steps matter, but understanding wins. That is episode 10. Next in the series is episode 11, where we keep building the same contributor muscles.
<<<END_TRANSCRIPT>>>
