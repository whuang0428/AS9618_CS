import { classifyCommand, normaliseQuestionPrompt } from "./cie-command-words.mjs";
import { knowledgeDiagramForUnit } from "./course-v3-knowledge-diagrams.mjs";

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
  "waterfall and limitation": "Waterfall is less flexible when requirements change after a stage has been completed.",
  "iterative and limitation": "Iterative development requires repeated review and careful control of successive versions.",
  "conversions apply to integer values and the binary denary hexadecimal bcd one's complement and two's complement representations named in the syllabus list above": "Conversions apply to integer values represented in binary, denary, hexadecimal, BCD, one's complement and two's complement.",
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

function finaliseUnit(unit, lesson, unitIndex) {
  const sourceMaterials = [...(unit.materials ?? [])];
  const generatedDiagram = knowledgeDiagramForUnit(lesson.sequenceIndex, unitIndex + 1);
  if (generatedDiagram) sourceMaterials.unshift({ ...generatedDiagram, objectiveIds: [...unit.objectiveIds] });
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

const examContexts = Object.freeze({
  1: "a school that stores and transmits digital media",
  2: "a school network serving several buildings",
  3: "an automated greenhouse and its computer system",
  4: "a processor executing a stored program",
  5: "a development team preparing software for release",
  6: "an organisation protecting personal and operational data",
  7: "a software project with professional and legal responsibilities",
  8: "a school database used by staff and students",
  9: "a booking problem that must be converted into an algorithm",
  10: "a program that stores and processes a changing collection of data",
  11: "a Cambridge pseudocode program processing student records",
  12: "a software system moving from design through testing and maintenance",
  Review: "an integrated examination scenario",
});

function cleanObjectiveTopic(description) {
  let topic = String(description)
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[.!?]+$/, "")
    .replace(/^Students (?:are expected to|will)\s+/i, "")
    .replace(/^Show understanding of and be able to\s+/i, "how to ")
    .replace(/^Show an? understanding of\s+/i, "")
    .replace(/^Show understanding of(?: and be able to)?\s+/i, "")
    .replace(/^Show understanding that\s+/i, "")
    .replace(/^Understand the difference between and use:\s*/i, "the distinction and correct use of ")
    .replace(/^Understand given (.+?) and be able to write (.+)$/i, "how to interpret given $1 and write $2")
    .replace(/^Understand a given\s+/i, "how to interpret a given ")
    .replace(/^Understand given\s+/i, "how to interpret given ")
    .replace(/^Understand\s+/i, "")
    .replace(/^Analyse\s+/i, "how to analyse ")
    .replace(/^Write\s+/i, "how to write ")
    .replace(/^Use\s+/i, "how to use ")
    .replace(/^Using\s+/i, "how to use ")
    .replace(/^Select\s+/i, "how to select ")
    .replace(/^Choose\s+/i, "how to choose ")
    .replace(/^Calculate\s+/i, "how to calculate ")
    .replace(/^Convert\s+/i, "how to convert ")
    .replace(/^Perform\s+/i, "how to perform ")
    .replace(/^Construct\s+/i, "how to construct ")
    .replace(/^Encode and decode\s+/i, "how to encode and decode ")
    .replace(/^Recognise and use\s+/i, "how to recognise and use ")
    .replace(/^Recognise and explain\s+/i, "how to recognise and explain ")
    .replace(/^Add, edit and delete\s+/i, "how to add, edit and delete ")
    .replace(/^Break down\s+/i, "how to break down ")
    .replace(/^Pass\s+/i, "how to pass ")
    .replace(/^Define\s+/i, "how to define ")
    .replace(/^Declare\s+/i, "how to declare ")
    .replace(/^Assign\s+/i, "how to assign ")
    .replace(/^Read\s+/i, "how to read ")
    .replace(/^Call\s+/i, "how to call ")
    .replace(/^Implement\s+/i, "how to implement ")
    .replace(/^Complete\s+/i, "how to complete ")
    .replace(/^Give\s+/i, "")
    .replace(/^(?:Recommend|Suggest)\s+/i, "the choice of ")
    .replace(/^Trace\s+/i, "how to trace ")
    .replace(/^Produce\s+/i, "how to produce ")
    .replace(/^Predict\s+/i, "how to predict ")
    .replace(/^Apply\s+/i, "how to apply ")
    .replace(/^Interpret\s+/i, "how to interpret ")
    .replace(/^Inspect\s+/i, "how to inspect ")
    .replace(/^Test\s+/i, "how to test ")
    .replace(/^Document\s+/i, "how to document ")
    .replace(/^Draw\s+/i, "how to draw ")
    .replace(/^Put (.+?) in order\b/i, "the correct order of $1")
    .replace(/^Derive\s+/i, "how to derive ")
    .replace(/^Locate\s+/i, "how to locate ")
    .replace(/^Correct\s+/i, "how to correct ")
    .replace(/^Classify and explain\s+/i, "the classification and characteristics of ")
    .replace(/^Compare\s+(?:the differences? between\s+)?/i, "the differences between ")
    .replace(/^Distinguish\s+/i, "the distinction between ")
    .replace(/^Justify\s+/i, "the choice of ")
    .replace(/^(?:Explain|Describe|State|Identify)\s+/i, "")
    .replace(/^Diagnose and connect\s+/i, "technical relationships in ")
    .replace(/^Including:\s*/i, "")
    .replace(/^Including\s+/i, "")
    .replace(/^And\s+/i, "")
    .replace(/^That\s+/i, "")
    .trim();
  topic = topic.replace(/^(?:be able to|expected to)\s+/i, "").trim();
  return topic;
}

function inlineTopic(value) {
  const topic = String(value).trim();
  if (!topic || /^[A-Z]{2}/.test(topic)) return topic;
  return `${topic[0].toLowerCase()}${topic.slice(1)}`;
}

const reviewExamTopics = Object.freeze({
  "REV-P1": Object.freeze([
    "conversion between binary, denary, hexadecimal, BCD and signed binary representations",
    "the relationship between logic-gate symbols, functions, circuits and truth tables",
    "verification during data entry and data transfer",
  ]),
  "REV-P2": Object.freeze([
    "stepwise refinement from a high-level solution to implementable pseudocode",
    "procedure definitions, parameters and appropriate use",
    "linear search and ascending bubble sort in Cambridge pseudocode",
  ]),
});

const examTopicOverrides = Object.freeze({
  "S2-L01-Q2": "WAN classification and the choice between client-server and peer-to-peer",
  "V3-Q-L042-01": "the distinction between DDL and DML operations in SQL",
  "V3-Q-L042-02": "DDL as the SQL category used to change table structure",
  "V3-Q-L042-03": "the roles of DDL, DML and SQL",
  "V3-Q-L043-02": "the clauses and result of a SELECT query",
  "V3-Q-L043-03": "the two-table limit for an AS SQL query",
  "V3-Q-L044-01": "a table definition with suitable data types, a primary key and a foreign key",
  "V3-Q-L048-03": "the requirement for an algorithm to contain ordered and unambiguous steps",
  "V3-Q-L062-01": "text-file pseudocode and the need for persistent storage",
  "V3-Q-L062-02": "why a file is used when data must persist between program runs",
  "V3-Q-L062-03": "why NOT EOF is tested before READFILE",
  "V3-Q-L063-01": "the definition of an abstract data type",
  "V3-Q-L063-02": "array implementations that preserve stack, queue and linked-list operations",
  "V3-Q-L063-03": "the distinction between an ADT's operations and its implementation",
  "V3-Q-L072-01": "how supplied string manipulation functions are used",
  "V3-Q-L072-02": "LENGTH, TAKE and TOUPPER in Cambridge pseudocode",
  "V3-Q-L072-03": "the use of a returned STRING value in an expression or assignment",
  "V3-Q-L081-01": "the differences between waterfall, iterative and RAD, including one limitation of each",
  "V3-Q-L081-02": "three defining features of RAD",
  "V3-Q-L081-03": "why RAD may be unsuitable for a safety-critical system",
  "V3-Q-L089-01": "the information recorded before an existing program is amended",
  "V3-Q-L089-02": "why regression tests are rerun after a feature is added",
  "V3-Q-L089-03": "perfective maintenance as an enhancement to functionality or performance",
});

const examMarkingPointLimits = Object.freeze({
  "V3-Q-L042-03": 4,
  "V3-Q-L044-01": 4,
  "V3-Q-L043-03": 1,
});

const examQuestionOverrides = Object.freeze({
  "S1-L06-EXAM-1": {
    prompt: "A mono sound recording sampled at 22 kHz is resampled at 44 kHz while its duration and sampling resolution remain unchanged. Explain the effects on the digital representation, time accuracy and file size.",
    objectiveIds: ["S1.10.A01", "S1.10.A03"],
    answerPoints: [
      "44 000 samples are stored for each second instead of 22 000.",
      "the interval between measurements is halved, so the wave is measured at more points in time",
      "the digital representation can follow changes in the analogue wave more accurately",
      "the file contains twice as many sample values, so its data size doubles when the other stated factors remain unchanged",
    ],
    commonError: "Do not claim that the sampling resolution or number of amplitude levels changes; only the sampling rate changes in this scenario.",
  },
  "S1-L06-EXAM-2": {
    prompt: "A text file contains the sequence AAAAAAABBBCC and must be sent over a slow connection. Describe how run-length encoding compresses this sequence and explain why using RLE can be useful here.",
    objectiveIds: ["S1.11.A01", "S1.11.A03", "S1.11.A04"],
    answerPoints: [
      "RLE separates adjacent identical characters into the runs AAAAAAA, BBB and CC.",
      "each run is stored as its count followed by its character or character code",
      "the encoded sequence is 7A 3B 2C when count then character is used",
      "decoding repeats A seven times, B three times and C twice to reconstruct the original exactly",
      "the long runs allow repeated characters to be replaced by fewer stored values",
      "fewer bits need to be transmitted, which can reduce transfer time or bandwidth use on the slow connection",
    ],
    commonError: "Do not combine non-adjacent occurrences into one run, and always state the count/value order used in the encoding.",
  },
  "S1-L06-EXAM-3": {
    prompt: "A school keeps an archive master of a concert recording and also provides a streamed copy. Explain why lossless compression is suitable for the master and lossy compression may be suitable for the streamed copy.",
    objectiveIds: ["S1.11.A02", "S1.11.A07", "S1.11.A08"],
    answerPoints: [
      "lossless compression allows every original sample value in the archive master to be reconstructed exactly",
      "the master preserves the recording for later editing or production without irreversible quality loss",
      "lossy sound compression can remove less-audible information from the streamed copy",
      "the discarded information cannot be recovered, so the streamed copy is not an exact reconstruction",
      "the smaller streamed file can require less bandwidth and transfer in less time when the quality remains acceptable",
    ],
    commonError: "Do not say that lossy compression can recreate the exact original; its selected sound detail has been removed permanently.",
  },
  "REV-P1-EXAM-1": {
    prompt: "The 8-bit unsigned binary value 10110110 is stored in a register. Explain how to convert it to hexadecimal and denary.",
    objectiveIds: ["S1.03.R"],
    sourceRef: "Cambridge 9618 syllabus · S1.03",
    answerPoints: [
      "split the binary value into the nibbles 1011 and 0110",
      "1011 represents hexadecimal B and 0110 represents hexadecimal 6",
      "the hexadecimal value is B6",
      "adding the binary place values 128 + 32 + 16 + 4 + 2 gives denary 182",
    ],
    commonError: "Do not interpret the most significant bit as a sign bit; the question states that the value is unsigned.",
  },
  "REV-P1-EXAM-2": {
    prompt: "An alarm uses the logic expression Q = (Door AND NOT Key) OR Smoke. Describe how to construct a complete truth table for this expression.",
    objectiveIds: ["S3.10.R"],
    sourceRef: "Cambridge 9618 syllabus · S3.10",
    answerPoints: [
      "create input columns for Door, Key and Smoke and list all eight input combinations",
      "add an intermediate column for NOT Key by inverting each Key value",
      "add a column for Door AND NOT Key that is 1 only when both inputs to the AND gate are 1",
      "OR that intermediate result with Smoke to obtain Q",
      "Q is 1 whenever Smoke is 1 or Door is 1 while Key is 0",
    ],
    commonError: "Do not omit input combinations or apply NOT to the whole expression; it applies only to Key.",
  },
  "REV-P1-EXAM-3": {
    prompt: "A customer account number is entered twice and a data block is then sent with a checksum. Explain how these two verification methods detect errors and give one limitation of each.",
    objectiveIds: ["S6.08.R"],
    sourceRef: "Cambridge 9618 syllabus · S6.08",
    answerPoints: [
      "double entry compares two independently entered account numbers and flags a mismatch",
      "matching entries can still both be wrong, so double entry does not prove that the value is true",
      "the sender calculates a checksum from the data block and sends it with the data",
      "the receiver recalculates the checksum and compares it with the received checksum",
      "a matching checksum does not guarantee error-free data because some different error patterns can produce the same checksum",
    ],
    commonError: "Do not describe a range or format check; those are validation methods, not the two verification methods named here.",
  },
  "REV-P2-EXAM-1": {
    prompt: "A high-level solution says ‘Process all student marks and report the class average’. Explain how stepwise refinement develops this into implementable pseudocode.",
    objectiveIds: ["S9.08.R"],
    sourceRef: "Cambridge 9618 syllabus · S9.08",
    answerPoints: [
      "decompose the high-level process into input marks, accumulate a total, calculate the average and output the result",
      "refine each subtask into smaller ordered steps with defined inputs and outputs",
      "continue until each step can be expressed as a declaration, loop, assignment, calculation or output statement",
      "each refined level must preserve the purpose and result of its parent step",
    ],
    commonError: "Do not merely add more prose; every refinement must make the algorithm more precise and closer to implementable operations.",
  },
  "REV-P2-EXAM-2": {
    prompt: "A procedure UpdateMark receives StudentID by value and Mark by reference. Describe the procedure definition, call and effect of the two parameter modes.",
    objectiveIds: ["S11.06.R"],
    sourceRef: "Cambridge 9618 syllabus · S11.06",
    answerPoints: [
      "the procedure header declares formal parameters for StudentID and Mark with their types and parameter modes",
      "the call supplies matching arguments in the same order as the formal parameters",
      "StudentID passed by value gives the procedure a local copy, so assigning to that parameter does not change the caller’s variable",
      "Mark passed by reference gives access to the caller’s variable, so assigning to Mark changes that variable after the call",
      "the procedure performs an action and is invoked with CALL rather than returning a function value",
    ],
    commonError: "Do not say that both parameters change the caller; only the parameter passed by reference can do so through assignment.",
  },
  "REV-P2-EXAM-3": {
    prompt: "An array Name[1:20] is searched for a target, and an array Score[1:20] is sorted into ascending order. Explain the key control and data operations required for a linear search and a bubble sort.",
    objectiveIds: ["S10.06.R"],
    sourceRef: "Cambridge 9618 syllabus · S10.06",
    answerPoints: [
      "linear search initialises an index and a Boolean found flag before examining array elements in order",
      "the search stops when the target is found or the index has passed the upper bound",
      "each search comparison tests Name[Index] against the target and records a match before advancing",
      "bubble sort makes repeated passes and compares adjacent values Score[Index] and Score[Index + 1]",
      "when the left value is greater, a temporary variable or equivalent safe method swaps the adjacent values",
      "after each pass the unsorted range is reduced, or a no-swap flag is used to stop when the array is sorted",
    ],
    commonError: "Do not access Index + 1 beyond the upper bound, and do not overwrite one value before completing the swap.",
  },
});

function examTopicForSource(lesson, sourceQuestion, unit, fallback, variant) {
  const reviewTopic = reviewExamTopics[lesson.lessonKey]?.[variant];
  if (reviewTopic) return reviewTopic;
  if (examTopicOverrides[sourceQuestion.id]) return examTopicOverrides[sourceQuestion.id];
  const mappedDescriptions = lesson.objectives
    .filter(([id]) => sourceQuestion.objectiveIds.includes(id))
    .map(([, description]) => description);
  const bestDescription = [...mappedDescriptions]
    .sort((left, right) => tokenSimilarity(right, sourceQuestion.prompt) - tokenSimilarity(left, sourceQuestion.prompt))[0]
    ?? fallback;
  return (cleanObjectiveTopic(bestDescription) || unit.heading)
    .replace(/^where (.+)$/i, "the location in which $1")
    .replace(/^the industry standard for both DDL and DML is Structured Query Language \(SQL\)$/i, "the role of SQL as the industry-standard language for DDL and DML")
    .replace(/^an ADT is a collection of data and a set of operations on those data$/i, "the definition of an ADT as data together with its permitted operations")
    .replace(/^an algorithm is a solution to a problem expressed as a sequence of defined steps$/i, "the definition of an algorithm as a sequence of defined steps that solves a problem")
    .replace(/^string manipulation functions will always be given$/i, "how to use supplied string manipulation functions");
}

function examPromptForTopic(value, unit, context, variant, isReview) {
  const topic = inlineTopic(value || (isReview ? unit.heading : unit.heading));
  const startsWithHow = /^how\b/i.test(topic);
  const startsWithWhy = /^why\b/i.test(topic);
  const startsWithWhether = /^whether\b/i.test(topic);
  const startsWithWhich = /^which\b/i.test(topic);
  const startsWithChoice = /^(?:the choice of|the correct order of)\b/i.test(topic);
  const startsWithReturnedValues = /^the values returned by\b/i.test(topic);
  const isNounPhrase = /^(?:a technical|an? (?:effect|limitation|purpose)|one limiting|the (?:choice|complete|definition|difference|distinction|effect|information|location|operation|purpose|relationship|role|use)|array implementations|conversion|LENGTH|linear search|perfective|procedure definitions|verification)\b/i.test(topic);
  const isClause = !isNounPhrase && /\b(?:is|are|carries|causes|contains|controls|does|has|holds|must|occurs|provides|reduces|stores|uses|will)\b/i.test(topic);
  const contextSuffix = /\bwhen\s+(?:a|an|the)\b/i.test(topic) ? "" : ` in ${context}`;
  if (startsWithWhether) return `Explain ${topic}${contextSuffix}.`;
  if (startsWithReturnedValues) return `Write ${topic}${contextSuffix}.`;
  if (startsWithWhich) return variant === 2
    ? `Explain ${topic}${contextSuffix}, including one relevant technical distinction.`
    : `State ${topic}${contextSuffix}.`;
  if (variant === 0) {
    return isClause && !startsWithHow && !startsWithWhy
      ? `Explain how ${topic}${contextSuffix}.`
      : `Explain ${topic}${contextSuffix}.`;
  }
  if (variant === 1) {
    if (startsWithWhy) return `Explain ${topic}${contextSuffix}.`;
    return isClause && !startsWithHow
      ? `Describe how ${topic}${contextSuffix}.`
      : `Describe ${topic}${contextSuffix}.`;
  }
  if (startsWithWhy || startsWithChoice) return `Explain ${topic}${contextSuffix}, including one relevant technical distinction.`;
  if (startsWithHow) return `Explain ${topic} correctly${contextSuffix}, including one relevant limitation or distinction.`;
  if (isClause) return `Explain how ${topic}${contextSuffix}, including one relevant limitation or distinction.`;
  return `Explain ${topic}${contextSuffix}, including one relevant limitation or distinction.`;
}

function uniqueExamMarkingPoints(values) {
  const seen = new Set();
  return values.flatMap((value) => {
    const point = conciseMarkPoint(value);
    const key = normalisePresentationText(point);
    if (!key || seen.has(key) || /^for the command word\b|^database design review:/i.test(point)) return [];
    seen.add(key);
    return [point];
  });
}

function selectSourceQuestion(practice, objectiveId, unit, description, usedQuestionIds) {
  const weakPointPattern = /each named item remains core|correct one plausible error about|do not revise each term in isolation|^transfer\.?$|apply one section \d+ method/i;
  const eligible = practice.filter((question) => !/-CHECK$/i.test(question.id) && !question.answerPoints.some((point) => weakPointPattern.test(point)));
  const available = eligible.length >= 3 ? eligible : practice.filter((question) => !/-CHECK$/i.test(question.id));
  const objectiveMatches = available.filter((question) => question.objectiveIds.includes(objectiveId));
  const unitMatches = available.filter((question) => question.objectiveIds.some((id) => unit.objectiveIds.includes(id)));
  const candidates = objectiveMatches.length ? objectiveMatches : unitMatches.length ? unitMatches : available;
  const unused = candidates.filter((question) => !usedQuestionIds.has(question.id));
  const unusedUnit = unitMatches.filter((question) => !usedQuestionIds.has(question.id));
  const unusedLesson = available.filter((question) => !usedQuestionIds.has(question.id));
  const pool = unused.length ? unused : unusedUnit.length ? unusedUnit : unusedLesson.length ? unusedLesson : candidates;
  const focus = `${description} ${unit.heading}`;
  return [...pool].sort((left, right) => tokenSimilarity(focus, right.prompt) - tokenSimilarity(focus, left.prompt))[0];
}

function markingPointSignature(values) {
  return values.map(normalisePresentationText).filter(Boolean).sort().join("|");
}

function selectExamMarkingPoints(sourceQuestion, variant, unit, isReview) {
  const internalScopePoint = /\bcandidates?\s+(?:must|should|are required|need)|not required by the syllabus|the syllabus says|will always be given/i;
  let points = uniqueExamMarkingPoints(sourceQuestion.answerPoints)
    .filter((point) => !internalScopePoint.test(point) && !/^(?:yes|no)\.?$/i.test(point) && !/non-required task/i.test(point));
  if (!points.length || points.every((point) => /^(?:yes|no)\.?$/i.test(point))) {
    if (points.every((point) => /^(?:yes|no)\.?$/i.test(point))) points = [];
    const visualPoints = materialTexts(unit.leadVisual, { includeTranscript: true })
      .filter((value) => normalisePresentationText(value) !== normalisePresentationText(unit.leadVisual.title));
    const methodPoints = [unit.method, unit.workedExample]
      .filter(Boolean)
      .flatMap((material) => material.steps?.map(([, body]) => body) ?? []);
    points = uniqueExamMarkingPoints([...points, ...visualPoints, ...methodPoints, ...(unit.misconceptions ?? [])]);
  }
  const limit = examMarkingPointLimits[sourceQuestion.id] ?? 6;
  if (variant !== 2 || isReview || sourceQuestion.id === "V3-Q-L043-03") return points.slice(0, limit);
  return uniqueExamMarkingPoints([...points.slice(0, Math.min(5, limit)), ...(unit.misconceptions ?? []).slice(0, 1)]).slice(0, Math.max(limit, 2));
}

function examStyleQuestionSet(lesson, practice, staged) {
  const objectiveRows = lesson.objectives.length ? lesson.objectives : [[`${lesson.syllabusIds[0]}.R`, lesson.title]];
  const selectedIndexes = [...new Set([0, Math.floor((objectiveRows.length - 1) / 2), objectiveRows.length - 1])];
  while (selectedIndexes.length < 3) selectedIndexes.push(selectedIndexes.length % objectiveRows.length);
  const context = examContexts[lesson.section] ?? examContexts.Review;
  const usedQuestionIds = new Set();
  const usedTopics = new Set();
  return selectedIndexes.slice(0, 3).map((objectiveIndex, index) => {
    const [objectiveId, description] = objectiveRows[objectiveIndex];
    const requirementId = objectiveId.match(/^S(?:[1-9]|1[0-2])\.\d{2}/)?.[0] ?? lesson.syllabusIds[0];
    const unit = staged.units.find((candidate) => candidate.objectiveIds.includes(objectiveId))
      ?? staged.units.find((candidate) => candidate.objectiveIds.some((id) => id.startsWith(requirementId)))
      ?? staged.units[index % staged.units.length];
    const sourceQuestion = selectSourceQuestion(practice, objectiveId, unit, description, usedQuestionIds) ?? practice[index % practice.length];
    usedQuestionIds.add(sourceQuestion.id);
    let topic = examTopicForSource(lesson, sourceQuestion, unit, description, index);
    const topicKey = normalisePresentationText(topic);
    if (usedTopics.has(topicKey)) topic = index === 1
      ? `the operation and practical use of ${unit.heading.toLowerCase()}`
      : `one limiting case involving ${unit.heading.toLowerCase()}`;
    usedTopics.add(normalisePresentationText(topic));
    const prompt = examPromptForTopic(topic, unit, context, index, lesson.section === "Review");
    const answerPoints = selectExamMarkingPoints(sourceQuestion, index, unit, lesson.section === "Review");
    const questionId = `${lesson.lessonKey}-EXAM-${index + 1}`;
    const override = examQuestionOverrides[questionId];
    let question = finaliseQuestion({
      id: questionId,
      type: "Exam-style",
      prompt: override?.prompt ?? prompt,
      marks: override?.answerPoints.length ?? answerPoints.length,
      objectiveIds: override?.objectiveIds ?? (sourceQuestion.objectiveIds.length ? sourceQuestion.objectiveIds : [objectiveId]),
      answerPoints: override?.answerPoints ?? answerPoints,
      commonError: override?.commonError ?? sourceQuestion.commonError,
    }, staged);
    if (!override && practice.some((practiceQuestion) => markingPointSignature(practiceQuestion.answerPoints) === markingPointSignature(question.answerPoints))) {
      const distinctionPoint = uniqueExamMarkingPoints(unit.misconceptions ?? [])
        .find((point) => !question.answerPoints.some((answerPoint) => normalisePresentationText(answerPoint) === normalisePresentationText(point)));
      if (distinctionPoint) {
        question = {
          ...question,
          prompt: `${question.prompt.replace(/[.!?]+$/, "")}. Include one relevant technical limitation or distinction.`,
          marks: question.answerPoints.length + 1,
          answerPoints: [...question.answerPoints, distinctionPoint],
        };
      }
    }
    return {
      id: question.id,
      sourceRef: override?.sourceRef ?? (index === 0 ? lesson.pastPaper.sourceRef : `Cambridge 9618 syllabus · ${requirementId}`),
      accessUrl: lesson.pastPaper.accessUrl,
      objectiveIds: question.objectiveIds,
      task: question.prompt,
      commandWord: question.commandWord,
      marks: question.marks,
      build: question.answerPoints,
      markLogic: question.answerPoints,
      commonLosses: [question.commonError],
    };
  });
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
  const units = lesson.units.map((unit, unitIndex) => finaliseUnit(unit, lesson, unitIndex));
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
  const examStyleQuestions = examStyleQuestionSet({ ...lesson, pastPaper: rawPastPaper }, practice, staged);
  return {
    ...staged,
    practice,
    pastPaper: examStyleQuestions[0],
    examStyleQuestions,
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
