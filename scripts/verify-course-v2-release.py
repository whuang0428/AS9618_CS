#!/usr/bin/env python3
"""Verify the active V2 release archive and its embedded manifest."""

from __future__ import annotations

import hashlib
import json
import re
import zipfile
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
ARCHIVE = ROOT / "dist/AS9618-CS-2027-2029-v2.0.0.zip"
SIDECAR = ARCHIVE.with_suffix(".zip.sha256")


def digest(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main() -> None:
    if not ARCHIVE.is_file() or not SIDECAR.is_file():
        raise SystemExit("V2 release archive or SHA-256 sidecar is missing")
    expected = SIDECAR.read_text(encoding="utf-8").split()[0]
    if digest(ARCHIVE) != expected:
        raise SystemExit("V2 release SHA-256 does not match its sidecar")

    with zipfile.ZipFile(ARCHIVE) as archive:
        names = archive.namelist()
        if len(names) != len(set(names)):
            raise SystemExit("V2 release contains duplicate archive members")
        if any(name.lower().endswith(".pdf") or "past-papers" in name.lower() for name in names):
            raise SystemExit("V2 release contains a prohibited past-paper or PDF resource")
        active = [name for name in names if re.fullmatch(r"web/lesson-0(?:[0-8]\d|90)/index\.html", name)]
        redirects = [name for name in names if re.fullmatch(r"web/lesson-(?:09[1-9]|1[0-4]\d|150|151)/index\.html", name)]
        markdown = [name for name in names if re.fullmatch(r"lessons/\d{3}-.*\.md", name)]
        if len(active) != 90 or len(redirects) != 61 or len(markdown) != 90:
            raise SystemExit(f"V2 release counts are wrong: active={len(active)}, redirects={len(redirects)}, markdown={len(markdown)}")
        manifest = json.loads(archive.read("release-manifest.json"))
        if manifest.get("lessonCount") != 90 or manifest.get("legacyRedirectCount") != 61:
            raise SystemExit("V2 embedded release manifest has incorrect counts")
        for row in manifest["files"]:
            if hashlib.sha256(archive.read(row["path"])).hexdigest() != row["sha256"]:
                raise SystemExit(f"Manifest hash mismatch: {row['path']}")

    print(json.dumps({
        "status": "PASS",
        "archive": str(ARCHIVE),
        "sha256": expected,
        "activeLessons": 90,
        "legacyRedirects": 61,
        "markdownLessons": 90,
    }, indent=2))


if __name__ == "__main__":
    main()
