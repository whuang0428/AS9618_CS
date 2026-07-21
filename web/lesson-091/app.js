const classifierMap = {
  fde: {
    topic: "Fetch-decode-execute cycle",
    reason: "Use PC, MAR, MDR and CIR to explain how the instruction is fetched before decoding.",
  },
  cache: {
    topic: "Processor performance / cache",
    reason: "Cache stores frequently used data/instructions close to the CPU, reducing slower RAM access.",
  },
  ssd: {
    topic: "Hardware selection / secondary storage",
    reason: "Justify SSD using characteristics such as no moving parts, durability, speed and portability.",
  },
  interrupt: {
    topic: "Interrupt handling",
    reason: "Explain interrupt signal, priority checking, saving state, ISR execution and restoring state.",
  },
  logic: {
    topic: "Logic gates / truth table",
    reason: "XOR outputs 1 only when the two inputs are different.",
  },
};

const fdeMap = {
  pcToMar: {
    title: "PC to MAR",
    detail: "The Program Counter stores the address of the next instruction. This address is copied to the Memory Address Register so memory can be accessed.",
  },
  memoryToMdr: {
    title: "Memory to MDR",
    detail: "The instruction at the address in MAR is fetched from memory and placed in the Memory Data Register.",
  },
  mdrToCir: {
    title: "MDR to CIR",
    detail: "The fetched instruction is copied from MDR to the Current Instruction Register so it can be decoded and executed.",
  },
  incrementPc: {
    title: "Increment PC",
    detail: "The Program Counter is incremented so it points to the next instruction, unless a branch or interrupt changes the sequence.",
  },
  decode: {
    title: "Decode",
    detail: "The Control Unit decodes the opcode in the CIR and identifies the operation, addressing mode and operands needed.",
  },
};

const examples = {
  hardware: {
    title: "Example 1: Hardware choice",
    problem: "Justify using an SSD rather than a hard disk in a student tablet.",
    steps: [
      "Name the characteristic: SSD has no moving parts.",
      "Link to scenario: a tablet may be carried and knocked, so SSD is more resistant to shock.",
      "Add performance: SSD has faster access times than magnetic hard disk.",
      "Avoid vague wording: 'better' earns little unless it is linked to durability, speed, weight or power use.",
    ],
  },
  fde: {
    title: "Example 2: Fetch step marks",
    problem: "Describe how the processor fetches the next instruction.",
    steps: [
      "PC stores the address of the next instruction.",
      "Address is copied to MAR.",
      "Instruction is fetched from memory into MDR.",
      "Instruction is copied into CIR and the PC is incremented.",
    ],
  },
  interrupt: {
    title: "Example 3: Interrupt handling",
    problem: "Explain how a processor responds when a printer sends an interrupt.",
    steps: [
      "The interrupt signal indicates the device needs attention.",
      "The processor completes the current instruction and checks interrupt priority.",
      "The current state is saved so the program can resume later.",
      "The relevant interrupt service routine is executed, then the saved state is restored.",
    ],
  },
  performance: {
    title: "Example 4: Performance factor answer",
    problem: "Explain how cache size can affect processor performance.",
    steps: [
      "Cache stores frequently used data and instructions.",
      "Cache is faster to access than RAM.",
      "A larger cache can reduce the number of slower main memory accesses.",
      "Performance may improve if the program reuses data/instructions that fit in cache.",
    ],
  },
};

const practice = [
  {
    id: "p1",
    prompt: "Which register stores the address of the next instruction?",
    accepted: ["pc", "program counter"],
    answer: "PC / Program Counter",
  },
  {
    id: "p2",
    prompt: "Which register stores the address currently being accessed in memory?",
    accepted: ["mar", "memory address register"],
    answer: "MAR / Memory Address Register",
  },
  {
    id: "p3",
    prompt: "Which register stores data or an instruction being transferred to/from memory?",
    accepted: ["mdr", "memory data register", "memory buffer register", "mbr"],
    answer: "MDR / Memory Data Register",
  },
  {
    id: "p4",
    prompt: "Which register stores the current instruction?",
    accepted: ["cir", "current instruction register"],
    answer: "CIR / Current Instruction Register",
  },
  {
    id: "p5",
    prompt: "Which CPU component performs arithmetic and logic operations?",
    accepted: ["alu", "arithmetic logic unit", "arithmetic and logic unit"],
    answer: "ALU",
  },
  {
    id: "p6",
    prompt: "Which CPU component coordinates and controls processor operations?",
    accepted: ["cu", "control unit"],
    answer: "CU / Control Unit",
  },
  {
    id: "p7",
    prompt: "Which bus carries memory addresses?",
    accepted: ["address bus"],
    answer: "Address bus",
  },
  {
    id: "p8",
    prompt: "Which logic gate outputs 1 when inputs are different?",
    accepted: ["xor", "exclusive or", "exclusive-or"],
    answer: "XOR",
  },
  {
    id: "p9",
    prompt: "Which type of storage has no moving parts and is common in tablets?",
    accepted: ["ssd", "solid state", "solid-state storage", "solid state drive"],
    answer: "SSD / solid-state storage",
  },
  {
    id: "p10",
    prompt: "What routine handles a specific interrupt?",
    accepted: ["isr", "interrupt service routine"],
    answer: "ISR / Interrupt Service Routine",
  },
];

const mistakes = [
  {
    wrong: "The PC stores the current instruction.",
    fix: "The PC stores the address of the next instruction. The CIR stores the current instruction.",
  },
  {
    wrong: "The data bus carries addresses.",
    fix: "The address bus carries addresses. The data bus carries data/instructions between components.",
  },
  {
    wrong: "More cores always make every program faster.",
    fix: "More cores help when tasks can run in parallel. A single-threaded program may not benefit much.",
  },
  {
    wrong: "An interrupt stops the processor permanently.",
    fix: "An interrupt pauses normal processing, saves state, runs an ISR, then returns to the interrupted program if appropriate.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "5 marks",
    prompt: "Describe the fetch part of the fetch-decode-execute cycle, naming the registers used.",
    answer: "The Program Counter stores the address of the next instruction. This address is copied to the MAR. The instruction is fetched from memory and placed in the MDR. The instruction is copied to the CIR. The PC is incremented to point to the next instruction.",
    marking: [
      { mark: "B1", text: "PC stores address of next instruction" },
      { mark: "B1", text: "address copied to MAR" },
      { mark: "B1", text: "instruction/data fetched from memory into MDR" },
      { mark: "B1", text: "instruction copied to CIR" },
      { mark: "B1", text: "PC incremented / updated for next instruction" },
    ],
    strict: [
      "Do not accept PC stores the current instruction.",
      "Allow MDR described as memory buffer register if used consistently.",
      "Do not require decode or execute details for this question.",
    ],
  },
  {
    title: "Question 2",
    marks: "4 marks",
    prompt: "A tablet computer needs secondary storage. Justify why solid-state storage may be suitable.",
    answer: "Solid-state storage has no moving parts, so it is more resistant to damage if the tablet is moved or knocked. It has fast access times, so apps and files can load quickly. It is also lightweight and uses less power than a magnetic hard disk, which suits a portable battery-powered device.",
    marking: [
      { mark: "B1", text: "states SSD has no moving parts / is solid-state" },
      { mark: "B1", text: "links this to durability/being moved/knocked in a tablet" },
      { mark: "B1", text: "states fast access / low power / lightweight" },
      { mark: "B1", text: "links second characteristic to portable tablet use" },
    ],
    strict: [
      "Do not award full credit for saying only 'it is better'.",
      "Allow shock-resistant, durable, fast access or low power as valid characteristics.",
      "Do not require comparison with magnetic disk if suitability is clear.",
    ],
  },
  {
    title: "Question 3",
    marks: "5 marks",
    prompt: "Explain how an interrupt from an input/output device is handled by the processor.",
    answer: "The device sends an interrupt signal to request attention. The processor completes the current instruction, checks the interrupt and may compare priority. It saves the current program state, then runs the appropriate interrupt service routine. After the ISR, the saved state is restored and the original program can continue.",
    marking: [
      { mark: "B1", text: "device sends interrupt signal / request for attention" },
      { mark: "B1", text: "processor completes current instruction / checks interrupt" },
      { mark: "B1", text: "current state/context is saved" },
      { mark: "B1", text: "appropriate ISR is executed" },
      { mark: "B1", text: "state restored / original program resumes" },
    ],
    strict: [
      "Do not accept an interrupt as an error message only.",
      "Allow priority checking as part of checking the interrupt.",
      "Do not require exact stack terminology.",
    ],
  },
  {
    title: "Question 4",
    marks: "5 marks",
    prompt: "Complete and explain the truth table for A XOR B.",
    answer: "XOR outputs 1 when the inputs are different. The outputs for A B = 00, 01, 10, 11 are 0, 1, 1, 0.",
    marking: [
      { mark: "B1", text: "states XOR outputs 1 when inputs are different" },
      { mark: "B1", text: "output for 00 is 0" },
      { mark: "B1", text: "output for 01 is 1" },
      { mark: "B1", text: "output for 10 is 1" },
      { mark: "B1", text: "output for 11 is 0" },
    ],
    strict: [
      "Do not accept OR truth table because 11 would be 1 for OR.",
      "Allow row order variations if inputs and outputs are clearly matched.",
      "Do not require Boolean expression unless asked.",
      "Individual row marks are independent.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "A student says: 'Increasing clock speed, cache size and number of cores all make the CPU faster in the same way.' Explain why this is weak.",
    answer: "Clock speed affects how many cycles per second the CPU can perform. Cache size affects how often frequently used data/instructions can be accessed from fast cache rather than slower RAM. More cores can allow parallel processing, but only if the workload can be split between cores. The statement is weak because these factors affect performance in different ways and do not improve every program equally.",
    marking: [
      { mark: "B1", text: "defines clock speed as cycles/instructions per second idea" },
      { mark: "B1", text: "explains cache stores frequently used data/instructions close to CPU" },
      { mark: "B1", text: "links cache to reduced access to slower RAM" },
      { mark: "B1", text: "explains cores can process tasks in parallel" },
      { mark: "B1", text: "states parallel benefit depends on workload/software" },
      { mark: "B1", text: "explicitly states the three factors affect performance differently" },
    ],
    strict: [
      "Do not accept 'more cores always faster' without workload condition.",
      "Do not accept cache as the same as RAM.",
      "Allow clock speed described as fetch-decode-execute cycles per second.",
    ],
  },
];

function normalise(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ").replace(/ ;$/, ";");
}

function setupPrint() {
  document.querySelector("#printBtn").addEventListener("click", () => window.print());
}

function setupHook() {
  const feedback = document.querySelector("#hookFeedback");
  const responses = {
    cache: "Topic: cache/performance. First phrase: frequently used data/instructions can be accessed faster than RAM.",
    interrupt: "Topic: interrupt handling. First phrase: device requests processor attention and an ISR handles it.",
    ssd: "Topic: hardware selection. First phrase: no moving parts, fast access and durable for portable use.",
    xor: "Topic: logic gates. First phrase: XOR outputs 1 when inputs are different.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = responses[button.dataset.hook];
    });
  });
}

function setupClassifier() {
  const input = document.querySelector("#classifierInput");
  const result = document.querySelector("#classifyResult");
  document.querySelector("#classifyBtn").addEventListener("click", () => {
    const item = classifierMap[input.value];
    result.innerHTML = `<strong>${item.topic}</strong><br />${item.reason}`;
  });
}

function setupFdeTracer() {
  const input = document.querySelector("#fdeInput");
  const result = document.querySelector("#fdeResult");
  document.querySelector("#fdeBtn").addEventListener("click", () => {
    const item = fdeMap[input.value];
    result.innerHTML = `<div class="calc-card"><strong>${item.title}</strong><br />${item.detail}</div>`;
  });
}

function renderExample(key) {
  const example = examples[key];
  const box = document.querySelector("#exampleBox");
  box.innerHTML = `
    <h3>${example.title}</h3>
    <p><strong>Problem:</strong> ${example.problem}</p>
    <ol>
      ${example.steps.map((step) => `<li>${step}</li>`).join("")}
    </ol>
  `;
}

function setupExamples() {
  document.querySelectorAll("[data-example]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-example]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderExample(button.dataset.example);
    });
  });
  renderExample("hardware");
}

function renderPractice() {
  const list = document.querySelector("#practiceList");
  list.innerHTML = practice
    .map(
      (item, index) => `
        <article class="practice-item">
          <p><strong>${index + 1}.</strong> ${item.prompt}</p>
          <div class="practice-row">
            <input type="text" id="${item.id}" autocomplete="off" aria-label="Answer for question ${index + 1}" />
            <span class="mark" id="${item.id}Mark">Not checked</span>
          </div>
          <button class="answer-toggle" type="button" data-answer="${item.id}">Show answer</button>
          <div class="answer-panel" id="${item.id}Answer"><strong>Answer:</strong> ${item.answer}</div>
        </article>
      `
    )
    .join("");

  practice.forEach((item) => {
    const input = document.querySelector(`#${item.id}`);
    const mark = document.querySelector(`#${item.id}Mark`);
    input.addEventListener("input", () => {
      const value = normalise(input.value);
      const correct = item.accepted.some((answer) => normalise(answer) === value);
      mark.textContent = value.length === 0 ? "Not checked" : correct ? "Correct" : "Try again";
      mark.classList.toggle("correct", correct);
      mark.classList.toggle("incorrect", value.length > 0 && !correct);
    });
  });

  document.querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#${button.dataset.answer}Answer`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide answer" : "Show answer";
    });
  });
}

function renderMistakes() {
  const grid = document.querySelector("#mistakeGrid");
  grid.innerHTML = mistakes
    .map(
      (item, index) => `
        <article>
          <p class="wrong"><strong>Weak answer ${index + 1}:</strong> ${item.wrong}</p>
          <button class="answer-toggle" type="button" data-fix="fix${index}">Show correction</button>
          <div class="answer-panel" id="fix${index}"><strong>Correction:</strong> ${item.fix}</div>
        </article>
      `
    )
    .join("");

  document.querySelectorAll("[data-fix]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#${button.dataset.fix}`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide correction" : "Show correction";
    });
  });
}

function renderExamQuestions() {
  const list = document.querySelector("#examList");
  list.innerHTML = examQuestions
    .map(
      (question, index) => `
        <article class="exam-card">
          <div class="exam-head">
            <h3>${question.title}</h3>
            <span>${question.marks}</span>
          </div>
          <p>${question.prompt}</p>
          <button class="ms-toggle" type="button" data-ms="ms${index}">Show MS</button>
          <div class="ms-panel" id="ms${index}">
            <p><strong>Indicative answer:</strong> ${question.answer}</p>
            <h4>CIE-style mark scheme</h4>
            <ul>
              ${question.marking.map((mark) => `<li><strong>${mark.mark}:</strong> ${mark.text}</li>`).join("")}
            </ul>
            <h4>Strict notes</h4>
            <ul>
              ${question.strict.map((note) => `<li>${note}</li>`).join("")}
            </ul>
          </div>
        </article>
      `
    )
    .join("");

  document.querySelectorAll("[data-ms]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#${button.dataset.ms}`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide MS" : "Show MS";
    });
  });
}

function init() {
  setupPrint();
  setupHook();
  setupClassifier();
  setupFdeTracer();
  setupExamples();
  renderPractice();
  renderMistakes();
  renderExamQuestions();
}

init();
