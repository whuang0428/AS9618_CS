# Lesson 020: IP addresses, MAC addresses, DNS, and URLs

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 2
**Duration:** 45 minutes
**Assessment rhythm:** 5-minute quiz, monthly assessment checkpoint
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **IP addresses, MAC addresses, DNS, and URLs** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- protocol 协议, packet 数据包, routing 路由, bandwidth 带宽, latency 延迟

## Warm-Up Hook
Ask: If your message to a friend had to travel through several classrooms as tiny envelopes, what address would each envelope need? Use that to introduce IP addresses, MAC addresses, DNS, and URLs, not as a vocabulary list but as a journey.

Lesson-specific focus question: What would go wrong if a student confused **IP addresses, MAC addresses, DNS, and URLs** with a neighbouring syllabus idea?

## Guided Explanation
Trace one message from sender to receiver. At each step, name the device, address, protocol or performance factor involved. Then deliberately break one part of the path and ask students to predict the symptom: delay, failed lookup, wrong destination or insecure transfer.

Topic-specific teaching move: keep the explanation anchored to **IP addresses, MAC addresses, DNS, and URLs**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** A student cannot access a secure web page on the school network. Identify two possible network-related causes and one suitable check for each. The worked example must explicitly use **IP addresses, MAC addresses, DNS, and URLs**, not a generic example from the wider unit.

**Worked answer / marking focus:** Strong answers connect a named component or protocol to a symptom, for example DNS failure prevents name resolution, or HTTPS certificate problems affect secure communication.



## Student Task
Students draw a packet journey for a web request and label where addressing, routing and protocols are used. They then add one bottleneck and explain its effect. Their final answer must include the phrase **IP addresses, MAC addresses, DNS, and URLs** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **IP addresses, MAC addresses, DNS, and URLs**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:
"The key point about **IP addresses, MAC addresses, DNS, and URLs** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **IP addresses, MAC addresses, DNS, and URLs** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 2.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often confuse bandwidth with speed in every sense. Correction: bandwidth is capacity; latency and congestion also affect perceived performance. For this lesson, make students contrast that mistake with the exact idea of **ip addresses, mac addresses, dns, and urls**.
Correction prompt: "Show the mechanism, not just the label."

## Stage 2 syllabus completion

**Official audit rows:** S2.15
**Focus:** Complete IP address distinctions

### Direct explanation

- IPv4 uses 32-bit addresses; IPv6 uses 128-bit addresses and provides a much larger address space. A subnet divides a network into logical sections and uses part of the address to identify the network/subnet.
- A public address is routable on the internet; a private address is used inside a private network and is not directly routed across the public internet. Static addresses remain fixed; dynamic addresses are allocated and may change. An address identifies a network interface at a given time, not a human permanently.

### Worked example

**School web server and laptops:** The externally reachable server may need a stable public address. Laptops can receive dynamic private addresses; this limits direct unsolicited internet reachability but is not, by itself, complete security.

### Targeted practice and answers

1. How many bits are in IPv6?
   **Answer:** 128 bits.
2. Why might a server use a static IP address?
   **Answer:** Clients/DNS need a predictable address for the service.
3. What is the purpose of subnetting?
   **Answer:** To divide a network into logical subnetworks and identify which subnet an address belongs to.

### Exam-style question and MS

**Question (4 marks):** Compare public/private and static/dynamic IP addresses, giving one suitable use for a static public address.

- **B1** public address is routable/visible on the internet; private address is for an internal network
- **B1** static address remains fixed; dynamic address is allocated and may change
- **B1** static public address suitable for an externally accessible server
- **B1** fixed address supports reliable location/DNS mapping

**Strict note:** Do not accept that private IP addresses guarantee security; they reduce direct public addressing but other controls are still required.

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### From a URL to a packet on the local link

- **Explains:** `address-journey`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-020-address-journey.jpg`

1. Visual explanation
2. These labels solve different problems. DNS resolves only the domain name; it does not return a web page or a MAC address.
3. URL Includes a scheme, domain name and path to a resource.
4. DNS Resolves the domain-name part to an IP address.
5. IP address Provides a logical network address used for routing.
6. MAC address Identifies a network interface for delivery on a local link.
7. Check the diagram: does DNS turn the whole URL into a MAC address?
8. No. DNS resolves the domain-name part to an IP address. MAC addressing is used separately on a local network link.

### IP address vs MAC address

- **Explains:** `addresses`
- **Explanation type:** comparison
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-020-addresses.jpg`

1. IP address
2. MAC address
3. Main use
4. Logical address used to identify a device on a network and route packets between networks.
5. Hardware address used to identify a network interface on a local network.
6. Can change, for example when joining a different network or using DHCP.
7. Normally fixed to the network interface by the manufacturer, though it can sometimes be spoofed.
8. 192.168.1.24 or an IPv6 address.
9. 3C:52:82:AA:19:F0

### 5-minute mini assessment

- **Explains:** `checkpoint`
- **Explanation type:** mechanism
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
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-020-dns.jpg`

1. 1. URL entered The user enters a URL containing a domain name.
2. 2. DNS lookup The device asks a DNS server to resolve the domain name.
3. 3. IP returned The DNS server returns the IP address for that domain name.
4. 4. Packets sent Packets can now be addressed and routed to the web server.
5. Common trap
6. DNS failure may stop a domain name working even if the server is still reachable by IP address.

### URL components

- **Explains:** `urls`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-020-urls.jpg`

1. https://www.example.org/resources/page.html
2. Protocol / scheme https tells the browser which communication protocol to use.
3. Domain name www.example.org is resolved by DNS to an IP address.
4. Path /resources/page.html identifies the resource on the server.
<!-- stage10-explanations:end -->
