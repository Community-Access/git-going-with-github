# Workshop Readiness Verification
## Saturday, March 7 & Sunday, March 8, 2026

**Status:**  READY FOR LAUNCH


## Exercise Verification

### Challenge 1: Fix [DATE] Placeholder in Welcome Guide (23 students)
- **File:** `learning-room/docs/welcome.md`
- **Target:** Line 74 - `*Last reviewed: [DATE]*`
- **Task:** Replace [DATE] with today's date in YYYY-MM-DD format
- **Difficulty:** 5-10 minutes
- **Status:**  Exercise file valid, placeholder exists

### Challenge 2: Complete [TODO] Sections in Welcome Guide (22 students)
- **File:** `learning-room/docs/welcome.md`
- **Targets:** 
  - Line 22: [TODO] - Who can contribute?
  - Line 40: [TODO] - How to decide if issue is right for you?
  - Line 52: [TODO] - GitHub profile implications
- **Task:** Complete each TODO section with appropriate content
- **Difficulty:** 15-20 minutes
- **Status:**  All three [TODO] placeholders exist and are clear

### Challenge 3: Fix Keyboard Shortcuts Reference (22 students)
- **File:** `learning-room/docs/keyboard-shortcuts.md`
- **Target 1:** Line 10 - Broken link: `(htps://nvaccess.org)` (missing 't' in https)
- **Target 2:** Lines 7-11 - Heading hierarchy issue: jumps from ## to #### (h2 → h4, skipping h3)
- **Task:** Fix the broken link AND correct heading hierarchy to h3
- **Difficulty:** 10-15 minutes
- **Status:**  Both issues present and valid


## Repository Infrastructure

### Issues
-  67 total issues created in Community-Access/learning-room
-  Issues distributed across 3 challenges (23, 22, 22)
-  All issues include:
  - Clear challenge description
  - Step-by-step instructions
  - Git clone guidance
  - Peer reviewer reference
  - Resource links
  - Success criteria

### Branches
-  67 pre-created fix/* branches ready
-  Format: `fix/{username}-challenge-{num}`
-  All branches based on main (clean starting point)
-  Students can immediately `git checkout fix/[username]-challenge-1`

### Labels
-  challenge: beginner
-  skill: markdown
-  day: 1
-  assigned


## Documentation Updates

### Day 1 Agenda (DAY1_AGENDA.md)
-  Correct dates: Saturday, March 7, 2026
-  Correct times: 9:00 AM - 5:00 PM
-  Added Block 0: 45-minute session including git clone learning-room
-  Updated Challenge 1-3 descriptions with correct details

### Day 2 Agenda (DAY2_AGENDA.md)
-  Correct dates: Sunday, March 8, 2026
-  Correct times: 9:00 AM - 5:00 PM
-  Clarified it follows Day 1 (Saturday)

### Facilitator Guide (FACILITATOR.md)
-  Updated Phase 4 with correct Day 1 times
-  Updated Phase 5-6 with correct Day 2 times
-  Added git clone step to Block 0


## Pre-Workshop Checklist (Facilitator)

**Before Saturday, March 7:**

- [ ] Verify expected issues appear in learning-room Issues tab (students × 10 for Chapters 4,5,6,11)
- [ ] Verify expected branches exist in learning-room (based on your cohort setup)
- [ ] Test one full PR workflow end-to-end:
  1. Clone learning-room
  2. Checkout fix/[username]-challenge-1
  3. Edit docs/welcome.md, update [DATE]
  4. Commit & push
  5. Create PR (verify bot validates)
  6. Request review
  7. Merge when approved
- [ ] Verify peer reviewer assignments in `.github/data/peer-reviewer-assignments.json`
- [ ] Test screen reader access to learning-room (Issues tab, PR workflow)
- [ ] Verify GitHub Skills modules are accessible and respond correctly
- [ ] Confirm all students can access Community-Access/learning-room (public repo)
- [ ] Test Zoom setup (if virtual) / room access (if in-person)
- [ ] Brief notes for Block 0 on git clone workflow

**On Saturday Morning (30 min before 9:00 AM):**

- [ ] Verify learning-room CI/CD workflows are enabled and working
- [ ] Check that no unexpected issues were created
- [ ] Test peer review workflow with a test account
- [ ] Have backup issue numbers ready if students encounter 404s
- [ ] Verify Student Roster is loaded in `.github/data/student-roster.json`


## Known Constraints & Solutions

### Exercise 3 - Heading Hierarchy
**Note:** Students must fix BOTH the broken link AND heading hierarchy. The issue describes both, but the link is the more obvious one. Screen reader users will hear the heading jump more clearly than the broken link.

**Solution:** Include in Block 5 intro: "Check your challenge carefully - there may be more than one issue to fix."

### Git Clone in Block 0
**Time allocation:** 15 minutes in Block 0 for students who are unfamiliar with git. Advanced users will be done in 2 minutes - they can help others.

**Fallback:** Have learning-room clones pre-prepared on USB drives in case of network issues.


## Success Metrics

By end of Day 1 Block 5:
-  All 67 students have committed and pushed changes
-  All 67 PRs created (automatically from push)
-  67 bot validations passed
-  At least 20 peer reviews requested
-  At least 10 PRs merged


## Files Ready for Students

When cloning learning-room, students will find:

```
learning-room/
├── README.md (getting started guide)
├── CONTRIBUTING.md (contribution workflow)
├── CODE_OF_CONDUCT.md (community guidelines)
├── docs/
│   ├── welcome.md (Challenge 1 & 2 target)
│   ├── keyboard-shortcuts.md (Challenge 3 target)
│   ├── setup-guide.md (reference, no exercises)
│   └── CHALLENGES.md (challenge descriptions)
└── .github/
    ├── workflows/ (validation bots)
    ├── data/
    │   ├── student-roster.json
    │   └── peer-reviewer-assignments.json
    └── PULL_REQUEST_TEMPLATE/ (PR guidance)
```

All 67 students are ready. All exercises are valid. All infrastructure is in place.

**Workshop is cleared for Saturday, March 7, 2026 at 9:00 AM.**
