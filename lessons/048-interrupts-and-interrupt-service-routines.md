# Lesson 048: Interrupts and interrupt service routines

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 4
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Identify the processor components or operations involved in **Interrupts and interrupt service routines**.
2. Describe the sequence of data, address and control transfers.
3. Explain the effect of the relevant architecture or performance factor.

## Key Vocabulary
English first, Chinese support:

- register 寄存器, bus 总线, fetch-decode-execute 取指-译码-执行, interrupt 中断

## Warm-Up Hook
Give students the roles of named registers and ask them to pass an instruction through the fetch stage in the correct order. Use any incorrect transfer to clarify each register's function.

Focus question: Which feature distinguishes **Interrupts and interrupt service routines** from the most closely related syllabus concept?

## Guided Explanation
Follow one instruction through the processor. Identify each register or bus only when it does work in the story. Then connect the mechanism to Interrupts and interrupt service routines: what changes, what improves, and what limitation remains?

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
- Answer one 4-mark question about **Interrupts and interrupt service routines**. Follow its command word and apply each point to the stated context.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 4.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often memorise register names without roles. Correction: a register earns its name by what it temporarily holds.
Correction prompt: "State the correct term, then explain the relevant process or distinction."

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Interrupt causes, detection and handling

### Direct explanation

- An interrupt is a signal or condition requesting processor attention. Possible causes include input/output devices needing service, a timer used for scheduling, a hardware fault, and a software exception. Applications include responsive input, sharing processor time and dealing promptly with exceptional conditions without continuously polling every device.
- For most maskable interrupts, the processor completes the current instruction and checks for pending enabled interrupts at the end of that fetch-execute cycle, before beginning the next instruction. Detection is therefore not the same as stopping halfway through an ordinary instruction.
- If an interrupt is accepted, the processor checks priority, saves the state needed to resume (such as PC, registers and status), loads or locates the correct interrupt service routine (ISR), executes the ISR, restores the saved state and resumes the interrupted program at the correct next instruction. The ISR is a routine, not the interrupt signal itself.

### Worked example

**Handle a keyboard interrupt:** A key press raises an interrupt while the CPU is executing another program. The CPU finishes its current instruction, detects the pending request at the cycle boundary, saves PC/register/status state, runs the keyboard ISR to read or acknowledge the input, restores the saved state and continues the original program.

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

- **B1** valid cause/application such as I/O, timer, fault or exception
- **B1** current instruction completes and interrupt is detected/checked at the cycle boundary
- **B1** priority/enabled status is checked
- **B1** PC/register/status state is saved
- **B1** correct ISR is located and executed
- **B1** state is restored and the interrupted program resumes

**Strict note:** Do not accept that every interrupt stops an instruction halfway through, that the ISR is the signal, or that the whole interrupted program restarts.
<!-- stage2-completion:end -->

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### What an interrupt is

- **Explains:** `concept`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-048-concept.jpg`

1. Interrupt
2. A signal that causes the processor to pause normal execution and deal with an event.
3. Interrupt service routine
4. A program routine that handles a specific interrupt.
5. Processor state
6. The information needed to continue later, such as PC, registers and status flags.
7. Interrupt flag
8. A stored indication that an interrupt has occurred or is waiting to be handled.

### The interrupt handling cycle

- **Explains:** `cycle`
- **Explanation type:** process
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-048-cycle.jpg`

1. 1. Execute instruction The CPU finishes the current instruction before accepting most maskable interrupts.
2. 2. Check interrupt The control unit checks whether an interrupt is pending and enabled.
3. 3. Save state Important registers, PC and status information are stored, often on a stack.
4. 4. Find ISR The interrupt type is used to locate the correct interrupt service routine.
5. 5. Run ISR The routine handles the event, such as reading a key or acknowledging a device.
6. 6. Restore and return The saved state is restored and the interrupted program continues.
7. Why this matters
8. Saving state is the "bookmark". Without it, the CPU may not know where or how to resume the interrupted program.

### Interrupts versus polling

- **Explains:** `polling`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-048-polling.jpg`

1. Interrupt-driven input
2. The device signals the CPU when attention is needed. The CPU can do useful work meanwhile.
3. Efficient when events are unpredictable.
4. Requires interrupt handling and state saving.
5. Good exam phrase: "CPU does not continually check the device."
6. The CPU repeatedly checks a device or flag to see whether attention is needed.
7. Simple to understand and implement.
8. Can waste processor time if checks are frequent and no event has occurred.
9. Good exam phrase: "regularly checks the status of the device."

### Priority and masking

- **Explains:** `priority`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-048-priority.jpg`

1. Exam-safe wording
2. Priority
3. Some interrupts are more urgent than others.
4. A higher-priority interrupt may be handled before a lower-priority one.
5. Maskable interrupt
6. Can be disabled or delayed by the processor.
7. Used when a less urgent event can wait.
8. Non-maskable interrupt
9. Cannot normally be ignored.
10. Used for critical events such as serious hardware faults.
11. Nested interrupt
12. An interrupt occurs while another ISR is running.

### Where interrupts come from

- **Explains:** `sources`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-048-sources.jpg`

1. Input/output device
2. A keyboard, printer or network interface signals that it needs CPU attention.
3. Example: key pressed; printer buffer ready.
4. A timer interrupt lets an operating system share CPU time between tasks.
5. Example: scheduler checks whether another process should run.
6. Hardware fault
7. A device or hardware condition signals a problem that must be handled.
8. Example: power warning or device failure signal.
9. Software / exception
10. A program event requires special handling.
11. Example: division by zero or system call, depending on architecture.
12. Common error
<!-- stage10-explanations:end -->
