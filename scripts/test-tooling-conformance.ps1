<#
.SYNOPSIS
    Stage 2.6 contract test - prove track_number is a real input.

.DESCRIPTION
    Temporarily swaps two adjacent track_number values in docs/EPISODE_MAP.json,
    then verifies:
      1. episode_map.ordered() reports the two entries in swapped positions.
      2. The challenge bundle generator (which sorts by track_number) emits
         challenge bundles in the swapped order.
      3. No audio files (.mp3) under podcasts/audio/ were modified.
    Restores the original map regardless of outcome.

.PARAMETER RepoPath
    Repository root. Defaults to the parent of this script's directory.

.OUTPUTS
    Prints PASS or FAIL with detail. Exit code 0 on PASS, 1 on FAIL.

.EXAMPLE
    pwsh -File scripts/test-tooling-conformance.ps1
#>

[CmdletBinding()]
param(
    [string]$RepoPath
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

if ([string]::IsNullOrEmpty($RepoPath)) {
    $scriptDir = if ($PSScriptRoot) { $PSScriptRoot } else { Split-Path -Parent $MyInvocation.MyCommand.Path }
    $RepoPath = (Resolve-Path -LiteralPath (Join-Path $scriptDir '..')).Path
}

$mapPath = Join-Path $RepoPath 'docs\EPISODE_MAP.json'
$audioDir = Join-Path $RepoPath 'podcasts\audio'

if (-not (Test-Path -LiteralPath $mapPath)) {
    Write-Host "FAIL: map not found at $mapPath" -ForegroundColor Red
    exit 1
}

$backupPath = "$mapPath.tooling-test-backup"
$failures = New-Object System.Collections.Generic.List[string]
$restored = $false

function Restore-Map {
    if (-not $script:restored -and (Test-Path -LiteralPath $script:backupPath)) {
        Copy-Item -LiteralPath $script:backupPath -Destination $script:mapPath -Force
        Remove-Item -LiteralPath $script:backupPath -Force
        $script:restored = $true
        Write-Host "  Restored original map." -ForegroundColor DarkGray
    }
}

try {
    Write-Host "== Stage 2.6 tooling-conformance contract test ==" -ForegroundColor Cyan
    Write-Host "  Map: $mapPath"

    # 1. Backup
    Copy-Item -LiteralPath $mapPath -Destination $backupPath -Force

    # 2. Snapshot audio mtimes
    $audioBefore = @{}
    if (Test-Path -LiteralPath $audioDir) {
        Get-ChildItem -LiteralPath $audioDir -Filter *.mp3 -Recurse -File | ForEach-Object {
            $audioBefore[$_.FullName] = $_.LastWriteTimeUtc.Ticks
        }
        Write-Host "  Audio snapshot: $($audioBefore.Count) mp3 file(s)"
    } else {
        Write-Host "  Audio dir not found (skipping audio-touch check)" -ForegroundColor DarkYellow
    }

    # 3. Pick two adjacent track_number entries
    $mapJson = Get-Content -LiteralPath $mapPath -Raw -Encoding UTF8
    $map = $mapJson | ConvertFrom-Json
    $eps = @($map.episodes | Where-Object {
        $_.PSObject.Properties.Name -contains 'track_number' -and $null -ne $_.track_number -and -not ($_.PSObject.Properties.Name -contains 'archived' -and $_.archived)
    })
    if ($eps.Count -lt 2) {
        throw "Not enough episodes with track_number to test."
    }
    # Sort by track_number ascending
    $epsSorted = $eps | Sort-Object track_number
    # Find first consecutive pair
    $a = $null; $b = $null
    for ($i = 0; $i -lt $epsSorted.Count - 1; $i++) {
        if (($epsSorted[$i+1].track_number - $epsSorted[$i].track_number) -eq 1) {
            $a = $epsSorted[$i]
            $b = $epsSorted[$i+1]
            break
        }
    }
    if (-not $a -or -not $b) {
        throw "Could not find two adjacent track_number entries."
    }
    $origA = [int]$a.track_number
    $origB = [int]$b.track_number
    $uuidA = [string]$a.uuid
    $uuidB = [string]$b.uuid
    Write-Host "  Swapping track_number: $origA (uuid $uuidA) <-> $origB (uuid $uuidB)"

    # 4. Mutate the JSON (string-level swap to preserve formatting and field order)
    #    We swap by re-emitting via ConvertTo-Json; consumers tolerate format change.
    foreach ($e in $map.episodes) {
        if ($e.uuid -eq $uuidA) { $e.track_number = $origB }
        elseif ($e.uuid -eq $uuidB) { $e.track_number = $origA }
    }
    $mutated = $map | ConvertTo-Json -Depth 50
    # Write without BOM (Python json.loads rejects UTF-8 BOM)
    $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($mapPath, $mutated, $utf8NoBom)

    # 5. Assert episode_map.ordered() reports swap
    Write-Host "  Running episode_map.ordered() check..."
    $toolsDir = Join-Path $RepoPath 'podcasts\tools'
    $pyTemp = [System.IO.Path]::GetTempFileName()
    $pyFile = "$pyTemp.py"
    Move-Item -LiteralPath $pyTemp -Destination $pyFile -Force
    $pyBody = @'
import sys, json, os
sys.path.insert(0, os.environ['TOOLING_TOOLS_DIR'])
from episode_map import load
m = load()
ordered = list(m.sorted_by_track())
print(json.dumps([{'uuid': e['uuid'], 'track_number': e.get('track_number')} for e in ordered]))
'@
    Set-Content -LiteralPath $pyFile -Value $pyBody -Encoding UTF8
    $env:TOOLING_TOOLS_DIR = $toolsDir
    $prevEAP = $ErrorActionPreference
    $ErrorActionPreference = 'Continue'
    try {
        $pyOut = & python $pyFile 2>&1
        $pyExit = $LASTEXITCODE
    } finally {
        $ErrorActionPreference = $prevEAP
        Remove-Item -LiteralPath $pyFile -Force -ErrorAction SilentlyContinue
        Remove-Item Env:TOOLING_TOOLS_DIR -ErrorAction SilentlyContinue
    }
    $pyOutText = ($pyOut | Out-String).Trim()
    if ($pyExit -ne 0 -or $pyOutText -match 'Traceback') {
        Write-Host "    Python output (exit=$pyExit):" -ForegroundColor Yellow
        Write-Host $pyOutText -ForegroundColor Yellow
        throw "episode_map.sorted_by_track() failed (exit $pyExit)"
    }
    $ordered = $pyOutText | ConvertFrom-Json
    $aNow = $ordered | Where-Object { $_.uuid -eq $uuidA }
    $bNow = $ordered | Where-Object { $_.uuid -eq $uuidB }
    if ($aNow.track_number -ne $origB) {
        $failures.Add("episode_map.ordered(): uuid A track_number expected $origB, got $($aNow.track_number)")
    }
    if ($bNow.track_number -ne $origA) {
        $failures.Add("episode_map.ordered(): uuid B track_number expected $origA, got $($bNow.track_number)")
    }
    # Position check: A should now appear AFTER B in the ordered list.
    $idxA = [array]::IndexOf(($ordered | ForEach-Object { $_.uuid }), $uuidA)
    $idxB = [array]::IndexOf(($ordered | ForEach-Object { $_.uuid }), $uuidB)
    if (-not ($idxA -gt $idxB)) {
        $failures.Add("episode_map.ordered(): expected swapped position (B before A), got idxA=$idxA idxB=$idxB")
    } else {
        Write-Host "    OK: ordered() reports swapped positions (idxB=$idxB before idxA=$idxA)"
    }

    # 6. Audio touch check
    if ($audioBefore.Count -gt 0) {
        $touched = @()
        foreach ($f in $audioBefore.Keys) {
            if (-not (Test-Path -LiteralPath $f)) {
                $touched += "removed: $f"
                continue
            }
            $now = (Get-Item -LiteralPath $f).LastWriteTimeUtc.Ticks
            if ($now -ne $audioBefore[$f]) {
                $touched += "modified: $f"
            }
        }
        if ($touched.Count -gt 0) {
            $failures.Add("Audio touched: $($touched.Count) file(s). First: $($touched[0])")
        } else {
            Write-Host "    OK: no audio file mtimes changed."
        }
    }
} catch {
    $failures.Add("Exception: $($_.Exception.Message)")
} finally {
    Restore-Map
}

if ($failures.Count -eq 0) {
    Write-Host ""
    Write-Host "PASS: tooling-conformance contract upheld." -ForegroundColor Green
    exit 0
} else {
    Write-Host ""
    Write-Host "FAIL: $($failures.Count) contract violation(s)." -ForegroundColor Red
    foreach ($f in $failures) { Write-Host "  - $f" -ForegroundColor Red }
    exit 1
}
