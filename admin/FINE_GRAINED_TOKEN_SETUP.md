# Token and Variable Setup

This guide documents the current credential model for registration and dashboard automation.

## Registration Flow Credentials

Registration no longer uses organization invitation tokens.

Required variables:

- `CLASSROOM_DAY1_ASSIGNMENT_URL`
- `CLASSROOM_DAY2_ASSIGNMENT_URL`

Required secret for private intake storage:

- `PRIVATE_STUDENT_DATA_TOKEN`

## Dashboard Flow Credential

`instructor-dashboard-sync.yml` writes progress snapshots to the private administration repository.

Required secret:

- `INSTRUCTOR_DASHBOARD_TOKEN`

Recommended scope:

- Repository issues read/write on the private administration repository only.

## Verification Commands

```powershell
gh variable list -R Community-Access/git-going-with-github
gh secret list -R Community-Access/git-going-with-github
```

Expected registration-related output:

- Variables include `CLASSROOM_DAY1_ASSIGNMENT_URL` and `CLASSROOM_DAY2_ASSIGNMENT_URL`.
- Secrets include `PRIVATE_STUDENT_DATA_TOKEN`.
- If dashboard sync is enabled, secrets include `INSTRUCTOR_DASHBOARD_TOKEN`.

## Rotation Guidance

Rotate tokens at least once per cohort.

Rotation order:

1. Create new token.
2. Update repository secret.
3. Run a smoke test workflow.
4. Revoke old token.

## Authoritative Sources

Use these official references when you need the current source of truth for facts in this chapter.

- [GitHub Docs, home](https://docs.github.com/en)
- [GitHub Changelog](https://github.blog/changelog/)

### Section-Level Source Map

Use this map to verify facts for each major section in this file.

- **Registration Flow Credentials:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub security features](https://docs.github.com/en/code-security/getting-started/github-security-features), [Dependabot docs](https://docs.github.com/en/code-security/dependabot), [Secret scanning docs](https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning)
- **Dashboard Flow Credential:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/), [GitHub security features](https://docs.github.com/en/code-security/getting-started/github-security-features), [Dependabot docs](https://docs.github.com/en/code-security/dependabot), [Secret scanning docs](https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning)
- **Verification Commands:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
- **Rotation Guidance:** [GitHub Docs, home](https://docs.github.com/en), [GitHub Changelog](https://github.blog/changelog/)
