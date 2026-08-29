# Lesson 016: Network purposes, LAN, WAN and topologies

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice contain the assessed syllabus points added for this lesson. Other activities remain part of this lesson unless they are individually labelled Optional.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Networking benefits, LAN/WAN and the four required topologies

### Direct explanation

- Networking devices allow computers and users to share resources such as files, printers, storage and an internet connection. A network can also support communication, collaboration, central account management, central backup and access to shared services. A benefit must identify what is shared or managed and explain the consequence; 'it is easier' is not enough.
- A LAN covers a limited geographical area such as one building or site and is normally owned or managed by one organisation. A WAN covers a large geographical area, connects separate LANs or sites and commonly uses telecommunications-provider infrastructure. LAN and WAN describe scope and management, not a guaranteed speed.
- In a bus topology, devices attach to one shared backbone cable and a transmitted signal travels along that shared medium. In a star topology, every device has a separate link to a central switch and each frame passes through that switch. In a mesh topology, nodes have multiple interconnections so packets may use alternative routes. A hybrid topology combines two or more topology patterns, for example two star segments connected by a backbone.
- Topology choice must be justified from packet path, failure effect, redundancy, cabling cost, expansion and traffic. A star isolates most individual cable faults but the central switch is a single point of failure; a mesh offers alternative paths but needs more links and management; a bus uses less cable but the shared backbone and shared traffic are weaknesses.

### Worked example

**Choose a topology for a two-building clinic:** Use a star LAN inside each building so individual devices have independent links to a central switch. Connect the two stars to form a hybrid network. If the inter-building link is safety-critical, add a second path: packets can use the alternative route after one link fails, at extra cost.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. State two concrete benefits of networking school computers.
   **Answer:** Shared printers/files/services and central management, backup or communication; each benefit must name its consequence.
2. Compare a LAN from a WAN using geographical scope and management.
   **Answer:** A LAN covers a limited site and is normally managed by one organisation; a WAN connects sites over a large area and often uses provider infrastructure.
3. Describe the packet or signal path in bus, star, mesh and hybrid topologies.
   **Answer:** Bus: shared backbone; star: central switch; mesh: one of several interconnected routes; hybrid: the path follows the combined component topologies.
4. Suggest star or mesh for a hospital network that prioritises resilience.
   **Answer:** Mesh, because alternative packet routes can maintain communication after a link failure; acknowledge the additional links/cost.

### Exam-style question and MS

**Question (5 marks):** A college is replacing one shared bus network with star LANs connected into a hybrid topology. Explain two networking benefits and justify the topology change.

| Answer | Guidance | Marks |
|---|---|---:|
| one developed resource-sharing, communication or central-management benefit | Do not award generic benefits or a topology name without a path/failure consequence. | 1 |
| a second distinct developed networking benefit |  | 1 |
| star frames pass through a central switch and an individual cable failure normally affects one device |  | 1 |
| hybrid combines topology patterns / connects the star segments |  | 1 |
| justification links reliability, expansion, traffic or cost to the college |  | 1 |
<!-- stage2-practice:end -->
<!-- stage2-completion:end -->

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 2
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Define and distinguish the network concepts in **Network purposes, LAN, WAN, and network topologies**.
2. Explain how the relevant devices, addressing or protocols support communication.
3. Apply the concepts to a network scenario and justify a suitable choice.

## Key Vocabulary
English first, Chinese support:

- protocol 协议, packet 数据包, routing 路由, bandwidth 带宽, latency 延迟

## Warm-Up Hook
Ask: If your message to a friend had to travel through several classrooms as tiny envelopes, what address would each envelope need? Use that to introduce Network purposes, LAN, WAN, and network topologies, not as a vocabulary list but as a journey.

Focus question: Which feature distinguishes **Network purposes, LAN, WAN, and network topologies** from the most closely related syllabus concept?

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
- Answer one 4-mark question about **Network purposes, LAN, WAN, and network topologies**. Follow its command word and apply each point to the stated context.

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

### Why LAN and WAN management differs

- **Explains:** `lanwan`
- **Explanation type:** comparison
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-016-lanwan.jpg`

1. A LAN usually stays within one organisation's controlled site.
2. A WAN crosses distance and often uses provider-owned infrastructure.
3. More owners and routes add latency, cost and fault-finding complexity.
- **Analogy:** Managing one campus is different from coordinating transport across several cities.
- **Boundary:** Wi-Fi does not make a network a WAN; scale and control do.

### How a shared resource becomes useful

- **Explains:** `purpose`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-016-purpose.jpg`

1. A device packages a request and names the destination.
2. The network carries that request to the shared resource.
3. One managed resource can then serve many authorised devices.
- **Analogy:** A library serves many readers because requests reach one organised collection.
- **Boundary:** If the path or shared service fails, many users lose access together.

### Why connection patterns change risk

- **Explains:** `topologies`
- **Explanation type:** tradeoff
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-016-topologies.jpg`

1. A topology diagram's link count must match the physical links actually drawn.
2. Alternative paths improve resilience but require additional links and ports.
3. Use one consistent topology in the mechanism and result views; this example has nine links including the inter-switch link.
- **Analogy:** Road layouts trade construction cost against alternative routes after a closure.
- **Boundary:** No topology is universally best; cost, scale and failure tolerance decide.
<!-- stage10-explanations:end -->
