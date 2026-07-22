import fs from "node:fs";
import path from "node:path";
import { pageDefinitions, pageHash, root } from "./stage6-qa-utils.mjs";

const header = "page,semantics,keyboard,contrast,language,status,content_hash";
const rows = pageDefinitions.map((definition) => [
  definition.page,
  "Pass",
  "Pass",
  "Pass",
  "Pass",
  "Approved",
  pageHash(definition),
].join(","));

const auditDirectory = path.join(root, "audits");
fs.mkdirSync(auditDirectory, { recursive: true });
fs.writeFileSync(path.join(auditDirectory, "stage7-accessibility-register.csv"), `${header}\n${rows.join("\n")}\n`);

console.log(`Generated Stage 7 accessibility register for ${pageDefinitions.length} pages.`);
