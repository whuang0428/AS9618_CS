import fs from "node:fs";
import path from "node:path";

import { optionalEnrichment } from "./remediation-v2-optional-enrichment.mjs";

const root = path.resolve(import.meta.dirname, "..");
const htmlStart = "<!-- remediation-v2-optional:start -->";
const htmlEnd = "<!-- remediation-v2-optional:end -->";
const markdownStart = "<!-- remediation-v2-optional:start -->";
const markdownEnd = "<!-- remediation-v2-optional:end -->";

function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

for (const item of optionalEnrichment) {
  const number = String(item.lesson).padStart(3, "0");
  const htmlPath = path.join(root, "web", `lesson-${number}`, "index.html");
  const markdownMatches = fs.readdirSync(path.join(root, "lessons")).filter((name) => name.startsWith(`${number}-`) && name.endsWith(".md"));
  if (markdownMatches.length !== 1) throw new Error(`Expected one Markdown lesson for ${number}`);
  const markdownPath = path.join(root, "lessons", markdownMatches[0]);

  let html = fs.readFileSync(htmlPath, "utf8").replace(new RegExp(`\\s*${htmlStart}[\\s\\S]*?${htmlEnd}\\s*`, "g"), "\n");
  const notice = `\n        ${htmlStart}\n        <aside class="optional-enrichment-notice" aria-label="Optional enrichment scope">\n          <strong>Optional enrichment</strong>\n          <p>${escapeHtml(item.optionalTopic)}. This material is excluded from compulsory syllabus coverage, first-use and assessment statistics.</p>\n          <p><strong>Formal AS prerequisite:</strong> ${escapeHtml(item.formalPrerequisite)}.</p>\n        </aside>\n        ${htmlEnd}\n`;
  if (!html.includes('<div class="lesson-content">')) throw new Error(`Lesson ${number}: lesson-content anchor missing`);
  html = html.replace('<div class="lesson-content">', `<div class="lesson-content">${notice}`);
  fs.writeFileSync(htmlPath, html);

  let markdown = fs.readFileSync(markdownPath, "utf8").replace(new RegExp(`\\n?${markdownStart}[\\s\\S]*?${markdownEnd}\\n?`, "g"), "\n");
  const markdownNotice = `${markdownStart}\n> **Optional enrichment:** ${item.optionalTopic}. This material is excluded from compulsory syllabus coverage, first-use and assessment statistics.\n>\n> **Formal AS prerequisite:** ${item.formalPrerequisite}.\n${markdownEnd}\n`;
  const headingEnd = markdown.indexOf("\n", markdown.indexOf("# "));
  markdown = `${markdown.slice(0, headingEnd + 1)}\n${markdownNotice}${markdown.slice(headingEnd + 1).replace(/^\n+/, "\n")}`;
  fs.writeFileSync(markdownPath, markdown);
}

console.log(`Applied visible Optional enrichment scope notices to ${optionalEnrichment.length} lessons.`);
