import { readFileSync } from 'node:fs';

// Unaltered regions from the original QP and official MS; teaching commentary is separate.
export const section10ExtraPapers = JSON.parse(readFileSync(new URL('./course-v3-section10-extra-papers.json', import.meta.url), 'utf8'));
