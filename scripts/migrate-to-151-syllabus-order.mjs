import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = path.resolve(import.meta.dirname, "..");
const baseline = "aba418d^";
const pad = (value) => String(value).padStart(3, "0");
const excludedRoots = new Set([".git", "参考书籍"]);
const excludedFiles = new Set(["handover.md", "scripts/migrate-to-151-syllabus-order.mjs"]);

if (fs.existsSync(path.join(root, "web", "lesson-151"))) {
  throw new Error("Migration already applied: web/lesson-151 exists");
}

for (const relative of [
  "scripts/remediation-v2-stage3-sequence-plan.mjs",
  "scripts/syllabus-coverage-contract.json",
  "scripts/curriculum-sequence-model.mjs",
  "scripts/test-remediation-v2-stage1-mutations.mjs",
  "scripts/test-remediation-v2-stage3-mutations.mjs",
]) {
  const source = execFileSync("git", ["show", `${baseline}:${relative}`], { cwd: root });
  fs.writeFileSync(path.join(root, relative), source);
}

function shiftText(source) {
  let output = source;
  for (let lesson = 150; lesson >= 10; lesson -= 1) {
    const from = pad(lesson);
    const to = pad(lesson + 1);
    output = output
      .replaceAll(`lesson-${from}`, `lesson-${to}`)
      .replaceAll(`Lesson ${from}`, `Lesson ${to}`)
      .replaceAll(`L${from}`, `L${to}`)
      .replaceAll(`AQ${from}`, `AQ${to}`)
      .replaceAll(`AM${from}`, `AM${to}`)
      .replace(new RegExp(`\\bLesson ${lesson}\\b`, "g"), `Lesson ${lesson + 1}`)
      .replace(new RegExp(`\\bLessons ${lesson}\\b`, "g"), `Lessons ${lesson + 1}`)
      .replace(new RegExp(`\\b${from}-`, "g"), `${to}-`)
      .replace(new RegExp(`(\\blesson\\s*[:=]\\s*)${lesson}(?=\\D|$)`, "g"), `$1${lesson + 1}`)
      .replace(new RegExp(`(\\b(?:r|quiz|assessment|review|take|focused|combine)\\()${lesson}(?=[,)])`, "g"), `$1${lesson + 1}`);
  }
  return output;
}

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (directory === root && excludedRoots.has(entry.name)) continue;
    const absolute = path.join(directory, entry.name);
    const relative = path.relative(root, absolute).split(path.sep).join("/");
    if (excludedFiles.has(relative)) continue;
    if (entry.isDirectory()) walk(absolute);
    else if (entry.isFile()) {
      const buffer = fs.readFileSync(absolute);
      if (buffer.includes(0)) continue;
      const source = buffer.toString("utf8");
      const shifted = shiftText(source);
      if (shifted !== source) fs.writeFileSync(absolute, shifted);
    }
  }
}

walk(root);

for (let lesson = 150; lesson >= 10; lesson -= 1) {
  const from = pad(lesson);
  const to = pad(lesson + 1);
  const webFrom = path.join(root, "web", `lesson-${from}`);
  const webTo = path.join(root, "web", `lesson-${to}`);
  if (!fs.existsSync(webFrom) || fs.existsSync(webTo)) throw new Error(`Unsafe web migration ${from} -> ${to}`);
  fs.renameSync(webFrom, webTo);

  const markdownMatches = fs.readdirSync(path.join(root, "lessons")).filter((name) => name.startsWith(`${from}-`) && name.endsWith(".md"));
  if (markdownMatches.length !== 1) throw new Error(`Expected one Markdown source for lesson ${from}`);
  fs.renameSync(
    path.join(root, "lessons", markdownMatches[0]),
    path.join(root, "lessons", `${to}-${markdownMatches[0].slice(4)}`),
  );

  const assetRoot = path.join(root, "web", "assets", "diagrams", "stage10-infographics");
  for (const name of fs.readdirSync(assetRoot).filter((value) => value.startsWith(`stage10-lesson-${from}-`))) {
    fs.renameSync(path.join(assetRoot, name), path.join(assetRoot, name.replace(`stage10-lesson-${from}-`, `stage10-lesson-${to}-`)));
  }
}

const contractPath = path.join(root, "scripts", "syllabus-coverage-contract.json");
const coverage = JSON.parse(fs.readFileSync(contractPath, "utf8"));
for (const requirement of coverage.requirements) {
  requirement.teachingLessons = requirement.teachingLessons.map((lesson) => lesson >= 10 ? lesson + 1 : lesson);
}
const section1Lessons = { "S1.08": [8, 9], "S1.09": [10], "S1.10": [11], "S1.11": [13] };
for (const [id, lessons] of Object.entries(section1Lessons)) {
  const requirement = coverage.requirements.find((entry) => entry.id === id);
  requirement.teachingLessons = lessons;
  const first = Math.min(...lessons);
  if (requirement.firstUseReview) requirement.firstUseReview.lesson = first;
  if (requirement.firstTeachingEvidence) requirement.firstTeachingEvidence.lesson = first;
}
fs.writeFileSync(contractPath, `${JSON.stringify(coverage, null, 2)}\n`);

const identityPath = path.join(root, "scripts", "lesson-identity-contract.json");
const identities = JSON.parse(fs.readFileSync(identityPath, "utf8"));
for (const identity of identities.lessons) {
  if (identity.lesson >= 10) identity.lesson += 1;
  identity.id = pad(identity.lesson);
  identity.markdownFile = identity.markdownFile.replace(/^\d{3}-/, `${identity.id}-`);
}
identities.schemaVersion = 2;
identities.source = "151-lesson curriculum identity contract after the reviewed syllabus-order migration.";
identities.lessons.splice(9, 0, {
  lesson: 10,
  id: "010",
  title: "Vector graphics and drawing lists",
  markdownFile: "010-vector-graphics-and-drawing-lists.md",
});
fs.writeFileSync(identityPath, `${JSON.stringify(identities, null, 2)}\n`);

const vectorMarkdown = `# Lesson 010: Vector graphics and drawing lists

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** S1.09 Vector-graphic encoding and bitmap/vector choice
**Duration:** 45 minutes

## Learning objectives

1. Describe a vector graphic as a drawing list of drawing objects and properties.
2. Explain how software redraws vector objects and why scaling does not create pixelation.
3. Justify bitmap or vector storage for a stated task.

## Drawing-list model

A vector file stores instructions such as object type, coordinates, dimensions, line colour, fill colour and line thickness. The renderer follows this drawing list to reconstruct the image.

## Bitmap or vector

- Choose vector for logos, diagrams and geometric artwork that must be edited or scaled.
- Choose bitmap for photographs and detailed textures represented by individual pixels.
- A valid justification connects the image content and intended editing or scaling to the representation.

## Lesson summary

Vector graphics store objects and their properties rather than a fixed grid of pixels. Scaling changes the geometry before the objects are redrawn.
`;

const vectorHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>AS9618 Lesson 010 | Vector graphics and drawing lists</title>
    <link rel="icon" href="data:" />
    <link rel="stylesheet" href="./styles.css" />
    <link rel="stylesheet" href="../stage6-qa.css?v=10" />
    <link rel="stylesheet" href="../stage10-explanations.css?v=9" />
    <link rel="stylesheet" href="../lesson-toolbar.css?v=4" />
    <link rel="stylesheet" href="../academic-theme.css?v=7" />
  </head>
  <body>
    <a class="skip-link" href="#main-content">Skip to main content</a>
    <header class="topbar">
      <div><p class="eyebrow">Cambridge AS9618 Computer Science | Paper 1 Section 1</p><h1>Vector graphics and drawing lists</h1></div>
      <div class="action-panel" aria-label="Page controls"><a class="course-home-link" href="../">Course home</a><button id="printBtn" type="button">Print</button></div>
    </header>
    <nav class="lesson-nav" aria-label="Lesson contents">
      <a href="#stage2-completion">Core syllabus content</a><a href="#model">Drawing-list model</a><a href="#choice">Bitmap or vector</a><a href="#exam">Exam questions</a><a href="#summary">Summary</a>
    </nav>
    <main id="main-content" tabindex="-1">
      <div class="lesson-content">
        <section class="panel hero" id="overview" data-delivery-role="CORE" data-classroom-activity="TEACH" data-delivery-group="overview">
          <p class="eyebrow">Lesson 010 | 45 minutes | S1.09</p>
          <h2>Store instructions, not pixels</h2>
          <p>A vector graphic records drawing objects and their properties. Software follows the drawing list to reconstruct the image at the required size.</p>
        </section>
        <section class="panel" id="model" data-delivery-role="CORE" data-classroom-activity="TEACH" data-delivery-group="vector-model">
          <div class="section-title"><p class="eyebrow">Mechanism</p><h2>Read a drawing list</h2></div>
          <div class="vector-demo">
            <svg viewBox="0 0 360 210" role="img" aria-label="A red circle and blue rectangle reconstructed from drawing-object properties">
              <rect x="12" y="12" width="336" height="186" rx="16" fill="#f8fafc" stroke="#9aa9bd" />
              <circle id="demoCircle" cx="105" cy="105" r="46" fill="#d94841" stroke="#742a2a" stroke-width="5" />
              <rect id="demoRect" x="190" y="62" width="105" height="86" rx="8" fill="#2459a9" stroke="#102a56" stroke-width="5" />
            </svg>
            <pre id="drawingList" aria-live="polite">OBJECT circle\ncentre = (105, 105)\nradius = 46\nfill = red\noutline = dark red</pre>
          </div>
          <div class="shape-controls" role="group" aria-label="Choose a drawing object"><button type="button" data-shape="circle">Inspect circle</button><button type="button" data-shape="rectangle">Inspect rectangle</button></div>
        </section>
        <section class="panel" id="choice" data-delivery-role="CORE" data-classroom-activity="PRACTISE" data-delivery-group="representation-choice">
          <div class="section-title"><p class="eyebrow">Justification</p><h2>Choose bitmap or vector from the task</h2></div>
          <table><thead><tr><th>Task</th><th>Choice</th><th>Reason</th></tr></thead><tbody><tr><td>Logo for a pen and billboard</td><td>Vector</td><td>Objects scale without pixelation.</td></tr><tr><td>Detailed photograph</td><td>Bitmap</td><td>Individual pixels represent complex colour and texture.</td></tr></tbody></table>
          <p class="callout">Do not write only “vector is better quality”. Link the representation to image content, editing or scaling.</p>
        </section>
        <section class="panel" id="exam" data-delivery-role="CORE" data-classroom-activity="EXAM" data-delivery-group="exam">
          <div class="section-title"><p class="eyebrow">Exam-style questions</p><h2>Questions with expandable mark schemes</h2></div>
          <div class="exam-list" id="examList"></div>
        </section>
        <section class="panel summary-panel" id="summary" data-delivery-role="CORE" data-classroom-activity="CHECK" data-delivery-group="summary">
          <div class="section-title"><p class="eyebrow">Summary</p><h2>Vector encoding in three steps</h2></div>
          <ol><li>Store each drawing object.</li><li>Store its properties.</li><li>Redraw the list at the required size.</li></ol>
        </section>
        <section class="panel" id="homework" data-delivery-role="AFTER_CLASS" data-classroom-activity="HOMEWORK" data-delivery-group="homework"><div class="section-title"><p class="eyebrow">Homework</p><h2>Apply the representation choice</h2></div><p>Choose bitmap or vector for a map icon, a portrait photograph and an editable technical diagram. Justify every choice.</p></section>
      </div>
    </main>
    <script src="./app.js"></script><script src="../course-catalog.js?v=3"></script><script src="../lesson-toolbar.js?v=3"></script><script src="../stage7-accessibility.js?v=4"></script>
  </body>
</html>
`;

const vectorStyles = `.vector-demo{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(15rem,.8fr);gap:1rem;align-items:center}.vector-demo svg{width:100%;height:auto}.vector-demo pre{margin:0;padding:1rem;border:1px solid var(--line,#cbd5e1);border-radius:.75rem;background:#101827;color:#f8fafc;white-space:pre-wrap}.shape-controls{display:flex;gap:.75rem;flex-wrap:wrap;margin-top:1rem}.shape-controls button{min-height:44px}.shape-controls button.active{background:var(--accent,#174ea6);color:#fff}.lesson-content table{width:100%;border-collapse:collapse}.lesson-content :where(th,td){padding:.75rem;border:1px solid var(--line,#cbd5e1);text-align:left;vertical-align:top}@media(max-width:720px){.vector-demo{grid-template-columns:1fr}}\n`;

const vectorApp = `const examQuestions = [
  {title:"Question 1",marks:"3 marks",prompt:"Describe how a vector graphic is encoded.",answer:"It is stored as a drawing list of drawing objects. Each object stores properties and software redraws the objects from those instructions.",marking:[{mark:"B1",text:"drawing list / list of objects"},{mark:"B1",text:"object properties such as coordinates, dimensions or colour"},{mark:"B1",text:"software redraws objects from the descriptions"}],strict:["Do not accept pixels as the primary vector representation."]},
  {title:"Question 2",marks:"2 marks",prompt:"State two properties that may be stored for a vector drawing object.",answer:"Any two of coordinates, dimensions, line colour, fill colour and line thickness.",marking:[{mark:"B1",text:"first valid property"},{mark:"B1",text:"second valid property"}],strict:["Do not award the object type itself as both properties."]},
  {title:"Question 3",marks:"3 marks",prompt:"Explain why vector storage is suitable for a company logo used on a pen and a billboard.",answer:"A logo consists of geometric shapes. Vector objects can be scaled and redrawn at either size without pixelation.",marking:[{mark:"B1",text:"logo contains shapes / geometric objects"},{mark:"B1",text:"objects can be scaled or dimensions changed"},{mark:"B1",text:"redrawn without pixelation"}],strict:["The reason must be linked to the stated logo and scaling context."]},
  {title:"Question 4",marks:"3 marks",prompt:"Explain why bitmap storage is normally more suitable than vector storage for a detailed photograph.",answer:"A photograph contains complex colour and texture at individual positions. A bitmap stores those pixel values directly; describing every detail as drawing objects would be inefficient.",marking:[{mark:"B1",text:"photograph has complex colour / texture"},{mark:"B1",text:"bitmap stores individual pixel values"},{mark:"B1",text:"drawing-object description would be inefficient or unsuitable"}],strict:["Do not accept only 'bitmap has better quality'."]},
  {title:"Question 5",marks:"4 marks",prompt:"A designer creates an icon from circles and rectangles. Explain how it is stored as a vector graphic and give one advantage when resized.",answer:"The file stores a drawing list containing circle and rectangle objects. Properties include coordinates, dimensions and colours. Software redraws the objects, so changing the geometry allows resizing without pixelation.",marking:[{mark:"B1",text:"drawing list / circle and rectangle objects"},{mark:"B1",text:"stores object properties"},{mark:"B1",text:"software redraws from descriptions"},{mark:"B1",text:"resizes without pixelation"}],strict:["Do not award a generic quality claim without object-based storage or scalability."]}
];
const escapeHtml=(value)=>String(value).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");
function markTable(question){return '<div class="mark-scheme-table" role="table" aria-label="Mark scheme"><div class="mark-scheme-row mark-scheme-head" role="row"><strong role="columnheader">Answer</strong><strong role="columnheader">Guidance</strong><strong role="columnheader">Marks</strong></div>'+question.marking.map((point,index)=>'<div class="mark-scheme-row" role="row"><span role="cell">'+escapeHtml(point.text)+'</span><span role="cell">'+(index===0?escapeHtml(question.strict.join(" ")):"")+'</span><strong role="cell">1</strong></div>').join("")+'</div>'}
document.querySelector("#examList").innerHTML=examQuestions.map((question,index)=>'<article class="exam-card"><div class="exam-head"><h3>'+escapeHtml(question.title)+'</h3><span>'+escapeHtml(question.marks)+'</span></div><p>'+escapeHtml(question.prompt)+'</p><details><summary>Show answer and MS</summary><p>'+escapeHtml(question.answer)+'</p>'+markTable(question)+'</details></article>').join("");
const shapes={circle:"OBJECT circle\\ncentre = (105, 105)\\nradius = 46\\nfill = red\\noutline = dark red",rectangle:"OBJECT rectangle\\ntop-left = (190, 62)\\nwidth = 105; height = 86\\nfill = blue\\noutline = navy"};
document.querySelectorAll("[data-shape]").forEach((button)=>button.addEventListener("click",()=>{document.querySelectorAll("[data-shape]").forEach((item)=>item.classList.remove("active"));button.classList.add("active");document.querySelector("#drawingList").textContent=shapes[button.dataset.shape]}));
document.querySelector('[data-shape="circle"]').classList.add("active");
document.querySelector("#printBtn").addEventListener("click",()=>window.print());
`;

fs.writeFileSync(path.join(root, "lessons", "010-vector-graphics-and-drawing-lists.md"), vectorMarkdown);
fs.mkdirSync(path.join(root, "web", "lesson-010"));
fs.writeFileSync(path.join(root, "web", "lesson-010", "index.html"), vectorHtml);
fs.writeFileSync(path.join(root, "web", "lesson-010", "styles.css"), vectorStyles);
fs.writeFileSync(path.join(root, "web", "lesson-010", "app.js"), vectorApp);

const migration = {
  schemaVersion: 1,
  reason: "Insert a dedicated S1.09 Vector lesson before S1.10 Sound and enforce official first-Core order.",
  breakingNumberedUrlMigrationAccepted: true,
  insertedLesson: { newLesson: 10, id: "010", title: "Vector graphics and drawing lists" },
  movedLessons: Array.from({ length: 141 }, (_, index) => {
    const oldLesson = index + 10;
    return { oldLesson, oldId: pad(oldLesson), newLesson: oldLesson + 1, newId: pad(oldLesson + 1) };
  }),
};
fs.writeFileSync(path.join(root, "scripts", "lesson-number-migration.json"), `${JSON.stringify(migration, null, 2)}\n`);

console.log("Applied one-time 150 -> 151 lesson-number migration and restored the blocking official-order baseline.");
