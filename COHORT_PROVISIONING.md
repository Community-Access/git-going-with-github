# Provisioning a New Workshop Cohort

When running a new session of the **GIT Going with GitHub** workshop, you cannot reuse the previous cohort's `learning-room` repository. The learning room acts as a "multi-player sandbox", meaning it quickly fills up with dozens of student branches, hundreds of pull requests, and thousands of commit histories. 

To ensure a pristine experience for each new cohort, we treat the `learning-room` repository as a **Template**, and instantiate a fresh copy for each event.

This guide outlines the end-to-end process for provisioning a new learning room.

---

## Step 1: Create the New Sandbox Repository

The base structure of the learning room (including the practice Markdown files with intentionally broken links, base `.github` workflows, and the Aria bot responders) lives in the `main` branch of the `learning-room` repository, stripped of all student data.

1. Navigate to the canonical repository: `https://github.com/Community-Access/learning-room`
2. Click the green **Use this template** button (or create a new repository and select `learning-room` as the template).
3. Name the new repository using a cohort-specific identifier, e.g., `learning-room-summer-2026`.
4. Ensure the repository is **Public** (required for GitHub Actions and branching workflows).
5. Do *not* include all branches; only include `main`.

## Step 2: Configure Repository Settings

Once the new repository (`learning-room-[cohort]`) is spun up, ensure the following settings are active:

1. **Issues:** Verify that Issues are enabled.
2. **Pull Requests:** Verify that PRs are enabled. 
3. **Actions Permissions:** 
   - Go to **Settings > Actions > General**.
   - Ensure the standard `GITHUB_TOKEN` has **Read and write permissions** (Aria needs this to post comments and validate PRs).
   - Ensure "Allow GitHub Actions to create and approve pull requests" is checked.

## Step 3: Invite the Students

GitHub requires users to be members of the organization or collaborators on a repository *before* issues can be automatically assigned to them. 

1. Ensure all registered students have accepted their invitations to the `Community-Access` GitHub organization.
2. Cross-reference the registration CSV with the org member list to handle any pending invites. 
*(See `STUDENT_MANAGEMENT.md` for scripts on bulk-inviting users.)*

## Step 4: Provision the Challenge Issues

The core of the workshop's hand-held UX relies on pre-populated GitHub Issues assigned directly to each student. Without these issues, students have no "workspace" to operate out of when they read the Course Guide.

We have a centralized PowerShell script that iterates through every member of the organization, verifies if they have their issue suite, and creates all required challenges via the GitHub API.

Open your terminal in the `git-going-with-github` repository:

```powershell
# 1. Ensure you are authenticated with the GitHub CLI
gh auth login

# 2. Run a Dry Run to verify the environment and student list
.\scripts\create_all_challenges.ps1 -DryRun -TargetRepo "Community-Access/learning-room-summer-2026"

# 3. Provision the issues (this will take several minutes to run)
.\scripts\create_all_challenges.ps1 -TargetRepo "Community-Access/learning-room-summer-2026"
```

> **Note:** The script is idempotent. If a student joins late, you can simply re-run the exact same command. It will scan the repo, skip issues that already exist, and only generate the missing issues for the new student.

## Step 5: Update the Curriculum Links

By default, the central curriculum repository (`git-going-with-github`) points out to the generic `learning-room` repository. 

If you are running an isolated cohort, you must do a quick Find-and-Replace across the Markdown chapters to redirect students to the specific repository instance.

1. Open VS Code in `git-going-with-github`.
2. Do a global workspace search for `Community-Access/learning-room`.
3. Replace with `Community-Access/learning-room-summer-2026`.
4. Commit and push the updated branch.

---

## Archiving a Cohort (Post-Workshop)

Once the weekend is over, you should preserve the students' work so they have a permanent portfolio piece, but freeze the environment.

1. Go to **Settings > General** in the specific `learning-room-[cohort]` repo.
2. Scroll to the "Danger Zone" at the bottom.
3. Click **Archive this repository**.
   - This makes the repo Read-Only.
   - It signals to future employers that this was a completed workshop project.
   - It prevents automated bots (like Dependabot) from creating noise in old repos.