# Lesson 003: Signed binary arithmetic and overflow

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029 Version 2<br>
**Paper:** Paper 1<br>
**Syllabus:** Section 1: Information representation<br>
**Syllabus requirements:** S1.04, S1.05<br>
**Pacing:** Flexible. This lesson is deliberately over-complete; select a quick, full or deep route for the learners in front of you.

## Teaching-depth menu

- **Quick route:** Use the diagnostic, learning objectives, first worked example and foundation question. Stop once the learner can explain the central distinction accurately.
- **Full route:** Teach every core explanation point, the worked example and all lesson questions. Use the visual only when it adds a different representation.
- **Deep route:** Add the prerequisite refresher, ask learners to connect the concept checklist, discuss the labelled extension and complete a transfer question without a model answer.

## 1. Prerequisite knowledge and quick diagnostic

Recall S1.02, S1.04 before starting this lesson.

Ask the learner to give one accurate definition or method step before continuing. If they cannot, briefly revisit the named prerequisite rather than repeating the whole previous lesson.

### Optional prerequisite refresher

- The Version 2 row requires binary, denary, hexadecimal, Binary Coded Decimal (BCD), one's complement and two's complement; BCD and complements are representations rather than additional number bases.
- Show understanding of binary, denary and hexadecimal number systems, BCD, and one's- and two's-complement representations.
- Version 2 explicitly requires both addition and subtraction using positive and negative binary integers; fixed-width representation must be retained throughout a calculation.
- Perform binary addition and subtraction using positive and negative binary integers.


## 2. Knowledge explanation

### Learning objectives

- Perform binary addition and subtraction using positive and negative binary integers.
- Show understanding of how overflow can occur in fixed-width binary arithmetic.

### Concept checklist for teacher choice

- binary addition
- binary subtraction
- positive
- negative
- integer
- overflow
- fixed-width / fixed width
- representable range / range representable

### Detailed explanation

- Version 2 explicitly requires both addition and subtraction using positive and negative binary integers; fixed-width representation must be retained throughout a calculation.
- Overflow occurs when the mathematical result is outside the range representable by the stated bit width and representation; it is not inferred from every internal carry or from a leading 1 alone.
- Perform binary addition from the least-significant bit, carrying left when a column total is 2 or 3. Positive and negative integers must be interpreted using the stated representation and fixed bit width.
- Overflow occurs when the mathematical result is outside the range representable in the available bits. For unsigned 8-bit addition, a carry beyond bit 7 shows that the true result is greater than 255. For signed arithmetic, compare the result with the signed representable range rather than treating every carry as overflow.
- Binary subtraction applies to each positive or negative binary integer as well as binary addition; use the stated fixed width and signed representation when interpreting the result.
- One's-complement representation forms a negative integer by inverting every bit of its positive fixed-width value. Two's-complement representation inverts every bit and adds 1. These are binary representations of signed integers, not separate number bases.
- Unsigned subtraction can be performed column by column using borrowing, or by adding the two's complement of the subtrahend. For signed two's-complement subtraction A - B, form the two's complement of B and add it to A. Retain the fixed width, interpret the sign bit and check the representable range.
- Representation overview: the required integer representations are binary, denary, hexadecimal, BCD, one's-complement and two's-complement. Conversion means preserving the integer value while changing its base or signed representation.

### Worked example

Add two unsigned 8-bit integers: 11110000 + 00110000 = 1 00100000. The true result is 288, which is outside the unsigned 8-bit range 0 to 255, so the stored eight-bit result cannot represent the mathematical answer and overflow occurs.

Beyond syllabus / 延伸知识（不要求背诵）: real file formats also store headers and metadata, so two files with the same visible content may still have different sizes.

### Retained visual explanation

![8-bit addition method](../web/assets/diagrams/stage10-infographics/stage10-lesson-004-method.jpg)

_8-bit addition method. The image and mobile text alternative come from one maintained fact source._

## 3. Practice by question type

### Question 1 - foundation - explain - 2 marks

Why does 01111111 + 00000001 not overflow as unsigned 8-bit arithmetic?

**Answer:** The result 10000000 is 128, which remains inside 0 to 255.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** For the command word explain, perform that exact action; do not replace it with an unrelated fact.

### Question 2 - application - apply - 2 marks

What is the general overflow test?

**Answer:** The mathematical result lies outside the range representable by the fixed-width binary representation.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not repeat the same point in different words; each mark needs a separate idea or method step.

### Question 3 - transfer - calculate - 4 marks

Calculate the sum of 11001010 and 01110101 as unsigned 8-bit integers and explain the overflow.

**Answer:** correct binary addition and carry method; 1 00111111 / stored result 00111111; true result needs a ninth bit / exceeds 255; therefore unsigned 8-bit overflow occurs

**Marking guidance:** Do not infer unsigned overflow only from the leftmost stored bit being 1.

**Common error:** Do not copy the worked example unchanged; transfer the method and check it against the new context.

### Related past-paper indexes

| Reference | Marks | Command word | Question type |
|---|---:|---|---|
| 9618/13/S/25 Q7(c) | 2 | complete | calculate |
| 9618/12/W/25 Q7(a) | 1 | complete | recall |
| 9618/11/S/24 Q7 | 3 | complete | calculate |

These are indexes only. Cambridge question and mark-scheme wording is not reproduced.

## 4. Summary and exam reminders

### Summary

- Define signed binary arithmetic and overflow with the exact technical vocabulary expected by the syllabus.
- Use the lesson method on a fresh context and show the intermediate decision, representation or calculation.
- Match the shape of the answer to the command word and the available marks.
- Check the final answer against the scenario instead of repeating a memorised sentence.

### Common error to correct

Students often treat binary digits as decoration. Correction: every bit position has a value; if the position changes, the value changes.

### Exam technique

- Follow the command word: state gives a fact; explain links a cause to a consequence; compare covers both sides.
- Match the number of independent points or method steps to the available marks.
- For signed binary arithmetic and overflow, use the exact technical term before applying it to the scenario.
