# AS9618 Computer Science 2027–2029 — visual teaching course

This repository contains an AS Level-only course for Cambridge International Computer Science 9618, syllabus years 2027–2029.

The active curriculum contains 91 teaching lessons and two integrated reviews in official Sections 1–12 order. Lesson numbers are content units, not fixed-duration promises. Every page is designed both for direct classroom explanation and independent study.

Official qualification page: <https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/>

## Active course design

- Target: AS Level only.
- Structure: 93 numbered pages: 91 teaching lessons and two integrated reviews.
- Sequence: Cambridge syllabus Sections 1-12.
- Lesson flow: lesson title and objectives → concept-specific teaching units in pedagogical order → practice questions → Past-paper questions and exam technique → summary.
- Materials: each teaching unit explains one coherent concept. Visuals, methods and worked examples are used where they clarify that concept; unrelated syllabus terms must not be bundled into the same core explanation.
- Practice: select questions for distinct learning purposes and map each to its relevant objectives. There is no minimum question count per lesson and no requirement to turn every objective into a separate written question. Questions show command words and marks; answers start collapsed.
- Assessment Bank: 12 cumulative section checks and two original 75-mark paper mocks.
- Coverage: all 121 syllabus requirements have mapped teaching content; selected tasks provide application and assessment opportunities.
- Exam language: Cambridge pseudocode is the standard; Java is supporting material only.
- Official content: public course pages display the complete selected Cambridge question parts and corresponding official mark schemes, including required context and diagrams. Verified source extracts remain unchanged; teacher answers and interpretations are separately labelled. Source links supplement the displayed content.

`web/index.html` is the student gateway. It links to the 93-page course, Assessment Bank and Resources. The `web/lesson-*` compatibility entries preserve older incoming links without defining current lesson content. The older `web/course-v3/section-2/unit-*` entries also redirect to the corresponding current S2 lessons.

## Teaching a lesson

For the standard lesson pages, use **Teach one unit** to show one explanation at a time, then switch to its related practice or exam questions. **Show whole lesson** restores the complete page. Answers close when switching units or stages. Use the two print buttons to print Practice and past-paper questions either without answers or with the teacher explanations and official schemes; closing the print dialog restores the previous answer states. The full lesson remains available when JavaScript is disabled.

Programming lessons provide **Before this lesson** links to prerequisite concepts. The optional dependency-based route in [Practical labs](web/resources/practical-labs/index.html#learning-route) introduces variables, conditions and loops before array algorithms while retaining official syllabus order in the main course. Five Java 17 labs provide downloadable, complete starter programs and separate solutions, prediction/run/amend tasks, expected outputs and deliberate fault investigations. Each lab states the difference between supporting Java syntax and Cambridge pseudocode.

Start with the lesson objectives, then teach each knowledge unit in order. The lead visual is always shown before the core explanation. Comparisons use tables, processes use numbered steps, and programming topics use complete code and traces. Students then answer questions whose Cambridge command word and marks are explicit before checking separate marking points. S2 includes classroom checkpoints, model-selection and subnetting examples, and collapsed answers for both Practice and past-paper tasks. S3 uses the focused Hardware journey described below, with each concept and teaching stage displayed separately.

S1 starts from no previous computer science and follows the dependencies between bits, number representations, arithmetic, characters, images, sound and compression. The six stable Lessons 001–006 are topic containers; the Section 1 overview provides flexible 45-minute sessions. Each beginner concept starts with concrete material, then explanation steps, a complete worked example, a prediction-led experiment where useful, an independent check and a suitable original paper task. Questions appear after their prerequisites. Classroom shows one step at a time; Full reading retains the same complete explanations and can resume teaching from the reading position.

The active S1 teaching source is `scripts/course-v3-section1-journey.mjs`. The Section 1 classroom renderer, controller and stylesheet reuse the established guided presentation helpers. `course-v3-section1-models.js` and the labs modules provide deterministic local experiments for bit patterns, conversions, signed representation, arithmetic, character codes, pixels, vector scaling, sampling, RLE and information loss. Topic-specific configurations reveal only the controls and quantities taught so far. Original unit and paper bookmarks are retained; hints, teacher reasoning and official MS open separately. Tables, teaching images and original extracts can be enlarged. The ImageGen source-material scene and its exact prompt are recorded in `course-v3-section1-classroom-images.json`; all precise numbers and diagrams remain editable or computed. Base S1 content, examples, questions and exact SVGs remain available. The [Section 1 classroom review](docs/section-1-classroom-review.md) records scope, coverage, source checks and acceptance limits.


S4 uses a beginner sequence across the seven stable Lessons 021–027: memory → processor parts → buses and performance → instruction execution → interrupts → assembly → addressing and traces → bit operations. Its 27 concept groups cover all 61 distinct course objectives; 23 suggested 45-minute sessions can be extended or combined. Each group begins with a concrete example, then explanations, a worked example, a guided experiment where useful, an understanding check and a connection to the next concept. Thirteen verified past-paper groups follow the concepts needed to answer them. Classroom mode shows one stage and step; Full reading shows the complete lesson. Experiments support touch, undo and restart, using local assets and no runtime network service. Wait for the page’s image-ready message before disconnecting; opening another page still requires a connection or a separately prepared local copy. See the [Section 4 classroom review](docs/section-4-classroom-review.md) for coverage and validation.

S5 uses 19 beginner concept groups across the stable Lessons 028–032 routes. Concrete situations lead into prerequisite reminders, step-by-step explanations, worked examples, teacher-controlled experiments, short understanding checks and nearby Cambridge questions. All 29 objectives are mapped explicitly; 12 verified paper groups (16 selected parts, 44 marks) follow the knowledge they require. Classroom mode presents one step at a time; Full reading preserves the same complete explanations and supports resuming teaching at the reading position. Eleven flexible teaching segments suggest stopping points without imposing a total lesson limit. The [Section 5 source and verification review](docs/section-5-source-review.md) records source checks, coverage limits and local acceptance. The root `section-5-teaching-review.md` is a historical record.

S6 retains Lessons 033–037 and 26 knowledge units covering 32 course objectives. Every unit separates detailed teaching from a short Core exam recap. Complete examples follow authentication and permission decisions, signature creation and checking, biometric enrolment and matching, firewall rules, threat routes, encryption/decryption, full-form correction and sender–receiver integrity checks. The block-parity diagram now starts with sender construction and ends with correction and rechecking; three new exact SVGs explain data protection, phishing/pharming and spyware disclosure. L037 has three teaching stages; L048 adds four S6 review tasks. Existing valid Practice and verified past-paper extracts remain in use, with targeted Practice revisions and labelled optional extensions.

S7 follows a school reading-assistant project across the four stable Lessons 038–041. Its 18 beginner concept groups cover all 19 objectives; 14 suggested 45-minute sessions can be extended. Each group starts with a situation or illustration, develops a complete explanation and worked example, then checks understanding. Six teacher-operated activities explore ethical decisions, software permissions, recognition/translation/speech, group accuracy, costs and environmental comparisons. Eight verified past-paper groups (12 selected parts, 33 marks) follow their prerequisites, with hints, teacher reasoning and official MS opened separately. Classroom presents one step at a time; Full reading uses the same complete content. Five editable academic figures explain the opening case, professional responsibility, ethical choices, permissions and group accuracy; suitable technical illustrations and two earlier SVGs remain in use. See the [Section 7 classroom review](docs/section-7-classroom-review.md) for the teaching map and verification, and the [source review](docs/section-7-source-review.md) for official sources and assessment gaps.


S8 follows a library borrowing system across the six stable Lessons 042–047, with shop orders used for normalisation. Its 35 beginner concept groups cover all 40 objectives and 37 original knowledge units. Twelve modules connect the ideas in prerequisite order; 27 suggested 45-minute sessions allow additional discussion and practice. Each concept starts with concrete material, then explanations and worked reasoning, an experiment where useful, an independent check and a connection. Fifteen verified past-paper parts (52 marks) follow the knowledge they require. Hints, teacher reasoning and official MS open separately. Classroom mode presents one step at a time; Full reading retains the same content. Tables and images can be enlarged for projection.

The active S8 teaching source is `scripts/course-v3-section8-journey.mjs`; `course-v3-section8-classroom.mjs` and its CSS/JS companions render and control the pages. Eight local models cover records, keys, relationships, normalisation, metadata, integrity, backup and indexing. Twelve SQL workspaces use a locally vendored PostgreSQL engine (PGlite 0.5.8) with guided, editable and independent modes, real results and reset. Use an HTTP server: opening an HTML file directly does not support the SQL worker. Data remains in temporary browser memory and is lost on reload. The academic library image and its generation record are in `course-v3-section8-classroom-images.json`; the explicit ER diagram is generated by `course-v3-section8-classroom-figures.mjs`. Retained base teaching, exact diagrams and question sources remain available; the [Section 8 classroom review](docs/section-8-classroom-review.md) records the active route, source coverage and validation.

S9 follows a school ticket desk from concrete instructions to independent algorithm design. Twenty suggested 45-minute sessions cover all 15 objectives across the nine stable Lessons 049–057. The section overview and classroom navigation follow learning prerequisites across those routes. Variables, assignment, comparisons and loop execution are explained before use. Each session combines an explicit opening stimulus, complete explanation steps, a worked example, an experiment where useful, checks and nearby past-paper questions. Eight kinds of local activity support input changes, prediction, stepping and reset. Classroom and Full reading share the same content; original unit and question links remain available.

The original eight S9 paper groups are retained. E086 adds a complete pseudocode-writing task after conditional accumulation; it is also used later in S11, so that later use is revision. Exact objective mappings distinguish direct assessment from partial support. Existing practice is retained for consolidation. Teaching, source limits, experiment assumptions and acceptance evidence are recorded in the [Section 9 classroom review](docs/section-9-classroom-review.md).

The active teaching source is `scripts/course-v3-section9-journey.mjs`; the scoped classroom renderer, controller and stylesheet have the `course-v3-section9-classroom` prefix. `course-v3-section9-models.js` and the labs modules supply deterministic demonstrations. Base objectives, questions and static examples remain in `course-v3-section9-content.mjs`, `course-v3-section9-programs.mjs` and `course-v3-section9-diagrams.mjs`. The ImageGen scene has editable page labels; its prompt, review and checksum are recorded in `course-v3-section9-classroom-images.json`.


S10 follows a booking system across the 14 stable Lessons 058–071. Its 42 beginner concept groups cover all 25 objectives; eight modules connect the ideas in prerequisite order, with 32 suggested 45-minute sessions that can be extended. Concrete material leads into prerequisite reminders, explanations, worked examples, experiments where useful, understanding checks and the next concept. Thirteen genuine past-paper groups follow their required teaching. Hints, teacher reasoning and official MS open separately. Classroom mode presents one step at a time; Full reading keeps the complete explanations together and supports resuming from the reading position.

Eleven kinds of local experiment cover records, array access, traversal, two-dimensional totals, linear search, bubble sort, text files, stacks, circular queues, linked lists and booking changes with undo. They support prediction, editable examples, stepping or operation history, and reset. Exact data, pointers and state changes remain editable text and diagrams for projection. ADT operations and array representations are taught descriptively, without requiring students to write implementation pseudocode. Original practice and unit/question bookmarks remain available.

The active S10 teaching source is `scripts/course-v3-section10-journey.mjs`; `course-v3-section10-classroom.mjs`, `.js` and `.css` render and control the learning route, reusing the shared guided controls from S5. `course-v3-section10-labs.mjs`, `.js` and `.css` provide the experiments backed by `course-v3-section10-models.js`. Base objectives, questions and retained examples remain in `course-v3-section10-content.mjs`, `course-v3-section10-teaching.mjs`, `course-v3-section10-programs.mjs` and `course-v3-section10-diagrams.mjs`. `course-v3-section10-extra-papers.mjs` records the additional verified QP/MS selections.


S11 develops a booking program for learners who have studied Sections 9 and 10 but still need concrete recall and careful explanation. The prerequisite-based route starts with declarations and assignment, then expressions, selection and repetition before complete design translation, procedures and functions. Lessons 072–083 and their original unit and paper bookmarks remain available. Each concept begins with concrete material, provides full explanations and a worked example, then offers an independent check and original paper practice when its prerequisites are ready. Classroom and Full reading share the same content; code, tables and paper extracts can be enlarged.

The active teaching source is `scripts/course-v3-section11-journey.mjs`; the Section 11 classroom renderer, controller and styles display it. The models and labs provide local, bounded execution traces with editable inputs, prediction, previous/next steps and reset. The ImageGen opening scene and its exact prompt are recorded in `course-v3-section11-classroom-images.json`. All twelve original paper groups E086–E097 are retained, with question, hint, teacher reasoning and official MS shown separately. The [Section 11 classroom review](docs/section-11-classroom-review.md) records source verification, coverage, the suggested 45-minute sessions and acceptance checks. The base content, programs and source diagrams remain available for consolidation.


S12 follows the booking system from an agreed requirement through design, testing and maintenance across the stable Lessons 084–092 routes. Beginner concept groups provide concrete opening material, just-in-time programming recall, step-by-step explanation, complete worked examples, teacher-controlled experiments and short independent checks. The learning route teaches test data before complete test planning. Suggested 45-minute sessions can be extended or combined. Classroom mode shows one step at a time; Full reading preserves the complete explanations and supports resuming teaching from the current reading position. Precise structure/state diagrams, an ImageGen opening scene and local interactive models support projection and trackpad operation.

The S12 teaching source is `scripts/course-v3-section12-journey.mjs`; its classroom renderer, controller and styles share the established course layout. The models and labs cover development models, module/data flow, state transitions, fault diagnosis, stubs and testing, boundary data, and coordinated maintenance. All ten original paper groups E098–E107 remain, with corrected direct-objective mappings, prerequisite-aware placement and preserved old question bookmarks. Questions, hints, teacher reasoning and official MS remain separate. The [Section 12 classroom review](docs/section-12-classroom-review.md) records official syllabus alignment, exact question scope, source identities and local acceptance. The existing base explanations, programs and cumulative assessments remain available for consolidation.

S2 follows a school sharing resources, connecting devices, opening a course page and streaming a lesson video. Its 35 beginner concept groups cover all 59 objectives and 31 original knowledge units across the stable Lessons 007–014. Seven modules follow prerequisite relationships across those topic pages; 29 suggested 45-minute sessions can be extended or combined. Each concept begins with concrete material and a prediction, develops a complete explanation and worked example, uses an experiment where useful, then offers an independent check and suitable original paper practice. Classroom mode is the default with JavaScript enabled and shows one step at a time; Full reading preserves the complete explanations for independent study.

The active S2 teaching source is `scripts/course-v3-section2-journey.mjs`; `course-v3-section2-classroom.mjs`, `.js` and `.css` render and control its views. Eight local experiment types provide 18 instances covering service models, topology, media selection, Ethernet, streaming, addressing, DNS and cloud dependence. Their state models and controls are in `course-v3-section2-models.js` and the `course-v3-section2-labs.*` modules. The ten retained paper groups and five added groups provide 15 original QP/MS groups worth 60 marks, placed after their prerequisites. Hints, teacher reasoning and official schemes open separately. `course-v3-section2-paper-map.mjs` records precise objective coverage and prerequisites; `course-v3-section2-extra-papers.mjs` records the additional verified sources. The opening ImageGen scene and its provenance are recorded in `course-v3-section2-classroom-images.json`; teaching also reuses exact diagrams with editable labels. See the [Section 2 classroom review](docs/section-2-classroom-review.md) for the teaching map, source evidence and acceptance record.

The S2 base content, teaching, questions and diagram modules remain available with original objective identities, independent practice, review teaching and question stimuli. Existing lesson routes, unit anchors and paper bookmarks are preserved. The assessment contract still owns the cumulative S2 check and Paper 1 mock slot.

S3 retains Lessons 015–020 and reorganises the 25 mapped units into 24 beginner concept groups covering all 42 objectives. The section overview offers 16 suggested 45-minute sessions. Each concept follows Observe → Explain → Explore (where applicable) → Check → Past paper (where available) → Connect. Use **Next** to advance through individual explanation steps, **Choose a concept** to jump, and **Restart concept** to reset a demonstration. Hints, teacher reasoning and official mark schemes open independently and close when the teaching stage changes. The eight click-operated labs cover disk access, buffering, memory, feedback control, gates, circuits, laser printing and 3D printing. They support touchpads and touchscreens without hover or precise dragging.

The active S3 teaching source is `scripts/course-v3-section3-journey.mjs`; `course-v3-section3-classroom.mjs` renders it with scoped `.css` and `.js` companions. `course-v3-section3-models.js` supplies deterministic models and `course-v3-section3-labs.js` their interactive diagrams. Two ImageGen structural illustrations have editable labels; prompts, hashes and review limits are in `course-v3-section3-classroom-images.json`. The original eight question groups and four newly verified groups provide 12 past-paper groups. They do not directly assess every separate device mechanism; authored checks cover remaining gaps. The [Section 3 classroom review](docs/section-3-classroom-review.md) records coverage, sources and validation.

The base S3 content, teaching, questions, examples and diagram modules preserve objective identities, retained practice and assessment data. The assessment contract still owns the cumulative S3 questions. Existing lesson routes and unit anchors remain supported. The new classroom interface is served by the existing static GitHub site and requires no backend service.

Teaching revisions use authored paragraph headings, lists, steps and tables. `scripts/course-v3-core-blocks.mjs` provides the block model and searchable text view. `scripts/course-v3-concept-expansion.mjs` and `scripts/course-v3-core-completion.mjs` hold further revisions keyed by concept; Section 2 now has stable concept keys, explicit teaching blocks and selected visuals. It preserves programs and assessments, and consolidates superseded comparison tables where their content has moved into the explanation.

`scripts/course-v3-mechanism-diagrams.mjs`, `scripts/course-v3-mechanism-extensions.mjs` and `scripts/course-v3-mechanism-completion.mjs` generate 62 concept-keyed SVGs: character encoding, communication paths, feedback, processor transfers, device bits, OS services, backup recovery, Boolean conditions, buffers, records, array/search traces, ADT states, file modes, bounded loops, function results and development/testing relationships. Two-column explanation tables stack on phones; diagrams and wider tables support local keyboard scrolling. Review rendered SVG labels and connections at desktop and 390px widths whenever a diagram changes; numerical checks do not establish visual legibility.

The laser printer illustration now shows exposure reducing negative drum charge, negatively charged toner and positive transfer charge behind the paper. Its revision history and checksum are also recorded in `scripts/course-v3-reference-images.json`.

The USB/HDMI/VGA appearance reference was generated with built-in ImageGen and visually reviewed after correcting the VGA hole count. `scripts/course-v3-reference-images.json` records its prompt, review and checksum. Its editable HTML labels explain purpose and compatibility; the bitmap is an appearance reference, not a pinout.

Teaching figures use precise labels, restrained colour and explicit relationships. The [academic figure review](docs/academic-figure-review.md) records nine editable SVG replacements across Sections 2, 7 and 8. Their source scripts regenerate them with the course; former PNGs remain as historical assets.

## Repository structure

- `course-v3-map.md`: official-order allocation and the complete 93-page sequence.
- `web/course-v3/`: active visual course, section indexes and lesson navigation.
- `scripts/course-v3-content.mjs`: structured teaching source. S1 questions and teaching additions are authored in `scripts/course-v3-section1-content.mjs`; its exact diagrams are generated by `scripts/course-v3-section1-diagrams.mjs`. `scripts/course-v3-section2-content.mjs` retains S2 base objectives and assessment content.
- `scripts/course-v3-section2-journey.mjs`: active S2 beginner concepts, prerequisite route, modules and suggested sessions. `course-v3-section2-classroom.mjs` renders Lessons 007–014 and the section overview with scoped browser assets. `course-v3-section2-models.js` and the labs modules supply deterministic local experiments; `course-v3-section2-paper-map.mjs` and `course-v3-section2-extra-papers.mjs` record exact question coverage and additional original sources.
- `scripts/course-v3-section4-journey.mjs`: active S4 teaching sequence, precise objective/question mappings and session plan. `course-v3-section4-classroom.mjs` renders the sequence with scoped CSS and JavaScript. `course-v3-section4-models.js` and `course-v3-section4-labs.js` supply deterministic experiments; `course-v3-section4-extra-papers.mjs` verifies the three added original extracts. The existing S4 content, teaching, questions, programs, diagrams and assessments modules preserve source objectives, independent practice and cumulative assessment data.
- `scripts/course-v3-section3-journey.mjs`: active S3 beginner teaching sequence and session plan. `course-v3-section3-classroom.mjs` renders Lessons 015–020; its browser assets remain scoped to S3. `course-v3-section3-content.mjs` preserves the base objectives and assessment content. `course-v3-section3-extra-papers.mjs` records the four added original question groups.
- `scripts/course-v3-section5-content.mjs`: retained Section 5 concept, objective and authored-question source. `course-v3-section5-journey.mjs` defines the active teaching sequence and paper placements; `course-v3-section5-classroom.mjs`, `.js` and `.css` render and control both views. `course-v3-section5-labs.mjs` and `.js` provide resettable demonstrations backed by `course-v3-section5-models.js`. `course-v3-section5-extra-papers.mjs` verifies additional official QP/MS extracts. `course-v3-section5-classroom-images.json` records ImageGen prompts and reviewed image hashes. The previous `course-v3-section5-interactive.*` presentation is retained as source history and is not loaded by current pages.
- `scripts/course-v3-section6-content.mjs`: base S6 lessons; detailed teaching and Practice revisions are in `course-v3-section6-teaching.mjs` and `course-v3-section6-questions.mjs`. Shared example data lives in `course-v3-section6-examples.mjs`; `course-v3-section6-diagrams.mjs` generates exact SVGs. `course-v3-section6-imagegen-assets.json` records the three existing conceptual images and their prompts.
- `scripts/course-v3-section7-journey.mjs`: active S7 concept sequence, objectives, suggested sessions and paper placements. `course-v3-section7-classroom.mjs`, `.js` and `.css` provide the S7 views, reusing the shared guided controls from S5. `course-v3-section7-labs.mjs` and `.js` render six activities backed by `course-v3-section7-models.js`; `course-v3-section7-extra-papers.mjs` verifies three additional original QP/MS groups.
- `scripts/course-v3-section7-content.mjs`, `course-v3-section7-teaching.mjs` and `course-v3-section7-questions.mjs` retain base objectives, practice and review data. `course-v3-section7-diagrams.mjs` generates two exact SVGs. Original visual metadata remains in `course-v3-section7-visuals.mjs` and `course-v3-section7-imagegen-assets.json`; the superseded opening scene prompt and hash remain in `course-v3-section7-classroom-images.json`. Active academic figures are authored in `course-v3-section7-academic-scene.mjs` and `course-v3-section7-academic-concepts.mjs`. Images live in `web/assets/course-v3/section-7/`.
- `scripts/course-v3-teaching-support.mjs`: entry diagnostics, prerequisite lessons and practical links. `course-v3-classroom.js` and `.css` provide the optional classroom controls. `course-v3-practical-labs.mjs` renders lab instructions around the Java files in `web/resources/practical-labs/`; the renderer refreshes both course and resource pages.
- `scripts/course-v3-contract.json`: generated objective/material/practice ownership contract.
- `scripts/course-v3-section-anchor-assets.json`: section-anchor asset and SHA-256 manifest.
- `scripts/course-v3-knowledge-diagrams.mjs`: knowledge-unit visual mapping and alternative text.
- `scripts/assessment-bank-contract.json`: Assessment Bank source for sets without a dedicated authoring module; Section 4 uses `course-v3-section4-assessments.mjs`. The renderer also refreshes the authored S1–S7 sections and their selected Paper 1 questions in `assessments/assessment-bank.md` from this source.
- `scripts/course-v2-content.json`: source material still used by lessons that have not yet moved to dedicated V3 models.
- `scripts/question-bank-contract.json`: original question metadata and semantic fingerprints.
- `scripts/past-paper-frequency-contract.json`: frequency metadata for 36 papers and 36 mark schemes.
- `docs/practice-past-paper-review-20260915/selection-registry.json` and the ten insert PDFs in that directory: verified selection identities and original insert inputs required for past-paper generation.
- `scripts/course-v2-migration.json`: compatibility-route mapping.
- `dist/`: reproducible ZIP and SHA-256 outputs; ignored by Git.

## Practice and past-paper content sources

The current allocation contains 396 core Practice tasks and 129 optional tasks across 93 lessons. The exam section contains 109 source groups (151 selected-part placements, 476 marks); one 4-mark part is revisited in Lesson 093, giving 150 unique parts and 472 unique marks. These describe this allocation, not required counts for future lessons. Lessons 045, 052, 063, 064 and 066 provide explicit onward links rather than duplicate exam questions. The two reviews are teaching menus, not timed mock papers.

- `scripts/course-v3-practice-allocation.json` and `course-v3-practice-plan.mjs`: retained/optional task selection, targeted repairs and prerequisite transfers.
- `scripts/past-paper-extracts.json`: exact selected PDF crop bounds and necessary insert regions.
- `tools/render_past_paper_extracts.py`: verifies original hashes and renders unchanged page regions; rejects cuts through printed text.
- `scripts/past-paper-source-manifest.json`: source identities, page numbers, region bounds and image hashes.
- `scripts/past-paper-teaching/`: teacher-written reading guidance, complete solutions, marking explanations and mistake analysis by Section and review.
- `scripts/course-v3-past-paper-content.mjs`: joins approved sources, teacher content and lesson objectives; rejects pending crop reviews, changed identities and altered extract files before page generation.
- `scripts/course-v3-past-paper-render.mjs`, `past-paper-teaching-diagrams.mjs`, `course-v3-past-paper.css` and `course-v3-past-paper.js`: public display, teacher SVGs, local scrolling and printing.

Regenerate extracts only when a source region changes, using an environment with `pdfplumber`:

```bash
python3 tools/render_past_paper_extracts.py --source-dir "/Users/kw/Documents/Teaching/AS CS 9618/past-papers"
# Visually review changed extracts and record their current crop-spec hash before rendering pages.
node scripts/render-course-v3.mjs
```

Changing a crop invalidates its prior crop review; inspect the changed original and rendered region before recording the new review. Full source verification and teaching review remain separate from generation. Frequency and selection rationale belong in working documents, not student pages.

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

This frequency-extraction command writes metadata only; it does not create or verify the displayed question extracts.

## Offline release build

Build the current offline release:

```bash
node scripts/render-course-v3.mjs
python3 scripts/build-course-release.py
```

For a focused Section 2 rebuild, run `node scripts/render-course-v3.mjs --section2`. Its teaching coverage, prerequisite order, paper placement, original-source hashes, navigation and experiment models have targeted checks: `node --test scripts/course-v3-section2-classroom.test.mjs scripts/course-v3-section2-models.test.cjs`. These verify the 35 concepts, 59 objectives, 31 original units and 15 paper groups as well as the eight experiment types. Review both reading modes, answer controls, touch interaction and projection/narrow layouts in a real browser after changing them; source tests do not establish visual legibility.

Section 3 teaching coverage, question sources and simulation models have targeted tests: `node --test scripts/course-v3-section3-classroom.test.mjs scripts/course-v3-section3-models.test.cjs`. Source-PDF hash checks use `AS9618_PAST_PAPER_ROOT` when set, or the documented local teaching archive; unavailable source files produce explicit skips.

Section 4 teaching coverage, question sources and processor models have targeted tests: `node --test scripts/course-v3-section4-classroom.test.mjs scripts/course-v3-section4-models.test.cjs`. They check the 61 distinct objectives, 27 concept groups, 13 paper groups and original PDF/image hashes as well as register transfers, addressing, assembly, traces and bit operations. The same `AS9618_PAST_PAPER_ROOT` source-archive override applies.

Section 5 models, complete objective coverage, teaching prerequisites, question placement, original-PDF/extract hashes and reviewed illustrations have targeted checks: `node --test scripts/course-v3-section5-models.test.cjs scripts/course-v3-section5-interactive.test.mjs`. The source-PDF test uses `AS9618_PAST_PAPER_ROOT` or the documented local archive; it explicitly skips if that archive is unavailable. There is no full-project fixed question-count gate. After editing, regenerate and inspect both modes, all experiments, answer controls, bookmarks and projection/narrow layouts in a real browser. Keep one-off browser QA scripts outside the repository.

Section 7 has targeted coverage, source, bookmark and activity checks: `node --test scripts/course-v3-section7-classroom.test.mjs scripts/course-v3-section7-models.test.cjs`. These verify the 19 objectives, teaching prerequisites, 18 concept groups, 14 suggested sessions, eight paper groups and original PDF/image hashes, plus the six decision and calculation models. The same source-archive override and explicit skips apply. Browser acceptance covers both modes, condition changes, answer hiding, image enlargement and projection/narrow layouts.

Section 8 can be rebuilt independently with `node scripts/render-course-v3.mjs --section8`; this updates its six pages, overview, assets and contract entries. Run `node --test scripts/course-v3-section8-classroom.test.mjs scripts/course-v3-section8-models.test.cjs scripts/course-v3-section8-sql.test.mjs` for coverage, exact source hashes, interaction models and actual PostgreSQL execution. Source-PDF checks use the same `AS9618_PAST_PAPER_ROOT` override. Browser acceptance also covers route transitions, answer hiding, enlarged tables, SQL editing, state isolation and projection/narrow layouts.

The archive includes all numbered lessons, the Assessment Bank, resources and referenced visual assets.
It also includes the resource accessibility script and the eight older Section 2 bookmark routes.
After extracting the archive, open `web/index.html` in a browser. The builder expands directory links and redirects to explicit `index.html` paths inside the archive, so navigation works without a local server. The release manifest records the hashes of these packaged files.

```text
dist/AS9618-CS-2027-2029-course.zip
dist/AS9618-CS-2027-2029-course.zip.sha256
```

No remote publication is performed by the generator or release builder.

Section 9 can be regenerated independently with `node scripts/render-course-v3.mjs --section9`. This writes only its nine lesson pages, overview, local S9 assets and S9 entries in the course contract. It skips the resource-hub generator. Run `node --test scripts/course-v3-section9-classroom.test.mjs scripts/course-v3-section9-models.test.cjs`, then inspect both views, the full cross-page learning route, old bookmarks, all eight activity types, hidden answers and projection/narrow layouts in a real browser.

Section 10 can be regenerated independently without rebuilding other sections or the resource hub. The scoped command writes its fourteen lesson pages, overview, local S10 assets and S10 entries in the course contract:

```bash
node scripts/render-course-v3.mjs --section10
node --test scripts/course-v3-section10-classroom.test.mjs scripts/course-v3-section10-models.test.cjs
python3 -m http.server 8769 --directory web
```

Preview the [Section 10 overview](http://127.0.0.1:8769/course-v3/section-10/) over HTTP. The tests cover teaching prerequisites, objective and paper mappings, source identities, complete example programs and experiment behaviour. Source-PDF checks use `AS9618_PAST_PAPER_ROOT` or the documented local archive and explicitly skip when that archive is unavailable. After changing S10, inspect both views, cross-page navigation, existing bookmarks, hidden answers, input changes, history, resets and projection/narrow layouts in a real browser; passing automated tests alone does not establish visual readability.


### Section 11 classroom rebuild

```bash
node scripts/render-course-v3.mjs --section11
node --test scripts/course-v3-section11-classroom.test.mjs scripts/course-v3-section11-models.test.cjs
```

The scoped rebuild updates the twelve Section 11 lesson pages, its overview and local assets, and only its course-contract entries. It does not regenerate the resource hub or other chapters. Preview `/course-v3/section-11/` using the local HTTP server above. Browser acceptance covers the full prerequisite route, both views, editable experiments, previous/reset behaviour, separate hidden answers, material enlargement and projection/narrow layouts. Original-PDF checks use `AS9618_PAST_PAPER_ROOT` when provided and explicitly report a skip if the archive is unavailable.


### Section 12 classroom rebuild

```bash
node scripts/render-course-v3.mjs --section12
node --test scripts/course-v3-section12-classroom.test.mjs scripts/course-v3-section12-models.test.cjs
python3 -m http.server 8906 --bind 127.0.0.1 --directory web
```

The scoped rebuild updates only the nine Section 12 lesson pages, its overview, local assets and Section 12 course-contract entries. It skips the resource hub and preserves other chapters. Preview `/course-v3/section-12/`. Browser acceptance covers the complete concept route, both views, editable experiments, previous/reset, hidden answers, old question bookmarks, enlarged material, and laptop/projection/narrow layouts. Source-PDF tests use `AS9618_PAST_PAPER_ROOT` or the documented local archive, and explicitly skip missing archives. The generated scene's exact prompt and image identity are recorded in `scripts/course-v3-section12-classroom-images.json`.

### Section 1 classroom rebuild

```bash
node scripts/render-course-v3.mjs --section1
node --test scripts/course-v3-section1-classroom.test.mjs scripts/course-v3-section1-models.test.cjs
```

The scoped rebuild updates only the six Section 1 lesson pages, its overview, local Section 1 assets and Section 1 course-contract entries. It preserves the resource hub and other chapters. Preview `/course-v3/section-1/` using the local server above. Check all concepts in both modes, cross-page Previous/Next, existing bookmarks, hidden answers, experiment input changes and resets, image/table/paper enlargement, and projection/narrow layouts in a real browser. Source-PDF checks use `AS9618_PAST_PAPER_ROOT` when supplied, otherwise the documented local teaching archive, and explicitly report unavailable sources. Automated tests do not establish actual classroom HDMI readability.
