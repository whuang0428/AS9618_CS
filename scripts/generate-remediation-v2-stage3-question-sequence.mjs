import fs from "node:fs";
import path from "node:path";
import { buildStage3QuestionSequenceRegister } from "./remediation-v2-stage3-gate.mjs";
const root = path.resolve(import.meta.dirname, "..");
const register = buildStage3QuestionSequenceRegister();
fs.writeFileSync(path.join(root, "audits", "remediation-v2-stage3-question-sequence.json"), `${JSON.stringify(register, null, 2)}\n`);
console.log(`Generated Stage 3 question sequence register: ${register.questionCount} questions, ${register.formalCount} formal, ${register.optionalCount} optional, ${register.violationCount} before-CORE violation(s).`);
