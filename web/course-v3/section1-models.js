/* Exact, dependency-free Section 1 models shared by the browser and Node tests. */
const Section1Models = (() => {
  'use strict';
  const integer = (value, min, max, label) => {
    if (!Number.isInteger(value) || value < min || value > max) throw new RangeError(`${label} must be a whole number from ${min} to ${max}.`);
    return value;
  };
  const widthCheck = width => integer(width, 2, 16, 'Bit width');
  const mod = (value, modulus) => ((value % modulus) + modulus) % modulus;
  const binary = (value, width) => mod(value, 2 ** width).toString(2).padStart(width, '0');
  const frame = (title, line, why, extra = {}) => ({ title, line, why, ...extra });

  function bitsModel(width, value) {
    integer(width, 1, 16, 'Bit width'); integer(value, 0, 2 ** width - 1, 'Unsigned value');
    const pattern = binary(value, width);
    return { width, value, pattern, combinations: 2 ** width, maximum: 2 ** width - 1,
      places: [...pattern].map((bit, index) => ({ bit: Number(bit), power: width - index - 1, weight: 2 ** (width - index - 1), contribution: Number(bit) * 2 ** (width - index - 1) })) };
  }

  function parseNumeral(raw, base) {
    if (![2, 10, 16].includes(base)) throw new RangeError('Choose base 2, 10 or 16.');
    const text = String(raw).trim().toUpperCase();
    const valid = { 2: /^[01]{1,16}$/, 10: /^\d{1,5}$/, 16: /^[0-9A-F]{1,4}$/ }[base];
    if (!valid.test(text)) throw new RangeError(`Use only digits belonging to base ${base}, with a value from 0 to 65535.`);
    const value = parseInt(text, base);
    integer(value, 0, 65535, 'Value');
    return { text, value, base };
  }

  function conversionTrace(raw, from, to) {
    const source = parseNumeral(raw, from);
    if (![2, 10, 16].includes(to)) throw new RangeError('Choose base 2, 10 or 16.');
    const result = source.value.toString(to).toUpperCase();
    const trace = [frame('Read the starting numeral', `${source.text} (base ${from}) → ? (base ${to})`, 'The value stays the same; the symbols used to write it may change.', { source: source.text, from, to })];
    if (from === to) {
      trace.push(frame('The base is already correct', `${source.text} (base ${from}) = ${result} (base ${to})`, 'Leading zeroes may be removed without changing the value.', { result, value: source.value }));
      return trace;
    }
    let total = 0;
    [...source.text].forEach((digit, index) => {
      const power = source.text.length - index - 1, digitValue = parseInt(digit, from), contribution = digitValue * from ** power;
      total += contribution;
      trace.push(frame(`Read position ${power}`, `${digit}${digitValue >= 10 ? ` (= ${digitValue})` : ''} × ${from}^${power} = ${contribution}; running total = ${total}`, `This position has weight ${from}^${power} = ${from ** power}. Multiply that weight by the digit value.`, { total, focus: index }));
    });
    if (to !== 10) {
      let dividend = source.value;
      const remainders = [];
      do {
        const quotient = Math.floor(dividend / to), remainder = dividend % to;
        remainders.push(remainder.toString(to).toUpperCase());
        trace.push(frame(`Divide by ${to}`, `${dividend} ÷ ${to} = ${quotient}, remainder ${remainder}${remainder >= 10 ? ` (${remainder.toString(to).toUpperCase()})` : ''}`, 'Record the remainder, then divide the quotient. The first remainder is the least significant digit.', { remainders: [...remainders], quotient }));
        dividend = quotient;
      } while (dividend > 0);
      trace.push(frame('Read remainders from last to first', `${[...remainders].reverse().join('')} (base ${to})`, 'Reversing the remainder order places the highest-weight digit on the left.', { remainders, result, value: source.value }));
    } else trace.push(frame('Combine all contributions', `${source.text} (base ${from}) = ${total} (base 10)`, 'Every digit contributes its digit value multiplied by its position weight.', { result, value: source.value }));
    return trace;
  }

  function signedModel(pattern) {
    if (!/^[01]{2,16}$/.test(pattern)) throw new RangeError('Enter a pattern containing 2–16 binary digits.');
    const width = pattern.length, unsigned = parseInt(pattern, 2), negative = pattern[0] === '1';
    const onesMagnitude = (2 ** width - 1) - unsigned;
    return { pattern, width, unsigned, ones: negative ? onesMagnitude === 0 ? '-0' : -onesMagnitude : unsigned,
      twos: negative ? unsigned - 2 ** width : unsigned,
      unsignedRange: [0, 2 ** width - 1], onesRange: [-(2 ** (width - 1) - 1), 2 ** (width - 1) - 1], twosRange: [-(2 ** (width - 1)), 2 ** (width - 1) - 1] };
  }

  function bcdTrace(raw, mode = 'encode') {
    if (!['encode', 'decode'].includes(mode)) throw new RangeError('Choose BCD encode or decode.');
    let digits, groups;
    if (mode === 'encode') {
      const source = String(raw).trim();
      if (!/^\d{1,8}$/.test(source)) throw new RangeError('Use 1–8 decimal digits for this BCD model.');
      digits = [...source];
      groups = digits.map(digit => Number(digit).toString(2).padStart(4, '0'));
    } else {
      const source = String(raw).replace(/\s/g, '');
      if (!/^[01]{4,32}$/.test(source) || source.length % 4 !== 0) throw new RangeError('Use 1–8 complete groups of four bits for BCD.');
      groups = source.match(/.{4}/g);
      if (groups.some(group => parseInt(group, 2) > 9)) throw new RangeError('Invalid BCD digit: each four-bit group must be 0000–1001 (decimal 0–9). Groups 1010–1111 do not represent decimal digits.');
      digits = groups.map(group => String(parseInt(group, 2)));
    }
    const source = mode === 'encode' ? digits.join('') : groups.join(' ');
    const trace = [frame('Keep the decimal digits separate', `${source} → ?`, mode === 'encode' ? 'BCD encodes each decimal digit separately; it does not convert the whole number into one binary value.' : 'Split the input into groups of exactly four bits, starting at the left.', { direction: mode, digits: mode === 'encode' ? [...digits] : [], groups: mode === 'decode' ? [...groups] : [], source })];
    for (let i = 0; i < digits.length; i++) trace.push(frame(`${mode === 'encode' ? 'Encode' : 'Decode'} digit ${i + 1}`, mode === 'encode' ? `${digits[i]} → ${groups[i]}` : `${groups[i]} → ${digits[i]}`, mode === 'encode' ? `Write decimal digit ${digits[i]} using four bits, including leading zeroes.` : `This four-bit value is ${digits[i]}, which is a valid decimal digit. Preserve its position in the digit sequence.`, { direction: mode, digits: mode === 'encode' ? [...digits] : digits.slice(0, i + 1), groups: mode === 'decode' ? [...groups] : groups.slice(0, i + 1), focus: i, source }));
    const number = Number(digits.join(''));
    trace.push(frame('Join the groups in digit order', `${digits.join('')} ↔ ${groups.join(' ')}`, `BCD stores ${digits.length} decimal digit${digits.length === 1 ? '' : 's'} using ${digits.length * 4} bits. Ordinary unsigned binary represents the whole value ${number} as ${number.toString(2)}; the two rules are different.`, { direction: mode, digits: [...digits], groups: [...groups], source, result: mode === 'encode' ? groups.join(' ') : digits.join(''), unsignedBinary: number.toString(2), number }));
    return trace;
  }

  function twosTrace(value, width) {
    widthCheck(width); integer(value, -(2 ** (width - 1)), 2 ** (width - 1) - 1, 'Signed value');
    const magnitude = binary(Math.abs(value), width), result = binary(value, width);
    const trace = [frame('Fix the number of bits', `${width} bits: −${2 ** (width - 1)} to ${2 ** (width - 1) - 1}`, 'Two’s complement uses a fixed width. Changing the width changes the representable range.')];
    if (value >= 0) trace.push(frame('Write a non-negative value', result, 'Write the value in binary and pad with leading zeroes to the chosen width.', { pattern: result }));
    else {
      const inverted = [...magnitude].map(bit => bit === '1' ? '0' : '1').join('');
      trace.push(frame('Write the magnitude as an unsigned pattern', magnitude, `The magnitude is ${Math.abs(value)}. At the minimum signed value, this intermediate pattern is unsigned; it is not a positive signed value at this width.`, { pattern: magnitude }));
      trace.push(frame('Invert every bit', inverted, 'Change 0 to 1 and 1 to 0, keeping the same width.', { pattern: inverted }));
      trace.push(frame('Add one at the same width', `${inverted} + 1 = ${result}`, 'Keep exactly the chosen number of bits.', { pattern: result }));
    }
    trace.push(frame('Check with the negative leading weight', `${result} → ${value}`, `The leftmost weight is −${2 ** (width - 1)}; the remaining weights are positive. Add only the weights whose bits are 1.`, { pattern: result, value }));
    return trace;
  }

  function onesTrace(value, width) {
    widthCheck(width); integer(value, -(2 ** (width - 1) - 1), 2 ** (width - 1) - 1, 'Signed value');
    const magnitude = binary(Math.abs(value), width);
    const result = value < 0 ? [...magnitude].map(bit => bit === '1' ? '0' : '1').join('') : magnitude;
    const trace = [frame('Fix the number of bits', `${width} bits: −${2 ** (width - 1) - 1} to ${2 ** (width - 1) - 1}`, 'One’s complement uses separate patterns for positive zero and negative zero. Its positive and negative limits have equal magnitudes.')];
    trace.push(frame('Write the non-negative magnitude', magnitude, `The magnitude is ${Math.abs(value)}. Keep the chosen width, including leading zeroes.`, { pattern: magnitude }));
    if (value < 0) trace.push(frame('Invert every bit', result, 'Replace each 0 with 1 and each 1 with 0. One’s complement stops here: do not add one.', { pattern: result }));
    trace.push(frame('Decode to check', `${result} → ${value}`, value < 0 ? `The leading 1 signals a negative value. Invert again to recover magnitude ${Math.abs(value)}.` : `A leading 0 signals a non-negative value. All zeroes represents +0; all ones is a separate −0 pattern.`, { pattern: result, value }));
    return trace;
  }

  function arithmeticTrace(a, b, width, operation = '+', signed = false, third = null) {
    widthCheck(width);
    if (!['+', '-'].includes(operation)) throw new RangeError('Choose addition or subtraction.');
    const minimum = signed ? -(2 ** (width - 1)) : 0, maximum = signed ? 2 ** (width - 1) - 1 : 2 ** width - 1;
    integer(a, minimum, maximum, 'First operand'); integer(b, minimum, maximum, 'Second operand');
    if (third !== null) { integer(third, minimum, maximum, 'Third operand'); if (operation !== '+') throw new RangeError('The third operand is available for addition only.'); }
    const modulus = 2 ** width, exact = operation === '+' ? a + b + (third ?? 0) : a - b;
    const stored = mod(exact, modulus), interpreted = signed && stored >= modulus / 2 ? stored - modulus : stored;
    const operands = [a, b, ...(third === null ? [] : [third])], patterns = operands.map(value => binary(value, width));
    const expression = operation === '+' ? operands.map(value => value < 0 ? `(${value})` : value).join(' + ') : `${a} − (${b})`;
    const trace = [frame('Read the operands and width', `${expression} · ${width}-bit ${signed ? 'two’s complement' : 'unsigned'}`, `Predict the mathematical answer and whether it fits ${minimum}…${maximum}.`, { patterns: [...patterns], partial: '·'.repeat(width) })];
    let carry = 0, borrow = 0, partial = '';
    if (operation === '-' && signed) {
      patterns[1] = binary(-b, width);
      trace.push(frame('Subtract by adding the negated bit pattern', `${binary(b, width)} → invert → add 1 → ${patterns[1]}`, 'Negate at the same width and add. This bit-pattern operation still works when the positive counterpart of the minimum signed value does not fit; check the final mathematical range separately.', { patterns: [...patterns], partial: '·'.repeat(width) }));
    }
    for (let position = 0; position < width; position++) {
      const index = width - position - 1;
      const digits = patterns.map(pattern => Number(pattern[index]));
      let line, why;
      if (operation === '-' && !signed) {
        const incoming = borrow, difference = digits[0] - digits[1] - incoming;
        borrow = difference < 0 ? 1 : 0;
        const bit = mod(difference, 2); partial = bit + partial;
        line = `${digits[0]} − ${digits[1]} − incoming borrow ${incoming} = ${difference}; write ${bit}; outgoing borrow ${borrow}`;
        why = borrow ? 'Borrow one unit from the next column. One unit there is worth two units in this column.' : 'The available value is enough for this column; no borrow is needed.';
      } else {
        const incoming = carry, sum = digits.reduce((x, y) => x + y, 0) + incoming;
        carry = Math.floor(sum / 2); const bit = sum % 2; partial = bit + partial;
        line = `${digits.join(' + ')} + incoming carry ${incoming} = ${sum}; write ${bit}; outgoing carry ${carry}`;
        why = 'Write the remainder after division by 2. Carry the quotient into the next column.';
      }
      trace.push(frame(`Bit position ${position}${position === width - 1 ? ' (leftmost bit)' : ''}`, line, why, { patterns: [...patterns], partial: '·'.repeat(width - partial.length) + partial, focus: index, carry, borrow }));
    }
    const overflow = exact < minimum || exact > maximum;
    trace.push(frame('Interpret the stored result', `${binary(stored, width)} → ${interpreted}; exact answer = ${exact}`, `${overflow ? 'Overflow: the exact answer is outside the chosen range.' : 'The exact answer fits the chosen range.'} ${signed ? 'Carry-out and signed overflow are different checks.' : operation === '-' ? 'A final borrow signals a result below zero; the kept bits wrap modulo 2^width.' : 'A carry beyond the available width is not stored.'}`, { patterns: [...patterns], partial: binary(stored, width), exact, stored, interpreted, overflow, carry, borrow, minimum, maximum }));
    return trace;
  }

  function asciiEncode(text, width = 7) {
    if (![7, 8].includes(width)) throw new RangeError('Display ASCII using 7 bits or an 8-bit byte with a leading zero.');
    if (!text.length || text.length > 12 || [...text].some(char => char.codePointAt(0) < 32 || char.codePointAt(0) > 126)) throw new RangeError('Use 1–12 printable standard ASCII characters, including spaces.');
    return [...text].map(char => ({ char, decimal: char.charCodeAt(0), hex: char.charCodeAt(0).toString(16).toUpperCase().padStart(2, '0'), bits: binary(char.charCodeAt(0), width) }));
  }
  function asciiDecode(raw) {
    const patterns = String(raw).trim().split(/\s+/);
    if (!patterns.length || patterns.length > 12 || patterns.some(pattern => !/^[01]{7,8}$/.test(pattern))) throw new RangeError('Enter 1–12 groups of 7 or 8 bits, separated by spaces.');
    const rows = patterns.map(pattern => ({ bits: pattern, decimal: parseInt(pattern, 2) }));
    if (rows.some(row => row.decimal < 32 || row.decimal > 126)) throw new RangeError('This display decodes printable standard ASCII codes 32–126 only. An 8-bit code above 127 needs a specified encoding.');
    return rows.map(row => ({ ...row, char: String.fromCharCode(row.decimal), hex: row.decimal.toString(16).toUpperCase().padStart(2, '0') }));
  }

  function bitmapModel(width, height, depth) {
    integer(width, 1, 4096, 'Pixel width'); integer(height, 1, 4096, 'Pixel height'); integer(depth, 1, 24, 'Colour depth');
    const pixels = width * height, bits = pixels * depth;
    return { width, height, depth, pixels, colours: 2 ** depth, bits, bytes: bits / 8, storageBytes: Math.ceil(bits / 8) };
  }
  function vectorModel(scale) {
    if (![1, 2, 4].includes(scale)) throw new RangeError('Choose scale 1, 2 or 4.');
    const original = [{ type: 'rectangle', x: 10, y: 15, width: 40, height: 25, fill: '#4b80c4' }, { type: 'circle', cx: 65, cy: 40, r: 16, fill: '#d18339' }];
    const objects = original.map(object => Object.fromEntries(Object.entries(object).map(([key, value]) => [key, typeof value === 'number' ? value * scale : value])));
    return { scale, original, objects, objectCount: original.length };
  }

  function samplingModel(rate, depth, duration = 1, channels = 1) {
    integer(rate, 4, 64, 'Sampling rate'); integer(depth, 1, 8, 'Sample resolution');
    if (!Number.isFinite(duration) || duration <= 0 || duration > 60 || !Number.isInteger(rate * duration)) throw new RangeError('Duration must give a whole number of samples, up to 60 seconds.');
    integer(channels, 1, 2, 'Channels');
    const levels = 2 ** depth, count = rate * duration;
    const wave = t => { const sine = Math.sin(2 * Math.PI * 2 * t); return 0.5 + 0.4 * (Math.abs(sine) < 1e-12 ? 0 : sine); };
    const samples = Array.from({ length: count }, (_, index) => {
      const time = index / rate, amplitude = wave(time), code = Math.round(amplitude * (levels - 1));
      return { index, time, amplitude, code, quantized: code / (levels - 1), bits: binary(code, depth), error: code / (levels - 1) - amplitude };
    });
    return { rate, depth, duration, channels, levels, count, samples, bits: count * depth * channels, bytes: count * depth * channels / 8 };
  }

  function rleEncode(text, countBits = 3, symbolBits = 8) {
    integer(countBits, 1, 8, 'Count field width'); integer(symbolBits, 1, 8, 'Symbol field width');
    if (!/^[A-Z]{1,64}$/.test(text)) throw new RangeError('Use 1–64 uppercase letters A–Z.');
    if ([...text].some(char => char.charCodeAt(0) >= 2 ** symbolBits)) throw new RangeError('The symbol field cannot hold these ASCII codes.');
    const maximum = 2 ** countBits - 1, runs = [];
    for (const symbol of text) {
      const last = runs.at(-1);
      if (last && last.symbol === symbol && last.count < maximum) last.count++;
      else runs.push({ count: 1, symbol });
    }
    return { text, countBits, symbolBits, maximum, runs, originalBits: text.length * symbolBits, encodedBits: runs.length * (countBits + symbolBits), restored: runs.map(run => run.symbol.repeat(run.count)).join('') };
  }
  function rleDecode(runs, countBits = 3) {
    integer(countBits, 1, 8, 'Count field width');
    if (!Array.isArray(runs) || !runs.length || runs.length > 64) throw new RangeError('Supply 1–64 run pairs.');
    return runs.map(run => { integer(run.count, 1, 2 ** countBits - 1, 'Run count'); if (!/^[A-Z]$/.test(run.symbol)) throw new RangeError('Use one uppercase ASCII symbol per run.'); return run.symbol.repeat(run.count); }).join('');
  }

  function lossyModel(values, depth) {
    integer(depth, 1, 8, 'Output sample depth');
    if (!Array.isArray(values) || !values.length || values.length > 64) throw new RangeError('Use 1–64 source values.');
    values.forEach(value => integer(value, 0, 255, 'Source sample'));
    const levels = 2 ** depth;
    const codes = values.map(value => Math.round(value * (levels - 1) / 255));
    const restored = codes.map(code => Math.round(code * 255 / (levels - 1)));
    return { values: [...values], depth, levels, codes, restored, errors: restored.map((value, i) => value - values[i]), originalBits: values.length * 8, encodedBits: values.length * depth };
  }

  return { binary, bitsModel, parseNumeral, conversionTrace, bcdTrace, signedModel, onesTrace, twosTrace, arithmeticTrace, asciiEncode, asciiDecode, bitmapModel, vectorModel, samplingModel, rleEncode, rleDecode, lossyModel };
})();
if (typeof module !== 'undefined' && module.exports) module.exports = Section1Models;
if (typeof window !== 'undefined') window.Section1Models = Section1Models;
