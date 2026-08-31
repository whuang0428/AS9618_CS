#!/usr/bin/env python3
"""Build a copyright-safe offline release for the active 90-lesson course."""

from __future__ import annotations

import hashlib
import json
import zipfile
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"
ARCHIVE = DIST / "AS9618-CS-2027-2029-v2.0.0.zip"
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
    content = json.loads((ROOT / "scripts/course-v2-content.json").read_text(encoding="utf-8"))
    files: set[Path] = {
        ROOT / "README.md",
        ROOT / "course-map.md",
        ROOT / "assessments/assessment-bank.md",
        ROOT / "audits/course-v2-redundancy-and-migration-report.md",
        ROOT / "audits/course-v2-migration-register.csv",
        ROOT / "web/index.html",
        ROOT / "web/index.css",
        ROOT / "web/index.js",
        ROOT / "web/course-catalog.js",
        ROOT / "web/course-v2.css",
        ROOT / "web/course-v2.js",
        ROOT / "web/academic-theme.css",
        ROOT / "web/stage7-accessibility.css",
        ROOT / "web/stage7-accessibility.js",
        ROOT / "web/assessments/index.html",
    }
    for contract in (
        "lesson-identity-contract.json",
        "course-v2-content.json",
        "course-v2-coverage-contract.json",
        "course-v2-migration.json",
        "question-bank-contract.json",
        "past-paper-frequency-contract.json",
        "assessment-bank-contract.json",
    ):
        files.add(ROOT / "scripts" / contract)
    add_tree(files, ROOT / "lessons")
    add_tree(files, ROOT / "resources")
    add_tree(files, ROOT / "web/resources")
    for lesson in range(1, 152):
        files.add(ROOT / "web" / f"lesson-{lesson:03d}" / "index.html")
    for lesson in content["lessons"]:
        if lesson.get("visual"):
            files.add(ROOT / "web" / lesson["visual"]["path"])

    missing = sorted(str(path.relative_to(ROOT)) for path in files if not path.is_file())
    if missing:
        raise SystemExit(f"Release inputs are missing: {missing}")
    forbidden = [path for path in files if path.suffix.lower() == ".pdf" or "past-papers" in path.as_posix().lower()]
    if forbidden:
        raise SystemExit(f"Copyright-sensitive input entered release: {forbidden}")

    manifest = {
        "schemaVersion": 1,
        "release": "AS9618-CS-2027-2029-v2.0.0",
        "lessonCount": 90,
        "legacyRedirectCount": 61,
        "files": [
            {"path": path.relative_to(ROOT).as_posix(), "sha256": sha256(path), "bytes": path.stat().st_size}
            for path in sorted(files)
        ],
    }
    manifest_bytes = (json.dumps(manifest, indent=2) + "\n").encode("utf-8")

    DIST.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(ARCHIVE, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as archive:
        for source in sorted(files):
            info = zipfile.ZipInfo(source.relative_to(ROOT).as_posix(), date_time=(2026, 8, 31, 0, 0, 0))
            info.compress_type = zipfile.ZIP_DEFLATED
            info.external_attr = 0o644 << 16
            archive.writestr(info, source.read_bytes(), compress_type=zipfile.ZIP_DEFLATED, compresslevel=9)
        manifest_info = zipfile.ZipInfo("release-manifest.json", date_time=(2026, 8, 31, 0, 0, 0))
        manifest_info.compress_type = zipfile.ZIP_DEFLATED
        manifest_info.external_attr = 0o644 << 16
        archive.writestr(manifest_info, manifest_bytes, compress_type=zipfile.ZIP_DEFLATED, compresslevel=9)

    digest = sha256(ARCHIVE)
    SIDECAR.write_text(f"{digest}  {ARCHIVE.name}\n", encoding="utf-8")
    print(json.dumps({
        "archive": str(ARCHIVE),
        "sha256": digest,
        "files": len(files) + 1,
        "bytes": ARCHIVE.stat().st_size,
    }, indent=2))


if __name__ == "__main__":
    main()
