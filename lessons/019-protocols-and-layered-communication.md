# Lesson 019: Cloud, wired and wireless networking

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice are the assessed sequence for this lesson. The earlier lesson-body activities are Optional enrichment and do not establish syllabus first use.
<!-- remediation-v2-stage3-scope:end -->

<!-- remediation-v2-optional:start -->
> **Optional enrichment:** general protocol rules and layered communication. This material is excluded from compulsory syllabus coverage, first-use and assessment statistics.
>
> **Formal AS prerequisite:** S2.11 Ethernet and CSMA/CD.
<!-- remediation-v2-optional:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Cloud, wired and wireless networking

### Direct explanation

- Cloud computing provides storage, processing or software as a service using remote shared infrastructure reached through a network. A public cloud is offered over shared provider infrastructure; a private cloud is restricted to one organisation.
- A public cloud may scale quickly and reduce local hardware management: these are possible benefits. A private cloud is dedicated to one organisation and can give greater control over access and configuration. Each benefit or drawback must link availability, control, cost or security to the stated scenario.
- A wired network carries signals through a physical cable. It can provide stable, predictable links and avoids radio interference, but installation restricts movement and may require disruptive cabling. A wireless network transmits through the air, supporting mobility and rapid installation, but shared radio capacity, interference, obstacles and interception risk can affect performance and security. The implications must be tied to a given use, not reduced to 'wired is faster'.
- Copper cable carries electrical signals and is often economical for short LAN links, but suffers attenuation and electromagnetic interference. Fibre-optic cable carries pulses of light, supports high bandwidth and long distances and is resistant to electromagnetic interference, but equipment and installation may cost more.
- Radio waves, including WiFi, support non-line-of-sight local wireless access but can be absorbed, reflected or interfered with. Terrestrial microwave links provide directional point-to-point communication and usually require clear line of sight. Satellite communication uses microwave/radio links to and from a satellite for wide or remote coverage, but long propagation distance can increase latency and weather can affect some links.

### Worked example

**Choose a cloud model / Connect a school campus and a remote weather station:** A school storing non-sensitive public resources may use a public cloud for scalable access. A hospital may choose a private cloud for tighter organisational control of patient-data access. Use copper for short fixed desktop links, fibre-optic cable between buildings requiring high bandwidth, WiFi radio waves for mobile tablets, a line-of-sight microwave link where cabling between two buildings is impractical, and satellite for the remote station without local cable infrastructure. Each choice follows distance, mobility, interference, bandwidth, latency and cost.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. Compare public from private cloud.
   **Answer:** Public cloud uses shared provider infrastructure; private cloud is dedicated or restricted to one organisation.
2. State one cloud-computing service.
   **Answer:** Remote storage, processing or hosted software.
3. Compare wired and wireless networks for fixed desktops and mobile tablets.
   **Answer:** Wired provides a stable physical link for fixed devices; wireless radio supports mobility but may suffer interference, obstacles and shared capacity.
4. Compare copper cable with fibre-optic cable.
   **Answer:** Copper uses electrical signals and may be cheaper; fibre uses light, supports higher bandwidth/longer distance and resists electromagnetic interference.
5. Compare WiFi radio waves, terrestrial microwave and satellite links.
   **Answer:** WiFi provides local wireless access; terrestrial microwave is directional and line-of-sight; satellite provides wide/remote coverage but commonly has greater latency.
6. Suggest a medium for a remote location with no cable infrastructure.
   **Answer:** Satellite if wide remote coverage is required; justify the latency/cost/weather drawback.

### Exam-style question and MS

**Question (9 marks):** Compare public and private cloud for a medical organisation. Suggest transmission media for fixed classroom PCs, mobile tablets, an inter-building backbone and a remote field station.

| Answer | Guidance | Marks |
|---|---|---:|
| public cloud characteristic | Do not equate cloud computing with the internet itself. Do not accept unqualified 'wireless is less secure' or 'fibre is faster'; require a mechanism or scenario consequence. | 1 |
| private cloud characteristic |  | 1 |
| scenario-linked comparison |  | 1 |
| justified choice |  | 1 |
| copper cable for short fixed links with a valid cost/stability reason |  | 1 |
| WiFi/radio waves for mobile devices with an interference/security implication |  | 1 |
| fibre-optic cable for the high-bandwidth/longer inter-building link |  | 1 |
| satellite for remote coverage without cable infrastructure |  | 1 |
| at least one limitation is correctly linked to the chosen medium |  | 1 |
<!-- stage2-practice:end -->
<!-- stage2-completion:end -->

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 2
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Define and distinguish the network concepts in **Protocols and layered communication**.
2. Explain how the relevant devices, addressing or protocols support communication.
3. Apply the concepts to a network scenario and justify a suitable choice.

## Key Vocabulary
English first, Chinese support:

- protocol 协议, packet 数据包, routing 路由, bandwidth 带宽, latency 延迟

## Warm-Up Hook
Ask: If your message to a friend had to travel through several classrooms as tiny envelopes, what address would each envelope need? Use that to introduce Protocols and layered communication, not as a vocabulary list but as a journey.

Focus question: Which feature distinguishes **Protocols and layered communication** from the most closely related syllabus concept?

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
- Answer one 4-mark question about **Protocols and layered communication**. Follow its command word and apply each point to the stated context.

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

### Layered communication

- **Explains:** `layers`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-019-layers.jpg`

1. Application layer idea What the user or application wants to do, such as send a web request.
2. Transport layer idea Breaks data into segments, manages reliability or delivery style.
3. Network layer idea Adds logical addressing and routing between networks.
4. Link/physical layer idea Moves frames or bits across the local medium.
5. Encapsulation and de-encapsulation
6. As data moves down layers, each layer may add control information. At the receiver, layers remove and interpret that control information in reverse order.

### What a protocol is

- **Explains:** `protocols`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-019-protocols.jpg`

1. Definition
2. A protocol is a set of rules that governs how data is transmitted and received.
3. Shared meaning
4. Both sender and receiver follow the same rules, so messages can be interpreted correctly.
5. Interoperability
6. Different devices and software can communicate if they implement the same protocol.
7. Reliability
8. Protocols can specify error checking, acknowledgements and retransmission rules.

### What protocol rules can specify

- **Explains:** `rules`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-019-rules.jpg`

1. Protocols define rules for data format, addressing, timing, error handling, flow control and connection management.
2. A protocol may provide reliability and ordered delivery, but these are not guaranteed by every protocol.
3. TCP provides reliable ordered delivery; UDP does not guarantee reliability or ordering.
<!-- stage10-explanations:end -->
