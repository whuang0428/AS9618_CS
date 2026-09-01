import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { officialAsMapping } from "./syllabus-official-as-mapping.mjs";
import { teachingDepthOverrides, questionRepairs } from "./course-v2-teaching-depth-overrides.mjs";
import { section2Lessons } from "./course-v3-section2-content.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const v2 = JSON.parse(readFileSync(join(root, "scripts", "course-v2-content.json"), "utf8"));
const questionBank = JSON.parse(readFileSync(join(root, "scripts", "question-bank-contract.json"), "utf8"));
const paperFrequency = JSON.parse(readFileSync(join(root, "scripts", "past-paper-frequency-contract.json"), "utf8"));
const v3QuestionRepairs = Object.freeze({
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
  "Q-L084-02": {
    prompt: "For each fault, state its type, one way to expose or locate it, and the correction: a missing ENDIF; IF Mark < 50 when 50 should pass; Average <- Total / Count when Count can be zero.",
    answer: "missing ENDIF identified as syntax error and translator/dynamic syntax check used; add the required ENDIF; Mark < 50 identified as a boundary logic error and trace/test at 50 used; use IF Mark >= 50 for the pass branch or an equivalent complete selection; division by zero identified as a run-time error/risk and execution/test diagnostics used; guard the division by checking Count or handle the zero case",
  },
});
const questionById = new Map(questionBank.questions.map((question) => [question.id, { ...question, ...(questionRepairs[question.id] ?? {}), ...(v3QuestionRepairs[question.id] ?? {}) }]));
const officialPastPaperAccess = "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/past-papers/";

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
      "Use FOR...TO...NEXT when the repetition count or inclusive counter range is known before the loop. Use WHILE...DO...ENDWHILE when the condition must be checked before a body that may run zero times. Use REPEAT...UNTIL when the body must run before its stopping condition is checked.",
      "Every selection and loop must be complete, correctly nested and traceable. Choose the construct from the data and stopping rule rather than from which syntax is shortest.",
    ],
    mechanismSteps: [
      { label: "Select", title: "Identify the control requirement", detail: "Decide whether the problem needs a choice, known-count repetition, pre-condition repetition or post-condition repetition." },
      { label: "Write", title: "Use the matching complete Cambridge construct", detail: "Include the condition, body, alternative where needed and the correct closing keyword." },
      { label: "Trace", title: "Test entry, branch and exit behaviour", detail: "Use values that take each branch and check zero, one and repeated loop executions where applicable." },
    ],
    workedExamples: [{ title: "Choose and trace the right loop", steps: [
      { label: "Known count", text: "FOR Index <- 1 TO 10\n  OUTPUT Value[Index]\nNEXT Index" },
      { label: "May run zero times", text: "WHILE Password <> CorrectPassword AND Attempts < 3 DO\n  INPUT Password\n  Attempts <- Attempts + 1\nENDWHILE" },
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
      { label: "Fault", text: "IF Mark < 50 THEN Result <- 'Fail' incorrectly fails to assign a pass when the remaining branch also excludes the boundary." },
      { label: "Expose", text: "Trace the boundary value Mark = 50 and compare the actual result with the requirement that 50 should pass." },
      { label: "Correct", text: "Use IF Mark >= 50 THEN Result <- 'Pass' ELSE Result <- 'Fail' ENDIF, then retest 49, 50 and 51." },
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
  "S1.08": ["Explain how pixels and a file header encode a bitmap.", "Distinguish image resolution from screen resolution.", "Explain colour depth as bits per pixel and the number of available colours.", "Calculate uncompressed bitmap pixel-data size and convert units.", "Explain how image resolution affects stored detail and file size.", "Explain how colour depth affects colour accuracy and file size."],
  "S1.09": ["Explain a vector drawing list, its drawing objects and their properties.", "Explain why vector graphics scale without pixelation.", "Justify bitmap or vector representation for a given task."],
  "S1.10": ["Explain sampling of an analogue sound wave.", "Explain quantisation and binary encoding of sample values.", "Explain the effect of sampling rate on time accuracy and file size.", "Explain the effect of sampling resolution on amplitude accuracy and file size."],
  "S1.11": ["Explain why files are compressed.", "Distinguish lossless and lossy compression by reconstruction and information loss.", "Encode and decode run-length encoding and judge when it is effective.", "Explain suitable lossless compression for ordinary text.", "Explain lossless and lossy compression choices for bitmap images.", "Explain lossless storage of repeated vector objects or properties.", "Explain lossless and lossy compression choices for sound.", "Justify a compression method from fidelity, repetition and intended use."],
  "S3.03": ["Describe the principal operation of a laser printer.", "Describe the principal operation of a 3D printer.", "Describe the principal operation of a microphone.", "Describe the principal operation of speakers.", "Describe the principal operation of magnetic hard-disk storage.", "Describe the principal operation of solid-state flash memory.", "Describe the principal operation of an optical disc reader/writer.", "Describe the principal operation of a touchscreen.", "Describe the principal operation of a virtual-reality headset."],
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
    const match = explanations.find((explanation) => explanation.toLowerCase().includes(label.toLowerCase()) && !explanation.includes("…"));
    if (label && match && !rows.some(([existing]) => existing.toLowerCase() === label.toLowerCase())) rows.push([label, match]);
  }
  if (rows.length < 2) explanations.slice(0, 6).forEach((explanation, index) => rows.push([`Key relationship ${index + 1}`, explanation]));
  const materials = [];
  if (point.visualMode === "process") {
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
      review: "Stage 10 two-pass semantic review approved",
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
    objectiveIds: chooseQuestionObjectives(question, allObjectives),
    answerPoints: sentences(question.answer),
    commonError: clean(question.commonError),
  }));
  for (const unit of units) {
    const covered = new Set(questions.flatMap((question) => question.objectiveIds));
    const missing = unit.objectiveIds.filter((id) => !covered.has(id));
    if (!missing.length) continue;
    questions.push({
      id: `V3-${sourceLesson.id}-${unit.syllabusId}-CHECK`,
      type: "Knowledge check",
      marks: Math.max(2, missing.length),
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
  const allObjectives = sourceLesson.knowledgePoints.flatMap((point) => objectiveRows(point.id));
  const units = sourceLesson.knowledgePoints.map((point, index) => {
    const objectives = objectiveRows(point.id);
    const objectiveIds = objectives.map(([id]) => id);
    const override = specialTeaching[point.id] ?? teachingDepthOverrides[`${String(sourceLesson.lesson).padStart(3, "0")}:${point.id}`] ?? {};
    const mechanismSteps = override.mechanismSteps?.length ? override.mechanismSteps : point.mechanismSteps;
    const workedExamples = override.workedExamples?.length ? override.workedExamples : point.workedExamples;
    const misconceptions = override.misconceptions?.length ? override.misconceptions : misconceptionBySyllabus[point.id] ? [misconceptionBySyllabus[point.id]] : point.misconceptions;
    const explanation = selectExplanations(sourceLesson, point);
    const materials = materialForPoint(point, objectiveIds, mechanismSteps, workedExamples, explanation);
    if (index === 0 && sectionPosition === 0) materials.unshift(makeAnchorMaterial(sourceLesson.section, objectiveIds));
    return {
      syllabusId: point.id,
      heading: String(point.displayTitle).includes("…") ? clean(point.title) : clean(point.displayTitle),
      objectiveIds,
      explanation,
      materials: materials.filter(Boolean),
      misconceptions: misconceptions.map(clean).filter(Boolean),
      teacherNote: `用“术语 → 机制/步骤 → 场景后果”检查 ${point.id}。先让学生读素材关系，再用英文完整表达；若只能复述名词，就回到 worked example 逐步追踪。`,
      masteryCheck: override.masteryCheck ?? point.masteryCheck,
    };
  });
  const practice = makePractice(sourceLesson, allObjectives, units);
  return {
    kind: "teaching",
    originalLesson: sourceLesson.lesson,
    paper: sourceLesson.paper,
    section: sourceLesson.section,
    sectionTitle: sectionMeta[sourceLesson.section].title,
    syllabusIds: sourceLesson.syllabusIds,
    title: sourceLesson.title,
    subtitle: clean(sourceLesson.focus === "integrated-review" ? sourceLesson.title : sourceLesson.learningObjectives.join(" · ")),
    guidingQuestion: clean(sourceLesson.prerequisitePrompt || `How would you explain and apply ${sourceLesson.title.toLowerCase()} in a new scenario?`),
    diagnostic: {
      prompt: clean(sourceLesson.prerequisitePrompt || `State one fact you already know about ${sourceLesson.title.toLowerCase()}.`),
      answer: sourceLesson.prerequisiteKnowledge?.length ? clean(sourceLesson.prerequisiteKnowledge[0]) : clean(sourceLesson.coreFacts[0]),
    },
    objectives: allObjectives,
    units,
    practice,
    pastPaper: makePastPaper(sourceLesson, practice, allObjectives),
    summary: makeLessonSummary(units),
    sources: [
      `Cambridge 9618 2027–2029 syllabus · ${sourceLesson.syllabusIds.join(", ")}`,
      "AL Computer Science Coursebook of New Syllabus · local teacher reference",
      "Hodder AS & A Level Computer Science Complete Book · local teacher reference",
      "Stage 10 semantic image audit · approved assets only",
    ],
  };
}

function transformSection2Lesson(lesson) {
  return { ...lesson, kind: "teaching", paper: 1, section: 2, sectionTitle: sectionMeta[2].title, originalLesson: null };
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

const rawCourse = [
  ...teaching.filter((lesson) => lesson.section === 1).map((lesson) => transformTeachingLesson(lesson, lesson.lesson === firstBySection.get(1) ? 0 : 1)),
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

export const courseV3Lessons = rawCourse.map((lesson, index) => ({
  ...lesson,
  sequenceIndex: index + 1,
  lessonKey: lesson.kind === "review" ? `REV-P${lesson.paper}` : `S${lesson.section}-L${String(rawCourse.slice(0, index + 1).filter((item) => item.section === lesson.section).length).padStart(2, "0")}`,
  route: `lesson-${String(index + 1).padStart(3, "0")}`,
}));

export const courseV3Meta = Object.freeze({
  schemaVersion: 3,
  syllabus: "Cambridge International AS Level Computer Science 9618 · 2027–2029",
  lessonCount: courseV3Lessons.length,
  teachingLessonCount: courseV3Lessons.filter((lesson) => lesson.kind === "teaching").length,
  reviewLessonCount: courseV3Lessons.filter((lesson) => lesson.kind === "review").length,
  officialRequirementCount: Object.keys(officialAsMapping).length,
});
