const scenarioMap = {
  math: {
    result: "Item: library routine.",
    method: "A library contains reusable routines such as mathematical functions that programs can call.",
    trap: "Do not describe a library as object code produced by the compiler; it is pre-written reusable code.",
  },
  combine: {
    result: "Tool: linker.",
    method: "A linker combines object modules and needed library routines or references into executable/linked code.",
    trap: "Do not call this loading. Loading happens when the executable is placed into memory.",
  },
  missing: {
    result: "Likely issue: linker error / unresolved external reference.",
    method: "The linker cannot resolve a reference to a routine or module that is required by the object code.",
    trap: "Do not call every build failure a syntax error; this happens after compilation has produced object code.",
  },
  memory: {
    result: "Tool: loader.",
    method: "A loader places the executable program and its data into main memory and prepares it to run.",
    trap: "Do not say the loader translates source code; translators already handled that earlier.",
  },
  static: {
    result: "Method: static linking.",
    method: "Library code is copied into the executable at link time, making the executable more self-contained but often larger.",
    trap: "Do not say static linking always produces the smallest file.",
  },
  dynamic: {
    result: "Method: dynamic linking.",
    method: "The program uses a shared library at load time or run time, reducing duplication but requiring the library to be available and compatible.",
    trap: "Do not say dynamic linking means the library is never needed.",
  },
};

const examples = {
  library: {
    title: "Example 1: Library routine",
    problem: "A program needs a square root function and a file input routine.",
    steps: [
      "A library can provide pre-written routines such as SQRT or file input/output functions.",
      "The programmer can call these routines instead of writing them from scratch.",
      "This can save development time and use tested code.",
      "The routine still needs to be linked or available at run time for the program to work.",
    ],
  },
  linker: {
    title: "Example 2: Linker combines modules",
    problem: "main.o calls functions stored in maths.o and a graphics library.",
    steps: [
      "The compiler has already produced object modules.",
      "The linker combines object modules and required library routines or references.",
      "It resolves external references, such as a call in main.o to a function in maths.o.",
      "If a referenced routine cannot be found, the linker can report an unresolved external reference.",
    ],
  },
  loader: {
    title: "Example 3: Loader prepares execution",
    problem: "The user opens an executable program.",
    steps: [
      "The loader loads the executable code and required data into main memory.",
      "It may allocate memory and adjust addresses depending on where the program is placed.",
      "The program is then ready for the processor to execute.",
      "The loader does not combine object modules or translate source code.",
    ],
  },
  dynamic: {
    title: "Example 4: Dynamic linking",
    problem: "Several programs use the same shared graphics library.",
    steps: [
      "Dynamic linking allows a program to use a shared library at load time or run time.",
      "Several programs can share the same library code instead of each storing its own copy.",
      "This can reduce duplicated storage and allow library updates to be shared.",
      "A limitation is that the required shared library must be present and compatible.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Which tool combines object modules into executable/linked code?", accepted: ["linker"], answer: "Linker" },
  { id: "p2", prompt: "Which tool loads executable code into main memory?", accepted: ["loader"], answer: "Loader" },
  { id: "p3", prompt: "What is a library routine?", accepted: ["pre written", "pre-written", "reusable", "routine", "module", "function"], answer: "A pre-written reusable routine/module/function that a program can use" },
  { id: "p4", prompt: "What does a linker resolve between object modules and libraries?", accepted: ["external references", "references", "addresses", "symbols", "unresolved"], answer: "External references / symbols" },
  { id: "p5", prompt: "What is the usual input to a linker?", accepted: ["object code", "object modules", "object files", "library"], answer: "Object files/modules and library references or routines" },
  { id: "p6", prompt: "What is the usual result of loading?", accepted: ["memory", "ram", "main memory", "ready to run", "execute"], answer: "The executable is placed in main memory ready to run" },
  { id: "p7", prompt: "In static linking, is library code copied into the executable? Answer yes or no.", accepted: ["yes"], answer: "Yes" },
  { id: "p8", prompt: "Name one limitation of dynamic linking.", accepted: ["library missing", "must be available", "compatibility", "version", "shared library"], answer: "The shared library must be available and compatible" },
  { id: "p9", prompt: "Is a linker the same as a compiler? Answer yes or no.", accepted: ["no"], answer: "No. A compiler translates source code; a linker combines object modules and resolves references" },
  { id: "p10", prompt: "Give one benefit of using libraries.", accepted: ["saves time", "tested", "reuse", "reusable", "less duplication", "reliability"], answer: "Reusable tested routines can save development time and reduce duplication" },
];

const mistakes = [
  {
    wrong: "A linker loads the program into memory.",
    fix: "A linker combines object modules and resolves external references. A loader places the executable program into main memory.",
  },
  {
    wrong: "A loader translates source code into object code.",
    fix: "A compiler translates source code into object code. A loader loads executable code into memory and prepares it for execution.",
  },
  {
    wrong: "A library is the final executable file.",
    fix: "A library is a collection of reusable routines or modules. A linker may include or reference library routines when creating executable code.",
  },
  {
    wrong: "Dynamic linking means the program does not need the library.",
    fix: "Dynamic linking means the program uses a shared library at load time or run time, so the correct compatible library must be available.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "5 marks",
    prompt: "Describe the role of a linker.",
    answer: "A linker combines object modules produced by compilation or assembly with other object modules and required library routines or references. It resolves external references or symbols, for example a call from one module to a routine in another module. The linker can produce executable code or a linked object file. If a required routine cannot be found, a linker error such as an unresolved external reference may be reported.",
    marking: [
      { mark: "B1", text: "combines object modules/object code" },
      { mark: "M1", text: "includes or connects required library routines/modules" },
      { mark: "B1", text: "resolves external references/symbols between modules" },
      { mark: "B1", text: "produces executable/linked object code" },
      { mark: "A1", text: "unresolved external/reference linker error described" },
    ],
    strict: [
      "Do not accept 'translates source code' as a linker role.",
      "Do not award loader marks for saying only 'puts program in memory'.",
      "Allow references to addresses/symbols if linked to modules or libraries.",
      "FT: award output mark if the candidate has clearly described linking even with weak terminology.",
    ],
  },
  {
    title: "Question 2",
    marks: "4 marks",
    prompt: "Describe the role of a loader when a program is run.",
    answer: "A loader places the executable program code and required data into main memory. It may allocate memory and adjust addresses depending on where the program is loaded. It prepares the program for execution by the processor. It does not translate source code or combine object modules; those are compiler/linker roles.",
    marking: [
      { mark: "B1", text: "loads/places executable program code into main memory/RAM" },
      { mark: "M1", text: "loads required data or program image, or allocates memory" },
      { mark: "B1", text: "may relocate/adjust addresses" },
      { mark: "A1", text: "prepares program for execution or distinguishes from compiler/linker role" },
    ],
    strict: [
      "Do not accept 'loads the website/app' without memory/execution idea.",
      "Do not accept source-code translation as loader role.",
      "Allow RAM for main memory.",
      "FT: award preparation mark if the memory-loading mechanism is clear.",
    ],
  },
  {
    title: "Question 3",
    marks: "4 marks",
    prompt: "Explain why programmers use libraries.",
    answer: "A library contains pre-written reusable routines or modules, such as mathematical, input/output or graphics routines. Programmers use libraries so they do not need to write common routines from scratch. This can save development time and reduce duplication. Library routines may also be tested and reliable, but they must be linked or available when the program runs.",
    marking: [
      { mark: "B1", text: "library contains pre-written/reusable routines/modules" },
      { mark: "M1", text: "valid example such as maths, I/O, graphics or string routines" },
      { mark: "B1", text: "saves development time / avoids rewriting common code / reduces duplication" },
      { mark: "A1", text: "tested/reliable code or need to link/make available at run time" },
    ],
    strict: [
      "Do not accept 'stores data files' as the main purpose of a program library.",
      "Do not require a specific named routine if the example type is clear.",
      "Allow API references only if reusable code/routines are described.",
      "FT: award benefit mark for a valid benefit even if the example is omitted.",
    ],
  },
  {
    title: "Question 4",
    marks: "5 marks",
    prompt: "Compare static linking and dynamic linking.",
    answer: "In static linking, required library code is copied into the executable at link time. This can make the executable more self-contained, but the file may be larger and duplicate library code across programs. In dynamic linking, the program uses a shared library at load time or run time. This can reduce duplication and allow programs to share library code, but the correct compatible library must be available.",
    marking: [
      { mark: "B1", text: "static linking copies/includes library code into executable at link time" },
      { mark: "M1", text: "static advantage or limitation such as self-contained or larger executable" },
      { mark: "B1", text: "dynamic linking uses shared library at load/run time" },
      { mark: "M1", text: "dynamic advantage such as reduced duplication/shared updates/smaller executable" },
      { mark: "A1", text: "dynamic limitation such as missing/incompatible library prevents correct running" },
    ],
    strict: [
      "Do not accept 'static means not moving' or 'dynamic means faster' without linking context.",
      "Do not require both load time and run time; either is acceptable for dynamic linking.",
      "Allow shared object/DLL style examples if explained.",
      "FT: award trade-off marks independently for each linking method.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "A program has been compiled into several object files and uses a graphics library. Explain the steps needed before it can run.",
    answer: "The object files need to be linked. The linker combines the object modules and resolves references between them, including references to graphics library routines. It produces executable or linked code, or reports an unresolved external reference if a required routine cannot be found. The loader then places the executable code and required data into main memory, may adjust addresses, and prepares the program for execution by the processor.",
    marking: [
      { mark: "B1", text: "object files/modules must be linked" },
      { mark: "M1", text: "linker combines object modules" },
      { mark: "B1", text: "linker resolves references to graphics library routines/external references" },
      { mark: "B1", text: "linker produces executable/linked code or reports unresolved reference" },
      { mark: "M1", text: "loader places executable/program/data into main memory" },
      { mark: "A1", text: "loader prepares execution / adjusts addresses / CPU can execute" },
    ],
    strict: [
      "Do not award compiler-stage marks unless linked to existing object files in the scenario.",
      "Do not merge linker and loader into one vague 'runs it' statement for full marks.",
      "Allow RAM for main memory.",
      "FT: if library named is different but used as an external routine, award reference marks.",
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
    linker: "Correct. The linker resolves the reference to the library routine and connects the required code.",
    loader: "No. The loader places executable code into memory; it does not write or locate missing routines by itself.",
    syntax: "No. Syntax analysis checks grammar earlier during compilation.",
    antivirus: "No. Antivirus may scan files, but it does not link external references.",
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
  renderExample("library");
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
