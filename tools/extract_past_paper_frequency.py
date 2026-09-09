#!/usr/bin/env python3
"""Build a copyright-safe 9618 past-paper frequency contract.

The source PDFs are read from a teacher-owned directory outside this repository.
Only paper references, marks, command words and syllabus tags are written. Question
and mark-scheme wording never enters the generated contract.
"""

from __future__ import annotations

import argparse
import collections
import hashlib
import json
import math
import re
from pathlib import Path

STOPWORDS = {
    "a", "about", "all", "an", "and", "any", "are", "as", "at", "be", "been",
    "being", "between", "by", "can", "data", "describe", "different", "each",
    "for", "from", "give", "how", "identify", "in", "include", "including", "is",
    "it", "its", "may", "of", "one", "or", "other", "required", "show", "state",
    "system", "systems", "that", "the", "their", "these", "this", "to", "two",
    "understanding", "use", "used", "using", "when", "where", "which", "with",
}

COMMAND_WORDS = (
    "compare", "complete", "construct", "convert", "calculate", "define", "describe",
    "design", "draw", "evaluate", "explain", "give", "identify", "justify", "name",
    "outline", "show", "sketch", "state", "suggest", "trace", "write",
)

SECTION_RULES = {
    1: (
        "binary coded decimal", "bcd", "two's complement", "two’s complement", "hexadecimal",
        "bitmap", "vector graphic", "sampling rate", "sampling resolution", "compression",
        "character set", "ascii", "unicode", "file size", "binary addition", "overflow",
    ),
    2: (
        "network", "packet", "router", "switch", "ethernet", "protocol", "http", "https",
        "ftp", "smtp", "pop3", "imap", "topology", "internet", "intranet", "extranet",
        "bandwidth", "latency", "ip address", "url", "cloud computing",
    ),
    3: (
        "input device", "output device", "storage device", "sensor", "actuator", "monitoring",
        "control system", "embedded system", "logic gate", "truth table", "boolean expression",
        "microcontroller", "virtual reality", "touchscreen", "solid state", "optical storage",
    ),
    4: (
        "processor", "cpu", "register", "program counter", "memory address register",
        "fetch-decode-execute", "fetch decode execute", "interrupt", "assembly language",
        "addressing mode", "accumulator", "system bus", "bit manipulation", "bitwise",
    ),
    5: (
        "operating system", "utility software", "compiler", "interpreter", "assembler", "linker",
        "loader", "library file", "ide", "integrated development environment", "syntax error",
        "runtime error", "logic error", "lexical analysis", "object code",
    ),
    6: (
        "malware", "virus", "spyware", "phishing", "pharming", "firewall", "encryption",
        "digital signature", "authentication", "authorisation", "password", "biometric",
        "validation", "verification", "backup", "audit trail", "data integrity", "hacking",
    ),
    7: (
        "copyright", "licence", "license", "open source", "free software foundation",
        "professional body", "ethics", "ethical", "artificial intelligence", "ai system",
        "surveillance", "data protection", "privacy",
    ),
    8: (
        "database", "sql", "primary key", "foreign key", "secondary key", "normal form", "3nf",
        "entity-relationship", "entity relationship", "dbms", "ddl", "dml", "select", "table",
    ),
    9: (
        "algorithm", "flowchart", "structured english", "stepwise refinement", "linear search",
        "binary search", "bubble sort", "insertion sort", "efficiency", "decomposition", "ipo",
    ),
    10: (
        "data type", "array", "record", "text file", "stack", "queue", "linked list",
        "abstract data type", "adt", "one-dimensional", "two-dimensional",
    ),
    11: (
        "pseudocode", "procedure", "function", "parameter", "by reference", "by value", "scope",
        "local variable", "global variable", "iteration", "selection", "loop", "mod", "div",
        "file handling", "readfile", "writefile", "built-in function", "string handling",
    ),
    12: (
        "program development life cycle", "development life cycle", "structure chart",
        "state-transition", "state transition", "test data", "normal data", "abnormal data",
        "extreme data", "boundary data", "maintenance", "corrective", "adaptive", "perfective",
        "debug", "black-box", "white-box",
    ),
}


def normalise_text(value: str) -> str:
    value = value.replace("’", "'").replace("–", "-").lower()
    value = re.sub(r"\(cid:\d+\)", " ", value)
    value = re.sub(r"[^a-z0-9+#'<>/=.-]+", " ", value)
    return re.sub(r"\s+", " ", value).strip()


def requirement_terms(requirement: dict) -> set[str]:
    source = " ".join([
        requirement.get("requirement", ""),
        requirement.get("notes", ""),
        " ".join(term for group in requirement.get("requiredGroups", []) for term in group),
    ])
    tokens = {
        token for token in re.findall(r"[a-z][a-z0-9+#'-]{2,}", normalise_text(source))
        if token not in STOPWORDS
    }
    return tokens


def extract_pages(pdf_path: Path) -> str:
    return "\n".join(line for line, _ in extract_question_lines(pdf_path))


def extract_question_lines(pdf_path: Path) -> list[tuple[str, float]]:
    try:
        import pdfplumber
    except ModuleNotFoundError as error:
        if error.name != "pdfplumber":
            raise
        raise SystemExit("PDF extraction requires pdfplumber. Install it in your Python environment with: python -m pip install pdfplumber") from None

    lines = []
    with pdfplumber.open(pdf_path) as document:
        for page in document.pages[1:]:
            for line in page.extract_text_lines():
                # Retain the printed label column; code line numbers and table
                # indices must not become question numbers after whitespace removal.
                if 55 <= line["top"] < page.height - 35:
                    for text in clean_lines(line["text"]):
                        lines.append((text, line["x0"]))
    return lines


def clean_lines(text: str) -> list[str]:
    lines = []
    for raw in text.splitlines():
        line = raw.strip()
        if not line:
            continue
        if "(cid:" in line and len(re.sub(r"\(cid:\d+\)", "", line).strip()) < 8:
            continue
        if re.fullmatch(r"(?:NIGRAM|SIHT|NI|ETIRW|TON|OD|DFD|\*.*\*)", line):
            continue
        if re.search(r"©\s*UCLES|\[Turn over|9618/\d{2}/[A-Z]/[A-Z]/\d{2}", line):
            continue
        line = re.sub(r"\.{8,}", " ", line)
        lines.append(re.sub(r"\s+", " ", line).strip())
    return lines


def parse_subquestions(pdf_path: Path) -> list[dict]:
    lines = extract_question_lines(pdf_path)
    rows: list[dict] = []
    current_question = None
    current_part = ""
    parent_part = ""
    parent_left = 0.0
    main_context: list[str] = []
    part_context: list[str] = []
    buffer: list[str] = []

    def update_label(line: str, left: float) -> str:
        nonlocal current_question, current_part, parent_part, parent_left, main_context, part_context, buffer
        main = re.match(r"^(\d+)\s+(.*)$", line)
        candidate = int(main.group(1)) if main else None
        expected = 1 if current_question is None else current_question + 1
        if main and candidate == expected and 45 <= left <= 55:
            current_question = candidate
            current_part = ""
            parent_part = ""
            parent_left = 0.0
            main_context = []
            part_context = []
            buffer = []
            line = main.group(2)
        label = re.match(r"^\(([a-z]|[ivxlcdm]+)\)\s*", line, flags=re.I)
        if label and current_question is not None and left <= 105 and (left <= 80 or re.fullmatch(r"[ivx]+", label.group(1), flags=re.I)):
            value = label.group(1).lower()
            is_nested = bool(parent_part) and re.fullmatch(r"[ivx]+", value) and (len(value) > 1 or left > parent_left + 12)
            if not is_nested:
                parent_part = f"({value})"
                parent_left = left
                current_part = parent_part
                part_context = []
            else:
                current_part = parent_part + f"({value})"
            buffer = []
            line = line[label.end():]
            nested = re.match(r"^\(([ivxlcdm]+)\)\s*", line, flags=re.I)
            if nested:
                current_part = parent_part + f"({nested.group(1).lower()})"
                line = line[nested.end():]
        return line

    for line, left in lines:
        line = update_label(line, left)
        if current_question is None:
            continue
        buffer.append(line)
        if not current_part:
            main_context.append(line)
        elif current_part == parent_part:
            part_context.append(line)
        bracket_values = re.findall(r"\[(\d{1,2})\]", line)
        marks = (
            re.findall(r"(?:^|\s)\[(\d{1,2})\]\s*$", line)
            if len(bracket_values) == 1
            else []
        )
        for mark_text in marks:
            marks_value = int(mark_text)
            if current_question is None or marks_value <= 0 or marks_value > 15:
                continue
            context = main_context + (part_context if current_part != parent_part else [])
            text = normalise_text(" ".join(context + buffer))
            rows.append({
                "question": current_question,
                "part": current_part,
                "marks": marks_value,
                "_text": text,
                "_prompt": normalise_text(" ".join(buffer)),
            })
            buffer = []

    return rows


def classify_command(text: str) -> str:
    command = re.search(r"\b(" + "|".join(COMMAND_WORDS) + r")\b", text)
    if command:
        return command.group(1)
    if any(token in text for token in ("what is", "what are", "which")):
        return "identify"
    return "apply"


def classify_question_type(command: str, text: str) -> str:
    if command in {"calculate", "convert"} or "show your working" in text:
        return "calculate"
    if any(term in text for term in ("trace", "dry run", "complete the trace")):
        return "trace"
    if command == "write" or (command == "complete" and any(term in text for term in ("pseudocode", "algorithm", "program code"))):
        return "write"
    if any(term in text for term in ("debug", "error in the program", "correct the")):
        return "debug"
    if command in {"draw", "sketch", "construct"}:
        return "diagram"
    if command in {"compare", "evaluate", "justify"}:
        return "evaluate"
    if command in {"explain", "describe", "outline", "suggest"}:
        return "explain"
    return "recall"


def score_requirement(text: str, requirement: dict, token_idf: dict[str, float]) -> float:
    text_tokens = set(re.findall(r"[a-z][a-z0-9+#'-]{2,}", text))
    overlap_score = sum(token_idf.get(token, 1.0) for token in text_tokens & requirement["_tokens"])
    phrase_score = 0.0
    for group in requirement.get("requiredGroups", []):
        if any(normalise_text(term) in text for term in group if len(normalise_text(term)) >= 3):
            phrase_score += 3.0
    return overlap_score + phrase_score


def classify_section(text: str, paper: int, requirements: list[dict], token_idf: dict[str, float]) -> int:
    allowed = range(1, 9) if paper == 1 else range(9, 13)
    rule_scores = {
        section: sum(3 if " " in phrase else 1 for phrase in phrases if phrase in text)
        for section, phrases in SECTION_RULES.items() if section in allowed
    }
    requirement_scores = {
        section: max(
            (score_requirement(text, requirement, token_idf) for requirement in requirements if requirement["section"] == section),
            default=0.0,
        )
        for section in allowed
    }
    combined = {
        section: rule_scores[section] * 4.0 + requirement_scores[section]
        for section in allowed
    }
    return max(combined, key=lambda section: (combined[section], -section))


def classify_requirements(text: str, section: int, requirements: list[dict], token_idf: dict[str, float]) -> tuple[str, list[str]]:
    candidates = []
    for requirement in requirements:
        if requirement["section"] != section:
            continue
        candidates.append((score_requirement(text, requirement, token_idf), requirement["id"]))
    candidates.sort(key=lambda item: (-item[0], item[1]))
    if not candidates:
        raise ValueError(f"No syllabus requirements for section {section}")
    primary_score, primary = candidates[0]
    secondary = [identifier for score, identifier in candidates[1:3] if score >= max(2.0, primary_score * 0.65)]
    return primary, secondary


def paper_metadata(path: Path) -> tuple[str, int, int, str, str]:
    match = re.fullmatch(r"9618_([sw])(\d{2})_qp_([12])([123])\.pdf", path.name)
    if not match:
        raise ValueError(f"Unsupported question-paper filename: {path.name}")
    series_code, year_short, paper_text, variant = match.groups()
    series = "May/June" if series_code == "s" else "Oct/Nov"
    year = 2000 + int(year_short)
    paper = int(paper_text)
    reference = f"9618/{paper}{variant}/{series_code.upper()}/{year_short}"
    return reference, year, paper, variant, series


def largest_remainder_allocations(section_stats: dict[int, dict], requirement_counts: dict[int, int]) -> dict[int, int]:
    result: dict[int, int] = {}
    for paper, sections in ((1, range(1, 9)), (2, range(9, 13))):
        section_list = list(sections)
        base = 2
        remaining = 44 - base * len(section_list)
        total_requirements = sum(requirement_counts[section] for section in section_list)
        total_appearances = sum(section_stats[section]["paperAppearances"] for section in section_list) or 1
        total_marks = sum(section_stats[section]["marks"] for section in section_list) or 1
        raw = {}
        for section in section_list:
            score = (
                0.50 * requirement_counts[section] / total_requirements
                + 0.25 * section_stats[section]["paperAppearances"] / total_appearances
                + 0.25 * section_stats[section]["marks"] / total_marks
            )
            raw[section] = base + remaining * score
            result[section] = math.floor(raw[section])
        missing = 44 - sum(result[section] for section in section_list)
        order = sorted(section_list, key=lambda section: (-(raw[section] - math.floor(raw[section])), section))
        for section in order[:missing]:
            result[section] += 1
    return result


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--source-dir", type=Path, required=True)
    parser.add_argument("--syllabus-contract", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    args = parser.parse_args()

    syllabus = json.loads(args.syllabus_contract.read_text())
    requirements = syllabus["requirements"]
    for requirement in requirements:
        requirement["_tokens"] = requirement_terms(requirement)
    document_frequency = collections.Counter(
        token for requirement in requirements for token in requirement["_tokens"]
    )
    token_idf = {
        token: math.log((1 + len(requirements)) / (1 + count)) + 1
        for token, count in document_frequency.items()
    }

    question_papers = sorted(args.source_dir.rglob("9618_*_qp_[12][123].pdf"))
    mark_schemes = sorted(args.source_dir.rglob("9618_*_ms_[12][123].pdf"))
    if len(question_papers) != 36 or len(mark_schemes) != 36:
        raise SystemExit(f"Expected 36 question papers and 36 mark schemes; found {len(question_papers)} and {len(mark_schemes)}")

    ms_names = {path.name for path in mark_schemes}
    entries = []
    paper_totals = []
    section_stats = {section: {"marks": 0, "paperAppearances": 0, "questionParts": 0} for section in range(1, 13)}
    section_papers = {section: set() for section in range(1, 13)}

    for pdf_path in question_papers:
        reference, year, paper, variant, series = paper_metadata(pdf_path)
        expected_ms = pdf_path.name.replace("_qp_", "_ms_")
        if expected_ms not in ms_names:
            raise SystemExit(f"Missing mark scheme for {pdf_path.name}")
        rows = parse_subquestions(pdf_path)
        total_marks = sum(row["marks"] for row in rows)
        if total_marks != 75:
            raise SystemExit(f"{pdf_path.name}: parsed {total_marks} marks, expected 75")
        paper_totals.append({"reference": reference, "marks": total_marks, "parts": len(rows)})
        for index, row in enumerate(rows, start=1):
            text = row.pop("_text")
            prompt = row.pop("_prompt")
            command = classify_command(prompt)
            question_type = classify_question_type(command, prompt)
            section = classify_section(text, paper, requirements, token_idf)
            primary, secondary = classify_requirements(text, section, requirements, token_idf)
            source_ref = f"{reference} Q{row['question']}{row['part']}"
            entry = {
                "id": f"PP-{year}-{series.replace('/', '')}-{paper}{variant}-{index:02d}",
                "sourceRef": source_ref,
                "year": year,
                "series": series,
                "paper": paper,
                "variant": int(variant),
                "question": row["question"],
                "part": row["part"],
                "marks": row["marks"],
                "commandWord": command,
                "questionType": question_type,
                "primaryRequirement": primary,
                "secondaryRequirements": secondary,
                "section": section,
            }
            entries.append(entry)
            section_stats[section]["marks"] += row["marks"]
            section_stats[section]["questionParts"] += 1
            section_papers[section].add(reference)

    for section in range(1, 13):
        section_stats[section]["paperAppearances"] = len(section_papers[section])

    paper_mark_totals = {
        str(paper): sum(entry["marks"] for entry in entries if entry["paper"] == paper)
        for paper in (1, 2)
    }
    if paper_mark_totals != {"1": 1350, "2": 1350}:
        raise SystemExit(f"Unexpected paper mark totals: {paper_mark_totals}")

    requirement_counts = collections.Counter(requirement["section"] for requirement in requirements)
    allocations = largest_remainder_allocations(section_stats, requirement_counts)

    manifest = []
    for path in question_papers + mark_schemes:
        manifest.append({
            "filename": path.name,
            "kind": "question-paper" if "_qp_" in path.name else "mark-scheme",
            "sha256": hashlib.sha256(path.read_bytes()).hexdigest(),
        })

    output = {
        "schemaVersion": 1,
        "source": {
            "description": "Teacher-owned Cambridge 9618 papers read outside the public repository",
            "window": "2023-2025 May/June and Oct/Nov",
            "questionPapers": len(question_papers),
            "markSchemes": len(mark_schemes),
            "copyrightPolicy": "No question or mark-scheme wording is stored in this contract.",
        },
        "totals": {
            "paper1Marks": paper_mark_totals["1"],
            "paper2Marks": paper_mark_totals["2"],
            "totalMarks": sum(paper_mark_totals.values()),
            "questionParts": len(entries),
        },
        "sectionStatistics": {str(section): section_stats[section] for section in range(1, 13)},
        "lessonAllocation": {
            "paper1TeachingLessons": 44,
            "paper2TeachingLessons": 44,
            "paper1ReviewLesson": 45,
            "paper2ReviewLesson": 90,
            "sections": {str(section): allocations[section] for section in range(1, 13)},
            "formula": "minimum 2 per section; remaining lessons use 50% syllabus breadth, 25% distinct-paper appearances and 25% marks; largest remainder; official section order breaks ties",
        },
        "paperTotals": paper_totals,
        "entries": entries,
        "sourceManifest": manifest,
    }
    args.output.write_text(json.dumps(output, indent=2, ensure_ascii=True) + "\n")
    print(json.dumps({
        "questionPapers": len(question_papers),
        "markSchemes": len(mark_schemes),
        "entries": len(entries),
        "paperMarks": paper_mark_totals,
        "lessonAllocation": allocations,
    }, indent=2))


if __name__ == "__main__":
    main()
