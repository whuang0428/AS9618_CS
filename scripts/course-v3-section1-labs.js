/* Local Section 1 experiments: explicit prediction, reveal, reversible steps and reset. */
(() => {
  'use strict';
  const M = window.Section1Models;
  if (!M) return;
  const labs = [...document.querySelectorAll('.s1-lab')], sessions = new WeakMap(), originals = new WeakMap();
  const get = (lab, role) => lab.querySelector(`[data-s1-role="${role}"]`);
  const value = (lab, role) => get(lab, role).value;
  const number = (lab, role) => { const raw = value(lab, role).trim(); if (raw === '' || !Number.isFinite(Number(raw))) throw new RangeError('Complete every numeric field used by this example.'); return Number(raw); };
  const esc = text => String(text).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const table = (headers, rows) => `<table class="s1-lab-table"><thead><tr>${headers.map(label => `<th scope="col">${esc(label)}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map(cell => `<td>${esc(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
  const metrics = entries => `<div class="s1-lab-metrics">${Object.entries(entries).map(([label, item]) => `<span>${esc(label)}<b>${esc(item)}</b></span>`).join('')}</div>`;
  const fmt = number => Number.isInteger(number) ? String(number) : Number(number.toFixed(4)).toString();
  const status = (lab, message, rejected = false) => { get(lab, 'status').textContent = message; get(lab, 'status').dataset.rejected = String(rejected); };
  const gray = (index, levels) => `rgb(${Math.round(index * 255 / (levels - 1))} ${Math.round(index * 255 / (levels - 1))} ${Math.round(index * 255 / (levels - 1))})`;
  const swatches = values => `<div class="s1-lab-swatches">${values.map(value => `<div class="s1-lab-swatch"><span style="background:rgb(${value} ${value} ${value})"></span>${value}</div>`).join('')}</div>`;

  function configure(lab) {
    const options = JSON.parse(lab.dataset.s1Config || '{}');
    Object.entries(options).forEach(([role, item]) => { const field = get(lab, role); if (field) field.value = String(item); });
    const topic = lab.dataset.s1Topic, type = lab.dataset.lab;
    const showOnly = roles => lab.querySelectorAll('.s1-lab-inputs label').forEach(label => { label.hidden = !roles.includes(label.querySelector('[data-s1-role]').dataset.s1Role); });
    if (type === 'bits' && topic === 'combinations') {
      showOnly(['width']);
      lab.querySelector('h3').textContent = 'Make a different pattern';
      lab.querySelector('.s1-lab-intro').textContent = 'Each bit can be 0 or 1. Flip bits to make different patterns, then predict how many patterns are possible.';
    }
    if (type === 'conversion' && topic === 'binary') {
      for (const role of ['from', 'to']) get(lab, role).querySelector('option[value="16"]').remove();
      lab.querySelector(':scope > .s1-lab-note').textContent = 'This model handles non-negative whole numbers up to 65535. The value is unchanged when you rewrite it in another base.';
    }
    if (type === 'signed' && ['ones', 'twos'].includes(topic)) {
      if (!options.mode) get(lab, 'mode').value = topic === 'twos' ? 'encode' : 'interpret';
      showOnly(get(lab, 'mode').value === 'encode' ? ['width', 'signed-value'] : ['pattern']);
      if (topic === 'ones') { lab.querySelector(':scope > .s1-lab-note').textContent = 'One’s complement inverts each bit to represent the corresponding negative value. All 1s represents negative zero.'; lab.querySelector('h3').textContent = 'Build a one’s complement pattern'; lab.querySelector('.s1-lab-intro').textContent = 'Keep the chosen width. Write the magnitude, then invert each bit for a negative value.'; }
    }
    if (type === 'arithmetic' && ['addition', 'subtraction'].includes(topic)) {
      showOnly(['width', 'a', 'b', ...(topic === 'addition' ? ['third'] : [])]);
      lab.querySelector(':scope > .s1-lab-note').textContent = topic === 'addition' ? 'Work from right to left. A carry moves to the next position, whose weight is twice as large.' : 'Borrowing from the next position provides two units in the current position.';
    }
    if (type === 'arithmetic' && topic === 'signed') showOnly(['width', 'operation', 'a', 'b', 'third']);
    if (type === 'characters' && topic === 'ascii') lab.querySelector(':scope > .s1-lab-note').textContent = 'Standard ASCII defines 128 codes using 7 bits, including control codes. This experiment uses printable codes 32–126. In an 8-bit byte, these codes have a leading zero.';
    if (type === 'characters' && ['extended', 'unicode'].includes(topic)) showOnly([]);
    if (type === 'bitmap') {
      if (topic === 'structure') showOnly([]);
      if (topic === 'depth') showOnly(['depth']);
      if (topic === 'resolution') showOnly(['size']);
      if (topic && topic !== 'size') lab.querySelector(':scope > .s1-lab-note').textContent = topic === 'structure' ? 'Each cell is one pixel. The stored code selects a colour; the visible picture is reconstructed from those codes.' : topic === 'depth' ? 'The number of available colour codes depends on the number of bits stored for each pixel.' : 'Changing the grid changes how many pixels represent the same display area. This model starts a fresh grid when settings change.';
    }
    if (type === 'vector' && topic === 'list') showOnly([]);
    if (type === 'sampling') {
      if (topic === 'process') showOnly([]);
      if (topic === 'rate') showOnly(['rate']);
      if (topic === 'resolution') showOnly(['depth']);
    }
    if (!lab.querySelector('.s1-lab-inputs label:not([hidden])')) lab.querySelector('.s1-lab-setup').hidden = true;
  }

  function prepare(lab) {
    const type = lab.dataset.lab, s = { revealed: false, index: 0 };
    if (type === 'bits') {
      const width = number(lab, 'width'), starting = number(lab, 'value');
      const safeValue = lab.dataset.s1Topic === 'combinations' ? starting % 2 ** width : starting;
      s.data = M.bitsModel(width, safeValue);
      get(lab, 'value').value = String(safeValue);
    }
    if (type === 'conversion') s.trace = M.conversionTrace(value(lab, 'numeral'), number(lab, 'from'), number(lab, 'to'));
    if (type === 'bcd') s.trace = M.bcdTrace(value(lab, value(lab, 'mode') === 'encode' ? 'digits' : 'codes'), value(lab, 'mode'));
    if (type === 'signed') {
      if (value(lab, 'mode') === 'encode') s.trace = (lab.dataset.s1Topic === 'ones' ? M.onesTrace : M.twosTrace)(number(lab, 'signed-value'), number(lab, 'width'));
      else s.data = M.signedModel(value(lab, 'pattern').trim());
    }
    if (type === 'arithmetic') s.trace = M.arithmeticTrace(number(lab, 'a'), number(lab, 'b'), number(lab, 'width'), value(lab, 'operation'), value(lab, 'representation') === 'signed', value(lab, 'third').trim() === '' ? null : number(lab, 'third'));
    if (type === 'characters') s.data = ['extended', 'unicode'].includes(lab.dataset.s1Topic) ? [] : value(lab, 'mode') === 'encode' ? M.asciiEncode(value(lab, 'text'), number(lab, 'ascii-width')) : M.asciiDecode(value(lab, 'codes'));
    if (type === 'bitmap') { s.data = M.bitmapModel(number(lab, 'size'), number(lab, 'size'), number(lab, 'depth')); s.pixels = Array.from({ length: s.data.pixels }, (_, i) => { const x = i % s.data.width, y = Math.floor(i / s.data.width); return x === y || x + y === s.data.width - 1 ? s.data.colours - 1 : 0; }); s.paint = s.data.colours - 1; }
    if (type === 'vector') s.data = M.vectorModel(number(lab, 'scale'));
    if (type === 'sampling') s.data = M.samplingModel(number(lab, 'rate'), number(lab, 'depth'), number(lab, 'duration'), number(lab, 'channels'));
    if (type === 'rle') {
      s.data = M.rleEncode(value(lab, 'text'), number(lab, 'count-bits'));
      s.trace = [{ title: 'Read the source', line: s.data.text, why: 'Scan from left to right. Count only consecutive identical symbols.', stage: 'source' },
        ...s.data.runs.map((run, i) => ({ title: `Store run ${i + 1}`, line: `(${run.count}, ${run.symbol})`, why: `${run.count} consecutive ${run.symbol}${run.count === s.data.maximum ? ` reach the ${s.data.countBits}-bit count limit; any following ${run.symbol} starts a new pair` : ' form this run'}.`, runIndex: i, stage: 'pairs' })),
        { title: 'Decode the pairs', line: M.rleDecode(s.data.runs, s.data.countBits), why: 'Repeat each symbol by its stored count, then join the runs in order. The original data is restored exactly.', stage: 'decode' },
        { title: 'Count all stored fields', line: `${s.data.runs.length} × (${s.data.countBits} + ${s.data.symbolBits}) = ${s.data.encodedBits} bits`, why: `${s.data.originalBits} original bits → ${s.data.encodedBits} encoded bits. ${s.data.encodedBits < s.data.originalBits ? 'Long runs save more symbol fields than the counts cost.' : 'The count fields cost at least as much as the repeated symbol fields saved.'}`, stage: 'size' }];
    }
    if (type === 'lossy') {
      const raw = value(lab, 'values').split(',').map(part => part.trim());
      if (raw.some(part => part === '')) throw new RangeError('Enter comma-separated numbers with no empty fields.');
      s.data = M.lossyModel(raw.map(Number), number(lab, 'depth'));
      s.trace = [{ title: 'Read the original samples', line: 'One 8-bit value per sample', why: 'The original values can use any whole number from 0 to 255.', stage: 'source' },
        { title: 'Map to fewer levels', line: `${s.data.depth} bits give ${s.data.levels} available codes`, why: 'Round each original value to the nearest available level. Multiple original values can produce the same code.', stage: 'encode' },
        { title: 'Restore values from the saved codes', line: 'Only the shorter codes remain', why: 'Each saved code restores to one representative value. Its original value cannot in general be recovered exactly.', stage: 'restore' },
        { title: 'Compare the data and the cost', line: `${s.data.originalBits} bits → ${s.data.encodedBits} bits`, why: s.data.depth === 8 ? 'At 8 bits in this model, all original values are preserved. No size reduction or quantisation loss occurs.' : 'Fewer bits reduce the payload, but any discarded differences are lost. Check the signed error for each sample.', stage: 'compare' }];
    }
    if (s.trace) s.revealed = true;
    s.settings = Object.fromEntries([...lab.querySelectorAll('input[data-s1-role],select[data-s1-role]')].map(field => [field.dataset.s1Role, field.value]));
    sessions.set(lab, s); draw(lab);
  }

  function samplingSvg(data, revealed) {
    const x = time => 58 + time * 620, y = amplitude => 240 - amplitude * 190;
    const source = Array.from({ length: 241 }, (_, i) => `${x(i / 240)},${y(.5 + .4 * Math.sin(4 * Math.PI * i / 240))}`).join(' ');
    const samples = data.samples.filter(sample => sample.time < 1);
    const levelIndices = data.levels <= 16 ? Array.from({ length: data.levels }, (_, i) => i) : [0, Math.floor((data.levels - 1) / 2), data.levels - 1];
    return `<svg viewBox="0 0 730 300" role="img" aria-label="Source waveform and ${revealed ? 'quantised sample points' : 'equally spaced measurement times'}. Blue is the source; orange is the stored sample."><text x="12" y="23" font-size="17">Amplitude (0–1)</text>${[0, .5, 1].map(amplitude => `<text x="49" y="${y(amplitude) + 5}" text-anchor="end" font-size="16">${amplitude}</text>`).join('')}${revealed ? levelIndices.map(level => `<line x1="58" x2="678" y1="${y(level / (data.levels - 1))}" y2="${y(level / (data.levels - 1))}" stroke="#dbe5ed"/>`).join('') : ''}<line x1="58" x2="678" y1="240" y2="240" stroke="#536c81"/><polyline points="${source}" fill="none" stroke="#286295" stroke-width="3"/>${samples.map(sample => `<line x1="${x(sample.time)}" x2="${x(sample.time)}" y1="245" y2="${revealed ? y(sample.quantized) : 255}" stroke="${revealed ? '#bd711a' : '#8a5e1d'}" stroke-width="${data.rate > 32 ? 1 : 2}"/>${revealed ? `<circle cx="${x(sample.time)}" cy="${y(sample.quantized)}" r="4" fill="#bd711a"/>` : ''}`).join('')}<text x="58" y="280" font-size="17">0 s</text><text x="357" y="280" font-size="17">0.5 s</text><text x="650" y="280" font-size="17">1 s</text><text x="280" y="23" font-size="17">Blue: source · Orange: ${revealed ? 'stored samples' : 'measurement times'}</text></svg>`;
  }

  function draw(lab) {
    const s = sessions.get(lab), type = lab.dataset.lab, topic = lab.dataset.s1Topic, d = s.data, display = get(lab, 'display');
    const reveal = lab.querySelector('[data-s1-action="reveal"]'), previous = lab.querySelector('[data-s1-action="previous"]'), next = lab.querySelector('[data-s1-action="next"]');
    previous.hidden = next.hidden = !s.trace;
    previous.disabled = !s.trace || s.index === 0;
    next.disabled = !s.trace || !s.revealed || s.index === s.trace.length - 1;
    reveal.disabled = s.revealed;
    reveal.textContent = s.trace ? 'Reveal this step' : 'Reveal result';
    get(lab, 'progress').textContent = s.trace ? `Step ${s.index + 1} of ${s.trace.length}` : s.revealed ? 'Result revealed · change an input to predict again' : 'Result hidden · make a prediction first';
    let prediction = '', line = '', why = '', html = '';
    if (s.trace) {
      const frame = s.trace[s.index], visible = s.revealed ? frame : s.trace[Math.max(0, s.index - 1)];
      prediction = s.revealed ? s.index === s.trace.length - 1 ? 'Change the example. Which parts of the result should change?' : 'Explain this step, then predict the next one.' : `${frame.title}: what should happen next?`;
      line = s.revealed ? `${frame.title}: ${frame.line}` : `${frame.title} · predict before revealing`;
      why = s.revealed ? frame.why : 'The display keeps the previous state until you reveal this step.';
      if (type === 'arithmetic') html = `<div class="s1-arithmetic" aria-label="Binary operands and the result built so far">${visible.patterns.map(pattern => `<div class="s1-arithmetic-row">${[...pattern].map((bit, i) => `<span${i === visible.focus ? ' class="is-focus"' : ''}>${bit}</span>`).join('')}</div>`).join('')}<div class="s1-arithmetic-row is-result">${[...visible.partial].map((bit, i) => `<span${i === visible.focus ? ' class="is-focus"' : ''}>${bit}</span>`).join('')}</div></div>${visible.overflow !== undefined ? metrics({ 'Exact answer': visible.exact, 'Stored interpretation': visible.interpreted, Overflow: visible.overflow ? 'Yes' : 'No', 'Carry-out': visible.carry, 'Final borrow': visible.borrow }) : ''}`;
      if (type === 'conversion') html = `<div class="s1-lab-explanation"><strong>${esc(s.settings.numeral.toUpperCase())}<sub>${esc(s.settings.from)}</sub> → ${visible.result !== undefined ? esc(visible.result) : '?' }<sub>${esc(s.settings.to)}</sub></strong>${visible.remainders ? `<p>Remainders, first recorded to last: ${visible.remainders.map(esc).join(' → ')}</p>` : ''}</div>`;
      if (type === 'bcd') {
        const total = visible.direction === 'encode' ? visible.digits.length : visible.groups.length;
        html = table(['Digit position', 'Decimal digit', 'Four-bit BCD group'], Array.from({ length: total }, (_, i) => [i + 1, visible.digits[i] ?? '?', visible.groups[i] ?? '?']));
        if (visible.result !== undefined) html += metrics({ 'BCD': visible.groups.join(' '), 'Decimal digits': visible.digits.join(''), 'Ordinary unsigned binary': visible.unsignedBinary });
      }
      if (type === 'signed') html = `<div class="s1-arithmetic"><div class="s1-arithmetic-row">${[...(visible.pattern || '·'.repeat(Number(s.settings.width)))].map(bit => `<span>${bit}</span>`).join('')}</div></div>`;
      if (type === 'rle') {
        const count = visible.stage === 'source' ? 0 : visible.stage === 'pairs' ? visible.runIndex + 1 : d.runs.length;
        html = `<p class="s1-lab-long"><strong>Source:</strong> ${esc(d.text)}</p><div class="s1-runs">${d.runs.slice(0, count).map(run => `<span>(${run.count}, ${run.symbol})</span>`).join('')}</div>${['decode', 'size'].includes(visible.stage) ? `<p class="s1-lab-long"><strong>Restored:</strong> ${esc(d.restored)}</p>` : ''}${visible.stage === 'size' ? metrics({ 'Original bits': d.originalBits, 'Encoded bits': d.encodedBits, 'Bits per pair': d.countBits + d.symbolBits }) : ''}`;
      }
      if (type === 'lossy') html = `<p><strong>Original 8-bit samples</strong></p>${swatches(d.values)}${visible.stage !== 'source' ? `<p><strong>Saved ${d.depth}-bit codes:</strong> ${d.codes.map(code => M.binary(code, d.depth)).join(' ')}</p>` : ''}${['restore', 'compare'].includes(visible.stage) ? `<p><strong>Restored samples</strong></p>${swatches(d.restored)}` : ''}${visible.stage === 'compare' ? `<p><strong>Error (restored − original):</strong> ${d.errors.map(error => error > 0 ? `+${error}` : error).join(', ')}</p>${metrics({ 'Original bits': d.originalBits, 'Encoded bits': d.encodedBits })}` : ''}`;
    } else if (type === 'bits') {
      const combinationsOnly = topic === 'combinations';
      prediction = combinationsOnly ? `How many different patterns can these bits make? Does ${'0'.repeat(d.width)} count?` : 'Which place weights are switched on? What is their sum?';
      html = `<div class="s1-bit-row">${d.places.map((place, i) => `<div class="s1-bit-cell">${combinationsOnly ? `<small>Bit ${i + 1}</small>` : `<small>2<sup>${place.power}</sup> = ${place.weight}</small>`}<button type="button" data-s1-action="flip" data-index="${i}" aria-label="Flip bit ${i + 1}${combinationsOnly ? '' : ` with weight ${place.weight}`}" aria-pressed="${place.bit === 1}">${place.bit}</button>${!combinationsOnly && s.revealed ? `<small>+ ${place.contribution}</small>` : ''}</div>`).join('')}</div>${metrics(combinationsOnly ? { Bits: d.width, Patterns: s.revealed ? d.combinations : '?' } : { 'Denary value': s.revealed ? d.value : '?', 'Possible patterns': s.revealed ? d.combinations : '?', 'Largest unsigned value': s.revealed ? d.maximum : '?' })}`;
      line = s.revealed ? combinationsOnly ? `2^${d.width} = ${d.combinations} patterns` : `${d.places.filter(place => place.bit).map(place => place.weight).join(' + ') || '0'} = ${d.value}` : 'Every bit has two possible states.';
      why = combinationsOnly ? 'For each existing pattern, another bit can be 0 or 1, doubling the total.' : s.revealed ? `There are ${d.combinations} patterns but the largest value is ${d.maximum}: counting starts at zero.` : 'Flip a bit, predict the effect and reveal the sum.';
    } else if (type === 'signed') {
      prediction = 'Does this pattern represent a positive value, a negative value, or zero under each rule?';
      const rows = [['Unsigned', d.unsigned, d.unsignedRange], ['One’s complement', d.ones, d.onesRange], ['Two’s complement', d.twos, d.twosRange]].filter(row => topic === 'ones' ? row[0] !== 'Two’s complement' : topic === 'twos' ? row[0] !== 'One’s complement' : true);
      html = `<p><strong>Unchanged pattern: <code>${esc(d.pattern)}</code></strong></p>${table(['Rule', 'Value', 'Range'], rows.map(([rule, result, range]) => [rule, s.revealed ? result : '?', s.revealed ? `${range[0]} to ${range[1]}` : '?']))}`;
      line = s.revealed ? 'The bits did not change; the interpretation rule did.' : 'Choose a rule before interpreting a pattern.';
      why = s.revealed ? topic === 'ones' ? 'For a one’s complement pattern starting with 1, invert every bit to find its magnitude. All 1s becomes zero, giving −0.' : 'Unsigned uses positive place weights. One’s complement inverts negative magnitudes; two’s complement gives the leading bit a negative weight.' : 'A leading 1 alone does not mean “negative” unless the representation rule assigns that meaning.';
    } else if (type === 'characters') {
      if (topic === 'extended') {
        prediction = 'Would the same 8-bit byte always decode to the same character without naming its encoding?';
        html = table(['Byte', 'Windows-1252', 'ISO-8859-1'], [['10000000 (80 hex)', s.revealed ? '€ (euro sign)' : '?', s.revealed ? 'U+0080 control character' : '?']]);
        line = 'An 8-bit pattern alone does not identify the character set.';
        why = s.revealed ? '“Extended ASCII” is not one universal mapping. These named encodings agree on standard ASCII positions but differ at this byte.' : 'Predict the effect of choosing the wrong decoding table.';
      } else if (topic === 'unicode') {
        prediction = 'If the Unicode code point is fixed, must every Unicode encoding store it using the same number of bytes?';
        html = table(['Character', 'Unicode code point', 'UTF-8 bytes', 'UTF-16 code unit'], [['A', 'U+0041', s.revealed ? '41 (1 byte)' : '?', s.revealed ? '0041 (2 bytes)' : '?'], ['€', 'U+20AC', s.revealed ? 'E2 82 AC (3 bytes)' : '?', s.revealed ? '20AC (2 bytes)' : '?']]);
        line = 'A code point and its encoded bytes are different things.';
        why = s.revealed ? 'These examples exclude a byte-order mark. Other code points can require two UTF-16 code units. Unicode supports many scripts; it is not a universal fixed 16-bit storage scheme.' : 'Compare the code-point label with the bytes required by each encoding.';
      } else {
        const encode = s.settings.mode === 'encode';
        prediction = encode ? 'Which numeric code represents each character? Is the code for the character “1” the numeric value 1?' : 'Use the code value as a lookup key. Which character does each group represent?';
        html = table(['Character', 'Denary code', 'Binary code', 'Hex code'], d.map(row => [encode || s.revealed ? row.char === ' ' ? '(space)' : row.char : '?', s.revealed ? row.decimal : '?', !encode || s.revealed ? row.bits : '?', s.revealed ? row.hex : '?']));
        line = s.revealed ? 'Encoding and decoding use the same agreed mapping.' : 'Character → numeric code → stored bits';
        why = s.revealed ? 'For example, ASCII “1” has code 49. The text character “1” and the numerical value 1 have different meanings.' : 'The binary code records the table entry; it does not describe the letter’s outline.';
      }
    } else if (type === 'bitmap') {
      prediction = topic === 'structure' ? 'Which code is stored for a black pixel? Which code selects the lightest colour?' : topic === 'depth' ? 'How many different colour codes fit in the chosen number of bits?' : topic === 'resolution' ? 'What happens to the number of pixels when both dimensions double?' : 'Does repainting a pixel change this fixed-depth raw size? What if width or depth changes?';
      html = `<div class="s1-lab-columns${d.width > 8 ? ' is-pixel-dense' : ''}"><div class="s1-pixel-grid" style="grid-template-columns:repeat(${d.width},1fr)">${s.pixels.map((pixel, index) => `<button type="button" data-s1-action="paint" data-index="${index}" style="background:${gray(pixel, d.colours)}" aria-label="Pixel row ${Math.floor(index / d.width) + 1}, column ${index % d.width + 1}, code ${M.binary(pixel, d.depth)}"></button>`).join('')}</div><div><strong>Choose a colour, then paint</strong><div class="s1-palette">${Array.from({ length: d.colours }, (_, index) => `<button type="button" data-s1-action="colour" data-colour="${index}" style="background:${gray(index, d.colours)}" aria-label="Paint code ${M.binary(index, d.depth)}" aria-pressed="${s.paint === index}"></button>`).join('')}</div><p>Selected code: <code>${M.binary(s.paint, d.depth)}</code></p>${metrics({ 'Grid': `${d.width} × ${d.height}`, ...(topic === 'structure' ? {} : { 'Bits per pixel': d.depth }), ...(topic === 'resolution' ? {} : { Colours: s.revealed ? d.colours : '?' }), ...(topic && topic !== 'size' ? {} : { 'Raw bits': s.revealed ? d.bits : '?', 'Raw bytes': s.revealed ? d.bytes : '?' }) })}</div></div>`;
      line = !s.revealed ? 'One stored colour code per pixel.' : topic === 'depth' || topic === 'structure' ? `${d.depth} bit${d.depth === 1 ? '' : 's'} → ${d.colours} colour codes` : topic === 'resolution' ? `${d.width} × ${d.height} = ${d.pixels} pixels` : `${d.width} × ${d.height} × ${d.depth} = ${d.bits} bits; ÷ 8 = ${d.bytes} bytes`;
      why = topic === 'resolution' ? 'Doubling width and height creates four times as many pixels in the same display area.' : topic === 'structure' ? 'The position identifies a cell; the code selects its colour.' : topic === 'depth' ? 'An extra bit doubles the number of available colour codes.' : 'Every pixel uses the selected fixed number of bits, even when many pixels share a colour.';
    } else if (type === 'vector') {
      prediction = topic === 'list' ? 'Which properties are needed to reconstruct each object?' : 'If the scale doubles, what happens to the rectangle width, circle radius and object count?';
      const objects = s.revealed ? d.objects : d.original, scale = s.revealed ? d.scale : 1;
      html = `<div class="s1-lab-columns"><svg viewBox="0 0 380 270" role="img" aria-label="A vector rectangle and circle, scale ${scale}">${objects.map(object => object.type === 'rectangle' ? `<rect x="${object.x}" y="${object.y}" width="${object.width}" height="${object.height}" fill="${object.fill}"/>` : `<circle cx="${object.cx}" cy="${object.cy}" r="${object.r}" fill="${object.fill}"/>`).join('')}</svg><div>${table(['Object', 'Properties'], objects.map(object => [object.type, object.type === 'rectangle' ? `x ${object.x}, y ${object.y}, width ${object.width}, height ${object.height}; fill blue` : `centre (${object.cx}, ${object.cy}), radius ${object.r}; fill orange`]))}${metrics({ 'Object count': 2, 'Displayed scale': `${scale} ×` })}</div></div>`;
      line = 'The stored description contains objects and properties.';
      why = s.revealed ? 'Scaling multiplies geometric coordinates and dimensions. The same two objects can be drawn at the new size; no extra pixel grid is added to this description.' : 'The current drawing shows scale 1. Reveal to apply the chosen scale.';
    } else if (type === 'sampling') {
      prediction = topic === 'rate' ? 'When rate doubles, what changes about time spacing? Do amplitude levels change?' : topic === 'resolution' ? 'When bits per sample increase, do measurements happen more often, or is amplitude represented more precisely?' : topic === 'size' ? 'Which factors multiply to give the raw data size? Why do stereo channels double it?' : 'At each marked time, which available level will be stored?';
      html = samplingSvg(d, s.revealed) + metrics({ 'Rate': `${d.rate} samples/s`, 'Time interval': `${fmt(1 / d.rate)} s`, ...(topic === 'rate' || topic === 'process' ? {} : { 'Levels': s.revealed ? d.levels : '?', 'Bits per sample': d.depth }), ...(topic && topic !== 'size' ? {} : { 'Total samples per channel': s.revealed ? d.count : '?', 'Raw bits': s.revealed ? d.bits : '?', 'Raw bytes': s.revealed ? d.bytes : '?' }) });
      if (s.revealed && topic === 'process') html += `<p><strong>First ${Math.min(8, d.samples.length)} measurements</strong> · values rounded for display</p>${table(['Time (s)', 'Source amplitude', 'Stored amplitude', 'Binary code'], d.samples.slice(0, 8).map(sample => [fmt(sample.time), fmt(sample.amplitude), fmt(sample.quantized), sample.bits]))}`;
      line = s.revealed && (!topic || topic === 'size') ? `${d.rate} × ${d.duration} × ${d.depth} × ${d.channels} = ${d.bits} bits` : 'Measurement times and amplitude levels are independent choices.';
      why = s.revealed ? d.rate === 4 ? 'At 4 samples/s, this 2 Hz sine wave is measured at its midpoint every time. The samples miss its peaks and troughs. Higher rates expose those changes; adding amplitude bits alone cannot recover them.' : topic === 'rate' ? 'More measurements per second reduce the gap between sample times. The available amplitude levels remain unchanged.' : topic === 'resolution' ? 'More bits give more amplitude levels and a smaller quantisation step. The sample times remain unchanged.' : 'Each orange point stores the nearest available amplitude code at that time. The smooth blue source is not itself stored.' : 'First predict, then reveal the quantised sample points.';
    }
    display.innerHTML = html;
    if (s.dirty) {
      reveal.disabled = previous.disabled = next.disabled = true;
      line = 'Inputs changed · select Apply settings';
      why = 'The displayed example still uses the previous settings. Apply your changes before revealing or stepping.';
      get(lab, 'progress').textContent = 'Edited settings have not been applied.';
    }
    get(lab, 'prediction').innerHTML = `<strong>Predict:</strong> ${esc(prediction)}`;
    get(lab, 'line').textContent = line;
    status(lab, why);
  }

  function reset(lab) { lab.innerHTML = originals.get(lab); configure(lab); prepare(lab); }
  labs.forEach(lab => { originals.set(lab, lab.innerHTML); try { configure(lab); prepare(lab); } catch (error) { status(lab, error.message, true); } });
  document.addEventListener('click', event => {
    const button = event.target.closest('.s1-lab [data-s1-action]');
    if (!button) return;
    const lab = button.closest('.s1-lab'), s = sessions.get(lab), action = button.dataset.s1Action;
    try {
      if (action === 'reset') { reset(lab); return; }
      if (action === 'prepare') { prepare(lab); lab.querySelector('.s1-lab-setup').open = false; return; }
      if (!s) return;
      if (action === 'reveal') s.revealed = true;
      if (action === 'next' && s.trace && s.revealed && s.index < s.trace.length - 1) { s.index++; s.revealed = false; }
      if (action === 'previous' && s.trace && s.index > 0) { s.index--; s.revealed = true; }
      if (action === 'flip') { const position = s.data.width - Number(button.dataset.index) - 1; const newValue = s.data.value ^ (2 ** position); get(lab, 'value').value = newValue; s.data = M.bitsModel(s.data.width, newValue); s.revealed = false; }
      if (action === 'colour') { s.paint = Number(button.dataset.colour); s.revealed = false; }
      if (action === 'paint') { s.pixels[Number(button.dataset.index)] = s.paint; s.revealed = false; }
      draw(lab);
      if (['flip', 'colour', 'paint'].includes(action)) {
        const key = action === 'colour' ? 'colour' : 'index';
        lab.querySelector(`[data-s1-action="${action}"][data-${key}="${button.dataset[key]}"]`)?.focus({ preventScroll: true });
      }
    } catch (error) {
      if (s) { s.dirty = true; s.revealed = false; s.index = 0; draw(lab); }
      status(lab, error.message, true);
    }
  });
  const markDirty = event => {
    const lab = event.target.closest('.s1-lab');
    if (lab && event.target.matches('input, select')) {
      const s = sessions.get(lab);
      if (s) { s.dirty = true; s.revealed = false; s.index = 0; draw(lab); }
      status(lab, 'Settings edited. Select Apply settings to start the new example.');
    }
  };
  document.addEventListener('input', markDirty);
  document.addEventListener('change', markDirty);
  for (const name of ['s1:reset', 's1:hide']) document.addEventListener(name, event => {
    const target = event.target;
    labs.filter(lab => target === document || target === lab || target.contains(lab)).forEach(lab => {
      try {
        if (name === 's1:reset') reset(lab);
        else { const s = sessions.get(lab); if (s) { s.index = 0; s.revealed = Boolean(s.trace); draw(lab); } }
      } catch (error) { status(lab, error.message, true); }
    });
  });
})();
