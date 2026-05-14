@echo off
setlocal

:: ---------------------------------------------------------------------------
:: generate-llm-scripts-only.bat
:: Generate all podcast scripts/transcripts with GPT-5.4 (no audio).
::
:: Usage:
::   generate-llm-scripts-only.bat
::   generate-llm-scripts-only.bat --retries 4 --retry-delay-ms 3000 --max-repair-attempts 5
:: ---------------------------------------------------------------------------

:: Move to repo root (folder containing this script)
cd /d "%~dp0"

if not exist "key.txt" (
    echo [ERROR] key.txt not found in repo root.
    exit /b 1
)

for /f "usebackq delims=" %%K in (`powershell -NoProfile -Command "$raw=Get-Content 'key.txt' -Raw; $m=[regex]::Match($raw,'sk-or-v1-[A-Za-z0-9_-]+'); if(-not $m.Success){ throw 'No key token found in key.txt' }; $m.Value"`) do (
    set "OPENROUTER_API_KEY=%%K"
)

if "%OPENROUTER_API_KEY%"=="" (
    echo [ERROR] Could not load OPENROUTER_API_KEY from key.txt.
    exit /b 1
)

set "PODCAST_LLM_MODEL=openai/gpt-5.4"
set "OPENAI_API_KEY=%OPENROUTER_API_KEY%"

echo.
echo ============================================================
echo  LLM Scripts-Only Generator
echo  Model : %PODCAST_LLM_MODEL%
echo  Audio : disabled
echo  Mode  : fresh generation only (no salvage fallback)
echo ============================================================
echo.

node podcasts\llm-podcast-generator-review\src\generate-scripts-only.js --group all --model openai/gpt-5.4 --no-salvage-from-live %*
if errorlevel 1 (
    echo.
    echo [ERROR] Scripts-only generation finished with errors.
    exit /b 1
)

echo.
echo [DONE] Scripts-only generation completed.
exit /b 0
