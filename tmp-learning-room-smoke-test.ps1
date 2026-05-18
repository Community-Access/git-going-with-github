param(
  [Parameter(Mandatory = $true)]
  [string]$Repo,

  [Parameter(Mandatory = $true)]
  [string]$Dir,

  [string]$User = 'accesswatch'
)

$ErrorActionPreference = 'Stop'

function Get-IssueByPrefix {
  param(
    [string]$Prefix,
    [string]$State = 'all'
  )

  $issues = gh issue list -R $Repo --state $State --limit 200 --json number,title,state,url | ConvertFrom-Json
  $match = $issues | Where-Object { $_.title -like "$Prefix*" } | Select-Object -First 1
  if (-not $match) {
    throw "Issue not found for prefix: $Prefix"
  }
  return $match
}

function Get-LatestRunId {
  param(
    [string]$Workflow,
    [string]$Event = ''
  )

  $args = @('run', 'list', '-R', $Repo, '--workflow', $Workflow, '--limit', '1', '--json', 'databaseId')
  if ($Event) {
    $args += @('--event', $Event)
  }

  $raw = & gh @args
  if (-not $raw) {
    return ''
  }

  $runs = $raw | ConvertFrom-Json
  if (-not $runs -or $runs.Count -eq 0) {
    return ''
  }

  return [string]$runs[0].databaseId
}

function Wait-NewRun {
  param(
    [string]$Workflow,
    [string]$PreviousId,
    [string]$Event = ''
  )

  for ($attempt = 0; $attempt -lt 40; $attempt += 1) {
    $current = Get-LatestRunId -Workflow $Workflow -Event $Event
    if ($current -and $current -ne $PreviousId) {
      return $current
    }
  }

  throw "No new run detected for workflow $Workflow"
}

function Watch-TriggeredRun {
  param(
    [scriptblock]$Action,
    [string]$Workflow,
    [string]$Event = ''
  )

  $previous = Get-LatestRunId -Workflow $Workflow -Event $Event
  & $Action
  $runId = Wait-NewRun -Workflow $Workflow -PreviousId $previous -Event $Event
  & gh run watch $runId -R $Repo --exit-status | Out-Null
  return $runId
}

function Assert-CommentContains {
  param(
    [int]$IssueNumber,
    [string]$Needle
  )

  $comments = gh api "repos/$Repo/issues/$IssueNumber/comments" | ConvertFrom-Json
  $found = $comments | Where-Object { $_.body -like "*$Needle*" } | Select-Object -First 1
  if (-not $found) {
    throw "Did not find expected comment text '$Needle' on issue or PR #$IssueNumber"
  }
}

function Sync-Main {
  Push-Location $Dir
  try {
    git checkout main | Out-Null
    git fetch origin | Out-Null
    git pull --ff-only origin main | Out-Null
  }
  finally {
    Pop-Location
  }
}

function New-TestPr {
  param(
    [string]$Branch,
    [string]$RelativePath,
    [string]$Content,
    [string]$CommitMessage,
    [string]$Title,
    [string]$Body,
    [string[]]$ExpectedWorkflows,
    [switch]$Append
  )

  Sync-Main
  Push-Location $Dir
  try {
    git checkout -b $Branch | Out-Null

    $fullPath = Join-Path $Dir $RelativePath
    $parent = Split-Path $fullPath -Parent
    if (-not (Test-Path $parent)) {
      New-Item -ItemType Directory -Path $parent -Force | Out-Null
    }

    if ($Append) {
      Add-Content -Path $fullPath -Value $Content
    }
    else {
      Set-Content -Path $fullPath -Value $Content
    }

    git add $RelativePath
    git commit -m $CommitMessage | Out-Null
    git push -u origin $Branch | Out-Null

    $previousRuns = @{}
    foreach ($workflow in $ExpectedWorkflows) {
      $previousRuns[$workflow] = Get-LatestRunId -Workflow $workflow -Event 'pull_request'
    }

    gh pr create -R $Repo --base main --head $Branch --title $Title --body $Body | Out-Null

    $pr = gh pr list -R $Repo --head $Branch --state open --json number,url | ConvertFrom-Json | Select-Object -First 1
    if (-not $pr) {
      throw "PR not created for branch $Branch"
    }

    foreach ($workflow in $ExpectedWorkflows) {
      $runId = Wait-NewRun -Workflow $workflow -PreviousId $previousRuns[$workflow] -Event 'pull_request'
      gh run watch $runId -R $Repo --exit-status | Out-Null
    }

    return $pr
  }
  finally {
    Pop-Location
  }
}

function Merge-TestPr {
  param([int]$PrNumber)

  $previousStudent = Get-LatestRunId -Workflow 'student-progression.yml' -Event 'issues'
  $previousSkills = Get-LatestRunId -Workflow 'skills-progression.yml' -Event 'pull_request'

  gh pr merge $PrNumber -R $Repo --merge --delete-branch --admin | Out-Null

  $skillsRun = Wait-NewRun -Workflow 'skills-progression.yml' -PreviousId $previousSkills -Event 'pull_request'
  gh run watch $skillsRun -R $Repo --exit-status | Out-Null

  $studentRun = Wait-NewRun -Workflow 'student-progression.yml' -PreviousId $previousStudent -Event 'issues'
  gh run watch $studentRun -R $Repo --exit-status | Out-Null
}

Write-Output "Starting smoke test for $Repo"

Watch-TriggeredRun -Action { gh workflow run student-progression.yml -R $Repo -f start_challenge=1 -f assignee=$User | Out-Null } -Workflow 'student-progression.yml' -Event 'workflow_dispatch' | Out-Null
$challenge1 = Get-IssueByPrefix -Prefix 'Challenge 1:' -State 'open'
Write-Output "Challenge 1 created: #$($challenge1.number)"

Watch-TriggeredRun -Action { gh issue close $challenge1.number -R $Repo --comment 'Smoke test: close challenge 1 to validate progression.' | Out-Null } -Workflow 'student-progression.yml' -Event 'issues' | Out-Null
$challenge2 = Get-IssueByPrefix -Prefix 'Challenge 2:' -State 'open'
Write-Output "Challenge 2 created: #$($challenge2.number)"

Watch-TriggeredRun -Action {
  gh issue create -R $Repo -t 'Replace TODO in welcome.md intro section' -b "What: Replace the placeholder TODO with real welcome text.`nWhere: docs/welcome.md, intro section.`nWhy: New contributors need clear context when they open the file.`nTODO found: TODO: Add a short workshop welcome paragraph." | Out-Null
} -Workflow 'autograder-issue-filed.yml' -Event 'issues' | Out-Null
$studentIssue = Get-IssueByPrefix -Prefix 'Replace TODO in welcome.md intro section' -State 'open'
Assert-CommentContains -IssueNumber $studentIssue.number -Needle '## Challenge 2: First issue filed!'
Write-Output "Challenge 2 feedback verified on issue #$($studentIssue.number)"

Watch-TriggeredRun -Action { gh issue close $challenge2.number -R $Repo --comment 'Smoke test: close challenge 2 to validate progression.' | Out-Null } -Workflow 'student-progression.yml' -Event 'issues' | Out-Null
$challenge3 = Get-IssueByPrefix -Prefix 'Challenge 3:' -State 'open'
Watch-TriggeredRun -Action { gh issue comment $challenge3.number -R $Repo -b '@bot help' | Out-Null } -Workflow 'pr-validation-bot.yml' -Event 'issue_comment' | Out-Null
Assert-CommentContains -IssueNumber $challenge3.number -Needle 'Here are some helpful resources'
Write-Output 'Comment responder verified on challenge 3'

Watch-TriggeredRun -Action { gh issue close $challenge3.number -R $Repo --comment 'Smoke test: close challenge 3 to validate progression.' | Out-Null } -Workflow 'student-progression.yml' -Event 'issues' | Out-Null
$challenge4 = Get-IssueByPrefix -Prefix 'Challenge 4:' -State 'open'
Watch-TriggeredRun -Action { gh issue close $challenge4.number -R $Repo --comment 'Smoke test: close challenge 4 to validate progression.' | Out-Null } -Workflow 'student-progression.yml' -Event 'issues' | Out-Null
$challenge5 = Get-IssueByPrefix -Prefix 'Challenge 5:' -State 'open'
Watch-TriggeredRun -Action { gh issue close $challenge5.number -R $Repo --comment 'Smoke test: close challenge 5 to validate progression.' | Out-Null } -Workflow 'student-progression.yml' -Event 'issues' | Out-Null
$challenge6 = Get-IssueByPrefix -Prefix 'Challenge 6:' -State 'open'
Write-Output 'Challenge 6 ready for PR workflow test'

$pr1Body = "## What this PR does`nAdds a small smoke-test update to welcome guidance.`n`n## Why`nThis exercises the Learning Room Day 1 PR feedback workflows end to end.`n`nCloses #$($challenge6.number)"
$pr1 = New-TestPr -Branch 'learn/accesswatch-smoke' -RelativePath 'docs/welcome.md' -Content "`nSmoke test PR 1: validate Day 1 workflow feedback." -CommitMessage 'docs: add smoke test line to welcome guidance' -Title 'docs: validate Day 1 workflow feedback' -Body $pr1Body -ExpectedWorkflows @(
  'Challenge 5: Branch Commit Check',
  'Challenge 10: Local Commit Check',
  'Challenge 6: PR Linked to Issue Check',
  'Challenge 7: Merge Conflict Resolution Check',
  'PR Validation & Feedback Bot',
  'Accessibility & Content Validation'
) -Append
Assert-CommentContains -IssueNumber $pr1.number -Needle 'Welcome to Your First Pull Request'
Assert-CommentContains -IssueNumber $pr1.number -Needle 'PR Validation Report'
Assert-CommentContains -IssueNumber $pr1.number -Needle 'Content Validation Report'
Assert-CommentContains -IssueNumber $pr1.number -Needle '## Challenge 5:'
Assert-CommentContains -IssueNumber $pr1.number -Needle '## Challenge 6:'
Assert-CommentContains -IssueNumber $pr1.number -Needle '## Challenge 7:'
Write-Output "PR 1 feedback verified on PR #$($pr1.number)"
Merge-TestPr -PrNumber $pr1.number
Assert-CommentContains -IssueNumber $pr1.number -Needle '## Achievement Unlocked'
$challenge7 = Get-IssueByPrefix -Prefix 'Challenge 7:' -State 'open'
Write-Output 'Challenge 7 created after merging PR 1'

Watch-TriggeredRun -Action { gh issue close $challenge7.number -R $Repo --comment 'Smoke test: close challenge 7 to validate progression.' | Out-Null } -Workflow 'student-progression.yml' -Event 'issues' | Out-Null
$challenge8 = Get-IssueByPrefix -Prefix 'Challenge 8:' -State 'open'
Watch-TriggeredRun -Action { gh issue close $challenge8.number -R $Repo --comment 'Smoke test: close challenge 8 to validate progression.' | Out-Null } -Workflow 'student-progression.yml' -Event 'issues' | Out-Null
$challenge9 = Get-IssueByPrefix -Prefix 'Challenge 9:' -State 'open'
Watch-TriggeredRun -Action { gh issue close $challenge9.number -R $Repo --comment 'Smoke test: close challenge 9 to validate progression.' | Out-Null } -Workflow 'student-progression.yml' -Event 'issues' | Out-Null
$challenge10 = Get-IssueByPrefix -Prefix 'Challenge 10:' -State 'open'
Watch-TriggeredRun -Action { gh issue close $challenge10.number -R $Repo --comment 'Smoke test: close challenge 10 to validate progression.' | Out-Null } -Workflow 'student-progression.yml' -Event 'issues' | Out-Null
$challenge11 = Get-IssueByPrefix -Prefix 'Challenge 11:' -State 'open'
Write-Output 'Challenge 11 ready for Day 2 PR workflow test'

$pr2Body = "## What this PR does`nAdds a small smoke-test README update for local-workflow validation.`n`n## Why`nThis exercises the Day 2 PR and local commit feedback path.`n`nCloses #$($challenge11.number)"
$pr2 = New-TestPr -Branch 'fix/accesswatch-smoke' -RelativePath 'README.md' -Content "`nSmoke test PR 2: validate Day 2 workflow feedback." -CommitMessage 'docs: add smoke test line to README' -Title 'docs: validate Day 2 workflow feedback' -Body $pr2Body -ExpectedWorkflows @(
  'Challenge 5: Branch Commit Check',
  'Challenge 10: Local Commit Check',
  'Challenge 6: PR Linked to Issue Check',
  'PR Validation & Feedback Bot',
  'Accessibility & Content Validation'
) -Append
Assert-CommentContains -IssueNumber $pr2.number -Needle 'PR Validation Report'
Assert-CommentContains -IssueNumber $pr2.number -Needle 'Content Validation Report'
Assert-CommentContains -IssueNumber $pr2.number -Needle '## Challenge 10:'
Assert-CommentContains -IssueNumber $pr2.number -Needle '## Challenge 6:'
Write-Output "PR 2 feedback verified on PR #$($pr2.number)"
Merge-TestPr -PrNumber $pr2.number
Assert-CommentContains -IssueNumber $pr2.number -Needle '## Achievement Unlocked'
$challenge12 = Get-IssueByPrefix -Prefix 'Challenge 12:' -State 'open'

Watch-TriggeredRun -Action { gh issue close $challenge12.number -R $Repo --comment 'Smoke test: close challenge 12 to validate progression.' | Out-Null } -Workflow 'student-progression.yml' -Event 'issues' | Out-Null
$challenge13 = Get-IssueByPrefix -Prefix 'Challenge 13:' -State 'open'
Watch-TriggeredRun -Action { gh issue close $challenge13.number -R $Repo --comment 'Smoke test: close challenge 13 to validate progression.' | Out-Null } -Workflow 'student-progression.yml' -Event 'issues' | Out-Null
$challenge14 = Get-IssueByPrefix -Prefix 'Challenge 14:' -State 'open'
Write-Output 'Challenge 14 ready for template PR workflow test'

$templateContent = @"
name: ""Smoke Test Template""
description: ""Template created by automated smoke test""
title: ""[SMOKE]: ""
labels: [""custom-template""]
body:
  - type: markdown
    attributes:
      value: |
        ## Smoke Test Template
        This template exists to validate the workflow path.
  - type: textarea
    id: details
    attributes:
      label: ""Details""
      description: ""Describe your request.""
    validations:
      required: true
"@
$pr3Body = "## What this PR does`nAdds a custom issue template for smoke testing.`n`n## Why`nThis validates the Challenge 14 template workflow end to end.`n`nCloses #$($challenge14.number)"
$pr3 = New-TestPr -Branch 'template-remix/accesswatch-smoke' -RelativePath '.github/ISSUE_TEMPLATE/accesswatch-smoke-template.yml' -Content $templateContent -CommitMessage 'feat: add smoke test issue template' -Title 'feat: validate Challenge 14 template workflow' -Body $pr3Body -ExpectedWorkflows @(
  'Challenge 5: Branch Commit Check',
  'Challenge 10: Local Commit Check',
  'Challenge 6: PR Linked to Issue Check',
  'Challenge 14: Issue Template Validation',
  'PR Validation & Feedback Bot',
  'Accessibility & Content Validation'
)
Assert-CommentContains -IssueNumber $pr3.number -Needle 'PR Validation Report'
Assert-CommentContains -IssueNumber $pr3.number -Needle 'Content Validation Report'
Assert-CommentContains -IssueNumber $pr3.number -Needle '## Challenge 14:'
Write-Output "PR 3 feedback verified on PR #$($pr3.number)"
Merge-TestPr -PrNumber $pr3.number
Assert-CommentContains -IssueNumber $pr3.number -Needle '## Achievement Unlocked'
$challenge15 = Get-IssueByPrefix -Prefix 'Challenge 15:' -State 'open'

Watch-TriggeredRun -Action { gh issue close $challenge15.number -R $Repo --comment 'Smoke test: close challenge 15 to validate progression and bonus unlocks.' | Out-Null } -Workflow 'student-progression.yml' -Event 'issues' | Out-Null
$challenge16 = Get-IssueByPrefix -Prefix 'Challenge 16:' -State 'open'
$bonusA = Get-IssueByPrefix -Prefix 'Bonus A:' -State 'open'
$bonusB = Get-IssueByPrefix -Prefix 'Bonus B:' -State 'open'
$bonusC = Get-IssueByPrefix -Prefix 'Bonus C:' -State 'open'
$bonusD = Get-IssueByPrefix -Prefix 'Bonus D:' -State 'open'
$bonusE = Get-IssueByPrefix -Prefix 'Bonus E:' -State 'open'
Write-Output 'Challenge 16 and bonus issues created'

$agentContent = @"
---
name: ""Smoke Test Agent""
description: ""Validates the capstone workflow path""
tools: [""codebase""]
---

# Smoke Test Agent

## Responsibilities
- Confirm the capstone validation workflow runs.
- Provide a minimal valid agent file for testing.
- Keep the smoke test deterministic.

## Guardrails
- Never change unrelated files.
- Always keep the content minimal and valid.
"@
$pr4Body = "## What this PR does`nAdds a minimal valid agent file for smoke testing.`n`n## Why`nThis validates the Challenge 16 capstone workflow end to end.`n`nCloses #$($challenge16.number)"
$pr4 = New-TestPr -Branch 'capstone/accesswatch-smoke' -RelativePath 'agents/smoke-test-agent.md' -Content $agentContent -CommitMessage 'feat: add smoke test agent file' -Title 'feat: validate Challenge 16 capstone workflow' -Body $pr4Body -ExpectedWorkflows @(
  'Challenge 5: Branch Commit Check',
  'Challenge 10: Local Commit Check',
  'Challenge 6: PR Linked to Issue Check',
  'Challenge 16: Capstone Agent File Validation',
  'PR Validation & Feedback Bot',
  'Accessibility & Content Validation'
)
Assert-CommentContains -IssueNumber $pr4.number -Needle 'PR Validation Report'
Assert-CommentContains -IssueNumber $pr4.number -Needle 'Content Validation Report'
Assert-CommentContains -IssueNumber $pr4.number -Needle '## Challenge 16:'
Write-Output "PR 4 feedback verified on PR #$($pr4.number)"
Merge-TestPr -PrNumber $pr4.number
Assert-CommentContains -IssueNumber $pr4.number -Needle '## Achievement Unlocked'

$failedRuns = gh run list -R $Repo --status failure --limit 100 --json workflowName,displayTitle,url | ConvertFrom-Json
if ($failedRuns -and $failedRuns.Count -gt 0) {
  $failedRuns | ForEach-Object {
    Write-Output "FAILED: $($_.workflowName) | $($_.displayTitle) | $($_.url)"
  }
  throw 'Smoke test detected failed workflow runs.'
}

$allIssues = gh issue list -R $Repo --state all --limit 200 --json number,title,state | ConvertFrom-Json
foreach ($index in 1..16) {
  $prefix = "Challenge ${index}:"
  $match = $allIssues | Where-Object { $_.title -like "$prefix*" } | Select-Object -First 1
  if (-not $match) {
    throw "Missing expected issue for $prefix"
  }
}
foreach ($bonusPrefix in @('Bonus A:','Bonus B:','Bonus C:','Bonus D:','Bonus E:')) {
  $match = $allIssues | Where-Object { $_.title -like "$bonusPrefix*" } | Select-Object -First 1
  if (-not $match) {
    throw "Missing expected issue for $bonusPrefix"
  }
}

Write-Output 'SMOKE TEST PASSED'
Write-Output "Repo: https://github.com/$Repo"
Write-Output "PRs verified: #$($pr1.number), #$($pr2.number), #$($pr3.number), #$($pr4.number)"
Write-Output "Bonuses verified: #$($bonusA.number), #$($bonusB.number), #$($bonusC.number), #$($bonusD.number), #$($bonusE.number)"
