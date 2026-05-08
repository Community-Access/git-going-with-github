param(
    [switch]$WithAudio
)

$ErrorActionPreference = 'Stop'

function Invoke-Step {
    param(
        [string]$Name,
        [string]$Command
    )
    Write-Host "`n==> $Name"
    Write-Host "    $Command"
    Invoke-Expression $Command
}

Invoke-Step -Name 'Validate podcast catalog' -Command 'npm run validate:podcasts'
Invoke-Step -Name 'Build companion bundles' -Command 'npm run build:podcast-bundles'
Invoke-Step -Name 'Build challenge bundles' -Command 'npm run build:podcast-challenge-bundles'
Invoke-Step -Name 'Generate transcript drafts' -Command 'npm run generate:podcast-transcripts'
Invoke-Step -Name 'Build podcast page and RSS feed' -Command 'npm run build:podcast-site'

if ($WithAudio) {
    Invoke-Step -Name 'Generate podcast audio' -Command 'npm run build:podcast-audio'
    Invoke-Step -Name 'Rebuild podcast page and RSS feed after audio generation' -Command 'npm run build:podcast-site'
}

Write-Host "`nDone."
if ($WithAudio) {
    Write-Host 'Transcripts and audio are generated.'
}
else {
    Write-Host 'Transcripts are generated. Audio has not been generated.'
}
