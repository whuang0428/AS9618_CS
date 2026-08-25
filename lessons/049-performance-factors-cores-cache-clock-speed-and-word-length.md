# Lesson 049: Performance factors: cores, cache, clock speed, and word length

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 1  
**Syllabus reference:** Syllabus Section 4  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Identify the processor components or operations involved in **Performance factors: cores, cache, clock speed, and word length**.
2. Describe the sequence of data, address and control transfers.
3. Explain the effect of the relevant architecture or performance factor.

## Key Vocabulary
English first, Chinese support:

- register 寄存器, bus 总线, fetch-decode-execute 取指-译码-执行, interrupt 中断

## Warm-Up Hook
Give students the roles of named registers and ask them to pass an instruction through the fetch stage in the correct order. Use any incorrect transfer to clarify each register's function.

Focus question: Which feature distinguishes **Performance factors: cores, cache, clock speed, and word length** from the most closely related syllabus concept?

## Guided Explanation
Follow one instruction through the processor. Identify each register or bus only when it does work in the story. Then connect the mechanism to Performance factors: cores, cache, clock speed, and word length: what changes, what improves, and what limitation remains?

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
- Answer one 4-mark question about **Performance factors: cores, cache, clock speed, and word length**. Follow its command word and apply each point to the stated context.

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

### Cache: reduce slow memory access

- **Explains:** `cache`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-049-cache.jpg`

1. 1. CPU requests data The CPU needs an instruction or data item.
2. 2. Cache checked first Cache is much faster than main memory.
3. 3. Cache hit If found, access is fast and the CPU waits less.
4. 4. Cache miss If not found, data is fetched from slower main memory and may be copied into cache.
5. Common error
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

1. One thread can execute on only one core at a time.
2. A single-threaded task cannot run its own instructions concurrently across several cores.
3. Other cores may still execute operating-system work or other processes; they are not necessarily idle.

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
