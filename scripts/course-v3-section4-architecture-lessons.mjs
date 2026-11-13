import { vonNeumann, sharedProgramMemory, registerFamilies, processorType, cores, busWidth, clockSpeed, cache } from './course-v3-section4-architecture-figures.mjs';

const source = (label, url) => ({ label, url });
const text = (title, body) => ({ type: 'text', title, body });
const table = (title, headers, rows, sources) => ({ type: 'table', title, headers, rows, sources });
const syllabus = source('Cambridge 9618 syllabus, 2027–2029, section 4.1', 'https://www.cambridgeinternational.org/Images/721397-2027-2029-syllabus.pdf');
const archive = source('US National Archives, photograph 594262, c. 1946', 'https://docsteach.org/document/eniac-women-programmers/');
const eniacHistory = source('University of Pennsylvania, how the original ENIAC was programmed', 'https://penntoday.upenn.edu/news/penns-eniac-worlds-first-electronic-computer-turns-80');
const usbHistory = source('Intel, USB protocol and connector timeline', 'https://download.intel.com/newsroom/2021/archive/2015-08-13-editorials-thunderbolt-3-usb-type-c-40-gbps.pdf');
const usb4 = source('USB-IF, USB4 (2019)', 'https://www.usb.org/sites/default/files/2019-09/USB-IF_USB4%20spec%20announcement_FINAL.pdf');
const usb80 = source('USB-IF, USB4 Version 2.0 (2022)', 'https://www.usb.org/sites/default/files/2022-10/USB-IF%20USB%2080Gbps%20Announcement_FINAL_v2.pdf');
const usbConnector = source('USB-IF, Type-C cable and connector', 'https://www.usb.org/usb-type-cr-cable-and-connector-specification');
const hdmiHistory = source('HDMI Licensing Administrator, twenty years of HDMI', 'https://hdmi.org/blog/detail/151');
const hdmi22 = source('HDMI Forum, release of HDMI 2.2 (2025)', 'https://www.hdmi.org/download/pressfileid/153');
const ibmPs2 = source('IBM history, the Personal System/2', 'https://www.ibm.com/history/ps-2');
const vgaPins = source('IBM, 15-pin analogue video connector signals', 'https://www.ibm.com/support/pages/installing-external-options-netfinity-7000-m10');
const displayData = source('VESA, Enhanced Display Data Channel standard', 'https://glenwing.github.io/docs/VESA-EDDC-1.2.pdf');
const vgaConverter = source('Dell, connecting digital sources to legacy VGA displays', 'https://www.dell.com/en-us/shopping/vga-converters');

const usbPhotoCredit = source('Photo by Wikideas1 · two crops from the same photograph', 'https://commons.wikimedia.org/wiki/File:USB-A_receptacle.webp');
const usbPhotoLicence = source('CC0 1.0', 'https://creativecommons.org/publicdomain/zero/1.0/');
const hdmiSocketCredit = source('Photo by D-Kuru/Wikimedia Commons · resized', 'https://commons.wikimedia.org/wiki/File:HDMI_connector-female_PNr%C2%B00057.jpg');
const hdmiLicence = source('CC BY-SA 3.0 AT', 'https://creativecommons.org/licenses/by-sa/3.0/at/');
const vgaPhotoCredit = source('Photo by Duncan Lithgow (2006) · public domain', 'https://commons.wikimedia.org/wiki/File:SVGA_port.jpg');
const usbSockets = {
  type: 'figure', title: 'USB Standard-A and Type-C sockets',
  asset: '/assets/course-v3/section-4/usb-standard-a-type-c-receptacles.jpg',
  alt: 'Front views of USB sockets. On the left, a rectangular metal shell surrounds an offset orange tongue. On the right, the smaller Type-C opening has rounded ends.',
  caption: 'These two sockets are shown at the same scale. Look at the shape of each opening to decide which plug will fit.',
  annotations: [
    { x: 8, y: 67, label: 'Standard-A', detail: 'The tongue sits to one side inside the rectangular shell. The plug fits in one orientation.' },
    { x: 85, y: 46, label: 'Type-C', detail: 'The opening has two rounded ends and the plug fits either way up. The shape alone does not establish the data rate or charging power.' },
  ],
  body: 'A computer exchanges digital data with a USB drive in both directions and supplies power to the drive. A USB 2.0 Standard-A connection uses four contacts: VBUS and GND for power, and D+ and D− for data.',
  sources: [usbPhotoCredit, usbPhotoLicence, usbConnector],
};
const hdmiSocket = {
  type: 'figure', title: 'Identify the HDMI Type A socket',
  asset: '/assets/course-v3/section-4/hdmi-type-a-socket-front-d-kuru.jpg',
  alt: 'An HDMI socket recessed in a device panel. The letters HDMI run vertically beside the metal opening. A contact tongue sits inside.',
  caption: 'The HDMI marking identifies the socket on this device. Match the shape of its opening to the cable plug shown on this step.',
  annotations: [
    { x: 9, y: 55, label: 'HDMI marking', detail: 'The letters are embossed in the panel beside the socket.' },
    { x: 60, y: 45, label: 'Contact tongue', detail: 'The slot in the cable plug slides over this tongue.' },
  ],
  body: 'A laptop sends digital video and audio to a display over one HDMI cable. The laptop can also read the display’s capabilities to select a supported video mode.',
  sources: [hdmiSocketCredit, hdmiLicence],
};
const hdmiPlug = {
  type: 'figure', title: 'The mating face of an HDMI Type A plug',
  asset: '/assets/course-v3/section-4/hdmi-type-a-plug-front-d-kuru.jpg',
  alt: 'Front view of an HDMI cable plug. A stepped metal shell surrounds two staggered rows of gold-coloured contacts.',
  caption: 'Look into the cable end. The 19 contact positions of a full-size HDMI Type A plug are arranged in two staggered rows.',
  annotations: [
    { x: 23, y: 39, label: 'Metal shell', detail: 'The stepped sides guide the plug into the matching socket in one orientation.' },
    { x: 66, y: 65, label: 'Contact rows', detail: 'Follow the two rows across the plug face. The positions in one row fall between those in the other.' },
  ],
  sources: [source('Photo by D-Kuru/Wikimedia Commons · resized', 'https://commons.wikimedia.org/wiki/File:HDMI_connector-male-ar_16to9-fs_PNr%C2%B00271.jpg'), hdmiLicence],
};
const vgaSocket = {
  type: 'figure', title: 'The 15-contact VGA socket',
  asset: '/assets/course-v3/section-4/vga-socket-duncan-lithgow.jpg',
  alt: 'A blue VGA socket with three staggered rows of five holes, a D-shaped metal surround and a threaded post on either side.',
  caption: 'Count the five holes in each of the three rows. The matching cable plug has pins that fit these holes.',
  annotations: [
    { x: 33, y: 62, label: 'D-shaped shell', detail: 'The metal surround guides the 15-pin plug into the socket.' },
    { x: 79, y: 58, label: 'Threaded post', detail: 'The two posts accept the retaining screws on the cable plug.' },
  ],
  body: 'The computer sends red, green and blue analogue video signals to the display. Horizontal and vertical sync signals time the picture. Sound needs a separate connection.',
  sources: [vgaPhotoCredit, vgaPins],
};

export const architectureLessons = {
  21: [
    {
      number: '4.1.1', title: 'The basic von Neumann model and an earlier computer',
      materials: [
        { ...vonNeumann, sources: [syllabus] },
        {
          type: 'figure', title: 'Programming the original ENIAC',
          asset: '/assets/course-v3/section-4/eniac-national-archives-594262.jpg',
          alt: 'Two programmers work along a row of ENIAC panels. Cables loop between sockets on the panels, and one programmer reaches up to make an adjustment.',
          caption: 'Follow the cables between panels. In the original ENIAC, programmers connected units and set switches to select and sequence operations. Changing the calculation could require changing this physical setup. US National Archives, 306-PSE-79-120, c. 1946.',
          annotations: [
            { x: 44, y: 60, label: 'Patch cables', detail: 'Trace a hanging lead back to a panel connection. Programmers connected units to route pulses for a calculation.' },
            { x: 88, y: 27, label: 'Panel controls', detail: 'Look at the rows of round controls above the programmer’s arm. Switch settings worked with the cable connections to configure a problem on the original machine.' },
          ],
          sources: [archive, eniacHistory],
        },
      ],
    },
    {
      number: '4.1.2', title: 'What makes a program a stored program?',
      materials: [
        table('Where does each machine keep the program and its data?', ['Question', 'Original ENIAC configuration', 'Basic von Neumann model'], [
          ['Where is the procedure?', 'Patch cables and switches set the sequence of operations.', 'The instructions occupy addresses 0–3 in main memory. At address 1 the CPU finds ADD 5.'],
          ['Where are the numbers?', 'Electronic storage units hold the numbers used in the calculation.', 'Addresses 4 and 5 in that same main memory hold 18 and 24. Address 6 is reserved for the result.'],
          ['How would you change addition to subtraction?', 'An operator changes the relevant connections and settings.', 'Replace ADD 5 with SUB 5 at address 1 and run the program again. Both versions read the same data at addresses 4 and 5.'],
        ]),
        { ...sharedProgramMemory,
          body: 'In the von Neumann model, the program’s machine instructions and the data they use share the same main memory. Each address here holds a binary word, shown as a mnemonic or a decimal number for readability. With ADD 5, the CPU calculates 18 + 24 = 42 and STO 6 writes 42 to address 6. Replace the instruction at address 1 with SUB 5 and restart at address 0. Address 5 still holds 24, so this time the CPU calculates 18 − 24 = −6 and stores −6 at address 6.',
          sources: [source('Cambridge 9618/11, October/November 2022, Q5(a), mark scheme p. 6', 'https://pastpapers.papacambridge.com/directories/CAIE/CAIE-pastpapers/upload/9618_w22_ms_11.pdf#page=6')],
        },
      ],
    },
    {
      number: '4.1.3', title: 'General-purpose and special-purpose registers',
      materials: [
        { ...registerFamilies, body: 'A register is a small, fast storage location inside the processor. While adding two numbers, the CPU needs a working value as well as the address of the next instruction. Trace the two branches and compare how the register is used on the next operation.' },
        table('Two uses of register storage', ['Compare', 'General-purpose register', 'Special-purpose register'], [
          ['Typical use', 'Holds temporary data, an operand, an address or an intermediate result as the program requires.', 'Has a defined role in the processor, such as tracking the next instruction or buffering a memory transfer.'],
          ['Who chooses the role?', 'An instruction or compiler can choose an available general register for the current task.', 'The architecture assigns a meaning to the register. Instructions may use some special registers explicitly and others implicitly.'],
          ['Example', 'A register called R1 on a processor with a register bank could hold a running total, then later a loop count.', 'The Program Counter holds the next instruction address. A branch changes this address so execution continues elsewhere.'],
        ]),
      ],
    },
    {
      number: '4.1.4', title: 'Seven special-purpose registers',
      materials: [
        table('Register roles in the 9618 model', ['Register', 'What it holds', 'When it is read or written', 'Purpose'], [
          ['Program Counter (PC)', 'Address of the next instruction to fetch.', 'Read at fetch and advanced. A taken branch writes its target here.', 'Selects the next instruction in the program.'],
          ['Memory Data Register (MDR)', 'An instruction or data word in transit.', 'A memory read fills MDR. Before a memory write, the CPU loads MDR with the word to send.', 'Buffers contents crossing between CPU and memory.'],
          ['Memory Address Register (MAR)', 'Address of the memory location being accessed.', 'Loaded before a memory read or write. Its value is placed on the address bus.', 'Selects the location, for example address 5 when reading an operand.'],
          ['Accumulator (ACC)', 'An operand or intermediate result in this accumulator-based processor.', 'A load writes it. An addition reads its old value and writes the result.', 'Keeps the running value: adding 24 to 18 leaves 42 in ACC.'],
          ['Index Register (IX)', 'An index or offset.', 'A program sets IX. An indexed instruction reads it to calculate the effective address.', 'Accesses an item relative to a base: base 40 plus IX of 2 selects location 42.'],
          ['Current Instruction Register (CIR)', 'The instruction being decoded and executed.', 'Filled from MDR during fetch. The control unit then reads the opcode and operand.', 'Keeps the current instruction available while MDR handles later transfers.'],
          ['Status Register (SR)', 'Condition flags, for example zero, negative, carry and overflow.', 'Relevant operations update flags. Conditional control can read a flag before a branch.', 'Records properties of a result, such as whether it is zero.'],
        ], [syllabus]),
        { type: 'lab', lab: 'registerFlow', config: {}, controls: [], title: 'Follow the values through the registers', body: 'Step along the highlighted path. At each transfer, identify the source, the destination and whether the copied value is an address, an instruction or an operand. Watch where IX and the status flags participate.' },
      ],
    },
    {
      number: '4.1.5', title: 'How processor components and system buses cooperate',
      materials: [
        { type: 'lab', lab: 'busCycle', config: { access: 'read' }, controls: ['access'], title: 'Trace a read and a write', body: 'Select Read and follow one transaction, then select Write. Track the address, control signal and data separately. Notice which direction changes when the processor stores its result.' },
        table('What each component contributes', ['Component', 'Job', 'Example'], [
          ['Arithmetic and Logic Unit (ALU)', 'Performs arithmetic, logic and comparisons.', 'Adds two operands and supplies the result and relevant condition flags.'],
          ['Control Unit (CU)', 'Decodes instructions and coordinates components with control signals.', 'Issues a memory read, then selects the arithmetic operation needed.'],
          ['System clock', 'Provides pulses that synchronise processor operations.', 'Transfers and calculations are timed in clock cycles. Completing an instruction can take several cycles.'],
          ['Immediate access store (IAS)', 'Main memory directly accessible by the CPU. It holds instructions and data.', 'Supplies an operand when the CPU reads the selected location and retains the new value after a write.'],
        ]),
        table('Track one memory transaction', ['Bus', 'Read from memory', 'Write to memory'], [
          ['Address bus', 'CPU → memory. The address selects the location to read.', 'CPU → memory. The address selects the destination.'],
          ['Data bus', 'Memory → CPU. The selected instruction or data word returns to MDR.', 'CPU → memory. The word in MDR travels to the selected location.'],
          ['Control bus', 'The CU asserts READ. Other control lines can carry signals such as a response towards the CPU.', 'The CU asserts WRITE. Control lines identify and coordinate the operation.'],
        ]),
      ],
    },
  ],
  22: [
    {
      number: '4.1.6', title: 'Processor type and number of cores',
      materials: [
        { ...processorType, body: 'A processor with a vector instruction can apply one arithmetic operation to several independent pixels at once. Like the four-hole punch, it saves repetitions when the work fits the operation.' },
        { ...table('How much useful work does an instruction do?', ['Workload', 'One pixel per arithmetic instruction', 'Four pixels per vector arithmetic instruction'], [
          ['Brighten eight independent pixels', '8 arithmetic instructions', '2 vector arithmetic instructions'],
          ['Brighten just one pixel', '1 arithmetic instruction', '1 vector arithmetic instruction with one active lane'],
        ]), body: 'Apply the same adjustment to every requested pixel. In this example, the vector processor can turn unused lanes off. The counts cover the arithmetic. Loading pixels, issuing instructions and storing the results also take time. Processor type affects elapsed time through the instructions available and the time each takes.' },
        { ...cores, body: 'Each proofreader represents a core. Two cores can divide the independent work, but both need the result of the serial preparation. They also spend time communicating and combining their corrections. Those four extra minutes turn a 60-minute finish into a 64-minute finish.' },
        { ...table('Why twice as many cores can deliver less than twice the performance', ['Work for one job', 'One core · time units', 'Two cores · elapsed time units'], [
          ['Prepare the shared correction key', '20', '20'],
          ['Check four independent pages', '80', '80 ÷ 2 = 40'],
          ['Exchange and combine results', '0', '4'],
          ['Total elapsed time', '20 + 80 = 100', '20 + 40 + 4 = 64'],
        ]), body: 'Divide the original time by the new time to find the speedup, 100 ÷ 64 ≈ 1.56×. Both cores need the shared key before they can start checking pages. Communicating their results takes a further four units.' },
      ],
    },
    {
      number: '4.1.7', title: 'Bus width and transfer capacity',
      materials: [
        busWidth,
        { ...table('Count the transfers', ['Block to send', 'Data-bus width', 'Transfers needed'], [
          ['256 bits', '32 bits per transfer', '256 ÷ 32 = 8 transfers'],
          ['256 bits', '64 bits per transfer', '256 ÷ 64 = 4 transfers'],
        ]), body: 'At the same transfer rate, the wider bus finishes sending this block in half the time. A program that mostly calculates with data in registers may spend little of its running time moving blocks.' },
        table('Width can describe two different limits', ['Bus', 'Question it answers', 'Example'], [
          ['Data bus', 'How many bits can cross in one transfer?', 'A 32-bit bus needs three transfers for 65 bits. The last transfer carries the remaining bit.'],
          ['Address bus', 'How many distinct locations can the CPU select?', 'Eight address lines encode 2⁸ = 256 addresses. If each location holds one byte, the addressable capacity is 256 bytes.'],
        ]),
      ],
    },
    {
      number: '4.1.8', title: 'Clock speed and time to finish a task',
      materials: [
        clockSpeed,
        { ...table('Convert cycles to time', ['Clock frequency', 'Time for one cycle', 'Time for a six-cycle task'], [
          ['1 GHz', '1 ns', '6 × 1 ns = 6 ns'],
          ['2 GHz', '0.5 ns', '6 × 0.5 ns = 3 ns'],
        ]), body: 'Clock frequency counts cycles per second. The example assumes the same processor design, the same six cycles of work and no additional stalls. A different processor can need a different number of cycles for that task.' },
      ],
    },
    {
      number: '4.1.9', title: 'Cache memory and the cost of a repeated read',
      materials: [
        cache,
        { ...table('Trace the next four reads', ['Read', 'Already cached?', 'How the CPU gets the value', 'Cached afterwards'], [
          ['1 · A', 'No · miss', 'Read A from main memory and cache a copy.', 'A'],
          ['2 · A', 'Yes · hit', 'Read the cached copy of A.', 'A'],
          ['3 · B', 'No · miss', 'Read B from main memory and cache a copy.', 'A, B'],
          ['4 · A', 'Yes · hit', 'Read the cached copy of A.', 'A, B'],
        ]), body: 'The cache starts empty and can retain both A and B. The sequence is miss, hit, miss, hit. Two of the four reads require a trip to main memory.' },
        text('When does a larger cache help?', 'A larger cache can hold more of the program’s working data and instructions. Reusing a retained item saves a slower main-memory access. When a program reads every item just once and gains no useful neighbouring data from fetched blocks, increasing the cache may give little improvement.'),
      ],
    },
    {
      number: '4.1.10', title: 'USB — Universal Serial Bus',
      materials: [
        usbSockets,
        table('USB development: connection shape and transfer capability', ['Milestone', 'What changed', 'Practical effect'], [
          ['1996 · USB 1.0', 'A common serial peripheral interface offered rates up to 12 Mbit/s.', 'A mouse and a keyboard could use the same connection family.'],
          ['2000 · USB 2.0', 'High-Speed signalling raised the maximum to 480 Mbit/s.', 'Storage devices could move larger blocks more quickly.'],
          ['2008 · USB 3.0', 'SuperSpeed added a 5 Gbit/s mode.', 'A compatible device and cable could exchange data faster.'],
          ['2014 · USB Type-C', 'A compact reversible connector was introduced.', 'The plug fits in either orientation. Its shape alone does not establish a speed or charging level.'],
          ['2019 and 2022 · USB4', 'USB4 introduced links up to 40 Gbit/s. USB4 Version 2.0 added an 80 Gbit/s mode.', 'Check both endpoints and the cable before relying on a particular rate. These figures describe signalling capabilities.'],
        ], [usbHistory, usb4, usb80]),
        table('Choosing a USB connection', ['Feature', 'How it works', 'Consequence'], [
          ['Peripheral data', 'A host communicates with devices such as a keyboard, printer or external drive. A hub can connect several devices.', 'Data can flow in both directions. Devices sharing a link also share its available bandwidth.'],
          ['Hot plugging', 'When a device is attached, the host identifies and configures it while the computer is running.', 'A supported device can be added without restarting. A storage device may still need to finish pending writes before removal.'],
          ['Power and cable choice', 'A port can supply power to suitable peripherals. Higher power and optional display functions depend on the equipment and cable.', 'One connector can serve several purposes. A USB-C cable that charges a device may have limited data capability.'],
        ]),
      ],
    },
    {
      number: '4.1.11', title: 'HDMI — High-Definition Multimedia Interface',
      materials: [
        { ...hdmiSocket, companion: hdmiPlug },
        table('HDMI development', ['Milestone', 'Change', 'Why it matters'], [
          ['2002 · HDMI 1.0', 'Digital video and multichannel audio shared one interface.', 'A source could feed a television picture and sound over one cable.'],
          ['2013 · HDMI 2.0', 'Maximum signalling bandwidth reached 18 Gbit/s.', 'Suitable equipment could support 4K at 60 Hz.'],
          ['2017 · HDMI 2.1', 'Maximum signalling bandwidth reached 48 Gbit/s.', 'Higher-resolution or higher-refresh modes became possible.'],
          ['2025 · HDMI 2.2', 'The specification introduced bandwidth up to 96 Gbit/s.', 'The source, display and cable must all support the chosen mode.'],
        ], [hdmiHistory, hdmi22]),
        table('Choosing HDMI', ['Feature', 'Benefit', 'Limit'], [
          ['Picture and sound', 'A laptop can send a digital presentation and its soundtrack to a display over one cable.', 'Sound is audible only if the receiving equipment can reproduce it and the source selects the appropriate output.'],
          ['Display connection', 'A digital path to a digital display avoids an analogue conversion stage.', 'The maximum resolution and refresh rate depend on both endpoints and the cable.'],
          ['Purpose', 'A standard Type A socket is common on televisions, projectors and computers.', 'A keyboard or ordinary external disk requires a peripheral data connection such as USB.'],
        ]),
      ],
    },
    {
      number: '4.1.12', title: 'VGA — Video Graphics Array',
      materials: [
        vgaSocket,
        table('How the VGA connection evolved', ['Milestone', 'Development', 'What remained'], [
          ['1987 · IBM PS/2', 'IBM introduced its VGA display hardware with the PS/2 family.', 'Analogue colour signals connected the computer to the display.'],
          ['Later PC monitors', 'Display Data Channel support let a computer read information about a compatible monitor through the VGA connector.', 'The red, green and blue picture signals remained analogue.'],
          ['Digital-display era', 'HDMI and other digital interfaces became common. An active converter can connect a digital source to a legacy VGA projector.', 'The VGA segment still carries analogue video. The audio needs a separate route.'],
        ], [ibmPs2, displayData, vgaConverter]),
        table('Choosing VGA', ['Feature', 'Use or advantage', 'Limitation'], [
          ['Analogue video', 'Connect a computer with VGA output directly to an older display with VGA input.', 'Noise, cable length and signal quality can soften the displayed image.'],
          ['Physical connector', 'The 15-position plug is readily identifiable. Many plugs use screws to hold the connection in place.', 'An HDMI-only output needs electronics that convert the digital signal to analogue.'],
          ['Audio', 'A projector may have a separate audio input or speakers may connect to the computer.', 'A VGA cable carries the picture only.'],
        ]),
      ],
    },
    {
      number: '4.1.13', title: 'Choose among USB, HDMI and VGA',
      materials: [
        { ...table('Match the signal to the device', ['Decision', 'USB', 'HDMI', 'VGA'], [
          ['Primary job', 'Connect a host and peripherals for digital data.', 'Send digital video and audio to a compatible display.', 'Send analogue video to a display.'],
          ['Recognise the connector', 'Several shapes, including rectangular Standard-A and reversible Type-C.', 'Standard Type A has a tapered outline and 19 contacts.', '15 positions in three rows within a D-shaped shell.'],
          ['Sound', 'A USB headset can exchange digital audio as device data.', 'Audio can travel with the picture.', 'Use a separate audio connection.'],
          ['Typical classroom choice', 'Mouse, keyboard, printer or removable storage.', 'Laptop to a display with speakers for a film.', 'Older projector that accepts only analogue video.'],
          ['Check before connecting', 'Supported function, cable, power and data rate.', 'Common video mode and adequate cable bandwidth.', 'Analogue output or an active converter in the required direction.'],
        ], [usbPhotoCredit, usbPhotoLicence, hdmiSocketCredit, hdmiLicence, vgaPhotoCredit]),
          socketPhotos: [usbSockets, hdmiSocket, vgaSocket],
        },
        text('A laptop, a keyboard and two projectors', 'Connect the keyboard to USB. For a projector with HDMI and speakers, one HDMI cable carries both the image and the soundtrack. For a VGA-only projector, use a compatible analogue output or an HDMI-to-VGA converter. Connect the classroom speakers separately.'),
      ],
    },
  ],
};
