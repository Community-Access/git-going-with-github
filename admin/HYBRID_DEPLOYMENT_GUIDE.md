# Hybrid Deployment Guide

This is the step-by-step guide to deploying the Hybrid architecture from
[golden.md](../golden.md) and [SPEC.md](../SPEC.md): the owned, GitHub-native
provisioning core that replaces GitHub Classroom, plus the optional accessible Flask
companion. For the conceptual model and day-to-day operations, see
[OWNED_PROVISIONING.md](OWNED_PROVISIONING.md). For the legacy Classroom-based flow,
see [../classroom/README.md](../classroom/README.md). To review every piece of the
Hybrid deliverable from one place, start at [HYBRID_REVIEW_INDEX.md](HYBRID_REVIEW_INDEX.md).

Follow the phases in order. Each phase ends with a verification step. Do not advance
until the current phase verifies, exactly as the phased roadmap in golden.md requires.

## Table of contents

- [What you are deploying](#what-you-are-deploying)
- [Prerequisites](#prerequisites)
- [Phase 1: Prepare the admin roster repository](#phase-1-prepare-the-admin-roster-repository)
- [Phase 2: Create the provisioning GitHub App](#phase-2-create-the-provisioning-github-app)
- [Phase 3: Configure variables and secrets](#phase-3-configure-variables-and-secrets)
- [Phase 4: Deploy and smoke-test provisioning](#phase-4-deploy-and-smoke-test-provisioning)
- [Phase 5: Deploy the optional companion](#phase-5-deploy-the-optional-companion)
- [Phase 6: Go-live checklist](#phase-6-go-live-checklist)
- [Operating a cohort](#operating-a-cohort)
- [Rollback and fallback](#rollback-and-fallback)
- [Reference: configuration surface](#reference-configuration-surface)
- [Authoritative Sources](#authoritative-sources)

## What you are deploying

| Piece | Where it runs | Required? |
|---|---|---|
| Provisioning scripts | This repository, `.github/scripts/provisioning/` | Yes |
| Provisioning workflow | GitHub Actions in this repository | Yes |
| Roster of record (`roster.json`) | A private admin repository | Yes |
| Provisioning identity | A GitHub App in the `Community-Access` org | Yes (production) |
| Learning Room template | `Community-Access/learning-room-template` | Yes (already exists) |
| Flask companion | A small host you control (or none) | No, optional |

The critical path is the first five rows. The companion is a convenience at the edges
and can be skipped entirely; the issue-form front door and admin-issue dashboard carry
the workshop without it.

## Prerequisites

- Owner or admin access to the `Community-Access` GitHub organization.
- The Learning Room template repository exists and passes template validation
  (`scripts/classroom/Test-LearningRoomTemplate.ps1`).
- A private admin repository you control, to hold the roster and provisioning log.
- Node.js 20 or newer for local runs and tests.
- Python 3.12 or newer if you deploy the companion.
- The `gh` CLI authenticated, for the convenience commands below.

Confirm your toolchain:

```bash
node --version      # v20+
python --version    # 3.12+
gh auth status
```

## Phase 1: Prepare the admin roster repository

The roster of record lives in a private repository so intake data is never public.

1. Create (or choose) a private repository, for example `Community-Access/glow-admin`.
2. Add a starter roster at its root. Copy the shape from
   [examples/roster.example.json](examples/roster.example.json), or start empty:

   ```json
   { "version": 1, "cohorts": [], "learners": [] }
   ```

3. Commit it as `roster.json`. The provisioning run will also create and maintain
   `provisioning-log.json` next to it.

Verification: the file validates locally.

```bash
node -e "require('./.github/scripts/provisioning/roster').parseRoster(require('fs').readFileSync('roster.json','utf8')); console.log('roster ok')"
```

## Phase 2: Create the provisioning GitHub App

A GitHub App is the production identity because it is not tied to a human account,
mints short-lived tokens, and uses fine-grained least-privilege permissions
(SPEC.md section 7.2). Create it once.

1. In the organization, go to Settings, Developer settings, GitHub Apps, New GitHub App.
2. Name it (for example `GLOW Provisioning`). Set a homepage URL (the repo is fine).
3. Disable the webhook (this App is called by Actions, not by webhooks).
4. Grant only these repository permissions, nothing more:
   - Administration: Read and write (create student repositories).
   - Contents: Read and write (seed and heal repository content).
   - Metadata: Read-only (mandatory baseline).
   - Issues: Read and write (optional; only if the App seeds the first issue).
5. Create the App, then note the numeric App ID.
6. Generate a private key; a `.pem` file downloads. Keep it secret.
7. Install the App on the `Community-Access` organization with **All repositories**
   access. Creating new student repositories requires an organization-wide
   installation; a selected-repositories installation cannot create repos. This step
   is mandatory: an App that exists but is not installed fails every token mint with
   HTTP 404, and nothing downstream can work.
8. Open the installation and note the numeric Installation ID (it is in the
   installation settings URL). Storing it is optional - provisioning discovers it
   automatically when the secret is unset.

Verification: you now hold three values: App ID, Installation ID (optional), and the
PEM key. Confirm they work before continuing: run the **Provisioning Credentials
Health Check** workflow, or locally
`node .github/scripts/provisioning/provision-cli.js --check-auth`. Do not proceed to
Phase 4 until the check passes.

## Phase 3: Configure variables and secrets

Set these on this repository (Settings, Secrets and variables, Actions). Using an
Environment named `provisioning` is recommended so you can add required reviewers.

Repository or environment variables:

| Variable | Value |
|---|---|
| `PROVISIONING_MODE` | `github-app` |
| `LEARNING_ROOM_TEMPLATE_REPO` | `Community-Access/learning-room-template` |
| `PROVISIONING_STUDENT_OWNER` | `Community-Access` |
| `ADMIN_ROSTER_REPO` | `Community-Access/glow-admin` (your admin repo) |
| `PROVISIONING_COHORT_ID` | Cohort that new enrollees are added to |

Secrets:

| Secret | Value |
|---|---|
| `PROVISIONING_APP_ID` | The App ID from Phase 2 |
| `PROVISIONING_APP_INSTALLATION_ID` | Optional. The Installation ID from Phase 2; when unset, provisioning discovers it from the App installations |
| `PROVISIONING_APP_PRIVATE_KEY` | The full contents of the `.pem` file |
| `PRIVATE_STUDENT_DATA_TOKEN` | A token that can check out and push to the admin repo |

Using `gh` for the App secrets (run from this repository):

```bash
gh secret set PROVISIONING_APP_ID --body "123456"
gh secret set PROVISIONING_APP_INSTALLATION_ID --body "98765432"
gh secret set PROVISIONING_APP_PRIVATE_KEY < glow-provisioning.private-key.pem
```

Security rules: the PEM lives only in Secrets, never in code or a public repo. Mint
tokens on demand and never persist them (the workflow already does this). Document and
rehearse key rotation; rotate on any suspected exposure.

## Phase 4: Deploy and smoke-test provisioning

The provisioning workflow ships in this repository at
[../.github/workflows/provision-learning-rooms.yml](../.github/workflows/provision-learning-rooms.yml).
Merging this branch deploys it. It runs when registration dispatches it, on a healing-sweep schedule, and on demand.

Smoke test with a single test account before any real cohort:

1. Add one test learner to the admin `roster.json` (a throwaway GitHub account you
   control), `provision_state` set to `pending`.
2. In the Actions tab, run **Provision Learning Rooms** with `dry_run` checked.
   Confirm it lists exactly your test learner.
3. Run it again with `dry_run` unchecked. Confirm:
   - A private student repository is created from the template.
   - The test account receives a repository invitation.
   - The roster entry flips to `provisioned` and `provisioning-log.json` records
     `created`.
4. Prove idempotency: run it a second time. The log should record `already-exists`
   and make no changes.

You can also run it locally against a checkout of the admin repo:

```bash
LEARNING_ROOM_TEMPLATE_REPO=Community-Access/learning-room-template \
PROVISIONING_STUDENT_OWNER=Community-Access \
PROVISIONING_MODE=github-app \
PROVISIONING_APP_ID=123456 \
PROVISIONING_APP_INSTALLATION_ID=98765432 \
PROVISIONING_APP_PRIVATE_KEY="@glow-provisioning.private-key.pem" \
node .github/scripts/provisioning/provision-cli.js --roster roster.json --log provisioning-log.json
```

Verification: a healthy student repository exists, the invite arrived, the roster and
log updated, and a re-run heals rather than duplicates.

## Phase 5: Deploy the optional companion

Skip this phase entirely if you are not running the companion. The workshop is fully
functional without it.

The companion lives in [../companion/](../companion/). See its
[README](../companion/README.md) for full detail. Production deployment outline:

1. Provision a small host with Python 3.12+ and TLS (a reverse proxy terminating
   HTTPS in front of the app).
2. Install dependencies and a WSGI server:

   ```bash
   cd companion
   python -m venv .venv
   .venv/bin/pip install -r requirements.txt gunicorn
   ```

3. Provide configuration via the environment (never in code):

   ```bash
   export COMPANION_SECRET_KEY="$(python -c 'import secrets;print(secrets.token_hex(32))')"
   export COMPANION_FACILITATOR_TOKEN="a-strong-random-token"
   export COMPANION_ROSTER_PATH="/srv/glow/roster.json"
   export COMPANION_SECURE_COOKIES=1
   ```

4. Run behind gunicorn (bind to localhost; let the proxy handle TLS and the public port):

   ```bash
   .venv/bin/gunicorn --workers 2 --bind 127.0.0.1:8000 app:app
   ```

5. Wire the roster: the companion writes registrations to `COMPANION_ROSTER_PATH`. A
   separate scheduled job (or a small commit hook) must sync that file to the admin
   repository so provisioning picks it up. The companion deliberately does not push to
   GitHub itself; it only owns the local roster file through the shared contract.

Verification:

- `GET /healthz` returns `{"status":"ok"}`.
- The registration page loads, and a screen reader pass (NVDA, JAWS, or VoiceOver)
  confirms landmarks, labeled fields, the error summary, and live-region messages.
- Facilitator sign-in with the token reaches the dashboard; a bad token is rejected.
- Response headers include `Content-Security-Policy` and `X-Frame-Options: DENY`.
- A registration appears in `roster.json` with `provision_state` `pending`.

## Phase 6: Go-live checklist

Do not open a cohort until every item holds. This complements the release gate in
[../GO-LIVE-QA-GUIDE.md](../GO-LIVE-QA-GUIDE.md).

- [ ] Template validation passes; the template has all required workflows.
- [ ] Admin `roster.json` exists and validates.
- [ ] The GitHub App is installed with only the four permissions listed.
- [ ] All variables and secrets are set on the provisioning environment.
- [ ] A single-account smoke test provisioned cleanly and a re-run reported
      `already-exists` (idempotency proven).
- [ ] Org seat and repository quotas are sufficient for the cohort size.
- [ ] If used, the companion passes its accessibility and security verification.
- [ ] The manual fallback (issue-form registration, Classroom invite during
      transition) is documented and ready.

## Operating a cohort

- **Provision on registration, not big-bang.** Let the registration dispatch and healing sweep trickle new
  learners in. This keeps you far below any rate limit regardless of cohort size.
- **Watch the roster and log.** `failed` entries and `error` log lines are your signal
  to intervene; re-running provisioning heals pending and failed entries.
- **Recover a stuck learner.** Fix the root cause (seat, name clash, permission), then
  re-run provisioning. Only pending and failed entries are retried; healthy learners
  are untouched.
- **Day 2 and progression** continue to run on the existing deterministic text signals
  (`ack`, `day1-complete`); the owned provisioning swap does not change them.

## Rollback and fallback

Because the owned core is additive and the downstream system cannot tell which method
created a repository, rollback is low-risk.

- **Disable owned provisioning.** Turn off the schedule on the provisioning workflow
  (or set its environment to require manual approval) and fall back to the Classroom
  invite during the transition window. No learner data is lost; the roster is still the
  source of truth.
- **Companion outage.** None of the critical path depends on it. Point learners at the
  issue-form front door and read the admin-issue dashboard until it returns.
- **Bad App credential.** Re-issue the App private key, update
  `PROVISIONING_APP_PRIVATE_KEY`, and re-run. Idempotency means the re-run heals.

## Reference: configuration surface

See SPEC.md section 16 for the authoritative list. Summary:

| Name | Type | Purpose |
|---|---|---|
| `PROVISIONING_MODE` | variable | `github-app` (production) or `actions-bot` (spike) |
| `LEARNING_ROOM_TEMPLATE_REPO` | variable | `owner/name` of the template |
| `PROVISIONING_STUDENT_OWNER` | variable | Org or user that owns student repos |
| `ADMIN_ROSTER_REPO` | variable | `owner/name` of the private admin repo |
| `PROVISIONING_APP_ID` | secret | GitHub App ID (App mode) |
| `PROVISIONING_APP_INSTALLATION_ID` | secret | Installation ID (App mode) |
| `PROVISIONING_APP_PRIVATE_KEY` | secret | PEM private key (App mode) |
| `PROVISIONING_TOKEN` | secret | Fine-grained PAT (actions-bot spike only) |
| `PRIVATE_STUDENT_DATA_TOKEN` | secret | Checkout and push to the admin repo |
| `COMPANION_SECRET_KEY` | env | Flask session signing key (companion) |
| `COMPANION_FACILITATOR_TOKEN` | env | Facilitator sign-in token (companion) |
| `COMPANION_ROSTER_PATH` | env | Path to `roster.json` (companion) |

## Authoritative Sources

Use these official references when you need the current source of truth for facts in
this document.

- [Registering a GitHub App](https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/registering-a-github-app)
- [Authenticating as a GitHub App installation](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-as-a-github-app-installation)
- [Using secrets in GitHub Actions](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions)
- [Generate a repository from a template (REST)](https://docs.github.com/en/rest/repos/repos#create-a-repository-using-a-template)
- [Rate limits for the REST API](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api)

### Section-Level Source Map

Use this map to verify facts for each major section in this file.

- **What you are deploying, Prerequisites, Phase 1, Operating a cohort:** [Generate a repository from a template (REST)](https://docs.github.com/en/rest/repos/repos#create-a-repository-using-a-template), [Rate limits for the REST API](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api)
- **Phase 2: Create the provisioning GitHub App:** [Registering a GitHub App](https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/registering-a-github-app), [Authenticating as a GitHub App installation](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-as-a-github-app-installation)
- **Phase 3: Configure variables and secrets, Reference: configuration surface:** [Using secrets in GitHub Actions](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions)
- **Phase 4, Phase 5, Phase 6, Rollback and fallback:** [Authenticating as a GitHub App installation](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-as-a-github-app-installation), [Using secrets in GitHub Actions](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions)
