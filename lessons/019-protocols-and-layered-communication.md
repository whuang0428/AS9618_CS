# Lesson 019: Protocols and layered communication

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 2
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Protocols and layered communication** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- protocol 协议, packet 数据包, routing 路由, bandwidth 带宽, latency 延迟

## Warm-Up Hook
Ask: If your message to a friend had to travel through several classrooms as tiny envelopes, what address would each envelope need? Use that to introduce Protocols and layered communication, not as a vocabulary list but as a journey.

Lesson-specific focus question: What would go wrong if a student confused **Protocols and layered communication** with a neighbouring syllabus idea?

## Guided Explanation
Trace one message from sender to receiver. At each step, name the device, address, protocol or performance factor involved. Then deliberately break one part of the path and ask students to predict the symptom: delay, failed lookup, wrong destination or insecure transfer.

Topic-specific teaching move: keep the explanation anchored to **Protocols and layered communication**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: sender and receiver. Middle: packet path with devices/protocols. Right: cause -> symptom -> fix table.

Teacher line to reuse: "A correct keyword starts the answer; the explanation earns the mark."

## Worked Example
**Problem:** A student cannot access a secure web page on the school network. Identify two possible network-related causes and one suitable check for each. The worked example must explicitly use **Protocols and layered communication**, not a generic example from the wider unit.

**Worked answer / marking focus:** Strong answers connect a named component or protocol to a symptom, for example DNS failure prevents name resolution, or HTTPS certificate problems affect secure communication.



## Student Task
Students draw a packet journey for a web request and label where addressing, routing and protocols are used. They then add one bottleneck and explain its effect. Their final answer must include the phrase **Protocols and layered communication** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Protocols and layered communication**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:
"The key point about **Protocols and layered communication** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Protocols and layered communication** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 2.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often confuse bandwidth with speed in every sense. Correction: bandwidth is capacity; latency and congestion also affect perceived performance. For this lesson, make students contrast that mistake with the exact idea of **protocols and layered communication**.
Correction prompt: "Show the mechanism, not just the label."

## Stage 2 syllabus completion

**Official audit rows:** S2.11
**Focus:** Ethernet collisions and CSMA/CD

### Direct explanation

- CSMA/CD means Carrier Sense Multiple Access with Collision Detection. A station listens to the shared medium; if idle it transmits, while continuing to detect a collision.
- After a collision, stations stop transmitting, send/recognise a jam signal, wait for different random backoff periods and retry. The random delay reduces the chance of another simultaneous attempt.

### Worked example

**Two stations sense an idle cable:** Both may begin before either signal reaches the other. They detect the collision, stop, wait different random periods and the station whose timer expires first retries.

### Targeted practice and answers

1. What is sensed before Ethernet transmission?
   **Answer:** Whether the shared carrier/medium is idle.
2. What happens immediately after a collision is detected?
   **Answer:** Transmission stops and a retry is scheduled after a random backoff.
3. Why must the delay be random?
   **Answer:** Different delays reduce repeated simultaneous retransmission.

### Exam-style question and MS

**Question (4 marks):** Describe how CSMA/CD handles two devices attempting to transmit on a shared Ethernet medium.

- **B1** each device listens/senses the carrier before transmitting
- **B1** transmits when the medium is idle
- **B1** detects a collision and stops transmission
- **B1** waits a random/backoff time before retrying

**Strict note:** Do not accept collision avoidance: CSMA/CD detects and responds to a collision after transmission has begun.
