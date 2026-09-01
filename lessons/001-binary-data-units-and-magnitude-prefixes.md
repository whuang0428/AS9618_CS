# Lesson 001: Binary data units and magnitude prefixes

**Course:** Cambridge International AS Level Computer Science 9618, syllabus for examination in 2027-2029<br>
**Paper:** Paper 1<br>
**Syllabus:** Section 1: Information representation<br>
**Syllabus requirements:** S1.01<br>
**Pacing:** Flexible. Select a quick, full or deep route for the learners in front of you.

## Teaching-depth menu

- **Quick route:** Use the diagnostic, learning objectives, first worked example and foundation question. Stop once the learner can explain the central distinction accurately.
- **Full route:** Teach every knowledge-point material set, the worked method and all lesson questions.
- **Deep route:** Add the prerequisite refresher, ask learners to connect the concept checklist, discuss the labelled extension and complete a transfer question without a model answer.

## 1. Prerequisite knowledge and quick diagnostic

Check that you can use place value and distinguish a value from the way it is represented.

Ask the learner to give one accurate definition or method step before continuing. If they cannot, briefly revisit the named prerequisite rather than repeating the whole previous lesson.



## 2. Knowledge explanation

### 1. Binary and decimal prefixes use different scales (S1.01)

**Atomic learning targets**

- **S1.01.A01:** binary prefixes
- **S1.01.A02:** decimal prefixes
- **S1.01.A03:** kibi / KiB
- **S1.01.A04:** kilo / kB
- **S1.01.A05:** mebi / MiB
- **S1.01.A06:** mega / MB
- **S1.01.A07:** gibi / GiB
- **S1.01.A08:** giga / GB
- **S1.01.A09:** tebi / TiB
- **S1.01.A10:** tera / TB

**Core explanation**

- Binary prefixes use powers of 1024: kibi (Ki) means 2^10, mebi (Mi) means 2^20, gibi (Gi) means 2^30 and tebi (Ti) means 2^40. Therefore 1 KiB = 1024 bytes, 1 MiB = 2^20 bytes, 1 GiB = 2^30 bytes and 1 TiB = 2^40 bytes.
- Decimal prefixes use powers of 1000: kilo (k) means 10^3, mega (M) means 10^6, giga (G) means 10^9 and tera (T) means 10^12. Therefore 1 kB = 1000 bytes, 1 MB = 10^6 bytes, 1 GB = 10^9 bytes and 1 TB = 10^12 bytes. Case and the i in KiB/MiB/GiB/TiB carry meaning.
- A binary staircase has 1024 steps per level; a decimal staircase has 1000. The labels tell you which staircase to climb.
- Binary prefixes climb by 1024; decimal prefixes climb by 1000.
- KiB and kB are not interchangeable labels.

**Mechanism or method**

1. **Establish the exact components or states** — Binary prefixes use powers of 1024: kibi (Ki) means 2^10, mebi (Mi) means 2^20, gibi (Gi) means 2^30 and tebi (Ti) means 2^40.
2. **Trace the relationship or change** — Therefore 1 KiB = 1024 bytes, 1 MiB = 2^20 bytes, 1 GiB = 2^30 bytes and 1 TiB = 2^40 bytes.
3. **Use the explanation in a concrete case** — Decimal prefixes use powers of 1000: kilo (k) means 10^3, mega (M) means 10^6, giga (G) means 10^9 and tera (T) means 10^12.

#### Worked example: Binary and decimal prefixes use different scales: complete worked route

1. **Establish the exact components or states**

Binary prefixes use powers of 1024: kibi (Ki) means 2^10, mebi (Mi) means 2^20, gibi (Gi) means 2^30 and tebi (Ti) means 2^40.

2. **Trace the relationship or change**

Therefore 1 KiB = 1024 bytes, 1 MiB = 2^20 bytes, 1 GiB = 2^30 bytes and 1 TiB = 2^40 bytes.

3. **Use the explanation in a concrete case**

Decimal prefixes use powers of 1000: kilo (k) means 10^3, mega (M) means 10^6, giga (G) means 10^9 and tera (T) means 10^12.

4. **Complete example**

2 TiB drive: 2 TiB = 2 x 2^40 = 2,199,023,255,552 bytes. A 2 TB drive is 2,000,000,000,000 bytes, so the labels are not interchangeable.

**Misconceptions to correct**

- Students often treat binary digits as decoration. Correction: every bit position has a value; if the position changes, the value changes.

#### Mastery check (MC-L001-S1.01)

Show the following targets in one connected answer, using a concrete example for each: binary prefixes; decimal prefixes; kibi / KiB; kilo / kB; mebi / MiB; mega / MB; gibi / GiB; giga / GB; tebi / TiB; tera / TB.

<details><summary>Answer criteria</summary>

- Binary prefixes use powers of 1024: kibi (Ki) means 2^10, mebi (Mi) means 2^20, gibi (Gi) means 2^30 and tebi (Ti) means 2^40. Therefore 1 KiB = 1024 bytes, 1 MiB = 2^20 bytes, 1 GiB = 2^30 bytes and 1 TiB = 2^40 bytes.
- Decimal prefixes use powers of 1000: kilo (k) means 10^3, mega (M) means 10^6, giga (G) means 10^9 and tera (T) means 10^12. Therefore 1 kB = 1000 bytes, 1 MB = 10^6 bytes, 1 GB = 10^9 bytes and 1 TB = 10^12 bytes. Case and the i in KiB/MiB/GiB/TiB carry meaning.
- A binary staircase has 1024 steps per level; a decimal staircase has 1000. The labels tell you which staircase to climb.
- Binary prefixes climb by 1024; decimal prefixes climb by 1000.
- KiB and kB are not interchangeable labels.

</details>

**Supplementary concept map**

- **Binary:** powers of 1024
- **Decimal:** powers of 1000
- **KiB:** 2^10 bytes
- **kB:** 10^3 bytes
- **TiB:** 2^40 bytes
- **TB:** 10^12 bytes

**Supplementary three-step recap**

1. **Look for the i** — Ki, Mi, Gi and Ti signal the binary scale.
2. **Select 1024 or 1000** — Binary prefixes climb by 1024; decimal prefixes climb by 1000.
3. **Keep the unit exact** — KiB and kB are not interchangeable labels.

**Two staircases:** A binary staircase has 1024 steps per level; a decimal staircase has 1000. The labels tell you which staircase to climb.

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

<details><summary>Precise syllabus wording</summary>

Show understanding of binary magnitudes and the difference between binary prefixes and decimal prefixes.

Use and distinguish kibi/kilo, mebi/mega, gibi/giga and tebi/tera; binary prefixes use powers of 1024 and decimal prefixes use powers of 1000.

</details>

### Lesson technical reference

- Use and distinguish kibi/kilo, mebi/mega, gibi/giga and tebi/tera; binary prefixes use powers of 1024 and decimal prefixes use powers of 1000.
- Binary prefixes use powers of 1024: kibi (Ki) means 2^10, mebi (Mi) means 2^20, gibi (Gi) means 2^30 and tebi (Ti) means 2^40. Therefore 1 KiB = 1024 bytes, 1 MiB = 2^20 bytes, 1 GiB = 2^30 bytes and 1 TiB = 2^40 bytes.
- Decimal prefixes use powers of 1000: kilo (k) means 10^3, mega (M) means 10^6, giga (G) means 10^9 and tera (T) means 10^12. Therefore 1 kB = 1000 bytes, 1 MB = 10^6 bytes, 1 GB = 10^9 bytes and 1 TB = 10^12 bytes. Case and the i in KiB/MiB/GiB/TiB carry meaning.
- For binary data units and magnitude prefixes, identify the required concept before describing its mechanism or consequence.

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

- S1.01: explain binary prefixes, decimal prefixes, kibi / KiB, kilo / kB, mebi / MiB, mega / MB, gibi / GiB, giga / GB, tebi / TiB, tera / TB.
- S1.01 method: Establish the exact components or states → Trace the relationship or change → Use the explanation in a concrete case.
- Correction to remember: Students often treat binary digits as decoration. Correction: every bit position has a value; if the position changes, the value changes.

### Common error to correct

Students often treat binary digits as decoration. Correction: every bit position has a value; if the position changes, the value changes.

### Exam technique

- Follow the command word: state gives a fact; explain links a cause to a consequence; compare covers both sides.
- Match the number of independent points or method steps to the available marks.
- For binary data units and magnitude prefixes, use the exact technical term before applying it to the scenario.
