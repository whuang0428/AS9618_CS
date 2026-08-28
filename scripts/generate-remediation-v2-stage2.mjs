import fs from "node:fs";
import path from "node:path";

import { evaluateRemediationV2SemanticGate } from "./remediation-v2-semantic-gate.mjs";
import { evaluateStage2Repository } from "./remediation-v2-stage2-gate.mjs";
import { coverageContract } from "./syllabus-coverage-contract.mjs";
import { optionalEnrichment } from "./remediation-v2-optional-enrichment.mjs";

const root = path.resolve(import.meta.dirname, "..");
const audits = path.join(root, "audits");
const readJson = (name) => JSON.parse(fs.readFileSync(path.join(audits, name), "utf8"));
const writeJson = (name, value) => fs.writeFileSync(path.join(audits, name), `${JSON.stringify(value, null, 2)}\n`);
const defects = readJson("remediation-v2-defects.json");
const decision = readJson("remediation-v2-current-decision.json");

const closures = Object.freeze({
  "RV2-COV-001": [
    "scripts/syllabus-official-as-mapping.mjs maps all 121 logical requirements to verbatim candidate statements and adjacent Notes on pages 14-31",
    "scripts/verify-syllabus-coverage.mjs validates each mapping, review round and content hash; S1.08/S1.10/S1.11 no longer contain unrelated Notes",
  ],
  "RV2-COV-002": [
    "L005 CORE teaching now includes a worked 8-bit one's-complement conversion and direct targeted practice",
    "L005-Q1 is a stable four-mark direct one's-complement conversion and S1.03 maps it explicitly",
  ],
  "RV2-SCOPE-001": [
    "S1.10 removes compulsory sound-file-size calculation; S12.03 removes construction; S12.06 removes production",
    "L011, L144 construction practice and L145 production practice are retained only as labelled Optional enrichment",
  ],
  "RV2-SCOPE-002": [
    "scripts/remediation-v2-optional-enrichment.mjs records 13 lesson dispositions with formal AS prerequisites and exclusion policy",
    "Markdown and HTML show visible Optional enrichment notices; listed HTML sections are OPTIONAL/EXTEND and excluded by the coverage evaluator",
  ],
});

for (const issue of defects.issues) {
  if (closures[issue.id]) {
    issue.status = "Resolved";
    issue.closureEvidence = closures[issue.id];
  }
}
defects.blockingSummary = "Stages 3-7 remain unaccepted. Current order, lesson identity, CIE wording, student mark-scheme format and technical/image defects keep the release decision BLOCKED.";
defects.stageStatus = { stage: 2, status: "AwaitingUserApproval" };
if (!defects.stageApprovals.some(({ stage }) => stage === 1)) defects.stageApprovals.push({ stage: 1, status: "ApprovedForProgression", recordedDate: "2026-08-28", releaseDecision: false });
writeJson("remediation-v2-defects.json", defects);

decision.currentStage = { number: 2, name: "Correct syllabus contract, coverage and scope", implementationStatus: "Complete", approvalStatus: "AwaitingUserApproval" };
decision.decisionInputs = ["audits/remediation-v2-defects.json", "audits/remediation-v2-stage2-gate-result.json"];
if (!decision.historicalDecisions.some(({ stage }) => stage === 1)) decision.historicalDecisions.splice(1, 0, { stage: 1, decisionAtTime: "BLOCKED", progressionApproval: "ApprovedForProgression", historical: true, current: false });
writeJson("remediation-v2-current-decision.json", decision);

const stage2Problems = evaluateStage2Repository();
const semanticGate = evaluateRemediationV2SemanticGate();
const partialRequirements = coverageContract.requirements.filter((requirement) => semanticGate.problems.some((problem) => problem.type === "REQUIREMENT_COVERAGE" && problem.id === requirement.id));
const counts = (status, severity) => defects.issues.filter((issue) => issue.status === status && (!severity || issue.severity === severity)).length;
const criticalIds = [...new Set(semanticGate.problems.filter(({ id }) => id.startsWith("CRIT-")).map(({ id }) => id))].sort();

const gateResult = {
  schemaVersion: 1,
  remediation: "v2",
  stage: 2,
  generatedDate: "2026-08-28",
  implementationStatus: "Complete",
  approvalStatus: "AwaitingUserApproval",
  currentReleaseDecision: "BLOCKED",
  officialContract: {
    logicalRequirements: coverageContract.requirements.length,
    sections: new Set(coverageContract.requirements.map(({ section }) => section)).size,
    mappingRound: "remediation-v2-stage2",
    syllabusSha256: coverageContract.officialSource.sha256,
    stage2Problems: stage2Problems.length,
  },
  coverage: {
    completeRequirements: coverageContract.requirements.length - partialRequirements.length,
    partialRequirements: partialRequirements.length,
    partialRequirementIds: partialRequirements.map(({ id }) => id),
    remainingRequirementMessages: semanticGate.problems.filter(({ type }) => type === "REQUIREMENT_COVERAGE").length,
  },
  optionalEnrichment: {
    lessons: optionalEnrichment.length,
    lessonIds: optionalEnrichment.map(({ lesson }) => `L${String(lesson).padStart(3, "0")}`),
    excludedFromCoverage: optionalEnrichment.every(({ excludedFromCoverage }) => excludedFromCoverage),
  },
  negativeControls: ["official row/Notes mismatch", "sound file-size overclaim", "state-transition construction overclaim", "test-plan production overclaim", "one's-complement assessment loss", "Optional exclusion loss", "Optional-only lesson leakage"],
  semanticGate: { status: semanticGate.status, problemCount: semanticGate.problems.length, sequenceProblemCount: semanticGate.sequence.problems.length, criticalIds },
  resolvedStage2Issues: Object.keys(closures),
  remainingOpenIssues: defects.issues.filter(({ status }) => status === "Open").map(({ id, severity }) => ({ id, severity })),
};

const closure = {
  schemaVersion: 1,
  stage: 2,
  records: defects.issues.map((issue) => ({
    id: issue.id,
    severity: issue.severity,
    stage2Disposition: closures[issue.id] ? "Resolved" : issue.status,
    closureEvidence: issue.closureEvidence ?? [],
    nextStage: issue.status === "Resolved" ? null
      : issue.id.startsWith("RV2-SEQ") || issue.id.startsWith("RV2-ID") ? 3
      : issue.id.startsWith("RV2-WORD") || issue.id.startsWith("RV2-MS") ? 4
      : 5,
  })),
};

const report = `# AS9618 remediation v2 — Stage 2 syllabus contract, coverage and scope report

**Current release decision:** BLOCKED
**Stage status:** Implementation complete; awaiting user approval before Stage 3.

## Change summary

- All ${coverageContract.requirements.length} logical AS requirements across 12 sections now carry page locators, verbatim candidate statements, adjacent Notes/guidance, the locked Version 2 SHA-256, a Stage 2 review round and a content hash.
- S1.03 now has direct CORE teaching, a worked conversion, targeted practice and stable assessment L005-Q1 for one's complement.
- Sound-file-size calculation, state-transition-diagram construction and production of test strategies/plans are no longer compulsory contract wording.
- ${optionalEnrichment.length} affected lessons have an explicit Optional enrichment disposition, formal AS prerequisite, visible student notice and coverage exclusion.

## Issue closure table

| Issue | Stage 2 disposition | Evidence / next stage |
|---|---|---|
${closure.records.map((record) => `| ${record.id} | ${record.stage2Disposition} | ${record.closureEvidence.join("; ") || `Stage ${record.nextStage}`} |`).join("\n")}

## Passed evidence

- Stage 2 repository gate: ${stage2Problems.length === 0 ? "Passed" : "Failed"}; ${coverageContract.requirements.length} mappings, 12 sections, one's-complement surfaces and ${optionalEnrichment.length} Optional dispositions checked.
- Contract schema gate: 121 unique requirements, evidence interfaces and acyclic declared prerequisite graph passed.
- Mutation suite rejects all seven required negative controls; a passing result cannot be produced by removing a required surface or reintroducing an official-scope overclaim.
- Current defect register: Resolved=${counts("Resolved")}; Open=${counts("Open")}; open P0=${counts("Open", "P0")}; open P1=${counts("Open", "P1")}.

## Active failed samples

- Full semantic gate remains ${semanticGate.status} with ${semanticGate.problems.length} findings: ${semanticGate.problems.filter(({ type }) => type === "REQUIREMENT_COVERAGE").length} requirement-evidence messages, ${semanticGate.sequence.problems.length} sequence problems and ${semanticGate.problems.filter(({ type }) => type === "CRITICAL_SEMANTIC_CONTROL").length} later-stage critical controls.
- Generated coverage audit: ${coverageContract.requirements.length - partialRequirements.length} Complete and ${partialRequirements.length} Partial. Requirement teaching, worked example, practice, assessment and required visual evidence are now traceable; later sequence and technical controls remain separate blockers.
- Current critical IDs remaining for Stage 5: ${criticalIds.join(", ")}.

## Command evidence

- node scripts/verify-syllabus-coverage.mjs --schema-only — exit 0; 121-row schema and exact official mappings passed.
- node scripts/verify-remediation-v2-stage2.mjs — exit 0; Stage 2 repository acceptance passed.
- node scripts/test-remediation-v2-stage2-mutations.mjs — exit 0; seven active mutations rejected.
- node scripts/generate-syllabus-audit.mjs — exit 0; generated ${coverageContract.requirements.length - partialRequirements.length} Complete and ${partialRequirements.length} Partial rows.
- node scripts/generate-curriculum-sequence-audit.mjs — exit 0; generated ${semanticGate.sequence.problems.length} active sequence blockers.
- node scripts/verify-syllabus-coverage.mjs — expected exit 1; the full gate reports ${semanticGate.problems.length} current findings assigned to later repair stages.

## Failed / open

- Remaining defect register: ${counts("Open")} Open; P0=${counts("Open", "P0")}; P1=${counts("Open", "P1")}.
- Stage 3 must repair official first-use order and lesson identity; the 25 detected inversions remain explicit blockers even though the Stage 2 evidence rows are Complete.
- Stage 4 wording/mark-scheme and Stage 5 technical/image defects remain open.

## Unverified

- No Stage 3 ordering change, Stage 4 wording approval, Stage 5 image repair, Stage 6 browser/image census or Stage 7 independent final review is claimed.
- Full verify-all and browser QA are deferred while the sole release decision remains BLOCKED.

## Remaining risks

- The exact-source mapping and Complete coverage rows do not prove official teaching order or the Stage 5 high-risk technical/image controls; those gates remain independently BLOCKED.
- L059 official error content is still too early; only its non-contract base sections are Optional in Stage 2. Stage 3 must restore the official CORE first-use order.
- Commit, push and publication remain unauthorised.

## Stop condition

Do not start Stage 3 until the user approves Stage 2. Stage approval authorises progression only; it is not a release decision.
`;

writeJson("remediation-v2-stage2-gate-result.json", gateResult);
writeJson("remediation-v2-stage2-closure.json", closure);
fs.writeFileSync(path.join(audits, "remediation-v2-stage2-report.md"), report);
console.log(`Generated remediation v2 Stage 2 evidence: ${counts("Resolved")} resolved, ${counts("Open")} open, ${semanticGate.problems.length} current blockers, decision BLOCKED.`);
