#Requires -Version 7
# Add-AutograderSafeguards.ps1
#
# Adds two failsafe layers to all four autograder workflows in
# Community-Access/learning-room-template:
#
#   1. concurrency group  — cancel stale runs when a student pushes again;
#                           prevents two simultaneous runs racing to post comments.
#   2. workflow_run watchdog (new file) — separate workflow that fires after any
#                           autograder concludes with 'failure'; if the in-job
#                           error handler did not manage to post a comment, the
#                           watchdog posts a friendly one to the PR. Covers the
#                           runner-abandonment case that in-job steps cannot catch.
#
# Also applies the update-or-create + if:failure() fixes to autograder-template,
# which was missed in the first pass.

$ErrorActionPreference = 'Stop'
$repo = 'Community-Access/learning-room-template'
$lf   = "`n"

# ---------------------------------------------------------------------------
# Helper: fetch file content from a specific ref (branch or 'main')
# ---------------------------------------------------------------------------
function Get-WorkflowContent {
    param([string]$Path, [string]$Ref = 'main')
    $info = gh api "repos/$repo/contents/$($Path)?ref=$Ref" | ConvertFrom-Json
    $text = [System.Text.Encoding]::UTF8.GetString(
        [System.Convert]::FromBase64String(($info.content -replace '\s', ''))
    )
    return [pscustomobject]@{ Sha = $info.sha; Text = $text }
}

# ---------------------------------------------------------------------------
# Helper: push a file to a branch (create or reset branch if needed)
# ---------------------------------------------------------------------------
function Push-FileToBranch {
    param(
        [string]$Path,
        [string]$Content,
        [string]$Branch,
        [string]$CommitMessage,
        [string]$ExistingSha  # SHA of the file on the branch
    )

    $defaultBranch = gh api "repos/$repo" --jq '.default_branch'
    $baseSha = gh api "repos/$repo/git/ref/heads/$defaultBranch" --jq '.object.sha'

    $existingRef = gh api "repos/$repo/git/ref/heads/$Branch" 2>$null
    if ($LASTEXITCODE -eq 0) {
        # Reset existing branch to default branch tip so the PR diff is clean.
        gh api "repos/$repo/git/refs/heads/$Branch" -X PATCH `
            --field "sha=$baseSha" --field "force=true" | Out-Null
        Write-Host "  Reset branch $Branch to $defaultBranch tip."
    } else {
        gh api "repos/$repo/git/refs" -X POST `
            --field "ref=refs/heads/$Branch" `
            --field "sha=$baseSha" | Out-Null
        Write-Host "  Created branch $Branch."
    }

    # Get the fresh SHA of the file on the (just-reset) branch.
    $fileInfo = gh api "repos/$repo/contents/$($Path)?ref=$Branch" 2>$null | ConvertFrom-Json
    $fileSha = if ($fileInfo) { $fileInfo.sha } else { $ExistingSha }

    $encoded = [System.Convert]::ToBase64String(
        [System.Text.Encoding]::UTF8.GetBytes($Content)
    )
    $tmp = [System.IO.Path]::GetTempFileName()
    try {
        [System.IO.File]::WriteAllText($tmp, $encoded, [System.Text.Encoding]::ASCII)
        gh api "repos/$repo/contents/$Path" -X PUT `
            --field "message=$CommitMessage" `
            --field "content=@$tmp" `
            --field "sha=$fileSha" `
            --field "branch=$Branch" | Out-Null
        if ($LASTEXITCODE -ne 0) { throw "File PUT failed for $Path on $Branch" }
    } finally {
        Remove-Item -LiteralPath $tmp -ErrorAction SilentlyContinue
    }
}

# ---------------------------------------------------------------------------
# Helper: open a PR (skip if one already exists for the branch)
# ---------------------------------------------------------------------------
function Open-PR {
    param([string]$Branch, [string]$Title, [string]$Body)
    $existing = gh pr list -R $repo --head $Branch --json number --jq '.[0].number' 2>$null
    if ($existing) {
        Write-Host "  PR already open for $Branch (#$existing) -- branch updated in place."
    } else {
        $defaultBranch = gh api "repos/$repo" --jq '.default_branch'
        $url = gh pr create -R $repo --head $Branch --base $defaultBranch `
            --title $Title --body $Body
        Write-Host "  PR opened: $url"
    }
}

# ---------------------------------------------------------------------------
# Concurrency block to insert (top-level, before 'jobs:')
# ---------------------------------------------------------------------------
$concurrencyBlock = (
    "concurrency:" + $lf +
    "  group: `${{ github.workflow }}-`${{ github.event.pull_request.number }}" + $lf +
    "  cancel-in-progress: true" + $lf +
    $lf
)

$permissionsAnchor = (
    "permissions:" + $lf +
    "  contents: read" + $lf +
    "  pull-requests: write" + $lf +
    $lf +
    "jobs:"
)

$permissionsWithConcurrency = (
    "permissions:" + $lf +
    "  contents: read" + $lf +
    "  pull-requests: write" + $lf +
    $lf +
    $concurrencyBlock +
    "jobs:"
)

# ---------------------------------------------------------------------------
# Patch autograder-template (not yet touched) — update-or-create + failure
# fallback + concurrency
# ---------------------------------------------------------------------------
Write-Host "`n[autograder-template] Fetching from main..."
$tplFile = Get-WorkflowContent -Path '.github/workflows/autograder-template.yml'
$tpl = $tplFile.Text

# 1. update-or-create
$oldCreate14 = (
    '            try {' + $lf +
    '              await github.rest.issues.createComment({' + $lf +
    '                owner: context.repo.owner,' + $lf +
    '                repo: context.repo.repo,' + $lf +
    '                issue_number: context.issue.number,' + $lf +
    '                body' + $lf +
    '              });' + $lf +
    "            } catch (error) {" + $lf +
    "              console.error('Could not post Challenge 14 result:', error.message);" + $lf +
    '            }'
)
$newCreate14 = (
    "            const MARKER = '## Challenge 14:';" + $lf +
    '            try {' + $lf +
    '              const { data: comments } = await github.rest.issues.listComments({' + $lf +
    '                owner: context.repo.owner,' + $lf +
    '                repo: context.repo.repo,' + $lf +
    '                issue_number: context.issue.number' + $lf +
    '              });' + $lf +
    "              const existing = comments.find(c => c.user.type === 'Bot' && c.body.includes(MARKER));" + $lf +
    '              if (existing) {' + $lf +
    '                await github.rest.issues.updateComment({' + $lf +
    '                  owner: context.repo.owner,' + $lf +
    '                  repo: context.repo.repo,' + $lf +
    '                  comment_id: existing.id,' + $lf +
    '                  body' + $lf +
    '                });' + $lf +
    '              } else {' + $lf +
    '                await github.rest.issues.createComment({' + $lf +
    '                  owner: context.repo.owner,' + $lf +
    '                  repo: context.repo.repo,' + $lf +
    '                  issue_number: context.issue.number,' + $lf +
    '                  body' + $lf +
    '                });' + $lf +
    '              }' + $lf +
    "            } catch (error) {" + $lf +
    "              console.error('Could not post Challenge 14 result:', error.message);" + $lf +
    '            }'
)

if ($tpl.Contains($oldCreate14)) {
    $tpl = $tpl.Replace($oldCreate14, $newCreate14)
    Write-Host "  Replaced createComment with update-or-create."
} else {
    Write-Warning "  Could not find createComment block for C14 -- skipping (already fixed?)."
}

# 2. failure fallback
if ($tpl -notmatch 'Post workflow error notice') {
    $failStep14 = (
        $lf +
        '      - name: Post workflow error notice' + $lf +
        '        if: failure()' + $lf +
        '        uses: actions/github-script@v8' + $lf +
        '        with:' + $lf +
        '          script: |' + $lf +
        "            const MARKER = '## Challenge 14:';" + $lf +
        '            const body = [' + $lf +
        "              '## Challenge 14: Check could not complete'," + $lf +
        "              ''," + $lf +
        "              'The automated issue template check ran into an unexpected error. Your work is not affected.'," + $lf +
        "              'Keep going and ask your facilitator, or mention @facilitator in a comment.'," + $lf +
        "              ''," + $lf +
        "              '---'," + $lf +
        "              '*Automated message from Learning Room Bot.*'" + $lf +
        "            ].join('\n');" + $lf +
        '            try {' + $lf +
        '              const { data: comments } = await github.rest.issues.listComments({' + $lf +
        '                owner: context.repo.owner,' + $lf +
        '                repo: context.repo.repo,' + $lf +
        '                issue_number: context.issue.number' + $lf +
        '              });' + $lf +
        "              const existing = comments.find(c => c.user.type === 'Bot' && c.body.includes(MARKER));" + $lf +
        '              if (existing) {' + $lf +
        '                await github.rest.issues.updateComment({' + $lf +
        '                  owner: context.repo.owner,' + $lf +
        '                  repo: context.repo.repo,' + $lf +
        '                  comment_id: existing.id,' + $lf +
        '                  body' + $lf +
        '                });' + $lf +
        '              } else {' + $lf +
        '                await github.rest.issues.createComment({' + $lf +
        '                  owner: context.repo.owner,' + $lf +
        '                  repo: context.repo.repo,' + $lf +
        '                  issue_number: context.issue.number,' + $lf +
        '                  body' + $lf +
        '                });' + $lf +
        '              }' + $lf +
        "            } catch (err) {" + $lf +
        "              console.error('Could not post error notice:', err.message);" + $lf +
        '            }' + $lf
    )
    $tpl = $tpl.TrimEnd() + $lf + $failStep14
    Write-Host "  Appended failure notice step."
}

# 3. concurrency group
if ($tpl -notmatch 'concurrency:') {
    $tpl = $tpl.Replace($permissionsAnchor, $permissionsWithConcurrency)
    Write-Host "  Added concurrency group."
}

Push-FileToBranch `
    -Path '.github/workflows/autograder-template.yml' `
    -Content $tpl `
    -Branch 'fix/autograder-autograder-template-comments' `
    -CommitMessage 'fix(autograder): update-or-create, failure fallback, concurrency for Challenge 14' `
    -ExistingSha $tplFile.Sha

Open-PR `
    -Branch 'fix/autograder-autograder-template-comments' `
    -Title 'fix(autograder): update-or-create comments + failure fallback + concurrency for Challenge 14' `
    -Body "Applies the same three fixes to ``autograder-template.yml`` that were already applied to C7/C10/C16 in PRs #2-4:``n``n- **Comment spam**: update-or-create instead of bare ``createComment```n- **Silent failures**: ``if: failure()`` fallback step posts a friendly message if the job crashes``n- **Race conditions**: ``concurrency`` group cancels stale runs when a student pushes again"

# ---------------------------------------------------------------------------
# Add concurrency to the 3 already-patched autograders (update existing branches)
# ---------------------------------------------------------------------------
$existing3 = @(
    [pscustomobject]@{ Wf = 'autograder-conflicts';    Branch = 'fix/autograder-autograder-conflicts-comments';    Num = '7' }
    [pscustomobject]@{ Wf = 'autograder-local-commit'; Branch = 'fix/autograder-autograder-local-commit-comments'; Num = '10' }
    [pscustomobject]@{ Wf = 'autograder-capstone';     Branch = 'fix/autograder-autograder-capstone-comments';     Num = '16' }
)

foreach ($e in $existing3) {
    Write-Host "`n[$($e.Wf)] Adding concurrency group..."
    # Fetch from the existing fix branch (already has update-or-create + failure step).
    $f = Get-WorkflowContent -Path ".github/workflows/$($e.Wf).yml" -Ref $e.Branch

    if ($f.Text -match 'concurrency:') {
        Write-Host "  Concurrency already present -- skipping."
        continue
    }

    $updated = $f.Text.Replace($permissionsAnchor, $permissionsWithConcurrency)
    if ($updated -eq $f.Text) {
        Write-Warning "  Could not find permissions anchor -- concurrency not added."
        continue
    }

    Push-FileToBranch `
        -Path ".github/workflows/$($e.Wf).yml" `
        -Content $updated `
        -Branch $e.Branch `
        -CommitMessage "fix(autograder): add concurrency group to Challenge $($e.Num)" `
        -ExistingSha $f.Sha

    Write-Host "  Updated existing PR branch $($e.Branch) with concurrency group."
}

# ---------------------------------------------------------------------------
# Create the workflow_run watchdog (new file)
# ---------------------------------------------------------------------------
Write-Host "`n[watchdog] Creating autograder-watchdog.yml..."

$watchdogContent = @'
name: Autograder Failure Watchdog
# Last-resort safety net for classroom reliability.
# Fires after any autograder workflow completes with conclusion=failure.
# If the in-job error handler already posted a comment, this is a no-op.
# If not (e.g. the runner was abandoned before the fallback step ran),
# this posts a friendly message to the student's PR so they never see silence.

on:
  workflow_run:
    workflows:
      - "Challenge 7: Merge Conflict Resolution Check"
      - "Challenge 10: Local Commit Check"
      - "Challenge 14: Issue Template Validation"
      - "Challenge 16: Capstone Agent File Validation"
    types: [completed]

permissions:
  pull-requests: write

jobs:
  notify-on-failure:
    name: Post friendly notice if job failed silently
    runs-on: ubuntu-latest
    # Only act on hard failures, not cancellations (concurrency group cancels are expected).
    if: github.event.workflow_run.conclusion == 'failure'

    steps:
      - name: Find PR and post notice if needed
        uses: actions/github-script@v8
        with:
          script: |
            const run = context.payload.workflow_run;
            const workflowName = run.name;
            const headBranch   = run.head_branch;
            const runCreatedAt = new Date(run.created_at);

            // Find the open PR for this branch.
            const { data: prs } = await github.rest.pulls.list({
              owner: context.repo.owner,
              repo:  context.repo.repo,
              state: 'open',
              head:  `${context.repo.owner}:${headBranch}`
            });

            if (prs.length === 0) {
              console.log('No open PR found for branch:', headBranch);
              return;
            }

            const pr = prs[0];

            // Check if the in-job handler already posted a challenge result
            // after this run started (if so, watchdog is not needed).
            const { data: comments } = await github.rest.issues.listComments({
              owner:        context.repo.owner,
              repo:         context.repo.repo,
              issue_number: pr.number
            });

            const challengeMarkers = [
              '## Challenge 7:',
              '## Challenge 10:',
              '## Challenge 14:',
              '## Challenge 16:'
            ];

            const alreadyPosted = comments.some(c =>
              c.user.type === 'Bot' &&
              new Date(c.updated_at) > runCreatedAt &&
              challengeMarkers.some(m => c.body.includes(m))
            );

            if (alreadyPosted) {
              console.log('Result already posted by in-job handler -- watchdog is a no-op.');
              return;
            }

            // Extract challenge number from the workflow name.
            const m = workflowName.match(/Challenge (\d+)/);
            const num = m ? m[1] : '?';

            const body = [
              `## Challenge ${num}: Check could not complete`,
              '',
              `The automated check for this challenge ran into an unexpected problem on our end. Your work is not affected.`,
              '',
              'Keep going and let your facilitator know, or leave a comment mentioning @facilitator.',
              '',
              '---',
              '*Automated message from Learning Room Bot.*'
            ].join('\n');

            try {
              await github.rest.issues.createComment({
                owner:        context.repo.owner,
                repo:         context.repo.repo,
                issue_number: pr.number,
                body
              });
              console.log(`Watchdog posted notice on PR #${pr.number}`);
            } catch (err) {
              console.error('Watchdog could not post notice:', err.message);
            }
'@

$watchdogBranch = 'fix/add-autograder-watchdog'
$watchdogPath   = '.github/workflows/autograder-watchdog.yml'
$defaultBranch  = (gh api "repos/$repo" --jq '.default_branch').Trim()
$baseSha        = (gh api "repos/$repo/git/ref/heads/$defaultBranch" --jq '.object.sha').Trim()

if (-not $baseSha -or $baseSha -eq 'null') {
    throw "Could not resolve base SHA for $defaultBranch"
}
Write-Host "  Base SHA: $baseSha"

# Delete the branch if it already exists, then recreate clean.
$null = gh api "repos/$repo/git/ref/heads/$watchdogBranch" 2>$null
if ($LASTEXITCODE -eq 0) {
    gh api "repos/$repo/git/refs/heads/$watchdogBranch" -X DELETE
    Write-Host "  Deleted existing watchdog branch."
}
$createResult = gh api "repos/$repo/git/refs" -X POST `
    --field "ref=refs/heads/$watchdogBranch" `
    --field "sha=$baseSha" 2>&1
if ($LASTEXITCODE -ne 0) { throw "Branch creation failed: $createResult" }
Write-Host "  Created branch $watchdogBranch."

# Push the new file (no existing SHA needed for new files).
$encoded = [System.Convert]::ToBase64String(
    [System.Text.Encoding]::UTF8.GetBytes($watchdogContent)
)
$tmp = [System.IO.Path]::GetTempFileName()
try {
    [System.IO.File]::WriteAllText($tmp, $encoded, [System.Text.Encoding]::ASCII)
    $putResult = gh api "repos/$repo/contents/$watchdogPath" -X PUT `
        --field 'message=feat: add autograder failure watchdog workflow' `
        --field "content=@$tmp" `
        --field "branch=$watchdogBranch" 2>&1
    if ($LASTEXITCODE -ne 0) { throw "File PUT failed: $putResult" }
    Write-Host "  Pushed $watchdogPath."
} finally {
    Remove-Item -LiteralPath $tmp -ErrorAction SilentlyContinue
}

Open-PR `
    -Branch $watchdogBranch `
    -Title 'feat(autograder): add workflow_run watchdog for silent runner failures' `
    -Body "Adds ``autograder-watchdog.yml`` -- a ``workflow_run``-triggered safety net that fires when any of the four autograder workflows completes with ``conclusion=failure``.``n``nIf the in-job ``if: failure()`` step already posted a comment, this workflow does nothing. If not (e.g. the GitHub runner was abandoned before any in-job steps could run), it posts a friendly message to the student's PR so they see something actionable instead of silence.``n``nCovers the runner-abandonment gap that in-job steps cannot catch."

Write-Host "`nAll safeguards applied. PRs ready for review and merge in $repo."
