# Course V2 teaching-depth audit

Audit date: 1 September 2026

Scope: all 90 active lessons; 142 teaching knowledge-point instances; Lessons 045 and 090 as integrated-review lessons

Standard: independently teachable Cambridge 9618 AS content, not lexical presence

Repository state reviewed: `3bc17ee Complete point-level materials across course`

> Remediation status: this file records the pre-remediation baseline. The repair has now been implemented; current closure evidence and verification results are recorded in `audits/course-v2-teaching-depth-remediation.md`. The CSV ledger remains a baseline defect ledger so that the original findings are auditable.

## Baseline conclusion

The pre-remediation course was not independently teachable as published. The problem was systemic rather than confined to Lesson 006.

The active acceptance script reports 90 lessons, 121 requirements and 88 completed teaching lessons as `PASS`, but that result establishes inventory coverage only. It does not establish that a learner is taught each requirement. Across the 142 teaching knowledge-point instances, this audit records:

| Result | Knowledge points | Meaning |
|---|---:|---|
| P0 | 11 | Required teaching is missing, materially wrong, cross-contaminated or unsupported by practice |
| P1 | 66 | The point is named but lacks a complete visible explanation, method, example or practice loop |
| P2 | 65 | Most core facts are present, but delivery remains generic, hidden, visual-first or truncated |
| Pass | 2 | The visible explanation, example and practice form a defensible independent-teaching loop |
| **Total** | **144** | 142 teaching instances plus the two integrated-review lessons |

At lesson level, applying the highest severity found on each page produces 10 P0 lessons, 48 P1 lessons and 32 P2 lessons. No complete lesson currently passes the independent-teaching standard.

Confidence is high for the systemic conclusion and all P0 findings. P1/P2 distinctions are prioritisation judgments: they do not change the conclusion that remediation is required.

## What counted as teaching

A syllabus objective counts as taught only when the default lesson flow contains all applicable elements:

1. a technically accurate explanation in learner-facing prose;
2. a mechanism, causal chain, calculation, trace or construction process appropriate to the command word;
3. a complete concrete example, including intermediate states where the objective requires a method;
4. at least one question that actually exercises the objective; and
5. a rendered presentation that does not rely on a collapsed details block, answer disclosure or undiscovered carousel item for the essential teaching.

An objective did not receive credit merely because its keyword occurred in the syllabus heading, a diagram title, `coreFacts`, a model answer or a coverage contract.

The official 2027–2029 requirement text and Notes and guidance in `scripts/syllabus-coverage-contract.json` were the scope boundary. The two untracked reference books were treated as read-only secondary context; they were not used to expand the syllabus.

## Root causes

### 1. Generic material generation is being mistaken for authored teaching

`scripts/generate-course-v2-knowledge-materials.mjs` generates the majority of non-Section-1 cards by ranking words and clauses from the whole lesson. Its fallback process labels are generic (`Meaning / Mechanism / Application`, `Input / Mechanism / Result`, `Plan / Execute / Test`, and similar). This causes two failure modes:

- the requirement is restated instead of explained; and
- a clause belonging to another knowledge point in the same consolidated lesson is paired with the wrong label.

Eighty-two lessons contain these generic knowledge-point profiles. A structural review found at least three requirement-restatement components in 120 of the 142 teaching instances. That figure is a review trigger, not an automatic severity decision.

### 2. The verifier checks existence and counts, not teaching semantics

`scripts/verify-course-v2.mjs` requires `coreFacts.length >= 4`, three questions per teaching lesson, one material object per syllabus ID and a `complete` status. It does not verify:

- atomic sub-requirements;
- whether content is default-visible;
- whether label and explanation are semantically related;
- whether a worked example survives rendering; or
- whether a question actually assesses the syllabus ID to which it is credited.

The command `node scripts/verify-course-v2.mjs` therefore returned `PASS` while every P0 defect below was present.

### 3. Worked examples are destructively parsed

`scripts/render-course-v2.mjs` turns one long `workedExample` string into at most five fragments, splits on punctuation and slashes, and truncates fragments at 30 words. Consequences include:

- Lesson 006 ending its four-file example with an ellipsis before all methods are explained;
- Lessons 010–012 showing five exercise headings while dropping the explanatory text after the colon; and
- 25 lessons rendering at least one visibly truncated worked-example fragment.

### 4. Lesson-level question assignment creates false coverage

The active coverage contract assigns every question in a lesson to every syllabus ID taught by that lesson. This produces false positives. Confirmed examples include S2.14, S8.11 and S11.07 receiving three credited questions even though none of those questions contains the required concept.

### 5. Visual ownership is not teaching completeness

The visual register correctly assigns an image owner, but a diagram is counted alongside three native materials as if that established teaching depth. On Lesson 006, the learner initially sees `1 / 4`; RLE is the fourth item. The carousel works technically, but the essential method is neither taught in the default prose nor made discoverable as a required step.

## Confirmed P0 findings

### Lesson 006 — S1.11 file compression

- The visible prose distinguishes lossy and lossless only at definition level.
- RLE has one compact `AAAABB → 4A2B` cue; decoding, run boundaries, representation overhead, effectiveness and an unsuitable-data counterexample are not taught as a worked process.
- File-type choices are compressed into one truncated worked-example sentence. The learner is not shown separate text, bitmap, vector and sound reasoning.
- The RLE diagram is carousel item 4 of 4. The diagram transcript contains more method detail than the default explanation.
- Required repair: teach an encode/decode table with intermediate runs and an overhead counterexample; teach text as normally lossless, bitmap as lossless RLE or controlled lossy detail reduction, vector as reference/redundancy reduction, and sound as exact pattern coding or perceptual loss. Do not imply that ordinary text is a suitable lossy-compression target.

### Lesson 011 — S2.14 internet-supporting connections

- Modem, PSTN, dedicated line and cellular-network content is broad and partly hidden.
- None of the three lesson questions exercises those required concepts.
- Required repair: add a visible end-device-to-provider signal path, distinguish the four access mechanisms, and replace one unrelated question with a scenario comparison.

### Lesson 012 — S2.15 IP addressing and S2.16 URL/DNS

- The S2.15 concept map pairs `dynamic addresses` with a URL-path statement and pairs `128-bit` with a PSTN/dedicated-line statement.
- The mechanism is incorrectly framed as a security-control workflow rather than address format, allocation, subnetting and routing use.
- Only 3 of 11 atomic S2.15 objectives have substantive default-visible teaching; six further objectives occur only in collapsed facts.
- The questions cover subnetting, static addressing and a NIC. They do not teach or test the URL/DNS flow and do not cover most IPv4/IPv6, public/private or dynamic-address requirements.
- Required repair: replace both generated cards with separately authored IP and URL/DNS units, then give each unit its own worked trace and question.

### Lesson 014 — S3.03 device operation

- The syllabus requires the principal operation of nine devices. The default flow substantively covers only a subset; four device objectives depend on collapsed facts.
- The generic three-step mechanism lists device names instead of tracing energy/data transformations.
- Required repair: use nine compact mechanism rows, each with input, conversion/storage action and output; add a comparison/selection exercise that samples the currently unassessed devices.

### Lesson 018 — S3.10 Boolean representation conversion

- The default card contains no substantive non-restatement teaching for the audited objective; all 11 atomic objectives are recoverable only from collapsed facts or the answer area.
- NAND, NOR and XOR functions are not independently taught on this page, and there is no full worked conversion among statement, expression, circuit and truth table.
- Required repair: add gate definitions and truth rows, then one four-representation worked example with named intermediate columns.

### Lesson 024 — S4.13 instruction set

- The requirement contains 19 instruction/semantic groups. Seven are hidden-only and the questions cover fewer than half.
- A list of mnemonics is not an explanation of operand effects, flags and branches.
- Required repair: provide a semantic reference table plus a complete register/memory trace that uses representative load, arithmetic, compare and branch instructions; directly practise the omitted mnemonics.

### Lesson 044 — S8.11 INSERT, DELETE and UPDATE

- The three statements have useful diagrams, but none of the three lesson questions assesses INSERT, DELETE or UPDATE.
- The current coverage contract nevertheless credits all three questions to S8.11.
- Required repair: replace one unrelated query question with a three-part data-maintenance task and bind it explicitly to S8.11 atomic objectives.

### Lessons 060 and 061 — S10.06 linear search and bubble sort

- The requirement is to write complete algorithms. The visible worked material is prose, not complete Cambridge pseudocode.
- Lesson 061 asks about one adjacent comparison, not construction of a complete bubble-sort algorithm.
- Required repair: show complete bounded pseudocode, an array-state trace, initialisation and stopping conditions; require learners to write and then test the full algorithm.

### Lesson 080 — S11.07 functions

- Functions and return values appear in explanation prose, but none of the three questions assesses them.
- The lesson-level coverage contract still credits all three questions to S11.07.
- Required repair: add a function-definition-and-call task whose returned value is used in an expression, while preserving a separate procedure/BYREF question.

## Section results

| Section | P0 | P1 | P2 | Pass | Main risk |
|---:|---:|---:|---:|---:|---|
| 1 Information representation | 1 | 7 | 1 | 2 | Compression depth, applications, truncated examples |
| 2 Communication | 3 | 9 | 4 | Cross-topic generation, unassessed compound requirements |
| 3 Hardware | 2 | 3 | 6 | Device/gate lists without mechanisms |
| 4 Processor fundamentals | 1 | 8 | 6 | Hidden register/instruction semantics and incomplete traces |
| 5 System software | 0 | 4 | 3 | Translator and IDE comparisons lack complete teaching loops |
| 6 Security and integrity | 0 | 3 | 5 | Large method lists are under-practised |
| 7 Ethics and ownership | 0 | 2 | 4 | Generic stakeholder/decision templates |
| 8 Databases | 1 | 9 | 2 | Large SQL/DBMS objectives and false question coverage |
| 9 Algorithm design | 0 | 3 | 9 | Generic process cards; examples frequently truncated |
| 10 Data structures | 2 | 7 | 11 | Operational objectives described rather than written/traced |
| 11 Programming | 1 | 8 | 7 | Construct-specific lessons inherit unrelated objective text |
| 12 Software development | 0 | 3 | 7 | Broad test-method lists and generic review material |

## Lesson-by-lesson disposition

The detailed evidence for every syllabus instance is in `course-v2-teaching-depth-ledger.csv`. This table reports the highest severity on each lesson and fixes the order of work.

| Lesson | Result | Primary repair |
|---:|---|---|
| 001 | P1 | Promote every binary/decimal prefix and conversion example into the visible flow |
| 002 | P1 | Add a complete signed/base conversion method; retain the strong representation comparison |
| 003 | P1 | Teach binary addition and subtraction explicitly before overflow practice |
| 004 | P1 | Add digital-clock, memory-address and hexadecimal application explanations |
| 005 | P1 | Explain vector encoding and application choice outside collapsed facts |
| 006 | P0 | Rebuild compression as separate RLE, file-type and lossy/lossless teaching units |
| 007 | P1 | Separate LAN/WAN, client-server/peer-to-peer and thin/thick-client mechanisms and questions |
| 008 | P1 | Add a complete packet journey for each required topology and justification |
| 009 | P1 | Repair wired/wireless practice and remove truncation from cloud/media examples |
| 010 | P1 | Restore the dropped worked-example explanations and practise all LAN devices |
| 011 | P0 | Teach and assess streaming plus every internet access mechanism |
| 012 | P0 | Replace contaminated IP card and add an independent URL/DNS teaching/practice loop |
| 013 | P1 | Make component roles and data flow visible; restore the complete embedded-system example |
| 014 | P0 | Give all nine devices an input–mechanism–output explanation |
| 015 | P2 | Replace generic comparison steps with buffer, SRAM/DRAM and ROM-family mechanisms |
| 016 | P1 | Show monitoring versus control feedback and sensor selection in separate examples |
| 017 | P1 | Teach every gate function and symbol before conversion practice |
| 018 | P0 | Build a full statement–expression–circuit–truth-table worked conversion |
| 019 | P1 | Promote stored-program and register-transfer details; retain a complete untruncated trace |
| 020 | P1 | Explain address-space and performance effects rather than list bus/CPU factors |
| 021 | P1 | Put the complete register-transfer fetch/execute sequence in the visible flow |
| 022 | P1 | Expand interrupt detection, saved state, ISR and restoration as a complete timeline |
| 023 | P1 | Separate assembly/machine-code relationship from the two-pass assembler process |
| 024 | P0 | Provide complete instruction semantics and a checked execution trace |
| 025 | P1 | Show each mask operation and shift with before/after bit patterns |
| 026 | P2 | Replace generic security framing with OS service request-to-resource flows |
| 027 | P1 | Give libraries/dynamic linking their own mechanism and assessment evidence |
| 028 | P2 | Add a source-to-execution comparison trace for assembler/compiler/interpreter |
| 029 | P1 | Rebalance practice toward compiler/interpreter trade-offs and Java's two stages |
| 030 | P1 | Demonstrate all required IDE features on one debugging session |
| 031 | P2 | Use one scenario to distinguish security, privacy and integrity consequences |
| 032 | P2 | Map each threat to mechanism, symptom, control and limitation |
| 033 | P1 | Promote password, signature, biometric, anti-malware and encryption mechanisms |
| 034 | P1 | Add explicit visual/double-entry, parity and checksum procedures and practice |
| 035 | P1 | Explain what BCS/IEEE membership changes in professional conduct |
| 036 | P2 | Replace generic ethics steps with a two-sided stakeholder consequence chain |
| 037 | P2 | Add a licence-choice decision table with enforceable rights and restrictions |
| 038 | P1 | Separate AI applications from social, economic and environmental causal impacts |
| 039 | P1 | Teach every database term and relationship through one coherent schema |
| 040 | P1 | Show 1NF→2NF→3NF decomposition with dependencies and reconstructed keys |
| 041 | P1 | Separate DBMS components and show request flow through interface/query processor |
| 042 | P1 | Demonstrate DDL versus DML on the same database instead of listing statements |
| 043 | P1 | Parse each SQL clause, then write and trace a two-table query |
| 044 | P0 | Add real DML practice and complete DDL examples with all required types/keys |
| 045 | P1 | Replace four-label review lanes with retrieval prompts, model corrections and section evidence |
| 046 | P1 | Show abstraction decisions and the resulting abstract model explicitly |
| 047 | P2 | Turn the generic module card into a responsibility/interface decomposition example |
| 048 | P2 | Build an identifier table and connect each field to algorithm meaning |
| 049 | P2 | Carry one IPO table through to complete pseudocode and a test |
| 050 | P2 | Demonstrate nested sequence, selection and iteration with a trace |
| 051 | P1 | Convert the same algorithm among all three required representations |
| 052 | P2 | Show at least three refinement levels and termination at executable steps |
| 053 | P2 | Construct and interpret logic statements in a traced algorithm context |
| 054 | P1 | Restore the full integrated example and keep decomposition/refinement evidence distinct |
| 055 | P2 | Remove truncation and show declaration syntax for every Cambridge type |
| 056 | P2 | Define, populate, read and save one record with named fields |
| 057 | P2 | Demonstrate declared bounds, valid indexes and one out-of-bounds failure |
| 058 | P1 | Require selection and complete use of a one-dimensional array |
| 059 | P2 | Provide complete two-dimensional declaration, traversal and update pseudocode |
| 060 | P0 | Teach, write and trace a complete bounded linear-search algorithm |
| 061 | P0 | Teach, write and trace a complete bubble-sort algorithm |
| 062 | P2 | Show the full open/read/write/close lifecycle and error-safe file use |
| 063 | P2 | Separate ADT interface from implementation with permitted-operation examples |
| 064 | P2 | Keep the stack example focused on top pointer, overflow and underflow |
| 065 | P1 | Give queue/front/rear behaviour and circular-array operations their own example |
| 066 | P1 | Show data/link arrays, start pointer, free list, insertion and deletion diagrams |
| 067 | P1 | Demonstrate add/edit/delete state changes rather than repeat the shared ADT summary |
| 068 | P1 | Compare structures through scenario constraints and justify the chosen operations |
| 069 | P2 | Translate one complete flowchart/structured-English design and trace equivalence |
| 070 | P2 | Remove truncation and show declarations, input, assignment and output together |
| 071 | P1 | Promote arithmetic/logical precedence and expression evaluation into visible teaching |
| 072 | P2 | Demonstrate supplied string-function syntax and returned values in expressions |
| 073 | P1 | Focus the page on IF/ELSE/nested IF/CASE and stop inheriting loop content |
| 074 | P1 | Focus the page on complete FOR-loop syntax, bounds and counter traces |
| 075 | P1 | Focus the page on WHILE/REPEAT execution counts and stopping conditions |
| 076 | P1 | Give scenario-linked loop-selection justifications, including zero-versus-one execution |
| 077 | P2 | Trace BYVAL and BYREF state changes through caller and procedure |
| 078 | P2 | Distinguish procedure/function interfaces and use a return value in an expression |
| 079 | P1 | Replace generic clarity claims with before/after pseudocode and efficiency evidence |
| 080 | P0 | Add function practice and separate four inherited syllabus objectives into coherent units |
| 081 | P1 | Compare waterfall, iterative and RAD through stages, feedback and scenario fit |
| 082 | P2 | Construct one structure chart and derive matching module pseudocode |
| 083 | P2 | Explain purpose with a complete state/event/transition example |
| 084 | P2 | Diagnose and correct one syntax, logic and runtime error with observed behaviour |
| 085 | P1 | Teach and assess all nine testing approaches, including stub and acceptance testing |
| 086 | P2 | Contrast strategy and plan, then annotate a complete example of each |
| 087 | P2 | Derive normal, abnormal and boundary data from an explicit validation rule |
| 088 | P2 | Classify maintenance by cause and add regression-test consequences |
| 089 | P2 | Trace analyse–locate–amend–retest on one existing program |
| 090 | P1 | Replace topic-label review lanes with Paper 2 construction, trace and correction tasks |

## Remediation design

### R1 — replace keyword-generated teaching with curated units

Create a manually reviewed source record for each lesson/requirement instance. Each record must contain:

- `atomicObjectives`: exact syllabus obligations;
- `explanations`: default-visible concept and causal/mechanism prose;
- `mechanismSteps`: concept-specific ordered steps;
- `workedExamples`: structured examples with intermediate states and results;
- `misconceptions`: technically specific corrections; and
- `questionIds`: explicit objective-to-question ownership.

The generator may format these fields but must not invent semantic pairings by keyword ranking.

### R2 — make worked examples structural data

Replace the single `workedExample` string with an array of titled examples and ordered steps. The renderer must not split author text on punctuation or impose a silent five-fragment limit. Truncation is forbidden in core examples.

### R3 — replace lesson-level question credit

Each question must declare the exact atomic objective IDs it assesses. A lesson may contain a question that supports one knowledge point without being credited to every point on the page. The gate must reject a required objective with no mapped question.

### R4 — treat visuals as supplements

Images may illustrate, compare or recap an explanation. A visual title, alt text or collapsed transcript cannot be the only teaching evidence for a core objective. When several visuals are in a carousel, the prose before the carousel must enumerate the required concepts and tell the learner what each visual is for.

### R5 — make summaries lesson-specific

Replace generic summary lines such as “use the exact technical term” with retrieval statements that name the concepts and method decisions from that lesson. Each summary must correct at least one observed misconception.

## Implementation sequence after approval

1. **P0 closure:** Lessons 006, 011, 012, 014, 018, 024, 044, 060, 061 and 080; add gate fixtures for every confirmed failure.
2. **P1 closure:** work section by section, keeping atomic objectives and question ownership explicit. Do not bulk-generate prose.
3. **P2 closure:** improve visible depth, worked-example structure, carousel signposting and lesson-specific summaries.
4. **Review lessons:** rebuild 045 and 090 only after their contributing teaching lessons pass, so review tasks do not conceal upstream gaps.
5. **Final QA:** regenerate Markdown and HTML, run the full repository verifier, run the teaching-depth course gate, and browser-review all 90 lessons.

## Acceptance tests for the future remediation

The audit verifier supplied with this report validates ledger completeness. The baseline course failed `--course-gate`; the remediated course must make the gate pass and must fail mutation tests that:

- remove the RLE encoding/decoding explanation;
- move file-type application teaching into a collapsed block;
- place DNS or PSTN content inside the S2.15 IP-address unit;
- remove INSERT/DELETE/UPDATE question ownership;
- remove function/return-value question ownership; or
- cause a worked example to contain a rendered ellipsis or lose authored steps.

Rendered acceptance is: all 90 lesson URLs load with the correct title and non-empty teaching content; no relevant console warning/error; no framework overlay; every P0/P1 page and at least one page per syllabus section reviewed at desktop and 390 px; and carousel controls verified where critical diagrams remain supplementary.

## Scope boundary

The audit phase added only audit artifacts and an audit verifier. The subsequent authorised remediation changed lesson Markdown, content contracts, generators and rendered HTML/CSS, but did not alter Git history or any remote. The untracked `参考书籍/` directory remains untouched.
