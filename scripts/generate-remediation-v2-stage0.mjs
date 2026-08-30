import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

import { loadAllQuestions } from "./ms-review-utils.mjs";
import { monthlyAssessments, quizzes, stageReviews } from "./stage3-assessments-data.mjs";

const root = path.resolve(import.meta.dirname, "..");
const audits = path.join(root, "audits");
const manifestPath = path.join(audits, "remediation-v2-stage0-manifest.csv");
const baselinePath = path.join(audits, "remediation-v2-stage0-baseline.json");
const defectsPath = path.join(audits, "remediation-v2-defects.json");
const reportPath = path.join(audits, "remediation-v2-stage0-report.md");

const sha256 = (value) => crypto.createHash("sha256").update(value).digest("hex");
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath));
const trackedFiles = execFileSync("git", ["ls-files"], { cwd: root, encoding: "utf8" })
  .trim()
  .split("\n")
  .filter(Boolean);

const physicalEntry = (kind, id, relativePath) => {
  const content = read(relativePath);
  return { kind, id, path: relativePath, sha256: sha256(content), bytes: content.byteLength };
};

const lessonPaths = trackedFiles.filter((file) => /^lessons\/\d{3}-.*\.md$/.test(file)).sort();
const pagePaths = [
  "web/index.html",
  "web/assessments/index.html",
  "web/resources/index.html",
  ...Array.from({ length: 151 }, (_, index) => `web/lesson-${String(index + 1).padStart(3, "0")}/index.html`),
];
const stage10ImagePaths = trackedFiles
  .filter((file) => /^web\/assets\/diagrams\/stage10-infographics\/stage10-.*\.jpg$/.test(file))
  .sort();
const generatorPaths = trackedFiles
  .filter((file) => /^scripts\/(?:apply|build|generate|normalise|render)-.*\.(?:mjs|py)$/.test(file))
  .sort();

const questions = loadAllQuestions();
const assessmentSets = [
  ...quizzes.map((entry) => ({ type: "quiz", entry })),
  ...monthlyAssessments.map((entry) => ({ type: "monthly", entry })),
  ...stageReviews.map((entry) => ({ type: "review", entry })),
];

const manifestEntries = [
  ...lessonPaths.map((file) => physicalEntry("lesson", path.basename(file).slice(0, 3), file)),
  ...pagePaths.map((file) => physicalEntry("page", file.replace(/^web\//, ""), file)),
  ...stage10ImagePaths.map((file) => physicalEntry("stage10-image", path.basename(file), file)),
  ...generatorPaths.map((file) => physicalEntry("generator", path.basename(file), file)),
  ...questions.map((question) => {
    const serialized = JSON.stringify({
      prompt: question.prompt,
      answer: question.answer,
      marks: question.marks,
      points: question.points,
      guidance: question.guidance,
    });
    return {
      kind: "question",
      id: question.id,
      path: question.sourceKey,
      sha256: question.hash,
      bytes: Buffer.byteLength(serialized),
    };
  }),
  ...assessmentSets.map(({ type, entry }) => {
    const serialized = JSON.stringify(entry);
    return {
      kind: "assessment-set",
      id: `${type}:${String(entry.lesson).padStart(3, "0")}`,
      path: "scripts/stage3-assessments-data.mjs",
      sha256: sha256(serialized),
      bytes: Buffer.byteLength(serialized),
    };
  }),
].sort((left, right) => `${left.kind}:${left.id}:${left.path}`.localeCompare(`${right.kind}:${right.id}:${right.path}`));

const csv = (value) => /[",\n]/.test(String(value))
  ? `"${String(value).replaceAll('"', '""')}"`
  : String(value);
const manifestText = [
  ["kind", "id", "path", "sha256", "bytes"],
  ...manifestEntries.map((entry) => [entry.kind, entry.id, entry.path, entry.sha256, entry.bytes]),
].map((row) => row.map(csv).join(",")).join("\n") + "\n";

const visualObjects = fs.readFileSync(path.join(audits, "scientific-final-visual-review.csv"), "utf8")
  .trimEnd()
  .split("\n").length - 1;
const syllabusRequirements = JSON.parse(read("scripts/syllabus-coverage-contract.json")).requirements.length;
const head = execFileSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8" }).trim();
const branch = execFileSync("git", ["branch", "--show-current"], { cwd: root, encoding: "utf8" }).trim();

const official = {
  syllabus: {
    title: "Cambridge International AS & A Level Computer Science 9618 syllabus for 2027, 2028 and 2029",
    version: "Version 2",
    published: "December 2025",
    url: "https://www.cambridgeinternational.org/Images/721397-2027-2029-syllabus.pdf",
    pages: 49,
    bytes: 745380,
    sha256: "c8a4c6d033c07c6d8025689abed5ef481d581c28bae640986d275303ed6c08bc",
  },
  update: {
    title: "Cambridge 9618 2027-2029 syllabus update",
    version: "Version 2 update",
    published: "December 2025",
    url: "https://www.cambridgeinternational.org/Images/747147-2027-2029-syllabus-update.pdf",
    pages: 1,
    bytes: 111917,
    sha256: "7a6d305a3370f8aa006eac43bc21be298e1d77bcabfcc57aa677016cb33b869e",
  },
  pseudocodeGuide: {
    title: "Cambridge 9618 Pseudocode Guide for Teachers for 2027, 2028 and 2029",
    version: "Version 1",
    published: "2024",
    url: "https://www.cambridgeinternational.org/Images/721401-2027-2029-pseudocode-guide.pdf",
    pages: 31,
    bytes: 704531,
    sha256: "04f42cc247cc49e069543aef242dbc6d1d89d4f3539c23148683386cebb2c4b7",
  },
};

const baseline = {
  schemaVersion: 1,
  remediation: "v2",
  stage: 0,
  frozenDate: "2026-08-28",
  sourceRevision: { branch, head },
  official,
  inventory: {
    lessons: lessonPaths.length,
    pages: pagePaths.length,
    pageViewsPlanned: pagePaths.length * 2,
    questions: questions.length,
    assessmentSets: assessmentSets.length,
    stage10Images: stage10ImagePaths.length,
    visualObjects,
    syllabusRequirements,
    generators: generatorPaths.length,
    manifestEntries: manifestEntries.length,
  },
  manifest: {
    path: "audits/remediation-v2-stage0-manifest.csv",
    sha256: sha256(manifestText),
  },
  legacyAuditArtifacts: [
    "audits/scientific-audit-report.md",
    "audits/scientific-final-audit-report.md",
    "audits/scientific-defects.json",
    "audits/scientific-final-defects.json",
  ].map((file) => ({ path: file, sha256: sha256(read(file)) })),
  workingTreePolicy: {
    protectedPreExistingUntracked: ["handover.md", "scripts/__pycache__/", "参考书籍/"],
    rule: "Pre-existing untracked paths are excluded from the remediation manifest and must not be edited or deleted.",
  },
  rule: "This baseline is historical evidence. It must never be used as semantic approval for a repaired file.",
};

const issues = [
  {
    id: "RV2-GATE-001",
    category: "Approval gate",
    severity: "P0",
    locations: ["scripts/generate-cie-wording-register.mjs:9", "scripts/verify-cie-wording.mjs:57"],
    problem: "A command-line flag can stamp all wording records Approved; the verifier then checks status and hashes rather than independent semantic evidence.",
    acceptanceTarget: "Stage 1 must prohibit bulk semantic approval and require reviewer, round, evidence, official basis and current hash per disposition.",
  },
  {
    id: "RV2-GATE-002",
    category: "Release decision",
    severity: "P0",
    locations: ["scripts/verify-scientific-audit.mjs:61", "scripts/verify-scientific-audit.mjs:104"],
    problem: "One verifier validates both a historical BLOCKED report and an APPROVED final report without exposing one unambiguous current decision.",
    acceptanceTarget: "Stage 1 must define one current decision source and treat all earlier reports as history only.",
  },
  {
    id: "RV2-COV-001",
    category: "Official contract",
    severity: "P0",
    locations: ["scripts/syllabus-coverage-contract.json:970", "syllabus-audit.md:37"],
    problem: "S1.08, S1.10 and S1.11 contain notes copied from unrelated security, validation and lifecycle requirements.",
    acceptanceTarget: "Stage 2 must restore the exact adjacent official Notes for every AS requirement.",
  },
  {
    id: "RV2-COV-002",
    category: "Coverage",
    severity: "P1",
    locations: ["scripts/syllabus-coverage-contract.json:345", "lessons/005-signed-representations-and-binary-subtraction.md:75"],
    problem: "S1.03 can pass without direct one's-complement conversion practice or assessment evidence.",
    acceptanceTarget: "Stage 2 must require CORE teaching, worked conversion, practice and one directly mapped question for one's complement.",
  },
  {
    id: "RV2-SCOPE-001",
    category: "Official scope",
    severity: "P1",
    locations: ["scripts/syllabus-coverage-contract.json:1176", "scripts/syllabus-coverage-contract.json:13538", "scripts/syllabus-coverage-contract.json:13856"],
    problem: "The contract overstates sound file-size calculation, construction of state-transition diagrams and production of test strategies/plans as compulsory official requirements.",
    acceptanceTarget: "Stage 2 must use the official requirement boundary and separate course enrichment from compulsory evidence.",
  },
  {
    id: "RV2-SCOPE-002",
    category: "Enrichment classification",
    severity: "P1",
    locations: ["lessons/006-bcd-and-hexadecimal-in-practical-systems.md:1", "lessons/012-sound-file-size-calculations.md:1", "lessons/114-select-and-use-the-official-cambridge-data-types.md:1"],
    problem: "Out-of-scope or wrong-section material is presented as AS CORE and contributes to formal section pacing.",
    acceptanceTarget: "Stage 2 must retain it only as labelled Optional enrichment and exclude it from coverage, first-use and compulsory assessment evidence.",
  },
  {
    id: "RV2-SEQ-001",
    category: "Curriculum order",
    severity: "P1",
    locations: ["course-map.md:34", "scripts/syllabus-coverage-contract.json:11134", "scripts/syllabus-coverage-contract.json:13962"],
    problem: "CORE first use does not follow official order in Sections 2, 4, 9, 10, 11 and 12.",
    acceptanceTarget: "Stage 3 must make every compulsory first use and prerequisite monotonic in official order while preserving lesson IDs and URLs.",
  },
  {
    id: "RV2-ID-001",
    category: "Lesson identity",
    severity: "P1",
    locations: ["lessons/105-linear-search-and-binary-search.md:5", "lessons/115-define-read-and-save-record-data.md:5", "lessons/138-testing-with-normal-abnormal-and-extreme-boundary-data.md:5", "lessons/139-debugging-using-traces-and-breakpoints.md:5"],
    problem: "Lesson headers, course-map ranges and requirement mappings disagree about the owning syllabus section.",
    acceptanceTarget: "Stage 3 must make all 151 lesson identities agree across Markdown, HTML, catalogue, course map, contract and assessment mapping.",
  },
  {
    id: "RV2-WORD-001",
    category: "CIE wording",
    severity: "P1",
    locations: ["scripts/verify-cie-wording.mjs:59", "assessments/quizzes.md:94"],
    problem: "The recognised-word regex is broader than the official command-word table and can approve unsupported wording without syllabus-specific evidence.",
    acceptanceTarget: "Stage 4 must derive the primary table from the official glossary and explicitly source any syllabus-operation exception.",
  },
  {
    id: "RV2-MS-001",
    category: "Mark scheme presentation",
    severity: "P1",
    locations: ["course-map.md:66", "scripts/generate-assessments.mjs:179"],
    problem: "Student-facing B1/M1/A1 codes are presented as Cambridge-style conventions although public specimen mark schemes use Answer, Guidance, Marks and point-based credit.",
    acceptanceTarget: "Stage 4 must use official-style student display while preserving stable question IDs, marks and optional hidden internal metadata.",
  },
  {
    id: "RV2-CONT-001",
    category: "Processor content and visual",
    severity: "P0",
    locations: ["lessons/050-bit-manipulation-with-masks-and-shifts.md:145", "web/assets/diagrams/stage10-infographics/stage10-lesson-050-concept.jpg"],
    problem: "The core visual omits processor type and bus width and substitutes word length for the official performance-factor list.",
    acceptanceTarget: "Stage 5 must align title, hero, teaching, assessment, transcript and pixels with the official five-factor list.",
  },
  {
    id: "RV2-PSEUDO-001",
    category: "Pseudocode typing",
    severity: "P0",
    locations: ["lessons/108-string-processing-algorithms.md:155", "lessons/134-clear-and-efficient-cambridge-pseudocode.md:49", "web/assets/diagrams/stage10-infographics/stage10-lesson-134-java.jpg"],
    problem: "LCASE/UCASE are used with STRING expressions, guide-external indexing is presented as Cambridge pseudocode, and LEFT is used without a supplied signature.",
    acceptanceTarget: "Stage 5 must enforce guide-compatible CHAR/STRING types or declare every question-provided function with a complete signature and convention.",
  },
  {
    id: "RV2-PSEUDO-002",
    category: "Provided functions",
    severity: "P0",
    locations: ["lessons/122-choosing-stack-queue-or-linked-list.md:128", "web/assets/diagrams/stage10-infographics/stage10-lesson-122-parse.jpg"],
    problem: "SPLIT and STRING_TO_INTEGER are labelled Cambridge-style pseudocode without being defined as question-provided routines.",
    acceptanceTarget: "Stage 5 must supply typed signatures and indexing rules before use or replace the examples with guide-supported expressions.",
  },
].map((issue) => ({ ...issue, confidence: "High", status: "Open" }));

const defects = {
  schemaVersion: 1,
  remediation: "v2",
  sourceBaseline: "audits/remediation-v2-stage0-baseline.json",
  currentDecision: "BLOCKED",
  currentDecisionReason: "Stage 0 reopened confirmed P0/P1 defects; Stages 1-7 are not yet accepted.",
  stageStatus: { stage: 0, status: "AwaitingUserApproval" },
  legacyReportsPolicy: {
    classification: "HistoricalEvidenceOnly",
    excludedFromCurrentDecision: [
      "audits/scientific-audit-report.md",
      "audits/scientific-final-audit-report.md",
      "audits/scientific-defects.json",
      "audits/scientific-final-defects.json",
    ],
  },
  issues,
};

const severityCounts = issues.reduce((counts, issue) => {
  counts[issue.severity] = (counts[issue.severity] ?? 0) + 1;
  return counts;
}, {});
const report = `# AS9618 remediation v2 — Stage 0 baseline and reopened defects

**Current decision:** BLOCKED
**Stage status:** Implementation complete; awaiting user approval before Stage 1.

## Official baseline

| Source | Version / publication | Pages | SHA-256 |
|---|---|---:|---|
${Object.values(official).map((source) => `| ${source.title} | ${source.version}; ${source.published} | ${source.pages} | \`${source.sha256}\` |`).join("\n")}

## Frozen inventory

| Item | Count |
|---|---:|
${Object.entries(baseline.inventory).map(([key, value]) => `| ${key} | ${value} |`).join("\n")}

The item-level manifest is \`${baseline.manifest.path}\` with SHA-256 \`${baseline.manifest.sha256}\`.

## Passed

- A new remediation-v2 baseline is separated from every legacy Approved/BLOCKED report.
- The baseline freezes current lesson, page, question, assessment-set, Stage 10 image and generator identities by SHA-256.
- Pre-existing untracked paths are excluded and protected: \`handover.md\`, \`scripts/__pycache__/\`, \`参考书籍/\`.
- The current decision source is \`audits/remediation-v2-defects.json\`; its decision is BLOCKED.
- Stage 0 verification includes a negative control: an in-memory mutation to APPROVED and a legacy-current-source substitution must both be rejected.

## Failed / open

- Reopened issues: ${issues.length}; P0=${severityCounts.P0 ?? 0}, P1=${severityCounts.P1 ?? 0}.
- Gate trust, official coverage, sequence, wording, mark-scheme presentation and named content/visual defects remain open by design.

## Unverified

- No legacy semantic Approved flag has been revalidated.
- No course, assessment, image, generator, browser or release repair from Stages 1-7 has been accepted.
- Full publication readiness is not evaluated in Stage 0.

## Stop condition

Do not start Stage 1 until the user approves this baseline and reopened-defect scope. Commit, push and publication remain separately unauthorised.
`;

fs.writeFileSync(manifestPath, manifestText);
fs.writeFileSync(baselinePath, `${JSON.stringify(baseline, null, 2)}\n`);
fs.writeFileSync(defectsPath, `${JSON.stringify(defects, null, 2)}\n`);
fs.writeFileSync(reportPath, report);

console.log(`Generated remediation v2 Stage 0: ${manifestEntries.length} manifest entries, ${issues.length} open issues, decision BLOCKED.`);
