import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const readJson = (name) => JSON.parse(fs.readFileSync(path.join(root, "scripts", name), "utf8"));
const contentPath = path.join(root, "scripts", "course-v2-content.json");
const syllabus = readJson("syllabus-coverage-contract.json");
const ownership = readJson("course-v2-material-ownership.json");
const materials = readJson("course-v2-knowledge-materials.json");
const requirementById = new Map(syllabus.requirements.map((requirement) => [requirement.id, requirement]));

function sanitizeStudentText(value) {
  return String(value ?? "")
    .replace(/The Version 2 Notes also name/gi, "The syllabus also names")
    .replace(/The Version 2 Notes name/gi, "The syllabus names")
    .replace(/The Version 2 (?:row|table) requires/gi, "The syllabus requires")
    .replace(/Version 2 explicitly includes/gi, "The syllabus explicitly includes")
    .replace(/Version 2 explicitly requires/gi, "The syllabus explicitly requires")
    .replace(/Version 2 requires/gi, "The syllabus requires")
    .replace(/the preceding Version 2 row/gi, "the syllabus list above")
    .replace(/the Version 2 (?:row|table)/gi, "the syllabus")
    .replace(/Use the complete Version 2 instruction set/gi, "Use the complete specified instruction set")
    .replace(/\bVersion 2\b/gi, "the syllabus")
    .replace(/\s+/g, " ")
    .trim();
}

function sanitizeDeep(value) {
  if (typeof value === "string") return sanitizeStudentText(value);
  if (Array.isArray(value)) return value.map(sanitizeDeep);
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, sanitizeDeep(item)]));
  return value;
}

const content = sanitizeDeep(JSON.parse(fs.readFileSync(contentPath, "utf8")));
const assetsByLessonPoint = new Map();

for (const asset of ownership.assets) {
  for (const requirementId of asset.activeRequirementIds) {
    const key = `${asset.activeLessonId}:${requirementId}`;
    if (!assetsByLessonPoint.has(key)) assetsByLessonPoint.set(key, []);
    assetsByLessonPoint.get(key).push({
      assetId: asset.assetId,
      title: sanitizeStudentText(asset.title),
      path: asset.path,
      altFacts: sanitizeDeep(asset.altFacts),
      kind: asset.placements[0]?.explanationType === "comparison" ? "comparison" : "diagram",
      ownershipBasis: sanitizeStudentText(asset.assignmentReasons[asset.requirementIds.indexOf(requirementId)]),
    });
  }
}

for (const lesson of content.lessons) {
  delete lesson.visual;
  delete lesson.knowledgePoints;
  delete lesson.reviewMaterials;

  if (lesson.focus === "integrated-review") {
    const reviewMaterials = materials.reviewLessons[lesson.id];
    if (!Array.isArray(reviewMaterials) || !reviewMaterials.length) throw new Error(`Missing review materials for L${lesson.id}`);
    lesson.materialStatus = "review-complete";
    lesson.reviewMaterials = sanitizeDeep(reviewMaterials);
    lesson.teachingRoutes.full = "Review each section lane, diagnose weak links and complete all lesson questions.";
    continue;
  }

  lesson.materialStatus = "complete";
  lesson.knowledgePoints = lesson.syllabusIds.map((id) => {
    const requirement = requirementById.get(id);
    const definition = materials.lessonPoints[`${lesson.id}:${id}`];
    if (!requirement || !definition) throw new Error(`Missing material definition for L${lesson.id}:${id}`);
    const visuals = (assetsByLessonPoint.get(`${lesson.id}:${id}`) ?? []).sort((left, right) => left.path.localeCompare(right.path));
    return {
      id,
      title: sanitizeStudentText(requirement.requirement),
      notes: sanitizeStudentText(requirement.notes),
      displayTitle: sanitizeStudentText(definition.displayTitle),
      visualMode: definition.mode,
      nodes: sanitizeDeep(definition.nodes),
      steps: sanitizeDeep(definition.steps),
      cue: sanitizeDeep(definition.cue),
      visuals,
      materialCount: 3 + visuals.length,
    };
  });
  lesson.teachingRoutes.full = "Teach every knowledge-point material set, the worked method and all lesson questions.";
}

content.schemaVersion = 3;
content.source = "Consolidated 90-lesson course with complete point-level teaching materials and explicit visual ownership.";
fs.writeFileSync(contentPath, `${JSON.stringify(content, null, 2)}\n`);

console.log(JSON.stringify({
  completedTeachingLessons: content.lessons.filter((lesson) => lesson.materialStatus === "complete").length,
  completedReviewLessons: content.lessons.filter((lesson) => lesson.materialStatus === "review-complete").length,
  completedKnowledgePoints: content.lessons.flatMap((lesson) => lesson.knowledgePoints ?? []).length,
  activeVisuals: content.lessons.flatMap((lesson) => lesson.knowledgePoints ?? []).reduce((sum, point) => sum + point.visuals.length, 0),
  pendingLessons: content.lessons.filter((lesson) => lesson.materialStatus === "pending").length,
}, null, 2));
