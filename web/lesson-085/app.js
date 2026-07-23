const bookRows = [
  { BookID: "B01", Title: "Networks", Category: "Computing", Price: 12.5, Copies: 4 },
  { BookID: "B02", Title: "Poems", Category: "Literature", Price: 8.0, Copies: 7 },
  { BookID: "B03", Title: "Databases", Category: "Computing", Price: 15.0, Copies: 3 },
  { BookID: "B04", Title: "Drama", Category: "Literature", Price: 9.5, Copies: 2 },
];

const builderMap = {
  priceDesc: {
    sql: "SELECT Title, Price\nFROM Book\nORDER BY Price DESC;",
    reason: "The request asks for individual rows sorted highest first, so use ORDER BY Price DESC.",
  },
  countAll: {
    sql: "SELECT COUNT(*)\nFROM Book;",
    reason: "COUNT(*) counts all records in the Book table.",
  },
  avgPrice: {
    sql: "SELECT AVG(Price)\nFROM Book;",
    reason: "AVG calculates the mean of a numeric field.",
  },
  countCategory: {
    sql: "SELECT Category, COUNT(*)\nFROM Book\nGROUP BY Category;",
    reason: "The words 'in each Category' mean one count per group, so GROUP BY Category is needed.",
  },
  sumCopiesCategory: {
    sql: "SELECT Category, SUM(Copies)\nFROM Book\nGROUP BY Category;",
    reason: "SUM(Copies) gives a total; GROUP BY Category gives a separate total for each category.",
  },
};

const queryMap = {
  q1: {
    fields: ["Title", "Price"],
    rows: [...bookRows]
      .sort((a, b) => b.Price - a.Price)
      .map((row) => ({ Title: row.Title, Price: row.Price.toFixed(2) })),
  },
  q2: {
    fields: ["COUNT(*)"],
    rows: [{ "COUNT(*)": bookRows.length }],
  },
  q3: {
    fields: ["AVG(Price)"],
    rows: [{ "AVG(Price)": average(bookRows.map((row) => row.Price)).toFixed(2) }],
  },
  q4: {
    fields: ["Category", "COUNT(*)"],
    rows: groupByCategory((rows) => rows.length, "COUNT(*)"),
  },
  q5: {
    fields: ["Category", "SUM(Copies)"],
    rows: groupByCategory((rows) => rows.reduce((total, row) => total + row.Copies, 0), "SUM(Copies)"),
  },
};

const examples = {
  sort: {
    title: "Example 1: Sort by a numeric field",
    problem: "Show Title and Price sorted from most expensive to least expensive.",
    steps: [
      "Fields needed: Title, Price.",
      "Table: Book.",
      "Sort field: Price.",
      "Highest first means descending: ORDER BY Price DESC.",
      "SQL: SELECT Title, Price FROM Book ORDER BY Price DESC;",
    ],
  },
  count: {
    title: "Example 2: Count all records",
    problem: "Find the number of books in the table.",
    steps: [
      "The request asks for a count, not a list of rows.",
      "Use COUNT(*) to count all records.",
      "No GROUP BY is needed because there is only one overall count.",
      "SQL: SELECT COUNT(*) FROM Book;",
    ],
  },
  average: {
    title: "Example 3: Calculate a mean",
    problem: "Find the average price of all books.",
    steps: [
      "The field is numeric, so an aggregate function can be applied.",
      "AVG(Price) returns one summary value.",
      "Calculation from the table: (12.50 + 8.00 + 15.00 + 9.50) / 4 = 11.25.",
      "SQL: SELECT AVG(Price) FROM Book;",
    ],
  },
  group: {
    title: "Example 4: Count per category",
    problem: "Find the number of books in each category.",
    steps: [
      "The phrase 'each category' signals grouping.",
      "Output Category so the result identifies each group.",
      "Use COUNT(*) to count records in each group.",
      "SQL: SELECT Category, COUNT(*) FROM Book GROUP BY Category;",
    ],
  },
};

const practice = [
  {
    id: "p1",
    prompt: "Which SQL clause sorts result rows?",
    accepted: ["order by"],
    answer: "ORDER BY",
  },
  {
    id: "p2",
    prompt: "Which keyword sorts from high to low or Z to A?",
    accepted: ["desc", "descending"],
    answer: "DESC",
  },
  {
    id: "p3",
    prompt: "Which keyword sorts from low to high or A to Z?",
    accepted: ["asc", "ascending"],
    answer: "ASC",
  },
  {
    id: "p4",
    prompt: "Which aggregate function counts records?",
    accepted: ["count", "count()"],
    answer: "COUNT",
  },
  {
    id: "p5",
    prompt: "Which aggregate function totals numeric values?",
    accepted: ["sum", "sum()"],
    answer: "SUM",
  },
  {
    id: "p6",
    prompt: "Which aggregate function calculates the mean?",
    accepted: ["avg", "avg()", "average"],
    answer: "AVG",
  },
  {
    id: "p7",
    prompt: "Which aggregate function finds the smallest value?",
    accepted: ["min", "min()"],
    answer: "MIN",
  },
  {
    id: "p8",
    prompt: "Which aggregate function finds the largest value?",
    accepted: ["max", "max()"],
    answer: "MAX",
  },
  {
    id: "p9",
    prompt: "Which SQL clause groups records for a per-category summary?",
    accepted: ["group by"],
    answer: "GROUP BY",
  },
  {
    id: "p10",
    prompt: "If selecting Category with COUNT(*) per Category, do you need GROUP BY? yes or no.",
    accepted: ["yes", "y"],
    answer: "Yes. Use GROUP BY Category.",
  },
];

const mistakes = [
  {
    wrong: "SELECT Title FROM Book WHERE Price DESC;",
    fix: "WHERE filters rows; it does not sort rows. Use SELECT Title FROM Book ORDER BY Price DESC;",
  },
  {
    wrong: "SELECT Category, COUNT(*) FROM Book;",
    fix: "This mixes a normal field with an aggregate but does not group. Use SELECT Category, COUNT(*) FROM Book GROUP BY Category;",
  },
  {
    wrong: "SELECT COUNT(Price) FROM Book; when the request asks for the total price.",
    fix: "COUNT(Price) counts non-null Price values. Use SUM(Price) to calculate a total.",
  },
  {
    wrong: "SELECT Title, Price FROM Book ORDER BY Price ASC; when the request asks for highest price first.",
    fix: "ASC gives low to high. Use ORDER BY Price DESC for highest first.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "4 marks",
    prompt: "The table Book has fields BookID, Title, Category, Price and Copies. Write an SQL query to output Title and Price for all books, sorted by Price from highest to lowest.",
    answer: "SELECT Title, Price FROM Book ORDER BY Price DESC;",
    marking: [
      { mark: "B1", text: "SELECT Title, Price" },
      { mark: "B1", text: "FROM Book" },
      { mark: "M1", text: "ORDER BY Price" },
      { mark: "A1", text: "DESC used to sort highest to lowest" },
    ],
    strict: [
      "Do not award the SELECT mark for SELECT * unless Title and Price are explicitly identified as the required output.",
      "Allow field order Price, Title unless the question specifies output order.",
      "Do not accept ASC for highest to lowest.",
    ],
  },
  {
    title: "Question 2",
    marks: "2 marks",
    prompt: "Write an SQL query to find the number of records in the Book table.",
    answer: "SELECT COUNT(*) FROM Book;",
    marking: [
      { mark: "B1", text: "SELECT COUNT(*) or equivalent valid COUNT aggregate" },
      { mark: "B1", text: "FROM Book" },
    ],
    strict: [
      "Do not accept SELECT * because it outputs records rather than a count.",
      "Allow COUNT(BookID) if BookID is a required non-null key field.",
      "Do not require a semicolon.",
    ],
  },
  {
    title: "Question 3",
    marks: "2 marks",
    prompt: "Write an SQL query to find the average price of books in the Book table.",
    answer: "SELECT AVG(Price) FROM Book;",
    marking: [
      { mark: "B1", text: "SELECT AVG(Price)" },
      { mark: "B1", text: "FROM Book" },
    ],
    strict: [
      "Do not accept SUM(Price) because it returns a total, not a mean.",
      "Do not accept COUNT(Price) because it counts values.",
      "Allow AVERAGE(Price) only if the question or course notation has explicitly allowed it; otherwise use AVG.",
    ],
  },
  {
    title: "Question 4",
    marks: "4 marks",
    prompt: "Write an SQL query to output each Category and the number of books in that category.",
    answer: "SELECT Category, COUNT(*) FROM Book GROUP BY Category;",
    marking: [
      { mark: "B1", text: "SELECT Category" },
      { mark: "B1", text: "COUNT(*) or valid count aggregate included" },
      { mark: "B1", text: "FROM Book" },
      { mark: "M1", text: "GROUP BY Category used" },
    ],
    strict: [
      "Do not award the GROUP BY mark for ORDER BY Category because sorting is not grouping.",
      "Do not accept a query that gives only one overall count.",
      "Allow COUNT(BookID) if BookID is a required non-null key field.",
    ],
  },
  {
    title: "Question 5",
    marks: "3 marks",
    prompt: "A student writes SELECT Category, COUNT(*) FROM Book ORDER BY Category; for the request: output the number of books in each category. Identify and correct the main error.",
    answer: "The query sorts by Category but does not group records by Category. ORDER BY should not replace GROUP BY. A corrected query is SELECT Category, COUNT(*) FROM Book GROUP BY Category;",
    marking: [
      { mark: "B1", text: "identifies ORDER BY only sorts the result" },
      { mark: "B1", text: "identifies grouping by Category is required for 'each category'" },
      { mark: "B1", text: "corrects ORDER BY to GROUP BY Category in a valid query" },
    ],
    strict: [
      "Do not award the main correction mark for adding WHERE Category because no filtering condition is requested.",
      "Allow ORDER BY Category after GROUP BY Category if the grouped result is also sorted.",
      "Do not require a semicolon.",
    ],
  },
];

function average(values) {
  return values.reduce((total, value) => total + value, 0) / values.length;
}

function groupByCategory(calculate, outputField) {
  const categories = [...new Set(bookRows.map((row) => row.Category))].sort();
  return categories.map((category) => {
    const rows = bookRows.filter((row) => row.Category === category);
    return { Category: category, [outputField]: calculate(rows) };
  });
}

function normalise(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/\(\s*\)/g, "()")
    .replace(/ ;$/, ";");
}

function setupPrint() {
  document.querySelector("#printBtn").addEventListener("click", () => window.print());
}

function setupHook() {
  const feedback = document.querySelector("#hookFeedback");
  const responses = {
    group: "Correct. COUNT(*) gives the summary; GROUP BY Category makes it one count per category.",
    order: "Not enough. ORDER BY sorts rows; it does not calculate a count for each category.",
    where: "No. WHERE filters records before grouping and cannot be used like WHERE COUNT(*).",
    star: "Too broad. SELECT * outputs records, but the request asks for a grouped summary.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = responses[button.dataset.hook];
    });
  });
}

function setupBuilder() {
  const input = document.querySelector("#builderInput");
  const result = document.querySelector("#builderResult");
  const reason = document.querySelector("#builderReason");
  document.querySelector("#builderBtn").addEventListener("click", () => {
    const item = builderMap[input.value];
    result.textContent = item.sql;
    reason.textContent = item.reason;
  });
}

function renderResultTable(fields, rows) {
  if (rows.length === 0) {
    return "<p>No matching rows.</p>";
  }
  const head = `<div class="table-row table-head">${fields.map((field) => `<div>${field}</div>`).join("")}</div>`;
  const body = rows
    .map((row) => `<div class="table-row">${fields.map((field) => `<div>${row[field]}</div>`).join("")}</div>`)
    .join("");
  return `<div class="mini-result" style="--cols:${fields.length}">${head}${body}</div>`;
}

function setupQueryRunner() {
  const input = document.querySelector("#queryInput");
  const result = document.querySelector("#queryResult");
  document.querySelector("#queryBtn").addEventListener("click", () => {
    const query = queryMap[input.value];
    result.innerHTML = renderResultTable(query.fields, query.rows);
  });
}

function renderExample(key) {
  const example = examples[key];
  const box = document.querySelector("#exampleBox");
  box.innerHTML = `
    <h3>${example.title}</h3>
    <p><strong>Problem:</strong> ${example.problem}</p>
    <ol>
      ${example.steps.map((step) => `<li>${step}</li>`).join("")}
    </ol>
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
  renderExample("sort");
}

function renderPractice() {
  const list = document.querySelector("#practiceList");
  list.innerHTML = practice
    .map(
      (item, index) => `
        <article class="practice-item">
          <p><strong>${index + 1}.</strong> ${item.prompt}</p>
          <div class="practice-row">
            <input type="text" id="${item.id}" autocomplete="off" aria-label="Answer for question ${index + 1}" />
            <span class="mark" id="${item.id}Mark">Not checked</span>
          </div>
          <button class="answer-toggle" type="button" data-answer="${item.id}">Show answer</button>
          <div class="answer-panel" id="${item.id}Answer"><strong>Answer:</strong> ${item.answer}</div>
        </article>
      `
    )
    .join("");

  practice.forEach((item) => {
    const input = document.querySelector(`#${item.id}`);
    const mark = document.querySelector(`#${item.id}Mark`);
    input.addEventListener("input", () => {
      const value = normalise(input.value);
      const correct = item.accepted.some((answer) => normalise(answer) === value);
      mark.textContent = value.length === 0 ? "Not checked" : correct ? "Correct" : "Try again";
      mark.classList.toggle("correct", correct);
      mark.classList.toggle("incorrect", value.length > 0 && !correct);
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
  const grid = document.querySelector("#mistakeGrid");
  grid.innerHTML = mistakes
    .map(
      (item, index) => `
        <article>
          <p class="wrong"><strong>Weak SQL ${index + 1}:</strong> ${item.wrong}</p>
          <button class="answer-toggle" type="button" data-fix="fix${index}">Show correction</button>
          <div class="answer-panel" id="fix${index}"><strong>Correction:</strong> ${item.fix}</div>
        </article>
      `
    )
    .join("");

  document.querySelectorAll("[data-fix]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#${button.dataset.fix}`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide correction" : "Show correction";
    });
  });
}

function renderExamQuestions() {
  const list = document.querySelector("#examList");
  list.innerHTML = examQuestions
    .map(
      (question, index) => `
        <article class="exam-card">
          <div class="exam-head">
            <h3>${question.title}</h3>
            <span>${question.marks}</span>
          </div>
          <p>${question.prompt}</p>
          <button class="ms-toggle" type="button" data-ms="ms${index}">Show MS</button>
          <div class="ms-panel" id="ms${index}">
            <p><strong>Indicative answer:</strong> <code>${question.answer}</code></p>
            <h4>CIE-style mark scheme</h4>
            <ul>
              ${question.marking.map((mark) => `<li><strong>${mark.mark}:</strong> ${mark.text}</li>`).join("")}
            </ul>
          </div>
        </article>
      `
    )
    .join("");

  document.querySelectorAll("[data-ms]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#${button.dataset.ms}`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide MS" : "Show MS";
    });
  });
}

function init() {
  setupPrint();
  setupHook();
  setupBuilder();
  setupQueryRunner();
  setupExamples();
  renderPractice();
  renderMistakes();
  renderExamQuestions();
}

init();
