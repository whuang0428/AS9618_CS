# Lesson 011: Streaming, the internet and connection infrastructure

**Course:** Cambridge International AS Level Computer Science 9618, syllabus for examination in 2027-2029<br>
**Paper:** Paper 1<br>
**Syllabus:** Section 2: Communication<br>
**Syllabus requirements:** S2.12, S2.13, S2.14<br>
**Pacing:** Flexible. Select a quick, full or deep route for the learners in front of you.

## Teaching-depth menu

- **Quick route:** Use the diagnostic, learning objectives, first worked example and foundation question. Stop once the learner can explain the central distinction accurately.
- **Full route:** Teach every knowledge-point material set, the worked method and all lesson questions.
- **Deep route:** Add the prerequisite refresher, ask learners to connect the concept checklist, discuss the labelled extension and complete a transfer question without a model answer.

## 1. Prerequisite knowledge and quick diagnostic

Recall the main conclusion from Lesson 010: LAN hardware, routers and Ethernet.

Ask the learner to give one accurate definition or method step before continuing. If they cannot, briefly revisit the named prerequisite rather than repeating the whole previous lesson.



## 2. Knowledge explanation

### 1. Bit streaming, including real-time/on-demand methods and the importance of bit rate and broadband speed (S2.12)

**Concept relationships**

- **real-time streaming:** Real-time streaming carries a live event with minimal…
- **bit streaming:** Bit streaming, including real-time/on-demand methods and the importance…
- **on-demand streaming:** On-demand streaming sends stored content selected by the…
- **bit rate:** Available broadband speed must normally exceed the media…
- **broadband speed:** A buffer absorbs short variation but cannot repair…
- **buffer:** A buffer stores arriving data temporarily.

**Mechanism**

1. **Name both alternatives precisely** — Bit streaming, including real-time/on-demand methods and the importance of bit rate and broadband speed.
2. **Connect structure to consequence** — Available broadband speed must normally exceed the media bit rate and absorb variation
3. **Justify against the scenario** — A buffer absorbs short variation but cannot repair a sustained connection rate below the media bit rate.

**Concrete case: real-time streaming:** Bit streaming, including real-time/on-demand methods and the importance of bit rate and broadband speed.



<details><summary>Precise syllabus wording</summary>

Show understanding of bit streaming, including real-time/on-demand methods and the importance of bit rate and broadband speed.

A buffer absorbs short variation but cannot repair a sustained connection rate below the media bit rate. Real-time means live; on-demand means stored content selected by the user.

</details>

### 2. The differences between the World Wide Web and the internet (S2.13)

**Concept relationships**

- **Internet:** Interconnected network infrastructure
- **WWW:** Linked-resource internet service
- **Browser:** Requests and displays web resources
- **Protocol:** HTTP or HTTPS rules
- **World Wide Web:** The differences between the World Wide Web and…
- **one service:** The World Wide Web is one service that…

**Mechanism**

1. **Name both alternatives precisely** — The differences between the World Wide Web and the internet.
2. **Connect structure to consequence** — The World Wide Web is one service that uses the internet to provide linked resources accessed with web…
3. **Justify against the scenario** — Internet hardware includes routers and transmission links that forward data between networks.

**Concrete case: Internet:** The differences between the World Wide Web and the internet.



<details><summary>Precise syllabus wording</summary>

Show understanding of the differences between the World Wide Web and the internet.

The internet is interconnected network infrastructure and protocols; the WWW is one service of linked resources accessed over that infrastructure.

</details>

### 3. Internet-supporting hardware and connections, including modems, PSTN, dedicated lines and cell phone networks (S2.14)

**Concept relationships**

- **Public Switched Telephone Network:** Internet-supporting connections include the PSTN (Public Switched Telephone…
- **cell phone network:** Internet-supporting hardware and connections, including modems, PSTN, dedicated…
- **cellular phone network:** PSTN, dedicated lines and cell phone/cellular networks are…
- **dedicated line:** Internet hardware includes routers and transmission links that…
- **modem:** A modem adapts data to access-link signalling.
- **PSTN:** The internet is the global network infrastructure that…

**Mechanism**

1. **Identify incoming data or signal** — Internet-supporting connections include the PSTN (Public Switched Telephone Network), a dedicated line and a cell phone network or…
2. **Follow the physical or logical path** — Internet-supporting hardware and connections, including modems, PSTN, dedicated lines and cell phone networks.
3. **Connect output to its use** — PSTN, dedicated lines and cell phone/cellular networks are distinct connection methods and all are compulsory examples.

**Concrete case: Public Switched Telephone Network:** Internet-supporting connections include the PSTN (Public Switched Telephone Network), a dedicated line and a cell phone network or cellular phone network.



<details><summary>Precise syllabus wording</summary>

Describe internet-supporting hardware and connections, including modems, PSTN, dedicated lines and cell phone networks.

A modem adapts data to access-link signalling. PSTN, dedicated lines and cell phone/cellular networks are distinct connection methods and all are compulsory examples.

</details>

<details><summary>Open precise terminology and exam facts</summary>

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

</details>

### Worked method

1. Trace a school request
2. Two stations sense an idle cable
3. 6 Mbit/s video on 4 Mbit/s link
4. Separate infrastructure from service
5. Locate one resource on a school web server

Beyond syllabus / 延伸知识（不要求背诵）: real networks organise communication in layers so that hardware, addressing and application protocols can change independently.
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
