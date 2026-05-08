@echo off
setlocal

:: ---------------------------------------------------------------------------
:: generate-transcripts.bat
:: Generate reviewable draft podcast transcript scripts from the catalog.
::
:: Transcripts are written to podcasts\scripts\ as ep*.txt / cc-*.txt files.
:: These are the input files consumed by generate-audio.bat.
::
:: Note: transcript generation always rebuilds ALL episodes from the catalog.
::       Range selection is not supported at this stage.
::
:: Usage:
::   generate-transcripts.bat
:: ---------------------------------------------------------------------------

:: Move to the repo root (the folder that contains this bat file)
cd /d "%~dp0"

echo.
echo ============================================================
echo  Podcast Transcript Generator
echo  Output : podcasts\scripts\
echo  Rebuilds all episode and challenge scripts from catalog
echo ============================================================
echo.

:: Validate the catalog before generating
echo [1/3] Validating podcast catalog...
call npm run validate:podcasts --silent
if errorlevel 1 (
    echo [ERROR] Catalog validation failed. Fix errors above before generating transcripts.
    exit /b 1
)

:: Build episode and challenge bundles (metadata used by transcript generator)
echo [2/3] Building episode and challenge bundles...
call npm run build:podcast-bundles --silent
if errorlevel 1 (
    echo [ERROR] Bundle build failed.
    exit /b 1
)
call npm run build:podcast-challenge-bundles --silent
if errorlevel 1 (
    echo [ERROR] Challenge bundle build failed.
    exit /b 1
)

:: Generate the transcript scripts
echo [3/3] Generating transcript scripts...
call npm run generate:podcast-transcripts
if errorlevel 1 (
    echo.
    echo [ERROR] Transcript generation finished with errors. Check output above.
    exit /b 1
)

echo.
echo [DONE] Transcript scripts written to podcasts\scripts\
echo        Run generate-audio.bat to synthesise audio from these scripts.
exit /b 0
