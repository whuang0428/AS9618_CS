/* Section 4 classroom experiments: playback and manual stepping share the same local state. */
(() => {
  'use strict';
  const M = typeof window === 'undefined' ? require('./course-v3-section4-models.js') : window.Section4Models;
  if (!M) return;
  const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const button = (action, label, disabled = false) => `<button type="button" data-s4-action="${action}"${disabled ? ' disabled' : ''}>${escape(label)}</button>`;
  const select = (setting, label, options, value) => `<label>${escape(label)}<select data-s4-setting="${setting}" aria-label="${escape(label)}">${options.map(item => { const [v, text] = Array.isArray(item) ? item : [item, item]; return `<option value="${escape(v)}"${String(v) === String(value) ? ' selected' : ''}>${escape(text)}</option>`; }).join('')}</select></label>`;
  const readout = (label, value, active = false) => `<div class="s4-lab-readout${active ? ' is-changed' : ''}"><span>${escape(label)}</span><strong>${escape(value ?? '—')}</strong></div>`;
  const note = value => `<p class="s4-lab-note">${escape(value)}</p>`;
  const table = (caption, headers, rows, current = -1) => `<div class="s4-lab-table" tabindex="0" role="region" aria-label="${escape(caption)}"><table><caption>${escape(caption)}</caption><thead><tr>${headers.map(h => `<th scope="col">${escape(h)}</th>`).join('')}</tr></thead><tbody>${rows.map((row, i) => `<tr${i === current ? ' class="is-current" aria-current="true"' : ''}>${row.map((value, j) => `<${j ? 'td' : 'th scope="row"'}>${escape(value ?? '—')}</${j ? 'td' : 'th'}>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  const text = (x, y, value, size = 19, anchor = 'middle', fill = '#173844') => `<text x="${x}" y="${y}" text-anchor="${anchor}" font-size="${size}" font-family="system-ui,sans-serif" fill="${fill}">${escape(value)}</text>`;
  const box = (x, y, w, h, label, value = '', active = false) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${active ? '#d7efeb' : '#f3f6f7'}" stroke="${active ? '#116d61' : '#7b929d'}" stroke-width="${active ? 3 : 1.5}"/>${text(x + w / 2, y + (value === '' ? h / 2 + 7 : 25), label, 19)}${value === '' ? '' : text(x + w / 2, y + h - 14, value, 20)}`;
  const svg = (label, content, height = 380, width = 840) => `<svg class="s4-lab-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escape(label)}" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto"><title>${escape(label)}</title>${content}</svg>`;
  const arrow = (x1, y, x2, label, reverse = false) => `<path d="M${x1} ${y} H${x2}" fill="none" stroke="#116d61" stroke-width="3"/>${reverse ? `<path d="M${x1 + 8} ${y - 6} L${x1} ${y} L${x1 + 8} ${y + 6}" fill="none" stroke="#116d61" stroke-width="3"/>` : `<path d="M${x2 - 8} ${y - 6} L${x2} ${y} L${x2 - 8} ${y + 6}" fill="none" stroke="#116d61" stroke-width="3"/>`}${text((x1 + x2) / 2, y - 11, label, 15)}`;
  function cpuVisual(v) {
    if (v.type === 'cpu' && !v.config.showRegisters) return cpuRolesVisual(v);
    const active = name => (v.active || []).includes(name), memory = Object.entries(v.memory || M.programMemory());
    let d = '<rect x="12" y="14" width="485" height="354" rx="14" fill="#fff" stroke="#456777" stroke-width="2"/>' + text(255, 43, 'PROCESSOR (CPU)', 22);
    d += box(27, 58, 143, 58, 'Control unit', '', active('CU')) + box(181, 58, 143, 58, 'ALU', '', active('ALU')) + box(335, 58, 143, 58, 'Clock', '', active('CLOCK'));
    [['PC', v.pc ?? '—'], ['MAR', v.mar ?? '—'], ['MDR', v.mdr ?? '—'], ['ACC', v.acc ?? 0], ['IX', v.ix ?? 0], ['SR · zero', v.flags ? Number(v.flags.zero) : '—']].forEach(([name, value], i) => { d += box(27 + i % 3 * 154, 130 + Math.floor(i / 3) * 79, 143, 69, name, value, active(name.startsWith('SR') ? 'SR' : name)); });
    d += box(27, 288, 451, 60, 'CIR · current instruction', v.cir ?? '—', active('CIR'));
    d += text(677, 40, 'IMMEDIATE ACCESS STORE', 18) + text(606, 76, 'Address', 17) + text(743, 76, 'Contents', 17);
    memory.forEach(([address, value], i) => {
      const y = 90 + i * 38, selected = Number(address) === v.address, current = Number(address) === v.current;
      d += `<rect x="575" y="${y}" width="247" height="33" rx="5" fill="${selected ? '#d7efeb' : current ? '#fff0d8' : '#f3f6f7'}" stroke="${selected ? '#116d61' : current ? '#97620c' : '#bdcbd0'}" stroke-width="${selected || current ? 2.5 : 1}"/>${text(606, y + 23, address, 19)}${text(735, y + 23, value, 19)}`;
    });
    d += arrow(500, 175, 568, 'Address');
    const writing = (v.bus || '').includes('data: CPU → memory'), reading = (v.bus || '').includes('data: memory → CPU');
    d += arrow(500, 245, 568, 'Data', reading || !writing);
    if (!reading && !writing) d += '<path d="M560 239 L568 245 L560 251" fill="none" stroke="#116d61" stroke-width="3"/>';
    d += text(534, 306, 'Control', 15);
    return svg(`Processor and memory. PC ${v.pc ?? 'not used'}, ACC ${v.acc ?? 0}. ${v.bus || 'No active bus transfer.'}`, d, 386);
  }
  // Internal links follow the gaps between register boxes. The endpoints are
  // placed on component boundaries so the arrowheads indicate an actual transfer.
  const transferPaths = {
    clockCu: [[177, 92], [195, 92]],
    pcMar: [[177, 178], [195, 178]],
    incPC: [[55, 141], [55, 135], [143, 135], [143, 141]],
    marAddress: [[320, 141], [320, 134], [519, 134], [519, 109], [530, 109]],
    cuControl: [[340, 129], [340, 132], [522, 132], [522, 283], [530, 283]],
    dataMdr: [[530, 196], [515, 196]], mdrData: [[515, 196], [530, 196]],
    mdrCir: [[490, 214], [490, 220], [520, 220], [520, 320], [399, 320]],
    cirCu: [[149, 320], [18, 320], [18, 135], [225, 135], [225, 129]],
    cirMar: [[149, 320], [21, 320], [21, 220], [231, 220], [231, 214]],
    ixAlu: [[115, 226], [115, 219], [355, 219], [355, 135], [399, 135], [399, 129]],
    cirAlu: [[399, 320], [524, 320], [524, 135], [475, 135], [475, 129]],
    aluMar: [[431, 129], [431, 137], [275, 137], [275, 141]],
    mdrAcc: [[402, 214], [402, 220], [327, 220], [327, 226]],
    accMdr: [[327, 226], [327, 220], [402, 220], [402, 214]],
    accAlu: [[320, 226], [320, 220], [355, 220], [355, 136], [397, 136], [397, 129]],
    mdrAlu: [[456, 141], [456, 129]],
    aluAcc: [[487, 129], [487, 133], [350, 133], [350, 217], [237, 217], [237, 226]],
    aluSr: [[501, 129], [520, 129], [520, 220], [474, 220], [474, 226]],
  };
  function activeLink(name) {
    const points = transferPaths[name];
    const [endX, endY] = points.at(-1), [beforeX, beforeY] = points.at(-2);
    const size = 5, dx = Math.sign(endX - beforeX) * size, dy = Math.sign(endY - beforeY) * size;
    const stroke = name === 'cuControl' || name === 'clockCu' ? '#9a5810' : '#08705b';
    return `<g data-s4-path="${name}"><polyline points="${points.map(([x, y]) => x + ',' + y).join(' ')}" fill="none" stroke="${stroke}" stroke-width="3" stroke-linejoin="round"/><path d="M${endX - dx + dy} ${endY - dy - dx}L${endX} ${endY}L${endX - dx - dy} ${endY - dy + dx}" fill="none" stroke="${stroke}" stroke-width="2.8"/></g>`;
  }
  function dataPathVisual(v) {
    const active = key => v.active.includes(key);
    const bus = v.bus || '';
    const writing = bus.includes('data: CPU → memory');
    const reading = bus.includes('data: memory → CPU');
    const wire = (x, y, end, name, on, direction = 'right') => {
      const colour = on ? '#096d5d' : '#819399';
      const point = (px, sign) => `<path d="M${px - sign * 9} ${y - 6}L${px} ${y}L${px - sign * 9} ${y + 6}" fill="none" stroke="${colour}" stroke-width="3"/>`;
      return text((x + end) / 2, y - 12, name, 15) + `<path d="M${x} ${y} H${end}" stroke="${colour}" stroke-width="${on ? 5 : 2}" fill="none"/>`
        + (direction !== 'left' ? point(end, 1) : '') + (direction !== 'right' ? point(x, -1) : '');
    };
    let d = '<rect x="12" y="12" width="515" height="333" rx="13" fill="#fff" stroke="#466776" stroke-width="2"/>';
    d += text(35, 43, 'CPU', 23, 'start') + text(494, 42, 'processor registers and units', 15, 'end');
    const component = (x, y, name, value, key) => box(x, y, 150, 73, name, value, active(key));
    d += component(27, 56, 'System clock', 'timing pulses', 'CLOCK') + component(196, 56, 'CU', 'control unit', 'CU') + component(365, 56, 'ALU', 'arithmetic / logic', 'ALU');
    d += component(27, 141, 'PC', v.pc, 'PC') + component(196, 141, 'MAR', v.mar ?? '—', 'MAR') + component(365, 141, 'MDR', v.mdr ?? '—', 'MDR');
    d += component(27, 226, 'IX', v.ix, 'IX') + component(196, 226, 'ACC', v.acc, 'ACC') + component(365, 226, 'Status · Z', Number(v.flags.zero), 'SR');
    d += `<rect x="149" y="304" width="250" height="35" rx="7" fill="${active('CIR') ? '#d7efeb' : '#f3f6f7'}" stroke="${active('CIR') ? '#116d61' : '#7b929d'}"/>` + text(274, 328, `CIR · ${v.cir}`, 19);
    d += (v.links || []).map(activeLink).join('');
    d += wire(530, 109, 687, 'Address bus', bus.includes('Address') || reading || writing);
    d += wire(530, 196, 687, 'Data bus', reading || writing, reading ? 'left' : writing ? 'right' : 'both');
    d += wire(530, 283, 687, 'Control bus', /READ|WRITE/.test(bus), /READ|WRITE/.test(bus) ? 'right' : 'both');
    d += '<rect x="692" y="12" width="222" height="333" rx="13" fill="#fff" stroke="#466776" stroke-width="2"/>';
    d += text(803, 42, 'IAS · main memory', 20);
    Object.entries(v.memory).forEach(([address, value], i) => {
      const y = 61 + i * 38, picked = Number(address) === v.address;
      const current = Number(address) === v.current;
      d += `<rect x="705" y="${y}" width="195" height="33" rx="5" fill="${picked ? '#d7efeb' : '#f1f5f5'}" stroke="${current ? '#97620c' : picked ? '#096d5d' : '#c4cfd0'}" stroke-width="${current ? 3 : 1}"/>`
        + text(721, y + 23, address, 17, 'start') + text(883, y + 23, value, 18, 'end');
    });
    const route = v.route || bus || (v.active.length ? v.active.join(' · ') : 'Instruction boundary');
    d += '<rect x="12" y="358" width="902" height="46" rx="8" fill="#e1efec"/>' + text(463, 388, route, 20);
    const showNotation = v.type === 'fetch' || v.type === 'registerFlow';
    if (showNotation) {
      d += text(23, 433, 'Cambridge fetch notation', 18, 'start');
      ['MAR ← [PC]', 'PC ← [PC] + 1', 'MDR ← [[MAR]]', 'CIR ← [MDR]'].forEach((line, i) => {
        const x = 12 + i * 228, selected = v.notation === i;
        d += `<rect x="${x}" y="446" width="219" height="40" rx="5" fill="${selected ? '#c9e9dc' : '#f2f5f5'}" stroke="${selected ? '#096d5d' : '#bdc9cb'}" stroke-width="${selected ? 3 : 1}"/>` + text(x + 109, 472, line, 18);
      });
    }
    return svg(`CPU, seven special registers and three buses. Transfer: ${route}; PC ${v.pc}, ACC ${v.acc}.`, d, showNotation ? 498 : 416, 926);
  }

  function sequenceVisual(v) {
    let d = '';
    v.labels.forEach((label, i) => {
      const x = 14 + 210 * i;
      d += box(x, 40, 180, 82, label, '', i === v.stage);
      if (i < v.labels.length - 1) d += arrow(x + 183, 82, x + 204, '');
    });
    d += '<rect x="50" y="159" width="740" height="74" rx="12" fill="#e5f0ed"/>' +
      text(420, 190, 'Current signal or value', 16) + text(420, 219, v.signal, 23);
    return svg(`${v.title}. ${v.labels[v.stage]}: ${v.signal}.`, d, 253);
  }

  function deviceVisual(v) {
    const bitRow = (name, value, y) => text(14, y + 33, name, 17, 'start') + [...M.binary(value)].map((bit, i) => {
      const x = 174 + i * 82, focus = (i === 3 && v.mask === 16) || (i === 5 && (v.mask === 4 || v.written));
      return `<rect x="${x}" y="${y}" width="68" height="48" rx="6" fill="${focus ? '#cce9df' : '#f1f5f5'}" stroke="${focus ? '#17634d' : '#909fa2'}"/>${text(x + 34, y + 33, bit, 24)}`;
    }).join('');
    let d = text(420, 34, v.instruction, 25);
    for (let i = 0; i < 8; i++) d += text(208 + i * 82, 68, 7 - i, 16);
    d += bitRow('Device register', v.device, 82) + bitRow('ACC', v.acc, 145);
    if (v.mask !== null) d += bitRow('Mask', v.mask, 208);
    d += text(420, 300, `Bit 4: ready ${(v.device >> 4) & 1}     Bit 2: motor ${(v.device >> 2) & 1}     Bit 0: other ${v.device & 1}`, 19);
    return svg(`Device control registers after ${v.instruction}. ACC ${M.binary(v.acc)}, device ${M.binary(v.device)}.`, d, 318);
  }
  function cpuRolesVisual(v) {
    const active = name => v.active.includes(name);
    let d = '<rect x="12" y="16" width="494" height="343" rx="14" fill="#fff" stroke="#456777" stroke-width="2"/>' + text(259, 46, 'PROCESSOR (CPU)', 23);
    d += box(29, 76, 223, 100, 'CONTROL UNIT', 'Coordinates work', active('CU'));
    d += box(268, 76, 220, 100, 'ALU', 'Calculates', active('ALU'));
    d += box(29, 204, 223, 100, 'CLOCK', 'Synchronises', active('CLOCK'));
    d += box(268, 204, 220, 100, 'ACC', v.acc, active('ACC'));
    d += text(259, 339, 'The parts cooperate to carry out each instruction.', 18);
    d += text(691, 43, 'IMMEDIATE ACCESS STORE', 18) + text(600, 79, 'Address', 17) + text(737, 79, 'Contents', 17);
    Object.entries(v.memory).forEach(([address, value], i) => {
      const y = 91 + i * 38, selected = Number(address) === v.address;
      d += `<rect x="564" y="${y}" width="262" height="33" rx="5" fill="${selected ? '#d7efeb' : '#f3f6f7'}" stroke="${selected ? '#116d61' : '#bdcbd0'}" stroke-width="${selected ? 3 : 1}"/>${text(600, y + 23, address, 19)}${text(737, y + 23, value, 19)}`;
    });
    d += arrow(512, 202, 556, 'Read', true);
    return svg(`CPU parts share the work: control unit coordinates, ALU calculates, clock synchronises and ACC retains ${v.acc}.`, d, 378);
  }
  function memoryVisual(v) {
    let d = text(185, 35, 'PROCESSOR SIDE', 22) + text(634, 35, 'ONE SHARED MEMORY', 22);
    d += box(30, 75, 305, 85, 'Selected address', v.mar ?? 'Not selected');
    d += box(30, 225, 305, 85, 'Value copied / prepared', v.mdr ?? 'No transfer yet');
    d += arrow(344, 119, 473, 'Address');
    d += arrow(344, 266, 473, 'Contents', v.config.access === 'read');
    d += text(507, 73, 'Address', 17) + text(647, 73, 'Contents', 17) + text(774, 73, 'Meaning', 17);
    Object.entries(v.memory).filter(([address]) => v.config.showInstructions || Number(address) >= 4).forEach(([address, value], i) => {
      const y = 89 + i * 38, active = Number(address) === v.mar;
      d += `<rect x="480" y="${y}" width="347" height="33" rx="5" fill="${active ? '#d7efeb' : '#f3f6f7'}" stroke="${active ? '#116d61' : '#bdcbd0'}" stroke-width="${active ? 3 : 1}"/>${text(507, y + 23, address, 19)}${text(645, y + 23, value, 19)}${text(774, y + 23, Number(address) < 4 ? 'Instruction' : 'Data', 16)}`;
    });
    return svg(`Addresses identify memory locations. Selected address ${v.mar ?? 'none'}; copied value ${v.mdr ?? 'none'}. Instructions and data share one store.`, d, 378);
  }
  function interruptVisual(v) {
    let d = box(20, 20, 250, 115, 'CPU REGISTERS', `PC ${v.pc} · ACC ${v.acc}`, v.active.includes('PC') || v.active.includes('ACC'));
    d += box(295, 20, 250, 115, 'REQUEST', v.pending ? 'Pending · wait' : v.accepted ? 'Accepted' : 'No request', v.pending);
    const runningISR = v.current >= 200;
    const routineStatus = runningISR ? 'Running' : v.saved ? 'Ready to enter' : v.accepted ? 'Completed' : 'Ready';
    d += box(570, 20, 250, 115, 'INTERRUPT ROUTINE', routineStatus, runningISR);
    d += box(170, 180, 500, 95, 'SAVED CONTEXT', v.saved ? `PC=${v.saved.pc} · ACC=${v.saved.acc} · Z=${Number(v.saved.flags.zero)}` : 'No suspended context', Boolean(v.saved));
    d += text(420, 317, `Current zero flag: ${Number(v.flags.zero)}     Stored answer: Memory[6]=${v.memory[6]}`, 21);
    d += text(420, 351, v.boundary ? 'Current instruction complete: interruption is safe at a boundary.' : 'Complete the active instruction before accepting a request.', 18);
    return svg('Interrupt request, suspended main-program context and interrupt service routine.', d, 380);
  }
  function assemblerVisual(v) {
    let d = box(20, 24, 240, 104, 'ASSEMBLY SOURCE', `${v.source.length} source lines`, v.pass === 0);
    d += box(300, 24, 240, 104, 'PASS 1', 'Build symbol table', v.pass === 1);
    d += box(580, 24, 240, 104, 'PASS 2', 'Resolve and translate', v.pass === 2);
    d += arrow(264, 78, 292, '') + arrow(544, 78, 572, '');
    d += box(140, 174, 250, 88, 'LABELS KNOWN', `${Object.keys(v.symbols).length} / 4`);
    d += box(450, 174, 250, 88, 'WORDS EMITTED', `${v.output.length} / 7`);
    d += text(420, 308, 'Example word: 8-bit opcode + 8-bit address', 22);
    d += text(420, 339, 'Illustrative encoding only; not a Cambridge or real CPU encoding.', 17);
    return svg('Two-pass assembly: source, label address collection, then operand resolution and translation.', d, 364);
  }
  function addressingVisual(v) {
    const mode = v.mode.toUpperCase();
    let d = box(20, 24, 240, 92, `${mode} OPERAND`, v.operand);
    d += box(300, 24, 240, 92, v.mode === 'relative' ? 'PC BASE' : 'INDEX REGISTER', v.mode === 'relative' ? 101 : v.ix);
    d += box(580, 24, 240, 92, v.mode === 'relative' ? 'TARGET ADDRESS' : 'EFFECTIVE ADDRESS', v.effective ?? 'Not resolved');
    if (v.mode === 'indirect') d += box(160, 157, 250, 82, 'POINTER READ', v.pointer ?? 'Not read');
    else d += box(160, 157, 250, 82, v.mode === 'relative' ? 'SIGNED DISPLACEMENT' : 'DATA MEMORY', v.mode === 'immediate' ? 'No operand read' : v.mode === 'relative' ? v.operand : v.address ?? 'Not read');
    d += box(450, 157, 230, 82, v.mode === 'relative' ? 'PC AFTER BRANCH' : 'ACC', v.mode === 'relative' ? v.pc : v.acc ?? 'Not loaded', v.active.length > 0);
    const entries = Object.entries(v.memory);
    entries.forEach(([a, value], i) => { const x = 12 + i * 103, selected = Number(a) === v.address; d += box(x, 279, 96, 76, a, value, selected); });
    return svg(`${v.mode} addressing. Operand ${v.operand}. Effective address ${v.effective ?? 'not resolved'}, ACC ${v.acc ?? 'not loaded'}.`, d, 378);
  }
  function traceVisual(v) {
    let d = box(20, 20, 240, 94, 'NEXT PC', v.halted ? 'Program ended' : v.pc) + box(300, 20, 240, 94, 'ACC', v.acc) + box(580, 20, 240, 94, 'COMPARISON', v.comparison === null ? 'Not set' : v.comparison ? 'True' : 'False');
    d += box(70, 158, 320, 92, 'JUST EXECUTED', v.current === null ? 'No instruction yet' : `${v.current}: ${v.source[v.current - v.origin]}`, v.current !== null);
    d += box(450, 158, 320, 92, 'OUTPUT', v.output || 'No character yet');
    d += text(420, 298, 'A taken branch changes the next PC. It does not change the listing.', 19);
    return svg(`Execution trace. Next PC ${v.pc}, ACC ${v.acc}, output ${v.output || 'none'}.`, d, 322);
  }
  function bitsVisual(v) {
    const maskMode = ['AND', 'OR', 'XOR'].includes(v.operation);
    let d = text(70, 30, 'Bit', 18);
    Array.from({ length: 8 }, (_, i) => { d += text(230 + i * 73, 30, 7 - i, 19); });
    const row = (label, bits, y, revealed) => {
      let r = text(25, y + 39, label, 19, 'start');
      Array.from({ length: 8 }, (_, i) => { const b = revealed ? bits[i] : '?'; r += `<rect x="${203 + i * 73}" y="${y}" width="55" height="58" rx="7" fill="${b === '1' ? '#d7efeb' : '#f3f6f7'}" stroke="#6e8790" stroke-width="1.5"/>${text(230 + i * 73, y + 39, b, 28)}`; });
      return r;
    };
    d += row('Original', M.binary(v.value), 49, true);
    if (maskMode) {
      d += row(`${v.operation} mask`, M.binary(v.mask), 124, true);
      if (v.step > 0) {
        for (let i = 0; i < 8; i++) {
          const x = 230 + i * 73;
          d += `<path d="M${x} 184 V198 m-4 -5 l4 5 4 -5" fill="none" stroke="#216e60" stroke-width="2"/>`;
        }
      }
    } else if (v.step === 0) {
      d += text(420, 159, `${v.amount} position${v.amount === 1 ? '' : 's'} · predict the destination of bit 7`, 21);
    } else {
      const left = ['LSL', 'ASL', 'ROL'].includes(v.operation), cyclic = ['ROL', 'ROR'].includes(v.operation);
      for (let dest = 0; dest < 8; dest++) {
        let from = left ? dest + v.amount : dest - v.amount;
        const inserted = from < 0 || from > 7;
        if (cyclic) from = (from + 8) % 8;
        else if (v.operation === 'ASR' && from < 0) from = 0;
        const x = 230 + 73 * dest;
        if (from < 0 || from > 7) {
          d += text(x, 164, '0', 20, 'middle', '#996114');
          d += `<path d="M${x} 171 V198 m-4 -6 l4 6 4 -6" fill="none" stroke="#996114" stroke-width="2"/>`;
        } else {
          const sourceX = 230 + 73 * from;
          const colour = inserted ? '#a15e13' : '#26726a';
          d += `<path d="M${sourceX} 112 C${sourceX} 146 ${x} 158 ${x} 198 m-4 -6 l4 6 4 -6" fill="none" stroke="${colour}" stroke-width="${inserted ? 3 : 1.8}"/>`;
        }
      }
    }
    d += row('Result', v.bits, 203, v.visible);
    d += text(420, 305, v.visible ? `Unsigned: ${v.result}       Signed two’s complement: ${v.signedAfter}` : 'Predict each position before revealing the result.', 20);
    return svg(`Eight-bit ${v.operation} experiment. Input ${M.binary(v.value)}. ${v.visible ? `Result ${v.bits}.` : 'Result hidden for prediction.'}`, d, 330);
  }
  function performanceVisual(v) {
    const rows = [['Compute', v.compute, '#14736d'], ['Transfer', v.transfers, '#a9691f'], ['Read wait', v.memoryWait, '#44678f']];
    let d = text(420, 31, 'ABSTRACT WORK UNITS · LOWER TOTAL IS BETTER', 20);
    rows.forEach(([label, value, colour], i) => { const y = 65 + i * 67; d += text(35, y + 28, label, 20, 'start'); d += `<rect x="190" y="${y}" width="${v.visible ? Math.max(3, value * 4.7) : 470}" height="40" rx="7" fill="${v.visible ? colour : '#e7eef0'}"/>`; d += text(755, y + 28, v.visible ? value.toFixed(2) : '?', 20); });
    d += text(420, 293, v.visible ? `Total: ${v.total.toFixed(2)} abstract units` : 'Change one factor, predict the effect, then compare.', 23);
    return svg('Performance model compares compute work, transfer count and waiting for memory reads.', d, 326);
  }
  function portsVisual(v) {
    let d = '';
    [['USB', 'Peripheral data + power'], ['HDMI', 'Digital video + audio'], ['VGA', 'Analogue video only']].forEach(([port, label], i) => { d += box(20 + i * 275, 28, 250, 122, port, '', v.config.choice === port); d += text(145 + i * 275, 122, label, 17); });
    d += text(420, 199, v.visible ? `Required connection: ${v.answer}` : 'Match the required signals to a compatible interface.', 22);
    return svg('USB, HDMI and VGA carry different signals. Match the interface to the task.', d, 230);
  }
  const visuals = { registerFlow: dataPathVisual, busCycle: dataPathVisual, application: sequenceVisual, assemblyStages: sequenceVisual, deviceControl: deviceVisual, memory: memoryVisual, cpu: cpuVisual, fetch: dataPathVisual, interrupt: interruptVisual, assembler: assemblerVisual, addressing: addressingVisual, trace: traceVisual, bits: bitsVisual, performance: performanceVisual, ports: portsVisual };
  const pairOptions = [[0, '18 and 24'], [1, '7 and 9'], [2, '8 and 8'], [3, '18 and 7']];
  function settings(type, c, controls) {
    const field = (...args) => !controls || controls.includes(args[0]) ? select(...args) : '';

    let result = '';
    if (['cpu', 'fetch', 'assembler'].includes(type)) result += field('pair', 'Starting data', pairOptions, c.pair);
    if (type === 'busCycle') result += field('access', 'Bus transaction', [['read', 'Read an operand and add'], ['write', 'Write the result back']], c.access);
    if (type === 'deviceControl') result += field('ready', 'Device readiness', [['yes', 'Ready · original byte 00010001'], ['no', 'Busy · original byte 00000001']], c.ready);
    if (type === 'application') result += field('event', 'Interrupt application', [['keyboard', 'USB connection'], ['timer', 'Time-sliced multitasking'], ['io', 'Storage transfer complete']], c.event);
    if (type === 'memory') result += field('access', 'Transaction', [['read', 'Read a selected location'], ['write', 'Store 42 at address 6']], c.access) + (c.access === 'read' ? field('address', 'Read address', c.showInstructions ? [0, 1, 2, 3, 4, 5, 6] : [4, 5, 6], c.address) : '');
    if (type === 'fetch') result += field('operation', 'Calculation', [['ADD', 'Add the second value'], ['SUB', 'Subtract the second value']], c.operation);
    if (type === 'interrupt') result += field('arrival', 'Request timing', [['during', 'During ADD'], ['manual', 'Issue request manually']], c.arrival);
    if (type === 'interrupt') result += field('event', 'Event source', [['keyboard', 'Keyboard input ready'], ['timer', 'Timer interval elapsed']], c.event);
    if (type === 'assembler') result += field('origin', 'First instruction address', [0, 10, 20], c.origin);
    if (type === 'addressing') {
      result += field('mode', 'Addressing mode', ['immediate', 'direct', 'indirect', 'indexed', 'relative'].map(m => [m, m[0].toUpperCase() + m.slice(1)]), c.mode);
      const labels = { immediate: ['Value 18', 'Value 24', 'Value 42'], direct: ['Address 300', 'Address 301', 'Address 302'], indirect: ['Pointer at 310', 'Pointer at 311', 'Pointer at 312'], indexed: ['IX = 2', 'IX = 3', 'IX = 4'], relative: ['Displacement −4', 'Displacement 0', 'Displacement +3'] };
      result += field('variant', 'Experiment condition', labels[c.mode].map((label, i) => [i, label]), c.variant);
    }
    if (type === 'trace') result += field('program', 'Program', [['sum', 'Load, add and store'], ['loop', 'Count down, compare and output'], ['character', 'Read a character and output the next'], ['branch', 'Accept A; reject other input']], c.program) + (c.program === 'loop' ? field('count', 'Starting loop count', [1, 2, 3, 4], c.count) : '');
    if (type === 'trace' && ['character', 'branch'].includes(c.program)) result += field('input', 'Input character', ['A', 'B'], c.input);
    if (type === 'bits') {
      result += field('value', 'Original 8-bit value', [[166, '10100110 (166 / −90)'], [150, '10010110 (150 / −106)'], [151, '10010111 (151 / −105)'], [64, '01000000 (64)'], [52, '00110100 (52)'], [17, '00010001 (17)'], [255, '11111111 (255 / −1)'], [128, '10000000 (128 / −128)'], [0, '00000000 (0)']], c.value);
      const choices = [['LSL', 'Logical left'], ['LSR', 'Logical right'], ['ASL', 'Arithmetic left'], ['ASR', 'Arithmetic right'], ['ROL', 'Cyclic left'], ['ROR', 'Cyclic right'], ['AND', 'AND · test / clear'], ['OR', 'OR · set'], ['XOR', 'XOR · toggle']];
      const selectedFamily = M.bitFamilies[c.family];
      result += field('operation', 'Operation', choices.filter(([id]) => selectedFamily.includes(id)), c.operation);
      result += ['AND', 'OR', 'XOR'].includes(c.operation) ? field('mask', '8-bit mask', [[1, '00000001 · bit 0 (odd / even)'], [15, '00001111 · lower four bits'], [16, '00010000 · bit 4'], [4, '00000100 · bit 2'], [251, '11111011 · all except bit 2'], [255, '11111111 · all bits'], [0, '00000000 · no bits']], c.mask) : field('amount', 'Positions', [0, 1, 2, 3, 4, 8], c.amount);
    }
    if (type === 'performance') result += field('parallel', 'Independent compute work', [[0, '0%'], [50, '50%'], [75, '75%'], [100, '100%']], c.parallel) + field('cores', 'Cores', [1, 2, 4], c.cores) + field('clock', 'Comparable clock factor', [[1, '1×'], [2, '2×']], c.clock) + field('width', 'Data-bus width (bits)', [16, 32, 64], c.width) + field('cache', 'Cache hit rate for 8 reads', [[0, '0%'], [50, '50%'], [100, '100%']], c.cache);
    if (type === 'ports') result += field('task', 'Connection task', [['display', 'Classroom screen with sound'], ['keyboard', 'Keyboard with power'], ['legacy', 'Legacy analogue projector']], c.task) + field('choice', 'Your connection choice', ['USB', 'HDMI', 'VGA'], c.choice);
    return result ? `<div class="s4-lab-controls s4-lab-settings">${result}</div>` : '';
  }
  function extra(type, v) {
    if (type === 'memory') return `<div class="s4-lab-grid">${readout('Address selected', v.mar)}${readout('Value copied / prepared', v.mdr)}${readout('Stored answer at 6', v.memory[6])}</div>`;
    if (type === 'cpu' && !v.config.showRegisters) return `<div class="s4-lab-grid">${readout('Working value (ACC)', v.acc, v.active.includes('ACC'))}${readout('Operand supplied by memory', v.step >= 3 ? v.mdr : 'Not read yet')}</div>`;
    if (['fetch', 'cpu'].includes(type)) return `<div class="s4-lab-grid">${readout('Address selected (MAR)', v.mar, v.active.includes('MAR'))}${readout('Value transferred (MDR)', v.mdr, v.active.includes('MDR'))}${readout('Transfer', v.bus || 'No external transfer')}${readout('Stored answer at 6', v.memory[6])}</div>`;
    if (type === 'interrupt' && v.config.arrival === 'manual') return `<div class="s4-lab-controls">${button('request', v.requested ? 'Request is queued / handled' : 'Request an interrupt', v.requested || v.step >= 4)}</div>`;
    if (type === 'assembler') {
      const sourceRows = v.source.map(([label, op, operand], i) => [v.origin + i, `${label ? label + ': ' : ''}${op === 'DATA' ? operand : op + (operand === '' ? '' : ' ' + operand)}`]);
      return `<div class="s4-lab-columns">${table('Source: one word per line', ['Address', 'Assembly / data'], sourceRows, v.row)}${table('Pass 1 symbol table', ['Label', 'Address'], Object.entries(v.symbols))}${table('Pass 2 output · illustrative 16-bit words', ['Address', 'Resolved', 'Word'], v.output.map(item => [item.address, item.resolved, item.word]), v.output.length - 1)}</div>`;
    }
    if (type === 'trace') {
      const rows = v.rows.map(row => [row.address, row.instruction, row.acc, row.ix, row.pc, row.comparison === null ? '—' : row.comparison ? 'True' : 'False', row.output || '—', row.stored ?? '—']);
      return `<div class="s4-lab-columns">${table('Program listing', ['Address', 'Instruction'], v.source.map((line, i) => [v.origin + i, line]), v.current === null ? -1 : v.current - v.origin)}${table(rows.length ? `Execution trace · ${Math.max(1, rows.length - 5)}–${rows.length} of ${rows.length} executed instructions` : 'Execution trace · no instruction executed yet', ['Address', 'Instruction', 'ACC', 'IX', 'Next PC', 'Compare', 'Output', 'M[6]'], rows.slice(-6), Math.min(rows.length, 6) - 1)}</div>${rows.length > 6 ? `<details class="s4-lab-trace-details"><summary>Show the complete trace (${rows.length} rows)</summary>${table('Complete execution trace', ['Address', 'Instruction', 'ACC', 'IX', 'Next PC', 'Compare', 'Output', 'M[6]'], rows, rows.length - 1)}</details>` : ''}`;
    }
    if (type === 'bits' && v.visible) return `<div class="s4-lab-grid">${readout('Outgoing bits', v.outgoing || 'None / not a shift')}${readout('Inserted / wrapped bits', v.inserted || 'None / not a shift')}${readout('Signed left-shift overflow', v.operation === 'ASL' ? v.overflow ? 'Yes: product is out of range' : 'No' : 'Not this operation')}</div>`;
    return '';
  }
  const notes = {
    registerFlow: 'IX supplies an offset; MAR holds the resulting address. A copy leaves its source available. Only the active roles are highlighted.',
    busCycle: 'The data bus reverses direction between read and write. The address bus carries a location number. READ and WRITE are command signals on the control bus.',
    application: 'Hardware reports the event. The handler and operating system complete the appropriate service and choose which task runs next.',
    assemblyStages: 'The binary opcode and field lengths belong to this illustrative processor. The 9618 instruction table specifies mnemonic meanings and operand forms.',
    deviceControl: 'Eight bits are numbered 7 to 0 from left to right. The model assumes one readable, writable device register at address 900.',
    memory: 'Model: one shared memory contains instructions and data. Instructions are shown as readable mnemonics, standing for encoded machine words. The write experiment changes data location 6 only. Green marks the selected memory location.',
    cpu: 'This is a simplified Von Neumann teaching model. The IAS is main memory outside the CPU. Registers are inside it. These stages explain roles; they are not measured timings or a complete circuit design.',
    fetch: 'Each instruction occupies one location. Addresses and register values are denary. Readable instructions stand for machine words. The model shows one valid order for fetch transfers and updates the zero flag after arithmetic. In memory, a green fill marks the selected address. An amber outline marks the address of the current instruction.',
    interrupt: 'Enabled requests of sufficient priority are accepted only at an instruction boundary in this model. The example saves PC, ACC and the status flags; a real context includes whatever other state the ISR may change. ISR address 200 and its service steps are illustrative.',
    assembler: 'Illustrative fixed-length encoding: each word is 16 bits. Instructions use an 8-bit opcode plus an 8-bit address; data use all 16 bits. DATA is a teaching label in the model, displayed as a value declaration in the listing. These opcode bit patterns are not an official examination instruction encoding.',
    addressing: 'All addresses are denary. Immediate supplies a value; direct, indirect and indexed load data. The relative example calculates a branch target from a stated, already-incremented PC base. No invented relative mnemonic is used.',
    trace: 'One click executes one whole instruction. Comparison changes only on CMP or CMI; JPN uses that result. Register values are denary. OUT produces an ASCII character. END stops this program and returns control to the operating system.',
    bits: 'All words are exactly 8 bits. Logical shifts discard outgoing bits; arithmetic right copies the sign bit; cyclic shifts wrap bits. Arithmetic left has the same bit movement as logical left but requires signed overflow checking. ASL, ASR, ROL and ROR are descriptive operation labels here, not additional mnemonics in the supplied Cambridge instruction set; LSL and LSR are supplied mnemonics. Changing a setting restarts from the original byte.',
    performance: 'Abstract comparison only, not real device timings or a benchmark. Assume ideal parallel work, no coordination overhead, comparable work per clock, no overlap between the three phases, and fixed access costs of 1 unit per cache hit and 5 per miss. A larger cache helps only when it improves useful hit rate. Processor designs can do different work per clock; compare a specified workload.',
    ports: 'The examples assume compatible ports, signals and cables. USB capabilities vary by version and device. A display adapter may need active signal conversion. A physical connector fitting is not sufficient evidence of compatibility.',
  };
  function render(state, canBack = false, controls = null, playing = false) {
    const v = M.view(state), type = state.type;
    const changes = v.changes.length ? `<div class="s4-lab-grid" aria-label="Values changed during this step">${v.changes.map(({ name, from, to }) => readout(name, `${from} → ${to}`, true)).join('')}</div>` : '';
    const fields = settings(type, state.config, controls);
    return `${fields}<div class="s4-lab-visual" tabindex="0" role="region" aria-label="Interactive ${escape(type)} diagram; scroll horizontally if needed">${visuals[type](v)}</div>${changes}<div class="s4-lab-progress"><strong>${escape(v.title)}</strong><span>Step ${v.step} / ${v.total}</span></div><p class="s4-lab-status" role="status" aria-live="polite" aria-atomic="true">${escape(v.message)}</p><div class="s4-lab-controls">${button('play', playing ? 'Pause' : 'Play', v.complete)}${button('back', 'Previous step', !canBack)}${button('step', v.complete ? 'Complete' : ['bits', 'ports', 'performance'].includes(type) && v.step === v.total - 1 ? 'Reveal and explain' : 'Next step', v.complete)}${button('reset', 'Restart this experiment')}</div>${extra(type, v)}${note(type === 'memory' && !state.config.showInstructions ? 'Addresses identify storage locations. A read copies a value; a write replaces it. Reading does not empty a location. Green marks the selected location.' : notes[type])}${fields ? note('Changing a setting restarts this experiment. Predict the change before stepping again.') : ''}`;
  }
  const configured = (type, config = {}) => Object.entries(config).reduce((state, [key, value]) => M.labAction(state, key, value), M.createLab(type));
  const api = {
    initialMarkup(type, config = {}, controls = null) {
      if (!M.kinds.includes(type)) return '';
      const state = configured(type, config);
      const frames = M.frames(state);
      const steps = frames.map(f => `<li><strong>${escape(f.title)}</strong> ${escape(f.message)}</li>`).join('');
      const selected = [...new Set([Math.ceil((frames.length - 1) / 2), frames.length - 1])].filter(i => i > 0);
      const snapshots = selected.map(i => {
        const v = M.view({ ...state, step: i });
        return `<figure class="s4-nojs-frame">${visuals[type](v)}<figcaption>Step ${i}: ${escape(v.title)}</figcaption></figure>`;
      }).join('');
      return render(state, false, controls) + `<noscript><details open><summary>Worked sequence and key states</summary>${snapshots}<ol>${steps}</ol></details></noscript>`;
    },
    initialVisual(type, config = {}) { return M.kinds.includes(type) ? visuals[type](M.view(configured(type, config))) : ''; },
    render,
  };
  if (typeof window === 'undefined') { module.exports = api; return; }
  function initialise(root) {
    if (root.dataset.s4Ready || !M.kinds.includes(root.dataset.s4Lab)) return;
    const type = root.dataset.s4Lab;
    root.dataset.s4Ready = 'true'; root.classList.add('s4-lab');
    const config = JSON.parse(root.dataset.s4Config || '{}'), controls = root.dataset.s4Controls ? JSON.parse(root.dataset.s4Controls) : null;
    let state = configured(type, config), history = [], timer = null;
    const stop = () => { if (timer !== null) window.clearInterval(timer); timer = null; };
    const draw = () => {
      const focused = root.contains(document.activeElement) ? document.activeElement : null;
      const action = focused?.dataset.s4Action, setting = focused?.dataset.s4Setting;
      root.innerHTML = render(state, history.length > 0, controls, timer !== null);
      if (action || setting) {
        const target = root.querySelector(action ? `[data-s4-action="${action}"]` : `[data-s4-setting="${setting}"]`);
        if (target && !target.disabled) target.focus({ preventScroll: true });
        else { const status = root.querySelector('.s4-lab-status'); status.tabIndex = -1; status.focus({ preventScroll: true }); }
      }
    };
    const apply = (action, value, setting = false) => {
      if (action === 'back') { if (history.length) state = history.pop(); }
      else if (action === 'reset') { state = M.labAction(state, action); history = []; }
      else { const next = M.labAction(state, action, value); if (setting) history = []; else history.push(state); state = next; }
      draw();
    };
    root.addEventListener('click', event => {
      const control = event.target.closest('[data-s4-action]');
      if (!control || !root.contains(control) || control.disabled) return;
      if (control.dataset.s4Action === 'play') {
        if (timer !== null) stop();
        else timer = window.setInterval(() => {
          if (document.hidden || !root.isConnected || !root.getClientRects().length) { stop(); draw(); return; }
          history.push(state);
          state = M.labAction(state, 'step');
          if (M.view(state).complete) stop();
          draw();
        }, 1400);
        draw();
      } else { stop(); apply(control.dataset.s4Action); }
    });
    root.addEventListener('change', event => {
      const control = event.target.closest('[data-s4-setting]');
      if (control && root.contains(control)) { stop(); apply(control.dataset.s4Setting, control.value, true); }
    });
    document.addEventListener('s4:leave', () => { if (timer !== null) { stop(); draw(); } });
    root.addEventListener('s4:reset', () => { stop(); apply('reset'); });
    draw();
  }
  api.initialiseAll = () => document.querySelectorAll('[data-s4-lab]').forEach(initialise);
  window.Section4Labs = api;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', api.initialiseAll, { once: true });
  else api.initialiseAll();
})();
