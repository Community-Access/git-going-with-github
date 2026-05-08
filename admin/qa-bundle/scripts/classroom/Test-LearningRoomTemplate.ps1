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

$template = "$Owner/$TemplateRepo"
$smoke = "$Owner/$SmokeRepo"

Write-Host "Creating smoke-test repository $smoke from $template..."
Invoke-CheckedCommand gh @('repo', 'create', $smoke, '--private', '--template', $template)

try {
    Write-Host "Checking expected template files..."
    Invoke-CheckedCommand gh @('api', "repos/$smoke/contents/.github/workflows/student-progression.yml")
    Invoke-CheckedCommand gh @('api', "repos/$smoke/contents/.github/ISSUE_TEMPLATE/challenge-01-find-your-way.yml")
    Invoke-CheckedCommand gh @('api', "repos/$smoke/contents/.github/scripts/challenge-progression.js")

    Write-Host "Triggering Challenge 1 creation..."
    Invoke-CheckedCommand gh @('workflow', 'run', 'student-progression.yml', '-R', $smoke, '-f', 'start_challenge=1')

    Write-Host "Smoke repo created and workflow triggered. Wait about one minute, then verify:"
    Write-Host "  gh issue list -R $smoke --search \"Challenge 1\""
}
finally {
    if (-not $KeepSmokeRepo) {
        Write-Host "Deleting smoke-test repository $smoke..."
        Invoke-CheckedCommand gh @('repo', 'delete', $smoke, '--yes')
    }
}
