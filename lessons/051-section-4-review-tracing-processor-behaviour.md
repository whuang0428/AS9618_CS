# Lesson 051: Section 4 review: tracing processor behaviour

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 1  
**Syllabus reference:** Syllabus Section 4  
**Duration:** 45 minutes  
**Assessment rhythm:** stage review
## Learning Objectives
By the end of the lesson, students should be able to:
1. Select the relevant concepts and command words for **Section 4 review: tracing processor behaviour**.
2. Complete a timed response using the required calculation, notation or explanation structure.
3. Use a mark scheme to identify omissions and produce an improved answer.

## Key Vocabulary
English first, Chinese support:

- register 寄存器, bus 总线, fetch-decode-execute 取指-译码-执行, interrupt 中断

## Warm-Up Hook
Put three mixed questions on the board and ask students to identify the relevant syllabus topic, command word and required response form before answering.

Focus question: Which feature distinguishes **Section 4 review: tracing processor behaviour** from the most closely related syllabus concept?

## Guided Explanation
Use Section 4 review: tracing processor behaviour to connect ideas across sections. Start with retrieval, then compare two similar concepts, then answer one timed question. Finish with correction: students rewrite a weak answer into a mark-worthy one.

Require students to state the relevant term, describe the mechanism or process, and apply it to the example under discussion.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: retrieval grid. Middle: mixed exam question. Right: mark scheme phrases and correction targets.

Teacher guidance: require the technical term and the explanation, method or application specified by the command word.

## Worked Example
**Problem:** Answer a mixed Cambridge-style question, then annotate which words in the answer earn marks.

**Worked answer / marking focus:** Credit topic recognition, precise terminology, and explanations that fit the scenario rather than generic memorised lines.



## Student Task
Students complete a timed response, swap scripts, mark with a checklist, and write one improved version.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:  
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **Section 4 review: tracing processor behaviour**. Follow its command word and apply each point to the stated context.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 4.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often revise by rereading notes only. Correction: review lessons require retrieval, timed practice and correction.
Correction prompt: "State the correct term, then explain the relevant process or distinction."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Turn vague into mark-worthy

- **Explains:** `clinic`
- **Explanation type:** synthesis
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-051-clinic.jpg`

1. Answer clinic
2. Weak answer: "The CPU uses registers and buses to get instructions. It is faster because of cache and pipelining."
3. Diagnosis: This names several topics but does not answer any one of them precisely.
4. Fix pattern: Topic → mechanism → exact role/sequence → consequence.

### Common compare traps

- **Explains:** `compare`
- **Explanation type:** synthesis
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-051-compare.jpg`

1. MAR vs MDR
2. MAR holds an address. MDR holds the data or instruction being transferred. One points where; the other carries what.
3. Direct vs indirect
4. Direct uses the operand as the address of the value. Indirect uses the operand as the address of a pointer to the value.
5. Clock speed vs throughput
6. Clock speed is cycles per second. Throughput is completed work per unit time. They are related, not identical.
7. Interrupt vs polling
8. An interrupt lets a device signal the CPU. Polling means the CPU repeatedly checks the device/status flag.

### Section 4 concept map

- **Explains:** `map`
- **Explanation type:** synthesis
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-051-map.jpg`

1. Fetch copies PC to MAR, reads memory into MDR, copies MDR to CIR and increments PC.
2. Decode begins after CIR holds the current instruction; the control unit interprets its opcode and operands.
3. The address in MAR does not flow into MDR; memory returns the addressed instruction or data into MDR.

### Retrieval grid: say the role, not just the name

- **Explains:** `retrieval`
- **Explanation type:** synthesis
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-051-retrieval.jpg`

1. PC holds the address of the next instruction; MAR holds the memory address being accessed.
2. The address bus carries addresses between the processor and memory.
3. MDR holds data or instructions transferred through the data bus.
4. CIR holds the current instruction while it is decoded and executed.
5. The control bus carries control and timing signals such as read, write and interrupt.

### 8-minute mixed Section 4 response

- **Explains:** `timed`
- **Explanation type:** synthesis
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-051-timed.jpg`

1. Timed task
2. Choose one question, write the answer, then compare with the expandable MS in the exam section.
3. Question A Trace the fetch stage and name the role of PC, MAR and MDR.
4. Question B Explain why an interrupt service routine must save and restore processor state.
5. Question C Discuss why pipelining may improve CPU performance but not always reach ideal speed-up.
<!-- stage10-explanations:end -->
