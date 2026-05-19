<#
.SYNOPSIS
    Stage 2.8 composite gate - runs every Stage 2 check.

.DESCRIPTION
    Sequentially runs the full Stage 2 conformance suite:
      1. podcasts/validate-catalog.js
      2. podcasts/validate-listening-order.js
      3. podcasts/tools/episode_map.py (schema + integrity)
      4. scripts/lint-no-hardcoded-slugs.ps1
      5. scripts/test-tooling-conformance.ps1

    Each check must exit 0. The gate exits 0 only when every check passes,
    else 1 with a summary of failures.

.PARAMETER RepoPath
    Repository root. Defaults to the parent of this script's directory.

.EXAMPLE
    pwsh -File scripts/run-stage2-gate.ps1
#>

[CmdletBinding()]
param(
    [string]$RepoPath
)

Set-StrictMode -Version Latest

if ([string]::IsNullOrEmpty($RepoPath)) {
    $scriptDir = if ($PSScriptRoot) { $PSScriptRoot } else { Split-Path -Parent $MyInvocation.MyCommand.Path }
    $RepoPath = (Resolve-Path -LiteralPath (Join-Path $scriptDir '..')).Path
}

$checks = @(
    @{ Name = 'validate-catalog';            Cmd = @('node', (Join-Path $RepoPath 'podcasts\validate-catalog.js')) }
    @{ Name = 'validate-listening-order';    Cmd = @('node', (Join-Path $RepoPath 'podcasts\validate-listening-order.js')) }
    @{ Name = 'episode_map (schema)';        Cmd = @('python', (Join-Path $RepoPath 'podcasts\tools\episode_map.py')) }
    @{ Name = 'lint-no-hardcoded-slugs';     Cmd = @('powershell', '-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', (Join-Path $RepoPath 'scripts\lint-no-hardcoded-slugs.ps1')) }
    @{ Name = 'test-tooling-conformance';    Cmd = @('powershell', '-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', (Join-Path $RepoPath 'scripts\test-tooling-conformance.ps1')) }
)

Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host " Stage 2.8 composite gate ($($checks.Count) checks)" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

$results = New-Object System.Collections.Generic.List[object]
$prevEAP = $ErrorActionPreference
$ErrorActionPreference = 'Continue'

foreach ($check in $checks) {
    $name = $check.Name
    $cmd = $check.Cmd
    Write-Host "[ RUN ] $name" -ForegroundColor White
    Push-Location -LiteralPath $RepoPath
    try {
        & $cmd[0] @($cmd[1..($cmd.Count - 1)]) 2>&1 | ForEach-Object {
            Write-Host "        $_" -ForegroundColor DarkGray
        }
        $exit = $LASTEXITCODE
    } catch {
        $exit = 99
        Write-Host "        EXCEPTION: $($_.Exception.Message)" -ForegroundColor Red
    } finally {
        Pop-Location
    }
    if ($exit -eq 0) {
        Write-Host "[ OK  ] $name" -ForegroundColor Green
    } else {
        Write-Host "[FAIL ] $name (exit $exit)" -ForegroundColor Red
    }
    Write-Host ""
    $results.Add([pscustomobject]@{ Name = $name; Exit = $exit })
}

$ErrorActionPreference = $prevEAP

$failed = @($results | Where-Object { $_.Exit -ne 0 })
Write-Host "============================================================" -ForegroundColor Cyan
if ($failed.Count -eq 0) {
    Write-Host " Stage 2.8 GATE: PASS ($($results.Count)/$($results.Count) green)" -ForegroundColor Green
    Write-Host "============================================================" -ForegroundColor Cyan
    exit 0
} else {
    Write-Host " Stage 2.8 GATE: FAIL ($($failed.Count) of $($results.Count) failed)" -ForegroundColor Red
    foreach ($f in $failed) {
        Write-Host "   - $($f.Name) (exit $($f.Exit))" -ForegroundColor Red
    }
    Write-Host "============================================================" -ForegroundColor Cyan
    exit 1
}
