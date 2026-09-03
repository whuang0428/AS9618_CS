#!/usr/bin/env python3
"""Verify the active-course release archive and its embedded manifest."""

from __future__ import annotations

import hashlib
import json
import re
import zipfile
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
ARCHIVE = ROOT / "dist/AS9618-CS-2027-2029-course.zip"
SIDECAR = ARCHIVE.with_suffix(".zip.sha256")


def digest(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def main() -> None:
    if not ARCHIVE.is_file() or not SIDECAR.is_file():
        raise SystemExit("Course release archive or SHA-256 sidecar is missing")
    expected = SIDECAR.read_text(encoding="utf-8").split()[0]
    if digest(ARCHIVE.read_bytes()) != expected:
        raise SystemExit("Course release SHA-256 does not match its sidecar")

    with zipfile.ZipFile(ARCHIVE) as archive:
        names = archive.namelist()
        if len(names) != len(set(names)):
            raise SystemExit("Course release contains duplicate archive members")
        if any(name.lower().endswith(".pdf") or "past-papers" in name.lower() for name in names):
            raise SystemExit("Course release contains a prohibited past-paper or PDF resource")
        course_pages = [name for name in names if re.fullmatch(r"web/course-v3/lesson-\d{3}/index\.html", name)]
        legacy = [name for name in names if re.fullmatch(r"web/lesson-\d{3}/index\.html", name)]
        if len(course_pages) != 93 or len(legacy) != 151:
            raise SystemExit(f"Course release counts are wrong: course={len(course_pages)}, compatibility={len(legacy)}")
        if any(re.fullmatch(r"web/course-v3/section-2/unit-\d{2}/index\.html", name) for name in names):
            raise SystemExit("Archived Section 2 unit routes entered the active release")
        manifest = json.loads(archive.read("release-manifest.json"))
        course_contract = json.loads(archive.read("scripts/course-v3-contract.json"))
        teaching_unit_count = sum(len(lesson["knowledgeUnits"]) for lesson in course_contract["lessons"] if lesson["kind"] == "teaching")
        if manifest.get("coursePageCount") != 93 or manifest.get("teachingUnitCount") != teaching_unit_count or manifest.get("legacyCompatibilityCount") != 151:
            raise SystemExit("Embedded release manifest has incorrect counts")
        for row in manifest["files"]:
            if digest(archive.read(row["path"])) != row["sha256"]:
                raise SystemExit(f"Manifest hash mismatch: {row['path']}")

    print(json.dumps({"status": "PASS", "archive": str(ARCHIVE), "sha256": expected, "coursePages": 93, "legacyCompatibilityEntries": 151}, indent=2))


if __name__ == "__main__":
    main()
