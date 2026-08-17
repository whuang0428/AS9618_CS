import fs from "node:fs";
import path from "node:path";
import { read, root } from "./stage6-qa-utils.mjs";

function expect(condition, message) {
  if (!condition) throw new Error(message);
}

const register = read("audits/student-visual-explanation-register.csv").trim().split("\n");
expect(register.shift() === "lesson,topic,priority,method,learning_goal,required_facts,status", "Visual register header is invalid");
expect(register.length >= 20, "Visual register must contain at least 20 prioritised knowledge points");

const rows = register.map((line) => {
  const cells = line.split(",");
  expect(cells.length === 7, `Visual register row is invalid: ${line}`);
  return cells;
});
expect(new Set(rows.map(([lesson]) => lesson)).size === rows.length, "Visual register contains duplicate lesson rows");
expect(rows.filter((row) => row[2] === "High").length >= 15, "Visual register must identify at least 15 high-priority lessons");

for (const lesson of ["017", "031", "034"]) {
  const pilot = rows.find(([candidate]) => candidate === lesson);
  expect(pilot, `Lesson ${lesson} is missing from the visual register`);
  expect(pilot[3].includes("ImageGen") && ["Pilot", "Approved"].includes(pilot[6]), `Lesson ${lesson} pilot metadata is invalid`);
}

const codeNativeVisuals = [
  { lesson: "018", id: "packet-journey", nav: "Packet journey", check: "why can packet 2 arrive after packet 3?" },
  { lesson: "020", id: "address-journey", nav: "Address journey", check: "does DNS turn the whole URL into a MAC address?" },
  { lesson: "035", id: "gate-visual", nav: "Gate map", check: "what two visual clues separate NOR from XOR?" },
  { lesson: "041", id: "cpu-map", nav: "CPU map", check: "is main memory a register inside the CPU?" },
  { lesson: "042", id: "cycle-visual", nav: "Cycle trace", check: "why is the instruction copied to the CIR before decoding?" },
];

for (const visual of codeNativeVisuals) {
  const row = rows.find(([lesson]) => lesson === visual.lesson);
  expect(row, `Lesson ${visual.lesson} is missing from the visual register`);
  expect(!row[3].includes("ImageGen") && row[6] === "Approved", `Lesson ${visual.lesson} code-native visual metadata is invalid`);

  const visualHtml = read(`web/lesson-${visual.lesson}/index.html`);
  expect(visualHtml.includes('../student-visuals.css?v=1'), `Lesson ${visual.lesson} shared visual stylesheet is missing`);
  expect(visualHtml.includes(`href="#${visual.id}">${visual.nav}</a>`), `Lesson ${visual.lesson} visual navigation link is missing`);
  expect(visualHtml.includes(`class="panel visual-explainer" id="${visual.id}"`), `Lesson ${visual.lesson} visual section is missing`);
  expect(/<svg\s+(?=[^>]*class="concept-svg")(?=[^>]*role="img")(?=[^>]*aria-labelledby="[^"]+")[^>]*>/m.test(visualHtml),
    `Lesson ${visual.lesson} visual must be an accessible SVG`);
  expect(visualHtml.includes("<title id=") && visualHtml.includes("<desc id="), `Lesson ${visual.lesson} SVG title or description is missing`);
  expect(visualHtml.includes('class="visual-steps"'), `Lesson ${visual.lesson} mobile reading sequence is missing`);
  expect(visualHtml.includes('class="diagram-check"') && visualHtml.includes(visual.check), `Lesson ${visual.lesson} diagram reading check is missing`);
}

const sharedVisualCss = read("web/student-visuals.css");
for (const marker of [".visual-explainer", "scroll-margin-top: 112px", ".concept-figure", ".concept-svg", ".visual-steps", ".diagram-check", "@media (max-width: 640px)"]) {
  expect(sharedVisualCss.includes(marker), `Shared student visual CSS marker is missing: ${marker}`);
}

const html = read("web/lesson-017/index.html");
const css = read("web/lesson-017/styles.css");
const imageReference = "../assets/diagrams/lesson-017-peer-devices.jpg";
expect(html.includes(`src="${imageReference}"`), "Lesson 017 image reference is missing");
expect(/<img\s+(?=[^>]*loading="lazy")(?=[^>]*decoding="async")(?=[^>]*width="1672")(?=[^>]*height="941")(?=[^>]*alt="[^"]+")[^>]*>/m.test(html),
  "Lesson 017 visual must reserve dimensions and provide meaningful alternative text");
expect(html.includes('id="model-visual"'), "Lesson 017 visual explanation section is missing");
expect(html.includes('class="client-server-diagram"') && html.includes('role="img"'), "Deterministic client-server diagram is missing");
expect(html.includes("why is peer-to-peer not the same as mesh?"), "Lesson 017 diagram reading check is missing");

for (const marker of [".network-visual-grid", ".peer-visual", ".client-server-diagram", "aspect-ratio: 1672 / 941"]) {
  expect(css.includes(marker), `Lesson 017 visual CSS marker is missing: ${marker}`);
}

const asset = path.join(root, "web/assets/diagrams/lesson-017-peer-devices.jpg");
expect(fs.existsSync(asset), "Lesson 017 generated image asset is missing");
expect(fs.statSync(asset).size <= 350 * 1024, "Lesson 017 generated image exceeds the 350 KB page budget");

for (const pilot of [
  {
    lesson: "031",
    asset: "web/assets/diagrams/lesson-031-storage-media.jpg",
    reference: "../assets/diagrams/lesson-031-storage-media.jpg",
    htmlMarkers: ['id="storage-visual"', 'class="storage-label-strip"', "why is an SSD often suitable for a laptop?"],
    cssMarkers: [".storage-visual", ".mechanism-grid", "aspect-ratio: 1672 / 941"],
  },
  {
    lesson: "034",
    asset: "web/assets/diagrams/lesson-034-greenhouse-control.jpg",
    reference: "../assets/diagrams/lesson-034-greenhouse-control.jpg",
    htmlMarkers: ['class="control-visual"', 'class="feedback-link"', "why does the sensor not cool the greenhouse?"],
    cssMarkers: [".control-scene", ".control-sequence", "aspect-ratio: 1672 / 941"],
  },
]) {
  const pilotHtml = read(`web/lesson-${pilot.lesson}/index.html`);
  const pilotCss = read(`web/lesson-${pilot.lesson}/styles.css`);
  expect(pilotHtml.includes(`src="${pilot.reference}"`), `Lesson ${pilot.lesson} image reference is missing`);
  expect(/<img\s+(?=[^>]*loading="lazy")(?=[^>]*decoding="async")(?=[^>]*width="1672")(?=[^>]*height="941")(?=[^>]*alt="[^"]+")[^>]*>/m.test(pilotHtml),
    `Lesson ${pilot.lesson} visual must reserve dimensions and provide meaningful alternative text`);
  for (const marker of pilot.htmlMarkers) expect(pilotHtml.includes(marker), `Lesson ${pilot.lesson} HTML marker is missing: ${marker}`);
  for (const marker of pilot.cssMarkers) expect(pilotCss.includes(marker), `Lesson ${pilot.lesson} CSS marker is missing: ${marker}`);
  const pilotAsset = path.join(root, pilot.asset);
  expect(fs.existsSync(pilotAsset), `Lesson ${pilot.lesson} generated image asset is missing`);
  expect(fs.statSync(pilotAsset).size <= 350 * 1024, `Lesson ${pilot.lesson} generated image exceeds the 350 KB page budget`);
}

const comprehensiveRegister = read("audits/stage10-concept-visual-register.csv").trim().split("\n");
expect(
  comprehensiveRegister.shift() === "lesson,visual_id,section_id,method,topic,required_facts,source,status,content_hash",
  "Stage 10 comprehensive visual register header is invalid",
);
expect(comprehensiveRegister.length >= rows.length, "Stage 10 visual register must not be smaller than the original priority register");
expect(comprehensiveRegister.some((line) => line.startsWith("016,") && line.includes(",PilotReview,")), "Lesson 016 corrected topology SVGs are missing from Stage 10 visual review");
expect(!comprehensiveRegister.some((line) => /,,(?:[^,]*,){3}$/.test(line)), "Stage 10 visual register contains an incomplete record");

console.log(`Educational visual verification passed: ${rows.length} prioritised concepts, ${comprehensiveRegister.length} comprehensive visual records, three ImageGen pilots and five code-native diagrams are present.`);
