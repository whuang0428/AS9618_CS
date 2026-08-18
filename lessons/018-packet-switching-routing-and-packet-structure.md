# Lesson 018: Packet switching, routing, and packet structure

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 1  
**Syllabus reference:** Syllabus Section 2  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Packet switching, routing, and packet structure** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- protocol 协议, packet 数据包, routing 路由, bandwidth 带宽, latency 延迟

## Warm-Up Hook
Ask: If your message to a friend had to travel through several classrooms as tiny envelopes, what address would each envelope need? Use that to introduce Packet switching, routing, and packet structure, not as a vocabulary list but as a journey.

Lesson-specific focus question: What would go wrong if a student confused **Packet switching, routing, and packet structure** with a neighbouring syllabus idea?

## Guided Explanation
Trace one message from sender to receiver. At each step, name the device, address, protocol or performance factor involved. Then deliberately break one part of the path and ask students to predict the symptom: delay, failed lookup, wrong destination or insecure transfer.

Topic-specific teaching move: keep the explanation anchored to **Packet switching, routing, and packet structure**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** A file is split into packets before being sent across a network. Explain two items of metadata each packet needs and why packets may arrive out of order. The worked example must explicitly use **Packet switching, routing, and packet structure**, not a generic example from the wider unit.

**Worked answer / marking focus:** Credit destination/source address, sequence number, checksum or payload length. Out-of-order arrival occurs because packets can take different routes.



## Student Task
Students act as routers passing numbered packet cards through different routes, then reconstruct the message using sequence numbers. Their final answer must include the phrase **Packet switching, routing, and packet structure** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Packet switching, routing, and packet structure**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **Packet switching, routing, and packet structure** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Packet switching, routing, and packet structure** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 2.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often confuse bandwidth with speed in every sense. Correction: bandwidth is capacity; latency and congestion also affect perceived performance. For this lesson, make students contrast that mistake with the exact idea of **packet switching, routing, and packet structure**.  
Correction prompt: "Show the mechanism, not just the label."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### One message, several routes, one reassembled result

- **Explains:** `packet-journey`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-018-packet-journey.jpg`

1. Visual explanation
2. Follow the numbered packets. Routers make next-hop decisions, so packets from one message do not need to travel together.
3. 1. Split and label Each packet carries payload plus control data such as addresses and a sequence number.
4. 2. Choose next hop Each router uses the destination address and routing information.
5. 3. Travel independently Different routes can produce different arrival times.
6. 4. Reassemble The receiver uses sequence numbers to restore the original order.
7. Check the diagram: why can packet 2 arrive after packet 3?
8. Packet 2 can take a different route with a longer delay. The receiver uses sequence numbers to place it back between packets 1 and 3.

### Routing and arrival

- **Explains:** `routing`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-018-routing.jpg`

1. Router decision Routers forward packets based on destination address and routing information.
2. Different paths Packets from the same message may take different routes through the network.
3. Out of order Packets may arrive in a different order because routes have different delays.
4. Error handling Checksum/error checks can detect corruption; missing/corrupt packets may be requested again.

### Packet structure

- **Explains:** `structure`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-018-structure.jpg`

1. Source address, destination address, sequence number, protocol/control data.
2. The actual data being sent, such as part of a file or message.
3. Error-checking information such as checksum, depending on the protocol.
4. Common trap
5. Do not describe the header as “extra information” only. Name what is inside it and what each item does.

### Packet switching

- **Explains:** `switching`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-018-switching.jpg`

1. A message or file is divided into smaller packets before transmission.
2. Packets from many users can share network links instead of one message reserving a whole route.
3. Each packet can be routed independently through available paths.
4. Reassemble
5. The destination uses sequence numbers to put packets back in the correct order.
<!-- stage10-explanations:end -->
