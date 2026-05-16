[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [string]$Repository,

    [string]$StudentUsername = '',

    [switch]$KeepClone
)

$ErrorActionPreference = 'Stop'

function Invoke-CheckedCommand {
    param([string]$FilePath, [string[]]$Arguments)
    & $FilePath @Arguments
    if ($LASTEXITCODE -ne 0) {
        throw "Command failed: $FilePath $($Arguments -join ' ')"
    }
}

function Ensure-Label {
    param([string]$Name, [string]$Color, [string]$Description)
    & gh label create $Name -R $Repository --color $Color --description $Description 2>$null
    if ($LASTEXITCODE -ne 0) {
        & gh label edit $Name -R $Repository --color $Color --description $Description 2>$null | Out-Null
    }
}

function Get-IssueNumberByTitle {
    param([string]$Title)
    $issuesJson = gh issue list -R $Repository --state all --limit 200 --json "number,title"
    if (-not $issuesJson) { return $null }
    $issues = $issuesJson | ConvertFrom-Json
    $match = $issues | Where-Object { $_.title -eq $Title } | Select-Object -First 1
    if ($match) { return $match.number }
    return $null
}

function Ensure-Issue {
    param([string]$Title, [string[]]$BodyLines, [string[]]$Labels)

    $existing = Get-IssueNumberByTitle -Title $Title
    if ($existing) {
        Write-Host "Issue already exists: #$existing $Title"
        return $existing
    }

    $bodyPath = Join-Path ([IO.Path]::GetTempPath()) ("peer-simulation-" + [guid]::NewGuid() + ".md")
    [IO.File]::WriteAllText($bodyPath, ([string]::Join("`n", $BodyLines) + "`n"), [Text.Encoding]::UTF8)
    try {
        $args = @('issue', 'create', '-R', $Repository, '--title', $Title, '--body-file', $bodyPath)
        foreach ($label in $Labels) {
            $args += @('--label', $label)
        }
        $url = gh @args
        if ($LASTEXITCODE -ne 0) { throw "Could not create issue $Title" }
        Write-Host "Created issue: $url"
        return (Get-IssueNumberByTitle -Title $Title)
    }
    finally {
        Remove-Item $bodyPath -Force -ErrorAction SilentlyContinue
    }
}

Invoke-CheckedCommand gh @('auth', 'status', '-h', 'github.com')

Ensure-Label -Name 'peer-simulation' -Color '5319e7' -Description 'Seeded scenario that simulates peer collaboration in a private Learning Room'
Ensure-Label -Name 'needs-triage' -Color 'fbca04' -Description 'Needs issue triage or clarification'
Ensure-Label -Name 'accessibility' -Color '0052cc' -Description 'Accessibility-related practice item'
Ensure-Label -Name 'review-practice' -Color '0e8a16' -Description 'Pull request review practice'

$studentLine = if ($StudentUsername) { "This scenario was prepared for @$StudentUsername." } else { "This scenario was prepared for the student using this repository." }

$issueOne = Ensure-Issue `
    -Title 'Peer Simulation: Welcome Link Needs Context' `
    -Labels @('peer-simulation', 'needs-triage', 'accessibility') `
    -BodyLines @(
    '## Peer Simulation: Welcome Link Needs Context',
    '',
    $studentLine,
    '',
    'A simulated peer noticed that `docs/welcome.md` still has placeholder TODO content and does not yet explain why assistive technology users bring valuable perspective to open source projects.',
    '',
    '### Your collaboration task',
    '',
    'Use this issue when a challenge asks you to interact with another person. Treat this as a real peer report:',
    '',
    '1. Read the issue description.',
    '2. Leave a constructive comment or clarifying question.',
    '3. Use `@aria-bot` in one comment if the challenge asks you to practice an @mention.',
    '4. Add a reaction if the challenge asks you to practice reactions.',
    '5. For triage practice, add or discuss useful labels.',
    '',
    '### Real-world skill',
    '',
    'This simulates reviewing a teammate issue in a shared open source project while keeping the workshop repository private.'
)

$issueTwo = Ensure-Issue `
    -Title 'Peer Simulation: Review Request for Contribution Guidance' `
    -Labels @('peer-simulation', 'review-practice') `
    -BodyLines @(
    '## Peer Simulation: Review Request for Contribution Guidance',
    '',
    $studentLine,
    '',
    'A simulated peer opened a pull request that improves contribution guidance. Your task is to review it the way you would review a teammate contribution.',
    '',
    '### What to practice',
    '',
    '- Read the linked peer simulation pull request.',
    '- Leave at least one specific comment.',
    '- For Challenge 12, submit a formal review verdict if GitHub offers that option.',
    '- Be kind, specific, and useful.',
    '',
    'This issue exists so private Classroom repos can still include realistic peer collaboration.'
)

$workRoot = Join-Path ([IO.Path]::GetTempPath()) ("peer-simulation-" + [guid]::NewGuid())
$clonePath = Join-Path $workRoot 'repo'
New-Item -ItemType Directory -Path $workRoot | Out-Null

try {
    Invoke-CheckedCommand gh @('repo', 'clone', $Repository, $clonePath, '--', '--depth', '1')
    Push-Location $clonePath
    try {
        Invoke-CheckedCommand git @('config', 'user.name', 'Aria Workshop Bot')
        Invoke-CheckedCommand git @('config', 'user.email', 'aria-bot@users.noreply.github.com')
        Invoke-CheckedCommand git @('checkout', '-B', 'peer-simulation/review-pr')

        $sampleDir = Join-Path $clonePath 'docs\samples'
        New-Item -ItemType Directory -Path $sampleDir -Force | Out-Null
        $samplePath = Join-Path $sampleDir 'peer-review-practice.md'
        $sampleLines = @(
            '# Peer Review Practice',
            '',
            'This file simulates a contribution from another workshop participant.',
            '',
            '## Proposed Change',
            '',
            'Open source contributors should explain what they changed and why it matters. This practice file gives you something realistic to review without requiring access to another student repository.',
            '',
            '## Review Prompts',
            '',
            '- Is the purpose of the change clear?',
            '- Is the language welcoming?',
            '- Is anything missing for screen reader users?',
            '- What is one specific improvement you can suggest?'
        )
        [IO.File]::WriteAllText($samplePath, ([string]::Join("`n", $sampleLines) + "`n"), [Text.Encoding]::UTF8)

        Invoke-CheckedCommand git @('add', 'docs/samples/peer-review-practice.md')
        $hasChanges = git status --short
        if ($hasChanges) {
            Invoke-CheckedCommand git @('commit', '-m', 'Add peer review practice scenario')
            Invoke-CheckedCommand git @('push', '--force', '-u', 'origin', 'peer-simulation/review-pr')
        }

        $existingPrJson = gh pr list -R $Repository --head 'peer-simulation/review-pr' --state all --json "number,url"
        $existingPr = if ($existingPrJson) { ($existingPrJson | ConvertFrom-Json | Select-Object -First 1) } else { $null }
        if ($existingPr) {
            Write-Host "Peer simulation PR already exists: $($existingPr.url)"
        }
        else {
            $bodyLines = @(
                '## Peer Simulation PR',
                '',
                'This pull request simulates a contribution from another workshop participant.',
                '',
                'Use it for challenges that ask you to review, comment on, or compare with a peer contribution.',
                '',
                "Related issue: #$issueTwo"
            )
            $bodyPath = Join-Path ([IO.Path]::GetTempPath()) ("peer-simulation-pr-" + [guid]::NewGuid() + ".md")
            [IO.File]::WriteAllText($bodyPath, ([string]::Join("`n", $bodyLines) + "`n"), [Text.Encoding]::UTF8)
            try {
                Invoke-CheckedCommand gh @('pr', 'create', '-R', $Repository, '--base', 'main', '--head', 'peer-simulation/review-pr', '--title', 'Peer Simulation: Improve contribution guidance', '--body-file', $bodyPath)
            }
            finally {
                Remove-Item $bodyPath -Force -ErrorAction SilentlyContinue
            }
        }
    }
    finally {
        Pop-Location
    }
}
finally {
    if (-not $KeepClone -and (Test-Path $workRoot)) {
        Remove-Item -LiteralPath $workRoot -Recurse -Force
    }
}

Write-Host "Peer simulation is ready in $Repository."
