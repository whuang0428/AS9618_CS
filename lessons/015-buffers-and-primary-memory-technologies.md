# Lesson 015: Buffers and primary memory technologies

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029 Version 2<br>
**Paper:** Paper 1<br>
**Syllabus:** Section 3: Hardware<br>
**Syllabus requirements:** S3.04, S3.05, S3.06, S3.07<br>
**Pacing:** Flexible. Select the material set and practice depth needed by the learner.

## Teaching-depth menu

- **Quick route:** Use the diagnostic, learning objectives, first worked example and foundation question. Stop once the learner can explain the central distinction accurately.
- **Full route:** Use every knowledge-point material set, the worked method, the terminology check and all questions.
- **Deep route:** Add the prerequisite refresher, ask learners to connect the concept checklist, discuss the labelled extension and complete a transfer question without a model answer.

## 1. Prerequisite knowledge and quick diagnostic

Recall S3.05 before starting this lesson.

Ask the learner to give one accurate definition or method step before continuing. If they cannot, briefly revisit the named prerequisite rather than repeating the whole previous lesson.

### Optional prerequisite refresher

- Explain the differences between RAM and ROM, including their use in a range of devices and systems.
- Distinguish RAM and ROM.


## 2. Knowledge explanation

### 1. Buffers between different-speed devices (S3.04)

**Concept map:** buffer → temporarily → different

**Three-part explanation:**

1. Show understanding of the use of buffers, including temporary storage used to manage different producer and consumer rates
2. An output buffer temporarily holds data because the processor can produce it faster or in different-sized bursts than a printer or audio device can consume it
3. ROM is not ordinary long-term storage for user files

**Concrete cue:** Show understanding of the use of buffers, including temporary storage used to manage different producer and consumer rates.

#### Why cache helps and virtual memory slows

![Why cache helps and virtual memory slows](../web/assets/diagrams/stage10-infographics/stage10-lesson-031-cache-vm.jpg)

<details><summary>Text transcript</summary>

- Cache holds copies of recently or frequently used instructions and data close to the CPU.
- A cache hit avoids a slower main-memory access.
- Virtual memory uses secondary storage when RAM is insufficient and increases apparent capacity rather than physical RAM speed.

</details>

#### What secondary storage does

![What secondary storage does](../web/assets/diagrams/stage10-infographics/stage10-lesson-032-purpose.jpg)

<details><summary>Text transcript</summary>

- Non-volatile Data remains when power is switched off.
- Long-term Stores files, programs, backups and operating system data.
- Usually slower Secondary storage is usually slower than RAM for direct access.
- Scenario-based The best medium depends on speed, capacity, durability, portability and cost.

</details>

#### Memory is not the same as storage

![Memory is not the same as storage](../web/assets/diagrams/stage10-infographics/stage10-lesson-028-memory-storage.jpg)

<details><summary>Text transcript</summary>

- Primary memory
- Secondary storage
- Holds data/instructions currently being used.
- Holds files and data long term.
- Volatility
- RAM is volatile; contents are lost without power.
- Non-volatile; data remains when power is off.
- Speed and capacity

</details>

<details><summary>Precise syllabus wording</summary>

Understand why buffers are used.

Show understanding of the use of buffers, including temporary storage used to manage different producer and consumer rates.

</details>

### 2. RAM · ROM (S3.05)

**Concept map:** RAM → ROM

**Three-part explanation:**

1. Explain the differences between RAM and ROM, including their use in a range of devices and systems
2. Explain the differences between SRAM and DRAM, including their uses in a range of devices and systems and the reasons for choosing one instead of the…
3. Reflected-light differences are read as data

**Concrete cue:** Explain the differences between RAM and ROM, including their use in a range of devices and systems.

#### Why RAM changes while ROM remains stable

![Why RAM changes while ROM remains stable](../web/assets/diagrams/stage10-infographics/stage10-lesson-031-ram-rom.jpg)

<details><summary>Text transcript</summary>

- RAM holds the changing state of running programs.
- Most RAM needs continuous power to preserve that state.
- ROM retains fixed startup instructions when power is removed.

</details>

<details><summary>Precise syllabus wording</summary>

Distinguish RAM and ROM.

Explain the differences between RAM and ROM, including their use in a range of devices and systems.

</details>

### 3. SRAM · DRAM · Cache · Main memory (S3.06)

**Concept map:** SRAM → DRAM → cache → main memory

**Three-part explanation:**

1. Explain the differences between SRAM and DRAM, including their uses in a range of devices and systems and the reasons for choosing one instead of the…
2. Explain the differences between RAM and ROM, including their use in a range of devices and systems
3. DRAM stores charge in capacitors, requires refresh and is slower but cheaper and denser, so it is used for main memory

**Concrete cue:** Explain the differences between SRAM and DRAM, including their uses in a range of devices and systems and the reasons for choosing one instead of the other.

#### Why cache helps and virtual memory slows

![Why cache helps and virtual memory slows](../web/assets/diagrams/stage10-infographics/stage10-lesson-031-cache-vm.jpg)

<details><summary>Text transcript</summary>

- Cache holds copies of recently or frequently used instructions and data close to the CPU.
- A cache hit avoids a slower main-memory access.
- Virtual memory uses secondary storage when RAM is insufficient and increases apparent capacity rather than physical RAM speed.

</details>

<details><summary>Precise syllabus wording</summary>

Explain uses of SRAM and DRAM and reasons for each use.

Explain the differences between SRAM and DRAM, including their uses in a range of devices and systems and the reasons for choosing one instead of the other.

</details>

### 4. PROM · EPROM · EEPROM (S3.07)

**Concept map:** PROM → EPROM → EEPROM

**Three-part explanation:**

1. Explain the difference between PROM, EPROM and EEPROM, including how each can be programmed or erased
2. EPROM can be erased with ultraviolet light and reprogrammed
3. EEPROM is erased and rewritten electrically, often without removing it from the system

**Concrete cue:** A one-time configuration may use PROM; UV-erasable lab firmware may use EPROM; updateable device firmware commonly uses EEPROM.



<details><summary>Precise syllabus wording</summary>

Understand PROM, EPROM and EEPROM.

Explain the difference between PROM, EPROM and EEPROM, including how each can be programmed or erased.

</details>

### Supporting diagram library

#### Why active data stays close to the CPU

![Why active data stays close to the CPU](../web/assets/diagrams/stage10-infographics/stage10-lesson-031-primary.jpg)

<details><summary>Text transcript</summary>

- The CPU repeatedly requests current instructions and data.
- Nearby electronic storage answers with less delay than secondary storage.
- Faster access prevents the processor waiting as often.

</details>

<details><summary>Open precise terminology and exam facts</summary>

- Show understanding of the use of buffers, including temporary storage used to manage different producer and consumer rates.
- Explain the differences between RAM and ROM, including their use in a range of devices and systems.
- Explain the differences between SRAM and DRAM, including their uses in a range of devices and systems and the reasons for choosing one instead of the other.
- Explain the difference between PROM, EPROM and EEPROM, including how each can be programmed or erased.
- A speaker uses a DAC/amplifier to drive a coil and cone, producing pressure waves. An output buffer temporarily holds data because the processor can produce it faster or in different-sized bursts than a printer or audio device can consume it.
- An HDD spins magnetic platters while an actuator positions read/write heads; writing changes magnetic orientation and reading senses it. Flash memory stores charge in floating-gate cells and has no moving parts.
- An optical drive spins a disc and directs a laser at its track. Reflected-light differences are read as data; a writer uses a higher-power laser to change a dye or recording layer.
- A magnetic HDD uses moving read/write heads over rotating platters. Flash memory stores charge electronically with no moving parts. An optical disc reader/writer uses a laser to read marks and, on writable media, to create or alter marks.
- RAM is volatile read/write primary memory used for programs and data currently being processed. ROM is non-volatile primary memory used for instructions that must remain when power is removed, such as firmware or start-up instructions. ROM is not ordinary long-term storage for user files.
- SRAM stores bits using flip-flop circuits, needs no refresh and is fast but expensive with lower density, so it is used for cache. DRAM stores charge in capacitors, requires refresh and is slower but cheaper and denser, so it is used for main memory.
- PROM is programmed once. EPROM can be erased with ultraviolet light and reprogrammed. EEPROM is erased and rewritten electrically, often without removing it from the system. All three are non-volatile ROM technologies.
- Required device overview: a laser printer uses an electrostatic drum, laser, toner and fuser; a 3D printer builds successive layers; a speaker converts an electrical signal into sound. An HDD or magnetic hard disk uses rotating magnetic platters, flash memory stores charge electronically, and an optical reader/writer uses a laser.

</details>

### Worked example

1. Print a page
2. Read an HDD block
3. Choose a storage mechanism
4. Choose memory for a computer system
5. The operating system places page data in a print buffer.
6. The CPU can continue other work while the slower printer consumes buffered data and performs drum, toner and fusing stages.

Beyond syllabus / 延伸知识（不要求背诵）: professional device selection also considers accessibility, reliability, repairability and energy use.
## 3. Practice by question type

### Question 1 - foundation - explain - 8 marks

Explain why a buffer is used when a computer sends a large document to a laser printer. Describe how data is read from a magnetic hard disk drive. Explain how an HDD, flash memory and an optical reader/writer store or retrieve data. Compare SRAM and DRAM and explain why DRAM is normally used for main memory.

**Answer:** processor/computer and printer operate at different speeds; buffer temporarily stores print data; printer reads data at its own rate; computer/processor can continue other processing without waiting for the full print; platters rotate; actuator positions read/write head over the required track; required sector passes beneath the head; head senses magnetic patterns which are decoded as data; HDD mechanism; flash mechanism; optical reader/writer mechanism; SRAM is faster / does not require refresh; DRAM requires refresh / is slower; DRAM has greater density / lower cost per bit; main memory needs large capacity, making DRAM more economical

**Marking guidance:** Do not accept 'the buffer makes the printer faster'; it manages transfer-rate differences. Do not accept a laser-based explanation for an HDD; lasers apply to optical media. Do not describe every storage device as magnetic. Do not award both comparison marks for merely expanding the abbreviations.

**Common error:** For the command word explain, perform that exact action; do not replace it with an unrelated fact.

### Question 2 - application - compare - 2 marks

Compare PROM, EPROM and EEPROM.

**Answer:** PROM is programmed once; EPROM is erased with ultraviolet light; EEPROM is erased and rewritten electrically.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not repeat the same point in different words; each mark needs a separate idea or method step.

### Question 3 - transfer - explain - 2 marks

Why is DRAM refreshed?

**Answer:** Charge in its storage capacitors leaks and must be restored.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not copy the worked example unchanged; transfer the method and check it against the new context.

### Related past-paper indexes

| Reference | Marks | Command word | Question type |
|---|---:|---|---|
| 9618/11/W/25 Q10(b) | 1 | explain | explain |
| 9618/13/W/24 Q2(b) | 4 | explain | explain |
| 9618/13/W/24 Q3 | 3 | explain | explain |
| 9618/12/W/24 Q2(c) | 2 | describe | explain |

These are indexes only. Cambridge question and mark-scheme wording is not reproduced.

## 4. Summary and exam reminders

### Summary

- Define buffers and primary memory technologies with the exact technical vocabulary expected by the syllabus.
- Use the lesson method on a fresh context and show the intermediate decision, representation or calculation.
- Match the shape of the answer to the command word and the available marks.
- Check the final answer against the scenario instead of repeating a memorised sentence.

### Common error to correct

Students often list hardware without explaining suitability. Correction: the mark usually comes from matching a feature to a need.

### Exam technique

- Follow the command word: state gives a fact; explain links a cause to a consequence; compare covers both sides.
- Match the number of independent points or method steps to the available marks.
- For buffers and primary memory technologies, use the exact technical term before applying it to the scenario.
