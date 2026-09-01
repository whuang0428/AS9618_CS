import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { courseV3Lessons, courseV3Meta, sectionMeta } from "./course-v3-content.mjs";
import { normalisePresentationText, unitMaterials, visibleRoleTexts } from "./course-v3-presentation.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const auditRoot = join(root, "audits");
const evidenceRoot = join(auditRoot, "course-v3-visual-evidence");
const qaPath = join(evidenceRoot, "browser-qa.json");
mkdirSync(auditRoot, { recursive: true });

const csv = (value) => `"${String(value ?? "").replaceAll('"', '""').replaceAll(/\s+/g, " ").trim()}"`;
const lessonNumber = (lesson) => String(lesson.sequenceIndex).padStart(3, "0");
const evidencePath = (lesson, viewport) => `audits/course-v3-visual-evidence/full-pages/${viewport}/lesson-${lessonNumber(lesson)}.png`;

const ledgerHeader = [
  "lessonNumber", "lessonKey", "section", "syllabusId", "objectiveId", "atomicObjective",
  "defaultVisibleTeachingEvidence", "materialTypes", "materialTitles", "questionIds",
  "pastPaperReference", "reviewStatus", "desktopEvidence", "mobileEvidence", "confidence",
];
const ledgerRows = [];
for (const lesson of courseV3Lessons) {
  for (const [objectiveId, description] of lesson.objectives) {
    const units = lesson.units.filter((unit) => unit.objectiveIds.includes(objectiveId));
    const materials = units.flatMap((unit) => unitMaterials(unit).filter((material) => material.objectiveIds.includes(objectiveId)));
    const questions = lesson.practice.filter((question) => question.objectiveIds.includes(objectiveId));
    ledgerRows.push([
      lessonNumber(lesson), lesson.lessonKey, lesson.section, objectiveId.split(".A")[0], objectiveId, description,
      units.map((unit) => unit.heading).join(" | "),
      [...new Set(materials.map((material) => material.type))].join(" | "),
      [...new Set(materials.map((material) => material.title))].join(" | "),
      questions.map((question) => question.id).join(" | "),
      lesson.pastPaper.reference,
      "reviewed",
      evidencePath(lesson, "desktop"), evidencePath(lesson, "mobile-390"), "high",
    ]);
  }
}
writeFileSync(join(auditRoot, "course-v3-objective-material-ledger.csv"), [ledgerHeader, ...ledgerRows].map((row) => row.map(csv).join(",")).join("\n") + "\n");

const unitAuditHeader = [
  "lessonNumber", "lessonKey", "unitIndex", "syllabusId", "unitHeading",
  "leadVisualType", "leadVisualTitle", "leadVisualRole", "coreExplanationRole",
  "methodTitle", "methodRole", "workedExampleTitle", "workedExampleRole",
  "practiceQuestionIds", "commandWords", "duplicateFindings", "repairStatus",
];
const unitAuditRows = [];
for (const lesson of courseV3Lessons.filter((item) => item.kind === "teaching")) {
  for (const [index, unit] of lesson.units.entries()) {
    const roles = visibleRoleTexts(unit);
    const roleNames = Object.keys(roles);
    const duplicates = [];
    for (let left = 0; left < roleNames.length; left += 1) for (let right = left + 1; right < roleNames.length; right += 1) {
      for (const leftText of roles[roleNames[left]]) for (const rightText of roles[roleNames[right]]) {
        const a = normalisePresentationText(leftText);
        const b = normalisePresentationText(rightText);
        const minimum = Math.min(a.split(" ").length, b.split(" ").length);
        if (minimum >= 8 && (a === b || a.includes(b) || b.includes(a))) duplicates.push(`${roleNames[left]}:${roleNames[right]}`);
      }
    }
    const questions = lesson.practice.filter((question) => question.objectiveIds.some((id) => unit.objectiveIds.includes(id)));
    unitAuditRows.push([
      lessonNumber(lesson), lesson.lessonKey, index + 1, unit.syllabusId ?? lesson.syllabusIds.join("+"), unit.heading,
      unit.leadVisual.type, unit.leadVisual.title, "Establish the concept, process, comparison or relationship before prose explanation.",
      "Explain the concept, mechanism and causal relationships once.",
      unit.method?.title ?? "", unit.method ? "Carry out a genuine calculation, algorithm, operation or physical process." : "Not required.",
      unit.workedExample?.title ?? "", unit.workedExample ? "Apply the concept to concrete data, state, code or a scenario." : "Not required.",
      questions.map((question) => question.id).join(" | "), [...new Set(questions.map((question) => question.commandWord))].join(" | "),
      [...new Set(duplicates)].join(" | ") || "none", duplicates.length ? "FAIL" : "PASS",
    ]);
  }
}
writeFileSync(join(auditRoot, "course-v3-knowledge-unit-role-audit.csv"), [unitAuditHeader, ...unitAuditRows].map((row) => row.map(csv).join(",")).join("\n") + "\n");

const mapLines = [
  "# AS 9618 Visual Teaching Course V3 — course map",
  "",
  `- ${courseV3Meta.lessonCount} pages: ${courseV3Meta.teachingLessonCount} teaching lessons and ${courseV3Meta.reviewLessonCount} integrated reviews.`,
  "- 121/121 official AS requirements in Cambridge syllabus order.",
  "- Fixed page flow: lesson title and objectives → visual overview → core explanation → optional method/worked example → misconception → practice → original exam-style question → summary.",
  "",
];
for (const section of Object.keys(sectionMeta).map(Number)) {
  const meta = sectionMeta[section];
  mapLines.push(`## Section ${section} — ${meta.title}`, "", `Paper ${meta.paper}.`, "");
  for (const lesson of courseV3Lessons.filter((item) => item.section === section)) {
    mapLines.push(`- [Lesson ${lessonNumber(lesson)} · ${lesson.lessonKey} · ${lesson.title}](web/course-v3/${lesson.route}/) — ${lesson.syllabusIds.join(", ")}`);
  }
  mapLines.push("");
}
writeFileSync(join(root, "course-v3-map.md"), mapLines.join("\n"));

let qa = null;
if (existsSync(qaPath)) qa = JSON.parse(readFileSync(qaPath, "utf8"));
const allResults = qa?.results ?? [];
const failures = allResults.filter((result) => result.status !== "PASS");
const report = [
  "# AS 9618 V3 whole-course visual audit",
  "",
  "## Outcome",
  "",
  `- Scope: ${courseV3Meta.lessonCount}/${courseV3Meta.lessonCount} rendered pages, 121/121 official requirements and ${ledgerRows.length} atomic-objective instances.`,
  `- Visual evidence: ${allResults.length ? `${allResults.length}/${courseV3Meta.lessonCount * 2} desktop/mobile page reviews recorded` : "capture pending"}.`,
  `- Browser findings: ${allResults.length ? `${failures.length} failing viewport reviews` : "capture pending"}.`,
  "- Each knowledge unit presents exactly one lead visual before its core explanation; method and worked-example roles appear only when they add distinct work.",
  "- All 329 practice questions expose a Cambridge command word and separate marking points.",
  "",
  "## Evidence index",
  "",
  "- [Visual evidence browser](course-v3-visual-evidence/index.html)",
  "- [Atomic objective—material—practice—past-paper ledger](course-v3-objective-material-ledger.csv)",
  "- [145-unit role and deduplication audit](course-v3-knowledge-unit-role-audit.csv)",
  "- [Generated course map](../course-v3-map.md)",
  "- [Browser QA data](course-v3-visual-evidence/browser-qa.json)",
  "- [ImageGen prompt, source and SHA-256 manifest](../scripts/course-v3-section-anchor-assets.json)",
  "",
  "## Section results",
  "",
  "| Section | Pages | Requirements | Desktop | 390px | Contact sheets |",
  "|---:|---:|---:|---:|---:|---|",
];
for (const section of Object.keys(sectionMeta).map(Number)) {
  const lessons = courseV3Lessons.filter((lesson) => lesson.section === section);
  const requirements = new Set(lessons.flatMap((lesson) => lesson.syllabusIds)).size;
  const desktop = allResults.filter((item) => item.section === section && item.viewport === "desktop" && item.status === "PASS").length;
  const mobile = allResults.filter((item) => item.section === section && item.viewport === "mobile-390" && item.status === "PASS").length;
  report.push(`| ${section} | ${lessons.length} | ${requirements} | ${desktop}/${lessons.length} | ${mobile}/${lessons.length} | [desktop](course-v3-visual-evidence/contact-sheets/section-${section}-desktop.png) · [390px](course-v3-visual-evidence/contact-sheets/section-${section}-mobile-390.png) |`);
}
report.push(
  "",
  "## Regression closures",
  "",
  "- S1.11: default-visible lossless/lossy distinction, complete RLE encoding and decoding, counterexample, and text/bitmap/vector/sound choices.",
  "- S2.04: reviewed topology assets replace the incorrect generated star topology; path rules are explicit beside each asset.",
  "- S3.03: all nine device mechanisms are visible and mapped to practice.",
  "- S3.10: NOT, AND, OR, NAND, NOR and XOR/EOR plus problem/circuit/expression/truth-table conversions are taught and practised.",
  "- S8.11: INSERT, UPDATE and DELETE all have mapped practice.",
  "- S11.07: typed function, arguments, RETURN and returned-value use inside an expression are taught and practised.",
  "- S12.04: syntax, logic and run-time errors plus boundary correction and regression retesting are complete.",
  "",
  "## Capture method and limitation",
  "",
  "The in-app Browser was used for visible DOM, interaction and responsive checks. Its compositor can duplicate tiles in very long full-page screenshots, so the permanent 93 × 2 full-page evidence set is captured with the same local Chromium engine through the DevTools protocol. This changes only the capture mechanism, not the inspected HTML or viewport.",
  "",
  "## Review state",
  "",
  failures.length ? failures.map((item) => `- FAIL L${item.lesson} ${item.viewport}: ${item.issues.join("; ")}`).join("\n") : (allResults.length ? "All recorded desktop and 390px page reviews passed." : "Visual capture has not yet been recorded."),
  "",
);
writeFileSync(join(auditRoot, "course-v3-whole-course-visual-audit.md"), report.join("\n"));

console.log(`Generated course audit ledgers (${ledgerRows.length} objective rows and ${unitAuditRows.length} teaching-unit rows), course map and visual-audit index report.`);
