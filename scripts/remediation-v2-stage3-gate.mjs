import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import { buildCurriculumSequenceModel } from "./curriculum-sequence-model.mjs";
import { coverageContract } from "./syllabus-coverage-contract.mjs";
import { evaluateRequirement, normaliseText } from "./syllabus-coverage-evaluator.mjs";
import { loadAllQuestions } from "./ms-review-utils.mjs";
import { courseUnits, unitForLesson } from "./course-structure.mjs";
import { stage3CoreRepairs, stage3OptionalBaseLessons, stage3RequirementFirstUse } from "./remediation-v2-stage3-sequence-plan.mjs";
import { stage3QuestionDependencyOverrides } from "./remediation-v2-stage3-question-repairs.mjs";

export const root = path.resolve(import.meta.dirname, "..");
const decode = (value) => String(value).replace(/<[^>]+>/g, " ").replaceAll("&amp;", "&").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&quot;", '"').replaceAll("&#39;", "'").replace(/\s+/g, " ").trim();
const sectionNumber = (id) => Number(id.match(/^S(\d+)\./)?.[1]);
const rowNumber = (id) => Number(id.match(/^S\d+\.(\d+)$/)?.[1]);

export function evaluateStage3Policy(contract = coverageContract, repairs = stage3CoreRepairs, questions = loadAllQuestions()) {
  const problems = [];
  const push = (id, detail) => problems.push({ id, detail });
  const firstUse = Object.fromEntries(contract.requirements.map((requirement) => [requirement.id, Math.min(...requirement.teachingLessons)]));
  if (contract.requirements.length !== 121) push("STAGE3-CONTRACT-COUNT", `expected 121 rows, found ${contract.requirements.length}`);
  if (Object.keys(stage3RequirementFirstUse).length !== 121) push("STAGE3-PLAN-COUNT", `expected 121 planned first-use rows, found ${Object.keys(stage3RequirementFirstUse).length}`);

  for (const requirement of contract.requirements) {
    if (firstUse[requirement.id] !== stage3RequirementFirstUse[requirement.id]) push("STAGE3-FIRST-USE", `${requirement.id} contract L${firstUse[requirement.id]} != plan L${stage3RequirementFirstUse[requirement.id]}`);
    if (!["remediation-v2-stage3", "remediation-v2-audit-integrity-r2"].includes(requirement.evidenceReviewRound) || requirement.firstUseReview?.status !== "Reviewed") push("STAGE3-REVIEW", `${requirement.id} lacks a current reviewed first-use record`);
    const { contentHash, status, ...basis } = requirement.firstUseReview ?? {};
    const hash = crypto.createHash("sha256").update(JSON.stringify(basis)).digest("hex");
    if (contentHash !== hash) push("STAGE3-FIRST-USE-HASH", `${requirement.id} first-use evidence hash drifted`);
    const evaluation = evaluateRequirement(requirement);
    if (evaluation.status !== "Complete") push("STAGE3-COVERAGE", `${requirement.id}: ${evaluation.messages.join("; ")}`);
  }

  for (let section = 1; section <= 12; section += 1) {
    const rows = contract.requirements.filter((item) => item.section === section);
    for (let index = 1; index < rows.length; index += 1) {
      if (firstUse[rows[index - 1].id] > firstUse[rows[index].id]) push("STAGE3-OFFICIAL-ORDER", `${rows[index - 1].id} follows ${rows[index].id}`);
    }
  }
  for (const repair of repairs) {
    const rows = repair.rows.filter((id) => sectionNumber(id) === sectionNumber(repair.rows[0]));
    for (let index = 1; index < rows.length; index += 1) if (rowNumber(rows[index - 1]) > rowNumber(rows[index])) push("STAGE3-INTRALESSON-ORDER", `L${repair.lesson} orders ${rows[index - 1]} after ${rows[index]}`);
  }

  const sequence = buildCurriculumSequenceModel(contract, questions);
  for (const problem of sequence.problems) push(`STAGE3-${problem.type}`, `${problem.id}: ${problem.detail}`);
  return problems;
}

export function buildStage3QuestionSequenceRegister(contract = coverageContract, questions = loadAllQuestions()) {
  const byEvidence = new Map();
  for (const requirement of contract.requirements) for (const evidence of requirement.assessmentEvidence) {
    if (!byEvidence.has(evidence.questionId)) byEvidence.set(evidence.questionId, []);
    byEvidence.get(evidence.questionId).push(requirement.id);
  }
  const optionalLessons = new Set(stage3OptionalBaseLessons);
  const requirementsBySection = new Map();
  for (const requirement of contract.requirements) {
    if (!requirementsBySection.has(requirement.section)) requirementsBySection.set(requirement.section, []);
    requirementsBySection.get(requirement.section).push(requirement);
  }
  const entries = questions.map((question) => {
    const explicit = byEvidence.get(question.id) ?? [];
    const optional = question.source === "lesson" && optionalLessons.has(question.lesson) && explicit.length === 0;
    const questionSections = [...new Set(String(question.section).split(",").flatMap((token) => {
      const value = token.trim();
      if (/^\d+\.\d+$/.test(value)) return [Number(value.split(".")[0])];
      if (/^\d+-\d+$/.test(value)) {
        const [start, end] = value.split("-").map(Number);
        return Array.from({ length: end - start + 1 }, (_, index) => start + index);
      }
      return /^\d+$/.test(value) ? [Number(value)] : [];
    }))];
    let dependencies = explicit.length ? explicit : (stage3QuestionDependencyOverrides[question.id] ?? []);
    let basis = "contract-assessment-evidence";
    if (!explicit.length && dependencies.length) basis = "stage3-reviewed-override";
    if (!optional && dependencies.length === 0) {
      const text = normaliseText([question.prompt, question.answer, ...(question.points ?? []).flat(), ...(question.guidance ?? [])].join(" "));
      const candidates = questionSections.flatMap((section) => requirementsBySection.get(section) ?? []).map((requirement) => {
        const matches = requirement.requiredGroups.filter((group) => group.some((term) => ` ${text} `.includes(` ${normaliseText(term)} `))).length;
        return { id: requirement.id, matches, ratio: matches / requirement.requiredGroups.length };
      }).sort((a, b) => b.ratio - a.ratio || b.matches - a.matches || a.id.localeCompare(b.id));
      const best = candidates[0];
      dependencies = candidates.filter(({ ratio, matches }) => best && ratio === best.ratio && matches === best.matches && matches >= 2).slice(0, 3).map(({ id }) => id);
      basis = dependencies.length ? "section-semantic-inference" : "section-prior-CORE";
      if (!dependencies.length) dependencies = questionSections.flatMap((section) => (requirementsBySection.get(section) ?? []).filter((requirement) => Math.min(...requirement.teachingLessons) <= question.lesson).map(({ id }) => id));
    }
    const violations = optional ? [] : dependencies.filter((id) => Math.min(...contract.requirements.find((item) => item.id === id).teachingLessons) > question.lesson);
    return {
      questionId: question.id,
      lesson: question.lesson,
      source: question.source,
      sourceKey: question.sourceKey,
      sequenceRole: optional ? "OPTIONAL_ENRICHMENT" : "FORMAL_ASSESSMENT",
      dependencyBasis: optional ? "optional-legacy-lesson-body" : basis,
      requirementDependencies: dependencies,
      beforeCoreViolations: violations,
      contentHash: question.hash,
    };
  });
  return {
    schemaVersion: 1,
    reviewRound: "remediation-v2-stage3",
    questionCount: entries.length,
    formalCount: entries.filter(({ sequenceRole }) => sequenceRole === "FORMAL_ASSESSMENT").length,
    optionalCount: entries.filter(({ sequenceRole }) => sequenceRole === "OPTIONAL_ENRICHMENT").length,
    violationCount: entries.reduce((sum, entry) => sum + entry.beforeCoreViolations.length, 0),
    entries,
  };
}

export function evaluateStage3Repository() {
  const problems = evaluateStage3Policy();
  const questionRegister = buildStage3QuestionSequenceRegister();
  if (questionRegister.questionCount !== 963) problems.push({ id: "STAGE3-QUESTION-COUNT", detail: `expected 963 questions, found ${questionRegister.questionCount}` });
  for (const entry of questionRegister.entries.filter(({ beforeCoreViolations }) => beforeCoreViolations.length)) problems.push({ id: "STAGE3-QUESTION-BEFORE-CORE", detail: `${entry.questionId}: ${entry.beforeCoreViolations.join(", ")}` });

  const catalogSource = fs.readFileSync(path.join(root, "web", "course-catalog.js"), "utf8");
  for (let lesson = 1; lesson <= 150; lesson += 1) {
    const number = String(lesson).padStart(3, "0");
    const unit = unitForLesson(lesson);
    const html = fs.readFileSync(path.join(root, "web", `lesson-${number}`, "index.html"), "utf8");
    const markdownName = fs.readdirSync(path.join(root, "lessons")).find((name) => name.startsWith(`${number}-`) && name.endsWith(".md"));
    const markdown = fs.readFileSync(path.join(root, "lessons", markdownName), "utf8");
    const h1 = decode(html.match(/<h1>([\s\S]*?)<\/h1>/)?.[1] ?? "");
    const mdTitle = markdown.match(/^# Lesson \d{3}: (.*)$/m)?.[1]?.trim() ?? "";
    if (h1 !== mdTitle) problems.push({ id: "STAGE3-TITLE-IDENTITY", detail: `L${number} HTML h1 and Markdown title differ` });
    if (!catalogSource.includes(`"id": "${number}"`) || !catalogSource.includes(`"title": ${JSON.stringify(h1)}`)) problems.push({ id: "STAGE3-CATALOG-IDENTITY", detail: `L${number} is missing or stale in course catalog` });
    if (!html.includes(`Paper ${unit.paper.endsWith("1") ? "1" : "2"}`) || !markdown.includes(`**Paper:** ${unit.paper}`)) problems.push({ id: "STAGE3-PAPER-IDENTITY", detail: `L${number} paper metadata disagrees with course unit` });
  }
  if (courseUnits.length !== 14 || courseUnits[0].range[0] !== 1 || courseUnits.at(-1).range[1] !== 150) problems.push({ id: "STAGE3-COURSE-MAP", detail: "course-unit ranges do not cover stable lessons 001-150" });
  return { problems, questionRegister };
}
