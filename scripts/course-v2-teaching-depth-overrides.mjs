// Hand-authored teaching units for the P0 findings in the whole-course depth audit.
// These records are semantic source data. Generators may format them but must not
// shorten, reorder or infer replacements for their explanations and worked steps.

export const teachingDepthOverrides = {
  "006:S1.11": {
    explanations: [
      "Compression represents the same useful information with fewer bits. Lossless compression reconstructs every original bit; lossy compression permanently removes selected detail and cannot recreate the exact original.",
      "Ordinary text, program source and other symbol data normally require lossless compression because changing or removing a character can change the meaning. RLE and dictionary references are lossless when their decoding rules reproduce every symbol exactly.",
      "A bitmap can use lossless RLE when neighbouring pixels have long repeated colour runs. A photographic bitmap may instead use lossy compression that removes fine colour or spatial detail, accepting some quality reduction for a smaller file.",
      "A vector file can store a repeated object or property once and refer to it, without changing the drawing instructions. Sound can use lossless pattern coding for exact samples or lossy perceptual coding that removes less-audible information when the application accepts a quality trade-off.",
      "RLE stores each run as a count and a value. It is effective for long runs when the saved repetitions outweigh the count/value overhead; short or constantly changing runs can make the encoded data larger."
    ],
    mechanismSteps: [
      { label: "Fidelity", title: "Decide whether exact reconstruction is required", detail: "Choose lossless for text or evidence that must be reproduced bit for bit; choose lossy only when discarded detail is acceptable." },
      { label: "Pattern", title: "Inspect the data for usable redundancy", detail: "Look for repeated symbols, pixel runs, repeated vector objects or less-perceptible sound detail instead of choosing by filename alone." },
      { label: "Check", title: "Compare size and quality after encoding", detail: "Decode lossless data to confirm equality; for lossy data, judge whether the irreversible quality loss remains acceptable for its purpose." }
    ],
    workedExamples: [
      {
        title: "Encode and decode a run-length sequence",
        steps: [
          { label: "Source", text: "Start with AAAABBCCCCCCCCDD." },
          { label: "Runs", text: "Separate the data into AAAA | BB | CCCCCCCC | DD." },
          { label: "Encode", text: "Write a count/value pair for every run: 4A 2B 8C 2D." },
          { label: "Decode", text: "Expand the pairs to four A values, two B values, eight C values and two D values; the result exactly matches the source." },
          { label: "Counterexample", text: "ABC becomes 1A 1B 1C. The counts add overhead, so RLE is unsuitable for this data even though it is lossless." }
        ]
      },
      {
        title: "Choose a method for four file types",
        steps: [
          { label: "Text", text: "Use lossless RLE for repeated characters or a lossless dictionary for repeated strings; every original character must return." },
          { label: "Bitmap", text: "Use RLE for a flat-colour logo with long pixel runs, or controlled lossy compression for a photograph when smaller size is worth reduced detail." },
          { label: "Vector", text: "Store a repeated shape or property once and reference it, preserving the drawing instructions exactly." },
          { label: "Sound", text: "Use lossless coding for an evidential recording; perceptual lossy coding can suit streamed music when the irreversible quality loss is acceptable." }
        ]
      }
    ],
    misconceptions: [
      "Lossless does not guarantee a smaller result: RLE can grow data that has few useful runs.",
      "Lossy compression is not normally suitable for ordinary text because a discarded symbol can change meaning."
    ]
  },

  "011:S2.14": {
    explanations: [
      "A modem converts digital data into signalling suitable for an access link and converts received signalling back into data. The exact signalling depends on the connection technology; a modem is not a router.",
      "A PSTN connection uses the Public Switched Telephone Network. A modem adapts data to the telephone link, which was designed primarily for voice and is normally shared through the provider network.",
      "A dedicated line gives an organisation a continuously available link between agreed endpoints. It offers predictable capacity but costs more because the connection is reserved rather than established only when needed.",
      "A cell phone network, also called a cellular phone network, carries the access link by radio between a mobile device and a base station. Coverage, signal strength, congestion and mobility affect the available connection."
    ],
    mechanismSteps: [
      { label: "Device", title: "Create the data request", detail: "The end device sends data through its NIC or wireless interface toward the local router or access equipment." },
      { label: "Access", title: "Adapt data for the chosen connection", detail: "A modem or cellular radio converts the data into the signalling used by the PSTN, dedicated line or mobile network." },
      { label: "Provider", title: "Carry data to the internet service provider", detail: "The provider receives the access-link signal, recovers the data and routes packets onward to other networks." }
    ],
    workedExamples: [{
      title: "Choose an internet-supporting connection",
      steps: [
        { label: "Temporary home link", text: "A PSTN link can use existing telephone infrastructure, but its data capacity and availability are limited compared with a dedicated connection." },
        { label: "School service", text: "A school hosting services may justify a dedicated line because the endpoint is fixed and predictable continuous capacity matters." },
        { label: "Mobile worker", text: "A cellular connection uses radio and supports movement, but coverage and congestion can change performance." },
        { label: "Signal conversion", text: "In each case, name the equipment that adapts the device data to the access-link signalling; do not call every device a router." }
      ]
    }],
    misconceptions: ["The internet connection method is the access path; it is not the same thing as a LAN switch or the World Wide Web."]
  },

  "012:S2.15": {
    nodes: [
      { label: "IPv4", value: "32-bit address" },
      { label: "IPv6", value: "128-bit address" },
      { label: "Subnet", value: "separates logical networks" },
      { label: "Interface", value: "owns the address" },
      { label: "Public/private", value: "different routing scope" },
      { label: "Static/dynamic", value: "different assignment lifetime" }
    ],
    cue: { title: "Address one interface, then route", text: "Version, subnet, scope and assignment answer different questions; none is a complete security control." },
    explanations: [
      "An IP address identifies a network interface so packets can be routed to it. IPv4 addresses contain 32 bits; IPv6 addresses contain 128 bits and are normally written as hexadecimal groups.",
      "Subnetting divides one address space into smaller logical networks by treating part of the address as the subnet identifier. Devices use the subnet information to decide whether a destination is local or must be sent to a router.",
      "A public address is an IP address routable on the public internet. A private address is used inside a local network and normally reaches the internet through address translation; private addressing reduces direct reachability but does not guarantee security.",
      "Static addresses stay assigned until deliberately changed, which suits servers that must be found predictably. Dynamic addresses are assigned for a period by a service such as DHCP and may change.",
      "An address belongs to a network interface, not permanently to a person or an entire physical computer. A device with wired and wireless interfaces can have a different address on each interface."
    ],
    mechanismSteps: [
      { label: "Format", title: "Identify the address version", detail: "Use 32-bit IPv4 or 128-bit IPv6 and interpret the address notation accurately." },
      { label: "Scope", title: "Separate network and host information", detail: "Use the subnet definition to decide whether the destination is local or must be forwarded to a router." },
      { label: "Allocation", title: "Classify reachability and assignment", detail: "Distinguish public/private scope and static/dynamic allocation, then state the practical consequence of each choice." }
    ],
    workedExamples: [{
      title: "Classify an interface address",
      steps: [
        { label: "Address", text: "A school printer interface uses IPv4 address 192.168.10.37 with the first 24 bits identifying its subnet." },
        { label: "Subnet", text: "The interface is on subnet 192.168.10.0; a destination on another subnet must be sent to the router." },
        { label: "Scope", text: "192.168.10.37 is private, so it is not directly routed across the public internet." },
        { label: "Assignment", text: "The printer should normally receive a static assignment so clients can find it predictably." },
        { label: "Security", text: "The private address reduces direct exposure but authentication, firewall rules and updates are still needed." }
      ]
    }],
    misconceptions: ["DNS resolves a domain name; it does not decide whether an IP address is static, dynamic, public or private."]
  },

  "012:S2.16": {
    nodes: [
      { label: "Scheme", value: "access method" },
      { label: "Domain", value: "named host" },
      { label: "Path", value: "resource on host" },
      { label: "DNS", value: "domain to IP" },
      { label: "IP address", value: "server network destination" },
      { label: "Browser", value: "requests the WWW resource" }
    ],
    cue: { title: "Resolve the host, request the path", text: "DNS handles the domain name; the browser sends the path to the web server after resolution." },
    explanations: [
      "A Uniform Resource Locator (URL) identifies a WWW resource. Its scheme states how to access the resource, the domain name identifies the named host, and the path identifies the resource on that host.",
      "A URL can also contain an optional port, query and fragment. These components have different jobs and are not all sent to DNS.",
      "DNS resolves the domain name to an IP address. It does not resolve the path, store the web page or return the requested resource.",
      "After resolution, the browser uses the returned IP address to contact the web server and sends a request containing the required host and path. The server then locates or generates the resource and returns it."
    ],
    mechanismSteps: [
      { label: "Parse", title: "Separate the URL components", detail: "Identify the scheme, domain name and path before deciding which component DNS must resolve." },
      { label: "Resolve", title: "Ask DNS for the domain address", detail: "DNS looks up the domain name and returns an IP address; it does not process the resource path." },
      { label: "Request", title: "Contact the web server", detail: "The browser connects using the IP address and requests the path so the server can return the WWW resource." }
    ],
    workedExamples: [{
      title: "Resolve and request one URL",
      steps: [
        { label: "URL", text: "For https://www.example.org/course/page.html?unit=2#quiz, https is the scheme, www.example.org is the domain and /course/page.html is the path." },
        { label: "DNS", text: "The browser asks DNS to resolve www.example.org and receives the server's IP address." },
        { label: "Connection", text: "The browser opens the HTTPS connection to that address and identifies the host it wants." },
        { label: "Request", text: "The browser requests /course/page.html with query unit=2; the server, not DNS, locates or generates the resource." },
        { label: "Fragment", text: "The browser uses #quiz to move to a location within the returned document; the fragment is not part of the DNS lookup." }
      ]
    }],
    misconceptions: ["DNS maps a domain name to an IP address; it does not translate the entire URL into a web page."]
  },

  "014:S3.03": {
    explanations: [
      "Laser printer: a drum is charged, a laser changes the charge at image positions, toner adheres to those positions, the toner transfers to paper, and heat and pressure fuse it permanently.",
      "3D printer: software slices a digital model into layers; the printer deposits, melts or solidifies material one layer at a time until the physical object is built.",
      "Microphone: sound vibrates a diaphragm; a transducer produces an analogue electrical signal, and an analogue-to-digital converter samples it into binary values.",
      "Speaker: a digital-to-analogue converter and amplifier drive a coil in a magnetic field; the attached cone vibrates and creates pressure waves that are heard as sound.",
      "Magnetic hard disk: platters rotate while an actuator positions a read/write head. Writing changes magnetic orientation; reading senses the stored magnetic pattern.",
      "Flash memory: electrical charge is stored in floating-gate cells. The controller reads charge states and erases or programs blocks electronically, so no moving parts are required.",
      "Optical disc reader/writer: the disc spins while a laser follows its track. Reflected-light differences are read as data; a higher-power writing laser changes a dye or recording layer on writable media.",
      "Capacitive touchscreen: a transparent electrode grid creates an electric field. A finger changes capacitance, and the controller calculates the touch coordinates from the measured changes.",
      "Virtual-reality headset: separate images are displayed to the two eyes while orientation and motion sensors measure head movement. The computer updates the viewpoint with low latency so the scene follows the user's movement."
    ],
    mechanismSteps: [
      { label: "Input", title: "Identify the incoming energy or data", detail: "Name the light, sound, touch, electrical data or stored pattern presented to the device." },
      { label: "Convert", title: "Trace the physical conversion", detail: "Follow charge, magnetism, light, motion or material through the named internal components in the correct order." },
      { label: "Output", title: "State the resulting data or physical effect", detail: "Finish with the printed page, object, binary data, sound, touch coordinates, stored data or updated visual scene." }
    ],
    workedExamples: [{
      title: "Trace three different conversions",
      steps: [
        { label: "Microphone", text: "Sound wave → diaphragm motion → analogue electrical signal → ADC samples → binary sample values." },
        { label: "Speaker", text: "Binary sample values → DAC analogue signal → amplified coil movement → cone vibration → sound wave." },
        { label: "Laser printer", text: "Page description → laser charge pattern on drum → toner image → transfer to paper → fuser bonds toner." },
        { label: "Compare", text: "The microphone and touchscreen are input devices, the speaker and printers are output devices, and HDD/flash/optical media store data; the mechanism justifies the category." }
      ]
    }],
    misconceptions: ["Naming a component is not enough: a principal-operation answer must connect input, internal conversion and output in order."]
  },

  "018:S3.10": {
    nodes: [
      { label: "NOT", value: "inverts one input" },
      { label: "AND/NAND", value: "opposite outputs" },
      { label: "OR/NOR", value: "opposite outputs" },
      { label: "XOR", value: "inputs must differ" },
      { label: "Expression", value: "names Boolean operations" },
      { label: "Truth table", value: "checks every input row" }
    ],
    cue: { title: "One rule, four equivalent forms", text: "Use the same variables and intermediate results in the problem statement, expression, circuit and truth table." },
    explanations: [
      "NOT reverses its single input. AND outputs 1 only when both inputs are 1. OR outputs 1 when at least one input is 1.",
      "NAND is NOT-AND, so it outputs 0 only for inputs 1,1. NOR is NOT-OR, so it outputs 1 only for inputs 0,0. XOR or EOR outputs 1 when the two inputs are different.",
      "Each standard gate symbol identifies a Boolean function. The symbol fixes how inputs connect to the gate, while the function states the output rule that its truth-table rows must follow.",
      "To convert a problem statement, first name Boolean variables and write the condition for the output. Preserve brackets and NOT operations when translating the expression into gate connections.",
      "To build a truth table, list every input combination, add a column for each intermediate gate output, and calculate the final output row by row. Two inputs require four rows; three inputs require eight.",
      "A circuit, expression and truth table are equivalent only when they produce the same final output for every input combination. Checking one row is not sufficient evidence of equivalence."
    ],
    mechanismSteps: [
      { label: "Variables", title: "Translate the problem into Boolean conditions", detail: "Assign one variable to each stated input and decide exactly when the required output should be 1." },
      { label: "Structure", title: "Construct the expression or circuit", detail: "Apply NOT first, preserve brackets and connect named intermediate results through the required gates." },
      { label: "Verify", title: "Evaluate every truth-table row", detail: "List all input combinations, calculate intermediate columns and confirm that all representations give the same output." }
    ],
    workedExamples: [{
      title: "Convert a door-alarm rule through four representations",
      steps: [
        { label: "Statement", text: "The alarm sounds when the door is open and the security code is not accepted." },
        { label: "Expression", text: "Let D mean door open and C mean code accepted. The expression is Alarm = D AND NOT C." },
        { label: "Circuit", text: "Pass C through a NOT gate, then connect D and NOT C to an AND gate. The AND output is Alarm." },
        { label: "Rows", text: "For D,C = 0,0 → NOT C=1, Alarm=0; 0,1 → 0,0; 1,0 → 1,1; 1,1 → 0,0." },
        { label: "Check", text: "Only the row with an open door and an unaccepted code produces Alarm=1, so the statement, expression, circuit and truth table agree." }
      ]
    }],
    misconceptions: ["OR includes the 1,1 case; XOR excludes it. NAND and NOR are complete inverted functions, not alternative symbols for AND and OR."]
  },

  "024:S4.13": {
    explanations: [
      "Data movement: LDM #n loads immediate n into ACC; LDD address loads Memory[address]; LDI address follows the address stored in Memory[address]; LDX address loads Memory[address + IX]; LDR #n loads n into IX; MOV IX copies ACC to IX; STO address stores ACC in memory.",
      "Arithmetic: ADD and SUB change ACC using a directly addressed or immediate denary, binary or hexadecimal operand. INC register and DEC register increase or decrease ACC or IX by one.",
      "Control and comparison: JMP address always branches. CMP compares ACC with a direct or immediate operand; CMI address compares ACC with the value reached by indirect addressing. JPE <address> branches after a True comparison and JPN <address> branches after a False comparison.",
      "Input/output and termination: IN reads one character and places its ASCII code in ACC; OUT outputs the character represented by the ASCII code in ACC; END returns control to the operating system.",
      "Operands are part of the semantics. # marks an immediate value, B an immediate binary value and & an immediate hexadecimal value; an address can be absolute or a symbolic label."
    ],
    mechanismSteps: [
      { label: "Decode", title: "Identify opcode and addressing form", detail: "Read the mnemonic and operand prefix together; do not guess an effect from the mnemonic letters alone." },
      { label: "Execute", title: "Update only the affected state", detail: "Change ACC, IX, memory, comparison flag, input/output or control flow exactly as the instruction specifies." },
      { label: "Trace", title: "Choose the next executed instruction", detail: "Record one row per executed instruction and follow a taken branch instead of tracing skipped source lines." }
    ],
    workedExamples: [{
      title: "Trace load, arithmetic, comparison and output",
      steps: [
        { label: "Initial", text: "Memory[20]=4, Memory[21]=65, ACC=0 and IX=0." },
        { label: "LDM #3", text: "Load immediate value 3 into ACC; ACC becomes 3." },
        { label: "ADD 20", text: "Add Memory[20], which is 4; ACC becomes 7." },
        { label: "CMP #7", text: "Compare ACC with immediate 7; the comparison result is True." },
        { label: "JPE MATCH", text: "Because the comparison is True, branch to MATCH and skip any intervening instructions." },
        { label: "LDD 21 / OUT", text: "Load ASCII code 65 into ACC and output character A." },
        { label: "END", text: "Return control to the operating system." }
      ]
    }],
    misconceptions: ["LDR #n loads IX, not ACC. CMI is indirect comparison. JPE follows True and JPN follows False."]
  },

  "041:S8.05": {
    explanations: [
      "A Database Management System (DBMS) provides managed features that address file-based duplication, inconsistency, isolation and uncontrolled access. The features work together rather than acting as unrelated utilities.",
      "A data dictionary stores metadata about tables, fields, data types, keys, constraints and relationships. DBMS tools consult this dictionary when checking definitions, queries and data values.",
      "Data modelling represents the entities, attributes and relationships needed by the organisation. The logical schema turns that model into the table structures, keys, constraints and relationships visible to programs without depending on physical disk layout.",
      "Data integrity rules reject invalid or inconsistent changes, for example an unmatched foreign key. Data security limits who can read or change data; access rights can be assigned to individual users or groups according to their roles.",
      "Backup procedures copy recoverable database state, while recovery restores a consistent state after loss or failure. A backup is not an access-control substitute, and access rights do not replace recovery planning."
    ]
  },

  "044:S8.11": {
    explanations: [
      "INSERT INTO adds a new row. Name the target fields when possible and supply values in the same order with types that match the table definition.",
      "UPDATE changes values in existing rows. SET gives the new value and WHERE selects the rows; omitting WHERE can update every row.",
      "DELETE FROM removes complete rows. WHERE selects which rows are deleted; use UPDATE instead when the record should remain but one field must change.",
      "Before executing UPDATE or DELETE, test the WHERE condition with a SELECT query or otherwise verify which rows match. The condition is part of the data-safety reasoning, not optional punctuation."
    ],
    mechanismSteps: [
      { label: "Intent", title: "Choose add, change or remove", detail: "Use INSERT for a new row, UPDATE for changed field values and DELETE when selected rows must be removed." },
      { label: "Target", title: "Match fields, values and conditions", detail: "Check the table schema, field types and WHERE condition before constructing the statement." },
      { label: "Verify", title: "Predict the affected rows", detail: "State which rows are added, changed or removed and check that no unintended row matches." }
    ],
    workedExamples: [{
      title: "Maintain one Student record safely",
      steps: [
        { label: "Insert", text: "INSERT INTO Student (StudentID, StudentName, Active) VALUES (17, 'Mina', TRUE); adds one row." },
        { label: "Update", text: "UPDATE Student SET Active = FALSE WHERE StudentID = 17; changes only Mina's Active field." },
        { label: "Delete", text: "DELETE FROM Student WHERE StudentID = 17; removes the selected row when the record is no longer required." },
        { label: "Risk", text: "Without WHERE, the UPDATE or DELETE statement could affect every row in Student." }
      ]
    }],
    misconceptions: ["DELETE removes rows, not selected field values. UPDATE changes fields in rows that remain."]
  },

  "060:S10.06": {
    explanations: [
      "Linear search examines array elements in index order until the target is found or every populated element has been checked. It works on unsorted data.",
      "A complete algorithm initialises the index and found flag, keeps every array access within declared bounds, compares the current element, advances after a failed comparison and reports both found and not-found outcomes.",
      "Stopping the loop immediately after the last valid comparison prevents an out-of-bounds access. A trace of one search is useful evidence, but the syllabus also requires the learner to write the complete algorithm.",
      "Bubble sort repeatedly compares adjacent elements and swaps a pair when it is in the wrong order. Each ascending pass fixes the largest remaining value at the high end, so the next pass can use a shorter inner-loop bound."
    ],
    mechanismSteps: [
      { label: "Initialise", title: "Set the first index and found state", detail: "Start at the declared lower bound with Found set to FALSE before reading an array element." },
      { label: "Search", title: "Compare within the valid bounds", detail: "Test the current item against Target and advance the index only when the current item does not match." },
      { label: "Finish", title: "Report found or exhausted", detail: "Stop on a match or after the upper populated bound and return an index or a clear not-found result." }
    ],
    workedExamples: [
      {
        title: "Write a bounded linear search",
        steps: [
          { label: "Code", text: "DECLARE Found : BOOLEAN\nDECLARE Index : INTEGER\nFound <- FALSE\nIndex <- 1\nWHILE Index <= Count AND NOT Found\n  IF Code[Index] = Target THEN\n    Found <- TRUE\n  ELSE\n    Index <- Index + 1\n  ENDIF\nENDWHILE" },
          { label: "Found case", text: "Searching [K4, M2, P7] for M2 checks indexes 1 then 2 and stops with Found=TRUE and Index=2." },
          { label: "Absent case", text: "Searching the same array for Z9 checks indexes 1, 2 and 3, then stops when Index=4 without accessing Code[4]." }
        ]
      },
      {
        title: "Write and trace an ascending bubble sort",
        steps: [
          { label: "Code", text: "FOR Pass <- 1 TO Count - 1\n  FOR Index <- 1 TO Count - Pass\n    IF Value[Index] > Value[Index + 1] THEN\n      Temp <- Value[Index]\n      Value[Index] <- Value[Index + 1]\n      Value[Index + 1] <- Temp\n    ENDIF\n  NEXT Index\nNEXT Pass" },
          { label: "Pass 1", text: "For [4, 1, 3], compare 4/1 and swap to [1,4,3]; compare 4/3 and swap to [1,3,4]." },
          { label: "Pass 2", text: "Compare 1/3; no swap is needed and the array remains [1,3,4]." }
        ]
      }
    ],
    misconceptions: ["A linear search does not require sorted data, but it must still respect the declared array bounds."]
  },

  "061:S10.06": {
    explanations: [
      "Bubble sort makes repeated passes through the unsorted part of an array. It compares adjacent elements and swaps them when they are in the wrong order.",
      "After each ascending pass, the largest remaining value has moved to the high end, so the next inner loop can stop one position earlier.",
      "A complete algorithm requires nested loop bounds, an adjacent comparison, a three-assignment swap and a valid stopping rule. Showing one swap or one pass is not the same as writing the algorithm.",
      "Linear search checks successive array elements until it finds the target or exhausts the populated bounds. It works on unsorted data and must include both the found and not-found outcomes."
    ],
    mechanismSteps: [
      { label: "Pass", title: "Choose the unsorted range", detail: "Run Count−1 passes and shorten the compared range because the high end becomes sorted after each pass." },
      { label: "Compare", title: "Inspect adjacent values", detail: "For ascending order, swap when Value[Index] is greater than Value[Index+1]." },
      { label: "Swap", title: "Use a temporary variable safely", detail: "Store one value in Temp before overwriting it, then complete all three assignments." }
    ],
    workedExamples: [
      {
        title: "Write and trace an ascending bubble sort",
        steps: [
          { label: "Code", text: "FOR Pass <- 1 TO Count - 1\n  FOR Index <- 1 TO Count - Pass\n    IF Value[Index] > Value[Index + 1] THEN\n      Temp <- Value[Index]\n      Value[Index] <- Value[Index + 1]\n      Value[Index + 1] <- Temp\n    ENDIF\n  NEXT Index\nNEXT Pass" },
          { label: "Pass 1", text: "For [4, 1, 3], compare 4/1 and swap → [1,4,3]; compare 4/3 and swap → [1,3,4]. The largest value is now fixed at the end." },
          { label: "Pass 2", text: "Compare 1/3; no swap is needed, so the final array is [1,3,4]." }
        ]
      },
      {
        title: "Write and test a bounded linear search",
        steps: [
          { label: "Code", text: "DECLARE Found : BOOLEAN\nDECLARE Index : INTEGER\nFound <- FALSE\nIndex <- 1\nWHILE Index <= Count AND NOT Found\n  IF Code[Index] = Target THEN\n    Found <- TRUE\n  ELSE\n    Index <- Index + 1\n  ENDIF\nENDWHILE" },
          { label: "Found case", text: "Searching [K4, M2, P7] for M2 checks indexes 1 then 2 and stops with Found=TRUE and Index=2." },
          { label: "Absent case", text: "Searching for Z9 checks all three valid indexes and stops with Index=4 without reading beyond the array." }
        ]
      }
    ],
    misconceptions: ["Bubble sort compares adjacent values. It does not select the smallest value from the whole remaining array in one step."]
  },

  "080:S11.07": {
    nodes: [
      { label: "Function", value: "returns one typed value" },
      { label: "Parameters", value: "receive argument values" },
      { label: "RETURN", value: "sends result to caller" },
      { label: "Call", value: "invokes the calculation" },
      { label: "Expression", value: "uses returned value" },
      { label: "Procedure", value: "performs a named task" }
    ],
    cue: { title: "The call becomes its result", text: "CalculateVAT(50.00) is replaced by 10.00 before the surrounding Total expression is evaluated." },
    explanations: [
      "Functions are named subroutines that each return one value of a declared type. A function is appropriate when an algorithm needs a reusable calculation whose result will be used by another statement.",
      "Parameters receive the supplied argument values. The RETURN statement supplies the function result to the caller; it is not the same as printing the value.",
      "A function call can appear inside an expression. The returned value replaces the call before the surrounding arithmetic, comparison or assignment is completed.",
      "A procedure performs a named task and need not return a single value. Choose a function for a value-producing calculation and a procedure for an action or coordinated sequence of operations."
    ],
    mechanismSteps: [
      { label: "Define", title: "Declare parameters and return type", detail: "Give the function a meaningful name, typed parameters and the type of value it returns." },
      { label: "Return", title: "Calculate and return one value", detail: "Use RETURN with the calculated result on every valid execution path." },
      { label: "Use", title: "Place the call in an expression", detail: "Supply arguments and evaluate the returned value where the function call appears." }
    ],
    workedExamples: [{
      title: "Use a returned value in an expression",
      steps: [
        { label: "Definition", text: "FUNCTION CalculateVAT(Price : REAL) RETURNS REAL\n  RETURN Price * 0.20\nENDFUNCTION" },
        { label: "Call", text: "Total <- Price + CalculateVAT(Price)" },
        { label: "Evaluate", text: "If Price is 50.00, CalculateVAT(50.00) returns 10.00. The call is replaced by 10.00, so Total becomes 60.00." },
        { label: "Decision", text: "A function is suitable because the VAT calculation produces one value that is required inside a larger expression." }
      ]
    }],
    misconceptions: ["OUTPUT inside a procedure does not make it a function. A function must return a value to its caller."]
  },

  "082:S12.02": {
    explanations: [
      "A structure chart documents decomposition before coding. Each box names a module, procedure or function; hierarchy lines show which module calls another; labelled arrows show the parameters passed across an interface.",
      "To construct the chart, put the controlling module at the top, split the task into single-responsibility subtasks, connect each caller to the modules it invokes, and label every data or control value passed.",
      "Parameters make module interfaces explicit. An input parameter supplies a value needed by the called module, while an output or by-reference parameter carries a changed result back where that interface is intended.",
      "To derive equivalent pseudocode, turn every chart box into a PROCEDURE or FUNCTION with matching formal parameters, then write calls in the parent modules using arguments in the same order and with compatible types.",
      "The pseudocode is equivalent only if it preserves the chart's hierarchy, call relationships and parameter flow; merely listing module names does not implement the design."
    ]
  }
};

export const questionRepairs = {
  "Q-L006-01": { syllabusIds: ["S1.11"] },
  "Q-L006-02": { syllabusIds: ["S1.10"] },
  "Q-L006-03": { syllabusIds: ["S1.11"] },

  "Q-L011-01": { syllabusIds: ["S2.13"] },
  "Q-L011-02": { syllabusIds: ["S2.12"] },
  "Q-L011-03": {
    syllabusIds: ["S2.14"], questionType: "compare", commandWord: "compare", marks: 6,
    prompt: "Compare a PSTN connection, a dedicated line and a cellular connection. Include the role of a modem or radio interface and give one suitable use for each connection.",
    answer: "PSTN uses the public switched telephone network and a modem adapts data to its signalling; a dedicated line is continuously available between agreed endpoints with predictable capacity but higher cost; a cellular connection uses radio through a base station and supports mobility but depends on coverage/congestion; one justified use for each method",
    guidance: "Award one linked mechanism/use point for each connection and one accurate modem or radio-interface point.",
    commonError: "Do not call all access equipment a router; state how data reaches the provider on each connection.",
    semanticFingerprint: { concept: "S2.14|internet-supporting-connections", action: "compare", scenario: "pstn-dedicated-cellular", representation: "written", answerForm: "compare" }
  },

  "Q-L012-01": { syllabusIds: ["S2.15"] },
  "Q-L012-02": { syllabusIds: ["S2.15"] },
  "Q-L012-03": {
    syllabusIds: ["S2.16"], questionType: "explain", commandWord: "explain", marks: 6,
    prompt: "For the URL https://school.example/course/page.html, identify the scheme, domain name and path, then explain how DNS and the browser use them to retrieve the WWW resource.",
    answer: "scheme is https; domain name is school.example; path is /course/page.html; DNS resolves only the domain name to an IP address; browser connects to the server using that address; browser requests the named path and the server returns the resource",
    guidance: "Keep DNS resolution separate from the browser's resource request.",
    commonError: "DNS does not resolve the path or return the web page.",
    semanticFingerprint: { concept: "S2.16|url-dns-resource", action: "explain", scenario: "school-url-resolution", representation: "written", answerForm: "explain" }
  },

  "Q-L014-01": {
    marks: 9,
    prompt: "Describe the principal operation of a laser printer, a 3D printer and a microphone. For each device, connect the input to the internal mechanism and output.",
    answer: "laser printer: charged drum, laser charge pattern, toner, paper transfer and fuser; 3D printer: digital model sliced into layers and material deposited/solidified layer by layer; microphone: diaphragm vibration, transducer analogue signal and ADC binary samples",
    semanticFingerprint: { concept: "S3.03|device-operation-a", action: "describe", scenario: "printer-3d-microphone", representation: "written", answerForm: "explain" }
  },
  "Q-L014-02": {
    syllabusIds: ["S3.03"], questionType: "explain", commandWord: "describe", marks: 9,
    prompt: "Describe the principal operation of a speaker, magnetic hard disk and flash memory. Name the physical conversion or storage mechanism in each case.",
    answer: "speaker: DAC/amplifier drives coil and cone to make pressure waves; HDD: rotating magnetic platters and positioned read/write heads change or sense magnetic orientation; flash: charge states stored and read electronically in floating-gate cells with no moving parts",
    guidance: "Award mechanism-linked points rather than device names alone.",
    commonError: "Do not describe RAM when the question asks for flash storage.",
    semanticFingerprint: { concept: "S3.03|device-operation-b", action: "describe", scenario: "speaker-hdd-flash", representation: "written", answerForm: "explain" }
  },
  "Q-L014-03": {
    syllabusIds: ["S3.03"], questionType: "compare", commandWord: "compare", marks: 9,
    prompt: "Compare the principal operation of an optical disc reader/writer, a capacitive touchscreen and a virtual-reality headset. For each one, trace its distinct input, conversion mechanism and result.",
    answer: "optical drive: spinning track and reflected laser differences, with a higher-power laser changing writable media; touchscreen: finger changes capacitance in an electrode grid and controller calculates coordinates; VR headset: separate eye images and motion/orientation sensors update the viewpoint with low latency",
    guidance: "Each description must include an input, mechanism and result.",
    commonError: "A laser is not a complete optical-drive explanation; state what reflected light or writing power does.",
    semanticFingerprint: { concept: "S3.03|device-operation-c", action: "describe", scenario: "optical-touch-vr", representation: "written", answerForm: "explain" }
  },

  "Q-L018-01": {
    marks: 8,
    prompt: "For Alarm = Door AND NOT CodeOK, construct a truth table with an intermediate NOT CodeOK column and state the gate connections needed for the circuit.",
    answer: "four input rows 00,01,10,11; NOT CodeOK values 1,0,1,0; Alarm values 0,0,1,0; CodeOK passes through NOT and its output joins Door at an AND gate",
    guidance: "Award the complete row set, correct intermediate column, final output and circuit structure.",
    commonError: "Do not omit intermediate columns or test only the row that produces 1.",
    semanticFingerprint: { concept: "S3.10|expression-table-circuit", action: "convert", scenario: "door-alarm", representation: "truth-table", answerForm: "calculate" }
  },
  "Q-L018-02": {
    syllabusIds: ["S3.10"], questionType: "explain", commandWord: "describe", marks: 6,
    prompt: "Describe the output rule for NOT, AND, OR, NAND, NOR and XOR. Include the input combinations that distinguish OR from XOR and AND from NAND.",
    answer: "NOT inverts one input; AND is 1 only for 11; OR is 1 for 01,10,11; NAND is inverse of AND and is 0 only for 11; NOR is inverse of OR and is 1 only for 00; XOR is 1 only when inputs differ, so unlike OR it is 0 for 11",
    guidance: "One accurate rule per gate; XOR and OR must be distinguished explicitly.",
    commonError: "XOR is not another name for OR.",
    semanticFingerprint: { concept: "S3.10|six-gate-functions", action: "describe", scenario: "gate-rule-comparison", representation: "written", answerForm: "explain" }
  },
  "Q-L018-03": {
    syllabusIds: ["S3.10"], questionType: "write", commandWord: "construct", marks: 6,
    prompt: "A warning is active when SensorA is on or when both SensorB and SensorC are off. Construct a logic expression, identify the circuit gates and state how many rows its truth table needs.",
    answer: "Warning = SensorA OR (NOT SensorB AND NOT SensorC); NOT gates on B and C, their outputs to AND, then that result and A to OR; three inputs require 2^3 = 8 rows",
    guidance: "Preserve the grouping of the two negated inputs before the OR operation.",
    commonError: "Do not replace NOT(B) AND NOT(C) with NOT(B AND C); they are different expressions.",
    semanticFingerprint: { concept: "S3.10|problem-expression-circuit", action: "construct", scenario: "three-sensor-warning", representation: "logic-expression", answerForm: "write" }
  },

  "Q-L024-03": {
    syllabusIds: ["S4.13"], questionType: "explain", commandWord: "state", marks: 19,
    prompt: "State the exact effect of each instruction: LDM #n, LDD address, LDI address, LDX address, LDR #n, MOV IX, STO address, ADD, SUB, INC, DEC, JMP, CMP, CMI, JPE, JPN, IN, OUT and END.",
    answer: "LDM loads immediate n to ACC; LDD loads directly addressed memory to ACC; LDI loads through an address stored in memory; LDX loads address+IX; LDR loads immediate n to IX; MOV IX copies ACC to IX; STO stores ACC; ADD/SUB change ACC by the operand; INC/DEC change ACC or IX by one; JMP always branches; CMP compares ACC directly or with immediate data; CMI compares indirectly; JPE branches after True; JPN branches after False; IN places an input character ASCII code in ACC; OUT outputs the character represented by ACC; END returns control to the operating system",
    guidance: "Award one mark per correct effect; operand and target register are part of the effect.",
    commonError: "Do not infer effects from mnemonic letters: LDR targets IX and CMI is indirect.",
    semanticFingerprint: { concept: "S4.13|complete-instruction-set", action: "state", scenario: "nineteen-instruction-effects", representation: "reference-table", answerForm: "explain" }
  },

  "Q-L044-01": { syllabusIds: ["S8.09"] },
  "Q-L044-02": {
    syllabusIds: ["S8.11"], questionType: "write", commandWord: "write", marks: 6,
    prompt: "For Student(StudentID, StudentName, Active), write: (a) an INSERT statement adding StudentID 17 named Mina; (b) an UPDATE making that student's Active value FALSE; and (c) a DELETE removing only that student.",
    answer: "INSERT INTO Student (StudentID, StudentName, Active) VALUES (17, 'Mina', TRUE); UPDATE Student SET Active = FALSE WHERE StudentID = 17; DELETE FROM Student WHERE StudentID = 17;",
    guidance: "Award statement keyword/structure, matching fields and values, and a safe WHERE condition for UPDATE and DELETE.",
    commonError: "Without WHERE, UPDATE or DELETE can affect every row.",
    semanticFingerprint: { concept: "S8.11|insert-update-delete", action: "write", scenario: "maintain-student-17", representation: "sql", answerForm: "write" }
  },
  "Q-L044-03": {
    syllabusIds: ["S8.11"], questionType: "explain", commandWord: "explain", marks: 4,
    prompt: "Explain why UPDATE and DELETE normally need a checked WHERE condition, and distinguish changing a field from removing a row.",
    answer: "WHERE limits the affected rows; an unchecked or missing condition can change/delete every row; UPDATE changes selected field values while retaining the row; DELETE removes the selected row",
    guidance: "Require both the safety consequence and the UPDATE/DELETE distinction.",
    commonError: "DELETE does not clear one field; it removes the row.",
    semanticFingerprint: { concept: "S8.11|safe-data-maintenance", action: "explain", scenario: "where-condition-risk", representation: "written", answerForm: "explain" }
  },

  "Q-L060-01": {
    questionType: "write", commandWord: "write", marks: 8,
    prompt: "Write complete Cambridge pseudocode for a linear search of Code[1:Count] for Target. Initialise all state, stay within the bounds, and report both found and not-found outcomes.",
    answer: "initialises Found to FALSE and Index to 1; loops while Index <= Count and not Found; compares Code[Index] with Target; sets Found on match; otherwise increments Index; never accesses beyond Count; reports Index/found or a clear not-found result",
    guidance: "A trace or prose description alone earns no algorithm-construction marks.",
    commonError: "Test the bound before every array access.",
    semanticFingerprint: { concept: "S10.06|write-linear-search", action: "write", scenario: "code-array-target", representation: "pseudocode", answerForm: "write" }
  },
  "Q-L060-02": {
    questionType: "trace", commandWord: "trace", marks: 5,
    prompt: "Trace the linear-search algorithm for [K4, M2, P7] with targets M2 and Z9. Show Index, current value and Found after each valid comparison.",
    answer: "M2: index1 K4 false, index2 M2 true and stop; Z9: indexes1 K4 false, 2 M2 false, 3 P7 false, then stop not found without reading index4",
    guidance: "The absent trace must demonstrate safe termination after the upper bound.",
    commonError: "Do not read a fourth element from a three-element array.",
    semanticFingerprint: { concept: "S10.06|trace-linear-search", action: "trace", scenario: "found-and-absent", representation: "trace-table", answerForm: "trace" }
  },

  "Q-L061-01": {
    questionType: "write", commandWord: "write", marks: 9,
    prompt: "Write complete Cambridge pseudocode for an ascending bubble sort of Value[1:Count]. Include both loop bounds, the adjacent comparison and a safe swap.",
    answer: "outer loop Pass 1 to Count-1; inner loop Index 1 to Count-Pass; compares Value[Index] > Value[Index+1]; uses Temp and three assignments to swap; closes IF and both loops",
    guidance: "A single pass or verbal description is not a complete algorithm.",
    commonError: "The inner bound must keep Index+1 inside the array.",
    semanticFingerprint: { concept: "S10.06|write-bubble-sort", action: "write", scenario: "ascending-value-array", representation: "pseudocode", answerForm: "write" }
  },
  "Q-L061-02": {
    questionType: "trace", commandWord: "trace", marks: 6,
    prompt: "Trace every adjacent comparison and swap when bubble sorting [4, 1, 3] into ascending order. Show the array after each comparison and identify the value fixed after the first pass.",
    answer: "4/1 swap -> [1,4,3]; 4/3 swap -> [1,3,4], fixing 4 at the high end; pass 2 compares 1/3 with no swap; final [1,3,4]",
    guidance: "Require the state after each comparison, not only the final array.",
    commonError: "Do not skip the no-swap comparison in the trace.",
    semanticFingerprint: { concept: "S10.06|trace-bubble-sort", action: "trace", scenario: "four-one-three", representation: "trace-table", answerForm: "trace" }
  },
  "Q-L061-03": {
    questionType: "explain", commandWord: "explain", marks: 4,
    prompt: "Explain why the inner loop of an ascending bubble sort can end at Count - Pass and why Index + 1 remains within bounds.",
    answer: "each completed pass fixes the largest remaining item at the high end; those fixed items need not be compared again; ending at Count-Pass makes the last right-hand access Index+1 no greater than Count",
    guidance: "Connect both the optimisation and the array-bound consequence.",
    commonError: "Count-Pass is not an arbitrary speed trick; it follows from the sorted high-end invariant.",
    semanticFingerprint: { concept: "S10.06|bubble-loop-bounds", action: "explain", scenario: "count-minus-pass", representation: "written", answerForm: "explain" }
  },

  "Q-L080-01": { syllabusIds: ["S11.06"] },
  "Q-L080-02": { syllabusIds: ["S11.01", "S11.04"] },
  "Q-L080-03": {
    syllabusIds: ["S11.07"], questionType: "write", commandWord: "write", marks: 7,
    prompt: "Write a function CalculateVAT(Price : REAL) that returns 20% of Price. Then write one assignment that uses its return value inside an expression to calculate Total, and explain why a function is appropriate.",
    answer: "FUNCTION CalculateVAT(Price : REAL) RETURNS REAL; RETURN Price * 0.20; ENDFUNCTION; Total <- Price + CalculateVAT(Price); function is appropriate because it produces one reusable value needed in an expression",
    guidance: "Require a declared return type, RETURN statement, call in an expression and an appropriate justification.",
    commonError: "Printing the VAT inside a procedure does not return a value to the expression.",
    semanticFingerprint: { concept: "S11.07|function-return-expression", action: "write", scenario: "calculate-vat-total", representation: "pseudocode", answerForm: "write" }
  }
};
