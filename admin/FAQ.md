# FAQ: Frequently Asked Questions


## Table of Contents

- [About This Workshop](#about-this-workshop)
- [Is This For Me?](#is-this-for-me)
- [Getting Started](#getting-started)
- [Screen Readers and Accessibility](#screen-readers-and-accessibility)
- [GitHub Accounts and Authentication](#github-accounts-and-authentication)
- [Navigating GitHub on the Web](#navigating-github-on-the-web)
- [Issues](#issues)
- [Pull Requests](#pull-requests)
- [Merge Conflicts](#merge-conflicts)
- [Branches and Forks](#branches-and-forks)
- [Markdown](#markdown)
- [Labels, Milestones, and Projects](#labels-milestones-and-projects)
- [Notifications](#notifications)
- [VS Code](#vs-code)
- [Git and Source Control in VS Code](#git-and-source-control-in-vs-code)
- [GitHub Copilot](#github-copilot)
- [Accessibility Agents](#accessibility-agents)
- [Issue Templates](#issue-templates)
- [Code Review](#code-review)
- [The Learning Room](#the-learning-room)
- [Workshop Logistics](#workshop-logistics)
- [After the Workshop](#after-the-workshop)
- [Concepts and Terminology](#concepts-and-terminology)
- [Still Stuck?](#still-stuck)


## About This Workshop

### Q: Is this guide only for programmers?
**A:** No. While it focuses on GitHub (a platform developers use), the concepts apply to anyone collaborating on projects. Documentation improvements, issue filing, accessibility testing, and code reviews are all valuable contributions that require no coding. **Start:** [Chapter 1](docs/02-understanding-github.md) - no coding required.

### Q: Do I need to know how to code to understand this guide?
**A:** Not for most chapters. Chapters 0-10 teach GitHub concepts without requiring code knowledge. Chapters 5 and 11-16 introduce programming tools and concepts but explain them for beginners. If you are non-technical, you can skip code examples and still understand the workflows.

### Q: How long will this take?
**A:** Depends on your path:
- **Core path (Day 1 only):** ~7.5 hours of structured time
- **Full curriculum (Day 1 + Day 2):** ~15 hours total
- **Just the essentials:** 3-4 hours (Chapters 0, 1, 4, 6)
- **Self-paced:** Read at your own speed - there is no timer

### Q: Can I do this workshop on my own, or do I need a group?
**A:** You can do most of the workshop solo. The chapters, exercises, and appendices are self-contained. A few exercises in the Learning Room (Chapter 3) involve peer review and are designed for groups, but you can still practice the individual challenges on your own.

### Q: What is the difference between Day 1 and Day 2?
**A:** Day 1 uses the GitHub web interface only - everything happens in your browser. Day 2 moves to VS Code on the desktop and introduces GitHub Copilot and Accessibility Agents. Day 1 skills are prerequisite for Day 2 - the agents only make sense when you understand what they automate.

### Q: Is there a certificate or badge for completing this workshop?
**A:** The GitHub Skills modules (used during Day 1) award completion badges on your GitHub profile. These are visible to anyone who visits your profile. The workshop itself does not issue a separate certificate, but your merged PR to `community-access/accessibility-agents` on Day 2 is permanent proof of contribution.

### Q: Where can I find the course outline and table of contents?
**A:** See the [Course Guide](docs/course-guide.md) for the full table of contents, chapter sequence, timing, and exercises at a glance.


## Is This For Me?

### Q: I am a complete beginner to GitHub. Where do I start?
**A:** Start with [Chapter 0 (Pre-Workshop Setup)](docs/00-pre-workshop-setup.md) to install tools, then [Chapter 1 (Understanding GitHub Web Structure)](docs/02-understanding-github.md). Both assume zero prior knowledge.

### Q: I use GitHub at work but do not understand how to use it well. Can this help?
**A:** Yes. [Chapter 4 (Working with Issues)](docs/05-working-with-issues.md) and [Chapter 6 (Working with Pull Requests)](docs/06-working-with-pull-requests.md) will deepen your understanding. Then jump to [Chapter 14 (Accessible Code Review)](docs/15-code-review.md) for best practices.

### Q: I am a maintainer of an open-source project. What should I read?
**A:** [Chapter 9 (Labels, Milestones & Projects)](docs/09-labels-milestones-projects.md) → [Chapter 15 (Issue Templates)](docs/17-issue-templates.md) → [Chapter 16 (Accessibility Agents)](docs/19-accessibility-agents.md). These focus on organizing projects and automating common tasks.

### Q: I am teaching GitHub to a group. Do I need to know everything?
**A:** Yes, read the full curriculum first. Also read [FACILITATOR.md](FACILITATOR.md), [DAY1_AGENDA.md](DAY1_AGENDA.md), and [DAY2_AGENDA.md](DAY2_AGENDA.md) for lesson plans and pacing tips.

### Q: I use screen readers (NVDA, JAWS, or VoiceOver). Is this guide accessible?
**A:** Yes. This guide was designed for screen reader users from the beginning. Every chapter includes screen reader instructions and keyboard-only workflows. Start with [Appendix B (Screen Reader Cheat Sheet)](docs/appendix-b-screen-reader-cheatsheet.md) for a quick command reference.

### Q: I am sighted. Can I still use this workshop?
**A:** Absolutely. All content is keyboard-navigable. Sighted participants benefit from the same structured approach to GitHub, and the accessibility-first perspective teaches habits that make all collaboration better.

### Q: I am not a native English speaker. Can I understand this?
**A:** All technical terms are defined in [Appendix A (Glossary)](docs/appendix-a-glossary.md). The language is intentionally simple and direct. If anything is unclear, open an issue on GitHub or check [QUICK_REFERENCE.md](QUICK_REFERENCE.md).

### Q: I only have a few hours. What is the minimum I should read?
**A:** Read Chapters 0, 1, 4, and 6. That covers setup, GitHub structure, issues, and pull requests - enough to start contributing to any project.


## Getting Started

### Q: I installed Git, but I am getting "git: command not found". What do I do?
**A:** See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) → "Problem: Git is not installed". It has platform-specific steps for Windows, macOS, and Linux.

### Q: I created a GitHub account, but I cannot clone repositories. Why?
**A:** You likely need to set up authentication (SSH key or HTTPS personal access token). See [Chapter 0 (Pre-Workshop Setup)](docs/00-pre-workshop-setup.md) or [Appendix D (Git Authentication)](docs/appendix-d-git-authentication.md).

### Q: Do I need to understand branching and merging before starting?
**A:** No. Branching is covered in [Chapter 6 (Pull Requests)](docs/06-working-with-pull-requests.md) and merge conflicts are covered in [Chapter 7](docs/07-merge-conflicts.md). You learn as you go.

### Q: What software do I need to install before Day 1?
**A:** For Day 1 (browser only):
- A modern web browser (Chrome, Edge, Firefox, or Safari)
- Git (for cloning repositories)
- A GitHub account (free tier is fine)

For Day 2 (VS Code):
- Visual Studio Code
- GitHub Copilot and Copilot Chat extensions
- GitHub Pull Requests and Issues extension

Full instructions: [Chapter 0 (Pre-Workshop Setup)](docs/00-pre-workshop-setup.md)

### Q: Which browser works best with screen readers?
**A:**
- **NVDA:** Firefox or Chrome both work well. Firefox has slightly better ARIA support.
- **JAWS:** Chrome or Edge are recommended. JAWS has strong support for Chromium-based browsers.
- **VoiceOver:** Safari is the most compatible browser on macOS.

### Q: Do I need a paid GitHub account?
**A:** No. A free GitHub account is sufficient for everything in this workshop, including creating repositories, filing issues, opening pull requests, and participating in discussions. GitHub Copilot has a free tier with limited usage, but a paid subscription (~$10/month) provides full access for Day 2 content.

### Q: Can I use a Chromebook or tablet?
**A:** Day 1 (browser-based) works on any device with a modern browser and a keyboard. Day 2 requires Visual Studio Code, which runs on Windows, macOS, and Linux desktops. If you have a Chromebook, consider [GitHub Codespaces](docs/appendix-j-cloud-editors.md) as an alternative to a local VS Code install.


## Screen Readers and Accessibility

### Q: Which screen readers are supported?
**A:** The workshop is tested with:
- **NVDA 2025.3.3** on Windows
- **JAWS 2026** on Windows
- **VoiceOver** on macOS Sonoma and later

Other screen readers (Narrator, Orca, BRLTTY) may work but are not tested.

### Q: Do I need to change any screen reader settings before starting?
**A:** The main thing to verify is:
- **Browse mode** (also called virtual mode or document mode) should be active for web navigation
- **Hovercards** should be turned off in GitHub settings (they interfere with screen reader navigation)

Detailed setup is in [Chapter 0 (Pre-Workshop Setup)](docs/00-pre-workshop-setup.md), Step 4.

### Q: What is the difference between Browse Mode and Focus Mode?
**A:** 
- **Browse Mode** (virtual/document mode): Your screen reader intercepts keystrokes and uses them for navigation (H for headings, B for buttons, K for links). Use this when reading web pages.
- **Focus Mode** (forms/application mode): Keystrokes go directly to the web page or application. Use this when typing in text fields, dropdown menus, or interactive widgets.
- **Toggle:** NVDA uses `NVDA+Space`, JAWS toggles automatically (or `Insert+Z` to force), VoiceOver uses `VO+Shift+F5`.

### Q: GitHub is not announcing headings or landmarks. What is wrong?
**A:** Several possible causes:
1. You may be in Focus Mode instead of Browse Mode - press `NVDA+Space` (NVDA) or `Insert+Z` (JAWS) to toggle
2. Hovercards may be enabled - go to GitHub Settings → Accessibility → turn off "Hovercards"
3. The page may not have loaded fully - wait a few seconds and try again
4. See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) → "Screen Readers & Accessibility" for more solutions

### Q: Can I use a braille display?
**A:** Yes. NVDA and JAWS both support braille output. The workshop documents render as standard text. VS Code supports braille through your screen reader's braille driver. No special configuration is needed beyond your normal braille setup.

### Q: What keyboard shortcuts do I need to know?
**A:** The most important ones:
- `H` - Jump to next heading (Browse Mode)
- `D` - Jump to next landmark
- `B` - Jump to next button
- `K` - Jump to next link
- `F` - Jump to next form field
- `Tab` - Move to next interactive element
- `Ctrl+Enter` - Submit text on GitHub
- `NVDA+F7` / `Insert+F3` / `VO+U` - Elements List / Rotor

Full reference: [Appendix B (Screen Reader Cheat Sheet)](docs/appendix-b-screen-reader-cheatsheet.md)

### Q: How do I navigate tables with a screen reader?
**A:**
- **NVDA:** `T` jumps to next table. Once inside, use `Ctrl+Alt+Arrow keys` to move between cells.
- **JAWS:** `T` jumps to next table. `Ctrl+Alt+Arrow keys` within cells.
- **VoiceOver:** `VO+Right/Left` through cells, or use the Rotor (`VO+U`) set to "Tables."

### Q: Can I zoom in or increase font size without breaking the layout?
**A:** Yes. GitHub's web interface is responsive. Use `Ctrl++` (or `Cmd++` on Mac) to zoom in. The HTML versions of workshop documents (in the `html/` folder) are also responsive and work at any zoom level.

### Q: How do I know if a page element is interactive?
**A:** Your screen reader announces the role of each element - "button," "link," "edit text," "checkbox," etc. If it announces "clickable" without a more specific role, it may not be fully accessible. In that case, try `Enter` or `Space` to activate it.


## GitHub Accounts and Authentication

### Q: I forgot my GitHub password. How do I reset it?
**A:** Go to https://github.com/password_reset, enter your email, and follow the reset link. If you use two-factor authentication (2FA) and lost access to your second factor, see GitHub's [account recovery documentation](https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa/recovering-your-account-if-you-lose-your-2fa-credentials).

### Q: Should I use SSH or HTTPS for Git authentication?
**A:**
- **SSH:** More secure, no password prompts after setup, recommended for regular use
- **HTTPS with Personal Access Token:** Easier initial setup, works through corporate firewalls that block SSH
- **Recommendation:** Use SSH if you can. See [Appendix D (Git Authentication)](docs/appendix-d-git-authentication.md) for setup instructions for both.

### Q: What is a Personal Access Token (PAT) and why do I need one?
**A:** GitHub no longer allows password authentication for Git operations over HTTPS. A PAT is a generated string that replaces your password. Create one at https://github.com/settings/tokens. Give it `repo` scope for full repository access. Treat it like a password - do not share it.

### Q: How do I store my credentials so I do not have to enter them every time?
**A:**
- **Windows:** `git config --global credential.helper manager` (stores securely in Windows Credential Manager)
- **macOS:** `git config --global credential.helper osxkeychain` (stores securely in Keychain)
- **Linux:** `git config --global credential.helper cache` (temporary - expires after 15 minutes by default) or use a keyring-based helper

Never use `credential.helper store` on shared or multi-user systems - it saves credentials in plaintext.

### Q: How do I set up two-factor authentication?
**A:** Go to https://github.com/settings/security → "Enable two-factor authentication." GitHub supports authenticator apps (recommended), security keys, and SMS. After enabling 2FA, you will need recovery codes - save them somewhere safe.

Security note: We strongly recommend enabling 2FA on your GitHub account. If you cannot enable 2FA, you may still participate by adding an SSH key or creating a Personal Access Token (PAT) with `repo` scope for Git operations. Contact the workshop organizers if you need help.

### Q: My organization uses SSO (Single Sign-On). Does that affect anything?
**A:** Yes. After authenticating with SSO, you may need to authorize your SSH key or PAT for that organization. Go to https://github.com/settings/tokens → find your token → click "Configure SSO" → authorize for your org.


## Navigating GitHub on the Web

### Q: What are the main sections of a GitHub repository page?
**A:** Every repository has these tabs:
- **Code** - File tree, README, branch selector
- **Issues** - Bug reports, feature requests, discussions
- **Pull Requests** - Proposed changes waiting for review
- **Actions** - Automated workflows (CI/CD)
- **Projects** - Project boards for organizing work
- **Settings** - Repository configuration (owner/admin only)

Navigate between tabs using the `D` key to find the "Repository navigation" landmark, then arrow through the tabs.

### Q: How do I quickly find a file in a repository?
**A:** Press `T` on any repository page to open the file finder. Start typing the filename - results filter as you type. Press `Enter` to open the file. This works with your screen reader in Browse Mode.

### Q: How do I read a file on GitHub?
**A:** Navigate to the file in the Code tab and click (or press Enter) on its name. The file opens in a rendered view (for Markdown) or a code view (for code files). Use `H` to navigate headings in Markdown files.

### Q: How do I switch branches?
**A:** On the Code tab, find the branch selector button (it shows the current branch name, usually "main"). Press `Enter` to open it, type the branch name, and select from the filtered list. Screen reader tip: use `B` to find the button.

### Q: What are GitHub keyboard shortcuts?
**A:** GitHub has built-in keyboard shortcuts. Press `?` on any GitHub page to see the full list. Key shortcuts:
- `G` then `I` - Go to Issues
- `G` then `P` - Go to Pull Requests
- `T` - Open file finder
- `.` - Open the repository in github.dev (VS Code in your browser)
- `/` - Focus the search bar

Full reference: [Appendix B (Screen Reader Cheat Sheet)](docs/appendix-b-screen-reader-cheatsheet.md)

### Q: Why does GitHub look different from what the guide describes?
**A:** GitHub regularly updates its interface. The core structure (tabs, headings, landmarks) remains consistent, but specific button labels or layout may change. If something does not match the guide, navigate by role (use `B` for buttons, `H` for headings) rather than relying on exact position.

### Q: How do I use GitHub search effectively?
**A:** Use the search bar (`/` to focus it) with qualifiers:
- `is:issue is:open label:bug` - Find open bug issues
- `is:pr is:open review-requested:@me` - Find PRs awaiting your review
- `language:python stars:>100` - Find popular Python repositories

Full reference: [Appendix J (Advanced Search)](docs/appendix-n-advanced-search.md)


## Issues

### Q: What is the difference between an issue and a pull request?
**A:**
- **Issue** = A problem or request (e.g., "Fix login bug" or "Add dark mode")
- **Pull request** = Your solution - the actual changed code or documentation that fixes the issue
- An issue describes what needs to happen. A PR makes it happen.
- See [Chapter 4](docs/05-working-with-issues.md) for issues and [Chapter 6](docs/06-working-with-pull-requests.md) for PRs.

### Q: How do I know if I should open an issue or a PR?
**A:**
- **Open an issue if:** You found a bug, want to suggest a feature, have a question, or want to discuss something
- **Open a PR if:** You already have the changes ready to fix or improve something
- **Both?** Open the issue first, discuss with maintainers, then open a PR that references the issue

### Q: How do I file a good issue?
**A:** A good issue includes:
1. **Clear title** - Describe the problem, not the solution ("Screen reader skips navigation landmark" not "Fix thing")
2. **Steps to reproduce** - What did you do? What happened? What did you expect?
3. **Environment** - Your operating system, browser, screen reader, and versions
4. **Screenshots or recordings** - If possible and relevant
5. **Labels** - Apply the most relevant label (bug, enhancement, accessibility, etc.)

### Q: What is a "good first issue"?
**A:** A label that maintainers add to issues that are suitable for first-time contributors. These issues are typically well-defined, small in scope, and have clear instructions. Filter for them: Issues tab → filter by label → `good first issue`.

### Q: How do I reference a specific issue in a comment?
**A:** Type `#` followed by the issue number (e.g., `#42`). GitHub auto-links it. For issues in other repositories, use the full format: `owner/repo#42`.

### Q: How do I close an issue automatically when a PR is merged?
**A:** Include one of these keywords followed by the issue number in your PR description:
- `Closes #42`
- `Fixes #42`
- `Resolves #42`

When the PR is merged, the issue closes automatically.

### Q: Can I reopen a closed issue?
**A:** Yes. Navigate to the closed issue and click "Reopen issue." Only people with write access to the repository can reopen issues filed by others.

### Q: How do I subscribe to or unsubscribe from an issue?
**A:** On the issue sidebar, find the "Notifications" section. Click "Subscribe" to get notified of all comments, or "Unsubscribe" to stop notifications. You are automatically subscribed to issues you create or comment on.


## Pull Requests

### Q: What is a pull request, and why is it called that?
**A:**
- A pull request (PR) asks the maintainer to "pull" your changes into their repository
- Literally: "I have changes on my branch. Please pull them into the main branch."
- GitLab calls the same concept a "merge request"
- See [Chapter 6 (Working with Pull Requests)](docs/06-working-with-pull-requests.md)

### Q: What are the three tabs of a pull request?
**A:**
1. **Conversation** - Title, description, comments, timeline, status checks
2. **Commits** - Individual commits in the PR, with author and message
3. **Files Changed** - The diff showing every line added, modified, or removed

Navigate between tabs using your screen reader's heading navigation or landmark navigation.

### Q: How long does it take to get PR feedback?
**A:** Depends on the project:
- **Your organization's repo:** Hours to a few days
- **Active open-source projects:** Days to a week
- **Smaller projects:** Could be weeks
- Check the project's `CONTRIBUTING.md` for estimated review times

### Q: What does "merge" mean?
**A:** Combining two branches of code. After your PR is approved, it is "merged" into the main branch. Your changes become part of the official codebase.

### Q: What are the different merge strategies?
**A:**
- **Merge commit:** Creates a merge commit that ties the two branches together. Preserves full history.
- **Squash and merge:** Combines all your PR's commits into one commit on main. Cleaner history.
- **Rebase and merge:** Replays your commits on top of main. Linear history, no merge commits.
- **Which to use:** Follow the project's convention. When in doubt, "Squash and merge" is usually safe.

### Q: My PR says "This branch has conflicts that must be resolved." What do I do?
**A:** See [Chapter 7 (Merge Conflicts)](docs/07-merge-conflicts.md). In short:
1. Pull the latest main: `git pull upstream main`
2. Merge main into your branch: `git merge main`
3. Resolve the conflicts in your editor
4. Commit and push the resolution

### Q: How do I update my PR with new changes?
**A:** Just push more commits to the same branch. The PR updates automatically. No need to close and reopen.

### Q: How do I request a review on my PR?
**A:** On the PR page, find the "Reviewers" section in the sidebar. Click the gear icon and select reviewers. They will be notified.

### Q: What does "draft pull request" mean?
**A:** A draft PR signals that your work is not ready for review yet. Reviewers can still look at it, but it cannot be merged. When ready, click "Ready for review" to convert it. Use drafts for work-in-progress when you want early feedback.

### Q: Can I edit someone else's PR?
**A:** Only if the PR author checked "Allow edits from maintainers" and you have write access to the target repository. Otherwise, you can suggest changes in a review comment using the suggestion feature.


## Merge Conflicts

### Q: What is a merge conflict?
**A:** A merge conflict happens when two people edit the same lines of the same file on different branches. Git cannot decide which version to keep, so it asks you to choose. It is not an error - it is a normal part of collaboration.

### Q: How do I recognize a merge conflict?
**A:** Git marks the conflicting sections with these markers:

```text
<<<<<<< HEAD
Your changes
=======
Their changes
>>>>>>> branch-name
```
Your screen reader will read these markers as text. See [Chapter 7](docs/07-merge-conflicts.md) for how to interpret them.

### Q: How do I resolve a merge conflict?
**A:** Three approaches:
1. **Keep your changes:** Delete their version and the markers
2. **Keep their changes:** Delete your version and the markers
3. **Combine both:** Edit the file to include the best of both, then delete the markers

After resolving: `git add [filename]` → `git commit -m "Resolved merge conflict"`

### Q: Can I abort a merge?
**A:** Yes. `git merge --abort` cancels the merge and returns your branch to its pre-merge state. Nothing is lost.

### Q: How do I prevent merge conflicts?
**A:** 
- Pull from main frequently: `git pull upstream main`
- Keep PRs small and focused (one change per PR)
- Communicate with your team about which files you are editing
- Avoid editing the same lines as someone else


## Branches and Forks

### Q: What is the difference between a fork and a branch?
**A:**
- **Fork** = Your complete separate copy of a repository, on your GitHub account
- **Branch** = A version of the code within a single repository
- **Use a fork to:** Contribute to someone else's open-source project
- **Use a branch to:** Work on features in your own repository or your org's repository

### Q: Why do I need to fork before contributing to open source?
**A:** You do not have write access to most open-source repositories. Forking creates your own copy where you can make changes freely. Then you open a PR from your fork to the original repository.

### Q: How do I keep my fork up to date with the original repository?
**A:**
1. Add the original as "upstream": `git remote add upstream https://github.com/ORIGINAL-OWNER/REPO.git`
2. Fetch upstream: `git fetch upstream`
3. Merge into your main: `git checkout main` → `git merge upstream/main`
4. Push to your fork: `git push origin main`

### Q: When should I create a new branch?
**A:** Always create a new branch before starting work on a change. Never commit directly to `main`. Name your branch descriptively: `fix/broken-link`, `feature/dark-mode`, `docs/update-readme`.

### Q: How do I delete a branch after my PR is merged?
**A:** 
- **On GitHub:** After merging, GitHub shows a "Delete branch" button on the PR page
- **Locally:** `git branch -d branch-name` (safe delete - only works if merged) or `git branch -D branch-name` (force delete)


## Markdown

### Q: What is Markdown?
**A:** A lightweight text formatting language. You write plain text with symbols (`#` for headings, `**` for bold, `- ` for lists), and GitHub renders it as formatted HTML. Every issue, PR, comment, and documentation file on GitHub uses Markdown.

### Q: What are the most important Markdown commands?
**A:**
| Syntax | Result |
|--------|--------|
| `# Heading 1` | Large heading |
| `## Heading 2` | Medium heading |
| `**bold**` | **bold** |
| `*italic*` | *italic* |
| `[text](url)` | A hyperlink |
| `` `code` `` | Inline code |
| `- item` | Bullet list |
| `1. item` | Numbered list |
| `> quote` | Blockquote |
| `- [ ] task` | Checkbox (task list) |

Full reference: [Appendix E (GitHub Flavored Markdown)](docs/appendix-c-markdown-reference.md)

### Q: How do I add a code block in Markdown?
**A:** Wrap code in triple backticks. Add a language name for syntax highlighting:
````
```python
print("Hello, world!")
```
````

### Q: How do I add a table in Markdown?
**A:**
```
| Column 1 | Column 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
```
The `|` characters create columns. The `---` row separates the header from the body.

### Q: What is GitHub Flavored Markdown (GFM)?
**A:** GitHub's extended version of Markdown that adds features like task lists (`- [ ]`), tables, strikethrough (`~~text~~`), autolinked URLs, emoji (`:smile:`), alert blocks, Mermaid diagrams, and math expressions. See [Appendix E](docs/appendix-c-markdown-reference.md).

### Q: How do I preview Markdown before submitting?
**A:** On GitHub, click the "Preview" tab above any text input area. In VS Code, press `Ctrl+Shift+V` to open Markdown preview in a new tab, or `Ctrl+K V` for a side-by-side preview.


## Labels, Milestones, and Projects

### Q: What are labels for?
**A:** Labels categorize issues and PRs. Common labels: `bug`, `enhancement`, `documentation`, `good first issue`, `accessibility`, `help wanted`. They help maintainers prioritize and contributors find work. See [Chapter 9](docs/09-labels-milestones-projects.md).

### Q: How do I filter issues by label?
**A:** On the Issues tab, click "Labels" (or use the filter bar and type `label:bug`). You can combine labels: `label:bug label:accessibility` finds issues with both labels.

### Q: What is a milestone?
**A:** A grouping of issues and PRs that represent a goal or deadline (e.g., "v2.0 Release" or "Hackathon Day 1"). Milestones show a progress bar indicating how many items are complete.

### Q: What is a GitHub Project?
**A:** A flexible planning tool with boards (Kanban-style columns), tables, and roadmaps. You can add issues and PRs from multiple repositories. See [Appendix I (GitHub Projects Deep Dive)](docs/appendix-r-projects-deep-dive.md).


## Notifications

### Q: How do I manage GitHub notifications without being overwhelmed?
**A:**
1. Go to https://github.com/notifications
2. Use filters: Unread, Participating, @mentioned, Assigned
3. Mark threads as "Done" (`E` keyboard shortcut) to clear them
4. Set watch preferences per repository: "Participating and @mentions" is usually best
5. Configure email preferences at https://github.com/settings/notifications

See [Chapter 10 (Notifications)](docs/10-notifications-and-day-1-close.md).

### Q: What is the difference between "Watching," "Participating," and "@mentioned"?
**A:**
- **Watching:** You receive notifications for all activity on the repository
- **Participating:** You are notified about issues/PRs you have commented on or been assigned to
- **@mentioned:** Someone tagged you specifically with `@your-username`

### Q: How do I stop getting email notifications?
**A:** Go to https://github.com/settings/notifications → uncheck "Email" under the notification types you want to silence.

### Q: How do I navigate notifications with a screen reader?
**A:** On the notifications page:
- `H` to jump between notification groups (by repository)
- `K` to move between individual notifications
- `E` to mark as Done from the list
- `Shift+I` to mark as Read
- `Enter` to open the linked issue or PR


## VS Code

### Q: Why do we use VS Code instead of another editor?
**A:** VS Code has the best built-in accessibility support of any mainstream code editor: dedicated screen reader mode, Accessible Help dialog, Accessible View, Accessible Diff Viewer, and audio cues for editor events. It also has first-party GitHub and Copilot integration.

### Q: What is github.dev?
**A:** VS Code running in your browser - no installation needed. Press `.` on any GitHub repository to open it in github.dev. The keyboard shortcuts and screen reader mode are identical to desktop VS Code. github.dev cannot run a terminal, Copilot agents, or local extensions - that is what desktop VS Code adds.

### Q: How do I enable screen reader mode in VS Code?
**A:** VS Code detects NVDA and JAWS automatically. If it does not, press `Shift+Alt+F1` to manually enable screen reader mode. Verify: `Ctrl+Shift+P` → type "accessibility" → look for "Toggle Screen Reader Accessibility Mode" with a checkmark.

### Q: What are the most important VS Code keyboard shortcuts?
**A:**
| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+P` | Command Palette - search for any command |
| `Ctrl+P` | Quick Open - search for any file |
| `Ctrl+Shift+E` | Explorer sidebar (file tree) |
| `Ctrl+Shift+G` | Source Control panel |
| `Ctrl+Shift+I` | Open Copilot Chat |
| `Ctrl+` (backtick) | Toggle terminal |
| `Ctrl+,` | Open Settings |
| `F7` | Accessible Diff Viewer |
| `Alt+F2` | Accessible View |
| `Shift+Alt+F1` | Toggle screen reader mode |

Full reference: [Appendix M (VS Code Accessibility Reference)](docs/appendix-g-vscode-reference.md)

### Q: VS Code extensions are not loading or crashing. What do I do?
**A:** See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) → "VS Code extensions not loading." Quick fix: `Ctrl+Shift+P` → "Developer: Reload Window." If that does not work, check the Output panel (View → Output → select the extension name from the dropdown) for error messages.

### Q: How do I navigate the VS Code sidebar with a screen reader?
**A:** The sidebar has five main views, each with a keyboard shortcut:
- `Ctrl+Shift+E` - Explorer (files)
- `Ctrl+Shift+F` - Search
- `Ctrl+Shift+G` - Source Control
- `Ctrl+Shift+D` - Debug
- `Ctrl+Shift+X` - Extensions

Within each view, use `Tab`, `Arrow keys`, and `Enter` to navigate.

### Q: What is the Accessible View and when should I use it?
**A:** Press `Alt+F2` to open the Accessible View. It renders any VS Code content (Copilot Chat responses, hover tooltips, notifications) as a plain text document that your screen reader can read naturally. Use it whenever VS Code's default rendering is hard to navigate.

### Q: What are audio cues (accessibility signals) in VS Code?
**A:** VS Code can play short sounds for events like errors, warnings, breakpoints, and diff changes. Configure them at Settings → search `accessibility.signals`. Each signal can be set to "on," "off," or "auto" (only when a screen reader is detected). See [Appendix M](docs/appendix-g-vscode-reference.md).


## Git and Source Control in VS Code

### Q: How do I clone a repository in VS Code?
**A:** `Ctrl+Shift+P` → type "Git: Clone" → paste the repository URL → choose a local folder → VS Code opens the cloned repo.

### Q: How do I commit changes in VS Code?
**A:**
1. Make your changes in the editor
2. Open Source Control: `Ctrl+Shift+G`
3. Review changed files (they appear in "Changes")
4. Stage files: select a file and press `+` (or right-click → "Stage Changes")
5. Type your commit message in the text box
6. Press `Ctrl+Enter` to commit

### Q: How do I push my commits to GitHub?
**A:** After committing, click "Sync Changes" in the Source Control panel (or run `Ctrl+Shift+P` → "Git: Push"). If your branch is not yet on GitHub, VS Code will ask to publish it.

### Q: How do I create a new branch in VS Code?
**A:** Click the branch name in the bottom-left status bar (or `Ctrl+Shift+P` → "Git: Create Branch"). Type the new branch name and press Enter. VS Code switches to the new branch automatically.

### Q: What is the Source Control panel telling me?
**A:** The Source Control panel (`Ctrl+Shift+G`) shows:
- **Changes** - Files you have modified but not staged
- **Staged Changes** - Files ready to be committed
- **Merge Changes** - Files with merge conflicts (if any)
- The commit message input box
- Buttons for Commit, Sync, and more

### Q: How do I view a diff in VS Code?
**A:** In the Source Control panel, click any changed file. VS Code opens a side-by-side diff view. For accessible navigation, press `F7` to open the Accessible Diff Viewer, which reads changes sequentially.


## GitHub Copilot

### Q: What is GitHub Copilot?
**A:** An AI-powered coding assistant that runs inside VS Code. It offers two main features:
1. **Inline suggestions** - Copilot predicts what you will type next and offers completions. Press `Tab` to accept.
2. **Copilot Chat** - A conversational interface (`Ctrl+Shift+I`) where you can ask questions, get explanations, and generate content.

See [Chapter 13 (GitHub Copilot)](docs/16-github-copilot.md).

### Q: Do I need a paid subscription to use Copilot?
**A:** GitHub Copilot now offers a free tier with limited usage. For full access including chat and agents, you need:
- **Copilot Individual:** ~$10/month or $100/year
- **Copilot Business/Enterprise:** Through your organization
- **Students/Educators:** Free access at https://education.github.com/

### Q: How do I open Copilot Chat?
**A:** Press `Ctrl+Shift+I`. The Chat panel opens as a sidebar. Type your question and press Enter. Use `Alt+F2` (Accessible View) to read Copilot's response with your screen reader.

### Q: How do I know what Copilot said? The response is hard to read with my screen reader.
**A:** Press `Alt+F2` to open the Accessible View. This renders Copilot's response as plain text that your screen reader can read sequentially. This is the recommended workflow for screen reader users.

### Q: Can Copilot write entire files for me?
**A:** Copilot can generate significant amounts of code or documentation, but you should always review and edit its output. Copilot is a writing partner, not a replacement for your judgment. Its output may contain errors, outdated information, or tone mismatches.

### Q: What are chat participants?
**A:** Prefixes like `@workspace`, `@vscode`, `@terminal` that tell Copilot to focus on a specific context:
- `@workspace` - Ask about your entire project
- `@vscode` - Ask about VS Code settings and commands
- `@terminal` - Ask about terminal commands
- Agent names like `@daily-briefing` - Use a specific Accessibility Agents agent

### Q: What are slash commands in Copilot Chat?
**A:** Commands starting with `/` that trigger specific behaviors:
- `/explain` - Explain the selected code
- `/fix` - Suggest a fix for the selected code
- `/tests` - Generate tests
- `/doc` - Generate documentation
- Custom commands from Accessibility Agents (28 available)

Full reference: [Appendix W (GitHub Copilot Reference)](docs/appendix-k-copilot-reference.md)

### Q: Copilot Chat is not responding or freezing. What do I do?
**A:** See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) → "Copilot Chat freezes or stops responding." Quick fix: Close the chat panel, reopen with `Ctrl+Shift+I`. Check your internet connection and Copilot subscription status.

### Q: Can I choose which AI model Copilot uses?
**A:** Yes. In Copilot Chat, click the model selector (announced by your screen reader near the input field) to choose from available models. Different models have different strengths. See [Appendix X (Copilot AI Models)](docs/appendix-k-copilot-reference.md).


## Accessibility Agents

### Q: What is Accessibility Agents?
**A:** An ecosystem of **55 AI-powered agents** organized into three teams (Accessibility, GitHub Workflow, Developer Tools), running on five platforms. It includes 54+ slash commands and is an MIT-licensed open-source project at `community-access/accessibility-agents` that you will fork, use, and contribute to during the workshop. See [Chapter 16 (Accessibility Agents)](docs/19-accessibility-agents.md).

### Q: What agents are available?
**A:** The ecosystem spans three teams:

| Team | Agents | Focus |
|------|--------|-------|
| Accessibility | 26 | Web, document, mobile, ePub auditing and remediation |
| GitHub Workflow | 12 | Issue triage, PR review, analytics, templates, repo management |
| Developer Tools | 6 | Python, desktop, wxPython accessibility patterns |

See [Appendix V](docs/appendix-l-agents-reference.md) for the complete list of all 55 agents.

### Q: Do I need to install anything to use agents?
**A:** No separate installation. Agents are defined as `.agent.md` files in your repository's `.github/agents/` folder. When you fork `accessibility-agents`, the agents come with it. You need GitHub Copilot (paid subscription) for agents to function.

### Q: Can I use agents without understanding GitHub first?
**A:** The agents automate skills you learn in the workshop. Using them without understanding what they do is like using a calculator without understanding math - you cannot tell when it is wrong. That is why Day 1 comes first.

### Q: How do I personalize agents for my own repositories?
**A:** Copy `.github/agents/preferences.example.md` to `.github/agents/preferences.md` and edit it with your GitHub username, preferred repositories, and output format preferences.

### Q: Can I create my own agents?
**A:** Yes. Create a new `.agent.md` file in `.github/agents/` following the existing file format. The file is plain Markdown with YAML frontmatter. See [Appendix V (Accessibility Agents Reference)](docs/appendix-l-agents-reference.md).


## Issue Templates

### Q: What is an issue template and why should I care?
**A:** Templates guide people to provide the right information when filing issues. Well-structured templates save time for maintainers and help screen reader users navigate the form. See [Chapter 15 (Issue Templates)](docs/17-issue-templates.md).

### Q: My template does not show up when I click "New Issue." What is wrong?
**A:** Check:
1. The file is in `.github/ISSUE_TEMPLATE/your-template.yml` (not `.md`, not in the wrong folder)
2. The YAML syntax is valid (check at https://www.yamllint.com/)
3. The file is committed to the `main` branch
4. Try a hard browser refresh: `Ctrl+Shift+R`

See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) → "Template not showing in GitHub" for full diagnostics.

### Q: What is YAML and why is it used for templates?
**A:** YAML is a simple format for writing structured data - easier to read than JSON or XML. GitHub uses it for issue form templates because it is human-readable and supports validation. You do not need to be an expert - [Chapter 15](docs/17-issue-templates.md) teaches you everything you need.

### Q: Can I use the @template-builder agent to create templates?
**A:** Yes. The `@template-builder` agent in Copilot Chat walks you through creating templates interactively. It asks questions and generates the YAML for you. See [Chapter 16 (Accessibility Agents)](docs/19-accessibility-agents.md).


## Code Review

### Q: What makes code review "accessible"?
**A:** Accessible code review means:
- Using keyboard shortcuts instead of mouse
- Testing that diffs are screen reader navigable
- Writing descriptive review comments (not just "LGTM")
- Using the Accessible Diff Viewer (`F7`) in VS Code
- See [Chapter 14 (Accessible Code Review)](docs/15-code-review.md)

### Q: How do I read a diff with a screen reader?
**A:** Two approaches:
1. **On GitHub:** Navigate to the Files Changed tab. Use arrow keys to move through lines. Added lines start with `+`, removed lines start with `-`.
2. **In VS Code:** Open the changed file in the Source Control panel, then press `F7` to open the Accessible Diff Viewer. It reads changes sequentially and announces whether each change is an addition, deletion, or modification.

### Q: What is a good review comment?
**A:** A useful comment includes:
1. **What** you noticed
2. **Why** it matters
3. **A suggestion** (optional but helpful)

Example: "The `alt` attribute on this image is empty. Screen readers will skip it entirely, which means blind users miss the chart. A description like 'Bar chart showing monthly downloads' would help."

### Q: What does "LGTM" mean?
**A:** "Looks Good To Me" - a common shorthand for approval. However, a more descriptive comment explaining what you checked is more helpful, especially for the PR author's learning.

### Q: What is the difference between "Comment," "Approve," and "Request Changes"?
**A:**
- **Comment:** General feedback, no explicit approval or rejection
- **Approve:** You are satisfied the changes are ready to merge
- **Request Changes:** You have identified issues that must be fixed before merging


## The Learning Room

### Q: What is the Learning Room?
**A:** A private Learning Room repository created for you by GitHub Classroom. It contains intentionally incomplete documents, accessibility issues, challenge issues, and automated feedback workflows. See [Chapter 4 (The Learning Room)](docs/04-the-learning-room.md).

### Q: What are the challenges?
**A:** The workshop has 21 challenges:
- **16 core challenges** - Progressive tasks across two days covering issues, PRs, branches, merge conflicts, code review, Copilot, issue templates, and agents
- **5 bonus challenges** - Optional stretch goals including accessibility audits, mentoring peers, and cross-repo contributions

Details in `docs/CHALLENGES.md`.

### Q: How does the bot feedback work?
**A:** When you open a PR in the Learning Room, an automated bot reviews your changes within about 30 seconds. It checks for broken links, heading hierarchy, image descriptions, link text quality, and formatting. Every issue includes an explanation of why it matters and how to fix it.

### Q: Can I practice in the Learning Room on my own?
**A:** Yes. Fork the repository, and the individual challenges work in your fork. Group challenges are designed for a live session but you can still practice the technical steps solo.


## Workshop Logistics

### Q: What if I fall behind the group?
**A:** This is completely normal. Each chapter is self-contained - you can continue at your own pace. The facilitator will provide catch-up guidance during breaks. The GitHub Skills modules (Day 1) are yours permanently - Mona is always waiting for you.

### Q: Can I take breaks?
**A:** Yes. Screen reader listening is cognitively demanding work. The schedule includes regular breaks. Take additional breaks whenever you need them.

### Q: Do I need to attend both days?
**A:** Day 1 is self-contained - you can use GitHub confidently after completing it alone. Day 2 builds on Day 1 and requires its skills. You cannot meaningfully attend Day 2 without Day 1.

### Q: Can I work ahead?
**A:** Yes. The chapters are designed to be read sequentially, but nothing stops you from reading ahead. Just be aware that some Day 2 exercises depend on having completed Day 1 activities.

### Q: I missed a session. Can I catch up?
**A:** Yes. All materials are in the repository and can be read at any time. The GitHub Skills modules are available indefinitely. The only thing you miss is live interaction and facilitated group exercises.

### Q: What if I have accessibility needs not covered by the workshop setup?
**A:** Contact the facilitator. This workshop is designed for flexibility - if you need a specific accommodation (higher contrast, different font size, alternative input method, longer break time), ask.


## After the Workshop

### Q: Can I contribute to this curriculum?
**A:** Yes. See [CONTRIBUTING.md](CONTRIBUTING.md) for how to submit improvements, suggest new topics, or fix issues.

### Q: I want to share this guide with my team. Can I?
**A:** Yes. The curriculum is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) - you are free to share and adapt with attribution required.

### Q: Can I modify the guide for my organization?
**A:** Yes. Fork this repository and customize it for your needs. Attribution to the original is required under CC BY 4.0.

### Q: How do I keep my fork up to date?
**A:**
```bash
git remote add upstream https://github.com/community-access/git-going-with-github.git
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```
Then rebuild the HTML: `npm run build:html`

### Q: Where can I continue learning after this workshop?
**A:**
- Contribute to open-source accessibility projects - see [Appendix T (Contributing to Open Source)](docs/08-open-source-culture.md)
- Explore [GitHub Skills](https://skills.github.com/) for more guided modules
- Browse the [GitHub Accessibility Discussions](https://github.com/orgs/community/discussions/categories/accessibility)
- Read our [Resources appendix](docs/appendix-x-resources.md) for comprehensive links

### Q: How do I download all the workshop materials for offline reading?
**A:** See [Appendix Y (Accessing Workshop Materials)](docs/appendix-y-workshop-materials.md) for complete instructions - clone via Git, download as ZIP, or read individual files on GitHub.com.


## Concepts and Terminology

### Q: What is the difference between a fork and a branch?
**A:**
- **Fork** = Your complete separate copy of a repository (on GitHub)
- **Branch** = A version of the code within a repository
- **Use fork to:** Contribute to someone else's open-source project
- **Use branch to:** Work on features in your own repository

See [Chapter 1](docs/02-understanding-github.md) for detailed explanation.

### Q: What is Git? How is it different from GitHub?
**A:**
- **Git** = A version control system that runs on your computer. It tracks changes to files over time.
- **GitHub** = A website and service that hosts Git repositories online and adds collaboration features (issues, PRs, Actions, etc.)
- Git works without GitHub. GitHub requires Git.

### Q: What is a repository?
**A:** A project folder tracked by Git. It contains your files plus the entire history of changes. On GitHub, a repository also includes issues, PRs, settings, and community features.

### Q: What is a commit?
**A:** A snapshot of your changes at a point in time. Each commit has a message describing what changed and why. Think of it as a save point with a note.

### Q: What is `main` (or `master`)?
**A:** The default branch of a repository - the official, current version of the project. New branches are created from `main`, and finished work is merged back into `main`. Older repositories may use `master` instead.

### Q: What is a diff?
**A:** A comparison showing what changed between two versions of a file. Added lines are marked with `+` (green), removed lines with `-` (red), and unchanged lines provide context. Screen readers announce additions and deletions.

### Q: What is CI/CD?
**A:** **Continuous Integration / Continuous Deployment** - automated systems that run tests, build code, and deploy software when you push changes. On GitHub, this is done through GitHub Actions. See [Appendix Q (GitHub Actions)](docs/appendix-q-actions-workflows.md).

### Q: What is WCAG?
**A:** **Web Content Accessibility Guidelines** - the international standard for web accessibility. WCAG 2.2 defines criteria in three levels: A (minimum), AA (recommended), and AAA (highest). See [Appendix C (Accessibility Standards Reference)](docs/appendix-m-accessibility-standards.md).

### Q: What is ARIA?
**A:** **Accessible Rich Internet Applications** - A set of HTML attributes that add accessibility information to web elements. For example, `aria-label` provides a text description for screen readers, and `role` identifies the purpose of an element (button, navigation, main content, etc.).


## Still Stuck?

This FAQ does not cover your question? Try these resources in order:

1. [**QUICK_REFERENCE.md**](QUICK_REFERENCE.md) - Commands, keyboard shortcuts, file locations
2. [**TROUBLESHOOTING.md**](TROUBLESHOOTING.md) - Common problems and step-by-step solutions
3. [**Appendix A (Glossary)**](docs/appendix-a-glossary.md) - Term definitions
4. [**Appendix B (Screen Reader Cheat Sheet)**](docs/appendix-b-screen-reader-cheatsheet.md) - NVDA, JAWS, VoiceOver keyboard commands
5. [**Appendix U (Resources)**](docs/appendix-x-resources.md) - External documentation and links
6. **GitHub Issues** - Search existing issues or [open a new one](../../issues)
7. [**FACILITATOR.md**](FACILITATOR.md) - If you are leading a workshop


*Last updated: May 2026*  
*Have more questions? Open an issue or discussion on GitHub!*
