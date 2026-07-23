const marks = [
  [12, 15, 11, 10],
  [18, 16, 14, 13],
  [20, 17, 19, 15],
];

const builderMap = {
  declare: {
    title: "Declare a 3 by 4 mark table",
    code: "DECLARE Marks : ARRAY[1:3, 1:4] OF INTEGER",
    reason: "The first range is rows, the second range is columns, and each cell stores an INTEGER.",
  },
  input: {
    title: "Input every cell",
    code: "FOR Row <- 1 TO 3\n    FOR Column <- 1 TO 4\n        INPUT Marks[Row, Column]\n    NEXT Column\nNEXT Row",
    reason: "The inner loop runs once for every column in each row.",
  },
  output: {
    title: "Output every cell",
    code: "FOR Row <- 1 TO 3\n    FOR Column <- 1 TO 4\n        OUTPUT Marks[Row, Column]\n    NEXT Column\nNEXT Row",
    reason: "Marks[Row, Column] accesses one cell at a time.",
  },
  rowTotal: {
    title: "Calculate one row total",
    code: "RowTotal <- 0\nFOR Column <- 1 TO 4\n    RowTotal <- RowTotal + Marks[2, Column]\nNEXT Column\nOUTPUT RowTotal",
    reason: "The row is fixed at 2 while the column changes.",
  },
  allTotal: {
    title: "Calculate whole table total",
    code: "Total <- 0\nFOR Row <- 1 TO 3\n    FOR Column <- 1 TO 4\n        Total <- Total + Marks[Row, Column]\n    NEXT Column\nNEXT Row\nOUTPUT Total",
    reason: "Both row and column change, so every cell is included.",
  },
};

const examples = {
  declare: {
    title: "Example 1: Declare and input",
    problem: "Store marks for 3 students across 4 tests.",
    rows: [
      ["Declaration", "DECLARE Marks : ARRAY[1:3, 1:4] OF INTEGER", "3 rows and 4 columns"],
      ["Outer loop", "FOR Row <- 1 TO 3", "selects each student"],
      ["Inner loop", "FOR Column <- 1 TO 4", "selects each test"],
      ["Input", "INPUT Marks[Row, Column]", "stores one cell"],
    ],
    code: "DECLARE Marks : ARRAY[1:3, 1:4] OF INTEGER\n\nFOR Row <- 1 TO 3\n    FOR Column <- 1 TO 4\n        INPUT Marks[Row, Column]\n    NEXT Column\nNEXT Row",
    points: ["Two ranges are needed.", "Two indexes access one cell.", "The nested loops match the declared bounds."],
  },
  lookup: {
    title: "Example 2: Cell lookup",
    problem: "For Marks[1:3, 1:4], find the value at row 2, column 3 when the row is 18, 16, 14, 13.",
    rows: [
      ["Row", "2", "second row"],
      ["Column", "3", "third column"],
      ["Cell", "Marks[2, 3]", "value is 14"],
    ],
    code: "OUTPUT Marks[2, 3]",
    points: ["Row is chosen first.", "Column is chosen second.", "A single index is not enough for a 2D array."],
  },
  total: {
    title: "Example 3: Whole table total",
    problem: "Calculate the total of all 12 marks.",
    rows: [
      ["Initialise", "Total <- 0", "before both loops"],
      ["Rows", "1 to 3", "outer loop"],
      ["Columns", "1 to 4", "inner loop"],
      ["Update", "Total <- Total + Marks[Row, Column]", "every cell once"],
    ],
    code: "Total <- 0\nFOR Row <- 1 TO 3\n    FOR Column <- 1 TO 4\n        Total <- Total + Marks[Row, Column]\n    NEXT Column\nNEXT Row\nOUTPUT Total",
    points: ["3 * 4 = 12 updates.", "The update belongs inside the inner loop.", "Output the final total after both loops."],
  },
  rowTotal: {
    title: "Example 4: Row total",
    problem: "Calculate the total for row 2 only.",
    rows: [
      ["Fixed row", "2", "do not loop over rows"],
      ["Changing column", "1 to 4", "visit all columns"],
      ["Values", "18 + 16 + 14 + 13", "row total is 61"],
    ],
    code: "RowTotal <- 0\nFOR Column <- 1 TO 4\n    RowTotal <- RowTotal + Marks[2, Column]\nNEXT Column\nOUTPUT RowTotal",
    points: ["The row index is fixed.", "The column index changes.", "This is not the whole table total."],
  },
};

const practice = [
  { id: "p1", prompt: "How many indexes are needed to access one cell in a two-dimensional array?", accepted: ["2", "two"], answer: "Two indexes: row and column." },
  { id: "p2", prompt: "In Marks[2, 3], which index is usually the row?", accepted: ["2", "first", "first index"], answer: "2, the first index." },
  { id: "p3", prompt: "In Marks[2, 3], which index is usually the column?", accepted: ["3", "second", "second index"], answer: "3, the second index." },
  { id: "p4", prompt: "How many cells are in ARRAY[1:3, 1:4]?", accepted: ["12"], answer: "12 cells." },
  { id: "p5", prompt: "For ARRAY[1:3, 1:4], is Marks[4, 1] valid? yes or no.", accepted: ["no"], answer: "No. Row 4 is outside 1 to 3." },
  { id: "p6", prompt: "For ARRAY[1:3, 1:4], is Marks[3, 4] valid? yes or no.", accepted: ["yes"], answer: "Yes. Row 3 and column 4 are both within bounds." },
  { id: "p7", prompt: "What kind of loop structure is used to traverse every cell?", accepted: ["nested", "nested loop", "nested loops"], answer: "Nested loops." },
  { id: "p8", prompt: "If the outer loop runs 3 times and inner loop runs 4 times each outer pass, how many inner actions run?", accepted: ["12"], answer: "12 inner actions." },
  { id: "p9", prompt: "For a row total of row 2, should Row change or stay fixed?", accepted: ["fixed", "stay fixed", "stay the same"], answer: "Row stays fixed; Column changes." },
  { id: "p10", prompt: "Is Java's row 0 automatically correct for Cambridge ARRAY[1:3, 1:4]? yes or no.", accepted: ["no"], answer: "No. Follow the bounds given in the Cambridge pseudocode question." },
];

const mistakes = [
  {
    wrong: "I wrote Marks[Index] for a two-dimensional array.",
    fix: "Use two indexes for one cell, for example Marks[Row, Column].",
  },
  {
    wrong: "I looped Row from 1 to 4 and Column from 1 to 3 for ARRAY[1:3, 1:4].",
    fix: "Match the declaration: Row is 1 to 3 and Column is 1 to 4.",
  },
  {
    wrong: "I put the total update after the inner loop when I needed every cell.",
    fix: "The update using Marks[Row, Column] must be inside the inner loop so every column in every row is included.",
  },
  {
    wrong: "I copied Java zero-based indexing into Cambridge pseudocode.",
    fix: "Java support may use row 0 and column 0, but Cambridge pseudocode should follow the declared bounds.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "6 marks",
    prompt: "Declare a two-dimensional array called Marks to store integer marks for 5 students and 4 tests. Then write pseudocode to input every mark.",
    answer: "DECLARE Marks : ARRAY[1:5, 1:4] OF INTEGER\n\nFOR Student <- 1 TO 5\n    FOR Test <- 1 TO 4\n        INPUT Marks[Student, Test]\n    NEXT Test\nNEXT Student",
    marking: [
      { mark: "B1", text: "uses identifier Marks" },
      { mark: "B1", text: "declares a two-dimensional ARRAY" },
      { mark: "B1", text: "uses suitable row/student bounds for 5 students" },
      { mark: "B1", text: "uses suitable column/test bounds for 4 tests and INTEGER type" },
      { mark: "M1", text: "uses nested loops matching the array bounds" },
      { mark: "A1", text: "inputs into Marks[Student, Test] or equivalent two-index cell" },
    ],
    strict: [
      "Do not award 2D declaration marks for five separate one-dimensional arrays.",
      "Allow ARRAY[0:4, 0:3] only if loops and explanation are consistent.",
      "Do not award input mark for INPUT Marks without two indexes.",
    ],
  },
  {
    title: "Question 2",
    marks: "7 marks",
    prompt: "A 2 by 3 array Values stores row 1 as 2, 4, 6 and row 2 as 1, 3, 5. Trace the total when nested loops add every cell.",
    answer: "Total starts at 0. Row 1 column 1 adds 2 so Total = 2. Row 1 column 2 adds 4 so Total = 6. Row 1 column 3 adds 6 so Total = 12. Row 2 column 1 adds 1 so Total = 13. Row 2 column 2 adds 3 so Total = 16. Row 2 column 3 adds 5 so final Total = 21.",
    marking: [
      { mark: "B1", text: "states Total starts at 0" },
      { mark: "M1", text: "uses row 1 values in column order" },
      { mark: "A1", text: "Total = 2 after first cell" },
      { mark: "A1", text: "Total = 6 after second cell" },
      { mark: "A1", text: "Total = 12 after row 1" },
      { mark: "A1", text: "Total = 16 after row 2 column 2" },
      { mark: "A1", text: "final Total = 21" },
    ],
    strict: [
      "Award trace marks for values in nested-loop order.",
      "Allow a table format.",
      "Do not award final mark if row/column order skips a cell.",
      "Allow FT from the candidate's earlier trace value only when every subsequent step applies the stated algorithm correctly.",
    ],
  },
  {
    title: "Question 3",
    marks: "5 marks",
    prompt: "Explain why Grid[4, 2] is invalid if Grid is declared as ARRAY[1:3, 1:5] OF BOOLEAN.",
    answer: "The declaration gives valid row indexes from 1 to 3 and valid column indexes from 1 to 5. Grid[4, 2] uses row index 4, which is outside the row bounds. Therefore it does not refer to a valid cell even though column 2 is valid.",
    marking: [
      { mark: "B1", text: "states valid row bounds are 1 to 3" },
      { mark: "B1", text: "states valid column bounds are 1 to 5" },
      { mark: "B1", text: "identifies row 4 is outside the declared bounds" },
      { mark: "B1", text: "states Grid[4, 2] does not refer to a valid cell" },
      { mark: "B1", text: "recognises column 2 itself is valid" },
    ],
    strict: [
      "Do not accept only 'out of range' without naming which dimension is out of range.",
      "Allow 'subscript' for index.",
      "Do not award valid-cell mark if candidate claims row 4 is allowed.",
    ],
  },
  {
    title: "Question 4",
    marks: "7 marks",
    prompt: "Write pseudocode to calculate and output the total of row 2 only in Sales[1:3, 1:4].",
    answer: "RowTotal <- 0\nFOR Column <- 1 TO 4\n    RowTotal <- RowTotal + Sales[2, Column]\nNEXT Column\nOUTPUT RowTotal",
    marking: [
      { mark: "B1", text: "initialises RowTotal to 0" },
      { mark: "M1", text: "uses loop over Column 1 to 4" },
      { mark: "B1", text: "keeps row index fixed at 2" },
      { mark: "M1", text: "accesses Sales[2, Column] or equivalent" },
      { mark: "A1", text: "adds each selected cell to RowTotal" },
      { mark: "B1", text: "does not loop over all rows" },
      { mark: "A1", text: "outputs RowTotal after the loop" },
    ],
    strict: [
      "Do not award fixed-row mark if Row is looped from 1 to 3.",
      "Allow a named constant for selected row 2.",
      "Do not award output mark if only partial totals are output inside the loop.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "A student writes Total <- Total + Marks[Row] inside nested loops for Marks[1:3, 1:4]. Explain the error and correct it.",
    answer: "Marks is a two-dimensional array, so one cell needs two indexes. Marks[Row] gives only one index and does not identify a column. The correction is Total <- Total + Marks[Row, Column] inside the inner loop, so each row-column cell is added.",
    marking: [
      { mark: "B1", text: "states Marks is two-dimensional" },
      { mark: "B1", text: "identifies one index is insufficient" },
      { mark: "B1", text: "explains the column is missing / cell not identified" },
      { mark: "B1", text: "gives corrected access Marks[Row, Column]" },
      { mark: "B1", text: "places correction inside the inner loop / every cell processed" },
      { mark: "B1", text: "explains corrected statement adds each cell to Total" },
    ],
    strict: [
      "Do not award correction for Marks[Column] because row is then missing.",
      "Allow equivalent row/column variable names.",
      "Do not accept 'syntax is wrong' without explaining missing dimension.",
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
  return value.trim().toLowerCase().replace(/\s+/g, " ").replace(/[^a-z0-9 -]/g, "");
}

function tableMarkup(headers, rows) {
  return `
    <div class="result-table" style="--cols: ${headers.length}">
      <div class="table-row table-head">${headers.map((head) => `<div>${escapeHtml(head)}</div>`).join("")}</div>
      ${rows.map((row) => `<div class="table-row">${row.map((cell) => `<div>${escapeHtml(cell)}</div>`).join("")}</div>`).join("")}
    </div>
  `;
}

function setupPrint() {
  document.querySelector("#printBtn").addEventListener("click", () => window.print());
}

function setupHook() {
  const feedback = document.querySelector("#hookFeedback");
  const responses = {
    single: "One index gives a position in a line, not a row-and-column seat.",
    two: "Correct. Row and column are kept as two separate indexes.",
    string: "Text can describe the seat, but it is not ideal for numeric indexed access.",
    constant: "A constant cannot represent many seats in a grid.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = responses[button.dataset.hook];
    });
  });
}

function setupLookup() {
  const result = document.querySelector("#lookupResult");
  document.querySelector("#lookupBtn").addEventListener("click", () => {
    const row = Number(document.querySelector("#rowInput").value);
    const column = Number(document.querySelector("#columnInput").value);
    if (row < 1 || row > marks.length || column < 1 || column > marks[0].length) {
      result.innerHTML = `<p><strong>Out of range.</strong> Marks is ARRAY[1:3, 1:4], so row ${row} and column ${column} must both be within bounds.</p>`;
      return;
    }
    result.innerHTML = `<p>Marks[${row}, ${column}] = <strong>${marks[row - 1][column - 1]}</strong>.</p>`;
  });
}

function setupBuilder() {
  const input = document.querySelector("#builderInput");
  const result = document.querySelector("#builderResult");
  document.querySelector("#builderBtn").addEventListener("click", () => {
    const item = builderMap[input.value];
    result.innerHTML = `
      <h3>${escapeHtml(item.title)}</h3>
      <pre><code>${escapeHtml(item.code)}</code></pre>
      <p>${escapeHtml(item.reason)}</p>
    `;
  });
}

function renderExample(key) {
  const example = examples[key];
  document.querySelector("#exampleBox").innerHTML = `
    <h3>${escapeHtml(example.title)}</h3>
    <p><strong>Problem:</strong> ${escapeHtml(example.problem)}</p>
    ${tableMarkup(["Step", "Code / value", "Reason"], example.rows)}
    <p><strong>Cambridge-style pseudocode:</strong></p>
    <pre><code>${escapeHtml(example.code)}</code></pre>
    <ul>${example.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul>
  `;
}

function setupExamples() {
  renderExample("declare");
  document.querySelectorAll("[data-example]").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll("[data-example]").forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");
      renderExample(tab.dataset.example);
    });
  });
}

function renderPractice() {
  const container = document.querySelector("#practiceList");
  container.innerHTML = practice.map((item, index) => `
    <article class="practice-item">
      <h3>${index + 1}. ${escapeHtml(item.prompt)}</h3>
      <div class="practice-row">
        <input type="text" id="${item.id}" aria-label="Answer for practice question ${index + 1}" />
        <button class="primary-button" type="button" data-check="${item.id}">Check</button>
      </div>
      <div class="mark" id="${item.id}Mark" aria-live="polite"></div>
      <button class="answer-toggle" type="button" data-answer="${item.id}">Show answer</button>
      <div class="answer-panel" id="${item.id}Answer">${escapeHtml(item.answer)}</div>
    </article>
  `).join("");

  document.querySelectorAll("[data-check]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = practice.find((entry) => entry.id === button.dataset.check);
      const value = normalise(document.querySelector(`#${item.id}`).value);
      const correct = item.accepted.some((answer) => value === normalise(answer));
      const mark = document.querySelector(`#${item.id}Mark`);
      mark.textContent = correct ? "Correct. The row/column reasoning is precise." : "Not quite. Check row, column, bounds or nested loop count.";
      mark.className = correct ? "mark correct" : "mark incorrect";
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
      <h3>Mistake ${index + 1}</h3>
      <p class="wrong">${escapeHtml(item.wrong)}</p>
      <button class="answer-toggle" type="button" data-fix="${index}">Show correction</button>
      <div class="answer-panel" id="fix${index}">${escapeHtml(item.fix)}</div>
    </article>
  `).join("");

  document.querySelectorAll("[data-fix]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#fix${button.dataset.fix}`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide correction" : "Show correction";
    });
  });
}

function renderExam() {
  const container = document.querySelector("#examList");
  container.innerHTML = examQuestions.map((question, index) => `
    <article class="exam-card">
      <div class="exam-head">
        <h3>${escapeHtml(question.title)}</h3>
        <span>${escapeHtml(question.marks)}</span>
      </div>
      <p>${escapeHtml(question.prompt)}</p>
      <button class="ms-toggle" type="button" data-ms="${index}">Show MS</button>
      <div class="ms-panel" id="ms${index}">
        <p><strong>Indicative answer:</strong></p>
        <pre><code>${escapeHtml(question.answer)}</code></pre>
        <p><strong>Mark scheme:</strong></p>
        <ul>${question.marking.map((line) => `<li><strong>${escapeHtml(line.mark)}</strong> ${escapeHtml(line.text)}</li>`).join("")}</ul>
      </div>
    </article>
  `).join("");

  document.querySelectorAll("[data-ms]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#ms${button.dataset.ms}`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide MS" : "Show MS";
    });
  });
}

setupPrint();
setupHook();
setupLookup();
setupBuilder();
setupExamples();
renderPractice();
renderMistakes();
renderExam();
