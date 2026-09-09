import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { classifyCommand } from "./cie-command-words.mjs";
import { section2Lessons } from "./course-v3-section2-content.mjs";
import { normalisePresentationText, unitMaterials } from "./course-v3-presentation.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const check = (condition, message) => assert.ok(condition, `S2 presentation: ${message}`);
const questionDiagrams = {
  "S2-L02-Q2": ["question-star-mesh.svg", ["A-S1", "B-S1", "C-S2", "D-S2", "S1-S2", "S1-S3", "S2-S3"]],
  "S2-L02-EXAM-3": ["question-partial-mesh.svg", ["P-Q", "Q-R", "R-T", "T-P"]],
  "S2-L05-Q2": ["question-wireless-server.svg", ["Router-Server", "Switch-Router", "WAP-Switch", "WNIC-WAP"]],
  "S2-L07-Q2": ["question-pstn-access.svg", ["HomeModem-ProviderModem", "Laptop-Switch", "ProviderModem-ProviderNetwork", "Router-HomeModem", "Switch-Router"]],
};

export function validateSection2Presentation(lessons, { checkFiles = false } = {}) {
  check(lessons.length === 8, "eight active lessons are required");
  const allPrompts = [];
  for (const lesson of lessons) {
    const raw = section2Lessons.find((item) => item.lessonKey === lesson.lessonKey);
    check(JSON.stringify(lesson.summary) === JSON.stringify(raw.summary), `${lesson.lessonKey}: authored summary was lost`);
    const summaryBodies = lesson.summary.map(([, body]) => normalisePresentationText(body));
    check(new Set(summaryBodies).size === summaryBodies.length, `${lesson.lessonKey}: repeated summary bodies`);
    for (const question of [...lesson.practice, ...lesson.examStyleQuestions]) {
      const prompt = question.prompt ?? question.task;
      allPrompts.push(normalisePresentationText(prompt));
      check(!/draw lines to match|complete a trace table|put the six .* in order/i.test(prompt), `${question.id}: unsupported question format`);
      check(question.objectiveIds.every((id) => lesson.objectives.some(([candidate]) => id === candidate)), `${question.id}: objective belongs to another lesson`);
      const diagram = questionDiagrams[question.id];
      if (diagram) {
        check(question.diagram === `/assets/course-v3/section-2/${diagram[0]}`, `${question.id}: missing or incorrect question diagram`);
        check(question.diagramAlt && question.diagramLabel, `${question.id}: question diagram needs accessible text`);
        if (checkFiles) {
          const svg = readFileSync(join(root, "web", question.diagram), "utf8");
          assert.deepEqual([...svg.matchAll(/data-link="([^"]+)"/g)].map((match) => match[1]).sort(), diagram[1], `${question.id}: diagram links differ from the supplied network`);
        }
      }
    }
    for (const question of lesson.examStyleQuestions) {
      const required = [...new Set(question.objectiveIds.map((id) => id.replace(/\.A\d+$/, "")))].sort();
      const labelled = [...new Set(question.sourceRef.match(/S2\.\d{2}/g))].sort();
      assert.deepEqual(labelled, required, `${question.id}: source focus does not match final objectives`);
      check(question.sourceRef.startsWith("Cambridge 9618 syllabus 2.1") && !/9618\//.test(question.sourceRef), `${question.id}: original task has an unverified paper reference`);
      check(question.marks === question.markLogic.length, `${question.id}: marks differ from scoring points`);
      check(new Set(question.markLogic.map(normalisePresentationText)).size === question.markLogic.length, `${question.id}: duplicate scoring point`);
    }
    if (checkFiles) {
      const html = readFileSync(join(root, "web/course-v3", lesson.route, "index.html"), "utf8");
      check((html.match(/<details class="paper-marking-points">/g) ?? []).length === lesson.examStyleQuestions.length, `${lesson.lessonKey}: examination answers must start collapsed`);
      for (const [, body] of lesson.summary) check(html.includes(body.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;")), `${lesson.lessonKey}: summary body missing from HTML`);
      for (const unit of lesson.units) for (const material of unit.supportingMaterials ?? []) check(html.includes(material.title), `${lesson.lessonKey}: supporting comparison missing from HTML`);
      for (const question of [...lesson.practice, ...lesson.examStyleQuestions].filter((item) => questionDiagrams[item.id])) {
        const start = html.indexOf(`data-question-id="${question.id}"`);
        const answer = html.indexOf("<details", start);
        const stimulus = html.slice(start, answer);
        check(stimulus.includes(`<img src="../../${question.diagram.slice(1)}"`) && stimulus.includes("Open full-size diagram"), `${question.id}: diagram must appear before the collapsed answer with full-size access`);
      }
    }
  }
  check(new Set(allPrompts).size === allPrompts.length, "duplicate lesson question prompts");
  const models = lessons[0].units[1];
  check(unitMaterials(models).some((material) => material.type === "table" && material.rows.some((row) => row[0] === "Cost") && material.rows.some((row) => row[0] === "Availability")), "network-model comparison was dropped");
  check(models.workedExample?.steps.length >= 3, "model choice lacks a worked example");
  const modem = lessons[6].units.find((unit) => unit.objectiveIds.includes("S2.14.A01"));
  check(/modulat/i.test(modem.coreExplanation.join(" ")) && /demodulat/i.test(modem.coreExplanation.join(" ")) && /digital data.*analogue signal/i.test(modem.coreExplanation.join(" ")), "modem explanation omits digital/analogue conversion");
  const subnet = lessons[7].units.find((unit) => unit.objectiveIds.includes("S2.15.A04"));
  const subnetTeaching = JSON.stringify([subnet.coreExplanation, subnet.workedExample]);
  check(["/26", "11000000", "AND", "128", "192"].every((term) => subnetTeaching.includes(term)) && subnet.workedExample?.steps.length >= 4, "/26 task lacks a taught bitwise method");
  const subnetQuestion = lessons[7].practice.find((question) => question.id === "S2-L08-Q2");
  check(subnetQuestion?.objectiveIds.includes("S2.15.A04") && subnetQuestion.table?.type === "table", "subnet practice lacks the supplied binary table");
  assert.deepEqual(subnetQuestion.table.rows, [
    ["Host", "192.168.8.34", "34", "00100010"],
    ["Destination 1", "192.168.8.60", "60", "00111100"],
    ["Destination 2", "192.168.8.80", "80", "01010000"],
    ["Subnet mask /26", "255.255.255.192", "192", "11000000"],
  ], "S2 supplied subnet data must retain the original addresses, mask and binary values");
  for (const row of subnetQuestion.table.rows) check(Number(row[1].split(".").at(-1)).toString(2).padStart(8, "0") === row[3], "subnet binary octet differs from its address");
  if (checkFiles) {
    const html = readFileSync(join(root, "web/course-v3", lessons[7].route, "index.html"), "utf8");
    const start = html.indexOf(`data-question-id="${subnetQuestion.id}"`);
    const stimulus = html.slice(start, html.indexOf("<details", start));
    check(stimulus.includes("<table>") && subnetQuestion.table.rows.every((row) => row.every((value) => stimulus.includes(value))), "subnet data table must be visible before the collapsed answer");
  }
  const ethernet = lessons[4].units.find((unit) => unit.objectiveIds.includes("S2.11.A01"));
  check(!/each station waits a different random period/i.test(JSON.stringify(ethernet)), "random backoff incorrectly guarantees different waits");
  check(/may be equal/.test(ethernet.coreExplanation.join(" ")), "backoff explanation must allow equal waits");
  const cableQuestion = lessons[4].practice.find((question) => question.id === "S2-L05-Q1");
  check(/\bcable\b/i.test(cableQuestion.prompt) && cableQuestion.answerPoints.some((point) => /cable.*(?:signal|electrical|optical)/i.test(point)), "cable objective lacks a question and scoring evidence");
  const bufferQuestion = lessons[5].examStyleQuestions.find((question) => question.id === "S2-L06-EXAM-2");
  check(bufferQuestion.marks === 3 && bufferQuestion.markLogic.some((point) => /30 seconds/.test(point)) && !bufferQuestion.markLogic.some((point) => /must pause|lower its/i.test(point)), "buffer calculation awards duplicate or unasked marks");
  const cloudQuestion = lessons[2].examStyleQuestions.find((question) => question.id === "S2-L03-EXAM-3");
  check(cloudQuestion.marks === 4 && !cloudQuestion.markLogic.some((point) => /order processing may stop|users cannot reach/i.test(point)), "cloud measures are scored as outage consequences");
  const gallery = lessons[1].units[0].leadVisual;
  check(gallery.type === "topology-gallery" && gallery.entries[3][1] === "topology-star-mesh.svg", "hybrid must identify two distinct constituent patterns");
  if (checkFiles) {
    const svg = readFileSync(join(root, "web/assets/course-v3/section-2/topology-star-mesh.svg"), "utf8");
    const links = [...svg.matchAll(/data-link="([^"]+)"/g)].map((match) => match[1]).sort();
    assert.deepEqual(links, ["A-S1", "B-S1", "C-S2", "D-S2", "S1-S2", "S1-S3", "S2-S3"], "hybrid diagram must contain the host stars and all three mesh links");
    const bank = JSON.parse(readFileSync(join(root, "scripts/assessment-bank-contract.json"), "utf8"));
    const set = bank.sets.find((item) => item.id === "SECTION-2-CHECK");
    check(set.questions.reduce((sum, question) => sum + question.marks, 0) === 20, "chapter check must total 20 marks");
    for (const question of set.questions) {
      check(classifyCommand(question.prompt, question.objectiveIds[0].replace(/\.A\d+$/, "")).word === question.commandWord, `${question.id}: command word does not match the task`);
      check(!/syllabus ideas|plausible student error|different stated context|two alternatives from Section/i.test(question.prompt), `${question.id}: unfinished chapter-check template`);
      check(question.answerPoints?.length === question.marks, `${question.id}: missing distinct scoring points`);
      check(/\(a\).+\[\d\].*\(b\)/i.test(question.prompt), `${question.id}: missing parts and mark allocation`);
    }
    const assessed = set.questions.flatMap((question) => question.objectiveIds);
    for (const prefix of ["S2.01", "S2.06", "S2.12", "S2.14", "S2.15", "S2.16"]) check(assessed.some((id) => id.startsWith(prefix)), `chapter check omits ${prefix}`);
  }
  return true;
}

export function section2PresentationSelfTest(lessons) {
  const mutations = [
    ["missing practice diagram", (copy) => { delete copy[1].practice[1].diagram; }],
    ["missing exam diagram", (copy) => { delete copy[1].examStyleQuestions[2].diagram; }],
    ["wrong exam network", (copy) => { copy[1].examStyleQuestions[2].diagram = copy[1].practice[1].diagram; }],
    ["missing wireless network", (copy) => { delete copy[4].practice[1].diagram; }],
    ["missing PSTN network", (copy) => { delete copy[6].practice[1].diagram; }],
    ["missing subnet table", (copy) => { delete copy[7].practice[1].table; }],
    ["wrong binary octet", (copy) => { copy[7].practice[1].table.rows[2][3] = "00111100"; }],
    ["summary lost", (copy) => { copy[7].summary[4][1] = copy[7].summary[0][1]; }],
    ["missing table", (copy) => { copy[6].practice[1].prompt = "Complete a trace table for a request."; }],
    ["wrong source focus", (copy) => { copy[4].examStyleQuestions[1].sourceRef = "Cambridge 9618 syllabus 2.1 · S2.10 (course mapping)"; }],
    ["comparison dropped", (copy) => { copy[0].units[1].supportingMaterials = []; }],
    ["subnet step missing", (copy) => { copy[7].units[1].workedExample = null; }],
    ["guaranteed waits", (copy) => { copy[4].units.at(-1).coreExplanation.push("Each station waits a different random period."); }],
    ["cable unassessed", (copy) => { copy[4].practice[0].prompt = "Describe a switch."; }],
    ["buffer unasked mark", (copy) => { copy[5].examStyleQuestions[1].markLogic[2] = "The player must pause."; }],
  ];
  for (const [name, mutate] of mutations) {
    const copy = structuredClone(lessons);
    mutate(copy);
    assert.throws(() => validateSection2Presentation(copy), undefined, `S2 negative regression was accepted: ${name}`);
  }
  console.log(`S2 active-presentation self-test: ${mutations.length} negative mutations rejected.`);
}
