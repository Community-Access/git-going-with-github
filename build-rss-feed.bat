@echo off
setlocal

:: ---------------------------------------------------------------------------
:: build-rss-feed.bat
:: Generate the podcast RSS feed (feed.xml) and the admin podcast markdown page.
::
:: Reads MP3 files from podcasts\audio\ and episode metadata from the catalog.
:: Output:
::   podcasts\feed.xml          -- RSS 2.0 / iTunes-compatible podcast feed
::   admin\PODCASTS.md          -- human-readable podcast episode listing
::
:: Usage:
::   build-rss-feed.bat
:: ---------------------------------------------------------------------------

:: Move to the repo root (the folder that contains this bat file)
cd /d "%~dp0"

echo.
echo ============================================================
echo  Podcast RSS Feed Builder
echo  Output : podcasts\feed.xml
echo           admin\PODCASTS.md
echo ============================================================
echo.

call npm run build:podcast-site
if errorlevel 1 (
    echo.
    echo [ERROR] RSS feed build failed. Check output above.
    exit /b 1
)

echo.
echo [DONE] RSS feed written to podcasts\feed.xml
echo        Run validate-rss-feed.bat to check the feed for errors.
exit /b 0
