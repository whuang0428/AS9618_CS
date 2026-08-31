import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const readJson = (name) => JSON.parse(fs.readFileSync(path.join(root, "scripts", name), "utf8"));
const content = readJson("course-v2-content.json");
const ownership = readJson("course-v2-material-ownership.json");
const syllabus = readJson("syllabus-coverage-contract.json");
const materials = readJson("course-v2-knowledge-materials.json");
const decisions = readJson("course-v2-material-decisions.json");
const requirementById = new Map(syllabus.requirements.map((requirement) => [requirement.id, requirement]));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function normalise(value) {
  return String(value ?? "").toLowerCase().replaceAll("’", "'").replace(/[^a-z0-9+#' ]+/g, " ").replace(/\s+/g, " ").trim();
}

function wordCount(value) {
  return String(value ?? "").trim().split(/\s+/).filter(Boolean).length;
}

const relevanceStopwords = new Set("a an and are as at be by can data describe different each explain for from how in including is it its may of on one or other show system systems that the their these this to two understand use used using when where which with write required requirement".split(" "));
function relevanceTokens(value) {
  return new Set(normalise(value).split(" ").filter((token) => token.length > 2 && !relevanceStopwords.has(token)));
}

function overlapCount(left, right) {
  const leftTokens = relevanceTokens(left);
  const rightTokens = relevanceTokens(right);
  let overlap = 0;
  for (const token of leftTokens) if (rightTokens.has(token)) overlap += 1;
  return overlap;
}

const assetDirectory = path.join(root, "web", "assets", "diagrams", "stage10-infographics");
const assetFiles = fs.readdirSync(assetDirectory);
assert(ownership.assets.length === assetFiles.length, `Ownership inventory has ${ownership.assets.length} assets but the directory has ${assetFiles.length}`);
assert(new Set(ownership.assets.map((asset) => asset.path)).size === ownership.assets.length, "Ownership inventory repeats an asset path");
assert(new Set(ownership.assets.map((asset) => asset.sha256)).size === ownership.assets.length, "Different asset paths contain exact byte duplicates");
assert(ownership.unresolvedEvidence.length === 0 && ownership.counts.unresolvedEvidence === 0, "Whole-course visual evidence is unresolved");
assert(ownership.counts.assigned + ownership.counts.reviewOnly + ownership.counts.inventoryOnly === ownership.counts.assets, "Ownership inventory status counts do not reconcile");
assert(!ownership.assets.some((asset) => asset.ownershipStatus === "pending"), "Excluded legacy assets must be labelled inventory-only, not pending");

for (const field of ["assignments", "activeOwnerOverrides"]) {
  const rows = decisions[field] ?? [];
  assert(new Set(rows.map((row) => row.path)).size === rows.length, `${field} repeats an asset path`);
  for (const row of rows) {
    assert(ownership.assets.some((asset) => asset.path === row.path), `${field} references unknown asset ${row.path}`);
    assert(requirementById.has(row.requirementId), `${field} references unknown requirement ${row.requirementId}`);
    assert(row.reason?.trim(), `${field} has no ownership reason for ${row.path}`);
  }
}

const teaching = content.lessons.filter((lesson) => lesson.materialStatus === "complete");
const reviews = content.lessons.filter((lesson) => lesson.materialStatus === "review-complete");
const pending = content.lessons.filter((lesson) => lesson.materialStatus === "pending");
assert(teaching.length === 88, `Expected 88 complete teaching lessons, found ${teaching.length}`);
assert(reviews.length === 2 && reviews.map((lesson) => lesson.id).join(",") === "045,090", "L045 and L090 must be the two complete review lessons");
assert(pending.length === 0, `No lesson may remain pending; found ${pending.length}`);
assert(materials.teachingLessons === 88 && materials.knowledgePointInstances === 142, "Knowledge-material contract has incomplete whole-course counts");

const activePathOwners = new Map();
const nativeSignatures = new Map();
const genericPattern = /question triage|method bank|review sprint|section \d+ (?:topic |knowledge )?map|mini assessment|retrieval grid/i;
const editorialPattern = /Version 2|Version 2 row|Version 2 Notes|Detailed explanation|Question triage|Supporting diagram library|approved material|pending material|pilot-complete/i;

for (const lesson of teaching) {
  assert(!lesson.visual, `L${lesson.id} still exposes a legacy retained visual`);
  assert(JSON.stringify(lesson.knowledgePoints.map((point) => point.id)) === JSON.stringify(lesson.syllabusIds), `L${lesson.id} knowledge points do not match its syllabus IDs`);
  for (const point of lesson.knowledgePoints) {
    const definition = materials.lessonPoints[`${lesson.id}:${point.id}`];
    assert(definition && requirementById.has(point.id), `L${lesson.id}:${point.id} has no complete material definition`);
    assert(point.nodes.length >= 5 && point.nodes.length <= 6, `L${lesson.id}:${point.id} needs five or six concept nodes`);
    assert(point.nodes.every((node) => wordCount(node.label) <= 4 && wordCount(node.value) <= 8), `L${lesson.id}:${point.id} has an overlong concept relationship card`);
    assert(new Set(point.nodes.map((node) => normalise(node.label))).size === point.nodes.length, `L${lesson.id}:${point.id} repeats a concept label`);
    assert(new Set(point.nodes.map((node) => normalise(node.value))).size >= 4, `L${lesson.id}:${point.id} repeats one fact across its concept map`);
    assert(point.steps.length === 3 && point.steps.every((step) => step.label && wordCount(step.title) <= 12 && wordCount(step.detail) <= 18), `L${lesson.id}:${point.id} has an invalid mechanism step`);
    assert(point.cue.title && wordCount(point.cue.text) <= 34, `L${lesson.id}:${point.id} has an overlong or missing concrete cue`);
    assert(point.materialCount === point.visuals.length + 3, `L${lesson.id}:${point.id} material count is inconsistent`);
    const requirement = requirementById.get(point.id);
    const pointTeaching = [...point.nodes.map((node) => node.value), ...point.steps.map((step) => step.detail), point.cue.text].join(" ");
    const pointFocus = `${requirement.requirement} ${(requirement.requiredGroups ?? []).flat().join(" ")}`;
    assert(overlapCount(pointTeaching, pointFocus) > 0, `L${lesson.id}:${point.id} teaching materials do not contain the point's own terminology`);
    const signature = JSON.stringify([point.nodes, point.steps, point.cue]);
    assert(!nativeSignatures.has(signature), `L${lesson.id}:${point.id} duplicates the complete native material from ${nativeSignatures.get(signature)}`);
    nativeSignatures.set(signature, `L${lesson.id}:${point.id}`);

    for (const visual of point.visuals) {
      assert(!genericPattern.test(visual.title), `L${lesson.id}:${point.id} uses a generic review asset: ${visual.title}`);
      assert(fs.existsSync(path.join(root, "web", visual.path)), `L${lesson.id}:${point.id} is missing ${visual.path}`);
      assert(!activePathOwners.has(visual.path), `${visual.path} is reused by ${activePathOwners.get(visual.path)} and L${lesson.id}:${point.id}`);
      activePathOwners.set(visual.path, `L${lesson.id}:${point.id}`);
      const asset = ownership.assets.find((candidate) => candidate.path === visual.path);
      assert(asset?.activeRequirementIds.length === 1 && asset.activeRequirementIds[0] === point.id, `${visual.path} is not exclusively owned by ${point.id}`);
      assert(asset.activeLessonId === lesson.id && asset.allowedLessonIds.length === 1 && asset.allowedLessonIds[0] === lesson.id, `${visual.path} is not exclusively assigned to L${lesson.id}`);
    }
  }

  const markdownPath = path.join(root, "lessons", fs.readdirSync(path.join(root, "lessons")).find((name) => name.startsWith(`${lesson.id}-`)));
  const htmlPath = path.join(root, "web", `lesson-${lesson.id}`, "index.html");
  const markdown = fs.readFileSync(markdownPath, "utf8");
  const html = fs.readFileSync(htmlPath, "utf8");
  for (const source of [markdown, html]) assert(!editorialPattern.test(source), `L${lesson.id} exposes retired editorial or rollout wording`);
  assert(/data-material-status="complete"/.test(html), `L${lesson.id} does not expose complete material state`);
  assert(/class="v2-jump-nav"/.test(html) && !/class="v2-toc"/.test(html), `L${lesson.id} still renders the wasteful sidebar`);
  assert((html.match(/class="v2-knowledge-point"/g) ?? []).length === lesson.knowledgePoints.length, `L${lesson.id} rendered knowledge-point count mismatch`);
  assert((html.match(/class="v2-native-material /g) ?? []).length === lesson.knowledgePoints.length * 3, `L${lesson.id} does not render three complementary native materials per point`);
  const expectedVisuals = lesson.knowledgePoints.reduce((sum, point) => sum + point.visuals.length, 0);
  assert((html.match(/class="v2-visual"/g) ?? []).length === expectedVisuals, `L${lesson.id} rendered visual count mismatch`);
}

for (const lesson of reviews) {
  assert(!lesson.visual && !lesson.knowledgePoints, `L${lesson.id} review page reuses teaching visuals or point cards`);
  assert(Array.isArray(lesson.reviewMaterials) && lesson.reviewMaterials.length === (lesson.id === "045" ? 8 : 4), `L${lesson.id} has incomplete review lanes`);
  const html = fs.readFileSync(path.join(root, "web", `lesson-${lesson.id}`, "index.html"), "utf8");
  assert(/data-material-status="review-complete"/.test(html), `L${lesson.id} does not expose review-complete state`);
  assert((html.match(/class="v2-review-lane"/g) ?? []).length === lesson.reviewMaterials.length, `L${lesson.id} rendered review-lane count mismatch`);
  assert(!editorialPattern.test(html) && !/class="v2-visual"/.test(html), `L${lesson.id} contains retired wording or duplicated teaching visuals`);
}

assert(activePathOwners.size === ownership.counts.activeAssets, "Active visual count does not match the ownership inventory");
assert(ownership.assets.filter((asset) => asset.activeRequirementIds.length).every((asset) => activePathOwners.has(asset.path)), "An active ownership row was not rendered exactly once");
assert(content.lessons.flatMap((lesson) => lesson.knowledgePoints ?? []).length === 142, "Whole course must render 142 lesson-specific knowledge-point instances");

const page = (id) => fs.readFileSync(path.join(root, "web", `lesson-${id}`, "index.html"), "utf8");
assert(!/full uncompressed sound formula|images and sound/i.test(page("001")), "L001 still contains sound or image content");
assert(!/question triage/i.test([page("001"), page("002"), page("003")].join(" ")), "L001-L003 still contain Question triage");
assert(/bitmap/i.test(page("005")) && /vector/i.test(page("005")) && /stage10-lesson-008/i.test(page("005")) && /stage10-lesson-010/i.test(page("005")), "L005 must teach bitmap and vector with separate owned visual evidence");
const databaseLesson = content.lessons.find((lesson) => lesson.id === "044");
const ddlTeaching = databaseLesson.knowledgePoints.find((point) => point.id === "S8.09");
const dmlTeaching = databaseLesson.knowledgePoints.find((point) => point.id === "S8.11");
const methodText = (point) => [...point.steps.map((step) => step.detail), point.cue.text].join(" ");
assert(!/\b(?:INSERT|DELETE|UPDATE)\b/i.test(methodText(ddlTeaching)), "L044:S8.09 leaks DML into the DDL method or cue");
assert(!/\b(?:CREATE DATABASE|CREATE TABLE|ALTER TABLE|VARCHAR|CHARACTER)\b/i.test(methodText(dmlTeaching)), "L044:S8.11 leaks DDL into the DML method or cue");

console.log(JSON.stringify({
  status: "WHOLE_COURSE_MATERIAL_PASS",
  inventoryAssets: ownership.assets.length,
  activeVisuals: activePathOwners.size,
  teachingLessons: teaching.length,
  reviewLessons: reviews.length,
  knowledgePointInstances: nativeSignatures.size,
  pendingLessons: pending.length,
  unresolvedEvidence: ownership.unresolvedEvidence.length,
}, null, 2));
