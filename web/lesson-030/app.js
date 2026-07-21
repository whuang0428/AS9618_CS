const scenarios = {
  active: {
    result: "RAM",
    method: "RAM stores the program, data and instructions currently in use so the processor can access them quickly.",
  },
  boot: {
    result: "ROM",
    method: "ROM is non-volatile and stores firmware/startup instructions needed before the operating system loads.",
  },
  repeat: {
    result: "Cache",
    method: "Cache stores frequently or recently used data/instructions close to the CPU, reducing access time compared with RAM.",
  },
  full: {
    result: "Virtual memory",
    method: "When RAM is insufficient, part of secondary storage can be used as virtual memory so programs can continue running.",
  },
  power: {
    result: "Volatile RAM",
    method: "RAM is volatile, so its contents are lost when power is switched off.",
  },
  slow: {
    result: "Heavy virtual memory use",
    method: "Frequent movement between RAM and secondary storage is slower than direct RAM access, so the system can slow down.",
  },
};

const examples = {
  ram: {
    title: "Example 1: RAM in current use",
    problem: "A student edits a large image while a browser and music app are open.",
    steps: [
      "RAM holds the image data, program code and other data currently in use.",
      "It allows faster access than loading everything repeatedly from secondary storage.",
      "RAM is volatile, so unsaved changes can be lost if power is off.",
      "Exam-ready sentence: RAM stores programs and data currently in use; it is volatile, so contents are lost when power is removed.",
    ],
  },
  rom: {
    title: "Example 2: ROM during startup",
    problem: "A computer has just been switched on and the operating system has not loaded yet.",
    steps: [
      "The computer needs instructions that are available immediately after power is applied.",
      "ROM is suitable because it is non-volatile and retains firmware/startup instructions.",
      "These instructions begin the boot process and help load the operating system.",
      "Do not say ROM stores all user files; that is the role of secondary storage.",
    ],
  },
  virtual: {
    title: "Example 3: virtual memory when RAM is full",
    problem: "A user opens many applications and the computer starts responding slowly.",
    steps: [
      "The system may use virtual memory when there is not enough RAM for active data.",
      "Virtual memory uses part of secondary storage as if it were memory.",
      "This allows more/larger programs to run, but access is slower than RAM.",
      "Heavy use can reduce performance because data is swapped between RAM and secondary storage.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Which primary storage stores programs and data currently in use?", accepted: ["ram"], answer: "RAM" },
  { id: "p2", prompt: "Is RAM volatile or non-volatile?", accepted: ["volatile"], answer: "Volatile" },
  { id: "p3", prompt: "Which memory stores startup instructions and keeps them without power?", accepted: ["rom"], answer: "ROM" },
  { id: "p4", prompt: "Is ROM volatile or non-volatile?", accepted: ["non volatile", "non-volatile", "nonvolatile"], answer: "Non-volatile" },
  { id: "p5", prompt: "Which memory is very fast and stores frequently used data near the CPU?", accepted: ["cache", "cache memory"], answer: "Cache" },
  { id: "p6", prompt: "Which concept uses secondary storage when RAM is insufficient?", accepted: ["virtual memory"], answer: "Virtual memory" },
  { id: "p7", prompt: "Is virtual memory usually faster or slower than RAM?", accepted: ["slower"], answer: "Slower" },
  { id: "p8", prompt: "Name one reason cache can improve CPU performance.", accepted: ["faster access", "reduces access time", "closer to cpu", "frequently used data", "recently used data"], answer: "Faster access to frequently used data/instructions" },
  { id: "p9", prompt: "Does ROM normally store user documents? Answer yes or no.", accepted: ["no"], answer: "No" },
  { id: "p10", prompt: "What happens to unsaved data in RAM when power is off?", accepted: ["lost", "deleted", "erased"], answer: "It is lost" },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "4 marks",
    prompt: "Distinguish between RAM and ROM.",
    answer: "RAM stores programs, data and instructions currently in use and is volatile, so contents are lost when power is off. ROM stores firmware or startup instructions and is non-volatile, so contents remain when power is off.",
    marking: [
      { mark: "B1", text: "RAM stores programs/data/instructions currently in use" },
      { mark: "B1", text: "RAM is volatile / contents lost without power" },
      { mark: "B1", text: "ROM stores firmware/startup/boot instructions" },
      { mark: "B1", text: "ROM is non-volatile / contents retained without power" },
    ],
    strict: [
      "Do not accept only 'RAM is temporary, ROM is permanent' for full credit without purpose or power-state detail.",
      "Do not accept ROM as normal long-term user file storage.",
      "Allow BIOS/UEFI as examples of firmware/startup instructions.",
      "FT: award correct volatility marks even if the purpose explanation is weak.",
    ],
  },
  {
    title: "Question 2",
    marks: "4 marks",
    prompt: "Explain how cache memory can improve processor performance.",
    answer: "Cache is very fast memory close to or inside the processor. It stores frequently or recently used data and instructions. The processor can access these from cache faster than from RAM, reducing waiting time and improving performance.",
    marking: [
      { mark: "B1", text: "cache is very fast memory close to/on CPU" },
      { mark: "B1", text: "stores frequently/recently used data or instructions" },
      { mark: "B1", text: "CPU accesses cache faster than RAM/main memory" },
      { mark: "B1", text: "reduced access time/waiting improves performance" },
    ],
    strict: [
      "Do not award full credit for only saying 'cache makes it faster'.",
      "Do not accept cache as permanent file storage.",
      "Allow 'instructions likely to be needed soon' as frequently/recently used data.",
      "FT: if candidate refers to RAM as main memory, award where meaning is clear.",
    ],
  },
  {
    title: "Question 3",
    marks: "5 marks",
    prompt: "A computer has many applications open and begins to use virtual memory. Explain what virtual memory is and why performance may decrease.",
    answer: "Virtual memory uses part of secondary storage as if it were main memory when there is not enough RAM. It allows more or larger programs to continue running. However, secondary storage is slower than RAM, so moving pages/data between RAM and storage takes time. Heavy use of virtual memory can therefore reduce system performance.",
    marking: [
      { mark: "B1", text: "virtual memory uses part of secondary storage" },
      { mark: "B1", text: "used when RAM is insufficient/full" },
      { mark: "B1", text: "allows more/larger programs to continue running" },
      { mark: "B1", text: "secondary storage access is slower than RAM" },
      { mark: "B1", text: "swapping/moving data causes slower performance" },
    ],
    strict: [
      "Do not accept virtual memory as extra physical RAM.",
      "Do not accept that virtual memory is faster than RAM.",
      "Allow paging/swapping terminology if used correctly.",
      "FT: if secondary storage is named as SSD/HDD, award if role as virtual memory is clear.",
    ],
  },
  {
    title: "Question 4",
    marks: "4 marks",
    prompt: "Explain why ROM is needed when a computer is switched on.",
    answer: "ROM is non-volatile, so it retains instructions when the computer is powered off. When the computer is switched on, these firmware/startup instructions are available immediately. They start the boot process and help load the operating system from storage.",
    marking: [
      { mark: "B1", text: "ROM is non-volatile / retains contents without power" },
      { mark: "B1", text: "contains firmware/startup/boot instructions" },
      { mark: "B1", text: "instructions available immediately when switched on" },
      { mark: "B1", text: "starts boot process / helps load operating system" },
    ],
    strict: [
      "Do not award a mark for 'ROM is memory' without a role.",
      "Do not require detailed boot sequence beyond startup/loading OS.",
      "Allow BIOS/UEFI as examples.",
      "FT: award non-volatility mark independently from boot explanation.",
    ],
  },
  {
    title: "Question 5",
    marks: "5 marks",
    prompt: "A student says, 'Adding more RAM always makes a computer faster.' Evaluate this statement.",
    answer: "Adding RAM can improve performance if the computer previously had insufficient RAM, because more programs/data can be held in RAM and less virtual memory is needed. This reduces slow access to secondary storage. However, if the system already has enough RAM for its workload, other factors such as CPU speed, cache size or storage speed may limit performance, so adding RAM will not always make it faster.",
    marking: [
      { mark: "B1", text: "more RAM can help when current RAM is insufficient" },
      { mark: "B1", text: "more active programs/data can be held in RAM" },
      { mark: "B1", text: "less virtual memory/secondary storage access may be needed" },
      { mark: "B1", text: "not always faster if RAM is already sufficient" },
      { mark: "B1", text: "other bottleneck named, e.g. CPU/cache/storage/software" },
    ],
    strict: [
      "Do not accept an unqualified 'yes, more RAM is always faster' for evaluation credit.",
      "Do not award virtual memory mark unless slower secondary storage access is implied or stated.",
      "Allow examples such as gaming, video editing or many browser tabs if linked to memory demand.",
      "FT: award balanced evaluation marks for any coherent workload-based explanation.",
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
    ram: "RAM: active tabs, applications and unsaved data need working memory while they are in use.",
    cache: "Cache: repeated instructions or data can be kept close to the CPU for faster access.",
    vm: "Virtual memory: when RAM is insufficient, the system may use secondary storage, but this can slow performance.",
    rom: "ROM: startup instructions were needed when the laptop booted; ROM is not where current browser tabs live.",
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
  renderExample("ram");
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
    document.querySelector("#practiceFeedback").textContent = `${correct}/${practice.length} correct. For wrong answers, check purpose, volatility and performance effect.`;
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
