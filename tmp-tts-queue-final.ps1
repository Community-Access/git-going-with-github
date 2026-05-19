$ErrorActionPreference = 'Continue'
$log = Join-Path $PSScriptRoot 'tmp-tts-queue-final.log'
"=== $(Get-Date -Format o) :: starting final queue ===" | Tee-Object -FilePath $log -Append

$queue = @(
  @{ group = 'challenges'; start = 5;  end = 5  },
  @{ group = 'chapters';   start = 37; end = 37 },
  @{ group = 'chapters';   start = 53; end = 53 },
  @{ group = 'chapters';   start = 79; end = 79 },
  @{ group = 'appendices'; start = 20; end = 20 },
  @{ group = 'appendices'; start = 25; end = 25 },
  @{ group = 'appendices'; start = 28; end = 36 },
  @{ group = 'appendices'; start = 38; end = 38 },
  @{ group = 'appendices'; start = 42; end = 43 },
  @{ group = 'appendices'; start = 50; end = 52 },
  @{ group = 'appendices'; start = 54; end = 56 }
)

foreach ($item in $queue) {
  "=== $(Get-Date -Format o) :: --group $($item.group) --start $($item.start) --end $($item.end) ===" | Tee-Object -FilePath $log -Append
  python -m podcasts.tts.generate_all_kokoro --start $item.start --end $item.end --group $item.group --audio-format mp3 --force --male-voice am_liam --female-voice af_jessica 2>&1 | Tee-Object -FilePath $log -Append
}

"ALL TTS FINAL DONE :: $(Get-Date -Format o)" | Tee-Object -FilePath $log -Append
