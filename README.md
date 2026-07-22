# AS9618 Computer Science 2027-2029 AS Lesson Plans

This repository contains the completed eight-stage teaching and self-study course pack for Cambridge International AS Level Computer Science 9618, syllabus years 2027-2029.

Official qualification page: <https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/>

Syllabus reference used for this pack: Cambridge International AS & A Level Computer Science 9618 syllabus for examination in 2027, 2028 and 2029, Version 2.

## Project Status

All 150 lesson numbers have both a teacher-facing Markdown plan and an interactive webpage. The requirement-level syllabus audit maps all 121 AS requirements to direct teaching and assessment evidence. The assessment bank provides 30 ten-mark quizzes, 7 thirty-mark monthly checkpoints and 14 twenty-mark stage reviews. Stage 5 reviewed and approved all 963 exam-style mark schemes (750 lesson questions and 213 assessment questions); 295 questions in System Software, Security, Ethics and Databases received a specialist second review. Stage 6 completed desktop and mobile full-page QA for all 150 lessons plus the course, assessment and resource hubs. Stage 7 completed keyboard, semantic, contrast and bilingual-language accessibility QA for the same 153 pages. Final Stage 8 provides a versioned, checksummed and source-matched offline release with unified Stage 2-8 verification.

## Course Design

- Target: AS Level only.
- Papers: Paper 1, Sections 1-8; Paper 2, Sections 9-12.
- Length: 150 lessons, 45 minutes each.
- Orientation-only lessons are not included; Lesson 001 starts with syllabus content.
- Included: stage review, short quizzes, monthly assessments, marking guidance.
- Excluded: school midterm and final examinations.
- Language style: English first, Chinese support for difficult concepts.
- Programming approach: Cambridge pseudocode is the exam standard; Java is used only as a supporting implementation language.

## Folder Structure

- `course-map.md`: syllabus mapping, pacing, and assessment rhythm.
- `syllabus-audit.md`: requirement-level coverage evidence, gaps, and fixed repair targets.
- `stage4-assessment-audit.md`: Stage 4 assessment acceptance criteria and verification evidence.
- `audits/`: Stage 5 question-level approvals, Stage 6 visual QA, Stage 7 accessibility and Stage 8 release evidence.
- `lessons/`: 150 generated lesson plans undergoing syllabus coverage and content-quality review.
- `assessments/`: 51 topic-specific assessment items: 30 quizzes, 7 monthly checkpoints and 14 stage reviews, all with answer keys/MS.
- `resources/`: glossary, pseudocode-Java guide, misconception bank, and Cambridge-style MS conventions.
- `web/`: 150 independent teaching/self-study lesson webpages, a searchable course index, and the interactive assessment bank.
- `release/`: final release metadata and handover notes.
- `dist/`: generated final ZIP and SHA-256 sidecar; ignored because they are reproducible build outputs.

## How To Use

1. Start with `course-map.md` to see the full pacing plan, then use `syllabus-audit.md` to check current coverage status.
2. Teach lessons in numerical order unless your school timetable requires rearrangement.
3. Use the mini-quiz inside each lesson for retrieval practice.
4. Use `assessments/quizzes.md` every 4-5 lessons, `assessments/monthly-assessments.md` roughly every 18-20 lessons, and `assessments/stage-reviews.md` at the mapped review points.
5. For Paper 2, keep reminding students that Java examples are practice scaffolds, not Cambridge pseudocode answers.
6. Apply `resources/cambridge-ms-conventions.md` when marking original course questions; use current official Cambridge papers for final wording calibration.

## Web Version

Run a local static server from the project root:

```bash
python3 -m http.server 8769 --directory web
```

Then open:

- Course web index: <http://127.0.0.1:8769/>
- Interactive assessment bank: <http://127.0.0.1:8769/assessments/>
- Resource centre: <http://127.0.0.1:8769/resources/>
- Example lesson: <http://127.0.0.1:8769/lesson-001/>

Each webpage is self-contained in its own `web/lesson-XXX/` folder and uses local answer/MS toggles rather than a global student/teacher view.

## Verification

```bash
node scripts/verify-stage2.mjs
node scripts/verify-assessments.mjs
node scripts/verify-lesson-mark-schemes.mjs
node scripts/verify-stage5-mark-schemes.mjs
node scripts/verify-stage6-qa.mjs
node scripts/verify-stage7-accessibility.mjs
python3 scripts/build-stage8-release.py
node scripts/verify-stage8-release.mjs
```

For the complete final acceptance workflow, run:

```bash
node scripts/verify-all.mjs
```

This runs every Stage 2-7 verifier, builds `dist/AS9618-CS-2027-2029-v1.0.0.zip`, verifies its sidecar and internal SHA-256 manifests, checks source parity and validates the packaged course inventory. Regenerate an approval register only after repeating the corresponding review.

## Generated Lesson Count

Total lessons generated: 150
