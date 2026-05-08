# Seeding Operations Cheat Sheet

Run these commands after a student accepts an assignment so challenge flow starts correctly.

## Prerequisites

- GitHub CLI (`gh`) is installed and authenticated
- You have access to the student repository
- Repository naming follows classroom output, for example:
  - `Community-Access-Classroom/learning-room-studentname`

## Seed Day 1 First Challenge

```powershell
scripts/classroom/Seed-LearningRoomChallenge.ps1 -Repository Community-Access-Classroom/learning-room-studentname -Challenge 1 -Assignee studentname
```

## Seed Day 2 First Challenge

```powershell
scripts/classroom/Seed-LearningRoomChallenge.ps1 -Repository Community-Access-Classroom/learning-room-studentname -Challenge 10 -Assignee studentname
```

## Seed Peer Simulation Artifacts

```powershell
scripts/classroom/Seed-PeerSimulation.ps1 -Repository Community-Access-Classroom/learning-room-studentname -StudentUsername studentname
```

## Verify Seeding Worked

1. Open repository Actions and confirm `student-progression.yml` run started.
2. Confirm issue list contains the expected challenge issue.
3. If peer simulation was seeded, confirm two issues and one PR were created.

Optional CLI check:

```powershell
gh issue list -R Community-Access-Classroom/learning-room-studentname --state all
```

## Common Failure Cases

### Workflow run command fails

- Confirm repo name is correct.
- Confirm facilitator has write access.
- Confirm `student-progression.yml` exists in the target repository.

### Challenge issue not created

- Check workflow logs in Actions.
- Re-run the same seeding command.
- If still blocked, create challenge issue manually from the matching template.
