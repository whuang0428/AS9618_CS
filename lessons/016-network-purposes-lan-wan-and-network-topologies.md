# Lesson 016: Network purposes, LAN, WAN, and network topologies

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 2
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Define and distinguish the network concepts in **Network purposes, LAN, WAN, and network topologies**.
2. Explain how LAN/WAN scope and topology links affect connectivity and fault tolerance.
3. Apply the concepts to a network scenario and justify a suitable choice.

## Key Vocabulary
English first, Chinese support:

- network 网络, LAN 局域网, WAN 广域网, topology 拓扑, resilience 韧性

## Warm-Up Hook
Sketch four computers connected in a line, then remove the middle link. Ask which devices can still communicate and how another connection pattern would change the outcome.

Focus question: Which feature distinguishes **Network purposes, LAN, WAN, and network topologies** from the most closely related syllabus concept?

## Guided Explanation
Compare LAN and WAN ownership, scale and management. Build bus, star, mesh and hybrid connection diagrams, then remove one link or central device from each and predict which devices lose connectivity.

Require students to state the relevant term, describe the mechanism or process, and apply it to the example under discussion.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: LAN and WAN comparison. Middle: bus, star, mesh and hybrid link diagrams. Right: failed component -> connectivity effect -> trade-off.

Teacher guidance: require the technical term and the explanation, method or application specified by the command word.

## Worked Example
**Problem:** A school needs a network for one building and wants simple fault finding. Compare a bus and star topology and justify one choice.

**Worked answer / marking focus:** A star uses a separate link from each device to a central switch, so one cable failure normally affects one device and faults are easier to isolate. It needs more cabling and the central device is a single point of failure.



## Student Task
Students draw bus, star, mesh and hybrid topologies with an accurate link count. For each, they mark one failed link or device and explain the resulting loss of connectivity.

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
Misconception: Students often think every topology fails in the same way. Correction: the connection pattern determines which alternative paths and single points of failure exist.
Correction prompt: "State the correct term, then explain the relevant process or distinction."

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

1. A topology diagram's link count must match the physical links actually drawn.
2. Alternative paths improve resilience but require additional links and ports.
3. Use one consistent topology in the mechanism and result views; this example has nine links including the inter-switch link.
- **Analogy:** Road layouts trade construction cost against alternative routes after a closure.
- **Boundary:** No topology is universally best; cost, scale and failure tolerance decide.
<!-- stage10-explanations:end -->
