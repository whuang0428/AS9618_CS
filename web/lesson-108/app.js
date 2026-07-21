const chooserMap = {
  seating: { title: "Outer loop: rows | Inner loop: seats", detail: "The algorithm chooses a row, then checks every seat in that row." },
  marks: { title: "Outer loop: students | Inner loop: marks", detail: "For each student, input the three test marks and process that student's total." },
  table: { title: "Outer loop: first factor | Inner loop: second factor", detail: "For each first factor, output products with every second factor." },
  pairs: { title: "Outer loop: first team | Inner loop: second team", detail: "Each outer team is compared with each possible inner team, with conditions to avoid invalid pairs if needed." },
};

function nestedTrace(rows, columns) {
  const traceRows = [];
  let visit = 0;
  for (let row = 1; row <= rows; row += 1) {
    for (let column = 1; column <= columns; column += 1) {
      visit += 1;
      traceRows.push([String(visit), String(row), String(column), `R${row}C${column}`]);
    }
  }
  return {
    headers: ["Visit", "Row", "Column", "Cell"],
    rows: traceRows,
    note: `${rows} rows x ${columns} columns = ${rows * columns} cell visits.`,
  };
}

function multiplicationTrace(rows, columns) {
  const traceRows = [];
  for (let row = 1; row <= rows; row += 1) {
    for (let column = 1; column <= columns; column += 1) {
      traceRows.push([String(row), String(column), String(row * column)]);
    }
  }
  return {
    headers: ["Row factor", "Column factor", "Product"],
    rows: traceRows,
    note: `The product statement runs ${rows * columns} times.`,
  };
}

function rowTotalTrace(table) {
  const traceRows = [];
  let grandTotal = 0;
  table.forEach((rowValues, rowIndex) => {
    let rowTotal = 0;
    rowValues.forEach((value, colIndex) => {
      rowTotal += value;
      traceRows.push([String(rowIndex + 1), String(colIndex + 1), String(value), String(rowTotal), String(grandTotal)]);
    });
    grandTotal += rowTotal;
    traceRows.push([String(rowIndex + 1), "end row", "-", `output ${rowTotal}`, String(grandTotal)]);
  });
  return {
    headers: ["Row", "Column", "Value", "RowTotal", "GrandTotal"],
    rows: traceRows,
    note: `Final GrandTotal is ${grandTotal}. RowTotal resets at the start of each row.`,
  };
}

const examples = {
  coordinates: {
    title: "Example 1: Cell coordinates",
    problem: "Trace the cells visited by nested loops with 2 rows and 3 columns.",
    trace: nestedTrace(2, 3),
    points: ["The inner loop runs 3 times for Row 1.", "Then the inner loop runs 3 times again for Row 2.", "Total visits are 2 x 3 = 6."],
  },
  "row-total": {
    title: "Example 2: Row totals",
    problem: "A table has row values [4, 5, 6] and [2, 3, 1]. Trace RowTotal and GrandTotal.",
    trace: rowTotalTrace([[4, 5, 6], [2, 3, 1]]),
    points: ["RowTotal resets before each row's inner loop.", "GrandTotal is updated after each row is complete.", "Output row totals after the inner loop, not after every cell."],
  },
  multiplication: {
    title: "Example 3: Multiplication table",
    problem: "Trace products for Row 1 to 3 and Column 1 to 3.",
    trace: multiplicationTrace(3, 3),
    points: ["Outer loop controls the first factor.", "Inner loop controls the second factor.", "The product is calculated inside the inner loop."],
  },
  mistake: {
    title: "Example 4: Reset placement",
    problem: "Explain why RowTotal <- 0 belongs inside the outer loop.",
    trace: {
      headers: ["Placement", "Effect", "Consequence"],
      rows: [
        ["Before outer loop", "RowTotal never resets for each row", "row outputs carry previous rows"],
        ["Inside outer loop before inner loop", "RowTotal resets once per row", "each row has a separate total"],
        ["Inside inner loop", "RowTotal resets for every cell", "only the last cell may be counted"],
      ],
      note: "The correct position depends on how often the variable must reset.",
    },
    points: ["Ask what the variable represents.", "Reset it at the start of that level.", "Use indentation to show ownership."],
  },
};

const practice = [
  { id: "p1", prompt: "In a 3-row, 4-column table, how many cells are processed?", accepted: ["12", "twelve"], answer: "12" },
  { id: "p2", prompt: "Which loop usually controls rows: outer or inner?", accepted: ["outer", "outer loop"], answer: "Outer loop" },
  { id: "p3", prompt: "Which loop usually controls columns: outer or inner?", accepted: ["inner", "inner loop"], answer: "Inner loop" },
  { id: "p4", prompt: "FOR Row <- 1 TO 2 and FOR Column <- 1 TO 5. How many times does the inner statement run?", accepted: ["10", "ten"], answer: "10" },
  { id: "p5", prompt: "For separate row totals, where should RowTotal <- 0 be placed?", accepted: ["inside outer loop", "inside the outer loop", "before inner loop", "before the inner loop", "inside outer before inner"], answer: "Inside the outer loop, before the inner loop" },
  { id: "p6", prompt: "Should GrandTotal usually reset before all rows or inside every row?", accepted: ["before all rows", "before outer loop", "before the outer loop"], answer: "Before the outer loop / before all rows" },
  { id: "p7", prompt: "In a 2 by 3 multiplication table, what is the product when Row=2 and Column=3?", accepted: ["6", "six"], answer: "6" },
  { id: "p8", prompt: "If Row=1, Column=1..3, what is the next Row after Column 3 finishes?", accepted: ["2", "row 2"], answer: "Row 2" },
  { id: "p9", prompt: "Nested loop visit counts usually add or multiply the loop counts?", accepted: ["multiply", "multiplied", "multiplication"], answer: "Multiply" },
  { id: "p10", prompt: "Is Java brace syntax required in Cambridge pseudocode? yes or no.", accepted: ["no"], answer: "No. Use Cambridge-style FOR/NEXT and indentation." },
];

const mistakes = [
  { wrong: "I added 3 + 4 and said a 3 by 4 table has 7 visits.", fix: "Nested loop visits multiply when every column is processed for every row: 3 x 4 = 12." },
  { wrong: "I put RowTotal <- 0 before the outer loop for separate student totals.", fix: "Place RowTotal <- 0 inside the outer loop before the inner loop so it resets for each student." },
  { wrong: "I put OUTPUT RowTotal inside the inner loop.", fix: "That outputs a running total after each column. For one total per row, output after the inner loop finishes." },
  { wrong: "I used the same variable name for Row and Column.", fix: "Use separate control variables so each loop has its own counter and clear role." },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "6 marks",
    prompt: "Trace the sequence of cells visited by nested loops: FOR Row <- 1 TO 2 and FOR Column <- 1 TO 3. Show Row and Column for each visit.",
    answer: "Visit 1 Row 1 Column 1\nVisit 2 Row 1 Column 2\nVisit 3 Row 1 Column 3\nVisit 4 Row 2 Column 1\nVisit 5 Row 2 Column 2\nVisit 6 Row 2 Column 3",
    marking: [
      { mark: "B1", text: "shows Row 1 begins with Column 1" },
      { mark: "M1", text: "shows inner loop completes Columns 1 to 3 for Row 1" },
      { mark: "M1", text: "shows Row changes to 2 after Column 3" },
      { mark: "M1", text: "shows Columns 1 to 3 repeat for Row 2" },
      { mark: "A1", text: "all six visits are in the correct order" },
      { mark: "B1", text: "states or implies total of 6 visits" },
    ],
    strict: [
      "Do not award full marks for only stating 6 visits when a trace is required.",
      "Allow equivalent coordinate format such as (1,1), (1,2).",
      "Do not accept changing Row before the inner loop completes.",
      "FT: later visits can follow from a candidate's previous valid nested-loop order.",
    ],
  },
  {
    title: "Question 2",
    marks: "7 marks",
    prompt: "Write Cambridge-style pseudocode to input 4 marks for each of 3 students and output the total for each student.",
    answer: "FOR Student <- 1 TO 3\n    StudentTotal <- 0\n    FOR MarkNumber <- 1 TO 4\n        INPUT Mark\n        StudentTotal <- StudentTotal + Mark\n    NEXT MarkNumber\n    OUTPUT StudentTotal\nNEXT Student",
    marking: [
      { mark: "B1", text: "uses outer loop for 3 students" },
      { mark: "B1", text: "initialises StudentTotal to 0 inside outer loop before inner loop" },
      { mark: "M1", text: "uses inner loop for 4 marks" },
      { mark: "M1", text: "inputs Mark inside inner loop" },
      { mark: "A1", text: "updates StudentTotal with each Mark" },
      { mark: "A1", text: "outputs StudentTotal after inner loop and before next student" },
      { mark: "B1", text: "uses clear Cambridge-style nested loop structure / indentation" },
    ],
    strict: [
      "Do not award row-total reset mark if StudentTotal is reset before the outer loop only.",
      "Allow WHILE loops if counters are correctly controlled.",
      "Do not award Cambridge notation mark for Java-only braces and semicolons.",
      "FT: output mark can follow from candidate's chosen total variable.",
    ],
  },
  {
    title: "Question 3",
    marks: "6 marks",
    prompt: "Explain why nested loops are suitable for processing a table with 5 rows and 6 columns.",
    answer: "A table has two repeated dimensions: rows and columns. An outer loop can repeat once for each of the 5 rows. For each row, an inner loop can repeat once for each of the 6 columns. This processes every cell exactly once, giving 5 x 6 = 30 cell visits. The loop variables also identify which cell is being processed.",
    marking: [
      { mark: "B1", text: "identifies two dimensions / rows and columns" },
      { mark: "B1", text: "outer loop linked to rows" },
      { mark: "B1", text: "inner loop linked to columns" },
      { mark: "M1", text: "explains inner loop runs for each outer loop value" },
      { mark: "A1", text: "calculates 5 x 6 = 30 visits" },
      { mark: "A1", text: "links loop variables to processing each cell / table location" },
    ],
    strict: [
      "Do not accept only 'it is easier' without mechanism.",
      "Allow rows/columns reversed if the explanation is consistent.",
      "Do not require array terminology.",
      "FT: visit count can follow from candidate's stated dimensions if method is multiplication.",
    ],
  },
  {
    title: "Question 4",
    marks: "5 marks",
    prompt: "A student writes RowTotal <- 0 before the outer loop, then outputs RowTotal after each row. Explain the error and correction.",
    answer: "The error is that RowTotal is not reset for each row, so totals from previous rows carry into later row outputs. RowTotal should be set to 0 inside the outer loop before the inner loop begins. This resets the row-level accumulator once per row while still allowing the inner loop to add each column value.",
    marking: [
      { mark: "B1", text: "identifies RowTotal is reset in the wrong place" },
      { mark: "M1", text: "explains previous row values carry over" },
      { mark: "A1", text: "places RowTotal <- 0 inside outer loop before inner loop" },
      { mark: "M1", text: "explains reset should happen once per row" },
      { mark: "A1", text: "connects correction to separate row totals" },
    ],
    strict: [
      "Do not award full marks for only saying 'move it'.",
      "Allow 'student total' or 'line total' for row total.",
      "Do not place reset inside inner loop; that loses earlier cells in the row.",
      "FT: consequence mark can follow from candidate's identified reset level.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "Compare a single loop and a nested loop. Refer to a suitable example for each.",
    answer: "A single loop repeats one set of steps over one sequence, such as inputting 10 marks and adding them to a total. A nested loop has one loop inside another, so it can process repeated groups such as 3 students with 4 marks each, or a table with rows and columns. In a nested loop the inner loop completes for each value of the outer loop, so the number of inner statements is often the outer count multiplied by the inner count.",
    marking: [
      { mark: "B1", text: "describes single loop as one repeated sequence" },
      { mark: "B1", text: "gives suitable single-loop example" },
      { mark: "B1", text: "describes nested loop as loop inside another loop" },
      { mark: "B1", text: "gives suitable nested-loop/table-style example" },
      { mark: "M1", text: "explains inner loop completes for each outer value" },
      { mark: "A1", text: "mentions multiplication of iteration counts or equivalent consequence" },
    ],
    strict: [
      "Do not accept 'nested is harder' as a comparison.",
      "Allow row/column, student/mark or multiplication-table examples.",
      "Do not require Big O notation.",
      "FT: final consequence can follow from candidate's valid examples.",
    ],
  },
];

function normalise(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ").replace(/[^a-z0-9\\[\\] <>+=.-]/g, "");
}

function tableMarkup(headers, rows) {
  return `
    <div class="result-table" style="--cols: ${headers.length}">
      <div class="table-row table-head">${headers.map((head) => `<div>${head}</div>`).join("")}</div>
      ${rows.map((row) => `<div class="table-row">${row.map((cell) => `<div>${cell}</div>`).join("")}</div>`).join("")}
    </div>
  `;
}

function setupPrint() {
  document.querySelector("#printBtn").addEventListener("click", () => window.print());
}

function setupHook() {
  const feedback = document.querySelector("#hookFeedback");
  const responses = {
    seven: "That adds rows and columns. Nested loop cell visits multiply.",
    twelve: "Correct. 3 rows x 4 columns = 12 cell checks.",
    three: "That counts rows only. Each row has 4 columns.",
    four: "That counts columns only. There are 3 rows of those columns.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = responses[button.dataset.hook];
    });
  });
}

function setupChooser() {
  const input = document.querySelector("#chooserInput");
  const result = document.querySelector("#chooserResult");
  document.querySelector("#chooserBtn").addEventListener("click", () => {
    const item = chooserMap[input.value];
    result.innerHTML = `<strong>${item.title}</strong><span>${item.detail}</span>`;
  });
}

function setupSimulator() {
  const rowsInput = document.querySelector("#rowsInput");
  const colsInput = document.querySelector("#colsInput");
  const result = document.querySelector("#simulateResult");
  document.querySelector("#simulateBtn").addEventListener("click", () => {
    const rows = Number(rowsInput.value);
    const columns = Number(colsInput.value);
    const trace = nestedTrace(rows, columns);
    result.innerHTML = `${tableMarkup(trace.headers, trace.rows)}<p>${trace.note}</p>`;
  });
}

function renderExample(key) {
  const example = examples[key];
  document.querySelector("#exampleBox").innerHTML = `
    <h3>${example.title}</h3>
    <p><strong>Problem:</strong> ${example.problem}</p>
    ${tableMarkup(example.trace.headers, example.trace.rows)}
    <p>${example.trace.note}</p>
    <ul>${example.points.map((point) => `<li>${point}</li>`).join("")}</ul>
  `;
}

function setupExamples() {
  document.querySelectorAll("[data-example]").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll("[data-example]").forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");
      renderExample(tab.dataset.example);
    });
  });
  renderExample("coordinates");
}

function setupPractice() {
  const list = document.querySelector("#practiceList");
  list.innerHTML = practice.map((item) => `
    <article class="practice-item">
      <p><strong>${item.id.toUpperCase()}.</strong> ${item.prompt}</p>
      <div class="practice-row">
        <input id="${item.id}" type="text" autocomplete="off" />
        <button class="primary-button" type="button" data-check="${item.id}">Check</button>
      </div>
      <div class="mark" id="${item.id}-mark" aria-live="polite"></div>
      <button class="answer-toggle" type="button" data-answer="${item.id}">Show answer</button>
      <div class="answer-panel" id="${item.id}-answer">${item.answer}</div>
    </article>
  `).join("");

  list.querySelectorAll("[data-check]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = practice.find((entry) => entry.id === button.dataset.check);
      const value = normalise(document.querySelector(`#${item.id}`).value);
      const accepted = item.accepted.map(normalise);
      const isCorrect = accepted.includes(value);
      const mark = document.querySelector(`#${item.id}-mark`);
      mark.textContent = isCorrect ? "Correct" : "Try again, then use Show answer.";
      mark.className = `mark ${isCorrect ? "correct" : "incorrect"}`;
    });
  });

  list.querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#${button.dataset.answer}-answer`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide answer" : "Show answer";
    });
  });
}

function setupMistakes() {
  const grid = document.querySelector("#mistakeGrid");
  grid.innerHTML = mistakes.map((item, index) => `
    <article>
      <p class="wrong"><strong>Mistake ${index + 1}:</strong> ${item.wrong}</p>
      <button class="answer-toggle" type="button" data-fix="${index}">Show correction</button>
      <div class="answer-panel" id="fix-${index}">${item.fix}</div>
    </article>
  `).join("");

  grid.querySelectorAll("[data-fix]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#fix-${button.dataset.fix}`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide correction" : "Show correction";
    });
  });
}

function setupExam() {
  const list = document.querySelector("#examList");
  list.innerHTML = examQuestions.map((question, index) => `
    <article class="exam-card">
      <div class="exam-head">
        <h3>${question.title}</h3>
        <span>${question.marks}</span>
      </div>
      <p>${question.prompt}</p>
      <button class="ms-toggle" type="button" data-ms="${index}">Show MS</button>
      <div class="ms-panel" id="ms-${index}">
        <p><strong>Indicative answer:</strong></p>
        <pre><code>${question.answer}</code></pre>
        <p><strong>Marking points:</strong></p>
        <ul>${question.marking.map((point) => `<li><strong>${point.mark}</strong> ${point.text}</li>`).join("")}</ul>
        <p><strong>Strict notes:</strong></p>
        <ul>${question.strict.map((note) => `<li>${note}</li>`).join("")}</ul>
      </div>
    </article>
  `).join("");

  list.querySelectorAll("[data-ms]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#ms-${button.dataset.ms}`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide MS" : "Show MS";
    });
  });
}

setupPrint();
setupHook();
setupChooser();
setupSimulator();
setupExamples();
setupPractice();
setupMistakes();
setupExam();
