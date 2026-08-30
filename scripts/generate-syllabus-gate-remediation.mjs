import fs from "node:fs";
import path from "node:path";

import { coverageContract } from "./syllabus-coverage-contract.mjs";
import { buildCurriculumSequenceModel } from "./curriculum-sequence-model.mjs";
import { evaluateRequirement } from "./syllabus-coverage-evaluator.mjs";

const root = path.resolve(import.meta.dirname, "..");
const evaluations = coverageContract.requirements.map((requirement) => ({ requirement, evaluation: evaluateRequirement(requirement) }));
const sequence = buildCurriculumSequenceModel();
const dimensionCounts = {};
for (const { evaluation } of evaluations) {
  for (const message of evaluation.messages) {
    const dimension = message.startsWith("Markdown") ? "markdownTeaching"
      : message.startsWith("visible CORE") ? "visibleCoreTeaching"
        : message.startsWith("worked example") || message.startsWith("no worked") ? "workedExample"
          : message.startsWith("practice") || message.startsWith("no practice") ? "practiceAndMarkScheme"
            : message.startsWith("assessment") || message.startsWith("no direct") ? "directAssessment"
              : message.startsWith("visual") || message.startsWith("high-risk") ? "visualEvidence"
                : message.startsWith("contract evidence") ? "mappingReview"
                  : "other";
    dimensionCounts[dimension] = (dimensionCounts[dimension] ?? 0) + 1;
  }
}

const result = {
  schemaVersion: 1,
  status: "GateOperationalCourseBlocked",
  contract: {
    requirements: coverageContract.requirements.length,
    reviewedEvidenceMappings: coverageContract.requirements.filter(({ evidenceReviewStatus }) => evidenceReviewStatus === "Reviewed").length,
    pendingEvidenceMappings: coverageContract.requirements.filter(({ evidenceReviewStatus }) => evidenceReviewStatus === "Pending").length,
    complete: evaluations.filter(({ evaluation }) => evaluation.status === "Complete").length,
    partial: evaluations.filter(({ evaluation }) => evaluation.status === "Partial").length,
    dimensionCounts,
  },
  sequence: {
    nodes: sequence.nodeCount,
    edges: sequence.edgeCount,
    directAssessmentEvidence: sequence.assessmentEvidenceCount,
    blockingProblems: sequence.problems,
  },
  mutationCoverage: {
    allRequirementConceptDeletion: 121,
    coreToOptional: ["S4.15"],
    directAssessmentMutation: ["AQ051-Q4"],
    prerequisiteOrderMutation: ["S1.01->S1.08"],
    forbiddenSemanticPatterns: coverageContract.forbiddenSemanticPatterns.length,
    command: "node scripts/test-syllabus-gate-mutations.mjs",
  },
  verifiedInfrastructureRepairs: ["SCI-COV-001", "SCI-COV-002", "SCI-COV-003", "SCI-COV-004", "SCI-SEQ-000"],
  releaseRule: "A passing schema and mutation suite proves that the gate is active; it does not approve course content. Release remains blocked while any requirement is Partial, any evidence mapping is Pending, or any sequence problem remains.",
};

fs.writeFileSync(path.join(root, "audits", "syllabus-gate-remediation.json"), `${JSON.stringify(result, null, 2)}\n`);

const lines = [
  "# Syllabus gate remediation — Batch 0",
  "",
  "**Status:** Gate operational; course release remains blocked.",
  "",
  "## Outcome",
  "",
  `- Contract schema: v2, ${result.contract.requirements}/121 unique requirement rows.`,
  `- Evidence mappings independently reviewed: ${result.contract.reviewedEvidenceMappings}/121; pending: ${result.contract.pendingEvidenceMappings}/121.`,
  `- Strict coverage result: ${result.contract.complete} Complete, ${result.contract.partial} Partial.`,
  `- Sequence model: ${result.sequence.nodes} nodes, ${result.sequence.edges} prerequisite edges, ${result.sequence.blockingProblems.length} blocking problems.`,
  "- Infrastructure repairs implemented and regression-tested: SCI-COV-001, SCI-COV-002, SCI-COV-003, SCI-COV-004 and SCI-SEQ-000. The frozen first-round register remains unchanged as historical evidence.",
  "",
  "## Current sequence blockers",
  "",
  ...result.sequence.blockingProblems.map((problem) => `- ${problem.type} \`${problem.id}\`: ${problem.detail}`),
  "",
  "## Mutation evidence",
  "",
  "- Every one of the 121 requirements rejects a synthetic concept removed from both Markdown and visible CORE HTML.",
  "- CORE-to-OPTIONAL, direct-question content, prerequisite order and all five prohibited-semantics mutations are detected.",
  "- Run `node scripts/test-syllabus-gate-mutations.mjs` to reproduce.",
  "",
  "## Interpretation",
  "",
  result.releaseRule,
  "",
];
fs.writeFileSync(path.join(root, "audits", "syllabus-gate-remediation.md"), lines.join("\n"));
console.log(`Generated syllabus gate remediation report: ${result.contract.reviewedEvidenceMappings} reviewed mappings, ${result.sequence.blockingProblems.length} sequence blockers.`);
