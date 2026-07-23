const constructScenarios = {
  pass: {
    construct: "Selection using IF",
    reason: "The program chooses between two paths depending on a condition such as Mark greater than or equal to 50.",
    examTip: "Include ELSE and ENDIF so the branch is complete.",
  },
  scores: {
    construct: "Iteration using FOR",
    reason: "The number of repetitions is known before the loop starts: exactly 30 scores.",
    examTip: "Check loop bounds carefully; 1 to 30 gives 30 iterations.",
  },
  menu: {
    construct: "Selection using CASE",
    reason: "A menu has several discrete choices, so CASE is clearer than many separate IF statements.",
    examTip: "Include OTHERWISE for invalid choices.",
  },
  valid: {
    construct: "Iteration using REPEAT UNTIL",
    reason: "The prompt should appear at least once, then repeat until the input is valid.",
    examTip: "Make sure the condition eventually becomes true, or the loop may never stop.",
  },
};

const fileModes = {
  read: {
    mode: "READ",
    reason: "Use READ when existing records need to be read without changing the file.",
    pattern: 'OPENFILE "Scores.txt" FOR READ',
  },
  append: {
    mode: "APPEND",
    reason: "Use APPEND to add records to the end while preserving existing contents.",
    pattern: 'OPENFILE "Scores.txt" FOR APPEND',
  },
  write: {
    mode: "WRITE",
    reason: "Use WRITE when creating a new file or replacing file contents.",
    pattern: 'OPENFILE "Report.txt" FOR WRITE',
  },
  close: {
    mode: "CLOSEFILE",
    reason: "CLOSEFILE finishes file processing and ensures buffered changes are saved correctly.",
    pattern: 'CLOSEFILE "Scores.txt"',
  },
};

const examples = {
  loop: {
    title: "Example 1: Choosing a loop",
    rows: [
      ["Scenario", "Process exactly 30 scores."],
      ["Best construct", "FOR loop."],
      ["Reason", "The number of repetitions is known before the loop begins."],
      ["Exam point", "Use WHILE or REPEAT when the stopping condition depends on data or validation."],
    ],
  },
  function: {
    title: "Example 2: Function versus procedure",
    rows: [
      ["Task", "Check whether Mark is in the range 0 to 100."],
      ["Best subprogram", "FUNCTION IsValidMark(Mark) RETURNS BOOLEAN."],
      ["Reason", "The result TRUE or FALSE is returned and used by another part of the algorithm."],
      ["Exam point", "A function returns a value; OUTPUT only displays a value."],
    ],
  },
  file: {
    title: "Example 3: Appending to a file",
    rows: [
      ["Task", "Add a new quiz score without deleting old scores."],
      ["File mode", "APPEND."],
      ["Core steps", "OPENFILE for APPEND, WRITEFILE new score, CLOSEFILE."],
      ["Exam point", "WRITE may replace file contents, so it is not suitable for preserving old records."],
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Which construct chooses between paths based on a condition?", accepted: ["selection", "if", "case"], answer: "Selection, such as IF or CASE." },
  { id: "p2", prompt: "Which construct repeats statements?", accepted: ["iteration", "loop", "for", "while", "repeat"], answer: "Iteration / loop." },
  { id: "p3", prompt: "Which loop is best when the number of repetitions is known?", accepted: ["for"], answer: "FOR loop." },
  { id: "p4", prompt: "Which loop is useful when input must be requested at least once?", accepted: ["repeat", "repeat until"], answer: "REPEAT UNTIL." },
  { id: "p5", prompt: "Which subprogram type returns a value?", accepted: ["function"], answer: "Function." },
  { id: "p6", prompt: "Which subprogram type performs an action and may not return a value?", accepted: ["procedure"], answer: "Procedure." },
  { id: "p7", prompt: "Which file mode reads existing records without changing them?", accepted: ["read"], answer: "READ." },
  { id: "p8", prompt: "Which file mode adds records without deleting existing records?", accepted: ["append"], answer: "APPEND." },
  { id: "p9", prompt: "Which file mode may create or replace file contents?", accepted: ["write"], answer: "WRITE." },
  { id: "p10", prompt: "What statement should be used after file processing is finished?", accepted: ["closefile", "close"], answer: "CLOSEFILE." },
];

const mistakes = [
  {
    wrong: "A student uses WRITE when they need to add one score to the end of an existing file.",
    fix: "Correction: use APPEND. WRITE may create or replace file contents, while APPEND preserves existing records and adds new data at the end.",
  },
  {
    wrong: "A student writes a function that only OUTPUTs TRUE or FALSE.",
    fix: "Correction: a function should RETURN a value so it can be used by another expression or condition. OUTPUT only displays text.",
  },
  {
    wrong: "A student uses a WHILE loop for a fixed 1 to 30 count but forgets to update the counter.",
    fix: "Correction: use a FOR loop when the number of repetitions is known, or explicitly update the counter in a WHILE loop.",
  },
  {
    wrong: "A student opens a file but never closes it.",
    fix: "Correction: use CLOSEFILE after processing. This completes file handling and helps ensure changes are written safely.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "6 marks",
    prompt: "A program must process exactly 50 marks and count how many are passes. Describe a suitable algorithm using Cambridge-style constructs.",
    answer: "Set PassCount to 0. Use a FOR loop from 1 to 50. Input or read each Mark. If Mark is greater than or equal to 50, add 1 to PassCount. After the loop, output PassCount.",
    marking: [
      { mark: "B1", text: "initialises PassCount to 0" },
      { mark: "B1", text: "uses a suitable counted loop for 50 marks" },
      { mark: "B1", text: "inputs or reads each mark inside the loop" },
      { mark: "B1", text: "uses selection to test pass condition" },
      { mark: "B1", text: "increments PassCount only when condition is met" },
      { mark: "B1", text: "outputs PassCount after processing all marks" },
    ],
    strict: [
      "Do not award full marks for vague 'check all marks' without loop logic.",
      "Allow greater than or equal to 50 as pass condition unless a different threshold is stated.",
      "Do not require exact variable names.",
    ],
  },
  {
    title: "Question 2",
    marks: "5 marks",
    prompt: "Explain the difference between a procedure and a function, using a validation example.",
    answer: "A procedure is a named block of code that performs an action and does not have to return a value, for example displaying an error message. A function returns a value to the calling code, for example IsValidMark(Mark) returning TRUE if the mark is between 0 and 100 and FALSE otherwise. The returned Boolean can then be used in an IF statement.",
    marking: [
      { mark: "B1", text: "states a procedure performs an action or does not need to return a value" },
      { mark: "B1", text: "gives valid procedure example" },
      { mark: "B1", text: "states a function returns a value" },
      { mark: "B1", text: "gives valid function validation example" },
      { mark: "B1", text: "explains returned value can be used by calling code" },
    ],
    strict: [
      "Do not accept OUTPUT as equivalent to RETURN for a function.",
      "Allow Boolean, integer or string function examples if return value is clear.",
      "Do not require parameter syntax if concept is accurately explained.",
    ],
  },
  {
    title: "Question 3",
    marks: "6 marks",
    prompt: "Write the main file handling steps needed to display every line in Scores.txt.",
    answer: "Open Scores.txt for READ. Use a loop that continues while not at end of file. Read a line or record from the file. Output the line or record. After the loop, close the file.",
    marking: [
      { mark: "M1", text: "opens Scores.txt for READ" },
      { mark: "M1", text: "uses loop controlled by EOF or equivalent end-of-file condition" },
      { mark: "M1", text: "reads each line or record from the file" },
      { mark: "A1", text: "outputs each line or record read" },
      { mark: "M1", text: "continues until all records are processed" },
      { mark: "A1", text: "closes the file after processing" },
    ],
    strict: [
      "Do not award read mark if candidate writes to the file instead.",
      "Allow clear pseudocode using OPENFILE, READFILE, EOF and CLOSEFILE.",
      "Do not require exact filename quotes if filename is recognisable.",
    ],
  },
  {
    title: "Question 4",
    marks: "6 marks",
    prompt: "A new score must be added to the end of Scores.txt without deleting existing scores. Describe the file handling steps and justify the file mode.",
    answer: "Open Scores.txt for APPEND. Write the new score to the file using WRITEFILE. Close the file after writing. APPEND is used because it adds the new record to the end while preserving existing scores. WRITE would not be suitable if it replaces the current file contents.",
    marking: [
      { mark: "B1", text: "opens Scores.txt for APPEND" },
      { mark: "B1", text: "writes the new score to the file" },
      { mark: "B1", text: "closes the file after writing" },
      { mark: "B1", text: "justifies APPEND as adding to the end" },
      { mark: "B1", text: "states existing records are preserved" },
      { mark: "B1", text: "explains WRITE may create/replace contents or is unsuitable for this task" },
    ],
    strict: [
      "Do not accept READ as a valid mode for adding a new record.",
      "Allow wording 'add to end of file' for append justification.",
      "Do not require the exact word 'preserve' if meaning is clear.",
    ],
  },
  {
    title: "Question 5",
    marks: "7 marks",
    prompt: "A mark must be an integer from 0 to 100 inclusive. Describe a validation algorithm that repeatedly asks for input until the mark is valid.",
    answer: "Use a REPEAT UNTIL loop. Input Mark. If Mark is not an integer, or Mark is less than 0, or Mark is greater than 100, output an error message. Repeat until Mark is an integer and Mark is between 0 and 100 inclusive. The valid Mark can then be processed.",
    marking: [
      { mark: "B1", text: "uses a loop that can repeat until valid input is entered" },
      { mark: "B1", text: "inputs Mark inside the loop" },
      { mark: "B1", text: "checks type/integer validity or equivalent" },
      { mark: "B1", text: "checks lower boundary 0" },
      { mark: "B1", text: "checks upper boundary 100" },
      { mark: "B1", text: "outputs error or rejects invalid input" },
      { mark: "B1", text: "stops only when mark is valid and can then process the mark" },
    ],
    strict: [
      "Inclusive means 0 and 100 are valid.",
      "Allow WHILE loop if logic ensures repeated input until valid.",
      "Do not award both boundary marks for vague 'check range' unless limits are stated.",
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

function tableMarkup(rows) {
  return `
    <div class="data-table two-col">
      <div class="table-row table-head"><div>Focus</div><div>Detail</div></div>
      ${rows.map((row) => `<div class="table-row"><div>${escapeHtml(row[0])}</div><div>${escapeHtml(row[1])}</div></div>`).join("")}
    </div>
  `;
}

function setupPrint() {
  document.querySelector("#printBtn").addEventListener("click", () => window.print());
}

function setupHook() {
  const feedback = document.querySelector("#hookFeedback");
  const messages = {
    read: { text: "READ displays existing records but does not add the new score.", correct: false },
    write: { text: "WRITE may replace the file contents. Risky choice for preserving old scores.", correct: false },
    append: { text: "Correct. APPEND adds the new score to the end and preserves existing scores.", correct: true },
    close: { text: "CLOSEFILE is needed after processing, but it is not an opening mode for adding records.", correct: false },
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

function setupConstructTool() {
  const select = document.querySelector("#constructSelect");
  const output = document.querySelector("#constructOutput");
  const render = () => {
    const item = constructScenarios[select.value];
    output.innerHTML = `
      <p><strong>Construct:</strong> ${escapeHtml(item.construct)}</p>
      <p><strong>Reason:</strong> ${escapeHtml(item.reason)}</p>
      <p><strong>Exam tip:</strong> ${escapeHtml(item.examTip)}</p>
    `;
  };
  document.querySelector("#constructBtn").addEventListener("click", render);
  select.addEventListener("change", render);
  render();
}

function setupFileTool() {
  const select = document.querySelector("#fileSelect");
  const output = document.querySelector("#fileOutput");
  const render = () => {
    const item = fileModes[select.value];
    output.innerHTML = `
      <p><strong>Choice:</strong> ${escapeHtml(item.mode)}</p>
      <p><strong>Reason:</strong> ${escapeHtml(item.reason)}</p>
      <p><strong>Pattern:</strong> <code>${escapeHtml(item.pattern)}</code></p>
    `;
  };
  document.querySelector("#fileBtn").addEventListener("click", render);
  select.addEventListener("change", render);
  render();
}

function setupExamples() {
  const output = document.querySelector("#exampleOutput");
  const render = (key) => {
    const item = examples[key];
    output.innerHTML = `<h3>${escapeHtml(item.title)}</h3>${tableMarkup(item.rows)}`;
    document.querySelectorAll("[data-example]").forEach((button) => {
      button.classList.toggle("active", button.dataset.example === key);
    });
  };
  document.querySelectorAll("[data-example]").forEach((button) => {
    button.addEventListener("click", () => render(button.dataset.example));
  });
  render("loop");
}

function setupPractice() {
  const list = document.querySelector("#practiceList");
  list.innerHTML = practice.map((item, index) => `
    <article class="practice-card">
      <h3>Practice ${index + 1}</h3>
      <p>${escapeHtml(item.prompt)}</p>
      <div class="answer-row">
        <input id="${item.id}" type="text" autocomplete="off" aria-label="Answer for practice ${index + 1}" />
        <button class="check-btn" type="button" data-check="${item.id}">Check</button>
      </div>
      <div class="feedback" id="${item.id}-feedback" aria-live="polite">Enter an answer, then check.</div>
      <button class="answer-toggle" type="button" data-answer="${item.id}">Show answer</button>
      <div class="answer-panel hidden" id="${item.id}-answer">${escapeHtml(item.answer)}</div>
    </article>
  `).join("");

  document.querySelectorAll("[data-check]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = practice.find((entry) => entry.id === button.dataset.check);
      const input = document.querySelector(`#${item.id}`);
      const feedback = document.querySelector(`#${item.id}-feedback`);
      const response = normalise(input.value);
      const correct = item.accepted.some((accepted) => response.includes(accepted));
      feedback.textContent = correct ? "Correct or close enough for this short check." : "Not quite. Use the precise construct or file-handling keyword.";
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
  const list = document.querySelector("#mistakeList");
  list.innerHTML = mistakes.map((item, index) => `
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
  const list = document.querySelector("#examList");
  list.innerHTML = examQuestions.map((item, index) => `
    <article class="exam-card">
      <div class="exam-head">
        <h3>${escapeHtml(item.title)}</h3>
        <span>${escapeHtml(item.marks)}</span>
      </div>
      <p>${escapeHtml(item.prompt)}</p>
      <button class="ms-toggle" type="button" data-ms="q${index}">Show MS</button>
      <div class="ms-panel hidden" id="q${index}-ms">
        <h4>Indicative answer</h4>
        <p>${escapeHtml(item.answer)}</p>
        <h4>Mark scheme</h4>
        <ul>
          ${item.marking.map((mark) => `<li><strong>${escapeHtml(mark.mark)}</strong> ${escapeHtml(mark.text)}</li>`).join("")}
        </ul>
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
  setupConstructTool();
  setupFileTool();
  setupExamples();
  setupPractice();
  setupMistakes();
  setupExam();
}

document.addEventListener("DOMContentLoaded", init);
