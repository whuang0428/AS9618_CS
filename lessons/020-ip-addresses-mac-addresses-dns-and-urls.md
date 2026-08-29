# Lesson 020: IP addresses, MAC addresses, DNS and URLs

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice contain the assessed syllabus points added for this lesson. Other activities remain part of this lesson unless they are individually labelled Optional.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** IP addressing, URL structure and DNS

### Direct explanation

- IPv4 uses 32-bit addresses; IPv6 uses 128-bit addresses and provides a much larger address space. Subnetting divides a network into logical sections called subnets and uses part of the address to identify the network/subnet.
- An IP address is associated with a device's network interface on a network and supplies the logical source or destination used for routing. A public address is routable on the internet; a private address is used inside a private network and is not directly routed across the public internet. This reduces direct unsolicited reachability but does not guarantee security. Static addresses remain fixed; dynamic addresses are allocated and may change.
- A Uniform Resource Locator (URL) identifies the location of a resource on the World Wide Web. Its structure can include a scheme such as https, a domain name, an optional port, a path and optional query/fragment. DNS resolves the domain-name part to an IP address; it does not translate the path or store the web resource. The browser then uses the resolved IP address to send packets towards the server and the path to request the resource.
- A URL locates a WWW resource: DNS resolves the domain to an IP address, while the remaining URL components identify the required resource.

### Worked example

**Locate one resource on a school web server:** For https://portal.school.example:443/results/today, https is the scheme, portal.school.example is the domain name, 443 is the port and /results/today is the path. DNS resolves only the domain name to an IP address. An externally reachable server may use a static public IPv4 or IPv6 address; school laptops may use dynamic private addresses inside a subnet.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. How many bits are in IPv6?
   **Answer:** 128 bits.
2. Why might a server use a static IP address?
   **Answer:** Clients/DNS need a predictable address for the service.
3. What is the purpose of subnetting?
   **Answer:** To divide a network into logical subnetworks and identify which subnet an address belongs to.
4. Identify the scheme, domain and path in https://shop.example.org/items/7.
   **Answer:** Scheme: https; domain: shop.example.org; path: /items/7.
5. Which part of that URL is resolved by DNS?
   **Answer:** The domain name shop.example.org; DNS returns its IP address.

### Exam-style question and MS

**Question (5 marks):** Compare IPv4 with IPv6, then explain how a URL and DNS are used to request a web resource.

| Answer | Guidance | Marks |
|---|---|---:|
| IPv4 uses 32-bit addresses | Do not accept that a private IP address guarantees security or that DNS converts the entire URL/stores the website. | 1 |
| IPv6 uses 128-bit addresses / provides a much larger address space |  | 1 |
| URL identifies a WWW resource and includes a domain plus resource path |  | 1 |
| DNS resolves the domain name to an IP address |  | 1 |
| IP address is used to route packets while the path identifies the requested resource |  | 1 |
<!-- stage2-practice:end -->
<!-- stage2-completion:end -->

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 2
**Duration:** 45 minutes
**Assessment rhythm:** 5-minute quiz, monthly assessment checkpoint
## Learning Objectives
By the end of the lesson, students should be able to:
1. Define and distinguish the network concepts in **IP addresses, MAC addresses, DNS, and URLs**.
2. Explain how the relevant devices, addressing or protocols support communication.
3. Apply the concepts to a network scenario and justify a suitable choice.

## Key Vocabulary
English first, Chinese support:

- protocol 协议, packet 数据包, routing 路由, bandwidth 带宽, latency 延迟

## Warm-Up Hook
Ask: If your message to a friend had to travel through several classrooms as tiny envelopes, what address would each envelope need? Use that to introduce IP addresses, MAC addresses, DNS, and URLs, not as a vocabulary list but as a journey.

Focus question: Which feature distinguishes **IP addresses, MAC addresses, DNS, and URLs** from the most closely related syllabus concept?

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
- Answer one 4-mark question about **IP addresses, MAC addresses, DNS, and URLs**. Follow its command word and apply each point to the stated context.

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

### From a URL to a packet on the local link

- **Explains:** `address-journey`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-020-address-journey.jpg`

1. DNS resolves a domain name to an IP address; it does not return a MAC address.
2. The network-layer packet header contains the destination IP address of the endpoint.
3. For one local hop, a link-layer frame contains the IP packet and a destination MAC address.
4. The destination IP and destination MAC belong to different encapsulation headers.

### IP address vs MAC address

- **Explains:** `addresses`
- **Explanation type:** comparison
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-020-addresses.jpg`

1. IP and MAC addresses work together at different layers; they are not an either-or choice.
2. The destination IP identifies the endpoint for end-to-end packet delivery.
3. The destination MAC identifies the receiving interface for one local-link frame.
4. On a routed path, the frame normally targets the next-hop router MAC while the packet retains the remote destination IP.

### 5-minute mini assessment

- **Explains:** `checkpoint`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-020-checkpoint.jpg`

1. Monthly checkpoint
2. Use this as a short checkpoint before moving to named protocols. Expand the answer key after attempting.
3. Explain why DNS is needed when a user enters a URL.
4. State one difference between an IP address and a MAC address.
5. Identify the domain name in https://store.example.com/products/item7 .
6. 1: DNS resolves the domain name in the URL to an IP address so packets can be routed to the server.
7. 2: IP is a logical network address that can change; MAC is a hardware/interface address used locally.
8. 3: store.example.com .

### DNS: name to IP address

- **Explains:** `dns`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-020-dns.jpg`

1. 1. URL entered The user enters a URL containing a domain name.
2. 2. DNS lookup The device asks a DNS server to resolve the domain name.
3. 3. IP returned The DNS server returns the IP address for that domain name.
4. 4. Packets sent Packets can now be addressed and routed to the web server.
5. Common error
6. DNS failure may stop a domain name working even if the server is still reachable by IP address.

### URL components

- **Explains:** `urls`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-020-urls.jpg`

1. https://www.example.org/resources/page.html
2. Protocol / scheme https tells the browser which communication protocol to use.
3. Domain name www.example.org is resolved by DNS to an IP address.
4. Path /resources/page.html identifies the resource on the server.
<!-- stage10-explanations:end -->
