const sortQuestions = {
  q1: {
    topic: "Storage fundamentals",
    method: "Compare using matched criteria: volatility, purpose, read/write behaviour and persistence.",
    trap: "Do not say only 'RAM is temporary and ROM is permanent' if the question asks for a comparison. Add purpose and use.",
  },
  q2: {
    topic: "Sensors, actuators and control systems",
    method: "Describe the sequence: sensor reading -> processor compares with threshold -> output signal -> actuator -> feedback.",
    trap: "Do not say the sensor itself cools the greenhouse.",
  },
  q3: {
    topic: "Logic gates and Boolean expressions",
    method: "Calculate intermediate columns: A OR B = 1; NOT C = 1; Q = 1 AND 1 = 1.",
    trap: "Do not skip NOT C. Missing intermediate work loses method marks.",
  },
  q4: {
    topic: "Hardware selection for users",
    method: "Justify with feature -> need -> consequence, such as portable scanner -> scan at door -> update delivery proof.",
    trap: "Do not recommend a desktop computer just because it is powerful.",
  },
  q5: {
    topic: "Environmental and reliability considerations",
    method: "Explain UPS as temporary power that allows continued operation or safe shutdown during short power cuts.",
    trap: "Do not describe UPS as a data backup.",
  },
};

const examples = {
  compare: {
    title: "Example 1: compare",
    problem: "Compare SSD and HDD for a video editor.",
    steps: [
      "Criterion 1: speed. SSD has faster access times, so large media files load and preview with less delay.",
      "Criterion 2: cost/capacity. HDD may provide more capacity for lower cost per GB, so it can suit archive storage.",
      "Balanced conclusion: SSD is better as a working drive; HDD may still be suitable for backups or archives.",
    ],
  },
  justify: {
    title: "Example 2: justify",
    problem: "Justify hardware for a delivery driver.",
    steps: [
      "Choose a handheld scanner or smartphone because it is portable.",
      "Portability matters because the driver must scan parcels at the delivery location.",
      "Therefore the driver can collect proof of delivery immediately instead of returning to a depot computer.",
    ],
  },
  calculate: {
    title: "Example 3: calculate",
    problem: "Find Q for Q = (A OR B) AND NOT C when A=1, B=0, C=0.",
    steps: [
      "A OR B = 1 OR 0 = 1.",
      "NOT C = NOT 0 = 1.",
      "Q = 1 AND 1 = 1.",
      "The final output is 1, and the intermediate values show the method.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Which device detects physical quantities: sensor or actuator?", accepted: ["sensor"], answer: "Sensor" },
  { id: "p2", prompt: "Which device causes physical action: sensor or actuator?", accepted: ["actuator"], answer: "Actuator" },
  { id: "p3", prompt: "For Q = A AND NOT B, find Q when A=1 and B=0.", accepted: ["1", "true"], answer: "1" },
  { id: "p4", prompt: "Which storage type is volatile: RAM or ROM?", accepted: ["ram"], answer: "RAM" },
  { id: "p5", prompt: "Which gate outputs 1 when exactly one input is 1?", accepted: ["xor", "exclusive or"], answer: "XOR" },
  { id: "p6", prompt: "Name one reliability measure for power cuts.", accepted: ["ups", "battery backup", "surge protection"], answer: "UPS / battery backup" },
  { id: "p7", prompt: "Complete the chain: feature -> need -> ____.", accepted: ["consequence"], answer: "Consequence" },
  { id: "p8", prompt: "How many rows are needed for a truth table with 3 inputs?", accepted: ["8", "eight"], answer: "8" },
  { id: "p9", prompt: "Which system type uses feedback: open-loop or closed-loop?", accepted: ["closed loop", "closed-loop"], answer: "Closed-loop" },
  { id: "p10", prompt: "What should you identify before answering a mixed review question?", accepted: ["topic", "command word", "topic and command word"], answer: "Topic and command word" },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "6 marks",
    prompt: "Compare SSD and HDD storage for a video editor who works with large video files.",
    answer: "An SSD has faster access times than an HDD, so it is suitable as a working drive for loading and previewing large video files. An HDD may have a lower cost per GB and high capacity, so it can be suitable for archived footage or backups. SSDs are also more resistant to shock because they have no moving parts.",
    marking: [
      { mark: "B1", text: "SSD speed/access-time advantage identified" },
      { mark: "B1", text: "speed linked to loading/previewing/editing large video files" },
      { mark: "B1", text: "HDD capacity/cost-per-GB advantage identified" },
      { mark: "B1", text: "HDD linked to archive/backup/bulk storage" },
      { mark: "B1", text: "SSD shock resistance/no moving parts identified" },
      { mark: "B1", text: "comparison is balanced rather than one-sided" },
    ],
    strict: [
      "Do not accept 'SSD is better' without a criterion and scenario link.",
      "Allow external HDD as archive storage if role is clear.",
    ],
  },
  {
    title: "Question 2",
    marks: "5 marks",
    prompt: "Describe how a greenhouse cooling system can use a sensor and actuator.",
    answer: "A temperature sensor inputs the greenhouse temperature. The processor/controller compares the reading with a stored threshold. If the temperature is too high, an output signal activates a fan motor or opens a vent actuator. The system continues to take readings so the output can be changed or stopped when the temperature falls.",
    marking: [
      { mark: "B1", text: "temperature sensor inputs/captures temperature reading" },
      { mark: "B1", text: "processor/controller compares reading with threshold" },
      { mark: "B1", text: "decision made when temperature is too high" },
      { mark: "B1", text: "output signal activates actuator such as fan/vent motor" },
      { mark: "B1", text: "feedback/repeated readings used to adjust or stop output" },
    ],
    strict: [
      "Do not award actuator mark if the answer says the sensor cools the greenhouse.",
      "Do not require exact numeric threshold.",
    ],
  },
  {
    title: "Question 3",
    marks: "3 marks",
    prompt: "For Q = (A NAND B) OR C, find Q when A=1, B=1 and C=0. Show working.",
    answer: "A AND B = 1. A NAND B = 0 because NAND is the inverse of AND. Q = 0 OR 0 = 0.",
    marking: [
      { mark: "B1", text: "A AND B = 1" },
      { mark: "B1", text: "A NAND B = 0" },
      { mark: "B1", text: "final Q = 0" },
    ],
    strict: [
      "Do not accept NAND as the same as AND.",
      "Allow direct statement that NAND is 0 only when both inputs are 1.",
      "Allow FT from the candidate's earlier intermediate logic value only when the final operation is applied correctly.",
    ],
  },
  {
    title: "Question 4",
    marks: "6 marks",
    prompt: "A delivery company needs hardware for drivers who scan parcels and collect proof of delivery. Recommend suitable hardware and justify your choices.",
    answer: "A handheld scanner or smartphone is suitable because it is portable and can scan parcel barcodes at the delivery location. Mobile data allows delivery status to be uploaded without returning to the depot. GPS can record location for proof of delivery. Rugged casing and long battery life improve reliability during outdoor full-shift use.",
    marking: [
      { mark: "B1", text: "handheld scanner/smartphone/tablet named" },
      { mark: "B1", text: "portability linked to use at delivery location" },
      { mark: "B1", text: "barcode/signature/photo capture linked to proof of delivery" },
      { mark: "B1", text: "mobile data/wireless upload benefit explained" },
      { mark: "B1", text: "GPS/location benefit explained" },
      { mark: "B1", text: "rugged casing/battery/reliability feature linked to field use" },
    ],
    strict: [
      "Do not award marks for desktop hardware unless field use is still clearly supported.",
      "Do not accept vague 'easy to use' without a feature and consequence.",
    ],
  },
  {
    title: "Question 5",
    marks: "8 marks",
    prompt: "Monthly checkpoint mixed question: A remote weather station uses sensors and sends readings to a server. Explain suitable hardware and reliability measures.",
    answer: "Temperature, humidity and pressure sensors capture environmental readings automatically. A low-power microcontroller can process readings while using little energy. Wireless communication can send readings to the server without manual collection. A weatherproof enclosure protects hardware from rain, dust and moisture. Battery or solar power supports remote operation. The server should use backup and possibly UPS/RAID to reduce data loss or downtime.",
    marking: [
      { mark: "B1", text: "suitable environmental sensors named" },
      { mark: "B1", text: "sensor role linked to automatic environmental readings" },
      { mark: "B1", text: "low-power controller/processing hardware named" },
      { mark: "B1", text: "wireless communication linked to remote data transfer" },
      { mark: "B1", text: "weatherproof/sealed enclosure named" },
      { mark: "B1", text: "environmental protection linked to rain/dust/moisture risk" },
      { mark: "B1", text: "battery/solar/low-power measure linked to remote operation" },
      { mark: "B1", text: "server reliability measure such as backup/UPS/RAID linked to data loss or downtime" },
    ],
    strict: [
      "Do not award reliability marks for generic 'good hardware' without a risk or consequence.",
      "Do not require brand names or exact specifications.",
      "Allow any plausible wireless method if remote transfer is clear.",
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
    logic: "Logic gates / calculate. Use intermediate steps: NOT B, then AND.",
    sensor: "Control systems / describe. Use sensor -> processor -> actuator -> feedback.",
    storage: "Storage and hardware selection / compare. Use speed, durability, cost and scenario suitability.",
    reliability: "Reliability / explain. UPS gives temporary power; it is not a backup.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = responses[button.dataset.hook];
    });
  });
}

function setupSorter() {
  const select = document.querySelector("#questionInput");
  const result = document.querySelector("#sortResult");
  const method = document.querySelector("#sortMethod");
  const trap = document.querySelector("#sortTrap");
  function sort() {
    const item = sortQuestions[select.value];
    result.textContent = item.topic;
    method.innerHTML = `<strong>Method:</strong> ${item.method}`;
    trap.innerHTML = `<strong>Trap:</strong> ${item.trap}`;
  }
  select.addEventListener("change", sort);
  document.querySelector("#sortBtn").addEventListener("click", sort);
  sort();
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
      const isCorrect = item.accepted.some((answer) => response === normalise(answer) || response.includes(normalise(answer)));
      mark.textContent = isCorrect ? "Correct" : "Try again";
      mark.className = `mark ${isCorrect ? "correct" : "incorrect"}`;
      if (isCorrect) correct += 1;
    });
    document.querySelector("#practiceFeedback").textContent = `${correct}/${practice.length} correct. Now rewrite one wrong answer using exact Section 3 wording.`;
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
  setupSorter();
  setupExamples();
  setupAnswerToggles();
  renderPractice();
  setupPractice();
  renderExamQuestions();
}

init();
