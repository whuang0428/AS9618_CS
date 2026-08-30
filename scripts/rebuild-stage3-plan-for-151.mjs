import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = path.resolve(import.meta.dirname, "..");
let source = execFileSync("git", ["show", "aba418d^:scripts/remediation-v2-stage3-sequence-plan.mjs"], { cwd: root, encoding: "utf8" });

const shift = (value) => Number(value) >= 10 ? String(Number(value) + 1) : value;
source = source
  .replace(/\btake\((\d+)(?:,\s*(\d+))?/g, (match, donor, target) => `take(${shift(donor)}${target === undefined ? "" : `, ${shift(target)}`}`)
  .replace(/\b(focused|combine)\((\d+),/g, (match, name, lesson) => `${name}(${shift(lesson)},`)
  .replace("...stage3SequencedLessons, 137, 138", "...stage3SequencedLessons, 138, 139");

const originalSection1 = "  take(1), take(2), take(3), take(4), take(5), take(6), take(7), take(8), take(9), take(11), take(13),";
const replacementSection1 = `  take(1), take(2), take(3), take(4), take(5), take(6), take(7), take(8),
  focused(9, ["S1.08"], "Bitmap file-size calculations and metadata", [
    "For an uncompressed bitmap, pixel-data size in bits is width in pixels x height in pixels x colour depth in bits per pixel. Divide by 8 to convert bits to bytes. Use the units requested by the question.",
    "Bitmap metadata is stored separately from pixel values, commonly in a file header. Add header or metadata bytes only when their size is supplied; when a question says to ignore the header, calculate pixel data only.",
  ], "Calculate pixel data and then account for metadata", "A 640 x 480 bitmap using 24-bit colour stores 640 x 480 x 24 = 7,372,800 bits = 921,600 bytes of pixel data. With a supplied 54-byte header, the total is 921,654 bytes.", [
    qa("Calculate the pixel-data size of a 200 x 100 bitmap using 8-bit colour, in bytes.", "200 x 100 x 8 / 8 = 20,000 bytes."),
    qa("A bitmap has 60,000 bytes of pixel data and a supplied 54-byte header. What is its total uncompressed size?", "60,054 bytes."),
    qa("Why must a header not be invented in a file-size calculation?", "Its size depends on the file format; add it only when the question supplies the metadata size."),
  ], "A 1024 x 768 bitmap uses 16-bit colour and has a supplied 128-byte header. Calculate its pixel-data size and total uncompressed size in bytes.", [["M1", "1024 x 768 x 16 bits"], ["A1", "1,572,864 bytes of pixel data"], ["M1", "adds the supplied 128-byte header"], ["A1", "1,572,992 bytes total"]], "Do not multiply metadata by the number of pixels or add an assumed header size."),
  take(9, 10), take(11), take(13),`;

if (!source.includes(originalSection1)) throw new Error("Parent Section 1 plan signature was not found after renumbering");
source = source.replace(originalSection1, replacementSection1);
fs.writeFileSync(path.join(root, "scripts", "remediation-v2-stage3-sequence-plan.mjs"), source);
console.log("Rebuilt the 151-lesson Stage 3 plan with distinct donor and target lesson IDs.");
