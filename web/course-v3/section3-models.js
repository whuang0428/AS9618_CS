/* Deterministic, immutable teaching models. Time units are conceptual, not device timings. */
const section3Models = (() => {
  const integer = (value, min, max) => {
    const number = Number(value);
    if (!Number.isInteger(number) || number < min || number > max) throw new RangeError(`Expected an integer from ${min} to ${max}.`);
    return number;
  };
  const bit = value => integer(value, 0, 1);
  const word = value => {
    if (!/^[01]{4}$/.test(value)) throw new Error('Use a four-bit word.');
    return value;
  };
  function createDisk() {
    return { track: 1, sector: 0, targetTrack: 3, targetSector: 5, mode: 'read', writeWord: '1010', phase: 'ready', rotations: 0, result: null,
      data: Array.from({ length: 4 }, (_, t) => Array.from({ length: 8 }, (_, s) => ((t * 8 + s) % 16).toString(2).padStart(4, '0'))) };
  }
  function diskAction(state = createDisk(), action, value) {
    if (action === 'reset') return createDisk();
    const next = { ...state, data: state.data.map(row => [...row]) };
    if (action === 'track') next.targetTrack = integer(value, 0, 3);
    if (action === 'sector') next.targetSector = integer(value, 0, 7);
    if (action === 'mode') {
      if (!['read', 'write'].includes(value)) throw new Error('Unknown disk operation.');
      next.mode = value;
    }
    if (action === 'word') next.writeWord = word(value);
    if (['track', 'sector', 'mode', 'word'].includes(action)) {
      next.phase = 'ready'; next.rotations = 0; next.result = null;
    }
    if (action === 'step') {
      if (next.phase === 'ready') {
        next.track = next.targetTrack; next.phase = 'located';
      } else if (next.phase === 'located' || next.phase === 'rotating') {
        if (next.sector !== next.targetSector) {
          next.sector = (next.sector + 1) % 8; next.rotations += 1;
        }
        next.phase = next.sector === next.targetSector ? 'aligned' : 'rotating';
      } else if (next.phase === 'aligned') {
        if (next.mode === 'write') next.data[next.track][next.sector] = next.writeWord;
        next.result = next.data[next.track][next.sector]; next.phase = 'complete';
      }
    }
    return next;
  }
  function createBuffer() {
    return { capacity: 8, source: Array.from({ length: 24 }, (_, i) => i + 1), queue: [], delivered: [], senderRate: 4, receiverRate: 2,
      tick: 0, sent: 0, received: 0, blocked: 0 };
  }
  function bufferAction(state = createBuffer(), action, value) {
    if (action === 'reset') return createBuffer();
    const next = { ...state, source: [...state.source], queue: [...state.queue], delivered: [...state.delivered] };
    if (action === 'sender') next.senderRate = integer(value, 0, 6);
    if (action === 'receiver') next.receiverRate = integer(value, 0, 6);
    if (action === 'step') {
      const removed = next.queue.splice(0, next.receiverRate);
      next.delivered.push(...removed);
      const attempted = Math.min(next.senderRate, next.source.length);
      const accepted = Math.min(attempted, next.capacity - next.queue.length);
      next.queue.push(...next.source.splice(0, accepted));
      next.tick += 1; next.sent = accepted; next.received = removed.length; next.blocked = attempted - accepted;
    }
    return next;
  }
  function createMemory() {
    return { power: true, ram: '1010', rom: 'BOOT', saved: '0011', sram: '1010', dram: '1010', charge: 3, refresh: true, tick: 0,
      message: 'Working RAM contains 1010. The saved copy contains 0011.' };
  }
  function memoryAction(state = createMemory(), action, value) {
    if (action === 'reset') return createMemory();
    const next = { ...state };
    if (action === 'power') {
      next.power = !next.power;
      if (!next.power) { next.ram = null; next.sram = null; next.dram = null; next.charge = 0; }
      next.message = next.power ? 'Power returns. RAM data is not restored automatically; load the saved copy.' : 'Power is off. Both types of RAM lose their data. ROM and secondary storage retain theirs.';
    }
    if (action === 'refresh') { next.refresh = !next.refresh; next.message = next.refresh ? 'Automatic DRAM refresh is enabled. It cannot recover data already lost.' : 'Automatic DRAM refresh is disabled. Advance time while power stays on.'; }
    if (action === 'write' && next.power) {
      next.ram = word(value); next.sram = next.ram; next.dram = next.ram; next.charge = 3;
      next.message = `Wrote ${next.ram} to working RAM and both RAM cells. The saved copy is unchanged.`;
    }
    if (action === 'save' && next.power && next.ram !== null) { next.saved = next.ram; next.message = `Copied ${next.ram} from working RAM to secondary storage.`; }
    if (action === 'load' && next.power) {
      next.ram = next.saved; next.sram = next.saved; next.dram = next.saved; next.charge = 3;
      next.message = `Loaded saved data ${next.saved} into working RAM and both RAM cells.`;
    }
    if (action === 'step' && next.power) {
      next.tick += 1;
      if (next.dram !== null) {
        next.charge = next.refresh ? 3 : Math.max(0, next.charge - 1);
        if (next.charge === 0) next.dram = null;
      }
      next.message = next.dram === null ? `DRAM contains no reliable data. Refresh cannot reconstruct lost data.${next.sram !== null ? ' SRAM still holds its data while powered.' : ' Write or load data to initialise both RAM cells.'}`
        : next.refresh ? 'DRAM is refreshed before its charge leaks away. SRAM holds its state without refresh.' : 'DRAM charge is leaking away. SRAM holds its state without refresh.';
    }
    return next;
  }
  function createControl() {
    return { mode: 'control', temperature: 18, target: 21, sampled: null, demand: null, heater: false, phase: 0, cycle: 0,
      message: 'Predict whether a heater should be on at 18 °C when the target is 21 °C.' };
  }
  function controlAction(state = createControl(), action, value) {
    if (action === 'reset') return createControl();
    const next = { ...state };
    if (action === 'mode') {
      if (!['monitor', 'control'].includes(value)) throw new Error('Unknown system mode.');
      next.mode = value; next.heater = false;
    }
    if (action === 'temperature') next.temperature = integer(value, 10, 35);
    if (action === 'target') next.target = integer(value, 16, 26);
    if (['mode', 'temperature', 'target'].includes(action)) {
      next.phase = 0; next.sampled = null; next.demand = null;
      next.message = `Conditions changed. Take a new sensor reading before making a decision.${next.mode === 'control' ? ` The heater retains its last output (${next.heater ? 'ON' : 'OFF'}) until the next actuate step.` : ' Monitoring does not operate the heater.'}`;
    }
    if (action === 'step') {
      next.phase = next.phase % 4 + 1;
      if (next.phase === 1) {
        next.sampled = next.temperature; next.demand = null;
        next.message = `The sensor measures ${next.sampled} °C. The processor receives a digital reading after conversion by an ADC.`;
      }
      if (next.phase === 2) {
        next.demand = next.sampled < next.target;
        next.message = next.mode === 'control' ? `${next.sampled} < ${next.target} is ${next.demand ? 'true' : 'false'}. The processor requests the heater ${next.demand ? 'ON' : 'OFF'}.`
          : `The processor compares ${next.sampled} °C with ${next.target} °C and displays ${next.demand ? 'below target' : 'at or above target'}.`;
      }
      if (next.phase === 3) {
        next.heater = next.mode === 'control' && next.demand;
        next.message = next.mode === 'control' ? `The control output switches the heater ${next.heater ? 'ON' : 'OFF'}. This affects the room.` : 'The monitoring system displays the reading. It does not operate a heater.';
      }
      if (next.phase === 4) {
        const change = next.heater ? 2 : Math.sign(15 - next.temperature);
        next.temperature = Math.max(10, Math.min(35, next.temperature + change)); next.cycle += 1;
        next.message = `Room temperature is now ${next.temperature} °C. The previous reading remains ${next.sampled} °C until the sensor measures again.${next.mode === 'control' ? ' The new reading provides feedback.' : ''}`;
      }
    }
    return next;
  }
  const gateNames = ['NOT', 'AND', 'OR', 'NAND', 'NOR', 'XOR'];
  function gateOutput(gate, a, b = 0) {
    a = bit(a); b = bit(b);
    if (gate === 'NOT') return 1 - a;
    if (gate === 'AND') return a && b;
    if (gate === 'OR') return a || b;
    if (gate === 'NAND') return 1 - (a && b);
    if (gate === 'NOR') return 1 - (a || b);
    if (gate === 'XOR') return a === b ? 0 : 1;
    throw new Error(`Unknown gate: ${gate}`);
  }
  function gateRows(gate) {
    if (!gateNames.includes(gate)) throw new Error(`Unknown gate: ${gate}`);
    return Array.from({ length: gate === 'NOT' ? 2 : 4 }, (_, i) => {
      const a = gate === 'NOT' ? i : i >> 1, b = i & 1;
      return gate === 'NOT' ? [a, gateOutput(gate, a)] : [a, b, gateOutput(gate, a, b)];
    });
  }
  function circuitOutput(a, b, c) {
    a = bit(a); b = bit(b); c = bit(c);
    const either = gateOutput('OR', a, b), safe = gateOutput('NOT', c);
    return { a, b, c, either, safe, q: gateOutput('AND', either, safe) };
  }
  function circuitRows() {
    return Array.from({ length: 8 }, (_, n) => {
      const row = circuitOutput(n >> 2, (n >> 1) & 1, n & 1);
      return [row.a, row.b, row.c, row.either, row.safe, row.q];
    });
  }
  function createLaser() {
    return { phase: 0, pattern: [0, 1, 1, 0, 1], drumCharge: 'neutral', latentImage: false, drumToner: false, paperToner: false, fused: false };
  }
  function laserAction(state = createLaser(), action) {
    if (action === 'reset') return createLaser();
    const next = { ...state, pattern: [...state.pattern] };
    if (action === 'step' && next.phase < 5) {
      next.phase += 1;
      if (next.phase === 1) next.drumCharge = 'uniform negative';
      if (next.phase === 2) { next.drumCharge = 'image areas less negative'; next.latentImage = true; }
      if (next.phase === 3) next.drumToner = true;
      if (next.phase === 4) { next.drumToner = false; next.paperToner = true; }
      if (next.phase === 5) next.fused = true;
    }
    return next;
  }
  function createPrinting3d() {
    return { slices: [3, 2, 1], layers: [], thickness: 1, height: 0 };
  }
  function printing3dAction(state = createPrinting3d(), action, value) {
    if (action === 'reset') return createPrinting3d();
    if (action === 'thickness') {
      const thickness = Number(value);
      if (![0.5, 1].includes(thickness)) throw new RangeError('Choose a layer thickness of 0.5 or 1 mm.');
      return { ...createPrinting3d(), thickness };
    }
    const next = { ...state, slices: [...state.slices], layers: [...state.layers] };
    if (action === 'step' && next.layers.length < next.slices.length) {
      next.layers.push(next.slices[next.layers.length]);
      next.height = next.layers.length * next.thickness;
    }
    return next;
  }
  return { createDisk, diskAction, createBuffer, bufferAction, createMemory, memoryAction, createControl, controlAction, gateNames, gateOutput, gateRows, circuitOutput, circuitRows, createLaser, laserAction, createPrinting3d, printing3dAction };
})();
if (typeof window !== 'undefined') window.Section3Models = section3Models;
if (typeof module !== 'undefined' && module.exports) module.exports = section3Models;
