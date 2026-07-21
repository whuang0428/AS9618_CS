const scenarioMap = {
  os: {
    result: "Category: operating system.",
    method: "The software manages resources such as memory and processor time and provides services for applications.",
    trap: "Do not call this an application just because applications benefit from it.",
  },
  backup: {
    result: "Category: utility software.",
    method: "Backup software performs a maintenance/protection task by copying data so it can be recovered after loss or corruption.",
    trap: "Do not say backup prevents every data loss; it allows recovery if a usable copy exists.",
  },
  compiler: {
    result: "Category: language translator: compiler.",
    method: "A compiler translates the whole high-level source program before execution, often producing object or executable code.",
    trap: "Do not describe a compiler as translating one line at a time during execution.",
  },
  interpreter: {
    result: "Category: language translator: interpreter.",
    method: "An interpreter translates and executes source code statement by statement, which can help during development and debugging.",
    trap: "Do not call an interpreter a failed compiler; it is a different translation method.",
  },
  assembler: {
    result: "Category: language translator: assembler.",
    method: "An assembler translates assembly language mnemonics into machine code for a specific processor.",
    trap: "Do not use assembler for high-level languages such as Python or Java.",
  },
  app: {
    result: "Category: application software, not system software.",
    method: "A word processor helps the user perform a specific task. It depends on the operating system but is not itself the OS.",
    trap: "Do not classify all software as system software simply because it runs on a computer.",
  },
};

const examples = {
  classify: {
    title: "Example 1: classify software",
    problem: "Classify antivirus, compiler and spreadsheet software.",
    steps: [
      "Antivirus is utility software because it detects, quarantines or removes malware.",
      "A compiler is a language translator because it translates source code before execution.",
      "A spreadsheet is application software because it helps users perform a specific task.",
      "A strong answer names the category and states the purpose.",
    ],
  },
  compiler: {
    title: "Example 2: choosing a compiler",
    problem: "A developer wants to distribute a finished program without sharing source code. Which translator is suitable?",
    steps: [
      "A compiler is usually suitable because it translates the whole source program before execution.",
      "It can produce object or executable code.",
      "The user can run the translated program without needing the original source code.",
      "A limitation is that recompilation is needed after changes to the source code.",
      "The exam answer should connect the translator to the scenario.",
    ],
  },
  interpreter: {
    title: "Example 3: choosing an interpreter",
    problem: "A programmer is testing code and wants errors reported close to where they occur.",
    steps: [
      "An interpreter translates and executes code statement by statement.",
      "This can help during development because errors can be reported as the relevant statement is reached.",
      "It may make testing and debugging more convenient.",
      "A limitation is that execution may require the interpreter and may be slower than compiled code.",
      "Do not describe it as producing a standalone executable in the same way as a compiler.",
    ],
  },
  utility: {
    title: "Example 4: choosing a utility",
    problem: "A school wants to recover coursework after accidental deletion. Which utility is relevant?",
    steps: [
      "Backup software is the relevant utility.",
      "It creates copies of files/data at another location or time.",
      "If coursework is deleted, a previous copy can be restored.",
      "This reduces the impact of data loss, but only if backups are recent and usable.",
      "The mark-worthy words are utility, backup, copy and recovery.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "What type of software manages hardware and supports applications?", accepted: ["system software"], answer: "System software" },
  { id: "p2", prompt: "What system software manages resources and provides an interface?", accepted: ["operating system", "os"], answer: "Operating system / OS" },
  { id: "p3", prompt: "What type of system software performs maintenance or protection tasks?", accepted: ["utility software", "utility", "utilities"], answer: "Utility software" },
  { id: "p4", prompt: "What type of system software converts source code?", accepted: ["translator", "language translator", "translators", "language translators"], answer: "Language translator" },
  { id: "p5", prompt: "Which translator translates the whole program before execution?", accepted: ["compiler", "a compiler"], answer: "Compiler" },
  { id: "p6", prompt: "Which translator translates and executes statement by statement?", accepted: ["interpreter", "an interpreter"], answer: "Interpreter" },
  { id: "p7", prompt: "Which translator converts assembly language into machine code?", accepted: ["assembler", "an assembler"], answer: "Assembler" },
  { id: "p8", prompt: "Is a spreadsheet usually system software or application software?", accepted: ["application software", "application", "app"], answer: "Application software" },
  { id: "p9", prompt: "Name one utility used to recover data after loss.", accepted: ["backup", "backup software", "restore utility"], answer: "Backup software" },
  { id: "p10", prompt: "Name one utility used to detect or remove malware.", accepted: ["antivirus", "anti virus", "anti-virus", "antivirus software"], answer: "Antivirus software" },
];

const mistakes = [
  {
    wrong: "Any program that runs on a computer is system software.",
    fix: "System software manages, supports or maintains the computer system. Application software performs user tasks such as writing documents or editing images.",
  },
  {
    wrong: "A compiler and interpreter do exactly the same thing in exactly the same way.",
    fix: "Both are translators, but a compiler translates the whole program before execution, while an interpreter translates and executes statement by statement.",
  },
  {
    wrong: "Utility software is only software that makes the computer faster.",
    fix: "Utility software performs maintenance, protection or optimisation tasks, such as backup, antivirus, compression or disk/file tools.",
  },
  {
    wrong: "An assembler translates high-level languages directly into English.",
    fix: "An assembler translates assembly language mnemonics into machine code for a specific processor.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "4 marks",
    prompt: "Explain what is meant by system software and give two examples.",
    answer: "System software is software that manages the computer system, supports hardware and provides services for application software or users. Examples include an operating system, which manages resources and provides an interface, and utility software, such as antivirus or backup software, which maintains or protects the system. A language translator is also system software because it converts source code.",
    marking: [
      { mark: "B1", text: "system software manages/supports/maintains the computer system" },
      { mark: "M1", text: "provides services for hardware, users or application software" },
      { mark: "B1", text: "valid example such as operating system, utility software or translator" },
      { mark: "A1", text: "second valid example with purpose or role" },
    ],
    strict: [
      "Do not accept only a list of application programs.",
      "Do not accept 'software inside the computer' without a management/support role.",
      "Allow OS for operating system.",
      "FT: award example marks if the definition is weak but examples are valid system software.",
    ],
  },
  {
    title: "Question 2",
    marks: "5 marks",
    prompt: "Compare operating system software and utility software.",
    answer: "An operating system is system software that manages resources, provides a user interface and provides services for applications. Utility software is system software that performs maintenance, protection or optimisation tasks. For example, an OS may allocate memory or manage devices, while antivirus software detects malware and backup software creates copies for recovery. Utilities often support or maintain the system rather than acting as the main coordinator.",
    marking: [
      { mark: "B1", text: "operating system identified as system software/main coordinator" },
      { mark: "M1", text: "OS role explained, such as resource management/interface/application services" },
      { mark: "B1", text: "utility software identified as maintenance/protection/optimisation software" },
      { mark: "M1", text: "valid utility example with purpose" },
      { mark: "A1", text: "clear comparison between OS main management role and utility support/maintenance role" },
    ],
    strict: [
      "Do not accept 'utility software is more useful' as a comparison.",
      "Do not require detailed process scheduling in this overview question.",
      "Allow backup, antivirus, compression or disk/file tools as utilities.",
      "FT: award comparison mark if both roles are described accurately.",
    ],
  },
  {
    title: "Question 3",
    marks: "5 marks",
    prompt: "A programmer wants to distribute a finished program to users without giving them the source code. Explain why a compiler may be suitable.",
    answer: "A compiler translates the whole source program before execution. It can produce object or executable code that can be distributed to users. Users can run the compiled program without needing to see or edit the original source code. The program may run without translating each statement during execution. A limitation is that the program must be recompiled after source-code changes.",
    marking: [
      { mark: "B1", text: "compiler translates the whole source program before execution" },
      { mark: "M1", text: "produces object/executable/machine code" },
      { mark: "A1", text: "compiled code can be distributed/run without source code" },
      { mark: "B1", text: "does not translate each statement during execution / can run after compilation" },
      { mark: "B1", text: "valid limitation such as recompilation needed after changes" },
    ],
    strict: [
      "Do not accept compiler as line-by-line execution.",
      "Do not require a specific programming language example.",
      "Allow object code if executable code is not stated.",
      "FT: award distribution mark if translated code idea is clear.",
    ],
  },
  {
    title: "Question 4",
    marks: "4 marks",
    prompt: "Explain why an interpreter may be useful during program development.",
    answer: "An interpreter translates and executes source code statement by statement. This can help during development because errors can be reported when the relevant statement is reached. The programmer can test small parts of the program without compiling the whole program first. This can support debugging, although the program may run more slowly or require the interpreter.",
    marking: [
      { mark: "B1", text: "interpreter translates/executes statement by statement" },
      { mark: "M1", text: "errors can be reported as statements are reached / useful diagnostics" },
      { mark: "B1", text: "programmer can test/debug without compiling whole program first" },
      { mark: "A1", text: "valid limitation or trade-off such as slower execution or interpreter required" },
    ],
    strict: [
      "Do not accept interpreter as always producing a standalone executable.",
      "Do not accept 'easier' without explaining debugging/testing.",
      "Allow line-by-line as equivalent to statement by statement.",
      "FT: award debugging mark if the translation method is implied correctly.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "Classify each item as operating system, utility software, language translator or application software: backup software, assembler, word processor, memory manager. Give a reason for each.",
    answer: "Backup software is utility software because it creates copies of data so files can be recovered after loss or corruption. An assembler is a language translator because it converts assembly language mnemonics into machine code. A word processor is application software because it helps the user produce documents. A memory manager is part of, or a function of, an operating system because it allocates and manages memory resources.",
    marking: [
      { mark: "B1", text: "backup software classified as utility software with recovery/copy purpose" },
      { mark: "B1", text: "assembler classified as language translator with assembly-to-machine-code purpose" },
      { mark: "B1", text: "word processor classified as application software with user document/task purpose" },
      { mark: "B1", text: "memory manager classified as operating system/OS function with memory allocation purpose" },
      { mark: "M1", text: "reasons consistently distinguish category by purpose rather than name only" },
      { mark: "A1", text: "all four classifications are internally consistent and use correct system/application boundary" },
    ],
    strict: [
      "Do not award a classification mark if no reason is given for that item.",
      "Do not accept word processor as system software because it runs on an OS.",
      "Allow memory management as an OS role rather than a separate named program.",
      "FT: award consistency mark if one item is misclassified but reasoning for others is clear.",
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
    translator: "Correct. A language translator converts source code into code that can be executed or processed further.",
    word: "No. A word processor helps users write documents; it does not translate source code for the CPU.",
    antivirus: "No. Antivirus is utility software for malware protection, not source-code translation.",
    monitor: "No. A monitor displays output; it does not translate programs.",
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
  renderExample("classify");
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
