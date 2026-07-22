#!/usr/bin/env python3
"""Verify the Stage 8 ZIP, sidecar checksum, manifest and source parity."""

from __future__ import annotations

import argparse
import csv
import hashlib
import io
import json
from pathlib import Path, PurePosixPath
import posixpath
import re
import stat
import zipfile


def fail(message: str) -> None:
    raise SystemExit(f"Stage 8 package verification failed: {message}")


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def parse_manifest(data: bytes) -> dict[str, str]:
    rows: dict[str, str] = {}
    for line in data.decode("utf-8").splitlines():
        match = re.fullmatch(r"([0-9a-f]{64})  (.+)", line)
        if not match or match.group(2) in rows:
            fail(f"invalid or duplicate MANIFEST.sha256 row: {line}")
        rows[match.group(2)] = match.group(1)
    return rows


def verify_local_references(payload: dict[str, bytes]) -> None:
    references_checked = 0
    for name, data in payload.items():
        if not name.endswith(".html"):
            continue
        html = data.decode("utf-8")
        for reference in re.findall(r'\b(?:href|src)="([^"]+)"', html):
            if re.match(r"^(?:[a-z]+:|#|//)", reference, re.IGNORECASE):
                continue
            clean = re.split(r"[?#]", reference, maxsplit=1)[0]
            if not clean:
                continue
            if clean.startswith("/"):
                target = clean.lstrip("/")
            else:
                target = posixpath.normpath(posixpath.join(posixpath.dirname(name), clean))
            if clean.endswith("/"):
                target = posixpath.join(target, "index.html")
            if target not in payload:
                fail(f"{name}: packaged local reference does not resolve: {reference}")
            references_checked += 1
    if references_checked < 450:
        fail(f"local-reference coverage unexpectedly low: {references_checked}")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("archive", type=Path)
    parser.add_argument("--source-root", type=Path)
    args = parser.parse_args()

    archive_path = args.archive.resolve()
    sidecar_path = archive_path.with_name(f"{archive_path.name}.sha256")
    if not archive_path.is_file() or not sidecar_path.is_file():
        fail("archive or sidecar checksum is missing")

    archive_hash = sha256_bytes(archive_path.read_bytes())
    sidecar_match = re.fullmatch(r"([0-9a-f]{64})  ([^\n]+)\n?", sidecar_path.read_text(encoding="utf-8"))
    if not sidecar_match or sidecar_match.group(1) != archive_hash or sidecar_match.group(2) != archive_path.name:
        fail("sidecar checksum does not match the archive")

    with zipfile.ZipFile(archive_path) as archive:
        infos = archive.infolist()
        names = [info.filename for info in infos]
        if len(names) != len(set(names)):
            fail("archive contains duplicate names")
        if any(info.flag_bits & 0x1 for info in infos):
            fail("archive contains encrypted entries")
        for info in infos:
            path = PurePosixPath(info.filename)
            if path.is_absolute() or ".." in path.parts:
                fail(f"unsafe archive path: {info.filename}")
            mode = info.external_attr >> 16
            if stat.S_ISLNK(mode):
                fail(f"symbolic links are not allowed: {info.filename}")
            if any(part in {".DS_Store", "__pycache__"} for part in path.parts):
                fail(f"excluded file leaked into archive: {info.filename}")

        roots = {PurePosixPath(name).parts[0] for name in names}
        if len(roots) != 1:
            fail(f"archive must contain one root directory, found {sorted(roots)}")
        archive_root = roots.pop()
        manifest_name = f"{archive_root}/MANIFEST.sha256"
        if manifest_name not in names:
            fail("MANIFEST.sha256 is missing")

        manifest = parse_manifest(archive.read(manifest_name))
        payload_names = {name.removeprefix(f"{archive_root}/") for name in names if name != manifest_name}
        if payload_names != set(manifest):
            fail("manifest names do not exactly match archive payload")

        payload: dict[str, bytes] = {}
        for relative, expected_hash in manifest.items():
            data = archive.read(f"{archive_root}/{relative}")
            if sha256_bytes(data) != expected_hash:
                fail(f"manifest checksum mismatch: {relative}")
            payload[relative] = data

    metadata = json.loads(payload["release/stage8-release.json"].decode("utf-8"))
    if metadata["archiveRoot"] != archive_root or metadata["archiveName"] != archive_path.name:
        fail("release metadata does not match archive identity")
    if metadata["version"] != "1.0.0" or metadata["stage"] != 8 or metadata["status"] != "final":
        fail("release metadata is not the final Stage 8 version")

    required = set(metadata["entryPoints"].values()) | {"README.md", "release/RELEASE-NOTES.md"}
    missing = sorted(required - set(payload))
    if missing:
        fail(f"required release files are missing: {missing}")

    counts = {
        "lesson_markdown": sum(name.startswith("lessons/") and name.endswith(".md") for name in payload),
        "lesson_html": sum(re.fullmatch(r"web/lesson-\d{3}/index\.html", name) is not None for name in payload),
        "lesson_js": sum(re.fullmatch(r"web/lesson-\d{3}/app\.js", name) is not None for name in payload),
        "lesson_css": sum(re.fullmatch(r"web/lesson-\d{3}/styles\.css", name) is not None for name in payload),
        "assessment_markdown": sum(name.startswith("assessments/") and name.endswith(".md") for name in payload),
        "resource_markdown": sum(name.startswith("resources/") and name.endswith(".md") for name in payload),
    }
    expected_counts = {
        "lesson_markdown": 150,
        "lesson_html": 150,
        "lesson_js": 150,
        "lesson_css": 150,
        "assessment_markdown": 3,
        "resource_markdown": 4,
    }
    if counts != expected_counts:
        fail(f"course inventory mismatch: {counts}")

    inventory_name = "audits/stage8-release-inventory.csv"
    rows = list(csv.DictReader(io.StringIO(payload[inventory_name].decode("utf-8"))))
    inventory = {row["path"]: row for row in rows}
    expected_inventory = set(manifest) - {inventory_name}
    if set(inventory) != expected_inventory:
        fail("source inventory does not match packaged files")
    for name, row in inventory.items():
        if row["sha256"] != manifest[name] or int(row["size_bytes"]) != len(payload[name]):
            fail(f"source inventory mismatch: {name}")

    verify_local_references(payload)

    for name, data in payload.items():
        if name.endswith(".html"):
            if not re.search(rb'<link\b[^>]*\brel="icon"[^>]*>', data, re.IGNORECASE):
                fail(f"page would trigger a fallback favicon request: {name}")
            if re.search(
                rb'<(?:script|link|img|source|video|audio|iframe)\b[^>]*(?:src|href)="https?://', data, re.IGNORECASE
            ):
                fail(f"external runtime asset found: {name}")
        elif name.endswith(".css") and re.search(
            rb'(?:@import\s+(?:url\()?\s*["\']?|url\(\s*["\']?)https?://', data, re.IGNORECASE
        ):
            fail(f"external CSS dependency found: {name}")
        elif name.endswith(".js") and re.search(
            rb'(?:fetch|new\s+(?:WebSocket|EventSource))\s*\(\s*["\'`]https?://'
            rb'|\.open\s*\(\s*["\'][A-Z]+["\']\s*,\s*["\']https?://',
            data,
            re.IGNORECASE,
        ):
            fail(f"external JavaScript dependency found: {name}")

    if args.source_root:
        source_root = args.source_root.resolve()
        for name, expected_hash in manifest.items():
            source = source_root / name
            if not source.is_file() or sha256_bytes(source.read_bytes()) != expected_hash:
                fail(f"archive no longer matches source: {name}")

    print(
        f"Stage 8 package verification passed: {len(payload)} payload files, one manifest, "
        f"150 lesson triples, complete local references, source parity and sha256 {archive_hash}."
    )


if __name__ == "__main__":
    main()
