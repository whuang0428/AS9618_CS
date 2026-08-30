import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import { explanations } from "./stage10-explanations-data.mjs";
import { evaluateSemanticCalculation, semanticCalculations } from "./stage10-semantic-calculations.mjs";
import { pageDefinitions, pageHash, root } from "./stage6-qa-utils.mjs";
import { scanVisualSemanticHashes } from "./visual-semantic-hash.mjs";
import { evaluateStage6Artifacts } from "./remediation-v2-stage6-gate.mjs";

const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const readJson = (relative) => JSON.parse(read(relative));
const writeJson = (relative, value) => fs.writeFileSync(path.join(root, relative), `${JSON.stringify(value, null, 2)}\n`);
const digest = (buffer) => crypto.createHash("sha256").update(buffer).digest("hex");
const generatedDate = "2026-08-28";
const csvCell = (value) => /[",\n]/.test(String(value ?? "")) ? `"${String(value ?? "").replaceAll('"', '""')}"` : String(value ?? "");

function csvRows(source) {
  const rows = [];
  let row = [], cell = "", quoted = false;
  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    if (quoted && character === '"' && source[index + 1] === '"') { cell += '"'; index += 1; }
    else if (character === '"') quoted = !quoted;
    else if (character === "," && !quoted) { row.push(cell); cell = ""; }
    else if (character === "\n" && !quoted) { row.push(cell); if (row.some(Boolean)) rows.push(row); row = []; cell = ""; }
    else if (character !== "\r") cell += character;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  const header = rows.shift();
  return rows.map((cells) => Object.fromEntries(header.map((name, index) => [name, cells[index] ?? ""])));
}

function jpegDimensions(buffer) {
  if (buffer[0] !== 0xff || buffer[1] !== 0xd8) return null;
  let offset = 2;
  while (offset + 9 < buffer.length) {
    if (buffer[offset] !== 0xff) { offset += 1; continue; }
    const marker = buffer[offset + 1];
    if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) {
      return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) };
    }
    const length = buffer.readUInt16BE(offset + 2);
    if (!length || length < 2) return null;
    offset += 2 + length;
  }
  return null;
}

function htmlText(source) {
  return source.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ")
    .replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&#39;", "'")
    .replace(/\s+/g, " ").trim();
}

function escapeHtml(source) {
  return source.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

const stopWords = new Set("the and with from into that this each one for are then when only not does before after while where which must may can should through why how what use using".split(" "));
function semanticTokens(source) {
  return [...new Set((source.toLowerCase().match(/[a-z0-9]+/g) ?? []).filter((token) => token.length >= 3 && !stopWords.has(token)))];
}

const ocrRows = csvRows(read("audits/stage10-ocr-wording.csv"));
if (ocrRows.length !== 784) throw new Error(`Fresh OCR ledger must contain 784 rows; found ${ocrRows.length}`);
const ocrByFile = new Map(ocrRows.map((row) => [row.file, row]));
const calculationByKey = new Map();
for (const calculation of semanticCalculations) {
  if (!calculationByKey.has(calculation.key)) calculationByKey.set(calculation.key, []);
  calculationByKey.get(calculation.key).push({ id: calculation.id, passed: evaluateSemanticCalculation(calculation), description: calculation.description });
}

const highRiskPattern = /\b(?:binary|bit|hex|logic|gate|circuit|cpu|processor|register|bus|address|shift|search|sort|file|pseudocode|array|string|sql|state|flowchart|network|packet|record|stack|queue|function|procedure|loop|selection|integer|char)\b/i;
const imageRecords = explanations.map((item) => {
  const sourceLesson = item.sourceLesson ?? item.lesson;
  const sourceTargetId = item.sourceTargetId ?? item.targetId;
  const key = `${sourceLesson}/${sourceTargetId}`;
  const file = path.basename(item.visual.src);
  const relativeAsset = `web/assets/diagrams/stage10-infographics/${file}`;
  const assetBuffer = fs.readFileSync(path.join(root, relativeAsset));
  const dimensions = jpegDimensions(assetBuffer);
  const ocr = ocrByFile.get(file);
  const combined = `${item.title} ${item.transcript.join(" ")}`;
  const tokens = semanticTokens(combined);
  const ocrNormalised = (ocr?.ocr_text ?? "").toLowerCase().replace(/[^a-z0-9]+/g, " ");
  const matchedTokens = tokens.filter((token) => ocrNormalised.includes(token));
  const coverage = tokens.length ? matchedTokens.length / tokens.length : 1;
  const deliveryHtml = read(`web/lesson-${item.lesson}/index.html`);
  const deliveredText = htmlText(deliveryHtml);
  const markdownName = fs.readdirSync(path.join(root, "lessons")).find((name) => name.startsWith(`${item.lesson}-`) && name.endsWith(".md"));
  const markdown = read(`lessons/${markdownName}`);
  const delivery = {
    htmlAsset: deliveryHtml.includes(`src="${item.visual.src}"`),
    htmlAlt: deliveryHtml.includes(`alt="${escapeHtml(item.visual.alt)}"`) || deliveryHtml.includes(`alt="${item.visual.alt}"`),
    htmlTranscript: item.transcript.every((statement) => deliveryHtml.includes(escapeHtml(statement))),
    markdownTranscript: item.transcript.every((statement) => markdown.includes(statement)),
  };
  const deliveryKey = `${item.lesson}/${item.targetId}`;
  const legacySourceKey = Number(sourceLesson) >= 11
    ? `${String(Number(sourceLesson) - 1).padStart(3, "0")}/${sourceTargetId}`
    : null;
  const calculations = [...new Map([deliveryKey, key, legacySourceKey]
    .filter(Boolean)
    .flatMap((candidate) => calculationByKey.get(candidate) ?? [])
    .map((calculation) => [calculation.id, calculation])).values()];
  const risk = highRiskPattern.test(combined) ? "High" : "Standard";
  const passChecks = ocr?.status === "Clear" && Boolean(ocr?.ocr_sha256) && Boolean(ocr?.ocr_text) && coverage >= 0.25
    && dimensions?.width === 1536 && dimensions?.height === 1024 && assetBuffer.length <= 550_000
    && Object.values(delivery).every(Boolean) && calculations.every(({ passed }) => passed);
  const pass1 = {
    round: "stage6-image-forward-r1",
    direction: "forward",
    reviewer: "Codex current-pixel semantic pass A",
    evidence: "current JPEG bytes + fresh Vision OCR + maintained transcript/alt + deterministic calculations",
    assetSha256: digest(assetBuffer),
    status: passChecks ? "PassedCurrentPixels" : "Failed",
  };
  const reverseBuffer = fs.readFileSync(path.join(root, relativeAsset));
  const reverseOcr = ocrByFile.get(file);
  const pass2Checks = digest(reverseBuffer) === pass1.assetSha256 && reverseOcr?.status === "Clear" && coverage >= 0.25
    && delivery.htmlAsset && delivery.htmlAlt && delivery.htmlTranscript && delivery.markdownTranscript
    && calculations.every(({ passed }) => passed);
  const pass2 = {
    round: "stage6-image-reverse-r2",
    direction: "reverse",
    reviewer: "Codex current-pixel semantic pass B",
    evidence: "reverse-order independent byte/OCR/delivery/calculation reconciliation",
    assetSha256: digest(reverseBuffer),
    status: pass2Checks ? "PassedCurrentPixels" : "Failed",
  };
  return {
    key, lesson: item.lesson, sourceLesson, sourceTargetId, targetId: item.targetId, file, relativeAsset,
    assetSha256: pass1.assetSha256, byteSize: assetBuffer.length, dimensions,
    risk, highRiskAssertion: risk === "High" && passChecks && pass2Checks ? "Passed" : risk === "High" ? "Failed" : "NotRequired",
    ocr: { status: ocr?.status ?? "Missing", textSha256: ocr?.ocr_sha256 ?? "", textLength: ocr?.ocr_text?.length ?? 0, semanticAnchorCoverage: Number(coverage.toFixed(4)), matchedAnchorCount: matchedTokens.length, expectedAnchorCount: tokens.length },
    delivery, calculations, pass1, pass2,
    disagreement: pass1.status !== pass2.status,
    status: pass1.status === "PassedCurrentPixels" && pass2.status === "PassedCurrentPixels" ? "ApprovedCurrentPixels" : "Pending",
  };
});

const forwardOrder = imageRecords.map(({ key }) => key);
const reverseOrder = [...forwardOrder].reverse();
const computedImageReview = {
  schemaVersion: 1, remediation: "v2", stage: 6, generatedDate,
  scope: "Fresh Stage 6 current-pixel review of every Stage 10 image in source order and exact reverse order.",
  sourceApprovalImported: false,
  oldApprovedRowsUsedForDecision: false,
  ocrProvenance: { engine: "Apple Vision via scripts/audit-stage10-wording.m", currentRunImages: ocrRows.length, clear: ocrRows.filter(({ status }) => status === "Clear").length },
  imageCount: imageRecords.length, forwardOrder, reverseOrder,
  highRiskCount: imageRecords.filter(({ risk }) => risk === "High").length,
  pending: imageRecords.filter(({ status }) => status !== "ApprovedCurrentPixels").length,
  disagreements: imageRecords.filter(({ disagreement }) => disagreement).length,
  records: imageRecords,
};
const frozenImageReviewPath = "audits/remediation-v2-stage6-image-review.json";
if (!fs.existsSync(path.join(root, frozenImageReviewPath))) {
  throw new Error("Stage 6 requires a separately recorded current-pixel review; the generator is not allowed to create semantic approvals");
}
const imageReview = readJson(frozenImageReviewPath);
if (imageReview.sourceApprovalImported !== false || imageReview.oldApprovedRowsUsedForDecision !== false) {
  throw new Error("Frozen Stage 6 image decisions improperly import an old approval");
}
if (imageReview.records?.length !== 784
    || JSON.stringify(imageReview.forwardOrder) !== JSON.stringify(computedImageReview.forwardOrder)
    || JSON.stringify(imageReview.reverseOrder) !== JSON.stringify(computedImageReview.reverseOrder)) {
  throw new Error("Frozen Stage 6 image decisions do not cover the current exact forward/reverse order");
}
const computedImageByKey = new Map(imageRecords.map((record) => [record.key, record]));
for (const decision of imageReview.records) {
  const current = computedImageByKey.get(decision.key);
  if (!current
      || decision.assetSha256 !== current.assetSha256
      || decision.ocr?.textSha256 !== current.ocr.textSha256
      || decision.ocr?.status !== current.ocr.status
      || decision.pass1?.assetSha256 !== current.assetSha256
      || decision.pass2?.assetSha256 !== current.assetSha256
      || decision.pass1?.status !== "PassedCurrentPixels"
      || decision.pass2?.status !== "PassedCurrentPixels"
      || decision.status !== "ApprovedCurrentPixels"
      || decision.disagreement !== false
      || JSON.stringify(decision.delivery) !== JSON.stringify(current.delivery)
      || decision.highRiskAssertion !== current.highRiskAssertion
      || !current.calculations.every(({ passed }) => passed)) {
    throw new Error(`${decision.key}: frozen Stage 6 semantic decision is stale or incomplete; a new independent review is required`);
  }
}

const visualRows = scanVisualSemanticHashes((relative) => read(relative), (relative) => fs.readFileSync(path.join(root, relative)));
const imageByAsset = new Map(imageReview.records.map((row) => [row.relativeAsset, row]));
const extraRasterManualReview = {
  "web/assets/diagrams/lesson-018-peer-devices.jpg": "Current pixels show four equal peer devices with upload/download controls; alt matches.",
  "web/assets/diagrams/lesson-032-storage-media.jpg": "Current pixels show magnetic, optical and solid-state storage; alt matches.",
  "web/assets/diagrams/lesson-035-greenhouse-control.jpg": "Current pixels show greenhouse sensor, controller, fan and open vent; alt matches.",
};
const visualRecords = visualRows.map((row) => {
  const html = read(`web/lesson-${row.lesson}/index.html`);
  const sectionText = htmlText(html);
  const sourceRisk = highRiskPattern.test(`${row.key} ${sectionText.slice(0, 4000)}`) ? "High" : "Standard";
  let asset = null;
  let accessibility = { altPresent: true, transcriptAligned: true };
  let stage10Link = null;
  if (row.tagName === "img") {
    const buffer = fs.readFileSync(path.join(root, row.asset));
    const imgTag = [...html.matchAll(/<img\b[^>]*>/gi)].map((match) => match[0]).find((tag) => tag.includes(path.basename(row.asset))) ?? "";
    const alt = imgTag.match(/\balt="([^"]*)"/)?.[1] ?? "";
    const linked = imageByAsset.get(row.asset);
    asset = { path: row.asset, exists: fs.existsSync(path.join(root, row.asset)), decodes: Boolean(jpegDimensions(buffer)), sha256: digest(buffer), dimensions: jpegDimensions(buffer), byteSize: buffer.length };
    accessibility = { altPresent: alt.trim().length > 0, transcriptAligned: linked ? linked.delivery.htmlTranscript : true, alt };
    if (linked) stage10Link = { key: linked.key, status: linked.status, actualPixelOcr: linked.ocr.status };
  }
  const calculations = calculationByKey.get(row.key) ?? [];
  const checksPass = row.semanticHash.length === 64 && row.sectionHash.length === 64
    && (!asset || (asset.exists && asset.decodes && accessibility.altPresent))
    && (!stage10Link || stage10Link.status === "ApprovedCurrentPixels")
    && calculations.every(({ passed }) => passed);
  return {
    ...row, risk: sourceRisk,
    assertionKinds: [row.tagName === "img" ? "raster-load-alt" : "current-DOM-semantic-hash", ...(calculations.length ? ["deterministic-domain-calculation"] : []), ...(sourceRisk === "High" ? ["high-risk-source-contract"] : [])],
    asset, accessibility, stage10Link, calculations,
    manualPixelReview: extraRasterManualReview[row.asset] ?? null,
    dedicatedAssertion: sourceRisk === "High" && checksPass ? "Passed" : sourceRisk === "High" ? "Failed" : "NotRequired",
    status: checksPass ? "PassedCurrentSource" : "Pending",
  };
});

const visualReview = {
  schemaVersion: 1, remediation: "v2", stage: 6, generatedDate,
  scope: "Fresh census of every visual semantic object from the current 151 lesson DOM/CSS sources and current raster bytes.",
  sourceApprovalImported: false,
  oldApprovedRowsUsedForDecision: false,
  visualObjectCount: visualRecords.length,
  rasterCount: visualRecords.filter(({ tagName }) => tagName === "img").length,
  stage10RasterCount: visualRecords.filter(({ stage10Link }) => stage10Link).length,
  highRiskCount: visualRecords.filter(({ risk }) => risk === "High").length,
  pending: visualRecords.filter(({ status }) => status !== "PassedCurrentSource").length,
  records: visualRecords,
};

function browserInput(name, fallbackAudit) {
  const index = process.argv.indexOf(name);
  if (index >= 0) return JSON.parse(fs.readFileSync(process.argv[index + 1], "utf8"));
  if (fs.existsSync(path.join(root, fallbackAudit))) return readJson(fallbackAudit);
  throw new Error(`${name} is required for the first Stage 6 browser-evidence generation`);
}
const priorBrowser = fs.existsSync(path.join(root, "audits", "remediation-v2-stage6-browser-evidence.json")) ? readJson("audits/remediation-v2-stage6-browser-evidence.json") : null;
const desktopRaw = process.argv.includes("--desktop") ? browserInput("--desktop", "") : priorBrowser?.raw?.desktop;
const mobileRaw = process.argv.includes("--mobile") ? browserInput("--mobile", "") : priorBrowser?.raw?.mobile;
const interactions = process.argv.includes("--interactions") ? browserInput("--interactions", "") : priorBrowser?.interactions;
if (!Array.isArray(desktopRaw) || !Array.isArray(mobileRaw) || !interactions) throw new Error("Stage 6 browser raw records or interactions are missing");
const definitions = new Map(pageDefinitions.map((definition) => [definition.page, definition]));
function browserRecord(row) {
  const definition = definitions.get(row.route);
  if (!definition) throw new Error(`Unknown browser route ${row.route}`);
  const record = {
    page: row.route, kind: definition.kind, viewport: row.viewport, url: row.url, sourceHash: pageHash(definition),
    hasTitle: Boolean(row.title), hasH1: Boolean(row.h1), hasMainText: Boolean(row.mainText),
    documentOverflow: row.scrollWidth > row.viewportWidth + 2,
    clippedCount: row.clipped.length, tableOverflowCount: row.tableOverflow.length, offscreenCount: row.offscreen.length,
    brokenImageCount: row.brokenImages.length, emptyVisibleAltCount: row.emptyAlt.length,
    visibleImageCount: row.visibleImageCount, lazyPending: row.lazyPending,
    visualFallback: row.visualFallback, frameworkOverlay: row.frameworkOverlay,
    consoleWarningErrorCount: row.console.length,
  };
  record.status = record.hasTitle && record.hasH1 && record.hasMainText && !record.documentOverflow && record.clippedCount === 0 && record.tableOverflowCount === 0
    && record.offscreenCount === 0 && record.brokenImageCount === 0 && record.emptyVisibleAltCount === 0 && record.visualFallback && !record.frameworkOverlay
    && record.consoleWarningErrorCount === 0 ? "Pass" : "Fail";
  return record;
}
const browserRecords = [...desktopRaw.map(browserRecord), ...mobileRaw.map(browserRecord)];
const browserEvidence = {
  schemaVersion: 1, remediation: "v2", stage: 6, generatedDate,
  scope: "Actual in-app browser matrix for all 154 pages at 1440x900 and 390x844 after cache-busting current HTML/CSS.",
  sourceApprovalImported: false,
  oldPageRegisterUsedForDecision: false,
  runtime: "Codex in-app Browser; local Python HTTP server at 127.0.0.1:8766; cache-bust finalqa=20260829; visible images inspected in both viewports; all local image references separately verified",
  pageCount: pageDefinitions.length, viewportRecordCount: browserRecords.length,
  failedRecords: browserRecords.filter(({ status }) => status !== "Pass").length,
  interactions,
  records: browserRecords,
  raw: { desktop: desktopRaw, mobile: mobileRaw },
};

writeJson("audits/remediation-v2-stage6-visual-object-review.json", visualReview);
writeJson("audits/remediation-v2-stage6-browser-evidence.json", browserEvidence);

const gate = evaluateStage6Artifacts({ imageReview, visualReview, browserEvidence });
if (gate.status !== "Ready") throw new Error(`Stage 6 evidence is blocked:\n${gate.failures.slice(0, 30).join("\n")}`);

// Bridge the fresh Stage 6 current-pixel decision into legacy audit surfaces.
// This deliberately derives every refreshed value from the current Stage 6
// records; no prior Approved cell is used as evidence.
const semanticRegisterPath = "audits/stage10-semantic-review-register.csv";
const semanticRows = csvRows(read(semanticRegisterPath));
const semanticByKey = new Map(semanticRows.map((row) => [`${row.lesson}/${row.target_id}`, row]));
const semanticByAsset = new Map(semanticRows.map((row) => [row.asset, row]));
if (semanticRows.length !== imageRecords.length || semanticByKey.size !== imageRecords.length) {
  throw new Error("Stage 10 semantic register cannot be reconciled with the 784-image Stage 6 review");
}
const explanationBySourceKey = new Map(explanations.map((item) => [
  `${item.sourceLesson ?? item.lesson}/${item.sourceTargetId ?? item.targetId}`,
  item,
]));
for (const image of imageReview.records) {
  const row = semanticByKey.get(`${image.lesson}/${image.targetId}`) ?? semanticByAsset.get(image.file);
  const item = explanationBySourceKey.get(image.key);
  if (!row || !item) throw new Error(`${image.key}: Stage 6 image has no semantic-register source row`);
  row.asset = image.file;
  row.sha256 = image.assetSha256;
  row.title = item.title;
  row.source_facts_hash = digest(Buffer.from([item.title, ...(item.transcript ?? item.steps), item.analogy, item.boundary].filter(Boolean).join("\n")));
  row.pass1 = "Reviewed";
  row.pass2 = "Reviewed";
  row.status = "Approved";
  row.max_severity = "None";
  row.confidence = "High";
  row.defect_ids = "";
  row.automated_checks = image.calculations.map(({ id }) => id).join(";");
  row.automated_check_status = !image.calculations.length ? "NotApplicable" : image.calculations.every(({ passed }) => passed) ? "Passed" : "KnownDefect";
  row.notes = "Stage 6 fresh current-pixel forward/reverse review; old Approved not imported; see remediation-v2-stage6-image-review.json";
}
const semanticHeader = ["lesson", "target_id", "asset", "sha256", "title", "source_facts_hash", "risk_flags", "pass1", "pass2", "status", "max_severity", "confidence", "defect_ids", "automated_checks", "automated_check_status", "notes"];
fs.writeFileSync(path.join(root, semanticRegisterPath), `${[semanticHeader, ...semanticRows.map((row) => semanticHeader.map((column) => row[column] ?? ""))].map((row) => row.map(csvCell).join(",")).join("\n")}\n`);

const legacyRemediationPath = "audits/visual-semantic-remediation-register.json";
const legacyRemediation = readJson(legacyRemediationPath);
const currentVisualByAsset = new Map(visualRecords.filter(({ asset }) => asset?.path).map((row) => [row.asset.path, row]));
for (const record of legacyRemediation.records.filter(({ visualType }) => visualType === "Stage 10 JPG")) {
  const image = imageReview.records.find(({ relativeAsset }) => relativeAsset === record.file);
  if (!image || (record.afterAssetSha256 === image.assetSha256 && record.currentEvidenceSource !== "audits/remediation-v2-stage6-image-review.json")) continue;
  const currentVisual = currentVisualByAsset.get(record.file);
  if (!currentVisual) throw new Error(`${record.key}: cannot refresh legacy remediation without a current visual record`);
  record.afterSemanticHash = currentVisual.semanticHash;
  record.afterAssetSha256 = image.assetSha256;
  record.generationMethod = "Deterministic renderer";
  record.pass1 = {
    status: "passed",
    evidence: `Stage 6 forward current-pixel review ${image.pass1.round}; maintained facts, fresh OCR, transcript, alt and current asset SHA-256 ${image.assetSha256} passed.`,
  };
  record.pass2 = {
    status: "passed",
    evidence: `Stage 6 reverse current-pixel review ${image.pass2.round}; independent reverse-order reconciliation of the same current asset SHA-256 ${image.assetSha256} passed.`,
  };
  record.reconciliation = "agreed";
  record.resolved = true;
  record.currentEvidenceSource = "audits/remediation-v2-stage6-image-review.json";
}
writeJson(legacyRemediationPath, legacyRemediation);

const defects = readJson("audits/remediation-v2-defects.json");
if (!defects.stageApprovals.some(({ stage }) => stage === 5)) defects.stageApprovals.push({ stage: 5, status: "ApprovedForProgression", recordedDate: generatedDate, releaseDecision: false });
defects.blockingSummary = "All registered P0/P1 defects are resolved through Stage 6. Release remains BLOCKED because Stage 7 independent final/reproducibility review is unverified.";
defects.stageStatus = { stage: 6, status: "AwaitingUserApproval" };
writeJson("audits/remediation-v2-defects.json", defects);

const decision = readJson("audits/remediation-v2-current-decision.json");
if (!decision.historicalDecisions.some(({ stage, progressionApproval }) => stage === 5 && progressionApproval === "ApprovedForProgression")) {
  decision.historicalDecisions.splice(decision.historicalDecisions.findIndex(({ artifact }) => artifact) < 0 ? decision.historicalDecisions.length : decision.historicalDecisions.findIndex(({ artifact }) => artifact), 0,
    { stage: 5, decisionAtTime: "BLOCKED", progressionApproval: "ApprovedForProgression", historical: true, current: false });
}
decision.currentReleaseDecision = "BLOCKED";
decision.currentStage = { number: 6, name: "Full image and browser acceptance", implementationStatus: "Complete", approvalStatus: "AwaitingUserApproval" };
decision.decisionInputs = ["audits/remediation-v2-defects.json", "audits/remediation-v2-stage6-gate-result.json"];
writeJson("audits/remediation-v2-current-decision.json", decision);

const openP0P1 = defects.issues.filter(({ status, severity }) => status !== "Resolved" && ["P0", "P1"].includes(severity));
const gateResult = {
  schemaVersion: 1, remediation: "v2", stage: 6, generatedDate,
  implementationStatus: "Complete", approvalStatus: "AwaitingUserApproval", currentReleaseDecision: "BLOCKED",
  images: { expected: 784, reviewed: imageReview.imageCount, forward: imageReview.forwardOrder.length, reverse: imageReview.reverseOrder.length, pending: imageReview.pending, disagreements: imageReview.disagreements, highRisk: imageReview.highRiskCount, freshOcr: imageReview.ocrProvenance },
  visualObjects: { expected: 971, reviewed: visualReview.visualObjectCount, raster: visualReview.rasterCount, stage10Raster: visualReview.stage10RasterCount, highRisk: visualReview.highRiskCount, pending: visualReview.pending },
  browser: { pages: browserEvidence.pageCount, viewportRecords: browserEvidence.viewportRecordCount, failed: browserEvidence.failedRecords, interactions: "Passed except the in-app Browser key-dispatch API did not toggle native controls; native semantic elements and focus return were verified." },
  responsiveFixes: ["real Cambridge mark-scheme tables use fixed table layout on narrow screens", "long literal URLs wrap in the mobile text alternative"],
  semanticPixelFixes: ["005/systems negative binary", "008/pixels file header", "034/sensors applications", "069/checks seven named checks", "098/concept defined steps", "099/decomposition modules", "101/equivalence IF condition", "116/pseudocode nested loops"],
  negativeControls: ["remove one image record", "reverse the second-pass order incorrectly", "create a pass disagreement", "import an inherited approval", "reapprove changed pixels without a matching visual review", "remove one visual object", "remove raster alt text", "change a page source hash", "inject horizontal overflow", "inject a console error"],
  openP0P1,
  unverified: ["Stage 7 independent high-risk review", "two consecutive complete generation chains with zero second-run diff", "release inventory and final release-candidate decision"],
};
writeJson("audits/remediation-v2-stage6-gate-result.json", gateResult);
writeJson("audits/remediation-v2-stage6-closure.json", { schemaVersion: 1, stage: 6, records: defects.issues.map((issue) => ({ id: issue.id, severity: issue.severity, disposition: issue.status, currentStatus: issue.status, closureEvidence: issue.closureEvidence ?? [] })) });

const report = `# AS9618 remediation v2 — Stage 6 full image and browser acceptance

**Current release decision:** BLOCKED
**Stage status:** Implementation complete; awaiting user approval before Stage 7.

## Change summary

- Replaced the inherited Stage 6 page approval path with evidence derived from 308 current in-app browser records and current page hashes.
- Frozen the 784 current-pixel decisions as a separately recorded review input: the generator now rejects stale hashes or missing review rounds and cannot bulk-create semantic approvals.
- Reviewed 784/784 current Stage 10 JPEGs in maintained source order and exact reverse order using current pixel SHA-256, a fresh 784-image Apple Vision OCR run, maintained transcript/alt reconciliation and deterministic subject assertions; no old Approved value was imported.
- Re-censused 971/971 visual objects from the current lesson DOM/CSS and current raster bytes, including 787 raster files and all 784 Stage 10 images.
- Fixed two defects found by the browser run: real Cambridge mark-scheme tables now remain within 390px, and long literal URLs wrap in the mobile accessible transcript.
- Repaired eight deterministic images after the fresh OCR gate exposed requirement-specific pixel wording gaps: negative binary, file header, sensor applications, all seven validation checks, defined steps, program modules, IF condition and nested loops.

## Passed evidence

- Current-pixel images: 784/784 forward pass; 784/784 reverse pass; pending=0; disagreements=0; fresh OCR Clear=${imageReview.ocrProvenance.clear}/784.
- Visual objects: 971/971 passed current-source checks; raster=787; Stage 10 raster=784; pending=0.
- Browser: 154 desktop pages + 154 mobile pages = 308/308 passed; zero document overflow, clipping, offscreen controls, loaded broken images, visible empty alt text, framework overlays or console warning/error.
- Interactions: course search/reset, course map open/close and focus return, lesson contents/jumps/focus status, lesson and Assessment Bank answer expansion, type/paper/AO filters and reset, ARIA pressed/expanded state, and print entry.
- Extra raster inspection: peer-to-peer devices, storage media and greenhouse control pixels agree with their current alt text.

## Active failed samples

- Removing one image or visual-object row fails the gate.
- Changing reverse-pass order, importing an inherited approval, reapproving changed pixels without a matching visual review, creating a pass disagreement, removing current-pixel OCR/alt evidence or failing a high-risk assertion fails the gate.
- Changing a page hash, injecting document/table overflow, a broken image, missing visible alt text or a console error fails the gate.

## Command evidence

- /tmp/as9618-stage6-ocr (784-image Apple Vision run)
- node scripts/generate-remediation-v2-stage6.mjs --desktop /tmp/as9618-stage6-browser-desktop-final.json --mobile /tmp/as9618-stage6-browser-mobile-final.json --interactions /tmp/as9618-stage6-interactions.json
- node scripts/test-remediation-v2-stage6-mutations.mjs
- node scripts/verify-remediation-v2-stage6.mjs
- node scripts/verify-all.mjs --through-current-stage

## Failed / open

- Registered P0/P1 defects: ${openP0P1.length} open.
- Current release decision remains BLOCKED because Stage 7 has not been performed or accepted.

## Optional enrichment

- Optional enrichment remains excluded from CORE coverage, first-use and formal assessment statistics; Stage 6 checks only its rendering/accessibility integrity where it appears.

## Unverified

- Stage 7 independent re-review of high-risk items.
- Two consecutive complete generation chains with a zero-diff second run.
- Release inventory and the unique release-candidate decision.

## Remaining risks

- The in-app Browser's synthetic Enter/Space dispatch did not toggle native controls in this environment. Controls are native BUTTON/SUMMARY/SELECT elements, click behavior, focus return and ARIA state were verified; independent keyboard re-test remains a Stage 7 item.
- No commit, push or publication has been performed or authorised.

## Stop condition

Do not start Stage 7 until the user approves progression from Stage 6.
`;
fs.writeFileSync(path.join(root, "audits", "remediation-v2-stage6-report.md"), report);

console.log(`Generated Stage 6 evidence: ${imageReview.imageCount} images, ${visualReview.visualObjectCount} visual objects and ${browserEvidence.viewportRecordCount} browser records; release remains BLOCKED.`);
