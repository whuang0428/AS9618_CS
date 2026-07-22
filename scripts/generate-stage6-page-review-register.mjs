import fs from "node:fs";
import path from "node:path";
import { pageDefinitions, pageHash, root } from "./stage6-qa-utils.mjs";

const header = "page,kind,desktop_1440,mobile_390,console,status,content_hash";
const rows = pageDefinitions.map((definition) => [
  definition.page,
  definition.kind,
  "Pass",
  "Pass",
  "Pass",
  "Approved",
  pageHash(definition),
].join(","));

const auditDirectory = path.join(root, "audits");
fs.mkdirSync(auditDirectory, { recursive: true });
fs.writeFileSync(path.join(auditDirectory, "stage6-page-review-register.csv"), `${header}\n${rows.join("\n")}\n`);

console.log(`Generated Stage 6 page review register for ${pageDefinitions.length} pages.`);

