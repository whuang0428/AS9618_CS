const scenarios = {
  budget: {
    result: "High-capacity HDD",
    method: "An HDD is suitable because it offers high capacity at a low cost per GB, which matters more than maximum access speed for a large video library.",
  },
  mobile: {
    result: "SSD",
    method: "An SSD is suitable because it has fast access and no moving parts, so programs load quickly and the laptop is more resistant to knocks.",
  },
  archive: {
    result: "Magnetic tape",
    method: "Tape is suitable for huge long-term backups because it has high capacity and low cost, while slow sequential access is acceptable if data is rarely accessed.",
  },
  transfer: {
    result: "USB flash drive",
    method: "A USB flash drive is portable and removable, making it suitable for moving smaller files between computers.",
  },
  distribution: {
    result: "Optical disc",
    method: "Optical discs can be cheap to duplicate for fixed read-only content, although they are slower and lower capacity than many modern alternatives.",
  },
  camera: {
    result: "Memory card",
    method: "A memory card is small, removable and solid-state, so it suits portable cameras and can be swapped between devices.",
  },
};

const examples = {
  laptop: {
    title: "Example 1: student laptop",
    problem: "Recommend storage for a laptop carried to school every day.",
    steps: [
      "Choice: SSD.",
      "Characteristics: fast read/write access and no moving parts.",
      "Context: the laptop is carried daily and used to open applications quickly.",
      "Consequence: startup and loading are faster, and the storage is less likely to be damaged by knocks than an HDD.",
    ],
  },
  backup: {
    title: "Example 2: long-term organisation backup",
    problem: "Recommend storage for very large backups that are rarely restored.",
    steps: [
      "Choice: magnetic tape.",
      "Characteristics: very high capacity and low cost per unit of storage.",
      "Context: backups are huge and not accessed frequently.",
      "Consequence: slow sequential access is acceptable because restore speed is less important than capacity and cost.",
    ],
  },
  video: {
    title: "Example 3: video editor with two storage needs",
    problem: "Choose storage for archive footage and current editing projects.",
    steps: [
      "Archive: HDD can be suitable because it provides high capacity at lower cost per GB.",
      "Active editing: SSD can be suitable because faster read/write access helps load and save large video files.",
      "Trade-off: the same device is not automatically best for both jobs.",
      "Exam habit: separate the two roles before comparing characteristics.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Which characteristic means how much data can be stored?", accepted: ["capacity"], answer: "Capacity" },
  { id: "p2", prompt: "Which characteristic affects how quickly files are read or written?", accepted: ["speed", "access speed", "read write speed", "read/write speed"], answer: "Speed / read-write speed" },
  { id: "p3", prompt: "Which characteristic means resistance to damage or wear?", accepted: ["durability", "reliability"], answer: "Durability" },
  { id: "p4", prompt: "Which characteristic means ease of carrying or moving between devices?", accepted: ["portability"], answer: "Portability" },
  { id: "p5", prompt: "Which storage is often low cost per GB for large video libraries?", accepted: ["hdd", "hard disk", "hard disk drive"], answer: "HDD" },
  { id: "p6", prompt: "Which storage is usually chosen for fast laptop startup?", accepted: ["ssd", "solid state drive", "solid-state drive"], answer: "SSD" },
  { id: "p7", prompt: "Which storage is suitable for huge rarely accessed backups?", accepted: ["magnetic tape", "tape"], answer: "Magnetic tape" },
  { id: "p8", prompt: "Name one risk or limitation of a USB flash drive.", accepted: ["lost", "easy to lose", "small", "limited capacity", "variable speed", "damage"], answer: "Easy to lose / variable speed / limited capacity" },
  { id: "p9", prompt: "In exam answers, is 'better' enough without a reason? Answer yes or no.", accepted: ["no"], answer: "No" },
  { id: "p10", prompt: "What phrase means price for each unit of storage?", accepted: ["cost per gb", "cost per gigabyte", "cost per unit", "cost per unit of storage"], answer: "Cost per GB / cost per unit of storage" },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "5 marks",
    prompt: "A laptop is carried between home and school every day. Recommend a suitable storage device and justify your answer using storage characteristics.",
    answer: "An SSD is suitable because it has fast read/write access, so the laptop can start and load applications quickly. It has no moving parts, so it is more durable than an HDD when the laptop is carried and may be knocked. It is also compact and uses relatively low power, which suits a portable device.",
    marking: [
      { mark: "B1", text: "suitable device named, e.g. SSD" },
      { mark: "B1", text: "speed/read-write/startup advantage" },
      { mark: "B1", text: "durability/no moving parts/shock resistance advantage" },
      { mark: "B1", text: "portability/power/compactness linked to laptop use" },
      { mark: "B1", text: "clear link to daily carrying/school scenario" },
    ],
    strict: [
      "Do not award full credit for only saying 'SSD is better'.",
      "Do not require every possible characteristic; credit valid scenario-linked characteristics.",
      "Allow HDD only if justified for capacity/cost and the portability weakness is acknowledged.",
    ],
  },
  {
    title: "Question 2",
    marks: "4 marks",
    prompt: "Explain why cost per GB is important when choosing storage for a large video archive.",
    answer: "A video archive may contain many large files, so high capacity is required. Cost per GB is important because a small difference in storage cost becomes significant when many terabytes are needed. A high-capacity HDD or tape may be more suitable than SSD if speed is less important than storing large amounts cheaply.",
    marking: [
      { mark: "B1", text: "video archive requires high capacity / many large files" },
      { mark: "B1", text: "cost per GB affects total cost for large amounts of storage" },
      { mark: "B1", text: "HDD/tape or similar lower cost high-capacity option identified" },
      { mark: "B1", text: "trade-off against speed/SSD cost explained" },
    ],
    strict: [
      "Do not accept 'cheap is good' without linking to large capacity.",
      "Do not award storage type mark for RAM/cache.",
      "Allow cost per TB wording as equivalent.",
    ],
  },
  {
    title: "Question 3",
    marks: "5 marks",
    prompt: "Compare HDD and SSD using speed, durability and cost.",
    answer: "An SSD usually has faster read/write access than an HDD, so it can load programs and files more quickly. An SSD has no moving parts, so it is more durable and resistant to shock. An HDD usually has a lower cost per GB and can provide high capacity more cheaply. Therefore SSD may suit portable or performance-focused devices, while HDD may suit large low-cost storage.",
    marking: [
      { mark: "B1", text: "SSD faster read/write/access than HDD" },
      { mark: "B1", text: "speed linked to loading/startup/file access consequence" },
      { mark: "B1", text: "SSD durability/no moving parts/shock resistance" },
      { mark: "B1", text: "HDD lower cost per GB/high capacity for cost" },
      { mark: "B1", text: "scenario-based conclusion or trade-off" },
    ],
    strict: [
      "Do not accept 'SSD is more reliable' unless durability cause is stated.",
      "Do not accept 'HDD is cheaper' without linking to capacity or cost per GB for full cost credit.",
      "Allow modern SSD/HDD qualifications if the general trade-off is clear.",
    ],
  },
  {
    title: "Question 4",
    marks: "4 marks",
    prompt: "A school wants to transfer small files between computers. Explain why a USB flash drive may be suitable and give one limitation.",
    answer: "A USB flash drive is suitable because it is portable, small and removable, so it can be carried between computers. It is solid-state, so it has no moving parts and can be reasonably durable for normal use. A limitation is that it can be lost easily because it is small, or it may have limited capacity or variable speed compared with other storage.",
    marking: [
      { mark: "B1", text: "USB flash drive identified as suitable removable storage" },
      { mark: "B1", text: "portability linked to transferring files between computers" },
      { mark: "B1", text: "valid durability/no moving parts or convenience point" },
      { mark: "B1", text: "valid limitation such as easy to lose, limited capacity, variable speed or security risk" },
    ],
    strict: [
      "Do not award limitation mark for an advantage repeated negatively without explanation.",
      "Do not accept that USB flash is volatile.",
      "Allow memory card if scenario is adapted with a reader and portability is clear.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "A media department needs one storage solution for active video editing and another for long-term archive. Recommend both and justify the trade-off.",
    answer: "For active editing, an SSD is suitable because fast read/write access helps load, preview and save large video files quickly. It is also durable because it has no moving parts. For long-term archive, a high-capacity HDD or magnetic tape may be suitable because it offers more capacity at lower cost per GB. The trade-off is that active work needs speed, while archive storage prioritises capacity and cost because it is accessed less often.",
    marking: [
      { mark: "B1", text: "suitable active editing storage, e.g. SSD" },
      { mark: "B1", text: "active editing justification linked to fast read/write/access" },
      { mark: "B1", text: "additional active-work characteristic such as durability/no moving parts" },
      { mark: "B1", text: "suitable archive storage, e.g. HDD/tape" },
      { mark: "B1", text: "archive justification linked to high capacity/low cost per GB" },
      { mark: "B1", text: "explicit trade-off between speed for active work and capacity/cost for archive" },
    ],
    strict: [
      "Do not award full marks for one storage device with one generic reason for both roles.",
      "Do not accept optical disc for active editing unless a special case is strongly justified.",
      "Allow external SSD/HDD if role and characteristics are clear.",
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
    capacity: "Capacity matters because photos and videos can require many GB or TB, especially if RAW files are kept.",
    durability: "Durability matters because portable storage may be knocked, dropped or used in poor conditions.",
    speed: "Speed matters during active editing because large files must be loaded, saved and transferred quickly.",
    cost: "Cost matters because high capacity gets expensive quickly; cost per GB is often the real comparison.",
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
  renderExample("laptop");
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
    document.querySelector("#practiceFeedback").textContent = `${correct}/${practice.length} correct. For wrong answers, name the exact characteristic and link it to the scenario.`;
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
