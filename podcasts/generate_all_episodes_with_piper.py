#!/usr/bin/env python3
"""Batch-generate all episodes found under podcasts/scripts using local Piper models.

Writes final episode WAVs into podcasts/audio/ preserving episode filenames.

Usage: run from repo root or invoke the script directly.
"""
import sys
from pathlib import Path
import subprocess
import tempfile
import wave
import os

ROOT = Path(__file__).resolve().parent
SCRIPTS_DIR = ROOT / 'scripts'
OUT_DIR = ROOT / 'audio'
MODELS_DIR = OUT_DIR / 'coqui_samples' / 'piper_models_en_us'

PAUSE_SECONDS = 1.5
INTER_SPEAKER_S = 0.6

MALE_MODEL = MODELS_DIR / 'en_US-ryan-high.onnx'
FEMALE_MODEL = MODELS_DIR / 'en_US-lessac-high.onnx'

def parse_script(text):
    segments = []
    lines = text.splitlines()
    current = None
    buf = []
    for line in lines:
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

def safe_text_for_file(s: str) -> str:
    return s.replace('’', "'").replace('—', '-').replace('“', '"').replace('”', '"')

def call_piper(model_path: Path, text: str, out_wav: Path):
    with tempfile.NamedTemporaryFile('w', delete=False, encoding='utf8', suffix='.txt') as tf:
        tf.write(text)
        tf.flush()
        in_path = tf.name
    cmd = [sys.executable, '-m', 'piper', '-m', str(model_path), '-i', in_path, '-f', str(out_wav), '--data-dir', str(MODELS_DIR), '-s', '0', '--sentence-silence', '0.0']
    try:
        subprocess.check_call(cmd)
    finally:
        try:
            os.unlink(in_path)
        except Exception:
            pass

def read_wav_frames(path: Path):
    with wave.open(str(path), 'rb') as w:
        params = w.getparams()
        frames = w.readframes(w.getnframes())
    return params, frames

def generate_silence_frames(params, seconds):
    nframes = int(params.framerate * seconds)
    sampwidth = params.sampwidth
    nch = params.nchannels
    return (b'\x00' * sampwidth * nch) * nframes

def process_script(script_path: Path):
    text = script_path.read_text(encoding='utf8')
    segments = parse_script(text)
    print(f'Processing {script_path.name}: {len(segments)} segments')

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    out_ep = OUT_DIR / (script_path.stem + '.wav')

    parts = []
    base_params = None

    for idx, seg in enumerate(segments, start=1):
        if seg['speaker'] == 'PAUSE':
            print(f'  [{idx}/{len(segments)}] PAUSE {PAUSE_SECONDS}s')
            if base_params:
                parts.append(generate_silence_frames(base_params, PAUSE_SECONDS))
            else:
                parts.append(('SILENCE', PAUSE_SECONDS))
            continue

        speaker = seg['speaker']
        text_seg = safe_text_for_file(seg['text'])
        print(f'  [{idx}/{len(segments)}] {speaker}: "{text_seg[:60]}..."')

        model = MALE_MODEL if speaker == 'ALEX' else FEMALE_MODEL
        if not model.exists():
            print('Model not found:', model, ' — skipping episode')
            return False

        tmp_out = OUT_DIR / f'{script_path.stem}-seg-{idx}.wav'
        call_piper(model, text_seg, tmp_out)

        params, frames = read_wav_frames(tmp_out)
        if base_params is None:
            base_params = params
            # replace silence placeholders
            new_parts = []
            for p in parts:
                if isinstance(p, tuple) and p[0] == 'SILENCE':
                    new_parts.append(generate_silence_frames(base_params, p[1]))
                else:
                    new_parts.append(p)
            parts = new_parts
        else:
            if params.framerate != base_params.framerate or params.sampwidth != base_params.sampwidth or params.nchannels != base_params.nchannels:
                print('Audio params mismatch; aborting', script_path)
                return False

        parts.append(frames)
        parts.append(generate_silence_frames(base_params, INTER_SPEAKER_S))

    if base_params is None:
        print('No audio generated for', script_path)
        return False

    total_frames = b''.join(parts)
    with wave.open(str(out_ep), 'wb') as outw:
        outw.setnchannels(base_params.nchannels)
        outw.setsampwidth(base_params.sampwidth)
        outw.setframerate(base_params.framerate)
        outw.writeframes(total_frames)

    size_mb = out_ep.stat().st_size / 1024 / 1024
    print(f'Wrote episode: {out_ep} ({size_mb:.2f} MB)')
    return True

def main():
    scripts = sorted(
        path for path in SCRIPTS_DIR.rglob('*.txt')
        if path.is_file() and path.stem.startswith('ep')
    )
    if not scripts:
        print('No episode scripts found in', SCRIPTS_DIR)
        sys.exit(1)

    print(f'Found {len(scripts)} scripts')
    success = 0
    for s in scripts:
        try:
            ok = process_script(s)
            if ok:
                success += 1
        except subprocess.CalledProcessError as e:
            print('piper failed for', s, 'rc=', getattr(e, 'returncode', None))
        except Exception as e:
            print('Error processing', s, e)

    print(f'Done. {success}/{len(scripts)} episodes generated')

if __name__ == '__main__':
    main()
