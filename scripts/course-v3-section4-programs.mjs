// Complete, original programs used as supplied material in S4 lessons.
// Addresses are denary; each instruction/data item occupies one location.
export const section4Programs = {
  workedTrace: {
    origin: 20, acc: 0, ix: 0, memory: { 90: 67 }, input: "",
    lines: ["LDM #2", "LOOP: DEC ACC", "CMP #0", "JPN LOOP", "LDD 90", "OUT", "END"],
  },
  dataPractice: {
    origin: 100, acc: 0, ix: 0, memory: { 302: 9, 310: 303, 303: 12, 320: 0 }, input: "",
    lines: ["LDR #2", "LDX 300", "MOV IX", "LDI 310", "STO 320", "LDD 320", "END"],
  },
  arithmeticPractice: {
    origin: 140, acc: 0, ix: 0, memory: { 330: 4, 331: 6 }, input: "",
    lines: ["LDM #10", "ADD B00000101", "SUB &03", "ADD 330", "SUB 331", "INC ACC", "DEC ACC", "LDR #3", "INC IX", "DEC IX", "END"],
  },
  branchPractice: {
    origin: 180, acc: 0, ix: 0, memory: { 340: 341, 341: 65 }, input: "A",
    lines: ["IN", "CMI 340", "JPN REJECT", "ADD #1", "CMP #66", "JPE SEND", "REJECT: LDM #63", "SEND: OUT", "END"],
  },
  jumpPractice: {
    origin: 220, acc: 0, ix: 0, memory: { 350: 5 }, input: "",
    lines: ["LDM #5", "CMP 350", "JPE MATCH", "LDM #0", "MATCH: INC ACC", "JMP FINISH", "DEC ACC", "FINISH: END"],
  },
  dataExam: {
    origin: 40, acc: 0, ix: 0, memory: { 502: 18, 503: 5, 510: 0 }, input: "",
    lines: ["LDM #2", "MOV IX", "LDX 500", "SUB 503", "STO 510", "END"],
  },
  loopExam: {
    origin: 60, acc: 0, ix: 0, memory: { 520: 2, 521: 90 }, input: "",
    lines: ["LDD 520", "AGAIN: DEC ACC", "CMP #0", "JPN AGAIN", "LDD 521", "OUT", "END"],
  },
  assemblerWorked: {
    origin: 0, acc: 0, ix: 0, memory: {}, input: "",
    lines: ["START: LDD FIRST", "ADD SECOND", "STO TOTAL", "END", "FIRST: 18", "SECOND: 24", "TOTAL: 0"],
  },
  assemblerPractice: {
    origin: 10, acc: 0, ix: 0, memory: {}, input: "",
    lines: ["BEGIN: LDD LEFT", "ADD RIGHT", "STO RESULT", "END", "LEFT: 7", "RIGHT: 9", "RESULT: 0"],
  },
  assemblerExam: {
    origin: 60, acc: 0, ix: 0, memory: {}, input: "",
    lines: ["ENTRY: LDD VALUE", "STO COPY", "END", "VALUE: 25", "COPY: 0"],
  },
  labelPractice: {
    origin: 20, acc: 0, ix: 0, memory: {}, input: "",
    lines: ["START: LDD FLAGS", "OR B00000010", "STO FLAGS", "END", "FLAGS: 129"],
  },
  bitExam: {
    origin: 80, acc: 0, ix: 0, memory: { 600: 214, 601: 15, 602: 0 }, input: "",
    lines: ["LDD 600", "AND 601", "OR &80", "XOR B00000010", "STO 602", "END"],
  },
  assessmentTrace: {
    origin: 30, acc: 0, ix: 0, memory: { 202: 72 }, input: "",
    lines: ["LDR #2", "LDX 200", "OUT", "END"],
  },
  mockTrace: {
    origin: 50, acc: 0, ix: 0, memory: { 300: 301, 301: 5 }, input: "",
    lines: ["LDI 300", "SUB #2", "STO 302", "END"],
  },
};

export function programListing(program) {
  return program.lines.map((line, index) => `${String(program.origin + index).padStart(3, "0")}  ${line}`).join("\n");
}

export function programQuestionData(key) {
  const program = section4Programs[key];
  const memory = Object.entries(program.memory).map(([address, value]) => `Memory[${address}]=${value}`).join(", ");
  return {
    programKey: key,
    code: programListing(program),
    codeCaption: `Initial ACC=${program.acc}, IX=${program.ix}, PC=${program.origin}; comparison result unset. ${memory ? `${memory}.` : "Data declarations are included below."} ${program.input ? `Input character: ${program.input}.` : "No input is needed."} Addresses are denary; each listed instruction or data item occupies one location.`,
  };
}
