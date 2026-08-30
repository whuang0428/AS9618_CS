# Stage Reviews

Each 20-mark stage review combines retrieval, error correction and timed exam-style practice.

All questions are original Cambridge-style practice, not copied past-paper questions. Wording and marking guidance are calibrated against the [official Cambridge 9618 past-papers and mark-schemes page](https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/past-papers/) and the [2027-2029 syllabus](https://www.cambridgeinternational.org/Images/721397-2027-2029-syllabus.pdf).

## Marking conventions

- Each listed answer point is worth 1 mark unless stated otherwise.
- Follow-through is allowed only where the Guidance explicitly permits it.
- Text separated by a forward slash gives acceptable alternatives for the same mark, not extra marks.
- Credit clear equivalent wording unless a specific syllabus term or representation is required.
- Do not award repeated, self-contradictory or vague statements as separate points.

## Lesson 016: Section 1 representation calculations

**Syllabus:** Sections 1

**Assessment objectives:** AO1, AO2

**Time:** 30-35 minutes

**Total:** 20 marks

### Retrieval Grid [6]

1. 1 KiB in bytes
2. Valid BCD nibble range
3. 8-bit unsigned range
4. Bitmap size formula
5. Sound size formula
6. RLE is most effective when...

<details>
<summary>Retrieval answers</summary>

1. 1024 bytes
2. 0000 to 1001
3. 0 to 255
4. width x height x colour depth
5. rate x resolution x duration x channels
6. long runs of repeated values occur

**Marking:** Award 1 mark for each accurate answer. Credit a precise equivalent syllabus term.

</details>

### Error Clinic [4]

1. Correct this claim: “0011 0010 BCD equals denary 50 only because the whole byte is binary 50.”
2. Correct this claim: “Doubling screen resolution always doubles an image file.”

<details>
<summary>Corrections</summary>

1. It equals 32 because separate BCD nibbles encode digits 3 and 2; whole-byte binary interpretation is a different representation.
   - Identifies the technical error. **[1]**
   - Supplies the accurate correction. **[1]**
2. Screen resolution does not change stored image pixels; doubling one image dimension doubles pixel data only when other factors stay fixed.
   - Identifies the technical error. **[1]**
   - Supplies the accurate correction. **[1]**

</details>

### Timed Exam Practice [10]

1. Calculate the uncompressed size in bytes of a 320 x 200 bitmap using 8-bit colour. **[4]**
2. Compare bitmap and vector storage for a photograph and a logo. **[6]**

### Answer Key / Mark Scheme

#### Q1 [4]

| Answer | Guidance | Marks |
|---|---|---:|
| 320 x 200 | Allow FT from the candidate's earlier incorrect pixel or bit total only when the subsequent conversion to bytes is correct. | 1 |
| multiplies by 8 bits |  | 1 |
| divides by 8 |  | 1 |
| 64000 bytes |  | 1 |

#### Q2 [6]

| Answer | Guidance | Marks |
|---|---|---:|
| bitmap stores pixels | Do not accept only file-size claims. | 1 |
| photograph has complex per-pixel colours/details |  | 1 |
| vector stores objects/properties/drawing list |  | 1 |
| logo shapes can be represented geometrically |  | 1 |
| vector scales without pixelation |  | 1 |
| recommends bitmap for the photograph and vector for the logo |  | 1 |

---

## Lesson 027: Section 2 communication explanations

**Syllabus:** Sections 2

**Assessment objectives:** AO1, AO2

**Time:** 30-35 minutes

**Total:** 20 marks

### Retrieval Grid [6]

1. Device forwarding packets between networks
2. Device forwarding frames inside a LAN
3. Name-to-IP service
4. Shared-medium collision method
5. Live content delivery
6. Topology with central switch

<details>
<summary>Retrieval answers</summary>

1. router
2. switch
3. DNS
4. CSMA/CD
5. real-time streaming
6. star

**Marking:** Award 1 mark for each accurate answer. Credit a precise equivalent syllabus term.

</details>

### Error Clinic [4]

1. Correct this claim: “A MAC address routes a packet across the internet.”
2. Correct this claim: “A private cloud is free public storage with a password.”

<details>
<summary>Corrections</summary>

1. IP addresses support inter-network routing; MAC addresses identify interfaces for local frame delivery.
   - Identifies the technical error. **[1]**
   - Supplies the accurate correction. **[1]**
2. A private cloud is infrastructure dedicated to one organisation; it may be costly and still use access controls.
   - Identifies the technical error. **[1]**
   - Supplies the accurate correction. **[1]**

</details>

### Timed Exam Practice [10]

1. Describe CSMA/CD after two stations transmit simultaneously. **[4]**
2. Suggest star or mesh topology for a hospital network requiring resilience. **[6]**

### Answer Key / Mark Scheme

#### Q1 [4]

| Answer | Guidance | Marks |
|---|---|---:|
| collision is detected | Do not call this collision avoidance. | 1 |
| transmissions stop/jam indication |  | 1 |
| random backoff |  | 1 |
| stations sense and retry |  | 1 |

#### Q2 [6]

| Answer | Guidance | Marks |
|---|---|---:|
| star uses central switch | No mark for recommendation alone. | 1 |
| single switch can be point of failure |  | 1 |
| individual star cable failure affects one node |  | 1 |
| mesh provides alternative paths |  | 1 |
| mesh costs more cabling/management |  | 1 |
| recommends mesh for the stated resilience requirement and links this to alternative paths, while acknowledging cost |  | 1 |

---

## Lesson 041: Section 3 hardware comparisons

**Syllabus:** Sections 3

**Assessment objectives:** AO1, AO2

**Time:** 30-35 minutes

**Total:** 20 marks

### Retrieval Grid [6]

1. Volatile primary memory
2. Fast no-refresh cache memory
3. Electrically erasable ROM
4. Sensor for heat
5. Output causing movement
6. Gate true only for unequal inputs

<details>
<summary>Retrieval answers</summary>

1. RAM
2. SRAM
3. EEPROM
4. temperature sensor
5. actuator
6. XOR

**Marking:** Award 1 mark for each accurate answer. Credit a precise equivalent syllabus term.

</details>

### Error Clinic [4]

1. Correct this claim: “A buffer permanently stores output as a backup.”
2. Correct this claim: “Monitoring and control are identical because both use sensors.”

<details>
<summary>Corrections</summary>

1. A buffer temporarily stores data to manage different producer/consumer rates; it is not a backup.
   - Identifies the technical error. **[1]**
   - Supplies the accurate correction. **[1]**
2. Monitoring records/displays readings; control additionally changes an actuator and may use feedback.
   - Identifies the technical error. **[1]**
   - Supplies the accurate correction. **[1]**

</details>

### Timed Exam Practice [10]

1. Compare SRAM and DRAM. **[4]**
2. Describe how an optical disc and HDD are read, identifying three differences. **[6]**

### Answer Key / Mark Scheme

#### Q1 [4]

| Answer | Guidance | Marks |
|---|---|---:|
| SRAM faster | Use paired comparisons. | 1 |
| SRAM no refresh |  | 1 |
| DRAM denser/cheaper |  | 1 |
| DRAM requires refresh |  | 1 |

#### Q2 [6]

| Answer | Guidance | Marks |
|---|---|---:|
| optical disc uses laser/reflection | Do not award generic capacity comparisons only. | 1 |
| disc rotates and track is followed |  | 1 |
| HDD uses magnetic platters |  | 1 |
| head senses magnetic patterns |  | 1 |
| HDD actuator positions head / optical drive focuses laser |  | 1 |
| optical pickup does not contact the disc whereas an HDD head operates very close to the platter |  | 1 |

---

## Lesson 052: Section 4 processor tracing

**Syllabus:** Sections 4

**Assessment objectives:** AO1, AO2

**Time:** 30-35 minutes

**Total:** 20 marks

### Retrieval Grid [6]

1. LDR #n
2. CMI <address>
3. JPE <address>
4. JPN <address>
5. Mask operation used to set a bit
6. Shift that rotates an outgoing bit

<details>
<summary>Retrieval answers</summary>

1. load the immediate value n into IX
2. compare ACC with the value obtained through indirect addressing
3. jump after a comparison produces True
4. jump after a comparison produces False
5. OR
6. cyclic shift

**Marking:** Award 1 mark for each accurate answer. Credit a precise equivalent syllabus term.

</details>

### Error Clinic [4]

1. Correct this claim: “START LDM #5 uses START as a symbolic data address.”
2. Correct this claim: “CMI 40 compares ACC directly with the literal value 40.”

<details>
<summary>Corrections</summary>

1. In <label>: <opcode> <operand>, START is an instruction label naming that instruction; a symbolic data address is defined separately with <label>: <data>.
   - Identifies the technical error. **[1]**
   - Supplies the accurate correction. **[1]**
2. CMI <address> uses indirect addressing: the operand identifies a location whose contents lead to the value compared with ACC.
   - Identifies the technical error. **[1]**
   - Supplies the accurate correction. **[1]**

</details>

### Timed Exam Practice [10]

1. State the exact effects of LDR #n, CMI <address>, JPE <address> and JPN <address>. **[4]**
2. Describe interrupt handling from request to resuming the program. **[6]**

### Answer Key / Mark Scheme

#### Q1 [4]

| Answer | Guidance | Marks |
|---|---|---:|
| LDR loads immediate n into IX | Do not accept relative LDR, immediate CMI, equality/zero JPE or negative-status JPN. | 1 |
| CMI compares ACC with a value obtained through indirect addressing |  | 1 |
| JPE jumps after a comparison produces True |  | 1 |
| JPN jumps after a comparison produces False |  | 1 |

#### Q2 [6]

| Answer | Guidance | Marks |
|---|---|---:|
| request raised/detected | Do not state the interrupted program starts again. | 1 |
| current instruction completes |  | 1 |
| priority/enabled check |  | 1 |
| state/return address saved |  | 1 |
| ISR executes |  | 1 |
| state restored and program resumes |  | 1 |

---

## Lesson 062: Section 5 system software comparisons

**Syllabus:** Sections 5

**Assessment objectives:** AO1, AO2

**Time:** 30-35 minutes

**Total:** 20 marks

### Retrieval Grid [6]

1. Translator for assembly
2. Whole-program translator
3. Java intermediate code
4. IDE pause point
5. Shared run-time code file
6. Utility restoring lost data

<details>
<summary>Retrieval answers</summary>

1. assembler
2. compiler
3. bytecode
4. breakpoint
5. DLL
6. backup utility

**Marking:** Award 1 mark for each accurate answer. Credit a precise equivalent syllabus term.

</details>

### Error Clinic [4]

1. Correct this claim: “An interpreter creates a permanent executable before any statement runs.”
2. Correct this claim: “Dynamic syntax checking finds every logic error.”

<details>
<summary>Corrections</summary>

1. An interpreter normally translates and executes statement by statement without producing a standalone executable.
   - Identifies the technical error. **[1]**
   - Supplies the accurate correction. **[1]**
2. It identifies syntax issues while editing; logically valid but incorrect algorithms require testing/debugging.
   - Identifies the technical error. **[1]**
   - Supplies the accurate correction. **[1]**

</details>

### Timed Exam Practice [10]

1. Give two advantages and two disadvantages of an interpreter during development. **[4]**
2. Explain OS memory, process and file management for two applications saving files concurrently. **[6]**

### Answer Key / Mark Scheme

#### Q1 [4]

| Answer | Guidance | Marks |
|---|---|---:|
| immediate statement-level feedback | Max two benefits and two drawbacks. | 1 |
| easy testing/debugging |  | 1 |
| slower repeated execution |  | 1 |
| requires interpreter/source at run time |  | 1 |

#### Q2 [6]

| Answer | Guidance | Marks |
|---|---|---:|
| allocates/protects memory per process | Credit correctly attributed mechanisms. | 1 |
| handles virtual memory when required |  | 1 |
| schedules CPU/process states |  | 1 |
| supports multitasking/context switching |  | 1 |
| organises names/directories/locations |  | 1 |
| controls file access/concurrent writes/permissions |  | 1 |

---

## Lesson 072: Section 6 security controls

**Syllabus:** Sections 6

**Assessment objectives:** AO1, AO2

**Time:** 30-35 minutes

**Total:** 20 marks

### Retrieval Grid [6]

1. Secret monitoring malware
2. Fake site redirection
3. Identity check
4. Permission decision
5. Copied-data check
6. Calculated transmission check

<details>
<summary>Retrieval answers</summary>

1. spyware
2. pharming
3. authentication
4. authorisation
5. verification
6. checksum

**Marking:** Award 1 mark for each accurate answer. Credit a precise equivalent syllabus term.

</details>

### Error Clinic [4]

1. Correct this claim: “Encryption proves received data is accurate.”
2. Correct this claim: “A presence check confirms a customer ID exists in the customer table.”

<details>
<summary>Corrections</summary>

1. Encryption protects confidentiality; integrity requires hashing/signatures/checks and accuracy may require validation/verification.
   - Identifies the technical error. **[1]**
   - Supplies the accurate correction. **[1]**
2. Presence checks non-blank input; an existence check looks for a matching stored ID.
   - Identifies the technical error. **[1]**
   - Supplies the accurate correction. **[1]**

</details>

### Timed Exam Practice [10]

1. Describe one verification method used during data entry and two methods used during data transfer. **[4]**
2. Suggest three controls for an online banking account and explain the threat reduced by each. **[6]**

### Answer Key / Mark Scheme

#### Q1 [4]

| Answer | Guidance | Marks |
|---|---|---:|
| visual check compares entered data with the source, or double entry compares two independently entered values | Do not substitute a validation check digit for a transfer checksum; byte parity and block parity must be distinguished. | 1 |
| byte parity checks an agreed odd/even parity bit and block parity extends checks across rows and columns |  | 1 |
| checksum is calculated from the data block by the sender and recalculated/compared by the receiver |  | 1 |
| these methods detect many errors but do not prove truth or automatically correct every error |  | 1 |

#### Q2 [6]

| Answer | Guidance | Marks |
|---|---|---:|
| strong password/MFA control | One mark for control and one for matching mechanism per pair. | 1 |
| reduces stolen-password/impersonation risk |  | 1 |
| encryption/HTTPS control |  | 1 |
| reduces interception disclosure |  | 1 |
| access rights/monitoring/firewall/anti-malware control |  | 1 |
| matching threat consequence explained |  | 1 |

---

## Lesson 078: Section 7 ethical evaluation

**Syllabus:** Sections 7

**Assessment objectives:** AO1, AO2

**Time:** 30-35 minutes

**Total:** 20 marks

### Retrieval Grid [6]

1. UK computing professional body
2. International engineering/computing body
3. Four-freedoms organisation
4. Open-source licence organisation
5. Trial distribution model
6. Right protecting source code

<details>
<summary>Retrieval answers</summary>

1. BCS
2. IEEE
3. FSF
4. OSI
5. shareware
6. copyright

**Marking:** Award 1 mark for each accurate answer. Credit a precise equivalent syllabus term.

</details>

### Error Clinic [4]

1. Correct this claim: “Open-source software has no copyright owner.”
2. Correct this claim: “If AI is accurate overall, its use is automatically ethical.”

<details>
<summary>Corrections</summary>

1. Copyright remains; the owner grants permissions and conditions through a licence.
   - Identifies the technical error. **[1]**
   - Supplies the accurate correction. **[1]**
2. Accuracy can vary by group and ethics also involves privacy, transparency, accountability and stakeholder harm.
   - Identifies the technical error. **[1]**
   - Supplies the accurate correction. **[1]**

</details>

### Timed Exam Practice [10]

1. Explain two purposes of professional codes of conduct. **[4]**
2. Evaluate the use of AI facial recognition for school attendance. **[6]**

### Answer Key / Mark Scheme

#### Q1 [4]

| Answer | Guidance | Marks |
|---|---|---:|
| states a code guides professional decisions or sets expected standards | Award the second mark for each purpose only when its professional or public consequence is explained. | 1 |
| explains this supports consistent, accountable conduct |  | 1 |
| states a code protects clients, users or the public interest |  | 1 |
| explains this promotes trust by requiring competence, integrity or confidentiality |  | 1 |

#### Q2 [6]

| Answer | Guidance | Marks |
|---|---|---:|
| AI automates matching captured faces to stored biometric templates, giving a speed/attendance-recording benefit | Do not award a one-sided list or generic AI claim as evaluation. | 1 |
| privacy/biometric-data risk |  | 1 |
| bias/false match consequence |  | 1 |
| security/access/retention control |  | 1 |
| alternative or human review/appeal |  | 1 |
| makes a reasoned recommendation for the school using attendance benefit and biometric privacy or false-match risk |  | 1 |

---

## Lesson 090: Section 8 database design and SQL

**Syllabus:** Sections 8

**Assessment objectives:** AO1, AO2

**Time:** 30-35 minutes

**Total:** 20 marks

### Retrieval Grid [6]

1. Minimal unique identifier
2. Chosen candidate key
3. Relationship reference
4. Atomic fields stage
5. Structure-definition language
6. Function calculating mean

<details>
<summary>Retrieval answers</summary>

1. candidate key
2. primary key
3. foreign key
4. 1NF
5. DDL
6. AVG

**Marking:** Award 1 mark for each accurate answer. Credit a precise equivalent syllabus term.

</details>

### Error Clinic [4]

1. Correct this claim: “A foreign key must be unique in the child table.”
2. Correct this claim: “GROUP BY sorts rows alphabetically.”

<details>
<summary>Corrections</summary>

1. Foreign-key values may repeat; each must match a referenced parent key or valid null.
   - Identifies the technical error. **[1]**
   - Supplies the accurate correction. **[1]**
2. GROUP BY forms groups for aggregate calculations; ORDER BY controls result ordering.
   - Identifies the technical error. **[1]**
   - Supplies the accurate correction. **[1]**

</details>

### Timed Exam Practice [10]

1. Explain why ProductName depending only on ProductID violates 2NF in ORDER_LINE(OrderID, ProductID, ProductName, Quantity). **[4]**
2. Write SQL listing DepartmentName and employee count for departments with employees, ordered by count descending. **[6]**

### Answer Key / Mark Scheme

#### Q1 [4]

| Answer | Guidance | Marks |
|---|---|---:|
| composite key is OrderID+ProductID | Keys/relationship must remain recoverable. | 1 |
| ProductName depends on ProductID only |  | 1 |
| this is a partial dependency |  | 1 |
| split PRODUCT and ORDER_LINE tables |  | 1 |

#### Q2 [6]

| Answer | Guidance | Marks |
|---|---|---:|
| SELECT DepartmentName, COUNT(*) | Maximum two tables as required by AS syllabus. | 1 |
| FROM Department |  | 1 |
| INNER JOIN Employee |  | 1 |
| ON matching DepartmentID keys |  | 1 |
| GROUP BY DepartmentName |  | 1 |
| ORDER BY COUNT(*) DESC |  | 1 |

---

## Lesson 098: Paper 1 integrated response technique

**Syllabus:** Sections 1-8

**Assessment objectives:** AO1, AO2

**Time:** 30-35 minutes

**Total:** 20 marks

### Retrieval Grid [6]

1. 2^40-byte prefix
2. Name-to-address service
3. No-refresh memory
4. Next-instruction register
5. Java execution environment
6. Data accuracy/consistency property

<details>
<summary>Retrieval answers</summary>

1. tebi
2. DNS
3. SRAM
4. PC
5. JVM
6. integrity

**Marking:** Award 1 mark for each accurate answer. Credit a precise equivalent syllabus term.

</details>

### Error Clinic [4]

1. Correct this claim: “Fibre is better because it is faster.”
2. Correct this claim: “A DBMS is secure because it has passwords.”

<details>
<summary>Corrections</summary>

1. State the mechanism and context: higher bandwidth/low attenuation/interference resistance, therefore suitable for the stated link.
   - Identifies the technical error. **[1]**
   - Supplies the accurate correction. **[1]**
2. Explain authentication plus access rights, encryption, audit and backup as separate controls with consequences.
   - Identifies the technical error. **[1]**
   - Supplies the accurate correction. **[1]**

</details>

### Timed Exam Practice [10]

1. Develop this answer for four marks: 'Cache makes the CPU faster.' **[4]**
2. A school chooses cloud storage for student records. Discuss benefits, risks and safeguards. **[6]**

### Answer Key / Mark Scheme

#### Q1 [4]

| Answer | Guidance | Marks |
|---|---|---:|
| cache stores frequently/recently used data/instructions | Do not award empty comparative words. | 1 |
| located close to/has faster access than RAM |  | 1 |
| cache hit avoids slower main-memory access |  | 1 |
| reduces average CPU waiting/access time |  | 1 |

#### Q2 [6]

| Answer | Guidance | Marks |
|---|---|---:|
| remote access/scaling/provider maintenance benefit | Discussion requires both sides and context. | 1 |
| availability depends on network/provider |  | 1 |
| privacy/jurisdiction/unauthorised access risk |  | 1 |
| encryption/access rights/MFA safeguard |  | 1 |
| backup/versioning/recovery safeguard |  | 1 |
| recommends a deployment approach for student records using confidentiality, availability and provider-control evidence |  | 1 |

---

## Lesson 113: Section 9 algorithm design

**Syllabus:** Sections 9

**Assessment objectives:** AO2, AO3

**Time:** 30-35 minutes

**Total:** 20 marks

### Retrieval Grid [6]

1. Removing irrelevant detail
2. Breaking into modules
3. Input-processing-output abbreviation
4. Top-down detail process
5. Decision flowchart shape
6. Post-condition loop

<details>
<summary>Retrieval answers</summary>

1. abstraction
2. decomposition
3. IPO
4. stepwise refinement
5. diamond
6. REPEAT...UNTIL

**Marking:** Award 1 mark for each accurate answer. Credit a precise equivalent syllabus term.

</details>

### Error Clinic [4]

1. Correct this claim: “Stepwise refinement means writing the final code immediately.”
2. Correct this claim: “Structured English is ordinary prose with no control rules.”

<details>
<summary>Corrections</summary>

1. It repeatedly decomposes high-level steps until each is precise enough to implement.
   - Identifies the technical error. **[1]**
   - Supplies the accurate correction. **[1]**
2. It uses controlled statements and indentation to express sequence, selection and iteration unambiguously.
   - Identifies the technical error. **[1]**
   - Supplies the accurate correction. **[1]**

</details>

### Timed Exam Practice [10]

1. Complete identifier-table entries for a student's name and the count of valid marks entered. **[4]**
2. Develop 'process quiz results' into a coherent modular algorithm. **[6]**

### Answer Key / Mark Scheme

#### Q1 [4]

| Answer | Guidance | Marks |
|---|---|---:|
| meaningful StudentName or equivalent identifier | Both entries require meaningful identifiers, suitable scalar types and distinct purposes. | 1 |
| STRING type and purpose for the student's name |  | 1 |
| meaningful Count or ValidMarkCount identifier with INTEGER type |  | 1 |
| purpose states the number of valid marks entered |  | 1 |

#### Q2 [6]

| Answer | Guidance | Marks |
|---|---|---:|
| input/load results module | Do not award unrelated feature lists. | 1 |
| validate result range/identity |  | 1 |
| calculate total/mean |  | 1 |
| find maximum/minimum or grade |  | 1 |
| output/store report |  | 1 |
| substeps have clear order/interfaces and collectively implement parent task |  | 1 |

---

## Lesson 126: Section 10 data structures

**Syllabus:** Sections 10

**Assessment objectives:** AO2, AO3

**Time:** 30-35 minutes

**Total:** 20 marks

### Retrieval Grid [6]

1. Same-type indexed collection
2. Mixed named fields
3. LIFO ADT
4. FIFO ADT
5. End pointer value
6. Persistent sequential data

<details>
<summary>Retrieval answers</summary>

1. array
2. record
3. stack
4. queue
5. null
6. text file

**Marking:** Award 1 mark for each accurate answer. Credit a precise equivalent syllabus term.

</details>

### Error Clinic [4]

1. Correct this claim: “Linked-list nodes must be adjacent in an array.”
2. Correct this claim: “A queue removes the newest item first.”

<details>
<summary>Corrections</summary>

1. Next indexes define logical order; physical array positions can be non-adjacent.
   - Identifies the technical error. **[1]**
   - Supplies the accurate correction. **[1]**
2. A queue is FIFO and removes from the front; newest items join the rear.
   - Identifies the technical error. **[1]**
   - Supplies the accurate correction. **[1]**

</details>

### Timed Exam Practice [10]

1. Describe array-based queue overflow and underflow. **[4]**
2. For array implementations of stack, queue and linked-list ADTs, explain how data can be added, edited and deleted while preserving each structure's rule. **[6]**

### Answer Key / Mark Scheme

#### Q1 [4]

| Answer | Guidance | Marks |
|---|---|---:|
| overflow when enqueue attempted at full capacity | Do not confuse with numeric overflow. | 1 |
| underflow when dequeue attempted while empty |  | 1 |
| front/rear/count state detects conditions |  | 1 |
| invalid operation is rejected/handled |  | 1 |

#### Q2 [6]

| Answer | Guidance | Marks |
|---|---|---:|
| stack adds with push and deletes with pop at the top using a stack/top pointer | Candidates are not required to write pseudocode for these ADT operations; award accurate conceptual state changes and do not accept shifting every linked-list element as the defining method. | 1 |
| queue adds at the rear and deletes from the front using enqueue/dequeue in FIFO order |  | 1 |
| linked-list insertion obtains a free array index and changes Start/Next links |  | 1 |
| editing changes the selected stored data field without corrupting the stack/queue order or linked-list links |  | 1 |
| linked-list deletion bypasses the node by changing links and returns the freed index to the free list |  | 1 |
| array state such as top, front/rear, Start/Next/free list implements the ADT behaviour |  | 1 |

---

## Lesson 142: Section 11 programming

**Syllabus:** Sections 11

**Assessment objectives:** AO2, AO3

**Time:** 30-35 minutes

**Total:** 20 marks

### Retrieval Grid [6]

1. Assignment operator
2. Integer quotient operator
3. Remainder operator
4. Count-loop terminator
5. Value-returning subprogram
6. Caller variable can change

<details>
<summary>Retrieval answers</summary>

1. <-
2. DIV
3. MOD
4. NEXT
5. function
6. BYREF

**Marking:** Award 1 mark for each accurate answer. Credit a precise equivalent syllabus term.

</details>

### Error Clinic [4]

1. Correct this claim: “IF Score >= 0 OR Score <= 100 validates the range.”
2. Correct this claim: “A function can return several unrelated values by writing multiple RETURN statements in sequence.”

<details>
<summary>Corrections</summary>

1. Use AND; with OR nearly every number satisfies at least one comparison.
   - Identifies the technical error. **[1]**
   - Supplies the accurate correction. **[1]**
2. A call returns one value on the executed path; use a record/reference parameters or separate functions for multiple outputs.
   - Identifies the technical error. **[1]**
   - Supplies the accurate correction. **[1]**

</details>

### Timed Exam Practice [10]

1. Write pseudocode to count positive values in Data[1:20]. **[4]**
2. Explain parameter, argument, by-value and by-reference using one procedure call. **[6]**

### Answer Key / Mark Scheme

#### Q1 [4]

| Answer | Guidance | Marks |
|---|---|---:|
| initialises Count | Allow equivalent declared bounds only when they cover all 20 elements exactly once. | 1 |
| FOR Index <- 1 TO 20 |  | 1 |
| IF Data[Index] > 0 THEN increments |  | 1 |
| closes constructs and outputs/returns Count |  | 1 |

#### Q2 [6]

| Answer | Guidance | Marks |
|---|---|---:|
| parameter is named in subprogram header | Examples must use terminology consistently. | 1 |
| argument is value/variable supplied by caller |  | 1 |
| by-value receives a copy |  | 1 |
| changes to value parameter do not change caller |  | 1 |
| by-reference aliases caller variable |  | 1 |
| changes can persist in caller |  | 1 |

---

## Lesson 147: Section 12 software development

**Syllabus:** Sections 12

**Assessment objectives:** AO2, AO3

**Time:** 30-35 minutes

**Total:** 20 marks

### Retrieval Grid [6]

1. Internal pre-release testing
2. External selected-user testing
3. Specification-based testing
4. Code-path testing
5. Fixing faults maintenance
6. Environment-change maintenance

<details>
<summary>Retrieval answers</summary>

1. alpha
2. beta
3. black-box
4. white-box
5. corrective
6. adaptive

**Marking:** Award 1 mark for each accurate answer. Credit a precise equivalent syllabus term.

</details>

### Error Clinic [4]

1. Correct this claim: “A structure chart shows states and events.”
2. Correct this claim: “Boundary test data means any invalid value.”

<details>
<summary>Corrections</summary>

1. A structure chart shows module hierarchy/calls and parameters; a state-transition diagram shows states and event-labelled transitions.
   - Identifies the technical error. **[1]**
   - Supplies the accurate correction. **[1]**
2. Boundary values are at or immediately around a limit; abnormal data is invalid/outside the permitted domain.
   - Identifies the technical error. **[1]**
   - Supplies the accurate correction. **[1]**

</details>

### Timed Exam Practice [10]

1. Compare alpha, beta and acceptance testing. **[4]**
2. Describe a complete test-plan row and explain how it supports regression after corrective maintenance. **[6]**

### Answer Key / Mark Scheme

#### Q1 [4]

| Answer | Guidance | Marks |
|---|---|---:|
| alpha performed internally before release | Do not merge beta and acceptance. | 1 |
| beta performed by selected external users in realistic use |  | 1 |
| acceptance checks against agreed customer requirements |  | 1 |
| acceptance decision supports approval/rejection of delivery |  | 1 |

#### Q2 [6]

| Answer | Guidance | Marks |
|---|---|---:|
| test ID/purpose | Test data categories alone are not a test plan. | 1 |
| input/test data |  | 1 |
| expected result |  | 1 |
| actual result and pass/fail |  | 1 |
| reruns previous tests after the correction |  | 1 |
| detects whether existing behaviour was unintentionally broken |  | 1 |

---

## Lesson 151: Paper 2 integrated pseudocode practice

**Syllabus:** Sections 9-12

**Assessment objectives:** AO2, AO3

**Time:** 30-35 minutes

**Total:** 20 marks

### Retrieval Grid [6]

1. Linear search stop condition
2. Bubble-sort comparison
3. Persistent file mode preserving content
4. Most-recent-first ADT
5. Loop that may run zero times
6. Test double for called module

<details>
<summary>Retrieval answers</summary>

1. target found or all populated elements checked
2. adjacent elements
3. APPEND
4. stack
5. WHILE
6. stub

**Marking:** Award 1 mark for each accurate answer. Credit a precise equivalent syllabus term.

</details>

### Error Clinic [4]

1. Correct this claim: “Java braces are acceptable Cambridge pseudocode terminators.”
2. Correct this claim: “An efficient algorithm is always the one with the fewest lines.”

<details>
<summary>Corrections</summary>

1. Use specified Cambridge terminators such as ENDIF, ENDWHILE, NEXT and ENDFUNCTION.
   - Identifies the technical error. **[1]**
   - Supplies the accurate correction. **[1]**
2. Efficiency concerns operations/time/storage and clarity; fewer source lines can still perform more work or be incorrect.
   - Identifies the technical error. **[1]**
   - Supplies the accurate correction. **[1]**

</details>

### Timed Exam Practice [10]

1. Write a function that returns the number of occurrences of Target in Data[1:50]. **[4]**
2. Develop pseudocode to read valid scores until -1, store at most 100, then output the mean. Include two robustness checks. **[6]**

### Answer Key / Mark Scheme

#### Q1 [4]

| Answer | Guidance | Marks |
|---|---|---:|
| correct function header/return type | Do not accept output in place of a returned value. | 1 |
| initialises count |  | 1 |
| loops 1 to 50 and increments on equality |  | 1 |
| returns count with coherent Cambridge syntax |  | 1 |

#### Q2 [6]

| Answer | Guidance | Marks |
|---|---|---:|
| initialises count/total | Use Cambridge pseudocode. Do not penalise a minor syntax error when the intended control structure remains unambiguous. | 1 |
| sentinel-controlled input |  | 1 |
| validates score range while allowing sentinel |  | 1 |
| checks capacity before storing |  | 1 |
| updates array/count/total for valid scores |  | 1 |
| avoids division by zero and outputs mean when count > 0 |  | 1 |
