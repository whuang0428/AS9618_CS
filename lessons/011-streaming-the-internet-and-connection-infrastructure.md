# Lesson 011: Streaming, the internet and connection infrastructure

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029 Version 2<br>
**Paper:** Paper 1<br>
**Syllabus:** Section 2: Communication<br>
**Syllabus requirements:** S2.12, S2.13, S2.14<br>
**Pacing:** Flexible. This lesson is deliberately over-complete; select a quick, full or deep route for the learners in front of you.

## Teaching-depth menu

- **Quick route:** Use the diagnostic, learning objectives, first worked example and foundation question. Stop once the learner can explain the central distinction accurately.
- **Full route:** Teach every core explanation point, the worked example and all lesson questions. Use the visual only when it adds a different representation.
- **Deep route:** Add the prerequisite refresher, ask learners to connect the concept checklist, discuss the labelled extension and complete a transfer question without a model answer.

## 1. Prerequisite knowledge and quick diagnostic

Recall the main conclusion from Lesson 010: LAN hardware, routers and Ethernet.

Ask the learner to give one accurate definition or method step before continuing. If they cannot, briefly revisit the named prerequisite rather than repeating the whole previous lesson.



## 2. Knowledge explanation

### Learning objectives

- Show understanding of bit streaming, including real-time/on-demand methods and the importance of bit rate and broadband speed.
- Show understanding of the differences between the World Wide Web and the internet.
- Describe internet-supporting hardware and connections, including modems, PSTN, dedicated lines and cell phone networks.

### Concept checklist for teacher choice

- bit streaming
- real-time streaming
- on-demand streaming
- bit rate
- broadband speed
- buffer
- World Wide Web
- internet
- one service
- modem
- PSTN
- Public Switched Telephone Network
- dedicated line
- cell phone network
- cellular phone network

### Detailed explanation

- A buffer absorbs short variation but cannot repair a sustained connection rate below the media bit rate. Real-time means live; on-demand means stored content selected by the user.
- The internet is interconnected network infrastructure and protocols; the WWW is one service of linked resources accessed over that infrastructure.
- A modem adapts data to access-link signalling. PSTN, dedicated lines and cell phone/cellular networks are distinct connection methods and all are compulsory examples.
- LAN hardware includes a switch, server, NIC/WNIC, WAP, cables, bridge and repeater. A server provides network services. A NIC/WNIC connects a device by cable or wirelessly; a WAP connects wireless devices to a wired LAN. A switch forwards frames within a LAN, a bridge connects LAN segments, a repeater regenerates a weakened signal, and cables carry signals.
- A router connects different networks and forwards packets using destination IP addresses and stored routing information. It is not a replacement name for a switch: the two devices make forwarding decisions at different scopes.
- CSMA/CD means Carrier Sense Multiple Access with Collision Detection. A station listens to the shared medium; if idle it transmits, while continuing to detect a collision.
- A URL locates a WWW resource: DNS resolves the domain to an IP address, while the remaining URL components identify the required resource.
- Bit streaming delivers media progressively so playback can begin before the whole file arrives. Real-time streaming carries a live event with minimal delay; on-demand streaming sends stored content selected by the user.
- Bit rate is the number of bits transmitted each second. Available broadband speed must normally exceed the media bit rate and absorb variation; otherwise the player buffers, lowers quality or pauses. A buffer stores arriving data temporarily.
- The internet is the global network infrastructure that interconnects networks and carries many services. The World Wide Web is one service that uses the internet to provide linked resources accessed with web protocols and browsers.
- Internet hardware includes routers and transmission links that forward data between networks. Web servers store or generate web resources, while clients request those resources; the WWW is therefore not a synonym for all internet services.
- A modem converts signals into a form suitable for the access link and back again. Internet-supporting connections include the PSTN (Public Switched Telephone Network), a dedicated line and a cell phone network or cellular phone network. Each has different sharing, mobility and availability characteristics.

### Worked example

Trace a school request / Two stations sense an idle cable / 6 Mbit/s video on 4 Mbit/s link / Separate infrastructure from service / Home-to-provider path / Locate one resource on a school web server: A laptop sends a frame through its wireless interface to an access point. The LAN switch forwards it toward the router. The router then forwards the packet from the school LAN toward another network. Both may begin before either signal reaches the other. They detect the collision, stop, wait different random periods and the station whose timer expires first retries. The stream consumes data faster than the link supplies it. A starting buffer only delays the shortage; sustained playback requires a lower bit rate or faster connection. Sending email uses the internet but not the WWW.…

Beyond syllabus / 延伸知识（不要求背诵）: real networks organise communication in layers so that hardware, addressing and application protocols can change independently.

### Retained visual explanation

![Cloud services](../web/assets/diagrams/stage10-infographics/stage10-lesson-025-cloud.jpg)

_Cloud services. The image and mobile text alternative come from one maintained fact source._

## 3. Practice by question type

### Question 1 - foundation - state - 2 marks

State the distinction between the internet and the WWW.

**Answer:** The internet is the interconnected network infrastructure; the WWW is a linked-resource service using it.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** For the command word state, perform that exact action; do not replace it with an unrelated fact.

### Question 2 - application - explain - 2 marks

Why does a streaming player buffer data?

**Answer:** To absorb short variations between arrival and playback rates.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not repeat the same point in different words; each mark needs a separate idea or method step.

### Question 3 - transfer - identify - 2 marks

Identify a live sports broadcast.

**Answer:** Real-time streaming.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not copy the worked example unchanged; transfer the method and check it against the new context.

### Related past-paper indexes

| Reference | Marks | Command word | Question type |
|---|---:|---|---|
| 9618/11/S/25 Q2(a) | 4 | explain | explain |
| 9618/11/S/25 Q2(b)(i) | 4 | explain | explain |
| 9618/12/S/24 Q3(ii) | 2 | describe | explain |

These are indexes only. Cambridge question and mark-scheme wording is not reproduced.

## 4. Summary and exam reminders

### Summary

- Define streaming, the internet and connection infrastructure with the exact technical vocabulary expected by the syllabus.
- Use the lesson method on a fresh context and show the intermediate decision, representation or calculation.
- Match the shape of the answer to the command word and the available marks.
- Check the final answer against the scenario instead of repeating a memorised sentence.

### Common error to correct

Students often confuse bandwidth with speed in every sense. Correction: bandwidth is capacity; latency and congestion also affect perceived performance.

### Exam technique

- Follow the command word: state gives a fact; explain links a cause to a consequence; compare covers both sides.
- Match the number of independent points or method steps to the available marks.
- For streaming, the internet and connection infrastructure, use the exact technical term before applying it to the scenario.
