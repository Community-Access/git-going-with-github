#!/usr/bin/env python3
"""Batch-generate all podcast episodes using local Piper ONNX models.

Iterates every ep*.txt and cc-*.txt script in podcasts/scripts/ and writes
final episode files to podcasts/audio/ according to voice-config.ini.

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


def script_index(path: Path) -> int | None:
    """Return the numeric index for epNN or cc-NN scripts, else None."""
    stem = path.stem
    if stem.startswith('ep'):
        try:
            return int(stem.split('-', 1)[0].replace('ep', ''))
        except ValueError:
            return None
    if stem.startswith('cc-'):
        parts = stem.split('-', 2)
        if len(parts) > 1 and parts[1].isdigit():
            return int(parts[1])
    return None


def script_sort_key(path: Path) -> tuple[int, int, str]:
    stem = path.stem
    if stem.startswith('ep'):
        return (0, script_index(path) or 0, stem)
    if stem.startswith('cc-'):
        index = script_index(path)
        return (1, index if index is not None else 999, stem)
    return (2, 999, stem)


def script_group(path: Path) -> str:
    parent = path.parent.name.lower()
    if parent in {'chapters', 'challenges', 'appendices'}:
        return parent
    if path.stem.startswith('cc-'):
        return 'challenges'
    return 'chapters'


def main():
    import argparse
    parser = argparse.ArgumentParser(description='Batch-generate all podcast episodes')
    parser.add_argument('--start', type=int, default=0, help='First episode number (inclusive)')
    parser.add_argument('--end', type=int, default=999, help='Last episode number (inclusive)')
    parser.add_argument('--group', choices=['all', 'chapters', 'challenges', 'appendices'], default='all',
                        help='Limit generation to a script category')
    args = parser.parse_args()

    scripts: list[Path] = sorted(
        [
            path
            for path in SCRIPTS_DIR.rglob('*.txt')
            if path.is_file() and (path.stem.startswith('ep') or path.stem.startswith('cc-'))
        ],
        key=script_sort_key,
    )
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

    print(f'Found {len(scripts)} scripts to process (range {args.start:02d}-{args.end:02d})')

    # Import the single-episode generator from our own package
    from podcasts.tts.generate_episode import generate_episode

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
