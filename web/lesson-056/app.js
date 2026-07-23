const scenarioMap = {
  deploy: {
    result: "Best fit: compiler.",
    method: "A compiler translates the whole high-level program before execution and can produce object or executable code for distribution.",
    trap: "Do not choose interpreter if the key requirement is distributing a finished program without the source code.",
  },
  debug: {
    result: "Best fit: interpreter.",
    method: "An interpreter translates and executes code statement by statement, which can help identify errors during development.",
    trap: "Do not say interpreters produce a separate executable in the same way as compilers.",
  },
  assembly: {
    result: "Best fit: assembler.",
    method: "An assembler translates assembly language mnemonics into machine code for a specific processor.",
    trap: "Do not use assembler for high-level language source code.",
  },
  repeat: {
    result: "Best fit: compiler.",
    method: "After compilation, the executable can be run repeatedly without translating the whole source code each time.",
    trap: "Do not claim compiled code never needs testing; compilation and correctness are different issues.",
  },
  student: {
    result: "Best fit: interpreter.",
    method: "Interactive execution can help a beginner test small parts of a program and see errors near the relevant statement.",
    trap: "Do not say an interpreter is always faster because it feels immediate.",
  },
  wrongasm: {
    result: "Not suitable: assembler.",
    method: "An assembler translates assembly language, not Java or other high-level source code. A compiler or interpreter would be relevant depending on the language and use case.",
    trap: "Do not confuse assembly language with any program code that looks technical.",
  },
};

const examples = {
  compiler: {
    title: "Example 1: Compiler for distribution",
    problem: "A developer wants to distribute a finished desktop application without giving users the source code.",
    steps: [
      "A compiler is suitable because it translates the whole high-level program before it is run.",
      "It can produce object or executable code.",
      "Users can run the executable without needing the original source code.",
      "A limitation is that errors may be reported after compilation, so debugging may require working through a list of messages.",
    ],
  },
  interpreter: {
    title: "Example 2: Interpreter during development",
    problem: "A student is writing a program and wants immediate feedback on errors.",
    steps: [
      "An interpreter is suitable because it translates and executes code statement by statement.",
      "It can stop at or near the statement where an error occurs.",
      "This can make testing and debugging easier during development.",
      "A limitation is that the program may run more slowly because translation happens while it runs.",
    ],
  },
  assembler: {
    title: "Example 3: Assembler for low-level code",
    problem: "A programmer writes assembly language instructions for a specific processor.",
    steps: [
      "An assembler is suitable because the input is assembly language.",
      "Assembly uses mnemonics such as LDA or ADD rather than raw binary.",
      "The assembler converts these mnemonics into machine code/object code.",
      "It is not the correct translator for high-level source code such as Java or Python.",
    ],
  },
  compare: {
    title: "Example 4: Development versus deployment",
    problem: "Choose one translator for testing and another for distributing the final program.",
    steps: [
      "For testing, an interpreter may be useful because errors can be found as statements are translated and executed.",
      "For distribution, a compiler may be useful because it can produce executable code.",
      "The compiled program can run without giving users the source code.",
      "The choice depends on the stage of development and the need for speed, debugging or source-code protection.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Which translator converts a whole high-level program before execution?", accepted: ["compiler"], answer: "Compiler" },
  { id: "p2", prompt: "Which translator executes high-level code statement by statement?", accepted: ["interpreter"], answer: "Interpreter" },
  { id: "p3", prompt: "Which translator converts assembly language into machine code?", accepted: ["assembler"], answer: "Assembler" },
  { id: "p4", prompt: "What is the usual input to an assembler?", accepted: ["assembly", "assembly language", "mnemonics"], answer: "Assembly language / mnemonics" },
  { id: "p5", prompt: "What code can be executed directly by a processor?", accepted: ["machine code", "machine language", "binary instructions"], answer: "Machine code" },
  { id: "p6", prompt: "Name one reason a compiler is useful for distributing software.", accepted: ["executable", "object code", "no source", "without source", "faster", "run repeatedly"], answer: "It can produce executable/object code that runs without the source code" },
  { id: "p7", prompt: "Name one reason an interpreter is useful during development.", accepted: ["debug", "debugging", "statement by statement", "line by line", "immediate", "errors"], answer: "It can help find errors statement by statement during development" },
  { id: "p8", prompt: "Does an interpreter normally produce a separate permanent object code file? Answer yes or no.", accepted: ["no"], answer: "No" },
  { id: "p9", prompt: "Does an assembler translate Python source code? Answer yes or no.", accepted: ["no"], answer: "No. It translates assembly language" },
  { id: "p10", prompt: "Give one limitation of interpreted programs.", accepted: ["slower", "source code needed", "translated during execution", "needs interpreter"], answer: "They may run more slowly and often need the interpreter/source code available" },
];

const mistakes = [
  {
    wrong: "An interpreter is just a compiler that is worse.",
    fix: "An interpreter translates and executes statements as the program runs. A compiler translates the whole program before execution and can produce object or executable code.",
  },
  {
    wrong: "An assembler translates any programming language into machine code.",
    fix: "An assembler translates assembly language mnemonics into machine code. High-level languages use compilers or interpreters.",
  },
  {
    wrong: "Compiled programs never have errors because the compiler checked them.",
    fix: "A compiler can detect some syntax or translation errors, but logic errors may remain. Successful compilation does not prove the program is correct.",
  },
  {
    wrong: "Machine code is easier for humans because it is what the CPU understands.",
    fix: "Machine code is directly executable by the CPU, but it is difficult for humans to read. High-level languages and assembly mnemonics are more human-readable.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "5 marks",
    prompt: "Describe the role of a compiler and give one advantage and one disadvantage of using one.",
    answer: "A compiler translates the whole high-level source program into object code or executable machine code before the program is run. An advantage is that the compiled program can be run repeatedly without translating the source code each time, and the source code does not need to be supplied to the user. A disadvantage is that errors may be reported after compilation, so the programmer may need to work through a list of error messages before the program can run.",
    marking: [
      { mark: "B1", text: "translates high-level source code" },
      { mark: "B1", text: "whole program translated before execution" },
      { mark: "B1", text: "produces object/executable/machine code" },
      { mark: "B1", text: "valid advantage such as repeated execution without retranslation/source code not needed" },
      { mark: "B1", text: "valid disadvantage such as compilation required before running or error list after compilation" },
    ],
    strict: [
      "Do not accept 'turns code into code' without source/object or machine code distinction.",
      "Do not award output mark for saying only 'it runs the program'.",
      "Allow executable code for object code if context is clear.",
    ],
  },
  {
    title: "Question 2",
    marks: "4 marks",
    prompt: "Explain why an interpreter may be useful while developing a program.",
    answer: "An interpreter translates and executes high-level source code statement by statement as the program runs. During development this can help the programmer test small parts of the program and locate errors near the statement being executed. It may give quicker feedback for debugging. A limitation is that the program may run more slowly than compiled code because translation occurs during execution.",
    marking: [
      { mark: "B1", text: "interpreter translates/executes high-level source code" },
      { mark: "B1", text: "statement by statement / line by line during execution" },
      { mark: "B1", text: "helps locate or diagnose errors during development" },
      { mark: "B1", text: "valid limitation or consequence such as slower execution/source code needed" },
    ],
    strict: [
      "Do not accept 'finds all errors' because logic errors may remain.",
      "Do not accept compiler-only features such as producing a standalone executable.",
      "Allow line by line as equivalent to statement by statement.",
    ],
  },
  {
    title: "Question 3",
    marks: "4 marks",
    prompt: "Describe the purpose of an assembler.",
    answer: "An assembler translates assembly language into machine code or object code. Assembly language uses mnemonic instructions and labels that are easier for programmers to write than raw binary machine code. The resulting machine code can be executed by the processor. An assembler is not used to translate high-level languages such as Java or Python.",
    marking: [
      { mark: "B1", text: "translates assembly language" },
      { mark: "B1", text: "into machine code/object code" },
      { mark: "B1", text: "assembly language contains mnemonics/low-level instructions" },
      { mark: "B1", text: "machine code can be executed by processor or high-level-language boundary stated" },
    ],
    strict: [
      "Do not accept high-level source code as assembler input.",
      "Do not accept 'assembler is assembly language' as a role.",
      "Allow examples of mnemonics such as LDA/ADD if linked to assembly.",
    ],
  },
  {
    title: "Question 4",
    marks: "6 marks",
    prompt: "Compare a compiler and an interpreter.",
    answer: "Both are translator programs for high-level language source code. A compiler translates the whole program before execution and usually produces object or executable code. An interpreter translates and executes the program statement by statement as it runs and normally does not produce a separate permanent object code file. Compiled programs may run faster after translation and can be distributed without source code. Interpreters can be useful for development because errors may be identified as the relevant statement is executed.",
    marking: [
      { mark: "B1", text: "both translate high-level/source code" },
      { mark: "B1", text: "compiler translates whole program before execution" },
      { mark: "B1", text: "compiler produces object/executable code" },
      { mark: "B1", text: "interpreter translates/executes statement by statement during execution" },
      { mark: "B1", text: "interpreter normally does not produce separate permanent object code" },
      { mark: "B1", text: "valid comparative advantage/use case linked to development or deployment" },
    ],
    strict: [
      "Do not award comparison marks for vague faster/easier without mechanism.",
      "Do not require the exact phrase 'permanent object code' if the idea is clear.",
      "Allow line by line for statement by statement.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "For each scenario, name the most suitable translator and justify it: distributing a finished game; testing a beginner's program interactively; translating assembly language.",
    answer: "For distributing a finished game, a compiler is suitable because it can produce executable/object code and users do not need the source code. For testing a beginner's program interactively, an interpreter is suitable because it translates and executes statements one at a time, helping locate errors during development. For translating assembly language, an assembler is suitable because it converts assembly mnemonics into machine code for the processor.",
    marking: [
      { mark: "B1", text: "compiler selected for distributing finished game" },
      { mark: "B1", text: "compiler justification linked to executable/object code or source code not needed" },
      { mark: "B1", text: "interpreter selected for interactive testing" },
      { mark: "B1", text: "interpreter justification linked to statement-by-statement execution or debugging" },
      { mark: "B1", text: "assembler selected for assembly language" },
      { mark: "B1", text: "assembler justification linked to mnemonics or machine code output" },
    ],
    strict: [
      "Do not award selection mark if the translator is matched to the wrong scenario.",
      "Do not accept 'compiler is faster' alone without deployment or translation context.",
      "Allow low-level assembly code as assembly language.",
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
    machine: "Correct. High-level source code must be translated into machine code before the processor can execute it.",
    english: "No. PRINT is readable to humans, but the processor executes machine code instructions.",
    assembler: "No. An assembler translates assembly language, not high-level source code such as PRINT statements.",
    os: "No. The operating system provides services, but translator software converts program code.",
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
  renderExample("compiler");
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
