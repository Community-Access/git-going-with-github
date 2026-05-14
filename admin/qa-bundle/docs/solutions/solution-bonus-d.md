# Solution Reference: Bonus D -- Notification Mastery

This shows a configured notification setup with before/after.

## Before: Default settings

With default settings, GitHub sends email notifications for:

- Every issue and PR in every repository you watch
- Every comment on any thread you have participated in
- Every CI status update

This quickly becomes overwhelming. Most people start ignoring all GitHub emails.

## After: Configured settings

### Notification settings (github.com/settings/notifications)

- **Participating:** Email ON, Web ON -- you want to know when someone replies to your conversations
- **Watching:** Email OFF, Web ON -- browse these when you have time, not in your inbox
- **GitHub Actions:** Email OFF for successful runs, Email ON for failed runs only

### Repository watching

- **Repositories you actively contribute to:** Watch (all activity)
- **Repositories you read occasionally:** Custom (issues and PRs only)
- **Repositories you finished with:** Unwatch

### Custom routing (if you use multiple emails)

- Route `Community-Access` organization notifications to your workshop email
- Route personal project notifications to your personal email

## Key decisions explained

- **Why email off for watching:** You can check the notification bell on github.com when you choose. Email notifications for watched repos create constant interruption for low-priority updates.
- **Why Actions failures only:** A green checkmark in the PR is enough. You only need an email when something breaks.
- **Why unwatch finished repos:** Your notification feed stays relevant to current work.

## What matters

The learning objective is intentional notification management. If you changed at least one setting from the default and can explain why that change reduces noise while keeping you informed about what matters, you completed this bonus.

## Authoritative Sources

Use these official references when you need the current source of truth for facts in this chapter.

- [GitHub Docs, home](https://docs.github.com/en)
- [GitHub Changelog](https://github.blog/changelog/)

### Section-Level Source Map

Use this map to verify facts for each major section in this file.

- **Before: Default settings:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **After: Configured settings:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **Key decisions explained:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **What matters:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
