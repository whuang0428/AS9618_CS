import { section1ExamQuestions } from "./course-v3-section1-content.mjs";
import { classifyCommand, normaliseQuestionPrompt } from "./cie-command-words.mjs";
import { knowledgeDiagramForUnit } from "./course-v3-knowledge-diagrams.mjs";
import { coreBlockTexts, coreParagraph, validateCoreBlocks } from "./course-v3-core-blocks.mjs";
import { expandConceptTeaching } from "./course-v3-concept-expansion.mjs";

const imageVisualTypes = new Set(["reviewed-visual", "topology-gallery", "reservoir", "address-demo", "url-demo"]);
const structuredVisualTypes = new Set(["flow", "table", "cards", "list"]);
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

function completeMarkPoint(value) {
  const text = String(value ?? "").replace(/\s+/g, " ").trim();
  return /[.!?]$/.test(text) ? text : `${text}.`;
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
  if (material.type === "list") return [material.title, ...material.items.flat()];
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
  if (material.preserveText) return { ...material };
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

const markingPointStopwords = new Set("a an and are as at be by can complete computer data demonstrate device devices different each every explain feature features for from given how in include including information input into is it may method methods more must of on one operation or output practical process processing program relevant represented required requires result scenario school should state step steps store stored system systems target technical than the then this to two three four five six all answer application applications correct correctly use used uses using when which why with without".split(" "));

function markingPointTokens(value) {
  return new Set(words(normalisePresentationText(value)).filter((token) => token.length > 2 && !markingPointStopwords.has(token)));
}

function markingPointRelevance(focus, point) {
  const focusTokens = markingPointTokens(focus);
  const pointTokens = markingPointTokens(point);
  if (!focusTokens.size || !pointTokens.size) return 0;
  const shared = [...pointTokens].filter((token) => focusTokens.has(token)).length;
  return shared ? shared + tokenSimilarity(focus, point) : 0;
}

function atomicMarkingPointValues(values) {
  return values.flatMap((value) => String(value ?? "").split(/;\s+|\.\s+/)).map((value) => value.trim()).filter(Boolean);
}

function rankedRelevantMarkingPoints(values, focus, { target = 2 } = {}) {
  const seen = new Set();
  const uniquePoints = [];
  const ranked = atomicMarkingPointValues(values).flatMap((value, index) => {
    const point = conciseMarkPoint(value);
    const key = normalisePresentationText(point);
    if (!key || seen.has(key) || isSubstantiveDuplicate(point, uniquePoints.map(normalisePresentationText))) return [];
    seen.add(key);
    uniquePoints.push(point);
    return [{ point, index, score: markingPointRelevance(focus, point) }];
  }).sort((left, right) => right.score - left.score || left.index - right.index);
  const relevant = ranked.filter((candidate) => candidate.score > 0);
  const pool = relevant.length ? relevant : ranked;
  return pool.slice(0, Math.min(Math.max(1, target), pool.length)).map((candidate) => candidate.point);
}

function unitAnswerCandidateValues(unit, { includeCore = true } = {}) {
  return [
    ...(includeCore ? (unit.coreExplanation ?? []) : []),
    ...materialTexts(unit.leadVisual, { includeTranscript: true })
      .filter((value) => normalisePresentationText(value) !== normalisePresentationText(unit.leadVisual?.title)),
    ...[unit.method, unit.workedExample].filter(Boolean).flatMap((material) => material.steps?.map(([, body]) => body) ?? []),
    ...(unit.misconceptions ?? []),
  ];
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
  "S1.03": "Convert between number bases and representations",
  "S1.04": "Unsigned binary addition",
  "S1.05": "Check for overflow",
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
  "V3-Q-L045-02": "A student claims that every foreign key must be unique. Explain why this is incorrect and state the rule that should be enforced instead.",
  "V3-Q-L045-03": "Compare AND and OR gates, including their output conditions and the result for the input pair 1, 0.",
  "V3-Q-L045-04": "Convert the unsigned binary value 10110110 to hexadecimal and denary, showing both methods.",
  "V3-Q-L047-03": "Explain how an IPO table supports one level of stepwise refinement.",
  "V3-Q-L051-02": "Explain why indentation is useful in structured English.",
  "V3-Q-L054-01": "State what decomposition produces in this scenario.",
  "V3-Q-L056-02": "Explain why a record can contain both STRING and DATE fields.",
  "V3-Q-L058-02": "Explain why a seating grid is normally represented by a two-dimensional array.",
  "V3-Q-L067-01": "Compare the removal rules of a stack and a queue.",
  "V3-Q-L069-02": "Describe how a flowchart decision is normally translated into pseudocode.",
  "V3-Q-L072-01": "Explain how an unfamiliar supplied string-manipulation function should be used in pseudocode.",
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
  "V3-Q-L090-02": "A student uses a procedure call where a value is required inside an expression. Explain the error and give the correct use of a function.",
  "V3-Q-L090-03": "Compare decomposition with stepwise refinement when designing an algorithm.",
  "V3-Q-L090-04": "A school needs early user feedback while developing a booking system. Explain how an iterative or RAD lifecycle can support this and give one relevant drawback.",
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
  "V3-002-S1.02-CHECK": [
    "The base determines the place values: binary uses powers of 2, denary powers of 10 and hexadecimal powers of 16.",
    "Signed representations such as one's complement and two's complement specify how a fixed-width bit pattern represents a negative integer.",
  ],
  "V3-002-S1.03-CHECK": [
    "To convert a binary integer to denary, add the place values whose bits are 1.",
    "To convert between binary and hexadecimal, group the binary digits into four-bit nibbles and map each nibble to one hexadecimal digit.",
  ],
  "V3-015-S3.04-CHECK": [
    "A buffer temporarily stores data while it is transferred between components that operate at different speeds or in different-sized bursts.",
    "The producer can continue after filling the buffer while the slower device consumes the buffered data at its own rate.",
  ],
  "V3-015-S3.05-CHECK": [
    "RAM is normally volatile and writable working storage, whereas ROM is non-volatile and stores instructions or data that must remain when power is removed.",
    "A computer uses RAM for active programs and data, while an embedded device can use ROM for fixed start-up or control instructions.",
  ],
  "V3-016-S3.09-CHECK": [
    "A sensor measures a physical property and converts it into a signal that the computer can process.",
    "Temperature, pressure, infra-red and sound sensors must be selected by matching the measured physical property to the application.",
    "An actuator converts a computer output signal into a physical action, such as a motor turning or a heater switching on.",
  ],
  "V3-017-S3.10-CHECK": [
    "NOT inverts one input, so 0 becomes 1 and 1 becomes 0.",
    "AND outputs 1 only when both inputs are 1, whereas OR outputs 1 when at least one input is 1.",
    "NAND is the inverse of AND and NOR is the inverse of OR.",
    "XOR outputs 1 when its two inputs are different.",
    "A truth table lists every possible input combination and the output produced by the gate or circuit.",
    "A problem statement, Boolean expression, logic circuit and truth table are equivalent only when they give the same output for every input combination.",
  ],
  "V3-018-S3.10-CHECK": [
    "Translate each condition in the problem statement into a Boolean variable or comparison and combine them with the required logic operations.",
    "Draw or read the circuit in the same operation order, using intermediate outputs when gates are connected in stages.",
    "For n inputs, list all 2^n input combinations in the truth table.",
    "Evaluate the intermediate columns before calculating the final output column.",
    "Check that the expression, circuit and truth table produce the same final output for every input combination.",
  ],
  "V3-019-S4.02-CHECK": [
    "PC holds the address of the next instruction, MAR holds the memory address being accessed and MDR holds the data or instruction transferred to or from memory.",
    "CIR holds the current instruction while it is decoded and executed.",
    "ACC stores arithmetic, logic and intermediate results, while IX supports indexed addressing.",
    "The status register stores condition flags such as zero, negative, carry or overflow results.",
    "These registers provide faster, specialised temporary storage inside the processor than main memory.",
  ],
  "V3-020-S4.06-CHECK": [
    "USB is a general serial interface that carries digital data and can also supply power to peripherals.",
    "HDMI carries digital video and audio to a display or similar multimedia device.",
    "VGA carries analogue video to a compatible display and does not carry digital audio.",
  ],
  "V3-022-S4.08-CHECK": [
    "An interrupt requests processor attention when an event needs service without continuous polling.",
    "Possible causes include an input/output device request, a timer event, a hardware fault or a software exception.",
    "The processor normally completes the current instruction and checks that the interrupt is enabled and has sufficient priority.",
    "It saves the current execution context and uses the interrupt type or vector to locate and execute the interrupt service routine.",
    "After the ISR has serviced the event, the saved context is restored and the interrupted program resumes.",
  ],
  "V3-024-S4.11-CHECK": [
    "A trace table records each executed instruction together with ACC, IX, relevant memory or output, and the result of each comparison or branch.",
    "Follow the actual control path after every jump and do not trace source instructions skipped by a taken branch.",
  ],
  "V3-024-S4.12-CHECK": [
    "Data-movement instructions load, copy or store values between registers and memory.",
    "Input/output instructions transfer character codes between ACC and an input or output device.",
    "Arithmetic instructions add, subtract, increment or decrement numeric values.",
    "An unconditional branch always changes the next instruction address, while a conditional branch does so only when its condition is satisfied.",
    "Compare instructions set the comparison result used by a later conditional branch.",
  ],
  "V3-024-S4.14-CHECK": [
    "Immediate addressing places the operand value in the instruction itself.",
    "Direct addressing places the address of the operand in the instruction.",
    "Indirect addressing uses the instruction's address to find another address that locates the operand.",
    "Indexed addressing forms the effective address by combining the instruction's address with the index register.",
    "Relative addressing forms the target address by adding an offset to the current program-counter value.",
  ],
  "V3-024-S4.13-CHECK": [
    "LDM loads an immediate value into ACC; LDD, LDI and LDX load data using direct, indirect and indexed addressing; LDR loads an immediate value into IX; MOV copies ACC to IX; and STO stores ACC in memory.",
    "ADD and SUB perform arithmetic on ACC, while INC and DEC change a register by one.",
    "JMP branches unconditionally; CMP or CMI performs a comparison; JPE branches when the comparison is true and JPN branches when it is false.",
    "IN reads the ASCII code of an input character into ACC, and OUT outputs the character whose ASCII code is in ACC.",
    "END stops the program and returns control to the operating system.",
    "A trace follows the executed branch path and records only the processor, memory and output state changed by each instruction.",
  ],
  "V3-025-S4.15-CHECK": [
    "AND with a mask can test selected bits or clear bits where the mask contains 0.",
    "OR with a mask can set selected bits to 1.",
    "XOR with a mask can toggle selected bits.",
    "LSL and LSR shift bits left or right and insert 0 into the vacated position.",
    "An arithmetic right shift preserves the sign bit, while a cyclic shift moves the displaced end bit to the opposite end.",
    "Bit manipulation is used to monitor or control individual status and control flags stored within a bit pattern.",
  ],
  "V3-027-S5.02-CHECK": [
    "A disk formatter prepares a storage medium with the structures needed to store files.",
    "Anti-virus software detects, quarantines or removes malicious code.",
    "Defragmentation rearranges fragmented file blocks into more contiguous storage locations.",
    "Disk-analysis and repair utilities detect storage errors and attempt to repair damaged file-system structures.",
    "A compression utility rewrites data using fewer bits and reverses the process when the file is decompressed.",
    "Backup software creates recoverable copies so data can be restored after loss, damage or corruption.",
  ],
  "V3-030-S5.07-CHECK": [
    "Context-sensitive prompts suggest valid language elements for the current position in the code.",
    "Dynamic syntax checking reports syntax problems as code is entered, while pretty-printing formats code consistently.",
    "Expand and collapse controls hide or reveal code blocks to make a large program easier to navigate.",
    "Single stepping executes one statement at a time and breakpoints pause execution at selected statements.",
    "Variable and expression inspection shows current values while the program is paused.",
    "A report or diagnostic window displays translator messages, run-time information or program output.",
  ],
  "V3-033-S6.03-CHECK": [
    "User accounts identify users and passwords provide a secret authentication factor.",
    "A digital signature can provide evidence of message origin and detect later alteration.",
    "Biometric authentication compares a captured physical or behavioural feature with an enrolled template.",
    "A firewall filters network traffic according to security rules and blocks disallowed connections.",
    "Anti-virus and anti-spyware software detect, quarantine or remove malicious software.",
    "Encryption converts plaintext into ciphertext so intercepted data is unreadable without the correct key.",
  ],
  "V3-032-S6.04-CHECK": [
    "A virus is malicious code that attaches to or modifies files and replicates when an infected host is executed.",
    "Spyware secretly collects information about a user or system.",
    "A hacker attempts to gain unauthorised access to a computer system or its data.",
    "Phishing uses a deceptive message or website to persuade a user to reveal information or perform an unsafe action.",
    "Pharming redirects a user to a fraudulent site, for example by corrupting DNS or local name-resolution data, even when the user enters the intended address.",
  ],
  "V3-034-S6.08-CHECK": [
    "Visual checking compares entered data with the original source, while double entry compares two independently entered copies.",
    "A parity check tests whether the number of 1 bits matches the agreed odd or even parity.",
    "Block parity can locate a single erroneous bit by combining parity checks across rows and columns.",
    "The sender calculates and transmits a checksum derived from the data block.",
    "The receiver recalculates the checksum and compares it with the received value; a mismatch indicates that an error occurred during transfer.",
  ],
  "V3-037-S7.05-CHECK": [
    "An FSF free-software licence protects the freedoms to run, study, modify and share software, so source access is required for study and modification.",
    "An OSI-approved open-source licence satisfies published open-source criteria and grants stated rights to inspect, modify and redistribute source code.",
    "Shareware is distributed for trial or limited use and normally requires payment for continued or complete use.",
    "A commercial licence grants use under the supplier's restrictions and may provide paid support while limiting copying, modification or redistribution.",
    "A justified choice links the scenario's budget, support, source-modification, redistribution and legal-compliance needs to the selected licence conditions.",
  ],
  "V3-038-S7.06-CHECK": [
    "Artificial intelligence enables a computer system to perform tasks that normally require human-like interpretation, learning or decision making.",
    "Applications include pattern recognition, recommendation, diagnosis, prediction and control of autonomous systems.",
    "Social and economic effects can include improved accessibility or productivity as well as bias, job displacement and unequal access.",
    "Environmental effects include the energy and hardware resources used to train and operate AI systems, balanced against any efficiency savings the application produces.",
  ],
  "V3-039-S8.02-CHECK": [
    "An entity is a real-world object or concept represented by a table; each record or tuple is one instance and each field or attribute stores one property.",
    "A primary key uniquely identifies each record, a candidate key is any minimal possible unique identifier, and a secondary key supports retrieval without necessarily being unique.",
    "A foreign key stores a referenced table's primary-key value and enforces the relationship through referential integrity.",
    "Relationships can be one-to-one, one-to-many or many-to-many; a many-to-many relationship is implemented using a linking table.",
    "An index stores an ordered lookup structure for selected field values so matching records can be located more quickly, at the cost of extra storage and update work.",
  ],
  "V3-040-S8.04-CHECK": [
    "First Normal Form removes repeating groups and requires each field value to be atomic.",
    "Second Normal Form is in 1NF and removes partial dependency on part of a composite primary key.",
    "Third Normal Form is in 2NF and removes transitive dependency, so a non-key attribute does not depend on another non-key attribute.",
    "To judge or produce a 3NF design, identify keys and dependencies, split the relations where a dependency violates the next normal form, and preserve links with foreign keys.",
  ],
  "V3-041-S8.05-CHECK": [
    "The data dictionary stores metadata such as table names, field names, data types, sizes and constraints.",
    "Data modelling defines entities, attributes and relationships, while the logical schema defines the complete logical organisation of the database.",
    "Integrity constraints and validation rules restrict invalid or inconsistent stored values.",
    "Authentication, access rights and other security controls restrict who can view or change data.",
    "Backup and recovery procedures create restorable copies and use them to recover the database after loss or corruption.",
  ],
  "V3-043-S8.09-CHECK": [
    "CREATE DATABASE creates a named database.",
    "CREATE TABLE defines fields using suitable types such as CHARACTER, VARCHAR, BOOLEAN, INTEGER, REAL, DATE and TIME.",
    "A PRIMARY KEY constraint identifies each row uniquely.",
    "A FOREIGN KEY with REFERENCES links a field to the primary key of another table.",
    "ALTER TABLE changes the structure of an existing table, for example by adding a field or constraint.",
    "A complete DDL example must use valid identifiers, data types, commas, brackets and constraints consistently.",
  ],
  "V3-043-S8.10-CHECK": [
    "SELECT identifies the required fields, FROM identifies the table, and WHERE filters rows using a condition.",
    "ORDER BY sorts the result in ascending order by default or descending order when DESC is specified.",
    "GROUP BY forms groups so aggregate functions such as SUM, COUNT or AVG can calculate one result per group.",
    "An INNER JOIN combines matching rows by using an ON condition that compares the related key fields.",
    "For AS Level SQL, one query joins a maximum of two tables.",
    "A complete query must keep field names, table names, aliases, conditions and grouping clauses mutually consistent.",
  ],
  "V3-055-S10.01-CHECK": [
    "INTEGER stores whole numbers and REAL stores numbers that may require a fractional part.",
    "CHAR stores one character, whereas STRING stores a sequence of characters.",
    "BOOLEAN stores TRUE or FALSE and DATE stores a calendar date using the Cambridge pseudocode type names.",
  ],
  "V3-064-S10.09-CHECK": [
    "A stack provides LIFO access through push and pop operations, while a queue provides FIFO access through enqueue and dequeue operations.",
    "A linked list stores each item in a node together with a link to another node rather than requiring contiguous array positions.",
    "Choose a linked list when insertion, deletion or a changing number of linked items matters more than direct indexed access.",
  ],
  "V3-066-S10.09-CHECK": [
    "A stack is suitable when the most recently added item must be removed first, such as nested calls or undo history.",
    "A queue is suitable when items must be processed in arrival order, such as print jobs or service requests.",
    "A linked list is suitable for a changing sequence when nodes must be inserted or removed by changing links.",
  ],
  "V3-070-S11.02-CHECK": [
    "Declare each identifier with a suitable Cambridge data type before it is used.",
    "INPUT reads the required values into the declared variables.",
    "Use arithmetic operators to form the right-hand expression and <- to assign its result to a variable.",
    "OUTPUT displays the required result, and a trace checks the variable values after each executed statement.",
  ],
  "V3-071-S11.02-CHECK": [
    "Declare the required numeric and Boolean variables with suitable Cambridge data types.",
    "INPUT reads the source values before any expression uses them.",
    "Evaluate arithmetic and comparison expressions on the right before assigning their results with <-.",
    "OUTPUT the final value and trace representative input values to confirm the calculation and logic result.",
  ],
  "V3-073-S11.04-CHECK": [
    "IF ... THEN ... ELSE selects between alternatives, and nested IF statements support further decisions inside a branch.",
    "CASE selects one branch by matching one expression against several stated values.",
    "A FOR loop is count-controlled and is suitable when the number of repetitions is known.",
    "A WHILE loop is a pre-condition loop that tests before the body, so the body may execute zero times.",
    "A REPEAT loop is a post-condition loop that tests after the body, so the body executes at least once.",
    "The chosen structure must match the control requirement and be tested for its initial, terminating and boundary conditions.",
  ],
  "V3-078-S11.07-CHECK": [
    "A function header gives the function name, formal parameters and return data type.",
    "Arguments in a function call supply values to the matching formal parameters.",
    "RETURN sends one value of the declared type back to the caller.",
    "Because a function returns a value, its call can be used in an expression or assignment.",
  ],
  "V3-078-S11.08-CHECK": [
    "A procedure header gives the procedure name and any formal parameters but does not declare a function return type.",
    "A function header gives the function name, formal parameters and the type of the value it returns.",
    "A parameter is declared in the subroutine header, while an argument is the actual value or variable supplied by the caller.",
    "A procedure is invoked with CALL when an action is required.",
    "A function executes RETURN and its call supplies one value for use in an expression or assignment.",
    "The call must supply arguments whose number, order, data types and parameter modes match the subroutine interface.",
  ],
  "V3-080-S11.04-CHECK": [
    "IF ... THEN ... ELSE selects between alternatives, and nested IF statements support further decisions inside a branch.",
    "CASE selects one branch by matching one expression against several stated values.",
    "A FOR loop is count-controlled and is suitable when the number of repetitions is known.",
    "A WHILE loop is a pre-condition loop that tests before the body, so the body may execute zero times.",
    "A REPEAT loop is a post-condition loop that tests after the body, so the body executes at least once.",
    "The chosen structure must match the control requirement and be tested for its initial, terminating and boundary conditions.",
  ],
  "V3-080-S11.06-CHECK": [
    "A procedure header declares its name and any formal parameters with their data types.",
    "CALL invokes the procedure and supplies arguments in the order required by the formal parameters.",
    "A procedure can have no parameters, one parameter or several parameters according to the data it must receive or update.",
    "A parameter passed by value gives the procedure a local copy, so changing it does not change the caller's variable.",
    "A parameter passed by reference gives access to the caller's variable, so an assignment can change that variable.",
    "A procedure performs an action and does not return a function value for use in an expression.",
  ],
  "V3-081-S12.01-CHECK": [
    "A development lifecycle organises requirements, design, implementation, testing, installation and maintenance so work and evidence can be controlled.",
    "Waterfall completes defined stages in sequence and provides clear documentation, but late requirement changes can be expensive.",
    "Iterative development builds and reviews successive versions, allowing feedback and changing requirements but requiring version and scope control.",
    "RAD uses rapid prototyping, time-boxed development and frequent user involvement to obtain feedback quickly.",
    "The selected model must match requirement stability, user availability, delivery time, documentation and assurance needs.",
  ],
  "V3-084-S12.04-CHECK": [
    "A syntax error breaks a language rule and is normally reported by the translator.",
    "A logic error uses valid syntax but implements the wrong rule, so the program can run and produce an incorrect result.",
    "A run-time error occurs during execution, for example division by zero or access outside an array bound.",
    "After locating and correcting the cause, rerun the failed test and relevant regression tests to confirm the correction did not introduce another fault.",
  ],
  "V3-085-S12.05-CHECK": [
    "A dry run manually traces code, while a walkthrough has people review the logic and data collaboratively.",
    "White-box testing selects tests from internal paths and conditions, while black-box testing selects tests from the specification without using internal code structure.",
    "Integration testing checks interfaces between combined modules, and a stub temporarily replaces a called module that is not yet available.",
    "Alpha testing is performed by or with the developer in a controlled environment before wider release.",
    "Beta testing is performed by selected external users in their own environment before final release.",
    "Acceptance testing checks the completed system against agreed user requirements before the customer accepts it.",
  ],
  "V3-Q-L041-03": [
    "The DBMS stores the schema or data dictionary that defines tables, fields, data types and relationships.",
    "Integrity and security controls such as constraints, validation and access rights protect the stored data.",
    "Backup and recovery facilities allow the database to be restored after loss or corruption.",
  ],
  "V3-Q-L045-02": [
    "A foreign key does not have to be unique because several rows may refer to the same row in the related table.",
    "Each non-null foreign-key value must match an existing primary-key value in the referenced table.",
    "This referential-integrity rule prevents a row from referring to a related record that does not exist.",
  ],
  "V3-Q-L045-03": [
    "An AND gate outputs 1 only when both inputs are 1.",
    "An OR gate outputs 1 when at least one input is 1.",
    "For inputs 1 and 0, AND outputs 0.",
    "For inputs 1 and 0, OR outputs 1.",
  ],
  "V3-Q-L045-04": [
    "Split 10110110 into the nibbles 1011 and 0110.",
    "The nibbles map to hexadecimal B and 6, so the hexadecimal value is B6.",
    "For denary, add the place values of the 1 bits: 128 + 32 + 16 + 4 + 2.",
    "The denary value is 182.",
  ],
  "V3-Q-L072-01": [
    "The question supplies the function's name, parameters, returned data type and stated behaviour when the function is not one of the standard pseudocode functions.",
    "Use that supplied interface exactly, passing suitable arguments and using the returned value in the required expression or assignment.",
  ],
  "V3-Q-L074-02": [
    "A FOR loop is count-controlled and is used when the required number of repetitions is known.",
    "The loop variable changes on each iteration until the stated final value has been processed.",
  ],
  "V3-Q-L074-03": [
    "For example, FOR Index <- 1 TO 30 ... NEXT Index processes the 30 elements of an array.",
    "The initial value, final value and optional STEP determine the sequence of loop-variable values.",
    "This is appropriate because the array bounds make the number of iterations known before the loop starts.",
  ],
  "V3-Q-L075-01": [
    "A WHILE loop tests its condition before the body, so the body may execute zero times.",
    "A REPEAT loop tests its condition after the body, so the body executes at least once.",
  ],
  "V3-Q-L075-02": [
    "Use WHILE when the condition must be checked before any processing, such as reading only while data remains available.",
    "Use REPEAT when one execution must occur before the stopping condition can be tested, such as validating an entered value.",
    "In both structures, the body must change the state used by the condition so that the loop can terminate.",
  ],
  "V3-Q-L075-03": [
    "WHILE is a pre-condition loop and REPEAT is a post-condition loop.",
    "WHILE Condition ... ENDWHILE can execute zero times when Condition is initially false.",
    "REPEAT ... UNTIL Condition executes once before Condition is first tested.",
    "Choose the structure by deciding whether the body may be skipped or must run at least once.",
  ],
  "V3-Q-L083-03": [
    "Each node represents a possible state of the system.",
    "A directed, labelled transition shows the event or condition that changes the system from one state to another.",
  ],
  "V3-Q-L090-02": [
    "A procedure performs an action but does not supply a value, so its call cannot replace an operand inside an expression.",
    "A function declares a return type and executes RETURN to send one value back to its caller.",
    "The corrected expression uses the function call where the returned value is required.",
  ],
  "V3-Q-L090-03": [
    "Decomposition divides a large problem or system into smaller, manageable subproblems or modules.",
    "The decomposed parts can be designed, implemented or tested separately while preserving their defined interfaces.",
    "Stepwise refinement starts with one high-level algorithm step and repeatedly replaces it with more detailed ordered steps.",
    "Refinement continues until each step can be expressed as an implementable pseudocode operation.",
  ],
  "V3-Q-L090-04": [
    "An iterative or RAD lifecycle develops a working part or prototype early and presents it to users.",
    "User feedback is used to revise requirements, interfaces and behaviour in the next iteration.",
    "Repeated build-review-refine cycles allow the booking system to converge on users' actual needs.",
    "A relevant drawback is the management time required for repeated feedback and version control, or the risk of weak documentation when changes are rushed.",
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
  if (lesson.section === 1) {
    const classification = classifyCommand(question.prompt, requirementId);
    if (classification.status !== "Approved") throw new Error(`${question.id}: authored S1 command is invalid`);
    if (!question.objectiveIds?.length || !question.objectiveIds.every((id) => lesson.objectives.some(([candidate]) => candidate === id))) throw new Error(`${question.id}: explicit S1 objective mapping is invalid`);
    if (question.marks !== question.answerPoints.length) throw new Error(`${question.id}: authored S1 marks differ from scoring points`);
    return { ...question, commandWord: sentenceCase(classification.word) };
  }
  if (question.authored) {
    const classification = classifyCommand(question.prompt, requirementId);
    if (classification.status !== "Approved") throw new Error(`${question.id}: authored question needs a Cambridge command word`);
    if ([6, 7, 8, 9, 10, 11, 12].includes(lesson.section) && (!question.objectiveIds?.length || !question.objectiveIds.every((id) => lesson.objectives.some(([candidate]) => candidate === id)) || question.marks !== question.answerPoints.length)) throw new Error(`${question.id}: authored mapping or marking points are invalid`);
    return { ...question, commandWord: sentenceCase(classification.word) };
  }
  let prompt = promptOverrides[question.id] ?? coveragePrompt(question, lesson);
  prompt = normaliseQuestionPrompt(rewriteQuestionForm(prompt));
  let classification = requirementId ? classifyCommand(prompt, requirementId) : { status: "Blocked" };
  if (classification.status !== "Approved") {
    prompt = normaliseQuestionPrompt(`Explain ${prompt.replace(/[?]+$/, ".").replace(/^\w/, (value) => value.toLowerCase())}`);
    classification = requirementId ? classifyCommand(prompt, requirementId) : { status: "Blocked" };
  }
  if (classification.status !== "Approved") throw new Error(`${question.id}: unable to assign a Cambridge command word`);
  const isCoverageCheck = /-CHECK$/i.test(question.id);
  const directAnswerOverride = answerOverrides[question.id];
  let selectedAnswerPoints = directAnswerOverride ?? question.answerPoints;
  if (isCoverageCheck && !directAnswerOverride) {
    const unit = lesson.units.find((candidate) => candidate.objectiveIds.some((id) => question.objectiveIds.includes(id)));
    if (unit?.masteryCheck?.marks === question.marks && selectedAnswerPoints.length === question.marks) {
      selectedAnswerPoints = [...selectedAnswerPoints];
    } else if (unit) {
      const objectiveFocus = lesson.objectives.filter(([id]) => question.objectiveIds.includes(id)).map(([, description]) => description).join(" ");
      selectedAnswerPoints = rankedRelevantMarkingPoints(
        [...selectedAnswerPoints, ...unitAnswerCandidateValues(unit)],
        `${prompt} ${objectiveFocus}`,
        { target: Math.min(6, Math.max(2, question.marks)) },
      );
    }
  }
  const seenAnswerPoints = new Set();
  const answerPoints = selectedAnswerPoints
    .map(directAnswerOverride || lesson.section === 2 ? completeMarkPoint : conciseMarkPoint)
    .map((point) => markPointRewrites.get(normalisePresentationText(point)) ?? point)
    .filter((point) => {
      const key = normalisePresentationText(point);
      if (!key || seenAnswerPoints.has(key)) return false;
      seenAnswerPoints.add(key);
      return true;
    });
  return {
    ...question,
    prompt,
    commandWord: sentenceCase(classification.word),
    marks: isCoverageCheck ? answerPoints.length : question.marks,
    answerPoints,
  };
}

function finaliseUnit(unit, lesson, unitIndex) {
  unit = expandConceptTeaching(unit, lesson.section);
  const sourceMaterials = [...(unit.materials ?? [])];
  const generatedDiagram = unit.useAuthoredVisual ? null : knowledgeDiagramForUnit(lesson.sequenceIndex, unitIndex + 1);
  if (generatedDiagram) sourceMaterials.unshift({ ...generatedDiagram, objectiveIds: [...unit.objectiveIds] });
  const candidates = sourceMaterials
    .filter((material) => material.type !== "worked-example")
    .sort((left, right) => visualPriority(left) - visualPriority(right));
  if (!candidates.length) throw new Error(`${unit.syllabusId}: no lead visual candidate`);
  const sourceCore = unit.coreBlocks ?? unit.coreExplanation ?? unit.explanation ?? [];
  const coreBlocks = sourceCore.some(block => typeof block !== "string")
    ? sourceCore.map(block => typeof block === "string" ? coreParagraph(cleanCoreParagraph(block)) : block)
    : undefined;
  const coreExplanation = coreBlocks ? coreBlockTexts(coreBlocks) : dedupeCoreParagraphs(sourceCore);
  const blockErrors = validateCoreBlocks({ ...unit, coreBlocks, coreExplanation });
  if (blockErrors.length) throw new Error(blockErrors.join("\n"));
  let leadVisual = { ...compactLeadVisual(candidates[0], unit.heading), objectiveIds: [...unit.objectiveIds] };
  const methodCandidate = sourceMaterials.find((material) => material.type === "flow" && material !== candidates[0]);
  const cleanedMethod = (lesson.section === 1 || unit.preserveTeachingSteps) ? methodCandidate : cleanMethod(methodCandidate, coreExplanation, leadVisual);
  const method = cleanedMethod && !/worked.*example/i.test(cleanedMethod.title)
    ? { ...cleanedMethod, title: [1, 10].includes(lesson.section) ? cleanedMethod.title : methodTitleOverrides[unit.syllabusId] ?? cleanedMethod.title }
    : null;
  const sourceExample = sourceMaterials.find((material) => material.type === "worked-example");
  const workedExample = /worked.*example/i.test(cleanedMethod?.title ?? "")
      ? { ...cleanedMethod, type: "worked-example" }
      : ([1, 6].includes(lesson.section) || unit.preserveTeachingSteps) ? sourceExample : cleanWorkedExample(sourceExample, coreExplanation, leadVisual);

  return {
    ...unit,
    leadVisual,
    coreExplanation,
    ...(coreBlocks ? { coreBlocks } : {}),
    method,
    workedExample,
    supportingMaterials: sourceMaterials.filter((material) => material.preserve && material !== candidates[0]),
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
  "S3-L01-EXAM-2": {
    prompt: "An embedded controller operates a washing machine. Explain one benefit and one drawback of using an embedded system for this task.",
    objectiveIds: ["S3.02.A02", "S3.02.A03"],
    answerPoints: [
      "The controller is designed for one dedicated set of washing-machine functions, allowing efficient, reliable operation with limited hardware resources.",
      "Dedicated hardware and software can reduce size, power use or unit cost compared with a general-purpose computer.",
      "Limited memory, processing capacity and fixed interfaces make unrelated new functions or major upgrades difficult to add.",
    ],
    commonError: "Do not identify an embedded system only by its small size; link its dedicated purpose to the stated benefit and limitation.",
  },
  "S3-L01-EXAM-1": {
    prompt: "A field data logger receives measurements, processes them, shows warnings and retains a record after power is removed. Explain the roles of input, output, primary memory, secondary storage and removable storage in this system.",
    objectiveIds: ["S3.01.A01", "S3.01.A02", "S3.01.A03", "S3.01.A04", "S3.01.A05"],
    answerPoints: [
      "Input devices supply data and instructions to the computer system.",
      "Output devices communicate processed information or cause an action.",
      "Primary memory holds instructions and data needed during current processing.",
      "Secondary storage retains programs and data when power is removed.",
      "Removable storage can transfer data between systems or hold an offline copy.",
    ],
    commonError: "Do not replace the hardware-role explanation with embedded-system or control-system detail.",
  },
  "S3-L01-EXAM-3": {
    prompt: "A washing machine contains a programmable controller. Explain why this is an embedded system and how the controller, memory, inputs and outputs support its dedicated function.",
    objectiveIds: ["S3.02.A01"],
    answerPoints: [
      "The computer system is built into the larger washing machine.",
      "It performs a dedicated washing-control function or closely related functions.",
      "Inputs supply data such as a selected program or sensor reading.",
      "The controller executes instructions held in memory.",
      "Outputs operate components such as the motor, valve or display.",
    ],
    commonError: "Do not identify an embedded system only by its size; state the larger device and dedicated function.",
  },
  "S3-L02-EXAM-1": {
    prompt: "A school prints examination cover sheets using a laser printer. Describe the principal operation that produces each printed page.",
    objectiveIds: ["S3.03.A01"],
    answerPoints: [
      "A photosensitive drum is given an electrostatic charge.",
      "A laser creates a charge pattern representing the page.",
      "Toner adheres to the required areas of the drum.",
      "The toner image transfers to paper.",
      "Heat and pressure fuse the toner to the paper.",
    ],
    commonError: "Do not describe an inkjet print head; a laser printer uses a charged drum, toner and a fuser.",
  },
  "S3-L02-EXAM-2": {
    prompt: "A designer sends a digital model to a 3D printer. Describe how the printer produces the physical object.",
    objectiveIds: ["S3.03.A02"],
    answerPoints: [
      "Software divides the digital model into thin layers.",
      "The printer follows the data for one layer at a time.",
      "Material is deposited or solidified at the required positions.",
      "The print head or platform moves for the next layer.",
      "Successive layers form the physical object.",
    ],
    commonError: "Do not state only that material is added; explain the digital slicing and successive layer process.",
  },
  "S3-L02-EXAM-3": {
    prompt: "Describe how a microphone and an analogue-to-digital converter produce binary data representing speech.",
    objectiveIds: ["S3.03.A03"],
    answerPoints: [
      "Sound waves cause the microphone diaphragm to vibrate.",
      "A transducer converts the movement into a varying analogue electrical signal.",
      "The ADC samples the signal at regular time intervals.",
      "Each sample is quantised to an available level.",
      "The sample values are encoded as binary data.",
    ],
    commonError: "Do not omit the analogue electrical signal or claim that the diaphragm directly stores binary values.",
  },
  "S3-L02-EXAM-4": {
    prompt: "A media player sends stored audio to powered speakers. Describe the signal path and physical operation that produce sound waves.",
    objectiveIds: ["S3.03.A04"],
    answerPoints: [
      "A DAC converts the binary sample values into a varying analogue signal.",
      "An amplifier supplies sufficient current to the speaker.",
      "Current in the voice coil produces a changing magnetic field.",
      "The coil and attached cone move.",
      "The cone vibrates the air to produce sound waves.",
    ],
    commonError: "Do not reverse the conversion direction; speakers convert digital data towards analogue motion and sound.",
  },
  "S3-L02-EXAM-5": {
    prompt: "A file is written to a magnetic hard disk and later read. Describe the physical and electronic operations used in both processes.",
    objectiveIds: ["S3.03.A05"],
    answerPoints: [
      "The magnetic platters rotate.",
      "An actuator positions the read/write head over the required track.",
      "The required sector passes beneath the head.",
      "Writing changes the magnetic orientation of areas that represent bits.",
      "Reading senses the magnetic pattern and the controller decodes it as binary data.",
    ],
    commonError: "Do not describe the head as normally touching the platter or replace the magnetic mechanism with laser reading.",
  },
  "S3-L02-EXAM-6": {
    prompt: "Describe how solid-state flash memory cells in a digital camera are programmed, erased and read.",
    objectiveIds: ["S3.03.A06"],
    answerPoints: [
      "Flash memory uses floating-gate transistor cells.",
      "Electrical charge trapped in a cell changes its threshold behaviour and represents stored data.",
      "The controller applies voltages to program cells.",
      "Erasing removes or changes the stored charge electrically.",
      "Reading detects the charge state of the addressed cells.",
    ],
    commonError: "Do not describe flash memory as magnetic storage; it stores charge electronically and has no moving parts.",
  },
  "S3-L02-EXAM-7": {
    prompt: "An optical drive reads a recorded file and later writes a backup to a recordable disc. Describe the laser and detector operations used for both tasks.",
    objectiveIds: ["S3.03.A07"],
    answerPoints: [
      "The drive spins the disc and focuses a laser on its track.",
      "A low-power laser is used for reading.",
      "A detector senses differences in reflected light.",
      "The controller converts the detected changes into binary data.",
      "A higher-power laser changes areas of the recording layer when writing.",
    ],
    commonError: "Do not use a magnetic read/write explanation; the optical drive uses laser light and reflection differences.",
  },
  "S3-L02-EXAM-8": {
    prompt: "A user selects an icon on a capacitive touchscreen. Describe how the system detects the touch position.",
    objectiveIds: ["S3.03.A08"],
    answerPoints: [
      "The screen maintains an electric field across a transparent electrode grid.",
      "The user's finger changes the local capacitance or electric field.",
      "The electrode grid detects the location of the change.",
      "The controller calculates the touch coordinates.",
      "The coordinates are supplied to the software as input.",
    ],
    commonError: "Do not describe only the displayed icon; explain how the touch-sensitive layer produces position data.",
  },
  "S3-L02-EXAM-9": {
    prompt: "A user turns their head while wearing a virtual-reality headset. Describe how the headset and computer update the user's view.",
    objectiveIds: ["S3.03.A09"],
    answerPoints: [
      "Motion and orientation sensors detect the head movement.",
      "The sensor data is sent to the computer.",
      "The computer recalculates the rendered viewpoint.",
      "A separate updated image is displayed for each eye.",
      "The scene therefore appears to follow the user's head movement.",
    ],
    commonError: "Do not describe the headset only as a display; movement sensors provide the input used to update the view.",
  },
  "S3-L03-EXAM-1": {
    prompt: "Several applications send documents to one slow printer. Explain how the print queue, printer driver and buffer allow the transfers to be managed.",
    objectiveIds: ["S3.04.A01"],
    answerPoints: [
      "The driver translates operating-system requests into printer-specific commands and data formats.",
      "The buffer temporarily stores data during transfer.",
      "The queue preserves the order of waiting print jobs.",
      "The printer consumes buffered data at its own rate while the processor continues other work.",
    ],
    commonError: "Do not claim that the buffer increases the printer's long-term operating speed.",
  },
  "S3-L03-EXAM-2": {
    prompt: "Compare RAM with ROM, then explain why a computer uses RAM for active programs and ROM for start-up instructions.",
    objectiveIds: ["S3.05.A01", "S3.05.A02"],
    answerPoints: [
      "RAM is normally volatile whereas ROM is non-volatile.",
      "RAM is read/write working memory whereas ROM is normally read during operation.",
      "Active programs and changing data require writable RAM.",
      "Start-up instructions must persist without power, so they are held in ROM.",
    ],
    commonError: "Do not introduce SRAM and DRAM when the comparison requested is RAM against ROM.",
  },
  "S3-L03-EXAM-3": {
    prompt: "Explain the differences between PROM, EPROM and EEPROM, including how each can be programmed or erased.",
    objectiveIds: ["S3.07.A01", "S3.07.A02", "S3.07.A03"],
    answerPoints: [
      "PROM is supplied blank and can be programmed once.",
      "EPROM can be erased using ultraviolet light and then reprogrammed.",
      "EEPROM can be erased and reprogrammed electrically.",
    ],
    commonError: "Do not state only that all three are non-volatile; distinguish their programming and erasing methods.",
  },
  "S3-L04-EXAM-1": {
    prompt: "Compare the monitoring and control functions of an automated greenhouse.",
    objectiveIds: ["S3.08.A01", "S3.08.A02"],
    answerPoints: [
      "Both functions can obtain data from sensors.",
      "Monitoring records, displays or alerts about the measured condition.",
      "Control compares a reading with a stored target or rule.",
      "Control sends an output signal to an actuator to change the physical condition.",
    ],
    commonError: "Do not call measurement and display alone a control action.",
  },
  "S3-L04-EXAM-2": {
    prompt: "For each use, identify the appropriate named sensor and explain why it is suitable: greenhouse temperature, tyre pressure, remote-control signal and room noise level.",
    objectiveIds: ["S3.09.A01"],
    answerPoints: [
      "A temperature sensor measures greenhouse temperature.",
      "A pressure sensor measures tyre pressure.",
      "An infra-red sensor detects radiation from the remote control.",
      "A sound sensor detects the room's sound waves or sound level.",
    ],
    commonError: "Use the physical quantity detected to justify each named sensor.",
  },
  "S3-L04-EXAM-3": {
    prompt: "An automated greenhouse uses a temperature sensor and a heater. Explain how feedback allows the control system to maintain the target temperature.",
    objectiveIds: ["S3.08.A03", "S3.09.A02"],
    answerPoints: [
      "The temperature sensor repeatedly supplies a reading to the controller.",
      "The controller compares the current reading with the target temperature.",
      "It sends an output signal to the heater actuator when a change is required.",
      "The actuator changes the physical temperature.",
      "New readings report the effect of the action, allowing the controller to adjust or stop the heater and correct disturbances.",
    ],
    commonError: "Feedback is the new sensor reading returned after the action, not the output signal sent to the heater.",
  },
  "S4-L03-EXAM-2": {
    prompt: "Describe the fetch stage of the fetch-execute cycle using register-transfer notation from the address in PC to the instruction in CIR.",
    answerPoints: [
      "MAR <- PC copies the address of the next instruction into the memory address register.",
      "MDR <- Memory[MAR] transfers the instruction at that address from memory into MDR.",
      "CIR <- MDR copies the fetched instruction into the current instruction register.",
      "PC <- PC + 1 advances PC to the address of the following instruction.",
    ],
    commonError: "Do not put the fetched instruction directly into ACC; CIR holds the current instruction for decoding.",
  },
  "S4-L05-EXAM-2": {
    prompt: "Describe the two passes made by a two-pass assembler and explain how the symbol table is used.",
    answerPoints: [
      "During pass one, the assembler assigns addresses to instructions and data and records label-address pairs in the symbol table.",
      "Forward references can be recorded even though the final address is not yet available when an earlier source line is first read.",
      "During pass two, mnemonics are translated into opcodes and symbolic operands are replaced using their addresses from the symbol table.",
      "The completed machine or object code can then contain the correct numeric addresses for both earlier and forward-referenced labels.",
    ],
    commonError: "Do not describe pass one only; pass two must use the completed symbol table to produce the translated code.",
  },
  "S4-L07-EXAM-3": {
    prompt: "Compare logical, arithmetic and cyclic right shifts of an 8-bit register, stating what enters the most significant bit in each case.",
    answerPoints: [
      "A logical right shift moves every bit one place right and inserts 0 into the most significant position.",
      "An arithmetic right shift moves bits right but copies the original sign bit into the most significant position to preserve the sign of a two's-complement value.",
      "A cyclic right shift moves the least significant bit around into the most significant position instead of discarding it.",
    ],
    commonError: "Do not say that every right shift inserts 0; arithmetic and cyclic shifts treat the vacated position differently.",
  },
  "S6-L02-EXAM-2": {
    prompt: "Describe how a user account and password work together to authenticate a user, and give one limitation of password authentication.",
    answerPoints: [
      "The user account supplies a distinct identity that the system can associate with access rights and an audit trail.",
      "The entered password is transformed and compared with the stored verifier for that account before authentication succeeds.",
      "A guessed, reused, disclosed or phished password can allow an attacker to impersonate the account holder.",
    ],
    commonError: "Do not describe a digital signature; this task concerns identity authentication using an account and secret password.",
  },
  "S6-L03-EXAM-1": {
    prompt: "Explain how spyware threatens a user and how anti-spyware software can reduce the risk.",
    answerPoints: [
      "Spyware runs without the user's informed consent and secretly monitors activity or collects information such as browsing data or credentials.",
      "The captured information can be transmitted to an unauthorised third party, causing privacy, account or financial harm.",
      "Updated anti-spyware software scans for known signatures or suspicious behaviour and can block, quarantine or remove detected spyware.",
      "Detection reduces risk but does not guarantee protection from a new or well-hidden spyware variant.",
    ],
    commonError: "Do not describe a self-replicating virus; spyware is characterised by covert monitoring or information collection.",
  },
  "S8-L02-EXAM-3": {
    prompt: "A table OrderLine(OrderID, ProductID, ProductName, UnitPrice, Quantity) has the composite key (OrderID, ProductID), and ProductName and UnitPrice depend only on ProductID. Explain how to convert it to 2NF and then state the remaining 3NF test.",
    answerPoints: [
      "ProductName and UnitPrice have a partial dependency on ProductID, which is only part of the composite primary key.",
      "Create Product(ProductID, ProductName, UnitPrice) with ProductID as its primary key.",
      "Keep OrderLine(OrderID, ProductID, Quantity), using the composite key and ProductID as a foreign key to Product.",
      "For 3NF, check that no non-key attribute depends transitively on another non-key attribute in either relation.",
    ],
    commonError: "Do not remove ProductID from OrderLine; it is needed in the composite key and to reference Product.",
  },
  "S8-L03-EXAM-1": {
    prompt: "A school database stores StudentID as a primary key and TutorID as a foreign key. Explain how a DBMS can enforce entity, referential and domain integrity for these fields.",
    answerPoints: [
      "A primary-key constraint requires each StudentID to be unique and not null, enforcing entity integrity.",
      "A foreign-key constraint requires each non-null TutorID to match an existing primary-key value in the Tutor table, enforcing referential integrity.",
      "Data types, ranges or validation constraints restrict each field to permitted values, enforcing domain integrity.",
      "The DBMS rejects an insert or update that violates one of these declared constraints.",
    ],
    commonError: "Do not substitute backup or access rights for integrity constraints; those protect recovery and permissions rather than valid relationships and values.",
  },
  "S8-L06-EXAM-2": {
    prompt: "Describe the AS Level two-table limit for an SQL query and explain how Student and Loan can be joined within that limit.",
    answerPoints: [
      "One AS Level query joins at most two tables, so the query uses Student and Loan only.",
      "INNER JOIN combines matching rows and ON compares the related keys, for example Student.StudentID = Loan.StudentID.",
      "Fields from either of these two tables can then be selected, but a third table is not added to the same query.",
    ],
    commonError: "Do not describe GROUP BY as the table limit; GROUP BY forms aggregate groups and does not replace the join condition.",
  },
  "S10-L04-EXAM-3": {
    prompt: "A program stores the 30 daily attendance totals for one class. Explain why a one-dimensional array is suitable and give one relevant limitation.",
    answerPoints: [
      "Each attendance total needs one position identified by a single day index, so a one-dimensional array matches the data structure.",
      "The fixed bounds can represent the 30 days and support a FOR loop that processes every valid element.",
      "An array has a fixed declared size, so a different number of days may require a different bound or another structure.",
    ],
    commonError: "Do not choose a two-dimensional array merely because there are many values; each value needs only one index.",
  },
  "S10-L05-EXAM-2": {
    prompt: "Describe pseudocode that inputs values into a two-dimensional array Marks[1:30, 1:4].",
    answerPoints: [
      "Declare Marks with two inclusive index ranges and a suitable element type.",
      "Use an outer loop for Student <- 1 TO 30 and an inner loop for Test <- 1 TO 4.",
      "INPUT Marks[Student, Test] supplies both indexes to identify one complete array element.",
      "Close the inner loop before advancing the outer loop so all four tests are entered for each student.",
    ],
    commonError: "Do not use one index only or reverse the loop terminators; every element is identified by both student and test indexes.",
  },
  "S10-L05-EXAM-3": {
    prompt: "A theatre stores whether each seat in 20 rows and 6 columns is occupied. Explain why a two-dimensional BOOLEAN array is suitable and give one limitation.",
    answerPoints: [
      "Each seat is naturally identified by two coordinates, row and column, so two indexes locate one element.",
      "BOOLEAN is suitable because each element needs only the two states occupied and not occupied.",
      "The fixed array bounds work for a fixed seating plan but must be changed if the row or column layout changes.",
    ],
    commonError: "Do not use a one-dimensional array without an additional mapping because the task identifies seats by both row and column.",
  },
  "S10-L08-EXAM-3": {
    prompt: "Explain why a text-file loop tests NOT EOF before executing READFILE and state what should happen after the final record.",
    answerPoints: [
      "NOT EOF confirms that another record is available before READFILE attempts to read it.",
      "The test prevents a read beyond the end of the file, which could cause an error or invalid data.",
      "After the final record has been processed and EOF becomes true, the loop terminates and the file is closed.",
    ],
    commonError: "Do not execute READFILE first and test EOF afterwards when no record may remain.",
  },
  "S2-L01-EXAM-1": {
    prompt: "Compare a LAN with a WAN in terms of geographical scope and control of the network infrastructure.",
    objectiveIds: [
      "S2.01.A02",
      "S2.01.A03"
    ],
    answerPoints: [
      "A LAN normally covers a limited geographical area, such as one managed campus.",
      "A WAN spans a large geographical area and can link networks at distant sites.",
      "A LAN is normally owned or controlled by a single organisation.",
      "A WAN commonly depends on telecommunications-provider infrastructure for its inter-site links."
    ],
    commonError: "Compare the same factors for both networks; speed alone does not define LAN or WAN."
  },
  "S2-L01-EXAM-2": {
    prompt: "Explain why a peer-to-peer model may suit a four-person design studio that shares non-critical files, has a very small budget and has no specialist administrator. Include two drawbacks.",
    objectiveIds: ["S2.02.A01", "S2.02.A02", "S2.02.A03"],
    answerPoints: [
      "A peer-to-peer model is suitable because each computer can provide files directly without a dedicated server.",
      "Avoiding dedicated server hardware and administration matches the small budget and group size.",
      "Accounts, permissions and backups are managed separately on the peers rather than through one central system.",
      "A shared file becomes unavailable when the peer providing it is switched off or disconnected.",
    ],
    commonError: "Do not describe peer-to-peer as a topology; it specifies which computers request and provide resources.",
  },
  "S2-L01-EXAM-3": {
    prompt: "Field engineers must run large CAD applications when disconnected and synchronise their work after returning online. Suggest thin or thick clients and justify the choice with one management drawback.",
    objectiveIds: ["S2.03.A01", "S2.03.A02", "S2.03.A03"],
    answerPoints: [
      "Thick clients are suitable because substantial application processing takes place on each local computer.",
      "Local applications remain usable offline; a thin client relying on server processing would lose that access when disconnected.",
      "Local hardware must have enough processing power and storage for the engineering workload.",
      "Software updates, security controls and synchronisation must be managed across several separate devices.",
    ],
    commonError: "Do not choose a client type from the physical size of the computer; base the decision on processing placement and network dependence.",
  },
  "S2-L02-EXAM-1": {
    prompt: "Four routers must each have a direct link to every other router. Identify the topology, calculate the number of links, and explain one resilience benefit and one cost drawback.",
    objectiveIds: ["S2.04.A03", "S2.05.A02", "S2.05.A03"],
    answerPoints: [
      "The required topology is a full mesh.",
      "Four routers require 4 x 3 / 2 = 6 pair-to-pair links.",
      "If one link fails, traffic may use another connected route through the remaining links.",
      "The extra cables, interfaces and routing configuration increase installation cost and management complexity.",
    ],
    commonError: "Do not count each bidirectional link twice; one physical link connects each unordered pair of routers.",
  },
  "S2-L02-EXAM-2": {
    prompt: "Compare the effects of a workstation-cable failure and a central-medium failure in bus and star networks.",
    objectiveIds: ["S2.04.A01", "S2.04.A02", "S2.05.A02"],
    answerPoints: [
      "A failed drop or workstation connection on a bus may isolate that device while the intact backbone can still carry other traffic.",
      "A break in the shared bus backbone can divide the network or stop communication for multiple devices.",
      "A failed end-device cable in a star normally isolates only the device on that separate link.",
      "Failure of the central switch stops communication through that star even when the end-device cables remain intact.",
    ],
    commonError: "Do not claim that every cable failure has the same effect; identify whether the failed component is local, shared or central.",
  },
  "S2-L02-EXAM-3": {
    diagram: "/assets/course-v3/section-2/question-partial-mesh.svg",
    diagramLabel: "Router network for Exam Question 3",
    diagramAlt: "Before either failure: P is upper left, Q upper right, R lower right and T lower left. The only links are P–Q, Q–R, R–T and T–P. Each link is bidirectional.",
    prompt: "A partial mesh has routers P, Q, R and T. Its only links are P–Q, Q–R, R–T and T–P. Describe a route from P to R after P–Q fails. A second failure then removes T–P. Explain whether P can still reach R and what this shows about mesh resilience.",
    objectiveIds: [
      "S2.04.A03",
      "S2.05.A01",
      "S2.05.A02"
    ],
    answerPoints: [
      "After P–Q fails, P can send to T over P–T.",
      "T can forward to R over T–R, completing the path P → T → R.",
      "If T–P also fails, P has no remaining working link.",
      "P cannot reach R even though the links Q–R and R–T still work.",
      "Resilience depends on the remaining connected paths; a mesh does not survive every combination of failures."
    ],
    commonError: "Use only the four supplied links; there is no direct P–R link."
  },
  "S2-L03-EXAM-1": {
    prompt: "Describe what happens when a student uses a low-specification laptop to run a browser-based simulation whose processing and files are hosted by a cloud provider. Include the effect of losing the network connection.",
    objectiveIds: ["S2.06.A01", "S2.06.A03"],
    answerPoints: [
      "The laptop sends a request to remote computing resources through its network connection.",
      "Servers at the provider execute the simulation and store the associated files rather than requiring all work to occur locally.",
      "The provider returns the simulation output or interface data to the student's browser.",
      "Loss of the network connection or provider service prevents or limits access even though the laptop still works.",
    ],
    commonError: "Do not describe cloud computing as files floating on the internet; identify the remote servers, network requests and returned results.",
  },
  "S2-L03-EXAM-2": {
    prompt: "Explain why the term public cloud does not mean that every member of the public can read a customer's stored files.",
    objectiveIds: ["S2.06.A02"],
    answerPoints: [
      "Public describes a provider-operated service whose underlying resources are offered to multiple customers.",
      "Each customer uses authenticated accounts and permissions that restrict access to authorised users.",
      "Logical separation prevents one customer from being given normal access to another customer's data.",
      "The customer still needs correctly configured access controls because shared service provision is not automatic public data access.",
    ],
    commonError: "Do not confuse shared provider infrastructure with unrestricted file permissions.",
  },
  "S2-L03-EXAM-3": {
    prompt: "Suggest two measures that could reduce disruption when a provider outage makes a company's cloud-hosted order system unavailable. Explain how each measure helps.",
    objectiveIds: [
      "S2.06.A03"
    ],
    answerPoints: [
      "Maintain and test a replica or recoverable backup outside the affected provider service.",
      "This provides an independent copy from which the company can restore or continue access to order data.",
      "Provide a tested offline order-entry procedure or an independently hosted failover application.",
      "Staff can continue recording orders during the outage and reconcile them when the main service returns."
    ],
    commonError: "Credit other valid measure-and-effect pairs; a backup within the same unavailable service is not an independent recovery route."
  },
  "S2-L04-EXAM-1": {
    prompt: "Compare copper cable with fibre-optic cable for a 500-metre factory link that passes close to powerful electric motors, and suggest the more suitable medium.",
    objectiveIds: ["S2.07.A01", "S2.08.A01", "S2.08.A02", "S2.08.A06"],
    answerPoints: [
      "Copper carries electrical signals that can be affected by electromagnetic interference from the motors.",
      "Signal attenuation over the long copper run can also restrict reliable transmission or require additional equipment.",
      "Fibre carries light and is not affected by electromagnetic interference from the nearby motors.",
      "Fibre supports the long high-capacity link but normally has greater installation or termination cost.",
      "Fibre is the more suitable choice because interference resistance and distance matter in the stated factory route.",
    ],
    commonError: "Do not choose fibre only because it is newer; link its light-based transmission and interference resistance to the factory conditions.",
  },
  "S2-L04-EXAM-2": {
    prompt: "Describe the characteristics of microwaves used to connect two hilltop offices, including two conditions that can reduce the reliability of the link.",
    objectiveIds: ["S2.08.A04"],
    answerPoints: [
      "Directional microwave antennas transmit electromagnetic signals between the two fixed sites.",
      "The antennas require a clear line of sight and accurate alignment.",
      "Buildings, terrain or later obstructions in the path can block or weaken the link.",
      "Severe weather, interference or misalignment can reduce signal quality and reliability.",
    ],
    commonError: "Do not describe the link as local WiFi; microwaves use aligned directional antennas over a line-of-sight path.",
  },
  "S2-L04-EXAM-3": {
    prompt: "Describe the characteristics of satellites used for communication with a research vessel far from land, including two disadvantages for interactive communication.",
    objectiveIds: ["S2.08.A05"],
    answerPoints: [
      "The vessel can communicate using microwaves sent to and received from a satellite over a very large coverage area.",
      "Satellite coverage can reach an offshore location where installing cable along the whole route is impossible.",
      "The long signal path introduces a noticeable time delay that affects interactive calls or control.",
      "Equipment, service cost, weather effects or limited shared capacity can also constrain the connection.",
    ],
    commonError: "Do not claim that satellite communication has zero delay; the signal travels a long distance to and from the satellite, which creates a time delay.",
  },
  "S2-L05-EXAM-1": {
    prompt: "A long LAN has a weak signal at its far end, and two busy LAN segments exchange only occasional traffic. Explain how a repeater and a bridge solve the two different problems.",
    objectiveIds: ["S2.09.A04"],
    answerPoints: [
      "A repeater receives a weakened signal and regenerates it before forwarding it along the medium.",
      "Regeneration extends the usable transmission distance but does not choose a destination for each frame.",
      "A bridge connects the two LAN segments and learns or examines link-layer addresses.",
      "The bridge forwards frames that must cross between segments and filters local frames that do not need to cross.",
      "Filtering unnecessary cross-segment traffic reduces traffic on the other segment.",
    ],
    commonError: "Do not interchange the devices: a repeater regenerates signals, whereas a bridge makes frame-forwarding decisions between segments.",
  },
  "S2-L05-EXAM-2": {
    prompt: "Compare the network connection of a wired desktop with a wireless laptop on the same LAN, including the interfaces, access device and continuing role of the switch.",
    objectiveIds: ["S2.09.A01", "S2.09.A02", "S2.09.A03"],
    answerPoints: [
      "The laptop uses a WNIC to transmit and receive LAN data by radio instead of using the desktop's wired NIC and end cable.",
      "A wireless access point provides the laptop's wireless connection to the LAN.",
      "The access point normally connects by cable to a port on the existing wired LAN.",
      "The switch still forwards frames between the access point, wired devices and other required LAN ports.",
    ],
    commonError: "Do not state that a WNIC connects directly to the internet; it first provides the laptop's interface to the wireless LAN.",
  },
  "S2-L05-EXAM-3": {
    prompt: "Two devices using CSMA/CD detect a collision after transmitting at almost the same time. Describe the complete sequence from carrier sensing to a successful retry.",
    answerPoints: [
      "Each device listens to the shared medium and transmits only when it senses that the medium is idle.",
      "The near-simultaneous transmissions collide and each transmitting device detects the collision.",
      "The devices stop transmitting and send or recognise a jam signal so all stations know that a collision occurred.",
      "Each device waits for a randomly selected backoff period.",
      "After the backoff, a device senses the medium again before retrying the transmission.",
      "Different random delays reduce the chance of the same devices colliding again on the retry.",
    ],
    commonError: "Do not omit carrier sensing, collision detection or the second carrier check after the random backoff.",
  },
  "S2-L06-EXAM-1": {
    prompt: "Describe how an on-demand recorded lecture can begin playing before its complete file has arrived, including the role of ordered data and the buffer.",
    objectiveIds: ["S2.12.A01", "S2.12.A02", "S2.12.A04"],
    answerPoints: [
      "The stored lecture is delivered progressively as an ordered stream of data rather than waiting for the complete file.",
      "The player accumulates an initial portion of the arriving stream in a buffer before playback begins.",
      "Playback consumes buffered data in sequence while later portions continue to arrive from the server.",
      "Because the lecture is on demand, the user chooses when to start the already stored content.",
      "A temporary fall in arrival rate can be absorbed while enough unplayed data remains in the buffer.",
    ],
    commonError: "Do not say that streaming requires the complete file to arrive before playback; progressive delivery is the defining distinction in this scenario.",
  },
  "S2-L06-EXAM-2": {
    prompt: "A player starts with 90 Mbit of unplayed data. The incoming rate remains 3 Mbit/s while playback uses 6 Mbit/s. Calculate how long playback can continue before the buffer empties.",
    objectiveIds: [
      "S2.12.A03",
      "S2.12.A04",
      "S2.12.A05"
    ],
    answerPoints: [
      "The net buffer depletion rate is 6 − 3 = 3 Mbit/s.",
      "Time to empty = initial buffered data / net depletion rate = 90 / 3.",
      "Playback can continue for 30 seconds."
    ],
    commonError: "Use the deficit between consumption and arrival; dividing by the playback rate ignores incoming data."
  },
  "S2-L06-EXAM-3": {
    prompt: "A live video requires 8 Mbit/s but the connection can sustain only 6 Mbit/s. Explain how changing the stream to 5 Mbit/s can prevent repeated interruption and state the trade-off.",
    objectiveIds: ["S2.12.A03", "S2.12.A05", "S2.12.A06"],
    answerPoints: [
      "At 8 Mbit/s, playback consumes data 2 Mbit/s faster than the connection can supply it.",
      "Any finite stored data is progressively exhausted, causing the player to pause and refill.",
      "At 5 Mbit/s, the 6 Mbit/s connection can supply data at least as quickly as playback consumes it under the stated sustained rate.",
      "The buffer can remain stable or gain data, so the sustained deficit no longer forces repeated pauses.",
      "The lower stream bit rate normally reduces video or audio quality.",
    ],
    commonError: "Do not claim that a larger buffer changes the sustained connection rate; adaptation works here by reducing the consumption rate below the arrival rate.",
  },
  "S2-L07-EXAM-1": {
    prompt: "A student can send email using a dedicated mail application and make a voice-over-IP call, but one website is unavailable. Explain why this does not prove that the whole internet has failed. Refer to the internet, the WWW and one possible fault consistent with these observations.",
    objectiveIds: [
      "S2.13.A01",
      "S2.13.A02",
      "S2.13.A03"
    ],
    answerPoints: [
      "The internet is the global infrastructure interconnecting networks and carrying data for several services.",
      "The WWW consists of linked web resources accessed through internet infrastructure.",
      "Working email and voice-over-IP show that some internet connections and services are still available.",
      "The web server for that site may have failed, or a fault may affect only its route or web service."
    ],
    commonError: "The observations narrow the fault; they do not establish its exact cause or prove that every other site works."
  },
  "S2-L07-EXAM-2": {
    prompt: "Compare a PSTN access connection with a dedicated line for a permanent bank branch that requires predictable continuous connectivity, and suggest the more suitable option.",
    objectiveIds: ["S2.14.A01", "S2.14.A02", "S2.14.A03", "S2.14.A05"],
    answerPoints: [
      "A PSTN service uses public switched telephone infrastructure and suitable modem or access equipment to adapt signals for that link.",
      "Its performance and availability depend on the shared access service provided over the telephone infrastructure.",
      "A dedicated line provides a continuously available link reserved for the branch rather than a temporary or shared access path.",
      "The dedicated line can offer more predictable capacity and availability but has greater installation and rental cost.",
      "The dedicated line is more suitable when the bank values predictable continuous connectivity more than the additional cost.",
    ],
    commonError: "Do not claim that the modem chooses packet routes; signal adaptation and inter-network routing are separate roles.",
  },
  "S2-L07-EXAM-3": {
    prompt: "Describe how a passenger's phone on a moving bus connects to an internet service through a cellular network, and explain one cause of variable performance.",
    objectiveIds: ["S2.14.A04", "S2.14.A05"],
    answerPoints: [
      "The phone transmits and receives radio signals through a nearby cellular base station.",
      "The cellular provider carries the data from its access network toward the wider internet service.",
      "As the bus moves, the connection may be transferred between cells so that a reachable base station continues to serve the phone.",
      "Signal strength changes with distance, buildings, terrain or movement between coverage areas.",
      "Shared radio capacity or interference can also make the available data rate vary.",
    ],
    commonError: "Do not describe the phone as connected by a dedicated cable; the access path to the base station is a shared radio link.",
  },
  "S2-L08-EXAM-1": {
    prompt: "Identify why 192.168.4.300 is not a valid IPv4 address and why 2001:db8:0:1:0:0:0:25 cannot be written as four decimal octets.",
    objectiveIds: ["S2.15.A01", "S2.15.A02"],
    answerPoints: [
      "An IPv4 address contains four 8-bit octets written in decimal.",
      "Each IPv4 octet must be from 0 to 255, so the value 300 is invalid.",
      "The second address uses eight hexadecimal groups and is IPv6 notation.",
      "IPv6 contains 128 bits, so four decimal octets would provide only the 32 bits used by IPv4.",
    ],
    commonError: "Do not reject the letters in the IPv6 address; hexadecimal digits are valid in IPv6 groups.",
  },
  "S2-L08-EXAM-2": {
    prompt: "A host at 192.168.50.70/26 sends one packet to 192.168.50.100 and another to 192.168.50.130. Explain which packet can be delivered within the local subnet and which must be sent to a router.",
    objectiveIds: ["S2.15.A04"],
    answerPoints: [
      "A /26 prefix divides the final octet into ranges of 64 addresses.",
      "The source 192.168.50.70 is in the subnet whose final-octet range is 64 to 127.",
      "The destination ending in 100 shares that subnet prefix, so its packet can be delivered locally.",
      "The destination ending in 130 lies in the next subnet range, 128 to 191.",
      "The packet for 192.168.50.130 must be forwarded to a router for delivery outside the source subnet.",
    ],
    commonError: "Do not compare only the first three octets when the prefix is /26; the leading two bits of the final octet are part of the network prefix.",
  },
  "S2-L08-EXAM-3": {
    prompt: "Suggest suitable public or private and static or dynamic addressing for a public web server and an employee laptop used only inside the organisation. Explain one security limitation of these choices.",
    objectiveIds: [
      "S2.15.A05",
      "S2.15.A06"
    ],
    answerPoints: [
      "Internet users need a publicly reachable address for the web service, either on its server interface or on a gateway that forwards to it.",
      "Static or reserved assignment keeps the service address predictable for clients and its DNS record.",
      "A private address suits the laptop because it only needs internal reachability.",
      "A dynamic lease lets the organisation allocate an address automatically when the laptop joins the LAN.",
      "Addressing choices do not enforce access control; firewalls, authentication and updates are still required."
    ],
    commonError: "Routing scope and assignment lifetime are independent: static does not mean public and dynamic does not mean private."
  },
  "S3-L05-EXAM-2": {
    prompt: "Describe how to construct a complete truth table for the expression Q = A AND NOT B.",
    answerPoints: [
      "Create columns for inputs A and B and list the four combinations 00, 01, 10 and 11.",
      "Add an intermediate NOT B column by inverting each value of B.",
      "Calculate Q by applying AND to A and NOT B in each row.",
      "The final Q values for 00, 01, 10 and 11 are 0, 0, 1 and 0 respectively.",
    ],
    commonError: "Do not omit an input combination or apply NOT to the whole expression.",
  },
  "S4-L07-EXAM-2": {
    prompt: "ACC contains 11010110 and the instruction AND B00001111 is executed. Describe the bitwise operation and state the new ACC value.",
    answerPoints: [
      "Each ACC bit is ANDed with the bit in the same position of the mask, producing 1 only where both bits are 1.",
      "11010110 AND 00001111 produces 00000110, which becomes the new ACC value.",
    ],
    commonError: "Do not perform logical AND on the two complete values as single Boolean operands; compare corresponding bit positions.",
  },
  "S6-L02-EXAM-3": {
    prompt: "An organisation unlocks a secure room by scanning a fingerprint. Explain how biometric authentication works and give one limitation.",
    answerPoints: [
      "A sensor captures a physical characteristic from the person attempting access.",
      "The system extracts identifying features and compares the resulting template with the enrolled template for an authorised user.",
      "Access is granted only when the comparison score satisfies the configured matching threshold.",
      "A limitation is that false acceptance or false rejection can occur, or a compromised biometric characteristic cannot be replaced like a password.",
    ],
    commonError: "Do not describe a digital signature; biometric authentication compares a captured human characteristic with an enrolled template.",
  },
  "S6-L03-EXAM-2": {
    prompt: "Describe the threat posed by a computer virus and explain how updated anti-virus software can reduce the risk.",
    answerPoints: [
      "A virus is malicious code that attaches to or modifies a host file or program.",
      "It replicates when the infected host is executed and can corrupt data or disrupt the system.",
      "Updated anti-virus software scans files, memory or activity for known signatures and suspicious behaviour.",
      "Detected malicious code can be blocked, quarantined or removed before it is allowed to spread further.",
    ],
    commonError: "Do not define a hacker; a virus is executable malicious code that replicates through an infected host.",
  },
  "S6-L03-EXAM-3": {
    prompt: "An employee receives an email linking to a fake sign-in page. Explain how this phishing attack can deceive the employee and state two suitable precautions.",
    answerPoints: [
      "The message impersonates a trusted organisation or colleague and creates a plausible or urgent reason to sign in.",
      "The link leads to a fraudulent page designed to capture the employee's credentials or other sensitive information.",
      "The employee should verify the sender and destination independently rather than opening the supplied link.",
      "Email filtering, user training and multi-factor authentication can reduce the chance or impact of a successful phishing attempt.",
    ],
    commonError: "Do not confuse phishing with pharming; phishing relies on a deceptive message or interaction that persuades the user.",
  },
  "S6-L04-EXAM-1": {
    prompt: "A company stores confidential personnel files on a network server. Explain how encryption and access rights protect the files in different ways.",
    answerPoints: [
      "Encryption converts plaintext into ciphertext using an algorithm and key.",
      "Without the correct decryption key, intercepted or stolen encrypted data should not be intelligible.",
      "Access rights associate authenticated users or roles with permitted actions such as read, create, modify or delete.",
      "The server checks those permissions before allowing an authenticated user to perform an operation on a file.",
    ],
    commonError: "Do not say that encryption decides which authenticated user may edit a file; that is the role of access rights.",
  },
  "S8-L05-EXAM-3": {
    prompt: "An AS Level SQL query needs fields from Student and Enrolment. Explain how to keep the query within the two-table scope and identify the join condition.",
    answerPoints: [
      "The query uses only the two named tables, Student and Enrolment, rather than joining a third table.",
      "INNER JOIN combines matching rows from the two tables.",
      "The ON condition compares the related key fields, for example Student.StudentID = Enrolment.StudentID.",
    ],
    commonError: "Do not add a third table to the same AS Level query or omit the key-field condition that relates the two tables.",
  },
  "S9-L09-EXAM-3": {
    prompt: "A booking system is too large to design as one task. Explain how decomposition can be used before the algorithms for the smaller parts are developed.",
    answerPoints: [
      "Divide the complete problem into smaller subproblems such as entering a booking, checking availability, calculating cost and producing confirmation.",
      "Define the purpose, inputs, outputs and interfaces of each subproblem.",
      "The smaller parts can then be designed and tested separately before being combined to produce the complete required behaviour.",
    ],
    commonError: "Do not describe only stepwise refinement of one algorithm step; decomposition first divides the whole problem into manageable parts.",
  },
  "S11-L02-EXAM-3": {
    prompt: "A pseudocode fragment must declare Price and Quantity, input both values, calculate Total and output it. Describe the required statements and operators.",
    answerPoints: [
      "DECLARE introduces Price with type REAL and Quantity with type INTEGER before either identifier is used.",
      "INPUT Price and INPUT Quantity read the two source values.",
      "Total <- Price * Quantity uses multiplication to calculate the right-hand value and <- to assign it to Total.",
      "OUTPUT Total displays the calculated result after the assignment.",
    ],
    commonError: "Do not use = for assignment in Cambridge pseudocode; = compares values, while <- assigns the calculated value.",
  },
  "S11-L05-EXAM-1": {
    prompt: "Explain how nested IF statements can classify a mark as Invalid, Fail, Pass or Distinction.",
    answerPoints: [
      "The outer selection first tests whether the mark is outside the valid range and outputs Invalid for that branch.",
      "Inside the valid branch, another IF tests the distinction boundary and outputs Distinction when it is met.",
      "A further ELSE or nested test separates Pass from Fail using the pass boundary.",
      "Each nested IF has its own matching ENDIF, and the conditions are ordered so every valid and invalid mark reaches exactly one output.",
    ],
    commonError: "Do not describe a WHILE loop; nested IF statements perform dependent selections and require a matching ENDIF for each IF.",
  },
  "S11-L05-EXAM-3": {
    prompt: "A menu choice can be Add, Edit, Delete or another value. Explain how IF/ELSE selection and CASE selection could represent this choice, and state why CASE is clearer here.",
    answerPoints: [
      "An IF/ELSE chain compares MenuChoice with Add, then Edit, then Delete and uses a final ELSE for an unrecognised value.",
      "A CASE structure tests the one expression MenuChoice and places Add, Edit and Delete in separate named branches.",
      "OTHERWISE handles values not matched by the named CASE branches.",
      "CASE is clearer because one expression is being compared with several discrete values rather than different Boolean conditions.",
    ],
    commonError: "Do not describe pre-condition repetition; both named structures perform selection rather than looping.",
  },
  "S11-L06-EXAM-3": {
    prompt: "A FOR loop processes Items[1:Count]. Explain the boundary conditions that prevent skipped elements or access outside the array.",
    answerPoints: [
      "The loop starts at the array's declared lower bound, 1, and ends at the current valid upper position Count.",
      "Because the final FOR value is inclusive, Items[Count] is processed once before the loop terminates.",
      "NEXT advances the counter automatically, so the body must not also increment the same counter.",
      "Count must not exceed the declared array upper bound; when Count is 0, FOR Index <- 1 TO Count performs zero iterations with the default positive step.",
    ],
    commonError: "Do not substitute a WHILE-loop property; the task asks about the inclusive bounds and counter behaviour of FOR.",
  },
  "S11-L08-EXAM-2": {
    prompt: "A program repeatedly asks for a mark until the user enters a value from 0 to 100. Select a suitable loop and explain the complete control logic.",
    answerPoints: [
      "REPEAT is suitable because one mark must be entered before its validity can first be tested.",
      "The loop body inputs Mark and can display an error message when Mark is outside the permitted range.",
      "UNTIL Mark >= 0 AND Mark <= 100 stops after a valid value has been entered.",
      "The post-condition structure guarantees at least one input attempt and repeats only while the value remains invalid.",
    ],
    commonError: "Do not describe nested IF selection without the repetition that requests another value after invalid input.",
  },
  "S11-L10-EXAM-2": {
    prompt: "Explain when a function is more appropriate than a procedure, using a VAT calculation required inside a larger expression.",
    answerPoints: [
      "A function is appropriate when the named subprogram must calculate and return one value to its caller.",
      "The function declares a return type and executes RETURN with the calculated VAT value.",
      "Its call can be used inside an expression such as Total <- Price + CalculateVAT(Price).",
      "A procedure call performs an action but does not itself supply the value required as an expression operand.",
    ],
    commonError: "Do not claim that OUTPUT inside a procedure creates a return value; a function uses RETURN and has a declared return type.",
  },
  "S11-L12-EXAM-1": {
    prompt: "A flowchart inputs Age, decides whether Age >= 18, outputs Adult or Minor, and then stops. Explain how to implement this design as complete Cambridge pseudocode.",
    answerPoints: [
      "Declare Age with type INTEGER and use INPUT Age for the flowchart's input symbol.",
      "Translate the decision into IF Age >= 18 THEN.",
      "Place OUTPUT \"Adult\" in the true branch and OUTPUT \"Minor\" in the ELSE branch.",
      "Close the selection with ENDIF, preserving the flowchart's input, condition, two paths and outputs.",
    ],
    commonError: "Do not copy only the decision label; implement every input, branch, output and terminator shown by the design.",
  },
  "S12-L01-EXAM-3": {
    prompt: "Describe three defining features of Rapid Application Development and explain how each supports rapid feedback.",
    answerPoints: [
      "Rapid prototyping creates an early working model that users can inspect and comment on.",
      "Time-boxing fixes short development periods so a usable increment is produced and reviewed on a regular schedule.",
      "Frequent user involvement supplies prompt feedback that can change requirements, interfaces or priorities in the next iteration.",
    ],
    commonError: "Do not list the three terms without explaining how they shorten the build-review-refine feedback cycle.",
  },
  "S12-L05-EXAM-2": {
    prompt: "Describe how beta testing is carried out and explain one benefit and one limitation.",
    answerPoints: [
      "A near-complete version is released to selected external users who use it in realistic environments.",
      "The users report faults, compatibility problems and usability issues that may not appear in the developer's controlled environment.",
      "The wider real-world coverage can reveal platform and usage combinations before final release.",
      "A limitation is that the developer has less control over the tests and feedback may be incomplete, duplicated or arrive after damage to user confidence.",
    ],
    commonError: "Do not describe black-box testing only; beta identifies who tests, where they test and when this occurs before final release.",
  },
  "S12-L07-EXAM-2": {
    prompt: "A mark must be an integer from 0 to 100 inclusive. Select normal, abnormal and boundary test data and explain the purpose of each selection.",
    answerPoints: [
      "A normal value such as 55 is valid and not close to a boundary, checking ordinary accepted input.",
      "An abnormal value such as -1 or 101 is outside the valid range and should be rejected.",
      "Boundary tests use 0 and 100, together with values immediately outside such as -1 and 101, to check both inclusive limits.",
      "Expected results must state whether each value is accepted or rejected so the actual result can be compared with it.",
    ],
    commonError: "Do not give a value without classifying it and stating the expected acceptance or rejection result.",
  },
  "S12-L07-EXAM-3": {
    prompt: "A username must contain between 6 and 12 characters inclusive. Explain a complete set of boundary tests and expected outcomes.",
    answerPoints: [
      "A length of 5 is immediately below the lower boundary and should be rejected.",
      "Lengths of 6 and 12 are the valid lower and upper boundary values and should be accepted.",
      "A length of 13 is immediately above the upper boundary and should be rejected.",
      "Testing values on and immediately outside both limits detects incorrect <, <=, > or >= boundary conditions.",
    ],
    commonError: "Do not test only one boundary; include values on and immediately outside both the lower and upper limits.",
  },
  "S10-L01-EXAM-2": {
    prompt: "A program stores the number of students in a class. Explain why INTEGER is a suitable data type and why REAL would be less appropriate.",
    answerPoints: [
      "The number of students is a whole-number count, so it can be represented exactly by INTEGER.",
      "REAL is intended for values that may have a fractional part and is unnecessary for this whole-number quantity.",
    ],
    commonError: "Do not choose a data type only from the value's current appearance; use the domain of valid values.",
  },
  "S10-L01-EXAM-3": {
    prompt: "A program stores a temperature such as 18.75 degrees Celsius. Explain why REAL is suitable and state one relevant limitation when comparing REAL values.",
    answerPoints: [
      "The temperature can contain a fractional part, so REAL is suitable whereas INTEGER would lose that fractional information.",
      "A finite binary representation cannot represent every real-number fraction exactly.",
      "Rounding error means equality comparisons between calculated REAL values may be unreliable, so a suitable tolerance may be needed.",
    ],
    commonError: "Do not assume that every decimal fraction is stored exactly in binary floating-point representation.",
  },
  "S10-L04-EXAM-2": {
    prompt: "Write and explain Cambridge pseudocode declarations and element access for (i) a one-dimensional array Marks[1:30] of INTEGER and (ii) a two-dimensional array Seats[1:20, 1:6] of BOOLEAN.",
    answerPoints: [
      "Declare Marks as ARRAY[1:30] OF INTEGER with explicit lower and upper bounds.",
      "Access one element with one index, for example Marks[StudentIndex].",
      "Declare Seats as ARRAY[1:20, 1:6] OF BOOLEAN with row and column bounds.",
      "Access one seat with two indexes, for example Seats[Row, Column].",
    ],
    commonError: "Do not use two indexes for the one-dimensional array or omit either index for the two-dimensional array.",
  },
  "S10-L14-EXAM-3": {
    prompt: "A program stores 30 student marks and also stores the occupied state of seats arranged in 20 rows and 6 columns. Justify the use of a one-dimensional array for the marks and a two-dimensional array for the seats.",
    answerPoints: [
      "Each mark belongs to one student position, so one index is sufficient to access an element in the one-dimensional Marks array.",
      "Each seat is identified by both a row and a column, so two indexes naturally locate an element in the two-dimensional Seats array.",
      "The declared array bounds match the fixed collection sizes and allow loops to process every valid position without using a linked structure.",
    ],
    commonError: "Do not choose a linked list merely because several values are stored; the fixed indexed collections match array access.",
  },
  "S11-L02-EXAM-2": {
    prompt: "Describe the Cambridge pseudocode statements needed to read a student's name from the keyboard and display a greeting on the console.",
    answerPoints: [
      "INPUT Name reads the keyboard value and stores it in the declared variable Name.",
      "OUTPUT displays the required text and the value of Name, for example OUTPUT \"Hello \" & Name.",
    ],
    commonError: "Do not describe INPUT only; the task also requires the console OUTPUT statement.",
  },
  "S11-L05-EXAM-2": {
    prompt: "A variable Grade contains A, B, C or another value. Describe how a CASE structure selects the correct message for these alternatives.",
    answerPoints: [
      "CASE OF tests the value of the single expression Grade against the stated branch values.",
      "The A, B and C branches each execute their corresponding OUTPUT statement when that value matches.",
      "OTHERWISE handles any Grade value not matched by the named branches before ENDCASE closes the structure.",
    ],
    commonError: "Do not describe a count-controlled loop; CASE performs selection between discrete alternatives.",
  },
  "S11-L06-EXAM-1": {
    prompt: "Write and explain a count-controlled FOR loop that outputs each value in Marks[1:30].",
    answerPoints: [
      "Initialise the loop variable with FOR Index <- 1 TO 30.",
      "The loop body accesses and outputs Marks[Index].",
      "NEXT Index advances the loop variable and repeats until the inclusive final value 30 has been processed.",
      "The structure is suitable because the array bounds make the required number of iterations known before the loop starts.",
    ],
    commonError: "Do not replace the FOR loop with selection or access Marks[Index + 1] when Index is already at the upper bound.",
  },
  "S11-L06-EXAM-2": {
    prompt: "Describe how a count-controlled FOR loop can calculate the total of Values[1:30], including its initial value, final value and loop body.",
    answerPoints: [
      "Set Total <- 0 before the loop so the accumulator has a defined starting value.",
      "FOR Index <- 1 TO 30 uses the inclusive array bounds as the counter's initial and final values.",
      "The body executes Total <- Total + Values[Index] once for each valid element.",
      "NEXT Index advances the counter, and after Index 30 the loop ends with Total containing the sum of all 30 values.",
    ],
    commonError: "Do not omit the accumulator initialisation or stop at 29; the upper bound in a Cambridge FOR loop is inclusive.",
  },
  "S11-L07-EXAM-1": {
    prompt: "Write and explain a pre-condition WHILE loop that reads records only while EndOfFile is FALSE.",
    answerPoints: [
      "WHILE EndOfFile = FALSE tests the condition before the loop body.",
      "The body reads and processes the next record and then updates EndOfFile before ENDWHILE.",
      "If EndOfFile is already TRUE at the first test, the body executes zero times.",
      "Updating the condition state prevents an unintended infinite loop and stops processing after the final record.",
    ],
    commonError: "Do not describe IF or CASE selection; WHILE repeatedly executes its body while a pre-condition remains true.",
  },
  "S11-L07-EXAM-3": {
    prompt: "Compare a pre-condition WHILE loop with a post-condition REPEAT loop, giving one complete use case for each.",
    answerPoints: [
      "WHILE tests its condition before the body, so the body may execute zero times when the condition is initially false.",
      "It suits processing records while NOT EOF because no read should occur when the file is already at its end.",
      "REPEAT tests its condition after the body, so the body executes at least once.",
      "It suits input validation because one value must be entered before the stopping condition can be evaluated.",
    ],
    commonError: "Do not use the same continuation wording for both structures; WHILE repeats while its condition is true, whereas REPEAT stops when its UNTIL condition becomes true.",
  },
  "S12-L01-EXAM-2": {
    prompt: "A safety-critical control system requires stable requirements, complete documentation and formal testing before release. Explain why RAD may be unsuitable.",
    answerPoints: [
      "RAD relies on rapid prototyping, short time boxes and frequent change based on user feedback.",
      "The speed and repeated change can conflict with the exhaustive documentation, verification and traceability required for safety assurance.",
      "A stable staged lifecycle may provide clearer approval gates before implementation and release.",
    ],
    commonError: "Do not say only that RAD is fast; link its working practices to the safety-critical assurance requirements.",
  },
  "S12-L05-EXAM-1": {
    prompt: "A team performs a walkthrough of a new booking procedure before running the program. Explain how the walkthrough is carried out and what it can reveal.",
    answerPoints: [
      "The author presents the procedure, design or code to other team members using representative inputs or scenarios.",
      "The group follows the logic and data flow step by step and questions assumptions, interfaces and expected results.",
      "Reviewers record defects, omissions, ambiguities or inconsistent requirements found during the discussion.",
      "The author corrects the identified issues and the relevant parts are reviewed or tested again.",
    ],
    commonError: "Do not describe a solitary dry run only; a walkthrough is a collaborative review by several people.",
  },
  "S12-L05-EXAM-3": {
    prompt: "A tester must check whether every branch of a complex discount function has been executed. Select and explain a suitable testing method and give one limitation.",
    answerPoints: [
      "White-box testing is suitable because test cases are derived from the internal decisions and control-flow paths.",
      "The tester selects inputs that make each branch condition true and false and records which paths execute.",
      "A limitation is that white-box tests may still miss omitted requirements because they are based on the implemented internal structure.",
    ],
    commonError: "Do not name white-box testing without linking its knowledge of internal branches to the required coverage.",
  },
  "S12-L08-EXAM-2": {
    prompt: "Explain why software maintenance can still be required after a system has passed acceptance testing, using one example of corrective, adaptive and perfective maintenance.",
    answerPoints: [
      "Corrective maintenance fixes a fault discovered during real use, for example an incorrect total for a boundary input.",
      "Adaptive maintenance changes the software when its environment changes, for example a new operating system or legal rule.",
      "Perfective maintenance improves functionality, performance or usability in response to new user needs.",
      "Acceptance testing checks the agreed system at that time but cannot prevent later faults, environmental changes or enhancement requests.",
    ],
    commonError: "Do not treat all post-release changes as bug fixes; distinguish corrective, adaptive and perfective purposes.",
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
  if (lesson.section === 1) return section1ExamQuestions[String(lesson.originalLesson).padStart(3, "0")].map((authored) => {
    const question = finaliseQuestion(authored, staged);
    const requirements = [...new Set(question.objectiveIds.map((id) => id.replace(/\.A\d+$/, "")))];
    const clauses = [...new Set(requirements.map((id) => Number(id.slice(3)) <= 7 ? "1.1" : id === "S1.11" ? "1.3" : "1.2"))];
    return {
      id: question.id,
      sourceRef: `Cambridge 9618 syllabus ${clauses.join(", ")} · ${requirements.join(", ")} (course mapping)`,
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
  if (lesson.authoredExamQuestions) return lesson.authoredExamQuestions.map((source) => {
    const question = finaliseQuestion(source, staged);
    const requirements = [...new Set(question.objectiveIds.map((id) => id.replace(/\.A\d+$/, "")))];
    const clauses = lesson.section === 4
      ? [...new Set(requirements.map((id) => Number(id.slice(3)) <= 8 ? "4.1" : Number(id.slice(3)) <= 14 ? "4.2" : "4.3"))].join(", ")
      : lesson.section === 6
      ? [...new Set(requirements.map((id) => Number(id.slice(3)) <= 6 ? "6.1" : "6.2"))].join(", ")
      : lesson.section === 5
      ? [...new Set(requirements.map((id) => Number(id.slice(3)) <= 3 ? "5.1" : "5.2"))].join(", ")
      : lesson.section === 8
      ? [...new Set(requirements.map((id) => Number(id.slice(3)) <= 4 ? "8.1" : Number(id.slice(3)) <= 6 ? "8.2" : "8.3"))].join(", ")
      : lesson.section === 7 ? "7.1"
      : lesson.section === 9
      ? [...new Set(requirements.map((id) => Number(id.slice(3)) <= 2 ? "9.1" : "9.2"))].join(", ")
      : lesson.section === 10
      ? [...new Set(requirements.map((id) => Number(id.slice(4)) <= 2 ? "10.1" : Number(id.slice(4)) <= 6 ? "10.2" : Number(id.slice(4)) === 7 ? "10.3" : "10.4"))].join(", ")
      : lesson.section === 11
      ? [...new Set(requirements.map((id) => Number(id.slice(4)) <= 3 ? "11.1" : Number(id.slice(4)) <= 5 ? "11.2" : "11.3"))].join(", ")
      : lesson.section === 12
      ? [...new Set(requirements.map((id) => Number(id.slice(4)) === 1 ? "12.1" : Number(id.slice(4)) <= 3 ? "12.2" : "12.3"))].join(", ")
      : requirements.includes("S3.10") ? "3.2" : "3.1";
    return {
      id: question.id,
      sourceRef: `Cambridge 9618 syllabus ${clauses} · ${requirements.join(", ")} (course mapping)`,
      accessUrl: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/past-papers/",
      objectiveIds: question.objectiveIds, task: question.prompt, commandWord: question.commandWord,
      marks: question.marks, build: question.answerPoints, markLogic: question.answerPoints,
      commonLosses: [question.commonError],
      ...(question.diagram ? { diagram: question.diagram, diagramAlt: question.diagramAlt, ...(question.diagramLabel ? {diagramLabel:question.diagramLabel} : {}) } : {}),
      ...([3, 4, 8, 9, 10, 11, 12].includes(lesson.section) ? Object.fromEntries(["code", "codeCaption", "codeLabel", "programKey", "table", "tables", "answerCode", "answerTable", "sqlCase", "expectedTrace", "expectedAcc", "finalMemory", "answerProgramKey", "answerCodeLabel", "answerLanguage", "answerDiagram", "answerDiagramAlt", "answerDiagramLabel", "conversion"].filter((key) => question[key] !== undefined).map((key) => [key, question[key]])) : {}),
    };
  });
  const objectiveRows = lesson.objectives.length ? lesson.objectives : [[`${lesson.syllabusIds[0]}.R`, lesson.title]];
  const questionCount = Math.max(1, lesson.examQuestionCount ?? 3);
  const selectedIndexes = questionCount === 3
    ? [...new Set([0, Math.floor((objectiveRows.length - 1) / 2), objectiveRows.length - 1])]
    : Array.from({ length: questionCount }, (_, index) => Math.round(index * (objectiveRows.length - 1) / Math.max(1, questionCount - 1)));
  while (selectedIndexes.length < questionCount) selectedIndexes.push(selectedIndexes.length % objectiveRows.length);
  const context = examContexts[lesson.section] ?? examContexts.Review;
  const usedQuestionIds = new Set();
  const usedTopics = new Set();
  return selectedIndexes.slice(0, questionCount).map((objectiveIndex, index) => {
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
      ...(override?.diagram ? { diagram: override.diagram, diagramAlt: override.diagramAlt, diagramLabel: override.diagramLabel } : {}),
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
      sourceRef: lesson.section === 2
        ? `Cambridge 9618 syllabus 2.1 · ${[...new Set(question.objectiveIds.map((id) => id.replace(/\.A\d+$/, "")))].join(", ")} (course mapping)`
        : override?.sourceRef ?? (index === 0 ? lesson.pastPaper.sourceRef : `Cambridge 9618 syllabus · ${requirementId}`),
      accessUrl: lesson.pastPaper.accessUrl,
      objectiveIds: question.objectiveIds,
      task: question.prompt,
      commandWord: question.commandWord,
      marks: question.marks,
      build: question.answerPoints,
      markLogic: question.answerPoints,
      commonLosses: [question.commonError],
      ...(question.diagram ? { diagram: question.diagram, diagramAlt: question.diagramAlt, diagramLabel: question.diagramLabel } : {}),
    };
  });
}

function conciseSummary(lesson) {
  if (lesson.summaryMode === "authored") return lesson.summary;
  const stopwords = new Set("a an and are as at be by for from how in is it of on or plus that the this to use used uses using when which why with store stores stored required".split(" "));
  const seen = new Set();
  return lesson.summary.flatMap(([heading], index) => {
    const syllabusId = heading.match(/^S(?:[1-9]|1[0-2])\.\d{2}/)?.[0];
    const key = syllabusId ?? normalisePresentationText(heading);
    if (seen.has(key)) return [];
    seen.add(key);
    const unit = (syllabusId && lesson.units.find((candidate) => candidate.syllabusId === syllabusId)) ?? lesson.units[index] ?? lesson.units[0];
    if (unit?.summary) return [unit.summary];
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
  return [unit.leadVisual, unit.method, unit.workedExample, ...(unit.supportingMaterials ?? [])].filter(Boolean);
}

export function visibleRoleTexts(unit) {
  const bodyTexts = (material) => {
    if (!material) return [];
    if (material.type === "cards") return material.items.map(([, body]) => body);
    if (material.type === "list") return material.items.map(([, body]) => body);
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
    supporting: (unit.supportingMaterials ?? []).flatMap(bodyTexts),
  };
}
