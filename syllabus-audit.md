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
| 1 Information representation | 11 | 4 | 5 | 2 | L001, L004, L006, L008-L009 |
| 2 Communication | 16 | 7 | 5 | 4 | L016-L017, L019-L020, L023-L025 |
| 3 Hardware | 10 | 6 | 1 | 3 | L028-L031 |
| 4 Processor fundamentals | 15 | 8 | 4 | 3 | L041, L044-L047, L050 |
| 5 System software | 7 | 4 | 1 | 2 | L058, L060 |
| 6 Security, privacy and data integrity | 8 | 4 | 4 | 0 | L062, L065, L067, L069 |
| 7 Ethics and ownership | 6 | 3 | 1 | 2 | L072, L074-L076 |
| 8 Databases | 11 | 5 | 5 | 1 | L078, L080-L083, L087 |
| 9 Algorithm design and problem-solving | 9 | 6 | 1 | 2 | L098, L100, L111 |
| 10 Data types and structures | 10 | 8 | 2 | 0 | L122-L123 |
| 11 Programming | 9 | 8 | 0 | 1 | L126, L140 |
| 12 Software development | 9 | 5 | 2 | 2 | L144-L145 |
| **Total** | **121** | **68** | **31** | **22** | **53 rows require repair** |

## Section 1: Information Representation

| ID | Official requirement, including guidance | Current evidence | Practice / MS evidence | Status | Fixed Stage 2 action |
|---|---|---|---|---|---|
| S1.01 | Understand binary magnitudes and use binary prefixes kibi, mebi, gibi, tebi and decimal prefixes kilo, mega, giga, tera. | W001; M001 is brief. | W001 P/MS covers units and conversions. | Partial | L001: add an explicit eight-prefix comparison table and mixed TiB/TB calculations to both formats. |
| S1.02 | Understand binary, denary, hexadecimal, BCD, one's complement and two's complement number bases/representations. | W002-W005 cover all except BCD; M002-M005 provide topic scaffolds. | W002-W005 P/MS; no BCD item. | Partial | L006: replace binary-fractions extension as the core focus with BCD representation and add BCD practice/MS; retain fractions as labelled extension only. |
| S1.03 | Convert an integer value between the required number bases/representations. | W002-W005 cover binary/denary/hex and signed forms. | W002-W005 P/MS; BCD conversion absent. | Partial | L006: add denary-to-BCD and BCD-to-denary conversion, including invalid-nibble traps. |
| S1.04 | Perform binary addition and subtraction on positive and negative integers. | W004 addition; W005 signed representation. Direct subtraction method is absent. | Addition and signed-value P/MS exist; subtraction does not. | Partial | L004: add positive and two's-complement subtraction, worked traces, practice and MS. |
| S1.05 | Understand overflow when performing binary addition and subtraction. | W004 directly explains fixed-width overflow. | W004 P/MS includes range and overflow decisions. | Complete | - |
| S1.06 | Understand practical uses of BCD and hexadecimal. | W003 explains hexadecimal uses; BCD uses absent. | W003 P/MS covers hex uses only. | Missing | L006: teach BCD in clocks, calculators and numeric displays, contrast with pure binary, and assess justification. |
| S1.07 | Understand ASCII, extended ASCII and Unicode; explain why character sets are used. Character codes need not be memorised. | W007 directly covers the three sets and encoding purpose. | W007 P/MS tests distinctions and application without code recall. | Complete | - |
| S1.08 | Understand bitmap encoding: pixel, file header, image resolution, screen resolution and colour depth; calculate size and explain effects on quality/size. | W008-W009 cover pixels, image resolution, colour depth, metadata/header and size. Screen resolution is not explicitly contrasted with image resolution. | W008-W009 P/MS cover calculations and quality/size. | Partial | L008: add screen-resolution versus image-resolution explanation, examples and one strict MS item. |
| S1.09 | Understand vector encoding using drawing objects, properties and a drawing list; justify bitmap or vector for a given application. | No direct vector-graphics lesson or assessment. | None. | Missing | L009: add vector object/property/drawing-list model, rendering order, bitmap/vector comparisons and targeted P/MS. |
| S1.10 | Understand sound representation, analogue-to-digital sampling, sampling rate/resolution, file-size calculation and effects on accuracy/size. | W010-W011 directly cover the model and calculations. | W010-W011 P/MS cover definition, calculation and consequence. | Complete | - |
| S1.11 | Explain the need for compression; lossy/lossless methods for text, bitmap, vector and sound; describe RLE. | W012-W013 cover need, trade-offs, lossy/lossless and RLE. | W012-W013 P/MS include method selection and RLE traces. | Complete | - |

## Section 2: Communication

| ID | Official requirement, including guidance | Current evidence | Practice / MS evidence | Status | Fixed Stage 2 action |
|---|---|---|---|---|---|
| S2.01 | Understand LAN and WAN characteristics and purposes. | W016 directly compares LAN and WAN. | W016 P/MS. | Complete | - |
| S2.02 | Explain client-server and peer-to-peer roles, benefits and drawbacks; justify a model for a scenario. | W017 directly covers both models and scenario choice. | W017 P/MS. | Complete | - |
| S2.03 | Understand thin-client and thick-client differences. | No direct evidence. | None. | Missing | L017: add processing/storage location, dependency, update/security trade-offs and comparison P/MS. |
| S2.04 | Understand bus, star, mesh and hybrid topologies. | W016 covers the named topologies. | W016 P/MS. | Complete | - |
| S2.05 | Describe how packets are transmitted in each topology and justify topology choice. | W016 covers choice; packet movement per topology is not consistently explicit. | W016 P/MS is stronger on comparison than packet path. | Partial | L016: add packet-path diagrams and failure-path questions for all four topologies. |
| S2.06 | Understand public and private cloud computing, including benefits and drawbacks. | W024 covers cloud-service concepts, but public/private deployment distinction is brief. | W024 P/MS includes cloud decisions. | Partial | L024: make public/private cloud definitions and scenario trade-offs explicit in explanation and MS. |
| S2.07 | Understand wired and wireless networks and compare their characteristics. | W022 directly compares both. | W022 P/MS. | Complete | - |
| S2.08 | Understand copper cable, fibre-optic, radio waves, WiFi, microwave and satellite transmission. | W022 covers transmission media, with named-media comparisons. | W022 P/MS. | Complete | - |
| S2.09 | Understand LAN hardware: switch, server, NIC/WNIC, WAP, cables, bridge and repeater. | W023 covers switch, router, WAP and gateway; the full official LAN list is not covered. | W023 P/MS omits several named devices. | Partial | L023: add server, NIC/WNIC, cable, bridge and repeater roles plus device-selection P/MS. |
| S2.10 | Understand the purpose of a router. | W018 and W023 directly cover forwarding between networks. | W018/W023 P/MS. | Complete | - |
| S2.11 | Understand Ethernet collisions and CSMA/CD. | No direct CSMA/CD explanation. | None. | Missing | L019: add collision detection, listen/transmit/detect/stop/random wait/retry sequence and trace/MS. |
| S2.12 | Understand bit streaming, real-time and on-demand streaming, bit rate and broadband speed. | No direct syllabus-specific streaming lesson. | None. | Missing | L025: add buffering, real-time/on-demand distinction, bit-rate versus available bandwidth and scenario questions. |
| S2.13 | Distinguish the World Wide Web from the internet. | W024 covers internet-related services but does not make the distinction sufficiently explicit. | Limited direct assessment. | Partial | L024: add infrastructure-versus-service contrast and strict one-mark/two-mark MS. |
| S2.14 | Understand internet hardware: modems, PSTN, dedicated lines and cellular phone networks. | No direct coverage of the complete named list. | None. | Missing | L023: add access hardware and connection-path examples; assess suitability and terminology. |
| S2.15 | Understand IPv4/IPv6, subnetting, device association, public/private and static/dynamic addresses, including security implications. | W020 covers basic IP purpose and changeability, but not the complete official IP list. | W020 P/MS covers IP/MAC/DNS, not the full list. | Partial | L020: add all named IP distinctions, subnet purpose and security implications with targeted P/MS. |
| S2.16 | Explain URL purpose/structure and DNS operation. | W020 directly explains URL components and domain-to-IP resolution. | W020 P/MS. | Complete | - |

## Section 3: Hardware

| ID | Official requirement, including guidance | Current evidence | Practice / MS evidence | Status | Fixed Stage 2 action |
|---|---|---|---|---|---|
| S3.01 | Explain the need for input, output, primary storage, secondary storage and removable storage. | W027-W032 cover categories, purposes and selection. | W027-W032 P/MS. | Complete | - |
| S3.02 | Understand embedded systems and their benefits/drawbacks. | W033 directly covers embedded systems and selection. | W033 P/MS. | Complete | - |
| S3.03 | Describe principal operation of laser printer, 3D printer, microphone, speakers, HDD, flash memory, optical reader/writer, touchscreen and VR headset. | W028-W031 cover categories and some devices, but not the operating principles of the complete official list. | Device-choice P/MS exists; several mechanisms are absent. | Partial | L028-L031: allocate each named device, add step-by-step operating principles, diagrams and mechanism-focused MS. |
| S3.04 | Understand why buffers are used. | No direct hardware-buffer explanation. | None. | Missing | L029: add producer/consumer speed mismatch, temporary storage, underflow/overflow examples and P/MS. |
| S3.05 | Distinguish RAM and ROM. | W030 directly compares volatility, purpose and use. | W030 P/MS. | Complete | - |
| S3.06 | Explain uses of SRAM and DRAM and reasons for each use. | No direct SRAM/DRAM evidence. | None. | Missing | L030: add cell design at syllabus depth, refresh/cost/speed/capacity trade-offs, cache/main-memory uses and MS. |
| S3.07 | Understand PROM, EPROM and EEPROM. | No direct evidence. | None. | Missing | L030: add programming/erasure/reprogramming distinctions and comparison practice/MS. |
| S3.08 | Distinguish monitoring and control; understand sensors, actuators and feedback. | W034 covers monitoring/control loop, sensors, actuators and feedback. | W034 P/MS. | Complete | - |
| S3.09 | Understand temperature, pressure, infrared and sound sensors and appropriate applications. | W034 covers sensor selection and feedback scenarios. | W034 P/MS. | Complete | - |
| S3.10 | Understand NOT, AND, OR, NAND, NOR and XOR; use symbols/functions/truth tables and convert among problem, expression, circuit and truth table. | W035-W037 cover all representations and conversions. | W035-W037 P/MS. | Complete | - |

## Section 4: Processor Fundamentals

| ID | Official requirement, including guidance | Current evidence | Practice / MS evidence | Status | Fixed Stage 2 action |
|---|---|---|---|---|---|
| S4.01 | Understand Von Neumann architecture and the stored-program concept. | W041-W042 cover processor architecture and stored instructions/data. | W041-W042 P/MS. | Complete | - |
| S4.02 | Understand general- and special-purpose registers: PC, MDR, MAR, ACC, IX, CIR and status register. | W041-W043 cover most named registers; IX is not directly taught. | P/MS covers the fetch-cycle registers but not IX. | Partial | L043: add IX role and indexed-address calculation with register-specific practice/MS. |
| S4.03 | Understand ALU, CU, clock and immediate access store (IAS). | W041 covers ALU/CU/clock; IAS terminology is not explicit. | W041 P/MS omits IAS wording. | Partial | L041: add IAS definition and its relationship to processor-accessible memory. |
| S4.04 | Understand address, data and control buses. | W044 directly covers purpose, direction and width. | W044 P/MS. | Complete | - |
| S4.05 | Understand processor performance factors: processor type, cores, bus width, clock and cache. | W049 and W044 cover these factors and limitations. | W049/W044 P/MS. | Complete | - |
| S4.06 | Understand USB, HDMI and VGA ports. | No direct syllabus-specific port coverage. | None. | Missing | L044: add purpose, data type/direction, typical devices and comparison P/MS for all three ports. |
| S4.07 | Describe the fetch-execute cycle using register transfer notation. | W042-W043 cover the cycle and named-register transfers. | W042-W043 P/MS. | Complete | - |
| S4.08 | Understand causes/applications of interrupts, ISR, detection and handling. | W048 directly covers the interrupt sequence and ISR. | W048 P/MS. | Complete | - |
| S4.09 | Distinguish assembly language and machine code. | W045-W046 cover the relationship and translation need. | W045-W046 P/MS. | Complete | - |
| S4.10 | Describe and apply the stages of a two-pass assembler. | W046 references assembly translation but does not fully teach both passes and tables. | Limited direct P/MS. | Partial | L046: add pass 1/pass 2, symbol table, forward references, error reporting and an applied trace/MS. |
| S4.11 | Trace a simple assembly-language program. | W046-W047 provide operand and instruction traces. | W046-W047 P/MS. | Complete | - |
| S4.12 | Understand instruction groups: data movement, input/output, arithmetic, conditional/unconditional branch and compare. | W045-W047 cover broad groups, but coverage is not tied to the exact syllabus set. | Some P/MS exists. | Partial | L045: add an official-group table and classification/tracing questions. |
| S4.13 | Use the specified instruction set: LDM, LDD, LDI, LDX, LDR, MOV, STO, ADD, SUB, INC, DEC, JMP, CMP, CMI, JPE, JPN, IN, OUT and END. | No complete, explicit instruction-reference and assessed trace. | None for the full set. | Missing | L046-L047: add exact semantics, operands and trace exercises for every listed mnemonic. |
| S4.14 | Understand immediate, direct, indirect, indexed and relative addressing. | W047 directly covers addressing-mode interpretation. | W047 P/MS. | Complete | - |
| S4.15 | Use AND, OR, XOR, LSL and LSR for bit manipulation, including testing/setting bits with masks. | No direct complete bit-manipulation unit. | None. | Missing | L050: replace core pipelining extension with masks, bit testing/setting and logical/arithmetic shift traces; retain pipelining as labelled extension. |

## Section 5: System Software

| ID | Official requirement, including guidance | Current evidence | Practice / MS evidence | Status | Fixed Stage 2 action |
|---|---|---|---|---|---|
| S5.01 | Explain why an operating system is required and its memory, file, security, hardware and process management roles. | W052-W053 directly cover need and named roles. | W052-W053 P/MS. | Complete | - |
| S5.02 | Understand disk formatter, antivirus, defragmentation, disk analysis/repair, compression and backup utilities. | W055 covers the named utility categories and purpose. | W055 P/MS. | Complete | - |
| S5.03 | Understand libraries and benefits of dynamically linked library files. | W058 covers libraries/linking, but DLL benefits and run-time implications are not sufficiently explicit. | Limited DLL-specific assessment. | Partial | L058: add DLL definition, shared code, smaller executables, memory/update/version trade-offs and strict P/MS. |
| S5.04 | Explain why assembler, compiler and interpreter are needed. | W056 directly covers translators and source-to-target purpose. | W056 P/MS. | Complete | - |
| S5.05 | Compare compiler and interpreter advantages/disadvantages and justify use. | W056 and W060 cover comparison and scenario choice. | W056/W060 P/MS. | Complete | - |
| S5.06 | Understand that Java is partly compiled and partly interpreted. | No direct bytecode/JVM pathway. | None. | Missing | L060: add source -> bytecode -> JVM execution, portability and precise terminology P/MS. |
| S5.07 | Understand IDE features: context-sensitive prompts, dynamic syntax checking, prettyprint, expand/collapse, single-step, breakpoints, variable/expression inspection and report window. | Debugging features appear in W138, but the complete IDE feature list is not taught in Section 5. | None for the full named list. | Missing | L060: add the complete IDE feature set, development benefit, screenshots/visual model and feature-selection P/MS. |

## Section 6: Security, Privacy and Data Integrity

| ID | Official requirement, including guidance | Current evidence | Practice / MS evidence | Status | Fixed Stage 2 action |
|---|---|---|---|---|---|
| S6.01 | Distinguish data security, privacy and integrity. | W062 focuses on CIA/authenticity; privacy is developed in W073 but not explicitly contrasted in one model. | Separate P/MS exists, not a direct three-way distinction. | Partial | L062: add a security/privacy/integrity comparison and scenario classification MS. |
| S6.02 | Explain the need for data and computer-system security. | W062-W064 directly connect threats, assets and consequences. | W062-W064 P/MS. | Complete | - |
| S6.03 | Understand user accounts/passwords, digital signatures, biometrics, firewall, antivirus, anti-spyware and encryption as security measures. | W063-W068 cover most controls; digital signature and anti-spyware distinctions are incomplete. | Broad security-control P/MS exists. | Partial | L063 and L067: add anti-spyware role and digital-signature creation/verification, authenticity and integrity P/MS. |
| S6.04 | Understand virus, spyware, hackers, phishing and pharming threats. | W063-W064 directly cover the named threats. | W063-W064 P/MS. | Complete | - |
| S6.05 | Understand restriction of access to data and computer systems as a risk-reduction method. | W065-W066 cover authentication, authorisation and least privilege. | W065-W066 P/MS. | Complete | - |
| S6.06 | Explain how encryption and access rights protect data. | W066-W067 cover confidentiality, permissions and access decisions. | W066-W067 P/MS. | Complete | - |
| S6.07 | Understand validation checks: range, format, length, presence, existence, limit and check digit. | W069 covers validation but does not explicitly assess every named check. | W069 P/MS is partial against the official list. | Partial | L069: add definitions, suitable-field examples and item-level marking points for all seven checks. |
| S6.08 | Understand verification: visual and double entry; parity byte/block and checksum. | W069 and W018 cover verification/checksum in different contexts; parity byte/block is incomplete. | Fragmented P/MS. | Partial | L069: add visual/double-entry verification plus parity byte/block and checksum worked examples and MS. |

## Section 7: Ethics and Ownership

| ID | Official requirement, including guidance | Current evidence | Practice / MS evidence | Status | Fixed Stage 2 action |
|---|---|---|---|---|---|
| S7.01 | Understand the need for professional ethics. | W072 directly covers ethical decision-making. | W072 P/MS. | Complete | - |
| S7.02 | Understand the importance of the British Computer Society and IEEE codes of conduct. | No direct coverage of both named organisations and code purposes. | None. | Missing | L072: add BCS/IEEE roles, shared principles, professional accountability and source-based P/MS. |
| S7.03 | Determine whether a scenario is ethical or unethical and explain its impact. | W072-W073 use scenario analysis and consequences. | W072-W073 P/MS. | Complete | - |
| S7.04 | Understand copyright and its effect on software use. | W074 directly covers copyright and ownership. | W074 P/MS. | Complete | - |
| S7.05 | Understand FSF, OSI, shareware and commercial licences; justify a licence for a scenario. | W074-W075 cover open/proprietary licensing, but not the full official categories and organisations. | General licence P/MS exists. | Partial | L074-L075: add FSF/free-software freedoms, OSI/open-source criteria, shareware and commercial terms plus selection MS. |
| S7.06 | Understand AI applications and evaluate social, economic and environmental impacts. | W076 covers computing impacts but has no complete AI applications unit. | No direct AI-specific P/MS. | Missing | L076: add named AI applications and balanced social/economic/environmental impact chains with evaluation MS. |

## Section 8: Databases

| ID | Official requirement, including guidance | Current evidence | Practice / MS evidence | Status | Fixed Stage 2 action |
|---|---|---|---|---|---|
| S8.01 | Explain limitations of file-based systems and how relational databases address them. | W078-W079 directly compare duplication, inconsistency and shared structure. | W078-W079 P/MS. | Complete | - |
| S8.02 | Understand entity/table, record/tuple, field/attribute, primary/candidate/secondary/foreign key, relationships, referential integrity and indexing. | W080-W081 cover core terms and keys; candidate/secondary key and indexing treatment is incomplete. | Core-key P/MS exists. | Partial | L080-L081: add exact synonym pairs, candidate/secondary keys, indexing purpose/cost and strict terminology P/MS. |
| S8.03 | Produce and interpret entity-relationship diagrams. | W082 directly covers entities, keys, cardinality and relationships. | W082 P/MS. | Complete | - |
| S8.04 | Understand 1NF, 2NF and 3NF; explain 3NF and produce a normalised design. | W083 covers normalisation and anomalies, but explicit 1NF/2NF/3NF dependency tests need strengthening. | W083 P/MS is only partly stage-specific. | Partial | L083: add formal stage criteria, partial/transitive dependency examples and full unnormalised-to-3NF design/MS. |
| S8.05 | Understand DBMS features: data dictionary, data modelling, logical schema, integrity, security, backup and access rights. | W078 and W088 cover several features, not the full named set in one coherent model. | Fragmented P/MS. | Partial | L078: add complete DBMS feature table and scenario-based benefit questions. |
| S8.06 | Understand the developer interface and query processor. | W078 mentions DBMS roles but the two components are not directly explained and assessed. | Limited direct evidence. | Partial | L078: add request path from developer interface through query processor to stored data, with role MS. |
| S8.07 | Understand DDL creates/modifies structure, DML queries/maintains data, and SQL is an industry-standard language. | W084-W087 teach DML operations; DDL/DML distinction is incomplete. | DML P/MS exists. | Partial | L087: add DDL versus DML classification, purpose and SQL context. |
| S8.08 | Understand SQL syntax and semantics in the AS syllabus. | W084-W087 directly teach reading and writing SQL. | W084-W087 P/MS. | Complete | - |
| S8.09 | Use DDL: CREATE DATABASE, CREATE TABLE with CHARACTER/VARCHAR/BOOLEAN/INTEGER/REAL/DATE/TIME, ALTER TABLE, primary and foreign keys. | No direct complete DDL unit. | None. | Missing | L087: add all specified DDL statements/types, key constraints, executable examples and strict syntax MS. |
| S8.10 | Use DML on at most two tables: SELECT, FROM, WHERE, ORDER BY, GROUP BY, INNER JOIN, SUM, COUNT and AVG. | W084-W086 cover selection, ordering, grouping, aggregates and joins. | W084-W086 P/MS. | Complete | - |
| S8.11 | Use INSERT, DELETE and UPDATE to maintain data. | W087 directly covers all three operations. | W087 P/MS. | Complete | - |

## Section 9: Algorithm Design and Problem-solving

| ID | Official requirement, including guidance | Current evidence | Practice / MS evidence | Status | Fixed Stage 2 action |
|---|---|---|---|---|---|
| S9.01 | Understand abstraction, its purpose/benefits and creation of an abstract model. | W099 directly covers decomposition and abstraction in scenarios. | W099 P/MS. | Complete | - |
| S9.02 | Use decomposition and express a problem as modules. | W099 and W111 cover decomposition into manageable parts. | W099/W111 P/MS. | Complete | - |
| S9.03 | Understand what an algorithm is. | W098-W100 establish finite steps, inputs, processing and outputs. | W098-W100 P/MS. | Complete | - |
| S9.04 | Choose meaningful identifier names and construct an identifier table. | Naming appears across programming lessons, but no direct identifier-table instruction. | None. | Missing | L098: add identifier naming rules and a table with name, data type, purpose and scope where appropriate. |
| S9.05 | Use input-process-output to design pseudocode solutions. | W098 and W111 directly use IPO/constraints and scenario design. | W098/W111 P/MS. | Complete | - |
| S9.06 | Understand and use sequence, selection and iteration. | W102 and later programming lessons directly cover all three constructs. | W102 P/MS. | Complete | - |
| S9.07 | Use structured English, flowcharts and pseudocode; convert between representations. | W100 covers flowcharts/pseudocode, but structured English and systematic conversion are incomplete. | Limited conversion P/MS. | Partial | L100: add structured-English conventions and two-way conversion tasks across all three representations. |
| S9.08 | Use stepwise refinement to develop an algorithm. | No direct, named stepwise-refinement sequence. | None. | Missing | L111: add top-down refinement levels, stopping criterion, worked scenario and assessment. |
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
| S10.09 | Understand stack, queue and linked-list features; justify a structure. | W122 covers stack/queue; linked list is absent. | Stack/queue P/MS only. | Partial | L122-L123: add linked nodes/pointers, operations, comparison and scenario justification P/MS. |
| S10.10 | Add, edit and delete data in the ADTs and implement them using arrays; pseudocode for operations is not required by the syllabus. | W122 supports stack/queue operations, but edit/delete breadth and linked-list array implementation are incomplete. | Partial P/MS. | Partial | L122: add array state diagrams for all required ADTs and operation traces without over-requiring pseudocode. |

## Section 11: Programming

| ID | Official requirement, including guidance | Current evidence | Practice / MS evidence | Status | Fixed Stage 2 action |
|---|---|---|---|---|---|
| S11.01 | Write pseudocode from a flowchart or structured-English description. | W126-W140 teach pseudocode constructs, but no direct complete translation lesson from both source forms. | No focused two-source conversion assessment. | Missing | L140: add flowchart-to-pseudocode and structured-English-to-pseudocode tasks with Cambridge-style MS. |
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
| S12.02 | Understand, construct and use structure charts, including parameters, and derive pseudocode. | No direct structure-chart unit. | None. | Missing | L144: add symbols, hierarchy, parameter/data/control passing and structure-chart-to-pseudocode tasks/MS. |
| S12.03 | Understand and construct state-transition diagrams. | No direct evidence. | None. | Missing | L144: add state, transition, event/condition, start state and scenario construction P/MS. |
| S12.04 | Identify and correct syntax, logic and runtime errors. | W059 and W138 directly cover error types and debugging. | W059/W138 P/MS. | Complete | - |
| S12.05 | Understand dry run, walkthrough, white-box, black-box, integration, alpha, beta, acceptance and stub testing. | W137-W138 and W145 cover testing/debugging, but not the complete official method list. | Partial method-specific P/MS. | Partial | L145: add definitions, timing/participants/purpose, contrasts and scenario-selection MS for every named method. |
| S12.06 | Produce a test strategy and test plan. | W137 and W145 cover test data and evaluation but a complete strategy/plan artefact is not explicit. | Partial planning assessment. | Partial | L145: add a test-plan table with test ID, purpose, data, expected/actual result and pass/fail plus strategy rationale. |
| S12.07 | Select normal, abnormal and extreme/boundary test data. | W137 directly covers normal, boundary and erroneous/abnormal data. | W137 P/MS. | Complete | - |
| S12.08 | Understand perfective, adaptive and corrective maintenance. | W145-W146 cover maintenance types and case-study decisions. | W145-W146 P/MS. | Complete | - |
| S12.09 | Analyse and amend an existing program. | W138-W141 and W146 include debugging, correction and improvement. | Relevant P/MS exists. | Complete | - |

## Stage 2 Gap Register

Stage 2 must repair all 53 non-complete rows. Work is ordered by syllabus risk, not lesson number.

| Priority | Target lesson(s) | Rows closed | Required deliverable |
|---:|---|---|---|
| 1 | L004, L006, L008-L009 | S1.01-S1.04, S1.06, S1.08-S1.09 | Complete representation gaps, calculations, diverse practice and strict MS. |
| 2 | L016-L017, L019-L020, L023-L025 | S2.03, S2.05-S2.06, S2.09, S2.11-S2.15 | Complete named networking concepts and mechanisms. |
| 3 | L028-L031 | S3.03-S3.04, S3.06-S3.07 | Add required device operation and memory technologies. |
| 4 | L041, L043-L047, L050 | S4.02-S4.03, S4.06, S4.10, S4.12-S4.13, S4.15 | Complete processor terminology, assembler and exact instruction set. |
| 5 | L058, L060 | S5.03, S5.06-S5.07 | Complete DLL, Java translation and IDE features. |
| 6 | L062-L063, L067, L069 | S6.01, S6.03, S6.07-S6.08 | Complete exact security, validation and verification terminology. |
| 7 | L072, L074-L076 | S7.02, S7.05-S7.06 | Add named professional bodies, licences and AI impacts. |
| 8 | L078, L080-L083, L087 | S8.02, S8.04-S8.07, S8.09 | Complete database terminology, DBMS components, normalisation and DDL. |
| 9 | L098, L100, L111 | S9.04, S9.07-S9.08 | Add identifier tables, structured English and stepwise refinement. |
| 10 | L122-L123 | S10.09-S10.10 | Add linked lists and array implementations of required ADTs. |
| 11 | L140 | S11.01 | Add translation into Cambridge pseudocode from both required representations. |
| 12 | L144-L145 | S12.02-S12.03, S12.05-S12.06 | Add design diagrams and the complete testing taxonomy/plan. |

For every repaired row, Stage 2 acceptance requires all of the following in the target webpage:

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
