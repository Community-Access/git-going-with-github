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
:: Audio format, voice models, and pitch are read from:
::   podcasts\tts\voice-config.ini
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

:: Run the Python batch generator.
:: generate_all.py already prints "Generating episode N/total: <slug>" as it works.
set "PYTHONPATH=%CD%"
python -m podcasts.tts.generate_all %RANGE_ARGS%

if errorlevel 1 (
    echo.
    echo [ERROR] Audio generation finished with errors. Check output above.
    exit /b 1
)

echo.
echo [DONE] Audio generation complete.
exit /b 0
