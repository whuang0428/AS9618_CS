# Lesson 018: Boolean expressions and logic-circuit design

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

- NOT reverses its single input. AND outputs 1 only when both inputs are 1. OR outputs 1 when at least one input is 1.
- NAND is NOT-AND, so it outputs 0 only for inputs 1,1. NOR is NOT-OR, so it outputs 1 only for inputs 0,0. XOR or EOR outputs 1 when the two inputs are different.
- Each standard gate symbol identifies a Boolean function. The symbol fixes how inputs connect to the gate, while the function states the output rule that its truth-table rows must follow.
- To convert a problem statement, first name Boolean variables and write the condition for the output. Preserve brackets and NOT operations when translating the expression into gate connections.
- To build a truth table, list every input combination, add a column for each intermediate gate output, and calculate the final output row by row. Two inputs require four rows; three inputs require eight.
- A circuit, expression and truth table are equivalent only when they produce the same final output for every input combination. Checking one row is not sufficient evidence of equivalence.

**Mechanism or method**

1. **Translate the problem into Boolean conditions** — Assign one variable to each stated input and decide exactly when the required output should be 1.
2. **Construct the expression or circuit** — Apply NOT first, preserve brackets and connect named intermediate results through the required gates.
3. **Evaluate every truth-table row** — List all input combinations, calculate intermediate columns and confirm that all representations give the same output.

#### Worked example: Convert a door-alarm rule through four representations

1. **Statement**

The alarm sounds when the door is open and the security code is not accepted.

2. **Expression**

Let D mean door open and C mean code accepted. The expression is Alarm = D AND NOT C.

3. **Circuit**

Pass C through a NOT gate, then connect D and NOT C to an AND gate. The AND output is Alarm.

4. **Rows**

For D,C = 0,0 → NOT C=1, Alarm=0; 0,1 → 0,0; 1,0 → 1,1; 1,1 → 0,0.

5. **Check**

Only the row with an open door and an unaccepted code produces Alarm=1, so the statement, expression, circuit and truth table agree.

**Misconceptions to correct**

- OR includes the 1,1 case; XOR excludes it. NAND and NOR are complete inverted functions, not alternative symbols for AND and OR.

#### Mastery check (MC-L018-S3.10)

Explain the following targets in one connected answer, using a concrete example for each: NOT; AND; OR; NAND; NOR; XOR; symbol; function; truth table; problem statement; expression; circuit; two inputs.

<details><summary>Answer criteria</summary>

- NOT reverses its single input. AND outputs 1 only when both inputs are 1. OR outputs 1 when at least one input is 1.
- NAND is NOT-AND, so it outputs 0 only for inputs 1,1. NOR is NOT-OR, so it outputs 1 only for inputs 0,0. XOR or EOR outputs 1 when the two inputs are different.
- Each standard gate symbol identifies a Boolean function. The symbol fixes how inputs connect to the gate, while the function states the output rule that its truth-table rows must follow.
- To convert a problem statement, first name Boolean variables and write the condition for the output. Preserve brackets and NOT operations when translating the expression into gate connections.
- To build a truth table, list every input combination, add a column for each intermediate gate output, and calculate the final output row by row. Two inputs require four rows; three inputs require eight.
- A circuit, expression and truth table are equivalent only when they produce the same final output for every input combination. Checking one row is not sufficient evidence of equivalence.

</details>

**Supplementary concept map**

- **NOT:** inverts one input
- **AND/NAND:** opposite outputs
- **OR/NOR:** opposite outputs
- **XOR:** inputs must differ
- **Expression:** names Boolean operations
- **Truth table:** checks every input row

**Supplementary three-step recap**

1. **Translate the problem into Boolean conditions** — Assign one variable to each stated input and decide exactly when the required output should be 1.
2. **Construct the expression or circuit** — Apply NOT first, preserve brackets and connect named intermediate results through the required gates.
3. **Evaluate every truth-table row** — List all input combinations, calculate intermediate columns and confirm that all representations give the same output.

**One rule, four equivalent forms:** Use the same variables and intermediate results in the problem statement, expression, circuit and truth table.



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

### Question 1 - foundation - convert - 8 marks

For Alarm = Door AND NOT CodeOK, construct a truth table with an intermediate NOT CodeOK column and state the gate connections needed for the circuit.

**Answer:** four input rows 00,01,10,11; NOT CodeOK values 1,0,1,0; Alarm values 0,0,1,0; CodeOK passes through NOT and its output joins Door at an AND gate

**Marking guidance:** Award the complete row set, correct intermediate column, final output and circuit structure.

**Common error:** Do not omit intermediate columns or test only the row that produces 1.

### Question 2 - application - describe - 6 marks

Describe the output rule for NOT, AND, OR, NAND, NOR and XOR. Include the input combinations that distinguish OR from XOR and AND from NAND.

**Answer:** NOT inverts one input; AND is 1 only for 11; OR is 1 for 01,10,11; NAND is inverse of AND and is 0 only for 11; NOR is inverse of OR and is 1 only for 00; XOR is 1 only when inputs differ, so unlike OR it is 0 for 11

**Marking guidance:** One accurate rule per gate; XOR and OR must be distinguished explicitly.

**Common error:** XOR is not another name for OR.

### Question 3 - transfer - construct - 6 marks

A warning is active when SensorA is on or when both SensorB and SensorC are off. Construct a logic expression, identify the circuit gates and state how many rows its truth table needs.

**Answer:** Warning = SensorA OR (NOT SensorB AND NOT SensorC); NOT gates on B and C, their outputs to AND, then that result and A to OR; three inputs require 2^3 = 8 rows

**Marking guidance:** Preserve the grouping of the two negated inputs before the OR operation.

**Common error:** Do not replace NOT(B) AND NOT(C) with NOT(B AND C); they are different expressions.

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
- S3.10 method: Translate the problem into Boolean conditions → Construct the expression or circuit → Evaluate every truth-table row.
- Correction to remember: OR includes the 1,1 case; XOR excludes it. NAND and NOR are complete inverted functions, not alternative symbols for AND and OR.

### Common error to correct

Students often use everyday 'or' instead of logical OR. Correction: OR is true when at least one input is true unless XOR is specified.

### Exam technique

- Follow the command word: state gives a fact; explain links a cause to a consequence; compare covers both sides.
- Match the number of independent points or method steps to the available marks.
- For boolean expressions and logic-circuit design, use the exact technical term before applying it to the scenario.
