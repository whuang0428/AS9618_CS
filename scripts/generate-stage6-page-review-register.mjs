import fs from "node:fs";
import path from "node:path";

import { pageDefinitions, pageHash, root } from "./stage6-qa-utils.mjs";

const evidencePath = path.join(root, "audits", "remediation-v2-stage6-browser-evidence.json");
if (!fs.existsSync(evidencePath)) throw new Error("Fresh remediation-v2 Stage 6 browser evidence is required; this generator cannot create Approved rows without it.");
const evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"));
if (evidence.sourceApprovalImported !== false || evidence.viewportRecordCount !== 306 || evidence.failedRecords !== 0) {
  throw new Error("Fresh Stage 6 browser evidence is incomplete or attempts to inherit old approval state.");
}
const byKey = new Map(evidence.records.map((row) => [`${row.page}/${row.viewport}`, row]));
const csv = (value) => `"${String(value).replaceAll('"', '""')}"`;
const header = ["page", "kind", "desktop_1440", "mobile_390", "console", "status", "content_hash", "reviewer", "review_round", "evidence", "approval_source"];
const rows = pageDefinitions.map((definition) => {
  const desktop = byKey.get(`${definition.page}/1440x900`);
  const mobile = byKey.get(`${definition.page}/390x844`);
  const currentHash = pageHash(definition);
  if (!desktop || !mobile || desktop.status !== "Pass" || mobile.status !== "Pass") throw new Error(`${definition.page}: both current browser records must pass`);
  if (desktop.sourceHash !== currentHash || mobile.sourceHash !== currentHash) throw new Error(`${definition.page}: browser evidence is stale`);
  return [
    definition.page, definition.kind, "Pass", "Pass", "Pass", "ApprovedCurrentBrowser",
    currentHash, "Codex in-app Browser QA", "stage6-browser-r1",
    `audits/remediation-v2-stage6-browser-evidence.json#${definition.page}`,
    "Fresh 1440x900 and 390x844 current-page records; no legacy approval imported",
  ].map(csv).join(",");
});
fs.writeFileSync(path.join(root, "audits", "stage6-page-review-register.csv"), `${header.map(csv).join(",")}\n${rows.join("\n")}\n`);
console.log(`Generated Stage 6 page review register from ${evidence.viewportRecordCount} fresh browser records for ${rows.length} pages.`);
