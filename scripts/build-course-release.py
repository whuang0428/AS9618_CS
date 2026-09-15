#!/usr/bin/env python3
"""Build a deterministic offline release for the single active course surface."""

from __future__ import annotations

import hashlib
import json
import re
import zipfile
from pathlib import Path
from urllib.parse import urlsplit


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


def release_bytes(path: Path) -> bytes:
    content = path.read_bytes()
    if path.suffix != ".html":
        return content

    def explicit_index(match: re.Match[str]) -> str:
        prefix, href, quote = match.groups()
        url = urlsplit(href)
        if url.scheme or url.netloc or not url.path.endswith("/"):
            return match.group(0)
        return prefix + url._replace(path=url.path + "index.html").geturl() + quote

    # Direct file browsing does not resolve directory links to index.html.
    # Rewrite only the packaged HTML, including older bookmark redirects.
    html = content.decode("utf-8")
    for pattern in (r'(\bhref=")([^"]+)(")', r'(\bcontent="\d+;\s*url=)([^"]+)(")'):
        html = re.sub(pattern, explicit_index, html)
    return html.encode("utf-8")


def main() -> None:
    contract = json.loads((ROOT / "scripts/course-v3-contract.json").read_text(encoding="utf-8"))
    source_manifest_path = ROOT / "scripts/past-paper-source-manifest.json"
    source_manifest = json.loads(source_manifest_path.read_text(encoding="utf-8"))
    crop_specs = json.loads((ROOT / "scripts/past-paper-extracts.json").read_text(encoding="utf-8"))
    registered_extracts: dict[Path, str] = {}
    source_ids = set()
    for question in source_manifest["questions"]:
        source_ids.add(question["id"])
        spec = {k: crop_specs[question["id"]][k] for k in ("qp", "ms", "insert") if k in crop_specs[question["id"]]}
        spec_hash = hashlib.sha256(json.dumps(spec, sort_keys=True, separators=(",", ":")).encode()).hexdigest()
        if question["extractReview"].get("cropSpecSha256") != spec_hash:
            raise SystemExit(f"Crop changed since visual review: {question['id']}")
        if question["sourceType"] != "past-paper" or question["extractReview"].get("status") != "verified":
            raise SystemExit(f"Unverified past-paper source: {question['id']}")
        for kind in ("qp", "ms"):
            if not question[kind]["extracts"]:
                raise SystemExit(f"Missing official {kind} content: {question['id']}")
        for extract in question["qp"]["extracts"] + question["ms"]["extracts"] + question.get("inserts", []):
            asset_path = ROOT / "web" / extract["asset"].lstrip("/")
            if not asset_path.is_file() or sha256(asset_path) != extract["sha256"]:
                raise SystemExit(f"Changed or missing official extract: {extract['asset']}")
            registered_extracts[asset_path] = extract["sha256"]
    course_source_ids = {q["id"] for lesson in contract["lessons"] for q in lesson["pastPaperQuestions"]}
    if course_source_ids != source_ids:
        raise SystemExit("Course and source manifest disagree on the selected past-paper questions.")
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
        ROOT / "web/stage7-accessibility.js",
        ROOT / "scripts/course-v3-contract.json",
        ROOT / "scripts/course-v2-migration.json",
        source_manifest_path,
    }
    add_tree(files, ROOT / "web/assessments")
    add_tree(files, ROOT / "web/resources")
    for section in range(1, 13):
        files.add(ROOT / "web/course-v3" / f"section-{section}" / "index.html")
    for lesson in contract["lessons"]:
        if lesson["section"] == 2:
            unit = lesson["lessonKey"].rsplit("L", 1)[1]
            files.add(ROOT / "web/course-v3/section-2" / f"unit-{unit}" / "index.html")
    for lesson in range(1, 94):
        files.add(ROOT / "web/course-v3" / f"lesson-{lesson:03d}" / "index.html")
    for lesson in range(1, 152):
        files.add(ROOT / "web" / f"lesson-{lesson:03d}" / "index.html")
    for asset in contract["assets"]:
        files.add(ROOT / asset["path"])

    missing = sorted(str(path.relative_to(ROOT)) for path in files if not path.is_file())
    if missing:
        raise SystemExit(f"Release inputs are missing: {missing}")
    forbidden = [path for path in files if (path.suffix.lower() == ".pdf" or "past-paper" in path.parent.name) and path not in registered_extracts]
    if forbidden:
        raise SystemExit(f"Unregistered source material entered release: {forbidden}")

    manifest_files = []
    for path in sorted(files):
        content = release_bytes(path)
        manifest_files.append({
            "path": path.relative_to(ROOT).as_posix(),
            "sha256": hashlib.sha256(content).hexdigest(),
            "bytes": len(content),
        })

    manifest = {
        "schemaVersion": 2,
        "release": "AS9618-CS-2027-2029-course",
        "coursePageCount": 93,
        "teachingUnitCount": sum(
            len(lesson["knowledgeUnits"])
            for lesson in contract["lessons"]
            if lesson["kind"] == "teaching"
        ),
        "legacyCompatibilityCount": 151,
        "files": manifest_files,
    }
    manifest_bytes = (json.dumps(manifest, indent=2) + "\n").encode("utf-8")

    DIST.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(ARCHIVE, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as archive:
        for source in sorted(files):
            info = zipfile.ZipInfo(source.relative_to(ROOT).as_posix(), date_time=(2026, 9, 1, 0, 0, 0))
            info.compress_type = zipfile.ZIP_DEFLATED
            info.external_attr = 0o644 << 16
            archive.writestr(info, release_bytes(source), compress_type=zipfile.ZIP_DEFLATED, compresslevel=9)
        manifest_info = zipfile.ZipInfo("release-manifest.json", date_time=(2026, 9, 1, 0, 0, 0))
        manifest_info.compress_type = zipfile.ZIP_DEFLATED
        manifest_info.external_attr = 0o644 << 16
        archive.writestr(manifest_info, manifest_bytes, compress_type=zipfile.ZIP_DEFLATED, compresslevel=9)

    digest = sha256(ARCHIVE)
    SIDECAR.write_text(f"{digest}  {ARCHIVE.name}\n", encoding="utf-8")
    print(json.dumps({"archive": str(ARCHIVE), "sha256": digest, "files": len(files) + 1, "bytes": ARCHIVE.stat().st_size}, indent=2))


if __name__ == "__main__":
    main()
