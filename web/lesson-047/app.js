const memory = {
  20: 70,
  70: 999,
  100: 11,
  103: 44,
};

const modeMap = {
  immediate: {
    result: "Immediate addressing: value loaded = 20",
    method: "The operand #20 is the actual value. The CPU does not use 20 as a memory address to find the operand value.",
    trap: "Do not look up memory[20] for immediate addressing.",
  },
  direct: {
    result: "Direct addressing: effective address = 20, value loaded = 70",
    method: "The operand 20 is a memory address. The CPU reads memory[20], which is 70.",
    trap: "Do not load the number 20 itself unless the mode is immediate.",
  },
  indirect: {
    result: "Indirect addressing: pointer address = 20, effective address = 70, value loaded = 999",
    method: "The CPU reads memory[20] to get 70. It then uses 70 as the effective address and reads memory[70], which is 999.",
    trap: "Indirect addressing requires two memory references in this simplified example.",
  },
  indexed: {
    result: "Indexed addressing: effective address = 100 + IX(3) = 103, value loaded = 44",
    method: "The base operand is 100 and the index register contains 3. The effective address is 103, so the CPU reads memory[103].",
    trap: "Do not read memory[100] directly when an index register is part of the addressing mode.",
  },
  direct103: {
    result: "Direct addressing: effective address = 103, value loaded = 44",
    method: "The operand 103 is the memory address. The CPU reads memory[103], which is 44.",
    trap: "This reaches the same value as the indexed example, but by a different addressing mode.",
  },
};

const examples = {
  compare: {
    title: "Example 1: compare immediate and direct",
    problem: "Given memory[20] = 70, compare LOAD #20 and LOAD 20.",
    steps: [
      "LOAD #20 uses immediate addressing, so the operand is the value 20.",
      "LOAD 20 uses direct addressing, so the operand is the address 20.",
      "The CPU reads memory[20] and gets 70 for direct addressing.",
      "Same number in the instruction; different interpretation.",
    ],
  },
  indirect: {
    title: "Example 2: indirect addressing trace",
    problem: "Given memory[20] = 70 and memory[70] = 999, trace LOAD (20).",
    steps: [
      "The operand 20 is a pointer location.",
      "Read memory[20] to find the effective address: 70.",
      "Read memory[70] to find the actual value: 999.",
      "The value loaded is 999.",
    ],
  },
  indexed: {
    title: "Example 3: indexed array access",
    problem: "Base address is 100, IX = 3 and memory[103] = 44. Trace LOAD 100, IX.",
    steps: [
      "The base address is 100.",
      "The index register contains offset 3.",
      "Effective address = 100 + 3 = 103.",
      "The CPU reads memory[103], so the value loaded is 44.",
      "Changing IX can access another element without changing the instruction's base address.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Which addressing mode uses the operand as the actual value?", accepted: ["immediate", "immediate addressing"], answer: "Immediate addressing" },
  { id: "p2", prompt: "Which addressing mode uses the operand as the memory address of the value?", accepted: ["direct", "direct addressing"], answer: "Direct addressing" },
  { id: "p3", prompt: "Which addressing mode uses the operand as a pointer to another address?", accepted: ["indirect", "indirect addressing"], answer: "Indirect addressing" },
  { id: "p4", prompt: "Which addressing mode calculates base address plus index?", accepted: ["indexed", "indexed addressing", "index addressing"], answer: "Indexed addressing" },
  { id: "p5", prompt: "Given memory[20] = 70, what value does LOAD 20 load using direct addressing?", accepted: ["70"], answer: "70" },
  { id: "p6", prompt: "Given memory[20] = 70, what value does LOAD #20 load?", accepted: ["20"], answer: "20" },
  { id: "p7", prompt: "Given memory[20] = 70 and memory[70] = 999, what value does LOAD (20) load?", accepted: ["999"], answer: "999" },
  { id: "p8", prompt: "Base 100 and IX 3 gives what effective address?", accepted: ["103"], answer: "103" },
  { id: "p9", prompt: "What is the name for the actual address used after applying the addressing mode?", accepted: ["effective address"], answer: "Effective address" },
  { id: "p10", prompt: "In immediate addressing, does the CPU look up the operand as a memory address? Answer yes or no.", accepted: ["no"], answer: "No" },
];

const mistakes = [
  {
    wrong: "Immediate addressing means the operand is a memory address used immediately.",
    fix: "Immediate addressing means the operand is the actual value to use, not a memory address.",
  },
  {
    wrong: "Direct and indirect addressing both read the value from the operand address once.",
    fix: "Direct addressing reads the value at the operand address. Indirect addressing first reads a pointer at the operand address, then reads the value at that effective address.",
  },
  {
    wrong: "Indexed addressing stores an array inside the index register.",
    fix: "The index register stores an offset. The effective address is calculated from base address plus index.",
  },
  {
    wrong: "The operand always has the same meaning, regardless of the addressing mode.",
    fix: "The addressing mode tells the CPU how to interpret the operand, so the same operand can mean different things.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "4 marks",
    prompt: "Explain the difference between immediate addressing and direct addressing.",
    answer: "In immediate addressing, the operand is the actual value to be used by the instruction. In direct addressing, the operand is the memory address where the value is stored. For example, LOAD #20 loads the value 20, while LOAD 20 loads the value stored at memory address 20.",
    marking: [
      { mark: "B1", text: "immediate addressing uses operand as actual value" },
      { mark: "B1", text: "direct addressing uses operand as memory address" },
      { mark: "B1", text: "direct addressing fetches value stored at that address" },
      { mark: "B1", text: "valid contrasting example such as #20 vs 20" },
    ],
    strict: [
      "Do not accept immediate as simply 'faster' without operand meaning.",
      "Do not accept direct addressing as using operand as the actual data value.",
      "Allow equivalent notation for immediate addressing if clear.",
      "FT: award direct mark even if immediate example syntax differs.",
    ],
  },
  {
    title: "Question 2",
    marks: "5 marks",
    prompt: "Given memory[20] = 70 and memory[70] = 999, trace the instruction LOAD (20) using indirect addressing.",
    answer: "In indirect addressing, the operand 20 is used as the address of a memory location that contains another address. The CPU reads memory[20] and obtains 70. This 70 is the effective address. The CPU then reads memory[70] and obtains 999, so 999 is the value loaded.",
    marking: [
      { mark: "B1", text: "recognises indirect addressing uses operand as pointer address" },
      { mark: "M1", text: "reads memory[20]" },
      { mark: "A1", text: "gets 70 as effective address" },
      { mark: "M1", text: "reads memory[70]" },
      { mark: "A1", text: "gets/loads value 999" },
    ],
    strict: [
      "Do not award full marks if answer stops at 70 as the loaded value.",
      "Do not require the term pointer if the two-stage lookup is clear.",
      "Allow bracket notation or words describing indirect addressing.",
      "FT: if first lookup value is copied incorrectly, award second lookup method if used consistently.",
    ],
  },
  {
    title: "Question 3",
    marks: "5 marks",
    prompt: "Explain indexed addressing and why it is useful for arrays.",
    answer: "Indexed addressing calculates the effective address by adding a base address to an index register or offset. The base address can point to the start of an array. Changing the index value allows the CPU to access different array elements without changing the instruction itself. For example, base 100 and index 3 gives effective address 103.",
    marking: [
      { mark: "B1", text: "effective address calculated using base address plus index/offset" },
      { mark: "B1", text: "index value may be stored in index register" },
      { mark: "B1", text: "base can represent start of array/block" },
      { mark: "B1", text: "changing index accesses different elements" },
      { mark: "B1", text: "valid example calculation such as 100 + 3 = 103" },
    ],
    strict: [
      "Do not accept indexed addressing as simply sorting data into an index.",
      "Do not require arrays if another repeated data structure example is valid.",
      "Allow offset instead of index register if calculation is clear.",
      "FT: award usefulness mark if tied to repeated access even with weak example.",
    ],
  },
  {
    title: "Question 4",
    marks: "6 marks",
    prompt: "A CPU has memory[40] = 88 and memory[88] = 123. Explain the values loaded by LOAD #40, LOAD 40 and LOAD (40).",
    answer: "LOAD #40 uses immediate addressing, so the value loaded is 40. LOAD 40 uses direct addressing, so the CPU reads memory address 40 and loads 88. LOAD (40) uses indirect addressing, so the CPU reads memory[40] to get effective address 88, then reads memory[88] and loads 123.",
    marking: [
      { mark: "B1", text: "LOAD #40 identified as immediate" },
      { mark: "B1", text: "immediate value loaded is 40" },
      { mark: "B1", text: "LOAD 40 identified/described as direct" },
      { mark: "B1", text: "direct value loaded is memory[40] = 88" },
      { mark: "B1", text: "LOAD (40) identified/described as indirect with effective address 88" },
      { mark: "B1", text: "indirect value loaded is memory[88] = 123" },
    ],
    strict: [
      "Do not award immediate value mark if candidate looks up memory[40].",
      "Do not award indirect final value mark if candidate stops at 88.",
      "Allow equivalent notation for brackets/indirection.",
      "FT: award each instruction independently.",
    ],
  },
  {
    title: "Question 5",
    marks: "5 marks",
    prompt: "Explain why the same operand can lead to different loaded values in different addressing modes.",
    answer: "The addressing mode tells the CPU how to interpret the operand. In immediate addressing, the operand is the value itself. In direct addressing, the operand is a memory address. In indirect addressing, the operand is an address containing another address. Therefore the same numeric operand can be treated as a value, an address, or a pointer, leading to different values being loaded.",
    marking: [
      { mark: "B1", text: "addressing mode controls operand interpretation" },
      { mark: "B1", text: "immediate treats operand as value" },
      { mark: "B1", text: "direct treats operand as address" },
      { mark: "B1", text: "indirect treats operand as pointer/address of address" },
      { mark: "B1", text: "therefore same operand can produce different loaded values" },
    ],
    strict: [
      "Do not accept 'because the CPU chooses randomly' or vague wording.",
      "Do not require indexed addressing for full credit.",
      "Allow 'effective address' wording for direct/indirect distinction.",
      "FT: award conclusion mark if at least two modes are correctly contrasted.",
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
    no: "Correct. #20 is immediate data; 20 without # is treated as an address in this simplified notation.",
    yes: "Not quite. LOAD 20 uses 20 as an address in direct addressing.",
    binary: "No. Binary notation does not decide the addressing mode by itself.",
    register: "No. ACC contents do not decide whether #20 is immediate or direct.",
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
  const select = document.querySelector("#modeInput");
  const result = document.querySelector("#simulateResult");
  const method = document.querySelector("#simulateMethod");
  const trap = document.querySelector("#simulateTrap");
  function simulate() {
    const item = modeMap[select.value];
    result.textContent = item.result;
    method.innerHTML = `<strong>Trace:</strong> ${item.method}`;
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
  renderExample("compare");
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
setupSimulator();
setupExamples();
renderPractice();
renderMistakes();
renderExamQuestions();
