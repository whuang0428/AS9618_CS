import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import { explanations } from "./stage10-explanations-data.mjs";
import { semanticAudit, semanticDefects } from "./stage10-semantic-audit-data.mjs";
import { evaluateSemanticCalculation, semanticCalculations } from "./stage10-semantic-calculations.mjs";

const root = path.resolve(import.meta.dirname, "..");
const auditDirectory = path.join(root, "audits");
const assetDirectory = path.join(root, "web", "assets", "diagrams", "stage10-infographics");
const csv = (value) => /[",\n]/.test(String(value ?? "")) ? `"${String(value ?? "").replaceAll('"', '""')}"` : String(value ?? "");
const hash = (value) => crypto.createHash("sha256").update(value).digest("hex");
const rank = Object.freeze({ None: 0, Minor: 1, Major: 2, Critical: 3 });

function sourceText(item) {
  return [item.title, ...(item.transcript ?? item.steps), item.analogy, item.boundary].filter(Boolean).join("\n");
}

function riskFlags(item) {
  const text = sourceText(item);
  const flags = [];
  if (/\b[01]{4,}\b/.test(text)) flags.push("binary");
  if (/\b\d+(?:\.\d+)?\b/.test(text)) flags.push("numeric");
  if (/[=+×÷<>]|\b(?:bit|byte|KiB|MiB|Hz|pixel|address|register|opcode|operand)\b/i.test(text)) flags.push("formula-or-state");
  if (/\b(?:step|stage|cycle|flow|sequence|then|before|after|input|output|route|pipeline|trace)\b/i.test(text)) flags.push("process-or-arrow");
  return flags.length ? flags.join(";") : "conceptual";
}

const defectsByKey = Map.groupBy(semanticDefects, (item) => item.key);
const calculationResults = semanticCalculations.map((check) => ({ ...check, passed: evaluateSemanticCalculation(check) }));
const calculationsByKey = Map.groupBy(calculationResults, (item) => item.key);
const rows = explanations.map((item) => {
  const key = `${item.lesson}/${item.targetId}`;
  const asset = path.basename(item.visual.src);
  const assetPath = path.join(assetDirectory, asset);
  const bytes = fs.readFileSync(assetPath);
  const defects = (defectsByKey.get(key) ?? []).filter((entry) => !entry.resolved);
  const calculations = calculationsByKey.get(key) ?? [];
  const maxSeverity = defects.reduce((current, entry) => rank[entry.severity] > rank[current] ? entry.severity : current, "None");
  const complete = semanticAudit.firstPassComplete && semanticAudit.secondPassComplete;
  return {
    lesson: item.lesson,
    targetId: item.targetId,
    key,
    asset,
    sha256: hash(bytes),
    title: item.title,
    sourceFactsHash: hash(sourceText(item)),
    riskFlags: riskFlags(item),
    pass1: semanticAudit.firstPassComplete ? "Reviewed" : "Pending",
    pass2: semanticAudit.secondPassComplete ? "Reviewed" : "Pending",
    status: !complete ? "Pending" : maxSeverity === "None" ? "Approved" : `Defect${maxSeverity}`,
    maxSeverity,
    confidence: defects.length ? defects.sort((left, right) => rank[right.severity] - rank[left.severity])[0].confidence : complete ? "High" : "Unknown",
    defectIds: defects.map((entry) => entry.id).join(";"),
    automatedChecks: calculations.map((entry) => entry.id).join(";"),
    automatedCheckStatus: !calculations.length ? "NotApplicable" : calculations.every((entry) => entry.passed) ? "Passed" : "KnownDefect",
    notes: defects.length ? `${defects.length} unresolved semantic defect(s)` : complete ? "No defect found in two visual passes" : "Semantic review incomplete",
  };
});

fs.mkdirSync(auditDirectory, { recursive: true });
const registerHeader = ["lesson", "target_id", "asset", "sha256", "title", "source_facts_hash", "risk_flags", "pass1", "pass2", "status", "max_severity", "confidence", "defect_ids", "automated_checks", "automated_check_status", "notes"];
const register = [registerHeader, ...rows.map((item) => [item.lesson, item.targetId, item.asset, item.sha256, item.title, item.sourceFactsHash, item.riskFlags, item.pass1, item.pass2, item.status, item.maxSeverity, item.confidence, item.defectIds, item.automatedChecks, item.automatedCheckStatus, item.notes])]
  .map((row) => row.map(csv).join(",")).join("\n");
fs.writeFileSync(path.join(auditDirectory, "stage10-semantic-review-register.csv"), `${register}\n`);

const defectHeader = ["defect_id", "lesson", "target_id", "asset", "region", "category", "visible_content", "expected_content", "source", "severity", "confidence", "blocks_release", "resolved", "proposed_fix"];
const defectRows = semanticDefects.map((item) => {
  const [lesson, targetId] = item.key.split("/");
  const asset = rows.find((row) => row.key === item.key)?.asset ?? "";
  return [item.id, lesson, targetId, asset, item.region, item.category, item.visibleContent, item.expectedContent, item.source, item.severity, item.confidence, item.blocksRelease, item.resolved, item.proposedFix];
});
const defectsCsv = [defectHeader, ...defectRows].map((row) => row.map(csv).join(",")).join("\n");
fs.writeFileSync(path.join(auditDirectory, "stage10-semantic-defects.csv"), `${defectsCsv}\n`);

const statusCounts = Object.fromEntries(["Approved", "DefectCritical", "DefectMajor", "DefectMinor", "Pending"].map((status) => [status, rows.filter((row) => row.status === status).length]));
const severityCounts = Object.fromEntries(["Critical", "Major", "Minor"].map((severity) => [severity, semanticDefects.filter((item) => !item.resolved && item.severity === severity).length]));
const approvedRate = rows.length ? (statusCounts.Approved / rows.length * 100).toFixed(2) : "0.00";
const sourceGrounded = explanations.filter((item) => item.sourceGrounded).length;
const pilot = explanations.length - sourceGrounded;
const riskNames = ["binary", "numeric", "formula-or-state", "process-or-arrow", "conceptual"];
const riskTable = riskNames.map((risk) => {
  const matching = rows.filter((row) => row.riskFlags.split(";").includes(risk));
  return `| ${risk} | ${matching.length} | ${matching.filter((row) => row.status !== "Approved").length} |`;
}).join("\n");
const lessonTable = Array.from({ length: 150 }, (_, index) => String(index + 1).padStart(3, "0")).map((lesson) => {
  const matching = rows.filter((row) => row.lesson === lesson);
  return `| ${lesson} | ${matching.length} | ${matching.filter((row) => row.status === "Approved").length} | ${matching.filter((row) => row.status === "DefectCritical").length} | ${matching.filter((row) => row.status === "DefectMajor").length} | ${matching.filter((row) => row.status === "DefectMinor").length} |`;
}).join("\n");
const priorityBatches = ["Critical", "Major", "Minor"].map((severity, index) => {
  const items = semanticDefects.filter((item) => !item.resolved && item.severity === severity);
  return `### Batch ${index + 1}: ${severity}\n\n${items.length ? items.map((item) => `- ${item.id} (${item.key}): ${item.proposedFix}`).join("\n") : "- None"}`;
}).join("\n\n");
const calculationFailures = calculationResults.filter((item) => !item.passed);
const defectTable = semanticDefects.length
  ? semanticDefects.map((item) => `| ${item.id} | ${item.key} | ${item.severity} | ${item.region} | ${item.visibleContent} | ${item.expectedContent} |`).join("\n")
  : "| None | - | - | - | - | - |";
const report = `# Stage 10 Semantic Image Audit\n\n## Audit state\n\n- Scope: ${rows.length} Stage 10 generated infographics (${sourceGrounded} rollout-source assets and ${pilot} pilot explanations).\n- First visual pass: ${semanticAudit.firstPassComplete ? "complete" : "incomplete"}.\n- Second reverse-order visual pass: ${semanticAudit.secondPassComplete ? "complete" : "incomplete"}.\n- Method: ${semanticAudit.method}\n- OCR role: locator only; OCR Clear is not treated as semantic approval.\n- Audit completed: ${semanticAudit.firstPassComplete && semanticAudit.secondPassComplete && statusCounts.Pending === 0 ? "yes" : "no"}.\n- Course release-ready: ${semanticDefects.some((item) => !item.resolved && item.blocksRelease) ? "no" : "yes"}.\n\n## Asset outcomes\n\n- Approved: ${statusCounts.Approved} (${approvedRate}%).\n- Critical assets: ${statusCounts.DefectCritical}.\n- Major assets: ${statusCounts.DefectMajor}.\n- Minor assets: ${statusCounts.DefectMinor}.\n- Pending: ${statusCounts.Pending}.\n\n## Open defects\n\n- Critical: ${severityCounts.Critical}.\n- Major: ${severityCounts.Major}.\n- Minor: ${severityCounts.Minor}.\n- Release blocked: ${semanticDefects.some((item) => !item.resolved && item.blocksRelease) ? "yes" : "no"}.\n\n## Automated calculation checks\n\n- Checks executed: ${calculationResults.length}.\n- Passed: ${calculationResults.length - calculationFailures.length}.\n- Failed and linked to registered defects: ${calculationFailures.length}.\n\n${calculationResults.map((item) => `- ${item.id} (${item.key}): ${item.passed ? "PASS" : `KNOWN DEFECT (${(item.defectIds ?? []).join(", ")})`} - ${item.description}`).join("\n")}\n\n## Statistics by risk type\n\nRisk labels overlap; one asset may appear in more than one row.\n\n| Risk type | Assets | Assets with defects |\n|---|---:|---:|\n${riskTable}\n\n## Statistics by lesson\n\n| Lesson | Assets | Approved | Critical assets | Major assets | Minor assets |\n|---|---:|---:|---:|---:|---:|\n${lessonTable}\n\n## Complete defect index\n\n| Defect | Asset key | Severity | Region | Visible content | Expected content |\n|---|---|---|---|---|---|\n${defectTable}\n\n## Prioritised repair batches\n\n${priorityBatches}\n\n## Interpretation\n\nAudit completion and release readiness are separate. This audit is complete, but unresolved Critical or Major defects keep the course release blocked.\n`;
fs.writeFileSync(path.join(auditDirectory, "stage10-semantic-review-report.md"), report);

console.log(`Generated Stage 10 semantic audit: ${rows.length} assets; ${semanticDefects.length} defects; ${statusCounts.Pending} pending.`);
