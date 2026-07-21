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
