const registerMap = {
  pc: {
    role: "PC / Program Counter: holds the address of the next instruction to be fetched.",
    method: "Used at the start of fetch. Its contents are copied to the MAR, then the PC is normally incremented or updated.",
    trap: "Do not say the PC holds the current instruction. That is the CIR.",
  },
  cir: {
    role: "CIR / Current Instruction Register: holds the instruction currently being decoded or executed.",
    method: "After an instruction is fetched from memory through the MDR, it is copied to the CIR for decoding by the control unit.",
    trap: "Do not use CIR for the address of the next instruction. That is the PC.",
  },
  mar: {
    role: "MAR / Memory Address Register: holds the address of the memory location being accessed.",
    method: "The address in the MAR is placed on the address bus during memory read or write operations.",
    trap: "Do not say the MAR holds the data or instruction value. That is the MDR.",
  },
  mdr: {
    role: "MDR / Memory Data Register: holds data or an instruction being transferred to or from memory.",
    method: "During fetch, the instruction read from memory is transferred into the MDR before being copied to the CIR.",
    trap: "Do not say the MDR holds the memory address. That is the MAR.",
  },
  acc: {
    role: "ACC / Accumulator: holds intermediate or final results from ALU operations.",
    method: "After an arithmetic or logical operation, the ALU result may be stored in the accumulator for further use.",
    trap: "Do not describe the ACC as storing every instruction. It is mainly associated with ALU results.",
  },
  sr: {
    role: "Status register: holds flags about the result of an operation or CPU state.",
    method: "Flags such as zero, carry, overflow or negative can be set after an ALU operation and then used by later instructions.",
    trap: "Do not say the status register stores the actual calculation result. It stores flags about the result.",
  },
};

const examples = {
  fetch: {
    title: "Example 1: fetch roles",
    problem: "A fetch trace says: PC = 300. Explain which registers are used.",
    steps: [
      "The PC holds address 300, the address of the next instruction.",
      "The address 300 is copied into the MAR because MAR holds the memory address being accessed.",
      "The instruction read from memory is placed into the MDR because MDR holds the transferred instruction/data.",
      "The instruction is copied into the CIR because CIR holds the current instruction for decoding.",
      "The PC is normally incremented or updated to point to the next instruction.",
    ],
  },
  addition: {
    title: "Example 2: ACC and flags",
    problem: "An ADD instruction produces result 0. Which registers might show this?",
    steps: [
      "The ALU performs the addition.",
      "The result may be stored in the ACC as an intermediate or final result.",
      "The zero flag in the status register may be set because the result is 0.",
      "The status register stores flags about the result, not the result value itself.",
    ],
  },
  compare: {
    title: "Example 3: compare MAR and MDR",
    problem: "Explain the difference between MAR and MDR.",
    steps: [
      "MAR holds a memory address, such as address 120.",
      "MDR holds the data or instruction transferred to or from that address.",
      "Memory address goes on the address bus; transferred data/instruction goes on the data bus.",
      "Exam sentence: MAR identifies where; MDR temporarily holds what is transferred.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Which register holds the address of the next instruction?", accepted: ["pc", "program counter"], answer: "PC / Program Counter" },
  { id: "p2", prompt: "Which register holds the current instruction?", accepted: ["cir", "current instruction register"], answer: "CIR / Current Instruction Register" },
  { id: "p3", prompt: "Which register holds the memory address being accessed?", accepted: ["mar", "memory address register"], answer: "MAR / Memory Address Register" },
  { id: "p4", prompt: "Which register holds data or an instruction transferred to/from memory?", accepted: ["mdr", "memory data register"], answer: "MDR / Memory Data Register" },
  { id: "p5", prompt: "Which register holds intermediate ALU results?", accepted: ["acc", "accumulator"], answer: "ACC / Accumulator" },
  { id: "p6", prompt: "Which register holds flags such as zero, carry or overflow?", accepted: ["status register", "sr", "flag register", "flags register"], answer: "Status register" },
  { id: "p7", prompt: "Which register is copied to the MAR at the start of fetch?", accepted: ["pc", "program counter"], answer: "PC / Program Counter" },
  { id: "p8", prompt: "Which register receives the fetched instruction before it is copied to the CIR?", accepted: ["mdr", "memory data register"], answer: "MDR / Memory Data Register" },
  { id: "p9", prompt: "Which register is normally incremented after fetching an instruction?", accepted: ["pc", "program counter"], answer: "PC / Program Counter" },
  { id: "p10", prompt: "Which register stores flags about a comparison result?", accepted: ["status register", "sr", "flag register", "flags register"], answer: "Status register" },
];

const mistakes = [
  {
    wrong: "The PC stores the current instruction while it is decoded.",
    fix: "The PC stores the address of the next instruction. The CIR stores the current instruction while it is decoded.",
  },
  {
    wrong: "The MAR stores the instruction copied from memory.",
    fix: "The MAR stores the memory address. The MDR stores the instruction or data transferred from memory.",
  },
  {
    wrong: "The accumulator stores flags such as carry and overflow.",
    fix: "The accumulator stores intermediate or final ALU results. The status register stores flags such as carry and overflow.",
  },
  {
    wrong: "The status register stores the answer to an addition.",
    fix: "The status register stores flags about the result. The actual result may be stored in the ACC or another register.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "6 marks",
    prompt: "Describe the roles of the PC, MAR and MDR during the fetch stage.",
    answer: "The PC holds the address of the next instruction to be fetched. This address is copied to the MAR, which holds the memory address being accessed. The address in the MAR is used to read from memory. The instruction returned from memory is held in the MDR because the MDR holds data or instructions being transferred to or from memory. The PC is normally incremented or updated after the fetch.",
    marking: [
      { mark: "B1", text: "PC holds address of next instruction" },
      { mark: "B1", text: "address copied from PC to MAR" },
      { mark: "B1", text: "MAR holds memory address being accessed" },
      { mark: "B1", text: "memory is read using address in MAR" },
      { mark: "B1", text: "MDR holds instruction/data transferred from memory" },
      { mark: "B1", text: "PC incremented/updated after fetch" },
    ],
    strict: [
      "Do not accept PC holds the instruction.",
      "Do not accept MAR holds the instruction value.",
      "Allow data/instruction wording for MDR because instructions are transferred as data values.",
      "FT: award each register role independently if other parts of the sequence are weak.",
    ],
  },
  {
    title: "Question 2",
    marks: "4 marks",
    prompt: "Explain the difference between the CIR and the PC.",
    answer: "The PC holds the address of the next instruction to be fetched, while the CIR holds the instruction currently being decoded or executed. The PC is used to locate the next instruction in memory, whereas the CIR is used by the control unit to interpret the current instruction.",
    marking: [
      { mark: "B1", text: "PC holds address of next instruction" },
      { mark: "B1", text: "CIR holds current instruction" },
      { mark: "B1", text: "PC used to locate/fetch next instruction" },
      { mark: "B1", text: "CIR used for decoding/executing current instruction" },
    ],
    strict: [
      "Do not award marks for simply expanding the abbreviations without roles.",
      "Do not accept PC holds the current instruction.",
      "Allow 'instruction being decoded' or 'instruction being executed' for CIR.",
      "FT: mark PC and CIR statements separately.",
    ],
  },
  {
    title: "Question 3",
    marks: "5 marks",
    prompt: "Describe the purpose of the accumulator and the status register.",
    answer: "The accumulator is a register that stores intermediate or final results from ALU operations. For example, after an addition, the result may be placed in the accumulator. The status register stores flags that describe the result or CPU state, such as zero, carry, overflow or negative flags. These flags can be used by later instructions, for example conditional branch instructions.",
    marking: [
      { mark: "B1", text: "ACC/accumulator stores intermediate or final results" },
      { mark: "B1", text: "result is from ALU/arithmetic/logical operation" },
      { mark: "B1", text: "status register stores flags" },
      { mark: "B1", text: "valid flag example such as zero, carry, overflow, negative" },
      { mark: "B1", text: "flags can affect later/conditional instructions or indicate CPU/result state" },
    ],
    strict: [
      "Do not accept status register stores the actual arithmetic result.",
      "Do not require all listed flag examples.",
      "Allow 'flag register' if role matches status register.",
      "FT: award ACC and status register marks independently.",
    ],
  },
  {
    title: "Question 4",
    marks: "6 marks",
    prompt: "A CPU executes an instruction that adds two values and produces zero. Explain the possible roles of ACC and the status register.",
    answer: "The ALU performs the addition. The accumulator may store the result of the addition as an intermediate or final value. Since the result is zero, the zero flag in the status register may be set. Other flags may also be updated depending on the operation and architecture. The status register records conditions about the result, which can be used by later instructions such as a conditional branch.",
    marking: [
      { mark: "B1", text: "ALU performs the addition" },
      { mark: "B1", text: "ACC stores result/intermediate result" },
      { mark: "B1", text: "result is zero" },
      { mark: "B1", text: "zero flag/status flag set or updated" },
      { mark: "B1", text: "status register stores flags/conditions about result" },
      { mark: "B1", text: "flags may be used by later/conditional instructions" },
    ],
    strict: [
      "Do not award zero flag mark if candidate says ACC is the zero flag.",
      "Do not require exact binary values.",
      "Allow 'may be set' because flag behaviour depends on architecture.",
      "FT: if candidate says result stored in a general register, still award status-register marks if flags are correct.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "A candidate writes: 'MAR stores the current instruction and MDR stores the address.' Explain why this is incorrect and give the correct roles.",
    answer: "This is incorrect because MAR and MDR have been swapped. The MAR stores the memory address being accessed. This address is placed on the address bus. The MDR stores the data or instruction being transferred to or from memory. During fetch, the instruction read from memory is placed in the MDR before being copied to the CIR.",
    marking: [
      { mark: "B1", text: "identifies that MAR/MDR roles are swapped or statement is incorrect" },
      { mark: "B1", text: "MAR stores memory address being accessed" },
      { mark: "B1", text: "address in MAR placed on address bus" },
      { mark: "B1", text: "MDR stores data/instruction being transferred" },
      { mark: "B1", text: "MDR transfer is to/from memory" },
      { mark: "B1", text: "fetched instruction then copied from MDR to CIR" },
    ],
    strict: [
      "Do not accept 'MAR stores memory' without address wording.",
      "Do not accept 'MDR stores address data' if address/value distinction is unclear.",
      "Allow answers that explain only read or only write transfer if MDR role is clear.",
      "FT: award correction marks even if the candidate does not quote the original statement.",
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
    "mar-mdr": "Correct. MAR holds the memory address; MDR holds the data or instruction being transferred.",
    "mdr-mar": "Swapped. MDR is for data/instruction transfer; MAR is for memory address.",
    "pc-cir": "Swapped. PC holds the next instruction address; CIR holds the current instruction.",
    "acc-status": "Swapped. ACC holds an ALU result; the status register holds flags.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = responses[button.dataset.hook];
    });
  });
}

function setupMapper() {
  const select = document.querySelector("#registerInput");
  const result = document.querySelector("#mapResult");
  const method = document.querySelector("#mapMethod");
  const trap = document.querySelector("#mapTrap");
  function mapRegister() {
    const item = registerMap[select.value];
    result.textContent = item.role;
    method.innerHTML = `<strong>When used:</strong> ${item.method}`;
    trap.innerHTML = `<strong>Common trap:</strong> ${item.trap}`;
  }
  select.addEventListener("change", mapRegister);
  document.querySelector("#mapBtn").addEventListener("click", mapRegister);
  mapRegister();
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
  renderExample("fetch");
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
setupMapper();
setupExamples();
renderPractice();
renderMistakes();
renderExamQuestions();
