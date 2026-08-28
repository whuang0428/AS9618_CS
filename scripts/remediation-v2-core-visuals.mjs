import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const contract = JSON.parse(fs.readFileSync(path.join(root, "scripts", "syllabus-coverage-contract.json"), "utf8"));
const lessonId = (value) => String(value).padStart(3, "0");

// These panels used to appear before the official first-use lesson. Keep their
// deterministic assets, but deliver the maintained explanation on or after the
// reviewed first-use lesson so a visual can never become an accidental early lesson.
export const visualDeliveryOverrides = Object.freeze(JSON.parse(fs.readFileSync(
  path.join(root, "scripts", "remediation-v2-visual-delivery-map.json"),
  "utf8",
)));

export function visualDeliveryLesson(sourceLesson, targetId) {
  return visualDeliveryOverrides[`${lessonId(sourceLesson)}/${targetId}`]?.lesson ?? lessonId(sourceLesson);
}

export function visualDeliveryTarget(sourceLesson, targetId) {
  return visualDeliveryOverrides[`${lessonId(sourceLesson)}/${targetId}`]?.targetId ?? targetId;
}

const requiredVisuals = contract.requirements.flatMap((requirement) =>
  (requirement.visualEvidence ?? []).filter(({ required }) => required).map((visual) => ({ requirement, visual })),
);

for (const { requirement, visual } of requiredVisuals) {
  const firstUseLesson = requirement.firstUseReview?.lesson;
  if (!Number.isInteger(firstUseLesson)) throw new Error(`${requirement.id}: required visual has no reviewed first-use lesson`);
  if (visual.lesson < firstUseLesson) throw new Error(`${requirement.id}: required visual L${lessonId(visual.lesson)} precedes reviewed first use L${lessonId(firstUseLesson)}`);
  if (!visual.sectionId?.startsWith("explanation-")) throw new Error(`${requirement.id}: required visual section ${visual.sectionId} is not a maintained explanation panel`);
  const html = fs.readFileSync(path.join(root, "web", `lesson-${lessonId(visual.lesson)}`, "index.html"), "utf8");
  if (!/id="stage2-completion"/.test(html)) throw new Error(`${requirement.id}: required visual delivery page L${lessonId(visual.lesson)} has no CORE teaching anchor`);
}

export const coreVisualSectionKeys = Object.freeze(new Set(requiredVisuals.map(({ visual }) =>
  `${lessonId(visual.lesson)}/${visual.sectionId}`,
)));

export const coreVisualTargetKeys = Object.freeze(new Set(requiredVisuals.map(({ visual }) =>
  `${lessonId(visual.lesson)}/${visual.sectionId.replace(/^explanation-/, "")}`,
)));
