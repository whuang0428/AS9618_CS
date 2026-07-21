const busMap = {
  address500: {
    result: "Address bus",
    method: "500 identifies a memory location, so it is carried on the address bus.",
    trap: "Do not treat an address as the data stored at that address.",
  },
  instruction: {
    result: "Data bus",
    method: "An instruction transferred from memory to CPU is the value being transferred, so it travels on the data bus.",
    trap: "Instructions can travel on the data bus because they are transferred as bit patterns.",
  },
  read: {
    result: "Control bus",
    method: "A read signal tells memory what operation to perform, so it is a control signal.",
    trap: "Do not put read/write signals on the address bus.",
  },
  write: {
    result: "Control bus",
    method: "A write signal controls the operation that stores data into memory.",
    trap: "The data being written is on the data bus; the write command is on the control bus.",
  },
  interrupt: {
    result: "Control bus",
    method: "Interrupts are control signals used to get the processor's attention.",
    trap: "An interrupt is not the same as the data produced by a device.",
  },
  width16: {
    result: "2^16 = 65,536 addresses",
    method: "With 16 address lines, there are 2^16 possible binary address combinations.",
    trap: "Do not confuse address bus width with data bus width.",
  },
};

const examples = {
  read: {
    title: "Example 1: memory read",
    problem: "The CPU reads the value stored at address 120.",
    steps: [
      "Address bus: carries address 120 from the CPU to memory.",
      "Control bus: carries a read signal.",
      "Data bus: carries the value stored at address 120 from memory back to the CPU.",
      "Exam sentence: the address identifies where; the data bus carries what is returned.",
    ],
  },
  write: {
    title: "Example 2: memory write",
    problem: "The CPU writes value 37 to address 900.",
    steps: [
      "Address bus: carries address 900 to select the memory location.",
      "Data bus: carries value 37 to memory.",
      "Control bus: carries a write signal.",
      "Memory stores value 37 at the selected address.",
    ],
  },
  width: {
    title: "Example 3: address bus width",
    problem: "How many memory locations can a 12-bit address bus address?",
    steps: [
      "An n-bit address bus can represent 2^n addresses.",
      "Here n = 12.",
      "2^12 = 4096.",
      "A 12-bit address bus can address 4096 different memory locations.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Which bus carries a memory address?", accepted: ["address bus"], answer: "Address bus" },
  { id: "p2", prompt: "Which bus carries data or instructions?", accepted: ["data bus"], answer: "Data bus" },
  { id: "p3", prompt: "Which bus carries read/write signals?", accepted: ["control bus"], answer: "Control bus" },
  { id: "p4", prompt: "During a memory read, which bus carries the requested value back to the CPU?", accepted: ["data bus"], answer: "Data bus" },
  { id: "p5", prompt: "During a memory write, which bus carries the target memory location?", accepted: ["address bus"], answer: "Address bus" },
  { id: "p6", prompt: "During a memory write, which bus carries the value to be stored?", accepted: ["data bus"], answer: "Data bus" },
  { id: "p7", prompt: "Which bus carries an interrupt signal?", accepted: ["control bus"], answer: "Control bus" },
  { id: "p8", prompt: "A 10-bit address bus can address how many locations?", accepted: ["1024", "1,024"], answer: "1024" },
  { id: "p9", prompt: "A 16-bit address bus can address how many locations?", accepted: ["65536", "65,536"], answer: "65,536" },
  { id: "p10", prompt: "Is the data bus usually bidirectional? Answer yes or no.", accepted: ["yes"], answer: "Yes" },
];

const mistakes = [
  {
    wrong: "The address bus carries the data stored in memory.",
    fix: "The address bus carries the location/address. The data bus carries the data or instruction value.",
  },
  {
    wrong: "The data bus carries read and write commands.",
    fix: "The control bus carries read and write signals. The data bus carries transferred data or instructions.",
  },
  {
    wrong: "A wider data bus means the CPU can address more memory locations.",
    fix: "A wider address bus increases the number of addressable locations. A wider data bus transfers more bits at once.",
  },
  {
    wrong: "During a memory read, only the data bus is used.",
    fix: "A memory read uses the address bus for the location, the control bus for the read signal and the data bus for the returned value.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "6 marks",
    prompt: "Describe the roles of the address bus, data bus and control bus.",
    answer: "The address bus carries the address of the memory or I/O location to be accessed. The data bus carries data or instructions being transferred between the CPU, memory and other components. The control bus carries control and timing signals, such as read, write or interrupt signals, so that the transfer is coordinated.",
    marking: [
      { mark: "B1", text: "address bus carries address/location" },
      { mark: "B1", text: "address is for memory or I/O location being accessed" },
      { mark: "B1", text: "data bus carries data/instructions" },
      { mark: "B1", text: "data bus transfer is between CPU, memory or components/devices" },
      { mark: "B1", text: "control bus carries control/timing signals" },
      { mark: "B1", text: "valid signal example such as read, write, interrupt or clock/timing" },
    ],
    strict: [
      "Do not accept 'bus carries information' for all three without distinguishing roles.",
      "Do not accept address bus carries data value.",
      "Allow instructions on data bus because instructions are transferred as bit patterns.",
      "Award each bus independently.",
    ],
  },
  {
    title: "Question 2",
    marks: "5 marks",
    prompt: "Trace how the system buses are used when the CPU reads data from memory.",
    answer: "The CPU places the required memory address on the address bus. A read signal is sent on the control bus. Memory uses the address to locate the data. The data is placed on the data bus and transferred from memory to the CPU, often into the MDR.",
    marking: [
      { mark: "B1", text: "CPU places required address on address bus" },
      { mark: "B1", text: "read signal sent on control bus" },
      { mark: "B1", text: "memory uses address to locate data/instruction" },
      { mark: "B1", text: "data/instruction placed on data bus" },
      { mark: "B1", text: "data transferred from memory to CPU/MDR" },
    ],
    strict: [
      "Do not award read-signal mark if answer puts read command on data bus.",
      "Do not require MDR unless the question asks for registers.",
      "Allow instruction read as a valid memory read.",
    ],
  },
  {
    title: "Question 3",
    marks: "5 marks",
    prompt: "Trace how the system buses are used when the CPU writes data to memory.",
    answer: "The CPU places the target memory address on the address bus. It places the data to be stored on the data bus. A write signal is sent on the control bus. Memory uses the address to select the location and stores the data at that location.",
    marking: [
      { mark: "B1", text: "target address placed on address bus" },
      { mark: "B1", text: "data/value to be stored placed on data bus" },
      { mark: "B1", text: "write signal sent on control bus" },
      { mark: "B1", text: "memory uses address to select location" },
      { mark: "B1", text: "data stored/written at selected location" },
    ],
    strict: [
      "Do not accept data bus for the address.",
      "Do not accept address bus for the value being stored.",
      "Allow any sensible ordering of address/data/control if roles are clear.",
    ],
  },
  {
    title: "Question 4",
    marks: "2 marks",
    prompt: "A processor has a 16-bit address bus. Calculate the maximum number of different memory addresses it can represent.",
    answer: "An n-bit address bus can represent 2^n addresses. For n = 16, 2^16 = 65,536. Therefore it can represent 65,536 different memory addresses.",
    marking: [
      { mark: "M1", text: "uses 2^16 for the number of address patterns" },
      { mark: "A1", text: "65,536 different addresses/locations" },
    ],
    strict: [
      "Do not award full marks for 16 x 2 or 16^2.",
      "Do not require conversion to KiB unless memory location size is specified.",
      "Allow 65536 without comma.",
    ],
  },
  {
    title: "Question 5",
    marks: "5 marks",
    prompt: "A candidate writes: 'The address bus carries instructions, the data bus carries addresses, and the control bus stores data.' Explain why this is incorrect and give the correct roles.",
    answer: "The statement is incorrect because the bus roles are confused. The address bus carries the address of the memory or I/O location being accessed. The data bus carries the data or instructions being transferred. The control bus carries control signals such as read or write; it does not store data. Buses transfer signals rather than permanently storing values.",
    marking: [
      { mark: "B1", text: "address bus carries address/location" },
      { mark: "B1", text: "data bus carries data/instructions being transferred" },
      { mark: "B1", text: "control bus carries control signals" },
      { mark: "B1", text: "valid control signal example such as read/write" },
      { mark: "B1", text: "buses transfer signals/do not store data permanently" },
    ],
    strict: [
      "Do not accept 'control bus controls the computer' without signal wording.",
      "Do not reject instructions on data bus if the answer explains they are transferred as data.",
      "Allow 'commands' for control signals only if read/write/control meaning is clear.",
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
    address: "Correct. 500 is the memory location, so it travels on the address bus.",
    data: "Not this time. The data bus carries the value stored at address 500, not the address 500 itself.",
    control: "The control bus can carry the read signal, but not the address 500.",
    register: "MDR may hold transferred data, but the question asks which bus carries the address.",
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
  const select = document.querySelector("#busInput");
  const result = document.querySelector("#mapResult");
  const method = document.querySelector("#mapMethod");
  const trap = document.querySelector("#mapTrap");
  function mapBus() {
    const item = busMap[select.value];
    result.textContent = item.result;
    method.innerHTML = `<strong>Reason:</strong> ${item.method}`;
    trap.innerHTML = `<strong>Common trap:</strong> ${item.trap}`;
  }
  select.addEventListener("change", mapBus);
  document.querySelector("#mapBtn").addEventListener("click", mapBus);
  mapBus();
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
  renderExample("read");
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
