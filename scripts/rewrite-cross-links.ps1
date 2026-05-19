# Stage 3.5 - cross-link rewriter.
#
# Conservative rewriter that updates references to renamed audio files and
# their slugs across markdown, HTML, and prose files in BOTH repos. To keep
# narrative text intact ("Chapter 5 explains..."), we ONLY rewrite tokens
# that look like filenames, slugs in URL paths, or slugs in code spans /
# quoted strings.
#
# Patterns rewritten:
#   1. Exact mp3 filename matches:  ep00-welcome.mp3  -> ch-00-welcome.mp3
#   2. Slug inside a path segment:  /ep00-welcome     -> /ch-00-welcome
#   3. Slug inside a code span:     `ep00-welcome`    -> `ch-00-welcome`
#   4. Slug inside double quotes:   "ep00-welcome"    -> "ch-00-welcome"
#   5. Slug at line/word boundary followed by . or - extension/path:
#                                   ep00-welcome.md   -> ch-00-welcome.md
#
# Usage:
#   .\scripts\rewrite-cross-links.ps1                 # dry-run (default)
#   .\scripts\rewrite-cross-links.ps1 -Apply          # write changes
#   .\scripts\rewrite-cross-links.ps1 -Repo c:\code\ggg
#   .\scripts\rewrite-cross-links.ps1 -ReportPath tmp-crosslink-diff.txt

# lint-no-hardcoded-slugs: allow (Stage 3 cutover tooling; reads slug values from the map)

[CmdletBinding()]
param(
    [string]$Repo = $null,
    [string]$MapPath = $null,
    [switch]$Apply,
    [string]$ReportPath = "tmp-crosslink-rewrite-report.txt"
)

$ErrorActionPreference = 'Stop'

$scriptDir = $PSScriptRoot
if (-not $scriptDir) { $scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path }
$repoDefault = (Resolve-Path (Join-Path $scriptDir '..')).Path

if (-not $Repo) { $Repo = $repoDefault }
if (-not $MapPath) { $MapPath = Join-Path $repoDefault 'docs\EPISODE_MAP.json' }

# Sanity: bail if Repo resolves to a drive root.
if ($Repo -match '^[A-Za-z]:\\?$') {
    throw "Refusing to scan drive root: $Repo. Pass an explicit -Repo path."
}
if (-not (Test-Path $MapPath)) { throw "Map not found: $MapPath" }
if (-not (Test-Path $Repo)) { throw "Repo not found: $Repo" }

$mapJson = Get-Content -LiteralPath $MapPath -Raw -Encoding UTF8 | ConvertFrom-Json

# Build (oldFilename, newFilename) and (oldSlug, newSlug) pairs.
$pairs = @()
foreach ($e in $mapJson.episodes) {
    $cur = $e.current_filename
    $new = $e.filename
    if (-not $cur -or -not $new -or $cur -eq $new) { continue }
    $curSlug = $cur -replace '\.mp3$',''
    $newSlug = $new -replace '\.mp3$',''
    $pairs += [pscustomobject]@{
        OldFilename = $cur
        NewFilename = $new
        OldSlug     = $curSlug
        NewSlug     = $newSlug
    }
}

Write-Host ("== Stage 3.5 cross-link rewrite ({0}) ==" -f ($(if ($Apply) {'APPLY'} else {'DRY-RUN'})))
Write-Host ("  Repo:    {0}" -f $Repo)
Write-Host ("  Map:     {0}" -f $MapPath)
Write-Host ("  Pairs:   {0}" -f $pairs.Count)
Write-Host ""

# Files to scan: markdown, html, xml, json, js, css, txt under repo root.
# Exclude node_modules, .git, audio binaries, large generated folders.
$exclude = @(
    '\\\.git\\',
    '\\\.history\\',
    '\\node_modules\\',
    '\\podcasts\\audio\\',
    '\\podcasts\\segments\\',
    '\\podcasts\\logs\\',
    '\\podcasts\\_snapshot-pre-',
    '\\podcasts\\transcripts\\',
    '\\podcasts\\manifest\.json$',
    '\\podcasts\\feed\.xml$',
    '\\podcasts\\llm-podcast-generator-review\\',
    '\\html\\',
    '\\admin\\qa-bundle\\html\\',
    '\\epub\\.*\.epub$',
    '\\tmp-.*'
)
$excludeRegex = ($exclude -join '|')

$exts = @('.md','.html','.htm','.xml','.json','.js','.css','.txt','.csv','.ps1')

$files = Get-ChildItem -LiteralPath $Repo -Recurse -File -ErrorAction SilentlyContinue |
    Where-Object { $exts -contains $_.Extension.ToLower() } |
    Where-Object { $_.FullName -notmatch $excludeRegex }

# Also skip the map itself and audit logs.
$files = $files | Where-Object {
    $_.FullName -ne $MapPath -and
    $_.Name -notlike 'tmp-rename-audit.log' -and
    $_.Name -notlike 'tmp-proposed-rename.csv'
}

Write-Host ("  Scanning {0} files..." -f $files.Count)

# Build replacement regex set per pair, conservative (filename, path-segment, code-span, quoted).
function Build-Replacements {
    param($pair)
    $oldF = [regex]::Escape($pair.OldFilename)
    $newF = $pair.NewFilename
    $oldS = [regex]::Escape($pair.OldSlug)
    $newS = $pair.NewSlug
    @(
        # 1. Exact mp3 filename, word-bounded.
        [pscustomobject]@{ Pattern = "\b$oldF\b"; Replace = $newF },
        # 2. Slug in URL path (preceded by / or =, followed by / . " ' ) ] space or end).
        [pscustomobject]@{ Pattern = "(?<=[/=`"'])$oldS(?=[/.\s`"')\]])"; Replace = $newS },
        # 3. Slug in markdown code span.
        [pscustomobject]@{ Pattern = "(?<=``)$oldS(?=``)"; Replace = $newS },
        # 4. Slug fully wrapped in double or single quotes (whole-value, not prose).
        [pscustomobject]@{ Pattern = "(?<=[`"'])$oldS(?=[`"'])"; Replace = $newS },
        # 5. Slug followed by .md, .html, .json (any extension), at word boundary.
        [pscustomobject]@{ Pattern = "\b$oldS(?=\.(?:md|html|htm|json|xml|txt|csv))"; Replace = $newS }
    )
}

$allReplacements = @()
foreach ($p in $pairs) {
    $allReplacements += ,@($p, (Build-Replacements -pair $p))
}

$totalChangedFiles = 0
$totalReplacements = 0
$reportLines = New-Object System.Collections.Generic.List[string]
$reportLines.Add("# Stage 3.5 cross-link rewrite report")
$reportLines.Add("# Repo: $Repo")
$reportLines.Add("# Mode: $(if ($Apply) {'APPLY'} else {'DRY-RUN'})")
$reportLines.Add("")

foreach ($f in $files) {
    $orig = [System.IO.File]::ReadAllText($f.FullName)
    $text = $orig
    $fileHits = 0
    foreach ($entry in $allReplacements) {
        $pair = $entry[0]
        $rules = $entry[1]
        foreach ($r in $rules) {
            $matches = [regex]::Matches($text, $r.Pattern)
            if ($matches.Count -gt 0) {
                $fileHits += $matches.Count
                $text = [regex]::Replace($text, $r.Pattern, $r.Replace)
            }
        }
    }
    if ($text -ne $orig) {
        $totalChangedFiles += 1
        $totalReplacements += $fileHits
        $rel = $f.FullName.Substring($Repo.Length).TrimStart('\','/')
        $reportLines.Add("FILE $rel  ($fileHits replacements)")
        if ($Apply) {
            $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
            [System.IO.File]::WriteAllText($f.FullName, $text, $utf8NoBom)
        }
    }
}

$reportLines.Add("")
$reportLines.Add("# Totals")
$reportLines.Add("Files changed: $totalChangedFiles")
$reportLines.Add("Replacements: $totalReplacements")

# Write report relative to repo root if a bare filename was given.
if (-not [System.IO.Path]::IsPathRooted($ReportPath)) {
    $ReportPath = Join-Path $Repo $ReportPath
}
Set-Content -LiteralPath $ReportPath -Value ($reportLines -join "`n") -Encoding UTF8

Write-Host ""
Write-Host ("  Files changed: {0}" -f $totalChangedFiles)
Write-Host ("  Replacements:  {0}" -f $totalReplacements)
Write-Host ("  Report:        {0}" -f $ReportPath)
Write-Host ""
if (-not $Apply) {
    Write-Host "DRY-RUN only. Re-run with -Apply to write changes."
} else {
    Write-Host "OK: cross-link rewrite complete."
}
