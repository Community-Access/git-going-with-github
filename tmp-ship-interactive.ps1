# tmp-ship-interactive.ps1
#
# Interactive ship driver for steps 7-9 of SHIP-CHECKLIST.md.
#
# Why this exists: native ssh key-auth from the agent session is failing with
# "we did not send a packet" (client-side signing dies before the packet is
# sent). Posh-SSH with password works fine, so this script does the entire
# deploy via Posh-SSH (SSH commands + SFTP), then runs the smoke checks
# locally, and finally prompts for explicit confirmation before any
# merge/tag/push on the source repo.
#
# Usage from PowerShell (run interactively):
#   cd C:\code\git-going-with-github
#   pwsh -NoProfile -ExecutionPolicy Bypass -File .\tmp-ship-interactive.ps1
#
# The script walks through 9 phases. You confirm each one. Ctrl+C is safe
# at any prompt.
#
# Phases:
#   A. Setup        - check Posh-SSH, collect password, test connection
#   B. Install key  - (optional) install SSH key for future password-less use
#   C. Diff         - compute local vs remote file delta
#   D. Backup       - tar.gz remote ~/ggg on server
#   E. Upload       - SFTP push of new/changed files
#   F. Orphans      - (optional) remove remote files not in local tree
#   G. Reload       - reload Caddy on server
#   H. Smoke        - 8 curl-equivalent checks against the live URLs
#   I. Ship         - merge cutover-20260518 -> main + tag + push (HARD STOP)

[CmdletBinding()]
param(
    [string]$ServerHost    = 'lp.csedesigns.com',
    [string]$ServerUser    = 'jeffbis',
    [string]$LocalGggPath  = 'C:\code\ggg',
    [string]$ContentRepo   = 'C:\code\git-going-with-github',
    [string]$RemoteGggPath = '/home/jeffbis/app/ggg',
    [string]$BasePath      = '/ggg',
    [string]$BaseUrl       = 'https://lp.csedesigns.com',
    [string]$ShipBranch    = 'cutover-20260518',
    [string]$ShipTag       = 'v2-renumbered-20260518'
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

# ---------------------------------------------------------------------------
# Helpers

function Write-Phase {
    param([string]$Title)
    Write-Host ""
    Write-Host ("=" * 72) -ForegroundColor Cyan
    Write-Host $Title           -ForegroundColor Cyan
    Write-Host ("=" * 72) -ForegroundColor Cyan
}

function Confirm-Continue {
    param(
        [string]$Prompt = 'Continue?',
        [string]$RequireExact = ''
    )
    if ($RequireExact) {
        $answer = Read-Host "$Prompt (type exactly: $RequireExact)"
        return ($answer -ceq $RequireExact)
    }
    $answer = Read-Host "$Prompt [y/N]"
    return ($answer -match '^[yY]$')
}

function New-SessionPair {
    param([System.Management.Automation.PSCredential]$Cred)
    $ssh  = New-SSHSession  -ComputerName $ServerHost -Credential $Cred -AcceptKey -ErrorAction Stop
    $sftp = New-SFTPSession -ComputerName $ServerHost -Credential $Cred -AcceptKey -ErrorAction Stop
    return @{ Ssh = $ssh; Sftp = $sftp }
}

function Close-SessionPair {
    param($Pair)
    if ($Pair) {
        if ($Pair.Sftp) { Remove-SFTPSession -SessionId $Pair.Sftp.SessionId | Out-Null }
        if ($Pair.Ssh)  { Remove-SSHSession  -SessionId $Pair.Ssh.SessionId  | Out-Null }
    }
}

function Invoke-Ssh {
    param($Session, [string]$Command, [int]$TimeoutSec = 120)
    $res = Invoke-SSHCommand -SessionId $Session.SessionId -Command $Command -TimeOut $TimeoutSec
    return [PSCustomObject]@{
        ExitStatus = $res.ExitStatus
        Output     = ($res.Output -join "`n")
        Error      = ($res.Error  -join "`n")
    }
}

function Get-LocalFileMap {
    param([string]$Root)
    $rootFull = (Resolve-Path -LiteralPath $Root).Path.TrimEnd('\')
    $map = @{}
    Get-ChildItem -LiteralPath $rootFull -Recurse -File `
        | Where-Object {
            $_.FullName -notmatch '\\\.git(\\|$)' -and
            $_.FullName -notmatch '\\\.history(\\|$)' -and
            $_.FullName -notmatch '\\node_modules(\\|$)'
        } `
        | ForEach-Object {
            $rel = $_.FullName.Substring($rootFull.Length).TrimStart('\').Replace('\','/')
            $map[$rel] = [PSCustomObject]@{
                Path = $_.FullName
                Size = $_.Length
            }
        }
    return $map
}

function Get-RemoteFileMap {
    param($Session, [string]$RemoteRoot)
    # Print: <relpath>\t<size>
    $cmd = "cd '$RemoteRoot' && find . -type f -not -path './.git/*' -not -path './.history/*' -not -path './node_modules/*' -printf '%P\t%s\n' 2>/dev/null"
    $res = Invoke-Ssh -Session $Session -Command $cmd -TimeoutSec 60
    if ($res.ExitStatus -ne 0) {
        if ($res.Output -match 'No such file') { return @{} }
        throw "Remote listing failed (exit $($res.ExitStatus)): $($res.Error)"
    }
    $map = @{}
    foreach ($line in ($res.Output -split "`n")) {
        $line = $line.Trim()
        if (-not $line) { continue }
        $parts = $line -split "`t"
        if ($parts.Count -ne 2) { continue }
        $map[$parts[0]] = [PSCustomObject]@{
            Size = [int64]$parts[1]
        }
    }
    return $map
}

function Ensure-RemoteDir {
    param($SftpSession, $SshSession, [string]$RemoteDir)
    # Cheap: just mkdir -p via ssh once per parent dir we touch.
    $cmd = "mkdir -p '$RemoteDir'"
    $res = Invoke-Ssh -Session $SshSession -Command $cmd -TimeoutSec 30
    if ($res.ExitStatus -ne 0) {
        throw "mkdir -p failed for $RemoteDir : $($res.Error)"
    }
}

# ---------------------------------------------------------------------------
# Phase A: Setup

Write-Phase "Phase A. Setup"

# Posh-SSH check
if (-not (Get-Module -ListAvailable -Name Posh-SSH)) {
    Write-Warning "Posh-SSH not installed. Install with:"
    Write-Warning "  Install-Module Posh-SSH -Scope CurrentUser -Force"
    exit 1
}
Import-Module Posh-SSH -ErrorAction Stop
Write-Host "Posh-SSH module loaded (version $((Get-Module Posh-SSH).Version))."

# Path checks
foreach ($p in @($LocalGggPath, $ContentRepo)) {
    if (-not (Test-Path -LiteralPath $p)) { throw "Path does not exist: $p" }
}
Write-Host "Local ggg mirror: $LocalGggPath"
Write-Host "Content repo    : $ContentRepo"
Write-Host "Server          : $ServerUser@$ServerHost"
Write-Host "Remote path     : $RemoteGggPath"

# Collect SSH password securely
$securePw = Read-Host "Enter SSH password for $ServerUser@$ServerHost" -AsSecureString
$cred     = New-Object System.Management.Automation.PSCredential($ServerUser, $securePw)

# Test connection
Write-Host "Testing connection..." -NoNewline
$pair = $null
try {
    $pair = New-SessionPair -Cred $cred
    $probe = Invoke-Ssh -Session $pair.Ssh -Command "whoami && hostname && uname -a" -TimeoutSec 15
    if ($probe.ExitStatus -ne 0) { throw "Probe command failed: $($probe.Error)" }
    Write-Host " OK"
    Write-Host $probe.Output
}
catch {
    Write-Host " FAIL"
    Write-Error $_
    Close-SessionPair -Pair $pair
    exit 1
}

# ---------------------------------------------------------------------------
# Phase B. (Optional) Install SSH key for future password-less use

Write-Phase "Phase B. (Optional) Install SSH key for future runs"
$pubKeyPath = Join-Path $env:USERPROFILE '.ssh\id_ed25519.pub'
if (Test-Path -LiteralPath $pubKeyPath) {
    Write-Host "Local pubkey present: $pubKeyPath"
    if (Confirm-Continue -Prompt "Append local pubkey to remote ~/.ssh/authorized_keys (skip duplicates)?") {
        $pub = (Get-Content $pubKeyPath -Raw).TrimEnd("`r","`n")
        $remoteCmd = @"
mkdir -p ~/.ssh && chmod 700 ~/.ssh
touch ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys
grep -qxF '$pub' ~/.ssh/authorized_keys || echo '$pub' >> ~/.ssh/authorized_keys
wc -l ~/.ssh/authorized_keys
"@
        $res = Invoke-Ssh -Session $pair.Ssh -Command $remoteCmd -TimeoutSec 30
        Write-Host $res.Output
        if ($res.ExitStatus -ne 0) { Write-Warning "Key install non-zero exit: $($res.Error)" }
    }
} else {
    Write-Host "No local ed25519 pubkey found at $pubKeyPath - skipping."
}

# ---------------------------------------------------------------------------
# Phase C. Diff local vs remote

Write-Phase "Phase C. Compute local vs remote diff"
Write-Host "Scanning local files..."
$local  = Get-LocalFileMap -Root $LocalGggPath
Write-Host ("  Local files : {0}" -f $local.Count)

Write-Host "Scanning remote files..."
$remote = Get-RemoteFileMap -Session $pair.Ssh -RemoteRoot $RemoteGggPath
Write-Host ("  Remote files: {0}" -f $remote.Count)

# Categorize
$toUpload = New-Object System.Collections.Generic.List[string]
$toDelete = New-Object System.Collections.Generic.List[string]
foreach ($rel in $local.Keys) {
    if (-not $remote.ContainsKey($rel)) {
        $toUpload.Add($rel) | Out-Null
    } elseif ($remote[$rel].Size -ne $local[$rel].Size) {
        $toUpload.Add($rel) | Out-Null
    }
}
foreach ($rel in $remote.Keys) {
    if (-not $local.ContainsKey($rel)) {
        $toDelete.Add($rel) | Out-Null
    }
}

$uploadBytes = ($toUpload | ForEach-Object { $local[$_].Size } | Measure-Object -Sum).Sum
$uploadMB    = if ($uploadBytes) { [math]::Round($uploadBytes/1MB,1) } else { 0 }

Write-Host ""
Write-Host "Plan:"
Write-Host ("  Upload : {0} files ({1} MB)"    -f $toUpload.Count, $uploadMB)
Write-Host ("  Orphans: {0} files on remote"   -f $toDelete.Count)

if ($toUpload.Count -gt 0) {
    Write-Host ""
    Write-Host "First 20 uploads:"
    $toUpload | Select-Object -First 20 | ForEach-Object { Write-Host "  + $_" }
    if ($toUpload.Count -gt 20) { Write-Host "  ... and $($toUpload.Count - 20) more" }
}
if ($toDelete.Count -gt 0) {
    Write-Host ""
    Write-Host "First 20 orphans:"
    $toDelete | Select-Object -First 20 | ForEach-Object { Write-Host "  - $_" }
    if ($toDelete.Count -gt 20) { Write-Host "  ... and $($toDelete.Count - 20) more" }
}

Write-Host ""
if (-not (Confirm-Continue -Prompt "Proceed to Phase D (backup) and Phase E (upload)?")) {
    Write-Host "Stopped at Phase C by user choice."
    Close-SessionPair -Pair $pair
    exit 0
}

# ---------------------------------------------------------------------------
# Phase D. Backup remote ggg

Write-Phase "Phase D. Backup remote ~/ggg"
$stamp     = Get-Date -Format 'yyyyMMdd-HHmmss'
$backupTar = "~/ggg-backup-$stamp.tar.gz"
$backupCmd = "tar czf $backupTar -C /home/jeffbis ggg && ls -lh $backupTar"
$res = Invoke-Ssh -Session $pair.Ssh -Command $backupCmd -TimeoutSec 600
Write-Host $res.Output
if ($res.ExitStatus -ne 0) { throw "Backup failed: $($res.Error)" }

# ---------------------------------------------------------------------------
# Phase E. Upload new/changed files via SFTP

Write-Phase "Phase E. Upload (SFTP)"
if ($toUpload.Count -eq 0) {
    Write-Host "Nothing to upload."
} else {
    $i = 0
    $createdDirs = @{}
    foreach ($rel in $toUpload) {
        $i++
        $localFile  = $local[$rel].Path
        $remoteFile = "$RemoteGggPath/$rel"
        $remoteDir  = Split-Path $remoteFile -Parent
        if (-not $createdDirs.ContainsKey($remoteDir)) {
            Ensure-RemoteDir -SftpSession $pair.Sftp -SshSession $pair.Ssh -RemoteDir $remoteDir
            $createdDirs[$remoteDir] = $true
        }
        $sizeKB = [math]::Round($local[$rel].Size/1KB,1)
        Write-Progress -Activity "Uploading" -Status "$i/$($toUpload.Count) $rel ($sizeKB KB)" -PercentComplete (($i/$toUpload.Count)*100)
        try {
            Set-SFTPItem -SessionId $pair.Sftp.SessionId -Path $localFile -Destination $remoteDir -Force -ErrorAction Stop
        } catch {
            Write-Warning "Upload failed for $rel : $_"
            if (-not (Confirm-Continue -Prompt "Continue with remaining uploads?")) { throw }
        }
    }
    Write-Progress -Activity "Uploading" -Completed
    Write-Host "Uploaded $($toUpload.Count) files."
}

# ---------------------------------------------------------------------------
# Phase F. Orphan removal (optional)

Write-Phase "Phase F. Remove remote orphans (optional)"
if ($toDelete.Count -eq 0) {
    Write-Host "No orphans."
} else {
    Write-Host "$($toDelete.Count) files exist on remote but not locally."
    if (Confirm-Continue -Prompt "Delete these from remote?") {
        # Batch in chunks to keep command line size manageable.
        $chunk = 50
        for ($idx = 0; $idx -lt $toDelete.Count; $idx += $chunk) {
            $slice = $toDelete[$idx..([Math]::Min($idx + $chunk - 1, $toDelete.Count - 1))]
            $quoted = $slice | ForEach-Object { "'$RemoteGggPath/$_'" }
            $cmd = "rm -f " + ($quoted -join ' ')
            $res = Invoke-Ssh -Session $pair.Ssh -Command $cmd -TimeoutSec 60
            if ($res.ExitStatus -ne 0) { Write-Warning "rm chunk failed: $($res.Error)" }
        }
        Write-Host "Orphan removal complete."
    } else {
        Write-Host "Skipped orphan removal."
    }
}

# ---------------------------------------------------------------------------
# Phase G. Reload Caddy

Write-Phase "Phase G. Reload Caddy"
if (Confirm-Continue -Prompt "Reload Caddy on the server now? (uses sudo; you may be prompted on server)") {
    Write-Host "Trying systemctl reload caddy (passwordless sudo first)..."
    $res = Invoke-Ssh -Session $pair.Ssh -Command "sudo -n systemctl reload caddy 2>&1; echo EXIT=$?" -TimeoutSec 30
    Write-Host $res.Output
    if ($res.Output -match 'EXIT=0') {
        Write-Host "Caddy reloaded (no password needed)."
    } else {
        Write-Host ""
        Write-Host "Passwordless sudo unavailable. Re-enter SSH password (used as sudo password):"
        $sudoPw = Read-Host "Sudo password" -AsSecureString
        $plain  = [System.Net.NetworkCredential]::new('', $sudoPw).Password
        # Pipe password to sudo -S; quote single quotes by ending/restarting the heredoc
        $cmd = "echo '$plain' | sudo -S -p '' systemctl reload caddy 2>&1 && sudo -n systemctl is-active caddy"
        $res = Invoke-Ssh -Session $pair.Ssh -Command $cmd -TimeoutSec 30
        Write-Host $res.Output
        Remove-Variable plain,sudoPw -ErrorAction SilentlyContinue
        if ($res.ExitStatus -ne 0) { Write-Warning "Caddy reload may have failed; check manually." }
    }
} else {
    Write-Host "Skipped Caddy reload."
}

# ---------------------------------------------------------------------------
# Phase H. Smoke checks

Write-Phase "Phase H. Smoke checks"
$smokeUrls = @(
    "$BaseUrl$BasePath/",
    "$BaseUrl$BasePath/PODCASTS.html",
    "$BaseUrl$BasePath/feed.xml",
    "$BaseUrl$BasePath/styles.css",
    "$BaseUrl$BasePath/media/ch-00-welcome.mp3",
    "$BaseUrl$BasePath/media/ch-01-pre-workshop-setup.mp3",
    "$BaseUrl$BasePath/media/cc-01-find-your-way-around.mp3",
    "$BaseUrl$BasePath/media/a11y-01-vscode-accessibility-reference.mp3",
    "$BaseUrl$BasePath/media/agents-01-accessibility-agents-reference.mp3",
    "$BaseUrl$BasePath/media/git-01-git-authentication.mp3",
    "$BaseUrl$BasePath/media/ref-01-glossary.mp3",
    "$BaseUrl$BasePath/media/sec-01-branch-protection.mp3",
    "$BaseUrl$BasePath/media/tools-01-github-flavored-markdown.mp3"
)
$results = foreach ($u in $smokeUrls) {
    try {
        $r = Invoke-WebRequest -Uri $u -Method Head -UseBasicParsing -TimeoutSec 20 -ErrorAction Stop
        [PSCustomObject]@{ Url = $u; Status = $r.StatusCode; Length = $r.Headers['Content-Length'] }
    } catch {
        $code = $null
        if ($_.Exception.Response) { $code = [int]$_.Exception.Response.StatusCode }
        [PSCustomObject]@{ Url = $u; Status = ($code, 'ERR' -ne $null)[0]; Length = $_.Exception.Message }
    }
}
$results | Format-Table -AutoSize | Out-String | Write-Host
$failed = @($results | Where-Object { $_.Status -notin 200,206,304 })
if ($failed.Count -gt 0) {
    Write-Warning "$($failed.Count) smoke check(s) failed."
}

Close-SessionPair -Pair $pair

# ---------------------------------------------------------------------------
# Phase I. HARD STOP - ship step 9 (merge + tag + push)

Write-Phase "Phase I. HARD STOP - ship step 9 (merge + tag + push)"
Write-Host "This will:"
Write-Host "  1. cd $ContentRepo"
Write-Host "  2. git checkout main"
Write-Host "  3. git pull --ff-only"
Write-Host "  4. git merge --no-ff $ShipBranch -m 'Ship: episode renumber + audio scheme cutover'"
Write-Host "  5. git tag -a $ShipTag -m 'Renumbered curriculum + topic-prefixed audio scheme'"
Write-Host "  6. git push origin main"
Write-Host "  7. git push origin $ShipTag"
Write-Host ""
Write-Host "This will trigger the Pages deploy workflow on push to main."
Write-Host ""

if (-not (Confirm-Continue -Prompt "Confirm ship step 9?" -RequireExact 'SHIP IT')) {
    Write-Host "Step 9 NOT executed. Run again later when ready."
    exit 0
}

Push-Location $ContentRepo
try {
    & git status --short
    if ($LASTEXITCODE -ne 0) { throw "git status failed" }

    & git checkout main
    if ($LASTEXITCODE -ne 0) { throw "git checkout main failed" }

    & git pull --ff-only
    if ($LASTEXITCODE -ne 0) { throw "git pull failed" }

    & git merge --no-ff $ShipBranch -m "Ship: episode renumber + audio scheme cutover ($ShipTag)"
    if ($LASTEXITCODE -ne 0) { throw "git merge failed" }

    & git tag -a $ShipTag -m "Renumbered curriculum + topic-prefixed audio scheme"
    if ($LASTEXITCODE -ne 0) { throw "git tag failed" }

    & git push origin main
    if ($LASTEXITCODE -ne 0) { throw "git push main failed" }

    & git push origin $ShipTag
    if ($LASTEXITCODE -ne 0) { throw "git push tag failed" }

    Write-Host ""
    Write-Host "SHIPPED. Pages deploy workflow should be running on main."
    Write-Host "Verify at: https://github.com/Community-Access/git-going-with-github/actions"
}
finally {
    Pop-Location
}
