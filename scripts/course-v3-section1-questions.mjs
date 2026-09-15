// Independent inputs assess the new teaching paths without copying worked examples.
const q = (id, objectiveIds, prompt, answerPoints, commonError) => ({
  id, type: 'Practice', objectiveIds, prompt, answerPoints, marks: answerPoints.length, commonError,
});

export const section1AdditionalPractice = {
  '001': [q('S1-L01-CAPACITY', ['S1.01.A01', 'S1.01.A02'],
    'Calculate how many complete 600-byte files fit into 2 KiB of available storage and how many bytes remain. Each stated file size includes all overhead.',
    ['2 KiB = 2048 bytes.', 'Three files fit because 3 × 600 = 1800 and 4 × 600 = 2400 exceeds 2048.', '2048 − 1800 = 248 bytes remain.'],
    'Round down to complete files and retain the correct prefix multiplier.')],
  '002': [
    q('S1-L02-BCD-REVERSE', ['S1.03.A04', 'S1.02.A04'],
      'Convert BCD 0000 0110 0000 to its three displayed digits. Explain why replacing the last group with 1100 would make it invalid BCD.',
      ['The displayed digits are 060; each group decodes separately, including the leading zero.', '1100 is code value 12, outside the valid BCD digit codes 0–9.'],
      'Do not decode the complete twelve-bit pattern as one unsigned integer.'),
    q('S1-L02-SIGNED-BOUNDARY', ['S1.03.A05', 'S1.03.A06', 'S1.02.A05', 'S1.02.A06'],
      'State the range of four-bit one’s complement and four-bit two’s complement. Interpret 1000 under each rule, and explain whether −8 has a four-bit one’s-complement representation.',
      ['Four-bit one’s complement: −7 to +7.', 'Four-bit two’s complement: −8 to +7.', '1000 is −7 in one’s complement and −8 in two’s complement.', '−8 lies outside the four-bit one’s-complement range, so it has no representation at that width.'],
      'The minimum signed value depends on the representation as well as the width.'),
    q('S1-L02-PRESERVE-VALUE', ['S1.03.A05', 'S1.03.A06'],
      'Convert the eight-bit one’s-complement value 11110010 to eight-bit two’s complement while preserving its denary value. Show the decoded value and the new encoding, then verify the destination value.',
      ['Invert 11110010 → 00001101 = 13, so the original signed value is −13.', 'Encode −13 in two’s complement: invert 00001101 and add one → 11110011.', 'The destination decodes to −128 + 64 + 32 + 16 + 2 + 1 = −13.'],
      'Copying the original bits would reinterpret them as −14 rather than preserve −13.'),
  ],
  '003': [
    q('S1-L03-BORROW', ['S1.04.A01'],
      'Calculate 00100000 − 00000101 as unsigned eight-bit values. Show how the borrow passes through the zero columns and verify the denary result.',
      ['Borrow from the 32s column: the adjusted values in columns 32,16,8,4,2,1 are 0,1,1,1,1,2.', 'Subtract bits for 5 in the 4s and 1s columns to obtain 00011011.', '00011011 is 27, agreeing with 32 − 5.'],
      'The borrowed row is working notation; its entries need not all be binary digits.'),
    q('S1-L03-SUBTRACT-NEGATIVE', ['S1.04.A02', 'S1.05.A01'],
      'Calculate −9 − (−4) using eight-bit two’s-complement addition. Show the rewritten operation, encoded operands and result. Explain whether signed overflow occurs.',
      ['Rewrite as −9 + (+4).', 'Add 11110111 + 00000100 = 11111011.', '11111011 represents −5.', 'No signed overflow occurs because −5 is within −128 to +127.'],
      'Subtracting a negative adds its positive counterpart.'),
  ],
  '004': [q('S1-L04-CODEPOINT-BYTES', ['S1.07.A01', 'S1.07.A04'],
    'A supplied UTF-8 table maps A (U+0041) to byte 41 and é (U+00E9) to bytes C3 A9, all byte values in hexadecimal. Give the bytes for éA and decode 41 C3 A9. Explain why two characters do not necessarily occupy two bytes.',
    ['éA is C3 A9 41.', '41 C3 A9 decodes to Aé.', 'The encoding uses one byte for A and two for é, so either two-character string occupies three bytes.'],
    'A code point identifies a character; the chosen encoding determines its bytes.')],
  '005': [
    q('S1-L05-HEADER', ['S1.08.A04', 'S1.08.A06'],
      'Calculate the complete size of a 40 × 20 bitmap at 4 bits per pixel with a 24-byte header and no other overhead. Repeat at 8 bits per pixel. Explain why the whole file does not exactly double.',
      ['Original pixel data: 40 × 20 × 4 / 8 = 400 bytes; complete file: 424 bytes.', 'New pixel data: 40 × 20 × 8 / 8 = 800 bytes; complete file: 824 bytes.', 'The pixel data doubles, but the 24-byte header remains fixed.'],
      'Keep header bytes separate from pixel bits until the units match.'),
    q('S1-L05-VECTOR-REBUILD', ['S1.09.A01', 'S1.09.A02'],
      'A drawing list first draws a red rectangle with top-left (3,4), width 12 and height 8, then a black line from (3,12) to (15,12), thickness 1. The origin is top-left; x increases right and y down. Describe the resulting drawing. State every changed geometric property after scaling coordinates, dimensions and thickness by 2, and state whether colour or drawing order changes.',
      ['The rectangle extends to (15,12), with the later black line over its lower edge.', 'The scaled rectangle starts at (6,8), width 24 and height 16.', 'The scaled line joins (6,24) to (30,24), thickness 2.', 'Colour and drawing order remain unchanged.'],
      'Scale both endpoints and state whether stroke thickness is included in the scale rule.'),
  ],
  '006': [
    q('S1-L06-NUMERICAL-SAMPLING', ['S1.10.A01', 'S1.10.A02', 'S1.10.A04'],
      'A 4 Hz recorder measures amplitudes 0.2, 2.8, 1.2, −0.7 at t = 0, 0.25, 0.50, 0.75 seconds. The encoding rounds to the nearest level from −4 through +3 and uses the three-bit code value level + 4. State the quantised levels, encode them, decode the codes and calculate the sample-data bits. Explain one loss of information.',
      ['Quantised levels are 0, 3, 1, −1.', 'Code values 4, 7, 5, 3 give 100 111 101 011.', 'Decoding subtracts 4 from those code values and recovers 0, 3, 1, −1.', 'Four three-bit samples require 12 sample-data bits.', 'The exact measured amplitudes, or unmeasured changes between sample times, cannot be recovered from these codes alone.'],
      'This question specifies an offset mapping; do not use two’s complement.'),
    q('S1-L06-DICTIONARY', ['S1.11.A02', 'S1.11.A04'],
      'A dictionary defines REF(2) as GO. Decode REF(2), SPACE, LITERAL(2), SPACE, REF(2). Explain why token types and separators are needed, and why this example alone does not prove a storage saving.',
      ['The exact recovered text is GO 2 GO.', 'The types distinguish a reference to GO from the literal digit 2; SPACE preserves word separation.', 'Dictionary entries, type markers and separators cost storage; their binary sizes have not been specified.'],
      'Do not expand a literal digit as though it were a dictionary reference.'),
  ],
};

export const section1AdditionalExam = {
  '001': [q('S1-L01-EXAM-CAPACITY', ['S1.01.A01', 'S1.01.A02'], 'Calculate how many complete 500-byte records fit in 4 KiB of free space. Each record includes all overhead. Give the unused byte count.', ['4 KiB = 4096 bytes.', 'Eight records require 4000 bytes and fit; nine require 4500 and do not.', '4096 − 4000 = 96 bytes remain.'], 'Storage holds complete records; a decimal prefix would give a different capacity.')],
  '002': [q('S1-L02-EXAM-BOUNDARY', ['S1.03.A05', 'S1.03.A06'], 'Interpret the eight-bit pattern 10000000 in one’s complement and two’s complement. Explain why negating the two’s-complement value cannot produce a valid positive result at the same signed width.', ['One’s complement: inversion gives 01111111 = 127, so the value is −127.', 'Two’s complement: the negative-weight bit gives −128.', 'The opposite value +128 exceeds the eight-bit signed maximum +127.'], 'An unchanged pattern after invert-and-add-one does not make +128 representable.')],
  '003': [q('S1-L03-EXAM-NEGATIVE-OVERFLOW', ['S1.04.A02', 'S1.05.A01'], 'Calculate 10100000 + 11010000 as eight-bit two’s-complement values. Give the full addition, true denary sum and retained interpretation. Explain whether signed overflow occurs.', ['The full bit addition is 1 01110000.', 'The operands are −96 and −48, with true sum −144.', 'The retained 01110000 represents +112.', '−144 is below −128, so signed overflow occurs; two negative operands gave a positive retained result.'], 'Discarding the ninth carry bit does not validate the signed result.')],
  '004': [q('S1-L04-EXAM-DIGIT', ['S1.07.A01', 'S1.07.A02'], 'ASCII assigns the digit character 7 code 55. Give an eight-bit encoding for this character and for the unsigned integer 7. Explain the difference and why changing a font need not change either stored value.', ['Character 7 uses code 55: 00110111.', 'The unsigned integer 7 is 00000111.', 'The first stores a character code while the second stores a numeric value.', 'A font controls the visible glyph shape rather than the assigned code or integer.'], 'The shape of the displayed digit does not establish its stored representation.')],
  '005': [q('S1-L05-EXAM-SCALE', ['S1.08.A04', 'S1.08.A05', 'S1.09.A02'], 'A 20 × 12 bitmap uses 2 bits per pixel. Calculate its raw data size before and after doubling both dimensions at the same depth. Explain why this enlargement cannot recover uncaptured detail and why a vector outline scales differently.', ['Original data: 20 × 12 × 2 / 8 = 60 bytes.', 'New data: 40 × 24 × 2 / 8 = 240 bytes, four times as much.', 'Enlargement copies or interpolates existing pixels; it adds no new measurements of the original scene.', 'A vector outline is redrawn from scaled geometry at the output size.'], 'Doubling both dimensions quadruples the pixel count, not doubles it.')],
  '006': [q('S1-L06-EXAM-SOUND-RUNS', ['S1.10.A02', 'S1.10.A04', 'S1.11.A03', 'S1.11.A07'], 'A teaching recorder has levels −2, −1, 0, 1 with two-bit codes 00, 01, 10, 11 respectively. Quantise measurements −0.8, −0.8, −0.8, −0.8 to the nearest level and give the original codes. RLE uses an eight-bit count followed by the two-bit code. Encode, decode and compare the data sizes, excluding headers. Explain whether decoding recovers the original measured amplitudes.', ['All four values quantise to −1, giving 01 01 01 01.', 'RLE stores count 00000100 followed by value 01.', 'Decoding recovers four copies of 01, or four levels of −1.', 'Original data is 4 × 2 = 8 bits; RLE is 8 + 2 = 10 bits and is larger by 2 bits.', 'RLE preserves the quantised samples exactly; the earlier rounding of −0.8 to −1 is not reversed.'], 'A lossless compression stage does not undo losses from the original sampling process.')],
};
