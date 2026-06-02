# Hybrid Plan: Review Index

This is the single entry point for reviewing everything built for the **Hybrid plan**
(Option C): a dependable, GitHub-native provisioning core that replaces GitHub Classroom,
plus an optional, fully accessible Flask companion at the edges. It is described in
[golden.md](../golden.md) (vision) and specified in [SPEC.md](../SPEC.md) (technical spec).

Most functional files stay where the repository expects them (workflows under
`.github/workflows/`, Node scripts under `.github/scripts/`) so the system keeps working.
This page points you to all of them, grouped by concern, in a suggested reading order.

## Suggested review order

1. **Start with the vision and spec** so the rest has context.
2. **Read the deployment guide** to see how it is operated end to end.
3. **Skim the provisioning core** (the critical path).
4. **Skim the optional companion** (the edges).
5. **Confirm the tests and CI wiring.**

---

## 1. Planning and specification (repo root)

| File | What it is |
| --- | --- |
| [golden.md](../golden.md) | Vision document for the Hybrid plan. |
| [SPEC.md](../SPEC.md) | Technical specification, including an Implementation status section. |
| [roster.schema.json](../roster.schema.json) | JSON Schema for the owned roster of record. |

## 2. Documentation (`admin/`)

| File | What it is |
| --- | --- |
| [HYBRID_DEPLOYMENT_GUIDE.md](HYBRID_DEPLOYMENT_GUIDE.md) | Phased, verification-driven deployment guide (start here to operate it). |
| [OWNED_PROVISIONING.md](OWNED_PROVISIONING.md) | Operator guide: data model, running provisioning, failure recovery. |
| [COHORT_PROVISIONING.md](COHORT_PROVISIONING.md) | Existing cohort doc, now pointing at the owned subsystem. |
| [examples/roster.example.json](examples/roster.example.json) | Example owned roster you can copy. |

## 3. Provisioning core (`.github/scripts/provisioning/`) — the critical path

These stay in place because the workflow and CLI load them from here.

| File | Responsibility |
| --- | --- |
| `.github/scripts/provisioning/roster.js` | Owned roster contract: parse, validate, upsert, serialize, redact. Keyed on `(github_handle, cohort_id)`. |
| `.github/scripts/provisioning/progress.js` | Derives learner progress from owned signals. |
| `.github/scripts/provisioning/github-app-auth.js` | RS256 GitHub App JWT + installation-token minting (Node `crypto`, no deps). |
| `.github/scripts/provisioning/github-client.js` | Minimal REST client; `fetch` adapter (CLI) + `fromOctokit` adapter (workflows). |
| `.github/scripts/provisioning/provision-core.js` | Idempotent, serial, backoff-aware provisioning algorithm. |
| `.github/scripts/provisioning/provision-cli.js` | Standalone CLI runner. |
| `.github/scripts/provisioning/__tests__/` | 6 test files, 55 tests, run with `node --test`. |

## 4. Optional accessible companion (`companion/`) — the edges

Fully self-contained Flask app. It writes a local `roster.json`; a separate sync job
commits it to the admin repo. It deliberately does not push to GitHub itself.

| Path | What it is |
| --- | --- |
| [companion/README.md](../companion/README.md) | Companion overview, run, and security/accessibility notes. |
| `companion/app.py` | Flask application factory and routes. |
| `companion/roster_store.py` | Python mirror of the owned roster contract. |
| `companion/templates/` | WCAG 2.2 AA templates (base, register, success, login, dashboard, error). |
| `companion/static/styles.css` | Accessible styling. |
| `companion/requirements.txt` | Python dependencies (Flask). |
| `companion/tests/` | 2 test files, 25 tests (`python -m unittest`). |

## 5. CI wiring and commands

| File | What changed |
| --- | --- |
| `.github/workflows/provision-learning-rooms.yml` | New provisioning workflow: scheduled + manual `dry_run`; `github-app` and `actions-bot` modes. |
| `.github/workflows/automation-tests.yml` | Added provisioning + companion test steps. |
| [package.json](../package.json) | Added `test:provisioning` script. |

Run the suites locally:

```bash
# Existing automation tests
npm run test:automation

# Provisioning subsystem (Node, no install needed)
npm run test:provisioning

# Flask companion (Python)
cd companion
python -m venv .venv && .venv/bin/pip install -r requirements.txt
.venv/bin/python -m unittest discover -s tests
```

## Commits on this branch

The work landed in two commits on `feature/hybrid-owned-provisioning`:

- `d6dd05ddc` — provisioning core, companion, tests, docs, schema, CI wiring.
- `89bc204bd` — Hybrid deployment guide + cross-link.

This index adds one more documentation commit. Nothing was moved out of its
conventional location, so the workflows and CLI continue to resolve their imports.

## Authoritative Sources

Use these official references when you need the current source of truth for facts in
this document.

- [GitHub Actions workflows](https://docs.github.com/en/actions/using-workflows/about-workflows)
- [Authenticating as a GitHub App installation](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-as-a-github-app-installation)
- [Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/)

### Section-Level Source Map

Use this map to verify facts for each major section in this file.

- **Planning and specification, Provisioning core:** [golden.md](../golden.md), [SPEC.md](../SPEC.md)
- **CI wiring and commands:** [GitHub Actions workflows](https://docs.github.com/en/actions/using-workflows/about-workflows)
- **Provisioning core, Documentation:** [Authenticating as a GitHub App installation](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-as-a-github-app-installation)
- **Optional accessible companion:** [Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/)
