import { codeFor } from "./course-v3-section10-programs.mjs";
import { diagramFor } from "./course-v3-section10-diagrams.mjs";
import { section10Teaching } from "./course-v3-section10-teaching.mjs";
import { coreParagraph as paragraph, coreList as teachingList, coreSteps as teachingSteps, coreTable as teachingTable } from "./course-v3-core-blocks.mjs";

const ids = (r, ...ns) => ns.map(n => `S10.${String(r).padStart(2, "0")}.A${String(n).padStart(2, "0")}`);
const objectiveText = {
  "01": ["Select and use INTEGER.", "Select and use REAL.", "Select and use CHAR and STRING.", "Select and use BOOLEAN.", "Select and use DATE.", "Recognise ARRAY and FILE in Cambridge pseudocode."],
  "02": ["Explain how a record groups fields of different data types under one identifier.", "Write pseudocode to define a record structure.", "Write pseudocode to read and save data in record fields."],
  "03": ["Use array terminology correctly.", "Identify an array's indices and lower and upper bounds."],
  "04": ["Select a suitable 1D or 2D array for a given task."], "05": ["Write pseudocode to declare and process 1D and 2D arrays."],
  "06": ["Write and trace a bounded linear search.", "Write and trace an ascending bubble sort using adjacent comparisons and a complete swap."],
  "07": ["Explain why files are needed.", "Write pseudocode to handle text files consisting of one or more lines."],
  "08": ["Explain that an ADT consists of a collection of data and a set of operations on those data."],
  "09": ["Explain LIFO behaviour and justify the use of a stack.", "Explain FIFO behaviour and justify the use of a queue.", "Explain nodes and links and justify the use of a linked list."],
  "10": ["Describe adding, editing and deleting data in a stack while preserving its access rules.", "Describe adding, editing and deleting data in a queue while preserving its access rules.", "Describe adding, editing and deleting data in a linked list while preserving its links.", "Describe how arrays can implement a stack, queue and linked list."],
};
const table = (title, headers, rows) => ({ type: "table", title, headers, rows, preserveText: true });
const worked = (title, steps) => ({ type: "worked-example", title, steps });
const example = (key, title, task, result) => ({ ...worked(title, [["Task", task], ["Pseudocode", codeFor(key)], ["Result", result]]), programKey: key });
const flow = (title, steps) => ({ type: "flow", title, steps, preserveText: true });
const unit = (key, heading, objectiveIds, explanation, materials, misconception, prompt, answer) => ({
  unitKey: `S10-${key}`, syllabusId: objectiveIds[0].replace(/\.A\d+$/, ""), heading, objectiveIds, explanation,
  materials: materials.map(m => ({ ...m, objectiveIds })), misconceptions: [misconception], checkpoint: { prompt, answer },
  useAuthoredVisual: true, preserveTeachingSteps: true,
  ...(section10Teaching[key] ? {
    teachingBlocks: [
      ...explanation.map((text, index) => paragraph(text, section10Teaching[key].headings[index])),
      ...section10Teaching[key].blocks,
    ],
    explanation: section10Teaching[key].essentials,
  } : {}),
});
const question = (prompt, objectiveIds, answerPoints, commonError, extra = {}) => ({ prompt, objectiveIds, answerPoints, commonError, marks: answerPoints.length, type: "Application", authored: true, ...extra });
const answer = key => ({ answerCode: codeFor(key), answerProgramKey: key, answerLanguage: "text", answerCodeLabel: "One valid pseudocode solution" });
const supplied = key => ({ code: codeFor(key), programKey: key, codeLabel: "Supplied pseudocode", codeCaption: "Use this complete algorithm in the question." });

export function authorSection10Lesson(source) {
  if (source.section === 10) {
    const number = source.originalLesson - 54;
    const authored = lessons[number];
    if (!authored) throw new Error(`Missing S10 lesson ${source.originalLesson}`);
    return { ...source, ...authored, subtitle: subtitles[number - 1], summaryMode: "authored",
      teachingCheckpoints: ["Attempt the opening diagnostic before the explanation.", "Trace the worked example, then complete each unit check before revealing its answer.", "Write or trace the practice responses before attempting the independent exam-style questions."],
      sources: ["Cambridge 9618 2027–2029 syllabus, sections 10.1–10.4: https://www.cambridgeinternational.org/Images/721397-2027-2029-syllabus.pdf", "Cambridge 9618 2027–2029 pseudocode guide: https://www.cambridgeinternational.org/Images/721401-2027-2029-pseudocode-guide.pdf", "Original teaching scenarios, diagrams, questions and marking points."],
    };
  }
  if (source.kind !== "review" || source.paper !== 2) return source;
  const r = (...ns) => ns.map(n => `S10.${String(n).padStart(2, "0")}.R`);
  const review = unit("REVIEW", "Section 10: Data types and structures", r(1, 2, 3, 4, 5, 6, 7, 8, 9, 10), [
    "Choose each value's type before grouping values: record fields may have different types, whereas an array has a declared element type and explicit bounds. One index selects a 1D element; two select a 2D element. Write complete declarations, field access and bounded iteration before tracing the resulting values.",
    "For array processing, linear search checks consecutive elements and reports a matching position or absence; bubble sort uses complete adjacent swaps. Files retain results between runs through the appropriate read, write or append mode. ADTs specify data and operations: use LIFO for a stack, FIFO for a queue and links for a linked list, and keep the array implementation's active state consistent after each operation.",
  ], [table("S10 review route", ["Official area", "Evidence to produce"], [["10.1 Data types and records", "Suitable types, TYPE/ENDTYPE, record declaration and field operations"], ["10.2 Arrays", "Dimensions, bounds, complete loops, search and sort traces"], ["10.3 Files", "Mode choice, EOF-guarded reads, writes and closing"], ["10.4 ADTs", "Data plus operations; correct removal order and array state"]]), worked("Trace data through a small booking system", [["Input and store", "A record holds a STRING name and INTEGER seat number. Five seat requests are retained in Request[1:5]."], ["Process", "For Request values 8, 3, 5, 3, 1, a first-match search for 3 returns index 2; ascending sorting gives 1, 3, 3, 5, 8."], ["Retain and order", "Append the processed booking to a log. A queue controls arrival order; an undo stack stores the latest completed change and its previous state."]])],
  "The same values can support different access rules; justify the data structure from the required operation, not merely the scenario name.", "What must a text-file loop check before trying to read another line?", "NOT EOF for the open input file; a blank line is not itself an end-of-file marker.");
  review.syllabusId = "REVIEW-2-2";
  review.summary = ["Section 10: Data types and structures", "Select field types and array dimensions; trace bounded searches and adjacent swaps; preserve text with the correct file mode; justify ADT access rules and maintain consistent array state."];
  const tasks = [
    question("A booking record needs Name and SeatNumber. Define BookingRecord with suitable types, declare Booking, and write statements to input both fields and display Name.", r(1, 2), ["TYPE BookingRecord and ENDTYPE enclose DECLARE Name : STRING and DECLARE SeatNumber : INTEGER.", "DECLARE Booking : BookingRecord creates the variable.", "INPUT Booking.Name and INPUT Booking.SeatNumber save the entered fields.", "OUTPUT Booking.Name reads and displays the name."], "Record definition, declaration and field assignment have different roles."),
    question("A theatre holds one occupied flag per seat in 3 rows of 8 seats. Declare an array and give valid nested traversal bounds. Separately, trace a first-match linear search for 5 in [9,5,2,5] and one ascending bubble-sort pass on [9,5,2,5].", r(3, 4, 5, 6), ["DECLARE Occupied : ARRAY[1:3, 1:8] OF BOOLEAN gives 24 elements.", "Use an outer row loop from 1 to 3 and an inner seat loop from 1 to 8, accessing Occupied[Row, Seat].", "The search returns the first matching index, 2.", "One bubble pass gives [5,2,5,9], fixing 9 at the end."], "Do not sort before tracing the stated search; the two operations start from the supplied array."),
    question("A log must keep previous bookings and add one new STRING BookingLine. Write its file operations, then describe how a later program reads every line safely, including any blank lines.", r(7), ["OPENFILE \"Bookings.txt\" FOR APPEND preserves the old bookings.", "WRITEFILE \"Bookings.txt\", BookingLine followed by CLOSEFILE saves the new line.", "The reader opens FOR READ and checks NOT EOF before each READFILE.", "A blank line is processed as an empty string; CLOSEFILE follows the completed loop."], "Do not use WRITE when the task requires retaining previous entries."),
    question("Booking requests arrive A, B, C and must be processed in that order; completed changes must be undoable latest first. Suggest ADTs and state their next removal after all three are stored. Explain how an array-backed linked list inserts a new node after a known node.", r(8, 9, 10), ["An ADT combines data with its specified operations; the waiting-request queue uses FIFO and removes A next.", "The undo stack uses LIFO and removes C next.", "A linked-list node stores data and the next node's index in array storage.", "Allocate a free node, point it to the known node's former successor, then point the known node to it."], "The queue and stack apply different removal rules to different collections."),
  ].map((q, i) => ({ ...q, id: `REV-P2-S10-Q${i + 1}` }));
  return { ...source, units: source.units.map(u => u.heading.startsWith("Section 10:") ? review : u), practice: [...source.practice.filter(q => q.id !== "V3-Q-L090-01"), ...tasks] };
}

const assessment = (id, requirements, prompt, answerPoints, extra = {}) => ({ id, section: 10, sourceType: "original", syllabusIds: requirements.map(n => `S10.${String(n).padStart(2, "0")}`), marks: answerPoints.length, commandWord: "explain", prompt, answerPoints, answer: answerPoints.join(" "), guidance: "Award one mark for each listed point. Accept equivalent correct declarations, algorithms and explanations that satisfy the stated task.", semanticFingerprint: `assessment|${id}|authored-s10`, ...extra });
export const section10Assessments = [
  assessment("A-S10-1", [1, 2], "Write pseudocode for the following task. A stock record must store ItemName, UnitPrice and Available. Define StockRecord with suitable types, declare Item of that type and write an assignment that sets its price to 4.75.", ["TYPE StockRecord and ENDTYPE enclose the field definitions.", "DECLARE ItemName : STRING.", "DECLARE UnitPrice : REAL and DECLARE Available : BOOLEAN.", "DECLARE Item : StockRecord.", "Item.UnitPrice <- 4.75."], { commandWord: "write", answerCode: "TYPE StockRecord\n    DECLARE ItemName : STRING\n    DECLARE UnitPrice : REAL\n    DECLARE Available : BOOLEAN\nENDTYPE\nDECLARE Item : StockRecord\nItem.UnitPrice <- 4.75", answerLanguage: "text" }),
  assessment("A-S10-2", [3, 4, 5, 6], "Write an array declaration for the following task. A table stores one INTEGER score per team for 3 teams and 4 rounds. Declare a suitable array, describe complete nested traversal, and give its capacity. Separately, give the first matching 1-based position for target 6 in [4,6,2,6] and the result of one ascending bubble-sort pass on that array.", ["DECLARE Score : ARRAY[1:3, 1:4] OF INTEGER.", "Loop over teams 1 to 3 and rounds 1 to 4, processing Score[Team, Round].", "The inclusive bounds give 3 × 4 = 12 elements.", "Linear search finds target 6 first at index 2.", "One bubble-sort pass produces [4,2,6,6]."], { commandWord: "write" }),
  assessment("A-S10-3", [7], "A saved register contains the lines Ada, a blank line, and Dan. Explain why file storage is needed between sessions, describe safe reading of every line and give the line count. State the mode for adding Eve without losing existing lines.", ["The file retains the register after the running program's variables cease to exist.", "Open the file FOR READ and test NOT EOF before each READFILE.", "Read and process each line, then close the input file after the loop.", "The count is 3 because the blank line is still a line.", "Use APPEND to add Eve while keeping existing contents."], { commandWord: "explain" }),
  assessment("A-S10-4", [8, 9, 10], "Explain suitable data structures for the following tasks. A printer processes jobs in arrival order; an editor undoes its latest change; a playlist inserts tracks between known neighbours. Suggest suitable ADTs and explain their access rules. State what an ADT specifies and how an array-backed linked list represents its links.", ["A queue serves the printer's earliest waiting job first (FIFO).", "A stack removes the editor's latest remaining change first (LIFO).", "A linked list permits playlist insertion by updating neighbour links without shifting every later track.", "An ADT specifies a collection of data and the operations on those data.", "An array implementation stores node data and next-node indices, with a head index and a null-link convention."], { commandWord: "explain" }),
  assessment("A-P2-2", [1, 2, 7], "Write pseudocode for the following task and explain your type and storage choices. A sensor record contains Code (text, retaining leading zeros), Reading (may be fractional) and Valid (a logical state). Define SensorRecord, declare Sensor, input Code and Reading, set Valid to TRUE and display Reading. Explain why the code is text and why saving these fields in a record does not by itself preserve them between program executions.", ["TYPE SensorRecord and ENDTYPE enclose the definition.", "Code is declared STRING.", "Reading is declared REAL and Valid is declared BOOLEAN.", "DECLARE Sensor : SensorRecord creates the variable.", "INPUT Sensor.Code and INPUT Sensor.Reading save both inputs in their fields.", "Sensor.Valid <- TRUE initialises the logical state.", "OUTPUT Sensor.Reading reads and displays that field.", "Code is an identifier with significant leading zeros; arithmetic is not required.", "A record variable alone is not persistent; the fields must be written to a file for later runs."], { commandWord: "write", answerCode: "TYPE SensorRecord\n    DECLARE Code : STRING\n    DECLARE Reading : REAL\n    DECLARE Valid : BOOLEAN\nENDTYPE\nDECLARE Sensor : SensorRecord\nINPUT Sensor.Code\nINPUT Sensor.Reading\nSensor.Valid <- TRUE\nOUTPUT Sensor.Reading", answerLanguage: "text" }),
  assessment("A-P2-6", [3, 5, 6], "Write complete pseudocode to input five INTEGER values into Values[1:5] and a target, then output the first matching index or 0 if the target is absent. State the output for values [21,9,14,9,30] and target 9, and explain why 0 is unambiguous. Separately, trace one ascending bubble-sort pass on [7,3,6,2] and explain the final position reached by 7.", ["Declare the five-element INTEGER array and scalar INTEGER search variables.", "Input every element using indices 1 through 5, then input the target.", "Initialise Index to 1 and Position to 0.", "Continue only while the index is valid and no match has been recorded.", "On a match save Index in Position; on a mismatch advance Index.", "Output Position after the search finishes.", "The specified search outputs 2, the first matching index.", "0 is outside the declared 1-based bounds, so it cannot be a valid match position.", "The bubble-sort pass produces [3,6,2,7].", "7 is the greatest value and each adjacent comparison moves it one position to the right until it reaches the end."], { commandWord: "write", ...answer("linear") }),
];
const subtitles = [
  "Types describe the permitted values and appropriate operations for each identifier.",
  "Related fields form one record while retaining their individual names and data types.",
  "Explicit indices and inclusive bounds make every array access precise.",
  "Retain an indexed sequence of values and process it with a complete loop.",
  "Use two independent indices to locate a value, then organise nested loops around the required totals.",
  "Inspect unsorted values in sequence and distinguish a matching position from absence.",
  "Build ascending order through adjacent comparisons while preserving every input value.",
  "Keep text between executions and choose file operations that preserve or replace the intended lines.",
  "An abstract specification defines the behaviour that every valid implementation must provide.",
  "Latest-first access supports undo histories and the return order of nested calls.",
  "Arrival order remains consistent even when a circular array reuses earlier positions.",
  "Node links maintain a logical sequence independently of physical storage order.",
  "Track active positions and reusable storage as operations change an array-backed structure.",
  "Combine indexed storage with the access rules needed by different parts of an application.",
];
const lessons = {};
function add(number, lesson) {
  lesson = completeSection10Lesson(number, lesson);
  const objectives = [...new Set(lesson.units.flatMap(u => u.objectiveIds))].sort().map(id => {
    const [, r, a] = id.match(/S10\.(\d+)\.A(\d+)/);
    return [id, objectiveText[r][Number(a) - 1]];
  });
  lessons[number] = { ...lesson, objectives, syllabusIds: [...new Set(objectives.map(([id]) => id.replace(/\.A\d+$/, "")))],
    practice: lesson.practice.map((q, i) => ({ ...q, id: `S10-L${String(number).padStart(2, "0")}-Q${i + 1}` })),
    authoredExamQuestions: lesson.exam.map((q, i) => ({ ...q, id: `S10-L${String(number).padStart(2, "0")}-EXAM-${i + 1}` })),
  };
}

// Detailed teaching precedes the worked example and a short exam recap.
function typeLessonUnit(key, heading, objectiveIds, { visual, teaching, workedExample, examPoints, misconception, checkpoint }) {
  return {
    ...unit(key, heading, objectiveIds, examPoints, [visual, workedExample], misconception, ...checkpoint),
    teachingBlocks: teaching,
  };
}

add(1, {
  guidingQuestion: "Which type represents each value and permits the required operations?",
  diagnostic: { prompt: "Should a telephone number be stored as INTEGER if it begins with 0?", answer: "Usually STRING: the digits form an identifier, leading zeros matter and arithmetic is not required." },
  units: [
    typeLessonUnit("TYPES-NUMBERS", "INTEGER and REAL: counts and measurements", ids(1, 1, 2), {
      visual: table("What values must the variable allow?", ["Quantity", "Possible values", "Suitable type"], [
        ["Number of pupils", "0, 1, 2, 3, ...", "INTEGER: whole pupils"],
        ["Change in a score", "-3, 0, 4", "INTEGER: whole-number changes"],
        ["Temperature in degrees Celsius", "-4.0, 18.6, 20.0", "REAL: fractional readings allowed"],
        ["Mass in kilograms", "0.3, 2.75, 5.0", "REAL: fractional measurements allowed"],
      ]),
      teaching: [
        paragraph("A data type describes permitted values and helps determine which operations are appropriate.", "Start with what the value means"),
        teachingList("Why a pupil count needs INTEGER", [
          ["Whole steps", "0, 1, 2, 3, ... represent complete pupils. Zero can represent an empty class."],
          ["A counterexample", "18.6 pupils cannot describe a count of people."],
          ["Negative whole numbers", "-3 is still a valid INTEGER; it can represent a score change."],
        ]),
        teachingSteps("The thermometer reads 20.0: choose the type", [
          ["Observe one reading", "The current value happens to be a whole number."],
          ["Read the requirement", "The sensor can also report fractional readings, such as 18.6."],
          ["Choose REAL", "The variable must allow every permitted reading, including future fractional values."],
        ]),
        teachingTable("Type validity and task validity are different", ["Value and context", "Decision and reason"], [
          ["-2 as an INTEGER value", "Valid: it is a whole number."],
          ["-2 as a pupil count", "Invalid for this task: a separate check must reject negative counts."],
          ["2.75 kilograms", "Use REAL when fractional kilograms must be retained."],
          ["2750 whole grams", "INTEGER suits a task that stores only whole numbers of grams."],
        ]),
        teachingList("Write REAL literals clearly", [
          ["Decimal point", "Write at least one digit on each side: 0.3, 20.0, -4.0."],
          ["Keep the distinction", "The sample value, measurement units and permitted precision each help explain the chosen type."],
        ]),
      ],
      workedExample: worked("Select types for a weather station", [
        ["Read the requirements", "SamplesTaken counts completed measurements. Temperature may include tenths of a degree, even when the current reading is 20 degrees."],
        ["Declare and initialise", "DECLARE SamplesTaken : INTEGER\nDECLARE Temperature : REAL\nSamplesTaken <- 0\nTemperature <- 20.0"],
        ["Record the next reading", "SamplesTaken <- SamplesTaken + 1\nTemperature <- 18.6"],
        ["Read the counter", "SamplesTaken is now 1: one completed measurement."],
        ["Read the temperature", "Temperature is now 18.6. REAL allows this fractional reading even though the previous reading was 20.0."],
      ]),
      examPoints: ["INTEGER stores whole numbers; REAL permits a fractional part.", "Justify the type using the task's permitted values, including future inputs."],
      misconception: "INTEGER is not limited to positive numbers. A whole-number example does not prove that a measured quantity should use INTEGER.",
      checkpoint: ["A sensor currently reads 12 degrees but can report tenths of a degree. Which type should store its readings, and why?", "REAL, because permitted future readings may contain a fractional part, such as 12.4. The current whole-number reading does not determine the type."],
    }),
    typeLessonUnit("TYPES-TEXT", "CHAR and STRING: characters, text and codes", ids(1, 3), {
      visual: table("The symbols and quotes change the meaning", ["Literal", "Type", "What it represents"], [
        ["7", "INTEGER", "A number used in arithmetic"],
        ["'7'", "CHAR", "One digit character"],
        ['"7"', "STRING", "A string of length 1"],
        ['"0072"', "STRING", "Four characters, including the leading zeros"],
        ['""', "STRING", "An empty string: zero characters"],
      ]),
      teaching: [
        paragraph("Choose CHAR for exactly one character; choose STRING for text that may be longer or empty.", "Choose from the text requirement"),
        teachingList("What counts as one character?", [
          ["A letter", "'A' can represent a shelf letter."],
          ["A digit or symbol", "'7' and '@' are characters too; CHAR is not limited to letters."],
          ["A space", "' ' contains one space. It is different from the empty string, which contains no characters."],
        ]),
        teachingTable("Read the quotes, then count the stored characters", ["Literal", "How to read it"], [
          ["'7'", "Single quotes identify CHAR. One character is stored; the quotes are delimiters."],
          ['"7"', "Double quotes identify STRING. Length 1 does not make this CHAR."],
          ["7", "Without quotes, this is an INTEGER value for arithmetic."],
          ['""', "A valid empty STRING. An empty value cannot satisfy the one-character CHAR requirement."],
        ]),
        teachingSteps("Choose a type for account code 0072", [
          ["Identify its purpose", "The digits identify an account; adding or multiplying the code is not required."],
          ["Preserve its representation", "All four characters matter. Treating the code as the integer 72 would lose the leading zeros."],
          ["Choose STRING", 'Store "0072" and explain the need to retain the complete identifier.'],
        ]),
      ],
      workedExample: worked("Keep a grade and an account code distinct", [
        ["Choose Grade's type", "Exactly one letter is required, so use CHAR."],
        ["Choose AccountCode's type", "All four characters must be retained, including leading zeros, so use STRING."],
        ["Declare and assign", "DECLARE Grade : CHAR\nDECLARE AccountCode : STRING\nDECLARE Message : STRING\nGrade <- 'A'\nAccountCode <- \"0048\"\nMessage <- \"\""],
        ["Read Grade and AccountCode", "Grade contains one character. AccountCode retains all four characters: 0048."],
        ["Read Message", "Message is an empty STRING: zero characters."],
        ["Spot a mismatch", "Grade <- \"AB\" supplies two characters to a CHAR variable."],
        ["Choose the correction", "Keep CHAR and supply 'A' for a one-letter requirement. Use STRING if the requirement allows two-letter grades."],
      ]),
      examPoints: ["CHAR holds one character; STRING holds zero or more.", "Use single quotes for CHAR literals and double quotes for STRING literals.", "Store codes with significant leading zeros as STRING."],
      misconception: "A digit character is not a number, and a STRING containing one character does not automatically become CHAR.",
      checkpoint: ["Identify the types of '4', \"4\", 4 and \"\". Which value cannot be stored in a CHAR variable because it contains no characters?", "They are CHAR, STRING, INTEGER and STRING respectively. The empty string \"\" contains zero characters; CHAR requires exactly one."],
    }),
    typeLessonUnit("TYPES-BOOLEAN", "BOOLEAN: store a logical state", ids(1, 4), {
      visual: table("Logical values and text labels", ["Value", "Type", "Meaning"], [
        ["TRUE", "BOOLEAN", "A logical condition holds"],
        ["FALSE", "BOOLEAN", "A logical condition does not hold"],
        ['"TRUE"', "STRING", "Four text characters"],
        ['"Yes"', "STRING", "A text label, not a BOOLEAN literal"],
      ]),
      teaching: [
        paragraph("A BOOLEAN stores the answer to one logical condition: TRUE or FALSE.", "Define the condition before storing its state"),
        teachingTable("Give the identifier a clear meaning", ["Condition being stored", "Meaning of its values"], [
          ["Paid: has payment been received?", "TRUE: received. FALSE: not received."],
          ["IsOpen: is the shop open?", "TRUE: open. FALSE: closed."],
          ["AlarmRaised: is the alarm active?", "TRUE: active. FALSE: inactive."],
        ]),
        teachingList("Separate the logical value from a display label", [
          ["TRUE or FALSE", "BOOLEAN literals have no quotes."],
          ['"TRUE" or "Yes"', "These are STRING literals. They may be screen labels, but they are not logical values."],
          ["1 or 0", "These are INTEGER literals; use TRUE and FALSE in Cambridge pseudocode."],
        ]),
        teachingSteps("Trace the confirmation state", [
          ["DECLARE Confirmed : BOOLEAN", "Create a variable of this type. No initial state is explicitly assigned."],
          ["Confirmed <- FALSE", "Set the starting state: confirmation has not been received."],
          ["Confirmed <- TRUE", "Update the state when confirmation arrives. The type remains BOOLEAN."],
        ]),
        paragraph("Pending, confirmed and cancelled are three different statuses. One BOOLEAN cannot distinguish all three; choose a representation with enough states.", "Check how many states the task needs"),
      ],
      workedExample: worked("Trace a booking's confirmation flag", [
        ["Declare the flag", "DECLARE Confirmed : BOOLEAN"],
        ["Before confirmation", "Confirmed <- FALSE"],
        ["After confirmation is received", "Confirmed <- TRUE\nOUTPUT Confirmed"],
        ["Trace the change", "Confirmed changes from FALSE to TRUE. OUTPUT displays TRUE; the type stays BOOLEAN."],
        ["Avoid a text value", "Confirmed <- \"TRUE\" supplies STRING, so it is incompatible with the declared BOOLEAN type."],
      ]),
      examPoints: ["BOOLEAN has exactly two values: TRUE and FALSE.", "BOOLEAN literals have no quotes; \"TRUE\" is STRING."],
      misconception: "FALSE is a stored logical value, not an empty value. Declaring a BOOLEAN does not explicitly initialise it to FALSE.",
      checkpoint: ["Paid is declared BOOLEAN. A student writes Paid <- \"FALSE\". What is wrong, and how should the assignment be written?", "\"FALSE\" is a STRING literal. Write Paid <- FALSE to store the BOOLEAN value without quotes."],
    }),
    typeLessonUnit("TYPES-DATE", "DATE: calendar values and their format", ids(1, 5), {
      visual: table("Interpret dates using the stated format", ["Example", "Interpretation", "Validity"], [
        ["09/04/2027 as DATE, dd/mm/yyyy", "9 April 2027", "Valid calendar date"],
        ["04/09/2027 as DATE, dd/mm/yyyy", "4 September 2027", "Valid, but a different date"],
        ["31/04/2027 as DATE, dd/mm/yyyy", "31 April 2027", "Invalid: April has 30 days"],
        ['"09/04/2027"', "Text containing ten characters", "STRING literal; not itself a DATE literal"],
      ]),
      teaching: [
        paragraph("DATE represents a valid calendar date, such as an appointment day or a book's return date.", "Store day, month and year as one date"),
        teachingList("Read 09/04/2027 using dd/mm/yyyy", [
          ["dd = 09", "The ninth day of the month."],
          ["mm = 04", "The fourth month: April."],
          ["yyyy = 2027", "The year. Together, the parts mean 9 April 2027."],
        ]),
        teachingSteps("Check a proposed date", [
          ["State the type", "Confirm that the value represents DATE, not just a sequence of text characters."],
          ["State the format", "Normally use dd/mm/yyyy in Cambridge pseudocode. Date conventions differ, so make the interpretation explicit."],
          ["Check the calendar", "31/04/2027 matches the pattern but is invalid: April has only 30 days."],
        ]),
        teachingTable("Similar appearance does not establish the same type", ["Representation", "What the program knows"], [
          ["09/04/2027 as DATE, dd/mm/yyyy", "A calendar value: 9 April 2027."],
          ['"09/04/2027" as STRING', "Ten text characters. Text input must be interpreted and checked before use as a date."],
          ["31/04/2027 as a proposed DATE", "No such calendar day exists. Changing the display format cannot make it valid."],
        ]),
      ],
      workedExample: worked("Record the date of a booking", [
        ["Specify the value", "The booking is for 9 April 2027. The following assignment uses a DATE literal in dd/mm/yyyy format."],
        ["Declare and assign", "DECLARE BookingDate : DATE\nBookingDate <- 09/04/2027"],
        ["Read the declaration", "BookingDate is a variable of type DATE."],
        ["Read the assignment", "09 is the day, 04 the month and 2027 the year. The stated format identifies 9 April 2027."],
        ["Check a proposed replacement", "Reject 31/04/2027: April has only 30 days. A correctly shaped value is not necessarily a valid date."],
      ]),
      examPoints: ["DATE represents a valid calendar date.", "State the date format explicitly; normally use dd/mm/yyyy."],
      misconception: "A value can match the dd/mm/yyyy pattern and still be an invalid calendar date. A quoted date-like value is a STRING literal.",
      checkpoint: ["Using dd/mm/yyyy, what date does 06/11/2027 represent? Why is 31/11/2027 invalid?", "06/11/2027 represents 6 November 2027. November has 30 days, so 31/11/2027 is not a valid calendar date."],
    }),
    typeLessonUnit("TYPES-DECLARATIONS", "Declarations and assignments: type, name and value", ids(1, 1, 2, 3, 4, 5), {
      visual: table("Trace one variable through three statements", ["Statement", "What it establishes or changes", "Seats afterwards"], [
        ["DECLARE Seats : INTEGER", "Identifier Seats; permitted type INTEGER", "No value explicitly assigned yet"],
        ["Seats <- 3", "Store the INTEGER value 3", "3"],
        ["Seats <- Seats + 1", "Read 3, calculate 4, then replace the old value", "4"],
      ]),
      teaching: [
        paragraph("Keep three things separate: the identifier names a variable, the type restricts its values, and assignment sets its current value.", "Name, type and current value"),
        teachingTable("Read DECLARE Seats : INTEGER", ["Part", "Role"], [
          ["DECLARE", "Introduces a variable."],
          ["Seats", "The identifier used to refer to this variable later."],
          [":", "Separates the identifier from its type."],
          ["INTEGER", "The declared type. No initial value has yet been explicitly assigned."],
        ]),
        teachingSteps("Trace Seats <- Seats + 1 when Seats is 3", [
          ["Read the right-hand value", "Seats currently contains 3."],
          ["Evaluate the expression", "3 + 1 gives 4."],
          ["Store on the left", "Replace the previous value in Seats with 4. The variable remains INTEGER."],
        ]),
        teachingTable("Spot and correct type mismatches", ["Assignment and declared type", "Decision"], [
          ['Seats <- "three"; Seats is INTEGER', "A STRING literal is incompatible. Use Seats <- 3 when the requirement is a whole count."],
          ['Confirmed <- "TRUE"; Confirmed is BOOLEAN', "Remove the double quotes: Confirmed <- TRUE stores a logical value."],
          ['Zone <- "AB"; Zone is CHAR', "Two characters do not fit CHAR. Use STRING only if the requirement now allows two-letter zones."],
        ]),
        teachingList("Before reading or updating a variable", [
          ["Initialise it", "Assign a starting value before reading it. DECLARE alone does not explicitly set zero or FALSE."],
          ["Interpret <- as an update", "Evaluate the right side, then store the result on the left; this is not a mathematical equality."],
        ]),
      ],
      workedExample: worked("Declare, assign and update a complete booking", [
        ["Read the booking fields", "Store a seat count, fractional fare, single zone letter, code with leading zeros, confirmation flag and booking date."],
        ["Declare the six variables", "DECLARE Seats : INTEGER\nDECLARE Fare : REAL\nDECLARE Zone : CHAR\nDECLARE BookingCode : STRING\nDECLARE Confirmed : BOOLEAN\nDECLARE BookingDate : DATE"],
        ["Assign initial values", "Seats <- 3\nFare <- 12.50\nZone <- 'C'\nBookingCode <- \"0072\"\nConfirmed <- FALSE\nBookingDate <- 09/04/2027"],
        ["Check the numbers", "Seats is a whole count. Fare allows fractional currency."],
        ["Check the text", "Zone holds one character. BookingCode retains four characters, including its leading zeros."],
        ["Check the state and date", "Confirmed stores FALSE. BookingDate stores 9 April 2027 as DATE in dd/mm/yyyy format."],
        ["Update two values", "Seats <- Seats + 1\nConfirmed <- TRUE\nOUTPUT Seats\nOUTPUT BookingCode\nOUTPUT Confirmed"],
        ["Read the outputs", "4, 0072 and TRUE appear on separate lines."],
        ["Identify the changes", "Seats changed from 3 to 4. Confirmed changed from FALSE to TRUE."],
        ["Identify what stayed the same", "BookingCode still contains 0072. Updating values has not changed any declared type."],
      ]),
      examPoints: ["Declare with DECLARE Identifier : Type before use.", "Assignment <- stores the right-hand result in the left-hand variable.", "Initialise before reading; assign values compatible with the declared type."],
      misconception: "A declaration specifies a type, not an initial value. Updating a variable changes its stored value, not its declared type.",
      checkpoint: ["After DECLARE Seats : INTEGER, Seats <- 2 and Seats <- Seats + 3, what are the identifier, type and current value?", "The identifier is Seats, its type remains INTEGER and its current value is 5. The final assignment reads 2, adds 3 and stores the result back in Seats."],
    }),
    typeLessonUnit("TYPES-STORAGE", "ARRAY and FILE: working values and saved data", ids(1, 6), {
      visual: table("One score, several scores, and scores for tomorrow", ["Requirement", "Construct", "Example"], [
        ["Hold one current score", "An INTEGER variable", "DECLARE Score : INTEGER"],
        ["Hold five indexed scores while processing", "An ARRAY of INTEGER", "DECLARE Scores : ARRAY[1:5] OF INTEGER"],
        ["Retain scores for another execution", "A file in persistent storage", "Scores.txt stores score lines that a later execution can read."],
      ]),
      teaching: [
        paragraph("A scalar holds one value. An array groups indexed elements. A file keeps saved data for later executions.", "Match the storage to the job"),
        teachingTable("Read DECLARE Scores : ARRAY[1:5] OF INTEGER", ["Part", "Meaning"], [
          ["Scores", "The identifier for the whole array."],
          ["[1:5]", "Inclusive lower and upper bounds: indices 1, 2, 3, 4 and 5."],
          ["OF INTEGER", "Each element has type INTEGER."],
          ["Scores[3]", "Selects the element at index 3, not the whole collection."],
        ]),
        teachingList("Keep indices and values separate", [
          ["ARRAY[1:5]", "Five elements. The declaration does not itself assign five score values."],
          ["ARRAY[0:9]", "Ten elements: both bounds count. Number of elements = upper bound - lower bound + 1."],
          ["Assign, then read", "Changing Scores[3] leaves other elements unchanged. Only read elements after values have been assigned."],
        ]),
        teachingSteps("Keep scores for the next execution", [
          ["During this run", "The array supplies working values. Declaring it does not save those values permanently."],
          ["Save the required data", "Write values to a file and close it. File operations transfer data to persistent storage."],
          ["During a later run", "Open the saved file and read the required values back into working variables."],
        ]),
        teachingTable("Choose the file mode", ["OPENFILE mode", "Effect"], [
          ["FOR WRITE", "Create a new file or replace all existing contents. Then use WRITEFILE to save each line."],
          ["FOR APPEND", "Keep existing contents and add new lines at the end using WRITEFILE."],
          ["FOR READ", "Open an existing file for input. Then use READFILE to retrieve each line."],
        ]),
        teachingTable("Distinguish the file from its name and operations", ["Item or operation", "Role"], [
          ['"Scores.txt"', "A STRING literal naming the file; it is not the stored scores themselves."],
          ['WRITEFILE "Scores.txt", "12"', "Write the text 12 as one line. Opening a file alone does not write any scores."],
          ['READFILE "Scores.txt", ScoreLine', "Read the next line into ScoreLine, declared as STRING. Reading again advances to the next line."],
          ['EOF("Scores.txt")', "TRUE means no unread lines remain. Check NOT EOF before each read; an empty file needs no reads."],
          ['CLOSEFILE "Scores.txt"', "Finish using the file. Close it before reopening in a different mode."],
        ]),
      ],
      workedExample: worked("Use an array, then write, append and read a text file", [
        ["Declare indexed working storage", "DECLARE Scores : ARRAY[1:5] OF INTEGER\nScores[1] <- 12\nScores[3] <- 18\nOUTPUT Scores[3]"],
        ["Read the selected element", "OUTPUT displays 18 from index 3. Index 1 holds 12."],
        ["Check the other positions", "Indices 2, 4 and 5 have no explicitly assigned values here, so the program does not read them."],
        ["Start the separate file example", "Save two scores as text lines. These programs demonstrate file storage separately from the INTEGER array above."],
        ["WRITE: create or replace the file", 'OPENFILE "Scores.txt" FOR WRITE\nWRITEFILE "Scores.txt", "12"\nWRITEFILE "Scores.txt", "18"\nCLOSEFILE "Scores.txt"'],
        ["Check the saved contents", "Scores.txt now contains 12 and 18 on separate lines. Any previous contents have been replaced."],
        ["APPEND: keep the saved scores and add one", 'OPENFILE "Scores.txt" FOR APPEND\nWRITEFILE "Scores.txt", "20"\nCLOSEFILE "Scores.txt"'],
        ["Check the extended file", "The lines are now 12, 18 and 20, in that order. APPEND retains the first two lines."],
        ["READ: reopen and display every saved line", 'DECLARE ScoreLine : STRING\nOPENFILE "Scores.txt" FOR READ\nWHILE NOT EOF("Scores.txt")\n    READFILE "Scores.txt", ScoreLine\n    OUTPUT ScoreLine\nENDWHILE\nCLOSEFILE "Scores.txt"'],
        ["Expected output from the reader", "12\n18\n20"],
        ["Trace the end of the loop", "After reading 20, EOF is TRUE. The loop stops before another READFILE, and the file closes."],
        ["Check what was loaded", "ScoreLine holds text, even when a line contains digits. READFILE does not automatically populate the INTEGER array."],
      ]),
      examPoints: ["ARRAY groups indexed elements of one specified type; bounds are inclusive.", "FILE retains saved data between runs; its quoted filename is STRING."],
      misconception: "Declaring an array does not save it to a file. A quoted filename identifies stored data; it is not the data itself.",
      checkpoint: ["What does DECLARE Reading : ARRAY[0:9] OF REAL provide, and does the declaration preserve readings after the program ends?", "It provides ten REAL elements, indexed 0 through 9. The declaration alone does not preserve values between executions; the program must save the required data, for example by writing it to a file."],
    }),
  ],
  practice: [
    question("State suitable types for a number of pupils and a measured temperature of 18.6 °C. Justify each choice.", ids(1, 1, 2), ["INTEGER suits a pupil count because only whole pupils are counted.", "REAL suits temperature because fractional degrees are permitted."], "A sample whole-number temperature does not exclude later fractional readings."),
    question("Write declarations and assignments for Grade containing the single letter A and AccountCode containing 0048.", ids(1, 3), ["DECLARE Grade : CHAR followed by Grade <- 'A'.", 'DECLARE AccountCode : STRING followed by AccountCode <- "0048".'], "Double quotes distinguish a string from a character literal."),
    question("State suitable types for IsOpen and an appointment date, and give one valid value for each. Use dd/mm/yyyy for the date.", ids(1, 4, 5), ["IsOpen has type BOOLEAN and may contain TRUE.", "The appointment has type DATE, for example 09/04/2027 in dd/mm/yyyy format."], "A BOOLEAN is not the text string \"TRUE\"."),
    question("Describe what DECLARE Prices : ARRAY[1:8] OF REAL creates and why a shop might also use a file.", ids(1, 6), ["Prices groups eight REAL elements accessed with indices 1 through 8.", "A file retains the prices so another execution can load them."], "An array declaration alone does not save data to secondary storage."),
  ],
  exam: [
    question("A weather station stores SamplesTaken, Rainfall in millimetres and AlarmRaised. State a suitable type for each and justify the type chosen for Rainfall.", ids(1, 1, 2, 4), ["SamplesTaken: INTEGER.", "Rainfall: REAL.", "AlarmRaised: BOOLEAN.", "Rainfall may contain a fractional number of millimetres."], "Select types for the permitted data, not just one example reading."),
    question("A library stores a shelf letter, an ISBN that may contain leading zeros, and a return date. Write a declaration for each and explain why the ISBN should not be INTEGER.", ids(1, 3, 5), ["DECLARE Shelf : CHAR.", "DECLARE ISBN : STRING.", "DECLARE ReturnDate : DATE.", "The ISBN is an identifier whose leading zeros must be preserved; arithmetic is not required."], "A calendar date needs DATE even if it is displayed using digits."),
    question("A logger uses DECLARE Reading : ARRAY[0:9] OF REAL and opens \"Log.txt\" FOR APPEND. Describe the role of the array, the role of the file, and the type of the literal \"Log.txt\".", ids(1, 6), ["Reading holds ten REAL values indexed 0 to 9 while the program processes them.", "The file retains logged values after the program terminates.", "\"Log.txt\" is a STRING literal naming the file."], "Do not confuse a filename with an array of file contents."),
  ],
  summary: [["Value types", "Choose types from permitted values and operations: counts, measurements, characters, text, logical states and dates."], ["Declarations", "Declare an identifier before using it and assign a value compatible with its type."], ["Collections and storage", "Arrays provide indexed elements; files retain data for later executions."]],
});

add(2, {
  guidingQuestion: "How can one identifier group named fields of different types?",
  diagnostic: { prompt: "Can one INTEGER array directly hold a member's name, year group and payment state?", answer: "No. Those values need different types; a record groups named fields of those types." },
  units: [
    unit("RECORD-DEFINITION", "Define a record type and declare a variable", ids(2, 1, 2), [
      "A record groups related fields, potentially of different data types, under one identifier. Each field has a name and its own type. A record for one member can therefore hold a STRING name, an INTEGER year group and a BOOLEAN payment state without losing their different meanings.",
      "TYPE MemberRecord introduces the record definition and ENDTYPE closes it. The DECLARE statements inside define its fields. DECLARE Member : MemberRecord then creates a variable of that type; defining the type alone does not create a member or supply values for its fields.",
    ], [table("Type, variable and fields", ["Name", "Role", "Type"], [["MemberRecord", "Definition of the structure", "User-defined record type"], ["Member", "One variable using the structure", "MemberRecord"], ["Member.Name", "Named field", "STRING"], ["Member.YearGroup", "Named field", "INTEGER"], ["Member.FeesPaid", "Named field", "BOOLEAN"]])],
    "A record is not restricted to one field type, and its field names are not array indices.", "What creates an actual Member variable?", "DECLARE Member : MemberRecord, after the record type has been defined."),
    unit("RECORD-ACCESS", "Read and save values using field names", ids(2, 3), [
      "Use dot notation to identify a field, for example Member.YearGroup. INPUT can save a new value directly into that field; an assignment can update it; OUTPUT reads its current value. Updating one field leaves the other fields unchanged.",
      "In the example, the name and current year group are inputs. FeesPaid is explicitly initialised to FALSE, and YearGroup increases by one. Saving data into a record means storing values in its fields. Keeping the record after the program finishes requires a separate file operation.",
    ], [table("Field operations", ["Statement", "Effect"], [["INPUT Member.Name", "Save entered text in Name"], ["Member.FeesPaid <- FALSE", "Store a logical value"], ["Member.YearGroup <- Member.YearGroup + 1", "Read, calculate and overwrite this field"], ["OUTPUT Member.Name", "Read and display Name"]]), example("record", "Create and update a member", "Input a member's name and current year group, initialise payment to FALSE, and display the promoted member's fields.", "Inputs Mina and 11 produce Mina, 12 and FALSE, on separate output lines.")],
    "Member <- \"Mina\" would assign text to the whole record; Member.Name <- \"Mina\" identifies the STRING field.", "After FeesPaid changes to TRUE, does Name change?", "No. Assigning the FeesPaid field does not overwrite the Name field."),
  ],
  practice: [
    question("Explain why a record suits one product with a description, price and in-stock flag. State a suitable type for each field.", ids(2, 1), ["It groups related product fields under one identifier while allowing different field types.", "Description uses STRING, Price uses REAL and InStock uses BOOLEAN."], "Do not describe an array as allowing arbitrary element types."),
    question("Write pseudocode to define ProductRecord with Description : STRING and Price : REAL, then declare Product of that type.", ids(2, 2), ["TYPE ProductRecord starts the record definition.", "DECLARE Description : STRING and DECLARE Price : REAL define its fields.", "ENDTYPE ends the definition; DECLARE Product : ProductRecord creates a variable."], "The variable declaration belongs after ENDTYPE.", { answerCode: "TYPE ProductRecord\n    DECLARE Description : STRING\n    DECLARE Price : REAL\nENDTYPE\nDECLARE Product : ProductRecord", answerLanguage: "text" }),
    question("State all outputs from the supplied member algorithm for input Tariq and 9 and explain which statement saves a BOOLEAN into the record.", ids(2, 3), ["The outputs are Tariq, 10 and FALSE.", "Member.FeesPaid <- FALSE saves the BOOLEAN value in the FeesPaid field."], "The increment affects YearGroup, not the name.", supplied("record")),
  ],
  exam: [
    question("A vehicle record needs Registration, Mileage in whole kilometres and Electric. Define VehicleRecord with suitable types and declare Car of that type.", ids(2, 1, 2), ["TYPE VehicleRecord and ENDTYPE enclose the fields.", "Registration is declared STRING.", "Mileage is declared INTEGER (whole kilometres in this system).", "Electric is declared BOOLEAN.", "DECLARE Car : VehicleRecord creates the record variable."], "The mileage unit is whole kilometres; use the types stated for this system.", { answerCode: "TYPE VehicleRecord\n    DECLARE Registration : STRING\n    DECLARE Mileage : INTEGER\n    DECLARE Electric : BOOLEAN\nENDTYPE\nDECLARE Car : VehicleRecord", answerLanguage: "text" }),
    question("Car has fields Registration : STRING, Mileage : INTEGER and Electric : BOOLEAN. Write statements to input the registration, save 12000 into Mileage, save TRUE into Electric, and display Mileage.", ids(2, 3), ["INPUT Car.Registration.", "Car.Mileage <- 12000.", "Car.Electric <- TRUE.", "OUTPUT Car.Mileage."], "Use field access for each operation, rather than replacing the whole record."),
    question("A pupil claims that TYPE defines one stored member, and that Member.Name <- \"Jo\" saves the member permanently. Explain both errors.", ids(2, 1, 2, 3), ["TYPE defines a reusable structure; a separate DECLARE creates a variable using it.", "The assignment changes only the Name field of the existing record variable.", "Persistence between executions requires writing data to a file."], "Do not confuse a record variable in a running program with persistent storage."),
  ],
  summary: [["Structure", "A record combines named fields whose types can differ, all under one identifier."], ["Definition and use", "Define the type with TYPE and ENDTYPE, then declare a variable of that type."], ["Access", "Dot notation selects a field for input, assignment or output; file storage is a separate operation."]],
});

add(3, {
  guidingQuestion: "Which indices select valid elements, and how many elements exist?",
  diagnostic: { prompt: "Does ARRAY[3:7] contain seven elements?", answer: "No. Both bounds are inclusive, so it contains 7 − 3 + 1 = 5 elements." },
  units: [
    unit("ARRAY-TERMS", "Distinguish the array, an element and an index", ids(3, 1), [
      "An array is a collection of elements of the same data type, stored under one identifier. An index selects a particular element. In Ages[4], Ages names the array and 4 is the index; the value stored in that element might be 17 and is independent of its index.",
      "A one-dimensional array uses one index. A two-dimensional array uses two indices to locate each element. The element type applies to every position, and a declared element must receive a value before an algorithm relies on that value.",
    ], [table("Ages : ARRAY[3:7] OF INTEGER", ["Index", "3", "4", "5", "6", "7"], [["Stored value", "15", "17", "16", "15", "18"]]), worked("Read and replace one element", [["Read", "Ages[4] is 17. The index is 4, not 17."], ["Assignment", "Ages[4] <- Ages[3] + 3 replaces 17 with 18 at index 4 and leaves Ages[3] unchanged."], ["Result", "Only the selected element is overwritten; the declared bounds remain 3 and 7."]])],
    "An index is a position selector, not the data value stored at that position.", "In Ages[6] = 15, which number is the index?", "6 is the index; 15 is the stored value."),
    unit("ARRAY-BOUNDS", "Use inclusive lower and upper bounds", ids(3, 2), [
      "The lower bound is the smallest permitted index and the upper bound is the largest. For inclusive bounds L and U, the number of elements is U − L + 1. Cambridge declarations specify these bounds explicitly; an array does not always start at zero or one.",
      "A complete traversal visits each permitted index and stops before exceeding the upper bound. Accessing an out-of-range index is invalid. In two dimensions, both indices must satisfy their own bounds, and capacity is the product of the two dimension lengths.",
    ], [table("Check capacity and access", ["Declaration", "Capacity", "Valid and invalid access"], [["ARRAY[0:4] OF STRING", "5", "0 and 4 valid; 5 invalid"], ["ARRAY[3:7] OF INTEGER", "5", "3 and 7 valid; 2 invalid"], ["ARRAY[1:2, 0:3] OF REAL", "2 × 4 = 8", "[2,3] valid; [2,4] invalid"]])],
    "The upper bound is not necessarily the element count, especially when the lower bound is not 1.", "How many elements are in ARRAY[2:4, 5:8]?", "(4 − 2 + 1) × (8 − 5 + 1) = 3 × 4 = 12."),
  ],
  practice: [
    question("For Ages : ARRAY[3:7] OF INTEGER with values 15, 17, 16, 15, 18 in index order, identify the array name, the index in Ages[5], and its stored value.", ids(3, 1), ["The array name is Ages.", "The index is 5 and the stored value is 16."], "Keep position and value distinct."),
    question("Calculate the capacity of ARRAY[−2:2] OF INTEGER and state whether indices −3, 0 and 2 are valid.", ids(3, 2), ["2 − (−2) + 1 = 5 elements.", "−3 is invalid; 0 and 2 are valid."], "Inclusive bounds can be negative."),
    question("Grid is ARRAY[1:3, 0:4] OF CHAR. State its number of dimensions, total capacity and the two upper bounds.", ids(3, 1, 2), ["It has two dimensions and holds 3 × 5 = 15 CHAR elements.", "The upper bounds are 3 for the first index and 4 for the second."], "Do not add the dimension lengths to calculate capacity."),
  ],
  exam: [
    question("DECLARE Reading : ARRAY[5:12] OF REAL is followed by Reading[8] <- 6.4. Identify the lower bound, upper bound, selected index and stored value.", ids(3, 1, 2), ["The lower bound is 5.", "The upper bound is 12.", "The assignment selects index 8.", "The selected element stores 6.4."], "Bounds describe allowed positions; they are not measured readings."),
    question("A loop accesses Values[Index] for every Index from 1 to 6, but Values is declared ARRAY[0:5] OF INTEGER. Identify the missed element and invalid access, then give the correct traversal bounds.", ids(3, 2), ["Values[0] is missed.", "Values[6] is outside the declared bounds.", "Iterate from 0 to 5 inclusive."], "Changing only the last iteration still leaves the first element unvisited."),
    question("A screen map is ARRAY[2:6, 4:9] OF BOOLEAN. Calculate its capacity and explain why Map[6,10] is invalid even though the first index is valid.", ids(3, 1, 2), ["The dimension lengths are 5 and 6, giving 30 BOOLEAN elements.", "The second index 10 exceeds its upper bound of 9.", "Both indices must be valid to select an element."], "Validate each dimension independently."),
  ],
  summary: [["Terminology", "The array name identifies the collection; an index selects an element containing a value."], ["Bounds", "Inclusive bounds give U − L + 1 positions, and every index must remain within its dimension's limits."]],
});

add(4, {
  guidingQuestion: "When is one index enough, and how do we process every element?",
  diagnostic: { prompt: "A program records one mark for each of four tests. How many indices identify a mark?", answer: "One: the test number. A 1D array is suitable." },
  units: [
    unit("ONE-DIMENSION-CHOICE", "Use one index for one independent position", ids(4, 1), [
      "Choose a one-dimensional array when one index identifies each item, such as a test number selecting one mark. The declaration must provide enough positions and an element type suitable for all values. For four whole-number marks, DECLARE Marks : ARRAY[1:4] OF INTEGER gives one element per test.",
      "An array retains individual values for later indexed access. If a task requires only a running total, a total variable alone may be enough; retaining an array is justified when later processing needs the original marks, for example displaying the third test mark after all inputs have been read.",
    ], [table("Match a task to a position", ["Task", "One index represents", "Suitable declaration"], [["Four test marks", "Test number", "Marks : ARRAY[1:4] OF INTEGER"], ["Seven daily rainfall totals", "Day number", "Rainfall : ARRAY[1:7] OF REAL"], ["Ten pupil names", "Pupil position", "Names : ARRAY[1:10] OF STRING"]])],
    "A long list is still one-dimensional if each element is selected using one index.", "Why retain marks after calculating their total?", "The program may later need an individual mark, such as Marks[3], without asking for the input again."),
    unit("ONE-DIMENSION-CODE", "Input, store and total a 1D array", ids(5, 1), [
      "Initialise Total once before the traversal. Each iteration inputs a value into Marks[Index], then adds that same element to Total. FOR Index <- 1 TO 4 visits both bounds, and NEXT Index closes the count-controlled loop. No DO keyword is used in this FOR form.",
      "Keeping the final OUTPUT after the loop produces one total for all four elements. OUTPUT Marks[3] then demonstrates that the third value remains available. Moving Total <- 0 inside the loop would discard the contributions from earlier elements.",
    ], [table("Trace inputs 6, 9, 4, 7", ["Index", "Marks[Index]", "Total after addition"], [[1, 6, 6], [2, 9, 15], [3, 4, 19], [4, 7, 26]]), example("arrayTotal", "Store four marks and report their total", "Read four INTEGER marks into a 1D array. Display their total, followed by the third mark.", "Inputs 6, 9, 4, 7 produce 26 and 4.")],
    "INPUT Value without saving Value into the indexed element does not populate the array.", "What total would the example produce if Total were reset immediately before every addition?", "Only the final mark, 7, would remain in Total."),
  ],
  practice: [
    question("A club stores one attendance count for each of 12 meetings. Select a structure and write its declaration.", ids(4, 1), ["A 1D array is suitable because meeting number selects one count.", "DECLARE Attendance : ARRAY[1:12] OF INTEGER."], "The number of meetings determines capacity, not the number of dimensions."),
    question("State the Total after each iteration and both outputs from the supplied array-total algorithm for inputs 5, 0, 8, 2.", ids(5, 1), ["The successive totals are 5, 5, 13 and 15.", "The outputs are 15 and 8."], "The second output reads index 3, not the final element.", supplied("arrayTotal")),
    question("Write pseudocode to input four INTEGER marks into Marks[1:4], then output their total and the third mark. Explain where Total is initialised.", ids(5, 1), ["Declare the array and INTEGER Index and Total.", "Set Total to zero before a FOR loop from 1 to 4.", "Input Marks[Index] and add it to Total on each iteration.", "After NEXT Index, output Total and Marks[3]."], "Initialise the accumulator outside the loop.", answer("arrayTotal")),
  ],
  exam: [
    question("A sensor stores eight fractional pressure readings and later displays reading 6. Select and declare an appropriate array, and write the statement that displays the requested value.", ids(4, 1), ["Use a one-dimensional array because reading number alone identifies a value.", "DECLARE Pressure : ARRAY[1:8] OF REAL.", "OUTPUT Pressure[6]."], "Measured pressures may need a fractional part."),
    question("Write pseudocode to input four REAL masses into Mass[1:4] and output the largest. All inputs may be negative in a calibration test.", ids(5, 1), ["Declare a REAL array, INTEGER index and REAL largest value.", "Read all four elements using their valid indices.", "Initialise Largest from Mass[1].", "Compare elements 2 to 4 and replace Largest only for a greater value.", "Output Largest after completing the comparisons."], "Initialising the maximum to zero fails when all readings are negative.", answer("arrayMaximum")),
    question("The array Cost[1:3] contains 2.5, 4.0 and 1.5. An algorithm sets Total to 0 inside its loop immediately before adding Cost[Index]. State its final Total and describe the correction needed to obtain the sum.", ids(5, 1), ["Its final Total is 1.5 because previous additions are erased.", "Initialise Total once before iterating from 1 to 3.", "The corrected final sum is 8.0."], "Adding another output does not repair the misplaced initialisation."),
  ],
  summary: [["Selection", "Use a 1D array when one index identifies every retained value."], ["Traversal", "Input or process each indexed element within the declared bounds and initialise a total before the loop."], ["Count and extremes", "A conditional count adds one per match. Initialise maximum and minimum from an actual element, including for all-negative data."]],
});

add(5, {
  guidingQuestion: "How do two indices identify a value and control nested iteration?",
  diagnostic: { prompt: "Two pupils each take three tests. What identifies one score?", answer: "Both the pupil and the test are needed, so a 2D array is appropriate." },
  units: [
    unit("TWO-DIMENSION-CHOICE", "Assign a meaning to each dimension", ids(4, 1), [
      "Choose a two-dimensional array when two independent positions identify an element. In Scores[Row, Column], let rows represent pupils and columns represent tests. DECLARE Scores : ARRAY[1:2, 1:3] OF INTEGER stores six scores, with the first index selecting the pupil and the second selecting the test.",
      "Rows run horizontally across a displayed table and columns vertically down it. Scores[2,3] is the second pupil's third test score, not the third pupil's second test. State each dimension's meaning before writing code so every reference uses the same convention.",
    ], [diagramFor("matrix")],
    "A displayed table does not reverse the index order: use the declared row, column convention consistently.", "In the diagram, what value is Scores[1,2]?", "7: row 1, column 2."),
    unit("TWO-DIMENSION-CODE", "Traverse rows with a nested loop", ids(5, 1), [
      "The outer loop chooses Row; the inner loop visits every Column for that row. With ascending bounds, the visit order is (1,1), (1,2), (1,3), then (2,1), (2,2), (2,3). The column loop restarts from 1 for each new row, so the second row is not traversed backwards.",
      "RowTotal is reset at the start of each outer iteration because each row needs a separate total. Input and addition occur inside the inner loop, while OUTPUT RowTotal occurs after NEXT Column but before NEXT Row. To calculate column totals, choose a column in the outer loop and vary the row in the inner loop instead.",
    ], [table("Row totals for the diagram", ["Row", "Values visited", "RowTotal"], [[1, "4, 7, 2", 13], [2, "8, 1, 6", 15]]), example("array2D", "Input six scores and output two row totals", "Input two rows of three INTEGER scores using ascending row and column indices. Display one total per row.", "Inputs 4, 7, 2, 8, 1, 6 produce 13, then 15.")],
    "A single reset before both loops would produce a cumulative total instead of a separate total for each row.", "Which outputs result if RowTotal is reset only once before both loops?", "13 and then 28, because row 2 would include row 1's total."),
  ],
  practice: [
    question("A cinema has 6 rows of 10 seats and records whether each seat is occupied. Select and declare an array and explain the two indices.", ids(4, 1), ["DECLARE Occupied : ARRAY[1:6, 1:10] OF BOOLEAN.", "The first index selects the row and the second the seat within that row."], "Each element is a logical occupancy state, not a seat count."),
    question("State the positions visited and both outputs from the supplied 2D algorithm for inputs 2, 3, 5, 1, 0, 4.", ids(5, 1), ["The positions are [1,1], [1,2], [1,3], [2,1], [2,2], [2,3].", "The row totals output are 10 and 5."], "The inner loop restarts at column 1.", supplied("array2D")),
    question("Write pseudocode to input a 2 by 3 INTEGER array Scores and output a separate total for each row.", ids(5, 1), ["Declare the 2D array, loop indices and row total.", "Loop over rows 1 to 2 and reset RowTotal within that outer loop.", "Loop over columns 1 to 3, input Scores[Row, Column] and accumulate it.", "Output each completed row total after the inner loop."], "Do not output a partial total for every cell.", answer("array2D")),
  ],
  exam: [
    question("An air-quality table stores a REAL reading for each of 4 locations at each of 24 hours. Give a suitable declaration, state the capacity, and write an assignment that stores 18.5 for location 3 at hour 0.", [...ids(4, 1), ...ids(5, 1)], ["DECLARE Reading : ARRAY[1:4, 0:23] OF REAL.", "The array contains 4 × 24 = 96 elements.", "Reading[3, 0] <- 18.5."], "The hour index starts at 0 in this declaration."),
    question("Write pseudocode to input two rows of three INTEGER values into Sales[1:2,1:3], then output a total for each column.", ids(5, 1), ["Declare the array, two INTEGER indices and a total.", "Use nested loops to input all six indexed values.", "For each column 1 to 3, initialise Total to zero.", "Add Sales[Row, Column] for rows 1 to 2 while holding Column fixed.", "Output the total once for each completed column."], "A column total varies the row index.", answer("columnTotals")),
    question("A matrix contains rows [3, 8, 1] and [4, 2, 9]. State the outputs when each column is totalled, then explain why resetting Total inside the inner row loop gives incorrect results.", ids(5, 1), ["The three column totals are 7, 10 and 10.", "Resetting inside the row loop discards the first row's contribution.", "That faulty version outputs only 4, 2 and 9."], "Column totals combine values at the same column index across rows."),
  ],
  summary: [["Dimensions", "Define what each index means; rows are horizontal and columns are vertical."], ["Nested loops", "The inner loop completes before the outer index advances; both indices stay within their own bounds."], ["Totals", "Reset once per required group and output only after that group's elements have been accumulated."]],
});

add(6, {
  guidingQuestion: "How can a search inspect every permitted element and report absence safely?",
  diagnostic: { prompt: "Must an array be sorted before a linear search?", answer: "No. Linear search compares elements one by one and works on unsorted data." },
  units: [
    unit("LINEAR-METHOD", "Compare each element with the search value", ids(6, 1), [
      "A linear search checks elements sequentially against a target value. This version searches a 1-based five-element array, reports the first matching index and uses 0 to mean not found. The sentinel is valid because 0 is outside the declared array bounds.",
      "Index begins at the lower bound. A mismatch advances it by one; a match saves the current index in Position. The next loop condition stops once Position is nonzero or Index exceeds 5. Array access occurs inside the guarded loop body, so an unsuccessful search never reads Values[6].",
    ], [table("Search [9, 4, 6, 4, 2] for 4", ["Index checked", "Value", "Decision"], [[1, 9, "Mismatch: advance"], [2, 4, "Match: Position = 2, stop"]]), flow("Linear search procedure", [["Initialise", "Set Index to the lower bound and Position to 0."], ["Continue", "Repeat while Index is in range and no match has been saved."], ["Compare", "Save Index when Values[Index] equals Target; otherwise advance Index."], ["Report", "Output the saved position or the not-found sentinel."]])],
    "The first matching index is not the target value, and duplicate target values do not require this version to continue.", "What is returned when 4 occurs at indices 2 and 4?", "2, because this algorithm stops at the first match."),
    unit("LINEAR-CODE", "Trace found and not-found paths", ids(6, 1), [
      "The complete algorithm first inputs five values and a target, then initialises the search state. Position starts at 0 for each new search, preventing a previous result from being mistaken for the result of this target. The loop conditions refer only to scalar state; they do not depend on short-circuit evaluation to protect an array subscript.",
      "Test a match at the first position, a match at the final position, an absent target and repeated matching values. An absent target causes five comparisons and finishes with Index equal to 6 and Position still 0. A match at index 5 leaves Position at 5 and performs no sixth comparison.",
    ], [table("Boundary checks", ["Target for [9,4,6,4,2]", "Comparisons", "Output"], [[9, 1, 1], [2, 5, 5], [7, 5, 0], [4, 2, 2]]), example("linear", "Search a five-element array", "Read five INTEGER values and a target; output the first matching index or 0 if absent.", "Inputs 9, 4, 6, 4, 2 followed by target 4 output 2; target 7 instead outputs 0.")],
    "Stopping at Index < 5 misses the last element; continuing through Index = 6 exceeds the upper bound.", "What changes after a mismatch at index 5?", "Index becomes 6. The loop ends before any further array access, and Position remains 0."),
  ],
  practice: [
    question("State the visited indices and output from the supplied search for values 8, 3, 5, 3, 1 and target 3.", ids(6, 1), ["It visits indices 1 and 2.", "It outputs 2, the first matching position."], "The output is a position, not the stored value 3.", supplied("linear")),
    question("Using the supplied search, describe what happens for values 8, 3, 5, 3, 1 and target 6.", ids(6, 1), ["All five valid elements are compared without a match.", "Index then becomes 6 and the loop condition prevents another access.", "Position remains 0, so the output is 0."], "Do not access Values[6] to decide whether the search is finished.", supplied("linear")),
    question("Write a complete linear search that inputs five INTEGER values and a target, then outputs the first matching 1-based index or 0 if absent.", ids(6, 1), ["Declare and input the array and target.", "Initialise the index to 1 and result to 0.", "Continue only while the index is in range and no match has been found.", "Save a matching index; otherwise advance the index.", "Output the result after the loop."], "A result sentinel must lie outside the valid index range.", answer("linear")),
  ],
  exam: [
    question("The supplied linear search reads 11, 7, 9, 2, 6 and target 6. State the final Index, final Position and number of comparisons, and explain why a condition Index < 5 would be wrong.", ids(6, 1), ["Final Index is 5 and final Position is 5.", "Five element comparisons are made.", "Index < 5 would stop before comparing the last value, losing this valid match."], "Use the inclusive upper bound when checking the last position.", supplied("linear")),
    question("A 0-based array uses indices 0 to 4. A linear search returns 0 both for a first-element match and for absence. Identify the ambiguity and propose a corrected result convention.", ids(6, 1), ["A result of 0 cannot distinguish a valid match at index 0 from not found.", "Return the matching index and use −1 for absence, since −1 is outside the valid bounds.", "Alternatively use a separate BOOLEAN Found together with a position valid only when Found is TRUE."], "Changing the array bounds is unnecessary; correct the result convention."),
    question("A search of unsorted codes [21, 8, 30, 4, 17] stops after the first element greater than target 4. Explain why this is incorrect and describe the stopping rules for a correct first-match linear search.", ids(6, 1), ["21 being greater than 4 gives no information about later elements in unsorted data.", "The target 4 occurs later, at index 4.", "Stop after a match or after every valid element has been checked."], "Do not introduce an ordering assumption into linear search."),
  ],
  summary: [["Search rule", "Compare sequentially and stop at the first match or after the final permitted element."], ["Result", "Return an index for a match and an unambiguous sentinel for absence."], ["Safety", "Guard the array access with valid bounds and test both end positions, duplicates and absence."]],
});

add(7, {
  guidingQuestion: "How do adjacent swaps produce an ordered array without losing values?",
  diagnostic: { prompt: "To swap Left and Right, is Left <- Right followed by Right <- Left sufficient?", answer: "No. The first assignment loses the original Left value; save it in a temporary variable first." },
  units: [
    unit("BUBBLE-PASSES", "Trace adjacent comparisons and complete passes", ids(6, 2), [
      "An ascending bubble sort compares neighbouring elements from left to right and swaps them if the left value is greater. After the first full pass, the largest value is at the final position. Further passes repeat the process over the remaining unsorted prefix.",
      "Every swap preserves both original values: save the left value in Temp, copy the right value into the left position, then copy Temp into the right position. The diagram records the state after each pass, always with exactly seven elements. Equal adjacent values need no swap.",
    ], [diagramFor("bubble"), flow("Bubble sort procedure", [["Compare neighbours", "For Index from 1 to Last − 1, compare Values[Index] with Values[Index + 1]."], ["Swap completely", "Use Temp to preserve the original left value before either position is overwritten."], ["Shorten the prefix", "Reduce Last because the greatest remaining value is now fixed at the right."], ["Stop", "Finish when a pass makes no swaps or the unsorted prefix has one element."]])],
    "A bubble-sort pass is a sequence of adjacent comparisons, not a direct swap of the smallest and largest values.", "What is the rightmost value after the first diagram pass?", "8, the greatest input value."),
    unit("BUBBLE-CODE", "Use a swap flag and a shrinking bound", ids(6, 2), [
      "Last starts at the upper bound and Swapped starts TRUE so the first pass runs. Reset Swapped to FALSE at the start of each pass and set it TRUE only when a swap occurs. A completed pass with no swaps proves that the remaining adjacent pairs are already ordered.",
      "The inner loop stops at Last − 1 because it also accesses Index + 1. Reducing Last after each pass avoids comparing the sorted suffix again. For the diagram input, pass 3 creates the sorted order; pass 4 makes no swaps and terminates this implementation. Final outputs occur after sorting has finished.",
    ], [table("Control state for the diagram input", ["Pass", "Last before pass", "Comparisons", "Swapped after pass"], [[1, 7, 6, "TRUE"], [2, 6, 5, "TRUE"], [3, 5, 4, "TRUE"], [4, 4, 3, "FALSE"]]), example("bubble", "Sort seven input values", "Input seven INTEGER values, use ascending bubble sort and output every sorted element.", "5, 1, 4, 2, 8, 3, 7 become 1, 2, 3, 4, 5, 7, 8.")],
    "Failing to reset Swapped once per pass prevents the flag from detecting an already ordered prefix.", "What happens for seven values that are already ascending?", "The first pass makes six comparisons, no swaps, and the loop stops."),
  ],
  practice: [
    question("State the array after each adjacent comparison in one left-to-right ascending bubble-sort pass on [6, 2, 5, 1].", ids(6, 2), ["Compare 6 and 2: [2, 6, 5, 1].", "Compare 6 and 5: [2, 5, 6, 1].", "Compare 6 and 1: [2, 5, 1, 6]."], "Use the updated array for the next adjacent comparison."),
    question("Write the three assignments that swap Values[Index] and Values[Index + 1], using Temp. Explain the purpose of Temp.", ids(6, 2), ["Temp <- Values[Index].", "Values[Index] <- Values[Index + 1].", "Values[Index + 1] <- Temp.", "Temp retains the original left value so the first overwrite does not lose it."], "Both original values must survive the swap."),
    question("Explain where Swapped is reset in the supplied bubble sort, when it becomes TRUE, and why the inner upper bound is Last − 1.", ids(6, 2), ["Swapped is reset to FALSE at the start of every pass.", "An actual adjacent swap sets it TRUE.", "Index + 1 must be no greater than Last, so Index stops at Last − 1."], "A swap flag records this pass, not whether any earlier pass swapped values.", supplied("bubble")),
  ],
  exam: [
    question("An ascending bubble sort starts with [4, 3, 2, 1]. Give the array after each completed pass until sorted and state which suffix is fixed after pass 2.", ids(6, 2), ["After pass 1: [3, 2, 1, 4].", "After pass 2: [2, 1, 3, 4].", "After pass 3: [1, 2, 3, 4].", "After pass 2 the final two values, 3 and 4, are fixed in their sorted positions."], "Record complete passes, not individual comparisons."),
    question("Write complete pseudocode using Values[0:4] to input five INTEGER values, sort them in descending order using adjacent swaps, and output every value. Stop early after a pass without swaps. State the output for inputs 4, -1, 4, 0, 2. Do not change the declared bounds or discard repeated values.", ids(6, 2), ["Declare Values as ARRAY[0:4] OF INTEGER, declare the scalar variables, and input indices 0 to 4.", "Initialise Last to 4 and Swapped to TRUE.", "While Last > 0 and Swapped, reset Swapped and compare indices 0 through Last - 1.", "When Values[Index] < Values[Index + 1], preserve and exchange both values using Temp.", "Set Swapped TRUE after a swap and reduce Last once per completed pass.", "Output indices 0 to 4 after sorting: 4, 4, 2, 0, -1."], "Descending order reverses the comparison, not the meaning of the array bounds; both copies of 4 must remain.", answer("bubbleDescending")),
    question("A bubble-sort implementation compares Values[Index] with Values[Index + 1] for Index from 1 to Last, and resets Swapped inside every inner iteration. Explain one fault caused by each choice.", ids(6, 2), ["At Index = Last it accesses Values[Last + 1], beyond the active prefix and possibly beyond the array.", "Use an inner upper bound of Last − 1.", "Resetting the flag for each pair can erase an earlier swap when the last pair needs no swap.", "Reset the flag once per pass so it records whether any pair was swapped."], "The flag describes the whole pass, not only the final comparison."),
  ],
  summary: [["Ordering", "Adjacent swaps move the greatest remaining value to the end of the unsorted prefix."], ["Preservation", "A temporary variable makes a swap preserve both values and the array length."], ["Termination", "Reduce the active bound each pass and stop early when a complete pass makes no swaps."]],
});
add(8, {
  guidingQuestion: "How can a program retain text and process every stored line?",
  diagnostic: { prompt: "If a program terminates, will its array automatically be available at the next run?", answer: "No. Data needed later must be saved to persistent storage, for example a file." },
  units: [
    unit("FILE-PERSISTENCE", "Select the correct file mode", ids(7, 1), [
      "Files retain data on secondary storage so it can be reused after a program terminates or transferred to another program. Keeping names only in variables or arrays does not provide this persistence. A text file stores a sequence of lines that can be processed in order.",
      "OPENFILE selects how a program will use the named file. READ permits reading existing lines. WRITE creates a file or replaces existing contents. APPEND adds at the end while retaining existing contents. Select the mode from the task: replacing a report and extending a log require different modes.",
    ], [table("Choose a mode before opening", ["Task", "Mode", "Effect on existing contents"], [["Load a saved register", "READ", "Preserved"], ["Create a replacement report", "WRITE", "Replaced"], ["Add one log entry", "APPEND", "Preserved; new line added at end"]])],
    "WRITE is not interchangeable with APPEND when old lines must remain.", "Which mode extends an existing attendance log?", "APPEND, because earlier entries must be retained."),
    unit("FILE-READ", "Read lines with an end-of-file check", ids(7, 2), [
      "After OPENFILE in READ mode, check EOF before each READFILE. READFILE copies the next line into a STRING variable and advances the file position. EOF becomes TRUE when there are no further lines to read. CLOSEFILE finishes access after the loop.",
      "A blank line is still a line and can be read as an empty string. It is different from reaching the end of the file. The example outputs and counts every line, including blank ones. For an empty file, the loop body is skipped and the count remains zero.",
    ], [table("Read Names.txt containing three lines", ["Read number", "Line value", "Count after read"], [[1, '"Ari"', 1], [2, '"" (blank line)', 2], [3, '"Bo"', 3]]), example("readFile", "Display and count stored lines", "Read all lines of Names.txt, output each one, close the file and output the number read.", "For Ari, a blank line and Bo, the outputs are Ari, an empty line, Bo and then 3. An empty file outputs only 0.")],
    "Line = \"\" does not prove EOF; a blank line may be followed by more data.", "Why is EOF tested before READFILE?", "To prevent attempting to read a line when no unread line remains."),
    unit("FILE-WRITE", "Write a new file and append a line", ids(7, 2), [
      "WRITEFILE writes the supplied STRING as a line in an open text file. The complete example opens Names.txt FOR WRITE, inputs three lines, writes each line and closes the file. Existing contents are replaced, so this operation suits creating a fresh list.",
      "To extend that list, use APPEND instead. Input a new line, open the same file FOR APPEND, write the line and close the file. Closing completes the file operation and releases the file. When copying between files, use different names so opening the output FOR WRITE cannot erase the input.",
    ], [table("Fresh list and later extension", ["Step", "Mode / operation", "File lines afterwards"], [["Existing file", "Contains Old", "Old"], ["Write inputs Ada, Ben, Cy", "WRITE then three WRITEFILE calls", "Ada; Ben; Cy"], ["Later append Dia", "APPEND then one WRITEFILE call", "Ada; Ben; Cy; Dia"]]), example("writeFile", "Create a three-line file", "Input exactly three strings and save them as the replacement contents of Names.txt.", "Inputs Ada, Ben and Cy replace any old contents with those three lines."), { ...worked("Append one additional line", [["Pseudocode", codeFor("appendFile")], ["Result", "Input Dia adds a fourth line after Ada, Ben and Cy."]]), programKey: "appendFile", preserve: true }],
    "Opening the output FOR WRITE inside the loop repeatedly replaces the file; open it once before writing the sequence.", "What would happen if APPEND were changed to WRITE in the extension example?", "The earlier names would be replaced and only the new line would remain."),
  ],
  practice: [
    question("Explain why an attendance system saves a file at the end of a session. Select modes for loading yesterday's register and adding today's new entry.", ids(7, 1), ["The file retains attendance data for later executions.", "Use READ to load yesterday's register.", "Use APPEND to add an entry while preserving existing lines."], "Persistence and retaining old lines are separate decisions."),
    question("State every output from the supplied line-counting algorithm for a file whose lines are Red, an empty line, and Blue and explain why the blank line does not end the loop.", ids(7, 2), ["It outputs Red, an empty line, Blue, then 3.", "EOF tests whether another line exists; an empty STRING value can be a valid stored line."], "Do not confuse a blank line with end of file.", supplied("readFile")),
    question("Write complete pseudocode to replace Names.txt with exactly three input lines, including opening and closing the file.", ids(7, 2), ["Declare a STRING line variable and INTEGER loop index.", "Open Names.txt FOR WRITE once before the loop.", "Repeat input and WRITEFILE for three iterations.", "Close Names.txt after the loop."], "The write command must include both the filename and the line value.", answer("writeFile")),
    question("Write pseudocode to append one input line to Names.txt without losing its existing contents.", ids(7, 2), ["Input a STRING value into Line.", "Open Names.txt FOR APPEND.", "Use WRITEFILE to write Line, then CLOSEFILE."], "READ mode cannot be used to write the new line.", answer("appendFile")),
  ],
  exam: [
    question("A program rewrites a daily report but must also retain all earlier entries in a cumulative log. State a suitable mode for each file and explain why the two modes differ.", ids(7, 1), ["Use WRITE for the daily report because its previous contents are to be replaced.", "Use APPEND for the cumulative log because earlier entries must remain.", "Both files retain information beyond the lifetime of the program's variables."], "A replacement report and a cumulative log have different retention requirements."),
    question("Write pseudocode to copy all non-empty lines from Names.txt to NonEmpty.txt, replacing any old output file. Preserve line order, close both files and handle an empty input file.", ids(7, 2), ["Declare a STRING line variable and open Names.txt FOR READ.", "Open the different output file NonEmpty.txt FOR WRITE.", "Check NOT EOF before each READFILE.", "Read the next input line into Line.", "Write Line only when Line <> \"\", preserving the read order.", "Close both files after the loop; empty input produces an empty output file."], "The output filename must differ from the input filename.", answer("filterFile")),
    question("A student opens Results.txt FOR WRITE before each of three WRITEFILE commands for A, B and C, closing after each command. State the final contents, explain the fault and describe the correction for writing all three lines.", ids(7, 2), ["Only the line C remains.", "Each new OPENFILE FOR WRITE replaces the previous contents.", "Open once before the three writes and close once afterwards."], "The problem is repeated replacement, not EOF checking."),
  ],
  summary: [["Persistence and modes", "Files preserve data between runs; READ loads, WRITE replaces, and APPEND extends stored text."], ["Reading", "Check EOF before each read and distinguish an empty string line from the end of the file."], ["Writing", "Open the intended output once, write every required line and close it after processing."]],
});

add(9, {
  guidingQuestion: "What does an ADT specify independently of its storage implementation?",
  diagnostic: { prompt: "Is a list of stored values enough to define a stack?", answer: "No. Its permitted operations and LIFO removal rule are also part of the definition." },
  units: [
    unit("ADT-CONTRACT", "Define the data and operations together", ids(8, 1), [
      "An abstract data type is a collection of data together with a set of operations on those data. The specification describes what each operation does and any conditions for using it. For example, a stack specifies adding at the top and removing the most recently added item.",
      "The word abstract separates observable behaviour from representation. A user of an ADT needs to know which item a removal returns and how empty or full conditions are handled. The user does not need to know the array position or pointer updates that implement the operation.",
    ], [table("A specification includes behaviour", ["Part", "Stack example"], [["Data", "An ordered collection of items"], ["Addition", "PUSH adds an item at the top"], ["Removal", "POP returns and removes the top item"], ["Condition", "POP requires a non-empty stack"]]), worked("Describe an ADT without choosing storage", [["Operation sequence", "Start empty, then PUSH Red; PUSH Blue; POP."], ["Required result", "POP returns Blue and leaves Red in the stack."], ["Abstraction", "This result is required whether the implementation uses an array or linked nodes."]])],
    "Naming a structure or listing its stored items does not specify the permitted operations.", "Which two parts must an ADT definition contain?", "The collection of data and the operations defined on those data."),
    unit("ADT-REPRESENTATION", "Separate an interface from its implementation", ids(8, 1), [
      "An implementation chooses concrete storage and procedures that satisfy the ADT's rules. An array implementation may use extra INTEGER variables to track active positions. Those variables are implementation details; changing them must not change the specified order in which clients receive data.",
      "A bounded implementation also needs defined behaviour when storage is full or empty. Rejecting a removal from an empty collection prevents an invalid access. Replacing an array implementation with another representation is acceptable only if valid operations still produce the specified results.",
    ], [table("Specification versus implementation", ["Statement", "Level"], [["Remove the earliest item still waiting", "Queue ADT behaviour"], ["Store items in Slots[1:20]", "Array implementation"], ["Front gives the next removal position", "Representation convention"], ["Reject removal when empty", "Operation condition"]])],
    "An array is a possible representation; its arbitrary indexed access does not automatically become part of every ADT's interface.", "Can changing the backing array make a queue return the newest item first?", "No. That would change FIFO behaviour and violate the queue specification."),
  ],
  practice: [
    question("Define an abstract data type and illustrate both parts using a queue.", ids(8, 1), ["An ADT specifies a collection of data together with operations on it.", "A queue contains ordered waiting items; enqueue adds at the rear and dequeue removes the front item."], "Include operations, not only the word collection."),
    question("Identify whether each statement describes ADT behaviour or an implementation detail: pop removes the newest item; items occupy Array[1:10]; Top stores an index.", ids(8, 1), ["Removing the newest item specifies stack behaviour.", "The array bounds and Top index describe an implementation."], "An implementation variable is not itself the abstract removal rule."),
    question("Two stack implementations receive PUSH 2, PUSH 5, POP. One returns 5 and the other returns 2. Explain whether both satisfy the same stack ADT.", ids(8, 1), ["Only the implementation returning 5 satisfies the required LIFO result.", "Storage may differ, but changing observable removal order changes the ADT behaviour."], "Abstraction does not mean that any result is acceptable."),
  ],
  exam: [
    question("A collection offers AddToRear and RemoveFromFront. Explain what must be specified about these operations before a programmer can use the collection without seeing its code.", ids(8, 1), ["AddToRear places a new item after items already waiting.", "RemoveFromFront returns and removes the earliest remaining item.", "The specification must state how invalid operations such as removal from an empty collection are handled."], "Array positions alone do not explain the operation contract."),
    question("A programmer replaces an array-backed queue with linked nodes. State two observable properties that must remain unchanged for clients of the queue ADT.", ids(8, 1), ["Successful removals still return items in their arrival order.", "Enqueue and dequeue retain their specified effects, including the documented handling of empty removal."], "The physical node addresses are not an observable queue ordering rule."),
    question("A description says only 'the ADT stores A, B and C in cells 1, 2 and 3'. Explain why this does not fully define an ADT, and give a missing operation rule that would distinguish a stack from a queue.", ids(8, 1), ["The description gives stored data and locations but omits the defined operations.", "For additions A then B then C, a stack's next removal returns C.", "A queue's next removal returns A."], "The same values can support different ADTs when their access rules differ."),
  ],
  summary: [["Definition", "An ADT specifies both its data and the operations that act on those data."], ["Abstraction", "Clients rely on operation behaviour; representations may change while preserving that behaviour."]],
});

add(10, {
  guidingQuestion: "How does a stack preserve last-in, first-out access?",
  diagnostic: { prompt: "Edits A, B and C are made in that order. Which edit should Undo reverse first?", answer: "C, the most recent edit. That reversal order matches a stack." },
  units: [
    unit("STACK-BEHAVIOUR", "Use LIFO for nested or reversible work", ids(9, 1), [
      "A stack is a last-in, first-out structure. PUSH adds an item at the top; POP removes and returns the top item. A peek operation, if provided, reads the top item without removing it. Items below the top wait until the items above them have been removed.",
      "Undo history and nested subroutine calls fit this access order. The latest action is undone first, and the most recent unfinished call returns before an earlier call resumes. Choose a stack because of that ordering requirement, rather than merely because the task stores several items.",
    ], [diagramFor("stack"), worked("Follow an undo history", [["Add actions", "Start empty, then PUSH Insert; PUSH Bold; PUSH Delete."], ["Undo twice", "The two POP operations return Delete, then Bold."], ["Remaining state", "Insert remains at the top; a peek reads it without deleting it."]])],
    "Removing the earliest action first would be FIFO and would not implement this undo rule.", "After PUSH A, PUSH B, POP, PUSH C, which item is popped next?", "C; B has already been removed and C is now the newest item."),
    unit("STACK-ARRAY", "Track the active top in an array", [...ids(10, 1), ...ids(10, 4)], [
      "In this 1-based array model, Top is the index of the last occupied element; Top = 0 means empty. To push, check that Top is below capacity, increase Top and store the new item at that position. To pop, check that Top is above zero, read the top value and decrease Top.",
      "Editing the top item changes its stored value without changing Top. Access to a deeper item must follow the permitted interface, for example temporarily popping the items above it and restoring them in reverse removal order. Removing an item does not require erasing its old cell; positions above Top are inactive.",
    ], [table("Capacity 3; Top identifies the last occupied cell", ["Operation / condition", "State change"], [["Push into Top = 2", "Set Top to 3 and store at Stack[3]"], ["Pop from Top = 3", "Return Stack[3]; set Top to 2"], ["Edit the top", "Overwrite Stack[Top]; Top unchanged"], ["Empty / full", "Top = 0 / Top = 3"]])],
    "Deleting an arbitrary middle cell and leaving a gap does not preserve this stack representation.", "Does POP need to clear the old array cell?", "No. Decreasing Top excludes the old cell from the active stack; the next push can overwrite it."),
  ],
  practice: [
    question("A stack receives PUSH 7, PUSH 4, POP, PUSH 9, POP. State both returned values and the remaining stack.", ids(9, 1), ["The first POP returns 4 and the second returns 9.", "Only 7 remains."], "Read the operations in order; a popped item is no longer active."),
    question("A stack uses Stack[1:4] and Top as the last occupied index. Top is 2 with values A, B. Describe pushing C, editing the top to D, then popping it.", ids(10, 1, 4), ["Increase Top to 3 and store C at Stack[3].", "Replace Stack[3] with D without changing Top.", "Return D and decrease Top to 2, leaving A and B active."], "An edit does not add another element."),
    question("Explain why a stack suits nested subroutine return information, and state the empty condition for the Top convention used in this lesson.", [...ids(9, 1), ...ids(10, 4)], ["The latest unfinished subroutine must return before its caller continues, matching LIFO.", "Top = 0 identifies an empty 1-based stack in this model."], "State the chosen Top convention rather than assuming every implementation uses the same one."),
  ],
  exam: [
    question("A drawing application records Move, Rotate and Resize in that order. It undoes two actions and then records Colour. State the two actions undone, the next action Undo would reverse, and justify the structure.", ids(9, 1), ["Resize is undone first, then Rotate.", "The next Undo reverses Colour.", "A stack provides the required removal of the most recently recorded action."], "The new Colour action becomes the top of the active undo stack."),
    question("A stack has capacity 5 and Top = 5, with Top denoting the last occupied index. Describe the response to another push, then give the returned position and new Top for a valid pop.", ids(10, 1, 4), ["The stack is full, so reject the push without overwriting existing data.", "The pop reads and returns Stack[5].", "Top becomes 4, leaving positions 1 to 4 active."], "Do not increase Top to an out-of-range index."),
    question("A stack contains A, B, C from bottom to top. Its interface permits only push and pop. Describe how to change B to X while preserving the order of the other items.", ids(10, 1), ["Pop C and retain it temporarily.", "Pop B, then push X as its replacement.", "Push the saved C back, producing A, X, C from bottom to top."], "Direct middle access is not available through the stated interface."),
  ],
  summary: [["LIFO", "Push and pop act at the top, so the latest remaining item is removed first."], ["Array state", "With this convention, Top = 0 is empty and Top = capacity is full."], ["Edits", "Change values only through permitted access and preserve the order of any temporarily removed items."]],
});

add(11, {
  guidingQuestion: "How does a queue preserve arrival order when array positions are reused?",
  diagnostic: { prompt: "Jobs A, B and C arrive in that order at a first-come, first-served printer. Which is removed first?", answer: "A, the earliest job still waiting. This is FIFO." },
  units: [
    unit("QUEUE-BEHAVIOUR", "Add at the rear and remove from the front", ids(9, 2), [
      "A queue is a first-in, first-out structure. ENQUEUE adds at the rear and DEQUEUE removes and returns the front item. A new arrival joins behind the items already waiting, so serving the front preserves arrival order.",
      "A first-come, first-served print queue or service desk suits FIFO. The requirement concerns waiting items: a job already removed is no longer in the queue. An ordinary FIFO queue does not automatically move a later urgent job ahead of earlier arrivals; that would require different scheduling rules.",
    ], [table("Service order", ["Operation", "Front → rear", "Returned"], [["ENQUEUE P; ENQUEUE Q", "P, Q", "—"], ["DEQUEUE", "Q", "P"], ["ENQUEUE R", "Q, R", "—"], ["DEQUEUE", "R", "Q"]]), worked("Serve arrivals without reordering", [["Arrivals", "Start with an empty queue. Requests 12, 15 and 18 join the rear in that order."], ["Service", "Two dequeues return 12, then 15."], ["Later arrival", "Enqueue 21 leaves 18 at the front and 21 at the rear."]])],
    "A queue does not remove the newest arrival first; that is stack behaviour.", "After A is served and C joins behind B, which item is next?", "B remains at the front and is served before C."),
    unit("QUEUE-ARRAY", "Use front, rear and count consistently", [...ids(10, 2), ...ids(10, 4)], [
      "This circular array implementation uses Front for the next removal position, Rear for the last occupied insertion position, and Count for the number of active items. Initially Front = 1, Rear = 0 and Count = 0. A successful enqueue advances Rear with wrap-around, stores the item and increases Count; a dequeue reads Front, advances it with wrap-around and decreases Count.",
      "Count = 0 means empty and Count = capacity means full. Wrapping from the final index back to 1 reuses positions released by earlier dequeues. An allowed edit changes an active item's value without changing its arrival position or Count. Reading or editing an inactive cell must not turn it into a waiting item.",
    ], [diagramFor("queue")],
    "Physical array order need not equal FIFO order after wrapping; begin at Front and follow the circular positions.", "In the final diagram state, what are the next three dequeue results?", "B, C, D: start at Front = 2, then use indices 3 and 1."),
  ],
  practice: [
    question("A queue receives ENQUEUE 6, ENQUEUE 2, DEQUEUE, ENQUEUE 9, DEQUEUE. State both returned values and the remaining item.", ids(9, 2), ["The dequeues return 6 and then 2.", "9 remains waiting."], "Remove the earliest item still present."),
    question("A circular queue has capacity 3 with Front = 2, Rear = 3, Count = 2; indices 2 and 3 hold B and C. Describe enqueueing D.", ids(10, 2, 4), ["Rear wraps from 3 to 1 and D is stored at index 1.", "Count becomes 3 and Front remains 2.", "The logical order is B, C, D."], "Wrapping does not make D the next item to be served."),
    question("An allowed edit changes a queued job's filename without changing its position. State which data changes and which of Front, Rear and Count change. Explain why FIFO is preserved.", [...ids(9, 2), ...ids(10, 2, 4)], ["Only the filename stored in the selected active item changes.", "Front, Rear and Count remain unchanged.", "The job remains in the same arrival position, so dequeue order is preserved."], "Editing a value is not the same operation as removing and re-enqueueing a job."),
  ],
  exam: [
    question("Three patients arrive at an appointment desk in order Kim, Lee, Mo. The desk serves Kim, then Pat joins. State the order of the next three services and justify a suitable ADT for the stated first-come, first-served rule.", ids(9, 2), ["The next services are Lee, Mo and Pat, in that order.", "A queue adds Pat at the rear and removes the earliest waiting patient from the front.", "FIFO therefore preserves the arrival order of the remaining patients."], "No priority rule has been specified; do not introduce one."),
    question("A circular queue uses indices 1 to 4. Front = 4, Rear = 2 and Count = 3; positions 4, 1, 2 hold J, K, L. State the returned value and final pointers, count and logical order after one dequeue followed by enqueue M.", ids(10, 2, 4), ["Dequeue returns J and wraps Front to 1; Count becomes 2.", "Enqueue advances Rear to 3 and stores M there.", "Final Front = 1, Rear = 3 and Count = 3.", "The logical order is K, L, M."], "Advance the pointer belonging to the operation being performed."),
    question("A capacity-4 circular queue has Count = 4. Explain how it should handle an enqueue, then describe how an allowed edit of the front item's value differs from a dequeue.", ids(10, 2, 4), ["Reject enqueue because all four positions are active; do not overwrite a waiting item.", "An edit overwrites the value at Front but leaves Front and Count unchanged.", "A dequeue returns and removes that item, advances Front and decreases Count."], "A full queue may still permit an in-place value edit."),
  ],
  summary: [["FIFO", "Enqueue at the rear and dequeue from the front to preserve arrival order."], ["Circular storage", "Wrap indices to reuse space and use Count to distinguish empty and full states."], ["Logical order", "Read active items from Front, even when their array positions wrap around."]],
});

add(12, {
  guidingQuestion: "How do links preserve a sequence when nodes occupy different array positions?",
  diagnostic: { prompt: "If the head node is at index 2 and its link is 4, which node comes next?", answer: "The node at index 4, regardless of which node occupies index 3." },
  units: [
    unit("LINKED-FEATURES", "Represent a sequence using nodes and links", ids(9, 3), [
      "A linked list contains nodes, each holding data and a link to the next node. A head pointer identifies the first node. In the model used here, a link value of 0 means no next node; Head = 0 represents an empty list. The last active node has a null link.",
      "Logical order is determined by links, not by consecutive storage positions. Follow the head and successive links to traverse the list. A linked list suits a sequence that needs insertions or deletions between neighbours because changing links can avoid shifting every following data item, although locating the required node may still require traversal.",
    ], [diagramFor("linked"), worked("Traverse a non-contiguous list", [["Start", "Head = 2, so read Data[2] = A."], ["Follow links", "Next[2] = 4 gives B; Next[4] = 1 gives C."], ["Stop", "Next[1] = 0 ends traversal. The output order is A, B, C."]])],
    "A link identifies the next node; it is not the data stored in that node.", "Why is array slot 3 skipped in the starting diagram?", "No active link points to it. It is a free slot, not part of the list."),
    unit("LINKED-OPERATIONS", "Update data and links without losing nodes", [...ids(10, 3), ...ids(10, 4)], [
      "An array implementation can store Data[Index] and Next[Index] for each node, plus Head and information about unused slots. To insert X at free slot 3 after node 2 in the diagram, first store X and set Next[3] to the old successor 4. Then set Next[2] to 3. The sequence becomes A, X, B, C.",
      "Editing a node's data leaves its links unchanged. Deleting a middle node makes its predecessor point to the deleted node's successor, then returns the removed slot to the available storage. Deleting the head updates Head instead. The programmer must preserve access to the successor before changing links, or the remaining chain can become unreachable.",
    ], [table("Operations on the starting A → B → C list", ["Operation", "Required change", "Result"], [["Insert X in slot 3 after A", "Data[3] = X; Next[3] = 4; Next[2] = 3", "A → X → B → C"], ["Edit B to Y (separate case)", "Data[4] = Y; links unchanged", "A → Y → C"], ["Delete B (separate case)", "Next[2] = Next[4] = 1; release slot 4", "A → C"], ["Delete head A (separate case)", "Head = Next[2] = 4; release slot 2", "B → C"]])],
    "Deleting a node means removing it from the active link chain; simply blanking its data leaves a broken logical item.", "When B is deleted from the starting list, what must Next[2] become?", "1, the index of B's successor C."),
  ],
  practice: [
    question("Head = 3. Data[1] = B, Next[1] = 0; Data[2] = unused; Data[3] = A, Next[3] = 1. State the traversal order and explain why slot 2 is ignored.", ids(9, 3), ["Traversal visits indices 3 then 1, producing A then B.", "Slot 2 is not reachable by following the active links from Head."], "Do not traverse in increasing physical index order."),
    question("In the lesson's starting diagram, insert X at free slot 3 after A. State the data assignment and both link changes, in a safe order.", ids(10, 3, 4), ["Store X in Data[3].", "Set Next[3] to 4, A's original successor.", "Set Next[2] to 3, making the new node reachable after A."], "Preserve the original successor before overwriting its link."),
    question("Using the starting diagram, describe editing C to Z and then deleting head A. State the final head and data order.", ids(10, 3, 4), ["Change Data[1] to Z without changing Next[1].", "Set Head to Next[2] = 4 and release slot 2.", "The remaining list traverses B then Z."], "An edit changes a value; deletion changes reachability."),
  ],
  exam: [
    question("A playlist frequently inserts a track between two existing tracks. Explain one advantage of a linked list and one reason finding a named track can still take several steps.", ids(9, 3), ["Once the insertion point is known, updating neighbour links inserts a node without shifting all later tracks.", "The required track may need to be found by following links and checking node data sequentially."], "Do not claim that every linked-list access is direct indexed access."),
    question("A linked list has Head = 4, links 4 → 2 → 5 → 0, and free slot 1. Describe inserting a node containing R at the head, then deleting the old node 2. State the final link chain.", ids(10, 3, 4), ["Store R in Data[1] and set Next[1] to the old Head, 4.", "Set Head to 1.", "To delete node 2, set Next[4] to Next[2], which is 5, and release slot 2.", "The final chain is 1 → 4 → 5 → 0."], "The predecessor of node 2 remains node 4 after the head insertion."),
    question("An array-backed linked list contains one node at slot 3, with Head = 3 and Next[3] = 0. Describe deleting this node and state how both the active list and free storage change.", ids(10, 3, 4), ["Set Head to 0, the deleted node's successor.", "The active list is now empty.", "Return slot 3 to the available slots so a later insertion can reuse it."], "An empty list has no reachable data node, even if old bytes remain in the array."),
  ],
  summary: [["Nodes and links", "A head pointer and next links determine sequence order independently of physical positions."], ["Insertion and deletion", "Preserve the successor chain while relinking neighbours and update Head when the first node changes."], ["Array representation", "Store node data and link indices in arrays and track unused slots for later insertions."]],
});

add(13, {
  guidingQuestion: "Which representation rules must remain true after an ADT operation?",
  diagnostic: { prompt: "Does an old value left in an unused array cell still belong to an ADT?", answer: "No. Membership is determined by the active range, queue state or reachable link chain, not by old bytes alone." },
  units: [
    unit("IMPLEMENT-BOUNDS", "Check active positions when an array is reused", ids(10, 1, 2, 4), [
      "An array-backed stack and queue can contain inactive cells whose old values are still visible in memory. For a stack with Top as the last occupied index, only positions 1 through Top are active. For a circular queue, Count active positions begin at Front and wrap through the array; Rear identifies the last one when Count is positive.",
      "Check representation state before adding, editing or deleting. A full structure cannot accept another item without a specified capacity change; an empty structure cannot supply an item. Value edits preserve membership and order, whereas push/pop or enqueue/dequeue change membership and must update the corresponding state variables.",
    ], [table("Capacity 4; old cell values are not membership", ["Structure", "Given state", "Active cells / valid next operation"], [["Stack", "Top = 2; cells A, B, old-C, old-D", "1, 2 active; push writes at 3"], ["Circular queue", "Front = 3; Rear = 1; Count = 3", "3, 4, 1 active; enqueue writes at 2"], ["Empty stack", "Top = 0", "No active cells; reject pop"], ["Full queue", "Count = 4", "All cells active; reject enqueue"]]), worked("Check an edit against active membership", [["Given", "Capacity 4. Three items A, B and C occupy slots 3, 4 and 1 in FIFO order; the next removal is at 3."], ["Edit", "Changing the value at slot 4 to X preserves the active order A, X, C and all three state variables."], ["Invalid position", "Slot 2 is inactive. Writing there alone does not enqueue an item because Rear and Count were not updated."]])],
    "Storing a value in a spare array cell is not a complete ADT addition; the representation must make that cell active.", "A stack has Top = 2. Does editing Stack[4] edit an existing stack item?", "No. Position 4 is outside the active stack."),
    unit("IMPLEMENT-FREE-LIST", "Track free nodes separately from the active list", ids(10, 3, 4), [
      "A fixed array implementation of a linked list needs a way to find unused nodes. One method links unused positions into a free list with its own Free head pointer. Active and free chains must not share nodes. A null Free pointer means the array has no available slot for another insertion.",
      "To allocate a node, take the position identified by Free and advance Free to that node's old free link before reusing the link for the active chain. To release a deleted node, remove it from the active chain first, link it to the current free head and make it the new Free head. This reuses storage without shifting surviving node data.",
    ], [table("Allocate, then release; null = 0", ["State", "Active chain", "Free chain"], [["Initially", "2 → 4 → 0", "1 → 3 → 0"], ["Insert slot 1 after 2", "2 → 1 → 4 → 0", "3 → 0"], ["Delete slot 4", "2 → 1 → 0", "4 → 3 → 0"]]), worked("Move a node between chains", [["Allocate", "Save slot 1 from Free; advance Free from 1 to 3; set Next[1] to 4 and Next[2] to 1."], ["Delete slot 4", "Set Next[1] to 0 so slot 4 is no longer active."], ["Release", "Set Next[4] to the old Free value 3, then set Free to 4. The two chains remain disjoint."]])],
    "Returning a node to the free list before unlinking it from the active list can make both lists use the same slot.", "Why must the old free link be saved before an allocated node's Next field is overwritten?", "Otherwise the remaining free nodes may become unreachable, losing track of available capacity."),
  ],
  practice: [
    question("A capacity-5 stack has Top = 3. Describe one pop followed by editing the new top; state which positions remain active.", ids(10, 1, 4), ["Read Stack[3] and decrease Top to 2.", "Edit Stack[2] without changing Top.", "Only positions 1 and 2 remain active."], "The old content at position 3 does not remain a stack member."),
    question("A capacity-5 circular queue has Front = 4, Rear = 1 and Count = 3. State its active positions, the position used by the next enqueue and the full condition.", ids(10, 2, 4), ["The active positions are 4, 5 and 1.", "The next enqueue uses position 2 and increases Count to 4.", "The queue is full only when Count = 5."], "Rear < Front does not imply that the queue is empty."),
    question("Initially the active chain is 2 → 4 → 0 and the free chain is 1 → 3 → 0. Allocate slot 1 after node 2, then delete node 4. State both final chains and explain why they must be disjoint.", ids(10, 3, 4), ["The final active chain is 2 → 1 → 0.", "The final free chain is 4 → 3 → 0.", "Sharing a node would allow an insertion to overwrite an active item's storage."], "Move a node out of its old chain before adding it to the other chain."),
  ],
  exam: [
    question("A stack uses indices 1 to 6 and Top = 0. A proposed pop reads Stack[Top] and then decreases Top. Explain the fault and state what the implementation must do instead.", ids(10, 1, 4), ["The stack is empty and index 0 is outside its declared element bounds.", "Reject the pop before reading the array.", "Leave Top at 0 and report the defined empty-stack outcome."], "Decreasing an empty stack's pointer makes its representation invalid."),
    question("A queue has capacity 4, Front = 4, Rear = 1 and Count = 2. A pupil claims that cells 1 through Rear are the entire active queue. Explain the error in this claim and describe one dequeue and one enqueue using this state.", ids(10, 2, 4), ["The active positions are 4 then 1, not only position 1.", "Dequeue reads position 4, wraps Front to 1 and makes Count = 1.", "Enqueue then uses position 2, sets Rear = 2 and restores Count = 2."], "Derive membership from Front and Count, not from a linear prefix ending at Rear."),
    question("A linked-list array has active chain 3 → 1 → 0 and free chain 2 → 4 → 0. Describe inserting free node 2 at the tail, then deleting head node 3 and returning it to the free list. State both final chains.", ids(10, 3, 4), ["Allocate node 2 and advance Free to 4.", "Set Next[1] to 2 and Next[2] to 0.", "Delete the head by setting Head to 1.", "Set Next[3] to 4 and Free to 3.", "Final active chain: 1 → 2 → 0; final free chain: 3 → 4 → 0."], "A link's meaning changes from free-chain successor to active-chain successor when the node is allocated."),
  ],
  summary: [["Active state", "Pointers and counts define which array cells belong to the structure; old cell contents do not."], ["Operation checks", "Test full, empty and active-position conditions before changing data or representation state."], ["Free storage", "Keep active and free linked-list chains disjoint when allocating or releasing a node."]],
});

add(14, {
  guidingQuestion: "How can several structures serve different access needs in one system?",
  diagnostic: { prompt: "Must a booking system choose one structure for all its data and operations?", answer: "No. Indexed seats, pending requests and undo history have different access requirements." },
  units: [
    unit("COMBINE-INDEXED", "Choose dimensions for retained application data", ids(4, 1), [
      "Separate the values the application must retain from the order in which it processes actions. A theatre can store one occupancy flag per row and seat in a 2D BOOLEAN array. A separate 1D INTEGER array can store one booking total per performance, because performance number alone identifies each total.",
      "Describe the meaning and bounds of each dimension explicitly. Occupied[Row, Seat] uses two indices; Bookings[Performance] uses one. The declaration should follow the data's actual indexing needs. Adding dimensions simply because a system is large creates an unnecessary or misleading model.",
    ], [diagramFor("choice"), worked("Choose two arrays for a theatre", [["Seat data", "DECLARE Occupied : ARRAY[1:8, 1:12] OF BOOLEAN stores one flag for each of 96 seats."], ["Performance totals", "DECLARE Bookings : ARRAY[1:6] OF INTEGER stores six totals."], ["Access", "Occupied[3, 7] selects row 3, seat 7; Bookings[2] selects the total for performance 2."]])],
    "The number of different kinds of data is not the number of array dimensions; dimensions describe independent indices.", "What additional index is needed if occupancy for all six performances must be retained?", "Performance must also be represented. The stated 2D occupancy array holds one performance at a time; a separate per-performance arrangement would be needed."),
    unit("COMBINE-ACCESS", "Justify each ADT by its operation order", ids(9, 1, 2, 3), [
      "The same theatre can use a queue for booking requests processed in arrival order and a stack for reversing the most recent completed edits. A linked list can represent a running order of acts that frequently receives insertions between known neighbours. Each choice follows a specific access or update requirement.",
      "Explain how the structures cooperate: dequeue a request, use its row and seat to access the occupancy array, and push an undo record containing the previous state after a successful change. The request queue and undo stack contain different items and have different removal orders. Merely naming all three ADTs does not justify a design.",
    ], [table("Theatre responsibilities", ["Responsibility", "Structure", "Justification"], [["Waiting booking requests", "Queue", "Earliest waiting request processed next"], ["Completed seat edits to reverse", "Stack", "Latest completed edit reversed first"], ["Running order of acts", "Linked list", "Insert between known neighbours by relinking"]]), worked("Follow one booking through the structures", [["Before", "Queue front is request R for row 3, seat 7; Occupied[3,7] is FALSE."], ["Process", "Dequeue R, check the seat and change Occupied[3,7] to TRUE."], ["Undo information", "Push an undo record holding row 3, seat 7 and previous value FALSE; a later undo restores that previous value."]])],
    "An undo record must preserve the old state; storing only the new state may not provide enough information to reverse the change.", "Why would replacing the request queue with the undo stack change service order?", "The newest request would be selected before older waiting requests, violating the specified arrival order."),
  ],
  practice: [
    question("A school retains one total per class and one mark per pupil per test. Suggest a suitable array dimension for each and explain the index meanings.", ids(4, 1), ["A 1D array uses a class index for the class totals.", "A 2D array uses pupil and test indices for individual marks."], "Two independent selectors require two dimensions."),
    question("A drawing program queues commands received from a device and retains completed changes for Undo. Justify a queue for the incoming commands and a stack for the undo history.", ids(9, 1, 2), ["The queue processes incoming commands in arrival order.", "The stack reverses the latest completed change first."], "Waiting work and completed undoable work are different collections."),
    question("A programme of performances often inserts an act after a known act. Explain why a linked list can be suitable and identify the links changed during insertion.", ids(9, 3), ["A linked list can insert between neighbours without shifting all later act data.", "The new node points to the original successor, and the known predecessor points to the new node."], "The advantage assumes the insertion point has been located."),
  ],
  exam: [
    question("A laboratory records one REAL result per sample for each of five tests. It has 20 samples. Declare a suitable array and state the element selecting sample 12, test 4.", ids(4, 1), ["DECLARE Result : ARRAY[1:20, 1:5] OF REAL.", "The two indices represent sample number and test number.", "Result[12, 4] selects the required value."], "Keep the same dimension convention in the declaration and access."),
    question("A text editor receives edits A, B and C, processes them in arrival order and then undoes two completed edits. State the processing order, undo order and suitable ADT for each stage.", ids(9, 1, 2), ["A queue processes A, B, C in arrival order.", "A stack reverses C then B after all three have completed.", "The queue applies FIFO to waiting edits; the stack applies LIFO to completed edits."], "Do not use the same removal rule for both stages."),
    question("A route planner stores waypoints that are frequently inserted between existing neighbours. Compare using a linked list with a 1D array for maintaining this order, and state a cost of accessing the tenth waypoint in a singly linked list.", ids(9, 3), ["A linked list can preserve the order by updating neighbour links when an insertion point is known.", "An ordered array may require shifting later elements to make space at that position.", "A singly linked list normally reaches the tenth waypoint by following links from the head, rather than direct access by ordinal position."], "The array index storing a node is not necessarily its ordinal position in the list."),
  ],
  summary: [["Indexed data", "Choose 1D or 2D arrays by how many independent indices locate one value."], ["Access rules", "Use a stack for latest-first reversal, a queue for arrival order and a linked list for linked sequence updates."], ["Cooperation", "Only successful changes enter undo history. Rejection preserves the seat state; Undo restores the saved old value and appends an event."]],
});

// Complete the section's progression while retaining the original task IDs.
function completeSection10Lesson(number, lesson) {
  const get = key => lesson.units.find(u => u.unitKey === `S10-${key}`);
  const keep = (key, material) => get(key).materials.push({ ...material, preserve: true, objectiveIds: get(key).objectiveIds });
  const extend = (key, title, explanation, materials) => { get(key).extensions = [{ title, explanation, materials: materials.map(m => ({ ...m, objectiveIds: get(key).objectiveIds })) }]; };
  if (number === 2) {
    keep("RECORD-ACCESS", example("recordInstances", "Create two independent record values", "Define the type, fill First, copy its value to Second, then change each of Second's fields.", "The six output lines are Mina, 11, FALSE, Jo, 12, TRUE. First retains its original fields."));
    keep("RECORD-ACCESS", table("Compare the final instances", ["Record", "Name", "YearGroup", "FeesPaid"], [["First", "Mina", 11, "FALSE"], ["Second", "Jo", 12, "TRUE"]]));
    lesson.practice.push(question("Using the supplied two-record algorithm, add First.YearGroup <- 13 immediately before the outputs. State both final year groups and explain why they differ.", ids(2, 3), ["First.YearGroup is 13; Second.YearGroup remains 12.", "The field assignment selects First only; the earlier copy did not make the two variables one record."], "Copying a record value does not make later field updates apply to both variables.", supplied("recordInstances")));
  }
  if (number === 4) {
    keep("ONE-DIMENSION-CHOICE", example("arrayInitialise", "Initialise every declared element", "Create Names[3:5], set every element to an empty string, change index 4 to Mina and display all elements.", "Three output lines: an empty line, Mina, an empty line. The bounds remain 3:5."));
    lesson.units.push(
      unit("ONE-DIMENSION-COUNT", "Count values that meet a condition", ids(5, 1), ["A conditional count measures how many items satisfy a rule. Initialise Count to zero before traversing the stored marks; add one only when the current mark meets the threshold.", "The requirement is at least Threshold, so equality qualifies. Keep the input pass and processing pass separate here to show that the stored values can be revisited."], [table("Three different results from 6, 9, 4, 7", ["Operation", "Result"], [["Sum all marks", 26], ["Count marks at least 7", 2], ["Sum marks at least 7", 16]]), example("countThreshold", "Count qualifying marks", "Input four INTEGER marks, then an INTEGER threshold, and output how many marks are at least that threshold.", "Inputs 6, 9, 4, 7 followed by threshold 7 output 2. Threshold 10 outputs 0; threshold 4 outputs 4.")], "Add one per qualifying item, not its mark.", "Which comparison is needed for strictly above 7?", "Use > 7; a mark equal to 7 must then be excluded."),
      unit("ONE-DIMENSION-EXTREMES", "Find a maximum and a minimum", ids(5, 1), ["An extreme is the greatest or least supplied value. Copy the first element into each candidate, then inspect the remaining elements so the candidate always represents a value encountered in the data.", "Use separate comparisons for Largest and Smallest. Replacing a candidate only for a strict improvement is sufficient when the required outputs are the values rather than their positions."], [table("Minimum trace on the same four readings", ["Stage", "Smallest after comparison"], [["Initial: −6.5", "−6.5"], ["Compare −2.0", "−6.5"], ["Compare −9.0", "−9.0"], ["Compare −3.5", "−9.0"]]), example("arrayExtremes", "Find both extremes in signed readings", "Input exactly four REAL readings; output the largest and then the smallest. No empty collection is permitted in this task.", "Inputs −6.5, −2.0, −9.0, −3.5 output −2.0 and −9.0. Four equal inputs of 2.5 output 2.5 twice.")], "Zero is not a safe initial extreme unless the permitted data and required result justify it.", "For −8, −3, −3, −10, what are the two extremes?", "Largest is −3 and Smallest is −10; equal largest values do not change the required value.")
    );
    extend("ONE-DIMENSION-CHOICE", "Optional extension · Arrays of records and active length", "Use the record definition and indexed access already taught. Each element still has one type, MemberRecord. Stop at selecting a record and its field; no new ADT implementation is required.", [example("recordArray", "Select an indexed record, then its field", "Input two names, initialise both Paid fields to FALSE and change only the second member to TRUE.", "Inputs Mina and Jo output Mina, FALSE, Jo, TRUE on four lines."), table("Capacity and active length are different", ["Given state", "Valid processing"], [["Capacity 5; UsedCount = 3; values at 1:3 are 6, 9, 4", "Process indices 1 through UsedCount; total = 19. Do not read unspecified cells 4 and 5."], ["UsedCount = 0", "There are no active values. Total and count are 0; there is no maximum or minimum to report."], ["Before adding one value", "Require UsedCount < 5, then increase it and fill that new position before reading it."]])]);
    lesson.practice.push(
      question("State the output of the supplied conditional-count program with marks [7,6,7,9] and threshold 7. Then change only the comparison to > and give the new output.", ids(5, 1), ["With >=, three marks qualify, so Count is 3.", "With >, only 9 qualifies, so Count is 1."], "Test the equality boundary explicitly.", supplied("countThreshold")),
      question("State both candidates after each comparison in the supplied extremes program for [−8,−3,−3,−10]. Explain why starting Largest at 0 would fail.", ids(5, 1), ["Largest progresses −8, −3, −3, −3.", "Smallest progresses −8, −8, −8, −10.", "Zero would never be replaced by a negative value even though it is not an input."], "Initialise both candidates from an actual element.", supplied("arrayExtremes"))
    );
  }
  if (number === 5) {
    lesson.units.push(unit("TWO-DIMENSION-TOTALS", "Calculate row, column and whole-table totals", ids(5, 1), ["The same stored table can answer several questions. A row total groups columns for one row; a column total groups rows for one column. The index meanings remain Row, Column in both traversals.", "A grand total belongs to the whole data set, so initialise it once before input begins. Accumulate each of the six inputs exactly once; do not add them again during the later column-total traversal."], [diagramFor("matrix-totals"), example("matrixTotals", "Complete three kinds of total", "Input six INTEGER values in row order into Scores[1:2,1:3]. Output two row totals, three column totals and one grand total.", "Inputs 4, 7, 2, 8, 1, 6 output 13, 15, 12, 8, 8, 28 on six lines. Check: 13 + 15 = 12 + 8 + 8 = 28.")], "Reset a group total once per group, and a grand total once per whole table.", "Why would resetting ColumnTotal inside the inner row loop be wrong?", "It would erase earlier rows; for each column only the final row's value would remain."));
    lesson.practice.push(question("The supplied combined-total program receives [1,0,−1] then [2,3,4] as its rows. State all six outputs and explain how the two independent checks agree.", ids(5, 1), ["Row totals are 0 and 9; column totals are 3, 3 and 3; grand total is 9.", "Both 0 + 9 and 3 + 3 + 3 equal the grand total."], "Do not add the same six values a second time to GrandTotal.", supplied("matrixTotals")));
  }
  if (number === 6) {
    keep("LINEAR-CODE", table("Complete state trace: [9,4,6,4,2]", ["Target", "Index / Position before comparison", "After comparison", "Finish"], [["4", "1 / 0", "2 / 0 after mismatch", "Continue"], ["4", "2 / 0", "2 / 2 after match", "Output 2; stop before duplicate at 4"], ["7", "1 / 0", "2 / 0", "Continue"], ["7", "2 / 0", "3 / 0", "Continue"], ["7", "3 / 0", "4 / 0", "Continue"], ["7", "4 / 0", "5 / 0", "Continue"], ["7", "5 / 0", "6 / 0", "Next header fails; output 0"]]));
  }
  if (number === 7) {
    keep("BUBBLE-CODE", table("First pass uses every updated pair", ["Index", "Compared pair", "Array after the comparison"], [[1, "5,1: swap", "1,5,4,2,8,3,7"], [2, "5,4: swap", "1,4,5,2,8,3,7"], [3, "5,2: swap", "1,4,2,5,8,3,7"], [4, "5,8: retain", "1,4,2,5,8,3,7"], [5, "8,3: swap", "1,4,2,5,3,8,7"], [6, "8,7: swap", "1,4,2,5,3,7,8"]]));
  }
  if (number === 8) {
    lesson.units.sort((a, b) => ["S10-FILE-PERSISTENCE", "S10-FILE-WRITE", "S10-FILE-READ"].indexOf(a.unitKey) - ["S10-FILE-PERSISTENCE", "S10-FILE-WRITE", "S10-FILE-READ"].indexOf(b.unitKey));
    lesson.units.push(
      unit("FILE-ROUNDTRIP", "Save, extend and read the data back", ids(7, 1, 2), ["Use one named file throughout a complete lifecycle. Start with Names.txt containing Old. Opening FOR WRITE replaces Old; three writes create Ada, an empty line and Bo. Close before changing the access mode.", "Append Cy in a second writing session, close again, then reopen FOR READ. The reading loop processes all four lines and reports the count after closing the file."], [diagramFor("file-lifecycle"), example("fileRoundTrip", "Complete the save-and-read-back cycle", "Names.txt initially contains Old. Replace it with Ada, a blank line and Bo; append Cy; then reopen it, display every line and output the count.", "Output lines: Ada; an empty line; Bo; Cy; 4. Final file lines: Ada; an empty line; Bo; Cy. Old is gone; all file sessions are closed.")], "Writing and closing alone do not demonstrate reading the saved data back.", "If APPEND in this program becomes WRITE, what is read back?", "Only Cy remains, followed by a line count of 1."),
      unit("FILE-COPY", "Read one file while writing a transformed copy", ids(7, 2), ["Open an existing input file FOR READ and a different output file FOR WRITE. Every input line is read exactly once and produces one output line in this example.", "A selection replaces an empty input line with the text [blank]; other lines pass through unchanged. Keeping the input and output names different prevents the output open from destroying the source."], [table("Independent starting file: Ada, blank, Bo", ["Input line", "Output line"], [["Ada", "Ada"], ['""', "[blank]"], ["Bo", "Bo"]]), example("copyBlankMarkers", "Copy text and label blank lines", "Names.txt exists with Ada, a blank line and Bo. Replace Labelled.txt with a copy that labels each blank. Preserve source contents and close both files.", "Labelled.txt has Ada, [blank], Bo. Names.txt is unchanged. For an empty source, the output is empty and both files still close.")], "A blank line and an absent next line require different decisions.", "How would you omit blank lines instead of replacing them?", "After reading, write Line only if Line <> \"\"; retain the EOF loop and close both files.")
    );
    lesson.practice.push(question("Names.txt initially contains Keep. Run the supplied save/read-back program. Give the final file contents, all outputs and the effect of changing only its APPEND mode to WRITE.", ids(7, 1, 2), ["The final file has Ada, a blank line, Bo, Cy; Keep was replaced by the first WRITE open.", "Outputs are those four lines followed by 4.", "Changing APPEND to WRITE leaves only Cy and produces Cy then 1."], "Inspect every OPENFILE, not just the last WRITEFILE.", supplied("fileRoundTrip")));
  }
  if (number === 10) {
    keep("STACK-ARRAY", table("Complete lifecycle: capacity 3; top editing is permitted", ["Operation", "Bottom → top afterwards", "Top", "Returned / response"], [["Initial empty", "—", 0, "—"], ["PUSH A", "A", 1, "Added"], ["PUSH B", "A,B", 2, "Added"], ["PUSH C", "A,B,C", 3, "Added"], ["PUSH D", "A,B,C", 3, "Full: reject, no change"], ["Edit top to X", "A,B,X", 3, "Edited"], ["POP", "A,B", 2, "X"], ["POP", "A", 1, "B"], ["POP", "—", 0, "A"], ["POP", "—", 0, "Empty: reject, no change"], ["PUSH Z", "Z", 1, "Reuses slot 1"]]));
  }
  if (number === 11) {
    lesson.units.push(unit("QUEUE-LIFECYCLE", "Trace full, empty and reused circular states", ids(10, 2, 4), ["Use Queue[1:3] with Front as the next removal position, Rear as the last insertion position, and Count as the active length. The initial state is Front = 1, Rear = 0, Count = 0; advance a position after 3 back to 1.", "A successful enqueue advances Rear and increases Count. A successful dequeue reads Front, advances Front and decreases Count. This interface also permits editing the front item without changing its position; failed full or empty operations change nothing."], [table("Read the three state variables together", ["Variable", "Meaning"], [["Front", "Next removal position when Count > 0"], ["Rear", "Last insertion position; 0 is the initial sentinel"], ["Count", "0 empty; 3 full"]]), worked("Follow the complete operation sequence", [["Initial state", "Empty array, Front = 1, Rear = 0, Count = 0. The table below gives every operation and resulting state."], ["Read a row", "After adding D, physical slots are [D,B,C], while FIFO order is B,C,D. Front = 2 selects B."], ["Finish", "After all three removals, Count is 0 even though Front = 2 and Rear = 1. The next successful enqueue stores E at slot 2."]]), { ...table("All transitions; an edit-front operation is explicitly available", ["Operation", "F / R / C", "Front → rear", "Returned / response"], [["Initial", "1 / 0 / 0", "—", "Empty"], ["ENQUEUE A", "1 / 1 / 1", "A", "Added"], ["ENQUEUE B", "1 / 2 / 2", "A,B", "Added"], ["DEQUEUE", "2 / 2 / 1", "B", "A"], ["ENQUEUE C", "2 / 3 / 2", "B,C", "Added"], ["ENQUEUE D", "2 / 1 / 3", "B,C,D", "Wrapped to slot 1"], ["ENQUEUE X", "2 / 1 / 3", "B,C,D", "Full: reject"], ["Edit front to B*", "2 / 1 / 3", "B*,C,D", "Only Queue[2] changes"], ["DEQUEUE", "3 / 1 / 2", "C,D", "B*"], ["DEQUEUE", "1 / 1 / 1", "D", "C"], ["DEQUEUE", "2 / 1 / 0", "—", "D"], ["DEQUEUE", "2 / 1 / 0", "—", "Empty: reject"], ["ENQUEUE E", "2 / 2 / 1", "E", "Reuses slot 2"]]), preserve: true }], "Count, not matching pointers alone, distinguishes empty from full in this model.", "When F = 2, R = 1, C = 0, which slot receives the next item?", "Slot 2: advance Rear from 1 to 2 and increase Count to 1; Front stays 2."));
    lesson.practice.push(question("A circular queue has capacity 4, F = 4, R = 1, C = 2, with A in slot 4 and B in slot 1. Dequeue twice, attempt another dequeue, then enqueue Z. State the final variables, removal results and Z's position.", ids(10, 2, 4), ["The successful dequeues return A then B, leaving F = 2, R = 1, C = 0.", "The empty dequeue is rejected with no state change.", "Enqueue places Z at slot 2, giving F = 2, R = 2, C = 1."], "Advance through the declared wrap rule and check Count before accessing an item."));
  }
  if (number === 12) {
    get("LINKED-OPERATIONS").materials.forEach(m => { if (m.type === "table") m.preserve = true; });
    lesson.units.push(unit("LINKED-ENDS", "Handle the head, tail and empty list", ids(10, 3, 4), ["A node at the head has no active predecessor, so insertion or deletion there updates Head. At the tail, the successor is null. Deleting the only node must make Head null rather than leaving it pointing to a free slot.", "Each case below starts from its stated snapshot, independently of the other cases. Assume null = 0 and that released slots are recorded as available. If no slot is free, reject an insertion before changing Data or links."], [diagramFor("linked-boundaries"), worked("Complete the boundary cases independently", [["Insert into empty", "Head = 0 and free slot 3. Store X in Data[3], set Next[3] = 0, then Head = 3. The list is X."], ["Insert at head", "Start 2(A) → 4(B) → 1(C) → 0; slot 3 is free. Store X at 3, set Next[3] = 2, then Head = 3. Output order: X,A,B,C."], ["Insert after tail", "Start the original A,B,C chain; slot 3 is free. Store X at 3, set Next[3] = 0, then Next[1] = 3. Output order: A,B,C,X."], ["Delete tail", "Start the original A,B,C chain. Set Next[4] = 0 and release slot 1. Head remains 2; output order A,B."], ["Delete only node", "Start Head = 3, Next[3] = 0, Data[3] = X. Set Head = 0 and release slot 3. No data node remains reachable."], ["Reject when full", "If all slots are active and no free slot exists, report full; retain the same Head, data and links."]])], "Deleting the only node is also a head deletion; clearing its data alone does not make the list empty.", "When a new node becomes the tail, what must its Next contain?", "0, the null link in this model; the former tail must point to the new node.") );
    lesson.practice.push(question("A list consists only of node 2 containing P with Head = 2 and Next[2] = 0. Delete it, then reuse slot 2 for Q in the empty list. Give the head and link changes at both stages.", ids(10, 3, 4), ["Deletion sets Head to 0 and releases slot 2.", "Insertion stores Q at 2, sets Next[2] to 0 and Head to 2.", "The final traversal contains Q only; old P is not an active item."], "An available slot becomes active only after the head or predecessor makes it reachable."));
  }
  if (number === 13) {
    keep("IMPLEMENT-FREE-LIST", table("Reuse storage, fill it, then release the head; null = 0", ["Completed operation", "Head / Free", "Active chain", "Free chain"], [["Initial", "2 / 1", "2→4→0", "1→3→0"], ["Allocate 1 after 2", "2 / 3", "2→1→4→0", "3→0"], ["Delete and release 4", "2 / 4", "2→1→0", "4→3→0"], ["Reuse 4 after 1", "2 / 3", "2→1→4→0", "3→0"], ["Allocate 3 after 4", "2 / 0", "2→1→4→3→0", "0"], ["Attempt one more insertion", "2 / 0", "2→1→4→3→0", "0; reject, no change"], ["Delete head 2", "1 / 2", "1→4→3→0", "2→0"]]));
    lesson.practice.push(question("After the lesson's four-slot free-list trace reaches active chain 2→1→4→3→0 and Free = 0, delete node 1, then reuse it as the new head. State both chains after each operation.", ids(10, 3, 4), ["Delete: set Next[2] = 4; active is 2→4→3→0 and free is 1→0.", "Reuse: advance Free to 0, set Next[1] = 2 and Head = 1.", "Final active is 1→2→4→3→0; free is 0, with no shared nodes."], "Change the predecessor before returning a node to free storage."));
  }
  if (number === 14) {
    lesson.units.push(unit("COMBINE-OUTCOMES", "Run a booking, reject a duplicate and undo a success", [...ids(2, 3), ...ids(5, 1), ...ids(7, 2), ...ids(9, 1, 2)], ["The request queue initially holds R1(1,1), R2(1,1), R3(2,2), in front-to-rear order. Occupied[1:2,1:2] is initially all FALSE; the undo stack is empty and Bookings.txt is an empty existing file.", "Each successful booking stores an undo record with request ID, row, seat and PreviousState = FALSE. A rejected request produces no seat change or undo entry. After all requests have been processed, Undo once reverses the latest successful booking."], [diagramFor("booking-flow"), worked("Follow all requests and one Undo", [["Prepare", "Declare Occupied as ARRAY[1:2,1:2] OF BOOLEAN and initialise every cell to FALSE. Queue and stack capacities are 3. Request fields: ID : STRING, Row : INTEGER, Seat : INTEGER. Undo fields add PreviousState : BOOLEAN. All coordinates are valid."], ["R1 succeeds", "Dequeue R1; save (R1,1,1,FALSE), set Occupied[1,1] TRUE and push that undo record. Append ACCEPT R1 1 1."], ["R2 is rejected", "Dequeue R2; seat (1,1) is TRUE. Leave occupancy and the stack unchanged. Append REJECT R2 1 1."], ["R3 succeeds", "Dequeue R3; save (R3,2,2,FALSE), set Occupied[2,2] TRUE and push that record. Append ACCEPT R3 2 2. The queue is now empty."], ["Undo R3", "Pop (R3,2,2,FALSE); restore Occupied[2,2] to FALSE. Append UNDO R3 2 2."], ["Final state", "Rows of Occupied are [TRUE,FALSE] and [FALSE,FALSE]. The queue is empty; the stack contains only (R1,1,1,FALSE). The log has the four event lines below, in order."]]), { ...table("State after every completed action", ["Action", "Queue front → rear", "Occupied seats", "Undo bottom → top"], [["Initial", "R1,R2,R3", "None", "Empty"], ["Accept R1", "R2,R3", "(1,1)", "R1: previous FALSE"], ["Reject R2", "R3", "(1,1)", "R1: previous FALSE"], ["Accept R3", "Empty", "(1,1), (2,2)", "R1: FALSE; R3: FALSE"], ["Undo once", "Empty", "(1,1)", "R1: previous FALSE"]]), preserve: true }, { ...worked("Persist the stated events", [["Mode and initial contents", "Bookings.txt starts empty. Open it FOR APPEND before processing. Each event string below is written with WRITEFILE at the corresponding action; close the log after Undo."], ["Exact operations within that open session", 'OPENFILE "Bookings.txt" FOR APPEND\nWRITEFILE "Bookings.txt", "ACCEPT R1 1 1"\nWRITEFILE "Bookings.txt", "REJECT R2 1 1"\nWRITEFILE "Bookings.txt", "ACCEPT R3 2 2"\nWRITEFILE "Bookings.txt", "UNDO R3 2 2"\nCLOSEFILE "Bookings.txt"'], ["Scope", "These are the complete file operations for the four already-traced events, not a booking implementation. The four strings become four saved lines. If old event lines existed, APPEND would retain them before these lines."]]), preserve: true }], "The latest request is not necessarily the latest successful change; rejected requests must not create undo records.", "After one more Undo, which seat changes and what remains?", "Undo R1 restores (1,1) to FALSE. All seats are FALSE, both ADTs are empty, and an UNDO R1 1 1 line is appended."));
    lesson.practice.push(question("Start a fresh 2×2 performance with every seat FALSE, an empty undo stack and a queue holding A(1,2), B(1,2), C(2,1). Apply the lesson's rules to all requests, then Undo twice. State the outcomes, undo order, final occupancy and all log events. Both ADTs have capacity 3.", [...ids(5, 1), ...ids(7, 2), ...ids(9, 1, 2)], ["A succeeds, B is rejected and C succeeds; the request queue becomes empty.", "Undo returns C then A; B has no undo record.", "All four seats are FALSE and the undo stack is empty.", "The five events are ACCEPT A 1 2; REJECT B 1 2; ACCEPT C 2 1; UNDO C 2 1; UNDO A 1 2."], "Only successful changes supply undo entries; retain rejected events in the log."));
  }
  if (number === 14) {
    lesson.practice.push(question("RequestRecord is already defined with ID : STRING, Row : INTEGER and Seat : INTEGER. Occupied is already declared as ARRAY[1:2,1:2] OF BOOLEAN and every cell is FALSE. Write pseudocode to declare Req of RequestRecord, save request A for row 1, seat 2 in its fields, and display that seat's current occupancy through Req's fields. State the output.", [...ids(2, 3), ...ids(5, 1)], ["DECLARE Req : RequestRecord creates the variable.", 'Req.ID <- "A", Req.Row <- 1 and Req.Seat <- 2 save the request fields.', "OUTPUT Occupied[Req.Row, Req.Seat] selects and displays FALSE."], "Use the record's row and seat fields as the two array indices.", {answerCode: 'DECLARE Req : RequestRecord\nReq.ID <- "A"\nReq.Row <- 1\nReq.Seat <- 2\nOUTPUT Occupied[Req.Row, Req.Seat]', answerLanguage: "text"}));
  }
  return lesson;
}
