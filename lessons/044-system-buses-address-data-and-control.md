# Lesson 044: System buses: address, data, and control

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 4
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **System buses: address, data, and control** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- register 寄存器, bus 总线, fetch-decode-execute 取指-译码-执行, interrupt 中断

## Warm-Up Hook
Ask students to act as registers passing one instruction around the room. If the Program Counter forgets its job, the whole class becomes a very expensive paperweight.

Lesson-specific focus question: What would go wrong if a student confused **System buses: address, data, and control** with a neighbouring syllabus idea?

## Guided Explanation
Follow one instruction through the processor. Identify each register or bus only when it does work in the story. Then connect the mechanism to System buses: address, data, and control: what changes, what improves, and what limitation remains?

Topic-specific teaching move: keep the explanation anchored to **System buses: address, data, and control**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** Trace one fetch-decode-execute cycle and name the role of two registers. The worked example must explicitly use **System buses: address, data, and control**, not a generic example from the wider unit.

**Worked answer / marking focus:** Award marks for correct sequence: address from PC to MAR, instruction/data via memory and MDR, instruction held in CIR, PC updated as appropriate.



## Student Task
Students annotate a CPU diagram with arrows for one instruction, then explain the path in four precise sentences. Their final answer must include the phrase **System buses: address, data, and control** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **System buses: address, data, and control**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:
"The key point about **System buses: address, data, and control** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **System buses: address, data, and control** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 4.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often memorise register names without roles. Correction: a register earns its name by what it temporarily holds. For this lesson, make students contrast that mistake with the exact idea of **system buses: address, data, and control**.
Correction prompt: "Show the mechanism, not just the label."

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
11. Common trap
12. Read and write both use all three buses, but the direction of data transfer changes.

### The three buses

- **Explains:** `three-buses`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-044-three-buses.jpg`

1. Typical direction
2. Exam-safe sentence
3. Address bus
4. Memory or I/O address identifying a location.
5. Usually from CPU to memory/I/O.
6. The address bus carries the address of the location to be read from or written to.
7. Data bus
8. Data or instructions being transferred.
9. Usually bidirectional.
10. The data bus carries the actual data or instruction between CPU, memory and devices.
11. Control bus
12. Control and timing signals such as read, write, interrupt and clock signals.

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
