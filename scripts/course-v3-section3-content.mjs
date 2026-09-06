// Authored S3 teaching and assessment. IDs are explicit syllabus mappings;
// questions are not selected by word overlap with learning objectives.
const ids = (requirement, numbers) => numbers.map((n) => `${requirement}.A${String(n).padStart(2, "0")}`);
const logic = (numbers) => ids("S3.10", numbers);
const asset = (name) => `/assets/course-v3/section-3/${name}.svg`;
const table = (title, headers, rows) => ({ type: "table", title, headers, rows, preserveText: true, preserve: true });
const worked = (title, steps) => ({ type: "worked-example", title, steps });
const visual = (title, path, facts, alt) => ({ type: "reviewed-visual", title, asset: path, facts, alt, review: "reviewed", preserveText: true });
const unit = (key, heading, objectiveIds, explanation, materials, misconceptions) => ({
  unitKey: key, syllabusId: objectiveIds[0].replace(/\.A\d+$/, ""), heading, objectiveIds,
  explanation, materials: materials.map((m) => ({ ...m, objectiveIds })), misconceptions,
  useAuthoredVisual: true,
});
const q = (id, prompt, objectiveIds, answerPoints, commonError, extra = {}) => ({
  id, type: "Application", authored: true, marks: answerPoints.length,
  prompt, objectiveIds, answerPoints, commonError, ...extra,
});
const exam = (lesson, n, ...args) => q(`S3-L0${lesson}-EXAM-${n}`, ...args);
const practice = (lesson, n, ...args) => q(`S3-L0${lesson}-Q${n}`, ...args);

export const section3ExamQuestions = {
  13: [
    exam(1, 1, "Explain why a portable survey computer needs RAM while editing measurements, flash storage after shutdown, and a removable drive for an offline copy.", [...ids("S3.01", [3, 4, 5])], [
      "RAM provides writable working space for the measurements currently being edited.",
      "Flash storage retains the saved measurements when the survey computer is switched off.",
      "The removable drive can be disconnected and kept separately as an offline copy.",
    ], "Do not describe RAM as the place that preserves the saved survey after shutdown."),
    exam(1, 2, "Explain why a bicycle's built-in electronic gear controller is an embedded system. Describe the roles of its shift buttons and gear motor.", ids("S3.02", [1]), [
      "The computer is incorporated into the larger bicycle gear mechanism.",
      "Its dedicated task is to control gear changes rather than run unrelated user applications.",
      "The shift buttons provide the rider's gear-change requests as inputs.",
      "The motor is an output device that physically changes the selected gear.",
    ], "Being small is not sufficient to identify an embedded system."),
    exam(1, 3, "Explain one benefit of a dedicated embedded controller in a battery-powered irrigation timer and one drawback if the owner later wants to add a camera. Link each point to the requirement.", ids("S3.02", [2, 3]), [
      "Hardware and software can be limited to the timer's watering task.",
      "This can reduce power consumption and extend the interval between battery changes.",
      "The controller may have insufficient processing capacity, memory or interfaces for camera data.",
      "Adding image processing may therefore require replacement hardware rather than a simple software addition.",
    ], "A benefit and a drawback each need a mechanism and a consequence for this timer."),
  ],
  14: [
    exam(2, 1, "Explain why a laser printer can produce the correct toner pattern on paper but leave toner that rubs off. Identify the faulty stage and explain why the laser itself does not fix toner to the paper.", ids("S3.03", [1]), [
      "The fusing stage is not applying the required heat and/or pressure.",
      "Without effective fusing, the transferred toner is not bonded firmly to the paper.",
      "The laser exposes the photosensitive drum to create the electrostatic image.",
      "It does not heat the toner on the paper; the fuser performs that operation later.",
    ], "Distinguish exposing the drum from fusing the transferred toner."),
    exam(2, 2, "Explain why a resin printer that cures all of one layer at once is still an additive 3D printer. Describe the role of the sliced model and explain why curing one layer does not complete a tall object.", ids("S3.03", [2]), [
      "Material is solidified to add a new layer to the developing object.",
      "Slicing supplies the cross-sectional shape required at each height.",
      "One exposure produces only the current cross-section, even if the whole layer is cured together.",
      "The printer must reposition and form further layers until the complete height is built.",
    ], "Layer-by-layer production does not imply that only one point in a layer can be formed at a time."),
    exam(2, 3, "Explain why connecting a microphone's analogue output directly to a computer does not by itself produce a digital recording. Describe the missing conversion and identify what the microphone has already converted.", ids("S3.03", [3]), [
      "The microphone has converted sound-pressure variations into a varying electrical signal.",
      "This analogue signal is not yet a sequence of binary sample values.",
      "An ADC measures the signal at sampling instants and quantises the measured amplitudes.",
      "The quantised values are encoded in binary for storage or processing.",
    ], "Keep the microphone transducer and the analogue-to-digital converter as distinct stages."),
    exam(2, 4, "Describe the role of a DAC in playing stored sound. Explain why a loudspeaker still needs a changing current and a movable cone after this conversion.", ids("S3.03", [4]), [
      "The DAC turns the stored sample values into an analogue electrical signal.",
      "After amplification, the changing current in the voice coil produces a changing magnetic field.",
      "Interaction with the permanent magnet moves the coil and attached cone.",
      "The moving cone creates pressure variations in the air that are heard as sound.",
    ], "The DAC produces an electrical signal, not the sound wave itself."),
    exam(2, 5, "Explain why reading a sector from another track of a magnetic hard disk can involve two mechanical delays. Describe what the read head detects once the sector is beneath it.", ids("S3.03", [5]), [
      "The actuator first moves the head to the required track.",
      "The disk may then have to rotate until the required sector reaches the head.",
      "The read head senses the magnetic pattern recorded on the platter.",
      "The detected signal is decoded to recover the stored binary data.",
    ], "Moving to a track and waiting for a sector are different operations."),
    exam(2, 6, "Describe how a USB flash drive retains a photograph while unplugged and reads it without moving a head. Include how stored cell states are detected.", ids("S3.03", [6]), [
      "Electrical charge is retained in insulated storage cells after external power is removed.",
      "The charge affects the voltage threshold at which a cell transistor conducts.",
      "During reading, circuitry senses the cells' threshold states to recover the encoded data.",
      "Electronic addressing selects the cells, so no rotating platter or moving head is required.",
    ], "Do not use the capacitor refresh explanation for DRAM to explain non-volatile flash."),
    exam(2, 7, "Compare reading an optical disc with writing to a recordable optical disc. Explain why a reader's low-power laser is insufficient to write a new recording.", ids("S3.03", [7]), [
      "Reading illuminates the track and detects variations in reflected light.",
      "Writing uses greater laser power to change selected areas of the recording layer.",
      "Those changes create distinguishable optical states for later reading.",
      "The lower read power is chosen to detect existing states without changing the recording layer.",
    ], "A pressed disc's pits are not mechanically cut by a computer's recordable-disc writer."),
    exam(2, 8, "Explain why touching a capacitive screen changes the input detected by its controller. Describe how the controller obtains a position rather than just reporting that some touch occurred.", ids("S3.03", [8]), [
      "A conducting finger changes capacitance around the touched part of the electrode grid.",
      "The controller measures which electrodes show a change.",
      "The pattern across the grid is used to calculate touch coordinates.",
      "The coordinates let software associate the touch with a particular displayed control.",
    ], "Pressure is not the principal sensing mechanism in the specified capacitive screen."),
    exam(2, 9, "Explain why a VR scene can appear to lag behind the user when headset orientation data arrives late, even though both displays work. Describe the required response to a head turn.", ids("S3.03", [9]), [
      "Tracking sensors supply information about the headset's changed orientation.",
      "The computer uses that information to calculate the new viewing direction.",
      "It renders updated left-eye and right-eye views for the headset displays.",
      "Late tracking data causes the displayed viewpoint to represent an earlier head position.",
    ], "Two functioning displays do not guarantee timely tracking and viewpoint updates."),
  ],
  15: [
    exam(3, 1, "Explain how a four-block buffer handles this transfer: the sender supplies four blocks immediately, then supplies no more; the receiver removes one complete block per second. State the buffer contents after two seconds and explain whether the buffer changes the receiver's sustained rate.", ids("S3.04", [1]), [
      "All four blocks can wait temporarily in the buffer after the initial burst.",
      "After two seconds, two blocks have been removed and two blocks remain.",
      "The receiver can consume blocks at its own pace while the sender has finished its burst.",
      "The receiver still removes one block per second; the buffer changes waiting capacity, not that sustained rate.",
    ], "Count blocks that are still waiting; do not also count blocks already removed by the receiver."),
    exam(3, 2, "Suggest suitable memory for each of these requirements and justify each choice: a camera's changing working image, a processor's small low-latency cache, and a desktop computer's large affordable main memory. Compare the storage mechanism of the last two choices.", [...ids("S3.05", [1, 2]), ...ids("S3.06", [1, 2, 3, 4])], [
      "Use RAM for the working image because processing repeatedly reads and changes its pixel data.",
      "Use SRAM for the cache because its fast access helps reduce processor waiting time.",
      "Use DRAM for main memory because its higher density and lower cost per bit support the required capacity.",
      "SRAM maintains a bit in a powered bistable circuit, whereas DRAM represents a bit by capacitor charge.",
      "DRAM charge leaks and must be refreshed; powered SRAM maintains its state without periodic refresh.",
    ], "Relate each choice to its particular workload; static RAM is still volatile."),
    exam(3, 3, "Explain which of PROM, EPROM and EEPROM is suitable for calibration instructions that must survive shutdown and be updated electrically in the installed device. Give a reason for rejecting each of the other two types.", [...ids("S3.05", [1, 2]), ...ids("S3.07", [1, 2, 3])], [
      "EEPROM is suitable because it retains the instructions without power and permits electrical rewriting.",
      "PROM cannot meet repeated-update requirements because it is programmed only once.",
      "EPROM requires ultraviolet erasure rather than the required electrical erase process in the installed device.",
    ], "Non-volatility alone cannot distinguish these three choices."),
  ],
  16: [
    exam(4, 1, "Compare these two cold-store systems: System A logs temperatures and displays an alert; System B also switches refrigeration on when too warm. Identify the sensor both require and explain the extra control function in System B.", [...ids("S3.08", [1, 2]), ...ids("S3.09", [1, 2])], [
      "Both systems need a temperature sensor to obtain the measured condition.",
      "System A performs monitoring because it records or reports the readings.",
      "System B compares the reading with its stored switching rule and decides a corrective output.",
      "Its output operates refrigeration equipment to change the physical temperature, so it also performs control.",
    ], "Displaying an alert does not itself regulate the measured temperature."),
    exam(4, 2, "Explain the effect of a pressure sensor becoming stuck at a low reading in a pump system that stops pumping only when its measured pressure reaches a target. Identify the actuator and explain why this fault prevents reliable feedback.", [...ids("S3.08", [3]), ...ids("S3.09", [1, 2])], [
      "The pump motor is the actuator that raises the physical pressure.",
      "The controller continues to receive a reading below the stopping target.",
      "It may therefore keep the pump operating even when the actual pressure is already high.",
      "The returned measurement no longer represents the effect of pumping, so the loop cannot reliably correct or stop from that measurement.",
    ], "The actuator's output signal is not evidence that the intended physical result occurred."),
    exam(4, 3, "Identify suitable sensors to detect an interrupted infra-red beam and excessive workshop noise. Explain why adding a sounder to the noise monitor does not automatically make it a closed-loop noise-reduction system.", [...ids("S3.09", [1, 2]), ...ids("S3.08", [2, 3])], [
      "An infra-red sensor detects the beam and the change when the beam is interrupted.",
      "A sound sensor measures the workshop noise level.",
      "The sounder provides an alert but does not itself reduce the noise being monitored.",
      "A closed-loop noise-reduction system needs a corrective action and subsequent noise readings used to adjust that action.",
    ], "An output or alarm alone is not sufficient evidence of feedback regulating the measured condition."),
  ],
  17: [
    exam(5, 1, "Draw the symbol for a NAND gate and label its two inputs A and B and output Q. State Q for A,B = 1,1 and explain the role of the small output circle.", logic([4]), [
      "The main gate outline is the standard AND shape with two input connections.",
      "A small inversion circle is placed at its output before the Q connection; inputs are labelled A and B.",
      "Q is 0 when both inputs are 1.",
      "The circle complements the AND result, giving the NAND function.",
    ], "The inversion circle must be on the output, not on just one input."),
    exam(5, 2, "Identify the two-input gate for each rule and justify the choice: P is 1 only when both inputs are 0; R is 1 when at least one input is 1, including when both are 1. State the output of a NOT gate for input 0.", logic([1, 3, 5]), [
      "P uses NOR.",
      "NOR produces 1 for 00 and 0 for the other three combinations.",
      "R uses OR.",
      "OR includes the 11 combination, unlike XOR.",
      "The NOT output is 1.",
    ], "Use the complete rule, especially the both-inputs-equal cases."),
    exam(5, 3, "Construct truth tables for Q = A AND B and R = A XOR B, using input order 00, 01, 10, 11. Identify every row where Q and R differ.", logic([2, 6, 7]), [
      "The four input combinations appear once each in the stated order.",
      "The AND output column Q is 0, 0, 0, 1.",
      "The XOR output column R is 0, 1, 1, 0.",
      "The outputs differ at 01, 10 and 11.",
    ], "A truth table must include all input rows, including 00."),
  ],
  18: [
    exam(6, 1, "Construct a Boolean expression and draw a logic circuit for a warning W that is on when A is on, or when both B and C are off. State W for A,B,C = 0,1,0 and for 0,0,0. Use only the specified two-input gates and NOT gates.", logic([8, 10]), [
      "W = A OR ((NOT B) AND (NOT C)).",
      "Separate NOT gates receive B and C.",
      "The two inverted outputs feed a two-input AND gate.",
      "The AND result and A feed a two-input OR gate labelled W.",
      "For 010, W = 0; for 000, W = 1.",
    ], "NOT (B AND C) is not equivalent to (NOT B) AND (NOT C)."),
    exam(6, 2, "Construct a Boolean expression and a complete truth table for Circuit C below. Include an intermediate column X. Give a plain-language condition for Q to be 0.", logic([9, 10]), [
      "X = A OR B and Q = NOT ((A OR B) AND C).",
      "Inputs are listed as 000, 001, 010, 011, 100, 101, 110, 111.",
      "The X column is 0, 0, 1, 1, 1, 1, 1, 1.",
      "The Q column is 1, 1, 1, 0, 1, 0, 1, 0.",
      "Q is 0 when C is 1 and at least one of A and B is 1.",
    ], "Invert the complete AND result at the NAND output.", { diagram: asset("circuit-c"), diagramAlt: "Circuit C: A and B enter an OR gate whose output X enters a NAND gate together with C. The NAND output is Q." }),
    exam(6, 3, "Construct an expression for Q from this truth table: for A,B = 00,01,10,11 the Q values are 1,0,1,1. Draw an equivalent circuit using two-input gates and NOT gates. Verify all four outputs from your circuit.", logic([8, 10]), [
      "The output-1 rows give terms (NOT A AND NOT B), (A AND NOT B), and (A AND B), or an equivalent expression such as Q = A OR NOT B.",
      "The circuit has the correct input inversions and term gates for the chosen expression; in the shorter form this is a NOT gate on B.",
      "The term outputs are correctly combined to Q using two-input OR gates; in the shorter form a single OR receives A and NOT B.",
      "The constructed circuit returns 1, 0, 1, 1 for 00, 01, 10, 11 respectively.",
    ], "Accept an unsimplified correct circuit; simplification is not required.", { alternativeMarking: true }),
  ],
};

function logicLessons(lesson) {
  if (lesson.originalLesson === 17) return {
    ...lesson,
    objectives: lesson.objectives.filter(([id]) => logic([1, 2, 3, 4, 5, 6, 7]).includes(id)),
    subtitle: "Recognise six standard symbols, apply each gate's function and construct complete single-gate truth tables.",
    guidingQuestion: "Which gate matches an exact output rule, and which input row proves the choice?",
    diagnostic: { prompt: "For inputs 1 and 1, do OR and XOR give the same output?", answer: "No. OR gives 1; XOR (EOR) gives 0 because its two inputs are equal." },
    teachingCheckpoints: ["Use the six-symbol visual to identify the output bubble and the extra XOR input curve; then attempt Q1 and Q2 without the visual.", "Build the two-input rows in order before filling the gate outputs in Q3 and Q4. Use the three independent exam tasks after checking misconceptions."],
    units: [
      unit("S3.10-SYMBOLS", "Recognise six gate symbols and apply their functions", logic([1, 2, 3, 4, 5, 6]), [
        "A logic gate maps binary inputs to one binary output. Read a symbol from input connections to output. NOT inverts its single input; the other gates used here each have two inputs.",
        "AND requires both inputs to be 1. OR includes any case with at least one 1. XOR, also called EOR, accepts exactly one 1: its output is 0 when the two inputs are equal.",
        "An output circle denotes inversion. NAND complements the complete AND result; NOR complements the complete OR result. The extra curved line on the input side distinguishes XOR from OR.",
      ], [visual("Six standard symbols and their outputs", "/assets/diagrams/course-v3-imagegen/logic-gates.png", ["Follow each symbol's input and output connections.", "Compare the output circles and the extra curve on XOR."], "Six standard NOT, AND, OR, NAND, NOR and XOR symbols, each with its function and complete single-gate truth table.")], ["OR and XOR differ for 11. A NAND output is not the same as inverting only one AND input."]),
      unit("S3.10-TABLES", "Construct and check every single-gate truth table", logic([7]), [
        "For n independent binary inputs there are 2^n combinations. A NOT table has two rows. Every other individual gate in this syllabus has four rows, conventionally 00, 01, 10, 11.",
        "Copy the input combinations first and apply the gate's rule separately to each row. Do not omit a row whose output is 0. A compact output sequence is meaningful only when the input order is stated.",
      ], [table("All two-input cases", ["A", "B", "AND", "OR", "NAND", "NOR", "XOR / EOR"], [[0,0,0,0,1,1,0],[0,1,0,1,1,0,1],[1,0,0,1,1,0,1],[1,1,1,1,0,0,0]]),
        worked("Build the NOT table", [["Inputs", "List A = 0, then A = 1."], ["Apply inversion", "For A = 0 write Q = 1; for A = 1 write Q = 0."], ["Check", "Both possible inputs have been included exactly once."]])], ["Two inputs mean four combinations, not two. The number of gates in a circuit does not determine its number of input rows."]),
    ],
    practice: [
      practice(5, 1, "Draw and label the symbols for NOT, AND and OR. State the output condition for each.", logic([1, 2, 3]), ["NOT has a triangular body, one input and an output inversion circle.", "AND has a flat input side and rounded output side, with two inputs.", "OR has a curved input side and pointed output side, with two inputs.", "NOT outputs the opposite of its input.", "AND is 1 only when both inputs are 1.", "OR is 1 when one or both inputs are 1."], "Connections must meet the correct sides of the symbols."),
      practice(5, 2, "Draw and label NAND, NOR and XOR symbols. Explain how each is distinguished from its related AND or OR symbol.", logic([4, 5, 6]), ["NAND uses the AND outline with a small output circle.", "NOR uses the OR outline with a small output circle.", "XOR uses the OR outline with an extra curve on the input side and no output circle."], "An extra curve is not an inversion bubble."),
      practice(5, 3, "Construct the truth tables for NAND and NOR using input order 00,01,10,11. State the NOT outputs for input order 0,1.", logic([7]), ["The two-input tables contain 00, 01, 10 and 11.", "NAND outputs are 1, 1, 1, 0.", "NOR outputs are 1, 0, 0, 0.", "NOT outputs are 1, 0."], "Invert the gate result after evaluating AND or OR."),
      practice(5, 4, "Construct an XOR truth table. Compare it with OR and identify the input combination that distinguishes the two gates.", logic([6, 7]), ["The input rows are 00, 01, 10 and 11.", "XOR gives 0, 1, 1 and 0.", "OR gives 0, 1, 1 and 1.", "Only row 11 distinguishes the two output columns."], "The word ‘or’ in ordinary language must be interpreted against the stated output rule."),
    ],
    summary: [["Symbol clues", "An output circle inverts; an extra input curve identifies XOR."], ["Output rules", "AND: both; OR: at least one; XOR: exactly one of two."], ["Inverted functions", "NAND is NOT AND; NOR is NOT OR."], ["Complete tables", "Use both NOT rows and all four rows for each two-input gate."]],
  };
  return {
    ...lesson,
    objectives: lesson.objectives.filter(([id]) => logic([8, 9, 10]).includes(id)),
    subtitle: "Translate between problem statements, expressions, circuits and truth tables, then verify all input combinations.",
    guidingQuestion: "Can the same rule survive all four representations without losing a bracket or inversion?",
    diagnostic: { prompt: "How many rows are needed for three independent binary inputs, even if every gate has at most two inputs?", answer: "Eight: 2^3. The two-input limit applies to each gate, not the entire circuit." },
    teachingCheckpoints: ["Work through the permit example from words to expression, circuit and table, then attempt Q1 using different conditions.", "Read Circuit B by labelling intermediate outputs. Attempt Q2 and Q3, then construct a circuit from a table in Q4. Complete the exam tasks with answers closed."],
    units: [
      unit("S3.10-STATEMENT", "From a problem or expression to a circuit and table", logic([8, 9, 10]), [
        "Translate a problem statement by defining what the value 1 means for each variable. Write a logic expression with explicit NOT operations and brackets. A condition such as ‘both are off’ requires two inverted inputs combined with AND.",
        "Construct the logic circuit from the innermost operations outward. Label intermediate wires and the final output. Use only two-input gates apart from NOT; a complete circuit may still have three or more independent inputs.",
        "To obtain the table from either the statement or the expression, list every input combination and calculate the intermediate and final values. Check the finished output column against the original condition, not just the expression you wrote.",
      ], [visual("Circuit A: permission rule", asset("circuit-a"), ["C passes through NOT before entering AND.", "D enters the other AND input; the final output is P."], "Circuit A connects C to a NOT gate and combines its output with D in an AND gate to produce P."),
        worked("A door permission rule in four forms", [["Problem", "Permission P is granted only when a valid request D is present and the lock condition C is off."], ["Expression and circuit", "P = D AND NOT C. In Circuit A the inversion occurs before the AND operation."], ["Complete table", "D C | NOT C | P\n0 0 |   1   | 0\n0 1 |   0   | 0\n1 0 |   1   | 1\n1 1 |   0   | 0"], ["Statement check", "The only permitted case has a valid request and no lock condition."]])], ["NOT (D AND C) changes the complete result and is a different rule from D AND NOT C."]),
      unit("S3.10-CIRCUIT", "From a given circuit to an expression and table", logic([9, 10]), [
        "Begin with the input labels and evaluate gates whose inputs are known. Name their outputs before following the wires into later gates. Branching wires carry the same value; a crossing is a connection only when the diagram indicates a junction.",
        "Write one expression for each intermediate output. Substitute those expressions into the final gate's expression, retaining brackets. For the table, evaluate the same intermediate columns in the same order for every input row.",
      ], [visual("Circuit B: two branches combine", asset("circuit-b"), ["A and B feed XOR, producing X.", "C feeds NOT, producing Y; X and Y feed AND to produce Q."], "Circuit B has A and B connected to XOR output X; C connected to NOT output Y; X and Y connected to AND output Q."),
        worked("Read Circuit B systematically", [["Local expressions", "X = A XOR B; Y = NOT C; Q = X AND Y."], ["Substitution", "Q = (A XOR B) AND (NOT C)."], ["Truth table", "A B C | X Y | Q\n0 0 0 | 0 1 | 0\n0 0 1 | 0 0 | 0\n0 1 0 | 1 1 | 1\n0 1 1 | 1 0 | 0\n1 0 0 | 1 1 | 1\n1 0 1 | 1 0 | 0\n1 1 0 | 0 1 | 0\n1 1 1 | 0 0 | 0"], ["Check the rule", "Q is high only when A and B differ and C is low."]])], ["Do not evaluate gates in page-reading order if a required input has not yet been calculated."]),
      unit("S3.10-FROM-TABLE", "From a truth table to an expression and circuit", logic([8, 10]), [
        "Each row with output 1 describes one accepted input condition. Make an AND term for that row: use the input variable for a 1 and its NOT form for a 0. Combine the accepted-row terms with OR.",
        "Draw the resulting expression with NOT gates for complemented inputs and two-input AND and OR gates. When a term has three inputs, cascade two AND gates. Several accepted terms likewise require a chain of two-input OR gates.",
        "An unsimplified expression is valid if it implements every row. Verify the circuit against the full source table, including output-0 rows; testing only an accepted case cannot establish equivalence.",
      ], [table("A table with more than one accepted row", ["A", "B", "Q"], [[0,0,1],[0,1,0],[1,0,0],[1,1,1]]),
        worked("Construct the equality rule", [["Accepted conditions", "Row 00 gives NOT A AND NOT B. Row 11 gives A AND B."], ["Combine", "Q = (NOT A AND NOT B) OR (A AND B)."], ["Wire the circuit", "Use NOT gates on A and B for the first AND branch. Feed unmodified A and B to a second AND. Join the two AND outputs with OR."], ["Alternative and verification", "NOT (A XOR B) is also valid. Either circuit produces Q = 1,0,0,1 for inputs 00,01,10,11."]])], ["Using only the first output-1 row loses other accepted conditions. Simplifying the expression is optional."]),
    ],
    practice: [
      practice(6, 1, "Construct a Boolean expression, circuit and truth table for a lamp L that lights only when switch S is on and both override inputs U and V are off. Use input order SUV = 000 to 111.", logic([8, 9, 10]), ["L = S AND ((NOT U) AND (NOT V)).", "U and V each feed a NOT gate, and their outputs feed AND.", "The intermediate AND result and S feed a second two-input AND producing L.", "All eight rows from 000 to 111 appear once.", "L outputs are 0, 0, 0, 0, 1, 0, 0, 0."], "Three conditions must be combined using a cascade of two-input gates."),
      practice(6, 2, "Construct a truth table and draw a circuit for Q = (A NOR B) XOR C. Include a column N = A NOR B and list inputs ABC from 000 to 111.", logic([8, 9]), ["The NOR output N connects to one XOR input, and C to the other; the XOR output is Q.", "All eight input combinations appear in order.", "N values are 1, 1, 0, 0, 0, 0, 0, 0.", "Q values are 1, 0, 0, 1, 0, 1, 0, 1."], "Evaluate NOR before XOR; a NOR output is high only when both its inputs are low."),
      practice(6, 3, "Construct an expression and full truth table for this circuit: A and B feed AND; that output and C feed OR; the OR output feeds NOT to produce Q. Label the intermediate AND output X and OR output Y.", logic([9, 10]), ["X = A AND B; Y = X OR C; Q = NOT ((A AND B) OR C).", "The input rows are 000, 001, 010, 011, 100, 101, 110, 111.", "X values are 0, 0, 0, 0, 0, 0, 1, 1; Y values are 0, 1, 0, 1, 0, 1, 1, 1.", "Q values are 1, 0, 1, 0, 1, 0, 0, 0."], "The last NOT inverts the complete OR output."),
      practice(6, 4, "Construct a Boolean expression and circuit from a table with input order AB = 00,01,10,11 and output Q = 0,1,1,0. First give an AND/OR/NOT expression, then identify an equivalent single gate.", logic([8, 10]), ["The accepted-row terms are NOT A AND B, and A AND NOT B.", "Q = (NOT A AND B) OR (A AND NOT B).", "Invert A for the first two-input AND and B for the second, then combine their outputs with OR.", "A single XOR gate is equivalent, giving 0,1,1,0 for the stated input order."], "Both output-1 rows must contribute to the constructed expression."),
    ],
    summary: [["Start from words", "Define the variables and preserve ‘both’, ‘either’ and each negation."], ["Read a circuit", "Name intermediate outputs, then substitute their expressions into later gates."], ["Build a table", "Enumerate 2^n input combinations and calculate intermediate values before the final output."], ["Start from a table", "OR together the AND terms for every output-1 row, then check all rows."]],
  };
}

export function authorSection3Lesson(source) {
  if (source.section !== 3) return source;
  let lesson = structuredClone(source);
  if ([17, 18].includes(lesson.originalLesson)) lesson = logicLessons(lesson);
  if (lesson.originalLesson === 14) {
    lesson.units[1].misconceptions = ["Additive manufacture forms successive layers. Some processes form a whole layer in one exposure; that is not the same as forming the whole object at once."];
    lesson.summary = lesson.summary.map(([heading, body]) => [heading, heading === "Sound devices" ? "A microphone produces an analogue signal; an ADC digitises it. A speaker turns an electrical signal into sound." : body]);
    lesson.teachingCheckpoints = ["Teach laser and 3D printing, then use practice Q1–Q2 to reconstruct their operation in order.", "Teach microphone and speaker conversion chains, then use Q3–Q4 to locate ADC and DAC correctly.", "Compare magnetic, flash and optical storage with Q5–Q7; finish with touch and VR in Q8–Q9. Use the independent exam tasks to diagnose faults and explain consequences."];
  }
  if (lesson.originalLesson === 15) {
    lesson.units[0] = unit("S3.04-BUFFER", "Buffers absorb temporary differences in transfer rate", ids("S3.04", [1]), [
      "A buffer is an area of memory holding data temporarily during transfer between components or devices. It allows a burst from a sender to wait while a receiver consumes the data at its own rate.",
      "Buffer capacity is finite. If incoming data continues to arrive faster than it is removed, the buffer eventually fills; the sender must wait or data may be lost. Buffering does not increase the receiver's sustained operating rate.",
      "A printer can receive blocks into a buffer while the processor performs other work. A device driver translates device-specific commands, and a print queue orders waiting jobs; these have different roles from the temporary data storage itself.",
    ], [table("Follow the waiting blocks", ["Time", "Event", "Blocks still in buffer"], [["0 s", "Sender places P1, P2, P3 in an empty buffer", "P1, P2, P3"], ["1 s", "Receiver removes P1", "P2, P3"], ["2 s", "Receiver removes P2", "P3"], ["3 s", "Receiver removes P3", "Empty"]])], ["The table counts waiting data only. Removed blocks must not remain in the buffer column."]);
    lesson.units[1].materials.push({ ...table("RAM and ROM across devices", ["Device", "Changing data in RAM", "Persistent instructions in ROM"], [["Desktop computer", "Running applications and their data", "Start-up firmware"], ["Printer", "Working page or incoming print data", "Printer-control firmware"], ["Embedded data logger", "Current readings and intermediate calculations", "Measurement and start-up instructions"]]), objectiveIds: ids("S3.05", [1, 2]) });
    lesson.units[2].useAuthoredVisual = true;
    lesson.units[2].materials = [visual("Powered latch or refreshed charge", asset("sram-dram-storage"), ["SRAM maintains a bit in a powered bistable latch; external access circuitry reads or writes it.", "DRAM holds a bit as capacitor charge; periodic refresh restores the charge state.", "Both are volatile. SRAM suits fast cache; dense, lower-cost DRAM suits large main memory."], "Conceptual comparison of a powered SRAM latch with read/write access and a DRAM capacitor with access and refresh. This is a functional diagram, not a transistor circuit."), table("Choose memory from the constraint", ["Factor", "SRAM", "DRAM"], [["Bit storage", "Bistable latch / flip-flop circuit", "Charge in a capacitor"], ["Refresh", "Not needed while powered", "Periodic refresh needed"], ["Typical trade-off", "Faster; higher cost per bit; lower density", "Slower; lower cost per bit; higher density"], ["Use and reason", "Small processor cache: fast access", "Desktop main memory: large affordable capacity"]])].map((m) => ({ ...m, objectiveIds: ids("S3.06", [1, 2, 3, 4]) }));
    lesson.practice[0] = practice(3, 1, "Explain why a printer buffer can help a computer send a short burst of data to a slower printer. Explain what happens if the buffer fills.", ids("S3.04", [1]), ["The buffer temporarily holds print data that has arrived but is not yet consumed.", "The printer removes that data at its own rate while the processor can perform other work.", "The buffer smooths a temporary difference between the sending and receiving rates.", "Once the buffer is full, transfer must pause or further arriving data may be lost."], "Temporary storage does not make the printer's physical mechanism faster.");
    lesson.summary = [["Buffer", "A finite store handles bursts and temporary rate differences during transfer."], ["RAM and ROM", "RAM holds changing working data; ROM retains firmware across shutdown."], ["SRAM and DRAM", "Latch storage favours low latency; capacitor storage favours density and cost, but needs refresh."], ["ROM variants", "PROM: program once. EPROM: ultraviolet erase. EEPROM: electrical erase and rewrite."]];
    lesson.teachingCheckpoints = ["Trace the buffer table before Q1; distinguish waiting data from data already removed.", "Use the three device examples for RAM/ROM, then justify cache and main-memory choices. Finish by selecting a ROM variant from its update requirements."];
  }
  if (lesson.originalLesson === 16) {
    lesson.practice[4] = practice(4, 5, "Explain how a controller should respond to these temperature readings when it switches a heater on below 18 °C and off at or above 20 °C: 17 °C, 19 °C, 20 °C. Between the thresholds it retains the previous state. Identify which readings provide feedback after the heater starts.", [...ids("S3.08", [1, 2, 3]), ...ids("S3.09", [1, 2])], ["A temperature sensor provides the readings for the controller's stored rule.", "At 17 °C the controller switches the heater actuator on.", "At 19 °C it keeps the heater on because the upper switching threshold has not been reached.", "At 20 °C it switches the heater off.", "The later 19 °C and 20 °C readings provide feedback about the actual effect of heating."], "Apply the given thresholds and previous state rather than inventing a single target.");
    lesson.summary = [["Monitoring", "Measure, record or report the physical condition."], ["Control", "Compare a reading with a rule and operate an actuator to change the condition."], ["Sensors", "Match temperature, pressure, infra-red or sound sensing to the required physical input."], ["Feedback", "Use new readings to judge the actual result and adjust or stop the action."]];
  }
  lesson.summaryMode = "authored";
  lesson.practice = lesson.practice.map((question) => ({ ...question, authored: true }));
  lesson.authoredExamQuestions = section3ExamQuestions[lesson.originalLesson];
  return lesson;
}
