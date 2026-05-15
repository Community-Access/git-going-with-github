@echo off
setlocal

cd /d "%~dp0"

set "CLEAN_FIRST=0"
for %%A in (%*) do (
    if /I "%%~A"=="--clean" set "CLEAN_FIRST=1"
)

if not exist "key.txt" (
    echo [ERROR] key.txt not found in repo root.
    exit /b 1
)

for /f "usebackq delims=" %%K in (`powershell -NoProfile -Command "$raw=Get-Content 'key.txt' -Raw; $m=[regex]::Match($raw,'(sk-or-v1-[A-Za-z0-9_-]+|sk-[A-Za-z0-9_-]+)'); if(-not $m.Success){ throw 'No key token found in key.txt' }; $m.Value"`) do (
    set "OPENROUTER_API_KEY=%%K"
    set "OPENAI_API_KEY=%%K"
)

if "%OPENROUTER_API_KEY%"=="" (
    echo [ERROR] Could not load API key from key.txt.
    exit /b 1
)

if "%OPENAI_BASE_URL%"=="" set "OPENAI_BASE_URL=https://openrouter.ai/api/v1"
if "%PODCAST_LLM_RUN_BUDGET_USD%"=="" set "PODCAST_LLM_RUN_BUDGET_USD=50"
if "%PODCAST_LLM_DAY_BUDGET_USD%"=="" set "PODCAST_LLM_DAY_BUDGET_USD=100"

echo.
echo ============================================================
echo  LLM Durable AI Run
echo  Base URL : %OPENAI_BASE_URL%
echo  Mode     : prepare + run + apply
if "%CLEAN_FIRST%"=="1" echo  Clean    : enabled ^(--clean^)
echo  Budget   : run=%PODCAST_LLM_RUN_BUDGET_USD% day=%PODCAST_LLM_DAY_BUDGET_USD%
echo ============================================================
echo.

if "%CLEAN_FIRST%"=="1" (
    echo [CLEAN] Removing prior durable execution and published artifacts...
    if exist "podcasts\llm-podcast-generator-review\generated\execution" rmdir /s /q "podcasts\llm-podcast-generator-review\generated\execution"
    if exist "podcasts\llm-podcast-generator-review\output\published" rmdir /s /q "podcasts\llm-podcast-generator-review\output\published"
    echo [CLEAN] Done.
    echo.
)

node podcasts\llm-podcast-generator-review\src\execution\prepare-script-jobs.js --group all --model openai/gpt-5.4 --mode batch
if errorlevel 1 exit /b 1

node podcasts\llm-podcast-generator-review\src\execution\run-ai-jobs.js --mode batch --action run --run-budget-usd %PODCAST_LLM_RUN_BUDGET_USD% --day-budget-usd %PODCAST_LLM_DAY_BUDGET_USD%
if errorlevel 1 exit /b 1

node podcasts\llm-podcast-generator-review\src\execution\apply-completed-jobs.js
if errorlevel 1 exit /b 1

echo.
echo [DONE] Batch execution pipeline completed.
exit /b 0
