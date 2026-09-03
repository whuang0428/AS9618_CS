# AS9618 Computer Science 2027–2029 — visual teaching course

This repository contains an AS Level-only course for Cambridge International Computer Science 9618, syllabus years 2027–2029.

The active curriculum contains 91 teaching lessons and two integrated reviews in official Sections 1–12 order. Lesson numbers are content units, not fixed-duration promises. Every page is designed both for direct classroom explanation and independent study.

Official qualification page: <https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/>

## Active course design

- Target: AS Level only.
- Structure: 93 numbered pages: 91 teaching lessons and two integrated reviews.
- Sequence: Cambridge syllabus Sections 1-12.
- Lesson flow: lesson title and objectives → concept-specific teaching units in pedagogical order → practice questions → original exam-style questions and marking points → summary.
- Materials: each teaching unit explains one coherent concept. Visuals, methods and worked examples are used where they clarify that concept; unrelated syllabus terms must not be bundled into the same core explanation.
- Practice: every atomic objective is explicitly mapped to at least one question; all 329 questions store and display an explicit Cambridge command word, while answers remain collapsed by default. Every course page also provides at least three original exam-style questions with separate marking points.
- Assessment Bank: 12 cumulative section checks and two original 75-mark paper mocks.
- Coverage: all 121 syllabus requirements have direct teaching and practice evidence.
- Exam language: Cambridge pseudocode is the standard; Java is supporting material only.
- Copyright boundary: the public repository stores past-paper indexes and statistics, never Cambridge question or mark-scheme wording.

`web/index.html` is the student gateway. It links to the 93-page course, Assessment Bank and Resources. The `web/lesson-*` compatibility entries preserve older incoming links without defining current lesson content.

## Teaching a lesson

Start with the lesson objectives, then teach each knowledge unit in order. The lead visual is always shown before the core explanation. Comparisons use tables, processes use numbered steps, and programming topics use complete code and traces. Students then answer questions whose Cambridge command word and marks are explicit before checking separate marking points.

## Repository structure

- `course-v3-map.md`: official-order allocation and the complete 93-page sequence.
- `web/course-v3/`: active visual course, section indexes and lesson navigation.
- `scripts/course-v3-content.mjs`: structured teaching source.
- `scripts/course-v3-contract.json`: generated objective/material/practice ownership contract.
- `scripts/course-v3-section-anchor-assets.json`: section-anchor asset and SHA-256 manifest.
- `scripts/course-v3-knowledge-diagrams.mjs`: knowledge-unit visual mapping and alternative text.
- `assessments/assessment-bank.md`: 12 section checks and two paper mocks.
- `scripts/course-v2-content.json`: source material still used by lessons that have not yet moved to dedicated V3 models.
- `scripts/question-bank-contract.json`: original question metadata and semantic fingerprints.
- `scripts/past-paper-frequency-contract.json`: copyright-safe frequency metadata for 36 papers and 36 mark schemes.
- `scripts/course-v2-migration.json`: compatibility-route mapping.
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

Regenerate the active HTML and compatibility entries, then verify the current course:

```bash
node scripts/render-course-v3.mjs
node scripts/verify-course-v3.mjs --self-test
node scripts/verify-course-v3-idempotency.mjs
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

Build and verify the current offline release:

```bash
node scripts/render-course-v3.mjs
node scripts/verify-course-v3.mjs --self-test
node scripts/verify-course-v3-idempotency.mjs
python3 scripts/build-course-release.py
python3 scripts/verify-course-release.py
```

These commands verify the current generated course, content contract, compatibility routes, generation idempotency and release archive without consulting historical audit records.

```text
dist/AS9618-CS-2027-2029-course.zip
dist/AS9618-CS-2027-2029-course.zip.sha256
```

No remote publication is performed by any build or verification command.
