# Section 12 classroom review

## Scope and source baseline

This review covers the local beginner-oriented classroom rebuild of Section 12, Software Development. The nine public routes remain Lessons 084–092. The current course export contains 30 retained unit keys and 34 internal learning objectives. The older count of 25 units in `course-v3-map.md` predates five teaching additions; the source export is the baseline for this change.

The working directory contained substantial existing changes before this task. This work does not authorise a commit, push or deployment. Source questions, original crops and source registrations remain unchanged.

## Official syllabus verification

Checked on 30 September 2026 against the official [Cambridge 9618 2027–2029 syllabus, Version 2](https://www.cambridgeinternational.org/Images/721397-2027-2029-syllabus.pdf), printed pages 30–31. The same pages were read from the local teaching copy, `9618-2027-2029-syllabus-v2.pdf`, SHA-256 `c8a4c6d033c07c6d8025689abed5ef481d581c28bae640986d275303ed6c08bc`.

| Official subsection | Project requirements | Required scope |
| --- | --- | --- |
| 12.1 Program Development Life cycle | S12.01 | Purpose and stages; waterfall, iterative development and RAD; principles, benefits, drawbacks and suitability. |
| 12.2 Program Design | S12.02–S12.03 | Structure-chart decomposition and interfaces; constructing a chart and deriving pseudocode; state-transition diagrams. |
| 12.3 Program Testing and Maintenance | S12.04–S12.09 | Expose, identify, locate and correct faults; testing methods and suitable data; strategies and plans; data categories; continuing maintenance and its three types; analyse and amend programs. |

The official testing list includes dry run, walkthrough, white-box, black-box, integration, alpha, beta, acceptance and stub. The data categories include normal, abnormal and extreme/boundary; maintenance includes perfective, adaptive and corrective. Internal S12.01–S12.09 identifiers are the project's teaching breakdown, not additional official subsection numbers.

## Original-paper verification

The retained pool comprises ten original paper groups, E098–E107, with 15 selected parts and 37 marks. All 14 distinct QP/MS source PDFs were found under the local teaching archive, and both required insert PDFs were available in the existing review directory. All 16 source files matched their registered SHA-256 identities. All 31 published QP/MS/insert images matched their registered hashes.

Every selected QP and MS crop was read from its source PDF. The module-couple diagram and PIN state diagram were also visually inspected; the source insert definitions were checked for the supplied string functions, concatenation, conversion and operators. There is no identified source-file gap for these ten groups.

| Group | Original source and selected parts | Marks | Exact direct coverage | Placement and scope limitation |
| --- | --- | ---: | --- | --- |
| E098 | 9618/21 May/June 2023, 5(a)(i–ii) | 3 | S12.01.A03–A06 | After the three models: two scenario-linked waterfall drawbacks and one suitable alternative. Naming either iterative or RAD does not separately test every benefit/drawback of both. |
| E099 | 9618/22 Oct/Nov 2023, 7(a–b) | 6 | S12.02.A01, A03 | After hierarchy, typed parameters, reference updates, returned values, data/control couples and conditional calls. Completing a supplied chart does not test pseudocode derivation. |
| E100 | 9618/22 May/June 2023, 7(b) | 4 | S12.03.A01 | After reading and completing states, directed transitions, self-loops and input/output labels. Preserve the supplied cancel transition. |
| E101 | 9618/22 May/June 2024, 5(a)(i–ii), 5(b) | 6 | S12.04.A02, A04, A05 | After syntax and run-time faults; refresh 1-based array bounds, WHILE closure, MOD 2, CASE, string conversion and the supplied insert. The selected parts ask identification and explanation, not correction/retesting. |
| E102 | 9618/22 May/June 2025, 2(b)(ii–iii) | 4 | S12.04.A03–A04; S12.05.A04–A05 | After black-box testing and stubs, with earlier error-type teaching. The MS accepts a correctly described logic error or run-time error; this is a choice, not separate evidence of both. |
| E103 | 9618/22 Oct/Nov 2025, 5(b) | 1 | S12.05.A08 | After acceptance testing. The customer context identifies acceptance; alpha and beta are context, not separately assessed definitions. |
| E104 | 9618/21 May/June 2025, 6(a) | 4 | S12.07.A01–A02 | After test-data categories and expected results. The sensor supplies non-negative integers only; use the 0–60 domain. Negative values and text are outside the stated source. |
| E105 | 9618/22 Oct/Nov 2023, 4(b) | 3 | S12.07.A01 | After choosing discriminating sequences and purposes. Refresh odd/even counting and a 99 sentinel that is never counted. Supply only valid positive-integer sequences. The question does not ask data-category classification. |
| E106 | 9618/22 May/June 2025, 1(b)(i) | 3 | S12.08.A01, A03 | After reasons for continuing maintenance and adaptive maintenance. It does not separately assess corrective or perfective work. |
| E107 | 9618/22 Oct/Nov 2025, 3(c) | 3 | S12.09.A01 | After program amendment, plus a file/record/string refresher and a worked length-prefix design. This is a file-design enhancement, not an exercise in writing amended program code. |

The test route may move between stable lesson pages so that methods precede data selection and data selection precedes a complete plan. Paper placement must follow the required concepts, not the old page number. Teacher-written checks cover details not directly assessed by the selected original papers; the paper pool is not described as separate original-question coverage of all 34 objectives.

### Source identity register

| Source PDF | SHA-256 |
| --- | --- |
| 9618_s23_qp_21.pdf | `ec3ce014e637b1bba40235dbcd807e7749ed80d0cc816c7862483a484b516d5e` |
| 9618_s23_ms_21.pdf | `f6709d9da90d460b2192f133f1378928029c5431baf4cae26ce0f275c3b311e5` |
| 9618_w23_qp_22.pdf | `8e46de8183ecf792adf5dd86a42d8868952822bb56d349918b594a08d720f5f4` |
| 9618_w23_ms_22.pdf | `168281052448ad61bc0eb52cde0fa8e1714b450e08e9826abe80a8423b342a9a` |
| 9618_s23_qp_22.pdf | `41216c66a226bd48b6125b966c2d348a4d8cd55399d38f45d810653a949d1ce8` |
| 9618_s23_ms_22.pdf | `932fc08bedf23d5458a5eee2d5658be2fd03d67ca1cfd9f0da862c0d2f1570db` |
| 9618_s24_qp_22.pdf | `2a454e3660ac7d44569a829e3039acdd32204216385d645a370f1c00a7714c46` |
| 9618_s24_ms_22.pdf | `901cb6ebf4cafc157e39b55f5e764081d9d30384b0ae8f9d3ea5f795cf475d9d` |
| 9618_s24_in_22.pdf | `6dc00819a760d2f178c5a8c0b8cd4cbf6bc644447fcbb002adb9fc8303e17ef3` |
| 9618_s25_qp_22.pdf | `d0888a6c10be5f3ad806b71e98de7586274fe1aeb801aa4b82059f06de6e857c` |
| 9618_s25_ms_22.pdf | `1a983412767fb5130f36d7b3ddc317384174833647aec1d75a24c41b7bf10715` |
| 9618_w25_qp_22.pdf | `02da3baced99f059667fc7619cca0e779db8ae369a250a1106b4c0aa55f0c4e8` |
| 9618_w25_ms_22.pdf | `1fef4ad8713f2424f09545464f1b31af5ee2ee1d9d38435f7487eea2d4278532` |
| 9618_s25_qp_21.pdf | `bdc294eb8a519647f24d2fc53053504a0a03c164625c043397a6533ddb09e5b7` |
| 9618_s25_ms_21.pdf | `cc0ce7f995d039ebed35955a41a87d3d09f6e25470afcf0868f8af897ac9486b` |
| 9618_w25_in_22.pdf | `6a80eadc88d53a81b214eb92e15a51edde0e69e7c85cda1f2c9d386882f5b744` |

## Classroom content and integration verification

The completed learning route contains 28 concept groups across eight modules, with 24 suggested 45-minute sessions. The nine stable lesson routes retain all 30 original unit keys and 34 internal objectives. Seven inspectable activity types address development models, module calls, state transitions, error diagnosis, stubs and testing, boundaries, and maintenance. Their number follows the material rather than a fixed activity quota.

Each concept supplies a concrete opening stimulus, a short recall of prerequisite knowledge, explanatory steps, a worked example and a teacher-written independent check. Original papers follow the relevant teaching and independent check. The testing sequence crosses lesson pages: methods, then data selection, strategy and records, then user-facing and acceptance stages. Module order, sessions and cross-page navigation use this same route.

Content review corrected three significant scope or support issues before completion:

- E101 is mapped to identification/location of the selected errors, not to correction and retesting that the selected paper does not request. Its preparation explains integer-to-string conversion, the supplied string interfaces, array bounds and unreachable CASE alternatives.
- E099 receives an explicit data/control-couple diagram before the paper. An unfilled circle represents data; a filled circle represents control. Arrow direction is separate from circle fill, a returned INTEGER remains data, and reference transfers can be bidirectional.
- The stub activity and its teaching now use the same `ValidSeats` interface, 1–6 rule, 0/3/6/7 inputs and Accepted/Rejected outputs. A fixed stub response is kept separate from evidence about the real implementation.

E107 receives a file-record and string refresher, a complete length-prefix worked example, and checks for an empty field or one containing the original separator. It is described as a design-enhancement question; complete code amendment is assessed in separate teacher-written work.

The following command passed all 29 reported checks, with zero failures and zero skips: 13 top-level integration/provenance tests plus 16 source-PDF identity subtests.

```bash
node --test scripts/course-v3-section12-classroom.test.mjs
```

Coverage includes all 34 objectives and 30 unit keys, stable routes, prerequisite ordering, the ten papers exactly once with precise scope and unchanged 37 marks, classroom phases, concept-navigation links, original bookmarks, initially folded answers, separate QP/hint/reasoning/MS roles, all referenced teaching images, the seven activity keys and reset controls, all 31 original-image hashes and dimensions, ImageGen provenance and all 16 source-PDF identities. The test file also passed `node --check`.

Completed source checks include the official syllabus pages, every selected QP/MS text and required insert definitions. No full-site generation was performed. Scoped-build, execution-model and rendered-browser results are recorded below; source/markup tests alone do not establish screen readability or correct live interaction.

Actual HDMI hardware, room-distance readability and the classroom smart display are not available to this audit. Browser viewport and interaction checks must be reported separately from physical classroom acceptance.

## Final implementation and verification

The public pages default to one concept and one teaching step at a time. Full reading retains the complete lesson; cross-page continuation carries that mode, and “Teach from this point” resumes at the reading position. Images, code, tables and original-paper extracts have separate enlargement controls. Closing an enlargement preserves the classroom position and live experiment state. Answer disclosures remain separate from the question and initially closed.

The new source of the teaching sequence is `scripts/course-v3-section12-journey.mjs`. Section-specific rendering, browser behaviour and styles live in `scripts/course-v3-section12-classroom.*`; executable activities live in the `section12-models` and `section12-labs` files. Generated HTML and assets are rebuilt with:

```bash
node scripts/render-course-v3.mjs --section12
```

This command writes only the nine Section 12 lessons, its overview and local assets, and its course-contract entries. The build retains the existing public lesson routes and original unit, practice and paper bookmarks. It does not rebuild the resource hub or other sections.

| Verification | Result |
| --- | --- |
| Scoped generation | Passed. A repeated generation produced identical hashes for all 29 inspected Section 12 generated files and the contract. |
| Section 12 classroom and execution-model tests | 41 passed, zero failures or skips. |
| Section 11 regression tests with the Section 12 tests | 88 passed in total, zero failures or skips. |
| JavaScript syntax and targeted `git diff --check` | Passed. |
| Local HTML, assets, fragments, image descriptions and SVG parsing | Ten pages and 699 local references checked; zero failures. |
| Laptop and projection layouts | All nine lesson entry pages checked at 1366 × 768 and 1920 × 1080; zero page-level horizontal overflow or broken images. |
| Narrow layout | Overview and all nine lesson entry pages checked at 390 × 844; zero page-level horizontal overflow. Wide source material retains its own horizontal scrolling. |
| Teaching navigation | All 28 concepts traversed in learning order, including cross-page transitions and the final disabled “Section complete” state. |
| Classroom interaction | All seven activity types exercised in rendered pages, including changed inputs, preparation, forward/backward steps and reset. |
| Modes, answers and bookmarks | Full reading, same-point return, cross-page reading, hidden answers on returning to a check, original `#unit-2`, `#practice` and `#e099` bookmarks verified in the browser. |
| Material enlargement | Generated image, live code with highlighted statements, current values, dynamically created evidence table and original QP extract checked. Position and experiment step were preserved after closing. |
| Browser console | No warnings or errors in the final validation tab. |

Visual inspection covered the opening classroom view at both laptop and projection sizes, the state-transition teaching diagram, enlarged pseudocode and original question, and the narrow-screen interactive evidence table. Projector-size body text and controls remain distinct from source material that can be enlarged; precise notation is authored as SVG or HTML rather than embedded in a generated illustration.

The ImageGen opening illustration and its exact prompt, file identity and dimensions are registered in `scripts/course-v3-section12-classroom-images.json`. Three new SVGs document the booking structure, booking states and structure-chart couples. Existing original-paper images and their registrations remain unchanged.

### Existing-work protection

A pre-edit SHA-256 inventory covered 1,407 existing files. Final comparison found 14 changed existing files: the generator, contract, README, course map and ten Section 12 HTML pages. No inventoried file was missing. The other 1,393 inventoried files retained their original bytes, including other sections, shared browser assets, original question material and source registrations. The task added 22 Section 12 source, asset, test and review files. Pre-existing Git changes were retained; no commit, push or deployment was performed.

Temporary browser measurements, screenshots and hash comparisons are saved in `/tmp/as9618-s12-work/`. These are local verification artifacts and are not part of the published course. The suggested 24 sessions are an editable teaching plan, not a measured classroom-duration guarantee. Physical HDMI output and room-distance readability still require a classroom check.
