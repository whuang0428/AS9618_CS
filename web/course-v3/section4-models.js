/* Section 4 teaching models. Pure transitions; no timers, network or device timing claims. */
const section4Models = (() => {
  'use strict';
  const copy = value => JSON.parse(JSON.stringify(value));
  const integer = (value, min, max) => {
    const n = Number(value);
    if (!Number.isInteger(n) || n < min || n > max) throw new RangeError(`Expected an integer from ${min} to ${max}.`);
    return n;
  };
  const choose = (value, choices) => {
    if (!choices.includes(value)) throw new RangeError(`Choose one of: ${choices.join(', ')}.`);
    return value;
  };
  const byte = value => integer(value, 0, 255);
  const binary = (value, width = 8) => value.toString(2).padStart(width, '0');
  const signed = value => byte(value) > 127 ? value - 256 : value;
  const pairs = [[18, 24], [7, 9], [8, 8], [18, 7]];
  const kinds = ['memory', 'cpu', 'fetch', 'interrupt', 'assembler', 'addressing', 'trace', 'bits', 'performance', 'ports', 'registerFlow', 'busCycle', 'application', 'assemblyStages', 'deviceControl'];
  const defaults = {
    registerFlow: {}, busCycle: { access: 'read' }, application: { event: 'keyboard' }, assemblyStages: {}, deviceControl: { ready: 'yes' },
    memory: { address: 4, access: 'read', showInstructions: true }, cpu: { pair: 0, showRegisters: true }, fetch: { pair: 0, operation: 'ADD' },
    interrupt: { event: 'keyboard', arrival: 'manual' }, assembler: { origin: 0, pair: 0 }, addressing: { mode: 'direct', variant: 0 },
    trace: { program: 'sum', count: 2, input: 'A' }, bits: { family: 'all', value: 150, operation: 'LSR', amount: 1, mask: 15 },
    performance: { cores: 1, parallel: 75, clock: 1, width: 32, cache: 0 }, ports: { task: 'display', choice: 'HDMI' },
  };
  function createLab(type) {
    choose(type, kinds);
    return { type, config: copy(defaults[type]), step: 0, requested: false, requestAt: null, revealed: false };
  }
  function programMemory(config = {}) {
    const [a, b] = pairs[config.pair ?? 0], operation = config.operation ?? 'ADD';
    return { 0: 'LDD 4', 1: `${operation} 5`, 2: 'STO 6', 3: 'END', 4: a, 5: b, 6: 0 };
  }
  function fetchFrames(config) {
    const memory = programMemory(config), frames = [];
    const s = { pc: 0, mar: null, mdr: null, cir: '—', acc: 0, ix: 0, flags: { zero: false }, memory, current: null, active: [], bus: '', address: null, boundary: true, halted: false };
    const save = (title, message, active = [], bus = '', address = null, links = [], notation = null) => {
      frames.push(copy({ ...s, title, message, active, bus, address, links, notation }));
    };
    save('Ready: predict the result', 'Instructions occupy addresses 0–3. Data occupy addresses 4–6. PC=0 selects the first instruction; ACC starts at 0.');
    for (let address = 0; address < 4; address += 1) {
      const instruction = memory[address], [op, textOperand] = instruction.split(' '), operand = Number(textOperand);
      s.current = address; s.boundary = false; s.mar = s.pc;
      save('Fetch 1 · select the instruction address', `MAR ← [PC]. Copy address ${s.pc} into MAR. This is an address, not the instruction stored there.`, ['PC', 'MAR'], 'Address: CPU → memory', s.mar, ['pcMar', 'marAddress'], 0);
      s.pc += 1;
      save('Fetch 2 · advance the program counter', `PC ← [PC] + 1. The next address is ${s.pc}. MAR still holds address ${s.mar} for this fetch.`, ['PC', 'CLOCK'], '', null, ['clockCu', 'incPC'], 1);
      s.mdr = memory[s.mar];
      save('Fetch 3 · read the instruction', `MDR ← [[MAR]]. The CU sends READ on the control bus. The word at ${s.mar}, ${s.mdr}, travels from IAS to MDR on the data bus.`, ['MDR', 'CU'], 'READ; data: memory → CPU', s.mar, ['cuControl', 'dataMdr'], 2);
      s.cir = s.mdr;
      save('Fetch 4 · retain the current instruction', `CIR ← [MDR]. CIR holds ${s.cir} for decoding. MDR can now buffer the operand.`, ['CIR', 'MDR'], '', null, ['mdrCir'], 3);
      save('Decode · identify the operation', `The CU decodes ${op}${op === 'END' ? ': return control to the operating system.' : ` and its address operand ${operand}. The operand is not the value stored at that address.`}`, ['CU', 'CIR'], '', null, ['cirCu']);
      if (op === 'LDD' || op === 'ADD' || op === 'SUB') {
        s.mar = operand;
        save('Execute 1 · select the data address', `MAR ← ${operand}. Keep instruction address ${address} separate from data address ${operand}.`, ['CIR', 'MAR'], 'Address: CPU → memory', operand, ['cirMar', 'marAddress']);
        s.mdr = memory[operand];
        save('Execute 2 · read the operand', `MDR ← Memory[${operand}] = ${s.mdr}. Another READ brings the data value into MDR; CIR still contains ${s.cir}.`, ['MDR', 'CU'], 'READ; data: memory → CPU', operand, ['cuControl', 'dataMdr']);
        const before = s.acc;
        s.acc = op === 'LDD' ? s.mdr : op === 'ADD' ? s.acc + s.mdr : s.acc - s.mdr;
        if (op !== 'LDD') s.flags.zero = s.acc === 0;
        save(op === 'LDD' ? 'Execute 3 · copy into ACC' : 'Execute 3 · calculate in the ALU', op === 'LDD' ? `ACC ← [MDR] = ${s.acc}. Reading and copying leave Memory[${operand}] unchanged.` : `ACC ← ${before} ${op === 'ADD' ? '+' : '−'} ${s.mdr} = ${s.acc}. The ALU calculates; ACC retains the result.`, op === 'LDD' ? ['MDR', 'ACC'] : ['ALU', 'MDR', 'ACC', 'SR'], '', null, op === 'LDD' ? ['mdrAcc'] : ['accAlu', 'mdrAlu', 'aluAcc', 'aluSr']);
      } else if (op === 'STO') {
        s.mar = operand;
        save('Execute 1 · select the destination', `MAR ← ${operand}. This address selects where the answer will be stored.`, ['CIR', 'MAR'], 'Address: CPU → memory', operand, ['cirMar', 'marAddress']);
        s.mdr = s.acc;
        save('Execute 2 · prepare the value', `MDR ← [ACC] = ${s.acc}. ACC keeps its value; copying does not consume the source.`, ['ACC', 'MDR'], '', null, ['accMdr']);
        s.memory[operand] = s.mdr;
        save('Execute 3 · write the answer', `Memory[${operand}] ← [MDR] = ${s.mdr}. The CU issues WRITE; data travel from CPU to memory.`, ['CU', 'MDR'], 'WRITE; data: CPU → memory', operand, ['cuControl', 'mdrData']);
      } else {
        s.halted = true;
        save('Execute · END', `END returns control to the operating system. This program stops with Memory[6]=${s.memory[6]}. It does not execute the following data.`, ['CU']);
      }
      s.boundary = true;
      save(s.halted ? 'Program complete' : 'Instruction complete · interrupt checkpoint', s.halted ? `The stored answer is ${s.memory[6]}. Compare it with the original data at 4 and 5, then change the experiment conditions.` : `Instruction ${address} is complete. This model checks for an accepted interrupt at this boundary before fetching the next instruction at PC=${s.pc}.`);
    }
    return frames;
  }
  // Each frame snapshots both the source and the destination of the transfer.
  function registerFlowFrames() {
    const state = { pc: 0, mar: null, mdr: null, cir: '—', acc: 0, ix: 2, flags: { zero: false },
      memory: { 0: 'LDX 4', 1: 'CMP #42', 4: 5, 5: 8, 6: 42 }, address: null };
    const frames = [];
    function transfer(title, message, route, active, update = {}, bus = '', links = [], notation = null) {
      Object.assign(state, update);
      frames.push(copy({ ...state, title, message, route, active, bus, links, notation }));
    }
    transfer('Locate the next instruction', 'PC holds 0. IX already contains the offset 2. Follow the source and destination of each transfer.', 'PC holds address 0', ['PC']);
    transfer('Copy the address', 'Transfer the contents of PC to MAR. MAR selects location 0.', 'PC → MAR', ['PC', 'MAR'], { mar: 0, address: 0 }, 'Address: CPU → memory', ['pcMar', 'marAddress'], 0);
    transfer('Advance PC', 'PC advances to 1 while MAR retains address 0.', 'PC → increment → PC', ['PC', 'CLOCK'], { pc: 1 }, '', ['clockCu', 'incPC'], 1);
    transfer('Fetch the instruction', 'The word LDX 4 returns from IAS to MDR on the data bus.', 'IAS[0] → MDR', ['MDR', 'CU'], { mdr: 'LDX 4' }, 'READ; data: memory → CPU', ['cuControl', 'dataMdr'], 2);
    transfer('Decode the word', 'Copy the instruction into CIR. The CU identifies an indexed load and reads its base address 4.', 'MDR → CIR → CU', ['MDR', 'CIR', 'CU'], { cir: 'LDX 4' }, '', ['mdrCir', 'cirCu'], 3);
    transfer('Use the index', 'The base 4 plus IX = 2 selects address 6. The register IX retains its offset.', 'CIR operand + IX → MAR', ['IX', 'ALU', 'MAR'], { mar: 6, address: 6 }, 'Address: CPU → memory', ['ixAlu', 'cirAlu', 'aluMar', 'marAddress']);
    transfer('Read the selected word', 'IAS supplies 42 on the data bus. CIR continues to hold the instruction.', 'IAS[6] → MDR', ['MDR'], { mdr: 42 }, 'READ; data: memory → CPU', ['dataMdr', 'cuControl']);
    transfer('Copy the result into ACC', 'MDR transfers 42 into ACC. LDX has completed; IX remains 2.', 'MDR → ACC', ['MDR', 'ACC'], { acc: 42 }, '', ['mdrAcc']);
    transfer('Observe the following compare', 'After fetching the next instruction, CMP #42 compares ACC with 42. The equality condition is recorded in the status register (shown here by the zero flag). ACC retains 42.', 'ACC → ALU → status register', ['ACC', 'ALU', 'SR'], { pc: 2, mar: 1, mdr: 'CMP #42', cir: 'CMP #42', address: null, flags: { zero: true } }, '', ['accAlu', 'aluSr']);
    return frames;
  }

  function busCycleFrames(config) {
    const write = config.access === 'write';
    const memory = { 5: 24, 6: 0 };
    const state = { pc: 2, mar: null, mdr: null, acc: write ? 42 : 18, ix: 0, cir: write ? 'STO 6' : 'ADD 5', flags: { zero: false }, memory, address: null };
    const frames = [];
    function stage(title, message, route, active, bus, values = {}, links = []) {
      Object.assign(state, values);
      frames.push(copy({ ...state, title, message, route, active, bus, links }));
    }
    stage('Clock and CU', 'A timing signal synchronises the CU. The instruction is already in CIR; each teaching step identifies a transfer, rather than an elapsed clock cycle.',
      'System clock → CU', ['CLOCK', 'CU'], '', {}, ['clockCu']);
    const address = write ? 6 : 5;
    stage('Select the memory location', `The CU places ${address} in MAR. The address bus carries the location number from the processor to IAS.`, `MAR → IAS address ${address}`, ['CU', 'MAR'], 'Address: CPU → memory', { mar: address, address }, ['cirMar', 'marAddress']);
    if (write) {
      stage('Buffer the value', 'ACC supplies 42 to MDR. The destination still holds zero.', 'ACC → MDR', ['ACC', 'MDR'], '', { mdr: 42 }, ['accMdr']);
      stage('Assert WRITE', 'The CU signals a write on the control bus. The address identifies the destination; MDR holds the data.', 'CU → IAS: WRITE', ['CU'], 'WRITE', {}, ['cuControl']);
      memory[address] = state.mdr;
      stage('Store the word', 'The data bus carries 42 from MDR to IAS. Location 6 now contains 42.', 'MDR → IAS[6]', ['MDR'], 'WRITE; data: CPU → memory', {}, ['mdrData']);
    } else {
      stage('Assert READ', 'The CU signals a read on the control bus. The memory interface responds to the selected address.', 'CU → IAS: READ', ['CU'], 'READ', {}, ['cuControl']);
      stage('Receive the operand', 'Location 5 supplies 24 on the data bus. MDR buffers the returned value.', 'IAS[5] → MDR', ['MDR'], 'READ; data: memory → CPU', { mdr: memory[address] }, ['dataMdr']);
      stage('Complete ADD', 'The ALU adds ACC = 18 and MDR = 24. The result 42 enters ACC; IAS[5] still holds 24.', 'ACC + MDR → ALU → ACC', ['ACC', 'MDR', 'ALU'], '', { acc: state.acc + state.mdr }, ['accAlu', 'mdrAlu', 'aluAcc']);
    }
    return frames;
  }

  const applications = {
    keyboard: {
      labels: ['USB host', 'CPU / interrupt', 'Driver / OS', 'Application'],
      frames: [
        ['Attach a keyboard', 'A USB hub detects the change at its port and reports it to the host controller.', 'Port connected'],
        ['Finish the active instruction', 'The controller signals the system. The CPU checks the pending hardware request at an instruction boundary.', 'Change pending'],
        ['Service the controller', 'The handler acknowledges the event and schedules device discovery. The USB stack reads the descriptors and configures a compatible keyboard driver.', 'Driver configured'],
        ['Receive input', 'Subsequent key reports reach an input buffer. An application can receive the character while the processor continues its other work.', 'Input available'],
      ],
    },
    timer: {
      labels: ['Hardware timer', 'CPU / interrupt', 'OS scheduler', 'Task B'],
      frames: [
        ['Run task A', 'Task A uses its current time slice. A hardware timer counts toward expiry.', 'Task A running'],
        ['Timer expires', 'Timer hardware raises a request. The processor finishes its current instruction.', 'Timer pending'],
        ['Save task A', 'The interrupt handler acknowledges the timer and invokes the scheduling decision. Task A’s resumable context is saved.', 'Context A saved'],
        ['Run task B', 'If the scheduler selects B, it restores B’s context. A can resume from its own saved PC on a later time slice.', 'Task B running'],
      ],
    },
    io: {
      labels: ['Storage device', 'Controller', 'Interrupt handler', 'Waiting task'],
      frames: [
        ['Start an I/O request', 'A task requests a block read. While the device works, the CPU can run another task.', 'Read in progress'],
        ['Signal completion', 'The controller records the transfer result and issues an interrupt when the block is ready.', 'Block available'],
        ['Read the completion status', 'At an instruction boundary the request is accepted. The handler reads the device status and acknowledges completion.', 'Status checked'],
        ['Wake the waiting task', 'The OS marks the task ready. Once scheduled, the task uses the completed buffer.', 'Buffer ready'],
      ],
    },
  };
  function applicationFrames(config) {
    const { labels, frames } = applications[config.event];
    return frames.map(([title, message, signal], stage) => ({ title, message, signal, labels, stage }));
  }
  function assemblyStagesFrames() {
    const labels = ['Source text', 'Symbol table', 'Opcode + address', 'Object program'];
    return [
      ['Read source statements', 'LDD PRICE contains the mnemonic LDD and a symbolic operand. PRICE is declared later at address 4.', 'LDD PRICE'],
      ['Assign label addresses', 'Walk the program using a location counter. Record PRICE = 4, so a forward reference can be resolved.', 'PRICE → 4'],
      ['Translate and resolve', 'Look up the mnemonic in the model instruction table and substitute address 4 for PRICE.', 'LDD 4'],
      ['Emit a machine word', 'This illustrative machine represents LDD by 00000001. Joining it to address 00000100 produces a word the example processor can decode.', '00000001 00000100'],
    ].map(([title, message, signal], stage) => ({ labels, title, message, signal, stage }));
  }
  function deviceControlFrames(config) {
    const original = config.ready === 'yes' ? 17 : 1;
    let acc = original, device = original;
    const frames = [];
    function record(title, message, instruction, mask = null, written = false) {
      frames.push({ title, message, instruction, original, device, acc, mask, written });
    }
    record('Read the interface byte', 'Bit 4 reports readiness; bit 2 enables the motor. Bit 0 already holds other information.', 'LDD 900');
    acc &= 16;
    record('Test the ready bit', 'AND isolates bit 4 in ACC. The physical interface has not been written.', 'AND B00010000', 16);
    record('Compare and branch', acc ? 'The result is 16, so the comparison with zero is false. Continue to the update.' : 'The result is zero. Jump to DONE and leave the device untouched.', 'CMP #0 · JPE DONE');
    if (acc) {
      acc = device; record('Read the full byte again', 'Reload the interface to recover unrelated bits before modifying the control bit.', 'LDD 900');
      acc |= 4; record('Set the motor bit', 'OR sets bit 2; every other original bit is preserved.', 'OR B00000100', 4);
      device = acc; record('Write back', 'STO copies the updated byte to the device register. Bit 0 remains set.', 'STO 900', null, true);
    }
    record('Return control', config.ready === 'yes' ? 'The motor has been enabled. Other bits retain their original values.' : 'The not-ready path executed no store.', 'END');
    return frames;
  }
  function memoryFrames(config) {
    const memory = programMemory(), address = config.access === 'write' ? 6 : config.address;
    const base = { memory, address, mar: null, mdr: null, acc: 42, active: [], bus: '' };
    const frames = [copy({ ...base, title: 'An address selects a location', message: config.access === 'read' ? `Predict what a READ of address ${address} will return. An address and its contents are different items.` : 'The earlier calculation has produced the working value 42. Predict which memory location will change when it is stored at address 6.' })];
    base.mar = address;
    frames.push(copy({ ...base, active: ['MAR'], bus: 'Address: CPU → memory', title: 'Select the address', message: `Selected address=${address}. The address bus selects location ${address}; it does not transfer that location’s contents.` }));
    base.mdr = config.access === 'read' ? memory[address] : base.acc;
    frames.push(copy({ ...base, active: ['MDR'], bus: config.access === 'read' ? 'READ; data: memory → CPU' : 'Prepare the stored value', title: config.access === 'read' ? 'Read the contents' : 'Prepare the value to store', message: config.access === 'read' ? `The copied value is ${base.mdr}. Address ${address} still holds the same contents.` : 'The transfer value is 42. Memory[6] has not changed yet; a WRITE signal is still needed.' }));
    if (config.access === 'write') memory[address] = base.mdr;
    frames.push(copy({ ...base, bus: config.access === 'write' ? 'WRITE; data: CPU → memory' : '', title: 'Transaction complete', message: config.access === 'read' ? `READ copied ${base.mdr} out of location ${address}. ${config.showInstructions ? 'Instructions and data are both stored in this one memory.' : 'The original value is still stored at the same address.'}` : 'WRITE changes only Memory[6] to 42. The working value and source values at addresses 4 and 5 remain unchanged.' }));
    return frames;
  }
  function cpuFrames(config) {
    const [a, b] = pairs[config.pair], memory = programMemory(config);
    const stages = [
      ['A shared task', 'Which part will add the values, and which part will coordinate the work?', [], 0, '—', 0],
      ['Registers retain working values', `After LDD 4, ACC retains ${a}. PC=1 identifies the next instruction. Small, fast registers are inside the CPU.`, ['ACC', 'PC'], a, 'LDD 4', 1],
      ['The CU coordinates', 'The control unit decodes ADD 5 and arranges a memory read. CIR holds the current instruction; the CU is not doing the addition.', ['CU', 'CIR', 'MAR'], a, 'ADD 5', 2],
      ['IAS supplies the operand', `The immediate access store returns ${b} from address 5. MDR buffers the transferred value; memory does not calculate the answer.`, ['MDR'], a, 'ADD 5', 2],
      ['The ALU calculates', `${a} + ${b} = ${a + b}. The arithmetic and logic unit adds; ACC retains the result.`, ['ALU', 'ACC'], a + b, 'ADD 5', 2],
      ['The clock synchronises', 'Clock pulses coordinate timed operations. These teaching steps are not individual measured clock cycles; one instruction can require several cycles.', ['CLOCK'], a + b, 'ADD 5', 2],
    ];
    return stages.map(([title, message, active, acc, cir, pc], i) => ({ title, message, active, acc, cir, pc, mar: i >= 2 ? 5 : null, mdr: i >= 3 ? b : null, ix: 0, flags: { zero: false }, memory: copy(memory), address: i >= 2 ? 5 : null, current: i >= 2 ? 1 : null, bus: i === 3 ? 'READ; data: memory → CPU' : '' })).map((frame, i) => {
      if (config.showRegisters) return frame;
      const plain = {
        1: `After LDD 4, the accumulator (ACC) retains ${a}. It is a small, fast storage location inside the CPU.`,
        2: 'The control unit decodes ADD 5 and arranges a read of the value at address 5. Coordination is a different job from performing the addition.',
        3: `The immediate access store supplies ${b} from address 5. The operand is transferred into the processor; memory does not calculate the answer.`,
      };
      return { ...frame, message: plain[i] ?? frame.message };
    });
  }
  function interruptFrames(config, requested, requestAt = 0) {
    const s = { pc: 1, acc: 18, flags: { zero: false }, memory: programMemory(), current: 1, saved: null, active: [], pending: requested, boundary: false, accepted: false };
    const frames = [];
    const add = (title, message, active = []) => { s.pending = requested && frames.length >= requestAt && !s.accepted; frames.push(copy({ ...s, title, message, active })); };
    add('Main program is about to add', config.arrival === 'during'
      ? 'ACC=18. The next instruction is ADD 5. Step forward to see the scheduled request arrive during execution.'
      : 'ACC=18. The next instruction is ADD 5. Use the request button before the checkpoint to interrupt the program.');
    s.pc = 2; add('Fetch and decode ADD 5', 'ADD 5 has been fetched. PC=2 points to the instruction to resume later. An interrupt request may be pending, but it is not accepted midway through this instruction.', ['PC', 'CU']);
    add('Read the operand', 'Memory[5]=24 is available. The addition has not yet completed, so the main program must continue this instruction.', ['MDR']);
    s.acc = 42; s.flags.zero = false; s.boundary = true;
    add('Finish the current instruction', 'ACC becomes 42. The instruction is now complete. Predict which values must be saved if the pending interrupt is accepted.', ['ALU', 'ACC']);
    if (requested) {
      s.saved = { pc: s.pc, acc: s.acc, flags: copy(s.flags) }; s.accepted = true; s.pending = false;
      add('Checkpoint · save the main-program context', `An enabled ${config.event} request is accepted. Save PC=2, ACC=42 and the status flags before the interrupt service routine changes them.`, ['PC', 'ACC', 'SR']);
      s.pc = 200; s.current = 200;
      add('Transfer control to the ISR', 'Load the start address of the interrupt service routine (ISR) into PC. The main program is suspended; its saved context remains available.', ['PC', 'CU']);
      s.acc = 0; s.flags.zero = true; s.pc = 201;
      add('Service and acknowledge the event', 'The example ISR handles and acknowledges the device event. Its work changes ACC to 0 and the zero flag to 1. These must not become the resumed main-program values.', ['ACC', 'SR']);
      s.pc = s.saved.pc; s.acc = s.saved.acc; s.flags = copy(s.saved.flags); s.saved = null; s.current = 2;
      add('Restore the saved context', 'Restore PC=2, ACC=42 and the original zero flag (0). Resume at STO 6. Restore all saved state, not just the return address.', ['PC', 'ACC', 'SR']);
    } else add('Checkpoint · no interrupt request', 'There is no pending request. The processor continues the main program with PC=2 and ACC=42.');
    s.memory[6] = s.acc; s.pc = 3; s.current = 2;
    add('Resume the main calculation', requested ? 'STO 6 stores ACC=42. Servicing an interrupt has not changed the result of the main calculation.' : 'STO 6 stores ACC=42. With no pending interrupt, the main program continues directly.', ['ACC']);
    s.current = 3; s.pc = 4;
    add('Program complete', 'END returns control to the operating system. Memory[6]=42. Restart and compare the execution with and without a request.');
    return frames;
  }
  function assemblerFrames(config) {
    const origin = config.origin, [a, b] = pairs[config.pair];
    const source = [ ['START', 'LDD', 'FIRST'], ['', 'ADD', 'SECOND'], ['', 'STO', 'TOTAL'], ['', 'END', ''], ['FIRST', 'DATA', a], ['SECOND', 'DATA', b], ['TOTAL', 'DATA', 0] ];
    const symbols = {}, output = [], frames = [];
    const add = (pass, row, title, message) => frames.push(copy({ source, origin, symbols, output, pass, row, title, message }));
    add(0, -1, 'Predict a forward reference', 'The first line uses FIRST before its declaration. Which address belongs to FIRST? Pass 1 must establish label addresses before pass 2 resolves every use.');
    source.forEach(([label], i) => {
      if (label) symbols[label] = origin + i;
      add(1, i, `Pass 1 · assign address ${origin + i}`, label ? `Record ${label} → ${origin + i} in the symbol table. ${i < 4 ? 'Instruction mnemonics are not yet emitted as machine words.' : 'A data declaration also occupies one location.'}` : `Advance the location counter to ${origin + i}. This line has no label to add. The assembler continues collecting definitions.`);
    });
    source.forEach(([, op, operand], i) => {
      const opcode = { END: 255, LDD: 1, ADD: 2, STO: 3 }[op];
      const value = op === 'DATA' ? operand : op === 'END' ? 0 : symbols[operand];
      const word = op === 'DATA' ? binary(value, 16) : binary(opcode, 8) + binary(value, 8);
      output.push({ address: origin + i, word, resolved: op === 'DATA' ? String(value) : `${op}${op === 'END' ? '' : ` ${value}`}` });
      add(2, i, `Pass 2 · emit location ${origin + i}`, op === 'DATA' ? `Represent declared value ${value} as a 16-bit data word.` : op === 'END' ? 'Translate END to its illustrative opcode; the unused operand field is zero.' : `Look up ${operand}=${value}. Translate ${op} to opcode ${binary(opcode, 8)} and combine it with the 8-bit address ${binary(value, 8)}.`);
    });
    return frames;
  }
  function addressingFrames(config) {
    const memory = { 298: 7, 299: 9, 300: 18, 301: 24, 302: 42, 310: 300, 311: 301, 312: 302 }, mode = config.mode, variant = config.variant;
    const s = { mode, memory, operand: null, ix: 0, pc: 101, acc: null, pointer: null, effective: null, address: null, active: [] }, frames = [];
    const add = (title, message) => frames.push(copy({ ...s, title, message }));
    if (mode === 'immediate') s.operand = [18, 24, 42][variant];
    if (mode === 'direct') s.operand = [300, 301, 302][variant];
    if (mode === 'indirect') s.operand = [310, 311, 312][variant];
    if (mode === 'indexed') { s.operand = 298; s.ix = [2, 3, 4][variant]; }
    if (mode === 'relative') s.operand = [-4, 0, 3][variant];
    add('Read the operand carefully', mode === 'relative' ? `The stated PC base is 101, already advanced past fetch. The signed displacement is ${s.operand}. Predict the branch target.` : `The mode is ${mode}. The operand is ${s.operand}${mode === 'indexed' ? ` and IX=${s.ix}` : ''}. Predict the value eventually loaded into ACC.`);
    if (mode === 'immediate') {
      add('The operand is already the value', `#${s.operand} supplies the value ${s.operand} directly. There is no data-memory address to resolve.`);
      add('No data-memory read', 'The instruction was fetched from memory earlier. Immediate addressing does not require another memory read to obtain this operand.');
      s.acc = s.operand; s.active = ['ACC']; add('Load the immediate value', `ACC ← ${s.operand}. It does not mean Memory[${s.operand}].`);
    } else if (mode === 'relative') {
      add('Use the stated PC base', `Start at 101 and add signed displacement ${s.operand}. The base convention must be given; do not silently increment it again.`);
      s.effective = s.pc + s.operand; add('Calculate the target address', `Target = 101 ${s.operand < 0 ? '−' : '+'} ${Math.abs(s.operand)} = ${s.effective}. This is an address, not a loaded data value.`);
      s.pc = s.effective; s.active = ['PC']; add('Choose the next instruction address', `For this conceptual relative branch, PC becomes ${s.pc}. ACC is unchanged. The syllabus example instruction set gives no separate relative-jump mnemonic.`);
    } else {
      if (mode === 'indirect') { s.address = s.operand; s.pointer = memory[s.operand]; add('First read · obtain an address', `Memory[${s.operand}]=${s.pointer}. Treat ${s.pointer} as another address, not as the final value for ACC.`); s.effective = s.pointer; }
      if (mode === 'direct') { s.effective = s.operand; add('Use the operand as the address', `The effective address is ${s.effective}. Direct addressing needs no extra address lookup.`); }
      if (mode === 'indexed') { s.effective = s.operand + s.ix; add('Add the index to the base', `Effective address = ${s.operand} + IX (${s.ix}) = ${s.effective}. This address calculation does not yet load ACC.`); }
      s.address = s.effective; add('Read the selected data location', `Memory[${s.effective}]=${memory[s.effective]}. ${mode === 'indirect' ? 'This is the second data-memory read: first a pointer, now its target.' : 'Read the contents at the effective address.'}`);
      s.acc = memory[s.effective]; s.active = ['ACC']; add('Load the value into ACC', `ACC ← ${s.acc}. The effective address remains ${s.effective}; the loaded contents are ${s.acc}.`);
    }
    return frames;
  }
  function traceFrames(config) {
    const isLoop = config.program === 'loop', isCharacter = config.program === 'character', isBranch = config.program === 'branch';
    const origin = isLoop ? 20 : isBranch ? 180 : 0;
    const source = isLoop ? [`LDM #${config.count}`, 'DEC ACC', 'CMP #0', 'JPN 21', 'LDD 90', 'OUT', 'END']
      : isCharacter ? ['IN', 'ADD #1', 'OUT', 'END']
      : isBranch ? ['IN', 'CMI 340', 'JPN 186', 'ADD #1', 'CMP #66', 'JPE 187', 'LDM #63', 'OUT', 'END']
      : ['LDD 4', 'ADD 5', 'STO 6', 'END'];
    const memory = isLoop ? { 90: 67 } : isBranch ? { 340: 341, 341: 65 } : isCharacter ? {} : programMemory();
    const s = { source, origin, memory, pc: origin, acc: 0, ix: 0, comparison: null, input: config.input, output: '', rows: [], current: null, halted: false }, frames = [];
    const add = (title, message) => frames.push(copy({ ...s, title, message }));
    add('Predict before stepping', isLoop ? 'Follow the executed address. JPN means jump when the comparison is False, not jump when ACC is negative.' : isBranch ? `Input is ${config.input}. Memory[340] points to address 341, which contains 65 (A). Predict whether the program will accept the input and output B, or reject it and output ?.` : isCharacter ? `Input is ${config.input}. Predict the character output after adding 1 to its ASCII value.` : 'Predict the final value at address 6, then record only the fields each executed instruction changes.');
    for (let guard = 0; guard < 40 && !s.halted; guard += 1) {
      const address = s.pc, instruction = source[address - origin], [op, arg] = instruction.split(' '); s.current = address; s.pc += 1;
      let message = '', emitted = '';
      const operand = arg?.startsWith('#') ? Number(arg.slice(1)) : s.memory[arg];
      if (op === 'LDD') { s.acc = s.memory[arg]; message = `Read Memory[${arg}]=${s.acc} into ACC.`; }
      if (op === 'ADD') { const before = s.acc; s.acc += operand; message = `${before} + ${arg.startsWith('#') ? `immediate ${operand}` : `Memory[${arg}] (${operand})`} = ${s.acc}.`; }
      if (op === 'STO') { s.memory[arg] = s.acc; message = `Copy ACC=${s.acc} to Memory[${arg}]. ACC remains unchanged.`; }
      if (op === 'LDM') { s.acc = Number(arg.slice(1)); message = `Load immediate value ${s.acc}.`; }
      if (op === 'DEC') { s.acc -= 1; message = `Decrease ACC by 1; ACC is now ${s.acc}.`; }
      if (op === 'IN') { s.acc = config.input.charCodeAt(0); message = `Read character ${config.input}; its ASCII code ${s.acc} becomes ACC.`; }
      if (op === 'CMP' || op === 'CMI') { const target = op === 'CMI' ? s.memory[s.memory[arg]] : operand; s.comparison = s.acc === target; message = `${op === 'CMI' ? `Resolve Memory[${arg}]=${s.memory[arg]}, then Memory[${s.memory[arg]}]=${target}. ` : ''}Compare ACC=${s.acc} with ${target}: ${s.comparison ? 'True (equal)' : 'False (not equal)'}. ACC does not change.`; }
      if (op === 'JPN' || op === 'JPE') { const take = op === 'JPN' ? !s.comparison : s.comparison; if (take) s.pc = Number(arg); message = `Comparison is ${s.comparison ? 'True' : 'False'}. ${take ? `Take ${op}: next PC=${s.pc}.` : `Do not take ${op}; continue at address ${s.pc}.`} Record the executed branch even when it is not taken.`; }
      if (op === 'OUT') { emitted = String.fromCharCode(s.acc); s.output += emitted; message = `Output the character with ASCII code ${s.acc}: ${emitted}. It does not print the digits ${s.acc}.`; }
      if (op === 'END') { s.halted = true; message = 'END returns control to the operating system. There is no next instruction executed by this program.'; }
      s.rows.push({ address, instruction, acc: s.acc, ix: s.ix, pc: s.halted ? 'END' : s.pc, comparison: s.comparison, output: emitted, stored: s.memory[6] });
      add(`${address}: ${instruction}`, message);
    }
    return frames;
  }
  const bitOperations = ['LSL', 'LSR', 'ASL', 'ASR', 'ROL', 'ROR', 'AND', 'OR', 'XOR'];
  const bitFamilies = { all: bitOperations, logical: ['LSL', 'LSR'], shifts: bitOperations.slice(0, 6), masks: ['AND', 'OR', 'XOR'] };
  function bitResult(value, operation, amount = 1, mask = 15) {
    value = byte(value); choose(operation, bitOperations); amount = integer(amount, 0, 8); mask = byte(mask);
    let result = value, overflow = false, outgoing = '', inserted = '';
    const original = binary(value), signedBefore = signed(value);
    if (operation === 'AND') result = value & mask;
    if (operation === 'OR') result = value | mask;
    if (operation === 'XOR') result = value ^ mask;
    if (operation === 'LSL' || operation === 'ASL') { result = (value << amount) & 255; outgoing = original.slice(0, amount); inserted = '0'.repeat(amount); }
    if (operation === 'LSR') { result = value >>> amount; outgoing = amount ? original.slice(-amount) : ''; inserted = '0'.repeat(amount); }
    if (operation === 'ASR') { result = (signedBefore >> amount) & 255; outgoing = amount ? original.slice(-amount) : ''; inserted = original[0].repeat(amount); }
    if (operation === 'ROL' || operation === 'ROR') { const n = amount % 8; result = operation === 'ROL' ? ((value << n) | (value >>> (8 - n))) & 255 : ((value >>> n) | (value << (8 - n))) & 255; outgoing = amount ? operation === 'ROL' ? original.slice(0, amount) : original.slice(-amount) : ''; inserted = outgoing; }
    if (operation === 'ASL') overflow = signedBefore * 2 ** amount < -128 || signedBefore * 2 ** amount > 127;
    return { value, operation, amount, mask, result, bits: binary(result), signedBefore, signedAfter: signed(result), overflow, outgoing, inserted };
  }
  function bitsFrames(config) {
    const r = bitResult(config.value, config.operation, config.amount, config.mask), maskMode = ['AND', 'OR', 'XOR'].includes(config.operation);
    const rule = { LSL: 'Move bits left; insert 0 at the right and discard outgoing bits.', LSR: 'Move bits right; insert 0 at the left and discard outgoing bits.', ASL: 'Move bits left and insert 0 at the right. Check whether the signed result still fits in 8 bits.', ASR: 'Move bits right; copy the original sign bit into vacated left positions.', ROL: 'Move bits left; wrap each outgoing left bit into the right end.', ROR: 'Move bits right; wrap each outgoing right bit into the left end.', AND: 'AND keeps a bit only when both corresponding input bits are 1. A 0 mask bit clears that position.', OR: 'OR sets a bit when either corresponding input bit is 1. A 0 mask bit preserves the original.', XOR: 'XOR produces 1 when the corresponding bits differ. A 1 mask bit toggles the original.' }[config.operation];
    return [
      { ...r, visible: false, title: 'Predict the 8-bit result', message: `Start from ${binary(config.value)}: unsigned ${config.value}, or signed two’s complement ${signed(config.value)}. ${maskMode ? `Use mask ${binary(config.mask)}.` : `Shift ${config.amount} position${config.amount === 1 ? '' : 's'}.`} Every experiment starts from this original byte.` },
      { ...r, visible: false, title: 'Apply the rule to each bit', message: rule },
      { ...r, visible: true, title: 'Reveal and explain the result', message: `${binary(config.value)} ${config.operation} ${maskMode ? binary(config.mask) : config.amount} = ${r.bits}. Unsigned=${r.result}; signed=${r.signedAfter}. ${r.overflow ? 'Signed overflow: the mathematical product does not fit in −128…127.' : config.operation === 'ASR' ? 'A negative odd signed value rounds towards negative infinity.' : config.operation === 'AND' ? 'A bit test is successful when its masked result is non-zero; it need not equal 1.' : ''}` },
    ];
  }
  function performanceResult(config) {
    const cores = integer(config.cores, 1, 4), parallel = integer(config.parallel, 0, 100), clock = integer(config.clock, 1, 2), width = choose(Number(config.width), [16, 32, 64]), cache = integer(config.cache, 0, 100);
    const serialWork = 100 - parallel, parallelWork = parallel / cores;
    const compute = (serialWork + parallelWork) / clock;
    const transfers = Math.ceil(256 / width), reads = 8, hits = reads * cache / 100;
    const memoryWait = hits * 1 + (reads - hits) * 5;
    return { compute, transfers, memoryWait, total: compute + transfers + memoryWait, serialWork, parallelWork, hits, misses: reads - hits };
  }
  function performanceFrames(config) {
    const result = performanceResult(config);
    return [
      { ...result, visible: false, title: 'Predict which limit changes', message: 'This abstract workload has 100 compute units, one 256-bit transfer and 8 memory reads. Choose how much compute work is independent, then change one condition.' },
      { ...result, visible: true, title: 'Compare the parts of the model', message: `Compute: (${result.serialWork} serial + ${config.parallel} parallel ÷ ${config.cores} core${config.cores === 1 ? '' : 's'}) ÷ ${config.clock} clock factor = ${result.compute.toFixed(2)} units. Transfer count: 256 ÷ ${config.width} = ${result.transfers}. Read wait: ${result.hits} cache hits × 1 + ${result.misses} misses × 5 = ${result.memoryWait} units. Total = ${result.total.toFixed(2)} abstract units.` },
    ];
  }
  const portTasks = {
    display: { question: 'Send digital picture and sound from the laptop to a compatible classroom screen.', answer: 'HDMI', reason: 'HDMI carries digital video and audio. This is the connection used to show this lesson on a compatible classroom screen.' },
    keyboard: { question: 'Connect a compatible keyboard and supply its power through the same connection.', answer: 'USB', reason: 'USB carries serial digital peripheral data and can supply power. Capabilities depend on the devices, version and cable.' },
    legacy: { question: 'Send analogue video to a legacy projector with only a VGA input; handle audio separately.', answer: 'VGA', reason: 'VGA carries analogue video. It does not carry the presentation audio; that requires a separate path.' },
  };
  function portsFrames(config) {
    const task = portTasks[config.task], correct = task.answer === config.choice;
    return [
      { ...task, visible: false, correct: null, title: 'Choose a compatible connection', message: task.question },
      { ...task, visible: true, correct, title: correct ? 'Connection fits the requirement' : 'Compare the required signals', message: `${correct ? 'Yes.' : `${config.choice} does not meet this specified requirement.`} ${task.reason} A matching connector shape alone does not prove signal compatibility.` },
    ];
  }
  const builders = { registerFlow: registerFlowFrames, busCycle: busCycleFrames, application: applicationFrames, assemblyStages: assemblyStagesFrames, deviceControl: deviceControlFrames, memory: memoryFrames, cpu: cpuFrames, fetch: fetchFrames, interrupt: interruptFrames, assembler: assemblerFrames, addressing: addressingFrames, trace: traceFrames, bits: bitsFrames, performance: performanceFrames, ports: portsFrames };
  function frames(state) {
    const automatic = state.type === 'interrupt' && state.config.arrival === 'during';
    return builders[state.type](state.config, automatic || state.requested, automatic ? 1 : state.requestAt ?? 0);
  }
  function view(state) {
    const list = frames(state), index = Math.min(state.step, list.length - 1);
    const frame = list[index];
    if (state.type === 'interrupt' && state.requested && index >= state.requestAt && index < 4) frame.message += ' A request is now pending; finish the current instruction before accepting it.';
    const changes = [];
    if (index > 0 && ['fetch', 'registerFlow', 'busCycle'].includes(state.type)) {
      const previous = list[index - 1];
      const record = (name, from, to) => { if (from !== to) changes.push({ name, from: from ?? '—', to: to ?? '—' }); };
      for (const key of ['pc', 'mar', 'mdr', 'cir', 'acc', 'ix']) record(key.toUpperCase(), previous[key], frame[key]);
      record('SR · Z', Number(previous.flags.zero), Number(frame.flags.zero));
      for (const address of Object.keys(frame.memory)) record(`IAS[${address}]`, previous.memory[address], frame.memory[address]);
    }
    return { ...frame, changes, step: index, total: list.length - 1, complete: index === list.length - 1, config: copy(state.config), requested: state.requested, type: state.type };
  }
  function labAction(state, action, value) {
    if (!state || !kinds.includes(state.type)) throw new Error('A known lab state is required.');
    if (action === 'reset') return { ...createLab(state.type), config: copy(state.config) };
    const next = copy(state);
    if (action === 'step') next.step = Math.min(next.step + 1, frames(next).length - 1);
    else if (action === 'back') next.step = Math.max(0, next.step - 1);
    else if (action === 'request') { if (next.type === 'interrupt' && next.step < 4 && !next.requested) { next.requested = true; next.requestAt = next.step; } }
    else if (Object.hasOwn(next.config, action)) {
      const options = { arrival: ['manual', 'during'], access: ['read', 'write'], family: Object.keys(bitFamilies), operation: next.type === 'bits' ? bitFamilies[next.config.family] : ['ADD', 'SUB'], event: next.type === 'application' ? Object.keys(applications) : ['keyboard', 'timer'], ready: ['yes', 'no'], mode: ['immediate', 'direct', 'indirect', 'indexed', 'relative'], program: ['sum', 'loop', 'character', 'branch'], input: ['A', 'B'], task: Object.keys(portTasks), choice: ['USB', 'HDMI', 'VGA'] };
      if (action === 'family') {
        next.config.family = choose(value, Object.keys(bitFamilies));
        if (!bitFamilies[value].includes(next.config.operation)) next.config.operation = bitFamilies[value][0];
      }
      else if (action === 'showRegisters') next.config[action] = choose(value, [true, false]);
      else if (action === 'showInstructions') { next.config[action] = choose(value, [true, false]); if (!value && next.config.address < 4) next.config.address = 4; }
      else if (options[action]) next.config[action] = choose(value, options[action]);
      else if (action === 'origin') next.config[action] = choose(Number(value), [0, 10, 20]);
      else if (action === 'width') next.config[action] = choose(Number(value), [16, 32, 64]);
      else if (action === 'cache') next.config[action] = choose(Number(value), [0, 50, 100]);
      else if (action === 'parallel') next.config[action] = choose(Number(value), [0, 50, 75, 100]);
      else {
        const ranges = { pair: [0, 3], address: [0, 6], variant: [0, 2], count: [1, 4], value: [0, 255], mask: [0, 255], amount: [0, 8], cores: [1, 4], clock: [1, 2] };
        if (!ranges[action]) throw new Error('Unknown setting.');
        next.config[action] = integer(value, ...ranges[action]);
      }
      next.step = 0; next.requested = false; next.requestAt = null;
    } else throw new Error(`Unknown action: ${action}`);
    return next;
  }
  return { kinds, pairs, defaults: copy(defaults), binary, signed, bitOperations, bitFamilies, bitResult, performanceResult, programMemory, portTasks, createLab, labAction, view, frames };
})();
if (typeof window !== 'undefined') window.Section4Models = section4Models;
if (typeof module !== 'undefined' && module.exports) module.exports = section4Models;
