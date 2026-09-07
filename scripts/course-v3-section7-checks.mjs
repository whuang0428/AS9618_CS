const normalise = (value) => String(value).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const ids = (r, ...ns) => ns.map((n) => `S7.${String(r).padStart(2, "0")}.A${String(n).padStart(2, "0")}`);
const unitOwnership = {
  PURPOSE: ids(1, 1), DUTIES: ids(1, 2), BODIES: ids(2, 1, 2),
  STAKEHOLDERS: ids(3, 1), CONSEQUENCES: ids(3, 2), JUDGEMENT: ids(3, 3),
  COPYRIGHT: ids(4, 1), FSF: ids(5, 1), OSI: ids(5, 2), SHAREWARE: ids(5, 3),
  COMMERCIAL: ids(5, 4), "LICENCE-CHOICE": ids(5, 5),
  "AI-MEANING": ids(6, 1), "AI-APPLICATIONS": ids(6, 2), "AI-SOCIAL": ids(6, 3),
  "AI-ECONOMIC": ids(6, 4), "AI-ENVIRONMENT": ids(6, 5), "AI-EVALUATION": ids(6, 6),
};
const diagramFiles = {
  "S7-PURPOSE": "professional-responsibility.png", "S7-CONSEQUENCES": "ethical-decision-paths.png",
  "S7-COPYRIGHT": "copyright-permissions.png", "S7-COMMERCIAL": "software-freedoms-and-price.png",
  "S7-SHAREWARE": "shareware-trial.png", "S7-AI-APPLICATIONS": "ai-inference-pipeline.png",
  "S7-AI-SOCIAL": "ai-fairness.png", "S7-AI-ENVIRONMENT": "ai-environmental-balance.png",
};
const malformed = /explain can|identify three impact dimensions must|operation and practical use of explain|technical ideas represented|one limiting case involving|fresh context|two alternatives from Section|plausible student error|Key focus:|Recall S7\.|Recall the main conclusion from Lesson 034/i;

// Acceptance checks target the audit failures: misplaced teaching, borrowed
// scenario answers, missing assessment premises and false coverage labels.
export function validateSection7Presentation(lessons, bank) {
  const errors = [], check = (condition, message) => { if (!condition) errors.push(message); };
  const section = lessons.filter((lesson) => lesson.section === 7);
  check(same(section.map((l) => l.lessonKey), ["S7-L01", "S7-L02", "S7-L03", "S7-L04"]), "S7 must retain four lessons in order");
  check(same([...new Set(section.flatMap((l) => l.syllabusIds))], ["S7.01", "S7.02", "S7.03", "S7.04", "S7.05", "S7.06"]), "S7 requirement order changed");
  const units = new Map(), questions = new Map(), paragraphs = new Map(), prompts = new Map();
  const allObjectives = new Set(section.flatMap((l) => l.objectives.map(([id]) => id)));
  for (const lesson of section) {
    const objectives = lesson.objectives.map(([id]) => id);
    check(same([...new Set(lesson.units.flatMap((u) => u.objectiveIds))], objectives), `${lesson.lessonKey}: objective introduction order or ownership is wrong`);
    check(lesson.diagnostic?.prompt && lesson.diagnostic?.answer, `${lesson.lessonKey}: missing entry diagnostic`);
    check(lesson.summaryMode === "authored" && !malformed.test(JSON.stringify(lesson.summary)), `${lesson.lessonKey}: summary has reverted to keywords`);
    check(!malformed.test(lesson.guidingQuestion), `${lesson.lessonKey}: stale lesson reference`);
    check(lesson.units.some((u) => u.workedExample?.steps.length >= 3), `${lesson.lessonKey}: missing complete worked scenario`);
    for (const id of objectives) check(lesson.practice.some((q) => q.objectiveIds.includes(id)), `${id}: missing mapped practice`);
    for (const u of lesson.units) {
      check(!units.has(u.unitKey), `${u.unitKey}: repeated unit key`);
      units.set(u.unitKey, u);
      check(same(u.objectiveIds, unitOwnership[u.unitKey.replace(/^S7-/, "")]), `${u.unitKey}: teaching mapped to another knowledge point`);
      check(same(u.leadVisual.objectiveIds, u.objectiveIds), `${u.unitKey}: visual ownership differs from teaching`);
      if (diagramFiles[u.unitKey]) {
        check(u.leadVisual.type === "reviewed-visual" && u.leadVisual.asset === `/assets/course-v3/section-7/${diagramFiles[u.unitKey]}`, `${u.unitKey}: reviewed diagram is missing or belongs to another knowledge point`);
        check(u.leadVisual.review === "reviewed" && u.leadVisual.facts?.length >= 4 && u.leadVisual.alt?.length > 60 && u.leadVisual.caption?.length > 60, `${u.unitKey}: diagram lacks a reviewed text equivalent`);
        check(u.supportingMaterials?.some((m) => m.type === "table" && same(m.objectiveIds, u.objectiveIds)), `${u.unitKey}: diagram displaced the detailed comparison table`);
      } else check(["table", "flow"].includes(u.leadVisual.type), `${u.unitKey}: old mismatched raster overview returned`);
      check(u.checkpoint?.prompt && u.checkpoint?.answer, `${u.unitKey}: missing formative check`);
      check(u.coreExplanation.length >= 2, `${u.unitKey}: missing core teaching`);
      for (const paragraph of u.coreExplanation) {
        const key = normalise(paragraph);
        for (const [other, owner] of paragraphs) check(!(key === other || (Math.min(key.length, other.length) > 100 && (key.includes(other) || other.includes(key)))), `${u.unitKey}: repeated core text from ${owner}`);
        paragraphs.set(key, u.unitKey);
      }
    }
    for (const q of [...lesson.practice, ...lesson.examStyleQuestions]) {
      check(q.objectiveIds.length > 0 && q.objectiveIds.every((id) => objectives.includes(id)), `${q.id}: missing or foreign objective`);
      check(!questions.has(q.id), `${q.id}: duplicate question ID`);
      questions.set(q.id, q);
      const prompt = q.prompt ?? q.task, key = normalise(prompt), points = q.answerPoints ?? q.markLogic;
      check(!prompts.has(key), `${q.id}: repeats ${prompts.get(key)}`); prompts.set(key, q.id);
      check(!malformed.test(prompt), `${q.id}: malformed or unspecified task`);
      check(q.marks === points.length && new Set(points.map(normalise)).size === points.length, `${q.id}: missing or duplicated scoring points`);
      if (q.sourceRef) check(q.sourceRef.startsWith("Cambridge 9618 syllabus 7.1 · ") && !/9618\//.test(q.sourceRef), `${q.id}: misleading paper or syllabus attribution`);
    }
  }
  check(units.size === 18, "S7 must teach its 18 distinct knowledge units");
  check(section.flatMap((l) => l.practice).length === 26 && section.flatMap((l) => l.examStyleQuestions).length === 12, "S7 independent question inventory changed");
  const practice = section.flatMap((l) => l.practice);
  for (const exam of section.flatMap((l) => l.examStyleQuestions)) for (const q of practice) {
    const copied = exam.markLogic.filter((point) => q.answerPoints.some((answer) => normalise(point) === normalise(answer)));
    check(!copied.length, `${exam.id}: carries through ${copied.length} scoring point(s) from ${q.id}`);
  }

  const teaching = (key) => units.get(`S7-${key}`)?.coreExplanation.join(" ") ?? "";
  const answer = (id) => { const q = questions.get(id); return (q?.answerPoints ?? q?.markLogic ?? []).join(" "); };
  check(/Shareware is distributed.*try software before paying/.test(teaching("SHAREWARE")) && /trial.*expire|trial.*restrict/i.test(teaching("SHAREWARE")), "Shareware definition and limits must be taught before the answers");
  check(/Commercial and proprietary are not synonyms/.test(teaching("COMMERCIAL")) && /sell free or open-source/.test(teaching("COMMERCIAL")), "Commercial has been conflated with proprietary");
  check(/Artificial intelligence \(AI\) enables.*tasks associated with human intelligence/.test(teaching("AI-MEANING")), "AI definition is absent from core teaching");
  const applications = JSON.stringify(units.get("S7-AI-APPLICATIONS")?.supportingMaterials);
  check([/Medical images/, /Recorded speech/, /vibration and temperature/].every((pattern) => pattern.test(applications)), "AI applications lack concrete input/task/output examples");
  const stakeholders = units.get("S7-STAKEHOLDERS")?.leadVisual;
  check(stakeholders?.type === "table" && same(stakeholders.headers, ["Stakeholder", "Possible benefit", "Possible harm or concern"]), "Stakeholder benefits and harms must be parallel columns");
  check(units.get("S7-LICENCE-CHOICE")?.workedExample?.steps.some(([, body]) => /Offers|A:.*B:.*C:/.test(body)), "Licence choice lacks supplied alternatives");
  for (const key of ["AI-SOCIAL", "AI-ECONOMIC", "AI-ENVIRONMENT"]) check(units.has(`S7-${key}`), `Missing independent teaching of ${key}`);
  check(/privacy|opportunities|safety/.test(teaching("PURPOSE")) && !/AI biometric-matching/.test(teaching("PURPOSE")), "Ethics purpose has been replaced by an unrelated application");

  check(same(questions.get("S7-L01-Q4")?.objectiveIds, ids(2, 1)), "Naming bodies does not assess the purpose of ethics");
  check(same(questions.get("S7-L03-Q4")?.objectiveIds, ids(5, 3)), "Shareware practice has the wrong objective");
  check(/trial|21-day/.test(questions.get("S7-L03-Q4")?.prompt ?? "") && /after the trial/.test(answer("S7-L03-Q4")), "Shareware question must assess continued-use restrictions");
  check(/contractor|alert|danger/.test(answer("S7-L01-EXAM-1")) && !/biometric|employees|environmental benefit/.test(answer("S7-L01-EXAM-1")), "Professional-ethics exam has an unrelated AI answer");
  const ethicalAnswer = answer("S7-L02-EXAM-2");
  check([/Immediate reporting/, /employer/, /Concealment/, /employees/].every((p) => p.test(ethicalAnswer)) && !/British Computer Society/.test(ethicalAnswer), "Ethical consequences must address the supplied payroll actions and stakeholders");
  check(/B meets.*support response/.test(answer("S7-L03-EXAM-3")) && /six-user/.test(answer("S7-L03-EXAM-3")) && /three years/.test(answer("S7-L03-EXAM-3")), "Licence exam ignores the clinic's supplied constraints");
  check(/camera|Camera/.test(answer("S7-L04-EXAM-1")) && /category/.test(answer("S7-L04-EXAM-1")) && !/downtime|repair cost/.test(answer("S7-L04-EXAM-1")), "AI application answer belongs to a different task");
  check([/water/, /energy/, /Manufacturing/, /existing irrigation/].every((p) => p.test(answer("S7-L04-EXAM-3"))), "AI environmental exam must consider savings, lifecycle costs and a baseline");

  const review = lessons.find((l) => l.lessonKey === "REV-P1");
  const reviewUnit = review?.units.find((u) => u.heading === "Section 7: Ethics and ownership");
  const reviewObjectives = Array.from({ length: 6 }, (_, i) => `S7.0${i + 1}.R`);
  check(same(reviewUnit?.objectiveIds, reviewObjectives), "Paper 1 S7 review ownership is incomplete");
  check(reviewUnit?.leadVisual.rows?.length === 6 && !/for a…|Without notes, explain how the/.test(JSON.stringify(reviewUnit)), "Paper 1 S7 review is truncated");
  for (const id of reviewObjectives) check(review?.practice.some((q) => q.id.startsWith("REV-P1-S7-") && q.objectiveIds.includes(id)), `${id}: missing real review practice`);

  if (bank) {
    const set = bank.sets.find((s) => s.id === "SECTION-7-CHECK");
    const mock = bank.sets.find((s) => s.id === "PAPER-1-MOCK");
    check(set?.totalMarks === 20 && set.questions.reduce((n, q) => n + q.marks, 0) === 20, "S7 cumulative check must total 20 marks");
    check(mock?.totalMarks === 75 && mock.questions.reduce((n, q) => n + q.marks, 0) === 75, "Paper 1 mock must total 75 marks");
    const bankQuestions = [...(set?.questions ?? []), ...(mock?.questions.filter((q) => q.id === "A-P1-7") ?? [])];
    check(bankQuestions.length === 5, "S7 assessment bank inventory is incomplete");
    for (const q of bankQuestions) {
      check(q.answerPoints?.length === q.marks && q.objectiveIds?.length && q.objectiveIds.every((id) => allObjectives.has(id)), `${q.id}: assessment lacks scoring or valid ownership`);
      check(!malformed.test(q.prompt) && q.prompt.length > 150, `${q.id}: unspecified assessment task`);
      check(!prompts.has(normalise(q.prompt)), `${q.id}: assessment repeats a lesson task`);
      prompts.set(normalise(q.prompt), q.id);
    }
    check(same([...new Set((set?.questions ?? []).flatMap((q) => q.objectiveIds ?? []).map((id) => id.replace(/\.A\d+$/, "")))].sort(), reviewObjectives.map((id) => id.replace(/\.R$/, ""))), "Section check must assess all six S7 requirements");
    check(/notify users.*hide the fault/.test(set?.questions[1]?.prompt ?? ""), "Ethical assessment omits its two supplied actions");
    check(/Offer A.*Offer B/.test(set?.questions[2]?.prompt ?? ""), "Licence assessment omits the alternatives to compare");
    const paper = bankQuestions.find((q) => q.id === "A-P1-7");
    check(paper?.marks === 10 && ["(a)", "(b)", "(c)"].every((label, i) => paper.answerPoints.filter((p) => p.startsWith(label)).length === [3, 3, 4][i]), "Paper 1 S7 subpart scoring must be 3 + 3 + 4");
  }
  return errors;
}

export function validateSection7Html(lessons, readHtml) {
  const errors = [];
  for (const lesson of lessons.filter((l) => l.section === 7)) {
    const html = readHtml(lesson);
    if ((html.match(/<details class="paper-marking-points">/g) ?? []).length !== lesson.examStyleQuestions.length || /<details class="paper-marking-points"[^>]*\bopen\b/.test(html)) errors.push(`${lesson.lessonKey}: exam answers must start collapsed`);
    if ((html.match(/class="unit-checkpoint"/g) ?? []).length !== lesson.units.length) errors.push(`${lesson.lessonKey}: rendered formative checks missing`);
    if (!html.includes('id="lesson-contents"') || lesson.units.some((_, i) => !html.includes(`href="#unit-${i + 1}"`) || !html.includes(`id="unit-${i + 1}"`))) errors.push(`${lesson.lessonKey}: knowledge-unit navigation is incomplete`);
    if (!html.includes('class="diagnostic"') || malformed.test(html)) errors.push(`${lesson.lessonKey}: missing diagnostic or stale rendered wording`);
    if (/stage10-lesson-073-stakeholders|stage10-lesson-075-licensing|stage10-lesson-077-environment/.test(html)) errors.push(`${lesson.lessonKey}: mismatched overview image returned`);
    for (const u of lesson.units.filter((unit) => diagramFiles[unit.unitKey])) {
      const path = `../../assets/course-v3/section-7/${diagramFiles[u.unitKey]}`;
      if (!html.includes(`src="${path}" width="`) || !html.includes(`href="${path}" target="_blank"`) || !html.includes('class="visual-scroll" tabindex="0" role="region"')) errors.push(`${u.unitKey}: image dimensions, keyboard scrolling or full-size access missing`);
    }
  }
  return errors;
}
