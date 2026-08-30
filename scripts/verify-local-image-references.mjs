import fs from "node:fs";
import path from "node:path";

import { pageDefinitions, root } from "./stage6-qa-utils.mjs";

const failures = [];
let referenceCount = 0;

for (const definition of pageDefinitions) {
  const absoluteHtml = path.join(root, definition.html);
  const html = fs.readFileSync(absoluteHtml, "utf8");
  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    referenceCount += 1;
    const tag = match[0];
    const source = tag.match(/\bsrc="([^"]+)"/i)?.[1] ?? "";
    const alt = tag.match(/\balt="([^"]*)"/i)?.[1] ?? "";
    if (!source || /^(?:data:|https?:)/i.test(source)) {
      failures.push(`${definition.page}: image source is missing or unexpectedly remote`);
      continue;
    }
    if (!alt.trim()) failures.push(`${definition.page}: ${source} has an empty alt attribute`);
    const cleanSource = source.split(/[?#]/, 1)[0];
    const absoluteAsset = path.resolve(path.dirname(absoluteHtml), cleanSource);
    if (!absoluteAsset.startsWith(`${root}${path.sep}`) || !fs.existsSync(absoluteAsset) || !fs.statSync(absoluteAsset).isFile()) {
      failures.push(`${definition.page}: local image does not exist: ${source}`);
      continue;
    }
    const bytes = fs.readFileSync(absoluteAsset);
    if (bytes.length < 4 || bytes[0] !== 0xff || bytes[1] !== 0xd8 || bytes.at(-2) !== 0xff || bytes.at(-1) !== 0xd9) {
      failures.push(`${definition.page}: local image is empty or not a complete JPEG: ${source}`);
    }
  }
}

if (referenceCount !== 787) failures.push(`Expected 787 local image references; found ${referenceCount}`);
if (failures.length) throw new Error(`Local image reference verification failed:\n${failures.slice(0, 30).join("\n")}`);
console.log(`Local image reference verification passed: ${referenceCount}/787 references exist, contain complete JPEG bytes and have non-empty alt text.`);
