[CmdletBinding()]
param(
    [string]$Owner = 'Community-Access',
    [string]$TemplateRepo = 'learning-room-template',
    [string]$SmokeRepo = ('learning-room-smoke-test-' + (Get-Date -Format 'yyyyMMddHHmmss')),
    [switch]$KeepSmokeRepo
)

$ErrorActionPreference = 'Stop'

function Invoke-CheckedCommand {
    param([string]$FilePath, [string[]]$Arguments)
    & $FilePath @Arguments
    if ($LASTEXITCODE -ne 0) {
        throw "Command failed: $FilePath $($Arguments -join ' ')"
    }
}

function Wait-ForRepositoryContent {
    param(
        [string]$Repository,
        [int]$MaxAttempts = 12,
        [int]$DelaySeconds = 5
    )

    for ($attempt = 1; $attempt -le $MaxAttempts; $attempt++) {
        $isReady = $false
        try {
            & gh api "repos/$Repository/contents/.github/workflows/student-progression.yml" 1>$null 2>$null
            if ($LASTEXITCODE -eq 0) {
                $isReady = $true
            }
        }
        catch {
            $isReady = $false
        }

        if ($isReady) {
            return
        }

        if ($attempt -lt $MaxAttempts) {
            Write-Host "Template contents not ready yet (attempt $attempt/$MaxAttempts). Retrying in $DelaySeconds seconds..."
            Start-Sleep -Seconds $DelaySeconds
        }
    }

    throw "Repository content did not become available in time for $Repository."
}

function Get-RepositoryFileContent {
    param(
        [string]$Repository,
        [string]$Path
    )

    $file = & gh api "repos/$Repository/contents/$Path" | ConvertFrom-Json
    if ($LASTEXITCODE -ne 0 -or -not $file) {
        throw "Could not read file '$Path' from $Repository."
    }

    return [System.Text.Encoding]::UTF8.GetString(
        [System.Convert]::FromBase64String(($file.content -replace '\s', ''))
    )
}

function Wait-ForIssue {
    param(
        [string]$Repository,
        [string]$TitleContains,
        [int]$MaxAttempts = 18,
        [int]$DelaySeconds = 5
    )

    for ($attempt = 1; $attempt -le $MaxAttempts; $attempt++) {
        $issues = & gh issue list -R $Repository --state all --limit 100 --json number,title
        if ($LASTEXITCODE -eq 0 -and $issues) {
            $parsed = $issues | ConvertFrom-Json
            $match = @($parsed | Where-Object { $_.title -like "*$TitleContains*" }) | Select-Object -First 1
            if ($match) {
                return $match
            }
        }

        if ($attempt -lt $MaxAttempts) {
            Write-Host "Issue '$TitleContains' not found yet (attempt $attempt/$MaxAttempts). Retrying in $DelaySeconds seconds..."
            Start-Sleep -Seconds $DelaySeconds
        }
    }

    throw "Issue containing '$TitleContains' was not created in time for $Repository."
}

$template = "$Owner/$TemplateRepo"
$smoke = "$Owner/$SmokeRepo"

Write-Host "Creating smoke-test repository $smoke from $template..."
Invoke-CheckedCommand gh @('repo', 'create', $smoke, '--private', '--template', $template)

try {
    Write-Host "Waiting for template content to materialize in smoke repository..."
    Wait-ForRepositoryContent -Repository $smoke

    Write-Host "Checking expected template files..."
    $requiredWorkflows = @(
        'pr-validation-bot.yml',
        'content-validation.yml',
        'student-progression.yml',
        'skills-progression.yml',
        'autograder-issue-filed.yml',
        'autograder-branch-commit.yml',
        'autograder-pr-link.yml',
        'autograder-conflicts.yml',
        'autograder-local-commit.yml',
        'autograder-template.yml',
        'autograder-capstone.yml',
        'autograder-watchdog.yml'
    )
    foreach ($wf in $requiredWorkflows) {
        Invoke-CheckedCommand gh @('api', "repos/$smoke/contents/.github/workflows/$wf")
    }
    Invoke-CheckedCommand gh @('api', "repos/$smoke/contents/.github/ISSUE_TEMPLATE/challenge-01-find-your-way.yml")
    Invoke-CheckedCommand gh @('api', "repos/$smoke/contents/.github/scripts/challenge-progression.js")

    Write-Host "Validating skills progression workflow create trigger and first-issue job..."
    $skillsWorkflow = Get-RepositoryFileContent -Repository $smoke -Path '.github/workflows/skills-progression.yml'
    if ($skillsWorkflow -notmatch '(?m)^\s{2}create:\s*$') {
        throw "skills-progression.yml is missing 'create' trigger."
    }
    if ($skillsWorkflow -notmatch '(?m)^\s{2}create-first-issue:\s*$') {
        throw "skills-progression.yml is missing create-first-issue job."
    }
    if ($skillsWorkflow -notmatch '(?m)^\s{4}if:\s+github\.event_name\s*==\s*''create''\s*$') {
        throw "create-first-issue job is missing the create-event guard condition."
    }

    Write-Host "Waiting for auto-created first challenge issue..."
    $firstIssue = Wait-ForIssue -Repository $smoke -TitleContains 'Welcome to Your First Challenge!'
    Write-Host "Detected first issue #$($firstIssue.number): $($firstIssue.title)"

    Write-Host "Triggering Challenge 1 creation..."
    Invoke-CheckedCommand gh @('workflow', 'run', 'student-progression.yml', '-R', $smoke, '-f', 'start_challenge=1')

    Write-Host "Smoke repo created and workflow triggered. Wait about one minute, then verify:"
    Write-Host "  gh issue list -R $smoke --search \"Challenge 1\""
}
finally {
    if (-not $KeepSmokeRepo) {
        Write-Host "Deleting smoke-test repository $smoke..."
        & gh repo delete $smoke --yes
        if ($LASTEXITCODE -ne 0) {
            Write-Warning "Could not delete smoke repository automatically. This does not invalidate smoke validation."
            Write-Warning "Delete manually when convenient: gh repo delete $smoke --yes"
        }
    }
}
