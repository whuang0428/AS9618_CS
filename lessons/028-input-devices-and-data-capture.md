# Lesson 028: Input devices and data capture

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 3
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Input devices and data capture** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- input 输入, output 输出, storage 存储, logic gate 逻辑门, embedded system 嵌入式系统

## Warm-Up Hook
Place a phone, a keyboard and a USB drive on the desk or name them. Ask: Which one captures data, which one stores it, and which one merely makes humans feel in control?

Lesson-specific focus question: What would go wrong if a student confused **Input devices and data capture** with a neighbouring syllabus idea?

## Guided Explanation
Classify the component first, then examine how it interacts with the rest of the system. Compare at least two alternatives using capacity, speed, durability, cost, accuracy or suitability. End with a scenario so students must justify, not just name, hardware.

Topic-specific teaching move: keep the explanation anchored to **Input devices and data capture**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** Choose suitable hardware for a school attendance system and justify two choices. The worked example must explicitly use **Input devices and data capture**, not a generic example from the wider unit.

**Worked answer / marking focus:** Award marks for matching device characteristics to the scenario, such as fast input, reliable storage, or suitable output feedback.



## Student Task
Teams design a hardware set-up for a specific user: librarian, weather station, exam office or delivery driver. They must reject one tempting but unsuitable device. Their final answer must include the phrase **Input devices and data capture** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Input devices and data capture**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:
"The key point about **Input devices and data capture** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Input devices and data capture** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 3.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often list hardware without explaining suitability. Correction: the mark usually comes from matching a feature to a need. For this lesson, make students contrast that mistake with the exact idea of **input devices and data capture**.
Correction prompt: "Show the mechanism, not just the label."

## Stage 2 syllabus completion

**Official audit rows:** S3.03
**Focus:** Microphone, touchscreen and VR headset operation

### Direct explanation

- A microphone diaphragm vibrates with sound; a transducer converts the movement into an analogue electrical signal, which an ADC samples into digital values. A capacitive touchscreen detects a change in an electric field and calculates touch coordinates.
- A VR headset displays a separate view to each eye and uses motion/orientation sensors to update the viewpoint. Low-latency tracking is needed so the displayed scene follows head movement.

### Worked example

**Turn head in VR:** Gyroscope/accelerometer readings report orientation; the processor calculates a new camera view; displays present updated left/right images, creating stereoscopic depth.

### Targeted practice and answers

1. What converts a microphone's analogue signal into digital samples?
   **Answer:** An analogue-to-digital converter (ADC).
2. What does a capacitive touchscreen detect?
   **Answer:** A change in capacitance/electric field at a touch location.
3. Why does a VR headset track head movement?
   **Answer:** To update the displayed viewpoint to match the user's orientation.

### Exam-style question and MS

**Question (4 marks):** Describe how a microphone captures sound for storage in a computer.

- **B1** sound waves vibrate a diaphragm
- **B1** transducer converts vibration to an analogue electrical signal
- **B1** ADC samples/measures the signal
- **B1** sample values are encoded/stored as binary

**Strict note:** Do not accept that the microphone directly records binary without an analogue signal and conversion stage.
