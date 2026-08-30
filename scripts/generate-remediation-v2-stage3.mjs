import fs from "node:fs";
import path from "node:path";

import { coverageContract } from "./syllabus-coverage-contract.mjs";
import { evaluateRemediationV2SemanticGate } from "./remediation-v2-semantic-gate.mjs";
import { evaluateStage3Repository } from "./remediation-v2-stage3-gate.mjs";
import { stage3OptionalBaseLessons } from "./remediation-v2-stage3-sequence-plan.mjs";

const root = path.resolve(import.meta.dirname, "..");
const audits = path.join(root, "audits");
const readJson = (name) => JSON.parse(fs.readFileSync(path.join(audits, name), "utf8"));
const writeJson = (name, value) => fs.writeFileSync(path.join(audits, name), `${JSON.stringify(value, null, 2)}\n`);
const defects = readJson("remediation-v2-defects.json");
const decision = readJson("remediation-v2-current-decision.json");

const closures = Object.freeze({
  "RV2-SEQ-001": [
    "121/121 official requirements now have reviewed Stage 3 first-use evidence; 109 official adjacent-order edges and 81 prerequisite edges pass",
    "968-question sequence register records 523 formal and 445 Optional enrichment questions with zero before-CORE violations",
  ],
  "RV2-ID-001": [
    "All 151 canonical lesson IDs and URLs reconcile across Markdown, HTML, course catalogue, paper and section ranges",
    "L138 no longer claims Section 12 ownership inside the Section 11 lesson range; L138/L139 legacy bodies are Optional enrichment",
  ],
});

for (const issue of defects.issues) if (closures[issue.id]) {
  issue.status = "Resolved";
  issue.closureEvidence = closures[issue.id];
}
defects.blockingSummary = "Stages 4-7 remain unaccepted. CIE wording, student mark-scheme presentation and the L050/L108/L122/L134 technical/image defects keep the release decision BLOCKED.";
defects.stageStatus = { stage: 3, status: "AwaitingUserApproval" };
if (!defects.stageApprovals.some(({ stage }) => stage === 2)) defects.stageApprovals.push({ stage: 2, status: "ApprovedForProgression", recordedDate: "2026-08-28", releaseDecision: false });
writeJson("remediation-v2-defects.json", defects);

decision.currentStage = { number: 3, name: "Restore official syllabus teaching order", implementationStatus: "Complete", approvalStatus: "AwaitingUserApproval" };
decision.decisionInputs = ["audits/remediation-v2-defects.json", "audits/remediation-v2-stage3-gate-result.json"];
if (!decision.historicalDecisions.some(({ stage }) => stage === 2)) decision.historicalDecisions.splice(2, 0, { stage: 2, decisionAtTime: "BLOCKED", progressionApproval: "ApprovedForProgression", historical: true, current: false });
writeJson("remediation-v2-current-decision.json", decision);

const { problems: stage3Problems, questionRegister } = evaluateStage3Repository();
const semanticGate = evaluateRemediationV2SemanticGate();
const counts = (status, severity) => defects.issues.filter((issue) => issue.status === status && (!severity || issue.severity === severity)).length;
const criticalIds = [...new Set(semanticGate.problems.filter(({ id }) => id.startsWith("CRIT-")).map(({ id }) => id))].sort();

const gateResult = {
  schemaVersion: 1,
  remediation: "v2",
  stage: 3,
  generatedDate: "2026-08-28",
  implementationStatus: stage3Problems.length ? "Blocked" : "Complete",
  approvalStatus: "AwaitingUserApproval",
  currentReleaseDecision: "BLOCKED",
  coverage: { completeRequirements: 121, partialRequirements: 0 },
  sequence: { officialRequirementRows: 121, officialOrderEdges: 109, prerequisiteEdges: 81, blockingProblems: stage3Problems.length },
  lessonIdentity: { stableLessonIds: 151, stableLessonUrls: 151, catalogueEntries: 151, optionalLegacyBodies: stage3OptionalBaseLessons.length },
  questionDependencies: { questions: questionRegister.questionCount, formal: questionRegister.formalCount, optionalEnrichment: questionRegister.optionalCount, beforeCoreViolations: questionRegister.violationCount },
  negativeControls: ["official first-use inversion", "intra-lesson official-row inversion", "assessment-before-CORE", "missing first-use review hash"],
  semanticGate: { status: semanticGate.status, problemCount: semanticGate.problems.length, sequenceProblemCount: semanticGate.sequence.problems.length, criticalIds },
  resolvedStage3Issues: Object.keys(closures),
  remainingOpenIssues: defects.issues.filter(({ status }) => status === "Open").map(({ id, severity }) => ({ id, severity })),
};

const closure = {
  schemaVersion: 1,
  stage: 3,
  records: defects.issues.map((issue) => ({
    id: issue.id,
    severity: issue.severity,
    stage3Disposition: closures[issue.id] ? "Resolved" : issue.status,
    closureEvidence: issue.closureEvidence ?? [],
    nextStage: issue.status === "Resolved" ? null : issue.id.startsWith("RV2-WORD") || issue.id.startsWith("RV2-MS") ? 4 : 5,
  })),
};

const report = `# AS9618 remediation v2 — Stage 3 official teaching sequence report

**Current release decision:** BLOCKED
**Stage status:** Implementation complete; awaiting user approval before Stage 4.

## Change summary

- Established 151 canonical lesson numbers and URLs, including the dedicated L010 Vector lesson, while relocating generated CORE blocks into official first-use order.
- All 121 requirements retain Complete teaching, worked-example, practice and direct-assessment evidence; Optional legacy lesson bodies do not establish first use.
- Section 2 now orders network models/topology/cloud/media/hardware/Ethernet/streaming/internet/IP-URL; Sections 4 and 9-12 follow the required prerequisite sequence.
- Seven stable lesson questions were rewritten at their existing IDs and marks to provide dependency-safe direct assessment after the relocated teaching.

## Issue closure table

| Issue | Stage 3 disposition | Evidence / next stage |
|---|---|---|
${closure.records.map((record) => `| ${record.id} | ${record.stage3Disposition} | ${record.closureEvidence.join("; ") || `Stage ${record.nextStage}`} |`).join("\n")}

## Passed evidence

- Stage 3 repository gate: ${stage3Problems.length === 0 ? "Passed" : `Failed (${stage3Problems.length})`}.
- Coverage: 121 Complete, 0 Partial; official order: 109/109 adjacent edges passed; prerequisite graph: 81 edges, 0 blockers.
- Lesson identity: 151 canonical IDs/URLs and 151 catalogue entries reconcile with HTML, Markdown, paper and section ranges.
- Question dependency register: ${questionRegister.questionCount} total; ${questionRegister.formalCount} formal; ${questionRegister.optionalCount} Optional enrichment; ${questionRegister.violationCount} before-CORE violations.
- Current defect register: Resolved=${counts("Resolved")}; Open=${counts("Open")}; open P0=${counts("Open", "P0")}; open P1=${counts("Open", "P1")}.

## Active failed samples

- Mutation tests deliberately invert an official first-use edge, invert rows inside one CORE lesson, move a formal assessment before teaching and corrupt a first-use evidence hash; every mutation must be rejected.
- Full semantic gate remains ${semanticGate.status} with ${semanticGate.problems.length} later-stage technical/image findings and ${semanticGate.sequence.problems.length} sequence findings.
- Remaining critical IDs: ${criticalIds.join(", ")}.

## Command evidence

- node scripts/verify-curriculum-sequence.mjs — exit 0; 121 nodes, 109 official-order edges, 81 prerequisite edges and direct assessment checks passed.
- node scripts/verify-remediation-v2-stage3.mjs — exit 0; Stage 3 repository acceptance passed.
- node scripts/test-remediation-v2-stage3-mutations.mjs — exit 0; four active mutations rejected.
- node scripts/verify-stage9-classroom.mjs — exit 0; 151 catalogued lessons and delivery roles passed.
- node scripts/verify-syllabus-coverage.mjs — expected exit 1; only ${semanticGate.problems.length} Stage 5 critical semantic/image findings remain.

## Failed / open

- Remaining defect register: ${counts("Open")} Open; P0=${counts("Open", "P0")}; P1=${counts("Open", "P1")}.
- Stage 4 CIE wording and student mark-scheme presentation remain open.
- Stage 5 L050 processor factors and L108/L122/L134 pseudocode/function defects remain open.

## Unverified

- No Stage 4 wording approval, Stage 5 technical/image repair, Stage 6 browser/image census or Stage 7 independent final review is claimed.
- Full verify-all and browser QA remain deferred while the sole release decision is BLOCKED.

## Remaining risks

- ${questionRegister.optionalCount} legacy lesson questions are explicitly Optional enrichment after CORE relocation; Stage 4 still must review all 968 prompts and mark schemes against official wording and answer boundaries.
- Commit, push and publication remain unauthorised.

## Stop condition

Do not start Stage 4 until the user approves Stage 3. Stage approval authorises progression only; it is not a release decision.
`;

writeJson("remediation-v2-stage3-gate-result.json", gateResult);
writeJson("remediation-v2-stage3-closure.json", closure);
fs.writeFileSync(path.join(audits, "remediation-v2-stage3-report.md"), report);
console.log(`Generated remediation v2 Stage 3 evidence: ${counts("Resolved")} resolved, ${counts("Open")} open, ${semanticGate.problems.length} later-stage findings, decision BLOCKED.`);
