# Fine-Grained Token Setup Guide

This guide walks you through creating and configuring the fine-grained tokens needed for GitHub Classroom integration.

## Why Fine-Grained Tokens?

- **Least privilege**: Tokens are scoped to specific repositories and permissions
- **Security**: If exposed, damage is limited to only what that token can access
- **Audit trail**: Personal access tokens can be revoked individually
- **Expiration**: Fine-grained tokens have explicit expiration dates (no endless "magic" tokens)

## Required Tokens

### Token 1: Private Student Data (Read/Write Issues)

**Purpose**: Write student intake data to private admin repository  
**Scope**: Only `Community-Access/git-going-with-github-administration` repository  
**Permissions**: Issues (Read and Write)  
**Name**: `student-intake-writer`

#### Creating the Token

1. Go to: https://github.com/settings/personal-access-tokens/new
2. Configure:
   - **Token name**: `student-intake-writer`
   - **Expiration**: 90 days (shorter is better; rotate regularly)
   - **Description**: Writes student enrollment intake to private admin repo
   - **Resource owner**: Select yourself (or your automation account)
   - **Permissions**:
     - Repository permissions:
       - **Issues**: Read and Write

3. **Resource**: Select "Only select repositories"
   - Repository: `Community-Access/git-going-with-github-administration`

4. **Create token** and copy to clipboard

5. Store in source repo (`git-going-with-github`):
   ```powershell
   gh secret set PRIVATE_STUDENT_DATA_TOKEN \
     --repo Community-Access/git-going-with-github \
     --body "ghp_YOUR_TOKEN_HERE"
   ```

### Token 2: Classroom Organization Member Inviter (Optional)

**Purpose**: Send organization invitations to enrolled students  
**Scope**: Your classroom organization (e.g., `git-going-classroom-cohort-2025-01`)  
**Permissions**: Members (Read and Write)  
**Name**: `classroom-member-inviter`

#### Creating the Token

1. Go to: https://github.com/settings/personal-access-tokens/new
2. Configure:
   - **Token name**: `classroom-member-inviter`
   - **Expiration**: 90 days (rotate each cohort)
   - **Description**: Sends org member invitations for classroom enrollment
   - **Resource owner**: Select yourself (or automation account)
   - **Permissions**:
     - Organization permissions:
       - **Members**: Read and Write

3. **Resource**: Select "Only select repositories"
   - Organization: Select your classroom org (e.g., `git-going-classroom-cohort-2025-01`)

4. **Create token** and copy to clipboard

5. Store in source repo:
   ```powershell
   gh secret set CLASSROOM_ORG_ADMIN_TOKEN \
     --repo Community-Access/git-going-with-github \
     --body "ghp_YOUR_CLASSROOM_TOKEN_HERE"
   ```

## Verification

### Check Token 1 (Student Data)

```powershell
# Verify the token has access
gh api repos/Community-Access/git-going-with-github-administration/issues \
  --jq '.[] | {number, title, labels}'
```

If successful, you'll see any existing intake issues.

### Check Token 2 (Classroom Org)

```powershell
# Verify the token can list org members
$ORG = "git-going-classroom-cohort-2025-01"
gh api orgs/$ORG/members --jq '.[] | .login'
```

If successful, you'll see org members listed.

## Token Rotation Schedule

| Token | Frequency | When | Reason |
|-------|-----------|------|--------|
| `student-intake-writer` | Per cohort | After cohort ends | Isolation between cohorts |
| `classroom-member-inviter` | Per cohort | After cohort ends | Org-specific, tie to cohort |

## Troubleshooting Tokens

### "Insufficient permissions" error

**Cause**: Token missing required permission  
**Fix**: Create new token with correct permissions; check that **all** required permissions are selected  
**Verify**: Test the token scope with `gh api` before storing in secret

### "Not Found" (404) error

**Cause**: Token created but not scoped to the right repository/org  
**Fix**: Delete and recreate token, ensuring:
  - Resource is set to "Only select repositories"
  - Correct repository/organization is selected
  - Permissions are minimal but sufficient

### "Unauthorized" (401) error

**Cause**: Secret stored with typo or token expired  
**Fix**: Check expiration date in token page; recreate fresh token if needed  
**Verify**: Delete the old secret and set the new one:
```powershell
gh secret delete PRIVATE_STUDENT_DATA_TOKEN --repo Community-Access/git-going-with-github
gh secret set PRIVATE_STUDENT_DATA_TOKEN --body "ghp_NEW_TOKEN_HERE" --repo Community-Access/git-going-with-github
```

## Security Best Practices

1. **Never commit tokens to code** — Always use GitHub secrets or environment variables
2. **Rotate regularly** — Set 90-day expiration on all tokens
3. **Use minimal scopes** — Only grant permissions needed for that specific task
4. **Delete unused tokens** — After rotating, revoke the old token in https://github.com/settings/personal-access-tokens
5. **Use org accounts if possible** — Consider automation account separate from personal GitHub
6. **Audit token usage** — Check [Token audit log](https://github.com/settings/personal-access-tokens) monthly

## Variables Needed (No Secrets)

These are set as repository variables (not secrets) because they're not sensitive:

```powershell
# Classroom organization name
gh variable set CLASSROOM_ORG --body "git-going-classroom-cohort-2025-01" \
  --repo Community-Access/git-going-with-github

# Optional: Organization join link
gh variable set CLASSROOM_JOIN_URL \
  --body "https://classroom.github.com/a/..." \
  --repo Community-Access/git-going-with-github

# Optional: Day 1 assignment link
gh variable set CLASSROOM_DAY1_ASSIGNMENT_URL \
  --body "https://classroom.github.com/a/..." \
  --repo Community-Access/git-going-with-github

# Optional: Day 2 assignment link
gh variable set CLASSROOM_DAY2_ASSIGNMENT_URL \
  --body "https://classroom.github.com/a/..." \
  --repo Community-Access/git-going-with-github

# Already set: private data storage
gh variable set PRIVATE_STUDENT_DATA_REPO \
  --body "Community-Access/git-going-with-github-administration" \
  --repo Community-Access/git-going-with-github

# Already set: export controls
gh variable set ENABLE_PUBLIC_CLASSROOM_INTAKE_EXPORT --body "false" \
  --repo Community-Access/git-going-with-github

gh variable set ENABLE_PUBLIC_REGISTRATION_EXPORT --body "false" \
  --repo Community-Access/git-going-with-github
```

## Quick Reference: All Required Variables & Secrets

### Secrets (Hidden)
- `PRIVATE_STUDENT_DATA_TOKEN` — Fine-grained token for writing to admin repo
- `CLASSROOM_ORG_ADMIN_TOKEN` — Fine-grained token for org member invites (optional)

### Variables (Visible)
- `PRIVATE_STUDENT_DATA_REPO` — `Community-Access/git-going-with-github-administration`
- `ENABLE_PUBLIC_CLASSROOM_INTAKE_EXPORT` — `false`
- `ENABLE_PUBLIC_REGISTRATION_EXPORT` — `false`
- `CLASSROOM_ORG` — Your cohort org name (e.g., `git-going-classroom-cohort-2025-01`)
- `CLASSROOM_DAY1_ASSIGNMENT_URL` — Classroom assignment link (optional)
- `CLASSROOM_DAY2_ASSIGNMENT_URL` — Classroom assignment link (optional)

## Next Steps

Once tokens are set up:

1. Create a test enrollment: submit a [Classroom Enrollment](https://github.com/Community-Access/git-going-with-github/issues/new?template=classroom-enrollment.yml) issue
2. Verify workflow succeeded: Check [Actions → Registration workflow](https://github.com/Community-Access/git-going-with-github/actions/workflows/registration.yml)
3. Check private repo: Verify intake issue created in [git-going-with-github-administration](https://github.com/Community-Access/git-going-with-github-administration/issues)
4. Verify org invite: Check org members pending list in [Classroom org](https://github.com/settings/organizations)

---

**Last updated**: 2026-05-12  
**Contact**: Facilitator lead or repo maintainer for questions
