import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { courseV3Lessons } from "./course-v3-content.mjs";
import { validateSection2Presentation, section2PresentationSelfTest } from "./course-v3-section2-checks.mjs";
import { section2Lessons, section2Meta } from "./course-v3-section2-content.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const imageManifest = JSON.parse(readFileSync(join(root, "scripts", "course-v3-section2-imagegen-assets.json"), "utf8"));
const expectedRequirements = Array.from({ length: 16 }, (_, index) => `S2.${String(index + 1).padStart(2, "0")}`);
const allowedMaterialTypes = new Set(["analogy", "table", "cards", "flow", "topology-gallery", "reservoir", "address-demo", "url-demo", "worked-example"]);

const fail = (condition, message) => { if (!condition) throw new Error(message); };
const sha256 = (path) => createHash("sha256").update(readFileSync(path)).digest("hex");

function pngDimensions(path) {
  const buffer = readFileSync(path);
  if (path.endsWith("topology-star-mesh.svg")) {
    const dimensions = /<svg\b[^>]*\bwidth="(\d+)"[^>]*\bheight="(\d+)"/.exec(buffer.toString("utf8"));
    fail(dimensions, `${path}: missing SVG dimensions`);
    return { width: Number(dimensions[1]), height: Number(dimensions[2]) };
  }
  fail(buffer.subarray(1, 4).toString("ascii") === "PNG", `${path}: not a PNG asset`);
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

function materialAssets(material) {
  if (material.asset) return [material.asset];
  if (material.type === "topology-gallery") return material.entries.map((entry) => entry[1]);
  return [];
}

export function validateSection2(lessons, options = {}) {
  const { checkFiles = true } = options;
  fail(lessons.length === 8, `Expected 8 lessons, found ${lessons.length}`);
  fail(new Set(lessons.map((lesson) => lesson.lessonKey)).size === 8, "Lesson keys must be unique");
  fail(lessons.every((lesson, index) => lesson.sequenceIndex === index + 1), "Lesson sequenceIndex must be contiguous and ordered");
  const requirementOrder = lessons.flatMap((lesson) => lesson.syllabusIds);
  assert.deepEqual(requirementOrder, expectedRequirements, "S2 requirements must appear exactly once in official order");
  assert.deepEqual(section2Meta.requirementOrder, expectedRequirements, "Section metadata requirement order is incorrect");

  const transmissionLesson = lessons.find((lesson) => lesson.lessonKey === "S2-L04");
  fail(transmissionLesson, "S2-L04 transmission-media lesson is missing");
  const microwaveUnit = transmissionLesson?.units.find((unit) => /microwave/i.test(unit.heading) && unit.objectiveIds.includes("S2.08.A04"));
  const satelliteUnit = transmissionLesson?.units.find((unit) => /satellite/i.test(unit.heading) && unit.objectiveIds.includes("S2.08.A05"));
  fail(microwaveUnit, "S2-L04 needs a dedicated microwaves knowledge unit");
  fail(satelliteUnit, "S2-L04 needs a dedicated satellite knowledge unit");
  const microwaveExplanation = microwaveUnit?.explanation.join(" ").toLowerCase() ?? "";
  for (const term of ["directional", "line of sight", "aligned", "point-to-point"]) {
    fail(microwaveExplanation.includes(term), `S2-L04 microwave explanation missing ${term}`);
  }
  const satelliteExplanation = satelliteUnit?.explanation.join(" ").toLowerCase() ?? "";
  for (const term of ["uplink", "downlink", "cover", "time delay", "weather"]) {
    fail(satelliteExplanation.includes(term), `S2-L04 satellite explanation missing ${term}`);
  }
  const microwaveDiagram = microwaveUnit?.materials.find((material) => material.type === "analogy" && material.asset === "microwaves-diagram.png");
  const satelliteDiagram = satelliteUnit?.materials.find((material) => material.type === "analogy" && material.asset === "satellites-diagram.png");
  fail(microwaveDiagram, "S2-L04 microwaves explanation needs its reviewed ImageGen diagram");
  fail(satelliteDiagram, "S2-L04 satellites explanation needs its reviewed ImageGen diagram");
  fail(microwaveDiagram?.boundaryLabel === "Diagram note", "S2-L04 microwaves material must be presented as a diagram");
  fail(satelliteDiagram?.boundaryLabel === "Diagram note", "S2-L04 satellites material must be presented as a diagram");
  fail(!microwaveUnit?.materials.some((material) => material.type === "table"), "S2-L04 microwaves explanation must not use a table");
  fail(!satelliteUnit?.materials.some((material) => material.type === "table"), "S2-L04 satellites explanation must not use a table");
  const transmissionCoverageQuestion = transmissionLesson?.practice.find((question) => question.id === "S2-L04-Q1");
  fail(transmissionCoverageQuestion?.marks === 10 && transmissionCoverageQuestion.answerPoints.length === 10, "S2-L04-Q1 must assess all five media with ten supported marking points");

  const assetRecords = new Map(imageManifest.accepted.map((record) => [record.workspacePath.split("/").at(-1), record]));
  const pilotAssets = new Set(imageManifest.approvedPilotAssets.map((path) => path.split("/").at(-1)));

  for (const lesson of lessons) {
    fail(lesson.guidingQuestion?.endsWith("?"), `${lesson.lessonKey}: missing guiding question`);
    fail(lesson.diagnostic?.prompt && lesson.diagnostic?.answer, `${lesson.lessonKey}: missing diagnostic`);
    fail(lesson.units.length > 0, `${lesson.lessonKey}: no knowledge units`);
    fail(lesson.practice.length >= 3, `${lesson.lessonKey}: needs retrieval, application and exam-style practice`);
    const practiceTypes = new Set(lesson.practice.map((question) => question.type));
    for (const type of ["Retrieval", "Application", "Exam-style"]) fail(practiceTypes.has(type), `${lesson.lessonKey}: missing ${type} practice`);
    fail(lesson.pastPaper?.sourceRef && lesson.pastPaper?.task && lesson.pastPaper?.build?.length, `${lesson.lessonKey}: incomplete past-paper analysis`);
    fail(lesson.pastPaper.accessUrl.includes("cambridgeinternational.org"), `${lesson.lessonKey}: past-paper link is not official`);
    fail(lesson.summary?.length >= 3, `${lesson.lessonKey}: summary is not lesson-specific`);

    const objectiveIds = lesson.objectives.map(([id]) => id);
    fail(new Set(objectiveIds).size === objectiveIds.length, `${lesson.lessonKey}: duplicate objectives`);
    for (const id of objectiveIds) {
      const explanationUnits = lesson.units.filter((unit) => unit.objectiveIds.includes(id));
      const materials = lesson.units.flatMap((unit) => unit.materials.filter((material) => material.objectiveIds.includes(id)));
      const questions = lesson.practice.filter((question) => question.objectiveIds.includes(id));
      fail(explanationUnits.length > 0, `${lesson.lessonKey}/${id}: no default-visible explanation`);
      fail(materials.length > 0, `${lesson.lessonKey}/${id}: no teaching material`);
      fail(questions.length > 0, `${lesson.lessonKey}/${id}: no mapped practice`);
    }

    for (const unit of lesson.units) {
      fail(unit.explanation.length >= 1, `${lesson.lessonKey}/${unit.heading}: empty explanation`);
      fail(unit.materials.length >= 1, `${lesson.lessonKey}/${unit.heading}: no material`);
      fail(unit.misconceptions.length >= 1, `${lesson.lessonKey}/${unit.heading}: no misconception`);
      fail(unit.teacherNote, `${lesson.lessonKey}/${unit.heading}: no teacher note`);
      for (const material of unit.materials) {
        fail(allowedMaterialTypes.has(material.type), `${lesson.lessonKey}: unsupported material ${material.type}`);
        fail(material.objectiveIds.length > 0, `${lesson.lessonKey}/${material.title}: material has no objective mapping`);
        if (material.type === "table") fail(material.headers.length >= 3 && material.rows.length >= 2, `${lesson.lessonKey}/${material.title}: comparison table is incomplete`);
        if (material.type === "flow") fail(material.steps.length >= 3, `${lesson.lessonKey}/${material.title}: process needs at least three steps`);
        if (material.type === "analogy") {
          fail(material.alt && material.caption && material.boundary, `${lesson.lessonKey}/${material.title}: analogy lacks alt/caption/boundary`);
          fail(assetRecords.has(material.asset), `${lesson.lessonKey}/${material.title}: ImageGen asset is not in the reviewed manifest`);
        }
        if (material.type === "topology-gallery") {
          fail(material.entries.length === 4, `${lesson.lessonKey}: topology gallery must contain bus, star, mesh and hybrid`);
          for (const entry of material.entries) fail(entry[3].length === 3, `${lesson.lessonKey}/${entry[0]}: path must have exactly three explicit stages`);
        }
        for (const asset of materialAssets(material)) {
          const path = join(root, "web", "assets", "course-v3", "section-2", asset);
          if (checkFiles) {
            fail(existsSync(path), `${lesson.lessonKey}: missing asset ${asset}`);
            const { width, height } = pngDimensions(path);
            fail(width >= 1200 && height >= 700, `${asset}: insufficient resolution ${width}x${height}`);
          }
          fail(asset === "topology-star-mesh.svg" || assetRecords.has(asset) || pilotAssets.has(asset), `${asset}: asset is neither reviewed ImageGen output nor approved pilot material`);
        }
      }
    }

    for (const question of lesson.practice) {
      fail(question.objectiveIds.every((id) => objectiveIds.includes(id)), `${question.id}: maps outside its lesson`);
      fail(question.answerPoints.length >= question.marks || question.type === "Retrieval", `${question.id}: marking points do not support the stated marks`);
      fail(question.commonError, `${question.id}: no common error`);
    }

    if (checkFiles) {
      const activeRoute = `lesson-${String(lesson.sequenceIndex + 6).padStart(3, "0")}`;
      const route = join(root, "web", "course-v3", activeRoute, "index.html");
      fail(existsSync(route), `${lesson.lessonKey}: active route was not rendered`);
      const html = readFileSync(route, "utf8");
      const positions = ["1-visual-and-core", "2-practice", "3-original-exam-style-question", "4-summary"].map((stage) => html.indexOf(`data-stage="${stage}"`));
      fail(positions.every((position) => position >= 0), `${lesson.lessonKey}: one or more teaching stages are missing`);
      fail(positions.every((position, index) => index === 0 || position > positions[index - 1]), `${lesson.lessonKey}: teaching-stage order is wrong`);
      fail(html.includes("original exam-style tasks"), `${lesson.lessonKey}: original-task notice missing`);
      const legacyPath = join(root, "web", "course-v3", "section-2", `unit-${String(lesson.sequenceIndex).padStart(2, "0")}`, "index.html");
      const legacy = readFileSync(legacyPath, "utf8");
      fail(legacy.includes(`rel="canonical" href="../../${activeRoute}/"`) && legacy.includes('http-equiv="refresh"'), `${lesson.lessonKey}: old S2 link must resolve to the active lesson`);
      fail(!legacy.includes('class="knowledge-unit"'), `${lesson.lessonKey}: old S2 link exposes a second teaching source`);
      for (const id of objectiveIds) fail(html.includes(`data-objective-id=\"${id}\"`) && html.includes(`data-objectives=\"`) && html.includes(id), `${lesson.lessonKey}/${id}: rendered mapping missing`);
    }
  }

  if (checkFiles) {
    for (const record of imageManifest.accepted) {
      const path = join(root, record.workspacePath);
      fail(existsSync(path), `${record.id}: final asset missing`);
      fail(sha256(path) === record.sha256, `${record.id}: final asset hash does not match reviewed image`);
      fail(Object.values(record.review).every(Boolean), `${record.id}: review checklist is incomplete`);
      fail(/academic|textbook|editorial/i.test(record.prompt), `${record.id}: final prompt lacks academic style direction`);
      fail(/No .*clay|No literal cloud|No words/i.test(record.prompt), `${record.id}: final prompt lacks an explicit anti-childlike/text constraint`);
    }
    const css = readFileSync(join(root, "web", "course-v3", "section-2", "course.css"), "utf8");
    fail(css.includes("@media (max-width: 520px)"), "390px/mobile breakpoint missing");
    fail(css.includes(".swipe-cue { display: block;"), "Mobile table discoverability cue missing");
  }
  return true;
}

function selfTest() {
  const scenarios = [
    ["missing lesson", (copy) => copy.pop(), /Expected 8 lessons/],
    ["wrong syllabus order", (copy) => { [copy[0].syllabusIds[0], copy[0].syllabusIds[1]] = [copy[0].syllabusIds[1], copy[0].syllabusIds[0]]; }, /official order/],
    ["missing explanation mapping", (copy) => { const id = copy[0].objectives[0][0]; copy[0].units.forEach((unit) => { unit.objectiveIds = unit.objectiveIds.filter((value) => value !== id); }); }, /no default-visible explanation/],
    ["missing material mapping", (copy) => { const id = copy[0].objectives[0][0]; copy[0].units.forEach((unit) => unit.materials.forEach((material) => { material.objectiveIds = material.objectiveIds.filter((value) => value !== id); })); }, /no teaching material/],
    ["missing practice mapping", (copy) => { const id = copy[0].objectives[0][0]; copy[0].practice.forEach((question) => { question.objectiveIds = question.objectiveIds.filter((value) => value !== id); }); }, /no mapped practice/],
    ["missing past-paper analysis", (copy) => { copy[0].pastPaper.task = ""; }, /incomplete past-paper/],
    ["flow collapsed", (copy) => { const flow = copy.flatMap((lesson) => lesson.units.flatMap((unit) => unit.materials)).find((material) => material.type === "flow"); flow.steps = flow.steps.slice(0, 2); }, /at least three steps/],
    ["topology path corruption", (copy) => { const gallery = copy[1].units[0].materials[0]; gallery.entries[1][3] = ["Source directly crosses central device to destination"]; }, /exactly three explicit stages/],
    ["microwave detail removed", (copy) => { const unit = copy.find((lesson) => lesson.lessonKey === "S2-L04").units.find((item) => /microwave/i.test(item.heading)); unit.explanation = ["Microwave is wireless."]; }, /microwave explanation missing directional/],
    ["satellite detail removed", (copy) => { const unit = copy.find((lesson) => lesson.lessonKey === "S2-L04").units.find((item) => /satellite/i.test(item.heading)); unit.explanation = ["Satellite uses radio waves."]; }, /satellite explanation missing uplink/],
    ["microwave diagram replaced", (copy) => { const unit = copy.find((lesson) => lesson.lessonKey === "S2-L04").units.find((item) => /microwave/i.test(item.heading)); unit.materials[0].asset = "transmission-media-analogy.png"; }, /microwaves explanation needs its reviewed ImageGen diagram/],
    ["satellite diagram replaced", (copy) => { const unit = copy.find((lesson) => lesson.lessonKey === "S2-L04").units.find((item) => /satellite/i.test(item.heading)); unit.materials[0].asset = "transmission-media-analogy.png"; }, /satellites explanation needs its reviewed ImageGen diagram/],
  ];
  for (const [name, mutate, expected] of scenarios) {
    const copy = structuredClone(section2Lessons);
    mutate(copy);
    assert.throws(() => validateSection2(copy, { checkFiles: false }), expected, `${name} mutation was not rejected`);
  }
  console.log(`Self-test: ${scenarios.length} negative mutations rejected.`);
}

validateSection2(section2Lessons);
console.log(`Section 2 verified: 8 lessons, 16 requirements, ${section2Lessons.flatMap((lesson) => lesson.objectives).length} atomic objectives.`);
if (process.argv.includes("--self-test")) selfTest();

const activeSection2 = courseV3Lessons.filter((lesson) => lesson.section === 2);
validateSection2Presentation(activeSection2, { checkFiles: true });
if (process.argv.includes("--self-test")) section2PresentationSelfTest(activeSection2);
