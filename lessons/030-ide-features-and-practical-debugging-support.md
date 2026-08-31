# Lesson 030: IDE features and practical debugging support

**Course:** Cambridge International AS Level Computer Science 9618, syllabus for examination in 2027-2029<br>
**Paper:** Paper 1<br>
**Syllabus:** Section 5: System software<br>
**Syllabus requirements:** S5.07<br>
**Pacing:** Flexible. Select a quick, full or deep route for the learners in front of you.

## Teaching-depth menu

- **Quick route:** Use the diagnostic, learning objectives, first worked example and foundation question. Stop once the learner can explain the central distinction accurately.
- **Full route:** Teach every knowledge-point material set, the worked method and all lesson questions.
- **Deep route:** Add the prerequisite refresher, ask learners to connect the concept checklist, discuss the labelled extension and complete a transfer question without a model answer.

## 1. Prerequisite knowledge and quick diagnostic

Recall S5.04 before starting this lesson.

Ask the learner to give one accurate definition or method step before continuing. If they cannot, briefly revisit the named prerequisite rather than repeating the whole previous lesson.

### Optional prerequisite refresher

- An assembler translates assembly language, a compiler translates high-level language, and an interpreter translates and executes high-level language.
- Explain why assembler, compiler and interpreter are needed.


## 2. Knowledge explanation

### 1. IDE features: context-sensitive prompts, dynamic syntax checking, prettyprint, expand/collapse, single-step, breakpoints, variable/expression inspection and report window (S5.07)

**Concept relationships**

- **single-step:** Context-sensitive prompts, dynamic syntax checking, prettyprint, expand/collapse, single-step,…
- **context-sensitive:** For coding, an IDE can provide context-sensitive prompts.
- **expand:** Prettyprint and expand/collapse presentation
- **variable:** Variable/expression inspection exposes changing values.
- **IDE:** For debugging, an IDE can provide single stepping,…
- **features:** IDE features

**Mechanism**

1. **Identify incoming data or signal** — Context-sensitive prompts, dynamic syntax checking, prettyprint, expand/collapse, single-step, breakpoints, variable/expression inspection and report window.
2. **Follow the physical or logical path** — For debugging, an IDE can provide single stepping, breakpoints, inspection of variables and expressions, and a report window…
3. **Connect output to its use** — And debugging with single stepping, breakpoints, variables, expressions and a report window.

**A breakpoint pauses execution at a chosen line:** Breakpoint Best place

#### A breakpoint pauses execution at a chosen line

![A breakpoint pauses execution at a chosen line](../web/assets/diagrams/stage10-infographics/stage10-lesson-139-breakpoint.jpg)

<details><summary>Text transcript</summary>

- Breakpoint
- Best place
- Place a breakpoint before or on the line where the suspected decision or calculation happens.
- What to inspect
- Check variable values, the next line to execute, and whether the condition is true or false.
- What not to do
- Do not scatter breakpoints randomly. Random pausing is just procrastination wearing a technical hat.

</details>

<details><summary>Precise syllabus wording</summary>

Understand IDE features: context-sensitive prompts, dynamic syntax checking, prettyprint, expand/collapse, single-step, breakpoints, variable/expression inspection and report window.

IDE evidence must cover coding prompts; dynamic syntax error detection; prettyprint and expand/collapse presentation; and debugging with single stepping, breakpoints, variables, expressions and a report window.

</details>

<details><summary>Open precise terminology and exam facts</summary>

- IDE evidence must cover coding prompts; dynamic syntax error detection; prettyprint and expand/collapse presentation; and debugging with single stepping, breakpoints, variables, expressions and a report window.
- For coding, an IDE can provide context-sensitive prompts. For initial error detection it can perform dynamic syntax checks. For presentation it can prettyprint code and expand or collapse code blocks. These features help create and navigate source code but do not prove that its algorithm is correct.
- For debugging, an IDE can provide single stepping, breakpoints, inspection of variables and expressions, and a report window for diagnostic or output information. Single stepping executes one statement at a time; a breakpoint pauses at a chosen point; variable/expression inspection exposes changing values.
- The expand/collapse feature hides or reveals a code block in the editor without changing program execution.

</details>

### Worked method

1. Trace Java and locate a loop fault
2. First the Java compiler produces bytecode; the JVM then interprets the bytecode or JIT-compiles parts for the host.
3. In the IDE, a breakpoint pauses before the faulty loop, single stepping advances one statement at a time, the variable/expression view exposes Index, and the report window records diagnostics.
4. Dynamic syntax checking can flag malformed syntax but not a syntactically valid wrong boundary.

Beyond syllabus / 延伸知识（不要求背诵）: production build systems automate translation, linking, testing and packaging, while the syllabus examines the purpose of each stage separately.
## 3. Practice by question type

### Question 1 - foundation - identify - 2 marks

Identify the two required presentation features.

**Answer:** Prettyprint and expand/collapse code blocks.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** For the command word identify, perform that exact action; do not replace it with an unrelated fact.

### Question 2 - application - apply - 2 marks

Which IDE feature pauses at a chosen line, and which advances one statement?

**Answer:** A breakpoint pauses; single stepping advances one statement at a time.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not repeat the same point in different words; each mark needs a separate idea or method step.

### Question 3 - transfer - explain - 3 marks

Explain how ide features and practical debugging support would be applied in a suitable computing context.

**Answer:** For coding, an IDE can provide context-sensitive prompts. For initial error detection it can perform dynamic syntax checks. For presentation it can prettyprint code and expand or collapse code blocks. These features help create and navigate source code but do not prove that its algorithm is correct. For debugging, an IDE can provide single stepping, breakpoints, inspection of variables and expressions, and a report window for diagnostic or output information. Single stepping executes one statement at a time; a breakpoint pauses at a chosen point; variable/expression inspection exposes changing values. The expand/collapse feature hides or reveals a code block in the editor without changing program execution.

**Marking guidance:** Each mark needs a relevant point linked to the stated context.

**Common error:** Do not copy the worked example unchanged; transfer the method and check it against the new context.

### Related past-paper indexes

| Reference | Marks | Command word | Question type |
|---|---:|---|---|
| 9618/12/S/24 Q8(b) | 6 | complete | debug |
| 9618/12/W/24 Q4(a) | 4 | describe | debug |
| 9618/12/W/24 Q4(b) | 3 | describe | debug |
| 9618/12/S/23 Q7(c) | 4 | complete | recall |

These are indexes only. Cambridge question and mark-scheme wording is not reproduced.

## 4. Summary and exam reminders

### Summary

- Define ide features and practical debugging support with the exact technical vocabulary expected by the syllabus.
- Use the lesson method on a fresh context and show the intermediate decision, representation or calculation.
- Match the shape of the answer to the command word and the available marks.
- Check the final answer against the scenario instead of repeating a memorised sentence.

### Common error to correct

Students often say interpreters are 'bad compilers'. Correction: they are different translation approaches with different use cases.

### Exam technique

- Follow the command word: state gives a fact; explain links a cause to a consequence; compare covers both sides.
- Match the number of independent points or method steps to the available marks.
- For ide features and practical debugging support, use the exact technical term before applying it to the scenario.
