[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [string]$Repository,

    [Parameter(Mandatory = $true)]
    [string]$StudentBranch,

    [string]$FilePath = 'docs/welcome.md',

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

Invoke-CheckedCommand gh @('auth', 'status', '-h', 'github.com')

$workRoot = Join-Path ([IO.Path]::GetTempPath()) ("merge-conflict-" + [guid]::NewGuid())
$clonePath = Join-Path $workRoot 'repo'
New-Item -ItemType Directory -Path $workRoot | Out-Null

try {
    Invoke-CheckedCommand gh @('repo', 'clone', $Repository, $clonePath)
    Push-Location $clonePath
    try {
        Invoke-CheckedCommand git @('config', 'user.name', 'Aria Workshop Bot')
        Invoke-CheckedCommand git @('config', 'user.email', 'aria-bot@users.noreply.github.com')
        Invoke-CheckedCommand git @('fetch', 'origin', $StudentBranch)
        Invoke-CheckedCommand git @('checkout', 'main')
        Invoke-CheckedCommand git @('pull', '--ff-only', 'origin', 'main')

        $target = Join-Path $clonePath $FilePath
        if (-not (Test-Path $target)) {
            throw "Cannot find $FilePath in $Repository."
        }

        $text = Get-Content -Raw $target
        $replacement = 'Contributors come from many backgrounds, skill levels, countries, and access needs. People who use assistive technology bring practical insight that helps projects work better for everyone.'
        $pattern = '\[TODO: Add a paragraph explaining that contributors come from all backgrounds, skill levels, and countries\. Emphasize that using assistive technology is not a barrier to contribution - in fact, AT users bring a perspective that improves projects for everyone\.\]'
        if ($text -match $pattern) {
            $text = [regex]::Replace($text, $pattern, $replacement, 1)
        }
        else {
            $text = $text + "`n`n## Facilitator Conflict Seed`n`n$replacement`n"
        }

        [IO.File]::WriteAllText($target, $text, [Text.Encoding]::UTF8)
        Invoke-CheckedCommand git @('add', $FilePath)
        $changes = git status --short
        if (-not $changes) {
            Write-Host "No changes needed on main. A conflict may already have been seeded."
            return
        }

        Invoke-CheckedCommand git @('commit', '-m', 'Seed merge conflict practice')
        Invoke-CheckedCommand git @('push', 'origin', 'main')

        Write-Host "Merge conflict seed pushed to main."
        Write-Host "Ask the student to update or inspect their PR from branch '$StudentBranch'. If they edited the same TODO line, GitHub should report a conflict."
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
