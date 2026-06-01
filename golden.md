# golden.md

The north star for GIT Going with GitHub (GLOW). This document defines what "golden" means for this project, names the single biggest risk to its future, and lays out a bold, dependable, accessible path to get there. It is a vision document and a decision record. When a choice is hard, return here.

> One sentence: Every blind and low vision learner who starts this workshop should reach a real, merged open source contribution through an experience so reliable, so accessible, and so quietly delightful that the technology disappears and only their growing confidence remains.

## Table of contents

- [What golden means](#what-golden-means)
- [The existential risk: GitHub Classroom is going away](#the-existential-risk-github-classroom-is-going-away)
- [Design principles that never bend](#design-principles-that-never-bend)
- [Architecture options for life after Classroom](#architecture-options-for-life-after-classroom)
- [The recommended path: GitHub-native core, Flask companion at the edges](#the-recommended-path-github-native-core-flask-companion-at-the-edges)
- [The decoupling contract: own your state](#the-decoupling-contract-own-your-state)
- [The five quality pillars](#the-five-quality-pillars)
- [Failure modes and graceful recovery](#failure-modes-and-graceful-recovery)
- [Phased roadmap](#phased-roadmap)
- [Definition of golden: the release gate](#definition-of-golden-the-release-gate)
- [Guardrails and non-negotiables](#guardrails-and-non-negotiables)

## What golden means

Golden is not "feature complete." Golden is a standard of care. A golden release of this workshop is:

- **Dependable.** A facilitator can open a cohort and trust that every link resolves, every workflow fires, every challenge can be completed, failed, and recovered. No surprises on go-live day.
- **Accessible by construction.** Not retrofitted. Every artifact, every automation message, every fallback page is authored to be read with or without a screen reader, navigated by keyboard alone, and understood without sight. Accessibility is the product, not a checkbox.
- **Flexible.** The learning experience survives a vendor sunset, an API change, a renamed button, or a student who arrives with a different tool than expected. The curriculum already teaches "tools change, exploration is the skill." The infrastructure must live that value too.
- **Error free where it counts.** Zero broken learner-facing paths. Automation either succeeds, or fails loudly to a human with a clear recovery action. Silent failure is the only unacceptable outcome.
- **Magical and delightful.** The small things: a welcome that uses the learner's name, a validation bot that congratulates instead of scolds, a recovery path that feels like a safety net rather than a punishment, an audio companion when screen reader fatigue sets in. Delight is the sum of a hundred respected details.

If a change does not move the project toward all five at once, question it.

## The existential risk: GitHub Classroom is going away

The entire Learning Room model currently assumes GitHub Classroom exists. Today the flow is: a student accepts a Classroom assignment link, Classroom clones a template repository into a private student repository, and a chain of GitHub Actions drives registration, Day 2 release, autograding, progression, and the instructor dashboard. See [admin/GITHUB_CLASSROOM_ARCHITECTURE.md](admin/GITHUB_CLASSROOM_ARCHITECTURE.md) for the current production design.

This is a single point of failure. If GitHub Classroom is deprecated, removed, or changes its assignment model, the workshop's onboarding spine breaks. The good news: most of the value does not actually live in Classroom. Classroom does exactly two things for us:

1. **Provisioning.** It copies a template repository into a per-student private repository and grants access.
2. **Roster mapping.** It associates a GitHub identity with a roster entry.

Everything else that makes this workshop work already lives in places we control: the curriculum in [docs/](docs/), the automation in the Learning Room workflows ([learning-room/.github/workflows/](learning-room/.github/workflows/)), the autograders, the progression bot, the registration flow, and the support hub. Classroom is a thin provisioning layer, not the brain.

The golden response is therefore not panic. It is **deliberate decoupling**: replace the two things Classroom does for us with infrastructure we own, keep everything else exactly where it is, and lose nothing the learner depends on.

## Design principles that never bend

These are the constitution. Every architectural choice below is measured against them.

1. **Accessibility is non-negotiable.** Any replacement for Classroom must be fully operable with NVDA, JAWS, and VoiceOver, by keyboard alone. A provisioning UI that a blind learner cannot use is not a candidate, no matter how convenient it is for facilitators.
2. **Prefer infrastructure the learner already trusts.** GitHub itself is the safest home. A learner who can navigate github.com can already operate most of our flow. New surfaces add new accessibility risk and new failure modes.
3. **Own your state.** Never again let a single vendor feature hold the cohort hostage. Roster, progress, and provisioning state must be reconstructable from data we control.
4. **Degrade gracefully, never silently.** Every automated step has a documented manual fallback that a facilitator can run by hand. The automation is an accelerator, not a dependency.
5. **One arc, many tools.** The curriculum is one journey from browser to github.dev to VS Code. The infrastructure must not fracture that arc, regardless of which provisioning method is in play.

## Architecture options for life after Classroom

Three credible paths exist. Each is evaluated against the principles above.

### Option A: GitHub-native provisioning (no Classroom)

Replace Classroom's provisioning with a GitHub App or an Actions-driven bot that, on registration, creates a private repository from the existing template and invites the student. The roster lives in a private admin repository (as the instructor dashboard already does). Everything downstream stays identical because student repositories look exactly the same as they do today.

Strengths: stays entirely inside GitHub, the surface learners already navigate accessibly. Reuses the existing template, autograders, progression bot, and dashboard sync with near-zero change. Lowest accessibility risk. Lowest new-failure-mode risk.

Weaknesses: requires a GitHub App or a bot token with repository-creation scope and careful permission hygiene. Repository creation rate limits and org seat limits need planning for large cohorts.

### Option B: Flask companion application

A small Flask service handles registration, roster, provisioning orchestration (calling the GitHub API to create student repositories), Day 2 release, and a facilitator dashboard. The learner-facing curriculum still lives in GitHub repositories.

Strengths: full control over registration UX, dashboards, and cohort logic. Can present a single accessible front door. Can store richer state and analytics than issue comments allow.

Weaknesses: a new hosted service to secure, deploy, monitor, and make accessible. New attack surface (OWASP Top 10 applies in full: auth, secrets, injection, CSRF, rate limiting). A self-hosted dependency that can go down on go-live day. Higher accessibility testing burden because we now own HTML, focus order, and live regions ourselves.

### Option C: Hybrid (recommended)

GitHub-native provisioning and automation form the dependable core. A thin, optional Flask companion sits at the edges only where GitHub genuinely cannot deliver a good experience: a polished accessible registration landing page, a facilitator cohort dashboard, and bulk operations. The companion is stateless about anything critical: if it disappears, the GitHub-native core still completes the full learner journey.

This is the golden choice. It honors "prefer infrastructure the learner already trusts" for the critical path, while allowing a delightful, fully accessible front door where it adds real value, and it never makes the learner's success depend on a service we have to keep alive.

## The recommended path: GitHub-native core, Flask companion at the edges

The plain-language architecture, in order of how a learner experiences it:

1. **Front door (optional Flask companion or a GitHub Pages form).** An accessible registration page collects the learner's GitHub handle and preferences. If the Flask companion is unavailable, the existing issue-form registration in the repository is the fallback front door and loses nothing essential.
2. **Provisioning (GitHub-native).** A GitHub App or Actions bot creates the private Learning Room repository from the template, replacing what Classroom did. The roster entry is written to the private admin repository. This is the only piece that truly changes when Classroom departs.
3. **The Learning Room (unchanged).** Same private student repository, same seeded challenge issues, same autograders, same progression bot, same PR validation. Because the repository shape is identical, the entire downstream automation in [learning-room/.github/workflows/](learning-room/.github/workflows/) keeps working.
4. **Progression and release (GitHub-native).** Day 2 release, autograder pass/fail comments, and the next-challenge progression all continue to run on the deterministic text signals already documented (`ack`, `day1-complete`). These are intentionally simple so a facilitator can test and recover them by hand.
5. **Facilitator visibility (Flask companion or private admin issues).** The instructor dashboard already syncs to private admin repository issues. The Flask companion, when present, reads the same roster and renders a richer accessible dashboard. When absent, the admin issues are the dashboard.

The principle holding this together: **the critical path runs on GitHub; the companion only ever makes a good thing nicer, never makes a working thing necessary.**

### What changes and what does not

This table summarizes the migration impact so the scope is honest and small.

| Capability | Today (Classroom) | Golden (post-Classroom) | Change size |
|---|---|---|---|
| Provisioning student repos | Classroom clones template | GitHub App or Actions bot clones template | New, contained |
| Roster identity mapping | Classroom roster | Private admin repository roster record | Small |
| Registration intake | Issue form plus Classroom link | Accessible front door plus same issue-form fallback | Small |
| Challenge seeding | Template issues | Unchanged template issues | None |
| Autograding | Autograder workflows | Unchanged autograder workflows | None |
| Progression bot | Progression workflow | Unchanged progression workflow | None |
| Day 2 release | `day2-release.yml` signals | Unchanged signal logic | None |
| Instructor dashboard | Dashboard sync to admin repo | Same sync, optional richer companion view | None to small |

The lesson of this table is the whole strategy: by owning the template and the automation already, the project has quietly insulated itself from Classroom. The migration is a provisioning swap, not a rewrite.

## The decoupling contract: own your state

To make a vendor sunset a non-event forever, the project commits to three owned sources of truth:

- **Roster of record.** A single canonical roster (in the private admin repository, optionally mirrored by the companion) that maps GitHub handle to cohort, day, and status. Reconstructable without any third party.
- **Progress of record.** Challenge status derived from signals the project controls (issue and PR state, labels, the deterministic text signals). Never read progress from a vendor that could remove the API.
- **Provisioning of record.** A repeatable, idempotent provisioning action that, given a roster entry, guarantees a correctly seeded student repository. Running it twice is safe. Running it after a partial failure heals the state.

If all three are owned and reconstructable, no future vendor change can strand a cohort. That is what flexibility means in practice.

## The five quality pillars

### Pillar 1: Accessibility you can feel

- Every learner-facing surface passes screen reader review on NVDA, JAWS, and VoiceOver and is fully keyboard operable.
- If a Flask companion ships, it meets WCAG 2.2 AA: semantic landmarks, correct heading order, labeled form controls, visible focus, live-region announcements for dynamic updates, and no keyboard traps. The project's own accessibility agents and guides are the in-house review team for it.
- Automation messages (bot comments, validation feedback) are written for a screen reader ear: clear, front-loaded, no decorative noise.

### Pillar 2: Reliability you can trust

- The critical learner path has no single vendor point of failure after the Classroom swap.
- Every automated workflow has a documented manual fallback in the facilitator runbook ([admin/LEARNING-ROOM-E2E-QA-RUNBOOK.md](admin/LEARNING-ROOM-E2E-QA-RUNBOOK.md)).
- Provisioning is idempotent and self-healing. Re-running never corrupts a student repository.
- The go-live release gate ([GO-LIVE-QA-GUIDE.md](GO-LIVE-QA-GUIDE.md)) must pass before any cohort opens.

### Pillar 3: Flexibility that outlasts vendors

- State is owned and reconstructable (the decoupling contract above).
- The provisioning method is swappable behind a stable internal contract, so the next vendor change is a localized edit, not a crisis.
- The curriculum keeps teaching exploration as a skill, so learners are resilient to UI drift even when our docs lag reality.

### Pillar 4: Error-free learner paths

- Zero broken links, zero dead assignment URLs, zero orphaned challenges in a shipped cohort.
- Automation fails loud, not silent: a watchdog detects stalled provisioning or stuck progression and raises a human-visible alert.
- Security is part of correctness: any Flask companion is reviewed against the OWASP Top 10, secrets never live in client code or public repos, tokens are least-privilege and rotatable.

### Pillar 5: Delight in the details

- The welcome uses the learner's name and affirms belonging from the first message.
- The validation bot celebrates progress and frames failures as the next step, never as a verdict.
- Recovery feels like a safety net: a learner who breaks something is guided back without shame.
- Audio companions exist for every chapter so a tired learner can switch modes. Honor the existing preference to update transcripts and the site without regenerating audio unless a podcast release is explicitly in scope.

## Failure modes and graceful recovery

Golden software assumes things break and plans the catch. For each likely failure, there is a defined, accessible recovery.

- **Provisioning fails for one student.** The idempotent provisioning action is re-run for that roster entry. The watchdog flags any student without a healthy repository before Day 1 begins.
- **The companion service is down on go-live day.** The GitHub-native front door and core path carry the entire workshop. The companion's absence is invisible to learners.
- **A GitHub UI label or button moves.** The curriculum's exploration skills cover the learner in the moment; a curriculum issue is filed so the docs catch up for everyone.
- **A token expires or is revoked.** Least-privilege tokens are documented and rotatable; the runbook lists exactly which capability each token enables so recovery is fast and scoped.
- **A learner falls behind or breaks their repository.** Tiered recovery (already part of the QA runbook) restores them to a known-good state with branch and PR evidence, no data loss.

The rule: a learner should never be the one who discovers a failure. The watchdog and the facilitator find it first.

## Phased roadmap

A bold vision delivered in safe increments.

1. **Phase 0: Harden the present.** Pass the full go-live gate on the current Classroom-based flow. You cannot migrate cleanly from an unstable base.
2. **Phase 1: Prove the decoupling contract.** Stand up the owned roster, owned progress, and an idempotent provisioning action that creates a student repository from the template without Classroom. Validate with test accounts end to end.
3. **Phase 2: GitHub-native provisioning in production.** Make the GitHub-native path the default for a real test cohort. Keep Classroom available as a parallel fallback during transition.
4. **Phase 3: Accessible front door and facilitator dashboard.** Add the optional Flask companion (or GitHub Pages form) only after the core path is proven. Subject it to the same accessibility and security bar as the curriculum itself.
5. **Phase 4: Retire the Classroom dependency.** Once the GitHub-native path has run a full cohort cleanly, remove the hard dependency on Classroom and document the new architecture as canonical.
6. **Phase 5: Continuous delight.** Iterate on the hundred small details: warmer automation copy, faster recovery, richer audio companions, sharper accessibility.

Each phase ships only when the previous phase is golden. No phase weakens accessibility, reliability, or learner trust to move faster.

## Definition of golden: the release gate

A cohort is golden only when all of the following hold. This complements, and does not replace, the detailed [GO-LIVE-QA-GUIDE.md](GO-LIVE-QA-GUIDE.md).

- The critical learner path completes end to end with no GitHub Classroom dependency, or with Classroom and the GitHub-native path both proven.
- Provisioning is idempotent and re-running it heals partial failures.
- Owned roster, owned progress, and owned provisioning are all reconstructable without a third party.
- Every learner-facing surface passes NVDA, JAWS, and VoiceOver review and is fully keyboard operable.
- Any Flask companion passes WCAG 2.2 AA and an OWASP Top 10 security review, with least-privilege, rotatable secrets.
- Every automated workflow has a tested manual fallback in the runbook.
- A watchdog surfaces stalled provisioning or progression to a human before a learner notices.
- Zero broken learner-facing links or dead assignment URLs in the shipped cohort.
- Automation copy is warm, screen-reader-first, and frames failure as the next step.

## Guardrails and non-negotiables

- **Never trade accessibility for convenience.** A faster facilitator tool that a blind learner cannot use is not shipped.
- **Never let a vendor own the critical path again.** Provisioning, roster, and progress stay owned and reconstructable.
- **Never fail silently.** Loud, human-visible failure with a clear recovery action, every time.
- **Never make delight an afterthought.** The warm welcome, the kind validation message, the safety-net recovery: these are requirements, not polish.
- **Keep the GLOW name and branding** unless explicitly asked to change it.
- **Minimize audio regeneration.** Prefer transcript and site-only updates unless a podcast release is explicitly in scope.

---

Golden is a direction, not a destination. Measure every pull request, every workflow, every word of bot copy against this question: does it make the journey more dependable, more accessible, more flexible, more error free, and more delightful for the learner who needs it most? If yes, ship it. If no, return here and try again.

## Authoritative Sources

Use these official references when you need the current source of truth for facts in this document.

- [GitHub Docs, home](https://docs.github.com/en)
- [About GitHub Classroom](https://docs.github.com/en/education/manage-coursework-with-github-classroom/teach-with-github-classroom/about-github-classroom)
- [Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/)

### Section-Level Source Map

Use this map to verify facts for each major section in this file.

- **What golden means, Design principles, The five quality pillars, Guardrails:** [GitHub Docs, home](https://docs.github.com/en), [Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/)
- **The existential risk, Architecture options, The recommended path, The decoupling contract, Failure modes, Phased roadmap, Definition of golden:** [About GitHub Classroom](https://docs.github.com/en/education/manage-coursework-with-github-classroom/teach-with-github-classroom/about-github-classroom), [GitHub Docs, home](https://docs.github.com/en)
