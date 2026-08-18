# Lesson 011: Sound file size calculations

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 1  
**Syllabus reference:** Syllabus Section 1  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Sound file size calculations** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- binary 二进制, denary 十进制, hexadecimal 十六进制, overflow 溢出, compression 压缩

## Warm-Up Hook
Show a pixelated icon or describe a 3-second audio clip and ask: If the computer cannot see or hear, what exactly is it storing? The useful answer is not 'the picture'; it is numbers with rules.

Lesson-specific focus question: What would go wrong if a student confused **Sound file size calculations** with a neighbouring syllabus idea?

## Guided Explanation
Move from human perception to stored data: identify the sample, pixel or character; define the metadata that describes it; calculate the storage requirement; then ask what quality is lost or gained when one parameter changes. Keep returning to the chain: representation rule -> stored bits -> user experience.

Topic-specific teaching move: keep the explanation anchored to **Sound file size calculations**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: physical media idea. Middle: formula or encoding table. Right: quality/storage trade-off sentence frames.

Teacher line to reuse: "A correct keyword starts the answer; the explanation earns the mark."

## Worked Example
**Problem:** Calculate the size of a 10-second mono sound clip sampled at 8000 Hz with 16-bit sample resolution. The worked example must explicitly use **Sound file size calculations**, not a generic example from the wider unit.

**Worked answer / marking focus:** `8000 * 16 * 10 = 1 280 000 bits = 160 000 bytes`. Credit sample rate, sample resolution and duration.



## Student Task
Students compare two clips and decide whether reducing sample rate or sample resolution is the better compromise. Their final answer must include the phrase **Sound file size calculations** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Sound file size calculations**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **Sound file size calculations** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Sound file size calculations** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 1.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often say 'higher quality is always better'. Correction: higher quality can be wasteful if storage, bandwidth or purpose does not justify it. For this lesson, make students contrast that mistake with the exact idea of **sound file size calculations**.  
Correction prompt: "Show the mechanism, not just the label."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Channels: mono and stereo

- **Explains:** `channels`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-011-channels.jpg`

1. One channel of audio. Use channel factor 1.
2. rate × resolution × duration × 1
3. Two channels, commonly left and right. Use channel factor 2.
4. rate × resolution × duration × 2

### The full uncompressed sound formula

- **Explains:** `formula`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-011-formula.jpg`

1. size in bits = sampling rate × sample resolution × duration × channels
2. size in bytes = bits ÷ 8
3. KiB = bytes ÷ 1024; MiB = KiB ÷ 1024
4. Sampling rate samples per second, measured in Hz
5. Sample resolution bits used for each sample
6. Duration length of the sound in seconds
7. Channels mono = 1, stereo = 2

### Parameter changes and consequences

- **Explains:** `tradeoffs`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-011-tradeoffs.jpg`

1. Higher sampling rate
2. More samples per second; may improve accuracy; increases file size.
3. Higher sample resolution
4. More bits per sample; more amplitude levels; increases file size.
5. Longer duration
6. More seconds of samples; increases file size in direct proportion.
7. More channels
8. More separate audio streams; stereo doubles mono size when other factors match.

### Unit conversion without changing the answer

- **Explains:** `units`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-011-units.jpg`

1. The formula gives bits first.
2. 8 bits = 1 byte.
3. 1 KiB = 1024 bytes.
4. 1 MiB = 1024 KiB.
5. Do not divide by 1000 when the question asks for KiB or MiB.
<!-- stage10-explanations:end -->
