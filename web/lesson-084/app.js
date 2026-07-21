const loanRows = [
  { LoanID: "L01", Title: "Networks", Borrower: "Amira", Category: "Computing", DaysOverdue: 5, Returned: false },
  { LoanID: "L02", Title: "Poems", Borrower: "Leo", Category: "Literature", DaysOverdue: 0, Returned: true },
  { LoanID: "L03", Title: "Databases", Borrower: "Maya", Category: "Computing", DaysOverdue: 12, Returned: false },
];

const builderMap = {
  overdueTitles: {
    sql: "SELECT Title, Borrower\nFROM Loan\nWHERE Returned = FALSE;",
    reason: "Output fields are Title and Borrower; the source table is Loan; the condition is Returned = FALSE.",
  },
  computingBooks: {
    sql: "SELECT Title\nFROM Loan\nWHERE Category = 'Computing';",
    reason: "Text value 'Computing' is quoted because it is a string.",
  },
  bigOverdue: {
    sql: "SELECT LoanID, Title\nFROM Loan\nWHERE DaysOverdue > 7;",
    reason: "DaysOverdue is numeric, so the value 7 is not quoted.",
  },
  leoLoans: {
    sql: "SELECT Title, DaysOverdue\nFROM Loan\nWHERE Borrower = 'Leo';",
    reason: "Borrower is text, so 'Leo' is quoted.",
  },
  notReturned: {
    sql: "SELECT LoanID\nFROM Loan\nWHERE Returned = FALSE;",
    reason: "Boolean condition returns only rows where Returned is false.",
  },
};

const queryMap = {
  q1: {
    fields: ["Title", "Borrower"],
    filter: (row) => row.Returned === false,
  },
  q2: {
    fields: ["Title"],
    filter: (row) => row.Category === "Computing",
  },
  q3: {
    fields: ["LoanID", "Title"],
    filter: (row) => row.DaysOverdue > 7,
  },
  q4: {
    fields: ["Title", "DaysOverdue"],
    filter: (row) => row.Borrower === "Leo",
  },
  q5: {
    fields: ["Borrower"],
    filter: (row) => row.DaysOverdue === 0,
  },
};

const examples = {
  returned: {
    title: "Example 1: Boolean condition",
    problem: "Show Title and Borrower for loans that have not been returned.",
    steps: [
      "Fields needed: Title, Borrower.",
      "Table: Loan.",
      "Condition: Returned = FALSE.",
      "SQL: SELECT Title, Borrower FROM Loan WHERE Returned = FALSE;",
    ],
  },
  text: {
    title: "Example 2: Text condition",
    problem: "Show Title for loans where Category is Computing.",
    steps: [
      "Fields needed: Title.",
      "Table: Loan.",
      "Condition: Category = 'Computing'.",
      "Text values such as 'Computing' need quotes.",
    ],
  },
  number: {
    title: "Example 3: Numeric condition",
    problem: "Show LoanID and Title for loans more than 7 days overdue.",
    steps: [
      "Fields needed: LoanID, Title.",
      "Table: Loan.",
      "Condition: DaysOverdue > 7.",
      "Numeric values are not quoted in this basic SQL style.",
    ],
  },
  star: {
    title: "Example 4: Avoid SELECT * unless needed",
    problem: "The question asks for Title only. A student writes SELECT * FROM Loan WHERE Category = 'Computing';",
    steps: [
      "The condition may be correct, but SELECT * outputs every field.",
      "If the question asks for Title only, write SELECT Title.",
      "Cambridge mark schemes often credit the exact required fields.",
      "Better: SELECT Title FROM Loan WHERE Category = 'Computing';",
    ],
  },
};

const practice = [
  {
    id: "p1",
    prompt: "Which SQL clause names the fields to output?",
    accepted: ["select"],
    answer: "SELECT",
  },
  {
    id: "p2",
    prompt: "Which SQL clause names the table?",
    accepted: ["from"],
    answer: "FROM",
  },
  {
    id: "p3",
    prompt: "Which SQL clause filters records using a condition?",
    accepted: ["where"],
    answer: "WHERE",
  },
  {
    id: "p4",
    prompt: "Write the condition for records where Category is Computing.",
    accepted: ["category = 'computing'", "category='computing'", "category = \"computing\"", "category=\"computing\""],
    answer: "Category = 'Computing'",
  },
  {
    id: "p5",
    prompt: "Write the condition for records where DaysOverdue is greater than 7.",
    accepted: ["daysoverdue > 7", "daysoverdue>7"],
    answer: "DaysOverdue > 7",
  },
  {
    id: "p6",
    prompt: "Should text values in WHERE conditions usually be quoted? yes or no.",
    accepted: ["yes"],
    answer: "Yes",
  },
  {
    id: "p7",
    prompt: "Should field names in SELECT usually be written in quotes? yes or no.",
    accepted: ["no"],
    answer: "No",
  },
  {
    id: "p8",
    prompt: "Write the SQL keyword used to mean all fields.",
    accepted: ["*"],
    answer: "*",
  },
  {
    id: "p9",
    prompt: "If the question asks for Title only, is SELECT * usually the best answer? yes or no.",
    accepted: ["no"],
    answer: "No",
  },
  {
    id: "p10",
    prompt: "What comparison operator means not equal to in standard SQL style?",
    accepted: ["<>"],
    answer: "<>",
  },
];

const mistakes = [
  {
    wrong: "SELECT * FROM Loan WHERE Category = 'Computing' when the question asks for Title only.",
    fix: "Use SELECT Title so only the requested field is output.",
  },
  {
    wrong: "SELECT 'Title' FROM Loan WHERE Category = 'Computing';",
    fix: "Do not quote field names in this basic SQL style. Use SELECT Title. Quote text values such as 'Computing'.",
  },
  {
    wrong: "SELECT Title WHERE Category = 'Computing';",
    fix: "The FROM clause is missing. SQL needs the table name: SELECT Title FROM Loan WHERE Category = 'Computing';",
  },
  {
    wrong: "SELECT Title FROM Loan WHERE DaysOverdue = '> 7';",
    fix: "The comparison operator is part of the condition, not a quoted string. Use WHERE DaysOverdue > 7.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "3 marks",
    prompt: "Write an SQL query to output Title and Borrower from Loan for records where Returned is FALSE.",
    answer: "SELECT Title, Borrower FROM Loan WHERE Returned = FALSE;",
    marking: [
      { mark: "B1", text: "SELECT Title, Borrower" },
      { mark: "B1", text: "FROM Loan" },
      { mark: "B1", text: "WHERE Returned = FALSE" },
    ],
    strict: [
      "Do not award SELECT mark for SELECT * unless all required fields are also clearly specified.",
      "Do not require semicolon.",
      "Allow field order Borrower, Title unless question specifies order.",
    ],
  },
  {
    title: "Question 2",
    marks: "4 marks",
    prompt: "Write an SQL query to output Title for loans where Category is Computing.",
    answer: "SELECT Title FROM Loan WHERE Category = 'Computing';",
    marking: [
      { mark: "B1", text: "SELECT Title" },
      { mark: "B1", text: "FROM Loan" },
      { mark: "M1", text: "WHERE Category = ..." },
      { mark: "A1", text: "text value 'Computing' correctly quoted or clearly shown as string literal" },
    ],
    strict: [
      "Do not award A1 if Computing is treated as a field name without quotes and no alternative string notation.",
      "Do not award SELECT mark for extra fields unless the mark scheme allows additional fields; here it asks for Title.",
      "Allow double quotes if used consistently for string literal.",
    ],
  },
  {
    title: "Question 3",
    marks: "4 marks",
    prompt: "Write an SQL query to output LoanID and Title for loans more than 7 days overdue.",
    answer: "SELECT LoanID, Title FROM Loan WHERE DaysOverdue > 7;",
    marking: [
      { mark: "B1", text: "SELECT LoanID, Title" },
      { mark: "B1", text: "FROM Loan" },
      { mark: "M1", text: "WHERE DaysOverdue uses greater-than comparison" },
      { mark: "A1", text: "correct condition DaysOverdue > 7" },
    ],
    strict: [
      "Do not accept DaysOverdue >= 7 because 'more than 7' excludes 7.",
      "Do not quote the whole comparison as a string.",
      "Allow Title, LoanID order unless question requires order.",
    ],
  },
  {
    title: "Question 4",
    marks: "5 marks",
    prompt: "The table Book has fields BookID, Title, Category and Price. Write an SQL query to output BookID and Title for books with Price less than 10.00.",
    answer: "SELECT BookID, Title FROM Book WHERE Price < 10.00;",
    marking: [
      { mark: "B1", text: "SELECT BookID, Title" },
      { mark: "B1", text: "FROM Book" },
      { mark: "M1", text: "WHERE Price condition" },
      { mark: "A1", text: "correct less-than operator <" },
      { mark: "A1", text: "correct numeric value 10.00 or 10 not quoted" },
    ],
    strict: [
      "Do not accept Price <= 10.00 for 'less than 10.00'.",
      "Do not require 10.00 rather than 10 if numeric meaning is same.",
      "Do not award SELECT mark for Title only or BookID only.",
    ],
  },
  {
    title: "Question 5",
    marks: "4 marks",
    prompt: "A student writes SELECT * FROM Loan WHERE Borrower = Leo; for the request: output Title and DaysOverdue for loans borrowed by Leo. Identify and correct two errors.",
    answer: "The first error is SELECT * because it outputs all fields instead of only Title and DaysOverdue. It should be SELECT Title, DaysOverdue. The second error is Leo is a text value and should be quoted as 'Leo'. A corrected query is SELECT Title, DaysOverdue FROM Loan WHERE Borrower = 'Leo';",
    marking: [
      { mark: "B1", text: "identifies SELECT * outputs all fields / wrong selected fields" },
      { mark: "B1", text: "corrects to SELECT Title, DaysOverdue" },
      { mark: "B1", text: "identifies Leo is a string/text value" },
      { mark: "B1", text: "corrects to Borrower = 'Leo'" },
    ],
    strict: [
      "Do not award correction mark for only saying 'do not use star' without fields.",
      "Allow double quotes around Leo if used as string literal.",
      "Do not penalise missing semicolon.",
    ],
  },
];

function normalise(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ").replace(/ ;$/, ";");
}

function setupPrint() {
  document.querySelector("#printBtn").addEventListener("click", () => window.print());
}

function setupHook() {
  const feedback = document.querySelector("#hookFeedback");
  const responses = {
    select: "Correct. It selects the needed field, names the table, and filters unreturned books.",
    all: "Too broad. SELECT * returns all fields and has no condition for overdue/unreturned.",
    from: "No. The SELECT clause is missing, so no output field is named.",
    where: "No. Clause order and FROM are wrong for basic SQL.",
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
    const rows = loanRows.filter(query.filter);
    result.innerHTML = renderResultTable(query.fields, rows);
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
  renderExample("returned");
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
            <h4>Strict notes</h4>
            <ul>
              ${question.strict.map((note) => `<li>${note}</li>`).join("")}
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
