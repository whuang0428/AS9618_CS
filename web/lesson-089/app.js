const classifierMap = {
  flat: {
    topic: "Relational design / normalisation",
    reason: "Repeated address data suggests duplication. Separate student details from booking records to reduce update errors.",
  },
  pk: {
    topic: "Primary key",
    reason: "The clue 'uniquely identifies a record' points to a primary key.",
  },
  join: {
    topic: "SQL join",
    reason: "StudentName and BookTitle are stored in different tables, so related tables must be joined using key fields.",
  },
  group: {
    topic: "Aggregate and GROUP BY",
    reason: "The phrase 'in each category' asks for one summary per group.",
  },
  backup: {
    topic: "Backup and recovery",
    reason: "Restoring records after failure needs a separate backup copy and a tested restore process.",
  },
};

const books = [
  { BookID: "B01", Title: "Networks", Category: "Computing", Copies: 4 },
  { BookID: "B02", Title: "Poems", Category: "Literature", Copies: 7 },
  { BookID: "B03", Title: "Databases", Category: "Computing", Copies: 3 },
  { BookID: "B04", Title: "Drama", Category: "Literature", Copies: 2 },
];

const queryMap = {
  q1: {
    fields: ["Title"],
    rows: books.filter((row) => row.Category === "Computing").map((row) => ({ Title: row.Title })),
  },
  q2: {
    fields: ["Title", "Copies"],
    rows: [...books]
      .sort((a, b) => b.Copies - a.Copies)
      .map((row) => ({ Title: row.Title, Copies: row.Copies })),
  },
  q3: {
    fields: ["Category", "COUNT(*)"],
    rows: groupByCategory((rows) => rows.length, "COUNT(*)"),
  },
  q4: {
    fields: ["Category", "SUM(Copies)"],
    rows: groupByCategory((rows) => rows.reduce((total, row) => total + row.Copies, 0), "SUM(Copies)"),
  },
};

const examples = {
  design: {
    title: "Example 1: Design answer with marks annotated",
    problem: "A flat file repeats student details for every library loan. Explain one problem and one relational design improvement.",
    steps: [
      "Problem mark: repeated student details cause data duplication.",
      "Consequence mark: if an address changes, every repeated copy must be updated or the data becomes inconsistent.",
      "Improvement mark: store Student details once in a Student table with StudentID as primary key.",
      "Relationship mark: store StudentID as a foreign key in Loan to link each loan to the correct student.",
    ],
  },
  sql: {
    title: "Example 2: SQL topic recognition",
    problem: "Write a query to show the number of books in each category.",
    steps: [
      "Topic clue: 'number of books' means COUNT; 'each category' means GROUP BY.",
      "Output the group label and the aggregate: SELECT Category, COUNT(*).",
      "Use the correct table: FROM Book.",
      "Complete answer: SELECT Category, COUNT(*) FROM Book GROUP BY Category;",
    ],
  },
  protect: {
    title: "Example 3: Protection vocabulary",
    problem: "A typed email should be checked against a paper form.",
    steps: [
      "This is not validation because the problem is not only format.",
      "It is verification because typed data is compared with a source.",
      "Method: proofreading against the form.",
      "Limitation: this checks copying accuracy, not whether the form itself was correct.",
    ],
  },
  improve: {
    title: "Example 4: Improve a weak answer",
    problem: "Weak answer: 'Backups are good because they make the database safe.'",
    steps: [
      "Name the mechanism: a backup is a separate copy of database data.",
      "Give the consequence: it allows recovery after data loss, corruption or hardware failure.",
      "Add quality detail: backups should be regular, stored separately and tested.",
      "Improved answer: regular off-site backups allow the school to restore recent records after failure, reducing data loss.",
    ],
  },
};

const practice = [
  {
    id: "p1",
    prompt: "Which key uniquely identifies each record in a table?",
    accepted: ["primary key", "primary"],
    answer: "Primary key",
  },
  {
    id: "p2",
    prompt: "Which key links to a primary key in another table?",
    accepted: ["foreign key", "foreign"],
    answer: "Foreign key",
  },
  {
    id: "p3",
    prompt: "Which design process reduces duplication by separating repeated data into related tables?",
    accepted: ["normalisation", "normalization"],
    answer: "Normalisation",
  },
  {
    id: "p4",
    prompt: "Which SQL clause filters records?",
    accepted: ["where"],
    answer: "WHERE",
  },
  {
    id: "p5",
    prompt: "Which SQL clause sorts result rows?",
    accepted: ["order by"],
    answer: "ORDER BY",
  },
  {
    id: "p6",
    prompt: "Which aggregate function counts records?",
    accepted: ["count", "count()"],
    answer: "COUNT",
  },
  {
    id: "p7",
    prompt: "Which SQL clause is needed for a summary per category?",
    accepted: ["group by"],
    answer: "GROUP BY",
  },
  {
    id: "p8",
    prompt: "Which SQL command changes existing records?",
    accepted: ["update"],
    answer: "UPDATE",
  },
  {
    id: "p9",
    prompt: "Which term checks data follows rules before being accepted?",
    accepted: ["validation"],
    answer: "Validation",
  },
  {
    id: "p10",
    prompt: "Which term checks entered data against the original source?",
    accepted: ["verification"],
    answer: "Verification",
  },
];

const mistakes = [
  {
    wrong: "A student's name is a good primary key because every student has a name.",
    fix: "A primary key must uniquely and reliably identify a record. Names may be duplicated or change; use a StudentID.",
  },
  {
    wrong: "SELECT * is fine because it shows everything the examiner could want.",
    fix: "Exam questions usually specify required fields. SELECT only those fields unless all fields are requested.",
  },
  {
    wrong: "GROUP BY sorts the output into alphabetical order.",
    fix: "GROUP BY forms groups for aggregate summaries. ORDER BY sorts output rows.",
  },
  {
    wrong: "Validation proves that data is correct.",
    fix: "Validation checks data follows rules. It cannot prove that a plausible value is true.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "4 marks",
    prompt: "A school stores library loans in one flat file. StudentName, TutorGroup and BookTitle are repeated for every loan. Explain two advantages of using a relational database design instead.",
    answer: "Student data can be stored once in a Student table and linked to Loan using StudentID, reducing duplication. If a tutor group changes, only one Student record needs updating, reducing inconsistency. Book data can also be stored once in a Book table and linked using BookID, so each loan references the correct book without repeating all book details.",
    marking: [
      { mark: "B1", text: "identifies reduced data duplication" },
      { mark: "B1", text: "applies duplication to repeated student/book details" },
      { mark: "B1", text: "identifies reduced update inconsistency / easier update" },
      { mark: "B1", text: "explains single update reduces conflicting copies" },
    ],
    strict: [
      "Do not award full credit for vague 'more efficient' without cause and consequence.",
      "Allow reduced storage if linked to less repeated data.",
      "Do not accept 'primary keys stop duplication' unless table separation or relationship is explained.",
    ],
  },
  {
    title: "Question 2",
    marks: "4 marks",
    prompt: "The Book table has fields BookID, Title, Category and Copies. Write an SQL query to output each Category and the total number of Copies in that category.",
    answer: "SELECT Category, SUM(Copies) FROM Book GROUP BY Category;",
    marking: [
      { mark: "B1", text: "SELECT Category" },
      { mark: "B1", text: "uses SUM(Copies)" },
      { mark: "B1", text: "FROM Book" },
      { mark: "M1", text: "GROUP BY Category" },
    ],
    strict: [
      "Do not accept COUNT(Copies) for total copies.",
      "Do not award GROUP BY mark for ORDER BY Category.",
      "Allow field order SUM(Copies), Category unless output order is specified.",
    ],
  },
  {
    title: "Question 3",
    marks: "6 marks",
    prompt: "A query must output StudentName and Title for current loans using Student, Loan and Book. Describe the required join path and give one suitable SQL query.",
    answer: "Student is joined to Loan using Student.StudentID = Loan.StudentID. Loan is joined to Book using Loan.BookID = Book.BookID. A suitable query is SELECT Student.StudentName, Book.Title FROM Student, Loan, Book WHERE Student.StudentID = Loan.StudentID AND Loan.BookID = Book.BookID AND Loan.Returned = FALSE;",
    marking: [
      { mark: "B1", text: "identifies Student to Loan relationship using StudentID" },
      { mark: "B1", text: "identifies Loan to Book relationship using BookID" },
      { mark: "B1", text: "SELECT StudentName and Title only" },
      { mark: "B1", text: "FROM Student, Loan and Book" },
      { mark: "M1", text: "includes both join conditions" },
      { mark: "A1", text: "includes current-loan filter Returned = FALSE" },
    ],
    strict: [
      "Do not accept direct join Student.StudentID = Book.BookID.",
      "Allow INNER JOIN syntax if relationships and filter are correct.",
      "Do not require semicolon.",
    ],
  },
  {
    title: "Question 4",
    marks: "5 marks",
    prompt: "A student says validation and verification both make data correct. Explain why this answer is weak, using database examples.",
    answer: "Validation checks input against rules, such as a range check rejecting Age = 216, but it cannot prove that Age = 16 is the correct age. Verification checks entered data against a source, such as proofreading an email against a form. The weak answer is wrong because both methods reduce errors but neither guarantees the real-world truth of the data.",
    marking: [
      { mark: "B1", text: "defines validation as rule checking" },
      { mark: "B1", text: "gives valid validation example" },
      { mark: "B1", text: "defines verification as source/copying check" },
      { mark: "B1", text: "gives valid verification example" },
      { mark: "B1", text: "states limitation: neither proves real-world truth / both only reduce errors" },
    ],
    strict: [
      "Do not award example marks if both examples are validation checks.",
      "Allow double entry as a verification method.",
      "Do not accept 'verification is security' as a valid distinction.",
    ],
  },
  {
    title: "Question 5",
    marks: "4 marks",
    prompt: "A student writes: SELECT * FROM Book GROUP BY Category; for the request 'output each Category and the number of books in that category'. Identify and correct the errors.",
    answer: "SELECT * outputs all fields instead of only Category and the count. GROUP BY Category groups the records but an aggregate function is missing. A corrected query is SELECT Category, COUNT(*) FROM Book GROUP BY Category;",
    marking: [
      { mark: "B1", text: "identifies SELECT * outputs too many / wrong fields" },
      { mark: "B1", text: "identifies missing COUNT aggregate" },
      { mark: "B1", text: "corrects output to Category and COUNT(*) or another valid count aggregate" },
      { mark: "B1", text: "complete corrected query retains FROM Book and GROUP BY Category" },
    ],
    strict: [
      "Do not award count mark for SUM(Copies), because the request asks for number of books.",
      "Allow COUNT(BookID) if BookID is a non-null key field.",
      "Do not require a semicolon.",
    ],
  },
];

function groupByCategory(calculate, outputField) {
  const categories = [...new Set(books.map((row) => row.Category))].sort();
  return categories.map((category) => {
    const rows = books.filter((row) => row.Category === category);
    return { Category: category, [outputField]: calculate(rows) };
  });
}

function normalise(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ").replace(/ ;$/, ";");
}

function setupPrint() {
  document.querySelector("#printBtn").addEventListener("click", () => window.print());
}

function setupHook() {
  const feedback = document.querySelector("#hookFeedback");
  const responses = {
    normalise: "Topic: normalisation / relational design. Repeated data suggests a table design problem.",
    sql: "Topic: SQL SELECT with WHERE. The clue is a filtered output request.",
    verify: "Topic: verification. The typed value is compared with a source.",
    key: "Topic: primary key. The clue is unique identification of a record.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = responses[button.dataset.hook];
    });
  });
}

function setupClassifier() {
  const input = document.querySelector("#classifierInput");
  const result = document.querySelector("#classifyResult");
  document.querySelector("#classifyBtn").addEventListener("click", () => {
    const item = classifierMap[input.value];
    result.innerHTML = `<strong>${item.topic}</strong><br />${item.reason}`;
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

function setupQueryTracer() {
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
  renderExample("design");
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
          <p class="wrong"><strong>Weak answer ${index + 1}:</strong> ${item.wrong}</p>
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
            <p><strong>Indicative answer:</strong> ${question.answer}</p>
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
  setupClassifier();
  setupQueryTracer();
  setupExamples();
  renderPractice();
  renderMistakes();
  renderExamQuestions();
}

init();
