<#
.SYNOPSIS
    Deletes locked registration issues using the GitHub GraphQL deleteIssue mutation.

.DESCRIPTION
    Fetches all issues with registration/duplicate/waitlist labels and deletes them
    using the GraphQL API (which supports issue deletion, unlike the REST API).

    Prerequisites:
    - GitHub CLI must be authenticated with a token that has 'repo' scope
    - User must have admin permissions on the repository

    The script batches deletions to avoid rate limiting and provides progress updates.

.PARAMETER Repo
    Repository to clean. Defaults to Community-Access/git-going-with-github.

.PARAMETER Labels
    Issue labels to delete. Defaults to registration, duplicate, waitlist.

.EXAMPLE
    # Delete all registration issues
    .\Delete-RegistrationIssues.ps1
#>

[CmdletBinding()]
param(
    [string]$Repo = 'Community-Access/git-going-with-github',

    [string[]]$Labels = @('registration', 'duplicate', 'waitlist'),

    [int]$MaxToDelete = 0
)

$ErrorActionPreference = 'Stop'

function Write-Step { param([string]$m) Write-Host "`n==> $m" -ForegroundColor Cyan }
function Write-Pass { param([string]$m) Write-Host "    [PASS] $m" -ForegroundColor Green }
function Write-Fail { param([string]$m) Write-Host "    [FAIL] $m" -ForegroundColor Red }
function Write-Info { param([string]$m) Write-Host "    $m" -ForegroundColor Gray }

# ---------------------------------------------------------------------------
# Preflight
# ---------------------------------------------------------------------------
Write-Step "Preflight checks"

gh auth status -h github.com 2>&1 | ForEach-Object { Write-Info $_ }
if ($LASTEXITCODE -ne 0) { throw "GitHub CLI not authenticated" }

$currentUser = (gh api /user --jq '.login' 2>&1).Trim()
Write-Info "Authenticated as: $currentUser"

# Confirm repo access
gh api "repos/$Repo" --jq '.full_name' 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) { throw "Cannot access repository: $Repo" }
Write-Pass "Repository accessible: $Repo"

# ---------------------------------------------------------------------------
# Fetch all issues with target labels
# ---------------------------------------------------------------------------
Write-Step "Fetching issues with labels: $($Labels -join ', ')"

$allIssues = @()

# Build label filter query
foreach ($label in $Labels) {
    Write-Info "Fetching issues labeled: $label"
    
    # Use the issues endpoint with state=all to get closed and open issues
    # The endpoint returns paginated results, so we need to fetch all pages
    $url = "repos/$Repo/issues?state=all&labels=$label&per_page=100"
    $pageNum = 1
    
    do {
        $pageUrl = "$url&page=$pageNum"
        $batch = gh api $pageUrl 2>&1 | ConvertFrom-Json
        
        if ($LASTEXITCODE -eq 0 -and $batch -and @($batch).Count -gt 0) {
            $allIssues += $batch
            Write-Info "  Found $(@($batch).Count) issue(s) on page $pageNum"
            $pageNum++
        } else {
            break
        }
    } while (@($batch).Count -eq 100)
}

$allIssues = $allIssues | Sort-Object -Property number -Unique

if ($MaxToDelete -gt 0) {
    $allIssues = @($allIssues | Select-Object -First $MaxToDelete)
    Write-Info "MaxToDelete applied: processing first $MaxToDelete issue(s) only"
}

Write-Pass "Total issues to delete: $($allIssues.Count)"

if ($allIssues.Count -eq 0) {
    Write-Info "No issues found. Exiting."
    exit 0
}

# Display summary
$allIssues | ForEach-Object { Write-Info "  #$($_.number) -- $($_.title)" }

# ---------------------------------------------------------------------------
# Confirm deletion
# ---------------------------------------------------------------------------
Write-Host ""
$confirm = Read-Host "Delete $($allIssues.Count) issue(s)? Type 'yes' to confirm"
if ($confirm -ne 'yes') {
    Write-Info "Cancelled."
    exit 0
}

# ---------------------------------------------------------------------------
# Delete issues via GraphQL
# ---------------------------------------------------------------------------
Write-Step "Deleting issues via GraphQL API"

$successCount = 0
$failCount = 0

foreach ($issue in $allIssues) {
    Write-Info "Deleting #$($issue.number)..."

        $mutation = 'mutation($id:ID!){ deleteIssue(input:{issueId:$id}){ clientMutationId } }'
        $result = gh api graphql -f query="$mutation" -F id="$($issue.node_id)" 2>&1
    if ($LASTEXITCODE -eq 0) {
        $parsed = $result | ConvertFrom-Json
        if ($parsed.data.deleteIssue) {
            Write-Pass "  Deleted #$($issue.number)"
            $successCount++
        } else {
            Write-Fail "  Failed to delete #$($issue.number): $($parsed.errors[0].message)"
            $failCount++
        }
    } else {
        Write-Fail "  API error for #$($issue.number): $result"
        $failCount++
    }

    # Rate limit throttle
    Start-Sleep -Milliseconds 500
}

# ---------------------------------------------------------------------------
# Summary
# ---------------------------------------------------------------------------
Write-Host "`n=============================" -ForegroundColor White
Write-Host "Deletion complete." -ForegroundColor Green
Write-Host "  Successful: $successCount" -ForegroundColor Green
Write-Host "  Failed: $failCount" -ForegroundColor $(if ($failCount -gt 0) { 'Red' } else { 'Green' })

if ($failCount -gt 0) {
    Write-Host ""
    Write-Host "Some issues failed to delete. Check the output above for details." -ForegroundColor Red
    exit 1
}
