
**Table: Keyboard shortcut for focusing search in different screen readers**

# Contributing to This Workshop Repository

Thank you for helping improve this workshop. Whether you are a participant who found a typo, someone who wants to add a new exercise, or an educator adapting these materials for your own community - your contribution is meaningful and welcome.

This guide covers contributing to **this workshop learning repository**. For contributing to Accessibility Agents itself (the project you work on during Day 2), see [Accessibility Agents' CONTRIBUTING.md](https://github.com/community-access/accessibility-agents/blob/main/CONTRIBUTING.md).

## Table of Contents

1. [Who This Is For](#1-who-this-is-for)
2. [What Kinds of Contributions Are Welcome](#2-what-kinds-of-contributions-are-welcome)
3. [Before You Start - Fork and Clone](#3-before-you-start--fork-and-clone)
4. [Contribution Workflow - Step by Step](#4-contribution-workflow--step-by-step)
5. [Writing and Style Guidelines](#5-writing-and-style-guidelines)
6. [Accessibility Requirements](#6-accessibility-requirements)
7. [HTML Documentation Build System](#7-html-documentation-build-system)
8. [Screen Reader Guidance for Commands in This Document](#8-screen-reader-guidance-for-commands-in-this-document)
9. [Submitting Your Pull Request](#9-submitting-your-pull-request)
10. [What Happens After You Submit](#10-what-happens-after-you-submit)
11. [Questions and Discussion](#11-questions-and-discussion)

## 1. Who This Is For

**Workshop participants:** You have already completed the contribution workflow during the workshop. This repository is an excellent first contribution target for applying what you practiced.

**Educators and facilitators:** You are welcome to fork the entire repository and adapt the materials for your own workshop program. Attribution is required under the CC BY 4.0 license - please include a credit line and link to the original repository.

**Accessibility practitioners:** If you have domain expertise in a particular screen reader or assistive technology and notice something that is incorrect or incomplete, please open an issue or submit a correction. Your expertise is exactly what this documentation needs.

**People who find bugs:** A broken link, a command that has stopped working, an exercise that cannot be completed - all of these are legitimate bugs. Open an issue the same way you would for any software project.

## 2. What Kinds of Contributions Are Welcome

### Documentation Improvements

- **Corrections:** Wrong keyboard shortcut, screen reader command that has changed, broken external link, outdated UI description
- **Clarity:** A step that was confusing, an assumption that left someone behind, a paragraph that should be two
- **Gaps:** A common question that the documentation does not answer, an exercise step that was skipped
- **New content:** An additional exercise, a section about a tool or workflow not yet covered, a translation

### Issues and Bug Reports

- A command in the workshop exercises that does not work as described
- A screen reader behavior that differs from what the documentation says
- A broken link or missing image
- An exercise that assumes knowledge introduced later in the workshop

### Workshop Materials

- New exercises that reinforce a concept
- Facilitator notes based on running a session
- Timing adjustments based on real session experience
- Alternative approaches for participants on different operating systems

### What We Are Not Looking For Right Now

- Rewriting the complete voice or structure of the workshop - if you have large-scale ideas, open a discussion first
- Adding content about tools or platforms not currently mentioned in the workshop
- Automated link-checking or content generation without human review

## 3. Before You Start - Fork and Clone

You learned this workflow during the workshop. Here it is again as a reference.

### Account security

Security: We strongly recommend enabling Two-Factor Authentication (2FA) on your GitHub account. If you cannot enable 2FA, add an SSH key or create a Personal Access Token (PAT) with `repo` scope before contributing. If you need help, contact the workshop organizers.

### Fork the Repository

1. Navigate to the workshop repository on GitHub
2. Activate the **Fork** button (top right of the repository page)
3. Select your account as the fork destination
4. Wait for the fork to complete - you will be redirected to your copy

**Screen reader users:**

- NVDA / JAWS: Navigate by button (`B`) to find "Fork"
- VoiceOver: `VO+Right Arrow` to find "Fork" button, `VO+Space` to activate

### Clone Your Fork

```bash
git clone https://github.com/[your-username]/[workshop-repo-name].git
cd [workshop-repo-name]
```

### Add the Upstream Remote

This keeps your fork synchronized with the original repository:

```bash
git remote add upstream https://github.com/[original-owner]/[workshop-repo-name].git
```

Verify both remotes are configured:

```bash
git remote -v
```

Expected output:

```
origin    https://github.com/[your-username]/[workshop-repo-name].git (fetch)
origin    https://github.com/[your-username]/[workshop-repo-name].git (push)
upstream  https://github.com/[original-owner]/[workshop-repo-name].git (fetch)
upstream  https://github.com/[original-owner]/[workshop-repo-name].git (push)
```

## 4. Contribution Workflow - Step by Step

This is the same workflow you practiced during the workshop, applied to a real contribution.

### Step 1 - Sync with Upstream

Always start from a current copy of the main branch:

```bash
git checkout main
git fetch upstream
git merge upstream/main
git push origin main
```

### Step 2 - Create a Focused Branch

One issue or topic per branch. Branch names should describe the change:

```bash
git checkout -b fix-nvda-shortcut-section-05
git checkout -b add-exercise-03-alternative-macos
git checkout -b update-broken-links-resources
```

### Step 3 - Make Your Changes

Edit the file or files. Limit your changes to what is described in your branch name. Unrelated improvements belong in separate branches and separate pull requests.

**In VS Code:**

1. Open the file in the Explorer (`Ctrl+Shift+E`)
2. Make your edits
3. Save (`Ctrl+S`)

**In the GitHub web editor:**

1. Navigate to the file
2. Activate the pencil icon (Edit this file)
3. Make your changes
4. Use "Commit changes" to save directly to your branch

### Step 4 - Commit Your Changes

Write a commit message that a future contributor can read and understand without context:

```bash
git add docs/05-working-with-issues.md
git commit -m "fix: correct NVDA virtual cursor toggle shortcut in Section 3

The documented shortcut was NVDA+Space which is correct for switching
between browse and focus mode, but the exercise called it 'reading mode'
which is not a term NVDA uses. Updated to match NVDA's own terminology."
```

**Commit message format:**

```
type: short summary (under 72 characters)

Optional longer explanation of why the change was made, not just what
changed. What problem does this solve? What was wrong before?
```

Types: `fix`, `docs`, `exercise`, `style`, `chore`

### Step 5 - Push to Your Fork

```bash
git push origin fix-nvda-shortcut-section-05
```

### Step 6 - Open a Pull Request

1. Navigate to your fork on GitHub
2. A banner should appear: "Compare & pull request" - activate it
3. If no banner appears: Activate the **Pull requests** tab → **New pull request** → change the compare branch to your branch
4. Fill in the PR template (see below)
5. Submit

## 5. Writing and Style Guidelines

### Voice

- **Imperative mood for instructions:** "Navigate to the Issues tab" not "You should navigate to the Issues tab"
- **Present tense:** "The button opens a dialog" not "The button will open a dialog"
- **Specific:** Name the exact shortcut, exact menu item, exact element to look for - do not say "click the appropriate option"
- **Screen reader aware:** Include landmark context, not just visual position ("the Save button in the dialog footer" not "the blue button on the right")

### Structure

- Use heading levels consistently - H2 for major sections, H3 for subsections, H4 sparingly
- Use numbered lists for sequential steps - the order matters and participants need to count steps
- Use bulleted lists for options, items where order is unimportant
- Use code blocks (` ``` `) for all commands, keyboard shortcuts in context, and file paths
- Inline code (` `` `) for short references to a key name, command name, or file name

### Keyboard Shortcuts

Format all keyboard shortcuts in a table when listing more than two:

| Action | NVDA | JAWS | VoiceOver |
|--------|------|------|-----------|
| Focus search | `/` | `/` | `/` |

When mentioning a single shortcut inline: use backticks - `NVDA+F7`

### Links

- Link text should describe the destination - not "click here" or "this guide"
- Good: `[NVDA User Guide](https://www.nvaccess.org/files/nvda/documentation/userGuide.html)`
- Bad: `[click here](https://www.nvaccess.org/files/nvda/documentation/userGuide.html)`

## 6. Accessibility Requirements

Every document in this repository is used by screen reader users. Accessibility is not a nice-to-have - it is the primary requirement. All contributions must meet the following:

### Heading Structure

- Every heading must be in-sequence (no skipping from H2 to H4)
- Every document must have exactly one H1 (`#`) - the page title
- Headings must accurately describe the content they introduce

### Links and References

- No bare URLs in running text - always use descriptive link text
- Exception: the Resources document may list URLs in table columns labeled "URL" for copy-paste use

### Images and Media

- Every image requires meaningful alt text
- Alt text describes what the image shows, not just its label
- Decorative-only images (rare in documentation) may use empty alt `alt=""`
- This workshop avoids screenshots of UI because screen reader users cannot use them - prefer text descriptions and keyboard instructions

### Tables

- Every table must have a header row using `|---|` separator syntax in Markdown
- Table headers must be meaningful and concise
- Avoid merged cells - Markdown tables do not support them, and they create complex reading order for screen readers

### Code Blocks

- All terminal commands use fenced code blocks with language specified (` ```bash `)
- Inline code for short references uses single backticks
- Commands that produce output should show the expected output separately, labeled

## 7. HTML Documentation Build System

This repository maintains HTML versions of all Markdown files. The HTML is built locally and committed alongside the Markdown source, so both formats are always in sync.

### How It Works

**Local build, committed output:**

- You edit `.md` files, then run `npm run build:html` before committing
- Both the Markdown changes and the updated `html/` output are committed together
- There is no CI pipeline - the build is your responsibility before pushing

**What gets converted:**

- All markdown files in `docs/`
- All markdown files in `learning-room/`
- Root level markdown files (README.md, CONTRIBUTING.md, etc.)

### Local Development

You can build HTML files locally to preview your changes before pushing:

```bash
# Install dependencies (first time only)
npm install

# Generate HTML files once
npm run build:html

# Watch mode - rebuilds HTML automatically when you save markdown files
npm run watch:html

# Clean generated HTML
npm run clean
```

Generated HTML files will be in the `html/` directory with the same folder structure as the source markdown files.

### HTML Features

The generated documentation includes:

- **GitHub-flavored styling** - familiar appearance for GitHub users
- **Syntax highlighting** for code blocks
- **Responsive design** - works on mobile and desktop
- **Accessible markup** - proper ARIA labels, semantic HTML, keyboard navigation
- **Breadcrumb navigation** - easy to return to home
- **High contrast mode support** - respects user preferences

### What You Need to Know When Contributing

**Build before committing:**
After editing any `.md` file, run `npm run build:html` and include the updated `html/` files in your commit. A typical commit workflow:

```bash
# Edit your .md files, then:
npm run build:html
git add -A
git commit -m "docs: update chapter 6 and rebuild HTML"
```

**Testing the HTML locally (optional):**
If you want to verify how your Markdown will look in HTML before committing:

1. Run `npm install` (first time only)
2. Run `npm run build:html`
3. Open files in `html/` directory in your browser

**HTML files in the repository:**
The `html/` directory is committed to the repository so that:

- Documentation can be browsed directly from the repository
- HTML files are version-controlled alongside their Markdown source
- GitHub Pages can serve the documentation without a build step

### Troubleshooting

**"npm: command not found"**
You need to install Node.js first. Download from the [Node.js download page](https://nodejs.org/) (LTS version recommended).

**Build errors:**

- Ensure all markdown files have valid syntax
- Check that code blocks use proper fence syntax (` ``` `)
- Look for unclosed brackets or parentheses in links

## 8. Screen Reader Guidance for Commands in This Document

If you are reviewing this repository using a screen reader, here are the relevant reading patterns.

### NVDA

- **Table navigation:** `T` to reach the table, then `Ctrl+Alt+Arrow Keys` to navigate cells
- **Code blocks** are read as preformatted text. NVDA reads the content character-by-character if you need to copy a command - use `NVDA+F8` to switch to flat review, then `NVDA+C` to copy a line
- **Headings:** `H` to jump between headings when in browse mode

### JAWS

- **Table navigation:** `T` to reach the table, `Ctrl+Alt+Arrow Keys` for cells
- **Code blocks:** `Insert+F5` (forms list) will not find code elements - navigate with cursor keys
- **Headings:** `H` forward, `Shift+H` backward

### VoiceOver (macOS)

- **Table navigation:** `VO+Right Arrow` through rows, `VO+Cmd+Right Arrow` through columns
- **Code blocks** in Markdown renderers on GitHub: navigate with `VO+Right Arrow`; activate "Select All" (`Cmd+A`) then "Copy" (`Cmd+C`) to copy a block
- **Heading navigation with Rotor:** `VO+U`, then left-right to select "Headings", then up-down to navigate

## 9. Submitting Your Pull Request

### PR Template

When you open a pull request, fill in the template that appears. If no template appears, include:

```markdown
## What does this change?

<!-- One or two sentences describing the change -->

## Why?

<!-- What problem does this fix or what gap does it address? -->

## How to test / review

<!-- What should a reviewer look at? Where is the change? -->

## Checklist

- [ ] Heading levels are in sequence (no skips)
- [ ] All links use descriptive text (no bare URLs in running text)
- [ ] Command examples are in fenced code blocks
- [ ] Tables have header rows
- [ ] Spelling and grammar reviewed
```

### PR Title Format

```
fix: correct JAWS shortcut for PR review in Section 3
docs: add alternative macOS exercise for Section 6
exercise: add bonus challenge for notifications day 2
```

### Size Guideline

Small, focused pull requests are reviewed faster and merged sooner. If you have multiple unrelated improvements, submit them as separate pull requests.

## 10. What Happens After You Submit

1. **A maintainer reviews your PR** - typically within a few days for documentation changes
2. **You may receive review comments** - these are not rejections; they are part of the collaboration
3. **You can add commits to the same branch** to respond to feedback - GitHub adds them to the open PR automatically
4. **Once approved**, a maintainer will merge the PR
5. **Your name is in the commit history** of the repository - that is the permanent record of your contribution

If two weeks pass with no response, feel free to leave a comment on the PR to check in.

## 11. Questions and Discussion

**Before opening an issue:** Search existing issues and discussions to see whether the question has already been raised.

**For documentation discussions:** Open a GitHub Discussion (if enabled) or an Issue labeled `question`

**For urgent issues with the workshop materials during a live event:** Contact the facilitator directly

**For accessibility concerns:** Tag your issue or comment with the `accessibility` label

*Workshops run better when participants contribute back. Every correction, every clarification, every additional exercise makes this material stronger for everyone who comes after you. Your name in the commit history is not the end of your participation - it is the beginning.*

*[Back to README →](README.md) | [Resources →](docs/appendix-x-resources.md) | [Code of Conduct →](CODE_OF_CONDUCT.md)*

## Authoritative Sources

Use these official references when you need the current source of truth for facts in this chapter.

- [GitHub Docs, home](https://docs.github.com/en)
- [GitHub Changelog](https://github.blog/changelog/)

### Section-Level Source Map

Use this map to verify facts for each major section in this file.

- **1. Who This Is For:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **2. What Kinds of Contributions Are Welcome:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **3. Before You Start - Fork and Clone:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **4. Contribution Workflow - Step by Step:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [Workflow syntax for GitHub Actions](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax), [Secure use reference for GitHub Actions](https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions), [GitHub Actions changelog](https://github.blog/changelog/label/actions/)
- **5. Writing and Style Guidelines:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **6. Accessibility Requirements:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [W3C Web Content Accessibility Guidelines (WCAG) 2 overview](https://www.w3.org/WAI/standards-guidelines/wcag/), [WAI tutorials for accessible design patterns](https://www.w3.org/WAI/tutorials/), [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- **7. HTML Documentation Build System:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **8. Screen Reader Guidance for Commands in This Document:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [W3C Web Content Accessibility Guidelines (WCAG) 2 overview](https://www.w3.org/WAI/standards-guidelines/wcag/), [WAI tutorials for accessible design patterns](https://www.w3.org/WAI/tutorials/), [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- **9. Submitting Your Pull Request:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [About Git](https://docs.github.com/en/get-started/using-git/about-git), [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- **What does this change?:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **Why?:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **How to test / review:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **10. What Happens After You Submit:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **11. Questions and Discussion:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub Discussions docs](https://docs.github.com/en/discussions), [GitHub Gists docs](https://docs.github.com/en/get-started/writing-on-github/editing-and-sharing-content-with-gists)
