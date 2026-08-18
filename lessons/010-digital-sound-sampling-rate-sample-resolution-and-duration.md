# Lesson 010: Digital sound: sampling rate, sample resolution, and duration

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 1  
**Syllabus reference:** Syllabus Section 1  
**Duration:** 45 minutes  
**Assessment rhythm:** 5-minute quiz
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Digital sound: sampling rate, sample resolution, and duration** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- binary 二进制, denary 十进制, hexadecimal 十六进制, overflow 溢出, compression 压缩

## Warm-Up Hook
Show a pixelated icon or describe a 3-second audio clip and ask: If the computer cannot see or hear, what exactly is it storing? The useful answer is not 'the picture'; it is numbers with rules.

Lesson-specific focus question: What would go wrong if a student confused **Digital sound: sampling rate, sample resolution, and duration** with a neighbouring syllabus idea?

## Guided Explanation
Move from human perception to stored data: identify the sample, pixel or character; define the metadata that describes it; calculate the storage requirement; then ask what quality is lost or gained when one parameter changes. Keep returning to the chain: representation rule -> stored bits -> user experience.

Topic-specific teaching move: keep the explanation anchored to **Digital sound: sampling rate, sample resolution, and duration**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** Calculate the size of a 10-second mono sound clip sampled at 8000 Hz with 16-bit sample resolution. The worked example must explicitly use **Digital sound: sampling rate, sample resolution, and duration**, not a generic example from the wider unit.

**Worked answer / marking focus:** `8000 * 16 * 10 = 1 280 000 bits = 160 000 bytes`. Credit sample rate, sample resolution and duration.



## Student Task
Students compare two clips and decide whether reducing sample rate or sample resolution is the better compromise. Their final answer must include the phrase **Digital sound: sampling rate, sample resolution, and duration** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Digital sound: sampling rate, sample resolution, and duration**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **Digital sound: sampling rate, sample resolution, and duration** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Digital sound: sampling rate, sample resolution, and duration** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 1.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often say 'higher quality is always better'. Correction: higher quality can be wasteful if storage, bandwidth or purpose does not justify it. For this lesson, make students contrast that mistake with the exact idea of **digital sound: sampling rate, sample resolution, and duration**.  
Correction prompt: "Show the mechanism, not just the label."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Duration: how long the sound lasts

- **Explains:** `duration`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-010-duration.jpg`

1. Seconds matter
2. A 10-second clip stores ten times as many samples as a 1-second clip if the sample rate is unchanged.
3. Mono for today
4. This lesson uses mono sound, so there is one channel. Stereo channels are handled in the next calculation lesson.

### Basic mono sound file size formula

- **Explains:** `formula`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-010-formula.jpg`

1. size in bits = sampling rate × sample resolution × duration
2. size in bytes = bits ÷ 8
3. 8000 × 16 × 10 = 1 280 000 bits = 160 000 bytes

### Sampling rate: samples per second

- **Explains:** `rate`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-010-rate.jpg`

1. Definition
2. Sampling rate is the number of samples taken each second.
3. It is commonly measured in hertz, Hz.
4. A higher sampling rate records more measurements each second.
5. This can improve accuracy, but increases file size.

### Sample resolution: bits per sample

- **Explains:** `resolution`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-010-resolution.jpg`

1. 8-bit sample resolution
2. 2⁸ = 256 possible amplitude levels.
3. 16-bit sample resolution
4. 2¹⁶ = 65 536 possible amplitude levels.
5. Quality trade-off
6. More bits per sample can store amplitude more precisely, but uses more storage.

### Sampling turns an analogue wave into digital values

- **Explains:** `sampling`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-010-sampling.jpg`

1. Analogue sound
2. A continuous wave. The pressure changes smoothly over time.
3. A measurement of the wave amplitude at one moment in time.
4. Digital sound
5. A sequence of sample values stored as binary numbers.
<!-- stage10-explanations:end -->
