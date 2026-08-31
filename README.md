# AS9618 Computer Science 2027-2029 — 90-lesson course

This repository contains an AS Level-only course for Cambridge International Computer Science 9618, syllabus years 2027-2029.

The active curriculum contains 90 lessons in official Section 1-12 order. Paper 1 and Paper 2 each contain 44 teaching lessons and one integrated review/error-diagnosis lesson. Lesson numbers are content units, not fixed-duration promises: every lesson is deliberately over-complete so a teacher can omit, teach briefly or explore material in depth.

Official qualification page: <https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/>

## Active course design

- Target: AS Level only.
- Structure: Paper 1 lessons 001-045; Paper 2 lessons 046-090.
- Sequence: Cambridge syllabus Sections 1-12.
- Teaching depth: `Quick`, `Full` and `Deep` routes on every lesson page.
- Lesson flow: prerequisite/diagnostic → point-level relationship maps, mechanisms and concrete cues → varied practice → summary and exam reminders.
- Practice: 272 original lesson questions, normally three per teaching lesson and four in each integrated review.
- Assessment Bank: 12 cumulative section checks and two original 75-mark paper mocks.
- Coverage: all 121 syllabus requirements have direct teaching and practice evidence.
- Exam language: Cambridge pseudocode is the standard; Java is supporting material only.
- Copyright boundary: the public repository stores past-paper indexes and statistics, never Cambridge question or mark-scheme wording.

The former Targeted Practice, Exam-style and fixed Homework columns are no longer active. Valuable explanations, examples and visuals were consolidated into one lesson flow. Old `/lesson-091/` to `/lesson-151/` routes are lightweight redirects to the corresponding new lessons.

## Teaching a lesson

Each page offers three routes:

- **Quick:** use the diagnostic, objectives, first worked example and foundation question.
- **Full:** teach every knowledge-point material set, the worked method and all questions.
- **Deep:** add prerequisite refreshers, connect the concept checklist, discuss the clearly labelled beyond-syllabus material and use the transfer task.

These are choices, not time limits. The lesson content is intentionally richer than a single fixed classroom slot.

## Repository structure

- `course-map.md`: evidence-based allocation and the complete 90-lesson sequence.
- `lessons/`: 90 active Markdown lesson plans.
- `web/`: searchable course index, 90 active pages, 61 legacy redirects, resources and Assessment Bank.
- `assessments/assessment-bank.md`: 12 section checks and two paper mocks.
- `scripts/course-v2-content.json`: the active lesson-content contract.
- `scripts/course-v2-coverage-contract.json`: 121-requirement active coverage evidence.
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

- Course index: <http://127.0.0.1:8769/>
- Assessment Bank: <http://127.0.0.1:8769/assessments/>
- Resource centre: <http://127.0.0.1:8769/resources/>
- Example lesson: <http://127.0.0.1:8769/lesson-001/>

At 390px mobile width, each infographic keeps a readable 720px canvas inside its own horizontal scroller. A collapsed text transcript remains available for accessibility and quick reference.

## Regeneration

The one-time course consolidation reads the former 151-lesson source from Git history and writes the active contracts:

```bash
node scripts/build-course-v2-content.mjs
node scripts/generate-course-v2-material-ownership.mjs
node scripts/generate-course-v2-knowledge-materials.mjs
node scripts/apply-course-v2-materials.mjs
node scripts/render-course-v2.mjs
node scripts/generate-course-v2-coverage.mjs
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

Run the active V2 acceptance workflow:

```bash
node scripts/verify-all.mjs
```

This verifies lesson count and order, 121-requirement teaching/practice coverage, 2700 past-paper marks, question and explanation de-duplication, flexible teaching depth, 142 lesson-specific knowledge-point material sets, the explicit 125-visual ownership register, Assessment Bank separation, redirects and public copyright boundaries. The material audit reports `WHOLE_COURSE_MATERIAL_PASS` only when all 88 teaching lessons and both integrated review lessons are complete. It then builds and verifies:

```text
dist/AS9618-CS-2027-2029-v2.0.0.zip
dist/AS9618-CS-2027-2029-v2.0.0.zip.sha256
```

No remote publication is performed by any build or verification command.
