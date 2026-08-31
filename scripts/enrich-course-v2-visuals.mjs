import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const legacyRef = "559eb16";
const contentPath = path.join(root, "scripts", "course-v2-content.json");
const content = JSON.parse(fs.readFileSync(contentPath, "utf8"));
const overrides = JSON.parse(fs.readFileSync(path.join(root, "scripts", "course-v2-visual-overrides.json"), "utf8"));
const syllabus = JSON.parse(fs.readFileSync(path.join(root, "scripts", "syllabus-coverage-contract.json"), "utf8"));
const requirementById = new Map(syllabus.requirements.map((requirement) => [requirement.id, requirement]));
const legacyIdentity = JSON.parse(execFileSync("git", ["show", `${legacyRef}:scripts/lesson-identity-contract.json`], { cwd: root, encoding: "utf8" }));
const legacyByNumber = new Map(legacyIdentity.lessons.map((lesson) => [lesson.lesson, lesson]));

const stopwords = new Set("a an and are as at be been by can data describe different each explain for from give how identify in including is it its may of on one or other show state system systems that the their these this to two understand understanding use used using when where which with write method methods lesson section question exam core required".split(" "));

function normalise(value) {
  return String(value ?? "")
    .toLowerCase()
    .replaceAll("’", "'")
    .replace(/[^a-z0-9+#' ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokens(value) {
  const stem = (token) => token
    .replace(/ies$/, "y")
    .replace(/(?:ing|ers|er|ed|es)$/, "")
    .replace(/s$/, "");
  return new Set(normalise(value).split(" ").filter((token) => token.length > 2 && !stopwords.has(token)).map(stem).filter((token) => token.length > 2));
}

function relevance(text, focus) {
  const left = tokens(text);
  const right = tokens(focus);
  let score = 0;
  for (const token of left) if (right.has(token)) score += token.length > 7 ? 2 : 1;
  return score;
}

function similarity(left, right) {
  const a = tokens(left);
  const b = tokens(right);
  if (!a.size || !b.size) return 0;
  let overlap = 0;
  for (const token of a) if (b.has(token)) overlap += 1;
  return overlap / new Set([...a, ...b]).size;
}

function stripMarkdown(value) {
  return String(value ?? "")
    .replace(/<!--[^]*?-->/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`>#]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function readLegacyLesson(oldLesson) {
  const entry = legacyByNumber.get(oldLesson);
  if (!entry) return "";
  return execFileSync("git", ["show", `${legacyRef}:lessons/${entry.markdownFile}`], {
    cwd: root,
    encoding: "utf8",
    maxBuffer: 16 * 1024 * 1024,
  });
}

function extractVisuals(oldLesson) {
  const source = readLegacyLesson(oldLesson);
  return [...source.matchAll(/### ([^\n]+)\n\n([\s\S]*?)(?=\n### |<!-- stage10-explanations:end -->)/g)]
    .map((match) => {
      const image = match[2].match(/stage10-infographics\/([^`)\s]+)/)?.[1];
      const altFacts = match[2]
        .split("\n")
        .filter((line) => /^\d+\.\s+/.test(line.trim()))
        .map((line) => stripMarkdown(line.replace(/^\d+\.\s+/, "")))
        .filter(Boolean)
        .slice(0, 8);
      if (!image || !altFacts.length) return null;
      const visual = {
        title: stripMarkdown(match[1]),
        path: `assets/diagrams/stage10-infographics/${image}`,
        altFacts,
        sourceOldLesson: oldLesson,
      };
      return fs.existsSync(path.join(root, "web", visual.path)) ? visual : null;
    })
    .filter(Boolean);
}

const visualsByOldLesson = new Map();
for (const oldLesson of legacyByNumber.keys()) {
  visualsByOldLesson.set(oldLesson, extractVisuals(oldLesson));
}
const allLegacyVisuals = [...visualsByOldLesson.values()].flat();

function materialKind(visual) {
  const text = normalise(`${visual.title} ${visual.altFacts.join(" ")}`);
  if (/compare|contrast|difference|versus|choose|which|decision|match|classify|sorter|ranker/.test(text)) return "comparison";
  if (/worked|example|trace|calculate|convert|lab|tester|scenario|predict|explorer|reader|quiz|try/.test(text)) return "example";
  if (/flow|cycle|stage|sequence|process|lifecycle|pipeline|step by step|how it works|from .* to/.test(text)) return "process";
  if (/purpose|why|application|real world|analogy|like |story|use case/.test(text)) return "analogy";
  return "diagram";
}

function genericPenalty(visual, lesson) {
  if (lesson.focus === "integrated-review") return 0;
  return /section \d+ (?:topic |knowledge )?map|mini assessment|retrieval grid|method bank|review sprint|question triage|precision rules|smallest frame/i.test(visual.title) ? 14 : 0;
}

function oldSection(oldLesson) {
  const ranges = [[1, 16], [17, 27], [28, 41], [42, 52], [53, 62], [63, 72], [73, 78], [79, 90], [99, 113], [114, 126], [127, 142], [143, 147]];
  const index = ranges.findIndex(([start, end]) => oldLesson >= start && oldLesson <= end);
  return index >= 0 ? index + 1 : null;
}

function uniqueVisuals(visuals) {
  const byPath = new Map();
  for (const visual of visuals) {
    if (!byPath.has(visual.path)) byPath.set(visual.path, visual);
  }
  return [...byPath.values()];
}

function matchesTerm(text, term) {
  const normalisedText = ` ${normalise(text)} `;
  const normalisedTerm = normalise(term);
  return normalisedTerm.length > 0 && normalisedText.includes(` ${normalisedTerm} `);
}

function groupHits(visual, requiredGroups) {
  const text = `${visual.title} ${visual.altFacts.join(" ")}`;
  return requiredGroups.filter((group) => group.some((term) => matchesTerm(text, term))).length;
}

function brief(value, maximumWords = 24) {
  const words = String(value ?? "").split(/\s+/).filter(Boolean);
  return words.length <= maximumWords ? words.join(" ") : `${words.slice(0, maximumWords).join(" ")}…`;
}

const materialTitleOverrides = {
  "S2.05": "Packet paths in bus, star, mesh and hybrid networks",
  "S2.14": "Modems and internet connection methods",
  "S2.15": "IPv4 and IPv6 addresses",
  "S3.04": "Buffers between different-speed devices",
  "S4.01": "Von Neumann stored-program architecture",
  "S4.02": "General-purpose and special-purpose processors",
  "S4.09": "Assembly language and machine code",
  "S4.10": "Two-pass assembler stages",
  "S6.02": "Protecting computer systems and data",
  "S7.01": "Professional ethics and its purpose",
  "S7.02": "Professional bodies: BCS and IEEE",
  "S7.03": "Ethical and unethical choices",
  "S8.06": "DBMS developer and user interfaces",
  "S9.04": "Meaningful identifiers",
  "S9.07": "Structured English, flowcharts and pseudocode",
  "S9.08": "Stepwise refinement",
  "S10.08": "Abstract data types",
  "S10.10": "Adding, editing and deleting ADT items",
  "S11.03": "Built-in and string functions",
  "S12.02": "Structure charts and module parameters",
  "S12.03": "State-transition diagrams",
  "S12.04": "Logic and runtime errors",
  "S12.06": "Test strategies and test plans",
  "S12.09": "Analysing and amending an existing program",
};

const concreteCueOverrides = {
  "S2.03": "A school computer room may use thin clients for central updates, but a server or network failure then affects the whole room.",
  "S2.04": "In a star network, one broken cable isolates one device; a failed central switch can disconnect every attached device.",
  "S2.05": "In a mesh, a packet can take another route after a link fails; on a bus, every device shares the same backbone.",
  "S2.11": "If two Ethernet stations transmit together, they detect the collision, stop, wait different random times, then sense and retry.",
  "S2.12": "A 5 Mbit/s video cannot play continuously over a stable 3 Mbit/s link; a starting buffer only delays the shortage.",
  "S2.14": "A home modem adapts signals for its access link; a business may pay for a dedicated connection, while a phone uses a cellular network.",
  "S2.15": "192.0.2.25 is written as IPv4; 2001:db8::25 is written as IPv6. The address identifies a network interface, not a human user.",
  "S3.07": "A one-time configuration may use PROM; UV-erasable lab firmware may use EPROM; updateable device firmware commonly uses EEPROM.",
  "S4.06": "Use USB for a keyboard, HDMI for digital audio/video to a monitor, and VGA only for analogue video on older displays.",
  "S7.02": "A BCS or IEEE member can use its code and professional guidance when an employer asks them to conceal a safety risk.",
};

function materialTitle(point) {
  if (point.sourceOldLesson) return brief(point.title, 12);
  if (materialTitleOverrides[point.id]) return materialTitleOverrides[point.id];
  const excluded = /^(?:ignore|given application|given task|example|examples)$/i;
  const terms = point.requiredGroups
    .map((group) => brief(group[0], 6))
    .filter((term) => !excluded.test(term))
    .slice(0, 4)
    .map((term) => `${term.charAt(0).toUpperCase()}${term.slice(1)}`);
  return terms.join(" · ") || brief(point.title, 12);
}

function visualMode(point) {
  const text = normalise(`${point.title} ${point.notes}`);
  if (/compare|difference|distinguish|benefit|drawback|advantage|disadvantage/.test(text)) return "comparison";
  if (/justify|choose|select|appropriate|given situation|given task/.test(text)) return "decision";
  if (/stage|cycle|process|perform|convert|construct|transmit|operation|algorithm/.test(text)) return "process";
  if (/component|part|structure|hardware|feature|type|element|field|register/.test(text)) return "structure";
  return "concept";
}

function explanationSteps(point, lesson) {
  const focus = `${point.title} ${point.notes} ${point.requiredGroups.flat().join(" ")}`;
  const fragments = [point.notes, ...lesson.coreFacts, lesson.workedExample]
    .flatMap((value) => String(value).split(/(?<=[.!?])\s+|;\s+|:\s+/))
    .map((value) => value.trim().replace(/[.!?]+$/, ""))
    .filter((value) => value.split(/\s+/).length >= 5)
    .map((value) => ({ value, score: relevance(value, focus) }))
    .filter((item) => item.score > 0)
    .sort((left, right) => right.score - left.score || left.value.length - right.value.length);
  const chosen = [];
  for (const fragment of fragments) {
    const shortened = brief(fragment.value, 26);
    if (!chosen.some((value) => similarity(value, shortened) > 0.72)) chosen.push(shortened);
    if (chosen.length === 3) break;
  }
  const fallbacks = [
    `Identify ${point.requiredGroups.slice(0, 4).map((group) => group[0]).join(", ")}.`,
    brief(point.notes, 26),
    brief(lesson.workedExample, 26),
  ];
  for (const fallback of fallbacks) {
    if (fallback && !chosen.includes(fallback)) chosen.push(fallback);
    if (chosen.length === 3) break;
  }
  return chosen.slice(0, 3);
}

function concreteCue(point, lesson, cueVisual) {
  if (concreteCueOverrides[point.id]) return concreteCueOverrides[point.id];
  const focus = `${point.title} ${point.notes} ${point.requiredGroups.flat().join(" ")}`;
  const candidates = [
    ...(cueVisual?.altFacts ?? []),
    ...lesson.coreFacts,
    ...String(lesson.workedExample).split(/(?<=[.!?])\s+|\s+\/\s+|:\s+/),
  ]
    .map((value) => value.trim())
    .filter(Boolean)
    .map((value) => ({ value, score: relevance(value, focus) }))
    .sort((left, right) => right.score - left.score || left.value.length - right.value.length);
  return brief(candidates[0]?.score > 0 ? candidates[0].value : point.notes, 30);
}

function selectMaterials({ lesson, point, candidates, targetCount, usedPaths, overridePaths }) {
  const focus = [point.title, point.notes, ...point.requiredGroups.flat()].join(" ");
  const scored = candidates
    .map((visual) => {
      const semanticScore = relevance(visual.title, focus) * 6
        + relevance(visual.altFacts.join(" "), focus) * 2
        + groupHits(visual, point.requiredGroups) * 5;
      return {
        ...visual,
        kind: materialKind(visual),
        semanticScore,
        score: semanticScore
        + (lesson.sourceOldLessons.includes(visual.sourceOldLesson) ? 8 : 0)
        + (point.sourceOldLesson === visual.sourceOldLesson ? 18 : 0)
        + (overridePaths.has(visual.path) ? 16 : 0)
        - (usedPaths.has(visual.path) ? 10 : 0)
        - genericPenalty(visual, lesson),
      };
    })
    .filter((visual) => (point.sourceOldLesson === visual.sourceOldLesson || (visual.semanticScore >= 12 && groupHits(visual, point.requiredGroups) > 0)) && visual.score >= 3)
    .sort((left, right) => right.score - left.score || left.sourceOldLesson - right.sourceOldLesson || left.title.localeCompare(right.title));

  const selected = [];
  while (selected.length < targetCount) {
    const usedSources = new Set(selected.map((visual) => visual.sourceOldLesson));
    const usedKinds = new Set(selected.map((visual) => visual.kind));
    const coveredGroups = new Set(selected.flatMap((visual) => point.requiredGroups
      .map((group, index) => group.some((term) => matchesTerm(`${visual.title} ${visual.altFacts.join(" ")}`, term)) ? index : null)
      .filter((index) => index !== null)));
    const next = scored
      .filter((candidate) => !selected.some((visual) => visual.path === candidate.path))
      .map((candidate) => ({
        candidate,
        diversityScore: candidate.score
          + (usedKinds.has(candidate.kind) ? 0 : 8)
          + (usedSources.has(candidate.sourceOldLesson) ? 0 : 3)
          + point.requiredGroups.filter((group, index) => !coveredGroups.has(index) && group.some((term) => matchesTerm(`${candidate.title} ${candidate.altFacts.join(" ")}`, term))).length * 12
          - Math.max(0, ...selected.map((visual) => similarity(`${candidate.title} ${candidate.altFacts.join(" ")}`, `${visual.title} ${visual.altFacts.join(" ")}`))) * 8,
      }))
      .sort((left, right) => right.diversityScore - left.diversityScore || right.candidate.score - left.candidate.score)[0]?.candidate;
    if (!next) break;
    selected.push(next);
  }

  for (const visual of selected) usedPaths.add(visual.path);
  return selected.map(({ score, semanticScore, ...visual }) => visual);
}

for (const lesson of content.lessons) {
  const override = overrides.lessons[lesson.id] ?? [];
  const overridePaths = new Set(override.map((visual) => visual.path));
  const sourceVisuals = lesson.sourceOldLessons.flatMap((oldLesson) => visualsByOldLesson.get(oldLesson) ?? []);
  const sectionVisuals = allLegacyVisuals.filter((visual) => oldSection(visual.sourceOldLesson) === lesson.section);
  const reviewVisuals = allLegacyVisuals.filter((visual) => lesson.paper === 1
    ? visual.sourceOldLesson >= 91 && visual.sourceOldLesson <= 98
    : visual.sourceOldLesson >= 148);
  const candidates = uniqueVisuals([...override, ...sourceVisuals, ...(lesson.focus === "integrated-review" ? reviewVisuals : sectionVisuals)]);
  const usedPaths = new Set();

  const points = lesson.focus === "integrated-review"
    ? lesson.sourceOldLessons.map((sourceOldLesson) => {
        const legacyLesson = legacyByNumber.get(sourceOldLesson);
        return {
          id: `R${lesson.id}.${String(sourceOldLesson).padStart(3, "0")}`,
          title: legacyLesson?.title ?? `Review cluster ${sourceOldLesson}`,
          notes: "Use the diagrams to retrieve the method, compare similar ideas and correct one typical error.",
          requiredGroups: [[legacyLesson?.title ?? `review ${sourceOldLesson}`]],
          sourceOldLesson,
        };
      })
    : lesson.syllabusIds.map((id) => {
        const requirement = requirementById.get(id);
        if (!requirement) throw new Error(`Missing syllabus requirement ${id}`);
        return {
          id,
          title: requirement.requirement,
          notes: requirement.notes,
          requiredGroups: requirement.requiredGroups,
        };
      });

  lesson.knowledgePoints = points.map((point) => {
    const targetCount = lesson.focus === "integrated-review"
      ? 3
      : Math.min(6, Math.max(3, Math.ceil(point.requiredGroups.length / 3) + 2));
    const visuals = selectMaterials({ lesson, point, candidates, targetCount, usedPaths, overridePaths });
    const mode = visualMode(point);
    const cueVisual = mode === "decision" || mode === "comparison"
      ? visuals.find((visual) => visual.kind === "comparison" || visual.kind === "analogy") ?? visuals[0]
      : visuals.find((visual) => visual.kind === "example" || visual.kind === "analogy" || visual.kind === "comparison") ?? visuals[0];
    return {
      id: point.id,
      title: point.title,
      displayTitle: materialTitle(point),
      notes: point.notes,
      keyTerms: point.requiredGroups.map((group) => brief(group[0], 6)),
      suggestedRasterCount: targetCount,
      visualMode: mode,
      explanationSteps: explanationSteps(point, lesson),
      cue: concreteCue(point, lesson, cueVisual),
      visuals,
      materialCount: visuals.length + 3,
    };
  });

  lesson.visuals = uniqueVisuals([...override, ...sourceVisuals]);
  const pointVisualPaths = new Set(lesson.knowledgePoints.flatMap((point) => point.visuals.map((visual) => visual.path)));
  lesson.supportingVisuals = lesson.visuals.filter((visual) => !pointVisualPaths.has(visual.path));
  lesson.teachingRoutes.full = "Use every knowledge-point material set, the worked method, the terminology check and all questions.";
}

content.schemaVersion = 3;
const enrichmentNote = `Every syllabus knowledge point is mapped to a visual material set enriched from the pre-consolidation ${legacyRef} lesson library and explicit reviewed overrides.`;
const baseSource = content.source
  .replace(/ Visual coverage is enriched from the pre-consolidation[^.]*\./g, "")
  .replace(/ Every syllabus knowledge point is mapped to a visual material set enriched from the pre-consolidation[^.]*\./g, "")
  .trim();
content.source = `${baseSource} ${enrichmentNote}`;
fs.writeFileSync(contentPath, `${JSON.stringify(content, null, 2)}\n`);

const counts = content.lessons.map((lesson) => lesson.visuals.length);
const points = content.lessons.flatMap((lesson) => lesson.knowledgePoints.map((point) => ({ lesson: lesson.id, ...point })));
const gaps = points.filter((point) => point.keyTerms.length === 0 || point.explanationSteps.length < 3);
console.log(JSON.stringify({
  lessons: content.lessons.length,
  syllabusKnowledgePoints: new Set(content.lessons.filter((lesson) => lesson.focus !== "integrated-review").flatMap((lesson) => lesson.knowledgePoints.map((point) => point.id))).size,
  materialSets: points.length,
  totalVisuals: counts.reduce((sum, count) => sum + count, 0),
  totalVisualPlacements: points.reduce((sum, point) => sum + point.visuals.length, 0),
  lessonsWithMultipleVisuals: counts.filter((count) => count > 1).length,
  minimumVisuals: Math.min(...counts),
  maximumVisuals: Math.max(...counts),
  minimumMaterialsPerPoint: Math.min(...points.map((point) => point.materialCount)),
  rasterlessPoints: points.filter((point) => point.visuals.length === 0).map((point) => `${point.lesson}:${point.id}`),
  gaps: gaps.map((point) => ({ lesson: point.lesson, point: point.id, keyTerms: point.keyTerms.length, explanationSteps: point.explanationSteps.length })),
}, null, 2));
