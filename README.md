# AS9618 Computer Science 2027–2029 — visual teaching course

This repository contains an AS Level-only course for Cambridge International Computer Science 9618, syllabus years 2027–2029.

The active curriculum contains 91 teaching lessons and two integrated reviews in official Sections 1–12 order. Lesson numbers are content units, not fixed-duration promises. Every page is designed both for direct classroom explanation and independent study.

Official qualification page: <https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/>

## Teaching revision standard

Read [AGENTS.md](AGENTS.md) and the [通用教学标准 / Teaching standard](TEACHING_STANDARD.md) before planning, reviewing or revising a Section or Lesson. The standard defines teaching depth, complete examples, assessment alignment, reasonable extensions, diagram selection (including ImageGen), teaching review and rendered-page verification. It also includes starter prompts for new Section conversations. These are project working documents, not student-facing lesson content.

## Active course design

- Target: AS Level only.
- Structure: 93 numbered pages: 91 teaching lessons and two integrated reviews.
- Sequence: Cambridge syllabus Sections 1-12.
- Lesson flow: lesson title and objectives → concept-specific teaching units in pedagogical order → practice questions → original exam-style questions and marking points → summary.
- Materials: each teaching unit explains one coherent concept. Visuals, methods and worked examples are used where they clarify that concept; unrelated syllabus terms must not be bundled into the same core explanation.
- Practice: select questions for distinct learning purposes and map each to its relevant objectives. There is no minimum question count per lesson and no requirement to turn every objective into a separate written question. Questions show command words and marks; answers start collapsed.
- Assessment Bank: 12 cumulative section checks and two original 75-mark paper mocks.
- Coverage: all 121 syllabus requirements have mapped teaching content; selected tasks provide application and assessment opportunities.
- Exam language: Cambridge pseudocode is the standard; Java is supporting material only.
- Copyright boundary: the public repository stores past-paper indexes and statistics, never Cambridge question or mark-scheme wording.

`web/index.html` is the student gateway. It links to the 93-page course, Assessment Bank and Resources. The `web/lesson-*` compatibility entries preserve older incoming links without defining current lesson content. The older `web/course-v3/section-2/unit-*` entries also redirect to the corresponding current S2 lessons.

## Teaching a lesson

Use **Teach one unit** to show one explanation at a time, then switch to its related practice or exam questions. **Show whole lesson** restores the complete page; printing includes every unit and question. Answers close when switching units. The full lesson remains available when JavaScript is disabled.

Programming lessons provide **Before this lesson** links to prerequisite concepts. The optional dependency-based route in [Practical labs](web/resources/practical-labs/index.html#learning-route) introduces variables, conditions and loops before array algorithms while retaining official syllabus order in the main course. Five Java 17 labs provide downloadable, complete starter programs and separate solutions, prediction/run/amend tasks, expected outputs and deliberate fault investigations. Each lab states the difference between supporting Java syntax and Cambridge pseudocode.

Start with the lesson objectives, then teach each knowledge unit in order. The lead visual is always shown before the core explanation. Comparisons use tables, processes use numbered steps, and programming topics use complete code and traces. Students then answer questions whose Cambridge command word and marks are explicit before checking separate marking points. S2 includes classroom checkpoints, model-selection and subnetting examples, and collapsed answers for both practice and original exam-style tasks. S3 separates gate fundamentals from logic construction, includes classroom checkpoints and knowledge-point links, and also keeps exam answers collapsed.

S1 retains six lessons with 28 teaching units covering 44 objectives. Every unit separates a detailed explanation from a short Core exam recap. Denary is taught with positional binary; pixels are taught inside bitmap reconstruction. Complete examples include bidirectional conversions, signed boundaries, column carries and borrows, character round trips, bitmap overhead, vector reconstruction, numerical sampling and reversible compression with explicit field costs. The lessons include 44 practice tasks and 24 independent exam tasks; all answers start collapsed. Prerequisite links, unit contents and formative checks support classroom use. Lesson 048 adds two numerical/media review tasks; the 20-mark section check includes quantisation and coordinate scaling. See [Section 1 teaching review](section-1-teaching-review.md) for the approved teaching map, example boundaries and verification evidence.

The S1 teaching source is `scripts/course-v3-section1-teaching.mjs`, applied before presentation finalisation. Its shared numerical and drawing data lives in `scripts/course-v3-section1-examples.mjs`; `scripts/course-v3-section1-questions.mjs` supplements the existing questions in `scripts/course-v3-section1-content.mjs`. Seven exact SVGs come from `scripts/course-v3-section1-diagrams.mjs`, including five new sampling, vector and RLE diagrams. The existing character-code mechanism SVG is reused. Precise tables remain editable text; optional extensions are labelled and collapsed.

S5 follows syllabus 5.1 then 5.2 across five lessons: 23 knowledge units, 29 objectives, 24 practice questions and 15 independently authored exam tasks. Each unit includes a formative check, and each lesson has a contents list, an entry diagnostic and worked examples. All S5 answers start collapsed. The Paper 1 review and Assessment Bank also include concrete S5 tasks with explicit scoring.

S6 has 26 distinct knowledge units with formative checks, worked security scenarios and exact check-digit/parity/checksum diagrams. Its 31 practice questions and 15 independent exam tasks use explicit objective mappings; exam answers start collapsed.

S7 retains four lessons in syllabus 7.1 order, with 18 knowledge units, 19 objectives, 26 practice questions and 12 independent exam tasks. Each unit has a formative check, and the four lessons include seven worked scenarios. Eight ImageGen diagrams illustrate professional responsibility, ethical decisions, copyright permissions, software freedoms and price, shareware trials, AI inference, unequal errors and environmental effects. Comparison tables remain available beside the detailed explanations. Diagrams include text transcripts, keyboard-accessible scrolling and full-size links. Lesson contents, entry diagnostics and collapsed answers support classroom use. Four S7 review tasks and concrete section/mock assessments provide further practice.


S8 follows syllabus 8.1–8.3 across six lessons: 37 knowledge units, 40 objectives, 37 practice questions and 18 independent exam tasks. Each unit opens with a relevant diagram: 30 exact SVGs cover relational structures, normalisation, DDL and SQL operations; seven reviewed ImageGen illustrations explain shared data and DBMS roles. Diagram captions, text transcripts, keyboard scrolling and full-size access support teaching and mobile reading. It includes a complete 1NF-to-3NF example, DDL definitions and query/result pairs with supplied data. Every unit has a formative check; lesson contents and collapsed answers support classroom use. Four review tasks, a 20-mark section check and a 10-mark Paper 1 task assess concrete scenarios.

The S8 source is `scripts/course-v3-section8-content.mjs`; its SQL fixtures are in `scripts/course-v3-section8-sql.mjs`. Diagram placement is defined in `scripts/course-v3-section8-visuals.mjs`, with reproducible SVGs in `scripts/course-v3-section8-diagrams.mjs` and `scripts/course-v3-section8-exact-visuals.mjs`. ImageGen prompts, revision prompts and file hashes are recorded in `scripts/course-v3-section8-imagegen-assets.json`.

S9 retains nine lessons in syllabus 9.1–9.2 order, with 24 knowledge units, 15 atomic objectives, 28 practice tasks and 27 independent exam tasks. Complete identifier tables, IPO programs, all four required representation conversions, refinement endpoints and a consistent ticket-purchase case support teaching. Each unit has a formative check; lesson contents, diagnostics and collapsed answers support classroom use. Four review tasks and concrete section/mock assessments replace the former placeholders.

The S9 source is `scripts/course-v3-section9-content.mjs`. Its scalar pseudocode and boundary cases are in `scripts/course-v3-section9-programs.mjs`; flowchart nodes, directed edges and reproducible SVGs are in `scripts/course-v3-section9-diagrams.mjs`.

S10 retains 14 lessons in syllabus 10.1–10.4 order. All 41 units separate detailed teaching from a short Core exam recap. The authored lesson source is `scripts/course-v3-section10-content.mjs`; detailed semantic blocks live in `scripts/course-v3-section10-teaching.mjs`. Its 54 practice tasks and 42 independent exam tasks include conditional counting, signed extremes, row/column/grand totals, a full file write–append–read cycle, circular queue reuse, linked-list boundary cases, and booking success/rejection/undo. The renderer also synchronises four section-check questions and two Paper 2 mock questions. Twenty complete pseudocode examples live in `scripts/course-v3-section10-programs.mjs`; ten reproducible SVGs and explicit state tables show exact values, links and file stages. Optional extensions are labelled and collapsed. ADT operations and array representations are taught descriptively, without requiring implementation pseudocode. See [Section 10 teaching review](section-10-teaching-review.md) for the lesson map and validation evidence.


S11 retains Lessons 072–083 in syllabus 11.1–11.3 order. All 31 units separate detailed teaching from a short Core exam recap. Complete examples cover direct flowchart translation, value copies, string concatenation, nested loops, equivalent sentinel loops, bounded attempts, reference swaps, early returns, safe efficiency changes and a complete validated-marks program. The 49 practice tasks and 40 original exam tasks retain the existing questions and add distinct applications; answers start collapsed. Lesson 093 and the section check also assess concatenation. Six new exact SVGs supplement the existing mechanisms; the function-return diagram uses the same values as its complete program. Optional extensions cover random intervals, the Java parameter distinction and an empty-data mean. Prerequisites and related review links have separate labels. See [Section 11 teaching review](section-11-teaching-review.md) for the approved lesson map, source boundaries and local verification evidence.

The S11 base source is `scripts/course-v3-section11-content.mjs`; detailed blocks and additional tasks are in `scripts/course-v3-section11-teaching.mjs` and `scripts/course-v3-section11-questions.mjs`. Complete programs and input/output fixtures are in `scripts/course-v3-section11-programs.mjs`; exact section diagrams are generated by `scripts/course-v3-section11-diagrams.mjs`. L053/L054 share the corrected Cambridge `WHILE` form without `DO`. Temporary simulation and browser QA scripts stay outside the repository.

S12 retains Lessons 084–092 in syllabus 12.1–12.3 order. Its 30 units separate detailed teaching from concise Core recaps and cover the 34 course objectives. Complete examples include a capacity rule through development, repeated and conditional module calls, guarded state transitions, syntax repair, both stub outcomes and real-function replacement, linked test records, and a configurable pass-threshold interface. All existing lesson questions remain, with additional applications giving 46 practice tasks and 31 original exam tasks. L093, the 20-mark section check and the selected Paper 2 mock task also assess coordinated interface changes.

The S12 base source is `scripts/course-v3-section12-content.mjs`; detailed teaching and additional questions live in `scripts/course-v3-section12-teaching.mjs` and `scripts/course-v3-section12-questions.mjs`. Complete programs and input/output fixtures are in `scripts/course-v3-section12-programs.mjs`. The section diagram generator combines retained visuals with five exact SVGs from `scripts/course-v3-section12-teaching-diagrams.mjs`. Cumulative questions are in `scripts/course-v3-section12-assessments.mjs`. See [Section 12 teaching review](section-12-teaching-review.md) for the approved scope, knowledge map and verification evidence.

S2 retains Lessons 007–014 and teaches network purpose and models, topology, cloud services, media, LAN devices and CSMA/CD, streaming, access infrastructure, and addressing/DNS in that order. All 31 units have detailed teaching, a short Core recap and a folded understanding check. Complete examples trace normal and failed paths, cloud recovery, local request/response ports, collision retries, changing buffer rates and subnet-to-resource delivery. Existing valid questions remain; 11 additional practice tasks and four Paper 1 review diagnoses check changed conditions. Eleven exact SVGs supplement suitable existing images and mechanisms. Optional extensions are explicitly separated from core AS learning. See [Section 2 teaching review](section-2-teaching-review.md) for coverage, visual decisions and local QA evidence.

S2 base definitions and retained questions are in `scripts/course-v3-section2-content.mjs`; detailed units and review teaching are in `scripts/course-v3-section2-teaching.mjs`, additional tasks in `scripts/course-v3-section2-questions.mjs`, and new editable diagrams in `scripts/course-v3-section2-teaching-diagrams.mjs`. `scripts/course-v3-section2-diagrams.mjs` combines those with the retained answerless question stimuli. The assessment contract owns the S2 check and Paper 1 mock slot; the main renderer synchronises their Markdown and HTML. Temporary calculation and browser QA scripts remain outside the repository.

S3 retains Lessons 015–020. All 25 units separate detailed teaching from concise Core recaps and folded understanding checks. Complete examples cover saved/unsaved data through restart, nine device mechanisms, finite-buffer backpressure, memory choices, feedback failures and all nine required logic-representation conversions. Existing valid questions remain; 13 new applications give 42 practice tasks alongside 24 original exam tasks. L048 adds three hardware diagnoses and a complete logic answer table; the 20-mark section check includes three-input logic. Prerequisites and later review links have separate labels. See [Section 3 teaching review](section-3-teaching-review.md) for the approved map, source-access limitation and local validation evidence.

The S3 base entry is `scripts/course-v3-section3-content.mjs`; detailed blocks are in `scripts/course-v3-section3-teaching.mjs`, additional tasks and complete answers in `scripts/course-v3-section3-questions.mjs`, and shared state/logic data in `scripts/course-v3-section3-examples.mjs`. The existing diagram entry combines 20 new reproducible SVGs from `scripts/course-v3-section3-teaching-diagrams.mjs` with the retained question circuit. One original VR viewpoint illustration and its review/hash are recorded in `scripts/course-v3-section3-imagegen-assets.json`. The assessment contract owns the cumulative S3 questions; precise answer tables and circuits remain folded on the website.

Teaching revisions use authored paragraph headings, lists, steps and tables. `scripts/course-v3-core-blocks.mjs` provides the block model and searchable text view. `scripts/course-v3-concept-expansion.mjs` and `scripts/course-v3-core-completion.mjs` hold further revisions keyed by concept; Section 2 now has stable concept keys, explicit teaching blocks and selected visuals. It preserves programs and assessments, and consolidates superseded comparison tables where their content has moved into the explanation.

`scripts/course-v3-mechanism-diagrams.mjs`, `scripts/course-v3-mechanism-extensions.mjs` and `scripts/course-v3-mechanism-completion.mjs` generate 62 concept-keyed SVGs: character encoding, communication paths, feedback, processor transfers, device bits, OS services, backup recovery, Boolean conditions, buffers, records, array/search traces, ADT states, file modes, bounded loops, function results and development/testing relationships. Two-column explanation tables stack on phones; diagrams and wider tables support local keyboard scrolling. Review rendered SVG labels and connections at desktop and 390px widths whenever a diagram changes; numerical checks do not establish visual legibility.

The laser printer illustration now shows exposure reducing negative drum charge, negatively charged toner and positive transfer charge behind the paper. Its revision history and checksum are also recorded in `scripts/course-v3-reference-images.json`.

The USB/HDMI/VGA appearance reference was generated with built-in ImageGen and visually reviewed after correcting the VGA hole count. `scripts/course-v3-reference-images.json` records its prompt, review and checksum. Its editable HTML labels explain purpose and compatibility; the bitmap is an appearance reference, not a pinout.

## Repository structure

- `course-v3-map.md`: official-order allocation and the complete 93-page sequence.
- `web/course-v3/`: active visual course, section indexes and lesson navigation.
- `scripts/course-v3-content.mjs`: structured teaching source. S1 questions and teaching additions are authored in `scripts/course-v3-section1-content.mjs`; its exact diagrams are generated by `scripts/course-v3-section1-diagrams.mjs`. S2 is authored in `scripts/course-v3-section2-content.mjs`.
- `scripts/course-v3-section4-content.mjs`, `course-v3-section4-questions.mjs` and `course-v3-section4-programs.mjs`: authored S4 teaching, complete ACC/IX programs, explicit objective mappings and independent assessment tasks. S4 includes lesson navigation, per-unit checks and collapsed answer tables. `course-v3-section4-teaching.mjs` adds detailed explanations, prerequisite-aware ordering, cache history, full execution examples and bounded extensions. `course-v3-section4-assessments.mjs` adds independent tasks and supplies the Section 4 check, Paper 1 question and integrated review. `course-v3-section4-diagrams.mjs` generates the architecture, fetch, complete calculation, interrupt-context and conditional-device SVGs. See [Section 4 teaching review](section-4-teaching-review.md) for the approved allocation and local acceptance evidence.
- `scripts/course-v3-section3-content.mjs`: authored S3 corrections, logic lessons and independent exam questions; explicit objective mappings bypass automatic question selection.
- `scripts/course-v3-section5-content.mjs`: authored OS, utilities, libraries, translators, Java and IDE lessons; source examples and tasks use explicit objective ownership.
- `scripts/course-v3-section6-content.mjs`: authored S6 explanations and assessments; `course-v3-section6-diagrams.mjs` generates numerical SVGs, and `course-v3-section6-imagegen-assets.json` records the three generated conceptual images and their prompts.
- `scripts/course-v3-section7-content.mjs`: authored S7 ethics, licensing and AI teaching, explicit objective mappings, independent questions and Paper 1 review tasks.
- `scripts/course-v3-section7-visuals.mjs`: S7 diagram placement, captions and transcripts. `course-v3-section7-imagegen-assets.json` records the generation prompts, reviewed assets and checksums; image files live in `web/assets/course-v3/section-7/`.
- `scripts/course-v3-teaching-support.mjs`: entry diagnostics, prerequisite lessons and practical links. `course-v3-classroom.js` and `.css` provide the optional classroom controls. `course-v3-practical-labs.mjs` renders lab instructions around the Java files in `web/resources/practical-labs/`; the renderer refreshes both course and resource pages.
- `scripts/course-v3-contract.json`: generated objective/material/practice ownership contract.
- `scripts/course-v3-section-anchor-assets.json`: section-anchor asset and SHA-256 manifest.
- `scripts/course-v3-knowledge-diagrams.mjs`: knowledge-unit visual mapping and alternative text.
- `scripts/assessment-bank-contract.json`: Assessment Bank source for sets without a dedicated authoring module; Section 4 uses `course-v3-section4-assessments.mjs`. The renderer also refreshes the authored S1–S7 sections and their selected Paper 1 questions in `assessments/assessment-bank.md` from this source.
- `scripts/course-v2-content.json`: source material still used by lessons that have not yet moved to dedicated V3 models.
- `scripts/question-bank-contract.json`: original question metadata and semantic fingerprints.
- `scripts/past-paper-frequency-contract.json`: copyright-safe frequency metadata for 36 papers and 36 mark schemes.
- [Practice and past-paper teaching review](docs/practice-past-paper-review-20260915/README.md): the full-course selection plan, source verification records and seven complete teaching samples. The plan awaits teaching approval and has not been implemented in the course pages.
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

Regenerate the active HTML, resource pages, content manifest and compatibility entries:

```bash
node scripts/render-course-v3.mjs
```

To refresh the frequency contract from teacher-owned PDFs outside the repository:

This optional extraction step requires `pdfplumber` in the Python environment running the command. Install it in your virtual environment with `python -m pip install pdfplumber`. `--help` works without the PDF dependency. Question numbers retain their printed part hierarchy; command words and syllabus tags are inferred from the question text and should be checked before using the statistics to plan lessons.

```bash
python3 tools/extract_past_paper_frequency.py \
  --source-dir "/Users/kw/Documents/Teaching/AS CS 9618/past-papers" \
  --syllabus-contract scripts/syllabus-coverage-contract.json \
  --output scripts/past-paper-frequency-contract.json
```

Only references, marks, command words, question types and syllabus tags are written to the repository.

## Offline release build

Build the current offline release:

```bash
node scripts/render-course-v3.mjs
python3 scripts/build-course-release.py
```

The repository no longer includes dedicated validation scripts or fixed question-count gates. The generators and release builder still report missing required inputs. After editing teaching material, inspect the generated pages, calculations, links and diagrams, including a narrow viewport and classroom controls. Keep any one-off QA scripts outside the repository.

The archive includes all numbered lessons, the Assessment Bank, resources and referenced visual assets.
It also includes the resource accessibility script and the eight older Section 2 bookmark routes.
After extracting the archive, open `web/index.html` in a browser. The builder expands directory links and redirects to explicit `index.html` paths inside the archive, so navigation works without a local server. The release manifest records the hashes of these packaged files.

```text
dist/AS9618-CS-2027-2029-course.zip
dist/AS9618-CS-2027-2029-course.zip.sha256
```

No remote publication is performed by the generator or release builder.
