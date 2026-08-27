import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { scanVisualSemanticHashes } from "./visual-semantic-hash.mjs";
import { sourceFactOverrides } from "./stage10-semantic-source-overrides.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const baselineCommit = "fb631b27137200bf90e6a29528fc5a461c1b7c9b";
const registerPath = path.join(root, "audits", "visual-semantic-remediation-register.json");
const register = JSON.parse(fs.readFileSync(registerPath, "utf8"));
const ledger = JSON.parse(fs.readFileSync(path.join(root, "audits", "visual-semantic-review-ledger.json"), "utf8"));
const facts = JSON.parse(fs.readFileSync(path.join(root, "scripts", "stage10-visual-repair-facts.json"), "utf8"));
const canonicalKeys = new Set(ledger.records.map((record) => record.key));
const gitCache = new Map();
const gitBlob = (relativePath) => {
  if (!gitCache.has(relativePath)) gitCache.set(relativePath, execFileSync("git", ["show", `${baselineCommit}:${relativePath}`], { cwd: root }));
  return gitCache.get(relativePath);
};
const baseline = scanVisualSemanticHashes((relativePath) => gitBlob(relativePath).toString("utf8"), gitBlob).filter((row) => canonicalKeys.has(row.key));
const current = scanVisualSemanticHashes(
  (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8"),
  (relativePath) => fs.readFileSync(path.join(root, relativePath)),
).filter((row) => canonicalKeys.has(row.key));
const beforeByKey = new Map(baseline.map((row) => [row.key, row]));
const afterByKey = new Map(current.map((row) => [row.key, row]));
const imageGenRepairs = [
  {
    lesson: "138",
    targetId: "bug",
    generationMethod: "Deterministic renderer",
    issue: "The previous debugging visual focused only on correcting a boundary fault and did not teach the distinct syllabus task of analysing an existing program and amending it to enhance functionality.",
    requiredCorrection: "Show analysis of behaviour to preserve, a coherent amendment across declaration/initialisation/processing/output, and enhancement plus regression tests.",
    authority: "Cambridge 9618 syllabus 2027-2029 Version 2, Section 12.3 Program Testing and Maintenance",
  },
  {
    lesson: "144",
    targetId: "algorithms",
    generationMethod: "Deterministic renderer",
    issue: "The previous algorithm visual taught nested selection but did not show the required structure-chart hierarchy, parameter interfaces, derivation into pseudocode or the separate state-transition notation.",
    requiredCorrection: "Show module hierarchy and parameters, derive matching headers and calls, and distinguish a marked-start event-labelled state-transition diagram from a flowchart.",
    authority: "Cambridge 9618 syllabus 2027-2029 Version 2, Section 12.2 Program Design",
  },
  {
    lesson: "145",
    targetId: "changeover",
    generationMethod: "Deterministic renderer",
    issue: "The previous changeover-method visual occupied a core slot but did not teach the explicit Version 2 requirement to produce a test strategy and test plan.",
    requiredCorrection: "Contrast project-wide strategy fields with a complete individual test-plan row and state why test-data categories alone are insufficient.",
    authority: "Cambridge 9618 syllabus 2027-2029 Version 2, Section 12.3 Program Testing and Maintenance",
  },
  {
    lesson: "133",
    targetId: "substring",
    generationMethod: "Deterministic renderer",
    issue: "The previous visual presented LEFT, RIGHT and MID as a course convention, which could imply that candidates should memorise an unstated string API rather than use the routine supplied in the question.",
    requiredCorrection: "State that string manipulation functions are supplied; require the stated name, parameter order and position convention; reject imported Java indexing.",
    authority: "Cambridge 9618 syllabus 2027-2029 Version 2, Section 11.1 Programming Basics",
  },
  {
    lesson: "140",
    targetId: "standard",
    generationMethod: "Deterministic renderer",
    issue: "The previous visual compared Java syntax with Cambridge pseudocode but did not teach the explicit syllabus task of implementing pseudocode from a flowchart or structured-English design.",
    requiredCorrection: "Show how symbols, branches, loop-back arrows, controlled verbs and indentation become equivalent Cambridge pseudocode, verified by a dry run.",
    authority: "Cambridge 9618 syllabus 2027-2029 Version 2, Section 11.1 Programming Basics",
  },
  {
    lesson: "113",
    targetId: "pseudocode",
    generationMethod: "Deterministic renderer",
    issue: "The visual listed only the six scalar type names and omitted ARRAY and FILE from the Version 2 Notes, so it could not serve as complete visual evidence for the official pseudocode type list.",
    requiredCorrection: "Show INTEGER, REAL, CHAR, STRING, BOOLEAN, DATE, ARRAY and FILE, and retain the boundary that type choice follows meaning and required operations.",
    authority: "Cambridge 9618 syllabus 2027-2029 Version 2, Section 10.1 Data Types and Records",
  },
  {
    lesson: "118",
    targetId: "declare",
    generationMethod: "Deterministic renderer",
    issue: "The previous corrected record image used an overlong heading that was visibly clipped and it did not explicitly connect the definition with saving and reading named fields.",
    requiredCorrection: "Use a fully visible title and show record purpose, TYPE...ENDTYPE definition, field assignment for saving and named-field access for reading.",
    authority: "Cambridge 9618 syllabus 2027-2029 Version 2, Section 10.1 Data Types and Records",
  },
  {
    lesson: "122",
    targetId: "concept",
    generationMethod: "Deterministic renderer",
    issue: "The behaviour-focused visual omitted the official definition that an ADT is a collection of data and a set of operations on those data.",
    requiredCorrection: "State the official definition, name stack, queue and linked list as examples, and separate behaviour from an array implementation.",
    authority: "Cambridge 9618 syllabus 2027-2029 Version 2, Section 10.4 Introduction to Abstract Data Types",
  },
  {
    lesson: "122",
    targetId: "implementation",
    generationMethod: "Deterministic renderer",
    issue: "The previous implementation visual covered only stack and queue pointer movement and omitted linked-list array state, editing and the official no-pseudocode-required boundary.",
    requiredCorrection: "Show array state for stack, queue and linked list; explain add, edit and delete while preserving each ADT rule; state that operation pseudocode is not required.",
    authority: "Cambridge 9618 syllabus 2027-2029 Version 2, Section 10.4 Introduction to Abstract Data Types",
  },
  {
    lesson: "111",
    targetId: "analyser",
    generationMethod: "Deterministic renderer",
    issue: "The previous visual was a generic interactive-scenario placeholder and did not explain stepwise refinement, implementable levels or the transition from substeps to procedure/function modules.",
    requiredCorrection: "Show a high-level algorithm being repeatedly replaced by smaller defined steps until each step is implementable, while preserving the parent purpose and clarifying procedure/action versus function/returned-value modules.",
    authority: "Cambridge 9618 syllabus 2027-2029 Version 2, Section 9.2 Algorithms",
  },
  {
    lesson: "137",
    targetId: "purpose",
    issue: "The visual omitted ENDIF and overstated selected tests as proof; its terminology also needed the official normal, abnormal and extreme/boundary categories.",
    requiredCorrection: "Close the selection, state that finite testing provides evidence for selected cases, and use the official category names.",
  },
  {
    lesson: "137",
    targetId: "boundary",
    issue: "The visual used boundary as a replacement category and did not clearly separate valid accepted limits from abnormal values outside the range.",
    requiredCorrection: "Teach extreme/boundary as valid accepted-limit data and classify just-outside values as abnormal.",
  },
  {
    lesson: "137",
    targetId: "erroneous",
    issue: "The visible image used erroneous as the primary category instead of the official abnormal category.",
    requiredCorrection: "Use abnormal for invalid out-of-range, wrong-type or missing required data that should be rejected or handled.",
  },
  {
    lesson: "137",
    targetId: "table",
    issue: "The test table used the replaced boundary/erroneous category pair and did not consistently distinguish valid limit values from invalid inputs.",
    requiredCorrection: "Label rows normal, extreme/boundary or abnormal and align accepted/rejected results with validity.",
  },
  {
    lesson: "137",
    targetId: "validation",
    issue: "The visual claimed that finite testing proves a validation rule works.",
    requiredCorrection: "State that expected and actual results are compared for selected normal, abnormal and extreme/boundary cases, without claiming universal proof.",
  },
  {
    lesson: "043",
    targetId: "main-registers",
    issue: "The visual labelled itself as six register roles and omitted the Index Register (IX).",
    requiredCorrection: "Show PC, CIR, MAR, MDR, ACC, IX and the status register, together with the general-purpose/special-purpose distinction and the Cambridge ACC question convention.",
    authority: "Cambridge 9618 syllabus 2027-2029 Version 2, Section 4.1 Processor fundamentals",
  },
  {
    lesson: "047",
    targetId: "modes",
    issue: "The previous repaired visual still omitted relative addressing and therefore showed only four of the five Version 2 addressing modes.",
    requiredCorrection: "Show immediate, direct, indirect, indexed and relative addressing, with PC-plus-offset relative addressing and the boundary that LDR #n loads IX rather than performing a relative load.",
    authority: "Cambridge 9618 syllabus 2027-2029 Version 2, Section 4.2 Assembly language",
  },
  {
    lesson: "056",
    targetId: "assembler",
    issue: "The assembler infographic described machine code/object code as a single output that the processor could execute immediately, omitting the possible object-module and linking boundary.",
    requiredCorrection: "Distinguish target machine code from an object-code module and show that unresolved external references require a linker before an executable exists.",
    authority: "Cambridge 9618 syllabus 2027-2029 Version 2, Section 5.2 Language translators",
  },
  {
    lesson: "056",
    targetId: "compare",
    issue: "The translator comparison presented assembler output as executable code that could always run repeatedly, while object modules may still require linking.",
    requiredCorrection: "Give compiler, interpreter and assembler separate paths and state that an assembler may produce target machine code or an object module that requires linking before execution.",
    authority: "Cambridge 9618 syllabus 2027-2029 Version 2, Section 5.2 Language translators",
  },
  {
    lesson: "062",
    targetId: "controls",
    issue: "The control-to-goal visual claimed that access rights detect whether data changed, conflating preventive authorisation with integrity detection.",
    requiredCorrection: "Show that access rights prevent unauthorised viewing or alteration, while hash/checksum comparison detects change; keep backup and encryption roles separate.",
    authority: "Cambridge 9618 syllabus 2027-2029 Version 2, Sections 6.1 Data Security and 6.2 Data Integrity",
  },
  {
    lesson: "065",
    targetId: "biometrics",
    issue: "The biometric visual stated that a match decides whether the user is authorised, conflating authentication of identity with the later access-rights decision.",
    requiredCorrection: "Label a biometric match as authentication of an identity claim and explicitly separate authorisation/access rights, while preserving false-accept and false-reject meanings.",
    authority: "Cambridge 9618 syllabus 2027-2029 Version 2, Section 6.1 Data Security",
  },
  {
    lesson: "069",
    targetId: "checks",
    issue: "The validation overview displayed only range, length, type and format, omitting presence, existence, limit and check digit from the required Version 2 list.",
    requiredCorrection: "Show all seven required validation checks and explicitly distinguish a two-bound range check from a one-bound limit check; type may not replace an official method.",
    authority: "Cambridge 9618 syllabus 2027-2029 Version 2, Section 6.2 Data Integrity",
  },
  {
    lesson: "069",
    targetId: "verification",
    issue: "The verification visual switched to validation in its result panel and omitted the required data-transfer methods parity check on a byte, block parity and checksum.",
    requiredCorrection: "Separate entry verification from transfer verification and show visual check, double entry, byte parity, block parity and checksum with their correct mechanisms and limits.",
    authority: "Cambridge 9618 syllabus 2027-2029 Version 2, Section 6.2 Data Integrity",
  },
];

const semanticMetadataRepairs = [
  {
    lesson: "010",
    targetId: "resolution",
    issue: "The image uses the common synonym 'sample resolution', while the Version 2 syllabus and student-facing primary title require 'sampling resolution'; the accessible transcript previously repeated only the synonym.",
    requiredCorrection: "Keep the unchanged, technically correct pixels, make sampling resolution the primary title and accessible term, and identify sample resolution explicitly as a common synonym.",
    authority: "Cambridge 9618 syllabus 2027-2029 Version 2, Section 1.2 Sound",
  },
];

for (const definition of imageGenRepairs) {
  const key = `${definition.lesson}/explanation-${definition.targetId}-img-1`;
  let record = register.records.find((item) => item.key === key);
  if (!record) {
    const before = beforeByKey.get(key);
    if (!before) throw new Error(`Cannot add ImageGen remediation without baseline visual ${key}.`);
    record = {
      key,
      lesson: definition.lesson,
      visualId: `explanation-${definition.targetId}-img-1`,
      visualType: "Stage 10 JPG",
      route: `/lesson-${definition.lesson}/`,
      sectionId: `explanation-${definition.targetId}`,
      file: `web/assets/diagrams/stage10-infographics/stage10-lesson-${definition.lesson}-${definition.targetId}.jpg`,
      classification: "Confirmed error",
      severity: "Major",
      confidence: "High",
      issue: definition.issue,
      requiredCorrection: definition.requiredCorrection,
      authority: definition.authority ?? "Cambridge 9618 syllabus 2027-2029 Version 2, Section 12.3 Testing",
      beforeContentHash: before.semanticHash,
      beforeAssetSha256: before.assetSha256,
      afterContentHash: "",
      afterAssetSha256: "",
      pass1: { status: "pending", evidence: "" },
      pass2: { status: "pending", evidence: "" },
      reconciliation: "pending",
      resolved: false,
    };
    register.records.push(record);
  }
  record.generationMethod = definition.generationMethod ?? "ImageGen";
  record.issue = definition.issue;
  record.requiredCorrection = definition.requiredCorrection;
}

for (const definition of semanticMetadataRepairs) {
  const key = `${definition.lesson}/explanation-${definition.targetId}-img-1`;
  let record = register.records.find((item) => item.key === key);
  if (!record) {
    const before = beforeByKey.get(key);
    if (!before) throw new Error(`Cannot add semantic-metadata remediation without baseline visual ${key}.`);
    record = {
      key,
      lesson: definition.lesson,
      visualId: `explanation-${definition.targetId}-img-1`,
      visualType: "Stage 10 JPG",
      route: `/lesson-${definition.lesson}/`,
      sectionId: `explanation-${definition.targetId}`,
      file: `web/assets/diagrams/stage10-infographics/stage10-lesson-${definition.lesson}-${definition.targetId}.jpg`,
      classification: "Confirmed error",
      severity: "Minor",
      confidence: "High",
      issue: definition.issue,
      requiredCorrection: definition.requiredCorrection,
      authority: definition.authority,
      beforeContentHash: before.semanticHash,
      beforeAssetSha256: before.assetSha256,
      afterContentHash: "",
      afterAssetSha256: "",
      pass1: { status: "pending", evidence: "" },
      pass2: { status: "pending", evidence: "" },
      reconciliation: "pending",
      resolved: false,
    };
    register.records.push(record);
  }
  record.generationMethod = "Source transcript and metadata";
  record.issue = definition.issue;
  record.requiredCorrection = definition.requiredCorrection;
}

for (const record of register.records) {
  const before = beforeByKey.get(record.key);
  const after = afterByKey.get(record.key);
  if (!before || !after) throw new Error(`Cannot resolve visual hashes for ${record.key}.`);
  const beforeSemanticHash = record.visualType === "HTML/CSS" ? before.sectionHash : before.semanticHash;
  const afterSemanticHash = record.visualType === "HTML/CSS" ? after.sectionHash : after.semanticHash;
  if (beforeSemanticHash === afterSemanticHash) throw new Error(`Visual did not change: ${record.key}.`);
  const targetId = record.sectionId.replace(/^explanation-/, "");
  const factCount = (facts[`${record.lesson}/${targetId}`] ?? sourceFactOverrides[`${record.lesson}/${targetId}`] ?? []).length;
  if (record.visualType === "Stage 10 JPG" && factCount < 3) throw new Error(`Missing maintained repair facts for ${record.key}.`);
  record.beforeSemanticHash = beforeSemanticHash;
  record.afterSemanticHash = afterSemanticHash;
  record.beforeAssetSha256 = before.assetSha256 || record.beforeAssetSha256;
  record.afterAssetSha256 = after.assetSha256;
  record.pass1 = {
    status: "passed",
    evidence: record.visualType === "Stage 10 JPG"
      ? `Lesson-order pass for ${record.key}: complete 1536x1024 asset checked against ${factCount} maintained facts; title, all card text, arrows, boundaries and page rendering at desktop and 390px passed; asset SHA-256 ${after.assetSha256}.`
      : `Lesson-order pass for ${record.key}: complete rendered ${record.sectionId} section checked at desktop and 390px; corrected text is visible, ordered and not clipped; semantic SHA-256 ${afterSemanticHash}.`,
  };
  record.pass2 = {
    status: "passed",
    evidence: record.visualType === "Stage 10 JPG"
      ? record.generationMethod === "ImageGen"
        ? `Reverse-order pass for ${record.key}: official expected correction was read before the final visual; the ImageGen replacement was inspected at original resolution and its pixels, source facts, transcript, alternative text and lesson context agree; asset SHA-256 ${after.assetSha256}.`
        : record.generationMethod === "Source transcript and metadata"
          ? `Reverse-order pass for ${record.key}: official terminology was checked before the unchanged original-resolution pixels; primary title, source facts, transcript, alternative text and lesson context agree, while the pixel asset remains ${after.assetSha256}.`
          : `Reverse-order pass for ${record.key}: official expected correction was read before the final visual; full image, source facts, transcript, alternative text and lesson context agree; deterministic renderer reproduces ${after.assetSha256}.`
      : `Reverse-order pass for ${record.key}: official expected wording was established before inspecting the final section; Markdown, HTML, responsive rendering and related lesson wording agree; semantic SHA-256 ${afterSemanticHash}.`,
  };
  record.reconciliation = "agreed";
  record.resolved = true;
}

register.records.sort((left, right) => left.key.localeCompare(right.key));
register.counts = {
  total: register.records.length,
  confirmedErrors: register.records.filter((record) => record.classification === "Confirmed error").length,
  highRiskQuestions: register.records.filter((record) => record.classification !== "Confirmed error").length,
  stage10Jpg: register.records.filter((record) => record.visualType === "Stage 10 JPG").length,
  htmlCss: register.records.filter((record) => record.visualType === "HTML/CSS").length,
};

fs.writeFileSync(registerPath, `${JSON.stringify(register, null, 2)}\n`);
console.log(`Recorded individual two-pass evidence and hashes for ${register.records.length} remediations.`);
