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

**Atomic learning targets**

- **S5.07.A01:** IDE
- **S5.07.A02:** features
- **S5.07.A03:** context-sensitive
- **S5.07.A04:** prompts
- **S5.07.A05:** dynamic
- **S5.07.A06:** checking
- **S5.07.A07:** prettyprint
- **S5.07.A08:** expand/collapse
- **S5.07.A09:** single-step / single stepping
- **S5.07.A10:** breakpoints
- **S5.07.A11:** variable/expression
- **S5.07.A12:** inspection
- **S5.07.A13:** report
- **S5.07.A14:** window

**Core explanation**

- For debugging, an IDE can provide single stepping, breakpoints, inspection of variables and expressions, and a report window for diagnostic or output information. Single stepping executes one statement at a time; a breakpoint pauses at a chosen point; variable/expression inspection exposes changing values.
- For coding, an IDE can provide context-sensitive prompts. For initial error detection it can perform dynamic syntax checks. For presentation it can prettyprint code and expand or collapse code blocks. These features help create and navigate source code but do not prove that its algorithm is correct.
- Context-sensitive prompts, dynamic syntax checking, prettyprint, expand/collapse, single-step, breakpoints, variable/expression inspection and report window.
- The expand/collapse feature hides or reveals a code block in the editor without changing program execution.
- And debugging with single stepping, breakpoints, variables, expressions and a report window.

**Mechanism or method**

1. **Identify the relevant condition or input** — For debugging, an IDE can provide single stepping, breakpoints, inspection of variables and expressions, and a report window for diagnostic or output information.
2. **Trace how the process works** — Single stepping executes one statement at a time;
3. **Connect the mechanism to its result** — a breakpoint pauses at a chosen point;

#### Worked example: IDE features: context-sensitive prompts, dynamic syntax checking, prettyprint, expand/collapse, single-step, breakpoints, variable/expression inspection and report window: complete worked route

1. **Identify the relevant condition or input**

For debugging, an IDE can provide single stepping, breakpoints, inspection of variables and expressions, and a report window for diagnostic or output information.

2. **Trace how the process works**

Single stepping executes one statement at a time;

3. **Connect the mechanism to its result**

a breakpoint pauses at a chosen point;

4. **Complete example**

In the IDE, a breakpoint pauses before the faulty loop, single stepping advances one statement at a time, the variable/expression view exposes Index, and the report window records diagnostics. Dynamic syntax checking can flag malformed syntax but not a syntactically valid wrong boundary.

**Misconceptions to correct**

- Students often say interpreters are 'bad compilers'. Correction: they are different translation approaches with different use cases.

#### Mastery check (MC-L030-S5.07)

Explain the following targets in one connected answer, using a concrete example for each: IDE; features; context-sensitive; prompts; dynamic; checking; prettyprint; expand/collapse; single-step / single stepping; breakpoints; variable/expression; inspection; report; window.

<details><summary>Answer criteria</summary>

- For debugging, an IDE can provide single stepping, breakpoints, inspection of variables and expressions, and a report window for diagnostic or output information. Single stepping executes one statement at a time; a breakpoint pauses at a chosen point; variable/expression inspection exposes changing values.
- For coding, an IDE can provide context-sensitive prompts. For initial error detection it can perform dynamic syntax checks. For presentation it can prettyprint code and expand or collapse code blocks. These features help create and navigate source code but do not prove that its algorithm is correct.
- Context-sensitive prompts, dynamic syntax checking, prettyprint, expand/collapse, single-step, breakpoints, variable/expression inspection and report window.
- The expand/collapse feature hides or reveals a code block in the editor without changing program execution.
- And debugging with single stepping, breakpoints, variables, expressions and a report window.

</details>

**Supplementary concept map**

- **single-step:** Context-sensitive prompts, dynamic syntax checking, prettyprint, expand/collapse, single-step,…
- **context-sensitive:** For coding, an IDE can provide context-sensitive prompts.
- **expand:** Prettyprint and expand/collapse presentation
- **variable:** Variable/expression inspection exposes changing values.
- **IDE:** For debugging, an IDE can provide single stepping,…
- **features:** IDE features

**Supplementary three-step recap**

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

### Lesson technical reference

- IDE evidence must cover coding prompts; dynamic syntax error detection; prettyprint and expand/collapse presentation; and debugging with single stepping, breakpoints, variables, expressions and a report window.
- For coding, an IDE can provide context-sensitive prompts. For initial error detection it can perform dynamic syntax checks. For presentation it can prettyprint code and expand or collapse code blocks. These features help create and navigate source code but do not prove that its algorithm is correct.
- For debugging, an IDE can provide single stepping, breakpoints, inspection of variables and expressions, and a report window for diagnostic or output information. Single stepping executes one statement at a time; a breakpoint pauses at a chosen point; variable/expression inspection exposes changing values.
- The expand/collapse feature hides or reveals a code block in the editor without changing program execution.

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

- S5.07: explain IDE, features, context-sensitive, prompts, dynamic, checking, prettyprint, expand/collapse, single-step / single stepping, breakpoints, variable/expression, inspection, report, window.
- S5.07 method: Identify the relevant condition or input → Trace how the process works → Connect the mechanism to its result.
- Correction to remember: Students often say interpreters are 'bad compilers'. Correction: they are different translation approaches with different use cases.

### Common error to correct

Students often say interpreters are 'bad compilers'. Correction: they are different translation approaches with different use cases.

### Exam technique

- Follow the command word: state gives a fact; explain links a cause to a consequence; compare covers both sides.
- Match the number of independent points or method steps to the available marks.
- For ide features and practical debugging support, use the exact technical term before applying it to the scenario.
