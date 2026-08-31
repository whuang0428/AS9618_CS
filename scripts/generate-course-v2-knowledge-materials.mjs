import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const readJson = (name) => JSON.parse(fs.readFileSync(path.join(root, "scripts", name), "utf8"));
const content = readJson("course-v2-content.json");
const syllabus = readJson("syllabus-coverage-contract.json");
const ownership = readJson("course-v2-material-ownership.json");
const section1 = readJson("course-v2-section1-materials.json");
const requirementById = new Map(syllabus.requirements.map((requirement) => [requirement.id, requirement]));

const stopwords = new Set("a an and are as at be by can data describe different each explain for from how in including is it its may of on one or other show system systems that the their these this to two understand use used using when where which with write".split(" "));

function sanitizeStudentText(value) {
  return String(value ?? "")
    .replace(/The Version 2 Notes also name/gi, "The syllabus also names")
    .replace(/The Version 2 Notes name/gi, "The syllabus names")
    .replace(/The Version 2 (?:row|table) requires/gi, "The syllabus requires")
    .replace(/Version 2 explicitly includes/gi, "The syllabus explicitly includes")
    .replace(/Version 2 explicitly requires/gi, "The syllabus explicitly requires")
    .replace(/Version 2 requires/gi, "The syllabus requires")
    .replace(/the preceding Version 2 row/gi, "the syllabus list above")
    .replace(/the Version 2 (?:row|table)/gi, "the syllabus")
    .replace(/Use the complete Version 2 instruction set/gi, "Use the complete specified instruction set")
    .replace(/\bVersion 2\b/gi, "the syllabus")
    .replace(/\s+/g, " ")
    .trim();
}

function normalise(value) {
  return sanitizeStudentText(value)
    .toLowerCase()
    .replaceAll("’", "'")
    .replace(/[^a-z0-9+#' ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function terms(value) {
  return normalise(value).split(" ").filter((term) => term.length > 2 && !stopwords.has(term));
}

function overlap(value, focusTerms) {
  const source = new Set(terms(value));
  return focusTerms.reduce((score, term) => score + (source.has(normalise(term)) ? 3 : [...source].some((word) => word.includes(normalise(term)) || normalise(term).includes(word)) ? 1 : 0), 0);
}

function shorten(value, maximumWords) {
  const words = sanitizeStudentText(value).split(/\s+/).filter(Boolean);
  return words.length <= maximumWords ? words.join(" ") : `${words.slice(0, maximumWords).join(" ")}…`;
}

function clauses(values) {
  return values
    .flatMap((value) => sanitizeStudentText(value).split(/(?<=[.!?])\s+|;\s+|:\s+/))
    .map((value) => value.replace(/^[,.;:\-\s]+|[,;:\-\s]+$/g, "").trim())
    .filter((value) => value.split(/\s+/).length >= 3);
}

function unique(values) {
  const seen = new Set();
  return values.filter((value) => {
    const key = normalise(value);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function labelFor(value) {
  return shorten(String(value).replace(/\s*\/\s*.*/, "").replace(/^the\s+/i, ""), 4);
}

function teachingFact(value) {
  const cleaned = sanitizeStudentText(value)
    .replace(/^(?:Show (?:an )?(?:understanding|appreciation) of|Understand|Explain|Describe|Use|Write|Produce and interpret|Select and justify|Distinguish|Construct and interpret|Identify and correct)\s+/i, "")
    .replace(/^(?:Candidates?|Learners?|Students?) (?:should|must|need to|are expected to)\s+/i, "")
    .replace(/^Candidates? to\s+/i, "")
    .replace(/^Evidence must (?:cover|identify|include|show|connect|distinguish|teach|explain)?\s*/i, "")
    .replace(/^The syllabus (?:requires|names|also names|explicitly names|explicitly includes|explicitly requires|distinguishes|limits)\s+/i, "")
    .replace(/^It does not require candidates to\s+/i, "No need to ")
    .replace(/^[,.;:\-\s]+|[,;:\-\s]+$/g, "")
    .trim();
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

function displayTitle(requirement, lesson, isRepeated) {
  const stripped = sanitizeStudentText(requirement.requirement)
    .replace(/^(?:Show understanding of|Understand|Explain|Describe|Use|Write|Produce and interpret|Select and justify|Distinguish|Construct and interpret|Identify and correct)\s+/i, "")
    .replace(/[.;]$/, "");
  const first = stripped.charAt(0).toUpperCase() + stripped.slice(1);
  return isRepeated ? shorten(`${first}: ${lesson.title}`, 16) : shorten(first, 16);
}

const nodeSupplements = {
  "S2.13": [["Internet", "interconnected network infrastructure"], ["WWW", "linked-resource internet service"], ["Browser", "requests and displays web resources"], ["Protocol", "HTTP or HTTPS rules"]],
  "S3.04": [["Producer", "creates data at one rate"], ["Buffer", "temporary holding area"], ["Consumer", "uses data at another rate"], ["Mismatch", "speeds differ temporarily"]],
  "S3.05": [["RAM", "volatile working memory"], ["ROM", "non-volatile startup memory"], ["Power loss", "RAM contents disappear"], ["Writing", "RAM changes during operation"]],
  "S3.07": [["PROM", "programmed once"], ["EPROM", "erased with ultraviolet light"], ["EEPROM", "erased electrically"], ["All three", "retain contents without power"]],
  "S4.07": [["PC", "address of next instruction"], ["MAR", "address currently accessed"], ["MDR", "word transferred to or from memory"], ["CIR", "current instruction being decoded"]],
  "S4.10": [["Pass 1", "assign addresses and record labels"], ["Symbol table", "maps labels to addresses"], ["Pass 2", "translate using resolved symbols"], ["Error", "report an undefined label"]],
  "S4.11": [["Instruction", "execute in control-flow order"], ["Trace table", "record state after each step"], ["Branch", "may change the next instruction"], ["State", "registers memory and output"]],
  "S5.04": [["Assembler", "assembly to machine code"], ["Compiler", "whole high-level program translated"], ["Interpreter", "translate and execute while running"], ["Need", "processor executes machine instructions"]],
  "S6.01": [["Security", "protection from unauthorised action"], ["Privacy", "appropriate use of personal data"], ["Integrity", "accuracy and consistency"], ["Confidentiality", "one part of security"]],
  "S6.02": [["Data", "valuable information to protect"], ["System", "hardware and services to protect"], ["Threat", "possible cause of harm"], ["Control", "reduces likelihood or impact"]],
  "S7.01": [["Public interest", "avoid preventable harm"], ["Competence", "work within proven ability"], ["Accountability", "own and explain decisions"], ["Ethics", "guides responsible choices"]],
  "S8.03": [["Entity", "thing stored in the design"], ["Relationship", "association between entities"], ["Cardinality", "how many instances connect"], ["Diagram", "documents the database design"]],
  "S8.11": [["INSERT", "add a new record"], ["UPDATE", "change existing records"], ["DELETE", "remove selected records"], ["WHERE", "limit affected records"], ["Safety", "check the condition before execution"]],
  "S9.06": [["Sequence", "steps in order"], ["Selection", "choose a branch"], ["Iteration", "repeat controlled steps"], ["Combination", "constructs can be nested"], ["Control flow", "determines the next executed step"]],
  "S10.04": [["1D array", "one index selects an item"], ["2D array", "two indexes select a cell"], ["Scenario", "data shape determines dimensions"], ["Bounds", "valid index range"]],
  "S10.06": [["Linear search", "inspect items in order"], ["Bubble sort", "swap adjacent out-of-order items"], ["Pass", "one traversal of the array"], ["Complete algorithm", "initialise loop and finish correctly"]],
  "S11.03": [["Built-in", "available without user definition"], ["Library", "reusable supplied routine"], ["String function", "question provides unfamiliar syntax"], ["Return value", "result used by the algorithm"]],
  "S11.05": [["FOR", "known repetition count"], ["WHILE", "test before the body"], ["REPEAT", "test after the body"], ["Justification", "connect loop behaviour to problem"]],
  "S11.09": [["Identifiers", "names reveal purpose"], ["Indentation", "shows nested control structure"], ["Efficiency", "avoids unnecessary repeated work"], ["Clarity", "steps are easy to trace"], ["Correctness", "optimisation must preserve results"]],
  "S12.03": [["State", "persistent condition of the system"], ["Transition", "change from one state"], ["Event", "label that triggers change"], ["Purpose", "document state-based behaviour"]],
  "S12.04": [["Syntax", "breaks language grammar"], ["Logic", "runs but gives wrong result"], ["Runtime", "fails during execution"], ["Correction", "remove the identified cause"]],
  "S12.06": [["Strategy", "overall testing approach"], ["Plan", "tests data and expected results"], ["Need", "systematic evidence of correctness"], ["Contents", "purpose data result and status"]],
  "S12.07": [["Normal", "valid typical value"], ["Abnormal", "invalid value"], ["Boundary", "at or around a limit"], ["Expected result", "predicted system response"]],
  "S12.08": [["Corrective", "repairs a discovered fault"], ["Adaptive", "responds to an environment change"], ["Perfective", "improves performance or usability"], ["Maintenance", "changes a delivered program"], ["Regression test", "checks existing behaviour still works"]],
  "S12.09": [["Analyse", "trace purpose inputs and outputs"], ["Locate", "find the responsible code"], ["Amend", "make the smallest coherent change"], ["Retest", "check the changed behaviour"], ["Regression", "confirm unaffected behaviour remains correct"]],
};

const lessonFocusTerms = {
  "017:S3.10": ["NOT", "AND", "OR", "NAND", "NOR", "XOR", "truth table"],
  "018:S3.10": ["logic expression", "logic circuit", "problem statement", "truth table"],
  "047:S9.02": ["decomposition", "module", "procedure", "function"],
  "054:S9.02": ["sub-problem", "module", "responsibility", "interface"],
  "058:S10.04": ["one-dimensional", "1D", "index", "linear collection"],
  "059:S10.04": ["two-dimensional", "2D", "row", "column"],
  "068:S10.04": ["select", "scenario", "data shape", "dimensions"],
  "060:S10.06": ["linear search", "target", "found", "index"],
  "061:S10.06": ["bubble sort", "adjacent", "swap", "pass"],
  "064:S10.09": ["stack", "LIFO", "top", "push", "pop"],
  "065:S10.09": ["queue", "FIFO", "front", "rear"],
  "066:S10.09": ["linked list", "link", "start", "next"],
  "068:S10.09": ["justify", "LIFO", "FIFO", "link-based"],
  "064:S10.10": ["stack", "array", "top", "add", "delete"],
  "065:S10.10": ["queue", "array", "front", "rear"],
  "066:S10.10": ["linked list", "array", "data", "next", "free list"],
  "067:S10.10": ["implement", "array", "add", "edit", "delete"],
  "069:S11.01": ["flowchart", "structured English", "pseudocode", "preserve logic"],
  "080:S11.01": ["complete fragment", "design", "pseudocode", "test"],
  "070:S11.02": ["declaration", "constant", "variable", "assignment", "input", "output"],
  "071:S11.02": ["arithmetic", "logical", "expression", "operator"],
  "073:S11.04": ["IF", "ELSE", "nested", "CASE"],
  "074:S11.04": ["FOR", "count-controlled", "counter", "range"],
  "075:S11.04": ["WHILE", "REPEAT", "pre-condition", "post-condition"],
  "080:S11.04": ["selection", "iteration", "complete fragment", "nested"],
  "077:S11.06": ["procedure", "parameter", "reference", "value"],
  "080:S11.06": ["procedure call", "argument", "interface", "complete fragment"],
  "078:S11.07": ["function", "return value", "expression", "call"],
  "080:S11.07": ["function call", "return", "expression", "complete fragment"],
};

function profileFor(requirement) {
  const text = normalise(`${requirement.requirement} ${requirement.notes}`);
  if (/ethic|impact|copyright|licen/.test(text)) return { mode: "decision", steps: [["Stakeholder", "Identify who is affected"], ["Impact", "Trace benefit and harm"], ["Judge", "Justify the responsible choice"]] };
  if (/security|threat|protect|encryption|access right/.test(text)) return { mode: "decision", steps: [["Asset", "Identify what needs protection"], ["Risk", "Trace the attack or error route"], ["Control", "Match a safeguard and limitation"]] };
  if (/sql|database|ddl|dml|normal form|entity.relationship/.test(text)) return { mode: "structure", steps: [["Read", "Identify structure and target data"], ["Build", "Apply the database rule"], ["Verify", "Check keys rows and conditions"]] };
  if (/pseudocode|algorithm|array|stack|queue|linked list|loop|procedure|function|trace|construct|produce/.test(text)) return { mode: "process", steps: [["Plan", "Translate the stated design"], ["Execute", "Apply one complete operation"], ["Test", "Trace state and boundaries"]] };
  if (/calculat|convert|arithmetic|file size/.test(text)) return { mode: "process", steps: [["Given", "Write values units and width"], ["Process", "Apply the required method"], ["Check", "Reverse or range-check the result"]] };
  if (/difference|distinguish|compare|benefit|drawback|justify|select/.test(text)) return { mode: "comparison", steps: [["Identify", "Name both alternatives precisely"], ["Contrast", "Connect structure to consequence"], ["Choose", "Justify against the scenario"]] };
  if (/operation|hardware|device|sensor|register|bus|port|cycle|transmi|network/.test(text)) return { mode: "process", steps: [["Input", "Identify incoming data or signal"], ["Mechanism", "Follow the physical or logical path"], ["Result", "Connect output to its use"]] };
  return { mode: "structure", steps: [["Meaning", "Name the exact concept"], ["Mechanism", "Explain how its parts connect"], ["Application", "Use it in a concrete context"]] };
}

function visualsFor(lessonId, requirementId) {
  return ownership.assets.filter((asset) => asset.activeLessonId === lessonId && asset.activeRequirementIds.includes(requirementId));
}

function makeDefinition(lesson, requirement, repeatedRequirementIds) {
  const key = `${lesson.id}:${requirement.id}`;
  if (lesson.section === 1 && section1.knowledgePoints[requirement.id]) return section1.knowledgePoints[requirement.id];
  const visuals = visualsFor(lesson.id, requirement.id);
  const preferred = lessonFocusTerms[key] ?? [];
  const requirementTerms = [
    ...terms(requirement.requirement),
    ...(requirement.requiredGroups ?? []).flat().flatMap(terms),
  ];
  const primaryFocusTerms = unique([...preferred, ...requirementTerms]);
  const secondaryFocusTerms = unique([...terms(lesson.title), ...lesson.conceptChecklist.flatMap(terms)]);
  const sourceClauses = unique(clauses([
    ...visuals.flatMap((visual) => visual.altFacts),
    ...lesson.coreFacts,
    requirement.notes,
    requirement.requirement,
  ]).map(teachingFact)).sort((left, right) => {
    const leftScore = overlap(left, primaryFocusTerms) * 100 + overlap(left, secondaryFocusTerms);
    const rightScore = overlap(right, primaryFocusTerms) * 100 + overlap(right, secondaryFocusTerms);
    return rightScore - leftScore || left.length - right.length;
  });
  const groupTerms = (requirement.requiredGroups ?? []).map((group) => {
    const choices = group.map((value) => sanitizeStudentText(value));
    return choices.sort((left, right) => overlap(right, preferred) - overlap(left, preferred) || left.length - right.length)[0];
  });
  const rankedTerms = unique([...preferred, ...groupTerms]).sort((left, right) => overlap(right, primaryFocusTerms) - overlap(left, primaryFocusTerms));
  const nodes = [];
  const usedValues = new Set();
  const addNode = (label, rawValue) => {
    const cleanLabel = shorten(label, 4);
    const cleanValue = shorten(teachingFact(rawValue), 8);
    const valueKey = normalise(cleanValue);
    if (!cleanLabel || !cleanValue || nodes.some((node) => normalise(node.label) === normalise(cleanLabel)) || usedValues.has(valueKey)) return false;
    nodes.push({ label: cleanLabel, value: cleanValue });
    usedValues.add(valueKey);
    return true;
  };
  for (const [label, value] of nodeSupplements[requirement.id] ?? []) {
    if (nodes.length === 6) break;
    addNode(label, value);
  }
  for (const term of rankedTerms) {
    if (nodes.length === 6) break;
    const label = labelFor(term);
    if (!label || nodes.some((node) => normalise(node.label) === normalise(label))) continue;
    const candidates = [
      ...sourceClauses.filter((clause) => normalise(clause).includes(normalise(term))),
      ...sourceClauses,
    ];
    for (const fact of candidates) if (addNode(label, fact)) break;
  }
  for (const term of unique([...terms(requirement.requirement), ...(requirement.requiredGroups ?? []).flat(), ...lesson.conceptChecklist])) {
    if (nodes.length >= 5) break;
    const label = labelFor(term);
    if (!label || nodes.some((node) => normalise(node.label) === normalise(label))) continue;
    const candidates = [
      ...sourceClauses.filter((clause) => normalise(clause).includes(normalise(term))),
      ...sourceClauses,
    ];
    for (const fact of candidates) if (addNode(label, fact)) break;
  }
  const profile = profileFor(requirement);
  const detailFacts = unique(sourceClauses.filter((clause) => !/^(?:show understanding|understand|explain|describe|use|write|produce|select|distinguish|construct|identify|the syllabus)\b/i.test(clause)));
  const steps = profile.steps.map(([label, title], index) => ({
    label,
    title,
    detail: shorten(detailFacts[index] ?? detailFacts[0] ?? requirement.notes, 18),
  }));
  const visualCue = visuals[0]?.altFacts?.filter(Boolean).slice(0, 2).join(" ");
  const cueText = visualCue || detailFacts[0] || requirement.notes;
  return {
    displayTitle: displayTitle(requirement, lesson, repeatedRequirementIds.has(requirement.id)),
    mode: profile.mode,
    nodes,
    steps,
    cue: {
      title: visuals[0] ? shorten(visuals[0].title, 8) : `Concrete case: ${nodes[0]?.label ?? requirement.id}`,
      text: shorten(cueText, 34),
    },
  };
}

const teachingLessons = content.lessons.filter((lesson) => lesson.focus !== "integrated-review");
const sectionTitleByNumber = new Map(teachingLessons.map((lesson) => [lesson.section, lesson.sectionTitle]));
const pointCounts = new Map();
for (const lesson of teachingLessons) for (const id of lesson.syllabusIds) pointCounts.set(id, (pointCounts.get(id) ?? 0) + 1);
const repeatedRequirementIds = new Set([...pointCounts].filter(([, count]) => count > 1).map(([id]) => id));
const lessonPoints = {};
for (const lesson of teachingLessons) {
  for (const requirementId of lesson.syllabusIds) {
    const requirement = requirementById.get(requirementId);
    if (!requirement) throw new Error(`Unknown syllabus requirement ${requirementId}`);
    lessonPoints[`${lesson.id}:${requirementId}`] = makeDefinition(lesson, requirement, repeatedRequirementIds);
  }
}

const reviewLessons = Object.fromEntries(content.lessons
  .filter((lesson) => lesson.focus === "integrated-review")
  .map((lesson) => [lesson.id, lesson.reviewSections.map((section) => {
    const requirements = syllabus.requirements.filter((requirement) => requirement.section === section);
    return {
      section,
      title: `Section ${section}: ${sectionTitleByNumber.get(section) ?? "Review"}`,
      points: requirements.slice(0, 4).map((requirement) => shorten(sanitizeStudentText(requirement.requirement), 16)),
    };
  })]));

const output = {
  schemaVersion: 2,
  status: "complete",
  policy: "Every teaching lesson instance has three concise native materials; visuals are attached only through explicit point-and-lesson ownership.",
  teachingLessons: teachingLessons.length,
  knowledgePointInstances: Object.keys(lessonPoints).length,
  lessonPoints,
  reviewLessons,
};

fs.writeFileSync(path.join(root, "scripts", "course-v2-knowledge-materials.json"), `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify({
  status: output.status,
  teachingLessons: output.teachingLessons,
  knowledgePointInstances: output.knowledgePointInstances,
  reviewLessons: Object.keys(output.reviewLessons).length,
  pointOwnedVisuals: ownership.counts.activeAssets,
}, null, 2));
