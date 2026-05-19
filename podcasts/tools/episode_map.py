"""Episode map loader, validator, and lookup helpers.

The episode map lives at ``docs/EPISODE_MAP.json`` and is the single source of
truth for episode identity, ordering, and metadata. This module loads it,
validates it against ``docs/EPISODE-MAP-SCHEMA.json``, and exposes lookup
helpers for the rest of the tooling.

Run as a script for quick validation:

    python -m podcasts.tools.episode_map
"""

from __future__ import annotations

import json
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Iterable

REPO_ROOT = Path(__file__).resolve().parents[2]
MAP_PATH = REPO_ROOT / "docs" / "EPISODE_MAP.json"
SCHEMA_PATH = REPO_ROOT / "docs" / "EPISODE-MAP-SCHEMA.json"
AUDIO_DIR = REPO_ROOT / "podcasts" / "audio" / "kokoro-am_liam-af_jessica"


@dataclass(frozen=True)
class EpisodeMap:
    schema_version: str
    show: dict[str, Any]
    episodes: list[dict[str, Any]]
    raw: dict[str, Any]

    def by_uuid(self, uuid: str) -> dict[str, Any] | None:
        for e in self.episodes:
            if e["uuid"] == uuid:
                return e
        return None

    def by_current_slug(self, slug: str) -> dict[str, Any] | None:
        for e in self.episodes:
            if e["current_slug"] == slug:
                return e
        return None

    def by_narration_id(self, nid: str) -> dict[str, Any] | None:
        for e in self.episodes:
            if e["narration_id"] == nid:
                return e
        return None

    def by_filename(self, filename: str) -> dict[str, Any] | None:
        for e in self.episodes:
            if e.get("filename") == filename:
                return e
        return None

    def of_group(self, group: str) -> Iterable[dict[str, Any]]:
        return (e for e in self.episodes if e["group"] == group)

    def of_band(self, band: str) -> Iterable[dict[str, Any]]:
        return (e for e in self.episodes if e.get("learning_band") == band)

    def of_topic_prefix(self, prefix: str) -> Iterable[dict[str, Any]]:
        return (e for e in self.episodes if e.get("topic_prefix") == prefix)

    def sorted_by_track(self) -> list[dict[str, Any]]:
        return sorted(
            (e for e in self.episodes if e.get("track_number") is not None and not e.get("archived")),
            key=lambda e: e["track_number"],
        )

    def children_of(self, parent_uuid: str) -> list[dict[str, Any]]:
        kids = [e for e in self.episodes if e.get("pairs_with_uuid") == parent_uuid]
        kids.sort(key=lambda e: (e.get("pair_order") or 0, e.get("track_number") or 0))
        return kids

    def parent_of(self, uuid: str) -> dict[str, Any] | None:
        entry = self.by_uuid(uuid)
        if not entry:
            return None
        parent_uuid = entry.get("pairs_with_uuid")
        if not parent_uuid:
            return None
        return self.by_uuid(parent_uuid)


def load(path: Path = MAP_PATH) -> EpisodeMap:
    raw = json.loads(path.read_text(encoding="utf-8"))
    return EpisodeMap(
        schema_version=raw["schema_version"],
        show=raw["show"],
        episodes=raw["episodes"],
        raw=raw,
    )


def validate(emap: EpisodeMap, schema_path: Path = SCHEMA_PATH) -> list[str]:
    """Return a list of error messages. Empty list means valid."""
    try:
        import jsonschema  # type: ignore[import-untyped]
    except ImportError:
        return ["jsonschema not installed; run: pip install jsonschema"]

    schema = json.loads(schema_path.read_text(encoding="utf-8"))
    v = jsonschema.Draft202012Validator(schema)
    errors = sorted(v.iter_errors(emap.raw), key=lambda e: list(e.absolute_path))
    return [f"at {list(e.absolute_path)}: {e.message}" for e in errors]


def integrity_check(emap: EpisodeMap) -> list[str]:
    """Cross-field checks beyond JSON Schema."""
    errors: list[str] = []
    seen_uuid: set[str] = set()
    seen_slug: set[str] = set()
    seen_track: set[int] = set()
    seen_filename: set[str] = set()
    seen_narration: set[str] = set()
    pair_order_by_parent: dict[str, set[int]] = {}
    uuids: set[str] = {e["uuid"] for e in emap.episodes}

    for e in emap.episodes:
        if e["uuid"] in seen_uuid:
            errors.append(f"duplicate uuid: {e['uuid']}")
        seen_uuid.add(e["uuid"])

        if e["current_slug"] in seen_slug:
            errors.append(f"duplicate current_slug: {e['current_slug']}")
        seen_slug.add(e["current_slug"])

        if e.get("narration_id"):
            if e["narration_id"] in seen_narration:
                errors.append(f"duplicate narration_id: {e['narration_id']}")
            seen_narration.add(e["narration_id"])

        if "filename" in e:
            if e["filename"] in seen_filename:
                errors.append(f"duplicate filename: {e['filename']}")
            seen_filename.add(e["filename"])

        if "track_number" in e and e["track_number"] is not None:
            if e["track_number"] in seen_track:
                errors.append(f"duplicate track_number: {e['track_number']}")
            seen_track.add(e["track_number"])

        parent = e.get("pairs_with_uuid")
        if parent and parent not in uuids:
            errors.append(f"pairs_with_uuid points to unknown uuid: {parent}")
        if parent == e["uuid"]:
            errors.append(f"self-parenting forbidden: {e['uuid']}")
        if parent and e.get("pair_order") is not None:
            bucket = pair_order_by_parent.setdefault(parent, set())
            if e["pair_order"] in bucket:
                errors.append(
                    f"duplicate pair_order {e['pair_order']} for parent {parent}"
                )
            bucket.add(e["pair_order"])

    # Track contiguity 1..N across non-archived entries.
    tracks = sorted(
        e["track_number"]
        for e in emap.episodes
        if e.get("track_number") is not None and not e.get("archived")
    )
    if tracks:
        expected = list(range(1, len(tracks) + 1))
        if tracks != expected:
            errors.append(
                f"track_number not contiguous from 1..N: got {tracks[:5]}..{tracks[-3:]}"
            )

    # pairs_with_uuid cycle detection (DFS).
    parent_map = {e["uuid"]: e.get("pairs_with_uuid") for e in emap.episodes}
    for start in parent_map:
        seen: set[str] = set()
        cur: str | None = start
        while cur:
            if cur in seen:
                errors.append(f"pairs_with_uuid cycle detected starting at {start}")
                break
            seen.add(cur)
            cur = parent_map.get(cur)

    return errors


def validate_files(emap: EpisodeMap, audio_dir: Path = AUDIO_DIR) -> list[str]:
    """Cross-check that every map filename has a matching mp3 and vice versa.

    During Stages 0-2 the on-disk filenames are still the legacy ``current_filename``
    values. We accept either ``filename`` or ``current_filename`` as the on-disk name,
    preferring ``filename`` when it exists on disk.
    """
    errors: list[str] = []
    if not audio_dir.exists():
        return [f"audio dir missing: {audio_dir}"]
    on_disk = {p.name for p in audio_dir.glob("*.mp3")}
    expected: set[str] = set()
    for e in emap.episodes:
        if e.get("archived"):
            continue
        new_name = e.get("filename")
        old_name = e.get("current_filename")
        if new_name and new_name in on_disk:
            expected.add(new_name)
        elif old_name and old_name in on_disk:
            expected.add(old_name)
        else:
            errors.append(
                f"no mp3 on disk for uuid {e['uuid']} (looked for {new_name} and {old_name})"
            )
    orphans = on_disk - expected
    for name in sorted(orphans):
        errors.append(f"orphan mp3 on disk with no map entry: {name}")
    return errors


def main() -> int:
    import argparse

    parser = argparse.ArgumentParser(description="Validate docs/EPISODE_MAP.json")
    parser.add_argument(
        "--validate-files",
        action="store_true",
        help="Also cross-check that every map filename has a matching mp3 on disk.",
    )
    args = parser.parse_args()

    emap = load()
    schema_errors = validate(emap)
    integrity_errors = integrity_check(emap)
    print(f"Loaded {len(emap.episodes)} episodes from {MAP_PATH}")
    print(f"Schema version: {emap.schema_version}")
    if schema_errors:
        print(f"FAIL: {len(schema_errors)} schema errors")
        for msg in schema_errors[:20]:
            print(f"  {msg}")
        return 1
    if integrity_errors:
        print(f"FAIL: {len(integrity_errors)} integrity errors")
        for msg in integrity_errors[:20]:
            print(f"  {msg}")
        return 1
    if args.validate_files:
        file_errors = validate_files(emap)
        if file_errors:
            print(f"FAIL: {len(file_errors)} file integrity errors")
            for msg in file_errors[:20]:
                print(f"  {msg}")
            return 1
        print("OK: schema, integrity, and file checks passed.")
        return 0
    print("OK: schema and integrity checks passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
