# Final cutover ship driver: deploy ggg site -> verify Caddy -> commit ggg -> merge content to main + tag + push.
# Prompts for SSH password ONCE; everything else is non-interactive.

[CmdletBinding()]
param(
    [string]$ContentRepo = 'C:\code\git-going-with-github',
    [string]$GggRepo     = 'C:\code\ggg',
    [string]$LocalSite   = 'C:\code\ggg\site',
    [string]$RemoteSite  = '/home/jeffbis/app/ggg/site',
    [string]$ServerUser  = 'jeffbis',
    [string]$ServerHost  = 'lp.csedesigns.com',
    [string]$Branch      = 'cutover-20260518',
    [string]$Tag         = 'v2-renumbered-20260518'
)

$ErrorActionPreference = 'Stop'

function Section($t) { Write-Host ""; Write-Host ("=" * 72) -ForegroundColor Cyan; Write-Host $t -ForegroundColor Cyan; Write-Host ("=" * 72) -ForegroundColor Cyan }

# --- Phase A: Setup ---
Section "A. Setup"
Import-Module Posh-SSH -ErrorAction Stop
Write-Host "Posh-SSH $((Get-Module Posh-SSH).Version) loaded."

$securePw = Read-Host "SSH password for $ServerUser@$ServerHost" -AsSecureString
$cred = New-Object System.Management.Automation.PSCredential($ServerUser, $securePw)

Write-Host "Opening SSH+SFTP..."
$ssh  = New-SSHSession  -ComputerName $ServerHost -Credential $cred -AcceptKey -ErrorAction Stop
$sftp = New-SFTPSession -ComputerName $ServerHost -Credential $cred -AcceptKey -ErrorAction Stop
$probe = Invoke-SSHCommand -SessionId $ssh.SessionId -Command 'whoami && hostname'
Write-Host $probe.Output

# --- Phase B: Local file map (exclude media/, scripts/) ---
Section "B. Scan local site (exclude media/, scripts/, tmp-*)"
$rootFull = (Resolve-Path -LiteralPath $LocalSite).Path.TrimEnd('\')
$localMap = @{}
Get-ChildItem -LiteralPath $rootFull -Recurse -File | Where-Object {
    $_.FullName -notmatch '\\\.git(\\|$)' -and
    $_.FullName -notmatch '\\media(\\|$)' -and
    $_.FullName -notmatch '\\scripts(\\|$)' -and
    $_.Name -notlike 'tmp-*'
} | ForEach-Object {
    $rel = $_.FullName.Substring($rootFull.Length).TrimStart('\').Replace('\','/')
    $localMap[$rel] = [pscustomobject]@{ Path=$_.FullName; Size=$_.Length }
}
Write-Host ("Local files to consider: {0}" -f $localMap.Count)

# --- Phase C: Remote file map (same subset) ---
Section "C. Remote map"
$listCmd = "cd '$RemoteSite' && find . -type f -not -path './media/*' -not -path './scripts/*' -not -path './.git/*' -printf '%P\t%s\n' 2>/dev/null"
$res = Invoke-SSHCommand -SessionId $ssh.SessionId -Command $listCmd -TimeOut 60
$remoteMap = @{}
foreach ($line in ($res.Output -split "`n")) {
    $line = $line.Trim(); if (-not $line) { continue }
    $parts = $line -split "`t"; if ($parts.Count -ne 2) { continue }
    $remoteMap[$parts[0]] = [int64]$parts[1]
}
Write-Host ("Remote files: {0}" -f $remoteMap.Count)

# --- Phase D: Diff ---
Section "D. Diff (upload if size differs OR file missing)"
$toUpload = New-Object System.Collections.Generic.List[string]
foreach ($rel in $localMap.Keys) {
    if (-not $remoteMap.ContainsKey($rel) -or $remoteMap[$rel] -ne $localMap[$rel].Size) {
        [void]$toUpload.Add($rel)
    }
}
$uploadBytes = ($toUpload | ForEach-Object { $localMap[$_].Size } | Measure-Object -Sum).Sum
Write-Host ("Plan: upload {0} files ({1:N1} MB)" -f $toUpload.Count, ($uploadBytes/1MB))

# --- Phase E: Upload ---
Section "E. Upload via SFTP"
$createdDirs = @{}
$i = 0
foreach ($rel in $toUpload) {
    $i++
    $localFile  = $localMap[$rel].Path
    $remoteFile = "$RemoteSite/$rel"
    $remoteDir  = ($remoteFile -replace '/[^/]+$','')
    if (-not $createdDirs.ContainsKey($remoteDir)) {
        Invoke-SSHCommand -SessionId $ssh.SessionId -Command "mkdir -p '$remoteDir'" -TimeOut 30 | Out-Null
        $createdDirs[$remoteDir] = $true
    }
    if (($i % 25) -eq 0 -or $i -eq $toUpload.Count) {
        Write-Host ("  [{0}/{1}] {2}" -f $i, $toUpload.Count, $rel)
    }
    try {
        Set-SFTPItem -SessionId $sftp.SessionId -Path $localFile -Destination $remoteDir -Force -ErrorAction Stop
    } catch {
        Write-Warning "Upload failed: $rel -- $_"
        throw
    }
}
Write-Host ("Uploaded {0} files." -f $toUpload.Count)

# --- Phase F: Verify (key URLs + sample of enclosures) ---
Section "F. Verify"
$baseUrl = 'https://lp.csedesigns.com/ggg'
$keyUrls = @(
    "$baseUrl/feed.xml",
    "$baseUrl/PODCASTS.html",
    "$baseUrl/episode-map.json",
    "$baseUrl/episodes/ep01-pre-workshop-setup.html",
    "$baseUrl/docs/00-pre-workshop-setup.html",
    "$baseUrl/challenges/index.html"
)
$keyFail = 0
foreach ($u in $keyUrls) {
    try {
        $r = Invoke-WebRequest -Uri $u -Method Head -UseBasicParsing -TimeoutSec 20
        Write-Host ("  {0}  {1}" -f $r.StatusCode, $u)
    } catch {
        Write-Warning ("  FAIL  {0}  -- {1}" -f $u, $_.Exception.Message)
        $keyFail++
    }
}
if ($keyFail -gt 0) { throw "Key URL verification failed ($keyFail)." }

# Extract all enclosure URLs from the live feed.xml and HEAD-check each.
Write-Host ""
Write-Host "Fetching live feed.xml..."
$feedRaw = Invoke-WebRequest -Uri "$baseUrl/feed.xml" -UseBasicParsing -TimeoutSec 30
$enclosures = [regex]::Matches($feedRaw.Content, 'enclosure\s+url="([^"]+)"') | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
Write-Host ("Enclosures in live feed: {0}" -f $enclosures.Count)

$encFail = New-Object System.Collections.Generic.List[string]
$j = 0
foreach ($u in $enclosures) {
    $j++
    try {
        $r = Invoke-WebRequest -Uri $u -Method Head -UseBasicParsing -TimeoutSec 20
        if ($r.StatusCode -ne 200) { [void]$encFail.Add("$($r.StatusCode) $u") }
    } catch {
        [void]$encFail.Add("ERR $u")
    }
    if (($j % 20) -eq 0) { Write-Host "  checked $j/$($enclosures.Count) (fails so far: $($encFail.Count))" }
}
Write-Host ("Enclosure check: {0}/{1} OK" -f ($enclosures.Count - $encFail.Count), $enclosures.Count)
if ($encFail.Count -gt 0) {
    $encFail | Select-Object -First 20 | ForEach-Object { Write-Host "  $_" }
    throw "Enclosure verification failed: $($encFail.Count) bad URLs."
}

# Confirm zero stale refs in served HTML.
Write-Host ""
Write-Host "Checking served pages for stale /media/ep## refs..."
$staleCheckPages = @("$baseUrl/PODCASTS.html","$baseUrl/episodes/ep01-pre-workshop-setup.html","$baseUrl/docs/00-pre-workshop-setup.html")
foreach ($u in $staleCheckPages) {
    $p = Invoke-WebRequest -Uri $u -UseBasicParsing -TimeoutSec 20
    $stale = [regex]::Matches($p.Content, '/media/(ep\d{2}|appendix-)').Count
    if ($stale -gt 0) { throw "Stale refs found on $u : $stale" }
    Write-Host ("  OK no stale refs: {0}" -f $u)
}

Remove-SSHSession  -SessionId $ssh.SessionId  | Out-Null
Remove-SFTPSession -SessionId $sftp.SessionId | Out-Null
Write-Host "Caddy verified GREEN."

# --- Phase G: Commit and push ggg repo ---
Section "G. Commit + push ggg-podcast-deploy"
Push-Location $GggRepo
git add -A
$pending = git status --porcelain
if ($pending) {
    git commit -m "Ship: regenerate site with new audio scheme + rewrite stale refs (v2-renumbered-20260518)"
} else {
    Write-Host "Nothing to commit in ggg."
}
git push origin main
Pop-Location

# --- Phase H: Commit content repo cutover branch (html/ rewrites) + merge to main + tag + push ---
Section "H. Content repo: commit + merge + tag + push"
Push-Location $ContentRepo
$currentBranch = (git rev-parse --abbrev-ref HEAD).Trim()
Write-Host "Current branch: $currentBranch"
if ($currentBranch -ne $Branch) {
    git checkout $Branch
}
git add -A
$pending = git status --porcelain
if ($pending) {
    git commit -m "Stage 3.8: rewrite stale /media/ep## audio refs in html/ tree"
} else {
    Write-Host "Nothing to commit on $Branch."
}
git push origin $Branch

Write-Host "Switching to main..."
git checkout main
git pull --ff-only
git merge --no-ff $Branch -m "Ship: episode renumber + audio scheme cutover ($Tag)"
# Tag if not already present
$existingTag = git tag --list $Tag
if (-not $existingTag) {
    git tag -a $Tag -m "Renumbered curriculum + topic-prefixed audio scheme"
} else {
    Write-Host "Tag $Tag already exists locally; skipping create."
}
git push origin main
git push origin $Tag
Pop-Location

Section "DONE"
Write-Host "Caddy: GREEN. ggg repo: pushed. Content repo: merged + tagged + pushed."
Write-Host "Next: monitor Pages deploy workflow for the new main sha."
