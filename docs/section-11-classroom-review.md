# Section 11 classroom review

## Scope and teaching decisions

Section 11 continues the school booking system introduced in Section 10. Learners have studied Sections 9 and 10, but every concept recalls the foundation needed at that point. Student-facing content is English, with complete explanations for independent reading. Cambridge terminology and mark schemes guide precision; teacher explanations retain the intermediate reasoning.

The recommended route follows learning prerequisites across the twelve stable Lessons 072–083. Declarations, assignment and expressions precede selection and iteration; translating a complete design follows those constructs. Each concept begins with concrete material, explains the idea, works through an example, offers a short teacher-written check and places original paper questions after their prerequisites. Classroom and Full reading use the same authored content.

This change is local. It does not include a commit, push or deployment. The working directory already contained extensive uncommitted work when the task began. A file-hash baseline was saved before implementation, and generation uses the Section 11 scope.

## Official sources and terminology

Checked on 30 September 2026 against the [Cambridge 9618 subject page](https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/), the [2027–2029 syllabus, Version 2](https://www.cambridgeinternational.org/Images/721397-2027-2029-syllabus.pdf), printed pages 29–30, and the [2027–2029 pseudocode guide](https://www.cambridgeinternational.org/Images/721401-2027-2029-pseudocode-guide.pdf).

Official Section 11 contains 11.1 Programming Basics, 11.2 Constructs and 11.3 Structured Programming. The project's nine S11.01–S11.09 identifiers split these into 29 checkable objectives; they are not additional official subsection numbers.

The teaching uses assignment rather than mathematical equality; explicit initialisation; literal constant declarations; complete Boolean expressions; inclusive FOR bounds and integer STEP; WHILE without DO; REPEAT ending on TRUE; CASE clauses checked in order; CALL for procedures; and a function's returned value replacing its call in an expression. Functions use value parameters. Supplied string interfaces are stated explicitly, including differences between historical examination inserts and a classroom example. Numerical random examples distinguish a possible draw from a guaranteed result.

## Original paper verification

All twelve existing paper groups E086–E097 are retained: 17 selected parts, 61 marks. Their 16 unique QP/MS PDFs were found in the local teaching archive and matched their registered SHA-256 identities. All 39 published QP, MS and insert images matched their registered hashes. Necessary insert PDFs were read from the existing project review folder. Every selected question and marking extract was read; complex flowchart, nested-loop and loan-record images were also visually inspected.

The original crops and source registrations are unchanged. Question, hint, teacher reasoning and official MS remain separate. Self-authored checks and consolidation are labelled teacher-written. Coverage notes distinguish the specific skill assessed from related skills taught elsewhere.

| Group | Original source | Selected parts | Marks | Placement requirement |
| --- | --- | --- | ---: | --- |
| E086 | 9618/23, Oct/Nov 2024 | 2(a) | 5 | Positive conditional accumulation and complete design translation; reused from S9 as consolidation. |
| E087 | 9618/22, May/June 2023 | 1(a)(i–ii) | 4 | Named constants and their maintenance benefits; explain the supplied conditional code before the attempt. |
| E088 | 9618/21, May/June 2023 | 1(c)(i–ii) | 3 | MOD, Boolean operators and general equivalence. |
| E089 | 9618/21, May/June 2024 | 1(b) | 4 | Supplied string functions, concatenation and expressions; follow the original TO_LOWER interface. |
| E090 | 9618/21, Oct/Nov 2023 | 1(b–c) | 4 | Ordered CASE selection and complete coverage of the possible values. |
| E091 | 9618/22, Oct/Nov 2025 | 4(a–b) | 9 | FOR STEP and nested loops, with a Boolean-array refresher. |
| E092 | 9618/22, Oct/Nov 2025 | 2 | 5 | Sentinel plus capacity termination, array indexing and flowchart paths. |
| E093 | 9618/22, Oct/Nov 2023 | 2(b) | 2 | Loop selection justified from an unknown input count and a stopping value. |
| E094 | 9618/22, May/June 2023 | 5(a–b) | 4 | Reference passing, effects on the caller and valid syntax versus incorrect design. |
| E095 | 9618/22, May/June 2023 | 4 | 6 | Function definition, supplied string interfaces, traversal and return after counting. |
| E096 | 9618/22, Oct/Nov 2025 | 8(b) | 7 | Record-array refresher, Boolean return paths and efficient early termination. |
| E097 | 9618/21, May/June 2025 | 3 | 8 | Complete program using a bounded random integer, conditional iteration and feedback. |

E092 asks for a flowchart, so it supports control reasoning and representation; it is not direct evidence that a learner can write a WHILE statement. E096 explicitly asks for efficient pseudocode, and its MS awards early termination; it provides direct evidence for that efficiency technique. E094 includes one mark for explaining why syntactically valid code can still be wrong. Not every isolated objective has a separate original paper part: local checks cover the remaining details without inventing provenance.

## Image and experiment provenance

The opening image, `web/assets/course-v3/section-11/booking-program-scene.png`, was generated with the built-in ImageGen tool. The exact prompt, generation date, inspection note, dimensions and SHA-256 are stored in `scripts/course-v3-section11-classroom-images.json`. It illustrates request cards, a laptop, seat tokens and a confirmation printer. All exact data, code and labels remain accessible HTML rather than image-generated text.

Experiments are local, deterministic teaching models for the displayed programs. They calculate traces from supported inputs; they are not a general pseudocode compiler. Code, active statements, variables, output and explanatory feedback are connected. Preparation makes a new trace; previous/next and reset make the state inspectable. Model input limits prevent unbounded execution and invalid access.

## Build and preview

```bash
node scripts/render-course-v3.mjs --section11
node --test scripts/course-v3-section11-classroom.test.mjs scripts/course-v3-section11-models.test.cjs
python3 -m http.server 8769 --directory web
```

Open `/course-v3/section-11/`. The scoped rebuild updates only Lessons 072–083, the Section 11 overview, local Section 11 assets and Section 11 entries in the course contract. Shared classroom infrastructure is reused without changing other sections.

The active sources are `course-v3-section11-journey.mjs`, the Section 11 classroom renderer/controller/styles and the models/labs modules in `scripts/`. Retained base units, complete programs and source questions remain available in the existing Section 11 source modules.

## Delivered learning route

The rebuilt chapter has 40 concept groups, 14 working experiments and 26 suggested 45-minute sessions. All 31 original unit keys and 29 internal learning objectives remain mapped. The overview contains the complete session plan and links to every concept; the order deliberately differs from numerical lesson order.

| Learning module | Concepts | Suggested sessions |
| --- | ---: | --- |
| Start with one booking | 4 | 1–2 |
| Calculate and decide | 7 | 3–6 |
| Repeat known and unknown work | 10 | 7–13 |
| Implement the supplied design | 2 | 14–15 |
| Use supplied numeric and string routines | 4 | 16–17 |
| Define actions and returned results | 7 | 18–22 |
| Improve and complete the program | 6 | 23–26 |

The 14 experiments cover assignment, arithmetic, Boolean rules, selection, FOR, WHILE, REPEAT, nested loops, supplied string routines, procedures, parameter passing, returned values, invariant calculations and the complete booking program. Their setup controls are bounded teaching inputs. Arrays and records needed by existing papers receive short Section 10 refreshers before the attempt.

The final booking program combines `ValidSeats` with a `RecordBooking` procedure whose reference parameters update seat totals and group-booking counts. For attempts `0, 3, 7, 2, 4`, the two invalid values do not advance the accepted-booking loop or change its totals. Its final output is `9, 2`.

## Verification results

- Scoped generation completes successfully. The two Section 11 test files pass all 47 checks: 12 classroom/content tests, 16 original-PDF identity subtests and 19 execution-model tests.
- Browser review covers all twelve lesson pages in Classroom and Full reading at 1440×900, 1366×768, 1920×1080 and 390×844. There is no remaining whole-page horizontal overflow; wide code and source tables use local scrolling and enlargement. The 390px opening-material overflow and Full reading memory-table overflow found during review were corrected.
- Every experiment was exercised through its browser controls. Checks include forward/back/reset, changed-input preparation, invalid input feedback, zero-first sentinel termination, BYREF output 8 versus BYVAL output 5, RETURN before caller assignment and output, complete booking output `9, 2`, and unchanged receipt outputs with multiplication counts 3 versus 1.
- Classroom → Full reading → Classroom preserves the teaching cursor and execution progress. Returning through the header button and teaching from the current reading position have distinct, documented behaviour.
- Original paper answers start folded. The moved E092 bookmark leads to its new taught position, official MS can be revealed separately, Hide answers folds it again, and the paper extract enlarges. Code enlargement preserves the underlying execution state and stops arrow keys navigating the lesson behind it.
- Cross-page Previous/Next follows the prerequisite route. Mobile stage buttons remain at least 44px high and the active stage is brought into the horizontal navigation strip.
- At 1920×1080, the experiment step controls and current explanation remain pinned below the teaching toolbar while the code and working memory are viewed. A pointer click on the pinned Next button advanced the trace without moving the page.
- Source syntax checks passed for all 15 Section 11/generator JavaScript files; all five generated browser assets match their source bytes, and the scoped Git whitespace check passed.
- Console inspection found no warning/error entries during the reviewed flows. Shared classroom scripts and other chapters were not changed.
- All 1,396 pre-existing files recorded in the task baseline are still present. The only changed pre-existing files are README, the generator, the course contract, twelve Section 11 lesson pages and the Section 11 overview. Added files are confined to this chapter's sources, generated browser assets, illustration provenance and this review.

Physical HDMI output, the classroom display's browser and touch hardware were not available for testing. Browser viewport checks confirm layout and control behaviour; actual room-distance readability remains a classroom check. No remote publication was performed.
