import fs from "node:fs";
import path from "node:path";

import { loadAllQuestions } from "./ms-review-utils.mjs";

export const root = path.resolve(import.meta.dirname, "..");
export const lessonNumber = (value) => String(value).padStart(3, "0");

const lessonCache = new Map();
const questionLookup = new Map(loadAllQuestions().map((question) => [question.id, question]));

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (quoted) {
      if (character === '"' && text[index + 1] === '"') { cell += '"'; index += 1; }
      else if (character === '"') quoted = false;
      else cell += character;
    } else if (character === '"') quoted = true;
    else if (character === ",") { row.push(cell); cell = ""; }
    else if (character === "\n") { row.push(cell); rows.push(row); row = []; cell = ""; }
    else if (character !== "\r") cell += character;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  const [headers, ...body] = rows.filter((entry) => entry.some(Boolean));
  return body.map((entry) => Object.fromEntries(headers.map((header, index) => [header, entry[index] ?? ""])));
}

const visualRegisterPath = path.join(root, "audits", "stage10-concept-visual-register.csv");
const targetRegisterPath = path.join(root, "audits", "stage10-explanation-target-register.csv");
const visualLookup = fs.existsSync(visualRegisterPath)
  ? new Map(parseCsv(fs.readFileSync(visualRegisterPath, "utf8")).map((row) => [`${Number(row.lesson)}:${row.visual_id}`, row]))
  : new Map();
const targetLookup = fs.existsSync(targetRegisterPath)
  ? new Map(parseCsv(fs.readFileSync(targetRegisterPath, "utf8")).map((row) => [`${Number(row.lesson)}:${row.implementation_id}`, row]))
  : new Map();

export function lessonPaths(lesson) {
  const number = lessonNumber(lesson);
  const names = fs.readdirSync(path.join(root, "lessons")).filter((name) => name.startsWith(`${number}-`) && name.endsWith(".md"));
  return {
    number,
    markdownPath: names.length === 1 ? path.join(root, "lessons", names[0]) : null,
    htmlPath: path.join(root, "web", `lesson-${number}`, "index.html"),
  };
}

function decodeEntities(value) {
  return value
    .replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"').replaceAll("&#39;", "'").replaceAll("&nbsp;", " ").replaceAll("&#160;", " ");
}

export function normaliseText(value) {
  return decodeEntities(String(value)).replace(/<script\b[\s\S]*?<\/script>/gi, " ").replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<\/?[a-z][^>]*>/gi, " ").replace(/[^a-z0-9#+/<>-]+/gi, " ").replace(/\s+/g, " ").trim().toLowerCase();
}

export function containsGroup(text, group) {
  const haystack = ` ${normaliseText(text)} `;
  return group.some((term) => haystack.includes(` ${normaliseText(term)} `));
}

function openingAttributes(openingTag) {
  return {
    id: openingTag.match(/\bid="([^"]+)"/i)?.[1] ?? "",
    role: openingTag.match(/\bdata-delivery-role="([^"]+)"/i)?.[1] ?? "",
    activity: openingTag.match(/\bdata-classroom-activity="([^"]+)"/i)?.[1] ?? "",
  };
}

function sectionAt(html, start) {
  const tokens = /<section\b[^>]*>|<\/section>/gi;
  tokens.lastIndex = start;
  let depth = 0;
  let opening = "";
  let match;
  while ((match = tokens.exec(html))) {
    if (/^<section/i.test(match[0])) {
      if (depth === 0) opening = match[0];
      depth += 1;
    } else {
      depth -= 1;
      if (depth === 0) return { ...openingAttributes(opening), html: html.slice(start, tokens.lastIndex) };
    }
  }
  return null;
}

function allSections(html) {
  const sections = [];
  for (const match of html.matchAll(/<section\b[^>]*>/gi)) {
    const section = sectionAt(html, match.index);
    if (section) sections.push(section);
  }
  return sections;
}

function removeRole(html, role) {
  const ranges = [];
  for (const match of html.matchAll(/<section\b[^>]*>/gi)) {
    const section = sectionAt(html, match.index);
    if (section?.role === role) ranges.push([match.index, match.index + section.html.length]);
  }
  let output = html;
  for (const [start, end] of ranges.sort((a, b) => b[0] - a[0])) output = `${output.slice(0, start)} ${output.slice(end)}`;
  return output;
}

function readLesson(lesson) {
  if (lessonCache.has(lesson)) return lessonCache.get(lesson);
  const paths = lessonPaths(lesson);
  if (!paths.markdownPath || !fs.existsSync(paths.htmlPath)) return null;
  const markdown = fs.readFileSync(paths.markdownPath, "utf8");
  const html = fs.readFileSync(paths.htmlPath, "utf8");
  const coreHtml = removeRole(removeRole(html, "OPTIONAL"), "AFTER_CLASS");
  const value = { ...paths, markdown, html, coreHtml, sections: allSections(html) };
  lessonCache.set(lesson, value);
  return value;
}

function evidenceSection(evidence) {
  return readLesson(evidence.lesson)?.sections.find(({ id }) => id === evidence.sectionId) ?? null;
}

function checkEvidenceGroups(messages, prefix, text, groups) {
  for (const group of groups ?? []) {
    if (!containsGroup(text, group)) messages.push(`${prefix} missing concept group: ${group.join(" | ")}`);
  }
}

function questionText(question) {
  return [question.prompt, question.answer, ...(question.points ?? []).flat(), ...(question.guidance ?? [])].join(" ");
}

export function evaluateRequirement(requirement, options = {}) {
  const messages = [];
  if (requirement.evidenceReviewStatus !== "Reviewed") messages.push("contract evidence mapping pending independent review");
  const lessonSources = [];
  for (const lesson of requirement.teachingLessons) {
    const storedSource = readLesson(lesson);
    const transformed = storedSource && options.lessonTransform
      ? options.lessonTransform({ lesson, markdown: storedSource.markdown, html: storedSource.html })
      : null;
    const source = transformed
      ? { ...storedSource, ...transformed, coreHtml: removeRole(removeRole(transformed.html, "OPTIONAL"), "AFTER_CLASS"), sections: allSections(transformed.html) }
      : storedSource;
    if (!source) messages.push(`missing lesson source for L${lessonNumber(lesson)}`);
    else lessonSources.push(source);
  }

  if (lessonSources.length === 0) messages.push("no teaching lesson source");
  const markdownText = lessonSources.map(({ markdown }) => markdown).join("\n");
  const coreHtmlText = lessonSources.map(({ coreHtml }) => coreHtml).join("\n");
  for (const group of requirement.requiredGroups) {
    if (!containsGroup(markdownText, group)) messages.push(`Markdown missing required concept group: ${group.join(" | ")}`);
    if (!containsGroup(coreHtmlText, group)) messages.push(`visible CORE HTML missing required concept group: ${group.join(" | ")}`);
  }

  for (const id of requirement.coreSections) {
    const sections = lessonSources.flatMap(({ sections }) => sections).filter((section) => section.id === id);
    if (!sections.some(({ role }) => role === "CORE")) messages.push(`missing CORE section #${id}`);
  }

  if (requirement.workedExampleEvidence.length === 0) messages.push("no worked-example evidence declared");
  for (const evidence of requirement.workedExampleEvidence) {
    const section = evidenceSection(evidence);
    const prefix = `worked example L${lessonNumber(evidence.lesson)}#${evidence.sectionId}`;
    if (!section) messages.push(`${prefix} is missing`);
    else {
      if (section.role !== "CORE" || section.activity !== "TEACH") messages.push(`${prefix} is not CORE/TEACH`);
      checkEvidenceGroups(messages, prefix, section.html, evidence.conceptGroups);
    }
  }

  if (requirement.practiceEvidence.length === 0) messages.push("no practice/MS evidence declared");
  for (const evidence of requirement.practiceEvidence) {
    const section = evidenceSection(evidence);
    const prefix = `practice L${lessonNumber(evidence.lesson)}#${evidence.sectionId}`;
    if (!section) messages.push(`${prefix} is missing`);
    else {
      if (section.role !== "CORE" || !["PRACTISE", "EXAM"].includes(section.activity)) messages.push(`${prefix} is not CORE PRACTISE/EXAM`);
      checkEvidenceGroups(messages, prefix, section.html, evidence.conceptGroups);
      const page = readLesson(evidence.lesson)?.html ?? "";
      if (!/show (?:answer|ms)|mark scheme|model answer/i.test(normaliseText(page))) messages.push(`${prefix} has no student-visible answer/MS control`);
    }
  }

  const evidenceForms = new Set();
  if (requirement.assessmentEvidence.length === 0) messages.push("no direct assessment question declared");
  for (const evidence of requirement.assessmentEvidence) {
    const storedQuestion = questionLookup.get(evidence.questionId);
    const question = storedQuestion && options.questionTransform ? options.questionTransform(storedQuestion) : storedQuestion;
    if (!question) {
      messages.push(`assessment question ${evidence.questionId} is missing`);
      continue;
    }
    evidenceForms.add(question.source === "lesson" ? "lesson" : question.sourceKey);
    checkEvidenceGroups(messages, `assessment ${evidence.questionId}`, questionText(question), evidence.conceptGroups);
  }
  if (evidenceForms.size < requirement.minimumAssessmentForms) messages.push(`assessment evidence has ${evidenceForms.size} form(s); requires ${requirement.minimumAssessmentForms}`);

  for (const evidence of requirement.visualEvidence) {
    const prefix = `visual L${lessonNumber(evidence.lesson)}:${evidence.visualId}`;
    const visual = visualLookup.get(`${evidence.lesson}:${evidence.visualId}`);
    const target = targetLookup.get(`${evidence.lesson}:${evidence.sectionId}`);
    if (!visual || !target) {
      if (evidence.required) messages.push(`${prefix} is missing from the visual/target registers`);
      continue;
    }
    if (target.delivery_role !== "CORE" || target.classroom_activity !== "TEACH") messages.push(`${prefix} is not CORE/TEACH`);
    checkEvidenceGroups(messages, prefix, `${visual.topic} ${visual.required_facts}`, evidence.conceptGroups);
  }
  if (requirement.riskLevel === "High" && !requirement.visualEvidence.some(({ required }) => required)) messages.push("high-risk requirement has no required visual evidence");

  return { status: messages.length ? "Partial" : "Complete", messages, lessonSources };
}
