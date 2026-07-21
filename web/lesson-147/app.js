const traces = {
  a: [40, 65, 50, 80],
  b: [55, 51, 49, 70],
  c: [50, 50, 50, 51],
};

const structures = {
  temps: {
    structure: "1D array",
    reason: "The values are the same type and can be accessed by position, such as day number.",
    trap: "Do not use a record unless each item needs different named fields.",
  },
  student: {
    structure: "Record",
    reason: "One student has related fields of different types, such as STRING name, STRING ID and INTEGER mark.",
    trap: "Do not split related fields into separate arrays unless the question requires it.",
  },
  undo: {
    structure: "Stack",
    reason: "The most recent action should be removed first, so it is last-in, first-out.",
    trap: "Do not use a queue for undo; a queue removes the oldest item first.",
  },
  printer: {
    structure: "Queue",
    reason: "The first print job added should be processed first, so it is first-in, first-out.",
    trap: "Do not pop the newest job first unless the scenario says priority or undo.",
  },
};

const examples = {
  trace: {
    title: "Example 1: Trace table reasoning",
    rows: [
      ["Algorithm rule", "Add Scores[Index] to Total only when score is greater than 50."],
      ["Scores", "40, 65, 50, 80"],
      ["Final Total", "145, because 65 and 80 are included; 50 is not greater than 50."],
      ["Exam point", "A trace table shows method and prevents off-by-one mistakes."],
    ],
  },
  structure: {
    title: "Example 2: Data structure justification",
    rows: [
      ["Scenario", "Store undo history for a text editor."],
      ["Choice", "Stack."],
      ["Reason", "The last action performed is the first action to be undone."],
      ["Exam point", "Name plus reason earns more than name alone."],
    ],
  },
  test: {
    title: "Example 3: Test data explanation",
    rows: [
      ["Rule", "Valid mark range is 0 to 100."],
      ["Normal", "75, expected accepted."],
      ["Boundary", "0 and 100 accepted; minus 1 and 101 rejected."],
      ["Abnormal", "text such as 'high', expected rejected with an error message."],
    ],
  },
};

const practice = [
  { id: "p1", prompt: "What table is used to dry run an algorithm?", accepted: ["trace"], answer: "Trace table." },
  { id: "p2", prompt: "Which pseudocode construct repeats statements?", accepted: ["iteration", "loop"], answer: "Iteration / loop." },
  { id: "p3", prompt: "Which data structure is last-in, first-out?", accepted: ["stack"], answer: "Stack." },
  { id: "p4", prompt: "Which data structure is first-in, first-out?", accepted: ["queue"], answer: "Queue." },
  { id: "p5", prompt: "Which structure is suitable for same-type values accessed by index?", accepted: ["array", "1d array"], answer: "Array / 1D array." },
  { id: "p6", prompt: "Which structure groups fields of different types for one item?", accepted: ["record"], answer: "Record." },
  { id: "p7", prompt: "What test data category checks the edge of a valid range?", accepted: ["boundary"], answer: "Boundary data." },
  { id: "p8", prompt: "What test data category is typical valid data?", accepted: ["normal"], answer: "Normal data." },
  { id: "p9", prompt: "What test data category uses invalid type or invalid value?", accepted: ["abnormal", "erroneous", "invalid"], answer: "Abnormal / erroneous data." },
  { id: "p10", prompt: "In Cambridge exams, should final algorithm answers normally use Java syntax? yes or no", accepted: ["no"], answer: "No. Cambridge pseudocode is the exam standard; Java is only support." },
];

const mistakes = [
  {
    wrong: "A student traces only the final output and skips intermediate variable values.",
    fix: "Correction: use a trace table with one row per relevant step or loop iteration. Intermediate values can earn method marks.",
  },
  {
    wrong: "A student says 'use a stack because it stores data'.",
    fix: "Correction: explain LIFO. For example, a stack suits undo because the most recent action is removed first.",
  },
  {
    wrong: "A student treats a score of 50 as greater than 50.",
    fix: "Correction: greater than 50 excludes 50. Greater than or equal to 50 would include it.",
  },
  {
    wrong: "A student gives test data but no expected result.",
    fix: "Correction: each test case needs expected output or expected behaviour, such as accepted, rejected or error message displayed.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "6 marks",
    prompt: "Trace an algorithm that adds scores greater than 50 from the list 40, 65, 50, 80. State the final value of Total and explain which scores were included.",
    answer: "Total starts at 0. Score 40 is not greater than 50, so Total remains 0. Score 65 is included, so Total becomes 65. Score 50 is not greater than 50, so Total remains 65. Score 80 is included, so Total becomes 145. Final Total is 145.",
    marking: [
      { mark: "M1", text: "initialises or recognises Total starts at 0" },
      { mark: "M1", text: "correctly excludes 40" },
      { mark: "M1", text: "correctly includes 65 and updates Total" },
      { mark: "M1", text: "correctly excludes 50 because condition is greater than 50" },
      { mark: "M1", text: "correctly includes 80" },
      { mark: "A1", text: "states final Total as 145" },
    ],
    strict: [
      "Do not award the 50 exclusion mark if candidate treats greater than as greater than or equal to.",
      "Allow a clear trace table instead of prose.",
      "Do not require array indexes if score order and updates are clear.",
      "Allow FT from the candidate's earlier trace value only when every subsequent step applies the stated algorithm correctly.",
    ],
  },
  {
    title: "Question 2",
    marks: "6 marks",
    prompt: "Choose suitable data structures for undo history, printer jobs and student records. Justify each choice.",
    answer: "Undo history should use a stack because the most recent action is undone first. Printer jobs should use a queue because the first job submitted should be printed first. Student records should use records because each student has related fields of different data types, such as name, ID and mark.",
    marking: [
      { mark: "B1", text: "chooses stack for undo history" },
      { mark: "B1", text: "justifies stack using last-in, first-out or most recent first" },
      { mark: "B1", text: "chooses queue for printer jobs" },
      { mark: "B1", text: "justifies queue using first-in, first-out" },
      { mark: "B1", text: "chooses record for student data" },
      { mark: "B1", text: "justifies record using related fields of different types" },
    ],
    strict: [
      "Do not award justification marks for 'it stores data' alone.",
      "Allow LIFO for stack and FIFO for queue.",
      "Do not accept array for student records unless candidate describes an array of records clearly.",
    ],
  },
  {
    title: "Question 3",
    marks: "6 marks",
    prompt: "A mark must be between 0 and 100 inclusive. Give normal, boundary and abnormal test data with expected results.",
    answer: "Normal data: 75, expected accepted. Boundary data: 0 and 100, expected accepted; minus 1 and 101, expected rejected. Abnormal data: a text value such as 'high', expected rejected with an error message.",
    marking: [
      { mark: "B1", text: "gives valid normal data" },
      { mark: "B1", text: "normal data has correct expected result" },
      { mark: "B1", text: "gives valid boundary value such as 0 or 100" },
      { mark: "B1", text: "boundary valid value has correct expected result" },
      { mark: "B1", text: "gives invalid boundary or abnormal value such as -1, 101 or text" },
      { mark: "B1", text: "invalid or abnormal data has correct expected rejection/error result" },
    ],
    strict: [
      "Do not accept 50 as boundary data.",
      "Allow equivalent normal values within range.",
      "Do not award full marks for data values without expected results.",
    ],
  },
  {
    title: "Question 4",
    marks: "6 marks",
    prompt: "Describe an algorithm to find the largest value in a 1D array of ten integers.",
    answer: "Set Largest to the first array element. Loop through the remaining elements. For each element, compare it with Largest. If the element is greater than Largest, set Largest to that element. After all elements have been checked, output Largest.",
    marking: [
      { mark: "B1", text: "initialises Largest to a valid array element" },
      { mark: "B1", text: "loops through array elements" },
      { mark: "B1", text: "compares current element with Largest" },
      { mark: "B1", text: "updates Largest when current element is greater" },
      { mark: "B1", text: "continues until all relevant elements checked" },
      { mark: "B1", text: "outputs or returns Largest" },
    ],
    strict: [
      "Do not award initialisation mark for setting Largest to 0 unless values are known non-negative.",
      "Allow Cambridge-style pseudocode or clear structured English.",
      "Do not require exact variable names.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "Explain why a complete trace table is useful when checking an algorithm.",
    answer: "A trace table records how variable values change after each relevant step or loop iteration. It helps find logic errors such as incorrect conditions, wrong loop bounds or variables not being updated. It also provides evidence for the final output, so the programmer or examiner can see how the result was obtained.",
    marking: [
      { mark: "B1", text: "states trace table records variable values" },
      { mark: "B1", text: "states values are recorded step by step or per iteration" },
      { mark: "B1", text: "links trace to finding logic errors" },
      { mark: "B1", text: "gives valid example such as wrong condition, loop bound or update" },
      { mark: "B1", text: "links trace table to checking final output" },
      { mark: "B1", text: "explains evidence/method can be reviewed by programmer or examiner" },
    ],
    strict: [
      "Do not award full marks for saying only 'it checks the program'.",
      "Allow dry run table as equivalent wording.",
      "Do not accept syntax error checking as the main purpose unless linked to a dry run limitation.",
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
    guess: { text: "A guess may be lucky, but it does not show method. Trace questions want evidence.", correct: false },
    trace: { text: "Correct. A trace table matches the command and protects method marks.", correct: true },
    java: { text: "Java is support only. Do not translate before doing the Cambridge pseudocode task.", correct: false },
    essay: { text: "That answers a different command word. This stem asks for a trace.", correct: false },
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

function setupTraceTool() {
  const select = document.querySelector("#traceSelect");
  const output = document.querySelector("#traceOutput");
  const render = () => {
    const scores = traces[select.value];
    let total = 0;
    const rows = scores.map((score, index) => {
      const include = score > 50;
      if (include) total += score;
      return [String(index + 1), String(score), include ? "TRUE" : "FALSE", String(total)];
    });
    output.innerHTML = `
      <div class="data-table four-col">
        <div class="table-row table-head"><div>Index</div><div>Score</div><div>Score &gt; 50?</div><div>Total after step</div></div>
        ${rows.map((row) => `<div class="table-row"><div>${row[0]}</div><div>${row[1]}</div><div>${row[2]}</div><div>${row[3]}</div></div>`).join("")}
      </div>
      <p><strong>Final Total:</strong> ${total}</p>
    `;
  };
  document.querySelector("#traceBtn").addEventListener("click", render);
  select.addEventListener("change", render);
  render();
}

function setupStructureTool() {
  const select = document.querySelector("#structureSelect");
  const output = document.querySelector("#structureOutput");
  const render = () => {
    const item = structures[select.value];
    output.innerHTML = `
      <p><strong>Structure:</strong> ${escapeHtml(item.structure)}</p>
      <p><strong>Reason:</strong> ${escapeHtml(item.reason)}</p>
      <p><strong>Trap:</strong> ${escapeHtml(item.trap)}</p>
    `;
  };
  document.querySelector("#structureBtn").addEventListener("click", render);
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
  render("trace");
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
      feedback.textContent = correct ? "Correct or close enough for this short check." : "Not quite. Use the precise algorithm or data structure keyword.";
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
        <h4>Strict notes</h4>
        <ul>
          ${item.strict.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}
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
  setupTraceTool();
  setupStructureTool();
  setupExamples();
  setupPractice();
  setupMistakes();
  setupExam();
}

document.addEventListener("DOMContentLoaded", init);
