const componentMap = {
  alu: {
    role: "Arithmetic Logic Unit: performs arithmetic calculations and logical operations.",
    sentence: "The ALU performs operations such as addition, subtraction, comparison and Boolean logic on data being processed.",
    trap: "Do not say the ALU controls the whole CPU. Control is the job of the CU.",
  },
  cu: {
    role: "Control Unit: coordinates CPU operations and sends control signals.",
    sentence: "The CU decodes instructions and coordinates the sequence of operations needed to execute them.",
    trap: "Do not say the CU performs arithmetic calculations. It controls; it does not calculate.",
  },
  register: {
    role: "Register: a small, fast storage location inside the CPU.",
    sentence: "Registers temporarily hold data, instructions, addresses or intermediate results during processing.",
    trap: "Do not describe registers as large-capacity main memory or secondary storage.",
  },
  dataBus: {
    role: "Data bus: carries data and instructions between CPU, memory and other components.",
    sentence: "The data bus transfers the value being read from or written to memory.",
    trap: "Do not confuse the data bus with the address bus; the address bus identifies location.",
  },
  addressBus: {
    role: "Address bus: carries the address of a memory location or I/O location.",
    sentence: "The address bus carries the location that the CPU wants to read from or write to.",
    trap: "Do not say the address bus carries the data value itself.",
  },
  controlBus: {
    role: "Control bus: carries control and timing signals.",
    sentence: "The control bus carries signals such as read, write and interrupt between the CPU and other components.",
    trap: "Do not use 'control bus' as a vague name for every bus.",
  },
  clock: {
    role: "Clock: produces regular pulses to synchronise CPU operations.",
    sentence: "Clock speed describes how many cycles occur per second, but it is not the only factor affecting performance.",
    trap: "Do not claim that a higher clock speed always guarantees a faster computer in every task.",
  },
};

const examples = {
  identify: {
    title: "Example 1: identify the component",
    problem: "A question says: 'This part performs a comparison to decide whether a value is greater than 100.' Name the CPU component.",
    steps: [
      "The keyword is comparison. Comparisons are logical operations.",
      "Logical and arithmetic operations are performed by the ALU.",
      "Answer: ALU. A full sentence would be: the ALU performs the comparison operation on the data.",
    ],
  },
  add: {
    title: "Example 2: a broad ADD instruction explanation",
    problem: "Explain which CPU parts are involved when adding two values.",
    steps: [
      "Registers hold the two values and may hold the intermediate or final result.",
      "The CU coordinates the operation and sends control signals so the correct operation is performed.",
      "The ALU performs the addition.",
      "Buses transfer values, addresses and control signals between CPU and memory when values need to be fetched or stored.",
      "The clock synchronises these steps so they occur in an organised sequence.",
    ],
  },
  clock: {
    title: "Example 3: clock speed is not the whole story",
    problem: "A 4.0 GHz CPU is always faster than a 3.2 GHz CPU. Explain why this statement is too simple.",
    steps: [
      "Clock speed measures cycles per second, so a higher value can allow more CPU cycles per second.",
      "However, different processors may do different amounts of useful work per cycle.",
      "Performance also depends on cache, number of cores, instruction type, memory access and system architecture.",
      "So clock speed is a factor, but not the only factor.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Which CPU component performs arithmetic operations?", accepted: ["alu", "arithmetic logic unit"], answer: "ALU / Arithmetic Logic Unit" },
  { id: "p2", prompt: "Which CPU component coordinates operations and sends control signals?", accepted: ["cu", "control unit"], answer: "CU / Control Unit" },
  { id: "p3", prompt: "What is a small, fast storage location inside the CPU called?", accepted: ["register", "registers"], answer: "Register" },
  { id: "p4", prompt: "Which bus carries data and instructions?", accepted: ["data bus"], answer: "Data bus" },
  { id: "p5", prompt: "Which bus carries memory addresses?", accepted: ["address bus"], answer: "Address bus" },
  { id: "p6", prompt: "Which bus carries read/write/control signals?", accepted: ["control bus"], answer: "Control bus" },
  { id: "p7", prompt: "What produces regular pulses to synchronise CPU operations?", accepted: ["clock", "system clock"], answer: "Clock / system clock" },
  { id: "p8", prompt: "Is clock speed the only factor affecting CPU performance? Answer yes or no.", accepted: ["no"], answer: "No" },
  { id: "p9", prompt: "Which component performs logical operations such as comparisons?", accepted: ["alu", "arithmetic logic unit"], answer: "ALU" },
  { id: "p10", prompt: "Are registers inside the CPU or in secondary storage?", accepted: ["inside the cpu", "cpu", "inside cpu"], answer: "Inside the CPU" },
];

const mistakes = [
  {
    wrong: "The ALU controls the CPU and sends signals to memory.",
    fix: "The CU controls CPU operations and sends control signals. The ALU performs arithmetic and logical operations.",
  },
  {
    wrong: "The address bus carries the data that the CPU wants to process.",
    fix: "The address bus carries the address/location. The data bus carries the data or instruction value.",
  },
  {
    wrong: "Registers are large storage devices used to keep files permanently.",
    fix: "Registers are small, very fast storage locations inside the CPU used temporarily during processing.",
  },
  {
    wrong: "A higher clock speed always means the whole computer is faster.",
    fix: "Higher clock speed may allow more cycles per second, but performance also depends on architecture, cache, cores and memory access.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "4 marks",
    prompt: "Describe the roles of the ALU and the control unit in a CPU.",
    answer: "The ALU performs arithmetic calculations and logical operations. The control unit decodes instructions, coordinates CPU operations and sends control signals to other components.",
    marking: [
      { mark: "B1", text: "ALU performs arithmetic calculations" },
      { mark: "B1", text: "ALU performs logical operations/comparisons/Boolean operations" },
      { mark: "B1", text: "CU decodes instructions or controls the sequence of operations" },
      { mark: "B1", text: "CU sends control signals/coordinates other CPU components" },
    ],
    strict: [
      "Do not award ALU marks for vague 'does processing' without arithmetic or logic.",
      "Do not award CU control marks if the answer says the CU performs calculations.",
      "Allow named examples of logical operations such as AND, OR, NOT, comparison.",
    ],
  },
  {
    title: "Question 2",
    marks: "4 marks",
    prompt: "Explain why registers are used by the CPU during processing.",
    answer: "Registers are small, fast storage locations inside the CPU. They temporarily hold data, instructions, addresses or intermediate results that are currently being used. Accessing registers is faster than repeatedly accessing main memory, so processing can be carried out more efficiently.",
    marking: [
      { mark: "B1", text: "registers are small/fast storage locations" },
      { mark: "B1", text: "registers are inside the CPU" },
      { mark: "B1", text: "temporarily hold data/instructions/addresses/intermediate results" },
      { mark: "B1", text: "faster access than main memory or supports current processing" },
    ],
    strict: [
      "Do not accept permanent file storage as a register role.",
      "Do not require a named register for this question.",
      "Allow RAM comparison if it is clear that registers are faster and inside the CPU.",
    ],
  },
  {
    title: "Question 3",
    marks: "6 marks",
    prompt: "Describe the roles of the data bus, address bus and control bus.",
    answer: "The data bus carries data and instructions between the CPU, memory and other components. The address bus carries the address of the memory or I/O location being accessed. The control bus carries control and timing signals, such as read and write signals, so components know what operation should take place.",
    marking: [
      { mark: "B1", text: "data bus carries data/instructions" },
      { mark: "B1", text: "data bus transfer is between CPU, memory or other components" },
      { mark: "B1", text: "address bus carries memory/I/O address" },
      { mark: "B1", text: "address identifies location to read from or write to" },
      { mark: "B1", text: "control bus carries control/timing signals" },
      { mark: "B1", text: "valid example such as read, write, interrupt, clock/timing signal" },
    ],
    strict: [
      "Do not accept 'bus carries information' for all three without distinguishing roles.",
      "Do not accept address bus carries the data value.",
      "Allow 'instructions' on data bus because instructions are transferred as data values.",
      "Award each bus independently; an error in one bus does not prevent marks for the others.",
    ],
  },
  {
    title: "Question 4",
    marks: "5 marks",
    prompt: "A student says, 'The computer with the highest clock speed will always run programs fastest.' Explain why this statement is inaccurate.",
    answer: "Clock speed is the number of clock cycles per second, so it can affect how many operations can be started or coordinated per second. However, processors may complete different amounts of work per cycle. Performance also depends on factors such as cache, number of cores, CPU architecture, instruction type and speed of memory access. Therefore clock speed alone does not guarantee the fastest program execution.",
    marking: [
      { mark: "B1", text: "clock speed is cycles per second/frequency of clock pulses" },
      { mark: "B1", text: "higher clock speed can affect number of cycles per second" },
      { mark: "B1", text: "processors may perform different work per cycle or have different architecture" },
      { mark: "B1", text: "another valid factor named such as cache, cores, memory access, instruction type" },
      { mark: "B1", text: "clear conclusion that clock speed alone does not guarantee fastest performance" },
    ],
    strict: [
      "Do not accept only 'it depends' without naming a factor.",
      "Do not require students to discuss overclocking or heat.",
      "Allow GHz as a measure if cycles per second is implied.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "A CPU is executing an instruction that adds a value from memory to a value already in the CPU. Explain the roles of CPU components and buses in this process.",
    answer: "A register holds the value already in the CPU and may hold the result. The address bus carries the memory address of the value that needs to be fetched. The data bus carries the value from memory to the CPU. The control bus carries signals such as read. The CU coordinates the operation and sends control signals. The ALU performs the addition.",
    marking: [
      { mark: "B1", text: "register holds existing value/intermediate value/result" },
      { mark: "B1", text: "address bus carries address of memory location" },
      { mark: "B1", text: "data bus carries value/data from memory to CPU" },
      { mark: "B1", text: "control bus carries read/control signal" },
      { mark: "B1", text: "CU coordinates/controls/decodes or sends signals" },
      { mark: "B1", text: "ALU performs the addition" },
    ],
    strict: [
      "Do not award ALU mark if answer only says CPU adds without naming ALU.",
      "Do not award address bus mark for carrying the actual value.",
      "Allow registers in plural without naming ACC/MDR if temporary holding is clear.",
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
    alu: "Correct. The ALU performs arithmetic such as addition.",
    cu: "Close but not the maths part. The CU coordinates and sends control signals; the ALU performs the addition.",
    register: "Registers may hold the values, but they do not perform the calculation.",
    bus: "Buses transfer values or signals, but they do not perform the addition.",
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
  const select = document.querySelector("#componentInput");
  const result = document.querySelector("#mapResult");
  const sentence = document.querySelector("#mapSentence");
  const trap = document.querySelector("#mapTrap");
  function mapComponent() {
    const item = componentMap[select.value];
    result.textContent = item.role;
    sentence.innerHTML = `<strong>Exam-safe sentence:</strong> ${item.sentence}`;
    trap.innerHTML = `<strong>Common trap:</strong> ${item.trap}`;
  }
  select.addEventListener("change", mapComponent);
  document.querySelector("#mapBtn").addEventListener("click", mapComponent);
  mapComponent();
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
  renderExample("identify");
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
