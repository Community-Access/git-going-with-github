#Requires -Version 7
# Fix-AutograderComments.ps1
# For each of the three autograder workflows in Community-Access/learning-room-template:
#   1. Replace bare createComment with update-or-create (no more comment spam on re-pushes).
#   2. Append an if:failure() step so students see a friendly message if the workflow itself errors.

$ErrorActionPreference = 'Stop'
$repo = 'Community-Access/learning-room-template'
$lf   = "`n"

$challenges = @(
    [pscustomobject]@{ Wf = 'autograder-conflicts';    Num = '7';  FriendlyName = 'conflict marker check' }
    [pscustomobject]@{ Wf = 'autograder-local-commit'; Num = '10'; FriendlyName = 'local commit check' }
    [pscustomobject]@{ Wf = 'autograder-template';     Num = '14'; FriendlyName = 'issue template check' }
    [pscustomobject]@{ Wf = 'autograder-capstone';     Num = '16'; FriendlyName = 'agent file check' }
)

foreach ($c in $challenges) {
    $wf    = $c.Wf
    $num   = $c.Num
    $fname = $c.FriendlyName
    $path  = ".github/workflows/$wf.yml"

    Write-Host "[$wf] Fetching..."
    $fileInfo = gh api "repos/$repo/contents/$path" | ConvertFrom-Json
    $sha      = $fileInfo.sha
    $content  = [System.Text.Encoding]::UTF8.GetString(
        [System.Convert]::FromBase64String(($fileInfo.content -replace '\s', ''))
    )

    # -------------------------------------------------------------------------
    # Part 1 — replace bare createComment block with update-or-create
    # -------------------------------------------------------------------------
    $oldCreate = (
        '            try {' + $lf +
        '              await github.rest.issues.createComment({' + $lf +
        '                owner: context.repo.owner,' + $lf +
        '                repo: context.repo.repo,' + $lf +
        '                issue_number: context.issue.number,' + $lf +
        '                body' + $lf +
        '              });' + $lf +
        "            } catch (error) {" + $lf +
        "              console.error('Could not post Challenge $num result:', error.message);" + $lf +
        '            }'
    )

    $newCreate = (
        "            const MARKER = '## Challenge " + $num + ":';" + $lf +
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
        "              console.error('Could not post Challenge $num result:', error.message);" + $lf +
        '            }'
    )

    if (-not $content.Contains($oldCreate)) {
        Write-Warning "  Could not find createComment block -- skipping replace (already fixed or changed upstream)."
    } else {
        $content = $content.Replace($oldCreate, $newCreate)
        Write-Host "  Replaced createComment with update-or-create."
    }

    # -------------------------------------------------------------------------
    # Part 2 — append workflow-failure fallback step
    # -------------------------------------------------------------------------
    if ($content -match 'Post workflow error notice') {
        Write-Host "  Failure step already present -- skipping."
    } else {
        # Build the update-or-create helper inline so the failure step is self-contained.
        $failureStep = (
            $lf +
            '      - name: Post workflow error notice' + $lf +
            '        if: failure()' + $lf +
            '        uses: actions/github-script@v8' + $lf +
            '        with:' + $lf +
            '          script: |' + $lf +
            "            const MARKER = '## Challenge " + $num + ":';" + $lf +
            '            const body = [' + $lf +
            "              '## Challenge " + $num + ": Check could not complete'," + $lf +
            "              ''," + $lf +
            "              'The automated " + $fname + " ran into an unexpected error. Your work is not affected.'," + $lf +
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

        $content = $content.TrimEnd() + $lf + $failureStep
        Write-Host "  Appended failure notice step."
    }

    # -------------------------------------------------------------------------
    # Part 3 — add concurrency group (prevents race when student pushes twice)
    # -------------------------------------------------------------------------
    $permAnchor = (
        "permissions:" + $lf +
        "  contents: read" + $lf +
        "  pull-requests: write" + $lf +
        $lf +
        "jobs:"
    )
    $permWithConcurrency = (
        "permissions:" + $lf +
        "  contents: read" + $lf +
        "  pull-requests: write" + $lf +
        $lf +
        "concurrency:" + $lf +
        "  group: `${{ github.workflow }}-`${{ github.event.pull_request.number }}" + $lf +
        "  cancel-in-progress: true" + $lf +
        $lf +
        "jobs:"
    )
    if ($content -notmatch 'concurrency:') {
        $content = $content.Replace($permAnchor, $permWithConcurrency)
        Write-Host "  Added concurrency group."
    } else {
        Write-Host "  Concurrency group already present -- skipping."
    }

    # -------------------------------------------------------------------------
    # Part 4 — push to a branch and open a PR (branch protection is enabled)
    # -------------------------------------------------------------------------
    $encoded   = [System.Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($content))
    $commitMsg = "fix: update-or-create comments, failure fallback, concurrency for Challenge $num"
    $branch    = "fix/autograder-$wf-comments"

    # Get default branch SHA to base the new branch on.
    $defaultBranch = gh api "repos/$repo" --jq '.default_branch'
    $baseSha = gh api "repos/$repo/git/ref/heads/$defaultBranch" --jq '.object.sha'

    # Create (or reset) the branch.
    $existingRef = gh api "repos/$repo/git/ref/heads/$branch" 2>$null
    if ($LASTEXITCODE -eq 0) {
        $null = gh api "repos/$repo/git/refs/heads/$branch" -X PATCH --field "sha=$baseSha" --field "force=true"
        Write-Host "  Reset existing branch $branch."
    } else {
        $null = gh api "repos/$repo/git/refs" -X POST `
            --field "ref=refs/heads/$branch" `
            --field "sha=$baseSha"
        if ($LASTEXITCODE -ne 0) { throw "Branch creation failed for $branch" }
        Write-Host "  Created branch $branch."
    }

    # Push file to the branch.
    $tmp = [System.IO.Path]::GetTempFileName()
    try {
        [System.IO.File]::WriteAllText($tmp, $encoded, [System.Text.Encoding]::ASCII)
        gh api "repos/$repo/contents/$path" -X PUT `
            --field "message=$commitMsg" `
            --field "content=@$tmp" `
            --field "sha=$sha" `
            --field "branch=$branch" | Out-Null
        if ($LASTEXITCODE -ne 0) { throw "File PUT failed for $wf" }
    } finally {
        Remove-Item -LiteralPath $tmp -ErrorAction SilentlyContinue
    }

    # Open PR (skip if one already exists for this branch).
    $existingPr = gh pr list -R $repo --head $branch --json number --jq '.[0].number' 2>$null
    if ($existingPr) {
        Write-Host "  PR already open: #$existingPr -- updated branch."
    } else {
        $prUrl = gh pr create -R $repo `
            --head $branch `
            --base $defaultBranch `
            --title "fix(autograder): update-or-create comments + failure fallback for Challenge $num" `
            --body "Fixes three student-experience issues in ``$wf``:`n`n- **Comment spam**: replace bare ``createComment`` with update-or-create so re-pushes update the existing bot comment rather than appending a new one.`n- **Silent failures**: add an ``if: failure()`` fallback step so students see a friendly PR comment if the workflow itself errors, rather than silence.`n- **Race conditions**: add ``concurrency`` group so a rapid double-push cancels the stale run instead of two runs racing to post comments."
        Write-Host "  PR opened: $prUrl"
    }
}

Write-Host 'All four autograders updated.'
