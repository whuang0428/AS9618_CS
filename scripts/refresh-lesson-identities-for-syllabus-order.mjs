import fs from "node:fs";
import path from "node:path";

import { stage3TitleByLesson } from "./remediation-v2-stage3-sequence-plan.mjs";

const root = path.resolve(import.meta.dirname, "..");
const contractPath = path.join(root, "scripts", "lesson-identity-contract.json");
const lessonsRoot = path.join(root, "lessons");
const contract = JSON.parse(fs.readFileSync(contractPath, "utf8"));

const slugify = (value) => value
  .toLowerCase()
  .replaceAll("&", " and ")
  .replace(/['’]/g, "")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "");

for (const identity of contract.lessons) {
  const title = stage3TitleByLesson[identity.lesson] ?? identity.title;
  const markdownFile = `${identity.id}-${slugify(title)}.md`;
  const currentPath = path.join(lessonsRoot, identity.markdownFile);
  const targetPath = path.join(lessonsRoot, markdownFile);
  if (currentPath !== targetPath) {
    if (!fs.existsSync(currentPath)) throw new Error(`Missing current Markdown source ${identity.markdownFile}`);
    if (fs.existsSync(targetPath)) throw new Error(`Refusing to overwrite ${markdownFile}`);
    fs.renameSync(currentPath, targetPath);
  }
  identity.title = title;
  identity.markdownFile = markdownFile;
}

fs.writeFileSync(contractPath, `${JSON.stringify(contract, null, 2)}\n`);
console.log(`Refreshed ${contract.lessons.length} canonical lesson identities from the reviewed official-order plan.`);
