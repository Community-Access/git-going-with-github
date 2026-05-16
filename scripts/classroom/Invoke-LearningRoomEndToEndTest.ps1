[CmdletBinding()]
param(
    [string]$TemplateRepository = 'Community-Access/learning-room-template',

    [string]$Owner = '',

    [string]$RepositoryName = ('learning-room-e2e-' + (Get-Date -Format 'yyyyMMddHHmmss')),

    [string]$StudentUsername = '',

    [int]$TimeoutSeconds = 600,

    [int]$PollSeconds = 5,

    [switch]$KeepRepository,

    [switch]$KeepClone,

    [switch]$SkipBonus,

    [switch]$IncludeFailurePaths,

    # Resume an existing test repo without recreating it. Pass the full owner/repo name.
    [string]$ResumeRepository = '',

    # Skip straight to this challenge number (1-16). Requires ResumeRepository.
    [int]$StartFromChallenge = 1,

    [switch]$DryRun,

    [switch]$SelfTest,

    [switch]$Quiet,

    [string]$ReportPath = ''
)

$ErrorActionPreference = 'Stop'
# Prevent PowerShell from converting native stderr output into terminating errors.
# Git and gh often emit progress text on stderr even when commands succeed.
if (Get-Variable -Name PSNativeCommandUseErrorActionPreference -ErrorAction SilentlyContinue) {
    $PSNativeCommandUseErrorActionPreference = $false
}

$script:Results = [System.Collections.Generic.List[object]]::new()
$script:CreatedRepository = $false
$script:Repository = ''
$script:ClonePath = ''
$script:WorkRoot = ''
$script:Utf8NoBom = [System.Text.UTF8Encoding]::new($false)

function Write-Status {
    param([string]$Message)

    if ($Quiet) { return }
    $timestamp = Get-Date -Format 'HH:mm:ss'
    Write-Host "[$timestamp] $Message"
}

function Invoke-PollDelay {
    param(
        [string]$Reason,
        [datetime]$Deadline
    )

    $remaining = [int][Math]::Max(0, ($Deadline - (Get-Date)).TotalSeconds)
    Write-Status "$Reason; polling again in $PollSeconds seconds ($remaining seconds before timeout)."
    Start-Sleep -Seconds $PollSeconds
}

function Add-Result {
    param(
        [string]$Name,
        [string]$Status,
        [string]$Detail = ''
    )

    $script:Results.Add([pscustomobject]@{
        name = $Name
        status = $Status
        detail = $Detail
        at = (Get-Date).ToString('o')
    }) | Out-Null

    $prefix = if ($Status -eq 'PASS') { '[PASS]' } elseif ($Status -eq 'SKIP') { '[SKIP]' } else { '[FAIL]' }
    Write-Status "$prefix $Name $Detail"
}

function Assert-LocalPath {
    param(
        [string]$Name,
        [string]$Path,
        [switch]$Directory
    )

    Write-Status "Checking local path: $Path"
    $exists = if ($Directory) { Test-Path -LiteralPath $Path -PathType Container } else { Test-Path -LiteralPath $Path -PathType Leaf }
    if (-not $exists) {
        Add-Result -Name $Name -Status 'FAIL' -Detail "Missing: $Path"
        throw "Missing required local path: $Path"
    }

    Add-Result -Name $Name -Status 'PASS' -Detail $Path
}

function Invoke-LocalSelfTest {
    Write-Status 'Starting local-only E2E harness self-test. No GitHub, git, or workflow commands will run.'

    Assert-LocalPath -Name 'Template source directory' -Path (Join-Path (Get-Location) 'learning-room') -Directory
    Assert-LocalPath -Name 'Challenge progression script' -Path (Join-Path (Get-Location) 'learning-room/.github/scripts/challenge-progression.js')
    Assert-LocalPath -Name 'Student progression workflow' -Path (Join-Path (Get-Location) 'learning-room/.github/workflows/student-progression.yml')
    Assert-LocalPath -Name 'PR validation workflow' -Path (Join-Path (Get-Location) 'learning-room/.github/workflows/pr-validation-bot.yml')
    Assert-LocalPath -Name 'Peer simulation seed script' -Path (Join-Path (Get-Location) 'scripts/classroom/Seed-PeerSimulation.ps1')
    Assert-LocalPath -Name 'Merge conflict seed script' -Path (Join-Path (Get-Location) 'scripts/classroom/Start-MergeConflictChallenge.ps1')

    $templateFiles = Get-ChildItem -Path (Join-Path (Get-Location) 'learning-room/.github/ISSUE_TEMPLATE') -Filter '*.yml' |
        Where-Object { $_.Name -match '^(challenge-|bonus-)' }
    $templateCount = @($templateFiles).Count
    Write-Status "Found $templateCount challenge/bonus issue templates."
    if ($templateCount -ne 21) {
        Add-Result -Name '21 challenge templates' -Status 'FAIL' -Detail "Expected 21, found $templateCount."
        throw "Expected 21 challenge/bonus issue templates, found $templateCount."
    }
    Add-Result -Name '21 challenge templates' -Status 'PASS' -Detail '16 core plus 5 bonus templates found.'

    $missingEvidence = @()
    foreach ($file in $templateFiles) {
        $content = Get-Content -Raw -LiteralPath $file.FullName
        if ($content -notmatch '(?m)^\s+id:\s*evidence') {
            $missingEvidence += $file.Name
        }
    }
    if ($missingEvidence.Count) {
        Add-Result -Name 'Challenge evidence fields' -Status 'FAIL' -Detail ($missingEvidence -join ', ')
        throw "Templates missing evidence fields: $($missingEvidence -join ', ')"
    }
    Add-Result -Name 'Challenge evidence fields' -Status 'PASS' -Detail 'Every challenge and bonus template has an evidence field.'

    $script:Repository = if ($Owner) { "$Owner/$RepositoryName" } else { "<owner>/$RepositoryName" }
    Add-Result -Name 'Self-test complete' -Status 'PASS' -Detail "Full E2E would create or use $script:Repository."
    Write-Report
}

function Invoke-CheckedCommand {
    param(
        [string]$FilePath,
        [string[]]$Arguments,
        [string]$FailureMessage = '',
        [int]$Retries = 4
    )

    Write-Status "Running: $FilePath $($Arguments -join ' ')"

    # Generic command execution with special transient-retry support for gh commands.
    for ($attempt = 1; $attempt -le $Retries; $attempt++) {
        if ($FilePath -eq 'gh') {
            $oldErrorActionPreference = $ErrorActionPreference
            $ErrorActionPreference = 'Continue'
            $output = & gh @Arguments 2>&1
            $ErrorActionPreference = $oldErrorActionPreference
            $exitCode = $LASTEXITCODE
            $text = ($output | Out-String).Trim()

            if ($exitCode -eq 0) {
                return
            }

            $isTransient = $text -match 'HTTP 50[024]|50[024] Gateway|Gateway Timeout|temporarily unavailable|timeout|timed out'
            if ($isTransient -and $attempt -lt $Retries) {
                Write-Status "Transient gh failure on attempt $attempt/$Retries for: gh $($Arguments -join ' ')"
                Write-Status "GitHub said: $text"
                Invoke-PollDelay -Reason 'Retrying transient gh command failure' -Deadline (Get-Date).AddSeconds([Math]::Max($PollSeconds, 1))
                continue
            }

            if ($FailureMessage) {
                throw "$FailureMessage`n$text"
            }
            throw "Command failed after $attempt attempt(s): gh $($Arguments -join ' ')`n$text"
        }

        & $FilePath @Arguments
        if ($LASTEXITCODE -eq 0) {
            return
        }

        # Non-gh commands are not retried by default because most are deterministic (git syntax/state issues).
        if ($FailureMessage) {
            throw $FailureMessage
        }
        throw "Command failed: $FilePath $($Arguments -join ' ')"
    }
}

function Invoke-GhJson {
    param(
        [string[]]$Arguments,
        [int]$Retries = 4
    )

    for ($attempt = 1; $attempt -le $Retries; $attempt++) {
        $oldErrorActionPreference = $ErrorActionPreference
        $ErrorActionPreference = 'Continue'
        $output = & gh @Arguments 2>&1
        $ErrorActionPreference = $oldErrorActionPreference
        $exitCode = $LASTEXITCODE
        $text = ($output | Out-String).Trim()

        if ($exitCode -eq 0) {
            if (-not $text) {
                return $null
            }

            return ($text | ConvertFrom-Json)
        }

        $isTransient = $text -match 'HTTP 50[024]|50[024] Gateway|Gateway Timeout|temporarily unavailable|timeout|timed out'
        if ($isTransient -and $attempt -lt $Retries) {
            Write-Status "Transient GitHub CLI failure on attempt $attempt/$Retries for: gh $($Arguments -join ' ')"
            Write-Status "GitHub said: $text"
            Invoke-PollDelay -Reason 'Retrying transient GitHub API failure' -Deadline (Get-Date).AddSeconds([Math]::Max($PollSeconds, 1))
            continue
        }

        throw "GitHub CLI command failed after $attempt attempt(s): gh $($Arguments -join ' ')`n$text"
    }
}

function Get-CurrentUserLogin {
    $login = gh api user --jq '.login'
    if ($LASTEXITCODE -ne 0 -or -not $login) {
        throw 'Could not determine current GitHub user. Run gh auth status and gh auth login first.'
    }
    return $login.Trim()
}

function Get-IssueByPrefix {
    param([string]$TitlePrefix)

    $issues = Invoke-GhJson @('issue', 'list', '-R', $script:Repository, '--state', 'all', '--limit', '200', '--json', 'number,title,state')
    return $issues | Where-Object { $_.title -like "$TitlePrefix*" } | Select-Object -First 1
}

function Wait-ForIssue {
    param([string]$TitlePrefix)

    Write-Status "Waiting for issue '$TitlePrefix' in $script:Repository."
    $deadline = (Get-Date).AddSeconds($TimeoutSeconds)
    while ((Get-Date) -lt $deadline) {
        $issue = Get-IssueByPrefix -TitlePrefix $TitlePrefix
        if ($issue) {
            Write-Status "Found issue #$($issue.number): $($issue.title)"
            return $issue
        }
        Invoke-PollDelay -Reason "Issue '$TitlePrefix' not visible yet" -Deadline $deadline
    }

    throw "Timed out waiting for issue '$TitlePrefix' in $script:Repository."
}

function Wait-ForWorkflowSuccess {
    param(
        [string]$Workflow,
        [string]$Branch = '',
        [string]$TriggerEvent = '',
        [datetime]$NotBefore = [datetime]::MinValue
    )

    $filter = @()
    if ($Branch) { $filter += "branch=$Branch" }
    if ($TriggerEvent) { $filter += "event=$TriggerEvent" }
    $filterText = if ($filter.Count) { ' (' + ($filter -join ', ') + ')' } else { '' }
    Write-Status "Waiting for workflow '$Workflow'$filterText."

    $deadline = (Get-Date).AddSeconds($TimeoutSeconds)
    $run = $null
    while ((Get-Date) -lt $deadline) {
        $arguments = @('run', 'list', '-R', $script:Repository, '--workflow', $Workflow, '--limit', '10', '--json', 'databaseId,status,conclusion,headBranch,event,createdAt,displayTitle')
        $runs = Invoke-GhJson $arguments
        $candidates = $runs
        if ($Branch) {
            $candidates = $candidates | Where-Object { $_.headBranch -eq $Branch }
        }
        if ($TriggerEvent) {
            $candidates = $candidates | Where-Object { $_.event -eq $TriggerEvent }
        }
        if ($NotBefore -gt [datetime]::MinValue) {
            $candidates = $candidates | Where-Object { ([datetime]$_.createdAt) -ge $NotBefore }
        }
        $run = $candidates | Sort-Object createdAt -Descending | Select-Object -First 1
        if ($run) {
            Write-Status "Found workflow run $($run.databaseId) for '$Workflow' with status '$($run.status)' and conclusion '$($run.conclusion)'."
            break
        }
        $notBeforeText = if ($NotBefore -gt [datetime]::MinValue) { " after $($NotBefore.ToString('o'))" } else { '' }
        Invoke-PollDelay -Reason "Workflow '$Workflow' run$notBeforeText not visible yet" -Deadline $deadline
    }

    if (-not $run) {
        throw "No workflow run found for $Workflow."
    }

    while ((Get-Date) -lt $deadline) {
        $runState = Invoke-GhJson @('run', 'view', ([string]$run.databaseId), '-R', $script:Repository, '--json', 'databaseId,status,conclusion,name,displayTitle,updatedAt')
        Write-Status "Workflow run $($runState.databaseId) status=$($runState.status) conclusion=$($runState.conclusion) updated=$($runState.updatedAt)."
        if ($runState.status -eq 'completed') {
            if ($runState.conclusion -ne 'success' -and $runState.conclusion -ne 'skipped') {
                $runUrl = "https://github.com/$script:Repository/actions/runs/$($runState.databaseId)"
                throw "Workflow failed: $Workflow run $($runState.databaseId) concluded $($runState.conclusion).`nInspect the run at: $runUrl"
            }
            return $runState.databaseId
        }
        Invoke-PollDelay -Reason "Workflow '$Workflow' run $($run.databaseId) still running" -Deadline $deadline
    }

    $runUrl = "https://github.com/$script:Repository/actions/runs/$($run.databaseId)"
    throw "Timed out waiting for workflow '$Workflow' run $($run.databaseId) to complete.`nInspect the run at: $runUrl"
    return $run.databaseId
}

function Add-IssueEvidenceAndClose {
    param(
        [int]$ChallengeNumber,
        [string]$Evidence
    )

    $issue = Wait-ForIssue -TitlePrefix ('Challenge {0}:' -f $ChallengeNumber)
    $bodyPath = Join-Path ([IO.Path]::GetTempPath()) ("e2e-evidence-$ChallengeNumber-" + [guid]::NewGuid() + '.md')
    [IO.File]::WriteAllText($bodyPath, ($Evidence.Trim() + "`n"), $script:Utf8NoBom)
    try {
        Invoke-CheckedCommand gh @('issue', 'comment', ([string]$issue.number), '-R', $script:Repository, '--body-file', $bodyPath)
        $closedAfter = (Get-Date).AddSeconds(-5)
        Invoke-CheckedCommand gh @('issue', 'close', ([string]$issue.number), '-R', $script:Repository, '--comment', "End-to-end validation closing Challenge $ChallengeNumber.")
    }
    finally {
        Remove-Item $bodyPath -Force -ErrorAction SilentlyContinue
    }

    if ($ChallengeNumber -lt 16) {
        Wait-ForWorkflowSuccess -Workflow 'student-progression.yml' -TriggerEvent 'issues' -NotBefore $closedAfter | Out-Null
        Wait-ForIssue -TitlePrefix "Challenge $($ChallengeNumber + 1):" | Out-Null
    }
}

function Add-TextFileCommit {
    param(
        [string]$Branch,
        [string]$Path,
        [string[]]$Lines,
        [string]$Message
    )

    Push-Location $script:ClonePath
    try {
        Invoke-CheckedCommand git @('checkout', 'main')
        Invoke-CheckedCommand git @('pull', '--ff-only', 'origin', 'main')
        Invoke-CheckedCommand git @('checkout', '-B', $Branch)
        $fullPath = Join-Path $script:ClonePath $Path
        $folder = Split-Path $fullPath -Parent
        if ($folder -and -not (Test-Path $folder)) {
            New-Item -ItemType Directory -Path $folder -Force | Out-Null
        }
        [IO.File]::WriteAllText($fullPath, ([string]::Join("`n", $Lines) + "`n"), $script:Utf8NoBom)
        Invoke-CheckedCommand git @('add', $Path)
        Invoke-CheckedCommand git @('commit', '-m', $Message)
        Invoke-CheckedCommand git @('push', '--force', '-u', 'origin', $Branch)
    }
    finally {
        Pop-Location
    }
}

function Update-WelcomeTodoCommit {
    param([string]$Branch)

    Push-Location $script:ClonePath
    try {
        Invoke-CheckedCommand git @('checkout', 'main')
        Invoke-CheckedCommand git @('pull', '--ff-only', 'origin', 'main')
        Invoke-CheckedCommand git @('checkout', '-B', $Branch)
        $path = Join-Path $script:ClonePath 'docs\welcome.md'
        $text = Get-Content -Raw $path
        $replacement = 'Contributors come from every background, skill level, country, and access need. People who use assistive technology bring practical experience that helps open source projects become clearer, more flexible, and more useful for everyone.'
        $text = $text -replace '\[TODO: Add a paragraph explaining that contributors come from all backgrounds, skill levels, and countries\. Emphasize that using assistive technology is not a barrier to contribution - in fact, AT users bring a perspective that improves projects for everyone\.\]', $replacement
        [IO.File]::WriteAllText($path, $text, $script:Utf8NoBom)
        Invoke-CheckedCommand git @('add', 'docs/welcome.md')
        Invoke-CheckedCommand git @('commit', '-m', 'Replace welcome contributor TODO')
        Invoke-CheckedCommand git @('push', '--force', '-u', 'origin', $Branch)
    }
    finally {
        Pop-Location
    }
}

function New-PullRequest {
    param(
        [string]$Branch,
        [string]$Title,
        [string]$Body
    )

    $bodyPath = Join-Path ([IO.Path]::GetTempPath()) ('e2e-pr-' + [guid]::NewGuid() + '.md')
    [IO.File]::WriteAllText($bodyPath, ($Body.Trim() + "`n"), $script:Utf8NoBom)
    try {
        $url = gh pr create -R $script:Repository --base main --head $Branch --title $Title --body-file $bodyPath
        if ($LASTEXITCODE -ne 0) {
            throw "Could not create PR for $Branch."
        }
        $pr = Invoke-GhJson @('pr', 'view', $url.Trim(), '-R', $script:Repository, '--json', 'number,url')
        return $pr
    }
    finally {
        Remove-Item $bodyPath -Force -ErrorAction SilentlyContinue
    }
}

function Wait-ForPrCommentContaining {
    param(
        [int]$PullRequestNumber,
        [string]$Text
    )

    Write-Status "Waiting for PR #$PullRequestNumber comment containing '$Text'."
    $deadline = (Get-Date).AddSeconds($TimeoutSeconds)
    while ((Get-Date) -lt $deadline) {
        $comments = Invoke-GhJson @('api', "repos/$script:Repository/issues/$PullRequestNumber/comments")
        $match = $comments | Where-Object { $_.body -like "*$Text*" } | Select-Object -First 1
        if ($match) {
            Write-Status "Found PR #$PullRequestNumber comment containing '$Text'."
            return $match
        }
        $count = if ($comments) { $comments.Count } else { 0 }
        Invoke-PollDelay -Reason "PR #$PullRequestNumber has $count comments; target comment not visible yet" -Deadline $deadline
    }

    throw "Timed out waiting for PR #$PullRequestNumber comment containing '$Text'."
}

function Assert-PrFailureThenFix {
    param(
        [int]$PullRequestNumber,
        [string]$FailureText,
        [scriptblock]$FixAction,
        [string]$SuccessText,
        [string]$Workflow,
        [string]$Branch,
        [string]$TriggerEvent = 'pull_request'
    )

    Write-Status "Validating failure-path comment '$FailureText' on PR #$PullRequestNumber."
    Wait-ForPrCommentContaining -PullRequestNumber $PullRequestNumber -Text $FailureText | Out-Null
    Add-Result -Name "Failure path detected on PR #$PullRequestNumber" -Status 'PASS' -Detail $FailureText

    & $FixAction
    # Timestamp AFTER the push so Wait-ForWorkflowSuccess finds the run
    # triggered by the fix commit, not by the earlier inject commit.
    $fixStartedAt = (Get-Date).AddSeconds(-2)

    Wait-ForWorkflowSuccess -Workflow $Workflow -Branch $Branch -TriggerEvent $TriggerEvent -NotBefore $fixStartedAt | Out-Null
    if ($SuccessText) {
        Wait-ForPrCommentContaining -PullRequestNumber $PullRequestNumber -Text $SuccessText | Out-Null
        Add-Result -Name "Failure path resolved on PR #$PullRequestNumber" -Status 'PASS' -Detail $SuccessText
    }
    else {
        Add-Result -Name "Failure path resolved on PR #$PullRequestNumber" -Status 'PASS' -Detail "Workflow '$Workflow' succeeded after fix."
    }
}

function Merge-PullRequestIfPossible {
    param([int]$PullRequestNumber)

    Invoke-CheckedCommand gh @('pr', 'merge', ([string]$PullRequestNumber), '-R', $script:Repository, '--squash', '--delete-branch', '--admin')
    Push-Location $script:ClonePath
    try {
        Invoke-CheckedCommand git @('checkout', 'main')
        Invoke-CheckedCommand git @('pull', '--ff-only', 'origin', 'main')
    }
    finally {
        Pop-Location
    }
}

function Resolve-WelcomeConflict {
    param([string]$Branch)

    Push-Location $script:ClonePath
    try {
        Invoke-CheckedCommand git @('fetch', 'origin')
        Invoke-CheckedCommand git @('checkout', $Branch)
        & git merge origin/main
        if ($LASTEXITCODE -eq 0) {
            Add-Result -Name 'Challenge 7 conflict creation' -Status 'SKIP' -Detail 'Merge did not conflict; branch was already compatible.'
            return
        }

        $path = Join-Path $script:ClonePath 'docs\welcome.md'
        $text = Get-Content -Raw $path
        if ($text -notmatch '<<<<<<<|=======|>>>>>>>') {
            throw 'Merge reported a conflict, but conflict markers were not found in docs/welcome.md.'
        }

        $resolved = @'
# Welcome to Open Source Contribution

This guide is for people who are new to contributing to open source software. It explains what contribution means, who it is for, and how to get started.


## What Is Open Source?

Open source software is software whose source code is publicly available. Anyone can read it, use it, and - in most cases - contribute to it. Contributions can include:

- Fixing bugs in the software
- Writing or improving documentation
- Filing bug reports
- Reviewing other people's changes
- Translating content into other languages
- Improving accessibility

You do not need to be a professional developer to contribute. Documentation, accessibility improvements, and bug reports are among the most valuable contributions an open source project can receive.


## Who Can Contribute?

Contributors come from every background, skill level, country, and access need. People who use assistive technology bring practical experience that helps open source projects become clearer, more flexible, and more useful for everyone.


## What Makes a Good First Contribution?

A good first contribution is:

- **Specific** - it addresses one problem clearly
- **Scoped** - it does not try to fix everything at once
- **Described** - the PR or issue explains what changed and why
- **Tested** - for documentation, this means reading it aloud with your screen reader before submitting


## Finding Something to Work On

Most open source projects label issues that are suitable for new contributors. Look for:

- `good first issue`
- `first-timers-only`
- `help wanted`
- `beginner`

[TODO: Add two or three sentences about how to read an issue to decide if it is right for you. What questions should you ask yourself? Is the description clear enough? Is anyone else already working on it?]


## Getting Help

It is always acceptable to ask a question on an issue or pull request. Good questions:

- Are specific: "I'm trying to fix the broken link on line 24 of setup-guide.md. The link currently points to /docs/old-setup. Where should it point?"
- Show what you tried: "I searched the repository for the correct URL but couldn't find it"
- Are polite: assume good intent from maintainers, even if they are slow to respond


## After Your Contribution Is Merged

When your pull request is merged:

- Your name appears in the project's commit history permanently
- The issue you fixed is closed
- You are officially listed as a contributor to this project

[TODO: Add a sentence or two about what this means for someone's GitHub profile and open source portfolio.]


*Last reviewed: [DATE]*
'@
        [IO.File]::WriteAllText($path, ($resolved.Trim() + "`n"), $script:Utf8NoBom)
        Invoke-CheckedCommand git @('add', 'docs/welcome.md')
        Invoke-CheckedCommand git @('commit', '-m', 'Resolve welcome merge conflict')
        Invoke-CheckedCommand git @('push', 'origin', $Branch)
    }
    finally {
        Pop-Location
    }
}

function Test-ChallengeTemplates {
    $templatePath = Join-Path $script:ClonePath '.github\ISSUE_TEMPLATE'
    
    # Debug: Check what's actually in the cloned repo
    $repoContents = Get-ChildItem -LiteralPath $script:ClonePath -Force | Select-Object -ExpandProperty Name
    Write-Status "Repository root contents: $($repoContents -join ', ')"
    
    if (-not (Test-Path -LiteralPath (Join-Path $script:ClonePath '.github') -PathType Container)) {
        Write-Status "WARNING: .github directory not found at repo root"
        # Check if it's in a subdirectory
        $githubDirs = Get-ChildItem -LiteralPath $script:ClonePath -Recurse -Directory -Filter '.github' | Select-Object -First 5
        if ($githubDirs) {
            Write-Status "Found .github directories: $($githubDirs.FullName -join ', ')"
        }
    }
    
    if (-not (Test-Path -LiteralPath $templatePath -PathType Container)) {
        throw "Challenge template directory not found: $templatePath. Repository structure may be invalid."
    }
    
    $core = @(Get-ChildItem -LiteralPath $templatePath -Filter 'challenge-*.yml' -ErrorAction SilentlyContinue)
    $bonus = @(Get-ChildItem -LiteralPath $templatePath -Filter 'bonus-*.yml' -ErrorAction SilentlyContinue)
    
    Write-Status "Found $($core.Count) core templates and $($bonus.Count) bonus templates"
    
    if ($core.Count -ne 16) {
        throw "Expected 16 core challenge templates, found $($core.Count)."
    }
    if ($bonus.Count -ne 5) {
        throw "Expected 5 bonus challenge templates, found $($bonus.Count)."
    }
    Add-Result -Name 'Challenge template inventory' -Status 'PASS' -Detail 'Found 16 core and 5 bonus issue templates.'
}

function New-BonusIssue {
    param(
        [string]$Title,
        [string]$Body
    )

    $url = gh issue create -R $script:Repository --title $Title --label 'challenge' --body $Body
    if ($LASTEXITCODE -ne 0) {
        throw "Could not create bonus issue $Title."
    }
    $issue = Invoke-GhJson @('issue', 'view', $url.Trim(), '-R', $script:Repository, '--json', 'number,title,url')
    Invoke-CheckedCommand gh @('issue', 'close', ([string]$issue.number), '-R', $script:Repository, '--comment', 'End-to-end validation completed this bonus challenge scenario.')
    return $issue
}

function Write-Report {
    if (-not $ReportPath) {
        $safeName = if ($script:Repository) { $script:Repository.Replace('/', '-') } else { 'unknown-repo' }
        if ($safeName -like 'learning-room-e2e-*') {
            $safeName = $safeName.Substring('learning-room-e2e-'.Length)
        }
        $invalidCharsPattern = [regex]::Escape(([string]::Join('', [IO.Path]::GetInvalidFileNameChars())))
        $safeName = [regex]::Replace($safeName, "[$invalidCharsPattern]", '-')
        $safeName = $safeName.Trim('-')
        if (-not $safeName) {
            $safeName = 'report'
        }

        $ReportPath = Join-Path (Get-Location) "learning-room-e2e-$safeName.json"
    }

    $report = [pscustomobject]@{
        repository = $script:Repository
        templateRepository = $TemplateRepository
        startedAt = $script:Results[0].at
        finishedAt = (Get-Date).ToString('o')
        results = $script:Results
    }
    $report | ConvertTo-Json -Depth 8 | Out-File -FilePath $ReportPath -Encoding utf8
    Write-Host "Report written to $ReportPath"
}

function Write-Summary {
    $passed  = @($script:Results | Where-Object { $_.status -eq 'PASS' })
    $failed  = @($script:Results | Where-Object { $_.status -eq 'FAIL' })
    $skipped = @($script:Results | Where-Object { $_.status -eq 'SKIP' })
    $total   = $script:Results.Count

    Write-Host ''
    Write-Host ('=' * 60)
    Write-Host ("  Run summary  ({0} passed, {1} failed, {2} skipped / {3} total)" -f $passed.Count, $failed.Count, $skipped.Count, $total)
    Write-Host ('=' * 60)
    foreach ($r in $failed) {
        Write-Host "  FAIL  $($r.name)"
        if ($r.detail) {
            # Indent every line of the detail for readability.
            ($r.detail -split "`n") | ForEach-Object { Write-Host "        $_" }
        }
    }
    if ($failed.Count -eq 0) {
        Write-Host '  All checks passed.'
    }
    Write-Host ('=' * 60)
    Write-Host ''
}

try {
    if ($DryRun -or $SelfTest) {
        Invoke-LocalSelfTest
        return
    }

    Write-Status 'Checking GitHub CLI authentication.'
    Invoke-CheckedCommand gh @('auth', 'status', '-h', 'github.com')
    if (-not $Owner) { $Owner = Get-CurrentUserLogin }
    if (-not $StudentUsername) { $StudentUsername = Get-CurrentUserLogin }

    if ($ResumeRepository) {
        $script:Repository = $ResumeRepository
        $script:CreatedRepository = $false
        Add-Result -Name 'GitHub authentication' -Status 'PASS' -Detail "Resuming @$StudentUsername against existing repo $script:Repository from challenge $StartFromChallenge."
        Write-Status "Resuming against existing repository $script:Repository (start challenge $StartFromChallenge)."
    }
    else {
        $script:Repository = "$Owner/$RepositoryName"
        Add-Result -Name 'GitHub authentication' -Status 'PASS' -Detail "Using @$StudentUsername; test repo will be $script:Repository."
        Write-Status "Creating disposable repository $script:Repository from $TemplateRepository."
        Invoke-CheckedCommand gh @('repo', 'create', $script:Repository, '--private', '--template', $TemplateRepository, '--description', 'Disposable end-to-end Learning Room validation repository')
        $script:CreatedRepository = $true
        Add-Result -Name 'Repository creation' -Status 'PASS' -Detail "Created $script:Repository from $TemplateRepository."
    }

    if (-not $ResumeRepository) {
        try {
            Invoke-CheckedCommand gh @('api', "repos/$script:Repository/actions/permissions/workflow", '-X', 'PUT', '-f', 'default_workflow_permissions=write', '-F', 'can_approve_pull_request_reviews=true')
            Add-Result -Name 'Workflow permissions' -Status 'PASS' -Detail 'Repository GITHUB_TOKEN can read/write and approve pull requests.'
        }
        catch {
            Add-Result -Name 'Workflow permissions' -Status 'FAIL' -Detail $_.Exception.Message
            throw
        }
    }

    $script:WorkRoot = Join-Path ([IO.Path]::GetTempPath()) ('learning-room-e2e-' + [guid]::NewGuid())
    $script:ClonePath = Join-Path $script:WorkRoot 'repo'
    New-Item -ItemType Directory -Path $script:WorkRoot | Out-Null
    Invoke-CheckedCommand gh @('repo', 'clone', $script:Repository, $script:ClonePath)
    Push-Location $script:ClonePath
    try {
        Invoke-CheckedCommand git @('config', 'user.name', 'Learning Room E2E Bot')
        Invoke-CheckedCommand git @('config', 'user.email', 'learning-room-e2e@users.noreply.github.com')
    }
    finally {
        Pop-Location
    }
    Add-Result -Name 'Repository clone' -Status 'PASS' -Detail $script:ClonePath

    Test-ChallengeTemplates

    if ($StartFromChallenge -le 1) {
        & (Join-Path $PSScriptRoot 'Seed-PeerSimulation.ps1') -Repository $script:Repository -StudentUsername $StudentUsername
    }
    $peerIssue = Get-IssueByPrefix -TitlePrefix 'Peer Simulation: Welcome Link Needs Context'
    if (-not $peerIssue) { throw 'Peer simulation issue was not created or does not exist.' }
    Add-Result -Name 'Peer simulation seeding' -Status 'PASS' -Detail "Issue #$($peerIssue.number) exists."

    if ($StartFromChallenge -le 1) {
        $dispatchAfter = (Get-Date).AddSeconds(-5)
        Invoke-CheckedCommand gh @('workflow', 'run', 'student-progression.yml', '-R', $script:Repository, '-f', 'start_challenge=1', '-f', "assignee=$StudentUsername")
        Wait-ForWorkflowSuccess -Workflow 'student-progression.yml' -TriggerEvent 'workflow_dispatch' -NotBefore $dispatchAfter | Out-Null
        Wait-ForIssue -TitlePrefix 'Challenge 1:' | Out-Null
        Add-Result -Name 'Challenge 1 seeding' -Status 'PASS' -Detail 'Challenge 1 issue created by workflow_dispatch.'

        Add-IssueEvidenceAndClose -ChallengeNumber 1 -Evidence 'Evidence: Found README.md, docs/welcome.md, and the Issues tab in my private Learning Room repository.'

        $createdIssueUrl = gh issue create -R $script:Repository --title 'Test issue: Welcome TODO needs contributor paragraph' --label 'day-1' --body 'I found a TODO in docs/welcome.md asking for a contributor paragraph. This issue is evidence for Challenge 2.'
        if ($LASTEXITCODE -ne 0) { throw 'Could not create Challenge 2 evidence issue.' }
        Add-IssueEvidenceAndClose -ChallengeNumber 2 -Evidence "Evidence issue: $createdIssueUrl"

        Invoke-CheckedCommand gh @('issue', 'comment', ([string]$peerIssue.number), '-R', $script:Repository, '--body', "@$StudentUsername End-to-end validation comment with an @mention for Challenge 3.")
        Invoke-CheckedCommand gh @('api', "repos/$script:Repository/issues/$($peerIssue.number)/reactions", '-X', 'POST', '-f', 'content=+1', '-H', 'Accept: application/vnd.github+json')
        Add-IssueEvidenceAndClose -ChallengeNumber 3 -Evidence "Commented on peer simulation issue #$($peerIssue.number), included an @mention, and added a reaction."
    }

    if ($StartFromChallenge -le 4) {
        Push-Location $script:ClonePath
        try {
            Invoke-CheckedCommand git @('checkout', 'main')
            Invoke-CheckedCommand git @('pull', '--ff-only', 'origin', 'main')
            Invoke-CheckedCommand git @('checkout', '-B', "learn/$StudentUsername")
            Invoke-CheckedCommand git @('push', '--force', '-u', 'origin', "learn/$StudentUsername")
        }
        finally {
            Pop-Location
        }
        Add-IssueEvidenceAndClose -ChallengeNumber 4 -Evidence "Branch created: learn/$StudentUsername"
    }

    if ($StartFromChallenge -le 5) {
        Update-WelcomeTodoCommit -Branch "learn/$StudentUsername"
        Add-IssueEvidenceAndClose -ChallengeNumber 5 -Evidence "Commit created on branch learn/$StudentUsername with message: Replace welcome contributor TODO."
    }

    # $pr6 must be discovered whether or not we ran challenge 6 ourselves.
    if ($StartFromChallenge -le 6) {
        $challenge6Issue = Wait-ForIssue -TitlePrefix 'Challenge 6:'
        $pr6StartedAt = (Get-Date).AddSeconds(-5)
        $pr6Body = if ($IncludeFailurePaths) {
            "This PR intentionally omits a closing issue reference for failure-path testing.`n`nThis replaces the contributor TODO in docs/welcome.md."
        }
        else {
            "Closes #$($challenge6Issue.number)`n`nThis replaces the contributor TODO in docs/welcome.md."
        }
        $pr6 = New-PullRequest -Branch "learn/$StudentUsername" -Title 'Replace welcome contributor TODO' -Body $pr6Body
        Wait-ForWorkflowSuccess -Workflow 'pr-validation-bot.yml' -Branch "learn/$StudentUsername" -TriggerEvent 'pull_request' -NotBefore $pr6StartedAt | Out-Null

        if ($IncludeFailurePaths) {
            Assert-PrFailureThenFix -PullRequestNumber $pr6.number `
                -FailureText 'Validation Needs Attention' `
                -Workflow 'pr-validation-bot.yml' `
                -Branch "learn/$StudentUsername" `
                -FixAction {
                    Invoke-CheckedCommand gh @('pr', 'edit', ([string]$pr6.number), '-R', $script:Repository, '--body', "Closes #$($challenge6Issue.number)`n`nThis replaces the contributor TODO in docs/welcome.md.")
                } `
                -SuccessText 'PR Validation Report'
        }
        else {
            Wait-ForPrCommentContaining -PullRequestNumber $pr6.number -Text 'PR Validation Report' | Out-Null
        }
        Add-IssueEvidenceAndClose -ChallengeNumber 6 -Evidence "Pull request opened and validated: $($pr6.url)"
    }
    else {
        # Resuming past challenge 6: look up the existing PR on the student branch.
        $pr6 = Invoke-GhJson @('pr', 'list', '-R', $script:Repository, '--head', "learn/$StudentUsername", '--state', 'open', '--json', 'number,url') | Select-Object -First 1
        if (-not $pr6) {
            $pr6 = Invoke-GhJson @('pr', 'list', '-R', $script:Repository, '--head', "learn/$StudentUsername", '--state', 'merged', '--json', 'number,url') | Select-Object -First 1
        }
        if (-not $pr6) { throw "Could not find PR on branch learn/$StudentUsername when resuming past challenge 6." }
        Add-Result -Name 'Challenge 6 resume' -Status 'PASS' -Detail "Found existing PR #$($pr6.number)."
    }

    & (Join-Path $PSScriptRoot 'Start-MergeConflictChallenge.ps1') -Repository $script:Repository -StudentBranch "learn/$StudentUsername"
    $conflictResolvedAt = (Get-Date).AddSeconds(-5)
    Resolve-WelcomeConflict -Branch "learn/$StudentUsername"
    Wait-ForWorkflowSuccess -Workflow 'autograder-conflicts.yml' -Branch "learn/$StudentUsername" -TriggerEvent 'pull_request' -NotBefore $conflictResolvedAt | Out-Null

    if ($IncludeFailurePaths) {
        Push-Location $script:ClonePath
        try {
            Invoke-CheckedCommand git @('checkout', "learn/$StudentUsername")
            $path = Join-Path $script:ClonePath 'docs\welcome.md'
            $content = Get-Content -Raw $path
            $bad = "<<<<<<< HEAD`n$content`n=======`nSimulated conflicting block.`n>>>>>>> simulated-branch`n"
            [IO.File]::WriteAllText($path, $bad, $script:Utf8NoBom)
            Invoke-CheckedCommand git @('add', 'docs/welcome.md')
            Invoke-CheckedCommand git @('commit', '-m', 'Inject conflict markers for failure-path test')
            Invoke-CheckedCommand git @('push', '--force', 'origin', "learn/$StudentUsername")
        }
        finally {
            Pop-Location
        }

        Assert-PrFailureThenFix -PullRequestNumber $pr6.number `
            -FailureText 'Conflict markers still present' `
            -Workflow 'autograder-conflicts.yml' `
            -Branch "learn/$StudentUsername" `
            -FixAction {
                # Strip injected markers directly — Resolve-WelcomeConflict skips when
                # there is no real git merge state in progress.
                Push-Location $script:ClonePath
                try {
                    Invoke-CheckedCommand git @('checkout', "learn/$StudentUsername")
                    $welcomePath = Join-Path $script:ClonePath 'docs\welcome.md'
                    $cleaned = (Get-Content -Raw $welcomePath) -replace '(?m)^(<{7}.*|={7}|>{7}.*)(\r?\n)', ''
                    [IO.File]::WriteAllText($welcomePath, $cleaned, $script:Utf8NoBom)
                    Invoke-CheckedCommand git @('add', 'docs/welcome.md')
                    Invoke-CheckedCommand git @('commit', '-m', 'Strip injected conflict markers for failure-path fix')
                    Invoke-CheckedCommand git @('push', '--force', 'origin', "learn/$StudentUsername")
                }
                finally {
                    Pop-Location
                }
            }
            # SuccessText omitted: bot comments get rate-limited after many posts on the
            # same PR. Workflow success alone is sufficient proof of the fix.
    }
    Add-IssueEvidenceAndClose -ChallengeNumber 7 -Evidence 'Resolved the seeded docs/welcome.md conflict and pushed the resolution.'

    Add-IssueEvidenceAndClose -ChallengeNumber 8 -Evidence 'Reflection: peer-simulation issues make private practice feel like a realistic collaboration workflow.'

    Merge-PullRequestIfPossible -PullRequestNumber $pr6.number
    Add-IssueEvidenceAndClose -ChallengeNumber 9 -Evidence "Merged PR #$($pr6.number) after validation."

    Add-TextFileCommit -Branch "challenge-10/$StudentUsername" -Path 'docs/samples/local-workflow-e2e.md' -Lines @('# Local Workflow E2E', '', 'This file validates Challenge 10 local clone, branch, commit, and push behavior.') -Message 'Add local workflow validation note'
    $challenge10Issue = Wait-ForIssue -TitlePrefix 'Challenge 10:'
    $pr10StartedAt = (Get-Date).AddSeconds(-5)
    $pr10 = New-PullRequest -Branch "challenge-10/$StudentUsername" -Title 'Add local workflow validation note' -Body "Closes #$($challenge10Issue.number)`n`nThis PR validates the local Git workflow path."
    Wait-ForWorkflowSuccess -Workflow 'autograder-local-commit.yml' -Branch "challenge-10/$StudentUsername" -TriggerEvent 'pull_request' -NotBefore $pr10StartedAt | Out-Null
    Wait-ForPrCommentContaining -PullRequestNumber $pr10.number -Text 'Local commit verified' | Out-Null
    Add-IssueEvidenceAndClose -ChallengeNumber 10 -Evidence "Local workflow PR opened and checked: $($pr10.url)"

    Add-IssueEvidenceAndClose -ChallengeNumber 11 -Evidence "Reviewed Day 2 PR title and description: $($pr10.url)"

    $peerPr = Invoke-GhJson @('pr', 'list', '-R', $script:Repository, '--head', 'peer-simulation/review-pr', '--state', 'open', '--json', 'number,url') | Select-Object -First 1
    if (-not $peerPr) { throw 'Peer simulation PR was not found for Challenge 12.' }
    Invoke-CheckedCommand gh @('pr', 'review', ([string]$peerPr.number), '-R', $script:Repository, '--comment', '--body', 'End-to-end validation review: the proposed guidance is clear and useful for peer review practice.')
    Add-IssueEvidenceAndClose -ChallengeNumber 12 -Evidence "Reviewed peer simulation PR: $($peerPr.url)"

    Add-TextFileCommit -Branch "challenge-13/$StudentUsername" -Path 'docs/samples/copilot-improvement-after.md' -Lines @('# Copilot Improvement After', '', 'This simulated Copilot revision improves clarity, keeps the scope small, and remains accessible for screen reader users.') -Message 'Add simulated Copilot improvement'
    Add-IssueEvidenceAndClose -ChallengeNumber 13 -Evidence 'Created a simulated Copilot improvement file and described what changed.'

    $templateLines = @(
        'name: Accessibility Follow-Up',
        'description: Track an accessibility follow-up found during validation.',
        'title: "Accessibility follow-up: "',
        'labels: ["accessibility"]',
        'body:',
        '  - type: textarea',
        '    id: summary',
        '    attributes:',
        '      label: Summary',
        '      description: Describe the accessibility follow-up.',
        '    validations:',
        '      required: true'
    )
    Add-TextFileCommit -Branch "challenge-14/$StudentUsername" -Path '.github/ISSUE_TEMPLATE/accessibility-follow-up.yml' -Lines $templateLines -Message 'Add accessibility follow-up issue template'
    $challenge14Issue = Wait-ForIssue -TitlePrefix 'Challenge 14:'
    $pr14StartedAt = (Get-Date).AddSeconds(-5)
    if ($IncludeFailurePaths) {
        Add-TextFileCommit -Branch "challenge-14/$StudentUsername" -Path '.github/ISSUE_TEMPLATE/accessibility-follow-up.yml' -Lines @(
            'description: Missing name on purpose',
            'body:',
            '  - type: textarea',
            '    id: summary',
            '    attributes:',
            '      label: Summary',
            '    validations:',
            '      required: true'
        ) -Message 'Create intentionally invalid issue template for failure-path testing'
    }

    $pr14 = New-PullRequest -Branch "challenge-14/$StudentUsername" -Title 'Add accessibility follow-up issue template' -Body "Closes #$($challenge14Issue.number)`n`nAdds a custom issue template with name and description fields."
    Wait-ForWorkflowSuccess -Workflow 'autograder-template.yml' -Branch "challenge-14/$StudentUsername" -TriggerEvent 'pull_request' -NotBefore $pr14StartedAt | Out-Null

    if ($IncludeFailurePaths) {
        Assert-PrFailureThenFix -PullRequestNumber $pr14.number `
            -FailureText 'Template found but missing required fields' `
            -Workflow 'autograder-template.yml' `
            -Branch "challenge-14/$StudentUsername" `
            -FixAction {
                Add-TextFileCommit -Branch "challenge-14/$StudentUsername" -Path '.github/ISSUE_TEMPLATE/accessibility-follow-up.yml' -Lines $templateLines -Message 'Fix template required fields after failure-path test'
            } `
            -SuccessText 'Custom issue template looks great!'
    }
    else {
        Wait-ForPrCommentContaining -PullRequestNumber $pr14.number -Text 'Custom issue template looks great' | Out-Null
    }
    Add-IssueEvidenceAndClose -ChallengeNumber 14 -Evidence "Custom issue template PR opened and checked: $($pr14.url)"

    Add-IssueEvidenceAndClose -ChallengeNumber 15 -Evidence 'Identified Accessibility Lead, Keyboard Navigator, and Forms Specialist as useful accessibility agents.'

    $agentLines = @(
        '---',
        'name: learning-room-e2e-agent',
        'description: Validates the capstone agent file workflow for the Learning Room.',
        '---',
        '',
        '# Learning Room E2E Agent',
        '',
        '## Responsibilities',
        '',
        '- Help validate workshop challenge workflows.',
        '- Explain failures in plain language.',
        '- Keep recommendations scoped to the student repository.',
        '',
        '## Guardrails',
        '',
        '- Do not request organization owner permissions from students.',
        '- Do not modify unrelated repositories.',
        '- Ask a facilitator before changing protected settings.'
    )
    Add-TextFileCommit -Branch "challenge-16/$StudentUsername" -Path 'community-agents/learning-room-e2e-agent.md' -Lines $agentLines -Message 'Add capstone validation agent file'
    $challenge16Issue = Wait-ForIssue -TitlePrefix 'Challenge 16:'
    $pr16StartedAt = (Get-Date).AddSeconds(-5)
    if ($IncludeFailurePaths) {
        Add-TextFileCommit -Branch "challenge-16/$StudentUsername" -Path 'community-agents/learning-room-e2e-agent.md' -Lines @(
            '# Learning Room E2E Agent',
            '',
            'Intentionally missing frontmatter and sections for failure-path testing.'
        ) -Message 'Create intentionally invalid agent file for failure-path testing'
    }

    $pr16 = New-PullRequest -Branch "challenge-16/$StudentUsername" -Title 'Add capstone validation agent file' -Body "Closes #$($challenge16Issue.number)`n`nAdds an agent file with frontmatter, responsibilities, and guardrails."
    Wait-ForWorkflowSuccess -Workflow 'autograder-capstone.yml' -Branch "challenge-16/$StudentUsername" -TriggerEvent 'pull_request' -NotBefore $pr16StartedAt | Out-Null

    if ($IncludeFailurePaths) {
        Assert-PrFailureThenFix -PullRequestNumber $pr16.number `
            -FailureText 'Agent file needs work' `
            -Workflow 'autograder-capstone.yml' `
            -Branch "challenge-16/$StudentUsername" `
            -FixAction {
                Add-TextFileCommit -Branch "challenge-16/$StudentUsername" -Path 'community-agents/learning-room-e2e-agent.md' -Lines $agentLines -Message 'Fix agent file after failure-path test'
            } `
            -SuccessText 'Agent file looks great!'
    }
    else {
        Wait-ForPrCommentContaining -PullRequestNumber $pr16.number -Text 'Agent file looks great' | Out-Null
    }
    Add-IssueEvidenceAndClose -ChallengeNumber 16 -Evidence "Capstone agent PR opened and checked: $($pr16.url)"

    if ($SkipBonus) {
        Add-Result -Name 'Bonus challenges' -Status 'SKIP' -Detail 'SkipBonus was set.'
    }
    else {
        $bonusTitles = @(
            'Bonus A: Improve an Existing Agent',
            'Bonus B: Document Your Journey',
            'Bonus C: Create a Group Challenge',
            'Bonus D: Notification Mastery',
            'Bonus E: Explore Git History Visually'
        )
        foreach ($title in $bonusTitles) {
            $bonus = New-BonusIssue -Title $title -Body "End-to-end validation issue for $title."
            Add-Result -Name $title -Status 'PASS' -Detail "Created and closed issue #$($bonus.number)."
        }
    }

    Add-Result -Name 'End-to-end validation' -Status 'PASS' -Detail "Completed validation against $script:Repository."
}
catch {
    Add-Result -Name 'End-to-end validation' -Status 'FAIL' -Detail $_.Exception.Message
}
finally {
    if ($script:Results.Count -gt 0) {
        Write-Report
        Write-Summary
    }

    if ($script:WorkRoot -and (Test-Path $script:WorkRoot) -and -not $KeepClone) {
        Remove-Item -LiteralPath $script:WorkRoot -Recurse -Force -ErrorAction SilentlyContinue
    }

    if ($script:CreatedRepository -and -not $KeepRepository) {
        Write-Host "Deleting disposable repository $script:Repository..."
        gh repo delete $script:Repository --yes
    }
    elseif ($script:CreatedRepository) {
        Write-Host "Kept disposable repository: https://github.com/$script:Repository"
    }

    # Exit with code 1 if any check failed, without emitting a raw PS exception.
    $failCount = @($script:Results | Where-Object { $_.status -eq 'FAIL' }).Count
    if ($failCount -gt 0) { exit 1 }
}
