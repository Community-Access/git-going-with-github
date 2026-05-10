<#
.SYNOPSIS
    Archives cohort student data from Community-Access/git-going-with-github to
    Community-Access/git-going-student-success, then resets the source repository
    to a clean state for the next cohort.

.DESCRIPTION
    Performs the following in order:

    1. EXPORT -- Fetches all registration/duplicate/waitlist issues with their comments
       and saves them as JSON and CSV to a local staging folder.
    2. EXPORT -- Exports the current student-roster.json to the archive.
    3. EXPORT -- Exports all GitHub Discussions to JSON (see LIMITATIONS).
    4. COMMIT ARCHIVE -- Pushes the staged archive folder to git-going-student-success
       under admin/cohorts/<CohortSlug>/.
    5. RESET ISSUES -- Closes and locks all open/closed registration issues in the
       source repository (see LIMITATIONS -- issues cannot be deleted via API).
    6. RESET ROSTER -- Resets .github/data/student-roster.json to its blank template
       state via a direct commit to main.

    LIMITATIONS (GitHub API hard constraints):
    - Issues cannot be deleted via the GitHub REST API. They are closed and locked.
      A facilitator must manually delete them from the GitHub UI if deletion is required.
      Path: github.com/Community-Access/git-going-with-github/issues -> filter by label
      -> open each -> delete via the "..." menu (requires admin on the repository).
    - Discussions cannot be moved or deleted via any public API (GraphQL mutations for
      discussion management are not available). They are exported to the archive as JSON
      only. A facilitator must manually delete them from the Discussions tab in the UI.
    - This script does not touch any files tracked in source control other than
      student-roster.json.

.PARAMETER CohortSlug
    Short identifier for the cohort being archived, used as the folder name in the
    student-success repository. Format: YYYY-MM-description
    Example: 2026-03-march-cohort

.PARAMETER SourceRepo
    Source repository slug. Defaults to Community-Access/git-going-with-github.

.PARAMETER SuccessRepo
    Archive destination repository slug. Defaults to Community-Access/git-going-student-success.

.PARAMETER StagingPath
    Local folder for staging archive files before pushing. Defaults to a temp directory.
    Deleted after push unless -KeepStaging is specified.

.PARAMETER KeepStaging
    Keep the local staging folder after the archive push completes.

.PARAMETER WhatIf
    Show what would be done without making any changes to GitHub.

.EXAMPLE
    # Archive March 2026 cohort
    .\Archive-CohortData.ps1 -CohortSlug 2026-03-march-cohort

.EXAMPLE
    # Preview without making changes
    .\Archive-CohortData.ps1 -CohortSlug 2026-05-may-cohort -WhatIf
#>

[CmdletBinding(SupportsShouldProcess)]
param(
    [Parameter(Mandatory = $true)]
    [ValidatePattern('^\d{4}-\d{2}-[a-z0-9-]+$')]
    [string]$CohortSlug,

    [string]$SourceRepo = 'Community-Access/git-going-with-github',

    [string]$SuccessRepo = 'Community-Access/git-going-student-success',

    [string]$StagingPath = '',

    [switch]$KeepStaging
)

$ErrorActionPreference = 'Stop'

function Write-Step { param([string]$m) Write-Host "`n==> $m" -ForegroundColor Cyan }
function Write-Pass { param([string]$m) Write-Host "    [PASS] $m" -ForegroundColor Green }
function Write-Warn { param([string]$m) Write-Host "    [WARN] $m" -ForegroundColor Yellow }
function Write-Info { param([string]$m) Write-Host "    $m" -ForegroundColor Gray }
function Write-Fail { param([string]$m) Write-Host "    [FAIL] $m" -ForegroundColor Red }

# ---------------------------------------------------------------------------
# 0. Preflight
# ---------------------------------------------------------------------------
Write-Step "Preflight checks"

gh auth status -h github.com 2>&1 | ForEach-Object { Write-Info $_ }
if ($LASTEXITCODE -ne 0) { throw "GitHub CLI not authenticated. Run: gh auth login" }

$currentUser = (gh api /user --jq '.login' 2>&1).Trim()
Write-Info "Authenticated as: $currentUser"

# Confirm both repos exist and are accessible
foreach ($r in @($SourceRepo, $SuccessRepo)) {
    gh api "repos/$r" --jq '.full_name' 2>&1 | Out-Null
    if ($LASTEXITCODE -ne 0) { throw "Cannot access repository: $r" }
    Write-Pass "Accessible: $r"
}

# Set up staging folder
if (-not $StagingPath) {
    $StagingPath = Join-Path ([IO.Path]::GetTempPath()) "cohort-archive-$CohortSlug-$(Get-Random)"
}
New-Item -ItemType Directory -Path $StagingPath -Force | Out-Null
Write-Info "Staging path: $StagingPath"

$archiveDestPath = "admin/cohorts/$CohortSlug"
$issueExportFile = Join-Path $StagingPath "registration-issues.json"
$issueCsvFile    = Join-Path $StagingPath "registration-issues.csv"
$rosterFile      = Join-Path $StagingPath "student-roster.json"
$discussionFile  = Join-Path $StagingPath "discussions.json"
$manifestFile    = Join-Path $StagingPath "ARCHIVE-MANIFEST.md"

# ---------------------------------------------------------------------------
# 1. Export registration issues
# ---------------------------------------------------------------------------
Write-Step "Exporting registration/duplicate/waitlist issues from $SourceRepo"

$issueLabels = @('registration', 'duplicate', 'waitlist')
$allIssues = @()

foreach ($label in $issueLabels) {
    Write-Info "Fetching issues with label: $label"
    $batch = gh issue list -R $SourceRepo --label $label --state all --limit 500 `
        --json number,title,state,createdAt,closedAt,author,labels,body,comments 2>&1 | ConvertFrom-Json
    if ($batch) { $allIssues += $batch }
}

# Deduplicate by issue number
$allIssues = $allIssues | Sort-Object number -Unique
Write-Info "Total issues to archive: $($allIssues.Count)"

if ($PSCmdlet.ShouldProcess($issueExportFile, "Write issue export JSON")) {
    $allIssues | ConvertTo-Json -Depth 10 | Set-Content -Path $issueExportFile -Encoding UTF8
    Write-Pass "Written: registration-issues.json ($($allIssues.Count) issues)"
}

# CSV with key fields only (no comments, no PII beyond GitHub username)
if ($PSCmdlet.ShouldProcess($issueCsvFile, "Write issue CSV")) {
    $allIssues | ForEach-Object {
        [PSCustomObject]@{
            number     = $_.number
            title      = $_.title
            state      = $_.state
            labels     = ($_.labels | ForEach-Object { $_.name }) -join ';'
            author     = $_.author.login
            createdAt  = $_.createdAt
            closedAt   = $_.closedAt
        }
    } | Export-Csv -Path $issueCsvFile -NoTypeInformation -Encoding UTF8
    Write-Pass "Written: registration-issues.csv"
}

# ---------------------------------------------------------------------------
# 2. Export student roster
# ---------------------------------------------------------------------------
Write-Step "Exporting student-roster.json from $SourceRepo"

$rosterRaw = gh api "repos/$SourceRepo/contents/.github/data/student-roster.json" 2>&1 | ConvertFrom-Json
if ($rosterRaw.content) {
    $rosterContent = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String(($rosterRaw.content -replace '\s','')))
    if ($PSCmdlet.ShouldProcess($rosterFile, "Write roster export")) {
        Set-Content -Path $rosterFile -Value $rosterContent -Encoding UTF8
        Write-Pass "Written: student-roster.json"
    }
} else {
    Write-Warn "student-roster.json not found or empty in source repo -- skipping"
}

# ---------------------------------------------------------------------------
# 3. Export discussions
# ---------------------------------------------------------------------------
Write-Step "Exporting discussions from $SourceRepo (read-only export -- cannot delete via API)"

$owner = $SourceRepo.Split('/')[0]
$repoName = $SourceRepo.Split('/')[1]

# Create GraphQL query payload
$graphqlPayload = @{
    query = @'
query {
  repository(owner: "OWNER", name: "REPO") {
    discussions(first: 100) {
      totalCount
      nodes {
        id
        number
        title
        createdAt
        author { login }
        category { name }
        body
        comments(first: 50) {
          nodes {
            author { login }
            body
            createdAt
          }
        }
      }
    }
  }
}
'@ -replace 'OWNER', $owner -replace 'REPO', $repoName
}

$queryJson = $graphqlPayload | ConvertTo-Json -Depth 10
$discussions = @()

try {
    $discussionResult = $queryJson | gh api graphql --input - 2>&1
    if ($LASTEXITCODE -eq 0) {
        $parsed = $discussionResult | ConvertFrom-Json
        if ($parsed.data.repository.discussions.nodes) {
            $discussions = $parsed.data.repository.discussions.nodes
        }
    } else {
        Write-Warn "GraphQL request failed. Skipping discussions export."
    }
} catch {
    Write-Warn "Exception querying discussions: $($_.Exception.Message). Skipping discussions export."
}
Write-Info "Found $($discussions.Count) discussions"

if ($PSCmdlet.ShouldProcess($discussionFile, "Write discussion export")) {
    $discussions | ConvertTo-Json -Depth 10 | Set-Content -Path $discussionFile -Encoding UTF8
    Write-Pass "Written: discussions.json ($($discussions.Count) discussions)"
}

if ($discussions.Count -gt 0) {
    Write-Warn "MANUAL ACTION REQUIRED: Discussions cannot be deleted via the GitHub API."
    Write-Warn "After verifying this archive, manually delete each discussion at:"
    Write-Warn "  https://github.com/$SourceRepo/discussions"
    foreach ($d in $discussions) {
        Write-Warn "  #$($d.number) -- $($d.title)"
    }
}

# ---------------------------------------------------------------------------
# 4. Write archive manifest
# ---------------------------------------------------------------------------
$manifestContent = @"
# Cohort Archive: $CohortSlug

Archived: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss UTC' -AsUTC)
Archived by: $currentUser
Source: $SourceRepo
Destination: $SuccessRepo/$archiveDestPath

## Contents

| File | Description |
|---|---|
| registration-issues.json | Full issue export with comments ($($allIssues.Count) issues) |
| registration-issues.csv | Summary CSV (number, title, state, labels, author, dates) |
| student-roster.json | Roster snapshot from .github/data/student-roster.json |
| discussions.json | Discussions export ($($discussions.Count) threads, read-only -- see note below) |

## Post-Archive Manual Actions Required

Issues cannot be deleted via the GitHub REST API. They have been closed and locked
by this script. To fully delete them, a repository admin must delete each one from:
  https://github.com/$SourceRepo/issues?q=label%3Aregistration

Discussions cannot be moved or deleted via any public GitHub API. They must be manually
deleted by a repository admin at:
  https://github.com/$SourceRepo/discussions

"@

Set-Content -Path $manifestFile -Value $manifestContent -Encoding UTF8
Write-Pass "Written: ARCHIVE-MANIFEST.md"

# ---------------------------------------------------------------------------
# 5. Push archive to git-going-student-success
# ---------------------------------------------------------------------------
Write-Step "Pushing archive to $SuccessRepo under $archiveDestPath"

$successClone = Join-Path ([IO.Path]::GetTempPath()) "success-clone-$(Get-Random)"
if ($PSCmdlet.ShouldProcess($SuccessRepo, "Clone and push archive")) {
    gh repo clone $SuccessRepo $successClone 2>&1 | Out-Null
    $destFolder = Join-Path $successClone $archiveDestPath
    New-Item -ItemType Directory -Path $destFolder -Force | Out-Null

    Copy-Item -Path (Join-Path $StagingPath '*') -Destination $destFolder -Force

    Push-Location $successClone
    try {
        git add . 2>&1 | Out-Null
        $commitMsg = "archive: $CohortSlug cohort data ($($allIssues.Count) issues, $($discussions.Count) discussions)"
        git commit -m $commitMsg 2>&1 | Out-Null
        git push 2>&1 | Out-Null
        Write-Pass "Archive pushed to $SuccessRepo/$archiveDestPath"
    } finally {
        Pop-Location
        Remove-Item $successClone -Recurse -Force -ErrorAction SilentlyContinue
    }
} else {
    Write-Info "[WhatIf] Would push: $StagingPath -> $SuccessRepo/$archiveDestPath"
}

# ---------------------------------------------------------------------------
# 6. Close and lock registration issues in source repo
# ---------------------------------------------------------------------------
Write-Step "Closing and locking registration issues in $SourceRepo"

$openIssues = $allIssues | Where-Object { $_.state -eq 'OPEN' }
Write-Info "Open issues to close: $($openIssues.Count)"
Write-Info "All issues to lock: $($allIssues.Count)"
Write-Warn "Issues CANNOT be deleted via the GitHub API -- they will be closed and locked only."
Write-Warn "To delete them, a repo admin must do so manually from the GitHub UI."

foreach ($issue in $openIssues) {
    if ($PSCmdlet.ShouldProcess("#$($issue.number)", "Close issue")) {
        gh issue close $issue.number -R $SourceRepo --comment "Archived to $SuccessRepo/$archiveDestPath during $CohortSlug cohort reset." 2>&1 | Out-Null
        Write-Info "  Closed #$($issue.number): $($issue.title)"
    }
}

foreach ($issue in $allIssues) {
    if ($PSCmdlet.ShouldProcess("#$($issue.number)", "Lock issue")) {
        gh api -X PUT "repos/$SourceRepo/issues/$($issue.number)/lock" -f lock_reason=resolved 2>&1 | Out-Null
    }
}
Write-Pass "All $($allIssues.Count) issues closed and locked"

# ---------------------------------------------------------------------------
# 7. Reset student-roster.json
# ---------------------------------------------------------------------------
Write-Step "Resetting student-roster.json to blank template state"

$blankRoster = @{
    cohort          = "[COHORT_NAME]"
    cohortStartDate = "[YYYY-MM-DD]"
    cohortEndDate   = "[YYYY-MM-DD]"
    facilitators    = @("facilitator-username")
    students        = @(@{
        username      = "student-github-username"
        joinedDate    = "YYYY-MM-DD"
        mergedPRs     = 0
        currentLevel  = "beginner"
        interests     = @()
        timezone      = ""
    })
} | ConvertTo-Json -Depth 5

if ($PSCmdlet.ShouldProcess(".github/data/student-roster.json", "Reset to blank template")) {
    $currentSha = (gh api "repos/$SourceRepo/contents/.github/data/student-roster.json" 2>&1 | ConvertFrom-Json).sha
    $encodedContent = [System.Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($blankRoster))

    $body = @{
        message = "chore: reset student-roster.json for $CohortSlug cohort archive"
        content = $encodedContent
        sha     = $currentSha
    } | ConvertTo-Json

    $body | gh api -X PUT "repos/$SourceRepo/contents/.github/data/student-roster.json" --input - 2>&1 | Out-Null
    if ($LASTEXITCODE -eq 0) {
        Write-Pass "student-roster.json reset to blank template"
    } else {
        Write-Fail "Failed to reset student-roster.json"
    }
} else {
    Write-Info "[WhatIf] Would reset .github/data/student-roster.json"
}

# ---------------------------------------------------------------------------
# Cleanup staging
# ---------------------------------------------------------------------------
if (-not $KeepStaging) {
    Remove-Item $StagingPath -Recurse -Force -ErrorAction SilentlyContinue
    Write-Info "Staging folder removed"
} else {
    Write-Info "Staging folder kept at: $StagingPath"
}

# ---------------------------------------------------------------------------
# Summary
# ---------------------------------------------------------------------------
Write-Host "`n=============================" -ForegroundColor White
Write-Host "Cohort archive complete: $CohortSlug" -ForegroundColor Green
Write-Host ""
Write-Host "Archive location: https://github.com/$SuccessRepo/tree/main/$archiveDestPath" -ForegroundColor Cyan
Write-Host ""
Write-Host "MANUAL ACTIONS STILL REQUIRED:" -ForegroundColor Yellow
Write-Host "  1. Delete registration issues (cannot be done via API):" -ForegroundColor Yellow
Write-Host "     https://github.com/$SourceRepo/issues?q=label%3Aregistration" -ForegroundColor Yellow
if ($discussions.Count -gt 0) {
    Write-Host "  2. Delete $($discussions.Count) discussion thread(s) (cannot be done via API):" -ForegroundColor Yellow
    Write-Host "     https://github.com/$SourceRepo/discussions" -ForegroundColor Yellow
}
