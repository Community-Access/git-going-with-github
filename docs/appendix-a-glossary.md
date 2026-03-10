# Appendix A: GitHub Concepts & Glossary
>
> **Listen to Episode 18:** [Glossary of Terms](../PODCASTS.md) - a conversational audio overview of this chapter. Listen before reading to preview the concepts, or after to reinforce what you learned.

## Every Term You Need for Open Source Contribution

> This glossary is your reference for the entire two-day workshop. When you hear a term you don't recognize - check here first. Terms are grouped by category and also sorted alphabetically at the end.

### Learning Cards: Navigating the Glossary

<details>
<summary>Screen reader users</summary>

- Press H to jump between term headings (h3 level) within each category section
- Use the Elements List (NVDA+F7 or Insert+F6) to see all terms at once and type a few letters to filter
- Jump to "Alphabetical Quick Reference" at the bottom for a flat A-Z lookup table

</details>

<details>
<summary>Low vision users</summary>

- Each term is a bold h3 heading -- increase zoom and scan headings to browse terms quickly
- The alphabetical table at the bottom works well at high zoom since each row is self-contained
- Use Ctrl+F in your browser to search for any term by name

</details>

<details>
<summary>Sighted users</summary>

- Terms are grouped by category (Parts 1-6) -- scan the bold headings to find the right group
- Scroll to the bottom for the alphabetical quick reference table if you know the term name
- Use Ctrl+F to jump directly to any term on the page

</details>


## Part 1: The Building Blocks

### Repository (Repo)

A repository is the container for an entire project. It holds all the project's files, folders, documentation, and the complete history of every change ever made. Think of it as a project folder that has a time machine built in - you can see every version of every file going back to the beginning.

A repository lives on GitHub at an address like: `https://github.com/owner/repo-name`

**Related terms:** remote repository (the one on GitHub), local repository (a copy on your computer), upstream (the original repo), fork (your personal copy)


### Organization (Org)

An organization is a group account on GitHub that multiple people can belong to. Open source projects typically live inside an organization rather than under a personal account. For example: `https://github.com/microsoft/vscode` - here `microsoft` is the organization and `vscode` is the repository.


### Fork

A fork is a personal copy of someone else's repository, living in your own GitHub account. When you fork a repo, you get all its files and history. Changes you make to your fork do not automatically affect the original. To propose your changes to the original project, you submit a pull request.

**Why fork?** You do not have write access to most open source repos. Forking lets you work freely and then propose changes.


### Remote

A remote is a connection to a repository hosted elsewhere (usually on GitHub). Your local Git repository can have multiple remotes. The most common remotes are:

- **`origin`** - your fork on GitHub
- **`upstream`** - the original repository you forked from

When you run `git push origin main`, you're pushing your local `main` branch to the remote named `origin`.

#### To see your remotes

```bash
git remote -v
```

#### To add a remote

```bash
git remote add upstream https://github.com/original-owner/repo.git
```


### Origin

`origin` is the default name Git gives to the remote repository you cloned from. When you clone your fork, `origin` points to your fork on GitHub.

Commands like `git push` and `git pull` default to using `origin` unless you specify otherwise.


### .gitignore

`.gitignore` is a special file in the root of your repository that tells Git which files or folders to ignore - meaning Git will not track or commit them.

#### Why use .gitignore?

- Prevent committing temporary files (`.DS_Store`, `Thumbs.db`)
- Ignore build outputs (`dist/`, `build/`, `node_modules/`)
- Keep secrets out of Git (`.env` files, API keys, credentials)
- Avoid committing IDE-specific files (`.vscode/`, `.idea/`)

#### Example `.gitignore`

```text
# Dependencies
node_modules/
vendor/

# Environment variables
.env
.env.local

# Build outputs
dist/
build/
*.log

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
```

**Important:** `.gitignore` only ignores **untracked** files. If you already committed a file, you must remove it from Git's tracking first:

```bash
git rm --cached filename
```

Then add it to `.gitignore` and commit the change.


### Clone

Cloning copies a repository from GitHub to your local computer so you can work with it in VS Code or your preferred editor. When you clone, you get all the files and the complete history.

```text
git clone https://github.com/your-username/repo-name.git
```

**Fork vs Clone:** Fork = your copy on GitHub. Clone = a copy on your computer. You usually clone your fork.


### Branch

A branch is a separate line of development inside a repository. The main branch (often called `main` or `master`) holds the stable, released version of the project. When you want to add a feature or fix a bug, you create a new branch so your work doesn't affect `main` until it's ready.

Think of branches like parallel timelines - each branch is its own version of the project that can evolve independently and be merged back together later.

#### Common branch names

- `main` - the primary, stable branch
- `develop` - integration branch (not all projects have this)
- `feature/my-new-thing` - convention for feature branches
- `fix/broken-button` - convention for bug fix branches
- `docs/update-readme` - convention for documentation-only branches


### Commit

A commit is a saved snapshot of your changes at a moment in time. Every commit has:

- A **message** describing what changed and why
- A unique **SHA hash** (a fingerprint like `a1b2c3d`)
- The **author** and timestamp
- The **changes** (additions and deletions to files)

Good commit messages are in the imperative mood: "Fix typo in README" not "Fixed typo" or "Fixing typo."

Example of a well-written commit message:

```text
Fix broken link in accessibility guide

The link to the NVDA download page was using an outdated URL.
Updated to the current direct download page.

Fixes #42
```


### Diff

A diff (short for difference) shows what changed between two versions of a file. Lines that were **added** are shown in green (with a `+` prefix). Lines that were **removed** are shown in red (with a `-` prefix). Lines that are unchanged are shown in grey for context.

Reading diffs is one of the core skills for code review. When you view a Pull Request's "Files Changed" tab, you are reading a diff.


## Part 2: Collaboration Workflow

### Issue

An issue is a discussion item in a GitHub repository. Issues are used for:

- Reporting bugs
- Requesting features or improvements
- Asking questions
- Discussing ideas
- Tracking work items

Every issue gets a sequential number (like `#42`) and can have labels, assignees, milestones, and comments. Issues are the starting point for most contributions - it's best practice to open or find an issue before making code changes.


### Pull Request (PR)

A pull request is a proposal to merge changes from one branch into another. When you have finished working on your fork or feature branch, you open a PR to say "here is my work - please review it and consider merging it."

A PR shows:

- Which branch you want to merge into which target branch
- The diff (all changes you made)
- A description of what you changed and why
- Discussion threads and reviews from others

The name "pull request" means you are requesting that the maintainers pull your changes into their project.


### Code Review

Code review is the process of one or more collaborators reading and providing feedback on a PR before it is merged. Reviewers can:

- **Comment** - leave a note on a line (not a formal verdict)
- **Approve** - signal that they are happy with the changes
- **Request Changes** - indicate that specific things need to be addressed before merging

Good code reviews are kind, specific, and constructive.


### Merge

Merging is combining changes from one branch into another. When a PR is approved, a maintainer merges it. There are three merge strategies:

| Strategy | What It Does | When Used |
| ----------  | -------------  | -----------  |
| **Merge commit** | Creates a new commit recording the merge | Default on most projects |
| **Squash and merge** | Combines all PR commits into one commit | Keeping history clean |
| **Rebase and merge** | Replays commits on top of target branch | Linear history projects |


### Merge Conflict

A merge conflict happens when two branches have both changed the same part of the same file in different ways. Git doesn't know which version to keep, so it pauses and asks you to resolve it manually.

Conflict markers look like this in a file:

```text
<<<<<<< HEAD
The current content on your branch
=======
The incoming content from the other branch
>>>>>>> feature/other-branch
```

You resolve a conflict by editing the file to have the correct final content, removing the conflict markers, and then committing.

See [Merge Conflicts Guide](07-merge-conflicts.md) for step-by-step instructions.


### Upstream

Upstream refers to the original repository that you forked from. When the upstream project has new changes that you want to bring into your fork, you "sync" your fork with upstream.

```text
Your Fork → upstream → Original Repo
Your changes flow this way: Original Repo ← Pull Request ← Your Fork
```


### Label

Labels are colored tags applied to issues and PRs to categorize them. Common labels:

- `bug` - something isn't working
- `enhancement` - new feature or request
- `documentation` - documentation-only change
- `good first issue` - good for newcomers (look for this when finding your first contribution!)
- `help wanted` - maintainers want community help
- `accessibility` - accessibility-related


### Milestone

A milestone groups issues and PRs toward a goal or deadline. For example: "v2.0 Release" or "Hackathon Day 1." Milestones show progress as a percentage of closed versus open items.


### Project (GitHub Projects)

A GitHub Project is a flexible board for tracking work. It can show issues and PRs in table view, board view (kanban), or roadmap view. Projects are especially useful for hackathon-style coordination.


## Part 3: People and Roles

### Maintainer

A maintainer is someone with write or admin access to a repository. Maintainers review PRs, triage issues, manage releases, and make decisions about the project's direction. Most open source projects have between one and five core maintainers.


### Contributor

Anyone who contributes to an open source project is a contributor. Contributing includes code, documentation, design, testing, translation, issue triage, and community support. You do not need commit access to contribute.


### Triage

Triaging issues means reviewing new issues to categorize them, add labels, assign them, close duplicates, and communicate with the reporter. Triage is an important contribution that doesn't require coding skills.


### Collaborator

A collaborator is someone who has been explicitly granted write access to a repository. Collaborators can commit directly to the repo without forking (though good practice is still to use branches and PRs).


## Part 4: Common Abbreviations and Slang

These abbreviations appear frequently in GitHub comments, PR descriptions, and commit messages:

| Term | Stands For | Meaning |
| ------  | -----------  | ---------  |
| **LGTM** | Looks Good To Me | Informal approval - "I reviewed it and it looks correct" |
| **WIP** | Work In Progress | This PR is not ready for review yet |
| **nit** | Nitpick | A minor, optional suggestion - "not a blocker" |
| **RFC** | Request For Comments | Seeking broad feedback on an idea or approach |
| **PTAL** | Please Take A Look | Asking someone to review something |
| **IMO / IMHO** | In My (Humble) Opinion | Softening a suggestion |
| **AFAICT** | As Far As I Can Tell | "Based on what I can see..." |
| **TIL** | Today I Learned | Sharing a discovery |
| **FYI** | For Your Information | Sharing information, no action needed |
| **EOD / EOW** | End of Day / Week | Deadline |
| **Closes #42** | - | When merged, this PR closes issue #42 (automatic linking) |
| **Fixes #42** | - | Same as Closes - use when the PR fixes a bug |
| **Resolves #42** | - | Same as Closes - general resolution |
| **Refs #42** | References #42 | Links to the issue without closing it |
| **cc @username** | Carbon copy | Notifying someone without requiring their action |
| **/cc** | Same as cc | Alternative form |
| **stale** | - | An issue or PR with no recent activity |
| **WONTFIX** | - | The project won't address this issue (it's not a bug, or by design) |
| **upstream** | - | The original repo you forked from |
| **downstream** | - | A fork or project that depends on this one |
| **breaking change** | - | A change that will break existing functionality for users |


## Part 5: Technical GitHub Concepts

### HEAD

`HEAD` is Git's way of saying "where you are right now." It's a pointer to the current commit on the current branch.

- When you're on `main`, `HEAD` points to the latest commit on `main`
- When you switch branches, `HEAD` moves to that branch
- `HEAD^` or `HEAD~1` means "the commit before HEAD"

You'll see HEAD referenced in commands like:

```bash
git reset HEAD~1  # Undo the last commit
git diff HEAD     # Show uncommitted changes
```


### Detached HEAD

A "detached HEAD" occurs when you check out a specific commit instead of a branch. You're no longer "on" a branch - just looking at a snapshot in time.

#### Why it happens

```bash
git checkout a1b2c3d  # Checking out a commit directly
```

#### What this means

- Any commits you make won't belong to any branch
- If you switch branches, those commits become "orphaned"

#### How to fix it

If you made commits in detached HEAD state and want to keep them:

```bash
git branch new-branch-name  # Creates a branch from your current position
git checkout new-branch-name
```

**Screen reader note:** Git will warn you verbosely when entering detached HEAD state. Read the guidance carefully.


### Stash

`git stash` temporarily saves your uncommitted changes and reverts your working directory to a clean state. It's useful when you need to switch branches but aren't ready to commit.

#### Common workflow

```bash
# You're working on branch A
git stash  # Save your changes temporarily
git checkout main  # Switch to main
# Do something on main..
git checkout branch-a  # Switch back
git stash pop  # Restore your changes
```

## Stash commands

- `git stash` - save changes
- `git stash list` - see what's stashed
- `git stash pop` - restore and remove from stash
- `git stash apply` - restore but keep in stash
- `git stash drop` - delete a stash

**Use case:** "I need to quickly switch branches to check something, but I'm in the middle of work I'm not ready to commit."


### Rebase

Rebasing is an alternative to merging. Instead of creating a merge commit, rebase moves (replays) your commits on top of another branch.

#### Merge

```text
main:    A---B---C
               \
feature:        D---E---F
                         \
result:  A---B---C-------M (merge commit)
```

#### Rebase

```text
main:    A---B---C
feature:             D'---E'---F' (commits "replayed" on top of C)
```

#### When to use rebase

- Keep a linear project history
- Clean up your branch before submitting a PR
- Incorporate upstream changes into your feature branch

#### When NOT to rebase

- Shared branches (never rebase `main` or public branches)
- After pushing to GitHub (unless you're comfortable force pushing)

#### Basic rebase workflow

```bash
git checkout feature-branch
git rebase main
# Fix any conflicts
git push --force-with-lease  # See Force Push below
```

**Screen reader note:** Rebase conflicts are resolved the same way as merge conflicts (edit file, remove markers, `git add`, `git rebase --continue`).


### Cherry-Pick

Cherry-picking applies a single commit from one branch onto another. It's like copy-pasting a commit.

**Use case:** You made a bug fix on the wrong branch and want to apply it to `main` without merging the whole branch.

```bash
git checkout main
git cherry-pick a1b2c3d  # Apply commit a1b2c3d to main
```

#### When to use

- Extract a single fix from a larger feature branch
- Backport a bug fix to an older release branch
- Undo a commit on one branch but keep it on another

**Warning:** Cherry-picking duplicates commits (creates a new commit with the same changes). Avoid cherry-picking commits that are part of an active feature branch - it causes confusion.


### Fetch vs Pull

**`git fetch`** downloads changes from a remote repository but doesn't merge them into your current branch. It updates your local copy of remote branches (like `origin/main` or `upstream/main`) without touching your working files.

```bash
git fetch origin  # Download updates from origin
```

**`git pull`** = `git fetch` + `git merge`. It downloads changes **and** immediately merges them into your current branch.

```bash
git pull origin main  # Fetch + merge origin/main into current branch
```

#### When to use fetch

- You want to see what changed without committing to merging
- You want to review changes before integrating them
- You're syncing upstream and want to inspect first

#### When to use pull

- You know you want the latest changes merged immediately
- You're working alone on a branch

**Best practice for collaboration:** Use `fetch` first, review with `git log origin/main`, then decide to merge or rebase.


### Force Push

Force pushing (`git push --force` or `git push -f`) overwrites the remote branch with your local version, replacing its history. This is **dangerous** because it can delete commits that others have based work on.

#### When force push is okay

- Your own feature branch that no one else is working on
- After rebasing to clean up history before merging a PR

#### When force push is NEVER okay

- The `main` branch
- Shared branches where others have based work on your commits
- Public branches with collaborators

#### Safer alternative: `--force-with-lease`

```bash
git push --force-with-lease origin feature-branch
```

`--force-with-lease` only force pushes if no one else has pushed to the remote branch since you last fetched. If someone pushed changes, the command fails and warns you.

#### Why force push is needed after rebase

When you rebase, Git rewrites commit history. The remote branch and your local branch now have conflicting histories. A normal `git push` fails. Force pushing resolves this by saying "trust my version."

**Rule of thumb:** If you're not sure whether you need to force push, you probably shouldn't.


### SHA / Hash

Every commit, file, and tree in Git is identified by a SHA hash - a 40-character string of letters and numbers (e.g., `a1b2c3d4e5f6...`). You will see shortened versions like `a1b2c3d` in the GitHub UI. These are unique fingerprints.


### Tag / Release

A tag marks a specific commit as significant - usually a version release like `v1.0.0`. Tags are permanent references (unlike branches, which move with each new commit). GitHub Releases are built on top of tags and can include release notes and downloadable files.


### Actions / Workflow / CI/CD

GitHub Actions is an automation platform built into GitHub. Workflows are automated scripts (written in YAML) that run in response to events - like a PR being opened or code being pushed. CI/CD stands for Continuous Integration / Continuous Deployment.

In practice: when you open a PR, you will often see automated checks run (tests, linting, accessibility checks). These are GitHub Actions. See [GitHub Actions & Workflows](appendix-q-actions-workflows.md) for a full explanation.


### Status Check

A status check is the result of an automated test or workflow run on a PR. Status checks show as:

- Green checkmark - all checks passed
- Red X - one or more checks failed
- Yellow dot - checks are still running

Maintainers often require status checks to pass before merging.


### Webhook

A webhook is an automated notification that GitHub sends to another service when something happens (a push, a PR opened, etc.). Webhooks power integrations with tools like Slack, project management systems, and CI services. As a contributor, you typically don't configure webhooks - they are set up by maintainers.


### GitHub Discussions

Discussions are a threaded forum built into GitHub, separate from Issues. They are used for open-ended conversation, Q&A, and community announcements. Not all projects use Discussions - some prefer issues or external forums.


### Profile

Your GitHub profile is your public identity. It shows your name, bio, location, repositories, contribution activity (the green squares), and pinned projects. Your profile URL is `https://github.com/your-username`.


### GitHub Copilot

GitHub Copilot is an AI-powered coding assistant. It suggests code, documentation, and commit messages. In this workshop, we use Copilot to help write issue descriptions, PR descriptions, documentation, and code. See [GitHub Copilot](16-github-copilot.md) for the full walkthrough.


## Part 6: Community Files

Every healthy open source project has these files in the root of the repository:

| File | Purpose |
| ------  | ---------  |
| `README.md` | Project overview, how to use it, how to contribute |
| `CONTRIBUTING.md` | How to contribute - setup, workflow, PR guidelines |
| `CODE_OF_CONDUCT.md` | Community standards and expectations |
| `LICENSE` | Legal terms for using the software |
| `SECURITY.md` | How to report security vulnerabilities responsibly |
| `CHANGELOG.md` | History of notable changes by version |
| `.github/ISSUE_TEMPLATE/` | Templates for bug reports, feature requests, etc. |
| `.github/PULL_REQUEST_TEMPLATE.md` | Template for PR descriptions |

### Learning Cards: Alphabetical Quick Reference

<details>
<summary>Screen reader users</summary>

- Press T to jump to the table, then use Ctrl+Alt+Arrow keys to navigate rows and columns
- Each row has two cells: Term and Definition -- column headers are announced on first entry
- For longer definitions, the table keeps them concise; see the full entry above for details

</details>

<details>
<summary>Low vision users</summary>

- This table is designed for quick lookups -- each row fits on a single line at most zoom levels
- If the table wraps awkwardly, try reducing zoom slightly or switching to a wider window
- Bold term names in the left column create a visible scan line

</details>

<details>
<summary>Sighted users</summary>

- Scan the left column alphabetically to find your term quickly
- Definitions here are one-liners -- look up the full entry in Parts 1-6 above for examples and commands
- Use Ctrl+F and type the term name to jump directly to it

</details>


## Alphabetical Quick Reference

| Term | Definition |
| ------  | -----------  |
| .gitignore | File specifying which files Git should ignore |
| Assignee | Person responsible for an issue or PR |
| Base branch | The branch a PR merges INTO |
| Branch | A parallel line of development |
| Cherry-pick | Apply a specific commit from one branch to another |
| CI/CD | Continuous Integration / Continuous Deployment |
| Clone | Copy a repo to your local computer |
| Code review | Reviewing PR changes before merging |
| Codespaces | Cloud-based VS Code development environment |
| Collaborator | Someone with write access to a repo |
| Comment | Discussion note on an issue, PR, or specific line |
| Commit | A saved snapshot of changes |
| Compare branch | The branch a PR merges FROM |
| Contributor | Anyone who contributes to a project |
| Default branch | The main branch (usually named "main") |
| Detached HEAD | Checking out a specific commit instead of a branch |
| Diff | The visual difference between two file versions |
| Discussions | Threaded forum space for Q&A and community conversation |
| Draft PR | A PR not yet ready for review |
| Feature preview | Opt-in GitHub UI experiments |
| Fetch | Download remote changes without merging |
| Force push | Overwrite remote branch history (use with caution) |
| Fork | Your personal copy of another repo |
| Git | The version control system GitHub is built on |
| GitHub Pages | Free static site hosting from a GitHub repository |
| Gist | Shareable code snippet or small file collection |
| Hash / SHA | Unique identifier for a commit or object |
| HEAD | Pointer to your current commit/branch |
| Issue | A discussion item (bug, feature, question) |
| Label | Colored tag for categorizing issues/PRs |
| Maintainer | Person with repo write/admin access |
| Merge | Combining changes from one branch into another |
| Merge conflict | When two branches changed the same content differently |
| Milestone | A goal grouping related issues/PRs |
| Organization | A group GitHub account |
| Origin | Default name for the remote you cloned from (your fork) |
| PR | Pull Request |
| Pull | Fetch changes and merge them (`git pull`) |
| Pull Request | Proposal to merge your changes |
| README | The main project documentation file |
| Rebase | Replay commits on top of another branch |
| Release | A versioned snapshot with notes and downloads |
| Remote | A connection to a repository hosted elsewhere |
| Repository | A project container with all files and history |
| Review | Formal feedback on a PR (approve/comment/request changes) |
| SHA | Unique hash identifier |
| Squash merge | Combining all PR commits into one |
| Stash | Temporarily save uncommitted changes |
| Status check | Automated pass/fail result shown on a PR |
| Tag | A permanent named reference to a specific commit |
| Triage | Reviewing and categorizing new issues |
| Upstream | The original repo you forked from |
| Wiki | Multi-page documentation space in a repository |
| Tag | A permanent named reference to a specific commit |
| Triage | Reviewing and categorizing new issues |
| Upstream | The original repo you forked from |


*Appendix B - look up any term here at any point during the workshop.*
*Return to: [Day 1 Agenda](../DAY1_AGENDA.md) | [Understanding GitHub's Web Structure](02-understanding-github.md)*
*See also: [Screen Reader Cheat Sheet](appendix-b-screen-reader-cheatsheet.md)*
