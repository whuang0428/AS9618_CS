# Lesson 029: Microphone, touchscreen and VR headset operation

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice are the assessed sequence for this lesson. The earlier lesson-body activities are Optional enrichment and do not establish syllabus first use.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Microphone, touchscreen and VR headset operation

### Direct explanation

- A microphone diaphragm vibrates with sound; a transducer converts the movement into an analogue electrical signal, which an ADC samples into digital values. A capacitive touchscreen detects a change in an electric field and calculates touch coordinates.
- A VR headset displays a separate view to each eye and uses motion/orientation sensors to update the viewpoint. Low-latency tracking is needed so the displayed scene follows head movement.
- Required device overview: a laser printer uses an electrostatic drum, laser, toner and fuser; a 3D printer builds successive layers; a speaker converts an electrical signal into sound. An HDD or magnetic hard disk uses rotating magnetic platters, flash memory stores charge electronically, and an optical reader/writer uses a laser.

### Worked example

**Turn head in VR:** Gyroscope/accelerometer readings report orientation; the processor calculates a new camera view; displays present updated left/right images, creating stereoscopic depth.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. What converts a microphone's analogue signal into digital samples?
   **Answer:** An analogue-to-digital converter (ADC).
2. What does a capacitive touchscreen detect?
   **Answer:** A change in capacitance/electric field at a touch location.
3. Why does a VR headset track head movement?
   **Answer:** To update the displayed viewpoint to match the user's orientation.

### Exam-style question and MS

**Question (4 marks):** Describe how a microphone captures sound for storage in a computer.

| Answer | Guidance | Marks |
|---|---|---:|
| sound waves vibrate a diaphragm | Do not accept that the microphone directly records binary without an analogue signal and conversion stage. | 1 |
| transducer converts vibration to an analogue electrical signal |  | 1 |
| ADC samples/measures the signal |  | 1 |
| sample values are encoded/stored as binary |  | 1 |
<!-- stage2-practice:end -->
<!-- stage2-completion:end -->

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 3
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Identify the components and functions relevant to **Output devices and user feedback**.
2. Explain how data is input, processed, stored or output in a stated system.
3. Recommend suitable hardware using criteria from the scenario.

## Key Vocabulary
English first, Chinese support:

- input 输入, output 输出, storage 存储, logic gate 逻辑门, embedded system 嵌入式系统

## Warm-Up Hook
Place a phone, a keyboard and a USB drive on the desk or name them. Ask: Which one captures data, which one stores it, and which one merely makes humans feel in control?

Focus question: Which feature distinguishes **Output devices and user feedback** from the most closely related syllabus concept?

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
- Answer one 4-mark question about **Output devices and user feedback**. Follow its command word and apply each point to the stated context.

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

### Common output devices and when they fit

- **Explains:** `devices`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-029-devices.jpg`

1. Output form
2. Good use
3. Exam warning
4. Monitor / screen
5. Visual soft copy
6. Live results, interfaces, dashboards, maps
7. Not suitable when permanent paper evidence is required
8. Hard copy on paper or labels
9. Receipts, reports, tickets, labels
10. Usually slower and uses consumables
11. Speaker / buzzer
12. Audio output

### User feedback must fit the situation

- **Explains:** `feedback`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-029-feedback.jpg`

1. Display, auditory and haptic feedback are alternative output forms, not inputs.
2. Printed records and actuator actions are separate output types rather than downstream results of display, sound or touch feedback.
3. Haptic feedback requires physical contact and may be missed when vibration is weak or the device is not being held.

### What output devices do

- **Explains:** `purpose`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-029-purpose.jpg`

1. 1. Present Output devices present processed data to a user, such as text, images or sound.
2. 2. Record Some output creates a physical record, such as a printout or receipt.
3. 3. Act Actuators convert computer output into physical movement or control.
<!-- stage10-explanations:end -->
