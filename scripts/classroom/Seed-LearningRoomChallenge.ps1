[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [string]$Repository,

    [ValidateRange(1, 16)]
    [int]$Challenge = 1,

    [string]$Assignee = ''
)

$ErrorActionPreference = 'Stop'

function Invoke-CheckedCommand {
    param([string]$FilePath, [string[]]$Arguments)
    & $FilePath @Arguments
    if ($LASTEXITCODE -ne 0) {
        throw "Command failed: $FilePath $($Arguments -join ' ')"
    }
}

$fields = @('-f', "start_challenge=$Challenge")
if ($Assignee) {
    $fields += @('-f', "assignee=$Assignee")
}

Write-Host "Triggering student progression workflow in $Repository for Challenge $Challenge..."
$arguments = @('workflow', 'run', 'student-progression.yml', '-R', $Repository) + $fields
Invoke-CheckedCommand gh $arguments

Write-Host "Workflow started. Check the repository Actions tab, then verify the issue list:"
Write-Host "  gh issue list -R $Repository --search \"Challenge $Challenge\""
[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [string]$Repository,

    [ValidateRange(1, 16)]
    [int]$Challenge = 1,

    [string]$Assignee = ''
)

$ErrorActionPreference = 'Stop'

function Invoke-CheckedCommand {
    param([string]$FilePath, [string[]]$Arguments)
    & $FilePath @Arguments
    if ($LASTEXITCODE -ne 0) {
        throw "Command failed: $FilePath $($Arguments -join ' ')"
    }
}

$fields = @('-f', "start_challenge=$Challenge")
if ($Assignee) {
    $fields += @('-f', "assignee=$Assignee")
}

Write-Host "Triggering student progression workflow in $Repository for Challenge $Challenge..."
Invoke-CheckedCommand gh @('workflow', 'run', 'student-progression.yml', '-R', $Repository) + $fields

Write-Host "Workflow started. Check the repository Actions tab, then verify the issue list:"
Write-Host "  gh issue list -R $Repository --search \"Challenge $Challenge\""
