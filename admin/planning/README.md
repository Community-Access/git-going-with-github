# Planning Archive and Initiative Status

One consolidated index of the project's planning documents. Each initiative below has a status, a summary of what shipped, and a pointer to the full original document (preserved unedited in this folder). New planning documents belong here, not in the repository root.

## How to read this folder

- **Shipped** means the feature is live and the planning document is retained only as a historical record and decision log.
- **In flight** means the plan still has open work; the document remains the working checklist.
- Durable, current documentation always lives in the operational docs (SPEC.md, admin/ guides, .github/README.md), never in this archive.

## Initiative status

| Initiative | Status | Document |
| --- | --- | --- |
| Hybrid provisioning deployment | Shipped (July 2026) | [DEPLOYMENT_ASSESSMENT.md](DEPLOYMENT_ASSESSMENT.md) |
| Provisioning failure review and hardening | Shipped (July 2026) | [REVIEW-2026-07-02.md](REVIEW-2026-07-02.md) |
| Podcast site reorganization (content repo to lp.csedesigns.com) | In flight | [REORG-PLAN.md](REORG-PLAN.md) |
| Stage 3 cutover checklist for the reorganization | In flight (gated on REORG-PLAN) | [SHIP-CHECKLIST.md](SHIP-CHECKLIST.md) |
| Site information architecture (Stage 1.3) | Approved input to REORG-PLAN | [SITE-IA.md](SITE-IA.md) |
| Tooling inventory (Stage 1.4) | Complete input to REORG-PLAN | [TOOLING-INVENTORY.md](TOOLING-INVENTORY.md) |

## Shipped initiative summaries

### Hybrid provisioning (replaces GitHub Classroom)

Planned in DEPLOYMENT_ASSESSMENT.md (June 2, 2026), hardened after the July 2 incident review. Live since July 2026: the `provision-learning-rooms.yml` workflow runs `.github/scripts/provisioning/` (pure-orchestration core, injected GitHub client, serial with backoff, idempotent), creates each learner's private room from `learning-room-template`, invites the learner, and seeds Challenge 1. The algorithm is specified in SPEC.md section 7.2b. Key lesson encoded from the review: no READY claim without a green run ID; the smoke test is the gate.

### Provisioning failure review (July 2, 2026)

Root-caused the provisioning credential failures, added the health-check workflow and alerting, closed the registration-to-roster gap, and tolerated pending collaborator invitations. All action items in its sections 3, 4.1-4.4, and 6 were implemented; see the document for the incident narrative and lessons.

### Peer simulation seeding (July 4, 2026, no standalone plan document)

The Classroom removal deleted `Seed-PeerSimulation.ps1` without a replacement, leaving every learning room without the peer-simulation issue and PR that Challenges 1-13 reference (support issue 58). The Student Progression Bot now seeds and self-repairs those artifacts automatically (PR 238), Challenges 10-11 were repointed at the learner's own room (PR 239), and all active rooms were remediated in place.

## Removed in the July 2026 cleanup

- `datetime` (empty stray file at the root)
- `GitHub Learning Room.docx` (February draft, superseded by docs/)
- `COMING_SOON.md` (pre-launch teaser, workshop is live)
- `github/index.html` (redirect stub never served; GitHub Pages deploys only the `html/` artifact)

## Authoritative Sources

Use these official references when you need the current source of truth for facts in this file.

- [GitHub Actions documentation](https://docs.github.com/en/actions) - workflow behavior referenced by the shipped initiatives
- [GitHub Pages documentation](https://docs.github.com/en/pages) - deployment model that made the root redirect stub dead weight
- [GitHub REST API documentation](https://docs.github.com/en/rest) - provisioning and seeding API calls

### Section-Level Source Map

Use this map to verify facts for each major section in this file.

- **Initiative status:** the linked planning documents in this folder
- **Hybrid provisioning:** [SPEC.md](../../SPEC.md) section 7.2b, [DEPLOYMENT_ASSESSMENT.md](DEPLOYMENT_ASSESSMENT.md)
- **Provisioning failure review:** [REVIEW-2026-07-02.md](REVIEW-2026-07-02.md)
- **Peer simulation seeding:** [.github/scripts/challenge-progression.js in learning-room/](../../learning-room/.github/scripts/challenge-progression.js), PRs 238 and 239
- **Removed in cleanup:** git history (commit for this change)
