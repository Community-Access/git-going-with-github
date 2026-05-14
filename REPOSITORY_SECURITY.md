# Repository Security & Access Guidelines

## Overview

This repository hosts the curriculum and facilitator materials for the Git Going with GitHub workshop. Student work happens in **individual private repositories** created by GitHub Classroom, not in this repository. This document covers the security model for both the curriculum repository and the student repositories.

## Access Control

### Curriculum Repository (git-going-with-github)

| Role | Repository | Issues | PRs | Settings |
|---|---|---|---|---|
| Facilitators | Full access | Full access | Review and merge | Admin |
| Contributors | Read | Create and comment | Create | None |
| Public | Read | View | View | None |

This repository is public. It contains no secrets, student data, or sensitive configuration. All curriculum content is openly licensed.

### Student Repositories (created by GitHub Classroom)

| Role | Repository | Issues | PRs | Settings |
|---|---|---|---|---|
| Student (owner) | Read/Write | Full access | Create and merge | Limited (no Actions config) |
| Facilitators | Full access via Classroom | Full access | Review and comment | Admin |
| Other students | No access | No access | No access | No access |

Student repositories are **private by default**. Each student can only see their own repo. Facilitators see all student repos through the GitHub Classroom dashboard.

### Organization Membership

Students do **not** need to be members of the Community-Access organization. GitHub Classroom handles all access automatically when a student accepts an assignment invite link. The student is granted access to their individual repo without any org-level permissions.

Facilitators **do** need organization-level access to manage the classroom. See the Facilitator Access section below.

## Branch Protection

### Curriculum Repository (main branch)

**Protection Rules:**
- Require pull request reviews: Yes (1 approval minimum)
- Require status checks to pass: Yes (GitHub Actions validation)
- Require branches to be up to date: No (to avoid unnecessary merge conflicts)
- Allow auto-merge: No (manual merge only for safety)
- Allow force pushes: No (protect history)
- Allow deletions: No (protect branch)

### Student Repositories

Student repos are created from the `learning-room-template`. Branch protection in student repos is intentionally minimal:

- Students can create branches freely (required for challenges)
- Students can merge their own PRs (required for the learning flow)
- No force push protection (students are learning; mistakes are part of the process)
- GitHub Actions workflows run with read/write permissions (required for Gandalf and the Progression Bot)

### What Students Cannot Do

Even within their own repo, students cannot:
- Access GitHub Actions secrets at the organization level
- Modify workflow files that run with elevated permissions
- Access other students' repositories
- View the classroom admin settings

## Permission Model

### Least Privilege

The GitHub Classroom model enforces least privilege by design:

- Students are **not** organization members
- Students have **no** access to the curriculum repository's settings
- Students have **no** access to other students' repos
- Students have **no** access to CI/CD secrets or org-level configuration
- Students **can** create branches, issues, and PRs in their own repo
- Students **can** push to any branch in their own repo
- Students **can** merge PRs in their own repo (with autograder checks reporting status)

## Facilitator Access

### Required Access Level

Facilitators must be **Owners** or **Admins** of the Community-Access organization to:

- Create and manage GitHub Classroom assignments
- View all student repositories through the classroom dashboard
- Comment on student PRs via the feedback pull request
- Monitor autograding results
- Troubleshoot workflow failures in student repos

### Adding a Facilitator

```bash
# Add a facilitator as an org admin
gh api /orgs/Community-Access/memberships/USERNAME -X PUT -f role=admin

# Verify the role
gh api /orgs/Community-Access/memberships/USERNAME --jq .role
# Expected output: "admin"
```

### Removing a Facilitator After the Workshop

```bash
# Downgrade to member (retains read access) or remove entirely
gh api /orgs/Community-Access/memberships/USERNAME -X DELETE
```

## GitHub Actions Security

### Workflows in Student Repositories

The template repository includes these workflows, which are copied into every student repo:

| Workflow | Trigger | Permissions | What It Does |
|---|---|---|---|
| `pr-validation-bot.yml` | PR opened/updated | Read/Write | Gandalf validates PR structure and posts feedback |
| `student-progression.yml` | Issue closed | Read/Write | Creates the next challenge issue |
| `autograder-conflicts.yml` | Push | Read | Checks for conflict markers |
| `autograder-local-commit.yml` | Push | Read | Verifies local commit evidence |
| `autograder-template.yml` | Push | Read | Validates YAML template |
| `autograder-capstone.yml` | Push | Read | Validates agent file structure |

**Safety guarantees:**
- Workflows use only `GITHUB_TOKEN` (scoped to the individual student repo)
- No external API keys or webhook secrets are stored
- Workflows cannot access other repositories or organization-level resources
- Workflow code is visible to the student (transparency)

### Curriculum Repository Workflows

The curriculum repo uses standard CI workflows for building HTML/EPUB output. These workflows:
- Run on PRs to `main` only
- Have read-only permissions
- Do not deploy to production automatically
- Cannot modify student repositories

## Data Privacy

### What Data Is Stored

**In the curriculum repository:**
- No student data. This repo contains only curriculum content and facilitator guides.

**In the private student-success repository:**
- Private cohort operations data belongs in `Community-Access/git-going-student-success`
- This includes registration exports, facilitator notes, accommodation follow-up, grade exports, and student-success follow-up records
- Do not store credentials, API keys, or tokens there; use an approved secret manager for secrets

**In GitHub Classroom:**
- Student GitHub usernames (public information)
- Roster data (identifier, optional name, optional email) -- visible only to classroom admins
- Assignment acceptance timestamps
- Autograding scores

**In student repositories:**
- Commit history (who wrote what, when)
- Issue and PR comments (visible only to the student and facilitators)
- Branch names

### What Data Is NOT Stored

- Real names (optional in roster; not required)
- Home addresses
- Phone numbers
- Email addresses (only if added to roster by the facilitator)
- Payment information
- Health information beyond what students voluntarily disclose

### Data Retention

Student repositories persist after the workshop unless explicitly deleted. Facilitators can:
- Archive the classroom (makes repos read-only; preserves them as portfolio pieces)
- Delete student repos through the classroom settings
- Export grades before archiving

See [teardown-checklist.md](classroom/teardown-checklist.md) for the complete post-workshop cleanup process. Preserve private student-success records in `Community-Access/git-going-student-success` before deleting local exports or archiving Classroom data.

## Safety Checks

### Before the Workshop

**Deployment verification:** Complete the verification checklist in the [Workshop Deployment Guide](classroom/README.md#step-6-verify-everything-works). This confirms:
- Student repos are created correctly from the template
- Gandalf responds to PRs within 60 seconds
- The Progression Bot creates challenge issues on issue close
- Autograding runs and reports results
- The feedback PR is created by Classroom

**Facilitator access:** Confirm all facilitators can:
- View the classroom dashboard
- Open student repos from the dashboard
- Comment on student issues and PRs

### During the Workshop

**Monitoring:**
- GitHub status page: https://www.githubstatus.com/
- Classroom dashboard for student progress and autograding results
- Student repos' Actions tabs for workflow failures

**Incident Response:**

| Incident | Response |
|---|---|
| GitHub is down | Continue teaching fundamentals offline; resume when GitHub is back |
| Gandalf stops responding | Check Actions tab; facilitators post feedback manually until resolved |
| Autograding fails | Check workflow logs; use it as a teaching moment about CI/CD |
| Student cannot accept invite | Verify GitHub account exists and is signed in; check roster match |
| Progression Bot skips a challenge | Check Actions tab for errors; manually create the missed issue |

## Rollback & Emergency

### If Something Goes Wrong

**GitHub outage:**
- Monitor: https://www.githubstatus.com/
- Fallback: Continue teaching fundamentals offline
- Recovery: Resume when GitHub is back; student repos persist through outages

**Student accidentally deletes a workflow file:**
- Restore the file from the template repository
- Commit directly to the student's `main` branch
- The workflow resumes on the next trigger

**Need to revert a student's work:**
- Use `git revert` (do not force push -- protect learning history)
- Guide the student through the revert as a teaching moment

**Student repo is corrupted:**
- Have the student accept the invite link again (Classroom creates a fresh repo if the original is deleted)
- Or restore files manually from the template

## Compliance & Audit

### What Is Logged

GitHub automatically logs:
- All push events (who, what, when)
- All PR activity (created, reviewed, merged)
- All issue activity (created, commented, closed)
- Workflow runs and results

These logs are available in:
- Each repository's Actions tab (workflow history)
- Organization settings > Audit log (admin actions)
- GitHub Classroom dashboard (assignment and grading data)

### Audit Priorities

- All curriculum changes go through PR review (enforced by branch protection)
- No direct pushes to `main` in the curriculum repository
- Student repos use automation only through `GITHUB_TOKEN` (no external credentials)
- Facilitator access is scoped to the workshop duration and removed afterward

## Contact & Support

**GitHub Organization:** https://github.com/Community-Access
**Curriculum Repository:** https://github.com/Community-Access/git-going-with-github
**GitHub Classroom:** https://classroom.github.com
**GitHub Status:** https://www.githubstatus.com/

## Authoritative Sources

Use these official references when you need the current source of truth for facts in this chapter.

- [GitHub Docs, home](https://docs.github.com/en)
- [GitHub Changelog](https://github.blog/changelog/)
- [GitHub security features](https://docs.github.com/en/code-security/getting-started/github-security-features)
- [Dependabot docs](https://docs.github.com/en/code-security/dependabot)
- [Secret scanning docs](https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning)

### Section-Level Source Map

Use this map to verify facts for each major section in this file.

- **Overview:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub security features](https://docs.github.com/en/code-security/getting-started/github-security-features), [Dependabot docs](https://docs.github.com/en/code-security/dependabot), [Secret scanning docs](https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning)
- **Access Control:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub security features](https://docs.github.com/en/code-security/getting-started/github-security-features), [Dependabot docs](https://docs.github.com/en/code-security/dependabot), [Secret scanning docs](https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning)
- **Branch Protection:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub security features](https://docs.github.com/en/code-security/getting-started/github-security-features), [Dependabot docs](https://docs.github.com/en/code-security/dependabot), [Secret scanning docs](https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning)
- **Permission Model:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub security features](https://docs.github.com/en/code-security/getting-started/github-security-features), [Dependabot docs](https://docs.github.com/en/code-security/dependabot), [Secret scanning docs](https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning)
- **Facilitator Access:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub security features](https://docs.github.com/en/code-security/getting-started/github-security-features), [Dependabot docs](https://docs.github.com/en/code-security/dependabot), [Secret scanning docs](https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning)
- **GitHub Actions Security:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub security features](https://docs.github.com/en/code-security/getting-started/github-security-features), [Dependabot docs](https://docs.github.com/en/code-security/dependabot), [Secret scanning docs](https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning)
- **Data Privacy:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub security features](https://docs.github.com/en/code-security/getting-started/github-security-features), [Dependabot docs](https://docs.github.com/en/code-security/dependabot), [Secret scanning docs](https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning)
- **Safety Checks:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub security features](https://docs.github.com/en/code-security/getting-started/github-security-features), [Dependabot docs](https://docs.github.com/en/code-security/dependabot), [Secret scanning docs](https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning)
- **Rollback & Emergency:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub security features](https://docs.github.com/en/code-security/getting-started/github-security-features), [Dependabot docs](https://docs.github.com/en/code-security/dependabot), [Secret scanning docs](https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning)
- **Compliance & Audit:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub security features](https://docs.github.com/en/code-security/getting-started/github-security-features), [Dependabot docs](https://docs.github.com/en/code-security/dependabot), [Secret scanning docs](https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning)
- **Contact & Support:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub security features](https://docs.github.com/en/code-security/getting-started/github-security-features), [Dependabot docs](https://docs.github.com/en/code-security/dependabot), [Secret scanning docs](https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning)
