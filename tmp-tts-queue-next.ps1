$ErrorActionPreference = 'Stop'
$log = 'tmp-tts-queue-next.log'
$restLog = 'tmp-tts-queue-rest.log'

"=== $(Get-Date -Format o) :: waiting for rest queue sentinel ===" | Tee-Object -FilePath $log -Append
while ($true) {
    if (Test-Path $restLog) {
        if (Select-String -Path $restLog -Pattern 'ALL TTS REST DONE' -Quiet) { break }
    }
    Start-Sleep -Seconds 20
}
"=== $(Get-Date -Format o) :: rest queue done, starting next queue ===" | Tee-Object -FilePath $log -Append

function Tts($g, $s, $e) {
    "=== $(Get-Date -Format o) :: --group $g --start $s --end $e ===" | Tee-Object -FilePath $log -Append
    python -m podcasts.tts.generate_audio --engine kokoro --male-voice am_liam --female-voice af_jessica --audio-format mp3 --group $g --start $s --end $e --force 2>&1 | Tee-Object -FilePath $log -Append
}

# New chapters batch
Tts 'chapters' 13 17       # ep13, ep14, ep15, ep16, ep17
Tts 'chapters' 22 22       # ep22 (missed in queue 1 - lives in chapters not appendices)
Tts 'chapters' 40 40       # ep40
Tts 'chapters' 47 49       # ep47, ep48, ep49

# New appendices batch
Tts 'appendices' 39 39     # ep39
Tts 'appendices' 41 41     # ep41

# New challenges batch (numeric cc-NN only; bonus-letter slugs deferred)
Tts 'challenges' 10 14     # cc-10, cc-11, cc-12, cc-13, cc-14
Tts 'challenges' 16 16     # cc-16

"ALL TTS NEXT DONE :: $(Get-Date -Format o)" | Tee-Object -FilePath $log -Append
