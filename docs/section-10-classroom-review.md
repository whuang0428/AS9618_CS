# Section 10 beginner classroom redesign

## Teaching decisions

Students have met variables, assignment, conditions and loops but need short reminders when those ideas are used. The continuing example is a school event booking desk. One booking introduces types and record fields; multiple bookings introduce arrays, processing and saved text; waiting requests and undo actions motivate queues and stacks. Linked-list operations use explicit node diagrams and storage tables.

English explanations develop each example before asking for a general rule. Cambridge terminology is retained, while the official mark scheme remains separate from teacher explanations. The route uses concrete material, local prerequisite recall, small explanation steps, a worked example, prediction or experiment, a short authored check, and a relevant original question. Existing lesson routes 058–071 are retained. Classroom and full-reading modes use the same content.

The presentation is intended primarily for a MacBook Air connected by HDMI to a classroom display. Students answer the original questions on paper. Hint, teacher reasoning and official MS are separately hidden until opened. The page has no student accounts, online submissions or persistent answer store.

## Official scope

Checked on 29 September 2026 against the [9618 2027–2029 syllabus, Version 2](https://www.cambridgeinternational.org/Images/721397-2027-2029-syllabus.pdf), printed pages 28–29, and the [corresponding pseudocode guide](https://www.cambridgeinternational.org/Images/721401-2027-2029-pseudocode-guide.pdf).

The 25 project objective IDs split the official requirements for coverage checks. They are not additional Cambridge requirements. The ADT requirement includes adding, editing and deleting data and explaining array implementations. The syllabus does not require candidates to write pseudocode for stacks, queues or linked lists; the core teaching uses visible state changes and descriptions of the operations.

| Official area | Teaching and project objectives | Practice evidence |
|---|---|---|
| 10.1 Types | Select types, distinguish literals from values, declare and initialise; S10.01.A01–A06 | E075 directly tests INTEGER, STRING and BOOLEAN. Authored checks cover REAL, CHAR, DATE and storage choices. |
| 10.1 Records | Group mixed fields, define a type, create a variable and read/update fields; S10.02.A01–A03 | E076 defines the record type. Field input, update and output are checked separately. |
| 10.2 Array terms and selection | Index versus value, inclusive bounds, one versus two indices; S10.03.A01–A02, S10.04.A01 | E077 after the complete 2D declaration lesson; authored decisions cover when an array is needed. |
| 10.2 Array processing | Initialisation, traversal, count versus sum, extremes, nested loops; S10.05.A01 | E078 reverse traversal and flowchart; E079 selected 2D condition. Neither alone assesses all processing methods. |
| 10.2 Linear search | Bounded first match, absent value, duplicate targets, early stopping; S10.06.A01 | New E079L explains the supplied algorithm and a suitable conditional loop. Independent writing is an authored check. |
| 10.2 Bubble sort | Complete swaps, passes, shrinking boundary, no-swap exit, paired rows; S10.06.A02 | New E079B requires an efficient paired-row bubble sort after an explicit transfer bridge. |
| 10.3 Files | Persistence, READ/WRITE/APPEND, EOF, blank lines, closing and conversion; S10.07.A01–A02 | E080 converts three lines per record into one. Persistence and mode-choice reasons also have authored checks. |
| 10.4 ADT meaning | Data and operations versus representation; S10.08.A01 | Authored comparisons and justifications; the selected papers do not independently ask for the full definition. |
| 10.4 Stack and queue | LIFO/FIFO, suitable uses, operations, bounds and circular reuse; S10.09.A01–A02, S10.10.A01–A02/A04 | E081 checked push, E082 wrap and active count, E085 two-phase transfer. Pop, underflow, edits and use-case choices also have authored checks. |
| 10.4 Linked list | Logical order, nodes, links, head/null, edits, deletion and free storage; S10.09.A03, S10.10.A03–A04 | E084 array representation, then E083 insertion preserving the free list. Deletion and storage reuse are checked separately. |

## Suggested 45-minute sessions

The route contains **42 concepts in eight connected modules and 32 suggested sessions**. A session is a planning unit, not a time limit: repeat or extend it when students cannot explain the check independently. Reverse traversal and free-list tasks deliberately recur in a second session for paper practice.

A useful starting allocation is 5 minutes of recall, 12 minutes of explanation, 10 minutes of guided tracing, 10 minutes of independent work, 5 minutes of feedback and 3 minutes to connect the next idea. Where no original question is scheduled, use the authored check and consolidation. Shift that allocation to match the class.

| Session | Focus | Stable lesson route |
|---|---|---|
| 1 | Choose quantities and text | 58 |
| 2 | Represent state and a calendar day | 58 |
| 3 | Trace one booking’s values | 58 |
| 4 | Define a booking record | 59 |
| 5 | Read and update record fields | 59 |
| 6 | Read array positions and bounds | 60 |
| 7 | Retain values and traverse forward | 61 |
| 8 | Traverse backward and draw the control flow | 61 |
| 9 | Count matches and find extremes | 61 |
| 10 | Declare and locate a two-dimensional element | 62 |
| 11 | Trace nested loops | 62 |
| 12 | Build totals and combined row conditions | 62 |
| 13 | Search by hand | 63 |
| 14 | Write and test a guarded search | 63 |
| 15 | Complete one bubble-sort pass | 64 |
| 16 | Complete and improve the sort | 64 |
| 17 | Sort complete paired rows | 64 |
| 18 | Save a new file or add to an old one | 65 |
| 19 | Read safely and verify a round trip | 65 |
| 20 | Transform text records | 65 |
| 21 | Specify data and operations | 66 |
| 22 | Choose a stack for latest-first access | 67 |
| 23 | Describe an array-backed stack | 67 |
| 24 | Choose FIFO and trace circular storage | 68 |
| 25 | Count and edit the active queue | 68 |
| 26 | Follow nodes and insert between them | 69 |
| 27 | Handle empty and boundary states | 69, 70 |
| 28 | Allocate and release free nodes | 70 |
| 29 | Apply linked-list representations | 70 |
| 30 | Combine fields and dimensions | 71 |
| 31 | Transfer data between ADTs | 71 |
| 32 | Verify a complete booking outcome | 71 |

## Original question audit

| ID | Original source and selected parts | Marks | Placement and precise role |
|---|---|---:|---|
| E075 | 9618/23 Oct/Nov 2024, 1(b) | 3 | Identify INTEGER, STRING and BOOLEAN from supplied literals. A quoted date-shaped value is STRING. |
| E076 | 9618/22 May/June 2024, 3(a)(i) | 4 | Define Component with the specified fields. Does not ask for a record variable or field operations. |
| E077 | 9618/22 May/June 2025, 1(d)(i)–(iii) | 4 | Two dimensions, inclusive capacity and complete declaration. Moved from 060 to 062 so 2D syntax is taught first. |
| E078 | 9618/22 May/June 2025, 4 | 6 | Complete the two-phase flowchart: retain 100 inputs, then output in reverse. A flowchart reminder precedes the question. |
| E079 | 9618/21 Oct/Nov 2023, 4(b) | 3 | Combine an even-row MOD test with an OR group inside AND. Does not require a full search function. |
| E079L | 9618/21 Oct/Nov 2025, 5(a)(i)–(iii), 5(b)(i)–(ii) | 6 | Explain the sentinel, equality test and first-match guard; improve the stopping rule. The given FUNCTION/RETURN wrapper is explained beforehand. |
| E079B | 9618/21 May/June 2025, 6(b) | 8 | Ascending bubble sort of Reading[1:2000,1:2], retaining speed/ID pairs, no-swap flag and shrinking boundary. The procedure wrapper is taught before this task. Part 6(a), about test data, is excluded. |
| E080 | 9618/22 Oct/Nov 2025, 3(a)–(b) | 7 | File conversion using three valid lines per record and a separator absent from the data. Assumptions and EOF handling are explained. |
| E081 | 9618/21 Oct/Nov 2023, 3(a)–(b) | 8 | Stack representation and checked push; top points to the last occupied element. |
| E082 | 9618/22 May/June 2023, 3(a)(i)–(ii) | 5 | Circular queue addition and active count. End points to the last added item; unused remnants are not active queue members. |
| E083 | 9618/22 Oct/Nov 2023, 3(b) | 4 | Linked-list insertion plus free-list update. Moved from 069 to 070 after free-list teaching. |
| E084 | 9618/22 Oct/Nov 2023, 3(a) | 5 | Translate active and free chains into indexed arrays. Does not test stack/queue implementation or a deletion operation. |
| E085 | 9618/21 May/June 2025, 5 | 7 | Transfer an unknown number of items from stack to queue and back. Rear denotes the next insertion position in this question. |

Total: **13 question groups, 22 selected parts, 70 marks**. Marks are capped according to the official scheme rather than the number of listed marking points. Teacher-written checks and retained consolidation questions are labelled separately.

The eleven existing groups retain their original QP/MS images. Their 16 unique source PDFs and 28 extract hashes were checked against `scripts/past-paper-source-manifest.json`; all matched. The additional groups are self-contained in `scripts/course-v3-section10-extra-papers.json`: seven unaltered PDF-region images, recorded crop bounds, source identities, image dimensions and SHA-256 hashes. All seven new extracts were visually inspected after rendering; glyph-boundary checks passed. The combined selection uses 18 unique original PDFs and 35 extract images.

New sources were selected after inspecting the available 2023–2025 Paper 2 archive. The existing E096 loan-record task needs function parameters and array-of-record details beyond the immediate search lesson. The existing E108 group combines sorting with a separate test-plan task. E079L avoids that extra design burden, while E079B isolates only the sorting part with all necessary context. The original E096 and E108 pages and source registrations are unchanged.

## Materials and interaction

- The generated classroom scene uses a restrained academic photographic style. Numeric labels, arrays, code and pointers remain editable HTML/SVG rather than generated-image lettering.
- Guided experiments expose input, state and a reason for each change. Previous and reset controls support prediction and repeated explanation.
- Array and algorithm activities distinguish index from value, first match from later duplicates, comparison from swap, and a pass from a full sort.
- File activities distinguish saved contents from working variables and blank lines from EOF. Stack/queue activities distinguish stored cells from active data. Linked-list teaching keeps the active and free chains separate.
- The static reading content includes complete examples without JavaScript. Interactive models do not claim to execute arbitrary student pseudocode.

## Verification

Relevant checks:

```sh
node --test scripts/course-v3-section10-classroom.test.mjs scripts/course-v3-section10-models.test.cjs
node scripts/render-course-v3.mjs --section10
```

The classroom suite checks syllabus coverage, original unit and question bookmarks, learning dependencies, paper placement and exact mappings, complete reading content, separate hidden answers, model-backed activity hooks and all published source-image identities. The local original-PDF check reports a skip explicitly if the teaching archive is unavailable.

Results on 29 September 2026:

- All **41 automated tests passed**, with no failures or skipped source checks. All 18 original PDF identities and 35 image identities match their registered hashes; all seven new crops were checked visually.
- JavaScript syntax checks passed for the main renderer, S10 classroom controller and lab controller. A local-link audit checked 1,163 references across the overview and fourteen lessons, with no missing files or anchors.
- A repeated scoped generation produced byte-identical output across 1,147 existing web files. Contract entries for lessons outside S10 remained unchanged.
- In the actual browser, all fourteen lessons loaded in classroom and reading modes. The full 42-concept forward route completed without a skipped or repeated concept; the final button correctly showed Section complete. Cross-page return, both moved-question bookmarks and saved classroom position passed.
- All eleven experiment types were exercised, including both linked-list instances. Checks covered assignment types, out-of-range access, editable examples, complete search/sort/traversal traces, file modes and EOF, ADT empty/full states, circular wrap-around, free-node reuse, booking promotion and undo, previous/replay, and reset.
- Hint, teacher answer and official MS opened independently. Hide answers and stage changes closed them. Experiment setup stayed open while editing inputs.
- The fourteen full-reading pages were checked at **390 × 844, 1440 × 900 and 1920 × 1080**: 42 layout checks, no page-level horizontal overflow or failed content images. Opening material and live experiments were also inspected visually. The final browser session reported no console errors or warnings.

The final pass corrected empty-hash navigation, returning from reading to the saved classroom cursor, a repeated first-element comparison in the maximum trace, and the explanation connecting scalar row totals to saved total arrays. The sticky Teach from this point control still starts teaching from the current reading position.

The classroom scene was produced with built-in ImageGen; its complete prompt, reviewed use and checksum are in `scripts/course-v3-section10-classroom-images.json`. [Classroom preview](section-10-classroom-preview.png).

The physical MacBook Air–HDMI–classroom-display chain has not been tested here. The browser checks establish layout and interaction behaviour at the stated resolutions. Longer examples and some activities use vertical scrolling while the teaching controls remain available. No complete offline release archive was rebuilt in this scoped change.

No reset, cleanup, commit, push or deployment is part of this change. Existing unrelated work is preserved.
