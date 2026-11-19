// Original QP/MS regions and separately authored guidance for the three S8 checkpoints.
// sourcePdf paths are relative to the teacher's read-only Cambridge paper archive.
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const digest = bytes => createHash('sha256').update(bytes).digest('hex');
const canonical = value => Array.isArray(value) ? value.map(canonical) : value && typeof value === 'object' ? Object.fromEntries(Object.entries(value).sort(([a], [b]) => a.localeCompare(b)).map(([key, item]) => [key, canonical(item)])) : value;

export const section8NewPapers = JSON.parse(readFileSync(new URL('./course-v3-section8-new-papers.json', import.meta.url), 'utf8'));

for (const question of section8NewPapers) {
  if (question.extractReview?.status !== 'verified' || digest(JSON.stringify(canonical(question.cropSpec))) !== question.extractReview.cropSpecSha256) throw new Error(`Unreviewed Section 8 source: ${question.id}`);
  if (question.parts.reduce((total, part) => total + part.marks, 0) !== question.marks) throw new Error(`Inconsistent Section 8 marks: ${question.id}`);
  for (const kind of ['qp', 'ms']) {
    const extracts = question[kind].extracts;
    if (extracts.length !== question.cropSpec[kind].length) throw new Error(`Missing Section 8 extract: ${question.id} ${kind}`);
    extracts.forEach((extract, index) => {
      const [page, top, bottom] = question.cropSpec[kind][index];
      if (extract.page !== page || extract.bbox[1] !== top || extract.bbox[3] !== bottom) throw new Error(`Changed Section 8 crop: ${question.id} ${kind}`);
      const bytes = readFileSync(new URL('../web' + extract.asset, import.meta.url));
      if (digest(bytes) !== extract.sha256) throw new Error(`Changed Section 8 image: ${extract.asset}`);
      if (bytes.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a' || bytes.readUInt32BE(16) !== extract.width || bytes.readUInt32BE(20) !== extract.height) throw new Error(`Invalid Section 8 image: ${extract.asset}`);
    });
  }
}
