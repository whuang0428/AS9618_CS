import { explanations } from "./stage10-explanations-data.mjs";

const layoutByKind = Object.freeze({
  mechanism: "Use an input → mechanism → output diagram with labelled components and directional arrows.",
  process: "Use a numbered left-to-right process with exactly three stages and a small worked state example.",
  comparison: "Use a balanced comparison layout with two or three clearly separated mechanisms and a concise decision summary.",
  tradeoff: "Use a cause-and-effect comparison that makes both the benefit and the cost visually explicit.",
  synthesis: "Use a central-system map that connects components, operations and observable consequences.",
});

export function infographicPrompt(item) {
  const exactText = [
    `Title: "${item.title}"`,
    `Panel 1 heading: "MECHANISM"`,
    `Panel 1 text: "${item.steps[0]}"`,
    `Panel 2 heading: "WHY"`,
    `Panel 2 text: "${item.steps[1]}"`,
    `Panel 3 heading: "RESULT"`,
    `Panel 3 text: "${item.steps[2]}"`,
    `Key point 1: "Analogy: ${item.analogy}"`,
    `Key point 2: "Boundary: ${item.boundary}"`,
  ].join("\n");

  return `Use case: scientific-educational
Asset type: landscape Cambridge AS Computer Science knowledge-point infographic for students aged 16–18
Input images: Image 1 is a style and layout reference only. Do not copy its CPU-specific content.
Primary request: create a precise academic infographic explaining ${item.title}. The illustration must visually model the stated mechanism rather than decorate the page.
Diagram logic: ${layoutByKind[item.kind]}
Content facts: ${item.steps.join(" ")} ${item.boundary}
Style/medium: match the reference's clean white academic handout, navy title, thin grey borders, restrained blue/green/orange section accents, crisp vector-like diagrams, tables or labelled components where useful
Composition/framing: 3:2 landscape; large title; one dominant diagram or three linked panels; small worked example or compact key-points box; strong reading order; generous but not excessive whitespace
Text (verbatim, render every line exactly and add no other prose):
${exactText}
Constraints: technically accurate; readable at 1400 pixels wide; arrows must point in the correct direction; keep labels horizontal; no logos, trademarks, watermark, decorative characters or unrelated objects; no invented technical terms
Avoid: toy-like 3D rendering, cartoons, cinematic scenes, photorealism, dense paragraphs, tiny text, spelling mistakes, duplicated labels, decorative clip art`;
}

export const infographicJobs = Object.freeze(explanations.map((item, index) => Object.freeze({
  index,
  lesson: item.lesson,
  targetId: item.targetId,
  filename: `stage10-lesson-${item.lesson}-${item.targetId}.jpg`,
  prompt: infographicPrompt(item),
})));

if (import.meta.url === `file://${process.argv[1]}`) {
  const start = Number.parseInt(process.argv[2] ?? "0", 10);
  const count = Number.parseInt(process.argv[3] ?? String(infographicJobs.length), 10);
  console.log(JSON.stringify(infographicJobs.slice(start, start + count)));
}
