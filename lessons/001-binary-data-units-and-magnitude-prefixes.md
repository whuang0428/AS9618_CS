# Lesson 001: Binary data units and magnitude prefixes

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029 Version 2<br>
**Paper:** Paper 1<br>
**Syllabus:** Section 1: Information representation<br>
**Syllabus requirements:** S1.01<br>
**Pacing:** Flexible. Select the material set and practice depth needed by the learner.

## Teaching-depth menu

- **Quick route:** Use the diagnostic, learning objectives, first worked example and foundation question. Stop once the learner can explain the central distinction accurately.
- **Full route:** Use every knowledge-point material set, the worked method, the terminology check and all questions.
- **Deep route:** Add the prerequisite refresher, ask learners to connect the concept checklist, discuss the labelled extension and complete a transfer question without a model answer.

## 1. Prerequisite knowledge and quick diagnostic

Check that you can use place value and distinguish a value from the way it is represented.

Ask the learner to give one accurate definition or method step before continuing. If they cannot, briefly revisit the named prerequisite rather than repeating the whole previous lesson.



## 2. Knowledge explanation

### 1. Binary prefixes · Decimal prefixes · Kibi · Kilo (S1.01)

**Concept map:** binary prefixes → decimal prefixes → kibi → kilo → mebi → mega → gibi → giga → tebi → tera

**Three-part explanation:**

1. Use and distinguish kibi/kilo, mebi/mega, gibi/giga and tebi/tera
2. binary prefixes use powers of 1024 and decimal prefixes use powers of 1000
3. Therefore 1 KiB = 1024 bytes, 1 MiB = 2^20 bytes, 1 GiB = 2^30 bytes and 1 TiB = 2^40 bytes

**Concrete cue:** Use and distinguish kibi/kilo, mebi/mega, gibi/giga and tebi/tera; binary prefixes use powers of 1024 and decimal prefixes use powers of 1000.

#### The storage ladder

![The storage ladder](../web/assets/diagrams/stage10-infographics/stage10-lesson-001-knowledge.jpg)

<details><summary>Text transcript</summary>

- bit 0 or 1
- nibble 4 bits
- byte 8 bits = 2 nibbles
- KiB 1024 bytes
- MiB 1024 KiB
- GiB 1024 MiB
- TiB 1024 GiB

</details>

#### Section 1 method bank

![Section 1 method bank](../web/assets/diagrams/stage10-infographics/stage10-lesson-016-methods.jpg)

<details><summary>Text transcript</summary>

- Storage units
- 1 KiB = 1024 bytes. 1 MiB = 1024 KiB. Decimal prefixes use 1000, binary prefixes use 1024.
- Binary to denary
- Add active place values. For 8-bit unsigned, range is 0 to 255.
- File size
- Image bits = width x height x colour depth. Sound bits = sample rate x sampling resolution x duration x channels.
- Compression choice
- Lossless allows exact reconstruction. Lossy removes data permanently but can reduce file size more.

</details>

#### Unit conversion without changing the answer

![Unit conversion without changing the answer](../web/assets/diagrams/stage10-infographics/stage10-lesson-012-units.jpg)

<details><summary>Text transcript</summary>

- The formula gives bits first.
- 8 bits = 1 byte.
- 1 KiB = 1024 bytes.
- 1 MiB = 1024 KiB.
- Do not divide by 1000 when the question asks for KiB or MiB.

</details>

#### The full uncompressed sound formula

![The full uncompressed sound formula](../web/assets/diagrams/stage10-infographics/stage10-lesson-012-formula.jpg)

<details><summary>Text transcript</summary>

- size in bits = sampling rate × sampling resolution × duration × channels
- size in bytes = bits ÷ 8
- KiB = bytes ÷ 1024; MiB = KiB ÷ 1024
- Sampling rate samples per second, measured in Hz
- Sampling resolution bits used for each sample
- Duration length of the sound in seconds
- Channels mono = 1, stereo = 2

</details>

<details><summary>Precise syllabus wording</summary>

Show understanding of binary magnitudes and the difference between binary prefixes and decimal prefixes.

Use and distinguish kibi/kilo, mebi/mega, gibi/giga and tebi/tera; binary prefixes use powers of 1024 and decimal prefixes use powers of 1000.

</details>

### Supporting diagram library

#### Six-minute review sprint

![Six-minute review sprint](../web/assets/diagrams/stage10-infographics/stage10-lesson-016-sprint.jpg)

<details><summary>Text transcript</summary>

- Timed section
- Use the timer for a short retrieval round. The goal is not panic; the goal is clean method under a clock.
- Convert 10101100 to denary.
- Calculate the size in bits of a 100 x 50 bitmap image with 8-bit colour depth.
- State why Unicode is suitable for a multilingual app.
- Choose lossless or lossy compression for a legal document archive and justify the choice.
- 1: 172, because 128 + 32 + 8 + 4 = 172.
- 2: 100 x 50 x 8 = 40 000 bits.

</details>

#### Question triage: choose the toolbox first

![Question triage: choose the toolbox first](../web/assets/diagrams/stage10-infographics/stage10-lesson-016-triage.jpg)

<details><summary>Text transcript</summary>

- Number bases
- Look for binary, denary, hexadecimal, place values, carries, overflow or two's complement.
- Text representation
- Look for ASCII, Unicode, character set, character code, multilingual text or symbols.
- Images and sound
- Look for resolution, colour depth, sampling rate, sampling resolution, duration and file size.
- Compression
- Look for lossless, lossy, exact reconstruction, reduced quality, RLE or repeated data.

</details>

<details><summary>Open precise terminology and exam facts</summary>

- Use and distinguish kibi/kilo, mebi/mega, gibi/giga and tebi/tera; binary prefixes use powers of 1024 and decimal prefixes use powers of 1000.
- Binary prefixes use powers of 1024: kibi (Ki) means 2^10, mebi (Mi) means 2^20, gibi (Gi) means 2^30 and tebi (Ti) means 2^40. Therefore 1 KiB = 1024 bytes, 1 MiB = 2^20 bytes, 1 GiB = 2^30 bytes and 1 TiB = 2^40 bytes.
- Decimal prefixes use powers of 1000: kilo (k) means 10^3, mega (M) means 10^6, giga (G) means 10^9 and tera (T) means 10^12. Therefore 1 kB = 1000 bytes, 1 MB = 10^6 bytes, 1 GB = 10^9 bytes and 1 TB = 10^12 bytes. Case and the i in KiB/MiB/GiB/TiB carry meaning.
- For binary data units and magnitude prefixes, identify the required concept before describing its mechanism or consequence.

</details>

### Worked example

1. 2 TiB drive
2. 2 TiB = 2 x 2^40 = 2,199,023,255,552 bytes.
3. A 2 TB drive is 2,000,000,000,000 bytes, so the labels are not interchangeable.

Beyond syllabus / 延伸知识（不要求背诵）: real file formats also store headers and metadata, so two files with the same visible content may still have different sizes.
## 3. Practice by question type

### Question 1 - foundation - state - 4 marks

State the number of bytes represented by 1 GiB and explain why 1 GB represents a different number of bytes.

**Answer:** 1 GiB = 2^30 bytes / 1,073,741,824 bytes; gibi uses a binary power / multiples of 1024; 1 GB = 10^9 bytes / 1,000,000,000 bytes; giga uses a decimal power / multiples of 1000

**Marking guidance:** Do not accept 'GiB is bigger' without both numerical definitions.

**Common error:** For the command word state, perform that exact action; do not replace it with an unrelated fact.

### Question 2 - application - convert - 2 marks

Convert 3,000,000 bytes to MB.

**Answer:** 3 MB using the decimal prefix mega; kilo, mega, giga and tera use powers of 1000.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not repeat the same point in different words; each mark needs a separate idea or method step.

### Question 3 - transfer - draw - 2 marks

Draw lines to match kibi, mebi, gibi and tebi to Ki, Mi, Gi and Ti.

**Answer:** kibi = Ki, mebi = Mi, gibi = Gi and tebi = Ti.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not copy the worked example unchanged; transfer the method and check it against the new context.

### Related past-paper indexes

| Reference | Marks | Command word | Question type |
|---|---:|---|---|
| 9618/13/S/24 Q1(a) | 4 | complete | recall |
| 9618/11/W/24 Q1(a) | 1 | state | recall |
| 9618/12/S/24 Q7(a) | 1 | identify | calculate |
| 9618/12/W/23 Q3(a) | 1 | state | recall |

These are indexes only. Cambridge question and mark-scheme wording is not reproduced.

## 4. Summary and exam reminders

### Summary

- Define binary data units and magnitude prefixes with the exact technical vocabulary expected by the syllabus.
- Use the lesson method on a fresh context and show the intermediate decision, representation or calculation.
- Match the shape of the answer to the command word and the available marks.
- Check the final answer against the scenario instead of repeating a memorised sentence.

### Common error to correct

Students often treat binary digits as decoration. Correction: every bit position has a value; if the position changes, the value changes.

### Exam technique

- Follow the command word: state gives a fact; explain links a cause to a consequence; compare covers both sides.
- Match the number of independent points or method steps to the available marks.
- For binary data units and magnitude prefixes, use the exact technical term before applying it to the scenario.
