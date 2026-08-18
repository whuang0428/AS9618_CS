# Lesson 031: Secondary storage: magnetic, optical, and solid-state media

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 3
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Secondary storage: magnetic, optical, and solid-state media** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- input 输入, output 输出, storage 存储, logic gate 逻辑门, embedded system 嵌入式系统

## Warm-Up Hook
Place a phone, a keyboard and a USB drive on the desk or name them. Ask: Which one captures data, which one stores it, and which one merely makes humans feel in control?

Lesson-specific focus question: What would go wrong if a student confused **Secondary storage: magnetic, optical, and solid-state media** with a neighbouring syllabus idea?

## Guided Explanation
Classify the component first, then examine how it interacts with the rest of the system. Compare at least two alternatives using capacity, speed, durability, cost, accuracy or suitability. End with a scenario so students must justify, not just name, hardware.

Topic-specific teaching move: keep the explanation anchored to **Secondary storage: magnetic, optical, and solid-state media**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** Choose suitable hardware for a school attendance system and justify two choices. The worked example must explicitly use **Secondary storage: magnetic, optical, and solid-state media**, not a generic example from the wider unit.

**Worked answer / marking focus:** Award marks for matching device characteristics to the scenario, such as fast input, reliable storage, or suitable output feedback.



## Student Task
Teams design a hardware set-up for a specific user: librarian, weather station, exam office or delivery driver. They must reject one tempting but unsuitable device. Their final answer must include the phrase **Secondary storage: magnetic, optical, and solid-state media** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Secondary storage: magnetic, optical, and solid-state media**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:
"The key point about **Secondary storage: magnetic, optical, and solid-state media** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Secondary storage: magnetic, optical, and solid-state media** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 3.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often list hardware without explaining suitability. Correction: the mark usually comes from matching a feature to a need. For this lesson, make students contrast that mistake with the exact idea of **secondary storage: magnetic, optical, and solid-state media**.
Correction prompt: "Show the mechanism, not just the label."

## Stage 2 syllabus completion

**Official audit rows:** S3.03
**Focus:** HDD, flash and optical reader/writer operation

### Direct explanation

- An HDD spins magnetic platters while an actuator positions read/write heads; writing changes magnetic orientation and reading senses it. Flash memory stores charge in floating-gate cells and has no moving parts.
- An optical drive spins a disc and directs a laser at its track. Reflected-light differences are read as data; a writer uses a higher-power laser to change a dye or recording layer.

### Worked example

**Read an HDD block:** The controller moves the head to the correct track, waits for the sector to rotate beneath it, senses magnetic patterns and transfers the decoded bits through a buffer.

### Targeted practice and answers

1. Why is flash storage resistant to mechanical shock?
   **Answer:** It has no moving read/write head or spinning platter.
2. What physical property stores HDD data?
   **Answer:** Magnetic orientation/patterns on a platter.
3. How does an optical reader distinguish stored data?
   **Answer:** It detects differences in reflected laser light.

### Exam-style question and MS

**Question (4 marks):** Describe how data is read from a magnetic hard disk drive.

- **B1** platters rotate
- **B1** actuator positions read/write head over the required track
- **B1** required sector passes beneath the head
- **B1** head senses magnetic patterns which are decoded as data

**Strict note:** Do not accept a laser-based explanation for an HDD; lasers apply to optical media.

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Compare by scenario, not by favourite brand

- **Explains:** `compare`
- **Explanation type:** comparison
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-031-compare.jpg`

1. Capacity/cost
2. Good scenario
3. Magnetic HDD
4. Slower than SSD; mechanical parts.
5. High capacity and low cost per GB.
6. Desktop storage, large file libraries, cost-sensitive backups.
7. Magnetic tape
8. Slow sequential access.
9. Very high capacity and low cost for backups.
10. Archiving and large organisation backups.
11. Optical disc
12. Generally slower access.

### Three main storage media

- **Explains:** `media`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-031-media.jpg`

1. Magnetic storage
2. Stores data using magnetised areas on a medium.
3. Examples: hard disk drive (HDD), magnetic tape.
4. Typical strengths: high capacity, relatively low cost per GB; tape is useful for large backups.
5. Limitations: moving parts in HDDs, slower than SSDs, vulnerable to shock and magnetic fields.
6. Optical storage
7. Uses laser light to read marks/pits on a disc surface.
8. Examples: CD, DVD, Blu-ray.
9. Typical strengths: cheap, portable, useful for distributing or archiving data that changes rarely.
10. Limitations: lower capacity and slower access than HDD/SSD; discs can scratch.
11. Solid-state storage
12. Stores data electronically in flash memory with no moving parts.

### What secondary storage does

- **Explains:** `purpose`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-031-purpose.jpg`

1. Non-volatile Data remains when power is switched off.
2. Long-term Stores files, programs, backups and operating system data.
3. Usually slower Secondary storage is usually slower than RAM for direct access.
4. Scenario-based The best medium depends on speed, capacity, durability, portability and cost.

### Look at the storage mechanism before comparing performance

- **Explains:** `storage-visual`
- **Explanation type:** tradeoff
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-031-storage-visual.jpg`

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
