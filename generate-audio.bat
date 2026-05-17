@echo off
setlocal enabledelayedexpansion

:: ---------------------------------------------------------------------------
:: generate-audio.bat
:: Generate podcast audio for all episodes or a specific range.
::
:: Usage:
::   generate-audio.bat              -- generate all 75 episodes
::   generate-audio.bat 5            -- generate episodes 5 and above
::   generate-audio.bat 5 10         -- generate episodes 5 through 10
::
:: Uses the unified Kokoro pipeline pinned to:
::   ALEX  = am_liam
::   JAMIE = af_jessica
:: ---------------------------------------------------------------------------

:: Move to the repo root (the folder that contains this bat file)
cd /d "%~dp0"

:: Ensure ffmpeg is on the PATH (winget installs to a versioned subfolder)
where ffmpeg >nul 2>&1
if errorlevel 1 (
    echo [INFO] ffmpeg not found on PATH - refreshing from machine environment...
    for /f "usebackq tokens=*" %%P in (`powershell -NoProfile -Command ^
        "[System.Environment]::GetEnvironmentVariable('Path','Machine')"`) do (
        set "PATH=%%P;%PATH%"
    )
    where ffmpeg >nul 2>&1
    if errorlevel 1 (
        echo [WARN] ffmpeg still not found. MP3 output may fail.
        echo        Install ffmpeg:  winget install --id Gyan.FFmpeg
    )
)

:: Build the optional --start / --end arguments
set "RANGE_ARGS="
if not "%~1"=="" (
    set "RANGE_ARGS=--start %~1"
)
if not "%~2"=="" (
    set "RANGE_ARGS=!RANGE_ARGS! --end %~2"
)

echo.
echo ============================================================
echo  Podcast Audio Generator
echo  Config : podcasts\tts\voice-config.ini
if defined RANGE_ARGS (
    echo  Range  : %RANGE_ARGS%
) else (
    echo  Range  : all episodes
)
echo ============================================================
echo.

:: Run the unified Kokoro batch generator.
:: Existing complete episodes are skipped unless --force is passed manually.
set "PYTHONPATH=%CD%"
python -m podcasts.tts.generate_audio --engine kokoro --male-voice am_liam --female-voice af_jessica --audio-format mp3 %RANGE_ARGS%

if errorlevel 1 (
    echo.
    echo [ERROR] Audio generation finished with errors. Check output above.
    exit /b 1
)

echo [INFO] Cleaning up WAV and segment artifacts for completed MP3 episodes...
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
    "$ErrorActionPreference='Stop';" ^
    "$kokoroDir='podcasts\\audio\\kokoro-am_liam-af_jessica';" ^
    "if(Test-Path $kokoroDir){" ^
    "  Get-ChildItem $kokoroDir -File -Filter '*.mp3' | ForEach-Object {" ^
    "    $slug=$_.BaseName;" ^
    "    $wav1=Join-Path $kokoroDir ($slug + '.wav');" ^
    "    $wav2=Join-Path 'podcasts\\audio' ($slug + '.wav');" ^
    "    $seg=Join-Path 'podcasts\\audio\\segments' $slug;" ^
    "    if(Test-Path $wav1){ Remove-Item $wav1 -Force -ErrorAction SilentlyContinue };" ^
    "    if(Test-Path $wav2){ Remove-Item $wav2 -Force -ErrorAction SilentlyContinue };" ^
    "    if(Test-Path $seg){ Remove-Item $seg -Recurse -Force -ErrorAction SilentlyContinue };" ^
    "  }" ^
    "}"

echo.
echo [DONE] Audio generation complete.
exit /b 0
