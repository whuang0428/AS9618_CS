# Stage 4 Assessment Audit

Audit date: 21 July 2026

## Scope

Stage 4 delivers the complete formative and checkpoint assessment bank for the 150-lesson AS9618 course. Questions are original Cambridge-style practice; they do not reproduce Cambridge past-paper questions. Official Cambridge syllabus and past-paper mark schemes remain the authority for final syllabus interpretation and wording calibration.

## Acceptance Matrix

| Requirement | Delivered evidence | Status |
|---|---|---|
| 30 short quizzes | Lessons 005-150 at five-lesson intervals; each quiz contains five 2-mark questions and totals 10 marks | Pass |
| Complete quiz lesson mapping | Quiz source references cover Lessons 001-150 exactly once and in course order | Pass |
| 7 monthly checkpoints | Lessons 020, 040, 060, 080, 100, 120 and 140; each contains five questions, totals 30 marks and is timed for 40 minutes | Pass |
| 14 stage reviews | Each review totals 20 marks: retrieval [6], error correction [4] and timed exam practice [10] | Pass |
| Paper 1 assessment objectives | Paper 1 material identifies AO1 knowledge/understanding and AO2 application | Pass |
| Paper 2 assessment objectives | Paper 2 material identifies AO2 application and AO3 design/evaluation; the transition checkpoint includes all relevant objectives | Pass |
| Complete marking support | Every assessment question has point-based marking guidance using B1, M1 or A1 as appropriate | Pass |
| Web delivery | All 51 assessments appear as filterable cards with local answer, correction or mark-scheme disclosure controls | Pass |
| Markdown/web parity | Automated checks confirm that every prompt and every marking point appears in both outputs | Pass |
| Navigation | The course home page links to both the assessment bank and the resource centre | Pass |

## Automated Verification

Run from the repository root:

```bash
node --check scripts/stage4-quizzes-data.mjs
node --check scripts/stage3-assessments-data.mjs
node --check scripts/generate-assessments.mjs
node --check scripts/generate-resource-hub.mjs
node --check scripts/verify-assessments.mjs
node scripts/verify-assessments.mjs
```

The verifier checks counts, totals, timing labels, source-lesson mapping, Sections 1-12 coverage, assessment objectives, valid point labels, unique question prompts, command-word variety, Markdown/web parity, navigation and resource-hub presence.

Expected summary:

```text
Stage 4 assessment verification passed: 30 quizzes covering Lessons 001-150, 7 x 30-mark monthly assessments, 14 x 20-mark stage reviews, 213 unique exam questions, and matching Markdown/web MS content.
```

## Browser Verification

The assessment and resource pages were tested at desktop and mobile widths. The checks covered:

- home-page links to Assessments and Resources;
- 51 assessment cards and correct 30/7/14 filter results;
- 10-mark quiz, 30-mark monthly and 20-mark review totals;
- independent answer, correction and MS disclosure controls;
- four resource documents and rendered glossary tables;
- no horizontal overflow at the tested widths;
- no browser console errors.

## Mark-Scheme Boundary

The marking guidance is designed to resemble Cambridge's concise, positive, point-based style. It is not an official Cambridge mark scheme. Where an official past paper is used for classroom calibration, its published mark scheme takes precedence over this course bank.
