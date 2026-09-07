import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { courseV3Lessons } from "./course-v3-content.mjs";
import { validateSection7Presentation, validateSection7Html } from "./course-v3-section7-checks.mjs";

const bank = JSON.parse(readFileSync(new URL("./assessment-bank-contract.json", import.meta.url), "utf8"));
const readHtml = (lesson) => readFileSync(new URL(`../web/course-v3/${lesson.route}/index.html`, import.meta.url), "utf8");
const errors = [...validateSection7Presentation(courseV3Lessons, bank), ...validateSection7Html(courseV3Lessons, readHtml)];
if (errors.length) throw new Error(errors.join("\n"));
const imageManifest = JSON.parse(readFileSync(new URL("./course-v3-section7-imagegen-assets.json", import.meta.url), "utf8"));
const diagrams = courseV3Lessons.filter((l) => l.section === 7).flatMap((l) => l.units).filter((u) => u.leadVisual.type === "reviewed-visual");
if (imageManifest.tool !== "image_gen.imagegen" || imageManifest.entries.length !== 8 || diagrams.length !== 8) throw new Error("S7 needs eight recorded ImageGen diagrams");
for (const entry of imageManifest.entries) {
  const owner = diagrams.find((u) => u.unitKey === entry.unitKey);
  if (!owner || owner.leadVisual.asset !== `/assets/course-v3/section-7/${entry.file}` || !entry.prompt?.length) throw new Error(`S7 diagram provenance or placement missing: ${entry.file}`);
  const bytes = readFileSync(new URL(`../web/assets/course-v3/section-7/${entry.file}`, import.meta.url));
  if (createHash("sha256").update(bytes).digest("hex") !== entry.sha256 || bytes.subarray(1, 4).toString("ascii") !== "PNG" || bytes.readUInt32BE(16) < 1024) throw new Error(`S7 diagram file changed or is undersized: ${entry.file}`);
}

if (process.argv.includes("--self-test")) {
  const lesson = (ls, n) => ls.find((l) => l.lessonKey === `S7-L0${n}`);
  const mutations = [
    ["cross-unit copied paragraph", (ls) => { lesson(ls, 2).units[0].coreExplanation[0] = lesson(ls, 1).units[0].coreExplanation[0]; }],
    ["diagram assigned to a different topic", (ls) => { lesson(ls, 1).units[0].leadVisual.asset = "/assets/course-v3/section-7/ai-fairness.png"; }],
    ["missing diagram text equivalent", (ls) => { lesson(ls, 3).units[0].leadVisual.facts = []; }],
    ["diagram removed detailed AI application comparison", (ls) => { lesson(ls, 4).units[1].supportingMaterials = []; }],
    ["AI definition only in the answer", (ls) => { lesson(ls, 4).units[0].coreExplanation[0] = "AI is useful in many settings. Consider its advantages and disadvantages."; }],
    ["shareware definition removed", (ls) => { lesson(ls, 3).units[3].coreExplanation[0] = "Shareware is one of the licensing examples. Select it where appropriate."; }],
    ["commercial conflated with proprietary", (ls) => { lesson(ls, 3).units[4].coreExplanation[0] = "All commercial software is proprietary and can never be open source."; }],
    ["stakeholder comparison changed to causal diagram", (ls) => { lesson(ls, 2).units[0].leadVisual = { type: "flow", steps: [["Input", "Stakeholder"], ["Mechanism", "Benefit"], ["Result", "Harm"]], objectiveIds: ["S7.03.A01"] }; }],
    ["organisation identification given ethics-purpose tag", (ls) => { lesson(ls, 1).practice[3].objectiveIds = ["S7.01.A01"]; }],
    ["professional ethics scored as facial recognition", (ls) => { lesson(ls, 1).examStyleQuestions[0].markLogic = ["Identify AI biometric matching", "Explain effects on employees", "Explain an environmental benefit"]; }],
    ["ethical consequences scored as body membership", (ls) => { lesson(ls, 2).examStyleQuestions[1].markLogic = ["British Computer Society", "Professional development", "IEEE", "Codes of conduct"]; }],
    ["licence question scored with category names", (ls) => { lesson(ls, 3).examStyleQuestions[2].markLogic = ["FSF", "OSI", "Shareware", "Commercial software"]; }],
    ["AI application given maintenance answer", (ls) => { lesson(ls, 4).examStyleQuestions[0].markLogic = ["Reduce downtime", "Reduce repair cost", "Save money", "Improve maintenance"]; }],
    ["practice answer recycled with added distinction", (ls) => { const l = lesson(ls, 3); l.examStyleQuestions[0].markLogic = [...l.practice[0].answerPoints, "One further distinction."]; l.examStyleQuestions[0].marks = 3; }],
    ["unrelated past-paper attribution", (ls) => { lesson(ls, 1).examStyleQuestions[0].sourceRef = "9618/13/W/24 Q5(b)"; }],
    ["missing worked licence alternatives", (ls) => { lesson(ls, 3).units[5].workedExample.steps.splice(1, 1); }],
    ["missing formative check", (ls) => { delete lesson(ls, 4).units[2].checkpoint; }],
    ["truncated review", (ls) => { ls.find((l) => l.lessonKey === "REV-P1").units.find((u) => u.unitKey === "S7-REVIEW").coreExplanation[0] = "Explain the impact for a…"; }],
    ["lost review practice coverage", (ls) => { const l = ls.find((l) => l.lessonKey === "REV-P1"); l.practice = l.practice.filter((q) => q.id !== "REV-P1-S7-Q4"); }],
    ["assessment without supplied alternatives", (_, b) => { b.sets.find((s) => s.id === "SECTION-7-CHECK").questions[2].prompt = "Compare two alternatives from Section 7 in a fresh context."; }],
    ["assessment lacking usable scoring", (_, b) => { b.sets.find((s) => s.id === "SECTION-7-CHECK").questions[0].answerPoints = []; }],
    ["incorrect mock subpart allocation", (_, b) => { b.sets.find((s) => s.id === "PAPER-1-MOCK").questions.find((q) => q.id === "A-P1-7").answerPoints[3] = "(a) A fourth ethics point."; }],
  ];
  for (const [name, mutate] of mutations) {
    const ls = structuredClone(courseV3Lessons), assessment = structuredClone(bank);
    mutate(ls, assessment);
    if (!validateSection7Presentation(ls, assessment).length) throw new Error(`S7 negative mutation not detected: ${name}`);
  }
  const htmlMutations = [
    ["visible exam answers", (html) => html.replaceAll('<details class="paper-marking-points">', '<details class="paper-marking-points" open>')],
    ["broken knowledge-unit anchor", (html) => html.replace('id="unit-1"', 'id="lost-unit-1"')],
    ["missing rendered checkpoint", (html) => html.replace('class="unit-checkpoint"', 'class="lost-checkpoint"')],
    ["missing full-size diagram access", (html) => html.replaceAll('target="_blank"', 'target="_self"')],
  ];
  for (const [name, mutate] of htmlMutations) if (!validateSection7Html(courseV3Lessons, (l) => mutate(readHtml(l))).length) throw new Error(`S7 HTML mutation not detected: ${name}`);
  console.log(`S7 self-test: ${mutations.length + htmlMutations.length} negative mutations rejected.`);
}
console.log("S7 verified: 4 lessons, 18 knowledge units, 19 objectives, 26 practice questions, 12 independent exam tasks, 4 review tasks; section check 20 marks and Paper 1 mock 75 marks.");
