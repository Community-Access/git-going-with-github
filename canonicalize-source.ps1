<#
.SYNOPSIS
  Rename source repo's legacy ep##-<slug> files to canonical names from
  docs/EPISODE_MAP.json. Idempotent. Use -DryRun to preview.

.DESCRIPTION
  Mirrors c:\code\ggg\canonicalize-site.ps1 on the deploy side. Renames:
    - podcasts/scripts/chapters/ep##-*.txt
    - podcasts/scripts/appendices/ep##-*.txt
    - podcasts/transcripts/chapters/ep##-*-chapters.json
    - podcasts/transcripts/chapters/ep##-*-segments.json
    - podcasts/transcripts/appendices/ep##-*-chapters.json
    - podcasts/transcripts/appendices/ep##-*-segments.json

  Skips podcasts/bundles/ -- already canonical.
  Does NOT regenerate HTML; run scripts/build-html.js after to refresh
  html/docs/*.html companion sections.

.PARAMETER DryRun
  Print planned operations without renaming.
#>
[CmdletBinding()]
param(
    [switch]$DryRun
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$Root = $PSScriptRoot
$EpisodeMapPath = Join-Path $Root 'docs\EPISODE_MAP.json'
$ScriptsRoot = Join-Path $Root 'podcasts\scripts'
$TranscriptsRoot = Join-Path $Root 'podcasts\transcripts'

if (-not (Test-Path $EpisodeMapPath)) {
    throw "Episode map not found: $EpisodeMapPath"
}

Write-Host "== Loading canonical map from EPISODE_MAP.json =="
$epMap = (Get-Content $EpisodeMapPath -Raw | ConvertFrom-Json)
$narrationToCanonical = @{}
foreach ($ep in $epMap.episodes) {
    if ($ep.group -ne 'ep') { continue }
    $canonical = $ep.filename -replace '\.mp3$', ''
    $narrationToCanonical[$ep.narration_id] = $canonical
}
Write-Host ("Loaded {0} narration_id -> canonical mappings" -f $narrationToCanonical.Count)

function Get-CanonicalBase {
    param([string]$LegacyBaseName)
    # Parse leading 'ep##' from a name like 'ep00-welcome' or 'ep00-welcome-chapters'
    if ($LegacyBaseName -match '^(ep\d{2,})-') {
        $narration = $matches[1]
        if ($narrationToCanonical.ContainsKey($narration)) {
            return $narrationToCanonical[$narration]
        }
    }
    return $null
}

function Invoke-CanonicalRename {
    param(
        [string]$Dir,
        [string]$Filter,
        [string[]]$KeepSuffixes
    )
    if (-not (Test-Path $Dir)) {
        Write-Host "  (skip, not present) $Dir"
        return @{ planned = 0; done = 0; skipped = 0 }
    }
    $stats = @{ planned = 0; done = 0; skipped = 0; unmapped = @() }
    Get-ChildItem $Dir -Filter $Filter | ForEach-Object {
        $base = $_.BaseName
        $ext = $_.Extension
        # Detect suffix like '-chapters' / '-segments'
        $suffix = ''
        $core = $base
        foreach ($s in $KeepSuffixes) {
            if ($base.EndsWith($s)) {
                $suffix = $s
                $core = $base.Substring(0, $base.Length - $s.Length)
                break
            }
        }
        $canonical = Get-CanonicalBase $core
        if (-not $canonical) {
            # Not a legacy ep##-* file (might already be canonical)
            if ($core -match '^(ch|ref|tools|git|a11y|agents|sec|cc)-\d+-') {
                $stats.skipped++
            } else {
                $stats.unmapped += $_.Name
            }
            return
        }
        $newName = "$canonical$suffix$ext"
        $newPath = Join-Path $Dir $newName
        if ($newName -eq $_.Name) {
            $stats.skipped++
            return
        }
        $stats.planned++
        if (Test-Path $newPath) {
            Write-Host ("  CONFLICT: {0} -> {1} (target already exists)" -f $_.Name, $newName) -ForegroundColor Yellow
            return
        }
        if ($DryRun) {
            Write-Host ("  DRY: {0} -> {1}" -f $_.Name, $newName)
        } else {
            Rename-Item -LiteralPath $_.FullName -NewName $newName
            Write-Host ("  RENAME: {0} -> {1}" -f $_.Name, $newName)
            $stats.done++
        }
    }
    if ($stats.unmapped.Count -gt 0) {
        Write-Host ("  UNMAPPED ({0}):" -f $stats.unmapped.Count) -ForegroundColor Yellow
        $stats.unmapped | ForEach-Object { Write-Host "    $_" }
    }
    return $stats
}

Write-Host ""
Write-Host "== podcasts/scripts/chapters =="
$s1 = Invoke-CanonicalRename -Dir (Join-Path $ScriptsRoot 'chapters') -Filter '*.txt' -KeepSuffixes @()
Write-Host ("  planned={0} done={1} skipped={2}" -f $s1.planned, $s1.done, $s1.skipped)

Write-Host ""
Write-Host "== podcasts/scripts/appendices =="
$s2 = Invoke-CanonicalRename -Dir (Join-Path $ScriptsRoot 'appendices') -Filter '*.txt' -KeepSuffixes @()
Write-Host ("  planned={0} done={1} skipped={2}" -f $s2.planned, $s2.done, $s2.skipped)

Write-Host ""
Write-Host "== podcasts/transcripts/chapters =="
$s3 = Invoke-CanonicalRename -Dir (Join-Path $TranscriptsRoot 'chapters') -Filter '*.json' -KeepSuffixes @('-chapters','-segments')
Write-Host ("  planned={0} done={1} skipped={2}" -f $s3.planned, $s3.done, $s3.skipped)

Write-Host ""
Write-Host "== podcasts/transcripts/appendices =="
$s4 = Invoke-CanonicalRename -Dir (Join-Path $TranscriptsRoot 'appendices') -Filter '*.json' -KeepSuffixes @('-chapters','-segments')
Write-Host ("  planned={0} done={1} skipped={2}" -f $s4.planned, $s4.done, $s4.skipped)

Write-Host ""
$totalPlanned = $s1.planned + $s2.planned + $s3.planned + $s4.planned
$totalDone = $s1.done + $s2.done + $s3.done + $s4.done
Write-Host ("== SUMMARY ==  planned={0}  done={1}" -f $totalPlanned, $totalDone)

if ($DryRun) {
    Write-Host ""
    Write-Host "Dry run only. Re-run without -DryRun to apply." -ForegroundColor Cyan
}
