#!/usr/bin/env python3
"""Batch-generate podcast episodes using local Piper ONNX models.

Piper is a maintained fallback/comparison engine. Kokoro is the production
default through podcasts.tts.generate_audio.

Usage:
  python -m podcasts.tts.generate_all
  python -m podcasts.tts.generate_all --start 5 --end 10
"""
import sys
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent          # podcasts/
REPO_ROOT = ROOT.parent
SCRIPTS_DIR = ROOT / 'scripts'

if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))

from podcasts.listening_plan import ordered_script_paths, script_group, script_index  # noqa: E402

def main():
    import argparse
    parser = argparse.ArgumentParser(description='Batch-generate podcast episodes with Piper')
    parser.add_argument('--start', type=int, default=0, help='First episode number (inclusive)')
    parser.add_argument('--end', type=int, default=999, help='Last episode number (inclusive)')
    parser.add_argument('--group', choices=['all', 'chapters', 'challenges', 'appendices'], default='all',
                        help='Limit generation to a script category')
    parser.add_argument('--audio-format', choices=['wav', 'mp3', 'both'], default=None,
                        help='Episode output format override for Piper')
    parser.add_argument('--config', type=Path, help='Piper voice config INI file')
    parser.add_argument('--male-model', help='Alex Piper model filename')
    parser.add_argument('--female-model', help='Jamie Piper model filename')
    parser.add_argument('--dry-run', action='store_true', help='Print the listening-order queue without audio synthesis')
    parser.add_argument('--force', action='store_true', help='Accepted for CLI parity; Piper regenerates selected output')
    args = parser.parse_args()

    scripts: list[Path] = ordered_script_paths(SCRIPTS_DIR)
    if not scripts:
        print(f'No episode scripts found in {SCRIPTS_DIR}')
        sys.exit(1)

    # Filter numbered episode and challenge scripts to the requested range.
    # Bonus challenge scripts remain included only for the default full run.
    filtered_scripts: list[Path] = []
    for script in scripts:
        index = script_index(script)
        if index is None:
            if args.start == 0 and args.end == 999:
                filtered_scripts.append(script)
            continue
        if args.start <= index <= args.end and (args.group == 'all' or script_group(script) == args.group):
            filtered_scripts.append(script)

    scripts = filtered_scripts
    if not scripts:
        print(f'No matching scripts found in {SCRIPTS_DIR} for range {args.start}..{args.end}')
        sys.exit(1)

    if args.dry_run:
        print(f'Piper generation queue ({len(scripts)} scripts, group={args.group}, order=listening):')
        for index, script in enumerate(scripts, start=1):
            print(f'{index:02d}. {script.stem} ({script_group(script)})')
        return

    print(f'Found {len(scripts)} scripts to process (range {args.start:02d}-{args.end:02d})')

    # Import the single-episode generator from our own package
    from podcasts.tts.generate_episode import configure_runtime, generate_episode

    configure_runtime(
        config_path=args.config,
        cli_overrides={
            'episode_audio_format': args.audio_format,
            'male_model': args.male_model,
            'female_model': args.female_model,
        },
    )

    success = 0
    failed: list[str] = []
    for s in scripts:
        try:
            result = generate_episode(s)
            if result:
                success += 1
            else:
                failed.append(s.name)
        except subprocess.CalledProcessError as e:
            print(f'  Piper failed for {s.name} (rc={getattr(e, "returncode", None)})')
            failed.append(s.name)
        except Exception as e:
            print(f'  Error processing {s.name}: {e}')
            failed.append(s.name)

    print(f'\nDone. {success}/{len(scripts)} episodes generated successfully.')
    if failed:
        print(f'Failed: {", ".join(failed)}')


if __name__ == '__main__':
    main()
