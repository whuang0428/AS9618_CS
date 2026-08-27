import { coverageContract } from "./syllabus-coverage-contract.mjs";
import { loadAllQuestions } from "./ms-review-utils.mjs";

export function buildCurriculumSequenceModel(contract = coverageContract, questions = loadAllQuestions()) {
  const questionLookupForModel = new Map(questions.map((question) => [question.id, question]));
  const requirementLookup = new Map(contract.requirements.map((requirement) => [requirement.id, requirement]));
  const nodes = contract.requirements.map((requirement) => ({
    id: requirement.id,
    section: requirement.section,
    teachingLessons: requirement.teachingLessons,
    firstTeachingLesson: Math.min(...requirement.teachingLessons),
    riskLevel: requirement.riskLevel,
  }));
  const edges = contract.requirements.flatMap((requirement) => requirement.prerequisites.map((prerequisite) => ({
    prerequisite,
    dependent: requirement.id,
    prerequisiteFirstLesson: Math.min(...requirementLookup.get(prerequisite).teachingLessons),
    dependentFirstLesson: Math.min(...requirement.teachingLessons),
  })));
  const assessmentFirstUses = contract.requirements.flatMap((requirement) => requirement.assessmentEvidence.map(({ questionId }) => {
    const question = questionLookupForModel.get(questionId);
    return {
      requirement: requirement.id,
      questionId,
      assessmentLesson: question?.lesson ?? null,
      firstTeachingLesson: Math.min(...requirement.teachingLessons),
      beforeTeaching: question ? question.lesson < Math.min(...requirement.teachingLessons) : null,
    };
  }));
  const problems = [
    ...edges.filter(({ prerequisiteFirstLesson, dependentFirstLesson }) => prerequisiteFirstLesson > dependentFirstLesson).map((edge) => ({
      type: "PREREQUISITE_AFTER_DEPENDENT",
      id: `${edge.prerequisite}->${edge.dependent}`,
      detail: `${edge.prerequisite} first taught at L${String(edge.prerequisiteFirstLesson).padStart(3, "0")}; ${edge.dependent} first used at L${String(edge.dependentFirstLesson).padStart(3, "0")}`,
    })),
    ...assessmentFirstUses.filter(({ beforeTeaching }) => beforeTeaching).map((entry) => ({
      type: "ASSESSMENT_BEFORE_TEACHING",
      id: `${entry.questionId}->${entry.requirement}`,
      detail: `${entry.questionId} occurs at L${String(entry.assessmentLesson).padStart(3, "0")}; ${entry.requirement} first taught at L${String(entry.firstTeachingLesson).padStart(3, "0")}`,
    })),
  ].sort((a, b) => a.id.localeCompare(b.id));
  return {
    schemaVersion: 1,
    source: "scripts/syllabus-coverage-contract.json",
    status: problems.length ? "Blocked" : "Ready",
    nodeCount: nodes.length,
    edgeCount: edges.length,
    assessmentEvidenceCount: assessmentFirstUses.length,
    nodes,
    edges,
    assessmentFirstUses,
    problems,
  };
}
