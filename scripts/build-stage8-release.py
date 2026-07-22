#!/usr/bin/env python3
"""Build a deterministic Stage 8 offline course archive using the standard library."""

from __future__ import annotations

import csv
import hashlib
import json
from pathlib import Path
import zipfile


ROOT = Path(__file__).resolve().parent.parent
METADATA_PATH = ROOT / "release" / "stage8-release.json"
INVENTORY_PATH = ROOT / "audits" / "stage8-release-inventory.csv"
FIXED_ZIP_TIME = (2026, 7, 22, 0, 0, 0)

SOURCE_FILES = (
    "README.md",
    "course-map.md",
    "syllabus-audit.md",
    "stage4-assessment-audit.md",
    "tools/generate_course.py",
)
SOURCE_DIRECTORIES = ("lessons", "assessments", "resources", "web", "audits", "scripts", "release")
EXCLUDED_NAMES = {".DS_Store", "__pycache__"}


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def source_paths(include_inventory: bool) -> list[Path]:
    paths = [ROOT / relative for relative in SOURCE_FILES]
    for directory in SOURCE_DIRECTORIES:
        paths.extend(path for path in (ROOT / directory).rglob("*") if path.is_file())

    selected = []
    for path in paths:
        relative = path.relative_to(ROOT)
        if any(part in EXCLUDED_NAMES for part in relative.parts):
            continue
        if not include_inventory and path == INVENTORY_PATH:
            continue
        selected.append(path)
    return sorted(set(selected), key=lambda path: path.relative_to(ROOT).as_posix())


def write_inventory(paths: list[Path]) -> None:
    INVENTORY_PATH.parent.mkdir(parents=True, exist_ok=True)
    with INVENTORY_PATH.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.writer(handle, lineterminator="\n")
        writer.writerow(("path", "size_bytes", "sha256"))
        for path in paths:
            data = path.read_bytes()
            writer.writerow((path.relative_to(ROOT).as_posix(), len(data), sha256_bytes(data)))


def zip_info(name: str) -> zipfile.ZipInfo:
    info = zipfile.ZipInfo(name, FIXED_ZIP_TIME)
    info.compress_type = zipfile.ZIP_DEFLATED
    info.create_system = 3
    info.external_attr = 0o100644 << 16
    return info


def main() -> None:
    metadata = json.loads(METADATA_PATH.read_text(encoding="utf-8"))
    archive_root = metadata["archiveRoot"]
    archive_name = metadata["archiveName"]
    dist = ROOT / "dist"
    archive_path = dist / archive_name
    checksum_path = dist / f"{archive_name}.sha256"

    base_paths = source_paths(include_inventory=False)
    write_inventory(base_paths)
    payload_paths = source_paths(include_inventory=True)
    payload = {
        path.relative_to(ROOT).as_posix(): path.read_bytes()
        for path in payload_paths
    }
    manifest = "".join(f"{sha256_bytes(data)}  {name}\n" for name, data in payload.items()).encode("utf-8")

    dist.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(archive_path, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as archive:
        for name, data in payload.items():
            archive.writestr(zip_info(f"{archive_root}/{name}"), data, compresslevel=9)
        archive.writestr(zip_info(f"{archive_root}/MANIFEST.sha256"), manifest, compresslevel=9)

    archive_hash = sha256_bytes(archive_path.read_bytes())
    checksum_path.write_text(f"{archive_hash}  {archive_name}\n", encoding="utf-8")
    print(
        f"Built {archive_path.relative_to(ROOT)}: "
        f"{len(payload)} payload files + MANIFEST.sha256, {archive_path.stat().st_size} bytes, sha256 {archive_hash}."
    )


if __name__ == "__main__":
    main()
