const fetchSteps = {
  s1: {
    result: "Step 1: PC -> MAR",
    method: "The Program Counter holds the address of the next instruction. This address is copied into the Memory Address Register.",
    trap: "Do not say the PC contains the instruction itself. It contains an address.",
  },
  s2: {
    result: "Step 2: MAR address -> address bus",
    method: "The address in the MAR is placed on the address bus so the required memory location can be selected.",
    trap: "Do not say the address bus carries the instruction value.",
  },
  s3: {
    result: "Step 3: Read signal on control bus",
    method: "The control unit sends a memory read signal using the control bus.",
    trap: "Do not describe the control bus as carrying the memory address.",
  },
  s4: {
    result: "Step 4: memory instruction -> MDR",
    method: "The instruction stored at that memory address is transferred on the data bus into the MDR.",
    trap: "Do not send the instruction directly into the MAR; MAR is for addresses.",
  },
  s5: {
    result: "Step 5: MDR -> CIR",
    method: "The instruction is copied from the MDR to the Current Instruction Register for decoding.",
    trap: "Do not decode from the MDR in a Cambridge-style trace; use CIR for the current instruction.",
  },
  s6: {
    result: "Step 6: PC incremented",
    method: "The PC is updated so it points to the next instruction, unless a branch/jump changes the normal sequence.",
    trap: "Do not assume every instruction simply adds 1 to the PC; branch instructions can load a different address.",
  },
};

const examples = {
  fetch: {
    title: "Example 1: fetch trace",
    problem: "Trace the fetch stage when the PC contains address 120.",
    steps: [
      "The address 120 in the PC is copied to the MAR.",
      "The address 120 is placed on the address bus.",
      "A read signal is sent on the control bus.",
      "The instruction stored at address 120 is transferred from memory on the data bus into the MDR.",
      "The instruction is copied from the MDR to the CIR.",
      "The PC is incremented to point to the next instruction, unless the instruction changes the sequence.",
    ],
  },
  branch: {
    title: "Example 2: branch instruction",
    problem: "Explain why a jump instruction can change the normal cycle.",
    steps: [
      "The instruction is still fetched and decoded.",
      "During execute, the CPU may load a new address into the PC.",
      "The next fetch then uses this new PC value instead of the next sequential address.",
      "This is how loops and selection can alter the program flow.",
    ],
  },
  compare: {
    title: "Example 3: weak vs strong wording",
    problem: "Improve: 'The CPU fetches the command and then does it.'",
    steps: [
      "Weak: no register names, no memory transfer, no decode role.",
      "Strong: the address in the PC is copied to the MAR; the instruction is read from memory into the MDR and then copied to the CIR.",
      "Strong: the CU decodes the instruction in the CIR and the CPU executes it, possibly using the ALU or memory access.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Which register holds the address of the next instruction?", accepted: ["pc", "program counter"], answer: "PC / Program Counter" },
  { id: "p2", prompt: "Which register holds the memory address being accessed?", accepted: ["mar", "memory address register"], answer: "MAR / Memory Address Register" },
  { id: "p3", prompt: "Which register holds data or an instruction transferred to or from memory?", accepted: ["mdr", "memory data register"], answer: "MDR / Memory Data Register" },
  { id: "p4", prompt: "Which register holds the current instruction?", accepted: ["cir", "current instruction register"], answer: "CIR / Current Instruction Register" },
  { id: "p5", prompt: "Which bus carries the memory address?", accepted: ["address bus"], answer: "Address bus" },
  { id: "p6", prompt: "Which bus carries the instruction from memory to the CPU?", accepted: ["data bus"], answer: "Data bus" },
  { id: "p7", prompt: "Which bus carries the read signal?", accepted: ["control bus"], answer: "Control bus" },
  { id: "p8", prompt: "Which CPU component decodes the instruction?", accepted: ["cu", "control unit"], answer: "Control Unit / CU" },
  { id: "p9", prompt: "After a normal fetch, what usually happens to the PC?", accepted: ["incremented", "it is incremented", "increased", "updated"], answer: "It is incremented / updated to the next instruction address" },
  { id: "p10", prompt: "What stage comes after fetch?", accepted: ["decode"], answer: "Decode" },
];

const mistakes = [
  {
    wrong: "The PC stores the next instruction.",
    fix: "The PC stores the address of the next instruction. The instruction itself is fetched from memory and eventually copied into the CIR.",
  },
  {
    wrong: "The MAR carries the instruction to the CPU.",
    fix: "The MAR holds a memory address. The MDR holds the instruction or data transferred to/from memory.",
  },
  {
    wrong: "The CPU decodes the instruction before fetching it.",
    fix: "The CPU must fetch the instruction first. Then the instruction in the CIR is decoded by the control unit.",
  },
  {
    wrong: "Every execute stage uses the ALU to do arithmetic.",
    fix: "Some execute stages use the ALU, but others access memory or change the PC, such as branch instructions.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "5 marks",
    prompt: "Describe the fetch stage of the fetch-decode-execute cycle.",
    answer: "The PC contains the address of the next instruction. This address is copied to the MAR and placed on the address bus. A read signal is sent on the control bus. The instruction is transferred from memory on the data bus into the MDR. The instruction is copied to the CIR and the PC is incremented.",
    marking: [
      { mark: "B1", text: "PC contains address of next instruction" },
      { mark: "B1", text: "address copied to MAR / placed on address bus" },
      { mark: "B1", text: "read signal sent using control bus" },
      { mark: "B1", text: "instruction transferred from memory on data bus into MDR" },
      { mark: "B1", text: "instruction copied to CIR and/or PC incremented" },
    ],
    strict: [
      "Do not accept PC contains the instruction.",
      "Do not award MDR mark if candidate says MAR holds the instruction value.",
      "Allow PC increment before or after CIR copy if the sequence remains logically valid.",
    ],
  },
  {
    title: "Question 2",
    marks: "4 marks",
    prompt: "Explain the roles of the PC, MAR, MDR and CIR during the fetch-decode-execute cycle.",
    answer: "The PC holds the address of the next instruction. The MAR holds the address of the memory location being accessed. The MDR holds the data or instruction transferred from memory. The CIR holds the current instruction while it is decoded and executed.",
    marking: [
      { mark: "B1", text: "PC holds address of next instruction" },
      { mark: "B1", text: "MAR holds memory address being accessed" },
      { mark: "B1", text: "MDR holds data/instruction being transferred to/from memory" },
      { mark: "B1", text: "CIR holds current instruction for decoding/execution" },
    ],
    strict: [
      "Do not accept a list of register names without roles.",
      "Do not accept PC as holding data or instruction without address wording.",
      "Allow 'memory buffer register' only if the role matches MDR.",
      "Mark each register independently.",
    ],
  },
  {
    title: "Question 3",
    marks: "5 marks",
    prompt: "Describe what happens during the decode and execute stages of the cycle.",
    answer: "During decode, the control unit interprets the instruction in the CIR, identifies the opcode and works out any operands or addresses needed. During execute, the CPU carries out the instruction. This may involve the ALU performing an arithmetic or logical operation, data being read from or written to memory, or the PC being changed by a branch instruction.",
    marking: [
      { mark: "B1", text: "CU decodes/interprets instruction" },
      { mark: "B1", text: "instruction is in CIR/current instruction register" },
      { mark: "B1", text: "opcode/operation and operands/address identified" },
      { mark: "B1", text: "execute carries out instruction" },
      { mark: "B1", text: "valid execute example such as ALU operation, memory access or PC change" },
    ],
    strict: [
      "Do not require the word opcode if operation is clearly identified.",
      "Do not accept 'decode means convert binary to denary'.",
      "Allow branch/jump as execute example when PC update is clear.",
    ],
  },
  {
    title: "Question 4",
    marks: "6 marks",
    prompt: "A CPU is about to fetch an instruction stored at memory address 204. The PC contains 204. Trace the fetch stage.",
    answer: "The value 204 is copied from the PC to the MAR. The address 204 is placed on the address bus. A read signal is sent on the control bus. The instruction stored at address 204 is transferred from memory on the data bus to the MDR. The instruction is copied from the MDR to the CIR. The PC is incremented to point to the next instruction, unless the fetched instruction changes the normal sequence.",
    marking: [
      { mark: "M1", text: "204 copied from PC to MAR" },
      { mark: "B1", text: "address 204 placed on address bus" },
      { mark: "B1", text: "read signal sent on control bus" },
      { mark: "B1", text: "instruction at address 204 transferred from memory" },
      { mark: "B1", text: "instruction placed in MDR then copied to CIR" },
      { mark: "A1", text: "PC incremented/updated after fetch, with branch exception if stated" },
    ],
    strict: [
      "Do not award M1 if 204 is described as the instruction rather than the address.",
      "Do not require exact next address because instruction length may vary by architecture.",
      "Allow MDR and CIR as two separate statements or one combined statement.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "Explain how a branch instruction can affect the fetch-decode-execute cycle.",
    answer: "A branch instruction is fetched and placed in the CIR like other instructions. The control unit decodes it and identifies that program flow may change. During execute, if the branch condition is met, a new address is loaded into the PC. The next fetch then uses this new address rather than the following sequential instruction. This allows selection and repetition in programs.",
    marking: [
      { mark: "B1", text: "branch instruction is fetched into CIR" },
      { mark: "B1", text: "CU decodes branch/condition" },
      { mark: "B1", text: "condition may be tested or branch target identified" },
      { mark: "B1", text: "PC loaded/changed to new address if branch taken" },
      { mark: "B1", text: "next fetch uses new PC address rather than sequential address" },
      { mark: "B1", text: "program flow changes / supports selection or repetition" },
    ],
    strict: [
      "Do not accept 'branch stops the cycle' unless program termination is specifically described.",
      "Do not require assembly-language syntax.",
      "Allow unconditional jump if the PC change is clear.",
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
    pc: "Correct. The PC holds the address of the next instruction to fetch.",
    alu: "Not first. The ALU may be used during execute, but fetch starts with the PC address.",
    cir: "The CIR holds the current instruction after it has been fetched, not the first address source.",
    ssd: "No. The CPU fetches instructions for execution from main memory, not directly from secondary storage.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = responses[button.dataset.hook];
    });
  });
}

function setupSequencer() {
  const select = document.querySelector("#stepInput");
  const result = document.querySelector("#stepResult");
  const method = document.querySelector("#stepMethod");
  const trap = document.querySelector("#stepTrap");
  function showStep() {
    const item = fetchSteps[select.value];
    result.textContent = item.result;
    method.innerHTML = `<strong>What happens:</strong> ${item.method}`;
    trap.innerHTML = `<strong>Common trap:</strong> ${item.trap}`;
  }
  select.addEventListener("change", showStep);
  document.querySelector("#stepBtn").addEventListener("click", showStep);
  showStep();
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
      </div>
    </article>
  `).join("");
  setupAnswerToggles(list);
}

setupPrint();
setupHook();
setupSequencer();
setupExamples();
renderPractice();
renderMistakes();
renderExamQuestions();
