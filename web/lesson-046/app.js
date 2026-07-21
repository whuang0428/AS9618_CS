const lineMap = {
  load: {
    result: "Mnemonic: LOAD | Operand: count",
    method: "LOAD is the operation mnemonic. count is a symbolic operand that the assembler resolves to an address or value depending on the instruction set.",
    trap: "The word LOAD is not machine code; it must be assembled into a binary opcode.",
  },
  add: {
    result: "Mnemonic: ADD | Operand: value",
    method: "ADD represents the addition operation. value tells the instruction what data/address/register to use.",
    trap: "Do not call value the opcode. ADD is the readable operation mnemonic.",
  },
  jump: {
    result: "Label: LOOP | Mnemonic: JMP | Operand: START",
    method: "LOOP names this line. JMP is the jump mnemonic. START is a label used as the jump target.",
    trap: "A label is not executed as an instruction; it is resolved to an address by the assembler.",
  },
  comment: {
    result: "Mnemonic: STORE | Operand: total | Comment: save result",
    method: "STORE represents the operation. total identifies where the value is stored. Text after the semicolon is for humans.",
    trap: "Comments are ignored by the assembler and do not become machine code.",
  },
  directive: {
    result: "Label: COUNT | Directive: DAT | Value: 5",
    method: "DAT is treated here as an assembler directive to reserve or define data, not as a CPU operation.",
    trap: "Directives guide the assembler; they are not the same as executable mnemonics.",
  },
};

const examples = {
  parse: {
    title: "Example 1: parse an assembly line",
    problem: "Parse `LOOP: ADD value ; add next item`.",
    steps: [
      "LOOP is a label that names the line or address.",
      "ADD is the mnemonic representing an addition operation.",
      "value is the operand used by the instruction.",
      "The text after the semicolon is a comment and is ignored during assembly.",
    ],
  },
  translate: {
    title: "Example 2: assembler translation",
    problem: "Explain how `ADD value` becomes executable.",
    steps: [
      "The assembler looks up the mnemonic ADD in the instruction set.",
      "It translates ADD into the corresponding binary opcode.",
      "It resolves the operand value to an address, register code or immediate value depending on the instruction format.",
      "The output is machine code that the CPU can fetch, decode and execute.",
    ],
  },
  compare: {
    title: "Example 3: compare language levels",
    problem: "Compare assembly language with machine code and high-level language.",
    steps: [
      "Machine code is binary and can be executed directly by the CPU.",
      "Assembly language uses mnemonics and maps closely to machine code, but needs an assembler.",
      "High-level language is more problem-oriented and usually needs a compiler or interpreter.",
      "Assembly is low-level and processor-specific, not portable like many high-level languages.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "What low-level language uses mnemonics?", accepted: ["assembly language", "assembly"], answer: "Assembly language" },
  { id: "p2", prompt: "What is a readable abbreviation such as ADD called?", accepted: ["mnemonic", "mnemonics"], answer: "Mnemonic" },
  { id: "p3", prompt: "What translates assembly language into machine code?", accepted: ["assembler", "an assembler"], answer: "Assembler" },
  { id: "p4", prompt: "What type of code does the assembler output?", accepted: ["machine code", "object code"], answer: "Machine code / object code" },
  { id: "p5", prompt: "In `ADD value`, what is the mnemonic?", accepted: ["add"], answer: "ADD" },
  { id: "p6", prompt: "In `ADD value`, what is the operand?", accepted: ["value"], answer: "value" },
  { id: "p7", prompt: "In `LOOP: JMP START`, what is LOOP?", accepted: ["label", "a label"], answer: "Label" },
  { id: "p8", prompt: "What character often begins a comment in the examples on this page?", accepted: [";", "semicolon"], answer: "Semicolon / ;" },
  { id: "p9", prompt: "Is assembly language directly executed as text by the CPU? Answer yes or no.", accepted: ["no"], answer: "No" },
  { id: "p10", prompt: "Is assembly language generally processor-specific? Answer yes or no.", accepted: ["yes"], answer: "Yes" },
];

const mistakes = [
  {
    wrong: "Assembly language is binary machine code.",
    fix: "Assembly language uses mnemonics and symbolic names. Machine code is binary. An assembler translates assembly into machine code.",
  },
  {
    wrong: "A compiler translates assembly language into machine code.",
    fix: "An assembler translates assembly language into machine code. A compiler usually translates high-level language.",
  },
  {
    wrong: "Comments in assembly become instructions for the CPU.",
    fix: "Comments are for human readers and are ignored by the assembler.",
  },
  {
    wrong: "A label is the same as a mnemonic.",
    fix: "A label names an address or line. A mnemonic represents an operation such as ADD or JMP.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "4 marks",
    prompt: "Define assembly language and mnemonic.",
    answer: "Assembly language is a low-level programming language that uses symbolic instructions related closely to machine-code instructions. A mnemonic is a short human-readable abbreviation, such as ADD or LOAD, used to represent an operation in assembly language.",
    marking: [
      { mark: "B1", text: "assembly language is low-level" },
      { mark: "B1", text: "assembly uses symbolic instructions/mnemonics" },
      { mark: "B1", text: "mnemonic is a short human-readable abbreviation" },
      { mark: "B1", text: "mnemonic represents an operation/instruction, e.g. ADD/LOAD" },
    ],
    strict: [
      "Do not accept assembly as a high-level language.",
      "Do not accept mnemonic as the operand/data value.",
      "Allow valid mnemonic examples such as JMP, STORE, SUB.",
      "FT: mark assembly and mnemonic definitions independently.",
    ],
  },
  {
    title: "Question 2",
    marks: "5 marks",
    prompt: "Explain the purpose of an assembler.",
    answer: "An assembler translates assembly language source code into machine code or object code. It converts mnemonics into binary opcodes, encodes operands, and resolves labels into addresses. The resulting machine code can be loaded and executed by the processor.",
    marking: [
      { mark: "B1", text: "assembler translates assembly language" },
      { mark: "B1", text: "output is machine code/object code" },
      { mark: "B1", text: "mnemonics converted into opcodes/binary instructions" },
      { mark: "B1", text: "labels/symbolic addresses resolved or operands encoded" },
      { mark: "B1", text: "output can be executed by CPU/processor" },
    ],
    strict: [
      "Do not accept compiler unless clearly described as assembler-like for assembly language.",
      "Do not accept assembler as the CPU component that executes instructions.",
      "Allow two-pass assembler explanation if accurate.",
      "FT: award translation output mark even if label resolution is omitted.",
    ],
  },
  {
    title: "Question 3",
    marks: "5 marks",
    prompt: "For the line `LOOP: ADD value ; add next item`, identify the label, mnemonic, operand and comment.",
    answer: "LOOP is the label. ADD is the mnemonic. value is the operand. The comment is 'add next item', which is for the programmer and is ignored by the assembler.",
    marking: [
      { mark: "B1", text: "LOOP identified as label" },
      { mark: "B1", text: "ADD identified as mnemonic" },
      { mark: "B1", text: "value identified as operand" },
      { mark: "B1", text: "add next item identified as comment" },
      { mark: "B1", text: "comment ignored by assembler / for human reader" },
    ],
    strict: [
      "Do not require the colon as part of the label name.",
      "Do not award mnemonic mark if candidate says value is the operation.",
      "Allow comment including the semicolon.",
      "FT: mark each line part independently.",
    ],
  },
  {
    title: "Question 4",
    marks: "6 marks",
    prompt: "Compare assembly language with machine code.",
    answer: "Machine code is binary instructions that the CPU can execute directly. Assembly language uses mnemonics such as ADD or LOAD, labels and symbolic operands, making it easier for humans to read than raw binary. Assembly language is still low-level and processor-specific. It must be translated by an assembler into machine code before direct execution.",
    marking: [
      { mark: "B1", text: "machine code is binary instructions" },
      { mark: "B1", text: "machine code executed directly by CPU" },
      { mark: "B1", text: "assembly uses mnemonics/symbolic instructions" },
      { mark: "B1", text: "assembly is more human-readable than machine code" },
      { mark: "B1", text: "assembly is low-level/processor-specific or close to machine code" },
      { mark: "B1", text: "assembly must be translated by assembler" },
    ],
    strict: [
      "Do not accept assembly as directly executed by CPU as text.",
      "Do not accept machine code as mnemonics.",
      "Allow labels/operands as symbolic features of assembly.",
      "FT: award paired comparison marks where roles are clear.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "A student writes: 'Assembly language is portable high-level code that is interpreted by the CPU.' Explain why this is incorrect.",
    answer: "Assembly language is low-level, not high-level. It is usually processor-specific because its mnemonics map closely to a processor's instruction set. The CPU does not interpret assembly source text directly. Assembly language must be translated by an assembler into machine code. Machine code is the binary form that the CPU executes.",
    marking: [
      { mark: "B1", text: "assembly is low-level, not high-level" },
      { mark: "B1", text: "assembly is processor-specific/not generally portable" },
      { mark: "B1", text: "mnemonics map to instruction set/machine instructions" },
      { mark: "B1", text: "CPU does not execute assembly text directly" },
      { mark: "B1", text: "assembler translates assembly into machine code" },
      { mark: "B1", text: "machine code/binary is executed by CPU" },
    ],
    strict: [
      "Do not require discussion of every architecture.",
      "Do not accept interpreted by CPU as correct wording.",
      "Allow 'not portable' if linked to instruction set/processor.",
      "FT: award correction marks even if candidate does not quote the original statement.",
    ],
  },
];

function normalise(value) {
  return value.trim().toLowerCase().replace(/[-_\s]+/g, " ");
}

function setupPrint() {
  document.querySelector("#printBtn").addEventListener("click", () => window.print());
}

function setupHook() {
  const feedback = document.querySelector("#hookFeedback");
  const responses = {
    add: "Correct. ADD is the mnemonic because it represents the operation.",
    ninety: "90 is the operand in this example, not the mnemonic.",
    both: "The whole line is an assembly instruction, but only ADD is the mnemonic.",
    cpu: "The CPU executes machine code. CPU is not a part of the assembly line.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = responses[button.dataset.hook];
    });
  });
}

function setupParser() {
  const select = document.querySelector("#lineInput");
  const result = document.querySelector("#parseResult");
  const method = document.querySelector("#parseMethod");
  const trap = document.querySelector("#parseTrap");
  function parseLine() {
    const item = lineMap[select.value];
    result.textContent = item.result;
    method.innerHTML = `<strong>Explanation:</strong> ${item.method}`;
    trap.innerHTML = `<strong>Common trap:</strong> ${item.trap}`;
  }
  select.addEventListener("change", parseLine);
  document.querySelector("#parseBtn").addEventListener("click", parseLine);
  parseLine();
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
  renderExample("parse");
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
setupParser();
setupExamples();
renderPractice();
renderMistakes();
renderExamQuestions();
