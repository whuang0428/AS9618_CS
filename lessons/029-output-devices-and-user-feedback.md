# Lesson 029: Output devices and user feedback

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 3
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Output devices and user feedback** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- input 输入, output 输出, storage 存储, logic gate 逻辑门, embedded system 嵌入式系统

## Warm-Up Hook
Place a phone, a keyboard and a USB drive on the desk or name them. Ask: Which one captures data, which one stores it, and which one merely makes humans feel in control?

Lesson-specific focus question: What would go wrong if a student confused **Output devices and user feedback** with a neighbouring syllabus idea?

## Guided Explanation
Classify the component first, then examine how it interacts with the rest of the system. Compare at least two alternatives using capacity, speed, durability, cost, accuracy or suitability. End with a scenario so students must justify, not just name, hardware.

Topic-specific teaching move: keep the explanation anchored to **Output devices and user feedback**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: component category. Middle: characteristics comparison table. Right: scenario-based recommendation sentence.

Teacher line to reuse: "A correct keyword starts the answer; the explanation earns the mark."

## Worked Example
**Problem:** Choose suitable hardware for a school attendance system and justify two choices. The worked example must explicitly use **Output devices and user feedback**, not a generic example from the wider unit.

**Worked answer / marking focus:** Award marks for matching device characteristics to the scenario, such as fast input, reliable storage, or suitable output feedback.



## Student Task
Teams design a hardware set-up for a specific user: librarian, weather station, exam office or delivery driver. They must reject one tempting but unsuitable device. Their final answer must include the phrase **Output devices and user feedback** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Output devices and user feedback**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:
"The key point about **Output devices and user feedback** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Output devices and user feedback** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 3.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often list hardware without explaining suitability. Correction: the mark usually comes from matching a feature to a need. For this lesson, make students contrast that mistake with the exact idea of **output devices and user feedback**.
Correction prompt: "Show the mechanism, not just the label."

## Stage 2 syllabus completion

**Official audit rows:** S3.03, S3.04
**Focus:** Laser/3D printers, speakers and output buffers

### Direct explanation

- A laser printer charges a drum, a laser discharges selected points, toner adheres to the image, toner transfers to paper and heat/pressure fuse it. A 3D printer deposits or solidifies material layer by layer from a digital model.
- A speaker uses a DAC/amplifier to drive a coil and cone, producing pressure waves. An output buffer temporarily holds data because the processor can produce it faster or in different-sized bursts than a printer or audio device can consume it.

### Worked example

**Print a page:** The operating system places page data in a print buffer. The CPU can continue other work while the slower printer consumes buffered data and performs drum, toner and fusing stages.

### Targeted practice and answers

1. What permanently bonds toner to laser-printer paper?
   **Answer:** Heat and pressure in the fuser.
2. How does a 3D printer build an object?
   **Answer:** It deposits/solidifies successive layers.
3. Why is a print buffer needed?
   **Answer:** It handles the speed difference and lets the producer continue while the printer consumes data.

### Exam-style question and MS

**Question (4 marks):** Explain why a buffer is used when a computer sends a large document to a laser printer.

- **B1** processor/computer and printer operate at different speeds
- **B1** buffer temporarily stores print data
- **B1** printer reads data at its own rate
- **B1** computer/processor can continue other processing without waiting for the full print

**Strict note:** Do not accept 'the buffer makes the printer faster'; it manages transfer-rate differences.

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Common output devices and when they fit

- **Explains:** `devices`
- **Explanation type:** mechanism
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
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-029-feedback.jpg`

1. Feedback type
2. Strength
3. Limitation
4. Detailed information, menus, diagrams, maps.
5. User must be able to see and look at the display.
6. Immediate warning without needing to look.
7. Can be missed in noise or disruptive in quiet spaces.
8. Permanent portable evidence.
9. Not ideal for rapidly changing information.
10. Physical action
11. Controls the real world automatically.
12. Needs safety controls because it changes the environment.

### What output devices do

- **Explains:** `purpose`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-029-purpose.jpg`

1. 1. Present Output devices present processed data to a user, such as text, images or sound.
2. 2. Record Some output creates a physical record, such as a printout or receipt.
3. 3. Act Actuators convert computer output into physical movement or control.
<!-- stage10-explanations:end -->
