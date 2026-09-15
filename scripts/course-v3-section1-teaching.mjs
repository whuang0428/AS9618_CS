import { coreParagraph as p, coreSteps as steps, coreTable as table } from './course-v3-core-blocks.mjs';
import { additionExample, samplingExample, soundRunExample } from './course-v3-section1-examples.mjs';
import { section1DiagramMaterials } from './course-v3-section1-diagrams.mjs';

const teach = (blocks, essentials, options = {}) => ({ blocks, essentials, ...options });
const visualTable = (title, headers, rows) => ({ type: 'table', title, headers, rows });
const exactVisual = (name, title, facts) => ({
  type: 'reviewed-visual', asset: `/assets/course-v3/section-1/${name}.svg`, title,
  facts, alt: facts.join(' '), caption: facts[facts.length - 1],
  review: 'data-verified-svg', layout: 'mechanism', preserveText: true,
});
const extension = (title, explanation, materials = []) => ({ title: `Optional extension · ${title}`, explanation: explanation.join(' '), materials });

export const section1Teaching = {
  'S1.01-PREFIXES': teach([
    p('A bit is one binary digit, 0 or 1. Two distinguishable physical states can represent these alternatives. Bits do not identify their own meaning: an agreed representation determines whether a pattern stands for a number, a character, a colour or something else.', 'From two states to information'),
    p('A nibble contains four bits and a byte contains eight bits. Lower-case b means bit; upper-case B means byte. A capacity counts available storage, whereas the value represented by one stored pattern depends on its encoding.', 'Read the unit and the meaning'),
    table('Count patterns before interpreting them', ['Width', 'Possible patterns', 'Unsigned values'], [
      ['1 bit', '0, 1: two patterns', '0 to 1'],
      ['2 bits', '00, 01, 10, 11: four patterns', '0 to 3'],
      ['3 bits', '000, 001, 010, 011, 100, 101, 110, 111', '0 to 7'],
      ['n bits', '2 × 2 × … × 2 = 2ⁿ patterns', '0 to 2ⁿ − 1'],
    ]),
    p('Appending one independent bit doubles the possibilities. Eight bits therefore have 256 patterns, but the largest unsigned value is 255 because zero uses one pattern. These same pattern counts will determine character capacity, colour choices and sound levels.', 'Explain the power of two'),
    p('Each binary prefix level multiplies by 1024; each decimal level multiplies by 1000. The prefix attaches a multiplier to the unit: KiB counts bytes, while Kib counts bits. Keep the i and the case when copying a specification.', 'Two scales for the same quantity'),
    steps('Worked example: express a 4 MiB file in bytes and MB', [
      ['Convert to bytes', '4 × 2²⁰ = 4,194,304 bytes. Multiplication expands the larger unit into individual bytes.'],
      ['Convert to MB', '4,194,304 ÷ 1,000,000 = 4.194304 MB. Division groups those bytes into decimal megabytes.'],
      ['Reverse-check', '4.194304 × 1,000,000 = 4,194,304 bytes. Both labels describe exactly the same file.'],
    ]),
    steps('Worked example: how many complete files fit?', [
      ['State the model', 'A device has 1 KiB = 1024 bytes available. Every file occupies exactly 300 bytes, with all overhead already included.'],
      ['Compare complete multiples', '3 × 300 = 900 fits; 4 × 300 = 1200 does not. Three complete files fit.'],
      ['Find the remainder', '1024 − 900 = 124 bytes remain. A fractional fourth file is not a complete saved file.'],
    ]),
    p('For a mixed-unit calculation, convert bits to bytes as well as converting the prefix. For example, 24,000 bits ÷ 8 = 3000 bytes = 3 kB. Check that the final unit answers the question; a result in bits is eight times its numerical value in bytes.', 'Check dimensions and plausibility'),
  ], ['Binary prefixes use powers of 1024; decimal prefixes use powers of 1000.', 'Convert through bytes when changing byte units; 1 B = 8 b.', 'n bits provide 2ⁿ patterns, representing unsigned values 0 to 2ⁿ − 1.'], {
    visual: visualTable('Binary and decimal magnitude prefixes', ['Level', 'Binary byte unit', 'Decimal byte unit'], [
      ['1', 'kibi: 1 KiB = 2¹⁰ B = 1024 B', 'kilo: 1 kB = 10³ B = 1000 B'],
      ['2', 'mebi: 1 MiB = 2²⁰ B = 1,048,576 B', 'mega: 1 MB = 10⁶ B = 1,000,000 B'],
      ['3', 'gibi: 1 GiB = 2³⁰ B', 'giga: 1 GB = 10⁹ B'],
      ['4', 'tebi: 1 TiB = 2⁴⁰ B', 'tera: 1 TB = 10¹² B'],
    ]),
    checkpoint: ['Four bits provide 16 patterns. Why is their largest unsigned value 15?', 'The patterns represent 0 through 15 inclusive; zero occupies one of the 16 patterns.'],
  }),
  'S1.02-BINARY': teach([
    p('A positional number system assigns a place value to each position. Denary has ten digit symbols, 0 to 9, and multiplies each place by 10 as you move left. Binary has two symbols, 0 and 1, and multiplies each place by 2. Leading zeros do not change a non-negative value, but they can be required by a storage width.', 'Start with the familiar denary system'),
    table('The same written digits can mean different values', ['Numeral and base', 'Place-value calculation', 'Denary value'], [
      ['101 in base 10', '1 × 100 + 0 × 10 + 1 × 1', '101'],
      ['101 in base 2', '1 × 4 + 0 × 2 + 1 × 1', '5'],
      ['407 in base 10', '4 × 100 + 0 × 10 + 7 × 1', '407; zero preserves the empty tens position'],
    ]),
    steps('Worked example: binary 00111011 to denary', [
      ['Align the places', 'From left to right the eight places are 128, 64, 32, 16, 8, 4, 2 and 1.'],
      ['Select the 1 bits', '00111011 selects 32, 16, 8, 2 and 1.'],
      ['Add the selected weights', '32 + 16 + 8 + 2 + 1 = 59. The 0 in the 4s position contributes nothing.'],
    ]),
    table('Reverse direction: build 59 using descending weights', ['Weight', 'Remainder before', 'Decision', 'Remainder after'], [
      ['128', '59', 'Too large: write 0', '59'], ['64', '59', 'Too large: write 0', '59'],
      ['32', '59', 'Subtract 32: write 1', '27'], ['16', '27', 'Subtract 16: write 1', '11'],
      ['8', '11', 'Subtract 8: write 1', '3'], ['4', '3', 'Too large: write 0', '3'],
      ['2', '3', 'Subtract 2: write 1', '1'], ['1', '1', 'Subtract 1: write 1', '0'],
    ]),
    p('Reading the decisions from the 128s place to the 1s place gives 00111011. The final remainder is zero, and decoding returns 59. If an unsigned result needs more than the supplied width, report that it cannot fit; deleting its leading 1 would change its value.', 'Finish and verify the conversion'),
    p('Another method divides repeatedly by 2 and records the remainders. Each remainder is the next least-significant bit, so read them upwards at the end. For 13: 13 ÷ 2 gives quotient 6 remainder 1; 6 gives 3 remainder 0; 3 gives 1 remainder 1; 1 gives 0 remainder 1. Stop at quotient 0 and read 1101; pad to 00001101 for eight bits.', 'Understand repeated division'),
  ], ['The base determines the legal digits and the place values.', 'Decode binary by adding the weights of its 1 bits; encode by selecting weights or repeated division.', 'Keep the requested width and reverse-check the value.'], {
    heading: 'Positional number systems: denary and binary',
    objectiveIds: ['S1.02.A01', 'S1.02.A02', 'S1.03.A01'],
    visual: visualTable('Read an unsigned byte by position', ['Weight', '128', '64', '32', '16', '8', '4', '2', '1'], [['Bit in 59', '0', '0', '1', '1', '1', '0', '1', '1']]),
    checkpoint: ['Why is 102 not a valid binary numeral?', 'Binary permits only 0 and 1; the digit 2 is not available in base 2.'],
  }),
  'S1.02-HEXADECIMAL': teach([
    p('Hexadecimal is base 16. Its single-digit values are 0 to 9 followed by A = 10, B = 11, C = 12, D = 13, E = 14 and F = 15. Places from the right are 1, 16, 256 and 4096. A letter such as B is one digit, not the denary numeral 11 occupying two places.', 'Sixteen digit values'),
    p('Four binary bits have 2⁴ = 16 patterns, exactly enough for one hexadecimal digit. This is why nibble grouping works directly. It changes the notation people read, not the underlying stored bits. Memory addresses and debugging values become shorter; RGB colour components can also be shown as pairs of hexadecimal digits.', 'Why the four-bit shortcut works'),
    table('Worked conversion in all directions: the value 59', ['Direction', 'Working', 'Result'], [
      ['Denary → hexadecimal', '59 ÷ 16 gives quotient 3 and remainder 11; 11 maps to B.', '3B'],
      ['Hexadecimal → denary', '3 × 16 + 11 × 1', '59'],
      ['Hexadecimal → binary', '3 maps to 0011; B maps to 1011.', '00111011'],
      ['Binary → hexadecimal', '00111011 splits as 0011 1011.', '3B'],
    ]),
    steps('Worked example: convert denary 300 to hexadecimal', [
      ['First division', '300 ÷ 16 gives quotient 18, remainder 12 (C). This is the units digit.'],
      ['Continue', '18 ÷ 16 gives quotient 1, remainder 2. Then 1 ÷ 16 gives quotient 0, remainder 1; stop.'],
      ['Read upwards', 'The remainders give 12C. Check: 1 × 256 + 2 × 16 + 12 = 300.'],
    ]),
    p('For a binary integer, group from the right. Binary 101101 becomes 0010 1101 after padding the incomplete left group, giving 2D. Padding on the right would multiply the value instead. A byte always needs two hexadecimal digits when its full width is required: 00000101 becomes 05.', 'Preserve position and width'),
    p('For example, a debugging display can show the same byte as 00111011 or 3B. A programmer can recover either nibble immediately. The computer does not need to store an extra hexadecimal copy simply because the display uses hexadecimal.', 'Explain an application through its benefit'),
  ], ['Hexadecimal uses 0–9 and A–F with powers-of-16 place values.', 'One hexadecimal digit maps to four bits; group binary integers from the right.', 'Hexadecimal is compact, reversible notation for addresses, debugging data and colour values.'], {
    objectiveIds: ['S1.02.A03', 'S1.03.A02', 'S1.03.A03', 'S1.06.A02'],
    visual: visualTable('One value in three notations', ['Denary', 'Hexadecimal', 'Binary nibbles'], [['59', '3B', '0011 1011'], ['45', '2D', '0010 1101'], ['300', '12C', '0001 0010 1100']]),
  }),
  'S1.02-BCD': teach([
    p('Binary Coded Decimal encodes each denary digit separately in four bits. Those groups are digit codes, not powers-of-16 places in one integer. Only 0000 through 1001 are valid digit codes; 1010 through 1111 do not represent decimal digits in this BCD model.', 'Keep decimal digits separate'),
    steps('Worked example: encode and decode 407', [
      ['Separate the digits', 'The digits are 4, 0 and 7; the zero must retain its position.'],
      ['Encode each digit', '4 → 0100, 0 → 0000 and 7 → 0111. Join them as 0100 0000 0111.'],
      ['Decode the groups', '0100 → 4, 0000 → 0 and 0111 → 7. Joining the digits recovers 407.'],
      ['Check a corrupt group', '0100 1010 0111 is invalid BCD because 1010 is not a decimal digit. Do not silently read it as A.'],
    ]),
    table('Compare the representations of 59', ['Representation', 'Stored pattern', 'How to interpret it'], [
      ['Unsigned binary', '00111011', '32 + 16 + 8 + 2 + 1'],
      ['BCD', '0101 1001', 'Decode separate digits 5 and 9'],
      ['Hexadecimal notation for the unsigned byte', '3B', '3 × 16 + 11'],
    ]),
    p('A clock or calculator can handle each displayed decimal digit directly from its BCD group. This is useful when the digits themselves are important. The cost is space: two BCD digits need eight bits, although unsigned 59 needs only six bits. There is no rule that all digital clocks must use BCD internally.', 'Connect purpose to a trade-off'),
    p('A display can retain a leading zero: 007 is 0000 0000 0111 when three digit positions are required. Its numerical value is still 7. Decimal fractions and signed BCD formats require additional conventions; this lesson uses non-negative integer digits only.', 'State the encoding boundary'),
  ], ['BCD assigns four bits to each decimal digit; only codes 0000–1001 are valid.', 'Preserve every required digit, including zero, and decode groups independently.', 'Direct decimal-digit handling can justify BCD despite its storage cost.'], {
    objectiveIds: ['S1.02.A04', 'S1.03.A04', 'S1.06.A01'],
    visual: visualTable('407 as three BCD digit groups', ['Digit position', 'Hundreds', 'Tens', 'Units'], [['Digit', '4', '0', '7'], ['BCD', '0100', '0000', '0111']]),
  }),
  'S1.02-ONES-COMPLEMENT': teach([
    p('A fixed width contains a limited set of bit patterns. A signed representation assigns some patterns to negative values. In one’s complement, non-negative values use ordinary binary with a leading 0. Negating a value inverts every bit at that same width, including leading zeros.', 'Define the interpretation before changing bits'),
    table('Worked round trip for −23 in eight bits', ['Step', 'Pattern or value', 'Reason'], [
      ['Write the positive magnitude', '00010111', '16 + 4 + 2 + 1 = 23'],
      ['Invert every bit', '11101000', 'This represents −23 in one’s complement.'],
      ['Decode the negative pattern', 'Invert 11101000 → 00010111', 'The leading 1 identifies a negative pattern.'],
      ['Restore the sign', '−23', 'The inverted magnitude is 23.'],
    ]),
    p('With n bits, the largest positive pattern has a leading 0 followed by n − 1 ones: 2ⁿ⁻¹ − 1. Its inverse is the most negative value. Eight-bit one’s complement therefore covers −127 to +127. The two remaining zero patterns are 00000000 (+0) and 11111111 (−0), so 256 patterns represent only 255 distinct integer values.', 'Derive the range and the two zeros'),
    p('An input of −128 does not fit eight-bit one’s complement. Increasing the width changes the available range and the stored pattern. An unsigned interpretation is a different rule: 11101000 is unsigned 232, not unsigned −23.', 'Check width and representation'),
    p('Bit inversion makes sign reversal simple. Arithmetic still needs the rules of this representation; the two’s-complement rule for discarding the final carry cannot be transferred blindly. Lesson 003 includes a short end-around-carry comparison.', 'Connect representation to later arithmetic'),
  ], ['Encode a negative one’s-complement integer by inverting every bit of its positive magnitude at the stated width.', 'Decode a negative pattern by inversion and restore its minus sign.', 'Eight-bit one’s complement has range −127 to +127 and two zero patterns.'], {
    objectiveIds: ['S1.02.A05', 'S1.03.A05'],
    visual: visualTable('Eight-bit one’s-complement landmarks', ['Value', 'Pattern'], [['+127', '01111111'], ['+0', '00000000'], ['−0', '11111111'], ['−127', '10000000']]),
    checkpoint: ['Decode 11101001 as eight-bit one’s complement.', 'Invert it to 00010110 = 22; its value is −22.'],
  }),
  'S1.02-TWOS-COMPLEMENT': teach([
    p('In two’s complement the most-significant bit has negative weight. An eight-bit pattern has weights −128, 64, 32, 16, 8, 4, 2 and 1. This gives one continuous integer range: −128 through +127. A leading 0 is non-negative; a leading 1 is negative.', 'Use a negative place value'),
    steps('Worked example: encode −23 at eight bits', [
      ['Write the magnitude', '+23 is 00010111.'],
      ['Invert all bits', '00010111 → 11101000.'],
      ['Add one at the same width', '11101000 + 00000001 = 11101001.'],
      ['Verify using weights', '−128 + 64 + 32 + 8 + 1 = −23.'],
    ]),
    p('Adding one may carry through trailing ones. To encode −18: +18 is 00010010; inversion gives 11101101. At the right, 1 + 1 writes 0 and carries 1; the next column 0 + 1 writes 1. The result is 11101110. Lesson 003 develops the full column method.', 'Complete the add-one operation'),
    steps('Reverse direction: decode 11101110', [
      ['Identify the sign', 'The leading 1 makes this a negative two’s-complement value.'],
      ['Find the magnitude', 'Invert to 00010001, then add 1 to obtain 00010010 = 18. Restore the minus sign: −18.'],
      ['Independently check', '−128 + 64 + 32 + 8 + 4 + 2 = −18.'],
    ]),
    p('For n bits the smallest value is −2ⁿ⁻¹: only the negative-weight bit is set. The largest is 2ⁿ⁻¹ − 1: that bit is 0 and all remaining bits are 1. There is one zero, all bits 0. Inverting zero and adding one produces a carry beyond the width and leaves the same zero pattern.', 'Derive the asymmetric range'),
    p('At eight bits, 10000000 means −128 directly from its negative weight. Invert-and-add-one returns 10000000 again: its unsigned magnitude is 128, but +128 is not an eight-bit signed value. Do not treat this as successful signed negation; use the negative weight to decode the minimum. Positive 128 and negative 129 are both outside the signed range.', 'Handle the smallest negative value'),
    p('For a positive magnitude m, inversion makes the unsigned value 255 − m and adding one makes 256 − m. Adding this pattern to m produces 256, leaving zero when only eight bits are retained. This explains how a fixed-width adder can handle subtraction and why the carry alone does not decide signed overflow.', 'Explain why the representation supports addition'),
  ], ['Two’s-complement weights begin with −2ⁿ⁻¹; the range is −2ⁿ⁻¹ to 2ⁿ⁻¹ − 1.', 'Encode negative values by inversion then addition of one; decode using weights or the inverse process.', 'The minimum negative value has no positive counterpart at the same signed width.'], {
    objectiveIds: ['S1.02.A06', 'S1.03.A06'],
    visual: visualTable('Read −23 with the correct weights', ['Weight', '−128', '64', '32', '16', '8', '4', '2', '1'], [['Bit', '1', '1', '1', '0', '1', '0', '0', '1']]),
  }),
  'S1.03-CONVERSIONS': teach([
    p('Separate three tasks: changing notation while preserving a value; reinterpreting unchanged bits under a different rule; and calculating the opposite value. They are different operations. Before starting, state the source rule, destination rule, integer value and required width.', 'Choose the task before the method'),
    table('Worked example: preserve +45', ['Destination', 'Result', 'Check'], [
      ['Eight-bit unsigned binary', '00101101', '32 + 8 + 4 + 1 = 45'],
      ['Hexadecimal', '2D', '2 × 16 + 13 = 45'],
      ['Two-digit BCD', '0100 0101', 'Digits 4 and 5 recover 45.'],
      ['Eight-bit one’s or two’s complement', '00101101', 'Positive 45 fits both signed ranges.'],
    ]),
    table('A separate task: represent the value −45', ['Representation', 'Encode', 'Decode'], [
      ['Eight-bit one’s complement', 'Invert 00101101 → 11010010', 'Invert → 00101101 = 45; restore −45.'],
      ['Eight-bit two’s complement', 'Invert and add 1 → 11010011', '−128 + 64 + 16 + 2 + 1 = −45.'],
    ]),
    table('Unchanged bits: three interpretations of 11101001', ['Rule', 'Calculation', 'Value'], [
      ['Unsigned', '128 + 64 + 32 + 8 + 1', '233'],
      ['One’s complement', 'Invert → 00010110 = 22; restore minus.', '−22'],
      ['Two’s complement', '−128 + 64 + 32 + 8 + 1', '−23'],
    ]),
    p('To preserve −23 while converting between signed representations, decode the source to −23 first, then encode −23 under the destination rule: one’s complement 11101000 becomes two’s complement 11101001. Keeping the bits unchanged would not preserve the value.', 'Use an intermediate value when rules differ'),
    p('A destination may be unable to represent the value. A negative integer cannot be stored in the unsigned or non-negative BCD models used here; +200 fits eight unsigned bits but not eight-bit two’s complement. State the limitation instead of silently truncating or reinterpreting the result.', 'Reject impossible conversions'),
  ], ['Conversion preserves the integer value; negation changes its sign; reinterpretation keeps the bits but changes their meaning.', 'Name the representation and width, convert, then decode to check.', 'Report values outside the destination range instead of dropping significant bits.'], {
    visual: visualTable('Three different operations', ['Operation', 'Input', 'Output'], [['Convert notation', '+45 denary', '+45 as 2D hexadecimal'], ['Negate', '+45', '−45'], ['Reinterpret bits', '11101001 unsigned: 233', '11101001 two’s complement: −23']]),
    checkpoint: ['A student calls 00101101 → 11010011 a value-preserving conversion from +45 to two’s complement. Correct the claim.', '+45 remains 00101101 in eight-bit two’s complement. 11010011 represents −45, so the student has negated the value.'],
  }),
  'S1.04-UNSIGNED': teach([
    p('Fix the width and representation first. Eight unsigned bits cover 0–255. Align the units columns, then work from right to left. A column total of 0 or 1 is written directly; 2 is binary 10, so write 0 and carry 1; 3 is binary 11, so write 1 and carry 1.', 'Make every carry visible'),
    table('Worked addition: 00101101 (45) + 00010111 (23)', ['Position (weight)', 'A', 'B', 'Carry in', 'Total', 'Write', 'Carry out'], additionExample.columns),
    p(`Read the written bits from position 7 back to position 0: ${additionExample.result}. This is 64 + 4 = 68, agreeing with 45 + 23. A carry between columns is ordinary working; it does not by itself mean overflow.`, 'Reassemble and check'),
    p('For subtraction, 0 − 1 requires a borrow. One unit from the column immediately to the left is worth two units in the current column. A borrow may pass through several zero columns before reaching a 1.', 'Explain a borrow by place value'),
    table('Worked subtraction: 01000000 (64) − 00000111 (7)', ['Stage', '128', '64', '32', '16', '8', '4', '2', '1'], [
      ['Original upper row', '0', '1', '0', '0', '0', '0', '0', '0'],
      ['After borrowing to the units column', '0', '0', '1', '1', '1', '1', '1', '2'],
      ['Subtract this row', '0', '0', '0', '0', '0', '1', '1', '1'],
      ['Result', '0', '0', '1', '1', '1', '0', '0', '1'],
    ]),
    p('The 64s column gives up its 1. Each intervening column receives 2, passes 1 to its right, and retains 1. The adjusted row is working notation, not a stored binary number: 32 + 16 + 8 + 4 + 2 + 2 still equals 64. Subtract each lower bit: the result 00111001 is 57. Check 57 + 7 = 64.', 'Track the borrow through zeros'),
    p('Unsigned 5 − 7 has true result −2, outside 0–255. A fixed-width subtraction may retain 11111110, unsigned 254, but that is not the required result. State that the true result cannot be represented. Do not silently interpret it as signed −2.', 'Check subtraction as well as addition'),
  ], ['Align equal widths and process columns from right to left, including each carry or borrow.', 'A borrowed unit has value two in the next column to the right.', 'Compare the true result with the unsigned range; a negative result does not fit.'], {
    visual: visualTable('Column rules', ['Total', 'Binary total', 'Result bit', 'Carry left'], [['0', '0', '0', '0'], ['1', '1', '1', '0'], ['2', '10', '0', '1'], ['3', '11', '1', '1']]),
  }),
  'S1.04-SIGNED': teach([
    p('Use the same column adder, but encode and interpret every operand under one signed rule at the same width. The main examples here use eight-bit two’s complement. Add all eight columns, retain the lowest eight bits, then check the true signed result against −128 to +127.', 'Reuse the adder with a signed interpretation'),
    table('Worked addition with different sign combinations', ['Calculation', 'Eight-bit operands', 'Full addition', 'Retained interpretation'], [
      ['+5 + (+3)', '00000101 + 00000011', '00001000', '+8'],
      ['+5 + (−3)', '00000101 + 11111101', '1 00000010', '+2; discard the carry out.'],
      ['−5 + (−3)', '11111011 + 11111101', '1 11111000', '−8; invert and add 1 gives magnitude 8.'],
    ]),
    steps('Worked subtraction: +7 − (+12)', [
      ['Rewrite the operation', 'A − B = A + (−B), so calculate +7 + (−12).'],
      ['Encode the negated operand', '+12 = 00001100; invert to 11110011 and add one → 11110100.'],
      ['Add', '00000111 + 11110100 = 11111011.'],
      ['Decode and check', 'Invert 11111011 → 00000100; add one → 00000101. The value is −5, which equals 7 − 12 and fits the range.'],
    ]),
    table('Subtracting a negative value', ['Step', '+7 − (−3)', '−7 − (−3)'], [
      ['Rewrite', '+7 + (+3)', '−7 + (+3)'],
      ['Add encoded operands', '00000111 + 00000011 = 00001010', '11111001 + 00000011 = 11111100'],
      ['Decode', '+10', '−4'],
      ['Check', '7 + 3 = 10', '−7 + 3 = −4'],
    ]),
    p('Negating the minimum eight-bit value −128 cannot produce a representable +128. For example, 0 − (−128) has true result +128 and overflows. Returning the same pattern 10000000 after invert-and-add-one is a width limit, not a valid positive result. Check the original mathematical subtraction even when the bit operations complete.', 'Handle the negation boundary'),
  ], ['Encode negative operands before adding, and decode retained bits under the same signed rule.', 'Two’s-complement subtraction adds the negation of the second operand.', 'Discarding a carry out does not establish whether the signed result is valid.'], {
    visual: visualTable('Two’s-complement subtraction', ['Original operation', 'Operation to add'], [['A − (+B)', 'A + (−B)'], ['A − (−B)', 'A + (+B)']]),
    extensions: [extension('One’s-complement end-around carry', [
      'One’s-complement arithmetic needs its own carry rule. In eight bits, +5 is 00000101 and −3 is 11111100. Their ordinary sum is 1 00000001. Add the carry out back into the lowest bit: 00000001 + 1 = 00000010, giving +2.',
      'For +3 + (−3), 00000011 + 11111100 = 11111111, the negative-zero pattern. This comparison explains why the two’s-complement discard rule must not be applied to one’s complement. Full one’s-complement arithmetic drills are outside the main sequence.',
    ])],
  }),
  'S1.05-OVERFLOW': teach([
    p('Overflow means that the exact mathematical result lies outside the range of the stated width and representation. Always report three things separately: the true value, the retained bit pattern, and the meaning of that retained pattern.', 'Define overflow before using a shortcut'),
    table('The same adder can require different decisions', ['Eight-bit addition', 'Rule', 'True value', 'Retained bits / value', 'Overflow?'], [
      ['01111111 + 00000001', 'Unsigned', '127 + 1 = 128', '10000000 / 128', 'No: 128 ≤ 255.'],
      ['01111111 + 00000001', 'Two’s complement', '127 + 1 = 128', '10000000 / −128', 'Yes: 128 > 127.'],
      ['11110000 + 00010000 = 1 00000000', 'Unsigned', '240 + 16 = 256', '00000000 / 0', 'Yes: 256 > 255.'],
      ['11111111 + 00000001 = 1 00000000', 'Two’s complement', '−1 + 1 = 0', '00000000 / 0', 'No: zero fits.'],
      ['10000000 + 11111111 = 1 01111111', 'Two’s complement', '−128 + (−1) = −129', '01111111 / +127', 'Yes: −129 < −128.'],
    ]),
    p('For unsigned addition, a carry beyond the width indicates that the sum exceeds the maximum. For two’s-complement addition, two positive operands producing a negative result, or two negative operands producing a non-negative result, indicates overflow. Opposite-sign operands cannot overflow on addition because their magnitudes partly cancel.', 'Use the rule for the stated representation'),
    p('For subtraction, calculate the true difference and compare it with the range. For example, +127 − (−1) = +128 and −128 − (+1) = −129 both overflow. The addition sign shortcut applies to an addition of valid encoded operands; checking the true difference also catches the unrepresentable negation of −128.', 'Transfer the range test to subtraction'),
    p('Increasing the width can make a result representable, but taking the low eight bits does not repair a result already outside the eight-bit range. A processor status flag reports an event; Lesson 021 connects these representation rules to processor registers and status information.', 'Connect the result to later processor work'),
  ], ['State the signed or unsigned range before deciding overflow.', 'Unsigned carry out and signed overflow are different conditions.', 'Same-sign two’s-complement addends with an opposite-sign result indicate overflow; verify using the true value.'], {
    visual: visualTable('Eight-bit ranges', ['Representation', 'Minimum', 'Maximum'], [['Unsigned', '0', '255'], ['One’s complement', '−127', '+127'], ['Two’s complement', '−128', '+127']]),
  }),
  'S1.07-CHARACTER-SETS': teach([
    p('A character is an abstract item such as A, 5 or a space. A character set identifies the available characters; a coded character set assigns numeric codes to them. An encoding specifies how these codes are stored as bits or bytes. A font supplies the visible glyph shapes when the text is drawn.', 'Follow meaning through to a visible glyph'),
    table('Worked round trip: A5 followed by a space', ['Character', 'Supplied ASCII code', 'Seven-bit code', 'Eight-bit storage with a leading zero'], [['A', '65', '1000001', '01000001'], ['5', '53', '0110101', '00110101'], ['space', '32', '0100000', '00100000']]),
    steps('Encode, store and decode in order', [
      ['Encode', 'Look up A, 5 and space in that order. With one byte per character the file contains 01000001 00110101 00100000.'],
      ['Separate stored units', 'The reader uses the agreed one-byte convention to obtain codes 65, 53 and 32.'],
      ['Decode', 'The same ASCII mapping recovers A, then 5, then the space. Changing the order or dropping the space changes the text.'],
      ['Display', 'The selected font draws the recovered characters. Changing the font changes their shapes without requiring different ASCII codes.'],
    ]),
    p('The numeric integer 5 stored as an unsigned byte is 00000101. The character “5” under ASCII is code 53, stored here as 00110101. Arithmetic on a numeric value and displaying a digit character are different uses of data. Lesson 058 revisits this distinction when selecting data types.', 'Distinguish a digit character from a number'),
    p('A code has meaning only under an agreed mapping and encoding. A bit sequence alone cannot identify the intended text. In these exercises all required codes are supplied; learn the method rather than a table of memorised codes.', 'State the decoding requirement'),
  ], ['A character maps to a numeric code, then an encoding stores the code as bits or bytes.', 'Decode using the agreed mapping, storage boundaries and original order.', 'A glyph is a drawn shape; a digit character is not the same stored value as an integer.'], {
    visual: visualTable('Encode and decode characters in order', ['Character', 'Supplied ASCII code', 'Byte'], [['A', '65', '01000001'], ['5', '53', '00110101'], ['space', '32', '00100000']]),
  }),
  'S1.07-ASCII': teach([
    p('Standard ASCII uses seven bits for each code, allowing 2⁷ = 128 codes numbered 0–127. Some represent letters, digits and punctuation; others are control codes, so 128 codes does not mean 128 printable symbols.', 'Count codes from zero'),
    p('Seven-bit code 1000010 has value 64 + 2 = 66. If the supplied ASCII table says 66 is B, it decodes to B. In a system storing each ASCII code in a byte it is 01000010; the extra leading zero does not create a different ASCII character.', 'Decode a code at the correct width'),
    p('ASCII can represent basic English text efficiently, but its limited repertoire cannot cover all writing systems. An agreement on standard ASCII ensures that the same supported code is interpreted consistently by different systems.', 'Connect capacity to suitability'),
  ], ['Standard ASCII has seven-bit codes: 128 possibilities, numbered 0–127.', 'The repertoire includes printable characters and control codes.', 'A leading zero may pad a seven-bit ASCII code for byte storage.'], {
    visual: visualTable('ASCII capacity', ['Bits per code', 'Number of codes', 'Smallest', 'Largest'], [['7', '128', '0000000 (0)', '1111111 (127)']]),
  }),
  'S1.07-EXTENDED-ASCII': teach([
    p('An eight-bit extension can use 2⁸ = 256 code values, 0–255. It normally retains the original ASCII assignments in the lower half and uses the extra values for more characters. The extension adds 128 code positions, not another 256.', 'Extend the available code space'),
    table('Worked mismatch using two supplied example tables', ['Byte', 'Table A assignment', 'Table B assignment'], [['01000001 (65)', 'A', 'A'], ['10000000 (128)', 'é', '€']]),
    p('These two rows are an illustrative pair of mappings, not named real code pages. A sender using Table A encodes Aé as bytes 65, 128. A receiver using Table B decodes the same bytes as A€. No transmitted bit changed: the systems disagreed about the mapping. Using the same agreed table restores Aé.', 'Separate a mapping mismatch from corrupted data'),
    p('“Extended ASCII” does not name one universal table. Different eight-bit code pages use the extra positions differently. A single extension also still has too few code positions for a wide multilingual repertoire.', 'Identify the remaining limitations'),
  ], ['An eight-bit extension has 256 possible codes and 128 extra positions beyond ASCII.', 'Different extensions may assign different characters to the same extra code.', 'Both systems must agree on the character mapping.'], {
    visual: visualTable('Same bits, different agreed tables', ['Stored byte', 'Receiver with Table A', 'Receiver with Table B'], [['10000000', 'é', '€']]),
  }),
  'S1.07-UNICODE': teach([
    p('Unicode gives a much larger shared repertoire for characters from many writing systems and assigns code points to them. Code points are conventionally written as U+ followed by hexadecimal digits. A code point is a number identifying a character; it is not by itself a rule saying how many bytes to store.', 'Separate repertoire, code point and encoding'),
    table('A supplied Unicode example', ['Character', 'Code point', 'UTF-8 bytes in hexadecimal'], [['A', 'U+0041', '41'], ['中', 'U+4E2D', 'E4 B8 AD']]),
    p('For this supplied example, A中 encoded in UTF-8 has bytes 41 E4 B8 AD. A UTF-8 decoder recovers U+0041 and U+4E2D, then the characters A中. The two characters use four bytes in total. A font must also contain suitable glyphs to display them.', 'Follow a multilingual round trip'),
    p('UTF-8 and UTF-16 are encodings of Unicode code points. UTF-8 uses a variable number of bytes; UTF-16 uses one or two 16-bit code units for a code point. “Unicode always uses 16 bits per character” is therefore incorrect. The exact UTF-8 bit-construction algorithm is an optional extension, not needed to explain the distinction.', 'Avoid a fixed-width misconception'),
    p('A shared character repertoire supports consistent multilingual exchange; the sender and receiver must still use compatible encodings. Without a stated encoding and text, character count alone is insufficient to calculate a Unicode file’s byte size.', 'Connect purpose to storage'),
  ], ['Unicode assigns code points across a broad shared repertoire.', 'An encoding such as UTF-8 or UTF-16 determines the stored code units and bytes.', 'State the encoding before estimating text size.'], {
    visual: visualTable('Three separate layers', ['Layer', 'Example'], [['Character', '中'], ['Unicode code point', 'U+4E2D'], ['UTF-8 storage', 'E4 B8 AD']]),
    extensions: [extension('UTF-8 compatibility', ['ASCII code points U+0000–U+007F keep their single-byte values in UTF-8. Other code points need more bytes. This helps explain why basic ASCII text is also valid UTF-8, but an arbitrary eight-bit extension is not automatically valid UTF-8.'])],
  }),
  'S1.08-BITMAP-STRUCTURE': teach([
    p('A bitmap stores an ordered rectangular grid of pixels. Each pixel is one position in that grid and has one selected colour value. The file stores codes for these values; a palette may map short codes to colours, or a format may store colour components directly.', 'Rebuild an image from ordered values'),
    p('The supplied diagram is a 10-column, 6-row bitmap with two bits per pixel and a four-colour palette. Read row by row from the top left. The second row contains codes 00 01 01 00 00 00 01 01 00 00. Use the palette to replace each code with its colour while keeping its position. Repeating this for all six rows reconstructs the shown grid.', 'Complete the code-to-pixel procedure'),
    p('The header supplies information needed to interpret the data, such as width, height and colour depth. Here the width tells the reader to start a new row after every ten codes. The palette tells it which colour each code selects. A format can store other header information too; never assume every real header has the same fields or size.', 'Explain why the metadata is needed'),
    p('There are 10 × 6 = 60 pixels, each needing two bits. The pixel data is 120 bits = 15 bytes. This count excludes the header and palette. The same 120 bits cannot be reconstructed correctly without the agreed dimensions, pixel order and colour mapping.', 'Check the reconstructed data'),
  ], ['A bitmap contains an ordered pixel grid and the information needed to interpret it.', 'Each pixel stores one colour value; its position matters.', 'Distinguish pixel-data size from the complete file size.']),
  'S1.08-COLOUR-DEPTH': teach([
    p('Colour depth is the number of bits used for one pixel’s colour code. With n bits there are 2ⁿ possible codes. One bit allows two colours; two bits allow four; four bits allow sixteen. The bits select one colour for a pixel, not several colours at once.', 'Count possible colour values'),
    p('The diagram uses the same 8 × 8 source pattern in every panel. Only the number of available grey levels changes. With 1, 2 and 4 bits per pixel, the raw pixel data uses 64, 128 and 256 bits: 8, 16 and 32 bytes respectively. Dimensions and pixel count stay fixed.', 'Change one variable at a time'),
    p('More levels can represent smaller tonal differences, reducing visible banding when the source contains such differences. Doubling the depth from 2 to 4 bits doubles the raw data size but increases the possible colours from 4 to 16. Doubling bits does not merely double the colour count.', 'Explain quality and size together'),
    p('A two-colour diagram may need only one bit per pixel. A photograph with many shades may benefit from more colour values. Raising the depth of an existing low-depth file adds representational capacity; it does not recover colours that were discarded earlier.', 'Choose depth for the content'),
  ], ['n bits per pixel allows 2ⁿ colour codes.', 'Increasing depth can preserve finer colour or tonal differences.', 'At fixed dimensions, raw pixel-data size is proportional to colour depth.']),
  'S1.08-IMAGE-RESOLUTION': teach([
    p('Image resolution here means the dimensions of the stored pixel grid, such as 640 × 480 pixels. This is 640 columns and 480 rows, giving 307,200 pixels. A screen has its own pixel grid; showing an image on a larger screen does not change the image’s stored resolution.', 'Name the grid being measured'),
    table('Worked comparison at a fixed depth of 8 bits per pixel', ['Change', 'Dimensions', 'Pixels', 'Raw pixel bytes'], [['Original', '640 × 480', '307,200', '307,200'], ['Double width only', '1280 × 480', '614,400', '614,400'], ['Double width and height', '1280 × 960', '1,228,800', '1,228,800']]),
    p('Capturing the same scene with more suitably measured pixels can preserve finer spatial detail. Doubling both dimensions gives four times as many samples and four times the raw data at the same depth. It does not merely double the file size.', 'Connect sampling density to detail'),
    p('Enlarging a stored bitmap instead copies or interpolates its existing pixel values. It cannot recover original scene detail that was never captured. Nearest-neighbour enlargement exposes square blocks; interpolation may smooth the boundaries but does not recreate the missing measurements.', 'Separate new capture from enlargement'),
  ], ['Stored image resolution specifies the pixel grid, independent of screen resolution.', 'At fixed depth, raw data size is proportional to width × height.', 'More captured pixels may retain detail; enlargement cannot restore absent source detail.'], {
    visual: visualTable('Two grids', ['Grid', 'What it describes'], [['Image resolution', 'Stored columns × rows of image pixels'], ['Screen resolution', 'Physical display grid used to show an image']]),
  }),
  'S1.08-FILE-SIZE': teach([
    p('For an uncompressed bitmap under the stated simplified model, pixel-data bits = width × height × bits per pixel. Divide by eight for bytes. If an actual format adds a header, palette or row padding, include these only when their sizes or rules are supplied; compression requires a different calculation.', 'State the storage model'),
    steps('Worked file size: 640 × 480 pixels, 8 bits per pixel, 54-byte header', [
      ['Count pixels', '640 × 480 = 307,200 pixels.'],
      ['Count pixel-data bits', '307,200 × 8 = 2,457,600 bits.'],
      ['Convert to bytes and KiB', '2,457,600 / 8 = 307,200 bytes = 300 KiB of pixel data.'],
      ['Include the supplied header', '307,200 + 54 = 307,254 bytes. Assume no palette, padding or other overhead for this calculation.'],
      ['Check a changed depth', 'At 16 bits per pixel, data becomes 614,400 bytes. With the same 54-byte header the whole file is 614,454 bytes, not twice 307,254.'],
    ]),
    p('When dimensions, depth and overhead are specified, this is an exact count. Real compressed image sizes cannot be found from dimensions and depth alone because content and compression settings affect the stored size.', 'Keep the result within its assumptions'),
  ], ['Raw pixel bits = width × height × colour depth.', 'Divide bits by eight before applying byte prefixes.', 'Add stated overhead in consistent units; do not double a fixed header when depth doubles.'], {
    visual: visualTable('Size calculation units', ['Quantity', 'Unit'], [['Width × height', 'pixels'], ['Pixels × colour depth', 'bits'], ['Bits / 8', 'bytes'], ['Bytes / 1024', 'KiB']]),
  }),
  'S1.09-VECTOR-LIST': teach([
    p('A vector graphic stores descriptions of objects and their properties in a drawing list. The renderer interprets these descriptions to produce a visible image. Unlike a bitmap, the source does not have to list a colour for every output pixel.', 'Define the representation'),
    table('Complete drawing list for the diagram', ['Order', 'Object', 'Geometry', 'Other properties'], [['1', 'Rectangle', 'Top-left (10, 10); width 40; height 20', 'Blue fill; no outline'], ['2', 'Line', 'Start (10, 30); end (50, 30)', 'Black stroke; thickness 2']]),
    steps('Render the list on a 60 × 45 canvas', [
      ['Establish coordinates', 'Origin (0, 0) is at the top left. x increases to the right; y increases downwards. Coordinates and thickness use the same arbitrary drawing units.'],
      ['Draw object 1', 'The rectangle extends from x = 10 to 50 and y = 10 to 30. Fill that area blue.'],
      ['Draw object 2', 'Draw the horizontal line from (10, 30) to (50, 30), with a black stroke of width 2 centred on the line.'],
      ['Check order', 'The line is drawn last, so it lies over the rectangle’s lower edge. Swapping overlapping objects can change which parts remain visible.'],
    ]),
    p('Different objects require different defining properties: a circle can use a centre and radius; a polygon can use a sequence of vertices. Colour, fill, line thickness and position are common properties. Include enough data to reconstruct the intended object instead of merely naming its shape.', 'Generalise the drawing-list method'),
  ], ['Vector files store object descriptions and properties in a drawing list.', 'Coordinates, dimensions, style and drawing order determine the rendered result.', 'Choose defining properties appropriate to each object type.'], {
    visual: exactVisual('vector-drawing', 'One drawing list, reconstructed and scaled', ['The original canvas is 60 by 45 drawing units, with the origin at the top left.', 'A blue rectangle runs from (10,10) to (50,30); a black line of thickness 2 is drawn last from (10,30) to (50,30).', 'Scaling every coordinate, dimension and stroke width by 2 gives a 120 by 90 canvas, a rectangle at (20,20) of size 80 by 40, and a line of thickness 4.']),
  }),
  'S1.09-BITMAP-VECTOR-SCALING': teach([
    table('Scale the supplied drawing list by a factor of two', ['Property', 'Original', 'Scaled'], [['Canvas', '60 × 45', '120 × 90'], ['Rectangle top-left', '(10, 10)', '(20, 20)'], ['Rectangle size', '40 × 20', '80 × 40'], ['Line endpoints', '(10, 30) to (50, 30)', '(20, 60) to (100, 60)'], ['Line thickness', '2', '4, under the stated scaling rule']]),
    p('The vector renderer recalculates the objects from their descriptions for the required output size. Its geometry therefore retains smooth shapes under enlargement. A screen still displays a rasterised result on pixels: the advantage concerns the scalable source representation, not the absence of display pixels.', 'Explain why scaling differs'),
    p('A bitmap has a fixed source grid. Enlarging it must copy or interpolate that grid, so edges can become blocky or blurred. A vector description instead continues to define the edge geometrically at the new size. Neither representation guarantees a smaller file in every case: complexity and encoding also matter.', 'Compare the mechanisms'),
    table('Choose a representation from the requirement', ['Scenario', 'Suitable choice', 'Reason linked to the content'], [['Photograph with complex texture', 'Bitmap', 'Stores the many sampled colour variations directly.'], ['Logo used on a small icon and a large sign', 'Vector', 'Simple shapes can be redrawn at both sizes without enlarging a fixed source grid.'], ['Editable engineering outline', 'Vector', 'Individual objects and precise geometry remain available for editing.'], ['Pixel-art game sprite', 'Bitmap', 'The deliberately designed pixel grid is part of the intended appearance.']]),
  ], ['Enlargement of a bitmap uses its existing pixel grid.', 'Vector geometry can be recalculated at the output size.', 'Justify a choice using content, scaling and editing requirements.'], {
    visual: visualTable('Enlargement mechanisms', ['Source', 'What changes'], [['Bitmap', 'Existing pixel values are copied or interpolated.'], ['Vector', 'Object geometry is scaled and rendered again.']]),
  }),
  'S1.10-ANALOGUE-SAMPLING': teach([
    p('An analogue sound signal varies continuously with time and amplitude. Digital storage contains discrete measurements: sampling chooses equally spaced times, quantisation chooses from a finite set of amplitude levels, and encoding assigns a binary code to each chosen level.', 'Separate three stages'),
    p('This small model uses four samples per second and three bits per sample. There are eight allowed levels −4, −3, −2, −1, 0, 1, 2, 3. Round each measurement to the nearest allowed level; an exact halfway case would round upwards, and values beyond the range would clip to the nearest endpoint. None of the measurements below needs a tie or clipping rule.', 'Define a complete teaching model'),
    table('Worked sampling, quantisation and encoding', ['Time (s)', 'Measured amplitude', 'Nearest level', 'Unsigned code value = level + 4', 'Stored bits'], samplingExample.samples.map(s => [String(s.time), String(s.measured), String(s.level), String(s.level + 4), s.code])),
    p('The stored stream is 001 011 110 111, in time order: four samples × three bits = 12 bits of sample data. The code mapping is an explicitly defined offset code, not three-bit two’s complement and not a claim about a real audio file format. The −3 level has code value 1, so it is 001.', 'Preserve the mapping and order'),
    steps('Decode and reconstruct', [
      ['Read the sample codes', 'Split the stream into three-bit groups: 001, 011, 110, 111.'],
      ['Recover levels', 'Convert codes to values 1, 3, 6, 7 and subtract 4, giving −3, −1, 2, 3.'],
      ['Recover timing', 'At 4 Hz, place those levels at 0, 0.25, 0.50 and 0.75 seconds.'],
      ['Explain the limit', 'A playback system uses timed levels to construct an analogue output. It cannot recover the exact original values −3.2, −0.6, 1.6 and 2.7 or all changes between sample times from these codes alone.'],
    ]),
    p('The brown line is a simplified continuous source trace; blue points show the quantised levels at the sample times. The trace’s straight segments are a teaching model, not a claim about the shape of every sound wave. Lesson 016 connects this data model to microphones, ADCs, DACs and speakers.', 'Connect data to devices'),
  ], ['Sampling chooses times; quantisation chooses levels; encoding stores their binary codes.', 'Decode using the same code mapping, width, order and sampling rate.', 'Quantisation and finite sampling limit how closely a recording can represent the analogue source.'], {
    visual: exactVisual('sound-sampling', 'Four measurements become four stored codes', ['At 4 Hz the sample times are 0, 0.25, 0.50 and 0.75 seconds.', 'Measurements −3.2, −0.6, 1.6 and 2.7 round to levels −3, −1, 2 and 3.', 'The defined three-bit offset codes are 001, 011, 110 and 111; decoding recovers the quantised levels, not the exact measurements.']),
  }),
  'S1.10-SAMPLING-RATE': teach([
    p('Sampling rate is the number of samples taken per second per channel, measured in hertz (Hz). Rate determines the spacing in time: at 4 Hz the interval is 1/4 second; at 8 Hz it is 1/8 second. Keep the amplitude levels unchanged when comparing the effect of rate.', 'Change timing independently of amplitude levels'),
    p('In the diagram, both rows sample the same defined one-second analogue trace at the same three-bit resolution. The 4 Hz row takes four values; the 8 Hz row takes eight and captures additional changes between the earlier sampling times. This illustrates greater time detail during capture; it does not imply that doubling the rate always audibly improves every source.', 'Read the controlled comparison'),
    steps('Worked uncompressed sound size', [
      ['State the inputs', 'Duration 5 s; rate 16,000 Hz; resolution 16 bits per sample; one channel (mono). Exclude headers and compression.'],
      ['Count samples', '5 × 16,000 × 1 = 80,000 sample values.'],
      ['Count bits', '80,000 × 16 = 1,280,000 bits.'],
      ['Convert to bytes', '1,280,000 / 8 = 160,000 bytes.'],
      ['Vary one parameter', 'Doubling rate to 32,000 Hz doubles data to 320,000 bytes. Keeping 16,000 Hz but using two channels also gives 320,000 bytes.'],
    ]),
    p('In general, raw sound bytes = duration × sampling rate × bits per sample × channels / 8. Use seconds and samples per second consistently. Sampling rate is not the connection’s transfer bit rate; Lesson 012 uses the resulting data volume when reasoning about streaming.', 'Generalise and connect'),
    p('Resampling an existing recording at a higher rate computes extra values from stored samples. It does not make new measurements of the original source or recover detail already lost during capture.', 'Separate recapture from upsampling'),
  ], ['Sampling rate specifies samples per second per channel and controls time spacing.', 'At fixed duration, resolution and channel count, raw sound size is proportional to rate.', 'Upsampling an existing recording cannot restore uncaptured source information.'], {
    visual: exactVisual('sampling-rate', 'Compare rate with the amplitude grid held fixed', ['Both panels use the same source trace and the same eight allowed amplitude levels.', '4 Hz takes four samples over one second; 8 Hz takes eight samples over the same interval.', 'The extra sample times can record changes missed between the lower-rate measurements.']),
    extensions: [extension('Too few samples', ['A rapid change can occur between sample times and leave little evidence in the stored values. Raising the capture rate may reduce that ambiguity. A full treatment of frequency limits, filtering and aliasing belongs to a later signal-processing course.'])],
  }),
  'S1.10-SAMPLING-RESOLUTION': teach([
    p('Sampling resolution is the number of bits used for each amplitude sample. With n bits there are 2ⁿ codes and therefore up to 2ⁿ distinguishable levels. Keep the amplitude range and sample times fixed to isolate the effect of resolution.', 'Change amplitude precision independently of timing'),
    table('Quantise the same four measurements at the same times', ['Measured value', '2-bit level from {−3, −1, 1, 3}', 'Absolute error', '3-bit level from {−4, −3, −2, −1, 0, 1, 2, 3}', 'Absolute error'], [['−3.2', '−3', '0.2', '−3', '0.2'], ['−0.6', '−1', '0.4', '−1', '0.4'], ['1.6', '1', '0.6', '2', '0.4'], ['2.7', '3', '0.3', '3', '0.3']]),
    p('Both models cover the same input amplitude range −4 to +4, with allowed reconstruction levels explicitly shown. Smaller gaps between levels can reduce quantisation error; an individual sample can still quantise to the same value at both resolutions. The number and timing of samples do not change.', 'Explain the accuracy improvement precisely'),
    p('Four samples require 4 × 2 = 8 bits at two-bit resolution or 4 × 3 = 12 bits at three-bit resolution. In practical settings, moving from 8 to 16 bits per sample doubles raw size at fixed rate and duration, but increases the number of possible levels from 256 to 65,536.', 'Connect resolution to capacity and size'),
    p('More bits in an existing file cannot restore amplitude differences previously rounded away. The benefit comes from retaining finer measurements when capturing or preserving higher-precision source data.', 'State the boundary'),
  ], ['n bits per sample supports 2ⁿ amplitude levels.', 'More levels over the same range can reduce quantisation error.', 'At fixed sample count, raw data size is proportional to bits per sample.'], {
    visual: exactVisual('sampling-resolution', 'Compare level spacing at unchanged sample times', ['Both panels use the same four measurements at the same times and the same input range −4 to +4.', 'The two-bit model has four allowed levels; the three-bit model has eight.', 'The measurement 1.6 rounds to 1 with two bits or 2 with three bits, reducing its absolute error from 0.6 to 0.4.']),
  }),
  'S1.11-WHY-COMPRESS': teach([
    p('Compression represents data using fewer stored bits when the method can exploit its structure or discard acceptable information. Smaller files need less storage and fewer transmitted bits. Compression itself does not increase the physical connection’s bit rate.', 'Connect a smaller file to a practical need'),
    p('Suppose a link carries 8,000,000 bits each second and overhead is ignored. A 2,000,000-byte file contains 16,000,000 bits and needs two seconds. Compressing it to 1,000,000 bytes reduces transfer time to one second at the same link rate. Encoding and decoding may also cost processing time.', 'Work through a transfer example'),
    p('Compression is useful for limited storage, downloads and streaming. The method must suit the data and whether exact recovery is required. No lossless compressor can guarantee a smaller result for every input; headers, tables or references can outweigh the savings.', 'Check the trade-off'),
  ], ['Fewer bits can reduce storage and transfer time.', 'The benefit depends on the data, method and overhead.', 'Consider exact recovery as well as size and processing cost.'], {
    visual: visualTable('Same link, fewer bits', ['File size', 'Bits', 'Time at 8,000,000 bits/s'], [['2,000,000 bytes', '16,000,000', '2 seconds'], ['1,000,000 bytes', '8,000,000', '1 second']]),
    extensions: [extension('State a compression ratio convention', ['Using original size / compressed size, a reduction from 2000 bytes to 1000 bytes is 2:1, with a 50% size saving. Other sources may report compressed/original as 0.5 or 50%; always state the definition. Include all stored overhead when comparing complete files.'])],
  }),
  'S1.11-COMPARISON': teach([
    p('Lossless compression can reproduce every original data value exactly after decoding. Lossy compression discards some source information, so its decoded result is an approximation. Judge the recovery of the original data, not whether a user notices a difference.', 'Use reversibility as the deciding test'),
    table('Choose a method for a stated purpose', ['Data and requirement', 'Choice', 'Reason'], [['Source code or text that must remain exact', 'Lossless', 'Changing even one character may alter the meaning or program.'], ['Editable image or sound master', 'Lossless', 'Preserves all source values for later edits and exports.'], ['Photograph preview with a tight transfer budget', 'Lossy may be suitable', 'Some fine image information may be sacrificed if the resulting quality is acceptable.'], ['Speech delivery with limited bandwidth', 'Lossy may be suitable', 'Smaller data may justify some signal approximation when intelligibility remains adequate.']]),
    p('Lossless does not mean “uncompressed”, and lossy does not mean “always visibly damaged”. A photograph can use either approach. A file extension alone is less useful than a stated encoding method and settings when deciding whether exact recovery is possible.', 'Avoid labels without a mechanism'),
  ], ['Lossless decoding restores the original data exactly; lossy decoding cannot restore discarded information.', 'Choose lossless when exactness or an editable master is required.', 'Justify any lossy choice using both the size constraint and acceptable quality.'], {
    visual: visualTable('Recovery test', ['Method', 'After decoding'], [['Lossless', 'Every original data value can be recovered.'], ['Lossy', 'An approximation remains; discarded information is unavailable.']]),
  }),
  'S1.11-RLE': teach([
    p('Run-length encoding replaces a consecutive run of identical values with a count and the value. The order of runs must remain unchanged. Here a pair stores an eight-bit count followed by an eight-bit character code; the human-readable notation 4A is shorthand for those two fields.', 'Define the encoded format'),
    table('Worked encode and decode', ['Source run', 'Stored pair', 'Decoder output'], [['AAAA', '(4, A)', 'AAAA'], ['BB', '(2, B)', 'BB'], ['CCCCCCCC', '(8, C)', 'CCCCCCCC'], ['DD', '(2, D)', 'DD']]),
    p('Scan AAAABBCCCCCCCCDD from left to right. Count until the value changes, emit that count and value, then start the next run. The result is (4,A), (2,B), (8,C), (2,D). Decoding repeats each value its stated number of times and concatenates the runs, recovering all 16 original characters in the same order.', 'Complete both directions'),
    table('Count storage under the stated format', ['Input', 'Original cost', 'RLE cost', 'Conclusion'], [['AAAABBCCCCCCCCDD', '16 × 8 = 128 bits', '4 × (8 + 8) = 64 bits', '64 bits saved; size halved.'], ['ABC', '3 × 8 = 24 bits', '3 × (8 + 8) = 48 bits', 'Encoded size doubles.']]),
    p('The counts above exclude any header and assume count/value fields are unambiguous. AAABAA must encode as (3,A), (1,B), (2,A); merging the A runs would move or lose B. An eight-bit unsigned count has maximum 255, so a run of 260 As must split, for example into (255,A), (5,A), under this format.', 'Keep order and field limits'),
    p('RLE is effective for long uniform bitmap runs or other repeated adjacent data. A detailed or noisy image with frequent changes may contain mostly short runs. Its encoded size can grow. If the original pixels use one bit each but each run needs an eight-bit count plus one-bit value, compare with that nine-bit pair cost, not the character example’s sixteen bits.', 'Transfer the method to bitmap data'),
  ], ['RLE stores a count and value for each consecutive run and decodes them in order.', 'Count both fields and any supplied overhead when judging savings.', 'Short runs or limited count fields can reduce or reverse the benefit.'], {
    visual: exactVisual('rle-roundtrip', 'Trace every run and count every stored field', ['AAAABBCCCCCCCCDD has runs of 4 As, 2 Bs, 8 Cs and 2 Ds.', 'Four eight-bit counts and four eight-bit character codes use 64 bits, compared with 128 source bits.', 'ABC requires three count/value pairs and grows from 24 to 48 bits under the same format.']),
  }),
  'S1.11-LOSSLESS-FILES': teach([
    p('Lossless methods replace redundancy with an exact reversible description. RLE is one example. Other methods can reference repeated strings or patterns; they must also store enough information for the decoder to interpret the references.', 'Move from runs to repeated structures'),
    table('Complete text dictionary model', ['Part', 'Stored information'], [['Source', 'RED RED BLUE RED'], ['Dictionary', 'Reference 1 means the exact string RED.'], ['Typed token stream', 'REF(1), SPACE, REF(1), SPACE, LITERAL(BLUE), SPACE, REF(1)'], ['Decode', 'RED + space + RED + space + BLUE + space + RED'], ['Recovered text', 'RED RED BLUE RED']]),
    p('Typed REF and LITERAL tokens keep a reference distinct from an ordinary digit or word. Every space is explicitly retained. The dictionary, markers, separators and any header also need storage. This model demonstrates exact recovery; without a specified binary token format it does not establish a byte saving.', 'Make the format unambiguous'),
    table('Lossless methods across media', ['Data', 'Example mechanism', 'What decoding preserves'], [['Bitmap', 'RLE of identical adjacent pixel codes', 'Each original pixel value at its position'], ['Sound samples', 'RLE of repeated adjacent numeric samples', 'Every original sample value in time order'], ['Vector drawing', 'One shared object definition with references and positions', 'The defined objects, properties and placement']]),
    p(`A small sound model contains ${soundRunExample.samples.join(', ')}. Store runs (4,12), (2,13), (6,9). With an eight-bit count and eight-bit sample value, the original 12 × 8 = 96 bits becomes 3 × 16 = 48 bits, excluding headers. Expanding the runs exactly restores all twelve values. Real audio often has little adjacent repetition; this example proves the mechanism, not that RLE is generally the best audio compressor.`, 'Complete a numerical sound example'),
    p('For a vector drawing, define one five-point star S with its geometry and fill, then place references to S at (10,20), (40,20) and (70,20). The renderer can reconstruct the three identical objects at those positions. This can reduce repeated object descriptions. It preserves the drawing model and appearance under these assumptions; rewriting the object list does not guarantee restoration of the original file’s byte sequence. Byte-for-byte file compression must preserve that sequence too.', 'Distinguish drawing reuse from exact file recovery'),
  ], ['A lossless format must retain everything needed to reverse its encoding.', 'Text references must preserve literals, separators and order as well as repeated strings.', 'For media, state exactly what is reconstructed and account for metadata or reference overhead.'], {
    visual: visualTable('Text dictionary decoding', ['Token', 'Output'], [['REF(1)', 'RED'], ['SPACE', 'one space'], ['LITERAL(BLUE)', 'BLUE']]),
  }),
  'S1.11-LOSSY-FILES': teach([
    p('Lossy compression trades exact recovery for a more compact approximation. A codec may discard fine visual differences or parts of an audio signal judged less noticeable. The precise mechanism depends on the method; removing every second sample or merely changing a filename is not a general description of audio compression.', 'Describe the loss and its purpose'),
    p('A simple image model maps original grey values 100, 101, 102, 103 to the single stored representative 102. After decoding, all four become 102. The decoder cannot know which pixel was originally 100 or 103. The example demonstrates irreversible value reduction; whether the complete file becomes smaller depends on how the reduced values and metadata are encoded.', 'Show why information cannot be recovered'),
    p('For bitmap photographs, reducing less noticeable fine detail can lower the amount of data needed while retaining acceptable appearance. Stronger loss may create visible artefacts. Lossless bitmap compression instead restores all original pixel codes. For sound, a lossy method may remove or simplify signal information judged less audible; lossless sound compression restores all original digital sample values.', 'Apply the distinction to images and sound'),
    p('Ordinary text and programs normally require exact characters, so lossy alteration is unsuitable. Simplifying a vector drawing by deleting small shapes or reducing coordinate precision also changes its geometry; sharing an unchanged object definition does not itself introduce that loss.', 'Apply the distinction to text and vectors'),
    p('Keep a lossless master when future editing matters. Choose a lossy delivery copy only when its size advantage and quality are appropriate to the task. Increasing resolution later cannot reconstruct information that was discarded during compression.', 'Make a justified choice'),
  ], ['Lossy methods permanently discard some source information.', 'State the kind of detail sacrificed and why the result meets the use case.', 'Exact text, geometry or editable masters require preservation of the relevant source data.'], {
    visual: visualTable('Irreversible reconstruction', ['Source values', 'Stored representative', 'Decoded values'], [['100, 101, 102, 103', '102 for each position', '102, 102, 102, 102']]),
    extensions: [extension('Repeated lossy exports', ['Editing a decoded lossy copy and encoding it again can introduce further error. Repeatedly copying an unchanged compressed file does not do this: its bytes remain the same. Preserve an appropriate master and make new delivery copies from it.'])],
  }),
};

const lessonOrders = {
  3: ['S1.04-UNSIGNED', 'S1.04-SIGNED', 'S1.05-OVERFLOW'],
  6: ['S1.10-ANALOGUE-SAMPLING', 'S1.10-SAMPLING-RATE', 'S1.10-SAMPLING-RESOLUTION', 'S1.11-WHY-COMPRESS', 'S1.11-COMPARISON', 'S1.11-RLE', 'S1.11-LOSSLESS-FILES', 'S1.11-LOSSY-FILES'],
};
const lessonRoutes = {
  1: 'Start with bits and pattern counts, then compare prefix scales and calculate complete-file capacity.',
  2: 'Phase 1: positional systems and conversions. Phase 2: BCD digits. Phase 3: signed representations and value-preserving conversions.',
  3: 'Start with unsigned column methods, apply them to signed values, then decide overflow using the correct range.',
  4: 'Follow characters through codes and stored bytes to decoded text, then compare ASCII, eight-bit extensions and Unicode.',
  5: 'Reconstruct a bitmap, explain its quality and size, then render and scale a vector drawing list.',
  6: 'Phase 1: sample, quantise, encode and size sound. Phase 2: encode, decode and evaluate compression across media.',
};

const reviewTasks = [
  {
    id: 'S1-REVIEW-NUMBERS', type: 'Practice', authored: true, objectiveIds: ['S1.03.R', 'S1.02.R', 'S1.04.R', 'S1.05.R'],
    prompt: 'Interpret the unchanged pattern 11110101 in denary as unsigned, one’s complement and two’s complement. Then calculate 01111110 + 00000010 at eight bits and explain the overflow decision for unsigned and two’s-complement interpretations.',
    answerPoints: ['Unsigned: 245.', 'One’s complement: invert to 00001010, giving −10.', 'Two’s complement: −128 + 64 + 32 + 16 + 4 + 1 = −11.', 'The retained sum is 10000000.', 'Unsigned 128 fits 0–255, so no overflow occurs.', 'Signed +128 exceeds +127; the retained pattern means −128, so signed overflow occurs.'],
    commonError: 'State the interpretation each time; carry out is not a universal overflow test.',
  },
  {
    id: 'S1-REVIEW-MEDIA', type: 'Practice', authored: true, objectiveIds: ['S1.01.R', 'S1.08.R', 'S1.09.R', 'S1.10.R', 'S1.11.R'],
    prompt: 'Calculate raw data bytes for a 48 × 20 bitmap at 4 bits per pixel, and a 3-second mono recording at 6000 Hz and 8 bits per sample. Exclude headers. A vector line joins (2,3) to (6,3), thickness 1: state its properties after scaling everything by 3. Explain whether RLE helps the bitmap row 000000111111000000 when each run uses an 8-bit count and 1-bit value.',
    answerPoints: ['Bitmap: 48 × 20 × 4 / 8 = 480 bytes.', 'Sound: 3 × 6000 × 8 × 1 / 8 = 18,000 bytes.', 'The line joins (6,9) to (18,9).', 'Its thickness becomes 3 under the stated scaling rule.', 'The row has three runs: (6,0), (6,1), (6,0).', 'The original 18 bits becomes 3 × (8 + 1) = 27 bits; RLE increases its size by 9 bits.'],
    commonError: 'State the field costs before claiming that a repeated pattern compresses well.',
  },
].map(q => ({ ...q, marks: q.answerPoints.length }));

function authorSection1Review(lesson) {
  const first = lesson.units.find(u => u.heading.startsWith('Section 1:'));
  if (!first) return lesson;
  const unit = {
    ...first, unitKey: 'S1-REVIEW', useAuthoredVisual: true,
    explanation: ['Recover meaning using a stated representation, then show the calculation or reconstruction and check its boundary.'],
    teachingBlocks: [
      table('Retrieve a method and produce evidence', ['Focus', 'Evidence to produce without notes'], [
        ['Units and patterns', 'Explain 2ⁿ patterns versus maximum 2ⁿ − 1; convert prefixes through bytes.'],
        ['Numbers and arithmetic', 'Convert both ways; decode signed values; show carries or borrows and judge overflow.'],
        ['Characters', 'Use supplied codes to encode and decode a string; distinguish a code point from its stored bytes.'],
        ['Bitmap and vector', 'Reconstruct the grid or object list, calculate data size, and justify scaling behaviour.'],
        ['Sound', 'Quantise numerical measurements, encode and decode them, then calculate raw data size.'],
        ['Compression', 'Decode every run or reference and compare the complete stated storage costs.'],
      ]),
      p('In the independent tasks below, first name the width, representation and any storage assumptions. A familiar bit pattern can have different meanings; a repeated source can still grow after encoding. Check your intermediate steps before opening the answers.', 'Use a consistent checking method'),
    ],
    materials: [visualTable('Three questions for every representation', ['Question', 'Check'], [['What is stored?', 'Bits, codes, pixels, samples or objects'], ['How is meaning recovered?', 'Mapping, order, width and decoding rules'], ['Does it meet the requirement?', 'Exact value, range, quality and total size']])],
    checkpoint: { prompt: 'Can the presence of repeated data alone prove that a compressed file is smaller?', answer: 'No. Count fields, references, dictionaries and headers may cost more than the repetition saves.' },
  };
  return { ...lesson, units: lesson.units.map(u => u === first ? unit : u), practice: [...lesson.practice, ...reviewTasks] };
}

export function authorSection1Lesson(lesson) {
  if (lesson.section !== 1) return lesson.kind === 'review' && lesson.paper === 1 ? authorSection1Review(lesson) : lesson;
  const number = Number(lesson.originalLesson);
  let units = lesson.units.filter(u => !['S1.02-DENARY', 'S1.08-PIXEL'].includes(u.unitKey));
  if (lessonOrders[number]) units.sort((a, b) => lessonOrders[number].indexOf(a.unitKey) - lessonOrders[number].indexOf(b.unitKey));
  units = units.map(unit => {
    const authored = section1Teaching[unit.unitKey];
    if (!authored) throw new Error(`Missing detailed S1 teaching: ${unit.unitKey}`);
    const objectiveIds = authored.objectiveIds ?? unit.objectiveIds;
    const visual = authored.visual ?? section1DiagramMaterials[unit.unitKey]
      ?? unit.materials.find(m => ['reviewed-visual', 'table', 'cards'].includes(m.type));
    if (!visual) throw new Error(`Missing S1 visual: ${unit.unitKey}`);
    return {
      ...unit, heading: authored.heading ?? unit.heading, objectiveIds,
      teachingBlocks: authored.blocks, explanation: authored.essentials,
      coreBlocks: undefined, coreExplanation: undefined, useAuthoredVisual: true,
      materials: [{ ...visual, preserveText: true, objectiveIds }],
      ...(authored.checkpoint ? { checkpoint: { prompt: authored.checkpoint[0], answer: authored.checkpoint[1] } } : {}),
      extensions: authored.extensions ?? [],
      masteryCheck: undefined,
    };
  });
  return {
    ...lesson, units, subtitle: lessonRoutes[number], summaryMode: 'authored',
    summary: units.map(u => [u.heading, u.explanation.join(' ')]),
  };
}
