import { optionalEnrichment } from "./remediation-v2-optional-enrichment.mjs";

// Add reviewed exceptions as "lesson-id/section-id": { role, activity, group, minutes }.
// Minutes are intentionally absent unless a teacher has explicitly reviewed the timing.
const optionalExtension = (group) => Object.freeze({ role: "OPTIONAL", activity: "EXTEND", group });

export const deliveryOverrides = Object.freeze({
  ...Object.fromEntries(optionalEnrichment.flatMap((entry) => entry.optionalSectionIds.map((sectionId) => [
    `lesson-${String(entry.lesson).padStart(3, "0")}/${sectionId}`,
    optionalExtension(`remediation-v2-optional-${String(entry.lesson).padStart(3, "0")}`),
  ]))),
  "lesson-051/pipeline-extension": optionalExtension("pipeline-extension"),
  "lesson-051/concept": optionalExtension("pipeline-extension"),
  "lesson-051/compare": optionalExtension("pipeline-extension"),
  "lesson-051/timing": optionalExtension("pipeline-extension"),
  "lesson-051/hazards": optionalExtension("pipeline-extension"),
  "lesson-051/stalls": optionalExtension("pipeline-extension"),
  "lesson-051/tool": Object.freeze({ role: "CORE", activity: "PRACTISE", group: "bit-tool" }),
  "lesson-051/examples": Object.freeze({ role: "CORE", activity: "TEACH", group: "bit-examples" }),
  "lesson-051/practice": Object.freeze({ role: "CORE", activity: "PRACTISE", group: "bit-practice" }),
  "lesson-051/debug": Object.freeze({ role: "CORE", activity: "CHECK", group: "bit-debug" }),
  "lesson-051/exam": Object.freeze({ role: "CORE", activity: "EXAM", group: "bit-assessment" }),
  "lesson-143/agile": optionalExtension("agile-extension"),
});
