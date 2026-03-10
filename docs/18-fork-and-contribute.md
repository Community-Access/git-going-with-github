# Fork and Contribute: The Open Source Workflow

> **Day 2, Block 3 Material**
>
> This chapter teaches the complete fork-based contribution workflow from start to finish. You will fork a real repository, create a feature branch, make changes, push to your fork, and open a pull request against the upstream repository. This is the workflow used by millions of open source contributors every day, and it is the foundation for the capstone project in [Chapter 20](20-build-your-agent.md).

## Table of Contents

1. [What Is a Fork?](#1-what-is-a-fork)
2. [Fork vs Clone vs Branch](#2-fork-vs-clone-vs-branch)
3. [Step 1: Fork the Repository](#3-step-1-fork-the-repository)
4. [Step 2: Clone Your Fork Locally](#4-step-2-clone-your-fork-locally)
5. [Step 3: Add the Upstream Remote](#5-step-3-add-the-upstream-remote)
6. [Step 4: Create a Feature Branch](#6-step-4-create-a-feature-branch)
7. [Step 5: Make Your Changes](#7-step-5-make-your-changes)
8. [Step 6: Push to Your Fork](#8-step-6-push-to-your-fork)
9. [Step 7: Open a Pull Request](#9-step-7-open-a-pull-request)
10. [Step 8: Respond to Review Feedback](#10-step-8-respond-to-review-feedback)
11. [Keeping Your Fork in Sync](#11-keeping-your-fork-in-sync)
12. [The Fork Workflow Checklist](#12-the-fork-workflow-checklist)
13. [If You Get Stuck](#13-if-you-get-stuck)

---

## 1. What Is a Fork?

A fork is your personal copy of someone else's repository on GitHub. When you fork a repository, GitHub creates a full copy under your account. You own the fork -- you can push to it, create branches on it, and modify it freely without affecting the original.

The original repository is called the **upstream** repository. Your fork is linked to the upstream, which means you can open pull requests from your fork back to the original.

### Why forks exist

Forks solve a permissions problem. Most open source projects do not give every contributor write access to the main repository. Instead:

1. You fork the project (creates your copy)
2. You make changes on your copy
3. You open a pull request asking the maintainers to merge your changes

This way anyone can contribute without the maintainers giving out write access.

> **The Day 1 connection:** On Day 1, you worked in the learning-room repository where you had write access. You created branches directly on the repository. In the open source world, you usually do not have write access to the upstream repository, so you fork first and branch on your fork.

---

## 2. Fork vs Clone vs Branch

These three concepts are related but different. Understanding the distinctions prevents confusion.

| Concept | Where it lives | What it creates | When to use it |
|---|---|---|---|
| **Fork** | GitHub.com (your account) | A copy of the entire repository under your GitHub account | When you want to contribute to a repo you do not own |
| **Clone** | Your computer | A local copy of any repository (yours or someone else's) | When you want to work locally |
| **Branch** | Inside any repository (local or remote) | A named pointer to a specific commit | When you want to isolate a change within a repository |

### How they work together

In the fork workflow, you use all three:

1. **Fork** the upstream repository to create your copy on GitHub
2. **Clone** your fork to your computer
3. **Create a branch** on your local clone for your specific change
4. Push the branch to your fork and open a PR to the upstream

```text
Upstream repo (GitHub)      Your fork (GitHub)        Your computer (local)
+-------------------+       +-------------------+      +-------------------+
| Community-Access/ |  fork | your-username/    | clone|                   |
| accessibility-    | ----> | accessibility-    | ---> | accessibility-    |
| agents            |       | agents            |      | agents            |
+-------------------+       +-------------------+      +-------------------+
        ^                          ^                           |
        |                          |                           |
        +--- PR (fork to upstream) +--- git push              |
                                                      edit, stage, commit
```

> **Screen reader note:** The text diagram above shows three boxes arranged left to right. The upstream repo on GitHub is on the left. Your fork on GitHub is in the middle. Your local computer is on the right. A fork arrow goes from left to middle. A clone arrow goes from middle to right. Editing happens on the right. Git push goes from right to middle. A PR goes from middle to left.

### Learning Cards: Fork vs Clone vs Branch

<details>
<summary>Screen reader users</summary>

- Run `git remote -v` in the terminal to hear your configured remotes -- `origin` is your fork, `upstream` is the original repository
- The Status Bar in VS Code shows the current branch name -- press `F6` to navigate there and confirm you are on a feature branch, not `main`
- Use `Ctrl+Shift+P` then "Git: Checkout to" to switch between branches; your screen reader announces each branch name in the picker

</details>

<details>
<summary>Low vision users</summary>

- Your fork URL includes your username (e.g., `github.com/your-name/repo`) making it visually distinct from the upstream URL
- In VS Code, the branch name in the bottom-left Status Bar confirms which branch you are working on -- zoom with `Ctrl+=` if it is too small
- The Source Control panel heading shows the repository name to help you verify you are working in the correct clone

</details>

<details>
<summary>Sighted users</summary>

- On GitHub.com, forked repos show a "forked from" label under the repository name at the top of the page
- The fork icon (a branching arrow) appears next to forked repository names in your GitHub profile
- In VS Code, the bottom-left branch name and the Source Control panel header confirm your current branch and repository

</details>

---

## 3. Step 1: Fork the Repository

For this workshop, you will fork the [Community-Access/accessibility-agents](https://github.com/Community-Access/accessibility-agents) repository.

### On GitHub.com

1. Go to [github.com/Community-Access/accessibility-agents](https://github.com/Community-Access/accessibility-agents).
2. Find the **Fork** button in the upper-right area of the page.
   - **Screen reader users (NVDA/JAWS):** Press `B` to cycle through buttons. The Fork button is near the top of the page, after the Watch and Star buttons.
   - **VoiceOver users:** Use `VO+U` to open the Buttons rotor and navigate to "Fork."
3. GitHub shows a "Create a new fork" page. The defaults are correct:
   - **Owner:** your username
   - **Repository name:** `accessibility-agents`
   - **Copy the main branch only:** checked (leave this checked)
4. Activate **Create fork**.
5. GitHub redirects you to your fork: `github.com/your-username/accessibility-agents`.

You now have your own copy. The original repository at `Community-Access/accessibility-agents` is untouched.

### Using GitHub CLI

```bash
gh repo fork Community-Access/accessibility-agents --clone=false
```

This creates the fork on GitHub without cloning it locally. We will clone in the next step.

---

## 4. Step 2: Clone Your Fork Locally

Now download your fork to your computer so you can work on it.

### Using VS Code

1. Open VS Code.
2. Open the command palette: `Ctrl+Shift+P` (or `Cmd+Shift+P`).
3. Type "Git: Clone" and press `Enter`.
4. Paste your fork URL: `https://github.com/your-username/accessibility-agents.git` (replace `your-username` with your GitHub username).
5. Choose a folder (for example, `Documents`) and confirm.
6. When the clone finishes, VS Code offers to open the repository. Accept.

### Using the terminal

```bash
git clone https://github.com/your-username/accessibility-agents.git
cd accessibility-agents
```

### Using GitHub Desktop

1. Open GitHub Desktop.
2. Go to File, then Clone repository.
3. Select the **GitHub.com** tab and find `your-username/accessibility-agents`.
4. Choose a local path and click Clone.

### Using GitHub CLI

```bash
gh repo clone your-username/accessibility-agents
cd accessibility-agents
```

After cloning, your local repository has one remote called `origin` that points to your fork.

### Learning Cards: Cloning Your Fork

<details>
<summary>Screen reader users</summary>

- Use `Ctrl+Shift+P` then "Git: Clone" and paste your fork URL -- VS Code announces progress and opens the repository when done
- After cloning, press `Ctrl+Shift+E` to open the Explorer and verify the file tree loaded correctly
- Run `git remote -v` in the terminal (`Ctrl+\``) to confirm `origin` points to your fork URL

</details>

<details>
<summary>Low vision users</summary>

- After cloning, the Explorer sidebar populates with the repository files -- increase sidebar width by dragging its edge for better readability
- The VS Code title bar shows the repository folder name, confirming which project is open
- Use `Ctrl+P` to quick-open any file by name if the file tree is hard to navigate at high zoom

</details>

<details>
<summary>Sighted users</summary>

- After cloning, the Explorer sidebar shows the full file tree; the title bar displays the folder name
- Look for the blue "Open Folder" notification or the repository name in the bottom Status Bar to confirm the clone succeeded
- The Source Control panel (`Ctrl+Shift+G`) should show the repository with `main` as the current branch

</details>

---

## 5. Step 3: Add the Upstream Remote

Your clone knows about your fork (`origin`). It does not know about the original repository. You need to add it as a second remote called `upstream`.

### Why this matters

Without the upstream remote, you cannot:

- Pull new changes that other contributors make to the original repository
- Keep your fork up to date
- Verify your changes work with the latest code

### Add the upstream remote

```bash
git remote add upstream https://github.com/Community-Access/accessibility-agents.git
```

### Verify your remotes

```bash
git remote -v
```

You should see:

```text
origin    https://github.com/your-username/accessibility-agents.git (fetch)
origin    https://github.com/your-username/accessibility-agents.git (push)
upstream  https://github.com/Community-Access/accessibility-agents.git (fetch)
upstream  https://github.com/Community-Access/accessibility-agents.git (push)
```

Two remotes: `origin` (your fork) and `upstream` (the original).

> **In VS Code:** You can also add the remote using the command palette. Press `Ctrl+Shift+P`, type "Git: Add Remote," enter `upstream` as the name, and paste the upstream URL.

---

## 6. Step 4: Create a Feature Branch

Never work directly on the `main` branch of your fork. Always create a feature branch for each change. This keeps `main` clean and in sync with the upstream.

### Create and switch to a new branch

```bash
git checkout -b agents/your-username-my-agent
```

The branch name `agents/your-username-my-agent` follows the workshop convention for Day 2 capstone branches. Replace `your-username` with your GitHub username and `my-agent` with a short name for your agent.

### In VS Code

1. Click the branch name in the bottom-left status bar (or press `Ctrl+Shift+P` and type "Git: Create Branch").
2. Type the branch name: `agents/your-username-my-agent`.
3. Press `Enter`. VS Code creates the branch and switches to it.

### In GitHub Desktop

1. Click the **Current Branch** dropdown.
2. Click **New Branch**.
3. Type the branch name and click **Create Branch**.

### Verify you are on the new branch

```bash
git branch
```

The current branch has an asterisk (`*`) next to it.

---

## 7. Step 5: Make Your Changes

Now you are on your feature branch and ready to work. For the capstone, you will create an agent file. For other contributions, you might edit documentation, fix a bug, or add a feature.

### General principles for contributing

- **Keep changes focused.** One branch, one purpose. If you want to make two unrelated changes, use two branches and two pull requests.
- **Follow the project's conventions.** Look at existing files for patterns in naming, formatting, and structure.
- **Write meaningful commit messages.** Describe what you changed and why. "Fix typo in README" is clear. "Update files" is not.

### Stage and commit your changes

After editing:

```bash
git add your-file.md
git commit -m "Add my-agent accessibility agent"
```

Or stage all changed files:

```bash
git add .
git commit -m "Add my-agent accessibility agent"
```

### In VS Code

1. Open the Source Control panel: `Ctrl+Shift+G` (or `Cmd+Shift+G`).
2. Changed files appear under "Changes." Click the `+` icon next to each file to stage it, or click `+` on the "Changes" header to stage all.
   - **Screen reader users:** Navigate to the Source Control view. Each changed file is listed. Press `Enter` on a file to see the diff. Use the inline actions to stage.
3. Type your commit message in the text field at the top.
4. Press `Ctrl+Enter` (or `Cmd+Enter`) to commit.

### Multiple commits are fine

You do not need to make all your changes in a single commit. In fact, smaller commits are better because they are easier to review and easier to revert if something goes wrong.

---

## 8. Step 6: Push to Your Fork

Your commits are saved locally. Now push them to your fork on GitHub.

### First push (new branch)

```bash
git push -u origin agents/your-username-my-agent
```

The `-u` flag sets up tracking so future pushes from this branch go to the right place automatically.

### Subsequent pushes

```bash
git push
```

### In VS Code

After committing, the Source Control panel shows a **Sync Changes** button (or a cloud icon with an up arrow). Click it to push.

Alternatively, use the command palette: `Ctrl+Shift+P`, type "Git: Push."

### In GitHub Desktop

After committing, click the **Push origin** button in the top bar.

### Verify on GitHub

After pushing, visit your fork on GitHub: `github.com/your-username/accessibility-agents`. You should see a banner saying "your-username-my-agent had recent pushes" with a **Compare and pull request** button.

---

## 9. Step 7: Open a Pull Request

A pull request asks the upstream maintainers to merge your branch into their repository.

### From the GitHub.com banner

1. After pushing, GitHub shows a yellow banner on your fork with a **Compare and pull request** button. Click it.
2. GitHub opens the "Open a pull request" page. Verify:
   - **Base repository:** `Community-Access/accessibility-agents`
   - **Base branch:** `main`
   - **Head repository:** `your-username/accessibility-agents`
   - **Compare branch:** `agents/your-username-my-agent`
3. Write a descriptive title. Example: "Add document-contrast-checker agent."
4. In the body, explain:
   - What your change does
   - Why it is useful
   - Any testing you did
   - Reference any related issues with `Closes #XX` if applicable
5. If the project has a PR template, fill in all the required sections.
6. Activate **Create pull request**.

### From the Pull Requests tab

1. Go to the upstream repository: [github.com/Community-Access/accessibility-agents](https://github.com/Community-Access/accessibility-agents).
2. Click the **Pull requests** tab.
3. Click **New pull request**.
4. Click **compare across forks**.
5. Set the head repository to your fork and the compare branch to your feature branch.
6. Click **Create pull request** and fill in the details.

### Using GitHub CLI

```bash
gh pr create --repo Community-Access/accessibility-agents --title "Add document-contrast-checker agent" --body "Description of what the agent does and why it is useful."
```

> **Screen reader tip:** The PR creation form is a standard web form. Navigate with `Tab` to move between fields. The title field and body field are `<input>` and `<textarea>` elements. The base and compare dropdowns use ARIA listbox patterns.

### Learning Cards: Opening a Pull Request

<details>
<summary>Screen reader users</summary>

- The PR form has a title input and a body textarea -- `Tab` between them; your screen reader announces field labels
- The base and compare branch dropdowns use ARIA listbox patterns -- press `Down Arrow` to open and select branches
- After submitting, GitHub navigates to the new PR page; press `h` to jump by headings and find the "Files changed" section

</details>

<details>
<summary>Low vision users</summary>

- The "Compare and pull request" yellow banner appears at the top of your fork page after pushing -- it is a large, visible button
- Use browser zoom (`Ctrl+=`) to enlarge the PR creation form if the text inputs are too small
- The base and head repository/branch selectors appear near the top of the form -- verify these before submitting

</details>

<details>
<summary>Sighted users</summary>

- After pushing, look for the yellow "Compare and pull request" banner at the top of your fork's GitHub page
- Verify the base repository and branch (upstream/main) and head repository (your fork) are correct in the dropdown selectors
- The PR creation form preview tab shows how your Markdown description will render -- check it before submitting

</details>

---

## 10. Step 8: Respond to Review Feedback

After you open a pull request, maintainers and peers will review your changes. They may:

- **Approve** - your PR is ready to merge
- **Request changes** - you need to update your PR
- **Comment** - ask questions or suggest improvements without formally requesting changes

### How to respond to requested changes

1. Read each review comment carefully. Understand what the reviewer is asking.
2. Make the requested changes in your local clone.
3. Stage, commit, and push:

```bash
git add modified-file.md
git commit -m "Address review feedback: improve guardrails section"
git push
```

4. Your new commits automatically appear in the open pull request. The reviewer is notified.
5. Reply to each review comment explaining what you changed, or ask clarifying questions if the feedback is unclear.

### Review etiquette

- **Thank the reviewer.** They spent time reading your code.
- **Address every comment.** Even if you disagree, explain your reasoning.
- **Do not take feedback personally.** Review is about the code, not about you.
- **Ask questions.** If you do not understand a comment, ask. Reviewers expect questions from new contributors.

> **The Day 1 connection:** You practiced code review in [Chapter 15](15-code-review.md). The same principles apply here, but now you are on the other side -- receiving feedback instead of giving it.

---

## 11. Keeping Your Fork in Sync

Over time, other people's changes get merged into the upstream repository. Your fork does not update automatically. You need to sync it.

### Sync from the command line

```bash
# Make sure you are on main
git checkout main

# Download the latest changes from upstream
git fetch upstream

# Merge upstream changes into your local main
git merge upstream/main

# Push the updated main to your fork
git push origin main
```

### Sync from GitHub.com

1. Go to your fork on GitHub.
2. If your fork is behind the upstream, GitHub shows a banner: "This branch is X commits behind Community-Access:main."
3. Click **Sync fork**, then **Update branch**.

### Sync from GitHub CLI

```bash
gh repo sync your-username/accessibility-agents
```

### When to sync

- **Before starting new work:** Always sync before creating a new feature branch. This ensures your branch starts from the latest code.
- **Before opening a PR:** Sync and merge `main` into your feature branch to check for conflicts before asking for review.
- **Periodically:** If you are working on a long-running branch, sync weekly to avoid large conflicts.

### Learning Cards: Keeping Your Fork in Sync

<details>
<summary>Screen reader users</summary>

- Run `git fetch upstream` then `git merge upstream/main` in the terminal -- listen for "Already up to date" or a merge summary announcing new commits
- Use `git status` after syncing to confirm your local `main` is not behind the upstream
- On GitHub.com, the "Sync fork" button is near the top of your fork page; press `Tab` to reach it and `Enter` to activate

</details>

<details>
<summary>Low vision users</summary>

- On GitHub.com, the "Sync fork" button appears below the repository description with a dropdown showing how many commits behind you are
- After syncing, the Status Bar in VS Code shows no up/down arrows next to the branch name, confirming you are in sync
- If a merge conflict occurs during sync, VS Code highlights conflicts with colored backgrounds (green = yours, blue = upstream)

</details>

<details>
<summary>Sighted users</summary>

- On GitHub.com, look for the "Sync fork" button below the green Code button -- it shows "N commits behind" if your fork is out of date
- Click "Update branch" in the dropdown to sync your fork with one click
- In VS Code, the sync icon (circular arrows) next to the branch name in the Status Bar performs fetch + merge in one action

</details>

---

## 12. The Fork Workflow Checklist

Use this checklist every time you contribute to a repository you do not own:

- [ ] Fork the repository on GitHub
- [ ] Clone your fork locally
- [ ] Add the upstream remote (`git remote add upstream URL`)
- [ ] Create a feature branch (`git checkout -b branch-name`)
- [ ] Make your changes, stage, and commit
- [ ] Push your branch to your fork (`git push -u origin branch-name`)
- [ ] Open a pull request from your fork to the upstream
- [ ] Respond to review feedback with additional commits
- [ ] After merge, sync your fork (`git fetch upstream && git merge upstream/main`)
- [ ] Delete the feature branch (locally and on your fork)

### Cleaning up after merge

After your PR is merged, delete the feature branch:

```bash
# Delete the local branch
git checkout main
git branch -d agents/your-username-my-agent

# Delete the remote branch on your fork
git push origin --delete agents/your-username-my-agent
```

GitHub also offers a "Delete branch" button on the merged PR page.

---

## 13. If You Get Stuck

| Problem | What to do |
|---|---|
| Fork button is grayed out | You may not be signed in. Sign in to GitHub.com first. |
| Clone fails with permission error | Make sure you are cloning your fork (your-username/repo), not the upstream. You do not have write access to the upstream. |
| `git remote -v` shows only origin | Run `git remote add upstream URL` from Section 5. |
| Push fails with "permission denied" | You are probably trying to push to the upstream instead of your fork. Check `git remote -v` and push to `origin`. |
| PR shows conflicts with main | Sync your fork (Section 11), merge main into your branch, resolve conflicts, push again. |
| Reviewer requested changes but I do not understand | Reply to the review comment with a question. Reviewers expect questions from new contributors. |
| "Repository not found" when cloning | Double-check the URL. Make sure the fork exists under your account. |
| Accidentally committed to main instead of a branch | Check [Appendix E](appendix-e-advanced-git.md) for how to move commits to a new branch. |

**If nothing in this table helps:** Post on your challenge issue with the exact error message and the output of `git remote -v` and `git status`. A facilitator or buddy will help.

---

*Next: [Accessibility Agents](19-accessibility-agents.md)*
*Back: [Issue Templates](17-issue-templates.md)*
*Related: [Open Source Culture](08-open-source-culture.md) | [Git in Practice](14-git-in-practice.md) | [How Git Works](13-how-git-works.md)*
