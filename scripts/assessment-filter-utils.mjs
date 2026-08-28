import { officialCommandWords } from "./cie-command-words.mjs";

export const commandWords = officialCommandWords;

export function commandWord(prompt) {
  const matches = commandWords
    .map((word) => ({ word, index: prompt.search(new RegExp(`\\b${word}\\b`, "i")) }))
    .filter(({ index }) => index >= 0)
    .sort((left, right) => left.index - right.index);
  if (!matches.length && /(?:^|[.!?]\s+|\([a-z]\)\s*)(?:convert|construct|trace|use|choose|correct|document|implement|locate|perform|produce|select)\b/i.test(prompt)) return "subject-operation";
  if (!matches.length) throw new Error(`Unknown assessment command word: ${prompt}`);
  return matches[0].word;
}

export function expandedSections(references) {
  const sections = [];
  for (const reference of references) {
    const range = String(reference).match(/^(\d+)-(\d+)$/);
    if (range) {
      for (let section = Number(range[1]); section <= Number(range[2]); section += 1) sections.push(section);
    } else {
      sections.push(Number.parseInt(reference, 10));
    }
  }
  return [...new Set(sections)];
}

export function paperFor(entry) {
  return [...new Set(expandedSections(entry.sections).map((section) => section <= 8 ? "1" : "2"))].join(",");
}

export function paperLabel(entry) {
  const papers = paperFor(entry).split(",");
  return papers.length === 1 ? `Paper ${papers[0]}` : `Papers ${papers.join(" and ")}`;
}
