# Lesson 043: System buses, ports and processor performance

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice contain the assessed syllabus points added for this lesson. Other activities remain part of this lesson unless they are individually labelled Optional.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** System buses, ports and processor performance

### Direct explanation

- The address bus carries the address of the memory or I/O location being accessed and is normally directed from the processor. The data bus carries data and instructions in either direction. The control bus carries control and timing signals in both directions overall, including read/write signals from the CPU and interrupt or status signals toward it.
- A memory read uses all three buses: the CPU places the required address on the address bus, sends a read signal on the control bus, and memory returns the requested data or instruction on the data bus. A bus transfers signals; it does not permanently store them.
- USB is a general serial interface carrying digital data and often power for peripherals. HDMI carries digital video and audio. VGA carries analogue video and does not carry audio in the standard VGA signal. Port choice must match the peripheral and signal rather than rely on a claim that one connector is always best.
- Processor performance depends on processor type, number of cores, bus width, clock speed and cache memory. Processor type means the processor architecture and instruction-set design, including how much useful work its execution units can perform for a particular instruction or workload; a clock-rate comparison alone is therefore not sufficient.
- More cores can execute independent threads concurrently when software exposes parallel work. Wider data buses can transfer more bits per transfer, while address-bus width affects the address space. Higher clock speed provides more clock cycles per second, and cache reduces waiting when frequently used instructions or data are found close to the CPU.
- No factor guarantees that every program runs faster. Performance must be justified for the stated workload, because software parallelism, instruction-set compatibility, cache behaviour, memory traffic, heat and other bottlenecks can limit the benefit.

### Worked example

**Read memory, then connect a display / Compare two processors for two workloads:** To read address 240, the CPU puts 240 on the address bus and read on the control bus; memory returns the contents on the data bus. To connect the computer to a modern TV with one digital audio/video cable, choose HDMI. A keyboard or removable drive commonly uses USB, while a legacy analogue display may use VGA. Processor A has four faster general-purpose cores and a larger cache; Processor B has eight specialised cores but a lower clock speed. A lightly threaded office program may favour A's processor type, clock behaviour and cache, while a parallel workload written for B's processor type may use more cores. Bus width and memory traffic must also be considered before reaching a conclusion.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. Which bus carries an address, which carries a value, and which carries read/write signals?
   **Answer:** Address bus; data bus; control bus.
2. Complete a trace table for a memory read using the three buses.
   **Answer:** Address on address bus, read signal on control bus, requested data/instruction from memory on data bus.
3. Which port commonly carries both digital video and audio?
   **Answer:** HDMI.
4. Which named port carries analogue video?
   **Answer:** VGA.
5. Give one USB use or facility.
   **Answer:** A digital peripheral connection such as keyboard/storage, often also supplying electrical power.
6. What does processor type mean as a performance factor?
   **Answer:** The processor architecture/instruction-set and execution design, which determines what work it can perform per instruction or for a particular workload.
7. Why do more cores not always improve one program?
   **Answer:** The program must contain independent threads or tasks that can run in parallel.
8. How can bus width affect performance?
   **Answer:** A wider data bus can transfer more bits per transfer; address-bus width affects the address space rather than directly guaranteeing speed.
9. Why can cache improve performance?
   **Answer:** A cache hit supplies frequently used data or instructions faster than main memory, reducing CPU waiting.

### Exam-style question and MS

**Question (12 marks):** Describe a memory read using the address, data and control buses, then choose USB, HDMI or VGA for one stated peripheral connection. Two computers have different processor types. Explain how processor type, number of cores, bus width, clock speed and cache can affect their performance for a stated workload.

| Answer | Guidance | Marks |
|---|---|---:|
| address bus carries the required memory/I/O address | Do not swap the address and data buses or claim that VGA normally carries digital audio. Do not accept processor type as only a brand name, or claim that the highest clock speed or largest core count always wins. | 1 |
| control bus carries the read signal |  | 1 |
| data bus returns the requested data/instruction |  | 1 |
| USB matched to a suitable digital peripheral/data/power use |  | 1 |
| HDMI matched to digital video and audio |  | 1 |
| VGA matched to analogue video without standard audio |  | 1 |
| processor type linked to architecture/instruction-set/execution design and workload |  | 1 |
| cores linked to available parallel threads/tasks |  | 1 |
| bus width linked accurately to bits transferred or address space |  | 1 |
| clock speed linked to cycles per second |  | 1 |
| cache linked to reducing slower main-memory access |  | 1 |
| conclusion recognises workload and bottlenecks rather than claiming one factor guarantees speed |  | 1 |
<!-- stage2-practice:end -->
<!-- stage2-completion:end -->

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 4
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Identify the processor components or operations involved in **The fetch-decode-execute cycle**.
2. Describe the sequence of data, address and control transfers.
3. Explain the effect of the relevant architecture or performance factor.

## Key Vocabulary
English first, Chinese support:

- register 寄存器, bus 总线, fetch-decode-execute 取指-译码-执行, interrupt 中断

## Warm-Up Hook
Give students the roles of named registers and ask them to pass an instruction through the fetch stage in the correct order. Use any incorrect transfer to clarify each register's function.

Focus question: Which feature distinguishes **The fetch-decode-execute cycle** from the most closely related syllabus concept?

## Guided Explanation
Follow one instruction through the processor. Identify each register or bus only when it does work in the story. Then connect the mechanism to The fetch-decode-execute cycle: what changes, what improves, and what limitation remains?

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
**Problem:** Trace one instruction through PC, MAR, MDR and CIR during the fetch stage.

**Worked answer / marking focus:** PC holds the address; address is copied to MAR; memory returns instruction to MDR; instruction is copied to CIR; PC is incremented. Credit sequence.

## Student Task
Students annotate a CPU diagram with numbered arrows for each fetch step.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **The fetch-decode-execute cycle**. Follow its command word and apply each point to the stated context.

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

### The cycle in one clean sentence

- **Explains:** `cycle`
- **Explanation type:** process
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-043-cycle.jpg`

1. The CPU gets the next instruction from main memory using the address stored in the PC.
2. The CU interprets the instruction in the CIR and identifies the operation and any operands needed.
3. The CPU carries out the instruction, for example using the ALU, accessing memory, or changing the PC.

### Trace one instruction through the fetch stage

- **Explains:** `cycle-visual`
- **Explanation type:** process
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-043-cycle-visual.jpg`

1. Copy the next-instruction address from PC to MAR and read the instruction from memory into MDR.
2. Move the fetched instruction from MDR to CIR.
3. Increment PC independently so that PC points to the next instruction.
4. PC does not feed CIR; only the instruction held in MDR is transferred to CIR.

### Decode and execute are not filler words

- **Explains:** `decode`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-043-decode.jpg`

1. The control unit interprets the instruction in the CIR. It identifies the opcode, decides what operation is required, and identifies any operands or addresses needed.
2. Execute: arithmetic or logic
3. If the instruction is arithmetic or logical, the ALU performs the operation and a result may be stored in a register.
4. Execute: memory access
5. If the instruction needs data from memory, the CPU uses buses and registers to read from or write to the required memory address.
6. Execute: branch
7. If the instruction is a branch/jump, the PC may be changed to a different address rather than just continuing with the next instruction.
8. Common error
9. "Execute" does not always mean "ALU does maths". Some instructions move data, access memory or change the PC.

### Fetch stage: the register sequence

- **Explains:** `fetch`
- **Explanation type:** process
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-043-fetch.jpg`

1. This is the part students must be able to trace precisely.
2. Register / bus focus
3. Exam-safe wording
4. Address copied from PC to MAR.
5. PC -> MAR
6. The PC contains the address of the next instruction; this address is copied to the MAR.
7. Address sent to memory.
8. Address bus
9. The address in the MAR is placed on the address bus.
10. Memory read signal is sent.
11. Control bus
12. The CU sends a read signal on the control bus.

### The four fetch-stage names you cannot blur together

- **Explains:** `registers`
- **Explanation type:** process
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-043-registers.jpg`

1. Register roles
2. PC Program Counter: stores the address of the next instruction to be fetched.
3. MAR Memory Address Register: stores the address of the memory location being accessed.
4. MDR Memory Data Register: stores data or an instruction being transferred to or from memory.
5. CIR Current Instruction Register: stores the instruction currently being decoded/executed.

### Bus width and addressable locations

- **Explains:** `width`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-045-width.jpg`

1. Address bus width
2. If the address bus has n lines, it can represent 2^n different addresses.
3. A 16-bit address bus can address 2^16 = 65,536 memory locations.
4. Data bus width
5. A wider data bus can transfer more bits at once, which can affect throughput.
6. Precision
7. Address bus width affects address range; data bus width affects transfer size.
<!-- stage10-explanations:end -->
