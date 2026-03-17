# Admin Workshop Validation Test Plan

**Date:** Friday, March 7, 2026  
**Duration:** ~2-3 hours  
**Participants:** 2-3 admin volunteers  
**Goal:** Verify entire workshop infrastructure works before Saturday

---

## 🚨 CRITICAL PREREQUISITE: Student GitHub Organization Membership

**BEFORE running any tests, you MUST invite all 66 students to the Community-Access organization.**

### Why This Matters

The assignment issues cannot be created and assigned to students until they are members of the GitHub organization. This is a GitHub security requirement—users must be org members to be assigned to issues.

### How to Invite Students

1. **Go to Organization Settings:**
   - URL: https://github.com/orgs/Community-Access/settings/members
   - Click "Invite member"

2. **Bulk Invite All 66 Students:**
   - Generate invite list from roster:
     ```bash
     python -c "
     import json
     roster = json.load(open('.github/data/student-roster.json'))
     for student in roster['students']:
         print(student['username'])
     " > student-invitations.txt
     ```
   - Share this list with GitHub org admin to send bulk invitations

3. **Alternative: Use GitHub CLI:**
   ```bash
   # Install if needed: gh auth login
   python scripts/send_org_invitations.py
   ```

4. **Verify Invitations Sent:**
   - Go to Organization → Pending Invitations
   - Should see all 66 students listed
   - Note: Invitations expire in 7 days if not accepted

### After Invitations Are Sent

Once students accept org invitations (they'll receive emails), create the assignment issues:

```bash
python scripts/batch_create_issues.py
```

**Expected Output:**
- All 66 issues created with format: `[Assignment XX] [Challenge Name] - @[username]`
- Each issue assigned to the specific student
- Labeled with: `challenge: beginner`, `skill: markdown`, `day: 1`, `assigned`

### If Students Haven't Accepted Yet (Contingency Plan)

If issues can't be created by Friday, use this workaround for Saturday:

1. **Facilitators create issues on behalf of students:**
   ```bash
   # Facilitator runs this with elevated permissions
   gh issue create --title "[Assignment 1] Fix Broken Link - @accesscontrolccc" \
     --body "[Student assignment body...]" \
     --label "challenge: beginner" \
     --label "assigned"
   # (without the --assignee flag since user not in org)
   ```

2. **Students access issues without assignment:**
   - Issues will be in the Issues tab with `assigned` label
   - Students find their issue by name
   - All issue functionality works the same way

3. **Peer reviews still work:**
   - Peer assignments are already configured in `.github/data/peer-reviewer-assignments.json`
   - Facilitators communicate review assignments during Saturday orientation

---

## Pre-Test Verification (15 min)

### Infrastructure Health Check

**Steps:**
1. [ ] **Verify student org membership (CRITICAL)**
   - Go to https://github.com/orgs/Community-Access/people
   - Confirm at least 66 students are visible
   - If fewer than 66, org invitations haven't been accepted yet
   - Note: Invitations take 5-30 min to accept after students click email link

2. [ ] Check if assignment issues exist:
   ```bash
   gh issue list --label assigned | wc -l
   # If 0: Need to run batch_create_issues.py after org members confirmed
   # If 66: All good, move to Test Scenario 2
   ```

3. [ ] Verify all 66 student branches exist
   ```bash
   git branch | grep student/ | wc -l
   # Should return: 66
   ```

4. [ ] Check roster has correct 66 students
   ```bash
   python -c "import json; r=json.load(open('.github/data/student-roster.json')); print(len(r['students']))"
   # Should return: 66
   ```

5. [ ] Verify peer assignment file exists
   ```bash
   cat .github/data/peer-reviewer-assignments.json | python -m json.tool | head -20
   # Should show structure with assignments
   ```

6. [ ] Test GitHub Actions workflows are enabled
   - Go to Actions tab
   - Confirm "Learning Room PR Validation" workflow is enabled
   - Check if any recent workflow runs exist

7. [ ] Confirm facilitator guide is accessible
   - Open `facilitator/FACILITATOR_GUIDE.md`
   - Verify all sections readable and complete

---

## Test Scenario 1: Student Registration & Branch Access (15 min)

**Objective:** Verify a student can find their branch and assignment

**Participants:** Admin 1

**Steps:**

1. [ ] Pick two random students from roster (e.g., students #10 and #40)

2. [ ] Student #10 test:
   - Go to Code tab
   - Search for `student/[their_username]` in branch dropdown
   - Verify branch exists and is empty (only has content from main)

3. [ ] Student #40 test:
   - Repeat above with different student
   - Confirm each student's branch exists

4. [ ] Expected Result:
   - ✅ Both students' branches found
   - ✅ Branches contain correct content (inherited from main)
   - ✅ No errors or missing branches

**If Failed:**
- Check: `git push origin student/*` completed successfully
- Did you delete any branches accidentally?
- Try: `git branch -a | grep student/ | wc -l` to verify local count

---

## Test Scenario 2: Assignment Issue Creation (20 min)

**Objective:** Verify assignment issues load and display correctly

**Participants:** Admin 2

**PREREQUISITE:** Student org membership must be confirmed from Pre-Test Verification

**Steps:**

1. [ ] Check if issues have been created yet:
   ```bash
   gh issue list --label assigned | wc -l
   ```
   - If result is 0: Need to create them now, continue below
   - If result is 66: Issues exist, skip to step 4

2. [ ] Create assignment issues:
   ```bash
   python scripts/batch_create_issues.py
   ```
   - Wait for all 66 to complete (~2 min)
   - Should see: `[SUCCESS] Created: 66 issues`

3. [ ] Navigate to Issues tab

4. [ ] Filter by label: `assigned`

5. [ ] Verify you see 66 issues (one per student)

6. [ ] Click on 3 random assignment issues (#5, #25, #55)

7. [ ] For each, verify:
   - ✅ Title format: `[Assignment] [Challenge Name] - @[username]`
   - ✅ Body contains:
     - Challenge description
     - File to edit
     - Step-by-step instructions
     - Resource links to docs
     - Labels include: `challenge: beginner`, `skill: markdown`, `day: 1`, `assigned`
     - Assignee is the correct student username (if issues are successfully created)

8. [ ] Expected Result:
   - ✅ All 66 issues present
   - ✅ Format consistent across all issues
   - ✅ Assignments match roster

**If Failed (Assignment column is empty or missing students):**
- Students may still be accepting org invitations
- Workaround: Facilitators will announce student assignments during Saturday orientation
- Try again in 30 minutes after more students accept invitations
- Check: Were students actually invited? Verify at https://github.com/orgs/Community-Access/people

**If batch_create_issues.py script fails:**
- Check: Are all students now org members? `gh issue list` proves you have CLI access
- Try command manually: `gh issue create --title "Test" --label "assigned"`
- If that works, issue is with script—check script output for specific error

---

## Test Scenario 3: PR Template Functionality (15 min)

**Objective:** Verify the PR template guides students correctly

**Participants:** Admin 1

**Steps:**

1. [ ] Create a test branch: `git checkout -b test/pr-template-check`

2. [ ] Make a small change to `learning-room/docs/welcome.md`:
   ```markdown
   # Add this line temporarily at the top
   [TEST] This is a test PR to verify the template
   ```

3. [ ] Push branch: `git push origin test/pr-template-check`

4. [ ] On GitHub, create a Pull Request:
   - Source: `test/pr-template-check`
   - Target: `main`
   - Click "Create pull request"

5. [ ] Verify:
   - ✅ PR template appears automatically
   - ✅ Template includes all sections:
     - Description
     - Type of Change
     - Changes Made
     - How to Test
     - Accessibility Checklist
     - Screenshots/Recording
   - ✅ Template has examples and is helpful

6. [ ] Expected Result:
   - ✅ Template displays in PR body
   - ✅ Students will see guidance for each field

**Cleanup:**
```bash
git checkout main
git branch -d test/pr-template-check
git push origin --delete test/pr-template-check
```

**If Failed:**
- Check: `.github/PULL_REQUEST_TEMPLATE/pull_request_template.md` exists
- Is it properly formatted?
- GitHub requires exact file path to auto-populate

---

## Test Scenario 4: GitHub Actions Bot Workflow (20 min)

**Objective:** Verify bot validates PRs and provides feedback

**Participants:** Admin 2

**Steps:**

1. [ ] Create test branch: `git checkout -b test/bot-validation`

2. [ ] Edit `learning-room/docs/keyboard-shortcuts.md`:
   - Find the broken link `htps://nvaccess.org`
   - **Leave it broken** (don't fix it) - we want the bot to catch it

3. [ ] Make a deliberate heading error:
   - Change a `##` heading to `####` (skip level)
   - This violates WCAG heading hierarchy

4. [ ] Push and create PR:
   ```bash
   git add learning-room/docs/keyboard-shortcuts.md
   git commit -m "test: Intentional errors for bot validation"
   git push origin test/bot-validation
   # Create PR on GitHub
   ```

5. [ ] Wait 30-60 seconds for bot to respond

6. [ ] Check PR comments for bot feedback:
   - ✅ Bot should have posted ONE consolidated comment
   - ✅ Comment includes:
     - Link validation errors (htps:// typo)
     - Heading hierarchy errors
     - Resource links to help student
     - Encouraging tone

7. [ ] Expected Results:
   - ✅ Bot responds within 60 seconds
   - ✅ Provides actionable feedback
   - ✅ Includes learning resources
   - ✅ Shows errors clearly with file/line numbers

**Cleanup:**
```bash
git checkout main
git branch -d test/bot-validation
git push origin --delete test/bot-validation
```

**If Failed:**
- Check: GitHub Actions tab - did workflow run?
- Look at "Learning Room PR Validation" workflow runs
- Check workflow logs for errors
- Verify scripts exist: `.github/workflows/check_links.py` and `check_accessibility.py`
- GitHub Actions may need authorization - ask repo admin

---

## Test Scenario 5: Peer Reviewer Assignment System (10 min)

**Objective:** Verify peer reviewers are assigned correctly

**Participants:** Admin 1

**Steps:**

1. [ ] Load peer assignment file:
   ```bash
   python -c "import json; data=json.load(open('.github/data/peer-reviewer-assignments.json')); print(json.dumps(data['assignments']['accesswatch'], indent=2))"
   ```

2. [ ] Verify structure:
   - ✅ Each student has `primary_reviewer`
   - ✅ Each student has `backup_reviewer`
   - ✅ Each reviewer is a valid username from roster
   - ✅ Students are reviewing exactly 2 other students' PRs

3. [ ] Check 3 random students:
   - Student A's primary reviewer should exist in roster
   - That primary reviewer should have Student A in their "will_review" list
   - This creates balanced pairs

4. [ ] Expected Result:
   - ✅ All 66 students have reviewers assigned
   - ✅ No circular reviews (X reviews Y AND Y reviews X)
   - ✅ Each student reviews exactly 2 others
   - ✅ Each student is reviewed by exactly 2 others

**If Failed:**
- Check: Was `generate_peer_assignments.py` run successfully?
- Verify output file: `.github/data/peer-reviewer-assignments.json`
- If missing, run script: `python scripts/generate_peer_assignments.py`

---

## Test Scenario 6: Facilitator Guide Accessibility (10 min)

**Objective:** Verify facilitator guide is usable by admins with screen readers

**Participants:** Admin with screen reader (or read aloud)

**Steps:**

1. [ ] Open: `facilitator/FACILITATOR_GUIDE.md`

2. [ ] Test with screen reader or read-aloud tool:
   - ✅ Headings are properly hierarchical (H1 → H2 → H3)
   - ✅ Tables are readable (clear headers, row structure)
   - ✅ Links are descriptive (not "click here")
   - ✅ Time blocks are clear
   - ✅ Can skim by headings to find sections quickly

3. [ ] Check navigation:
   - ✅ Can jump between day sections
   - ✅ Can find facilitator checklists
   - ✅ Can locate troubleshooting section

4. [ ] Expected Result:
   - ✅ Document is fully accessible
   - ✅ Facilitator can navigate efficiently
   - ✅ No missing or unclear sections

**If Failed:**
- Check heading structure in markdown
- Verify all links are descriptive
- Test tables with actual screen reader if possible

---

## Test Scenario 7: Progress Tracker Setup (10 min)

**Objective:** Verify progress tracking system is ready

**Participants:** Admin 1

**Steps:**

1. [ ] Check progress tracker template exists:
   ```bash
   cat .github/data/progress-tracker-template.json
   ```

2. [ ] Verify structure includes:
   - ✅ `workshop_metadata` section
   - ✅ `progress` section with counters
   - ✅ `student_progress_template` with all fields
   - ✅ `status_legend` documenting states

3. [ ] Expected Result:
   - ✅ File is valid JSON
   - ✅ Facilitator can populate during workshop
   - ✅ All fields expected by tracking scripts are present

**If Failed:**
- Verify file is valid JSON: `python -m json.tool .github/data/progress-tracker-template.json`
- Check all required fields are present

---

## Test Scenario 8: End-to-End Workflow (20 min)

**Objective:** Simulate one complete student workflow

**Participants:** Admin 2

**Steps:**

1. [ ] Pick one "test student" (use yourself as the GitHub username)

2. [ ] Create test branch: `git checkout -b student/test-admin-validation`

3. [ ] Edit `learning-room/docs/welcome.md`:
   - Find the [TODO] placeholder on line 40
   - Replace with real content:
     ```markdown
     Anyone can contribute! Your unique perspective makes open source better for everyone.
     ```

4. [ ] Commit: `git add learning-room/docs/welcome.md && git commit -m "fix: Complete contributor diversity section"`

5. [ ] Push: `git push origin student/test-admin-validation`

6. [ ] Create Pull Request:
   - Use PR template
   - Fill in all sections
   - Link to a random assignment issue via comment: "#15" (or whatever)

7. [ ] Wait for bot feedback (30-60 seconds):
   - ✅ Bot should comment with validation results
   - ✅ Should indicate if changes are acceptable

8. [ ] Request review:
   - Comment: `@[another_admin] Can you review this?`

9. [ ] Have second admin:
   - View PR
   - Leave review comment
   - Approve changes

10. [ ] Merge PR:
    - Click "Merge pull request"
    - Confirm merge

11. [ ] Verify merge:
    - Go back to main branch
    - Confirm file change is now in main
    - Check git log shows new commit

12. [ ] Expected Result:
    - ✅ Complete workflow from issue → PR → review → merge works
    - ✅ Student would successfully complete this assignment
    - ✅ Bot feedback is helpful
    - ✅ Merge creates historical record

**Cleanup:**
```bash
# Revert the test change from main
git revert [commit-hash]
git push origin main
```

---

## Sign-Off Checklist

After completing all tests, verify:

| Test | Status | Notes |
|------|--------|-------|
| Infrastructure health | ☐ PASS ☐ FAIL | |
| Student branch access | ☐ PASS ☐ FAIL | |
| Assignment issues | ☐ PASS ☐ FAIL | |
| PR template | ☐ PASS ☐ FAIL | |
| Bot validation | ☐ PASS ☐ FAIL | |
| Peer assignments | ☐ PASS ☐ FAIL | |
| Facilitator guide | ☐ PASS ☐ FAIL | |
| Progress tracker | ☐ PASS ☐ FAIL | |
| End-to-end workflow | ☐ PASS ☐ FAIL | |

**Overall Status:**
- ☐ **READY** - All tests passed, workshop infrastructure validated
- ☐ **NEEDS FIXES** - Log issues below and re-test after fixing

**Issues Found & Fixed:**
```
1. Issue: ...
   Fix: ...
   Re-tested: ☐

2. Issue: ...
   Fix: ...
   Re-tested: ☐
```

**Signed off by:**
- Admin 1: _________________ Date: _______
- Admin 2: _________________ Date: _______
- Facilitator: _________________ Date: _______

---

## Quick Links for Troubleshooting

- GitHub Status: https://www.githubstatus.com/
- GitHub Actions Docs: https://docs.github.com/en/actions
- CLI Issues: Run `gh auth status` to verify authentication
- Report PR template issues: Check: `.github/PULL_REQUEST_TEMPLATE/pull_request_template.md`
- Verify bot files: Check: `.github/workflows/learning-room-validation.yml`

**Support Contact:** [facilitator email or Slack]

