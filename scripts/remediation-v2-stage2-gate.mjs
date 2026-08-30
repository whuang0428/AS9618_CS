import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import { coverageContract } from "./syllabus-coverage-contract.mjs";
import { evaluateRequirement, lessonPaths, root } from "./syllabus-coverage-evaluator.mjs";
import { optionalEnrichment } from "./remediation-v2-optional-enrichment.mjs";
import { officialAsMapping } from "./syllabus-official-as-mapping.mjs";

const requiredOptionalLessons = [6, 12, 19, 20, 22, 31, 55, 58, 59, 60, 114, 145, 146];

function sectionTag(html, sectionId) {
  return html.match(new RegExp(`<section\\b[^>]*\\bid="${sectionId}"[^>]*>`, "i"))?.[0] ?? "";
}

export function evaluateStage2Policy(contract = coverageContract, entries = optionalEnrichment) {
  const problems = [];
  const byId = new Map(contract.requirements.map((requirement) => [requirement.id, requirement]));
  const optionalByLesson = new Map(entries.map((entry) => [entry.lesson, entry]));
  const push = (id, detail) => problems.push({ id, detail });

  if (contract.schemaVersion !== 4) push("STAGE2-CONTRACT-SCHEMA", `expected schemaVersion 4, found ${contract.schemaVersion}`);
  if (contract.requirements.length !== 121) push("STAGE2-CONTRACT-COUNT", `expected 121 logical requirements, found ${contract.requirements.length}`);
  for (let section = 1; section <= 12; section += 1) {
    if (!contract.requirements.some((requirement) => requirement.section === section)) push("STAGE2-SECTION-MISSING", `Section ${section} has no requirement`);
  }

  for (const requirement of contract.requirements) {
    const reference = requirement.officialReference;
    if (!reference || reference.sourceSha256 !== contract.officialSource.sha256 || reference.mappingRound !== "remediation-v2-stage2") {
      push("STAGE2-OFFICIAL-REFERENCE", `${requirement.id} is not mapped to the locked Version 2 source in this review round`);
      continue;
    }
    const { evidenceHash, ...basis } = reference;
    const actualHash = crypto.createHash("sha256").update(JSON.stringify(basis)).digest("hex");
    if (evidenceHash !== actualHash) push("STAGE2-OFFICIAL-HASH", `${requirement.id} official mapping content hash drifted`);
    if (!Array.isArray(reference.pages) || !reference.pages.length || !Array.isArray(reference.candidateStatements) || !reference.candidateStatements.length || !Array.isArray(reference.adjacentNotesAndGuidance)) {
      push("STAGE2-OFFICIAL-TRACE", `${requirement.id} lacks page, candidate-statement or adjacent-Notes traceability`);
    }
    if (!requirement.firstTeachingEvidence || requirement.firstTeachingEvidence.lesson !== Math.min(...requirement.teachingLessons)) {
      push("STAGE2-FIRST-TEACHING", `${requirement.id} lacks a unique first CORE teaching locator`);
    }
  }

  for (const [id, mapping] of Object.entries(officialAsMapping)) {
    const reference = byId.get(id)?.officialReference;
    if (JSON.stringify(reference?.candidateStatements) !== JSON.stringify(mapping.candidateStatements)
      || JSON.stringify(reference?.adjacentNotesAndGuidance) !== JSON.stringify(mapping.adjacentNotesAndGuidance)) {
      push("STAGE2-EXACT-OFFICIAL", `${id} official candidate statements or adjacent Notes drifted`);
    }
  }

  if (/file[- ]size calculation/i.test(byId.get("S1.10")?.requirement ?? "")) push("STAGE2-SOUND-SCOPE", "S1.10 still claims sound file-size calculation as compulsory");
  if (/construct/i.test(byId.get("S12.03")?.requirement ?? "")) push("STAGE2-STATE-SCOPE", "S12.03 still claims construction as compulsory");
  if (/produce/i.test(byId.get("S12.06")?.requirement ?? "")) push("STAGE2-TESTPLAN-SCOPE", "S12.06 still claims production as compulsory");

  const ones = byId.get("S1.03");
  if (!ones?.requiredGroups.some((group) => group.some((term) => /one.?s complement/i.test(term)))) push("STAGE2-ONES-CONTRACT", "S1.03 does not require one's-complement conversion");
  if (!ones?.workedExampleEvidence.some((item) => item.lesson === 5 && item.conceptGroups.flat().some((term) => /one.?s complement/i.test(term)))) push("STAGE2-ONES-WORKED", "S1.03 lacks a mapped one's-complement worked example");
  if (!ones?.practiceEvidence.some((item) => item.lesson === 5 && item.conceptGroups.flat().some((term) => /one.?s complement/i.test(term)))) push("STAGE2-ONES-PRACTICE", "S1.03 lacks mapped one's-complement practice");
  if (!ones?.assessmentEvidence.some((item) => item.questionId === "L005-Q1" && item.conceptGroups.flat().some((term) => /one.?s complement/i.test(term)))) push("STAGE2-ONES-ASSESSMENT", "S1.03 lacks the direct L005-Q1 one's-complement assessment mapping");

  for (const lesson of requiredOptionalLessons) {
    const entry = optionalByLesson.get(lesson);
    if (!entry) { push("STAGE2-OPTIONAL-INVENTORY", `L${String(lesson).padStart(3, "0")} is missing from the Optional enrichment inventory`); continue; }
    if (!entry.excludedFromCoverage || !entry.formalPrerequisite || !entry.optionalTopic || !entry.optionalSectionIds.length) push("STAGE2-OPTIONAL-POLICY", `L${String(lesson).padStart(3, "0")} lacks exclusion, scope, prerequisite or section data`);
    if (entry.coreRequirementIds.length === 0) {
      const dependency = contract.requirements.find((requirement) => requirement.teachingLessons.includes(lesson));
      if (dependency) push("STAGE2-OPTIONAL-LEAK", `L${String(lesson).padStart(3, "0")} is Optional-only but remains teaching evidence for ${dependency.id}`);
    }
  }

  return problems;
}

export function evaluateStage2Repository() {
  const problems = evaluateStage2Policy();
  for (const requirement of coverageContract.requirements) {
    const evaluation = evaluateRequirement(requirement);
    for (const message of evaluation.messages) problems.push({ id: "STAGE2-COVERAGE", detail: `${requirement.id}: ${message}` });
  }

  for (const entry of optionalEnrichment) {
    const paths = lessonPaths(entry.lesson);
    const html = fs.readFileSync(paths.htmlPath, "utf8");
    const markdown = fs.readFileSync(paths.markdownPath, "utf8");
    const number = String(entry.lesson).padStart(3, "0");
    if (!html.includes("Optional enrichment") || !html.includes(entry.formalPrerequisite)) problems.push({ id: "STAGE2-OPTIONAL-NOTICE", detail: `L${number} HTML lacks its visible scope/prerequisite notice` });
    if (!markdown.includes("**Optional enrichment:**") || !markdown.includes(entry.formalPrerequisite)) problems.push({ id: "STAGE2-OPTIONAL-NOTICE", detail: `L${number} Markdown lacks its visible scope/prerequisite notice` });
    for (const sectionId of entry.optionalSectionIds) {
      const tag = sectionTag(html, sectionId);
      if (!/data-delivery-role="OPTIONAL"/.test(tag) || !/data-classroom-activity="EXTEND"/.test(tag)) problems.push({ id: "STAGE2-OPTIONAL-ROLE", detail: `L${number}#${sectionId} is not OPTIONAL/EXTEND` });
    }
  }

  const l005 = fs.readFileSync(path.join(root, "web", "lesson-005", "app.js"), "utf8");
  if (!/Convert the integer -23 to 8-bit one’s-complement representation/.test(l005) || !/11101000/.test(l005)) problems.push({ id: "STAGE2-ONES-QUESTION", detail: "L005-Q1 is not a direct one's-complement conversion" });
  return problems;
}
