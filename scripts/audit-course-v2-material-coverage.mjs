import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const readJson = (name) => JSON.parse(fs.readFileSync(path.join(root, "scripts", name), "utf8"));
const content = readJson("course-v2-content.json");
const syllabus = readJson("syllabus-coverage-contract.json");
const allowedModes = new Set(["comparison", "concept", "decision", "process", "structure"]);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function wordCount(value) {
  return String(value ?? "").trim().split(/\s+/).filter(Boolean).length;
}

function assertVisual(visual, context) {
  assert(visual?.title && visual?.path, `${context} has incomplete diagram metadata`);
  assert(Array.isArray(visual.altFacts) && visual.altFacts.length > 0, `${context} has no diagram transcript`);
  assert(fs.existsSync(path.join(root, "web", visual.path)), `${context} is missing ${visual.path}`);
}

assert(content.schemaVersion === 3, "Material coverage requires content schema v3");
assert(content.lessonCount === 90 && content.lessons.length === 90, "Material coverage requires all 90 lessons");
assert(syllabus.requirements.length === 121, "Expected 121 syllabus requirements");

const teachingPoints = [];
const allPoints = [];
const reportRows = [];
for (const lesson of content.lessons) {
  assert(Array.isArray(lesson.knowledgePoints) && lesson.knowledgePoints.length > 0, `L${lesson.id} has no knowledge-point material sets`);
  assert(Array.isArray(lesson.visuals) && lesson.visuals.length >= 3, `L${lesson.id} needs at least three source diagrams in its lesson library`);
  assert(new Set(lesson.visuals.map((visual) => visual.path)).size === lesson.visuals.length, `L${lesson.id} repeats a source diagram`);
  for (const visual of lesson.visuals) assertVisual(visual, `L${lesson.id} source diagram`);

  if (lesson.focus !== "integrated-review") {
    assert(
      JSON.stringify(lesson.knowledgePoints.map((point) => point.id)) === JSON.stringify(lesson.syllabusIds),
      `L${lesson.id} knowledge-point order does not match its syllabus IDs`,
    );
  }

  const pointDiagramPaths = new Set();
  for (const point of lesson.knowledgePoints) {
    allPoints.push({ lesson: lesson.id, ...point });
    if (lesson.focus !== "integrated-review") teachingPoints.push({ lesson: lesson.id, ...point });
    assert(point.id && point.title && point.displayTitle && point.notes, `L${lesson.id} contains an incomplete knowledge point`);
    assert(wordCount(point.displayTitle) <= 24, `L${lesson.id}:${point.id} has an overlong visible knowledge-point title`);
    assert(Array.isArray(point.keyTerms) && point.keyTerms.length > 0, `L${lesson.id}:${point.id} has no concept-map nodes`);
    assert(point.keyTerms.every((term) => wordCount(term) <= 6), `L${lesson.id}:${point.id} has an overlong concept-map node`);
    assert(allowedModes.has(point.visualMode), `L${lesson.id}:${point.id} has an invalid visual mode`);
    assert(Array.isArray(point.explanationSteps) && point.explanationSteps.length === 3, `L${lesson.id}:${point.id} needs exactly three explanation steps`);
    assert(point.explanationSteps.every((step) => wordCount(step) <= 28), `L${lesson.id}:${point.id} contains an overlong explanation step`);
    assert(point.cue && wordCount(point.cue) <= 32, `L${lesson.id}:${point.id} contains an overlong concrete cue`);
    assert(Array.isArray(point.visuals), `L${lesson.id}:${point.id} is missing its diagram array`);
    assert(new Set(point.visuals.map((visual) => visual.path)).size === point.visuals.length, `L${lesson.id}:${point.id} repeats a diagram`);
    assert(point.materialCount === point.visuals.length + 3 && point.materialCount >= 3, `L${lesson.id}:${point.id} does not have three native materials plus its diagrams`);
    for (const visual of point.visuals) {
      assertVisual(visual, `L${lesson.id}:${point.id} diagram`);
      pointDiagramPaths.add(visual.path);
    }
  }

  const expectedSupporting = lesson.visuals.map((visual) => visual.path).filter((visualPath) => !pointDiagramPaths.has(visualPath));
  assert(
    JSON.stringify(lesson.supportingVisuals.map((visual) => visual.path)) === JSON.stringify(expectedSupporting),
    `L${lesson.id} supporting library is not the unused part of the source diagram library`,
  );

  reportRows.push({
    id: lesson.id,
    pointIds: lesson.knowledgePoints.map((point) => point.id).join(", "),
    pointCount: lesson.knowledgePoints.length,
    nativeMaterials: lesson.knowledgePoints.length * 3,
    pointDiagrams: lesson.knowledgePoints.reduce((sum, point) => sum + point.visuals.length, 0),
    supportingDiagrams: lesson.supportingVisuals.length,
    sourceDiagrams: lesson.visuals.length,
  });
}

const requiredIds = syllabus.requirements.map((requirement) => requirement.id).sort();
const coveredIds = [...new Set(teachingPoints.map((point) => point.id))].sort();
assert(JSON.stringify(coveredIds) === JSON.stringify(requiredIds), "The 90-lesson course does not expose all 121 syllabus knowledge points");

const rasterlessPoints = allPoints.filter((point) => point.visuals.length === 0);
const sourceDiagramPlacements = content.lessons.reduce((sum, lesson) => sum + lesson.visuals.length, 0);
const uniqueSourceDiagrams = new Set(content.lessons.flatMap((lesson) => lesson.visuals.map((visual) => visual.path))).size;
const pointDiagramPlacements = allPoints.reduce((sum, point) => sum + point.visuals.length, 0);
const nativeMaterialPlacements = allPoints.length * 3;
const totalMaterialPlacements = nativeMaterialPlacements + pointDiagramPlacements;
const minimumMaterials = Math.min(...allPoints.map((point) => point.materialCount));

const report = `# Course V2 knowledge-point material coverage audit

## Result

**PASS.** The active 90-lesson course exposes every one of the 121 unique syllabus requirements as a named knowledge-point material set. Each set contains three code-native teaching materials before any raster diagram is counted:

1. a concept map that shows the important terms and their relationship;
2. a three-step mechanism, comparison, process, decision or structure story;
3. a concrete cue, calculation, analogy or use case.

Long precision notes remain available in collapsed disclosure panels. Raster diagrams are assigned only when their transcripts match the requirement; a non-matching image is not counted as evidence for that point. A rasterless point therefore still has three distinct visible teaching materials and is listed below for transparent follow-up rather than hidden by an unrelated image.

## Coverage totals

| Measure | Result |
|---|---:|
| Active lessons | ${content.lessons.length} |
| Unique syllabus requirements | ${coveredIds.length} / ${requiredIds.length} |
| Knowledge-point material sets, including review clusters | ${allPoints.length} |
| Code-native material placements | ${nativeMaterialPlacements} |
| Point-specific raster placements | ${pointDiagramPlacements} |
| Total point-level material placements | ${totalMaterialPlacements} |
| Source-diagram placements across lessons | ${sourceDiagramPlacements} |
| Unique source-diagram files | ${uniqueSourceDiagrams} |
| Minimum materials for any knowledge point | ${minimumMaterials} |
| Points without a semantically matched raster diagram | ${rasterlessPoints.length} |

## Lesson-by-lesson register

| Lesson | Knowledge points | Sets | Native materials | Point diagrams | Supporting diagrams | Source diagram library |
|---:|---|---:|---:|---:|---:|---:|
${reportRows.map((row) => `| ${row.id} | ${row.pointIds} | ${row.pointCount} | ${row.nativeMaterials} | ${row.pointDiagrams} | ${row.supportingDiagrams} | ${row.sourceDiagrams} |`).join("\n")}

## Transparent raster follow-up list

${rasterlessPoints.length ? rasterlessPoints.map((point) => `- L${point.lesson} ${point.id}: three code-native materials; no raster diagram passed the semantic-match gate.`).join("\n") : "- None."}

This report is generated by \`scripts/audit-course-v2-material-coverage.mjs\` and fails the build if a syllabus point, native material, transcript or referenced diagram is missing.
`;

fs.writeFileSync(path.join(root, "audits", "course-v2-visual-material-coverage-report.md"), report);
console.log(JSON.stringify({
  status: "PASS",
  lessons: content.lessons.length,
  syllabusRequirements: coveredIds.length,
  materialSets: allPoints.length,
  nativeMaterialPlacements,
  pointDiagramPlacements,
  totalMaterialPlacements,
  sourceDiagramPlacements,
  uniqueSourceDiagrams,
  minimumMaterials,
  rasterlessPoints: rasterlessPoints.length,
}, null, 2));
