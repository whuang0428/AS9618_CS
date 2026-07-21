const scenarioMap = {
  debug: {
    result: "Best fit: interpreter.",
    method: "An interpreter translates and executes statement by statement, so it can give useful feedback during development.",
    trap: "Do not choose a compiler only because the finished program will later be distributed; the scenario is currently development.",
  },
  deploy: {
    result: "Best fit: compiler.",
    method: "A compiler translates the whole program before execution and can produce object/executable code for distribution.",
    trap: "Do not choose an interpreter if the key requirement is running without providing source code to users.",
  },
  assembly: {
    result: "Best fit: assembler.",
    method: "An assembler translates assembly language mnemonics into machine code/object code.",
    trap: "Do not use assembler for high-level languages or Cambridge pseudocode.",
  },
  modules: {
    result: "Best fit: linker.",
    method: "A linker combines object modules and resolves references to library routines.",
    trap: "Do not call this compilation if object code already exists.",
  },
  run: {
    result: "Best fit: loader.",
    method: "A loader places executable code and data into main memory ready for execution.",
    trap: "Do not say a loader translates source code or resolves library references.",
  },
  logic: {
    result: "Need testing/tracing, not a different translator by itself.",
    method: "A logic error may remain after successful compilation; known test data and tracing help find the wrong algorithm.",
    trap: "Do not assume successful translation proves the program is correct.",
  },
};

const examples = {
  debug: {
    title: "Example 1: Development choice",
    problem: "A beginner is writing a program and wants to test small parts as they go.",
    steps: [
      "An interpreter is suitable during development.",
      "It translates and executes statements as the program runs.",
      "It can stop at or near a faulty statement, giving quick diagnostic feedback.",
      "A limitation is that interpreted execution may be slower and the interpreter/source code may be needed.",
    ],
  },
  deploy: {
    title: "Example 2: Deployment choice",
    problem: "A company wants to distribute a finished program to customers without giving source code.",
    steps: [
      "A compiler is suitable for the final version.",
      "It translates the whole high-level program before execution.",
      "It can produce object or executable code that users can run without the source code.",
      "The program may also need linking with libraries and loading into memory before it runs.",
    ],
  },
  assembly: {
    title: "Example 3: Assembly language choice",
    problem: "A systems programmer writes instructions such as LDA, ADD and STA.",
    steps: [
      "The input is assembly language, so an assembler is suitable.",
      "Assembly mnemonics represent low-level processor instructions.",
      "The assembler converts them into machine code/object code.",
      "A compiler or interpreter is not the precise tool for assembly-language mnemonics.",
    ],
  },
  pipeline: {
    title: "Example 4: Mixed pipeline",
    problem: "A compiled program has object modules and uses a maths library before it is run.",
    steps: [
      "The compiler produces object code from high-level source code.",
      "The linker combines object modules and resolves references to the maths library.",
      "The linked executable can then be loaded into main memory by the loader.",
      "Logic errors may still require testing even if all translation steps succeed.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Best tool for line-by-line development feedback?", accepted: ["interpreter"], answer: "Interpreter" },
  { id: "p2", prompt: "Best tool for producing executable/object code for final deployment?", accepted: ["compiler"], answer: "Compiler" },
  { id: "p3", prompt: "Best tool for assembly language mnemonics?", accepted: ["assembler"], answer: "Assembler" },
  { id: "p4", prompt: "Best tool for combining object modules and resolving external references?", accepted: ["linker"], answer: "Linker" },
  { id: "p5", prompt: "Best tool for placing executable code into main memory?", accepted: ["loader"], answer: "Loader" },
  { id: "p6", prompt: "Does an interpreter normally produce a standalone executable for distribution? Answer yes or no.", accepted: ["no"], answer: "No" },
  { id: "p7", prompt: "Name one advantage of using a compiler for deployment.", accepted: ["executable", "object code", "source code not needed", "without source", "faster", "run repeatedly"], answer: "Executable/object code can run without giving users the source code" },
  { id: "p8", prompt: "Name one advantage of an interpreter during development.", accepted: ["debug", "debugging", "line by line", "statement by statement", "immediate feedback", "errors"], answer: "Statement-by-statement execution can give quick debugging feedback" },
  { id: "p9", prompt: "If object files refer to library routines, what tool resolves those references?", accepted: ["linker"], answer: "Linker" },
  { id: "p10", prompt: "If a program translates successfully but calculates the wrong result, what should still be used to find the fault?", accepted: ["testing", "test data", "tracing", "trace", "dry run", "debugging"], answer: "Testing with known data, tracing or debugging" },
];

const mistakes = [
  {
    wrong: "Use an assembler to translate Java because it sounds close to machine code.",
    fix: "An assembler translates assembly language mnemonics. Java/high-level source code needs a compiler, interpreter or a language-specific translation process.",
  },
  {
    wrong: "A compiler is always best because compiled programs are finished.",
    fix: "A compiler may suit deployment, but an interpreter can be better during development when line-by-line feedback is useful.",
  },
  {
    wrong: "A loader fixes unresolved library routines.",
    fix: "A linker resolves external references to object modules or library routines. A loader places executable code into memory.",
  },
  {
    wrong: "If compilation succeeds, testing is no longer necessary.",
    fix: "Successful compilation does not prove the algorithm is correct. Logic errors may only be found through testing or tracing.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "6 marks",
    prompt: "A programmer is developing a program and wants quick feedback on errors. The finished program will later be distributed to users. Explain suitable translation approaches for both stages.",
    answer: "During development, an interpreter may be suitable because it translates and executes statements as the program runs, so the programmer can test small parts and receive feedback near the faulty statement. For the finished program, a compiler may be suitable because it translates the whole high-level program before execution and can produce object or executable code. The executable can be distributed to users without providing the source code and may run repeatedly without retranslation.",
    marking: [
      { mark: "B1", text: "interpreter selected for development" },
      { mark: "M1", text: "interpreter translates/executes statement by statement" },
      { mark: "B1", text: "development benefit such as quick feedback/debugging/testing small parts" },
      { mark: "B1", text: "compiler selected for finished/deployed program" },
      { mark: "M1", text: "compiler translates whole program before execution and/or produces object/executable code" },
      { mark: "A1", text: "deployment benefit such as source code not needed or repeated execution without retranslation" },
    ],
    strict: [
      "Do not accept 'compiler is better' without scenario-linked reason.",
      "Do not award interpreter marks for producing standalone executable code.",
      "Allow line by line for statement by statement.",
      "FT: award each stage independently if one choice is wrong but the other is correct.",
    ],
  },
  {
    title: "Question 2",
    marks: "5 marks",
    prompt: "Explain why an assembler, a linker and a loader are different tools.",
    answer: "An assembler translates assembly language mnemonics into machine code or object code. A linker combines object modules and resolves external references, including references to library routines, to produce linked/executable code. A loader places executable code and data into main memory and prepares the program for execution. They act at different points in the process, so their roles should not be merged.",
    marking: [
      { mark: "B1", text: "assembler translates assembly language/mnemonics" },
      { mark: "M1", text: "assembler output is machine code/object code" },
      { mark: "B1", text: "linker combines object modules and/or resolves external references" },
      { mark: "B1", text: "loader places executable/program/data into main memory" },
      { mark: "A1", text: "prepares for execution or clearly distinguishes the sequence/roles" },
    ],
    strict: [
      "Do not accept assembler as translator of all high-level source code.",
      "Do not accept linker as loading into memory unless resolving/combining is also clear.",
      "Allow RAM for main memory.",
      "FT: award each tool role independently.",
    ],
  },
  {
    title: "Question 3",
    marks: "4 marks",
    prompt: "A program compiles successfully but produces an incorrect total. Explain why changing translator may not solve the problem.",
    answer: "The problem is likely a logic error because the program can be translated and run but the algorithm or formula gives the wrong result. A compiler may not detect this because the code can be syntactically valid and still have the wrong calculation. Changing from a compiler to an interpreter would not automatically correct the algorithm. The programmer should test with known data, trace variable values or debug the calculation.",
    marking: [
      { mark: "B1", text: "logic error identified or described" },
      { mark: "M1", text: "program translates/runs but result/calculation is wrong" },
      { mark: "B1", text: "translator may not detect intended algorithm/formula error" },
      { mark: "A1", text: "testing/tracing/debugging with known data suggested" },
    ],
    strict: [
      "Do not accept syntax error if the program compiles successfully in the scenario.",
      "Do not accept 'use a better compiler' as a fix without testing/algorithm change.",
      "Allow dry run as tracing.",
      "FT: award testing mark if a valid logic-error investigation method is given.",
    ],
  },
  {
    title: "Question 4",
    marks: "5 marks",
    prompt: "A program has been compiled into object modules and uses a library. Describe the steps needed before it can run.",
    answer: "The object modules must be linked. The linker combines the object modules and resolves external references to library routines. This produces linked or executable code, or reports unresolved references if a required routine is missing. The loader then places the executable code and required data into main memory and prepares it for execution by the processor.",
    marking: [
      { mark: "B1", text: "object modules must be linked" },
      { mark: "M1", text: "linker combines object modules" },
      { mark: "B1", text: "linker resolves external/library references" },
      { mark: "B1", text: "loader places executable/program/data into main memory" },
      { mark: "A1", text: "program is prepared for execution or CPU can execute it" },
    ],
    strict: [
      "Do not award compiler-stage marks as the program is already compiled into object modules.",
      "Do not merge linker and loader into one vague 'runs it' statement.",
      "Allow RAM for main memory.",
      "FT: award loader marks even if the linker output wording is weak but executable context is clear.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "For each scenario, choose the most suitable tool and justify it: high-level program for final distribution; assembly-language routine for a processor; beginner testing code statement by statement.",
    answer: "For a high-level program for final distribution, a compiler is suitable because it translates the whole program before execution and can produce executable/object code that runs without source code. For an assembly-language routine, an assembler is suitable because it translates assembly mnemonics into machine code. For a beginner testing code statement by statement, an interpreter is suitable because it translates and executes statements during running and can provide immediate feedback near errors.",
    marking: [
      { mark: "B1", text: "compiler selected for final distribution" },
      { mark: "M1", text: "compiler justification linked to whole program/executable/object code/source code not needed" },
      { mark: "B1", text: "assembler selected for assembly-language routine" },
      { mark: "M1", text: "assembler justification linked to mnemonics/machine code" },
      { mark: "B1", text: "interpreter selected for statement-by-statement beginner testing" },
      { mark: "A1", text: "interpreter justification linked to statement-by-statement execution/immediate error feedback" },
    ],
    strict: [
      "Do not award selection mark if the tool is matched to the wrong scenario.",
      "Do not accept vague 'faster/easier' without technical mechanism.",
      "Allow line-by-line for statement-by-statement.",
      "FT: award each scenario independently.",
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
    interpreter: "Correct. An interpreter can support statement-by-statement testing and quick diagnostics during development.",
    compiler: "Not best for this stage. A compiler may suit final deployment, but the scenario asks for step-by-step development feedback.",
    assembler: "No. An assembler translates assembly language, not ordinary high-level source code.",
    loader: "No. A loader places executable code into memory; it does not find syntax errors in source code.",
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
  renderExample("debug");
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
        <h4>Strict notes</h4>
        <ul>${question.strict.map((note) => `<li>${note}</li>`).join("")}</ul>
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
