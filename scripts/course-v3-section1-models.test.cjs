const test = require('node:test');
const assert = require('node:assert/strict');
const M = require('./course-v3-section1-models.js');

test('bit patterns include zero; each added bit doubles the patterns', () => {
  for (let width = 1; width <= 16; width++) {
    for (const value of [0, 1, 2 ** width - 1]) {
      const model = M.bitsModel(width, value);
      assert.equal(model.pattern.length, width);
      assert.equal(model.places.reduce((sum, place) => sum + place.contribution, 0), value);
      assert.equal(model.combinations, 2 ** width);
      assert.equal(model.maximum, model.combinations - 1);
    }
  }
  assert.throws(() => M.bitsModel(4, 16));
  assert.throws(() => M.bitsModel(4, -1));
  assert.throws(() => M.bitsModel(2.5, 1));
});

test('conversions preserve values across binary, denary and hexadecimal, including zero', () => {
  for (const value of [0, 1, 9, 10, 15, 16, 45, 255, 4096, 65535]) {
    for (const from of [2, 10, 16]) for (const to of [2, 10, 16]) {
      const trace = M.conversionTrace(value.toString(from), from, to), last = trace.at(-1);
      assert.equal(last.result, value.toString(to).toUpperCase());
      assert.equal(parseInt(last.result, to), value);
      assert.equal(last.value, value);
      assert.ok(!('result' in trace[0]), 'initial frame must not disclose the converted answer');
    }
  }
  for (const [raw, base] of [['102', 2], ['G1', 16], ['-1', 10], ['', 10], ['65536', 10], ['1.5', 10]]) assert.throws(() => M.parseNumeral(raw, base));
});

test('BCD encodes separate decimal digits, decodes exactly and rejects unused groups', () => {
  for (const source of ['0', '9', '10', '59', '00059', '12345678', '99999999']) {
    const encoded = M.bcdTrace(source).at(-1);
    assert.equal(encoded.groups.length, source.length);
    assert.ok(encoded.groups.every(group => group.length === 4));
    assert.equal(M.bcdTrace(encoded.result, 'decode').at(-1).result, source);
    assert.equal(encoded.unsignedBinary, Number(source).toString(2));
  }
  assert.equal(M.bcdTrace('59').at(-1).result, '0101 1001');
  assert.equal(M.bcdTrace('59').at(-1).unsignedBinary, '111011');
  assert.deepEqual(M.bcdTrace('59')[0].groups, []);
  assert.deepEqual(M.bcdTrace('0101 1001', 'decode')[0].digits, []);
  for (let invalid = 10; invalid <= 15; invalid++) assert.throws(() => M.bcdTrace(invalid.toString(2), 'decode'));
  for (const invalid of ['', '123456789', '-1', 'A5', '2.4']) assert.throws(() => M.bcdTrace(invalid));
  for (const invalid of ['', '001', '00100', '1002']) assert.throws(() => M.bcdTrace(invalid, 'decode'));
});

test('all 4-bit patterns have correct unsigned, ones and twos complement interpretations', () => {
  for (let value = 0; value < 16; value++) {
    const pattern = value.toString(2).padStart(4, '0'), model = M.signedModel(pattern);
    assert.equal(model.unsigned, value);
    assert.equal(model.twos, value < 8 ? value : value - 16);
    assert.equal(model.ones, value < 8 ? value : value === 15 ? '-0' : value - 15);
  }
  assert.deepEqual(M.signedModel('1000').twosRange, [-8, 7]);
  assert.deepEqual(M.signedModel('1000').onesRange, [-7, 7]);
  assert.throws(() => M.signedModel('1002'));
});

test('fixed-width twos complement encoding round-trips every 4-bit and 8-bit value', () => {
  for (const width of [4, 8]) {
    for (let value = -(2 ** (width - 1)); value < 2 ** (width - 1); value++) {
      const last = M.twosTrace(value, width).at(-1);
      assert.equal(last.pattern.length, width);
      assert.equal(M.signedModel(last.pattern).twos, value);
    }
    assert.throws(() => M.twosTrace(2 ** (width - 1), width));
    assert.throws(() => M.twosTrace(-(2 ** (width - 1)) - 1, width));
  }
});

test('ones complement encoding stops after inversion and rejects the twos-complement-only minimum', () => {
  for (const width of [4, 8]) {
    for (let value = -(2 ** (width - 1) - 1); value < 2 ** (width - 1); value++) {
      const trace = M.onesTrace(value, width);
      assert.equal(M.signedModel(trace.at(-1).pattern).ones, value);
      assert.ok(!trace.some(frame => frame.title === 'Add one at the same width'));
    }
    assert.throws(() => M.onesTrace(-(2 ** (width - 1)), width));
  }
  assert.equal(M.onesTrace(-5, 4).at(-1).pattern, '1010');
  assert.equal(M.twosTrace(-5, 4).at(-1).pattern, '1011');
});

test('4-bit addition and subtraction exhaustively check stored bits and mathematical overflow', () => {
  for (const signed of [false, true]) {
    const minimum = signed ? -8 : 0, maximum = signed ? 7 : 15;
    for (let a = minimum; a <= maximum; a++) for (let b = minimum; b <= maximum; b++) for (const operation of ['+', '-']) {
      const trace = M.arithmeticTrace(a, b, 4, operation, signed), result = trace.at(-1);
      const exact = operation === '+' ? a + b : a - b, stored = ((exact % 16) + 16) % 16;
      assert.equal(result.exact, exact);
      assert.equal(result.stored, stored);
      assert.equal(result.partial, stored.toString(2).padStart(4, '0'));
      assert.equal(result.interpreted, signed && stored >= 8 ? stored - 16 : stored);
      assert.equal(result.overflow, exact < minimum || exact > maximum);
      if (!signed && operation === '-') assert.equal(result.borrow, a < b ? 1 : 0);
      if (!signed && operation === '+') assert.equal(result.carry, exact >= 16 ? 1 : 0);
      assert.equal(trace[0].partial, '····');
      assert.deepEqual(trace[0].patterns, [M.binary(a, 4), M.binary(b, 4)]);
    }
  }
});

test('signed subtraction preserves the original operand frame before negating it', () => {
  const trace = M.arithmeticTrace(100, 10, 8, '-', true);
  assert.deepEqual(trace[0].patterns, ['01100100', '00001010']);
  assert.deepEqual(trace[1].patterns, ['01100100', '11110110']);
  assert.equal(trace.at(-1).interpreted, 90);
  assert.equal(M.arithmeticTrace(-128, -128, 8, '-', true).at(-1).interpreted, 0);
  assert.equal(M.arithmeticTrace(127, -128, 8, '-', true).at(-1).overflow, true);
});

test('carry-out differs from signed overflow and three operands can carry two', () => {
  const noOverflow = M.arithmeticTrace(-1, 1, 4, '+', true).at(-1);
  assert.equal(noOverflow.carry, 1);
  assert.equal(noOverflow.overflow, false);
  const overflow = M.arithmeticTrace(7, 1, 4, '+', true).at(-1);
  assert.equal(overflow.carry, 0);
  assert.equal(overflow.overflow, true);
  const triple = M.arithmeticTrace(15, 15, 4, '+', false, 15);
  assert.ok(triple.some(frame => frame.carry === 2));
  assert.equal(triple.at(-1).exact, 45);
  assert.equal(triple.at(-1).stored, 13);
  assert.equal(M.arithmeticTrace(7, 7, 4, '+', true, -7).at(-1).overflow, false);
  assert.throws(() => M.arithmeticTrace(1, 1, 4, '-', false, 1));
  assert.throws(() => M.arithmeticTrace(8, 1, 4, '+', true));
});

test('ASCII encodes and decodes printable characters and rejects undefined encoding assumptions', () => {
  for (const width of [7, 8]) {
    const rows = M.asciiEncode('A1 ~', width);
    assert.deepEqual(rows.map(row => row.decimal), [65, 49, 32, 126]);
    assert.ok(rows.every(row => row.bits.length === width));
    assert.equal(M.asciiDecode(rows.map(row => row.bits).join(' ')).map(row => row.char).join(''), 'A1 ~');
  }
  for (const invalid of ['€', '中', '\n', '']) assert.throws(() => M.asciiEncode(invalid));
  for (const invalid of ['10000000', '0000000', '1111111', '1000002', '1']) assert.throws(() => M.asciiDecode(invalid));
});

test('raw bitmap storage counts pixels and bits, including partial bytes', () => {
  assert.deepEqual(M.bitmapModel(8, 8, 2), { width: 8, height: 8, depth: 2, pixels: 64, colours: 4, bits: 128, bytes: 16, storageBytes: 16 });
  assert.equal(M.bitmapModel(16, 16, 2).bits / M.bitmapModel(8, 8, 2).bits, 4);
  assert.equal(M.bitmapModel(1, 1, 1).bytes, 0.125);
  assert.equal(M.bitmapModel(1, 1, 1).storageBytes, 1);
  assert.throws(() => M.bitmapModel(0, 2, 1));
});

test('vector scaling changes geometry without adding objects or mutating originals', () => {
  const model = M.vectorModel(4);
  assert.equal(model.objects[0].width, 160);
  assert.equal(model.objects[1].r, 64);
  assert.equal(model.original[0].width, 40);
  assert.equal(model.objectCount, 2);
  assert.equal(model.objects[1].fill, model.original[1].fill);
});

test('sampling rate and bit depth change independent axes, storage includes duration and channels', () => {
  const a = M.samplingModel(8, 2), moreRate = M.samplingModel(16, 2), moreDepth = M.samplingModel(8, 3);
  assert.equal(moreRate.count, 2 * a.count);
  assert.equal(moreRate.levels, a.levels);
  assert.equal(moreDepth.count, a.count);
  assert.equal(moreDepth.levels, 2 * a.levels);
  assert.deepEqual(moreDepth.samples.map(sample => sample.time), a.samples.map(sample => sample.time));
  const stereo = M.samplingModel(16, 3, 2, 2);
  assert.equal(stereo.bits, 16 * 3 * 2 * 2);
  assert.equal(stereo.bytes, 24);
  assert.equal(stereo.samples.at(-1).time, 31 / 16);
  for (const depth of [1, 2, 3, 8]) for (const rate of [4, 8, 16, 32, 64]) {
    const data = M.samplingModel(rate, depth);
    data.samples.forEach(sample => {
      assert.ok(sample.code >= 0 && sample.code < data.levels);
      assert.equal(sample.bits.length, depth);
      assert.ok(Math.abs(sample.error) <= .5 / (data.levels - 1) + 1e-12);
    });
  }
  assert.throws(() => M.samplingModel(8, 2, .1));
  assert.deepEqual(M.samplingModel(4, 3).samples.map(sample => sample.code), [4, 4, 4, 4]);
});

test('RLE is lossless, counts all pair fields and splits a run at the field limit', () => {
  for (const source of ['A', 'AAAAAAA', 'AAAAAAAA', 'AAAAAABBBBCCCC', 'ABCDEFGH', 'ABABABAB']) {
    for (const countBits of [1, 2, 3, 4]) {
      const data = M.rleEncode(source, countBits);
      assert.equal(M.rleDecode(data.runs, countBits), source);
      assert.equal(data.restored, source);
      assert.ok(data.runs.every(run => run.count <= 2 ** countBits - 1));
      assert.equal(data.encodedBits, data.runs.length * (countBits + 8));
    }
  }
  assert.deepEqual(M.rleEncode('AAAAAAAA', 3).runs, [{ count: 7, symbol: 'A' }, { count: 1, symbol: 'A' }]);
  const expanding = M.rleEncode('ABCDEFGH', 3);
  assert.ok(expanding.encodedBits > expanding.originalBits);
  const byteFields = M.rleEncode('AAAABBCCCCCCCCDD', 8);
  assert.equal(byteFields.originalBits, 128);
  assert.equal(byteFields.encodedBits, 64);
  assert.throws(() => M.rleDecode([{ count: 8, symbol: 'A' }], 3));
  assert.throws(() => M.rleEncode('A', 3, 6));
});

test('lossy quantisation can merge distinct inputs and 8-bit output is exact', () => {
  const values = Array.from({ length: 256 }, (_, i) => i);
  for (let start = 0; start < 256; start += 64) {
    const data = M.lossyModel(values.slice(start, start + 64), 8);
    assert.deepEqual(data.restored, data.values);
    assert.ok(data.errors.every(error => error === 0));
  }
  const lossy = M.lossyModel([18, 35, 72, 103], 2);
  assert.equal(lossy.codes[0], lossy.codes[1]);
  assert.notDeepEqual(lossy.restored, lossy.values);
  assert.equal(lossy.encodedBits, 8);
  assert.deepEqual(M.lossyModel([0, 255], 1).restored, [0, 255]);
  assert.throws(() => M.lossyModel([256], 2));
  assert.throws(() => M.lossyModel([NaN], 2));
});
