# Lesson 013: Run-length encoding and dictionary-style compression

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 1  
**Syllabus reference:** Syllabus Section 1  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the method or choice involved in **Run-length encoding and dictionary-style compression**.
2. Apply the method to a given data set and show each stage of the result.
3. Explain a limitation or suitability decision using the stated context.

## Key Vocabulary
English first, Chinese support:

- binary 二进制, denary 十进制, hexadecimal 十六进制, overflow 溢出, compression 压缩

## Warm-Up Hook
Write `AAAAAABBBBCCCCCCCC` and ask students to suggest a shorter representation. Then show a string with few repeated characters and ask why the same method is less effective.

Focus question: Which feature distinguishes **Run-length encoding and dictionary-style compression** from the most closely related syllabus concept?

## Guided Explanation
Begin with repeated data, then formalise why Run-length encoding and dictionary-style compression reduces storage. Compare the original and compressed forms, calculate a compression ratio, and discuss when the technique helps or harms. End by linking the choice to images, sound, backups or web transfer.

Require students to state the relevant term, describe the mechanism or process, and apply it to the example under discussion.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: original data. Middle: compressed representation and ratio. Right: lossless/lossy decision table.

Teacher guidance: require the technical term and the explanation, method or application specified by the command word.

## Worked Example
**Problem:** Compress a short run of repeated characters and calculate the number of saved characters or bytes.

**Worked answer / marking focus:** Credit the encoded form and the comparison with the original size. For lossy/lossless questions, the answer must state whether exact reconstruction is possible.



## Student Task
Groups receive three mini-files: repeated text, a photo description and a music clip. They choose lossless or lossy compression and defend the decision.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:  
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **Run-length encoding and dictionary-style compression**. Follow its command word and apply each point to the stated context.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 1.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often assume compression always makes a file smaller. Correction: compression has overhead and depends on patterns in the data.
Correction prompt: "State the correct term, then explain the relevant process or distinction."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Dictionary-style compression

- **Explains:** `dictionary`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-013-dictionary.jpg`

1. Find repeated patterns and store them once in a dictionary.
2. Reference
3. Replace later occurrences with a shorter code or pointer to the dictionary entry.
4. COMPUTER COMPUTER COMPUTER can store COMPUTER once, then use references.
5. Dictionary #1 = COMPUTER
6. Compressed form #1 #1 #1
7. Decoded form COMPUTER COMPUTER COMPUTER

### When does it help?

- **Explains:** `effectiveness`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-013-effectiveness.jpg`

1. RLE helps
2. Long repeated runs, simple graphics, repeated pixels or repeated characters.
3. RLE struggles
4. Alternating or random-looking data with very short runs.
5. Dictionary helps
6. Repeated words, phrases, byte patterns or sequences across the file.
7. Both methods are lossless if the dictionary and encoded data allow exact reconstruction.

### Run-length encoding

- **Explains:** `rle`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-013-rle.jpg`

1. Encoding rule
2. Replace each consecutive run with count + value.
3. AAAAAABBBBCCCCCCCC → 6A4B8C
4. Decoding rule
5. Expand each count and value back into repeated data.
6. 3A2B1C → AAABBC
<!-- stage10-explanations:end -->
