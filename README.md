# AS9618 Computer Science 2027–2029 — visual teaching course

This repository contains an AS Level-only course for Cambridge International Computer Science 9618, syllabus years 2027–2029.

The active curriculum contains 91 teaching lessons and two integrated reviews in official Sections 1–12 order. Lesson numbers are content units, not fixed-duration promises. Every page is designed both for direct classroom explanation and independent study.

Official qualification page: <https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/>

## Active course design

- Target: AS Level only.
- Structure: 93 numbered pages: 91 teaching lessons and two integrated reviews.
- Sequence: Cambridge syllabus Sections 1-12.
- Lesson flow: lesson title and objectives → visual overview → core explanation → any required method or worked example → common misconception → practice questions → original exam-style question and marking points → summary.
- Materials: every knowledge unit has exactly one lead visual. A method appears only for a genuine calculation, operation, algorithm or physical process; a worked example uses concrete data, state, code or a scenario.
- Practice: every atomic objective is explicitly mapped to at least one question; all 329 questions store and display an explicit Cambridge command word, while answers remain collapsed by default.
- Assessment Bank: 12 cumulative section checks and two original 75-mark paper mocks.
- Coverage: all 121 syllabus requirements have direct teaching and practice evidence.
- Exam language: Cambridge pseudocode is the standard; Java is supporting material only.
- Copyright boundary: the public repository stores past-paper indexes and statistics, never Cambridge question or mark-scheme wording.
- Visual audit: all 93 pages are captured and checked at 1440px and 390px, with per-section contact sheets, a 589-row objective/material/practice ledger and a 145-unit role/deduplication audit.

`web/index.html` is the only student gateway. It links to the 93-page course, Assessment Bank and Resources. Each of the 151 historical `web/lesson-*` URLs is now a compatibility entry: it either redirects to one current lesson or lists every successor when a lesson was split. Historical JSON, Markdown and migration records remain available for internal validation but are not rendered as lessons.

## Teaching a lesson

Start with the lesson objectives, then teach each knowledge unit in order. The lead visual is always shown before the core explanation. Comparisons use tables, processes use numbered steps, and programming topics use complete code and traces. Students then answer questions whose Cambridge command word and marks are explicit before checking separate marking points.

## Repository structure

- `course-v3-map.md`: official-order allocation and the complete 93-page sequence.
- `web/course-v3/`: active visual course, section indexes and lesson navigation.
- `scripts/course-v3-content.mjs`: human-reviewed structured teaching source.
- `scripts/course-v3-contract.json`: generated objective/material/practice ownership contract.
- `scripts/course-v3-section-anchor-assets.json`: ImageGen prompt, provenance, review and SHA-256 manifest.
- `audits/course-v3-objective-material-ledger.csv`: 589 atomic-objective evidence rows.
- `audits/course-v3-knowledge-unit-role-audit.csv`: role and duplicate status for all 145 teaching knowledge units.
- `audits/course-v3-visual-evidence/`: 186 lesson screenshots, 26 index reviews and 24 section contact sheets.
- `audits/course-v3-whole-course-visual-audit.md`: human-readable visual-audit index.
- `assessments/assessment-bank.md`: 12 section checks and two paper mocks.
- `scripts/course-v2-content.json`: retained historical content contract.
- `scripts/course-v2-coverage-contract.json`: retained historical coverage evidence.
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

- Student gateway: <http://127.0.0.1:8769/>
- Visual course: <http://127.0.0.1:8769/course-v3/>
- Assessment Bank: <http://127.0.0.1:8769/assessments/>
- Resource centre: <http://127.0.0.1:8769/resources/>
- Example lesson: <http://127.0.0.1:8769/course-v3/lesson-006/>

At 390px mobile width, wide technical visuals and tables keep their readable canvas inside a local horizontal scroller; the page itself does not overflow horizontally.

## Regeneration

Regenerate the active HTML, schema-version-4 contract, compatibility entries and audit indexes:

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

Run the complete compatibility and active-course acceptance workflow:

```bash
node scripts/verify-all.mjs
```

This verifies the retained historical source records and the single active course: official order, 121-requirement coverage, 589 objective mappings, 145 knowledge-unit roles, 329 Cambridge command words, 151 compatibility entries, generation idempotency, 186 passing lesson viewport reviews, 26 passing index reviews, 24 contact sheets and public copyright boundaries. It also builds and verifies the active-course release archive:

```text
dist/AS9618-CS-2027-2029-course.zip
dist/AS9618-CS-2027-2029-course.zip.sha256
```

No remote publication is performed by any build or verification command.
