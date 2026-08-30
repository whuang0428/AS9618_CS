import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const failures = [];
const scriptExtensions = /\.(?:js|mjs|json|py)$/;
const literalPath = /(?:lessons\/\d{3}-[^"'`\s:,]+\.md|web\/lesson-\d{3}\/(?:index\.html|app\.js|style\.css)|web\/assets\/diagrams\/stage10-infographics\/stage10-lesson-\d{3}-[^"'`\s:,]+\.jpg)/g;

function filesBelow(relative) {
  const directory = path.join(root, relative);
  return fs.readdirSync(directory, { recursive: true })
    .map((entry) => path.join(directory, entry))
    .filter((file) => fs.statSync(file).isFile());
}

for (const file of filesBelow("scripts").filter((candidate) => scriptExtensions.test(candidate))) {
  const relative = path.relative(root, file).replaceAll(path.sep, "/");
  // This generator preserves the prose of the frozen baseline and explicitly
  // maps its historical pointers to current files before emitting the register.
  if (relative === "scripts/generate-scientific-audit.mjs") continue;
  const source = fs.readFileSync(file, "utf8");
  for (const match of source.matchAll(literalPath)) {
    if (!fs.existsSync(path.join(root, match[0]))) failures.push(`${relative}: missing literal source reference ${match[0]}`);
  }
}

function checkRegister(name, records) {
  for (const record of records) {
    for (const location of record.locations ?? []) {
      const relative = location.replace(/:\d+$/, "");
      if (/^(?:lessons|web|scripts|audits|assessments|resources)\//.test(relative)
        && !fs.existsSync(path.join(root, relative))) {
        failures.push(`${name}/${record.id ?? "unknown"}: missing registered source ${relative}`);
      }
    }
  }
}

for (const [name, selector] of [
  ["audits/remediation-v2-defects.json", (value) => value.issues],
  ["audits/scientific-defects.json", (value) => value.defects],
]) {
  const value = JSON.parse(fs.readFileSync(path.join(root, name), "utf8"));
  checkRegister(name, selector(value) ?? []);
}

if (failures.length) {
  console.error(`Current-source reference verification failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Current-source reference verification passed: executable checks and defect registers contain no renamed or missing lesson/page/visual pointers.");
