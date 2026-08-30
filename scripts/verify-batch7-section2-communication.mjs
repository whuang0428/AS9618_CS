import fs from "node:fs";
import path from "node:path";

import { coverageContract } from "./syllabus-coverage-contract.mjs";
import { evaluateRequirement } from "./syllabus-coverage-evaluator.mjs";
import { loadAllQuestions } from "./ms-review-utils.mjs";

const root = path.resolve(import.meta.dirname, "..");
const failures = [];
const requirements = new Map(coverageContract.requirements.map((requirement) => [requirement.id, requirement]));
const questions = new Map(loadAllQuestions().map((question) => [question.id, question]));
const expect = (condition, message) => { if (!condition) failures.push(message); };
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");

function includesAll(text, terms, label) {
  const source = text.replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&amp;", "&").toLowerCase();
  for (const term of terms) expect(source.includes(term.toLowerCase()), `${label}: missing ${term}`);
}

function questionText(id) {
  const question = questions.get(id);
  expect(Boolean(question), `${id}: assessment question is missing`);
  return question ? [question.prompt, question.answer, ...question.points.flat(), ...question.guidance].join(" ") : "";
}

function sectionHtml(html, id) {
  const opening = new RegExp(`<section\\b[^>]*\\bid="${id}"[^>]*>`, "i").exec(html);
  if (!opening) return "";
  const tokens = /<section\b[^>]*>|<\/section>/gi;
  tokens.lastIndex = opening.index;
  let depth = 0;
  let match;
  while ((match = tokens.exec(html))) {
    if (match[0].startsWith("<section")) depth += 1;
    else if (--depth === 0) return html.slice(opening.index, tokens.lastIndex);
  }
  return "";
}

const scopedRequirements = Array.from({ length: 16 }, (_, index) => `S2.${String(index + 1).padStart(2, "0")}`);
for (const id of scopedRequirements) {
  const requirement = requirements.get(id);
  expect(Boolean(requirement), `${id}: contract row is missing`);
  if (!requirement) continue;
  const evaluation = evaluateRequirement(requirement);
  expect(evaluation.status === "Complete", `${id}: ${evaluation.messages.join("; ")}`);
  expect(requirement.evidenceReviewStatus === "Reviewed", `${id}: evidence mapping is not independently reviewed`);
  expect(!/^The contract wording integrates/.test(requirement.notes), `${id}: placeholder Notes text remains`);
}

const checks = [
  ["017", ["networking devices", "limited geographical area", "large geographical area", "client-server", "peer-to-peer", "thin client", "thick client"]],
  ["018", ["bus topology", "star topology", "mesh topology", "hybrid topology", "share one backbone", "central switch", "alternative routes"]],
  ["019", ["between two hosts", "packet", "source", "destination", "topology"]],
  ["020", ["public cloud", "private cloud", "wired network", "wireless network", "copper cable", "fibre-optic cable", "radio waves", "wifi", "microwave", "satellite"]],
  ["021", ["nic", "wnic", "wap", "switch", "server", "bridge", "repeater", "router", "routing information", "carrier sense multiple access", "collision detection", "random backoff", "real-time streaming", "on-demand streaming", "bit rate", "broadband", "world wide web", "internet", "modem", "pstn", "ipv4", "ipv6", "subnetting", "uniform resource locator", "dns"]],
];

for (const [lesson, terms] of checks) {
  const markdownName = fs.readdirSync(path.join(root, "lessons")).find((name) => name.startsWith(`${lesson}-`) && name.endsWith(".md"));
  const markdown = read(`lessons/${markdownName}`);
  const html = read(`web/lesson-${lesson}/index.html`);
  includesAll(markdown, terms, `L${lesson} Markdown`);
  includesAll(sectionHtml(html, "stage2-completion"), terms, `L${lesson} visible CORE teaching`);
  const practice = sectionHtml(html, "stage2-practice");
  expect(/data-delivery-role="CORE"/i.test(practice) && /data-classroom-activity="PRACTISE"/i.test(practice), `L${lesson}: Stage 2 practice is not CORE/PRACTISE`);
  expect(/Show answer|Show MS/i.test(practice), `L${lesson}: Stage 2 practice has no visible answer/MS disclosure`);
}

const assessmentChecks = [
  ["AQ021-Q3", ["star topology", "central switch", "failure"]],
  ["AQ026-Q1", ["modem", "dedicated line", "cell phone network"]],
  ["AQ026-Q5", ["real-time bit streaming", "on-demand bit streaming"]],
  ["L021-Q2", ["IPv4", "32-bit", "IPv6", "128-bit", "subnetting"]],
  ["L024-Q3", ["NIC", "WNIC", "wireless access point", "switch", "server"]],
  ["L024-Q4", ["modem", "PSTN", "dedicated line", "cell phone network"]],
  ["L025-Q5", ["public cloud", "private cloud", "regulated"]],
  ["L026-Q4", ["real-time bit streaming", "on-demand bit streaming", "broadband speed", "stream bit rate"]],
];
for (const [id, terms] of assessmentChecks) includesAll(questionText(id), terms, `${id} Section 2 assessment`);
expect(!/129-bit/i.test(questionText("L021-Q2")), "L021-Q2 must reject the incorrect 129-bit IPv6 address length");

const mutations = [
  ["S2.01", /\bWAN\b/gi],
  ["S2.02", /peer-to-peer/gi],
  ["S2.03", /thick client/gi],
  ["S2.04", /hybrid topology/gi],
  ["S2.05", /between two hosts/gi],
  ["S2.06", /private cloud/gi],
  ["S2.07", /wireless network/gi],
  ["S2.08", /satellite/gi],
  ["S2.09", /\brepeater\b/gi],
  ["S2.10", /routing information/gi],
  ["S2.11", /random backoff/gi],
  ["S2.12", /on-demand streaming/gi],
  ["S2.13", /World Wide Web/gi],
  ["S2.14", /\bPSTN\b/gi],
  ["S2.15", /\bIPv6\b/gi],
  ["S2.16", /Uniform Resource Locator/gi],
];
for (const [id, pattern] of mutations) {
  const mutation = evaluateRequirement(requirements.get(id), {
    lessonTransform: ({ markdown, html }) => ({
      markdown: markdown.replaceAll(pattern, "removed concept"),
      html: html.replaceAll(pattern, "removed concept"),
    }),
  });
  expect(mutation.status === "Partial", `mutation escaped: ${id} remained Complete after required teaching was removed`);
}

const assessmentMutation = evaluateRequirement(requirements.get("S2.14"), {
  questionTransform: (question) => ["L024-Q4", "AQ026-Q1"].includes(question.id)
    ? {
        ...question,
        prompt: question.prompt.replace(/modem|PSTN|dedicated line|cell phone network/gi, "connection"),
        answer: question.answer.replace(/modem|PSTN|dedicated line|cell phone network/gi, "connection"),
        points: question.points.map(([code, text]) => [code, text.replace(/modem|PSTN|dedicated line|cell phone network/gi, "connection")]),
      }
    : question,
});
expect(assessmentMutation.status === "Partial", "mutation escaped: removing required internet hardware from both assessment forms must fail S2.14");

const ledger = JSON.parse(read("audits/repair-batch-7-section2-communication.json"));
expect(ledger.status === "Resolved" && ledger.records.length === 16, "Batch 7 ledger must resolve exactly sixteen requirement records");
expect(ledger.records.every(({ status, confidence }) => status === "Resolved" && confidence === "High"), "Batch 7 ledger contains an unresolved or low-confidence record");

if (failures.length) {
  console.error(`Batch 7 Section 2 verification failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Batch 7 verification passed: sixteen Section 2 requirements are Complete, eight direct assessment checks pass and seventeen mutations are rejected.");
