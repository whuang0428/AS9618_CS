# Lesson 044: System buses: address, data, and control

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 4
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Identify the processor components or operations involved in **System buses: address, data, and control**.
2. Describe the sequence of data, address and control transfers.
3. Explain the effect of the relevant architecture or performance factor.

## Key Vocabulary
English first, Chinese support:

- register 寄存器, bus 总线, fetch-decode-execute 取指-译码-执行, interrupt 中断

## Warm-Up Hook
Give students the roles of named registers and ask them to pass an instruction through the fetch stage in the correct order. Use any incorrect transfer to clarify each register's function.

Focus question: Which feature distinguishes **System buses: address, data, and control** from the most closely related syllabus concept?

## Guided Explanation
Follow one instruction through the processor. Identify each register or bus only when it does work in the story. Then connect the mechanism to System buses: address, data, and control: what changes, what improves, and what limitation remains?

Require students to state the relevant term, describe the mechanism or process, and apply it to the example under discussion.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: instruction or interrupt scenario. Middle: CPU/register/bus sequence. Right: performance or tracing notes.

Teacher guidance: require the technical term and the explanation, method or application specified by the command word.

## Worked Example
**Problem:** Trace one fetch-decode-execute cycle and name the role of two registers.

**Worked answer / marking focus:** Award marks for correct sequence: address from PC to MAR, instruction/data via memory and MDR, instruction held in CIR, PC updated as appropriate.



## Student Task
Students annotate a CPU diagram with arrows for one instruction, then explain the path in four precise sentences.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **System buses: address, data, and control**. Follow its command word and apply each point to the stated context.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 4.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often memorise register names without roles. Correction: a register earns its name by what it temporarily holds.
Correction prompt: "State the correct term, then explain the relevant process or distinction."

## Stage 2 syllabus completion

**Official audit rows:** S4.06
**Focus:** USB, HDMI and VGA ports

### Direct explanation

- USB is a general serial interface carrying digital data and often power for peripherals. HDMI carries digital video and audio. VGA carries analogue video and does not carry audio in the standard VGA signal.
- Port choice depends on signal type and device: keyboard/storage commonly use USB, a modern display/TV uses HDMI, and a legacy analogue monitor/projector may use VGA. An adapter does not make analogue and digital signals identical.

### Worked example

**Connect a laptop to a modern TV:** Use HDMI because one cable can carry digital video and audio. VGA would carry analogue video only, so a separate audio connection would be needed.

### Targeted practice and answers

1. Which port commonly carries both digital video and audio?
   **Answer:** HDMI.
2. Which named port carries analogue video?
   **Answer:** VGA.
3. Give one extra facility USB may provide besides data.
   **Answer:** Electrical power to a peripheral.

### Exam-style question and MS

**Question (4 marks):** Compare HDMI and VGA for connecting a computer to a display.

- **B1** HDMI carries digital video
- **B1** HDMI can also carry audio
- **B1** VGA carries analogue video
- **B1** VGA does not normally carry audio / may have lower suitability for modern digital displays

**Strict note:** Do not accept 'HDMI is always higher quality' without the digital/analogue or audio distinction.

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### What a system bus does

- **Explains:** `concept`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-044-concept.jpg`

1. Communication pathway
2. A bus is a set of parallel wires or connections used to carry signals.
3. Connects components
4. System buses connect CPU, main memory and other devices through controlled transfers.
5. Not storage
6. A bus transfers signals; it does not permanently store data or instructions.
7. Part of a trace
8. In processor questions, bus roles often appear inside fetch, read and write sequences.

### Read and write traces

- **Explains:** `read-write`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-044-read-write.jpg`

1. Memory read
2. CPU places the required address on the address bus.
3. CPU sends a read signal on the control bus.
4. Memory places the requested data/instruction on the data bus.
5. CPU receives the data, often through the MDR.
6. Memory write
7. CPU places the target address on the address bus.
8. CPU places the data to be stored on the data bus.
9. CPU sends a write signal on the control bus.
10. Memory stores the data at the addressed location.
11. Common error
12. Read and write both use all three buses, but the direction of data transfer changes.

### The three buses

- **Explains:** `three-buses`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-044-three-buses.jpg`

1. The address bus carries the address of the location being accessed and is normally directed from the CPU.
2. The data bus carries data and instructions in both directions.
3. The control bus carries control and timing signals in both directions, including read/write from the CPU and interrupts toward the CPU.

### Bus width and addressable locations

- **Explains:** `width`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-044-width.jpg`

1. Address bus width
2. If the address bus has n lines, it can represent 2^n different addresses.
3. A 16-bit address bus can address 2^16 = 65,536 memory locations.
4. Data bus width
5. A wider data bus can transfer more bits at once, which can affect throughput.
6. Precision
7. Address bus width affects address range; data bus width affects transfer size.
<!-- stage10-explanations:end -->
