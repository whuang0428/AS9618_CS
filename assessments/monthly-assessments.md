# Monthly Assessments

Use these 30-mark checkpoints roughly every 18-20 lessons. Allow 40 minutes plus correction time.

All questions are original Cambridge-style practice, not copied past-paper questions. Wording and marking guidance are calibrated against the [official Cambridge 9618 past-papers and mark-schemes page](https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/past-papers/) and the [2027-2029 syllabus](https://www.cambridgeinternational.org/Images/721397-2027-2029-syllabus.pdf).

## Marking conventions

- Each listed answer point is worth 1 mark unless stated otherwise.
- Follow-through is allowed only where the Guidance explicitly permits it.
- Text separated by a forward slash gives acceptable alternatives for the same mark, not extra marks.
- Credit clear equivalent wording unless a specific syllabus term or representation is required.
- Do not award repeated, self-contradictory or vague statements as separate points.

## Checkpoint at Lesson 021: Information representation and communication

**Syllabus:** Sections 1, 2

**Assessment objectives:** AO1, AO2

**Time:** 40 minutes

**Total:** 30 marks

### Questions

1. (a) Convert denary 173 to 8-bit binary. (b) Convert hexadecimal B6 to denary. **[4]**
2. A 640 x 480 bitmap has 16-bit colour depth. Calculate its uncompressed pixel data in MiB. **[6]**
3. Describe how a packet is transmitted from one host to another through a switched network, including addressing, routing and reassembly. **[6]**
4. Describe how a browser uses a URL, DNS, IP addressing and network devices to request a web page from a remote server. **[8]**
5. A music service supplies photographic album covers and recorded songs on demand. Explain suitable representation, compression and streaming choices. **[6]**

### Answer Key / Mark Scheme

#### Q1 [4]

| Answer | Guidance | Marks |
|---|---|---:|
| selects binary place values 128, 32, 8, 4 and 1 | Do not award a conversion answer in the wrong base. | 1 |
| 10101101 |  | 1 |
| 11 x 16 + 6 |  | 1 |
| 182 |  | 1 |

#### Q2 [6]

| Answer | Guidance | Marks |
|---|---|---:|
| 640 x 480 = 307200 pixels | Allow FT from the candidate's earlier incorrect pixel total only when the candidate then multiplies by colour depth and converts bits to bytes and bytes to MiB correctly. | 1 |
| multiplies by 16 |  | 1 |
| 4915200 bits |  | 1 |
| divides by 8 to obtain 614400 bytes |  | 1 |
| divides by 2^20 |  | 1 |
| 0.5859375 MiB / approximately 0.586 MiB |  | 1 |

#### Q3 [6]

| Answer | Guidance | Marks |
|---|---|---:|
| data is divided into packets | Do not describe a permanent dedicated path or omit destination reassembly. | 1 |
| packet contains destination addressing and sequence/control information |  | 1 |
| switch forwards the local frame toward the router or destination |  | 1 |
| router selects a route/next hop using the destination IP address |  | 1 |
| packets may take different routes and errors/loss can be detected |  | 1 |
| destination checks and reassembles packets in the correct order |  | 1 |

#### Q4 [8]

| Answer | Guidance | Marks |
|---|---|---:|
| browser identifies protocol/domain/path from URL | Do not accept that DNS stores the page or that MAC addresses route end-to-end across the internet. | 1 |
| DNS resolves domain name to server IP address |  | 1 |
| request is split/encapsulated into packets |  | 1 |
| destination IP is included for routing |  | 1 |
| switch/WAP forwards local frame on LAN |  | 1 |
| router forwards packets between networks |  | 1 |
| packets may take routes and are reassembled/checked |  | 1 |
| server response returns and browser renders the resource |  | 1 |

#### Q5 [6]

| Answer | Guidance | Marks |
|---|---|---:|
| album photograph is represented as a bitmap/pixels | Do not award generic 'compress it' or 'stream it' without a representation or mechanism. | 1 |
| lossy image compression can reduce size with acceptable visual loss |  | 1 |
| sound is represented by samples with sampling rate and resolution |  | 1 |
| lossy audio compression can remove less perceptible data to reduce bit rate |  | 1 |
| on-demand streaming begins before the complete file is downloaded |  | 1 |
| buffer stores arriving data to absorb rate variation and reduce playback interruption |  | 1 |

---

## Checkpoint at Lesson 041: Communication and hardware

**Syllabus:** Sections 2, 3

**Assessment objectives:** AO1, AO2

**Time:** 40 minutes

**Total:** 30 marks

### Questions

1. Compare LAN, WAN, client-server and peer-to-peer using a school example. **[4]**
2. Describe the principal operation of a laser printer from page data to fused output. **[6]**
3. A greenhouse uses temperature sensors and fans. Describe the control loop and explain why a buffer may be needed when readings are sent to a slower storage device. **[6]**
4. Suggest hardware for a portable wildlife-monitoring station and justify choices for input, processing, storage, output/communication and reliability. **[8]**
5. A warehouse alarm should sound when Smoke is detected OR when Door is open while Armed is true. Construct the logic and explain how it controls the alarm. **[6]**

### Answer Key / Mark Scheme

#### Q1 [4]

| Answer | Guidance | Marks |
|---|---|---:|
| LAN covers a limited site under local control | Each mark requires a distinct technical distinction. | 1 |
| WAN connects geographically separated networks |  | 1 |
| client-server uses dedicated server roles/services |  | 1 |
| peer-to-peer devices share resources directly without dedicated central server |  | 1 |

#### Q2 [6]

| Answer | Guidance | Marks |
|---|---|---:|
| drum receives an electrostatic charge | Do not award inkjet spraying steps. | 1 |
| laser discharges selected areas to form image |  | 1 |
| toner is attracted to the image areas |  | 1 |
| paper receives an opposite charge / toner transfers |  | 1 |
| fuser applies heat and pressure |  | 1 |
| toner becomes permanently bonded to paper |  | 1 |

#### Q3 [6]

| Answer | Guidance | Marks |
|---|---|---:|
| sensor measures temperature | Do not accept a monitor-only system with no actuator response. | 1 |
| ADC/digital value is read by processor |  | 1 |
| reading compared with target/threshold |  | 1 |
| fan actuator switched/adjusted |  | 1 |
| feedback reading repeats and changes action |  | 1 |
| buffer temporarily holds readings because producer and storage operate at different rates |  | 1 |

#### Q4 [8]

| Answer | Guidance | Marks |
|---|---|---:|
| appropriate sensor/camera/microphone input | Do not award a list of devices without scenario-linked reasons. | 1 |
| embedded processor/microcontroller for dedicated automatic operation |  | 1 |
| non-volatile flash storage because no moving parts/low power |  | 1 |
| wireless/cellular/satellite communication suited to remote location |  | 1 |
| battery plus solar or other realistic power provision |  | 1 |
| weatherproof enclosure/environmental protection |  | 1 |
| local buffering/storage handles connection loss |  | 1 |
| explains the data path from sensor input through processing/local storage to remote transmission |  | 1 |

#### Q5 [6]

| Answer | Guidance | Marks |
|---|---|---:|
| identifies Door AND Armed sub-expression | Allow an equivalent correctly labelled circuit; do not replace the required AND with OR. | 1 |
| combines Smoke OR (Door AND Armed) |  | 1 |
| correct Boolean expression/output label |  | 1 |
| AND gate output is 1 only when Door and Armed are both 1 |  | 1 |
| OR gate output is 1 when smoke or the armed-door condition is 1 |  | 1 |
| logic output drives an actuator such as siren through the control system |  | 1 |

---

## Checkpoint at Lesson 061: Processor fundamentals and system software

**Syllabus:** Sections 4, 5

**Assessment objectives:** AO1, AO2

**Time:** 40 minutes

**Total:** 30 marks

### Questions

1. State the roles of PC, MAR, MDR and CIR during instruction processing. **[4]**
2. Trace these operations: ACC starts at 12; ADD #5; SUB #3; LSL 1. State ACC after each instruction and the final 8-bit binary value. **[6]**
3. Explain the two passes of an assembler and how a forward reference is resolved. **[6]**
4. A team is developing a Java application. Explain how the OS, compiler/JVM, IDE and DLL/library support development and execution. **[8]**
5. Describe how the processor handles an interrupt from an input device and then resumes the interrupted program. **[6]**

### Answer Key / Mark Scheme

#### Q1 [4]

| Answer | Guidance | Marks |
|---|---|---:|
| PC holds address of next instruction | Do not merge MDR and CIR roles. | 1 |
| MAR holds address currently accessed |  | 1 |
| MDR holds data/instruction transferred to/from memory |  | 1 |
| CIR holds current instruction for decode/execute |  | 1 |

#### Q2 [6]

| Answer | Guidance | Marks |
|---|---|---:|
| after ADD: 17 | Allow FT from the candidate's earlier ACC value only when the subsequent subtraction and eight-bit LSL are applied correctly. | 1 |
| after SUB: 14 |  | 1 |
| 14 = 00001110 |  | 1 |
| logical shift left moves bits and inserts 0 |  | 1 |
| final 28 |  | 1 |
| 00011100 |  | 1 |

#### Q3 [6]

| Answer | Guidance | Marks |
|---|---|---:|
| pass 1 scans source/assigns addresses | Do not accept that either pass executes the program. | 1 |
| pass 1 builds symbol table of labels |  | 1 |
| forward label may be used before its definition |  | 1 |
| completed symbol table supplies label address |  | 1 |
| pass 2 translates mnemonics/opcodes and operands |  | 1 |
| unresolved/invalid symbols produce errors / machine code is output |  | 1 |

#### Q4 [8]

| Answer | Guidance | Marks |
|---|---|---:|
| OS manages process scheduling | Credit only correctly attributed roles; do not award a product-name list. | 1 |
| OS manages memory/files/devices/security |  | 1 |
| Java compiler translates source to bytecode |  | 1 |
| JVM interprets/JIT-compiles bytecode for host |  | 1 |
| IDE syntax checking/context prompts support writing |  | 1 |
| breakpoint/single-step/variable inspection supports debugging |  | 1 |
| library supplies reusable tested code |  | 1 |
| dynamic linking shares code but creates version/dependency risk |  | 1 |

#### Q5 [6]

| Answer | Guidance | Marks |
|---|---|---:|
| interrupt request is raised/detected | Do not accept that the interrupted program restarts from its first instruction. | 1 |
| processor completes the current instruction and checks priority/enabled state |  | 1 |
| current register state/return address is saved |  | 1 |
| interrupt service routine address is loaded and ISR executes |  | 1 |
| saved state is restored |  | 1 |
| execution resumes at the saved next instruction |  | 1 |

---

## Checkpoint at Lesson 081: Security, ethics and database foundations

**Syllabus:** Sections 6, 7, 8

**Assessment objectives:** AO1, AO2

**Time:** 40 minutes

**Total:** 30 marks

### Questions

1. Compare data security, privacy, integrity and verification. **[4]**
2. Describe how a digital signature is created and checked. **[6]**
3. A company deploys AI recruitment software. Explain two ethical risks and one control for each. **[6]**
4. A library stores member and loan data in one flat file. Explain four problems this can cause and four relational database or DBMS features that address them. **[8]**
5. A school must choose an open-source or proprietary licence for examination software. Evaluate the choice. **[6]**

### Answer Key / Mark Scheme

#### Q1 [4]

| Answer | Guidance | Marks |
|---|---|---:|
| security protects against unauthorised access/loss/damage | Do not accept four versions of 'keeps data safe'. | 1 |
| privacy concerns appropriate use/disclosure of personal data |  | 1 |
| integrity concerns accurate/complete/authorised data |  | 1 |
| verification checks copied/entered data matches its source |  | 1 |

#### Q2 [6]

| Answer | Guidance | Marks |
|---|---|---:|
| sender hashes message | Do not award confidentiality unless separate message encryption is described. | 1 |
| hash is signed/encrypted with sender private key |  | 1 |
| signature accompanies message |  | 1 |
| receiver uses sender public key to verify/recover signed hash |  | 1 |
| receiver hashes received message |  | 1 |
| matching hashes provide integrity and sender-authenticity evidence |  | 1 |

#### Q3 [6]

| Answer | Guidance | Marks |
|---|---|---:|
| identifies bias/discrimination caused by unrepresentative historical training data | Do not award generic 'AI may be bad' claims. | 1 |
| explains a consequence such as qualified applicants being unfairly rejected |  | 1 |
| gives a matching control such as representative data, fairness testing or human review |  | 1 |
| identifies privacy risk from collecting or retaining excessive applicant data |  | 1 |
| explains a consequence such as unauthorised disclosure or use beyond recruitment |  | 1 |
| gives a matching control such as data minimisation, access control, consent or retention limits |  | 1 |

#### Q4 [8]

| Answer | Guidance | Marks |
|---|---|---:|
| repeated member details create data duplication | Award each problem only when it is distinct and each feature only when its mechanism addresses a stated database need; do not require SQL or a join. | 1 |
| separate copies may become inconsistent after an update |  | 1 |
| inserting or deleting a loan can require repeated edits or lose unrelated member data |  | 1 |
| a large flat file is harder to search, share or control reliably |  | 1 |
| related tables separate member and loan facts so each fact can be stored once |  | 1 |
| a candidate/primary key uniquely identifies each record |  | 1 |
| suitable field data types, constraints or an index improve validity or retrieval |  | 1 |
| a DBMS feature such as access rights, backup or the query processor manages controlled use of the data |  | 1 |

#### Q5 [6]

| Answer | Guidance | Marks |
|---|---|---:|
| open-source code may be inspected/modified under licence terms | Do not award a product preference without developed licence and context reasoning. | 1 |
| open-source support/accountability may depend on supplier/community arrangements |  | 1 |
| proprietary product may provide contracted support/certified updates |  | 1 |
| proprietary licence restricts copying/modification and may add cost/vendor dependence |  | 1 |
| copyright and licence conditions still apply to either model |  | 1 |
| recommends one licence model and justifies it using examination reliability/security plus support, cost or supplier dependence |  | 1 |

---

## Checkpoint at Lesson 101: Paper 1 review and algorithm design

**Syllabus:** Sections 1-9

**Assessment objectives:** AO1, AO2, AO3

**Time:** 40 minutes

**Total:** 30 marks

### Questions

1. A 30-second mono recording uses 16000 samples/s and 16 bits/sample. Calculate its uncompressed size in MiB. **[4]**
2. Explain how an interrupt from an input device is handled by the processor. **[6]**
3. Use stepwise refinement to design an algorithm that inputs ten valid marks and outputs the mean and highest mark. **[6]**
4. A school replaces a file-based student system with a relational DBMS. Explain four benefits and four mechanisms/features that produce them. **[8]**
5. A networked temperature-control system sends readings to a server. Explain six features from sensing to secure communication. **[6]**

### Answer Key / Mark Scheme

#### Q1 [4]

| Answer | Guidance | Marks |
|---|---|---:|
| 16000 x 16 x 30 = 7680000 bits | Allow FT from the candidate's earlier incorrect bit total only when the candidate then divides by 8 and by 2^20 correctly. | 1 |
| divides by 8 = 960000 bytes |  | 1 |
| divides by 2^20 |  | 1 |
| approximately 0.916 MiB |  | 1 |

#### Q2 [6]

| Answer | Guidance | Marks |
|---|---|---:|
| interrupt request is raised | Do not accept that the whole program restarts. | 1 |
| processor completes/checks current instruction |  | 1 |
| priority/enabled status is checked |  | 1 |
| processor state/return address is saved |  | 1 |
| ISR is located and executed |  | 1 |
| state restored and interrupted program resumes |  | 1 |

#### Q3 [6]

| Answer | Guidance | Marks |
|---|---|---:|
| high-level modules/input-process-output identified | Credit structured English or pseudocode if the refinement is explicit and coherent. | 1 |
| initialises total and maximum |  | 1 |
| ten-iteration loop |  | 1 |
| validation repeats until mark in valid range |  | 1 |
| updates total and maximum |  | 1 |
| calculates mean and outputs both results |  | 1 |

#### Q4 [8]

| Answer | Guidance | Marks |
|---|---|---:|
| reduced duplication through related normalised tables | Do not award vague benefits without a DBMS mechanism. | 1 |
| reduced inconsistency because one fact is updated once |  | 1 |
| integrity constraints/validation protect valid relationships |  | 1 |
| access rights limit data/actions by user |  | 1 |
| concurrent/shared access is centrally managed |  | 1 |
| query processor/SQL supports flexible retrieval |  | 1 |
| backup/recovery supports restoration |  | 1 |
| data dictionary/schema centrally defines structure |  | 1 |

#### Q5 [6]

| Answer | Guidance | Marks |
|---|---|---:|
| sensor measures temperature and converts/provides a digital reading | Do not award six disconnected device names without their roles in the system. | 1 |
| processor compares reading with a stored threshold |  | 1 |
| actuator is changed and feedback readings continue |  | 1 |
| buffer temporarily stores readings when transmission/storage rates differ |  | 1 |
| packets use destination IP/routing to reach the server |  | 1 |
| encryption/authentication protects transmitted data or access |  | 1 |

---

## Checkpoint at Lesson 121: Algorithms and data structures

**Syllabus:** Sections 9, 10

**Assessment objectives:** AO2, AO3

**Time:** 40 minutes

**Total:** 30 marks

### Questions

1. Complete an identifier table for an algorithm storing 20 temperatures, their total and calculated mean. **[4]**
2. Write Cambridge pseudocode for an ascending bubble sort of Value[1:Count]. **[6]**
3. Explain how an array of records can store 100 students, each with StudentID, Name and Mark, and how one student's mark can be accessed and updated. **[6]**
4. Write Cambridge pseudocode that reads records from a text file, stores up to 100 records in an array and uses linear search for a supplied ID. **[8]**
5. An ordered array contains [4, 9, 15, 21, 30, 44, 57]. Complete a trace table for binary search for 30 and explain its precondition. **[6]**

### Answer Key / Mark Scheme

#### Q1 [4]

| Answer | Guidance | Marks |
|---|---|---:|
| meaningful array identifier with REAL type and purpose | Each mark requires name, type and purpose to be coherent. | 1 |
| meaningful REAL Total identifier and purpose |  | 1 |
| meaningful REAL Mean identifier and purpose |  | 1 |
| index/count identifier with INTEGER type where used |  | 1 |

#### Q2 [6]

| Answer | Guidance | Marks |
|---|---|---:|
| uses repeated passes over the populated array | Do not award a single-pass trace in place of the requested algorithm, and do not allow Index + 1 to exceed Count. | 1 |
| inner loop compares adjacent valid elements Value[Index] and Value[Index + 1] |  | 1 |
| tests whether the left value is greater than the right value |  | 1 |
| uses Temp or an equivalent safe swap preserving both values |  | 1 |
| reduces the unsorted upper range or uses a correct no-swap flag stopping condition |  | 1 |
| closes the selection and loops coherently in Cambridge pseudocode |  | 1 |

#### Q3 [6]

| Answer | Guidance | Marks |
|---|---|---:|
| defines a record with named StudentID, Name and Mark fields | Allow equivalent Cambridge record and array notation; do not award an ADT stack, queue or linked-list answer. | 1 |
| uses suitable field types such as STRING for Name and INTEGER/REAL for Mark |  | 1 |
| declares or describes an array containing 100 Student records |  | 1 |
| uses an index within the declared lower and upper bounds to select one student record |  | 1 |
| uses field access to read the selected student's Mark |  | 1 |
| assigns a new value to the selected Mark field without replacing unrelated student fields |  | 1 |

#### Q4 [8]

| Answer | Guidance | Marks |
|---|---|---:|
| opens file for READ | Use Cambridge file and array conventions; do not accept Java API calls. | 1 |
| loops until EOF with capacity control |  | 1 |
| reads/parses each record |  | 1 |
| stores record in next array element and updates count |  | 1 |
| closes file |  | 1 |
| inputs target ID and searches only populated elements |  | 1 |
| compares record ID and records found position/state |  | 1 |
| outputs the matching record when found and a not-found result only after all populated elements have been checked |  | 1 |

#### Q5 [6]

| Answer | Guidance | Marks |
|---|---|---:|
| first checks middle value 21 | Allow zero-based or one-based indexes when the convention is declared and used consistently for all bounds and the final position. | 1 |
| discards lower half and checks 44 or equivalent bounds update |  | 1 |
| continues to/checks 30 |  | 1 |
| finds 30 at the correct declared index/position |  | 1 |
| array must be sorted in the search order |  | 1 |
| each comparison can discard half of the remaining search interval |  | 1 |

---

## Checkpoint at Lesson 141: Programming and robust program design

**Syllabus:** Sections 11

**Assessment objectives:** AO2, AO3

**Time:** 40 minutes

**Total:** 30 marks

### Questions

1. Write a function IsValidMark(Mark : INTEGER) returning BOOLEAN for the inclusive range 0 to 100. **[4]**
2. Write a procedure Swap(BYREF A : INTEGER, BYREF B : INTEGER) and explain why reference parameters are needed. **[6]**
3. Develop a test plan for a login rule: username must exist and three wrong passwords lock the account. Include normal, abnormal and boundary tests. **[6]**
4. A program uses procedures and functions to process marks read from a text file. Explain how interfaces, parameters, scope, validation, file handling and debugging can make the program reliable and maintainable. **[8]**
5. Write Cambridge pseudocode to read every line from Results.txt, count lines containing 'PASS', and output the count. State one debugging check. **[6]**

### Answer Key / Mark Scheme

#### Q1 [4]

| Answer | Guidance | Marks |
|---|---|---:|
| correct function header and BOOLEAN return type | Do not use Java syntax or OR for the range. | 1 |
| tests Mark >= 0 |  | 1 |
| tests Mark <= 100 combined with AND |  | 1 |
| returns Boolean and closes function |  | 1 |

#### Q2 [6]

| Answer | Guidance | Marks |
|---|---|---:|
| procedure header with two BYREF integer parameters | Do not award a swap that overwrites one value before saving it. | 1 |
| temporary variable stores A |  | 1 |
| A receives B |  | 1 |
| B receives temporary value |  | 1 |
| reference parameters alias caller variables |  | 1 |
| changes persist after procedure returns |  | 1 |

#### Q3 [6]

| Answer | Guidance | Marks |
|---|---|---:|
| valid username/password expected successful login | Examples must state expected results. | 1 |
| unknown username expected rejection |  | 1 |
| wrong password below limit expected rejection without lock |  | 1 |
| third wrong password boundary expected lock |  | 1 |
| correct password after lock expected denial/defined locked behaviour |  | 1 |
| records test ID/data/expected and actual/pass-fail fields |  | 1 |

#### Q4 [8]

| Answer | Guidance | Marks |
|---|---|---:|
| a procedure/function header defines the callable name and parameter types | Do not award a list of terms without explaining how each mechanism affects the stated program. | 1 |
| a function interface also states the return type/value expected by the caller |  | 1 |
| arguments supplied at a call must match the declared parameters |  | 1 |
| BYREF is used only when the caller's variable must be changed; BYVAL protects the caller value |  | 1 |
| local scope reduces unintended changes or name conflicts between modules |  | 1 |
| validation rejects or repeats invalid mark input before processing |  | 1 |
| the file is opened in the correct mode, processed to EOF and closed |  | 1 |
| trace output, breakpoints or single-step execution exposes incorrect values/control flow so a module can be corrected and retested |  | 1 |

#### Q5 [6]

| Answer | Guidance | Marks |
|---|---|---:|
| opens Results.txt FOR READ | Do not accept Java file APIs or output of the counter only inside the loop. | 1 |
| initialises PassCount to 0 |  | 1 |
| loops WHILE NOT EOF and reads each line |  | 1 |
| increments only when the line contains 'PASS' or when a parsed status field equals 'PASS' |  | 1 |
| closes file and outputs PassCount after the loop |  | 1 |
| valid debugging check such as trace count/line values or breakpoint inside loop |  | 1 |
