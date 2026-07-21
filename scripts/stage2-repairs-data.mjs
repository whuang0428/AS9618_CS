const r = (lesson, rows, title, explanation, exampleTitle, example, practice, exam, marks, strict) => ({
  lesson, rows, title, explanation, exampleTitle, example, practice, exam, marks, strict,
});
const q = (question, answer) => ({ q: question, a: answer });

export const repairs = [
  r(1, ["S1.01"], "Binary and decimal magnitude prefixes", [
    "Binary prefixes use powers of 1024: 1 KiB = 2^10 bytes, 1 MiB = 2^20 bytes, 1 GiB = 2^30 bytes and 1 TiB = 2^40 bytes.",
    "Decimal prefixes use powers of 1000: 1 kB = 10^3 bytes, 1 MB = 10^6 bytes, 1 GB = 10^9 bytes and 1 TB = 10^12 bytes. Case and the i in KiB/MiB/GiB/TiB carry meaning."
  ], "2 TiB drive", "2 TiB = 2 x 2^40 = 2,199,023,255,552 bytes. A 2 TB drive is 2,000,000,000,000 bytes, so the labels are not interchangeable.", [
    q("How many bytes are in 4 GiB?", "4 x 2^30 = 4,294,967,296 bytes."),
    q("Which is larger, 1 TB or 1 TiB?", "1 TiB, because 2^40 is greater than 10^12."),
    q("Convert 3,000,000 bytes to MB.", "3 MB using the decimal prefix mega.")
  ], "State the number of bytes represented by 1 GiB and explain why 1 GB represents a different number of bytes.", [["B1", "1 GiB = 2^30 bytes / 1,073,741,824 bytes"], ["B1", "gibi uses a binary power / multiples of 1024"], ["B1", "1 GB = 10^9 bytes / 1,000,000,000 bytes"], ["B1", "giga uses a decimal power / multiples of 1000"]], "Do not accept 'GiB is bigger' without both numerical definitions."),

  r(4, ["S1.04"], "Binary subtraction with signed and unsigned values", [
    "Unsigned subtraction can be performed column by column using borrowing, or by adding the two's complement of the subtrahend. The fixed bit width must be retained throughout.",
    "For signed two's-complement subtraction A - B, form the two's complement of B and add it to A. Discard a carry beyond the fixed width, then interpret the remaining sign bit and check the representable range."
  ], "8-bit 23 - 9", "00010111 - 00001001 becomes 00010111 + 11110111 = 1 00001110. Discard the ninth carry: 00001110 is 14.", [
    q("Calculate 00110110 - 00010100.", "00100010, which is 34."),
    q("In 8-bit two's complement, calculate 7 - 12.", "00000111 + 11110100 = 11111011, which is -5."),
    q("Why is a carry beyond bit 8 discarded?", "The operation has a fixed 8-bit width; the ninth bit lies outside that representation.")
  ], "Using 8-bit two's complement, calculate 18 - 27. Show how subtraction is converted to addition.", [["M1", "27 is 00011011 and its two's complement is 11100101"], ["M1", "adds 00010010 + 11100101"], ["A1", "obtains 11110111"], ["A1", "interprets the result as -9"]], "Do not award the final mark for 247; the result must be interpreted as signed two's complement."),

  r(6, ["S1.02", "S1.03", "S1.06"], "Binary-coded decimal (BCD)", [
    "BCD encodes each denary digit separately in four bits. For example, 59 becomes 0101 1001, not the pure-binary value 00111011.",
    "Only 0000 to 1001 are valid BCD digit groups. BCD is useful when decimal digits must be displayed exactly, such as clocks and calculators, but it usually uses more bits than pure binary."
  ], "Encode 407", "Treat 4, 0 and 7 separately: 4 = 0100, 0 = 0000, 7 = 0111, so 407 in BCD is 0100 0000 0111.", [
    q("Write denary 82 in BCD.", "1000 0010."),
    q("Decode BCD 0011 1001.", "39."),
    q("Why is 1010 invalid as one BCD digit?", "BCD digit groups represent only denary 0 to 9; 1010 represents 10.")
  ], "The bit pattern 0010 0101 is stored as BCD. State the denary value and explain one reason BCD may be chosen for a digital clock.", [["B1", "identifies separate groups 0010 and 0101"], ["A1", "states 25"], ["B1", "each displayed denary digit maps directly to one four-bit group"], ["B1", "reduces conversion work / preserves exact decimal digits for display"]], "Do not accept 37, which is the pure-binary interpretation of the whole eight-bit pattern."),

  r(8, ["S1.08"], "Image resolution and screen resolution", [
    "Image resolution is the number of pixels stored in the image, commonly width x height. Screen resolution is the number of physical display pixels available on the screen.",
    "They are independent. A high-resolution image shown in a small area may be scaled down; a low-resolution image enlarged across a high-resolution screen may appear pixelated. More image pixels increase uncompressed bitmap size when colour depth is unchanged."
  ], "800 x 600 image on a 1920 x 1080 screen", "The file stores 480,000 image pixels. The screen contains 2,073,600 display pixels. Showing the image at 1600 x 1200 requires scaling; it does not create new captured detail.", [
    q("What does 3840 x 2160 describe for a monitor?", "Its screen resolution: the number of physical display pixels."),
    q("Does a higher screen resolution automatically increase an image file's size?", "No. File size depends on stored image data, not the screen used to view it."),
    q("Why can a 200 x 100 image look pixelated when enlarged?", "The same limited image pixels are spread over more screen pixels; no extra detail is stored.")
  ], "Distinguish image resolution from screen resolution and explain why increasing image resolution can increase bitmap file size.", [["B1", "image resolution is the number/dimensions of pixels stored in the image"], ["B1", "screen resolution is the number/dimensions of physical pixels on the display"], ["B1", "more image pixels must be stored"], ["B1", "therefore more bits are required when colour depth is unchanged"]], "Do not accept 'resolution means quality' without identifying which pixels are being counted."),

  r(9, ["S1.09"], "Vector graphics and drawing lists", [
    "A vector graphic is stored as a drawing list of objects. Each object has properties such as type, coordinates, dimensions, line colour, fill colour and line thickness; software redraws the objects from these instructions.",
    "Vectors scale without pixelation and suit logos, diagrams and shapes. Bitmaps store individual pixels and suit photographs or detailed textures. Choice must be justified using the source image and intended editing/scaling."
  ], "Store a red circle", "A drawing-list entry could record object = circle, centre = (80, 60), radius = 20, fill = red and outline = black. Enlarging it changes the geometry before redrawing, not a grid of stored pixels.", [
    q("Name two properties stored for a vector object.", "Any two of coordinates, dimensions, fill, line colour or line thickness."),
    q("Choose vector or bitmap for a company logo that must appear on a pen and a billboard.", "Vector, because geometric objects can be scaled without pixelation."),
    q("Why is bitmap normally better for a photograph?", "A photograph contains complex per-pixel colour and texture that is inefficient to describe as drawing objects.")
  ], "A designer creates a simple icon from circles and rectangles. Explain how it is stored as a vector graphic and give one advantage over a bitmap when resized.", [["B1", "stored as a drawing list / list of objects"], ["B1", "stores object properties such as coordinates/dimensions/colour"], ["B1", "software redraws objects from the descriptions"], ["B1", "can be resized without pixelation / loss of shape quality"]], "Do not accept 'vector has better quality' unless scalability or object-based storage is explained."),

  r(16, ["S2.05"], "Packet movement through network topologies", [
    "In a bus, a transmitted signal travels along the shared backbone and devices inspect it. In a star, each frame travels through the central switch. In a mesh, alternative links can provide several possible routes. A hybrid combines behaviours of its component topologies.",
    "Topology justification must connect packet path to the scenario: central failure, cable failure, congestion, expansion and redundancy are consequences of the structure."
  ], "One star cable fails", "Only the device on that cable loses its link; packets between other devices still pass through the central switch. If the switch fails, all attached paths fail.", [
    q("Where does a frame pass in a star network?", "Through the central switch."),
    q("Why can a mesh continue after one link fails?", "Packets may use an alternative link/route."),
    q("What shared component carries transmissions in a bus?", "The backbone cable.")
  ], "Compare how a packet travels in a star topology and a mesh topology, and explain one reliability difference.", [["B1", "star packet/frame passes through a central switch"], ["B1", "mesh provides multiple interconnected paths / possible routes"], ["B1", "star switch is a single point of failure"], ["B1", "mesh can reroute when a link fails"]], "Do not accept 'mesh is better' without a packet-path or failure consequence."),

  r(17, ["S2.03"], "Thin clients and thick clients", [
    "A thin client relies mainly on a server for processing and/or storage. A thick client performs more processing locally and normally stores more software or data on the client device.",
    "Thin clients simplify central updates and can use lower-specification hardware, but depend heavily on the server and network. Thick clients can continue more work when disconnected, but local installation, security and maintenance are distributed."
  ], "School computer room", "Thin clients suit centrally managed exam accounts because software and files can be controlled on servers. A network outage, however, can stop the room working; a thick client may retain local applications.", [
    q("Where is most processing performed for a thin client?", "On the server."),
    q("Give one thick-client advantage during a network outage.", "Local applications/data may remain usable."),
    q("Give one thin-client management advantage.", "Software and updates can be managed centrally.")
  ], "A company is choosing thin clients for a call centre. Explain two benefits and one drawback.", [["B1", "centralised software/update management"], ["B1", "lower client hardware/storage requirement or centralised security/data"], ["B1", "depends on network/server availability or performance"], ["B1", "develops one point in the call-centre context"]], "Do not award a mark for 'cheaper' unless the lower client specification or central administration explains why."),

  r(19, ["S2.11"], "Ethernet collisions and CSMA/CD", [
    "CSMA/CD means Carrier Sense Multiple Access with Collision Detection. A station listens to the shared medium; if idle it transmits, while continuing to detect a collision.",
    "After a collision, stations stop transmitting, send/recognise a jam signal, wait for different random backoff periods and retry. The random delay reduces the chance of another simultaneous attempt."
  ], "Two stations sense an idle cable", "Both may begin before either signal reaches the other. They detect the collision, stop, wait different random periods and the station whose timer expires first retries.", [
    q("What is sensed before Ethernet transmission?", "Whether the shared carrier/medium is idle."),
    q("What happens immediately after a collision is detected?", "Transmission stops and a retry is scheduled after a random backoff."),
    q("Why must the delay be random?", "Different delays reduce repeated simultaneous retransmission.")
  ], "Describe how CSMA/CD handles two devices attempting to transmit on a shared Ethernet medium.", [["B1", "each device listens/senses the carrier before transmitting"], ["B1", "transmits when the medium is idle"], ["B1", "detects a collision and stops transmission"], ["B1", "waits a random/backoff time before retrying"]], "Do not accept collision avoidance: CSMA/CD detects and responds to a collision after transmission has begun."),

  r(20, ["S2.15"], "Complete IP address distinctions", [
    "IPv4 uses 32-bit addresses; IPv6 uses 128-bit addresses and provides a much larger address space. A subnet divides a network into logical sections and uses part of the address to identify the network/subnet.",
    "A public address is routable on the internet; a private address is used inside a private network and is not directly routed across the public internet. Static addresses remain fixed; dynamic addresses are allocated and may change. An address identifies a network interface at a given time, not a human permanently."
  ], "School web server and laptops", "The externally reachable server may need a stable public address. Laptops can receive dynamic private addresses; this limits direct unsolicited internet reachability but is not, by itself, complete security.", [
    q("How many bits are in IPv6?", "128 bits."),
    q("Why might a server use a static IP address?", "Clients/DNS need a predictable address for the service."),
    q("What is the purpose of subnetting?", "To divide a network into logical subnetworks and identify which subnet an address belongs to.")
  ], "Compare public/private and static/dynamic IP addresses, giving one suitable use for a static public address.", [["B1", "public address is routable/visible on the internet; private address is for an internal network"], ["B1", "static address remains fixed; dynamic address is allocated and may change"], ["B1", "static public address suitable for an externally accessible server"], ["B1", "fixed address supports reliable location/DNS mapping"]], "Do not accept that private IP addresses guarantee security; they reduce direct public addressing but other controls are still required."),

  r(23, ["S2.09", "S2.14"], "Required LAN and internet connection hardware", [
    "A NIC/WNIC provides wired/wireless network access; a WAP connects wireless devices to a LAN; a switch forwards frames within a LAN; a bridge joins LAN segments; a repeater regenerates a weakened signal; a server provides shared services; cables carry wired signals.",
    "A modem converts signals for an access link. Internet access may use the PSTN, a dedicated leased line or a cellular phone network. A router forwards packets between the local network and other networks."
  ], "Branch office connection", "Each desktop uses a NIC and cable to the switch; phones use a WNIC through the WAP. The router uses a dedicated line and suitable modem/interface to reach the ISP; a repeater is only added where signal distance requires regeneration.", [
    q("Which device regenerates a weakened signal?", "Repeater."),
    q("Which component gives a laptop wireless network connectivity?", "WNIC; it connects through a WAP."),
    q("Why might a business choose a dedicated line instead of PSTN dial-up?", "It offers a permanent, predictable connection suited to continuous business traffic.")
  ], "Describe the roles of a WNIC, WAP, switch and router when a wireless laptop accesses an internet server.", [["B1", "WNIC provides the laptop's wireless network interface"], ["B1", "WAP connects wireless devices to the wired/local network"], ["B1", "switch forwards local frames / connects LAN devices"], ["B1", "router forwards packets between the LAN and internet/other networks"]], "Do not accept WAP and router as automatically identical devices; award their distinct logical roles."),

  r(24, ["S2.06", "S2.13"], "Public/private cloud and WWW/internet distinction", [
    "The internet is the global network infrastructure and protocols connecting networks. The World Wide Web is one service using that infrastructure: linked web resources accessed using browsers and HTTP/HTTPS.",
    "A public cloud offers shared provider infrastructure to customers; a private cloud is dedicated to one organisation. Public cloud can scale with lower capital cost but gives less direct control; private cloud offers more control/customisation but costs more to operate."
  ], "Company document system", "A small company may choose public cloud storage for rapid scaling and outsourced maintenance. A regulated organisation may choose a private cloud for control over configuration and data location, accepting higher cost.", [
    q("Is email part of the WWW?", "No. It uses the internet but is a separate internet service."),
    q("Who uses the infrastructure in a private cloud?", "One organisation."),
    q("Give one public-cloud drawback.", "Less direct control, provider dependence, privacy/location concerns or internet dependence.")
  ], "Distinguish the internet from the World Wide Web, then explain one benefit of a private cloud for an organisation.", [["B1", "internet is the network infrastructure / interconnected networks"], ["B1", "WWW is a service of linked web resources using the internet"], ["B1", "private cloud infrastructure is dedicated to one organisation"], ["B1", "greater control/security configuration/customisation developed"]], "Do not accept 'the internet is WiFi' or 'the WWW is the internet'."),

  r(25, ["S2.12"], "Bit streaming, bit rate and broadband", [
    "Bit streaming delivers media progressively so playback can begin before the whole file arrives. Real-time streaming carries a live event with minimal delay; on-demand streaming sends stored content selected by the user.",
    "Bit rate is the number of bits transmitted each second. Available broadband speed must normally exceed the media bit rate and absorb variation; otherwise the player buffers, lowers quality or pauses. A buffer stores arriving data temporarily."
  ], "6 Mbit/s video on 4 Mbit/s link", "The stream consumes data faster than the link supplies it. A starting buffer only delays the shortage; sustained playback requires a lower bit rate or faster connection.", [
    q("Why does a streaming player buffer data?", "To absorb short variations between arrival and playback rates."),
    q("Classify a live sports broadcast.", "Real-time streaming."),
    q("Classify a selected recorded film.", "On-demand streaming.")
  ], "A video has a bit rate of 8 Mbit/s. Explain why a connection advertised as 8 Mbit/s may still pause during playback.", [["B1", "video requires about 8 million bits each second"], ["B1", "actual available speed may be below advertised/maximum speed"], ["B1", "other traffic, overhead or variation reduces throughput"], ["B1", "buffer empties when data arrives more slowly than playback consumes it"]], "Do not accept 'bandwidth is slow' without comparing arrival rate with the stream bit rate."),

  r(28, ["S3.03"], "Microphone, touchscreen and VR headset operation", [
    "A microphone diaphragm vibrates with sound; a transducer converts the movement into an analogue electrical signal, which an ADC samples into digital values. A capacitive touchscreen detects a change in an electric field and calculates touch coordinates.",
    "A VR headset displays a separate view to each eye and uses motion/orientation sensors to update the viewpoint. Low-latency tracking is needed so the displayed scene follows head movement."
  ], "Turn head in VR", "Gyroscope/accelerometer readings report orientation; the processor calculates a new camera view; displays present updated left/right images, creating stereoscopic depth.", [
    q("What converts a microphone's analogue signal into digital samples?", "An analogue-to-digital converter (ADC)."),
    q("What does a capacitive touchscreen detect?", "A change in capacitance/electric field at a touch location."),
    q("Why does a VR headset track head movement?", "To update the displayed viewpoint to match the user's orientation.")
  ], "Describe how a microphone captures sound for storage in a computer.", [["B1", "sound waves vibrate a diaphragm"], ["B1", "transducer converts vibration to an analogue electrical signal"], ["B1", "ADC samples/measures the signal"], ["B1", "sample values are encoded/stored as binary"]], "Do not accept that the microphone directly records binary without an analogue signal and conversion stage."),

  r(29, ["S3.03", "S3.04"], "Laser/3D printers, speakers and output buffers", [
    "A laser printer charges a drum, a laser discharges selected points, toner adheres to the image, toner transfers to paper and heat/pressure fuse it. A 3D printer deposits or solidifies material layer by layer from a digital model.",
    "A speaker uses a DAC/amplifier to drive a coil and cone, producing pressure waves. An output buffer temporarily holds data because the processor can produce it faster or in different-sized bursts than a printer or audio device can consume it."
  ], "Print a page", "The operating system places page data in a print buffer. The CPU can continue other work while the slower printer consumes buffered data and performs drum, toner and fusing stages.", [
    q("What permanently bonds toner to laser-printer paper?", "Heat and pressure in the fuser."),
    q("How does a 3D printer build an object?", "It deposits/solidifies successive layers."),
    q("Why is a print buffer needed?", "It handles the speed difference and lets the producer continue while the printer consumes data.")
  ], "Explain why a buffer is used when a computer sends a large document to a laser printer.", [["B1", "processor/computer and printer operate at different speeds"], ["B1", "buffer temporarily stores print data"], ["B1", "printer reads data at its own rate"], ["B1", "computer/processor can continue other processing without waiting for the full print"]], "Do not accept 'the buffer makes the printer faster'; it manages transfer-rate differences."),

  r(30, ["S3.06", "S3.07"], "SRAM, DRAM, PROM, EPROM and EEPROM", [
    "SRAM stores bits using flip-flop circuits, needs no refresh and is fast but expensive with lower density, so it is used for cache. DRAM stores charge in capacitors, requires refresh and is slower but cheaper and denser, so it is used for main memory.",
    "PROM is programmed once. EPROM can be erased with ultraviolet light and reprogrammed. EEPROM is erased and rewritten electrically, often without removing it from the system. All are non-volatile ROM technologies."
  ], "Choose memory for CPU cache", "SRAM is chosen because no refresh and faster access reduce processor waiting; its higher cost and lower capacity are acceptable for a small cache.", [
    q("Why is DRAM refreshed?", "Charge in its storage capacitors leaks and must be restored."),
    q("Which ROM type is erased using ultraviolet light?", "EPROM."),
    q("Which ROM type can normally be rewritten electrically in circuit?", "EEPROM.")
  ], "Compare SRAM and DRAM and explain why DRAM is normally used for main memory.", [["B1", "SRAM is faster / does not require refresh"], ["B1", "DRAM requires refresh / is slower"], ["B1", "DRAM has greater density / lower cost per bit"], ["B1", "main memory needs large capacity, making DRAM more economical"]], "Do not award both comparison marks for merely expanding the abbreviations."),

  r(31, ["S3.03"], "HDD, flash and optical reader/writer operation", [
    "An HDD spins magnetic platters while an actuator positions read/write heads; writing changes magnetic orientation and reading senses it. Flash memory stores charge in floating-gate cells and has no moving parts.",
    "An optical drive spins a disc and directs a laser at its track. Reflected-light differences are read as data; a writer uses a higher-power laser to change a dye or recording layer."
  ], "Read an HDD block", "The controller moves the head to the correct track, waits for the sector to rotate beneath it, senses magnetic patterns and transfers the decoded bits through a buffer.", [
    q("Why is flash storage resistant to mechanical shock?", "It has no moving read/write head or spinning platter."),
    q("What physical property stores HDD data?", "Magnetic orientation/patterns on a platter."),
    q("How does an optical reader distinguish stored data?", "It detects differences in reflected laser light.")
  ], "Describe how data is read from a magnetic hard disk drive.", [["B1", "platters rotate"], ["B1", "actuator positions read/write head over the required track"], ["B1", "required sector passes beneath the head"], ["B1", "head senses magnetic patterns which are decoded as data"]], "Do not accept a laser-based explanation for an HDD; lasers apply to optical media."),

  r(41, ["S4.03"], "Immediate access store (IAS)", [
    "The immediate access store is memory directly accessible by the processor for instructions and data currently required. In the stored-program model, instructions and data share this memory and are distinguished by how they are used.",
    "IAS is not the same as a CPU register or secondary storage. Registers are smaller locations inside the CPU; secondary storage must supply programs/data to main memory before normal execution."
  ], "Run a stored program", "Instructions and working data are loaded from SSD into the IAS/main memory. The CPU fetches an instruction from that memory into the MDR/CIR, then executes it using registers and the ALU.", [
    q("What two kinds of item are held in IAS?", "Instructions and data currently required."),
    q("Is IAS a CPU register?", "No; it is processor-accessible main memory."),
    q("Why must a program on secondary storage be loaded into IAS?", "The processor fetches executable instructions from directly accessible main memory.")
  ], "Explain the role of the immediate access store in a stored-program computer.", [["B1", "stores instructions currently required"], ["B1", "stores data currently required"], ["B1", "processor can directly access/fetch from it"], ["B1", "instructions and data share memory in Von Neumann architecture"]], "Do not accept 'IAS is cache' or 'IAS is a register'."),

  r(43, ["S4.02"], "Index register (IX)", [
    "The index register stores an offset used to modify an address in an indexed instruction. The effective address is formed by adding the instruction's address operand to the IX value.",
    "Indexed addressing is useful for arrays because the base address stays fixed while IX changes for successive elements. IX stores the offset/index contribution, not necessarily the array data itself."
  ], "Access ARRAY[3]", "If the base address is 500 and IX contains 3, LDX 500 accesses effective address 503 (assuming one address per element). Incrementing IX moves to the next element.", [
    q("What does IX normally store?", "An offset/index used in effective-address calculation."),
    q("Base 120 plus IX 7 gives which effective address?", "127."),
    q("Why is IX useful for arrays?", "The same instruction/base can access successive elements by changing the offset.")
  ], "An instruction uses indexed addressing with address operand 240 and IX = 6. State the effective address and explain the role of IX.", [["B1", "effective address is 246"], ["B1", "IX stores an offset/index"], ["B1", "offset is added to the instruction/base address"], ["B1", "allows repeated access to array/list elements"]], "Do not accept 240 as the effective address when IX is non-zero."),

  r(44, ["S4.06"], "USB, HDMI and VGA ports", [
    "USB is a general serial interface carrying digital data and often power for peripherals. HDMI carries digital video and audio. VGA carries analogue video and does not carry audio in the standard VGA signal.",
    "Port choice depends on signal type and device: keyboard/storage commonly use USB, a modern display/TV uses HDMI, and a legacy analogue monitor/projector may use VGA. An adapter does not make analogue and digital signals identical."
  ], "Connect a laptop to a modern TV", "Use HDMI because one cable can carry digital video and audio. VGA would carry analogue video only, so a separate audio connection would be needed.", [
    q("Which port commonly carries both digital video and audio?", "HDMI."),
    q("Which named port carries analogue video?", "VGA."),
    q("Give one extra facility USB may provide besides data.", "Electrical power to a peripheral.")
  ], "Compare HDMI and VGA for connecting a computer to a display.", [["B1", "HDMI carries digital video"], ["B1", "HDMI can also carry audio"], ["B1", "VGA carries analogue video"], ["B1", "VGA does not normally carry audio / may have lower suitability for modern digital displays"]], "Do not accept 'HDMI is always higher quality' without the digital/analogue or audio distinction."),

  r(45, ["S4.12"], "Assembly instruction groups", [
    "Data movement instructions transfer values between memory/registers; input/output instructions communicate with devices; arithmetic instructions change numeric values; compare instructions set status information; branch instructions change the next instruction address.",
    "A conditional branch depends on a comparison/status condition, while an unconditional jump always changes the PC. Classifying by effect helps trace code before considering a specific mnemonic."
  ], "Classify a loop", "LDD COUNT is data movement, CMP LIMIT is comparison, JPE DONE is conditional branch, INC COUNT is arithmetic, JMP LOOP is unconditional branch and OUT is output.", [
    q("Which group does STO belong to?", "Data movement/storage."),
    q("Why is JPE conditional?", "It branches only when the equality condition/status is satisfied."),
    q("Which group changes a numeric accumulator value?", "Arithmetic.")
  ], "Explain the difference between a compare instruction, a conditional branch and an unconditional branch.", [["B1", "compare tests values / sets status without itself selecting normal data output"], ["B1", "conditional branch changes flow only when a condition/status is met"], ["B1", "unconditional branch always changes the next instruction/PC"], ["B1", "uses a coherent example or sequence"]], "Do not accept that CMP itself necessarily jumps to another instruction."),

  r(46, ["S4.10", "S4.13"], "Two-pass assembler and core instruction semantics", [
    "Pass 1 scans source, assigns addresses and builds a symbol table for labels, allowing forward references. Pass 2 translates mnemonics/operands using the completed table and produces machine code; invalid mnemonics or unresolved symbols are reported.",
    "Core mnemonics must be read by effect: LDM immediate; LDD direct; LDI indirect; LDX indexed; LDR relative; MOV register transfer; STO memory store; ADD/SUB/INC/DEC arithmetic; JMP branch; CMP/CMI compare; JPE/JPN conditional branches; IN/OUT I/O; END stops."
  ], "Forward label", "JMP FINISH appears before FINISH. Pass 1 records FINISH's eventual address in the symbol table; pass 2 substitutes that address when translating JMP.", [
    q("Which pass builds the symbol table?", "Pass 1."),
    q("What is the difference between LDM #5 and LDD 5?", "LDM loads literal 5; LDD loads the contents of memory address 5."),
    q("Which instruction terminates execution?", "END.")
  ], "Explain why an assembler commonly uses two passes when a program contains a forward reference.", [["B1", "label is used before its address is known"], ["B1", "pass 1 assigns addresses/builds the symbol table"], ["B1", "the forward label address is then available"], ["B1", "pass 2 translates the instruction/substitutes the address into machine code"]], "Do not accept that pass 1 executes the program; both passes translate source."),

  r(47, ["S4.13"], "Address-sensitive load, compare and branch instructions", [
    "LDI follows the address stored at the operand location; LDX adds IX to the operand; LDR uses an address relative to the current instruction/PC. CMI compares with an immediate value, while CMP compares using the instruction-set operand definition.",
    "JPE branches when the equality result/zero condition is set. JPN branches when the result is negative. Correct traces update PC according to the condition and must distinguish an address from the value stored there."
  ], "Trace a conditional", "After CMI #0, JPN NEG branches only if the accumulator compares as negative. Otherwise execution continues with the next sequential instruction.", [
    q("Which load follows a pointer in memory?", "LDI."),
    q("Which load combines its operand with IX?", "LDX."),
    q("When does JPE branch?", "When the comparison indicates equal / zero condition is set.")
  ], "Describe the difference between direct and indirect loading, and state how JPN affects execution.", [["B1", "direct uses the operand as the address of the value"], ["B1", "indirect uses the contents of the operand address as another address"], ["B1", "JPN tests the negative condition/status"], ["B1", "PC changes to the branch target only when that condition is true"]], "Do not accept that indirect addressing simply loads the operand as a literal value."),

  r(50, ["S4.15"], "Bit masks and logical shifts", [
    "AND with a mask tests/clears bits: mask 1 preserves a bit and mask 0 clears it. OR sets selected bits because OR with 1 gives 1. XOR toggles selected bits because XOR with 1 reverses the bit.",
    "LSL moves bits left, inserts 0 on the right and discards the leftmost bit; without overflow this multiplies an unsigned value by 2. LSR moves bits right, inserts 0 on the left and discards the rightmost bit; for unsigned values this divides by 2 using integer truncation."
  ], "Test bit 3", "For value 10110100 and mask 00001000, AND gives 00000000, so that bit is 0. OR with the same mask would set it; XOR would toggle it.", [
    q("Which operation sets selected bits without clearing others?", "OR with a mask containing 1 at each bit to set."),
    q("Calculate 00110110 LSL 1 in eight bits.", "01101100."),
    q("Calculate 00110111 LSR 1.", "00011011; the discarded 1 gives integer truncation.")
  ], "The byte 10100100 is ANDed with mask 00000100. State the result and explain what the operation tests.", [["M1", "performs bitwise AND"], ["A1", "result 00000100"], ["B1", "mask isolates the selected bit / clears all other positions"], ["B1", "non-zero result shows the selected bit was set"]], "Do not accept a Boolean whole-value AND; the operation is applied independently to corresponding bits."),

  r(58, ["S5.03"], "Libraries and dynamically linked library files", [
    "A library is a tested collection of reusable code. A dynamically linked library is linked when a program loads or calls it, rather than copying all library code into every executable.",
    "DLLs can reduce executable size and memory duplication, support reuse and allow one shared update. They also create dependency and version risks: a missing or incompatible DLL can stop a program loading or change behaviour."
  ], "Three programs use one graphics DLL", "All three executables call the shared graphics code. One loaded copy may be shared in memory and a security fix can update the DLL once, but replacing it with an incompatible version can break all three programs.", [
    q("When is a dynamically linked library connected to a program?", "At load time or run time when required."),
    q("Give one storage benefit of dynamic linking.", "Library code need not be copied into every executable."),
    q("Give one DLL risk.", "A missing/incompatible version can prevent execution or cause faults.")
  ], "Explain two benefits and one drawback of using a dynamically linked library.", [["B1", "shared reusable code / avoids rewriting"], ["B1", "smaller executables or reduced duplicate memory/storage"], ["B1", "shared library can be updated once"], ["B1", "missing/incompatible DLL can stop or alter programs"]], "Do not accept 'saves space' unless duplication or executable size is explained."),

  r(60, ["S5.06", "S5.07"], "Java translation and required IDE features", [
    "Java source is compiled into platform-independent bytecode. A Java Virtual Machine then interprets and/or just-in-time compiles bytecode for the host processor, supporting portability across systems with a suitable JVM.",
    "An IDE may provide context-sensitive prompts, dynamic syntax checking, prettyprinting, code expand/collapse, single-step execution, breakpoints, variable/expression inspection and a report/output window. Each feature supports writing, navigating or debugging code; it does not prove logical correctness."
  ], "Locate a loop fault", "A breakpoint pauses before the loop, single-step advances one statement at a time, and the variable window shows Index changing. Dynamic syntax checking would flag malformed syntax, but not a valid loop with the wrong boundary.", [
    q("What does a Java compiler normally produce?", "Bytecode."),
    q("What executes Java bytecode on a host system?", "A Java Virtual Machine (JVM), using interpretation and/or JIT compilation."),
    q("Which IDE feature pauses at a chosen line?", "A breakpoint.")
  ], "Explain how Java source is translated and executed, and describe one IDE feature useful for debugging.", [["B1", "Java source is compiled"], ["B1", "compiler produces bytecode"], ["B1", "JVM interprets/JIT-compiles bytecode for the host"], ["B1", "valid debugging feature described with its effect"]], "Do not accept that Java source is compiled directly into one universal machine-code file."),

  r(62, ["S6.01"], "Security, privacy and data integrity", [
    "Data security is protection against unauthorised access, loss or damage. Privacy concerns appropriate collection, use and disclosure of personal data. Integrity means data remains accurate, complete and unaltered except by authorised processes.",
    "The concepts overlap but are not synonyms: encrypted inaccurate data may be secure but lack integrity; authorised publication may preserve integrity while violating privacy."
  ], "Incorrect medical record", "A record encrypted from attackers has security, but an accidental dosage change damages integrity. Sending the accurate record to an unauthorised advertiser violates privacy.", [
    q("Which concept is damaged when data is altered incorrectly?", "Integrity."),
    q("Which concept concerns how personal data is collected and disclosed?", "Privacy."),
    q("Can data be secure but inaccurate?", "Yes; access protection does not guarantee correctness.")
  ], "Distinguish data security, privacy and integrity using one data-record scenario.", [["B1", "security protects against unauthorised access/loss/damage"], ["B1", "privacy controls appropriate personal-data use/disclosure"], ["B1", "integrity concerns accuracy/completeness/authorised change"], ["B1", "scenario correctly distinguishes at least two consequences"]], "Do not accept three repetitions of 'keeping data safe'."),

  r(63, ["S6.03"], "Anti-spyware as a security measure", [
    "Spyware secretly monitors activity or collects data, such as keystrokes, credentials or browsing behaviour. Anti-spyware scans files, memory and behaviour for known signatures or suspicious actions, then blocks, quarantines or removes detected software.",
    "It must be updated because new spyware and signatures appear. Anti-spyware reduces risk but cannot guarantee detection of every new or concealed threat."
  ], "Keylogger detected", "The scanner matches the process to a known signature, prevents it running and quarantines the file so it cannot continue capturing credentials.", [
    q("What is spyware designed to do?", "Secretly monitor activity or collect user/system data."),
    q("What does quarantine do?", "Isolates suspicious code so it cannot execute normally."),
    q("Why update anti-spyware definitions?", "To recognise newly identified spyware.")
  ], "Explain how anti-spyware software can reduce the risk from a keylogger.", [["B1", "scans/monitors files, memory or behaviour"], ["B1", "uses signatures/rules to detect suspicious software"], ["B1", "blocks/quarantines/removes the keylogger"], ["B1", "prevents/reduces capture of keystrokes or credentials"]], "Do not accept that anti-spyware prevents all malware or repairs credentials already stolen."),

  r(67, ["S6.03"], "Digital signatures", [
    "A sender hashes the message and encrypts the hash with the sender's private key to form a digital signature. The receiver uses the sender's public key to recover/verify the signed hash and independently hashes the received message.",
    "Matching hashes provide evidence of integrity and origin/authenticity; a valid signature does not keep the message confidential. Certificates help bind a public key to an identity."
  ], "Verify a signed update", "The device verifies the signature using the publisher's public key, hashes the downloaded update and compares hashes. A mismatch means the file or signature is not valid.", [
    q("Which key creates a sender's digital signature?", "The sender's private key."),
    q("What does the receiver compare?", "The verified signed hash with a newly calculated message hash."),
    q("Does a digital signature encrypt the whole message for confidentiality?", "Not necessarily; its main purposes are integrity and authentication/non-repudiation evidence.")
  ], "Describe how a digital signature is created and checked.", [["B1", "sender creates a hash of the message"], ["B1", "hash is signed/encrypted using sender's private key"], ["B1", "receiver uses sender's public key and hashes received message"], ["B1", "matching hashes verify integrity and provide evidence of sender authenticity"]], "Do not award confidentiality as the purpose of a signature unless separate message encryption is described."),

  r(69, ["S6.07", "S6.08"], "Complete validation and verification methods", [
    "Validation checks whether data is reasonable and follows rules: range, format, length, presence, existence, limit and check digit. It cannot prove truth. Verification checks whether data was copied accurately, using visual checking or double entry.",
    "Error detection includes parity: a parity byte checks one group and block parity adds row/column checks; a checksum is calculated from a data block and compared after transmission. These detect many errors but do not correct every error."
  ], "New product code", "A presence check rejects blank input, length and format checks enforce the pattern, an existence check confirms the code is in the product file, and a check digit detects many keying errors. None proves the label was attached to the correct product.", [
    q("Which check confirms a foreign code is already stored in a lookup file?", "Existence check."),
    q("How does double-entry verification work?", "Data is entered twice and the two entries are compared."),
    q("What happens to a checksum at the receiver?", "It is recalculated and compared with the transmitted checksum.")
  ], "For an eight-digit account number, describe two suitable validation checks and one verification method.", [["B1", "length check requires eight characters/digits"], ["B1", "format/type/check-digit or existence check accurately described"], ["B1", "visual check against source or double entry described"], ["B1", "distinguishes validation reasonableness from verification accuracy of copying"]], "Do not accept 'validation proves the account number is correct'."),

  r(72, ["S7.02"], "BCS and IEEE professional codes", [
    "The British Computer Society (BCS) and IEEE publish professional codes that guide competent, honest and responsible computing practice. They establish expectations for public interest, professional competence, integrity, privacy and accountability.",
    "Codes support consistent decisions, public trust and disciplinary accountability. They do not replace law and do not automatically produce one answer; professionals apply principles to evidence and stakeholders."
  ], "Unsafe release pressure", "A developer documents the safety risk, refuses to conceal test failures and escalates through professional channels, applying public-interest and integrity duties rather than following schedule pressure blindly.", [
    q("Name the two syllabus organisations with professional codes.", "BCS and IEEE."),
    q("Give one purpose of a professional code.", "To set standards guiding responsible professional conduct."),
    q("Does following a manager automatically satisfy a code?", "No; duties such as public interest and integrity may require challenge/escalation.")
  ], "Explain two reasons why professional bodies such as BCS and IEEE publish codes of conduct.", [["B1", "provide standards/guidance for professional decisions"], ["B1", "protect public interest / reduce harm"], ["B1", "support trust/accountability/discipline"], ["B1", "promote competence, honesty, privacy or integrity"]], "Do not accept 'because ethics are good' without a professional purpose or consequence."),

  r(74, ["S7.05"], "FSF, OSI and software freedoms", [
    "The Free Software Foundation focuses on freedoms to run, study, modify and share software; source access is necessary for study/modification. The Open Source Initiative approves licences meeting open-source criteria, including source availability and rights to redistribute/modify.",
    "Free/open-source does not necessarily mean zero price or no copyright. Copyright holders grant permissions through a licence, which may impose conditions such as preserving notices or sharing derivative source under the same terms."
  ], "Modify a library", "An OSI-approved licence may permit source modification and redistribution. A copyleft licence may require distributed derivative work to use compatible terms; exact obligations depend on the licence.", [
    q("Which organisation emphasises four software freedoms?", "Free Software Foundation (FSF)."),
    q("Why is source code needed to study and modify software?", "Executable code alone is not a practical human-readable basis for modification."),
    q("Can open-source software be sold?", "Yes; open source concerns licence rights, not necessarily zero price.")
  ], "Explain why open-source software is still protected by copyright and how a licence changes what users may do.", [["B1", "creator/copyright holder retains copyright"], ["B1", "licence grants specified permissions"], ["B1", "may allow source inspection/modification/redistribution"], ["B1", "users must follow licence conditions"]], "Do not accept that open source means 'no owner' or 'no rules'."),

  r(75, ["S7.05"], "Shareware and commercial licences", [
    "Shareware is distributed for trial or limited use, with payment commonly required for continued, full or unrestricted use. A commercial/proprietary licence grants defined use while normally restricting copying, modification and redistribution.",
    "Licence choice must fit the scenario: budget, support, source modification, redistribution, trial period, compatibility and legal obligations are relevant. 'Free to download' does not mean public domain."
  ], "Trial accounting package", "A company tests a limited shareware edition for 30 days, then buys commercial licences for continued use, vendor support and full reporting features.", [
    q("What commonly changes after a shareware trial?", "Payment is required or features/time become restricted."),
    q("Can a buyer normally redistribute unlimited copies of commercial software?", "No, unless the licence explicitly permits it."),
    q("Give one reason to choose a commercial licence.", "Vendor support, warranty, specialist features or compatibility, developed for the scenario.")
  ], "A school needs supported examination software but cannot modify or redistribute it. Justify a commercial licence and state one restriction.", [["B1", "vendor support/updates appropriate to examination use"], ["B1", "reliability/compatibility/accountability developed"], ["B1", "use limited to licensed users/devices"], ["B1", "copying/modification/redistribution restricted"]], "Do not award 'commercial is better' without a scenario-linked reason."),

  r(76, ["S7.06"], "AI applications and impact chains", [
    "AI applications include medical image classification, recommendation, fraud detection, language processing, autonomous control and predictive maintenance. A valid impact answer names the AI decision mechanism and traces a consequence for a stakeholder.",
    "Social impacts include access, bias and privacy; economic impacts include productivity, job redesign and error cost; environmental impacts include data-centre energy/material use and optimisation of transport or power. Evaluation balances benefits, harms and mitigations in context."
  ], "Medical triage model", "The model prioritises scans, reducing waiting time, but biased training data may miss a patient group. Human review, representative validation data and monitoring can reduce rather than eliminate the risk.", [
    q("Give one economic benefit of predictive maintenance.", "Reduced downtime or repair cost by predicting failure."),
    q("Give one environmental cost of training a large model.", "Electricity use and associated emissions/resource demand."),
    q("Why can biased training data create social harm?", "The model may produce systematically poorer decisions for under-represented groups.")
  ], "Evaluate the use of AI to select applicants for jobs.", [["B1", "valid benefit such as speed/consistent initial processing"], ["B1", "valid risk such as bias, opacity, privacy or exclusion"], ["B1", "explains a stakeholder consequence"], ["B1", "balanced judgement or mitigation linked to the context"]], "Do not accept a list of generic advantages/disadvantages without linking AI decisions to consequences."),

  r(78, ["S8.05", "S8.06"], "DBMS features and query processing", [
    "A DBMS maintains a data dictionary of metadata, supports data modelling and a logical schema, enforces integrity/security/access rights, and provides backup/recovery. These services separate logical data use from physical storage details.",
    "A developer interface accepts commands or API requests. The query processor parses/validates a query, plans how to execute it, accesses the stored data and returns results while the DBMS applies permissions and integrity rules."
  ], "Run a restricted query", "The interface sends SELECT to the DBMS; the query processor checks syntax and access rights, chooses an indexed access plan, reads matching rows and returns only authorised columns.", [
    q("What does a data dictionary store?", "Metadata such as table, field, type, key and constraint definitions."),
    q("What is the role of the query processor?", "To parse, plan and execute database queries."),
    q("Which DBMS feature limits users to permitted operations?", "Access rights/security controls.")
  ], "Describe the roles of a data dictionary and query processor in a DBMS.", [["B1", "data dictionary stores metadata/definitions about database structure"], ["B1", "example such as field type/key/constraint"], ["B1", "query processor interprets/parses a query"], ["B1", "plans/executes it and returns/accesses matching data"]], "Do not accept that the data dictionary stores the ordinary user records themselves."),

  r(80, ["S8.02"], "Relational terminology and secondary indexes", [
    "Entity/table and record/tuple and field/attribute are related pairs, but answers should follow the question's context. A candidate key is any minimal field set that uniquely identifies a record; one candidate becomes the primary key, while another may be a secondary/alternate key.",
    "An index is an additional lookup structure mapping key values to record locations. It can speed retrieval and ordering but uses storage and must be updated when data changes."
  ], "Student identifiers", "StudentID and Email may both be candidate keys. StudentID is selected as primary; Email remains an alternate candidate and may be indexed for faster account lookup.", [
    q("What makes a candidate key minimal?", "No field can be removed while retaining uniqueness."),
    q("Is every candidate key the primary key?", "No; one is selected as primary."),
    q("Give one cost of an index.", "Extra storage and update/maintenance processing.")
  ], "Explain the difference between a candidate key, primary key and database index.", [["B1", "candidate key is a minimal unique identifier"], ["B1", "primary key is the selected candidate key"], ["B1", "index is a separate lookup structure for faster access"], ["B1", "index has storage/update cost or need not enforce entity identity"]], "Do not accept that an index and a primary key are always the same object."),

  r(81, ["S8.02"], "Foreign keys and referential integrity", [
    "A foreign key is an attribute in one table that refers to a primary/candidate key in another table. Referential integrity requires every non-null foreign-key value to match an existing referenced key.",
    "The rule prevents orphan records. Insert, update and delete operations may be rejected or handled by an explicit cascade/null policy; the DBMS must not silently leave an invalid reference."
  ], "Delete a department", "If Employee.DepartmentID refers to Department.DepartmentID, deleting a department with employees would break referential integrity unless deletion is rejected or an authorised cascading policy handles dependent rows.", [
    q("Where is the referenced key stored?", "In the parent/referenced table."),
    q("What is an orphan record?", "A child record whose foreign key has no matching parent key."),
    q("Name one valid delete response.", "Reject the delete, cascade it, or set nullable foreign keys to null according to defined rules.")
  ], "Explain how a foreign key and referential integrity maintain a relationship between two tables.", [["B1", "foreign key is stored in the related/child table"], ["B1", "references a key in the parent table"], ["B1", "each foreign-key value must match an existing referenced value (or valid null)"], ["B1", "prevents orphan/inconsistent relationships"]], "Do not accept that foreign-key values must be unique in the child table."),

  r(83, ["S8.04"], "First, second and third normal form", [
    "1NF requires atomic values and no repeating groups. 2NF is 1NF with every non-key attribute dependent on the whole primary key, removing partial dependencies. 3NF is 2NF with no non-key attribute dependent on another non-key attribute, removing transitive dependencies.",
    "Normalisation decomposes tables while preserving keys and relationships. A 3NF design stores each fact once in the table identified by its determinant, reducing insertion, update and deletion anomalies."
  ], "Order line data", "ORDER_LINE(OrderID, ProductID, ProductName, Quantity) has composite key OrderID+ProductID. ProductName depends only on ProductID, so split PRODUCT(ProductID, ProductName) and ORDER_LINE(OrderID, ProductID, Quantity) to reach 2NF for that dependency.", [
    q("What does 1NF remove?", "Repeating groups and non-atomic/multiple values in one field."),
    q("What dependency violates 2NF?", "A non-key attribute depending on only part of a composite key."),
    q("What dependency violates 3NF?", "A non-key attribute depending on another non-key attribute.")
  ], "Explain why CUSTOMER(CustomerID, Postcode, Town) may not be in 3NF when each postcode determines one town, and give a 3NF design.", [["B1", "CustomerID determines Postcode and Postcode determines Town"], ["B1", "Town is transitively dependent on CustomerID / depends on non-key Postcode"], ["A1", "CUSTOMER(CustomerID, Postcode)"], ["A1", "POSTCODE(Postcode, Town), with Postcode linked as foreign key"]], "Do not award decomposition marks unless primary/foreign-key linkage can reconstruct the relationship."),

  r(87, ["S8.07", "S8.09"], "DDL, DML and required SQL data types", [
    "DDL defines or changes database structure: CREATE DATABASE, CREATE TABLE and ALTER TABLE. DML queries or changes records: SELECT, INSERT, UPDATE and DELETE. SQL is the industry-standard language used for these operations.",
    "Required column types include CHARACTER/VARCHAR, BOOLEAN, INTEGER, REAL, DATE and TIME. CREATE TABLE can declare PRIMARY KEY and FOREIGN KEY references; ALTER TABLE changes an existing definition."
  ], "Create related tables", "CREATE TABLE Department (DepartmentID INTEGER PRIMARY KEY, Name VARCHAR(40)); then CREATE TABLE Employee (EmployeeID INTEGER PRIMARY KEY, Active BOOLEAN, DepartmentID INTEGER, FOREIGN KEY (DepartmentID) REFERENCES Department(DepartmentID));",
  [q("Classify CREATE TABLE as DDL or DML.", "DDL."), q("Choose a type for 12.75.", "REAL."), q("Which statement changes an existing table structure?", "ALTER TABLE.")],
  "Write SQL DDL to create Event(EventID integer primary key, EventDate date, StartTime time, Open boolean).", [["B1", "CREATE TABLE Event"], ["B1", "EventID INTEGER PRIMARY KEY"], ["B1", "EventDate DATE and StartTime TIME"], ["B1", "Open BOOLEAN with valid punctuation/structure"]], "Do not award INSERT/UPDATE statements: the question asks for structure, not record data."),

  r(98, ["S9.04"], "Meaningful identifiers and identifier tables", [
    "Identifiers should describe their data or role, be unambiguous and follow a consistent naming convention. Avoid unexplained single letters except conventional short counters.",
    "An identifier table records each identifier's name, data type and purpose; scope and initial value may be added when useful. It is a design artefact, so entries must match the algorithm that follows."
  ], "Ticket calculation", "Use TicketCount: INTEGER, number of tickets requested; TicketPrice: REAL, price of one ticket; TotalCost: REAL, TicketCount * TicketPrice; IsMember: BOOLEAN, whether discount applies.", [
    q("Improve identifier x for the number of absent students.", "AbsentCount or NumberAbsent."),
    q("What three columns are essential here?", "Identifier, data type and purpose/description."),
    q("Why is Total misleading for several totals?", "It does not identify which quantity is totalled.")
  ], "Construct identifier-table entries for a program storing a student's name, three test marks and calculated mean.", [["B1", "meaningful identifier and STRING type for name"], ["B1", "meaningful array identifier with INTEGER/REAL elements for marks"], ["B1", "meaningful REAL identifier for mean"], ["B1", "purposes clearly distinguish input values from calculated result"]], "Do not award data types without identifiers and purposes; this is an identifier table, not only declarations."),

  r(100, ["S9.07"], "Structured English, flowcharts and pseudocode conversion", [
    "Structured English expresses sequence, selection and repetition using controlled natural-language statements and indentation. A flowchart uses standard symbols and arrows; pseudocode uses Cambridge constructs. All three must preserve the same decisions and loop boundaries.",
    "Convert by identifying inputs, outputs, conditions and repeated actions before translating notation. Do not translate shapes or sentences word for word while losing control flow."
  ], "Validate a mark", "Structured English: INPUT Mark; WHILE Mark < 0 OR Mark > 100, OUTPUT error and INPUT Mark; ENDWHILE. The flowchart returns from the invalid decision branch to input; pseudocode uses a pre-condition WHILE loop.", [
    q("Which flowchart symbol represents a decision?", "Diamond."),
    q("What must remain identical during conversion?", "The algorithm's control flow, conditions, inputs and outputs."),
    q("Why is indentation useful in structured English?", "It shows which steps belong inside a selection or loop.")
  ], "Convert this structured English to pseudocode: input Age; if Age is at least 18 output Adult, otherwise output Minor.", [["B1", "INPUT Age"], ["B1", "IF Age >= 18 THEN"], ["B1", "OUTPUT Adult and ELSE OUTPUT Minor"], ["B1", "closes with ENDIF / coherent Cambridge syntax"]], "Do not accept two independent IF statements if they can produce contradictory paths; the description requires mutually exclusive alternatives."),

  r(111, ["S9.08"], "Stepwise refinement", [
    "Stepwise refinement starts with a high-level task and repeatedly replaces each complex step with smaller, precise substeps. Refinement stops when each step can be implemented directly and its inputs/outputs are clear.",
    "It supports modularity, review and testing because each refinement level preserves the purpose of its parent step. It is not merely adding more prose; each level must reduce ambiguity."
  ], "Process an order", "Level 1: Validate order, calculate total, produce receipt. Refine calculate total into: set Total to 0; for each item validate quantity, add Price * Quantity; apply discount; add tax.", [
    q("What is the starting point of stepwise refinement?", "A high-level solution/task."),
    q("When should refinement stop?", "When steps are precise enough to implement directly."),
    q("How does refinement support testing?", "Smaller modules/steps can be checked independently against defined inputs and outputs.")
  ], "Apply one level of stepwise refinement to the task 'register a new library member'.", [["B1", "captures required member details"], ["B1", "validates details / checks existing member"], ["B1", "creates and stores a unique member record"], ["B1", "outputs confirmation/card or error; steps form a coherent sequence"]], "Do not award a list of unrelated features; substeps must collectively implement the parent task."),

  r(122, ["S10.09", "S10.10"], "Linked lists and array-based ADT state", [
    "A linked list stores nodes containing data and a pointer/index to the next node; a start pointer identifies the first node and a null value ends the chain. Logical order can differ from physical array order.",
    "In an array implementation, parallel Data and Next arrays store nodes and a free-list pointer tracks unused locations. Insert/delete changes links and the free list; items need not be shifted as in a contiguous array."
  ], "Insert after node 2", "Take node 5 from the free list, set Data[5] to the new value, set Next[5] to old Next[2], then set Next[2] to 5. The logical chain now includes node 5 after node 2.", [
    q("What marks the end of a linked list?", "A null/sentinel next pointer."),
    q("What does the start pointer store?", "The index/address of the first logical node."),
    q("Why need a free list in an array implementation?", "To track unused node positions available for insertion.")
  ], "An array-based linked list uses Data and Next arrays. Explain how a new node is inserted at the front.", [["B1", "obtains an unused index from the free list"], ["B1", "stores the new data at that index"], ["B1", "sets its Next to the old start index"], ["B1", "updates start to the new index / updates free-list head"]], "Do not accept shifting every array element as the defining linked-list insertion method."),

  r(123, ["S10.09", "S10.10"], "Choosing stack, queue or linked list", [
    "A stack is LIFO with push/pop at the top; a queue is FIFO with enqueue at the rear and dequeue at the front; a linked list supports traversal and insertion/deletion through links.",
    "Justification must name the required access order or update behaviour. Array implementations have fixed capacity unless resized and require overflow/underflow checks; linked structures require pointer management."
  ], "Choose structures", "Undo history uses a stack because the most recent action is undone first. Print jobs use a queue because the earliest accepted job prints first. A changing ordered playlist can use a linked list for link-based insertion/deletion.", [
    q("Choose an ADT for breadth-first waiting jobs.", "Queue, because first in is first out."),
    q("Choose an ADT for nested function return addresses.", "Stack, because the most recent call returns first."),
    q("What must be checked before pushing to a full array stack?", "Overflow/capacity.")
  ], "Justify a suitable ADT for browser Back history and contrast it with a queue.", [["B1", "selects stack"], ["B1", "most recently visited page is returned to first / LIFO"], ["B1", "queue removes earliest item first / FIFO"], ["B1", "explains why FIFO gives the wrong access order"]], "Do not award the structure name without its access-order consequence."),

  r(140, ["S11.01"], "Translate descriptions into Cambridge pseudocode", [
    "To translate a flowchart, follow arrows from Start, convert input/output symbols directly, convert diamonds into IF/CASE or loop conditions, and preserve every branch and reconnection. To translate structured English, identify its controlled verbs and indentation before selecting Cambridge constructs.",
    "The answer must be Cambridge pseudocode, not Java: use assignment arrow, THEN/ENDIF, FOR...NEXT, WHILE...ENDWHILE or REPEAT...UNTIL as appropriate. Trace both versions with the same data to confirm equivalence."
  ], "Flowchart sum loop", "A flowchart sets Total to 0 and repeats input/add until Value = -1. Pseudocode uses Total <- 0; REPEAT; INPUT Value; IF Value <> -1 THEN Total <- Total + Value; ENDIF; UNTIL Value = -1; OUTPUT Total.", [
    q("How is a flowchart decision normally translated?", "As a selection or loop condition, depending on where arrows reconnect."),
    q("What check confirms a translation is equivalent?", "Dry-run both with the same inputs and compare outputs/control path."),
    q("Should Java braces appear in a Cambridge pseudocode answer?", "No; use Cambridge keywords and terminators.")
  ], "Write Cambridge pseudocode for: input five temperatures, count those below zero, output the count.", [["B1", "initialises count to 0"], ["M1", "uses a five-iteration count-controlled loop with INPUT"], ["M1", "tests Temperature < 0 and increments count"], ["A1", "outputs count after the loop with coherent Cambridge syntax"]], "Do not accept Java syntax such as int, braces or System.out as Cambridge pseudocode."),

  r(144, ["S12.02", "S12.03"], "Structure charts and state-transition diagrams", [
    "A structure chart shows module hierarchy and calls. Boxes name modules; connecting lines show calling relationships; labelled arrows show data or control parameters passed between modules. Reading top-down supports derivation of procedure headers and calls.",
    "A state-transition diagram models states and event/condition-labelled transitions, with a marked start state. It describes how an event changes system state, not the sequence of every program statement."
  ], "Door controller", "States are Locked and Unlocked. Start at Locked; validCard / unlock moves to Unlocked; timeout / lock returns to Locked. A structure chart could show ControlDoor calling ReadCard(CardID), ValidateCard(CardID, IsValid) and SetLock(IsValid).",
  [q("What does a box represent in a structure chart?", "A module/procedure/function."), q("What labels a state transition?", "The event and, where needed, a condition/action."), q("How can a structure chart guide pseudocode?", "Each module becomes a subprogram with shown parameters and calls.")],
  "A system starts LoggedOut. A valid login moves it to LoggedIn; logout returns it to LoggedOut; three invalid attempts move it to Locked. Describe the state-transition diagram.", [["B1", "states LoggedOut, LoggedIn and Locked"], ["B1", "start state points to LoggedOut"], ["B1", "valid login transition to LoggedIn and logout transition back"], ["B1", "three invalid attempts transition from LoggedOut to Locked"]], "Do not accept a flowchart of processing steps; marks require persistent states and event-labelled transitions."),

  r(145, ["S12.05", "S12.06"], "Testing methods, strategy and test plan", [
    "Dry run manually traces code; walkthrough is a structured peer review; white-box derives tests from internal paths; black-box derives tests from specifications. Integration tests combined modules, using a stub to imitate an unavailable called module.",
    "Alpha testing is performed internally before release; beta testing uses selected external users in realistic settings; acceptance testing checks the delivered system against agreed requirements. A strategy states levels/methods/responsibility, while a test plan records test ID, purpose, data, expected result, actual result and pass/fail."
  ], "Test login", "White-box tests cover true/false paths and lockout count; black-box tests valid, invalid and boundary inputs from requirements; a stub returns simulated account results before the database is ready; acceptance confirms the agreed lockout behaviour.", [
    q("Which method derives tests from source-code paths?", "White-box testing."),
    q("Who normally performs beta testing?", "Selected external/end users in realistic use."),
    q("What does a stub replace?", "A called module/component not yet available.")
  ], "Describe four fields that should appear in a test plan and explain why expected and actual results are both recorded.", [["B1", "test identifier/purpose or feature"], ["B1", "test data/input and expected result"], ["B1", "actual result and pass/fail outcome"], ["B1", "comparison shows whether observed behaviour meets the predicted requirement"]], "Do not accept a list containing only normal/abnormal/boundary; those are test-data categories, not a complete test plan."),
];
