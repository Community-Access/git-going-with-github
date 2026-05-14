# Human Test Matrix for Learning Room Challenges

Use this matrix before each cohort to verify that the Learning Room template behaves like a realistic collaborative GitHub project while still working inside private GitHub Classroom repositories.

## Required Test Repositories

Create at least one disposable student repository from the current `Community-Access/learning-room-template` template. For full peer-access testing, create two disposable repositories and use two test student accounts.

Minimum smoke test:

- `learning-room-smoke-a`

Full collaboration test:

- `learning-room-smoke-a`
- `learning-room-smoke-b`

## Required Facilitator Setup

After the student repository exists, run:

```powershell
scripts/classroom/Seed-LearningRoomChallenge.ps1 -Repository Community-Access/learning-room-smoke-a -Challenge 1 -Assignee test-student-a
scripts/classroom/Seed-PeerSimulation.ps1 -Repository Community-Access/learning-room-smoke-a -StudentUsername test-student-a
```

For Day 2-only testing, seed Challenge 10 instead:

```powershell
scripts/classroom/Seed-LearningRoomChallenge.ps1 -Repository Community-Access/learning-room-smoke-a -Challenge 10 -Assignee test-student-a
scripts/classroom/Seed-PeerSimulation.ps1 -Repository Community-Access/learning-room-smoke-a -StudentUsername test-student-a
```

## What The Peer Simulation Creates

`Seed-PeerSimulation.ps1` creates realistic collaboration artifacts inside the student's private repo:

- `Peer Simulation: Welcome Link Needs Context` issue
- `Peer Simulation: Review Request for Contribution Guidance` issue
- `Peer Simulation: Improve contribution guidance` pull request
- `docs/samples/peer-review-practice.md` on branch `peer-simulation/review-pr`

Students can use these artifacts whenever a challenge asks them to comment, react, review, compare, or practice collaboration. If facilitators separately provision real buddy access, students may use the real buddy repository instead.

## Day 1 Core Test

Complete these steps as a test student.

1. **Challenge 1: Find Your Way Around**
   - Verify Challenge 1 issue exists.
   - Complete the scavenger hunt.
   - Comment evidence.
   - Comment or react on the peer-simulation issue.
   - Close Challenge 1.
   - Verify Challenge 2 appears.

2. **Challenge 2: File Your First Issue**
   - Find a TODO in `docs/welcome.md`.
   - Create a new issue with a clear title and description.
   - Comment evidence on Challenge 2.
   - Comment on the peer-simulation issue title/description.
   - Close Challenge 2.
   - Verify Challenge 3 appears.

3. **Challenge 3: Join the Conversation**
   - Comment on `Peer Simulation: Welcome Link Needs Context`.
   - Include `@gandalf-bot` in the comment.
   - Add a reaction.
   - Verify Gandalf responds if issue-comment workflow permissions allow it.
   - Close Challenge 3.
   - Verify Challenge 4 appears.

4. **Challenge 4: Branch Out**
   - Create `learn/test-student-a` or equivalent feature branch.
   - Compare with the peer-simulation PR branch name.
   - Comment evidence.
   - Close Challenge 4.
   - Verify Challenge 5 appears.

5. **Challenge 5: Make Your Mark**
   - Edit the first TODO in `docs/welcome.md` on the feature branch.
   - Commit with a descriptive message.
   - Compare with the peer-simulation PR title or commit message.
   - Comment evidence.
   - Close Challenge 5.
   - Verify Challenge 6 appears.

6. **Challenge 6: Open Your First Pull Request**
   - Open a PR from the feature branch to `main`.
   - Include `Closes #N` for the Challenge 6 issue or the issue being solved.
   - Verify Gandalf posts PR feedback.
   - Comment on the peer-simulation PR.
   - Close Challenge 6 when ready.
   - Verify Challenge 7 appears.

7. **Challenge 7: Survive a Merge Conflict**
   - Run the facilitator conflict script after the student's PR exists:

```powershell
scripts/classroom/Start-MergeConflictChallenge.ps1 -Repository Community-Access/learning-room-smoke-a -StudentBranch learn/test-student-a
```

   - Verify the student's PR reports a conflict.
   - Resolve the conflict.
   - Verify the Challenge 7 conflict-marker workflow succeeds.
   - Close Challenge 7.
   - Verify Challenge 8 appears.

8. **Challenge 8: The Culture Layer**
   - Read governance/community files.
   - Use the peer-simulation issue for label/triage discussion.
   - Comment reflection evidence.
   - Close Challenge 8.
   - Verify Challenge 9 appears.

9. **Challenge 9: Merge Day**
   - Verify the PR has been reviewed and can merge.
   - Merge the PR or have the facilitator merge it.
   - Leave wrap-up feedback on the peer-simulation issue or PR.
   - Close Challenge 9.

## Day 2 Core Test

Seed Challenge 10 if continuing from Day 1 did not naturally reach it.

10. **Challenge 10: Go Local**
    - Clone the repo locally.
    - Create a branch.
    - Edit, commit, and push.
    - Verify the local commit workflow succeeds.
    - Close Challenge 10.
    - Verify Challenge 11 appears.

11. **Challenge 11: Open a Day 2 PR**
    - Open a PR from the locally pushed branch.
    - Verify Gandalf feedback appears.
    - Review the peer-simulation PR title and description.
    - Close Challenge 11.
    - Verify Challenge 12 appears.

12. **Challenge 12: Review Like a Pro**
    - Review the peer-simulation PR.
    - Leave at least two specific comments if GitHub allows inline comments.
    - Submit a review verdict if available.
    - Comment evidence.
    - Close Challenge 12.
    - Verify Challenge 13 appears.

13. **Challenge 13: AI as Your Copilot**
    - Use Copilot to improve `docs/samples/copilot-improvement-before.md` or another document.
    - Record what Copilot suggested.
    - Record what the student accepted, rejected, or changed.
    - Compare the result against the peer-simulation PR or real buddy work.
    - Close Challenge 13.
    - Verify Challenge 14 appears.

14. **Challenge 14: Template Remix**
    - Create a new non-challenge issue template in `.github/ISSUE_TEMPLATE/`.
    - Verify it has `name:` and `description:`.
    - Open a PR.
    - Verify the issue-template workflow succeeds.
    - Close Challenge 14.
    - Verify Challenge 15 appears.

15. **Challenge 15: Meet the Agents**
    - Browse `Community-Access/accessibility-agents`.
    - Identify at least three agents.
    - Run or inspect one agent.
    - Compare discoveries with the peer-simulation issue or a real buddy.
    - Close Challenge 15.
    - Verify Challenge 16 appears.

16. **Challenge 16: Capstone Project (Build Your Agent (Capstone))**
    - Choose Accessibility Agents, GLOW, or another meaningful repository.
    - Create or draft an agentic contribution with a clear mission, responsibilities, and guardrails.
    - Open a PR, prepare a branch, or write a contribution issue/plan.
    - Review a peer PR if available; otherwise review the peer-simulation PR and explain what would matter in an agent review.
    - Verify capstone workflow feedback in the Learning Room if the agent file is also represented there.
    - Close Challenge 16.

## Bonus Test

The five bonus challenges are optional and facilitator-reviewed.

17. **Bonus A: Improve an Existing Agent**
    - Choose an existing agent.
    - Propose and submit a meaningful improvement.

18. **Bonus B: Document Your Journey**
    - Write a reflection document.
    - Verify it is clear and accessible.

19. **Bonus C: Create a Group Challenge**
    - Design a collaborative challenge for a future cohort.
    - Confirm it can work with peer simulation or real buddy access.

20. **Bonus D: Notification Mastery**
    - Configure notification settings.
    - Document the student's notification strategy.

21. **Bonus E: Explore Git History Visually**
    - Use GitHub Desktop or GitHub.com history views.
    - Explain what changed over time.

## Pass Criteria

The template is ready only when all of the following are true:

- Challenge 1 can be seeded.
- Peer simulation artifacts can be seeded.
- Closing Challenge 1 creates Challenge 2.
- Sequential challenge creation works through at least Challenge 5 in smoke testing.
- Challenge 7 can create a real conflict after the student's branch edits the same TODO line.
- Gandalf PR feedback appears without failing the workflow if GitHub comment APIs are temporarily unavailable.
- Challenges 10, 14, and 16 autograders run and post useful feedback.
- Students can complete all peer tasks using seeded simulation artifacts even without cross-repo buddy access.

## Authoritative Sources

Use these official references when you need the current source of truth for facts in this chapter.

- [GitHub Docs, home](https://docs.github.com/en)
- [GitHub Changelog](https://github.blog/changelog/)
- [W3C Web Content Accessibility Guidelines (WCAG) 2 overview](https://www.w3.org/WAI/standards-guidelines/wcag/)
- [WAI tutorials for accessible design patterns](https://www.w3.org/WAI/tutorials/)
- [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [GitHub accessibility statement](https://docs.github.com/en/site-policy/other-site-policies/github-accessibility-statement)
- [About Git](https://docs.github.com/en/get-started/using-git/about-git)
- [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow)
- [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- [About issues](https://docs.github.com/en/issues/tracking-your-work-with-issues/about-issues)
- [Contributing to a project](https://docs.github.com/en/get-started/exploring-projects-on-github/contributing-to-a-project)

### Section-Level Source Map

Use this map to verify facts for each major section in this file.

- **Required Test Repositories:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [W3C Web Content Accessibility Guidelines (WCAG) 2 overview](https://www.w3.org/WAI/standards-guidelines/wcag/), [WAI tutorials for accessible design patterns](https://www.w3.org/WAI/tutorials/), [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- **Required Facilitator Setup:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [W3C Web Content Accessibility Guidelines (WCAG) 2 overview](https://www.w3.org/WAI/standards-guidelines/wcag/), [WAI tutorials for accessible design patterns](https://www.w3.org/WAI/tutorials/), [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- **What The Peer Simulation Creates:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [W3C Web Content Accessibility Guidelines (WCAG) 2 overview](https://www.w3.org/WAI/standards-guidelines/wcag/), [WAI tutorials for accessible design patterns](https://www.w3.org/WAI/tutorials/), [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- **Day 1 Core Test:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [W3C Web Content Accessibility Guidelines (WCAG) 2 overview](https://www.w3.org/WAI/standards-guidelines/wcag/), [WAI tutorials for accessible design patterns](https://www.w3.org/WAI/tutorials/), [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- **Day 2 Core Test:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [W3C Web Content Accessibility Guidelines (WCAG) 2 overview](https://www.w3.org/WAI/standards-guidelines/wcag/), [WAI tutorials for accessible design patterns](https://www.w3.org/WAI/tutorials/), [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- **Bonus Test:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [W3C Web Content Accessibility Guidelines (WCAG) 2 overview](https://www.w3.org/WAI/standards-guidelines/wcag/), [WAI tutorials for accessible design patterns](https://www.w3.org/WAI/tutorials/), [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- **Pass Criteria:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [W3C Web Content Accessibility Guidelines (WCAG) 2 overview](https://www.w3.org/WAI/standards-guidelines/wcag/), [WAI tutorials for accessible design patterns](https://www.w3.org/WAI/tutorials/), [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
