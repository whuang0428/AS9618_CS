# Lesson 010: Digital sound: sampling rate, sample resolution, and duration

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 1
**Duration:** 45 minutes
**Assessment rhythm:** 5-minute quiz
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe how data is represented in **Digital sound: sampling rate, sample resolution, and duration**.
2. Calculate a storage requirement from the stated parameters and units.
3. Explain how changing one parameter affects quality and storage requirements.

## Key Vocabulary
English first, Chinese support:

- binary 二进制, denary 十进制, hexadecimal 十六进制, overflow 溢出, compression 压缩

## Warm-Up Hook
Show a pixelated icon or describe a 3-second audio clip and ask: If the computer cannot see or hear, what exactly is it storing? The useful answer is not 'the picture'; it is numbers with rules.

Focus question: Which feature distinguishes **Digital sound: sampling rate, sample resolution, and duration** from the most closely related syllabus concept?

## Guided Explanation
Move from human perception to stored data: identify the sample, pixel or character; define the metadata that describes it; calculate the storage requirement; then ask what quality is lost or gained when one parameter changes. Keep returning to the chain: representation rule -> stored bits -> user experience.

Require students to state the relevant term, describe the mechanism or process, and apply it to the example under discussion.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: physical media idea. Middle: formula or encoding table. Right: quality/storage trade-off sentence frames.

Teacher guidance: require the technical term and the explanation, method or application specified by the command word.

## Worked Example
**Problem:** Calculate the size of a 10-second mono sound clip sampled at 8000 Hz with 16-bit sample resolution.

**Worked answer / marking focus:** `8000 * 16 * 10 = 1 280 000 bits = 160 000 bytes`. Credit sample rate, sample resolution and duration.



## Student Task
Students compare two clips and decide whether reducing sample rate or sample resolution is the better compromise.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **Digital sound: sampling rate, sample resolution, and duration**. Follow its command word and apply each point to the stated context.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 1.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often say 'higher quality is always better'. Correction: higher quality can be wasteful if storage, bandwidth or purpose does not justify it.
Correction prompt: "State the correct term, then explain the relevant process or distinction."

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
