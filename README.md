# AS9618 Computer Science 2027–2029 — visual teaching course V3

This repository contains an AS Level-only course for Cambridge International Computer Science 9618, syllabus years 2027–2029.

The active V3 curriculum contains 91 teaching lessons and two integrated reviews in official Sections 1–12 order. Lesson numbers are content units, not fixed-duration promises. Every page is designed both for direct classroom explanation and independent study.

Official qualification page: <https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/>

## Active course design

- Target: AS Level only.
- Structure: 93 numbered pages: 91 teaching lessons and two integrated reviews.
- Sequence: Cambridge syllabus Sections 1-12.
- Lesson flow: guiding question → default-visible knowledge explanation and adjacent materials → retrieval/application/exam practice → copyright-safe past-paper analysis → lesson-specific summary.
- Materials: comparison tables, numbered mechanisms, complete code/state traces, reviewed technical visuals and academically styled analogy scenes.
- Practice: every atomic objective is explicitly mapped to at least one question; answers remain collapsed by default.
- Assessment Bank: 12 cumulative section checks and two original 75-mark paper mocks.
- Coverage: all 121 syllabus requirements have direct teaching and practice evidence.
- Exam language: Cambridge pseudocode is the standard; Java is supporting material only.
- Copyright boundary: the public repository stores past-paper indexes and statistics, never Cambridge question or mark-scheme wording.
- Visual audit: all 93 pages are captured and checked at 1440px and 390px, with per-section contact sheets and a 589-row objective/material/practice ledger.

The previous 90-lesson V2 site remains in `web/lesson-*` for compatibility and historical validation. V3 is the active teaching surface under `web/course-v3/`.

## Teaching a lesson

Start with the guiding problem, then teach each knowledge unit in order. Explanations and materials are kept adjacent: comparisons use tables, mechanisms use numbered steps, and programming topics use complete code and traces. Students then complete retrieval, application and exam-style practice before studying the mark logic in the original equivalent past-paper task. Chinese teacher prompts and answers are collapsed; required student teaching is visible by default.

## Repository structure

- `course-v3-map.md`: official-order allocation and the complete 93-page V3 sequence.
- `web/course-v3/`: active visual course, section indexes and lesson navigation.
- `scripts/course-v3-content.mjs`: human-reviewed structured teaching source.
- `scripts/course-v3-contract.json`: generated objective/material/practice ownership contract.
- `scripts/course-v3-section-anchor-assets.json`: ImageGen prompt, provenance, review and SHA-256 manifest.
- `audits/course-v3-objective-material-ledger.csv`: 589 atomic-objective evidence rows.
- `audits/course-v3-visual-evidence/`: 186 lesson screenshots, 26 index reviews and 24 section contact sheets.
- `audits/course-v3-whole-course-visual-audit.md`: human-readable visual-audit index.
- `assessments/assessment-bank.md`: 12 section checks and two paper mocks.
- `scripts/course-v2-content.json`: retained V2 compatibility contract.
- `scripts/course-v2-coverage-contract.json`: retained V2 coverage evidence.
- `scripts/question-bank-contract.json`: original question metadata and semantic fingerprints.
- `scripts/past-paper-frequency-contract.json`: copyright-safe frequency metadata for 36 papers and 36 mark schemes.
- `scripts/course-v2-migration.json`: complete 151→90 migration registry.
- `audits/course-v2-redundancy-and-migration-report.md`: plain-language redundancy findings and consolidation result.
- `audits/`: previous Stage audit files retained as historical evidence; they are not the active V2 acceptance standard.
- `dist/`: reproducible ZIP and SHA-256 outputs; ignored by Git.

## Local web version

Run from the repository root:

```bash
python3 -m http.server 8769 --directory web
```

Then open:

- Active V3 course: <http://127.0.0.1:8769/course-v3/>
- Legacy V2 index: <http://127.0.0.1:8769/>
- Assessment Bank: <http://127.0.0.1:8769/assessments/>
- Resource centre: <http://127.0.0.1:8769/resources/>
- Example V3 lesson: <http://127.0.0.1:8769/course-v3/lesson-006/>

At 390px mobile width, wide technical visuals and tables keep their readable canvas inside a local horizontal scroller; the page itself does not overflow horizontally.

## Regeneration

Regenerate the active V3 HTML, contract and audit indexes:

```bash
node scripts/render-course-v3.mjs
node scripts/generate-course-v3-audit.mjs
node scripts/verify-course-v3.mjs --self-test
node scripts/verify-course-v3-audit.mjs
```

To refresh the frequency contract from teacher-owned PDFs outside the repository:

```bash
python3 tools/extract_past_paper_frequency.py \
  --source-dir "/Users/kw/Documents/Teaching/AS CS 9618/past-papers" \
  --syllabus-contract scripts/syllabus-coverage-contract.json \
  --output scripts/past-paper-frequency-contract.json
```

Only references, marks, command words, question types and syllabus tags are written to the repository.

## Verification and release build

Run the complete compatibility and V3 acceptance workflow:

```bash
node scripts/verify-all.mjs
```

This verifies the retained V2 compatibility surface and the active V3 course: official order, 121-requirement coverage, 589 objective mappings, teaching-material contracts, known regression cases, reviewed assets, generation idempotency, 186 passing lesson viewport reviews, 26 passing index reviews, 24 contact sheets and public copyright boundaries. It also builds and verifies the retained V2 release archive:

```text
dist/AS9618-CS-2027-2029-v2.0.0.zip
dist/AS9618-CS-2027-2029-v2.0.0.zip.sha256
```

No remote publication is performed by any build or verification command.
