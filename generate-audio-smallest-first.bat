@echo off
setlocal EnableExtensions EnableDelayedExpansion

cd /d "%~dp0"

if not exist "podcasts\scripts" (
    echo [ERROR] Missing podcasts\scripts folder.
    exit /b 1
)

if not exist "podcasts\logs" mkdir "podcasts\logs"
set "STATE_FILE=podcasts\logs\audio-size-order-state.txt"
if not exist "%STATE_FILE%" type nul > "%STATE_FILE%"
set "KOKORO_OUTPUT_DIR=podcasts\audio\kokoro-am_liam-af_jessica"
set "CHAPTERS_DIR=podcasts\chapters"
set "DONE_DIR=podcasts\logs\audio-complete"

set "LIST_FILE=%TEMP%\audio-size-order-%RANDOM%%RANDOM%.txt"
if exist "%LIST_FILE%" del /q "%LIST_FILE%"

echo.
echo ============================================================
echo  Audio Generator - Smallest to Largest
echo  Resume file: %STATE_FILE%
echo ============================================================
echo.

python podcasts\backfill_completion_markers.py --include-appendices --audio-dir !KOKORO_OUTPUT_DIR!
if errorlevel 1 (
    echo [ERROR] Failed to backfill completion markers.
    if exist "%LIST_FILE%" del /q "%LIST_FILE%"
    exit /b 1
)

powershell -NoProfile -ExecutionPolicy Bypass -Command "$ErrorActionPreference='Stop'; Get-ChildItem '.\podcasts\scripts' -Recurse -File -Filter '*.txt' | Where-Object { $_.BaseName -like 'ep*' -or $_.BaseName -like 'cc-*' } | Group-Object Name | ForEach-Object { $_.Group | Sort-Object Length,FullName | Select-Object -First 1 } | Sort-Object Length,Name | ForEach-Object { $_.FullName }" > "%LIST_FILE%"
if errorlevel 1 (
    echo [ERROR] Failed to build script queue.
    if exist "%LIST_FILE%" del /q "%LIST_FILE%"
    exit /b 1
)

set /a TOTAL=0
for /f "usebackq delims=" %%F in ("%LIST_FILE%") do set /a TOTAL+=1

if %TOTAL% LEQ 0 (
    echo [ERROR] No episode/challenge scripts found.
    if exist "%LIST_FILE%" del /q "%LIST_FILE%"
    exit /b 1
)

echo Queue size: %TOTAL%
echo Pre-scan: evaluating which items require synthesis...
set /a GENERATE_TOTAL=0
set /a SKIP_STATE_TOTAL=0
set /a SKIP_COMPLETE_TOTAL=0
set /a METADATA_ONLY_TOTAL=0
set /a PRE_INDEX=0
for /f "usebackq delims=" %%F in ("%LIST_FILE%") do (
    set /a PRE_INDEX+=1
    set "PRE_SLUG=%%~nF"
    if !PRE_INDEX! EQU 1 (
        echo [prescan !PRE_INDEX!/%TOTAL%] !PRE_SLUG!
    ) else (
        set /a PRE_REM=PRE_INDEX %% 10
        if !PRE_REM! EQU 0 echo [prescan !PRE_INDEX!/%TOTAL%]
    )

    call :ClassifyWork "!PRE_SLUG!"
    if !errorlevel! equ 0 set /a GENERATE_TOTAL+=1
    if !errorlevel! equ 1 set /a SKIP_STATE_TOTAL+=1
    if !errorlevel! equ 2 set /a SKIP_COMPLETE_TOTAL+=1
    if !errorlevel! equ 3 set /a METADATA_ONLY_TOTAL+=1
)
echo Pre-scan complete.
echo   Skip (state file): !SKIP_STATE_TOTAL!
echo   Skip (completion record): !SKIP_COMPLETE_TOTAL!
echo   Metadata-only (MP3 exists, no chapter): !METADATA_ONLY_TOTAL!
echo   Items requiring synthesis: !GENERATE_TOTAL!
echo.

set /a INDEX=0
set /a GENERATE_INDEX=0
for /f "usebackq delims=" %%F in ("%LIST_FILE%") do (
    set /a INDEX+=1
    set "SCRIPT=%%~fF"
    set "SLUG=%%~nF"
    set "SHOULD_RUN=1"

    findstr /x /c:"!SLUG!" "%STATE_FILE%" >nul 2>&1
    if not errorlevel 1 (
        echo [!INDEX!/!TOTAL!] Skip completed: !SLUG!
        set "SHOULD_RUN=0"
    )

    if "!SHOULD_RUN!"=="1" (
        python podcasts\check_completion_record.py --slug !SLUG! --audio-dir !KOKORO_OUTPUT_DIR! >nul 2>&1
        if not errorlevel 1 (
            echo [!INDEX!/!TOTAL!] Skip complete episode: !SLUG!
            call :CleanupArtifacts "!SLUG!" !INDEX! !TOTAL!
            >>"%STATE_FILE%" echo !SLUG!
            set "SHOULD_RUN=0"
        )
    )

    if "!SHOULD_RUN!"=="1" if exist "!KOKORO_OUTPUT_DIR!\!SLUG!.mp3" if not exist "!CHAPTERS_DIR!\!SLUG!.json" (
        echo [!INDEX!/!TOTAL!] MP3 exists, writing metadata/chapters: !SLUG!
        call :WriteMetadata "!SLUG!" !INDEX! !TOTAL!
        if errorlevel 1 (
            echo [!INDEX!/!TOTAL!] Metadata write failed: !SLUG!
            if exist "%LIST_FILE%" del /q "%LIST_FILE%"
            exit /b 1
        )
        call :CleanupArtifacts "!SLUG!" !INDEX! !TOTAL!
        >>"%STATE_FILE%" echo !SLUG!
        set "SHOULD_RUN=0"
    )

    if "!SHOULD_RUN!"=="1" (
        set /a GENERATE_INDEX+=1
        call :RunWithRetries "!SCRIPT!" "!SLUG!" !GENERATE_INDEX! !GENERATE_TOTAL!
        if errorlevel 130 (
            echo [!INDEX!/!TOTAL!] INTERRUPTED: !SLUG!
            if exist "%LIST_FILE%" del /q "%LIST_FILE%"
            exit /b 130
        )
        if errorlevel 1 (
            echo [!INDEX!/!TOTAL!] FAILED after retries: !SLUG!
            if exist "%LIST_FILE%" del /q "%LIST_FILE%"
            exit /b 1
        )

        call :WriteMetadata "!SLUG!" !INDEX! !TOTAL!
        if errorlevel 1 (
            echo [!INDEX!/!TOTAL!] Metadata write failed: !SLUG!
            if exist "%LIST_FILE%" del /q "%LIST_FILE%"
            exit /b 1
        )

        if not exist "!DONE_DIR!" mkdir "!DONE_DIR!"

        call :CleanupArtifacts "!SLUG!" !INDEX! !TOTAL!
        >>"%STATE_FILE%" echo !SLUG!
    )
)

if exist "%LIST_FILE%" del /q "%LIST_FILE%"
echo.
echo [DONE] Completed queue.
exit /b 0

:ClassifyWork
set "SLUG=%~1"
findstr /x /c:"!SLUG!" "%STATE_FILE%" >nul 2>&1
if not errorlevel 1 exit /b 1

python podcasts\check_completion_record.py --slug !SLUG! --audio-dir !KOKORO_OUTPUT_DIR! >nul 2>&1
if not errorlevel 1 exit /b 2

if exist "!KOKORO_OUTPUT_DIR!\!SLUG!.mp3" if not exist "!CHAPTERS_DIR!\!SLUG!.json" exit /b 3

exit /b 0

:RunWithRetries
set "SCRIPT=%~1"
set "SLUG=%~2"
set "IDX=%~3"
set "TOT=%~4"

for %%A in (1 2 3) do (
    echo [!IDX!/!TOT!] Generating !SLUG! (attempt %%A/3)
    python -m podcasts.tts.generate_audio --engine kokoro --male-voice am_liam --female-voice af_jessica --slug !SLUG! --audio-format mp3
    set "RC=!errorlevel!"
    if !RC! equ 130 exit /b 130
    if !errorlevel! equ 0 if exist "!KOKORO_OUTPUT_DIR!\!SLUG!.mp3" exit /b 0
    if %%A==1 timeout /t 5 /nobreak >nul
    if %%A==2 timeout /t 10 /nobreak >nul
)

exit /b 1

:WriteMetadata
set "SLUG=%~1"
set "IDX=%~2"
set "TOT=%~3"
rem [Stage 2.2] Auto-tagging retired post-audio-lock. The tagger is still callable
rem directly via: python podcasts\tag-audio-metadata.py --slug <slug> --audio-dir <dir>
rem Tagging now happens during the Stage 3 retag pass driven by docs/EPISODE_MAP.json.
echo [!IDX!/!TOT!] Skipping auto-tag (Stage 2.2 retired): !SLUG!
if not exist "!CHAPTERS_DIR!\!SLUG!.json" exit /b 1
exit /b 0

:CleanupArtifacts
set "SLUG=%~1"
set "IDX=%~2"
set "TOT=%~3"
set "REMOVED_ANY=0"

if exist "!KOKORO_OUTPUT_DIR!\!SLUG!.wav" (
    del /q "!KOKORO_OUTPUT_DIR!\!SLUG!.wav" >nul 2>&1
    set "REMOVED_ANY=1"
)

if exist "podcasts\audio\!SLUG!.wav" (
    del /q "podcasts\audio\!SLUG!.wav" >nul 2>&1
    set "REMOVED_ANY=1"
)

if exist "podcasts\audio\segments\!SLUG!" (
    rmdir /s /q "podcasts\audio\segments\!SLUG!" >nul 2>&1
    set "REMOVED_ANY=1"
)

if "!REMOVED_ANY!"=="1" (
    echo [!IDX!/!TOT!] Cleaned WAV/segments: !SLUG!
)

exit /b 0
