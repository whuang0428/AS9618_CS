# Lesson 041: CPU architecture: ALU, CU, registers, buses, and clock

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 4
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **CPU architecture: ALU, CU, registers, buses, and clock** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- register 寄存器, bus 总线, fetch-decode-execute 取指-译码-执行, interrupt 中断

## Warm-Up Hook
Ask students to act as registers passing one instruction around the room. If the Program Counter forgets its job, the whole class becomes a very expensive paperweight.

Lesson-specific focus question: What would go wrong if a student confused **CPU architecture: ALU, CU, registers, buses, and clock** with a neighbouring syllabus idea?

## Guided Explanation
Follow one instruction through the processor. Identify each register or bus only when it does work in the story. Then connect the mechanism to CPU architecture: ALU, CU, registers, buses, and clock: what changes, what improves, and what limitation remains?

Topic-specific teaching move: keep the explanation anchored to **CPU architecture: ALU, CU, registers, buses, and clock**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** Trace one fetch-decode-execute cycle and name the role of two registers. The worked example must explicitly use **CPU architecture: ALU, CU, registers, buses, and clock**, not a generic example from the wider unit.

**Worked answer / marking focus:** Award marks for correct sequence: address from PC to MAR, instruction/data via memory and MDR, instruction held in CIR, PC updated as appropriate.



## Student Task
Students annotate a CPU diagram with arrows for one instruction, then explain the path in four precise sentences. Their final answer must include the phrase **CPU architecture: ALU, CU, registers, buses, and clock** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **CPU architecture: ALU, CU, registers, buses, and clock**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:
"The key point about **CPU architecture: ALU, CU, registers, buses, and clock** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **CPU architecture: ALU, CU, registers, buses, and clock** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 4.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often memorise register names without roles. Correction: a register earns its name by what it temporarily holds. For this lesson, make students contrast that mistake with the exact idea of **cpu architecture: alu, cu, registers, buses, and clock**.
Correction prompt: "Show the mechanism, not just the label."

## Stage 2 syllabus completion

**Official audit rows:** S4.03
**Focus:** Immediate access store (IAS)

### Direct explanation

- The immediate access store is memory directly accessible by the processor for instructions and data currently required. In the stored-program model, instructions and data share this memory and are distinguished by how they are used.
- IAS is not the same as a CPU register or secondary storage. Registers are smaller locations inside the CPU; secondary storage must supply programs/data to main memory before normal execution.

### Worked example

**Run a stored program:** Instructions and working data are loaded from SSD into the IAS/main memory. The CPU fetches an instruction from that memory into the MDR/CIR, then executes it using registers and the ALU.

### Targeted practice and answers

1. What two kinds of item are held in IAS?
   **Answer:** Instructions and data currently required.
2. Is IAS a CPU register?
   **Answer:** No; it is processor-accessible main memory.
3. Why must a program on secondary storage be loaded into IAS?
   **Answer:** The processor fetches executable instructions from directly accessible main memory.

### Exam-style question and MS

**Question (4 marks):** Explain the role of the immediate access store in a stored-program computer.

- **B1** stores instructions currently required
- **B1** stores data currently required
- **B1** processor can directly access/fetch from it
- **B1** instructions and data share memory in Von Neumann architecture

**Strict note:** Do not accept 'IAS is cache' or 'IAS is a register'.

<!-- stage10-explanations:start -->
## Stage 10 causal explanations

### Why a CPU needs specialised parts instead of one general component

- **Explains:** `architecture`
- **Explanation type:** mechanism

CPU components cooperate because processing an instruction requires several different jobs. Registers hold the small values and instructions needed immediately. The control unit interprets the current instruction and sends control signals that coordinate transfers and operations. The ALU performs arithmetic and logical work, while buses carry addresses, data and control signals between the CPU, memory and other components. A clock provides repeated timing signals so these state changes occur in an organised sequence rather than colliding unpredictably. Specialisation makes the movement of data explicit: an address is placed where memory can receive it, returned data is held before use, and the selected operation is applied to the correct operands. Saying that the CPU simply “processes data” hides this mechanism. The processor works because each component performs a limited role and the control unit coordinates those roles for every instruction.

### Why the ALU calculates but the control unit coordinates

- **Explains:** `alu-cu`
- **Explanation type:** comparison

The ALU and control unit are both inside the CPU, but they contribute in different ways. The ALU contains circuits for operations such as addition, subtraction, comparison and Boolean logic. It can produce a result only after it receives operands and an operation to perform. The control unit supplies that coordination. It decodes the instruction in the CIR, identifies the required operation and issues signals that move values between registers, memory and the ALU. This is why the control unit does not itself add two numbers, and the ALU does not decide which instruction should execute next. Their relationship is like selecting and carrying out a command: the control unit determines the sequence and enables the correct pathways; the ALU performs the requested calculation. Confusing the roles produces vague answers because it removes the cause of each component's behaviour.

### Why registers, buses and the clock must work as one timed system

- **Explains:** `registers`
- **Explanation type:** mechanism

Registers provide named holding places for values that the CPU needs during an instruction. A register is useful because its contents can be accessed and changed quickly, but the value still has to reach the correct destination. Buses provide those routes: the address bus identifies a location, the data bus carries the value, and the control bus carries signals such as read or write. The system clock divides activity into coordinated steps. On a clock event, one component may place a value on a bus while another accepts it, preventing unrelated transfers from being treated as the same operation. A higher clock rate allows more timing cycles per second, but it does not guarantee proportional performance because instruction complexity, memory delay and architecture also matter. The mechanism is therefore timed movement between specialised stores, not a collection of independent components working whenever they choose.
<!-- stage10-explanations:end -->
