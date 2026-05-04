[CmdletBinding(SupportsShouldProcess)]
param(
    [string]$Owner = 'Community-Access',
    [string]$TemplateRepo = 'learning-room-template',
    [string]$SourcePath = (Join-Path $PSScriptRoot '..\..\learning-room'),
    [string]$BranchName = '',
    [switch]$NoPush
)

$ErrorActionPreference = 'Stop'

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
        $existingPr = & gh pr view $BranchName -R $fullRepo --json url --jq .url 2>$null
        if ($LASTEXITCODE -eq 0 -and $existingPr) {
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
[CmdletBinding(SupportsShouldProcess)]
param(
    [string]$Owner = 'Community-Access',
    [string]$TemplateRepo = 'learning-room-template',
    [string]$SourcePath = (Join-Path $PSScriptRoot '..\..\learning-room'),
    [switch]$NoPush
)

$ErrorActionPreference = 'Stop'

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

Write-Host "Checking GitHub CLI authentication..."
Invoke-CheckedCommand gh @('auth', 'status', '-h', 'github.com')

Write-Host "Ensuring template repository settings..."
Invoke-CheckedCommand gh @('repo', 'edit', $fullRepo, '--enable-issues=true', '--enable-wiki=false', '--template')
Invoke-CheckedCommand gh @('api', "repos/$fullRepo/actions/permissions/workflow", '-X', 'PUT', '-f', 'default_workflow_permissions=write', '-F', 'can_approve_pull_request_reviews=true')

New-Item -ItemType Directory -Path $workRoot | Out-Null
try {
    Write-Host "Cloning $fullRepo..."
    Invoke-CheckedCommand gh @('repo', 'clone', $fullRepo, $clonePath, '--', '--depth', '1')

    Write-Host "Replacing template contents from $source..."
    Get-ChildItem -LiteralPath $clonePath -Force | Where-Object { $_.Name -ne '.git' } | Remove-Item -Recurse -Force
    Get-ChildItem -LiteralPath $source -Force | Where-Object { $_.Name -notin @('.git', 'node_modules') } | ForEach-Object {
        Copy-Item -LiteralPath $_.FullName -Destination (Join-Path $clonePath $_.Name) -Recurse -Force
    }

    Push-Location $clonePath
    try {
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
        Invoke-CheckedCommand git @('push', 'origin', 'HEAD:main')
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
