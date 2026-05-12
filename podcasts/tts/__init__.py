"""Local TTS engines for podcast episode generation.

The production path uses Kokoro ONNX voices to synthesize podcast episodes
from script files under podcasts/scripts/. Audio output goes to podcasts/audio/.
The Piper generator remains available as a fallback and comparison path.

Voices:
  Alex (male)    - am_liam
  Jamie (female) - af_jessica

Usage:
  python -m podcasts.tts.generate_all_kokoro --audio-format mp3
  python -m podcasts.tts.generate_all        # Legacy Piper fallback
"""
