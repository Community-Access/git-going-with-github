<#
.SYNOPSIS
    Rebuilds the Git Going support environment from scratch in GitHub.

.DESCRIPTION
    This script provisions and/or repairs the support repository
    `Community-Access/support` to a known-good baseline.

    Actions performed:
    1. Ensures the repository exists (creates it if missing)
    2. Enables Issues and Discussions
    3. Applies support labels
    4. Applies baseline support files (README, CONTRIBUTING, templates, workflows)

    Use this script when the support environment must be reset quickly between cohorts
    or after accidental repository drift.

.PARAMETER Owner
    GitHub owner/org for the support repository.

.PARAMETER RepoName
    Support repository name.

.PARAMETER Public
    Create repository as public when auto-creating.

.EXAMPLE
    .\scripts\classroom\Reset-SupportHubEnvironment.ps1
#>

[CmdletBinding(SupportsShouldProcess)]
param(
    [string]$Owner = 'Community-Access',
    [string]$RepoName = 'support',
    [switch]$Public
)

$ErrorActionPreference = 'Stop'

function Invoke-CheckedCommand {
    param([string]$FilePath, [string[]]$Arguments)
    & $FilePath @Arguments
    if ($LASTEXITCODE -ne 0) {
        throw "Command failed: $FilePath $($Arguments -join ' ')"
    }
}

$fullRepo = "$Owner/$RepoName"
$isPublic = $Public.IsPresent -or $true

Write-Host "Resetting support environment for $fullRepo"
Invoke-CheckedCommand gh @('auth', 'status', '-h', 'github.com')

$repoExists = $true
try {
    & gh repo view $fullRepo 1>$null 2>$null
    if ($LASTEXITCODE -ne 0) {
        $repoExists = $false
    }
}
catch {
    $repoExists = $false
}

if (-not $repoExists) {
    $visibilityArg = if ($isPublic) { '--public' } else { '--private' }
    Write-Host "Repository not found. Creating $fullRepo ..."
    Invoke-CheckedCommand gh @(
        'repo', 'create', $fullRepo,
        $visibilityArg,
        '--description', 'Open support hub for GIT Going with GitHub alumni questions, troubleshooting, and async community help',
        '--clone=false'
    )
}

Write-Host 'Ensuring Issues and Discussions are enabled...'
Invoke-CheckedCommand gh @('repo', 'edit', $fullRepo, '--enable-issues=true', '--enable-discussions=true')

$labels = @(
    @{ Name='needs-triage'; Color='FBCA04'; Description='New issue awaiting first maintainer response' },
    @{ Name='setup'; Color='0052CC'; Description='Environment setup and installation support' },
    @{ Name='classroom'; Color='5319E7'; Description='GitHub Classroom and assignment flow support' },
    @{ Name='accessibility'; Color='0E8A16'; Description='Screen reader, keyboard, and accessibility support' },
    @{ Name='copilot'; Color='1D76DB'; Description='GitHub Copilot and AI-assisted workflow support' },
    @{ Name='good-first-answer'; Color='0E8A16'; Description='Great issue for community responders' },
    @{ Name='office-hours'; Color='B60205'; Description='Candidate topic for live office hours' },
    @{ Name='escalated'; Color='D93F0B'; Description='Needs maintainer escalation' },
    @{ Name='resolved'; Color='C2E0C6'; Description='Issue has been resolved' }
)

Write-Host 'Applying support labels...'
foreach ($label in $labels) {
    & gh label create $label.Name -R $fullRepo --color $label.Color --description $label.Description --force 1>$null 2>$null
    if ($LASTEXITCODE -ne 0) {
        throw "Failed to apply label: $($label.Name)"
    }
}

$scriptDir = if ($PSScriptRoot) { $PSScriptRoot } else { Split-Path -Parent $MyInvocation.MyCommand.Path }
$workRoot = Join-Path ([IO.Path]::GetTempPath()) ("support-hub-reset-" + [guid]::NewGuid())
$clonePath = Join-Path $workRoot $RepoName

New-Item -ItemType Directory -Path $workRoot | Out-Null
try {
    Invoke-CheckedCommand gh @('repo', 'clone', $fullRepo, $clonePath)

    Push-Location $clonePath
    try {
        New-Item -ItemType Directory -Path '.github/ISSUE_TEMPLATE' -Force | Out-Null
        New-Item -ItemType Directory -Path '.github/workflows' -Force | Out-Null

        $readme = @"
    # Community Access Support Hub

    Open support hub for GIT Going with GitHub learners, alumni, and contributors.

    ## Start Here

    - Read the pinned Discussions welcome thread and posting guidance.
    - Open an issue if you are blocked and need tracked troubleshooting.
    - Use Discussions for Q&A, study groups, and follow-up learning.
    - Search first, then post with clear reproduction details and expected behavior.

    ## Linked Repositories

    - Curriculum and workshop source: https://github.com/Community-Access/git-going-with-github
    - Accessibility Agents project: https://github.com/Community-Access/accessibility-agents
    - Support issues: https://github.com/Community-Access/support/issues
    - Support discussions: https://github.com/Community-Access/support/discussions
    "@
        [IO.File]::WriteAllText((Join-Path $clonePath 'README.md'), $readme, [Text.UTF8Encoding]::new($false))

        $contrib = @"
    # Contributing To Community Access Support

Use this repository for support operations, troubleshooting, and learner Q&A.
Route curriculum source changes to Community-Access/git-going-with-github.
    Route Accessibility Agents feature/code changes to Community-Access/accessibility-agents.
"@
        [IO.File]::WriteAllText((Join-Path $clonePath 'CONTRIBUTING.md'), $contrib, [Text.UTF8Encoding]::new($false))

        $issueConfig = @"
blank_issues_enabled: true
contact_links:
  - name: Support Hub Discussions (Q&A)
    url: https://github.com/Community-Access/support/discussions
    about: Use Discussions for async mentoring and community Q&A.
"@
        [IO.File]::WriteAllText((Join-Path $clonePath '.github/ISSUE_TEMPLATE/config.yml'), $issueConfig, [Text.UTF8Encoding]::new($false))

                $firstResponse = @(
                    'name: First Response Assistant'
                    ''
                    'on:'
                    '  issues:'
                    '    types: [opened]'
                    ''
                    'permissions:'
                    '  issues: write'
                    ''
                    'jobs:'
                    '  first-response:'
                    '    runs-on: ubuntu-latest'
                    '    steps:'
                    '      - uses: actions/github-script@v8'
                    '        with:'
                    '          script: |'
                    '            await github.rest.issues.createComment({'
                    '              owner: context.repo.owner,'
                    '              repo: context.repo.repo,'
                    '              issue_number: context.issue.number,'
                    "              body: 'Thanks for opening this request. A maintainer will review it within 24 to 48 hours.'"
                    '            });'
                    ''
                ) -join "`n"
        [IO.File]::WriteAllText((Join-Path $clonePath '.github/workflows/first-response.yml'), $firstResponse, [Text.UTF8Encoding]::new($false))

        Invoke-CheckedCommand git @('config', 'user.name', 'accesswatch')
        Invoke-CheckedCommand git @('config', 'user.email', 'accesswatch@users.noreply.github.com')
        Invoke-CheckedCommand git @('add', '-A')

        $status = git status --short
        if ($status) {
            Invoke-CheckedCommand git @('commit', '-m', 'chore: reset support hub baseline')
            Invoke-CheckedCommand git @('push', 'origin', 'HEAD:main')
        }
        else {
            Write-Host 'Support repository already matched baseline content.'
        }
    }
    finally {
        Pop-Location
    }
}
finally {
    if (Test-Path $workRoot) {
        Remove-Item -LiteralPath $workRoot -Recurse -Force
    }
}

Write-Host 'Support environment reset complete.'
