// Authored semantic blocks; coreExplanation remains a searchable plain-text view.
export const coreParagraph = (text, title) => ({ type: "paragraph", text, ...(title ? { title } : {}) });
export const coreList = (title, items) => ({ type: "list", title, items });
export const coreSteps = (title, items) => ({ type: "steps", title, items });
export const coreTable = (title, headers, rows) => ({ type: "table", title, headers, rows });

export function coreBlockTexts(blocks) {
  return blocks.map(block => {
    if (block.type === "paragraph") return block.text;
    if (block.type === "list" || block.type === "steps") return block.items.map(([label, text]) => `${label}: ${text}`).join(" ");
    if (block.type === "table") return block.rows.map(row => row.map((cell, i) => `${block.headers[i]}: ${cell}`).join("; ") + ".").join(" ");
    throw new Error(`Unknown core block type: ${block.type}`);
  });
}

export function validateCoreBlocks(unit) {
  if (!unit.coreBlocks) return [];
  const errors = [], check = (ok, message) => { if (!ok) errors.push(`${unit.unitKey ?? unit.heading}: ${message}`); };
  const text = value => typeof value === "string" && value.trim().length > 0;
  check(Array.isArray(unit.coreBlocks) && unit.coreBlocks.length > 0, "core blocks are empty");
  if (!Array.isArray(unit.coreBlocks)) return errors;
  for (const block of unit.coreBlocks) {
    if (!block || typeof block !== "object") { check(false, "invalid core block"); continue; }
    check(["paragraph", "list", "steps", "table"].includes(block.type), "unsupported core block");
    if (block.title !== undefined) check(text(block.title), "empty core heading");
    if (block.type === "paragraph") check(text(block.text), "empty core paragraph");
    if (["list", "steps"].includes(block.type)) check(text(block.title) && block.items?.length >= 2 && block.items.every(item => Array.isArray(item) && item.length === 2 && item.every(text)), "malformed core list or steps");
    if (block.type === "table") check(text(block.title) && block.headers?.length >= 2 && block.headers.every(text) && block.rows?.length >= 1 && block.rows.every(row => row.length === block.headers.length && row.every(cell => text(String(cell)))), "malformed core table");
  }
  if (!errors.length) check(JSON.stringify(coreBlockTexts(unit.coreBlocks)) === JSON.stringify(unit.coreExplanation), "core blocks differ from their searchable text");
  return errors;
}
