import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { explanationByKey, explanations } from "./stage10-explanations-data.mjs";

const root = path.resolve(import.meta.dirname, "..");
const auditDirectory = path.join(root, "audits");
const reviewLessons = new Set(["015", "026", "040", "051", "061", "071", "077", "089", "090", "091", "092", "093", "094", "095", "096", "097", "112", "125", "141", "146", "147", "148", "149", "150"]);
const excludedIds = /^(?:overview|examples|stage2-completion|tool|builder|simulator|converter|checker|classifier|chooser|runner|detector|hash-demo|model-tool|order-tool|error-tool|rewrite-tool|bubble-tool|insert-tool|trace|fde|delivery-\d+)$/;
const excludedTitles = /^(?:why this matters|common trap|worked examples?|annotate |identify the topic|interactive |choose a project situation|spot the stage)/i;
const visualHint = /(?:diagram|visual|topology|flowchart|architecture|cycle|journey|gate|pipeline|entity|relationship|network-map|storage-media|peer-visual|concept-svg)/i;

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function decodeHtml(value) {
  return String(value)
    .replace(/<[^>]+>/g, " ")
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replace(/\s+/g, " ")
    .trim();
}

function csv(value) {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function parseCsv(source) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    if (quoted) {
      if (char === '"' && source[index + 1] === '"') {
        cell += '"';
        index += 1;
      } else if (char === '"') quoted = false;
      else cell += char;
    } else if (char === '"') quoted = true;
    else if (char === ",") {
      row.push(cell);
      cell = "";
    } else if (char === "\n") {
      row.push(cell);
      if (row.some(Boolean)) rows.push(row);
      row = [];
      cell = "";
    } else if (char !== "\r") cell += char;
  }
  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows;
}

function directSections(source) {
  const sections = [];
  const stack = [];
  const tags = /<\/?([a-z][a-z0-9-]*)\b[^>]*>/gi;
  const voidTags = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"]);
  let match;
  while ((match = tags.exec(source))) {
    const full = match[0];
    const name = match[1].toLowerCase();
    if (full.startsWith("</")) {
      let item;
      while (stack.length) {
        item = stack.pop();
        if (item.name === name) break;
      }
      if (item?.section) {
        item.section.closeStart = match.index;
        item.section.end = tags.lastIndex;
        item.section.content = source.slice(item.section.tagEnd, match.index);
      }
      continue;
    }
    const parent = stack.at(-1);
    const isLessonContent = name === "div" && /\bclass="[^"]*\blesson-content\b/.test(full);
    let section = null;
    if (name === "section" && parent?.isLessonContent) {
      section = {
        start: match.index,
        tagEnd: tags.lastIndex,
        tag: full,
        id: full.match(/\bid="([^"]+)"/)?.[1] ?? "",
      };
      sections.push(section);
    }
    if (!voidTags.has(name) && !full.endsWith("/>")) stack.push({ name, isLessonContent, section });
  }
  return sections;
}

function targetType(lesson, id, title) {
  if (reviewLessons.has(lesson)) return "synthesis";
  if (/compare|\bvs\b|difference|model/i.test(`${id} ${title}`)) return "comparison";
  if (/process|cycle|stage|algorithm|sort|management|operation|workflow/i.test(`${id} ${title}`)) return "process";
  if (/advantage|disadvantage|security|performance|topolog|suitab/i.test(`${id} ${title}`)) return "tradeoff";
  return "mechanism";
}

function hash(value) {
  return crypto.createHash("sha256").update(String(value)).digest("hex");
}

const deliveryRows = parseCsv(read("audits/stage9-classroom-delivery-register.csv"));
const deliveryHeader = deliveryRows.shift();
const deliveryIndex = Object.fromEntries(deliveryHeader.map((value, index) => [value, index]));
const targets = [];

for (let number = 1; number <= 150; number += 1) {
  const lesson = String(number).padStart(3, "0");
  const rows = deliveryRows.filter((row) => row[deliveryIndex.lesson] === lesson);
  let candidates = rows.filter((row) => {
    const id = row[deliveryIndex.section_id];
    const title = row[deliveryIndex.title];
    return row[deliveryIndex.delivery_role] === "CORE"
      && row[deliveryIndex.classroom_activity] === "TEACH"
      && !excludedIds.test(id)
      && !excludedTitles.test(title)
      && !id.startsWith("explanation-");
  });
  if (!candidates.length) {
    candidates = rows.filter((row) => row[deliveryIndex.delivery_role] === "CORE"
      && row[deliveryIndex.classroom_activity] === "TEACH"
      && row[deliveryIndex.section_id] !== "overview"
      && !row[deliveryIndex.section_id].startsWith("delivery-")).slice(0, 1);
  }
  if (!candidates.length) throw new Error(`Lesson ${lesson} has no auditable explanation target`);

  for (const row of candidates) {
    const id = row[deliveryIndex.section_id];
    const title = row[deliveryIndex.title];
    const item = explanationByKey[`${lesson}/${id}`];
    targets.push({
      lesson,
      targetId: id,
      title,
      targetType: item?.kind ?? targetType(lesson, id, title),
      status: item ? "ImplementedPilot" : "Planned",
      implementationId: item ? `explanation-${id}` : "",
      rationale: reviewLessons.has(lesson)
        ? "Review lesson: consolidate related ideas into causal synthesis and avoid adding panels to retrieval items or tools."
        : "Core concept: explain mechanism, cause, consequence and boundary instead of repeating the definition.",
      contentHash: item ? hash([...item.steps, item.analogy, item.boundary, item.visual?.src ?? ""].join("\n")) : "",
    });
  }
}

const targetHeader = ["lesson", "target_id", "title", "target_type", "status", "implementation_id", "rationale", "content_hash"];
const targetRows = targets.map((item) => [item.lesson, item.targetId, item.title, item.targetType, item.status, item.implementationId, item.rationale, item.contentHash].map(csv).join(","));
fs.writeFileSync(path.join(auditDirectory, "stage10-explanation-target-register.csv"), `${targetHeader.join(",")}\n${targetRows.join("\n")}\n`);

const legacyRows = parseCsv(read("audits/student-visual-explanation-register.csv"));
const legacyHeader = legacyRows.shift();
const legacyIndex = Object.fromEntries(legacyHeader.map((value, index) => [value, index]));
const legacyByLesson = new Map(legacyRows.map((row) => [row[legacyIndex.lesson], row]));
const visuals = [];
const seenVisualKeys = new Set();

for (let number = 1; number <= 150; number += 1) {
  const lesson = String(number).padStart(3, "0");
  const html = read(`web/lesson-${lesson}/index.html`);
  const css = read(`web/lesson-${lesson}/styles.css`);
  const sections = directSections(html);
  for (const section of sections) {
    const content = section.content ?? "";
    const title = decodeHtml(content.match(/<h[23][^>]*>([\s\S]*?)<\/h[23]>/i)?.[1] ?? section.id);
    const tags = [...content.matchAll(/<(svg|img|canvas|figure|[a-z][a-z0-9-]*)\b([^>]*)>/gi)];
    let ordinal = 0;
    for (const match of tags) {
      const tagName = match[1].toLowerCase();
      const tag = match[0];
      const semantic = ["svg", "img", "canvas", "figure"].includes(tagName)
        || /\brole="img"/.test(tag)
        || visualHint.test(tag.match(/\bclass="([^"]*)"/)?.[1] ?? "");
      if (!semantic) continue;
      if (tagName === "figure" && /<(?:svg|img|canvas)\b/i.test(content.slice(match.index))) continue;
      ordinal += 1;
      const elementId = tag.match(/\bid="([^"]+)"/)?.[1] ?? `${section.id}-${tagName}-${ordinal}`;
      const key = `${lesson}/${elementId}`;
      if (seenVisualKeys.has(key)) continue;
      seenVisualKeys.add(key);
      const aria = decodeHtml(tag.match(/\baria-label="([^"]+)"/)?.[1] ?? "");
      const alt = decodeHtml(tag.match(/\balt="([^"]*)"/)?.[1] ?? "");
      const titleText = tagName === "svg" ? decodeHtml(content.slice(match.index).match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "") : "";
      const description = tagName === "svg" ? decodeHtml(content.slice(match.index).match(/<desc[^>]*>([\s\S]*?)<\/desc>/i)?.[1] ?? "") : "";
      const legacy = legacyByLesson.get(lesson);
      visuals.push({
        lesson,
        visualId: elementId,
        sectionId: section.id,
        method: tagName === "img" ? "Raster image" : tagName === "svg" ? "Inline SVG" : tagName === "canvas" ? "Canvas" : "HTML/CSS",
        topic: titleText || aria || alt || title,
        requiredFacts: description || aria || alt || `Define exact facts for manual review of ${title}.`,
        source: lesson === "016" ? "Cambridge 9618 syllabus 2027-2029 section 2.1" : "Lesson content and applicable syllabus row",
        status: lesson === "016" && section.id === "topologies" ? "PilotReview" : legacy?.[legacyIndex.status] === "Approved" ? "ApprovedBaseline" : "NeedsFactReview",
        contentHash: hash(tag),
      });
    }
  }

  for (const match of css.matchAll(/\.([a-z][a-z0-9_-]*(?:visual|diagram|topology|flowchart|cycle|journey|gate)[a-z0-9_-]*)::(?:before|after)\b/gi)) {
    const visualId = `css-${match[1]}`;
    const key = `${lesson}/${visualId}`;
    if (seenVisualKeys.has(key)) continue;
    seenVisualKeys.add(key);
    visuals.push({ lesson, visualId, sectionId: "css", method: "CSS pseudo-element", topic: match[1], requiredFacts: `Define exact facts for manual review of CSS drawing ${match[1]}.`, source: "Lesson content and applicable syllabus row", status: "NeedsFactReview", contentHash: hash(match[0]) });
  }
}

for (const row of legacyRows) {
  const lesson = row[legacyIndex.lesson];
  if (visuals.some((item) => item.lesson === lesson)) continue;
  visuals.push({
    lesson,
    visualId: `planned-${lesson}`,
    sectionId: "planned",
    method: row[legacyIndex.method],
    topic: row[legacyIndex.topic],
    requiredFacts: row[legacyIndex.required_facts],
    source: "Cambridge 9618 syllabus and lesson content",
    status: row[legacyIndex.status],
    contentHash: "",
  });
}

visuals.sort((a, b) => a.lesson.localeCompare(b.lesson) || a.visualId.localeCompare(b.visualId));
const visualHeader = ["lesson", "visual_id", "section_id", "method", "topic", "required_facts", "source", "status", "content_hash"];
const visualRows = visuals.map((item) => [item.lesson, item.visualId, item.sectionId, item.method, item.topic, item.requiredFacts, item.source, item.status, item.contentHash].map(csv).join(","));
fs.writeFileSync(path.join(auditDirectory, "stage10-concept-visual-register.csv"), `${visualHeader.join(",")}\n${visualRows.join("\n")}\n`);

const implementedLessons = new Set(explanations.map((item) => item.lesson));
const report = `# Stage 10 Concept Accuracy and Explanation Audit\n\n## Current gate\n\n- Explanation targets: ${targets.length} across 150 lessons.\n- Implemented pilot explanations: ${explanations.length} across ${implementedLessons.size} lessons.\n- Academic ImageGen assets in the revised pilot: ${explanations.filter((item) => item.visual).length}.\n- Visual records: ${visuals.length}; semantic statuses remain explicit and are not inferred from successful rendering.\n- Rollout state: pilot only. Expansion beyond the ten named lessons requires human approval.\n\n## Review rules\n\n- Definitions alone do not satisfy an explanation target. Each panel uses three concise cause-and-effect steps plus an analogy and a boundary condition.\n- Review lessons use causal synthesis rather than one panel per retrieval prompt.\n- SVG, image, CSS and interactive visuals require factual review. Automated checks can verify structure and accessibility, not conceptual truth.\n- Precise connections, sequences and symbols use deterministic SVG or HTML. ImageGen is restricted to academically styled analogies without labels, topology or exact sequences.\n`;
fs.writeFileSync(path.join(auditDirectory, "stage10-concept-explanation-report.md"), report);

console.log(`Generated Stage 10 audits: ${targets.length} explanation targets and ${visuals.length} visual records.`);
