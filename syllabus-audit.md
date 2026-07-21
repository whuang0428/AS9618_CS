# Cambridge 9618 AS Syllabus Coverage Audit

**Syllabus:** Cambridge International AS & A Level Computer Science 9618, 2027-2029, Version 2  
**Scope:** AS Level only: Paper 1 Sections 1-8 and Paper 2 Sections 9-12  
**Official source:** [Cambridge 9618 syllabus PDF](https://www.cambridgeinternational.org/Images/721397-2027-2029-syllabus.pdf)  
**Audit date:** 21 July 2026

## Purpose

This audit compares every AS syllabus requirement and its Notes and guidance with the current 150-lesson course. It is a coverage control document, not a claim that the course is finished.

Evidence notation:

- `W020` means the explanation, activity, practice or marking scheme in `web/lesson-020/`.
- `M020` means the teacher-facing Markdown file beginning `lessons/020-`.
- `P/MS` means the webpage contains targeted practice and an expandable exam-style marking scheme.
- Lesson references are evidence locations, not substitutes for the official syllabus wording.

Status rules:

- **Complete:** the required knowledge or skill is directly explained and assessed with sufficiently specific evidence.
- **Partial:** relevant material exists, but an official term, operation, example set or assessment demand is incomplete.
- **Missing:** there is no direct, syllabus-specific teaching and assessment evidence.
- Every **Partial** or **Missing** row has a fixed Stage 2 lesson target. A dash means no Stage 2 content repair is currently required.

## Official Assessment Snapshot

| Component | AS content | Duration | Marks | AS weighting | AO weighting |
|---|---|---:|---:|---:|---|
| Paper 1 Theory Fundamentals | Sections 1-8 | 1 hour 30 minutes | 75 | 50% | AO1 60%, AO2 40%, AO3 0% |
| Paper 2 Fundamental Problem-solving and Programming Skills | Sections 9-12 | 2 hours | 75 | 50% | AO1 0%, AO2 40%, AO3 60% |

Overall AS weighting is AO1 30%, AO2 40%, AO3 30%. Calculators are not permitted. Paper 2 answers use Cambridge pseudocode; Java in this course is supporting implementation practice only.

## Coverage Summary

The counts in this table are generated from the detailed rows below during verification.

| Section | Audit rows | Complete | Partial | Missing | Primary Stage 2 repair lessons |
|---|---:|---:|---:|---:|---|
| 1 Information representation | 11 | 11 | 0 | 0 | Stage 2 verified |
| 2 Communication | 16 | 16 | 0 | 0 | Stage 2 verified |
| 3 Hardware | 10 | 10 | 0 | 0 | Stage 2 verified |
| 4 Processor fundamentals | 15 | 15 | 0 | 0 | Stage 2 verified |
| 5 System software | 7 | 7 | 0 | 0 | Stage 2 verified |
| 6 Security, privacy and data integrity | 8 | 8 | 0 | 0 | Stage 2 verified |
| 7 Ethics and ownership | 6 | 6 | 0 | 0 | Stage 2 verified |
| 8 Databases | 11 | 11 | 0 | 0 | Stage 2 verified |
| 9 Algorithm design and problem-solving | 9 | 9 | 0 | 0 | Stage 2 verified |
| 10 Data types and structures | 10 | 10 | 0 | 0 | Stage 2 verified |
| 11 Programming | 9 | 9 | 0 | 0 | Stage 2 verified |
| 12 Software development | 9 | 9 | 0 | 0 | Stage 2 verified |
| **Total** | **121** | **121** | **0** | **0** | **All 53 Stage 2 rows repaired** |

## Section 1: Information Representation

| ID | Official requirement, including guidance | Current evidence | Practice / MS evidence | Status | Fixed Stage 2 action |
|---|---|---|---|---|---|
| S1.01 | Understand binary magnitudes and use binary prefixes kibi, mebi, gibi, tebi and decimal prefixes kilo, mega, giga, tera. | W001 Stage 2 completion; M001 specific completion module. | W001 worked example, three targeted items and expandable exam-style MS. | Complete | - |
| S1.02 | Understand binary, denary, hexadecimal, BCD, one's complement and two's complement number bases/representations. | W006 Stage 2 completion; M006 specific completion module. | W006 worked example, three targeted items and expandable exam-style MS. | Complete | - |
| S1.03 | Convert an integer value between the required number bases/representations. | W006 Stage 2 completion; M006 specific completion module. | W006 worked example, three targeted items and expandable exam-style MS. | Complete | - |
| S1.04 | Perform binary addition and subtraction on positive and negative integers. | W004 Stage 2 completion; M004 specific completion module. | W004 worked example, three targeted items and expandable exam-style MS. | Complete | - |
| S1.05 | Understand overflow when performing binary addition and subtraction. | W004 directly explains fixed-width overflow. | W004 P/MS includes range and overflow decisions. | Complete | - |
| S1.06 | Understand practical uses of BCD and hexadecimal. | W006 Stage 2 completion; M006 specific completion module. | W006 worked example, three targeted items and expandable exam-style MS. | Complete | - |
| S1.07 | Understand ASCII, extended ASCII and Unicode; explain why character sets are used. Character codes need not be memorised. | W007 directly covers the three sets and encoding purpose. | W007 P/MS tests distinctions and application without code recall. | Complete | - |
| S1.08 | Understand bitmap encoding: pixel, file header, image resolution, screen resolution and colour depth; calculate size and explain effects on quality/size. | W008 Stage 2 completion; M008 specific completion module. | W008 worked example, three targeted items and expandable exam-style MS. | Complete | - |
| S1.09 | Understand vector encoding using drawing objects, properties and a drawing list; justify bitmap or vector for a given application. | W009 Stage 2 completion; M009 specific completion module. | W009 worked example, three targeted items and expandable exam-style MS. | Complete | - |
| S1.10 | Understand sound representation, analogue-to-digital sampling, sampling rate/resolution, file-size calculation and effects on accuracy/size. | W010-W011 directly cover the model and calculations. | W010-W011 P/MS cover definition, calculation and consequence. | Complete | - |
| S1.11 | Explain the need for compression; lossy/lossless methods for text, bitmap, vector and sound; describe RLE. | W012-W013 cover need, trade-offs, lossy/lossless and RLE. | W012-W013 P/MS include method selection and RLE traces. | Complete | - |

## Section 2: Communication

| ID | Official requirement, including guidance | Current evidence | Practice / MS evidence | Status | Fixed Stage 2 action |
|---|---|---|---|---|---|
| S2.01 | Understand LAN and WAN characteristics and purposes. | W016 directly compares LAN and WAN. | W016 P/MS. | Complete | - |
| S2.02 | Explain client-server and peer-to-peer roles, benefits and drawbacks; justify a model for a scenario. | W017 directly covers both models and scenario choice. | W017 P/MS. | Complete | - |
| S2.03 | Understand thin-client and thick-client differences. | W017 Stage 2 completion; M017 specific completion module. | W017 worked example, three targeted items and expandable exam-style MS. | Complete | - |
| S2.04 | Understand bus, star, mesh and hybrid topologies. | W016 covers the named topologies. | W016 P/MS. | Complete | - |
| S2.05 | Describe how packets are transmitted in each topology and justify topology choice. | W016 Stage 2 completion; M016 specific completion module. | W016 worked example, three targeted items and expandable exam-style MS. | Complete | - |
| S2.06 | Understand public and private cloud computing, including benefits and drawbacks. | W024 Stage 2 completion; M024 specific completion module. | W024 worked example, three targeted items and expandable exam-style MS. | Complete | - |
| S2.07 | Understand wired and wireless networks and compare their characteristics. | W022 directly compares both. | W022 P/MS. | Complete | - |
| S2.08 | Understand copper cable, fibre-optic, radio waves, WiFi, microwave and satellite transmission. | W022 covers transmission media, with named-media comparisons. | W022 P/MS. | Complete | - |
| S2.09 | Understand LAN hardware: switch, server, NIC/WNIC, WAP, cables, bridge and repeater. | W023 Stage 2 completion; M023 specific completion module. | W023 worked example, three targeted items and expandable exam-style MS. | Complete | - |
| S2.10 | Understand the purpose of a router. | W018 and W023 directly cover forwarding between networks. | W018/W023 P/MS. | Complete | - |
| S2.11 | Understand Ethernet collisions and CSMA/CD. | W019 Stage 2 completion; M019 specific completion module. | W019 worked example, three targeted items and expandable exam-style MS. | Complete | - |
| S2.12 | Understand bit streaming, real-time and on-demand streaming, bit rate and broadband speed. | W025 Stage 2 completion; M025 specific completion module. | W025 worked example, three targeted items and expandable exam-style MS. | Complete | - |
| S2.13 | Distinguish the World Wide Web from the internet. | W024 Stage 2 completion; M024 specific completion module. | W024 worked example, three targeted items and expandable exam-style MS. | Complete | - |
| S2.14 | Understand internet hardware: modems, PSTN, dedicated lines and cellular phone networks. | W023 Stage 2 completion; M023 specific completion module. | W023 worked example, three targeted items and expandable exam-style MS. | Complete | - |
| S2.15 | Understand IPv4/IPv6, subnetting, device association, public/private and static/dynamic addresses, including security implications. | W020 Stage 2 completion; M020 specific completion module. | W020 worked example, three targeted items and expandable exam-style MS. | Complete | - |
| S2.16 | Explain URL purpose/structure and DNS operation. | W020 directly explains URL components and domain-to-IP resolution. | W020 P/MS. | Complete | - |

## Section 3: Hardware

| ID | Official requirement, including guidance | Current evidence | Practice / MS evidence | Status | Fixed Stage 2 action |
|---|---|---|---|---|---|
| S3.01 | Explain the need for input, output, primary storage, secondary storage and removable storage. | W027-W032 cover categories, purposes and selection. | W027-W032 P/MS. | Complete | - |
| S3.02 | Understand embedded systems and their benefits/drawbacks. | W033 directly covers embedded systems and selection. | W033 P/MS. | Complete | - |
| S3.03 | Describe principal operation of laser printer, 3D printer, microphone, speakers, HDD, flash memory, optical reader/writer, touchscreen and VR headset. | W028, W029, W031 Stage 2 completion; M028, M029, M031 specific completion module. | W028, W029, W031 worked example, three targeted items and expandable exam-style MS. | Complete | - |
| S3.04 | Understand why buffers are used. | W029 Stage 2 completion; M029 specific completion module. | W029 worked example, three targeted items and expandable exam-style MS. | Complete | - |
| S3.05 | Distinguish RAM and ROM. | W030 directly compares volatility, purpose and use. | W030 P/MS. | Complete | - |
| S3.06 | Explain uses of SRAM and DRAM and reasons for each use. | W030 Stage 2 completion; M030 specific completion module. | W030 worked example, three targeted items and expandable exam-style MS. | Complete | - |
| S3.07 | Understand PROM, EPROM and EEPROM. | W030 Stage 2 completion; M030 specific completion module. | W030 worked example, three targeted items and expandable exam-style MS. | Complete | - |
| S3.08 | Distinguish monitoring and control; understand sensors, actuators and feedback. | W034 covers monitoring/control loop, sensors, actuators and feedback. | W034 P/MS. | Complete | - |
| S3.09 | Understand temperature, pressure, infrared and sound sensors and appropriate applications. | W034 covers sensor selection and feedback scenarios. | W034 P/MS. | Complete | - |
| S3.10 | Understand NOT, AND, OR, NAND, NOR and XOR; use symbols/functions/truth tables and convert among problem, expression, circuit and truth table. | W035-W037 cover all representations and conversions. | W035-W037 P/MS. | Complete | - |

## Section 4: Processor Fundamentals

| ID | Official requirement, including guidance | Current evidence | Practice / MS evidence | Status | Fixed Stage 2 action |
|---|---|---|---|---|---|
| S4.01 | Understand Von Neumann architecture and the stored-program concept. | W041-W042 cover processor architecture and stored instructions/data. | W041-W042 P/MS. | Complete | - |
| S4.02 | Understand general- and special-purpose registers: PC, MDR, MAR, ACC, IX, CIR and status register. | W043 Stage 2 completion; M043 specific completion module. | W043 worked example, three targeted items and expandable exam-style MS. | Complete | - |
| S4.03 | Understand ALU, CU, clock and immediate access store (IAS). | W041 Stage 2 completion; M041 specific completion module. | W041 worked example, three targeted items and expandable exam-style MS. | Complete | - |
| S4.04 | Understand address, data and control buses. | W044 directly covers purpose, direction and width. | W044 P/MS. | Complete | - |
| S4.05 | Understand processor performance factors: processor type, cores, bus width, clock and cache. | W049 and W044 cover these factors and limitations. | W049/W044 P/MS. | Complete | - |
| S4.06 | Understand USB, HDMI and VGA ports. | W044 Stage 2 completion; M044 specific completion module. | W044 worked example, three targeted items and expandable exam-style MS. | Complete | - |
| S4.07 | Describe the fetch-execute cycle using register transfer notation. | W042-W043 cover the cycle and named-register transfers. | W042-W043 P/MS. | Complete | - |
| S4.08 | Understand causes/applications of interrupts, ISR, detection and handling. | W048 directly covers the interrupt sequence and ISR. | W048 P/MS. | Complete | - |
| S4.09 | Distinguish assembly language and machine code. | W045-W046 cover the relationship and translation need. | W045-W046 P/MS. | Complete | - |
| S4.10 | Describe and apply the stages of a two-pass assembler. | W046 Stage 2 completion; M046 specific completion module. | W046 worked example, three targeted items and expandable exam-style MS. | Complete | - |
| S4.11 | Trace a simple assembly-language program. | W046-W047 provide operand and instruction traces. | W046-W047 P/MS. | Complete | - |
| S4.12 | Understand instruction groups: data movement, input/output, arithmetic, conditional/unconditional branch and compare. | W045 Stage 2 completion; M045 specific completion module. | W045 worked example, three targeted items and expandable exam-style MS. | Complete | - |
| S4.13 | Use the specified instruction set: LDM, LDD, LDI, LDX, LDR, MOV, STO, ADD, SUB, INC, DEC, JMP, CMP, CMI, JPE, JPN, IN, OUT and END. | W046, W047 Stage 2 completion; M046, M047 specific completion module. | W046, W047 worked example, three targeted items and expandable exam-style MS. | Complete | - |
| S4.14 | Understand immediate, direct, indirect, indexed and relative addressing. | W047 directly covers addressing-mode interpretation. | W047 P/MS. | Complete | - |
| S4.15 | Use AND, OR, XOR, LSL and LSR for bit manipulation, including testing/setting bits with masks. | W050 Stage 2 completion; M050 specific completion module. | W050 worked example, three targeted items and expandable exam-style MS. | Complete | - |

## Section 5: System Software

| ID | Official requirement, including guidance | Current evidence | Practice / MS evidence | Status | Fixed Stage 2 action |
|---|---|---|---|---|---|
| S5.01 | Explain why an operating system is required and its memory, file, security, hardware and process management roles. | W052-W053 directly cover need and named roles. | W052-W053 P/MS. | Complete | - |
| S5.02 | Understand disk formatter, antivirus, defragmentation, disk analysis/repair, compression and backup utilities. | W055 covers the named utility categories and purpose. | W055 P/MS. | Complete | - |
| S5.03 | Understand libraries and benefits of dynamically linked library files. | W058 Stage 2 completion; M058 specific completion module. | W058 worked example, three targeted items and expandable exam-style MS. | Complete | - |
| S5.04 | Explain why assembler, compiler and interpreter are needed. | W056 directly covers translators and source-to-target purpose. | W056 P/MS. | Complete | - |
| S5.05 | Compare compiler and interpreter advantages/disadvantages and justify use. | W056 and W060 cover comparison and scenario choice. | W056/W060 P/MS. | Complete | - |
| S5.06 | Understand that Java is partly compiled and partly interpreted. | W060 Stage 2 completion; M060 specific completion module. | W060 worked example, three targeted items and expandable exam-style MS. | Complete | - |
| S5.07 | Understand IDE features: context-sensitive prompts, dynamic syntax checking, prettyprint, expand/collapse, single-step, breakpoints, variable/expression inspection and report window. | W060 Stage 2 completion; M060 specific completion module. | W060 worked example, three targeted items and expandable exam-style MS. | Complete | - |

## Section 6: Security, Privacy and Data Integrity

| ID | Official requirement, including guidance | Current evidence | Practice / MS evidence | Status | Fixed Stage 2 action |
|---|---|---|---|---|---|
| S6.01 | Distinguish data security, privacy and integrity. | W062 Stage 2 completion; M062 specific completion module. | W062 worked example, three targeted items and expandable exam-style MS. | Complete | - |
| S6.02 | Explain the need for data and computer-system security. | W062-W064 directly connect threats, assets and consequences. | W062-W064 P/MS. | Complete | - |
| S6.03 | Understand user accounts/passwords, digital signatures, biometrics, firewall, antivirus, anti-spyware and encryption as security measures. | W063, W067 Stage 2 completion; M063, M067 specific completion module. | W063, W067 worked example, three targeted items and expandable exam-style MS. | Complete | - |
| S6.04 | Understand virus, spyware, hackers, phishing and pharming threats. | W063-W064 directly cover the named threats. | W063-W064 P/MS. | Complete | - |
| S6.05 | Understand restriction of access to data and computer systems as a risk-reduction method. | W065-W066 cover authentication, authorisation and least privilege. | W065-W066 P/MS. | Complete | - |
| S6.06 | Explain how encryption and access rights protect data. | W066-W067 cover confidentiality, permissions and access decisions. | W066-W067 P/MS. | Complete | - |
| S6.07 | Understand validation checks: range, format, length, presence, existence, limit and check digit. | W069 Stage 2 completion; M069 specific completion module. | W069 worked example, three targeted items and expandable exam-style MS. | Complete | - |
| S6.08 | Understand verification: visual and double entry; parity byte/block and checksum. | W069 Stage 2 completion; M069 specific completion module. | W069 worked example, three targeted items and expandable exam-style MS. | Complete | - |

## Section 7: Ethics and Ownership

| ID | Official requirement, including guidance | Current evidence | Practice / MS evidence | Status | Fixed Stage 2 action |
|---|---|---|---|---|---|
| S7.01 | Understand the need for professional ethics. | W072 directly covers ethical decision-making. | W072 P/MS. | Complete | - |
| S7.02 | Understand the importance of the British Computer Society and IEEE codes of conduct. | W072 Stage 2 completion; M072 specific completion module. | W072 worked example, three targeted items and expandable exam-style MS. | Complete | - |
| S7.03 | Determine whether a scenario is ethical or unethical and explain its impact. | W072-W073 use scenario analysis and consequences. | W072-W073 P/MS. | Complete | - |
| S7.04 | Understand copyright and its effect on software use. | W074 directly covers copyright and ownership. | W074 P/MS. | Complete | - |
| S7.05 | Understand FSF, OSI, shareware and commercial licences; justify a licence for a scenario. | W074, W075 Stage 2 completion; M074, M075 specific completion module. | W074, W075 worked example, three targeted items and expandable exam-style MS. | Complete | - |
| S7.06 | Understand AI applications and evaluate social, economic and environmental impacts. | W076 Stage 2 completion; M076 specific completion module. | W076 worked example, three targeted items and expandable exam-style MS. | Complete | - |

## Section 8: Databases

| ID | Official requirement, including guidance | Current evidence | Practice / MS evidence | Status | Fixed Stage 2 action |
|---|---|---|---|---|---|
| S8.01 | Explain limitations of file-based systems and how relational databases address them. | W078-W079 directly compare duplication, inconsistency and shared structure. | W078-W079 P/MS. | Complete | - |
| S8.02 | Understand entity/table, record/tuple, field/attribute, primary/candidate/secondary/foreign key, relationships, referential integrity and indexing. | W080, W081 Stage 2 completion; M080, M081 specific completion module. | W080, W081 worked example, three targeted items and expandable exam-style MS. | Complete | - |
| S8.03 | Produce and interpret entity-relationship diagrams. | W082 directly covers entities, keys, cardinality and relationships. | W082 P/MS. | Complete | - |
| S8.04 | Understand 1NF, 2NF and 3NF; explain 3NF and produce a normalised design. | W083 Stage 2 completion; M083 specific completion module. | W083 worked example, three targeted items and expandable exam-style MS. | Complete | - |
| S8.05 | Understand DBMS features: data dictionary, data modelling, logical schema, integrity, security, backup and access rights. | W078 Stage 2 completion; M078 specific completion module. | W078 worked example, three targeted items and expandable exam-style MS. | Complete | - |
| S8.06 | Understand the developer interface and query processor. | W078 Stage 2 completion; M078 specific completion module. | W078 worked example, three targeted items and expandable exam-style MS. | Complete | - |
| S8.07 | Understand DDL creates/modifies structure, DML queries/maintains data, and SQL is an industry-standard language. | W087 Stage 2 completion; M087 specific completion module. | W087 worked example, three targeted items and expandable exam-style MS. | Complete | - |
| S8.08 | Understand SQL syntax and semantics in the AS syllabus. | W084-W087 directly teach reading and writing SQL. | W084-W087 P/MS. | Complete | - |
| S8.09 | Use DDL: CREATE DATABASE, CREATE TABLE with CHARACTER/VARCHAR/BOOLEAN/INTEGER/REAL/DATE/TIME, ALTER TABLE, primary and foreign keys. | W087 Stage 2 completion; M087 specific completion module. | W087 worked example, three targeted items and expandable exam-style MS. | Complete | - |
| S8.10 | Use DML on at most two tables: SELECT, FROM, WHERE, ORDER BY, GROUP BY, INNER JOIN, SUM, COUNT and AVG. | W084-W086 cover selection, ordering, grouping, aggregates and joins. | W084-W086 P/MS. | Complete | - |
| S8.11 | Use INSERT, DELETE and UPDATE to maintain data. | W087 directly covers all three operations. | W087 P/MS. | Complete | - |

## Section 9: Algorithm Design and Problem-solving

| ID | Official requirement, including guidance | Current evidence | Practice / MS evidence | Status | Fixed Stage 2 action |
|---|---|---|---|---|---|
| S9.01 | Understand abstraction, its purpose/benefits and creation of an abstract model. | W099 directly covers decomposition and abstraction in scenarios. | W099 P/MS. | Complete | - |
| S9.02 | Use decomposition and express a problem as modules. | W099 and W111 cover decomposition into manageable parts. | W099/W111 P/MS. | Complete | - |
| S9.03 | Understand what an algorithm is. | W098-W100 establish finite steps, inputs, processing and outputs. | W098-W100 P/MS. | Complete | - |
| S9.04 | Choose meaningful identifier names and construct an identifier table. | W098 Stage 2 completion; M098 specific completion module. | W098 worked example, three targeted items and expandable exam-style MS. | Complete | - |
| S9.05 | Use input-process-output to design pseudocode solutions. | W098 and W111 directly use IPO/constraints and scenario design. | W098/W111 P/MS. | Complete | - |
| S9.06 | Understand and use sequence, selection and iteration. | W102 and later programming lessons directly cover all three constructs. | W102 P/MS. | Complete | - |
| S9.07 | Use structured English, flowcharts and pseudocode; convert between representations. | W100 Stage 2 completion; M100 specific completion module. | W100 worked example, three targeted items and expandable exam-style MS. | Complete | - |
| S9.08 | Use stepwise refinement to develop an algorithm. | W111 Stage 2 completion; M111 specific completion module. | W111 worked example, three targeted items and expandable exam-style MS. | Complete | - |
| S9.09 | Construct and interpret logic statements. | W102, W127 and W134 cover Boolean conditions and logical operators. | Relevant P/MS exists. | Complete | - |

## Section 10: Data Types and Structures

| ID | Official requirement, including guidance | Current evidence | Practice / MS evidence | Status | Fixed Stage 2 action |
|---|---|---|---|---|---|
| S10.01 | Understand integer, real, char, string, Boolean and date types and Cambridge pseudocode type names. | W113-W114 and W124 directly cover types and declarations. | W113/W124 P/MS. | Complete | - |
| S10.02 | Understand record purpose and define, read and save record data. | W118-W119 directly cover records and arrays of records. | W118-W119 P/MS. | Complete | - |
| S10.03 | Understand array, index, lower bound and upper bound terminology. | W115-W116 directly cover array structure and bounds. | W115-W116 P/MS. | Complete | - |
| S10.04 | Select one- or two-dimensional arrays for a scenario. | W115-W116 include representation choice. | W115-W116 P/MS. | Complete | - |
| S10.05 | Write pseudocode using one- and two-dimensional arrays. | W115-W117 and W124 provide pseudocode operations. | W115-W117 P/MS. | Complete | - |
| S10.06 | Write bubble sort and linear search algorithms. | W104-W105 directly teach linear search and bubble sort; binary/insertion are labelled supporting extensions. | W104-W105 P/MS. | Complete | - |
| S10.07 | Explain the need for files and use text-file pseudocode. | W120-W121 and W136 cover read/write/append patterns. | W120-W121/W136 P/MS. | Complete | - |
| S10.08 | Understand the definition and purpose of an abstract data type. | W122-W123 define ADTs through behaviour and operations. | W122-W123 P/MS. | Complete | - |
| S10.09 | Understand stack, queue and linked-list features; justify a structure. | W122, W123 Stage 2 completion; M122, M123 specific completion module. | W122, W123 worked example, three targeted items and expandable exam-style MS. | Complete | - |
| S10.10 | Add, edit and delete data in the ADTs and implement them using arrays; pseudocode for operations is not required by the syllabus. | W122, W123 Stage 2 completion; M122, M123 specific completion module. | W122, W123 worked example, three targeted items and expandable exam-style MS. | Complete | - |

## Section 11: Programming

| ID | Official requirement, including guidance | Current evidence | Practice / MS evidence | Status | Fixed Stage 2 action |
|---|---|---|---|---|---|
| S11.01 | Write pseudocode from a flowchart or structured-English description. | W140 Stage 2 completion; M140 specific completion module. | W140 worked example, three targeted items and expandable exam-style MS. | Complete | - |
| S11.02 | Use declarations, constants, variables, assignment, arithmetic/logical operations and input/output. | W114, W124, W126, W134-W135 directly cover the set. | Targeted P/MS exists. | Complete | - |
| S11.03 | Use built-in/library and string functions. | W133 directly covers string and built-in functions. | W133 P/MS. | Complete | - |
| S11.04 | Use IF/ELSE/nested selection, CASE, count-controlled loops, post-condition and pre-condition loops. | W127-W129 directly cover the full control set. | W127-W129 P/MS. | Complete | - |
| S11.05 | Select and justify a suitable loop structure. | W128-W129 compare loop choice and execution conditions. | W128-W129 P/MS. | Complete | - |
| S11.06 | Understand and use procedures with parameters passed by reference and by value. | W130-W131 directly cover procedure calls and both passing modes. | W130-W131 P/MS. | Complete | - |
| S11.07 | Understand and use functions, including return values in expressions. | W130 directly covers functions and returned values. | W130 P/MS. | Complete | - |
| S11.08 | Use precise terminology: procedure/function header, interface, parameter, argument and return value. | W130-W132 cover subprogram interfaces, parameters and scope. | W130-W132 P/MS. | Complete | - |
| S11.09 | Write clear and efficient Cambridge pseudocode. | W109-W110 and W139-W141 cover efficiency, readability and complete fragments. | W109-W110/W141 P/MS. | Complete | - |

## Section 12: Software Development

| ID | Official requirement, including guidance | Current evidence | Practice / MS evidence | Status | Fixed Stage 2 action |
|---|---|---|---|---|---|
| S12.01 | Understand why a program-development lifecycle is used; compare waterfall, iterative and RAD models and their stages. | W142-W143 cover lifecycle purpose, requirements and model choice. | W142-W143 P/MS. | Complete | - |
| S12.02 | Understand, construct and use structure charts, including parameters, and derive pseudocode. | W144 Stage 2 completion; M144 specific completion module. | W144 worked example, three targeted items and expandable exam-style MS. | Complete | - |
| S12.03 | Understand and construct state-transition diagrams. | W144 Stage 2 completion; M144 specific completion module. | W144 worked example, three targeted items and expandable exam-style MS. | Complete | - |
| S12.04 | Identify and correct syntax, logic and runtime errors. | W059 and W138 directly cover error types and debugging. | W059/W138 P/MS. | Complete | - |
| S12.05 | Understand dry run, walkthrough, white-box, black-box, integration, alpha, beta, acceptance and stub testing. | W145 Stage 2 completion; M145 specific completion module. | W145 worked example, three targeted items and expandable exam-style MS. | Complete | - |
| S12.06 | Produce a test strategy and test plan. | W145 Stage 2 completion; M145 specific completion module. | W145 worked example, three targeted items and expandable exam-style MS. | Complete | - |
| S12.07 | Select normal, abnormal and extreme/boundary test data. | W137 directly covers normal, boundary and erroneous/abnormal data. | W137 P/MS. | Complete | - |
| S12.08 | Understand perfective, adaptive and corrective maintenance. | W145-W146 cover maintenance types and case-study decisions. | W145-W146 P/MS. | Complete | - |
| S12.09 | Analyse and amend an existing program. | W138-W141 and W146 include debugging, correction and improvement. | Relevant P/MS exists. | Complete | - |

## Stage 2 Completion Register

All 53 formerly non-complete rows have been repaired. The table records the implemented lesson groups.

| Priority | Completed lesson(s) | Rows closed | Implemented deliverable |
|---:|---|---|---|
| 1 | L001, L004, L006, L008-L009 | S1.01-S1.04, S1.06, S1.08-S1.09 | Completed representation gaps, calculations, diverse practice and strict MS. |
| 2 | L016-L017, L019-L020, L023-L025 | S2.03, S2.05-S2.06, S2.09, S2.11-S2.15 | Completed named networking concepts and mechanisms. |
| 3 | L028-L031 | S3.03-S3.04, S3.06-S3.07 | Added required device operation and memory technologies. |
| 4 | L041, L043-L047, L050 | S4.02-S4.03, S4.06, S4.10, S4.12-S4.13, S4.15 | Completed processor terminology, assembler and exact instruction set. |
| 5 | L058, L060 | S5.03, S5.06-S5.07 | Completed DLL, Java translation and IDE features. |
| 6 | L062-L063, L067, L069 | S6.01, S6.03, S6.07-S6.08 | Completed exact security, validation and verification terminology. |
| 7 | L072, L074-L076 | S7.02, S7.05-S7.06 | Added named professional bodies, licences and AI impacts. |
| 8 | L078, L080-L081, L083, L087 | S8.02, S8.04-S8.07, S8.09 | Completed database terminology, DBMS components, normalisation and DDL. |
| 9 | L098, L100, L111 | S9.04, S9.07-S9.08 | Added identifier tables, structured English and stepwise refinement. |
| 10 | L122-L123 | S10.09-S10.10 | Added linked lists and array implementations of required ADTs. |
| 11 | L140 | S11.01 | Added translation into Cambridge pseudocode from both required representations. |
| 12 | L144-L145 | S12.02-S12.03, S12.05-S12.06 | Added design diagrams and the complete testing taxonomy/plan. |

Every repaired row was generated and is verified against the following Stage 2 acceptance requirements:

1. Direct explanation using the official term.
2. At least one concrete worked example.
3. At least three targeted retrieval/application items.
4. At least one original exam-style question with an expandable Cambridge-style MS.
5. A strict note that rejects at least one predictable vague or incorrect formulation when wording matters.
6. Corresponding teacher-facing Markdown updated so it does not remain a generic placeholder.

## Required Content vs Extension Content

The following current topics can support understanding but must not displace examinable syllabus content:

| Current extension | Lesson | Required handling |
|---|---:|---|
| Binary fractions and precision limits | L006 | Keep only after BCD is fully taught; label `Extension: not an explicit AS 2027-2029 requirement`. |
| Protocol layering and encapsulation | L019 | Keep as supporting context after CSMA/CD is added. |
| Network performance diagnostics | L025 | Keep after bit streaming and broadband requirements are complete. |
| Cache and virtual memory detail | L030 | Keep after SRAM/DRAM and PROM/EPROM/EEPROM are complete. |
| Environmental/reliability hardware selection | L039 | Keep as application practice. |
| Pipelining | L050 | Keep only after bit manipulation is complete and label as extension. |
| Compilation stages beyond the specified translator comparison | L057 | Keep as supporting context. |
| Patents and broader data-protection discussion | L073-L074 | Keep, but do not present as replacements for copyright/licence requirements. |
| Binary search and insertion sort | L104-L105 | Keep as labelled extension; bubble sort and linear search remain the required algorithms. |
| CSV conventions | L121 | Keep as text-file application context. |
| Scope/lifetime depth | L132 | Keep as programming-quality support. |
| Java implementation examples | L124 and L136-L140 | Label every Java block as support; Cambridge pseudocode remains the exam answer standard. |

## Stage 1 Acceptance Record

- All 12 AS sections are represented.
- All 121 audit IDs are unique and each official requirement is mapped to specific lesson evidence.
- All Partial/Missing items have fixed Stage 2 targets; there are no open target decisions.
- Assessment durations, marks, paper weightings and AO weightings match the official 2027-2029 Version 2 syllabus.
- Extension content is separated from required syllabus content.
- Coverage status is evidence-based: a lesson title or keyword hit alone is not treated as completion.
