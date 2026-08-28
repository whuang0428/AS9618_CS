# Lesson 025: Internet connection hardware

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** This lesson is Optional enrichment or review. It does not establish first use of a new syllabus requirement and is excluded from compulsory coverage and prerequisite statistics.
<!-- remediation-v2-stage3-scope:end -->

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 2
**Duration:** 45 minutes
**Assessment rhythm:** 5-minute quiz
## Learning Objectives
By the end of the lesson, students should be able to:
1. Define and distinguish the network concepts in **Network performance, latency, bandwidth, and congestion**.
2. Explain how the relevant devices, addressing or protocols support communication.
3. Apply the concepts to a network scenario and justify a suitable choice.

## Key Vocabulary
English first, Chinese support:

- protocol 协议, packet 数据包, routing 路由, bandwidth 带宽, latency 延迟

## Warm-Up Hook
Ask: If your message to a friend had to travel through several classrooms as tiny envelopes, what address would each envelope need? Use that to introduce Network performance, latency, bandwidth, and congestion, not as a vocabulary list but as a journey.

Focus question: Which feature distinguishes **Network performance, latency, bandwidth, and congestion** from the most closely related syllabus concept?

## Guided Explanation
Trace one message from sender to receiver. At each step, name the device, address, protocol or performance factor involved. Then deliberately break one part of the path and ask students to predict the symptom: delay, failed lookup, wrong destination or insecure transfer.

Require students to state the relevant term, describe the mechanism or process, and apply it to the example under discussion.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: sender and receiver. Middle: packet path with devices/protocols. Right: cause -> symptom -> fix table.

Teacher guidance: require the technical term and the explanation, method or application specified by the command word.

## Worked Example
**Problem:** A student cannot access a secure web page on the school network. Identify two possible network-related causes and one suitable check for each.

**Worked answer / marking focus:** Strong answers connect a named component or protocol to a symptom, for example DNS failure prevents name resolution, or HTTPS certificate problems affect secure communication.

## Student Task
Students draw a packet journey for a web request and label where addressing, routing and protocols are used. They then add one bottleneck and explain its effect.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **Network performance, latency, bandwidth, and congestion**. Follow its command word and apply each point to the stated context.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 2.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often confuse bandwidth with speed in every sense. Correction: bandwidth is capacity; latency and congestion also affect perceived performance.
Correction prompt: "State the correct term, then explain the relevant process or distinction."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Simple transfer time calculation

- **Explains:** `calculation`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
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
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-025-concepts.jpg`

1. Bandwidth is the maximum data-transfer capacity per second.
2. Latency is delay before data starts to arrive or a response is received.
3. Congestion creates queues, delay or packet loss and can reduce throughput.
4. Throughput is the actual successful transfer rate and may be below bandwidth.

### Factors that affect performance

- **Explains:** `factors`
- **Explanation type:** tradeoff
- **Delivery:** OPTIONAL / EXTEND
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
