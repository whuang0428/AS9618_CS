# Lesson 016: Network purposes, LAN, WAN, and network topologies

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 2
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Network purposes, LAN, WAN, and network topologies** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- protocol 协议, packet 数据包, routing 路由, bandwidth 带宽, latency 延迟

## Warm-Up Hook
Ask: If your message to a friend had to travel through several classrooms as tiny envelopes, what address would each envelope need? Use that to introduce Network purposes, LAN, WAN, and network topologies, not as a vocabulary list but as a journey.

Lesson-specific focus question: What would go wrong if a student confused **Network purposes, LAN, WAN, and network topologies** with a neighbouring syllabus idea?

## Guided Explanation
Trace one message from sender to receiver. At each step, name the device, address, protocol or performance factor involved. Then deliberately break one part of the path and ask students to predict the symptom: delay, failed lookup, wrong destination or insecure transfer.

Topic-specific teaching move: keep the explanation anchored to **Network purposes, LAN, WAN, and network topologies**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** A student cannot access a secure web page on the school network. Identify two possible network-related causes and one suitable check for each. The worked example must explicitly use **Network purposes, LAN, WAN, and network topologies**, not a generic example from the wider unit.

**Worked answer / marking focus:** Strong answers connect a named component or protocol to a symptom, for example DNS failure prevents name resolution, or HTTPS certificate problems affect secure communication.



## Student Task
Students draw a packet journey for a web request and label where addressing, routing and protocols are used. They then add one bottleneck and explain its effect. Their final answer must include the phrase **Network purposes, LAN, WAN, and network topologies** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Network purposes, LAN, WAN, and network topologies**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:
"The key point about **Network purposes, LAN, WAN, and network topologies** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Network purposes, LAN, WAN, and network topologies** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 2.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often confuse bandwidth with speed in every sense. Correction: bandwidth is capacity; latency and congestion also affect perceived performance. For this lesson, make students contrast that mistake with the exact idea of **network purposes, lan, wan, and network topologies**.
Correction prompt: "Show the mechanism, not just the label."

## Stage 2 syllabus completion

**Official audit rows:** S2.05
**Focus:** Packet movement through network topologies

### Direct explanation

- In a bus, a transmitted signal travels along the shared backbone and devices inspect it. In a star, each frame travels through the central switch. In a mesh, alternative links can provide several possible routes. A hybrid combines behaviours of its component topologies.
- Topology justification must connect packet path to the scenario: central failure, cable failure, congestion, expansion and redundancy are consequences of the structure.

### Worked example

**One star cable fails:** Only the device on that cable loses its link; packets between other devices still pass through the central switch. If the switch fails, all attached paths fail.

### Targeted practice and answers

1. Where does a frame pass in a star network?
   **Answer:** Through the central switch.
2. Why can a mesh continue after one link fails?
   **Answer:** Packets may use an alternative link/route.
3. What shared component carries transmissions in a bus?
   **Answer:** The backbone cable.

### Exam-style question and MS

**Question (4 marks):** Compare how a packet travels in a star topology and a mesh topology, and explain one reliability difference.

- **B1** star packet/frame passes through a central switch
- **B1** mesh provides multiple interconnected paths / possible routes
- **B1** star switch is a single point of failure
- **B1** mesh can reroute when a link fails

**Strict note:** Do not accept 'mesh is better' without a packet-path or failure consequence.

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Why LAN and WAN management differs

- **Explains:** `lanwan`
- **Explanation type:** comparison
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-016-lanwan.jpg`

1. A LAN usually stays within one organisation's controlled site.
2. A WAN crosses distance and often uses provider-owned infrastructure.
3. More owners and routes add latency, cost and fault-finding complexity.
- **Analogy:** Managing one campus is different from coordinating transport across several cities.
- **Boundary:** Wi-Fi does not make a network a WAN; scale and control do.

### How a shared resource becomes useful

- **Explains:** `purpose`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-016-purpose.jpg`

1. A device packages a request and names the destination.
2. The network carries that request to the shared resource.
3. One managed resource can then serve many authorised devices.
- **Analogy:** A library serves many readers because requests reach one organised collection.
- **Boundary:** If the path or shared service fails, many users lose access together.

### Why connection patterns change risk

- **Explains:** `topologies`
- **Explanation type:** tradeoff
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-016-topologies.jpg`

1. The layout determines which physical paths data can follow.
2. Shared paths reduce cabling but concentrate traffic and failures.
3. Alternative paths improve resilience but require more links and ports.
- **Analogy:** Road layouts trade construction cost against alternative routes after a closure.
- **Boundary:** No topology is universally best; cost, scale and failure tolerance decide.
<!-- stage10-explanations:end -->
