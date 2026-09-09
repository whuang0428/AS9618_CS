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
  52: [73, 74], 53: [73, 76, 77, 78], 55: [52, 77], 57: [56, 76],
  58: [73], 59: [58, 73], 60: [58], 61: [60, 73, 77],
  62: [61, 77], 63: [61, 76, 78], 64: [61, 74, 76, 77, 78],
  65: [73, 78], 70: [67, 68, 69], 80: [73, 76], 83: [77, 78, 80, 81],
  85: [50, 80, 81], 92: [76, 77, 89, 90],
};
const labs = { 61: "arrays", 62: "arrays", 64: "sorting", 65: "files", 78: "subprograms", 80: "subprograms", 83: "subprograms", 88: "testing", 90: "testing", 92: "testing" };

export function addTeachingSupport(lesson) {
  const diagnostic = diagnostics[lesson.sequenceIndex];
  return {
    ...lesson,
    ...(diagnostic ? { diagnostic: { prompt: diagnostic[0], answer: diagnostic[1] } } : {}),
    prerequisiteLessons: prerequisites[lesson.sequenceIndex] ?? [],
    practicalLab: labs[lesson.sequenceIndex] ?? null,
  };
}
