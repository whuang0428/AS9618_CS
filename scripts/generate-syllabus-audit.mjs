import fs from "node:fs";
import path from "node:path";
import { coverageContract } from "./syllabus-coverage-contract.mjs";
import { evaluateRequirement, lessonNumber } from "./syllabus-coverage-evaluator.mjs";

const root = path.resolve(import.meta.dirname, "..");
const sectionNames = {
  1: "Information representation", 2: "Communication", 3: "Hardware", 4: "Processor fundamentals",
  5: "System software", 6: "Security, privacy and data integrity", 7: "Ethics and ownership", 8: "Databases",
  9: "Algorithm design and problem-solving", 10: "Data types and structures", 11: "Programming", 12: "Software development",
};

const results = coverageContract.requirements.map((requirement) => ({ requirement, evaluation: evaluateRequirement(requirement) }));
const lines = [
  "# Cambridge 9618 AS Syllabus Coverage Audit",
  "",
  `**Syllabus:** ${coverageContract.syllabus}`,
  `**Scope:** ${coverageContract.scope}`,
  "**Source of truth:** `scripts/syllabus-coverage-contract.json` (schema v2). Runtime overrides are prohibited.",
  "**Generation rule:** status is derived from current Markdown, visible CORE HTML, anchored worked example, practice/MS, direct question IDs and risk-based visual evidence; it is not authored directly.",
  "",
  "## Coverage Summary",
  "",
  "| Section | Audit rows | Complete | Partial |",
  "|---|---:|---:|---:|",
];

for (const section of Object.keys(sectionNames).map(Number)) {
  const sectionResults = results.filter(({ requirement }) => requirement.section === section);
  const complete = sectionResults.filter(({ evaluation }) => evaluation.status === "Complete").length;
  lines.push(`| ${section} ${sectionNames[section]} | ${sectionResults.length} | ${complete} | ${sectionResults.length - complete} |`);
}
const complete = results.filter(({ evaluation }) => evaluation.status === "Complete").length;
lines.push(`| **Total** | **${results.length}** | **${complete}** | **${results.length - complete}** |`, "");

for (const section of Object.keys(sectionNames).map(Number)) {
  lines.push(`## Section ${section}: ${sectionNames[section]}`, "", "| ID | Official requirement and Notes | Teaching evidence | Worked + practice / MS evidence | Direct assessment evidence | Visual evidence | Status | Verification detail |", "|---|---|---|---|---|---|---|---|");
  for (const { requirement, evaluation } of results.filter(({ requirement }) => requirement.section === section)) {
    const webLessons = requirement.teachingLessons.map((lesson) => `W${lessonNumber(lesson)}`).join(", ");
    const markdownLessons = requirement.teachingLessons.map((lesson) => `M${lessonNumber(lesson)}`).join(", ");
    const worked = requirement.workedExampleEvidence.map((evidence) => `L${lessonNumber(evidence.lesson)}#${evidence.sectionId}`).join(", ") || "None declared";
    const practice = requirement.practiceEvidence.map((evidence) => `L${lessonNumber(evidence.lesson)}#${evidence.sectionId}`).join(", ") || "None declared";
    const assessment = requirement.assessmentEvidence.map(({ questionId }) => questionId).join(", ") || "None declared";
    const visual = requirement.visualEvidence.map((evidence) => `L${lessonNumber(evidence.lesson)}:${evidence.visualId}${evidence.required ? " (required)" : ""}`).join(", ") || "Not required";
    const detail = evaluation.messages.length ? evaluation.messages.join("; ") : "Contract evidence verified";
    const official = `${requirement.requirement}${requirement.notes ? ` Notes: ${requirement.notes}` : ""}`;
    lines.push(`| ${requirement.id} | ${official.replaceAll("|", "\\|")} | ${webLessons} visible CORE teaching; ${markdownLessons} matching lesson plans | ${worked}; ${practice} | ${assessment} | ${visual} | ${evaluation.status} | ${detail.replaceAll("|", "/")} |`);
  }
  lines.push("");
}

fs.writeFileSync(path.join(root, "syllabus-audit.md"), `${lines.join("\n").trimEnd()}\n`);
console.log(`Generated syllabus-audit.md from ${results.length} contracts: ${complete} Complete, ${results.length - complete} Partial.`);
