import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import { evaluateAuditIntegrity, loadOfficialInventory } from "./remediation-v2-audit-integrity-gate.mjs";

const root = path.resolve(import.meta.dirname, "..");
const contractPath = path.join(root, "scripts", "syllabus-coverage-contract.json");
const contract = JSON.parse(fs.readFileSync(contractPath, "utf8"));
const inventory = loadOfficialInventory();
const reviewEpoch = "remediation-v2-audit-integrity-r2";
const digest = (value) => crypto.createHash("sha256").update(typeof value === "string" ? value : JSON.stringify(value)).digest("hex");

const live = evaluateAuditIntegrity(contract, inventory);
if (live.status !== "Ready") {
  throw new Error(`Refusing to approve coverage while the audit-integrity gate has ${live.problemCount} problem(s).`);
}

function sectionHtml(html, sectionId) {
  const opening = new RegExp(`<section\\b[^>]*\\bid="${sectionId}"[^>]*>`, "i").exec(html);
  if (!opening) throw new Error(`Missing first-teaching section #${sectionId}`);
  const tokens = /<section\b[^>]*>|<\/section>/gi;
  tokens.lastIndex = opening.index;
  let depth = 0;
  let match;
  while ((match = tokens.exec(html))) {
    if (/^<section/i.test(match[0])) depth += 1;
    else if (--depth === 0) return html.slice(opening.index, tokens.lastIndex);
  }
  throw new Error(`Unclosed first-teaching section #${sectionId}`);
}

for (const requirement of contract.requirements) {
  const lesson = requirement.firstTeachingEvidence.lesson;
  const sectionId = requirement.firstTeachingEvidence.sectionId;
  const htmlPath = path.join(root, "web", `lesson-${String(lesson).padStart(3, "0")}`, "index.html");
  const firstTeachingHash = digest(sectionHtml(fs.readFileSync(htmlPath, "utf8"), sectionId));

  requirement.evidenceReviewStatus = "Reviewed";
  requirement.evidenceReviewRound = reviewEpoch;
  requirement.integrityReviewStatus = "Reviewed";
  requirement.integrityReview = {
    reviewEpoch,
    reviewer: "audit-integrity-source-and-rendered-first-use-gates",
    officialSourceStatus: "Reviewed",
    firstTeachingPageStatus: "Reviewed",
    officialInventoryHash: inventory.inventoryHash,
    officialReferenceHash: requirement.officialReference.evidenceHash,
    firstTeachingContentHash: firstTeachingHash,
    evidenceLocations: [
      "audits/remediation-v2-official-as-source-inventory.json",
      `web/lesson-${String(lesson).padStart(3, "0")}/index.html#${sectionId}`,
    ],
  };
  const firstUseBasis = {
    requirement: requirement.id,
    lesson,
    sectionId,
    officialReferenceHash: requirement.officialReference.evidenceHash,
    reviewRound: reviewEpoch,
    firstTeachingContentHash: firstTeachingHash,
  };
  requirement.firstUseReview = {
    ...firstUseBasis,
    contentHash: digest(firstUseBasis),
    status: "Reviewed",
  };
}

contract.auditIntegrity = {
  ...contract.auditIntegrity,
  reviewEpoch,
  priorCompleteStatuses: "InvalidatedAndRevalidated",
  currentRequirementCount: contract.requirements.length,
  currentReviewedCount: contract.requirements.filter(({ integrityReviewStatus }) => integrityReviewStatus === "Reviewed").length,
  rule: "A requirement is Complete only when its locked official source-unit bindings and exact rendered first-teaching section pass the independent bidirectional gate in this epoch.",
};

fs.writeFileSync(contractPath, `${JSON.stringify(contract, null, 2)}\n`);
console.log(`Reviewed ${contract.requirements.length}/${contract.requirements.length} requirements in ${reviewEpoch} after zero source and first-teaching gate failures.`);
