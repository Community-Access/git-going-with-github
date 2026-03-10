# How Git Works: The Mental Model

> **Day 2, Block 1 Material**
>
> Before you start running Git commands, you need a mental model of what Git actually does. This chapter builds that model from the ground up: what a commit is, what a branch is, how local and remote repositories relate, and why merge conflicts happen. Every operation in [Chapter 14](14-git-in-practice.md) will make more sense after reading this.

## Table of Contents

1. [Why a Mental Model Matters](#1-why-a-mental-model-matters)
2. [The Three Areas: Working Directory, Staging Area, Repository](#2-the-three-areas-working-directory-staging-area-repository)
3. [What Is a Commit?](#3-what-is-a-commit)
4. [What Is a Branch?](#4-what-is-a-branch)
5. [Local vs Remote](#5-local-vs-remote)
6. [Push, Pull, and Fetch](#6-push-pull-and-fetch)
7. [Why Merge Conflicts Happen](#7-why-merge-conflicts-happen)
8. [The Git Timeline](#8-the-git-timeline)
9. [Putting It All Together](#9-putting-it-all-together)
10. [If You Get Stuck](#10-if-you-get-stuck)

---

## 1. Why a Mental Model Matters

On Day 1, you edited files on GitHub.com using the web editor. GitHub handled Git for you behind the scenes -- creating commits, managing branches, and tracking changes. You did not need to think about how it worked because the web interface made it invisible.

On Day 2, you will do the same operations locally: clone a repository to your computer, create branches, make commits, and push changes back to GitHub. The commands themselves are not hard. But without understanding what they do, you will hit a wall the first time something goes wrong -- and you will not know how to fix it.

This chapter gives you that understanding. It is not a list of commands (that is [Chapter 14](14-git-in-practice.md)). It is the mental model that makes the commands make sense.

> **Authoritative source:** The concepts in this chapter are grounded in the [Pro Git book](https://git-scm.com/book/en/v2) by Scott Chacon and Ben Straub, which is the official Git documentation's recommended resource. It is free to read online.

---

## 2. The Three Areas: Working Directory, Staging Area, Repository

Git organizes your work into three areas. Understanding these three areas is the single most important concept in this chapter.

### Working directory

The working directory is the folder on your computer where the files live. When you open a project in VS Code, everything you see in the file explorer is the working directory. These are real files on your disk that you can edit, rename, and delete.

When you change a file in the working directory, Git notices. But Git does not automatically record the change. You have to tell Git which changes you want to keep.

### Staging area (also called the index)

The staging area is a holding zone. When you are happy with a change in the working directory, you add it to the staging area. This is like saying: "I want this change to be part of my next save point."

You can add some files to the staging area and leave others out. This lets you make a commit (save point) that includes only the changes that belong together.

### Repository (the .git folder)

The repository is Git's permanent record. When you commit, Git takes everything in the staging area and stores it as a snapshot -- a permanent record of what those files looked like at that moment. The repository is stored in a hidden `.git` folder inside your project directory.

### How the three areas connect

The flow is always the same:

1. **Edit** files in the working directory
2. **Stage** the changes you want to keep (add to the staging area)
3. **Commit** the staged changes (save to the repository)

In Git commands, this looks like:

```text
edit a file        -->   git add file.md       -->   git commit -m "description"
(working directory)      (staging area)              (repository)
```

> **Screen reader note:** Many visual Git tutorials use diagrams with arrows to show this flow. The text description above and the three-step sequence are the same information without requiring a visual representation.

### An analogy: packing a box

Think of it like packing a box to mail:

- The **working directory** is your desk with papers and items scattered on it
- The **staging area** is the open box on the floor -- you put items into it as you decide what to ship
- The **commit** is sealing the box, labeling it, and putting it on the shelf -- once sealed, its contents are recorded permanently

You can put items in and take them out of the box (stage and unstage) as many times as you want before sealing it (committing).

---

## 3. What Is a Commit?

A commit is a snapshot of your project at a specific moment in time. It is not a diff (a list of changes). It records the complete state of every file in the staging area when the commit was made.

### What a commit contains

Every commit has four parts:

| Part | What it is | Example |
|---|---|---|
| **Snapshot** | The complete state of all staged files | All the files as they were when you committed |
| **Message** | A human-readable description of the change | "Fix broken link in setup guide" |
| **Author** | Who made the commit (name and email) | Jane Developer, jane@example.com |
| **Parent pointer** | Which commit came before this one | A reference to the previous commit's ID |

### Commit IDs (hashes)

Every commit gets a unique identifier -- a 40-character string called a SHA hash. It looks like this:

```text
a1b2c3d4e5f6789012345678901234567890abcd
```

In practice, you usually see only the first 7 characters: `a1b2c3d`. This short form is enough to uniquely identify a commit in most repositories.

You do not need to memorize these. Git commands accept both the full hash and the short form.

### Commits are permanent (mostly)

Once a commit is made, it is part of the repository's history. You can make new commits that undo the changes, but the original commit still exists in the timeline. This is what makes Git safe: you can always go back.

> **The Day 1 connection:** When you edited a file on GitHub.com and clicked "Commit changes," GitHub created a commit for you. It did the stage-and-commit steps in a single action. On Day 2, you will do these steps separately, which gives you more control.

---

## 4. What Is a Branch?

A branch is a name that points to a specific commit. That is the entire definition. A branch is not a copy of your files. It is not a separate folder. It is a pointer -- a label stuck on one specific commit.

### The default branch: main

Every repository has a default branch, usually called `main`. When you clone a repository, Git checks out the `main` branch, which means it loads the files from the commit that `main` points to into your working directory.

### Creating a branch

When you create a new branch, Git creates a new pointer that starts at the same commit you are currently on. Both branches point to the same commit. No files are copied.

```text
Before creating a branch:
  main --> commit C

After creating a branch called "fix/typo":
  main      --> commit C
  fix/typo  --> commit C    (same commit, two names)
```

### Making commits on a branch

When you make a new commit while on the `fix/typo` branch, the `fix/typo` pointer moves forward to the new commit. The `main` pointer stays where it was.

```text
  main      --> commit C
  fix/typo  --> commit D --> commit C
```

Now `fix/typo` is one commit ahead of `main`. The files on `main` have not changed. The files on `fix/typo` include your new edit.

### HEAD: which branch are you on?

Git uses a special pointer called `HEAD` to track which branch you are currently working on. When you switch branches (checkout), Git moves `HEAD` to point to the new branch and updates the files in your working directory to match.

> **The Day 1 connection:** On Day 1, you created a `learn/[username]` branch on GitHub.com. That branch was a pointer to a specific commit on the repository. When you edited files on that branch, new commits moved the pointer forward. The `main` branch stayed unchanged until your pull request was merged.

---

## 5. Local vs Remote

So far, we have talked about one repository. In practice, you work with two copies of the same repository.

### The remote repository

The remote repository is the one on GitHub.com. It is called `origin` by convention. When you see a repository URL like `github.com/Community-Access/learning-room`, that is the remote.

The remote is the shared copy. Everyone on the team can see it. Pull requests happen here. Issues live here. It is the source of truth for the project.

### The local repository

The local repository is the copy on your computer. When you run `git clone`, Git downloads the entire repository -- all files, all branches, all history -- to your machine. You now have a complete, independent copy.

You can make commits locally without any internet connection. Your commits are saved in your local repository. The remote does not know about them until you push.

### How local and remote stay in sync

| Operation | Direction | What it does |
|---|---|---|
| `git clone` | Remote to local | Creates a new local copy of the entire remote repository |
| `git push` | Local to remote | Sends your local commits to the remote repository |
| `git pull` | Remote to local | Downloads new commits from the remote and merges them into your branch |
| `git fetch` | Remote to local | Downloads new commits from the remote but does not merge them |

### The two-copy model

```text
Your computer (local)              GitHub.com (remote / origin)
+-------------------+              +-------------------+
| working directory  |   git push   |                   |
| staging area       |  -------->   |  shared branches  |
| repository (.git)  |  <--------   |  pull requests    |
+-------------------+   git pull   |  issues           |
                                    +-------------------+
```

> **Screen reader note:** The text diagram above shows two boxes side by side connected by arrows. The left box is labeled "Your computer (local)" and contains working directory, staging area, and repository. The right box is labeled "GitHub.com (remote / origin)" and contains shared branches, pull requests, and issues. Arrows show `git push` going from left to right and `git pull` going from right to left.

---

## 6. Push, Pull, and Fetch

These three operations keep your local and remote repositories synchronized.

### Push: share your work

`git push` sends your local commits to the remote. After pushing, anyone who looks at the repository on GitHub.com will see your changes.

Push only sends commits on the current branch. If you are on the `fix/typo` branch and push, only `fix/typo` commits go to the remote. Other branches are untouched.

```bash
git push origin fix/typo
```

If this is the first push for a new branch, use:

```bash
git push -u origin fix/typo
```

The `-u` flag sets up tracking so that future pushes from this branch go to the right place without specifying the remote and branch name.

### Pull: get other people's work

`git pull` downloads new commits from the remote and immediately merges them into your current branch. This is how you get changes that other people (or you on another computer) have pushed.

```bash
git pull origin main
```

Pull is actually two operations combined: fetch (download) + merge (integrate). Most of the time this works automatically. When it cannot merge automatically, you get a merge conflict (see Section 7).

### Fetch: check for updates without merging

`git fetch` downloads new commits from the remote but does not change your working directory or current branch. It just updates your local knowledge of what the remote looks like.

This is useful when you want to see if there are new changes before deciding to merge them.

```bash
git fetch origin
```

After fetching, you can compare your branch with the remote's version:

```bash
git log main..origin/main --oneline
```

This shows you what commits exist on the remote's `main` that you do not have locally.

---

## 7. Why Merge Conflicts Happen

A merge conflict happens when Git cannot automatically combine two sets of changes. This is not an error. It is Git asking you for help.

### When conflicts occur

Conflicts happen when two branches modify the same lines in the same file. Git knows how to merge changes to different files, and even different parts of the same file. But when two branches change the same line differently, Git cannot decide which version to keep.

### What a conflict looks like

When a conflict occurs, Git marks the conflicting section in the file with special markers:

```text
<<<<<<< HEAD
This is the text from your current branch.
=======
This is the text from the branch you are merging in.
>>>>>>> fix/typo
```

| Marker | Meaning |
|---|---|
| `<<<<<<< HEAD` | Start of your current branch's version |
| `=======` | Divider between the two versions |
| `>>>>>>> fix/typo` | End of the incoming branch's version |

### How to resolve a conflict

1. Open the file with the conflict markers
2. Read both versions and decide which text to keep (or write a new version that combines both)
3. Delete the conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`)
4. Save the file
5. Stage and commit the resolved file

> **The Day 1 connection:** In [Chapter 7](07-merge-conflicts.md), you resolved a merge conflict on GitHub.com using the web editor. The same markers appeared there. On Day 2, you will resolve conflicts in VS Code, where the editor highlights the markers and offers buttons to accept one side or the other.

### Why conflicts are normal

Conflicts are not mistakes. They happen in every project where more than one person works at the same time. The fact that Git stops and asks is a safety feature -- it prevents data loss by never silently choosing one version over another.

---

## 8. The Git Timeline

Every commit has a parent pointer (except the very first commit). This creates a chain -- a timeline of the project's history.

### Reading the timeline

The timeline reads backward: the most recent commit points to the one before it, which points to the one before that, all the way back to the first commit.

```text
first commit <-- second commit <-- third commit <-- fourth commit (main)
```

When you run `git log`, Git follows these pointers from the current commit backward and shows you each commit's message, author, date, and hash.

### Branching creates parallel timelines

When two branches diverge (both have commits that the other does not), the timeline splits into two parallel paths:

```text
                  +-- commit E -- commit F (fix/typo)
                 /
commit A -- commit B -- commit C -- commit D (main)
```

Both branches share commits A and B (their common history). After the split point, each branch has its own commits.

### Merging reconnects timelines

When you merge `fix/typo` into `main`, Git creates a new merge commit that has two parents: the latest commit on `main` and the latest commit on `fix/typo`. The two timelines join back together.

```text
                  +-- commit E -- commit F (fix/typo)
                 /                          \
commit A -- B -- C -- D -------- merge commit G (main)
```

After merging, `main` contains all the changes from both branches.

> **Screen reader note:** The text diagrams in this section show commit history as a horizontal chain reading left to right. Branch points are shown with `+--` and merge points are shown with `\`. The key information is: branches diverge from a common ancestor commit and merge back together with a merge commit.

---

## 9. Putting It All Together

Here is the complete workflow that you will practice in [Chapter 14](14-git-in-practice.md), translated through the mental model:

| Step | What you do | What Git does |
|---|---|---|
| Clone the repo | `git clone URL` | Copies the entire remote repository to your computer |
| Create a branch | `git checkout -b fix/typo` | Creates a new pointer at your current commit and switches HEAD to it |
| Edit a file | Open and modify the file | Git detects the change in the working directory |
| Stage the change | `git add file.md` | Moves the change from the working directory to the staging area |
| Commit | `git commit -m "Fix typo"` | Takes a snapshot of the staging area and stores it in the repository |
| Push | `git push -u origin fix/typo` | Sends your commit to the remote repository on GitHub |
| Open a PR | On GitHub.com | Proposes merging your branch into main |
| Merge | PR merged on GitHub.com | Creates a merge commit that joins your branch back into main |
| Pull | `git pull origin main` | Downloads the merge commit to your local copy |

Everything in this table maps directly to the three areas (Section 2), the two copies (Section 5), and the timeline (Section 8).

### Quick mental model checklist

Before running a Git command, ask yourself:

- **Where am I?** Which branch is HEAD on? (`git status` tells you)
- **What has changed?** Are there modifications in the working directory? Staged changes? (`git status` tells you)
- **Which direction?** Am I pushing (local to remote) or pulling (remote to local)?
- **What could conflict?** Has anyone else changed the same files on the same branch?

If you can answer these four questions, you can troubleshoot almost any Git situation.

---

## 10. If You Get Stuck

| Situation | What to do |
|---|---|
| "I do not understand which area my file is in" | Run `git status`. It lists files in each area with clear labels (modified, staged, untracked). |
| "I committed to the wrong branch" | Do not panic. The commit is safe. See [Appendix E](appendix-e-advanced-git.md) for how to move commits between branches. |
| "I pushed something I did not mean to push" | The remote now has your commit. You can revert it with a new commit. Never force-push on a shared branch without coordination. |
| "I have merge conflict markers and do not know what to do" | Go to [Chapter 7](07-merge-conflicts.md) for step-by-step resolution. The key rule: delete all markers, keep the text you want, stage, and commit. |
| "Git says my branch is behind the remote" | Run `git pull` to download the new commits. If there are conflicts, resolve them. |
| "I do not understand the error message" | Copy the exact error text and search for it. The [Pro Git book troubleshooting section](https://git-scm.com/book/en/v2) and [Stack Overflow](https://stackoverflow.com/questions/tagged/git) both have clear explanations. |

**If nothing in this table helps:** Post the exact error message on your challenge issue. Include the output of `git status` and `git log --oneline -5`. A facilitator or buddy can diagnose almost any Git problem from these two commands.

---

*Next: [Git in Practice](14-git-in-practice.md)*
*Back: [VS Code: Accessibility Deep Dive](12-vscode-accessibility.md)*
*Related: [Advanced Git](appendix-e-advanced-git.md) | [Git Authentication](appendix-d-git-authentication.md) | [Git Security](appendix-f-git-security.md)*
