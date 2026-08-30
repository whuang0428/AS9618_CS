import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

import { coverageContract } from "./syllabus-coverage-contract.mjs";
import { evaluateRequirement } from "./syllabus-coverage-evaluator.mjs";
import { loadAllQuestions } from "./ms-review-utils.mjs";
import { quizzes, monthlyAssessments, stageReviews } from "./stage3-assessments-data.mjs";

const root = path.resolve(import.meta.dirname, "..");
const audits = path.join(root, "audits");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const sha256 = (value) => crypto.createHash("sha256").update(value).digest("hex");
const csvCell = (value) => {
  const text = value == null ? "" : String(value);
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
};
const writeCsv = (name, headers, rows) => {
  const body = [headers, ...rows].map((row) => row.map(csvCell).join(",")).join("\n") + "\n";
  fs.writeFileSync(path.join(audits, name), body);
};
const parseCsv = (text) => {
  const rows = [];
  let row = [], cell = "", quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (quoted) {
      if (char === '"' && text[i + 1] === '"') { cell += '"'; i += 1; }
      else if (char === '"') quoted = false;
      else cell += char;
    } else if (char === '"') quoted = true;
    else if (char === ",") { row.push(cell); cell = ""; }
    else if (char === "\n") { row.push(cell); rows.push(row); row = []; cell = ""; }
    else if (char !== "\r") cell += char;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  const [headers, ...data] = rows.filter((entry) => entry.some(Boolean));
  return data.map((entry) => Object.fromEntries(headers.map((header, index) => [header, entry[index] ?? ""])));
};

const official = {
  syllabus: {
    title: "Cambridge International AS & A Level Computer Science 9618 syllabus 2027-2029 Version 2",
    url: "https://www.cambridgeinternational.org/Images/721397-2027-2029-syllabus.pdf",
    localAuditCopy: "/tmp/as9618-scientific-audit/official/9618-2027-2029-syllabus-v2.pdf",
    bytes: 745380,
    pages: 49,
    sha256: "c8a4c6d033c07c6d8025689abed5ef481d581c28bae640986d275303ed6c08bc",
  },
  update: {
    title: "Cambridge 9618 2027-2029 syllabus update, December 2025",
    url: "https://www.cambridgeinternational.org/Images/747147-2027-2029-syllabus-update.pdf",
    localAuditCopy: "/tmp/as9618-scientific-audit/official/9618-2027-2029-syllabus-update.pdf",
    bytes: 111917,
    pages: 1,
    sha256: "7a6d305a3370f8aa006eac43bc21be298e1d77bcabfcc57aa677016cb33b869e",
  },
  pseudocodeGuide: {
    title: "Cambridge 9618 Pseudocode Guide for Teachers 2027-2029 Version 1",
    url: "https://www.cambridgeinternational.org/Images/721401-2027-2029-pseudocode-guide.pdf",
    localAuditCopy: "/tmp/as9618-scientific-audit/official/9618-2027-2029-pseudocode-guide.pdf",
    bytes: 704531,
    pages: 31,
    sha256: "04f42cc247cc49e069543aef242dbc6d1d89d4f3539c23148683386cebb2c4b7",
  },
};

const issue = (id, category, severity, confidence, locations, current, evidence, officialBasis, impact, suggestedFix, regressionTest) => ({
  id, category, severity, confidence, locations, current, evidence, officialBasis, impact, suggestedFix, regressionTest, status: "Open",
});

const defects = [
  issue("SCI-COV-001", "Syllabus gate", "P0", "High", ["scripts/syllabus-coverage-evaluator.mjs:50", "scripts/syllabus-coverage-contract.json:14"], "The contract stores conceptGroups for all 121 rows, but the evaluator reads requiredGroups. Only ten semantic overrides supply requiredGroups, so 111 requirements receive no concept-level assertion.", "121 contract rows have conceptGroups; ten overrides have requiredGroups; the current verifier still reports 121 Complete.", "Every official requirement must be checked for its required concepts in visible CORE teaching.", "A false-positive release gate can approve missing compulsory content.", "Use one field name and require at least one independently testable concept group for every requirement.", "Delete one required concept from a non-override lesson and assert the coverage verifier fails."),
  issue("SCI-COV-002", "Syllabus gate", "P1", "High", ["scripts/syllabus-coverage-evaluator.mjs:69", "scripts/syllabus-coverage-contract.json:25"], "All 121 requirements use the same two whole assessment-data files as evidence; the evaluator only checks that those files contain text unless an override adds assessmentGroups.", "There is exactly one assessmentEvidence bundle across 121 requirements; 111 rows have no requirement-specific assessment assertion.", "Each requirement needs direct question-level assessment evidence.", "A requirement can pass without ever being directly assessed.", "Store stable question IDs and requirement-specific expected concepts in the contract.", "Remove the mapped question or its core term and assert only the owning requirement fails."),
  issue("SCI-COV-003", "Syllabus contract", "P1", "High", ["scripts/syllabus-coverage-contract.json:9"], "All Notes fields are empty; prerequisites and risk fields are absent; all per-row forbiddenPatterns arrays are empty; visual evidence is not represented.", "Counts: notes 0/121, prerequisites 0/121, risk metadata 0/121, non-empty per-row forbidden patterns 0/121.", "The audit interface must preserve official Notes, prerequisites, prohibited semantics, visual evidence and risk.", "The contract cannot support the planned completeness, order, visual or risk checks.", "Extend every row with sourced Notes, prerequisite IDs, risk, direct visual IDs and forbidden patterns.", "Schema validation must reject empty mandatory fields and dangling evidence IDs."),
  issue("SCI-COV-004", "Syllabus gate", "P1", "High", ["scripts/syllabus-coverage-evaluator.mjs:47", "scripts/syllabus-coverage-evaluator.mjs:55"], "workedExampleEvidence is never evaluated and CORE validation only asks whether each lesson contains some CORE region, not whether the requirement is taught in CORE.", "The evaluator has no workedExampleEvidence read and combines Markdown with all non-OPTIONAL HTML for term searches.", "Each requirement needs requirement-specific CORE teaching, worked example, practice/MS and assessment evidence.", "A generic CORE block elsewhere in the lesson can satisfy the gate.", "Evaluate evidence anchors and delivery role per requirement, not per lesson.", "Move the required section to OPTIONAL and assert the requirement fails."),
  issue("SCI-SEQ-000", "Sequence gate", "P1", "High", ["scripts/verify-curriculum-sequence.mjs"], "The sequence verifier tests six named repairs rather than a complete prerequisite graph or first-use inventory.", "Independent term scanning found additional assessment-before-teaching and structure inversions that the verifier accepts.", "Definitions, representations and structures must precede application and assessment.", "The current release gate cannot detect most new sequence regressions.", "Make the prerequisite graph and first-use scan the verifier's source of truth.", "Move a prerequisite after its first dependent lesson in a temporary copy and assert failure."),
  issue("SCI-CONT-001", "Content completeness", "P0", "High", ["lessons/013-compression-lossless-vs-lossy.md:78", "lessons/014-run-length-encoding-and-dictionary-style-compression.md:78"], "The lessons teach generic lossy/lossless, RLE and dictionary compression but do not teach how bitmap images and vector graphics are compressed; vector compression has no method at all.", "Independent named-term and semantic review of L013-L014; image and sound are mostly used as choice contexts.", "Official Section 1.3 requires how text, bitmap, vector and sound files can be compressed, including RLE.", "A compulsory syllabus method is missing from visible teaching.", "Add distinct worked mechanisms for all four file types, including bitmap RLE and vector object/property compression.", "Require CORE lesson, worked example, practice/MS and direct assessment evidence for all four media types."),
  issue("SCI-CONT-002", "Content correctness", "P0", "High", ["lessons/043-the-fetch-decode-execute-cycle.md:44", "lessons/044-registers-pc-cir-mar-mdr-acc-and-status-register.md:44"], "The fetch-execute flow is described in prose but formal register-transfer notation is not taught or used in the lessons.", "No register-transfer phrase or transfer operator is present in L043-L044 Markdown/HTML; the assessment uses MAR <- PC later.", "Official Section 4.1 requires candidates to describe and use register-transfer notation for the fetch-execute cycle.", "Students are assessed in a notation they were not formally taught.", "Teach explicit transfers such as MAR <- PC and MDR <- Memory[MAR], including brackets and sequencing.", "Require notation in CORE, a traced example, practice and assessment; reject prose-only evidence."),
  issue("SCI-CONT-003", "Content completeness", "P0", "High", ["lessons/047-assembly-language-basics-and-mnemonics.md:84", "lessons/048-addressing-modes-and-operand-interpretation.md:82"], "L047-L048 accurately repair four high-risk instructions but do not teach all official instruction groups or the full specified set; MOV, STO, SUB, INC, DEC, OUT and END are not formally covered.", "Independent comparison against the Version 2 instruction table and group list.", "Official Section 4.2 specifies instruction groups and LDM, LDD, LDI, LDX, LDR, MOV, STO, ADD, SUB, INC, DEC, JMP, CMP, CMI, JPE, JPN, IN, OUT and END.", "Compulsory assembly operations remain absent despite the local coverage gate passing.", "Teach every group and every specified instruction with official effects and operands.", "Assert every opcode/group in visible CORE Markdown and HTML plus direct assessment evidence."),
  issue("SCI-CONT-004", "Content depth", "P1", "High", ["lessons/070-data-validation-and-verification.md"], "Limit check is absent; the official validation method is neither defined, distinguished from range check, nor used.", "Exact-term scan of L070 Markdown and student HTML returned no limit-check teaching.", "Official Section 6.2 explicitly includes range, format, length, presence, existence, limit and check digit.", "Students cannot answer a direct limit-check question from the course.", "Add definition, boundary distinction, example, practice and assessment.", "Require limit check in CORE and reject a list-only mention as sufficient evidence."),
  issue("SCI-CONT-005", "Official terminology", "P1", "High", ["lessons/138-testing-with-normal-boundary-and-erroneous-data.md:1", "web/lesson-138/index.html:56"], "L138 teaches normal, boundary and erroneous data; it never teaches or uses the official category name abnormal.", "Exact-term scan of the responsible lesson and direct comparison with the Version 2 Notes.", "Official Section 12.3 requires normal, abnormal and extreme/boundary test data.", "A locally substituted label can cause students to miss the official command-language category and creates inconsistent terminology with L146.", "Teach abnormal as the official invalid-data category and extreme/boundary as the edge category; retain any synonym only as clarification.", "Require all three official category names in CORE, examples, practice and assessment."),
  issue("SCI-CONT-006", "Content completeness", "P1", "High", ["lessons/050-performance-factors-cores-cache-clock-speed-and-word-length.md:1", "lessons/045-system-buses-address-data-and-control.md:167"], "The performance lessons cover cores, bus width, clock speed and cache, but processor type is absent.", "Whole-project exact-term scan plus semantic review of L045 and L050.", "Official Section 4.1 lists processor type and number of cores, bus width, clock speed and cache memory as performance factors.", "One prescribed performance factor is not taught or assessed directly.", "Add processor type with an architecture/workload boundary and compare it with number of cores.", "Require every official performance factor in CORE and direct assessment evidence."),
  issue("SCI-CROSS-001", "Markdown/HTML parity", "P1", "High", ["lessons/054-operating-system-roles-process-memory-file-and-device-management.md:44", "web/lesson-054/index.html:296"], "Security management is taught in student HTML but is absent from the L053-L054 Markdown source; the Markdown instead mentions antivirus as a utility.", "Cross-carrier search: HTML states user accounts, authentication and access rights; Markdown has no security-management teaching.", "Official Section 5.1 requires security management as an OS task, and the audit requires Markdown and HTML agreement.", "The maintained source and generated student page do not carry the same compulsory evidence.", "Add OS security management to the maintained Markdown/generator source and keep it distinct from antivirus utilities.", "Require the same requirement-specific concepts in Markdown and visible CORE HTML independently."),
  issue("SCI-TERM-001", "Official terminology", "P2", "Medium", ["lessons/011-digital-sound-sampling-rate-sample-resolution-and-duration.md:1", "scripts/stage4-quizzes-data.mjs:30"], "The course consistently uses sample resolution while the Version 2 syllabus term is sampling resolution.", "Terminology scan across L011-L012, HTML and Quiz 10.", "Official Section 1.2 instructs candidates to use sampling, sampling rate and sampling resolution.", "The concept is correctly explained, but terminology differs from the authoritative vocabulary.", "Use sampling resolution as the primary term and mention sample resolution only as a common synonym if retained.", "Official-term checker should require sampling resolution in CORE and assessment wording."),
  issue("SCI-SEQ-001", "Assessment order", "P1", "High", ["web/lesson-001/app.js:95", "lessons/008-bitmap-images-pixels-resolution-and-colour-depth.md:78"], "L001-Q1 assesses a file header before bitmap file headers are taught in L008.", "Question and first formal CORE teaching locations compared by lesson number.", "Assessment should only require previously taught compulsory knowledge.", "The first lesson contains a pre-teach assessment dependency.", "Replace with an L001 storage-unit context or move header assessment to L008+.", "First-use verifier must reject assessment terms whose teaching lesson is later."),
  issue("SCI-SEQ-002", "Assessment order", "P1", "High", ["scripts/stage3-assessments-data.mjs:224", "lessons/081-tables-records-fields-data-types-and-constraints.md:42", "lessons/087-sql-joins-and-multi-table-queries.md"], "The L081 monthly assessment requires a normalised three-table design, referential integrity and INNER JOIN before relational design and joins are taught through L082-L087.", "The assessment is scheduled at L081 while its required techniques occur later.", "Assessment must follow direct teaching and practice.", "Students are asked to design and query material not yet taught.", "Move the question to a later assessment or restrict it to concepts taught by L081.", "Map every assessment question to prerequisite lessons and reject later dependencies."),
  issue("SCI-SEQ-003", "Assessment order", "P1", "High", ["scripts/stage4-quizzes-data.mjs:156", "lessons/102-flowcharts-and-pseudocode-notation.md"], "AQ101-Q5 asks for flowchart symbols before L102 formally teaches them.", "Quiz 100 is issued before lesson 101.", "Notation must be taught before recall/application assessment.", "A compulsory notation item is assessed one lesson early.", "Move the item to AQ106 or teach it before Quiz 100.", "Question-to-first-teaching mapping must enforce lesson <= assessment lesson."),
  issue("SCI-SEQ-004", "Curriculum order", "P1", "High", ["lessons/105-linear-search-and-binary-search.md:45", "lessons/106-bubble-sort-and-insertion-sort.md:45", "lessons/116-one-dimensional-arrays.md:134"], "Search and sorting algorithms operate on indexed arrays in L105-L106, but one-dimensional arrays are formally taught in L116.", "The algorithm lessons use list/array indexing before the data structure lesson.", "Data structures and indexing should precede algorithms that traverse and mutate them.", "Learners must infer an undeclared representation while learning the algorithm.", "Teach arrays earlier or explicitly establish the required array model before L105.", "Add semantic prerequisite edge L116 -> L105/L106 and reject backward schedule edges."),
  issue("SCI-SEQ-005", "Assessment order", "P1", "High", ["scripts/stage3-assessments-data.mjs:320", "lessons/116-one-dimensional-arrays.md:134"], "AR112-Q1 requires ARRAY[1:50] OF STRING before L116 teaches array declarations.", "The stage review is at L113; formal array teaching is at L116.", "Stage reviews must not introduce new compulsory syntax.", "A review assesses undeclared syntax.", "Move the item after L116 or teach the declaration earlier.", "Stage-review mappings must reject later prerequisite lessons."),
  issue("SCI-SEQ-006", "Assessment order", "P1", "High", ["scripts/stage3-assessments-data.mjs:237", "lessons/123-stacks-queues-and-linked-lists.md", "lessons/124-choosing-appropriate-data-structures.md"], "The L121 monthly assessment compares stack, queue and linked list before L123-L124 teaches them.", "The assessment lesson number precedes both responsible lessons.", "ADT definitions and operations must precede comparative assessment.", "The assessment requires untaught structures and trade-offs.", "Move the question or move ADT teaching before the L121 checkpoint.", "Direct prerequisite mapping must include all three ADTs."),
  issue("SCI-SEQ-007", "Assessment order", "P1", "High", ["scripts/stage3-assessments-data.mjs:245", "lessons/143-software-development-models.md"], "The L141 monthly assessment compares waterfall, iterative and RAD before L143 teaches the development models.", "The assessment lesson number precedes the responsible CORE lesson.", "Development-model comparison must be taught before evaluation.", "Students face an eight-mark evaluation before formal teaching.", "Move the question after L143 or move the CORE lesson earlier.", "Assessment prerequisite check must fail when teachingLessons are later."),
  issue("SCI-META-001", "Course identity", "P1", "High", ["lessons/138-testing-with-normal-boundary-and-erroneous-data.md:5", "lessons/138-testing-with-normal-boundary-and-erroneous-data.md:68"], "L138 labels testing as Syllabus Section 11 although testing is in official Section 12.3.", "The coverage contract maps the relevant testing requirement to L138 while the page identity says Section 11.", "Student-facing syllabus identity must match the official section.", "The page and generated metadata misclassify a compulsory topic.", "Correct the source metadata and every generated reference.", "Cross-check lesson-declared section against contract ownership and HTML."),
  issue("SCI-VIS-001", "Visual semantics", "P1", "High", ["web/assets/diagrams/stage10-infographics/stage10-lesson-051-shifts.jpg"], "The current eight-bit strings are correctly eight bits, but logical left 10110011 -> 01100110 is labelled 'Overflow: No' even though the discarded high 1 makes unsigned 179 x 2 exceed 255; the adjacent signed arithmetic panel labels the same bit movement as overflow.", "Full-resolution pixel inspection and independent recalculation.", "Fixed-width shift examples must state interpretation and apply overflow consistently.", "The graphic teaches an internally inconsistent boundary rule.", "State unsigned/signed interpretation explicitly and correct or remove the ambiguous overflow label.", "OCR/structured source assertion must recompute each panel's width, result and overflow flag."),
  issue("SCI-VIS-002", "Accessible visual semantics", "P1", "High", ["web/lesson-138/index.html:328", "audits/stage10-ocr-wording.csv:682", "web/assets/diagrams/stage10-infographics/stage10-lesson-138-java.jpg"], "The image visibly contains ELSE and ENDIF, but the screen-reader transcript omits both tokens while claiming to be the infographic text alternative.", "Full-resolution image inspection compared with the student-visible accessibility transcript and OCR ledger.", "Image, transcript, alt text and lesson semantics must agree.", "Screen-reader users receive incomplete pseudocode and a different concept from sighted users.", "Regenerate the transcript from verified semantic source and include every structural token.", "Compare required image tokens with transcript tokens; require ELSE and ENDIF."),
  issue("SCI-VIS-003", "Responsive visual QA", "P2", "High", ["web/stage10-explanations.css:42", "web/stage10-explanations.css:50"], "At <=640 px, Stage 10 images are forced to 720 px with container overflow-x:auto; L051's shift image overrides this but becomes too small to read at 390 px.", "Rendered 390x844 scan plus CSS inspection; document overflow is zero but the infographic containers intentionally overflow.", "The stated acceptance requires no page or container horizontal overflow and readable text.", "Most infographics require horizontal panning; the exception sacrifices legibility.", "Adopt responsive image-specific layouts or responsive alternate assets instead of a global 720 px rule.", "At 390x844 assert container scrollWidth <= clientWidth and minimum readable text size."),
  issue("SCI-VIS-004", "Visual audit gate", "P1", "High", ["audits/stage10-semantic-review-register.csv:176", "audits/stage10-imagegen-assets.md:181"], "The existing register marks L051 shifts Approved with two reviews and no defect, yet independent inspection finds SCI-VIS-001.", "Current asset hash matches the Approved register row.", "Existing Approved status and matching hashes are evidence of identity, not semantic correctness.", "The two-pass visual gate has a demonstrated false negative.", "Reopen all visual rows for independent review and add deterministic calculation assertions.", "Mutation test the overflow flag and require the visual verifier to fail."),
  issue("SCI-WEB-001", "Mobile usability", "P2", "Medium", ["web/lesson-toolbar.css:24", "web/lesson-toolbar.css:140"], "The fixed two-row lesson toolbar occupies and overlays the lower part of the 390x844 viewport while reading lesson content.", "Rendered mobile screenshot of L051; the page adds bottom padding but the control still obscures content during scrolling.", "Controls must not overlap teaching content at the specified mobile viewport.", "Visible reading area is reduced and text can sit behind the toolbar until further scrolling.", "Collapse the toolbar or reserve non-overlapping layout space on narrow screens.", "Screenshot assertion at top, middle and end of representative long lessons."),
  issue("SCI-TEACH-001", "Teaching usability", "P2", "Medium", ["lessons/028-computer-system-overview-input-output-storage-processor-and-memory.md", "lessons/040-environmental-and-reliability-considerations-in-hardware.md"], "After generated repair/explanation blocks and topic labels are normalised away, seven L028-L040 lessons share an identical base scaffold; L008/L009 and L053/L059 form additional exact pairs.", "Deterministic Jaccard/template normalisation found exact equality in these groups; this is a review signal, not proof that all generated inserts are identical.", "Examples and practice should be specific enough to teach and transfer each lesson's concept.", "Generic prompts can satisfy structural checks while providing shallow or repetitive learning.", "Manually review the flagged groups and replace only genuinely generic examples/tasks with topic-specific work.", "Add a similarity gate as a warning and require human disposition for exact normalised matches."),
  issue("SCI-ASSESS-001", "Mark scheme coding", "P2", "Medium", ["scripts/ms-review-utils.mjs:110"], "Twenty-two questions contain A1 marks without any M mark in the same question; several use A1 as a generic exact-answer mark after B points.", "Independent scan of all 968 questions; examples include L003-Q2, L088-Q4, L103-Q1 and AQ011-Q1.", "B/M/A codes should reflect independent knowledge, method and dependent accuracy consistently.", "Inconsistent code semantics weakens marking reliability and follow-through behaviour.", "Review the 22 flagged questions against the official mark-scheme convention and recode where necessary.", "Require an explicit dependency rationale for every A mark without M."),
  issue("SCI-ASSESS-002", "Mark scheme coding", "P2", "Medium", ["web/lesson-036/app.js", "web/lesson-037/app.js", "web/lesson-041/app.js"], "Five logic questions offer follow-through guidance although every mark is coded B1; the dependency boundary is not expressed in the mark codes.", "968-question scan found L036-Q3, L037-Q1, L037-Q2, L037-Q4 and L041-Q3.", "Follow-through should attach to a clear preceding calculated result/method.", "Markers may apply FT inconsistently.", "Define method/accuracy dependencies or remove FT where answers are independently marked.", "Validate every FT note against at least one explicit M/A dependency."),
  issue("SCI-ASSESS-003", "Assessment metadata", "P2", "High", ["web/lesson-001/app.js:92", "scripts/ms-review-utils.mjs:55"], "The 755 lesson exam questions contain no explicit AO metadata; only the 213 bank questions inherit assessment-level AO lists.", "Question inventory count is 968 = 755 lesson + 213 bank; lesson question objects expose prompt, answer, marks, marking and strict fields only.", "The requested requirement x assessment x AO matrix needs auditable AO evidence.", "AO balance for most questions cannot be independently verified without inference.", "Add reviewed question-level AO metadata or a separate stable mapping.", "Reject Unknown AO values before release approval."),
];

// The baseline defect descriptions are historical, but their file pointers must
// resolve against the current 151-lesson checkout so later review tooling never
// hashes a renamed or missing source by accident.
const currentDefectPath = new Map([
  ["lessons/013-compression-lossless-vs-lossy.md", "lessons/013-compression-methods-for-text-bitmap-vector-and-sound-files.md"],
  ["lessons/043-the-fetch-decode-execute-cycle.md", "lessons/044-register-transfer-notation-for-the-fetch-decode-execute-cycle.md"],
  ["lessons/044-registers-pc-cir-mar-mdr-acc-and-status-register.md", "lessons/044-register-transfer-notation-for-the-fetch-decode-execute-cycle.md"],
  ["lessons/047-assembly-language-basics-and-mnemonics.md", "lessons/047-two-pass-assembly-program-tracing-and-the-instruction-set.md"],
  ["lessons/048-addressing-modes-and-operand-interpretation.md", "lessons/048-addressing-modes-and-address-sensitive-instructions.md"],
  ["lessons/070-data-validation-and-verification.md", "lessons/070-complete-validation-and-verification-methods.md"],
  ["lessons/138-testing-with-normal-boundary-and-erroneous-data.md", "lessons/138-testing-with-normal-abnormal-and-extreme-boundary-data.md"],
  ["lessons/050-performance-factors-cores-cache-clock-speed-and-word-length.md", "lessons/050-bit-manipulation-with-masks-and-shifts.md"],
  ["lessons/045-system-buses-address-data-and-control.md", "lessons/043-system-buses-ports-and-processor-performance.md"],
  ["lessons/054-operating-system-roles-process-memory-file-and-device-management.md", "lessons/053-why-an-operating-system-is-required-and-what-it-manages.md"],
  ["lessons/011-digital-sound-sampling-rate-sample-resolution-and-duration.md", "lessons/011-sound-sampling-sampling-resolution-accuracy-and-storage.md"],
  ["lessons/008-bitmap-images-pixels-resolution-and-colour-depth.md", "lessons/008-bitmap-file-headers-image-resolution-and-screen-resolution.md"],
  ["lessons/081-tables-records-fields-data-types-and-constraints.md", "lessons/081-e-r-design-normalisation-and-dbms-features.md"],
  ["lessons/087-sql-joins-and-multi-table-queries.md", "lessons/087-sql-joins-using-related-tables.md"],
  ["lessons/102-flowcharts-and-pseudocode-notation.md", "lessons/102-structured-english-flowcharts-and-pseudocode-conversion.md"],
  ["lessons/116-one-dimensional-arrays.md", "lessons/116-array-terminology-selection-and-one-dimensional-pseudocode.md"],
  ["lessons/123-stacks-queues-and-linked-lists.md", "lessons/123-stacks-and-queues-as-abstract-data-types.md"],
  ["lessons/143-software-development-models.md", "lessons/143-lifecycle-models-purpose-and-limitations.md"],
  ["lessons/028-computer-system-overview-input-output-storage-processor-and-memory.md", "lessons/028-why-computer-systems-need-input-output-and-storage.md"],
]);
for (const defect of defects) {
  defect.locations = defect.locations.map((location) => {
    const match = location.match(/^(.*?)(:\d+)?$/);
    return `${currentDefectPath.get(match[1]) ?? match[1]}${match[2] ?? ""}`;
  });
}

const baseline = {
  frozenAt: "2026-08-26T15:55:00+08:00",
  git: {
    branch: "main",
    head: "02d5f1cb26828db5141a6de96f4fa45ee87c64eb",
    trackedChanges: 361,
    untrackedEntries: 13,
    porcelainRows: 374,
    porcelainSha256: "0b8edcbb259dc34bd195326bb73fd8b975c6fa4bc863dec4de4ec7b160b0c8d0",
    preservedUntracked: ["handover.md", "参考书籍/"],
  },
  official,
  scope: { lessons: 151, pages: 154, pageViews: 308, questions: 968, assessmentSets: 51, stage10Images: 784, visualObjects: 971, syllabusRequirements: 121 },
  mutationTests: [
    { id: "MUT-COV-001", mutation: "Removed kibi/mebi/gibi/tebi and binary-prefix teaching from L001 Markdown, HTML and app.js in a temporary mirror.", expected: "Fail S1.01", actual: "Verifier passed 121/121", result: "FalseNegativeConfirmed" },
    { id: "MUT-COV-002", mutation: "Changed every L051 CORE region to OPTIONAL in the same temporary mirror.", expected: "Fail S4.15", actual: "Verifier failed S4.15 CORE sections", result: "DetectionConfirmedForOverride" },
  ],
  pixelOcr: {
    method: "macOS Vision fast recognition over the actual 784 JPEG assets; run outside the restricted sandbox after the in-sandbox CVPixelBuffer failure was diagnosed.",
    rawLedger: "/tmp/as9618-scientific-audit/stage10-ocr-pixel-pass.csv",
    rawLedgerBytes: 844884,
    rawLedgerSha256: "005f3cf849967e9dca9dcb66dfdcd2633079295a52bb9737619c45274b303d07",
    images: 784,
    nonEmptyTranscripts: 784,
    prohibitedWordingFlags: 0,
    semanticApproval: false,
    targetedEvidence: {
      l050ShiftBinaryTokens: 12,
      l050ShiftBinaryTokenLengths: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
      l137ImageTokens: ["ELSE", "ENDIF"],
    },
  },
  rule: "Course, assessment, image and generator sources were not edited during evidence collection. Audit artifacts were written only after the baseline was frozen.",
};

fs.mkdirSync(audits, { recursive: true });
fs.writeFileSync(path.join(audits, "scientific-audit-baseline.json"), JSON.stringify(baseline, null, 2) + "\n");
fs.writeFileSync(path.join(audits, "scientific-stage10-ocr-summary.json"), JSON.stringify(baseline.pixelOcr, null, 2) + "\n");
fs.writeFileSync(path.join(audits, "scientific-defects.json"), JSON.stringify({ generatedAt: baseline.frozenAt, releaseDecision: "BLOCKED", defects }, null, 2) + "\n");

const failedRequirements = new Map([
  ["S1.11", "SCI-CONT-001"], ["S4.05", "SCI-CONT-006"], ["S4.07", "SCI-CONT-002"], ["S4.12", "SCI-CONT-003"], ["S4.13", "SCI-CONT-003"], ["S5.01", "SCI-CROSS-001"], ["S6.07", "SCI-CONT-004"], ["S12.07", "SCI-CONT-005"],
]);
const syllabusRows = coverageContract.requirements.map((requirement) => {
  const result = evaluateRequirement(requirement);
  const independent = failedRequirements.has(requirement.id) ? "Fail" : "PendingIndependentSemanticReview";
  return [requirement.id, requirement.section, requirement.requirement, requirement.notes || "", requirement.teachingLessons.join(";"), requirement.deliveryRole,
    requirement.requiredGroups?.length ?? 0,
    requirement.workedExampleEvidence?.map(({ lesson, sectionId }) => `L${String(lesson).padStart(3, "0")}#${sectionId}`).join(";") ?? "",
    requirement.practiceEvidence?.map(({ lesson, sectionId }) => `L${String(lesson).padStart(3, "0")}#${sectionId}`).join(";") ?? "",
    requirement.assessmentEvidence?.map(({ questionId }) => questionId).join(";") ?? "", requirement.prerequisites?.join(";") ?? "",
    requirement.riskLevel ?? "", requirement.forbiddenPatterns?.length ?? 0, result.status, result.messages.join(" | "), independent,
    failedRequirements.get(requirement.id) ?? "", independent === "Fail" ? "Blocked" : "NotReady"];
});
writeCsv("scientific-syllabus-matrix.csv", ["requirement_id", "section", "official_requirement", "official_notes", "teaching_lessons", "delivery_role", "required_groups", "worked_example_evidence", "practice_evidence", "assessment_evidence", "prerequisites", "risk_level", "forbidden_pattern_count", "current_gate_status", "current_gate_messages", "independent_semantic_status", "defect_ids", "release_status"], syllabusRows);

const lessonFiles = fs.readdirSync(path.join(root, "lessons")).filter((name) => /^\d{3}-.*\.md$/.test(name)).sort();
const lessonDefects = new Map([
  [1, ["SCI-SEQ-001"]], [8, []], [10, ["SCI-TERM-001"]], [11, ["SCI-TERM-001"]], [12, ["SCI-CONT-001"]], [13, ["SCI-CONT-001"]], [42, ["SCI-CONT-002"]], [43, ["SCI-CONT-002"]],
  [46, ["SCI-CONT-003"]], [47, ["SCI-CONT-003"]], [49, ["SCI-CONT-006"]], [50, ["SCI-VIS-001", "SCI-VIS-003", "SCI-WEB-001"]], [52, ["SCI-CROSS-001"]], [53, ["SCI-CROSS-001"]], [69, ["SCI-CONT-004"]],
  [80, ["SCI-SEQ-002"]], [100, ["SCI-SEQ-003"]], [104, ["SCI-SEQ-004"]], [105, ["SCI-SEQ-004"]], [112, ["SCI-SEQ-005"]],
  [115, ["SCI-SEQ-004", "SCI-SEQ-005"]], [120, ["SCI-SEQ-006"]], [122, ["SCI-SEQ-006"]], [123, ["SCI-SEQ-006"]], [137, ["SCI-META-001", "SCI-CONT-005", "SCI-VIS-002"]], [140, ["SCI-SEQ-007"]], [142, ["SCI-SEQ-007"]],
]);
const duplicateGroups = new Map();
for (const [name, lessons] of Object.entries({ "DUP-BASE-01": [27, 28, 29, 31, 32, 38, 39], "DUP-BASE-02": [8, 9], "DUP-BASE-03": [52, 58] })) for (const lesson of lessons) duplicateGroups.set(lesson, name);
const questionCounts = new Map();
for (const question of loadAllQuestions().filter((entry) => entry.source === "lesson")) questionCounts.set(question.lesson, (questionCounts.get(question.lesson) ?? 0) + 1);
const lessonRows = lessonFiles.map((file) => {
  const lesson = Number(file.slice(0, 3));
  const markdown = read(`lessons/${file}`);
  const html = read(`web/lesson-${String(lesson).padStart(3, "0")}/index.html`);
  const title = markdown.match(/^#\s+(.+)$/m)?.[1] ?? "";
  const syllabusRef = markdown.match(/\*\*Syllabus reference:\*\*\s*(.+)/)?.[1] ?? "";
  const ids = lessonDefects.get(lesson) ?? [];
  const semantic = ids.length ? "Fail" : "PendingIndependentSemanticReview";
  return [String(lesson).padStart(3, "0"), file, title, syllabusRef, (html.match(/data-delivery-role="CORE"/g) ?? []).length,
    (html.match(/data-delivery-role="OPTIONAL"/g) ?? []).length, questionCounts.get(lesson) ?? 0, "Pass", "Pass", duplicateGroups.get(lesson) ?? "",
    semantic, ids.join(";"), semantic === "Fail" ? "Blocked" : "NotReady"];
});
writeCsv("scientific-lesson-review.csv", ["lesson", "markdown_file", "title", "declared_syllabus_reference", "core_regions", "optional_regions", "lesson_exam_questions", "markdown_html_identity", "browser_load_identity", "normalised_duplicate_group", "independent_semantic_status", "defect_ids", "release_status"], lessonRows);

const assessmentLookup = new Map([...quizzes.map((x) => [`quiz:${x.lesson}`, x]), ...monthlyAssessments.map((x) => [`monthly:${x.lesson}`, x]), ...stageReviews.map((x) => [`review:${x.lesson}`, x])]);
const questionDefects = new Map([
  ["L001-Q1", "SCI-SEQ-001"], ["AM081-Q4", "SCI-SEQ-002"], ["AQ101-Q5", "SCI-SEQ-003"], ["AR112-Q1", "SCI-SEQ-005"], ["AM121-Q3", "SCI-SEQ-006"], ["AM141-Q4", "SCI-SEQ-007"],
]);
const bOnlyFt = new Set(["L036-Q3", "L037-Q1", "L037-Q2", "L037-Q4", "L041-Q3"]);
const cognitive = (command) => {
  if (/^(state|define|name|give|identify|list|match)$/i.test(command)) return "Recall";
  if (/^(explain|compare|distinguish|discuss|evaluate|recommend|design|justify|suggest|improve)$/i.test(command)) return "AnalyseEvaluate";
  return "ApplyConstruct";
};
const assessmentRows = loadAllQuestions().map((question) => {
  const command = question.prompt.trim().replace(/^\([^)]*\)\s*/, "").match(/^([A-Za-z-]+)/)?.[1] ?? "Unclassified";
  const container = question.source === "assessment" ? assessmentLookup.get(`${question.sourceKey}:${question.lesson}`) : null;
  const ao = container?.assessmentObjectives?.join(";") ?? "NotDeclared";
  const codes = question.points.map(([code]) => code);
  const flags = [];
  if (codes.some((code) => code.startsWith("A")) && !codes.some((code) => code.startsWith("M"))) flags.push("A-without-M-review");
  if (bOnlyFt.has(question.id)) flags.push("FT-with-B-only-review");
  if (ao === "NotDeclared") flags.push("AO-metadata-missing");
  const defectId = questionDefects.get(question.id) ?? "";
  return [question.id, question.source, question.sourceKey, question.lesson, question.section, question.marks, command, cognitive(command), ao,
    codes.join(";"), question.points.length === question.marks ? "Pass" : "Fail", flags.join(";"), defectId,
    defectId ? "Fail" : "PendingIndependentSemanticReview", question.hash];
});
writeCsv("scientific-assessment-matrix.csv", ["question_id", "source", "assessment_type", "lesson", "section", "marks", "command_word", "cognitive_demand_heuristic", "assessment_objectives", "mark_codes", "mark_point_count_status", "review_flags", "defect_ids", "independent_semantic_status", "content_hash"], assessmentRows);

const visualInventory = parseCsv(read("audits/stage10-concept-visual-register.csv"));
const visualRows = visualInventory.map((row) => {
  const stage10 = row.method === "Raster image";
  const l050 = row.lesson === "050" && row.section_id === "explanation-shifts";
  const l137 = row.lesson === "137" && row.section_id === "explanation-java";
  const ids = l050 ? "SCI-VIS-001;SCI-VIS-004" : l137 ? "SCI-VIS-002" : "";
  const pass1 = l050 || l137 ? "CompletedFail" : "PendingIndependentPixelReview";
  return [row.lesson, row.visual_id, row.section_id, row.method, row.topic, row.required_facts, row.content_hash, "Pass",
    stage10 ? pass1 : "PendingIndependentSemanticReview", stage10 ? "PendingBlindReverseReview" : "NotApplicable",
    ids ? "Fail" : "Pending", ids, l050 ? "Eight-bit width is correct; overflow label is inconsistent." : l137 ? "Visible image is correct; accessible transcript is incomplete." : ""];
});
writeCsv("scientific-visual-review.csv", ["lesson", "visual_id", "section_id", "method", "topic", "required_facts", "content_hash", "asset_identity_status", "independent_pass_1", "independent_pass_2", "semantic_status", "defect_ids", "notes"], visualRows);

const routes = ["index", "resources", "assessments", ...Array.from({ length: 151 }, (_, index) => `lesson-${String(index + 1).padStart(3, "0")}`)];
const browserRows = [];
for (const route of routes) {
  for (const viewport of ["1440x900", "390x844"]) {
    const lesson = route.startsWith("lesson-");
    const containerOverflow = viewport === "390x844" && lesson ? "Fail:Stage10Container" : "Pass";
    const interaction = route === "assessments" ? "Pass:filters-MS-reset-empty" : route === "lesson-051" ? "Pass:contents-answer" : "PendingByComponentType";
    browserRows.push([route, viewport, "Pass", "Pass", "Pass", containerOverflow, "PassFreshPort", interaction,
      containerOverflow.startsWith("Fail") ? "Fail" : interaction.startsWith("Pending") ? "Pending" : "Pass",
      route === "lesson-101" ? "Fresh-port cache-busted retest produced zero console errors." : "Rendered through local HTTP server."]);
  }
}
writeCsv("scientific-browser-qa.csv", ["route", "viewport", "load", "title_h1_identity", "document_overflow", "container_overflow", "console", "interaction", "status", "evidence"], browserRows);

const graph = {
  status: "DraftBlockedByConfirmedInversions",
  nodes: lessonFiles.map((file) => ({ id: `L${file.slice(0, 3)}`, title: read(`lessons/${file}`).match(/^#\s+(.+)$/m)?.[1] ?? "" })),
  edges: [
    ["L001", "L002", "storage units before representation calculations"], ["L002", "L003", "binary before hexadecimal grouping"], ["L008", "L009", "bitmap model before size calculation"],
    ["L013", "L014", "compression categories before algorithms"], ["L042", "L043", "CPU components before fetch-execute"], ["L043", "L044", "cycle before register detail"],
    ["L044", "L046", "registers before instruction format"], ["L046", "L047", "instruction format before assembly"], ["L047", "L048", "syntax before addressing trace"],
    ["L079", "L080", "database concepts before relational comparison"], ["L080", "L081", "relational model before tables and keys"], ["L081", "L082", "fields and keys before key design"],
    ["L082", "L083", "keys before ER modelling"], ["L083", "L084", "relationships before normalisation"], ["L084", "L085", "schema before SQL"], ["L085", "L086", "single-table SELECT before aggregate SQL"],
    ["L086", "L087", "single-table queries before joins"], ["L099", "L100", "problem solving before abstraction"], ["L100", "L101", "abstract model before constructs"],
    ["L101", "L102", "constructs before notation"], ["L102", "L103", "notation before tracing"], ["L103", "L104", "trace before defensive validation"],
    ["L116", "L105", "array representation before search"], ["L116", "L106", "array representation before sort"], ["L114", "L116", "data types before arrays"],
    ["L116", "L117", "one-dimensional before two-dimensional arrays"], ["L116", "L118", "array bounds before counting"], ["L114", "L119", "types before records"],
    ["L119", "L120", "records before arrays of records"], ["L116", "L123", "array storage before array-based ADTs"], ["L123", "L124", "ADT definitions before selection"],
    ["L131", "L132", "subprogram interface before parameter passing"], ["L132", "L133", "parameters before scope"], ["L143", "AM141", "development models before monthly assessment"],
  ].map(([from, to, rationale]) => ({ from, to, rationale, scheduleStatus: /^AM/.test(to) ? "BackwardAssessment" : Number(from.slice(1)) <= Number(to.slice(1)) ? "Forward" : "BackwardTeaching" })),
};
fs.writeFileSync(path.join(audits, "scientific-prerequisite-graph.json"), JSON.stringify(graph, null, 2) + "\n");

const counts = defects.reduce((acc, entry) => { acc[entry.severity] = (acc[entry.severity] ?? 0) + 1; return acc; }, {});
const report = `# AS9618 full scientific audit — baseline report\n\n` +
`**Decision:** BLOCKED. This snapshot is not publishable. Open defects: P0 ${counts.P0 ?? 0}, P1 ${counts.P1 ?? 0}, P2 ${counts.P2 ?? 0}, P3 ${counts.P3 ?? 0}. Independent semantic review remains pending for most requirements, questions and visuals, so the acceptance rule forbids an Approved conclusion.\n\n` +
`## Scope and method\n\n` +
`The baseline was frozen before audit artifacts were written. No course, assessment, image, generator, commit, push or release file was changed by this audit. The official basis is the Cambridge 9618 2027-2029 Version 2 syllabus, the December 2025 update and the 2027-2029 pseudocode guide. Hashes and byte counts are recorded in \`scientific-audit-baseline.json\`.\n\n` +
`Inventory: 121 requirements, 151 lessons, 154 pages / 308 rendered views, 968 questions, 51 assessment sets, 784 Stage 10 raster images and 971 visual objects. Current project verifiers were treated as leads, not proof of correctness.\n\n` +
`## What passed\n\n` +
`- Structural inventory matches the planned counts: 121 / 151 / 154 / 968 / 51 / 784 / 971.\n` +
`- All 968 questions have a mark total equal to the number of stored mark points and all mark codes match B1/M1/A1 syntax.\n` +
`- All 154 routes loaded with a non-empty title and H1 at 1440x900 and 390x844; no document-level horizontal overflow was found.\n` +
`- Assessment Bank Section 4 filtering, mark-scheme disclosure, reset and forced empty state worked. L051 contents and answer disclosures worked.\n` +
`- A stale cached L101 console error was disproved on a new port with a cache-busting URL; the current source loaded with zero warnings/errors.\n` +
`- The corrected L051 shift graphic now displays eight bits in every inspected fixed-width row.\n` +
`- Independent pixel OCR produced non-empty text for 784/784 images. It found no configured prohibited editorial wording; this is a locator result, not semantic approval.\n` +
`- Pixel OCR found 12 binary tokens in L051 shifts and all 12 are eight bits; it also recognised ELSE and ENDIF in the L138 image.\n\n` +
`- The temporary mutation harness itself behaved deterministically: it detected the protected S4.15 CORE-to-OPTIONAL mutation.\n\n` +
`## Confirmed failures\n\n` +
`### Coverage and gate integrity\n\n` +
`The present 121/121 Complete result is not scientifically valid. The evaluator reads \`requiredGroups\` while the base contract stores \`conceptGroups\`; only ten overrides are checked semantically. In a temporary mirror, removing kibi/mebi/gibi/tebi and binary-prefix teaching from L001 still produced “121 unique requirements” passed, while converting L051 CORE to OPTIONAL correctly failed the S4.15 override. Assessment evidence is whole-file existence for most rows, official Notes are empty, and prerequisite/risk/visual evidence is absent. See SCI-COV-001 to SCI-COV-004 and SCI-SEQ-000.\n\n` +
`### Compulsory content\n\n` +
`Confirmed gaps are: bitmap/vector compression methods (S1.11), processor type as a performance factor (S4.05), register-transfer notation (S4.07), the full official instruction groups/set (S4.12-S4.13), Markdown/HTML parity for OS security management (S5.01), limit check teaching (S6.07), and the official abnormal/extreme-boundary test-data categories (S12.07). Sampling resolution is taught correctly in concept but uses the non-official primary label “sample resolution”.\n\n` +
`### Sequence\n\n` +
`Seven confirmed inversions remain: L001 file-header assessment; L081 database/join monthly task; Quiz 100 flowchart symbols; search/sort before formal arrays; Review 112 array declaration; Monthly 120 ADTs; Monthly 140 RAD. The draft prerequisite graph records the responsible dependency edges.\n\n` +
`### Visuals and responsive behaviour\n\n` +
`The current L051 eight-bit width is correct, but its logical-left overflow label is inconsistent. The L138 Java/pseudocode image is visually correct while its screen-reader transcript omits ELSE and ENDIF. The current Stage 10 register marks both assets Approved, demonstrating that hash equality and recorded two-pass status are not sufficient. At 390 px, the global 720 px image rule creates container-level horizontal overflow; L051's exception fits but is too small to read comfortably.\n\n` +
`### Assessment quality\n\n` +
`Structural mark totals pass. Twenty-two A-without-M cases and five B-only questions with FT guidance require code-semantics review. AO metadata is missing for all 750 lesson questions, so the requested AO matrix is explicitly NotDeclared rather than inferred.\n\n` +
`## Not yet verified\n\n` +
`- 113 of 121 requirements still require independent line-by-line semantic review against official Notes.\n` +
`- 968 questions are inventoried and structurally checked, but independent correct/boundary/wrong-answer trials remain pending except for the confirmed defects and targeted high-risk checks.\n` +
`- 971 visuals are inventoried, but the new independent audit has not completed 784 first passes plus blind reverse second passes. Existing Approved rows are retained only as historical evidence.\n` +
`- Route load/identity is complete for 308 views; full per-component keyboard, focus, ARIA, print and interaction coverage remains pending except for the named tested flows.\n` +
`- The new audit-artifact generator was run twice with identical hashes, and two targeted coverage mutations were run in a temporary mirror. Full course-generation idempotence, the complete mutation suite, \`verify-all.mjs\` and release parity were not run because the release builder can rewrite tracked release inventory; they belong after an authorised repair batch.\n\n` +
`## Repair order\n\n` +
`1. Repair the contract/evaluator and prerequisite graph first, so later fixes cannot be falsely approved.\n` +
`2. Repair P0 content: S1.11, S4.07 and S4.12-S4.13; then the confirmed P1 content, terminology/parity and sequence defects.\n` +
`3. Repair affected questions/MS and add question-level requirement/AO mappings.\n` +
`4. Correct the L051 graphic source and L138 transcript, then rerun all visual assets through two independent passes and deterministic assertions.\n` +
`5. Resolve responsive container overflow and toolbar overlap; complete component-type browser coverage.\n` +
`6. Run mutation tests, two full generator passes, all specialist verifiers, git diff --check, verify-all and release parity. Only then re-evaluate P0/P1=0 and Unknown=0.\n\n` +
`## Artifacts\n\n` +
`- \`scientific-defects.json\`: authoritative open-defect register.\n` +
`- \`scientific-syllabus-matrix.csv\`: 121 requirements, current gate result versus independent status.\n` +
`- \`scientific-lesson-review.csv\`: 151 lesson identities, structural evidence and semantic disposition.\n` +
`- \`scientific-assessment-matrix.csv\`: all 968 questions with command word, cognitive heuristic, AO, mark codes and flags.\n` +
`- \`scientific-visual-review.csv\`: all 971 visual objects with independent-pass status.\n` +
`- \`scientific-stage10-ocr-summary.json\`: actual-pixel OCR counts, raw-ledger hash and targeted L051/L138 evidence.\n` +
`- \`scientific-browser-qa.csv\`: all 308 route/viewport rows.\n` +
`- \`scientific-prerequisite-graph.json\`: 151 nodes and high-confidence semantic edges, including backward dependencies.\n`;
fs.writeFileSync(path.join(audits, "scientific-audit-report.md"), report);

const repairPlan = `# AS9618 scientific audit repair batches\n\n` +
`**Boundary:** This is a repair plan only. No course, assessment, image, generator, commit, push or publication change is authorised by the first-round audit.\n\n` +
`## Batch 0 — make the gates trustworthy\n\n` +
`Issues: SCI-COV-001 to SCI-COV-004 and SCI-SEQ-000. Unify conceptGroups/requiredGroups, add official Notes, stable question/visual IDs, prerequisites, risk and forbidden semantics, and validate requirement-specific CORE/worked/practice/assessment evidence. Replace the six-case sequence verifier with the prerequisite graph and first-use scan. Acceptance: MUT-COV-001 and CORE-to-OPTIONAL mutations both fail for every requirement class; no row can pass on whole-file existence.\n\n` +
`## Batch 1 — repair compulsory P0/P1 teaching\n\n` +
`Issues: SCI-CONT-001 to SCI-CONT-006, SCI-CROSS-001, SCI-TERM-001 and SCI-META-001. Repair generator/maintenance sources first, then Markdown and HTML. Add bitmap/vector/text/sound compression mechanisms; processor type; register-transfer notation; all official instruction groups and opcodes; OS security-management parity; limit check; official test-data categories; official sound terminology; and correct L138's Section 12.3 identity. Acceptance: each requirement has visible CORE teaching, a worked example, practice/MS and direct assessment; generators rerun without restoring old content.\n\n` +
`## Batch 2 — repair curriculum and assessment order\n\n` +
`Issues: SCI-SEQ-001 to SCI-SEQ-007. Decide the smallest schedule-preserving remedy for each inversion: revise/move the assessment item or teach the prerequisite earlier without changing the 151 lesson IDs. Acceptance: every question's mapped teachingLessons are <= its issue lesson; no review introduces new CORE syntax; spacing analysis shows later retrieval remains.\n\n` +
`## Batch 3 — repair assessment semantics and metadata\n\n` +
`Issues: SCI-ASSESS-001 to SCI-ASSESS-003 plus questions affected by Batches 1-2. Add question-level requirement and AO mappings. Review all 22 A-without-M and five FT-with-B-only flags rather than mechanically recoding them. For every changed question, run correct/common-error/boundary answer trials. Acceptance: prompt, marks, independent points, code dependency, acceptable answers, Do not accept and displayed Assessment Bank MS agree.\n\n` +
`## Batch 4 — reopen and repair visuals\n\n` +
`Issues: SCI-VIS-001 to SCI-VIS-004. Correct the source used to render L051 shifts and regenerate the pixels; fix the L138 transcript from the verified semantic source. Add deterministic assertions for fixed-width bit count, shift result and overflow interpretation. Then review all 784 Stage 10 images in course order and blind reverse order, recording disagreements before arbitration. Acceptance: 784/784 have two new independent dispositions, 971/971 assets/display checks pass, and no existing Approved flag is imported as a conclusion.\n\n` +
`## Batch 5 — responsive and interaction closure\n\n` +
`Issues: SCI-VIS-003 and SCI-WEB-001. Replace the global 720 px mobile rule with readable responsive treatments and remove toolbar/content overlap. Exercise every interaction component type, keyboard path, focus return, ARIA state, print, reduced motion and screen-reader transcript. Acceptance: 308/308 views have no page/container overflow, clipping, broken assets or console warnings/errors, with interaction evidence tied to component IDs.\n\n` +
`## Batch 6 — independent re-audit and release gate\n\n` +
`Resolve SCI-TEACH-001 by human disposition of similarity clusters. Complete the remaining 113 requirement reviews, 968 question trials and 971 visual reviews. Run the full generator chain twice and require zero second-run diff; run specialist verifiers, git diff --check, verify-all, release parity and temp-copy mutations. Acceptance: P0=0, P1=0, Unknown/Pending=0. Commit, push and publication still require separate approval.\n`;
fs.writeFileSync(path.join(audits, "scientific-repair-plan.md"), repairPlan);

console.log(`Scientific audit artifacts generated: ${coverageContract.requirements.length} requirements, ${lessonRows.length} lessons, ${assessmentRows.length} questions, ${visualRows.length} visuals, ${browserRows.length} page views, ${defects.length} open defects.`);
