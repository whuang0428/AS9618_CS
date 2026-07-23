const students = [
  { StudentID: "S01", StudentName: "Amira", TutorGroup: "12A" },
  { StudentID: "S02", StudentName: "Leo", TutorGroup: "12B" },
  { StudentID: "S03", StudentName: "Maya", TutorGroup: "12A" },
];

const loans = [
  { LoanID: "L01", StudentID: "S01", BookID: "B01", Returned: false },
  { LoanID: "L02", StudentID: "S02", BookID: "B02", Returned: true },
  { LoanID: "L03", StudentID: "S03", BookID: "B03", Returned: false },
  { LoanID: "L04", StudentID: "S01", BookID: "B03", Returned: true },
];

const books = [
  { BookID: "B01", Title: "Networks", Category: "Computing" },
  { BookID: "B02", Title: "Poems", Category: "Literature" },
  { BookID: "B03", Title: "Databases", Category: "Computing" },
];

const joinedRows = loans.map((loan) => {
  const student = students.find((item) => item.StudentID === loan.StudentID);
  const book = books.find((item) => item.BookID === loan.BookID);
  return { ...loan, ...student, ...book, ReturnedText: loan.Returned ? "TRUE" : "FALSE" };
});

const builderMap = {
  studentLoans: {
    sql: "SELECT Student.StudentName, Loan.LoanID\nFROM Student, Loan\nWHERE Student.StudentID = Loan.StudentID;",
    reason: "The request needs Student and Loan, so match Student.StudentID to Loan.StudentID.",
  },
  loanTitles: {
    sql: "SELECT Loan.LoanID, Book.Title\nFROM Loan, Book\nWHERE Loan.BookID = Book.BookID;",
    reason: "The request needs Loan and Book, so match Loan.BookID to Book.BookID.",
  },
  currentBooks: {
    sql:
      "SELECT Student.StudentName, Book.Title\n" +
      "FROM Student, Loan, Book\n" +
      "WHERE Student.StudentID = Loan.StudentID\n" +
      "AND Loan.BookID = Book.BookID\n" +
      "AND Loan.Returned = FALSE;",
    reason: "StudentName and Title are in different tables, so Loan provides the bridge; Returned = FALSE is the filter.",
  },
  computingBorrowers: {
    sql:
      "SELECT Student.StudentName\n" +
      "FROM Student, Loan, Book\n" +
      "WHERE Student.StudentID = Loan.StudentID\n" +
      "AND Loan.BookID = Book.BookID\n" +
      "AND Book.Category = 'Computing';",
    reason: "The category is stored in Book, but StudentName is stored in Student, so the join path must use Loan.",
  },
  aliasCurrent: {
    sql:
      "SELECT S.StudentName, B.Title\n" +
      "FROM Student AS S, Loan AS L, Book AS B\n" +
      "WHERE S.StudentID = L.StudentID\n" +
      "AND L.BookID = B.BookID\n" +
      "AND L.Returned = FALSE;",
    reason: "Aliases shorten table names while keeping the same two join conditions.",
  },
};

const queryMap = {
  q1: {
    fields: ["StudentName", "LoanID"],
    rows: joinedRows.map((row) => ({ StudentName: row.StudentName, LoanID: row.LoanID })),
  },
  q2: {
    fields: ["LoanID", "Title"],
    rows: joinedRows.map((row) => ({ LoanID: row.LoanID, Title: row.Title })),
  },
  q3: {
    fields: ["StudentName", "Title"],
    rows: joinedRows
      .filter((row) => row.Returned === false)
      .map((row) => ({ StudentName: row.StudentName, Title: row.Title })),
  },
  q4: {
    fields: ["StudentName"],
    rows: joinedRows
      .filter((row) => row.Category === "Computing")
      .map((row) => ({ StudentName: row.StudentName })),
  },
  q5: {
    fields: ["StudentName", "Title", "TutorGroup"],
    rows: joinedRows
      .filter((row) => row.Returned === true)
      .map((row) => ({ StudentName: row.StudentName, Title: row.Title, TutorGroup: row.TutorGroup })),
  },
};

const examples = {
  twoTable: {
    title: "Example 1: Join Student to Loan",
    problem: "Show StudentName and LoanID for all loans.",
    steps: [
      "Required fields: StudentName from Student, LoanID from Loan.",
      "Relationship: Student.StudentID matches Loan.StudentID.",
      "SQL: SELECT Student.StudentName, Loan.LoanID FROM Student, Loan WHERE Student.StudentID = Loan.StudentID;",
      "The join prevents unrelated Student rows from being paired with unrelated Loan rows.",
    ],
  },
  threeTable: {
    title: "Example 2: Join Student, Loan and Book",
    problem: "Show StudentName and Title for all loans.",
    steps: [
      "StudentName is in Student; Title is in Book.",
      "Loan is the bridge table because it stores StudentID and BookID.",
      "Use two join conditions: Student to Loan, then Loan to Book.",
      "SQL: SELECT Student.StudentName, Book.Title FROM Student, Loan, Book WHERE Student.StudentID = Loan.StudentID AND Loan.BookID = Book.BookID;",
    ],
  },
  filter: {
    title: "Example 3: Join plus condition",
    problem: "Show StudentName and Title for current loans only.",
    steps: [
      "First write the two join conditions.",
      "Then add the filter: Loan.Returned = FALSE.",
      "Use AND because all conditions must be true.",
      "SQL: SELECT Student.StudentName, Book.Title FROM Student, Loan, Book WHERE Student.StudentID = Loan.StudentID AND Loan.BookID = Book.BookID AND Loan.Returned = FALSE;",
    ],
  },
  alias: {
    title: "Example 4: Alias version",
    problem: "Rewrite the current-loan query using aliases.",
    steps: [
      "Declare aliases in FROM: Student AS S, Loan AS L, Book AS B.",
      "Use the aliases consistently: S.StudentID, L.StudentID, L.BookID, B.BookID.",
      "Do not mix full names and aliases in a way that hides the relationship.",
      "SQL: SELECT S.StudentName, B.Title FROM Student AS S, Loan AS L, Book AS B WHERE S.StudentID = L.StudentID AND L.BookID = B.BookID AND L.Returned = FALSE;",
    ],
  },
};

const practice = [
  {
    id: "p1",
    prompt: "Which type of key uniquely identifies a record in a table?",
    accepted: ["primary key", "primary"],
    answer: "Primary key",
  },
  {
    id: "p2",
    prompt: "Which type of key stores a value that matches a primary key in another table?",
    accepted: ["foreign key", "foreign"],
    answer: "Foreign key",
  },
  {
    id: "p3",
    prompt: "Write the join condition linking Student to Loan.",
    accepted: ["student.studentid = loan.studentid", "loan.studentid = student.studentid"],
    answer: "Student.StudentID = Loan.StudentID",
  },
  {
    id: "p4",
    prompt: "Write the join condition linking Loan to Book.",
    accepted: ["loan.bookid = book.bookid", "book.bookid = loan.bookid"],
    answer: "Loan.BookID = Book.BookID",
  },
  {
    id: "p5",
    prompt: "Which table acts as the bridge between Student and Book?",
    accepted: ["loan"],
    answer: "Loan",
  },
  {
    id: "p6",
    prompt: "If two tables both contain StudentID, how can you make the field name unambiguous?",
    accepted: ["table name", "use table name", "qualify it", "table-qualified field", "student.studentid"],
    answer: "Use a table-qualified field name, for example Student.StudentID.",
  },
  {
    id: "p7",
    prompt: "What SQL keyword combines multiple conditions in the WHERE clause?",
    accepted: ["and"],
    answer: "AND",
  },
  {
    id: "p8",
    prompt: "To show current loans only, what condition should be added?",
    accepted: ["loan.returned = false", "returned = false", "loan.returned=false", "returned=false"],
    answer: "Loan.Returned = FALSE",
  },
  {
    id: "p9",
    prompt: "In FROM Student AS S, what is S called?",
    accepted: ["alias", "table alias"],
    answer: "Alias / table alias",
  },
  {
    id: "p10",
    prompt: "Should SELECT * be used if the question asks only for StudentName and Title? yes or no.",
    accepted: ["no", "n"],
    answer: "No. Select only StudentName and Title.",
  },
];

const mistakes = [
  {
    wrong: "SELECT StudentName, Title FROM Student, Book;",
    fix: "This lists two tables but gives no relationship. Use Loan as the bridge and add join conditions.",
  },
  {
    wrong: "WHERE Student.StudentID = Book.BookID",
    fix: "These fields identify different things. Join Student to Loan using StudentID, then Loan to Book using BookID.",
  },
  {
    wrong: "SELECT * FROM Student, Loan, Book WHERE Student.StudentID = Loan.StudentID AND Loan.BookID = Book.BookID;",
    fix: "The join path is valid, but SELECT * outputs too many fields. Select only the fields required by the question.",
  },
  {
    wrong: "FROM Student AS S, Loan AS L WHERE Student.StudentID = Loan.StudentID",
    fix: "If aliases are declared, use them consistently: WHERE S.StudentID = L.StudentID.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "4 marks",
    prompt: "Write an SQL query to output StudentName and LoanID for all loans using the Student and Loan tables.",
    answer: "SELECT Student.StudentName, Loan.LoanID FROM Student, Loan WHERE Student.StudentID = Loan.StudentID;",
    marking: [
      { mark: "B1", text: "SELECT StudentName and LoanID only" },
      { mark: "B1", text: "FROM Student and Loan" },
      { mark: "M1", text: "uses a join condition between Student and Loan" },
      { mark: "A1", text: "correct condition Student.StudentID = Loan.StudentID" },
    ],
    strict: [
      "Do not award the SELECT mark for SELECT * unless the required fields are also explicitly identified.",
      "Allow unqualified field names if there is no ambiguity in the candidate answer.",
      "Do not accept Student.StudentID = Loan.LoanID.",
    ],
  },
  {
    title: "Question 2",
    marks: "5 marks",
    prompt: "Write an SQL query to output StudentName and Title for all loans using Student, Loan and Book.",
    answer: "SELECT Student.StudentName, Book.Title FROM Student, Loan, Book WHERE Student.StudentID = Loan.StudentID AND Loan.BookID = Book.BookID;",
    marking: [
      { mark: "B1", text: "SELECT StudentName and Title only" },
      { mark: "B1", text: "FROM Student, Loan and Book" },
      { mark: "M1", text: "correct join path from Student to Loan" },
      { mark: "M1", text: "correct join path from Loan to Book" },
      { mark: "A1", text: "complete query with both valid join conditions" },
    ],
    strict: [
      "Do not accept a direct join between Student.StudentID and Book.BookID.",
      "Do not require INNER JOIN syntax; comma-style FROM with WHERE join conditions is acceptable.",
      "Allow aliases if they are declared and used consistently.",
    ],
  },
  {
    title: "Question 3",
    marks: "6 marks",
    prompt: "Write an SQL query to output StudentName and Title for current loans only. A current loan has Returned = FALSE.",
    answer: "SELECT Student.StudentName, Book.Title FROM Student, Loan, Book WHERE Student.StudentID = Loan.StudentID AND Loan.BookID = Book.BookID AND Loan.Returned = FALSE;",
    marking: [
      { mark: "B1", text: "SELECT StudentName and Title" },
      { mark: "B1", text: "FROM Student, Loan and Book" },
      { mark: "M1", text: "joins Student to Loan using StudentID" },
      { mark: "M1", text: "joins Loan to Book using BookID" },
      { mark: "M1", text: "filters current loans using Returned" },
      { mark: "A1", text: "correct condition Returned = FALSE combined with joins" },
    ],
    strict: [
      "Do not accept Returned = TRUE for current loans in this question.",
      "Do not award the filter method mark if Returned is used as an output field only.",
      "Allow Returned = 0 if the answer clearly treats it as false.",
    ],
  },
  {
    title: "Question 4",
    marks: "3 marks",
    prompt: "A query uses FROM Student AS S, Loan AS L. Write the join condition linking these aliases and explain why it is needed.",
    answer: "S.StudentID = L.StudentID. It is needed so each loan is matched with the correct student record rather than being combined with unrelated student records.",
    marking: [
      { mark: "A1", text: "correct condition S.StudentID = L.StudentID" },
      { mark: "M1", text: "explains that the condition matches related records" },
      { mark: "A1", text: "explains consequence of omitting it: unrelated/incorrect combinations" },
    ],
    strict: [
      "Do not accept Student.StudentID = Loan.StudentID if the answer is specifically asked to use aliases, unless aliases are also clearly mapped.",
      "Allow reversed condition L.StudentID = S.StudentID.",
      "Do not award explanation marks for vague claims such as 'it is faster' without relation matching.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "A student writes SELECT * FROM Student, Book WHERE Student.StudentID = Book.BookID; for the request: output StudentName and Title for all loans. Identify and correct two errors.",
    answer: "The query selects all fields instead of only StudentName and Title. It also joins Student directly to Book using unrelated fields and omits the Loan bridge table. A corrected query is SELECT Student.StudentName, Book.Title FROM Student, Loan, Book WHERE Student.StudentID = Loan.StudentID AND Loan.BookID = Book.BookID;",
    marking: [
      { mark: "B1", text: "identifies SELECT * outputs too many fields" },
      { mark: "B1", text: "corrects output to StudentName and Title" },
      { mark: "B1", text: "identifies Student to Book direct join is wrong / Loan bridge is missing" },
      { mark: "B1", text: "adds Loan table to the query" },
      { mark: "B1", text: "adds both correct join conditions through Loan" },
      { mark: "B1", text: "complete corrected query" },
    ],
    strict: [
      "Do not award the join correction mark for only adding Book.BookID without Loan.BookID.",
      "Allow INNER JOIN syntax if both relationships are correct.",
      "Do not require a semicolon.",
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
    studentLoan: "Correct. Both fields store a student identifier, so the Loan row can be matched to the right Student row.",
    studentBook: "No. StudentID identifies a student; BookID identifies a book. Matching them is not logical.",
    title: "No. A student name and a book title are different facts, not matching keys.",
    category: "No. StudentID and Category store different kinds of value.",
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
  renderExample("twoTable");
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
