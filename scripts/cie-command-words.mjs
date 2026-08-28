export const officialCommandWords = Object.freeze([
  "analyse", "assess", "calculate", "comment", "compare", "complete", "consider", "contrast",
  "define", "demonstrate", "describe", "develop", "discuss", "draw", "evaluate", "examine",
  "explain", "give", "identify", "justify", "outline", "predict", "sketch", "state", "suggest",
  "summarise", "write",
]);

export const subjectOperationRequirements = Object.freeze({
  choose: Object.freeze(["S12.07"]),
  construct: Object.freeze(["S3.10"]),
  correct: Object.freeze(["S12.04"]),
  convert: Object.freeze(["S1.03"]),
  document: Object.freeze(["S8.03", "S9.07"]),
  implement: Object.freeze(["S11.01"]),
  locate: Object.freeze(["S12.04"]),
  perform: Object.freeze(["S1.04", "S1.05", "S1.08", "S4.15"]),
  produce: Object.freeze(["S8.04", "S9.01"]),
  select: Object.freeze(["S10.01", "S10.04"]),
  trace: Object.freeze(["S4.11", "S4.13"]),
  use: Object.freeze([
    "S1.01", "S1.11", "S3.10", "S4.07", "S4.14", "S6.07", "S6.08", "S8.02", "S8.03",
    "S4.15", "S9.02", "S9.04", "S9.08", "S9.09", "S10.01", "S10.03", "S10.04", "S10.10", "S11.03", "S11.04",
    "S11.06", "S11.08", "S12.02",
  ]),
});

const boundary = "(^|[.!?]\\s+|,\\s+|\\([a-z]\\)\\s*)";
const sentenceBoundary = "(^|[.!?;]\\s+|\\([a-z]\\)\\s*)";
const replaceCommand = (text, word, replacement) => text.replace(
  new RegExp(`${boundary}${word}\\b`, "gi"),
  (match, prefix) => `${prefix}${replacement}`,
);
const replaceSentenceCommand = (text, word, replacement) => text.replace(
  new RegExp(`${sentenceBoundary}${word}\\b`, "gi"),
  (match, prefix) => `${prefix}${replacement}`,
);

const numericConversion = /\b(?:binary|denary|hexadecimal|one['’]s[- ]complement|two['’]s[- ]complement)\b/i;
const assemblyTrace = /\b(?:LDM|LDD|LDI|LDX|LDR|MOV|STO|ADD|SUB|INC|DEC|JMP|CMP|CMI|JPE|JPN|IN|OUT|ACC)\b/;
const logicConstruction = /\b(?:logic|truth table|gate|Boolean|alarm)\b/i;

export function normaliseQuestionPrompt(original) {
  let prompt = String(original);
  prompt = prompt.replace(/\bDistinguish between\b/gi, "Compare");
  prompt = prompt.replace(/\bDistinguish\b/gi, "Compare");
  prompt = prompt.replace(/\bRecommend\b/gi, "Suggest");
  prompt = replaceCommand(prompt, "Choose", "Suggest");
  prompt = replaceCommand(prompt, "Classify", "Identify");
  // Name is also a common field/identifier. A comma is therefore not a safe
  // command boundary for this word (for example, "StudentID, Name and Mark").
  prompt = replaceSentenceCommand(prompt, "Name", "Identify");
  prompt = replaceCommand(prompt, "Rewrite", "Write");
  prompt = replaceCommand(prompt, "Declare", "Write declarations for");
  prompt = replaceCommand(prompt, "Create", "Develop");
  prompt = replaceCommand(prompt, "Improve", "Develop");
  prompt = replaceCommand(prompt, "Refine", "Develop");
  prompt = replaceCommand(prompt, "Design", "Develop");
  prompt = replaceCommand(prompt, "Produce", "Write");
  prompt = replaceCommand(prompt, "Show", "Demonstrate");
  prompt = replaceCommand(prompt, "Correct", "Write a corrected version of");
  prompt = replaceCommand(prompt, "Match", "Draw lines to match");
  prompt = replaceCommand(prompt, "Run-length encode", "Write the run-length encoding of");
  prompt = replaceCommand(prompt, "Decode", "Give the decoded form of");
  prompt = replaceCommand(prompt, "Interpret", "Give the denary value of");
  prompt = replaceCommand(prompt, "Add", "Calculate the sum of");
  prompt = prompt
    .replace(/\bImprove this answer\b/gi, "Develop this answer")
    .replace(/\bRewrite this\b/gi, "Write this")
    .replace(/\bRewrite it\b/gi, "Write it")
    .replace(/\bRewrite the answer\b/gi, "Write the answer")
    .replace(/\bname a suitable validation check\b/gi, "identify a suitable validation check")
    .replace(/\bcreate suitable test cases\b/gi, "develop suitable test cases");

  if (!numericConversion.test(prompt)) {
    prompt = prompt
      .replace(/(^|[.!?]\s+)Convert this Java-like fragment into Cambridge-style pseudocode:/gi, "$1Write this Java-like fragment in Cambridge-style pseudocode:")
      .replace(/(^|[.!?]\s+)Convert the following Java-support declarations to Cambridge-style pseudocode:/gi, "$1Write the following declarations in Cambridge-style pseudocode:")
      .replace(/(^|[.!?]\s+)Convert this Java loop into Cambridge-style pseudocode:/gi, "$1Write this Java loop in Cambridge-style pseudocode:")
      .replace(/(^|[.!?]\s+)Convert this flowchart decision to pseudocode:/gi, "$1Write pseudocode for this flowchart decision:")
      .replace(/(^|[.!?]\s+)Convert Java declaration ([\s\S]+?) into a Cambridge-style array declaration/gi, "$1Write a Cambridge-style array declaration corresponding to Java declaration $2")
      .replace(/(^|[.!?]\s+)Convert the vague requirement (.+?) into a measurable success criterion and an acceptance test\./gi, "$1Write a measurable success criterion and an acceptance test for the vague requirement $2.")
      .replace(/(^|[.!?]\s+)Convert (.+?) to (bytes|KiB|MiB|GiB)\./gi, "$1Calculate $2 in $3.");
  }

  if (!assemblyTrace.test(prompt)) {
    prompt = prompt
      .replace(/(^|[.!?]\s+|,\s+)Trace the values of\b/gi, "$1Complete a trace table showing the values of")
      .replace(/(^|[.!?]\s+|,\s+)Trace\b/gi, "$1Complete a trace table for");
  }
  if (!logicConstruction.test(prompt)) {
    prompt = prompt.replace(/(^|[.!?]\s+)Construct\b/gi, "$1Complete");
  }
  return prompt.replace(/\s{2,}/g, " ").trim();
}

const imperativePattern = (words) => new RegExp(`${boundary}(${words.join("|")})\\b`, "i");
const allOperations = Object.keys(subjectOperationRequirements);

export function classifyCommand(prompt, requirementId) {
  const text = String(prompt);
  const officialMatches = officialCommandWords
    .map((word) => ({ word, index: text.search(new RegExp(`\\b${word}\\b`, "i")) }))
    .filter(({ index }) => index >= 0)
    .sort((left, right) => left.index - right.index);
  const officialMatch = officialMatches[0];
  const operationMatch = imperativePattern(allOperations).exec(text);
  const candidates = [
    officialMatch && { kind: "official-command-word", word: officialMatch.word, index: officialMatch.index },
    operationMatch && { kind: "subject-content-operation", word: operationMatch[2].toLowerCase(), index: operationMatch.index },
  ].filter(Boolean).sort((left, right) => left.index - right.index);
  if (!candidates.length) return { status: "Blocked", reason: "no primary command or supported operation was found" };
  const primary = candidates[0];
  if (primary.kind === "subject-content-operation") {
    const allowed = subjectOperationRequirements[primary.word] ?? [];
    if (!allowed.includes(requirementId)) {
      return { status: "Blocked", ...primary, reason: `${primary.word} is not supported by ${requirementId}` };
    }
  }
  return { status: "Approved", ...primary };
}
