import fs from "node:fs";
import path from "node:path";

import { coverageContract, forbiddenSemanticPatterns } from "./syllabus-coverage-contract.mjs";
import { evaluateRequirement, root } from "./syllabus-coverage-evaluator.mjs";

const failures = [];
const schemaOnly = process.argv.includes("--schema-only");
const ids = coverageContract.requirements.map(({ id }) => id);
const idSet = new Set(ids);
const forbiddenIds = new Set(forbiddenSemanticPatterns.map(({ id }) => id));

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

expect(coverageContract.schemaVersion === 2, `expected contract schemaVersion 2, found ${coverageContract.schemaVersion ?? "missing"}`);
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
  expect(Array.isArray(requirement.teachingLessons) && requirement.teachingLessons.length > 0 && requirement.teachingLessons.every((lesson) => Number.isInteger(lesson) && lesson >= 1 && lesson <= 150), `${prefix}: invalid teachingLessons`);
  expect(requirement.deliveryRole === "CORE", `${prefix}: compulsory requirement is not CORE`);
  expect(["High", "Medium", "Low"].includes(requirement.riskLevel), `${prefix}: invalid or missing riskLevel`);
  expect(["Reviewed", "Pending"].includes(requirement.evidenceReviewStatus), `${prefix}: invalid or missing evidenceReviewStatus`);
  expect(validGroups(requirement.requiredGroups), `${prefix}: requiredGroups must contain independently testable alternatives`);
  expect(!Object.hasOwn(requirement, "conceptGroups"), `${prefix}: obsolete conceptGroups field remains`);
  expect(Array.isArray(requirement.coreSections), `${prefix}: coreSections must be declared`);
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

const visiting = new Set();
const visited = new Set();
const requirementById = new Map(coverageContract.requirements.map((requirement) => [requirement.id, requirement]));
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
