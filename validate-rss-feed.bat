@echo off
setlocal

:: ---------------------------------------------------------------------------
:: validate-rss-feed.bat
:: Validate the generated podcast RSS feed for RSS 2.0 / iTunes compliance.
::
:: Checks:
::   - Required channel elements (title, link, description, language)
::   - Required per-item elements (title, enclosure, guid)
::   - Enclosure URL, length, and MIME type correctness
::   - Duplicate GUID detection
::
:: Run build-rss-feed.bat first to generate podcasts\feed.xml.
::
:: Usage:
::   validate-rss-feed.bat
:: ---------------------------------------------------------------------------

:: Move to the repo root (the folder that contains this bat file)
cd /d "%~dp0"

echo.
echo ============================================================
echo  Podcast RSS Feed Validator
echo  Feed   : podcasts\feed.xml
echo ============================================================
echo.

if not exist "podcasts\feed.xml" (
    echo [ERROR] podcasts\feed.xml does not exist.
    echo         Run build-rss-feed.bat to generate it first.
    exit /b 1
)

call npm run validate:podcast-feed
if errorlevel 1 (
    echo.
    echo [ERROR] Feed validation failed. Check output above.
    exit /b 1
)

echo.
echo [DONE] RSS feed validation passed.
exit /b 0
