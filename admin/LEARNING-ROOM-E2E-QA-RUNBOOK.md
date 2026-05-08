# Learning Room End-to-End QA Runbook (Registration to Student Completion)

Use this runbook when you want one operational checklist that covers the full workflow:

1. Registration intake and validation.
2. GitHub Classroom deployment and assignment setup.
3. Test account acceptance and repository seeding.
4. Full student walkthrough of every challenge path.
5. Release sign-off evidence for go-live.

This runbook intentionally excludes podcast validation work.

Everything else is in scope: registration flow, classroom deployment, assignment configuration, template readiness, student progression, PR validation, content validation, skills progression, autograder behavior, challenge completion tracking, and chapter-by-chapter curriculum review.

## Scope and Audience

This runbook is for facilitators, QA leads, and admins who need to verify the complete workshop flow from administrator setup to student completion.

### Scope Boundaries

In scope:

- Registration workflow behavior and classroom invitation handoff.
- Classroom assignment creation and autograding configuration.
- Learning Room automation workflows and facilitator scripts.
- Full curriculum walkthrough (chapters and appendices).
- Student challenge journey (1-16) and bonus challenge tracking (A-E).
- QA evidence capture, defect logging, and release sign-off.

Out of scope:

- Podcast generation, podcast validation, and RSS audio feed checks.

## Canonical Source Files Used by This Runbook

The following table lists the source files this runbook consolidates.

| Area | Source file |
|---|---|
| Registration entry page | [REGISTER.md](../REGISTER.md) |
| Registration automation admin | [REGISTRATION-ADMIN.md](REGISTRATION-ADMIN.md) |
| Registration automation quickstart | [REGISTRATION-QUICKSTART.md](REGISTRATION-QUICKSTART.md) |
| Registration workflow logic | [.github/workflows/registration.yml](../.github/workflows/registration.yml) |
| Classroom deployment | [classroom/README.md](../classroom/README.md) |
| Assignment copy and autograding setup | [admin/classroom/README.md](classroom/README.md) |
| Human challenge walkthrough | [classroom/HUMAN_TEST_MATRIX.md](../classroom/HUMAN_TEST_MATRIX.md) |
| Challenge definitions | [docs/CHALLENGES.md](../docs/CHALLENGES.md) |
| Student starting path | [docs/get-going.md](../docs/get-going.md) |
| Grading criteria | [classroom/grading-guide.md](../classroom/grading-guide.md) |
| Release gate baseline | [GO-LIVE-QA-GUIDE.md](../GO-LIVE-QA-GUIDE.md) |

## Required Accounts, Access, and Tools

Complete this section before Phase 1.

- Facilitator admin account with Owner or Admin access to the workshop organization and classroom organization.
- Dedicated non-admin test student account for acceptance and full challenge walkthrough.
- Access to [classroom.github.com](https://classroom.github.com).
- Access to repository settings for secrets and variables.
- Local clone of this repository with PowerShell available.
- GitHub CLI (`gh`) installed and authenticated for optional verification commands.

### Critical Precondition Gates (No-Go if any fail)

Complete all items below before any cohort launch actions.

- [ ] Facilitator account can access both organizations involved in operations:
   - [ ] `Community-Access`
   - [ ] `Community-Access-Classroom` (or your classroom org)
- [ ] Facilitator account has verified email and can create/edit Classroom assignments.
- [ ] Dedicated non-admin test student account exists and can accept invites.
- [ ] `gh auth status` succeeds for facilitator account in local terminal.
- [ ] Template repository exists and is set as template repo:
   - [ ] `Community-Access/learning-room-template`
- [ ] Template repository Actions settings allow required automation behavior:
   - [ ] Actions enabled
   - [ ] `GITHUB_TOKEN` default workflow permissions include write where required
   - [ ] `Allow GitHub Actions to create and approve pull requests` enabled
- [ ] Registration automation settings are correct when using registration-to-classroom handoff:
   - [ ] Secret: `CLASSROOM_ORG_ADMIN_TOKEN`
   - [ ] Variables: `CLASSROOM_ORG`, `CLASSROOM_DAY1_ASSIGNMENT_URL`, `CLASSROOM_DAY2_ASSIGNMENT_URL`
- [ ] Registration entry configuration exists and is valid:
   - [ ] Issue form template `workshop-registration.yml` exists
   - [ ] Required labels exist: `registration`, `duplicate`, `waitlist`
- [ ] Facilitator can open `classroom.github.com`, view target classroom org, and create assignments.

If any precondition fails, stop and resolve before proceeding.

### Exact Setup Steps for Keys, Permissions, Settings, and Template Currency

Use this section when you need literal setup steps (not only validation checks).

#### A. Confirm facilitator account and organization access

1. Sign in as the facilitator account on github.com.
2. Open your profile menu, then Your organizations.
3. Confirm both organizations are visible and accessible:
   - `Community-Access`
   - `Community-Access-Classroom` (or your classroom org)
4. Open both org pages and confirm you can view repositories and settings areas you are expected to manage.
5. Optional CLI verification from repository root:

```powershell
gh auth status -h github.com
gh repo view Community-Access/git-going-with-github
gh repo view Community-Access/learning-room-template
```

Why this matters:

- All downstream setup fails if the facilitator identity is not correctly scoped.

#### B. Configure registration automation key and variables

Repository target: `Community-Access/git-going-with-github`

1. Open repository Settings.
2. Open Secrets and variables, then Actions.
3. Open the Secrets tab and create or update secret:
   - `CLASSROOM_ORG_ADMIN_TOKEN`
4. Open the Variables tab and create or update variables:
   - `CLASSROOM_ORG`
   - `CLASSROOM_DAY1_ASSIGNMENT_URL`
   - `CLASSROOM_DAY2_ASSIGNMENT_URL`
5. Re-open each entry and confirm values have no leading or trailing spaces.
6. Run one registration test and confirm welcome comment contains assignment links when variables are set.

Why this matters:

- These values drive invite and assignment-link injection in registration responses.

#### C. Configure template repository Actions permissions

Repository target: `Community-Access/learning-room-template`

1. Open repository Settings.
2. Open Actions, then General.
3. In Actions permissions, ensure Actions are enabled for the repository.
4. In Workflow permissions, set `GITHUB_TOKEN` to Read and write permissions.
5. Enable Allow GitHub Actions to create and approve pull requests.
6. Save changes.

Why this matters:

- Template automation and bot workflows require write-capable workflow token behavior.

#### D. Confirm the repository is a template and hosted in Community-Access

1. Open `Community-Access/learning-room-template`.
2. Open Settings, then General.
3. Confirm the repository is marked as a template repository.
4. Confirm default branch is `main`.

Why this matters:

- Classroom assignment creation depends on the repository being available as a template.

#### E. Confirm the latest learning-room content is deployed to Community-Access template

1. From repository root, run:

```powershell
scripts/classroom/Prepare-LearningRoomTemplate.ps1 -Owner Community-Access -TemplateRepo learning-room-template
```

2. If the script reports changes, open and merge the generated sync pull request in `Community-Access/learning-room-template`.
3. If the script reports no changes, capture that output as evidence.
4. Verify merged PR (or no-change output) in QA notes.

Why this matters:

- This is the control point that proves Community-Access template content is current.

#### F. Prove freshness from a new template-generated repository

1. Run:

```powershell
scripts/classroom/Test-LearningRoomTemplate.ps1 -Owner Community-Access -TemplateRepo learning-room-template -KeepSmokeRepo
```

2. Open the retained smoke repository.
3. Compare at least three files changed in the most recent template sync PR:
   - one workflow file
   - one issue template file
   - one docs or script file
4. Confirm file content in smoke repo matches merged sync PR content.
5. Record comparison links and outcome in QA notes.

Why this matters:

- This proves newly created student repositories inherit the latest template state, not stale content.

## Test Artifacts You Will Produce

Collect the following evidence while running QA.

- Screenshots of registration confirmation and waitlist behavior.
- Screenshot of Day 1 and Day 2 assignment configuration pages.
- Screenshot of Day 1 and Day 2 autograding test lists with correct counts.
- Link to Learning Room template sync PR (or explicit no-change output) before cohort launch.
- Evidence of template smoke validation from a repo created from `Community-Access/learning-room-template`.
- Links to test student Day 1 and Day 2 repositories.
- Screenshot or link proving Challenge 1 and Challenge 10 seeding succeeded.
- Links to PRs used to validate Aria and autograders.
- Evidence that progression creates the next issue after close.
- Completed chapter-by-chapter walkthrough tracker for all required docs files.
- Completed challenge tracker for Challenges 1 to 16 and Bonus A to E.
- Final sign-off checklist with pass/fail and owner notes.

### Artifact Capture Procedure (Required)

Use this procedure for every artifact in this section:

1. Capture evidence immediately after the validation action completes.
2. Name the evidence with timestamp, phase, and short description.
3. Store URL-based evidence whenever possible; use screenshots when URL evidence is not available.
4. Add one-line context in QA notes describing what the evidence proves.
5. If evidence cannot be captured, log a defect and do not mark the related gate complete.

Why this matters:

- Sign-off quality depends on auditable evidence, not memory or verbal confirmation.

## Runbook Execution Standard (Applies to Every Phase)

Follow this standard across the entire runbook.

1. Read the phase goal and pass criteria before performing actions.
2. Execute steps in order unless the runbook explicitly permits parallel execution.
3. After each major step, capture evidence and log result as Pass, Fail, or Blocked.
4. When a step fails, stop, execute troubleshooting guidance, and document outcome before continuing.
5. Do not mark a phase complete until all pass criteria are satisfied or formally risk-accepted.

Why this matters:

- Consistent execution prevents partial validation and improves handoff reliability between operators.

## QA Validation Contract (What, Where, When, How, Expected Experience)

Use this section as the operational standard for every phase.

| What to validate | Where to validate | When expected | How to validate | Expected experience |
|---|---|---|---|---|
| Registration issue form opens with prefilled title | Public registration page and GitHub issue form | Immediately after selecting registration link | Open the registration form link from [REGISTER.md](../REGISTER.md) | Form opens with `[REGISTER]` prefilled and correct template fields |
| Registration labels and form template are present | Repository issues/labels and `.github/ISSUE_TEMPLATE` | Before first registration test | Verify labels and `workshop-registration.yml` exist | Registration workflow can label and process issues without setup errors |
| Registration confirmation behavior | Registration issue thread and Actions run for `registration.yml` | Within 1-3 minutes of issue submission | Submit test registration and inspect comment and labels | Welcome comment appears, `registration` label applied, no manual intervention required |
| Classroom invite link injection in confirmation | Same registration issue welcome comment | Same workflow run as registration confirmation | Confirm assignment URL variables are configured and inspect comment body | Day 1 and Day 2 links appear exactly once and are clickable |
| Duplicate registration handling | Duplicate registration issue | Within 1-3 minutes of duplicate submission | Submit second registration from same account | Issue auto-closed, `duplicate` label applied, link to original issue included |
| Waitlist behavior | Registration issue and labels | Within 1-3 minutes when capacity threshold is met | Validate in safe staging path or controlled test | Waitlist message appears and `waitlist` label applied |
| Classroom assignment creation | GitHub Classroom UI | During deployment phase before student testing | Configure Day 1 and Day 2 using source docs | Assignment fields match source of truth and are published |
| Student repo creation after acceptance | Classroom dashboard and student account repositories | 30-60 seconds after invite acceptance | Accept Day 1 and Day 2 invite URLs with test student account | Separate private repos are created and visible to facilitator and test student |
| Challenge seeding | Test student repository Issues tab | Within 30-90 seconds after seeding script run | Run seeding scripts and refresh Issues | Correct starting challenge appears and is assigned correctly |
| PR validation feedback (Aria) | Test student pull request comments and Actions | Within approximately 60 seconds after PR open/update | Open PR and push another commit | Single bot comment appears and updates rather than duplicating |
| Content validation feedback | Test student PR checks/comments and Actions | Within approximately 60 seconds after PR open/update | Include link/markdown/accessibility issues and inspect output | Required fixes and suggestions are clear and tied to changed files |
| Progression behavior | Test student Issues tab and Actions for student progression | After each challenge issue closure | Close challenge issue sequentially | Next challenge opens automatically with correct number/title |
| Skills progression behavior | PR merged event and resulting comment/workflow output | After PR merge | Merge test PR and inspect workflow output | Achievement/progress feedback posts without workflow failure |
| Autograder behavior | Classroom grading panel, PR checks, and Actions logs | On relevant challenge events | Trigger known pass and known fail for each autograded challenge | Failing scenarios are understandable and pass after correct fix |
| Chapter content consistency | Markdown files under [docs](../docs/README.md) | During curriculum review phase before sign-off | Execute full chapter and appendix checklist | All required docs reviewed and discrepancies logged |
| Challenge coverage completeness | Challenge tracking table in this runbook | During student journey execution | Fill all rows for 1-16 and A-E | No challenge row is left blank or untracked |

## Reading Order for Operators

Read these files in this exact order before executing the runbook.

1. [REGISTRATION-QUICKSTART.md](REGISTRATION-QUICKSTART.md)
2. [REGISTRATION-ADMIN.md](REGISTRATION-ADMIN.md)
3. [classroom/README.md](../classroom/README.md)
4. [admin/classroom/autograding-setup.md](classroom/autograding-setup.md)
5. [classroom/HUMAN_TEST_MATRIX.md](../classroom/HUMAN_TEST_MATRIX.md)
6. [docs/CHALLENGES.md](../docs/CHALLENGES.md)

Reading completion rule:

1. Do not begin Phase 0 until all files above are opened and skimmed for current cohort context.
2. Log "reading complete" with timestamp in QA notes.

Why this matters:

- Most setup errors come from skipping source-of-truth docs before execution.

## Pre-Flight Local Validation (Non-Podcast)

Run these from repository root before live environment QA.

```powershell
npm run test:automation
npm run build:html
git diff --check
```

Pass criteria:

- Automation tests pass.
- HTML build completes.
- No unresolved conflict markers or whitespace check failures.

### Local unit-test evidence requirements

Record and publish local test evidence under [admin/qa-readiness](qa-readiness/README.md).

Minimum evidence:

- Test command used.
- Total tests, pass count, fail count.
- Any failing tests and remediation actions.
- Residual risk statement for hosted GitHub behavior not proven by local tests.

Recommended report format:

- [admin/qa-readiness/UNIT-TEST-RESULTS-2026-05-08.md](qa-readiness/UNIT-TEST-RESULTS-2026-05-08.md)

No-go rule:

- If local readiness tests fail, do not proceed to template deployment or classroom assignment setup.

Execution procedure:

1. Run commands in listed order from repository root.
2. Capture terminal output snippets for each command.
3. If any command fails, record failure cause and remediation attempt.
4. Re-run failed command after remediation and capture final outcome.

Why this matters:

- Pre-flight catches local defects before they become live Classroom failures.

## Phase 0 - Registration System Deployment Gate (Admin Side)

This phase is mandatory. Do not run registration QA tests until deployment/configuration is complete.

### Step 0.1 Deploy registration issue form and workflow prerequisites

Goal: ensure the registration intake system is deployed and configured for this course cohort.

1. Confirm registration issue form template exists and is current:
   - `.github/ISSUE_TEMPLATE/workshop-registration.yml`
2. Confirm registration workflow exists and is enabled:
   - `.github/workflows/registration.yml`
3. Confirm required labels exist in repository:
   - `registration`
   - `duplicate`
   - `waitlist`
4. Confirm repository Actions are enabled for this repository.

Pass criteria:

- Issue form template is present and selectable from "New issue".
- Registration workflow is enabled and visible in Actions.
- Required labels exist and are usable.

### Step 0.2 Deploy optional registration-to-classroom automation settings

Goal: enable automatic org invite and assignment-link injection in registration confirmation comments.

1. In repository settings, configure secret:
   - `CLASSROOM_ORG_ADMIN_TOKEN`
2. In repository settings, configure variables:
   - `CLASSROOM_ORG`
   - `CLASSROOM_DAY1_ASSIGNMENT_URL`
   - `CLASSROOM_DAY2_ASSIGNMENT_URL`
3. Re-open each value and verify no leading or trailing spaces.

Pass criteria:

- Secret and variables are present with correct values.
- Configuration aligns with [REGISTRATION-ADMIN.md](REGISTRATION-ADMIN.md).

### Step 0.3 Registration deployment smoke check

Goal: validate deployed registration system can execute at least one full workflow run.

1. Submit one test registration issue from a non-admin test account.
2. Confirm `Registration - Welcome & CSV Export` workflow completes.
3. Confirm welcome comment posts and `registration` label is applied.
4. If classroom automation is configured, confirm org invite status and assignment links appear.

Pass criteria:

- Registration workflow executes successfully end to end.
- Output comment/labels match deployed configuration.

## Phase 1 - Registration System QA (Admin Side)

### Step 1. Verify public registration entry path

1. Open [REGISTER.md](../REGISTER.md) and confirm the registration link points to the issue form template with `workshop-registration.yml`.
2. Open the rendered registration page and activate the registration form link.
3. Confirm the issue form opens with `[REGISTER]` in the title.
4. Confirm the page communicates that registration issues are public.

Pass criteria:
- Registration link opens correctly.
- Registration issue title is prefilled with `[REGISTER]`.
- Public visibility warning is present.

### Step 2. Configure registration automation for classroom handoff

Use [REGISTRATION-QUICKSTART.md](REGISTRATION-QUICKSTART.md) for fast entry and [REGISTRATION-ADMIN.md](REGISTRATION-ADMIN.md) for full details.

1. Create or verify an admin token that can manage organization invitations.
2. In repository settings, add secret `CLASSROOM_ORG_ADMIN_TOKEN`.
3. In repository settings, set variables:
   - `CLASSROOM_ORG`
   - `CLASSROOM_DAY1_ASSIGNMENT_URL`
   - `CLASSROOM_DAY2_ASSIGNMENT_URL`
4. Save and re-open each setting to confirm there are no leading or trailing spaces.

Pass criteria:
- Secret exists and is scoped correctly.
- All 3 variables exist and values are correct.

### Step 3. Execute registration happy-path test

Use the non-admin test student account.

1. Submit the registration issue form once.
2. Wait for `Registration - Welcome & CSV Export` workflow to complete.
3. Confirm the issue receives a welcome comment.
4. Confirm the welcome comment includes:
   - Zoom registration information.
   - Day 1 and Day 2 assignment links (if variables are set).
   - Organization invitation status when classroom org automation is active.
5. Confirm `registration` label is applied.

Pass criteria:
- Workflow succeeds.
- Comment content is complete and accurate.
- `registration` label exists on the issue.

### Step 4. Execute duplicate and waitlist tests

1. Submit a second registration issue from the same test account.
2. Confirm workflow marks the issue duplicate and closes it with guidance to the original issue.
3. For waitlist behavior, use a controlled test strategy:
   - Preferred: run in a staging copy where capacity can be reached safely.
   - Alternative: dry-run logic review from [.github/workflows/registration.yml](../.github/workflows/registration.yml) and verify conditions with maintainers.
4. Confirm waitlist message and `waitlist` label behavior in the chosen test environment.

Pass criteria:
- Duplicate submission closes with duplicate guidance.
- Waitlist path and label behavior are validated.

### Step 5. Verify CSV export and roster sync outputs

1. Open the workflow run artifacts and download `registration-data`.
2. Confirm CSV includes expected columns and test user row.
3. Verify `.github/data/student-roster.json` is updated by workflow with non-PII operational fields.
4. Optionally trigger manual rebuild:

```powershell
gh workflow run registration.yml -R community-access/git-going-with-github
```

Pass criteria:
- CSV artifact is present and parseable.
- Roster sync commit appears only when data changed.

## Phase 2 - Learning Room Template Deployment Gate (Admin Side)

This phase is mandatory. Do not create Classroom assignments until this gate is complete.

### Step 6. Sync local Learning Room source into GitHub template repository

Goal: ensure `Community-Access/learning-room-template` reflects the latest source from `learning-room/`.

Run from repository root:

```powershell
scripts/classroom/Prepare-LearningRoomTemplate.ps1 -Owner Community-Access -TemplateRepo learning-room-template
```

What to expect:

1. Script verifies GitHub CLI auth.
2. Script ensures template repository settings (template mode and Actions permissions where allowed).
3. Script creates a sync branch and PR if changes exist.
4. If no changes exist, script reports no template changes to commit.

Where to verify:

- `Community-Access/learning-room-template` pull requests list.
- Template repository Actions/settings page.

Pass criteria:

- Template sync PR exists and is merged to `main`, or script reports no changes required.
- Template repository remains configured as a template repository.
- Template repository default branch is `main` and visible in repository settings.

### Step 7. Validate published template with smoke repository

Goal: prove that new repos created from the template include required workflows/templates and can trigger challenge progression.

Run from repository root:

```powershell
scripts/classroom/Test-LearningRoomTemplate.ps1 -Owner Community-Access -TemplateRepo learning-room-template
```

What to expect:

1. Script creates a temporary private smoke repo from the template.
2. Script checks key files exist (student progression workflow, challenge template, progression script).
3. Script triggers Challenge 1 workflow dispatch.
4. Script deletes smoke repo unless `-KeepSmokeRepo` is specified.

Where to verify:

- Smoke repo creation/deletion in GitHub repos list.
- Workflow run history and issue creation in smoke repo when retained.

Pass criteria:

- Smoke repo creation succeeds from template.
- Required files exist in smoke repo.
- Challenge 1 workflow dispatch succeeds.
- Smoke repo validates workflow inventory:
   - `pr-validation-bot.yml`
   - `content-validation.yml`
   - `student-progression.yml`
   - `skills-progression.yml`
   - `autograder-conflicts.yml`
   - `autograder-local-commit.yml`
   - `autograder-template.yml`
   - `autograder-capstone.yml`

### Step 8. Prove template freshness (latest release content is live)

Goal: confirm that newly created repositories are generated from the latest deployed template content, not stale template state.

1. Keep the smoke repository (`-KeepSmokeRepo`) or create another temporary smoke repo from template.
2. Open the merged template sync PR from Step 6.
3. Select at least 3 files changed in that PR, including at least:
   - one workflow file,
   - one issue template file,
   - one docs or script file.
4. Verify those exact file changes are present in the smoke repository.
5. Record evidence links in your QA notes.

Pass criteria:

- Evidence shows smoke repo content matches the latest merged template sync changes.
- No stale-file mismatch is found.

### Step 9. Optional comprehensive harness check

For deeper verification, run:

```powershell
scripts/classroom/Invoke-LearningRoomEndToEndTest.ps1 -SelfTest
```

Use full end-to-end mode when preparing major cohort launches or after significant automation updates.

## Phase 3 - Classroom Deployment QA (Admin Side)

### Step 10. Create classroom and import roster

Use [classroom/README.md](../classroom/README.md) Steps 1 and 2.

1. Create a new classroom in `Community-Access`.
2. Name it using `Git Going - [Cohort Name] - [Month Year]`.
3. Import roster using [classroom/roster-template.csv](../classroom/roster-template.csv).
4. Confirm test student appears in roster.

Pass criteria:
- Classroom exists and is accessible to facilitators.
- Roster import succeeds with expected usernames.

### Step 11. Create Day 1 assignment exactly

Use [classroom/assignment-day1-you-belong-here.md](../classroom/assignment-day1-you-belong-here.md) and [admin/classroom/day1-assignment-copy-paste.md](classroom/day1-assignment-copy-paste.md).

1. Create assignment with title `You Belong Here`.
2. Set type `Individual`.
3. Set visibility `Private`.
4. Select template `Community-Access/learning-room-template`.
5. Set `Grant students admin access` to `No`.
6. Set `Enable feedback pull requests` to `Yes`.
7. Paste Day 1 assignment description content.
8. Add Day 1 autograding entries from [admin/classroom/autograding-setup.md](classroom/autograding-setup.md).
9. Confirm Day 1 has 4 tests and total 50 points.
10. Save assignment and copy invite link.

Pass criteria:
- Day 1 settings match source files exactly.
- Test count and points are correct.
- Feedback pull request is enabled and visible in assignment configuration.

### Step 12. Create Day 2 assignment exactly

Use [classroom/assignment-day2-you-can-build-this.md](../classroom/assignment-day2-you-can-build-this.md) and [admin/classroom/day2-assignment-copy-paste.md](classroom/day2-assignment-copy-paste.md).

1. Create assignment with title `You Can Build This`.
2. Apply same base settings as Day 1 (individual, private, no admin access, feedback PR enabled).
3. Paste Day 2 assignment description content.
4. Add Day 2 autograding entries from [admin/classroom/autograding-setup.md](classroom/autograding-setup.md).
5. Confirm Day 2 has 6 tests and total 75 points.
6. Save assignment and copy invite link.

Pass criteria:
- Day 2 settings match source files exactly.
- Test count and points are correct.
- Feedback pull request is enabled and visible in assignment configuration.

### Step 13. Connect assignment URLs back to registration automation

1. Add or update repository variables:
   - `CLASSROOM_DAY1_ASSIGNMENT_URL`
   - `CLASSROOM_DAY2_ASSIGNMENT_URL`
2. Re-run one registration test issue (new test account or controlled case).
3. Confirm both links appear in welcome comment.

Pass criteria:
- Registration confirmation comment now includes both assignment URLs.

## Phase 4 - Test Student Acceptance and Seeding (Bridge from Admin to Student)

### Step 14. Test student accepts Day 1 and Day 2 invites

Use the test student account.

1. Open Day 1 invite URL.
2. Accept assignment and wait for repo creation.
3. Record Day 1 test repo URL.
4. Open Day 2 invite URL.
5. Accept assignment and wait for repo creation.
6. Record Day 2 test repo URL.

Pass criteria:
- Two private repos are created and visible in classroom dashboard.

### Step 15. Seed initial challenges and peer simulation

Run commands from repository root.

```powershell
scripts/classroom/Seed-LearningRoomChallenge.ps1 -Repository Community-Access-Classroom/learning-room-test-student-day1 -Challenge 1 -Assignee test-student
scripts/classroom/Seed-PeerSimulation.ps1 -Repository Community-Access-Classroom/learning-room-test-student-day1 -StudentUsername test-student
scripts/classroom/Seed-LearningRoomChallenge.ps1 -Repository Community-Access-Classroom/learning-room-test-student-day2 -Challenge 10 -Assignee test-student
scripts/classroom/Seed-PeerSimulation.ps1 -Repository Community-Access-Classroom/learning-room-test-student-day2 -StudentUsername test-student
```

If you use different repository names, replace values accordingly.

Pass criteria:
- Challenge 1 appears in Day 1 repo.
- Challenge 10 appears in Day 2 repo.
- Peer simulation issues and PR exist in both repos.

## Phase 5 - Curriculum Content QA (Walk every required chapter and appendix)

This phase is required. Do not skip this phase even if challenge automation is passing.

### Step 16. Execute full chapter and appendix walkthrough

For each file listed below, open it and verify:

1. Instructions are accurate for the current Classroom model.
2. Links resolve or are intentionally marked as practice targets.
3. Accessibility language is actionable and not visual-only.
4. Challenge references align with [docs/CHALLENGES.md](../docs/CHALLENGES.md).

Use this per-file verification routine before checking each box:

1. Open the file and read it once top to bottom without editing.
2. Re-read while validating the 4 checks above and capture any defects in your QA notes.
3. If no defect is found, mark the checkbox complete immediately.
4. If a defect is found, leave checkbox open until defect is logged with owner and due date.

Why this matters:

- This prevents "skim and check" behavior that misses broken learner paths.
- It ensures every completed checkbox represents a defensible QA review, not just a visual pass.

Track completion using this checklist.

Core learner docs:

- [ ] [docs/get-going.md](../docs/get-going.md)
- [ ] [docs/course-guide.md](../docs/course-guide.md)
- [ ] [docs/student-onboarding.md](../docs/student-onboarding.md)
- [ ] [docs/CHALLENGES.md](../docs/CHALLENGES.md)

Core chapters:

- [ ] [docs/00-pre-workshop-setup.md](../docs/00-pre-workshop-setup.md)
- [ ] [docs/01-choose-your-tools.md](../docs/01-choose-your-tools.md)
- [ ] [docs/02-understanding-github.md](../docs/02-understanding-github.md)
- [ ] [docs/03-navigating-repositories.md](../docs/03-navigating-repositories.md)
- [ ] [docs/04-the-learning-room.md](../docs/04-the-learning-room.md)
- [ ] [docs/05-working-with-issues.md](../docs/05-working-with-issues.md)
- [ ] [docs/06-working-with-pull-requests.md](../docs/06-working-with-pull-requests.md)
- [ ] [docs/07-merge-conflicts.md](../docs/07-merge-conflicts.md)
- [ ] [docs/08-open-source-culture.md](../docs/08-open-source-culture.md)
- [ ] [docs/09-labels-milestones-projects.md](../docs/09-labels-milestones-projects.md)
- [ ] [docs/10-notifications-and-day-1-close.md](../docs/10-notifications-and-day-1-close.md)
- [ ] [docs/11-vscode-interface.md](../docs/11-vscode-interface.md)
- [ ] [docs/12-vscode-accessibility.md](../docs/12-vscode-accessibility.md)
- [ ] [docs/13-how-git-works.md](../docs/13-how-git-works.md)
- [ ] [docs/14-git-in-practice.md](../docs/14-git-in-practice.md)
- [ ] [docs/15-code-review.md](../docs/15-code-review.md)
- [ ] [docs/16-github-copilot.md](../docs/16-github-copilot.md)
- [ ] [docs/17-issue-templates.md](../docs/17-issue-templates.md)
- [ ] [docs/18-fork-and-contribute.md](../docs/18-fork-and-contribute.md)
- [ ] [docs/19-accessibility-agents.md](../docs/19-accessibility-agents.md)
- [ ] [docs/20-build-your-agent.md](../docs/20-build-your-agent.md)
- [ ] [docs/21-next-steps.md](../docs/21-next-steps.md)

Appendices:

- [ ] [docs/appendix-a-glossary.md](../docs/appendix-a-glossary.md)
- [ ] [docs/appendix-b-screen-reader-cheatsheet.md](../docs/appendix-b-screen-reader-cheatsheet.md)
- [ ] [docs/appendix-c-markdown-reference.md](../docs/appendix-c-markdown-reference.md)
- [ ] [docs/appendix-d-git-authentication.md](../docs/appendix-d-git-authentication.md)
- [ ] [docs/appendix-e-advanced-git.md](../docs/appendix-e-advanced-git.md)
- [ ] [docs/appendix-f-git-security.md](../docs/appendix-f-git-security.md)
- [ ] [docs/appendix-g-vscode-reference.md](../docs/appendix-g-vscode-reference.md)
- [ ] [docs/appendix-h-github-desktop.md](../docs/appendix-h-github-desktop.md)
- [ ] [docs/appendix-i-github-cli.md](../docs/appendix-i-github-cli.md)
- [ ] [docs/appendix-j-cloud-editors.md](../docs/appendix-j-cloud-editors.md)
- [ ] [docs/appendix-k-copilot-reference.md](../docs/appendix-k-copilot-reference.md)
- [ ] [docs/appendix-l-agents-reference.md](../docs/appendix-l-agents-reference.md)
- [ ] [docs/appendix-m-accessibility-standards.md](../docs/appendix-m-accessibility-standards.md)
- [ ] [docs/appendix-n-advanced-search.md](../docs/appendix-n-advanced-search.md)
- [ ] [docs/appendix-o-branch-protection.md](../docs/appendix-o-branch-protection.md)
- [ ] [docs/appendix-p-security-features.md](../docs/appendix-p-security-features.md)
- [ ] [docs/appendix-q-actions-workflows.md](../docs/appendix-q-actions-workflows.md)
- [ ] [docs/appendix-r-projects-deep-dive.md](../docs/appendix-r-projects-deep-dive.md)
- [ ] [docs/appendix-s-releases-tags-insights.md](../docs/appendix-s-releases-tags-insights.md)
- [ ] [docs/appendix-t-community-and-social.md](../docs/appendix-t-community-and-social.md)
- [ ] [docs/appendix-u-discussions-and-gists.md](../docs/appendix-u-discussions-and-gists.md)
- [ ] [docs/appendix-v-github-mobile.md](../docs/appendix-v-github-mobile.md)
- [ ] [docs/appendix-w-github-pages.md](../docs/appendix-w-github-pages.md)
- [ ] [docs/appendix-x-resources.md](../docs/appendix-x-resources.md)
- [ ] [docs/appendix-y-workshop-materials.md](../docs/appendix-y-workshop-materials.md)
- [ ] [docs/appendix-z-github-skills.md](../docs/appendix-z-github-skills.md)

Phase 4 pass criteria:
- Every listed file has been reviewed and marked complete.
- Any doc defects are logged with owner and due date.

### Step 17. Validate supporting content outside chapters

Review the following content surfaces because they directly affect learner and facilitator experience.

Use this verification routine for each section below (Root docs, Classroom docs, Learning Room automation docs):

1. Open all files in the section and compare wording for the same workflow concepts.
2. Confirm setup steps, command names, and expected outcomes match current automation behavior.
3. Confirm links between docs resolve and point to the intended destination.
4. Mark each file checkbox only after you either confirm consistency or log a specific defect.

Why this matters:

- Learners and facilitators often use these supporting docs first; contradictions here cause avoidable support load.
- Cross-document consistency reduces failed setup attempts during live cohorts.

- [ ] Root docs alignment:
   - [ ] [README.md](../README.md)
   - [ ] [BUILD.md](../BUILD.md)
   - [ ] [REGISTER.md](../REGISTER.md)
   - [ ] [CONTRIBUTING.md](../CONTRIBUTING.md)
   - [ ] [SECURITY.md](../SECURITY.md)
   - [ ] [REPOSITORY_SECURITY.md](../REPOSITORY_SECURITY.md)
- [ ] Classroom deployment docs:
   - [ ] [classroom/README.md](../classroom/README.md)
   - [ ] [classroom/HUMAN_TEST_MATRIX.md](../classroom/HUMAN_TEST_MATRIX.md)
   - [ ] [classroom/grading-guide.md](../classroom/grading-guide.md)
- [ ] Learning Room automation docs:
   - [ ] [learning-room/.github/STUDENT_GUIDE.md](../learning-room/.github/STUDENT_GUIDE.md)
   - [ ] [learning-room/.github/FACILITATOR_GUIDE.md](../learning-room/.github/FACILITATOR_GUIDE.md)
   - [ ] [learning-room/.github/SETUP_AND_MAINTENANCE.md](../learning-room/.github/SETUP_AND_MAINTENANCE.md)
   - [ ] [learning-room/.github/DEPLOYMENT_VALIDATION.md](../learning-room/.github/DEPLOYMENT_VALIDATION.md)

Pass criteria:

- Supporting docs are consistent with chapter guidance and current automation behavior.
- Any cross-document contradictions are logged as defects.

## Phase 6 - Student Journey QA (Walk every path as a student)

Use [classroom/HUMAN_TEST_MATRIX.md](../classroom/HUMAN_TEST_MATRIX.md) as your execution baseline and record evidence for each challenge.

Phase execution rule:

1. Run student journey checks in challenge order unless explicitly validating a failure-mode branch.
2. For each challenge, capture issue URL, evidence comment URL, and workflow/check outcome.
3. Update the Challenge Tracking Log row immediately after each challenge completes.
4. If progression fails, stop sequence and resolve before moving to next challenge.

Why this matters:

- Ordered execution is required to validate progression automation and student experience continuity.

### Student pre-read sequence before challenge execution

Have the tester read in this order:

1. [docs/get-going.md](../docs/get-going.md)
2. [docs/00-pre-workshop-setup.md](../docs/00-pre-workshop-setup.md)
3. [docs/04-the-learning-room.md](../docs/04-the-learning-room.md)
4. [docs/CHALLENGES.md](../docs/CHALLENGES.md)

### Day 1 challenge walkthrough (Challenges 1 to 9)

For each challenge issue, perform this pattern:

1. Open challenge issue.
2. Complete required actions.
3. Post evidence comment.
4. Close issue.
5. Confirm next challenge issue appears.

Challenge-specific checks:

1. Challenge 1: verify orientation tasks and next challenge creation.
2. Challenge 2: create a clear issue from `docs/welcome.md` TODO.
3. Challenge 3: comment on peer simulation issue and include mention.
4. Challenge 4: create `learn/<username>` branch.
5. Challenge 5: commit real content change with descriptive message.
6. Challenge 6: open PR with `Closes #N` and validate Aria response.
7. Challenge 7: run conflict seeding and resolve conflict markers.
8. Challenge 8: submit culture reflection evidence.
9. Challenge 9: merge PR and confirm linked issue closes.

Run merge conflict setup when Challenge 7 is reached:

```powershell
scripts/classroom/Start-MergeConflictChallenge.ps1 -Repository Community-Access-Classroom/learning-room-test-student-day1 -StudentBranch learn/test-student
```

Day 1 pass criteria:
- Progression works across all nine challenges.
- Aria feedback appears on test PRs.
- Challenge 7 conflict-marker checks fail before fix and pass after fix.

### Day 2 challenge walkthrough (Challenges 10 to 16)

Use the same five-step issue pattern for each challenge.

Challenge-specific checks:

1. Challenge 10: clone locally, branch, edit, commit, push, and verify local commit workflow.
2. Challenge 11: open PR from Day 2 local branch and verify feedback.
3. Challenge 12: complete structured review on peer simulation PR.
4. Challenge 13: capture Copilot suggestion and student judgment.
5. Challenge 14: create custom non-challenge issue template with required fields and verify workflow.
6. Challenge 15: inspect accessibility agents and capture findings.
7. Challenge 16: fork `Community-Access/accessibility-agents`, create agent file with frontmatter, responsibilities, and guardrails, then open cross-fork PR.

Day 2 pass criteria:
- Progression works from 10 through 16.
- Autograders for 10, 14, and 16 provide useful pass/fail feedback.
- Capstone evidence is complete and reviewable.

### Student-visible expected state map (required cross-check)

Use this section to confirm what students should see, where they should see it, and what artifacts should exist after each stage.

| Stage | Where student looks | What student should see | Expected artifacts |
|---|---|---|---|
| After assignment acceptance | Repository home and Issues tab | Private Learning Room repository created from template | Starter docs (`docs/welcome.md`, `docs/keyboard-shortcuts.md`, `docs/setup-guide.md`), workflows, issue templates |
| After initial seeding | Issues tab | Correct starting challenge issue appears (`Challenge 1` or `Challenge 10`) | Assigned challenge issue with clear instructions and evidence prompt |
| During Day 1 PR flow (Ch 4-6) | Branch selector, Pull requests, Actions | Student branch exists, PR open, bot feedback appears | Branch `learn/<username>` or equivalent, PR with `Closes #N`, Aria validation comment |
| During merge conflict (Ch 7) | PR conversation/files, Checks tab | Conflict state visible, then resolved | Conflict markers present pre-fix, removed post-fix, conflict check transitions to pass |
| During Day 2 local flow (Ch 10-11) | Local clone and remote PR | Local commit/push reflected in PR and checks | Non-default-branch commit visible in history and checks |
| During template challenge (Ch 14) | File tree and PR checks | Custom template exists and passes required-field checks | New `.github/ISSUE_TEMPLATE/*.yml` file with `name` and `description` |
| During capstone (Ch 16) | Fork repo and capstone PR | Cross-fork contribution path works with required structure | Agent file with frontmatter, responsibilities, guardrails; PR evidence |
| Bonus path | Issue templates and evidence comments | Bonus templates are available and usable | Bonus issue evidence and status recorded in tracker |

Pass criteria:

- Student-visible state is confirmed at each stage above.
- Any mismatch between expected and observed student experience is logged as a defect.

### Bonus path walkthrough (A to E)

Bonus challenges are optional for students, but QA tracking is required for every bonus challenge.

1. Open each bonus template.
2. Confirm instructions are understandable and actionable.
3. Track completion status for each bonus challenge A to E.
4. If a bonus challenge is not fully executed, record why and what validated the path.

Pass criteria:
- All bonus challenges A to E have explicit status and notes.
- No bonus challenge is left untracked.

### Challenge Tracking Log (Required)

Use this tracker while executing Phase 5. Every row must be completed.

Row completion standard:

1. Status must be one of Pass, Fail, or Deferred.
2. Evidence link must point to issue, PR, workflow run, or equivalent proof.
3. Notes must include remediation or deferral rationale when status is not Pass.

Why this matters:

- Complete row data is required for defensible release decisions and post-run audits.

| Challenge | Title | Status (Pass/Fail/Deferred) | Evidence link | Notes |
|---|---|---|---|---|
| 1 | Find Your Way Around |  |  |  |
| 2 | File Your First Issue |  |  |  |
| 3 | Join the Conversation |  |  |  |
| 4 | Branch Out |  |  |  |
| 5 | Make Your Mark |  |  |  |
| 6 | Open Your First Pull Request |  |  |  |
| 7 | Survive a Merge Conflict |  |  |  |
| 8 | The Culture Layer |  |  |  |
| 9 | Merge Day |  |  |  |
| 10 | Go Local |  |  |  |
| 11 | Open a Day 2 PR |  |  |  |
| 12 | Review Like a Pro |  |  |  |
| 13 | AI as Your Copilot |  |  |  |
| 14 | Template Remix |  |  |  |
| 15 | Meet the Agents |  |  |  |
| 16 | Build Your Agent (Capstone) |  |  |  |
| Bonus A | Improve an Existing Agent |  |  |  |
| Bonus B | Document Your Journey |  |  |  |
| Bonus C | Create a Group Challenge |  |  |  |
| Bonus D | Notification Mastery |  |  |  |
| Bonus E | Explore Git History Visually |  |  |  |

### Challenge Reliability and Failure-Mode Coverage (Required)

Do not mark the challenge system reliable until this section is completed.

#### Reliability test personas

Run challenge validation with at least these personas:

- Persona A: Day 1 + Day 2 student path (full path through 1-16).
- Persona B: Day-2-only student path (starts at Challenge 10).

#### Required variation categories

For each applicable challenge, test and document all categories below:

1. Happy path completion.
2. Common student error path.
3. Recovery path after feedback.
4. Automation latency/idempotency behavior (reruns, duplicate events, delayed comments).

#### Variation matrix by challenge family

| Challenge family | Minimum failure/variation scenarios to test | Pass criteria |
|---|---|---|
| 1-3 orientation and issue flow | Missing evidence comment, evidence posted in wrong issue, issue closed without evidence, delayed bot response on mention | Student can recover without facilitator-only intervention; instructions remain clear |
| 4-6 branch/commit/PR flow | Wrong branch, commit to main, PR missing `Closes #N`, weak PR body, duplicate PR attempts | Bot/autograder guidance is actionable and student can fix to pass |
| 7 conflict flow | Conflict markers left in file, partial resolution, wrong file resolved, reintroducing markers on next commit | Fails when unresolved, passes after true resolution, feedback explains next step |
| 8-9 culture/merge flow | Reflection too vague, merge blocked by checks, PR approved but not mergeable, issue not auto-closing | Student can complete with clear guidance and accurate merge outcome |
| 10-11 local workflow | Local auth failure, push to wrong remote/branch, no new commit, PR from wrong base | Failure mode is discoverable and recoverable with provided guidance |
| 12 review workflow | Review left as comment only, no actionable feedback, review submitted on wrong PR | Challenge guidance clarifies expectations and evidence remains evaluable |
| 13 Copilot evidence | Missing prompt/evaluation details, copied output without judgment, evidence too shallow | Student can revise evidence and meet evaluation criteria |
| 14 template workflow | Template file wrong folder/name, missing `name`, missing `description`, invalid YAML | Autograder fails correctly and passes only after true fix |
| 15 agent exploration | Superficial exploration notes, wrong repo referenced, no evidence of actual inspection | Challenge remains completable with clear evidence requirements |
| 16 capstone | Missing frontmatter, missing responsibilities/guardrails, PR to wrong repo, incomplete cross-fork setup | Autograder/checklist catches gaps and student can recover to complete |
| Bonus A-E | Student starts bonus without prerequisites, partial completion, alternate evidence format | Each bonus has documented pass/fail/deferred outcome and rationale |

#### Cross-cutting failure modes (must be tested at least once)

- Bot comment delay greater than expected window.
- Workflow rerun without creating duplicate progression issues.
- Student posts evidence in wrong place then corrects it.
- Autograder false-negative suspicion escalated and resolved with facilitator override process.
- Permission/access prompt encountered and resolved (student and facilitator perspectives).

#### Reliability gate pass criteria

- Every challenge (1-16 and Bonus A-E) has at least one documented happy path and one documented variation/failure scenario.
- Recovery steps are validated, not assumed.
- No critical failure path requires hidden facilitator knowledge outside documented guidance.

### Student recovery and reset playbook (required)

If a student repository is corrupted, use this escalation path.

#### Level 1: Student self-recovery (preferred)

1. Re-open challenge instructions and compare against required target file.
2. Use PR diff to undo accidental changes.
3. Restore missing text from template references in challenge guidance.
4. Push a corrective commit and re-run checks.

Use when:

- Student changed only small sections in expected challenge files.

#### Level 2: Facilitator-assisted file restore (safe branch+PR)

Use the recovery script to restore baseline files from `Community-Access/learning-room-template` into a student repo on a recovery branch.

Script:

```powershell
scripts/classroom/Restore-LearningRoomFiles.ps1 -StudentRepository Community-Access-Classroom/learning-room-studentname -Profile core-day1 -OpenPullRequest
```

Profiles:

- `core-day1` restores Day 1 starter docs.
- `core-day2` restores Day 2 sample docs.
- `automation-core` restores workflow files.
- `all-core` restores all above.
- `custom` restores explicit paths provided via `-Paths`.

Use when:

- A challenge file, sample file, or workflow file was accidentally overwritten or deleted.

#### Level 3: Repository re-provision fallback

If corruption is broad and recovery branch approach is not sufficient:

1. Export evidence links needed for grading history.
2. Remove student assignment entry in Classroom (if policy allows).
3. Re-invite student to assignment to generate a fresh repository.
4. Re-seed appropriate challenge and peer simulation artifacts.
5. Document mapping from old repo to replacement repo in facilitator notes.

Use when:

- Student repo is not reasonably recoverable with targeted file restores.

#### Recovery gate pass criteria

- At least one Level 2 recovery test is completed in QA and documented.
- Facilitators can perform targeted restore without editing files manually in GitHub UI.
- Recovery actions preserve auditability through branch/PR evidence.

## Phase 7 - Workflow and Automation Validation Matrix

Use this matrix as your quick final automation check.

Matrix execution procedure:

1. Work row by row.
2. Trigger or locate the required event for each component.
3. Verify expected behavior in the stated location.
4. Record one evidence link per row.
5. Mark row complete only when observed behavior matches expected experience.

Why this matters:

- The matrix is the final integration proof that automation is functioning as designed.

| Automation component | What to verify | Where to verify | Trigger timing | Expected experience |
|---|---|---|---|---|
| `registration.yml` welcome job | New registration handling | Registration issue comment + labels + Actions run | On issue open with `[REGISTER]` | Welcome comment posted, registration label applied, no manual intervention |
| `registration.yml` duplicate logic | Duplicate handling | Duplicate issue thread + labels + closed state | On second submission by same user | Duplicate message references original and issue auto-closes |
| `registration.yml` waitlist logic | Capacity full behavior | Registration issue comment + `waitlist` label | When threshold reached in controlled test | Waitlist message and label applied |
| `registration.yml` CSV export | Registration data artifact | Actions artifacts | Every registration run or manual dispatch | `registration-data` artifact is available and current |
| `registration.yml` roster sync | Non-PII roster update | [.github/data/student-roster.json](../.github/data/student-roster.json) and workflow commit | Every registration run or manual dispatch | Roster updates only when changed and no PII stored |
| `pr-validation-bot.yml` | PR structure and guidance checks | PR comments + Actions | PR open/edit/sync/review events | Validation comment appears and updates in place |
| `content-validation.yml` | Link/markdown/accessibility checks | PR checks/comments + Actions logs | PR open/edit/sync | Clear actionable findings tied to changed files |
| `student-progression.yml` | Challenge unlock sequence | Issues tab + Actions logs | Issue close and workflow dispatch | Next challenge issue appears with correct sequence |
| `skills-progression.yml` | Skill/achievement feedback | PR comments + Actions | PR merge | Achievement/progress feedback posts without failure |
| `autograder-conflicts.yml` | Conflict marker detection for Ch07 | Actions checks + PR status | PR open/edit for conflict scenario | Fails before fix, passes after marker removal |
| `autograder-local-commit.yml` | Local commit validation for Ch10 | Actions checks + PR/status output | Push/PR for Ch10 scenario | Detects non-default-branch commit |
| `autograder-template.yml` | Issue template validation for Ch14 | Actions checks + PR/status output | Template challenge workflow trigger | Fails missing fields, passes with `name` and `description` |
| `autograder-capstone.yml` | Agent structure validation for Ch16 | Actions checks + PR/status output | Capstone PR events | Validates frontmatter, responsibilities, and guardrails |
| `Seed-LearningRoomChallenge.ps1` | Challenge seed operation | Issues tab + workflow run history | On script execution | Target challenge appears and assignment is correct |
| `Seed-PeerSimulation.ps1` | Peer simulation artifacts | Issues + PR list + branch list | On script execution | Peer simulation issues and PR appear as expected |
| `Start-MergeConflictChallenge.ps1` | Merge conflict scenario creation | Student PR conflict state + checks | On script execution during Ch07 | Conflict becomes visible and resolvable |
| `Test-LearningRoomTemplate.ps1` | Template readiness scan | Script output + remediation notes | Before assignment publish and after updates | Reports readiness state and clear gaps |
| `Prepare-LearningRoomTemplate.ps1` | Template preparation operations | Script output + repository checks | Before go-live if prep needed | Required template prep completes without hidden failures |
| `Invoke-LearningRoomEndToEndTest.ps1` | Full-scripted QA helper path | Script output and referenced artifacts | Optional preflight or regression validation | End-to-end script executes expected checks |
| `Add-AutograderSafeguards.ps1` and `Fix-AutograderComments.ps1` | Autograder hardening utilities | Script output + workflow behavior | As needed during defects/fixes | Safeguards/comments behavior aligns with expected feedback quality |

## Phase 8 - Final Sign-Off (Podcast-Excluded Release Gate)

Use this checklist for final decision. For every item, complete the listed verification steps and record evidence before checking the box.

- [ ] Registration intake path tested from public page to welcome comment.
   Verification steps:
   1. Execute Phase 1 Step 1 and Step 3 with a test registration.
   2. Capture the public entry point, issue creation, and final welcome comment evidence.
   3. Confirm labels and comment content match expected behavior in the QA Validation Contract.
   Why this matters: this proves the first learner touchpoint works end to end.

- [ ] Registration duplicate handling validated.
   Verification steps:
   1. Execute Phase 1 Step 4 duplicate scenario.
   2. Confirm duplicate issue closes automatically and references the original.
   3. Record issue links and labels in QA notes.
   Why this matters: duplicate control prevents noisy intake and manual cleanup overhead.

- [ ] Registration CSV and roster sync validated.
   Verification steps:
   1. Execute Phase 1 Step 5.
   2. Download `registration-data` artifact and verify the expected test row.
   3. Confirm roster sync updates only when underlying data changes.
   Why this matters: operations teams depend on accurate roster exports for cohort management.

- [ ] Learning Room template sync to GitHub template repository validated.
   Verification steps:
   1. Execute Phase 2 Step 6.
   2. Confirm sync PR merged (or no-change outcome) and template repo settings remain correct.
   3. Record PR link or no-change script output.
   Why this matters: stale template state breaks downstream assignments even when source repo is correct.

- [ ] Template smoke repository validation completed from latest template state.
   Verification steps:
   1. Execute Phase 2 Step 7.
   2. Confirm smoke repo creation, required file inventory, and seed dispatch behavior.
   3. Record script output and retained evidence links.
   Why this matters: this is the fastest proof that template consumers get runnable automation.

- [ ] Template freshness proof completed against latest merged sync PR.
   Verification steps:
   1. Execute Phase 2 Step 8.
   2. Compare at least three changed files from sync PR to smoke repo content.
   3. Log exact file comparisons in QA notes.
   Why this matters: confirms new cohorts are not launched from outdated template snapshots.

- [ ] Day 1 assignment configured and validated.
   Verification steps:
   1. Execute Phase 3 Step 11.
   2. Verify assignment settings, description, autograder count, and points.
   3. Store screenshot of final assignment configuration page.
   Why this matters: Day 1 misconfiguration creates immediate learner friction and grading drift.

- [ ] Day 2 assignment configured and validated.
   Verification steps:
   1. Execute Phase 3 Step 12.
   2. Verify assignment settings, description, autograder count, and points.
   3. Store screenshot of final assignment configuration page.
   Why this matters: Day 2 challenge flow and capstone checks depend on exact assignment setup.

- [ ] Registration form template and required labels validated.
   Verification steps:
   1. Execute Phase 0 Step 0.1 and re-check before sign-off.
   2. Confirm `workshop-registration.yml` is current and selectable.
   3. Confirm labels `registration`, `duplicate`, and `waitlist` exist and are active.
   Why this matters: the registration workflow cannot route correctly without these baseline objects.

- [ ] Test student accepted both assignments and repos created.
   Verification steps:
   1. Execute Phase 4 Step 14.
   2. Confirm two private repos are created for Day 1 and Day 2.
   3. Record both repository URLs in completion notes.
   Why this matters: acceptance and repo provisioning are required before challenge QA can begin.

- [ ] Full chapter and appendix walkthrough completed and tracked.
   Verification steps:
   1. Execute Phase 5 Step 16 using the per-file verification routine.
   2. Ensure every required chapter and appendix checkbox is either complete or tied to a logged defect.
   3. Confirm no file in the required list is left unreviewed.
   Why this matters: curriculum defects can invalidate otherwise healthy automation.

- [ ] Supporting non-chapter content walkthrough completed and tracked.
   Verification steps:
   1. Execute Phase 5 Step 17 using the section verification routine.
   2. Resolve or log all cross-document inconsistencies.
   3. Confirm all supporting-doc checkboxes are complete or defect-linked.
   Why this matters: learners rely on these docs during setup and troubleshooting.

- [ ] Challenge 1 and Challenge 10 seeding validated.
   Verification steps:
   1. Execute Phase 4 Step 15.
   2. Confirm seeded issues appear in Day 1 and Day 2 test repos.
   3. Capture issue links for both seeded starting points.
   Why this matters: seeding failures block both student journey entry paths.

- [ ] Full Day 1 student path (1 to 9) completed.
   Verification steps:
   1. Execute Phase 6 Day 1 walkthrough across Challenges 1-9.
   2. Confirm progression behavior after each issue closure.
   3. Fill Day 1 rows in Challenge Tracking Log with evidence links.
   Why this matters: Day 1 is the foundational workflow and must be dependable for all learners.

- [ ] Full Day 2 student path (10 to 16) completed.
   Verification steps:
   1. Execute Phase 6 Day 2 walkthrough across Challenges 10-16.
   2. Confirm Day 2 autograder behavior for 10, 14, and 16.
   3. Fill Day 2 rows in Challenge Tracking Log with evidence links.
   Why this matters: Day 2 validates local workflow, review quality, and capstone readiness.

- [ ] All bonus challenges A to E tracked with status and evidence or deferral reason.
   Verification steps:
   1. Execute Phase 6 Bonus path walkthrough.
   2. Mark each bonus row Pass, Fail, or Deferred with rationale.
   3. Attach evidence link or deferral reason for all five bonus items.
   Why this matters: optional learner paths still require QA accountability.

- [ ] Challenge reliability and failure-mode coverage completed for all challenge families.
   Verification steps:
   1. Execute the full Challenge Reliability and Failure-Mode Coverage section.
   2. Validate at least one happy path and one variation path per challenge family.
   3. Confirm recovery behavior is tested, not assumed.
   Why this matters: production reliability is defined by recovery from failure paths, not only happy-path success.

- [ ] Student-visible expected state map was verified at each stage.
   Verification steps:
   1. Execute the Student-visible expected state map cross-check.
   2. Compare observed state to each stage row in the table.
   3. Log any mismatch as a defect before sign-off.
   Why this matters: this verifies the learner experience directly, not just backend workflow success.

- [ ] Recovery/reset playbook validated with at least one Level 2 restore test.
   Verification steps:
   1. Execute Student recovery and reset playbook Level 2 flow.
   2. Confirm restored files are proposed through branch and PR evidence.
   3. Record restore test repository, branch, and PR links.
   Why this matters: facilitators need a proven restoration path during live delivery incidents.

- [ ] Aria, progression, and autograder workflows validated with evidence.
   Verification steps:
   1. Execute checks in the Workflow and Automation Validation Matrix for `pr-validation-bot.yml`, `student-progression.yml`, and all autograder workflows.
   2. Capture one pass and one actionable-fail evidence sample where applicable.
   3. Confirm feedback is clear enough for student self-recovery.
   Why this matters: these workflows are the core automated coaching and grading systems.

- [ ] Open defects documented with owner and due date.
   Verification steps:
   1. Review QA notes for all unresolved findings.
   2. Ensure each defect has severity, owner, and due date.
   3. Confirm blocker defects are explicitly marked for release decision.
   Why this matters: unresolved defects without ownership are operational risk hidden as "known issues."

- [ ] Release owner signs go or no-go decision.
   Verification steps:
   1. Confirm all required checklist items above are complete or have explicit risk acceptance.
   2. Populate Completion Output Template with final links and outcomes.
   3. Capture release owner decision (Go or No-Go) with approver name and date.
   Why this matters: formal accountability prevents ambiguous launch decisions.

## Troubleshooting and Rollback Quick Actions

Use this section when a blocker appears during QA.

1. Registration invite automation issue:
   - Step 1: Confirm `CLASSROOM_ORG_ADMIN_TOKEN` and `CLASSROOM_ORG` values are present and correctly scoped.
   - Step 2: If automation is still failing, disable org invite automation by clearing `CLASSROOM_ORG`.
   - Step 3: Continue registration flow with manual classroom invite process.
   - Verify: registration workflow still posts welcome response and assignment links as configured.

2. Seeding failure:
   - Step 1: Re-run seeding script with explicit repository slug and assignee.
   - Step 2: Confirm target repo exists and Actions are enabled.
   - Step 3: Confirm template workflow inventory includes seeding dependencies.
   - Verify: expected challenge issue appears and is assigned correctly.

3. Progression not creating next issue:
   - Step 1: Confirm current challenge issue was closed, not left open with comment only.
   - Step 2: Confirm `student-progression.yml` exists in target repository and has successful run history.
   - Step 3: Re-dispatch progression workflow if needed.
   - Verify: next challenge issue appears with correct numbering.

4. Autograder mismatch:
   - Step 1: Re-check exact autograder command/settings definitions in [admin/classroom/autograding-setup.md](classroom/autograding-setup.md).
   - Step 2: Trigger known-fail and known-pass scenarios for the affected autograder.
   - Step 3: Compare observed output with expected rubric behavior.
   - Verify: fail messages are actionable and pass state is reachable with correct student behavior.

Escalation rule:

1. If blocker persists after one remediation cycle, log defect with owner and ETA.
2. Continue with unaffected phases only when blocker impact is clearly isolated.

Why this matters:

- Fast, repeatable recovery protects cohort timelines and prevents hidden release risk.

## Completion Output Template (Copy into QA Issue)

Before publishing the completion output:

1. Confirm all required Phase 8 checklist items are complete or explicitly risk-accepted.
2. Ensure every section below includes links, not placeholders.
3. Attach defect list with owner and due date for any unresolved findings.
4. Capture final approver and decision timestamp.

Why this matters:

- This output is the release audit record and must be independently reviewable.

```text
Runbook Version: admin/LEARNING-ROOM-E2E-QA-RUNBOOK.md
Date:
QA Owner:
Facilitator Account:
Test Student Account:

Registration QA:
- Happy path:
- Duplicate path:
- Waitlist path:
- CSV export:
- Roster sync:

Classroom QA:
- Day 1 assignment URL:
- Day 2 assignment URL:
- Day 1 repo URL:
- Day 2 repo URL:

Challenge QA:
- Chapter walkthrough complete (00-21 + Appendix A-Z):
- Supporting non-chapter content walkthrough complete:
- Day 1 complete (1-9):
- Day 2 complete (10-16):
- Challenge reliability/failure-mode coverage complete:
- Student-visible expected state map verified:
- Recovery Level 2 restore test completed:
- Bonus A status:
- Bonus B status:
- Bonus C status:
- Bonus D status:
- Bonus E status:

Automation QA:
- Registration workflow:
- Registration form/label setup:
- Aria:
- Content validation:
- Progression:
- Skills progression:
- Autograders:
- Seeding scripts:

Open Defects:
- [ID] Severity | Owner | ETA

Release Decision:
- Go / No-Go
- Approver:
```

## What This Runbook Replaces

This runbook is the operator-facing execution path that unifies registration, deployment, and end-to-end challenge QA.

It does not replace source documents. It sequences them into one practical checklist so a single facilitator can execute and validate the full system without context switching across multiple folders.