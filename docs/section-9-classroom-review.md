# Section 9 beginner classroom redesign

## Scope and teaching decisions

The course serves a mixed-entry class. The core path introduces variables, assignment, data types, Boolean decisions and execution before using them. Optional challenges provide additional work without making the core explanations optional. Student pages are English. Explanations develop concrete examples; exam recaps use Cambridge terminology. Official extracts and teacher-written explanations remain separate.

The continuing case is a school ticket desk: 25.00 per ticket, a 10% student discount, integer requests from 1 to the number of available places, and sufficient payment before stock changes. Correctly typed values are an explicit assumption in complete algorithm examples. Interactive controls also reject malformed values. Money calculations in browser models use integer minor units where needed.

The twenty suggested 45-minute sessions are teaching segments, not a promise that every group will take the same time. Existing lesson routes 049–057 remain stable. Classroom navigation follows the ordered sessions across routes; the concept directory supports direct review. Both modes use one set of explanations and examples.

## Teaching route and objective coverage

| Sessions | Content | Project objective IDs |
|---|---|---|
| U01–02 | Defined steps; abstraction, purpose, benefits and an explicit model | S9.03.A01; S9.01.A01–A04 |
| U03 | Names, current values, types and identifier tables | S9.04.A01 |
| U04–05 | Input, expressions, assignment, sequence, output; structured English to pseudocode | S9.05.A01; S9.06.A01; S9.07.A01–A02 |
| U06–09 | Selection, flowchart decisions, relational boundaries, compound conditions and ordered branches | S9.06.A01; S9.07.A01–A03; S9.09.A01 |
| U10–13 | FOR, conditional accumulation, WHILE and REPEAT, including zero and at-least-one execution | S9.06.A01; S9.05.A01; S9.09.A01 |
| U14–15 | The four required conversion directions; two-stage input control | S9.07.A01–A03 |
| U16 | Decomposition, module responsibilities, returned values and output effects | S9.02.A01–A02 |
| U17 | Refinement to programmable steps | S9.08.A01 |
| U18–20 | Complete purchase, points transfer, independent design and review | Integrated application of the preceding goals |

Section 9 has 15 distinct project objectives. These IDs split the official requirements for internal coverage checks; they are not additional Cambridge requirements. Necessary foundations are embedded locally instead of requiring future Lessons 073–078 first. Arrays, records, files and parameter-passing implementation are outside this core route.

## Official sources and exact paper roles

Official reference: [9618 2027–2029 syllabus, Version 2](https://www.cambridgeinternational.org/Images/721397-2027-2029-syllabus.pdf), printed pages 27–28; [corresponding pseudocode guide](https://www.cambridgeinternational.org/Images/721401-2027-2029-pseudocode-guide.pdf).

| Paper ID | Original source and selected parts | Marks | Role and limits |
|---|---|---:|---|
| E067 | 9618/22 May/June 2023, 7(a)(i)–(ii) | 5 | Select essential details. Does not independently require a complete abstract model or a general explanation of every benefit. |
| E068 | 9618/22 May/June 2024, 7(a) | 3 | Decompose into named modules and explain responsibilities. Return/output distinction also needs the authored check. |
| E069 | 9618/22 Oct/Nov 2023, 1(a) | 4 | Complete identifier names and types. |
| E070 | 9618/21 Oct/Nov 2023, 2(b) | 2 | Identify selection and iteration. Does not assess writing those constructs. Shares context with E072. |
| E071 | 9618/22 Oct/Nov 2023, 2(a) | 5 | Draw a flowchart with two phases and stopping conditions. Does not assess writing pseudocode. |
| E072 | 9618/21 Oct/Nov 2023, 2(a) | 5 | Refine an algorithm into five textual steps. The question explicitly prohibits pseudocode. |
| E073 | 9618/21 May/June 2025, 2(a)(i)–(ii) | 2 | Follow ordered comparisons and repair a flowchart. Explain its return value first; compound AND/OR/NOT needs separate checks. |
| E074 | 9618/21 May/June 2023, 3(b) | 5 | Refine a banded-points calculation. Teach selecting a band and taking the whole-number part in the correct order. |
| E086 | 9618/23 Oct/Nov 2024, 2(a) | 5 | Write complete pseudocode for 100 integer inputs, summing only positive values. Includes declarations, prompt/input, loop, selection, accumulation and final output; MS caps six available points at five marks. |

The core allocation is nine groups, eleven selected parts and 36 marks. E086's existing reviewed extracts are reused; its later S11 occurrence is revision. All 28 existing authored Practice questions remain available for consolidation. These are separate from official questions.

The original eight groups' 12 source PDFs and 19 extracts were checked during the preceding read-only audit, including hashes, page references and required context. E086 QP/MS and existing extracts were also checked. Source identity is recorded in `scripts/past-paper-source-manifest.json`; teacher explanations are in `scripts/past-paper-teaching/section-9.mjs` and `section-11.mjs`.

Remaining limits: no selected early single-operation IPO original question; no selected original requiring a complete abstract model; the core selection does not directly examine every conversion direction or all compound operators. Authored tasks cover those capabilities. The reviewed 9618/22 May/June 2024 Q2(b) is a possible later flowchart-to-pseudocode extension requiring nested loops and supplied subroutine calls. E097 is a later optional possibility requiring RAND/INT. Neither candidate is counted in the core totals.

## Materials and interaction contracts

- One ImageGen school ticket-desk image provides context in a realistic academic textbook style, following the requested replacement of the first cartoon illustration. All numerical values, rules, code and labels remain HTML or exact SVG. Prompt, checksum and review are in `scripts/course-v3-section9-classroom-images.json`.
- Eight activity families: abstraction, execution traces, conditions, loops, representations, modules, refinement and a complete ticket transaction.
- Input changes invalidate old revealed results. Single-step demonstrations use model-generated execution frames; previous-step returns to an earlier snapshot. Restart restores the documented initial state. Teacher-controlled reveal keeps prediction separate from results.
- Conditions show both comparison results and the combined decision. Rejected requests and insufficient payments preserve stock. Loop demonstrations distinguish the position of the condition test and show termination explicitly.
- Opening materials are authored explicitly. A full program is not automatically reused as an opening stimulus.
- A browser simulation demonstrates the authored pseudocode subset; it is not an arbitrary-code interpreter. Text explanations and worked traces remain available without running an activity.

## Build and verification

Scoped generation:

```sh
node scripts/render-course-v3.mjs --section9
node --test scripts/course-v3-section9-classroom.test.mjs scripts/course-v3-section9-models.test.cjs
```

The scoped command skips resource-hub generation and preserves non-S9 lesson/asset contract entries. It also skips loading the S10 classroom modules, rendering other lessons and reading S10 browser assets, so a concurrent S10 edit cannot block this rebuild. Existing uncommitted work was inventoried before implementation; no reset, cleanup, commit, push or deployment is part of this task.

Acceptance checks cover all 20 session links, all 15 goals, retained 24 unit anchors, original questions, complete explanations, experiment boundary conditions, default-hidden answers, classroom/reading switching and 1366×768, 1920×1080 and narrow layouts. Browser results and final command outcomes are recorded after implementation validation below.

### Validation results

Validated locally on 29 September 2026:

- `node --test scripts/course-v3-section9-classroom.test.mjs scripts/course-v3-section9-models.test.cjs`: **58 passed, 0 failed, 0 skipped**, including identity checks against all 14 local source PDFs. Browser scripts also passed `node --check`.
- `node scripts/render-course-v3.mjs --section9`: passed. A repeated build changed no files. The before/after check preserved all 84 current non-S9 lesson entries and every non-S9 asset entry. Concurrent S10 work was retained; no existing file was removed.
- Browser navigation: clicked through all 20 concepts in teaching order, including cross-page transitions and the final completion state. Verified back navigation, the E086 question bookmark, separate official-MS reveal, Hide answers, and the four conversion tasks' supplied source diagram/code.
- All eight activity families were operated in the browser. Checks included missing abstraction data; assignment and unassigned output; AND/OR/NOT counterexamples; positive-only accumulation; zero-iteration WHILE; REPEAT accepting the third attempt; the two-stage sequence producing 31; return versus display; payment and points refinement; and underpayment/exact/overpayment with the correct remaining places.
- Switching a representation retains the execution step. Changed inputs hide the old result, Previous restores the earlier snapshot, and Restart restores the documented inputs. Flowcharts start in a single view, keep step controls visible, and bring the current node into view.
- Classroom/Full reading was checked across all nine pages at 1366×768, 1920×1080 and 390×844: **54 combinations, no outer horizontal overflow, no disabled activity initialisation, no prematurely opened answers, and no console errors/warnings** in the final run. Page images finished loading. Long code, tables and diagrams use local scrolling.
- A real-browser focus issue was found and fixed: clicking the sticky Teach control could scroll the reading page by 329 pixels and select the prior phase. The original visible teaching phase is now retained, with both an automated regression and a successful U19 Connect → Full reading → Teach browser check.

Physical HDMI output and the classroom smartboard browser were not available for testing. The changes remain local and have not been committed, pushed or deployed.
