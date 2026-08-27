import fs from "node:fs";

const source = JSON.parse(fs.readFileSync(new URL("./syllabus-coverage-contract.json", import.meta.url), "utf8"));

export const forbiddenSemanticPatterns = source.forbiddenSemanticPatterns.map((entry) => ({
  ...entry,
  pattern: new RegExp(entry.pattern, entry.flags),
}));

export const coverageContract = source;
