import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { questionRepairs, teachingDepthOverrides } from "./course-v2-teaching-depth-overrides.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const readJson = (name) => JSON.parse(fs.readFileSync(path.join(root, "scripts", name), "utf8"));
const contentPath = path.join(root, "scripts", "course-v2-content.json");
const questionPath = path.join(root, "scripts", "question-bank-contract.json");
const syllabus = readJson("syllabus-coverage-contract.json");
const ownership = readJson("course-v2-material-ownership.json");
const materials = readJson("course-v2-knowledge-materials.json");
const requirementById = new Map(syllabus.requirements.map((requirement) => [requirement.id, requirement]));
const questionBank = readJson("question-bank-contract.json");
const questionById = new Map(questionBank.questions.map((question) => [question.id, question]));

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

function sanitizeTeachingDeep(value) {
  if (typeof value === "string") return value.split("\n").map(sanitizeStudentText).join("\n").trim();
  if (Array.isArray(value)) return value.map(sanitizeTeachingDeep);
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, sanitizeTeachingDeep(item)]));
  return value;
}

function normalise(value) {
  return sanitizeStudentText(value)
    .toLowerCase()
    .replaceAll("’", "'")
    .replace(/[^a-z0-9+#' ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function unique(values) {
  const seen = new Set();
  return values.filter((value) => {
    const key = normalise(value);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function atomicObjectives(requirement) {
  return requirement.requiredGroups.map((terms, index) => ({
    id: `${requirement.id}.A${String(index + 1).padStart(2, "0")}`,
    label: terms.join(" / "),
    terms,
  }));
}

function containsTerm(value, terms) {
  const source = normalise(value);
  return terms.some((term) => source.includes(normalise(term)));
}

function teachingScore(value) {
  const text = sanitizeStudentText(value);
  const words = text.split(/\s+/).filter(Boolean).length;
  const relationshipBonus = (text.match(/\b(?:because|therefore|so that|which|while|when|if|causes?|allows?|prevents?|means?|uses?|carries?|stores?|returns?|compares?|converts?)\b/gi) ?? []).length * 6;
  const sequenceBonus = (text.match(/(?:→|;|:|\bthen\b|\bafter\b|\bbefore\b)/gi) ?? []).length * 3;
  return words + relationshipBonus + sequenceBonus;
}

function pointExplanations(lesson, requirement, definition, override) {
  if (override?.explanations?.length) return override.explanations;
  const primaryCandidates = unique([
    ...lesson.coreFacts,
    definition.cue.text,
    ...definition.steps.map((step) => step.detail),
  ]).filter((candidate) => !/…|\.\.\./.test(candidate) && candidate.split(/\s+/).length >= 5);
  const exactSyllabusText = new Set([normalise(requirement.requirement), normalise(requirement.notes)]);
  const substantiveCandidates = primaryCandidates
    .filter((candidate) => !exactSyllabusText.has(normalise(candidate)))
    .sort((left, right) => teachingScore(right) - teachingScore(left));
  const syllabusFallbacks = unique([requirement.notes, requirement.requirement])
    .filter((candidate) => !/…|\.\.\./.test(candidate) && candidate.split(/\s+/).length >= 5);
  const selected = [];
  const selectedKeys = new Set();
  const addSelected = (candidate) => {
    const key = normalise(candidate);
    if (!key || selectedKeys.has(key)) return;
    selectedKeys.add(key);
    selected.push(candidate);
  };
  for (const group of requirement.requiredGroups) {
    const match = substantiveCandidates.find((candidate) => containsTerm(candidate, group))
      ?? syllabusFallbacks.find((candidate) => containsTerm(candidate, group));
    if (match) addSelected(match);
  }
  const allTerms = requirement.requiredGroups.flat();
  for (const candidate of substantiveCandidates.filter((item) => containsTerm(item, allTerms))) {
    if (selected.length >= Math.max(3, Math.min(6, requirement.requiredGroups.length))) break;
    addSelected(candidate);
  }
  return unique(selected);
}

function teachingSentences(values) {
  return unique(values.flatMap((value) => sanitizeStudentText(value)
    .split(/(?<=[.!?;])\s+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.split(/\s+/).length >= 7)));
}

function pointMechanismSteps(requirement, definition, override, explanations) {
  if (override?.mechanismSteps?.length) return override.mechanismSteps;
  const command = requirement.requirement.match(/^(Explain|Describe|Use|Write|Produce|Select|Distinguish|Construct|Identify|Show)/i)?.[1]?.toLowerCase() ?? "explain";
  const routes = ["describe", "identify", "show"].includes(command)
    ? [
        ["Identify", "Establish the exact components or states"],
        ["Connect", "Trace the relationship or change"],
        ["Apply", "Use the explanation in a concrete case"],
      ]
    : ["write", "produce", "construct", "use"].includes(command)
      ? [
          ["Prepare", "Set up the required data and conditions"],
          ["Execute", "Carry out the complete method"],
          ["Check", "Trace or test the result"],
        ]
      : command === "select"
        ? [
            ["Criteria", "Extract the constraints from the scenario"],
            ["Compare", "Match mechanisms to those constraints"],
            ["Justify", "Link the choice to a consequence"],
          ]
        : [
            ["Cause", "Identify the relevant condition or input"],
            ["Mechanism", "Trace how the process works"],
            ["Consequence", "Connect the mechanism to its result"],
          ];
  const details = teachingSentences([
    ...explanations,
    definition.cue.text,
    ...definition.steps.map((step) => step.detail),
  ]);
  return routes.map(([label, title], index) => ({ label, title, detail: details[index % details.length] }));
}

function pointWorkedExamples(lesson, requirement, definition, override, explanations, mechanismSteps) {
  if (override?.workedExamples?.length) return override.workedExamples;
  const relevantExampleSentences = teachingSentences([lesson.workedExample])
    .filter((sentence) => !/…|\.\.\./.test(sentence) && containsTerm(sentence, requirement.requiredGroups.flat()));
  const completeExample = relevantExampleSentences.length
    ? relevantExampleSentences.join(" ")
    : /…|\.\.\./.test(lesson.workedExample)
    ? lesson.coreFacts.find((fact) => !/…|\.\.\./.test(fact) && fact.split(/\s+/).length >= 18) ?? definition.cue.text
    : lesson.workedExample;
  return [{
    title: `${definition.displayTitle.replace(/…|\.\.\./g, "").trim()}: complete worked route`,
    steps: [
      ...mechanismSteps.map((step) => ({
        label: step.title,
        text: step.detail,
      })),
      { label: "Complete example", text: completeExample },
    ],
  }];
}

function masteryPrompt(requirement, objectives) {
  const targets = objectives.map((objective) => objective.label).join("; ");
  const command = requirement.requirement.match(/^(Explain|Describe|Use|Write|Produce|Select|Distinguish|Construct|Identify|Show)/i)?.[1]?.toLowerCase() ?? "explain";
  if (["write", "produce", "construct", "use"].includes(command)) return `Complete a fresh example that demonstrates every target: ${targets}. Show all intermediate steps and check the result.`;
  if (command === "select") return `Select and justify a suitable choice in a fresh scenario, explicitly using every target: ${targets}.`;
  return `${command.charAt(0).toUpperCase()}${command.slice(1)} the following targets in one connected answer, using a concrete example for each: ${targets}.`;
}

for (const [id, repair] of Object.entries(questionRepairs)) {
  const question = questionById.get(id);
  if (!question) throw new Error(`Unknown question repair ${id}`);
  Object.assign(question, sanitizeDeep(repair));
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
    lesson.reviewMaterials = sanitizeDeep(reviewMaterials.map((lane) => ({
      ...lane,
      retrievalPrompt: `Without notes, explain how the listed Section ${lane.section} ideas connect. Give one mechanism, calculation or construction step rather than a list of terms.`,
      correctionPrompt: `Correct one plausible error about ${lane.points[0]?.toLowerCase() ?? lane.title.toLowerCase()} and state exactly why the corrected version is accurate.`,
      transferPrompt: `Apply one Section ${lane.section} method to a new scenario, show the intermediate reasoning and check the final result.`,
    })));
    lesson.teachingRoutes.full = "Review each section lane, diagnose weak links and complete all lesson questions.";
    continue;
  }

  lesson.materialStatus = "complete";
  lesson.knowledgePoints = lesson.syllabusIds.map((id) => {
    const requirement = requirementById.get(id);
    const definition = materials.lessonPoints[`${lesson.id}:${id}`];
    if (!requirement || !definition) throw new Error(`Missing material definition for L${lesson.id}:${id}`);
    const visuals = (assetsByLessonPoint.get(`${lesson.id}:${id}`) ?? []).sort((left, right) => left.path.localeCompare(right.path));
    const override = teachingDepthOverrides[`${lesson.id}:${id}`];
    const objectives = atomicObjectives(requirement);
    const explanations = pointExplanations(lesson, requirement, definition, override);
    const mechanismSteps = pointMechanismSteps(requirement, definition, override, explanations);
    const checkId = `MC-L${lesson.id}-${id}`;
    const mappedQuestions = lesson.questionIds
      .map((questionId) => questionById.get(questionId))
      .filter((question) => question?.syllabusIds?.includes(id) && (question.syllabusIds.length === 1 || questionRepairs[question.id]))
      .map((question) => question.id);
    return {
      id,
      title: sanitizeStudentText(requirement.requirement),
      notes: sanitizeStudentText(requirement.notes),
      displayTitle: sanitizeStudentText(definition.displayTitle),
      visualMode: definition.mode,
      nodes: sanitizeDeep(override?.nodes ?? definition.nodes),
      steps: sanitizeDeep(override?.mechanismSteps ?? definition.steps),
      cue: sanitizeDeep(override?.cue ?? definition.cue),
      atomicObjectives: sanitizeDeep(objectives),
      explanations: sanitizeDeep(explanations),
      mechanismSteps: sanitizeDeep(mechanismSteps),
      workedExamples: sanitizeTeachingDeep(pointWorkedExamples(lesson, requirement, definition, override, explanations, mechanismSteps)),
      misconceptions: sanitizeDeep(override?.misconceptions ?? [lesson.commonError]),
      masteryCheck: {
        id: checkId,
        objectiveIds: objectives.map((objective) => objective.id),
        prompt: masteryPrompt(requirement, objectives),
        answerCriteria: explanations,
      },
      questionIds: [checkId, ...mappedQuestions],
      visuals,
      materialCount: 3 + visuals.length,
    };
  });
  const summaryPoints = lesson.knowledgePoints.flatMap((point) => [
    `${point.id}: explain ${point.atomicObjectives.map((objective) => objective.label).join(", ")}.`,
    `${point.id} method: ${point.mechanismSteps.map((step) => step.title).join(" → ")}.`,
  ]);
  summaryPoints.push(`Correction to remember: ${lesson.knowledgePoints[0].misconceptions[0]}`);
  lesson.summaryPoints = unique(summaryPoints).slice(0, 5);
  lesson.teachingRoutes.full = "Teach every knowledge-point material set, the worked method and all lesson questions.";
}

content.schemaVersion = 3;
content.source = "Consolidated 90-lesson course with complete point-level teaching materials and explicit visual ownership.";
fs.writeFileSync(contentPath, `${JSON.stringify(content, null, 2)}\n`);
fs.writeFileSync(questionPath, `${JSON.stringify(questionBank, null, 2)}\n`);

console.log(JSON.stringify({
  completedTeachingLessons: content.lessons.filter((lesson) => lesson.materialStatus === "complete").length,
  completedReviewLessons: content.lessons.filter((lesson) => lesson.materialStatus === "review-complete").length,
  completedKnowledgePoints: content.lessons.flatMap((lesson) => lesson.knowledgePoints ?? []).length,
  activeVisuals: content.lessons.flatMap((lesson) => lesson.knowledgePoints ?? []).reduce((sum, point) => sum + point.visuals.length, 0),
  pendingLessons: content.lessons.filter((lesson) => lesson.materialStatus === "pending").length,
}, null, 2));
