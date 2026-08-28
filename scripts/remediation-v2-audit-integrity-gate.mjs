import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import { coverageContract } from "./syllabus-coverage-contract.mjs";
import { containsGroup, lessonPaths, normaliseText, root } from "./syllabus-coverage-evaluator.mjs";

export const OFFICIAL_INVENTORY_PATH = path.join(root, "audits", "remediation-v2-official-as-source-inventory.json");
export const LOCKED_OFFICIAL_INVENTORY_HASH = "8b332c00bfa314e029ced00f86db0b7e9827aa038e9fcf2f33105c32e269a917";

const stableInventoryBasis = (items) => items.map((item) => Object.fromEntries(
  ["sourceId", "page", "section", "kind", "coverageRole", "column", "top", "text", "normalisedHash"].map((key) => [key, item[key]]),
));
const hashJson = (value) => crypto.createHash("sha256").update(JSON.stringify(value)).digest("hex");
const sourceNormalise = (value) => String(value)
  .replace(/[’‘`]/g, "'")
  .replace(/(\w)-\s+(?=\w)/g, "$1 ")
  .replace(/[^a-zA-Z0-9#+<>&']+/g, " ")
  .replace(/\s+/g, " ").trim().toLowerCase();

export function loadOfficialInventory() {
  return JSON.parse(fs.readFileSync(OFFICIAL_INVENTORY_PATH, "utf8"));
}

function claimCorpus(reference, kind) {
  const claims = kind === "candidate" ? reference.candidateStatements : reference.adjacentNotesAndGuidance;
  return sourceNormalise(claims.join(" "));
}

export function evaluateOfficialSourceContract(contract = coverageContract, inventory = loadOfficialInventory()) {
  const problems = [];
  const push = (id, detail, location = "audits/remediation-v2-official-as-source-inventory.json") => problems.push({ id, detail, location });
  const items = inventory.items ?? [];
  const bySourceId = new Map(items.map((item) => [item.sourceId, item]));
  const calculatedHash = hashJson(stableInventoryBasis(items));

  if (inventory.source?.sha256 !== contract.officialSource?.sha256) push("AUDIT-SOURCE-PDF-HASH", "official inventory and coverage contract do not use the same locked PDF");
  if (inventory.inventoryHash !== calculatedHash) push("AUDIT-SOURCE-INTERNAL-HASH", `inventory content hash is stale: expected ${calculatedHash}, found ${inventory.inventoryHash}`);
  if (inventory.inventoryHash !== LOCKED_OFFICIAL_INVENTORY_HASH) push("AUDIT-SOURCE-LOCK", `inventory differs from the rendered and reviewed Version 2 source lock ${LOCKED_OFFICIAL_INVENTORY_HASH}`);
  if (new Set(items.map(({ sourceId }) => sourceId)).size !== items.length) push("AUDIT-SOURCE-ID", "official source IDs are not unique");
  if (Object.keys(inventory.extraction?.pageTextSha256 ?? {}).length !== 18) push("AUDIT-SOURCE-PAGES", "official pages 14-31 do not all have extracted page hashes");

  const owners = new Map(items.map((item) => [item.sourceId, []]));
  for (const requirement of contract.requirements) {
    const reference = requirement.officialReference ?? {};
    const sourceIds = reference.sourceUnitIds;
    if (reference.sourceInventoryHash !== LOCKED_OFFICIAL_INVENTORY_HASH) {
      push("AUDIT-CONTRACT-SOURCE-LOCK", `${requirement.id} is not bound to the locked official inventory`, "scripts/syllabus-coverage-contract.json");
    }
    if (!Array.isArray(sourceIds) || sourceIds.length === 0) {
      push("AUDIT-CONTRACT-SOURCE-IDS", `${requirement.id} has no explicit official source-unit bindings`, "scripts/syllabus-coverage-contract.json");
      continue;
    }
    if (new Set(sourceIds).size !== sourceIds.length) push("AUDIT-CONTRACT-SOURCE-IDS", `${requirement.id} repeats a source-unit binding`, "scripts/syllabus-coverage-contract.json");
    const bound = [];
    for (const sourceId of sourceIds) {
      const item = bySourceId.get(sourceId);
      if (!item) {
        push("AUDIT-CONTRACT-SOURCE-ID", `${requirement.id} references missing source unit ${sourceId}`, "scripts/syllabus-coverage-contract.json");
        continue;
      }
      bound.push(item);
      owners.get(sourceId).push(requirement.id);
      if (item.section !== requirement.section) push("AUDIT-CONTRACT-SOURCE-SECTION", `${requirement.id} binds ${sourceId} from Section ${item.section}`, "scripts/syllabus-coverage-contract.json");
      if (!reference.pages?.includes(item.page)) push("AUDIT-CONTRACT-SOURCE-PAGE", `${requirement.id} binds ${sourceId} on p${item.page}, outside its declared pages ${reference.pages?.join(", ")}`, "scripts/syllabus-coverage-contract.json");
    }

    for (const kind of ["candidate", "note"]) {
      const corpus = claimCorpus(reference, kind);
      const sourceCorpus = sourceNormalise(bound.filter((item) => item.kind === kind).map((item) => item.text).join(" "));
      const claims = kind === "candidate" ? reference.candidateStatements ?? [] : reference.adjacentNotesAndGuidance ?? [];
      for (const claim of claims) if (!sourceCorpus.includes(sourceNormalise(claim))) {
        push("AUDIT-CONTRACT-PHANTOM-CLAIM", `${requirement.id} ${kind} claim is not present in its bound official source units: ${claim}`, "scripts/syllabus-coverage-contract.json");
      }
      for (const item of bound.filter((entry) => entry.kind === kind && entry.coverageRole === "claim")) {
        if (!corpus.includes(sourceNormalise(item.text))) {
          push("AUDIT-CONTRACT-PARTIAL-CLAIM", `${requirement.id} binds ${item.sourceId} but does not preserve its complete official wording`, "scripts/syllabus-coverage-contract.json");
        }
      }
    }
  }

  for (const item of items.filter(({ coverageRole }) => coverageRole === "claim")) {
    if ((owners.get(item.sourceId) ?? []).length === 0) push("AUDIT-SOURCE-UNMAPPED", `${item.sourceId} p${item.page} Section ${item.section} is not owned by any contract requirement: ${item.text}`);
  }
  return problems;
}

function openingAttributes(tag) {
  return {
    id: tag.match(/\bid="([^"]+)"/i)?.[1] ?? "",
    role: tag.match(/\bdata-delivery-role="([^"]+)"/i)?.[1] ?? "",
    activity: tag.match(/\bdata-classroom-activity="([^"]+)"/i)?.[1] ?? "",
  };
}

function orderedTopLevelSections(html) {
  const mainStart = html.search(/<main\b/i);
  const mainOpenEnd = mainStart >= 0 ? html.indexOf(">", mainStart) + 1 : 0;
  const mainEnd = mainStart >= 0 ? html.search(/<\/main>/i) : html.length;
  const body = html.slice(mainOpenEnd, mainEnd >= 0 ? mainEnd : html.length);
  const tokens = /<section\b[^>]*>|<\/section>/gi;
  const sections = [];
  const stack = [];
  let match;
  while ((match = tokens.exec(body))) {
    if (/^<section/i.test(match[0])) {
      const section = { ...openingAttributes(match[0]), start: match.index, openEnd: tokens.lastIndex, depth: stack.length };
      stack.push(section);
    } else {
      const section = stack.pop();
      if (section && section.depth === 0) {
        section.end = tokens.lastIndex;
        section.html = body.slice(section.start, section.end);
        section.words = normaliseText(section.html).split(" ").filter(Boolean).length;
        sections.push(section);
      }
    }
  }
  return { body, sections };
}

function sectionById(html, id) {
  const opening = new RegExp(`<section\\b[^>]*\\bid="${id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"[^>]*>`, "i").exec(html);
  if (!opening) return null;
  const tokens = /<section\b[^>]*>|<\/section>/gi;
  tokens.lastIndex = opening.index;
  let depth = 0;
  let firstTag = "";
  let match;
  while ((match = tokens.exec(html))) {
    if (/^<section/i.test(match[0])) { if (depth === 0) firstTag = match[0]; depth += 1; }
    else if (--depth === 0) return { ...openingAttributes(firstTag), start: opening.index, html: html.slice(opening.index, tokens.lastIndex) };
  }
  return null;
}

export function evaluatePedagogicalIntegrity(contract = coverageContract, htmlLoader = (lesson) => fs.readFileSync(lessonPaths(lesson).htmlPath, "utf8")) {
  const problems = [];
  const push = (id, detail, lesson, location = `web/lesson-${String(lesson).padStart(3, "0")}/index.html`) => problems.push({ id, detail, lesson, location });
  const teachingByLesson = new Map();
  for (const requirement of contract.requirements) {
    for (const lesson of requirement.teachingLessons ?? [requirement.firstTeachingEvidence?.lesson].filter(Boolean)) {
      if (!teachingByLesson.has(lesson)) teachingByLesson.set(lesson, []);
      teachingByLesson.get(lesson).push(requirement);
    }
  }

  for (const [lesson, teachingRequirements] of teachingByLesson) {
    const requirements = teachingRequirements.filter((requirement) => requirement.firstTeachingEvidence?.lesson === lesson);
    const html = htmlLoader(lesson);
    const { body, sections } = orderedTopLevelSections(html);
    const substantive = sections.filter(({ words }) => words >= 12);
    const firstCore = substantive.find(({ role }) => role === "CORE");
    const firstOptional = substantive.find(({ role }) => ["OPTIONAL", "AFTER_CLASS"].includes(role));
    if (!firstCore) {
      push("AUDIT-LESSON-NO-EARLY-CORE", `L${String(lesson).padStart(3, "0")} has no substantive top-level CORE section`, lesson);
      continue;
    }
    if (substantive[0] !== firstCore) push("AUDIT-LESSON-CORE-NOT-FIRST", `the first substantive teaching block is ${substantive[0].role || "unclassified"} #${substantive[0].id || "<no-id>"}, not CORE`, lesson);
    if (firstOptional && firstOptional.start < firstCore.start) push("AUDIT-LESSON-OPTIONAL-BEFORE-CORE", `Optional/after-class #${firstOptional.id} precedes the first CORE block #${firstCore.id}`, lesson);
    const laterCore = firstOptional && substantive.find(({ role, start }) => role === "CORE" && start > firstOptional.start);
    if (laterCore) push("AUDIT-LESSON-CORE-AFTER-OPTIONAL", `CORE #${laterCore.id} appears after Optional/after-class #${firstOptional.id}`, lesson);
    const firstCoreRatio = firstCore.start / Math.max(body.length, 1);
    if (firstCoreRatio > 0.4) push("AUDIT-LESSON-CORE-BURIED", `first CORE starts at ${(firstCoreRatio * 100).toFixed(1)}% of the lesson source`, lesson);

    const declaredFirstIds = new Set(requirements.map(({ firstTeachingEvidence }) => firstTeachingEvidence.sectionId));
    if (requirements.length && !declaredFirstIds.has(firstCore.id)) push("AUDIT-LESSON-FIRST-CORE-UNOWNED", `first CORE #${firstCore.id} is not a declared first-teaching section for this lesson`, lesson);
    for (const requirement of requirements) {
      const evidence = sectionById(html, requirement.firstTeachingEvidence.sectionId);
      if (!evidence) {
        push("AUDIT-FIRST-TEACHING-MISSING", `${requirement.id} first teaching #${requirement.firstTeachingEvidence.sectionId} is missing`, lesson);
        continue;
      }
      if (evidence.role !== "CORE" || evidence.activity !== "TEACH") push("AUDIT-FIRST-TEACHING-ROLE", `${requirement.id} first teaching is not CORE/TEACH`, lesson);
      for (const group of requirement.firstTeachingEvidence.conceptGroups ?? []) {
        if (!containsGroup(evidence.html, group)) push("AUDIT-FIRST-TEACHING-CONCEPT", `${requirement.id} first teaching omits ${group.join(" | ")}`, lesson);
      }
    }
  }
  return problems;
}

export function evaluateAuditIntegrity(contract = coverageContract, inventory = loadOfficialInventory(), htmlLoader) {
  const officialSourceProblems = evaluateOfficialSourceContract(contract, inventory);
  const pedagogicalProblems = evaluatePedagogicalIntegrity(contract, htmlLoader);
  return {
    schemaVersion: 1,
    status: officialSourceProblems.length || pedagogicalProblems.length ? "Blocked" : "Ready",
    officialInventoryHash: inventory.inventoryHash,
    officialSourceProblems,
    pedagogicalProblems,
    problemCount: officialSourceProblems.length + pedagogicalProblems.length,
  };
}
