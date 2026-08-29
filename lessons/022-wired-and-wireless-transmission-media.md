# Lesson 022: Wired and wireless transmission media

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice contain the assessed syllabus points added for this lesson. Other activities remain part of this lesson unless they are individually labelled Optional.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Wired and wireless networks with all required transmission media

### Direct explanation

- A wired network carries signals through a physical cable. It can provide stable, predictable links and avoids radio interference, but installation restricts movement and may require disruptive cabling. A wireless network transmits through the air, supporting mobility and rapid installation, but shared radio capacity, interference, obstacles and interception risk can affect performance and security. The implications must be tied to a given use, not reduced to 'wired is faster'.
- Copper cable carries electrical signals and is often economical for short LAN links, but suffers attenuation and electromagnetic interference. Fibre-optic cable carries pulses of light, supports high bandwidth and long distances and is resistant to electromagnetic interference, but equipment and installation may cost more.
- Radio waves, including WiFi, support non-line-of-sight local wireless access but can be absorbed, reflected or interfered with. Terrestrial microwave links provide directional point-to-point communication and usually require clear line of sight. Satellite communication uses microwave/radio links to and from a satellite for wide or remote coverage, but long propagation distance can increase latency and weather can affect some links.

### Worked example

**Connect a school campus and a remote weather station:** Use copper for short fixed desktop links, fibre-optic cable between buildings requiring high bandwidth, WiFi radio waves for mobile tablets, a line-of-sight microwave link where cabling between two buildings is impractical, and satellite for the remote station without local cable infrastructure. Each choice follows distance, mobility, interference, bandwidth, latency and cost.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. Compare wired and wireless networks for fixed desktops and mobile tablets.
   **Answer:** Wired provides a stable physical link for fixed devices; wireless radio supports mobility but may suffer interference, obstacles and shared capacity.
2. Compare copper cable with fibre-optic cable.
   **Answer:** Copper uses electrical signals and may be cheaper; fibre uses light, supports higher bandwidth/longer distance and resists electromagnetic interference.
3. Compare WiFi radio waves, terrestrial microwave and satellite links.
   **Answer:** WiFi provides local wireless access; terrestrial microwave is directional and line-of-sight; satellite provides wide/remote coverage but commonly has greater latency.
4. Suggest a medium for a remote location with no cable infrastructure.
   **Answer:** Satellite if wide remote coverage is required; justify the latency/cost/weather drawback.

### Exam-style question and MS

**Question (5 marks):** Suggest transmission media for fixed classroom PCs, mobile tablets, an inter-building backbone and a remote field station.

| Answer | Guidance | Marks |
|---|---|---:|
| copper cable for short fixed links with a valid cost/stability reason | Do not accept unqualified 'wireless is less secure' or 'fibre is faster'; require a mechanism or scenario consequence. | 1 |
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
1. Define and distinguish the network concepts in **Wired and wireless transmission media**.
2. Explain how the relevant devices, addressing or protocols support communication.
3. Apply the concepts to a network scenario and justify a suitable choice.

## Key Vocabulary
English first, Chinese support:

- protocol 协议, packet 数据包, routing 路由, bandwidth 带宽, latency 延迟

## Warm-Up Hook
Ask: If your message to a friend had to travel through several classrooms as tiny envelopes, what address would each envelope need? Use that to introduce Wired and wireless transmission media, not as a vocabulary list but as a journey.

Focus question: Which feature distinguishes **Wired and wireless transmission media** from the most closely related syllabus concept?

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
- Answer one 4-mark question about **Wired and wireless transmission media**. Follow its command word and apply each point to the stated context.

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

### Compare by factor, not by vibe

- **Explains:** `compare`
- **Explanation type:** comparison
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-022-compare.jpg`

1. Wired networks
2. Wireless networks
3. Mobility
4. Poor for moving devices because a cable is required.
5. Better for mobile devices because no physical cable is needed.
6. Interference
7. Copper may suffer electromagnetic interference; fibre is less affected.
8. Can be affected by walls, distance, other devices and weather.
9. Security
10. Physical access to the cable is usually needed to intercept traffic.
11. Signals travel through air, so encryption and access control are important.
12. Performance

### Wired transmission media

- **Explains:** `wired`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-022-wired.jpg`

1. Wired media carry signals through a physical cable. They are usually suitable for fixed devices and controlled environments.
2. Copper cable
3. Copper cable transmits data using electrical signals. It is common in local networks because it is relatively cheap and easy to install.
4. Good for: short local links, desktop PCs, classroom networks.
5. Limits: affected by electromagnetic interference; lower bandwidth and distance than fibre in many contexts.
6. Exam wording: say "electrical signals", not "data flows like water". The cable is not a tiny plumbing system.
7. Fibre-optic cable
8. Fibre-optic cable transmits data as pulses of light through glass or plastic fibres.
9. Good for: high-bandwidth links, long distances, backbone connections.
10. Strengths: less affected by electromagnetic interference and can support high data rates.
11. Limits: installation can be more expensive and the cable can be more delicate to handle.

### Wireless transmission media

- **Explains:** `wireless`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-022-wireless.jpg`

1. Wireless media transmit through the air or space. They support mobility, but the signal can be affected by distance, obstacles and interference.
2. Radio waves
3. Radio waves are used by technologies such as WiFi to transmit data without a physical cable.
4. Good for: mobile devices, classrooms, homes, short-range wireless networking.
5. Limits: shared medium, interference from other devices, weaker security if poorly configured.
6. Microwaves
7. Microwave links can transmit data between fixed points, often using directional antennas.
8. Good for: point-to-point links where a line of sight is available.
9. Limits: obstacles, weather and alignment can affect the link.
10. Satellites
11. Satellite communication uses signals to and from satellites to cover large geographical areas.
12. Good for: remote locations, ships, aircraft or areas without cable infrastructure.
<!-- stage10-explanations:end -->
