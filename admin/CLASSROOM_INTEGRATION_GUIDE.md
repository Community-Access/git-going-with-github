# GitHub Classroom Integration Guide

This guide helps facilitators connect student enrollment data with GitHub Classroom assignments and team management.

## Quick Start: Syncing Students to Classroom

### 1. Prepare Your Classroom Organization

- Create a classroom organization (or use existing): https://classroom.github.com
- Set up Day 1 and Day 2 assignments with your Classroom links
- Add yourself and co-facilitators as org owners

### 2. Configure Repository Integration

Set these variables in the git-going-with-github repository settings:

| Variable | Example | Purpose |
|----------|---------|---------|
| `CLASSROOM_ORG` | `git-going-classroom-cohort-2` | Organization where students will be invited |
| `CLASSROOM_JOIN_URL` | `https://classroom.github.com/a/...` | Classroom org join link (optional, posted to students) |
| `CLASSROOM_DAY1_ASSIGNMENT_URL` | GitHub Classroom Day 1 assignment link | Posted to students after enrollment |
| `CLASSROOM_DAY2_ASSIGNMENT_URL` | GitHub Classroom Day 2 assignment link | Posted to students after enrollment |
| `CLASSROOM_ORG_ADMIN_TOKEN` | Fine-grained token (see below) | Used to invite students to org |

### 3. Create a Fine-Grained Token

1. Go to Personal Access Tokens: https://github.com/settings/personal-access-tokens/new
2. Name: `Classroom Enrollment Integration`
3. Resource owner: Select your `git-going-classroom-cohort-*` organization
4. Permissions:
   - Organization: Members Read/Write (to send invitations)
5. Create and copy the token value
6. Add to repository as secret: `CLASSROOM_ORG_ADMIN_TOKEN`

### 4. Proficiency-Based Triage

When students enroll, the workflow automatically adds proficiency labels:

- `proficiency-beginner` — New to GitHub or VS Code
- `proficiency-intermediate` — Some experience
- `proficiency-advanced` — Confident users

### 5. Viewing Enrollment Data

- **Public issues**: Redacted for privacy. See [git-going-with-github/issues](https://github.com/Community-Access/git-going-with-github/issues)
- **Private intake**: Full details stored in [git-going-with-github-administration](https://github.com/Community-Access/git-going-with-github-administration)
  - Filter by `label:intake` or `label:classroom-enrollment` to see all intakes
  - Use proficiency labels to plan team assignments

## Workflow: Enrollment → Team Assignment → Assignments

### Day 0: Enrollment Opens
- Students submit enrollment form
- Workflow validates, redacts public issue, posts success comment with classroom link
- Student receives org invitation

### Day 0-1: Facilitator Triage
- Open [enrollment issues with proficiency labels](https://github.com/Community-Access/git-going-with-github/issues?q=label%3Aproficiency-beginner+OR+label%3Aproficiency-intermediate+OR+label%3Aproficiency-advanced)
- For advanced proficiency students: consider pairing as peer mentors in team assignments
- For beginner students: consider providing extra pre-workshop setup support

### Day 1: Teams & Assignments
- Create teams in classroom org (if using pair programming):
  - Team: `mentors` (advanced proficiency students)
  - Team: `learners` (mixed proficiency for support)
- Students accept org invitation from their GitHub notifications
- Students access Day 1 assignment via the link posted in their enrollment issue

### Day 1-2: Track Progress
- Monitor assignment submissions in GitHub Classroom
- Identify students who haven't started Day 1
- Re-reach out via [Support Hub Issues](https://github.com/Community-Access/support/issues)

### Day 2: Advanced Assignment
- Link to Day 2 assignment is posted in student enrollment comments (if configured)
- Day 2 focuses on pair programming, code review, and open-source contribution

## Troubleshooting

### "Enrollment is temporarily unavailable"
- **Cause**: `PRIVATE_STUDENT_DATA_REPO` or `PRIVATE_STUDENT_DATA_TOKEN` not configured
- **Fix**: Follow section 2 (Configure Repository Integration) above

### Student didn't receive org invitation
- **Cause**: `CLASSROOM_ORG_ADMIN_TOKEN` is missing or expired
- **Fix**: Create a new fine-grained token (section 3) and update the secret

### Can't find enrollment details
- **Location**: Private repo → [git-going-with-github-administration/issues](https://github.com/Community-Access/git-going-with-github-administration/issues)
- **Search**: Filter by `label:intake` to see all student intakes
- **Privacy**: Full student PII (name, email, notes) visible only to org members with repo access

## Exporting Student Roster

To export all enrolled students to a CSV (for import to a separate tool):

1. Go to [Workflow Runs](https://github.com/Community-Access/git-going-with-github/actions/workflows/registration.yml)
2. Click **Run Workflow**
3. Select **export-classroom-intake** job (if enabled)
4. Download artifact: `classroom-intake-data` → `classroom-intake.csv`

**Note**: Public CSV export is disabled by default for privacy. To enable:
- Set variable: `ENABLE_PUBLIC_CLASSROOM_INTAKE_EXPORT = true`
- Then re-run the workflow

## Need Help?

- **Technical**: Open an issue in [Support Hub](https://github.com/Community-Access/support/issues)
- **Best Practices**: See [FACILITATOR_GUIDE.md](./FACILITATOR_GUIDE.md)
- **Admin Access**: Contact a repository maintainer for secret/variable updates
