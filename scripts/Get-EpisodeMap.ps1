<#
.SYNOPSIS
    PowerShell loader for docs/EPISODE_MAP.json.

.DESCRIPTION
    Loads the canonical episode map and exposes lookup + filter helpers.
    Dot-source this file to use the helpers interactively:

        . scripts/Get-EpisodeMap.ps1
        $map = Get-EpisodeMap
        $map.Episodes | Where-Object { $_.learning_band -eq 'chapter' }

    Or call the helpers directly from a script.

.NOTES
    Single source of truth: docs\EPISODE_MAP.json. Never duplicate map data here.
#>

[CmdletBinding()]
param()

$script:RepoRoot = Resolve-Path (Join-Path $PSScriptRoot '..')
$script:MapPath = Join-Path $script:RepoRoot 'docs\EPISODE_MAP.json'

function Get-EpisodeMap {
    <#
    .SYNOPSIS Load and return the full episode map as a PSCustomObject.
    #>
    [CmdletBinding()]
    param(
        [string]$Path = $script:MapPath
    )
    if (-not (Test-Path -LiteralPath $Path)) {
        throw "EPISODE_MAP.json not found at $Path"
    }
    return Get-Content -LiteralPath $Path -Raw | ConvertFrom-Json
}

function Get-EpisodeByUuid {
    [CmdletBinding()]
    param([Parameter(Mandatory)][string]$Uuid)
    $map = Get-EpisodeMap
    return $map.episodes | Where-Object { $_.uuid -eq $Uuid } | Select-Object -First 1
}

function Get-EpisodeByCurrentSlug {
    [CmdletBinding()]
    param([Parameter(Mandatory)][string]$Slug)
    $map = Get-EpisodeMap
    return $map.episodes | Where-Object { $_.current_slug -eq $Slug } | Select-Object -First 1
}

function Get-EpisodeByFilename {
    [CmdletBinding()]
    param([Parameter(Mandatory)][string]$Filename)
    $map = Get-EpisodeMap
    return $map.episodes | Where-Object { $_.filename -eq $Filename } | Select-Object -First 1
}

function Get-EpisodesOfBand {
    [CmdletBinding()]
    param([Parameter(Mandatory)][string]$Band)
    $map = Get-EpisodeMap
    return @($map.episodes | Where-Object { $_.learning_band -eq $Band })
}

function Get-EpisodesByTrackOrder {
    [CmdletBinding()]
    param()
    $map = Get-EpisodeMap
    return @(
        $map.episodes |
            Where-Object { $_.track_number -ne $null -and -not $_.archived } |
            Sort-Object track_number
    )
}

function Get-PairedChildren {
    <#
    .SYNOPSIS Returns all entries whose pairs_with_uuid matches the given uuid, sorted by pair_order then track_number.
    #>
    [CmdletBinding()]
    param([Parameter(Mandatory)][string]$ParentUuid)
    $map = Get-EpisodeMap
    return @(
        $map.episodes |
            Where-Object { $_.pairs_with_uuid -eq $ParentUuid } |
            Sort-Object @{Expression = { if ($_.pair_order) { $_.pair_order } else { 0 } } },
                        @{Expression = 'track_number' }
    )
}

# Dot-source this file to make the Get-Episode* functions available in the caller's
# scope. Do not Import-Module this file; it is a script, not a module.
