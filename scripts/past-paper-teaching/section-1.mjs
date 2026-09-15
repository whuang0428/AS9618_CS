// Teacher-authored explanations. Official content is supplied separately by source extracts.
export default {
  E001: {
    title: 'Compare file sizes in different units', commandWord: 'Tick',
    reading: ['Select the largest file size, not the largest written number. The instruction permits one tick only. Convert all four quantities to bytes.'],
    solution: [{type:'table', headers:['Option','Bytes'], rows:[['3300 kibibytes','3300 × 1024 = 3,379,200'],['0.3 megabytes','0.3 × 1,000,000 = 300,000'],['3 mebibytes','3 × 1,048,576 = 3,145,728'],['3300 kilobytes','3300 × 1000 = 3,300,000']]}, 'Tick 3300 kibibytes only.'],
    marking: ['The correct selection earns the single mark. The conversion table explains how to choose; this question does not award a separate working mark.'],
    mistakes: ['Comparing just 3300, 0.3 and 3 ignores their units. Ticking both 3300 options also ignores the one-box instruction.']
  },
  E002: {
    title: 'Distinguish capacity, signed representation and base conversion', commandWord:'State / Give / Convert',
    reading: ['Treat the three subparts separately: (a) counts distinct patterns; (b) specifies eight-bit one’s complement; (c) uses hexadecimal place values. Both (b) and (c) require working.'],
    solution: ['4(a): Each bit has two possibilities, so 16 bits give 2¹⁶ = 65,536 distinct patterns. The largest unsigned value is a different quantity: 65,535.', '4(b): 120 = 64 + 32 + 16 + 8, so +120 is 01111000. Invert all eight bits to represent −120 in one’s complement: 10000111. Do not add one.', '4(c): A04₁₆ = 10 × 16² + 0 × 16 + 4 = 2560 + 4 = 2564. The middle zero preserves the position of A.'],
    marking: ['4(a) awards one mark for 2¹⁶ or 65,536. In 4(b), showing +120 in binary earns the working mark and the inverted pattern earns the answer mark. In 4(c), a valid place-value or binary method earns one mark and 2564 earns the other.'],
    mistakes: ['65,535 is the upper endpoint, not the number of patterns. Adding one after inversion changes the requested representation to two’s complement. Reading A04 as A4 loses a place value.']
  },
  E003: {
    title:'Explain a negative two’s-complement conversion', commandWord:'Explain',
    reading:['The representation is supplied. Explain a method as well as giving the denary value; a bare negative answer does not demonstrate the method.'],
    solution:['In eight-bit two’s complement the leftmost bit has weight −128. The other set bits in 10011111 have weights 16, 8, 4, 2 and 1. Therefore the value is −128 + 16 + 8 + 4 + 2 + 1 = −97.', 'Alternative: invert 10011111 to obtain 01100000, then add one to obtain 01100001. Its magnitude is 64 + 32 + 1 = 97; the original value is negative, so the answer is −97.'],
    marking:['The mark scheme permits either method. Up to two marks are for the method and one is for −97. Writing both complete methods does not raise the three-mark maximum.'],
    mistakes:['Applying ordinary unsigned weights gives 159. Flipping only the first bit is neither of the accepted conversion methods.']
  },
  E004: {
    title:'Show a binary subtraction method', commandWord:'Subtract',
    reading:['Translate both denary operands into binary and show the subtraction. The mark scheme accepts direct borrowing or adding the two’s-complement negative.'],
    solution:[{type:'code',text:'100 = 01100100\n 10 = 00001010\n−10 = 11110110  (invert 00001010, then add 1)\n\n  01100100\n+ 11110110\n-----------\n1 01011010\n\nRetained eight-bit result: 01011010 = 64 + 16 + 8 + 2 = 90.'},'For direct subtraction, borrow from the 4s column to the 2s column, then from the 32s column through the 16s column to the 8s column. Both methods give 01011010.'],
    marking:['The three marks cover correct operand conversion, a valid subtraction method, and the correct result. The leading carry in the addition method is outside the retained byte; it is not evidence that the result 90 is out of range.'],
    mistakes:['Giving only denary 90 misses the required binary method. If using a negative operand, keep all eight bits during inversion and addition.']
  },
  E005: {
    title:'Add three binary operands and identify overflow', commandWord:'Complete',
    reading:['There are three addends. Include the incoming carry in each column, and explicitly identify any carry beyond the eight-bit result.'],
    solution:[{type:'code',text:'  10011110\n  01100001\n+ 00011001\n-----------\n1 00011000'}, {type:'table',headers:['Column, right to left','Three bits + carry in','Write','Carry out'],rows:[['2⁰','0 + 1 + 1 + 0 = 2','0','1'],['2¹','1 + 0 + 0 + 1 = 2','0','1'],['2²','1 + 0 + 0 + 1 = 2','0','1'],['2³','1 + 0 + 1 + 1 = 3','1','1'],['2⁴','1 + 0 + 1 + 1 = 3','1','1'],['2⁵','0 + 1 + 0 + 1 = 2','0','1'],['2⁶','0 + 1 + 0 + 1 = 2','0','1'],['2⁷','1 + 0 + 0 + 1 = 2','0','1']]},'The full unsigned sum is 158 + 97 + 25 = 280. The stored eight bits are 00011000, or 24. The extra leftmost 1 is overflow beyond the eight-bit result.'],
    marking:['One mark is for clearly shown carries, one for 00011000, and one for explicitly identifying the overflow. Labelling the extra bit matters; do not stop at an unexplained ninth bit.'],
    mistakes:['Adding only two rows misses an operand. The retained byte and the mathematical total are different because 280 exceeds 255.']
  },
  E006: {
    title:'Explain the character-to-code mapping', commandWord:'Explain / Give',
    reading:['Part (b) asks how a whole file name becomes codes in sequence. Part (c) asks for two differences between character sets, not two examples of characters.'],
    solution:['1(b): Each character has a unique ASCII code. Replace each character of the file name, in its original order, with its code to represent the text.', '1(c): Standard ASCII uses seven bits per character, whereas Unicode can use more bits. Unicode includes a much wider range of characters and writing systems than ASCII.'],
    marking:['Part (b) has one point for the unique code and one for replacing characters in sequence. Part (c) accepts the storage-width difference and the wider character repertoire, for two marks in total. The official allowance for “7 / 8 bits” includes extended ASCII; it does not redefine standard ASCII as eight-bit.'],
    mistakes:['“Stored in binary” does not explain the character mapping or the order. Do not claim that every Unicode encoding always uses exactly 32 bits.']
  },
  E007: {
    title:'Calculate the bitmap size in mebibytes', commandWord:'Estimate',
    reading:['Width × height gives pixels; bit depth gives bits per pixel. The requested unit is mebibytes, and working is required. No header size is supplied.'],
    solution:['Pixels = 2048 × 1024 = 2,097,152.', 'Pixel data = 2,097,152 × 10 = 20,971,520 bits.', 'Bytes = 20,971,520 ÷ 8 = 2,621,440.', 'Mebibytes = 2,621,440 ÷ (1024 × 1024) = 2.5 MiB.'],
    marking:['One mark is for correct working and one for 2.5 mebibytes. The complete expression (2048 × 1024 × 10) ÷ (8 × 1024 × 1024) also shows the method.'],
    mistakes:['Omitting division by eight confuses bits and bytes. Dividing by 1,000,000 gives megabytes instead of mebibytes. Do not invent header overhead.']
  },
  E008: {
    title:'Describe bitmap encoding and a vector drawing list', commandWord:'Describe',
    reading:['Use the same VR-video context for both answers, but distinguish the stored representation. Part (i) needs a sequence of pixel codes; part (ii) needs the contents of a drawing list.'],
    solution:['2(d)(i): A bitmap consists of pixels, each with one colour. Each colour has a unique binary code, and the codes for the pixels are stored in sequence.', '2(d)(ii): A vector drawing list contains objects to draw, with commands or descriptions for constructing them. Each object has properties such as coordinates, fill colour and line weight.'],
    marking:['Part (i) has three specific encoding points. Part (ii) allows at most two marks from the listed drawing-list features; the model answer supplies several linked details, not additional marks.'],
    mistakes:['Describing enlargement or comparing file sizes does not answer what is encoded. Saying “vectors store pixels too” removes the essential distinction.']
  },
  E009: {
    title:'Connect sampling resolution to accuracy', commandWord:'Explain',
    reading:['Sampling resolution is the number of bits per sample. Explain its effect on representable amplitudes and quantisation; sampling rate is a different variable.'],
    solution:['Increasing sampling resolution gives each sample more bits. More amplitude levels can therefore be represented, so rounding a measured amplitude to a stored level usually introduces a smaller quantisation error. The digital recording can follow the original amplitude more closely.', 'Decreasing resolution has the reverse effect: fewer levels, coarser quantisation and potentially greater error.'],
    marking:['The mark scheme allows points along either causal chain, with a maximum of three marks overall. “More accurate” needs the intermediate mechanism; writing both directions does not double the available marks.'],
    mistakes:['More samples per second describes sampling rate. More amplitude levels describes the resolution asked about here.']
  },
  E010: {
    title:'Apply run-length encoding to a photograph', commandWord:'Explain',
    reading:['Explain RLE in terms of this bitmap’s pixels. The question asks how it works, not whether every photograph is guaranteed to become smaller.'],
    solution:['Identify consecutive pixels with the same colour. Store that colour, or its code, together with the number of consecutive repetitions instead of storing the colour separately for every pixel in the run.'],
    marking:['The two marks distinguish identifying consecutive repetitions and storing the value with its repetition count. Both parts of the representation are needed.'],
    mistakes:['Counting all pixels of one colour across the whole photograph loses their positions. Runs must be consecutive in the stored sequence.']
  }
};
