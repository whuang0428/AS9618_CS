# Monthly Assessments

Use these 24-mark checkpoints roughly every 18-20 lessons. Allow 35-45 minutes plus correction time.

All questions are original Cambridge-style practice, not copied past-paper questions. Wording and marking guidance are calibrated against the [official Cambridge 9618 past-papers and mark-schemes page](https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/past-papers/) and the [2027-2029 syllabus](https://www.cambridgeinternational.org/Images/721397-2027-2029-syllabus.pdf).

## Marking conventions

- **B1**: independent knowledge, identification or explanation point.
- **M1**: method/process point; award when the stated method is shown.
- **A1**: accurate answer or conclusion, normally dependent on the relevant method where indicated.
- **FT**: follow through a candidate's earlier value only where the note explicitly permits it.
- Text separated by a forward slash gives acceptable alternatives for the same mark, not extra marks.
- Credit clear equivalent wording unless a specific syllabus term or representation is required.
- Do not award repeated, self-contradictory or vague statements as separate points.

## Checkpoint at Lesson 020: Information representation and communication

**Syllabus:** Sections 1, 2

**Time:** 35-45 minutes

**Total:** 24 marks

### Questions

1. (a) Convert denary 173 to 8-bit binary. (b) Convert hexadecimal B6 to denary. **[4]**
2. A 640 x 480 bitmap has 16-bit colour depth. Calculate its uncompressed pixel data in MiB. **[6]**
3. A school connects two buildings. Compare fibre-optic cable with a wireless microwave link and recommend one. **[6]**
4. Describe how a browser uses a URL, DNS, IP addressing and network devices to request a web page from a remote server. **[8]**

### Answer Key / Mark Scheme

#### Q1 [4]

- **M1** selects binary place values 128, 32, 8, 4 and 1
- **A1** 10101101
- **M1** 11 x 16 + 6
- **A1** 182

**Guidance:** Do not award a conversion answer in the wrong base.

#### Q2 [6]

- **M1** 640 x 480 = 307200 pixels
- **M1** multiplies by 16
- **A1** 4915200 bits
- **M1** divides by 8 to obtain 614400 bytes
- **M1** divides by 2^20
- **A1** 0.5859375 MiB / approximately 0.586 MiB

**Guidance:** FT a candidate's pixel total through correct unit conversions.

#### Q3 [6]

- **B1** fibre supports high bandwidth/data rate
- **B1** fibre has low attenuation / resists electromagnetic interference
- **B1** fibre installation requires physical cable and may cost/disrupt
- **B1** microwave avoids laying cable / can bridge distance
- **B1** microwave needs line of sight and may suffer obstruction/weather/interference
- **B1** justified recommendation linked to distance, reliability or installation

**Guidance:** Do not award a recommendation without a developed comparison.

#### Q4 [8]

- **B1** browser identifies protocol/domain/path from URL
- **B1** DNS resolves domain name to server IP address
- **B1** request is split/encapsulated into packets
- **B1** destination IP is included for routing
- **B1** switch/WAP forwards local frame on LAN
- **B1** router forwards packets between networks
- **B1** packets may take routes and are reassembled/checked
- **B1** server response returns and browser renders the resource

**Guidance:** Do not accept that DNS stores the page or that MAC addresses route end-to-end across the internet.

---

## Checkpoint at Lesson 040: Communication and hardware

**Syllabus:** Sections 2, 3

**Time:** 35-45 minutes

**Total:** 24 marks

### Questions

1. Distinguish LAN, WAN, client-server and peer-to-peer using a school example. **[4]**
2. Describe the principal operation of a laser printer from page data to fused output. **[6]**
3. A greenhouse uses temperature sensors and fans. Describe the control loop and explain why a buffer may be needed when readings are sent to a slower storage device. **[6]**
4. Recommend hardware for a portable wildlife-monitoring station and justify choices for input, processing, storage, output/communication and reliability. **[8]**

### Answer Key / Mark Scheme

#### Q1 [4]

- **B1** LAN covers a limited site under local control
- **B1** WAN connects geographically separated networks
- **B1** client-server uses dedicated server roles/services
- **B1** peer-to-peer devices share resources directly without dedicated central server

**Guidance:** Each mark requires a distinct technical distinction.

#### Q2 [6]

- **B1** drum receives an electrostatic charge
- **B1** laser discharges selected areas to form image
- **B1** toner is attracted to the image areas
- **B1** paper receives an opposite charge / toner transfers
- **B1** fuser applies heat and pressure
- **B1** toner becomes permanently bonded to paper

**Guidance:** Do not award inkjet spraying steps.

#### Q3 [6]

- **B1** sensor measures temperature
- **B1** ADC/digital value is read by processor
- **B1** reading compared with target/threshold
- **B1** fan actuator switched/adjusted
- **B1** feedback reading repeats and changes action
- **B1** buffer temporarily holds readings because producer and storage operate at different rates

**Guidance:** Do not accept a monitor-only system with no actuator response.

#### Q4 [8]

- **B1** appropriate sensor/camera/microphone input
- **B1** embedded processor/microcontroller for dedicated automatic operation
- **B1** non-volatile flash storage because no moving parts/low power
- **B1** wireless/cellular/satellite communication suited to remote location
- **B1** battery plus solar or other realistic power provision
- **B1** weatherproof enclosure/environmental protection
- **B1** local buffering/storage handles connection loss
- **B1** coherent justification links components into one system

**Guidance:** Do not award a list of devices without scenario-linked reasons.

---

## Checkpoint at Lesson 060: Processor fundamentals and system software

**Syllabus:** Sections 4, 5

**Time:** 35-45 minutes

**Total:** 24 marks

### Questions

1. State the roles of PC, MAR, MDR and CIR during instruction processing. **[4]**
2. Trace these operations: ACC starts at 12; ADD #5; SUB #3; LSL 1. State ACC after each instruction and the final 8-bit binary value. **[6]**
3. Explain the two passes of an assembler and how a forward reference is resolved. **[6]**
4. A team is developing a Java application. Explain how the OS, compiler/JVM, IDE and DLL/library support development and execution. **[8]**

### Answer Key / Mark Scheme

#### Q1 [4]

- **B1** PC holds address of next instruction
- **B1** MAR holds address currently accessed
- **B1** MDR holds data/instruction transferred to/from memory
- **B1** CIR holds current instruction for decode/execute

**Guidance:** Do not merge MDR and CIR roles.

#### Q2 [6]

- **A1** after ADD: 17
- **A1** after SUB: 14
- **M1** 14 = 00001110
- **M1** logical shift left moves bits and inserts 0
- **A1** final 28
- **A1** 00011100

**Guidance:** FT a wrong arithmetic value through a correct eight-bit LSL where representable.

#### Q3 [6]

- **B1** pass 1 scans source/assigns addresses
- **B1** pass 1 builds symbol table of labels
- **B1** forward label may be used before its definition
- **B1** completed symbol table supplies label address
- **B1** pass 2 translates mnemonics/opcodes and operands
- **B1** unresolved/invalid symbols produce errors / machine code is output

**Guidance:** Do not accept that either pass executes the program.

#### Q4 [8]

- **B1** OS manages process scheduling
- **B1** OS manages memory/files/devices/security
- **B1** Java compiler translates source to bytecode
- **B1** JVM interprets/JIT-compiles bytecode for host
- **B1** IDE syntax checking/context prompts support writing
- **B1** breakpoint/single-step/variable inspection supports debugging
- **B1** library supplies reusable tested code
- **B1** dynamic linking shares code but creates version/dependency risk

**Guidance:** Credit only correctly attributed roles; do not award a product-name list.

---

## Checkpoint at Lesson 080: Security, ethics and database foundations

**Syllabus:** Sections 6, 7, 8

**Time:** 35-45 minutes

**Total:** 24 marks

### Questions

1. Distinguish data security, privacy, integrity and verification. **[4]**
2. Describe how a digital signature is created and checked. **[6]**
3. A company deploys AI recruitment software. Explain two ethical risks and one control for each. **[6]**
4. Design a relational database for members borrowing books. Identify tables/keys, explain referential integrity and write one query listing overdue member names. **[8]**

### Answer Key / Mark Scheme

#### Q1 [4]

- **B1** security protects against unauthorised access/loss/damage
- **B1** privacy concerns appropriate use/disclosure of personal data
- **B1** integrity concerns accurate/complete/authorised data
- **B1** verification checks copied/entered data matches its source

**Guidance:** Do not accept four versions of 'keeps data safe'.

#### Q2 [6]

- **B1** sender hashes message
- **B1** hash is signed/encrypted with sender private key
- **B1** signature accompanies message
- **B1** receiver uses sender public key to verify/recover signed hash
- **B1** receiver hashes received message
- **B1** matching hashes provide integrity and sender-authenticity evidence

**Guidance:** Do not award confidentiality unless separate message encryption is described.

#### Q3 [6]

- **B1** bias/discrimination risk identified
- **B1** representative data/fairness testing/human review mitigates bias
- **B1** privacy/excessive data collection risk identified
- **B1** minimisation/access/consent/retention control mitigates privacy risk
- **B1** one stakeholder consequence is developed
- **B1** professional accountability/audit/appeal is applied

**Guidance:** Do not award generic 'AI may be bad' claims.

#### Q4 [8]

- **B1** MEMBER with MemberID primary key
- **B1** BOOK with BookID primary key
- **B1** LOAN with key and MemberID/BookID foreign keys
- **B1** foreign keys must match existing parent records
- **B1** prevents orphan loans
- **B1** SELECT Member.Name
- **B1** valid INNER JOIN Member to Loan on MemberID
- **B1** WHERE DueDate < stated/current date and return status condition if supplied

**Guidance:** Allow an equivalent normalised design; do not require a particular table name.

---

## Checkpoint at Lesson 100: Paper 1 review and algorithm design

**Syllabus:** Sections 1-9

**Time:** 35-45 minutes

**Total:** 24 marks

### Questions

1. A 30-second mono recording uses 16000 samples/s and 16 bits/sample. Calculate its uncompressed size in MiB. **[4]**
2. Explain how an interrupt from an input device is handled by the processor. **[6]**
3. Use stepwise refinement to design an algorithm that inputs ten valid marks and outputs the mean and highest mark. **[6]**
4. A school replaces a file-based student system with a relational DBMS. Explain four benefits and four mechanisms/features that produce them. **[8]**

### Answer Key / Mark Scheme

#### Q1 [4]

- **M1** 16000 x 16 x 30 = 7680000 bits
- **M1** divides by 8 = 960000 bytes
- **M1** divides by 2^20
- **A1** approximately 0.916 MiB

**Guidance:** FT the candidate's bit total through correct conversions.

#### Q2 [6]

- **B1** interrupt request is raised
- **B1** processor completes/checks current instruction
- **B1** priority/enabled status is checked
- **B1** processor state/return address is saved
- **B1** ISR is located and executed
- **B1** state restored and interrupted program resumes

**Guidance:** Do not accept that the whole program restarts.

#### Q3 [6]

- **B1** high-level modules/input-process-output identified
- **B1** initialises total and maximum
- **B1** ten-iteration loop
- **B1** validation repeats until mark in valid range
- **B1** updates total and maximum
- **B1** calculates mean and outputs both results

**Guidance:** Credit structured English or pseudocode if the refinement is explicit and coherent.

#### Q4 [8]

- **B1** reduced duplication through related normalised tables
- **B1** reduced inconsistency because one fact is updated once
- **B1** integrity constraints/validation protect valid relationships
- **B1** access rights limit data/actions by user
- **B1** concurrent/shared access is centrally managed
- **B1** query processor/SQL supports flexible retrieval
- **B1** backup/recovery supports restoration
- **B1** data dictionary/schema centrally defines structure

**Guidance:** Do not award vague benefits without a DBMS mechanism.

---

## Checkpoint at Lesson 120: Algorithms and data structures

**Syllabus:** Sections 9, 10

**Time:** 35-45 minutes

**Total:** 24 marks

### Questions

1. Construct an identifier table for an algorithm storing 20 temperatures, their total and calculated mean. **[4]**
2. Trace one full ascending bubble-sort pass through [7,3,5,2] and state whether another pass is required. **[6]**
3. Compare an array-based stack, queue and linked list for undo history, print jobs and an editable playlist. **[6]**
4. Write Cambridge pseudocode that reads records from a text file, stores up to 100 records in an array and uses linear search for a supplied ID. **[8]**

### Answer Key / Mark Scheme

#### Q1 [4]

- **B1** meaningful array identifier with REAL type and purpose
- **B1** meaningful REAL Total identifier and purpose
- **B1** meaningful REAL Mean identifier and purpose
- **B1** index/count identifier with INTEGER type where used

**Guidance:** Each mark requires name, type and purpose to be coherent.

#### Q2 [6]

- **M1** compare 7 and 3; swap -> [3,7,5,2]
- **M1** compare 7 and 5; swap -> [3,5,7,2]
- **M1** compare 7 and 2; swap
- **A1** [3,5,2,7]
- **B1** swap flag is true / swaps occurred
- **B1** another pass is required because earlier items may remain out of order

**Guidance:** Follow through a single early comparison error if subsequent adjacent comparisons are consistent.

#### Q3 [6]

- **B1** undo uses stack
- **B1** LIFO returns most recent action first
- **B1** print jobs use queue
- **B1** FIFO processes earliest job first
- **B1** editable playlist can use linked list
- **B1** link-based insertion/deletion avoids shifting contiguous elements / preserves logical order

**Guidance:** Do not award ADT names without access-order/update justification.

#### Q4 [8]

- **B1** opens file for READ
- **B1** loops until EOF with capacity control
- **B1** reads/parses each record
- **B1** stores record in next array element and updates count
- **B1** closes file
- **B1** inputs target ID and searches only populated elements
- **B1** compares record ID and records found position/state
- **B1** outputs found record or not-found result and stops/handles duplicate policy coherently

**Guidance:** Use Cambridge file and array conventions; do not accept Java API calls.

---

## Checkpoint at Lesson 140: Programming and software development

**Syllabus:** Sections 11, 12

**Time:** 35-45 minutes

**Total:** 24 marks

### Questions

1. Write a function IsValidMark(Mark : INTEGER) returning BOOLEAN for the inclusive range 0 to 100. **[4]**
2. Write a procedure Swap(BYREF A : INTEGER, BYREF B : INTEGER) and explain why reference parameters are needed. **[6]**
3. Create a test plan for a login rule: username must exist and three wrong passwords lock the account. Include normal, abnormal and boundary tests. **[6]**
4. Compare waterfall, iterative and RAD for a safety-critical medical system. Recommend one approach and explain testing/maintenance implications. **[8]**

### Answer Key / Mark Scheme

#### Q1 [4]

- **B1** correct function header and BOOLEAN return type
- **B1** tests Mark >= 0
- **B1** tests Mark <= 100 combined with AND
- **B1** returns Boolean and closes function

**Guidance:** Do not use Java syntax or OR for the range.

#### Q2 [6]

- **B1** procedure header with two BYREF integer parameters
- **B1** temporary variable stores A
- **B1** A receives B
- **B1** B receives temporary value
- **B1** reference parameters alias caller variables
- **B1** changes persist after procedure returns

**Guidance:** Do not award a swap that overwrites one value before saving it.

#### Q3 [6]

- **B1** valid username/password expected successful login
- **B1** unknown username expected rejection
- **B1** wrong password below limit expected rejection without lock
- **B1** third wrong password boundary expected lock
- **B1** correct password after lock expected denial/defined locked behaviour
- **B1** records test ID/data/expected and actual/pass-fail fields

**Guidance:** Examples must state expected results.

#### Q4 [8]

- **B1** waterfall has planned sequential stages/documentation
- **B1** waterfall handles late change poorly
- **B1** iterative develops/evaluates repeated versions
- **B1** iterative supports feedback but needs controlled regression
- **B1** RAD uses rapid prototyping/time-boxing/user involvement
- **B1** RAD speed may conflict with exhaustive safety assurance
- **B1** recommendation is justified by traceability, risk and requirements stability
- **B1** testing and corrective/adaptive/perfective maintenance consequence is developed

**Guidance:** Do not award a model name without balanced context-specific justification.
