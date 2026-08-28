import { normaliseQuestionPrompt } from "./cie-command-words.mjs";
import { actualCriticalFixture, evaluateCriticalSemanticControls } from "./remediation-v2-semantic-gate.mjs";
import { coverageContract } from "./syllabus-coverage-contract.mjs";
import { evaluateRequirement } from "./syllabus-coverage-evaluator.mjs";

const base = actualCriticalFixture();
const cases = [];
const mutate = (name, expectedId, edit) => cases.push({ name, expectedId, edit });

mutate("remove bus width from the performance title", "CRIT-L049-PERFORMANCE-FACTORS", (fixture) => { fixture.performance.title = fixture.performance.title.replace(/bus width/gi, "transfer path"); });
mutate("substitute word length in the performance visual", "CRIT-L049-PERFORMANCE-FACTORS", (fixture) => { fixture.performance.visual = fixture.performance.visual.replace(/bus width/gi, "word length"); });
mutate("pass MID STRING directly to UCASE in L107", "CRIT-L107-CHAR-FUNCTION-TYPE", (fixture) => { fixture.l107 += "\nCharacter <- UCASE(MID(Word, Index, 1))"; });
mutate("remove the SPLIT signature in L121", "CRIT-L121-PROVIDED-FUNCTIONS", (fixture) => { fixture.l121 = fixture.l121.replace(/FUNCTION\s+SPLIT\s*\([^\n<]*?RETURNS\s+ARRAY\s+OF\s+STRING/gi, "SPLIT supplied"); });
mutate("remove the STRING_TO_INTEGER signature in L121", "CRIT-L121-PROVIDED-FUNCTIONS", (fixture) => { fixture.l121 = fixture.l121.replace(/FUNCTION\s+STRING_TO_INTEGER\s*\([^\n<]*?RETURNS\s+INTEGER/gi, "STRING_TO_INTEGER supplied"); });
mutate("use LEFT without a supplied signature in L133", "CRIT-L133-PROVIDED-FUNCTION", (fixture) => { fixture.l133 += "\nPart <- LEFT(Word, 3)"; });
mutate("pass a double-quoted STRING literal to UCASE", "CRIT-L133-CHAR-LITERAL", (fixture) => { fixture.l133 += '\nLetter <- UCASE("y")'; });
mutate("pass an undeclared Answer value to UCASE", "CRIT-L133-CHAR-FUNCTION-TYPE", (fixture) => { fixture.l133 = fixture.l133.replace(/DECLARE\s+Answer\s*:\s*CHAR/gi, ""); });

const failures = [];
for (const test of cases) {
  const fixture = structuredClone(base);
  test.edit(fixture);
  const result = evaluateCriticalSemanticControls(fixture);
  if (!result.some(({ id }) => id === test.expectedId)) failures.push(`${test.name}: expected ${test.expectedId}`);
}

if (normaliseQuestionPrompt("StudentID, Name and Mark") !== "StudentID, Name and Mark") failures.push("Name identifier mutation: comma-delimited field name was rewritten");
if (normaliseQuestionPrompt("Name one suitable factor.") !== "Identify one suitable factor.") failures.push("Name command mutation: leading command was not calibrated");

{
  const requirement = structuredClone(coverageContract.requirements.find(({ id }) => id === "S1.01"));
  requirement.visualEvidence = [{ lesson: 11, visualId: "explanation-formula-img-1", sectionId: "explanation-formula", required: true, conceptGroups: [] }];
  const messages = evaluateRequirement(requirement).messages;
  if (!messages.some((message) => message.includes("target register is not CORE/TEACH")) || !messages.some((message) => message.includes("actual lesson section is not CORE/TEACH"))) failures.push("Optional visual mutation: register and live DOM mismatch was not rejected");
}

{
  const requirement = structuredClone(coverageContract.requirements.find(({ id }) => id === "S1.01"));
  requirement.firstUseReview.lesson = 2;
  const messages = evaluateRequirement(requirement).messages;
  if (!messages.some((message) => message.includes("precedes reviewed first use"))) failures.push("early CORE visual mutation: pre-first-use visual was not rejected");
}

if (failures.length) {
  console.error(`Stage 5 mutation suite failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log(`Stage 5 mutation suite passed: ${cases.length + 4} active negative/boundary controls were rejected or preserved as required.`);
