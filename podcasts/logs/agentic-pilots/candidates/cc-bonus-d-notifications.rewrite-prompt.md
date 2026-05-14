You are rewriting a podcast transcript for variety and teachability.
Use automatic model selection (no model is specified by caller).
Return ONLY the transcript text with valid speaker markers.

Hard format requirements:
- Allowed markers only: [ALEX], [JAMIE], [PAUSE]
- Marker line must be on its own line
- Keep script structure conversational and teachable
- Keep concept coverage aligned to source materials

Slug: cc-bonus-d-notifications
Title: Challenge bonus-d: Notifications
Description: Notification hygiene, mentions, subscriptions, and avoiding overload.

Concept checklist to preserve:
- Notification hygiene, mentions, subscriptions, and avoiding overload.
- Challenge title: Notifications

Source heading checklist to preserve (topic coverage, can paraphrase):
- ## Before: Default settings
- ## After: Configured settings
- ### Notification settings (github.com/settings/notifications)
- ### Repository watching
- ### Custom routing (if you use multiple emails)
- ## Key decisions explained
- ## What matters
- ## Authoritative Sources
- ### Section-Level Source Map
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
Welcome to Challenge Coach: Notifications. I am Alex. Before you do the task, we are going to make the skill feel concrete enough to practice and memorable enough to reuse.

[JAMIE]
And I am Jamie. I will keep asking what the learner should do, what evidence counts, and how to recover if the page does something unexpected.

[PAUSE]

[ALEX]
The skill focus is Notification hygiene, mentions, subscriptions, and avoiding overload. This is rehearsal for real contribution, so the evidence matters because it proves the move happened.

[JAMIE]
So the challenge has to leave the learner with both confidence and a trail of evidence.

[ALEX]
Exactly. Evidence is not busywork. It is how a learner, a facilitator, and a future maintainer can understand what changed and why.

[PAUSE]

[JAMIE]
Okay, set the room for us. What are we walking into?

[ALEX]
Bonus D: Notification Mastery: For students who: Want to practice inbox management and notification configuration. The next useful detail is concrete: What you will do: Configure your GitHub notification settings for a productive workflow, then demonstrate your setup.

[ALEX]
A solid project habit is to treat metadata as decision support. Labels, status, assignees, and notifications tell you what kind of attention the work needs.

[ALEX]
The next layer is this. Here is the learner-facing version. Go to github.com/settings/notifications and configure. A good GitHub workflow is like a well-run meeting: everyone knows the topic, the next action, and who has the floor.

[ALEX]
Here are the anchors worth keeping. [ ] Email notifications: Choose which events trigger emails. [ ] Web notifications: Configure the notification inbox on GitHub.com. [ ] Watching: Review which repositories you are watching and adjust. [ ] Custom routing: If you have multiple email addresses, set up routing rules. [ ] GitHub Mobile: If you use the mobile app, configure push notification preferences.

[JAMIE]
What does the learner do first, second, and then after that?

[ALEX]
This is the move inside Demonstrate your setup: after configuring, answer these questions. That matters in practice: I am watching repositories because.

[ALEX]
Walk it in order: How will you know when someone requests your review?; How will you avoid being overwhelmed by notifications from busy repositories?; and What is your strategy for the GitHub notification inbox (read all, triage, filter)? Each step should leave a trace you can name.

[JAMIE]
That feels much more doable when you say it as one move.

[ALEX]
Right. The magic is not speed. The magic is knowing what changed and why it matters.

[PAUSE]

[ALEX]
Now bring the learner back to the room. Anchor this part on Before: Default settings. With default settings, GitHub sends email notifications. This is the part to say slowly: Most people start ignoring all GitHub emails.

[ALEX]
For a learner, the useful signals are concrete. Every issue and PR in every repository you watch. Every comment on any thread you have participated in. Every CI status update.

[JAMIE]
What would you say to someone who is already bracing for this to be too much?

[ALEX]
Notification settings (github.com/settings/notifications) has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
The parts worth keeping in working memory are these. Participating: Email ON, Web ON -- you want to know when someone replies to your conversations. Watching: Email OFF, Web ON -- browse these when you have time, not in your inbox. GitHub Actions: Email OFF for successful runs, Email ON for failed runs only.

[ALEX]
That matters because of the next idea. Repository watching has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
On the ground, that means a few things. Repositories you actively contribute to: Watch (all activity). Repositories you read occasionally: Custom (issues and PRs only). Repositories you finished with: Unwatch.

[ALEX]
The useful habit is simple: orient, act, verify, then continue. That pause between action and trust is part of the work.

[PAUSE]

[JAMIE]
If I am listening before the workshop starts, what should settle in my mind first?

[ALEX]
Custom routing (if you use multiple emails) has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Here is what that changes in practice. Route Community-Access organization notifications to your workshop email. Route personal project notifications to your personal email.

[ALEX]
This is where the talk moves from concept to action. Key decisions explained has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
The room should hear these as checkpoints. Why email off for watching: You can check the notification bell on github.com when you choose. Email notifications for watched repos create constant interruption for low-priority updates. Why Actions failures only: A green checkmark in the PR is enough. You only need an email when something breaks. Why unwatch finished repos: Your notification feed stays relevant to current work.

[JAMIE]
Now it sounds like a workflow instead of a wall of instructions.

[ALEX]
That is where confidence comes from: not from never getting lost, but from knowing how to recover.

[JAMIE]
What is the one idea that makes the next few steps less mysterious?

[ALEX]
The teaching point here is not the label; it is the move. The learning objective is intentional notification management. That is the difference between guessing and knowing: If you changed at least one setting from the default and can explain why that change reduces noise while keeping you informed about what matters, you completed this bonus.

[PAUSE]

[ALEX]
Before the learner moves on. This part earns its place because use this map to verify facts for each major section in this file. That is the difference between following directions and owning the workflow.

[ALEX]
That becomes easier when you listen for these cues. Before: Default settings: GitHub Docs, home, GitHub Changelog. After: Configured settings: GitHub Docs, home, GitHub Changelog. Key decisions explained: GitHub Docs, home, GitHub Changelog. What matters: GitHub Docs, home, GitHub Changelog.

[JAMIE]
Give me the version that sounds like an instructor, not a manual.

[ALEX]
Managing Your GitHub Notification Inbox: See also: Appendix V: GitHub Mobile for managing notifications on your phone. That gives the learner a foothold: GitHub notifications are how GitHub tells you when something needs your attention.

[ALEX]
Now slow down for the part people usually miss. Here is the learner-facing version. For this workshop, Chapter 10 is a guided practice chapter, not a graded automation chapter.

[ALEX]
Here is the part that makes the next action easier. There are 1 guided walkthrough. Automation check: none - notification settings are account-level and cannot be validated by the Learning Room PR bot. The evidence is structured completion comment on your assigned challenge issue. The pattern is configure, filter, act.

[PAUSE]

[JAMIE]
Turn that into a path someone can follow.

[ALEX]
Chapter 10 Challenge Set has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Walk it in order: Configure notifications and practice inbox management - set your watch level, use filters to find relevant notifications, and perform one inbox action. That is the rhythm: orient, act, verify, continue.

[JAMIE]
That is the kind of detail that keeps a screen reader user oriented.

[ALEX]
Yes. The named thing - the heading, tab, field, branch, or button - is the handhold.

[JAMIE]
What is the ordered workflow?

[ALEX]
Anchor this part on Challenge 10.1 Step-by-Step: Notification Inbox Walkthrough. Set up a useful notification workflow so you can keep up with reviews, mentions, and assignments without inbox overload. That matters in practice: the GitHub.com notifications page and your Learning Room repository settings. The durable skill is not memorizing one screen. It is knowing how to find your footing when the screen changes.

[ALEX]
Listen for the small confirmations in this list. Press M to mute the thread (you will not receive future updates),. Press E to mark done (removes it from inbox but you can still get future updates).

[ALEX]
Think of this as 4 checks: Open your Learning Room repository on GitHub.com; Find the Watch button near the top-right of the repository page (next to Star and Fork); Activate the Watch dropdown and select Participating and @mentions. This means you only get notified when someone @mentions you or you are directly participating in a thread; and Open the notifications inbox by navigating to https://github.com/notifications (or activate the bell icon in the GitHub header). That small check between steps is what makes the workflow reliable.

[JAMIE]
Give me the sequence, because order matters here.

[ALEX]
The path is straightforward once it is named. Step one is in the notification filters, activate the Review requested filter. This shows only notifications where someone has asked you to review their PR. Step two is clear that filter and activate the Assigned filter. This shows notifications for issues and PRs assigned to you. Step three is open one notification by activating its title link. Read it briefly, then navigate back to the inbox. Step four is perform one inbox action on a non-critical notification thread. The sequence works because every action has a confirmation.

[JAMIE]
What should the learner prove to themselves after each small task?

[ALEX]
The reason this matters is simple: open your assigned Chapter 10 challenge issue and post a completion comment. This is the part to say slowly: Close your Chapter 10 challenge issue when done.

[PAUSE]

[ALEX]
The next point gives the learner a handle. Expected Outcomes has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
This is where the lesson becomes something you can check. Student can configure repository watch levels to reduce noise. Student can find review requests and assigned work quickly using filters. Student can reduce notification noise with mute or done actions.

[JAMIE]
How would you walk the room through that step by step?

[ALEX]
If You Get Stuck has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Start here: Can't find the Watch button? It is near the top-right of the repository page, in the same row as Star and Fork. Then: Notification inbox is empty? You may not have any notifications yet - that is fine. Switch to the Done tab and practice the mute/done action flow on an older notification. Next: Keyboard shortcuts not working? If your screen reader intercepts M or E, click on the notification row first to give it focus, then press the shortcut. Last: Filters not showing results? Clear all filters first (click the X next to each active filter), then apply one filter at a time. Pause after each step and listen for the confirmation before moving on.

[JAMIE]
Let's pause on If You Get Stuck. What should a learner take away from it?

[ALEX]
Walk it in order: Ask facilitator to model one inbox action live, then repeat the steps yourself; and Finished but not sure you did it right? Compare your work against the Challenge 9 reference solution. The point is not speed; the point is never losing your place.

[ALEX]
Hold that next to this. Put Learning Moment into plain language. Notification management protects focus. For someone navigating by keyboard or screen reader, this detail matters: You can stay responsive to your team without drowning in updates. The interface gets easier when it becomes a set of named places instead of a wall of controls.

[JAMIE]
So the learner is not behind if they stop there and check the page.

[ALEX]
Yes. Pausing to verify is not a detour; it is how you keep control of the workflow.

[PAUSE]

[JAMIE]
Let's pause on Learning Pattern Used in This Chapter. What should a learner take away from it?

[ALEX]
Learning Pattern Used in This Chapter has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Think of this as 4 checks: Configure settings proactively (watch level) before work generates noise; Use filters to find signal in noise (review requests, assignments); Take decisive action on each notification (mute, done, or respond); and Build a daily routine that keeps your inbox manageable. Each step should leave a trace you can

[...middle omitted for length...]

l useful because before you close your laptop, take two minutes to answer these questions in your Chapter 10 challenge issue. That matters in practice: There are no wrong answers -- this is for you.

[ALEX]
Start here: Which chapter felt the most natural to you? Which one do you want to revisit? Then: Can you explain what a pull request does to someone who has never used GitHub? Next: If you saw a merge conflict right now, would you know where to start? Last: What is one thing you want to try on GitHub this week that you did not get to today? The sequence works because every action has a confirmation.

[ALEX]
Keep the teaching thread moving. Put Your Challenge Progress into plain language. Look at how many challenge issues you completed today. This is the part to say slowly: Each one represents a skill you did not just read about -- you practiced it, posted evidence, and moved on.

[PAUSE]

[JAMIE]
Let's pause on Learning Cards: What You Accomplished Today. What should a learner take away from it?

[ALEX]
Learning Cards: What You Accomplished Today has three jobs: name the idea, give the learner a move, and show what counts as evidence.

[ALEX]
Here is the part to remember. You navigated GitHub entirely by keyboard: headings (H), landmarks (D), buttons (B), links (K), and form fields (F or E) became your primary navigation tools. You created issues, opened PRs, resolved conflicts, and managed notifications -- all skills that transfer to any repository on GitHub. Revisit any chapter by pressing Ctrl+L in your browser and typing the URL, or by navigating to the docs folder in the Learning Room repository. Everything you did today at your current zoom level and contrast settings will work the same way tomorrow; GitHub's layout adapts consistently to browser zoom up to 400%. If you found certain pages hard to read, revisit Settings, Accessibility on GitHub to try a different theme or motion preference before Day 2. Your profile page at github.com/your-username now shows contribution activity from today; zoom in on the contribution graph to see your green squares.

[ALEX]
Keep the teaching thread moving. This part earns its place because see also: Chapter 11: VS Code Interface is where Day 2 begins -- have VS Code installed and ready. That is not trivia. On Day 1, you worked entirely on GitHub.com. That is the difference between following directions and owning the workflow.

[JAMIE]
Let's pause on Between Days. What should a learner take away from it?

[ALEX]
Between Days: If your workshop has a gap between Day 1 and Day 2, here are three optional things you can do to stay sharp. For someone navigating by keyboard or screen reader, this detail matters: GitHub Skills courses use bot-driven feedback inside pull requests.

[ALEX]
First, explore your notification settings. Now that you understand how notifications work, visit github.com/settings/notifications and customize your email and web preferences. There is no wrong configuration -- just find what feels manageable. Then, read issues in a project you care about. Pick any open source project on GitHub and browse its issue tracker. You now know enough to understand labels, milestones, and comment threads. Notice how maintainers communicate -- you will recognize the patterns from. After that, try a GitHub Skills course. GitHub Skills offers free, self-paced courses that run inside real repositories. "Introduction to GitHub" is a good one if you want to reinforce what you learned today. See Appendix Z for the full list of recommended courses. Each step should leave a trace you can name.

[PAUSE]

[ALEX]
Keep the teaching thread moving. Here is the learner-facing version. Think about where you started this morning. The useful version is: You may not have known what a repository was, or how to navigate one with a keyboard, or what happens when two people edit the same file.

[JAMIE]
Let's pause on Section-Level Source Map. What should a learner take away from it?

[ALEX]
This is the move inside Section-Level Source Map: use this map to verify facts for each major section in this file.

[ALEX]
Here is the part to remember. Managing Your GitHub Notification Inbox: GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests. Workshop Recommendation (Chapter 10): GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests. What Generates a Notification?: GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests. Notification Subscription Levels: GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests. The Notifications Inbox: GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests. Inbox Actions - Keyboard Shortcuts: GitHub Docs, home, GitHub Changelog, About Git, GitHub flow, About pull requests.

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
