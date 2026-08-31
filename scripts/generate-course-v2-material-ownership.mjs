import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const legacyRef = "559eb16";
const readJson = (name) => JSON.parse(fs.readFileSync(path.join(root, "scripts", name), "utf8"));
const content = readJson("course-v2-content.json");
const syllabus = readJson("syllabus-coverage-contract.json");
const decisions = readJson("course-v2-material-decisions.json");
const migration = readJson("course-v2-migration.json");
const legacyIdentity = JSON.parse(execFileSync("git", ["show", `${legacyRef}:scripts/lesson-identity-contract.json`], { cwd: root, encoding: "utf8" }));
const newLessonsByRequirement = new Map();
for (const [requirementId, lessonId] of content.lessons
  .filter((lesson) => lesson.focus !== "integrated-review")
  .flatMap((lesson) => lesson.syllabusIds.map((id) => [id, lesson.id]))) {
  if (!newLessonsByRequirement.has(requirementId)) newLessonsByRequirement.set(requirementId, []);
  newLessonsByRequirement.get(requirementId).push(lessonId);
}
const migratedLessonByOldLesson = new Map(migration.rows.map((row) => [row.oldLesson, String(row.primaryNewLesson).padStart(3, "0")]));
const evidenceResolutionByKey = new Map((decisions.evidenceResolutions ?? []).map((resolution) => [`${resolution.requirementId}|${resolution.oldLesson}|${resolution.explains}`, resolution]));
const activeOwnerOverrideByPath = new Map((decisions.activeOwnerOverrides ?? []).map((override) => [override.path, override]));

function stripMarkdown(value) {
  return String(value ?? "")
    .replace(/<!--[^]*?-->/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`>#]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function sectionForOldLesson(number) {
  const ranges = [[1, 16], [17, 27], [28, 41], [42, 52], [53, 62], [63, 72], [73, 78], [79, 90], [99, 113], [114, 126], [127, 142], [143, 147]];
  const index = ranges.findIndex(([start, end]) => number >= start && number <= end);
  return index < 0 ? "Review" : index + 1;
}

function extractPlacements(entry) {
  const source = execFileSync("git", ["show", `${legacyRef}:lessons/${entry.markdownFile}`], { cwd: root, encoding: "utf8", maxBuffer: 16 * 1024 * 1024 });
  const stage = source.match(/<!-- stage10-explanations:start -->([\s\S]*?)<!-- stage10-explanations:end -->/)?.[1] ?? "";
  return [...stage.matchAll(/### ([^\n]+)\n\n([\s\S]*?)(?=\n### |$)/g)].map((match) => {
    const image = match[2].match(/stage10-infographics\/([^`)\s]+)/)?.[1];
    if (!image) return null;
    const altFacts = match[2]
      .split("\n")
      .filter((line) => /^\d+\.\s+/.test(line.trim()))
      .map((line) => stripMarkdown(line.replace(/^\d+\.\s+/, "")))
      .filter(Boolean);
    return {
      title: stripMarkdown(match[1]),
      path: `assets/diagrams/stage10-infographics/${image}`,
      explains: match[2].match(/\*\*Explains:\*\*\s*`([^`]+)`/)?.[1] ?? "unknown",
      explanationType: stripMarkdown(match[2].match(/\*\*Explanation type:\*\*\s*([^\n]+)/)?.[1] ?? "unknown"),
      delivery: stripMarkdown(match[2].match(/\*\*Delivery:\*\*\s*([^\n]+)/)?.[1] ?? "unknown"),
      altFacts,
      sourceOldLesson: entry.lesson,
      sourceOldTitle: entry.title,
      sourceSection: sectionForOldLesson(entry.lesson),
    };
  }).filter(Boolean);
}

const placements = legacyIdentity.lessons.flatMap(extractPlacements);
const assetsByPath = new Map();
for (const placement of placements) {
  if (!assetsByPath.has(placement.path)) assetsByPath.set(placement.path, { path: placement.path, title: placement.title, altFacts: placement.altFacts, placements: [] });
  assetsByPath.get(placement.path).placements.push({
    sourceOldLesson: placement.sourceOldLesson,
    sourceOldTitle: placement.sourceOldTitle,
    sourceSection: placement.sourceSection,
    explains: placement.explains,
    explanationType: placement.explanationType,
    delivery: placement.delivery,
  });
}
const assetDirectory = path.join(root, "web", "assets", "diagrams", "stage10-infographics");
for (const filename of fs.readdirSync(assetDirectory)) {
  const assetPath = `assets/diagrams/stage10-infographics/${filename}`;
  if (!assetsByPath.has(assetPath)) assetsByPath.set(assetPath, {
    path: assetPath,
    title: path.basename(filename, path.extname(filename)).replaceAll("-", " "),
    altFacts: [],
    placements: [],
  });
}

const requirementIdsByPath = new Map();
const unresolvedEvidence = [];
for (const requirement of syllabus.requirements) {
  for (const evidence of requirement.visualEvidence ?? []) {
    const explains = String(evidence.sectionId ?? "").replace(/^explanation-/, "");
    const matches = placements.filter((placement) => placement.sourceOldLesson === evidence.lesson && placement.explains === explains);
    if (matches.length !== 1) {
      const resolution = evidenceResolutionByKey.get(`${requirement.id}|${evidence.lesson}|${explains}`);
      if (resolution) {
        for (const assetPath of resolution.paths) {
          if (!assetsByPath.has(assetPath)) throw new Error(`Evidence resolution references an unknown asset: ${assetPath}`);
          if (!requirementIdsByPath.has(assetPath)) requirementIdsByPath.set(assetPath, new Set());
          requirementIdsByPath.get(assetPath).add(requirement.id);
        }
        continue;
      }
      unresolvedEvidence.push({ requirementId: requirement.id, oldLesson: evidence.lesson, explains, matchCount: matches.length });
      continue;
    }
    if (!requirementIdsByPath.has(matches[0].path)) requirementIdsByPath.set(matches[0].path, new Set());
    requirementIdsByPath.get(matches[0].path).add(requirement.id);
  }
}

for (const assignment of decisions.assignments) {
  if (!assetsByPath.has(assignment.path)) throw new Error(`Decision references an unknown asset: ${assignment.path}`);
  if (!syllabus.requirements.some((requirement) => requirement.id === assignment.requirementId)) throw new Error(`Decision references an unknown requirement: ${assignment.requirementId}`);
  if (!requirementIdsByPath.has(assignment.path)) requirementIdsByPath.set(assignment.path, new Set());
  requirementIdsByPath.get(assignment.path).add(assignment.requirementId);
}

const assignmentReasons = new Map([
  ...decisions.assignments,
  ...(decisions.activeOwnerOverrides ?? []),
].map((assignment) => [`${assignment.path}|${assignment.requirementId}`, assignment.reason]));
const activePaths = new Set();
const assets = [...assetsByPath.values()].map((asset) => {
  const absolutePath = path.join(root, "web", asset.path);
  if (!fs.existsSync(absolutePath)) throw new Error(`Missing asset file: ${asset.path}`);
  const requirementIds = [...(requirementIdsByPath.get(asset.path) ?? [])].sort();
  const reviewOnly = asset.placements.length > 0 && asset.placements.every((placement) => placement.explanationType === "synthesis" || /review|exam timing|mock|retrieval/i.test(placement.sourceOldTitle));
  const ownerOverride = activeOwnerOverrideByPath.get(asset.path);
  if (ownerOverride && !requirementIds.includes(ownerOverride.requirementId)) throw new Error(`Active-owner override is not one of ${asset.path}'s requirement owners`);
  if (requirementIds.length > 1 && !ownerOverride) throw new Error(`Multi-owner asset needs an active-owner override: ${asset.path}`);
  const activeRequirementIds = requirementIds.length ? [ownerOverride?.requirementId ?? requirementIds[0]] : [];
  const activeRequirementId = activeRequirementIds[0] ?? null;
  const candidateLessonIds = activeRequirementId ? newLessonsByRequirement.get(activeRequirementId) ?? [] : [];
  const migratedCandidates = asset.placements
    .map((placement) => migratedLessonByOldLesson.get(placement.sourceOldLesson))
    .filter((lessonId) => candidateLessonIds.includes(lessonId));
  const activeLessonId = [...new Set(migratedCandidates)][0] ?? candidateLessonIds[0] ?? null;
  const allowedLessonIds = activeLessonId ? [activeLessonId] : [];
  if (activeRequirementIds.length) activePaths.add(asset.path);
  return {
    assetId: path.basename(asset.path, path.extname(asset.path)),
    path: asset.path,
    sha256: crypto.createHash("sha256").update(fs.readFileSync(absolutePath)).digest("hex"),
    title: asset.title,
    altFacts: asset.altFacts,
    placements: asset.placements,
    ownershipStatus: requirementIds.length ? "assigned" : reviewOnly ? "review-only" : "inventory-only",
    requirementIds,
    allowedLessonIds,
    activeRequirementIds,
    activeLessonId,
    rolloutStatus: activeRequirementIds.length ? "whole-course-active" : "inventory-only",
    assignmentReasons: requirementIds.map((id) => assignmentReasons.get(`${asset.path}|${id}`) ?? "Reviewed syllabus visualEvidence contract"),
    reusePolicy: "single active knowledge point unless a future explicit exception is approved",
  };
}).sort((left, right) => left.path.localeCompare(right.path));

const activeAssignments = assets.flatMap((asset) => asset.activeRequirementIds.map((requirementId) => ({ path: asset.path, requirementId })));
const duplicateActivePaths = [...new Set(activeAssignments.map((assignment) => assignment.path).filter((assetPath, index, all) => all.indexOf(assetPath) !== index))];
if (duplicateActivePaths.length) throw new Error(`The whole-course rollout repeats active assets: ${duplicateActivePaths.join(", ")}`);
if (unresolvedEvidence.length) throw new Error(`Whole-course visual evidence is unresolved: ${JSON.stringify(unresolvedEvidence)}`);

const inventory = {
  schemaVersion: 1,
  generatedFrom: `${legacyRef} Stage 10 visual blocks plus the reviewed syllabus visualEvidence contract`,
  policy: "Whole-course explicit ownership: no section-wide pooling, no keyword-only ownership and no automatic supporting library.",
  counts: {
    assets: assets.length,
    assigned: assets.filter((asset) => asset.ownershipStatus === "assigned").length,
    reviewOnly: assets.filter((asset) => asset.ownershipStatus === "review-only").length,
    inventoryOnly: assets.filter((asset) => asset.ownershipStatus === "inventory-only").length,
    activeAssets: activePaths.size,
    activeKnowledgePoints: new Set(assets.flatMap((item) => item.activeRequirementIds)).size,
    unresolvedEvidence: unresolvedEvidence.length,
  },
  unresolvedEvidence,
  assets,
};

fs.writeFileSync(path.join(root, "scripts", "course-v2-material-ownership.json"), `${JSON.stringify(inventory, null, 2)}\n`);

const csvEscape = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
const csvRows = [["asset_id", "title", "path", "ownership_status", "requirement_ids", "allowed_lesson_ids", "rollout_status", "source_old_lessons", "delivery", "reasons"]];
for (const asset of assets) csvRows.push([
  asset.assetId,
  asset.title,
  asset.path,
  asset.ownershipStatus,
  asset.requirementIds.join(";"),
  asset.allowedLessonIds.join(";"),
  asset.rolloutStatus,
  asset.placements.map((placement) => placement.sourceOldLesson).join(";"),
  [...new Set(asset.placements.map((placement) => placement.delivery))].join(";"),
  asset.assignmentReasons.join(";"),
]);
fs.writeFileSync(path.join(root, "audits", "course-v2-material-ownership.csv"), `${csvRows.map((row) => row.map(csvEscape).join(",")).join("\n")}\n`);

const activeRows = assets
  .flatMap((asset) => asset.activeRequirementIds.map((requirementId) => ({
    requirementId,
    lessonId: asset.activeLessonId,
    title: asset.title,
    path: asset.path,
    reason: asset.assignmentReasons[asset.requirementIds.indexOf(requirementId)],
  })))
  .sort((left, right) => left.requirementId.localeCompare(right.requirementId) || left.path.localeCompare(right.path));
const report = `# Course material ownership and rollout register

## Status

**WHOLE-COURSE OWNERSHIP COMPLETE.** Every active visual is assigned to one syllabus knowledge point and one lesson. Assets without a reviewed point-level purpose remain inventory-only.

## Ownership policy

- A syllabus visualEvidence row may assign one exact legacy asset to one syllabus requirement.
- Extra assets require an explicit path, requirement ID and written reason in \`course-v2-material-decisions.json\`.
- Section-wide candidate pooling, keyword-only ownership and automatic supporting libraries are forbidden.
- One active asset path appears in exactly one active knowledge point and one lesson.

## Inventory

| Measure | Count |
|---|---:|
| Asset files inventoried | ${inventory.counts.assets} |
| Assets with an explicit requirement owner | ${inventory.counts.assigned} |
| Review-only assets | ${inventory.counts.reviewOnly} |
| Inventory-only assets excluded from active lessons | ${inventory.counts.inventoryOnly} |
| Active point-owned assets | ${inventory.counts.activeAssets} |
| Knowledge points with an active image | ${inventory.counts.activeKnowledgePoints} |
| Unresolved visualEvidence rows | ${inventory.counts.unresolvedEvidence} |

The complete 785-row register is \`audits/course-v2-material-ownership.csv\`.

## Active whole-course assignments

| Requirement | Lesson | Visual | Path | Ownership reason |
|---|---:|---|---|---|
${activeRows.map((row) => `| ${row.requirementId} | ${row.lessonId} | ${row.title.replaceAll("|", "\\|")} | \`${row.path}\` | ${row.reason.replaceAll("|", "\\|")} |`).join("\n")}

## Unresolved evidence

${unresolvedEvidence.length ? unresolvedEvidence.map((item) => `- ${item.requirementId}: old Lesson ${item.oldLesson} expects \`${item.explains}\` but resolves to ${item.matchCount} asset(s).`).join("\n") : "None."}
`;
fs.writeFileSync(path.join(root, "audits", "course-v2-material-rollout.md"), report);

console.log(JSON.stringify(inventory.counts, null, 2));
