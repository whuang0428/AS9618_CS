# Lesson 048: Interrupts and interrupt service routines

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 1  
**Syllabus reference:** Syllabus Section 4  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Interrupts and interrupt service routines** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- register 寄存器, bus 总线, fetch-decode-execute 取指-译码-执行, interrupt 中断

## Warm-Up Hook
Ask students to act as registers passing one instruction around the room. If the Program Counter forgets its job, the whole class becomes a very expensive paperweight.

Lesson-specific focus question: What would go wrong if a student confused **Interrupts and interrupt service routines** with a neighbouring syllabus idea?

## Guided Explanation
Follow one instruction through the processor. Identify each register or bus only when it does work in the story. Then connect the mechanism to Interrupts and interrupt service routines: what changes, what improves, and what limitation remains?

Topic-specific teaching move: keep the explanation anchored to **Interrupts and interrupt service routines**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: instruction or interrupt scenario. Middle: CPU/register/bus sequence. Right: performance or tracing notes.

Teacher line to reuse: "A correct keyword starts the answer; the explanation earns the mark."

## Worked Example
**Problem:** Trace one fetch-decode-execute cycle and name the role of two registers. The worked example must explicitly use **Interrupts and interrupt service routines**, not a generic example from the wider unit.

**Worked answer / marking focus:** Award marks for correct sequence: address from PC to MAR, instruction/data via memory and MDR, instruction held in CIR, PC updated as appropriate.



## Student Task
Students annotate a CPU diagram with arrows for one instruction, then explain the path in four precise sentences. Their final answer must include the phrase **Interrupts and interrupt service routines** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Interrupts and interrupt service routines**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **Interrupts and interrupt service routines** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Interrupts and interrupt service routines** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 4.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often memorise register names without roles. Correction: a register earns its name by what it temporarily holds. For this lesson, make students contrast that mistake with the exact idea of **interrupts and interrupt service routines**.  
Correction prompt: "Show the mechanism, not just the label."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### What an interrupt is

- **Explains:** `concept`
- **Explanation type:** mechanism
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
12. Common trap
<!-- stage10-explanations:end -->
