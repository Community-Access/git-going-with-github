# Owned, GitHub-native Provisioning

This is the operator guide for the GitHub-native provisioning subsystem: the owned
replacement for GitHub Classroom described in [golden.md](../golden.md) and specified
in [SPEC.md](../SPEC.md) sections 6 and 7. It explains the data model, how to run
provisioning, how to recover from failure, and how the optional Flask companion fits
in at the edges. For first-time setup and deployment, follow the
[Hybrid Deployment Guide](HYBRID_DEPLOYMENT_GUIDE.md) first. To review the whole
deliverable from one place, see [HYBRID_REVIEW_INDEX.md](HYBRID_REVIEW_INDEX.md).

The whole point of this subsystem is captured in one promise: a vendor sunset is a
non-event. Provisioning, roster, and progress are owned and reconstructable, so no
future change to GitHub Classroom can strand a cohort.

## Table of contents

- [Why this exists](#why-this-exists)
- [The three owned sources of truth](#the-three-owned-sources-of-truth)
- [How provisioning works](#how-provisioning-works)
- [One-time setup](#one-time-setup)
- [Running a cohort](#running-a-cohort)
- [Idempotency and self-healing](#idempotency-and-self-healing)
- [Failure modes and recovery](#failure-modes-and-recovery)
- [The optional Flask companion](#the-optional-flask-companion)
- [Security and least privilege](#security-and-least-privilege)
- [Local development and testing](#local-development-and-testing)
- [Authoritative Sources](#authoritative-sources)

## Why this exists

GitHub Classroom does only two things for this workshop: it copies a template
repository into a per-student private repository, and it maps a GitHub identity to a
roster entry. Everything else already lives in infrastructure the project controls.
This subsystem replaces those two things with code we own, so the critical learner
path no longer depends on a single vendor feature.

## The three owned sources of truth

The decoupling contract requires three owned, reconstructable records. See SPEC.md
section 6 for the full schemas.

1. **Roster of record.** One canonical JSON document mapping each learner handle to
   cohort, path, provisioning state, and progression status. Lives in the private
   admin repository as `roster.json`. Schema and validation live in
   [roster.js](../.github/scripts/provisioning/roster.js) and
   [roster.schema.json](../roster.schema.json). An example is in
   [examples/roster.example.json](examples/roster.example.json).
2. **Progress of record.** Never authored by a vendor. Derived from deterministic
   signals the project controls (challenge issue state, PR closing keywords, labels,
   and the plain-text signals `ack` and `day1-complete`) by
   [progress.js](../.github/scripts/provisioning/progress.js).
3. **Provisioning of record.** An append-only log of provisioning attempts and
   outcomes (`provisioning-log.json`), sufficient to prove a repository is correctly
   seeded and to safely re-run.

Reconstruction rule: running the idempotent provisioning action against the roster
reproduces a healthy state for every learner, with no third party involved.

## How provisioning works

The provisioning subsystem is plain Node with no third-party dependencies (it uses
built-in `crypto` and global `fetch`). The pieces are:

| File | Role |
|---|---|
| [roster.js](../.github/scripts/provisioning/roster.js) | Owned roster: parse, validate, upsert, serialize, redact |
| [progress.js](../.github/scripts/provisioning/progress.js) | Derive learner status from deterministic signals |
| [github-app-auth.js](../.github/scripts/provisioning/github-app-auth.js) | Sign an App JWT and mint a short-lived installation token |
| [github-client.js](../.github/scripts/provisioning/github-client.js) | Minimal GitHub REST client (fetch or Octokit) |
| [provision-core.js](../.github/scripts/provisioning/provision-core.js) | The idempotent, serial, backoff provisioning algorithm |
| [provision-cli.js](../.github/scripts/provisioning/provision-cli.js) | Standalone runner used by the workflow |
| [provision-learning-rooms.yml](../.github/workflows/provision-learning-rooms.yml) | Scheduled and manual workflow wrapper |

The algorithm (SPEC.md section 7.2b) runs serially with a short delay and exponential
backoff, not a parallel fan-out, to stay clear of GitHub secondary rate limits. For
each pending or failed learner it: checks whether the repository exists; creates it
from the template if not; ensures the learner is a collaborator; verifies the required
workflow set is present; and records the outcome. Every step is safe to repeat.

## One-time setup

Provisioning supports two modes via the `PROVISIONING_MODE` variable.

### Production: GitHub App (`github-app`)

A GitHub App is the production identity because it is not tied to a human account,
mints short-lived tokens, and uses fine-grained least-privilege permissions.

1. Create a GitHub App in the `Community-Access` organization with only these
   permissions: Repository administration (write), Contents (write), Metadata (read),
   and optionally Issues (write). Nothing more.
2. Install the App on the organization. Creating student repositories requires an
   organization-wide installation (repository creation cannot be granted through a
   selected-repositories installation). Do not skip this step: an App that exists but
   is not installed fails every token mint with HTTP 404.
3. Generate a private key (PEM). Store these as repository or environment secrets:
   - `PROVISIONING_APP_ID`
   - `PROVISIONING_APP_PRIVATE_KEY` (the PEM contents)
   - `PROVISIONING_APP_INSTALLATION_ID` (optional; when unset, provisioning discovers
     the installation from the App itself, which also survives re-installation)
4. Set repository variables:
   - `PROVISIONING_MODE` = `github-app`
   - `LEARNING_ROOM_TEMPLATE_REPO` = `Community-Access/learning-room-template`
   - `PROVISIONING_STUDENT_OWNER` = `Community-Access`
   - `ADMIN_ROSTER_REPO` = the private admin repository holding `roster.json`
   - `PROVISIONING_COHORT_ID` = the cohort that new enrollees are added to
5. Provide `PRIVATE_STUDENT_DATA_TOKEN`, a token that can check out and push to the
   admin roster repository.
6. Verify credentials before relying on the schedule: run the
   **Provisioning Credentials Health Check** workflow (or
   `node .github/scripts/provisioning/provision-cli.js --check-auth` locally). It mints
   a token and confirms the template repository is reachable, without making changes.
   The same check runs weekly and opens a `provisioning-alert` issue on failure.

### Phase 1 spike only: Actions bot (`actions-bot`)

For an early validation spike you may use a least-privilege fine-grained PAT in
`PROVISIONING_TOKEN` with `PROVISIONING_MODE` = `actions-bot`. Because the downstream
system cannot tell which mode created a repository, spiking with a PAT and graduating
to the App loses nothing. Do not use the PAT path for a real cohort: a PAT is bound to
a person and is a single point of failure.

## Running a cohort

Provisioning is designed to run as a trickle, on registration, rather than as a
big-bang on go-live morning. The registration workflow dispatches provisioning the
moment an enrollment lands, a healing sweep runs on a schedule a few times per day,
and you can also run it on demand. Each run first syncs open `[ENROLL-INTAKE]` issues
from the admin repository into `roster.json` (idempotently, into the cohort named by
`PROVISIONING_COHORT_ID`), so enrollments flow to provisioning with no manual roster
edits. Any failure opens or updates a `provisioning-alert` issue in this repository,
which closes automatically on the next successful run.

- **Dry run (no changes).** In the Actions tab, run *Provision Learning Rooms* with
  the `dry_run` input checked. It lists who would be provisioned.
- **Provision.** Run the same workflow with `dry_run` unchecked. It provisions every
  pending or failed learner, commits the updated `roster.json` and
  `provisioning-log.json` back to the admin repository, and prints a summary.
- **Local run.** From a checkout of the admin repo:

  ```bash
  LEARNING_ROOM_TEMPLATE_REPO=Community-Access/learning-room-template \
  PROVISIONING_STUDENT_OWNER=Community-Access \
  PROVISIONING_MODE=actions-bot PROVISIONING_TOKEN=*** \
  node .github/scripts/provisioning/provision-cli.js \
    --roster roster.json --log provisioning-log.json
  ```

  Add `--dry-run` to preview without making changes.

## Idempotency and self-healing

The provisioning action is idempotent on `(github_handle, cohort_id)`:

- Running it twice is safe. An existing, complete repository is recorded as
  `already-exists` and left untouched.
- A re-run resumes a half-finished batch instead of duplicating work.
- If a repository exists but is missing required workflows, the run heals it (when a
  content-seeding capability is available) or fails loudly so the watchdog and the
  facilitator see it before a learner does.

Always prove idempotency before go-live by running provisioning twice and confirming
the second run reports `already-exists` for healthy learners and makes no changes.

## Failure modes and recovery

| Symptom | What it means | Recovery |
|---|---|---|
| One learner is `failed` in the roster | Repo creation or verification failed for that entry | Fix the cause (seat, permission, name clash), then re-run provisioning. Only pending/failed entries are retried. |
| `provisioning-log.json` shows `error` with a rate-limit detail | Secondary rate limit during a burst | Re-run. The algorithm already backs off; idempotency means a re-run heals. |
| Repo exists but missing workflows | Partial seed | Re-run; the verify gate re-checks and heals or flags. |
| App token mint fails | Bad App ID, key, or installation ID | Re-check the three App secrets; rotate the private key if exposure is suspected. |

No learner should ever be the first to discover a failure. The watchdog and the
facilitator find it first.

## The optional Flask companion

The companion in [../companion/](../companion/) is strictly optional and lives at the
edges. It renders the owned roster more nicely (an accessible registration front door
and a facilitator dashboard) but never holds state the learner depends on. If it is
down, the GitHub-native issue-form front door and the admin-issue dashboard carry the
entire workshop. See [../companion/README.md](../companion/README.md).

## Security and least privilege

- Grant only the four App permissions listed above. Anything more fails the security
  review in SPEC.md section 13.
- Store the App ID, installation ID, and private key only in GitHub Secrets. Never in
  code, never in a public repository.
- Mint the installation token at the start of each run and never persist it.
- Document and rehearse private-key rotation; rotate on any suspected exposure.
- The companion authenticates facilitator actions, protects forms with per-session
  CSRF tokens, validates and encodes all input, and sets strict security headers.

## Local development and testing

```bash
# Provisioning subsystem (Node, no install needed)
npm run test:provisioning

# Flask companion (Python)
cd companion
python -m venv .venv && .venv/bin/pip install -r requirements.txt
.venv/bin/python -m unittest discover -s tests
```

## Authoritative Sources

Use these official references when you need the current source of truth for facts in
this document.

- [Authenticating as a GitHub App installation](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-as-a-github-app-installation)
- [Generate a repository from a template (REST)](https://docs.github.com/en/rest/repos/repos#create-a-repository-using-a-template)
- [Rate limits for the REST API](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api)
- [Choosing permissions for a GitHub App](https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/choosing-permissions-for-a-github-app)

### Section-Level Source Map

Use this map to verify facts for each major section in this file.

- **Why this exists, The three owned sources of truth:** [golden.md](../golden.md), [SPEC.md](../SPEC.md)
- **How provisioning works, Idempotency and self-healing:** [Generate a repository from a template (REST)](https://docs.github.com/en/rest/repos/repos#create-a-repository-using-a-template), [Rate limits for the REST API](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api)
- **One-time setup, Security and least privilege:** [Authenticating as a GitHub App installation](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-as-a-github-app-installation), [Choosing permissions for a GitHub App](https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/choosing-permissions-for-a-github-app)
- **Running a cohort, Failure modes and recovery, The optional Flask companion, Local development and testing:** [SPEC.md](../SPEC.md), [golden.md](../golden.md)
