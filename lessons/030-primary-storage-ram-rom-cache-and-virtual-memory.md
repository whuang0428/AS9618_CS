# Lesson 030: Primary storage: RAM, ROM, cache, and virtual memory

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 3
**Duration:** 45 minutes
**Assessment rhythm:** 5-minute quiz
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Primary storage: RAM, ROM, cache, and virtual memory** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- input 输入, output 输出, storage 存储, logic gate 逻辑门, embedded system 嵌入式系统

## Warm-Up Hook
Place a phone, a keyboard and a USB drive on the desk or name them. Ask: Which one captures data, which one stores it, and which one merely makes humans feel in control?

Lesson-specific focus question: What would go wrong if a student confused **Primary storage: RAM, ROM, cache, and virtual memory** with a neighbouring syllabus idea?

## Guided Explanation
Classify the component first, then examine how it interacts with the rest of the system. Compare at least two alternatives using capacity, speed, durability, cost, accuracy or suitability. End with a scenario so students must justify, not just name, hardware.

Topic-specific teaching move: keep the explanation anchored to **Primary storage: RAM, ROM, cache, and virtual memory**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: component category. Middle: characteristics comparison table. Right: scenario-based recommendation sentence.

Teacher line to reuse: "A correct keyword starts the answer; the explanation earns the mark."

## Worked Example
**Problem:** Choose suitable hardware for a school attendance system and justify two choices. The worked example must explicitly use **Primary storage: RAM, ROM, cache, and virtual memory**, not a generic example from the wider unit.

**Worked answer / marking focus:** Award marks for matching device characteristics to the scenario, such as fast input, reliable storage, or suitable output feedback.



## Student Task
Teams design a hardware set-up for a specific user: librarian, weather station, exam office or delivery driver. They must reject one tempting but unsuitable device. Their final answer must include the phrase **Primary storage: RAM, ROM, cache, and virtual memory** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Primary storage: RAM, ROM, cache, and virtual memory**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:
"The key point about **Primary storage: RAM, ROM, cache, and virtual memory** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Primary storage: RAM, ROM, cache, and virtual memory** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 3.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often list hardware without explaining suitability. Correction: the mark usually comes from matching a feature to a need. For this lesson, make students contrast that mistake with the exact idea of **primary storage: ram, rom, cache, and virtual memory**.
Correction prompt: "Show the mechanism, not just the label."

## Stage 2 syllabus completion

**Official audit rows:** S3.06, S3.07
**Focus:** SRAM, DRAM, PROM, EPROM and EEPROM

### Direct explanation

- SRAM stores bits using flip-flop circuits, needs no refresh and is fast but expensive with lower density, so it is used for cache. DRAM stores charge in capacitors, requires refresh and is slower but cheaper and denser, so it is used for main memory.
- PROM is programmed once. EPROM can be erased with ultraviolet light and reprogrammed. EEPROM is erased and rewritten electrically, often without removing it from the system. All are non-volatile ROM technologies.

### Worked example

**Choose memory for CPU cache:** SRAM is chosen because no refresh and faster access reduce processor waiting; its higher cost and lower capacity are acceptable for a small cache.

### Targeted practice and answers

1. Why is DRAM refreshed?
   **Answer:** Charge in its storage capacitors leaks and must be restored.
2. Which ROM type is erased using ultraviolet light?
   **Answer:** EPROM.
3. Which ROM type can normally be rewritten electrically in circuit?
   **Answer:** EEPROM.

### Exam-style question and MS

**Question (4 marks):** Compare SRAM and DRAM and explain why DRAM is normally used for main memory.

- **B1** SRAM is faster / does not require refresh
- **B1** DRAM requires refresh / is slower
- **B1** DRAM has greater density / lower cost per bit
- **B1** main memory needs large capacity, making DRAM more economical

**Strict note:** Do not award both comparison marks for merely expanding the abbreviations.

<!-- stage10-explanations:start -->
## Stage 10 causal explanations

### Why primary storage must stay close to current processing

- **Explains:** `primary`
- **Explanation type:** mechanism

The processor can only work efficiently when instructions and current data are available through fast, directly addressable storage. Primary storage provides that working area. Programs are copied from secondary storage into RAM because an SSD or hard disk is designed for persistent capacity, not for supplying every instruction at processor speed. While a program runs, RAM holds its active instructions, data and intermediate results so the CPU can fetch them repeatedly. Registers and cache are even closer and faster, but they are much smaller, so they cannot replace RAM for the whole running program. This layered design balances speed, capacity and cost. Calling primary storage a filing cabinet misses the mechanism: it is the live workspace that feeds current processing. When it is too small, the system must move data between RAM and slower storage more often, which is why performance can fall even though no computation has changed.

### Why RAM is temporary while ROM remains stable

- **Explains:** `ram-rom`
- **Explanation type:** comparison

RAM and ROM serve different jobs because the system needs both changeable working space and stable startup instructions. RAM is read and written continually as applications create variables, load files and produce intermediate results. Its contents are volatile, so removing power clears that temporary electrical state. This is acceptable because the working data can be recreated or loaded again. ROM stores instructions that should remain available when the machine is powered off, such as firmware needed to begin the startup process. Its non-volatile design preserves those instructions without power, while normal operation does not require them to be rewritten constantly. The distinction is therefore not simply that one can be read and the other cannot: modern ROM technologies may be updated under controlled conditions. The important causal difference is how often the contents must change and whether they must survive loss of power.

### Why cache accelerates access while virtual memory usually slows it

- **Explains:** `cache-vm`
- **Explanation type:** comparison

Cache and virtual memory both affect the apparent amount of useful memory, but they solve opposite problems. Cache keeps copies of recently or frequently used instructions and data in very fast storage close to the CPU. Programs often reuse nearby values, so a cache hit avoids a slower trip to RAM and reduces the time the processor waits. Virtual memory is used when RAM cannot hold all active pages. The operating system moves less active pages to secondary storage and brings them back when required. This prevents an immediate out-of-memory failure, but secondary storage is much slower than RAM, so repeated page movement can make the system feel unresponsive. More cache does not permanently store more user data, and virtual memory does not make a computer faster. Cache exploits locality to reduce access time; virtual memory trades speed for the ability to continue running a larger working set.
<!-- stage10-explanations:end -->
