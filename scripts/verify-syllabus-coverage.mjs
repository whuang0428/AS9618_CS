import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

import { coverageContract, forbiddenSemanticPatterns } from "./syllabus-coverage-contract.mjs";
import { evaluateRequirement, root } from "./syllabus-coverage-evaluator.mjs";
import { buildCurriculumSequenceModel } from "./curriculum-sequence-model.mjs";
import { evaluateCriticalSemanticControls } from "./remediation-v2-semantic-gate.mjs";
import { officialAsMapping } from "./syllabus-official-as-mapping.mjs";

const failures = [];
const schemaOnly = process.argv.includes("--schema-only");
const ids = coverageContract.requirements.map(({ id }) => id);
const idSet = new Set(ids);
const forbiddenIds = new Set(forbiddenSemanticPatterns.map(({ id }) => id));
const requirementById = new Map(coverageContract.requirements.map((requirement) => [requirement.id, requirement]));

function expect(condition, message) {
  if (!condition) failures.push(message);
}

function validGroups(groups) {
  return Array.isArray(groups) && groups.length > 0 && groups.every((group) => Array.isArray(group) && group.length > 0 && group.every((term) => typeof term === "string" && term.trim()));
}

function validEvidence(evidence, requireActivity = false) {
  return Array.isArray(evidence) && evidence.every((item) => Number.isInteger(item.lesson) && item.lesson >= 1 && item.lesson <= 150
    && typeof item.sectionId === "string" && item.sectionId && validGroups(item.conceptGroups)
    && (!requireActivity || typeof item.activity === "string"));
}

expect(coverageContract.schemaVersion === 4, `expected contract schemaVersion 4, found ${coverageContract.schemaVersion ?? "missing"}`);
expect(["InvalidatedPendingRevalidation", "InvalidatedAndRevalidated"].includes(coverageContract.auditIntegrity?.priorCompleteStatuses), "legacy Complete statuses were not invalidated for the audit-integrity review epoch");
expect(coverageContract.officialSource?.url?.includes("721397-2027-2029-syllabus.pdf"), "official Version 2 syllabus URL is missing");
expect(/^[a-f0-9]{64}$/.test(coverageContract.officialSource?.sha256 ?? ""), "official syllabus SHA-256 is missing or malformed");
expect(ids.length === 121, `expected 121 contracts, found ${ids.length}`);
expect(idSet.size === ids.length, "coverage contract IDs are not unique");
expect(forbiddenIds.size === forbiddenSemanticPatterns.length, "forbidden semantic pattern IDs are not unique");

for (let section = 1; section <= 12; section += 1) {
  expect(coverageContract.requirements.some((requirement) => requirement.section === section), `section ${section} has no contract rows`);
}

for (const requirement of coverageContract.requirements) {
  const prefix = requirement.id ?? "unknown requirement";
  expect(/^S(?:[1-9]|1[0-2])\.\d{2}$/.test(prefix), `${prefix}: malformed requirement ID`);
  expect(typeof requirement.requirement === "string" && requirement.requirement.trim(), `${prefix}: official requirement wording is missing`);
  expect(typeof requirement.notes === "string" && requirement.notes.trim(), `${prefix}: Version 2 Notes interpretation is empty`);
  const officialReference = requirement.officialReference;
  expect(officialReference?.syllabus === "Cambridge 9618 2027-2029 Version 2", `${prefix}: official syllabus identity is missing`);
  expect(officialReference?.sourceSha256 === coverageContract.officialSource.sha256, `${prefix}: official source hash does not match the locked syllabus`);
  expect(Array.isArray(officialReference?.pages) && officialReference.pages.length > 0 && officialReference.pages.every((page) => Number.isInteger(page) && page >= 14 && page <= 31), `${prefix}: official subject-content page locator is invalid`);
  expect(Array.isArray(officialReference?.candidateStatements) && officialReference.candidateStatements.length > 0 && officialReference.candidateStatements.every((statement) => typeof statement === "string" && statement.trim()), `${prefix}: official candidate statement mapping is missing`);
  expect(Array.isArray(officialReference?.adjacentNotesAndGuidance) && officialReference.adjacentNotesAndGuidance.every((note) => typeof note === "string" && note.trim()), `${prefix}: adjacent Notes and guidance mapping is invalid`);
  if (officialReference) {
    const { evidenceHash, ...basis } = officialReference;
    const expectedHash = crypto.createHash("sha256").update(JSON.stringify(basis)).digest("hex");
    expect(evidenceHash === expectedHash, `${prefix}: official mapping evidence hash does not match its content`);
  }
  expect(["remediation-v2-stage2", "remediation-v2-stage3", "remediation-v2-audit-integrity-r1", "remediation-v2-audit-integrity-r2"].includes(requirement.evidenceReviewRound), `${prefix}: evidence has no recognised remediation review round`);
  expect(Array.isArray(requirement.teachingLessons) && requirement.teachingLessons.length > 0 && requirement.teachingLessons.every((lesson) => Number.isInteger(lesson) && lesson >= 1 && lesson <= 150), `${prefix}: invalid teachingLessons`);
  expect(requirement.deliveryRole === "CORE", `${prefix}: compulsory requirement is not CORE`);
  expect(["High", "Medium", "Low"].includes(requirement.riskLevel), `${prefix}: invalid or missing riskLevel`);
  expect(["Reviewed", "Pending"].includes(requirement.evidenceReviewStatus), `${prefix}: invalid or missing evidenceReviewStatus`);
  expect(["Reviewed", "Pending"].includes(requirement.integrityReviewStatus), `${prefix}: invalid or missing integrityReviewStatus`);
  expect(validGroups(requirement.requiredGroups), `${prefix}: requiredGroups must contain independently testable alternatives`);
  expect(!Object.hasOwn(requirement, "conceptGroups"), `${prefix}: obsolete conceptGroups field remains`);
  expect(Array.isArray(requirement.coreSections), `${prefix}: coreSections must be declared`);
  expect(requirement.firstTeachingEvidence
    && requirement.firstTeachingEvidence.lesson === Math.min(...requirement.teachingLessons)
    && typeof requirement.firstTeachingEvidence.sectionId === "string"
    && requirement.firstTeachingEvidence.sectionId
    && validGroups(requirement.firstTeachingEvidence.conceptGroups), `${prefix}: exact CORE firstTeachingEvidence is missing or not the first teaching lesson`);
  expect(Array.isArray(requirement.prerequisites) && requirement.prerequisites.every((id) => idSet.has(id) && id !== prefix), `${prefix}: prerequisites contain a missing or self-referential ID`);
  expect(validEvidence(requirement.workedExampleEvidence), `${prefix}: invalid workedExampleEvidence`);
  expect(validEvidence(requirement.practiceEvidence, true), `${prefix}: invalid practiceEvidence`);
  expect(Array.isArray(requirement.assessmentEvidence)
    && requirement.assessmentEvidence.every((item) => /^L\d{3}-Q\d+$|^A[QMR]\d{3}-Q\d+$/.test(item.questionId) && validGroups(item.conceptGroups)), `${prefix}: invalid direct assessmentEvidence`);
  expect(Number.isInteger(requirement.minimumAssessmentForms) && requirement.minimumAssessmentForms >= 1, `${prefix}: invalid minimumAssessmentForms`);
  expect(Array.isArray(requirement.visualEvidence) && requirement.visualEvidence.every((item) => Number.isInteger(item.lesson) && typeof item.visualId === "string"
    && item.visualId && typeof item.sectionId === "string" && item.sectionId && typeof item.required === "boolean" && validGroups(item.conceptGroups)), `${prefix}: invalid visualEvidence`);
  expect(Array.isArray(requirement.forbiddenPatterns) && requirement.forbiddenPatterns.every((id) => forbiddenIds.has(id)), `${prefix}: forbiddenPatterns contains an unknown rule ID`);
}

for (const [id, mapping] of Object.entries(officialAsMapping)) {
  const requirement = requirementById.get(id);
  expect(JSON.stringify(requirement?.officialReference?.candidateStatements) === JSON.stringify(mapping.candidateStatements), `${id}: exact official candidate statement mapping drifted`);
  expect(JSON.stringify(requirement?.officialReference?.adjacentNotesAndGuidance) === JSON.stringify(mapping.adjacentNotesAndGuidance), `${id}: exact adjacent Notes and guidance mapping drifted`);
}
expect(!/file[- ]size calculation/i.test(requirementById.get("S1.10")?.requirement ?? ""), "S1.10: sound file-size calculation is still presented as compulsory wording");
expect(!/construct/i.test(requirementById.get("S12.03")?.requirement ?? ""), "S12.03: construct state-transition diagram is still presented as compulsory wording");
expect(!/produce/i.test(requirementById.get("S12.06")?.requirement ?? ""), "S12.06: produce test strategy/test plan is still presented as compulsory wording");

const visiting = new Set();
const visited = new Set();
function visit(id, trail = []) {
  if (visiting.has(id)) { failures.push(`prerequisite cycle: ${[...trail, id].join(" -> ")}`); return; }
  if (visited.has(id)) return;
  visiting.add(id);
  for (const prerequisite of requirementById.get(id)?.prerequisites ?? []) visit(prerequisite, [...trail, id]);
  visiting.delete(id);
  visited.add(id);
}
for (const id of ids) visit(id);

if (!schemaOnly) {
  for (const requirement of coverageContract.requirements) {
    const evaluation = evaluateRequirement(requirement);
    for (const message of evaluation.messages) failures.push(`${requirement.id}: ${message}`);
  }
  for (const problem of buildCurriculumSequenceModel().problems) failures.push(`${problem.type} ${problem.id}: ${problem.detail}`);
  for (const problem of evaluateCriticalSemanticControls()) failures.push(`${problem.id} ${problem.location}: ${problem.detail}`);

  const scanFiles = [
    ...fs.readdirSync(path.join(root, "lessons")).filter((name) => name.endsWith(".md")).map((name) => path.join(root, "lessons", name)),
    ...fs.readdirSync(path.join(root, "web")).filter((name) => /^lesson-\d{3}$/.test(name)).flatMap((name) => ["index.html", "app.js"].map((file) => path.join(root, "web", name, file))),
    ...fs.readdirSync(path.join(root, "scripts")).filter((name) => /(?:data|assessment|quiz).*\.mjs$/.test(name)).map((name) => path.join(root, "scripts", name)),
  ].filter((file) => fs.existsSync(file));
  for (const file of scanFiles) {
    const text = fs.readFileSync(file, "utf8");
    for (const { id, pattern } of forbiddenSemanticPatterns) {
      pattern.lastIndex = 0;
      if (pattern.test(text)) failures.push(`${path.relative(root, file)}: forbidden semantic pattern ${id}`);
    }
  }

  const auditPath = path.join(root, "syllabus-audit.md");
  if (!fs.existsSync(auditPath)) failures.push("syllabus-audit.md is missing");
  else {
    const audit = fs.readFileSync(auditPath, "utf8");
    const auditIds = [...audit.matchAll(/^\| (S\d+\.\d+) \|/gm)].map((match) => match[1]);
    if (auditIds.length !== 121 || auditIds.some((id, index) => id !== ids[index])) failures.push("syllabus audit rows do not match the contract");
    for (const requirement of coverageContract.requirements) {
      const evaluation = evaluateRequirement(requirement);
      const line = audit.split("\n").find((candidate) => candidate.startsWith(`| ${requirement.id} |`)) ?? "";
      if (!line.includes(`| ${evaluation.status} |`)) failures.push(`${requirement.id}: audit status does not match evaluator result ${evaluation.status}`);
      for (const evidence of requirement.assessmentEvidence) if (!line.includes(evidence.questionId)) failures.push(`${requirement.id}: audit omits direct assessment evidence ${evidence.questionId}`);
    }
  }
}

if (failures.length) {
  console.error(`Syllabus coverage verification failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log(schemaOnly
  ? `Syllabus contract schema passed: ${ids.length} unique requirements, valid evidence interfaces and an acyclic prerequisite graph.`
  : `Syllabus coverage verification passed: ${ids.length} unique requirements with direct CORE teaching, worked examples, practice/MS, assessment and risk-based visual evidence.`);
