# Lesson 025: Network performance, latency, bandwidth, and congestion

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 2
**Duration:** 45 minutes
**Assessment rhythm:** 5-minute quiz
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Network performance, latency, bandwidth, and congestion** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- protocol 协议, packet 数据包, routing 路由, bandwidth 带宽, latency 延迟

## Warm-Up Hook
Ask: If your message to a friend had to travel through several classrooms as tiny envelopes, what address would each envelope need? Use that to introduce Network performance, latency, bandwidth, and congestion, not as a vocabulary list but as a journey.

Lesson-specific focus question: What would go wrong if a student confused **Network performance, latency, bandwidth, and congestion** with a neighbouring syllabus idea?

## Guided Explanation
Trace one message from sender to receiver. At each step, name the device, address, protocol or performance factor involved. Then deliberately break one part of the path and ask students to predict the symptom: delay, failed lookup, wrong destination or insecure transfer.

Topic-specific teaching move: keep the explanation anchored to **Network performance, latency, bandwidth, and congestion**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** A student cannot access a secure web page on the school network. Identify two possible network-related causes and one suitable check for each. The worked example must explicitly use **Network performance, latency, bandwidth, and congestion**, not a generic example from the wider unit.

**Worked answer / marking focus:** Strong answers connect a named component or protocol to a symptom, for example DNS failure prevents name resolution, or HTTPS certificate problems affect secure communication.



## Student Task
Students draw a packet journey for a web request and label where addressing, routing and protocols are used. They then add one bottleneck and explain its effect. Their final answer must include the phrase **Network performance, latency, bandwidth, and congestion** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Network performance, latency, bandwidth, and congestion**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:
"The key point about **Network performance, latency, bandwidth, and congestion** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Network performance, latency, bandwidth, and congestion** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 2.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often confuse bandwidth with speed in every sense. Correction: bandwidth is capacity; latency and congestion also affect perceived performance. For this lesson, make students contrast that mistake with the exact idea of **network performance, latency, bandwidth, and congestion**.
Correction prompt: "Show the mechanism, not just the label."

## Stage 2 syllabus completion

**Official audit rows:** S2.12
**Focus:** Bit streaming, bit rate and broadband

### Direct explanation

- Bit streaming delivers media progressively so playback can begin before the whole file arrives. Real-time streaming carries a live event with minimal delay; on-demand streaming sends stored content selected by the user.
- Bit rate is the number of bits transmitted each second. Available broadband speed must normally exceed the media bit rate and absorb variation; otherwise the player buffers, lowers quality or pauses. A buffer stores arriving data temporarily.

### Worked example

**6 Mbit/s video on 4 Mbit/s link:** The stream consumes data faster than the link supplies it. A starting buffer only delays the shortage; sustained playback requires a lower bit rate or faster connection.

### Targeted practice and answers

1. Why does a streaming player buffer data?
   **Answer:** To absorb short variations between arrival and playback rates.
2. Classify a live sports broadcast.
   **Answer:** Real-time streaming.
3. Classify a selected recorded film.
   **Answer:** On-demand streaming.

### Exam-style question and MS

**Question (4 marks):** A video has a bit rate of 8 Mbit/s. Explain why a connection advertised as 8 Mbit/s may still pause during playback.

- **B1** video requires about 8 million bits each second
- **B1** actual available speed may be below advertised/maximum speed
- **B1** other traffic, overhead or variation reduces throughput
- **B1** buffer empties when data arrives more slowly than playback consumes it

**Strict note:** Do not accept 'bandwidth is slow' without comparing arrival rate with the stream bit rate.

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Simple transfer time calculation

- **Explains:** `calculation`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-025-calculation.jpg`

1. Transfer time = file size in bits / bandwidth in bits per second
2. Remember: 1 byte = 8 bits . A 50 MB file is not 50 Mb. That capital B is doing real work.
3. Mini example
4. A 25 MB file is downloaded over a 10 Mbps link.
5. Convert file size: 25 MB x 8 = 200 Mb .
6. Divide by bandwidth: 200 Mb / 10 Mbps = 20 seconds .
7. This is an ideal estimate; real throughput may be lower due to congestion and overhead.

### Core performance terms

- **Explains:** `concepts`
- **Explanation type:** tradeoff
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-025-concepts.jpg`

1. Bandwidth
2. The maximum amount of data that can be transmitted over a connection per second.
3. Typical units: bits per second, Mbps, Gbps.
4. The delay before data starts to arrive or before a response is received.
5. Typical units: milliseconds (ms).
6. Congestion
7. Occurs when too much data is trying to use part of a network, causing queues, delay or packet loss.
8. Symptom: performance worsens when many users/devices compete.
9. Throughput
10. The actual amount of data successfully transferred per second, often lower than theoretical bandwidth.

### Factors that affect performance

- **Explains:** `factors`
- **Explanation type:** tradeoff
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-025-factors.jpg`

1. Good answers name a factor and explain its effect. "It becomes slower" needs a cause.
2. Transmission medium
3. Fibre may provide high bandwidth and low interference; wireless may vary with distance, obstacles and interference.
4. Number of users
5. More users can share the same capacity, increasing congestion and reducing throughput per user.
6. Distance and route
7. Longer physical distance and more hops can increase latency.
8. Hardware and server load
9. Slow routers, overloaded servers or weak wireless access points can become bottlenecks.
10. Packet loss and retransmission
11. If packets are lost, data may need to be resent, increasing delay and reducing effective throughput.
12. Protocol overhead
<!-- stage10-explanations:end -->
