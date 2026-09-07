import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { officialAsMapping } from "./syllabus-official-as-mapping.mjs";
import { teachingDepthOverrides, questionRepairs } from "./course-v2-teaching-depth-overrides.mjs";
import { section2Lessons } from "./course-v3-section2-content.mjs";
import { section1Practice, enhanceSection1Units } from "./course-v3-section1-content.mjs";
import { finaliseLessonPresentation } from "./course-v3-presentation.mjs";
import { authorSection3Lesson } from "./course-v3-section3-content.mjs";
import { authorSection4Lesson } from "./course-v3-section4-content.mjs";
import { authorSection6Lesson } from "./course-v3-section6-content.mjs";
import { authorSection5Lesson } from "./course-v3-section5-content.mjs";
import { authorSection8Lesson } from "./course-v3-section8-content.mjs";
import { authorSection7Lesson } from "./course-v3-section7-content.mjs";
import { authorSection9Lesson } from "./course-v3-section9-content.mjs";
import { authorSection11Lesson } from "./course-v3-section11-content.mjs";
import { authorSection10Lesson } from "./course-v3-section10-content.mjs";
import { authorSection12Lesson, section12LegacyFaultQuestion } from "./course-v3-section12-content.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const v2 = JSON.parse(readFileSync(join(root, "scripts", "course-v2-content.json"), "utf8"));
const questionBank = JSON.parse(readFileSync(join(root, "scripts", "question-bank-contract.json"), "utf8"));
const paperFrequency = JSON.parse(readFileSync(join(root, "scripts", "past-paper-frequency-contract.json"), "utf8"));
const v3QuestionRepairs = Object.freeze({
  "Q-L004-01": {
    syllabusIds: ["S1.07"],
    objectiveIds: ["S1.07.A01", "S1.07.A04"],
  },
  "Q-L004-02": {
    syllabusIds: ["S1.07"],
    objectiveIds: ["S1.07.A01"],
  },
  "Q-L004-03": {
    syllabusIds: ["S1.06"],
    objectiveIds: ["S1.06.A01"],
  },
  "Q-L053-01": {
    answer: "uses Temperature >= -20; uses AND Temperature <= 50; states FALSE for -21; states TRUE for -20 and 50; states FALSE for 51",
  },
  "Q-L053-03": {
    answer: "a logic statement defines a Boolean decision, loop condition or assignment; comparisons may use =, <>, <, <=, > or >=; compound conditions use AND, OR or NOT; the statement must be interpreted by evaluating its truth for the given data",
  },
  "Q-L070-01": {
    prompt: "Write Cambridge pseudocode that defines and initialises constant TaxRate as 0.20, declares Price and Tax as REAL, inputs Price, assigns Price * TaxRate to Tax, and outputs Tax.",
    answer: "CONSTANT TaxRate = 0.20; DECLARE Price : REAL; DECLARE Tax : REAL; INPUT Price; Tax <- Price * TaxRate; OUTPUT Tax",
  },
  "Q-L070-03": {
    prompt: "Explain how declaration, input, arithmetic assignment and output work together in a program that calculates tax from an entered price.",
    answer: "DECLARE gives Price and Tax the REAL type; INPUT obtains Price; Tax <- Price * TaxRate evaluates the multiplication before assigning its result; OUTPUT Tax displays the calculated value",
  },
  "Q-L071-01": {
    prompt: "State one difference between an arithmetic expression and a logical expression, giving one operator example for each.",
    answer: "an arithmetic expression produces a numeric result and may use *; a logical expression produces a BOOLEAN result and may use >= or AND",
  },
  "Q-L071-02": {
    prompt: "Write an arithmetic assignment for Total from Price and Quantity, then write a logical assignment that is TRUE when Age is at least 18 and Registered is TRUE.",
    answer: "Total <- Price * Quantity; Eligible <- (Age >= 18) AND Registered; the first result is numeric and the second is BOOLEAN",
  },
  "Q-L071-03": {
    prompt: "Correct the incomplete pseudocode statement Tax <- Price TaxRate and explain the role of the assignment and multiplication operators.",
    answer: "Tax <- Price * TaxRate; * calculates the product on the right; <- stores that result in Tax; = would be comparison rather than Cambridge pseudocode assignment",
  },
  "Q-L084-02": section12LegacyFaultQuestion,
});
const questionById = new Map(questionBank.questions.map((question) => [question.id, { ...question, ...(questionRepairs[question.id] ?? {}), ...(v3QuestionRepairs[question.id] ?? {}) }]));
const officialPastPaperAccess = "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/past-papers/";

const lessonPresentationOverrides = Object.freeze({
  "001": {
    title: "Binary data units and magnitude prefixes",
    subtitle: "Distinguish decimal and binary prefixes and calculate the same capacity in different units.",
    guidingQuestion: "Why can one file have different numerical sizes in MB and MiB?",
    summaryMode: "authored",
    summary: [
      ["Decimal prefixes", "kilo, mega, giga and tera use 10³, 10⁶, 10⁹ and 10¹²."],
      ["Binary prefixes", "kibi, mebi, gibi and tebi use 2¹⁰, 2²⁰, 2³⁰ and 2⁴⁰."],
      ["Convert a capacity", "Multiply by bytes per unit to obtain bytes; divide by bytes per target unit to change units."],
      ["Symbols matter", "B means byte and b means bit; 1 byte = 8 bits. MB and MiB use different multipliers."],
    ],
  },
  "002": {
    title: "Binary, denary, hexadecimal, BCD and signed representations",
    subtitle: "Understand each number system or representation separately, then convert between them.",
    guidingQuestion: "What does each number system or binary representation mean, why are BCD and complement representations used, and how can an integer be converted between them?",
    summaryMode: "authored",
    summary: [
      ["Binary", "Base 2 · digits 0 and 1."],
      ["Denary", "Base 10 · digits 0 to 9."],
      ["Hexadecimal", "Base 16 · digits 0 to F."],
      ["BCD", "Encode each decimal digit separately."],
      ["One's complement", "Invert every fixed-width bit."],
      ["Two's complement", "Invert every bit, then add 1."],
      ["Conversion", "Preserve value; apply the destination rule."],
    ],
  },
  "003": {
    title: "Binary addition, subtraction and overflow",
    subtitle: "Calculate with unsigned and signed binary integers and check each result against its representable range.",
    guidingQuestion: "How do the bit width and signed representation determine whether an arithmetic result is valid?",
    summaryMode: "authored",
    summary: [
      ["Unsigned arithmetic", "Add with carries; subtract with borrowing. Eight unsigned bits represent 0 to 255."],
      ["Signed arithmetic", "Encode negative operands in two's complement. Subtract B by adding its negation at the same width."],
      ["Overflow", "Compare the exact result with the range: −128 to +127 for eight-bit two's complement. Carry out alone is not the signed overflow test."],
    ],
  },
  "004": {
    title: "Character encoding: ASCII, extended ASCII and Unicode",
    subtitle: "Understand how a character set maps symbols to numeric codes, then distinguish ASCII, extended ASCII and Unicode.",
    guidingQuestion: "How does a computer store character data as binary, and why do different character sets support different collections of symbols?",
    summaryMode: "authored",
    summary: [
      ["Character sets", "Map characters to numeric codes."],
      ["ASCII", "Seven bits provide 128 codes."],
      ["Extended ASCII", "Eight bits provide 256 codes."],
      ["Unicode", "Supports far more writing systems."],
    ],
  },
  "005": {
    title: "Bitmap and vector graphics",
    subtitle: "Build bitmap representation one idea at a time, then compare it with a vector drawing list.",
    guidingQuestion: "How are bitmap and vector graphics stored, what controls bitmap quality and file size, and what happens when each type is enlarged?",
    summaryMode: "authored",
    summary: [
      ["Bitmap structure", "A header and metadata describe a grid of stored pixel values."],
      ["Pixel", "The smallest addressable picture element in a bitmap."],
      ["Colour depth", "Bits per pixel determine the available colours."],
      ["Image resolution", "Width multiplied by height gives the number of stored pixels."],
      ["File size", "Resolution multiplied by colour depth gives the uncompressed size in bits."],
      ["Vector drawing list", "Objects are stored with properties such as coordinates, dimensions and colours."],
      ["Enlargement", "Bitmap pixels grow; vector objects are recalculated and redrawn."],
    ],
  },
  "006": {
    title: "Sound representation and file compression",
    subtitle: "Follow analogue sound through sampling, then choose and explain suitable compression methods.",
    guidingQuestion: "How is continuous sound sampled into binary data, and how do lossy, lossless and RLE compression change stored files?",
    summaryMode: "authored",
    summary: [
      ["Sampling", "Measure an analogue signal at regular time intervals."],
      ["Sampling rate", "More samples per second can record changes more closely."],
      ["Sampling resolution", "More bits per sample provide more available amplitude levels."],
      ["Need for compression", "Reduce storage space and transfer time."],
      ["Lossy", "Discard selected data and accept an irreversible quality change."],
      ["Lossless", "Reconstruct the original data exactly."],
      ["Method choice", "Match reversibility and quality to the file's purpose."],
      ["RLE", "Store each run as a count and a value."],
    ],
  },
  "013": {
    title: "Input, output, storage and embedded systems",
    subtitle: "Explain why a computer system needs input, output, primary memory and secondary storage, then evaluate an embedded system.",
    guidingQuestion: "Why does a computer system need each hardware role, and what follows from designing an embedded system for a dedicated task?",
    summaryMode: "authored",
    summary: [
      ["Computer-system roles", "Input supplies data; processing transforms it; output communicates a result."],
      ["Storage roles", "Primary memory supports current processing; secondary storage retains data long term."],
      ["Embedded system", "A computer system built into a larger device for a dedicated function."],
      ["Trade-offs", "Dedicated design can improve efficiency but reduces flexibility and upgrade capacity."],
    ],
  },
  "014": {
    title: "Principal operations of hardware devices",
    subtitle: "Describe each device as an ordered input, internal operation and output rather than as one combined hardware survey.",
    guidingQuestion: "What physical or electronic operation allows each named device to convert, store or present data?",
    examQuestionCount: 9,
    summaryMode: "authored",
    summary: [
      ["Laser printer", "Charge, expose, develop, transfer and fuse."],
      ["3D printer", "Slice a model and build successive material layers."],
      ["Sound devices", "A microphone produces an analogue signal; an ADC digitises it. A speaker turns an electrical signal into sound."],
      ["Storage devices", "Magnetic, flash and optical media store bits by different physical states."],
      ["Interactive devices", "A touchscreen locates touch; a VR headset tracks movement and updates its view."],
    ],
  },
  "015": {
    title: "Buffers, RAM, ROM and memory technologies",
    subtitle: "Define drivers and buffers before connecting them, then distinguish RAM, ROM, SRAM, DRAM, PROM, EPROM and EEPROM.",
    guidingQuestion: "How do temporary transfer storage and different primary-memory technologies meet different system needs?",
  },
  "016": {
    title: "Monitoring, control, sensors, actuators and feedback",
    subtitle: "Distinguish monitoring from control, match the named sensors to uses, and trace a complete feedback loop.",
    guidingQuestion: "How do sensor readings become monitored information or corrective physical action, and why must a control system receive feedback?",
    summaryMode: "authored",
    summary: [
      ["Monitoring", "Measure, record, display or alert without necessarily changing the condition."],
      ["Control", "Compare with a target and send an output signal to an actuator."],
      ["Named sensors", "Temperature, pressure, infra-red and sound sensors match different physical quantities."],
      ["Actuator", "Converts an output signal into a physical action."],
      ["Feedback", "A new reading shows the effect of the action and supports the next correction."],
    ],
  },
});

export const sectionMeta = Object.freeze({
  1: { title: "Information representation", paper: 1, anchor: "section-1-data-representation.png", anchorTitle: "Preserve meaning while changing representation", anchorAlt: "A mature archival workspace places full text, a photograph, a sound waveform and drawing plans beside compact archival cases.", anchorCaption: "The archive analogy separates exact preservation from acceptable perceptual simplification before the lesson states the technical rules.", anchorBoundary: "Files are bit patterns, not physical folders. The image introduces the preservation decision only; the worked examples define sampling, encoding, RLE and lossy methods precisely." },
  2: { title: "Communication", paper: 1 },
  3: { title: "Hardware", paper: 1, anchor: "section-3-hardware.png", anchorTitle: "Observe, decide and act", anchorAlt: "A professional automated greenhouse contains sensors, a control cabinet, ventilation, irrigation, shading and a separate observation room.", anchorCaption: "The greenhouse makes input, processing, output, monitoring and feedback visible in one physical setting.", anchorBoundary: "The picture does not identify a particular sensor circuit. Device principles, monitoring and control are defined by the labelled page materials." },
  4: { title: "Processor fundamentals", paper: 1, anchor: "section-4-processor.png", anchorTitle: "Coordinate stored work through specialised stations", anchorAlt: "An industrial operations room contains an ordered archive, a coordinator, distinct conduits, a clock and a calculation workbench.", anchorCaption: "The operations-room analogy introduces stored instructions, control, data movement, timing and nearby fast storage.", anchorBoundary: "This is not a CPU schematic. Register transfers, bus directions and instruction effects are stated only in the exact tables and traces below." },
  5: { title: "System software", paper: 1, anchor: "section-5-system-software.png", anchorTitle: "Translate, inspect, link and deliver", anchorAlt: "An engineering studio moves design plans through inspection stations while reusable parts feed a production line.", anchorCaption: "The production analogy helps distinguish translation, error discovery, reusable libraries and the finished program.", anchorBoundary: "Compiler, interpreter, assembler and operating-system behaviour are not literal manufacturing stages. Use the adjacent process tables for the examinable mechanisms." },
  6: { title: "Security, privacy and data integrity", paper: 1, anchor: "section-6-security.png", anchorTitle: "Protection works in layers", anchorAlt: "A secure records facility has an identity checkpoint, controlled inner doors, compartmented rooms, locked cabinets and a separate vault.", anchorCaption: "The facility makes layered prevention, restricted access and recoverability concrete without pretending one control is sufficient.", anchorBoundary: "Physical doors are an analogy. Authentication, access rights, encryption, firewalls, validation, verification and backup solve different technical risks." },
  7: { title: "Ethics and ownership", paper: 1, anchor: "section-7-ethics.png", anchorTitle: "A technical decision affects more than its developer", anchorAlt: "A formal technology review chamber brings engineers, legal specialists and public representatives around evidence of permission, risk, people and environmental cost.", anchorCaption: "The review setting makes stakeholders, professional duties, ownership and wider AI consequences visible.", anchorBoundary: "The scene does not decide an ethical case. A justified answer must identify stakeholders, duties, consequences, rights and the evidence in the given scenario." },
  8: { title: "Databases", paper: 1, anchor: "section-8-databases.png", anchorTitle: "Move from isolated files to managed relationships", anchorAlt: "A disorderly collection of duplicate loose folders faces an organised central archive with controlled access and a separate safe.", anchorCaption: "The archive analogy introduces duplication, consistency, managed structure, access and recovery.", anchorBoundary: "Shelves are not database tables. Keys, relationships, normal forms, integrity constraints and SQL are defined by the exact schemas and examples below." },
  9: { title: "Algorithm design and problem-solving", paper: 2, anchor: "section-9-algorithm-design.png", anchorTitle: "Reduce a complex problem to a teachable model", anchorAlt: "An urban planning studio develops a large transport problem through maps, route models, decision patterns and progressively refined plans.", anchorCaption: "The planning studio introduces abstraction, decomposition, representation choice and stepwise refinement.", anchorBoundary: "The wall plans are intentionally non-authoritative. Exact flowchart symbols, pseudocode constructs and logic statements appear in the lesson materials." },
  10: { title: "Data types and structures", paper: 2, anchor: "section-10-data-structures.png", anchorTitle: "Choose a structure from the operations it must support", anchorAlt: "A research archive displays a one-ended tray tower, an orderly waiting line, linked containers, a uniform drawer grid and multi-field case folders.", anchorCaption: "The archive turns different access and grouping behaviours into a memorable selection problem.", anchorBoundary: "The objects are analogies only. LIFO, FIFO, links, array bounds, records, file handling and pseudocode operations are stated precisely beside them." },
  11: { title: "Programming", paper: 2, anchor: "section-11-programming.png", anchorTitle: "Build a program from clear interfaces", anchorAlt: "A scientific analysis laboratory separates a complex job into reusable input, action and value-producing stations whose results are combined centrally.", anchorCaption: "The laboratory analogy introduces modular actions, returned values and controlled data flow.", anchorBoundary: "The equipment is not a syntax diagram. Cambridge pseudocode headers, parameters, return values, selection and iteration remain authoritative." },
  12: { title: "Software development", paper: 2, anchor: "section-12-development.png", anchorTitle: "Development is a controlled evidence cycle", anchorAlt: "An engineering assurance laboratory contains planning, prototype, implementation, test, diagnosis, acceptance and maintenance areas.", anchorCaption: "The laboratory places design, testing, correction and continuing change in one professional workflow.", anchorBoundary: "The spatial layout does not prescribe one lifecycle. Waterfall, iterative and RAD must be chosen from the project context and their trade-offs." },
});

const specialTeaching = Object.freeze({
  "S1.10": {
    explanations: [
      "Sound in air is an analogue wave whose amplitude changes continuously. A computer creates a digital representation by measuring amplitude at regular time intervals, quantising each measurement to an available level and storing the selected level as a binary sample value.",
      "Sampling rate is the number of samples taken each second, measured in hertz. A higher rate records the wave at more points in time, which can improve time accuracy but stores more sample values and therefore increases file size.",
      "Sampling resolution is the number of bits used per sample. More bits provide more amplitude levels, which can reduce quantisation error and improve amplitude accuracy, but every sample needs more storage.",
      "Rate and resolution improve different axes: rate changes how often the wave is measured; resolution changes how precisely each measured amplitude can be represented.",
    ],
    mechanismSteps: [
      { label: "Measure", title: "Sample at regular time intervals", detail: "The analogue-to-digital converter measures the current amplitude according to the sampling rate." },
      { label: "Quantise", title: "Choose an available amplitude level", detail: "The measured value is rounded to one of the levels permitted by the sampling resolution." },
      { label: "Encode", title: "Store the level as a binary value", detail: "The ordered binary samples form the digital representation that can be stored and processed." },
    ],
    workedExamples: [{ title: "Separate the two quality controls", steps: [
      { label: "Time axis", text: "Doubling the sampling rate doubles the number of measurements per second; duration is unchanged but twice as many sample values are stored." },
      { label: "Amplitude axis", text: "Increasing resolution from 8 to 16 bits changes the number of available levels from 256 to 65,536 and doubles the bits stored for each sample." },
      { label: "Conclusion", text: "Both changes can improve accuracy and increase file size, but they do so through different mechanisms." },
    ] }],
    misconceptions: ["Sampling rate is not the number of bits per sample. Sampling resolution is not the number of samples per second."],
  },
  "S1.11": {
    explanations: [
      "Files are compressed so that they require less storage space and fewer bits have to be transmitted. A smaller file can be transferred or streamed in less time at the same data-transfer rate and uses less network bandwidth for a given transfer time.",
      "Run-length encoding (RLE) is a lossless, reversible compression method for adjacent identical data items. Each run is represented by two values: the number of repeated items followed by the value or code of the repeated item.",
      "Lossless compression reconstructs every original bit. Lossy compression permanently removes selected detail, so it is suitable only when an exact copy is unnecessary and the reduced quality remains acceptable for the application.",
      "RLE is effective when long runs save more bits than the count-and-value pairs require. Data with short runs or frequent changes can become larger because every run adds a count as overhead.",
    ],
    mechanismSteps: [
      { label: "Identify runs", title: "Separate adjacent identical values", detail: "Read the data in order and divide it whenever the value changes; non-adjacent repetitions belong to different runs." },
      { label: "Encode", title: "Store a count and value for each run", detail: "Write the run length first and then the repeated data value or its code." },
      { label: "Decode", title: "Expand every count-and-value pair", detail: "Recreate each value the stated number of times and confirm that the complete output exactly matches the original data." },
      { label: "Judge", title: "Compare the encoded and original sizes", detail: "Use RLE only when the saved repeated values outweigh the extra count stored for every run." },
    ],
    workedExamples: [{ title: "Encode, decode and judge an RLE string", steps: [
      { label: "Source", text: "AAAABBCCCCCCCCDD contains four runs: AAAA, BB, CCCCCCCC and DD." },
      { label: "Encode", text: "Store each run as count then value: 4A 2B 8C 2D." },
      { label: "Decode", text: "Expanding the pairs produces AAAABBCCCCCCCCDD, so the method is lossless." },
      { label: "Counterexample", text: "ABC becomes 1A 1B 1C; the counts add overhead, so RLE increases the amount of stored data." },
    ] }],
    misconceptions: ["RLE replaces adjacent runs, not every occurrence of a value throughout a file; separated occurrences must be encoded as separate runs."],
    masteryCheck: {
      marks: 5,
      prompt: "Explain why compression is needed, then describe how RLE encodes and decodes adjacent repeated data and judge when it is effective.",
      answerCriteria: [
        "smaller files require less storage space",
        "fewer transmitted bits can reduce transfer time or bandwidth use",
        "RLE is lossless and stores each adjacent run as a count followed by its value or code",
        "decoding repeats each value by its stored count to reconstruct the original exactly",
        "long runs can save space but short runs may add more count overhead than they remove",
      ],
    },
  },
  "S3.10": teachingDepthOverrides["018:S3.10"],
  "S9.09": {
    explanations: [
      "A logic statement defines a Boolean decision, repetition condition or assignment. Cambridge pseudocode comparisons include =, <>, <, <=, > and >=; compound conditions use AND, OR and NOT.",
      "Translate each requirement into a comparison first, then combine the comparisons. Use parentheses when grouping could be unclear, and test values that make each component true and false before trusting the complete condition.",
    ],
    mechanismSteps: [
      { label: "Compare", title: "Write each atomic comparison", detail: "Turn each condition into an explicit comparison using the correct relational operator." },
      { label: "Combine", title: "Join conditions with Boolean operators", detail: "Use AND when every condition is required, OR when either is sufficient and NOT to invert a Boolean result." },
      { label: "Test", title: "Check decisive truth cases", detail: "Choose values that isolate each part and verify that the full statement has the required truth value." },
    ],
    workedExamples: [{ title: "Construct and test an eligibility condition", steps: [
      { label: "Requirement", text: "A user is eligible when Age is at least 18 and the account is not suspended." },
      { label: "Logic statement", text: "Eligible <- (Age >= 18) AND NOT Suspended" },
      { label: "True case", text: "Age = 18 and Suspended = FALSE makes both required parts true, so Eligible becomes TRUE." },
      { label: "False cases", text: "Age = 17 fails the age comparison; Suspended = TRUE is inverted to FALSE. Either case makes the AND result FALSE." },
    ] }],
    misconceptions: ["A compound logic statement must use the stated comparison and Boolean operators with correct grouping; AND and OR cannot be swapped without changing the truth conditions."],
    masteryCheck: {
      prompt: "Construct and test a compound logic statement containing a comparison and at least one Boolean operator.",
      answerCriteria: ["uses a complete comparison such as Age >= 18", "uses AND, OR or NOT according to the requirement", "tests data that makes each component true and false", "states the resulting Boolean value"],
    },
  },
  "S11.02": {
    explanations: [
      "CONSTANT defines and initialises a fixed named value. DECLARE introduces a variable name and data type. Assignment evaluates the expression on the right of <- and stores the result in the variable on the left.",
      "Arithmetic expressions use +, -, *, /, DIV and MOD and produce numeric results. Comparisons such as =, <>, <, <=, > and >= produce Boolean results; AND, OR and NOT combine or invert Boolean values.",
      "INPUT obtains a value from the keyboard and stores it in the named variable. OUTPUT sends a value or expression result to the console. The declared type must be compatible with every assigned or input value.",
    ],
    mechanismSteps: [
      { label: "Declare", title: "Define constants and typed variables", detail: "Introduce every identifier before use and initialise each constant in its declaration." },
      { label: "Obtain", title: "Input the required source values", detail: "Use INPUT with a declared variable whose type matches the expected data." },
      { label: "Evaluate", title: "Calculate and assign the result", detail: "Evaluate arithmetic or logical operators on the right, then store the result with <-." },
      { label: "Report", title: "Output the required result", detail: "Use OUTPUT only after the value has been assigned or calculated." },
    ],
    workedExamples: [{ title: "Declare, input, calculate and output without losing an operator", steps: [
      { label: "Declare", text: "CONSTANT TaxRate = 0.20\nDECLARE Price : REAL\nDECLARE Tax : REAL" },
      { label: "Input", text: "INPUT Price" },
      { label: "Calculate", text: "Tax <- Price * TaxRate" },
      { label: "Output", text: "OUTPUT Tax" },
      { label: "Check", text: "For Price = 50.00, multiplication gives 10.00 and <- stores 10.00 in Tax before it is output." },
    ] }],
    misconceptions: ["A declaration introduces an identifier and type; assignment changes a variable's value. The multiplication operator * must not disappear from the expression."],
    masteryCheck: {
      prompt: "Write and trace complete Cambridge pseudocode that declares typed values, inputs data, uses arithmetic and logical expressions, assigns results and outputs them.",
      answerCriteria: ["uses CONSTANT or DECLARE correctly", "uses INPUT before the values are needed", "preserves every operator, including * and <-", "uses a comparison or Boolean operator for a BOOLEAN result", "outputs a calculated or assigned value and checks it with test data"],
    },
  },
  "S11.06": {
    explanations: [
      "A procedure is a named subroutine used for an action or coherent sequence of actions. It may have no parameters, one parameter or several parameters.",
      "A parameter is declared in the procedure header; an argument is the actual value or variable supplied in a CALL. BYVAL gives the procedure a value without allowing assignments to change the caller's variable. BYREF allows a procedure assignment to update the caller's variable.",
      "Use a procedure when a repeated action has a clear interface, such as validating input, updating a record or displaying a report. The call hides implementation detail while the header documents the required data.",
    ],
    mechanismSteps: [
      { label: "Define", title: "Declare the procedure interface", detail: "Name the procedure and declare each typed parameter as BYVAL or BYREF where the mode matters." },
      { label: "Call", title: "Supply matching arguments", detail: "Pass actual values or variables in the documented order and with compatible types." },
      { label: "Trace", title: "Check which caller values can change", detail: "Assignments to a BYREF parameter persist in the caller; assignments to a BYVAL parameter do not change the caller's variable." },
    ],
    workedExamples: [{ title: "Contrast BYVAL and BYREF", steps: [
      { label: "Definition", text: "PROCEDURE AddBonus(BYVAL Rate : REAL, BYREF Pay : REAL)\n  Pay <- Pay + Pay * Rate\n  Rate <- 0.00\nENDPROCEDURE" },
      { label: "Call", text: "Rate <- 0.10\nPay <- 500.00\nCALL AddBonus(Rate, Pay)" },
      { label: "Result", text: "Pay becomes 550.00 because it is BYREF. Rate remains 0.10 in the caller because the parameter received it BYVAL." },
    ] }],
  },
  "S11.01": {
    explanations: [
      "Implementing a design means preserving its input, processing, decisions, repetition and output in complete Cambridge pseudocode. A flowchart symbol or structured-English verb must become the matching construct, not an approximate comment.",
      "Follow every flowchart arrow from Start, translate each input/output symbol, convert decisions into IF or CASE conditions, convert repeated paths into an appropriate loop and preserve every branch reconnection. For structured English, use its controlled verbs and indentation to identify the same control structure.",
      "After translation, trace at least one case through every branch and check that all constructs close correctly. The pseudocode is equivalent only when it produces the designed result for the same inputs.",
    ],
    mechanismSteps: [
      { label: "Read", title: "Identify input, output and control shapes", detail: "Mark each design element as sequence, decision or repetition before writing syntax." },
      { label: "Translate", title: "Write the matching complete construct", detail: "Preserve each condition, branch, loop back-edge and reconnection using Cambridge keywords." },
      { label: "Trace", title: "Check equivalence with representative data", detail: "Follow the design and pseudocode side by side and compare their outputs." },
    ],
    workedExamples: [{ title: "Translate structured English into a complete selection", steps: [
      { label: "Design", text: "Input Mark. If Mark is at least 50, output 'Pass'; otherwise output 'Fail'." },
      { label: "Pseudocode", text: "INPUT Mark\nIF Mark >= 50 THEN\n  OUTPUT 'Pass'\nELSE\n  OUTPUT 'Fail'\nENDIF" },
      { label: "Trace", text: "Mark = 50 follows the true branch and outputs Pass; Mark = 49 follows the false branch and outputs Fail." },
    ] }],
    misconceptions: ["A comment that says 'repeat' is not an implemented loop, and a decision without its false path may not preserve the design."],
  },
  "S11.04": {
    explanations: [
      "Use IF...THEN...ELSE...ENDIF for Boolean decisions and nested IF statements, and CASE...OF...OTHERWISE...ENDCASE when one expression is compared with several discrete values.",
      "Use FOR...TO...NEXT when the repetition count or inclusive counter range is known before the loop. Use WHILE...ENDWHILE when the condition must be checked before a body that may run zero times. Use REPEAT...UNTIL when the body must run before its stopping condition is checked.",
      "Every selection and loop must be complete, correctly nested and traceable. Choose the construct from the data and stopping rule rather than from which syntax is shortest.",
    ],
    mechanismSteps: [
      { label: "Select", title: "Identify the control requirement", detail: "Decide whether the problem needs a choice, known-count repetition, pre-condition repetition or post-condition repetition." },
      { label: "Write", title: "Use the matching complete Cambridge construct", detail: "Include the condition, body, alternative where needed and the correct closing keyword." },
      { label: "Trace", title: "Test entry, branch and exit behaviour", detail: "Use values that take each branch and check zero, one and repeated loop executions where applicable." },
    ],
    workedExamples: [{ title: "Choose and trace the right loop", steps: [
      { label: "Known count", text: "FOR Index <- 1 TO 10\n  OUTPUT Value[Index]\nNEXT Index" },
      { label: "May run zero times", text: "Password <- \"\"\nAttempts <- 0\nWHILE Password <> CorrectPassword AND Attempts < 3\n  INPUT Password\n  Attempts <- Attempts + 1\nENDWHILE" },
      { label: "Must run once", text: "REPEAT\n  INPUT Mark\nUNTIL Mark >= 0 AND Mark <= 100" },
      { label: "Decision", text: "The array traversal has known bounds, password validation may already be complete, and mark input must occur before the value can be tested." },
    ] }],
    misconceptions: ["WHILE is not guaranteed to run once. REPEAT is guaranteed to run at least once. FOR is justified by known bounds, not merely by convenience."],
  },
  "S11.07": teachingDepthOverrides["080:S11.07"],
  "S12.04": {
    explanations: [
      "A syntax error breaks the language grammar and is normally exposed by a translator or an IDE syntax check. A logic error uses valid syntax but implements the wrong rule, so the program may run and produce an incorrect result. A run-time error occurs during execution, such as division by zero or opening a missing file.",
      "Expose and locate faults with evidence suited to the error: translator diagnostics for syntax, trace tables or targeted expected results for logic, and run-time diagnostics for execution failures. Correct the cause, then repeat the same test and relevant regression tests.",
    ],
    mechanismSteps: [
      { label: "Expose", title: "Use a test or diagnostic that can reveal the fault", detail: "Select translation, tracing, a dry run, a breakpoint or a run-time diagnostic according to the suspected error type." },
      { label: "Locate", title: "Identify the exact faulty statement and cause", detail: "Compare the actual control path or value with the specified expected behaviour." },
      { label: "Correct", title: "Change the cause and retest", detail: "Repeat the failing case and regression cases; do not change the expected result to hide the error." },
    ],
    workedExamples: [{ title: "Correct a boundary logic error", steps: [
      { label: "Fault", text: 'IF Mark > 50 THEN Result <- "Pass" ELSE Result <- "Fail" ENDIF wrongly assigns Fail at Mark 50 when the required pass rule includes 50.' },
      { label: "Expose", text: "Trace the boundary value Mark = 50 and compare the actual result with the requirement that 50 should pass." },
      { label: "Correct", text: 'Use IF Mark >= 50 THEN Result <- "Pass" ELSE Result <- "Fail" ENDIF, then retest 49, 50 and 51.' },
    ] }],
    misconceptions: ["Successful translation proves only that syntax was accepted; it does not prove that the algorithm implements the required rule."],
  },
});

const misconceptionBySyllabus = Object.freeze({
  "S1.01": "Kilo is the decimal multiplier 1000; kibi is the binary multiplier 1024. They are not interchangeable labels for the same quantity.",
  "S1.02": "Binary place values are powers of two. Reading a binary digit string as if it were a denary numeral changes its value.",
  "S1.03": "One hexadecimal digit represents exactly four binary bits; hexadecimal is a compact notation for the same bit pattern, not a different stored value.",
  "S1.04": "In a fixed-width two's-complement value, the most significant bit has a negative place value. It is not a detachable minus sign.",
  "S1.05": "Overflow is not simply any carry bit. It occurs when the true result is outside the range representable by the available bits.",
  "S1.06": "BCD encodes each denary digit separately in four bits; it is not the same as converting the complete denary number to pure binary.",
  "S1.07": "Unicode is a character set with several encodings; it is not correct to state that every Unicode character is always stored in exactly 16 bits.",
  "S1.08": "Image resolution is the number of stored pixels; screen resolution describes a display. Colour depth changes bits per pixel, not the number of pixels.",
  "S1.09": "A vector graphic stores drawing objects and properties rather than a fixed pixel grid, so scaling does not create the same pixelation as enlarging a bitmap.",
  "S3.01": "Primary storage is defined by direct CPU access, not by being volatile: RAM is volatile, while ROM is non-volatile.",
  "S3.02": "An embedded system is not merely a small computer; it is built into a larger product to perform a dedicated function, often with limited resources.",
  "S3.03": "Naming a component is not enough: a principal-operation answer must connect input, internal conversion and output in order.",
  "S3.04": "A buffer absorbs a temporary rate mismatch; it does not increase the long-term transfer rate or provide permanent storage.",
  "S3.05": "RAM and ROM are both primary storage, but RAM is normally volatile and writable while ROM retains its stored instructions without power.",
  "S3.06": "SRAM is not solid-state secondary storage. SRAM uses flip-flop circuits without refresh and commonly serves cache; DRAM needs refresh and commonly serves main memory.",
  "S3.07": "PROM is programmed once, EPROM is erased using ultraviolet light, and EEPROM is erased electrically; the names do not describe identical rewrite methods.",
  "S3.08": "A monitoring system reports measurements, while a control system uses feedback and actuators to change the physical process. Sensing alone is not control.",
  "S3.09": "A sensor detects a physical property and produces a signal; an actuator produces a physical effect. A sensor does not perform the corrective action.",
  "S4.01": "Von Neumann architecture stores instructions and data in the same addressable memory; it does not require separate instruction and data stores.",
  "S4.02": "Each register has a specific temporary role: for example, MAR holds an address, MDR holds transferred data and PC holds the next instruction address. The names are not interchangeable.",
  "S4.03": "The clock coordinates processor timing but does not decode instructions. The control unit decodes and directs operations; the ALU performs arithmetic and logic.",
  "S4.04": "The address bus identifies a location, the data bus carries values, and the control bus carries control signals. They are not three names for the same transfer.",
  "S4.05": "Doubling clock speed or core count does not guarantee double performance; workload parallelism, cache behaviour, bus width and processor design also constrain execution.",
  "S4.06": "USB is a general serial interface, HDMI carries digital audio/video, and VGA carries analogue video. A connector's shape alone does not establish its signal type or purpose.",
  "S4.07": "Fetch, decode and execute are ordered operations with specific register transfers; register names cannot be placed in an arbitrary memorised sequence.",
  "S4.08": "An interrupt does not erase the current program. The processor preserves the required state, runs the interrupt service routine and then resumes when appropriate.",
  "S4.09": "Assembly language uses mnemonic instructions and operands; machine code is the binary instruction encoding produced by the assembler. They are related but not identical text.",
  "S4.10": "Pass one builds the symbol table and records addresses; pass two uses that table to resolve labels and produce machine code. Both passes do not perform the same job.",
  "S4.11": "A trace records only instructions that execute and only states they change; a conditional branch must be decided from the current comparison or status value.",
  "S4.12": "Instruction groups are classified by their effect. A mnemonic that mentions a value is not automatically a data-movement instruction.",
  "S4.14": "Immediate addressing supplies the operand value; direct addressing supplies its address; indirect addressing points to a location that contains another address.",
  "S4.15": "Logical shifts insert zero bits. Arithmetic and cyclic shifts preserve or rotate different information and must not be described as equivalent to LSL or LSR.",
  "S5.01": "An operating system manages resources and provides system services; an application performs a user task by using those services.",
  "S5.02": "Utilities have distinct purposes: backup supports recovery, antivirus detects malware and defragmentation rearranges fragmented disk data. One does not replace the others.",
  "S5.03": "A program library supplies reusable code. A dynamically linked library is linked or loaded when the program runs rather than being copied in full into every executable.",
  "S5.04": "A compiler translates a whole program before execution, while an interpreter translates and executes progressively; neither is simply a better version of the other.",
  "S5.05": "Translator choice depends on the development and use context: rapid diagnosis can favour interpretation, while distributing repeatedly executed software can favour compilation.",
  "S5.06": "Java source is compiled to bytecode and the JVM then executes that bytecode using interpretation and/or runtime compilation; it is not compiled directly only for one processor.",
  "S5.07": "Dynamic syntax checking can expose grammar errors while code is written, but successful syntax checking does not prove that the program logic is correct.",
  "S6.01": "Security protects assets, privacy governs appropriate personal-data use, and integrity concerns accuracy and consistency. The three terms overlap but are not synonyms.",
  "S6.02": "Computer-system security is needed for confidentiality, integrity and availability; protecting secrecy alone does not keep a system reliable or usable.",
  "S6.03": "A digital signature supports origin and integrity checks but does not by itself hide the message. Encryption protects confidentiality but does not authenticate every user action.",
  "S6.04": "Phishing deceives a user into disclosing information; pharming redirects the user to a fraudulent destination. They are not two names for the same delivery mechanism.",
  "S6.05": "Authentication establishes an identity claim; access rights then restrict what that authenticated identity may do. Logging in does not imply unlimited authorisation.",
  "S6.06": "Encryption protects data from being read without the key, while access rights control permitted actions. Encryption alone does not stop an authorised user deleting data.",
  "S6.07": "Validation checks whether data is sensible and follows rules; it cannot prove that a plausible value is true.",
  "S6.08": "Verification checks whether data was copied or transferred accurately; it does not replace validation rules such as range or format checks.",
  "S7.04": "Copyright protects qualifying expression such as source code, not every abstract idea or algorithm; permission or a valid licence is still required for restricted uses.",
  "S7.05": "Open-source software remains copyrighted. Its licence grants stated permissions and may impose conditions; access to source code does not mean absence of ownership.",
  "S7.06": "An AI output is not automatically correct, unbiased or accountable. Applications and impacts must be evaluated from the data, model, deployment and affected stakeholders.",
  "S7.01": "Professional ethics goes beyond obeying a manager or the minimum law; it requires competent, accountable decisions that consider foreseeable effects on the public and clients.",
  "S7.02": "Membership of a professional body provides a code, guidance and development, but the body does not make every member's decision automatically ethical.",
  "S7.03": "An ethics answer is not an unsupported personal opinion. It must identify stakeholders, benefits, harms, rights, responsibilities and the consequences of both choices.",
  "S8.01": "Using a database does not automatically remove duplication or inconsistency; a relational design, keys, constraints and controlled updates are required.",
  "S8.02": "A primary key is one chosen candidate key; a foreign key refers to a key in another table and need not be unique in its own table.",
  "S8.03": "An entity-relationship diagram models entities and relationships; it is not a data-flow diagram and does not show the order of program processing.",
  "S8.04": "First, Second and Third Normal Form remove different dependency problems. Splitting tables without preserving keys and relationships does not guarantee 3NF.",
  "S8.05": "A backup supports recovery after loss, while access rights and other security controls restrict actions before an incident. Backup alone is not database security.",
  "S8.06": "A developer interface helps construct and manage database objects; the query processor interprets and executes queries. They are different DBMS components.",
  "S8.07": "DDL defines or changes database structure; DML retrieves or changes stored rows. CREATE and SELECT therefore do not belong to the same SQL category.",
  "S8.08": "Reading an SQL statement means explaining what each clause, identifier, operator and value does; merely expanding the SQL acronym does not explain its semantics.",
  "S8.09": "A PRIMARY KEY uniquely identifies a row; a FOREIGN KEY with REFERENCES establishes a relationship. Declaring a field does not automatically make it a key.",
  "S8.10": "GROUP BY forms groups for aggregate results; ORDER BY only sorts the returned rows. The two clauses are not interchangeable.",
  "S10.01": "CHAR stores one character while STRING stores a sequence; INTEGER and REAL also represent different numeric domains and must not be chosen only from a value's appearance.",
  "S9.01": "Abstraction removes details irrelevant to the stated problem; it must not remove an input, rule or constraint that changes the required result.",
  "S9.02": "Decomposition creates connected sub-problems with meaningful responsibilities, not one separate module for every individual statement.",
  "S9.03": "An algorithm is an ordered, unambiguous sequence of defined steps; a vague instruction such as 'process the data' is not an executable method.",
  "S9.04": "A meaningful identifier describes a value's role, and the identifier table must agree with the data type and purpose used in the algorithm.",
  "S9.05": "Input, process and output are connected parts of one solution. Listing three unrelated sets of facts does not form an IPO design.",
  "S9.06": "Sequence, selection and iteration describe different control structures; indentation alone does not turn statements into a valid branch or loop.",
  "S9.07": "Structured English, flowchart and pseudocode must preserve the same decisions and repetitions; conversion is not a visual restyling that may change control flow.",
  "S9.08": "Stepwise refinement replaces a high-level step with more precise substeps while preserving its purpose; adding comments without reducing ambiguity is not refinement.",
  "S9.09": "A compound logic statement must use the stated comparison and Boolean operators with correct grouping; AND and OR cannot be swapped without changing the truth conditions.",
  "S10.02": "A record groups named fields that may have different types; an array groups indexed elements of one declared element type. The access notation is therefore different.",
  "S10.03": "Both array bounds are inclusive in Cambridge pseudocode, so the element count is upper bound minus lower bound plus one.",
  "S10.04": "Choose a 2D array only when each value naturally needs two indexes such as row and column; a long list alone still needs only one dimension.",
  "S10.05": "Array-processing loops must use the declared inclusive bounds; importing a zero-based index from another language can skip an element or access outside the array.",
  "S10.07": "A file provides persistent storage beyond one program run. A variable in main memory does not remain available after execution unless its data is written to persistent storage.",
  "S10.08": "An abstract data type is defined by its permitted operations and behaviour, not by one fixed implementation such as an array.",
  "S10.09": "A stack is chosen for LIFO access, a queue for FIFO access and a linked list for link-based traversal or insertion. The underlying array implementation does not change those behaviours.",
  "S10.10": "Editing or deleting ADT data must preserve its structure: stack top, queue front/rear and linked-list links cannot be changed as if the data were an unordered file.",
  "S11.02": "A declaration introduces an identifier and type; assignment changes a variable's value. A constant must not later be treated as a variable.",
  "S11.03": "A function returns a value that can be used in an expression. A procedure call that returns no value cannot be substituted in the same expression position.",
  "S11.05": "Choose a loop from its control rule: FOR for known bounds, WHILE for a pre-condition and REPEAT for a post-condition. Syntax length is not the deciding factor.",
  "S11.06": "BYVAL protects the caller's variable from assignments to the parameter; BYREF allows those assignments to update the caller. Both still pass an argument at the call.",
  "S11.08": "A parameter is declared in a subprogram header; an argument is supplied at a call. A function return value is separate from both.",
  "S11.09": "Shorter pseudocode is not automatically clearer or more efficient; correctness, valid bounds, meaningful identifiers and avoidance of repeated work all matter.",
  "S12.01": "A lifecycle model organises development work but does not make testing a single final event; defects and feedback can require earlier stages to be revisited.",
  "S12.02": "A structure chart shows module hierarchy and parameter interfaces; it is not a flowchart of statement-by-statement control flow.",
  "S12.03": "A state-transition diagram shows states and event/condition-labelled transitions; it does not replace a flowchart for every processing step.",
  "S12.05": "Black-box testing uses specified inputs and outputs without relying on internal paths; white-box testing deliberately examines internal logic and paths.",
  "S12.06": "A test strategy states the overall testing approach, while a test plan records concrete cases, data, expected results and actual outcomes.",
  "S12.07": "Boundary data is at or immediately beside a valid limit; abnormal data is invalid because of its type, format or permitted range. The categories are not identical.",
  "S12.08": "Corrective maintenance fixes faults, adaptive maintenance responds to an environmental change, and perfective maintenance improves performance or usability.",
  "S12.09": "Amending an existing program requires understanding its current logic and interfaces first, followed by targeted changes and regression testing.",
});

const objectiveExpansions = Object.freeze({
  "S1.02": [
    "Explain binary as a base-2 number system.",
    "Explain denary as a base-10 number system.",
    "Explain hexadecimal as a base-16 number system.",
    "Explain Binary Coded Decimal and why it is used.",
    "Explain one's-complement representation and why it is used.",
    "Explain two's-complement representation and why it is used.",
  ],
  "S1.03": [
    "Convert integers between binary and denary.",
    "Convert integers between binary and hexadecimal.",
    "Convert integers between denary and hexadecimal.",
    "Convert integers between denary and Binary Coded Decimal.",
    "Convert integers between positive binary and one's-complement representation.",
    "Convert integers between positive binary and two's-complement representation.",
  ],
  "S1.04": [
    "Perform unsigned binary addition and subtraction at a stated width.",
    "Perform binary addition and subtraction with positive and negative fixed-width integers.",
  ],
  "S1.05": ["Explain how overflow occurs in fixed-width binary arithmetic."],
  "S1.06": [
    "Describe practical applications where Binary Coded Decimal is used.",
    "Describe practical applications where hexadecimal is used.",
  ],
  "S1.07": [
    "Explain how a character set maps characters to numeric codes stored in binary.",
    "Explain standard ASCII as a 7-bit character set.",
    "Explain extended ASCII as an 8-bit character set.",
    "Explain why Unicode supports a much wider range of characters than ASCII.",
  ],
  "S1.08": ["Explain how pixels and a file header encode a bitmap.", "Distinguish image resolution from screen resolution.", "Explain colour depth as bits per pixel and the number of available colours.", "Calculate uncompressed bitmap pixel-data size and convert units.", "Explain how image resolution affects stored detail and file size.", "Explain how colour depth affects colour accuracy and file size."],
  "S1.09": ["Explain a vector drawing list, its drawing objects and their properties.", "Explain why vector graphics scale without pixelation.", "Justify bitmap or vector representation for a given task."],
  "S1.10": ["Explain sampling of an analogue sound wave.", "Explain quantisation and binary encoding of sample values.", "Explain the effect of sampling rate on time accuracy and file size.", "Explain the effect of sampling resolution on amplitude accuracy and file size."],
  "S1.11": ["Explain why files are compressed.", "Distinguish lossless and lossy compression by reconstruction and information loss.", "Encode and decode run-length encoding and judge when it is effective.", "Explain suitable lossless compression for ordinary text.", "Explain lossless and lossy compression choices for bitmap images.", "Explain lossless storage of repeated vector objects or properties.", "Explain lossless and lossy compression choices for sound.", "Justify a compression method from fidelity, repetition and intended use."],
  "S3.01": ["Explain the need for input devices.", "Explain the need for output devices.", "Explain the need for primary memory.", "Explain the need for secondary storage.", "Explain the use of removable secondary storage."],
  "S3.02": ["Show understanding of an embedded system as a computer system built into a larger device for a dedicated function.", "Explain benefits of embedded systems.", "Explain drawbacks of embedded systems."],
  "S3.03": ["Describe the principal operation of a laser printer.", "Describe the principal operation of a 3D printer.", "Describe the principal operation of a microphone.", "Describe the principal operation of speakers.", "Describe the principal operation of magnetic hard-disk storage.", "Describe the principal operation of solid-state flash memory.", "Describe the principal operation of an optical disc reader/writer.", "Describe the principal operation of a touchscreen.", "Describe the principal operation of a virtual-reality headset."],
  "S3.04": ["Explain the use of a buffer during data transfer between components or devices."],
  "S3.05": ["Explain the differences between Random Access Memory (RAM) and Read Only Memory (ROM).", "Explain the use of RAM and ROM in a range of devices and systems."],
  "S3.06": ["Explain how Static RAM (SRAM) and Dynamic RAM (DRAM) store bits.", "Explain why DRAM requires refresh and SRAM does not.", "Compare SRAM and DRAM by speed, cost and density.", "Explain uses of SRAM and DRAM and reasons for choosing each type."],
  "S3.07": ["Explain how Programmable ROM (PROM) is programmed.", "Explain how Erasable Programmable ROM (EPROM) is erased and reprogrammed.", "Explain how Electrically Erasable Programmable ROM (EEPROM) is erased and reprogrammed."],
  "S3.08": ["Show understanding of monitoring and control systems.", "Explain the difference between monitoring and control.", "Explain the importance of feedback in a control system."],
  "S3.09": ["Explain the use of temperature, pressure, infra-red and sound sensors.", "Explain the use of actuators in monitoring and control systems."],
  "S3.10": ["Recognise and use the NOT gate symbol and function.", "Recognise and use the AND gate symbol and function.", "Recognise and use the OR gate symbol and function.", "Recognise and use the NAND gate symbol and function.", "Recognise and use the NOR gate symbol and function.", "Recognise and use the XOR/EOR gate symbol and function.", "Construct truth tables with one-input NOT and two-input gates.", "Construct a logic circuit from a problem statement, expression or truth table.", "Construct a truth table from a problem statement, circuit or expression.", "Construct a logic expression from a problem statement, circuit or truth table."],
  "S4.02": ["Distinguish general-purpose and special-purpose registers.", "Explain the role of the Program Counter.", "Explain the role of the Memory Data Register.", "Explain the role of the Memory Address Register.", "Explain the role of the Accumulator.", "Explain the role of the Index Register.", "Explain the role of the Current Instruction Register.", "Explain the role of the Status Register."],
  "S4.12": ["Classify data-movement instructions.", "Classify input/output instructions.", "Classify arithmetic instructions.", "Classify unconditional and conditional control instructions.", "Classify compare instructions."],
  "S4.13": ["Trace data movement using LDM, LDD, LDI, LDX, LDR, MOV and STO.", "Trace arithmetic using ADD, SUB, INC and DEC.", "Trace comparison and branches using CMP, CMI, JPE and JPN.", "Trace input, output and termination using IN, OUT and END.", "Interpret immediate, direct, indirect and indexed operands correctly while tracing.", "Record only executed instructions and the state each one changes."],
  "S4.05": ["Explain how processor type affects performance.", "Explain how the number of processor cores affects suitable workloads.", "Explain how data-bus width affects transfer capacity.", "Explain how clock speed affects the rate of processor cycles.", "Explain how cache memory can reduce slower main-memory access."],
  "S5.01": ["Explain why a computer system requires an operating system.", "Explain operating-system memory management.", "Explain operating-system file management.", "Explain operating-system security management.", "Explain operating-system hardware and peripheral management.", "Explain operating-system process management."],
  "S5.02": ["Explain the purpose of a disk formatter.", "Explain the purpose of a virus checker.", "Explain the purpose of defragmentation software.", "Explain the purpose of disk analysis and repair software.", "Explain the purpose of file-compression utilities.", "Explain the purpose of backup software."],
  "S5.07": ["Explain context-sensitive coding prompts.", "Explain dynamic syntax checking.", "Explain pretty-printing.", "Explain expanding and collapsing code blocks.", "Use single stepping to trace execution.", "Use breakpoints to pause at selected statements.", "Inspect variables and expressions during debugging.", "Use a report or diagnostic window."],
  "S6.03": ["Explain user accounts and passwords as access controls.", "Explain digital signatures as an authentication technique.", "Explain biometric authentication.", "Explain the role of a firewall.", "Explain anti-virus protection.", "Explain anti-spyware protection.", "Explain encryption as protection for data.", "Select layered controls for a stated system."],
  "S6.04": ["Explain the threat posed by a computer virus.", "Explain the threat posed by spyware.", "Explain the threat posed by unauthorised hacking.", "Explain phishing and why it can deceive a user.", "Explain pharming and why it can redirect a user."],
  "S6.07": ["Distinguish validation from verification.", "Use range, format, length, presence, existence and limit checks.", "Use and explain a check digit.", "Explain how validation protects integrity without proving truth."],
  "S6.08": ["Use a visual check during data entry.", "Use double entry during data entry.", "Use byte and block parity during data transfer.", "Use a checksum during data transfer.", "Explain how verification detects copying or transfer errors."],
  "S7.05": ["Explain the Free Software Foundation licensing model.", "Explain open-source licensing.", "Explain shareware licensing.", "Explain commercial software licensing.", "Justify a licence for a given situation."],
  "S8.02": ["Use entity, table, record/tuple and field/attribute terminology.", "Distinguish primary, candidate, secondary and foreign keys.", "Explain one-to-one, one-to-many and many-to-many relationships.", "Explain referential integrity.", "Explain the purpose of indexing."],
  "S8.04": ["Explain First Normal Form.", "Explain Second Normal Form.", "Explain Third Normal Form.", "Judge whether tables are in 3NF.", "Produce a normalised database design from a description or data."],
  "S8.05": ["Explain DBMS data management and the role of a data dictionary.", "Explain database data modelling.", "Explain the purpose of a logical schema.", "Explain how a DBMS enforces data integrity.", "Explain DBMS data security using individual or group access rights.", "Explain database backup and recovery procedures."],
  "S8.06": ["Explain how a DBMS developer interface is used in practice.", "Explain how a DBMS query processor is used in practice."],
  "S8.09": ["Write a CREATE DATABASE statement.", "Write CREATE TABLE with appropriate CHARACTER, VARCHAR, BOOLEAN, INTEGER, REAL, DATE and TIME types.", "Write an ALTER TABLE statement.", "Declare a PRIMARY KEY in a table definition.", "Declare a FOREIGN KEY with REFERENCES."],
  "S8.10": ["Write SELECT and FROM clauses.", "Use WHERE to filter rows.", "Use ORDER BY to sort results.", "Use GROUP BY for grouped results.", "Use INNER JOIN across at most two tables.", "Use SUM, COUNT and AVG aggregate functions."],
  "S8.11": ["Write INSERT INTO to add a row.", "Write UPDATE with SET and a safe WHERE condition.", "Write DELETE FROM with a safe WHERE condition."],
  "S10.01": ["Select and use INTEGER.", "Select and use REAL.", "Select and use CHAR and STRING.", "Select and use BOOLEAN.", "Select and use DATE.", "Recognise ARRAY and FILE as Cambridge pseudocode types."],
  "S10.06": ["Write and trace a bounded linear search.", "Write and trace an ascending bubble sort using adjacent comparisons and a complete swap."],
  "S10.09": ["Explain stack LIFO behaviour and justify a stack.", "Explain queue FIFO behaviour and justify a queue.", "Explain linked-list nodes and links and justify a linked list."],
  "S10.10": ["Add, edit and delete data while preserving stack behaviour.", "Add, edit and delete data while preserving queue behaviour.", "Add, edit and delete data while preserving linked-list links.", "Describe array implementations of a stack, queue and linked list."],
  "S11.02": ["Declare and initialise constants.", "Declare variables with Cambridge data types.", "Assign expression values to variables.", "Use arithmetic and logical operators in expressions.", "Read keyboard input and write console output."],
  "S11.04": ["Write IF, ELSE and nested IF statements.", "Write a CASE structure.", "Write a count-controlled FOR loop.", "Write a pre-condition WHILE loop.", "Write a post-condition REPEAT loop."],
  "S11.06": ["Define and call a procedure.", "Explain when a procedure is appropriate.", "Define a procedure with none, one or several parameters.", "Pass a parameter by value.", "Pass a parameter by reference and trace the caller change."],
  "S11.07": ["Define a typed function with RETURN.", "Call a function with arguments.", "Use the returned value inside an expression.", "Explain when a function is appropriate."],
  "S11.08": ["Identify a procedure or function header.", "Explain a subprogram interface.", "Distinguish a parameter from an argument.", "Explain a function return value."],
  "S12.01": ["Explain the purpose of a development life cycle.", "Describe analysis, design, coding, testing and maintenance stages.", "Explain waterfall principles, benefits and drawbacks.", "Explain iterative-development principles, benefits and drawbacks.", "Explain RAD principles, benefits and drawbacks.", "Choose a lifecycle from the program context."],
  "S12.04": ["Explain ways to expose and avoid faults.", "Identify a syntax error.", "Identify a logic error.", "Identify a run-time error.", "Locate the cause of an error.", "Correct an identified error and retest."],
  "S12.05": ["Use a dry run to trace a program manually.", "Use a walkthrough to review a program collaboratively.", "Explain white-box testing.", "Explain black-box testing.", "Explain integration testing and a stub.", "Explain alpha testing.", "Explain beta testing.", "Explain acceptance testing.", "Select a testing method for a scenario."],
  "S12.08": ["Explain why continuing maintenance is required.", "Classify and explain corrective maintenance.", "Classify and explain adaptive maintenance.", "Classify and explain perfective maintenance."],
});

const clean = (value = "") => String(value)
  .replace(/The syllabus (?:also )?(?:requires|names|includes)[^.]*\.?/gi, "")
  .replace(/Candidates? (?:will|are)[^.]*\.?/gi, "")
  .replace(/\s+/g, " ")
  .trim();

const sentences = (value) => String(value ?? "").split(/;\s+|\.\s+/).map((part) => clean(part)).filter((part) => part.length > 1);
const objectiveWords = (value) => new Set(String(value).toLowerCase().match(/[a-z][a-z0-9-]{3,}/g) ?? []);
const overlap = (a, b) => {
  const left = objectiveWords(a);
  return [...left].filter((word) => objectiveWords(b).has(word)).length;
};

function objectiveRows(syllabusId) {
  if (objectiveExpansions[syllabusId]) return objectiveExpansions[syllabusId].map((description, index) => [`${syllabusId}.A${String(index + 1).padStart(2, "0")}`, description]);
  const mapping = officialAsMapping[syllabusId];
  if (!mapping) throw new Error(`Missing official syllabus mapping for ${syllabusId}`);
  const statements = [...mapping.candidateStatements, ...mapping.adjacentNotesAndGuidance];
  const seen = new Set();
  return statements.filter((statement) => {
    const key = statement.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).map((description, index) => [`${syllabusId}.A${String(index + 1).padStart(2, "0")}`, clean(description)]);
}

function makeLesson002Units() {
  const s102Objectives = objectiveRows("S1.02").map(([id]) => id);
  const s103Objectives = objectiveRows("S1.03").map(([id]) => id);
  const s106Objectives = objectiveRows("S1.06").map(([id]) => id);
  const unit = ({ unitKey, syllabusId, heading, objectiveIds, explanation, materials, misconceptions, masteryCheck }) => ({
    unitKey,
    syllabusId,
    heading,
    objectiveIds,
    explanation,
    materials: materials.map((material) => ({ ...material, objectiveIds })),
    misconceptions,
    teacherNote: `Teach ${heading} as its own concept before moving to the next representation.`,
    masteryCheck,
  });

  return [
    unit({
      unitKey: "S1.02-BINARY",
      syllabusId: "S1.02",
      heading: "Binary",
      objectiveIds: [s102Objectives[0]],
      explanation: [
        "Binary is a base-2 number system. It uses only the digits 0 and 1.",
        "Each position has a place value that is a power of 2. Starting at the right, the place values are 1, 2, 4, 8, 16 and so on; a 1 includes its place value and a 0 does not.",
      ],
      materials: [
        {
          type: "reviewed-visual",
          title: "8-bit binary place values",
          asset: "/assets/diagrams/stage10-infographics/stage10-lesson-002-knowledge.jpg",
          facts: [
            "Bit positions 7 to 0 have place values 128, 64, 32, 16, 8, 4, 2 and 1.",
            "A 1 includes its place value and a 0 excludes it.",
            "The bit pattern 10110110 selects 128, 32, 16, 4 and 2.",
          ],
          alt: "An 8-bit binary place-value diagram showing bit positions, powers of two and the selected values in 10110110.",
          review: "reviewed",
        },
        {
          type: "worked-example",
          title: "Read a binary place-value pattern",
          steps: [
            ["Write the place values", "Above 00001101, write 128, 64, 32, 16, 8, 4, 2 and 1."],
            ["Select the 1 bits", "The 1 bits select the place values 8, 4 and 1."],
            ["Combine the selected values", "The value represented by 00001101 is 8 + 4 + 1 = 13."],
          ],
        },
      ],
      misconceptions: ["A binary digit string is not read like an everyday numeral; every position has a power-of-two place value."],
      masteryCheck: { marks: 2, prompt: "Explain how the bit pattern 00101001 represents a value.", answerCriteria: ["State that binary uses power-of-two place values.", "Identify and combine the selected place values 32, 8 and 1."] },
    }),
    unit({
      unitKey: "S1.02-DENARY",
      syllabusId: "S1.02",
      heading: "Denary",
      objectiveIds: [s102Objectives[1]],
      explanation: [
        "Denary is a base-10 number system. It uses the digits 0 to 9.",
        "Each position has a place value that is a power of 10. Starting at the right, the place values are 1, 10, 100, 1000 and so on.",
      ],
      materials: [
        { type: "table", title: "Denary place values", headers: ["Digit", "Hundreds", "Tens", "Units"], rows: [["182", "1 × 100", "8 × 10", "2 × 1"]] },
        {
          type: "worked-example",
          title: "Read a denary numeral by place value",
          steps: [
            ["Separate the positions", "In 407, the digits occupy the hundreds, tens and units positions."],
            ["Apply the place values", "The place-value expression is 4 × 100 + 0 × 10 + 7 × 1."],
            ["Combine the terms", "The represented value is 400 + 0 + 7 = 407."],
          ],
        },
      ],
      misconceptions: ["Denary is the name of the base-10 system; it does not mean that every written number is automatically base 10."],
      masteryCheck: { marks: 2, prompt: "Explain the place values used in the denary numeral 6305.", answerCriteria: ["Identify the thousands, hundreds, tens and units positions.", "Give the expression 6 × 1000 + 3 × 100 + 0 × 10 + 5 × 1."] },
    }),
    unit({
      unitKey: "S1.02-HEXADECIMAL",
      syllabusId: "S1.02",
      heading: "Hexadecimal",
      objectiveIds: [s102Objectives[2], s106Objectives[1]],
      explanation: [
        "Hexadecimal is a base-16 number system. It uses the digits 0 to 9 followed by A, B, C, D, E and F, which represent the digit values 10 to 15.",
        "Each position has a place value that is a power of 16. Starting at the right, the place values are 1, 16, 256, 4096 and so on.",
        "Hexadecimal is used as a compact way for people to read long binary patterns. One hexadecimal digit represents four binary bits, so it is practical for memory addresses, machine-code or debugging values, and colour codes.",
      ],
      materials: [
        {
          type: "reviewed-visual",
          title: "Why hexadecimal is used",
          asset: "/assets/diagrams/course-v3-imagegen/hex-applications.png",
          facts: [
            "One hexadecimal digit represents exactly four binary bits.",
            "Hexadecimal is used for compact memory addresses, machine-code or debugging values, and colour codes.",
            "Hexadecimal is human-readable notation for the same underlying bits, not an additional stored value.",
          ],
          alt: "An ImageGen infographic showing four-bit hexadecimal grouping and practical uses in memory addresses, debugging values and colour codes.",
          review: "imagegen-generated-and-course-reviewed",
        },
        {
          type: "worked-example",
          title: "Read a hexadecimal numeral by place value",
          steps: [
            ["Identify the digit values", "In 3A, the digit values are 3 and 10."],
            ["Apply the place values", "The left position has place value 16 and the right position has place value 1."],
            ["Combine the terms", "The represented value is 3 × 16 + 10 × 1 = 58."],
          ],
        },
      ],
      misconceptions: ["A to F are single hexadecimal digits with values 10 to 15; they are not variables or separate place values."],
      masteryCheck: { marks: 3, prompt: "Explain how hexadecimal 4C represents an integer value and give one practical use of hexadecimal.", answerCriteria: ["State that C has digit value 12.", "Give the place-value expression 4 × 16 + 12 × 1.", "Link a valid use such as a memory address, debugging value or colour code to compact four-bit grouping."] },
    }),
    unit({
      unitKey: "S1.02-BCD",
      syllabusId: "S1.02",
      heading: "Binary Coded Decimal (BCD)",
      objectiveIds: [s102Objectives[3], s106Objectives[0]],
      explanation: [
        "Binary Coded Decimal (BCD) is a representation in which each denary digit is encoded separately as a four-bit group. Only 0000 to 1001 are valid BCD digit groups because a single denary digit can only be 0 to 9.",
        "BCD is used when individual decimal digits must be preserved for exact input, processing or display, such as in a digital clock or calculator. This makes digit handling direct, although BCD normally uses more bits than a pure binary representation of the same integer.",
      ],
      materials: [
        {
          type: "reviewed-visual",
          title: "BCD keeps denary digits separate",
          asset: "/assets/diagrams/course-v3-imagegen/bcd-hex.png",
          facts: [
            "BCD encodes each denary digit as its own four-bit group.",
            "The denary digits 5 and 9 become 0101 and 1001, so a display can reproduce 59 directly.",
            "Hexadecimal instead maps each four-bit binary group to one hexadecimal digit.",
          ],
          alt: "An ImageGen comparison showing denary digits 5 and 9 encoded separately in BCD and two binary nibbles represented as hexadecimal D6.",
          review: "imagegen-generated-and-course-reviewed",
        },
        {
          type: "worked-example",
          title: "Encode the denary digits 407 in BCD",
          steps: [
            ["Keep the digits separate", "Treat 407 as the three digits 4, 0 and 7."],
            ["Encode each digit", "Use 0100 for 4, 0000 for 0 and 0111 for 7."],
            ["Join the groups", "The BCD representation is 0100 0000 0111."],
          ],
        },
      ],
      misconceptions: ["BCD does not treat the complete bit pattern as one pure binary number; each four-bit group represents one decimal digit."],
      masteryCheck: { marks: 3, prompt: "Explain why BCD may be used for a digital clock and encode 59 in BCD.", answerCriteria: ["State that each decimal digit is encoded separately.", "Give 0101 for 5 and 1001 for 9.", "Link BCD to direct, exact decimal-digit display."] },
    }),
    unit({
      unitKey: "S1.02-ONES-COMPLEMENT",
      syllabusId: "S1.02",
      heading: "One's complement",
      objectiveIds: [s102Objectives[4]],
      explanation: [
        "One's complement represents a negative fixed-width binary integer by inverting every bit of the positive value: each 0 becomes 1 and each 1 becomes 0.",
        "It is used to represent negative values and makes sign reversal a direct bit inversion. Its drawback is that it has two zero patterns, one positive and one negative, which makes zero testing and arithmetic less convenient.",
      ],
      materials: [
        {
          type: "reviewed-visual",
          title: "Why one's complement appeared",
          asset: "/assets/diagrams/course-v3-imagegen/ones-complement-origin.png",
          facts: [
            "Early binary arithmetic needed a way to represent negative integers.",
            "Inverting every bit made sign reversal direct and allowed subtraction to use addition circuitry.",
            "The representation has two zero patterns: 00000000 and 11111111 in eight bits.",
          ],
          alt: "An ImageGen history-and-purpose diagram showing why one's complement was introduced and its two-zero drawback.",
          review: "imagegen-generated-and-course-reviewed",
        },
        {
          type: "worked-example",
          title: "Represent −23 using one's complement",
          steps: [
            ["Fix the width", "Write +23 using exactly 8 bits: 00010111."],
            ["Invert every bit", "Change each 0 to 1 and each 1 to 0: 11101000."],
            ["Label the representation", "11101000 is the 8-bit one's-complement representation of −23."],
          ],
        },
      ],
      misconceptions: ["Do not change only the leftmost bit; one's complement requires every bit in the fixed-width pattern to be inverted."],
      masteryCheck: { marks: 3, prompt: "Explain how one's complement represents −18 in 8 bits and state one drawback.", answerCriteria: ["Write +18 as 00010010.", "Invert every bit to obtain 11101101.", "State that one's complement has both positive and negative zero."] },
    }),
    unit({
      unitKey: "S1.02-TWOS-COMPLEMENT",
      syllabusId: "S1.02",
      heading: "Two's complement",
      objectiveIds: [s102Objectives[5]],
      explanation: [
        "Two's complement represents a negative fixed-width binary integer by inverting every bit of the positive value and then adding 1 to the inverted pattern.",
        "It is used because it provides one representation of zero and lets the same fixed-width binary addition circuitry handle positive and negative integers. In 8 bits, its representable range is −128 to +127.",
      ],
      materials: [
        {
          type: "reviewed-visual",
          title: "Why two's complement replaced one's complement",
          asset: "/assets/diagrams/course-v3-imagegen/twos-complement-origin.png",
          facts: [
            "One's complement has both positive and negative zero patterns.",
            "Two's complement changes the rule to invert every bit and then add 1.",
            "The result has one zero and lets the same fixed-width adder handle positive and negative operands.",
          ],
          alt: "An ImageGen history-and-purpose diagram showing why two's complement replaced one's complement and giving correct eight-bit examples.",
          review: "imagegen-generated-and-course-reviewed",
        },
        {
          type: "worked-example",
          title: "Represent −23 using two's complement",
          steps: [
            ["Fix the width", "Write +23 using exactly 8 bits: 00010111."],
            ["Invert every bit", "Invert the pattern to obtain 11101000."],
            ["Add one", "Add 1 to the inverted pattern to obtain 11101001."],
            ["Label the representation", "11101001 is the 8-bit two's-complement representation of −23."],
          ],
        },
      ],
      misconceptions: ["Stopping after inversion produces the one's-complement pattern; two's complement requires the additional +1 step."],
      masteryCheck: { marks: 3, prompt: "Explain how two's complement represents −18 in 8 bits and why it is widely used.", answerCriteria: ["Write +18 as 00010010 and invert to 11101101.", "Add 1 to obtain 11101110.", "Link its use to one zero representation or shared addition circuitry."] },
    }),
    unit({
      unitKey: "S1.03-CONVERSIONS",
      syllabusId: "S1.03",
      heading: "Conversion between number systems and representations",
      objectiveIds: s103Objectives,
      explanation: [
        "A conversion preserves the integer value while changing the number base or representation. Identify the source, destination and any required bit width before choosing a method.",
        "Use powers of 2 for binary and denary, four-bit nibbles for binary and hexadecimal, powers of 16 for hexadecimal and denary, separate four-bit digit groups for BCD, and fixed-width inversion rules for one's complement and two's complement.",
        "When there is no convenient direct route, convert through denary or binary as an intermediate representation, then reverse the route to check that the value has not changed.",
      ],
      materials: [
        {
          type: "reviewed-visual",
          title: "Binary, denary and hexadecimal conversions",
          asset: "/assets/diagrams/course-v3-imagegen/binary-denary-hex-conversion.png",
          facts: [
            "Binary and denary conversions use powers of 2.",
            "Binary and hexadecimal conversions map four-bit groups to hexadecimal digits.",
            "Denary and hexadecimal conversions use powers of 16 while preserving the integer value.",
          ],
          alt: "An ImageGen triangular diagram showing bidirectional conversions between binary, denary and hexadecimal using the equivalent values 00101101, 45 and 2D.",
          review: "imagegen-generated-and-course-reviewed",
        },
        { type: "flow", title: "Convert without changing the value", steps: [["Name source, destination and width", "Separate number bases, BCD and signed fixed-width representations."], ["Apply the matching rule", "Use place values, nibbles, digit groups or the stated complement rule."], ["Preserve every required bit", "Keep leading zeros and the fixed width when the representation requires them."], ["Reverse-check the result", "Decode using the destination rule and confirm the original integer value."]] },
        {
          type: "worked-example",
          title: "Convert 45 through the required representations",
          steps: [
            ["Denary to binary", "45 = 32 + 8 + 4 + 1, so 45 is 00101101 in 8-bit binary."],
            ["Binary to hexadecimal", "Group 00101101 as 0010 1101; the nibbles map to hexadecimal 2D."],
            ["Hexadecimal to denary", "For 2D, calculate 2 × 16 + 13 = 45."],
            ["Denary to BCD", "Encode the digits 4 and 5 separately, giving 0100 0101."],
            ["Positive to one's complement", "Invert 00101101 to obtain 11010010 as the 8-bit one's-complement representation of −45."],
            ["Positive to two's complement", "Add 1 to the inverted pattern to obtain 11010011 as the 8-bit two's-complement representation of −45."],
          ],
        },
      ],
      misconceptions: ["Do not decode BCD as pure binary or use a signed representation without its fixed width; the destination representation determines the rule."],
      masteryCheck: { marks: 6, prompt: "Convert denary 29 to 8-bit binary, hexadecimal and BCD, then give the 8-bit one's-complement and two's-complement representations of −29.", answerCriteria: ["Give 00011101 in 8-bit binary.", "Give hexadecimal 1D.", "Give BCD 0010 1001.", "Invert 00011101 to obtain one's complement 11100010.", "Add 1 to obtain two's complement 11100011.", "Use the stated 8-bit width throughout."] },
    }),
  ];
}

function makeLesson003Units() {
  const s104Objectives = objectiveRows("S1.04").map(([id]) => id);
  const s105Objectives = objectiveRows("S1.05").map(([id]) => id);
  const unit = ({ unitKey, syllabusId, heading, objectiveIds, explanation, materials, misconceptions, masteryCheck }) => ({
    unitKey,
    syllabusId,
    heading,
    objectiveIds,
    explanation,
    materials: materials.map((material) => ({ ...material, objectiveIds })),
    misconceptions,
    teacherNote: `Teach ${heading} at this point in the lesson sequence.`,
    masteryCheck,
  });

  return [
    unit({
      unitKey: "S1.04-UNSIGNED",
      syllabusId: "S1.04",
      heading: "Unsigned binary addition and subtraction",
      objectiveIds: [s104Objectives[0]],
      explanation: [
        "An unsigned binary integer uses every bit as a non-negative place value. An unsigned 8-bit value represents an integer from 0 to 255.",
        "For addition, align equal-width operands and work from the rightmost bit to the left. Use 0 + 0 = 0, 0 + 1 = 1, 1 + 1 = 10 and 1 + 1 + 1 = 11, carrying 1 into the next column when required.",
        "For unsigned subtraction, align equal-width operands and borrow from the next column when the upper bit is smaller than the lower bit. A negative mathematical result cannot be represented as an unsigned value.",
      ],
      materials: [
        {
          type: "reviewed-visual",
          title: "Unsigned binary addition",
          asset: "/assets/diagrams/course-v3-imagegen/unsigned-binary-addition.png",
          facts: [
            "Align equal-width operands and add from right to left.",
            "A column total of 2 writes 0 and carries 1; a total of 3 writes 1 and carries 1.",
            "00101101 plus 00010111 equals 01000100, which is 45 plus 23 equals 68.",
          ],
          alt: "An ImageGen diagram of the exact eight-bit unsigned addition 00101101 plus 00010111 equals 01000100 with the four binary column rules.",
          review: "imagegen-generated-and-course-reviewed",
        },
        { type: "flow", title: "Unsigned binary addition", steps: [["Align equal-width operands", "Place bits with the same value in the same column."], ["Start at the right", "Add both bits and any carry from the previous column."], ["Write and carry", "Write the result bit and carry 1 left for totals 2 or 3."], ["Complete every column", "Keep the result at the stated width for later checking."]] },
        {
          type: "worked-example",
          title: "Add two unsigned 8-bit integers",
          steps: [
            ["Write equal-width operands", "45 is 00101101 and 23 is 00010111."],
            ["Add from right to left", "Apply the four column rules and carry 1 into the next column whenever the column total is 2 or 3."],
            ["Record the result", "00101101 + 00010111 = 01000100."],
            ["Interpret the result", "01000100 represents 68 as an unsigned 8-bit integer."],
          ],
        },
      ],
      misconceptions: ["In unsigned arithmetic the most-significant bit is an ordinary positive place value; a leading 1 does not make the value negative."],
      masteryCheck: { marks: 3, prompt: "Perform the unsigned 8-bit addition 00110110 + 00001101 and explain the carrying.", answerCriteria: ["Align the operands and add from the rightmost column.", "Show each carry into the next column.", "Give the result 01000011."] },
    }),
    unit({
      unitKey: "S1.05-OVERFLOW",
      syllabusId: "S1.05",
      heading: "Overflow in fixed-width arithmetic",
      objectiveIds: s105Objectives,
      explanation: [
        "Overflow occurs when the true mathematical result is outside the range that the stated bit width and representation can store. The stored bit pattern then cannot represent the true result.",
        "For unsigned 8-bit addition, the permitted range is 0 to 255. A carry beyond the eighth bit shows that the true result needs nine bits; only the rightmost eight bits fit in the register.",
        "A leftmost stored bit of 1 is not by itself overflow. For example, 01111111 + 00000001 = 10000000 represents 128 and still fits in the unsigned 8-bit range.",
      ],
      materials: [
        {
          type: "reviewed-visual",
          title: "Unsigned 8-bit overflow",
          asset: "/assets/diagrams/stage10-infographics/stage10-lesson-004-overflow.jpg",
          facts: [
            "Unsigned 8-bit storage represents values from 0 to 255.",
            "Adding 240 and 16 produces the nine-bit true sum 1 00000000.",
            "The stored rightmost eight bits are 00000000, which is not the true sum 256.",
          ],
          alt: "An unsigned 8-bit overflow diagram showing 240 plus 16 producing a ninth carry bit, while only 00000000 remains in the 8-bit result.",
          review: "reviewed",
        },
        { type: "flow", title: "Check for overflow", steps: [["State the range", "Use the bit width and representation to establish the limits."], ["Calculate the true result", "Retain any bit produced beyond the fixed storage width."], ["Compare with the limits", "Overflow occurs only when the true result lies outside the range."], ["Report the stored pattern", "Distinguish the retained bits from the true mathematical result."]] },
        {
          type: "worked-example",
          title: "Identify unsigned 8-bit overflow",
          steps: [
            ["State the range", "Eight unsigned bits can store values from 0 to 255."],
            ["Add the operands", "11110000 + 00010000 = 1 00000000, which is the true value 256."],
            ["Compare with the range", "256 is greater than 255, so overflow has occurred."],
            ["State the stored result", "Only 00000000 fits in the 8-bit register; it is not the true mathematical sum."],
          ],
        },
      ],
      misconceptions: ["Overflow is not any internal carry and is not caused merely by a leftmost stored 1; it means the true result is outside the representable range."],
      masteryCheck: { marks: 3, prompt: "Explain whether unsigned 8-bit addition overflows for 11111100 + 00000101.", answerCriteria: ["State the unsigned 8-bit range 0 to 255.", "Give the true sum 257 and the nine-bit result 1 00000001.", "Conclude that overflow occurs because 257 is outside the range."] },
    }),
    unit({
      unitKey: "S1.04-SIGNED",
      syllabusId: "S1.04",
      heading: "Signed binary addition and subtraction",
      objectiveIds: [s104Objectives[1]],
      explanation: [
        "Signed arithmetic extends the same fixed-width column addition method to positive and negative integers. Encode every negative operand in the stated signed representation before calculating.",
        "With two's-complement operands, add every column including the most-significant bit and discard any carry beyond the fixed width. Interpret the retained result as a two's-complement value.",
        "To calculate A − B, form the two's complement of B and add it to A at the same width. For signed 8-bit arithmetic, the final mathematical result must remain in the range −128 to +127.",
      ],
      materials: [
        { type: "table", title: "Signed two's-complement addition", headers: ["Operand or result", "8-bit pattern", "Meaning"], rows: [["+5", "00000101", "positive operand"], ["−3", "11111101", "two's-complement operand"], ["retained sum", "00000010", "+2"]] },
        { type: "flow", title: "Calculate with signed integers", steps: [["Fix the width", "Use the same number of bits for every operand and result."], ["Encode negative operands", "Apply the stated signed representation before addition."], ["Add every column", "Use ordinary binary addition and discard a carry beyond the width."], ["Interpret and range-check", "Decode the retained signed result and compare it with the signed limits."]] },
        {
          type: "worked-example",
          title: "Calculate +5 + (−3) in 8-bit two's complement",
          steps: [
            ["Encode the operands", "+5 is 00000101 and −3 is 11111101."],
            ["Add at fixed width", "00000101 + 11111101 = 1 00000010."],
            ["Retain eight bits", "Discard the carry beyond the 8-bit width, leaving 00000010."],
            ["Interpret the result", "00000010 is positive 2, so +5 + (−3) = +2."],
          ],
        },
      ],
      misconceptions: ["For signed two's-complement addition, a carry beyond the most-significant bit is discarded; signed overflow is decided from the signed range, not from that carry alone."],
      masteryCheck: { marks: 4, prompt: "Perform +9 + (−4) using 8-bit two's-complement addition.", answerCriteria: ["Encode +9 as 00001001.", "Encode −4 as 11111100.", "Add to obtain 1 00000101 and discard the carry beyond 8 bits.", "Interpret 00000101 as +5."] },
    }),
  ];
}

function makeLesson004Units() {
  const objectives = objectiveRows("S1.07").map(([id]) => id);
  const unit = ({ unitKey, heading, objectiveIds, explanation, materials, misconceptions, masteryCheck }) => ({
    unitKey,
    syllabusId: "S1.07",
    heading,
    objectiveIds,
    explanation,
    materials: materials.map((material) => ({ ...material, objectiveIds })),
    misconceptions,
    teacherNote: `Teach ${heading} as a separate character-encoding concept.`,
    masteryCheck,
  });

  return [
    unit({
      unitKey: "S1.07-CHARACTER-SETS",
      heading: "Character sets and internal binary representation",
      objectiveIds: [objectives[0]],
      explanation: [
        "A character set defines a collection of characters and assigns a numeric character code to each character. The code identifies the character independently of how a font draws it on screen.",
        "The numeric code is stored internally as a binary bit pattern. Software must use the agreed character set or encoding to interpret the stored bits as the intended character.",
      ],
      materials: [
        { type: "flow", title: "From character to stored bits", preserveText: true, steps: [["Character", "The user enters or the program selects a symbol."], ["Numeric code", "The character set assigns that symbol a number."], ["Binary storage", "The number is encoded as a bit pattern in memory."], ["Interpretation", "Software decodes the bits using the agreed encoding."]] },
        {
          type: "worked-example",
          title: "Store a character when its code is provided",
          steps: [
            ["Read the supplied code", "The question states that the character A has numeric code 65."],
            ["Convert the code", "Convert 65 to the 8-bit pattern 01000001."],
            ["Store the bits", "The computer stores 01000001 rather than a drawn picture of A."],
            ["Interpret the bits", "Software uses the agreed encoding to map that code back to the character A."],
          ],
        },
      ],
      misconceptions: ["A computer stores a character code, not the visual shape drawn by a particular font."],
      masteryCheck: { marks: 3, prompt: "Explain how a character entered at a keyboard is represented internally as binary data.", answerCriteria: ["State that a character set assigns the character a numeric code.", "State that the numeric code is stored as a binary bit pattern.", "Explain that software must interpret the bits using the agreed encoding."] },
    }),
    unit({
      unitKey: "S1.07-ASCII",
      heading: "ASCII",
      objectiveIds: [objectives[1]],
      explanation: [
        "Standard ASCII is a 7-bit character set, so it provides 2⁷ = 128 possible character codes numbered 0 to 127.",
        "Its repertoire includes common English letters, digits, punctuation and control characters. The limited number of codes means it cannot represent the full range of writing systems used worldwide.",
      ],
      materials: [
        {
          type: "reviewed-visual",
          title: "Standard ASCII capacity",
          asset: "/assets/diagrams/course-v3-imagegen/ascii-capacity.png",
          facts: [
            "Standard ASCII uses seven bits and therefore provides 128 codes numbered 0 to 127.",
            "It includes common English letters, digits, punctuation and control characters.",
            "The supplied example A equals code 65, stored as the seven-bit pattern 1000001.",
          ],
          alt: "An ImageGen capacity diagram showing seven-bit standard ASCII, 128 codes and the code range 0 to 127.",
          review: "imagegen-generated-and-course-reviewed",
        },
        {
          type: "worked-example",
          title: "Check whether a supplied code fits standard ASCII",
          steps: [
            ["Use the width", "A 7-bit code can represent values from 0 to 127."],
            ["Inspect the supplied value", "The supplied code value is 65, which lies inside that range."],
            ["Write seven bits", "65 is written as the 7-bit pattern 1000001."],
            ["State the conclusion", "The supplied character code can be represented in standard ASCII."],
          ],
        },
      ],
      misconceptions: ["ASCII does not provide 256 codes; standard ASCII uses 7 bits and therefore provides 128 codes."],
      masteryCheck: { marks: 2, prompt: "Explain why standard ASCII provides 128 possible codes and state one limitation.", answerCriteria: ["State that 7 bits provide 2⁷ = 128 patterns.", "State that its limited repertoire cannot represent the full range of world writing systems."] },
    }),
    unit({
      unitKey: "S1.07-EXTENDED-ASCII",
      heading: "Extended ASCII",
      objectiveIds: [objectives[2]],
      explanation: [
        "Extended ASCII uses 8-bit character codes, so it provides 2⁸ = 256 possible code values numbered 0 to 255.",
        "The additional codes can represent extra accented letters and symbols, but 256 values are still insufficient for all world writing systems. Different extended-ASCII code pages may assign different characters to some of the added code values.",
      ],
      materials: [
        {
          type: "reviewed-visual",
          title: "Extended ASCII capacity",
          asset: "/assets/diagrams/course-v3-imagegen/extended-ascii-capacity.png",
          facts: [
            "Extended ASCII uses eight bits and therefore provides 256 code values numbered 0 to 255.",
            "Values 128 to 255 can add accented letters and symbols.",
            "The upper-range characters depend on the selected code page, so extended ASCII is not universal.",
          ],
          alt: "An ImageGen capacity diagram showing eight-bit extended ASCII, 256 codes and code-page-dependent upper values.",
          review: "imagegen-generated-and-course-reviewed",
        },
        {
          type: "worked-example",
          title: "Use a supplied extended-ASCII code",
          steps: [
            ["Read the supplied code page", "The question supplies an 8-bit code page in which a character has code value 233."],
            ["Check the range", "233 lies within the 8-bit range 0 to 255."],
            ["Convert the value", "233 is stored as the 8-bit pattern 11101001."],
            ["Keep the interpretation", "The selected code page determines which character that upper-range value represents."],
          ],
        },
      ],
      misconceptions: ["Extended ASCII is not a single universal worldwide repertoire; an 8-bit code still provides only 256 values."],
      masteryCheck: { marks: 2, prompt: "Explain one difference between standard ASCII and extended ASCII.", answerCriteria: ["State that extended ASCII uses 8 bits rather than 7 bits.", "State that it provides 256 possible codes rather than 128."] },
    }),
    unit({
      unitKey: "S1.07-UNICODE",
      heading: "Unicode",
      objectiveIds: [objectives[3]],
      explanation: [
        "Unicode assigns code points to characters from a very wide range of languages, symbol systems and modern character collections. This makes it suitable for multilingual data and communication.",
        "Unicode code points can be stored using encodings such as UTF-8 or UTF-16. It is inaccurate to claim that every Unicode character is always stored using exactly the same number of bits.",
      ],
      materials: [
        {
          type: "reviewed-visual",
          title: "Unicode supports global character repertoires",
          asset: "/assets/diagrams/stage10-infographics/stage10-lesson-007-unicode.jpg",
          facts: [
            "Unicode assigns code points for characters from many languages and symbol systems.",
            "Its repertoire is much larger than the ASCII repertoires.",
            "The number of stored bytes depends on the Unicode encoding and the character.",
          ],
          alt: "A Unicode diagram showing characters from multiple writing systems and symbols, with a note that storage size depends on the encoding used.",
          review: "reviewed",
        },
        {
          type: "worked-example",
          title: "Choose a character set for a multilingual website",
          steps: [
            ["Identify the requirement", "The website must store English, Chinese and Arabic text as well as symbols."],
            ["Compare the repertoires", "The ASCII repertoires do not provide codes for all of those characters."],
            ["Choose Unicode", "Unicode has code points for the required writing systems and symbols."],
            ["State the storage detail", "A Unicode encoding such as UTF-8 converts those code points into stored bytes."],
          ],
        },
      ],
      misconceptions: ["Unicode is not restricted to exactly 16 bits per character; the stored length depends on the encoding and character."],
      masteryCheck: { marks: 3, prompt: "Explain why Unicode is preferred to ASCII for a multilingual messaging system.", answerCriteria: ["State that Unicode supports a much wider character repertoire.", "Link that repertoire to the required languages and symbols.", "State that a Unicode encoding converts code points into stored binary data."] },
    }),
  ];
}

function makeLesson005Units() {
  const bitmapObjectives = objectiveRows("S1.08").map(([id]) => id);
  const vectorObjectives = objectiveRows("S1.09").map(([id]) => id);
  const visual = (title, asset, facts, alt) => ({
    type: "reviewed-visual",
    title,
    asset: `/assets/diagrams/course-v3-imagegen/${asset}.png`,
    facts,
    alt,
    review: "imagegen-generated-and-course-reviewed",
  });
  const unit = ({ unitKey, syllabusId, heading, objectiveIds, explanation, materials, misconceptions, masteryCheck }) => ({
    unitKey,
    syllabusId,
    heading,
    objectiveIds,
    explanation,
    materials: materials.map((material) => ({ ...material, objectiveIds })),
    misconceptions,
    teacherNote: `Teach ${heading} as one self-contained image-representation concept.`,
    masteryCheck,
  });

  return [
    unit({
      unitKey: "S1.08-BITMAP-STRUCTURE",
      syllabusId: "S1.08",
      heading: "How a bitmap image is stored",
      objectiveIds: [bitmapObjectives[0]],
      explanation: [
        "A bitmap image is represented as a rectangular grid of picture elements. The file stores an ordered colour value for every pixel, row by row or in another defined order.",
        "The file header stores metadata needed to interpret the pixel data, such as width, height, colour depth and file type. Software reads the header and then uses the ordered pixel values to reconstruct the image correctly.",
      ],
      materials: [
        visual(
          "How a bitmap image is stored",
          "bitmap-composition",
          [
            "A bitmap file contains a file header and pixel data.",
            "The header supplies width, height, colour depth and file-type metadata.",
            "The ordered colour values allow software to rebuild the rectangular image.",
          ],
          "An ImageGen diagram separating a bitmap file header from ordered pixel data and showing how software rebuilds the image.",
        ),
        {
          type: "worked-example",
          title: "Interpret a tiny bitmap file",
          steps: [
            ["Read the header", "The header states width 3 pixels, height 2 pixels and a colour depth of 1 bit per pixel."],
            ["Read the pixel data", "The six stored values are 1 0 1 0 1 0 in the file's defined row order."],
            ["Rebuild the grid", "Place three values in each row to obtain rows 1 0 1 and 0 1 0."],
          ],
        },
      ],
      misconceptions: ["The file header describes how to interpret the bitmap; it is not one of the image pixels."],
      masteryCheck: { marks: 3, prompt: "Describe how a bitmap file header and its pixel data are used to reconstruct an image.", answerCriteria: ["State that the header stores interpretation metadata such as width, height or colour depth.", "State that pixel data stores an ordered colour value for each pixel.", "Explain that software uses both parts to rebuild the rectangular image."] },
    }),
    unit({
      unitKey: "S1.08-PIXEL",
      syllabusId: "S1.08",
      heading: "Pixel",
      objectiveIds: [bitmapObjectives[0]],
      explanation: [
        "A pixel is one picture element in a bitmap. Each pixel occupies one position in the stored image grid and is assigned one colour value.",
        "A pixel is a data element rather than a fixed physical size. How large it appears depends on the display size and the relationship between the image and screen resolutions.",
      ],
      materials: [
        visual(
          "What is a pixel?",
          "pixel-definition",
          ["A pixel is one picture element in a bitmap.", "Each pixel stores one colour value.", "A pixel is a data element, not a fixed physical size."],
          "An ImageGen diagram magnifying a bitmap photograph into a grid and identifying one highlighted square as one pixel.",
        ),
      ],
      misconceptions: ["A pixel is not a fixed-size square on every screen; it is one stored picture element in the bitmap grid."],
      masteryCheck: { marks: 2, prompt: "Define a pixel and explain what value it contributes to a bitmap image.", answerCriteria: ["Define a pixel as one picture element or one position in the bitmap grid.", "State that it stores one colour value."] },
    }),
    unit({
      unitKey: "S1.08-COLOUR-DEPTH",
      syllabusId: "S1.08",
      heading: "Colour depth",
      objectiveIds: [bitmapObjectives[2], bitmapObjectives[5]],
      explanation: [
        "Colour depth is the number of bits used to store the colour of each pixel. A colour depth of n bits provides 2ⁿ possible bit patterns and therefore up to 2ⁿ possible colours.",
        "Increasing colour depth can represent colours more accurately and reduce visible banding, but it stores more bits for every pixel. At the same image resolution, a higher colour depth therefore increases the uncompressed file size.",
      ],
      materials: [
        visual(
          "Colour depth: bits per pixel",
          "colour-depth",
          ["One, two, four and eight bits per pixel provide 2, 4, 16 and 256 possible colours respectively.", "n bits per pixel provide 2 to the power n possible colours.", "Higher colour depth increases file size at the same resolution."],
          "An ImageGen diagram comparing the same pixel-art subject at one, two, four and eight bits per pixel.",
        ),
        {
          type: "worked-example",
          title: "Calculate the palette capacity",
          steps: [["Use the colour depth", "A colour depth of 6 bits assigns six bits to each pixel."], ["Count the patterns", "Six bits provide 2⁶ = 64 possible bit patterns."], ["State the result", "The bitmap can use up to 64 different colour values."]],
        },
      ],
      misconceptions: ["Colour depth changes the bits stored for each pixel; it does not change the number of pixels in the image."],
      masteryCheck: { marks: 3, prompt: "Explain how increasing colour depth affects a bitmap's colour accuracy and uncompressed file size.", answerCriteria: ["State that colour depth is bits per pixel.", "Explain that more bits provide more possible colours.", "Explain that more bits per pixel increase file size at the same resolution."] },
    }),
    unit({
      unitKey: "S1.08-IMAGE-RESOLUTION",
      syllabusId: "S1.08",
      heading: "Image resolution",
      objectiveIds: [bitmapObjectives[1], bitmapObjectives[4]],
      explanation: [
        "Image resolution is the number of pixels used to represent the stored image, normally stated as width × height. For the same subject and colour depth, a higher image resolution records more spatial detail because more pixel positions are available.",
        "More pixels also increase the uncompressed file size. Screen resolution instead describes the pixel dimensions of a display; it does not state how many pixels are stored in a particular image file.",
      ],
      materials: [
        visual(
          "Image resolution: width × height",
          "image-resolution",
          ["Image resolution is stated as stored pixel width multiplied by stored pixel height.", "More stored pixels can record more spatial detail and increase uncompressed file size.", "Screen resolution describes the display rather than the stored image."],
          "An ImageGen comparison of lower and higher bitmap image resolution with exact example pixel totals and a separate screen-resolution note.",
        ),
      ],
      misconceptions: ["Image resolution describes the stored image and screen resolution describes a display; the two terms are not interchangeable."],
      masteryCheck: { marks: 3, prompt: "Distinguish image resolution from screen resolution and explain one effect of increasing image resolution.", answerCriteria: ["Define image resolution as the stored image's width by height in pixels.", "Define screen resolution as the display's pixel dimensions.", "Link a higher image resolution to more recorded detail and a larger uncompressed file at the same colour depth."] },
    }),
    unit({
      unitKey: "S1.08-FILE-SIZE",
      syllabusId: "S1.08",
      heading: "Uncompressed bitmap file size",
      objectiveIds: [bitmapObjectives[3]],
      explanation: [
        "The uncompressed bitmap pixel-data size in bits is width × height × colour depth. Width × height gives the number of pixels, and colour depth gives the bits stored for each pixel.",
        "Divide the bit total by 8 to convert bits to bytes. This basic calculation excludes file-header overhead unless the question supplies an additional header size.",
      ],
      materials: [
        visual(
          "Uncompressed bitmap file size",
          "bitmap-file-size",
          ["Width multiplied by height multiplied by colour depth gives the pixel-data size in bits.", "An 800 by 600 image at 24 bits per pixel stores 11,520,000 pixel-data bits.", "Dividing by eight gives 1,440,000 bytes before any supplied header overhead."],
          "An ImageGen formula diagram with the exact calculation for an 800 by 600 bitmap at 24 bits per pixel.",
        ),
        {
          type: "worked-example",
          title: "Calculate a bitmap pixel-data size",
          steps: [["Count the pixels", "640 × 480 = 307,200 pixels."], ["Multiply by colour depth", "307,200 × 8 = 2,457,600 bits."], ["Convert to bytes", "2,457,600 ÷ 8 = 307,200 bytes."]],
        },
      ],
      misconceptions: ["Do not multiply by the number of colours; multiply the pixel count by the number of bits stored per pixel."],
      masteryCheck: { marks: 3, prompt: "Calculate the uncompressed pixel-data size in bytes for a 320 × 200 bitmap with a colour depth of 4 bits.", answerCriteria: ["Calculate 320 × 200 = 64,000 pixels.", "Calculate 64,000 × 4 = 256,000 bits.", "Divide by 8 to obtain 32,000 bytes."] },
    }),
    unit({
      unitKey: "S1.09-VECTOR-LIST",
      syllabusId: "S1.09",
      heading: "How a vector graphic is stored",
      objectiveIds: [vectorObjectives[0]],
      explanation: [
        "A vector graphic is encoded as a drawing list. Each entry defines a drawing object and properties such as its type, coordinates, dimensions, line colour, fill colour and line thickness.",
        "When the graphic is displayed, software reads the list in order and redraws the objects from their stored properties. The file does not store a fixed colour value for every position in a pixel grid.",
      ],
      materials: [
        visual(
          "How a vector graphic is stored",
          "vector-drawing-list",
          ["A vector drawing list stores objects such as rectangles, circles and lines.", "Each object stores properties including coordinates, dimensions and colours.", "Software reads the list and redraws the complete image."],
          "An ImageGen diagram showing a vector drawing list of objects and properties being rendered into a completed graphic.",
        ),
        {
          type: "worked-example",
          title: "Read a vector drawing list",
          steps: [["Read the first object", "Draw a blue rectangle at coordinates (10, 10) with width 40 and height 20."], ["Read the next object", "Draw a black line from (10, 30) to (50, 30) with thickness 2."], ["Render in order", "Software applies the stored object properties to construct the complete graphic."]],
        },
      ],
      misconceptions: ["A vector file stores drawing objects and their properties, not the colour of every pixel in a fixed grid."],
      masteryCheck: { marks: 3, prompt: "Describe how a vector drawing list represents a graphic.", answerCriteria: ["State that the file stores drawing objects.", "Give relevant stored properties such as coordinates, dimensions, colours or line thickness.", "Explain that software reads the list and redraws the objects."] },
    }),
    unit({
      unitKey: "S1.09-BITMAP-VECTOR-SCALING",
      syllabusId: "S1.09",
      heading: "Bitmap and vector enlargement",
      objectiveIds: [vectorObjectives[1], vectorObjectives[2]],
      explanation: [
        "Enlarging a bitmap spreads a fixed grid of stored pixels over a larger area. Individual square pixels can become visible and curved or diagonal edges may look jagged or pixelated.",
        "A vector graphic is redrawn from its objects and properties at the new size, so its curves and edges remain smooth. Choose vector for logos and diagrams that must scale cleanly; choose bitmap for detailed continuous-tone photographs where each pixel records colour variation.",
      ],
      materials: [
        visual(
          "Enlarging bitmap and vector graphics",
          "bitmap-vector-enlargement",
          ["A bitmap enlargement reveals the stored pixel grid and may become pixelated.", "A vector enlargement is redrawn from objects and properties and remains smooth.", "The representation should be chosen from the image content and scaling requirement."],
          "An ImageGen side-by-side comparison showing a bitmap icon becoming pixelated and the same vector icon remaining smooth when enlarged.",
        ),
      ],
      misconceptions: ["Vector scaling stays smooth because objects are redrawn; it does not create missing photographic detail or make vector suitable for every image."],
      masteryCheck: { marks: 3, prompt: "Justify the use of vector graphics rather than a bitmap for a logo displayed at many sizes.", answerCriteria: ["State that vector graphics store objects and properties.", "Explain that the objects are redrawn at the new size without enlarging a fixed pixel grid.", "Link this to smooth edges and avoidance of pixelation in the logo."] },
    }),
  ];
}

function makeLesson006Units() {
  const soundObjectives = objectiveRows("S1.10").map(([id]) => id);
  const compressionObjectives = objectiveRows("S1.11").map(([id]) => id);
  const visual = (title, asset, facts, alt) => ({
    type: "reviewed-visual",
    title,
    asset: `/assets/diagrams/course-v3-imagegen/${asset}.png`,
    facts,
    alt,
    review: "imagegen-generated-and-course-reviewed",
  });
  const unit = ({ unitKey, syllabusId, heading, objectiveIds, explanation, materials, misconceptions, masteryCheck }) => ({
    unitKey,
    syllabusId,
    heading,
    objectiveIds,
    explanation,
    materials: materials.map((material) => ({ ...material, objectiveIds })),
    misconceptions,
    teacherNote: `Teach ${heading} as one self-contained sound or compression concept.`,
    masteryCheck,
  });

  return [
    unit({
      unitKey: "S1.10-ANALOGUE-SAMPLING",
      syllabusId: "S1.10",
      heading: "Analogue sound and the sampling process",
      objectiveIds: [soundObjectives[0], soundObjectives[1]],
      explanation: [
        "Sound in air is an analogue wave whose amplitude changes continuously. A computer creates a digital representation by measuring the wave amplitude at regular time intervals.",
        "Each measurement is quantised to the nearest available amplitude level. The selected level is then encoded as a binary sample value, and the ordered sample values form the stored digital sound.",
      ],
      materials: [
        visual(
          "From continuous sound to digital samples",
          "analogue-sound-sampling",
          ["Analogue sound has continuously changing amplitude.", "Sampling measures amplitude at regular time intervals.", "Each measurement is quantised to an available level and the selected level is stored as binary."],
          "An ImageGen four-stage diagram showing a continuous analogue sound wave being sampled, quantised and encoded as binary sample values.",
        ),
        {
          type: "worked-example",
          title: "Trace one sample into storage",
          steps: [["Measure", "At the next regular sampling instant, the converter measures the current analogue amplitude."], ["Quantise", "The measured amplitude is assigned to the nearest level available at the stated sampling resolution."], ["Encode", "The selected level is stored as its binary sample value in time order."]],
        },
      ],
      misconceptions: ["Sampling records discrete measurements of a continuous wave; it does not store the complete continuous waveform directly."],
      masteryCheck: { marks: 3, prompt: "Describe how sampling, quantisation and binary encoding represent an analogue sound wave.", answerCriteria: ["State that amplitude is measured at regular time intervals.", "State that each measurement is assigned to an available amplitude level.", "State that the selected levels are stored as ordered binary sample values."] },
    }),
    unit({
      unitKey: "S1.10-SAMPLING-RATE",
      syllabusId: "S1.10",
      heading: "Sampling rate",
      objectiveIds: [soundObjectives[2]],
      explanation: [
        "Sampling rate is the number of samples taken each second, measured in hertz (Hz). A higher sampling rate records the wave at more points in the same time interval.",
        "More frequent measurements can represent changes over time more accurately. At the same sampling resolution, number of channels and duration, a higher sampling rate stores more sample values and therefore increases file size.",
      ],
      materials: [
        visual(
          "Sampling rate: samples per second",
          "sampling-rate",
          ["Sampling rate is the number of samples taken each second and is measured in hertz.", "A higher rate takes more measurements in the same time.", "At the same resolution and duration, a higher sampling rate increases file size."],
          "An ImageGen comparison showing sparse samples at a lower sampling rate and denser samples at a higher sampling rate over the same one-second waveform.",
        ),
      ],
      misconceptions: ["Sampling rate is samples per second; it is not the number of bits used for each sample."],
      masteryCheck: { marks: 3, prompt: "Explain how increasing the sampling rate affects a digital sound recording.", answerCriteria: ["State that more samples are taken each second.", "Link more time measurements to a closer representation of wave changes over time.", "State that more sample values increase file size when other factors stay the same."] },
    }),
    unit({
      unitKey: "S1.10-SAMPLING-RESOLUTION",
      syllabusId: "S1.10",
      heading: "Sampling resolution",
      objectiveIds: [soundObjectives[3]],
      explanation: [
        "Sampling resolution is the number of bits used to store each sample. A resolution of n bits provides 2ⁿ available amplitude levels.",
        "More levels reduce the difference between a measured amplitude and the selected quantised level, improving amplitude accuracy. At the same sampling rate, channel count and duration, more bits per sample increase file size.",
      ],
      materials: [
        visual(
          "Sampling resolution: bits per sample",
          "sampling-resolution",
          ["Three bits per sample provide eight available amplitude levels, while eight bits provide 256.", "More levels can reduce quantisation error.", "At the same sampling rate and duration, more bits per sample increase file size."],
          "An ImageGen comparison showing a measured amplitude quantised with eight coarse levels and with a dense set of 256 levels.",
        ),
        {
          type: "worked-example",
          title: "Compare two sampling resolutions",
          steps: [["Count 8-bit levels", "2⁸ = 256 different amplitude levels are available."], ["Count 16-bit levels", "2¹⁶ = 65,536 different amplitude levels are available."], ["Compare", "Sixteen-bit samples can represent amplitude more accurately but store twice as many bits for each sample."]],
        },
      ],
      misconceptions: ["Sampling resolution is bits per sample; it is not the number of samples taken each second."],
      masteryCheck: { marks: 3, prompt: "Explain how increasing sampling resolution affects sound accuracy and file size.", answerCriteria: ["State that more bits are used for each sample.", "Explain that more amplitude levels can reduce quantisation error.", "State that more bits per sample increase file size when other factors stay the same."] },
    }),
    unit({
      unitKey: "S1.11-WHY-COMPRESS",
      syllabusId: "S1.11",
      heading: "Why files are compressed",
      objectiveIds: [compressionObjectives[0]],
      explanation: [
        "Compression reduces the number of bits needed to represent a file. Smaller files require less storage space and fewer bits must be sent across a network.",
        "At the same data-transfer rate, sending fewer bits can reduce transfer or download time. For the same transfer time, the smaller amount of data requires less bandwidth capacity.",
      ],
      materials: [
        visual(
          "Why files are compressed",
          "compression-need",
          ["Compression reduces the number of bits needed to represent a file.", "A compressed file uses less storage space and sends fewer bits.", "Fewer bits can reduce transfer time at the same data-transfer rate."],
          "An ImageGen cause-and-effect diagram showing a large file compressed into a smaller file with storage and transmission benefits.",
        ),
      ],
      misconceptions: ["Compression means reducing the number of stored bits; it does not automatically mean that information or quality has been lost."],
      masteryCheck: { marks: 3, prompt: "Explain why an organisation compresses files before storage or transmission.", answerCriteria: ["State that compressed files use less storage space.", "State that fewer bits must be transmitted.", "Link fewer transmitted bits to shorter transfer time at the same rate or lower bandwidth use for the same time."] },
    }),
    unit({
      unitKey: "S1.11-LOSSY-FILES",
      syllabusId: "S1.11",
      heading: "Lossy compression and different file types",
      objectiveIds: [compressionObjectives[1], compressionObjectives[4], compressionObjectives[5], compressionObjectives[6], compressionObjectives[7]],
      explanation: [
        "Lossy compression permanently removes selected information, so the original file cannot be reconstructed exactly. It is suitable only when the intended use can tolerate a controlled reduction in fidelity.",
        "Lossy text is unsuitable when every character must remain exact. A bitmap can lose fine detail or colour precision; a vector drawing can lose or simplify objects and properties; sound can lose less perceptible detail. Stronger loss may reduce size further but can produce visible or audible artefacts.",
      ],
      materials: [
        visual(
          "Lossy compression: effect on file types",
          "lossy-file-effects",
          ["Lossy compression permanently removes selected information.", "The effect differs for text, bitmap images, vector graphics and sound.", "The original cannot be reconstructed exactly and quality can fall."],
          "An ImageGen four-panel diagram showing the effects of lossy compression on text, bitmap images, vector graphics and sound.",
        ),
      ],
      misconceptions: ["Lossy decompression does not restore the removed information; it only reconstructs an approximation from the retained data."],
      masteryCheck: { marks: 4, prompt: "Explain why lossy compression may be suitable for a streamed sound file but unsuitable for an ordinary text file.", answerCriteria: ["State that lossy compression permanently removes information.", "Link sound use to tolerating removal of less perceptible detail.", "State that audio quality can fall.", "Explain that changing or removing text characters prevents exact recovery of the message."] },
    }),
    unit({
      unitKey: "S1.11-LOSSLESS-FILES",
      syllabusId: "S1.11",
      heading: "Lossless compression and different file types",
      objectiveIds: [compressionObjectives[1], compressionObjectives[3], compressionObjectives[4], compressionObjectives[5], compressionObjectives[6]],
      explanation: [
        "Lossless compression stores a reversible representation from which every original bit can be reconstructed. No source information is discarded.",
        "It is required for ordinary text when every character matters and for any bitmap, vector graphic or sound master that must be reproduced exactly. Repeated patterns, pixels, object properties or sample values can be encoded more compactly, although the reduction depends on the data.",
      ],
      materials: [
        visual(
          "Lossless compression: effect on file types",
          "lossless-file-effects",
          ["Lossless decompression reconstructs the original data exactly.", "Text characters, bitmap pixels, vector objects and sound samples are all restored.", "Lossless methods exploit patterns without discarding information."],
          "An ImageGen four-panel diagram showing exact lossless reconstruction for text, bitmap images, vector graphics and sound.",
        ),
      ],
      misconceptions: ["Lossless means exact reconstruction, not that the compressed representation contains fewer bytes for every possible input."],
      masteryCheck: { marks: 3, prompt: "Explain why lossless compression is required for a program source file and may be chosen for a bitmap master.", answerCriteria: ["State that every original bit or character is reconstructed exactly.", "Explain that a changed source character could change program meaning.", "Explain that an exact bitmap master preserves every original pixel value for future editing."] },
    }),
    unit({
      unitKey: "S1.11-COMPARISON",
      syllabusId: "S1.11",
      heading: "Lossless and lossy compression compared",
      objectiveIds: [compressionObjectives[1], compressionObjectives[7]],
      explanation: [
        "Choose lossless compression when exact reconstruction is required. Choose lossy compression only when some permanent information loss is acceptable for the intended use.",
        "Lossy compression often produces a greater size reduction because it can discard selected detail. The decision must balance required fidelity, expected size reduction, file content and whether the output is a master copy or a delivery copy.",
      ],
      materials: [
        {
          type: "table",
          title: "Lossless and lossy compression",
          preserveText: true,
          headers: ["Factor", "Lossless", "Lossy"],
          rows: [
            ["Reconstruction", "Original data reconstructed exactly", "Original cannot be reconstructed exactly"],
            ["Information", "No source information discarded", "Selected information permanently removed"],
            ["Typical reduction", "Often smaller reduction", "Often greater reduction"],
            ["Choose when", "Exact data or an editable master is required", "Reduced size matters and lower fidelity is acceptable"],
          ],
        },
      ],
      misconceptions: ["File type alone does not decide the method; the required reconstruction fidelity and intended use decide whether loss is acceptable."],
      masteryCheck: { marks: 4, prompt: "Compare lossless and lossy compression and justify which should be used for an editable master copy.", answerCriteria: ["State that lossless reconstructs the original exactly.", "State that lossy permanently removes selected information.", "State that lossy often achieves greater size reduction.", "Choose lossless for the master because its original data must remain available for later editing."] },
    }),
    unit({
      unitKey: "S1.11-RLE",
      syllabusId: "S1.11",
      heading: "Run-length encoding (RLE)",
      objectiveIds: [compressionObjectives[2]],
      explanation: [
        "Run-length encoding is a lossless method for adjacent identical data items. It replaces each run with a count followed by the repeated value or code; decoding repeats the value by its stored count to reconstruct the original exactly.",
        "RLE is effective when long runs save more bits than the count-and-value pairs require. Frequent changes create many short runs, and the added count for each run can make the encoded data larger.",
      ],
      materials: [
        visual(
          "Run-length encoding (RLE)",
          "rle",
          ["AAAABBCCCCCCCCDD contains runs of four A, two B, eight C and two D.", "The count-then-value encoding is 4A 2B 8C 2D and decodes exactly.", "Long runs can save space while short runs can add overhead."],
          "An ImageGen RLE diagram grouping the exact source sequence into adjacent runs, encoding it as 4A 2B 8C 2D and decoding it losslessly.",
        ),
        {
          type: "worked-example",
          title: "Encode, decode and judge RLE",
          steps: [["Identify adjacent runs", "AAAABBCCCCCCCCDD contains four runs: AAAA, BB, CCCCCCCC and DD."], ["Encode", "Store count then value for each run: 4A 2B 8C 2D."], ["Decode", "Expanding the pairs reproduces AAAABBCCCCCCCCDD exactly."], ["Judge", "ABC becomes 1A 1B 1C, so short runs add overhead instead of saving space."]],
        },
      ],
      misconceptions: ["RLE groups only adjacent identical values; separated occurrences of the same value belong to different runs."],
      masteryCheck: { marks: 4, prompt: "Encode AAAAABCCCCC using RLE and explain why RLE is lossless and when it is effective.", answerCriteria: ["Give the count-then-value encoding 5A 1B 5C.", "State that decoding repeats each value by its count.", "State that the exact original sequence is reconstructed.", "Explain that long runs save space but short runs can add count overhead."] },
    }),
  ];
}

const hardwareVisual = (title, asset, facts, alt) => ({
  type: "reviewed-visual",
  title,
  asset: `/assets/diagrams/course-v3-imagegen/${asset}.png`,
  facts,
  alt,
  review: "reviewed",
});

const hardwareUnit = ({ unitKey, syllabusId, heading, objectiveIds, explanation, materials, misconceptions, masteryCheck }) => ({
  unitKey,
  syllabusId,
  heading,
  objectiveIds,
  explanation,
  materials: materials.map((material) => ({ ...material, objectiveIds })),
  misconceptions,
  teacherNote: `Teach ${heading} as one bounded Cambridge syllabus idea before connecting it to another unit.`,
  masteryCheck,
});

function makeLesson013Units() {
  const s301 = objectiveRows("S3.01").map(([id]) => id);
  const s302 = objectiveRows("S3.02").map(([id]) => id);
  return [
    hardwareUnit({
      unitKey: "S3.01-COMPONENT-ROLES",
      syllabusId: "S3.01",
      heading: "Why a computer system needs input, output, primary memory and secondary storage",
      objectiveIds: s301,
      explanation: [
        "Input devices are needed to supply data and instructions. The processor follows instructions and transforms data, and output devices are needed to communicate the result or cause an action.",
        "Primary memory holds instructions and data that the processor needs during current processing. Secondary storage retains programs and data when power is removed; removable secondary storage can transfer data between systems or hold an offline copy.",
      ],
      materials: [{
        type: "reviewed-visual",
        title: "Component roles in a computer system",
        asset: "/assets/diagrams/stage10-infographics/stage10-lesson-028-components.jpg",
        facts: [
          "Input devices supply data and instructions to the computer system.",
          "The processor executes instructions and processes data.",
          "Primary memory holds instructions and data required during current processing.",
          "Output devices communicate processed information or cause an action.",
          "Secondary storage provides non-volatile long-term storage, including removable storage.",
        ],
        alt: "A labelled computer-system diagram separating input, processing, primary memory, secondary storage and output roles.",
        review: "reviewed",
      }],
      misconceptions: ["Primary memory is defined by direct processor access, not by volatility: RAM is volatile but ROM is non-volatile."],
      masteryCheck: {
        marks: 5,
        prompt: "Explain why a computer system needs input, output, primary memory and secondary storage, including one use of removable storage.",
        answerCriteria: [
          "Input supplies data and instructions.",
          "Output communicates processed information or causes an action.",
          "Primary memory holds instructions and data needed during current processing.",
          "Secondary storage retains programs and data when power is removed.",
          "Removable storage can transfer data or hold an offline copy.",
        ],
      },
    }),
    hardwareUnit({
      unitKey: "S3.02-EMBEDDED-STRUCTURE",
      syllabusId: "S3.02",
      heading: "What an embedded system is",
      objectiveIds: [s302[0]],
      explanation: [
        "An embedded system is a computer system built into a larger device to perform a dedicated function or a closely related set of functions.",
        "Its controller receives input, executes stored instructions and produces output inside the larger device. A microcontroller can combine a processor, memory and input/output interfaces in one integrated circuit for this purpose.",
      ],
      materials: [hardwareVisual(
        "Embedded system structure",
        "embedded-system-structure",
        [
          "The embedded system is part of a larger device.",
          "Inputs provide data to a controller that executes the dedicated task.",
          "Memory holds the instructions and data used by the controller.",
          "Outputs communicate a result or operate another part of the larger device.",
        ],
        "An ImageGen diagram showing input, controller, memory and output inside the boundary of a larger device, labelled as a dedicated task.",
      )],
      misconceptions: ["An embedded system is identified by being built into a larger device for a dedicated function, not merely by being small."],
      masteryCheck: {
        marks: 4,
        prompt: "Describe an embedded system and explain how its input, controller, memory and output support a dedicated function.",
        answerCriteria: [
          "It is a computer system built into a larger device.",
          "It performs a dedicated function or closely related functions.",
          "The controller processes input according to stored instructions.",
          "The output communicates a result or operates part of the device.",
        ],
      },
    }),
    hardwareUnit({
      unitKey: "S3.02-EMBEDDED-TRADEOFFS",
      syllabusId: "S3.02",
      heading: "Benefits and drawbacks of embedded systems",
      objectiveIds: [s302[1], s302[2]],
      explanation: [
        "The benefits and drawbacks follow from the same dedicated design. A valid evaluation links each point to the device and its required function rather than presenting a general list with no scenario connection.",
      ],
      materials: [{
        type: "table",
        title: "Embedded-system benefits and drawbacks",
        preserveText: true,
        headers: ["Design factor", "Potential benefit", "Potential drawback"],
        rows: [
          ["Dedicated function", "Hardware and software can be optimised for one task.", "The system has limited flexibility for unrelated new tasks."],
          ["Size and resources", "A compact design can use less power and fewer components.", "Limited processing power or memory restricts future features."],
          ["Cost and reliability", "Mass-produced dedicated hardware can reduce unit cost and unnecessary complexity.", "A failure can disable the larger device and specialist repair may be required."],
          ["Updates", "Stable fixed behaviour can make operation predictable.", "Upgrading hardware or software may be difficult after manufacture."],
        ],
      }],
      misconceptions: ["A benefit or drawback is not automatic; it must be linked to the dedicated function and constraints of the stated device."],
      masteryCheck: {
        marks: 4,
        prompt: "Explain two benefits and two drawbacks of using an embedded system in a washing machine.",
        answerCriteria: [
          "A dedicated controller can be optimised for the washing functions.",
          "A compact, mass-produced design can reduce size, power use or unit cost.",
          "Limited resources make unrelated new functions difficult to add.",
          "Failure or upgrading can require specialist work on the larger appliance.",
        ],
      },
    }),
  ];
}

function makeLesson014Units() {
  const objectives = objectiveRows("S3.03").map(([id]) => id);
  const device = (index, unitKey, heading, asset, explanation, facts, misconception, check) => hardwareUnit({
    unitKey,
    syllabusId: "S3.03",
    heading,
    objectiveIds: [objectives[index]],
    explanation,
    materials: [hardwareVisual(`${heading}: principal operation`, asset, facts, `An ImageGen diagram showing the principal operation of ${heading.toLowerCase()} in labelled order.`)],
    misconceptions: [misconception],
    masteryCheck: check,
  });
  return [
    device(0, "S3.03-LASER-PRINTER", "Laser printer", "laser-printer-operation", [
      "A photosensitive drum receives a uniform electrostatic charge. A laser scans the drum and creates a charge pattern representing the page; toner is attracted to the required parts of that pattern.",
      "The toner image transfers from the drum to paper. Heated pressure rollers fuse the toner permanently to the paper.",
    ], ["Charge the photosensitive drum.", "Use a laser to create an electrostatic image.", "Attract toner, transfer it to paper and fuse it using heat and pressure."], "An inkjet printer sprays liquid ink; a laser printer uses an electrostatic drum, toner and a fuser.", { marks: 5, prompt: "Describe the principal operation of a laser printer from charged drum to fused page.", answerCriteria: ["The drum is given an electrostatic charge.", "The laser creates a charge pattern on the drum.", "Toner adheres to the required areas.", "The toner transfers to paper.", "Heat and pressure fuse the toner to the paper."] }),
    device(1, "S3.03-3D-PRINTER", "3D printer", "3d-printer-operation", [
      "Software divides a digital three-dimensional model into thin layers. The printer follows the data for one layer at a time and deposits or solidifies material at the required positions.",
      "The print head or build platform moves between layers. Successive layers bond or solidify until they form the physical object.",
    ], ["Start with a digital three-dimensional model.", "Slice the model into layers.", "Deposit or solidify material and build successive layers."], "A 3D printer forms successive layers. Some processes form a whole layer in one exposure; forming a layer does not complete the whole object.", { marks: 4, prompt: "Describe how a 3D printer produces a physical object from a digital model.", answerCriteria: ["Software slices the digital model into layers.", "The printer follows the data for one layer at a time.", "Material is deposited or solidified at the required positions.", "Successive layers form the finished object."] }),
    device(2, "S3.03-MICROPHONE", "Microphone", "microphone-operation", [
      "Sound waves make a diaphragm vibrate. A transducer converts these movements into a varying analogue electrical signal that represents the sound wave.",
      "For a computer to store or process the sound, an analogue-to-digital converter samples and quantises the signal and encodes the sample values as binary data.",
    ], ["Sound waves vibrate a diaphragm.", "The transducer produces an analogue electrical signal.", "An ADC samples, quantises and encodes the signal as binary data."], "A microphone initially produces an analogue signal; it does not convert sound waves directly into stored binary values without conversion.", { marks: 4, prompt: "Describe how a microphone and an ADC produce binary sound data.", answerCriteria: ["Sound waves make the diaphragm vibrate.", "The transducer produces a varying analogue electrical signal.", "The ADC samples and quantises the signal.", "The sample values are encoded as binary data."] }),
    device(3, "S3.03-SPEAKERS", "Speakers", "speakers-operation", [
      "A digital-to-analogue converter changes stored binary sample values into a varying analogue signal. An amplifier supplies sufficient current to drive the speaker.",
      "The signal in the voice coil produces a changing magnetic field that interacts with a permanent magnet. The coil and attached cone move, vibrating the air to create sound waves.",
    ], ["A DAC converts binary sound data to an analogue signal.", "An amplifier drives a coil in a magnetic field.", "The coil moves the cone, and the cone produces sound waves."], "A speaker is an output device; the DAC and amplifier prepare the signal, while the moving cone produces the sound waves.", { marks: 5, prompt: "Describe how speakers convert binary sound data into sound waves.", answerCriteria: ["A DAC produces an analogue signal from the binary sample values.", "An amplifier increases the signal power.", "Current flows through a voice coil in a magnetic field.", "The coil and attached cone move.", "The cone vibrations produce sound waves."] }),
    device(4, "S3.03-MAGNETIC-HARD-DISK", "Magnetic hard disk", "magnetic-hard-disk-operation", [
      "Magnetic platters rotate while an actuator positions a read/write head above the required track. The required sector passes beneath the head as the platter turns.",
      "To write, the head changes the magnetic orientation of small areas that represent bits. To read, the head senses the stored magnetic pattern and the controller decodes it as binary data.",
    ], ["Platters rotate and an actuator positions the read/write head.", "Writing changes magnetic orientation.", "Reading senses and decodes the magnetic pattern."], "The read/write head is held just above the rotating platter; it should not normally touch the platter surface.", { marks: 5, prompt: "Describe how a magnetic hard disk writes and reads binary data.", answerCriteria: ["The magnetic platters rotate.", "The actuator positions the read/write head over the required track.", "The required sector passes beneath the head.", "Writing changes magnetic orientation to represent bits.", "Reading senses the magnetic pattern and decodes it as data."] }),
    device(5, "S3.03-FLASH", "Solid-state flash memory", "solid-state-flash-memory-operation", [
      "Flash memory stores charge in floating-gate transistor cells. The presence or amount of trapped charge changes a cell's threshold behaviour and represents stored bit values.",
      "A controller applies voltages to program or erase cells and detects their charge state when reading. Because storage is electronic, flash memory has no moving mechanical parts.",
    ], ["A controller addresses floating-gate cells.", "Programming or erasing changes stored charge.", "Reading detects the charge state; no moving parts are used."], "Flash memory stores data electronically in cells; it is not magnetic storage simply because it is non-volatile.", { marks: 4, prompt: "Describe how solid-state flash memory stores and reads binary data.", answerCriteria: ["Floating-gate cells store electrical charge.", "Stored charge changes the cell's threshold behaviour and represents data.", "The controller applies voltages to program or erase cells.", "The controller detects the charge state when reading."] }),
    device(6, "S3.03-OPTICAL-DISC", "Optical disc reader/writer", "optical-disc-reader-writer-operation", [
      "The drive spins the disc and focuses a low-power laser on a track. A detector senses differences in reflected light, and the controller converts those changes into binary data.",
      "For a recordable disc, a higher-power laser changes areas of the recording layer. The changed and unchanged areas produce distinguishable optical states when the disc is read.",
    ], ["A spinning disc carries a track read by a laser.", "Reflected-light differences are detected and decoded as binary data.", "A higher-power laser changes the recording layer when writing."], "The laser reads optical differences without touching the disc; it does not read magnetic fields.", { marks: 5, prompt: "Describe how an optical disc drive reads data and writes to a recordable disc.", answerCriteria: ["The disc spins and a laser follows the track.", "A low-power laser is used for reading.", "A detector senses differences in reflected light.", "The controller decodes the changes as binary data.", "A higher-power laser changes the recording layer when writing."] }),
    device(7, "S3.03-TOUCHSCREEN", "Touchscreen", "capacitive-touchscreen-operation", [
      "A capacitive touchscreen maintains an electric field across a transparent electrode grid. A finger touching the screen changes the local capacitance or electric field.",
      "The controller detects the change at the electrodes and calculates the touch coordinates. The display provides visual output while the touch-sensitive layer provides input.",
    ], ["A finger changes the electric field at the screen.", "An electrode grid detects the change.", "The controller calculates the touch coordinates."], "A touchscreen combines input and output: the display presents images, while the touch layer detects a position.", { marks: 4, prompt: "Describe how a capacitive touchscreen detects the position of a touch.", answerCriteria: ["The screen uses an electric field and transparent electrode grid.", "A finger changes the local capacitance or electric field.", "The electrodes detect the change.", "The controller calculates the touch coordinates."] }),
    device(8, "S3.03-VR-HEADSET", "Virtual-reality headset", "virtual-reality-headset-operation", [
      "The headset displays a separate viewpoint for each eye so the user perceives depth. Lenses place the displays in the user's field of view, and speakers or headphones can provide corresponding sound output.",
      "Motion and orientation sensors detect head movement. The computer uses the sensor data to update the rendered viewpoint, so the displayed scene appears to follow the user's movement.",
    ], ["Motion and orientation sensors detect head movement.", "The computer updates the viewpoint from the sensor data.", "A separate image is displayed for each eye, producing an immersive view."], "A VR headset is not only a display: tracking sensors provide input so the rendered viewpoint can change with head movement.", { marks: 5, prompt: "Describe how a virtual-reality headset uses input and output to respond to head movement.", answerCriteria: ["Motion and orientation sensors detect head movement.", "The sensor data is sent to the computer.", "The computer updates the rendered viewpoint.", "A separate image is displayed for each eye.", "The updated scene appears to follow the user's movement."] }),
  ];
}

function makeLesson015Units() {
  const s304 = objectiveRows("S3.04").map(([id]) => id);
  const s305 = objectiveRows("S3.05").map(([id]) => id);
  const s306 = objectiveRows("S3.06").map(([id]) => id);
  const s307 = objectiveRows("S3.07").map(([id]) => id);
  return [
    hardwareUnit({
      unitKey: "S3.04-DRIVER-BUFFER-QUEUE",
      syllabusId: "S3.04",
      heading: "Device drivers, buffers and queues: what each is and why they work together",
      objectiveIds: s304,
      explanation: [
        "A device driver is system software that translates operating-system requests into the commands and data format required by a particular device.",
        "A buffer is an area of memory that temporarily stores data while it is transferred between components or devices operating at different speeds or in different-sized bursts. A queue is an ordered list of jobs waiting to be processed.",
        "For a print job, the operating system places work in a queue, data waits temporarily in a buffer, and the printer driver sends device-specific commands and formatted data. The processor can continue other work while the printer consumes the buffered data at its own rate.",
      ],
      materials: [{
        type: "reviewed-visual",
        title: "Drivers, buffers and queues in one device transfer",
        asset: "/assets/diagrams/stage10-infographics/stage10-lesson-054-device.jpg",
        facts: ["A driver translates general operating-system requests into device-specific commands.", "A queue preserves the order of waiting jobs.", "A buffer temporarily holds data during transfer and absorbs a short-term rate mismatch."],
        alt: "A labelled device-transfer diagram showing a driver, an ordered queue, a temporary buffer and a peripheral device.",
        review: "reviewed",
      }],
      misconceptions: ["A buffer absorbs a temporary rate mismatch; it does not increase the long-term transfer rate and it is not permanent storage."],
      masteryCheck: { marks: 4, prompt: "Explain what a device driver and a buffer do, then explain why a print queue, driver and buffer are used together.", answerCriteria: ["The driver translates operating-system requests into device-specific commands.", "The buffer temporarily stores data during transfer.", "The queue keeps waiting print jobs in order.", "The printer consumes buffered data at its own rate while the processor continues other work."] },
    }),
    hardwareUnit({
      unitKey: "S3.05-RAM-ROM",
      syllabusId: "S3.05",
      heading: "Why RAM changes while ROM remains stable",
      objectiveIds: s305,
      explanation: [
        "RAM is read/write primary memory used for programs and data currently being processed. Its contents change as programs start, data is edited and intermediate results are produced; ordinary RAM is volatile, so its contents are lost when power is removed.",
        "ROM is non-volatile primary memory used for instructions that must remain available when power is removed, such as firmware or start-up instructions. During normal operation its contents are read rather than repeatedly changed, so they remain stable.",
      ],
      materials: [{
        type: "reviewed-visual",
        title: "RAM and ROM",
        asset: "/assets/diagrams/stage10-infographics/stage10-lesson-031-ram-rom.jpg",
        facts: ["RAM is volatile read/write primary memory used for active programs and data.", "ROM is non-volatile primary memory used for instructions that must persist.", "RAM and ROM roles do not depend on the SRAM/DRAM comparison."],
        alt: "A comparison of RAM as changing volatile working memory and ROM as stable non-volatile instruction memory.",
        review: "reviewed",
      }],
      misconceptions: ["RAM and ROM are both primary memory. ROM is not ordinary secondary storage for a user's files."],
      masteryCheck: { marks: 4, prompt: "Explain two differences between RAM and ROM and give one use of each.", answerCriteria: ["RAM is normally volatile whereas ROM is non-volatile.", "RAM is read/write working memory whereas ROM is normally read during operation.", "RAM stores active programs and data.", "ROM stores persistent firmware or start-up instructions."] },
    }),
    hardwareUnit({
      unitKey: "S3.06-SRAM-DRAM",
      syllabusId: "S3.06",
      heading: "SRAM and DRAM: storage method, performance and use",
      objectiveIds: s306,
      explanation: [
        "SRAM stores each bit in a flip-flop circuit and does not need refresh while power is supplied. It is fast but uses more components per bit, giving lower density and higher cost per bit, so it is used for processor cache.",
        "DRAM stores each bit as charge in a capacitor. Charge leaks, so the cells require periodic refresh; DRAM is slower but denser and cheaper per bit, so it is used for large-capacity main memory.",
      ],
      materials: [hardwareVisual("SRAM and DRAM", "sram-dram", ["SRAM uses flip-flop circuits and does not require refresh while powered.", "DRAM uses capacitor charge and requires periodic refresh.", "SRAM suits cache; DRAM suits large-capacity main memory."], "An ImageGen comparison of SRAM flip-flop cells and DRAM capacitor cells, including refresh, speed, density, cost and typical uses.")],
      misconceptions: ["SRAM is a form of volatile primary memory; the word static does not mean non-volatile solid-state secondary storage."],
      masteryCheck: { marks: 6, prompt: "Compare SRAM and DRAM and explain why SRAM is used for cache while DRAM is used for main memory.", answerCriteria: ["SRAM uses flip-flop circuits.", "DRAM stores charge in capacitors.", "SRAM does not need refresh whereas DRAM does.", "SRAM is faster but more expensive and less dense.", "Fast SRAM suits cache.", "Cheaper, denser DRAM suits large-capacity main memory."] },
    }),
    hardwareUnit({
      unitKey: "S3.07-PROM-EPROM-EEPROM",
      syllabusId: "S3.07",
      heading: "PROM, EPROM and EEPROM",
      objectiveIds: s307,
      explanation: [
        "PROM is supplied blank and can be programmed once. EPROM can be erased using ultraviolet light and then reprogrammed, normally after removal from the system.",
        "EEPROM can be erased and reprogrammed electrically, often while it remains in the system. All three are non-volatile ROM technologies, but their erase and rewrite methods differ.",
      ],
      materials: [hardwareVisual("PROM, EPROM and EEPROM", "prom-eprom-eeprom", ["PROM is programmed once.", "EPROM is erased using ultraviolet light and can then be reprogrammed.", "EEPROM is erased and reprogrammed electrically."], "An ImageGen comparison of the programming and erasing methods for PROM, EPROM and EEPROM.")],
      misconceptions: ["PROM, EPROM and EEPROM are not interchangeable names: their programming and erasing methods are different."],
      masteryCheck: { marks: 3, prompt: "Explain the difference between PROM, EPROM and EEPROM.", answerCriteria: ["PROM can be programmed once.", "EPROM is erased using ultraviolet light before reprogramming.", "EEPROM is erased and reprogrammed electrically."] },
    }),
  ];
}

function makeLesson016Units() {
  const s308 = objectiveRows("S3.08").map(([id]) => id);
  const s309 = objectiveRows("S3.09").map(([id]) => id);
  return [
    hardwareUnit({
      unitKey: "S3.08-MONITORING-CONTROL",
      syllabusId: "S3.08",
      heading: "Monitoring and control systems compared",
      objectiveIds: [s308[0], s308[1]],
      explanation: [
        "A monitoring system uses sensors to collect data for recording, display or an alert. It reports the measured condition and does not necessarily change it.",
        "A control system uses sensor data and a stored rule or target to decide an output. It sends an output signal to an actuator, which changes the physical condition.",
      ],
      materials: [hardwareVisual("Monitoring and control", "monitoring-control-comparison", ["Monitoring measures and reports a physical condition.", "Control compares a reading with a target and drives an actuator.", "Sensing alone is not control because no corrective physical action is produced."], "An ImageGen two-lane comparison of a monitoring system and a control system, showing that only the control lane includes an actuator and physical change.")],
      misconceptions: ["A system does not become a control system merely because it uses a sensor; it must use the data to cause a physical change."],
      masteryCheck: { marks: 4, prompt: "Compare a monitoring system with a control system.", answerCriteria: ["Both systems obtain data from sensors.", "Monitoring records, displays or alerts about the measured condition.", "Control compares the reading with a stored rule or target.", "Control sends an output to an actuator to change the physical condition."] },
    }),
    hardwareUnit({
      unitKey: "S3.09-NAMED-SENSORS",
      syllabusId: "S3.09",
      heading: "Named sensors and their uses",
      objectiveIds: [s309[0]],
      explanation: [
        "Select a sensor by matching the physical quantity it detects to the data required by the system. The official syllabus names temperature, pressure, infra-red and sound sensors.",
      ],
      materials: [{
        type: "list",
        title: "CIE-named sensors",
        preserveText: true,
        items: [
          ["Temperature sensor", "Measures temperature; for example, greenhouse or heating-system monitoring."],
          ["Pressure sensor", "Measures pressure or applied force; for example, tyre-pressure monitoring or a pressure mat."],
          ["Infra-red sensor", "Detects infra-red radiation; for example, a remote-control receiver or beam alarm."],
          ["Sound sensor", "Detects sound waves or sound level; for example, a noise-monitoring system."],
        ],
      }],
      misconceptions: ["A sensor supplies an input signal representing a physical property; it does not decide the response or perform the corrective action."],
      masteryCheck: { marks: 4, prompt: "State the physical quantity detected by each named sensor and give one appropriate use of each.", answerCriteria: ["A temperature sensor measures temperature, for example in a greenhouse.", "A pressure sensor measures pressure or force, for example in a tyre or pressure mat.", "An infra-red sensor detects infra-red radiation, for example in a remote-control receiver or beam alarm.", "A sound sensor detects sound waves or level, for example in noise monitoring."] },
    }),
    hardwareUnit({
      unitKey: "S3.09-SENSOR-ACTUATOR-FLOW",
      syllabusId: "S3.09",
      heading: "How sensors, a microprocessor and actuators form a control system",
      objectiveIds: [s309[1]],
      explanation: [
        "A sensor measures a physical condition and sends a signal representing the reading. If the signal is analogue, an ADC converts it into digital data before a microprocessor can process it.",
        "The microprocessor compares the reading with a stored target or rule and sends an output signal to an actuator. The actuator converts that signal into a physical action, such as operating a motor, heater, valve or alarm.",
      ],
      materials: [hardwareVisual("Sensor, microprocessor and actuator flow", "control-system-feedback", ["The sensor supplies a reading to the microprocessor or controller.", "The reading is compared with a target.", "An output signal drives an actuator, which changes the physical condition."], "An ImageGen closed-loop control diagram linking a physical condition, sensor reading, microprocessor or controller, output signal, actuator and changed condition.")],
      misconceptions: ["The actuator does not choose the action; the controller decides the output and the actuator produces the physical effect."],
      masteryCheck: { marks: 5, prompt: "Describe how a sensor, microprocessor and actuator work together in a control system.", answerCriteria: ["The sensor measures a physical condition.", "The reading is converted to digital data if necessary.", "The microprocessor compares the reading with a stored target or rule.", "The microprocessor sends an output signal to an actuator.", "The actuator produces a physical action that changes the condition."] },
    }),
    hardwareUnit({
      unitKey: "S3.08-FEEDBACK",
      syllabusId: "S3.08",
      heading: "The importance of feedback",
      objectiveIds: [s308[2]],
      explanation: [
        "Feedback is a new sensor reading obtained after an actuator has changed the physical condition. It tells the controller the actual effect of the previous output rather than assuming that the required change occurred.",
        "By repeatedly comparing new readings with the target, the controller can continue, adjust or stop the actuator. Without feedback, a disturbance or an ineffective actuator could leave the condition away from the target with no automatic correction.",
      ],
      materials: [{
        type: "flow",
        title: "Why feedback matters",
        preserveText: true,
        steps: [
          ["Measure again", "Obtain a new sensor reading after the actuator changes the condition."],
          ["Compare with target", "Use the new reading to find the remaining difference from the target."],
          ["Correct or stop", "Change the output or stop the actuator according to that difference."],
          ["Repeat", "Continue the cycle so disturbances and incomplete actions can be corrected."],
        ],
      }],
      misconceptions: ["Feedback is the new information returned to the controller; it is not simply the output signal sent to the actuator."],
      masteryCheck: { marks: 4, prompt: "Explain why feedback is important in a closed-loop temperature-control system.", answerCriteria: ["A new sensor reading reports the actual temperature after the action.", "The controller compares the new reading with the target.", "The output can be adjusted or stopped as the target is approached.", "Disturbances or incomplete changes can be detected and corrected."] },
    }),
  ];
}

const authoredPracticeQuestion = ({ id, type, prompt, objectiveIds, answerPoints, commonError }) => ({
  id,
  type,
  marks: answerPoints.length,
  prompt,
  objectiveIds,
  answerPoints,
  commonError,
});

function makeLesson013Practice() {
  const s301 = objectiveRows("S3.01").map(([id]) => id);
  const s302 = objectiveRows("S3.02").map(([id]) => id);
  return [
    authoredPracticeQuestion({ id: "V3-013-S3.01-ROLES", type: "Retrieval", prompt: "Explain why a computer system needs input, output, primary memory and secondary storage, including removable storage.", objectiveIds: s301, answerPoints: ["Input devices supply data and instructions.", "Output devices communicate processed information or cause an action.", "Primary memory holds instructions and data required during current processing.", "Secondary storage retains programs and data when power is removed.", "Removable storage can transfer data or hold an offline copy."], commonError: "Do not place embedded-system, microcontroller or control-system detail in this component-role answer." }),
    authoredPracticeQuestion({ id: "V3-013-S3.02-STRUCTURE", type: "Application", prompt: "A washing machine contains an embedded controller. Describe why it is an embedded system and how input, processing, memory and output support its dedicated function.", objectiveIds: [s302[0]], answerPoints: ["The controller is built into the larger washing machine.", "It performs a dedicated washing-control function.", "Inputs provide data such as a selected program or sensor reading.", "The controller executes stored instructions and produces outputs such as operating the motor or valve."], commonError: "Do not identify the system only by its size; link it to the larger device and dedicated function." }),
    authoredPracticeQuestion({ id: "V3-013-S3.02-TRADEOFFS", type: "Exam-style", prompt: "Explain two benefits and two drawbacks of using an embedded system in a washing machine.", objectiveIds: [s302[1], s302[2]], answerPoints: ["Dedicated hardware and software can be optimised for the washing functions.", "A compact mass-produced design can reduce power use, size or unit cost.", "Limited processing, memory or interfaces make unrelated new functions difficult to add.", "A failed or obsolete controller can require specialist repair or replacement of part of the larger appliance."], commonError: "Link every benefit and drawback to the stated appliance rather than listing unsupported adjectives." }),
  ];
}

function makeLesson014Practice() {
  const ids = objectiveRows("S3.03").map(([id]) => id);
  const commonError = "Give the internal conversion or physical mechanism in order; naming only the input and output is insufficient.";
  return [
    authoredPracticeQuestion({ id: "V3-014-S3.03-LASER", type: "Retrieval", prompt: "Describe the principal operation of a laser printer.", objectiveIds: [ids[0]], answerPoints: ["A photosensitive drum is given an electrostatic charge.", "A laser creates a charge pattern representing the page.", "Toner adheres to the required areas of the drum.", "The toner transfers to paper.", "Heated pressure rollers fuse the toner to the paper."], commonError }),
    authoredPracticeQuestion({ id: "V3-014-S3.03-3D", type: "Application", prompt: "Describe how a 3D printer produces a physical model from digital data.", objectiveIds: [ids[1]], answerPoints: ["Software slices the digital model into layers.", "The printer follows the data for one layer at a time.", "Material is deposited or solidified at the required positions.", "Successive layers bond or solidify to form the object."], commonError }),
    authoredPracticeQuestion({ id: "V3-014-S3.03-MICROPHONE", type: "Retrieval", prompt: "Describe how a microphone and an ADC produce binary sound data.", objectiveIds: [ids[2]], answerPoints: ["Sound waves vibrate the diaphragm.", "A transducer produces a varying analogue electrical signal.", "An ADC samples and quantises the signal.", "The sample values are encoded as binary data."], commonError }),
    authoredPracticeQuestion({ id: "V3-014-S3.03-SPEAKERS", type: "Application", prompt: "Describe how speakers convert binary sound data into sound waves.", objectiveIds: [ids[3]], answerPoints: ["A DAC converts binary sample values into an analogue signal.", "An amplifier supplies sufficient current to the speaker.", "The signal produces a changing magnetic field in the voice coil.", "The coil and attached cone move.", "The cone vibrates the air to produce sound waves."], commonError }),
    authoredPracticeQuestion({ id: "V3-014-S3.03-HDD", type: "Retrieval", prompt: "Describe how a magnetic hard disk writes and reads data.", objectiveIds: [ids[4]], answerPoints: ["Magnetic platters rotate.", "An actuator positions the read/write head over the required track.", "The required sector passes beneath the head.", "Writing changes magnetic orientation to represent bits.", "Reading senses the magnetic pattern and decodes it as binary data."], commonError }),
    authoredPracticeQuestion({ id: "V3-014-S3.03-FLASH", type: "Application", prompt: "Describe how solid-state flash memory stores and reads data.", objectiveIds: [ids[5]], answerPoints: ["Floating-gate transistor cells store charge.", "Stored charge changes a cell's threshold behaviour and represents data.", "The controller applies voltages to program or erase cells.", "The controller detects the charge state when reading."], commonError }),
    authoredPracticeQuestion({ id: "V3-014-S3.03-OPTICAL", type: "Retrieval", prompt: "Describe how an optical disc reader/writer reads data and writes to a recordable disc.", objectiveIds: [ids[6]], answerPoints: ["The drive spins the disc and focuses a laser on a track.", "A low-power laser is used when reading.", "A detector senses differences in reflected light and the controller decodes them as binary data.", "A higher-power laser changes areas of the recording layer when writing."], commonError }),
    authoredPracticeQuestion({ id: "V3-014-S3.03-TOUCHSCREEN", type: "Application", prompt: "Describe how a capacitive touchscreen detects the position of a touch.", objectiveIds: [ids[7]], answerPoints: ["The screen maintains an electric field across an electrode grid.", "A finger changes the local capacitance or electric field.", "The grid detects the change at its electrodes.", "The controller calculates the touch coordinates."], commonError }),
    authoredPracticeQuestion({ id: "V3-014-S3.03-VR", type: "Exam-style", prompt: "Describe how a virtual-reality headset responds when a user turns their head.", objectiveIds: [ids[8]], answerPoints: ["Motion and orientation sensors detect the head movement.", "The sensor data is sent to the computer.", "The computer updates the rendered viewpoint.", "A separate image is displayed for each eye.", "The updated scene appears to follow the movement."], commonError }),
  ];
}

function makeLesson015Practice() {
  const s304 = objectiveRows("S3.04").map(([id]) => id);
  const s305 = objectiveRows("S3.05").map(([id]) => id);
  const s306 = objectiveRows("S3.06").map(([id]) => id);
  const s307 = objectiveRows("S3.07").map(([id]) => id);
  return [
    authoredPracticeQuestion({ id: "V3-015-S3.04-BUFFER", type: "Application", prompt: "Explain what a device driver and a buffer do, then explain why a print queue, driver and buffer are used together.", objectiveIds: s304, answerPoints: ["The driver translates operating-system requests into printer-specific commands.", "The buffer temporarily stores data during transfer.", "The queue preserves the order of waiting print jobs.", "The printer consumes the buffered data at its own rate while the processor continues other work."], commonError: "Do not claim that a buffer makes the printer's long-term operating speed faster." }),
    authoredPracticeQuestion({ id: "V3-015-S3.05-RAM-ROM", type: "Retrieval", prompt: "Explain two differences between RAM and ROM and give one use of each.", objectiveIds: s305, answerPoints: ["RAM is normally volatile whereas ROM is non-volatile.", "RAM is read/write working memory whereas ROM is normally read during operation.", "RAM holds active programs and data.", "ROM holds persistent firmware or start-up instructions."], commonError: "Do not introduce SRAM and DRAM when the question asks only for RAM and ROM." }),
    authoredPracticeQuestion({ id: "V3-015-S3.06-COMPARE", type: "Exam-style", prompt: "Compare SRAM and DRAM and explain why each is used for a different primary-memory role.", objectiveIds: s306, answerPoints: ["SRAM stores bits in flip-flop circuits whereas DRAM stores charge in capacitors.", "SRAM does not require refresh whereas DRAM requires periodic refresh.", "SRAM is faster but more expensive and less dense.", "SRAM is used for cache because fast access is required.", "DRAM is used for main memory because lower cost and greater density support large capacity."], commonError: "Do not confuse SRAM with solid-state flash storage." }),
    authoredPracticeQuestion({ id: "V3-015-S3.07-ROM-TYPES", type: "Retrieval", prompt: "Explain the difference between PROM, EPROM and EEPROM.", objectiveIds: s307, answerPoints: ["PROM can be programmed once.", "EPROM is erased using ultraviolet light before it can be reprogrammed.", "EEPROM is erased and reprogrammed electrically."], commonError: "State the different erase or rewrite method for each memory type." }),
  ];
}

function makeLesson016Practice() {
  const s308 = objectiveRows("S3.08").map(([id]) => id);
  const s309 = objectiveRows("S3.09").map(([id]) => id);
  return [
    authoredPracticeQuestion({ id: "V3-016-S3.08-COMPARE", type: "Retrieval", prompt: "Compare a monitoring system with a control system.", objectiveIds: [s308[0], s308[1]], answerPoints: ["Both can obtain data from sensors.", "Monitoring records, displays or alerts about measured data.", "Control compares a reading with a stored rule or target.", "Control sends an output to an actuator to change the physical condition."], commonError: "Do not call a system control when it only measures and reports data." }),
    authoredPracticeQuestion({ id: "V3-016-S3.09-SENSORS", type: "Application", prompt: "Identify an appropriate named sensor for each of these uses and explain the match: greenhouse temperature, tyre pressure, remote-control signal and classroom noise level.", objectiveIds: [s309[0]], answerPoints: ["A temperature sensor measures the greenhouse temperature.", "A pressure sensor measures the tyre pressure.", "An infra-red sensor detects the remote-control radiation.", "A sound sensor detects the classroom sound level."], commonError: "Use the four sensor types named in the official syllabus and match each to the physical quantity detected." }),
    authoredPracticeQuestion({ id: "V3-016-S3.09-ACTUATOR", type: "Application", prompt: "Describe how a temperature sensor, microprocessor and heater actuator work together in a control system.", objectiveIds: [s309[1]], answerPoints: ["The sensor measures temperature and sends a signal representing the reading.", "The signal is converted to digital data if necessary.", "The microprocessor compares the reading with the target.", "The microprocessor sends an output signal to the heater actuator.", "The actuator changes the physical temperature."], commonError: "The sensor measures, the microprocessor decides and the actuator acts; do not swap these roles." }),
    authoredPracticeQuestion({ id: "V3-016-S3.08-FEEDBACK", type: "Exam-style", prompt: "Explain why feedback is important in a closed-loop temperature-control system.", objectiveIds: [s308[2]], answerPoints: ["A new sensor reading reports the actual temperature after the actuator operates.", "The controller compares the new reading with the target.", "The output can be continued, adjusted or stopped according to the remaining difference.", "Disturbances or incomplete changes can be detected and corrected."], commonError: "Feedback is the new sensor information returned to the controller, not the output sent to the actuator." }),
    authoredPracticeQuestion({ id: "V3-016-INTEGRATED-GREENHOUSE", type: "Exam-style", prompt: "A greenhouse records temperature and automatically opens a vent. Explain the monitoring function, the control function and the feedback cycle.", objectiveIds: [...s308, ...s309], answerPoints: ["Monitoring records, displays or alerts using temperature readings.", "The controller compares a temperature reading with the target or rule.", "It sends an output signal to the vent-motor actuator when a physical change is required.", "The actuator opens or closes the vent.", "New temperature readings provide feedback so the controller can adjust or stop the action."], commonError: "Separate reporting from corrective action, then state how a new reading closes the loop." }),
  ];
}

function selectExplanations(lesson, point) {
  const override = specialTeaching[point.id] ?? teachingDepthOverrides[`${String(lesson.lesson).padStart(3, "0")}:${point.id}`];
  if (override?.explanations?.length) return override.explanations.map(clean).filter(Boolean);
  const requirement = `${point.title} ${point.notes ?? ""}`;
  const ranked = point.explanations
    .map((text, index) => ({ text: clean(text), index, score: overlap(text, requirement) }))
    .filter(({ text }) => text.length >= 45 && !/Version 2|wording above|knowledge point/i.test(text))
    .sort((a, b) => b.score - a.score || a.index - b.index);
  const chosen = [];
  for (const item of ranked) {
    if (chosen.some((text) => text === item.text)) continue;
    chosen.push(item.text);
    if (chosen.length === 4) break;
  }
  if (chosen.length < 2) {
    for (const fact of lesson.coreFacts.map(clean)) {
      if (fact.length < 45 || chosen.includes(fact)) continue;
      chosen.push(fact);
      if (chosen.length === 3) break;
    }
  }
  return chosen;
}

function chooseQuestionObjectives(question, allObjectives) {
  const allowed = allObjectives.filter(([id]) => question.syllabusIds.some((syllabusId) => id.startsWith(`${syllabusId}.`)));
  const target = `${question.prompt} ${question.answer}`;
  const ranked = allowed.map(([id, description], index) => ({ id, index, score: overlap(target, description) })).sort((a, b) => b.score - a.score || a.index - b.index);
  const positive = ranked.filter((item) => item.score > 0).slice(0, 4).map((item) => item.id);
  return positive.length ? positive : ranked.slice(0, Math.min(2, ranked.length)).map((item) => item.id);
}

const visualFactCorrections = Object.freeze({
  "S11.02": [
    "Cambridge pseudocode uses <- for assignment and =, <>, <, <=, > or >= for comparison.",
    "Passed <- Mark >= PassMark stores the Boolean result of the comparison in Passed.",
    "Java uses = for assignment: boolean passed = mark >= PASS_MARK;.",
    "The assignment symbol changes between the two languages, but both store the comparison result in a Boolean variable.",
  ],
});

function materialForPoint(point, objectiveIds, mechanismSteps, workedExamples, explanations) {
  const rows = [];
  for (const node of point.nodes ?? []) {
    const label = clean(node.label);
    const value = clean(node.value);
    if (label && value && !rows.some(([existing]) => existing.toLowerCase() === label.toLowerCase())) rows.push([label, value]);
  }
  if (rows.length < 2) explanations.slice(0, 6).forEach((explanation, index) => rows.push([`Key relationship ${index + 1}`, explanation.split(/[,;:.]/)[0]]));
  const materials = [];
  const specificMechanism = mechanismSteps.length >= 2 && mechanismSteps.every((step) => !/identify the relevant|connect the mechanism|establish the exact|trace the relationship|use the explanation|set up the required|carry out the complete|trace or test the result|extract the constraints|match mechanisms to|link the choice to/i.test(`${step.label} ${step.title}`));
  if (point.visualMode === "process" && specificMechanism) {
    materials.push({ type: "flow", title: "Mechanism in examinable order", objectiveIds, steps: mechanismSteps.map((step) => [clean(step.title), clean(step.detail)]) });
  } else if (point.visualMode === "comparison" || point.visualMode === "decision") {
    materials.push({ type: "table", title: point.visualMode === "comparison" ? "Compare by technical factor" : "Decision evidence", objectiveIds, headers: ["Factor, term or condition", "Technical reading"], rows: rows.slice(0, 8) });
  } else {
    materials.push({ type: "cards", title: "Structure and relationships", objectiveIds, items: rows.slice(0, 8) });
  }
  for (const example of workedExamples.slice(0, 2)) {
    const steps = example.steps.map((step) => [clean(step.label), String(step.text ?? "").trim()]).filter(([, text]) => !text.includes("…"));
    materials.push({ type: "worked-example", title: String(example.title).includes("…") ? `Complete worked method for ${clean(point.title)}` : clean(example.title), objectiveIds, steps });
  }
  for (const visual of (point.visuals ?? []).slice(0, 1)) {
    const facts = visualFactCorrections[point.id] ?? visual.altFacts.map(clean);
    materials.push({
      type: "reviewed-visual",
      title: clean(visual.title),
      objectiveIds,
      asset: `/${visual.path}`,
      alt: facts.join(" "),
      facts,
      review: "reviewed",
    });
  }
  return materials;
}

function makePractice(sourceLesson, allObjectives, units) {
  const questions = sourceLesson.questionIds.map((id) => questionById.get(id)).filter(Boolean).map((question, index) => ({
    id: `V3-${question.id}`,
    type: index === 0 ? "Retrieval" : index === 1 ? "Application" : "Exam-style",
    marks: question.marks,
    prompt: clean(question.prompt),
    objectiveIds: question.objectiveIds?.filter((id) => allObjectives.some(([objectiveId]) => objectiveId === id))
      ?? chooseQuestionObjectives(question, allObjectives),
    answerPoints: sentences(question.answer),
    commonError: clean(question.commonError),
  }));
  for (const unit of units) {
    const covered = new Set(questions.flatMap((question) => question.objectiveIds));
    const missing = unit.objectiveIds.filter((id) => !covered.has(id));
    if (!missing.length) continue;
    questions.push({
      id: `V3-${sourceLesson.id}-${unit.unitKey ?? unit.syllabusId}-CHECK`,
      type: "Knowledge check",
      marks: unit.masteryCheck.marks ?? Math.max(2, missing.length),
      prompt: clean(unit.masteryCheck.prompt),
      objectiveIds: missing,
      answerPoints: unit.masteryCheck.answerCriteria.map(clean),
      commonError: unit.misconceptions[0] ?? "Answer the stated command word and link each fact to the scenario.",
    });
  }
  return questions;
}

function choosePaperReference(syllabusIds, sourceLesson) {
  if (sourceLesson.pastPaperRefs?.length) return sourceLesson.pastPaperRefs[0];
  const entry = paperFrequency.entries.find((candidate) => syllabusIds.includes(candidate.primaryRequirement) || candidate.secondaryRequirements.some((id) => syllabusIds.includes(id)));
  return entry ? { sourceRef: entry.sourceRef, marks: entry.marks, commandWord: entry.commandWord, questionType: entry.questionType } : { sourceRef: `Original ${sourceLesson.paper === 1 ? "Paper 1" : "Paper 2"} synthesis`, marks: 4, commandWord: "explain", questionType: "application" };
}

function makePastPaper(sourceLesson, practice, allObjectives) {
  const reference = choosePaperReference(sourceLesson.syllabusIds, sourceLesson);
  const task = practice.find((question) => question.type === "Exam-style") ?? practice.find((question) => question.type === "Application") ?? practice[0];
  return {
    sourceRef: reference.sourceRef,
    marks: reference.marks,
    accessUrl: officialPastPaperAccess,
    objectiveIds: task.objectiveIds,
    task: task.prompt,
    build: task.answerPoints,
    markLogic: [
      `The indexed task used the command word ${reference.commandWord}; the original task above is structurally equivalent and must perform that command explicitly.`,
      "Give one distinct technical fact, method step or scenario-linked consequence for each marking point; repetition does not earn another mark.",
    ],
    commonLosses: [task.commonError, "Naming a term without explaining its mechanism or applying it to the given data."],
  };
}

function makeAnchorMaterial(section, objectiveIds) {
  const meta = sectionMeta[section];
  if (!meta.anchor) return null;
  return {
    type: "analogy",
    title: meta.anchorTitle,
    objectiveIds,
    asset: `/assets/course-v3/section-anchors/${meta.anchor}`,
    alt: meta.anchorAlt,
    caption: meta.anchorCaption,
    boundary: meta.anchorBoundary,
  };
}

function makeLessonSummary(units) {
  const coreCards = units.map((unit) => {
    const core = sentences(unit.explanation[0]).slice(0, 2).join(". ");
    return [`${unit.syllabusId} · core relationship`, `${core}${core.endsWith(".") ? "" : "."}`];
  });
  const correctionCards = units.map((unit) => [`${unit.syllabusId} · correction`, unit.misconceptions[0]]);
  return [...coreCards, ...correctionCards].slice(0, 6);
}

function transformTeachingLesson(sourceLesson, sectionPosition) {
  const lessonOverride = lessonPresentationOverrides[sourceLesson.id] ?? {};
  const allObjectives = sourceLesson.knowledgePoints.flatMap((point) => objectiveRows(point.id));
  const unitFactory = {
    "002": makeLesson002Units,
    "003": makeLesson003Units,
    "004": makeLesson004Units,
    "005": makeLesson005Units,
    "006": makeLesson006Units,
    "013": makeLesson013Units,
    "014": makeLesson014Units,
    "015": makeLesson015Units,
    "016": makeLesson016Units,
  }[sourceLesson.id];
  let units = unitFactory ? unitFactory() : sourceLesson.knowledgePoints.map((point, index) => {
    const objectives = objectiveRows(point.id);
    const objectiveIds = objectives.map(([id]) => id);
    const override = specialTeaching[point.id] ?? teachingDepthOverrides[`${String(sourceLesson.lesson).padStart(3, "0")}:${point.id}`] ?? {};
    const mechanismSteps = override.mechanismSteps?.length ? override.mechanismSteps : point.mechanismSteps;
    const workedExamples = override.workedExamples?.length ? override.workedExamples : point.workedExamples;
    const misconceptions = override.misconceptions?.length ? override.misconceptions : misconceptionBySyllabus[point.id] ? [misconceptionBySyllabus[point.id]] : point.misconceptions;
    const explanation = selectExplanations(sourceLesson, point);
    const materials = materialForPoint(point, objectiveIds, mechanismSteps, workedExamples, explanation);
    if (override.leadVisual) materials.unshift({ ...override.leadVisual, objectiveIds });
    if (index === 0 && sectionPosition === 0) materials.unshift(makeAnchorMaterial(sourceLesson.section, objectiveIds));
    return {
      syllabusId: point.id,
      heading: override.heading ?? (String(point.displayTitle).includes("…") ? clean(point.title) : clean(point.displayTitle)),
      objectiveIds,
      explanation,
      materials: materials.filter(Boolean),
      misconceptions: misconceptions.map(clean).filter(Boolean),
      teacherNote: `用“术语 → 机制/步骤 → 场景后果”检查 ${point.id}。先让学生读素材关系，再用英文完整表达；若只能复述名词，就回到 worked example 逐步追踪。`,
      masteryCheck: override.masteryCheck ?? point.masteryCheck,
    };
  });
  const practiceFactory = {
    "013": makeLesson013Practice,
    "014": makeLesson014Practice,
    "015": makeLesson015Practice,
    "016": makeLesson016Practice,
  }[sourceLesson.id];
  if (sourceLesson.section === 1) units = enhanceSection1Units(sourceLesson.id, units);
  const practice = sourceLesson.section === 1 ? section1Practice[sourceLesson.id]
    : practiceFactory ? practiceFactory() : makePractice(sourceLesson, allObjectives, units);
  return {
    kind: "teaching",
    originalLesson: sourceLesson.lesson,
    paper: sourceLesson.paper,
    section: sourceLesson.section,
    sectionTitle: sectionMeta[sourceLesson.section].title,
    syllabusIds: sourceLesson.syllabusIds,
    title: lessonOverride.title ?? sourceLesson.title,
    subtitle: lessonOverride.subtitle ?? clean(sourceLesson.focus === "integrated-review" ? sourceLesson.title : sourceLesson.learningObjectives.join(" · ")),
    guidingQuestion: lessonOverride.guidingQuestion ?? clean(sourceLesson.prerequisitePrompt || `How would you explain and apply ${sourceLesson.title.toLowerCase()} in a new scenario?`),
    examQuestionCount: lessonOverride.examQuestionCount,
    diagnostic: {
      prompt: clean(sourceLesson.prerequisitePrompt || `State one fact you already know about ${sourceLesson.title.toLowerCase()}.`),
      answer: sourceLesson.prerequisiteKnowledge?.length ? clean(sourceLesson.prerequisiteKnowledge[0]) : clean(sourceLesson.coreFacts[0]),
    },
    objectives: allObjectives,
    units,
    practice,
    pastPaper: makePastPaper(sourceLesson, practice, allObjectives),
    summaryMode: lessonOverride.summaryMode,
    summary: lessonOverride.summaryMode === "authored"
      ? lessonOverride.summary
      : makeLessonSummary(units),
    sources: [
      `Cambridge 9618 2027–2029 syllabus · ${sourceLesson.syllabusIds.join(", ")}`,
      "AL Computer Science Coursebook of New Syllabus · local teacher reference",
      "Hodder AS & A Level Computer Science Complete Book · local teacher reference",
    ],
  };
}

function transformSection2Lesson(lesson) {
  return { ...lesson, summaryMode: "authored", kind: "teaching", paper: 1, section: 2, sectionTitle: sectionMeta[2].title, originalLesson: null };
}

function transformReviewLesson(sourceLesson) {
  const questions = sourceLesson.questionIds.map((id) => questionById.get(id)).filter(Boolean);
  const objectives = sourceLesson.syllabusIds.map((id) => [`${id}.R`, `Diagnose and connect ${id} in an integrated response.`]);
  const practice = questions.map((question, index) => ({
    id: `V3-${question.id}`,
    type: index === 0 ? "Retrieval" : index === questions.length - 1 ? "Exam-style" : "Application",
    marks: question.marks,
    prompt: clean(question.prompt),
    objectiveIds: question.syllabusIds.map((id) => `${id}.R`),
    answerPoints: sentences(question.answer),
    commonError: clean(question.commonError),
  }));
  const units = sourceLesson.reviewMaterials.map((lane, index) => ({
    syllabusId: `REVIEW-${sourceLesson.paper}-${index + 1}`,
    heading: clean(lane.title),
    objectiveIds: objectives.filter((_, objectiveIndex) => objectiveIndex % sourceLesson.reviewMaterials.length === index).map(([id]) => id),
    explanation: lane.points.map(clean),
    materials: [
      { type: "cards", title: "Retrieve, correct and transfer", objectiveIds: [], items: [["Retrieve", clean(lane.retrievalPrompt)], ["Correct", clean(lane.correctionPrompt)], ["Transfer", clean(lane.transferPrompt)]] },
    ],
    misconceptions: ["Do not revise each term in isolation; connect the representation, method and mark-bearing consequence."],
    teacherNote: "复习课不重新拥有 syllabus requirement；用跨题型诊断找出学生真正断裂的知识链。",
    masteryCheck: { prompt: clean(lane.transferPrompt), answerCriteria: lane.points.map(clean) },
  }));
  return {
    kind: "review",
    originalLesson: sourceLesson.lesson,
    paper: sourceLesson.paper,
    section: "Review",
    sectionTitle: sourceLesson.sectionTitle,
    syllabusIds: sourceLesson.syllabusIds,
    title: sourceLesson.title,
    subtitle: "Integrated retrieval, error diagnosis, transfer and answer construction across the completed paper.",
    guidingQuestion: sourceLesson.paper === 1 ? "Can you move from a representation or system description to the exact mechanism and consequence that earns the mark?" : "Can you convert a problem statement into a complete, traceable algorithm and then test or amend it safely?",
    diagnostic: { prompt: clean(sourceLesson.prerequisitePrompt), answer: clean(sourceLesson.coreFacts[0]) },
    objectives,
    units,
    practice,
    pastPaper: makePastPaper(sourceLesson, practice, objectives),
    summary: sourceLesson.summaryPoints.slice(0, 6).map((point, index) => [`Review ${index + 1}`, clean(point)]),
    sources: ["Cambridge 9618 2027–2029 AS syllabus · integrated Paper review", "Original teacher-authored equivalent tasks; official paper wording is not reproduced"],
  };
}

function sliceTeachingLesson(sourceLesson, syllabusIds, title) {
  return {
    ...sourceLesson,
    title,
    focus: title,
    syllabusIds,
    knowledgePoints: sourceLesson.knowledgePoints.filter((point) => syllabusIds.includes(point.id)),
    questionIds: sourceLesson.questionIds.filter((id) => {
      const question = questionById.get(id);
      return question?.syllabusIds.some((syllabusId) => syllabusIds.includes(syllabusId));
    }),
    pastPaperRefs: [],
  };
}

function attachNumberApplications(sourceLesson, applicationsLesson) {
  const applicationsPoint = applicationsLesson.knowledgePoints.find((point) => point.id === "S1.06");
  return {
    ...sourceLesson,
    syllabusIds: [...sourceLesson.syllabusIds, "S1.06"],
    knowledgePoints: [...sourceLesson.knowledgePoints, applicationsPoint],
    questionIds: [...sourceLesson.questionIds, "Q-L004-03"],
    learningObjectives: [...sourceLesson.learningObjectives, applicationsPoint.title],
  };
}

function mergeTeachingLessons(sourceLessons, syllabusIds, title) {
  const base = sourceLessons[0];
  const unique = (values) => [...new Set(values)];
  return {
    ...base,
    title,
    focus: title,
    syllabusIds,
    knowledgePoints: syllabusIds.map((id) => sourceLessons.flatMap((lesson) => lesson.knowledgePoints).find((point) => point.id === id)),
    questionIds: unique(sourceLessons.flatMap((lesson) => lesson.questionIds)).filter((id) => questionById.get(id)?.syllabusIds.some((syllabusId) => syllabusIds.includes(syllabusId))),
    pastPaperRefs: unique(sourceLessons.flatMap((lesson) => lesson.pastPaperRefs.map((reference) => JSON.stringify(reference)))).map((reference) => JSON.parse(reference)),
    coreFacts: unique(sourceLessons.flatMap((lesson) => lesson.coreFacts)),
    summaryPoints: unique(sourceLessons.flatMap((lesson) => lesson.summaryPoints)),
    learningObjectives: unique(sourceLessons.flatMap((lesson) => lesson.learningObjectives)),
  };
}

const teaching = v2.lessons.filter((lesson) => lesson.section !== "Review");
const firstBySection = new Map();
for (const lesson of teaching) if (!firstBySection.has(lesson.section)) firstBySection.set(lesson.section, lesson.lesson);
const section1Lesson002 = attachNumberApplications(teaching.find((lesson) => lesson.lesson === 2), teaching.find((lesson) => lesson.lesson === 4));
const section1Lesson004 = sliceTeachingLesson(teaching.find((lesson) => lesson.lesson === 4), ["S1.07"], "Character encoding: ASCII, extended ASCII and Unicode");

const rawCourse = [
  ...teaching.filter((lesson) => lesson.section === 1).map((lesson) => transformTeachingLesson(
    lesson.lesson === 2 ? section1Lesson002 : lesson.lesson === 4 ? section1Lesson004 : lesson,
    lesson.lesson === firstBySection.get(1) ? 0 : 1,
  )),
  ...section2Lessons.map(transformSection2Lesson),
  ...teaching.filter((lesson) => lesson.section >= 3 && lesson.section <= 5).map((lesson) => transformTeachingLesson(lesson, lesson.lesson === firstBySection.get(lesson.section) ? 0 : 1)),
  transformTeachingLesson(teaching.find((lesson) => lesson.lesson === 31), 0),
  transformTeachingLesson(sliceTeachingLesson(teaching.find((lesson) => lesson.lesson === 33), ["S6.03"], "Authentication and layered system protection"), 1),
  transformTeachingLesson(teaching.find((lesson) => lesson.lesson === 32), 1),
  transformTeachingLesson(sliceTeachingLesson(teaching.find((lesson) => lesson.lesson === 33), ["S6.06"], "Encryption and access rights for data"), 1),
  transformTeachingLesson(teaching.find((lesson) => lesson.lesson === 34), 1),
  ...teaching.filter((lesson) => lesson.section === 7).map((lesson) => transformTeachingLesson(lesson, lesson.lesson === firstBySection.get(7) ? 0 : 1)),
  ...teaching.filter((lesson) => lesson.section === 8 && lesson.lesson <= 42).map((lesson) => transformTeachingLesson(lesson, lesson.lesson === firstBySection.get(8) ? 0 : 1)),
  transformTeachingLesson(mergeTeachingLessons(teaching.filter((lesson) => [43, 44].includes(lesson.lesson)), ["S8.08", "S8.09"], "Understanding and writing SQL data definitions"), 1),
  transformTeachingLesson(mergeTeachingLessons(teaching.filter((lesson) => [43, 44].includes(lesson.lesson)), ["S8.10", "S8.11"], "Querying and maintaining data with SQL DML"), 1),
  transformReviewLesson(v2.lessons.find((lesson) => lesson.lesson === 45)),
  ...teaching.filter((lesson) => lesson.section >= 9 && lesson.section <= 12).map((lesson) => transformTeachingLesson(lesson, lesson.lesson === firstBySection.get(lesson.section) ? 0 : 1)),
  transformReviewLesson(v2.lessons.find((lesson) => lesson.lesson === 90)),
];

export const courseV3Lessons = rawCourse.map(authorSection3Lesson).map(authorSection4Lesson).map(authorSection5Lesson).map(authorSection6Lesson).map(authorSection7Lesson).map(authorSection8Lesson).map(authorSection9Lesson).map(authorSection10Lesson).map(authorSection11Lesson).map(authorSection12Lesson).map((lesson, index) => finaliseLessonPresentation({
  ...lesson,
  sequenceIndex: index + 1,
  lessonKey: lesson.kind === "review" ? `REV-P${lesson.paper}` : `S${lesson.section}-L${String(rawCourse.slice(0, index + 1).filter((item) => item.section === lesson.section).length).padStart(2, "0")}`,
  route: `lesson-${String(index + 1).padStart(3, "0")}`,
}));

export const courseV3Meta = Object.freeze({
  schemaVersion: 5,
  syllabus: "Cambridge International AS Level Computer Science 9618 · 2027–2029",
  lessonCount: courseV3Lessons.length,
  teachingLessonCount: courseV3Lessons.filter((lesson) => lesson.kind === "teaching").length,
  reviewLessonCount: courseV3Lessons.filter((lesson) => lesson.kind === "review").length,
  officialRequirementCount: Object.keys(officialAsMapping).length,
  examStyleQuestionCount: courseV3Lessons.flatMap((lesson) => lesson.examStyleQuestions).length,
});
