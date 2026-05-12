# Enrollment Setup & Configuration Checklist

Use this checklist to complete the GitHub Classroom integration setup for a new cohort.

## Pre-Enrollment: GitHub Classroom Setup

- [ ] Confirm classroom access in GitHub Classroom
  - URL: https://classroom.github.com
  - Verify facilitators can manage assignments

- [ ] Create GitHub Classroom assignments:
  - [ ] Day 1 assignment (e.g., "Day 1: You Belong Here")
  - [ ] Day 2 assignment (e.g., "Day 2: You Can Build This")
  - Get the assignment invitation link from Classroom UI for each

- [ ] Decide your Day 1 completion signal for Day 2 release:
  - [ ] Label-based (`day1-complete` or `day2-eligible`)
  - [ ] Student comment-based (`day1-complete` in enrollment issue)

## GitHub Repository Configuration

### Repository Variables

In [Community-Access/git-going-with-github Settings → Variables](https://github.com/Community-Access/git-going-with-github/settings/variables):

- [ ] `CLASSROOM_DAY1_ASSIGNMENT_URL`
  - Value: Day 1 Classroom assignment invitation link
  - Purpose: Posted to students after enrollment; required for Day 1 start

- [ ] `CLASSROOM_DAY2_ASSIGNMENT_URL`
  - Value: Day 2 Classroom assignment invitation link
  - Purpose: Posted to students after Day 1 completion confirmation

- [ ] `PRIVATE_STUDENT_DATA_REPO`
  - Value: `Community-Access/git-going-with-github-administration`
  - Status: Already set ✓ (do not change)

- [ ] `ENABLE_PUBLIC_CLASSROOM_INTAKE_EXPORT`
  - Value: `false`
  - Status: Already set ✓ (do not change unless you want public CSV export)

- [ ] `ENABLE_PUBLIC_REGISTRATION_EXPORT` (legacy)
  - Value: `false`
  - Status: Already set ✓ (do not change unless you want public legacy export)

### Repository Secrets

In [Community-Access/git-going-with-github Settings → Secrets](https://github.com/Community-Access/git-going-with-github/settings/secrets/actions):

- [ ] `PRIVATE_STUDENT_DATA_TOKEN`
  - Status: Already set ✓ (created at initial setup)
  - Validity: Verify token has not expired
  - Action: Renew if integration stops working

## Private Admin Repository Setup

In [Community-Access/git-going-with-github-administration](https://github.com/Community-Access/git-going-with-github-administration):

- [ ] Verify repo is private
- [ ] Add facilitators as maintainers
- [ ] Verify labels exist:
  - [ ] `intake`
  - [ ] `classroom-enrollment`
- [ ] Create any additional labels for triage:
  - [ ] `cohort-YYYY-MM` (for filtering by cohort)
  - [ ] `follow-up-needed`
  - [ ] `accessibility-request`

## Pre-Workshop: Enrollment Window

- [ ] Create announcement/email pointing to public registration link
  - URL: https://community-access.github.io/git-going-with-github/REGISTER.md
  - Mention: "Students should use the **New Student Fast Path** form"

- [ ] Monitor enrollment:
  - Public issues: https://github.com/Community-Access/git-going-with-github/issues?label=classroom-enrollment
  - Private intakes: https://github.com/Community-Access/git-going-with-github-administration/issues?label=intake

- [ ] Triage by proficiency:
  - [ ] Pull list of `proficiency-beginner` students
  - [ ] Pull list of `proficiency-intermediate` students
  - [ ] Pull list of `proficiency-advanced` students
  - Prepare differentiated support or mentorship

## Workshop Day 0: Final Prep

- [ ] Verify Day 1 assignment link is posted in enrollment confirmation comments
- [ ] Verify `ack` and `day1-complete` guidance is visible to students in comments

- [ ] Share facilitator resources:
  - Classroom Integration Guide: [CLASSROOM_INTEGRATION_GUIDE.md](./CLASSROOM_INTEGRATION_GUIDE.md)
  - Facilitator Guide: [FACILITATOR_GUIDE.md](./FACILITATOR_GUIDE.md)
  - QA Runbook: [LEARNING-ROOM-E2E-QA-RUNBOOK.md](./LEARNING-ROOM-E2E-QA-RUNBOOK.md)

## Workshop Day 1-2: Active Monitoring

- [ ] Track assignment submissions in GitHub Classroom
  - View: https://classroom.github.com → Your org → Assignments → Day 1
  - Identify students who haven't accepted invitation or started work

- [ ] Re-engage non-starters:
  - File a support issue mentioning GitHub username
  - Direct to [Support Hub](https://github.com/Community-Access/support/issues)
  - Offer 1:1 setup help if needed

- [ ] Monitor private intake repo for flags:
  - Label issues: `accessibility-request`, `follow-up-needed`
  - Act on accommodations mentioned in course goals

## Post-Workshop: Data Archival

- [ ] Export final cohort roster:
  - Trigger workflow: [registration.yml → export-classroom-intake](https://github.com/Community-Access/git-going-with-github/actions/workflows/registration.yml)
  - Download artifact: `classroom-intake-data.csv`
  - Save to shared facilitator workspace

- [ ] Tag private intakes by cohort:
  - Bulk-add `cohort-YYYY-MM` label to all intake issues
  - This helps future facilitators find historical data

- [ ] Archive passwords/tokens:
  - Document which token was used (for audit trail)
  - Schedule token rotation for next cohort

## Troubleshooting Quick Reference

| Problem | Cause | Solution |
|---------|-------|----------|
| "Enrollment is temporarily unavailable" | Missing secrets/variables | Check this checklist; verify all vars/secrets set |
| Student cannot access assignment | Invite link mismatch or not signed in | Re-copy assignment invite URL from Classroom and update variable |
| Can't see private intakes | Permission denied | Verify you're an org member of admin repo |
| Proficiency labels not appearing | Workflow skipped | Check enrollment issue for errors; re-submit |
| Assignments not posting to students | Missing assignment URL variables | Verify `CLASSROOM_DAY1_ASSIGNMENT_URL` is set |

---

**Last updated**: 2026-05-12  
**Owned by**: Facilitator lead  
**Version**: 1.0
