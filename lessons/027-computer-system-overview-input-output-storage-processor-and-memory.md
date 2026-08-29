# Lesson 027: Computer system overview: input, output, storage, processor and memory

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice contain the assessed syllabus points added for this lesson. Other activities remain part of this lesson unless they are individually labelled Optional.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Computer-system input, output and storage overview

### Direct explanation

- Input is needed to enter data and instructions into a computer system. Output is needed to communicate processed information to a user or to cause an action. A processor cannot perform a useful task unless it can receive the required data and make the result available.
- Primary memory is needed to hold the instructions and data currently being used by the processor. Secondary storage is needed for non-volatile, long-term retention of programs and data. Removable storage is secondary storage that can be disconnected, so it can transfer data or hold an offline backup, although it can be lost or stolen.
- A microphone diaphragm vibrates with sound; a transducer converts the movement into an analogue electrical signal, which an ADC samples into digital values. A capacitive touchscreen detects a change in an electric field and calculates touch coordinates.
- A VR headset displays a separate view to each eye and uses motion/orientation sensors to update the viewpoint. Low-latency tracking is needed so the displayed scene follows head movement.
- A laser printer charges a drum, a laser discharges selected points, toner adheres to the image, toner transfers to paper and heat/pressure fuse it. A 3D printer deposits or solidifies material layer by layer from a digital model.
- A speaker uses a DAC/amplifier to drive a coil and cone, producing pressure waves. An output buffer temporarily holds data because the processor can produce it faster or in different-sized bursts than a printer or audio device can consume it.
- A buffer temporarily holds data when producer and consumer operate at different speeds, reducing loss or interruption caused by the rate difference.
- An HDD spins magnetic platters while an actuator positions read/write heads; writing changes magnetic orientation and reading senses it. Flash memory stores charge in floating-gate cells and has no moving parts.
- An optical drive spins a disc and directs a laser at its track. Reflected-light differences are read as data; a writer uses a higher-power laser to change a dye or recording layer.
- Required device overview: a laser printer uses an electrostatic drum, laser, toner and fuser; a 3D printer builds successive layers; a speaker converts an electrical signal into sound. An HDD or magnetic hard disk uses rotating magnetic platters, flash memory stores charge electronically, and an optical reader/writer uses a laser.

### Worked example

**Field survey tablet / Turn head in VR / Print a page / Read an HDD block:** A surveyor enters measurements through a touchscreen, sees validation messages on the display, uses RAM as primary memory while the survey application runs, saves records on internal secondary storage, and copies an encrypted backup to removable storage before leaving the site. Gyroscope/accelerometer readings report orientation; the processor calculates a new camera view; displays present updated left/right images, creating stereoscopic depth. The operating system places page data in a print buffer. The CPU can continue other work while the slower printer consumes buffered data and performs drum, toner and fusing stages. The controller moves the head to the correct track, waits for the sector to rotate beneath it, senses magnetic patterns and transfers the decoded bits through a buffer.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. Why does a computer system need input?
   **Answer:** To receive data and instructions for processing.
2. Why does a computer system need output?
   **Answer:** To communicate processed information or cause an action.
3. Compare the need for primary memory from the need for secondary storage.
   **Answer:** Primary memory holds instructions/data currently in use; secondary storage retains programs/data long term without power.
4. Give one purpose of removable storage.
   **Answer:** To transfer data between systems or keep a detachable/offline backup copy.
5. What converts a microphone's analogue signal into digital samples?
   **Answer:** An analogue-to-digital converter (ADC).
6. What does a capacitive touchscreen detect?
   **Answer:** A change in capacitance/electric field at a touch location.
7. Why does a VR headset track head movement?
   **Answer:** To update the displayed viewpoint to match the user's orientation.
8. What permanently bonds toner to laser-printer paper?
   **Answer:** Heat and pressure in the fuser.
9. How does a 3D printer build an object?
   **Answer:** It deposits/solidifies successive layers.
10. How does a speaker produce sound from digital output?
   **Answer:** A DAC and amplifier drive a coil and cone; cone vibration produces pressure waves in the air.
11. Why is a print buffer needed?
   **Answer:** It handles the speed difference and lets the producer continue while the printer consumes data.
12. Why is flash storage resistant to mechanical shock?
   **Answer:** It has no moving read/write head or spinning platter.
13. What physical property stores HDD data?
   **Answer:** Magnetic orientation/patterns on a platter.
14. How does an optical reader Compare stored data?
   **Answer:** It detects differences in reflected laser light.

### Exam-style question and MS

**Question (17 marks):** A portable medical system receives patient measurements, processes them and stores the records. Explain why it needs input, output, primary memory, secondary storage and removable storage. Describe how a microphone captures sound for storage in a computer. Explain why a buffer is used when a computer sends a large document to a laser printer. Describe how data is read from a magnetic hard disk drive.

| Answer | Guidance | Marks |
|---|---|---:|
| input receives patient measurements/data | Do not treat primary memory, secondary storage and removable storage as interchangeable terms. Do not accept that the microphone directly records binary without an analogue signal and conversion stage. Do not accept 'the buffer makes the printer faster'; it manages transfer-rate differences. Do not accept a laser-based explanation for an HDD; lasers apply to optical media. | 1 |
| output communicates results or warnings |  | 1 |
| primary memory holds current program instructions and working data |  | 1 |
| secondary storage retains patient records long term without power |  | 1 |
| removable storage supports transfer or an offline/detachable backup |  | 1 |
| sound waves vibrate a diaphragm |  | 1 |
| transducer converts vibration to an analogue electrical signal |  | 1 |
| ADC samples/measures the signal |  | 1 |
| sample values are encoded/stored as binary |  | 1 |
| processor/computer and printer operate at different speeds |  | 1 |
| buffer temporarily stores print data |  | 1 |
| printer reads data at its own rate |  | 1 |
| computer/processor can continue other processing without waiting for the full print |  | 1 |
| platters rotate |  | 1 |
| actuator positions read/write head over the required track |  | 1 |
| required sector passes beneath the head |  | 1 |
| head senses magnetic patterns which are decoded as data |  | 1 |
<!-- stage2-practice:end -->
<!-- stage2-completion:end -->

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 3
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Identify the components and functions relevant to **Computer system overview: input, output, storage, processor, and memory**.
2. Explain how data is input, processed, stored or output in a stated system.
3. Recommend suitable hardware using criteria from the scenario.

## Key Vocabulary
English first, Chinese support:

- input 输入, output 输出, storage 存储, logic gate 逻辑门, embedded system 嵌入式系统

## Warm-Up Hook
Place a phone, a keyboard and a USB drive on the desk or name them. Ask: Which one captures data, which one stores it, and which one merely makes humans feel in control?

Focus question: Which feature distinguishes **Computer system overview: input, output, storage, processor, and memory** from the most closely related syllabus concept?

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
- Answer one 4-mark question about **Computer system overview: input, output, storage, processor, and memory**. Follow its command word and apply each point to the stated context.

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

### Component roles and examples

- **Explains:** `components`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-027-components.jpg`

1. Input devices
2. Allow data to enter the system.
3. Examples: keyboard, mouse, barcode reader, touch screen, microphone, camera, sensor.
4. Output devices
5. Present data or results from the system.
6. Examples: monitor, speaker, printer, projector, actuator.
7. Processor
8. Executes instructions and coordinates operations. It processes data; it is not where user files are stored.
9. Primary memory
10. Stores instructions and data currently in use. RAM is volatile; ROM is non-volatile and stores startup instructions.
11. Secondary storage
12. Stores data and files long term, even when power is off.

### The basic system flow

- **Explains:** `flow`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-027-flow.jpg`

1. Input devices capture data for processing.
2. The processor works with instructions and data held in primary memory.
3. Processed results can go directly to output devices.
4. Secondary storage is a separate bidirectional persistence path and is not a compulsory stage before output.

### Memory is not the same as storage

- **Explains:** `memory-storage`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-027-memory-storage.jpg`

1. Primary memory
2. Secondary storage
3. Holds data/instructions currently being used.
4. Holds files and data long term.
5. Volatility
6. RAM is volatile; contents are lost without power.
7. Non-volatile; data remains when power is off.
8. Speed and capacity
9. Usually faster but smaller and more expensive per unit.
10. Usually larger and cheaper per unit but slower than RAM.
<!-- stage10-explanations:end -->
