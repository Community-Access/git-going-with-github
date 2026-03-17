# Notifications
>
> **Listen to Episode 10:** [Notifications and Mentions](../PODCASTS.md) - a conversational audio overview of this chapter. Listen before reading to preview the concepts, or after to reinforce what you learned.

> **Related appendices:** [Appendix T: Community and Social](appendix-t-community-and-social.md) | [Appendix U: Discussions and Gists](appendix-u-discussions-and-gists.md) | [Appendix V: GitHub Mobile](appendix-v-github-mobile.md)
> **Authoritative sources:** [GitHub Docs: About notifications](https://docs.github.com/en/account-and-profile/managing-subscriptions-and-notifications-on-github/setting-up-notifications/about-notifications)


## Managing Your GitHub Notification Inbox

> **See also:** [Appendix V: GitHub Mobile](appendix-v-github-mobile.md) for managing notifications on your phone.

> GitHub notifications are how GitHub tells you when something needs your attention. This guide teaches you to keep the inbox useful - not overwhelming - using only your keyboard and screen reader.


## Workshop Recommendation (Chapter 10)

For this workshop, Chapter 10 is a **guided practice chapter**, not a graded automation chapter.

- **Challenge count:** 1 guided walkthrough
- **Automation check:** none - notification settings are account-level and cannot be validated by the Learning Room PR bot
- **Evidence:** structured completion comment on your assigned challenge issue
- **Pattern:** configure, filter, act

### Chapter 10 Challenge Set

1. **Configure notifications and practice inbox management** - set your watch level, use filters to find relevant notifications, and perform one inbox action.

### Challenge 10.1 Step-by-Step: Notification Inbox Walkthrough

**Goal:** Set up a useful notification workflow so you can keep up with reviews, mentions, and assignments without inbox overload.

**Where you are working:** the GitHub.com notifications page and the [learning-room](https://github.com/Community-Access/learning-room) repository settings.

**Estimated time:** 5-8 minutes.

1. Open the [learning-room](https://github.com/Community-Access/learning-room) repository on GitHub.com.
2. Find the **Watch** button near the top-right of the repository page (next to Star and Fork).
3. Activate the **Watch** dropdown and select **Participating and @mentions**. This means you only get notified when someone @mentions you or you are directly participating in a thread.
4. Open the notifications inbox by navigating to `https://github.com/notifications` (or activate the bell icon in the GitHub header).
5. In the notification filters, activate the **Review requested** filter. This shows only notifications where someone has asked you to review their PR.
6. Clear that filter and activate the **Assigned** filter. This shows notifications for issues and PRs assigned to you.
7. Open one notification by activating its title link. Read it briefly, then navigate back to the inbox.
8. Perform one inbox action on a non-critical notification thread:
   - Press `M` to **mute** the thread (you will not receive future updates), or
   - Press `E` to **mark done** (removes it from inbox but you can still get future updates).

**Screen reader tip:** The notification list is a standard list of links. Each notification announces its title, repository, and reason (mention, review request, assignment). Use arrow keys to move between notifications and `Enter` to open one.

**You are done when:** You have changed your watch level, used two different filters, and performed one inbox action (mute or done).

### Completing Chapter 10: Submit Your Evidence

Open your **assigned Chapter 10 challenge issue** and post a completion comment:

```text
Chapter 10 completed:
- Watch level set to: Participating and @mentions
- Filters tested: Review requested, Assigned
- Inbox action performed: [mute / mark done] on [thread description]
```

Close your Chapter 10 challenge issue when done.

### Expected Outcomes

- Student can configure repository watch levels to reduce noise.
- Student can find review requests and assigned work quickly using filters.
- Student can reduce notification noise with mute or done actions.

### If You Get Stuck

1. Can't find the Watch button? It is near the top-right of the repository page, in the same row as Star and Fork.
2. Notification inbox is empty? You may not have any notifications yet - that is fine. Switch to the **Done** tab and practice the mute/done action flow on an older notification.
3. Keyboard shortcuts not working? If your screen reader intercepts `M` or `E`, click on the notification row first to give it focus, then press the shortcut.
4. Filters not showing results? Clear all filters first (click the X next to each active filter), then apply one filter at a time.
5. Ask facilitator to model one inbox action live, then repeat the steps yourself.
6. Finished but not sure you did it right? Compare your work against the [Challenge 9 reference solution](solutions/solution-09-merge-day.md).

### Learning Moment

Notification management protects focus. You can stay responsive to your team without drowning in updates. The habit you build here - checking filtered notifications once or twice a day - is how productive open source contributors stay on top of their work.

### Learning Pattern Used in This Chapter

1. Configure settings proactively (watch level) before work generates noise.
2. Use filters to find signal in noise (review requests, assignments).
3. Take decisive action on each notification (mute, done, or respond).
4. Build a daily routine that keeps your inbox manageable.


## What Generates a Notification?

GitHub sends you a notification when:

| Event | You are notified if... |
| -------  | ------------------------  |
| Someone @mentions you | `@your-username` appears in any issue, PR, or discussion |
| A PR is assigned to you for review | You are added as a reviewer |
| An issue or PR is assigned to you | You are assigned |
| There is activity on a thread you are subscribed to | You commented, were mentioned, or chose to subscribe |
| A CI check fails on your PR | Actions sends a failure notification |
| A release is published | You are watching the repo for all activity |


## Notification Subscription Levels

For each repository, you choose how many notifications to receive:

| Level | What You Receive |
| -------  | -----------------  |
| **Participating and @mentions** | Only notifications where you participated (commented, were assigned, @mentioned). Recommended for most repos. |
| **All Activity** | Every issue opened, every comment, every PR. Only use this for your own repos or very active contribution. |
| **Ignore** | No notifications from this repo at all. |
| **Custom** | Fine-grained control: issues only, PRs only, releases, etc. |

### Changing your watch settings for a repo

<details>
<summary>Visual / mouse users</summary>

At the top of any repository page, find the **Watch** button (near Star and Fork). Click it to open a dropdown with levels: **Participating and @mentions**, **All Activity**, **Custom**, and **Ignore**. Click your preferred level - it takes effect immediately.

</details>

<details>
<summary>Screen reader users (NVDA / JAWS - Windows)</summary>

1. Find the **Watch** button in the repo header (`B` to navigate buttons → find "Watch [N]" or "Unwatch" button)
2. Press `Enter` to open the dropdown
3. Press `↑/↓` to navigate the subscription options
4. Press `Enter` to select your preferred level
5. The button label updates to confirm your choice

</details>

<details>
<summary>Screen reader users (VoiceOver - macOS)</summary>

1. Quick Nav `B` to find the **Watch** button in the repo header (listen for "Watch" or "Unwatch")
2. `VO+Space` to open the dropdown
3. `VO+Down` or arrow keys to navigate subscription options
4. `VO+Space` to select your preferred level
5. The button label updates to confirm your choice

</details>

**Recommended setting for most repos:** “Participating and @mentions only” - you stay in the loop on what involves you without noise.


## The Notifications Inbox

### Tool Cards: Manage Notifications

**github.com (browser):**
1. Go to [github.com/notifications](https://github.com/notifications) (or press `G` then `N`).
2. Use `E` to mark done, `I` to mark read/unread, `Shift+M` to mute a thread.

**VS Code Desktop (GitHub Pull Requests extension):**
1. The **Notifications** view in the GitHub sidebar shows items needing attention.
2. Click a notification to open the related issue or PR directly in VS Code.

**GitHub Desktop:**
GitHub Desktop does not manage notifications. Use the browser or CLI.

**Git CLI / GitHub CLI:**
```bash
# List PRs requesting your review (most common notification)
gh search prs --review-requested @me --state open
# Open the notifications page in your browser
gh browse notifications
```

Navigate to your inbox: `https://github.com/notifications` or press `G` then `N` (GitHub keyboard shortcut).

**Screen reader note:** The `G N` shortcut uses two sequential key presses (not simultaneous). Press `G`, release it, then press `N`. This works in Browse Mode.

<details>
<summary>GitHub CLI (gh) alternative - notifications</summary>

View and manage your GitHub notification status from the terminal:

```bash
# Check your notification status (opens the GitHub notification inbox)
gh api notifications --jq '.[].subject.title' | head -20

# View PRs that need your review (most common notification reason)
gh search prs --review-requested @me --state open

# View issues assigned to you
gh issue list --assignee @me --state open

# Check PR status for a specific notification
gh pr view 42 --repo owner/repo
```

**Note:** The GitHub CLI does not have a first-class `gh notifications` command. For full inbox management (mark as read, mute, archive), use the web interface at `github.com/notifications`. The `gh` CLI is most useful for quickly checking PR review requests and issue assignments that generate notifications.

</details>

### Page structure

```text
[Filters sidebar on left]     ← Unread / Participating / @Mentions / Assigned / etc.
[Notification list in center] ← Each notification is a row
[Detail pane on right]        ← Preview the notification (can be disabled)
```

### Navigating the notification list

<details>
<summary>Visual / mouse users</summary>

The inbox shows notifications grouped by date (Today, Yesterday, This week, Older). Each row shows the repository, the issue or PR title, the event type, and the time. Click a row to open the notification and go to the issue or PR. Use the left sidebar filters to narrow the view. The **Mark all as done** button clears the entire inbox at once.

</details>

<details>
<summary>Screen reader users (NVDA / JAWS)</summary>

1. `D` → main content landmark
2. `H` to navigate group headings (Today / Yesterday / This week / Older)
3. `Tab` through individual notifications - each row announces: repo name, issue/PR title, event type, time
4. `Enter` to open the notification (goes to the issue/PR page)

</details>

<details>
<summary>Screen reader users (VoiceOver)</summary>

1. `VO+U` → Main → navigate to notification list
2. `VO+Down` to move through notifications
3. `VO+Space` to open a notification

</details>

### What is announced per notification

> "microsoft/vscode - Add keyboard shortcut for accessible view - @username mentioned you - 2 hours ago"

Components: **repo/org** | **thread title** | **event type** | **timestamp**

### Learning Cards: The Notifications Inbox

<details>
<summary>Screen reader users</summary>

- Press `G N` (two sequential keys, not simultaneous) from any GitHub page to jump directly to your notifications inbox
- Press `H` to navigate date-group headings (Today, Yesterday, This Week, Older), then `Tab` through individual notification rows within each group
- Each notification row announces: repository name, issue/PR title, event type (mentioned, review requested, assigned), and relative timestamp

</details>

<details>
<summary>Low vision users</summary>

- The inbox has a three-panel layout: filters on the left, notification list in the center, and an optional detail preview on the right; at high zoom the detail pane may collapse
- Unread notifications have a blue dot on the left edge of the row; read notifications do not, which is the primary visual distinction
- The left sidebar filter labels (Inbox, Unread, Saved, Done) are text links that remain readable at any zoom level

</details>

<details>
<summary>Sighted users</summary>

- The notifications inbox at github.com/notifications shows a list of notifications grouped by date, with a filter sidebar on the left
- Unread notifications have a blue dot indicator; click a notification row to open the issue or PR in context
- Quick actions appear on hover: a checkmark icon to mark as done, a bookmark icon to save for later, and a mute icon to unsubscribe from the thread

</details>


## Inbox Actions - Keyboard Shortcuts

These shortcuts work when a notification is focused in the inbox:

| Shortcut | Action |
| ----------  | --------  |
| `E` | Mark as done (archive from inbox) |
| `Shift+I` | Mark as read without opening |
| `Shift+U` | Mark as unread |
| `M` | Mute thread (no more notifications from this thread) |
| `S` | Save for later |
| `Enter` | Open the notification |

> **Screen reader note:** These are GitHub's own keyboard shortcuts. In Browse Mode, some of these letters are also navigation keys. To use these shortcuts reliably, make sure focus is on the notification row (tab to it) rather than in browse/reading mode.


## Filtering the Inbox

The left sidebar has quick filters. Use `Tab` or `K` to navigate to them:

| Filter | Shows |
| --------  | -------  |
| Inbox | All active notifications (default) |
| Unread | Only unread notifications |
| Saved | Notifications you saved with `S` |
| Done | Archived (marked done) notifications |
| @Mentioned | Only threads where you were directly @mentioned |
| Assigned | Issues and PRs assigned to you |
| Review requested | PRs where your review is requested |
| Participating | All threads you participated in |

### Filtering by repository or organization

At the top of the notification list there is a filter/search field:

<details>
<summary>Visual / mouse users</summary>

Click the filter/search box at the top of the notification list and type a repository or organization name. The list narrows in real time. Press `Escape` or clear the box to reset.

</details>

<details>
<summary>Screen reader users (NVDA / JAWS - Windows)</summary>

1. Press `F` or `E` to reach the filter input
2. Focus Mode → type repo name or org name
3. Results filter in real time
4. Press `Esc` to clear the filter

</details>

<details>
<summary>Screen reader users (VoiceOver - macOS)</summary>

1. Quick Nav `F` to reach the filter input
2. `VO+Shift+Down` to interact → type repo or org name
3. Results filter in real time
4. Press `Esc` to clear the filter and `VO+Shift+Up` to stop interacting

</details>


## Managing Notifications at Scale

### The "mark all as done" workflow

After a busy day or coming back from time away, clear your inbox methodically:

1. Open Notifications inbox
2. Tab to "Mark all as done" button → Enter (clears everything at once)
3. Then use the "Done" filter to retrieve any you want to revisit

### Muting a noisy thread

If a thread generates too many notifications:

<details>
<summary>Visual / mouse users</summary>

1. Open the issue or PR page
2. In the right sidebar, scroll to the **Notifications** section
3. Click **Unsubscribe** - you will stop receiving notifications from this thread
4. Alternatively, from the inbox: hover over the notification row and click the **mute** icon (or the … menu)

</details>

<details>
<summary>Screen reader users (NVDA / JAWS - Windows)</summary>

1. Open the notification
2. On the issue/PR page, navigate the sidebar to the **Notifications** section (`H` or `D`)
3. Activate the **Unsubscribe** button
4. Or from the inbox: focus the notification → press `M` to mute

</details>

<details>
<summary>Screen reader users (VoiceOver - macOS)</summary>

1. Open the notification
2. On the issue/PR page, `VO+U` → Landmarks or Quick Nav `H` to find the **Notifications** section in the sidebar
3. Quick Nav `B` or `Tab` to find the **Unsubscribe** button → `VO+Space`
4. Or from the inbox: focus the notification and press `M` to mute

</details>

### Dealing with @mentions you didn't expect

If you were @mentioned in an unfamiliar thread:

1. Read the thread for context before responding
2. If it seems like a mistake, a simple "I don't think this mention was meant for me - feel free to remove it!" is enough
3. Unsubscribe after reading if you don't need to stay in the loop

### Learning Cards: Managing Notifications at Scale

<details>
<summary>Screen reader users</summary>

- To mute a noisy thread from the inbox, focus the notification row with `Tab` and press `M`; you will stop receiving updates from that thread
- Press `E` to mark a focused notification as done (archived); focus automatically moves to the next notification for rapid triage
- To bulk-clear, Tab to the "Mark all as done" button at the top of the inbox and press `Enter`; then use the "Done" filter to retrieve anything you need later

</details>

<details>
<summary>Low vision users</summary>

- The "Mark all as done" button is at the top of the notification list, above the first notification group; it clears the entire inbox at once
- After marking notifications as done, switch to the "Done" filter in the left sidebar to review archived items; this filter persists until you switch back
- On an issue or PR page, the "Unsubscribe" button is in the right sidebar under a "Notifications" heading; it prevents future notifications from that thread

</details>

<details>
<summary>Sighted users</summary>

- Hover over any notification row to reveal quick-action icons: checkmark (done), bookmark (save), and mute (unsubscribe)
- Use the "Mark all as done" button to clear the entire inbox, then revisit important items via the "Done" filter in the left sidebar
- On an issue/PR page, the "Unsubscribe" link in the sidebar Notifications section stops notifications for that specific thread without unwatching the entire repository

</details>


## Notification Settings - Per Your Account

Global notification preferences are at `https://github.com/settings/notifications`.

Key settings to review:

| Setting | Recommendation |
| ---------  | ---------------  |
| **Email delivery** | Choose Participating and @mentions unless you prefer email for everything |
| **GitHub Mobile** | Enable only if you use GitHub Mobile - mobile notifications can duplicate desktop ones |
| **Watching** | "Participating and @mentions" unless you are an active maintainer |
| **Organization alerts** | Enable for orgs where you have responsibilities |

Navigate this settings page:

```text
H → navigate to each settings section heading
F or E → navigate form fields within each section
Tab → move between options within a form group
```


## Starring vs. Watching - What Is the Difference?

New contributors often confuse these two. They appear next to each other on every repository page and do completely different things.

### Starring a Repository

| Feature | Description |
| ---  | ---  |
| **What it does** | Bookmarks the repository to your Stars list at `github.com/stars` |
| **Notifications** | **None.** Starring never sends you any notifications |
| **Visibility** | Public - anyone can see what you've starred on your profile |
| **Use case** | "I want to save this for later" or "I want to show appreciation" |
| **Keyboard path** | On any repo page: `B` to navigate buttons → find "Star" button → Enter |

Starring is GitHub's equivalent of a bookmark + public endorsement. The star count on a repository is a community signal of popularity. Many maintainers watch their star count as a rough measure of interest.

### Watching a Repository

| Feature | Description |
| ---  | ---  |
| **What it does** | Subscribes you to notifications from that repository |
| **Notifications** | Sends notifications based on your chosen level (see below) |
| **Visibility** | Private - other users cannot see what you're watching |
| **Use case** | "I need to stay informed about activity in this repo" |
| **Keyboard path** | `B` → find "Watch" button → Enter → ↑/↓ to pick a level → Enter |

### Common Mistake: Accidental Watching

When you comment on an issue or PR in a repository, GitHub **automatically subscribes you** to that thread - but not the whole repository. However, if you once click "Watch" on a busy repository (say, a popular open source project), you will receive a notification for every issue opened and every comment posted - potentially hundreds per day.

#### How to silence a repository you accidentally over-subscribed to

```text
Step 1: Navigate to the repository
Step 2: B → Find "Unwatch" button → Enter
Step 3: Select "Participating and @mentions"
Step 4: Enter to confirm
```

This immediately reduces notifications from that repository to only threads you personally participated in.

### Recommended Watching Strategy for This Workshop

| Repository | Recommended Watch Level |
| ---  | ---  |
| `community-access/accessibility-agents` | **Participating and @mentions** - you contribute there, you only need to hear back when someone replies to you |
| Your own fork | **All Activity** - this is your fork; know everything |
| Very busy popular repos | **Ignore** or **Participating** - do not watch for All Activity |
| Repos you're evaluating | **Star only** - save without subscribing |

### Learning Cards: Starring vs. Watching

<details>
<summary>Screen reader users</summary>

- The Star and Watch buttons are adjacent in the repository header; press `B` to navigate buttons and listen for "Star" or "Watch" (or "Unstar" / "Unwatch" if already active)
- Star: press `Enter` on the Star button to bookmark; this generates zero notifications and is purely a bookmark to github.com/stars
- Watch: press `Enter` on the Watch button to open a dropdown; use `Up/Down Arrow` to choose a subscription level and `Enter` to confirm

</details>

<details>
<summary>Low vision users</summary>

- The Star button shows a star icon and a count (e.g., "Star 1.2k"); the Watch button shows an eye icon and a count; both are in the top-right area of the repository page
- After starring, the button changes to "Unstar" with a filled yellow star; after watching, it changes to "Unwatch" with a filled eye icon
- At 200%+ zoom, these buttons may wrap below the repository title; they remain functional at any zoom level

</details>

<details>
<summary>Sighted users</summary>

- Star (star icon) = bookmark only; Watch (eye icon) = subscribe to notifications; they are next to each other and next to the Fork button in the repo header
- Star counts are public and show on your profile; watch settings are private and affect only your notification inbox
- If you accidentally watched a busy repo and are flooded with notifications, click Unwatch and switch to "Participating and @mentions" to reduce noise immediately

</details>


## Screen Reader Tips for the Notification Inbox

### NVDA

- The notification list is complex - use `Tab` to navigate individual rows rather than Browse Mode arrow keys
- After marking notifications done (press `E`), the next notification automatically receives focus
- Use `NVDA+F7` → Links to get a filtered list of notification titles to scan quickly

### JAWS

- Like NVDA, use `Tab` for row navigation in the inbox
- `Insert+F6` (Headings list) to jump between date group headings (Today, This Week, etc.)
- The inbox updates in real time - JAWS will announce new notifications as they arrive

### VoiceOver

- Use `VO+U` → Landmarks → Main to reach the notification list quickly
- `VO+Space` to activate a row, `VO+Escape` to return to the list
- With Quick Nav on, `H` navigates the date group headings


## The GitHub Mobile App - A Reference Note

GitHub has an iOS and Android app that supports push notifications. While the app itself is not covered as a primary tool in this workshop, it is worth knowing:

- Push notifications can alert you to review requests even when you're away from your computer
- The mobile app does work with iOS VoiceOver and Android TalkBack
- For primary contribution work, the desktop browser experience remains more fully featured


## Try It: Tame Your Inbox

**Time:** 2 minutes | **What you need:** Browser, signed in to GitHub

Go to [github.com/notifications](https://github.com/notifications) and practice:

1. **Scan your inbox** - Press `H` and `Tab` to navigate through notifications. Each one shows the repo name, type (issue/PR), and title.
2. **Mark one as done** - Find a notification you've already read. Press `E` to mark it as done. It disappears from the list.
3. **Configure watching** - Go to the Learning Room repository. Press `D` to landmarks, find the repo nav area, then look for the "Watch" or "Unwatch" button (`B` to scan buttons). Choose your preferred watch level.

**You're done.** You now control what GitHub tells you about and what it doesn't.

> **What success feels like:** Your inbox has fewer items, and you chose what to watch. Notifications work *for* you now, not against you.


> ### Day 2 Amplifier - Accessibility Agents: `@daily-briefing`
>
> **Manage your notification inbox manually before using any agent.** The signal-versus-noise judgment you develop - what to act on, what to watch, what to mute - is the same judgment the agent applies when prioritizing its output. Without that judgment, you cannot evaluate whether the agent's prioritization is correct or whether it surfaced the things that actually matter to you.
>
> Once you have mastered manual notification management:
>
> - **In VS Code** - `@daily-briefing morning briefing` delivers the same information as your notification inbox, organized by priority and actionability, with the ability to reply, close, and merge from inside Copilot Chat
> - **In your repo** - Fork [accessibility-agents](https://github.com/Community-Access/accessibility-agents) and every collaborator on your project can run `@daily-briefing` against your shared repository; the whole team stays aligned from a single command with no inbox required
> - **In the cloud** - GitHub Agentic Workflows can run on a schedule and post a team digest to a designated issue each morning, surfacing what needs attention before anyone opens their notifications
>
> *Your notification discipline today becomes the standard the agent enforces at scale tomorrow.*


## What You Accomplished Today

Take a breath. Day 1 is complete -- and you did a lot.

Here is every skill you practiced, mapped to the chapter where you learned it and the evidence you created along the way:

| Chapter | Skill | Evidence |
|---|---|---|
| [Chapter 00](00-pre-workshop-setup.md) | Created a GitHub account and configured accessibility settings | Account exists, profile is visible |
| [Chapter 01](01-choose-your-tools.md) | Chose your editing environment and tested it | Tool preference noted in your challenge issue |
| [Chapter 02](02-understanding-github.md) | Understood what GitHub is, how repositories work, and what collaboration looks like | Completion comment on challenge issue |
| [Chapter 03](03-navigating-repositories.md) | Navigated a real repository using keyboard and screen reader | Found specific files and folders in the Learning Room |
| [Chapter 04](04-the-learning-room.md) | Opened the Learning Room, found your challenge issues, and understood the workflow | First structured comment posted |
| [Chapter 05](05-working-with-issues.md) | Created, labeled, and commented on issues | Issue created with a descriptive title and body |
| [Chapter 06](06-working-with-pull-requests.md) | Created a branch, edited a file, and opened a pull request | Merged PR visible in the repository |
| [Chapter 07](07-merge-conflicts.md) | Recognized a merge conflict and resolved it | Conflict-free merge committed |
| [Chapter 08](08-open-source-culture.md) | Read contributing guidelines, understood community norms, and practiced respectful communication | Thoughtful comment on a peer's issue or PR |
| [Chapter 09](09-labels-milestones-projects.md) | Used labels, milestones, and project boards to organize work | Labels applied, milestone progress visible |
| [Chapter 10](10-notifications-and-day-1-close.md) | Configured notification preferences and managed your inbox | Watch level set, at least one notification acted on |

That is eleven chapters, eleven skills, and a trail of real evidence in a real repository.

### If This Was Your First Time

If today was your first time using GitHub -- or your first time using it with a screen reader -- you have already done something most developers take weeks to piece together on their own. You navigated a complex platform, created real contributions, and collaborated with other people in a shared codebase. That is not a small thing.

If parts felt confusing or slow, that is completely normal. Every skill you practiced today gets faster with repetition. The point was never speed -- it was understanding.

### Confidence Check

Before you close your laptop, take two minutes to answer these questions in your Chapter 10 challenge issue. There are no wrong answers -- this is for you.

1. Which chapter felt the most natural to you? Which one do you want to revisit?
2. Can you explain what a pull request does to someone who has never used GitHub?
3. If you saw a merge conflict right now, would you know where to start?
4. What is one thing you want to try on GitHub this week that you did not get to today?

> **Screen reader tip:** You can copy these questions into your challenge issue comment and type your answers directly below each one. Use a blank line between each question-answer pair so the structure is clear when read back.

### Your Challenge Progress

Look at how many challenge issues you completed today. Each one represents a skill you did not just read about -- you practiced it, posted evidence, and moved on. Some workshops hand you a certificate for sitting in a chair. This one asked you to prove your skills in a live repository, and you did.

If you completed all eleven challenges, you are ready for Day 2 with a strong foundation. If you missed a few, that is fine -- you can finish them at your own pace before Day 2 begins. The Learning Room stays open.

### Learning Cards: What You Accomplished Today

<details>
<summary>Screen reader users</summary>

- You navigated GitHub entirely by keyboard: headings (`H`), landmarks (`D`), buttons (`B`), links (`K`), and form fields (`F` or `E`) became your primary navigation tools
- You created issues, opened PRs, resolved conflicts, and managed notifications -- all skills that transfer to any repository on GitHub
- Revisit any chapter by pressing `Ctrl+L` in your browser and typing the URL, or by navigating to the docs folder in the Learning Room repository

</details>

<details>
<summary>Low vision users</summary>

- Everything you did today at your current zoom level and contrast settings will work the same way tomorrow; GitHub's layout adapts consistently to browser zoom up to 400%
- If you found certain pages hard to read, revisit Settings, Accessibility on GitHub to try a different theme or motion preference before Day 2
- Your profile page at github.com/your-username now shows contribution activity from today; zoom in on the contribution graph to see your green squares

</details>

<details>
<summary>Sighted users</summary>

- Your GitHub profile now shows contribution activity from today: issues created, PRs opened, and commits made appear as green squares on your contribution graph
- Every skill from today (issues, PRs, reviews, labels, notifications) is used daily by professional developers; you practiced the real workflow, not a simplified version
- Bookmark your Learning Room repository and the notifications page (github.com/notifications) for quick access on Day 2

</details>


## What Day 2 Adds

> **See also:** [Chapter 11: VS Code Interface](11-vscode-interface.md) is where Day 2 begins -- have VS Code installed and ready.

On Day 1, you worked entirely on GitHub.com. Everything happened in your browser -- creating issues, editing files, opening pull requests, resolving conflicts. On Day 2, you bring that same workflow to your own computer and add powerful new tools on top of it.

Here is what Day 2 covers:

| Chapters | Topic | What You Will Do |
|---|---|---|
| [Ch 11](11-vscode-interface.md) -- [Ch 12](12-vscode-accessibility.md) | VS Code deep dive | Install and configure VS Code with full screen reader and accessibility support |
| [Ch 13](13-how-git-works.md) -- [Ch 14](14-git-in-practice.md) | Local Git | Clone repositories, commit locally, push and pull changes between your computer and GitHub |
| [Ch 15](15-code-review.md) | Code review | Review pull requests with inline comments, suggestions, and approval workflows |
| [Ch 16](16-github-copilot.md) | GitHub Copilot | Use AI-assisted coding with accessibility-first prompting techniques |
| [Ch 17](17-issue-templates.md) | Issue templates | Create structured templates so every issue in your project starts with the right information |
| [Ch 18](18-fork-and-contribute.md) | Fork workflow | Fork a repository, make changes, and submit a pull request back to the original project |
| [Ch 19](19-accessibility-agents.md) | Accessibility agents | Build and use custom agents that automate accessibility checks and team workflows |
| [Ch 20](20-build-your-agent.md) | Capstone | Design, build, test, and ship your own accessibility agent from scratch |

The mental model shift is straightforward: Day 1 taught you *what* GitHub does. Day 2 teaches you how to use it from your own development environment, with real tools that professional developers use every day.

### Between Days

If your workshop has a gap between Day 1 and Day 2, here are three optional things you can do to stay sharp:

1. **Explore your notification settings.** Now that you understand how notifications work, visit [github.com/settings/notifications](https://github.com/settings/notifications) and customize your email and web preferences. There is no wrong configuration -- just find what feels manageable.

2. **Read issues in a project you care about.** Pick any open source project on GitHub and browse its issue tracker. You now know enough to understand labels, milestones, and comment threads. Notice how maintainers communicate -- you will recognize the patterns from [Chapter 08](08-open-source-culture.md).

3. **Try a GitHub Skills course.** [GitHub Skills](https://skills.github.com/) offers free, self-paced courses that run inside real repositories. "Introduction to GitHub" is a good one if you want to reinforce what you learned today. See [Appendix Z](appendix-z-github-skills.md) for the full list of recommended courses.

> **Screen reader tip:** GitHub Skills courses use bot-driven feedback inside pull requests. The interaction model is similar to the Learning Room -- you push a change, a bot reviews it, and you get instructions for the next step. If you completed today's challenges, you already know the workflow.

### You Already Know More Than You Think

Think about where you started this morning. You may not have known what a repository was, or how to navigate one with a keyboard, or what happens when two people edit the same file. Now you do. You have created real issues, opened real pull requests, resolved real conflicts, and configured your own notification workflow -- all in a live, shared codebase.

Day 2 builds on every one of those skills. Nothing gets thrown away. Everything you did today is the foundation for everything that comes next.


> ➡️ **End of Day 1:** Congratulations! You have completed **Challenge 9: Merge Day** and finished the browser-based foundation. [Return to the Course Guide](course-guide.md) to prepare for Day 2.

---


*Next: [Chapter 11: VS Code Interface](11-vscode-interface.md)*  
*Back: [Chapter 09: Labels, Milestones, and Projects](09-labels-milestones-projects.md)*  
*Related appendices: [Appendix T: Community and Social](appendix-t-community-and-social.md) | [Appendix U: Discussions and Gists](appendix-u-discussions-and-gists.md)*

