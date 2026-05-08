@echo off
REM VibeVoice Windows Setup Script
REM Requires Python 3.10+, Git, and an NVIDIA GPU (recommended) or runs on CPU (slow)
REM CUDA 11.8 or 12.x recommended for GPU acceleration

setlocal

set VENV_DIR=vibevoice-env
set REPO_DIR=VibeVoice

echo ============================================================
echo  VibeVoice - Windows Setup
echo ============================================================
echo.

REM Check Python version
python --version 2>nul
if errorlevel 1 (
    echo ERROR: Python not found. Install Python 3.10 or later.
    echo        https://www.python.org/downloads/
    pause & exit /b 1
)

REM Check for GPU (informational only)
nvidia-smi >nul 2>&1
if errorlevel 1 (
    echo WARNING: No NVIDIA GPU detected. Inference will run on CPU and be much slower.
    echo          An RTX 3060 or better is recommended for real-time performance.
    echo.
) else (
    echo NVIDIA GPU detected.
    nvidia-smi --query-gpu=name,memory.total --format=csv,noheader
    echo.
)

REM Create virtual environment
if not exist "%VENV_DIR%" (
    echo Creating Python virtual environment: %VENV_DIR%
    python -m venv "%VENV_DIR%"
    if errorlevel 1 ( echo ERROR: Failed to create venv. & pause & exit /b 1 )
) else (
    echo Virtual environment already exists: %VENV_DIR%
)

REM Activate the venv
call "%VENV_DIR%\Scripts\activate.bat"
if errorlevel 1 ( echo ERROR: Failed to activate venv. & pause & exit /b 1 )

REM Upgrade pip
echo.
echo Upgrading pip...
python -m pip install --upgrade pip --quiet

REM Install PyTorch with CUDA support
echo.
echo Installing PyTorch (CUDA 12.1)...
echo (This may take several minutes depending on your connection)
pip install torch==2.5.1 torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121
if errorlevel 1 (
    echo WARNING: CUDA PyTorch install failed. Trying CPU-only version...
    pip install torch torchvision torchaudio
)

REM Clone or update the VibeVoice repo
echo.
if not exist "%REPO_DIR%" (
    echo Cloning microsoft/VibeVoice repository...
    git clone https://github.com/microsoft/VibeVoice.git "%REPO_DIR%"
    if errorlevel 1 ( echo ERROR: git clone failed. & pause & exit /b 1 )
) else (
    echo Updating existing VibeVoice repository...
    cd "%REPO_DIR%"
    git pull
    cd ..
)

REM Install VibeVoice with streaming TTS extras
echo.
echo Installing VibeVoice package (streaming TTS)...
cd "%REPO_DIR%"
pip install -e ".[streamingtts]"
if errorlevel 1 ( echo ERROR: VibeVoice install failed. & pause & exit /b 1 )
cd ..

REM Optional: install flash-attention (requires MSVC build tools on Windows)
echo.
echo NOTE: flash-attention is optional but improves audio quality on CUDA.
echo       If you have Visual Studio Build Tools installed, you can install it with:
echo       pip install flash-attn --no-build-isolation
echo       Skipping for now (will use SDPA fallback).

REM Install soundfile and scipy for audio playback utilities
pip install soundfile scipy sounddevice

echo.
echo ============================================================
echo  Setup complete!
echo  Next steps:
echo    1. Run: generate-voice-samples.bat
echo       to produce a comparison WAV for every English voice
echo    2. Or open the Colab notebook for a zero-install demo:
echo       https://colab.research.google.com/github/microsoft/VibeVoice/blob/main/demo/vibevoice_realtime_colab.ipynb
echo ============================================================
echo.
pause
endlocal
