// Student-facing Section 4 explanations. Binary opcode numbers in the diagrams
// belong to the same illustrative 16-bit machine as the assembler lab.
const text = (title, body, code) => ({ type: 'text', title, body, ...(code ? { code } : {}) });
const table = (title, headers, rows, body, sources) => ({ type: 'table', title, headers, rows, body, sources });
const syllabus = page => ({ label: `Cambridge 9618 syllabus, p. ${page}`, url: `https://www.cambridgeinternational.org/Images/721397-2027-2029-syllabus.pdf#page=${page}` });
const lab = (title, model, config, controls, body) => ({ type: 'lab', title, lab: model, config, controls, body });
const section = (number, title, ...materials) => ({ number, title, materials });

const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const label = (x, y, value, size = 20, anchor = 'middle', colour = '#173944') =>
  `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="system-ui,sans-serif" font-size="${size}" fill="${colour}">${escape(value)}</text>`;
function panel(x, y, width, height, heading, lines, accent = false) {
  const top = y + 31;
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="10" fill="${accent ? '#e3f2eb' : '#f2f5f6'}" stroke="${accent ? '#247461' : '#9cabb0'}" stroke-width="2"/>`
    + label(x + width / 2, top, heading, 21)
    + lines.map((line, i) => label(x + width / 2, top + 31 + i * 25, line, 17)).join('');
}
function arrow(x1, y1, x2, y2) {
  const angle = Math.atan2(y2 - y1, x2 - x1), size = 8;
  const dx = size * Math.cos(angle), dy = size * Math.sin(angle);
  return `<path d="M${x1} ${y1} L${x2} ${y2} M${x2 - dx + dy * .65} ${y2 - dy - dx * .65} L${x2} ${y2} L${x2 - dx - dy * .65} ${y2 - dy + dx * .65}" fill="none" stroke="#27766b" stroke-width="3"/>`;
}
function diagram(title, caption, drawing, height, body) {
  return { type: 'diagram', title, caption, body, svg: `<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${escape(title)}" viewBox="0 0 820 ${height}" style="display:block;max-width:100%;height:auto"><title>${escape(title)}</title><desc>${escape(caption)}</desc>${drawing}</svg>` };
}
function routeDiagram(title, caption, nodes, footer) {
  const gap = 28, width = (790 - gap * (nodes.length - 1)) / nodes.length;
  let drawing = '';
  nodes.forEach(([heading, ...lines], i) => {
    const x = 15 + (width + gap) * i;
    drawing += panel(x, 16, width, 106, heading, lines, i === nodes.length - 1);
    if (i < nodes.length - 1) drawing += arrow(x + width + 2, 70, x + width + gap - 3, 70);
  });
  const lines = [''];
  for (const word of footer.split(' ')) {
    if (lines.at(-1).length + word.length > 75) lines.push('');
    lines[lines.length - 1] = (lines.at(-1) + ' ' + word).trim();
  }
  drawing += lines.map((line, i) => label(410, 158 + i * 24, line, 18)).join('');
  return diagram(title, caption, drawing, 156 + lines.length * 26);
}

const sourcesDiagram = diagram('Where an interrupt begins',
  'The source can be hardware or software. An interrupt handler is selected according to the cause.',
  panel(18, 18, 270, 101, 'Hardware event', ['Key ready · timer expired', 'Storage transfer completed'])
  + panel(18, 147, 270, 101, 'Software request', ['Program requests a service', 'A trap enters the OS'])
  + arrow(291, 68, 425, 117) + arrow(291, 196, 425, 141)
  + panel(431, 74, 365, 112, 'CPU and operating system', ['Identify the cause and priority', 'Dispatch the appropriate handler'], true), 267,
  'An external device may raise a request while another instruction is executing. A program can deliberately invoke an operating-system service. A fault such as division by zero is synchronous with its instruction and may need different recovery.');

const machineDiagram = { ...routeDiagram('Machine code gives the decoder a bit pattern',
  'Instruction and data words occupy addressable memory. The decoder interprets a fetched word using the instruction set of this example CPU.',
  [['Memory word', '00000001 00000100', 'illustrative 16 bits'], ['Decode fields', '00000001 → load', '00000100 → address 4'], ['Execute', 'IAS[4] → ACC', 'ACC receives the data']],
  'Digital circuits distinguish bit patterns; the instruction set assigns each pattern a meaning.'),
  body: 'In 4.1.2, ADD 5 was encoded as 00000010 00000101: an addition opcode followed by address 5. Here LDD 4 uses the same illustrative 8-bit opcode and 8-bit address fields. Changing the opcode selects a different operation; changing the address selects a different memory location. These field widths and opcode values belong to this teaching machine.',
};
const assemblyDiagram = routeDiagram('Why programmers use mnemonics and labels',
  'A mnemonic names an operation and a label names a location. Both are easier to read and revise than binary fields. The assembler looks up the operation’s machine encoding; it does not encode the letters L, D and D as character data.',
  [['Operation', 'LDD', 'load from memory'], ['Named operand', 'PRICE', 'label for a location'], ['Assembly source', 'LDD PRICE', 'read the named value']],
  'Moving PRICE changes its assigned address; the source can keep the same label.');
const relationshipDiagram = { ...routeDiagram('One real assembly instruction becomes one machine instruction',
  'On this teaching machine the assembler resolves PRICE to address 4. The CPU executes the emitted word; labels and comments occupy no instruction slot of their own.',
  [['Assembly', 'LDD PRICE', 'symbolic source'], ['Assembler', 'PRICE → 4', 'LDD → 00000001'], ['Machine word', '00000001 00000100', 'opcode + address']],
  'The opcode numbers and field widths illustrate this machine; Cambridge specifies the mnemonic meanings.'),
  body: 'The target instruction set determines which operations and operand forms the assembler accepts and how it encodes them. The accumulator and register-based teaching CPUs in 4.1.6 express the same calculation differently. Their different source instructions require their own target encodings; a shared word such as ADD does not establish machine-code compatibility. The CPU fetches, decodes and executes the emitted instruction as in 4.1.14.',
};

const addressingDiagrams = [
  routeDiagram('Immediate addressing · take the value',
    'LDM #18 copies the number 18 into ACC. After the instruction has been fetched, no additional data-memory read supplies the operand.',
    [['Instruction', 'LDM #18', '# marks denary literal'], ['Value', '18', 'part of the instruction'], ['Accumulator', 'ACC = 18']],
    'The operand itself supplies the value.'),
  routeDiagram('Direct addressing · read one location',
    'LDD 300 reads data at address 300. Address 300 and its stored value 18 have different roles.',
    [['Instruction', 'LDD 300', 'operand = address'], ['Memory[300]', 'contents = 18', 'one data read'], ['Accumulator', 'ACC = 18']],
    'Effective address = 300.'),
  routeDiagram('Indirect addressing · follow the pointer',
    'LDI 310 reads a pointer at 310 and then follows it to address 300, which contains 18. There are two operand-related reads.',
    [['Instruction', 'LDI 310'], ['Memory[310]', '300 · pointer'], ['Memory[300]', '18 · data'], ['Accumulator', 'ACC = 18']],
    'The first read supplies the address for the second read.'),
  routeDiagram('Indexed addressing · add the offset',
    'LDX 298 uses IX = 2. Adding the base and index gives address 300, so the value at 300 enters ACC.',
    [['Instruction', 'LDX 298', 'IX = 2'], ['Effective address', '298 + 2 = 300'], ['Memory[300]', 'contents = 18'], ['Accumulator', 'ACC = 18']],
    'Updating IX selects a different element while keeping the base constant.'),
  routeDiagram('Relative addressing · locate a nearby instruction',
    'The operand is a signed displacement. In this example the stated reference instruction is at 100, so a displacement of +3 selects 103. Moving the reference to 200 moves the target to 203.',
    [['Reference', 'Original: 100', 'Relocated: 200'], ['Displacement', '+3 locations', '+3 locations'], ['Target', '100 + 3 = 103', '200 + 3 = 203']],
    'Use the reference specified in the question. The syllabus table gives no separate relative-branch opcode.'),
];

export const instructionLessons = {
  23: [
    section('4.1.14', 'Fetch, decode and execute an instruction',
      lab('Follow a complete program through the CPU', 'fetch', { pair: 0, operation: 'ADD' }, ['pair', 'operation'],
        'Begin at PC = 0. Instructions occupy locations 0–3. The starting data you select occupy 4 and 5 (18 and 24 by default). Watch which address is selected and what reaches MDR during the instruction fetch, operand read and result write. The diagram shows all seven registers. IX stays at 0 because this program uses direct addressing.'),
      table('Cambridge register transfer notation · fetch', ['Official notation', 'Meaning in this machine'], [
        ['MAR ← [PC]', 'Copy the address in PC into MAR.'],
        ['PC ← [PC] + 1', 'Advance PC to the next instruction. Each instruction here occupies one location.'],
        ['MDR ← [[MAR]]', 'If MAR holds 1 and memory address 1 holds ADD 5, MDR receives the instruction ADD 5.'],
        ['CIR ← [MDR]', 'Copy the fetched instruction from MDR into CIR.'],
      ], 'Cambridge 9618/13, May/June 2025, Q2(a)(ii), mark scheme p. 5. Read the arrow from right to left. Single brackets give register contents; the nested brackets in [[MAR]] add a memory lookup.', [{ label: 'Official mark scheme · 9618/13 Q2(a)(ii), p. 5', url: 'https://pastpapers.papacambridge.com/directories/CAIE/CAIE-pastpapers/upload/9618_s25_ms_13.pdf#page=5' }, syllabus(19)]),
      lab('An indexed load brings IX into the data path', 'registerFlow', {}, [], 'Follow LDX 4 with IX = 2. The effective address is 6, so MDR and then ACC receive 42. The following CMP #42 sets the equality condition in SR.'),
      { ...routeDiagram('Decode and execute ADD 5',
        'The address bus carries 5, the control bus carries READ and the data bus carries 24 back to MDR. The clock synchronises these transfers. An instruction can take several clock cycles.',
        [['Decode', 'CIR holds ADD 5', 'CU selects addition'], ['Read the operand', 'Select address 5', 'Memory[5] → MDR: 24'], ['Calculate', 'ACC holds 18', 'ALU adds 18 + 24']],
        'ACC now holds 42. Memory[6] changes only when the CPU executes STO 6.'),
        body: 'Recall the fields in 4.1.2: CIR holds the encoded instruction 00000010 00000101, displayed here as ADD 5. During decode, the CU interprets opcode 00000010 as addition using a direct memory operand, and 00000101 as address 5. During execution, it reads the data 24 from that address and adds it to the implicit operand in ACC, 18. The instruction’s address field contains 5, not 24; decoding the address is separate from reading its contents.',
      },
      table('Track the working values', ['Completed instruction', 'Next PC', 'ACC', 'Memory[6]'], [
        ['LDD 4', '1', '18', '0'], ['ADD 5', '2', '42', '0'], ['STO 6', '3', '42', '42'], ['END', 'Control returns to the OS', '42', '42'],
      ], 'This trace starts with PC = 0 and ACC = 0. Memory[4] holds 18, Memory[5] holds 24 and Memory[6] starts at 0.')),
  ],
  24: [
    section('4.1.15', 'Identify hardware and software interrupt sources', sourcesDiagram),
    section('4.1.16', 'Apply interrupts to devices and multitasking',
      lab('A USB keyboard is connected', 'application', { event: 'keyboard' }, [], 'Follow the port-change notification from the host controller through device discovery to usable input.'),
      lab('A storage transfer completes', 'application', { event: 'io' }, [], 'While data moves, the CPU can run another task. The completion event lets the waiting task become ready.'),
      lab('A timer gives another task its turn', 'application', { event: 'timer' }, [], 'See when a timer request leads the operating system to save task A and schedule task B.')),
    section('4.1.17', 'Handle an interrupt at an instruction boundary',
      lab('An interrupt arrives during ADD 5', 'interrupt', { arrival: 'during', event: 'keyboard' }, ['arrival', 'event'], 'Watch the request become pending before the addition finishes. Then follow the saved PC, ACC and zero flag through the interrupt service routine (ISR) and back to STO 6.'),
      table('Recognise the request, service it and return', ['Moment', 'State and decision'], [
        ['Request arrives during the instruction', 'The CPU is executing ADD 5 at address 1. ACC holds 18 and memory address 5 holds 24. Keyboard data becomes ready while the addition is in progress.'],
        ['Boundary before the next fetch', 'ADD has finished. ACC now holds 42 and PC points to STO 6 at address 2. Check the pending request, enabled state and priority. A request that cannot yet be accepted remains pending.'],
        ['Service begins', 'Save the interrupted context on the stack. Identify the source and load the appropriate ISR address into PC.'],
        ['Service ends', 'Acknowledge the event, restore the saved registers and flags, and resume at the next instruction. In the example PC = 2 and ACC = 42.'],
      ], 'Cambridge 9618/11, May/June 2022, Q6(a)(ii) accepts the boundary at the end of the current fetch-execute cycle or the start of the next.', [{ label: 'Official mark scheme · 9618/11 Q6(a)(ii), p. 8', url: 'https://www.cambridgeinternational.org/Images/673620-june-2022-mark-scheme-paper-11.pdf#page=8' }])),
  ],
  25: [
    section('4.2.1', 'Machine code, assembly language and their relationship',
      machineDiagram, assemblyDiagram, relationshipDiagram),
    section('4.2.2', 'Assemble a source program in two passes',
      lab('From source statement to object code', 'assemblyStages', {}, [], 'Watch a source statement pass through label resolution and opcode translation. The resulting object word can be loaded and executed by the target processor.'),
      lab('Walk both passes of an addition program', 'assembler', { origin: 0, pair: 0 }, ['origin', 'pair'], 'Pass 1 visits each source line and records label addresses. Pass 2 reads the lines again, resolves operands and emits words. Change the origin to 10 to see FIRST move from 4 to 14.'),
      { ...table('Read the two label forms', ['Source', 'What is labelled', 'Effect on the output'], [
        ['START: LDD FIRST', 'An instruction location', 'Encode LDD with the resolved address of FIRST.'],
        ['FIRST: 18', 'A data location', 'Place the value 18 in this word. The symbol table records its address.'],
      ], 'The four instructions at addresses 0–3 are LDD FIRST, ADD SECOND, STO TOTAL and END. FIRST appears as an operand before its declaration. Find FIRST in the completed symbol table to see why the second pass emits LDD 4, even though the data value is 18.'),
        companion: table('Completed pass 1 symbol table at origin 0', ['Label', 'Address', 'Source declaration at that address'], [
          ['START', '0', 'START: LDD FIRST'], ['FIRST', '4', 'FIRST: 18'], ['SECOND', '5', 'SECOND: 24'], ['TOTAL', '6', 'TOTAL: 0'],
        ]),
      }),
  ],
  26: [
    section('4.2.3', 'Read the Cambridge example instruction set',
      table('Mnemonic, operand form and effect', ['Official group', 'Mnemonic and operands', 'Concrete example', 'Operation'], [
        ['Data movement', 'LDM #n', 'LDM #18', 'Load immediate denary n into ACC.'],
        ['Data movement', 'LDD <address>', 'LDD 300', 'Read the word at the address into ACC.'],
        ['Data movement', 'LDI <address>', 'LDI 310', 'Read a pointer at the address, then read its target into ACC.'],
        ['Data movement', 'LDX <address>', 'LDX 298', 'Read the word at address + contents of IX into ACC.'],
        ['Data movement', 'LDR #n', 'LDR #2', 'Load the immediate denary value n into IX.'],
        ['Data movement', 'MOV <register>', 'MOV IX', 'Copy ACC into the named register (IX in this model).'],
        ['Data movement', 'STO <address>', 'STO 320', 'Store ACC at the address.'],
        ['Input and output of data', 'IN / OUT', 'IN · OUT', 'IN reads one character’s ASCII value into ACC. OUT displays the character encoded in ACC. Neither has an operand.'],
        ['Arithmetic operations', 'ADD / SUB <address>', 'ADD 330 · SUB 331', 'Add or subtract the value read from the given address; keep the result in ACC.'],
        ['Arithmetic operations', 'ADD / SUB #n, Bn or &n', 'ADD #2 · ADD B00000010 · ADD &02 · SUB #2 · SUB B00000010 · SUB &02', 'Add or subtract an immediate denary, binary or hexadecimal number.'],
        ['Arithmetic operations', 'INC / DEC <register>', 'INC ACC · INC IX · DEC ACC · DEC IX', 'Increase or decrease ACC or IX by one.'],
        ['Unconditional and conditional instructions', 'JMP <address>', 'JMP START', 'Continue at the given absolute or symbolic address.'],
        ['Unconditional and conditional instructions', 'JPE / JPN <address>', 'JPE SAME · JPN AGAIN', 'After a comparison, JPE branches on true and JPN on false.'],
        ['Compare instructions', 'CMP <address> / CMP #n', 'CMP 300 · CMP #18', 'Compare ACC with a stored value or an immediate denary value.'],
        ['Compare instructions', 'CMI <address>', 'CMI 310', 'Dereference the pointer at the given address and compare the target value with ACC.'],
        ['Program termination', 'END', 'END', 'Return control to the operating system.'],
      ], 'Cambridge International AS & A Level Computer Science 9618, 2027–2029 syllabus, pp. 20–21. In these questions ACC is the single general-purpose working register. # denotes denary, B binary, and & hexadecimal. The instruction set is an example for the course. In 4.1.2, the addition program selected only a few supported instructions. This table expands that selection into instruction families and allowed operand forms; it is a reference, not a program to execute from top to bottom. Use this accumulator-based instruction set for the following traces, rather than the separate register-based comparison model in 4.1.6. Section 4.2.4 explains how each addressing mode obtains the data or target.', [syllabus(21)])),
    section('4.2.4', 'Follow five addressing modes', ...addressingDiagrams,
      lab('Trace a compare, a branch and an output', 'trace', { program: 'branch', input: 'A' }, ['input'],
        'Read A and compare its ASCII value, 65, through the pointer at 340. Identify the next PC after JPN. Repeat with B and compare the two output characters.'),
      { ...table('Completed branch trace with input A', ['Address and executed instruction', 'ACC after', 'Compare', 'Next PC', 'Output so far'], [
        ['180 · IN', '65', '—', '181', '—'], ['181 · CMI 340', '65', 'True', '182', '—'],
        ['182 · JPN 186', '65', 'True', '183', '—'], ['183 · ADD #1', '66', 'True', '184', '—'],
        ['184 · CMP #66', '66', 'True', '185', '—'], ['185 · JPE 187', '66', 'True', '187', '—'],
        ['187 · OUT', '66', 'True', '188', 'B'], ['188 · END', '66', 'True', 'Return to OS', 'B'],
      ], 'The completed table shows input A. In the live program listing, find the instruction at 186 that A skips. Memory[340] contains 341 and Memory[341] contains 65. Switch the animation to B and step through JPN: it selects 186, where LDM #63 loads the character code for a question mark.'),
        companion: lab('Run the listed program with either input', 'trace', { program: 'branch', input: 'A' }, ['input'], 'On the B path, follow the live trace from address 182 to 186 and compare the character printed by OUT with the completed A trace.'),
      }),
  ],
  27: [
    section('4.3.1', 'Move bits with logical shifts',
      lab('Shift an unsigned byte', 'bits', { family: 'logical', value: 52, operation: 'LSL', amount: 1 }, ['operation', 'value', 'amount'], 'Read an eight-bit word from bit 7 at the left to bit 0 at the right. Follow the zero entering the empty position and the bit discarded at the far end.'),
      table('Use the two syllabus shift instructions', ['Instruction', 'Starting ACC', 'Result', 'What happened'], [
        ['LSL #1', '00110100 (52)', '01101000 (104)', 'Zeros enter on the right.'],
        ['LSR #2', '01101000 (104)', '00011010 (26)', 'Two zeros enter on the left.'],
        ['LSR #1', '00000101 (5)', '00000010 (2)', 'The outgoing 1 is discarded.'],
      ], 'The first two rows form a sequence. Logical left shift doubles an unsigned value when the result fits; logical right shift divides by two and discards the remainder.')),
    section('4.3.2', 'Compare arithmetic shifts and cyclic shifts',
      lab('Track the sign bit and the wrapped bit', 'bits', { family: 'shifts', value: 150, operation: 'ASR', amount: 1 }, ['value', 'operation', 'amount'], 'Interpret signed values using eight-bit two’s complement. Try right shifts on 10010110 and 10010111 to identify when the outgoing bit and sign bit differ.'),
      { ...table('Six rules with one input per experiment', ['Operation by one', 'Original', 'Result', 'Rule'], [
        ['Logical left', '10010110', '00101100', 'Discard the left bit and insert zero on the right.'],
        ['Logical right', '10010110', '01001011', 'Discard the right bit and insert zero on the left.'],
        ['Arithmetic left', '01000000 (+64)', '10000000', 'The signed product +128 exceeds the representable range −128…127.'],
        ['Arithmetic right', '10010111 (−105)', '11001011 (−53)', 'Copy the sign bit into the left position; −105/2 rounds down.'],
        ['Cyclic left', '10010110', '00101101', 'Wrap the departing left bit to the right end.'],
        ['Cyclic right', '10010110', '01001011', 'Wrap the departing right bit to the left end.'],
      ], 'Each row starts from the original byte in that row. Use the simulator to repeat the six one-position shifts. The 9618 sample instruction set uses LSL #n and LSR #n as assembly mnemonics.'),
        companion: lab('Repeat a row and check its result', 'bits', { family: 'shifts', value: 64, operation: 'ASL', amount: 1 }, ['value', 'operation', 'amount'], 'Start with the arithmetic-left row. Reveal the eight-bit result and inspect the signed overflow, then choose a different original byte and operation from the table.'),
      }),
    section('4.3.3', 'Choose a bit mask and calculate the result',
      lab('Apply AND, OR or XOR to selected positions', 'bits', { family: 'masks', value: 166, operation: 'AND', mask: 15 }, ['value', 'operation', 'mask'], 'Align the mask with ACC. With original 10100110 and mask 00001111, compare the low four bits for each operation. Each new choice starts with the original byte.'),
      table('Choose operands and preserve unrelated bits', ['Goal', 'Operation', 'Example'], [
        ['Test bit 4', 'AND B00010000', 'The isolated result is nonzero exactly when that bit was set.'],
        ['Set bit 2', 'OR B00000100', 'A 1 in the mask sets the target; mask zeros preserve other bits.'],
        ['Clear bit 2', 'AND B11111011', 'A 0 clears the target; mask ones preserve other bits.'],
        ['Toggle bit 2', 'XOR B00000100', 'The chosen bit changes state; mask zeros preserve the rest.'],
      ], 'For AND, OR and XOR the syllabus gives immediate #n, Bn, &n and direct <address> forms. AND #15 uses a mask of 15; AND 15 reads its mask from memory address 15.', [syllabus(22)])),
    section('4.3.4', 'Monitor and control a device register',
      lab('Test the ready bit before enabling the motor', 'deviceControl', { ready: 'yes' }, ['ready'], 'In this interface at address 900, bit 4 indicates ready, bit 2 enables the motor and bit 0 carries an independent status. Compare ready and busy paths, following ACC separately from the device register.'),
      text('Trace the instruction that writes back', 'The AND test discards the other flags in ACC. The ready path reloads the whole register, sets only bit 2 and writes the byte back. The busy path jumps to DONE before any store.',
        'LDD 900\nAND B00010000\nCMP #0\nJPE DONE\nLDD 900\nOR B00000100\nSTO 900\nDONE: END')),
  ],
};
