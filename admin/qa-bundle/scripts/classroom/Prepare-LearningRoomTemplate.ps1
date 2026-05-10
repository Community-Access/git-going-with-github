[CmdletBinding(SupportsShouldProcess)]
param(
    [string]$Owner = 'Community-Access',
    [string]$TemplateRepo = 'learning-room-template',
    [string]$SourcePath = '',
    [string]$BranchName = '',
    [switch]$NoPush,
    [switch]$SkipSourceValidation
)

$ErrorActionPreference = 'Stop'

$scriptDir = if ($PSScriptRoot) { $PSScriptRoot } else { Split-Path -Parent $MyInvocation.MyCommand.Path }

if (-not $SourcePath) {
    $SourcePath = Join-Path $scriptDir '..\..\learning-room'
}

function Invoke-CheckedCommand {
    param([string]$FilePath, [string[]]$Arguments)
    & $FilePath @Arguments
    if ($LASTEXITCODE -ne 0) {
        throw "Command failed: $FilePath $($Arguments -join ' ')"
    }
}

$fullRepo = "$Owner/$TemplateRepo"
$source = Resolve-Path $SourcePath
$workRoot = Join-Path ([IO.Path]::GetTempPath()) ("learning-room-template-sync-" + [guid]::NewGuid())
$clonePath = Join-Path $workRoot $TemplateRepo
if (-not $BranchName) {
    $BranchName = 'sync/learning-room-template-' + (Get-Date -Format 'yyyyMMddHHmmss')
}

if (-not $SkipSourceValidation) {
    $validatorPath = Join-Path $scriptDir 'Validate-LearningRoomTemplateSource.ps1'
    if (-not (Test-Path -LiteralPath $validatorPath -PathType Leaf)) {
        throw "Source validator script was not found: $validatorPath"
    }

    Write-Host "Validating Learning Room source before sync..."
    & $validatorPath -SourcePath $source.Path
}
else {
    Write-Warning "SkipSourceValidation was set. Proceeding without source sanity checks."
}

Write-Host "Checking GitHub CLI authentication..."
Invoke-CheckedCommand gh @('auth', 'status', '-h', 'github.com')

Write-Host "Ensuring template repository settings..."
Invoke-CheckedCommand gh @('repo', 'edit', $fullRepo, '--enable-issues=true', '--enable-wiki=false', '--template')
& gh api "repos/$fullRepo/actions/permissions/workflow" -X PUT -f default_workflow_permissions=write -F can_approve_pull_request_reviews=true
if ($LASTEXITCODE -ne 0) {
    Write-Warning "Could not set repository workflow write permissions. This is commonly controlled at the organization level. Verify Actions workflow permissions in organization settings before the workshop."
}

New-Item -ItemType Directory -Path $workRoot | Out-Null
try {
    Write-Host "Cloning $fullRepo..."
    Invoke-CheckedCommand gh @('repo', 'clone', $fullRepo, $clonePath, '--', '--depth', '1')

    Push-Location $clonePath
    try {
        Invoke-CheckedCommand git @('checkout', '-B', $BranchName)
    }
    finally {
        Pop-Location
    }

    Write-Host "Replacing template contents from $source..."
    Get-ChildItem -LiteralPath $clonePath -Force | Where-Object { $_.Name -ne '.git' } | Remove-Item -Recurse -Force
    Get-ChildItem -LiteralPath $source -Force | Where-Object { $_.Name -notin @('.git', 'node_modules') } | ForEach-Object {
        Copy-Item -LiteralPath $_.FullName -Destination (Join-Path $clonePath $_.Name) -Recurse -Force
    }

    Push-Location $clonePath
    try {
        $gitEmail = (git config user.email 2>$null)
        $gitName = (git config user.name 2>$null)
        if (-not $gitEmail -or -not $gitName) {
            $login = (& gh api /user --jq '.login' 2>$null)
            if (-not $login) {
                $login = 'github-actions'
            }
            $fallbackEmail = "$login@users.noreply.github.com"
            if (-not $gitName) {
                Invoke-CheckedCommand git @('config', 'user.name', $login)
            }
            if (-not $gitEmail) {
                Invoke-CheckedCommand git @('config', 'user.email', $fallbackEmail)
            }
        }

        Invoke-CheckedCommand git @('add', '-A')
        $status = git status --short
        if (-not $status) {
            Write-Host "No template changes to commit."
            return
        }

        Write-Host "Template changes detected:"
        $status | ForEach-Object { Write-Host $_ }

        if ($NoPush) {
            Write-Host "NoPush was set. Leaving changes uncommitted in $clonePath for inspection."
            return
        }

        Invoke-CheckedCommand git @('commit', '-m', 'chore: sync learning room template')
        Invoke-CheckedCommand git @('push', '--force', '-u', 'origin', "HEAD:$BranchName")
        $existingPr = $null
        try {
            $existingPr = & gh pr view $BranchName -R $fullRepo --json url --jq .url 2>$null
        }
        catch {
            $existingPr = $null
        }
        if ($existingPr) {
            Write-Host "Updated existing pull request: $existingPr"
        }
        else {
            Invoke-CheckedCommand gh @(
                'pr', 'create',
                '-R', $fullRepo,
                '--base', 'main',
                '--head', $BranchName,
                '--title', 'Sync Learning Room template for May cohort',
                '--body', 'Syncs the Learning Room template from the curriculum repository. Adds the numbered challenge issue templates, student-progression workflow, Aria feedback updates, and current sample files for the May 2026 cohort.'
            )
        }
    }
    finally {
        Pop-Location
    }
}
finally {
    if (-not $NoPush -and (Test-Path $workRoot)) {
        Remove-Item -LiteralPath $workRoot -Recurse -Force
    }
}

Write-Host "Learning Room template is synced and ready."
