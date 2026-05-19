$ErrorActionPreference = 'Stop'
$log = 'tmp-tts-queue3.log'
$sentinelLog = 'tmp-tts-queue2.log'
Write-Host "Waiting for queue 2 to finish..."
while ($true) {
    if ((Test-Path $sentinelLog) -and (Select-String -Path $sentinelLog -Pattern 'ALL TTS2 DONE' -Quiet)) { break }
    Start-Sleep -Seconds 30
}
Write-Host "Queue 2 done. Starting queue 3."
function Tts($g, $s, $e) {
    "=== $(Get-Date -Format o) :: --group $g --start $s --end $e ===" | Tee-Object -FilePath $log -Append
    python -m podcasts.tts.generate_audio --engine kokoro --male-voice am_liam --female-voice af_jessica --audio-format mp3 --group $g --start $s --end $e --force 2>&1 | Tee-Object -FilePath $log -Append
}
Tts 'chapters' 10 12
Tts 'chapters' 45 46
Tts 'appendices' 21 21
Tts 'appendices' 27 27
Tts 'challenges' 9 9
Write-Host 'ALL TTS3 DONE'
