# Live Facilitation Flow Checklist

Use this checklist when setting up a new cohort so you can run the full Classroom workflow in one pass.

## Phase 1: Classroom and Roster

- [ ] Open classroom.github.com and create or select the target classroom.
- [ ] Confirm organization is correct (Community-Access).
- [ ] Import roster CSV and verify expected usernames appear.
- [ ] Confirm template repository is available: `Community-Access/learning-room-template`.

## Phase 2: Create Day 1 Assignment

- [ ] Click New assignment.
- [ ] Set title to You Belong Here.
- [ ] Set type to Individual.
- [ ] Set visibility to Private.
- [ ] Set starter template repository to `Community-Access/learning-room-template`.
- [ ] Set Grant students admin access to No.
- [ ] Set Enable feedback pull requests to Yes.
- [ ] Set deadline for your cohort.
- [ ] Copy description from `day1-assignment-copy-paste.md` and paste into Classroom.

## Phase 3: Configure Day 1 Autograding

- [ ] Open `autograding-setup.md`.
- [ ] Add all Day 1 tests exactly as listed.
- [ ] Verify Day 1 test count is 4.
- [ ] Verify Day 1 point total is 50.
- [ ] Save assignment.

## Phase 4: Create Day 2 Assignment

- [ ] Click New assignment.
- [ ] Set title to You Can Build This.
- [ ] Set type to Individual.
- [ ] Set visibility to Private.
- [ ] Set starter template repository to `Community-Access/learning-room-template`.
- [ ] Set Grant students admin access to No.
- [ ] Set Enable feedback pull requests to Yes.
- [ ] Set deadline for your cohort.
- [ ] Copy description from `day2-assignment-copy-paste.md` and paste into Classroom.

## Phase 5: Configure Day 2 Autograding

- [ ] Open `autograding-setup.md`.
- [ ] Add all Day 2 tests exactly as listed.
- [ ] Verify Day 2 test count is 6.
- [ ] Verify Day 2 point total is 75.
- [ ] Save assignment.

## Phase 6: Publish and Share

- [ ] Publish Day 1 assignment.
- [ ] Publish Day 2 assignment.
- [ ] Copy Day 1 invite link and store in facilitator notes.
- [ ] Copy Day 2 invite link and store in facilitator notes.
- [ ] Update agenda docs/placeholders with final invite links.

## Phase 7: First Student Acceptance and Seeding

After a student accepts, run these commands from the repository root.

### Day 1 seeding

```powershell
scripts/classroom/Seed-LearningRoomChallenge.ps1 -Repository Community-Access-Classroom/learning-room-studentname -Challenge 1 -Assignee studentname
```

### Day 2 seeding

```powershell
scripts/classroom/Seed-LearningRoomChallenge.ps1 -Repository Community-Access-Classroom/learning-room-studentname -Challenge 10 -Assignee studentname
```

### Peer simulation seeding

```powershell
scripts/classroom/Seed-PeerSimulation.ps1 -Repository Community-Access-Classroom/learning-room-studentname -StudentUsername studentname
```

## Phase 8: Verification Gate

- [ ] Confirm challenge issue exists after seeding.
- [ ] Confirm Student Progression workflow run appears in Actions.
- [ ] Confirm one autograding failure scenario is detected correctly.
- [ ] Confirm one fixed rerun passes.
- [ ] Confirm peer simulation artifacts exist (2 issues + 1 PR).

## Phase 9: Cohort Readiness Sign-Off

- [ ] Day 1 and Day 2 assignments published.
- [ ] Invite links validated.
- [ ] Autograding configured and tested.
- [ ] Seeding scripts verified against a test student repo.
- [ ] Facilitator notes updated with links and fallback instructions.
