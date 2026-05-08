@echo off
REM Wrapper to run the voice sample generator from any directory.
REM Assumes setup-vibevoice.bat has been run and the VibeVoice repo is
REM in the VibeVoice\ subfolder relative to this script.

setlocal

set SCRIPT_DIR=%~dp0
set VENV=%SCRIPT_DIR%vibevoice-env
set REPO=%SCRIPT_DIR%VibeVoice
set GEN_SCRIPT=%SCRIPT_DIR%scripts\vibevoice\generate-voice-samples.py

echo ============================================================
echo  VibeVoice - Generate Voice Comparison Samples
echo ============================================================

if not exist "%VENV%\Scripts\activate.bat" (
    echo ERROR: Virtual environment not found at %VENV%
    echo        Run setup-vibevoice.bat first.
    pause & exit /b 1
)

if not exist "%REPO%" (
    echo ERROR: VibeVoice repo not found at %REPO%
    echo        Run setup-vibevoice.bat first.
    pause & exit /b 1
)

call "%VENV%\Scripts\activate.bat"

echo Generating samples from all English voices...
echo Output will be saved to: %REPO%\voice-samples\
echo.

cd /d "%REPO%"
python "%GEN_SCRIPT%" %*

echo.
echo Done! Open the voice-samples folder to listen and compare.
pause
endlocal
