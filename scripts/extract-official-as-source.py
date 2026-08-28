#!/usr/bin/env python3
"""Extract an independent AS subject-content inventory from the locked syllabus PDF.

This extractor deliberately does not read the course coverage contract or the
hand-authored syllabus mapping.  It uses the PDF's page geometry and typography
to capture candidate statements and their adjacent Notes and guidance as source
atoms.  The checked-in inventory is therefore an independent side of the
coverage reconciliation.
"""

from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path
import re

import pdfplumber


EXPECTED_PDF_SHA256 = "c8a4c6d033c07c6d8025689abed5ef481d581c28bae640986d275303ed6c08bc"
LIGHT_FONT = "HelveticaNeueLTW1G-Lt"

# PDF page, syllabus section, inclusive top-coordinate range.  These ranges are
# the AS Candidates-should-be-able-to tables on printed pages 14-31.  They were
# established from rendered-page review; headings, introductions and A Level
# content are outside the ranges.
CONTENT_BANDS = (
    (14, 1, 419.0, 714.0), (15, 1, 143.0, 625.0),
    (16, 2, 153.0, 693.0), (17, 2, 114.0, 308.0),
    (17, 3, 414.0, 786.0), (18, 3, 130.0, 521.0),
    (19, 4, 153.0, 735.0), (20, 4, 130.0, 331.0),
    (22, 4, 130.0, 182.0),
    (23, 5, 153.0, 768.0),
    (24, 6, 153.0, 562.0),
    (25, 7, 153.0, 366.0),
    (25, 8, 472.0, 735.0), (26, 8, 130.0, 728.0), (27, 8, 114.0, 186.0),
    (27, 9, 314.0, 756.0), (28, 9, 111.0, 171.0),
    (28, 10, 274.0, 652.0), (29, 10, 130.0, 255.0),
    (29, 11, 362.0, 761.0), (30, 11, 130.0, 318.0),
    (30, 12, 424.0, 731.0), (31, 12, 130.0, 393.0),
)


def sha256_bytes(value: bytes) -> str:
    return hashlib.sha256(value).hexdigest()


def normalise(value: str) -> str:
    value = value.replace("’", "'").replace("‘", "'")
    value = re.sub(r"(?<=\w)-\s+(?=\w)", " ", value)
    value = re.sub(r"[^a-zA-Z0-9#+<>&']+", " ", value)
    return re.sub(r"\s+", " ", value).strip().lower()


def grouped_lines(page, column: str, top_min: float, top_max: float) -> list[dict]:
    words = [
        word for word in page.extract_words(extra_attrs=["fontname", "size"])
        if LIGHT_FONT in word["fontname"]
        and top_min - 0.6 <= word["top"] <= top_max + 0.6
        and ((column == "candidate" and word["x0"] < 300) or (column == "note" and word["x0"] >= 300))
    ]
    lines: list[dict] = []
    for word in sorted(words, key=lambda item: (item["top"], item["x0"])):
        line = next((item for item in lines if abs(item["top"] - word["top"]) < 0.9), None)
        if line is None:
            line = {"top": word["top"], "words": []}
            lines.append(line)
        line["words"].append(word)

    paragraphs: list[dict] = []
    for line in sorted(lines, key=lambda item: item["top"]):
        text = " ".join(word["text"] for word in sorted(line["words"], key=lambda item: item["x0"]))
        if not paragraphs or line["top"] - paragraphs[-1]["bottom"] > 15.2:
            paragraphs.append({"top": line["top"], "bottom": line["top"], "text": text})
        else:
            paragraphs[-1]["bottom"] = line["top"]
            paragraphs[-1]["text"] += f" {text}"
    return paragraphs


def instruction_rows(page, printed_page: int, section: int, top_min: float, top_max: float) -> list[dict]:
    """Capture the mandatory assembly/bit-manipulation tables on pages 21-22."""
    words = page.extract_words(extra_attrs=["fontname", "size"])
    code_lines: list[dict] = []
    for word in words:
        if "Courier" not in word["fontname"] or not (top_min <= word["top"] <= top_max):
            continue
        line = next((item for item in code_lines if abs(item["top"] - word["top"]) < 0.9), None)
        if line is None:
            line = {"top": word["top"], "words": []}
            code_lines.append(line)
        line["words"].append(word)

    rows = []
    ordered = sorted(code_lines, key=lambda item: item["top"])
    for index, line in enumerate(ordered):
        lower = (ordered[index - 1]["top"] + line["top"]) / 2 if index else top_min
        upper = (line["top"] + ordered[index + 1]["top"]) / 2 if index + 1 < len(ordered) else top_max
        code = " ".join(word["text"] for word in sorted(line["words"], key=lambda item: item["x0"]))
        prose = [
            word for word in words
            if LIGHT_FONT in word["fontname"] and lower <= word["top"] < upper and word["x0"] >= 60
        ]
        description = " ".join(word["text"] for word in sorted(prose, key=lambda item: (item["top"], item["x0"])))
        text = re.sub(r"\s+", " ", f"{code} {description}").strip()
        if text:
            rows.append({
                "page": printed_page,
                "section": section,
                "kind": "note",
                "column": "instruction-table",
                "top": f"{line['top']:.1f}",
                "text": text,
            })
    return rows


def inventory_hash(items: list[dict]) -> str:
    basis = [
        {key: item[key] for key in ("sourceId", "page", "section", "kind", "coverageRole", "column", "top", "text", "normalisedHash")}
        for item in items
    ]
    payload = json.dumps(basis, ensure_ascii=False, separators=(",", ":")).encode()
    return sha256_bytes(payload)


def extract(pdf_path: Path) -> dict:
    pdf_bytes = pdf_path.read_bytes()
    actual_pdf_hash = sha256_bytes(pdf_bytes)
    if actual_pdf_hash != EXPECTED_PDF_SHA256:
        raise SystemExit(f"Official PDF SHA-256 mismatch: expected {EXPECTED_PDF_SHA256}, found {actual_pdf_hash}")

    items: list[dict] = []
    page_text_hashes: dict[str, str] = {}
    with pdfplumber.open(pdf_path) as pdf:
        for printed_page in range(14, 32):
            text = pdf.pages[printed_page - 1].extract_text(layout=True) or ""
            page_text_hashes[str(printed_page)] = sha256_bytes(text.encode())

        for printed_page, section, top_min, top_max in CONTENT_BANDS:
            page = pdf.pages[printed_page - 1]
            for kind in ("candidate", "note"):
                for paragraph in grouped_lines(page, kind, top_min, top_max):
                    items.append({
                        "page": printed_page,
                        "section": section,
                        "kind": kind,
                        "column": "left" if kind == "candidate" else "right",
                        "top": f"{paragraph['top']:.1f}",
                        "text": paragraph["text"],
                    })

        items.extend(instruction_rows(pdf.pages[20], 21, 4, 140.0, 700.0))
        items.extend(instruction_rows(pdf.pages[21], 22, 4, 245.0, 505.0))

    items.sort(key=lambda item: (item["page"], item["top"], 0 if item["kind"] == "candidate" else 1, item["column"]))
    counters: dict[tuple[int, str], int] = {}
    for item in items:
        key = (item["page"], item["kind"])
        counters[key] = counters.get(key, 0) + 1
        item["sourceId"] = f"P{item['page']:02d}-{'C' if item['kind'] == 'candidate' else 'N'}{counters[key]:03d}"
        item["normalisedHash"] = sha256_bytes(normalise(item["text"]).encode())
        item["coverageRole"] = "context" if item["kind"] == "note" and normalise(item["text"]) in {
            "including", "from", "including connection to", "including the following groups",
            "including the use and purpose of",
        } else "claim"

    counts = {
        "total": len(items),
        "candidate": sum(item["kind"] == "candidate" for item in items),
        "note": sum(item["kind"] == "note" for item in items),
        "claim": sum(item["coverageRole"] == "claim" for item in items),
        "context": sum(item["coverageRole"] == "context" for item in items),
        "sections": {str(section): sum(item["section"] == section for item in items) for section in range(1, 13)},
    }
    result = {
        "schemaVersion": 1,
        "source": {
            "title": "Cambridge International AS & A Level Computer Science 9618 syllabus for 2027, 2028 and 2029",
            "version": "Version 2",
            "published": "December 2025",
            "sha256": actual_pdf_hash,
            "subjectContentPages": [14, 31],
        },
        "extraction": {
            "method": "pdfplumber geometry and font extraction from locked PDF; no course contract or mapping input",
            "pageTextSha256": page_text_hashes,
            "contentBands": [list(band) for band in CONTENT_BANDS],
        },
        "counts": counts,
        "items": items,
    }
    result["inventoryHash"] = inventory_hash(items)
    return result


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--pdf", required=True, type=Path)
    parser.add_argument("--output", default="audits/remediation-v2-official-as-source-inventory.json", type=Path)
    args = parser.parse_args()
    result = extract(args.pdf)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Extracted {result['counts']['total']} independent official source atoms "
          f"({result['counts']['candidate']} candidate, {result['counts']['note']} notes); "
          f"inventoryHash={result['inventoryHash']}")


if __name__ == "__main__":
    main()
