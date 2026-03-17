# create_student_issues.ps1
# Creates 10 challenge issues per student for org members who don't have them yet.
# Only assigns to org members (who can be assigned). Rerun as new members join.
# Uses templates from Weijun-Zhang-1996's existing issues (renamed to Chapter 0X.Y format)

param(
    [switch]$DryRun,
    [int]$BatchSize = 20,
    [int]$DelayMs = 500,
    [string]$TargetRepo = "Community-Access/learning-room" # Make target repo configurable for future cohorts
)

$ErrorActionPreference = "Stop"
$repo = $TargetRepo
$templateUser = "Weijun-Zhang-1996"

# Issue number -> challenge key mapping
$issueMap = @{
    "04.1"=164; "04.2"=165; "04.3"=166
    "05.1"=197; "05.2"=198; "05.3"=199
    "06.1"=210
    "11.1"=241; "11.2"=242; "11.3"=243
}

# Challenge order for creation
$challengeOrder = @("04.1","04.2","04.3","05.1","05.2","05.3","06.1","11.1","11.2","11.3")

# Load templates from existing issues
Write-Host "Loading 10 templates from existing issues..."
$templates = @{}
foreach ($entry in $issueMap.GetEnumerator()) {
    $key = $entry.Key
    $num = $entry.Value
    $json = gh api "repos/$repo/issues/$num"
    $obj = $json | ConvertFrom-Json
    $lbls = ($obj.labels | ForEach-Object { $_.name }) -join ","
    $templates[$key] = @{ title = $obj.title; body = $obj.body; labels = $lbls }
    Write-Host "  Loaded $key (#$num)"
}
Write-Host "All 10 templates loaded.`n"

# Load org members (only members can be assigned)
Write-Host "Loading org members..."
$orgMembers = (gh api "orgs/Community-Access/members?per_page=100" --jq ".[].login") -split "`n" | Where-Object { $_.Trim() }
Write-Host "Org members: $($orgMembers.Count)"

# Find students who already have Ch 04-11 challenge issues (check by title pattern)
Write-Host "Checking existing Ch 04-11 challenge issues..."
$existingTitles = @()
$page = 1
do {
    $batch = gh api "repos/$repo/issues?state=open&labels=challenge&per_page=100&page=$page" --jq ".[].title" 2>&1
    if ($batch -and $batch.Trim()) {
        $existingTitles += ($batch -split "`n" | Where-Object { $_.Trim() })
    }
    $page++
} while ($batch -and ($batch -split "`n").Count -ge 100)

# A member has Ch 04-11 issues if any title matches "Chapter 04.1:.*(@username)"
$haveIssues = @()
foreach ($m in $orgMembers) {
    if ($existingTitles | Where-Object { $_ -match "Chapter 04\.1:.*\(@$m\)" }) {
        $haveIssues += $m
    }
}
$haveIssues = $haveIssues | Sort-Object -Unique

# Only create for org members who don't already have Ch 04-11 issues
$needIssues = $orgMembers | Where-Object { $_ -notin $haveIssues }
Write-Host "Org members without issues: $($needIssues.Count)"
Write-Host "Issues to create: $($needIssues.Count * 10)`n"

if ($DryRun) {
    Write-Host "[DRY RUN] Would create $($needIssues.Count * 10) issues for $($needIssues.Count) org members"
    $needIssues | Sort-Object | ForEach-Object { Write-Host "  $_" }
    exit 0
}

# Create issues
$created = 0
$failed = 0
$errors = @()
$totalIssues = $needIssues.Count * 10

foreach ($student in $needIssues) {
    foreach ($key in $challengeOrder) {
        $tmpl = $templates[$key]
        $newTitle = $tmpl.title -replace [regex]::Escape($templateUser), $student
        $newBody = $tmpl.body -replace [regex]::Escape($templateUser), $student
        $labels = $tmpl.labels

        $created++
        Write-Host "[$created/$totalIssues] $student - $key ... " -NoNewline

        try {
            # Build the JSON payload
            $labelArray = ($labels -split ",") | ForEach-Object { $_.Trim() } | Where-Object { $_ }
            $payload = @{
                title = $newTitle
                body = $newBody
                assignees = @($student)
                labels = $labelArray
            } | ConvertTo-Json -Depth 3 -Compress

            $result = $payload | gh api "repos/$repo/issues" --input - --jq ".number" 2>&1
            
            if ($LASTEXITCODE -eq 0) {
                Write-Host "OK #$result"
            } else {
                $failed++
                $errors += "$student $key : $result"
                Write-Host "FAILED: $result"
            }
        }
        catch {
            $failed++
            $errors += "$student $key : $_"
            Write-Host "ERROR: $_"
        }

        # Rate limiting
        Start-Sleep -Milliseconds $DelayMs
    }
}

Write-Host "`n=== SUMMARY ==="
Write-Host "Created: $($created - $failed)"
Write-Host "Failed: $failed"
if ($errors.Count -gt 0) {
    Write-Host "`nErrors:"
    $errors | ForEach-Object { Write-Host "  $_" }
}
