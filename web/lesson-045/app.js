const instructionSet = {
  "0001": { mnemonic: "LOAD", meaning: "load the value from the operand address into ACC" },
  "0010": { mnemonic: "STORE", meaning: "store the ACC value into the operand address" },
  "0011": { mnemonic: "ADD", meaning: "add the value at the operand address to ACC" },
  "0100": { mnemonic: "JMP", meaning: "jump to the operand address" },
};

const decodeData = {
  "000101011010": {
    result: "LOAD address 90",
    method: "Opcode 0001 means LOAD. Operand 01011010 is denary 90, so the instruction loads from address 90.",
    trap: "The operand is interpreted as an address in this simplified format, not as the operation.",
  },
  "001001011010": {
    result: "STORE address 90",
    method: "Opcode 0010 means STORE. Operand 01011010 is denary 90, so the ACC value is stored at address 90.",
    trap: "STORE writes a value to memory; it is not the same as LOAD.",
  },
  "001101011010": {
    result: "ADD value at address 90",
    method: "Opcode 0011 means ADD. Operand 01011010 gives the address of the value used by the addition.",
    trap: "The opcode says ADD; the operand identifies what is added.",
  },
  "010000001100": {
    result: "JMP address 12",
    method: "Opcode 0100 means jump. Operand 00001100 is denary 12, so the PC would be changed to address 12.",
    trap: "A jump affects program flow by changing the next instruction address.",
  },
  "111101011010": {
    result: "Unknown opcode in this instruction set",
    method: "Opcode 1111 is not defined in the example instruction set, so this CPU cannot decode it using this table.",
    trap: "A bit pattern only has meaning if the processor's instruction set defines that opcode.",
  },
};

const examples = {
  decode: {
    title: "Example 1: decode a 12-bit instruction",
    problem: "Decode 0011 01011010 using the lesson instruction set.",
    steps: [
      "Split the instruction into opcode and operand: 0011 | 01011010.",
      "Look up opcode 0011: it means ADD.",
      "Convert operand 01011010 to denary: 64 + 16 + 8 + 2 = 90.",
      "Interpretation: ADD the value at address 90 to the accumulator.",
    ],
  },
  compatibility: {
    title: "Example 2: processor compatibility",
    problem: "Why might machine code for Processor A not run on Processor B?",
    steps: [
      "Machine code uses binary opcodes defined by an instruction set.",
      "Processor B may use a different instruction set.",
      "The same opcode may be undefined or may mean a different operation.",
      "Therefore Processor B may not recognise or correctly execute the machine-code instructions.",
    ],
  },
  assembly: {
    title: "Example 3: machine code vs assembly language",
    problem: "Explain why ADD 90 is not machine code.",
    steps: [
      "ADD is a mnemonic, a human-readable abbreviation used in assembly language.",
      "Machine code uses binary instructions such as 0011 01011010.",
      "Assembly language must be translated by an assembler into machine code before direct execution.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "What is the set of instructions a processor can recognise and execute called?", accepted: ["instruction set"], answer: "Instruction set" },
  { id: "p2", prompt: "What type of code consists of binary instructions executed directly by the CPU?", accepted: ["machine code"], answer: "Machine code" },
  { id: "p3", prompt: "Which part of an instruction specifies the operation?", accepted: ["opcode", "operation code"], answer: "Opcode / operation code" },
  { id: "p4", prompt: "Which part of an instruction gives the data/address/register used by the operation?", accepted: ["operand"], answer: "Operand" },
  { id: "p5", prompt: "In 0011 01011010, using this lesson format, what is the opcode?", accepted: ["0011"], answer: "0011" },
  { id: "p6", prompt: "In 0011 01011010, using this lesson format, what is the operand?", accepted: ["01011010"], answer: "01011010" },
  { id: "p7", prompt: "Using the lesson table, opcode 0001 means which mnemonic?", accepted: ["load"], answer: "LOAD" },
  { id: "p8", prompt: "Using the lesson table, opcode 0100 means which mnemonic?", accepted: ["jmp", "jump"], answer: "JMP / jump" },
  { id: "p9", prompt: "Assembly language uses human-readable words such as ADD. What are these called?", accepted: ["mnemonics", "mnemonic"], answer: "Mnemonics" },
  { id: "p10", prompt: "Can machine code for one instruction set always run on a different instruction set? Answer yes or no.", accepted: ["no"], answer: "No" },
];

const mistakes = [
  {
    wrong: "Machine code is assembly language written with mnemonics.",
    fix: "Machine code is binary instructions. Assembly language uses mnemonics and must be assembled into machine code.",
  },
  {
    wrong: "The operand tells the CPU which operation to perform.",
    fix: "The opcode specifies the operation. The operand supplies the data, address, register or value used by that operation.",
  },
  {
    wrong: "Any CPU can execute any machine-code program because all machine code is binary.",
    fix: "Machine code is binary, but opcode meanings depend on the processor's instruction set. A different CPU may not recognise the instructions.",
  },
  {
    wrong: "An instruction set is the list of high-level programming languages installed on a computer.",
    fix: "An instruction set is the collection of low-level instructions that a processor can recognise and execute.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "4 marks",
    prompt: "Define instruction set and machine code.",
    answer: "An instruction set is the set of instructions that a particular processor can recognise and execute. Machine code consists of binary instructions that can be executed directly by the processor.",
    marking: [
      { mark: "B1", text: "instruction set is a set/collection of instructions" },
      { mark: "B1", text: "processor can recognise/execute those instructions" },
      { mark: "B1", text: "machine code consists of binary instructions" },
      { mark: "B1", text: "machine code can be executed directly by the CPU/processor" },
    ],
    strict: [
      "Do not accept instruction set as high-level program library.",
      "Do not accept machine code as assembly mnemonics.",
      "Allow 'CPU' for processor.",
    ],
  },
  {
    title: "Question 2",
    marks: "5 marks",
    prompt: "Explain the difference between opcode and operand.",
    answer: "The opcode is the part of a machine-code instruction that specifies the operation to be performed, such as ADD or LOAD. The operand is the part of the instruction that supplies the data, address, register or value used by the operation. The meaning of both is defined by the processor's instruction set.",
    marking: [
      { mark: "B1", text: "opcode is part of an instruction" },
      { mark: "B1", text: "opcode specifies operation to perform" },
      { mark: "B1", text: "operand is part of an instruction" },
      { mark: "B1", text: "operand supplies data/address/register/value used by operation" },
      { mark: "B1", text: "meaning is defined by instruction set or valid example of opcode/operand" },
    ],
    strict: [
      "Do not accept operand as the operation.",
      "Do not require all operand forms; one valid form such as address can earn the mark.",
      "Allow operation examples such as ADD, LOAD, STORE, JMP.",
    ],
  },
  {
    title: "Question 3",
    marks: "5 marks",
    prompt: "A simplified CPU uses 4 opcode bits followed by 8 operand bits. Opcode 0011 means ADD. Decode 0011 01011010.",
    answer: "The opcode is the first 4 bits, 0011, which means ADD. The operand is the last 8 bits, 01011010. Converting the operand gives 64 + 16 + 8 + 2 = 90. Therefore the instruction means ADD using the value/address represented by 90, depending on the instruction format.",
    marking: [
      { mark: "M1", text: "splits instruction into 0011 and 01011010" },
      { mark: "B1", text: "identifies opcode 0011 as ADD" },
      { mark: "M1", text: "converts operand using relevant binary place values" },
      { mark: "A1", text: "converts 01011010 to 90" },
      { mark: "B1", text: "interprets instruction as ADD using operand 90" },
    ],
    strict: [
      "Do not award final interpretation if candidate treats operand as opcode.",
      "Allow operand to be described as address 90 if consistent with the simplified format.",
      "Do not require leading subscript notation.",
    ],
  },
  {
    title: "Question 4",
    marks: "5 marks",
    prompt: "Explain why machine code written for one processor may not run on a different processor.",
    answer: "Machine code uses binary opcodes defined by a processor's instruction set. A different processor may use a different instruction set. The same bit pattern may be undefined or may represent a different operation. Therefore the second processor may not recognise, decode or execute the instructions correctly. The program may need to be recompiled, translated or emulated.",
    marking: [
      { mark: "B1", text: "machine code uses binary opcodes/instructions" },
      { mark: "B1", text: "opcodes are defined by an instruction set" },
      { mark: "B1", text: "different processor may have different instruction set" },
      { mark: "B1", text: "same bit pattern may be unrecognised or have different meaning" },
      { mark: "B1", text: "needs recompilation/translation/emulation or cannot execute correctly" },
    ],
    strict: [
      "Do not accept only 'the processor is different' without instruction set explanation.",
      "Do not require named architectures.",
      "Allow 'CPU cannot decode the opcode' for recognition/execution mark.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "Compare machine code and assembly language.",
    answer: "Machine code is made of binary instructions that the processor can execute directly. Assembly language uses mnemonics such as ADD or LOAD to represent machine-code operations in a more human-readable form. Assembly language is still low-level and processor-specific, but it must be translated by an assembler into machine code before direct execution. Machine code is harder for humans to read, while assembly is easier to write and understand than raw binary.",
    marking: [
      { mark: "B1", text: "machine code is binary instructions" },
      { mark: "B1", text: "machine code executed directly by processor" },
      { mark: "B1", text: "assembly uses mnemonics/symbolic instructions" },
      { mark: "B1", text: "assembly is more human-readable than machine code" },
      { mark: "B1", text: "assembly must be translated by assembler" },
      { mark: "B1", text: "both are low-level/processor-specific or assembly maps closely to machine code" },
    ],
    strict: [
      "Do not accept assembly as high-level language.",
      "Do not accept machine code as needing an assembler before execution.",
      "Allow examples of mnemonics such as ADD, LOAD, JMP.",
    ],
  },
];

function normalise(value) {
  return value.trim().toLowerCase().replace(/[-_\s]+/g, " ");
}

function toDenary(binary) {
  return parseInt(binary, 2);
}

function setupPrint() {
  document.querySelector("#printBtn").addEventListener("click", () => window.print());
}

function setupHook() {
  const feedback = document.querySelector("#hookFeedback");
  const responses = {
    isa: "Correct. The instruction set defines what each opcode means.",
    ram: "No. RAM capacity or appearance does not define opcode meaning.",
    font: "Tempting, but the CPU does not care about your font choices.",
    bus: "No. Buses transfer signals; the instruction set defines instruction meaning.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = responses[button.dataset.hook];
    });
  });
}

function setupDecoder() {
  const select = document.querySelector("#instructionInput");
  const result = document.querySelector("#decodeResult");
  const method = document.querySelector("#decodeMethod");
  const trap = document.querySelector("#decodeTrap");
  function decode() {
    const raw = select.value;
    const opcode = raw.slice(0, 4);
    const operand = raw.slice(4);
    const item = decodeData[raw];
    const lookup = instructionSet[opcode];
    result.textContent = item.result;
    method.innerHTML = `<strong>Split:</strong> opcode ${opcode}, operand ${operand} (${toDenary(operand)} denary). <strong>Reason:</strong> ${item.method}`;
    trap.innerHTML = `<strong>Common trap:</strong> ${lookup ? item.trap : `${item.trap} Opcode ${opcode} is not in the table.`}`;
  }
  select.addEventListener("change", decode);
  document.querySelector("#decodeBtn").addEventListener("click", decode);
  decode();
}

function renderExample(key) {
  const example = examples[key];
  document.querySelector("#exampleBox").innerHTML = `
    <h3>${example.title}</h3>
    <p><strong>Problem:</strong> ${example.problem}</p>
    <ol>${example.steps.map((step) => `<li>${step}</li>`).join("")}</ol>
  `;
}

function setupExamples() {
  document.querySelectorAll(".tab").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderExample(button.dataset.example);
    });
  });
  renderExample("decode");
}

function setupAnswerToggles(scope = document) {
  scope.querySelectorAll(".answer-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(`#${button.dataset.answer}`);
      target.classList.toggle("visible");
      button.textContent = target.classList.contains("visible")
        ? button.textContent.replace("Show", "Hide")
        : button.textContent.replace("Hide", "Show");
    });
  });
}

function renderPractice() {
  const list = document.querySelector("#practiceList");
  list.innerHTML = practice.map((item, index) => `
    <div class="practice-item" id="${item.id}">
      <label>${index + 1}. ${item.prompt}</label>
      <div class="practice-row">
        <input type="text" aria-label="${item.prompt}" />
        <span class="mark" aria-live="polite"></span>
      </div>
      <button type="button" class="answer-toggle" data-answer="answer-${item.id}">Show answer</button>
      <div class="answer-panel" id="answer-${item.id}">${item.answer}</div>
    </div>
  `).join("");

  list.querySelectorAll(".practice-item").forEach((item) => {
    const data = practice.find((entry) => entry.id === item.id);
    const input = item.querySelector("input");
    const mark = item.querySelector(".mark");
    input.addEventListener("input", () => {
      const value = normalise(input.value);
      if (!value) {
        mark.textContent = "";
        mark.className = "mark";
        return;
      }
      const correct = data.accepted.some((answer) => value === normalise(answer));
      mark.textContent = correct ? "Correct" : "Try again";
      mark.className = correct ? "mark correct" : "mark incorrect";
    });
  });
  setupAnswerToggles(list);
}

function renderMistakes() {
  const list = document.querySelector("#mistakeList");
  list.innerHTML = mistakes.map((item, index) => `
    <article>
      <p><strong class="wrong">Wrong:</strong> ${item.wrong}</p>
      <button type="button" class="answer-toggle" data-answer="mistake-${index}">Show correction</button>
      <div class="answer-panel" id="mistake-${index}">${item.fix}</div>
    </article>
  `).join("");
  setupAnswerToggles(list);
}

function renderExamQuestions() {
  const list = document.querySelector("#examList");
  list.innerHTML = examQuestions.map((question, index) => `
    <article class="exam-card">
      <div class="exam-head">
        <h3>${question.title}</h3>
        <span>${question.marks}</span>
      </div>
      <p>${question.prompt}</p>
      <button type="button" class="ms-toggle" data-answer="ms-${index}">Show MS</button>
      <div class="ms-panel" id="ms-${index}">
        <p><strong>Indicative answer:</strong> ${question.answer}</p>
        <h4>CIE-style mark scheme</h4>
        <ul>${question.marking.map((item) => `<li><strong>${item.mark}</strong> ${item.text}</li>`).join("")}</ul>
        <h4>Strict notes</h4>
        <ul>${question.strict.map((note) => `<li>${note}</li>`).join("")}</ul>
      </div>
    </article>
  `).join("");
  setupAnswerToggles(list);
}

setupPrint();
setupHook();
setupDecoder();
setupExamples();
renderPractice();
renderMistakes();
renderExamQuestions();
