import fs from "node:fs";
import path from "node:path";
import { pageDefinitions, pageHash, root } from "./stage6-qa-utils.mjs";

if (process.argv.some((argument) => /approve/i.test(argument))) throw new Error("Stage 7 browser evidence cannot be created by an approval flag");
if (!process.argv.includes("--record-current-system-keyboard-review")) {
  throw new Error("Refusing to write Stage 7 evidence without an explicit current system-keyboard review recording flag");
}
const rawIndex = process.argv.indexOf("--raw");
if (rawIndex < 0 || !process.argv[rawIndex + 1]) throw new Error("Provide the current browser scan with --raw <path>");
const raw = JSON.parse(fs.readFileSync(process.argv[rawIndex + 1], "utf8"));
const definitionByRoute = new Map(pageDefinitions.map((definition) => [definition.page === "index" ? "/" : `/${definition.page}/`, definition]));
const rows = [...raw.desktop, ...raw.mobile].map((row) => {
  const definition = definitionByRoute.get(row.route);
  if (!definition) throw new Error(`Unknown browser route: ${row.route}`);
  const passed = row.status === "Pass" && row.skipCount === 1 && row.skipFirst && row.mainTarget
    && row.duplicateIds === 0 && row.positiveTabindex === 0 && row.unnamed.length === 0
    && row.brokenAria.length === 0 && row.unmarkedHan.length === 0 && row.targetFailures.length === 0
    && row.docWidth <= row.viewportWidth && row.brokenImages.length === 0 && row.emptyAlt.length === 0
    && row.logs.length === 0 && !row.frameworkOverlay && row.contrast.failures.length === 0;
  return {
    page: definition.page, route: row.route, viewport: row.viewport, sourceHash: pageHash(definition),
    semantics: { skipFirst: row.skipCount === 1 && row.skipFirst, mainTarget: row.mainTarget, duplicateIds: row.duplicateIds,
      positiveTabindex: row.positiveTabindex, unnamedControls: row.unnamed.length, brokenAria: row.brokenAria.length, unmarkedHan: row.unmarkedHan.length },
    layout: { documentOverflow: row.docWidth > row.viewportWidth, targetFailures: row.targetFailures.length },
    media: { brokenImages: row.brokenImages.length, emptyVisibleAlt: row.emptyAlt.length, lazyPending: row.lazyPending },
    runtime: { consoleWarningErrorCount: row.logs.length, frameworkOverlay: row.frameworkOverlay },
    contrast: { solidTextRuns: row.contrast.solidTextRuns, gradientTextRuns: row.contrast.gradientTextRuns, failures: row.contrast.failures.length },
    status: passed ? "PassedCurrentBrowser" : "Failed",
  };
});
const keyboard = {
  status: "PassedSystemKeyboard", driver: "macOS Computer Use", browser: "Google Chrome", target: "http://127.0.0.1:8769/",
  reviewRound: "remediation-v2-stage7-system-keyboard-r1", inAppInjectionFailureRetained: raw.keyboard,
  checks: [
    { id: "skip-link", keys: "Tab, Return", status: "Pass", observed: "Skip to main content became focused first; Return changed the URL fragment to #main-content and focused the main container." },
    { id: "course-map", keys: "Tab, Return, Escape", status: "Pass", observed: "Fourth page Tab focused Course map; Return opened the dialog and focused Close; Escape closed it and returned focus to Course map." },
    { id: "lesson-contents", keys: "Return", status: "Pass", observed: "Focused Show contents changed to Hide contents and Return restored Show contents without losing focus." },
    { id: "worked-example-tabs", keys: "Right, End, Home", status: "Pass", observed: "Selection and focus moved 2048-bit icon to 5 MiB file, then 32 GB drive, then back to 2048-bit icon." },
    { id: "answer-toggle", keys: "Space", status: "Pass", observed: "Focused lesson answer button changed Hide answer to Show answer." },
    { id: "assessment-filter", keys: "Tab, Space", status: "Pass", observed: "Monthly 7 changed from Value 0 to Value 1 and the live count became 7 assessments." },
    { id: "assessment-mark-scheme", keys: "Return", status: "Pass", observed: "The native disclosure opened and exposed the Answer, Guidance and Marks column headers; Return closed it." },
    { id: "resource-disclosure", keys: "Space", status: "Pass", observed: "The Pseudocode and Java disclosure opened with visible content and Space closed it while retaining focus." },
  ],
};
const evidence = {
  schemaVersion: 1, remediation: "v2", stage: 7, generatedDate: "2026-08-28", reviewRound: "remediation-v2-stage7-browser-r1",
  sourceApprovalImported: false, oldApprovedRowsUsedForDecision: false, pageCount: pageDefinitions.length,
  viewportRecordCount: rows.length, failedRecords: rows.filter(({ status }) => status !== "PassedCurrentBrowser").length,
  totals: { solidTextRuns: rows.reduce((sum, row) => sum + row.contrast.solidTextRuns, 0), gradientTextRuns: rows.reduce((sum, row) => sum + row.contrast.gradientTextRuns, 0), contrastFailures: rows.reduce((sum, row) => sum + row.contrast.failures, 0) },
  interactions: raw.interactions, loadedLazyImages: raw.loadedLazyImages,
  postGenerationRescan: raw.rescannedAfterGeneration ?? null,
  keyboard, records: rows,
};
if (evidence.viewportRecordCount !== 306 || evidence.failedRecords !== 0) throw new Error("Current browser scan is incomplete or failed");
fs.writeFileSync(path.join(root, "audits", "remediation-v2-stage7-browser-evidence.json"), `${JSON.stringify(evidence, null, 2)}\n`);
console.log(`Recorded Stage 7 current-browser evidence: ${evidence.viewportRecordCount}/306 viewport records and ${keyboard.checks.length}/8 system-keyboard flows passed.`);
