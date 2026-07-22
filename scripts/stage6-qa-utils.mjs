import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export const pageDefinitions = [
  { page: "index", kind: "hub", html: "web/index.html" },
  { page: "assessments", kind: "hub", html: "web/assessments/index.html" },
  { page: "resources", kind: "hub", html: "web/resources/index.html" },
  ...Array.from({ length: 150 }, (_, index) => {
    const lesson = String(index + 1).padStart(3, "0");
    return { page: `lesson-${lesson}`, kind: "lesson", html: `web/lesson-${lesson}/index.html` };
  }),
];

export function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

export function pageAssets(definition) {
  const html = read(definition.html);
  const directory = path.dirname(definition.html);
  const references = [
    ...html.matchAll(/<link\b[^>]*\bhref="([^"]+)"[^>]*>/g),
    ...html.matchAll(/<script\b[^>]*\bsrc="([^"]+)"[^>]*>/g),
  ].map((match) => match[1]);

  const assets = references
    .filter((reference) => !/^(?:[a-z]+:|#|\/\/)/i.test(reference))
    .map((reference) => path.normalize(path.join(directory, reference.split(/[?#]/, 1)[0])))
    .filter((relativePath) => fs.existsSync(path.join(root, relativePath)));

  return [definition.html, ...new Set(assets)].sort();
}

export function pageHash(definition) {
  const hash = crypto.createHash("sha256");
  for (const relativePath of pageAssets(definition)) {
    hash.update(relativePath);
    hash.update("\0");
    hash.update(read(relativePath));
    hash.update("\0");
  }
  return hash.digest("hex");
}

