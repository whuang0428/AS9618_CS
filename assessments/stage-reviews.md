# Stage Reviews

Each stage review combines retrieval, error correction and 10 marks of timed exam-style practice.

All questions are original Cambridge-style practice, not copied past-paper questions. Wording and marking guidance are calibrated against the [official Cambridge 9618 past-papers and mark-schemes page](https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/past-papers/) and the [2027-2029 syllabus](https://www.cambridgeinternational.org/Images/721397-2027-2029-syllabus.pdf).

## Marking conventions

- **B1**: independent knowledge, identification or explanation point.
- **M1**: method/process point; award when the stated method is shown.
- **A1**: accurate answer or conclusion, normally dependent on the relevant method where indicated.
- **FT**: follow through a candidate's earlier value only where the note explicitly permits it.
- Text separated by a forward slash gives acceptable alternatives for the same mark, not extra marks.
- Credit clear equivalent wording unless a specific syllabus term or representation is required.
- Do not award repeated, self-contradictory or vague statements as separate points.

## Lesson 015: Section 1 representation calculations

**Syllabus:** Sections 1

### Retrieval Grid

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

</details>

### Error Clinic

1. Correct this claim: “0011 0010 BCD equals denary 50 only because the whole byte is binary 50.”
2. Correct this claim: “Doubling screen resolution always doubles an image file.”

<details>
<summary>Corrections</summary>

1. It equals 32 because separate BCD nibbles encode digits 3 and 2; whole-byte binary interpretation is a different representation.
2. Screen resolution does not change stored image pixels; doubling one image dimension doubles pixel data only when other factors stay fixed.

</details>

### Timed Exam Practice [10]

1. Calculate the uncompressed size in bytes of a 320 x 200 bitmap using 8-bit colour. **[4]**
2. Compare bitmap and vector storage for a photograph and a logo. **[6]**

### Answer Key / Mark Scheme

#### Q1 [4]

- **M1** 320 x 200
- **M1** multiplies by 8 bits
- **M1** divides by 8
- **A1** 64000 bytes

**Guidance:** FT correct conversions.

#### Q2 [6]

- **B1** bitmap stores pixels
- **B1** photograph has complex per-pixel colours/details
- **B1** vector stores objects/properties/drawing list
- **B1** logo shapes can be represented geometrically
- **B1** vector scales without pixelation
- **B1** justified choice for both applications

**Guidance:** Do not accept only file-size claims.

---

## Lesson 026: Section 2 communication explanations

**Syllabus:** Sections 2

### Retrieval Grid

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

</details>

### Error Clinic

1. Correct this claim: “A MAC address routes a packet across the internet.”
2. Correct this claim: “A private cloud is free public storage with a password.”

<details>
<summary>Corrections</summary>

1. IP addresses support inter-network routing; MAC addresses identify interfaces for local frame delivery.
2. A private cloud is infrastructure dedicated to one organisation; it may be costly and still use access controls.

</details>

### Timed Exam Practice [10]

1. Describe CSMA/CD after two stations transmit simultaneously. **[4]**
2. Recommend star or mesh topology for a hospital network requiring resilience. **[6]**

### Answer Key / Mark Scheme

#### Q1 [4]

- **B1** collision is detected
- **B1** transmissions stop/jam indication
- **B1** random backoff
- **B1** stations sense and retry

**Guidance:** Do not call this collision avoidance.

#### Q2 [6]

- **B1** star uses central switch
- **B1** single switch can be point of failure
- **B1** individual star cable failure affects one node
- **B1** mesh provides alternative paths
- **B1** mesh costs more cabling/management
- **B1** recommendation weighs resilience against cost

**Guidance:** No mark for recommendation alone.

---

## Lesson 040: Section 3 hardware comparisons

**Syllabus:** Sections 3

### Retrieval Grid

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

</details>

### Error Clinic

1. Correct this claim: “A buffer permanently stores output as a backup.”
2. Correct this claim: “Monitoring and control are identical because both use sensors.”

<details>
<summary>Corrections</summary>

1. A buffer temporarily stores data to manage different producer/consumer rates; it is not a backup.
2. Monitoring records/displays readings; control additionally changes an actuator and may use feedback.

</details>

### Timed Exam Practice [10]

1. Compare SRAM and DRAM. **[4]**
2. Describe how an optical disc and HDD are read, identifying three differences. **[6]**

### Answer Key / Mark Scheme

#### Q1 [4]

- **B1** SRAM faster
- **B1** SRAM no refresh
- **B1** DRAM denser/cheaper
- **B1** DRAM requires refresh

**Guidance:** Use paired comparisons.

#### Q2 [6]

- **B1** optical disc uses laser/reflection
- **B1** disc rotates and track is followed
- **B1** HDD uses magnetic platters
- **B1** head senses magnetic patterns
- **B1** HDD actuator positions head / optical drive focuses laser
- **B1** three valid mechanism differences are clear

**Guidance:** Do not award generic capacity comparisons only.

---

## Lesson 051: Section 4 processor tracing

**Syllabus:** Sections 4

### Retrieval Grid

1. Register holding next instruction address
2. Register holding current instruction
3. Bus carrying memory location
4. Indexed offset register
5. Conditional equal branch
6. Shift inserting zero on right

<details>
<summary>Retrieval answers</summary>

1. PC
2. CIR
3. address bus
4. IX
5. JPE
6. LSL

</details>

### Error Clinic

1. Correct this claim: “MAR stores the data fetched from memory.”
2. Correct this claim: “Pass 1 of an assembler runs the program.”

<details>
<summary>Corrections</summary>

1. MAR stores the address; MDR stores transferred data or instruction.
2. Pass 1 assigns addresses/builds the symbol table; neither assembler pass executes source.

</details>

### Timed Exam Practice [10]

1. State the effective address for LDX 300 when IX=12 and explain. **[4]**
2. Describe interrupt handling from request to resuming the program. **[6]**

### Answer Key / Mark Scheme

#### Q1 [4]

- **M1** uses indexed addressing
- **M1** adds 300 + 12
- **A1** 312
- **B1** useful for array element access

**Guidance:** Do not dereference twice.

#### Q2 [6]

- **B1** request raised/detected
- **B1** current instruction completes
- **B1** priority/enabled check
- **B1** state/return address saved
- **B1** ISR executes
- **B1** state restored and program resumes

**Guidance:** Do not state the interrupted program starts again.

---

## Lesson 061: Section 5 system software comparisons

**Syllabus:** Sections 5

### Retrieval Grid

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

</details>

### Error Clinic

1. Correct this claim: “An interpreter creates a permanent executable before any statement runs.”
2. Correct this claim: “Dynamic syntax checking finds every logic error.”

<details>
<summary>Corrections</summary>

1. An interpreter normally translates and executes statement by statement without producing a standalone executable.
2. It identifies syntax issues while editing; logically valid but incorrect algorithms require testing/debugging.

</details>

### Timed Exam Practice [10]

1. Give two advantages and two disadvantages of an interpreter during development. **[4]**
2. Explain OS memory, process and file management for two applications saving files concurrently. **[6]**

### Answer Key / Mark Scheme

#### Q1 [4]

- **B1** immediate statement-level feedback
- **B1** easy testing/debugging
- **B1** slower repeated execution
- **B1** requires interpreter/source at run time

**Guidance:** Max two benefits and two drawbacks.

#### Q2 [6]

- **B1** allocates/protects memory per process
- **B1** handles virtual memory when required
- **B1** schedules CPU/process states
- **B1** supports multitasking/context switching
- **B1** organises names/directories/locations
- **B1** controls file access/concurrent writes/permissions

**Guidance:** Credit correctly attributed mechanisms.

---

## Lesson 071: Section 6 security controls

**Syllabus:** Sections 6

### Retrieval Grid

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

</details>

### Error Clinic

1. Correct this claim: “Encryption proves received data is accurate.”
2. Correct this claim: “A presence check confirms a customer ID exists in the customer table.”

<details>
<summary>Corrections</summary>

1. Encryption protects confidentiality; integrity requires hashing/signatures/checks and accuracy may require validation/verification.
2. Presence checks non-blank input; an existence check looks for a matching stored ID.

</details>

### Timed Exam Practice [10]

1. Describe double-entry verification and a check digit. **[4]**
2. Recommend three controls for an online banking account and explain the threat reduced by each. **[6]**

### Answer Key / Mark Scheme

#### Q1 [4]

- **B1** data entered twice
- **B1** entries compared
- **B1** check digit calculated from other digits
- **B1** recalculation detects many entry errors

**Guidance:** Neither method proves truth.

#### Q2 [6]

- **B1** strong password/MFA control
- **B1** reduces stolen-password/impersonation risk
- **B1** encryption/HTTPS control
- **B1** reduces interception disclosure
- **B1** access rights/monitoring/firewall/anti-malware control
- **B1** matching threat consequence explained

**Guidance:** One mark for control and one for matching mechanism per pair.

---

## Lesson 077: Section 7 ethical evaluation

**Syllabus:** Sections 7

### Retrieval Grid

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

</details>

### Error Clinic

1. Correct this claim: “Open-source software has no copyright owner.”
2. Correct this claim: “If AI is accurate overall, its use is automatically ethical.”

<details>
<summary>Corrections</summary>

1. Copyright remains; the owner grants permissions and conditions through a licence.
2. Accuracy can vary by group and ethics also involves privacy, transparency, accountability and stakeholder harm.

</details>

### Timed Exam Practice [10]

1. Explain two purposes of professional codes of conduct. **[4]**
2. Evaluate facial recognition for school attendance. **[6]**

### Answer Key / Mark Scheme

#### Q1 [4]

- **B1** guide decisions/standards
- **B1** protect public interest
- **B1** support trust/accountability
- **B1** promote competence/integrity/privacy

**Guidance:** Each point must state a purpose or consequence.

#### Q2 [6]

- **B1** automation/speed/accurate attendance benefit
- **B1** privacy/biometric-data risk
- **B1** bias/false match consequence
- **B1** security/access/retention control
- **B1** alternative or human review/appeal
- **B1** balanced context-specific judgement

**Guidance:** Do not award a one-sided list as evaluation.

---

## Lesson 089: Section 8 database design and SQL

**Syllabus:** Sections 8

### Retrieval Grid

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

</details>

### Error Clinic

1. Correct this claim: “A foreign key must be unique in the child table.”
2. Correct this claim: “GROUP BY sorts rows alphabetically.”

<details>
<summary>Corrections</summary>

1. Foreign-key values may repeat; each must match a referenced parent key or valid null.
2. GROUP BY forms groups for aggregate calculations; ORDER BY controls result ordering.

</details>

### Timed Exam Practice [10]

1. Explain why ProductName depending only on ProductID violates 2NF in ORDER_LINE(OrderID, ProductID, ProductName, Quantity). **[4]**
2. Write SQL listing DepartmentName and employee count for departments with employees, ordered by count descending. **[6]**

### Answer Key / Mark Scheme

#### Q1 [4]

- **B1** composite key is OrderID+ProductID
- **B1** ProductName depends on ProductID only
- **B1** this is a partial dependency
- **B1** split PRODUCT and ORDER_LINE tables

**Guidance:** Keys/relationship must remain recoverable.

#### Q2 [6]

- **B1** SELECT DepartmentName, COUNT(*)
- **B1** FROM Department
- **B1** INNER JOIN Employee
- **B1** ON matching DepartmentID keys
- **B1** GROUP BY DepartmentName
- **B1** ORDER BY COUNT(*) DESC

**Guidance:** Maximum two tables as required by AS syllabus.

---

## Lesson 097: Paper 1 integrated response technique

**Syllabus:** Sections 1-8

### Retrieval Grid

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

</details>

### Error Clinic

1. Correct this claim: “Fibre is better because it is faster.”
2. Correct this claim: “A DBMS is secure because it has passwords.”

<details>
<summary>Corrections</summary>

1. State the mechanism and context: higher bandwidth/low attenuation/interference resistance, therefore suitable for the stated link.
2. Explain authentication plus access rights, encryption, audit and backup as separate controls with consequences.

</details>

### Timed Exam Practice [10]

1. Improve this answer for two marks: 'Cache makes the CPU faster.' **[4]**
2. A school chooses cloud storage for student records. Discuss benefits, risks and safeguards. **[6]**

### Answer Key / Mark Scheme

#### Q1 [4]

- **B1** cache stores frequently/recently used data/instructions
- **B1** located close to/has faster access than RAM
- **B1** cache hit avoids slower main-memory access
- **B1** reduces average CPU waiting/access time

**Guidance:** Do not award empty comparative words.

#### Q2 [6]

- **B1** remote access/scaling/provider maintenance benefit
- **B1** availability depends on network/provider
- **B1** privacy/jurisdiction/unauthorised access risk
- **B1** encryption/access rights/MFA safeguard
- **B1** backup/versioning/recovery safeguard
- **B1** balanced decision distinguishes public/private deployment

**Guidance:** Discussion requires both sides and context.

---

## Lesson 112: Section 9 algorithm design

**Syllabus:** Sections 9

### Retrieval Grid

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

</details>

### Error Clinic

1. Correct this claim: “Stepwise refinement means writing the final code immediately.”
2. Correct this claim: “Structured English is ordinary prose with no control rules.”

<details>
<summary>Corrections</summary>

1. It repeatedly decomposes high-level steps until each is precise enough to implement.
2. It uses controlled statements and indentation to express sequence, selection and iteration unambiguously.

</details>

### Timed Exam Practice [10]

1. Construct an identifier-table entry for an array of 50 names and a count of names entered. **[4]**
2. Refine 'process quiz results' into a coherent modular algorithm. **[6]**

### Answer Key / Mark Scheme

#### Q1 [4]

- **B1** meaningful Names identifier
- **B1** ARRAY[1:50] OF STRING
- **B1** meaningful Count identifier with INTEGER type
- **B1** purposes distinguish stored names and populated count

**Guidance:** Names, types and purposes are all required.

#### Q2 [6]

- **B1** input/load results module
- **B1** validate result range/identity
- **B1** calculate total/mean
- **B1** find maximum/minimum or grade
- **B1** output/store report
- **B1** substeps have clear order/interfaces and collectively implement parent task

**Guidance:** Do not award unrelated feature lists.

---

## Lesson 125: Section 10 data structures

**Syllabus:** Sections 10

### Retrieval Grid

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

</details>

### Error Clinic

1. Correct this claim: “Linked-list nodes must be adjacent in an array.”
2. Correct this claim: “A queue removes the newest item first.”

<details>
<summary>Corrections</summary>

1. Next indexes define logical order; physical array positions can be non-adjacent.
2. A queue is FIFO and removes from the front; newest items join the rear.

</details>

### Timed Exam Practice [10]

1. Describe array-based queue overflow and underflow. **[4]**
2. Explain insertion at the front of an array-based linked list. **[6]**

### Answer Key / Mark Scheme

#### Q1 [4]

- **B1** overflow when enqueue attempted at full capacity
- **B1** underflow when dequeue attempted while empty
- **B1** front/rear/count state detects conditions
- **B1** invalid operation is rejected/handled

**Guidance:** Do not confuse with numeric overflow.

#### Q2 [6]

- **B1** take index from free list
- **B1** store new data at that index
- **B1** set new Next to old Start
- **B1** set Start to new index
- **B1** advance/update free-list head
- **B1** no shifting of all logical elements is required

**Guidance:** Award equivalent pointer names.

---

## Lesson 141: Section 11 programming

**Syllabus:** Sections 11

### Retrieval Grid

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

</details>

### Error Clinic

1. Correct this claim: “IF Score >= 0 OR Score <= 100 validates the range.”
2. Correct this claim: “A function can return several unrelated values by writing multiple RETURN statements in sequence.”

<details>
<summary>Corrections</summary>

1. Use AND; with OR nearly every number satisfies at least one comparison.
2. A call returns one value on the executed path; use a record/reference parameters or separate functions for multiple outputs.

</details>

### Timed Exam Practice [10]

1. Write pseudocode to count positive values in Data[1:20]. **[4]**
2. Explain parameter, argument, by-value and by-reference using one procedure call. **[6]**

### Answer Key / Mark Scheme

#### Q1 [4]

- **B1** initialises Count
- **M1** FOR Index <- 1 TO 20
- **M1** IF Data[Index] > 0 THEN increments
- **A1** closes constructs and outputs/returns Count

**Guidance:** FT declared equivalent bounds.

#### Q2 [6]

- **B1** parameter is named in subprogram header
- **B1** argument is value/variable supplied by caller
- **B1** by-value receives a copy
- **B1** changes to value parameter do not change caller
- **B1** by-reference aliases caller variable
- **B1** changes can persist in caller

**Guidance:** Examples must use terminology consistently.

---

## Lesson 146: Section 12 software development

**Syllabus:** Sections 12

### Retrieval Grid

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

</details>

### Error Clinic

1. Correct this claim: “A structure chart shows states and events.”
2. Correct this claim: “Boundary test data means any invalid value.”

<details>
<summary>Corrections</summary>

1. A structure chart shows module hierarchy/calls and parameters; a state-transition diagram shows states and event-labelled transitions.
2. Boundary values are at or immediately around a limit; abnormal data is invalid/outside the permitted domain.

</details>

### Timed Exam Practice [10]

1. Distinguish alpha, beta and acceptance testing. **[4]**
2. Describe a complete test-plan row and explain how it supports regression after corrective maintenance. **[6]**

### Answer Key / Mark Scheme

#### Q1 [4]

- **B1** alpha performed internally before release
- **B1** beta performed by selected external users in realistic use
- **B1** acceptance checks against agreed customer requirements
- **B1** acceptance decision supports approval/rejection of delivery

**Guidance:** Do not merge beta and acceptance.

#### Q2 [6]

- **B1** test ID/purpose
- **B1** input/test data
- **B1** expected result
- **B1** actual result and pass/fail
- **B1** reruns previous tests after the correction
- **B1** detects whether existing behaviour was unintentionally broken

**Guidance:** Test data categories alone are not a test plan.

---

## Lesson 150: Paper 2 integrated pseudocode practice

**Syllabus:** Sections 9-12

### Retrieval Grid

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

</details>

### Error Clinic

1. Correct this claim: “Java braces are acceptable Cambridge pseudocode terminators.”
2. Correct this claim: “An efficient algorithm is always the one with the fewest lines.”

<details>
<summary>Corrections</summary>

1. Use specified Cambridge terminators such as ENDIF, ENDWHILE, NEXT and ENDFUNCTION.
2. Efficiency concerns operations/time/storage and clarity; fewer source lines can still perform more work or be incorrect.

</details>

### Timed Exam Practice [10]

1. Write a function that returns the number of occurrences of Target in Data[1:50]. **[4]**
2. Design pseudocode to read valid scores until -1, store at most 100, then output the mean. Include two robustness checks. **[6]**

### Answer Key / Mark Scheme

#### Q1 [4]

- **B1** correct function header/return type
- **B1** initialises count
- **M1** loops 1 to 50 and increments on equality
- **A1** returns count with coherent Cambridge syntax

**Guidance:** Do not accept output in place of a returned value.

#### Q2 [6]

- **B1** initialises count/total
- **B1** sentinel-controlled input
- **B1** validates score range while allowing sentinel
- **B1** checks capacity before storing
- **B1** updates array/count/total for valid scores
- **B1** avoids division by zero and outputs mean when count > 0

**Guidance:** Use Cambridge pseudocode; FT minor syntax where logic is unambiguous.
