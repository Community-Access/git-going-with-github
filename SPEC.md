# SPEC.md

Complete project specification for GIT Going with GitHub (GLOW). This is the technical source of truth: what the system is, what every component does, how data and state flow, the interfaces between parts, and the requirements every piece must meet. It implements the vision in [golden.md](golden.md). Where this spec and reality disagree, fix one of them and note it here.

## Table of contents

- [1. Overview](#1-overview)
- [2. Goals and non-goals](#2-goals-and-non-goals)
- [3. Personas and primary journeys](#3-personas-and-primary-journeys)
- [4. System architecture](#4-system-architecture)
- [5. Component catalog](#5-component-catalog)
- [6. Data model and state of record](#6-data-model-and-state-of-record)
- [7. Provisioning subsystem (the Classroom replacement)](#7-provisioning-subsystem-the-classroom-replacement)
- [8. Automation contracts](#8-automation-contracts)
- [9. Curriculum subsystem](#9-curriculum-subsystem)
- [10. Content pipeline: docs, HTML, EPUB, audio](#10-content-pipeline-docs-html-epub-audio)
- [11. Optional Flask companion](#11-optional-flask-companion)
- [12. Accessibility requirements](#12-accessibility-requirements)
- [13. Security requirements](#13-security-requirements)
- [14. Reliability, observability, and recovery](#14-reliability-observability-and-recovery)
- [15. Testing and quality strategy](#15-testing-and-quality-strategy)
- [16. Configuration surface](#16-configuration-surface)
- [17. Repository layout](#17-repository-layout)
- [18. Migration plan: from Classroom to owned provisioning](#18-migration-plan-from-classroom-to-owned-provisioning)
- [19. Acceptance criteria](#19-acceptance-criteria)
- [20. Open questions](#20-open-questions)

## 1. Overview

GLOW is a two-day, accessibility-first workshop that teaches blind and low vision technologists to navigate and contribute to open source on GitHub using a screen reader and keyboard alone. It is delivered as:

- A **curriculum** of 22 chapters plus appendices in [docs/](docs/), published to HTML, EPUB, and an audio podcast series.
- A **Learning Room**: a per-student private repository, created from a template, that drives 16 core challenges plus 5 bonus challenges through GitHub-native automation (a PR validation bot named Gandalf, a Student Progression Bot, and a suite of autograders).
- A **registration and cohort system** that intakes learners, provisions their Learning Room, releases Day 2 content, and gives facilitators a live status dashboard.

The current production system depends on GitHub Classroom for provisioning. This spec defines both the present system and the target system in which Classroom is replaced by owned, GitHub-native provisioning, per [golden.md](golden.md).

## 2. Goals and non-goals

### Goals

- A learner completes the full arc from first GitHub navigation to a real, review-ready open source contribution.
- Every learner-facing surface is fully operable with NVDA, JAWS, and VoiceOver, by keyboard alone.
- Provisioning, roster, and progress are owned and reconstructable, with no single vendor as a point of failure.
- Facilitators can open a cohort, run it, and recover from any failure using documented runbooks.
- The system degrades gracefully: every automated step has a manual fallback.

### Non-goals

- Email delivery is not a dependency. All flows complete using the GitHub web notification inbox.
- The system does not require learners to join an organization, hold a paid plan, or change Actions settings.
- The system does not aim to replace VS Code, Copilot, or GitHub itself; it teaches their accessible use.
- Real-time chat, grading-for-credit, and LMS integration are out of scope.

## 3. Personas and primary journeys

### Personas

- **Learner.** New-to-GitHub, uses assistive technology, may not code. Needs belonging, clarity, and a forgiving path.
- **Facilitator.** Runs a cohort, seeds challenges, monitors progress, recovers stuck learners.
- **Maintainer.** Owns the curriculum, automation, content pipeline, and this spec.

### Primary learner journey

1. Register through an accessible front door (Flask companion, GitHub Pages form, or issue form fallback).
2. Receive a provisioned private Learning Room repository.
3. Acknowledge readiness (`ack`), complete Day 1 challenges, signal `day1-complete`.
4. Receive Day 2 release, complete Day 2 challenges and the capstone.
5. Open or prepare a real upstream contribution; continue asynchronously with support hub access.

### Primary facilitator journey

1. Sync and validate the Learning Room template.
2. Open a cohort; provisioning creates student repositories.
3. Seed Challenge 1 (and Challenge 10 for Day 2) per student.
4. Monitor the dashboard; intervene on watchdog alerts.
5. Run teardown after the cohort.

## 4. System architecture

The architecture separates a dependable GitHub-native core (the critical learner path) from an optional companion at the edges. The companion can vanish without breaking any learner.

```text
                         ACCESSIBLE FRONT DOOR
        (Flask companion  OR  GitHub Pages form  OR  issue form fallback)
                                   |
                                   v
                        REGISTRATION + ROSTER (owned)
              private admin repo roster record  <----+ companion mirror (optional)
                                   |
                                   v
                   PROVISIONING SUBSYSTEM (GitHub-native)
        idempotent action: template ----> per-student private Learning Room repo
                                   |
                                   v
                          THE LEARNING ROOM (per student)
   Gandalf (PR bot) | Student Progression Bot | Autograders | Challenge issues
                                   |
                                   v
              PROGRESSION + DAY 2 RELEASE (deterministic text signals)
                                   |
                                   v
                  FACILITATOR DASHBOARD (admin issues  +  optional companion view)
```

Architectural rules:

- The critical path (front door fallback, provisioning, Learning Room, progression, release) runs entirely on GitHub.
- The companion only ever renders owned state more nicely; it never holds state the learner depends on.
- Each arrow is a documented contract (Section 8) with a manual fallback.

## 5. Component catalog

This table is the index of moving parts. Each component has an owner, a trigger, and a fallback.

| Component | Location | Trigger | Responsibility | Manual fallback |
|---|---|---|---|---|
| Registration workflow | [.github/workflows/registration.yml](.github/workflows/registration.yml) | Registration issue opened | Validate, redact, label, store intake, post links | Facilitator labels and replies by hand |
| Day 2 release | [.github/workflows/day2-release.yml](.github/workflows/day2-release.yml) | Schedule, dispatch | Post Day 2 link when `day1-complete` signal present | Facilitator posts Day 2 link |
| Dashboard sync | [.github/workflows/instructor-dashboard-sync.yml](.github/workflows/instructor-dashboard-sync.yml) | Schedule, events | Upsert per-student status issue in admin repo | Facilitator reads enrollment issues |
| Student grouping | [.github/workflows/student-grouping.yml](.github/workflows/student-grouping.yml) | Schedule, dispatch | Cohort grouping support | Manual roster grouping |
| Skills progression | [.github/workflows/skills-progression.yml](.github/workflows/skills-progression.yml) | Issue events | Track skills progression | Manual tracking |
| Learning Room validation | [.github/workflows/learning-room-validation.yml](.github/workflows/learning-room-validation.yml) | PR, dispatch | Validate template integrity | Manual template review |
| Authoritative sources validation | [.github/workflows/validate-authoritative-sources.yml](.github/workflows/validate-authoritative-sources.yml) | PR | Enforce source maps in content | Run validator script locally |
| Gandalf (PR bot) | [learning-room/.github/workflows/pr-validation-bot.yml](learning-room/.github/workflows/pr-validation-bot.yml) | PR events, comments | Welcome, validate PR, answer help | Facilitator comments |
| Student Progression Bot | [learning-room/.github/workflows/student-progression.yml](learning-room/.github/workflows/student-progression.yml) | Issue closed, dispatch | Create next challenge issue | Dispatch with `start_challenge` |
| Autograders (8) | [learning-room/.github/workflows/autograder-*.yml](learning-room/.github/workflows/) | Issue, PR, push, schedule | Verify objective challenge evidence | Facilitator verifies manually |
| Content validation | [learning-room/.github/workflows/content-validation.yml](learning-room/.github/workflows/content-validation.yml) | PR | Validate student content edits | Manual review |
| Provisioning action (target) | new, GitHub App or Actions bot | Roster entry created | Create and seed Learning Room repo idempotently | Classroom invite during transition |
| Content pipeline | [.github/workflows/](.github/workflows/) build-* and deploy-* | Push, dispatch | Build HTML, EPUB, diagrams, Pages | Run build scripts locally |
| Flask companion (optional) | new service | HTTP | Accessible front door and dashboard | GitHub Pages form and admin issues |

### The three Learning Room automation systems

- **Gandalf (PR Validation Bot).** Welcomes first-time contributors, validates PR structure, responds to help requests, posts real-time feedback on every push. Idempotent comment updates keyed by a marker string so it never spams a thread.
- **Student Progression Bot.** On close of a `Challenge N` issue, creates the next challenge issue; on `workflow_dispatch` with `start_challenge`, seeds a specific challenge. Concurrency-guarded per issue. See [challenge-progression.js](learning-room/.github/scripts/challenge-progression.js).
- **Autograders.** Eight workflows verifying objective evidence: issue filed, branch commit, PR link, merge conflicts resolved, local commit, template validity, capstone, and a watchdog. Each posts a single, kind, idempotent pass or fail comment and a separate error notice on workflow failure so the learner is never blamed for infrastructure faults.

## 6. Data model and state of record

The decoupling contract from [golden.md](golden.md) requires three owned, reconstructable sources of truth. This section defines their schemas.

### 6.1 Roster of record

Canonical store: one record per learner in the private admin repository (optionally mirrored by the companion). Logical schema:

| Field | Type | Notes |
|---|---|---|
| `github_handle` | string | Primary identity key |
| `cohort_id` | string | Cohort the learner belongs to |
| `path` | enum | `day1-day2` or `day2-only` |
| `learning_room_repo` | string | Owner/name of provisioned repo, null until provisioned |
| `provision_state` | enum | `pending`, `provisioned`, `failed`, `healed` |
| `status` | enum | `awaiting-ack`, `active-day1`, `day1-complete`, `day2-released`, `needs-info` |
| `registered_at` | timestamp | Intake time |
| `last_signal_at` | timestamp | Last deterministic signal observed |
| `notes` | string | Facilitator notes, redacted in any public surface |

Reconstruction rule: the roster can be rebuilt from registration issues plus provisioning results without any third party.

### 6.2 Progress of record

Derived, never authored by a vendor. Progress is computed from signals the project controls:

- Challenge issue state (open or closed) and titles (`Challenge N`).
- PR state and closing-keyword links (`Closes #N`).
- Labels (`enrolled`, `day1-complete`, `day2-eligible`, `day2-released`).
- Deterministic text signals in comments: `ack`, `day1-complete`.

Reconstruction rule: re-derivable by replaying issue and PR events in the student repository.

### 6.3 Provisioning of record

A log of provisioning attempts and outcomes per learner, sufficient to prove a repository is correctly seeded and to safely re-run. Fields: `github_handle`, `attempt_at`, `result` (`created`, `already-exists`, `seeded`, `healed`, `error`), `repo`, `template_sha`, `error_detail`.

Reconstruction rule: running the idempotent provisioning action against the roster reproduces a healthy state for every learner.

## 7. Provisioning subsystem (the Classroom replacement)

This is the only piece that fundamentally changes when Classroom departs. Everything downstream is unchanged because the resulting student repository is byte-shaped identically to a Classroom-created one.

### 7.1 Responsibilities

1. Given a roster entry, create a private repository from `Community-Access/learning-room-template`.
2. Grant the learner access.
3. Confirm all required automation files are present (the workflow set listed in the go-live gate).
4. Record the outcome in the provisioning log.
5. Be idempotent: re-running heals partial failures and never corrupts an existing repository.

### 7.2 Implementation options and decision

- **Option A, GitHub App (decided for production).** A GitHub App with least-privilege permissions (repository administration to create, contents to seed, metadata). Scoped, auditable, installable, and not tied to any human account.
- **Option B, Actions bot (Phase 1 spike only).** A scheduled or dispatched workflow in the admin repo using a least-privilege fine-grained token with repo-creation scope. Faster to stand up; acceptable only as a throwaway validation of seeding logic, then discarded.

Both must implement the same internal contract so the method is swappable via `PROVISIONING_MODE`.

**Decision: build the GitHub App for production; use the PAT path only as an optional Phase 1 spike.** The deciding factor is not rate limits or convenience, it is the first principle in [golden.md](golden.md): never let a single point of failure hold a cohort hostage. A PAT is bound to a facilitator's account, so that person leaving, resetting credentials, or changing 2FA can break provisioning. The App's properties (not tied to a human, short-lived installation tokens, fine-grained least-privilege) are the literal embodiment of the golden vision, and the extra one-time setup is small.

The pros and cons that drove the decision:

| Factor | GitHub App | Actions bot (PAT) |
|---|---|---|
| Identity | Purpose-built, survives staff change | Bound to a human account, single point of failure |
| Token lifetime | Short-lived installation token (~1 hour), minted on demand | Long-lived (months); larger leak blast radius |
| Permission granularity | Fine-grained (Administration, Contents, Metadata only) | Account-level even when fine-grained |
| Rate limit ceiling | Scales with org (floor 5,000/hour, scaling up) | Flat 5,000/hour |
| Audit trail | Clean App identity per action | Everything looks like the token owner |
| Setup cost | ~30 to 60 minutes one-time (App, App ID, PEM secret, token mint step) | Fastest; afternoon prototype |
| Key custody | Holds a signing key; must be in Secrets and rotatable | One token to store and rotate |

Because the downstream system cannot tell which mode created a repository, spiking with a PAT first and graduating to the App loses nothing.

### 7.2a GitHub App permission set

Grant only these. Anything beyond this list is over-privileged and fails the security review in Section 13.

| Permission | Level | Why |
|---|---|---|
| Repository administration | Write | Create the per-student private repository from the template |
| Contents | Write | Seed and heal repository content (workflows, issue templates) |
| Metadata | Read | Mandatory baseline for any App |
| Issues | Write | Seed the first challenge issue and provisioning status (optional; can defer to the Progression Bot) |

App configuration rules:

- Install the App only on the `Community-Access` organization, scoped to the template and student repositories.
- Store `PROVISIONING_APP_ID` and `PROVISIONING_APP_PRIVATE_KEY` in GitHub Secrets; never in code or public repos.
- Mint a short-lived installation token at the start of each provisioning run; never persist it.
- Document a private-key rotation procedure and rotate on any suspected exposure.

### 7.2b Provisioning algorithm (idempotent, serial)

Provisioning runs serially with a small delay and exponential backoff, not parallel fan-out, to stay clear of GitHub secondary (abuse) rate limits on content-creating requests. The algorithm is idempotent on `(github_handle, cohort_id)`, so a re-run resumes a half-finished batch instead of duplicating or corrupting work.

```text
for each roster entry where provision_state in (pending, failed):
    key = (github_handle, cohort_id)
    expected_repo = name_for(key)

    1. If expected_repo already exists:
         - Verify required workflow files and template SHA.
         - If complete: mark provisioned (or healed), log already-exists, continue.
         - If incomplete: re-seed missing files, mark healed, log healed.
       Else:
         - Create private repo from template at the pinned template SHA.
         - Log created.

    2. Grant the learner access (idempotent; skip if already granted).

    3. Seed required content if not already present
       (workflows, issue templates). Log seeded.

    4. Verify required workflow set is present (go-live gate list).
         - On success: provision_state = provisioned (or healed).
         - On failure: provision_state = failed, write error_detail,
           surface to watchdog. Do NOT leave a half-seeded repo silently.

    5. Wait a short delay (1 to a few seconds) before the next entry.
       On HTTP 403/429 (secondary limit), back off exponentially and retry
       the same entry; never skip it.
```

Invariants: at-most-one repository per key; pinned template SHA; learner has access; required workflows present; every outcome written to the provisioning log; any failure visible to a human before a learner notices.

### 7.3 Provisioning contract

- Input: roster entry (`github_handle`, `cohort_id`, `path`).
- Output: `learning_room_repo`, `provision_state`, provisioning log entry.
- Idempotency key: `(github_handle, cohort_id)`.
- Guarantees: at-most-one repository per key; correct template SHA; learner has access; required workflows present.
- Failure behavior: on any error, set `provision_state = failed`, write `error_detail`, and surface to the watchdog. Never leave a half-seeded repo silently.

### 7.4 Rate and scale considerations

For any realistic size of this workshop, documented hourly rate limits are a non-issue. The real risk is GitHub secondary (abuse) rate limits, which trigger on bursts of content-creating requests fired in parallel. The serial-with-delay-and-backoff algorithm in Section 7.2b avoids them, and idempotency means hitting a limit just means run it again, it heals.

**Design target: 1 to 100 learners.** That is what a high-touch, accessibility-first, facilitator-led workshop actually is. A cohort large enough to hit real rate limits would also be too large to run with the recover-every-stuck-learner quality bar that defines this project. The constraint that bites first is facilitator attention, not API quota.

This table is the planning guidance by cohort size.

| Cohort size | Reality | What to do |
|---|---|---|
| 1 to 30 (likely case) | Trivial; serial creation finishes in minutes | Serial loop, 1 to 2 second delay, backoff on error |
| 30 to 100 | Comfortable within an hour | Same pattern; rely on idempotent re-run to heal mid-batch failures |
| 100 to 300 | Approaching where bursting would trip secondary limits | Throttle to a steady rate, chunk the batch, resume via idempotency; the App ceiling helps |
| 300+ | Plan deliberately | Stagger provisioning over time windows, pre-flight seat and quota checks, monitor for 403s |

Two design choices make cohort size a permanent non-worry, and both are already specified:

- **Idempotent provisioning keyed on `(github_handle, cohort_id)`** (Section 7.2b). A re-run resumes a half-finished batch rather than duplicating or corrupting it.
- **Provision on registration, not big-bang.** Creating repositories as learners register (a trickle) rather than all at once on go-live morning (a burst) means you essentially never approach a burst limit regardless of total size.

Operational rules:

- Pre-flight check org seat and repository quotas before a cohort opens.
- Template sync and smoke validation (`Prepare-LearningRoomTemplate.ps1`, `Test-LearningRoomTemplate.ps1`) run before any provisioning.

## 8. Automation contracts

Each arrow in the architecture is a stable contract. Contracts are intentionally simple text and label signals so facilitators can test and recover them by hand.

| Contract | Producer | Consumer | Signal | Idempotent | Manual fallback |
|---|---|---|---|---|---|
| Enroll | Registration workflow | Roster | `enrolled` label, roster record | Yes | Apply label, add record |
| Acknowledge | Learner | Roster, dashboard | comment `ack` | Yes | Facilitator marks acked |
| Day 1 complete | Learner | Day 2 release | comment `day1-complete` or label | Yes | Facilitator posts Day 2 link |
| Day 2 release | Release workflow | Learner | comment with Day 2 link, `day2-released` label | Yes | Facilitator posts link |
| Next challenge | Progression bot | Learner | new `Challenge N+1` issue | Yes (per issue) | Dispatch with `start_challenge` |
| Autograde | Autograder | Learner | single pass/fail comment keyed by marker | Yes | Facilitator verifies and comments |
| Dashboard | Dashboard sync | Facilitator | upserted status issue | Yes | Read enrollment issues |
| Provision | Provisioning action | Roster, learner | repo created and seeded | Yes (per key) | Classroom invite during transition |

Contract invariants:

- Every bot comment is updated in place via a marker string, never duplicated.
- Every workflow that can fail posts a separate, blameless error notice on failure.
- Every signal is plain text or a label so it is human-testable and human-recoverable.

## 9. Curriculum subsystem

- 22 chapters ([docs/00-pre-workshop-setup.md](docs/00-pre-workshop-setup.md) through [docs/22-what-comes-next.md](docs/22-what-comes-next.md)) plus appendices A through Z and AA through AC.
- 16 core challenges and 5 bonus challenges, indexed in [docs/CHALLENGES.md](docs/CHALLENGES.md), each with instructions, evidence requirements, and a reference solution in [docs/solutions/](docs/solutions/).
- Each chapter is authored screen-reader-first: every step keyboard-accessible, every concept explained without sight, an "If You Get Stuck" section, and a Section-Level Source Map enforced by the authoritative-sources validator.
- The arc is one journey: browser, then github.dev, then desktop VS Code with Accessibility Agents. Every Day 1 skill maps to a Day 2 agent command.

Curriculum requirements:

- Source maps required on in-scope content; podcasts and non-content paths excluded (per repo memory and the validator).
- Every reference URL must resolve; broken links fail the content gate.
- Tools-change resilience: chapters teach exploration so learners survive UI drift.

## 10. Content pipeline: docs, HTML, EPUB, audio

The pipeline turns Markdown into every delivery format.

| Stage | Input | Output | Workflow or script |
|---|---|---|---|
| HTML build | `docs/*.md` | `html/` | build per [BUILD.md](BUILD.md) |
| EPUB build | `docs/*.md`, `epub/epub.css` | EPUB | [build-epub.yml](.github/workflows/build-epub.yml) |
| Diagrams | diagram sources | SVGs | [generate-diagram-svgs.yml](.github/workflows/generate-diagram-svgs.yml) |
| Pages deploy | HTML | published site | [deploy-pages.yml](.github/workflows/deploy-pages.yml) |
| Wiki sync | docs | wiki | [sync-docs-to-wiki.yml](.github/workflows/sync-docs-to-wiki.yml) |
| Audio series | transcripts | MP3, RSS | batch scripts, RSS feed builder |

Audio policy: minimize MP3 regeneration. Prefer transcript-only and site-only updates unless a podcast release is explicitly in scope. The catalog currently covers 54 companion episodes plus planned Challenge Coach episodes.

Pipeline requirements:

- HTML must build from current Markdown before any cohort opens.
- The RSS feed validates before publish.
- All generated HTML preserves heading structure, descriptive links, and table semantics.

## 11. Optional Flask companion

The companion is strictly optional and lives at the edges. It must add delight without becoming a dependency.

### 11.1 Scope

- Accessible registration landing page (writes to the owned roster).
- Facilitator cohort dashboard (reads owned roster and progress).
- Bulk facilitator operations (trigger provisioning, re-seed, recover) as thin wrappers over the owned provisioning action.

### 11.2 Hard constraints

- Stateless about anything critical. If the companion is down, the GitHub-native front door and admin-issue dashboard carry the full workshop.
- WCAG 2.2 AA: semantic landmarks, correct heading order, labeled controls, visible focus, live-region announcements, no keyboard traps.
- OWASP Top 10 reviewed: authenticated facilitator actions, CSRF protection, input validation, output encoding, least-privilege tokens, rate limiting, secrets never in client code.
- All writes go through the owned roster and provisioning contracts; the companion never invents a parallel state store of record.

### 11.3 Interfaces

- Reads and writes the roster of record (admin repo or its mirror).
- Invokes the provisioning action through its defined contract only.
- Renders progress derived from the same signals the GitHub-native dashboard uses.

## 12. Accessibility requirements

Accessibility is the product. These are acceptance-blocking.

- Every learner-facing surface verified on NVDA, JAWS, and VoiceOver, fully keyboard operable.
- All documentation readable with or without a screen reader; no information conveyed by color alone.
- Markdown follows the project accessibility rules: descriptive link text, alt text for meaningful images, correct heading hierarchy, table intro sentences, emoji removed or translated, diagrams given text alternatives, no em-dashes, validated anchors.
- Automation copy is screen-reader-first: front-loaded, clear, free of decorative noise.
- Any Flask companion meets WCAG 2.2 AA in full (Section 11.2).
- Testing follows the project accessibility testing guidance; manual screen reader passes are required, not just automated checks.

## 13. Security requirements

- Free of OWASP Top 10 vulnerabilities across any hosted surface and all automation.
- Least-privilege tokens and scopes; each token documented with the single capability it enables and a rotation procedure.
- Secrets only in GitHub Secrets or a managed secret store; never in code, public repos, or client bundles.
- Public registration redacts private intake; detailed data stored only in the private admin repo when configured.
- Provisioning permissions scoped to repository creation and seeding only.
- Workflows pin actions and follow GitHub Actions security hardening (limited permissions blocks, no untrusted input in run shells).
- Treat all tool and webhook input as untrusted; validate and encode. Watch for and report prompt-injection attempts in any AI-assisted automation.

## 14. Reliability, observability, and recovery

- **No silent failure.** Every automated step either succeeds or raises a human-visible alert with a clear recovery action.
- **Watchdog.** A scheduled workflow detects stalled provisioning, stuck progression, or learners without a healthy repository, and surfaces them before a learner notices. See [autograder-watchdog.yml](learning-room/.github/workflows/autograder-watchdog.yml).
- **Idempotent everything.** Provisioning, seeding, and bot comments are safe to re-run.
- **Tiered learner recovery.** Documented restore levels return a stuck learner to a known-good state with branch and PR evidence, no data loss (per the QA runbook).
- **Manual fallback for every contract** (Section 8), so the system survives any single automation outage.
- **Release gate.** No cohort opens until [GO-LIVE-QA-GUIDE.md](GO-LIVE-QA-GUIDE.md) passes; execution follows [admin/LEARNING-ROOM-E2E-QA-RUNBOOK.md](admin/LEARNING-ROOM-E2E-QA-RUNBOOK.md).

## 15. Testing and quality strategy

| Layer | What it covers | Where |
|---|---|---|
| Unit and automation tests | Scripts and helpers | `npm run test:automation`, [automation-tests.yml](.github/workflows/automation-tests.yml) |
| Content validation | Links, markdown, source maps, accessibility | content-validation and authoritative-sources workflows and `.github/scripts` checks |
| Template smoke | Template integrity before provisioning | `Prepare-LearningRoomTemplate.ps1`, `Test-LearningRoomTemplate.ps1` |
| Challenge reliability matrix | Happy, failure, and recovery path per challenge family | [classroom/HUMAN_TEST_MATRIX.md](classroom/HUMAN_TEST_MATRIX.md) |
| End-to-end QA | Registration through completion | [admin/LEARNING-ROOM-E2E-QA-RUNBOOK.md](admin/LEARNING-ROOM-E2E-QA-RUNBOOK.md) |
| Accessibility passes | NVDA, JAWS, VoiceOver, keyboard | Project accessibility testing guidance |
| Release gate | All of the above consolidated | [GO-LIVE-QA-GUIDE.md](GO-LIVE-QA-GUIDE.md) |

Quality rules:

- Every challenge has happy-path, failure-path, and recovery-path evidence before go-live.
- Provisioning is tested with at least one re-run to prove idempotency.
- Any companion ships only after an accessibility pass and an OWASP review.

## 16. Configuration surface

Variables:

- `CLASSROOM_DAY1_ASSIGNMENT_URL`, `CLASSROOM_DAY2_ASSIGNMENT_URL` (transitional; retired after Classroom removal).
- `PRIVATE_STUDENT_DATA_REPO`.
- `ENABLE_PUBLIC_CLASSROOM_INTAKE_EXPORT`, `ENABLE_PUBLIC_REGISTRATION_EXPORT`.
- New for owned provisioning: `LEARNING_ROOM_TEMPLATE_REPO`, `ADMIN_ROSTER_REPO`, `PROVISIONING_MODE` (`github-app` or `actions-bot`).

Secrets:

- `PRIVATE_STUDENT_DATA_TOKEN`, `INSTRUCTOR_DASHBOARD_TOKEN`.
- New for owned provisioning: `PROVISIONING_APP_ID` and `PROVISIONING_APP_PRIVATE_KEY` (App mode) or `PROVISIONING_TOKEN` (bot mode), least-privilege and rotatable.

## 17. Repository layout

| Path | Purpose |
|---|---|
| [docs/](docs/) | Curriculum chapters, appendices, challenges, solutions |
| [learning-room/](learning-room/) | Source of the per-student template: workflows, scripts, issue templates |
| [.github/workflows/](.github/workflows/) | Cohort-level automation and content pipeline |
| [classroom/](classroom/) | Deployment guide, assignments, test matrix, grading guide, teardown |
| [admin/](admin/) | Facilitator operations, QA runbooks, architecture, podcasts |
| [scripts/](scripts/) | Generation and classroom preparation scripts |
| [html/](html/), [epub/](epub/), [podcasts/](podcasts/) | Generated delivery formats |
| [golden.md](golden.md) | Vision and quality north star |
| [SPEC.md](SPEC.md) | This specification |
| [GO-LIVE-QA-GUIDE.md](GO-LIVE-QA-GUIDE.md) | Release gate |

## 18. Migration plan: from Classroom to owned provisioning

Aligned to the phased roadmap in [golden.md](golden.md).

1. **Phase 0, harden the present.** Pass the full go-live gate on the current Classroom flow.
2. **Phase 1, prove decoupling.** Implement the owned roster, owned progress derivation, and the idempotent provisioning action. Validate end to end with test accounts. Classroom remains primary.
3. **Phase 2, production provisioning.** Run a real test cohort on GitHub-native provisioning with Classroom kept as parallel fallback. Prove idempotency with a re-run.
4. **Phase 3, accessible front door.** Add the optional companion (or Pages form) under the full accessibility and security bar.
5. **Phase 4, retire Classroom.** After a clean full cohort, remove the hard Classroom dependency, retire `CLASSROOM_*` variables, and mark owned provisioning canonical.
6. **Phase 5, continuous delight.** Iterate on copy, recovery speed, audio companions, and accessibility.

No phase ships until the prior phase is golden. No phase weakens accessibility, reliability, or learner trust.

## 19. Acceptance criteria

The system is acceptable for a cohort when:

- The full learner journey completes end to end with provisioning that does not require GitHub Classroom (or with both paths proven during transition).
- Provisioning is idempotent; a re-run heals partial failures and never corrupts a repo.
- Roster, progress, and provisioning are owned and reconstructable without a third party.
- Every learner-facing surface passes NVDA, JAWS, and VoiceOver review and is fully keyboard operable.
- Any companion passes WCAG 2.2 AA and an OWASP Top 10 review with least-privilege, rotatable secrets.
- Every automation contract has a tested manual fallback.
- The watchdog surfaces stalled provisioning or progression before a learner notices.
- Zero broken learner-facing links or dead assignment URLs.
- Automation copy is warm, screen-reader-first, and frames failure as the next step.
- The go-live release gate passes.

## 20. Open questions

- GitHub App versus Actions bot for production provisioning: **Resolved.** Build a GitHub App for production; PAT path is a Phase 1 spike only (Section 7.2).
- Maximum cohort size for rate-limit and quota planning: **Resolved.** Design for 1 to 100 learners with serial, idempotent, provision-on-registration behavior (Section 7.4).
- Where does the companion (if built) get hosted, and what is its uptime expectation given it must be non-critical?
- Should the owned roster mirror live in the companion database, or stay solely in admin-repo records for a single source of truth?
- Which Challenge Coach audio episodes are in scope for the next release, given the minimize-regeneration policy?

---

This spec is a living contract. When provisioning moves off Classroom, when the companion ships, or when a challenge changes, update the relevant section and the acceptance criteria together. Measure every change against [golden.md](golden.md): more dependable, more accessible, more flexible, more error free, more delightful.

## Implementation status

The owned, GitHub-native core of the Hybrid plan is implemented and tested:

- Owned roster (section 6.1): [roster.js](.github/scripts/provisioning/roster.js), [roster.schema.json](roster.schema.json), example in [admin/examples/roster.example.json](admin/examples/roster.example.json).
- Owned progress derivation (section 6.2): [progress.js](.github/scripts/provisioning/progress.js).
- Idempotent provisioning subsystem (section 7): [provision-core.js](.github/scripts/provisioning/provision-core.js), [github-app-auth.js](.github/scripts/provisioning/github-app-auth.js), [github-client.js](.github/scripts/provisioning/github-client.js), [provision-cli.js](.github/scripts/provisioning/provision-cli.js), and the [provisioning workflow](.github/workflows/provision-learning-rooms.yml).
- Optional accessible Flask companion (section 11): [companion/](companion/).
- Operator guide: [admin/OWNED_PROVISIONING.md](admin/OWNED_PROVISIONING.md).
- Tests: `npm run test:provisioning` (Node) and `companion/tests` (Python).

## Authoritative Sources

Use these official references when you need the current source of truth for facts in this document.

- [GitHub Docs, home](https://docs.github.com/en)
- [Authenticating as a GitHub App installation](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-as-a-github-app-installation)
- [Generate a repository from a template (REST)](https://docs.github.com/en/rest/repos/repos#create-a-repository-using-a-template)
- [Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/)
- [OWASP Top Ten](https://owasp.org/www-project-top-ten/)

### Section-Level Source Map

Use this map to verify facts for each major section in this file.

- **Overview, Goals and non-goals, Personas, System architecture, Component catalog, Curriculum subsystem, Content pipeline, Repository layout:** [GitHub Docs, home](https://docs.github.com/en)
- **Data model, Provisioning subsystem, Automation contracts, Configuration surface, Migration plan, Acceptance criteria, Implementation status:** [Authenticating as a GitHub App installation](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-as-a-github-app-installation), [Generate a repository from a template (REST)](https://docs.github.com/en/rest/repos/repos#create-a-repository-using-a-template)
- **Optional Flask companion, Accessibility requirements:** [Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/)
- **Security requirements, Reliability and recovery, Testing and quality strategy:** [OWASP Top Ten](https://owasp.org/www-project-top-ten/), [GitHub Docs, home](https://docs.github.com/en)
