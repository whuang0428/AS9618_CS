# Short Quizzes

Use one quiz every 4-5 lessons. Each quiz is designed for 8-10 minutes and carries 10 marks.

All questions are original Cambridge-style practice, not copied past-paper questions. Wording and marking guidance are calibrated against the [official Cambridge 9618 past-papers and mark-schemes page](https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/past-papers/) and the [2027-2029 syllabus](https://www.cambridgeinternational.org/Images/721397-2027-2029-syllabus.pdf).

## Marking conventions

- **B1**: independent knowledge, identification or explanation point.
- **M1**: method/process point; award when the stated method is shown.
- **A1**: accurate answer or conclusion, normally dependent on the relevant method where indicated.
- **FT**: follow through a candidate's earlier value only where the note explicitly permits it.
- Text separated by a forward slash gives acceptable alternatives for the same mark, not extra marks.
- Credit clear equivalent wording unless a specific syllabus term or representation is required.
- Do not award repeated, self-contradictory or vague statements as separate points.

## Quiz after Lesson 005: Signed binary representations

**Syllabus:** Sections 1.1

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. Write -18 as an 8-bit two's-complement value. **[2]**
2. State one disadvantage of one's complement compared with two's complement. **[2]**
3. Interpret 11110101 as an 8-bit two's-complement integer. **[3]**
4. Explain why the same bit pattern can represent different values in sign-and-magnitude and two's complement. **[3]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **M1** 18 = 00010010; invert and add 1
- **A1** 11101110

**Guidance:** Do not accept sign-and-magnitude 10010010.

#### Q2 [2]

- **B1** one's complement has positive and negative zero
- **B1** this wastes a representation / complicates zero comparison

**Guidance:** Do not accept only 'it is less accurate'.

#### Q3 [3]

- **M1** recognises a negative value
- **M1** inverts and adds 1 to obtain 00001011
- **A1** -11

**Guidance:** Allow an equivalent subtraction-from-256 method.

#### Q4 [3]

- **B1** the representation rules assign different meanings to the bits
- **B1** sign-and-magnitude uses the MSB as a separate sign
- **B1** two's complement uses weighted negative MSB / invert-and-add-one encoding

**Guidance:** Do not credit 'because binary is confusing'.

---

## Quiz after Lesson 010: Digital sound

**Syllabus:** Sections 1.3

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. Define sampling rate and give its unit. **[2]**
2. Calculate the uncompressed size in bits of 5 s mono audio sampled at 8000 Hz with 8-bit resolution. **[2]**
3. Explain two effects of increasing sample resolution. **[3]**
4. A recording sounds distorted although its sampling rate is high. Explain why a low sample resolution may be responsible. **[3]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **B1** number of samples taken per second
- **B1** hertz / Hz

**Guidance:** Do not accept 'quality of each sample'.

#### Q2 [2]

- **M1** 8000 x 8 x 5
- **A1** 320000 bits

**Guidance:** Award A1 only with the correct unit.

#### Q3 [3]

- **B1** more bits/levels represent each sample
- **B1** amplitude is represented more accurately / quantisation error decreases
- **B1** file size/bit rate increases

**Guidance:** Do not accept 'more samples are taken'.

#### Q4 [3]

- **B1** few possible amplitude levels
- **B1** sample amplitudes are rounded to coarse levels
- **B1** larger quantisation error changes the reconstructed waveform

**Guidance:** Do not credit repetition of 'low quality' without mechanism.

---

## Quiz after Lesson 015: Section 1 mixed representation

**Syllabus:** Sections 1.1, 1.2, 1.3, 1.4

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. Convert hexadecimal 7D to denary. **[2]**
2. Write denary 48 as BCD. **[2]**
3. A 200 x 100 bitmap uses 4-bit colour. Calculate pixel data in bytes. **[3]**
4. Choose lossy or lossless compression for program source code and justify the choice. **[3]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **M1** 7 x 16 + 13
- **A1** 125

**Guidance:** Do not interpret D as 4.

#### Q2 [2]

- **B1** 4 -> 0100
- **B1** 8 -> 1000; answer 0100 1000

**Guidance:** Do not accept pure binary 00110000.

#### Q3 [3]

- **M1** 200 x 100 x 4 = 80000 bits
- **M1** divides by 8
- **A1** 10000 bytes

**Guidance:** FT the candidate's bit total if the conversion method is correct.

#### Q4 [3]

- **B1** lossless
- **B1** decompression must reproduce every character exactly
- **B1** a changed/lost character could alter syntax or program behaviour

**Guidance:** Do not accept only 'lossy reduces quality'.

---

## Quiz after Lesson 020: IP addressing, DNS and URLs

**Syllabus:** Sections 2.2

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. State the number of bits in IPv4 and IPv6 addresses. **[2]**
2. Identify the domain name in https://learn.example.org/unit/page.html. **[2]**
3. Explain the role of DNS after a URL is entered. **[3]**
4. Explain why a school laptop may use a dynamic private address while its public web server uses a static public address. **[3]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **B1** IPv4: 32 bits
- **B1** IPv6: 128 bits

**Guidance:** Both labels must be matched correctly.

#### Q2 [2]

- **B1** learn.example.org
- **B1** does not include protocol or path

**Guidance:** Do not accept example.org as the complete domain shown.

#### Q3 [3]

- **B1** extracts/uses the domain name
- **B1** resolves the domain name to an IP address
- **B1** the IP address is used to address/route the request to the server

**Guidance:** Do not accept 'DNS stores the website'.

#### Q4 [3]

- **B1** laptop address can be allocated/reused internally and may change
- **B1** web server must be reachable from the internet
- **B1** static address provides a stable destination / DNS mapping

**Guidance:** Do not claim private addresses alone guarantee security.

---

## Quiz after Lesson 025: Streaming and network performance

**Syllabus:** Sections 2.1, 2.3

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. Distinguish bandwidth from latency. **[2]**
2. Classify a live video call as real-time or on-demand streaming and justify. **[2]**
3. Explain why a 10 Mbit/s stream may buffer on a connection advertised as 12 Mbit/s. **[3]**
4. Describe how congestion can increase both delay and packet loss. **[3]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **B1** bandwidth is data-transfer capacity/rate
- **B1** latency is delay before/during transfer

**Guidance:** Do not accept that both simply mean speed.

#### Q2 [2]

- **B1** real-time
- **B1** content is delivered as it is produced with minimal delay

**Guidance:** Do not credit the label without justification.

#### Q3 [3]

- **B1** advertised speed may be a maximum / actual throughput varies
- **B1** protocol overhead or other traffic consumes capacity
- **B1** buffer empties when arrival rate falls below playback rate

**Guidance:** Do not accept 'internet is slow' without rate comparison.

#### Q4 [3]

- **B1** routers/switches receive more traffic than links can forward
- **B1** packets wait in queues, increasing delay
- **B1** full buffers cause packets to be discarded/retransmitted

**Guidance:** Allow equivalent reference to overloaded network devices.

---

## Quiz after Lesson 030: Primary memory technologies

**Syllabus:** Sections 3.2

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. Distinguish RAM from ROM in terms of volatility and use. **[2]**
2. State one reason SRAM is used for cache. **[2]**
3. Compare EPROM and EEPROM. **[3]**
4. Explain why DRAM is normally used for main memory rather than SRAM. **[3]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **B1** RAM is volatile and stores current programs/data
- **B1** ROM is non-volatile and stores fixed/start-up instructions

**Guidance:** Both difference dimensions must be clear.

#### Q2 [2]

- **B1** faster access / no refresh
- **B1** reduces CPU waiting for frequently used data/instructions

**Guidance:** Do not accept only 'SRAM is better'.

#### Q3 [3]

- **B1** both are non-volatile and can be reprogrammed
- **B1** EPROM is erased with ultraviolet light
- **B1** EEPROM is erased/written electrically, often in circuit

**Guidance:** Do not confuse EEPROM with one-time PROM.

#### Q4 [3]

- **B1** DRAM has lower cost per bit / greater density
- **B1** main memory requires large capacity
- **B1** the capacity/cost benefit outweighs slower refreshed access

**Guidance:** Do not accept 'DRAM is faster'.

---

## Quiz after Lesson 035: Logic gates and truth tables

**Syllabus:** Sections 3.3

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. State the output of NAND when A = 1 and B = 1, and when A = 1 and B = 0. **[2]**
2. Write a Boolean expression for output X that is true when A is true and B is false. **[2]**
3. For X = (A OR B) AND NOT C, calculate X when A=0, B=1, C=0 and show intermediate values. **[3]**
4. Explain why XOR is suitable for detecting whether two input bits differ. **[3]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **B1** 0 for 1,1
- **B1** 1 for 1,0

**Guidance:** Answers must be in the stated order.

#### Q2 [2]

- **B1** NOT B
- **B1** X = A AND (NOT B)

**Guidance:** Allow standard Boolean symbols.

#### Q3 [3]

- **M1** A OR B = 1
- **M1** NOT C = 1
- **A1** X = 1

**Guidance:** Award A1 only for a consistent final operation.

#### Q4 [3]

- **B1** XOR outputs 1 for different inputs
- **B1** outputs 0 for equal inputs
- **B1** therefore the output acts as a difference flag

**Guidance:** Do not accept that XOR means OR with no qualification.

---

## Quiz after Lesson 040: Hardware and control systems

**Syllabus:** Sections 3.1, 3.2, 3.3

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. Distinguish monitoring from control. **[2]**
2. Name a suitable sensor and actuator for automatic greenhouse cooling. **[2]**
3. Describe the feedback cycle when the greenhouse is too hot. **[3]**
4. Explain one advantage and one disadvantage of an embedded controller in this system. **[3]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **B1** monitoring records/displays sensor data
- **B1** control uses data to change an actuator/system state

**Guidance:** Do not accept that both always use feedback.

#### Q2 [2]

- **B1** temperature sensor
- **B1** fan/motor or window motor actuator

**Guidance:** The output device must cause a physical control action.

#### Q3 [3]

- **B1** sensor reading is compared with the target/threshold
- **B1** controller activates cooling actuator
- **B1** new readings are taken and action changes/stops when target is reached

**Guidance:** Do not accept an open-loop timer description.

#### Q4 [3]

- **B1** dedicated/automatic/low-power operation developed
- **B1** limited processing/upgrading or failure consequence developed
- **B1** both points applied to greenhouse control

**Guidance:** Do not award bare words such as 'cheap' or 'small'.

---

## Quiz after Lesson 045: Instruction sets and processor operation

**Syllabus:** Sections 4.1, 4.2

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. State the roles of MAR and MDR. **[2]**
2. Classify ADD and JPE by instruction group. **[2]**
3. Describe the register transfers used to fetch an instruction. **[3]**
4. Explain why machine code is processor dependent. **[3]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **B1** MAR stores the address being accessed
- **B1** MDR stores data/instruction being transferred

**Guidance:** Do not swap address and data.

#### Q2 [2]

- **B1** ADD: arithmetic
- **B1** JPE: conditional branch

**Guidance:** Both classifications required.

#### Q3 [3]

- **M1** MAR <- PC
- **M1** MDR <- Memory[MAR] and CIR <- MDR
- **A1** PC <- PC + 1 at an appropriate point

**Guidance:** Allow equivalent ordering where the architecture remains coherent.

#### Q4 [3]

- **B1** bit patterns/opcodes are defined by an instruction set
- **B1** processor families implement different instruction sets/formats
- **B1** a binary instruction for one may decode differently/not execute on another

**Guidance:** Do not accept only 'different computers use different code'.

---

## Quiz after Lesson 050: Bit manipulation and addressing

**Syllabus:** Sections 4.2

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. Calculate 00110110 LSL 1 in eight bits. **[2]**
2. Which bitwise operation and mask would set bit 2 of a byte without changing other bits? **[2]**
3. Base address 500 is used with IX = 7. State the effective indexed address and explain the calculation. **[3]**
4. Explain how AND with mask 00010000 tests a selected bit. **[3]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **M1** shifts all bits left and inserts 0
- **A1** 01101100

**Guidance:** Do not retain a ninth bit.

#### Q2 [2]

- **B1** OR
- **B1** mask 00000100, using rightmost bit as bit 0

**Guidance:** Allow an explicitly stated alternative bit-number convention.

#### Q3 [3]

- **M1** adds index-register value to base/operand
- **A1** 507
- **B1** changing IX allows access to another array element

**Guidance:** Do not accept indirect dereferencing.

#### Q4 [3]

- **B1** AND clears every position where mask has 0
- **B1** preserves the selected position where mask has 1
- **B1** non-zero result means that selected bit was set

**Guidance:** Do not treat the operands as whole Boolean values.

---

## Quiz after Lesson 055: Operating-system utilities

**Syllabus:** Sections 5.1

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. State the purpose of a disk formatter and a disk defragmenter. **[2]**
2. Distinguish backup from compression. **[2]**
3. Explain how antivirus software handles a detected file. **[3]**
4. A nearly full HDD is slow. Explain when defragmentation may help and when disk analysis/repair is needed instead. **[3]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **B1** formatter prepares/creates file-system structures on a storage medium
- **B1** defragmenter rearranges fragmented HDD file blocks contiguously

**Guidance:** Do not claim defragmentation is required for SSD performance.

#### Q2 [2]

- **B1** backup creates a separate recoverable copy
- **B1** compression reduces the number of bits/storage or transfer size

**Guidance:** Do not accept that compression alone protects against deletion.

#### Q3 [3]

- **B1** detects using signatures/behaviour
- **B1** blocks or quarantines the file
- **B1** removes/repairs it or prevents execution/spread

**Guidance:** Do not claim detection is guaranteed for every new virus.

#### Q4 [3]

- **B1** defragmentation helps when file blocks are scattered on an HDD
- **B1** analysis identifies file-system/bad-sector errors or capacity use
- **B1** repair addresses detected logical errors; neither creates a backup

**Guidance:** Award only device-appropriate mechanisms.

---

## Quiz after Lesson 060: Translators, Java and IDEs

**Syllabus:** Sections 5.2

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. Distinguish a compiler from an interpreter. **[2]**
2. State the two main stages from Java source to execution. **[2]**
3. Explain how a breakpoint and single-step execution help locate a logic error. **[3]**
4. Explain one benefit and one risk of a dynamically linked library. **[3]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **B1** compiler translates a whole program and produces target/object code
- **B1** interpreter translates/executes statement by statement without a standalone executable

**Guidance:** Allow equivalent precise wording.

#### Q2 [2]

- **B1** source compiled to bytecode
- **B1** JVM interprets/JIT-compiles bytecode for the host

**Guidance:** Do not accept direct universal machine code.

#### Q3 [3]

- **B1** breakpoint pauses at a chosen statement
- **B1** single-step executes one statement at a time
- **B1** developer inspects changing variables/flow against expected values

**Guidance:** Do not describe syntax checking only.

#### Q4 [3]

- **B1** shared/reused code reduces duplicate executable/storage or allows central update
- **B1** missing/incompatible DLL can prevent execution
- **B1** both consequences are explained rather than named

**Guidance:** Do not accept 'more efficient' without mechanism.

---

## Quiz after Lesson 065: Authentication and social engineering

**Syllabus:** Sections 6.2

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. Distinguish authentication from authorisation. **[2]**
2. Give two different authentication factors in multi-factor authentication. **[2]**
3. Explain how phishing can defeat a technically strong password. **[3]**
4. Explain one false-rejection and one false-acceptance consequence for biometric login. **[3]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **B1** authentication verifies identity
- **B1** authorisation determines permitted resources/actions

**Guidance:** Do not reverse the two terms.

#### Q2 [2]

- **B1** one valid knowledge/possession/inherence factor
- **B1** a valid factor from a different category

**Guidance:** Two passwords count as one factor category.

#### Q3 [3]

- **B1** attacker presents a deceptive message/site
- **B1** user is persuaded to disclose credentials
- **B1** attacker can authenticate with the genuine password unless another control blocks it

**Guidance:** Do not describe pharming without user deception/context.

#### Q4 [3]

- **B1** false rejection denies an authorised user
- **B1** false acceptance admits an unauthorised user
- **B1** security/usability trade-off is linked to threshold setting

**Guidance:** Do not treat biometrics as infallible.

---

## Quiz after Lesson 070: Validation, backup and recovery

**Syllabus:** Sections 6.3

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. Distinguish validation from verification. **[2]**
2. Name a suitable validation check for a code that must already exist in a product file. **[2]**
3. Explain the 3-2-1 backup principle. **[3]**
4. Explain how an audit trail supports recovery after unauthorised database changes. **[3]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **B1** validation checks data against rules/reasonableness
- **B1** verification checks it was copied/entered accurately

**Guidance:** Do not claim either proves truth.

#### Q2 [2]

- **B1** existence check
- **B1** compares the entered value with stored valid product codes

**Guidance:** Do not accept presence check.

#### Q3 [3]

- **B1** three copies of data
- **B1** on two different media/storage types
- **B1** one copy off-site/offline

**Guidance:** Allow cloud as off-site only when separation is clear.

#### Q4 [3]

- **B1** records user/time/action or before/after values
- **B1** identifies affected operations/records
- **B1** supports reversal/restoration and investigation/accountability

**Guidance:** Do not accept that an audit trail is itself a complete backup.

---

## Quiz after Lesson 075: Software ownership and licences

**Syllabus:** Sections 7.2

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. State one software freedom promoted by the FSF and one role of the OSI. **[2]**
2. Distinguish shareware from a commercial licence. **[2]**
3. Explain why copyright still applies to open-source software. **[3]**
4. Justify a proprietary supported licence for examination software. **[3]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **B1** valid freedom to run/study/modify/share
- **B1** OSI defines/approves licences meeting open-source criteria

**Guidance:** Do not equate open source with public domain.

#### Q2 [2]

- **B1** shareware is offered for trial/limited use before payment
- **B1** commercial licence grants paid use under defined restrictions

**Guidance:** Allow overlap where the distinction is explicit.

#### Q3 [3]

- **B1** creator/copyright holder owns the work
- **B1** licence grants permissions to users
- **B1** users must satisfy conditions such as attribution/share-alike

**Guidance:** Do not accept 'anyone can do anything'.

#### Q4 [3]

- **B1** vendor support/updates or certified compatibility
- **B1** reliability/accountability matters during examinations
- **B1** benefit is weighed against cost/restrictions in context

**Guidance:** Do not award 'it is better' without context.

---

## Quiz after Lesson 080: Relational database terminology

**Syllabus:** Sections 8.1

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. Distinguish a record/tuple from a field/attribute. **[2]**
2. State two properties of a candidate key. **[2]**
3. Explain referential integrity for Order.CustomerID referencing Customer.CustomerID. **[3]**
4. Explain one benefit and one cost of an index. **[3]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **B1** record/tuple contains all stored attributes for one entity occurrence
- **B1** field/attribute stores one property/column value

**Guidance:** Use of either synonym pair is allowed.

#### Q2 [2]

- **B1** uniquely identifies a record
- **B1** minimal: no redundant field can be removed

**Guidance:** Do not require it to be selected as primary.

#### Q3 [3]

- **B1** Order.CustomerID is a foreign key
- **B1** each non-null value must match an existing Customer key
- **B1** prevents an order referring to a non-existent customer

**Guidance:** Foreign-key values need not be unique.

#### Q4 [3]

- **B1** lookup/sort can locate records faster
- **B1** index stores key-to-location structure
- **B1** uses storage and must be updated when records change

**Guidance:** Do not claim indexing reduces table size.

---

## Quiz after Lesson 085: SQL selection and aggregation

**Syllabus:** Sections 8.3

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. Write SQL to display Name from Student ordered by Name ascending. **[2]**
2. Write an expression to count records in Booking. **[2]**
3. Explain why GROUP BY Department is needed with SELECT Department, AVG(Salary). **[3]**
4. Write SQL to show CourseID and number of students for each CourseID in Enrolment. **[3]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **B1** SELECT Name FROM Student
- **B1** ORDER BY Name ASC; ASC may be omitted

**Guidance:** Ignore case and harmless formatting.

#### Q2 [2]

- **B1** COUNT
- **B1** SELECT COUNT(*) FROM Booking or equivalent valid field

**Guidance:** Do not accept SUM for record count.

#### Q3 [3]

- **B1** rows are partitioned by Department
- **B1** AVG is calculated separately for each group
- **B1** one result row is produced per department

**Guidance:** Do not accept that GROUP BY sorts the output.

#### Q4 [3]

- **B1** SELECT CourseID, COUNT(*)
- **B1** FROM Enrolment
- **B1** GROUP BY CourseID

**Guidance:** Allow COUNT(StudentID).

---

## Quiz after Lesson 090: Paper 1 representation and communication

**Syllabus:** Sections 1, 2

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. Convert 3 MiB to bytes. **[2]**
2. State one difference between a switch and a router. **[2]**
3. Explain why fibre is suitable for a long-distance high-bandwidth link. **[3]**
4. Explain why vector rather than bitmap storage suits a scalable network logo. **[3]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **M1** 3 x 2^20
- **A1** 3145728 bytes

**Guidance:** Do not use decimal MB.

#### Q2 [2]

- **B1** switch forwards frames within a LAN using local/MAC information
- **B1** router forwards packets between networks using IP addresses

**Guidance:** Award both marks only for a matched contrast.

#### Q3 [3]

- **B1** carries light / supports high data rates
- **B1** low attenuation over distance
- **B1** not affected by electromagnetic interference

**Guidance:** Do not award 'faster' without mechanism.

#### Q4 [3]

- **B1** stored as objects/properties/drawing list
- **B1** geometry can be recalculated when resized
- **B1** edges do not pixelate / no stored pixel grid is enlarged

**Guidance:** Do not accept only 'smaller file'.

---

## Quiz after Lesson 095: Paper 1 precise short answers

**Syllabus:** Sections 3, 4, 5, 6

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. State the purpose of the program counter and current instruction register. **[2]**
2. State one OS process-management responsibility and one security-management responsibility. **[2]**
3. Explain how a firewall reduces unauthorised network access. **[3]**
4. Explain why cache can improve CPU performance but does not guarantee a fixed speed increase. **[3]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **B1** PC stores address of next instruction
- **B1** CIR stores current instruction being decoded/executed

**Guidance:** Do not swap their roles.

#### Q2 [2]

- **B1** valid scheduling/allocation/creation/termination responsibility
- **B1** valid accounts/access rights/authentication responsibility

**Guidance:** Examples must be distinct.

#### Q3 [3]

- **B1** examines inbound/outbound traffic
- **B1** compares packets/connections with configured rules
- **B1** blocks/discards unauthorised traffic and permits allowed traffic

**Guidance:** Do not claim it detects every virus.

#### Q4 [3]

- **B1** stores frequently/recently used data/instructions close to CPU
- **B1** cache hit avoids slower main-memory access
- **B1** benefit depends on hit rate/program access pattern/cache design

**Guidance:** Do not accept only 'cache is faster'.

---

## Quiz after Lesson 100: Flowcharts and pseudocode

**Syllabus:** Sections 9.2

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. Name the flowchart symbols for a decision and input/output. **[2]**
2. Translate 'repeat until Valid is true' into Cambridge pseudocode delimiters. **[2]**
3. Explain how a WHILE loop differs from a REPEAT loop. **[3]**
4. Convert: input Age; output Adult if Age >= 18, otherwise Minor. **[3]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **B1** diamond for decision
- **B1** parallelogram for input/output

**Guidance:** Allow descriptions if the symbol is unambiguous.

#### Q2 [2]

- **B1** REPEAT
- **B1** UNTIL Valid = TRUE

**Guidance:** Do not use Java do/while syntax.

#### Q3 [3]

- **B1** WHILE tests before the body
- **B1** it may execute zero times
- **B1** REPEAT tests after and executes at least once

**Guidance:** A mirror statement alone earns one comparison point.

#### Q4 [3]

- **B1** INPUT Age
- **B1** IF Age >= 18 THEN ... ELSE ...
- **B1** correct outputs and ENDIF

**Guidance:** Use Cambridge pseudocode, not braces.

---

## Quiz after Lesson 105: Required search and sort algorithms

**Syllabus:** Sections 10.2

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. State the worst-case number of comparisons for linear search of 12 items. **[2]**
2. After one ascending bubble-sort pass through [5,2,4,1], state the list. **[2]**
3. Explain why a swap flag can improve bubble sort. **[3]**
4. Trace linear search for 9 in [4,9,2] using zero-based indexes. **[3]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **B1** 12
- **B1** target may be last or absent

**Guidance:** Do not use binary-search logarithms.

#### Q2 [2]

- **M1** performs adjacent comparisons/swaps left to right
- **A1** [2,4,1,5]

**Guidance:** One complete outer pass is required.

#### Q3 [3]

- **B1** flag records whether any swap occurred in a pass
- **B1** no swaps means the list is already sorted
- **B1** algorithm can stop before all planned passes

**Guidance:** Do not claim it changes the required ordering rule.

#### Q4 [3]

- **B1** compares 9 with 4 at index 0
- **B1** compares 9 with 9 at index 1
- **B1** returns/found index 1 and stops

**Guidance:** FT a clearly stated one-based convention only if requested convention is acknowledged as changed; otherwise no final mark.

---

## Quiz after Lesson 110: Cambridge pseudocode conventions

**Syllabus:** Sections 9, 11

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. Rewrite Java assignment total = total + value; in Cambridge pseudocode. **[2]**
2. Write a declaration for a Boolean variable IsReady. **[2]**
3. Correct: FOR i = 0; i < 5; i++ { OUTPUT i }. **[3]**
4. Explain why meaningful identifiers and indentation matter even when the algorithm is logically correct. **[3]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **B1** Total <- Total + Value
- **B1** uses assignment arrow and no semicolon requirement

**Guidance:** Do not accept equality comparison in place of assignment.

#### Q2 [2]

- **B1** DECLARE IsReady
- **B1** : BOOLEAN

**Guidance:** Case is not significant.

#### Q3 [3]

- **B1** FOR i <- 0 TO 4
- **B1** OUTPUT i inside loop
- **B1** NEXT i

**Guidance:** Do not award Java braces as Cambridge syntax.

#### Q4 [3]

- **B1** identifiers communicate purpose/data meaning
- **B1** indentation shows nesting/control structure
- **B1** reduces ambiguity and makes tracing/maintenance/checking easier

**Guidance:** Do not accept only 'looks nicer'.

---

## Quiz after Lesson 115: One-dimensional arrays

**Syllabus:** Sections 10.2

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. For DECLARE Mark : ARRAY[1:20] OF INTEGER, state lower and upper bounds. **[2]**
2. Write pseudocode to set element 7 of Name to 'Kai'. **[2]**
3. Write a loop to total all 20 elements of Mark. **[3]**
4. Explain why an array is preferable to 20 separately named mark variables. **[3]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **B1** lower bound 1
- **B1** upper bound 20

**Guidance:** Do not state the number of elements as the upper bound.

#### Q2 [2]

- **B1** Name[7]
- **B1** <- 'Kai'

**Guidance:** Use the stated index.

#### Q3 [3]

- **B1** initialises Total <- 0
- **M1** FOR Index <- 1 TO 20
- **A1** Total <- Total + Mark[Index] with NEXT

**Guidance:** FT a different valid bound only if consistently declared.

#### Q4 [3]

- **B1** same-type values are stored under one identifier
- **B1** index selects each element
- **B1** loops can process all values without repeated statements

**Guidance:** Do not accept only 'uses less space'.

---

## Quiz after Lesson 120: Text-file operations

**Syllabus:** Sections 10.3

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. Distinguish WRITE mode from APPEND mode. **[2]**
2. Write pseudocode to open Log.txt for append and close it. **[2]**
3. Describe a safe loop for reading every line of a text file. **[3]**
4. Explain why a text file may be chosen instead of keeping records only in an array. **[3]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **B1** WRITE creates/overwrites file content
- **B1** APPEND writes after existing content without replacing it

**Guidance:** Do not claim both preserve all content.

#### Q2 [2]

- **B1** OPENFILE 'Log.txt' FOR APPEND
- **B1** CLOSEFILE 'Log.txt'

**Guidance:** Allow identifier/string quotation variants consistent with Cambridge guide.

#### Q3 [3]

- **B1** opens file for READ
- **B1** loops while not EOF and READFILE each line
- **B1** closes file after loop

**Guidance:** Do not read once after EOF.

#### Q4 [3]

- **B1** file provides non-volatile/permanent storage
- **B1** data remains after program ends/power loss
- **B1** can be reloaded/shared/processed in a later run

**Guidance:** Do not accept only 'holds more'.

---

## Quiz after Lesson 125: Records and abstract data types

**Syllabus:** Sections 10.1, 10.2

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. State one difference between a record and an array. **[2]**
2. Choose stack or queue for printer jobs and justify. **[2]**
3. Describe an array-based linked-list node. **[3]**
4. Explain stack overflow and underflow. **[3]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **B1** record groups named fields that may have different types
- **B1** array uses indexed elements of one declared type

**Guidance:** A matched distinction is required.

#### Q2 [2]

- **B1** queue
- **B1** first submitted job should be removed/printed first (FIFO)

**Guidance:** Do not credit structure name alone.

#### Q3 [3]

- **B1** one array entry stores node data
- **B1** parallel Next entry stores index of next node
- **B1** start/null/free-list values manage the logical chain

**Guidance:** Do not require physical adjacency.

#### Q4 [3]

- **B1** overflow: push attempted when fixed-capacity stack is full
- **B1** underflow: pop attempted when stack is empty
- **B1** each invalid operation must be checked/prevented

**Guidance:** Do not confuse with numeric overflow.

---

## Quiz after Lesson 130: Procedures, functions and parameters

**Syllabus:** Sections 11.2

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. Distinguish a procedure from a function. **[2]**
2. State one effect of passing a parameter by reference. **[2]**
3. Write a function header and return statement for Square(Number : INTEGER) returning INTEGER. **[3]**
4. Explain why local variables reduce unintended interactions between modules. **[3]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **B1** function returns a value used in an expression
- **B1** procedure performs a task/call and need not return such a value

**Guidance:** Allow a procedure with reference output if distinction remains clear.

#### Q2 [2]

- **B1** subprogram receives access/alias to caller's variable
- **B1** changes can persist in the caller

**Guidance:** Do not accept only 'faster'.

#### Q3 [3]

- **B1** FUNCTION Square(Number : INTEGER) RETURNS INTEGER
- **B1** RETURN Number * Number
- **B1** ENDFUNCTION / coherent Cambridge structure

**Guidance:** Do not use Java type placement/braces.

#### Q4 [3]

- **B1** local scope limits access to one subprogram
- **B1** other modules cannot directly overwrite the variable
- **B1** reduces name clashes/side effects and supports independent testing

**Guidance:** Do not claim local variables are always stored permanently.

---

## Quiz after Lesson 135: Input, output and arithmetic

**Syllabus:** Sections 11.1

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. State the results of 17 DIV 5 and 17 MOD 5. **[2]**
2. Write pseudocode to input Length and Width then output their product. **[2]**
3. Explain why input validation should normally repeat until valid rather than test once. **[3]**
4. Write a condition that accepts Score from 0 to 100 inclusive, then explain both comparison operators. **[3]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **B1** DIV = 3
- **B1** MOD = 2

**Guidance:** Do not use real division.

#### Q2 [2]

- **B1** INPUT Length, Width / two INPUT statements
- **B1** OUTPUT Length * Width or assigned Area

**Guidance:** Use Cambridge pseudocode, not scanner/print syntax.

#### Q3 [3]

- **B1** invalid value may be entered
- **B1** one IF can report but then continue with invalid data
- **B1** loop re-prompts and prevents processing until condition is satisfied

**Guidance:** Do not accept only 'more robust'.

#### Q4 [3]

- **B1** Score >= 0
- **B1** Score <= 100
- **B1** combines with AND so both bounds must hold

**Guidance:** Do not accept OR because it does not enforce both bounds.

---

## Quiz after Lesson 140: Java-to-pseudocode conversion

**Syllabus:** Sections 11

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. Convert System.out.println(Name); to Cambridge pseudocode. **[2]**
2. Convert boolean Found = false; to a Cambridge declaration and assignment. **[2]**
3. Convert while (Count < 10) { Count++; }. **[3]**
4. Explain why Java syntax in a Paper 2 pseudocode answer can lose marks even if the intended algorithm is recognisable. **[3]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **B1** OUTPUT
- **B1** Name

**Guidance:** No Java library call should remain.

#### Q2 [2]

- **B1** DECLARE Found : BOOLEAN
- **B1** Found <- FALSE

**Guidance:** Do not use = for assignment.

#### Q3 [3]

- **B1** WHILE Count < 10 DO
- **B1** Count <- Count + 1
- **B1** ENDWHILE

**Guidance:** Do not retain braces or ++.

#### Q4 [3]

- **B1** question requires Cambridge pseudocode conventions
- **B1** Java-specific constructs may be ambiguous/incompatible with specified notation
- **B1** incorrect declarations/loop delimiters/operators can obscure executable logic

**Guidance:** Do not claim Java algorithms are conceptually always wrong.

---

## Quiz after Lesson 145: Software testing and design documentation

**Syllabus:** Sections 12

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. Distinguish black-box from white-box testing. **[2]**
2. State the purpose of a stub. **[2]**
3. Give normal, boundary and abnormal test data for an integer Age allowed from 16 to 65 inclusive. **[3]**
4. Explain how a structure chart differs from a state-transition diagram. **[3]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **B1** black-box derives tests from specification/input-output behaviour
- **B1** white-box derives tests from internal code paths/structure

**Guidance:** Do not define by tester colour/name.

#### Q2 [2]

- **B1** temporarily replaces a called module not yet available
- **B1** returns controlled/simulated results so the calling module can be tested

**Guidance:** Do not confuse with a driver unless direction is clear.

#### Q3 [3]

- **B1** normal value within range, e.g. 30
- **B1** boundary value 16 or 65 (or just-inside/just-outside when identified)
- **B1** abnormal value outside/type-invalid, e.g. 70 or text

**Guidance:** Examples must match their labels.

#### Q4 [3]

- **B1** structure chart shows module hierarchy/calls
- **B1** may show data/control parameters between modules
- **B1** state diagram shows system states and event/condition transitions

**Guidance:** Do not accept that both are flowcharts.

---

## Quiz after Lesson 150: Paper 2 integrated problem solving

**Syllabus:** Sections 9, 10, 11, 12

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. Choose an ADT for undo history and justify. **[2]**
2. State two fields in a test-plan record besides test data. **[2]**
3. Write pseudocode to find the maximum of array Value[1:10]. **[3]**
4. Explain how stepwise refinement and procedures support a maintainable solution. **[3]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **B1** stack
- **B1** most recent action is removed first / LIFO

**Guidance:** Do not credit queue.

#### Q2 [2]

- **B1** one valid field: test ID/purpose/expected result/actual result/pass-fail
- **B1** a second distinct valid field

**Guidance:** Do not repeat input data in different words.

#### Q3 [3]

- **B1** initialises Maximum <- Value[1]
- **M1** loops through remaining valid indexes
- **A1** updates when Value[Index] > Maximum and outputs/returns result

**Guidance:** FT a zero-based array only if consistently declared.

#### Q4 [3]

- **B1** refinement decomposes high-level task into precise smaller steps
- **B1** procedures encapsulate named modules with interfaces
- **B1** modules can be understood/tested/changed independently with reduced duplication

**Guidance:** Do not accept only 'makes code shorter'.
