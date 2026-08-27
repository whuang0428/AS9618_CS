# Lesson 010: Digital sound: sampling rate, sampling resolution, and duration

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 1
**Duration:** 45 minutes
**Assessment rhythm:** 5-minute quiz
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe how data is represented in **Digital sound: sampling rate, sampling resolution, and duration**.
2. Calculate a storage requirement from the stated parameters and units.
3. Explain how changing one parameter affects quality and storage requirements.

## Key Vocabulary
English first, Chinese support:

- binary 二进制, denary 十进制, hexadecimal 十六进制, overflow 溢出, compression 压缩

## Warm-Up Hook
Show a pixelated icon or describe a 3-second audio clip and ask: If the computer cannot see or hear, what exactly is it storing? The useful answer is not 'the picture'; it is numbers with rules.

Focus question: Which feature distinguishes **Digital sound: sampling rate, sampling resolution, and duration** from the most closely related syllabus concept?

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
**Problem:** Calculate the size of a 10-second mono sound clip sampled at 8000 Hz with 16-bit sampling resolution.

**Worked answer / marking focus:** `8000 * 16 * 10 = 1 280 000 bits = 160 000 bytes`. Credit sample rate, sampling resolution and duration.



## Student Task
Students compare two clips and decide whether reducing sample rate or sampling resolution is the better compromise.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **Digital sound: sampling rate, sampling resolution, and duration**. Follow its command word and apply each point to the stated context.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 1.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often say 'higher quality is always better'. Correction: higher quality can be wasteful if storage, bandwidth or purpose does not justify it.
Correction prompt: "State the correct term, then explain the relevant process or distinction."

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Sound sampling, sampling resolution and file size

### Direct explanation

- An analogue sound wave varies continuously. Analogue-to-digital sampling measures its amplitude at regular time intervals, quantises each measurement to one permitted level and stores the resulting sample value as a binary number. The sequence of binary sample values is the digital representation of the sound.
- Sampling rate is the number of samples taken per second, measured in hertz (Hz). Sampling resolution is the number of bits used for each sample and therefore controls how many amplitude levels are available. 'Sample resolution' is a common synonym, but sampling resolution is the official syllabus term.
- For uncompressed sound, file size in bits = sampling rate x sampling resolution x duration x number of channels. Increasing sampling rate can represent changes over time more accurately; increasing sampling resolution can represent amplitude more accurately. Either increase also makes the file larger when the other factors stay constant.

### Worked example

**Calculate and interpret one recording:** A 10-second mono recording sampled at 8000 Hz with 16-bit sampling resolution uses 8000 x 16 x 10 x 1 = 1,280,000 bits = 160,000 bytes. Doubling only the sampling resolution to 32 bits doubles the file size and provides more possible amplitude levels; it does not take more samples per second.

### Targeted practice and answers

1. What is the official term for the number of bits used to store each sound sample?
   **Answer:** Sampling resolution; sample resolution is a common synonym.
2. How does a higher sampling rate affect the stored data?
   **Answer:** It stores more measurements each second, which can improve time accuracy and increases file size.
3. How does a higher sampling resolution affect the stored data?
   **Answer:** It provides more possible amplitude levels, which can improve amplitude accuracy and increases file size.

### Exam-style question and MS

**Question (4 marks):** A 5-second stereo recording is sampled at 12,000 Hz using 8-bit sampling resolution. Calculate its uncompressed size in bytes and explain one accuracy/storage trade-off.

- **M1** uses 12,000 x 8 x 5 x 2 bits
- **A1** obtains 960,000 bits / 120,000 bytes
- **B1** higher sampling rate gives more measurements per second or higher sampling resolution gives more amplitude levels
- **B1** the stated increase improves the relevant accuracy but increases file size

**Strict note:** Do not interchange sampling rate and sampling resolution; rate controls measurements per second, while resolution controls bits/levels per measurement.
<!-- stage2-completion:end -->

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Duration: how long the sound lasts

- **Explains:** `duration`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-010-duration.jpg`

1. Seconds matter
2. A 10-second clip stores ten times as many samples as a 1-second clip if the sample rate is unchanged.
3. Mono for today
4. This lesson uses mono sound, so there is one channel. Stereo channels are handled in the next calculation lesson.

### Basic mono sound file size formula

- **Explains:** `formula`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-010-formula.jpg`

1. size in bits = sampling rate × sampling resolution × duration
2. size in bytes = bits ÷ 8
3. 8000 × 16 × 10 = 1 280 000 bits = 160 000 bytes

### Sampling rate: samples per second

- **Explains:** `rate`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-010-rate.jpg`

1. Definition
2. Sampling rate is the number of samples taken each second.
3. It is commonly measured in hertz, Hz.
4. A higher sampling rate records more measurements each second.
5. This can improve accuracy, but increases file size.

### Sampling resolution: bits per sample

- **Explains:** `resolution`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-010-resolution.jpg`

1. Sampling resolution is the official syllabus term; sample resolution is a common synonym.
2. An 8-bit sampling resolution provides 2^8 = 256 possible amplitude levels.
3. A 16-bit sampling resolution provides 2^16 = 65,536 possible amplitude levels.
4. More bits per sample can represent amplitude more precisely, but use more storage.

### Sampling turns an analogue wave into digital values

- **Explains:** `sampling`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-010-sampling.jpg`

1. Analogue sound
2. A continuous wave. The pressure changes smoothly over time.
3. A measurement of the wave amplitude at one moment in time.
4. Digital sound
5. A sequence of sample values stored as binary numbers.
<!-- stage10-explanations:end -->
