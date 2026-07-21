const skeletons = {
  pass: {
    title: "Count pass marks in an array",
    code: "PassCount <- 0\nFOR Index <- 1 TO 10\n    INPUT Marks[Index]\n    IF Marks[Index] >= 50 THEN\n        PassCount <- PassCount + 1\n    ENDIF\nNEXT Index\nOUTPUT PassCount",
    checks: ["counter initialised", "loop bounds match 10 marks", "array index consistent", "count updated only for passes", "final output after loop"],
  },
  valid: {
    title: "Input a valid mark",
    code: "REPEAT\n    INPUT Mark\n    IF Mark >= 0 AND Mark <= 100 THEN\n        Valid <- TRUE\n    ELSE\n        OUTPUT \"Enter a mark from 0 to 100\"\n        Valid <- FALSE\n    ENDIF\nUNTIL Valid = TRUE",
    checks: ["input occurs inside loop", "lower and upper bounds checked", "error message is useful", "loop stops when valid"],
  },
  file: {
    title: "Read and output every file line",
    code: "OPENFILE \"Scores.txt\" FOR READ\nWHILE NOT EOF(\"Scores.txt\")\n    READFILE \"Scores.txt\", Line\n    OUTPUT Line\nENDWHILE\nCLOSEFILE \"Scores.txt\"",
    checks: ["file opened for read", "EOF used safely", "record read inside loop", "file closed after loop"],
  },
};

const checklist = [
  "Have I initialised counters/totals before using them?",
  "Do loop bounds match the question exactly?",
  "Are array indexes consistent?",
  "Does every IF have a clear condition and ending?",
  "Are subroutine parameters and return values clear?",
  "Is file handling opened, processed and closed?",
  "Is Java syntax removed from the pseudocode answer?",
  "Can the fragment be traced with a small example?",
];

const examples = {
  pass: {
    title: "Example 1: Pass counter",
    code: skeletons.pass.code,
    marks: [
      ["B1", "PassCount initialised to 0"],
      ["M1", "FOR loop processes all 10 marks"],
      ["M1", "IF tests pass condition"],
      ["A1", "PassCount increments inside correct branch"],
      ["A1", "outputs final PassCount after loop"],
    ],
  },
  max: {
    title: "Example 2: Highest mark",
    code: "Highest <- Marks[1]\nFOR Index <- 2 TO 10\n    IF Marks[Index] > Highest THEN\n        Highest <- Marks[Index]\n    ENDIF\nNEXT Index\nOUTPUT Highest",
    marks: [
      ["B1", "Highest initialised to a real array value"],
      ["M1", "loop starts after initial value"],
      ["M1", "compares current element with Highest"],
      ["A1", "updates Highest correctly"],
      ["A1", "outputs Highest after loop"],
    ],
  },
  file: {
    title: "Example 3: File output",
    code: skeletons.file.code,
    marks: [
      ["B1", "OPENFILE uses FOR READ"],
      ["M1", "WHILE NOT EOF loop used"],
      ["M1", "READFILE reads into variable"],
      ["B1", "outputs line read"],
      ["A1", "CLOSEFILE after loop"],
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Which variable should be initialised before counting pass marks?", accepted: ["passcount", "pass count", "counter"], answer: "PassCount / counter should be initialised before the loop." },
  { id: "p2", prompt: "For 10 array items using 1-based indexing, write the loop range.", accepted: ["1 to 10"], answer: "FOR Index <- 1 TO 10." },
  { id: "p3", prompt: "Which construct is used to choose between pass and fail branches?", accepted: ["if", "selection"], answer: "IF / selection." },
  { id: "p4", prompt: "Which file function prevents reading beyond the end of a file?", accepted: ["eof"], answer: "EOF." },
  { id: "p5", prompt: "Which command should finish a file handling fragment?", accepted: ["closefile"], answer: "CLOSEFILE." },
  { id: "p6", prompt: "Which subroutine type returns a value?", accepted: ["function"], answer: "FUNCTION." },
  { id: "p7", prompt: "Which subroutine type performs actions but does not need to return a value?", accepted: ["procedure"], answer: "PROCEDURE." },
  { id: "p8", prompt: "Where should an average usually be calculated: inside or after the total loop?", accepted: ["after"], answer: "After the total loop, once the final Total is known." },
  { id: "p9", prompt: "What should be removed from a Cambridge pseudocode answer: Java braces or algorithm logic?", accepted: ["braces"], answer: "Remove Java braces; keep the algorithm logic." },
  { id: "p10", prompt: "What quick method checks a fragment's variable values step by step?", accepted: ["trace", "trace table"], answer: "A trace / trace table." },
];

const mistakes = [
  {
    wrong: "A fragment increments PassCount but never initialises it.",
    fix: "Add PassCount <- 0 before the loop so the counter has a defined starting value.",
  },
  {
    wrong: "A fragment reads Marks[Index] after testing Marks[Index] >= 50.",
    fix: "Input or assign Marks[Index] before using it in a condition.",
  },
  {
    wrong: "A file loop uses READFILE but never closes the file.",
    fix: "Add CLOSEFILE after the EOF loop.",
  },
  {
    wrong: "A review answer mixes Java braces with Cambridge pseudocode keywords.",
    fix: "Use Cambridge-style structure consistently: IF...THEN...ENDIF, FOR...NEXT, FUNCTION...ENDFUNCTION.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "6 marks",
    prompt: "Write pseudocode to input 10 marks into an array and output how many marks are 50 or above.",
    answer: "PassCount <- 0\nFOR Index <- 1 TO 10\n    INPUT Marks[Index]\n    IF Marks[Index] >= 50 THEN\n        PassCount <- PassCount + 1\n    ENDIF\nNEXT Index\nOUTPUT PassCount",
    marking: [
      { mark: "B1", text: "initialises PassCount/counter to 0" },
      { mark: "M1", text: "uses loop to process 10 marks" },
      { mark: "M1", text: "inputs each mark into an array element or equivalent variable" },
      { mark: "M1", text: "tests each mark against 50 or above" },
      { mark: "A1", text: "increments counter only for pass marks" },
      { mark: "A1", text: "outputs the final counter after the loop" },
    ],
    strict: [
      "Do not award final output mark if output occurs only inside the loop.",
      "Allow processing without storing in array if the question wording allows, but here array storage is required for full marks.",
      "Do not accept Java-only syntax as Cambridge pseudocode.",
    ],
  },
  {
    title: "Question 2",
    marks: "7 marks",
    prompt: "Write pseudocode to input valid marks from 0 to 100 until a valid mark is entered.",
    answer: "REPEAT\n    INPUT Mark\n    IF Mark >= 0 AND Mark <= 100 THEN\n        Valid <- TRUE\n    ELSE\n        OUTPUT \"Enter a mark from 0 to 100\"\n        Valid <- FALSE\n    ENDIF\nUNTIL Valid = TRUE",
    marking: [
      { mark: "B1", text: "uses a loop that can repeat after invalid input" },
      { mark: "B1", text: "inputs Mark inside the loop" },
      { mark: "M1", text: "checks Mark >= 0 or equivalent lower bound" },
      { mark: "M1", text: "checks Mark <= 100 or equivalent upper bound" },
      { mark: "A1", text: "sets a valid flag or exits only when both checks pass" },
      { mark: "B1", text: "outputs useful error message for invalid data" },
      { mark: "A1", text: "loop condition correctly repeats until valid" },
    ],
    strict: [
      "Do not award both bound marks if OR is used incorrectly for the valid condition.",
      "Allow WHILE structure if it safely repeats until valid.",
      "Do not accept validation after the mark has already been processed.",
    ],
  },
  {
    title: "Question 3",
    marks: "6 marks",
    prompt: "Write pseudocode to read every line from Scores.txt and output each line.",
    answer: "OPENFILE \"Scores.txt\" FOR READ\nWHILE NOT EOF(\"Scores.txt\")\n    READFILE \"Scores.txt\", Line\n    OUTPUT Line\nENDWHILE\nCLOSEFILE \"Scores.txt\"",
    marking: [
      { mark: "B1", text: "opens Scores.txt using OPENFILE" },
      { mark: "A1", text: "uses FOR READ mode" },
      { mark: "M1", text: "uses WHILE NOT EOF or equivalent safe EOF loop" },
      { mark: "M1", text: "reads each line/record with READFILE" },
      { mark: "B1", text: "outputs the line/record read" },
      { mark: "A1", text: "closes the file after the loop" },
    ],
    strict: [
      "Do not award READ mode mark for WRITE or APPEND.",
      "Allow equivalent variable and file names if consistent.",
      "Do not require Java file classes.",
    ],
  },
  {
    title: "Question 4",
    marks: "3 marks",
    prompt: "A student writes a fragment with Total <- Total + Mark inside a loop but does not initialise Total. Explain the problem and correct it.",
    answer: "Total has no defined starting value before it is used, so the accumulated result may be wrong. Add Total <- 0 once before the loop.",
    marking: [
      { mark: "B1", text: "identifies Total is not initialised" },
      { mark: "B1", text: "explains an undefined/previous value may affect the result" },
      { mark: "B1", text: "adds Total <- 0 before the loop" },
    ],
    strict: [
      "Do not award correction mark if Total is initialised inside the loop each iteration.",
      "Allow Sum instead of Total if consistent.",
      "Do not accept 'the program crashes' as the only explanation.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "Give three checks you should perform when reviewing a complete Section 11 pseudocode fragment.",
    answer: "Check that counters and totals are initialised before use so their values are defined. Check that loop bounds and array indexes match the declaration so every valid element is processed without an out-of-range access. Check that selections, loops, files and subroutines are closed correctly so the intended control flow is unambiguous.",
    marking: [
      { mark: "B1", text: "checks that counters/totals/variables are initialised before use" },
      { mark: "B1", text: "explains initialisation gives each variable a defined starting value" },
      { mark: "B1", text: "checks loop bounds and array indexes against the declaration" },
      { mark: "B1", text: "explains this processes all valid elements without out-of-range access" },
      { mark: "B1", text: "checks constructs are closed correctly, e.g. ENDIF, NEXT, CLOSEFILE or subroutine ending" },
      { mark: "B1", text: "explains correct closure preserves the intended control flow or file operation" },
    ],
    strict: [
      "Accept any three relevant checks; award the second mark for each only when its purpose or consequence is explained.",
      "Allow trace table as a review check if linked to variable values.",
      "Do not award vague 'check it works' without saying what is checked.",
    ],
  },
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalise(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function setupPrint() {
  document.querySelector("#printBtn").addEventListener("click", () => window.print());
}

function setupHook() {
  const feedback = document.querySelector("#hookFeedback");
  const messages = {
    database: { text: "This is Paper 1 database thinking, not the program fragment toolbox.", correct: false },
    array: { text: "Correct. The task needs an array, a loop and an IF condition.", correct: true },
    file: { text: "File handling is useful elsewhere, but this task does not mention a file.", correct: false },
    html: { text: "No HTML needed. Stay in Cambridge pseudocode.", correct: false },
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      const result = messages[button.dataset.hook];
      feedback.textContent = result.text;
      feedback.className = `feedback ${result.correct ? "correct" : "incorrect"}`;
    });
  });
}

function setupBuilder() {
  const select = document.querySelector("#scenarioSelect");
  const output = document.querySelector("#builderOutput");
  const render = () => {
    const item = skeletons[select.value];
    output.innerHTML = `
      <h3>${escapeHtml(item.title)}</h3>
      <pre><code>${escapeHtml(item.code)}</code></pre>
      <ul>${item.checks.map((check) => `<li>${escapeHtml(check)}</li>`).join("")}</ul>
    `;
  };
  document.querySelector("#buildBtn").addEventListener("click", render);
  select.addEventListener("change", render);
  render();
}

function setupChecklist() {
  document.querySelector("#checklistOutput").innerHTML = checklist.map((item, index) => `
    <label class="check-item">
      <input type="checkbox" />
      <span><strong>${index + 1}.</strong> ${escapeHtml(item)}</span>
    </label>
  `).join("");
}

function renderExample(key) {
  const example = examples[key];
  document.querySelector("#exampleOutput").innerHTML = `
    <article class="example-card">
      <h3>${escapeHtml(example.title)}</h3>
      <pre><code>${escapeHtml(example.code)}</code></pre>
      <div class="data-table two-col">
        <div class="table-row table-head"><div>Mark</div><div>Why it earns credit</div></div>
        ${example.marks.map((row) => `<div class="table-row"><div>${escapeHtml(row[0])}</div><div>${escapeHtml(row[1])}</div></div>`).join("")}
      </div>
    </article>
  `;
}

function setupExamples() {
  document.querySelectorAll("[data-example]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-example]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderExample(button.dataset.example);
    });
  });
  renderExample("pass");
}

function setupPractice() {
  const container = document.querySelector("#practiceList");
  container.innerHTML = practice.map((item, index) => `
    <article class="practice-card">
      <label for="${item.id}"><strong>${index + 1}.</strong> ${escapeHtml(item.prompt)}</label>
      <div class="practice-row">
        <input id="${item.id}" type="text" autocomplete="off" />
        <button class="check-btn" type="button" data-check="${item.id}">Check</button>
        <button class="answer-toggle" type="button" data-answer="${item.id}">Show answer</button>
      </div>
      <div class="feedback" id="${item.id}-feedback" aria-live="polite"></div>
      <div class="answer-panel hidden" id="${item.id}-answer">${escapeHtml(item.answer)}</div>
    </article>
  `).join("");

  document.querySelectorAll("[data-check]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = practice.find((entry) => entry.id === button.dataset.check);
      const input = document.querySelector(`#${item.id}`);
      const feedback = document.querySelector(`#${item.id}-feedback`);
      const value = normalise(input.value);
      const correct = item.accepted.some((answer) => value.includes(answer));
      feedback.textContent = correct ? "Correct." : "Not quite. Reveal the answer and compare the Section 11 logic.";
      feedback.className = `feedback ${correct ? "correct" : "incorrect"}`;
    });
  });

  document.querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#${button.dataset.answer}-answer`);
      const hidden = panel.classList.toggle("hidden");
      button.textContent = hidden ? "Show answer" : "Hide answer";
    });
  });
}

function setupMistakes() {
  const container = document.querySelector("#mistakeList");
  container.innerHTML = mistakes.map((item, index) => `
    <article>
      <h3>Mistake ${index + 1}</h3>
      <p>${escapeHtml(item.wrong)}</p>
      <button class="answer-toggle" type="button" data-fix="m${index}">Show correction</button>
      <div class="answer-panel hidden" id="m${index}-fix">${escapeHtml(item.fix)}</div>
    </article>
  `).join("");

  document.querySelectorAll("[data-fix]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#${button.dataset.fix}-fix`);
      const hidden = panel.classList.toggle("hidden");
      button.textContent = hidden ? "Show correction" : "Hide correction";
    });
  });
}

function setupExam() {
  const container = document.querySelector("#examList");
  container.innerHTML = examQuestions.map((question, index) => `
    <article class="exam-card">
      <div class="exam-head">
        <h3>${escapeHtml(question.title)}</h3>
        <span>${escapeHtml(question.marks)}</span>
      </div>
      <p>${escapeHtml(question.prompt)}</p>
      <button class="ms-toggle" type="button" data-ms="q${index}">Show MS</button>
      <div class="ms-panel hidden" id="q${index}-ms">
        <h4>Answer</h4>
        <pre><code>${escapeHtml(question.answer)}</code></pre>
        <h4>Mark scheme</h4>
        <ul>${question.marking.map((row) => `<li><strong>${escapeHtml(row.mark)}</strong> ${escapeHtml(row.text)}</li>`).join("")}</ul>
        <h4>Strict notes</h4>
        <ul>${question.strict.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}</ul>
      </div>
    </article>
  `).join("");

  document.querySelectorAll("[data-ms]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#${button.dataset.ms}-ms`);
      const hidden = panel.classList.toggle("hidden");
      button.textContent = hidden ? "Show MS" : "Hide MS";
    });
  });
}

function init() {
  setupPrint();
  setupHook();
  setupBuilder();
  setupChecklist();
  setupExamples();
  setupPractice();
  setupMistakes();
  setupExam();
}

init();
