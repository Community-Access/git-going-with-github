"""Piper-based local TTS engine for podcast episode generation.

This package uses Piper (ONNX neural TTS) to synthesize podcast episodes
from script files under podcasts/scripts/. Audio output goes to podcasts/audio/.

Voices:
  Alex (male)  — en_US-ryan-high
  Jamie (female) — en_US-lessac-high

Usage:
  python -m podcasts.tts.generate_all       # Generate all episodes
  python -m podcasts.tts.generate_episode   # Generate a single episode
"""
