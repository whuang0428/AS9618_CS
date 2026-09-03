#!/usr/bin/env python3
"""Build a deterministic offline release for the single active course surface."""

from __future__ import annotations

import hashlib
import json
import zipfile
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"
ARCHIVE = DIST / "AS9618-CS-2027-2029-course.zip"
SIDECAR = ARCHIVE.with_suffix(".zip.sha256")


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def add_tree(files: set[Path], directory: Path) -> None:
    if directory.exists():
        files.update(path for path in directory.rglob("*") if path.is_file())


def main() -> None:
    contract = json.loads((ROOT / "scripts/course-v3-contract.json").read_text(encoding="utf-8"))
    files: set[Path] = {
        ROOT / "README.md",
        ROOT / "course-v3-map.md",
        ROOT / "web/index.html",
        ROOT / "web/course-v3/index.html",
        ROOT / "web/course-v3/course.css",
        ROOT / "web/course-v3/course.js",
        ROOT / "web/academic-theme.css",
        ROOT / "web/course-v2.css",
        ROOT / "web/stage7-accessibility.css",
        ROOT / "scripts/course-v3-contract.json",
        ROOT / "scripts/course-v2-migration.json",
    }
    add_tree(files, ROOT / "web/assessments")
    add_tree(files, ROOT / "web/resources")
    for section in range(1, 13):
        files.add(ROOT / "web/course-v3" / f"section-{section}" / "index.html")
    for lesson in range(1, 94):
        files.add(ROOT / "web/course-v3" / f"lesson-{lesson:03d}" / "index.html")
    for lesson in range(1, 152):
        files.add(ROOT / "web" / f"lesson-{lesson:03d}" / "index.html")
    for asset in contract["assets"]:
        files.add(ROOT / asset["path"])

    missing = sorted(str(path.relative_to(ROOT)) for path in files if not path.is_file())
    if missing:
        raise SystemExit(f"Release inputs are missing: {missing}")
    forbidden = [path for path in files if path.suffix.lower() == ".pdf" or "past-papers" in path.as_posix().lower()]
    if forbidden:
        raise SystemExit(f"Copyright-sensitive input entered release: {forbidden}")

    manifest = {
        "schemaVersion": 2,
        "release": "AS9618-CS-2027-2029-course",
        "coursePageCount": 93,
        "teachingUnitCount": 145,
        "legacyCompatibilityCount": 151,
        "files": [
            {"path": path.relative_to(ROOT).as_posix(), "sha256": sha256(path), "bytes": path.stat().st_size}
            for path in sorted(files)
        ],
    }
    manifest_bytes = (json.dumps(manifest, indent=2) + "\n").encode("utf-8")

    DIST.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(ARCHIVE, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as archive:
        for source in sorted(files):
            info = zipfile.ZipInfo(source.relative_to(ROOT).as_posix(), date_time=(2026, 9, 1, 0, 0, 0))
            info.compress_type = zipfile.ZIP_DEFLATED
            info.external_attr = 0o644 << 16
            archive.writestr(info, source.read_bytes(), compress_type=zipfile.ZIP_DEFLATED, compresslevel=9)
        manifest_info = zipfile.ZipInfo("release-manifest.json", date_time=(2026, 9, 1, 0, 0, 0))
        manifest_info.compress_type = zipfile.ZIP_DEFLATED
        manifest_info.external_attr = 0o644 << 16
        archive.writestr(manifest_info, manifest_bytes, compress_type=zipfile.ZIP_DEFLATED, compresslevel=9)

    digest = sha256(ARCHIVE)
    SIDECAR.write_text(f"{digest}  {ARCHIVE.name}\n", encoding="utf-8")
    print(json.dumps({"archive": str(ARCHIVE), "sha256": digest, "files": len(files) + 1, "bytes": ARCHIVE.stat().st_size}, indent=2))


if __name__ == "__main__":
    main()
