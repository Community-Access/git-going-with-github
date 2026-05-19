$ErrorActionPreference = 'Stop'
$log = 'tmp-tts-queue.log'
function Tts($g, $s, $e) {
    "=== $(Get-Date -Format o) :: --group $g --start $s --end $e ===" | Tee-Object -FilePath $log -Append
    python -m podcasts.tts.generate_audio --engine kokoro --male-voice am_liam --female-voice af_jessica --audio-format mp3 --group $g --start $s --end $e --force 2>&1 | Tee-Object -FilePath $log -Append
}
Tts 'chapters' 6 7
Tts 'appendices' 18 19
Tts 'appendices' 22 24
Tts 'appendices' 44 44
Tts 'challenges' 1 4
Tts 'challenges' 6 6
Tts 'challenges' 15 15
Write-Host 'ALL TTS DONE'
