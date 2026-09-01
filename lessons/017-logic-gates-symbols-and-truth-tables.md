# Lesson 017: Logic gates, symbols and truth tables

**Course:** Cambridge International AS Level Computer Science 9618, syllabus for examination in 2027-2029<br>
**Paper:** Paper 1<br>
**Syllabus:** Section 3: Hardware<br>
**Syllabus requirements:** S3.10<br>
**Pacing:** Flexible. Select a quick, full or deep route for the learners in front of you.

## Teaching-depth menu

- **Quick route:** Use the diagnostic, learning objectives, first worked example and foundation question. Stop once the learner can explain the central distinction accurately.
- **Full route:** Teach every knowledge-point material set, the worked method and all lesson questions.
- **Deep route:** Add the prerequisite refresher, ask learners to connect the concept checklist, discuss the labelled extension and complete a transfer question without a model answer.

## 1. Prerequisite knowledge and quick diagnostic

Recall S1.02 before starting this lesson.

Ask the learner to give one accurate definition or method step before continuing. If they cannot, briefly revisit the named prerequisite rather than repeating the whole previous lesson.

### Optional prerequisite refresher

- The syllabus requires binary, denary, hexadecimal, Binary Coded Decimal (BCD), one's complement and two's complement; BCD and complements are representations rather than additional number bases.
- Show understanding of binary, denary and hexadecimal number systems, BCD, and one's- and two's-complement representations.


## 2. Knowledge explanation

### 1. NOT, AND, OR, NAND, NOR and XOR; use symbols/functions/truth tables and convert among problem, expression, circuit… (S3.10)

**Atomic learning targets**

- **S3.10.A01:** NOT
- **S3.10.A02:** AND
- **S3.10.A03:** OR
- **S3.10.A04:** NAND
- **S3.10.A05:** NOR
- **S3.10.A06:** XOR
- **S3.10.A07:** symbol
- **S3.10.A08:** function
- **S3.10.A09:** truth table
- **S3.10.A10:** problem statement
- **S3.10.A11:** expression
- **S3.10.A12:** circuit
- **S3.10.A13:** two inputs

**Core explanation**

- Use the standard symbols and exact functions of NOT, AND, OR, NAND, NOR and XOR (EOR). NOT has one input; each of the other five gates has two inputs for this syllabus. A truth table lists every input combination and the resulting output according to the gate or circuit function.
- You must be able to construct a logic circuit from a problem statement, logic expression or truth table; construct a truth table from a problem statement, logic circuit or logic expression; and construct a logic expression from a problem statement, logic circuit or truth table. Move through variables and conditions first, then intermediate gate outputs, then the final output so every representation can be checked against the same rows.
- Visual explanation Read each symbol from left to right. A small circle on the output means “invert”; the extra curved input line distinguishes XOR from OR.
- Each standard gate symbol identifies its function; do not substitute a labelled box when a logic-circuit symbol is required.
- Symbols/functions/truth tables and convert among problem, expression, circuit and truth table.
- The standard symbols and define the functions of NOT, AND, OR, NAND, NOR and XOR (EOR)

**Mechanism or method**

1. **Identify the relevant condition or input** — Use the standard symbols and exact functions of NOT, AND, OR, NAND, NOR and XOR (EOR).
2. **Trace how the process works** — each of the other five gates has two inputs for this syllabus.
3. **Connect the mechanism to its result** — A truth table lists every input combination and the resulting output according to the gate or circuit function.

#### Worked example: NOT, AND, OR, NAND, NOR and XOR; use symbols/functions/truth tables and convert among problem, expression, circuit: complete worked route

1. **Identify the relevant condition or input**

Use the standard symbols and exact functions of NOT, AND, OR, NAND, NOR and XOR (EOR).

2. **Trace how the process works**

each of the other five gates has two inputs for this syllabus.

3. **Connect the mechanism to its result**

A truth table lists every input combination and the resulting output according to the gate or circuit function.

4. **Complete example**

Convert one rule among four representations: Rule: an alarm sounds when the system is armed and either the door or window is open. write Alarm = A AND (D OR W); draw an OR gate for D and W feeding an AND gate with A; then list all eight input combinations and evaluate the intermediate OR column before Alarm.

**Misconceptions to correct**

- Students often use everyday 'or' instead of logical OR. Correction: OR is true when at least one input is true unless XOR is specified.

#### Mastery check (MC-L017-S3.10)

Explain the following targets in one connected answer, using a concrete example for each: NOT; AND; OR; NAND; NOR; XOR; symbol; function; truth table; problem statement; expression; circuit; two inputs.

<details><summary>Answer criteria</summary>

- Use the standard symbols and exact functions of NOT, AND, OR, NAND, NOR and XOR (EOR). NOT has one input; each of the other five gates has two inputs for this syllabus. A truth table lists every input combination and the resulting output according to the gate or circuit function.
- You must be able to construct a logic circuit from a problem statement, logic expression or truth table; construct a truth table from a problem statement, logic circuit or logic expression; and construct a logic expression from a problem statement, logic circuit or truth table. Move through variables and conditions first, then intermediate gate outputs, then the final output so every representation can be checked against the same rows.
- Visual explanation Read each symbol from left to right. A small circle on the output means “invert”; the extra curved input line distinguishes XOR from OR.
- Each standard gate symbol identifies its function; do not substitute a labelled box when a logic-circuit symbol is required.
- Symbols/functions/truth tables and convert among problem, expression, circuit and truth table.
- The standard symbols and define the functions of NOT, AND, OR, NAND, NOR and XOR (EOR)

</details>

**Supplementary concept map**

- **truth table:** Symbols/functions/truth tables and convert among problem, expression, circuit…
- **problem statement:** Problem statement, logic expression, logic circuit and truth…
- **NAND:** The standard symbols and exact functions of NOT,…
- **NOR:** The standard symbols and define the functions of…
- **XOR:** NOT, AND, OR, NAND, NOR and XOR
- **symbol:** Do not substitute a labelled box when a…

**Supplementary three-step recap**

1. **Translate the stated design** — Symbols/functions/truth tables and convert among problem, expression, circuit and truth table.
2. **Apply one complete operation** — The standard symbols and exact functions of NOT, AND, OR, NAND, NOR and XOR (EOR).
3. **Trace state and boundaries** — The standard symbols and define the functions of NOT, AND, OR, NAND, NOR and XOR (EOR)

**Six symbols, six exact output rules:** Visual explanation Read each symbol from left to right. A small circle on the output means “invert”; the extra curved input line distinguishes XOR from OR.

#### Six symbols, six exact output rules

![Six symbols, six exact output rules](../web/assets/diagrams/stage10-infographics/stage10-lesson-036-gate-visual.jpg)

<details><summary>Text transcript</summary>

- Visual explanation
- Read each symbol from left to right. A small circle on the output means “invert”; the extra curved input line distinguishes XOR from OR.
- NOT One input; output is the opposite value.
- AND / NAND AND tests whether both are 1; NAND inverts that result.
- OR / NOR OR tests whether at least one is 1; NOR inverts that result.
- XOR Output is 1 only when the two inputs are different.
- Check the diagram: what two visual clues separate NOR from XOR?
- NOR has an output bubble. XOR has no output bubble, but it has an extra curved line on the input side.

</details>

<details><summary>Precise syllabus wording</summary>

Understand NOT, AND, OR, NAND, NOR and XOR; use symbols/functions/truth tables and convert among problem, expression, circuit and truth table.

Use the standard symbols and define the functions of NOT, AND, OR, NAND, NOR and XOR (EOR); all gates except NOT have two inputs. Construct circuits, truth tables and expressions from each of the other stated representations: problem statement, logic expression, logic circuit and truth table.

</details>

### Lesson technical reference

- Use the standard symbols and define the functions of NOT, AND, OR, NAND, NOR and XOR (EOR); all gates except NOT have two inputs. Construct circuits, truth tables and expressions from each of the other stated representations: problem statement, logic expression, logic circuit and truth table.
- Use the standard symbols and exact functions of NOT, AND, OR, NAND, NOR and XOR (EOR). NOT has one input; each of the other five gates has two inputs for this syllabus. A truth table lists every input combination and the resulting output according to the gate or circuit function.
- You must be able to construct a logic circuit from a problem statement, logic expression or truth table; construct a truth table from a problem statement, logic circuit or logic expression; and construct a logic expression from a problem statement, logic circuit or truth table. Move through variables and conditions first, then intermediate gate outputs, then the final output so every representation can be checked against the same rows.
- Each standard gate symbol identifies its function; do not substitute a labelled box when a logic-circuit symbol is required.

Beyond syllabus / 延伸知识（不要求背诵）: professional device selection also considers accessibility, reliability, repairability and energy use.
## 3. Practice by question type

### Question 1 - foundation - construct - 4 marks

A truth table gives output 1 only when input A is 1 and input B is 0. Construct a logic expression and describe the corresponding circuit.

**Answer:** identifies that B must be inverted; constructs expression Q = A AND NOT B; B is connected to a NOT gate; A and the NOT-gate output are connected to an AND gate whose output is Q

**Marking guidance:** Do not accept XOR: XOR is also 1 for A=0, B=1, which contradicts the given truth table.

**Common error:** For the command word construct, perform that exact action; do not replace it with an unrelated fact.

### Question 2 - application - identify - 2 marks

Identify the three possible sources from which a logic circuit may be constructed.

**Answer:** A problem statement, a logic expression or a truth table.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not repeat the same point in different words; each mark needs a separate idea or method step.

### Question 3 - transfer - explain - 2 marks

How many inputs does NOT have, and how many do the other specified gates have in this syllabus?

**Answer:** NOT has one input; AND, OR, NAND, NOR and XOR each have two inputs.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not copy the worked example unchanged; transfer the method and check it against the new context.

### Related past-paper indexes

| Reference | Marks | Command word | Question type |
|---|---:|---|---|
| 9618/11/S/25 Q1(a) | 2 | write | recall |
| 9618/11/S/25 Q1(b) | 2 | complete | recall |
| 9618/11/W/25 Q3(a) | 2 | draw | diagram |
| 9618/11/W/25 Q3(b) | 2 | draw | diagram |

These are indexes only. Cambridge question and mark-scheme wording is not reproduced.

## 4. Summary and exam reminders

### Summary

- S3.10: explain NOT, AND, OR, NAND, NOR, XOR, symbol, function, truth table, problem statement, expression, circuit, two inputs.
- S3.10 method: Identify the relevant condition or input → Trace how the process works → Connect the mechanism to its result.
- Correction to remember: Students often use everyday 'or' instead of logical OR. Correction: OR is true when at least one input is true unless XOR is specified.

### Common error to correct

Students often use everyday 'or' instead of logical OR. Correction: OR is true when at least one input is true unless XOR is specified.

### Exam technique

- Follow the command word: state gives a fact; explain links a cause to a consequence; compare covers both sides.
- Match the number of independent points or method steps to the available marks.
- For logic gates, symbols and truth tables, use the exact technical term before applying it to the scenario.
