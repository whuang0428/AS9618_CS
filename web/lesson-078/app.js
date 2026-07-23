const conceptMap = {
  rawMark: {
    result: "Category: data.",
    reason: "These are raw values. They have not yet been processed into a meaningful conclusion.",
  },
  absenceRate: {
    result: "Category: information.",
    reason: "The raw attendance values have been processed into a meaningful percentage for a year group or school.",
  },
  libraryTables: {
    result: "Category: database.",
    reason: "A database is an organised collection of related data. Student, Book and Loan tables are related by the library context.",
  },
  queryProcessor: {
    result: "Category: DBMS.",
    reason: "The query processor is a component of the DBMS that interprets and carries out database queries.",
  },
  backupTool: {
    result: "Category: DBMS.",
    reason: "Backup and recovery are management functions provided by a DBMS to protect stored data.",
  },
};

const featureMap = {
  unknownField: {
    result: "Feature: data dictionary / metadata.",
    reason: "The data dictionary stores metadata such as table names, field names, data types and constraints.",
  },
  wrongValue: {
    result: "Feature: data integrity rules / validation constraints.",
    reason: "Integrity rules prevent invalid data values or inconsistent relationships from being stored.",
  },
  privateData: {
    result: "Feature: access rights / security.",
    reason: "The DBMS can restrict what individual users or groups are allowed to view or update.",
  },
  diskFailure: {
    result: "Feature: backup and recovery.",
    reason: "Backup and recovery features allow data to be restored after hardware failure or corruption.",
  },
  findRows: {
    result: "Feature: query processor.",
    reason: "The query processor interprets a query and retrieves records that meet the stated conditions.",
  },
};

const examples = {
  dataInfo: {
    title: "Example 1: Data to information",
    problem: "A library stores LoanDate, DueDate and Returned for every loan. Explain how this can become useful information.",
    steps: [
      "Raw data: due dates and returned values are stored for individual records.",
      "Processing: filter loans where Returned is FALSE and DueDate is earlier than today's date.",
      "Information: the librarian gets a list of overdue books and the students who need reminders.",
      "Exam wording: information is processed data that has meaning in a context.",
    ],
  },
  database: {
    title: "Example 2: Database definition",
    problem: "Explain why a set of Student, Book and Loan tables can be described as a database.",
    steps: [
      "It stores an organised collection of data, not isolated notes.",
      "The data is related: loans connect students to books.",
      "The structure allows records to be retrieved, updated and used to produce information.",
      "Avoid: saying only 'it is a table' because that misses organisation and relationship.",
    ],
  },
  dbms: {
    title: "Example 3: DBMS feature",
    problem: "A school wants only finance staff to update payment records. Which DBMS role is relevant?",
    steps: [
      "Feature: access rights / security.",
      "The DBMS can assign permissions to users or groups.",
      "Finance staff may be allowed to update payment records while other staff may only view limited data.",
      "Effect: this reduces unauthorised changes and helps protect sensitive data.",
    ],
  },
  terms: {
    title: "Example 4: Relational terms",
    problem: "In a Student table, identify the table, one field and one record.",
    steps: [
      "Table/entity: Student.",
      "Field/attribute: StudentID, Name or Form.",
      "Record/tuple: one complete row such as S0234, Amira Chen, 12A.",
      "Exam trap: a field is a column; a record is a row. Do not swap them.",
    ],
  },
};

const practice = [
  {
    id: "p1",
    prompt: "What term means raw facts and values before processing?",
    accepted: ["data"],
    answer: "Data",
  },
  {
    id: "p2",
    prompt: "What term means processed data that has meaning?",
    accepted: ["information"],
    answer: "Information",
  },
  {
    id: "p3",
    prompt: "What is the software used to create, manage and control access to a database?",
    accepted: ["dbms", "database management system"],
    answer: "DBMS / Database Management System",
  },
  {
    id: "p4",
    prompt: "In relational terminology, is one row a field or a record?",
    accepted: ["record", "tuple", "record tuple"],
    answer: "Record / tuple",
  },
  {
    id: "p5",
    prompt: "In relational terminology, is one column a field or a record?",
    accepted: ["field", "attribute", "field attribute"],
    answer: "Field / attribute",
  },
  {
    id: "p6",
    prompt: "What DBMS feature stores metadata about tables, fields, data types and constraints?",
    accepted: ["data dictionary", "dictionary"],
    answer: "Data dictionary",
  },
  {
    id: "p7",
    prompt: "What DBMS feature controls which users can view or update data?",
    accepted: ["access rights", "permissions", "user permissions", "security", "access control"],
    answer: "Access rights / permissions / access control",
  },
  {
    id: "p8",
    prompt: "What DBMS feature helps restore data after data loss or storage failure?",
    accepted: ["backup", "recovery", "backup and recovery", "backup recovery"],
    answer: "Backup and recovery",
  },
  {
    id: "p9",
    prompt: "What DBMS component interprets and carries out a database query?",
    accepted: ["query processor", "query processing"],
    answer: "Query processor",
  },
  {
    id: "p10",
    prompt: "Complete the distinction: the database is the organised data; the DBMS is the ____ that manages it.",
    accepted: ["software", "system", "software system"],
    answer: "software / software system",
  },
];

const mistakes = [
  {
    wrong: "A database is the program that controls the data.",
    fix: "A database is the organised collection of related data. The DBMS is the software that controls and manages it.",
  },
  {
    wrong: "Information is just lots of data.",
    fix: "Information is data that has been processed or organised so that it has meaning in a context.",
  },
  {
    wrong: "A field is one row in a table.",
    fix: "A field is a column/attribute. A record or tuple is one complete row.",
  },
  {
    wrong: "Security means the database is backed up.",
    fix: "Security usually refers to controlling access and protecting data from unauthorised use. Backup and recovery protect against data loss.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "4 marks",
    prompt: "Distinguish between data and information, using an example from a school attendance system.",
    answer: "Data is raw facts or values, such as StudentID, date and attendance mark for each lesson. Information is processed data that has meaning, such as the percentage of students absent on Monday or a list of students with repeated absences.",
    marking: [
      { mark: "B1", text: "data described as raw facts/values" },
      { mark: "B1", text: "information described as processed/organised/interpreted data with meaning" },
      { mark: "B1", text: "school attendance data example, such as student ID/date/attendance mark" },
      { mark: "B1", text: "processed information example, such as absence rate/list of repeated absences" },
    ],
    strict: [
      "Do not accept 'information is useful data' alone without processed/meaning idea.",
      "Do not award both example marks if the examples are not linked to attendance.",
      "Allow equivalent school examples such as late marks or absence totals.",
    ],
  },
  {
    title: "Question 2",
    marks: "4 marks",
    prompt: "Define a database and explain why a library system is a suitable example of one.",
    answer: "A database is an organised collection of related data that can be stored, retrieved and updated. A library system is suitable because it stores related data about students, books and loans, and the data can be searched or updated when books are borrowed and returned.",
    marking: [
      { mark: "B1", text: "organised collection of data" },
      { mark: "B1", text: "related data" },
      { mark: "B1", text: "library entities or data named, such as students/books/loans" },
      { mark: "B1", text: "retrieval/update use explained in the library context" },
    ],
    strict: [
      "Do not accept only 'a place where data is stored'.",
      "Do not award related-data mark for a list of unrelated examples.",
      "Allow search/filter/query wording for retrieval.",
    ],
  },
  {
    title: "Question 3",
    marks: "6 marks",
    prompt: "Explain three functions provided by a DBMS.",
    answer: "A DBMS provides a data dictionary that stores metadata such as field names, data types and constraints. It controls access rights so different users can view or update only the data they are permitted to use. It also processes queries so users can retrieve records matching conditions, and may provide backup and recovery to restore data after failure.",
    marking: [
      { mark: "B1", text: "valid DBMS function named, such as data dictionary/access rights/query processor/backup/recovery/integrity/developer interface" },
      { mark: "B1", text: "explanation of first named function" },
      { mark: "B1", text: "second distinct valid DBMS function named" },
      { mark: "B1", text: "explanation of second function" },
      { mark: "B1", text: "third distinct valid DBMS function named" },
      { mark: "B1", text: "explanation of third function" },
    ],
    strict: [
      "Do not award separate B marks for repeated wording of the same function.",
      "Do not accept vague 'makes it easier' without explaining how.",
      "Allow data security if linked to access control or permissions.",
    ],
  },
  {
    title: "Question 4",
    marks: "4 marks",
    prompt: "A clinic stores patient appointment data. Explain how a DBMS can help maintain security and integrity.",
    answer: "The DBMS can maintain security by using access rights, so only authorised staff can view or change patient details. It can maintain integrity by enforcing validation or integrity constraints, such as requiring valid appointment dates or existing patient IDs. It can also use backup and recovery so patient data can be restored if it is lost or corrupted.",
    marking: [
      { mark: "B1", text: "security/access rights/permissions identified" },
      { mark: "B1", text: "security linked to authorised clinic staff or patient details" },
      { mark: "B1", text: "integrity/validation/constraint identified" },
      { mark: "B1", text: "integrity linked to valid appointment/patient data" },
    ],
    strict: [
      "Do not award integrity mark for backup alone.",
      "Do not accept 'secure password' unless linked to access control/authentication.",
      "Allow examples involving patient ID, appointment date or contact details.",
    ],
  },
  {
    title: "Question 5",
    marks: "5 marks",
    prompt: "A student says, 'The database searches itself and checks who is allowed to edit it.' Explain why this statement is imprecise.",
    answer: "The statement is imprecise because the database is the organised collection of stored related data, not the software that performs management tasks. The DBMS provides the query processor that interprets searches or queries. The DBMS also controls access rights or permissions to decide who can view or edit data. A more precise statement is that the DBMS manages access and queries for the database.",
    marking: [
      { mark: "B1", text: "database identified as organised/stored related data" },
      { mark: "B1", text: "DBMS identified as software that manages/controls database" },
      { mark: "B1", text: "query/search function attributed to DBMS/query processor" },
      { mark: "B1", text: "edit permission/access function attributed to DBMS/access rights" },
      { mark: "B1", text: "correctly attributes querying, access control and other management functions to the DBMS rather than to the stored database" },
    ],
    strict: [
      "Do not accept answers that keep saying the database performs the management tasks.",
      "Do not award query and access marks if they are not attributed to DBMS or DBMS components.",
      "Allow 'database management system' for DBMS.",
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
    raw: "Not quite. This is raw data: separate values without a processed conclusion.",
    field: "No. This is a field name or attribute, not processed meaning.",
    info: "Correct. The raw attendance data has been processed into a meaningful percentage.",
    dbms: "No. That describes a DBMS component, not attendance information.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = responses[button.dataset.hook];
    });
  });
}

function setupConceptSorter() {
  const input = document.querySelector("#sortInput");
  const result = document.querySelector("#sortResult");
  const reason = document.querySelector("#sortReason");
  document.querySelector("#sortBtn").addEventListener("click", () => {
    const item = conceptMap[input.value];
    result.textContent = item.result;
    reason.textContent = item.reason;
  });
}

function setupFeatureSelector() {
  const input = document.querySelector("#featureInput");
  const result = document.querySelector("#featureResult");
  const reason = document.querySelector("#featureReason");
  document.querySelector("#featureBtn").addEventListener("click", () => {
    const item = featureMap[input.value];
    result.textContent = item.result;
    reason.textContent = item.reason;
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
  renderExample("dataInfo");
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
          <p class="wrong"><strong>Weak wording ${index + 1}:</strong> ${item.wrong}</p>
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
  setupConceptSorter();
  setupFeatureSelector();
  setupExamples();
  renderPractice();
  renderMistakes();
  renderExamQuestions();
}

init();
