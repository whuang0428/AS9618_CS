import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const contractPath = path.join(root, "scripts", "syllabus-coverage-contract.json");
const inventoryPath = path.join(root, "audits", "remediation-v2-official-as-source-inventory.json");
const contract = JSON.parse(fs.readFileSync(contractPath, "utf8"));
const inventory = JSON.parse(fs.readFileSync(inventoryPath, "utf8"));

const normalise = (value) => String(value)
  .replace(/[’‘`]/g, "'")
  .replace(/(\w)-\s+(?=\w)/g, "$1 ")
  .replace(/[^a-zA-Z0-9#+<>&']+/g, " ")
  .replace(/\s+/g, " ").trim().toLowerCase();
const hash = (value) => crypto.createHash("sha256").update(JSON.stringify(value)).digest("hex");
const wordCount = (value) => normalise(value).split(" ").filter(Boolean).length;

function sourceMatchesClaim(item, claims) {
  if (item.coverageRole !== "claim") return false;
  const source = normalise(item.text);
  const corpus = normalise(claims.join(" "));
  if (corpus.includes(source)) return true;
  return claims.some((claim) => {
    const candidate = normalise(claim);
    return candidate && source.includes(candidate) && (wordCount(candidate) >= 3 || source.startsWith(`${candidate} `) || source === candidate);
  });
}

contract.schemaVersion = 4;
contract.auditIntegrity = {
  reviewEpoch: "remediation-v2-audit-integrity-r1",
  officialSourceInventory: "audits/remediation-v2-official-as-source-inventory.json",
  officialSourceInventoryHash: inventory.inventoryHash,
  priorCompleteStatuses: "InvalidatedPendingRevalidation",
  rule: "A requirement is not Complete until its official source-unit bindings and rendered first-teaching integrity are independently revalidated in this epoch.",
};

for (const requirement of contract.requirements) {
  const reference = requirement.officialReference;
  const sourceIds = inventory.items.filter((item) => item.section === requirement.section && (
    (item.kind === "candidate" && sourceMatchesClaim(item, reference.candidateStatements))
    || (item.kind === "note" && sourceMatchesClaim(item, reference.adjacentNotesAndGuidance))
  )).map(({ sourceId }) => sourceId);
  reference.sourceInventoryHash = inventory.inventoryHash;
  reference.sourceUnitIds = [...new Set(sourceIds)];
  const { evidenceHash: _oldEvidenceHash, ...referenceBasis } = reference;
  reference.evidenceHash = hash(referenceBasis);
  requirement.evidenceReviewStatus = "Pending";
  requirement.evidenceReviewRound = "remediation-v2-audit-integrity-r1";
  requirement.integrityReviewStatus = "Pending";
  requirement.integrityReview = {
    reviewEpoch: "remediation-v2-audit-integrity-r1",
    officialSourceStatus: "Pending",
    firstTeachingPageStatus: "Pending",
    reason: "All legacy Complete/Reviewed statuses were invalidated after the L009 buried-CORE false positive exposed the old gate's presence-only semantics.",
  };
  if (requirement.firstUseReview) {
    requirement.firstUseReview.officialReferenceHash = reference.evidenceHash;
    requirement.firstUseReview.reviewRound = "remediation-v2-audit-integrity-r1";
    requirement.firstUseReview.status = "PendingRevalidation";
    const { contentHash: _oldContentHash, status: _oldStatus, ...reviewBasis } = requirement.firstUseReview;
    requirement.firstUseReview.contentHash = hash(reviewBasis);
  }
}

fs.writeFileSync(contractPath, `${JSON.stringify(contract, null, 2)}\n`);
console.log(`Invalidated ${contract.requirements.length} legacy coverage conclusions and bound current mappings to ${inventory.inventoryHash}.`);
