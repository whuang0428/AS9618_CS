// Prerequisites refer to the current numbered course, after V3 sequencing.
const diagnostics = {
  1: ["Each of three independent switches can be on or off. How many different combinations are possible?", "2 × 2 × 2 = 8 combinations. Each switch adds an independent choice between two states."],
  2: ["How many different values can four bits represent? What is the largest unsigned value?", "There are 2^4 = 16 patterns, representing unsigned values 0 to 15."],
  3: ["Interpret 11111111 as an unsigned byte and as an 8-bit two's-complement integer.", "Unsigned: 255. Two's complement: -1. The representation determines how the same bits are interpreted."],
  4: ["A display shows 01000001. Can you identify a character without knowing the encoding?", "No. A character encoding is needed to map the stored code to a character; ASCII maps this code to A."],
  5: ["A grid has 20 columns and 10 rows. If each cell needs 4 bits, how many bytes are needed?", "20 × 10 × 4 = 800 bits; 800 / 8 = 100 bytes, excluding any extra information."],
  6: ["A recorder stores 8000 samples, each using 8 bits. How many bytes is that, and what changes if each sample uses 16 bits?", "8000 bytes at 8 bits per sample; 16000 bytes at 16 bits. Doubling bits per sample doubles data size for the same sample count."],
  15: ["A laptop records a voice note, plays it and saves it for tomorrow. Identify an input device, an output device and the storage that retains the saved recording after shutdown.", "A microphone supplies input, speakers provide output, and secondary storage such as an SSD retains the saved file. Working data in RAM is not retained after power is removed."],
  16: ["What is the difference between a microphone's input and a speaker's output? Which conversion is needed to store the microphone's analogue signal as binary samples?", "A microphone receives sound and produces an analogue electrical signal. A speaker produces sound from an electrical signal. An ADC samples, quantises and encodes the microphone signal for digital storage."],
  17: ["A camera loses its unsaved edits when power is removed but retains saved photographs. Explain the different storage needs.", "Unsaved working data uses volatile RAM. Saved photographs need non-volatile secondary storage. The camera also needs persistent start-up instructions; persistent instructions and saved user files have different roles."],
  18: ["A temperature logger displays 25 °C. Has it necessarily controlled the room temperature? Explain.", "No. Measuring and displaying the temperature is monitoring. Control also requires an output action, such as operating a heater, that changes the condition."],
  48: ["An 8-bit unsigned calculation gives 1 00000000. A student stores 00000000 and says that a matching checksum proves the result correct. Identify both mistakes.", "The true result 256 exceeds the unsigned byte range, so the stored byte has overflowed. A matching checksum means no error was detected by that check; it cannot prove the calculation or source data correct."],
  93: ["A program calculates the mean of accepted readings. What must be initialised, and what must happen if no reading is accepted?", "Initialise Total and AcceptedCount to zero. Divide only when AcceptedCount is positive; otherwise report that no readings were accepted. Test that path as well as normal and boundary inputs."],
};

const prerequisites = {
  2: [1], 3: [2], 4: [1, 2], 5: [1, 2], 6: [1, 2, 4, 5],
  8: [7], 9: [7], 10: [7], 11: [8, 10], 12: [1, 6, 10], 13: [7, 10, 11], 14: [2, 11, 13],
  15: [1], 16: [6, 15], 17: [15, 16], 18: [15, 16, 17], 19: [1], 20: [19],
  21: [2,17], 22: [21,17], 23: [21,22], 24: [23], 25: [2,23], 26: [4,23,25], 27: [2,3,19,25,26],
  33: [28,29], 34: [11,14,28,29,33], 35: [14,34], 36: [29,33,34], 37: [1,2,33],
  38: [33], 39: [33,36,38], 40: [30], 41: [4,5,6,33,39],
  42: [28,37], 43: [42], 44: [33,36,42,43], 45: [42,44], 46: [42,43,45], 47: [42,43,45,46],
  52: [73, 74], 53: [73, 76, 77, 78], 55: [52, 77], 57: [56, 76],
  58: [51, 52], 59: [58], 60: [58], 61: [60, 53],
  62: [61], 63: [61, 53], 64: [61, 53],
  65: [58, 53], 66: [49, 60], 67: [66, 60], 68: [66, 60],
  69: [66, 60], 70: [67, 68, 69], 71: [59, 62, 65, 70],
  72: [53, 54], 74: [73], 75: [73, 74], 76: [74],
  77: [73, 74], 78: [73, 74, 76], 79: [77, 78], 80: [73, 76],
  81: [75, 76, 78, 80], 82: [61, 76, 77, 80, 81], 83: [77, 78, 80, 81],
  84: [50, 55], 85: [50, 55, 80, 81], 86: [54, 76],
  87: [73, 76, 78], 88: [80, 81, 87], 89: [88], 90: [56, 58, 89],
  91: [84, 87, 89, 90], 92: [76, 77, 80, 81, 87, 89, 90, 91],
};
const relatedReview = {42:[43,44,46,47,48],43:[44,46,47,48],44:[46,47,48],45:[46,47,48],46:[47,48],47:[48],38:[39,41,48],39:[41,44,48],40:[41,48],41:[44,48],33:[34,35,36,37,38,48],34:[35,36,48],35:[48],36:[44,48],37:[42,44,83,90,48],21:[23,24,48],22:[48],23:[25,26,48],24:[28,48],25:[26,27,30,48],26:[27,48],27:[18,48],15:[17,18,48],16:[17,18,48],17:[21,22,48],18:[20,48],19:[20],20:[48],9:[29,34,36],11:[14],12:[17],14:[19,34,36],72:[73,76,77,78],73:[58],74:[56],77:[62],78:[65],81:[85],82:[63,64],83:[93],84:[91,93],85:[88,93],86:[93],87:[88,92],88:[89,93],89:[90,92],90:[92,93],91:[92,93],92:[93]};
const labs = { 61: "arrays", 62: "arrays", 64: "sorting", 65: "files", 78: "subprograms", 80: "subprograms", 81: "subprograms", 83: "subprograms", 88: "testing", 90: "testing", 92: "testing" };

export function addTeachingSupport(lesson) {
  const diagnostic = diagnostics[lesson.sequenceIndex];
  return {
    ...lesson,
    ...(diagnostic ? { diagnostic: { prompt: diagnostic[0], answer: diagnostic[1] } } : {}),
    prerequisiteLessons: prerequisites[lesson.sequenceIndex] ?? [],
    ...(relatedReview[lesson.sequenceIndex] ? {relatedLessons:relatedReview[lesson.sequenceIndex]} : {}),
    practicalLab: labs[lesson.sequenceIndex] ?? null,
  };
}
