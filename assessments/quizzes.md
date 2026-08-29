# Short Quizzes

Use one quiz every 4-5 lessons. Each quiz is designed for 8-10 minutes and carries 10 marks.

All questions are original Cambridge-style practice, not copied past-paper questions. Wording and marking guidance are calibrated against the [official Cambridge 9618 past-papers and mark-schemes page](https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/past-papers/) and the [2027-2029 syllabus](https://www.cambridgeinternational.org/Images/721397-2027-2029-syllabus.pdf).

## Marking conventions

- Each listed answer point is worth 1 mark unless stated otherwise.
- Follow-through is allowed only where the Guidance explicitly permits it.
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

1. Calculate 2 MiB in bytes. **[2]**
2. Convert binary 10110110 to denary. **[2]**
3. Convert hexadecimal 9F to denary. **[2]**
4. Calculate the sum of 11110000 and 00110000. State why the result cannot be stored in eight unsigned bits. **[2]**
5. Write -18 as an 8-bit two's-complement value. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| 2 x 1024 x 1024 | Do not accept decimal MB conversion. | 1 |
| 2097152 bytes |  | 1 |

#### Q2 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| 128 + 32 + 16 + 4 + 2 | Allow any correct place-value working. | 1 |
| 182 |  | 1 |

#### Q3 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| 9 x 16 + 15 | Do not interpret F as a decimal digit. | 1 |
| 159 |  | 1 |

#### Q4 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| obtains 1 00100000 / denary 288 | Do not accept only 'the answer is too long'. | 1 |
| carry creates a ninth bit / value exceeds 255, so overflow occurs |  | 1 |

#### Q5 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| 18 = 00010010; invert and add 1 | Do not accept sign-and-magnitude 10010010. | 1 |
| 11101110 |  | 1 |

---

## Quiz after Lesson 010: Codes, graphics and sound

**Syllabus:** Sections 1.1, 1.2

**Assessment objectives:** AO1, AO2

**Coverage:** Lessons 006-010

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. Write denary 59 in BCD and state one reason BCD is used in a digital clock. **[2]**
2. Explain one reason Unicode is used instead of ASCII for a worldwide messaging system. **[2]**
3. A 100 x 50 bitmap uses 8-bit colour depth. Calculate its pixel data in bytes and state whether a bitmap file header is included. **[2]**
4. A bitmap has 20,000 bytes of pixel data and a supplied 54-byte header. Calculate the total uncompressed size and state what the header stores. **[2]**
5. Compare sampling rate from sampling resolution. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| 59 is encoded as separate denary digits: 0101 1001 | Do not accept pure binary 00111011 or an application without the digit-to-group link. | 1 |
| each displayed denary digit maps directly to one four-bit BCD group |  | 1 |

#### Q2 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| Unicode represents a much larger range of characters/scripts | Do not accept only 'Unicode uses more bits'. | 1 |
| users can store/display characters from many languages consistently |  | 1 |

#### Q3 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| 100 x 50 x 8 bits, then divides by 8 to obtain 5000 bytes | Do not add an invented header size. Award the calculation method and the correct header boundary. | 1 |
| the header is not included unless the question supplies its size; it stores metadata separately from pixel data |  | 1 |

#### Q4 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| 20,054 bytes | Do not multiply the header by the number of pixels or omit the supplied header. | 1 |
| the header stores metadata needed to interpret the bitmap, separate from pixel values |  | 1 |

#### Q5 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| sampling rate is samples taken per second | Do not reverse time frequency and amplitude precision. | 1 |
| sampling resolution is bits/levels used for each sample amplitude |  | 1 |

---

## Quiz after Lesson 015: Multimedia size and compression

**Syllabus:** Sections 1.2, 1.3

**Assessment objectives:** AO1, AO2

**Coverage:** Lessons 011-015

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. Calculate the uncompressed size in bits of 2 s mono audio sampled at 8000 Hz with 8-bit resolution. **[2]**
2. Suggest a compression type for program source code and justify the choice. **[2]**
3. Write the run-length encoding of AAAAABBCC using symbol-count pairs. **[2]**
4. Suggest bitmap or vector storage for a scalable school logo and give one reason. **[2]**
5. A candidate says increasing colour depth reduces bitmap size. Write a corrected version of the claim. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| 8000 x 8 x 2 | Award the answer mark only with the correct unit. | 1 |
| 128000 bits |  | 1 |

#### Q2 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| lossless compression | Do not accept only 'lossy has lower quality'. | 1 |
| every character must be reconstructed exactly to preserve syntax/behaviour |  | 1 |

#### Q3 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| identifies runs 5A, 2B and 2C | Allow count-symbol order when used consistently. | 1 |
| A5 B2 C2 or an explicitly stated equivalent pair order |  | 1 |

#### Q4 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| vector | Do not accept only 'vector is better quality'. | 1 |
| objects can be recalculated at new sizes without pixelation |  | 1 |

#### Q5 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| increasing colour depth uses more bits per pixel | Do not award a correction that changes image dimensions instead. | 1 |
| with dimensions unchanged, uncompressed pixel data increases |  | 1 |

---

## Quiz after Lesson 020: Networks, packets and addressing

**Syllabus:** Sections 2.1

**Assessment objectives:** AO1, AO2

**Coverage:** Lessons 016-020

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. Compare a LAN from a WAN. **[2]**
2. State one feature of a thin client and one feature of a thick client. **[2]**
3. In a star topology, state the path taken by a frame between two hosts and one failure consequence. **[2]**
4. Describe what an Ethernet station does after CSMA/CD detects a collision. **[2]**
5. Explain why a public web server normally uses a static public IP address. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| LAN covers a limited local area under one organisation's control | Do not define the difference only by speed. | 1 |
| WAN connects networks over a large geographical area using external links |  | 1 |

#### Q2 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| thin client depends mainly on server processing/storage | Allow equivalent client-server wording. | 1 |
| thick client performs substantial local processing/storage |  | 1 |

#### Q3 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| the frame passes from the source through the central switch to the destination | Do not accept only 'star has a centre'; require the transmission path and a failure consequence. | 1 |
| failure of the central switch stops attached communication, while one device cable failure normally affects only that device |  | 1 |

#### Q4 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| stops transmitting and waits for a random backoff | Do not describe collision avoidance as the detection method. | 1 |
| senses the medium and retries when it is available |  | 1 |

#### Q5 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| public address makes it reachable from other networks/the internet | Do not claim a public address alone guarantees security. | 1 |
| static address provides a stable destination for DNS/client requests |  | 1 |

---

## Quiz after Lesson 025: Protocols, media and internet services

**Syllabus:** Sections 2.1

**Assessment objectives:** AO1, AO2

**Coverage:** Lessons 021-025

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. State the role of a modem and one reason a business may choose a dedicated line instead of a cell phone network. **[2]**
2. Give one advantage of fibre-optic cable over copper and explain its cause. **[2]**
3. Compare a switch from a router. **[2]**
4. Compare the World Wide Web from the internet. **[2]**
5. Compare real-time bit streaming from on-demand bit streaming. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| modem converts data/signals for the access-link signalling | Do not describe a modem as simply a router or wireless access point. | 1 |
| dedicated line gives a permanent or more predictable connection, while cellular signal/coverage is shared or variable |  | 1 |

#### Q2 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| higher bandwidth/lower attenuation/no electromagnetic interference | Do not accept only 'fibre is faster'. | 1 |
| uses light rather than electrical signals |  | 1 |

#### Q3 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| switch forwards frames within a LAN using MAC/local information | Award both marks only for a matched contrast. | 1 |
| router forwards packets between networks using IP addresses |  | 1 |

#### Q4 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| internet is the global network infrastructure/interconnected networks | Do not state that the two terms are synonyms. | 1 |
| WWW is a service of linked web resources accessed over the internet |  | 1 |

#### Q5 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| real-time streaming carries live content with minimal delay | Do not define the distinction only as fast versus slow playback. | 1 |
| on-demand streaming sends stored content selected by the user |  | 1 |

---

## Quiz after Lesson 030: Computer components and primary memory

**Syllabus:** Sections 3.1

**Assessment objectives:** AO1, AO2

**Coverage:** Lessons 026-030

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. State why primary memory and removable secondary storage are both needed in a portable computer. **[2]**
2. State two principal stages in the operation of a laser printer. **[2]**
3. Explain why a printer buffer is needed when the CPU supplies data faster than the printer outputs it. **[2]**
4. Compare RAM from ROM using volatility. **[2]**
5. Explain why SRAM is suitable for cache while DRAM is suitable for main memory. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| primary memory holds instructions/data currently in use by the processor | Do not treat removable storage as volatile working memory. | 1 |
| removable secondary storage provides non-volatile transfer or a detachable/offline backup |  | 1 |

#### Q2 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| charged drum is selectively discharged by a laser / electrostatic image is formed | Do not describe liquid ink or an inkjet print head. | 1 |
| toner is transferred to paper and fused using heat/pressure |  | 1 |

#### Q3 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| temporarily stores pending output data | Do not describe the buffer as permanent backup storage. | 1 |
| allows devices with different operating rates to work without the CPU waiting for every character/page |  | 1 |

#### Q4 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| RAM is volatile and loses contents without power | Do not accept that ROM can never be reprogrammed. | 1 |
| ROM is non-volatile and retains contents without power |  | 1 |

#### Q5 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| SRAM is faster/does not require refresh | Do not accept that DRAM is faster than SRAM. | 1 |
| DRAM is denser/cheaper per bit for larger capacity |  | 1 |

---

## Quiz after Lesson 035: Storage, embedded systems and logic

**Syllabus:** Sections 3.1, 3.2

**Assessment objectives:** AO1, AO2

**Coverage:** Lessons 031-035

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. State how flash memory stores data and why it is mechanically robust. **[2]**
2. State one characteristic used to compare storage devices and explain its relevance to video files. **[2]**
3. State one benefit and one drawback of using an embedded controller in a washing machine. **[2]**
4. Suggest sensors for (a) detecting a warm body at night and (b) detecting a loud alarm sound. **[2]**
5. State the XOR output for inputs 0,0 and 0,1. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| stores electrical charge in floating-gate cells | Do not describe flash storage as magnetic. | 1 |
| electronic access/no moving parts gives resistance to mechanical shock |  | 1 |

#### Q2 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| valid characteristic such as capacity/read-write speed/cost | Do not award an unexplained adjective such as 'good'. | 1 |
| links characteristic to storing or recording large video data |  | 1 |

#### Q3 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| valid developed benefit such as low-power/predictable automatic control for the wash cycle | Do not award bare words such as 'cheap' or 'small' without a washing-machine consequence. | 1 |
| valid developed drawback such as limited new functions or controller failure stopping the machine |  | 1 |

#### Q4 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| infra-red sensor for the warm body | Do not substitute a light-intensity sensor for either required sensor type. | 1 |
| sound sensor/microphone sensor for the alarm |  | 1 |

#### Q5 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| 0 for inputs 0,0 | Answers must be in the stated order. | 1 |
| 1 for inputs 0,1 |  | 1 |

---

## Quiz after Lesson 040: Logic circuits and hardware decisions

**Syllabus:** Sections 3.1, 3.2

**Assessment objectives:** AO1, AO2

**Coverage:** Lessons 036-040

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. For X = (A OR B) AND NOT C, calculate X when A=0, B=1 and C=0. **[2]**
2. A two-input truth table gives output 1 only for A=1, B=0. Write the Boolean expression and state the gate sequence. **[2]**
3. Suggest laser or inkjet printing for 5000 monochrome office pages each week and give one reason. **[2]**
4. Explain one environmental consequence of replacing computers frequently. **[2]**
5. Compare monitoring from control in a sensor system. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| A OR B = 1 and NOT C = 1 | Award the final mark only for a consistent final AND operation. | 1 |
| X = 1 |  | 1 |

#### Q2 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| Q = A AND NOT B or an equivalent standard-symbol expression | Do not accept XOR because XOR also outputs 1 for A=0, B=1. | 1 |
| B feeds NOT; A and NOT B feed an AND gate |  | 1 |

#### Q3 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| laser printer | Do not award the device without a workload-linked reason. | 1 |
| fast/high-volume output or lower cost per page in this workload |  | 1 |

#### Q4 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| more electronic waste/resource extraction/energy in manufacture | Do not accept only 'bad for the environment'. | 1 |
| develops a consequence such as toxic disposal or increased emissions |  | 1 |

#### Q5 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| monitoring records/displays readings | Do not state that every monitored system has an actuator. | 1 |
| control uses readings to change an actuator/system state |  | 1 |

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
3. Explain the stored-program concept in the basic Von Neumann architecture. **[2]**
4. State which of USB, HDMI and VGA suits each use: a keyboard that also receives power, one-cable digital video/audio, and a legacy analogue display. **[2]**
5. Explain why machine code is processor dependent and how an assembler uses the instruction set when translating a mnemonic. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| ALU performs arithmetic/logic operations | Do not assign instruction decoding to the ALU. | 1 |
| control unit decodes instructions and coordinates control signals |  | 1 |

#### Q2 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| MAR <- PC | Allow PC increment between the stated transfers. | 1 |
| CIR <- MDR after the memory read |  | 1 |

#### Q3 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| program instructions are stored in memory in binary form alongside data | Do not accept only that a computer stores programs; the shared instruction/data memory and fetch relationship are required. | 1 |
| the processor fetches instructions from that shared memory for decoding and execution |  | 1 |

#### Q4 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| USB for the keyboard/data-and-power connection; HDMI for digital video and audio | Do not treat VGA as digital audio or use connector shape alone as the reason. | 1 |
| VGA for the legacy analogue video connection |  | 1 |

#### Q5 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| machine-code opcodes/formats belong to a specific processor instruction set, so another processor may decode them differently or not support them | Do not describe machine code as a universal representation shared by every processor. | 1 |
| the assembler maps the mnemonic and operands to the opcode/format defined by that instruction set |  | 1 |

---

## Quiz after Lesson 050: Assembly, interrupts and bit manipulation

**Syllabus:** Sections 4.2, 4.3

**Assessment objectives:** AO1, AO2

**Coverage:** Lessons 046-050

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. State one task completed in each pass of a two-pass assembler. **[2]**
2. Memory[507] = 42. Trace LDX 500 when IX = 7; state the indexed effective address and the final ACC value. **[2]**
3. Identify IN, Calculate the sum of, JMP and JPN by instruction group. **[2]**
4. Compare an 8-bit arithmetic right shift from a cyclic right shift. **[2]**
5. Use a bitwise operation and mask to set bit 2 of an 8-bit value, using bit 0 as the rightmost bit. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| pass 1 assigns addresses/builds the symbol table | Do not state that either pass executes the program. | 1 |
| pass 2 translates instructions using resolved labels |  | 1 |

#### Q2 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| indexed effective address = operand/base 500 + IX 7 = 507 | Do not stop at the effective address or dereference it more than once. | 1 |
| LDX loads Memory[507], so ACC becomes 42 |  | 1 |

#### Q3 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| IN is input/output and ADD is arithmetic | Do not award either mark unless both classifications in that pair are correct; JPN is not a negative-status test. | 1 |
| JMP is an unconditional branch and JPN is a conditional branch/compare instruction |  | 1 |

#### Q4 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| arithmetic right shift copies the sign bit into the leftmost position and discards the rightmost bit | Do not describe either operation as a logical right shift. | 1 |
| cyclic right shift rotates the rightmost bit into the leftmost position, so no bit is discarded |  | 1 |

#### Q5 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| uses OR | Allow another bit-number convention only when explicitly stated. | 1 |
| mask 00000100 |  | 1 |

---

## Quiz after Lesson 055: Operating systems and utilities

**Syllabus:** Sections 5.1

**Assessment objectives:** AO1, AO2

**Coverage:** Lessons 051-055

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. State one process-management and one memory-management role of an operating system. **[2]**
2. Suggest a command-line or graphical interface for an expert repeatedly running scripted backups and justify. **[2]**
3. Compare backup from compression. **[2]**
4. Explain why an HDD defragmenter should not normally be used to improve SSD access time. **[2]**
5. State one purpose of a disk formatter and one purpose of a disk contents analysis/repair utility. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| schedules/allocates CPU time or manages process states | Do not award application-software functions. | 1 |
| allocates/protects RAM or manages virtual memory |  | 1 |

#### Q2 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| command-line interface | Allow GUI only with a comparably developed scenario reason. | 1 |
| commands can be scripted/automated efficiently for repeated expert use |  | 1 |

#### Q3 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| backup creates a separate recoverable copy | Do not accept compression alone as protection against deletion. | 1 |
| compression reduces storage/transmission size |  | 1 |

#### Q4 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| SSD has no moving read head/does not seek between fragments | Do not accept only 'SSD is already fast'. | 1 |
| rewriting blocks adds wear without the HDD seek-time benefit |  | 1 |

#### Q5 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| formatter prepares a disk/partition with a file system for storing files | Do not substitute defragmentation, encryption or antivirus for either purpose. | 1 |
| analysis/repair checks disk/file-system structures for errors and repairs recoverable faults |  | 1 |

---

## Quiz after Lesson 060: Translators, libraries and development tools

**Syllabus:** Sections 5.2

**Assessment objectives:** AO1, AO2

**Coverage:** Lessons 056-060

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. Compare a compiler from an interpreter. **[2]**
2. State one IDE feature used to present code and one IDE feature used to debug code, explaining the effect of each. **[2]**
3. Explain one benefit and one risk of using a dynamically linked library. **[2]**
4. Compare a syntax error from a logic error. **[2]**
5. State the two main stages from Java source to execution. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| compiler translates the whole program and produces target/object code | Allow line-by-line as equivalent to statement-by-statement. | 1 |
| interpreter translates/executes statement by statement |  | 1 |

#### Q2 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| presentation: prettyprint formats indentation/layout or expand/collapse hides and reveals code sections | Do not accept a feature without its effect; award one presentation feature and one distinct debugging feature, not syntax highlighting alone. | 1 |
| debugging: breakpoint pauses at a chosen statement, single-step executes one statement at a time, or variable/expression/report windows show diagnostic values |  | 1 |

#### Q3 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| shared/reusable code reduces duplication or permits central update | Do not accept only 'more efficient'. | 1 |
| missing/incompatible library may stop execution/change behaviour |  | 1 |

#### Q4 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| syntax error breaks language grammar and prevents correct translation | Do not classify every runtime failure as a syntax error. | 1 |
| logic error translates/runs but produces an incorrect result |  | 1 |

#### Q5 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| Java compiler translates source to bytecode | Do not accept direct compilation to universal machine code. | 1 |
| JVM interprets/JIT-compiles bytecode for the host |  | 1 |

---

## Quiz after Lesson 065: Security threats and authentication

**Syllabus:** Sections 6.1

**Assessment objectives:** AO1, AO2

**Coverage:** Lessons 061-065

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. Compare confidentiality from integrity. **[2]**
2. Compare a virus from spyware. **[2]**
3. Explain how phishing obtains credentials. **[2]**
4. Give two authentication factors from different categories. **[2]**
5. Compare phishing from pharming. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| confidentiality prevents unauthorised disclosure/access | Do not define both only as 'keeping data safe'. | 1 |
| integrity preserves accurate, complete and authorised data |  | 1 |

#### Q2 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| virus attaches to a host file/program and spreads when the infected host is run or shared | Do not define both only as generic malware. | 1 |
| spyware secretly monitors activity or collects data such as keystrokes or credentials |  | 1 |

#### Q3 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| deceptive message/site impersonates a trusted source | Do not describe only automatic redirection without deception. | 1 |
| user is persuaded to enter or disclose genuine credentials |  | 1 |

#### Q4 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| one knowledge/possession/inherence factor | Two passwords count as one factor category. | 1 |
| a valid factor from a different category |  | 1 |

#### Q5 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| phishing uses a deceptive message/link/site to persuade a user to disclose information | Do not define both as only a fake email or fake website. | 1 |
| pharming redirects traffic to a fake site, possibly after the correct address is entered |  | 1 |

---

## Quiz after Lesson 070: Security controls and data integrity

**Syllabus:** Sections 6.1, 6.2

**Assessment objectives:** AO1, AO2

**Coverage:** Lessons 066-070

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. Explain the principle of least privilege. **[2]**
2. Compare encryption from hashing. **[2]**
3. Describe how a firewall decides whether to block a packet. **[2]**
4. Compare a range check from a limit check. **[2]**
5. Compare a parity check on one byte from block parity. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| user/process receives only permissions required for its role | Do not accept that every user should be an administrator. | 1 |
| limits damage or data exposure after error/account compromise |  | 1 |

#### Q2 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| encryption is reversible with the correct key for confidentiality | Do not state that a hash is decrypted. | 1 |
| hashing produces a one-way digest for comparison/integrity |  | 1 |

#### Q3 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| examines header/connection information such as address, port or protocol | Do not claim a firewall removes all malware. | 1 |
| compares it with configured rules and allows/blocks/logs accordingly |  | 1 |

#### Q4 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| range check applies both a lower and an upper bound | Do not describe a one-sided maximum as a two-bound range check. | 1 |
| limit check applies one stated upper or lower limit |  | 1 |

#### Q5 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| byte parity checks whether one received byte including its parity bit has the agreed odd/even parity | Do not merge byte and block parity into one unexplained parity check. | 1 |
| block parity checks parity across rows and columns of a block and can locate many single-bit errors |  | 1 |

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
3. Compare copyright from a patent in computing. **[2]**
4. State one software freedom promoted by the FSF and one role of the OSI. **[2]**
5. Compare shareware from commercial proprietary software. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| sets professional/ethical standards or supports practitioner competence | Do not award only the organisation's name. | 1 |
| guides accountable decisions/protects public interest |  | 1 |

#### Q2 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| reveals movements/routines beyond the necessary work purpose | Do not accept only the word 'privacy'. | 1 |
| may enable intrusive monitoring, misuse or loss of trust |  | 1 |

#### Q3 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| copyright protects expression such as source code automatically | Do not state that copyright protects every idea. | 1 |
| patent can protect a novel technical invention/method after grant |  | 1 |

#### Q4 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| freedom to run, study, modify or share software | Do not equate open source with public domain. | 1 |
| OSI defines/applies open-source criteria and approves licences |  | 1 |

#### Q5 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| shareware is distributed for trial/limited use before payment | Allow overlap when the trial distinction is explicit. | 1 |
| commercial proprietary use is granted under paid restrictive licence terms |  | 1 |

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
3. State the purpose of a developer interface and a query processor in a DBMS. **[2]**
4. Give one disadvantage of a flat file when the same customer is stored in many orders. **[2]**
5. Compare a candidate key from a secondary key. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| valid benefit such as faster prioritisation/decision support | Do not award generic 'AI is good/bad'. | 1 |
| valid risk such as biased decisions, opacity or unsafe error |  | 1 |

#### Q2 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| requires substantial electricity/computing/cooling resources | Do not accept only 'uses computers'. | 1 |
| may increase carbon emissions/water use depending on energy and data centre |  | 1 |

#### Q3 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| developer interface provides tools for defining structures or building database applications/forms/reports | Do not merge the two tools into one unexplained function. | 1 |
| query processor interprets/checks and carries out queries or maintenance statements |  | 1 |

#### Q4 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| customer data is duplicated | Do not accept only 'the file is flat'. | 1 |
| updates may create inconsistency/anomalies |  | 1 |

#### Q5 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| candidate key is a minimal field/set of fields that uniquely identifies a record | Do not describe a secondary key as an alternate candidate key. | 1 |
| secondary key is an additional retrieval field and need not be unique |  | 1 |

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
5. Write SQL using Employee and Department to display each employee Name with DepartmentName. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| primary key uniquely identifies each record | Do not require foreign-key values to be unique. | 1 |
| foreign key references a key in a related table |  | 1 |

#### Q2 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| one-to-many relationship | Do not reverse the one and many sides. | 1 |
| Customer key is referenced as a foreign key in Order |  | 1 |

#### Q3 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| non-key attributes depend on the key, whole key and not another non-key attribute | Do not award only 'removes duplicates'. | 1 |
| facts are stored once so an update does not leave conflicting copies |  | 1 |

#### Q4 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| SELECT Name FROM Student | Ignore case and harmless formatting. | 1 |
| WHERE Mark >= 50 |  | 1 |

#### Q5 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| SELECT Employee.Name, Department.DepartmentName FROM Employee INNER JOIN Department | Do not accept a three-table or comma-style join; require an explicit two-table INNER JOIN ... ON. | 1 |
| ON Employee.DepartmentID = Department.DepartmentID |  | 1 |

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
4. Calculate 3 MiB in bytes. **[2]**
5. A packet travels from a classroom LAN to a remote server. State the different forwarding roles of the switch and router. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| uses Student.CourseID = Course.CourseID | Do not join unrelated fields. | 1 |
| places condition in a valid JOIN ... ON or equivalent syllabus-supported form |  | 1 |

#### Q2 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| ALTER TABLE Student | Do not award UPDATE, which changes record data. | 1 |
| ADD Email VARCHAR(80) or equivalent valid DDL |  | 1 |

#### Q3 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| valid rule such as range/type/format/presence | Do not count the same mechanism twice. | 1 |
| valid control such as access rights/encryption/authentication |  | 1 |

#### Q4 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| 3 x 2^20 | Do not use decimal MB. | 1 |
| 3145728 bytes |  | 1 |

#### Q5 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| switch forwards the local frame using MAC information | Award both marks only for correctly attributed roles. | 1 |
| router forwards the packet between networks using IP addresses |  | 1 |

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

| Answer | Guidance | Marks |
|---|---|---:|
| stores frequently/recently used data or instructions close to CPU | Do not accept only 'cache is fast'. | 1 |
| cache hit avoids slower main-memory access |  | 1 |

#### Q2 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| PC holds address of next instruction | Do not swap next and current. | 1 |
| CIR holds the current fetched instruction |  | 1 |

#### Q3 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| scheduling/process-state/CPU allocation responsibility | Do not award hardware components. | 1 |
| authentication/access rights/audit responsibility |  | 1 |

#### Q4 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| valid safeguard such as bias audit, human review or appeal | Do not award a safeguard without its mechanism. | 1 |
| links safeguard to reducing unfair exclusion/accountability risk |  | 1 |

#### Q5 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| each non-null foreign-key value must match an existing Member key | Do not state that MemberID must be unique in Loan. | 1 |
| prevents a loan referring to a non-existent member |  | 1 |

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
3. State what an algorithm is. Then give a meaningful identifier for the number of valid inputs. **[2]**
4. A car-park model must calculate charges. State one essential detail to keep and one real-world detail to omit. **[2]**
5. Identify the control structure used to choose between paths and the control structure used to repeat steps. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| applies developed benefits/risks to the stated scenario | Do not award 'write more'. | 1 |
| reaches a justified judgement that uses the stated scenario evidence or conditions |  | 1 |

#### Q2 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| rewrites the technical statement using the correct syllabus concept | Do not accept only 'read the notes'. | 1 |
| re-attempts/marks a related question to prove the correction |  | 1 |

#### Q3 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| an algorithm is a solution to a problem expressed as a sequence of defined steps | Do not accept only 'instructions' for the definition or an unexplained identifier such as x. | 1 |
| ValidInputCount / NumberValid / another unambiguous identifier describing the count |  | 1 |

#### Q4 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| keeps an essential detail such as entry/exit time, duration, tariff or vehicle identifier | Award only details justified by the stated charging purpose. | 1 |
| omits an irrelevant detail such as vehicle colour or driver clothing, producing an abstract model focused on charging |  | 1 |

#### Q5 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| selection chooses between alternative paths | Do not award sequence for either requested structure. | 1 |
| iteration repeats one or more steps |  | 1 |

---

## Quiz after Lesson 105: Tracing, control and standard algorithms

**Syllabus:** Sections 9.1, 9.2

**Assessment objectives:** AO2, AO3

**Coverage:** Lessons 101-105

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. Write pseudocode for this flowchart decision: if Score is at least 50 output 'Pass'; otherwise output 'Retry'. **[2]**
2. Suggest WHILE or REPEAT for input that must occur at least once and justify. **[2]**
3. Write the valid-range condition for Mark from 0 to 100 inclusive. **[2]**
4. Complete a trace table for zero-based linear search for 9 in [4,9,2] and state the returned index. **[2]**
5. After one ascending bubble-sort pass through [5,2,4,1], state the list. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| IF Score >= 50 THEN OUTPUT 'Pass' | Award equivalent Cambridge pseudocode that preserves both mutually exclusive flowchart paths. | 1 |
| ELSE OUTPUT 'Retry' followed by ENDIF |  | 1 |

#### Q2 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| REPEAT | Allow WHILE only when initial input is correctly placed before the loop. | 1 |
| condition is tested after the body so input occurs at least once |  | 1 |

#### Q3 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| Mark >= 0 | Do not accept OR for the valid condition. | 1 |
| AND Mark <= 100 |  | 1 |

#### Q4 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| compares 4 then 9 and stops | Do not return position 2 unless one-based indexing is declared. | 1 |
| index 1 |  | 1 |

#### Q5 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| performs the adjacent comparisons/swaps consistently | Allow FT from the candidate's earlier incorrect list only when every subsequent comparison remains adjacent and follows ascending bubble sort. | 1 |
| [2,4,1,5] |  | 1 |

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
5. Write a corrected version of the Java assignment total = total + value; into Cambridge pseudocode. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| Maximum <- Array[1] | Do not initialise Maximum to 0 unless the data range guarantees it is valid. | 1 |
| Total <- 0 |  | 1 |

#### Q2 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| uses a loop/substring operation covering positions 1 to 3 | Allow zero-based bounds only when explicitly declared. | 1 |
| outputs Text[Index] or a valid extracted substring |  | 1 |

#### Q3 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| one loop iterates rows and the other iterates columns | Do not accept only 'there are two dimensions'. | 1 |
| each row-column pair/cell is visited systematically |  | 1 |

#### Q4 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| each comparison discards approximately half the remaining items | Do not omit the sorted-list condition. | 1 |
| therefore far fewer comparisons are required as size grows |  | 1 |

#### Q5 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| uses assignment operator <- | Do not retain Java equals as assignment. | 1 |
| Total <- Total + Value |  | 1 |

---

## Quiz after Lesson 115: Refinement, data types and arrays

**Syllabus:** Sections 9, 10.1, 10.2

**Assessment objectives:** AO2, AO3

**Coverage:** Lessons 111-115

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. Develop PROCESS RESULTS into two suitable lower-level steps for a marks program. **[2]**
2. State one check to perform when reviewing a complete algorithm against its requirements. **[2]**
3. Suggest the Cambridge data type for a person's middle initial and for their date of birth. **[2]**
4. Compare a constant from a variable. **[2]**
5. For Mark : ARRAY[1:20] OF INTEGER, state the lower bound and number of elements. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| one valid calculation step such as total/mean/maximum | Do not award two labels with no executable meaning. | 1 |
| a second distinct ordered processing/output step |  | 1 |

#### Q2 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| valid check such as every input/output/constraint is handled | Do not accept only 'check it works'. | 1 |
| explains how trace/test evidence confirms the requirement |  | 1 |

#### Q3 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| CHAR for the single middle initial | Do not use STRING as a generic replacement when the scenario requires exactly one character or a calendar date. | 1 |
| DATE for the calendar date of birth |  | 1 |

#### Q4 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| constant value is fixed during execution | Do not define only by identifier spelling. | 1 |
| variable value may change during execution |  | 1 |

#### Q5 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| lower bound 1 | Do not state 19 elements by subtracting bounds without adding one. | 1 |
| 20 elements |  | 1 |

---

## Quiz after Lesson 120: Arrays, records and files

**Syllabus:** Sections 10.2, 10.3

**Assessment objectives:** AO2, AO3

**Coverage:** Lessons 116-120

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. A school stores marks for 30 students and 4 tests. Suggest a one- or two-dimensional array and write a suitable Cambridge declaration. **[2]**
2. Write one statement to add 1 to the occurrence count stored at Count[Index]. **[2]**
3. Write one statement to save Mark 75 in record Student1 and one statement to read/output that field. **[2]**
4. State one advantage of an array of records for storing 100 students. **[2]**
5. Compare WRITE mode from APPEND mode for a text file. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| two-dimensional/2D array because each mark needs a student row and test column | Do not award a one-dimensional array unless the candidate defines and justifies a coherent index-mapping scheme beyond the required AS choice. | 1 |
| DECLARE Marks : ARRAY[1:30, 1:4] OF INTEGER or equivalent explicit bounds |  | 1 |

#### Q2 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| references Count[Index] consistently | Do not increment Index instead of the array element. | 1 |
| Count[Index] <- Count[Index] + 1 |  | 1 |

#### Q3 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| Student1.Mark <- 75 | Both statements must use the named record field rather than a numeric array index. | 1 |
| OUTPUT Student1.Mark or assignment that reads Student1.Mark |  | 1 |

#### Q4 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| each element keeps related fields for one student together | Do not accept only 'stores more data'. | 1 |
| keeping each student's fields in one record reduces the risk of fields for different students becoming misaligned |  | 1 |

#### Q5 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| WRITE creates/overwrites content from the start | Do not state that APPEND edits any middle record. | 1 |
| APPEND adds after existing content |  | 1 |

---

## Quiz after Lesson 125: Structured files and abstract data types

**Syllabus:** Sections 10.3, 10.4

**Assessment objectives:** AO2, AO3

**Coverage:** Lessons 121-125

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. State two requirements when reading a CSV record containing Name,Age. **[2]**
2. Suggest a stack or queue for printer jobs and justify. **[2]**
3. In an array-based linked-list node, state which field is edited to change only the stored value and which field is edited to change its successor. **[2]**
4. Suggest an array or linked list for frequent insertion between playlist items and justify. **[2]**
5. Write a Cambridge-style array declaration corresponding to Java declaration int[] Mark = new int[20]; using indexes 1 to 20. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| splits/parses fields using the delimiter in the expected order | Do not treat the whole line as two fields without parsing. | 1 |
| converts Age to the required numeric type/validates it |  | 1 |

#### Q2 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| queue | Do not award stack without a changed scenario. | 1 |
| FIFO processes the earliest submitted job first |  | 1 |

#### Q3 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| data/value field changes the stored value | Allow parallel Data and Next arrays or an array of node records. | 1 |
| next index/pointer field changes the successor/link |  | 1 |

#### Q4 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| linked list | Do not award the structure without an insertion-related reason. | 1 |
| links can be changed without shifting all later contiguous elements |  | 1 |

#### Q5 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| DECLARE Mark : ARRAY[1:20] | Do not retain Java allocation syntax. | 1 |
| OF INTEGER |  | 1 |

---

## Quiz after Lesson 130: Programming constructs and subroutines

**Syllabus:** Sections 11.1, 11.2

**Assessment objectives:** AO2, AO3

**Coverage:** Lessons 126-130

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. Write an IF condition that outputs Adult when Age is at least 18. **[2]**
2. Suggest CASE or nested IF for selecting one action from exact menu values 1 to 5 and justify. **[2]**
3. Write the Cambridge pseudocode delimiters for a loop that repeats Index from 1 to 10. **[2]**
4. Suggest WHILE or REPEAT...UNTIL for input that must be requested at least once, then justify. **[2]**
5. For FUNCTION Area(Length : REAL, Width : REAL) RETURNS REAL and the call Result <- Area(5.0, 3.0), identify the parameters/arguments and the return value. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| IF Age >= 18 THEN | Do not use assignment in the condition. | 1 |
| OUTPUT 'Adult' and closes with ENDIF |  | 1 |

#### Q2 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| CASE | Allow IF only with a developed reason based on ranges/compound conditions. | 1 |
| several discrete exact values map clearly to separate branches |  | 1 |

#### Q3 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| FOR Index <- 1 TO 10 | Do not retain Java semicolon clauses. | 1 |
| NEXT Index |  | 1 |

#### Q4 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| REPEAT...UNTIL | Do not award WHILE unless the candidate changes the scenario and explains a valid pre-test. | 1 |
| the body/input runs before the post-condition is tested, so it executes at least once |  | 1 |

#### Q5 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| Length and Width are parameters declared in the function header/interface; 5.0 and 3.0 are arguments supplied by the caller | Do not call the arguments parameters without relating them to the call and header. | 1 |
| the function returns one REAL value, received by Result |  | 1 |

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
3. A question defines FIRST(Text) as returning the first character. State LENGTH('CODE') and FIRST('CODE'). **[2]**
4. State the results of 17 DIV 5 and 17 MOD 5. **[2]**
5. Write pseudocode to input Length and Width and output their product. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| formal parameter aliases/refers to the caller variable | Do not accept only 'it is faster'. | 1 |
| assignment to X changes the caller's value |  | 1 |

#### Q2 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| visible/usable only within its subroutine/block | Do not state that local values are shared by every module. | 1 |
| reduces unintended side effects/name conflicts |  | 1 |

#### Q3 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| LENGTH('CODE') is 4 | Do not require an unstated substring convention; string manipulation routines are supplied. | 1 |
| FIRST('CODE') is 'C' using the supplied library-routine definition |  | 1 |

#### Q4 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| 17 DIV 5 = 3 | Both operators must be matched correctly. | 1 |
| 17 MOD 5 = 2 |  | 1 |

#### Q5 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| INPUT Length and INPUT Width | Do not award Java input/output APIs. | 1 |
| OUTPUT Length * Width or assigned Area |  | 1 |

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
5. Structured English says: repeat input Score until Score is from 0 to 100 inclusive. Write Cambridge pseudocode. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| OPENFILE 'Data.txt' FOR READ | Both commands must name the same file. | 1 |
| CLOSEFILE 'Data.txt' |  | 1 |

#### Q2 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| boundary value such as 16 or 65 | Examples must match their labels. | 1 |
| abnormal value outside range or wrong type |  | 1 |

#### Q3 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| breakpoint pauses execution at a chosen statement | Do not describe syntax highlighting only. | 1 |
| single-step executes one statement while variables/flow are inspected |  | 1 |

#### Q4 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| Score >= 0 | Do not accept OR for the valid condition. | 1 |
| AND Score <= 100 |  | 1 |

#### Q5 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| REPEAT; INPUT Score | Do not retain Java syntax or use OR for the valid inclusive range. | 1 |
| UNTIL Score >= 0 AND Score <= 100 |  | 1 |

---

## Quiz after Lesson 145: Software development and testing

**Syllabus:** Sections 11, 12

**Assessment objectives:** AO2, AO3

**Coverage:** Lessons 141-145

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. An existing program counts marks of 50 or more. State one analysis to perform before amending it to also count merits of 70 or more, and one regression check after the amendment. **[2]**
2. Explain when RAD is suitable and give one limitation. **[2]**
3. Compare a functional requirement from a success criterion. **[2]**
4. A structure chart shows Main calling CheckLogin(UserID, IsValid). State how this is derived into pseudocode, then state what a separate state-transition diagram records. **[2]**
5. State the purposes of a stub and acceptance testing. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| analysis identifies the existing purpose/control flow and the pass-count behaviour that must remain unchanged before adding MeritCount | Do not accept only 'add another IF' or 'check it works'; analysis and preserved existing behaviour are required. | 1 |
| regression test checks the existing 49/50 pass boundary as well as testing the new 69/70 merit boundary |  | 1 |

#### Q2 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| RAD suits a project whose users can participate frequently and whose requirements can be explored through rapid prototypes in time-boxed iterations | Do not award Agile as a substitute for RAD. | 1 |
| it is less suitable when users are unavailable, the system cannot be modularised/prototyped quickly, or exhaustive assurance is required |  | 1 |

#### Q3 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| functional requirement states what the system must do | Do not define both as user wishes. | 1 |
| success criterion is a measurable condition used to judge the solution |  | 1 |

#### Q4 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| derives a CheckLogin header with parameters and a matching call from Main with arguments | Do not accept that either document is a flowchart of every processing statement. | 1 |
| state-transition diagram records persistent states and directed event/condition-labelled transitions from a marked start state |  | 1 |

#### Q5 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| stub simulates a called module not yet available | Do not confuse a stub with test data. | 1 |
| acceptance testing checks with customer/user that requirements are met |  | 1 |

---

## Quiz after Lesson 150: Paper 2 integrated review

**Syllabus:** Sections 9, 10, 11, 12

**Assessment objectives:** AO2, AO3

**Coverage:** Lessons 146-150

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

1. State one reason stepwise refinement improves a complex algorithm. **[2]**
2. Suggest an ADT for undo history and justify. **[2]**
3. Write a procedure call that passes Total by reference to UpdateTotal. **[2]**
4. State two fields in a test-plan record besides test data. **[2]**
5. A trace gives the wrong maximum for all-negative data. State the likely initialisation error and correction. **[2]**

### Answer Key / Mark Scheme

#### Q1 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| breaks a high-level task into precise manageable subproblems | Do not accept only 'makes it shorter'. | 1 |
| supports independent implementation/testing or clearer logic |  | 1 |

#### Q2 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| stack | Do not award queue. | 1 |
| LIFO removes the most recent action first |  | 1 |

#### Q3 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| uses CALL UpdateTotal with Total as argument | Allow equivalent Cambridge procedure-call notation. | 1 |
| declaration/interface identifies the corresponding parameter as BYREF |  | 1 |

#### Q4 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| one valid field such as test ID/purpose/expected result | Do not repeat input data in different words. | 1 |
| a second distinct field such as actual result/pass-fail |  | 1 |

#### Q5 [2]

| Answer | Guidance | Marks |
|---|---|---:|
| Maximum was incorrectly initialised to 0 | Do not accept only 'use a smaller number'. | 1 |
| initialise Maximum to the first array value and process the remainder |  | 1 |
