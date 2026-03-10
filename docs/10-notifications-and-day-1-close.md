# Notifications
>
> **Listen to Episode 10:** [Notifications and Mentions](../PODCASTS.md) - a conversational audio overview of this chapter. Listen before reading to preview the concepts, or after to reinforce what you learned.

## Managing Your GitHub Notification Inbox

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


*Next: [Day 2 Agenda](../DAY2_AGENDA.md)*
*Back: [Labels, Milestones, and Projects](09-labels-milestones-projects.md)*
*Related: [Culture & Etiquette](08-open-source-culture.md) | [Working with Issues](05-working-with-issues.md)*
