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
## Stage 10 causal explanations

### Why sharing becomes useful only when devices can exchange requests

- **Explains:** `purpose`
- **Explanation type:** mechanism

A network creates value by giving devices a controlled path for exchanging data. When a computer sends a print job, for example, it does not somehow use the printer from a distance: it packages the request, sends it across a link and identifies the shared printer as the destination. The same mechanism lets users open centrally stored files or send messages. Sharing reduces duplication because one managed resource can answer requests from many authorised devices. Central management works for the same reason: accounts, permissions, updates and backups can be applied at a server or management service rather than configured independently on every machine. This convenience also creates dependence. If the shared service or connecting network fails, many users may lose access at once. A strong explanation therefore links the benefit to the shared communication path and also recognises the new point of failure.

### Why area and ownership change the way a network is managed

- **Explains:** `lanwan`
- **Explanation type:** comparison

LAN and WAN are not labels for fast and slow networks. They describe different scales and management arrangements. A LAN normally covers a limited site and is controlled by one organisation, so that organisation can choose the switches, cabling, wireless access points and security rules. Shorter local links and direct control often make faults easier to locate and upgrades easier to schedule. A WAN connects networks across a much larger area, so traffic may cross infrastructure owned by telecommunications providers. That adds distance, routing decisions and dependence on external services, which can increase latency, cost and troubleshooting complexity. A school network does not become a WAN merely because it uses Wi-Fi, and a WAN is not automatically the public internet. The deciding questions are what geographical area is connected and who controls the infrastructure between the connected sites.

### Why physical connection patterns create different costs and failure effects

- **Explains:** `topologies`
- **Explanation type:** tradeoff

A topology changes network behaviour because it determines the path that data and failures can follow. In a bus, every device depends on one backbone, so little cabling is needed but damage or congestion on that shared path affects the whole network. In a star, each device has its own link to a central switch. One cable failure normally isolates one device, yet switch failure removes the common forwarding point. In a full mesh, every pair of nodes has a direct link, so another path remains when one link fails. That resilience is expensive because the number of links and ports rises rapidly as nodes are added. A hybrid combines topology types, such as connected star segments, to balance local simplicity with wider resilience. No topology is always best: the correct choice follows from required availability, expansion, cost and the consequence of each possible failure.
<!-- stage10-explanations:end -->
