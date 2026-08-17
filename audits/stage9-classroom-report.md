# Stage 9 Classroom Delivery Report

## Scope

Stage 9 makes the shared website teacher-led without removing the complete student revision experience. It adds an opt-in presentation mode, a fixed teacher toolbar, audited delivery metadata, combined Assessment Bank filters and a static course catalogue.

## Acceptance Matrix

| Requirement | Evidence | Status |
|---|---|---|
| Static course catalogue | 150 entries generated from lesson `h1` titles; homepage performs no lesson-page fetch | Pass |
| Delivery classification | all 2,383 direct lesson sections have a role, classroom activity and stable group in `stage9-classroom-delivery-register.csv` | Pass |
| Classroom Mode | one active delivery group, optional-content control, closed disclosures, projection styling and keyboard navigation | Pass |
| Teacher toolbar | previous/next lesson boundaries, current lesson identity, quick jumps, full screen and Assessment Bank link | Pass |
| Assessment filters | type, Paper, Section, AO coverage, command word and mark range with AND behaviour, result count and reset | Pass |
| Metadata integrity | 51 assessment records and 213 question records validated against maintained command words | Pass |
| Regression suite | Stage 9 verifier is included in the unified Stage 2-9 workflow | Pass |

## Browser Acceptance

- Homepage, Lesson 001 and the Assessment Bank passed at 1440×810; Lessons 035, 041, 052, 098 and 150 passed at 1366×768.
- Lesson 017 passed Classroom Mode layout at 390×844 with no horizontal overflow and all persistent toolbar controls visible.
- The browser request log for the homepage contained the static catalogue and shared assets, with no `lesson-XXX` requests.
- Searching for `peer-to-peer` returned the real Lesson 017 title. Course Map opened only on request.
- Classroom entry, keyboard next-item navigation, answer reveal, optional-content inclusion, full screen, exit and remembered mode were exercised without console warnings or errors.
- Combined quiz/Paper/AO/command/mark filters returned 10 assessments and 19 questions; the empty state and reset flow also passed.
- The automated browser walkthrough from Course home through search to Lesson 017 completed in 0.138 seconds, below the 10-second acceptance threshold.

## Delivery Notes

- Normal revision mode remains the first-visit default; the browser remembers an explicit Classroom Mode choice.
- AO filtering is assessment-level coverage because the source bank does not claim question-level AO metadata.
- Section timings are not generated. A timing appears only when a reviewed override supplies one.
- P1 extensions such as prerequisite graphs, random questions and answer-quality comparisons remain outside this stage.
