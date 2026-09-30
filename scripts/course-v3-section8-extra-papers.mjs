import { readFileSync } from 'node:fs';
// Original PDF regions, reviewed independently from the teacher explanations.
export const section8ExtraPapers = JSON.parse(readFileSync(new URL('./course-v3-section8-extra-papers.json', import.meta.url), 'utf8'));
