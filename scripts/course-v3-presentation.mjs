import { classifyCommand, normaliseQuestionPrompt } from "./cie-command-words.mjs";

const imageVisualTypes = new Set(["reviewed-visual", "topology-gallery", "reservoir", "address-demo", "url-demo"]);
const structuredVisualTypes = new Set(["flow", "table", "cards"]);
const genericMethodPattern = /identify the relevant|connect the mechanism|establish the exact|trace the relationship|use the explanation|set up the required|carry out the complete|trace or test the result|extract the constraints|match mechanisms to|link the choice to/i;

export function normalisePresentationText(value = "") {
  return String(value)
    .toLowerCase()
    .replaceAll("’", "'")
    .replace(/[^a-z0-9+#'<>*= ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function words(value) {
  return String(value ?? "").trim().split(/\s+/).filter(Boolean);
}

function sentenceCase(value) {
  const text = String(value ?? "").trim();
  return text ? `${text[0].toUpperCase()}${text.slice(1)}` : text;
}

function concise(value, maximumWords = 16) {
  const text = String(value ?? "").replace(/\s+/g, " ").trim();
  const parts = words(text);
  if (parts.length <= maximumWords) return text.replace(/[;:,]+$/, "");
  return parts.slice(0, maximumWords).join(" ").replace(/[;:,]+$/, "");
}

function conciseMarkPoint(value) {
  const text = String(value ?? "").replace(/\s+/g, " ").trim();
  const firstClause = text.split(/;\s+|\.\s+/)[0]?.trim() || text;
  return /[.!?]$/.test(firstClause) ? firstClause : `${firstClause}.`;
}

function visualPriority(material) {
  if (imageVisualTypes.has(material.type)) return 0;
  if (structuredVisualTypes.has(material.type)) return 1;
  if (material.type === "analogy") return 2;
  return 9;
}

function materialTexts(material, { includeTranscript = false } = {}) {
  if (!material) return [];
  if (material.type === "cards") return material.items.flatMap(([heading, body]) => [heading, body]);
  if (material.type === "table") return [material.title, ...material.headers, ...material.rows.flat()];
  if (material.type === "flow") return [material.title, ...material.steps.flat()];
  if (material.type === "worked-example") return [material.title, ...material.steps.flat()];
  if (material.type === "reviewed-visual") return [material.title, ...(includeTranscript ? material.facts : [])];
  if (material.type === "analogy") return [material.title, material.caption, material.boundary];
  if (material.type === "topology-gallery") return [material.title, ...material.entries.flatMap(([name, , alt, steps]) => [name, alt, ...steps])];
  if (material.type === "reservoir") return [material.title, "Arrival rate, buffer level and playback bit rate."];
  if (material.type === "address-demo" || material.type === "url-demo") return [material.title];
  return [material.title].filter(Boolean);
}

function compactLeadVisual(material, heading) {
  if (material.type === "cards") return {
    ...material,
    title: `Visual overview · ${heading}`,
    items: material.items.slice(0, 8).map(([label, body]) => [concise(label, 5), concise(body, 5)]),
  };
  if (material.type === "table") return {
    ...material,
    title: material.title === "Decision evidence" || material.title === "Compare by technical factor" ? `Visual overview · ${heading}` : material.title,
    rows: material.rows.map((row) => row.map((cell) => concise(cell, 5))),
  };
  if (material.type === "flow") return {
    ...material,
    title: /mechanism in examinable order/i.test(material.title) ? `Process · ${heading}` : material.title,
    steps: material.steps.map(([title, detail], index) => [
      genericMethodPattern.test(title) ? `${index + 1} · ${sentenceCase(concise(detail, 6))}` : concise(title, 10),
      concise(detail, 5),
    ]),
  };
  if (material.type === "reviewed-visual") return {
    ...material,
    caption: material.caption || "Use the labelled visual to establish the components and relationships before reading the explanation.",
  };
  return material;
}

function hasGenericMethod(material) {
  return material?.type !== "flow" || material.steps.some(([title]) => genericMethodPattern.test(title));
}

function comparableFragments(values) {
  return values.flatMap((value) => String(value ?? "").split(/[.;]\s+/)).map(normalisePresentationText).filter(Boolean);
}

function isSubstantiveDuplicate(value, references) {
  const candidate = normalisePresentationText(value);
  if (words(candidate).length < 7) return false;
  return references.some((reference) => words(reference).length >= 7 && (reference.includes(candidate) || candidate.includes(reference)));
}

function tokenSimilarity(left, right) {
  const a = words(normalisePresentationText(left));
  const b = words(normalisePresentationText(right));
  if (!a.length || !b.length) return 0;
  const counts = (tokens) => tokens.reduce((map, token) => map.set(token, (map.get(token) ?? 0) + 1), new Map());
  const leftCounts = counts(a);
  const rightCounts = counts(b);
  let overlap = 0;
  for (const [token, count] of leftCounts) overlap += Math.min(count, rightCounts.get(token) ?? 0);
  return (2 * overlap) / (a.length + b.length);
}

function cleanCoreParagraph(value) {
  return String(value)
    .replace(/\s*Its syllabus requirement is to understand that purpose; constructing a state-transition diagram is retained only as Optional enrichment\./i, "")
    .replace(/in this course's standard SQL style/gi, "using standard SQL literal syntax")
    .replace(/within the AS core boundary/gi, "within the stated two-table scope")
    .replace(/AS DML questions use at most two tables\./gi, "A two-table DML query uses one explicit join.")
    .trim();
}

function dedupeCoreParagraphs(paragraphs) {
  const kept = [];
  for (const original of paragraphs) {
    const paragraph = cleanCoreParagraph(original);
    if (!paragraph) continue;
    const duplicate = kept.some((existing) => {
      const a = normalisePresentationText(existing);
      const b = normalisePresentationText(paragraph);
      if (Math.min(words(a).length, words(b).length) < 8) return a === b;
      return a === b || a.includes(b) || b.includes(a) || tokenSimilarity(a, b) >= 0.82;
    });
    if (!duplicate) kept.push(paragraph);
  }
  return kept;
}

function cleanMethod(material, coreExplanation, leadVisual) {
  if (!material || hasGenericMethod(material)) return null;
  const references = comparableFragments([
    ...coreExplanation,
    ...materialTexts(leadVisual, { includeTranscript: true }),
  ]);
  const steps = material.steps.filter(([, text]) => !isSubstantiveDuplicate(text, references));
  return steps.length >= 2 ? { ...material, steps } : null;
}

function cleanWorkedExample(material, coreExplanation, leadVisual) {
  if (!material) return null;
  const references = comparableFragments([
    ...coreExplanation.map(normalisePresentationText),
    ...materialTexts(leadVisual, { includeTranscript: true }).map(normalisePresentationText),
  ]);
  const steps = material.steps.filter(([label, text]) => {
    const normalised = normalisePresentationText(text);
    return normalised && !isSubstantiveDuplicate(normalised, references) && !genericMethodPattern.test(label);
  });
  if (steps.length < 2) return null;
  return {
    ...material,
    title: String(material.title).replace(/:\s*complete worked route$/i, "").replace(/^Complete worked method for\s+/i, ""),
    steps,
  };
}

const methodTitleOverrides = Object.freeze({
  "S1.10": "Sound sampling process",
  "S3.10": "From Boolean requirement to truth table",
  "S9.09": "Constructing a logic statement",
  "S10.06": "Linear search procedure",
  "S11.01": "From flowchart to pseudocode",
  "S11.02": "Declarations, assignment and input/output",
  "S11.04": "Selecting and testing a control structure",
  "S11.06": "Procedure parameter passing",
  "S11.07": "Functions and return values",
});

const vectorWorkedExample = Object.freeze({
  type: "worked-example",
  title: "Read and scale a vector drawing list",
  objectiveIds: ["S1.09.A01", "S1.09.A02", "S1.09.A03"],
  steps: [
    ["Drawing list", "RECTANGLE at (10, 10), width 40, height 20, blue fill; LINE from (10, 30) to (50, 30), black, 2 px."],
    ["Render", "The software creates the rectangle and line in list order using the stored coordinates, dimensions, colours and line thickness."],
    ["Scale", "At scale factor 2, the coordinates and dimensions double while the objects remain defined by the same types and properties."],
    ["Result", "The graphic is redrawn at the new size without enlarging a fixed grid of stored pixels."],
  ],
});

const vectorCoreExplanation = Object.freeze([
  "A vector graphic is encoded as a drawing list. Each entry defines a drawing object and stores properties such as its type, coordinates, dimensions, line colour, fill colour and line thickness.",
  "When the graphic is displayed, the software reads the list and redraws each object from its properties. Changing the coordinates or dimensions allows the image to be scaled without enlarging a fixed pixel grid.",
]);

function questionRequirement(question, lesson) {
  return question.objectiveIds.map((id) => id.match(/^S(?:[1-9]|1[0-2])\.\d{2}/)?.[0]).find(Boolean)
    ?? lesson.syllabusIds.find((id) => /^S(?:[1-9]|1[0-2])\.\d{2}$/.test(id));
}

const promptOverrides = Object.freeze({
  "V3-Q-L002-03": "Explain why hexadecimal is suitable for representing a memory address.",
  "V3-Q-L003-01": "Explain why 01111111 + 00000001 does not overflow when interpreted as unsigned 8-bit arithmetic.",
  "V3-Q-L004-02": "State what a character set assigns to each character.",
  "V3-Q-L004-03": "Explain why BCD is suitable for a digital clock.",
  "V3-005-S1.08-CHECK": "Compare image resolution with screen resolution.",
  "V3-005-S1.09-CHECK": "Justify the use of vector graphics for a logo that must be displayed at several sizes.",
  "V3-Q-L015-03": "Explain why DRAM must be refreshed.",
  "V3-Q-L020-02": "State what processor type means as a performance factor.",
  "V3-Q-L020-03": "Explain how bus width can affect processor performance.",
  "V3-Q-L023-03": "Explain why assembly language is easier for people to use than machine code.",
  "V3-Q-L027-01": "Explain how program libraries support software under development.",
  "V3-Q-L028-02": "Explain why an assembler is needed.",
  "V3-Q-L029-03": "Explain why Java is described as partly compiled and partly interpreted.",
  "V3-Q-L034-01": "Explain how validation and verification help protect data integrity.",
  "V3-Q-L034-03": "Explain how double-entry verification works.",
  "V3-Q-L040-03": "Explain why matching field spelling is not sufficient evidence of a relationship between tables.",
  "V3-Q-L047-03": "Explain how an IPO table supports one level of stepwise refinement.",
  "V3-Q-L051-02": "Explain why indentation is useful in structured English.",
  "V3-Q-L054-01": "State what decomposition produces in this scenario.",
  "V3-Q-L056-02": "Explain why a record can contain both STRING and DATE fields.",
  "V3-Q-L058-02": "Explain why a seating grid is normally represented by a two-dimensional array.",
  "V3-Q-L067-01": "Compare the removal rules of a stack and a queue.",
  "V3-Q-L069-02": "Describe how a flowchart decision is normally translated into pseudocode.",
  "V3-Q-L076-02": "Explain why a FOR loop is suitable for processing Marks[1:30].",
  "V3-Q-L077-02": "Compare a function return value with output produced by a procedure.",
  "V3-Q-L079-02": "Explain why one combined traversal is more efficient than two separate full traversals in this scenario.",
  "V3-Q-L082-02": "State what a box represents in a structure chart.",
  "V3-Q-L082-03": "Describe how parameters are represented in a structure chart and then derived into pseudocode.",
  "V3-Q-L083-01": "State what a state-transition diagram documents.",
  "V3-Q-L083-02": "Compare a walkthrough with a dry run.",
  "V3-Q-L084-01": "Explain why a translator cannot detect every logic error.",
  "V3-Q-L086-01": "State what a stub replaces during testing.",
  "V3-Q-L088-02": "Explain why maintenance continues after a system has been accepted.",
});

const answerOverrides = Object.freeze({
  "V3-005-S1.08-CHECK": [
    "Image resolution is the number of pixels stored in the image.",
    "Screen resolution is the number of physical pixels available on the display.",
  ],
  "V3-005-S1.09-CHECK": [
    "The logo is stored as drawing objects with properties rather than as a fixed pixel grid.",
    "The objects are redrawn at the required size, so enlarging the logo does not produce bitmap pixelation.",
  ],
});

const markPointRewrites = new Map(Object.entries({
  "the basic von neumann architecture uses one immediate access store for the instructions and data currently required": "One immediate access store holds the instructions and data currently needed by the processor.",
  "how ports connect peripheral devices including universal serial bus usb high definition multimedia interface hdmi and video graphics array vga with accurate signal use distinctions": "USB, HDMI and VGA must be linked to the signals and peripherals that each interface supports.",
  "an enabled interrupt request is detected at an instruction boundary before the processor begins the handling sequence": "The processor detects an enabled interrupt request at an instruction boundary before starting the interrupt-handling sequence.",
  "to trace a simple assembly language program make a table with one row per executed instruction and columns for the current instruction address acc ix relevant memory or output and branch result": "A trace table records each executed instruction together with ACC, IX, relevant memory or output, and the branch result.",
  "and or xor lsl and lsr for bit manipulation including testing setting bits with masks": "AND, OR and XOR combine bit patterns, while LSL and LSR shift them; masks select the bits to test or set.",
  "context sensitive prompts dynamic syntax checking prettyprint expand collapse single step breakpoints variable expression inspection and report window": "IDE facilities include context-sensitive prompts, syntax checking, code formatting, folding, stepping, breakpoints, inspection and diagnostic reports.",
  "ddl is used for the creation and modification of database structure": "DDL creates or changes database structures such as tables, fields and constraints.",
  "cambridge pseudocode uses the type names integer real char string boolean date array and file": "Valid Cambridge pseudocode type names include INTEGER, REAL, CHAR, STRING, BOOLEAN, DATE, ARRAY and FILE.",
  "a record structure groups a set of related fields which may have different data types under one identifier": "A record groups related, differently typed fields under one identifier.",
  "stack queue and linked list are examples of adts": "Stack, queue and linked list are abstract data types defined by their permitted operations and behaviour.",
}));

function rewriteQuestionForm(prompt) {
  let text = String(prompt ?? "").replace(/\s+/g, " ").trim();
  text = text
    .replace(/\bthen name\b/gi, "then identify")
    .replace(/^Why\s+/i, "Explain why ")
    .replace(/^How many\s+/i, "State the number of ")
    .replace(/^How\s+/i, "Explain how ")
    .replace(/^What is\s+/i, "State ")
    .replace(/^What are\s+/i, "State ")
    .replace(/^What does\s+(.+?)\s+mean\??$/i, "State what $1 means.")
    .replace(/^What\s+/i, "Identify what ")
    .replace(/^Which\s+/i, "Identify ")
    .replace(/^When\s+/i, "State when ")
    .replace(/^Where\s+/i, "State where ")
    .replace(/^List\s+/i, "State ")
    .replace(/^Convert\s+/i, "Calculate ")
    .replace(/^Trace\s+/i, "Describe the path of ");
  return text;
}

function coveragePrompt(question, lesson) {
  if (!/(?:-CHECK$|following targets in one connected answer)/i.test(`${question.id} ${question.prompt}`)) return question.prompt;
  const unit = lesson.units.find((candidate) => candidate.objectiveIds.some((id) => question.objectiveIds.includes(id)));
  if (!unit) return question.prompt;
  const requirements = lesson.objectives
    .filter(([id]) => question.objectiveIds.includes(id))
    .map(([, description]) => description
      .replace(/[.!?]+$/, "")
      .replace(/^(?:Explain|Describe|State|Identify|Compare|Calculate|Write|Use|Select|Justify|Distinguish|Perform|Encode and decode)\s+/i, "")
      .replace(/^Show understanding of\s+/i, "")
      .replace(/^Understand the difference between and use:\s*/i, "")
      .replace(/^Students (?:are|will)\s+/i, ""));
  const focus = requirements.slice(0, 3).join("; ");
  return `Explain the technical ideas represented by ${unit.heading.toLowerCase()}.${focus ? ` In your answer, refer to ${focus}.` : ""}`;
}

function finaliseQuestion(question, lesson) {
  const requirementId = questionRequirement(question, lesson);
  let prompt = promptOverrides[question.id] ?? coveragePrompt(question, lesson);
  prompt = normaliseQuestionPrompt(rewriteQuestionForm(prompt));
  let classification = requirementId ? classifyCommand(prompt, requirementId) : { status: "Blocked" };
  if (classification.status !== "Approved") {
    prompt = normaliseQuestionPrompt(`Explain ${prompt.replace(/[?]+$/, ".").replace(/^\w/, (value) => value.toLowerCase())}`);
    classification = requirementId ? classifyCommand(prompt, requirementId) : { status: "Blocked" };
  }
  if (classification.status !== "Approved") throw new Error(`${question.id}: unable to assign a Cambridge command word`);
  return {
    ...question,
    prompt,
    commandWord: sentenceCase(classification.word),
    answerPoints: (/-CHECK$/i.test(question.id)
      ? (answerOverrides[question.id] ?? question.answerPoints).slice(0, Math.max(1, question.marks))
      : (answerOverrides[question.id] ?? question.answerPoints))
      .map(conciseMarkPoint)
      .map((point) => markPointRewrites.get(normalisePresentationText(point)) ?? point),
  };
}

function finaliseUnit(unit) {
  const sourceMaterials = [...(unit.materials ?? [])];
  const candidates = sourceMaterials
    .filter((material) => material.type !== "worked-example")
    .sort((left, right) => visualPriority(left) - visualPriority(right));
  if (!candidates.length) throw new Error(`${unit.syllabusId}: no lead visual candidate`);
  let coreExplanation = dedupeCoreParagraphs(unit.coreExplanation ?? unit.explanation ?? []);
  let leadVisual = { ...compactLeadVisual(candidates[0], unit.heading), objectiveIds: [...unit.objectiveIds] };
  if (unit.syllabusId === "S1.09") coreExplanation = [...vectorCoreExplanation];

  const methodCandidate = sourceMaterials.find((material) => material.type === "flow" && material !== candidates[0]);
  const cleanedMethod = cleanMethod(methodCandidate, coreExplanation, leadVisual);
  const method = cleanedMethod && !/worked.*example/i.test(cleanedMethod.title)
    ? { ...cleanedMethod, title: methodTitleOverrides[unit.syllabusId] ?? cleanedMethod.title }
    : null;
  const sourceExample = sourceMaterials.find((material) => material.type === "worked-example");
  const workedExample = unit.syllabusId === "S1.09"
    ? { ...vectorWorkedExample }
    : /worked.*example/i.test(cleanedMethod?.title ?? "")
      ? { ...cleanedMethod, type: "worked-example" }
      : cleanWorkedExample(sourceExample, coreExplanation, leadVisual);

  return {
    ...unit,
    leadVisual,
    coreExplanation,
    method,
    workedExample,
    explanation: undefined,
    materials: undefined,
  };
}

function conciseSummary(lesson) {
  const stopwords = new Set("a an and are as at be by for from how in is it of on or plus that the this to use used uses using when which why with store stores stored required".split(" "));
  const seen = new Set();
  return lesson.summary.flatMap(([heading], index) => {
    const syllabusId = heading.match(/^S(?:[1-9]|1[0-2])\.\d{2}/)?.[0];
    const key = syllabusId ?? normalisePresentationText(heading);
    if (seen.has(key)) return [];
    seen.add(key);
    const unit = lesson.units.find((candidate) => candidate.syllabusId === syllabusId) ?? lesson.units[index] ?? lesson.units[0];
    const keywords = [...new Set(normalisePresentationText(unit?.heading ?? heading).split(" ").filter((word) => word.length > 2 && !stopwords.has(word)))].slice(0, 5);
    return [[heading, `Key focus: ${keywords.join(" · ")}.`]];
  });
}

export function finaliseLessonPresentation(lesson) {
  const units = lesson.units.map(finaliseUnit);
  const staged = { ...lesson, units };
  const practice = lesson.practice.map((question) => finaliseQuestion(question, staged));
  const rawPastPaper = lesson.syllabusIds.includes("S1.09") ? {
    ...lesson.pastPaper,
    task: "A vector drawing list contains a rectangle and a line. Explain how the software renders the graphic and why applying a scale factor of 2 does not cause bitmap pixelation.",
    build: [
      "State that the software reads the drawing list in order.",
      "Link each drawing object to its stored properties.",
      "Explain that the coordinates and dimensions are recalculated for the new scale.",
      "Conclude that the objects are redrawn rather than a fixed pixel grid being enlarged.",
    ],
    markLogic: [
      "The drawing list is read in order.",
      "Object properties determine the rendered rectangle and line.",
      "Coordinates and dimensions are doubled for scale factor 2.",
      "Redrawing the objects avoids enlarging stored pixels.",
    ],
    commonLosses: [
      "Describing bitmap file-size calculation instead of vector rendering.",
      "Stating that quality is preserved without linking this to object redrawing.",
    ],
  } : lesson.pastPaper;
  const rawMatchingPracticeIndex = lesson.practice.findIndex((question) => normalisePresentationText(question.prompt) === normalisePresentationText(rawPastPaper.task));
  const paperQuestion = rawMatchingPracticeIndex >= 0 ? practice[rawMatchingPracticeIndex] : finaliseQuestion({
    id: `${lesson.lessonKey}-ORIGINAL-EXAM-STYLE`,
    type: "Exam-style",
    prompt: rawPastPaper.task,
    marks: Math.max(1, rawPastPaper.markLogic.length),
    objectiveIds: rawPastPaper.objectiveIds,
    answerPoints: rawPastPaper.markLogic,
    commonError: rawPastPaper.commonLosses[0] ?? "",
  }, staged);
  return {
    ...staged,
    practice,
    pastPaper: {
      ...rawPastPaper,
      task: paperQuestion?.prompt ?? lesson.pastPaper.task,
      commandWord: paperQuestion?.commandWord ?? "Explain",
      build: rawPastPaper.build.map(conciseMarkPoint),
      markLogic: (rawMatchingPracticeIndex >= 0 ? paperQuestion.answerPoints : rawPastPaper.markLogic).map(conciseMarkPoint),
      commonLosses: rawPastPaper.commonLosses.map(conciseMarkPoint),
    },
    summary: conciseSummary(lesson),
    sources: lesson.sources.filter((source) => !/stage\s*\d+|audit|approved assets|\bV[23]\b/i.test(source)),
  };
}

export function unitMaterials(unit) {
  return [unit.leadVisual, unit.method, unit.workedExample].filter(Boolean);
}

export function visibleRoleTexts(unit) {
  const bodyTexts = (material) => {
    if (!material) return [];
    if (material.type === "cards") return material.items.map(([, body]) => body);
    if (material.type === "table") return material.rows.flat();
    if (material.type === "flow" || material.type === "worked-example") return material.steps.map(([, body]) => body);
    if (material.type === "analogy") return [material.caption, material.boundary];
    if (material.type === "topology-gallery") return material.entries.flatMap(([, , , steps]) => steps);
    if (material.type === "reservoir") return ["Data arriving from the network fills the buffer; playback drains it at the media bit rate."];
    return [];
  };
  return {
    visual: bodyTexts(unit.leadVisual),
    core: unit.coreExplanation,
    method: bodyTexts(unit.method),
    workedExample: bodyTexts(unit.workedExample),
  };
}
