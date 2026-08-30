# Lesson 045: Interrupt causes, detection and handling

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice contain the assessed syllabus points added for this lesson. Other activities remain part of this lesson unless they are individually labelled Optional.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Interrupt causes, detection and handling

### Direct explanation

- An interrupt is a signal or condition requesting processor attention. Possible causes include input/output devices needing service, a timer used for scheduling, a hardware fault, and a software exception. Applications include responsive input, sharing processor time and dealing promptly with exceptional conditions without continuously polling every device.
- For most maskable interrupts, the processor completes the current instruction and checks for pending enabled interrupts at the end of that fetch-execute cycle, before beginning the next instruction. Detection is therefore not the same as stopping halfway through an ordinary instruction.
- If an interrupt is accepted, the processor checks priority, saves the state needed to resume (such as PC, registers and status), loads or locates the correct interrupt service routine (ISR), executes the ISR, restores the saved state and resumes the interrupted program at the correct next instruction. The ISR is a routine, not the interrupt signal itself.
- An enabled interrupt request is detected at an instruction boundary before the processor begins the handling sequence.

### Worked example

**Handle a keyboard interrupt:** A key press raises an interrupt while the CPU is executing another program. The CPU finishes its current instruction, detects the pending request at the cycle boundary, saves PC/register/status state, runs the keyboard ISR to read or acknowledge the input, restores the saved state and continues the original program.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. Give two possible causes or applications of interrupts.
   **Answer:** For example an I/O device request, timer/scheduler event, hardware fault or software exception.
2. When is a normal maskable interrupt detected and accepted?
   **Answer:** After the current instruction completes, at the end of the fetch-execute cycle before the next instruction begins, subject to enabled/priority checks.
3. What is an ISR?
   **Answer:** An interrupt service routine: program code that handles a particular interrupt.
4. Why must processor state be saved and restored?
   **Answer:** So the interrupted program can resume at the correct instruction with its earlier register and status values.
5. List the handling sequence after detection.
   **Answer:** Check/accept, save state, locate and execute ISR, restore state, resume program.

### Exam-style question and MS

**Question (6 marks):** Describe one interrupt cause or application, state when it is detected in the fetch-execute cycle, and trace handling through the ISR to resumption.

| Answer | Guidance | Marks |
|---|---|---:|
| valid cause/application such as I/O, timer, fault or exception | Do not accept that every interrupt stops an instruction halfway through, that the ISR is the signal, or that the whole interrupted program restarts. | 1 |
| current instruction completes and interrupt is detected/checked at the cycle boundary |  | 1 |
| priority/enabled status is checked |  | 1 |
| PC/register/status state is saved |  | 1 |
| correct ISR is located and executed |  | 1 |
| state is restored and the interrupted program resumes |  | 1 |
<!-- stage2-practice:end -->
<!-- stage2-completion:end -->

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

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### What a system bus does

- **Explains:** `concept`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-045-concept.jpg`

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
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-045-read-write.jpg`

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
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-045-three-buses.jpg`

1. The address bus carries the address of the location being accessed and is normally directed from the CPU.
2. The data bus carries data and instructions in both directions.
3. The control bus carries control and timing signals in both directions, including read/write from the CPU and interrupts toward the CPU.
<!-- stage10-explanations:end -->
