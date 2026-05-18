[CmdletBinding()]
param(
    [string]$StudentRepository = '',

    [string]$ClassroomOrg = 'Community-Access-Classroom',

    [string]$TemplateRef = 'main',

    [ValidateSet('core-day1', 'core-day2', 'automation-core', 'all-core', 'custom')]
    [string]$Profile = 'all-core',

    [string[]]$RepoPrefixes = @('you-belong-here-', 'you-can-build-this-'),

    [switch]$OpenPullRequest,

    [switch]$AutoMerge,

    [switch]$AdminMerge,

    [switch]$DryRun,

    [switch]$Force
)

$ErrorActionPreference = 'Stop'

function Invoke-CheckedCommand {
    param([string]$FilePath, [string[]]$Arguments)

    & $FilePath @Arguments
    if ($LASTEXITCODE -ne 0) {
        throw "Command failed: $FilePath $($Arguments -join ' ')"
    }
}

function Invoke-GhJson {
    param([string[]]$Arguments)

    $json = & gh @Arguments
    if ($LASTEXITCODE -ne 0) {
        throw "Command failed: gh $($Arguments -join ' ')"
    }

    if (-not $json) {
        return $null
    }

    return $json | ConvertFrom-Json
}

function Test-RepositoryHasActivity {
    param([string]$Repository)

    $activity = [ordered]@{
        HasNonMainBranch = $false
        HasOpenPR        = $false
    }

    $branches = Invoke-GhJson -Arguments @('api', "repos/$Repository/branches?per_page=100")
    if ($branches) {
        $nonMain = @($branches | Where-Object { $_.name -ne 'main' })
        if ($nonMain.Count -gt 0) {
            $activity.HasNonMainBranch = $true
        }
    }

    $openPrs = Invoke-GhJson -Arguments @('pr', 'list', '-R', $Repository, '--state', 'open', '--json', 'number')
    if ($openPrs) {
        if (@($openPrs).Count -gt 0) {
            $activity.HasOpenPR = $true
        }
    }

    return [PSCustomObject]$activity
}

function Get-TargetRepositories {
    param(
        [string]$SingleRepository,
        [string]$Organization,
        [string[]]$Prefixes
    )

    if ($SingleRepository) {
        return @($SingleRepository)
    }

    $repos = Invoke-GhJson -Arguments @('repo', 'list', $Organization, '--limit', '500', '--json', 'name,nameWithOwner,isPrivate')
    if (-not $repos) {
        return @()
    }

    $targets = @()
    foreach ($repo in $repos) {
        if (-not $repo.isPrivate) {
            continue
        }

        foreach ($prefix in $Prefixes) {
            if ($repo.name.StartsWith($prefix, [System.StringComparison]::OrdinalIgnoreCase)) {
                $targets += $repo.nameWithOwner
                break
            }
        }
    }

    return $targets
}

Write-Host 'Checking GitHub CLI authentication...'
Invoke-CheckedCommand gh @('auth', 'status', '-h', 'github.com')

$scriptDir = if ($PSScriptRoot) { $PSScriptRoot } else { Split-Path -Parent $MyInvocation.MyCommand.Path }
$restoreScript = Join-Path $scriptDir 'Restore-LearningRoomFiles.ps1'
if (-not (Test-Path -LiteralPath $restoreScript -PathType Leaf)) {
    throw "Required script not found: $restoreScript"
}

$targets = Get-TargetRepositories -SingleRepository $StudentRepository -Organization $ClassroomOrg -Prefixes $RepoPrefixes
if (-not $targets -or $targets.Count -eq 0) {
    Write-Host 'No target repositories found. Nothing to do.'
    return
}

Write-Host "Found $($targets.Count) target repository/repositories."

$summary = @()

foreach ($repo in $targets) {
    Write-Host ''
    Write-Host "Processing $repo"

    $row = [ordered]@{
        Repository = $repo
        Status     = 'unknown'
        Details    = ''
    }

    try {
        if (-not $Force) {
            $activity = Test-RepositoryHasActivity -Repository $repo
            if ($activity.HasNonMainBranch -or $activity.HasOpenPR) {
                $reasons = @()
                if ($activity.HasNonMainBranch) { $reasons += 'non-main branches exist' }
                if ($activity.HasOpenPR) { $reasons += 'open PRs exist' }

                $row.Status = 'skipped'
                $row.Details = ($reasons -join '; ')
                Write-Host "Skipping due to activity: $($row.Details)"
                $summary += [PSCustomObject]$row
                continue
            }
        }

        $stamp = Get-Date -Format 'yyyyMMddHHmmss'
        $branchName = "recovery/template-sync-$stamp"

        $restoreParams = @{
            StudentRepository = $repo
            Profile           = $Profile
            TemplateRef       = $TemplateRef
            BranchName        = $branchName
            CommitMessage     = 'chore: sync learning-room template baseline'
        }

        if ($OpenPullRequest -or $AutoMerge) {
            $restoreParams.OpenPullRequest = $true
        }

        if ($DryRun) {
            $row.Status = 'dry-run'
            $row.Details = "Would run restore on branch $branchName"
            Write-Host $row.Details
            $summary += [PSCustomObject]$row
            continue
        }

        & $restoreScript @restoreParams
        if ($LASTEXITCODE -ne 0) {
            throw "Restore script failed for $repo"
        }

        if ($AutoMerge) {
            $prNumber = & gh pr list -R $repo --head $branchName --state open --json number --jq '.[0].number'
            if ($LASTEXITCODE -ne 0) {
                throw "Could not query PR number for $repo"
            }

            if (-not $prNumber) {
                $row.Status = 'updated'
                $row.Details = 'No open recovery PR found after restore (possibly no diff)'
                Write-Host $row.Details
                $summary += [PSCustomObject]$row
                continue
            }

            $mergeArgs = @('pr', 'merge', $prNumber, '-R', $repo, '--squash', '--delete-branch')
            if ($AdminMerge) {
                $mergeArgs += '--admin'
            }

            Invoke-CheckedCommand gh $mergeArgs
            $row.Status = 'merged'
            $row.Details = "Merged PR #$prNumber"
            Write-Host $row.Details
        }
        else {
            $row.Status = 'updated'
            $row.Details = 'Restore completed'
            Write-Host $row.Details
        }
    }
    catch {
        $row.Status = 'failed'
        $row.Details = $_.Exception.Message
        Write-Warning $row.Details
    }

    $summary += [PSCustomObject]$row
}

Write-Host ''
Write-Host 'Summary'
$summary | Format-Table -AutoSize
