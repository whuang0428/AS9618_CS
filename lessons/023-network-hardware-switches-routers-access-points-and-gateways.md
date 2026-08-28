# Lesson 023: Bit streaming, bit rate and broadband

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** This lesson is Optional enrichment or review. It does not establish first use of a new syllabus requirement and is excluded from compulsory coverage and prerequisite statistics.
<!-- remediation-v2-stage3-scope:end -->

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 2
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Define and distinguish the network concepts in **Network hardware: switches, routers, access points, and gateways**.
2. Explain how the relevant devices, addressing or protocols support communication.
3. Apply the concepts to a network scenario and justify a suitable choice.

## Key Vocabulary
English first, Chinese support:

- protocol 协议, packet 数据包, routing 路由, bandwidth 带宽, latency 延迟

## Warm-Up Hook
Ask: If your message to a friend had to travel through several classrooms as tiny envelopes, what address would each envelope need? Use that to introduce Network hardware: switches, routers, access points, and gateways, not as a vocabulary list but as a journey.

Focus question: Which feature distinguishes **Network hardware: switches, routers, access points, and gateways** from the most closely related syllabus concept?

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
- Answer one 4-mark question about **Network hardware: switches, routers, access points, and gateways**. Follow its command word and apply each point to the stated context.

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

### Compare by job and boundary

- **Explains:** `compare`
- **Explanation type:** comparison
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-023-compare.jpg`

1. A switch forwards frames inside a LAN using MAC addresses.
2. A router forwards packets between networks using IP addresses and a routing table.
3. A wireless access point connects wireless devices to a network.
4. A gateway connects systems or networks that use different protocols or formats and may perform translation.

### Gateways: connecting different network rules

- **Explains:** `gateway`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-023-gateway.jpg`

1. A gateway connects networks that may use different protocols, data formats or communication standards, translating where needed.
2. Useful when: two systems need to communicate but do not use the same rules.
3. Default gateway note: in many LANs, the default gateway is the device used to send traffic outside the local network, often a router.
4. Common error: do not use "gateway" as a general term for every network device.

### Switches: forwarding inside a LAN

- **Explains:** `lan`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-023-lan.jpg`

1. A switch connects devices on a local area network and forwards frames to the correct device.
2. Uses: MAC addresses to decide which port should receive the frame.
3. Why useful: reduces unnecessary traffic compared with sending every frame everywhere.
4. Exam wording: say "within a LAN" and "MAC address" when the scenario is local device-to-device traffic.
5. LAN idea
6. PC A -> switch -> PC B
7. The switch is the traffic desk inside the local network. It does not decide the route across the wider internet.

### Routers: forwarding between networks

- **Explains:** `routing`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-023-routing.jpg`

1. A router connects different networks and forwards packets towards their destination.
2. Uses: IP addresses and routing information to choose a path.
3. Common role: connects a LAN to the internet or to another network.
4. Careful wording: a router does not simply "make WiFi". Some home boxes combine router and access point functions, but the jobs are distinct.
5. Between networks
6. LAN -> router -> internet / WAN
7. Inside the LAN, MAC-address forwarding matters. Between networks, IP-address routing matters.

### Wireless access points: joining wireless devices

- **Explains:** `wireless`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-023-wireless.jpg`

1. Wireless access point
2. A wireless access point allows wireless devices to connect to a network using radio waves, often linking them to a wired LAN.
3. Good exam phrase: provides wireless access to a network.
4. Not enough: "it gives internet". Internet access may also require a router and wider network connection.
5. Security link: access points can use authentication and encryption, but this lesson focuses on their network role.
<!-- stage10-explanations:end -->
