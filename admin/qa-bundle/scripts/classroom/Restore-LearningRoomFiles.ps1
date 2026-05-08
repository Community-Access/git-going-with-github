[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [string]$StudentRepository,

    [string]$TemplateRepository = 'Community-Access/learning-room-template',

    [string]$TemplateRef = 'main',

    [ValidateSet('core-day1', 'core-day2', 'automation-core', 'all-core', 'custom')]
    [string]$Profile = 'core-day1',

    [string[]]$Paths = @(),

    [string]$BranchName = '',

    [string]$CommitMessage = 'fix(recovery): restore learning-room files from template baseline',

    [switch]$OpenPullRequest,

    [switch]$KeepClone
)

$ErrorActionPreference = 'Stop'

function Invoke-CheckedCommand {
    param([string]$FilePath, [string[]]$Arguments)

    & $FilePath @Arguments
    if ($LASTEXITCODE -ne 0) {
        throw "Command failed: $FilePath $($Arguments -join ' ')"
    }
}

function Get-ProfilePaths {
    param(
        [string]$SelectedProfile,
        [string[]]$CustomPaths
    )

    $profileMap = @{
        'core-day1' = @(
            'docs/welcome.md',
            'docs/keyboard-shortcuts.md',
            'docs/setup-guide.md'
        )
        'core-day2' = @(
            'docs/samples/copilot-improvement-before.md',
            'docs/samples/peer-review-practice.md'
        )
        'automation-core' = @(
            '.github/workflows/pr-validation-bot.yml',
            '.github/workflows/content-validation.yml',
            '.github/workflows/student-progression.yml',
            '.github/workflows/skills-progression.yml',
            '.github/workflows/autograder-conflicts.yml',
            '.github/workflows/autograder-local-commit.yml',
            '.github/workflows/autograder-template.yml',
            '.github/workflows/autograder-capstone.yml'
        )
    }

    if ($SelectedProfile -eq 'custom') {
        if (-not $CustomPaths -or $CustomPaths.Count -eq 0) {
            throw 'Profile custom requires -Paths with at least one repository-relative file path.'
        }
        return $CustomPaths
    }

    if ($SelectedProfile -eq 'all-core') {
        $all = @()
        $all += $profileMap['core-day1']
        $all += $profileMap['core-day2']
        $all += $profileMap['automation-core']
        return $all | Select-Object -Unique
    }

    return $profileMap[$SelectedProfile]
}

function Get-DefaultBranch {
    param([string]$Repository)

    $branch = (& gh repo view $Repository --json defaultBranchRef --jq '.defaultBranchRef.name').Trim()
    if (-not $branch) {
        throw "Could not resolve default branch for $Repository"
    }

    return $branch
}

Write-Host "Checking GitHub CLI authentication..."
Invoke-CheckedCommand gh @('auth', 'status', '-h', 'github.com')

$selectedPaths = Get-ProfilePaths -SelectedProfile $Profile -CustomPaths $Paths
if (-not $selectedPaths -or $selectedPaths.Count -eq 0) {
    throw 'No files selected for restore operation.'
}

$defaultBranch = Get-DefaultBranch -Repository $StudentRepository
if (-not $BranchName) {
    $BranchName = 'recovery/restore-learning-room-' + (Get-Date -Format 'yyyyMMddHHmmss')
}

Write-Host "Student repository: $StudentRepository"
Write-Host "Template repository: $TemplateRepository"
Write-Host "Template ref: $TemplateRef"
Write-Host "Restore profile: $Profile"
Write-Host "Files to restore:"
$selectedPaths | ForEach-Object { Write-Host " - $_" }

$workRoot = Join-Path ([IO.Path]::GetTempPath()) ("learning-room-recovery-" + [guid]::NewGuid())
$clonePath = Join-Path $workRoot 'student-repo'

New-Item -ItemType Directory -Path $workRoot | Out-Null

try {
    Write-Host "Cloning student repository..."
    Invoke-CheckedCommand gh @('repo', 'clone', $StudentRepository, $clonePath, '--', '--depth', '1')

    Push-Location $clonePath
    try {
        Write-Host "Adding template remote and fetching template baseline..."
        Invoke-CheckedCommand git @('remote', 'add', 'template', "https://github.com/$TemplateRepository.git")
        Invoke-CheckedCommand git @('fetch', 'template', $TemplateRef, '--depth', '1')

        Write-Host "Creating recovery branch from origin/$defaultBranch..."
        Invoke-CheckedCommand git @('checkout', '-B', $BranchName, "origin/$defaultBranch")

        foreach ($file in $selectedPaths) {
            Write-Host "Restoring $file from template/$TemplateRef"
            # Validate file exists in template ref before attempting checkout.
            & git cat-file -e "template/$TemplateRef`:$file"
            if ($LASTEXITCODE -ne 0) {
                throw "File '$file' not found in template repository at ref '$TemplateRef'."
            }

            Invoke-CheckedCommand git @('checkout', "template/$TemplateRef", '--', $file)
        }

        Invoke-CheckedCommand git @('add', '--', $selectedPaths)

        $status = git status --short
        if (-not $status) {
            Write-Host 'No changes detected after restore. Files already match template baseline.'
            return
        }

        Write-Host 'Changes to be committed:'
        $status | ForEach-Object { Write-Host $_ }

        Invoke-CheckedCommand git @('commit', '-m', $CommitMessage)
        Invoke-CheckedCommand git @('push', '--force', '-u', 'origin', $BranchName)

        Write-Host "Recovery branch pushed: $BranchName"

        if ($OpenPullRequest) {
            $body = @"
This recovery PR restores selected Learning Room files from the canonical template baseline.

- Template source: $TemplateRepository
- Template ref: $TemplateRef
- Profile: $Profile
- Restored file count: $($selectedPaths.Count)

Use this PR when student repository files were accidentally corrupted and need a safe facilitator-reviewed reset.
"@

            Invoke-CheckedCommand gh @(
                'pr', 'create',
                '-R', $StudentRepository,
                '--base', $defaultBranch,
                '--head', $BranchName,
                '--title', 'Recovery: restore Learning Room files to template baseline',
                '--body', $body
            )
        }
    }
    finally {
        Pop-Location
    }
}
finally {
    if (-not $KeepClone -and (Test-Path $workRoot)) {
        Remove-Item -LiteralPath $workRoot -Recurse -Force
    }
}

Write-Host 'Restore operation complete.'
