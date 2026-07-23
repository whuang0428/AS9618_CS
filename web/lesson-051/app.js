const scenarioMap = {
  fde: {
    result: "Topic: fetch-decode-execute cycle and registers.",
    method: "Use PC, MAR, MDR and CIR in sequence. State what each register holds, not just its name.",
    trap: "Do not answer with a general description of the CPU if the question asks for the fetch stage.",
  },
  bus: {
    result: "Topic: system buses.",
    method: "Identify which bus is used, what it carries and whether direction matters. Control bus carries control and timing signals.",
    trap: "Do not say the control bus carries data values; that is the data bus.",
  },
  mode: {
    result: "Topic: addressing modes.",
    method: "Explain how the operand is interpreted. #20 is immediate value; 20 in direct addressing is a memory address.",
    trap: "Do not calculate before stating whether the operand is value, address or pointer.",
  },
  interrupt: {
    result: "Topic: interrupts and ISRs.",
    method: "Use the sequence: finish instruction, check/accept interrupt, save state, run ISR, restore state, resume.",
    trap: "Do not say the interrupt deletes or replaces the interrupted program.",
  },
  pipeline: {
    result: "Topic: pipelining and control hazards.",
    method: "A branch can change the next instruction. Already fetched instructions may be flushed and the pipeline may stall.",
    trap: "Do not write only that pipelining is faster; the question is asking why the benefit is reduced.",
  },
  performance: {
    result: "Topic: processor performance factors.",
    method: "Discuss mechanism and condition: cores help parallel tasks; cache reduces memory access time; clock speed is cycles per second.",
    trap: "Do not rank processors using one factor only.",
  },
};

const examples = {
  fde: {
    title: "Example 1: FDE trace with mark annotations",
    problem: "Trace the fetch stage and name the role of PC, MAR and MDR.",
    steps: [
      "Topic recognition: this is a register/FDE question.",
      "The PC holds the address of the next instruction to be fetched.",
      "That address is copied to the MAR.",
      "The instruction at that memory address is fetched from memory and placed in the MDR.",
      "The instruction is then copied to the CIR for decoding.",
      "Mark-worthy phrases name the register and state what it holds or transfers.",
    ],
  },
  addressing: {
    title: "Example 2: direct versus indirect",
    problem: "Given memory[20] = 70 and memory[70] = 999, compare LOAD 20 and LOAD (20).",
    steps: [
      "Topic recognition: this is addressing mode and operand interpretation.",
      "LOAD 20 uses direct addressing, so 20 is the address of the value.",
      "The CPU reads memory[20], so the loaded value is 70.",
      "LOAD (20) uses indirect addressing, so memory[20] stores the effective address.",
      "The CPU reads memory[20] to get 70, then memory[70] to get 999.",
      "The contrast earns marks because it states value, address and pointer clearly.",
    ],
  },
  interrupt: {
    title: "Example 3: interrupt sequence",
    problem: "Explain why the CPU saves state before an ISR.",
    steps: [
      "Topic recognition: this is interrupt handling, not a general FDE question.",
      "The interrupted program must be able to continue later.",
      "The CPU saves processor state such as PC, registers and status flags.",
      "The ISR handles the device/event.",
      "After the ISR, the saved state is restored.",
      "This allows the interrupted program to resume from the correct point.",
    ],
  },
  pipeline: {
    title: "Example 4: pipeline limitation",
    problem: "Explain why a branch may reduce the benefit of pipelining.",
    steps: [
      "Topic recognition: this is pipelining, specifically a control hazard.",
      "A branch may change the program counter and therefore the next instruction.",
      "The pipeline may already have fetched instructions from the wrong path.",
      "Those instructions may be flushed or discarded.",
      "The pipeline may wait while fetching from the correct address.",
      "This reduces throughput compared with the ideal pipeline.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Which register holds the address of the next instruction?", accepted: ["pc", "program counter"], answer: "PC / program counter" },
  { id: "p2", prompt: "Which register holds the memory address currently being accessed?", accepted: ["mar", "memory address register"], answer: "MAR / memory address register" },
  { id: "p3", prompt: "Which bus carries read, write and interrupt signals?", accepted: ["control bus"], answer: "Control bus" },
  { id: "p4", prompt: "Which addressing mode uses the operand as the actual value?", accepted: ["immediate", "immediate addressing"], answer: "Immediate addressing" },
  { id: "p5", prompt: "What routine handles a specific interrupt?", accepted: ["isr", "interrupt service routine"], answer: "ISR / interrupt service routine" },
  { id: "p6", prompt: "What performance factor is small fast memory close to the CPU?", accepted: ["cache", "cache memory"], answer: "Cache / cache memory" },
  { id: "p7", prompt: "What term means overlapping stages of different instructions?", accepted: ["pipelining", "instruction pipelining", "pipeline"], answer: "Pipelining" },
  { id: "p8", prompt: "What is the term for instructions completed per unit time?", accepted: ["throughput"], answer: "Throughput" },
  { id: "p9", prompt: "What addressing mode uses base address plus index?", accepted: ["indexed", "indexed addressing", "index addressing"], answer: "Indexed addressing" },
  { id: "p10", prompt: "What must the CPU save before running an ISR so it can resume later?", accepted: ["state", "processor state", "cpu state", "context", "registers pc and flags", "pc registers and status flags"], answer: "Processor state, such as PC, registers and status flags" },
];

const mistakes = [
  {
    wrong: "MAR and MDR both store whatever comes from memory, so either term is fine.",
    fix: "MAR stores the memory address being accessed. MDR stores the data or instruction transferred to/from memory.",
  },
  {
    wrong: "Direct addressing and immediate addressing both load the number written in the instruction.",
    fix: "Immediate uses the operand as the value itself. Direct uses the operand as the memory address of the value.",
  },
  {
    wrong: "An interrupt means the current program is deleted and the ISR replaces it.",
    fix: "The CPU saves state, runs the ISR, restores state and can resume the interrupted program.",
  },
  {
    wrong: "Pipelining makes one instruction complete fetch, decode and execute at the same time.",
    fix: "Pipelining overlaps different instructions in different stages; one instruction still passes through the stages in order.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "6 marks",
    prompt: "Describe the fetch stage of the fetch-decode-execute cycle, referring to PC, MAR, MDR and CIR.",
    answer: "The PC holds the address of the next instruction. This address is copied to the MAR. The address is placed on the address bus and a read signal is sent. The instruction at that memory address is fetched from memory into the MDR. The instruction is then copied from the MDR to the CIR, where it can be decoded. The PC is updated to point to the next instruction.",
    marking: [
      { mark: "B1", text: "PC holds address of next instruction" },
      { mark: "B1", text: "address from PC is copied to MAR / MAR holds address being accessed" },
      { mark: "B1", text: "read signal/address bus used to access memory" },
      { mark: "B1", text: "instruction/data fetched from memory into MDR" },
      { mark: "B1", text: "instruction copied to CIR for decoding" },
      { mark: "B1", text: "PC is incremented/updated to next instruction" },
    ],
    strict: [
      "Do not accept MAR as holding the instruction itself.",
      "Do not accept MDR as holding the memory address.",
      "Allow equivalent sequence if PC update occurs at a different stated point.",
    ],
  },
  {
    title: "Question 2",
    marks: "5 marks",
    prompt: "Compare direct addressing and indirect addressing using a memory example.",
    answer: "In direct addressing, the operand is the memory address of the value. For example, if memory[20] = 70, LOAD 20 loads 70. In indirect addressing, the operand is the address of a location that stores another address. If memory[20] = 70 and memory[70] = 999, LOAD (20) first reads memory[20] to get effective address 70, then loads memory[70], which is 999.",
    marking: [
      { mark: "B1", text: "direct addressing uses operand as address of value" },
      { mark: "B1", text: "valid direct example such as memory[20] = 70 gives loaded value 70" },
      { mark: "B1", text: "indirect addressing uses operand as address of a pointer / address of an address" },
      { mark: "B1", text: "indirect example performs first lookup to get effective address" },
      { mark: "B1", text: "indirect example performs second lookup to get final value" },
    ],
    strict: [
      "Do not award direct mark if operand is described as the actual value.",
      "Do not award final indirect mark if answer stops at the pointer value.",
      "Allow bracket notation or equivalent words for indirection.",
    ],
  },
  {
    title: "Question 3",
    marks: "5 marks",
    prompt: "Explain how a processor handles an interrupt from an input device.",
    answer: "The processor completes the current instruction and recognises the interrupt. It saves the current processor state, such as the PC, registers and status flags, so the interrupted program can continue later. The appropriate interrupt service routine is located and run to handle the input device event. The interrupt may be acknowledged or cleared. The saved state is restored and the original program resumes.",
    marking: [
      { mark: "B1", text: "current instruction completed / interrupt recognised" },
      { mark: "B1", text: "processor state saved, with valid examples such as PC/registers/flags" },
      { mark: "B1", text: "appropriate ISR/handler is located or run" },
      { mark: "B1", text: "device event is handled / interrupt acknowledged or cleared" },
      { mark: "B1", text: "state restored and interrupted program resumes" },
    ],
    strict: [
      "Do not accept that the current program is deleted.",
      "Do not require every register name if processor state is clearly explained.",
      "Allow handler for ISR if role is clear.",
    ],
  },
  {
    title: "Question 4",
    marks: "6 marks",
    prompt: "Discuss two factors that can affect processor performance and include a limitation for each.",
    answer: "A higher clock speed can allow more clock cycles per second, so more instruction-cycle steps may be performed per second. However, performance may be limited by memory access, architecture or heat. More cores can allow parallel execution of tasks or threads, improving performance for parallel workloads or multitasking. However, a single-threaded program may not use extra cores fully. Cache can also improve performance by reducing slow main-memory access when frequently used data is found in cache, but cache misses still require slower memory access.",
    marking: [
      { mark: "B1", text: "valid factor identified, such as clock speed, cores, cache or word length" },
      { mark: "B1", text: "mechanism for first factor explained" },
      { mark: "B1", text: "valid limitation/condition for first factor" },
      { mark: "B1", text: "second valid factor identified" },
      { mark: "B1", text: "mechanism for second factor explained" },
      { mark: "B1", text: "valid limitation/condition for second factor" },
    ],
    strict: [
      "Do not accept factor names alone without explaining how each affects performance.",
      "Do not accept 'it is better' as a limitation or consequence.",
      "Allow any two valid Section 4 performance factors.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "Explain how pipelining can improve performance and why a branch instruction may reduce this improvement.",
    answer: "Pipelining overlaps stages of different instructions, such as fetching one instruction while decoding another and executing a third. Once the pipeline is full, this can increase throughput because instructions may complete more frequently. A branch instruction may change the program counter and therefore the next instruction address. The pipeline may have already fetched instructions from the wrong path. These may need to be flushed or discarded, causing a stall or delay, which reduces the ideal performance gain.",
    marking: [
      { mark: "B1", text: "pipelining overlaps stages of different instructions" },
      { mark: "B1", text: "valid fetch/decode/execute overlap example" },
      { mark: "B1", text: "throughput can increase / instructions complete more frequently" },
      { mark: "B1", text: "branch may change PC / next instruction address" },
      { mark: "B1", text: "wrong instructions may already have been fetched" },
      { mark: "B1", text: "flush/stall/delay reduces ideal performance gain" },
    ],
    strict: [
      "Do not accept that one instruction performs all stages simultaneously.",
      "Do not require branch prediction terminology.",
      "Allow control hazard if explained with branch effect.",
    ],
  },
];

function normalise(value) {
  return value.trim().toLowerCase().replace(/[-_\s/]+/g, " ");
}

function setupPrint() {
  document.querySelector("#printBtn").addEventListener("click", () => window.print());
}

function setupHook() {
  const feedback = document.querySelector("#hookFeedback");
  const responses = {
    addressing: "Correct. The clue is #5 versus 5: immediate and direct addressing interpret the operand differently.",
    interrupts: "No. There is no device signal, ISR or state-saving sequence here.",
    pipelining: "No. No overlapping fetch/decode/execute stages are mentioned.",
    cache: "No. The question is about operand meaning, not memory access speed.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = responses[button.dataset.hook];
    });
  });
}

function setupSimulator() {
  const select = document.querySelector("#scenarioInput");
  const result = document.querySelector("#simulateResult");
  const method = document.querySelector("#simulateMethod");
  const trap = document.querySelector("#simulateTrap");
  function simulate() {
    const item = scenarioMap[select.value];
    result.textContent = item.result;
    method.innerHTML = `<strong>Response pattern:</strong> ${item.method}`;
    trap.innerHTML = `<strong>Common trap:</strong> ${item.trap}`;
  }
  select.addEventListener("change", simulate);
  document.querySelector("#simulateBtn").addEventListener("click", simulate);
  simulate();
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
  renderExample("fde");
}

function setupAnswerToggles(scope = document) {
  scope.querySelectorAll(".answer-toggle, .ms-toggle").forEach((button) => {
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
setupSimulator();
setupExamples();
renderPractice();
renderMistakes();
renderExamQuestions();
