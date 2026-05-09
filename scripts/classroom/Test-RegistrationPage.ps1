<#
.SYNOPSIS
    Validates that the workshop registration page is deployed and the registration
    workflow functions end to end. Closes and locks the test issue after verification.

.DESCRIPTION
    Performs the following checks:

    1. SITE CHECK -- HTTP GET to the deployed Pages site homepage.
    2. REGISTER PAGE CHECK -- HTTP GET to the /REGISTER page and verifies expected content.
    3. ISSUE FORM CHECK -- Confirms workshop-registration.yml exists in the repository.
    4. LABELS CHECK -- Confirms registration, duplicate, and waitlist labels exist.
    5. WORKFLOW CHECK -- Confirms registration.yml is enabled and has a recent success.
    6. LIVE TEST (optional) -- Submits a test registration issue as a configured test
       account, waits for the workflow to complete, inspects the welcome comment,
       then closes and locks the test issue.

    LIMITATIONS (GitHub API hard constraints):
    - Test issues submitted during live testing cannot be deleted via the GitHub REST API.
      The script closes and locks the issue. A repository admin must delete it manually if
      desired at: https://github.com/Community-Access/git-going-with-github/issues
    - This script cannot test the org-invite step of registration unless the test account
      is not already a member of Community-Access-Classroom.

.PARAMETER Repo
    Repository to validate. Defaults to Community-Access/git-going-with-github.

.PARAMETER SiteBaseUrl
    Base URL for the deployed GitHub Pages site.
    Defaults to https://community-access.org/git-going-with-github

.PARAMETER RunLiveTest
    Submit a live test registration issue and verify the workflow output.
    Requires -TestIssueTitle to be unique enough not to match existing issues.

.PARAMETER TestIssueTitle
    Title prefix for the test registration issue.
    Defaults to "[REGISTER] QA Test - Do Not Process"

.PARAMETER WorkflowTimeoutSeconds
    Seconds to wait for the registration workflow to complete during live test.
    Defaults to 120.

.EXAMPLE
    # Site and config checks only (no live issue submission)
    .\Test-RegistrationPage.ps1

.EXAMPLE
    # Full live test including issue submission and workflow verification
    .\Test-RegistrationPage.ps1 -RunLiveTest

.EXAMPLE
    # Full live test with custom timeout
    .\Test-RegistrationPage.ps1 -RunLiveTest -WorkflowTimeoutSeconds 180
#>

[CmdletBinding()]
param(
    [string]$Repo = 'Community-Access/git-going-with-github',

    [string]$SiteBaseUrl = 'https://community-access.org/git-going-with-github',

    [switch]$RunLiveTest,

    [string]$TestIssueTitle = '[REGISTER] QA Test - Do Not Process',

    [int]$WorkflowTimeoutSeconds = 120
)

$ErrorActionPreference = 'Stop'

function Write-Step { param([string]$m) Write-Host "`n==> $m" -ForegroundColor Cyan }
function Write-Pass { param([string]$m) Write-Host "    [PASS] $m" -ForegroundColor Green }
function Write-Fail { param([string]$m) Write-Host "    [FAIL] $m" -ForegroundColor Red }
function Write-Warn { param([string]$m) Write-Host "    [WARN] $m" -ForegroundColor Yellow }
function Write-Info { param([string]$m) Write-Host "    $m" -ForegroundColor Gray }

$failures = [System.Collections.Generic.List[string]]::new()
$warnings = [System.Collections.Generic.List[string]]::new()

# ---------------------------------------------------------------------------
# 0. Auth check
# ---------------------------------------------------------------------------
Write-Step "GitHub CLI authentication"
gh auth status -h github.com 2>&1 | ForEach-Object { Write-Info $_ }
if ($LASTEXITCODE -ne 0) { throw "GitHub CLI not authenticated. Run: gh auth login" }

$currentUser = (gh api /user --jq '.login' 2>&1).Trim()
Write-Info "Authenticated as: $currentUser"

# ---------------------------------------------------------------------------
# 1. Site homepage check
# ---------------------------------------------------------------------------
Write-Step "Checking Pages site homepage: $SiteBaseUrl"

try {
    $resp = Invoke-WebRequest -Uri $SiteBaseUrl -UseBasicParsing -MaximumRedirection 5 -TimeoutSec 15
    if ($resp.StatusCode -eq 200) {
        Write-Pass "Site homepage responded HTTP $($resp.StatusCode)"
    } else {
        Write-Warn "Site homepage returned HTTP $($resp.StatusCode)"
        $warnings.Add("Site homepage HTTP $($resp.StatusCode)")
    }
} catch {
    Write-Warn "Site homepage request failed: $($_.Exception.Message)"
    $warnings.Add("Site homepage unreachable: $($_.Exception.Message)")
}

# ---------------------------------------------------------------------------
# 2. REGISTER page check
# ---------------------------------------------------------------------------
$registerUrl = "$SiteBaseUrl/REGISTER"
Write-Step "Checking REGISTER page: $registerUrl"

try {
    $regResp = Invoke-WebRequest -Uri $registerUrl -UseBasicParsing -MaximumRedirection 5 -TimeoutSec 15
    if ($regResp.StatusCode -eq 200) {
        Write-Pass "REGISTER page responded HTTP $($regResp.StatusCode)"

        # Check for key content markers in the rendered page
        $body = $regResp.Content
        if ($body -match 'register|registration|Register') {
            Write-Pass "REGISTER page contains expected registration content"
        } else {
            Write-Warn "REGISTER page loaded but expected content markers not found"
            $warnings.Add("REGISTER page content markers not found")
        }

        if ($body -match 'classroom\.github\.com|github\.com/Community-Access') {
            Write-Pass "REGISTER page contains expected GitHub links"
        } else {
            Write-Warn "REGISTER page loaded but GitHub assignment/classroom links not detected"
            $warnings.Add("REGISTER page GitHub links not detected")
        }
    } else {
        Write-Fail "REGISTER page returned HTTP $($regResp.StatusCode)"
        $failures.Add("REGISTER page HTTP $($regResp.StatusCode)")
    }
} catch {
    Write-Fail "REGISTER page request failed: $($_.Exception.Message)"
    $failures.Add("REGISTER page unreachable: $($_.Exception.Message)")
}

# ---------------------------------------------------------------------------
# 3. Issue form template check
# ---------------------------------------------------------------------------
Write-Step "Checking workshop-registration.yml issue form template"

$formExists = gh api "repos/$Repo/contents/.github/ISSUE_TEMPLATE/workshop-registration.yml" --jq '.name' 2>&1
if ($LASTEXITCODE -eq 0 -and $formExists -match 'workshop-registration') {
    Write-Pass "workshop-registration.yml exists in .github/ISSUE_TEMPLATE/"
} else {
    Write-Fail "workshop-registration.yml not found"
    $failures.Add("workshop-registration.yml missing")
}

# ---------------------------------------------------------------------------
# 4. Labels check
# ---------------------------------------------------------------------------
Write-Step "Checking required labels"

$existingLabels = gh label list -R $Repo --json name --jq '[.[].name]' 2>&1 | ConvertFrom-Json
$requiredLabels = @('registration', 'duplicate', 'waitlist')

foreach ($label in $requiredLabels) {
    if ($existingLabels -contains $label) {
        Write-Pass "Label '$label' exists"
    } else {
        Write-Fail "Label '$label' missing"
        $failures.Add("Label '$label' missing")
    }
}

# ---------------------------------------------------------------------------
# 5. Workflow check
# ---------------------------------------------------------------------------
Write-Step "Checking registration workflow state and recent run history"

$workflows = gh workflow list -R $Repo --json name,state,id 2>&1 | ConvertFrom-Json
$workflow = @($workflows) | Where-Object { $_.name -eq 'Registration - Welcome & CSV Export' } | Select-Object -First 1
if ($workflow -and $workflow.state -eq 'active') {
    Write-Pass "Registration workflow is active (id: $($workflow.id))"
} else {
    Write-Fail "Registration workflow not found or not active"
    $failures.Add("Registration workflow inactive or missing")
}

$recentRuns = gh run list -R $Repo --workflow "registration.yml" --limit 5 --json status,conclusion,createdAt 2>&1 | ConvertFrom-Json
if ($recentRuns -and @($recentRuns).Count -gt 0) {
    $lastRun = @($recentRuns)[0]
    Write-Info "Most recent run: status=$($lastRun.status) conclusion=$($lastRun.conclusion) created=$($lastRun.createdAt)"
    if ($lastRun.conclusion -eq 'success') {
        Write-Pass "Most recent registration workflow run succeeded"
    } else {
        Write-Warn "Most recent registration run conclusion: $($lastRun.conclusion)"
        $warnings.Add("Most recent registration run not successful: $($lastRun.conclusion)")
    }
} else {
    Write-Warn "No previous registration workflow runs found"
    $warnings.Add("No registration workflow run history")
}

# ---------------------------------------------------------------------------
# 6. Live test (optional)
# ---------------------------------------------------------------------------
if ($RunLiveTest) {
    Write-Step "LIVE TEST: Submitting test registration issue"
    Write-Warn "LIMITATION: Test issues cannot be deleted via the GitHub API."
    Write-Warn "This script will close and lock the test issue after verification."
    Write-Warn "To delete it permanently, use the GitHub UI after this run."

    $testBody = @"
**Name**: QA Test Account
**Pronouns**: they/them
**Time Zone**: UTC
**Assistive Tech**: None - this is an automated QA test issue. Do not process.
**Experience**: Automated test submission from Test-RegistrationPage.ps1
**Goals**: Verify registration workflow end to end
"@

    Write-Info "Creating test issue: $TestIssueTitle"
    $issueUrl = gh issue create -R $Repo `
        --title $TestIssueTitle `
        --body $testBody `
        --label registration `
        2>&1

    if ($LASTEXITCODE -ne 0) {
        Write-Fail "Failed to create test issue"
        $failures.Add("Live test: issue creation failed")
    } else {
        $issueNumber = ($issueUrl -split '/')[-1]
        Write-Pass "Test issue created: #$issueNumber ($issueUrl)"

        # Wait for workflow to trigger and complete
        Write-Info "Waiting up to $WorkflowTimeoutSeconds seconds for registration workflow..."
        $elapsed = 0
        $pollInterval = 10
        $workflowCompleted = $false

        while ($elapsed -lt $WorkflowTimeoutSeconds) {
            Start-Sleep -Seconds $pollInterval
            $elapsed += $pollInterval

            $runs = gh run list -R $Repo --workflow "registration.yml" --limit 3 --json status,conclusion,createdAt,databaseId 2>&1 | ConvertFrom-Json
            $recentRun = @($runs) | Where-Object { $_.status -eq 'completed' } | Select-Object -First 1

            if ($recentRun -and ([datetime]$recentRun.createdAt) -gt (Get-Date).AddSeconds(-($WorkflowTimeoutSeconds))) {
                Write-Pass "Registration workflow completed: conclusion=$($recentRun.conclusion)"
                $workflowCompleted = $true
                if ($recentRun.conclusion -ne 'success') {
                    Write-Fail "Registration workflow conclusion: $($recentRun.conclusion)"
                    $failures.Add("Live test: workflow conclusion $($recentRun.conclusion)")
                }
                break
            }

            Write-Info "  ...waiting ($elapsed/$WorkflowTimeoutSeconds s)"
        }

        if (-not $workflowCompleted) {
            Write-Warn "Workflow did not complete within $WorkflowTimeoutSeconds seconds. Check Actions tab manually."
            $warnings.Add("Live test: workflow timeout after $WorkflowTimeoutSeconds s")
        }

        # Check for welcome comment on the issue
        Write-Info "Checking for welcome comment on #$issueNumber..."
        Start-Sleep -Seconds 5
        $comments = gh issue view $issueNumber -R $Repo --json comments --jq '.comments' 2>&1 | ConvertFrom-Json
        if ($comments -and @($comments).Count -gt 0) {
            Write-Pass "Welcome comment posted ($(@($comments).Count) comment(s) found)"
            $firstComment = @($comments)[0]
            Write-Info "  First comment preview: $($firstComment.body.Substring(0, [Math]::Min(120, $firstComment.body.Length)))..."

            # Check for assignment links
            if ($firstComment.body -match 'classroom\.github\.com') {
                Write-Pass "Welcome comment contains classroom assignment link"
            } else {
                Write-Warn "Welcome comment does not contain classroom.github.com link (variables may not be set)"
                $warnings.Add("Live test: welcome comment missing assignment links")
            }
        } else {
            Write-Fail "No comment found on test issue #$issueNumber"
            $failures.Add("Live test: no welcome comment posted")
        }

        # Check labels
        $issueLabels = gh issue view $issueNumber -R $Repo --json labels --jq '[.labels[].name]' 2>&1 | ConvertFrom-Json
        if ($issueLabels -contains 'registration') {
            Write-Pass "registration label applied to test issue"
        } else {
            Write-Fail "registration label not applied to test issue -- labels found: $($issueLabels -join ', ')"
            $failures.Add("Live test: registration label not applied")
        }

        # Cleanup: close and lock test issue
        Write-Info "Closing and locking test issue #$issueNumber..."
        gh issue close $issueNumber -R $Repo --comment "QA test issue. Closed by Test-RegistrationPage.ps1 after successful verification." 2>&1 | Out-Null
        gh api -X PUT "repos/$Repo/issues/$issueNumber/lock" -f lock_reason=resolved 2>&1 | Out-Null
        Write-Pass "Test issue #$issueNumber closed and locked"
        Write-Warn "Issue #$issueNumber cannot be deleted via API. Delete it manually if needed:"
        Write-Warn "  https://github.com/$Repo/issues/$issueNumber"
    }
}

# ---------------------------------------------------------------------------
# Summary
# ---------------------------------------------------------------------------
Write-Host "`n=============================" -ForegroundColor White

if ($failures.Count -eq 0 -and $warnings.Count -eq 0) {
    Write-Host "All checks passed." -ForegroundColor Green
} elseif ($failures.Count -eq 0) {
    Write-Host "All checks passed with $($warnings.Count) warning(s):" -ForegroundColor Yellow
    foreach ($w in $warnings) { Write-Host "  - $w" -ForegroundColor Yellow }
} else {
    Write-Host "$($failures.Count) failure(s), $($warnings.Count) warning(s):" -ForegroundColor Red
    foreach ($f in $failures) { Write-Host "  [FAIL] $f" -ForegroundColor Red }
    foreach ($w in $warnings) { Write-Host "  [WARN] $w" -ForegroundColor Yellow }
    Write-Host ""
    Write-Host "Resolve failures before proceeding to cohort launch." -ForegroundColor Red
    exit 1
}
