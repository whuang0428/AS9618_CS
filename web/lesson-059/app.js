const scenarioMap = {
  missing: {
    result: "Most likely: syntax error.",
    method: "The translator has found invalid grammar or structure, such as a missing bracket or keyword.",
    trap: "Do not call this a logic error because the program has not successfully run and produced a wrong result.",
  },
  double: {
    result: "Most likely: logic error.",
    method: "The program runs but the algorithm or formula is wrong, so the output is incorrect.",
    trap: "Do not call this a runtime error if the program completes without crashing.",
  },
  zero: {
    result: "Most likely: runtime error.",
    method: "Division by zero occurs while the program is executing and may cause a crash or exception.",
    trap: "Do not call it syntax if the expression is grammatically valid but fails for a value at run time.",
  },
  file: {
    result: "Most likely: runtime error.",
    method: "A missing file is an external condition that causes failure while the program is running.",
    trap: "Do not assume the translator can always know at translation time whether a file will exist later.",
  },
  offbyone: {
    result: "Most likely: logic error.",
    method: "An off-by-one loop condition is usually legal code that runs but gives the wrong number of iterations.",
    trap: "Do not classify every loop problem as runtime; look at whether it crashes or gives the wrong result.",
  },
  line: {
    result: "Diagnostic limitation.",
    method: "A translator diagnostic may point near the error, not always exactly at the original cause.",
    trap: "Do not assume the reported line is always the line that must be edited.",
  },
};

const examples = {
  syntax: {
    title: "Example 1: Syntax error",
    problem: "IF score > 50 PRINT \"pass\" has a missing THEN in a language that requires THEN.",
    steps: [
      "The statement does not follow the grammar rules of the language.",
      "The translator/parser can detect the invalid statement structure.",
      "The program may not translate or execute successfully until the syntax is corrected.",
      "A diagnostic might report an expected keyword near the IF statement.",
    ],
  },
  logic: {
    title: "Example 2: Logic error",
    problem: "A program calculates average = total / 4 even when there are 5 values.",
    steps: [
      "The expression is syntactically valid.",
      "The program can run without crashing.",
      "The result is wrong because the algorithm uses the wrong divisor.",
      "Testing with known data or tracing variable values can reveal the fault.",
    ],
  },
  runtime: {
    title: "Example 3: Runtime error",
    problem: "A program calculates total / count and count is 0 for one input set.",
    steps: [
      "The expression may be syntactically valid.",
      "The fault appears while the program is executing with a particular value.",
      "Division by zero can cause the program to halt, crash or raise an exception.",
      "Validation could prevent count from being 0 before division.",
    ],
  },
  diagnostic: {
    title: "Example 4: Translation diagnostic",
    problem: "A compiler reports: line 12, expected ')' before ';'.",
    steps: [
      "The message gives a location and expected symbol, which helps the programmer search for the fault.",
      "The real cause may be earlier than the reported line, especially with missing brackets.",
      "A compiler may report several errors after a translation attempt.",
      "An interpreter may stop at or near the statement currently being translated and executed.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Which error type breaks the grammar rules of a programming language?", accepted: ["syntax", "syntax error"], answer: "Syntax error" },
  { id: "p2", prompt: "Which error type allows a program to run but gives the wrong result?", accepted: ["logic", "logic error", "logical"], answer: "Logic error" },
  { id: "p3", prompt: "Which error type occurs while the program is executing?", accepted: ["runtime", "run time", "runtime error", "run-time"], answer: "Runtime error" },
  { id: "p4", prompt: "Classify: missing closing bracket.", accepted: ["syntax", "syntax error"], answer: "Syntax error" },
  { id: "p5", prompt: "Classify: division by zero when a user enters 0.", accepted: ["runtime", "run time", "runtime error", "run-time"], answer: "Runtime error" },
  { id: "p6", prompt: "Classify: program uses the wrong formula but does not crash.", accepted: ["logic", "logic error"], answer: "Logic error" },
  { id: "p7", prompt: "What information might a diagnostic message provide?", accepted: ["line", "line number", "error type", "expected", "message", "location", "token"], answer: "Line/location, error type, unexpected token or expected symbol" },
  { id: "p8", prompt: "Does successful compilation prove a program has no logic errors? Answer yes or no.", accepted: ["no"], answer: "No" },
  { id: "p9", prompt: "Which translator may stop at the statement currently being executed?", accepted: ["interpreter"], answer: "Interpreter" },
  { id: "p10", prompt: "Name one method for finding logic errors.", accepted: ["testing", "trace", "tracing", "dry run", "test data", "debugging"], answer: "Testing with known data, tracing or debugging" },
];

const mistakes = [
  {
    wrong: "A logic error is detected automatically by the compiler because the answer is wrong.",
    fix: "A compiler can detect grammar and some translation errors, but it usually cannot know the intended algorithm. Logic errors are often found by testing or tracing.",
  },
  {
    wrong: "Division by zero is always a syntax error.",
    fix: "The expression may be valid grammar. If the failure happens while executing with a zero value, it is a runtime error.",
  },
  {
    wrong: "A runtime error means the program gives the wrong output.",
    fix: "A runtime error occurs while the program runs and may halt or crash. Wrong output without crashing is usually a logic error.",
  },
  {
    wrong: "The diagnostic line number is always exactly where the original fault was typed.",
    fix: "A diagnostic points to where the translator noticed a problem. The cause may be earlier, such as a missing bracket on a previous line.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "5 marks",
    prompt: "Describe syntax, logic and runtime errors.",
    answer: "A syntax error occurs when code breaks the grammar rules of the programming language, such as a missing bracket or invalid statement structure. A logic error occurs when the program runs but the algorithm is wrong, so the output is incorrect. A runtime error occurs while the program is executing, for example division by zero or file not found, and may cause the program to halt or raise an exception.",
    marking: [
      { mark: "B1", text: "syntax error linked to grammar/language rule violation" },
      { mark: "M1", text: "valid syntax example such as missing bracket/keyword or invalid structure" },
      { mark: "B1", text: "logic error linked to program running but wrong result/algorithm" },
      { mark: "B1", text: "runtime error linked to failure during execution" },
      { mark: "A1", text: "valid runtime example or consequence such as crash/exception" },
    ],
    strict: [
      "Do not accept 'syntax means spelling mistake' unless grammar of code is clear.",
      "Do not accept logic error as a crash unless wrong-result behaviour is also described.",
      "Allow run-time as runtime.",
      "FT: award examples independently if the category definition is slightly weak but technically consistent.",
    ],
  },
  {
    title: "Question 2",
    marks: "4 marks",
    prompt: "A program runs without crashing but calculates discounts incorrectly. Explain the most likely error type.",
    answer: "This is most likely a logic error. The program can be translated and executed, so the syntax is likely valid and it is not failing during execution. The problem is that the algorithm, formula or condition used to calculate the discount is wrong. The error would usually be found by testing with known input and expected output or by tracing the calculation.",
    marking: [
      { mark: "B1", text: "logic error identified" },
      { mark: "M1", text: "program runs/does not crash or can execute" },
      { mark: "B1", text: "output/calculation/result is incorrect due to algorithm/formula/condition" },
      { mark: "A1", text: "testing/tracing/expected output comparison used to find it" },
    ],
    strict: [
      "Do not award identification mark for runtime error in this scenario.",
      "Do not accept 'computer mistake' without program logic cause.",
      "Allow wrong formula as algorithm error.",
      "FT: if candidate says logical error, treat as logic error.",
    ],
  },
  {
    title: "Question 3",
    marks: "4 marks",
    prompt: "Explain how translation diagnostics help a programmer correct errors.",
    answer: "Translation diagnostics are messages produced by a compiler or interpreter to describe errors found during translation or execution of statements. They may include the line number, error type, unexpected token or expected symbol. This helps the programmer locate the part of the source code that needs checking. However, the reported location may be near the problem rather than the exact cause, for example after a missing bracket.",
    marking: [
      { mark: "B1", text: "diagnostics are messages/reports from compiler/interpreter/translator" },
      { mark: "M1", text: "include useful detail such as line number/location/error type/token/expected symbol" },
      { mark: "B1", text: "help programmer locate or correct the source of error" },
      { mark: "A1", text: "limitation stated, such as location may not be exact or may be near the cause" },
    ],
    strict: [
      "Do not accept 'it fixes the code automatically' as diagnostic purpose.",
      "Do not require all listed details; one valid detail is enough for M1.",
      "Allow error message for diagnostic message.",
      "FT: award limitation mark if a realistic diagnostic limitation is described.",
    ],
  },
  {
    title: "Question 4",
    marks: "5 marks",
    prompt: "Compare how a compiler and an interpreter may report errors.",
    answer: "A compiler translates the whole program before execution and may produce a list of errors after attempting compilation. The programmer may need to correct errors before the program can run. An interpreter translates and executes statements as the program runs and may stop at or near the statement where an error is found. This can give immediate feedback during development, but it may only reveal later errors when execution reaches those statements.",
    marking: [
      { mark: "B1", text: "compiler translates/checks whole program before execution" },
      { mark: "M1", text: "compiler may produce a list of errors after compilation attempt" },
      { mark: "B1", text: "interpreter translates/executes statement by statement" },
      { mark: "M1", text: "interpreter may stop at/near current statement with immediate error feedback" },
      { mark: "A1", text: "valid consequence such as later errors found only when reached or development usefulness" },
    ],
    strict: [
      "Do not accept 'compiler finds all errors' because logic errors may remain.",
      "Do not accept 'interpreter has no errors' as a comparison.",
      "Allow line by line for statement by statement.",
      "FT: award comparative consequence if both translator behaviours are at least partly correct.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "Classify each error and justify it: missing ENDIF; array index outside the valid range while running; using < instead of <= so the final item is skipped.",
    answer: "A missing ENDIF is a syntax error because the program structure does not follow the grammar rules for the selection statement. An array index outside the valid range while running is a runtime error because the program fails during execution for a particular value or state. Using < instead of <= so the final item is skipped is a logic error because the code may run without crashing, but the algorithm gives the wrong result.",
    marking: [
      { mark: "B1", text: "missing ENDIF classified as syntax error" },
      { mark: "M1", text: "syntax justification linked to grammar/structure/selection statement" },
      { mark: "B1", text: "array index outside range while running classified as runtime error" },
      { mark: "M1", text: "runtime justification linked to failure during execution/value at run time" },
      { mark: "B1", text: "< instead of <= final item skipped classified as logic error" },
      { mark: "A1", text: "logic justification linked to valid running code but wrong algorithm/result" },
    ],
    strict: [
      "Do not award justification mark for repeating only the category name.",
      "Do not classify skipped final item as syntax if the expression is valid code.",
      "Allow out-of-bounds for array index outside valid range.",
      "FT: award each classification and justification independently.",
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
    logic: "Correct. It runs, but the algorithm or formula is wrong.",
    syntax: "No. A syntax error would break grammar and usually be caught before successful running.",
    runtime: "No. A runtime error happens during execution and may halt or crash the program.",
    linker: "No. Linker errors involve unresolved references after object code, not a wrong bill formula.",
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
  renderExample("syntax");
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
