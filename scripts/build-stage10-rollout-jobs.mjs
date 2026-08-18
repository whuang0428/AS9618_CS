import fs from "node:fs";
import path from "node:path";
import { pilotExplanations } from "./stage10-explanations-data.mjs";

const root = path.resolve(import.meta.dirname, "..");
const registerPath = path.join(root, "audits", "stage10-explanation-target-register.csv");
const outputPath = path.join(root, "scripts", "stage10-rollout-jobs.json");

function parseCsv(source) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    if (quoted) {
      if (character === '"' && source[index + 1] === '"') {
        cell += '"';
        index += 1;
      } else if (character === '"') quoted = false;
      else cell += character;
    } else if (character === '"') quoted = true;
    else if (character === ",") {
      row.push(cell);
      cell = "";
    } else if (character === "\n") {
      row.push(cell);
      if (row.some(Boolean)) rows.push(row);
      row = [];
      cell = "";
    } else if (character !== "\r") cell += character;
  }
  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows;
}

function decodeHtml(value) {
  return String(value)
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&nbsp;", " ")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)));
}

function directSections(source) {
  const sections = [];
  const stack = [];
  const tags = /<\/?([a-z][a-z0-9-]*)\b[^>]*>/gi;
  const voidTags = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"]);
  let match;
  while ((match = tags.exec(source))) {
    const tag = match[0];
    const name = match[1].toLowerCase();
    if (tag.startsWith("</")) {
      let item;
      while (stack.length) {
        item = stack.pop();
        if (item.name === name) break;
      }
      if (item?.section) item.section.content = source.slice(item.section.tagEnd, match.index);
      continue;
    }
    const parent = stack.at(-1);
    const isLessonContent = name === "div" && /\bclass="[^"]*\blesson-content\b/.test(tag);
    let section = null;
    if (name === "section" && parent?.isLessonContent) {
      section = {
        id: tag.match(/\bid="([^"]+)"/)?.[1] ?? "",
        tagEnd: tags.lastIndex,
      };
      sections.push(section);
    }
    if (!voidTags.has(name) && !tag.endsWith("/>")) stack.push({ name, isLessonContent, section });
  }
  return sections;
}

function sectionFacts(content, title) {
  const withoutGenerated = content
    .replace(/<!-- stage10-explanation:start[\s\S]*?<!-- stage10-explanation:end[^>]*-->/g, " ")
    .replace(/<(script|style|svg)\b[\s\S]*?<\/\1>/gi, " ")
    .replace(/<(button|option)\b[^>]*>[\s\S]*?<\/\1>/gi, " ")
    .replace(/<\/(?:p|li|h[1-6]|tr|td|th|div|figcaption)>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, " ");
  const lines = decodeHtml(withoutGenerated)
    .split(/\n+/)
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter((line) => line.length >= 8)
    .filter((line) => !/^knowledge point \d+$/i.test(line))
    .filter((line) => !/^knowledge points?\b/i.test(line))
    .filter((line) => !/[\u3400-\u9fff]/u.test(line))
    .filter((line) => line.toLowerCase() !== title.toLowerCase());
  const unique = [];
  for (const line of lines) {
    if (unique.some((value) => value.toLowerCase() === line.toLowerCase())) continue;
    unique.push(line.replaceAll("`", ""));
    if (unique.join(" ").length >= 1_200 || unique.length >= 12) break;
  }
  return unique;
}

function promptFor(job) {
  const layout = {
    mechanism: "one dominant input → mechanism → result diagram",
    process: "a numbered process diagram with correct directional arrows",
    comparison: "a balanced side-by-side comparison with a concise decision rule",
    tradeoff: "a cause-and-effect diagram showing both benefit and cost",
    synthesis: "a central concept map connecting components to observable consequences",
  }[job.kind] ?? "a clear cause-and-effect diagram";
  return `Use case: scientific-educational\nAsset type: landscape Cambridge AS Computer Science knowledge-point infographic for students aged 16–18\nInput images: Image 1 is a style and layout reference only. Do not copy its CPU-specific content.\nPrimary request: create a precise academic infographic for the knowledge point “${job.title}”. Convert the supplied lesson facts into a visual explanation; do not merely decorate or restate the heading.\nSource facts from the lesson (use only these facts):\n${job.sourceFacts.map((fact) => `- ${fact}`).join("\n")}\nDiagram logic: ${layout}. Make the causal or operational relationship visible through labelled arrows, states, components or tables. Include a worked example only when the source facts already provide every value used in that example.\nStyle/medium: match the reference image's clean white academic handout, large navy title, thin grey borders, restrained blue/green/orange accents, crisp vector-like diagrams and professional textbook tone\nComposition/framing: 3:2 landscape; strong reading order; one dominant diagram or three linked panels; compact key-points box; generous but not excessive whitespace\nText: render the title exactly as “${job.title}”. Use short labels and short phrases drawn from the supplied lesson facts.\nConstraints: technically accurate; readable at 1400 pixels wide; arrows must point in the correct direction; keep labels horizontal; do not introduce unsupported numerical values, performance claims, technical terms, examples, steps or relationships; do not repeat the same relationship in a second diagram with a different order or arrow direction\nAvoid: toy-like 3D, cartoons, children, characters, cinematic or film scenes, photorealism, dense paragraphs, tiny text, spelling mistakes, duplicated labels, decorative clip art, logos, citations and watermarks`;
}

const csvRows = parseCsv(fs.readFileSync(registerPath, "utf8"));
const header = csvRows.shift();
const columns = Object.fromEntries(header.map((value, index) => [value, index]));
const jobs = [];
const pilotKeys = new Set(pilotExplanations.map((item) => `${item.lesson}/${item.targetId}`));

for (const row of csvRows) {
  const lesson = row[columns.lesson];
  const targetId = row[columns.target_id];
  if (pilotKeys.has(`${lesson}/${targetId}`)) continue;
  const title = row[columns.title];
  const htmlPath = path.join(root, "web", `lesson-${lesson}`, "index.html");
  const html = fs.readFileSync(htmlPath, "utf8");
  const section = directSections(html).find((item) => item.id === targetId);
  if (!section) throw new Error(`Lesson ${lesson}: target ${targetId} is missing`);
  const sourceFacts = sectionFacts(section.content, title);
  if (!sourceFacts.length) throw new Error(`Lesson ${lesson}/${targetId}: no source facts found`);
  const job = {
    lesson,
    targetId,
    title,
    kind: row[columns.target_type],
    filename: `stage10-lesson-${lesson}-${targetId}.jpg`,
    sourceFacts,
  };
  jobs.push({ ...job, prompt: promptFor(job) });
}

fs.writeFileSync(outputPath, `${JSON.stringify(jobs, null, 2)}\n`);
console.log(`Generated ${jobs.length} Stage 10 rollout jobs at ${path.relative(root, outputPath)}.`);
