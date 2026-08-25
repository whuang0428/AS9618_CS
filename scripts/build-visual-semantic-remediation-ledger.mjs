import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = Object.fromEntries(process.argv.slice(2).map((argument) => {
  const [key, ...value] = argument.split("=");
  return [key.replace(/^--/, ""), value.join("=")];
}));

if (!args.ledger || !args.findings) {
  throw new Error("Usage: node scripts/build-visual-semantic-remediation-ledger.mjs --ledger=/tmp/.../ledger.json --findings=/tmp/.../findings.csv");
}

function parseCsv(source) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    if (quoted) {
      if (character === '"' && source[index + 1] === '"') {
        cell += '"';
        index += 1;
      } else if (character === '"') quoted = false;
      else cell += character;
    } else if (character === '"') quoted = true;
    else if (character === ",") {
      row.push(cell);
      cell = "";
    } else if (character === "\n") {
      row.push(cell);
      if (row.some((value) => value !== "")) rows.push(row);
      row = [];
      cell = "";
    } else if (character !== "\r") cell += character;
  }
  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }
  const header = rows.shift();
  return rows.map((values) => Object.fromEntries(header.map((name, index) => [name, values[index] ?? ""])));
}

function sha256File(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

const sourceLedger = JSON.parse(fs.readFileSync(path.resolve(args.ledger), "utf8"));
const findings = parseCsv(fs.readFileSync(path.resolve(args.findings), "utf8"));
const conceptRows = parseCsv(fs.readFileSync(path.join(root, "audits", "stage10-concept-visual-register.csv"), "utf8"));
const conceptByKey = new Map(conceptRows.map((row) => [`${row.lesson}/${row.visual_id}`, row]));
const findingByKey = new Map(findings.map((row) => [`${row.lesson}/${row.visual_id}`, row]));

if (sourceLedger.length !== 968 || findings.length !== 66) {
  throw new Error(`Expected 968 review rows and 66 findings; received ${sourceLedger.length} and ${findings.length}.`);
}

const ledger = sourceLedger.map((row) => {
  const concept = conceptByKey.get(`${row.lesson}/${row.visual_id}`);
  if (!concept) throw new Error(`Missing concept register row for ${row.lesson}/${row.visual_id}`);
  const relativeAsset = row.asset_path?.startsWith(root) ? path.relative(root, row.asset_path) : "";
  return {
    ordinal: row.ordinal,
    key: `${row.lesson}/${row.visual_id}`,
    lesson: row.lesson,
    syllabusSection: row.syllabus_section,
    route: row.route,
    visualId: row.visual_id,
    sectionId: row.section_id,
    method: row.method,
    stage10: row.stage10,
    targetId: row.target_id,
    asset: relativeAsset || row.asset || "",
    baselineAssetSha256: relativeAsset && fs.existsSync(path.join(root, relativeAsset)) ? sha256File(path.join(root, relativeAsset)) : row.sha256,
    baselineContentHash: concept.content_hash,
    title: row.title,
    expectedFacts: row.expected_facts,
    source: row.source,
    riskFlags: row.risk_flags,
    pass1: row.pass1,
    pass1Evidence: row.pass1_evidence,
    pass1Verdict: row.pass1_verdict,
    pass2: row.pass2,
    pass2Evidence: row.pass2_evidence,
    pass2Verdict: row.pass2_verdict,
    reconciliation: row.reconciliation,
    findingKey: findingByKey.has(`${row.lesson}/${row.visual_id}`) ? `${row.lesson}/${row.visual_id}` : "",
  };
});

const remediations = findings.map((finding) => {
  const key = `${finding.lesson}/${finding.visual_id}`;
  const baseline = ledger.find((row) => row.key === key);
  if (!baseline) throw new Error(`Finding has no review ledger row: ${key}`);
  return {
    key,
    lesson: finding.lesson,
    visualId: finding.visual_id,
    visualType: finding.visual_type,
    route: finding.route,
    sectionId: finding.dom_section,
    file: finding.file.startsWith(root) ? path.relative(root, finding.file) : finding.file,
    classification: finding.classification,
    severity: finding.severity,
    confidence: finding.confidence,
    issue: finding.student_visible_issue,
    requiredCorrection: finding.recommended_correction,
    authority: finding.authority,
    beforeContentHash: baseline.baselineContentHash,
    beforeAssetSha256: baseline.baselineAssetSha256,
    afterContentHash: "",
    afterAssetSha256: "",
    pass1: { status: "pending", evidence: "" },
    pass2: { status: "pending", evidence: "" },
    reconciliation: "pending",
    resolved: false,
  };
});

fs.writeFileSync(path.join(root, "audits", "visual-semantic-review-ledger.json"), `${JSON.stringify({
  schemaVersion: 1,
  authority: [
    "Cambridge 9618 syllabus 2027-2029 Version 2",
    "Cambridge 9618 pseudocode guide 2027-2029",
    "Applicable official specimen and past-paper mark schemes",
  ],
  baselineCommit: "fb631b27137200bf90e6a29528fc5a461c1b7c9b",
  counts: { total: 968, stage10Jpg: 782, htmlCss: 170, inlineSvg: 13, otherRaster: 3 },
  records: ledger,
}, null, 2)}\n`);

fs.writeFileSync(path.join(root, "audits", "visual-semantic-remediation-register.json"), `${JSON.stringify({
  schemaVersion: 1,
  counts: { total: 66, confirmedErrors: 56, highRiskQuestions: 10, stage10Jpg: 60, htmlCss: 6 },
  records: remediations,
}, null, 2)}\n`);

console.log("Wrote 968-row visual review ledger and 66-row unresolved remediation register.");
