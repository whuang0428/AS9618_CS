// Add reviewed exceptions as "lesson-id/section-id": { role, activity, group, minutes }.
// Minutes are intentionally absent unless a teacher has explicitly reviewed the timing.
const optionalExtension = (group) => Object.freeze({ role: "OPTIONAL", activity: "EXTEND", group });

export const deliveryOverrides = Object.freeze({
  "lesson-050/pipeline-extension": optionalExtension("pipeline-extension"),
  "lesson-050/concept": optionalExtension("pipeline-extension"),
  "lesson-050/compare": optionalExtension("pipeline-extension"),
  "lesson-050/timing": optionalExtension("pipeline-extension"),
  "lesson-050/hazards": optionalExtension("pipeline-extension"),
  "lesson-050/stalls": optionalExtension("pipeline-extension"),
  "lesson-050/tool": Object.freeze({ role: "CORE", activity: "PRACTISE", group: "bit-tool" }),
  "lesson-050/examples": Object.freeze({ role: "CORE", activity: "TEACH", group: "bit-examples" }),
  "lesson-050/practice": Object.freeze({ role: "CORE", activity: "PRACTISE", group: "bit-practice" }),
  "lesson-050/debug": Object.freeze({ role: "CORE", activity: "CHECK", group: "bit-debug" }),
  "lesson-050/exam": Object.freeze({ role: "CORE", activity: "EXAM", group: "bit-assessment" }),
  "lesson-142/agile": optionalExtension("agile-extension"),
});
