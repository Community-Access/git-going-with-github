#!/usr/bin/env python3
"""Generate a single podcast episode using local Piper ONNX models.

Produces per-segment WAVs (including silence for pauses) inside
  podcasts/audio/segments/<slug>/
along with a manifest.json compatible with the Node.js build pipeline.
Then concatenates them into one episode output file at
    podcasts/audio/<slug>.<ext> where ext is wav, mp3, or both.

Usage:
  python -m podcasts.tts.generate_episode                         # ep00 default
  python -m podcasts.tts.generate_episode ep05-pull-requests      # by slug
  python -m podcasts.tts.generate_episode --script path/to/file.txt
"""
import hashlib
import json
import os
import sys
import wave
import subprocess
import tempfile
import re
import configparser
import shutil
from typing import Any
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent          # podcasts/
SCRIPTS_DIR = ROOT / 'scripts'
AUDIO_DIR = ROOT / 'audio'
SEGMENTS_DIR = AUDIO_DIR / 'segments'
MODELS_DIR = ROOT / 'tts' / 'models'
LEXICON_PATH = Path(__file__).resolve().parent / 'lexicon.txt'
CONFIG_PATH = Path(__file__).resolve().parent / 'voice-config.ini'

SAMPLE_RATE = 24000
CHANNELS = 1
SAMPWIDTH = 2  # 16-bit

# Runtime tunables. configure_runtime() populates these from:
#   code defaults < voice-config.ini < environment variables < CLI flags
PAUSE_SECONDS = 1.2
LENGTH_SCALE = 1.14
NOISE_SCALE = 0.32
NOISE_W_SCALE = 0.42
MALE_PITCH_SEMITONES = 0.0
FEMALE_PITCH_SEMITONES = 0.0
FINAL_SEGMENT_TAIL_SECONDS = 0.12
INTER_SEGMENT_SECONDS = 0.09
INTER_SPEAKER_SECONDS = 0.16
EPISODE_AUDIO_FORMAT = 'wav'

MALE_MODEL = MODELS_DIR / 'en_US-ryan-high.onnx'
FEMALE_MODEL = MODELS_DIR / 'en_US-lessac-high.onnx'
ACTIVE_CONFIG_PATH: str | None = None


def _clamp(name: str, value: float, lo: float, hi: float) -> float:
    if not (lo <= value <= hi):
        raise ValueError(f'{name} = {value} is out of range {lo}..{hi}')
    return value


def configure_runtime(config_path: Path | None = None, cli_overrides: dict | None = None):
    """Apply runtime tuning in priority order: defaults < config < env < CLI."""
    global PAUSE_SECONDS, LENGTH_SCALE, NOISE_SCALE, NOISE_W_SCALE
    global MALE_PITCH_SEMITONES, FEMALE_PITCH_SEMITONES, FINAL_SEGMENT_TAIL_SECONDS
    global INTER_SEGMENT_SECONDS, INTER_SPEAKER_SECONDS
    global MALE_MODEL, FEMALE_MODEL, ACTIVE_CONFIG_PATH
    global EPISODE_AUDIO_FORMAT

    settings = {
        'pause_seconds':              '1.2',
        'length_scale':               '1.14',
        'noise_scale':                '0.32',
        'noise_w_scale':              '0.42',
        'male_pitch_semitones':       '0.0',
        'female_pitch_semitones':     '0.0',
        'pitch_semitones':            '0.0',
        'final_segment_tail_seconds': '0.12',
        'inter_segment_seconds':      '0.09',
        'inter_speaker_seconds':      '0.16',
        'male_model':                 'en_US-ryan-high.onnx',
        'female_model':               'en_US-lessac-high.onnx',
        'episode_audio_format':       'wav',
    }

    # Config file (optional).
    chosen = config_path or CONFIG_PATH
    if chosen and chosen.exists():
        parser = configparser.ConfigParser()
        parser.read(chosen, encoding='utf-8')
        if parser.has_section('voice'):
            for key in settings:
                if key in parser['voice']:
                    settings[key] = parser['voice'][key]
        ACTIVE_CONFIG_PATH = str(chosen)
    else:
        ACTIVE_CONFIG_PATH = None

    # Environment variable overrides.
    env_map = {
        'PIPER_PAUSE_SECONDS':           'pause_seconds',
        'PIPER_LENGTH_SCALE':            'length_scale',
        'PIPER_NOISE_SCALE':             'noise_scale',
        'PIPER_NOISE_W_SCALE':           'noise_w_scale',
        'PIPER_MALE_PITCH_SEMITONES':    'male_pitch_semitones',
        'PIPER_FEMALE_PITCH_SEMITONES':  'female_pitch_semitones',
        'PIPER_PITCH_SEMITONES':         'pitch_semitones',
        'PIPER_FINAL_TAIL_SECONDS':      'final_segment_tail_seconds',
        'PIPER_INTER_SEGMENT_SECONDS':   'inter_segment_seconds',
        'PIPER_INTER_SPEAKER_SECONDS':   'inter_speaker_seconds',
        'PIPER_MALE_MODEL':              'male_model',
        'PIPER_FEMALE_MODEL':            'female_model',
        'PIPER_EPISODE_AUDIO_FORMAT':    'episode_audio_format',
    }
    for env_name, key in env_map.items():
        v = os.getenv(env_name)
        if v not in (None, ''):
            settings[key] = v

    # CLI overrides are highest priority.
    if cli_overrides:
        for key, value in cli_overrides.items():
            if value is not None and key in settings:
                settings[key] = str(value)

    # Back-compat: single pitch key still supported and applied to both voices
    # when per-voice values are not explicitly provided.
    if (
        settings.get('pitch_semitones') not in (None, '')
        and settings.get('male_pitch_semitones') == '0.0'
        and settings.get('female_pitch_semitones') == '0.0'
    ):
        settings['male_pitch_semitones'] = settings['pitch_semitones']
        settings['female_pitch_semitones'] = settings['pitch_semitones']

    # Parse, clamp, and assign.
    PAUSE_SECONDS              = _clamp('pause_seconds',              float(settings['pause_seconds']),              0.0,  5.0)
    LENGTH_SCALE               = _clamp('length_scale',               float(settings['length_scale']),               0.7,  2.0)
    NOISE_SCALE                = _clamp('noise_scale',                float(settings['noise_scale']),                0.0,  1.2)
    NOISE_W_SCALE              = _clamp('noise_w_scale',              float(settings['noise_w_scale']),              0.0,  1.2)
    MALE_PITCH_SEMITONES       = _clamp('male_pitch_semitones',       float(settings['male_pitch_semitones']),      -6.0,  6.0)
    FEMALE_PITCH_SEMITONES     = _clamp('female_pitch_semitones',     float(settings['female_pitch_semitones']),    -6.0,  6.0)
    FINAL_SEGMENT_TAIL_SECONDS = _clamp('final_segment_tail_seconds', float(settings['final_segment_tail_seconds']), 0.0,  1.0)
    INTER_SEGMENT_SECONDS      = _clamp('inter_segment_seconds',      float(settings['inter_segment_seconds']),      0.0,  0.6)
    INTER_SPEAKER_SECONDS      = _clamp('inter_speaker_seconds',      float(settings['inter_speaker_seconds']),      0.0,  0.9)

    fmt = settings['episode_audio_format'].strip().lower()
    if fmt not in ('wav', 'mp3', 'both'):
        raise ValueError('episode_audio_format must be one of: wav, mp3, both')
    EPISODE_AUDIO_FORMAT = fmt

    p = settings['male_model']
    MALE_MODEL   = Path(p) if Path(p).is_absolute() else MODELS_DIR / p
    p = settings['female_model']
    FEMALE_MODEL = Path(p) if Path(p).is_absolute() else MODELS_DIR / p


# Apply defaults + config file at import time so batch generation picks them up
# without needing to call configure_runtime() explicitly.
configure_runtime()

# ---------------------------------------------------------------------------
# Lexicon loader
# ---------------------------------------------------------------------------
_lexicon = None

def load_lexicon(path: Path = LEXICON_PATH) -> list[tuple[re.Pattern, str]]:
    """Load the pronunciation lexicon and return compiled (pattern, replacement) pairs."""
    global _lexicon
    if _lexicon is not None:
        return _lexicon
    entries: list[tuple[re.Pattern, str]] = []
    if not path.exists():
        _lexicon = entries
        return entries
    for line in path.read_text(encoding='utf-8').splitlines():
        line = line.strip()
        if not line or line.startswith('#'):
            continue
        parts = line.split('\t', 1)
        if len(parts) != 2:
            continue
        word, replacement = parts
        # Build a word-boundary regex; escape the original word for special chars
        escaped = re.escape(word)
        pattern = re.compile(r'\b' + escaped + r'\b', re.IGNORECASE)
        entries.append((pattern, replacement))
    _lexicon = entries
    return entries


def apply_lexicon(text: str) -> str:
    """Apply pronunciation substitutions from the lexicon."""
    lex = load_lexicon()
    for pattern, replacement in lex:
        text = pattern.sub(replacement, text)
    return text


# ---------------------------------------------------------------------------
# Script parser
# ---------------------------------------------------------------------------

def parse_script(text: str) -> list[dict]:
    segments: list[dict] = []
    current = None
    buf: list[str] = []
    for line in text.splitlines():
        t = line.strip()
        if not t:
            continue
        if t == '[ALEX]':
            if current and buf:
                segments.append({'speaker': current, 'text': ' '.join(buf)})
            current = 'ALEX'
            buf = []
        elif t == '[JAMIE]':
            if current and buf:
                segments.append({'speaker': current, 'text': ' '.join(buf)})
            current = 'JAMIE'
            buf = []
        elif t == '[PAUSE]':
            if current and buf:
                segments.append({'speaker': current, 'text': ' '.join(buf)})
                buf = []
            segments.append({'speaker': 'PAUSE', 'text': ''})
        else:
            buf.append(t)
    if current and buf:
        segments.append({'speaker': current, 'text': ' '.join(buf)})
    return segments


# ---------------------------------------------------------------------------
# Text cleanup
# ---------------------------------------------------------------------------

def safe_text(s: str) -> str:
    """Replace smart quotes and em-dashes with ASCII equivalents."""
    return (s
            .replace('\u2019', "'")
            .replace('\u2018', "'")
            .replace('\u2014', '-')
            .replace('\u2013', '-')
            .replace('\u201c', '"')
            .replace('\u201d', '"'))


# ---------------------------------------------------------------------------
# Piper synthesis
# ---------------------------------------------------------------------------

def call_piper(model_path: Path, text: str, out_wav: Path):
    with tempfile.NamedTemporaryFile('w', delete=False, encoding='utf-8', suffix='.txt') as tf:
        tf.write(text)
        tf.flush()
        in_path = tf.name
    cmd = [
        sys.executable, '-m', 'piper',
        '-m', str(model_path),
        '-i', in_path,
        '-f', str(out_wav),
        '--data-dir', str(MODELS_DIR),
        '-s', '0',
        '--length-scale', str(LENGTH_SCALE),
        '--noise-scale', str(NOISE_SCALE),
        '--noise-w-scale', str(NOISE_W_SCALE),
        '--sentence-silence', '0.0',
    ]
    try:
        subprocess.check_call(cmd)
    finally:
        try:
            os.unlink(in_path)
        except Exception:
            pass


def apply_pitch_shift(wav_path: Path, semitones: float):
    """Shift pitch while preserving duration via ffmpeg (no-op when semitones==0)."""
    if semitones == 0.0:
        return
    ffmpeg = find_ffmpeg()
    if not ffmpeg:
        raise RuntimeError('pitch_semitones is non-zero but ffmpeg was not found on PATH')
    factor = 2 ** (semitones / 12.0)
    filter_expr = f'asetrate={SAMPLE_RATE * factor},atempo={1.0 / factor},aresample={SAMPLE_RATE}'
    tmp = wav_path.with_suffix('.pitched.wav')
    subprocess.check_call([
        ffmpeg, '-y', '-loglevel', 'error',
        '-i', str(wav_path), '-af', filter_expr, str(tmp),
    ])
    tmp.replace(wav_path)


def find_ffmpeg() -> str | None:
    ffmpeg = shutil.which('ffmpeg')
    if ffmpeg:
        return ffmpeg
    try:
        import imageio_ffmpeg
    except ImportError:
        return None
    return imageio_ffmpeg.get_ffmpeg_exe()


def convert_wav_to_mp3(wav_path: Path, mp3_path: Path):
    ffmpeg = find_ffmpeg()
    if not ffmpeg:
        raise RuntimeError('episode_audio_format=mp3 requires ffmpeg on PATH or imageio-ffmpeg installed')
    subprocess.check_call([
        ffmpeg,
        '-y',
        '-loglevel',
        'error',
        '-i',
        str(wav_path),
        '-codec:a',
        'libmp3lame',
        '-q:a',
        '2',
        str(mp3_path),
    ])


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def read_wav_pcm(wav_path: Path) -> tuple[bytes, wave._wave_params]:
    """Read a WAV and return (raw PCM bytes, params)."""
    with wave.open(str(wav_path), 'rb') as w:
        params = w.getparams()
        frames = w.readframes(w.getnframes())
    return frames, params


def write_wav(path: Path, pcm: bytes):
    """Write raw PCM bytes as a 16-bit mono 24 kHz WAV."""
    with wave.open(str(path), 'wb') as w:
        w.setnchannels(CHANNELS)
        w.setsampwidth(SAMPWIDTH)
        w.setframerate(SAMPLE_RATE)
        w.writeframes(pcm)


def generate_silence(seconds: float) -> bytes:
    """Return silent PCM bytes for the given duration."""
    nframes = int(SAMPLE_RATE * seconds)
    return b'\x00' * (SAMPWIDTH * CHANNELS * nframes)


# ---------------------------------------------------------------------------
# Episode generation — writes segments to folders + manifest + concatenated WAV
# ---------------------------------------------------------------------------

def generate_episode(script_path: Path, out_path: Path | None = None) -> Path | None:
    """Synthesize all segments and write them to an episode folder.

    Creates:
      podcasts/audio/segments/<slug>/seg001-alex.wav   (or -jamie, -pause)
      podcasts/audio/segments/<slug>/manifest.json
            podcasts/audio/<slug>.<ext>                      (final output)

        Returns the final episode output path on success, or None on failure.
    """
    slug = script_path.stem
    text = script_path.read_text(encoding='utf-8')
    segments = parse_script(text)
    print(f'Processing {script_path.name}: {len(segments)} segments')
    cfg_label = f' (config: {ACTIVE_CONFIG_PATH})' if ACTIVE_CONFIG_PATH else ''
    print(f'  Voice config{cfg_label}: ALEX={MALE_MODEL.name}, JAMIE={FEMALE_MODEL.name}, '
          f'length={LENGTH_SCALE}, noise={NOISE_SCALE}, noise_w={NOISE_W_SCALE}, '
          f'pitch_alex={MALE_PITCH_SEMITONES}, pitch_jamie={FEMALE_PITCH_SEMITONES}, '
          f'episode_audio_format={EPISODE_AUDIO_FORMAT}')

    # Create episode segment directory
    seg_dir = SEGMENTS_DIR / slug
    seg_dir.mkdir(parents=True, exist_ok=True)
    AUDIO_DIR.mkdir(parents=True, exist_ok=True)

    manifest: list[dict] = []
    pcm_parts: list[bytes] = []

    for idx, seg in enumerate(segments, start=1):
        seq_str = f'{idx:03d}'
        speaker = seg['speaker']

        if speaker == 'PAUSE':
            filename = f'seg{seq_str}-pause.wav'
            seg_wav = seg_dir / filename
            pcm = generate_silence(PAUSE_SECONDS)
            write_wav(seg_wav, pcm)
            duration = PAUSE_SECONDS
            print(f'  [{idx}/{len(segments)}] PAUSE {duration}s -> {filename}')
            manifest.append({
                'seq': idx,
                'speaker': 'PAUSE',
                'text': '',
                'filename': filename,
                'status': 'pause',
                'duration': duration,
                'sha256': sha256_bytes(pcm),
            })
            pcm_parts.append(pcm)
            continue

        # Speech segment
        raw_text = safe_text(seg['text'])
        processed_text = apply_lexicon(raw_text)
        model = MALE_MODEL if speaker == 'ALEX' else FEMALE_MODEL
        pitch_shift = MALE_PITCH_SEMITONES if speaker == 'ALEX' else FEMALE_PITCH_SEMITONES

        if not model.exists():
            print(f'  Model not found: {model} — skipping episode')
            return None

        filename = f'seg{seq_str}-{speaker.lower()}.wav'
        seg_wav = seg_dir / filename
        print(f'  [{idx}/{len(segments)}] {speaker}: "{raw_text[:60]}..." -> {filename}')

        call_piper(model, processed_text, seg_wav)
        apply_pitch_shift(seg_wav, pitch_shift)

        # Read back the PCM for manifest metadata and concatenation
        pcm, params = read_wav_pcm(seg_wav)

        # Add small natural spacing between spoken segments unless a [PAUSE] follows.
        if idx < len(segments):
            next_speaker = segments[idx]['speaker']
            if next_speaker != 'PAUSE':
                gap_seconds = INTER_SPEAKER_SECONDS if next_speaker != speaker else INTER_SEGMENT_SECONDS
                if gap_seconds > 0:
                    pcm = pcm + generate_silence(gap_seconds)

        # Add a short tail to the last spoken segment so sentence endings do not clip.
        if idx == len(segments) and FINAL_SEGMENT_TAIL_SECONDS > 0:
            tail_pcm = generate_silence(FINAL_SEGMENT_TAIL_SECONDS)
            pcm = pcm + tail_pcm
            write_wav(seg_wav, pcm)

        duration = round(len(pcm) / (SAMPLE_RATE * SAMPWIDTH * CHANNELS), 3)

        manifest.append({
            'seq': idx,
            'speaker': speaker,
            'text': seg['text'],
            'filename': filename,
            'status': 'synthesized',
            'duration': duration,
            'sha256': sha256_bytes(pcm),
        })
        pcm_parts.append(pcm)

    if not pcm_parts:
        print(f'  No audio generated for {script_path.name}')
        return None

    # Write manifest.json
    manifest_path = seg_dir / 'manifest.json'
    manifest_path.write_text(json.dumps(manifest, indent=2), encoding='utf-8')
    print(f'  Wrote manifest: {manifest_path} ({len(manifest)} entries)')

    # Write run metadata for auditability of voice/model/settings used
    run_meta_path = seg_dir / 'run-meta.json'
    run_meta = {
        'slug': slug,
        'male_model': MALE_MODEL.name,
        'female_model': FEMALE_MODEL.name,
        'length_scale': LENGTH_SCALE,
        'noise_scale': NOISE_SCALE,
        'noise_w_scale': NOISE_W_SCALE,
        'male_pitch_semitones': MALE_PITCH_SEMITONES,
        'female_pitch_semitones': FEMALE_PITCH_SEMITONES,
        'episode_audio_format': EPISODE_AUDIO_FORMAT,
        'inter_segment_seconds': INTER_SEGMENT_SECONDS,
        'inter_speaker_seconds': INTER_SPEAKER_SECONDS,
        'final_segment_tail_seconds': FINAL_SEGMENT_TAIL_SECONDS,
        'pause_seconds': PAUSE_SECONDS,
        'config_path': ACTIVE_CONFIG_PATH,
    }
    run_meta_path.write_text(json.dumps(run_meta, indent=2), encoding='utf-8')
    print(f'  Wrote run metadata: {run_meta_path}')

    # Write concatenated episode output(s)
    out_wav = AUDIO_DIR / f'{slug}.wav'
    out_mp3 = AUDIO_DIR / f'{slug}.mp3'
    out_ep = out_path or out_wav
    all_pcm = b''.join(pcm_parts)
    write_wav(out_wav, all_pcm)

    if EPISODE_AUDIO_FORMAT in ('mp3', 'both'):
        convert_wav_to_mp3(out_wav, out_mp3)
        if EPISODE_AUDIO_FORMAT == 'mp3':
            out_wav.unlink(missing_ok=True)
            out_ep = out_mp3
        else:
            out_ep = out_wav

    if EPISODE_AUDIO_FORMAT == 'wav':
        out_ep = out_wav

    size_mb = out_ep.stat().st_size / 1024 / 1024
    total_dur = round(len(all_pcm) / (SAMPLE_RATE * SAMPWIDTH * CHANNELS), 1)
    print(f'  Wrote episode: {out_ep} ({size_mb:.2f} MB, {total_dur}s)')
    if EPISODE_AUDIO_FORMAT == 'both':
        mp3_mb = out_mp3.stat().st_size / 1024 / 1024
        print(f'  Wrote episode: {out_mp3} ({mp3_mb:.2f} MB, {total_dur}s)')
    return out_ep


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def main():
    import argparse
    parser = argparse.ArgumentParser(
        description='Generate a podcast episode with Piper TTS',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=(
            'Configuration is loaded from podcasts/tts/voice-config.ini by default.\n'
            'CLI flags override the config file. Env vars (PIPER_*) sit between them.\n'
            'Run metadata is written to podcasts/audio/segments/<slug>/run-meta.json.'
        ),
    )
    parser.add_argument('slug', nargs='?', default='ep00-welcome',
                        help='Episode slug (e.g. ep05-pull-requests)')
    parser.add_argument('--script', type=Path, help='Path to script file (overrides slug)')
    parser.add_argument('--config', type=Path,
                        help='Voice config INI file (default: podcasts/tts/voice-config.ini)')
    parser.add_argument('--male-model',
                        help='Alex model filename, e.g. en_US-ryan-high.onnx')
    parser.add_argument('--female-model',
                        help='Jamie model filename, e.g. en_US-lessac-high.onnx')
    parser.add_argument('--length-scale', type=float,
                        help='Speech speed/length scale (0.7 fast .. 2.0 slow, default 1.14)')
    parser.add_argument('--noise-scale', type=float,
                        help='Inflection/expressiveness (0.0 flat .. 1.2 expressive, default 0.32)')
    parser.add_argument('--noise-w-scale', type=float,
                        help='Phoneme duration variation (0.0 uniform .. 1.2 varied, default 0.42)')
    parser.add_argument('--male-pitch-semitones', type=float,
                        help='Alex pitch shift in semitones (-6..6, 0 = no shift, requires ffmpeg)')
    parser.add_argument('--female-pitch-semitones', type=float,
                        help='Jamie pitch shift in semitones (-6..6, 0 = no shift, requires ffmpeg)')
    parser.add_argument('--pitch-semitones', type=float,
                        help='Legacy single pitch shift for both voices (-6..6, requires ffmpeg)')
    parser.add_argument('--episode-audio-format', choices=['wav', 'mp3', 'both'],
                        help='Episode output format: wav, mp3, or both (mp3/both require ffmpeg)')
    parser.add_argument('--pause-seconds', type=float,
                        help='Duration of [PAUSE] silence in seconds (0..5, default 1.2)')
    parser.add_argument('--inter-segment-seconds', type=float,
                        help='Gap between same-speaker segments (0..0.6, default 0.09)')
    parser.add_argument('--inter-speaker-seconds', type=float,
                        help='Gap between different-speaker segments (0..0.9, default 0.16)')
    parser.add_argument('--final-tail-seconds', type=float,
                        help='Tail silence on last spoken segment (0..1.0, default 0.12)')
    args = parser.parse_args()

    configure_runtime(
        config_path=args.config,
        cli_overrides={
            'male_model':                 args.male_model,
            'female_model':               args.female_model,
            'length_scale':               args.length_scale,
            'noise_scale':                args.noise_scale,
            'noise_w_scale':              args.noise_w_scale,
            'male_pitch_semitones':       args.male_pitch_semitones,
            'female_pitch_semitones':     args.female_pitch_semitones,
            'pitch_semitones':            args.pitch_semitones,
            'episode_audio_format':       args.episode_audio_format,
            'pause_seconds':              args.pause_seconds,
            'inter_segment_seconds':      args.inter_segment_seconds,
            'inter_speaker_seconds':      args.inter_speaker_seconds,
            'final_segment_tail_seconds': args.final_tail_seconds,
        },
    )

    if args.script:
        script_path = args.script
    else:
        direct = SCRIPTS_DIR / f'{args.slug}.txt'
        if direct.exists():
            script_path = direct
        else:
            matches = sorted(path for path in SCRIPTS_DIR.rglob(f'{args.slug}.txt') if path.is_file())
            script_path = matches[0] if matches else direct

    if not script_path.exists():
        print(f'Script not found: {script_path}')
        sys.exit(1)

    result = generate_episode(script_path)
    if not result:
        sys.exit(1)


if __name__ == '__main__':
    main()
