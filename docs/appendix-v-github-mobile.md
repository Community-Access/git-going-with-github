# Appendix O: GitHub Mobile
>
> **Listen to Episode 32:** [GitHub Mobile](../PODCASTS.md) - a conversational audio overview of this chapter. Listen before reading to preview the concepts, or after to reinforce what you learned.

## Accessibility Guide for iOS and Android

> GitHub Mobile brings issues, pull requests, notifications, and code review to your iPhone, iPad, or Android device. This appendix covers setup, VoiceOver and TalkBack usage, and the tasks best suited to mobile.


## Table of Contents

1. [Installing GitHub Mobile](#1-installing-github-mobile)
2. [Getting Around the App](#2-getting-around-the-app)
3. [VoiceOver on iOS](#3-voiceover-on-ios)
4. [TalkBack on Android](#4-talkback-on-android)
5. [Working with Notifications](#5-working-with-notifications)
6. [Reviewing Pull Requests](#6-reviewing-pull-requests)
7. [Working with Issues](#7-working-with-issues)
8. [What Mobile Does Well vs. Desktop](#8-what-mobile-does-well-vs-desktop)
9. [Common Issues and Workarounds](#9-common-issues-and-workarounds)


## 1. Installing GitHub Mobile

| Platform | Download |
| ----------  | ----------  |
| iOS (iPhone / iPad) | [App Store - GitHub](https://apps.apple.com/app/github/id1477376905) |
| Android | [Google Play - GitHub](https://play.google.com/store/apps/details?id=com.github.android) |

After installing, sign in with your GitHub account. Enable notifications when prompted - these are essential for staying on top of PR reviews and issue activity without constantly checking the web.


## 2. Getting Around the App

GitHub Mobile is organized into five main tabs at the bottom of the screen:

| Tab | Contents |
| -----  | ----------  |
| Home | Personalized feed of activity across your repositories |
| Notifications | All @mentions, review requests, issue updates |
| Explore | Discover repositories and trending projects |
| Pull Requests | PRs assigned to you, created by you, or awaiting your review |
| Profile | Your profile, repositories, stars, and settings |

Navigate between tabs with a single tap (or swipe on iOS with VoiceOver active).


## 3. VoiceOver on iOS

### Enabling VoiceOver

- **Triple-click the side button** (iPhone X and later) or triple-click the Home button to toggle VoiceOver
- Or: Settings → Accessibility → VoiceOver → toggle on

### Basic Gestures in GitHub Mobile

| Gesture | Action |
| ---------  | --------  |
| Swipe right | Move to the next element |
| Swipe left | Move to the previous element |
| Double tap | Activate the focused element |
| Two-finger swipe up | Read from the top |
| Two-finger tap | Pause/resume speech |
| Three-finger swipe left/right | Move between screens |
| Scrub (two-finger Z motion) | Go back |

### Rotor in GitHub Mobile

Open the Rotor by rotating two fingers on the screen as if turning a dial. Useful rotor settings for GitHub Mobile:

- **Headings** - jump between section headings on an issue or PR description
- **Links** - navigate to linked issues, commits, or external URLs
- **Form Controls** - jump to input fields when writing a comment
- **Actions** - available actions for the focused element (assign, label, close)

### Writing Comments with VoiceOver

1. Navigate to the comment field (swipe to it or use Rotor → Form Controls)
2. Double tap to activate and open the keyboard
3. Type your comment; VoiceOver announces each character
4. When done, swipe to the **Comment** button and double tap to submit


## 4. TalkBack on Android

### Enabling TalkBack

- Settings → Accessibility → TalkBack → toggle on
- Or: hold both volume keys for three seconds (if the shortcut is enabled)

### Basic Gestures in GitHub Mobile

| Gesture | Action |
| ---------  | --------  |
| Swipe right | Move to next element |
| Swipe left | Move to previous element |
| Double tap | Activate the focused element |
| Swipe up then down | Scroll down |
| Swipe down then up | Scroll up |
| Swipe right then left | Go back |
| Two-finger swipe down | Read from top |

### TalkBack Menu

Tap with three fingers (or swipe down then right) to open the TalkBack menu. From here you can:

- Change the reading granularity (character, word, line, paragraph)
- Activate reading controls
- Copy text

### Writing Comments with TalkBack

1. Locate the comment field - TalkBack announces "Edit text, double tap to edit"
2. Double tap to enter the field
3. Use the on-screen keyboard or dictation to type
4. Locate the **Comment** button and double tap to submit


## 5. Working with Notifications

GitHub Mobile's Notifications tab is one of its strongest features for AT users - it surfaces all activity in a clean, linear list that is much easier to navigate than the GitHub web notifications page.

### Inbox Management

- **Swipe left** on a notification to reveal quick actions: Mark as read, Archive, Unsubscribe
- **Swipe right** to mark as done
- Tap a notification to open the full issue or PR

### Filtering Notifications

Use the filter icon at the top right to filter by:

- Type (Issues, PRs, Releases, etc.)
- Repository
- Reason (you were @mentioned, a review was requested, etc.)

With VoiceOver or TalkBack, the filter controls are accessible form elements. Open the filter panel, navigate to each option, and activate to toggle it.


## 6. Reviewing Pull Requests

Mobile is well suited for quick PR reviews - approving straightforward changes, leaving a comment, or checking CI status while away from your desk.

### Navigating a PR

When you open a pull request, the screen is divided into sections:

- **Description** - the PR body with any images or checklists
- **Commits** - individual commits in this PR
- **Files changed** - a simplified diff view
- **Checks** - CI/CD status

VoiceOver and TalkBack announce these as headings. Use heading navigation (Rotor on iOS, swipe granularity on Android) to jump between sections.

### Leaving a Review

1. Scroll to or navigate to the **Review changes** button
2. Double tap to open the review panel
3. Choose Approve, Request changes, or Comment
4. Add an optional comment in the text field
5. Activate **Submit review**

### Viewing Diffs

The Files Changed tab shows a simplified diff - additions and removals are text-only (no table layout). Each changed line is announced as "Added: [content]" or "Removed: [content]", which is generally more accessible than the web diff table on small screens.


## 7. Working with Issues

### Filing an Issue

1. Navigate to the repository
2. Tap **Issues** → the **+** button or **New Issue**
3. Fill in the title and body
4. Optionally assign labels, assignees, and milestone - each is a tappable field
5. Tap **Submit**

### Finding Your Issues

- Pull Requests tab → **Created by you** or **Assigned to you** filters
- For issues: Home feed shows recent activity; or navigate to a specific repository → Issues → filter by Assignee, Label, or Author


## 8. What Mobile Does Well vs. Desktop

| Task | Mobile | Desktop |
| ------  | --------  | ---------  |
| Triage notifications | Excellent - linear list, swipe actions | Good |
| Quick review / approve a PR | Good | Good |
| Writing long PR descriptions | Fair - small keyboard | Better |
| Reviewing large diffs | Fair - simplified view | Better |
| Filing a simple issue | Good | Good |
| Complex issue templates | Fair | Better |
| Managing labels and milestones | Good | Good |
| Reading code | Fair - no syntax highlighting | Better |
| Running Codespace / editing code | Not supported | Supported |

**Best use of GitHub Mobile:** notification triage, quick approvals and comments, catching up on activity between sessions. For writing substantial code, descriptions, or reviewing complex diffs, use the web or VS Code.


## 9. Common Issues and Workarounds

### VoiceOver skips some PR descriptions

Long PR descriptions with images, tables, or embedded videos may not read cleanly. Open the PR in Safari instead - tap the **…** menu → **Open in Browser**.

### TalkBack does not announce new notifications badge

The badge count on the Notifications tab updates live but may not be announced. Navigate directly to the Notifications tab to get the current count read aloud.

### The keyboard covers the comment field

Usual iOS/Android behavior - scroll up slightly after the keyboard appears, or rotate to landscape mode to gain more visible space.

### Can't find the Submit button after writing a review

Scroll down past the text field; buttons are below the keyboard dismiss area. On iOS, tap elsewhere to dismiss the keyboard first, then scroll to Submit.

### GitHub Mobile crashes or freezes

Force close the app and reopen. If the problem persists, sign out and back in via Profile → Settings → Sign out.


*Return to: [Resources](appendix-x-resources.md) | [Appendix B - Screen Reader Cheat Sheet](appendix-b-screen-reader-cheatsheet.md) | [Appendix A - Glossary](appendix-a-glossary.md)*
