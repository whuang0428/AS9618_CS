import { classifyCommand, officialCommandWords } from "./cie-command-words.mjs";

export function evaluateStage4QuestionPolicy(review, questions) {
  const problems = [];
  const push = (id, detail) => problems.push({ id, detail });
  const rows = review.entries ?? [];
  const byId = new Map(rows.map((row) => [row.questionId, row]));
  if (officialCommandWords.length !== 27 || review.officialCommandWords?.join() !== officialCommandWords.join()) push("STAGE4-COMMAND-TABLE", "official 27-word table is missing or stale");
  if (questions.length !== 968 || rows.length !== 968 || byId.size !== 968) push("STAGE4-QUESTION-COUNT", `questions=${questions.length}, rows=${rows.length}, unique=${byId.size}`);
  for (const question of questions) {
    const row = byId.get(question.id);
    if (!row) { push("STAGE4-QUESTION-MISSING", question.id); continue; }
    if (row.contentHash !== question.hash) push("STAGE4-HASH", question.id);
    if (row.marks !== question.marks || question.points.length !== question.marks) push("STAGE4-MARKS", question.id);
    if (/\b(?:distinguish|recommend)\b/i.test(question.prompt)) push("STAGE4-UNSUPPORTED-WORD", question.id);
    const command = classifyCommand(question.prompt, row.primaryRequirement);
    if (command.status !== "Approved" || command.word !== row.primaryCommandWord || command.kind !== row.commandClassification) push("STAGE4-COMMAND", `${question.id}: ${command.reason ?? "classification drift"}`);
    if (!Array.isArray(row.assessmentObjectives) || !row.assessmentObjectives.length) push("STAGE4-AO", question.id);
    if (!row.allowedAnswerBoundary?.creditworthyPoints || row.allowedAnswerBoundary.creditworthyPoints.length !== question.marks) push("STAGE4-BOUNDARY", question.id);
    for (const key of ["correctAnswer", "commonError", "boundaryAnswer", "outOfScopeAnswer"]) {
      const trial = row.trialCases?.[key];
      if (!trial || trial.result !== "Pass" || trial.expectedMarks !== trial.observedMarks) push("STAGE4-TRIAL", `${question.id}:${key}`);
    }
  }
  return problems;
}

export function evaluateStudentMarkSchemeSurface(text) {
  const problems = [];
  if (/\*\*(?:B1|M1|A1)\*\*|<strong>(?:B1|M1|A1)<\/strong>/.test(text)) problems.push({ id: "STAGE4-VISIBLE-CODE", detail: "student-visible internal mark code" });
  if (!/Answer/.test(text) || !/Guidance/.test(text) || !/Marks/.test(text)) problems.push({ id: "STAGE4-MS-COLUMNS", detail: "Answer/Guidance/Marks headings missing" });
  return problems;
}
