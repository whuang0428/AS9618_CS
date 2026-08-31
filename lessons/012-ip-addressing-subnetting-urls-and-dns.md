# Lesson 012: IP addressing, subnetting, URLs and DNS

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029 Version 2<br>
**Paper:** Paper 1<br>
**Syllabus:** Section 2: Communication<br>
**Syllabus requirements:** S2.15, S2.16<br>
**Pacing:** Flexible. Select the material set and practice depth needed by the learner.

## Teaching-depth menu

- **Quick route:** Use the diagnostic, learning objectives, first worked example and foundation question. Stop once the learner can explain the central distinction accurately.
- **Full route:** Use every knowledge-point material set, the worked method, the terminology check and all questions.
- **Deep route:** Add the prerequisite refresher, ask learners to connect the concept checklist, discuss the labelled extension and complete a transfer question without a model answer.

## 1. Prerequisite knowledge and quick diagnostic

Recall S2.15 before starting this lesson.

Ask the learner to give one accurate definition or method step before continuing. If they cannot, briefly revisit the named prerequisite rather than repeating the whole previous lesson.

### Optional prerequisite refresher

- IPv4 is 32-bit and IPv6 is 128-bit. An address is associated with a network interface on a network. Private addressing reduces direct public reachability but does not guarantee security.
- Explain IP-address use, including IPv4/IPv6 format, subnetting, device association, public/private and static/dynamic addresses, and security implications.


## 2. Knowledge explanation

### 1. IPv4 and IPv6 addresses (S2.15)

**Concept map:** IPv4 → 32-bit → IPv6 → 128-bit → subnetting → network interface → public address → private address → static addresses → dynamic addresses → does not guarantee security

**Three-part explanation:**

1. Private addressing reduces direct public reachability but does not guarantee security
2. An address is associated with a network interface on a network
3. IPv4 is 32-bit and IPv6 is 128-bit

**Concrete cue:** 192.0.2.25 is written as IPv4; 2001:db8::25 is written as IPv6. The address identifies a network interface, not a human user.



<details><summary>Precise syllabus wording</summary>

Explain IP-address use, including IPv4/IPv6 format, subnetting, device association, public/private and static/dynamic addresses, and security implications.

IPv4 is 32-bit and IPv6 is 128-bit. An address is associated with a network interface on a network. Private addressing reduces direct public reachability but does not guarantee security.

</details>

### 2. Uniform Resource Locator · Scheme · Domain name · Path (S2.16)

**Concept map:** Uniform Resource Locator → scheme → domain name → path → DNS resolves → IP address → WWW resource

**Three-part explanation:**

1. A URL may contain scheme, domain, optional port, path and optional query/fragment
2. it does not resolve the path or store the resource
3. DNS resolves the domain to an IP address, while the remaining URL components identify the required resource

**Concrete cue:** A URL may contain scheme, domain, optional port, path and optional query/fragment. DNS resolves the domain name to an IP address; it does not resolve the path or store the…

#### URL components

![URL components](../web/assets/diagrams/stage10-infographics/stage10-lesson-021-urls.jpg)

<details><summary>Text transcript</summary>

- https://www.example.org/resources/page.html
- Protocol / scheme https tells the browser which communication protocol to use.
- Domain name www.example.org is resolved by DNS to an IP address.
- Path /resources/page.html identifies the resource on the server.

</details>

#### From a URL to a packet on the local link

![From a URL to a packet on the local link](../web/assets/diagrams/stage10-infographics/stage10-lesson-021-address-journey.jpg)

<details><summary>Text transcript</summary>

- DNS resolves a domain name to an IP address; it does not return a MAC address.
- The network-layer packet header contains the destination IP address of the endpoint.
- For one local hop, a link-layer frame contains the IP packet and a destination MAC address.
- The destination IP and destination MAC belong to different encapsulation headers.

</details>

#### DNS: name to IP address

![DNS: name to IP address](../web/assets/diagrams/stage10-infographics/stage10-lesson-021-dns.jpg)

<details><summary>Text transcript</summary>

- 1. URL entered The user enters a URL containing a domain name.
- 2. DNS lookup The device asks a DNS server to resolve the domain name.
- 3. IP returned The DNS server returns the IP address for that domain name.
- 4. Packets sent Packets can now be addressed and routed to the web server.
- Common error
- DNS failure may stop a domain name working even if the server is still reachable by IP address.

</details>

#### IP address vs MAC address

![IP address vs MAC address](../web/assets/diagrams/stage10-infographics/stage10-lesson-021-addresses.jpg)

<details><summary>Text transcript</summary>

- IP and MAC addresses work together at different layers; they are not an either-or choice.
- The destination IP identifies the endpoint for end-to-end packet delivery.
- The destination MAC identifies the receiving interface for one local-link frame.
- On a routed path, the frame normally targets the next-hop router MAC while the packet retains the remote destination IP.

</details>

#### Routers: forwarding between networks

![Routers: forwarding between networks](../web/assets/diagrams/stage10-infographics/stage10-lesson-024-routing.jpg)

<details><summary>Text transcript</summary>

- A router connects different networks and forwards packets towards their destination.
- Uses: IP addresses and routing information to choose a path.
- Common role: connects a LAN to the internet or to another network.
- Careful wording: a router does not simply "make WiFi". Some home boxes combine router and access point functions, but the jobs are distinct.
- Between networks
- LAN - router - internet / WAN
- Inside the LAN, MAC-address forwarding matters. Between networks, IP-address routing matters.

</details>

<details><summary>Precise syllabus wording</summary>

Explain how a URL locates a WWW resource and the role of DNS.

A URL may contain scheme, domain, optional port, path and optional query/fragment. DNS resolves the domain name to an IP address; it does not resolve the path or store the resource.

</details>

### Supporting diagram library

#### 5-minute mini assessment

![5-minute mini assessment](../web/assets/diagrams/stage10-infographics/stage10-lesson-021-checkpoint.jpg)

<details><summary>Text transcript</summary>

- Monthly checkpoint
- Use this as a short checkpoint before moving to named protocols. Expand the answer key after attempting.
- Explain why DNS is needed when a user enters a URL.
- State one difference between an IP address and a MAC address.
- Identify the domain name in https://store.example.com/products/item7 .
- 1: DNS resolves the domain name in the URL to an IP address so packets can be routed to the server.
- 2: IP is a logical network address that can change; MAC is a hardware/interface address used locally.
- 3: store.example.com .

</details>

#### Email protocols: SMTP, POP3 and IMAP

![Email protocols: SMTP, POP3 and IMAP](../web/assets/diagrams/stage10-infographics/stage10-lesson-022-email.jpg)

<details><summary>Text transcript</summary>

- Used to send email from a client to a mail server and between mail servers.
- Used to download email from a mail server to a client, often removing it from the server depending on settings.
- Used to access and synchronise email stored on a mail server across multiple devices.
- Common error
- IMAP is usually better for multiple devices because messages and folders stay on the server and remain synchronised.

</details>

#### FTP for file transfer

![FTP for file transfer](../web/assets/diagrams/stage10-infographics/stage10-lesson-022-file.jpg)

<details><summary>Text transcript</summary>

- FTP: File Transfer Protocol
- FTP is used to transfer files between a client and a server, such as uploading website files or downloading files from a file server.
- Do not use FTP as a generic answer for “anything on the internet”. It is specifically about file transfer.

</details>

#### HTTP and HTTPS

![HTTP and HTTPS](../web/assets/diagrams/stage10-infographics/stage10-lesson-022-web.jpg)

<details><summary>Text transcript</summary>

- Protocol
- Exam distinction
- Transfers web pages and web resources between browser and web server.
- Does not provide the same secure encrypted connection as HTTPS.
- Secure version of HTTP used for encrypted web communication.
- Helps protect data such as logins, payments and form submissions in transit.

</details>

#### Section 2 in one page

![Section 2 in one page](../web/assets/diagrams/stage10-infographics/stage10-lesson-027-map.jpg)

<details><summary>Text transcript</summary>

- Packets in a packet-switched network are routed independently.
- A response is sent back to the source but may take the same or a different route.
- Routing decisions depend on the available network paths at each stage.

</details>

#### Precision rules for Section 2 answers

![Precision rules for Section 2 answers](../web/assets/diagrams/stage10-infographics/stage10-lesson-027-precision.jpg)

<details><summary>Text transcript</summary>

- Answer craft
- 1. Define with a boundary
- Switch: inside a LAN. Router: between networks. Extranet: selected external users. These boundary phrases often carry marks.
- 2. Name the mechanism
- DNS resolves names to IP addresses. Fibre uses light pulses. HTTPS encrypts communication. Congestion causes queues.
- 3. Link to the scenario
- If the question says online banking, mention sensitive data in transit. If it says tablets, mention mobility and wireless access.
- 4. Avoid empty adjectives

</details>

<details><summary>Open precise terminology and exam facts</summary>

- IPv4 is 32-bit and IPv6 is 128-bit. An address is associated with a network interface on a network. Private addressing reduces direct public reachability but does not guarantee security.
- A URL may contain scheme, domain, optional port, path and optional query/fragment. DNS resolves the domain name to an IP address; it does not resolve the path or store the resource.
- LAN hardware includes a switch, server, NIC/WNIC, WAP, cables, bridge and repeater. A server provides network services. A NIC/WNIC connects a device by cable or wirelessly; a WAP connects wireless devices to a wired LAN. A switch forwards frames within a LAN, a bridge connects LAN segments, a repeater regenerates a weakened signal, and cables carry signals.
- A router connects different networks and forwards packets using destination IP addresses and stored routing information. It is not a replacement name for a switch: the two devices make forwarding decisions at different scopes.
- After a collision, stations stop transmitting, send/recognise a jam signal, wait for different random backoff periods and retry. The random delay reduces the chance of another simultaneous attempt.
- A URL locates a WWW resource: DNS resolves the domain to an IP address, while the remaining URL components identify the required resource.
- Bit streaming delivers media progressively so playback can begin before the whole file arrives. Real-time streaming carries a live event with minimal delay; on-demand streaming sends stored content selected by the user.
- Bit rate is the number of bits transmitted each second. Available broadband speed must normally exceed the media bit rate and absorb variation; otherwise the player buffers, lowers quality or pauses. A buffer stores arriving data temporarily.
- The internet is the global network infrastructure that interconnects networks and carries many services. The World Wide Web is one service that uses the internet to provide linked resources accessed with web protocols and browsers.
- Internet hardware includes routers and transmission links that forward data between networks. Web servers store or generate web resources, while clients request those resources; the WWW is therefore not a synonym for all internet services.
- A modem converts signals into a form suitable for the access link and back again. Internet-supporting connections include the PSTN (Public Switched Telephone Network), a dedicated line and a cell phone network or cellular phone network. Each has different sharing, mobility and availability characteristics.
- When describing an internet connection, follow the path from the end device through its NIC, LAN switch or access point, router and access link. Name each device only for the job it performs.

</details>

### Worked example

1. Trace a school request
2. Two stations sense an idle cable
3. 6 Mbit/s video on 4 Mbit/s link
4. Separate infrastructure from service
5. Locate one resource on a school web server
6. A laptop sends a frame through its wireless interface to an access point.

Beyond syllabus / 延伸知识（不要求背诵）: real networks organise communication in layers so that hardware, addressing and application protocols can change independently.
## 3. Practice by question type

### Question 1 - foundation - apply - 2 marks

What is the purpose of subnetting?

**Answer:** To divide a network into logical subnetworks and identify which subnet an address belongs to.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** For the command word apply, perform that exact action; do not replace it with an unrelated fact.

### Question 2 - application - explain - 2 marks

Why might a server use a static IP address?

**Answer:** Clients/DNS need a predictable address for the service.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not repeat the same point in different words; each mark needs a separate idea or method step.

### Question 3 - transfer - apply - 2 marks

What is the role of a NIC?

**Answer:** It provides the device's network interface for sending and receiving data.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not copy the worked example unchanged; transfer the method and check it against the new context.

### Related past-paper indexes

| Reference | Marks | Command word | Question type |
|---|---:|---|---|
| 9618/11/W/25 Q7(c) | 4 | complete | recall |
| 9618/12/S/25 Q6(d) | 4 | complete | recall |
| 9618/11/W/25 Q7(a) | 2 | complete | recall |
| 9618/11/W/25 Q7(b) | 2 | complete | recall |

These are indexes only. Cambridge question and mark-scheme wording is not reproduced.

## 4. Summary and exam reminders

### Summary

- Define ip addressing, subnetting, urls and dns with the exact technical vocabulary expected by the syllabus.
- Use the lesson method on a fresh context and show the intermediate decision, representation or calculation.
- Match the shape of the answer to the command word and the available marks.
- Check the final answer against the scenario instead of repeating a memorised sentence.

### Common error to correct

Students often confuse bandwidth with speed in every sense. Correction: bandwidth is capacity; latency and congestion also affect perceived performance.

### Exam technique

- Follow the command word: state gives a fact; explain links a cause to a consequence; compare covers both sides.
- Match the number of independent points or method steps to the available marks.
- For ip addressing, subnetting, urls and dns, use the exact technical term before applying it to the scenario.
