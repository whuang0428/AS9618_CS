# Lesson 015: Buffers and primary memory technologies

**Course:** Cambridge International AS Level Computer Science 9618, syllabus for examination in 2027-2029<br>
**Paper:** Paper 1<br>
**Syllabus:** Section 3: Hardware<br>
**Syllabus requirements:** S3.04, S3.05, S3.06, S3.07<br>
**Pacing:** Flexible. Select a quick, full or deep route for the learners in front of you.

## Teaching-depth menu

- **Quick route:** Use the diagnostic, learning objectives, first worked example and foundation question. Stop once the learner can explain the central distinction accurately.
- **Full route:** Teach every knowledge-point material set, the worked method and all lesson questions.
- **Deep route:** Add the prerequisite refresher, ask learners to connect the concept checklist, discuss the labelled extension and complete a transfer question without a model answer.

## 1. Prerequisite knowledge and quick diagnostic

Recall S3.05 before starting this lesson.

Ask the learner to give one accurate definition or method step before continuing. If they cannot, briefly revisit the named prerequisite rather than repeating the whole previous lesson.

### Optional prerequisite refresher

- Explain the differences between RAM and ROM, including their use in a range of devices and systems.
- Distinguish RAM and ROM.


## 2. Knowledge explanation

### 1. Why buffers are used (S3.04)

**Atomic learning targets**

- **S3.04.A01:** buffer
- **S3.04.A02:** temporarily
- **S3.04.A03:** different / speed

**Core explanation**

- A speaker uses a DAC/amplifier to drive a coil and cone, producing pressure waves. An output buffer temporarily holds data because the processor can produce it faster or in different-sized bursts than a printer or audio device can consume it.
- A driver converts a general request into device-specific commands. A buffer absorbs the speed difference between producer and device.
- A buffer absorbs the speed difference between producer and device.

**Mechanism or method**

1. **Identify the relevant condition or input** — A speaker uses a DAC/amplifier to drive a coil and cone, producing pressure waves.
2. **Trace how the process works** — An output buffer temporarily holds data because the processor can produce it faster or in different-sized bursts than a printer or audio device can consume it.
3. **Connect the mechanism to its result** — A driver converts a general request into device-specific commands.

#### Worked example: Why buffers are used: complete worked route

1. **Identify the relevant condition or input**

A speaker uses a DAC/amplifier to drive a coil and cone, producing pressure waves.

2. **Trace how the process works**

An output buffer temporarily holds data because the processor can produce it faster or in different-sized bursts than a printer or audio device can consume it.

3. **Connect the mechanism to its result**

A driver converts a general request into device-specific commands.

4. **Complete example**

Print a page / Read an HDD block / Choose a storage mechanism / Choose memory for a computer system: The operating system places page data in a print buffer. The CPU can continue other work while the slower printer consumes buffered data and performs drum, toner and fusing stages. The controller moves the head to the correct track, waits for the sector to rotate beneath it, senses magnetic patterns and transfers the decoded bits through a buffer.

**Misconceptions to correct**

- Students often list hardware without explaining suitability. Correction: the mark usually comes from matching a feature to a need.

#### Mastery check (MC-L015-S3.04)

Explain the following targets in one connected answer, using a concrete example for each: buffer; temporarily; different / speed.

<details><summary>Answer criteria</summary>

- A speaker uses a DAC/amplifier to drive a coil and cone, producing pressure waves. An output buffer temporarily holds data because the processor can produce it faster or in different-sized bursts than a printer or audio device can consume it.
- A driver converts a general request into device-specific commands. A buffer absorbs the speed difference between producer and device.
- A buffer absorbs the speed difference between producer and device.

</details>

**Supplementary concept map**

- **Producer:** Creates data at one rate
- **Buffer:** Temporary holding area
- **Consumer:** Uses data at another rate
- **Mismatch:** Speeds differ temporarily
- **temporarily:** An output buffer temporarily holds data because the…
- **speed:** A buffer absorbs the speed difference between producer…

**Supplementary three-step recap**

1. **Translate the stated design** — A buffer absorbs the speed difference between producer and device.
2. **Apply one complete operation** — An output buffer temporarily holds data because the processor can produce it faster or in different-sized bursts than…
3. **Trace state and boundaries** — Why buffers are used.

**Why drivers, buffers and queues work together:** A driver converts a general request into device-specific commands. A buffer absorbs the speed difference between producer and device.

#### Why drivers, buffers and queues work together

![Why drivers, buffers and queues work together](../web/assets/diagrams/stage10-infographics/stage10-lesson-054-device.jpg)

<details><summary>Text transcript</summary>

- A driver converts a general request into device-specific commands.
- A buffer absorbs the speed difference between producer and device.
- A queue preserves an orderly sequence of pending requests.

</details>

<details><summary>Precise syllabus wording</summary>

Understand why buffers are used.

Show understanding of the use of buffers, including temporary storage used to manage different producer and consumer rates.

</details>

### 2. RAM and ROM (S3.05)

**Atomic learning targets**

- **S3.05.A01:** RAM
- **S3.05.A02:** ROM

**Core explanation**

- SRAM stores bits using flip-flop circuits, needs no refresh and is fast but expensive with lower density, so it is used for cache. DRAM stores charge in capacitors, requires refresh and is slower but cheaper and denser, so it is used for main memory.
- RAM is volatile read/write primary memory used for programs and data currently being processed. ROM is non-volatile primary memory used for instructions that must remain when power is removed, such as firmware or start-up instructions. ROM is not ordinary long-term storage for user files.
- Explain the differences between SRAM and DRAM, including their uses in a range of devices and systems and the reasons for choosing one instead of the other.

**Mechanism or method**

1. **Identify the relevant condition or input** — SRAM stores bits using flip-flop circuits, needs no refresh and is fast but expensive with lower density, so it is used for cache.
2. **Trace how the process works** — DRAM stores charge in capacitors, requires refresh and is slower but cheaper and denser, so it is used for main memory.
3. **Connect the mechanism to its result** — RAM is volatile read/write primary memory used for programs and data currently being processed.

#### Worked example: RAM and ROM: complete worked route

1. **Identify the relevant condition or input**

SRAM stores bits using flip-flop circuits, needs no refresh and is fast but expensive with lower density, so it is used for cache.

2. **Trace how the process works**

DRAM stores charge in capacitors, requires refresh and is slower but cheaper and denser, so it is used for main memory.

3. **Connect the mechanism to its result**

RAM is volatile read/write primary memory used for programs and data currently being processed.

4. **Complete example**

Use DRAM as main RAM because its density and lower cost support a large working capacity. Use a small amount of SRAM for cache because faster, no-refresh access reduces processor waiting. Store updateable firmware in EEPROM because it remains without power but can be rewritten electrically.

**Misconceptions to correct**

- Students often list hardware without explaining suitability. Correction: the mark usually comes from matching a feature to a need.

#### Mastery check (MC-L015-S3.05)

Distinguish the following targets in one connected answer, using a concrete example for each: RAM; ROM.

<details><summary>Answer criteria</summary>

- SRAM stores bits using flip-flop circuits, needs no refresh and is fast but expensive with lower density, so it is used for cache. DRAM stores charge in capacitors, requires refresh and is slower but cheaper and denser, so it is used for main memory.
- RAM is volatile read/write primary memory used for programs and data currently being processed. ROM is non-volatile primary memory used for instructions that must remain when power is removed, such as firmware or start-up instructions. ROM is not ordinary long-term storage for user files.
- Explain the differences between SRAM and DRAM, including their uses in a range of devices and systems and the reasons for choosing one instead of the other.

</details>

**Supplementary concept map**

- **RAM:** Volatile working memory
- **ROM:** Non-volatile startup memory
- **Power loss:** RAM contents disappear
- **Writing:** RAM changes during operation
- **distinguish:** RAM and ROM.

**Supplementary three-step recap**

1. **Name both alternatives precisely** — RAM and ROM.
2. **Connect structure to consequence** — The differences between RAM and ROM, including their use in a range of devices and systems.
3. **Justify against the scenario** — ROM is non-volatile primary memory used for instructions that must remain when power is removed, such as firmware…

**Why RAM changes while ROM remains stable:** RAM holds the changing state of running programs. Most RAM needs continuous power to preserve that state.

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

### 3. Uses of SRAM and DRAM and reasons for each use (S3.06)

**Atomic learning targets**

- **S3.06.A01:** SRAM
- **S3.06.A02:** DRAM
- **S3.06.A03:** cache
- **S3.06.A04:** main memory

**Core explanation**

- SRAM stores bits using flip-flop circuits, needs no refresh and is fast but expensive with lower density, so it is used for cache. DRAM stores charge in capacitors, requires refresh and is slower but cheaper and denser, so it is used for main memory.
- Uses of SRAM and DRAM and reasons for each use.

**Mechanism or method**

1. **Identify the relevant condition or input** — SRAM stores bits using flip-flop circuits, needs no refresh and is fast but expensive with lower density, so it is used for cache.
2. **Trace how the process works** — DRAM stores charge in capacitors, requires refresh and is slower but cheaper and denser, so it is used for main memory.
3. **Connect the mechanism to its result** — Uses of SRAM and DRAM and reasons for each use.

#### Worked example: Uses of SRAM and DRAM and reasons for each use: complete worked route

1. **Identify the relevant condition or input**

SRAM stores bits using flip-flop circuits, needs no refresh and is fast but expensive with lower density, so it is used for cache.

2. **Trace how the process works**

DRAM stores charge in capacitors, requires refresh and is slower but cheaper and denser, so it is used for main memory.

3. **Connect the mechanism to its result**

Uses of SRAM and DRAM and reasons for each use.

4. **Complete example**

Use DRAM as main RAM because its density and lower cost support a large working capacity. Use a small amount of SRAM for cache because faster, no-refresh access reduces processor waiting.

**Misconceptions to correct**

- Students often list hardware without explaining suitability. Correction: the mark usually comes from matching a feature to a need.

#### Mastery check (MC-L015-S3.06)

Explain the following targets in one connected answer, using a concrete example for each: SRAM; DRAM; cache; main memory.

<details><summary>Answer criteria</summary>

- SRAM stores bits using flip-flop circuits, needs no refresh and is fast but expensive with lower density, so it is used for cache. DRAM stores charge in capacitors, requires refresh and is slower but cheaper and denser, so it is used for main memory.
- Uses of SRAM and DRAM and reasons for each use.

</details>

**Supplementary concept map**

- **main memory:** DRAM stores charge in capacitors, requires refresh and…
- **SRAM:** Uses of SRAM and DRAM and reasons for…
- **DRAM:** The differences between SRAM and DRAM, including their…
- **cache:** SRAM stores bits using flip-flop circuits, needs no…
- **uses:** An HDD or magnetic hard disk uses rotating…

**Supplementary three-step recap**

1. **Name both alternatives precisely** — Uses of SRAM and DRAM and reasons for each use.
2. **Connect structure to consequence** — The differences between SRAM and DRAM, including their uses in a range of devices and systems and the…
3. **Justify against the scenario** — DRAM stores charge in capacitors, requires refresh and is slower but cheaper and denser, so it is used…

**Concrete case: main memory:** Uses of SRAM and DRAM and reasons for each use.



<details><summary>Precise syllabus wording</summary>

Explain uses of SRAM and DRAM and reasons for each use.

Explain the differences between SRAM and DRAM, including their uses in a range of devices and systems and the reasons for choosing one instead of the other.

</details>

### 4. PROM, EPROM and EEPROM (S3.07)

**Atomic learning targets**

- **S3.07.A01:** PROM
- **S3.07.A02:** EPROM
- **S3.07.A03:** EEPROM

**Core explanation**

- PROM is programmed once. EPROM can be erased with ultraviolet light and reprogrammed. EEPROM is erased and rewritten electrically, often without removing it from the system. All three are non-volatile ROM technologies.
- The difference between PROM, EPROM and EEPROM, including how each can be programmed or erased.

**Mechanism or method**

1. **Identify the relevant condition or input** — EPROM can be erased with ultraviolet light and reprogrammed.
2. **Trace how the process works** — EEPROM is erased and rewritten electrically, often without removing it from the system.
3. **Connect the mechanism to its result** — The difference between PROM, EPROM and EEPROM, including how each can be programmed or erased.

#### Worked example: PROM, EPROM and EEPROM: complete worked route

1. **Identify the relevant condition or input**

EPROM can be erased with ultraviolet light and reprogrammed.

2. **Trace how the process works**

EEPROM is erased and rewritten electrically, often without removing it from the system.

3. **Connect the mechanism to its result**

The difference between PROM, EPROM and EEPROM, including how each can be programmed or erased.

4. **Complete example**

Store updateable firmware in EEPROM because it remains without power but can be rewritten electrically.

**Misconceptions to correct**

- Students often list hardware without explaining suitability. Correction: the mark usually comes from matching a feature to a need.

#### Mastery check (MC-L015-S3.07)

Explain the following targets in one connected answer, using a concrete example for each: PROM; EPROM; EEPROM.

<details><summary>Answer criteria</summary>

- PROM is programmed once. EPROM can be erased with ultraviolet light and reprogrammed. EEPROM is erased and rewritten electrically, often without removing it from the system. All three are non-volatile ROM technologies.
- The difference between PROM, EPROM and EEPROM, including how each can be programmed or erased.

</details>

**Supplementary concept map**

- **PROM:** Programmed once
- **EPROM:** Erased with ultraviolet light
- **EEPROM:** Erased electrically
- **All three:** Retain contents without power
- **buffer:** An output buffer temporarily holds data because the…

**Supplementary three-step recap**

1. **Name both alternatives precisely** — The difference between PROM, EPROM and EEPROM, including how each can be programmed or erased.
2. **Connect structure to consequence** — PROM, EPROM and EEPROM.
3. **Justify against the scenario** — PROM is programmed once.

**Concrete case: PROM:** The difference between PROM, EPROM and EEPROM, including how each can be programmed or erased.



<details><summary>Precise syllabus wording</summary>

Understand PROM, EPROM and EEPROM.

Explain the difference between PROM, EPROM and EEPROM, including how each can be programmed or erased.

</details>

### Lesson technical reference

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

- S3.04: explain buffer, temporarily, different / speed.
- S3.04 method: Identify the relevant condition or input → Trace how the process works → Connect the mechanism to its result.
- S3.05: explain RAM, ROM.
- S3.05 method: Identify the relevant condition or input → Trace how the process works → Connect the mechanism to its result.
- S3.06: explain SRAM, DRAM, cache, main memory.

### Common error to correct

Students often list hardware without explaining suitability. Correction: the mark usually comes from matching a feature to a need.

### Exam technique

- Follow the command word: state gives a fact; explain links a cause to a consequence; compare covers both sides.
- Match the number of independent points or method steps to the available marks.
- For buffers and primary memory technologies, use the exact technical term before applying it to the scenario.
