# AS9618 Assessment Bank - 90-lesson course

The active bank contains 12 section checks and two original 75-mark paper mocks. Questions test transfer and are not copied from lesson practice or Cambridge papers.

## Section 1: Information representation - cumulative check (20 marks)

### 1. calculate - 5 marks

A weather station stores a 2,048,000-byte log and displays temperature 26 using BCD. (a) Calculate the log size in MB, showing your working. [2] (b) Give the 8-bit BCD code for 26, showing each digit separately. [2] (c) Explain one reason to display its binary memory addresses in hexadecimal. [1]

**Answer and guidance:**

- Divide 2,048,000 by 1,000,000 bytes per MB.
- The log size is 2.048 MB.
- The digit 2 has BCD code 0010.
- The digit 6 has BCD code 0110, giving 0010 0110.
- Hexadecimal groups each four address bits into one digit, making the address more compact to read.

Award one mark for each distinct point, within the mark allocation for each part. Accept equivalent correct working and explanations. Do not award the same point twice.

### 2. calculate - 5 marks

The station needs the value of −6 − 3. (a) Calculate it using 8-bit two's-complement addition, showing both encoded operands and the retained result with its denary meaning. [3] (b) Explain whether signed overflow occurs. [1] (c) Explain why Unicode is more suitable than standard ASCII for notes in English and Chinese. [1]

**Answer and guidance:**

- Rewrite as −6 + (−3), using operands 11111010 and 11111101.
- The full sum is 1 11110111, so the retained result is 11110111.
- The retained result represents −9.
- No signed overflow occurs because −9 lies within −128 to +127.
- Unicode includes the required Chinese characters as well as English letters; standard ASCII does not.

Award one mark for each distinct point, within the mark allocation for each part. Accept equivalent correct working and explanations. Do not award the same point twice.

### 3. calculate - 5 marks

The station stores a 32 by 16 pixel bitmap at 4 bits per pixel and a vector arrow for a map. (a) Calculate the bitmap pixel-data size in bytes, showing your working; ignore headers. [2] (b) Identify two properties needed to store a straight line in the vector arrow. [2] (c) Explain why the vector arrow can be enlarged without pixelation. [1]

**Answer and guidance:**

- 32 × 16 × 4 = 2048 bits of pixel data.
- 2048 / 8 = 256 bytes.
- Any one valid line property: start/end coordinates, line colour or thickness.
- Any second distinct valid property from the same list.
- Software redraws the line from its geometry at the new size instead of enlarging a fixed pixel grid.

Award one mark for each distinct point, within the mark allocation for each part. Accept equivalent correct working and explanations. Do not award the same point twice.

### 4. explain - 5 marks

The station records a mono sound. (a) Explain the effects on time accuracy and uncompressed sample-data size of doubling the sampling rate during recording, with duration and bits per sample unchanged. [2] (b) A one-bit bitmap row is 0000000011111111. RLE stores each run as an 8-bit count and a 1-bit colour. Give its count-and-colour pairs, calculate the encoded size and decide whether it is smaller than the original 16-bit row. [3]

**Answer and guidance:**

- The converter measures amplitude twice as often, so it can represent changes over time more accurately.
- Twice as many samples require twice the uncompressed sample-data size.
- The pairs are (8, 0) and (8, 1).
- Two pairs require 2 × (8 + 1) = 18 bits.
- The encoded row is 2 bits larger; count overhead outweighs the saving.

Award one mark for each distinct point, within the mark allocation for each part. Accept equivalent correct working and explanations. Do not award the same point twice.

## Section 2: Communication - cumulative check (20 marks)

### 1. identify - 5 marks

A museum has one LAN in each of two cities and links the sites using a telecommunications provider. (a) Identify the overall network type and give a reason. [1] (b) Suggest client-server or peer-to-peer for centrally controlled ticket records and explain one benefit in this context. [2] (c) Each reception LAN uses a star with one switch. Compare the effect of one reception computer cable failing with the effect of the switch failing. [2]

**Answer and guidance:**

- The overall network is a WAN because it links LANs at geographically distant sites.
- Client-server is suitable for the ticket-record service.
- Central permissions or a managed shared copy allow staff to control access or keep ticket records consistent.
- One computer cable failure normally isolates that computer; the other switch links can still work.
- Switch failure prevents communication through the star for all computers attached to it.

Award one mark for each distinct marking point, up to the stated maximum for each part. Accept equivalent technically accurate explanations. Do not credit the same point twice.

### 2. compare - 5 marks

The museum needs exclusive cloud infrastructure for its collection catalogue and a 400-metre wired link through an electrically noisy workshop. (a) Compare public and private cloud tenancy, then state one cost drawback of the option that meets the exclusivity requirement. [3] (b) Suggest copper or fibre-optic cable for the workshop and explain your choice using the stated conditions. [2]

**Answer and guidance:**

- Public-cloud physical infrastructure serves several customers.
- A private cloud is dedicated to one organisation and meets the exclusivity requirement.
- Dedicated private-cloud infrastructure normally costs more to operate or requires more specialist administration.
- Fibre-optic cable is suitable for the workshop link.
- Light in fibre is unaffected by the motors’ electromagnetic interference, or fibre can carry the signal over the long run with less attenuation.

Award one mark for each distinct marking point, up to the stated maximum for each part. Accept equivalent technically accurate explanations. Do not credit the same point twice.

### 3. calculate - 5 marks

A museum guide streams live video at 7 Mbit/s. The connection supplies 5 Mbit/s and the player has 48 Mbit buffered. (a) Calculate the time until the buffer empties, showing your working. [2] (b) The guide moves between outdoor locations every day. Suggest a dedicated line or cell phone network for internet access, justify the choice and state one limitation. [3]

**Answer and guidance:**

- The buffer loses data at 7 − 5 = 2 Mbit/s.
- Time until empty = 48 / 2 = 24 seconds.
- A cell phone network is suitable.
- Radio access through base stations supports movement without installing a fixed line at each location.
- Coverage, shared cell capacity, interference or radio conditions can limit performance.

Award one mark for each distinct marking point, up to the stated maximum for each part. Accept equivalent technically accurate explanations. Do not credit the same point twice.

### 4. identify - 5 marks

A museum laptop at 192.168.40.25/24 opens https://archive.example.org/exhibits/map.html. DNS returns 203.0.113.60. (a) Identify the domain name and describe the DNS operation. [2] (b) Explain whether the laptop sends the request directly within its subnet or to a router. [2] (c) Describe what the browser requests after contacting the web server. [1]

**Answer and guidance:**

- The domain name is archive.example.org.
- DNS resolves this domain name to the IP address 203.0.113.60.
- The laptop subnet is 192.168.40.0/24; the returned address has a different network prefix.
- The laptop sends the packet to a router for delivery outside its local subnet.
- The browser requests the web page or file exhibits/map.html from the web server.

Award one mark for each distinct marking point, up to the stated maximum for each part. Accept equivalent technically accurate explanations. Do not credit the same point twice.

## Section 3: Hardware - cumulative check (20 marks)

### 1. explain - 5 marks

Explain why a label printer with a built-in controller is an embedded system. Describe the two roles of a laser printer's photosensitive drum and heated pressure rollers. Give one drawback if the dedicated controller needs a new, memory-intensive function.

**Answer and guidance:**

- The controller is a computer system built into the larger printer.
- It performs the dedicated task of operating the printer.
- The drum receives a charge pattern representing the page and attracts toner to the required areas.
- The heated pressure rollers fuse transferred toner to the paper.
- Limited memory or processing resources may make the new function require replacement hardware.

Award one mark for each listed point, or an equivalent correct response. Do not award the same idea twice.

### 2. explain - 5 marks

Explain why a handheld recorder uses RAM for changing sound samples, non-volatile firmware memory for start-up instructions, and a buffer between sampling and storage. State why PROM cannot be repeatedly updated and identify a ROM type that permits electrical rewriting.

**Answer and guidance:**

- RAM can be read and written repeatedly as the current samples are processed.
- Non-volatile firmware memory keeps the start-up instructions available after the power is removed.
- The buffer holds samples temporarily when sampling and storage transfer data at different rates.
- PROM is programmed only once, so it cannot support repeated updates.
- EEPROM permits electrical erasure and rewriting.

Award one mark for each listed point, or an equivalent correct response. Do not award the same idea twice.

### 3. explain - 5 marks

Explain how an automatic air pump uses a pressure sensor, a stored target and a motor to regulate tyre pressure. Include the role of a new reading after the motor runs and explain why displaying pressure alone is monitoring.

**Answer and guidance:**

- The pressure sensor supplies a reading of the tyre pressure to the controller.
- The controller compares that reading with the stored target and decides whether further pumping is needed.
- The motor is the actuator whose operation raises the physical pressure.
- A new sensor reading provides feedback so the controller can stop or adjust pumping based on the actual result.
- A display only reports the measurement; by itself it does not change tyre pressure.

Award one mark for each listed point, or an equivalent correct response. Do not award the same idea twice.

### 4. construct - 5 marks

Construct a Boolean expression and draw a circuit for output Q that is 1 only when input A is 0 and input B is 1. Construct its full truth table using input order AB = 00,01,10,11. Use NOT and two-input gates.

**Answer and guidance:**

- Q = (NOT A) AND B.
- A connects to a NOT gate.
- The NOT output and B connect to an AND gate, with final output labelled Q.
- The truth table includes all four input combinations: 00, 01, 10 and 11.
- The output column is 0, 1, 0, 0 in that order.

Award one mark for each listed point, or an equivalent correct response. Do not award the same idea twice.

## Section 4: Processor fundamentals - cumulative check (20 marks)

### 1. explain - 5 marks

Explain how an instruction at address 160 is fetched when PC=160. Include MAR, MDR, CIR, the read control signal and the next sequential PC. Each instruction occupies one location.

**Answer and guidance:**

- MAR ← [PC] places 160 in MAR for the address bus.
- The CU issues a memory-read signal on the control bus.
- The fetched instruction reaches MDR over the data bus.
- CIR ← [MDR] retains that instruction for decoding.
- PC ← [PC] + 1 gives the next sequential address 161.

Award one mark for each independent point below. Accept equivalent accurate wording or notation.

### 2. complete - 5 marks

Complete the two-pass assembly process for this source: address 70 GO: LDD N; address 71 STO RESULT; address 72 END; address 73 N: 14; address 74 RESULT: 0. Give the symbol table, resolve both symbolic operands, and explain the purpose of each pass.

**Answer and guidance:**

- The symbol table is GO=70, N=73 and RESULT=74.
- LDD N resolves to LDD 73.
- STO RESULT resolves to STO 74.
- Pass one assigns locations and records label addresses, including labels defined after their use.
- Pass two uses these addresses and the target opcode encoding to emit machine words; data 14 and 0 are emitted at 73 and 74.

Award one mark for each independent point below. Accept equivalent accurate wording or notation.

### 3. trace - 5 marks

Trace the supplied indexed-load program. State IX after LDR, the effective address and ACC after LDX, the character output and the effect of END.

Initial ACC=0, IX=0, PC=30; comparison result unset. Memory[202]=72. No input is needed. Addresses are denary; each listed instruction or data item occupies one location.

```text
030  LDR #2
031  LDX 200
032  OUT
033  END
```

**Answer and guidance:**

- LDR #2 sets IX to 2.
- LDX 200 uses effective address 200+2=202.
- ACC becomes the contents of location 202, which are 72.
- OUT prints H, the character with ASCII value 72.
- END returns control to the operating system.

Award one mark for each independent point below. Accept equivalent accurate wording or notation.

### 4. calculate - 5 marks

Calculate the result of testing bit 3 of device value 01001010 with AND B00001000. Then give the mask and final value for setting bit 0 in a fresh copy of the original value. Explain why the fresh copy is needed. Bits are numbered 7 to 0.

**Answer and guidance:**

- The AND test gives 00001000.
- The result is non-zero, so bit 3 is set.
- The setting mask is B00000001 and the operation is OR.
- The value written back is 01001011.
- The AND test removed other bits from ACC; reloading the original prevents their loss during the update.

Award one mark for each independent point below. Accept equivalent accurate wording or notation.

## Section 5: System software - cumulative check (20 marks)

### 1. explain - 5 marks

A school computer runs an editor and a browser on one CPU core. Explain how the OS protects their separate working memory and uses CPU time while one waits for input. Yesterday's timetable was deleted, and another large file is fragmented on a magnetic disk. Identify an appropriate utility action for each of these two storage problems.

**Answer and guidance:**

- Memory protection restricts either process from overwriting the other process's allocated RAM.
- A process waiting for input is not ready to continue the dependent operation.
- The scheduler can allocate that interval to the other process if it is ready.
- Restore the timetable from an available backup containing yesterday's version.
- Use a defragmenter to bring separated HDD file blocks into more contiguous groups.

Award one mark per distinct point: memory protection (1), waiting and scheduling (2), and the two matched utility actions (2). Do not credit formatting as recovery.

### 2. explain - 5 marks

Two applications call a documented image routine in SharedImage.dll. Explain what this program library supplies and one development benefit of reusing it. Explain one disk-storage benefit and one maintenance benefit of the shared DLL, and state a condition needed when installing an updated version.

**Answer and guidance:**

- The library supplies existing image-processing code that the applications can call through its documented interface.
- Reuse reduces the need to design, implement and test that image-processing algorithm from scratch.
- A single shared library file can avoid an incorporated copy of the same code in every application executable.
- A suitable library correction can be deployed without recompiling each of the calling applications.
- The replacement must remain compatible with the interfaces and behaviour the callers expect; running callers may need to reload it.

Award one mark for each requested aspect. Accept another distinct development benefit, such as access to specialist, tested routines. Compatibility is required for the update claim.

### 3. identify - 5 marks

Identify the translator for a routine written in assembly language. A separate, completed high-level program will run repeatedly as a native executable: explain one reason for compiling it. For a Java program, describe the output of javac, the requirement on the destination computer, and how that destination can execute the translated code.

**Answer and guidance:**

- An assembler translates the assembly-language routine for its target instruction set.
- Compilation permits repeated execution of the resulting native build without retranslating the original source at every run.
- javac produces class files containing JVM bytecode.
- The destination requires a compatible JVM for its platform.
- The JVM interprets bytecode and may compile it just in time to native instructions.

Award one mark for each requested element. Do not describe a Java class file as native machine code that every processor executes directly.

### 4. describe - 5 marks

A student is editing a nested decision and tracing a wrong result. Describe five IDE features that meet these needs: suggest arguments for a routine call; highlight a missing keyword during entry; show nesting clearly; hide an unrelated block temporarily; and execute exactly the next statement while debugging.

**Answer and guidance:**

- Context-sensitive prompts display the routine's expected parameters at the call.
- Dynamic syntax checking flags the missing keyword as a language-rule violation.
- Pretty-printing applies consistent indentation to make the decision's nested structure visible.
- Code folding collapses the unrelated block in the editor while retaining its statements in the program.
- Single stepping advances execution by one statement and pauses again for inspection.

Award one mark for each matched feature and purpose. Hiding a block must not be described as disabling its execution.

## Section 6: Security, privacy and data integrity - cumulative check (20 marks)

### 1. explain - 5 marks

A clinic stores accurate medical records. A receptionist sends an unchanged copy to an advertiser without permission. Later, malware stops the clinic's computer from starting. Explain the privacy and integrity implications of the disclosure, then explain why the clinic needs both data protection and a recoverable computer system. [5]

**Answer and guidance:**

- The medical information has been disclosed to an unauthorised recipient, affecting privacy.
- The unchanged copy can retain accuracy and completeness, so the disclosure alone does not demonstrate lost integrity.
- The records need protection against unauthorised reading, alteration or loss.
- A computer that cannot start makes the processing service unavailable even if its data still exists.
- A trusted system backup or replacement computer allows staff to restore access to the records.

Award one mark for each distinct point applied to the clinic. Do not award an integrity breach merely for disclosure of unchanged data.

### 2. explain - 5 marks

An employee follows a fake payroll text-message link and enters a password. A colleague types the correct payroll address but a corrupted local lookup sends them to another site. Identify the threat in each case, explain the difference between the routes, and suggest one suitable precaution for each. [5]

**Answer and guidance:**

- The fake message is phishing.
- The corrupted lookup is pharming.
- Phishing persuades the user to follow a supplied route, while pharming redirects name resolution even for a correctly typed address.
- The first employee should use an independently known payroll address or verified support contact.
- The colleague's system should restrict and repair unauthorised changes to name-resolution settings.

Award one mark for each point. A generic instruction to be careful does not identify a precaution's mechanism.

### 3. describe - 5 marks

A business allows inbound web requests but blocks unsolicited remote-administration connections. It also encrypts off-site backups and gives auditors read-only invoice access. Describe how the firewall makes its decision, how encryption protects a lost backup and allows recovery, and which invoice operations the auditor may perform. [5]

**Answer and guidance:**

- The firewall compares connection properties with configured rules, such as destination port or service.
- It permits the allowed web traffic and blocks the disallowed administration traffic.
- Encryption turns backup plaintext into ciphertext that a finder without the required key cannot normally read.
- The legitimate user uses the correct decryption key and method to recover plaintext.
- The auditor may read invoices but may not modify or delete them.

Award one mark per point. Authentication of an auditor does not override read-only permissions.

### 4. calculate - 5 marks

An identifier has data digits 7315. Calculate its check digit using weights 3,1,3,1 and append the digit that makes the weighted total a multiple of 10. Explain whether 73159 passes. Separately, a clerk copies source code BD507 as BD570 twice: explain the results of double entry and visual verification against the source. [5]

**Answer and guidance:**

- The weighted sum is 21 + 3 + 3 + 5 = 32.
- The check digit is 8, giving full identifier 73158.
- 73159 fails because supplied digit 9 differs from expected 8.
- Double entry accepts the two matching BD570 entries despite the repeated error.
- Visual comparison against BD507 reveals the transposed digits.

Award one mark per point. Use the supplied check-digit rule; do not add weights for the final check digit.

## Section 7: Ethics and ownership - cumulative check (20 marks)

### 1. explain - 5 marks

Connect two syllabus ideas from Section 7 and explain why the connection matters in a new scenario.

**Answer and guidance:** S7.01: explain professional, ethics, purpose. S7.01 method: Establish the exact components or states → Trace the relationship or change → Use the explanation in a concrete case. S7.02: explain joining, British, Computer, Society, IEEE, codes, conduct. Award up to five independent marks for accurate, connected points applied to the new context.

### 2. correct - 5 marks

Correct a plausible student error about ethical decisions and their consequences and justify the corrected answer.

**Answer and guidance:** S7.03: explain situation, ethical, unethical, impact. S7.03 method: Identify the relevant condition or input → Trace how the process works → Connect the mechanism to its result. Correction to remember: Students often write personal opinions only. Correction: ethics answers need stakeholders, evidence and balanced judgement. Award up to five independent marks for accurate, connected points applied to the new context.

### 3. apply - 5 marks

Apply the main method from copyright and software licences to a different context from the lesson.

**Answer and guidance:** S7.04: explain copyright, software, legislation, needed. S7.04 method: Establish the exact components or states → Trace the relationship or change → Use the explanation in a concrete case. S7.05: explain FSF, OSI, shareware, commercial, licences, licence. Award up to five independent marks for accurate, connected points applied to the new context.

### 4. compare - 5 marks

Compare two alternatives from Section 7, then recommend one for a stated purpose.

**Answer and guidance:** S7.06: explain AI, applications, evaluate, social, economic, environmental, impacts. S7.06 method: Establish the exact components or states → Trace the relationship or change → Use the explanation in a concrete case. Correction to remember: Students often write personal opinions only. Correction: ethics answers need stakeholders, evidence and balanced judgement. Award up to five independent marks for accurate, connected points applied to the new context.

## Section 8: Databases - cumulative check (20 marks)

### 1. explain - 5 marks

Connect two syllabus ideas from Section 8 and explain why the connection matters in a new scenario.

**Answer and guidance:** S8.01: explain limitations, file-based, relational, databases, redundancy, inconsistency, linked tables. S8.01 method: Identify the relevant condition or input → Trace how the process works → Connect the mechanism to its result. S8.02: explain entity, table, record, tuple, field, attribute, primary key, candidate key, secondary key, foreign key, relationships, one-to-one, one-to-many, many-to-many, referential, integrity, indexing. Award up to five independent marks for accurate, connected points applied to the new context.

### 2. correct - 5 marks

Correct a plausible student error about entity-relationship design and normalisation and justify the corrected answer.

**Answer and guidance:** S8.03: explain entity-relationship, diagram. S8.03 method: Set up the required data and conditions → Carry out the complete method → Trace or test the result. S8.04: explain 1NF, 2NF, 3NF, normalised / normalized, design. Award up to five independent marks for accurate, connected points applied to the new context.

### 3. apply - 5 marks

Apply the main method from dbms architecture, integrity, security and backup to a different context from the lesson.

**Answer and guidance:** S8.05: explain DBMS, features, dictionary, modelling / modeling, logical, schema, integrity, security, backup, access, rights. S8.05 method: Identify the relevant condition or input → Trace how the process works → Connect the mechanism to its result. S8.06: explain developer, interface, query, processor. Award up to five independent marks for accurate, connected points applied to the new context.

### 4. compare - 5 marks

Compare two alternatives from Section 8, then recommend one for a stated purpose.

**Answer and guidance:** S8.07: explain DDL, creation, modification, database structure, DML, queries, maintenance, SQL, industry-standard, language. S8.07 method: Identify the relevant condition or input → Trace how the process works → Connect the mechanism to its result. Correction to remember: Students often choose names as primary keys. Correction: a primary key must uniquely and reliably identify a record. Award up to five independent marks for accurate, connected points applied to the new context.

## Section 9: Algorithm design and problem-solving - cumulative check (20 marks)

### 1. explain - 5 marks

Connect two syllabus ideas from Section 9 and explain why the connection matters in a new scenario.

**Answer and guidance:** S9.01: explain abstraction, essential details, irrelevant detail, abstract model. S9.01 method: Identify the relevant condition or input → Trace how the process works → Connect the mechanism to its result. Correction to remember: Students often start coding before defining the output. Correction: an algorithm is easier to design when the required result is known first. Award up to five independent marks for accurate, connected points applied to the new context.

### 2. correct - 5 marks

Correct a plausible student error about decomposition and modular problem solving and justify the corrected answer.

**Answer and guidance:** S9.02: explain decomposition, problem, modules, procedure, function. S9.02 method: Set up the required data and conditions → Carry out the complete method → Trace or test the result. Correction to remember: Students often start coding before defining the output. Correction: an algorithm is easier to design when the required result is known first. Award up to five independent marks for accurate, connected points applied to the new context.

### 3. apply - 5 marks

Apply the main method from algorithms and meaningful identifiers to a different context from the lesson.

**Answer and guidance:** S9.03: explain algorithm, solution, sequence, defined steps. S9.03 method: Identify the relevant condition or input → Trace how the process works → Connect the mechanism to its result. S9.04: explain meaningful, identifier, names, table. Award up to five independent marks for accurate, connected points applied to the new context.

### 4. compare - 5 marks

Compare two alternatives from Section 9, then recommend one for a stated purpose.

**Answer and guidance:** S9.05: explain input-process-output, design, pseudocode, solution. S9.05 method: Set up the required data and conditions → Carry out the complete method → Trace or test the result. Correction to remember: Students often create one sub-problem per tiny action. Correction: each sub-problem needs a meaningful responsibility. Award up to five independent marks for accurate, connected points applied to the new context.

## Section 10: Data types and structures - cumulative check (20 marks)

### 1. explain - 5 marks

Connect two syllabus ideas from Section 10 and explain why the connection matters in a new scenario.

**Answer and guidance:** S10.01: explain integer, real, char, string, Boolean, date, ARRAY, FILE. S10.01 method: Identify the relevant condition or input → Trace how the process works → Connect the mechanism to its result. Correction to remember: Students often confuse the identifier of the whole structure with one element. Correction: access requires an index or field name. Award up to five independent marks for accurate, connected points applied to the new context.

### 2. correct - 5 marks

Correct a plausible student error about records: defining, reading and saving structured data and justify the corrected answer.

**Answer and guidance:** S10.02: explain record, different data types, one identifier, define, read, save. S10.02 method: Identify the relevant condition or input → Trace how the process works → Connect the mechanism to its result. Correction to remember: Students often confuse the identifier of the whole structure with one element. Correction: access requires an index or field name. Award up to five independent marks for accurate, connected points applied to the new context.

### 3. apply - 5 marks

Apply the main method from array terminology, indices and bounds to a different context from the lesson.

**Answer and guidance:** S10.03: explain array, index, lower bound, upper bound. S10.03 method: Identify the relevant condition or input → Trace how the process works → Connect the mechanism to its result. Correction to remember: Students often confuse the identifier of the whole structure with one element. Correction: access requires an index or field name. Award up to five independent marks for accurate, connected points applied to the new context.

### 4. compare - 5 marks

Compare two alternatives from Section 10, then recommend one for a stated purpose.

**Answer and guidance:** S10.04: explain one-dimensional / 1D, two-dimensional / 2D, select / suitable. S10.04 method: Extract the constraints from the scenario → Match mechanisms to those constraints → Link the choice to a consequence. S10.05: explain pseudocode, one-dimensional / 1D, two-dimensional / 2D, ARRAY. Award up to five independent marks for accurate, connected points applied to the new context.

## Section 11: Programming - cumulative check (20 marks)

### 1. explain - 5 marks

Connect two syllabus ideas from Section 11 and explain why the connection matters in a new scenario.

**Answer and guidance:** S11.01: explain pseudocode, flowchart, structured-English / structured English, description / descriptions / design. S11.01 method: Set up the required data and conditions → Carry out the complete method → Trace or test the result. Correction to remember: Students often think working Java automatically means good pseudocode. Correction: Paper 2 rewards clear Cambridge-style algorithm expression. Award up to five independent marks for accurate, connected points applied to the new context.

### 2. correct - 5 marks

Correct a plausible student error about declarations, assignment and input/output and justify the corrected answer.

**Answer and guidance:** S11.02: explain declaration / declarations, constants, variables, assignment, arithmetic, logical, input, output. S11.02 method: Set up the required data and conditions → Carry out the complete method → Trace or test the result. Correction to remember: Students often think working Java automatically means good pseudocode. Correction: Paper 2 rewards clear Cambridge-style algorithm expression. Award up to five independent marks for accurate, connected points applied to the new context.

### 3. apply - 5 marks

Apply the main method from arithmetic and logical expressions to a different context from the lesson.

**Answer and guidance:** S11.02: explain declaration / declarations, constants, variables, assignment, arithmetic, logical, input, output. S11.02 method: Set up the required data and conditions → Carry out the complete method → Trace or test the result. Correction to remember: Students often think working Java automatically means good pseudocode. Correction: Paper 2 rewards clear Cambridge-style algorithm expression. Award up to five independent marks for accurate, connected points applied to the new context.

### 4. compare - 5 marks

Compare two alternatives from Section 11, then recommend one for a stated purpose.

**Answer and guidance:** S11.03: explain built-in / library, string, functions. S11.03 method: Set up the required data and conditions → Carry out the complete method → Trace or test the result. Correction to remember: Students often think working Java automatically means good pseudocode. Correction: Paper 2 rewards clear Cambridge-style algorithm expression. Award up to five independent marks for accurate, connected points applied to the new context.

## Section 12: Software development - cumulative check (20 marks)

### 1. explain - 5 marks

Connect two syllabus ideas from Section 12 and explain why the connection matters in a new scenario.

**Answer and guidance:** S12.01: explain RAD, rapid prototyping, time-box / timebox / time-boxed / time-boxing, user involvement, waterfall, iterative, limitation / less suitable / unsuitable. S12.01 method: Identify the relevant condition or input → Trace how the process works → Connect the mechanism to its result. Correction to remember: Students often describe the lifecycle as a fixed checklist. Correction: development is iterative; findings can send a project back to earlier stages. Award up to five independent marks for accurate, connected points applied to the new context.

### 2. correct - 5 marks

Correct a plausible student error about structure charts and module interfaces and justify the corrected answer.

**Answer and guidance:** S12.02: explain structure, charts, parameters, derive, pseudocode. S12.02 method: Identify the relevant condition or input → Trace how the process works → Connect the mechanism to its result. Correction to remember: Students often describe the lifecycle as a fixed checklist. Correction: development is iterative; findings can send a project back to earlier stages. Award up to five independent marks for accurate, connected points applied to the new context.

### 3. apply - 5 marks

Apply the main method from state-transition diagrams to a different context from the lesson.

**Answer and guidance:** S12.03: explain state-transition, diagrams. S12.03 method: Establish the exact components or states → Trace the relationship or change → Use the explanation in a concrete case. Correction to remember: Students often describe the lifecycle as a fixed checklist. Correction: development is iterative; findings can send a project back to earlier stages. Award up to five independent marks for accurate, connected points applied to the new context.

### 4. compare - 5 marks

Compare two alternatives from Section 12, then recommend one for a stated purpose.

**Answer and guidance:** S12.04: explain logic, runtime, errors. S12.04 method: Establish the exact components or states → Trace the relationship or change → Use the explanation in a concrete case. Correction to remember: Students often describe the lifecycle as a fixed checklist. Correction: development is iterative; findings can send a project back to earlier stages. Award up to five independent marks for accurate, connected points applied to the new context.

## Paper 1 original cumulative mock (75 marks)

### 1. calculate - 8 marks

A digital field guide contains a 1.5 MiB image, an RLE text block and a vector icon. (a) Calculate the image size in bytes and MB. [2] (b) Each RLE pair uses an 8-bit count and an 8-bit character. Decode 5D 2E 2F, calculate its encoded bit size and the saving relative to the original 8-bit characters. [3] (c) Explain what a dictionary-based decoder must preserve for the guide text to remain lossless. [1] (d) Explain how the vector icon is stored and why it can be resized without pixelation. [2]

**Answer and guidance:**

- 1.5 × 2^20 = 1,572,864 bytes.
- 1,572,864 / 1,000,000 = 1.572864 MB.
- The original text is DDDDDEEFF.
- There are three pairs, requiring 3 × 16 = 48 bits.
- The original nine characters require 9 × 8 = 72 bits, so RLE saves 24 bits.
- Dictionary references must expand to the exact original words and preserve separators.
- A vector icon stores drawing objects and properties rather than a colour for every pixel.
- Resizing recalculates coordinates and dimensions and redraws the objects, avoiding bitmap pixelation.

Award one mark per distinct point within each part. Accept equivalent working. Byte prefixes and the RLE storage format are as stated; do not assume additional compression.

### 2. apply - 9 marks

Use a fresh context to demonstrate and connect the key ideas from network topologies and packet transmission.

**Answer and guidance:** S2.04: explain bus topology, star topology, mesh topology, hybrid topology. S2.04 method: Establish the exact components or states → Trace the relationship or change → Use the explanation in a concrete case. S2.05: explain between two hosts, bus, central switch, alternative routes, hybrid, justify. S2.05 method: Identify the relevant condition or input → Trace how the process works → Connect the mechanism to its result. Correction to remember: Students often confuse bandwidth with speed in every sense. Correction: bandwidth is capacity; latency and congestion also affect perceived performance. Award up to 9 marks for a complete, technically accurate response that follows the command word and stays in context.

### 3. explain - 9 marks

Explain the following choices for a desktop computer: SRAM for a small processor cache, DRAM for large main memory, and EEPROM for firmware that may need updating. A peripheral sends a burst of six data blocks into an empty buffer of capacity six; the computer then removes one block per millisecond with no further arrivals. State how many blocks remain after 4 ms and explain why the buffer cannot accommodate a permanently higher incoming rate.

**Answer and guidance:**

- SRAM provides fast access for the small cache, reducing processor waiting time.
- DRAM has lower cost per bit and higher density, making large main memory practical.
- SRAM stores a bit in a powered bistable latch, whereas DRAM stores capacitor charge.
- DRAM requires periodic refresh because charge leaks; SRAM does not require that refresh while powered.
- Both SRAM and DRAM lose stored data when power is removed.
- EEPROM retains firmware when the desktop computer is switched off.
- Its electrical erase and rewrite capability permits later firmware updates.
- After 4 ms, four blocks have been removed, leaving two blocks in the buffer.
- A sustained excess arrival rate eventually fills the finite buffer; transfer must pause or data can be lost.

Award one mark for each listed point, or an equivalent correct response. Do not award the same idea twice.

### 4. describe - 10 marks

(a) Describe why an enabled keyboard interrupt is checked after the current instruction and how saving PC and status flags permits a correct return (3 marks). (b) Calculate ACC after LDI 300 and SUB #2 in the supplied program, then state Memory[302] after STO 302; explain the first lookup performed by LDI (4 marks). (c) For unsigned 8-bit ACC=00111000, calculate LSR #2 and explain which bits enter; then give an immediate binary OR mask that sets bit 7 of the result without changing other bits (3 marks).

Initial ACC=0, IX=0, PC=50; comparison result unset. Memory[300]=301, Memory[301]=5. No input is needed. Addresses are denary; each listed instruction or data item occupies one location.

```text
050  LDI 300
051  SUB #2
052  STO 302
053  END
```

**Answer and guidance:**

- (a) Checking after instruction completion provides a defined point at which to suspend execution.
- (a) The saved PC identifies the next instruction to resume.
- (a) Restoring status flags preserves the interrupted program's condition state.
- (b) The first lookup reads pointer 301 from Memory[300].
- (b) LDI follows that pointer and loads ACC=5 from Memory[301].
- (b) SUB #2 changes ACC to 3.
- (b) STO 302 writes value 3 into Memory[302].
- (c) LSR #2 produces 00001110 (14).
- (c) Logical right shift introduces two zeros at the left.
- (c) OR B10000000 sets bit 7, giving 10001110.

Award one mark for each independent point below. Accept equivalent accurate wording or notation.

### 5. explain - 9 marks

A programmer wants Total to become 15. The program sets Total <- 9 and Bonus <- 6, then executes Total <- Total - Bonus followed by OUTPUT Total. It has valid syntax. (a) Explain why dynamic syntax checking may accept it, and describe how context-sensitive prompts and pretty-printing help during editing. [3] (b) A breakpoint pauses before the subtraction. State Total at the pause and after one step. Describe how to inspect Total + Bonus after that step without changing Total, and how to observe the program's actual output. [4] (c) State the correction and the expected output when the corrected program is rerun from its initial state. [2]

**Answer and guidance:**

- (a) Subtraction is permitted by the language grammar, so the wrong operator can be a logic error without a syntax error.
- (a) Context-sensitive prompts can suggest available identifiers or required parameters while source is entered.
- (a) Pretty-printing uses indentation or syntax colouring to make source easier to read.
- (b) At the pause before subtraction, Total is still 9.
- (b) Single stepping the subtraction makes Total equal to 3.
- (b) Inspect or watch Total + Bonus: it evaluates to 9 after the faulty step, while Total remains 3.
- (b) Step the following OUTPUT statement and read 3 in the program-output/report window.
- (c) Replace the subtraction with Total <- Total + Bonus.
- (c) Rerunning from Total = 9 and Bonus = 6 should output 15.

Award one mark for each point, with maxima (a) 3, (b) 4 and (c) 2. Distinguish the value before the breakpointed statement from the value after it. Accept equivalent IDE facilities and notation.

### 6. explain - 10 marks

A laboratory receives an urgent email asking staff to enter credentials through a link. Its results archive is encrypted and reviewers have read-only access. A source result 36 is entered as 63 under a range rule 0 to 100. A transfer of bytes 90,80,100 uses a sum-modulo-256 checksum. (a) Identify the email threat and suggest a suitable precaution. [2] (b) Explain how encryption protects a stolen archive, how an authorised user recovers it, and how read-only rights control reviewers. [4] (c) Explain why 63 passes validation but fails source verification, calculate the checksum for the given bytes, and explain why changing them to 91,79,100 evades this checksum. [4]

**Answer and guidance:**

- (a) The deceptive credential request is phishing.
- (a) Use the independently known laboratory service or a verified support contact instead of the supplied link.
- (b) Encryption transforms the archive into ciphertext, concealing readable results from a finder without the key.
- (b) Decryption with the correct key and method recovers the original plaintext.
- (b) Reviewers may read the results.
- (b) The system rejects their requests to modify or delete results.
- (c) 63 is within 0 to 100, so the range check accepts it.
- (c) Comparing 63 with source 36 detects a copying mismatch.
- (c) The total is 270, so the checksum is 14 modulo 256.
- (c) 91 + 79 + 100 is also 270; the matching checksum misses these cancelling changes.

Award up to 2 marks for (a), 4 for (b) and 4 for (c), one per stated point. Do not award the same explanation twice.

### 7. explain - 10 marks

Use a fresh context to demonstrate and connect the key ideas from copyright and software licences.

**Answer and guidance:** S7.04: explain copyright, software, legislation, needed. S7.04 method: Establish the exact components or states → Trace the relationship or change → Use the explanation in a concrete case. S7.05: explain FSF, OSI, shareware, commercial, licences, licence. S7.05 method: Identify the relevant condition or input → Trace how the process works → Connect the mechanism to its result. Correction to remember: Students often write personal opinions only. Correction: ethics answers need stakeholders, evidence and balanced judgement. Award up to 10 marks for a complete, technically accurate response that follows the command word and stays in context.

### 8. apply - 10 marks

Use a fresh context to demonstrate and connect the key ideas from entity-relationship design and normalisation.

**Answer and guidance:** S8.03: explain entity-relationship, diagram. S8.03 method: Set up the required data and conditions → Carry out the complete method → Trace or test the result. S8.04: explain 1NF, 2NF, 3NF, normalised / normalized, design. S8.04 method: Identify the relevant condition or input → Trace how the process works → Connect the mechanism to its result. Correction to remember: Students often choose names as primary keys. Correction: a primary key must uniquely and reliably identify a record. Award up to 10 marks for a complete, technically accurate response that follows the command word and stays in context.

## Paper 2 original cumulative mock (75 marks)

### 1. explain - 8 marks

Use a fresh context to demonstrate and connect the key ideas from abstraction and abstract models.

**Answer and guidance:** S9.01: explain abstraction, essential details, irrelevant detail, abstract model. S9.01 method: Identify the relevant condition or input → Trace how the process works → Connect the mechanism to its result. Correction to remember: Students often start coding before defining the output. Correction: an algorithm is easier to design when the required result is known first. Award up to 8 marks for a complete, technically accurate response that follows the command word and stays in context.

### 2. apply - 9 marks

Use a fresh context to demonstrate and connect the key ideas from records: defining, reading and saving structured data.

**Answer and guidance:** S10.02: explain record, different data types, one identifier, define, read, save. S10.02 method: Identify the relevant condition or input → Trace how the process works → Connect the mechanism to its result. Correction to remember: Students often confuse the identifier of the whole structure with one element. Correction: access requires an index or field name. Award up to 9 marks for a complete, technically accurate response that follows the command word and stays in context.

### 3. justify - 9 marks

Use a fresh context to demonstrate and connect the key ideas from arithmetic and logical expressions.

**Answer and guidance:** S11.02: explain declaration / declarations, constants, variables, assignment, arithmetic, logical, input, output. S11.02 method: Set up the required data and conditions → Carry out the complete method → Trace or test the result. Correction to remember: Students often think working Java automatically means good pseudocode. Correction: Paper 2 rewards clear Cambridge-style algorithm expression. Award up to 9 marks for a complete, technically accurate response that follows the command word and stays in context.

### 4. explain - 10 marks

Use a fresh context to demonstrate and connect the key ideas from finding and correcting program errors.

**Answer and guidance:** S12.04: explain logic, runtime, errors. S12.04 method: Establish the exact components or states → Trace the relationship or change → Use the explanation in a concrete case. Correction to remember: Students often describe the lifecycle as a fixed checklist. Correction: development is iterative; findings can send a project back to earlier stages. Award up to 10 marks for a complete, technically accurate response that follows the command word and stays in context.

### 5. apply - 9 marks

Use a fresh context to demonstrate and connect the key ideas from sequence, selection and iteration.

**Answer and guidance:** S9.06: explain sequence, selection, iteration. S9.06 method: Identify the relevant condition or input → Trace how the process works → Connect the mechanism to its result. Correction to remember: Students often start coding before defining the output. Correction: an algorithm is easier to design when the required result is known first. Award up to 9 marks for a complete, technically accurate response that follows the command word and stays in context.

### 6. justify - 10 marks

Use a fresh context to demonstrate and connect the key ideas from linear search using arrays.

**Answer and guidance:** S10.06: explain bubble sort, linear search, write. S10.06 method: Set the first index and found state → Compare within the valid bounds → Report found or exhausted. Correction to remember: A linear search does not require sorted data, but it must still respect the declared array bounds. Award up to 10 marks for a complete, technically accurate response that follows the command word and stays in context.

### 7. explain - 10 marks

Use a fresh context to demonstrate and connect the key ideas from pre-condition and post-condition loops.

**Answer and guidance:** S11.04: explain IF, ELSE, nested, selection, CASE, count-controlled, loop / loops, post-condition, pre-condition. S11.04 method: Set up the required data and conditions → Carry out the complete method → Trace or test the result. Correction to remember: Students often think working Java automatically means good pseudocode. Correction: Paper 2 rewards clear Cambridge-style algorithm expression. Award up to 10 marks for a complete, technically accurate response that follows the command word and stays in context.

### 8. apply - 10 marks

Use a fresh context to demonstrate and connect the key ideas from corrective, adaptive and perfective maintenance.

**Answer and guidance:** S12.08: explain perfective, adaptive, corrective, maintenance. S12.08 method: Identify the relevant condition or input → Trace how the process works → Connect the mechanism to its result. Correction to remember: Students often describe the lifecycle as a fixed checklist. Correction: development is iterative; findings can send a project back to earlier stages. Award up to 10 marks for a complete, technically accurate response that follows the command word and stays in context.
