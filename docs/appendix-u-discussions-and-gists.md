# Appendix U: Discussions and Gists

> This appendix consolidates two related community content features: GitHub Discussions (formerly Appendix G) and GitHub Gists (formerly Appendix F).
>
> **Teaching chapter:** [Chapter 08: Open Source Culture and Contributing](08-open-source-culture.md)

---

## GitHub Discussions


>
> **Listen to Episode 24:** [GitHub Discussions](../PODCASTS.md) - a conversational audio overview of this chapter. Listen before reading to preview the concepts, or after to reinforce what you learned.

## Forum-Style Conversations Beyond Issues and Pull Requests

> GitHub Discussions is a built-in community forum for repositories and organizations. It's where open-ended conversations live - questions, ideas, announcements, polls, and community Q&A - separate from the action-oriented world of issues and pull requests.


## Table of Contents

1. [Discussions vs. Issues: When to Use Which](#1-discussions-vs-issues-when-to-use-which)
2. [Navigating to Discussions](#2-navigating-to-discussions)
3. [Discussion Categories](#3-discussion-categories)
4. [Creating a Discussion](#4-creating-a-discussion)
5. [Participating in Discussions](#5-participating-in-discussions)
6. [Marking an Answer](#6-marking-an-answer)
7. [Polls](#7-polls)
8. [Screen Reader Navigation Reference](#8-screen-reader-navigation-reference)
9. [Organization-Level Discussions](#9-organization-level-discussions)
10. [Accessibility Agents: What's Different Here](#10-accessibility-agents-whats-different-here)


## 1. Discussions vs. Issues: When to Use Which

**Not every conversation belongs in an issue.** GitHub Discussions exists for the conversations that don't fit:

| Use Issues When | Use Discussions When |
| ---  | ---  |
| You found a bug | You have a question about how something works |
| You want to request a specific feature | You want to brainstorm ideas before filing a feature request |
| There is actionable work to be done | You want community input before deciding what work to do |
| You need to track progress (labels, assign, close) | You want to have an open conversation without resolving it |
| The answer is "fixed" or "won't fix" | The conversation might not have one right answer |

**The signal for maintainers:** A question in an issue is noisier - it implies something needs to be done. The same question in Discussions doesn't trigger workflow automation and doesn't inflate the issue count.

### Common Discussions categories you'll encounter

- **Q&A** - Support questions and answers (one answer can be marked correct)
- **Ideas** - Feature brainstorming before a formal feature request
- **Announcements** - Maintainer posts about releases, breaking changes, roadmaps
- **General** - Everything else
- **Show and Tell** - Community members showing what they built


## 2. Navigating to Discussions

### From a Repository

1. Navigate to the repository
2. There is a **Discussions** tab in the main navigation (alongside Code, Issues, Pull Requests, Actions, Projects)
3. Press `T` to navigate tab items, or `K` to navigate links and find "Discussions"
4. Press `Enter` to open

**If the tab is missing:** Discussions is an opt-in feature. The repository maintainer must enable it in Settings. Not all repositories use it.

### From an Organization

Large organizations can have organization-level Discussions separate from any individual repository:

1. Navigate to the organization page
2. Look for the Discussions tab at the organization level
3. These are community-wide conversations, not repo-specific


## 3. Discussion Categories

The Discussions home page is organized by category. Each category is a section with its own heading.

### Navigating categories

```text
3 → Jump to category headings
K → Navigate discussion titles within a category
Enter → Open a discussion
```

### The side panel (left or right depending on view width) shows

- All categories with item counts
- Pin/announcements section at top
- Most active discussions
- Tags (if the repo uses them)


## 4. Creating a Discussion

1. From the Discussions tab, activate **"New discussion"** button
2. Select a category (required - affects which fields appear)
3. Fill in:
   - **Title** - Clear and searchable. "How do I use the daily-briefing agent?" not "Help"
   - **Body** - Use Markdown. Same editor as issues
   - For **Q&A** category: phrase the title as a question
4. Activate **"Start discussion"**

### Screen reader path

```text
Tab to "New discussion" button → Enter
→ Category list: ↑/↓ to select category → Enter
→ Title field: type title
→ Tab to body: Focus Mode → type or paste content
→ Tab to "Start discussion" button → Enter
```

**Before posting a question:** Search existing discussions first. Use the search bar at the top of the Discussions page or GitHub's global search with `repo:owner/name in:discussions`.


## 5. Participating in Discussions

### Reading a Discussion

A discussion page is structured similarly to an issue:

- The original post at the top
- Replies in chronological order
- An "Answered" reply pinned to the top (Q&A category only)
- A reply editor at the bottom

#### Navigation

```text
H → Jump between the original post heading and reply headings
3 → Navigate individual reply headings
↓ → Read through content
```

### Replying to a Discussion

1. Navigate to the bottom of the page (or use the "Reply" button on a specific comment)
2. The reply text area behaves identically to issue comments
3. Focus Mode → type your reply
4. `Ctrl+Enter` to submit

### Replying to a Specific Comment (Nested Reply)

Each comment has a **Reply** button below it:

```text
Tab to "Reply" button on the specific comment → Enter
→ Nested text area opens under that comment
→ Focus Mode → type → Ctrl+Enter
```

### Upvoting

Instead of leaving "+1" comments, use the thumbs-up reaction on the original post or replies. Many maintainers sort discussion responses by upvotes to prioritize most-needed answers.


## 6. Marking an Answer

In the **Q&A** category, one reply can be marked as the accepted answer. This is similar to Stack Overflow's "accepted answer" mechanic.

**Only the discussion author and repository maintainers** can mark an answer.

### To mark an answer (as the discussion author)

1. Navigate to the reply you want to mark as the answer
2. Look for the **"Mark as answer"** button below the reply
3. Activate it - the reply is pinned to the top and the discussion shows a green "Answered" badge

**Why it matters:** Marked answers make Q&A discussions into searchable documentation. Anyone who searches for the same question later immediately sees the correct answer without reading the whole thread.

**To unmark an answer:** Activate "Unmark as answer" on the same reply.


## 7. Polls

Some discussion categories support embedded polls. A poll lets you gather structured vote data from the community.

### Creating a poll

1. When creating a discussion, look for the "Add a poll" option below the body editor
2. Type each poll option (up to 8 options)
3. Set poll duration (optional)
4. Submit the discussion - the poll appears inline

### Voting in a poll

```text
Navigate to the poll section
→ Radio buttons or checkboxes for each option
→ Space/Enter to vote
→ "Vote" button → Enter
```

**Poll results:** After voting, percentages appear next to each option. Screen readers announce the count and percentage per option.


## 8. Screen Reader Navigation Reference

### Discussions List

```text
T                     → Navigate tab bar to reach "Discussions" tab
H / 2                 → Category section headings
3                     → Individual discussion titles (h3 links)
K                     → Navigate all links (discussions, categories, pagination)
Enter                 → Open a discussion
/                     → Focus the search bar (if supported)
```

### Inside a Discussion

```text
H                     → Original post heading and top-level reply headings
3                     → Individual replies
↓                     → Read body content
Tab                   → Move to interactive elements (reply buttons, reactions, mark as answer)
Ctrl+Enter            → Submit a reply (when in text area)
```

#### NVDA note

- Browse mode (NVDA+Space) to read the discussion
- Enter application mode for the reply editor
- Discussion replies are `<article>` elements - NVDA announces "article" as you navigate with H

#### JAWS note

- `A` key navigates `<article>` elements - useful for jumping between replies
- Use Forms Mode for the reply editor

#### VoiceOver note

- VO+Right to read through content
- VO+Command+L to list all links (useful for navigating many replies quickly)
- VO+Space on the reply field to enter interaction mode


## 9. Organization-Level Discussions

Some organizations enable Discussions at the organization level, separate from any repository. These work identically to repository discussions but span the whole organization.

Common uses:

- Org-wide announcements
- Community introductions ("Introduce yourself" pinned thread)
- Cross-repo feature brainstorming
- Community spotlights and events

Find them at `github.com/ORGANIZATION/discussions`.


## 10. Accessibility Agents: What's Different Here

Accessibility Agents prompts currently operate on **issues, PRs, and code** - not directly on Discussions. If you want to respond to a discussion using Accessibility Agents:

1. Copy the discussion URL or content
2. Use `/issue-reply` with the content pasted in: the agent will draft a thoughtful, accessible response
3. Paste the result back into the discussion reply editor

This works well for first-response drafts on Q&A threads or community questions in your area of expertise.


*Return to: [Resources](appendix-x-resources.md) | [Glossary](appendix-a-glossary.md)*

---

## GitHub Gists

>
> **Listen to Episode 23:** [GitHub Gists](../PODCASTS.md) - a conversational audio overview of this chapter. Listen before reading to preview the concepts, or after to reinforce what you learned.

## Shareable Code Snippets and Notes

> Gists are a simple way to share code snippets, notes, or small files without creating a full repository. Think of them as lightweight, version-controlled pastebins.


## What Is a Gist?

A Gist is a Git repository that holds a single file or a small collection of files. Every Gist:

- Has its own URL (e.g., `gist.github.com/username/a1b2c3d4`)
- Is version-controlled (you can see edit history)
- Can be **public** (anyone can see) or **secret** (only people with the link can see)
- Supports Markdown rendering
- Can be embedded in web pages
- Can be cloned, forked, and starred just like repos

**Secret does not mean private.** Anyone with the URL can view a secret Gist. It's just not listed publicly on your profile.


## When to Use a Gist vs a Repository

| Use a Gist When... | Use a Repository When... |
| --------------------  | --------------------------  |
| Sharing a single code snippet | Building a full project |
| Posting configuration examples | Collaborating with multiple people |
| Quick notes or documentation | Need issues, PRs, or project management |
| Sharing logs or error messages | Want CI/CD and automated checks |
| Small utility scripts | Need multiple branches |


## Creating a Gist

### Via GitHub Web Interface

1. Navigate to [gist.github.com](https://gist.github.com)
2. **Gist description:** A short title (e.g., "NVDA configuration for GitHub")
3. **Filename:** Name your file with extension (e.g., `nvda-config.txt`, `script.py`, `notes.md`)
4. **Content:** Paste or type your code/text
5. **Visibility:**
   - Select **"Create public gist"** for openly shareable content
   - Select **"Create secret gist"** for link-only sharing
6. The Gist is created with a unique URL you can share

#### Screen reader navigation

- `D` to cycle landmarks to "Main"
- `F` to navigate form fields
- Tab through: Description → Filename → Content textbox → Visibility buttons

### Adding Multiple Files to a Gist

You can add multiple files to a single Gist:

1. After typing the first filename and content, select **"Add file"** (button below the editor)
2. Repeat for each additional file
3. Create the Gist

**Use case:** Share related config files together (e.g., `.vscode/settings.json` + `.vscode/keybindings.json`)


## Editing a Gist

1. Navigate to your Gist's URL
2. Select **"Edit"** (button in the top-right)
3. Make your changes
4. Select **"Update public gist"** or **"Update secret gist"**

Every edit creates a new revision. Click **"Revisions"** to see the full edit history.


## Embedding a Gist

You can embed Gists in web pages, blog posts, or documentation:

```html
<script src="https://gist.github.com/username/gist-id.js"></script>
```

GitHub renders it as a formatted code block with syntax highlighting and a link back to the Gist.

**Accessibility note:** Embedded Gists are `<iframe>` elements. Screen readers will announce them as "frame" and allow navigation into the content.


## Cloning a Gist

Every Gist is a Git repository. You can clone it:

```bash
git clone https://gist.github.com/username/gist-id.git
```

Make changes locally, commit, and push just like a normal repo.


## Forking a Gist

You can fork someone else's Gist to create your own copy:

1. View the Gist
2. Select **"Fork"** in the top-right
3. GitHub creates a new Gist under your account

**Use case:** Someone shares a useful script, you fork it, and customize it for your needs.


## Finding Your Gists

**Your Gists page:** [gist.github.com/your-username](https://gist.github.com/)

All your public and secret Gists are listed here. You can:

- Search your Gists by filename or content
- Star Gists you want to reference later
- Delete old Gists

### Screen reader navigation

- Each Gist appears as a heading (H2) with its description
- Press `2` or `H` to jump between Gists
- Each Gist has links: "Edit," "Delete," "Star," "Embed"


## Discovering Public Gists

**Browse trending Gists:** [gist.github.com/discover](https://gist.github.com/discover)

See popular Gists by language. Great for finding:

- Useful scripts and utilities
- Configuration examples
- Code snippets for learning


## Gist Comments

Public Gists support comments. Anyone with a GitHub account can leave a comment, making Gists useful for:

- Asking questions about a snippet
- Suggesting improvements
- Discussing implementation details

### To add a comment

1. Scroll to the bottom of the Gist page
2. `F` to navigate form fields → Find the comment textarea
3. Type your comment (Markdown supported)
4. `Ctrl+Enter` or activate "Comment" button


## Security and Privacy

### Public Gists

- Appear on your profile
- Are indexed by search engines
- Anyone can view, fork, and comment

### Secret Gists

- Do not appear on your profile
- Are not indexed by search engines
- Anyone with the URL can view
- Still version-controlled and can be starred

### Never put sensitive data in Gists

- Passwords or API keys
- Personal identifying information
- Proprietary code you don't have permission to share

If you accidentally post sensitive data:

1. Delete the Gist immediately
2. Revoke/regenerate any exposed credentials
3. Remember: Forks and clones may still exist


## Example Use Cases

### 1. Sharing Screen Reader Config

```text
Filename: nvda-github-config.txt
Content:
# NVDA Settings for GitHub Web Navigation
- Browse Mode: Use screen layout (enabled)
- Verbosity: Most punctuation
- Rate: 65%
- Keyboard shortcuts: Use standard GitHub shortcuts (G+I, G+P, etc.)
```

Share the Gist URL with other screen reader users.

### 2. Quick Markdown Note

```text
Filename: workshop-notes.md
Content:
# Workshop Day 1 Notes
- GitHub Flow: branch → commit → PR → review → merge
- Keyboard shortcuts: G+I (issues), G+P (PRs), / (search)
- Always link PRs to issues with "Closes #N"
```

Reference it later or share with workshop participants.

### 3. Code Snippet for a StackOverflow Answer

When answering questions, paste your code as a Gist and link to it. Readers get syntax highlighting, version history, and the ability to fork your solution.


## Gists vs GitHub Repositories - Quick Comparison

| Feature | Gist | Repository |
| ---------  | ------  | ------------  |
| Issues | No | Yes |
| Pull Requests | No | Yes |
| GitHub Actions | No | Yes |
| Projects | No | Yes |
| Multiple branches | No | Yes |
| Revisions/history | Yes | Yes |
| Forkable | Yes | Yes |
| Embeddable | Yes | No |
| Comments | Yes | Yes (on issues/PRs) |


## Deleting a Gist

1. Navigate to the Gist
2. Select **"Edit"**
3. Select **"Delete"** (top-right, after Edit button)
4. Confirm deletion

**Warning:** Deletion is permanent. Forks of your Gist are not deleted.


*Return to: [Resources](appendix-x-resources.md)*
