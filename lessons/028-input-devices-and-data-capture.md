# Lesson 028: Embedded systems: purpose, benefits and drawbacks

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice are the assessed sequence for this lesson. The earlier lesson-body activities are Optional enrichment and do not establish syllabus first use.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Embedded systems: purpose, benefits and drawbacks

### Direct explanation

- An embedded system is a computer system built into a larger device to perform one dedicated task or a closely related set of tasks. A microcontroller may integrate the processor, memory and input/output interfaces needed for that task.
- Benefits can include low cost, low power use, small size and reliable, predictable automatic operation because the hardware and software are designed for a limited purpose. Drawbacks can include limited processing, storage and user interface, difficulty adding new functions, and dependence on the embedded controller: if it fails, the larger device may stop working. A valid comparison must link each point to the device and task.
- An embedded system can have a benefit such as efficient dedicated operation and a drawback such as limited flexibility; both must be applied to the device.

### Worked example

**Washing-machine controller:** A dedicated microcontroller can read sensors and control the motor and valves with low power use and predictable timing. Its limited interface is acceptable for wash programs, but it cannot readily run unrelated applications, and a controller failure can prevent the whole machine from operating.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. What two features define an embedded system?
   **Answer:** It is built into a larger device and performs a dedicated task or closely related set of tasks.
2. Give one benefit of an embedded controller and explain its consequence.
   **Answer:** For example, low power use reduces energy or battery demand for the device.
3. Give one drawback of an embedded controller and explain its consequence.
   **Answer:** For example, limited resources make it difficult to add unrelated functions or run general-purpose software.
4. Why can failure of an embedded controller be serious?
   **Answer:** The larger device may lose the function controlled by that computer or stop operating.

### Exam-style question and MS

**Question (5 marks):** A battery-powered medical monitor uses an embedded controller. Explain two benefits and two drawbacks of this design in context.

| Answer | Guidance | Marks |
|---|---|---:|
| benefit such as low power, compact size or predictable automatic operation | Do not award bare adjectives such as 'small' or 'cheap' without a device-specific consequence. | 1 |
| first benefit linked to battery life, portability or continuous monitoring |  | 1 |
| drawback such as limited resources/upgrading/interface or controller dependence |  | 1 |
| first drawback linked to limited new functions or device failure |  | 1 |
| second distinct benefit or drawback correctly developed |  | 1 |
<!-- stage2-practice:end -->
<!-- stage2-completion:end -->

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 3
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Identify the components and functions relevant to **Input devices and data capture**.
2. Explain how data is input, processed, stored or output in a stated system.
3. Recommend suitable hardware using criteria from the scenario.

## Key Vocabulary
English first, Chinese support:

- input 输入, output 输出, storage 存储, logic gate 逻辑门, embedded system 嵌入式系统

## Warm-Up Hook
Place a phone, a keyboard and a USB drive on the desk or name them. Ask: Which one captures data, which one stores it, and which one merely makes humans feel in control?

Focus question: Which feature distinguishes **Input devices and data capture** from the most closely related syllabus concept?

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
- Answer one 4-mark question about **Input devices and data capture**. Follow its command word and apply each point to the stated context.

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

### Manual input vs automatic data capture

- **Explains:** `automatic`
- **Explanation type:** comparison
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-028-automatic.jpg`

1. Manual input
2. Automatic data capture
3. A person enters data, such as typing into a form.
4. A device captures data directly, such as scanning or sensing.
5. Advantages
6. Flexible, cheap for occasional input, useful for unusual data.
7. Fast, consistent, reduces transcription errors, suitable for high volume.
8. Limitations
9. Typing mistakes, slower, depends on user attention.
10. May need codes/tags/sensors; can fail if labels are damaged or conditions are poor.

### What input devices do

- **Explains:** `capture`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-028-capture.jpg`

1. 1. Capture The device captures data from a user, document, object or environment.
2. 2. Convert The data is converted into a digital form the computer can process.
3. 3. Validate later Input is not automatically correct. Validation and verification may still be needed.

### Common input devices and what they capture

- **Explains:** `devices`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-028-devices.jpg`

1. Captures
2. Good use
3. Exam warning
4. Keyboard
5. Typed text/numbers
6. Short manual entries, corrections, commands
7. Slow and error-prone for long repeated codes
8. Barcode / QR reader
9. Encoded product, ticket or ID data
10. Fast repeated identification
11. Needs a readable code; does not capture handwriting
12. RFID / NFC reader
<!-- stage10-explanations:end -->
