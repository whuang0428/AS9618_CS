# Lesson 031: Output, storage devices and primary memory

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice contain the assessed syllabus points added for this lesson. Other activities remain part of this lesson unless they are individually labelled Optional.
<!-- remediation-v2-stage3-scope:end -->

<!-- remediation-v2-optional:start -->
> **Optional enrichment:** cache and virtual-memory detail in the hardware section. This material is excluded from compulsory syllabus coverage, first-use and assessment statistics.
>
> **Formal AS prerequisite:** S3.05-S3.07 RAM, ROM, SRAM, DRAM, PROM, EPROM and EEPROM; cache belongs to S4.05.
<!-- remediation-v2-optional:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Output, storage devices and primary memory

### Direct explanation

- A laser printer charges a drum, a laser discharges selected points, toner adheres to the image, toner transfers to paper and heat/pressure fuse it. A 3D printer deposits or solidifies material layer by layer from a digital model.
- A speaker uses a DAC/amplifier to drive a coil and cone, producing pressure waves. An output buffer temporarily holds data because the processor can produce it faster or in different-sized bursts than a printer or audio device can consume it.
- An HDD spins magnetic platters while an actuator positions read/write heads; writing changes magnetic orientation and reading senses it. Flash memory stores charge in floating-gate cells and has no moving parts.
- An optical drive spins a disc and directs a laser at its track. Reflected-light differences are read as data; a writer uses a higher-power laser to change a dye or recording layer.
- A magnetic HDD uses moving read/write heads over rotating platters. Flash memory stores charge electronically with no moving parts. An optical disc reader/writer uses a laser to read marks and, on writable media, to create or alter marks.
- RAM is volatile read/write primary memory used for programs and data currently being processed. ROM is non-volatile primary memory used for instructions that must remain when power is removed, such as firmware or start-up instructions. ROM is not ordinary long-term storage for user files.
- SRAM stores bits using flip-flop circuits, needs no refresh and is fast but expensive with lower density, so it is used for cache. DRAM stores charge in capacitors, requires refresh and is slower but cheaper and denser, so it is used for main memory.
- PROM is programmed once. EPROM can be erased with ultraviolet light and reprogrammed. EEPROM is erased and rewritten electrically, often without removing it from the system. All three are non-volatile ROM technologies.
- A buffer temporarily holds data when connected components operate at a different speed or transfer data in different-sized bursts.
- Required device overview: a laser printer uses an electrostatic drum, laser, toner and fuser; a 3D printer builds successive layers; a speaker converts an electrical signal into sound. An HDD or magnetic hard disk uses rotating magnetic platters, flash memory stores charge electronically, and an optical reader/writer uses a laser.

### Worked example

**Print a page / Read an HDD block / Choose a storage mechanism / Choose memory for a computer system:** The operating system places page data in a print buffer. The CPU can continue other work while the slower printer consumes buffered data and performs drum, toner and fusing stages. The controller moves the head to the correct track, waits for the sector to rotate beneath it, senses magnetic patterns and transfers the decoded bits through a buffer. A portable device may use flash memory for shock resistance; an archive may use optical media when an optical disc reader/writer is available. Use DRAM as main RAM because its density and lower cost support a large working capacity. Use a small amount of SRAM for cache because faster, no-refresh access reduces processor waiting. Store updateable firmware in EEPROM because it remains without power but can be rewritten electrically.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. What permanently bonds toner to laser-printer paper?
   **Answer:** Heat and pressure in the fuser.
2. How does a 3D printer build an object?
   **Answer:** It deposits/solidifies successive layers.
3. How does a speaker produce sound from digital output?
   **Answer:** A DAC and amplifier drive a coil and cone; cone vibration produces pressure waves in the air.
4. Why is a print buffer needed?
   **Answer:** It handles the speed difference and lets the producer continue while the printer consumes data.
5. Why is flash storage resistant to mechanical shock?
   **Answer:** It has no moving read/write head or spinning platter.
6. What physical property stores HDD data?
   **Answer:** Magnetic orientation/patterns on a platter.
7. How does an optical reader Compare stored data?
   **Answer:** It detects differences in reflected laser light.
8. Which device uses rotating platters?
   **Answer:** An HDD.
9. Which device uses a laser?
   **Answer:** An optical reader/writer.
10. Compare RAM from ROM by volatility and use.
   **Answer:** RAM is volatile and holds current programs/data; ROM is non-volatile and holds persistent firmware or start-up instructions.
11. Why is DRAM refreshed?
   **Answer:** Charge in its storage capacitors leaks and must be restored.
12. Why is SRAM used for cache while DRAM is used for main memory?
   **Answer:** SRAM is faster and needs no refresh; DRAM is denser and cheaper per bit for a larger capacity.
13. Compare PROM, EPROM and EEPROM.
   **Answer:** PROM is programmed once; EPROM is erased with ultraviolet light; EEPROM is erased and rewritten electrically.

### Exam-style question and MS

**Question (15 marks):** Explain why a buffer is used when a computer sends a large document to a laser printer. Describe how data is read from a magnetic hard disk drive. Explain how an HDD, flash memory and an optical reader/writer store or retrieve data. Compare SRAM and DRAM and explain why DRAM is normally used for main memory.

| Answer | Guidance | Marks |
|---|---|---:|
| processor/computer and printer operate at different speeds | Do not accept 'the buffer makes the printer faster'; it manages transfer-rate differences. Do not accept a laser-based explanation for an HDD; lasers apply to optical media. Do not describe every storage device as magnetic. Do not award both comparison marks for merely expanding the abbreviations. | 1 |
| buffer temporarily stores print data |  | 1 |
| printer reads data at its own rate |  | 1 |
| computer/processor can continue other processing without waiting for the full print |  | 1 |
| platters rotate |  | 1 |
| actuator positions read/write head over the required track |  | 1 |
| required sector passes beneath the head |  | 1 |
| head senses magnetic patterns which are decoded as data |  | 1 |
| HDD mechanism |  | 1 |
| flash mechanism |  | 1 |
| optical reader/writer mechanism |  | 1 |
| SRAM is faster / does not require refresh |  | 1 |
| DRAM requires refresh / is slower |  | 1 |
| DRAM has greater density / lower cost per bit |  | 1 |
| main memory needs large capacity, making DRAM more economical |  | 1 |
<!-- stage2-practice:end -->
<!-- stage2-completion:end -->

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 3
**Duration:** 45 minutes
**Assessment rhythm:** 5-minute quiz
## Learning Objectives
By the end of the lesson, students should be able to:
1. Identify the components and functions relevant to **Primary storage: RAM, ROM, cache, and virtual memory**.
2. Explain how data is input, processed, stored or output in a stated system.
3. Recommend suitable hardware using criteria from the scenario.

## Key Vocabulary
English first, Chinese support:

- input 输入, output 输出, storage 存储, logic gate 逻辑门, embedded system 嵌入式系统

## Warm-Up Hook
Place a phone, a keyboard and a USB drive on the desk or name them. Ask: Which one captures data, which one stores it, and which one merely makes humans feel in control?

Focus question: Which feature distinguishes **Primary storage: RAM, ROM, cache, and virtual memory** from the most closely related syllabus concept?

## Guided Explanation
Classify the component first, then examine how it interacts with the rest of the system. Compare at least two alternatives using capacity, speed, durability, cost, accuracy or suitability. End with a scenario so students must justify, not just name, hardware.

Require students to state the relevant term, describe the mechanism or process, and apply it to the example under discussion.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: component category. Middle: characteristics comparison table. Right: scenario-based recommendation sentence.

Teacher guidance: require the technical term and the explanation, method or application specified by the command word.

## Worked Example
**Problem:** Choose suitable hardware for a school attendance system and justify two choices.

**Worked answer / marking focus:** Award marks for matching device characteristics to the scenario, such as fast input, reliable storage, or suitable output feedback.

## Student Task
Teams design a hardware set-up for a specific user: librarian, weather station, exam office or delivery driver. They must reject one tempting but unsuitable device.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **Primary storage: RAM, ROM, cache, and virtual memory**. Follow its command word and apply each point to the stated context.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 3.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often list hardware without explaining suitability. Correction: the mark usually comes from matching a feature to a need.
Correction prompt: "State the correct term, then explain the relevant process or distinction."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Why cache helps and virtual memory slows

- **Explains:** `cache-vm`
- **Explanation type:** comparison
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-031-cache-vm.jpg`

1. Cache holds copies of recently or frequently used instructions and data close to the CPU.
2. A cache hit avoids a slower main-memory access.
3. Virtual memory uses secondary storage when RAM is insufficient and increases apparent capacity rather than physical RAM speed.
- **Analogy:** A desk tray saves a walk; using the archive as desk space creates walks.
- **Boundary:** Virtual memory increases capacity, not physical RAM speed.

### Why active data stays close to the CPU

- **Explains:** `primary`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-031-primary.jpg`

1. The CPU repeatedly requests current instructions and data.
2. Nearby electronic storage answers with less delay than secondary storage.
3. Faster access prevents the processor waiting as often.
- **Analogy:** Keep today's papers on the desk, not in a distant archive.
- **Boundary:** Closer and faster storage is smaller and more expensive per byte.

### Why RAM changes while ROM remains stable

- **Explains:** `ram-rom`
- **Explanation type:** comparison
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-031-ram-rom.jpg`

1. RAM holds the changing state of running programs.
2. Most RAM needs continuous power to preserve that state.
3. ROM retains fixed startup instructions when power is removed.
- **Analogy:** A working notepad changes constantly; a printed reference card should not.
- **Boundary:** ROM can sometimes be updated, but not as ordinary working memory.
<!-- stage10-explanations:end -->
