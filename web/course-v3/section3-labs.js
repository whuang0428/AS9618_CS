/* Section 3 classroom labs: click/touch controls, no background timers. */
(() => {
  'use strict';
  const M = typeof window === 'undefined' ? require('./course-v3-section3-models.js') : window.Section3Models;
  if (!M) return;
  let sequence = 0;
  const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const colour = value => value ? '#ad4618' : '#687780';
  const button = (action, label, disabled = false, pressed) => `<button type="button" data-s3-action="${action}"${disabled ? ' disabled' : ''}${pressed === undefined ? '' : ` aria-pressed="${pressed}"`}>${label}</button>`;
  const options = (values, selected) => values.map(item => {
    const [value, label] = Array.isArray(item) ? item : [item, item];
    return `<option value="${escape(value)}"${String(value) === String(selected) ? ' selected' : ''}>${escape(label)}</option>`;
  }).join('');
  const select = (name, label, values, value) => `<label>${label}<select data-s3-setting="${name}" aria-label="${label}">${options(values, value)}</select></label>`;
  const numbers = (from, to) => Array.from({ length: to - from + 1 }, (_, i) => from + i);
  const status = text => `<p class="s3-lab-status" role="status" aria-live="polite" aria-atomic="true">${escape(text)}</p>`;
  const note = text => `<p class="s3-lab-note">${escape(text)}</p>`;
  const readout = (label, value) => `<div class="s3-lab-readout"><span>${label}</span><strong>${value}</strong></div>`;
  const table = (headers, rows, current, caption) => `<div class="s3-lab-table"><table><caption>${caption}</caption><thead><tr>${headers.map(label => `<th scope="col">${label}</th>`).join('')}</tr></thead><tbody>${rows.map((row, i) => `<tr${i === current ? ' class="is-current" aria-current="true"' : ''}>${row.map((value, j) => `<${j === 0 ? 'th scope="row"' : 'td'}>${value}</${j === 0 ? 'th' : 'td'}>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  const svg = (label, content, width = 640, height = 320) => `<svg class="s3-lab-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escape(label)}" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto"><title>${escape(label)}</title>${content}</svg>`;
  const wire = (points, value) => `<polyline points="${points}" fill="none" stroke="${colour(value)}" stroke-width="4" stroke-linejoin="round" class="s3-wire ${value ? 'is-high' : 'is-low'}"/>`;
  const text = (x, y, value, anchor = 'middle', size = 20) => `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="system-ui,sans-serif" font-size="${size}" fill="#233b47">${escape(value)}</text>`;
  function gateShape(gate, x, y) {
    const inverted = ['NOT', 'NAND', 'NOR'].includes(gate);
    const path = gate === 'NOT' ? 'M0 0 L80 40 L0 80 Z' : ['AND', 'NAND'].includes(gate) ? 'M0 0 H50 A40 40 0 0 1 50 80 H0 Z' : 'M0 0 Q60 0 100 40 Q60 80 0 80 Q28 40 0 0 Z';
    return `<g transform="translate(${x} ${y})" fill="#fff" stroke="#233b47" stroke-width="3"><path d="${path}"/>${gate === 'XOR' ? '<path d="M-12 0 Q16 40 -12 80" fill="none"/>' : ''}${inverted ? `<circle cx="${gate === 'NOT' ? 86 : gate === 'NAND' ? 96 : 106}" cy="40" r="6"/>` : ''}</g>`;
  }
  function diskVisual(state) {
    const radii = [52, 78, 104, 130], cx = 210, cy = 162;
    let drawing = `<circle cx="${cx}" cy="${cy}" r="145" fill="#eef3f5" stroke="#8b9ca4" stroke-width="2"/>`;
    radii.forEach((radius, i) => { drawing += `<circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="${i === state.targetTrack ? '#14736d' : '#bac9cf'}" stroke-width="${i === state.targetTrack ? 18 : 15}" opacity="${i === state.targetTrack ? '.7' : '.55'}"/>`; });
    for (let sector = 0; sector < 8; sector += 1) {
      const angle = (sector - state.sector) * Math.PI / 4;
      const x = cx + 157 * Math.cos(angle), y = cy + 157 * Math.sin(angle);
      const border = angle - Math.PI / 8;
      drawing += `<line x1="${cx + 35 * Math.cos(border)}" y1="${cy + 35 * Math.sin(border)}" x2="${cx + 144 * Math.cos(border)}" y2="${cy + 144 * Math.sin(border)}" stroke="#fff" stroke-width="2"/>`;
      drawing += text(x, y + 6, `S${sector}`, 'middle', 17);
      if (sector === state.targetSector) {
        const r = radii[state.targetTrack];
        drawing += `<circle cx="${cx + r * Math.cos(angle)}" cy="${cy + r * Math.sin(angle)}" r="12" fill="#eab95f" stroke="#7c5210" stroke-width="3"/>`;
      }
    }
    drawing += `<circle cx="${cx}" cy="${cy}" r="26" fill="#fff" stroke="#879ca7" stroke-width="3"/>`;
    const headX = cx + radii[state.track];
    drawing += `<path d="M460 266 L${headX} ${cy}" stroke="#425c69" stroke-width="12" stroke-linecap="round"/><circle cx="460" cy="266" r="16" fill="#425c69"/><rect x="${headX - 9}" y="${cy - 9}" width="18" height="18" rx="3" fill="#fff" stroke="#ad4618" stroke-width="4"/>`;
    drawing += text(482, 42, `Head: track ${state.track}`) + text(482, 72, `Under head: S${state.sector}`);
    drawing += text(482, 116, 'Magnetic pattern', 'middle', 19);
    state.data[state.track][state.sector].split('').forEach((value, i) => {
      drawing += `<rect x="${402 + 40 * i}" y="132" width="34" height="40" rx="3" fill="${value === '1' ? '#ad4618' : '#edf2f4'}" stroke="#687780"/>`;
      drawing += `<text x="${419 + 40 * i}" y="159" text-anchor="middle" font-size="22" font-family="system-ui,sans-serif" fill="${value === '1' ? '#fff' : '#233b47'}">${value}</text>`;
    });
    drawing += text(480, 206, 'Read/write head', 'middle', 18) + text(205, 349, 'Gold dot = target sector on target track', 'middle', 16);
    return svg(`Disk head at track ${state.track}, sector ${state.sector}; target track ${state.targetTrack}, sector ${state.targetSector}.`, drawing, 640, 365);
  }
  const diskMessages = state => ({ ready: 'Choose an address. Predict what must move first. Step 1 moves the head to the required track.', located: 'The head is over the correct track. The platter must bring the required sector under it.', rotating: `The platter has moved ${state.rotations} sector position${state.rotations === 1 ? '' : 's'}. Continue until the gold target reaches the head.`, aligned: `The requested sector is under the head. The next step will ${state.mode} its magnetic pattern.`, complete: `${state.mode === 'read' ? 'Read' : 'Wrote'} ${state.result} at track ${state.track}, sector ${state.sector}. ${state.mode === 'read' ? 'Reading leaves the stored pattern unchanged.' : 'Only this sector’s pattern changed.'}` })[state.phase];
  function renderDisk(state, previous) {
    const stepLabel = state.phase === 'ready' ? '1. Locate track' : ['located', 'rotating'].includes(state.phase) ? (state.sector === state.targetSector ? '2. Check sector alignment' : '2. Rotate one sector') : `3. ${state.mode === 'read' ? 'Read magnetic pattern' : 'Write magnetic pattern'}`;
    return `<div class="s3-lab-controls">${select('track', 'Target track', numbers(0, 3), state.targetTrack)}${select('sector', 'Target sector', numbers(0, 7), state.targetSector)}${select('mode', 'Operation', [['read', 'Read'], ['write', 'Write']], state.mode)}${state.mode === 'write' ? select('word', 'Write pattern', ['1010', '0101', '1111', '0000'], state.writeWord) : ''}</div><div class="s3-lab-visual" tabindex="0" role="region" aria-label="Interactive diagram; scroll horizontally on a small screen">${diskVisual(state)}</div>${status(diskMessages(state))}<div class="s3-lab-controls">${button('back', 'Previous step', !previous)}${button('step', stepLabel, state.phase === 'complete')}${button('reset', 'Reset disk')}</div>${note('Simplified model: 4 tracks, 8 sectors per track and 4 bits per sector. Sector steps illustrate rotational delay, not the timing or capacity of a real drive. The head does not touch the platter.')}`;
  }
  function renderBuffer(state, previous) {
    const complete = state.source.length === 0 && state.queue.length === 0;
    return `<div class="s3-lab-controls">${select('sender', 'Sender: items / step', numbers(0, 6), state.senderRate)}${select('receiver', 'Receiver: items / step', numbers(0, 6), state.receiverRate)}</div><div class="s3-lab-grid">${readout('Waiting at sender', state.source.length)}${readout('In buffer / capacity', `${state.queue.length} / ${state.capacity}`)}${readout('Received so far', state.delivered.length)}</div><ol class="s3-lab-slots" aria-label="Buffer slots, oldest item first">${numbers(0, 7).map(i => `<li class="s3-lab-slot${state.queue[i] ? ' is-filled' : ''}"><span>Slot ${i + 1}</span><strong>${state.queue[i] ? `P${state.queue[i]}` : 'Empty'}</strong></li>`).join('')}</ol><p class="s3-lab-note">Next to leave: ${state.queue.length ? `P${state.queue[0]}` : 'none'}. Next at sender: ${state.source.length ? `P${state.source[0]}` : 'none'}. Delivered in order: ${state.delivered.map(n => `P${n}`).join(', ') || 'none'}.</p>${status(state.tick === 0 ? 'Predict what happens if the sender is faster than the receiver. Then advance one step.' : `Step ${state.tick}: receiver removed ${state.received}; sender added ${state.sent}.${state.blocked ? ` ${state.blocked} attempted item(s) stayed at the sender because the buffer had no space.` : ''}${complete ? ' All 24 items have arrived, in order.' : ''}`)}<div class="s3-lab-controls">${button('back', 'Previous step', !previous)}${button('step', 'Advance one step', complete)}${button('reset', 'Reset buffer')}</div>${note('Each step: the receiver takes existing items first, then the sender fills available spaces. New arrivals wait until a later step. Flow control pauses the sender when full: no item is silently discarded. Waiting + buffered + received always equals 24.')}`;
  }
  function renderMemory(state, previous) {
    const display = value => value === null ? '<span>Data lost</span>' : `<code>${value}</code>`;
    return `<div class="s3-lab-grid">${readout('Working RAM', display(state.ram))}${readout('ROM: startup instructions', display(state.rom))}${readout('Secondary storage: saved copy', display(state.saved))}</div><div class="s3-lab-controls">${button('power', state.power ? 'Turn power OFF' : 'Turn power ON')}${button('write', 'Write 1100 to RAM', !state.power)}${button('save', 'Save RAM to storage', !state.power || state.ram === null)}${button('load', 'Load saved data into RAM', !state.power)}</div><h4>Compare two types of RAM</h4><div class="s3-lab-grid">${readout('SRAM: powered state', display(state.sram))}${readout('DRAM: stored data', display(state.dram))}${readout('DRAM charge remaining', `${state.charge} / 3`)}</div><div class="s3-lab-controls">${button('refresh', `Automatic DRAM refresh: ${state.refresh ? 'ON' : 'OFF'}`, false, state.refresh)}${button('step', 'Advance time', !state.power)}${button('back', 'Undo action', !previous)}${button('reset', 'Reset memory')}</div>${status(state.message)}${note('Power: ' + (state.power ? 'ON' : 'OFF') + '. The two RAM cells receive the same test word. A conceptual DRAM cell loses reliability after 3 time steps without refresh; this is not a real device timing. SRAM needs power but no periodic refresh. ROM and secondary storage are different kinds of non-volatile storage.')}`;
  }
  function renderControl(state, previous) {
    const stages = ['Sense', 'Compare', state.mode === 'control' ? 'Actuate' : 'Display', 'Environment'];
    let drawing = '';
    stages.forEach((label, i) => {
      const x = 15 + i * 155;
      drawing += `<rect x="${x}" y="25" width="132" height="70" rx="10" fill="${state.phase === i + 1 ? '#d7efeb' : '#edf2f4'}" stroke="${state.phase === i + 1 ? '#14736d' : '#8b9ca4'}" stroke-width="3"/>` + text(x + 66, 66, label, 'middle', 18);
      if (i < 3) drawing += `<path d="M${x + 134} 60 h17 l-5 -5 m5 5 l-5 5" fill="none" stroke="#687780" stroke-width="2"/>`;
    });
    if (state.mode === 'control') drawing += '<path d="M546 99 V136 H80 V99 m-5 6 l5 -6 l5 6" fill="none" stroke="#14736d" stroke-width="3"/>' + text(315, 159, 'Feedback: measure the changed environment again', 'middle', 18);
    return `<div class="s3-lab-controls">${select('mode', 'System', [['control', 'Control'], ['monitor', 'Monitoring']], state.mode)}${select('temperature', 'Set room temperature (°C)', numbers(10, 35), state.temperature)}${select('target', 'Target temperature (°C)', numbers(16, 26), state.target)}</div><div class="s3-lab-visual" tabindex="0" role="region" aria-label="Interactive diagram; scroll horizontally on a small screen">${svg('Sense, compare, act or display, observe environment, and repeat.', drawing, 640, 180)}</div><div class="s3-lab-grid">${readout('Room now', `${state.temperature} °C`)}${readout('Last sensor reading', state.sampled === null ? 'Not sampled' : `${state.sampled} °C`)}${readout('Heater', state.heater ? 'ON' : 'OFF')}${readout('Completed cycles', state.cycle)}</div>${status(state.message)}<div class="s3-lab-controls">${button('back', 'Previous step', !previous)}${button('step', `${state.phase % 4 + 1}. ${stages[state.phase % 4]}`)}${button('reset', 'Reset system')}</div>${note('Toy thermal model: each environment step warms the room by 2 °C with the heater on, or moves it 1 °C towards 15 °C with it off. Temperature is bounded at 10–35 °C. Control turns the heater on below the target and off at or above it. Real systems have delays; monitoring alone does not automatically operate the heater.')}`;
  }
  const gateDescriptions = { NOT: 'The output is the opposite of its single input.', AND: 'The output is 1 only when both inputs are 1.', OR: 'The output is 1 when at least one input is 1, including when both are 1.', NAND: 'An AND result is inverted: the output is 0 only when both inputs are 1.', NOR: 'An OR result is inverted: the output is 1 only when both inputs are 0.', XOR: 'The output is 1 when the two inputs differ; it is 0 when they are the same.' };
  function renderGates(state) {
    const single = state.gate === 'NOT', result = M.gateOutput(state.gate, state.a, state.b);
    const x = 260, y = 45;
    let drawing = single ? wire('100,85 260,85', state.a) + text(75, 92, `A=${state.a}`) : wire(`100,65 ${['OR', 'NOR', 'XOR'].includes(state.gate) ? 271 : 260},65`, state.a) + wire(`100,105 ${['OR', 'NOR', 'XOR'].includes(state.gate) ? 271 : 260},105`, state.b) + text(75, 71, `A=${state.a}`) + text(75, 112, `B=${state.b}`);
    const end = state.gate === 'NOT' ? 352 : state.gate === 'AND' ? 350 : state.gate === 'NAND' ? 362 : state.gate === 'NOR' ? 372 : 360;
    drawing += wire(`${end},85 530,85`, result) + gateShape(state.gate, x, y) + text(570, 92, `Q=${result}`) + text(310, 160, state.gate, 'middle', 22);
    return `<div class="s3-lab-controls">${select('gate', 'Gate', M.gateNames, state.gate)}${button('a', `Input A: ${state.a}`, false, Boolean(state.a))}${single ? '' : button('b', `Input B: ${state.b}`, false, Boolean(state.b))}${button('reset', 'Reset inputs')}</div><div class="s3-lab-visual" tabindex="0" role="region" aria-label="Interactive diagram; scroll horizontally on a small screen">${svg(`${state.gate} gate: A ${state.a}${single ? '' : `, B ${state.b}`}; output Q ${result}.`, drawing, 640, 190)}</div>${status(gateDescriptions[state.gate] + ` Current output: ${result}.`)}${table(single ? ['A', 'Q'] : ['A', 'B', 'Q'], M.gateRows(state.gate), single ? state.a : 2 * state.a + state.b, `${state.gate} truth table — highlighted row matches the inputs`)}${note('Numbers show logic levels. Orange wires carry 1; grey wires carry 0. A small circle at a gate output means inversion. Input changes are shown immediately; propagation delays are omitted.')}`;
  }
  function renderCircuit(state) {
    const r = M.circuitOutput(state.a, state.b, state.c);
    let drawing = wire('70,50 161,50', r.a) + wire('70,90 161,90', r.b) + wire('70,200 150,200', r.c);
    drawing += wire('250,70 330,70 330,115 430,115', r.either) + wire('242,200 355,200 355,155 430,155', r.safe) + wire('520,135 630,135', r.q);
    drawing += gateShape('OR', 150, 30) + gateShape('NOT', 150, 160) + gateShape('AND', 430, 95);
    drawing += text(35, 57, `A=${r.a}`) + text(35, 97, `B=${r.b}`) + text(35, 207, `C=${r.c}`) + text(668, 143, `Q=${r.q}`);
    drawing += text(195, 140, 'OR', 'middle', 17) + text(190, 270, 'NOT', 'middle', 17) + text(475, 208, 'AND', 'middle', 17);
    drawing += text(320, 45, `X=${r.either}`, 'middle', 22) + text(320, 233, `Y=${r.safe}`, 'middle', 22);
    return `<h4>Trace Q = (A OR B) AND NOT C</h4><p class="s3-lab-equation"><strong>X = A OR B &nbsp; Y = NOT C &nbsp; Q = X AND Y</strong></p><div class="s3-lab-controls">${button('a', `Input A: ${state.a}`, false, Boolean(state.a))}${button('b', `Input B: ${state.b}`, false, Boolean(state.b))}${button('c', `Input C: ${state.c}`, false, Boolean(state.c))}${button('reset', 'Reset inputs')}</div><div class="s3-lab-visual" tabindex="0" role="region" aria-label="Interactive diagram; scroll horizontally on a small screen">${svg(`Q = (A OR B) AND NOT C. A ${r.a}, B ${r.b}, C ${r.c}. OR result X ${r.either}, NOT result Y ${r.safe}, Q ${r.q}.`, drawing, 720, 285)}</div>${status(`First: A OR B gives X = ${r.either}. Separately: NOT C gives Y = ${r.safe}. Finally: ${r.either} AND ${r.safe} gives Q = ${r.q}.`)}${table(['A', 'B', 'C', 'X = A OR B', 'Y = NOT C', 'Q'], M.circuitRows(), 4 * state.a + 2 * state.b + state.c, 'All eight input combinations — follow the intermediate columns')}${note('Q is 1 when at least one of A and B is 1 and C is 0. Set C to 1, then try every A/B pair: the final AND gate must output 0. Numbers label all signal levels, so colour is not required.')}`;
  }
  const laserStages = ['Charge', 'Expose', 'Apply toner', 'Transfer', 'Fuse'];
  function laserVisual(state) {
    const accent = stage => state.phase === stage ? '#ad4618' : '#687780';
    const paperX = state.phase >= 5 ? 570 : state.phase >= 4 ? 240 : 55;
    let drawing = '<path d="M40 286 H710 l-12 -8 m12 8 l-12 8" fill="none" stroke="#acbec6" stroke-width="3"/>' + text(670, 321, 'Paper path', 'middle', 18);
    drawing += '<circle cx="300" cy="173" r="77" fill="#e7eff2" stroke="#425c69" stroke-width="4"/><circle cx="300" cy="173" r="11" fill="#425c69"/>';
    drawing += text(300, 210, 'Drum', 'middle', 22);
    drawing += `<rect x="171" y="139" width="27" height="76" rx="12" fill="#fff" stroke="${accent(1)}" stroke-width="5"/>` + text(128, 117, '1 Charge', 'middle', 20);
    drawing += `<path d="M116 30 H169 V69 H116 Z" fill="#fff" stroke="${accent(2)}" stroke-width="4"/>` + text(205, 35, '2 Laser', 'middle', 20);
    if (state.phase === 2) drawing += '<path d="M158 69 L270 101" stroke="#ad4618" stroke-width="4" stroke-dasharray="9 5"/>';
    drawing += `<path d="M402 52 H485 V102 L447 141 L402 102 Z" fill="#eef3f5" stroke="${accent(3)}" stroke-width="4"/>` + text(444, 31, '3 Toner', 'middle', 20);
    if (state.phase === 3) drawing += '<path d="M420 135 L372 155" stroke="#ad4618" stroke-width="4" stroke-dasharray="6 4"/>';
    drawing += `<rect x="258" y="302" width="92" height="22" rx="11" fill="#fff" stroke="${accent(4)}" stroke-width="4"/>` + text(303, 354, '4 Transfer', 'middle', 20);
    drawing += `<circle cx="503" cy="264" r="17" fill="#f6e4d6" stroke="${accent(5)}" stroke-width="4"/><circle cx="503" cy="310" r="17" fill="#f6e4d6" stroke="${accent(5)}" stroke-width="4"/>` + text(527, 229, '5 Heat + pressure', 'middle', 18);
    if (state.phase > 0) {
      for (let i = 0; i < 5; i += 1) drawing += text(251 + i * 24, 143, state.latentImage && state.pattern[i] ? '−' : '−−', 'middle', 16);
    }
    if (state.drumToner) state.pattern.forEach((value, i) => { if (value) drawing += `<rect x="${253 + i * 22}" y="152" width="14" height="11" fill="#233b47"/>`; });
    drawing += `<rect x="${paperX}" y="275" width="105" height="18" fill="#fff" stroke="#687780" stroke-width="2"/>`;
    if (state.phase === 4) drawing += text(295, 317, '+ + + +', 'middle', 16);
    if (state.paperToner) state.pattern.forEach((value, i) => { if (value) drawing += `<rect x="${paperX + 8 + i * 19}" y="276" width="12" height="9" fill="${state.fused ? '#14736d' : '#233b47'}"/>`; });
    drawing += text(629, 108, 'Digital image', 'middle', 19) + text(629, 139, state.pattern.join(''), 'middle', 28);
    drawing += text(629, 177, state.fused ? 'Toner fixed to paper' : state.paperToner ? 'Loose toner on paper' : 'Paper is blank', 'middle', 16);
    return svg(`Laser printer stage ${state.phase} of 5. Drum charge: ${state.drumCharge}. Toner ${state.drumToner ? 'on drum' : state.paperToner ? 'on paper' : 'in cartridge'}. ${state.fused ? 'Image fused.' : 'Image not fused.'}`, drawing, 760, 375);
  }
  function renderLaser(state, previous) {
    const messages = [
      'The digital image selects which areas will receive toner. Predict how loose powder becomes a permanent printed image.',
      'A charging roller gives the photoconductive drum a uniform negative charge.',
      'The laser exposes selected image areas. Light makes those areas conductive, so their negative charge is reduced. This forms an electrostatic image; no toner is on the drum yet.',
      'Negatively charged toner develops the exposed, less-negative image areas. The voltage bias between the developer and drum controls where toner moves.',
      'The paper is given a positive charge. It attracts the negatively charged toner from the drum. The toner is still loose on the paper.',
      'Heated pressure rollers melt and press the toner onto the paper. The image is now fixed. A real printer then cleans and prepares the drum for reuse.',
    ];
    return `<div class="s3-lab-visual" tabindex="0" role="region" aria-label="Interactive diagram; scroll horizontally on a small screen">${laserVisual(state)}</div><div class="s3-lab-grid">${readout('Stage', state.phase ? `${state.phase} / 5: ${laserStages[state.phase - 1]}` : 'Ready')}${readout('Toner location', state.drumToner ? 'Drum' : state.paperToner ? 'Paper' : 'Cartridge')}${readout('Image on paper', state.fused ? 'Fixed by heat and pressure' : state.paperToner ? 'Loose toner' : 'None')}</div>${status(messages[state.phase])}<div class="s3-lab-controls">${button('back', 'Previous stage', !previous)}${button('step', state.phase < 5 ? `${state.phase + 1}. ${laserStages[state.phase]}` : 'Printing complete', state.phase >= 5)}${button('reset', 'Reset printer')}</div>${note('One chosen electrostatic scheme: negative drum and toner; laser exposure reduces the negative drum charge in image areas; developer bias selects these areas; positive paper charge transfers toner. Other designs use different polarities. Positions and charge marks are schematic; fewer minus signs mean less negative charge, not positive charge.')}`;
  }
  function printing3dVisual(state) {
    const project = (u, v, z) => [260 + (u - v) * 43, 220 + (u + v) * 22 - z * 30];
    const polygon = (points, fill, stroke = '#466773') => `<polygon points="${points.map(point => point.join(',')).join(' ')}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
    let drawing = polygon([project(-2, -2, 0), project(2, -2, 0), project(2, 2, 0), project(-2, 2, 0)], '#eef3f5', '#acbec6');
    state.layers.forEach((size, index) => {
      const half = size / 2, z0 = index * state.thickness, z1 = (index + 1) * state.thickness;
      drawing += polygon([project(half, -half, z1), project(half, half, z1), project(half, half, z0), project(half, -half, z0)], '#679d96');
      drawing += polygon([project(-half, half, z1), project(half, half, z1), project(half, half, z0), project(-half, half, z0)], '#43847c');
      for (let row = 0; row < size; row += 1) for (let col = 0; col < size; col += 1) {
        const u = col - half, v = row - half;
        drawing += polygon([project(u, v, z1), project(u + 1, v, z1), project(u + 1, v + 1, z1), project(u, v + 1, z1)], index === state.layers.length - 1 ? '#d2a24e' : '#c4e0dc');
      }
    });
    drawing += text(260, 345, state.layers.length ? 'Material remains from every completed layer' : 'Empty build platform', 'middle', 18);
    const next = state.slices[state.layers.length];
    drawing += text(579, 75, next ? `Next slice: ${next} × ${next}` : 'All slices printed', 'middle', 23);
    if (next) {
      for (let row = 0; row < next; row += 1) for (let col = 0; col < next; col += 1) drawing += `<rect x="${579 - next * 15 + col * 30}" y="${108 + row * 30}" width="28" height="28" fill="#d2a24e" stroke="#7c5210" stroke-width="2"/>`;
    }
    drawing += text(579, 253, `Height: ${state.height} mm`, 'middle', 23) + text(579, 288, `${state.layers.length} layers × ${state.thickness} mm`, 'middle', 19);
    return svg(`A three-dimensional object built from ${state.layers.length} completed layers, height ${state.height} millimetres. ${next ? `The next square slice is ${next} by ${next}.` : 'The object is complete.'}`, drawing, 740, 365);
  }
  function renderPrinting3d(state, previous) {
    const count = state.layers.length, complete = count === state.slices.length;
    const message = count ? `Layer ${count} added a ${state.layers[count - 1]} × ${state.layers[count - 1]} square cross-section. Earlier layers remain underneath. Height = ${count} × ${state.thickness} = ${state.height} mm.${complete ? ' All three slices are complete.' : ' Predict the next cross-section before printing it.'}` : 'A digital model has been sliced into three square cross-sections: 3 × 3, then 2 × 2, then 1 × 1. Form the first layer on the platform.';
    return `<div class="s3-lab-controls">${select('thickness', 'Layer thickness (mm); changing restarts', [[0.5, '0.5 mm'], [1, '1 mm']], state.thickness)}</div><div class="s3-lab-visual" tabindex="0" role="region" aria-label="Interactive diagram; scroll horizontally on a small screen">${printing3dVisual(state)}</div>${status(message)}<div class="s3-lab-controls">${button('back', 'Previous layer', !previous)}${button('step', complete ? 'Object complete' : `Form layer ${count + 1}`, complete)}${button('reset', 'Reset printer')}</div>${note('A simplified material-extrusion model: the nozzle deposits material along a slice and moves up for the next layer. Each click completes an entire layer; nozzle paths and cooling are omitted. For these fixed three slices, changing thickness changes object height. For a real object of fixed height, the slicer recalculates the number of layers when thickness changes.')}`;
  }
  const initial = { disk: M.createDisk, buffer: M.createBuffer, memory: M.createMemory, control: M.createControl, gates: () => ({ gate: 'AND', a: 0, b: 0 }), circuit: () => ({ a: 0, b: 0, c: 0 }), laser: M.createLaser, printing3d: M.createPrinting3d };
  const renderers = { disk: renderDisk, buffer: renderBuffer, memory: renderMemory, control: renderControl, gates: renderGates, circuit: renderCircuit, laser: renderLaser, printing3d: renderPrinting3d };
  const actions = { disk: M.diskAction, buffer: M.bufferAction, memory: M.memoryAction, control: M.controlAction, laser: M.laserAction, printing3d: M.printing3dAction };
  if (typeof window === 'undefined') {
    module.exports = {
      initialVisual(type) {
        return renderers[type] ? renderers[type](initial[type](), false).match(/<svg[\s\S]*?<\/svg>/)?.[0] ?? '' : '';
      },
    };
    return;
  }
  function initialise(root) {
    if (root.dataset.s3Ready) return;
    const type = root.dataset.s3Lab;
    if (!initial[type]) return;
    root.dataset.s3Ready = 'true';
    root.classList.add('s3-lab');
    root.id ||= `s3-lab-${++sequence}`;
    let state = initial[type](), history = [];
    const draw = () => {
      const focused = root.contains(document.activeElement) ? document.activeElement : null;
      const action = focused?.dataset.s3Action, setting = focused?.dataset.s3Setting;
      root.innerHTML = renderers[type](state, history.length > 0);
      if (action || setting) root.querySelector(action ? `[data-s3-action="${action}"]` : `[data-s3-setting="${setting}"]`)?.focus({ preventScroll: true });
    };
    const apply = (action, value) => {
      if (action === 'back') { if (history.length) state = history.pop(); }
      else if (action === 'reset') { state = initial[type](); history = []; }
      else {
        history.push(state);
        if (actions[type]) state = actions[type](state, action, value);
        else if (action === 'gate' && M.gateNames.includes(value)) state = { ...state, gate: value };
        else if (['a', 'b', 'c'].includes(action)) state = { ...state, [action]: 1 - state[action] };
      }
      draw();
    };
    root.addEventListener('click', event => {
      const control = event.target.closest('[data-s3-action]');
      if (control && root.contains(control) && !control.disabled) apply(control.dataset.s3Action, control.dataset.s3Action === 'write' ? '1100' : undefined);
    });
    root.addEventListener('change', event => {
      const control = event.target.closest('[data-s3-setting]');
      if (control && root.contains(control)) apply(control.dataset.s3Setting, control.value);
    });
    root.addEventListener('s3:reset', () => apply('reset'));
    // All transitions are manual. Leaving a teaching step preserves the state without running work.
    draw();
  }
  const initialiseAll = () => document.querySelectorAll('[data-s3-lab]').forEach(initialise);
  window.Section3Labs = { initialiseAll };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialiseAll, { once: true });
  else initialiseAll();
})();
