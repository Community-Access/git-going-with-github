# lint-no-hardcoded-slugs: allow (this file documents the forbidden patterns)
<#
.SYNOPSIS
    Stage 2.5 lint - flag hardcoded episode/appendix/chapter slugs in code.

.DESCRIPTION
    Episode slugs, appendix letters, and chapter numbers are now sourced from
    docs/EPISODE_MAP.json. Any literal slug reference in tooling code is a
    smell: it will rot the moment the map is reordered. This lint scans
    script files (.js, .ts, .py, .ps1, .psm1, .sh, .bat) under known tool
    directories and flags forbidden patterns.

    Forbidden patterns:
        \bep\d{2}\b              episode number slug (e.g. ep00, ep15)
        \bappendix-[a-z]\b       appendix letter slug (e.g. appendix-a)
        \bchapter-\d+\b          chapter number slug (e.g. chapter-5)

    Allowed locations (never scanned):
        docs/EPISODE_MAP.json
        docs/SITE-IA.md
        docs/UPDATING-CONTENT.md
        REORG-PLAN.md
        Any *.md file (show-notes prose)
        podcasts/bundle-config.json (canonical config with narration_id keys)
        podcasts/manifest.json (derived artifact)
        podcasts/scripts/** (legacy narration scripts; not tooling)
        podcasts/transcripts/** (generated)
        podcasts/audio/** (binary)
        podcasts/segments/** (intermediate)
        podcasts/bundles/** (derived bundles)
        podcasts/challenge-bundles/** (derived bundles)

.PARAMETER RepoPath
    Repository root. Defaults to the content repo at
    C:\code\git-going-with-github.

.PARAMETER ExtraRepoPath
    Optional second repo to scan (e.g. C:\code\ggg).

.OUTPUTS
    Writes findings to stdout. Exits 0 on clean, 1 on any violation.

.EXAMPLE
    pwsh -File scripts/lint-no-hardcoded-slugs.ps1
    pwsh -File scripts/lint-no-hardcoded-slugs.ps1 -ExtraRepoPath C:\code\ggg
#>

[CmdletBinding()]
param(
    [string]$RepoPath,
    [string]$ExtraRepoPath
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

if ([string]::IsNullOrEmpty($RepoPath)) {
    $scriptDir = if ($PSScriptRoot) { $PSScriptRoot } else { Split-Path -Parent $MyInvocation.MyCommand.Path }
    $RepoPath = (Resolve-Path -LiteralPath (Join-Path $scriptDir '..')).Path
}

$Forbidden = @(
    @{ Name = 'episode-slug';   Pattern = '\bep\d{2}\b' },
    @{ Name = 'appendix-slug';  Pattern = '\bappendix-[a-z]\b' },
    @{ Name = 'chapter-slug';   Pattern = '\bchapter-\d+\b' }
)

# Glob patterns relative to RepoPath that ARE scanned.
$ScanGlobs = @(
    'scripts/*.js',
    'scripts/*.ps1',
    'scripts/*.psm1',
    'scripts/*.py',
    'scripts/*.sh',
    'scripts/classroom/*.js',
    'scripts/classroom/*.ps1',
    'scripts/classroom/*.py',
    'podcasts/*.js',
    'podcasts/*.py',
    'podcasts/lib/*.js',
    'podcasts/lib/*.py',
    'podcasts/tools/*.py',
    'podcasts/tools/*.js',
    'podcasts/tts/*.py',
    'podcasts/tts/*.js',
    'generator/*.js',
    'generator/*.ps1',
    'generator/*.py'
)

# Paths excluded even if matched by ScanGlobs (relative to RepoPath, forward slashes).
$ExcludePathFragments = @(
    'podcasts/scripts/',
    'podcasts/transcripts/',
    'podcasts/audio/',
    'podcasts/segments/',
    'podcasts/bundles/',
    'podcasts/challenge-bundles/',
    'podcasts/_snapshot-',
    '/node_modules/'
)

function Invoke-SlugLint {
    param(
        [Parameter(Mandatory)][string]$Root
    )

    if (-not (Test-Path -LiteralPath $Root)) {
        Write-Warning "Skipping missing root: $Root"
        return @()
    }

    $resolved = (Resolve-Path -LiteralPath $Root).Path
    $findings = New-Object System.Collections.Generic.List[object]
    $allowMarker = 'lint-no-hardcoded-slugs: allow'

    foreach ($glob in $ScanGlobs) {
        $full = Join-Path $resolved $glob
        $files = Get-ChildItem -Path $full -File -ErrorAction SilentlyContinue
        foreach ($file in $files) {
            $rel = $file.FullName.Substring($resolved.Length).TrimStart('\','/').Replace('\','/')
            $skip = $false
            foreach ($frag in $ExcludePathFragments) {
                if ($rel -like "*$frag*") { $skip = $true; break }
            }
            if ($skip) { continue }

            $lines = @(Get-Content -LiteralPath $file.FullName)
            $head = ($lines | Select-Object -First 20) -join "`n"
            if ($head -match [Regex]::Escape($allowMarker)) { continue }

            $ext = $file.Extension.ToLower()
            $isPy = ($ext -eq '.py')
            $inTriple = $false
            $tripleDelim = $null

            for ($i = 0; $i -lt $lines.Count; $i++) {
                $line = $lines[$i]
                $trim = $line.TrimStart()

                # Update Python triple-quoted string state.
                if ($isPy) {
                    $remaining = $line
                    while ($true) {
                        if ($inTriple) {
                            $idx = $remaining.IndexOf($tripleDelim)
                            if ($idx -lt 0) { break }
                            $remaining = $remaining.Substring($idx + 3)
                            $inTriple = $false
                            $tripleDelim = $null
                        } else {
                            $idx3a = $remaining.IndexOf('"""')
                            $idx3b = $remaining.IndexOf("'''")
                            if ($idx3a -lt 0 -and $idx3b -lt 0) { break }
                            $next = if ($idx3a -ge 0 -and ($idx3b -lt 0 -or $idx3a -lt $idx3b)) { @('"""', $idx3a) } else { @("'''", $idx3b) }
                            $remaining = $remaining.Substring($next[1] + 3)
                            $inTriple = $true
                            $tripleDelim = $next[0]
                        }
                    }
                }

                # Skip lines that are entirely inside a docstring/triple-quoted block.
                # If the line started inside one and is still inside, skip.
                # (We detect "started inside" by checking state before this line; for
                # simplicity we recompute by tracking whether the post-line state is
                # in-triple AND no triple delimiters appeared on this line.)
                $isCommentLine = $trim.StartsWith('#') -or $trim.StartsWith('//') -or $trim.StartsWith('*')
                $isDocstringOnly = $isPy -and $inTriple -and ($line -notmatch '"""' -and $line -notmatch "'''")
                if ($isCommentLine -or $isDocstringOnly) { continue }

                foreach ($rule in $Forbidden) {
                    if ($line -match $rule.Pattern) {
                        $findings.Add([pscustomobject]@{
                            Root    = $resolved
                            File    = $rel
                            Line    = $i + 1
                            Rule    = $rule.Name
                            Pattern = $rule.Pattern
                            Text    = $line.Trim()
                        }) | Out-Null
                    }
                }
            }
        }
    }

    return $findings.ToArray()
}

$all = @()
$all += Invoke-SlugLint -Root $RepoPath
if ($ExtraRepoPath) {
    $all += Invoke-SlugLint -Root $ExtraRepoPath
}

if ($all.Count -eq 0) {
    Write-Host "lint-no-hardcoded-slugs: CLEAN."
    exit 0
}

Write-Host "lint-no-hardcoded-slugs: $($all.Count) violation(s) found." -ForegroundColor Yellow
$grouped = $all | Group-Object -Property Root,File | Sort-Object Name
foreach ($g in $grouped) {
    $first = $g.Group[0]
    Write-Host ""
    Write-Host "  $($first.Root)\$($first.File)" -ForegroundColor Cyan
    foreach ($f in $g.Group) {
        $textPreview = if ($f.Text.Length -gt 110) { $f.Text.Substring(0,107) + '...' } else { $f.Text }
        Write-Host ("    L{0,-5} [{1}] {2}" -f $f.Line, $f.Rule, $textPreview)
    }
}

Write-Host ""
Write-Host "Remediation:" -ForegroundColor Yellow
Write-Host "  Replace literal slug references with map lookups via docs/EPISODE_MAP.json"
Write-Host "  or the helpers in podcasts/tools/episode_map.py / podcasts/lib/episode-map.js."
exit 1
