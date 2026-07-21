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

## Quiz after Lesson 005: Number representation foundations

**Syllabus:** Sections 1.1

**Assessment objectives:** AO1, AO2

**Coverage:** Lessons 001-005

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. Convert 2 MiB to bytes. **[2]**
2. Convert binary 10110110 to denary. **[2]**
3. Convert hexadecimal 9F to denary. **[2]**
4. Add 11110000 and 00110000. State why the result cannot be stored in eight unsigned bits. **[2]**
5. Write -18 as an 8-bit two's-complement value. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **M1** 2 x 1024 x 1024
- **A1** 2097152 bytes

**Guidance:** Do not accept decimal MB conversion.

#### Q2 [2]

- **M1** 128 + 32 + 16 + 4 + 2
- **A1** 182

**Guidance:** Allow any correct place-value working.

#### Q3 [2]

- **M1** 9 x 16 + 15
- **A1** 159

**Guidance:** Do not interpret F as a decimal digit.

#### Q4 [2]

- **M1** obtains 1 00100000 / denary 288
- **A1** carry creates a ninth bit / value exceeds 255, so overflow occurs

**Guidance:** Do not accept only 'the answer is too long'.

#### Q5 [2]

- **M1** 18 = 00010010; invert and add 1
- **A1** 11101110

**Guidance:** Do not accept sign-and-magnitude 10010010.

---

## Quiz after Lesson 010: Codes, graphics and sound

**Syllabus:** Sections 1.1, 1.2

**Assessment objectives:** AO1, AO2

**Coverage:** Lessons 006-010

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. Write denary 59 in BCD. **[2]**
2. Explain one reason Unicode is used instead of ASCII for a worldwide messaging system. **[2]**
3. State two items stored for a vector drawing object. **[2]**
4. Calculate the pixel data in bytes for a 100 x 50 bitmap with 8-bit colour depth. **[2]**
5. Distinguish sampling rate from sample resolution. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **B1** 5 is encoded as 0101
- **A1** 9 is encoded as 1001; 0101 1001

**Guidance:** Do not accept pure binary 00111011.

#### Q2 [2]

- **B1** Unicode represents a much larger range of characters/scripts
- **B1** users can store/display characters from many languages consistently

**Guidance:** Do not accept only 'Unicode uses more bits'.

#### Q3 [2]

- **B1** one valid property such as object type/coordinates/dimensions
- **B1** a second valid property such as line/fill colour or transformation

**Guidance:** Do not award pixel colour depth as an object property.

#### Q4 [2]

- **M1** 100 x 50 x 8 bits, then divides by 8
- **A1** 5000 bytes

**Guidance:** Allow FT from the candidate's earlier incorrect pixel total only when the subsequent conversion to bytes is correct.

#### Q5 [2]

- **B1** sampling rate is samples taken per second
- **B1** sample resolution is bits/levels used for each sample amplitude

**Guidance:** Do not reverse time frequency and amplitude precision.

---

## Quiz after Lesson 015: Multimedia size and compression

**Syllabus:** Sections 1.2, 1.3

**Assessment objectives:** AO1, AO2

**Coverage:** Lessons 011-015

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. Calculate the uncompressed size in bits of 2 s mono audio sampled at 8000 Hz with 8-bit resolution. **[2]**
2. Choose a compression type for program source code and justify the choice. **[2]**
3. Run-length encode AAAAABBCC using symbol-count pairs. **[2]**
4. Choose bitmap or vector storage for a scalable school logo and give one reason. **[2]**
5. A candidate says increasing colour depth reduces bitmap size. Correct the claim. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **M1** 8000 x 8 x 2
- **A1** 128000 bits

**Guidance:** Award the answer mark only with the correct unit.

#### Q2 [2]

- **B1** lossless compression
- **B1** every character must be reconstructed exactly to preserve syntax/behaviour

**Guidance:** Do not accept only 'lossy has lower quality'.

#### Q3 [2]

- **M1** identifies runs 5A, 2B and 2C
- **A1** A5 B2 C2 or an explicitly stated equivalent pair order

**Guidance:** Allow count-symbol order when used consistently.

#### Q4 [2]

- **B1** vector
- **B1** objects can be recalculated at new sizes without pixelation

**Guidance:** Do not accept only 'vector is better quality'.

#### Q5 [2]

- **B1** increasing colour depth uses more bits per pixel
- **B1** with dimensions unchanged, uncompressed pixel data increases

**Guidance:** Do not award a correction that changes image dimensions instead.

---

## Quiz after Lesson 020: Networks, packets and addressing

**Syllabus:** Sections 2.1

**Assessment objectives:** AO1, AO2

**Coverage:** Lessons 016-020

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. Distinguish a LAN from a WAN. **[2]**
2. State one feature of a thin client and one feature of a thick client. **[2]**
3. State two items found in a packet header. **[2]**
4. Describe what an Ethernet station does after CSMA/CD detects a collision. **[2]**
5. Explain why a public web server normally uses a static public IP address. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **B1** LAN covers a limited local area under one organisation's control
- **B1** WAN connects networks over a large geographical area using external links

**Guidance:** Do not define the difference only by speed.

#### Q2 [2]

- **B1** thin client depends mainly on server processing/storage
- **B1** thick client performs substantial local processing/storage

**Guidance:** Allow equivalent client-server wording.

#### Q3 [2]

- **B1** one valid item such as source/destination address
- **B1** a second valid item such as sequence number/checksum/protocol

**Guidance:** Do not award payload content as a header item.

#### Q4 [2]

- **B1** stops transmitting and waits for a random backoff
- **B1** senses the medium and retries when it is available

**Guidance:** Do not describe collision avoidance as the detection method.

#### Q5 [2]

- **B1** public address makes it reachable from other networks/the internet
- **B1** static address provides a stable destination for DNS/client requests

**Guidance:** Do not claim a public address alone guarantees security.

---

## Quiz after Lesson 025: Protocols, media and internet services

**Syllabus:** Sections 2.1

**Assessment objectives:** AO1, AO2

**Coverage:** Lessons 021-025

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. Choose HTTPS or SMTP for retrieving a secure web page and justify. **[2]**
2. Give one advantage of fibre-optic cable over copper and explain its cause. **[2]**
3. Distinguish a switch from a router. **[2]**
4. Distinguish the World Wide Web from the internet. **[2]**
5. Distinguish bandwidth from latency. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **B1** HTTPS
- **B1** HTTP communication is protected using encryption/authentication through TLS

**Guidance:** Do not award SMTP, which transfers email.

#### Q2 [2]

- **B1** higher bandwidth/lower attenuation/no electromagnetic interference
- **B1** uses light rather than electrical signals

**Guidance:** Do not accept only 'fibre is faster'.

#### Q3 [2]

- **B1** switch forwards frames within a LAN using MAC/local information
- **B1** router forwards packets between networks using IP addresses

**Guidance:** Award both marks only for a matched contrast.

#### Q4 [2]

- **B1** internet is the global network infrastructure/interconnected networks
- **B1** WWW is a service of linked web resources accessed over the internet

**Guidance:** Do not state that the two terms are synonyms.

#### Q5 [2]

- **B1** bandwidth is data-transfer capacity/rate
- **B1** latency is transmission/response delay

**Guidance:** Do not accept that both simply mean speed.

---

## Quiz after Lesson 030: Computer components and primary memory

**Syllabus:** Sections 3.1

**Assessment objectives:** AO1, AO2

**Coverage:** Lessons 026-030

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. State the roles of the processor and main memory in a computer system. **[2]**
2. Choose a direct data-capture input device for reading product codes at a checkout and name the captured data. **[2]**
3. Explain why a printer buffer is needed when the CPU supplies data faster than the printer outputs it. **[2]**
4. Distinguish RAM from ROM using volatility. **[2]**
5. Explain why SRAM is suitable for cache while DRAM is suitable for main memory. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **B1** processor executes instructions/processes data
- **B1** main memory holds currently used instructions and data

**Guidance:** Do not describe secondary storage as main memory.

#### Q2 [2]

- **B1** barcode/QR scanner
- **B1** captures the encoded product identifier/code

**Guidance:** Do not award keyboard as direct data capture.

#### Q3 [2]

- **B1** temporarily stores pending output data
- **B1** allows devices with different operating rates to work without the CPU waiting for every character/page

**Guidance:** Do not describe the buffer as permanent backup storage.

#### Q4 [2]

- **B1** RAM is volatile and loses contents without power
- **B1** ROM is non-volatile and retains contents without power

**Guidance:** Do not accept that ROM can never be reprogrammed.

#### Q5 [2]

- **B1** SRAM is faster/does not require refresh
- **B1** DRAM is denser/cheaper per bit for larger capacity

**Guidance:** Do not accept that DRAM is faster than SRAM.

---

## Quiz after Lesson 035: Storage, embedded systems and logic

**Syllabus:** Sections 3.1, 3.2

**Assessment objectives:** AO1, AO2

**Coverage:** Lessons 031-035

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. Choose solid-state storage for a portable camera and justify. **[2]**
2. State one characteristic used to compare storage devices and explain its relevance to video files. **[2]**
3. Explain why a washing-machine controller is an embedded system. **[2]**
4. Name a sensor and actuator for an automatic greenhouse window. **[2]**
5. State the XOR output for inputs 0,0 and 0,1. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **B1** solid-state/flash storage
- **B1** no moving parts gives shock resistance/low power/portability

**Guidance:** Do not award only a brand name.

#### Q2 [2]

- **B1** valid characteristic such as capacity/read-write speed/cost
- **B1** links characteristic to storing or recording large video data

**Guidance:** Do not award an unexplained adjective such as 'good'.

#### Q3 [2]

- **B1** computer is built into a larger device for a dedicated function
- **B1** automatically controls a limited set of washing inputs/outputs

**Guidance:** Do not accept only 'it is small'.

#### Q4 [2]

- **B1** temperature sensor
- **B1** motor/actuator that opens the window

**Guidance:** Do not award a display as the actuator.

#### Q5 [2]

- **B1** 0 for inputs 0,0
- **B1** 1 for inputs 0,1

**Guidance:** Answers must be in the stated order.

---

## Quiz after Lesson 040: Logic circuits and hardware decisions

**Syllabus:** Sections 3.1, 3.2

**Assessment objectives:** AO1, AO2

**Coverage:** Lessons 036-040

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. For X = (A OR B) AND NOT C, calculate X when A=0, B=1 and C=0. **[2]**
2. A burglar alarm sounds when Door is open AND Armed is true. Write the Boolean expression. **[2]**
3. Recommend laser or inkjet printing for 5000 monochrome office pages each week and give one reason. **[2]**
4. Explain one environmental consequence of replacing computers frequently. **[2]**
5. Distinguish monitoring from control in a sensor system. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **M1** A OR B = 1 and NOT C = 1
- **A1** X = 1

**Guidance:** Award the final mark only for a consistent final AND operation.

#### Q2 [2]

- **B1** identifies AND operation
- **A1** Alarm = Door AND Armed

**Guidance:** Allow standard Boolean symbols.

#### Q3 [2]

- **B1** laser printer
- **B1** fast/high-volume output or lower cost per page in this workload

**Guidance:** Do not award the device without a workload-linked reason.

#### Q4 [2]

- **B1** more electronic waste/resource extraction/energy in manufacture
- **B1** develops a consequence such as toxic disposal or increased emissions

**Guidance:** Do not accept only 'bad for the environment'.

#### Q5 [2]

- **B1** monitoring records/displays readings
- **B1** control uses readings to change an actuator/system state

**Guidance:** Do not state that every monitored system has an actuator.

---

## Quiz after Lesson 045: CPU architecture and instruction processing

**Syllabus:** Sections 4.1

**Assessment objectives:** AO1, AO2

**Coverage:** Lessons 041-045

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. State the roles of the ALU and control unit. **[2]**
2. State the first and final register transfers in a basic fetch stage. **[2]**
3. Distinguish MAR from MDR. **[2]**
4. Choose HDMI or VGA for transmitting digital video and audio on one cable. **[2]**
5. Explain why machine code is processor dependent. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **B1** ALU performs arithmetic/logic operations
- **B1** control unit decodes instructions and coordinates control signals

**Guidance:** Do not assign instruction decoding to the ALU.

#### Q2 [2]

- **B1** MAR <- PC
- **B1** CIR <- MDR after the memory read

**Guidance:** Allow PC increment between the stated transfers.

#### Q3 [2]

- **B1** MAR holds the address currently accessed
- **B1** MDR holds data/instruction transferred to or from memory

**Guidance:** Do not swap address and contents.

#### Q4 [2]

- **B1** HDMI
- **B1** carries digital video and audio; VGA is analogue video only

**Guidance:** Do not award USB without a stated alternative interface scenario.

#### Q5 [2]

- **B1** opcodes/formats are defined by a processor instruction set
- **B1** another processor may decode the bit pattern differently or not support it

**Guidance:** Do not accept only 'processors are different'.

---

## Quiz after Lesson 050: Assembly, interrupts and bit manipulation

**Syllabus:** Sections 4.2, 4.3

**Assessment objectives:** AO1, AO2

**Coverage:** Lessons 046-050

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. State one task completed in each pass of a two-pass assembler. **[2]**
2. Base address 500 is used with IX = 7. Calculate the indexed effective address. **[2]**
3. State two processor actions when accepting an interrupt. **[2]**
4. Explain how cache hit rate affects processor performance. **[2]**
5. Use a bitwise operation and mask to set bit 2 of an 8-bit value, using bit 0 as the rightmost bit. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **B1** pass 1 assigns addresses/builds the symbol table
- **B1** pass 2 translates instructions using resolved labels

**Guidance:** Do not state that either pass executes the program.

#### Q2 [2]

- **M1** adds operand/base and index register
- **A1** 507

**Guidance:** Do not dereference the calculated address a second time.

#### Q3 [2]

- **B1** saves current state/return address after completing an instruction
- **B1** branches to/executes the interrupt service routine

**Guidance:** Do not accept that the entire program restarts.

#### Q4 [2]

- **B1** a hit supplies required data/instruction from faster cache
- **B1** more hits reduce slower main-memory accesses/CPU waiting

**Guidance:** Do not claim cache guarantees a fixed speed increase.

#### Q5 [2]

- **B1** uses OR
- **B1** mask 00000100

**Guidance:** Allow another bit-number convention only when explicitly stated.

---

## Quiz after Lesson 055: Operating systems and utilities

**Syllabus:** Sections 5.1

**Assessment objectives:** AO1, AO2

**Coverage:** Lessons 051-055

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. State one process-management and one memory-management role of an operating system. **[2]**
2. Choose a command-line or graphical interface for an expert repeatedly running scripted backups and justify. **[2]**
3. Distinguish backup from compression. **[2]**
4. Explain why an HDD defragmenter should not normally be used to improve SSD access time. **[2]**
5. State one purpose of encryption utility software and one purpose of antivirus software. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **B1** schedules/allocates CPU time or manages process states
- **B1** allocates/protects RAM or manages virtual memory

**Guidance:** Do not award application-software functions.

#### Q2 [2]

- **B1** command-line interface
- **B1** commands can be scripted/automated efficiently for repeated expert use

**Guidance:** Allow GUI only with a comparably developed scenario reason.

#### Q3 [2]

- **B1** backup creates a separate recoverable copy
- **B1** compression reduces storage/transmission size

**Guidance:** Do not accept compression alone as protection against deletion.

#### Q4 [2]

- **B1** SSD has no moving read head/does not seek between fragments
- **B1** rewriting blocks adds wear without the HDD seek-time benefit

**Guidance:** Do not accept only 'SSD is already fast'.

#### Q5 [2]

- **B1** encryption makes data unreadable without the key
- **B1** antivirus detects/quarantines/removes malicious software

**Guidance:** Do not state that either control guarantees complete security.

---

## Quiz after Lesson 060: Translators, libraries and development tools

**Syllabus:** Sections 5.2

**Assessment objectives:** AO1, AO2

**Coverage:** Lessons 056-060

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. Distinguish a compiler from an interpreter. **[2]**
2. State one output of lexical analysis and one output of syntax analysis. **[2]**
3. Explain one benefit and one risk of using a dynamically linked library. **[2]**
4. Distinguish a syntax error from a logic error. **[2]**
5. State the two main stages from Java source to execution. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **B1** compiler translates the whole program and produces target/object code
- **B1** interpreter translates/executes statement by statement

**Guidance:** Allow line-by-line as equivalent to statement-by-statement.

#### Q2 [2]

- **B1** lexical analysis produces tokens/symbol entries and rejects invalid tokens
- **B1** syntax analysis checks grammatical structure/builds a parse representation

**Guidance:** Do not state that either stage executes the source program.

#### Q3 [2]

- **B1** shared/reusable code reduces duplication or permits central update
- **B1** missing/incompatible library may stop execution/change behaviour

**Guidance:** Do not accept only 'more efficient'.

#### Q4 [2]

- **B1** syntax error breaks language grammar and prevents correct translation
- **B1** logic error translates/runs but produces an incorrect result

**Guidance:** Do not classify every runtime failure as a syntax error.

#### Q5 [2]

- **B1** Java compiler translates source to bytecode
- **B1** JVM interprets/JIT-compiles bytecode for the host

**Guidance:** Do not accept direct compilation to universal machine code.

---

## Quiz after Lesson 065: Security threats and authentication

**Syllabus:** Sections 6.1

**Assessment objectives:** AO1, AO2

**Coverage:** Lessons 061-065

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. Distinguish confidentiality from integrity. **[2]**
2. Distinguish a virus from a worm. **[2]**
3. Explain how phishing obtains credentials. **[2]**
4. Give two authentication factors from different categories. **[2]**
5. Explain one security benefit of multi-factor authentication. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **B1** confidentiality prevents unauthorised disclosure/access
- **B1** integrity preserves accurate, complete and authorised data

**Guidance:** Do not define both only as 'keeping data safe'.

#### Q2 [2]

- **B1** virus attaches to a host file/program and is triggered/spread with it
- **B1** worm self-replicates across systems/networks without a host file

**Guidance:** Allow equivalent propagation descriptions.

#### Q3 [2]

- **B1** deceptive message/site impersonates a trusted source
- **B1** user is persuaded to enter or disclose genuine credentials

**Guidance:** Do not describe only automatic redirection without deception.

#### Q4 [2]

- **B1** one knowledge/possession/inherence factor
- **B1** a valid factor from a different category

**Guidance:** Two passwords count as one factor category.

#### Q5 [2]

- **B1** requires evidence from more than one independent factor
- **B1** a stolen password alone is insufficient for access

**Guidance:** Do not accept only 'it is safer'.

---

## Quiz after Lesson 070: Security controls and data integrity

**Syllabus:** Sections 6.1, 6.2

**Assessment objectives:** AO1, AO2

**Coverage:** Lessons 066-070

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. Explain the principle of least privilege. **[2]**
2. Distinguish encryption from hashing. **[2]**
3. Describe how a firewall decides whether to block a packet. **[2]**
4. Distinguish validation from verification. **[2]**
5. State two parts of the 3-2-1 backup principle. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **B1** user/process receives only permissions required for its role
- **B1** limits damage or data exposure after error/account compromise

**Guidance:** Do not accept that every user should be an administrator.

#### Q2 [2]

- **B1** encryption is reversible with the correct key for confidentiality
- **B1** hashing produces a one-way digest for comparison/integrity

**Guidance:** Do not state that a hash is decrypted.

#### Q3 [2]

- **B1** examines header/connection information such as address, port or protocol
- **B1** compares it with configured rules and allows/blocks/logs accordingly

**Guidance:** Do not claim a firewall removes all malware.

#### Q4 [2]

- **B1** validation checks data against rules
- **B1** verification checks entered/copied data matches the source

**Guidance:** Do not claim either proves real-world truth.

#### Q5 [2]

- **B1** three copies or two different media/storage types
- **B1** one copy off-site/offline or the remaining distinct principle

**Guidance:** Do not award two restatements of the same part.

---

## Quiz after Lesson 075: Ethics, privacy and software ownership

**Syllabus:** Sections 7.1

**Assessment objectives:** AO1, AO2

**Coverage:** Lessons 071-075

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. State one role of a professional computing organisation and one reason its code of conduct matters. **[2]**
2. Explain one privacy risk of continuous employee location tracking. **[2]**
3. Distinguish copyright from a patent in computing. **[2]**
4. State one software freedom promoted by the FSF and one role of the OSI. **[2]**
5. Distinguish shareware from commercial proprietary software. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **B1** sets professional/ethical standards or supports practitioner competence
- **B1** guides accountable decisions/protects public interest

**Guidance:** Do not award only the organisation's name.

#### Q2 [2]

- **B1** reveals movements/routines beyond the necessary work purpose
- **B1** may enable intrusive monitoring, misuse or loss of trust

**Guidance:** Do not accept only the word 'privacy'.

#### Q3 [2]

- **B1** copyright protects expression such as source code automatically
- **B1** patent can protect a novel technical invention/method after grant

**Guidance:** Do not state that copyright protects every idea.

#### Q4 [2]

- **B1** freedom to run, study, modify or share software
- **B1** OSI defines/applies open-source criteria and approves licences

**Guidance:** Do not equate open source with public domain.

#### Q5 [2]

- **B1** shareware is distributed for trial/limited use before payment
- **B1** commercial proprietary use is granted under paid restrictive licence terms

**Guidance:** Allow overlap when the trial distinction is explicit.

---

## Quiz after Lesson 080: AI impacts and database foundations

**Syllabus:** Sections 7.1, 8.1

**Assessment objectives:** AO1, AO2

**Coverage:** Lessons 076-080

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. State one social benefit and one social risk of an AI medical-triage system. **[2]**
2. Explain one environmental cost of training a large AI model. **[2]**
3. State two functions of a DBMS. **[2]**
4. Give one disadvantage of a flat file when the same customer is stored in many orders. **[2]**
5. Distinguish a record from a field. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **B1** valid benefit such as faster prioritisation/decision support
- **B1** valid risk such as biased decisions, opacity or unsafe error

**Guidance:** Do not award generic 'AI is good/bad'.

#### Q2 [2]

- **B1** requires substantial electricity/computing/cooling resources
- **B1** may increase carbon emissions/water use depending on energy and data centre

**Guidance:** Do not accept only 'uses computers'.

#### Q3 [2]

- **B1** one valid function such as data definition/query/security/integrity/backup
- **B1** a second distinct DBMS function

**Guidance:** Do not award a repeated wording of storage.

#### Q4 [2]

- **B1** customer data is duplicated
- **B1** updates may create inconsistency/anomalies

**Guidance:** Do not accept only 'the file is flat'.

#### Q5 [2]

- **B1** record stores all attributes for one entity occurrence
- **B1** field stores one attribute/property value

**Guidance:** Allow tuple/attribute synonyms.

---

## Quiz after Lesson 085: Relational design and SQL

**Syllabus:** Sections 8.1, 8.2, 8.3

**Assessment objectives:** AO1, AO2

**Coverage:** Lessons 081-085

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. State the purpose of a primary key and a foreign key. **[2]**
2. In an ER model, identify the relationship between one Customer and many Orders. **[2]**
3. Explain how third normal form reduces update problems. **[2]**
4. Write SQL to display Name from Student where Mark is at least 50. **[2]**
5. Write SQL to output each Department and its average Salary. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **B1** primary key uniquely identifies each record
- **B1** foreign key references a key in a related table

**Guidance:** Do not require foreign-key values to be unique.

#### Q2 [2]

- **B1** one-to-many relationship
- **B1** Customer key is referenced as a foreign key in Order

**Guidance:** Do not reverse the one and many sides.

#### Q3 [2]

- **B1** non-key attributes depend on the key, whole key and not another non-key attribute
- **B1** facts are stored once so an update does not leave conflicting copies

**Guidance:** Do not award only 'removes duplicates'.

#### Q4 [2]

- **B1** SELECT Name FROM Student
- **B1** WHERE Mark >= 50

**Guidance:** Ignore case and harmless formatting.

#### Q5 [2]

- **B1** SELECT Department, AVG(Salary) FROM Employee
- **B1** GROUP BY Department

**Guidance:** Do not accept ORDER BY as a substitute for GROUP BY.

---

## Quiz after Lesson 090: Database operations and Paper 1 integration

**Syllabus:** Sections 1-8

**Assessment objectives:** AO1, AO2

**Coverage:** Lessons 086-090

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. Write the JOIN condition linking Student.CourseID to Course.CourseID. **[2]**
2. Write DDL to add an Email field of type VARCHAR(80) to Student. **[2]**
3. State one database validation control and one database security control. **[2]**
4. Convert 3 MiB to bytes. **[2]**
5. A packet travels from a classroom LAN to a remote server. State the different forwarding roles of the switch and router. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **B1** uses Student.CourseID = Course.CourseID
- **B1** places condition in a valid JOIN ... ON or equivalent syllabus-supported form

**Guidance:** Do not join unrelated fields.

#### Q2 [2]

- **B1** ALTER TABLE Student
- **B1** ADD Email VARCHAR(80) or equivalent valid DDL

**Guidance:** Do not award UPDATE, which changes record data.

#### Q3 [2]

- **B1** valid rule such as range/type/format/presence
- **B1** valid control such as access rights/encryption/authentication

**Guidance:** Do not count the same mechanism twice.

#### Q4 [2]

- **M1** 3 x 2^20
- **A1** 3145728 bytes

**Guidance:** Do not use decimal MB.

#### Q5 [2]

- **B1** switch forwards the local frame using MAC information
- **B1** router forwards the packet between networks using IP addresses

**Guidance:** Award both marks only for correctly attributed roles.

---

## Quiz after Lesson 095: Paper 1 mixed retrieval

**Syllabus:** Sections 3-8

**Assessment objectives:** AO1, AO2

**Coverage:** Lessons 091-095

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. Explain why cache memory can reduce CPU waiting time. **[2]**
2. State the purposes of PC and CIR. **[2]**
3. State one process-management and one security-management OS responsibility. **[2]**
4. Explain one ethical safeguard for an automated recruitment system. **[2]**
5. Explain referential integrity for Loan.MemberID referencing Member.MemberID. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **B1** stores frequently/recently used data or instructions close to CPU
- **B1** cache hit avoids slower main-memory access

**Guidance:** Do not accept only 'cache is fast'.

#### Q2 [2]

- **B1** PC holds address of next instruction
- **B1** CIR holds the current fetched instruction

**Guidance:** Do not swap next and current.

#### Q3 [2]

- **B1** scheduling/process-state/CPU allocation responsibility
- **B1** authentication/access rights/audit responsibility

**Guidance:** Do not award hardware components.

#### Q4 [2]

- **B1** valid safeguard such as bias audit, human review or appeal
- **B1** links safeguard to reducing unfair exclusion/accountability risk

**Guidance:** Do not award a safeguard without its mechanism.

#### Q5 [2]

- **B1** each non-null foreign-key value must match an existing Member key
- **B1** prevents a loan referring to a non-existent member

**Guidance:** Do not state that MemberID must be unique in Loan.

---

## Quiz after Lesson 100: Paper 1 response skills and algorithm foundations

**Syllabus:** Sections 1-9

**Assessment objectives:** AO1, AO2, AO3

**Coverage:** Lessons 096-100

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. For an 8-mark evaluate question, state two features required beyond listing facts. **[2]**
2. State one correction action after a mock-paper misconception is identified. **[2]**
3. Complete an identifier-table row for Count, used to store the number of valid inputs. **[2]**
4. Distinguish decomposition from abstraction. **[2]**
5. Name the flowchart symbols for a decision and input/output. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **B1** applies developed benefits/risks to the stated scenario
- **B1** reaches a justified judgement that uses the stated scenario evidence or conditions

**Guidance:** Do not award 'write more'.

#### Q2 [2]

- **B1** rewrites the technical statement using the correct syllabus concept
- **B1** re-attempts/marks a related question to prove the correction

**Guidance:** Do not accept only 'read the notes'.

#### Q3 [2]

- **B1** data type INTEGER
- **B1** purpose states number/count of valid inputs

**Guidance:** Allow another meaningful identifier only if purpose and type match.

#### Q4 [2]

- **B1** decomposition breaks a problem into smaller subproblems
- **B1** abstraction removes irrelevant detail/focuses on essential features

**Guidance:** Do not define both as simplification without distinction.

#### Q5 [2]

- **B1** decision is a diamond
- **B1** input/output is a parallelogram

**Guidance:** Both shape names are required.

---

## Quiz after Lesson 105: Tracing, control and standard algorithms

**Syllabus:** Sections 9.1, 9.2

**Assessment objectives:** AO2, AO3

**Coverage:** Lessons 101-105

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. State two columns needed in a trace table for Total <- Total + Value[Index]. **[2]**
2. Choose WHILE or REPEAT for input that must occur at least once and justify. **[2]**
3. Write the valid-range condition for Mark from 0 to 100 inclusive. **[2]**
4. Trace zero-based linear search for 9 in [4,9,2] and state the returned index. **[2]**
5. After one ascending bubble-sort pass through [5,2,4,1], state the list. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **B1** Index/current element column
- **B1** Total column showing its value after each update

**Guidance:** Allow Value[Index] as a separate valid column when Index is implicit.

#### Q2 [2]

- **B1** REPEAT
- **B1** condition is tested after the body so input occurs at least once

**Guidance:** Allow WHILE only when initial input is correctly placed before the loop.

#### Q3 [2]

- **B1** Mark >= 0
- **B1** AND Mark <= 100

**Guidance:** Do not accept OR for the valid condition.

#### Q4 [2]

- **M1** compares 4 then 9 and stops
- **A1** index 1

**Guidance:** Do not return position 2 unless one-based indexing is declared.

#### Q5 [2]

- **M1** performs the adjacent comparisons/swaps consistently
- **A1** [2,4,1,5]

**Guidance:** Allow FT from the candidate's earlier incorrect list only when every subsequent comparison remains adjacent and follows ascending bubble sort.

---

## Quiz after Lesson 110: Algorithm patterns and pseudocode quality

**Syllabus:** Sections 9.2

**Assessment objectives:** AO2, AO3

**Coverage:** Lessons 106-110

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. State suitable initial values for finding the maximum and total of Array[1:10]. **[2]**
2. Write pseudocode to output the first three characters of a string Text. **[2]**
3. Explain why a nested loop is suitable for processing every cell in a table. **[2]**
4. State one reason binary search is normally more efficient than linear search on a large sorted list. **[2]**
5. Correct the Java assignment total = total + value; into Cambridge pseudocode. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **B1** Maximum <- Array[1]
- **B1** Total <- 0

**Guidance:** Do not initialise Maximum to 0 unless the data range guarantees it is valid.

#### Q2 [2]

- **B1** uses a loop/substring operation covering positions 1 to 3
- **B1** outputs Text[Index] or a valid extracted substring

**Guidance:** Allow zero-based bounds only when explicitly declared.

#### Q3 [2]

- **B1** one loop iterates rows and the other iterates columns
- **B1** each row-column pair/cell is visited systematically

**Guidance:** Do not accept only 'there are two dimensions'.

#### Q4 [2]

- **B1** each comparison discards approximately half the remaining items
- **B1** therefore far fewer comparisons are required as size grows

**Guidance:** Do not omit the sorted-list condition.

#### Q5 [2]

- **B1** uses assignment operator <-
- **A1** Total <- Total + Value

**Guidance:** Do not retain Java equals as assignment.

---

## Quiz after Lesson 115: Refinement, data types and arrays

**Syllabus:** Sections 9, 10.1, 10.2

**Assessment objectives:** AO2, AO3

**Coverage:** Lessons 111-115

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. Refine PROCESS RESULTS into two suitable lower-level steps for a marks program. **[2]**
2. State one check to perform when reviewing a complete algorithm against its requirements. **[2]**
3. Choose INTEGER, REAL or STRING for storing 18.75 and justify. **[2]**
4. Distinguish a constant from a variable. **[2]**
5. For Mark : ARRAY[1:20] OF INTEGER, state the lower bound and number of elements. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **B1** one valid calculation step such as total/mean/maximum
- **B1** a second distinct ordered processing/output step

**Guidance:** Do not award two labels with no executable meaning.

#### Q2 [2]

- **B1** valid check such as every input/output/constraint is handled
- **B1** explains how trace/test evidence confirms the requirement

**Guidance:** Do not accept only 'check it works'.

#### Q3 [2]

- **B1** REAL
- **B1** value contains a fractional component

**Guidance:** Do not award STRING unless arithmetic is explicitly unnecessary and justified.

#### Q4 [2]

- **B1** constant value is fixed during execution
- **B1** variable value may change during execution

**Guidance:** Do not define only by identifier spelling.

#### Q5 [2]

- **B1** lower bound 1
- **B1** 20 elements

**Guidance:** Do not state 19 elements by subtracting bounds without adding one.

---

## Quiz after Lesson 120: Arrays, records and files

**Syllabus:** Sections 10.2, 10.3

**Assessment objectives:** AO2, AO3

**Coverage:** Lessons 116-120

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. State the indexes of the top-left and bottom-right cells in Grid[1:3,1:4]. **[2]**
2. Write one statement to add 1 to the occurrence count stored at Count[Index]. **[2]**
3. Distinguish a record from an array. **[2]**
4. State one advantage of an array of records for storing 100 students. **[2]**
5. Distinguish WRITE mode from APPEND mode for a text file. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **B1** top-left Grid[1,1]
- **B1** bottom-right Grid[3,4]

**Guidance:** Do not reverse row and column bounds.

#### Q2 [2]

- **B1** references Count[Index] consistently
- **A1** Count[Index] <- Count[Index] + 1

**Guidance:** Do not increment Index instead of the array element.

#### Q3 [2]

- **B1** record groups named fields that may have different types
- **B1** array stores indexed elements of one declared type

**Guidance:** Award a matched contrast.

#### Q4 [2]

- **B1** each element keeps related fields for one student together
- **B1** keeping each student's fields in one record reduces the risk of fields for different students becoming misaligned

**Guidance:** Do not accept only 'stores more data'.

#### Q5 [2]

- **B1** WRITE creates/overwrites content from the start
- **B1** APPEND adds after existing content

**Guidance:** Do not state that APPEND edits any middle record.

---

## Quiz after Lesson 125: Structured files and abstract data types

**Syllabus:** Sections 10.3, 10.4

**Assessment objectives:** AO2, AO3

**Coverage:** Lessons 121-125

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. State two requirements when reading a CSV record containing Name,Age. **[2]**
2. Choose a stack or queue for printer jobs and justify. **[2]**
3. State the two fields required in an array-based linked-list node. **[2]**
4. Choose an array or linked list for frequent insertion between playlist items and justify. **[2]**
5. Convert Java declaration int[] Mark = new int[20]; into a Cambridge-style array declaration using indexes 1 to 20. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **B1** splits/parses fields using the delimiter in the expected order
- **B1** converts Age to the required numeric type/validates it

**Guidance:** Do not treat the whole line as two fields without parsing.

#### Q2 [2]

- **B1** queue
- **B1** FIFO processes the earliest submitted job first

**Guidance:** Do not award stack without a changed scenario.

#### Q3 [2]

- **B1** data/value field
- **B1** next index/pointer field

**Guidance:** Allow parallel arrays or an array of records.

#### Q4 [2]

- **B1** linked list
- **B1** links can be changed without shifting all later contiguous elements

**Guidance:** Do not award the structure without an insertion-related reason.

#### Q5 [2]

- **B1** DECLARE Mark : ARRAY[1:20]
- **A1** OF INTEGER

**Guidance:** Do not retain Java allocation syntax.

---

## Quiz after Lesson 130: Programming constructs and subroutines

**Syllabus:** Sections 11.1, 11.2

**Assessment objectives:** AO2, AO3

**Coverage:** Lessons 126-130

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. Write an IF condition that outputs Adult when Age is at least 18. **[2]**
2. Choose CASE or nested IF for selecting one action from exact menu values 1 to 5 and justify. **[2]**
3. Write the Cambridge pseudocode delimiters for a loop that repeats Index from 1 to 10. **[2]**
4. Explain one difference between WHILE and REPEAT loops. **[2]**
5. Distinguish a procedure from a function. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **B1** IF Age >= 18 THEN
- **B1** OUTPUT 'Adult' and closes with ENDIF

**Guidance:** Do not use assignment in the condition.

#### Q2 [2]

- **B1** CASE
- **B1** several discrete exact values map clearly to separate branches

**Guidance:** Allow IF only with a developed reason based on ranges/compound conditions.

#### Q3 [2]

- **B1** FOR Index <- 1 TO 10
- **B1** NEXT Index

**Guidance:** Do not retain Java semicolon clauses.

#### Q4 [2]

- **B1** WHILE tests before its body and may run zero times
- **B1** REPEAT tests after its body and runs at least once

**Guidance:** Do not accept only different keywords.

#### Q5 [2]

- **B1** function returns a value
- **B1** procedure performs a named action and need not return a value

**Guidance:** Do not rely only on example names.

---

## Quiz after Lesson 135: Parameters, scope and expressions

**Syllabus:** Sections 11.2, 11.3

**Assessment objectives:** AO2, AO3

**Coverage:** Lessons 131-135

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. Explain the effect of passing parameter X by reference. **[2]**
2. State one benefit of using a local variable instead of a global variable. **[2]**
3. State the result of LENGTH('CODE') and the first character using Cambridge string indexing. **[2]**
4. State the results of 17 DIV 5 and 17 MOD 5. **[2]**
5. Write pseudocode to input Length and Width and output their product. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **B1** formal parameter aliases/refers to the caller variable
- **B1** assignment to X changes the caller's value

**Guidance:** Do not accept only 'it is faster'.

#### Q2 [2]

- **B1** visible/usable only within its subroutine/block
- **B1** reduces unintended side effects/name conflicts

**Guidance:** Do not state that local values are shared by every module.

#### Q3 [2]

- **B1** LENGTH is 4
- **B1** first character is 'C' using the syllabus convention

**Guidance:** Allow an explicitly stated alternative indexing convention only when consistent.

#### Q4 [2]

- **B1** 17 DIV 5 = 3
- **B1** 17 MOD 5 = 2

**Guidance:** Both operators must be matched correctly.

#### Q5 [2]

- **B1** INPUT Length and INPUT Width
- **B1** OUTPUT Length * Width or assigned Area

**Guidance:** Do not award Java input/output APIs.

---

## Quiz after Lesson 140: Files, testing and robust programs

**Syllabus:** Sections 11.1, 11.2, 11.3

**Assessment objectives:** AO2, AO3

**Coverage:** Lessons 136-140

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. Write the first and last commands for reading Data.txt. **[2]**
2. Give one boundary and one abnormal value for an integer Age allowed from 16 to 65. **[2]**
3. State how a breakpoint and single-step execution support debugging. **[2]**
4. Write the valid-range condition for Score from 0 to 100 inclusive. **[2]**
5. Convert while (Count < 10) { Count++; } into Cambridge pseudocode. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **B1** OPENFILE 'Data.txt' FOR READ
- **B1** CLOSEFILE 'Data.txt'

**Guidance:** Both commands must name the same file.

#### Q2 [2]

- **B1** boundary value such as 16 or 65
- **B1** abnormal value outside range or wrong type

**Guidance:** Examples must match their labels.

#### Q3 [2]

- **B1** breakpoint pauses execution at a chosen statement
- **B1** single-step executes one statement while variables/flow are inspected

**Guidance:** Do not describe syntax highlighting only.

#### Q4 [2]

- **B1** Score >= 0
- **B1** AND Score <= 100

**Guidance:** Do not accept OR for the valid condition.

#### Q5 [2]

- **B1** WHILE Count < 10 DO; Count <- Count + 1
- **B1** ENDWHILE

**Guidance:** Do not retain braces or ++.

---

## Quiz after Lesson 145: Software development and testing

**Syllabus:** Sections 11, 12

**Assessment objectives:** AO2, AO3

**Coverage:** Lessons 141-145

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. State one check to perform when reviewing a complete Section 11 program fragment. **[2]**
2. Give one advantage and one disadvantage of the waterfall model. **[2]**
3. Distinguish a functional requirement from a success criterion. **[2]**
4. Distinguish a structure chart from a state-transition diagram. **[2]**
5. State the purposes of a stub and acceptance testing. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **B1** valid check such as initialisation/bounds/construct closure/output position
- **B1** explains the error that the check prevents

**Guidance:** Do not accept only 'check it works'.

#### Q2 [2]

- **B1** clear sequential stages/documentation suit stable requirements
- **B1** late change is difficult/costly

**Guidance:** Do not award two advantages or two disadvantages.

#### Q3 [2]

- **B1** functional requirement states what the system must do
- **B1** success criterion is a measurable condition used to judge the solution

**Guidance:** Do not define both as user wishes.

#### Q4 [2]

- **B1** structure chart shows module hierarchy/calls and parameters
- **B1** state diagram shows states and event/condition transitions

**Guidance:** Do not accept that both are flowcharts.

#### Q5 [2]

- **B1** stub simulates a called module not yet available
- **B1** acceptance testing checks with customer/user that requirements are met

**Guidance:** Do not confuse a stub with test data.

---

## Quiz after Lesson 150: Paper 2 integrated review

**Syllabus:** Sections 9, 10, 11, 12

**Assessment objectives:** AO2, AO3

**Coverage:** Lessons 146-150

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. State one reason stepwise refinement improves a complex algorithm. **[2]**
2. Choose an ADT for undo history and justify. **[2]**
3. Write a procedure call that passes Total by reference to UpdateTotal. **[2]**
4. State two fields in a test-plan record besides test data. **[2]**
5. A trace gives the wrong maximum for all-negative data. State the likely initialisation error and correction. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

- **B1** breaks a high-level task into precise manageable subproblems
- **B1** supports independent implementation/testing or clearer logic

**Guidance:** Do not accept only 'makes it shorter'.

#### Q2 [2]

- **B1** stack
- **B1** LIFO removes the most recent action first

**Guidance:** Do not award queue.

#### Q3 [2]

- **B1** uses CALL UpdateTotal with Total as argument
- **B1** declaration/interface identifies the corresponding parameter as BYREF

**Guidance:** Allow equivalent Cambridge procedure-call notation.

#### Q4 [2]

- **B1** one valid field such as test ID/purpose/expected result
- **B1** a second distinct field such as actual result/pass-fail

**Guidance:** Do not repeat input data in different words.

#### Q5 [2]

- **B1** Maximum was incorrectly initialised to 0
- **B1** initialise Maximum to the first array value and process the remainder

**Guidance:** Do not accept only 'use a smaller number'.
