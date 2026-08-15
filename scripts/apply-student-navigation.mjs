import fs from "node:fs";
import path from "node:path";
import { pageDefinitions, root } from "./stage6-qa-utils.mjs";

const homeLink = '        <a class="course-home-link" href="../">Course home</a>\n';
const actionPanel = '      <div class="action-panel" aria-label="Page controls">\n';

let changed = 0;

for (const definition of pageDefinitions.filter(({ kind }) => kind === "lesson")) {
  const file = path.join(root, definition.html);
  const source = fs.readFileSync(file, "utf8");
  const occurrences = source.split('class="course-home-link"').length - 1;

  if (occurrences === 1) continue;
  if (occurrences > 1) {
    throw new Error(`${definition.page}: duplicate course home links found`);
  }
  if (!source.includes(actionPanel)) {
    throw new Error(`${definition.page}: page controls container not found`);
  }

  fs.writeFileSync(file, source.replace(actionPanel, `${actionPanel}${homeLink}`));
  changed += 1;
}

console.log(`Student navigation updated: ${changed} lesson pages changed.`);
