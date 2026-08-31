# Lesson 073: IF, ELSE and CASE selection

**Course:** Cambridge International AS Level Computer Science 9618, syllabus for examination in 2027-2029<br>
**Paper:** Paper 2<br>
**Syllabus:** Section 11: Programming<br>
**Syllabus requirements:** S11.04<br>
**Pacing:** Flexible. Select a quick, full or deep route for the learners in front of you.

## Teaching-depth menu

- **Quick route:** Use the diagnostic, learning objectives, first worked example and foundation question. Stop once the learner can explain the central distinction accurately.
- **Full route:** Teach every knowledge-point material set, the worked method and all lesson questions.
- **Deep route:** Add the prerequisite refresher, ask learners to connect the concept checklist, discuss the labelled extension and complete a transfer question without a model answer.

## 1. Prerequisite knowledge and quick diagnostic

Recall S9.06 before starting this lesson.

Ask the learner to give one accurate definition or method step before continuing. If they cannot, briefly revisit the named prerequisite rather than repeating the whole previous lesson.

### Optional prerequisite refresher

- The three basic algorithm constructs are sequence, selection and iteration (repetition); students must recognise and use each construct, including combinations of constructs.
- Understand and use sequence, selection and iteration.


## 2. Knowledge explanation

### 1. IF/ELSE/nested selection, CASE, count-controlled loops, post-condition and pre-condition loops: IF, ELSE and CASE selection (S11.04)

**Concept relationships**

- **count-controlled:** IF/ELSE/nested selection, CASE, count-controlled loops, post-condition and pre-condition…
- **post-condition:** It is well suited when the count or…
- **pre-condition:** And pre-condition loops.
- **loop:** A FOR...NEXT loop is count-controlled.
- **ELSE:** IF...THEN...ELSE...ENDIF when a Boolean condition selects between paths.
- **nested:** IF statements, including the ELSE clause and nested…

**Mechanism**

1. **Translate the stated design** — IF/ELSE/nested selection, CASE, count-controlled loops, post-condition and pre-condition loops.
2. **Apply one complete operation** — It is well suited when the count or bounds are known, but a pre-condition or post-condition loop is…
3. **Trace state and boundaries** — And pre-condition loops.

**Concrete case: count-controlled:** IF/ELSE/nested selection, CASE, count-controlled loops, post-condition and pre-condition loops.



<details><summary>Precise syllabus wording</summary>

Use IF/ELSE/nested selection, CASE, count-controlled loops, post-condition and pre-condition loops.

Use IF statements, including the ELSE clause and nested IF statements; CASE statements; count-controlled loops; post-condition loops; and pre-condition loops.

</details>

<details><summary>Open precise terminology and exam facts</summary>

- Use IF statements, including the ELSE clause and nested IF statements; CASE statements; count-controlled loops; post-condition loops; and pre-condition loops.
- Use IF...THEN...ELSE...ENDIF when a Boolean condition selects between paths. An ELSE clause supplies the false path. In nested IF statements, every inner and outer IF must be closed and the indentation must show which ELSE belongs to which IF.
- Use CASE...OF...OTHERWISE...ENDCASE when one expression is compared with several discrete values. CASE is not a replacement for range or compound-condition decisions unless the stated values cover the requirement correctly.
- A count-controlled loop uses FOR...TO...NEXT when the repetition count or inclusive counter range is known before the loop starts. The counter, start value and end value define the iterations; NEXT closes the loop.
- Justify FOR from the problem: it is well suited when the count or bounds are known, but a pre-condition or post-condition loop is better when the number of repetitions depends on input or a stopping condition.
- A WHILE...ENDWHILE loop is a pre-condition loop: it tests before the body and may run zero times. A REPEAT...UNTIL loop is a post-condition loop: it executes the body before testing and therefore runs at least once. A FOR...NEXT loop is count-controlled.
- Select and justify the loop structure from the problem: use FOR when the count is known, WHILE when execution may be unnecessary and continuation is tested first, and REPEAT when the body must run once before a stopping condition can be tested. The justification must use the scenario, not only say that one loop is easier.

</details>

### Worked method

1. Nested IF and CASE
2. Total a fixed array
3. Choose the loop from the stopping rule
4. For a grade, an outer IF tests Mark = 80; its ELSE contains an inner IF testing Mark = 50; each IF closes with ENDIF.
5. For a menu, CASE Choice OF maps 1, 2 and 3 to actions and OTHERWISE handles every unlisted value before ENDCASE.

Beyond syllabus / 延伸知识（不要求背诵）: consistent style, modularity and automated tests reduce maintenance errors in larger programs.
## 3. Practice by question type

### Question 1 - foundation - apply - 2 marks

When is CASE suitable?

**Answer:** When one expression has several discrete values that map to separate branches.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** For the command word apply, perform that exact action; do not replace it with an unrelated fact.

### Question 2 - application - explain - 2 marks

How many ENDIF statements close two nested IF statements?

**Answer:** Two: one closes the inner IF and one closes the outer IF.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not repeat the same point in different words; each mark needs a separate idea or method step.

### Question 3 - transfer - apply - 2 marks

Which structure may execute zero times?

**Answer:** WHILE, because it tests its condition before the body.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not copy the worked example unchanged; transfer the method and check it against the new context.

### Related past-paper indexes

| Reference | Marks | Command word | Question type |
|---|---:|---|---|
| 9618/22/W/25 Q1(a) | 4 | complete | recall |
| 9618/23/W/24 Q1(a) | 4 | complete | recall |
| 9618/22/W/24 Q5(c) | 2 | construct | diagram |

These are indexes only. Cambridge question and mark-scheme wording is not reproduced.

## 4. Summary and exam reminders

### Summary

- Define if, else and case selection with the exact technical vocabulary expected by the syllabus.
- Use the lesson method on a fresh context and show the intermediate decision, representation or calculation.
- Match the shape of the answer to the command word and the available marks.
- Check the final answer against the scenario instead of repeating a memorised sentence.

### Common error to correct

Students often think working Java automatically means good pseudocode. Correction: Paper 2 rewards clear Cambridge-style algorithm expression.

### Exam technique

- Follow the command word: state gives a fact; explain links a cause to a consequence; compare covers both sides.
- Match the number of independent points or method steps to the available marks.
- For if, else and case selection, use the exact technical term before applying it to the scenario.
