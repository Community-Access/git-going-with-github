<#
.SYNOPSIS
    Automates all configurable workshop setup steps for Community-Access/git-going-with-github.

.DESCRIPTION
    Runs every setup action that does not require a browser:
    - Sets CLASSROOM_DAY1_ASSIGNMENT_URL and CLASSROOM_DAY2_ASSIGNMENT_URL variables
    - Verifies required labels exist (registration, duplicate, waitlist)
    - Syncs learning-room source into Community-Access/learning-room-template
    - Validates the template with a smoke repository
    - Optionally seeds challenges for the test student account

    Optionally, create Day 1 and Day 2 assignments at https://classroom.github.com before
    running this script. If the assignments already exist, the script will resolve their invite
    URLs automatically from the GitHub Classroom API and no URL parameters are needed.
    If assignments do not exist yet, the script will tell you what to create and exit cleanly.

.PARAMETER Day1AssignmentUrl
    Optional. The GitHub Classroom invite URL for the Day 1 assignment (You Belong Here).
    Format: https://classroom.github.com/a/<short-code>
    If omitted, the script will attempt to resolve it automatically from the Classroom API
    by matching an assignment titled 'You Belong Here'.

.PARAMETER Day2AssignmentUrl
    Optional. The GitHub Classroom invite URL for the Day 2 assignment (You Can Build This).
    Format: https://classroom.github.com/a/<short-code>
    If omitted, the script will attempt to resolve it automatically from the Classroom API
    by matching an assignment titled 'You Can Build This'.

.PARAMETER Repo
    Repository slug to configure. Defaults to Community-Access/git-going-with-github.

.PARAMETER ClassroomOrg
    The GitHub Classroom organization name. Defaults to Community-Access-Classroom.

.PARAMETER TestStudentUsername
    GitHub username of the test student account. Defaults to accesswatch-student.
    When provided, the script offers to seed Day 1 and Day 2 challenges after
    test student repos are confirmed to exist.

.PARAMETER SkipTemplatePrepare
    Skip the Prepare-LearningRoomTemplate.ps1 step. Use when you know the template is
    already current and want to run only configuration steps.

.PARAMETER SkipTemplateValidate
    Skip the Test-LearningRoomTemplate.ps1 smoke validation step.

.PARAMETER SkipSeed
    Skip the challenge seeding step even when test student repos exist.

.EXAMPLE
    # Minimal -- assignment URLs resolved automatically from Classroom API
    .\Initialize-WorkshopSetup.ps1

.EXAMPLE
    # Provide URLs explicitly (e.g. if auto-resolution title matching fails)
    .\Initialize-WorkshopSetup.ps1 `
        -Day1AssignmentUrl https://classroom.github.com/a/abc123 `
        -Day2AssignmentUrl https://classroom.github.com/a/def456

.EXAMPLE
    # Skip template steps (already up to date)
    .\Initialize-WorkshopSetup.ps1 `
        -SkipTemplatePrepare -SkipTemplateValidate
#>

[CmdletBinding(SupportsShouldProcess)]
param(
    [ValidatePattern('^https://classroom\.github\.com/a/[A-Za-z0-9_-]+$')]
    [string]$Day1AssignmentUrl,

    [ValidatePattern('^https://classroom\.github\.com/a/[A-Za-z0-9_-]+$')]
    [string]$Day2AssignmentUrl,

    [string]$Repo = 'Community-Access/git-going-with-github',

    [string]$ClassroomOrg = 'Community-Access-Classroom',

    [string]$TestStudentUsername = 'accesswatch-student',

    [switch]$SkipTemplatePrepare,

    [switch]$SkipTemplateValidate,

    [switch]$SkipSeed
)

$ErrorActionPreference = 'Stop'
$scriptRoot = $PSScriptRoot

function Write-Step {
    param([string]$Message)
    Write-Host "`n==> $Message" -ForegroundColor Cyan
}

function Write-Pass {
    param([string]$Message)
    Write-Host "    [PASS] $Message" -ForegroundColor Green
}

function Write-Fail {
    param([string]$Message)
    Write-Host "    [FAIL] $Message" -ForegroundColor Red
}

function Write-Info {
    param([string]$Message)
    Write-Host "    $Message" -ForegroundColor Gray
}

$failures = [System.Collections.Generic.List[string]]::new()

# ---------------------------------------------------------------------------
# Step 0: Confirm gh CLI and auth
# ---------------------------------------------------------------------------
Write-Step "Confirming GitHub CLI authentication"
gh auth status -h github.com 2>&1 | ForEach-Object { Write-Info $_ }
if ($LASTEXITCODE -ne 0) {
    throw "GitHub CLI is not authenticated. Run: gh auth login -h github.com"
}

$currentUser = (gh api /user --jq '.login' 2>&1).Trim()
Write-Info "Authenticated as: $currentUser"

# ---------------------------------------------------------------------------
# Step 0.1: Resolve assignment URLs from Classroom API if not supplied
# ---------------------------------------------------------------------------
Write-Step "Resolving classroom assignment URLs"

$classroomId = $null
$classrooms = gh api /classrooms --jq '.[]' 2>&1 | ConvertFrom-Json -ErrorAction SilentlyContinue
if (-not $classrooms) {
    Write-Info "No classrooms found via API or API returned an error."
} else {
    foreach ($c in @($classrooms)) {
        if ($c.url -match $ClassroomOrg -or $c.organization.login -eq $ClassroomOrg) {
            $classroomId = $c.id
            Write-Info "Found classroom: '$($c.name)' (id: $classroomId) linked to $ClassroomOrg"
            break
        }
    }
}

if ($classroomId) {
    $assignments = gh api "/classrooms/$classroomId/assignments" 2>&1 | ConvertFrom-Json -ErrorAction SilentlyContinue
    if ($assignments -and @($assignments).Count -gt 0) {
        Write-Info "Found $(@($assignments).Count) assignment(s) in classroom:"
        foreach ($a in @($assignments)) {
            Write-Info "  - '$($a.title)' => $($a.invite_link)"
        }

        if (-not $Day1AssignmentUrl) {
            $day1Match = @($assignments) | Where-Object { $_.title -match 'You Belong Here|Day.?1' } | Select-Object -First 1
            if ($day1Match) {
                $Day1AssignmentUrl = $day1Match.invite_link
                Write-Pass "Day 1 URL resolved from API: $Day1AssignmentUrl"
            } else {
                Write-Info "Could not auto-match Day 1 assignment by title. Provide -Day1AssignmentUrl manually."
                Write-Info "Available titles: $((@($assignments) | ForEach-Object { $_.title }) -join ', ')"
            }
        } else {
            Write-Info "Day 1 URL provided via parameter: $Day1AssignmentUrl"
        }

        if (-not $Day2AssignmentUrl) {
            $day2Match = @($assignments) | Where-Object { $_.title -match 'You Can Build This|Day.?2' } | Select-Object -First 1
            if ($day2Match) {
                $Day2AssignmentUrl = $day2Match.invite_link
                Write-Pass "Day 2 URL resolved from API: $Day2AssignmentUrl"
            } else {
                Write-Info "Could not auto-match Day 2 assignment by title. Provide -Day2AssignmentUrl manually."
                Write-Info "Available titles: $((@($assignments) | ForEach-Object { $_.title }) -join ', ')"
            }
        } else {
            Write-Info "Day 2 URL provided via parameter: $Day2AssignmentUrl"
        }
    } else {
        Write-Info "No assignments found in classroom yet. You must create them manually at:"
        Write-Info "  https://classroom.github.com"
        Write-Info "Then re-run this script, or pass -Day1AssignmentUrl and -Day2AssignmentUrl."
    }
} else {
    Write-Info "Could not find a classroom linked to '$ClassroomOrg' via the API."
    Write-Info "Classrooms available: $(if ($classrooms) { (@($classrooms) | ForEach-Object { $_.name }) -join ', ' } else { 'none' })"
}

if (-not $Day1AssignmentUrl -or -not $Day2AssignmentUrl) {
    Write-Fail "One or both assignment URLs could not be resolved. Cannot set variables without them."
    Write-Host ""
    Write-Host "Create the missing assignments at https://classroom.github.com using classroom id $classroomId," -ForegroundColor Yellow
    Write-Host "then re-run this script. Assignment names expected:" -ForegroundColor Yellow
    Write-Host "  Day 1: 'You Belong Here'" -ForegroundColor Yellow
    Write-Host "  Day 2: 'You Can Build This'" -ForegroundColor Yellow
    exit 1
}


# ---------------------------------------------------------------------------
# Step 2: Set repository variables
# ---------------------------------------------------------------------------
Write-Step "Setting repository variables on $Repo"

$variablesToSet = @(
    @{ Name = 'CLASSROOM_DAY1_ASSIGNMENT_URL'; Value = $Day1AssignmentUrl },
    @{ Name = 'CLASSROOM_DAY2_ASSIGNMENT_URL'; Value = $Day2AssignmentUrl }
)

foreach ($v in $variablesToSet) {
    gh variable set $v.Name --body $v.Value -R $Repo
    if ($LASTEXITCODE -eq 0) {
        Write-Pass "$($v.Name) = $($v.Value)"
    } else {
        Write-Fail "Failed to set $($v.Name)"
        $failures.Add($v.Name)
    }
}

# ---------------------------------------------------------------------------
# Step 3: Verify required labels
# ---------------------------------------------------------------------------
Write-Step "Verifying required labels on $Repo"

$requiredLabels = @('registration', 'duplicate', 'waitlist')
$existingLabels = gh label list -R $Repo --json name --jq '.[].name' 2>&1
foreach ($label in $requiredLabels) {
    if ($existingLabels -contains $label) {
        Write-Pass "Label '$label' exists"
    } else {
        Write-Fail "Label '$label' is missing -- creating it"
        gh label create $label -R $Repo --color '#ededed' --description "Workshop label: $label"
        if ($LASTEXITCODE -eq 0) {
            Write-Pass "Label '$label' created"
        } else {
            $failures.Add("label: $label")
        }
    }
}

# ---------------------------------------------------------------------------
# Step 4: Verify confirmed variable values by re-reading them
# ---------------------------------------------------------------------------
Write-Step "Re-reading variables to confirm values have no leading/trailing spaces"

foreach ($v in $variablesToSet) {
    $readBack = (gh variable get $v.Name -R $Repo 2>&1).Trim()
    if ($readBack -eq $v.Value) {
        Write-Pass "$($v.Name) confirmed: $readBack"
    } else {
        Write-Fail "$($v.Name) mismatch: expected '$($v.Value)', got '$readBack'"
        $failures.Add("$($v.Name) value mismatch on read-back")
    }
}

# ---------------------------------------------------------------------------
# Step 5: Template preparation
# ---------------------------------------------------------------------------
if (-not $SkipTemplatePrepare) {
    Write-Step "Syncing learning-room source into Community-Access/learning-room-template"
    Write-Info "Running Prepare-LearningRoomTemplate.ps1..."
    & "$scriptRoot\Prepare-LearningRoomTemplate.ps1" -Owner 'Community-Access' -TemplateRepo 'learning-room-template'
    if ($LASTEXITCODE -eq 0) {
        Write-Pass "Template preparation complete"
    } else {
        Write-Fail "Template preparation reported errors -- review output above"
        $failures.Add("Prepare-LearningRoomTemplate")
    }
} else {
    Write-Info "Skipping template preparation (-SkipTemplatePrepare)"
}

# ---------------------------------------------------------------------------
# Step 6: Template smoke validation
# ---------------------------------------------------------------------------
if (-not $SkipTemplateValidate) {
    Write-Step "Running template smoke validation against Community-Access/learning-room-template"
    Write-Info "Running Test-LearningRoomTemplate.ps1..."
    & "$scriptRoot\Test-LearningRoomTemplate.ps1" -Owner 'Community-Access' -TemplateRepo 'learning-room-template'
    if ($LASTEXITCODE -eq 0) {
        Write-Pass "Template smoke validation complete"
    } else {
        Write-Fail "Template smoke validation reported errors -- review output above"
        $failures.Add("Test-LearningRoomTemplate")
    }
} else {
    Write-Info "Skipping template smoke validation (-SkipTemplateValidate)"
}

# ---------------------------------------------------------------------------
# Step 7: Seed challenges for test student (if repos exist)
# ---------------------------------------------------------------------------
if (-not $SkipSeed -and $TestStudentUsername) {
    Write-Step "Checking for test student repositories to seed"

    $day1Repo = "$ClassroomOrg/you-belong-here-$TestStudentUsername"
    $day2Repo = "$ClassroomOrg/you-can-build-this-$TestStudentUsername"

    $day1Exists = (gh api "repos/$day1Repo" --jq '.name' 2>&1) -notmatch 'Not Found'
    $day2Exists = (gh api "repos/$day2Repo" --jq '.name' 2>&1) -notmatch 'Not Found'

    if ($day1Exists) {
        Write-Info "Day 1 repo found: $day1Repo -- seeding Challenge 1"
        & "$scriptRoot\Seed-LearningRoomChallenge.ps1" -Repository $day1Repo -Challenge 1 -Assignee $TestStudentUsername
        & "$scriptRoot\Seed-PeerSimulation.ps1" -Repository $day1Repo -StudentUsername $TestStudentUsername
    } else {
        Write-Info "Day 1 test repo ($day1Repo) not found -- skipping seed."
        Write-Info "Have $TestStudentUsername accept the Day 1 invite URL first:"
        Write-Info "  $Day1AssignmentUrl"
        Write-Info "Then re-run with: .\Initialize-WorkshopSetup.ps1 ... (or run Seed-LearningRoomChallenge.ps1 directly)"
    }

    if ($day2Exists) {
        Write-Info "Day 2 repo found: $day2Repo -- seeding Challenge 10"
        & "$scriptRoot\Seed-LearningRoomChallenge.ps1" -Repository $day2Repo -Challenge 10 -Assignee $TestStudentUsername
        & "$scriptRoot\Seed-PeerSimulation.ps1" -Repository $day2Repo -StudentUsername $TestStudentUsername
    } else {
        Write-Info "Day 2 test repo ($day2Repo) not found -- skipping seed."
        Write-Info "Have $TestStudentUsername accept the Day 2 invite URL first:"
        Write-Info "  $Day2AssignmentUrl"
    }
} else {
    Write-Info "Skipping seed step"
}

# ---------------------------------------------------------------------------
# Summary
# ---------------------------------------------------------------------------
Write-Host "`n=============================" -ForegroundColor White
if ($failures.Count -eq 0) {
    Write-Host "Setup complete. No failures." -ForegroundColor Green
    Write-Host ""
    Write-Host "What still requires manual action:" -ForegroundColor Yellow
    Write-Host "  1. Confirm registration workflow is enabled in Actions tab:" -ForegroundColor Yellow
    Write-Host "     https://github.com/$Repo/actions" -ForegroundColor Yellow
    Write-Host "  2. Submit one test registration issue from $TestStudentUsername to confirm end-to-end flow." -ForegroundColor Yellow
} else {
    Write-Host "Setup completed with $($failures.Count) failure(s):" -ForegroundColor Red
    foreach ($f in $failures) {
        Write-Host "  - $f" -ForegroundColor Red
    }
    Write-Host ""
    Write-Host "Resolve failures before proceeding to registration testing." -ForegroundColor Red
    exit 1
}
