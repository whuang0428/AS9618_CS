const scenarios = {
  barcode: {
    result: "Input device: barcode reader",
    method: "A barcode reader captures book IDs quickly and accurately, reducing typing errors at the library desk.",
  },
  weather: {
    result: "Input device: sensor",
    method: "A temperature sensor automatically captures data from the environment without a person typing readings.",
  },
  attendance: {
    result: "Secondary storage",
    method: "Attendance records must remain after power is off, so they need non-volatile secondary storage such as an SSD or database storage.",
  },
  exam: {
    result: "Output device: printer",
    method: "A printer produces a physical copy of candidate timetables that can be handed out or filed.",
  },
  driver: {
    result: "Output device: screen",
    method: "A screen gives visual feedback such as maps and turn-by-turn directions while the driver is working.",
  },
  editing: {
    result: "Primary memory: RAM",
    method: "The image data is in current use while editing, so RAM temporarily holds it for fast access by the processor.",
  },
};

const examples = {
  attendance: {
    title: "Example 1: school attendance system",
    problem: "Choose suitable hardware for recording students entering a school gate.",
    steps: [
      "Input: an ID card reader or barcode/QR scanner can capture student IDs quickly and accurately.",
      "Processing: the processor checks the ID against stored records and updates attendance.",
      "Storage: non-volatile storage is needed because attendance records must persist after power is off.",
      "Output: a screen or speaker gives immediate feedback such as accepted or not recognised.",
    ],
  },
  weather: {
    title: "Example 2: automatic weather station",
    problem: "A weather station records temperature every minute without a human operator.",
    steps: [
      "Input: a temperature sensor captures readings from the environment automatically.",
      "Processing: the processor compares readings with rules or prepares data for storage/transmission.",
      "Storage: readings are saved so trends can be analysed later.",
      "Output: a display or network message can show current conditions or warnings.",
    ],
  },
  library: {
    title: "Example 3: library checkout desk",
    problem: "A librarian needs to issue books quickly during a busy lunch break.",
    steps: [
      "Input: barcode reader is suitable because it is faster and less error-prone than typing book IDs.",
      "Memory: current transaction data may be held temporarily while the checkout is processed.",
      "Storage: the database is updated so the loan record persists.",
      "Output: a screen or receipt confirms the loan to the librarian and borrower.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Which category captures data entering a system?", accepted: ["input", "input device"], answer: "Input" },
  { id: "p2", prompt: "Which category presents results from a system?", accepted: ["output", "output device"], answer: "Output" },
  { id: "p3", prompt: "Which component executes instructions?", accepted: ["processor", "cpu", "central processing unit"], answer: "Processor / CPU" },
  { id: "p4", prompt: "Which primary memory is volatile and used for current tasks?", accepted: ["ram"], answer: "RAM" },
  { id: "p5", prompt: "Which type of storage keeps files after power is off?", accepted: ["secondary storage", "storage", "non volatile storage", "non-volatile storage"], answer: "Secondary storage" },
  { id: "p6", prompt: "A camera in a ticket scanner is input or output?", accepted: ["input"], answer: "Input" },
  { id: "p7", prompt: "A monitor showing results is input or output?", accepted: ["output"], answer: "Output" },
  { id: "p8", prompt: "Does the CPU normally store user files long term? Answer yes or no.", accepted: ["no"], answer: "No" },
  { id: "p9", prompt: "Name one characteristic used to justify hardware suitability.", accepted: ["speed", "capacity", "durability", "cost", "accuracy", "portability", "reliability"], answer: "Speed / capacity / durability / cost / accuracy / portability / reliability" },
  { id: "p10", prompt: "Which memory stores startup instructions and is non-volatile?", accepted: ["rom"], answer: "ROM" },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "4 marks",
    prompt: "Describe the role of input, processor and output in a computer system.",
    answer: "Input devices capture data and enter it into the system. The processor executes instructions and processes the data. Output devices present the results to a user or cause an action in the physical world.",
    marking: [
      { mark: "B1", text: "input devices capture/enter data into the system" },
      { mark: "B1", text: "processor executes instructions/processes data" },
      { mark: "B1", text: "output devices present results/give feedback" },
      { mark: "B1", text: "clear relationship or example showing data moves through the system" },
    ],
    strict: [
      "Do not award full credit for only listing device names.",
      "Do not say the processor stores all files.",
      "Allow actuator as output if described as causing a physical action.",
    ],
  },
  {
    title: "Question 2",
    marks: "5 marks",
    prompt: "A school attendance system scans student ID cards and records entry. Recommend one input device, one storage choice and one output device, justifying each.",
    answer: "An ID card reader or barcode/QR scanner is suitable as an input device because it captures student IDs quickly and accurately. Non-volatile secondary storage such as an SSD/database is suitable because attendance records must be kept after power is off. A screen or speaker is suitable as output because it gives immediate feedback such as accepted or not recognised.",
    marking: [
      { mark: "B1", text: "suitable input device such as card reader/barcode/QR scanner" },
      { mark: "B1", text: "input justification linked to quick/accurate capture of student ID" },
      { mark: "B1", text: "suitable secondary/non-volatile storage choice" },
      { mark: "B1", text: "storage justification linked to persistent attendance records" },
      { mark: "B1", text: "suitable output device with feedback justification" },
    ],
    strict: [
      "Do not award justification marks for vague 'it is better'.",
      "Do not award storage justification if it says RAM is used for long-term records.",
      "Allow database as storage context if persistence is clear.",
    ],
  },
  {
    title: "Question 3",
    marks: "4 marks",
    prompt: "Distinguish between primary memory and secondary storage.",
    answer: "Primary memory holds data and instructions currently in use by the processor. RAM is volatile, so contents are lost when power is off. Secondary storage stores files and data long term and is non-volatile, so data remains after power is off.",
    marking: [
      { mark: "B1", text: "primary memory holds data/instructions currently in use" },
      { mark: "B1", text: "RAM/primary memory can be volatile/lost without power" },
      { mark: "B1", text: "secondary storage holds files/data long term" },
      { mark: "B1", text: "secondary storage is non-volatile/persistent" },
    ],
    strict: [
      "Do not accept only 'both store data'.",
      "Do not require detailed cache/virtual memory discussion in this overview lesson.",
      "Allow examples such as RAM and SSD if roles are clear.",
    ],
  },
  {
    title: "Question 4",
    marks: "4 marks",
    prompt: "A librarian could type book IDs manually or use a barcode reader. Explain why a barcode reader may be more suitable.",
    answer: "A barcode reader is an input device that can capture book IDs automatically. It is faster than typing many IDs manually and reduces human typing errors. This is suitable for a busy library desk where books must be issued quickly and accurately.",
    marking: [
      { mark: "B1", text: "identifies barcode reader as input device" },
      { mark: "B1", text: "captures book ID/barcode automatically" },
      { mark: "B1", text: "advantage such as faster or fewer errors" },
      { mark: "B1", text: "links advantage to library/busy checkout scenario" },
    ],
    strict: [
      "Do not accept only 'barcode reader is easier' without reason.",
      "Do not award output-device credit for barcode reader.",
      "Allow QR scanner if scenario is adapted to QR codes.",
    ],
  },
  {
    title: "Question 5",
    marks: "5 marks",
    prompt: "Trace how data flows through a simple weather station that records temperature and shows a warning if it is too hot.",
    answer: "A temperature sensor captures the temperature as input. The processor compares the reading with a stored threshold or rule. The current reading and rule may be held in memory while being processed. The reading may be saved in secondary storage for later analysis. If the reading is too high, an output device such as a display, speaker or actuator presents a warning or triggers an action.",
    marking: [
      { mark: "B1", text: "sensor captures temperature as input" },
      { mark: "B1", text: "processor compares/processes reading with threshold/rule" },
      { mark: "B1", text: "memory used for current reading/rule/instructions" },
      { mark: "B1", text: "secondary storage saves readings for later/persistent use" },
      { mark: "B1", text: "output device gives warning or actuator action" },
    ],
    strict: [
      "Do not require detailed control-loop terminology here.",
      "Do not award storage mark for RAM if answer says long-term records are only in RAM.",
      "Allow display, buzzer, speaker or actuator as output if role is clear.",
    ],
  },
];

function normalise(value) {
  return value.trim().toLowerCase().replace(/[-\s]+/g, " ");
}

function setupPrint() {
  document.querySelector("#printBtn").addEventListener("click", () => window.print());
}

function setupHook() {
  const feedback = document.querySelector("#hookFeedback");
  const responses = {
    camera: "Input: the camera captures data from the QR code so the system can process it.",
    processor: "Processor: it executes instructions to check the ticket data against a rule or record.",
    storage: "Storage: the attendance record must persist after the scan, so non-volatile storage is needed.",
    screen: "Output: the screen presents feedback to the user.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = responses[button.dataset.hook];
    });
  });
}

function setupChoiceTool() {
  const select = document.querySelector("#scenarioInput");
  const result = document.querySelector("#componentResult");
  const method = document.querySelector("#componentMethod");
  function choose() {
    const item = scenarios[select.value];
    result.textContent = item.result;
    method.textContent = item.method;
  }
  select.addEventListener("change", choose);
  document.querySelector("#chooseBtn").addEventListener("click", choose);
  choose();
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
  renderExample("attendance");
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

  setupAnswerToggles(list);
}

function setupPractice() {
  document.querySelector("#checkPractice").addEventListener("click", () => {
    let correct = 0;
    practice.forEach((item) => {
      const container = document.querySelector(`#${item.id}`);
      const input = container.querySelector("input");
      const mark = container.querySelector(".mark");
      const response = normalise(input.value);
      const isCorrect = item.accepted.some((answer) => {
        const expected = normalise(answer);
        return response === expected || response.includes(expected);
      });
      mark.textContent = isCorrect ? "Correct" : "Try again";
      mark.className = `mark ${isCorrect ? "correct" : "incorrect"}`;
      if (isCorrect) correct += 1;
    });
    document.querySelector("#practiceFeedback").textContent = `${correct}/${practice.length} correct. For each wrong answer, ask whether the component captures, processes, stores or presents data.`;
  });
}

function renderExamQuestions() {
  const list = document.querySelector("#examList");
  list.innerHTML = examQuestions.map((question, index) => {
    const msId = `ms-${index}`;
    return `
      <article class="exam-card">
        <div class="exam-head">
          <h3>${question.title}</h3>
          <span>${question.marks}</span>
        </div>
        <p>${question.prompt}</p>
        <button type="button" class="ms-toggle" data-ms="${msId}">Show MS</button>
        <div class="ms-panel" id="${msId}">
          <h4>CIE-style mark scheme</h4>
          <p><strong>Answer:</strong> ${question.answer}</p>
          <ul>${question.marking.map((point) => `<li><strong>${point.mark}</strong> ${point.text}</li>`).join("")}</ul>
          <h4>Strict notes</h4>
          <ul>${question.strict.map((note) => `<li>${note}</li>`).join("")}</ul>
        </div>
      </article>
    `;
  }).join("");

  document.querySelectorAll(".ms-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(`#${button.dataset.ms}`);
      target.classList.toggle("visible");
      button.textContent = target.classList.contains("visible") ? "Hide MS" : "Show MS";
    });
  });
}

function init() {
  setupPrint();
  setupHook();
  setupChoiceTool();
  setupExamples();
  setupAnswerToggles();
  renderPractice();
  setupPractice();
  renderExamQuestions();
}

init();
