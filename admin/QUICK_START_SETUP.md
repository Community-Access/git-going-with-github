# Quick Start: Get GitHub Classroom Integration Running in 30 Minutes

This quick start walks you through setup in the fastest possible way.

## Prerequisites
- GitHub Classroom org created (or use existing): https://classroom.github.com
- Admin access to Community-Access/git-going-with-github repo
- Day 1 & Day 2 assignments created in Classroom (or have their links ready)

## Step 1: Create Your Classroom Organization (5 min)

Skip if already done.

1. Go: https://classroom.github.com
2. Create org: `git-going-classroom-cohort-YYYY-MM`
3. Add facilitators as owners
4. Create Day 1 & Day 2 assignments, save links

## Step 2: Configure Repository Variables (5 min)

Go: https://github.com/Community-Access/git-going-with-github/settings/variables

Create/update these variables:

| Name | Value |
|------|-------|
| `CLASSROOM_ORG` | Your org name, e.g. `git-going-classroom-cohort-2025-01` |
| `CLASSROOM_DAY1_ASSIGNMENT_URL` | Your Day 1 Classroom link (e.g. `https://classroom.github.com/a/xyz123`) |
| `CLASSROOM_DAY2_ASSIGNMENT_URL` | Your Day 2 Classroom link (e.g. `https://classroom.github.com/a/abc456`) |
| `CLASSROOM_JOIN_URL` | (Optional) Classroom org join link |

Click "New repository variable" for each, paste value, click Add.

## Step 3: Create Classroom Org Token (10 min)

This allows the automation to send org member invitations.

1. Go: https://github.com/settings/personal-access-tokens/new
2. Fill:
   - **Token name**: `classroom-member-inviter`
   - **Expiration**: 90 days
   - **Permissions**: Check "Organization → Members → Read and Write"
   - **Resource**: Select your `git-going-classroom-cohort-YYYY-MM` org only
3. Click "Create token"
4. Copy the token value (starts with `ghp_`)

Now store it as a secret:

Go: https://github.com/Community-Access/git-going-with-github/settings/secrets/actions

Click "New repository secret":
- **Name**: `CLASSROOM_ORG_ADMIN_TOKEN`
- **Value**: Paste your token
- Click "Add secret"

## Step 4: Test (5 min)

1. Go: https://github.com/Community-Access/git-going-with-github/issues/new?template=classroom-enrollment.yml
2. Fill out the form with your own info
3. Submit
4. Watch the automation:
   - Go: https://github.com/Community-Access/git-going-with-github/actions
   - Click latest "Registration" run
   - Watch steps complete

Expected results:
- ✓ Issue body redacted (shows only "[ENROLL-INTAKE]" summary, no PII visible)
- ✓ Proficiency labels added (look for `proficiency-beginner`, etc.)
- ✓ Org invitation sent (check: https://github.com/orgs/YOUR_ORG/people?tab=outside-collaborators)
- ✓ Success comment posted with assignment links
- ✓ Issue closed

## Step 5: Go Live! (0 min)

You're done. Share the enrollment link with students:

> "Ready to join the workshop? Go here to enroll: https://github.com/Community-Access/git-going-with-github/issues/new?template=classroom-enrollment.yml"

Students will see the form, submit, and automation takes it from there.

---

## What Happens Automatically Now

When a student enrolls:
1. ✓ Form validated (required fields checked)
2. ✓ Org invitation sent (instantly)
3. ✓ Full data saved (private repo, no PII exposed)
4. ✓ Proficiency tagged (for facilitator triage)
5. ✓ Welcome comment posted (with assignment links)
6. ✓ Issue closed (clean, professional)

**Time to ready**: ~5 seconds  
**Facilitator intervention needed**: 0%

## Facilitator Next Steps

### Immediately
- [ ] Monitor who's enrolling: https://github.com/Community-Access/git-going-with-github/issues?label=classroom-enrollment
- [ ] Filter by proficiency: https://github.com/Community-Access/git-going-with-github/issues?label=proficiency-beginner
- [ ] Create "mentors" team from advanced students (optional)

### During Workshop
- [ ] Verify students accepted org invite
- [ ] Re-reach out to any who haven't started Day 1 assignment
- [ ] Use private admin repo for tracking: https://github.com/Community-Access/git-going-with-github-administration/issues?label=intake

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Org invitations not sending | Check `CLASSROOM_ORG_ADMIN_TOKEN` secret is set correctly |
| Assignment links not posting | Check `CLASSROOM_DAY1_ASSIGNMENT_URL` and `CLASSROOM_DAY2_ASSIGNMENT_URL` are set |
| Proficiency labels not appearing | Check workflow ran successfully in Actions tab |
| Students don't see enrollment form link | Share this URL: https://github.com/Community-Access/git-going-with-github/issues/new?template=classroom-enrollment.yml |

## Full Docs

- **Architecture & how it works**: [GITHUB_CLASSROOM_ARCHITECTURE.md](./GITHUB_CLASSROOM_ARCHITECTURE.md)
- **Token security & setup**: [FINE_GRAINED_TOKEN_SETUP.md](./FINE_GRAINED_TOKEN_SETUP.md)
- **Complete checklist**: [ENROLLMENT_SETUP_CHECKLIST.md](./ENROLLMENT_SETUP_CHECKLIST.md)
- **Operation guide**: [CLASSROOM_INTEGRATION_GUIDE.md](./CLASSROOM_INTEGRATION_GUIDE.md)

---

**Estimated time**: 30 minutes  
**Prerequisite knowledge**: None (step-by-step instructions provided)  
**Support**: Open issue in [Community-Access/support](https://github.com/Community-Access/support/issues)
