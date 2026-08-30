# Lesson 032: Monitoring, control, feedback and required sensors

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice contain the assessed syllabus points added for this lesson. Other activities remain part of this lesson unless they are individually labelled Optional.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Monitoring, control, feedback and required sensors

### Direct explanation

- A monitoring system uses sensors to collect data for recording, display or alerts; it does not necessarily change the environment. A control system uses sensor input and a stored rule or target to send output to an actuator. In closed-loop control, feedback is the new sensor reading produced after the action, allowing the controller to adjust or stop the output.
- A temperature sensor measures temperature, a pressure sensor measures force per unit area or pressure, an infra-red sensor detects infra-red radiation, and a sound sensor detects sound level or sound waves. The sensor supplies input data; it does not itself decide or perform the control action.
- Choose a sensor by matching the physical quantity to the application: temperature for a greenhouse, pressure for a tyre or burglar mat, infra-red for a remote-control receiver or beam alarm, and sound for a noise monitor. A light-intensity sensor is useful supporting context but does not replace the named infra-red and sound sensors.
- Actuators produce physical output actions such as moving a vent or switching a fan after the controller processes sensor input.

### Worked example

**Greenhouse monitoring and control:** A monitoring system records and displays temperature readings. A control system also compares each reading with a threshold and activates a fan motor actuator when the greenhouse is too hot. New temperature readings provide feedback, so the fan can stop when the target is reached.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. Compare monitoring from control.
   **Answer:** Monitoring records, displays or reports sensor data; control uses data to change an actuator or system state.
2. What is feedback in a closed-loop control system?
   **Answer:** A new sensor reading after the action, used to adjust or stop the output.
3. Which named sensor detects radiation used by a remote control?
   **Answer:** An infra-red sensor.
4. Which named sensor is suitable for a classroom noise monitor?
   **Answer:** A sound sensor.
5. Why is a sensor not an actuator?
   **Answer:** A sensor supplies input about a physical quantity; an actuator produces a physical output action.

### Exam-style question and MS

**Question (5 marks):** A greenhouse system records temperature and automatically opens a vent when necessary. Compare its monitoring and control functions and explain the feedback cycle.

| Answer | Guidance | Marks |
|---|---|---:|
| monitoring records/displays temperature readings | Do not state that monitoring necessarily changes an actuator, or that a sensor performs the control decision. | 1 |
| control compares a reading with a rule/threshold |  | 1 |
| controller sends output to a vent motor or other actuator |  | 1 |
| new sensor readings provide feedback after the action |  | 1 |
| feedback is used to adjust or stop the actuator |  | 1 |
<!-- stage2-practice:end -->
<!-- stage2-completion:end -->

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 3
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Identify the components and functions relevant to **Secondary storage: magnetic, optical, and solid-state media**.
2. Explain how data is input, processed, stored or output in a stated system.
3. Recommend suitable hardware using criteria from the scenario.

## Key Vocabulary
English first, Chinese support:

- input 输入, output 输出, storage 存储, logic gate 逻辑门, embedded system 嵌入式系统

## Warm-Up Hook
Place a phone, a keyboard and a USB drive on the desk or name them. Ask: Which one captures data, which one stores it, and which one merely makes humans feel in control?

Focus question: Which feature distinguishes **Secondary storage: magnetic, optical, and solid-state media** from the most closely related syllabus concept?

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
- Answer one 4-mark question about **Secondary storage: magnetic, optical, and solid-state media**. Follow its command word and apply each point to the stated context.

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

### Compare by scenario, not by favourite brand

- **Explains:** `compare`
- **Explanation type:** comparison
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-032-compare.jpg`

1. An HDD provides high capacity at relatively low cost and suits large file libraries or cost-sensitive backups.
2. Magnetic tape provides high capacity with sequential access and suits archival backups.
3. Optical media suits distributing read-only content or archiving data that changes rarely.

### Three main storage media

- **Explains:** `media`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-032-media.jpg`

1. Magnetic storage uses magnetised areas; examples include HDD and tape.
2. Optical storage uses laser light to read marks on a disc.
3. Solid-state secondary storage uses non-volatile flash memory with no moving parts; an SSD or NAND flash chip is the correct illustration.
4. A volatile RAM DIMM is primary memory and is not an SSD.

### What secondary storage does

- **Explains:** `purpose`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-032-purpose.jpg`

1. Non-volatile Data remains when power is switched off.
2. Long-term Stores files, programs, backups and operating system data.
3. Usually slower Secondary storage is usually slower than RAM for direct access.
4. Scenario-based The best medium depends on speed, capacity, durability, portability and cost.

### Required sensor types and applications

- **Explains:** `sensors`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-035-sensors.jpg`

1. A temperature sensor measures temperature and a pressure sensor measures pressure.
2. An infra-red sensor detects infra-red radiation, for example in a beam alarm or remote-control receiver.
3. A sound sensor detects sound level or sound waves, for example in a noise monitor.
4. A sensor supplies input data; the processor applies the rule and an actuator performs any physical output.
5. Light intensity is supporting context and does not replace the named infra-red or sound sensors.

### Look at the storage mechanism before comparing performance

- **Explains:** `storage-visual`
- **Explanation type:** tradeoff
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-032-storage-visual.jpg`

1. Visual explanation
2. The physical mechanism helps explain speed, durability and suitable uses.
3. Magnetic
4. Solid-state
5. Three ways to store data when power is off. The illustration identifies the mechanism; the cards below state the exam-safe explanation.
6. Magnetic HDD
7. Magnetised areas store data on rotating platters. A moving actuator positions the read/write head.
8. Consequence: high capacity and low cost per GB, but mechanical parts are vulnerable to shock.
9. Optical disc
10. A laser reads changes such as pits and lands on the disc surface.
11. Consequence: portable and cheap to distribute, but generally slower and lower-capacity.
12. Solid-state drive
<!-- stage10-explanations:end -->
