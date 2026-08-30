import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export function evaluateStage6Artifacts({ imageReview, visualReview, browserEvidence }) {
  const failures = [];
  const require = (condition, message) => { if (!condition) failures.push(message); };

  require(imageReview?.sourceApprovalImported === false, "image review must explicitly reject inherited approvals");
  require(imageReview?.imageCount === 784, "image review must contain 784 current Stage 10 images");
  require(imageReview?.records?.length === 784, "image review record count is not 784");
  require(imageReview?.forwardOrder?.length === 784, "forward image pass is incomplete");
  require(imageReview?.reverseOrder?.length === 784, "reverse image pass is incomplete");
  require(JSON.stringify(imageReview?.reverseOrder ?? []) === JSON.stringify([...(imageReview?.forwardOrder ?? [])].reverse()), "second image pass is not the exact reverse order");
  require(new Set(imageReview?.forwardOrder ?? []).size === 784, "forward image pass contains duplicate keys");
  require(JSON.stringify(imageReview?.records?.map(({ key }) => key) ?? []) === JSON.stringify(imageReview?.forwardOrder ?? []), "image records do not match the recorded forward review order");
  require(imageReview?.pending === 0, "image review contains pending records");
  require(imageReview?.disagreements === 0, "image review contains unresolved pass disagreements");
  for (const row of imageReview?.records ?? []) {
    require(row.pass1?.status === "PassedCurrentPixels", `${row.key}: forward current-pixel pass failed`);
    require(row.pass2?.status === "PassedCurrentPixels", `${row.key}: reverse current-pixel pass failed`);
    require(row.status === "ApprovedCurrentPixels", `${row.key}: current-pixel status is not approved`);
    require(row.ocr?.status === "Clear" && row.ocr?.semanticAnchorCoverage >= 0.25, `${row.key}: actual-pixel OCR semantic anchor failed`);
    require(row.delivery?.htmlAlt && row.delivery?.htmlTranscript && row.delivery?.markdownTranscript, `${row.key}: asset/text/alt delivery is not synchronised`);
    require(row.dimensions?.width === 1536 && row.dimensions?.height === 1024, `${row.key}: dimensions are not 1536x1024`);
    require(row.calculations?.every(({ passed }) => passed) !== false, `${row.key}: deterministic semantic calculation failed`);
    if (row.risk === "High") require(row.highRiskAssertion === "Passed", `${row.key}: high-risk assertion did not pass`);
  }

  require(visualReview?.sourceApprovalImported === false, "visual-object review must explicitly reject inherited approvals");
  require(visualReview?.visualObjectCount === 971, "visual-object review must contain 971 objects");
  require(visualReview?.records?.length === 971, "visual-object review record count is not 971");
  require(visualReview?.rasterCount === 787, "visual-object review must contain 787 raster images");
  require(visualReview?.stage10RasterCount === 784, "visual-object review must link all 784 Stage 10 raster images");
  require(visualReview?.pending === 0, "visual-object review contains pending records");
  const imageByKey = new Map((imageReview?.records ?? []).map((row) => [row.key, row]));
  for (const row of visualReview?.records ?? []) {
    require(row.status === "PassedCurrentSource", `${row.key}: visual object did not pass current-source review`);
    require(typeof row.semanticHash === "string" && row.semanticHash.length === 64, `${row.key}: semantic hash is missing`);
    if (row.tagName === "img") require(row.asset?.exists && row.asset?.decodes && row.accessibility?.altPresent, `${row.key}: raster load or alt check failed`);
    if (row.stage10Link) {
      const image = imageByKey.get(row.stage10Link.key);
      require(Boolean(image), `${row.key}: linked Stage 10 current-pixel decision is missing`);
      require(row.asset?.sha256 === image?.assetSha256 && row.assetSha256 === image?.assetSha256, `${row.key}: visual-object pixels do not match the frozen Stage 10 decision`);
      require(row.stage10Link.status === image?.status, `${row.key}: visual-object Stage 10 status is out of sync`);
    }
    if (row.risk === "High") require(row.dedicatedAssertion === "Passed", `${row.key}: high-risk visual assertion failed`);
  }

  require(browserEvidence?.sourceApprovalImported === false, "browser evidence must explicitly reject inherited approvals");
  require(browserEvidence?.pageCount === 154, "browser evidence must cover 154 pages");
  require(browserEvidence?.viewportRecordCount === 308, "browser evidence must contain 308 viewport records");
  require(browserEvidence?.records?.length === 308, "browser record count is not 308");
  require(browserEvidence?.failedRecords === 0, "browser evidence contains failed viewport records");
  const routeViewportKeys = new Set();
  for (const row of browserEvidence?.records ?? []) {
    routeViewportKeys.add(`${row.page}/${row.viewport}`);
    require(row.status === "Pass", `${row.page}/${row.viewport}: browser status failed`);
    require(row.sourceHash?.length === 64, `${row.page}/${row.viewport}: current page hash is missing`);
    require(row.documentOverflow === false && row.clippedCount === 0 && row.tableOverflowCount === 0 && row.offscreenCount === 0, `${row.page}/${row.viewport}: responsive layout failed`);
    require(row.brokenImageCount === 0 && row.emptyVisibleAltCount === 0, `${row.page}/${row.viewport}: loaded-image or alt check failed`);
    require(row.consoleWarningErrorCount === 0 && row.frameworkOverlay === false, `${row.page}/${row.viewport}: console or framework overlay failed`);
    require(row.visualFallback === true && row.hasTitle && row.hasH1 && row.hasMainText, `${row.page}/${row.viewport}: page semantics or mobile text fallback failed`);
  }
  require(routeViewportKeys.size === 308, "browser matrix contains duplicate or missing route/viewport keys");
  require(browserEvidence?.interactions?.home?.searchState?.cards === 1, "course search interaction was not verified");
  require(browserEvidence?.interactions?.home?.resetState?.cards === 151, "course search reset was not verified");
  require(browserEvidence?.interactions?.home?.mapOpen?.open === true && browserEvidence?.interactions?.home?.mapClosed?.open === false, "course map open/close was not verified");
  require(browserEvidence?.interactions?.assessments?.monthly?.visible === 7, "Assessment Bank type filter was not verified");
  require(browserEvidence?.interactions?.assessments?.combo?.visible === 3, "Assessment Bank combined filters were not verified");
  require(browserEvidence?.interactions?.assessments?.reset?.count === "51 assessments", "Assessment Bank reset was not verified");
  require(browserEvidence?.interactions?.assessments?.clickedOpen?.headers?.join("|") === "Answer|Guidance|Marks", "Assessment Bank mark-scheme display was not verified");
  require(browserEvidence?.interactions?.assessments?.printClick === "returned", "Assessment Bank print entry was not invoked");
  require(browserEvidence?.interactions?.lesson111?.contentJump?.expanded === "false", "lesson contents collapse/focus flow was not verified");
  require(browserEvidence?.interactions?.lesson111?.toolbarJump?.menuOpen === false, "lesson jump toolbar was not verified");
  require(browserEvidence?.interactions?.lesson009?.lessonAnswer?.headers?.join("|") === "Answer|Guidance|Marks", "lesson answer expansion was not verified");

  return { status: failures.length ? "Blocked" : "Ready", failures };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const read = (name) => JSON.parse(fs.readFileSync(path.join(root, "audits", name), "utf8"));
  const result = evaluateStage6Artifacts({
    imageReview: read("remediation-v2-stage6-image-review.json"),
    visualReview: read("remediation-v2-stage6-visual-object-review.json"),
    browserEvidence: read("remediation-v2-stage6-browser-evidence.json"),
  });
  if (result.status !== "Ready") throw new Error(result.failures.join("\n"));
  console.log("Remediation v2 Stage 6 gate passed: 784 current-pixel images, 971 current-source visual objects and 308 live browser records.");
}
