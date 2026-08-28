import fs from "node:fs";
import path from "node:path";
import { pageDefinitions, pageHash, root } from "./stage6-qa-utils.mjs";

if (process.argv.some((argument) => /approve/i.test(argument))) throw new Error("Stage 7 register generation does not accept approval flags");
const evidencePath = path.join(root, "audits", "remediation-v2-stage7-browser-evidence.json");
if (!fs.existsSync(evidencePath)) throw new Error("Fresh Stage 7 browser evidence is required before register generation");
const evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"));
if (evidence.sourceApprovalImported !== false || evidence.oldApprovedRowsUsedForDecision !== false
    || evidence.records?.length !== 306 || evidence.failedRecords !== 0 || evidence.keyboard?.status !== "PassedSystemKeyboard") {
  throw new Error("Stage 7 browser evidence is incomplete or imports a historical approval");
}
const byKey = new Map(evidence.records.map((row) => [`${row.page}/${row.viewport}`, row]));
const header = "page,semantics,keyboard,contrast,language,status,content_hash,reviewer,review_round,evidence";
const rows = pageDefinitions.map((definition) => {
  const currentHash = pageHash(definition);
  for (const viewport of ["1440x900", "390x844"]) {
    const row = byKey.get(`${definition.page}/${viewport}`);
    if (!row || row.status !== "PassedCurrentBrowser" || row.sourceHash !== currentHash) throw new Error(`${definition.page}/${viewport}: current browser decision is missing or stale`);
  }
  return [definition.page, "Pass", "Pass", "Pass", "Pass", "ReviewedCurrentBrowser", currentHash,
    "Codex independent final gate", "remediation-v2-stage7-r1", "audits/remediation-v2-stage7-browser-evidence.json"].join(",");
});
fs.writeFileSync(path.join(root, "audits", "stage7-accessibility-register.csv"), `${header}\n${rows.join("\n")}\n`);
console.log(`Generated Stage 7 evidence-derived register for ${rows.length} pages; no approval flag or inherited status was used.`);
