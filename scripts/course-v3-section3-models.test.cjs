const test = require('node:test');
const assert = require('node:assert/strict');
const M = require('./course-v3-section3-models.js');

test('disk locates before rotating and reads only after alignment', () => {
  let state = M.createDisk();
  const original = JSON.stringify(state);
  state = M.diskAction(state, 'step');
  assert.equal(state.track, 3);
  assert.equal(state.sector, 0);
  assert.equal(state.phase, 'located');
  assert.equal(state.result, null);
  for (let i = 1; i <= 5; i += 1) {
    state = M.diskAction(state, 'step');
    assert.equal(state.sector, i);
    assert.equal(state.result, null);
  }
  assert.equal(state.phase, 'aligned');
  state = M.diskAction(state, 'step');
  assert.equal(state.result, '1101');
  assert.equal(state.phase, 'complete');
  assert.deepEqual(M.diskAction(state, 'step'), state);
  assert.equal(JSON.stringify(M.createDisk()), original);
});

test('all disk addresses are reachable; write changes only the selected sector', () => {
  for (let track = 0; track < 4; track += 1) {
    for (let sector = 0; sector < 8; sector += 1) {
      let state = M.createDisk();
      const before = state.data.map(row => [...row]);
      state = M.diskAction(state, 'track', track);
      state = M.diskAction(state, 'sector', sector);
      state = M.diskAction(state, 'mode', 'write');
      state = M.diskAction(state, 'word', '1111');
      for (let i = 0; i < 10; i += 1) state = M.diskAction(state, 'step');
      assert.equal(state.phase, 'complete');
      assert.equal(state.result, '1111');
      assert.equal(state.rotations, sector);
      before.forEach((row, t) => row.forEach((word, s) => assert.equal(state.data[t][s], t === track && s === sector ? '1111' : word)));
      assert.deepEqual(M.diskAction(state, 'reset'), M.createDisk());
    }
  }
});

test('disk rotation wraps from sector 7 through sector 0', () => {
  let state = { ...M.createDisk(), sector: 7, targetSector: 1 };
  state = M.diskAction(state, 'step');
  state = M.diskAction(state, 'step');
  assert.equal(state.sector, 0);
  assert.equal(state.phase, 'rotating');
  state = M.diskAction(state, 'step');
  assert.equal(state.sector, 1);
  assert.equal(state.phase, 'aligned');
});

test('buffer receives existing items before admitting new arrivals', () => {
  const initial = M.createBuffer();
  let state = M.bufferAction(initial, 'step');
  assert.deepEqual(initial.queue, []);
  assert.deepEqual(state.queue, [1, 2, 3, 4]);
  assert.deepEqual(state.delivered, []);
  state = M.bufferAction(state, 'step');
  assert.deepEqual(state.delivered, [1, 2]);
  assert.deepEqual(state.queue, [3, 4, 5, 6, 7, 8]);
});

test('buffer preserves every item, FIFO order and capacity for all rate pairs', () => {
  for (let sender = 0; sender <= 6; sender += 1) {
    for (let receiver = 0; receiver <= 6; receiver += 1) {
      let state = M.bufferAction(M.bufferAction(M.createBuffer(), 'sender', sender), 'receiver', receiver);
      for (let i = 0; i < 60; i += 1) {
        state = M.bufferAction(state, 'step');
        assert.ok(state.queue.length <= 8);
        assert.equal(state.source.length + state.queue.length + state.delivered.length, 24);
        assert.deepEqual([...state.delivered, ...state.queue, ...state.source], Array.from({ length: 24 }, (_, n) => n + 1));
      }
      if (sender > 0 && receiver > 0) assert.equal(state.delivered.length, 24);
      if (receiver === 0) assert.equal(state.delivered.length, 0);
      if (sender === 0) assert.equal(state.source.length, 24);
    }
  }
});

test('full buffer applies back-pressure, then resumes without loss', () => {
  let state = M.bufferAction(M.createBuffer(), 'receiver', 0);
  for (let i = 0; i < 3; i += 1) state = M.bufferAction(state, 'step');
  assert.equal(state.queue.length, 8);
  assert.equal(state.source[0], 9);
  assert.equal(state.blocked, 4);
  state = M.bufferAction(state, 'receiver', 6);
  state = M.bufferAction(state, 'step');
  assert.deepEqual(state.delivered, [1, 2, 3, 4, 5, 6]);
  assert.deepEqual(state.queue, [7, 8, 9, 10, 11, 12]);
  assert.deepEqual(M.bufferAction(state, 'reset'), M.createBuffer());
});

test('RAM edits are not saved until an explicit copy, and power loss is irreversible without one', () => {
  let state = M.memoryAction(M.createMemory(), 'write', '1100');
  assert.equal(state.saved, '0011');
  state = M.memoryAction(state, 'power');
  assert.equal(state.ram, null);
  assert.equal(state.sram, null);
  assert.equal(state.dram, null);
  assert.equal(state.rom, 'BOOT');
  assert.equal(state.saved, '0011');
  state = M.memoryAction(state, 'write', '1111');
  assert.equal(state.ram, null);
  state = M.memoryAction(state, 'power');
  assert.equal(state.ram, null);
  state = M.memoryAction(state, 'load');
  assert.equal(state.ram, '0011');
  state = M.memoryAction(state, 'write', '1100');
  state = M.memoryAction(state, 'save');
  state = M.memoryAction(M.memoryAction(state, 'power'), 'power');
  assert.equal(M.memoryAction(state, 'load').ram, '1100');
});

test('DRAM requires refresh even with power on; SRAM does not', () => {
  let state = M.memoryAction(M.createMemory(), 'refresh');
  for (let i = 0; i < 2; i += 1) state = M.memoryAction(state, 'step');
  assert.equal(state.dram, '1010');
  assert.equal(state.charge, 1);
  state = M.memoryAction(state, 'step');
  assert.equal(state.power, true);
  assert.equal(state.dram, null);
  assert.equal(state.sram, '1010');
  state = M.memoryAction(state, 'refresh');
  state = M.memoryAction(state, 'step');
  assert.equal(state.dram, null, 'refresh must not resurrect unknown data');
  state = M.memoryAction(state, 'write', '0011');
  for (let i = 0; i < 20; i += 1) state = M.memoryAction(state, 'step');
  assert.equal(state.dram, '0011');
  assert.equal(state.charge, 3);
  assert.deepEqual(M.memoryAction(state, 'reset'), M.createMemory());
});

test('control separates measurement, decision, actuator and subsequent feedback', () => {
  let state = M.createControl();
  state = M.controlAction(state, 'step');
  assert.equal(state.sampled, 18);
  assert.equal(state.demand, null);
  assert.equal(state.heater, false);
  state = M.controlAction(state, 'step');
  assert.equal(state.demand, true);
  assert.equal(state.heater, false);
  state = M.controlAction(state, 'step');
  assert.equal(state.heater, true);
  assert.equal(state.temperature, 18);
  state = M.controlAction(state, 'step');
  assert.equal(state.temperature, 20);
  assert.equal(state.sampled, 18);
  state = M.controlAction(state, 'step');
  assert.equal(state.sampled, 20);
});

test('control switches off at target; monitoring never acts on the room', () => {
  let atTarget = M.controlAction(M.createControl(), 'temperature', 21);
  for (let i = 0; i < 3; i += 1) atTarget = M.controlAction(atTarget, 'step');
  assert.equal(atTarget.demand, false);
  assert.equal(atTarget.heater, false);
  let monitor = M.controlAction(M.createControl(), 'mode', 'monitor');
  for (let i = 0; i < 4; i += 1) monitor = M.controlAction(monitor, 'step');
  assert.equal(monitor.heater, false);
  assert.equal(monitor.temperature, 17);
  assert.equal(monitor.sampled, 18);
  assert.deepEqual(M.controlAction(monitor, 'reset'), M.createControl());
});

test('thermal model remains bounded and new conditions require a fresh reading', () => {
  for (let temperature = 10; temperature <= 35; temperature += 1) {
    let state = M.controlAction(M.createControl(), 'temperature', temperature);
    for (let i = 0; i < 120; i += 1) {
      state = M.controlAction(state, 'step');
      assert.ok(state.temperature >= 10 && state.temperature <= 35);
    }
    state = M.controlAction(state, 'target', 26);
    assert.equal(state.phase, 0);
    assert.equal(state.sampled, null);
    assert.equal(state.demand, null);
  }
});

test('six gate tables match independent complete expected outputs', () => {
  const expected = { NOT: [1, 0], AND: [0, 0, 0, 1], OR: [0, 1, 1, 1], NAND: [1, 1, 1, 0], NOR: [1, 0, 0, 0], XOR: [0, 1, 1, 0] };
  for (const [gate, outputs] of Object.entries(expected)) {
    const rows = M.gateRows(gate);
    assert.deepEqual(rows.map(row => row.at(-1)), outputs);
    assert.ok(rows.every(row => row.length === (gate === 'NOT' ? 2 : 3)));
  }
});

test('combined circuit has correct intermediate columns for all eight cases', () => {
  assert.deepEqual(M.circuitRows(), [
    [0, 0, 0, 0, 1, 0], [0, 0, 1, 0, 0, 0],
    [0, 1, 0, 1, 1, 1], [0, 1, 1, 1, 0, 0],
    [1, 0, 0, 1, 1, 1], [1, 0, 1, 1, 0, 0],
    [1, 1, 0, 1, 1, 1], [1, 1, 1, 1, 0, 0],
  ]);
});

test('models reject values outside the controls instead of accepting invalid states', () => {
  assert.throws(() => M.diskAction(undefined, 'track', 4), RangeError);
  assert.throws(() => M.diskAction(undefined, 'word', '0120'));
  assert.throws(() => M.bufferAction(undefined, 'sender', -1), RangeError);
  assert.throws(() => M.controlAction(undefined, 'target', NaN), RangeError);
  assert.throws(() => M.gateOutput('AND', 2, 0), RangeError);
  assert.throws(() => M.gateOutput('XNOR', 0, 0));
});

test('laser printer creates a latent image before developing and transferring toner', () => {
  let state = M.createLaser();
  const initial = M.createLaser();
  const expected = [
    ['uniform negative', false, false, false, false],
    ['image areas less negative', true, false, false, false],
    ['image areas less negative', true, true, false, false],
    ['image areas less negative', true, false, true, false],
    ['image areas less negative', true, false, true, true],
  ];
  expected.forEach((row, index) => {
    state = M.laserAction(state, 'step');
    assert.equal(state.phase, index + 1);
    assert.deepEqual([state.drumCharge, state.latentImage, state.drumToner, state.paperToner, state.fused], row);
    assert.equal(state.drumToner && state.paperToner, false, 'transferred toner must not remain on both surfaces');
    assert.deepEqual(state.pattern, [0, 1, 1, 0, 1]);
  });
  assert.deepEqual(M.laserAction(state, 'step'), state, 'no unmodelled sixth step');
  assert.deepEqual(M.laserAction(state, 'reset'), initial);
  assert.deepEqual(initial, M.createLaser(), 'initial state remains unchanged');
});

test('3D printing accumulates the three specified slices at either layer thickness', () => {
  for (const thickness of [0.5, 1]) {
    let state = M.printing3dAction(M.createPrinting3d(), 'thickness', thickness);
    const heights = thickness === 0.5 ? [0.5, 1, 1.5] : [1, 2, 3];
    for (let i = 0; i < 3; i += 1) {
      const previous = state;
      state = M.printing3dAction(state, 'step');
      assert.equal(state.height, heights[i]);
      assert.deepEqual(state.layers, [3, 2, 1].slice(0, i + 1));
      assert.equal(previous.layers.length, i, 'adding a layer must not mutate undo state');
    }
    assert.deepEqual(state.layers.map(size => size * size), [9, 4, 1]);
    assert.deepEqual(M.printing3dAction(state, 'step'), state, 'completed object must not gain another layer');
    assert.deepEqual(M.printing3dAction(state, 'reset'), M.createPrinting3d());
  }
});

test('changing thickness starts a new print instead of stretching existing layers', () => {
  let state = M.printing3dAction(M.createPrinting3d(), 'step');
  state = M.printing3dAction(state, 'thickness', 0.5);
  assert.equal(state.height, 0);
  assert.deepEqual(state.layers, []);
  assert.equal(state.thickness, 0.5);
  assert.equal(M.printing3dAction(state, 'step').height, 0.5);
  assert.throws(() => M.printing3dAction(state, 'thickness', 0), RangeError);
  assert.throws(() => M.printing3dAction(state, 'thickness', 2), RangeError);
});

test('changed control conditions retain the last actuator output until a new actuation', () => {
  let state = M.createControl();
  for (let i = 0; i < 3; i += 1) state = M.controlAction(state, 'step');
  assert.equal(state.heater, true);
  state = M.controlAction(state, 'temperature', 25);
  assert.equal(state.phase, 0);
  assert.equal(state.heater, true);
  assert.match(state.message, /retains its last output \(ON\)/);
  state = M.controlAction(state, 'step');
  state = M.controlAction(state, 'step');
  assert.equal(state.demand, false);
  assert.equal(state.heater, true);
  state = M.controlAction(state, 'step');
  assert.equal(state.heater, false);
});
