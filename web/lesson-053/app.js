const scenarioMap = {
  process: {
    result: "Role: process management.",
    method: "The OS scheduler allocates processor time and tracks which processes are ready, running or waiting.",
    trap: "Do not say each application simply controls the CPU directly.",
  },
  memory: {
    result: "Role: memory management.",
    method: "The OS allocates RAM to the program, tracks used/free memory and helps protect memory belonging to other processes.",
    trap: "Do not confuse RAM allocation with saving a file to secondary storage.",
  },
  file: {
    result: "Role: file management.",
    method: "The OS provides file operations and maintains directories, metadata and permissions so the document can be stored and found.",
    trap: "Do not say file management is only backup; backup is usually a utility task.",
  },
  device: {
    result: "Role: device management.",
    method: "The OS uses a driver, buffer and queue to manage the printer and order jobs waiting for the device.",
    trap: "Do not say the word processor talks to the printer hardware directly without OS/device support.",
  },
  security: {
    result: "Role: security and access control, linked to file management.",
    method: "The OS checks permissions for the user account and denies access if the user lacks the required rights.",
    trap: "Do not assume a file is accessible just because it exists.",
  },
  error: {
    result: "Role: error handling and application support.",
    method: "The OS can detect/report an error condition, isolate a crashed process where possible and return control to the user.",
    trap: "Do not say the OS always fixes the bug; it may only report or manage the failure.",
  },
};

const examples = {
  slow: {
    title: "Example 1: slow laptop with many apps open",
    problem: "A browser, music player and video editor are open. Explain which OS roles are involved.",
    steps: [
      "Process management schedules CPU time between running processes.",
      "Memory management allocates RAM to each process and tracks which memory is in use.",
      "If memory is limited, the OS may need to manage memory carefully or use virtual memory in some systems.",
      "The answer should link the role to the service: sharing CPU time and allocating memory.",
    ],
  },
  print: {
    title: "Example 2: print job",
    problem: "A user prints a document while another document is already printing.",
    steps: [
      "Device management is the main role.",
      "A printer driver lets the OS communicate with the specific printer.",
      "A print queue orders jobs waiting for the printer.",
      "A buffer can temporarily store data while the printer works at a different speed.",
      "The user can continue working while the OS manages the device request.",
    ],
  },
  save: {
    title: "Example 3: saving a file",
    problem: "A user saves a project as final_project.docx in a folder.",
    steps: [
      "File management provides the save operation.",
      "The OS records metadata such as name, type, location, size and timestamps.",
      "The directory structure allows the file to be located later.",
      "Permissions can control who may read or modify the file.",
      "This is not the same as memory management, because the saved file is stored persistently.",
    ],
  },
  memory: {
    title: "Example 4: memory conflict prevention",
    problem: "One program tries to access memory used by another program.",
    steps: [
      "Memory management tracks which memory belongs to each process.",
      "The OS helps prevent one process from incorrectly accessing or overwriting another process's memory.",
      "This improves stability and security.",
      "If an illegal access occurs, the OS may stop the process or report an error.",
      "A strong answer states allocate, protect and release.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Which OS role allocates CPU time to running programs?", accepted: ["process management", "scheduling", "scheduler"], answer: "Process management / scheduling" },
  { id: "p2", prompt: "What is a program in execution called?", accepted: ["process", "a process"], answer: "Process" },
  { id: "p3", prompt: "Which OS role allocates RAM to programs?", accepted: ["memory management"], answer: "Memory management" },
  { id: "p4", prompt: "Which OS role organises folders, metadata and permissions?", accepted: ["file management"], answer: "File management" },
  { id: "p5", prompt: "Which OS role uses drivers to communicate with peripherals?", accepted: ["device management"], answer: "Device management" },
  { id: "p6", prompt: "What software lets the OS communicate with a specific device?", accepted: ["driver", "device driver"], answer: "Device driver" },
  { id: "p7", prompt: "What temporary storage helps when a device and CPU work at different speeds?", accepted: ["buffer", "a buffer"], answer: "Buffer" },
  { id: "p8", prompt: "What orders print jobs waiting for a printer?", accepted: ["print queue", "queue", "printer queue"], answer: "Print queue" },
  { id: "p9", prompt: "What OS feature controls who can read or write a file?", accepted: ["permissions", "access control", "file permissions"], answer: "Permissions / access control" },
  { id: "p10", prompt: "Which Lesson 054 topic is only touched lightly here: CLI, GUI, menu-driven and natural language?", accepted: ["user interfaces", "interfaces", "user interface"], answer: "User interfaces" },
];

const mistakes = [
  {
    wrong: "The application decides which other apps get CPU time.",
    fix: "The operating system performs process management and scheduling to allocate CPU time between processes.",
  },
  {
    wrong: "Memory management means choosing a folder name for a saved file.",
    fix: "Memory management allocates and protects RAM for running programs. File management handles folders, names and storage of files.",
  },
  {
    wrong: "A printer driver is the printer hardware.",
    fix: "A device driver is software that allows the OS to communicate with a specific hardware device.",
  },
  {
    wrong: "A backup utility and file management are exactly the same OS role.",
    fix: "File management is an OS role for organising and accessing files. Backup is utility software that copies data for recovery.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "5 marks",
    prompt: "Describe how an operating system manages processes when several applications are open.",
    answer: "The operating system treats running programs as processes. It uses process management and scheduling to decide which process receives processor time. It tracks process states such as running, ready or waiting. It can switch between processes so several applications appear to run at the same time. This allows multitasking and prevents one application from permanently taking control of the CPU.",
    marking: [
      { mark: "B1", text: "running programs are treated as processes" },
      { mark: "B1", text: "scheduler/process management allocates CPU/processor time" },
      { mark: "B1", text: "tracks process states such as running/ready/waiting" },
      { mark: "B1", text: "switches between processes / supports multitasking" },
      { mark: "B1", text: "prevents one process monopolising CPU or improves responsiveness" },
    ],
    strict: [
      "Do not accept 'the apps choose themselves' for scheduling.",
      "Do not require named scheduling algorithms.",
      "Allow task for process if the running-program idea is clear.",
    ],
  },
  {
    title: "Question 2",
    marks: "5 marks",
    prompt: "Explain the role of memory management in an operating system.",
    answer: "Memory management allocates memory to programs when they run. The OS keeps track of which memory areas are free and which are in use. It helps protect memory so that one process does not incorrectly access or overwrite another process's data. When a program ends, the OS can release its memory for reuse. This helps programs run reliably and makes efficient use of RAM.",
    marking: [
      { mark: "B1", text: "allocates memory/RAM to programs or processes" },
      { mark: "B1", text: "tracks free and used memory areas" },
      { mark: "B1", text: "protects processes from accessing/overwriting each other's memory" },
      { mark: "B1", text: "releases/deallocates memory when no longer needed" },
      { mark: "B1", text: "benefit such as reliability, stability or efficient RAM use" },
    ],
    strict: [
      "Do not accept file storage management as memory management unless RAM is referenced.",
      "Do not require virtual memory for full credit.",
      "Allow main memory for RAM.",
    ],
  },
  {
    title: "Question 3",
    marks: "5 marks",
    prompt: "A user saves a file and later opens it again. Explain how the operating system supports this.",
    answer: "The operating system provides file management services. It stores the file in a directory/folder structure and records metadata such as file name, type, size, location and timestamps. It provides operations such as create, save, open, move and delete. It can check permissions to decide whether the user may access or modify the file. This allows files to be organised, found and protected.",
    marking: [
      { mark: "B1", text: "identifies file management as the OS role" },
      { mark: "B1", text: "uses directory/folder structure or file path to organise files" },
      { mark: "B1", text: "records valid metadata such as name/type/size/location/date" },
      { mark: "B1", text: "provides file operations such as save/open/delete/move" },
      { mark: "B1", text: "checks permissions/access rights or protects files" },
    ],
    strict: [
      "Do not accept memory management alone for saved files.",
      "Do not require all metadata examples; one valid example is enough for B1.",
      "Allow access control for permissions.",
    ],
  },
  {
    title: "Question 4",
    marks: "6 marks",
    prompt: "Explain how an operating system manages a printer when several documents are sent to print.",
    answer: "The operating system performs device management. A printer driver allows the OS to communicate with the specific printer. The OS can place print jobs in a print queue so they are printed in order. A buffer may temporarily store print data because the printer and CPU work at different speeds. The printer may use interrupts or status signals to indicate when it is ready. This allows applications to continue while the OS manages access to the shared printer.",
    marking: [
      { mark: "B1", text: "identifies device management" },
      { mark: "B1", text: "device/printer driver enables communication with specific printer" },
      { mark: "B1", text: "print queue orders jobs waiting for printer" },
      { mark: "B1", text: "buffer temporarily stores data due to speed difference" },
      { mark: "B1", text: "interrupt/status signal used when printer needs attention/is ready" },
      { mark: "B1", text: "benefit such as applications continue or shared device access is controlled" },
    ],
    strict: [
      "Do not accept that the application sends raw commands directly to printer hardware without OS/device support.",
      "Do not require both buffer and queue for all device examples, but this printer scenario supports both.",
      "Allow spooler if clearly described as queuing/managing print jobs.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "Compare process management, memory management and file management.",
    answer: "Process management controls programs that are running. It schedules CPU time, tracks process states and supports multitasking. Memory management allocates RAM to processes, tracks which memory is in use and protects one process's memory from another. File management organises files and directories, stores metadata, provides operations such as save/open/delete and controls access permissions. They are different OS roles because they manage CPU execution, main memory and stored files respectively.",
    marking: [
      { mark: "B1", text: "process management described as managing running programs/processes" },
      { mark: "B1", text: "process mechanism such as scheduling CPU time or tracking states" },
      { mark: "B1", text: "memory management described as allocating/protecting RAM/main memory" },
      { mark: "B1", text: "memory mechanism such as tracking used/free memory or preventing overwrite" },
      { mark: "B1", text: "file management described as organising/storing/accessing files/directories" },
      { mark: "B1", text: "distinguishes process management of CPU execution, memory management of RAM and file management of persistent files" },
    ],
    strict: [
      "Do not accept three names with no role explanation.",
      "Do not confuse file storage with RAM for the memory mark.",
      "Allow task management for process management if running-program idea is clear.",
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
    os: "Correct. Process management and scheduling allocate CPU time between processes.",
    printer: "No. A printer driver helps with a device; it does not schedule all CPU time.",
    spreadsheet: "No. Spreadsheet software is an application, not the system scheduler.",
    random: "No. Computers are already chaotic enough without apps shouting for the CPU.",
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
    method.innerHTML = `<strong>Reasoning:</strong> ${item.method}`;
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
  renderExample("slow");
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
