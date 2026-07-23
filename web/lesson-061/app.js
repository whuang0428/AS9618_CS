const scenarioMap = {
  memory: {
    result: "Topic: operating system memory management.",
    method: "The OS allocates and manages main memory for running processes.",
    trap: "Do not call this a loader unless the clue is specifically placing an executable into memory ready to run.",
  },
  restore: {
    result: "Topic: backup utility.",
    method: "Backup software creates previous copies so data can be restored after deletion or failure.",
    trap: "Do not use encryption as the answer; encryption protects confidentiality, not recovery.",
  },
  prompt: {
    result: "Topic: command line interface.",
    method: "A CLI lets the user type commands and parameters at a prompt.",
    trap: "Do not say GUI just because all interfaces are used by humans.",
  },
  tokens: {
    result: "Topic: lexical analysis.",
    method: "Lexical analysis scans source-code characters and groups them into tokens.",
    trap: "Do not confuse this with syntax analysis, which checks grammar using tokens.",
  },
  references: {
    result: "Topic: linker.",
    method: "A linker resolves external references between object modules and libraries.",
    trap: "Do not call this loading; a loader places executable code into memory.",
  },
  wrongresult: {
    result: "Topic: logic error.",
    method: "A logic error lets the program run but produces an incorrect result due to a faulty algorithm or condition.",
    trap: "Do not call it runtime if the program completes without crashing.",
  },
};

const examples = {
  translator: {
    title: "Example 1: Compiler versus interpreter",
    problem: "Compare a compiler and an interpreter for a 4-mark answer.",
    steps: [
      "Compiler: translates the whole high-level program before execution.",
      "Compiler output: object/executable code, useful for deployment without source code.",
      "Interpreter: translates and executes statement by statement as the program runs.",
      "Interpreter use: useful during development for immediate feedback near errors.",
    ],
  },
  utility: {
    title: "Example 2: Utility choice",
    problem: "A laptop is stolen with customer records on it. Recommend a utility and justify it.",
    steps: [
      "Encryption is suitable because it protects confidentiality.",
      "It converts plaintext into ciphertext using a key.",
      "If the laptop is stolen, an unauthorised user cannot read the records without the key.",
      "Do not say backup: backup helps recovery, not confidentiality of a stolen copy.",
    ],
  },
  linkload: {
    title: "Example 3: Linker versus loader",
    problem: "Object modules use a graphics library before the program runs.",
    steps: [
      "The linker combines object modules and resolves references to the graphics library.",
      "It can produce linked/executable code or report unresolved references.",
      "The loader then places executable code and data into main memory.",
      "The loader prepares the program for execution; it does not translate source code.",
    ],
  },
  errors: {
    title: "Example 4: Error diagnosis",
    problem: "A program compiles and runs, but calculates the wrong average.",
    steps: [
      "This is most likely a logic error.",
      "The program can run, so it is not necessarily syntax or runtime.",
      "The algorithm or formula is wrong, such as using an incorrect divisor.",
      "Testing with known data or tracing variable values can find the fault.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Which system software manages processes, memory, files and devices?", accepted: ["operating system", "os"], answer: "Operating system / OS" },
  { id: "p2", prompt: "Which utility restores data from a previous copy?", accepted: ["backup", "backup utility", "backup software"], answer: "Backup utility" },
  { id: "p3", prompt: "Which interface uses typed commands at a prompt?", accepted: ["cli", "command line", "command line interface"], answer: "Command line interface / CLI" },
  { id: "p4", prompt: "Which translator converts assembly language into machine code?", accepted: ["assembler"], answer: "Assembler" },
  { id: "p5", prompt: "Which compiler stage groups characters into tokens?", accepted: ["lexical", "lexical analysis"], answer: "Lexical analysis" },
  { id: "p6", prompt: "Which compiler stage checks grammar?", accepted: ["syntax", "syntax analysis", "parsing"], answer: "Syntax analysis" },
  { id: "p7", prompt: "Which tool resolves external references between object modules?", accepted: ["linker"], answer: "Linker" },
  { id: "p8", prompt: "Which tool loads executable code into main memory?", accepted: ["loader"], answer: "Loader" },
  { id: "p9", prompt: "Which error type runs but gives the wrong result?", accepted: ["logic", "logic error"], answer: "Logic error" },
  { id: "p10", prompt: "Which error type occurs while the program is executing and may halt it?", accepted: ["runtime", "run time", "runtime error", "run-time"], answer: "Runtime error" },
];

const mistakes = [
  {
    wrong: "A compiler and interpreter both turn code into machine code, so they are basically the same.",
    fix: "Both are translators for high-level code, but a compiler translates the whole program before execution and can produce object/executable code, while an interpreter translates and executes statement by statement.",
  },
  {
    wrong: "A linker puts executable code into memory.",
    fix: "A linker combines object modules and resolves external references. A loader places executable code and data into main memory.",
  },
  {
    wrong: "A backup makes stolen customer data unreadable.",
    fix: "A backup supports recovery from loss. Encryption makes data unreadable without the key and protects confidentiality.",
  },
  {
    wrong: "A syntax error is when the answer is wrong.",
    fix: "A syntax error breaks language grammar. A wrong answer from a program that runs is usually a logic error.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "6 marks",
    prompt: "Compare an operating system and utility software, using examples.",
    answer: "An operating system is system software that manages computer resources and provides services, such as process management, memory management, file management and device management. Utility software is system software designed for a specific maintenance, protection or management task. For example, backup software creates copies so data can be restored, while antivirus software scans for malware. The OS manages general operation of the system, whereas a utility performs a narrower support task.",
    marking: [
      { mark: "B1", text: "operating system identified as system software managing resources/providing services" },
      { mark: "B1", text: "valid OS role such as process, memory, file or device management" },
      { mark: "B1", text: "utility software identified as specific maintenance/protection/support task" },
      { mark: "B1", text: "valid utility example and mechanism, e.g. backup restores copies / antivirus scans malware" },
      { mark: "B1", text: "clear distinction between general OS role and narrower utility role" },
      { mark: "B1", text: "second valid utility example with its specific purpose" },
    ],
    strict: [
      "Do not accept 'both are apps' as a comparison.",
      "Do not accept a utility example without saying what it does.",
      "Allow system software for both if roles are distinguished.",
    ],
  },
  {
    title: "Question 2",
    marks: "6 marks",
    prompt: "A developer writes a high-level program, tests it, and then distributes it. Compare suitable translator choices for testing and distribution.",
    answer: "During testing, an interpreter may be suitable because it translates and executes statements as the program runs, allowing quick feedback near the faulty statement. This can help development and debugging. For distribution, a compiler may be suitable because it translates the whole program before execution and can produce object or executable code. Users can run the executable without needing the source code, and the program may run repeatedly without retranslation.",
    marking: [
      { mark: "B1", text: "interpreter selected for testing/development" },
      { mark: "B1", text: "interpreter translates/executes statement by statement" },
      { mark: "B1", text: "development benefit such as quick feedback/debugging" },
      { mark: "B1", text: "compiler selected for distribution" },
      { mark: "B1", text: "compiler translates whole program before execution / produces object or executable code" },
      { mark: "B1", text: "distribution benefit such as source code not needed or repeated execution without retranslation" },
    ],
    strict: [
      "Do not award full marks for saying only 'compiler is faster'.",
      "Do not accept interpreter as producing standalone executable in this context.",
      "Allow line by line for statement by statement.",
      "Award each stage independently if one stage choice is incorrect.",
    ],
  },
  {
    title: "Question 3",
    marks: "5 marks",
    prompt: "Explain the difference between lexical analysis, syntax analysis and semantic analysis.",
    answer: "Lexical analysis scans source-code characters and groups them into tokens such as identifiers, keywords, operators and literals. Syntax analysis checks whether the token sequence follows the grammar rules of the programming language, and may build a parse tree. Semantic analysis checks meaning, such as type compatibility, declarations and scope, often using a symbol table.",
    marking: [
      { mark: "B1", text: "lexical analysis scans source characters / produces tokens" },
      { mark: "B1", text: "valid token examples such as identifiers, keywords, operators or literals" },
      { mark: "B1", text: "syntax analysis checks grammar/structure of token sequence" },
      { mark: "B1", text: "semantic analysis checks meaning/context" },
      { mark: "B1", text: "valid semantic example such as type compatibility/declaration/scope or symbol table use" },
    ],
    strict: [
      "Do not accept syntax as spelling only.",
      "Do not confuse lexical tokenising with grammar checking.",
      "Allow parsing for syntax analysis.",
      "Award each stage mark independently.",
    ],
  },
  {
    title: "Question 4",
    marks: "6 marks",
    prompt: "Object modules use a library routine. Explain the roles of the linker and loader before the program runs.",
    answer: "The linker combines object modules and resolves external references between modules and libraries, such as a reference to the library routine. It can produce linked or executable code, or report an unresolved external reference if the routine cannot be found. The loader then places the executable code and required data into main memory, may adjust addresses, and prepares the program for execution by the processor.",
    marking: [
      { mark: "B1", text: "linker combines object modules" },
      { mark: "B1", text: "linker resolves external references/library routine references" },
      { mark: "B1", text: "linker produces executable/linked code or can report unresolved reference" },
      { mark: "B1", text: "loader places executable/program/data into main memory" },
      { mark: "B1", text: "loader may relocate/adjust addresses or allocate memory" },
      { mark: "B1", text: "program prepared for execution / processor can execute" },
    ],
    strict: [
      "Do not award linker marks for source-code translation.",
      "Do not award loader marks for resolving library references.",
      "Allow RAM for main memory.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "Classify each error and justify it: missing bracket; program calculates wrong average but completes; file not found while running.",
    answer: "A missing bracket is a syntax error because the code does not follow the grammar rules of the language. A program that calculates the wrong average but completes has a logic error because it runs but the algorithm or formula gives the wrong result. File not found while running is a runtime error because the program fails during execution due to a resource or external condition.",
    marking: [
      { mark: "B1", text: "missing bracket classified as syntax" },
      { mark: "B1", text: "syntax justification linked to grammar/structure" },
      { mark: "B1", text: "wrong average classified as logic" },
      { mark: "B1", text: "logic justification linked to runs/completes but wrong result/algorithm" },
      { mark: "B1", text: "file not found while running classified as runtime" },
      { mark: "B1", text: "runtime justification linked to failure during execution/external resource" },
    ],
    strict: [
      "Do not award justification marks for repeating only the category name.",
      "Do not classify wrong completed output as runtime.",
      "Allow run-time as runtime.",
      "Award each classification independently.",
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
    precise: "Correct. It names the tool, action, target and result.",
    vague: "Too vague. It might be true in casual speech, but it does not show the loader's mechanism.",
    wrong: "No. Translating source code is a compiler/interpreter role, not a loader role.",
    mixed: "No. Resolving library references is linker work; syntax checking is translator work.",
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
  renderExample("translator");
}

function renderPractice() {
  const list = document.querySelector("#practiceList");
  list.innerHTML = practice.map((item, index) => `
    <article class="practice-item">
      <p><strong>${index + 1}.</strong> ${item.prompt}</p>
      <div class="practice-row">
        <input id="${item.id}" type="text" autocomplete="off" aria-label="Answer for question ${index + 1}" />
        <button class="primary-button" type="button" data-check="${item.id}">Check</button>
      </div>
      <div class="mark" id="${item.id}Mark" aria-live="polite"></div>
      <button class="answer-toggle" type="button" data-answer="${item.id}">Show answer</button>
      <div class="answer-panel" id="${item.id}Answer">${item.answer}</div>
    </article>
  `).join("");

  document.querySelectorAll("[data-check]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = practice.find((entry) => entry.id === button.dataset.check);
      const value = normalise(document.querySelector(`#${item.id}`).value);
      const correct = item.accepted.some((answer) => value.includes(normalise(answer)));
      const mark = document.querySelector(`#${item.id}Mark`);
      mark.textContent = correct ? "Correct." : "Not quite. Reveal the answer, then improve the wording.";
      mark.className = `mark ${correct ? "correct" : "incorrect"}`;
    });
  });

  document.querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#${button.dataset.answer}Answer`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide answer" : "Show answer";
    });
  });
}

function renderMistakes() {
  document.querySelector("#mistakeGrid").innerHTML = mistakes.map((item, index) => `
    <article>
      <p class="wrong"><strong>Mistake ${index + 1}:</strong> ${item.wrong}</p>
      <button class="answer-toggle" type="button" data-fix="fix${index}">Show correction</button>
      <div class="answer-panel" id="fix${index}">${item.fix}</div>
    </article>
  `).join("");

  document.querySelectorAll("[data-fix]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#${button.dataset.fix}`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide correction" : "Show correction";
    });
  });
}

function renderExam() {
  document.querySelector("#examList").innerHTML = examQuestions.map((question, index) => `
    <article class="exam-card">
      <div class="exam-head">
        <h3>${question.title}</h3>
        <span>${question.marks}</span>
      </div>
      <p>${question.prompt}</p>
      <button class="ms-toggle" type="button" data-ms="ms${index}">Show MS</button>
      <div class="ms-panel" id="ms${index}">
        <h4>Indicative answer</h4>
        <p>${question.answer}</p>
        <h4>CIE-style mark scheme</h4>
        <ul>${question.marking.map((point) => `<li><strong>${point.mark}</strong> ${point.text}</li>`).join("")}</ul>
      </div>
    </article>
  `).join("");

  document.querySelectorAll("[data-ms]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#${button.dataset.ms}`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide MS" : "Show MS";
    });
  });
}

setupPrint();
setupHook();
setupSimulator();
setupExamples();
renderPractice();
renderMistakes();
renderExam();
