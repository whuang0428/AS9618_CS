const scenarioMap = {
  tokenise: {
    result: "Stage: lexical analysis.",
    method: "Lexical analysis scans source-code characters and groups them into tokens such as identifiers, keywords, operators and literals.",
    trap: "Do not call this syntax analysis; syntax uses the tokens to check grammar.",
  },
  grammar: {
    result: "Stage: syntax analysis.",
    method: "Syntax analysis checks whether the sequence of tokens follows the grammar rules of the programming language.",
    trap: "Do not call every compiler error a syntax error; type and scope errors are semantic.",
  },
  type: {
    result: "Stage: semantic analysis.",
    method: "Semantic analysis checks meaning, including type compatibility, declarations and valid operations.",
    trap: "Do not call this lexical analysis; the tokens may be valid even when the meaning is invalid.",
  },
  symbol: {
    result: "Compiler structure: symbol table, used during semantic analysis.",
    method: "A symbol table records identifiers and information such as type, scope and memory location.",
    trap: "Do not describe the symbol table as the final object code.",
  },
  target: {
    result: "Stage: code generation.",
    method: "Code generation converts the checked intermediate representation into target low-level/object code.",
    trap: "Do not mix this with linking or loading; those are separate steps after compilation.",
  },
  remove: {
    result: "Stage: optimisation.",
    method: "Optimisation improves efficiency, for example by removing unreachable code, while preserving program behaviour.",
    trap: "Do not say optimisation fixes the programmer's logic errors.",
  },
};

const examples = {
  lexical: {
    title: "Example 1: Lexical analysis",
    problem: "Source line: total = price + tax",
    steps: [
      "The source line is read as a stream of characters.",
      "The scanner groups characters into tokens such as identifier total, assignment operator, identifier price, plus operator and identifier tax.",
      "Comments and unnecessary whitespace may be removed.",
      "An invalid character at this stage could be reported as a lexical error.",
    ],
  },
  syntax: {
    title: "Example 2: Syntax analysis",
    problem: "Source line: IF total > 100 THEN discount = 10",
    steps: [
      "The parser receives tokens from lexical analysis.",
      "It checks the token sequence against grammar rules for an IF statement.",
      "It may build a parse tree or syntax tree representing the statement structure.",
      "A missing THEN, bracket or operator would be a syntax error because the grammar is invalid.",
    ],
  },
  semantic: {
    title: "Example 3: Semantic analysis",
    problem: "Source line: age = name + 1, where age is INTEGER and name is STRING.",
    steps: [
      "The statement may be grammatically valid because assignment and addition are in a legal structure.",
      "Semantic analysis checks meaning using information such as variable types.",
      "Adding a string to an integer in this context is invalid.",
      "The compiler can report a semantic/type error even though the syntax shape is correct.",
    ],
  },
  codegen: {
    title: "Example 4: Code generation and optimisation",
    problem: "A checked expression is ready to be converted into low-level instructions.",
    steps: [
      "After earlier checks, the compiler can generate target low-level instructions.",
      "The output is object code or an intermediate/target code form depending on the system.",
      "Optimisation may remove unreachable code or avoid repeated calculations.",
      "The next lesson handles linkers and loaders, so do not award those marks here unless asked.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Which compilation stage groups characters into tokens?", accepted: ["lexical", "lexical analysis"], answer: "Lexical analysis" },
  { id: "p2", prompt: "What is a token?", accepted: ["identifier", "keyword", "operator", "literal", "meaningful", "lexical unit"], answer: "A meaningful lexical unit such as an identifier, keyword, operator or literal" },
  { id: "p3", prompt: "Which stage checks grammar rules?", accepted: ["syntax", "syntax analysis", "parsing", "parser"], answer: "Syntax analysis / parsing" },
  { id: "p4", prompt: "Which stage checks type compatibility and declarations?", accepted: ["semantic", "semantic analysis"], answer: "Semantic analysis" },
  { id: "p5", prompt: "What compiler structure stores identifier names, types and scope?", accepted: ["symbol table"], answer: "Symbol table" },
  { id: "p6", prompt: "Which stage produces object code or target code?", accepted: ["code generation", "code generator", "generation"], answer: "Code generation" },
  { id: "p7", prompt: "What is the purpose of optimisation?", accepted: ["improve efficiency", "faster", "less memory", "reduce memory", "without changing behaviour", "without changing output"], answer: "To improve efficiency without changing intended program behaviour" },
  { id: "p8", prompt: "Is a missing bracket usually lexical, syntax or semantic?", accepted: ["syntax", "syntax error"], answer: "Syntax error" },
  { id: "p9", prompt: "Is using an undeclared variable usually lexical, syntax or semantic?", accepted: ["semantic", "semantic error"], answer: "Semantic error" },
  { id: "p10", prompt: "Do linkers and loaders belong to this lesson's main compilation stages? Answer yes or no.", accepted: ["no"], answer: "No. They are related later stages covered separately" },
];

const mistakes = [
  {
    wrong: "Lexical analysis checks whether the whole program follows grammar rules.",
    fix: "Lexical analysis turns character streams into tokens. Syntax analysis checks whether token sequences follow grammar rules.",
  },
  {
    wrong: "A semantic error means the code has a missing bracket.",
    fix: "A missing bracket is usually a syntax error. A semantic error involves invalid meaning, such as incompatible types or undeclared variables.",
  },
  {
    wrong: "The symbol table is the same as object code.",
    fix: "A symbol table stores information about identifiers for compiler checks. Object code is translated low-level output.",
  },
  {
    wrong: "Optimisation changes the algorithm so the answer becomes correct.",
    fix: "Optimisation aims to improve efficiency while preserving program behaviour. It does not automatically fix the programmer's logic.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "5 marks",
    prompt: "Describe the purpose of lexical analysis during compilation.",
    answer: "Lexical analysis reads the source code as a stream of characters and groups characters into tokens. Tokens may include identifiers, keywords, operators and constants/literals. The stage may remove unnecessary whitespace and comments. It can detect invalid characters or symbols before later compiler stages use the token stream.",
    marking: [
      { mark: "B1", text: "source code/characters are scanned or read" },
      { mark: "B1", text: "characters are grouped into tokens" },
      { mark: "B1", text: "valid token examples such as identifiers, keywords, operators or literals" },
      { mark: "B1", text: "comments/extra whitespace may be removed" },
      { mark: "B1", text: "valid lexical error or token stream output described" },
    ],
    strict: [
      "Do not accept grammar checking as lexical analysis.",
      "Do not award token mark for saying only 'splits code up' without meaningful units.",
      "Allow constants for literals.",
    ],
  },
  {
    title: "Question 2",
    marks: "4 marks",
    prompt: "Explain the difference between syntax analysis and semantic analysis.",
    answer: "Syntax analysis checks whether the sequence of tokens follows the grammar rules of the programming language, for example whether brackets or statement structure are valid. Semantic analysis checks the meaning of the program, such as whether variables have been declared, whether scope is valid and whether data types are compatible. A program can be syntactically correct but semantically invalid.",
    marking: [
      { mark: "B1", text: "syntax analysis checks grammar/structure of token sequence" },
      { mark: "B1", text: "valid syntax example such as brackets, expression form or statement structure" },
      { mark: "B1", text: "semantic analysis checks meaning/context" },
      { mark: "B1", text: "valid semantic example such as type compatibility, declarations or scope" },
    ],
    strict: [
      "Do not accept 'syntax is spelling and semantic is grammar' as a correct distinction.",
      "Do not require exact phrase token sequence if grammar checking is clear.",
      "Allow parse tree reference for syntax analysis.",
    ],
  },
  {
    title: "Question 3",
    marks: "5 marks",
    prompt: "Describe the role of a symbol table in compilation.",
    answer: "A symbol table stores information about identifiers used in a program. This may include variable or procedure names, data types, scope and memory location/address information. The compiler can use the symbol table during semantic analysis to check whether identifiers have been declared and whether operations use compatible types. It is not the same as the object code output.",
    marking: [
      { mark: "B1", text: "stores information about identifiers/names" },
      { mark: "B1", text: "valid stored item such as type, scope, address/location or kind of identifier" },
      { mark: "B1", text: "used by compiler during checking/semantic analysis" },
      { mark: "B1", text: "checks declarations or undeclared identifiers" },
      { mark: "B1", text: "checks type compatibility and/or identifier scope" },
    ],
    strict: [
      "Do not accept 'stores all the program code' as symbol table role.",
      "Do not award address/location mark unless linked to identifier information.",
      "Allow variable table if identifier information is clearly described.",
    ],
  },
  {
    title: "Question 4",
    marks: "5 marks",
    prompt: "Explain how a compiler can produce object code after checking source code.",
    answer: "The compiler first performs lexical analysis to convert source-code characters into tokens. Syntax analysis then checks whether the token sequence follows the grammar rules. Semantic analysis checks meaning, such as declarations and type compatibility, often using a symbol table. If the checks allow compilation to continue, code generation produces object or target code. Optimisation may improve efficiency without changing the program's behaviour.",
    marking: [
      { mark: "B1", text: "lexical analysis produces tokens from source code" },
      { mark: "B1", text: "syntax analysis checks grammar/structure" },
      { mark: "B1", text: "semantic analysis checks meaning/types/declarations/scope" },
      { mark: "B1", text: "code generation produces object/target code" },
      { mark: "B1", text: "optimisation may improve efficiency without changing program behaviour" },
    ],
    strict: [
      "Do not award code generation mark for linker/loader descriptions.",
      "Do not require every compiler implementation to use identical internal stages.",
      "Allow parse tree/intermediate representation as part of the explanation.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "Classify each compiler issue as lexical, syntax or semantic and justify: an invalid character @ in an identifier; a missing ENDIF; adding a STRING value to an INTEGER variable.",
    answer: "An invalid character @ in an identifier is a lexical issue because lexical analysis recognises valid tokens and characters. A missing ENDIF is a syntax issue because the token sequence does not match the grammar of the control structure. Adding a STRING value to an INTEGER variable is a semantic issue because the statement may have a valid grammatical form but the meaning/type compatibility is invalid.",
    marking: [
      { mark: "B1", text: "invalid @ classified as lexical" },
      { mark: "B1", text: "lexical justification linked to invalid character/token recognition" },
      { mark: "B1", text: "missing ENDIF classified as syntax" },
      { mark: "B1", text: "syntax justification linked to grammar/statement structure" },
      { mark: "B1", text: "STRING to INTEGER classified as semantic" },
      { mark: "B1", text: "semantic justification linked to type compatibility/meaning" },
    ],
    strict: [
      "Do not award justification mark for repeating the stage name only.",
      "Do not accept semantic for missing ENDIF unless a clear language-specific context justifies it.",
      "Allow 'parsing error' for syntax issue.",
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
    tokens: "Correct. Lexical analysis groups source-code characters into tokens before grammar checking.",
    run: "No. A compiler checks and translates before the program can be executed as machine-level code.",
    link: "No. Linking happens after object code exists and is not the first compilation stage here.",
    load: "No. Loading is about placing executable code into memory, after compilation/linking.",
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
  renderExample("lexical");
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
