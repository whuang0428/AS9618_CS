# AS9618 Computer Science 2027-2029 AS Lesson Plans

This repository contains the completed ten-stage classroom teaching and self-study course pack for Cambridge International AS Level Computer Science 9618, syllabus years 2027-2029.

Official qualification page: <https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/>

Syllabus reference used for this pack: Cambridge International AS & A Level Computer Science 9618 syllabus for examination in 2027, 2028 and 2029, Version 2.

## Project Status

All 150 lesson numbers have both a teacher-facing Markdown plan and an interactive webpage. The requirement-level syllabus audit maps all 121 AS requirements to direct teaching and assessment evidence. The assessment bank provides 30 ten-mark quizzes, 7 thirty-mark monthly checkpoints and 14 twenty-mark stage reviews. Stage 5 reviewed and approved all 963 exam-style mark schemes (750 lesson questions and 213 assessment questions); 295 questions in System Software, Security, Ethics and Databases received a specialist second review. Stage 6 completed desktop and mobile full-page QA for all 150 lessons plus the course, assessment and resource hubs. Stage 7 completed keyboard, semantic, contrast and bilingual-language accessibility QA for the same 153 pages. Stage 8 provides a versioned, checksummed and source-matched offline release. Stage 9 adds a fixed lesson toolbar, audited delivery metadata, teacher filters in the Assessment Bank and a static 150-lesson catalogue. Stage 10 adds 782 maintained academic infographics with source-grounded text alternatives across all 150 lessons.

The shared web version prioritises classroom teaching while preserving each complete lesson for student preview and revision. Every lesson provides `Course home`, previous/next lesson controls and section shortcuts without changing or hiding lesson content. The comprehensive visual register now tracks 968 diagrams and interactive visuals, including the 782 Stage 10 knowledge-point infographics. Automated checks cover structure, dimensions, file budgets and accessible transcripts; conceptual correctness remains subject to human semantic review.

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
- `audits/`: Stage 5 question-level approvals, Stage 6 visual QA, Stage 7 accessibility, Stage 8 release evidence and the Stage 9 classroom-delivery register.
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

Each lesson always displays the complete teaching and revision page. The lesson contents navigation is collapsed by default so the teaching content can use the full width; use `Show contents` to open it when needed. Use the fixed bottom toolbar to move between lessons, jump to Warm-up/Core/Practice/Exam/Homework or open the Assessment Bank.

If lesson HTML is regenerated, restore the shared course-home control with the idempotent command:

```bash
node scripts/apply-student-navigation.mjs
```

Then rebuild the static course catalogue, delivery metadata and lesson toolbar references:

```bash
node scripts/generate-course-catalog.mjs
node scripts/apply-classroom-delivery.mjs
```

Stage 10 visual explanations are maintained as explicit reviewed content and synchronised to lesson HTML and Markdown:

```bash
node scripts/apply-stage10-explanations.mjs
node scripts/apply-classroom-delivery.mjs
node scripts/generate-stage10-audits.mjs
```

Stage 10 now covers all 782 maintained explanation targets across all 150 lessons. Each target uses an academically styled ImageGen infographic grounded in the corresponding lesson facts, with a synchronised screen-reader transcript and matching Markdown record. The original ten-lesson pilot established the approved visual style; the full visual set remains subject to human semantic review because automated checks cannot prove conceptual correctness.

## Verification

```bash
node scripts/verify-student-navigation.mjs
node scripts/verify-educational-visuals.mjs
node scripts/verify-stage2.mjs
node scripts/verify-assessments.mjs
node scripts/verify-lesson-mark-schemes.mjs
node scripts/verify-stage5-mark-schemes.mjs
node scripts/verify-stage6-qa.mjs
node scripts/verify-stage7-accessibility.mjs
node scripts/verify-stage9-classroom.mjs
node scripts/verify-stage10.mjs
python3 scripts/build-stage8-release.py
node scripts/verify-stage8-release.mjs
```

For the complete final acceptance workflow, run:

```bash
node scripts/verify-all.mjs
```

This runs every Stage 2-10 verifier, builds `dist/AS9618-CS-2027-2029-v1.0.0.zip`, verifies its sidecar and internal SHA-256 manifests, checks source parity and validates the packaged course inventory. Regenerate an approval register only after repeating the corresponding review.

## Generated Lesson Count

Total lessons generated: 150
