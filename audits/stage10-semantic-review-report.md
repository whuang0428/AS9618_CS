# Stage 10 Semantic Image Audit

## Audit state

- Scope: 779 Stage 10 generated infographics (734 rollout-source assets and 45 pilot explanations).
- First visual pass: complete.
- Second reverse-order visual pass: complete.
- Method: Two visual passes at original resolution against maintained source facts; OCR used only as a locator.
- OCR role: locator only; OCR Clear is not treated as semantic approval.
- Audit completed: yes.
- Course release-ready: yes.

## Asset outcomes

- Approved: 779 (100.00%).
- Critical assets: 0.
- Major assets: 0.
- Minor assets: 0.
- Pending: 0.

## Open defects

- Critical: 0.
- Major: 0.
- Minor: 0.
- Release blocked: no.

## Automated calculation checks

- Checks executed: 71.
- Passed: 71.
- Failed and linked to registered defects: 0.

- CALC-001-STORAGE (001/knowledge): PASS - 1 GiB = 1024^3 bytes
- CALC-002-BINARY (002/knowledge): PASS - 10110110₂ = 182₁₀
- CALC-003-HEX (003/grouping): PASS - 11010110₂ = D6₁₆
- CALC-004-OVERFLOW (004/overflow): PASS - 240 + 16 produces a ninth carry bit and stores 00000000 in eight bits
- CALC-005-SIGNMAG (005/systems): PASS - 8-bit sign-and-magnitude conversion for -23
- CALC-006-ONES (005/systems): PASS - 8-bit one's-complement conversion for -23
- CALC-007-TWOS (005/systems): PASS - 8-bit two's-complement conversion for -23
- CALC-008-PRECISION (006/precision): PASS - Nearest four-fractional-bit representation of 0.1
- CALC-009-BITMAP (008/formula): PASS - 100 x 80 pixels x 8 bits = 64000 bits
- CALC-010-BITMAP-BYTES (008/formula): PASS - 64000 bits / 8 = 8000 bytes
- CALC-011-SOUND (010/formula): PASS - 8000 Hz x 16 bits x 10 seconds = 1280000 bits
- CALC-012-SOUND-BYTES (010/formula): PASS - 1280000 bits / 8 = 160000 bytes
- CALC-013-PACKET (015/sprint): PASS - 100 packets x 50 bytes x 8 = 40000 bits
- CALC-014-TRANSMISSION (025/calculation): PASS - 25 MB x 8 / 10 Mbps = 20 seconds
- CALC-015-ADDRESS-WIDTH (044/width): PASS - 16 address bits select 65536 addresses
- CALC-016-LENGTH (133/length): PASS - LENGTH('ALGORITHM') = 9
- CALC-017-DIVMOD (134/relationship): PASS - 17 DIV 5 = 3 and 17 MOD 5 = 2
- CALC-019-DECISION-ENDIF (101/equivalence): PASS - Flowchart decision maps to a closed IF selection
- CALC-020-JAVA-SUM (102/pseudocode): PASS - Java support code inputs, accumulates and outputs
- CALC-021-COUNT-ENDIF (100/pseudocode): PASS - ENDIF precedes NEXT Count
- CALC-022-REPEAT-ENDIF (103/pseudocode): PASS - Cambridge validation has REPEAT, ENDIF and UNTIL in order
- CALC-023-JAVA-DO-WHILE (103/pseudocode): PASS - Java support loop includes opening do block
- CALC-024-SEARCH-ENDIF (104/pseudocode): PASS - Search decision closes before index update
- CALC-025-TOTAL-COUNT-ENDIF (106/pseudocode): PASS - Pass selection closes inside the total loop
- CALC-026-VOWEL-ENDIF (107/pseudocode): PASS - Vowel decision closes before loop advances
- CALC-027-NESTED-OUTPUT (108/pseudocode): PASS - Both nested-loop forms output each product
- CALC-028-EFFICIENCY-ENDIF (109/pseudocode): PASS - Search selection is closed
- CALC-029-JAVA-TRANSLATION-ENDIF (110/java): PASS - Translated pseudocode closes IF before NEXT
- CALC-030-DESIGN-ENDIF (111/pseudocode): PASS - Designed loop contains complete input, decision and output
- CALC-031-TYPE-EXAMPLES (113/why-types): PASS - Both data-type IF examples are closed
- CALC-032-2D-OUTPUT (116/pseudocode): PASS - Both two-dimensional traversals output the current cell
- CALC-033-COUNT-CLOSED (117/count): PASS - Count selection closes before the loop advances and reports the result
- CALC-034-COUNT-EQUIVALENCE (117/pseudocode): PASS - Both counting forms close the decision and output the final count
- CALC-035-SEARCH-CLOSED (117/search): PASS - Search decision closes before the loop advances
- CALC-036-ALTERNATIVE-OPERATIONS (119/operations): PASS - Record search, count and update are presented as alternatives
- CALC-037-RECORD-TRAVERSAL (119/traversal): PASS - Record field selection closes before traversal advances
- CALC-038-EOF-ORDER (120/reader): PASS - EOF is checked before each file read
- CALC-039-CSV-CONVERSION (121/types): PASS - CSV text is converted before numeric comparison and both examples close
- CALC-040-THREE-CONSTRUCTS (126/constructs): PASS - The construct summary includes sequence, selection and iteration
- CALC-041-LOOP-FORMS (126/iteration): PASS - All three loop forms state their check behavior
- CALC-042-JAVA-SELECTION (126/java): PASS - The Cambridge selection corresponding to Java is closed
- CALC-043-SELECTION-CLOSURES (126/selection): PASS - IF and CASE examples use their matching closing keywords
- CALC-044-CASE-CLOSED (127/case): PASS - The discrete-choice CASE structure is closed
- CALC-045-CASE-JAVA-CLOSED (127/java): PASS - The CASE side of the Java comparison is closed
- CALC-046-ONE-INPUT-PER-ATTEMPT (129/repeat): PASS - Post-condition validation reads exactly once per pictured iteration
- CALC-047-FUNCTION-SELECTIONS (130/parameters): PASS - Function and caller selections have matching closures
- CALC-048-SHADOWING-DECLARATIONS (132/shadowing): PASS - Shadowing example declares distinct global and local variables
- CALC-049-CASE-NORMALISATION (133/case): PASS - Letter case is normalised before a closed comparison
- CALC-050-INTEGRATED-VALIDATION (139/integration): PASS - Validation function and caller both have complete selection structure
- CALC-051-MODULE-ROLES (139/parameters): PASS - Functions return values while the display procedure performs output
- CALC-052-POST-CONDITION-LOOP (140/loops): PASS - Post-condition loop uses Cambridge REPEAT...UNTIL order
- CALC-053-REVIEW-FRAGMENT (141/fragment): PASS - Complete review fragment inputs, selects, advances and outputs in order
- CALC-054-REVIEW-JAVA (141/java): PASS - Review pseudocode closes the selection shown beside Java
- CALC-055-SUBROUTINE-CLOSURES (141/subroutines): PASS - Function, nested selection and procedure each close correctly
- CALC-056-NESTED-DECISIONS (144/algorithms): PASS - Both nested booking-clash decisions are closed
- CALC-057-REVIEW-SELECTIONS (148/selection): PASS - Review IF and CASE examples have explicit rejoin points
- CALC-058-REVIEW-SUBPROGRAMS (148/subprograms): PASS - Procedure, function and nested validation selection all close
- CALC-059-LAYERED-ENCAPSULATION (020/address-journey): PASS - The local-link frame contains the destination MAC outside the IP packet destination
- CALC-060-IP-MAC-TOGETHER (020/addresses): PASS - Local and routed delivery both use IP and MAC addresses at different scopes
- CALC-061-SIX-GATES (035/gates): PASS - The six-gate summary names every required gate
- CALC-062-FETCH-UPDATES (042/cycle-visual): PASS - MDR-to-CIR transfer is distinct from the PC self-increment
- CALC-063-FOUR-ADDRESSING-MODES (047/modes): PASS - The four-mode comparison includes immediate, direct, indirect and indexed
- CALC-064-TRANSLATOR-TOOLCHAIN (056/concept): PASS - Object modules are linked and the executable is loaded rather than generically retranslated
- CALC-065-SQL-WRITTEN-ORDER (089/sql): PASS - SQL written syntax places GROUP BY before ORDER BY
- CALC-066-SQL-LOGICAL-ORDER (089/sql): PASS - Simplified logical processing places sorting last
- CALC-067-SQL-CLAUSE-CHOICES (093/sql): PASS - SQL clauses are choices rather than a mandatory pipeline
- CALC-068-PAPER1-TIMING (095/timing): PASS - One-minute-per-mark practice timings use one consistent ratio
- CALC-069-MAXIMUM-LENGTH (103/checks): PASS - The postcode example is described as a maximum-length check
- CALC-070-NESTING-RULE (108/model): PASS - Loop nesting is based on traversal grouping rather than range width
- CALC-071-CLEARER-NAMES (110/conversion): PASS - Arrows run from abbreviated names to clearer names
- CALC-072-PAPER2-TIMING (149/timing): PASS - Timed pseudocode practice uses one consistent mark-to-minute ratio

## Statistics by risk type

Risk labels overlap; one asset may appear in more than one row.

| Risk type | Assets | Assets with defects |
|---|---:|---:|
| binary | 16 | 0 |
| numeric | 274 | 0 |
| formula-or-state | 201 | 0 |
| process-or-arrow | 363 | 0 |
| conceptual | 245 | 0 |

## Statistics by lesson

| Lesson | Assets | Approved | Critical assets | Major assets | Minor assets |
|---|---:|---:|---:|---:|---:|
| 001 | 1 | 1 | 0 | 0 | 0 |
| 002 | 3 | 3 | 0 | 0 | 0 |
| 003 | 3 | 3 | 0 | 0 | 0 |
| 004 | 3 | 3 | 0 | 0 | 0 |
| 005 | 3 | 3 | 0 | 0 | 0 |
| 006 | 3 | 3 | 0 | 0 | 0 |
| 007 | 4 | 4 | 0 | 0 | 0 |
| 008 | 4 | 4 | 0 | 0 | 0 |
| 009 | 3 | 3 | 0 | 0 | 0 |
| 010 | 5 | 5 | 0 | 0 | 0 |
| 011 | 4 | 4 | 0 | 0 | 0 |
| 012 | 4 | 4 | 0 | 0 | 0 |
| 013 | 3 | 3 | 0 | 0 | 0 |
| 014 | 3 | 3 | 0 | 0 | 0 |
| 015 | 3 | 3 | 0 | 0 | 0 |
| 016 | 3 | 3 | 0 | 0 | 0 |
| 017 | 4 | 4 | 0 | 0 | 0 |
| 018 | 4 | 4 | 0 | 0 | 0 |
| 019 | 3 | 3 | 0 | 0 | 0 |
| 020 | 5 | 5 | 0 | 0 | 0 |
| 021 | 3 | 3 | 0 | 0 | 0 |
| 022 | 3 | 3 | 0 | 0 | 0 |
| 023 | 5 | 5 | 0 | 0 | 0 |
| 024 | 3 | 3 | 0 | 0 | 0 |
| 025 | 3 | 3 | 0 | 0 | 0 |
| 026 | 2 | 2 | 0 | 0 | 0 |
| 027 | 3 | 3 | 0 | 0 | 0 |
| 028 | 3 | 3 | 0 | 0 | 0 |
| 029 | 3 | 3 | 0 | 0 | 0 |
| 030 | 3 | 3 | 0 | 0 | 0 |
| 031 | 4 | 4 | 0 | 0 | 0 |
| 032 | 3 | 3 | 0 | 0 | 0 |
| 033 | 2 | 2 | 0 | 0 | 0 |
| 034 | 3 | 3 | 0 | 0 | 0 |
| 035 | 4 | 4 | 0 | 0 | 0 |
| 036 | 3 | 3 | 0 | 0 | 0 |
| 037 | 3 | 3 | 0 | 0 | 0 |
| 038 | 3 | 3 | 0 | 0 | 0 |
| 039 | 3 | 3 | 0 | 0 | 0 |
| 040 | 3 | 3 | 0 | 0 | 0 |
| 041 | 4 | 4 | 0 | 0 | 0 |
| 042 | 5 | 5 | 0 | 0 | 0 |
| 043 | 3 | 3 | 0 | 0 | 0 |
| 044 | 4 | 4 | 0 | 0 | 0 |
| 045 | 4 | 4 | 0 | 0 | 0 |
| 046 | 4 | 4 | 0 | 0 | 0 |
| 047 | 4 | 4 | 0 | 0 | 0 |
| 048 | 5 | 5 | 0 | 0 | 0 |
| 049 | 6 | 6 | 0 | 0 | 0 |
| 050 | 5 | 5 | 0 | 0 | 0 |
| 051 | 5 | 5 | 0 | 0 | 0 |
| 052 | 6 | 6 | 0 | 0 | 0 |
| 053 | 6 | 6 | 0 | 0 | 0 |
| 054 | 6 | 6 | 0 | 0 | 0 |
| 055 | 7 | 7 | 0 | 0 | 0 |
| 056 | 5 | 5 | 0 | 0 | 0 |
| 057 | 6 | 6 | 0 | 0 | 0 |
| 058 | 6 | 6 | 0 | 0 | 0 |
| 059 | 6 | 6 | 0 | 0 | 0 |
| 060 | 6 | 6 | 0 | 0 | 0 |
| 061 | 3 | 3 | 0 | 0 | 0 |
| 062 | 6 | 6 | 0 | 0 | 0 |
| 063 | 7 | 7 | 0 | 0 | 0 |
| 064 | 7 | 7 | 0 | 0 | 0 |
| 065 | 8 | 8 | 0 | 0 | 0 |
| 066 | 6 | 6 | 0 | 0 | 0 |
| 067 | 7 | 7 | 0 | 0 | 0 |
| 068 | 7 | 7 | 0 | 0 | 0 |
| 069 | 7 | 7 | 0 | 0 | 0 |
| 070 | 7 | 7 | 0 | 0 | 0 |
| 071 | 6 | 6 | 0 | 0 | 0 |
| 072 | 5 | 5 | 0 | 0 | 0 |
| 073 | 7 | 7 | 0 | 0 | 0 |
| 074 | 6 | 6 | 0 | 0 | 0 |
| 075 | 6 | 6 | 0 | 0 | 0 |
| 076 | 6 | 6 | 0 | 0 | 0 |
| 077 | 4 | 4 | 0 | 0 | 0 |
| 078 | 6 | 6 | 0 | 0 | 0 |
| 079 | 4 | 4 | 0 | 0 | 0 |
| 080 | 7 | 7 | 0 | 0 | 0 |
| 081 | 6 | 6 | 0 | 0 | 0 |
| 082 | 5 | 5 | 0 | 0 | 0 |
| 083 | 4 | 4 | 0 | 0 | 0 |
| 084 | 3 | 3 | 0 | 0 | 0 |
| 085 | 3 | 3 | 0 | 0 | 0 |
| 086 | 3 | 3 | 0 | 0 | 0 |
| 087 | 4 | 4 | 0 | 0 | 0 |
| 088 | 4 | 4 | 0 | 0 | 0 |
| 089 | 5 | 5 | 0 | 0 | 0 |
| 090 | 4 | 4 | 0 | 0 | 0 |
| 091 | 4 | 4 | 0 | 0 | 0 |
| 092 | 5 | 5 | 0 | 0 | 0 |
| 093 | 5 | 5 | 0 | 0 | 0 |
| 094 | 5 | 5 | 0 | 0 | 0 |
| 095 | 7 | 7 | 0 | 0 | 0 |
| 096 | 5 | 5 | 0 | 0 | 0 |
| 097 | 7 | 7 | 0 | 0 | 0 |
| 098 | 3 | 3 | 0 | 0 | 0 |
| 099 | 5 | 5 | 0 | 0 | 0 |
| 100 | 5 | 5 | 0 | 0 | 0 |
| 101 | 6 | 6 | 0 | 0 | 0 |
| 102 | 5 | 5 | 0 | 0 | 0 |
| 103 | 5 | 5 | 0 | 0 | 0 |
| 104 | 6 | 6 | 0 | 0 | 0 |
| 105 | 4 | 4 | 0 | 0 | 0 |
| 106 | 6 | 6 | 0 | 0 | 0 |
| 107 | 5 | 5 | 0 | 0 | 0 |
| 108 | 5 | 5 | 0 | 0 | 0 |
| 109 | 6 | 6 | 0 | 0 | 0 |
| 110 | 6 | 6 | 0 | 0 | 0 |
| 111 | 5 | 5 | 0 | 0 | 0 |
| 112 | 5 | 5 | 0 | 0 | 0 |
| 113 | 5 | 5 | 0 | 0 | 0 |
| 114 | 5 | 5 | 0 | 0 | 0 |
| 115 | 6 | 6 | 0 | 0 | 0 |
| 116 | 6 | 6 | 0 | 0 | 0 |
| 117 | 7 | 7 | 0 | 0 | 0 |
| 118 | 6 | 6 | 0 | 0 | 0 |
| 119 | 7 | 7 | 0 | 0 | 0 |
| 120 | 9 | 9 | 0 | 0 | 0 |
| 121 | 8 | 8 | 0 | 0 | 0 |
| 122 | 7 | 7 | 0 | 0 | 0 |
| 123 | 8 | 8 | 0 | 0 | 0 |
| 124 | 8 | 8 | 0 | 0 | 0 |
| 125 | 7 | 7 | 0 | 0 | 0 |
| 126 | 6 | 6 | 0 | 0 | 0 |
| 127 | 6 | 6 | 0 | 0 | 0 |
| 128 | 5 | 5 | 0 | 0 | 0 |
| 129 | 6 | 6 | 0 | 0 | 0 |
| 130 | 7 | 7 | 0 | 0 | 0 |
| 131 | 6 | 6 | 0 | 0 | 0 |
| 132 | 7 | 7 | 0 | 0 | 0 |
| 133 | 8 | 8 | 0 | 0 | 0 |
| 134 | 8 | 8 | 0 | 0 | 0 |
| 135 | 8 | 8 | 0 | 0 | 0 |
| 136 | 8 | 8 | 0 | 0 | 0 |
| 137 | 7 | 7 | 0 | 0 | 0 |
| 138 | 6 | 6 | 0 | 0 | 0 |
| 139 | 9 | 9 | 0 | 0 | 0 |
| 140 | 9 | 9 | 0 | 0 | 0 |
| 141 | 9 | 9 | 0 | 0 | 0 |
| 142 | 7 | 7 | 0 | 0 | 0 |
| 143 | 8 | 8 | 0 | 0 | 0 |
| 144 | 7 | 7 | 0 | 0 | 0 |
| 145 | 8 | 8 | 0 | 0 | 0 |
| 146 | 9 | 9 | 0 | 0 | 0 |
| 147 | 7 | 7 | 0 | 0 | 0 |
| 148 | 8 | 8 | 0 | 0 | 0 |
| 149 | 6 | 6 | 0 | 0 | 0 |
| 150 | 4 | 4 | 0 | 0 | 0 |

## Complete defect index

| Defect | Asset key | Severity | Region | Visible content | Expected content |
|---|---|---|---|---|---|
| S10-2026-004-RULES-001 | 004/rules | Major | explanation-rules | The table is labelled “All possible combinations” but shows only five of the eight possible A/B/carry-in triples; 001, 011 and 101 are omitted. | Either include all eight input triples with their sum/carry-out results, or relabel the table as selected common cases. |
| S10-2026-006-CONVERT-001 | 006/convert | Major | explanation-convert | Binary fraction diagram and worked result disagree: the displayed bits are 0.1010₂, which equals 0.625₁₀, but the diagram assigns 1/4 to the 2^-3 column and concludes 0.11₂ = 0.75₁₀. | Either display 0.1100₂ with 1/2 + 1/4 = 0.75, or retain 0.1010₂ and calculate 1/2 + 1/8 = 0.625. |
| S10-2026-009-UNITS-001 | 009/units | Minor | explanation-units | The unqualified statement “All measurements start as bits” is false; storage quantities may be supplied or expressed directly in bytes or larger units. Only the specific bitmap/audio size formulas in this context first produce a bit count. | State “When a formula gives a size in bits, divide by 8 to convert to bytes,” then convert onward only as required. |
| S10-2026-014-TRADEOFFS-001 | 014/tradeoffs | Minor | explanation-tradeoffs | The sound-quality row uses an image-file thumbnail as the file-size result, visually associating audio sampling changes with an image file. | Use an audio-file or neutral data-file icon for the sound-quality file-size result. |
| S10-2026-016-TOPOLOGIES-001 | 016/topologies | Minor | explanation-topologies | The same infographic presents the alternative-path layout with nine physical links in the main mechanism diagram, then labels a different eight-link drawing as the result without explaining that the inter-switch link was removed. | Use one consistent topology and link count, or explicitly state that the second drawing is a simplified eight-link variant without an inter-switch link. |
| S10-2026-019-RULES-001 | 019/rules | Major | explanation-rules | The infographic states that following protocol rules produces reliable, orderly communication, but reliability and ordered delivery are properties of particular protocols, not protocols in general; for example UDP does not guarantee them. | State that protocols define communication rules and may specify mechanisms for reliability, ordering, error handling or flow control; guarantees depend on the protocol. |
| S10-2026-023-COMPARE-001 | 023/compare | Major | explanation-compare | The comparison combines “Access Point / Gateway” as one device category and assigns both wireless access and protocol/format translation to it. A wireless access point and a gateway have distinct roles; joining them teaches an invalid equivalence. | Give wireless access point and gateway separate entries: an access point provides wireless access to a network; a gateway connects systems/networks using different protocols and may translate formats. |
| S10-2026-025-CONCEPTS-001 | 025/concepts | Minor | explanation-concepts | The throughput influence diagram duplicates the orange label ‘More congestion’ on both sides, so the specific cost associated with delay is not labelled and the visual factor-to-effect mapping is incomplete. | Replace the duplicate callout associated with delay with an explicit statement such as ‘Higher delay increases response time and can reduce effective throughput,’ while keeping one congestion callout. |
| S10-2026-026-MAP-001 | 026/map | Major | explanation-map | The network summary labels the return path “Response follows the same path back.” In packet-switched networks, return packets are routed independently and are not guaranteed to use the same path. | State that a response is sent back to the source and may take the same or a different route according to current routing decisions. |
| S10-2026-027-FLOW-001 | 027/flow | Major | explanation-flow | The “basic system flow” is drawn as a mandatory sequence Input → Processing → Memory ↔ Storage → Output, implying output must pass through secondary storage. Output normally receives processed results from the processor/primary memory; saving to secondary storage is optional and separate. | Draw processing/primary memory feeding output directly, with secondary storage as a bidirectional persistence path rather than a required stage before output. |
| S10-2026-029-FEEDBACK-001 | 029/feedback | Major | explanation-feedback | The feedback diagram is semantically inconsistent: display, auditory and haptic feedback are labelled as input and are shown feeding either printed evidence or actuator action; it also copies the auditory limitation “missed in noise or disruptive in quiet spaces” onto haptic feedback. | Treat display, auditory and haptic as alternative output/feedback forms with their own strengths and limitations; treat printed records and actuator actions as separate output types, not downstream results of those feedback forms. Give haptic limitations relevant to touch/vibration. |
| S10-2026-030-CACHE_VM-001 | 030/cache-vm | Minor | explanation-cache-vm | The cache mechanism is described as keeping “likely next data” close to the CPU. Cache generally holds copies of recently/frequently accessed memory blocks; “next” suggests a prediction/prefetch mechanism that is not guaranteed by caching itself. | Say that cache holds copies of recently or frequently used instructions/data, often in blocks that exploit locality, so a cache hit avoids slower main-memory access. |
| S10-2026-031-COMPARE-001 | 031/compare | Minor | explanation-compare | The optical-disc comparison has a “Good scenario” panel containing only a disc icon; the scenario text is missing, unlike the HDD and tape columns. This leaves one storage choice without the promised suitability guidance. | Add a correct scenario such as distributing read-only media or archiving data that changes rarely, with limitations appropriate to optical media. |
| S10-2026-031-MEDIA-001 | 031/media | Major | explanation-media | The solid-state storage mechanism is illustrated with a desktop RAM DIMM, even though the text says non-volatile flash memory and the example is an SSD. RAM is primary volatile memory and is not an example of the secondary solid-state storage being taught here. | Use an SSD/flash-memory package or NAND flash-chip illustration, not a RAM module. |
| S10-2026-035-SIGNALS-001 | 035/signals | Minor | explanation-signals | The binary-state legend equates logic 0 with “no signal.” In digital electronics, an un-driven/floating input is not reliably logic 0 and may be undefined; a valid low logic level is a signal state. | Use “logic 0 / false / off / low level” and “logic 1 / true / on / high level”; do not teach absence of a valid signal as logic 0. |
| S10-2026-037-PARSE-001 | 037/parse | Minor | explanation-parse | The parsing guide groups “unless” with “not” and “inactive” under the instruction “Invert the condition.” Unlike a direct NOT, “unless” expresses a conditional exception and what is negated depends on the full sentence. | Teach “P unless Q” in context as P when NOT Q (or Q OR P, depending the required form), and require students to identify the exact condition being negated rather than treating the word itself as a unary NOT. |
| S10-2026-038-CATEGORIES-001 | 038/categories | Major | explanation-categories | The classification table places a touchscreen only under INPUT without stating that a touchscreen also provides visual output. In a lesson framed as exclusive hardware classification, this can teach students to give only half its role. | Explicitly mark touchscreen as a combined input/output device: touch sensing is input and the display is output. |
| S10-2026-039-RELIABILITY-001 | 039/reliability | Major | explanation-reliability | The diagram treats a backup copy as a mechanism that makes the system “continue to work.” Backups support data recovery after loss; by themselves they do not provide service continuity or availability during a hardware/service failure. | Separate continuity mechanisms such as redundancy/failover/UPS from recovery mechanisms such as backup and restore; state that backups reduce data loss and recovery time but do not keep the live service running. |
| S10-2026-040-MAP-001 | 040/map | Minor | explanation-map | The topic hierarchy places virtual memory as a child of “Memory (primary),” which visually classifies virtual memory as primary memory. Virtual memory is a memory-management technique that uses secondary storage to extend the apparent address space when RAM is insufficient. | Place virtual memory between primary memory and secondary storage, or label it as a technique that uses secondary storage to supplement RAM rather than a type of primary memory. |
| S10-2026-041-CPU_MAP-001 | 041/cpu-map | Minor | explanation-cpu-map | The bus-role table says the control bus carries control signals “from the CPU to memory,” omitting the reverse direction even though the same image draws the control bus bidirectionally. Some control signals, such as interrupts and acknowledgements, travel toward the CPU. | State that the control bus is bidirectional overall: the CPU sends read/write and timing/control signals, while devices/controllers can send signals such as interrupts or status/acknowledgements back. |
| S10-2026-044-THREE_BUSES-001 | 044/three-buses | Major | explanation-three-buses | The control-bus diagram shows a one-way arrow from CPU to “Control and timing functions” while its own text lists interrupt signals. Interrupts travel from devices/controllers toward the CPU, so the control bus is not one-way in that direction. | Draw the control bus as bidirectional and explain examples in each direction, such as read/write from CPU and interrupts/status toward CPU. |
| S10-2026-049-CORES-001 | 049/cores | Minor | explanation-cores | The single-threaded case says “Only one core is used; other cores are idle.” A single thread can use only one core at a time, but other cores need not be idle because the operating system and other processes may use them. | State that the single-threaded task itself cannot run concurrently across multiple cores; additional cores may still execute other tasks. |
| S10-2026-050-COMPARE-001 | 050/compare | Major | explanation-compare | The pipelined timing table stops at cycle 4 with instruction 3 only decoded; it omits cycle 5 where instruction 3 executes. Thus the comparison never completes all three instructions even though the non-pipelined side does. | Add cycle 5 and E3 for instruction 3, showing completions at cycles 3, 4 and 5 in the ideal three-stage pipeline. |
| S10-2026-051-MAP-001 | 051/map | Major | explanation-map | The FDE concept map places MDR to CIR in the Decode stage and labels Fetch as PC to MAR to MDR. The instruction transfer from MDR to CIR is part of fetching the current instruction; decoding begins after CIR holds it. The shorthand also looks like the address passes from MAR into MDR. | Show Fetch as PC to MAR, memory read to MDR, MDR to CIR, and PC increment; show Decode as the CU interpreting the opcode and identifying operands from the instruction in CIR. |
| S10-2026-055-COMPARE-001 | 055/compare | Minor | explanation-compare | The utility-selection table gives “Defragmentation” for an old HDD that opens files slowly but leaves the entire exam-quality reason cell blank. The visual promises diagnosis plus justification, so the final row is an incomplete answer. | Add that defragmentation rearranges related file blocks contiguously on a magnetic disk, reducing read-head movement and potentially improving access time; also state it does not give the same benefit to SSDs. |
| S10-2026-057-LEXICAL-001 | 057/lexical | Major | explanation-lexical | The lexical-analysis token table classifies punctuation and delimiters such as semicolon, parentheses and braces as OPERATOR tokens. These symbols delimit statements or grouping; they are not all operators like assignment or greater-than. | Use distinct token categories such as KEYWORD, IDENTIFIER, OPERATOR, LITERAL/CONSTANT and DELIMITER/PUNCTUATION; classify equals and greater-than as operators, and semicolon, parentheses and braces as separators or delimiters. |
| S10-2026-061-RETRIEVAL-001 | 061/retrieval | Major | explanation-retrieval | The source-to-execution flow sends Compiler, Interpreter and Assembler through one shared Object/Executable Code stage and then through Linker/Loader. An interpreter normally executes source incrementally and does not produce a permanent object/executable artifact for linking and loading. | Split the paths: compiler or assembler may produce object code for linking and loading; interpreter translates and executes source directly at runtime without the object-file/linker path. |
| S10-2026-069-VERIFICATION-001 | 069/verification | Major | explanation-verification | The verification-method table states that a match means Data is accurate for double entry, visual checking, proofreading and transfer checks. A match only provides evidence of agreement with the comparison source or second entry; it does not guarantee accuracy, especially if the source is wrong or the same error is entered twice. | Use Match: entries or data agree; accept only if the checking procedure and trusted source requirements are satisfied. State explicitly that verification reduces copying/transmission errors but does not guarantee truth. |
| S10-2026-071-CONTROLS-001 | 071/controls | Major | explanation-controls | Verification control is stated to make data accurate and reliable, but verification only checks that entered or transferred data matches a source or repeated entry; matching data may still be false. | State that verification checks agreement with the source or repeated entry and does not guarantee that the source data is accurate. |
| S10-2026-074-IP-001 | 074/ip | Minor | explanation-ip | The headline says intellectual property protects created ideas and expressions, which can imply that abstract ideas themselves are protected. Copyright protects expression, while patents protect qualifying inventions under specific conditions. | Use intellectual property protects qualifying creations, expressions, designs and inventions; avoid saying that ideas as such are automatically protected. |
| S10-2026-081-PRIMARY-001 | 081/primary | Minor | explanation-primary | The image states that a primary key must satisfy four rules including stability. Uniqueness and non-null identification are required, and minimality belongs to candidate-key selection, but stability is a design preference rather than a formal relational key constraint. | Present stability as a desirable property when choosing among candidate keys, not a mandatory defining rule of every primary key. |
| S10-2026-083-NORMAL_FORMS-001 | 083/normal-forms | Major | explanation-normal-forms | The worked 2NF-to-3NF progression is not dependency preserving: the After 2NF state contains Course(Course, CourseName, Tutor), but the After 3NF state drops the Course relation and CourseName entirely and places TutorID in Enrollment without a shown dependency. This loses data and changes the model rather than only removing a transitive dependency. | Retain Course and CourseName, replace the transitive tutor name dependency with a Tutor relation, and place TutorID only in the relation determined by the stated functional dependency. |
| S10-2026-085-AGGREGATES-001 | 085/aggregates | Minor | explanation-aggregates | The COUNT(*) row says it counts records or non-null values. COUNT(*) counts rows regardless of nulls; COUNT(column) counts non-null values in that column. | Separate COUNT(*) counts all result rows from COUNT(column) counts non-null values in the named column. |
| S10-2026-092-MAP-001 | 092/map | Major | explanation-map | The Sections 5-6 knowledge map draws Assembler, Compiler, Interpreter, Linker, Loader and Libraries as one serial pipeline. An assembler, compiler and interpreter are alternative translator paths; an interpreter does not normally produce object code for a linker and loader. | Show separate paths: assembly source to assembler to machine/object code; high-level source to compiler to object code then linker/loader; high-level source to interpreter for direct translation and execution. |
| S10-2026-093-DATABASES-001 | 093/databases | Major | explanation-databases | The normalisation before/after diagram loses the B data. The original rows contain A and B values, but the after state shows Table A with A1/A2 and Table B containing only a foreign-key-to-A column, so B1/B2/B3 are no longer represented. | Keep a relation containing each B value and the appropriate foreign key, or introduce a linking relation if the dependency requires it; every original fact must remain reconstructable. |
| S10-2026-104-BINARY-001 | 104/binary | Major | explanation-binary | The binary-search algorithm calculates Mid as (Low + High) / 2. In Cambridge pseudocode, / is real division, so an odd sum can produce a non-integer that cannot index an array. | Use Mid <- (Low + High) DIV 2, with a stated rounding convention if another language is used. |
| S10-2026-105-BUBBLE-001 | 105/bubble | Major | explanation-bubble | The worked bubble-sort table reports 2 swaps in Pass 2 for state [1,4,2,5,8]. Only 4 and 2 are inverted, so that pass performs exactly 1 swap and produces [1,2,4,5,8]. | Change Pass 2 swaps to 1; keep Pass 1 as 3 and Pass 3 as 0. |
| S10-2026-113-CHOOSE-001 | 113/choose | Major | explanation-choose | The type decision tree asks Will arithmetic be performed? and sends every Yes answer directly to INTEGER. Arithmetic may require REAL when values contain decimals, so a decimal measurement such as temperature is misclassified before the decimal check is reached. | First establish whether the value is numeric, then choose INTEGER for whole-number-only values and REAL when fractional values are possible. |
| S10-2026-113-USER_DEFINED-001 | 113/user-defined | Major | explanation-user-defined | The Cambridge-style composite type example opens TYPE TStudent and declares fields but never closes the type with ENDTYPE. | Add ENDTYPE after the last field declaration before declaring variables of TStudent. |
| S10-2026-115-ACCESS-001 | 115/access | Minor | explanation-access | The generic access diagram uses indexes 0 to n-1 without declaring array bounds or labelling a language, while the lesson immediately teaches Cambridge arrays with declared 1-based bounds. Students may infer that Cambridge arrays are inherently zero-based. | Declare the array bounds explicitly in this diagram or label it as a zero-based example; keep index examples consistent with the stated bounds. |
| S10-2026-117-UPDATE-001 | 117/update | Major | explanation-update | The image presents Cambridge-style conditional update code beginning IF Scores[Index] < 50 THEN but never closes the selection with ENDIF; the conditional fragment is also shown outside the traversal that defines Index. | Show the conditional inside a FOR traversal and close it with ENDIF before NEXT Index. |
| S10-2026-118-DECLARE-001 | 118/declare | Major | explanation-declare | The Cambridge record declaration opens TYPE TStudent and lists fields but omits ENDTYPE, making the displayed type definition incomplete. | Insert ENDTYPE after Enrolled : BOOLEAN, then declare Student1 : TStudent. |
| S10-2026-118-PSEUDOCODE-001 | 118/pseudocode | Major | explanation-pseudocode | The Cambridge-style TBook record definition omits ENDTYPE before DECLARE Book1 : TBook. | Close the record definition with ENDTYPE before declaring Book1. |
| S10-2026-119-CONCEPT-001 | 119/concept | Major | explanation-concept | The panel states Students[5] selects one named value inside that record. Students[5] selects the whole record; a field selector such as .Mark is required to select one named value. | State Students[5] selects record 5; Students[5].Mark selects the Mark field of that record. |
| S10-2026-119-DECLARE-001 | 119/declare | Major | explanation-declare | The image presents a complete Cambridge-style record declaration and immediately declares an array, but the TYPE TStudent block is never closed with ENDTYPE. | Insert ENDTYPE after the Enrolled field and before DECLARE Students. |
| S10-2026-123-ARRAY-001 | 123/array | Major | explanation-array | The array-summing algorithm uses Total <- Total + Scores[Index] without first initialising Total, so the result is undefined or depends on an unspecified prior value. | Set Total <- 0 before the FOR loop, then add each element and output Total after the loop. |
| S10-2026-123-PSEUDOCODE-001 | 123/pseudocode | Major | explanation-pseudocode | The Cambridge-style TBook record definition lists fields but omits ENDTYPE before declaring the array Books. | Add ENDTYPE after Pages : INTEGER, then DECLARE Books : ARRAY[1:200] OF TBook. |
| S10-2026-123-RECORD-001 | 123/record | Major | explanation-record | The TStudent record definition used to justify an array of records omits ENDTYPE. | Close the TStudent definition with ENDTYPE before declaring Students. |
| S10-2026-125-DECLARE-001 | 125/declare | Major | explanation-declare | The image explicitly labels the left panel Cambridge-style pseudocode and exam standard, but TYPE TStudent has no ENDTYPE before the Students array declaration. | Insert ENDTYPE after the Mark field and before DECLARE Students. |
| S10-2026-125-FILES-001 | 125/files | Major | explanation-files | The Cambridge pseudocode declaration review opens TYPE TStudent and then declares Students without closing the record type with ENDTYPE. | Insert ENDTYPE after Mark : INTEGER and before DECLARE Students. |
| S10-2026-130-PROCEDURE-001 | 130/procedure | Minor | explanation-procedure | The headline says a procedure does not have to return a value, which can imply that returning a value is optional. In Cambridge pseudocode, procedures perform actions and do not return a value; functions return values. | Say a procedure performs actions and does not return a value. |
| S10-2026-137-PURPOSE-001 | 137/purpose | Major | explanation-purpose | The displayed validation-rule pseudocode has IF and ELSE branches but no ENDIF. The same visual asks which test values 'prove' the rule works, overstating what selected test cases establish. | Close the selection with ENDIF. Say that chosen normal, boundary and erroneous cases provide evidence for the tested cases, not proof for every possible input. |
| S10-2026-137-VALIDATION-001 | 137/validation | Major | explanation-validation | The image says Testing proves whether the check works. Testing a finite set of cases can show correct behaviour for those cases and expose faults, but cannot prove the program is correct for every possible input. | Use Testing checks whether the validation rule behaves as expected for the selected normal, boundary and erroneous cases. |
| S10-2026-138-PURPOSE-001 | 138/purpose | Major | explanation-purpose | The image introduces the example as syntactically valid but logically wrong, yet closes the Cambridge selection with END IF rather than the required ENDIF. The example therefore contains a syntax error in addition to the intended boundary error. | Change END IF to ENDIF while retaining Mark > 50 as the deliberate logic fault, or explicitly label both faults. |
| S10-2026-145-EVALUATION-001 | 145/evaluation | Major | explanation-evaluation | Evidence does not justify the displayed success judgements: 8 of 10 users and 95 of 100 searches meet unqualified criteria, yet both are labelled criterion met. | State a threshold in each criterion, or judge the unqualified criterion as not fully met. |
| S10-2026-146-COMMANDS-001 | 146/commands | Major | explanation-commands | The Evaluate row says give cause and consequence in context, which is the function of Explain and conflicts with the adjacent definition make a judgement using evidence. | Evaluate by judging quality or value using relevant evidence; use cause and consequence to explain. |
| S10-2026-146-LIFECYCLE-001 | 146/lifecycle | Major | explanation-lifecycle | The visual presents Analysis, Design, Implementation and Operation as the lifecycle map, omitting coding, testing and maintenance required by the current syllabus. | For this syllabus, show analysis, design, coding, testing and maintenance; any broader implementation or operation framing must be explicitly supplementary. |
| S10-2026-146-TESTING-001 | 146/testing | Major | explanation-testing | The 21st reservation is labelled boundary invalid even though the stated system accepts a valid reservation request by placing it on a waiting list or applying a capacity rule. | Treat it as a boundary or just-outside-capacity case with the defined expected business-rule outcome; do not call the request invalid unless invalidity is a stated requirement. |
| S10-2026-147-STRUCTURES-001 | 147/structures | Minor | explanation-structures | Both array diagrams show only zero-based bounds 0 to n minus 1 without declaring that convention, which can imply Cambridge pseudocode arrays are inherently zero-indexed. | Declare explicit lower and upper bounds, or label zero-based indexing as a chosen example rather than a universal rule. |
| S10-2026-149-CONSTRUCTS-001 | 149/constructs | Major | explanation-constructs | Unknown record count is mapped directly to REPEAT UNTIL. An unknown count alone does not establish a post-condition loop and file records are normally guarded by WHILE NOT EOF. | Choose the loop from when the stopping condition is tested: use WHILE NOT EOF for a file of unknown length; use REPEAT UNTIL only when the body must execute before checking. |
| S10-005-SYSTEMS-001 | 005/systems | Major | Sign-and-magnitude input row | The panel headed 'Input: Positive binary value' starts with 10010111. | Positive 23 must be 00010111 before the sign bit is changed to form 10010111. |
| S10-005-SYSTEMS-002 | 005/systems | Major | Sign-and-magnitude result row | The drawn result contains seven cells: 1001011. | The 8-bit sign-and-magnitude result for -23 is 10010111. |
| S10-005-SYSTEMS-003 | 005/systems | Major | One's-complement input row | The drawn positive input contains seven cells: 0001011. | The 8-bit positive input for 23 is 00010111. |
| S10-005-SYSTEMS-004 | 005/systems | Major | Two's-complement input row | The drawn positive input contains seven cells: 0001011. | The 8-bit positive input for 23 is 00010111. |
| S10-005-SYSTEMS-005 | 005/systems | Major | Two's-complement inverted row | The drawn inverted value contains seven cells: 1110100. | Inverting 00010111 in eight bits gives 11101000. |
| S10-005-SYSTEMS-006 | 005/systems | Major | Two's-complement add-one result row | The drawn result contains seven cells: 1110101. | Adding 1 to 11101000 gives the 8-bit result 11101001. |
| S10-005-RANGE-001 | 005/range | Major | One's-complement row | The diagram labels the representation as a separate 'Sign bit' followed by 'Magnitude'. | One's complement does not store an independent magnitude field: the negative representation is formed by inverting every bit of the positive representation. |
| S10-005-RANGE-002 | 005/range | Major | Two's-complement row | The diagram labels the representation as a separate 'Sign bit' followed by 'Magnitude'. | Two's complement does not store an independent magnitude field: the most-significant bit has negative place value and all eight bits form one representation. |
| S10-006-PRECISION-001 | 006/precision | Critical | Worked 0.1 approximation | The image calls 0.0001₂ = 0.0625 the closest value to 0.1 with four fractional bits and gives an error of 0.0375. | With four fractional bits, the nearest representable value is 0.0010₂ = 0.125, whose absolute error is 0.025. The shown 0.0001₂ is valid only as truncation, not as the closest approximation. |
| S10-093-SQL-001 | 093/sql | Major | Bottom 'How clause choice changes the result' flow | The numbered arrows present SELECT → WHERE → ORDER BY → GROUP BY as a single step-by-step clause sequence. | Do not present the four independently described clauses as this execution pipeline. If illustrating SQL syntax order, GROUP BY must precede ORDER BY; logical evaluation order also differs from the sequence shown. |
| S10-004-METHOD-001 | 004/method | Critical | Output panel and overflow inset | The image states that C_out indicates overflow and lists C_out = 1 as an overflow condition while also giving the signed 8-bit range. | A carry-out is the unsigned-overflow test. For signed two's-complement addition, carry-out alone neither proves nor rules out overflow; signed overflow occurs when same-sign operands produce a result with the opposite sign. |
| S10-005-TWOS-001 | 005/twos | Critical | Top positive-to-negative conversion flow | The flow writes an 8-bit positive value, inverts every bit, and immediately labels the inverted value as two's complement; its example converts 00101101 to 11010010. | To form the negative two's-complement value, add 1 after inversion. For +45, 00101101 → 11010010 → 11010011, which represents -45. |
| S10-020-ADDRESSES-001 | 020/addresses | Major | Bottom decision rule | The decision rule says 'Different networks? Use IP address' versus 'Same local network? Use MAC address'. | Local IP communication uses both address types: the destination IP identifies the endpoint while the destination MAC address delivers the frame on the local link. Routed communication also uses IP end-to-end and MAC addresses hop by hop. |
| S10-035-GATES-001 | 035/gates | Major | Main gate-rules table | The title says 'The six gate rules', but the table contains only NOT, AND, OR and NAND. | A six-gate summary must also include NOR and XOR, with their expressions and output conditions. |
| S10-042-CYCLE-VISUAL-001 | 042/cycle-visual | Major | Step 3 PC/MDR/CIR diagram | The orange line labelled 'increment PC' leaves the PC box and its arrowhead enters the CIR box. | Incrementing the PC updates the PC itself; only the fetched instruction should move from MDR to CIR. |
| S10-101-EQUIVALENCE-001 | 101/equivalence | Major | Right pseudocode-equivalent panel | The IF...THEN...ELSE code has no ENDIF. | The pseudocode equivalent must end with ENDIF. |
| S10-101-FLOWCHARTS-001 | 101/flowcharts | Critical | Example flowchart | The chart repeatedly adds Mark to Total, never calculates Average, yet outputs Average when Mark >= 50; the No branch loops back for another input. | A worked flowchart must only output a value that has been assigned and must use a termination/count rule consistent with the intended algorithm. |
| S10-102-PSEUDOCODE-001 | 102/pseudocode | Major | Java support panel | The Java loop inputs number but never adds number to total, and the panel never outputs total, while the result says it computes the sum. | The support code must execute total += number inside the loop and output total after the loop. |
| S10-100-PSEUDOCODE-001 | 100/pseudocode | Major | Cambridge-style pseudocode steps | The IF Mark >= 50 THEN block is not closed before NEXT Count. | Insert ENDIF after PassCount <- PassCount + 1 and before NEXT Count. |
| S10-103-CHECKS-001 | 103/checks | Minor | Length-check row | The description says the input has the 'required number' of characters, but the rule is LENGTH(Postcode) <= 8 and the stated risk is only being too long. | Describe this example as a maximum-length check, or use equality/range limits if an exact required length is intended. |
| S10-103-PSEUDOCODE-001 | 103/pseudocode | Major | Cambridge-style pseudocode panel | The code uses UNTIL without a preceding REPEAT and opens IF...THEN without ENDIF. | A post-condition validation loop must use REPEAT ... UNTIL, and the nested selection must be closed with ENDIF. |
| S10-103-PSEUDOCODE-002 | 103/pseudocode | Major | Java support panel | The Java code ends with '} while (...)' but has no opening 'do {' block. | A Java do-while loop must begin with do { before the input and condition body. |
| S10-104-PSEUDOCODE-001 | 104/pseudocode | Major | Linear-search pseudocode | The IF List[Index] = Target THEN block is not closed before Index is incremented and ENDWHILE. | Close the selection with ENDIF before the index increment (or after it, according to the chosen structure). |
| S10-106-INITIALISE-001 | 106/initialise | Critical | Maximum/minimum output column and bottom flow | After the four-score loop, the diagram separately inputs one Value and assigns both Maximum and Minimum from it; it never compares the processed scores with either variable. | For a maximum/minimum over the scores, initialise both from the first score (or safe bounds) and update them with comparisons while processing every score. |
| S10-106-PSEUDOCODE-001 | 106/pseudocode | Major | Central Cambridge-style solution | The IF Mark >= 50 THEN branch rejoins the loop without an ENDIF. | Close the conditional with ENDIF before NEXT Index. |
| S10-106-SENTINEL-001 | 106/sentinel | Critical | Central pseudocode panel | The pseudocode inputs Number once before WHILE but never inputs the next Number inside the loop, so any first non-sentinel value causes an infinite loop. | INPUT Number must occur again at the end of the WHILE body before ENDWHILE. |
| S10-107-PSEUDOCODE-001 | 107/pseudocode | Major | Cambridge-style vowel-count pseudocode | The multi-line IF condition and increment are followed directly by NEXT Index; ENDIF is missing. | Close the IF block with ENDIF before NEXT Index. |
| S10-108-MODEL-001 | 108/model | Major | Bottom decision rule | The image says the loop with the wider range should be the outer loop and the narrower range the inner loop. | Outer-versus-inner placement is determined by the required traversal and grouping, not by which loop has more iterations; either loop may have the larger range. |
| S10-108-PSEUDOCODE-001 | 108/pseudocode | Major | Java reference code | The Java version calculates product but does not output it, while the pseudocode outputs Product and the caption says both express the same structure. | The Java inner loop must also output product if it is presented as the same algorithm. |
| S10-109-PSEUDOCODE-001 | 109/pseudocode | Major | Cambridge-style reasoning code | The IF List[Index] = Target THEN block is followed directly by NEXT Index without ENDIF. | Close the selection with ENDIF before NEXT Index. |
| S10-110-CONVERSION-001 | 110/conversion | Major | Step 2 'Choose variables' graphic | Under 'Use clearer names', the arrows point from Mark, Index and PassCount to the less descriptive m, i and pc. | The direction must run from abbreviated draft names m/i/pc to the clearer names Mark/Index/PassCount. |
| S10-110-JAVA-001 | 110/java | Major | Cambridge-style version | The IF Mark[Index] >= 50 THEN block is not closed before NEXT Index. | Close the conditional with ENDIF before NEXT Index. |
| S10-111-PSEUDOCODE-001 | 111/pseudocode | Major | Central Cambridge pseudocode | The IF Mark >= 50 THEN block is followed by NEXT Index without ENDIF. | Close the selection with ENDIF before NEXT Index. |
| S10-112-PSEUDOCODE-001 | 112/pseudocode | Critical | Central Cambridge-style answer | The loop inputs Value once before WHILE and never inputs another value inside the loop, so a non-sentinel first value cannot change and the loop does not terminate. | INPUT Value must be repeated at the end of the WHILE body before ENDWHILE. |
| S10-112-PSEUDOCODE-002 | 112/pseudocode | Major | Java support panel | The Java code declares Average as int and assigns Total / Count, causing integer division and discarding any fractional average. | Use a floating-point type and conversion, for example double average = (double) total / count. |
| S10-113-WHY-TYPES-001 | 113/why-types | Major | BOOLEAN and DATE pseudocode examples | Both IF...THEN examples omit ENDIF. | Each structured selection example should be closed with ENDIF. |
| S10-116-PSEUDOCODE-001 | 116/pseudocode | Major | Java support code | The nested Java loops have an empty body, whereas the Cambridge version outputs Marks[Row, Column]. | The Java inner loop must output the current cell if it is presented as the corresponding Java form. |
| S10-117-PSEUDOCODE-001 | 117/pseudocode | Major | Cambridge pseudocode | The IF block is followed by NEXT Index without ENDIF. | Close the selection with ENDIF before NEXT Index. |
| S10-117-PSEUDOCODE-002 | 117/pseudocode | Major | Both algorithm columns | Neither the pseudocode nor Java column outputs passCount, although the maintained algorithm ends with OUTPUT PassCount and the caption says both versions count the qualifying elements. | Both complete versions should report the final count after the loop. |
| S10-117-SEARCH-001 | 117/search | Major | Mechanism pseudocode | The IF Names[Index] = TargetName THEN block has no ENDIF before NEXT Index. | Close the selection with ENDIF before NEXT Index. |
| S10-119-OPERATIONS-001 | 119/operations | Major | Top search/count/update diagram | Arrows connect Search → Count → Update as one pipeline, so a name-search match appears to increment Count, output details, and then perform a mark-based update. | Search, count and update are alternative operations that may share a traversal skeleton; each has its own condition and action and must not be shown as mandatory consecutive stages. |
| S10-119-TRAVERSAL-001 | 119/traversal | Major | Mechanism pseudocode | The IF Students[Index].Mark >= 70 THEN block is followed by NEXT Index without ENDIF. | Close the selection with ENDIF before NEXT Index. |
| S10-121-TYPES-001 | 121/types | Major | Incorrect and correct pseudocode comparison blocks | Both IF...THEN snippets omit ENDIF. | Close each selection example with ENDIF so the pictured Cambridge pseudocode is structurally valid. |
| S10-126-JAVA-001 | 126/java | Major | Cambridge-style pseudocode | The IF...ELSE selection has no ENDIF. | Close the Cambridge-style selection with ENDIF. |
| S10-126-SELECTION-001 | 126/selection | Major | IF and CASE pseudocode blocks | The IF selection omits ENDIF and the CASE selection omits ENDCASE. | Close the two structures with ENDIF and ENDCASE respectively. |
| S10-127-JAVA-001 | 127/java | Major | Cambridge CASE pseudocode | The CASE OF structure ends after the OTHERWISE branch without ENDCASE. | Close the Cambridge CASE selection with ENDCASE. |
| S10-129-REPEAT-001 | 129/repeat | Major | Central post-condition loop | The diagram performs INPUT Mark before REPEAT and then performs INPUT Mark again as the first loop action, so two inputs occur before the first condition check. | For a post-condition validation loop, place the input once inside REPEAT and test it at UNTIL; do not add a second pre-loop input. |
| S10-129-SENTINEL-001 | 129/sentinel | Critical | Central sentinel-loop pseudocode | Value is input only before WHILE and never updated inside the loop, so a non-sentinel first value cannot become -1 and the loop does not terminate. | Read the next Value at the end of the WHILE body before ENDWHILE. |
| S10-130-PARAMETERS-001 | 130/parameters | Major | Function definition and second call example | Both pictured IF structures omit ENDIF; the second call example also stops before closing its IF. | Close each Cambridge structured selection with ENDIF. |
| S10-139-INTEGRATION-001 | 139/integration | Major | Validation function | The IF Mark >= 0 AND Mark <= 100 THEN block is followed by RETURN FALSE without ENDIF. | Close the selection with ENDIF before the false return. |
| S10-139-VALIDATION-001 | 139/validation | Critical | Validation loop and pseudocode | Mark is input once before REPEAT, but the repeated body never reads another mark; invalid input therefore repeats forever. | INPUT Mark must be inside the REPEAT body so each retry obtains a new value. |
| S10-141-FRAGMENT-001 | 141/fragment | Major | Logic-loop pseudocode | The IF Marks[Index] >= 50 THEN block is not closed before NEXT Index. | Close the selection with ENDIF before NEXT Index. |
| S10-141-JAVA-001 | 141/java | Major | Cambridge-style pseudocode | The IF Marks[Index] >= 50 THEN block is not closed before NEXT Index. | Close the selection with ENDIF before NEXT Index. |
| S10-141-SUBROUTINES-001 | 141/subroutines | Major | Function definition | The IF Mark >= 50 THEN block is followed by RETURN FALSE without ENDIF. | Close the selection with ENDIF before the false return. |
| S10-141-VALIDATION-001 | 141/validation | Critical | Review-fragment validation loop | Mark is input only before the loop; the retry route prints a prompt and sets Valid to FALSE but never reads a replacement mark, so it cannot become valid. | Read Mark again on the invalid route or put INPUT Mark inside the REPEAT body. |
| S10-140-LOOPS-001 | 140/loops | Major | Post-condition-loop pseudocode form | The post-condition form is shown as DO ... ENDWHILE, which neither states the terminating condition nor uses the course's Cambridge REPEAT...UNTIL structure. | Show REPEAT, the body, then UNTIL Condition for the post-condition loop. |
| S10-051-RETRIEVAL-001 | 051/retrieval | Critical | Central register/bus retrieval grid | Address and data/instruction arrows from PC, MAR and MDR all feed into a single column labelled Control bus before memory, visually making the control bus carry address and data values. | Addresses travel on the address bus, data/instructions on the data bus, and only control/timing signals on the control bus. |
| S10-089-SQL-001 | 089/sql | Major | Typical processing-order column | The image orders FROM → WHERE → ORDER BY → GROUP BY → SELECT, placing sorting before grouping and SELECT last. | For the clauses shown, the logical processing order is FROM → WHERE → GROUP BY → SELECT → ORDER BY. |
| S10-129-WHILE-001 | 129/while | Critical | Password WHILE example | Password is input only before WHILE; the loop prints "Try again" but never reads another password, so an initially incorrect password can never change and the loop does not terminate. | Read Password again inside the loop after the retry prompt. |
| S10-133-CASE-001 | 133/case | Major | Cambridge-style pseudocode | The IF Answer = "Y" THEN block stops after OUTPUT "Continue" without ENDIF. | Close the selection with ENDIF. |
| S10-144-ALGORITHMS-001 | 144/algorithms | Major | Cambridge-style nested selection | The two nested IF blocks are followed directly by NEXT Booking without either ENDIF. | Close both the inner overlap test and outer room/date test before NEXT Booking. |
| S10-127-CASE-001 | 127/case | Major | CASE selection | The CASE Choice OF structure lists its branches and OTHERWISE but never closes with ENDCASE. | Close the multi-way selection with ENDCASE after OTHERWISE. |
| S10-123-DECISION-001 | 123/decision | Critical | ISBN data-type row | The diagram maps 'ISBN has digits' to a numeric/digits field and concludes that an ISBN fits that field. | Store an ISBN as text/string: it is an identifier, may have leading zeroes or hyphens, and ISBN-10 can end in X; it is not used for arithmetic. |
| S10-149-TIMING-001 | 149/timing | Major | Marks-to-time table | The table assigns 5 marks only 60 seconds but assigns 3 marks 90 seconds, contradicting the title and instruction to allocate time in proportion to marks. | A proportional timing model must allocate more time to 5 marks than to 3 marks, using one consistent marks-per-minute rule. |
| S10-050-TIMING-001 | 050/timing | Critical | Pipeline timing table | Instructions 1-4 correctly execute in cycles 3-6, then the table shows them executing a second time in the drain region at cycles 7, 8 and later. | Each instruction executes once. If instruction 4 is the last fetched instruction, draining consists of its remaining decode/execute work and the pipeline is empty after its cycle-6 execution. |
| S10-060-PIPELINE-001 | 060/pipeline | Critical | Interpreter route | The interpreter path points to the same Executable/program ready to run artifact as the compiled and assembled paths. | An interpreter normally translates and executes source statements directly and does not produce a separate permanent executable file. |
| S10-120-READER-001 | 120/reader | Major | Result-loop sequence | The result panel orders READ next line before CHECK NOT EOF, contradicting the safe mechanism panel and risking a read past the end of the file. | Check NOT EOF first; only read the next line when more data exists. |
| S10-126-CONSTRUCTS-001 | 126/constructs | Major | Core-constructs table | The title promises three control-flow ideas, but the table contains only Sequence and Selection; Iteration is absent. | Include iteration with its loop question, pseudocode forms and typical errors alongside sequence and selection. |
| S10-126-ITERATION-001 | 126/iteration | Major | Counter-controlled-loop result | The result panel states that a counter-controlled loop's condition is checked after each iteration. | A FOR loop determines/checks whether the next counter value is within its bounds before executing that iteration; it may execute zero times for incompatible bounds. |
| S10-139-PARAMETERS-001 | 139/parameters | Major | DisplayResult module and return-flow labels | DisplayResult(Grade) is shown as returning 'output to screen' under a legend labelled Return only what is needed, conflating a procedure's output side effect with a function return value. | GetValidMark and CalculateGrade may return values; DisplayResult should be a procedure that performs OUTPUT and returns no value. |
| S10-056-CONCEPT-001 | 056/concept | Major | Translator result stages | The diagram makes both a compiler and an assembler produce generic object code that is then 'converted' into machine code as a separate translation step. | Compilers and assemblers emit target machine/object code; object modules may then be linked and loaded, not translated again by an unnamed object-to-machine conversion. |
| S10-020-ADDRESS-JOURNEY-001 | 020/address-journey | Major | Local-link packet diagram | A box labelled Packet on the local link shows both Destination IP address and Destination MAC address as fields of that packet. | The destination IP address belongs to the network-layer packet; the destination MAC address belongs to the link-layer frame that encapsulates it for the local hop. |
| S10-148-SELECTION-001 | 148/selection | Major | IF and CASE examples | The IF example omits ENDIF and the CASE example omits ENDCASE. | Close the structured selections with ENDIF and ENDCASE. |
| S10-148-SUBPROGRAMS-001 | 148/subprograms | Major | Function example | The IF Mark >= 0 AND Mark <= 100 THEN block is followed by RETURN FALSE without ENDIF. | Close the selection with ENDIF before the false return. |
| S10-117-COUNT-001 | 117/count | Major | Left pseudocode summary | The IF Scores[Index] >= 50 THEN block is not closed with ENDIF. | Close the selection with ENDIF before the loop continues. |
| S10-132-SHADOWING-001 | 132/shadowing | Major | Procedure example and scope labels | The image says a local Score hides the global Score, but the procedure only assigns Score <- 80 and never declares a local Score. | A shadowing example must explicitly declare a local variable with the same name inside the procedure before using it. |
| S10-095-TIMING-001 | 095/timing | Major | Mark-to-time guidance | The image assigns 30-45 seconds to a 3-4 mark response and also assigns 1-2 minutes to a 3-4 mark trace, without stating a condition that explains the different timing. | Equal mark values need consistent time guidance, or the diagram must clearly identify why a trace question requires a different allocation. |
| S10-047-MODES-001 | 047/modes | Major | Main addressing-mode comparison | The title promises four common addressing modes, but the diagram only presents Immediate and Indirect addressing. | A four-mode comparison must also show Direct and Indexed addressing, or the title must say that only two modes are being compared. |

## Prioritised repair batches

### Batch 1: Critical

- None

### Batch 2: Major

- None

### Batch 3: Minor

- None

## Interpretation

Audit completion and release readiness are separate. This audit is complete, but unresolved Critical or Major defects keep the course release blocked.
