# Lesson 033: Logic-gate symbols, functions and representation conversions

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice contain the assessed syllabus points added for this lesson. Other activities remain part of this lesson unless they are individually labelled Optional.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Logic-gate symbols, functions and representation conversions

### Direct explanation

- Use the standard symbols and exact functions of NOT, AND, OR, NAND, NOR and XOR (EOR). NOT has one input; each of the other five gates has two inputs for this syllabus. A truth table lists every input combination and the resulting output according to the gate or circuit function.
- You must be able to construct a logic circuit from a problem statement, logic expression or truth table; construct a truth table from a problem statement, logic circuit or logic expression; and construct a logic expression from a problem statement, logic circuit or truth table. Move through variables and conditions first, then intermediate gate outputs, then the final output so every representation can be checked against the same rows.
- Each standard gate symbol identifies its function; do not substitute a labelled box when a logic-circuit symbol is required.

### Worked example

**Convert one rule among four representations:** Rule: an alarm sounds when the system is armed and either the door or window is open. Define A, D and W; write Alarm = A AND (D OR W); draw an OR gate for D and W feeding an AND gate with A; then list all eight input combinations and evaluate the intermediate OR column before Alarm.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. What distinguishes the XOR symbol from the OR symbol?
   **Answer:** XOR has an additional curved line on the input side.
2. How many inputs does NOT have, and how many do the other specified gates have in this syllabus?
   **Answer:** NOT has one input; AND, OR, NAND, NOR and XOR each have two inputs.
3. Identify the three possible sources from which a logic circuit may be constructed.
   **Answer:** A problem statement, a logic expression or a truth table.
4. How do intermediate columns help convert a circuit into a truth table?
   **Answer:** Each intermediate column records one gate output, allowing the final result to be calculated and checked row by row.

### Exam-style question and MS

**Question (4 marks):** A truth table gives output 1 only when input A is 1 and input B is 0. Construct a logic expression and describe the corresponding circuit.

| Answer | Guidance | Marks |
|---|---|---:|
| identifies that B must be inverted | Do not accept XOR: XOR is also 1 for A=0, B=1, which contradicts the given truth table. | 1 |
| constructs expression Q = A AND NOT B |  | 1 |
| B is connected to a NOT gate |  | 1 |
| A and the NOT-gate output are connected to an AND gate whose output is Q |  | 1 |
<!-- stage2-practice:end -->
<!-- stage2-completion:end -->

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 3
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Identify the components and functions relevant to **Storage characteristics: capacity, speed, durability, portability, and cost**.
2. Explain how data is input, processed, stored or output in a stated system.
3. Recommend suitable hardware using criteria from the scenario.

## Key Vocabulary
English first, Chinese support:

- input 输入, output 输出, storage 存储, logic gate 逻辑门, embedded system 嵌入式系统

## Warm-Up Hook
Place a phone, a keyboard and a USB drive on the desk or name them. Ask: Which one captures data, which one stores it, and which one merely makes humans feel in control?

Focus question: Which feature distinguishes **Storage characteristics: capacity, speed, durability, portability, and cost** from the most closely related syllabus concept?

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
- Answer one 4-mark question about **Storage characteristics: capacity, speed, durability, portability, and cost**. Follow its command word and apply each point to the stated context.

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

### The answer pattern: choice -> characteristic -> context -> consequence

- **Explains:** `answer`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-033-answer.jpg`

1. Choice Use an SSD
2. Characteristic because it has fast access and no moving parts
3. Context for a laptop carried to school each day
4. Consequence so programs load quickly and it is less likely to be damaged by knocks
5. Weak: "SSD is better." Strong: "SSD is suitable because fast access reduces loading time and no moving parts improves durability in a portable laptop."

### The five core characteristics

- **Explains:** `criteria`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-033-criteria.jpg`

1. Capacity How much data can be stored, usually measured in GB or TB.
2. Speed How quickly data can be read or written; affects startup, loading and transfer.
3. Durability How well the device resists damage, wear, shock, scratches or environmental conditions.
4. Portability How easy it is to carry, remove, connect and use between devices.
5. Cost Price of the device and cost per unit of storage; not always the same thing.

### Six symbols, six exact output rules

- **Explains:** `gate-visual`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-036-gate-visual.jpg`

1. Visual explanation
2. Read each symbol from left to right. A small circle on the output means “invert”; the extra curved input line distinguishes XOR from OR.
3. NOT One input; output is the opposite value.
4. AND / NAND AND tests whether both are 1; NAND inverts that result.
5. OR / NOR OR tests whether at least one is 1; NOR inverts that result.
6. XOR Output is 1 only when the two inputs are different.
7. Check the diagram: what two visual clues separate NOR from XOR?
8. NOR has an output bubble. XOR has no output bubble, but it has an extra curved line on the input side.

### Trade-offs by common storage device

- **Explains:** `tradeoffs`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-033-tradeoffs.jpg`

1. Strengths
2. Weaknesses
3. Suitable when...
4. High capacity; low cost per GB.
5. Moving parts; slower; less shock-resistant than SSD.
6. Large storage is needed cheaply and portability is less critical.
7. Fast; durable; no moving parts; low power.
8. Often higher cost per GB than HDD.
9. Speed and durability matter, especially in laptops.
10. Magnetic tape
11. Very high capacity; low cost for archives.
12. Slow sequential access; not convenient for frequent random access.
<!-- stage10-explanations:end -->
