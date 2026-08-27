import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import { explanationByKey } from "./stage10-explanations-data.mjs";
import { evaluateSemanticCalculation, semanticCalculations } from "./stage10-semantic-calculations.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contract = JSON.parse(fs.readFileSync(path.join(root, "scripts", "stage10-technical-visual-contract.json"), "utf8"));
const remediation = JSON.parse(fs.readFileSync(path.join(root, "audits", "repair-batch-2-technical-visuals.json"), "utf8"));
const failures = [];
const expect = (condition, message) => { if (!condition) failures.push(message); };
const normalize = (value) => String(value)
  .replace(/<[^>]+>/g, " ")
  .replaceAll("&lt;", "<")
  .replaceAll("&gt;", ">")
  .replaceAll("&quot;", '"')
  .replaceAll("&#39;", "'")
  .replaceAll("&amp;", "&")
  .replace(/\s+/g, " ")
  .trim();

expect(Object.keys(contract).sort().join("|") === "046/assembler|050/shifts", "Batch 2 contract must contain exactly the two approved technical visuals.");
expect(remediation.status === "Resolved" && remediation.records.length === 2, "Batch 2 remediation ledger must resolve exactly two visual records.");

const instructionCheck = semanticCalculations.find((item) => item.id === "CALC-073-INSTRUCTION-GROUPS");
const shiftCheck = semanticCalculations.find((item) => item.id === "CALC-074-BINARY-SHIFTS");
expect(Boolean(instructionCheck) && evaluateSemanticCalculation(instructionCheck), "Official instruction-group calculation contract failed.");
expect(Boolean(shiftCheck) && evaluateSemanticCalculation(shiftCheck), "Fixed-width shift calculation contract failed.");

if (instructionCheck) {
  const missingOpcode = structuredClone(instructionCheck);
  missingOpcode.groups["data movement"] = missingOpcode.groups["data movement"].filter((opcode) => opcode !== "MOV");
  expect(!evaluateSemanticCalculation(missingOpcode), "Mutation test failed: removing MOV must be rejected.");
}
if (shiftCheck) {
  const sevenBits = structuredClone(shiftCheck);
  sevenBits.examples[0].result = sevenBits.examples[0].result.slice(1);
  expect(!evaluateSemanticCalculation(sevenBits), "Mutation test failed: a seven-bit result must be rejected.");

  const nineBits = structuredClone(shiftCheck);
  nineBits.examples[1].result = `${nineBits.examples[1].result}0`;
  expect(!evaluateSemanticCalculation(nineBits), "Mutation test failed: a nine-bit result must be rejected.");

  const wrongOverflow = structuredClone(shiftCheck);
  wrongOverflow.examples.find((item) => item.name === "logical-left").overflow = false;
  expect(!evaluateSemanticCalculation(wrongOverflow), "Mutation test failed: unsigned logical-left overflow=false must be rejected.");
}

const shiftContract = contract["050/shifts"];
expect(shiftContract.width === 8, "Shift visual must declare an eight-bit fixed width.");
expect(!JSON.stringify(shiftContract).includes("Overflow: No"), "Ambiguous 'Overflow: No' wording must not return.");
for (const bits of [shiftContract.input, ...shiftContract.examples.map((item) => item.result)]) {
  expect(/^[01]{8}$/.test(bits), `Shift contract contains a non-eight-bit value: ${bits}`);
}

for (const key of Object.keys(contract)) {
  const item = explanationByKey[key];
  expect(Boolean(item), `${key}: maintained Stage 10 explanation is missing.`);
  if (!item) continue;
  expect(item.deliveryRole === "CORE" && item.classroomActivity === "TEACH", `${key}: repaired visual must remain CORE/TEACH.`);
  expect(item.title === contract[key].title, `${key}: maintained title differs from the rendered contract.`);
  const lesson = key.split("/")[0];
  const markdownName = fs.readdirSync(path.join(root, "lessons")).find((name) => name.startsWith(`${lesson}-`) && name.endsWith(".md"));
  const markdown = normalize(fs.readFileSync(path.join(root, "lessons", markdownName), "utf8"));
  const html = normalize(fs.readFileSync(path.join(root, `web/lesson-${lesson}/index.html`), "utf8"));
  expect(!html.includes("undefined:"), `${key}: accessible transcript contains an undefined label.`);
  for (const fact of item.transcript) {
    expect(markdown.includes(normalize(fact)), `${key}: Markdown is missing maintained fact: ${fact}`);
    expect(html.includes(normalize(fact)), `${key}: HTML is missing maintained fact: ${fact}`);
  }
}

const temporaryDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "as9618-batch2-"));
try {
  execFileSync("python3", [
    path.join(root, "scripts", "render-stage10-critical-repairs.py"),
    "--keys", "046/assembler,050/shifts",
    "--output-dir", temporaryDirectory,
  ], { cwd: root, stdio: "pipe" });
  for (const key of Object.keys(contract)) {
    const [lesson, target] = key.split("/");
    const filename = `stage10-lesson-${lesson}-${target}.jpg`;
    const expected = fs.readFileSync(path.join(temporaryDirectory, filename));
    const actual = fs.readFileSync(path.join(root, "web", "assets", "diagrams", "stage10-infographics", filename));
    expect(expected.equals(actual), `${key}: project asset differs from deterministic renderer output.`);
    expect(actual.length <= 550_000, `${key}: rendered asset exceeds the 550 KB Stage 10 budget.`);
    const ledgerRecord = remediation.records.find((record) => record.key === key);
    const digest = crypto.createHash("sha256").update(actual).digest("hex");
    expect(ledgerRecord?.sha256 === digest, `${key}: remediation ledger hash is stale.`);
    expect(ledgerRecord?.pass1?.startsWith("Passed") && ledgerRecord?.pass2?.startsWith("Passed"), `${key}: two visual review passes are not recorded.`);
  }
} finally {
  fs.rmSync(temporaryDirectory, { recursive: true, force: true });
}

if (failures.length) {
  console.error(`Batch 2 technical visual verification failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Batch 2 technical visual verification passed: official instruction groups, six eight-bit shifts, overflow contexts, deterministic pixels and four mutation tests.");
