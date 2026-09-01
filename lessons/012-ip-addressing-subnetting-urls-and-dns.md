# Lesson 012: IP addressing, subnetting, URLs and DNS

**Course:** Cambridge International AS Level Computer Science 9618, syllabus for examination in 2027-2029<br>
**Paper:** Paper 1<br>
**Syllabus:** Section 2: Communication<br>
**Syllabus requirements:** S2.15, S2.16<br>
**Pacing:** Flexible. Select a quick, full or deep route for the learners in front of you.

## Teaching-depth menu

- **Quick route:** Use the diagnostic, learning objectives, first worked example and foundation question. Stop once the learner can explain the central distinction accurately.
- **Full route:** Teach every knowledge-point material set, the worked method and all lesson questions.
- **Deep route:** Add the prerequisite refresher, ask learners to connect the concept checklist, discuss the labelled extension and complete a transfer question without a model answer.

## 1. Prerequisite knowledge and quick diagnostic

Recall S2.15 before starting this lesson.

Ask the learner to give one accurate definition or method step before continuing. If they cannot, briefly revisit the named prerequisite rather than repeating the whole previous lesson.

### Optional prerequisite refresher

- IPv4 is 32-bit and IPv6 is 128-bit. An address is associated with a network interface on a network. Private addressing reduces direct public reachability but does not guarantee security.
- Explain IP-address use, including IPv4/IPv6 format, subnetting, device association, public/private and static/dynamic addresses, and security implications.


## 2. Knowledge explanation

### 1. IP-address use, including IPv4/IPv6 format, subnetting, device association, public/private and static/dynamic addresses, and security implications (S2.15)

**Atomic learning targets**

- **S2.15.A01:** IPv4
- **S2.15.A02:** 32-bit
- **S2.15.A03:** IPv6
- **S2.15.A04:** 128-bit
- **S2.15.A05:** subnetting
- **S2.15.A06:** network interface
- **S2.15.A07:** public address
- **S2.15.A08:** private address
- **S2.15.A09:** static addresses
- **S2.15.A10:** dynamic addresses
- **S2.15.A11:** does not guarantee security

**Core explanation**

- An IP address identifies a network interface so packets can be routed to it. IPv4 addresses contain 32 bits; IPv6 addresses contain 128 bits and are normally written as hexadecimal groups.
- Subnetting divides one address space into smaller logical networks by treating part of the address as the subnet identifier. Devices use the subnet information to decide whether a destination is local or must be sent to a router.
- A public address is an IP address routable on the public internet. A private address is used inside a local network and normally reaches the internet through address translation; private addressing reduces direct reachability but does not guarantee security.
- Static addresses stay assigned until deliberately changed, which suits servers that must be found predictably. Dynamic addresses are assigned for a period by a service such as DHCP and may change.
- An address belongs to a network interface, not permanently to a person or an entire physical computer. A device with wired and wireless interfaces can have a different address on each interface.

**Mechanism or method**

1. **Identify the address version** — Use 32-bit IPv4 or 128-bit IPv6 and interpret the address notation accurately.
2. **Separate network and host information** — Use the subnet definition to decide whether the destination is local or must be forwarded to a router.
3. **Classify reachability and assignment** — Distinguish public/private scope and static/dynamic allocation, then state the practical consequence of each choice.

#### Worked example: Classify an interface address

1. **Address**

A school printer interface uses IPv4 address 192.168.10.37 with the first 24 bits identifying its subnet.

2. **Subnet**

The interface is on subnet 192.168.10.0; a destination on another subnet must be sent to the router.

3. **Scope**

192.168.10.37 is private, so it is not directly routed across the public internet.

4. **Assignment**

The printer should normally receive a static assignment so clients can find it predictably.

5. **Security**

The private address reduces direct exposure but authentication, firewall rules and updates are still needed.

**Misconceptions to correct**

- DNS resolves a domain name; it does not decide whether an IP address is static, dynamic, public or private.

#### Mastery check (MC-L012-S2.15)

Explain the following targets in one connected answer, using a concrete example for each: IPv4; 32-bit; IPv6; 128-bit; subnetting; network interface; public address; private address; static addresses; dynamic addresses; does not guarantee security.

<details><summary>Answer criteria</summary>

- An IP address identifies a network interface so packets can be routed to it. IPv4 addresses contain 32 bits; IPv6 addresses contain 128 bits and are normally written as hexadecimal groups.
- Subnetting divides one address space into smaller logical networks by treating part of the address as the subnet identifier. Devices use the subnet information to decide whether a destination is local or must be sent to a router.
- A public address is an IP address routable on the public internet. A private address is used inside a local network and normally reaches the internet through address translation; private addressing reduces direct reachability but does not guarantee security.
- Static addresses stay assigned until deliberately changed, which suits servers that must be found predictably. Dynamic addresses are assigned for a period by a service such as DHCP and may change.
- An address belongs to a network interface, not permanently to a person or an entire physical computer. A device with wired and wireless interfaces can have a different address on each interface.

</details>

**Supplementary concept map**

- **IPv4:** 32-bit address
- **IPv6:** 128-bit address
- **Subnet:** separates logical networks
- **Interface:** owns the address
- **Public/private:** different routing scope
- **Static/dynamic:** different assignment lifetime

**Supplementary three-step recap**

1. **Identify the address version** — Use 32-bit IPv4 or 128-bit IPv6 and interpret the address notation accurately.
2. **Separate network and host information** — Use the subnet definition to decide whether the destination is local or must be forwarded to a router.
3. **Classify reachability and assignment** — Distinguish public/private scope and static/dynamic allocation, then state the practical consequence of each choice.

**Address one interface, then route:** Version, subnet, scope and assignment answer different questions; none is a complete security control.



<details><summary>Precise syllabus wording</summary>

Explain IP-address use, including IPv4/IPv6 format, subnetting, device association, public/private and static/dynamic addresses, and security implications.

IPv4 is 32-bit and IPv6 is 128-bit. An address is associated with a network interface on a network. Private addressing reduces direct public reachability but does not guarantee security.

</details>

### 2. How a URL locates a WWW resource and the role of DNS (S2.16)

**Atomic learning targets**

- **S2.16.A01:** Uniform Resource Locator
- **S2.16.A02:** scheme
- **S2.16.A03:** domain name
- **S2.16.A04:** path
- **S2.16.A05:** DNS resolves
- **S2.16.A06:** IP address
- **S2.16.A07:** WWW resource

**Core explanation**

- A Uniform Resource Locator (URL) identifies a WWW resource. Its scheme states how to access the resource, the domain name identifies the named host, and the path identifies the resource on that host.
- A URL can also contain an optional port, query and fragment. These components have different jobs and are not all sent to DNS.
- DNS resolves the domain name to an IP address. It does not resolve the path, store the web page or return the requested resource.
- After resolution, the browser uses the returned IP address to contact the web server and sends a request containing the required host and path. The server then locates or generates the resource and returns it.

**Mechanism or method**

1. **Separate the URL components** — Identify the scheme, domain name and path before deciding which component DNS must resolve.
2. **Ask DNS for the domain address** — DNS looks up the domain name and returns an IP address; it does not process the resource path.
3. **Contact the web server** — The browser connects using the IP address and requests the path so the server can return the WWW resource.

#### Worked example: Resolve and request one URL

1. **URL**

For https://www.example.org/course/page.html?unit=2#quiz, https is the scheme, www.example.org is the domain and /course/page.html is the path.

2. **DNS**

The browser asks DNS to resolve www.example.org and receives the server's IP address.

3. **Connection**

The browser opens the HTTPS connection to that address and identifies the host it wants.

4. **Request**

The browser requests /course/page.html with query unit=2; the server, not DNS, locates or generates the resource.

5. **Fragment**

The browser uses #quiz to move to a location within the returned document; the fragment is not part of the DNS lookup.

**Misconceptions to correct**

- DNS maps a domain name to an IP address; it does not translate the entire URL into a web page.

#### Mastery check (MC-L012-S2.16)

Explain the following targets in one connected answer, using a concrete example for each: Uniform Resource Locator; scheme; domain name; path; DNS resolves; IP address; WWW resource.

<details><summary>Answer criteria</summary>

- A Uniform Resource Locator (URL) identifies a WWW resource. Its scheme states how to access the resource, the domain name identifies the named host, and the path identifies the resource on that host.
- A URL can also contain an optional port, query and fragment. These components have different jobs and are not all sent to DNS.
- DNS resolves the domain name to an IP address. It does not resolve the path, store the web page or return the requested resource.
- After resolution, the browser uses the returned IP address to contact the web server and sends a request containing the required host and path. The server then locates or generates the resource and returns it.

</details>

**Supplementary concept map**

- **Scheme:** access method
- **Domain:** named host
- **Path:** resource on host
- **DNS:** domain to IP
- **IP address:** server network destination
- **Browser:** requests the WWW resource

**Supplementary three-step recap**

1. **Separate the URL components** — Identify the scheme, domain name and path before deciding which component DNS must resolve.
2. **Ask DNS for the domain address** — DNS looks up the domain name and returns an IP address; it does not process the resource path.
3. **Contact the web server** — The browser connects using the IP address and requests the path so the server can return the WWW resource.

**Resolve the host, request the path:** DNS handles the domain name; the browser sends the path to the web server after resolution.

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

#### URL components

![URL components](../web/assets/diagrams/stage10-infographics/stage10-lesson-021-urls.jpg)

<details><summary>Text transcript</summary>

- https://www.example.org/resources/page.html
- Protocol / scheme https tells the browser which communication protocol to use.
- Domain name www.example.org is resolved by DNS to an IP address.
- Path /resources/page.html identifies the resource on the server.

</details>

<details><summary>Precise syllabus wording</summary>

Explain how a URL locates a WWW resource and the role of DNS.

A URL may contain scheme, domain, optional port, path and optional query/fragment. DNS resolves the domain name to an IP address; it does not resolve the path or store the resource.

</details>

### Lesson technical reference

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

### Question 3 - transfer - explain - 6 marks

For the URL https://school.example/course/page.html, identify the scheme, domain name and path, then explain how DNS and the browser use them to retrieve the WWW resource.

**Answer:** scheme is https; domain name is school.example; path is /course/page.html; DNS resolves only the domain name to an IP address; browser connects to the server using that address; browser requests the named path and the server returns the resource

**Marking guidance:** Keep DNS resolution separate from the browser's resource request.

**Common error:** DNS does not resolve the path or return the web page.

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

- S2.15: explain IPv4, 32-bit, IPv6, 128-bit, subnetting, network interface, public address, private address, static addresses, dynamic addresses, does not guarantee security.
- S2.15 method: Identify the address version → Separate network and host information → Classify reachability and assignment.
- S2.16: explain Uniform Resource Locator, scheme, domain name, path, DNS resolves, IP address, WWW resource.
- S2.16 method: Separate the URL components → Ask DNS for the domain address → Contact the web server.
- Correction to remember: DNS resolves a domain name; it does not decide whether an IP address is static, dynamic, public or private.

### Common error to correct

Students often confuse bandwidth with speed in every sense. Correction: bandwidth is capacity; latency and congestion also affect perceived performance.

### Exam technique

- Follow the command word: state gives a fact; explain links a cause to a consequence; compare covers both sides.
- Match the number of independent points or method steps to the available marks.
- For ip addressing, subnetting, urls and dns, use the exact technical term before applying it to the scenario.
