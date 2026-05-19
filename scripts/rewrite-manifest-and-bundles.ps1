# Stage 3.6 - rewrite podcasts/manifest.json `audio`/`bundle` fields and
# rename matching .md bundle files in podcasts/bundles/ using the audit log
# from rename_audio.py.
#
# Usage:
#   .\scripts\rewrite-manifest-and-bundles.ps1                # dry-run
#   .\scripts\rewrite-manifest-and-bundles.ps1 -Apply         # write

[CmdletBinding()]
param(
    [switch]$Apply,
    [string]$Repo = $null,
    [string]$AuditLog = $null
)

$ErrorActionPreference = 'Stop'

$scriptDir = $PSScriptRoot
if (-not $scriptDir) { $scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path }
$repoDefault = (Resolve-Path (Join-Path $scriptDir '..')).Path
if (-not $Repo) { $Repo = $repoDefault }
if (-not $AuditLog) { $AuditLog = Join-Path $Repo 'tmp-rename-audit.log' }

if (-not (Test-Path $AuditLog)) { throw "Audit log not found: $AuditLog" }
$manifestPath = Join-Path $Repo 'podcasts\manifest.json'
$bundlesDir   = Join-Path $Repo 'podcasts\bundles'
if (-not (Test-Path $manifestPath)) { throw "Manifest not found: $manifestPath" }

# Build pairs: old.mp3 -> new.mp3
$pairs = @{}
foreach ($line in Get-Content -LiteralPath $AuditLog) {
    if ($line -match '^RENAME\s+(\S+\.mp3)\s+(\S+\.mp3)') {
        $oldF = $Matches[1]; $newF = $Matches[2]
        if ($oldF -ne $newF) { $pairs[$oldF] = $newF }
    }
}

Write-Host ("== Stage 3.6 manifest+bundle rewrite ({0}) ==" -f ($(if ($Apply) {'APPLY'} else {'DRY-RUN'})))
Write-Host ("  Pairs:    {0}" -f $pairs.Count)
Write-Host ("  Manifest: {0}" -f $manifestPath)

# Manifest: rewrite audio + bundle fields.
$manifestText = Get-Content -LiteralPath $manifestPath -Raw -Encoding UTF8
$manifest = $manifestText | ConvertFrom-Json
$manifestChanges = 0
foreach ($ep in $manifest) {
    if (-not $ep.audio) { continue }
    if (-not $pairs.ContainsKey($ep.audio)) { continue }
    $newAudio = $pairs[$ep.audio]
    $newBundle = $newAudio -replace '\.mp3$','.md'
    if ($ep.audio -ne $newAudio) { $ep.audio = $newAudio; $manifestChanges++ }
    if ($ep.bundle -and $ep.bundle -ne $newBundle) { $ep.bundle = $newBundle }
}

Write-Host ("  Manifest entries updated: {0}" -f $manifestChanges)

# Bundles: rename .md files for each pair.
$bundleRenames = @()
foreach ($k in $pairs.Keys) {
    $oldMd = $k -replace '\.mp3$','.md'
    $newMd = $pairs[$k] -replace '\.mp3$','.md'
    $oldPath = Join-Path $bundlesDir $oldMd
    $newPath = Join-Path $bundlesDir $newMd
    if (Test-Path $oldPath) {
        $bundleRenames += [pscustomobject]@{ Old=$oldPath; New=$newPath; OldName=$oldMd; NewName=$newMd }
    }
}
Write-Host ("  Bundle files to rename: {0}" -f $bundleRenames.Count)

if ($Apply) {
    # Write manifest pretty (2-space indent to match existing convention).
    $newJson = $manifest | ConvertTo-Json -Depth 20
    Set-Content -LiteralPath $manifestPath -Value $newJson -Encoding UTF8
    Write-Host "  Manifest written."

    foreach ($r in $bundleRenames) {
        if (Test-Path $r.New) {
            Write-Warning ("  SKIP (target exists): {0} -> {1}" -f $r.OldName, $r.NewName)
            continue
        }
        # Bundles are gitignored; use Move-Item (git mv would fail on untracked).
        Move-Item -LiteralPath $r.Old -Destination $r.New -Force
    }
    Write-Host "  Bundles renamed."
} else {
    Write-Host ""
    Write-Host "DRY-RUN only. Re-run with -Apply to write."
}
