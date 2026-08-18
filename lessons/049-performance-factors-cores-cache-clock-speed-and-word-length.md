# Lesson 049: Performance factors: cores, cache, clock speed, and word length

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 1  
**Syllabus reference:** Syllabus Section 4  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Performance factors: cores, cache, clock speed, and word length** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- register 寄存器, bus 总线, fetch-decode-execute 取指-译码-执行, interrupt 中断

## Warm-Up Hook
Ask students to act as registers passing one instruction around the room. If the Program Counter forgets its job, the whole class becomes a very expensive paperweight.

Lesson-specific focus question: What would go wrong if a student confused **Performance factors: cores, cache, clock speed, and word length** with a neighbouring syllabus idea?

## Guided Explanation
Follow one instruction through the processor. Identify each register or bus only when it does work in the story. Then connect the mechanism to Performance factors: cores, cache, clock speed, and word length: what changes, what improves, and what limitation remains?

Topic-specific teaching move: keep the explanation anchored to **Performance factors: cores, cache, clock speed, and word length**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** Trace one fetch-decode-execute cycle and name the role of two registers. The worked example must explicitly use **Performance factors: cores, cache, clock speed, and word length**, not a generic example from the wider unit.

**Worked answer / marking focus:** Award marks for correct sequence: address from PC to MAR, instruction/data via memory and MDR, instruction held in CIR, PC updated as appropriate.



## Student Task
Students annotate a CPU diagram with arrows for one instruction, then explain the path in four precise sentences. Their final answer must include the phrase **Performance factors: cores, cache, clock speed, and word length** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Performance factors: cores, cache, clock speed, and word length**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **Performance factors: cores, cache, clock speed, and word length** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Performance factors: cores, cache, clock speed, and word length** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 4.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often memorise register names without roles. Correction: a register earns its name by what it temporarily holds. For this lesson, make students contrast that mistake with the exact idea of **performance factors: cores, cache, clock speed, and word length**.  
Correction prompt: "Show the mechanism, not just the label."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Cache: reduce slow memory access

- **Explains:** `cache`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-049-cache.jpg`

1. 1. CPU requests data The CPU needs an instruction or data item.
2. 2. Cache checked first Cache is much faster than main memory.
3. 3. Cache hit If found, access is fast and the CPU waits less.
4. 4. Cache miss If not found, data is fetched from slower main memory and may be copied into cache.
5. Common trap
6. Cache is not the same as RAM capacity. It is smaller, faster and used to reduce repeated slow access to main memory.

### Clock speed: more cycles per second

- **Explains:** `clock`
- **Explanation type:** process
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-049-clock.jpg`

1. Mechanism
2. A higher clock speed means more fetch-decode-execute cycle steps can be started per second, if other parts keep up.
3. 3.6 GHz means 3.6 billion clock cycles per second, not automatically 3.6 billion completed programs.
4. Limitation
5. Memory access, heat, power use and CPU architecture can limit the real improvement.

### Performance factor means a hardware feature that can affect processing speed

- **Explains:** `concept`
- **Explanation type:** process
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-049-concept.jpg`

1. Clock speed
2. How many clock cycles the CPU can perform per second, commonly measured in Hz/GHz.
3. Processing units that can execute instructions independently, allowing parallel work.
4. Small, fast memory close to the CPU storing frequently or recently used data/instructions.
5. Word length
6. The number of bits the CPU can process as a unit in one operation/register word.

### Cores: more independent processing units

- **Explains:** `cores`
- **Explanation type:** process
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-049-cores.jpg`

1. Where extra cores help
2. Several programs running at the same time.
3. Tasks that can be split into parallel threads.
4. Background tasks while a foreground task remains responsive.
5. Where extra cores may not help much
6. A single-threaded program that cannot be divided.
7. A task waiting for disk, network or memory.
8. Software that was not designed for parallel processing.

### Performance is limited by bottlenecks

- **Explains:** `limits`
- **Explanation type:** tradeoff
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-049-limits.jpg`

1. Memory bottleneck A fast CPU still waits if data arrives slowly from memory.
2. Software bottleneck Single-threaded code cannot fully use many cores.
3. Heat and power Higher clock speed can require more power and produce more heat.
4. Architecture Different CPU designs may do different amounts of work per clock cycle.

### Word length: bits processed as a unit

- **Explains:** `word`
- **Explanation type:** process
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-049-word.jpg`

1. Explanation
2. Exam-safe wording
3. Larger values
4. More bits can represent larger numbers in one word.
5. A longer word can process larger data values in a single operation.
6. More precision
7. More bits can support greater numeric precision where relevant.
8. Useful for calculations needing larger or more precise operands.
9. Addressing
10. In some architectures, word/register/address size can affect addressable memory.
11. Do not claim this without linking it to the architecture or address size.
12. Limitation
<!-- stage10-explanations:end -->
