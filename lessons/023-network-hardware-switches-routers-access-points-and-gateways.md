# Lesson 023: Network hardware: switches, routers, access points, and gateways

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 2
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Network hardware: switches, routers, access points, and gateways** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- protocol 协议, packet 数据包, routing 路由, bandwidth 带宽, latency 延迟

## Warm-Up Hook
Ask: If your message to a friend had to travel through several classrooms as tiny envelopes, what address would each envelope need? Use that to introduce Network hardware: switches, routers, access points, and gateways, not as a vocabulary list but as a journey.

Lesson-specific focus question: What would go wrong if a student confused **Network hardware: switches, routers, access points, and gateways** with a neighbouring syllabus idea?

## Guided Explanation
Trace one message from sender to receiver. At each step, name the device, address, protocol or performance factor involved. Then deliberately break one part of the path and ask students to predict the symptom: delay, failed lookup, wrong destination or insecure transfer.

Topic-specific teaching move: keep the explanation anchored to **Network hardware: switches, routers, access points, and gateways**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** A student cannot access a secure web page on the school network. Identify two possible network-related causes and one suitable check for each. The worked example must explicitly use **Network hardware: switches, routers, access points, and gateways**, not a generic example from the wider unit.

**Worked answer / marking focus:** Strong answers connect a named component or protocol to a symptom, for example DNS failure prevents name resolution, or HTTPS certificate problems affect secure communication.



## Student Task
Students draw a packet journey for a web request and label where addressing, routing and protocols are used. They then add one bottleneck and explain its effect. Their final answer must include the phrase **Network hardware: switches, routers, access points, and gateways** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Network hardware: switches, routers, access points, and gateways**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:
"The key point about **Network hardware: switches, routers, access points, and gateways** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Network hardware: switches, routers, access points, and gateways** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 2.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often confuse bandwidth with speed in every sense. Correction: bandwidth is capacity; latency and congestion also affect perceived performance. For this lesson, make students contrast that mistake with the exact idea of **network hardware: switches, routers, access points, and gateways**.
Correction prompt: "Show the mechanism, not just the label."

## Stage 2 syllabus completion

**Official audit rows:** S2.09, S2.14
**Focus:** Required LAN and internet connection hardware

### Direct explanation

- A NIC/WNIC provides wired/wireless network access; a WAP connects wireless devices to a LAN; a switch forwards frames within a LAN; a bridge joins LAN segments; a repeater regenerates a weakened signal; a server provides shared services; cables carry wired signals.
- A modem converts signals for an access link. Internet access may use the PSTN, a dedicated leased line or a cellular phone network. A router forwards packets between the local network and other networks.

### Worked example

**Branch office connection:** Each desktop uses a NIC and cable to the switch; phones use a WNIC through the WAP. The router uses a dedicated line and suitable modem/interface to reach the ISP; a repeater is only added where signal distance requires regeneration.

### Targeted practice and answers

1. Which device regenerates a weakened signal?
   **Answer:** Repeater.
2. Which component gives a laptop wireless network connectivity?
   **Answer:** WNIC; it connects through a WAP.
3. Why might a business choose a dedicated line instead of PSTN dial-up?
   **Answer:** It offers a permanent, predictable connection suited to continuous business traffic.

### Exam-style question and MS

**Question (4 marks):** Describe the roles of a WNIC, WAP, switch and router when a wireless laptop accesses an internet server.

- **B1** WNIC provides the laptop's wireless network interface
- **B1** WAP connects wireless devices to the wired/local network
- **B1** switch forwards local frames / connects LAN devices
- **B1** router forwards packets between the LAN and internet/other networks

**Strict note:** Do not accept WAP and router as automatically identical devices; award their distinct logical roles.
