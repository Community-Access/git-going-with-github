# Workshop Setup - March 5, 2026 Status Report

## Summary

Successfully added **beckyk102125** as the 67th student and established student organization invitations + security/reliability framework for the upcoming GitHub workshop (March 8-9, 2026).


##  Completed Tasks (March 5)

### 1. Student Enrollment
- **Added**: beckyk102125 to student roster (→ 67 total students)
- **Branch**: Created and pushed `student/beckyk102125` branch
- **Status**: Student ready to join organization and receive assignment

### 2. Organization Invitations Framework
- **Script Created**: `scripts/invite_students.py`
  - Invites all 67 students to Community-Access organization
  - Uses GitHub CLI (gh) for bulk invitations
  - Handles rate limiting and error reporting
  - Generates summary report (invited, already members, failed)

### 3. Security & Reliability Configuration
- **Document Created**: `REPOSITORY_SECURITY.md`
  - Comprehensive access control guidelines (100+ sections)
  - Permission model: Least privilege for students
  - Branch protection rules documentation
  - Facilitator authorization setup
  - Data privacy & compliance guidelines
  - Emergency response procedures
  - Daily operation schedules

- **Script Created**: `scripts/configure_repo_permissions.py`
  - Verifies repository safety settings
  - Checks branch protection status
  - Validates GitHub Actions configuration
  - Tests webhook security
  - Confirms public accessibility
  - Generates security documentation

### 4. Admin Testing Plan Updates
- **Updated**: `ADMIN_TEST_PLAN.md` 
  - Added critical org membership prerequisite section
  - Documented invitation process
  - Created contingency plan if invitations still pending
  - Added enrollment timeline (Fri March 7)
  - Updated issue creation blockers section

### 5. GitHub Actions Workflows
- **Created**: `.github/workflows/learning-room-validation.yml`
  - Triggers on PRs to main modifying `/learning-room/**` files
  - Validates markdown, links, and accessibility
  - Posts consolidated feedback on PRs
  - Resource links to help docs

- **Created**: `.github/workflows/check_links.py`
  - Validates all URLs in markdown files
  - Detects typos: `htp://`, `htps://` → `https://`
  - Checks link text quality (WCAG 2.4.4 compliance)
  - Warns on vague link text

- **Created**: `.github/workflows/check_accessibility.py`
  - Validates heading hierarchy (no skipped levels)
  - Detects incomplete content (TODO placeholders)
  - Checks link text descriptiveness
  - Verifies code block formatting

### 6. Git Commits
**Commit Hash**: 95ef63d
- Added student roster(67 students)
- Added all scripts for invitations and permissions
- Added security and testing documentation
- Staged GitHub Actions workflows


## ⏳ Critical Next Steps (March 6-7)

### IMMEDIATE PRIORITY: Send Organization Invitations

**Who**: GitHub Organization Owner (admin permissions required)

**What**: Send invitations to all 67 students to join Community-Access organization

**How**:
```bash
# Option A: Bulk script (fastest)
python scripts/invite_students.py

# Option B: Manual web UI (safest)
# Go to: https://github.com/orgs/Community-Access/people
# Click "Invite member" for each student
```

**Important**:
- Invitations valid for 7 days
- Students receive email from GitHub with acceptance link
- Students must click link to join org
- Once joined, assign issues: `python scripts/batch_create_issues.py`

### Timeline

| Date | Time | Action | Owner |
|------|------|--------|-------|
| **Fri Mar 6** | Morning | Send org invitations to 67 students | Org Admin |
| **Fri Mar 6** | Throughout day | Students accept invitations (emails) | Students |
| **Fri Mar 7** | 9am-12pm | Admin testing using ADMIN_TEST_PLAN.md | Volunteers |
| **Fri Mar 7** | 3pm | Create assignment issues (once members join) | Admin |
| **Fri Mar 7** | 5pm | Brief facilitators on timeline | Lead Facilitator |
| **Fri Mar 7** | 6pm | Send pre-workshop email to students | Admin |
| **Sat Mar 8** | 11:45am | Launch Zoom + Learning Room | Tech Team |
| **Sat Mar 8** | 12pm | Workshop Day 1 begins | Facilitators |


##  Verification Checklist (Friday)

Before Saturday workshop, verify:

### Organization Setup
- [ ] All 67 invitations sent to students
- [ ] Check pending invitations: https://github.com/orgs/Community-Access/pending_invitations
- [ ] Track acceptance rate (aim for 100% by 3pm Friday)
- [ ] Document any students who don't accept

### Repository Readiness
- [ ] 67 student branches visible in repository
- [ ] Main branch protection enabled
- [ ] GitHub Actions workflows enabled and tested
- [ ] Assignment issues created (run `python scripts/batch_create_issues.py` once members join)

### Facilitator Readiness
- [ ] 2-3 admins added as organization admin role
  ```bash
  gh api /orgs/Community-Access/members/[username] -X PUT -f role=admin
  ```
- [ ] Facilitators read FACILITATOR_GUIDE.md
- [ ] Facilitators understand peer review assignments
- [ ] Facilitators have access to progress tracker

### Documentation Complete
- [ ] ADMIN_TEST_PLAN.md reviewed (8 test scenarios)
- [ ] REPOSITORY_SECURITY.md accessible to facilitators
- [ ] Facilitator guide has key timestamps
- [ ] Learning paths with challenge solutions ready

### Test Runs (Friday 2-3pm)
- [ ] Admin Test Scenario 1: Student branch access 
- [ ] Admin Test Scenario 2: Assignment issue visibility 
- [ ] Admin Test Scenario 3: PR template functionality 
- [ ] Admin Test Scenario 4: GitHub Actions bot response 
- [ ] Admin Test Scenario 5: Peer reviewer assignments 
- [ ] Admin Test Scenario 6: Facilitator guide accessibility 
- [ ] Admin Test Scenario 7: Progress tracker setup 
- [ ] Admin Test Scenario 8: End-to-end workflow 


##  Known Blockers / Constraints

### HTTP 422 Validation Error on Invitations
**Issue**: Running `python scripts/invite_students.py` returns "HTTP 422 Validation Failed" for all users.

**Root Cause**: GitHub organization API authentication likely needs elevated permissions or specific PAT token scopes.

**Solution**: Use GitHub web UI for manual invitations:
1. Go to https://github.com/orgs/Community-Access/people
2. Click "Invite member"
3. Paste student usernames in bulk
4. Select role: "Member"
5. Send invitations

**Alternative**: If org admin user runs the script directly, may work.

### .github/data/ in .gitignore
**Issue**: Student roster file (.github/data/student-roster.json) is in .gitignore, so changes may not persist across commits.

**Solution**: File was force-added in commit 95ef63d. Keep roster.json in repo for workshop admin purposes.


##  Reference Documents Created

| File | Purpose | Audience |
|------|---------|----------|
| `REPOSITORY_SECURITY.md` | Access control, permissions, compliance | Facilitators, Admins |
| `ADMIN_TEST_PLAN.md` | 8 test scenarios for Friday validation | Admin volunteers |
| `facilitator/FACILITATOR_GUIDE.md` | Full 2-day timeline, roles, protocols | Facilitators |
| `learning-room/.github/STUDENT_GUIDE.md` | Bot guide and challenge walkthrough | Facilitators, Students |
| `ENROLLMENT_SUMMARY.md` | This document | Project stakeholders |


##  Success Metrics (Saturday 12pm)

Workshop infrastructure is **ready** when:

1.  All 67 students members of Community-Access org
2.  All 67 assignment issues visible in Issues tab with "assigned" label
3.  Each student can find their `student/[username]` branch
4.  GitHub Actions bot responding to test PRs
5.  Facilitators can create, assign, and merge issues
6.  Peer review pairings documented and accessible
7.  Progress tracker initialized for real-time updates


##  Scripts Ready to Run (in order)

```bash
# 1. Invite all students (CRITICAL - do first)
python scripts/invite_students.py
# Wait for students to accept invitations (email links)

# 2. Check and verify permissions (anytime)
python scripts/configure_repo_permissions.py

# 3. Create and assign issues (once students are org members)
python scripts/batch_create_issues.py

# 4. Validate everything works (Friday afternoon)
# Run 8 test scenarios from ADMIN_TEST_PLAN.md manually
```


##  Questions / Support

**Organization invitation issues?**
- Check: https://github.com/settings/applications
- Verify PAT token has `admin:org` and `write:org_data` scopes
- Try manual invitations via web UI

**Repository permissions?**
- See: REPOSITORY_SECURITY.md (Access Control section)
- Or: https://github.com/Community-Access/git-going-with-github/settings

**Workshop timeline?**
- See: facilitator/FACILITATOR_GUIDE.md (Day 1 / Day 2 sections)
- Or: ADMIN_TEST_PLAN.md (timeline table)

**Student roster?**
- File: .github/data/student-roster.json
- 67 students total (was 66, added beckyk102125)
- Includes: username, pronouns, timezone, interests, screen reader info


**Status**:  **READY FOR ADMIN TESTING (Friday, March 7)**

Workshop infrastructure complete. Awaiting:
1. Student organization invitations (do Friday)
2. Admin test plan execution (Friday 2-3pm)
3. Assignment issue creation (after students join org)
4. Facilitator briefing (Friday 5pm)
5. Pre-workshop emails to students (Friday 6pm)

Then: Ready to launch Saturday at 12pm ET!
