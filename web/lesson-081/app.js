const keyMap = {
  student: {
    result: "Best primary key: StudentID.",
    reason: "StudentID is designed to be unique, not null and stable. Name is not safe because two students can share a name.",
  },
  book: {
    result: "Best primary key: ISBN.",
    reason: "ISBN uniquely identifies a book edition. Title and author are not necessarily unique.",
  },
  appointment: {
    result: "Best primary key: AppointmentID.",
    reason: "AppointmentID uniquely identifies each appointment. PatientID may appear many times for repeat appointments.",
  },
  memberWeak: {
    result: "No strong primary key is shown.",
    reason: "Name may not be unique, phone/email can change, and values may be missing. A MemberID should be added.",
  },
  product: {
    result: "Best primary key: ProductCode.",
    reason: "ProductCode is an identifier for each product. Description and price are not unique or stable enough.",
  },
};

const relationshipMap = {
  studentLoans: {
    result: "Relationship: one-to-many.",
    reason: "One student can have many loan records, but each loan record belongs to one student.",
  },
  personPassport: {
    result: "Relationship: one-to-one.",
    reason: "In this simplified scenario, one person is linked to one passport record.",
  },
  studentsClubs: {
    result: "Relationship: many-to-many.",
    reason: "Many students can join many clubs. This is commonly resolved using a linking table such as Membership.",
  },
  customerOrders: {
    result: "Relationship: one-to-many.",
    reason: "One customer can place many orders, but each order is placed by one customer.",
  },
  doctorAppointments: {
    result: "Relationship: one-to-many.",
    reason: "One doctor can have many appointments, but each appointment is assigned to one doctor in this scenario.",
  },
};

const examples = {
  library: {
    title: "Example 1: Library loans",
    problem: "For Student(StudentID, Name) and Loan(LoanID, StudentID, BookID), identify the keys.",
    steps: [
      "StudentID is the primary key in Student because it uniquely identifies each student.",
      "LoanID is the primary key in Loan because it uniquely identifies each loan record.",
      "StudentID in Loan is a foreign key because it references StudentID in Student.",
      "The relationship is one-to-many: one student can have many loan records.",
    ],
  },
  orders: {
    title: "Example 2: Customer orders",
    problem: "For Customer(CustomerID, Name) and Order(OrderID, CustomerID, Date), explain the link.",
    steps: [
      "CustomerID is the primary key in Customer.",
      "OrderID is the primary key in Order.",
      "CustomerID in Order is a foreign key that references Customer.CustomerID.",
      "This avoids repeating the customer's name and address in every order record.",
    ],
  },
  clubs: {
    title: "Example 3: Many-to-many with a linking table",
    problem: "Students can join many clubs and each club has many students.",
    steps: [
      "This is a many-to-many relationship.",
      "A linking table such as Membership can store StudentID and ClubID.",
      "StudentID in Membership is a foreign key referencing Student.",
      "ClubID in Membership is a foreign key referencing Club.",
    ],
  },
  integrity: {
    title: "Example 4: Referential integrity error",
    problem: "A Loan record stores StudentID S9999, but there is no S9999 in Student.",
    steps: [
      "The foreign key value in Loan does not match an existing primary key in Student.",
      "This breaks referential integrity.",
      "The DBMS should reject the Loan record or require the Student record to exist first.",
      "The purpose is to prevent orphan records.",
    ],
  },
};

const practice = [
  {
    id: "p1",
    prompt: "What key uniquely identifies each record in its own table?",
    accepted: ["primary key", "pk"],
    answer: "Primary key",
  },
  {
    id: "p2",
    prompt: "What key references a primary key in another table?",
    accepted: ["foreign key", "fk"],
    answer: "Foreign key",
  },
  {
    id: "p3",
    prompt: "For Student(StudentID, Name), which field is the likely primary key?",
    accepted: ["studentid", "student id"],
    answer: "StudentID",
  },
  {
    id: "p4",
    prompt: "For Loan(LoanID, StudentID, BookID), which field is the likely primary key?",
    accepted: ["loanid", "loan id"],
    answer: "LoanID",
  },
  {
    id: "p5",
    prompt: "In Loan(LoanID, StudentID, BookID), which field links to Student?",
    accepted: ["studentid", "student id"],
    answer: "StudentID",
  },
  {
    id: "p6",
    prompt: "What relationship exists if one customer can place many orders?",
    accepted: ["one to many", "one-to-many", "1 to many", "1:m", "one many"],
    answer: "One-to-many",
  },
  {
    id: "p7",
    prompt: "What relationship exists if many students can join many clubs?",
    accepted: ["many to many", "many-to-many", "m:n", "m to n"],
    answer: "Many-to-many",
  },
  {
    id: "p8",
    prompt: "What integrity rule requires a foreign key value to match an existing primary key?",
    accepted: ["referential integrity", "reference integrity"],
    answer: "Referential integrity",
  },
  {
    id: "p9",
    prompt: "Can Name usually be trusted as a primary key for students? yes or no.",
    accepted: ["no"],
    answer: "No",
  },
  {
    id: "p10",
    prompt: "A foreign key usually appears in the table on the 'many' side of a one-to-many relationship. yes or no.",
    accepted: ["yes"],
    answer: "Yes",
  },
];

const mistakes = [
  {
    wrong: "Name is a good primary key because every student has a name.",
    fix: "A primary key must uniquely identify each record. Names can be duplicated or changed, so an allocated StudentID is safer.",
  },
  {
    wrong: "A foreign key must be unique in its own table.",
    fix: "A foreign key does not usually have to be unique. In a Loan table, many loan records may contain the same StudentID.",
  },
  {
    wrong: "StudentID cannot be both a primary key and a foreign key.",
    fix: "The same field name can have different roles in different tables: primary key in Student, foreign key in Loan.",
  },
  {
    wrong: "Referential integrity means all data is accurate.",
    fix: "Referential integrity only checks that foreign key values reference existing primary key values. It does not prove all data is true.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "4 marks",
    prompt: "Define primary key and foreign key.",
    answer: "A primary key is a field, or combination of fields, that uniquely identifies each record in a table and should not be null. A foreign key is a field in one table that references the primary key in another table, creating a link between the tables.",
    marking: [
      { mark: "B1", text: "primary key is a field/fields in a table" },
      { mark: "M1", text: "primary key uniquely identifies each record / is unique and not null" },
      { mark: "B1", text: "foreign key is a field in another/related table" },
      { mark: "A1", text: "foreign key references a primary key / links tables" },
    ],
    strict: [
      "Do not accept only 'a key field' without unique identification for primary key.",
      "Do not accept foreign key as 'a second primary key' without reference idea.",
      "Allow 'attribute' for field.",
      "FT: award link mark if reference to another table is clearly implied.",
    ],
  },
  {
    title: "Question 2",
    marks: "6 marks",
    prompt: "For Student(StudentID, Name, TutorGroup) and Loan(LoanID, StudentID, BookID, DateBorrowed), identify the primary and foreign keys and explain the relationship.",
    answer: "StudentID is the primary key in Student because it uniquely identifies each student. LoanID is the primary key in Loan because it uniquely identifies each loan record. StudentID in Loan is a foreign key because it references StudentID in Student. The relationship is one-to-many because one student can have many loan records, but each loan record is linked to one student.",
    marking: [
      { mark: "B1", text: "StudentID identified as primary key in Student" },
      { mark: "B1", text: "LoanID identified as primary key in Loan" },
      { mark: "B1", text: "StudentID in Loan identified as foreign key" },
      { mark: "M1", text: "foreign key references StudentID in Student / links Loan to Student" },
      { mark: "B1", text: "one-to-many relationship identified" },
      { mark: "A1", text: "relationship explained: one student can have many loans; each loan belongs to one student" },
    ],
    strict: [
      "Do not award StudentID as primary key in Loan unless candidate also explains composite/alternate design; not intended here.",
      "Do not award foreign key mark if table location is not clear.",
      "Allow 1:M for one-to-many.",
      "FT: relationship explanation can follow correctly identified keys.",
    ],
  },
  {
    title: "Question 3",
    marks: "5 marks",
    prompt: "Explain why Name is usually not suitable as a primary key in a Student table.",
    answer: "Name is not suitable because it may not be unique; two students may have the same name. A name may also change or be entered in different formats. A primary key should uniquely identify each record and should be stable and not null. A StudentID is more suitable because it is allocated to identify one student record.",
    marking: [
      { mark: "B1", text: "names may not be unique / duplicate names possible" },
      { mark: "B1", text: "names may change or be entered inconsistently" },
      { mark: "M1", text: "primary key must uniquely identify records" },
      { mark: "M1", text: "primary key should be stable/not null" },
      { mark: "A1", text: "StudentID or allocated ID suggested as better key with reason" },
    ],
    strict: [
      "Do not accept 'Name is text' as a reason by itself.",
      "Do not require both change and formatting for the second B mark; either is enough.",
      "Allow candidate number or student number as equivalent allocated ID.",
      "FT: better-key mark depends on a valid explanation of uniqueness or stability.",
    ],
  },
  {
    title: "Question 4",
    marks: "6 marks",
    prompt: "A Club table stores ClubID and ClubName. A Membership table stores MembershipID, StudentID and ClubID. Explain the purpose of ClubID in each table.",
    answer: "ClubID is the primary key in Club because it uniquely identifies each club record. ClubID in Membership is a foreign key because it references ClubID in Club. It links each membership record to the club the student joined. ClubID may appear many times in Membership because many students can join the same club.",
    marking: [
      { mark: "B1", text: "ClubID identified as primary key in Club" },
      { mark: "M1", text: "primary key uniqueness for club records explained" },
      { mark: "B1", text: "ClubID identified as foreign key in Membership" },
      { mark: "M1", text: "foreign key references Club.ClubID / links membership to club" },
      { mark: "B1", text: "ClubID may repeat in Membership" },
      { mark: "A1", text: "repeat explained by many students/memberships for one club" },
    ],
    strict: [
      "Do not accept that ClubID must be unique in Membership.",
      "Do not award foreign key reference mark if only 'it is used to find club' is given without table link.",
      "Allow 'same ClubID occurs in several membership rows' for repeat mark.",
      "FT: if table names are swapped, only award marks that remain logically correct.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "Explain referential integrity using a library database with Student and Loan tables.",
    answer: "Referential integrity means that a foreign key value must match an existing primary key value in the referenced table. In a library database, StudentID in Loan should match an existing StudentID in Student. This prevents a loan being stored for a student who does not exist. If a Loan record contains StudentID S9999 but there is no S9999 in Student, the DBMS should reject the record or require the student record first.",
    marking: [
      { mark: "B1", text: "foreign key value must match/reference existing primary key value" },
      { mark: "M1", text: "referenced table idea included" },
      { mark: "B1", text: "StudentID in Loan as foreign key example" },
      { mark: "B1", text: "StudentID in Student as primary key example" },
      { mark: "M1", text: "prevents orphan/non-existent student loan record" },
      { mark: "A1", text: "invalid value example or DBMS rejection action" },
    ],
    strict: [
      "Do not accept 'keeps data correct' without reference matching idea.",
      "Do not require the term orphan record, but accept it if used correctly.",
      "Allow Book/Loan example if primary and foreign key roles are clear.",
      "FT: rejection example can follow any valid foreign-key mismatch.",
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
    name: "No. Names can be duplicated or changed.",
    tutor: "No. Many students share a tutor group.",
    studentid: "Correct. StudentID is designed to identify one student record uniquely.",
    phone: "No. Phone numbers can change and may not be available for every student.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = responses[button.dataset.hook];
    });
  });
}

function setupKeyPicker() {
  const input = document.querySelector("#keyInput");
  const result = document.querySelector("#keyResult");
  const reason = document.querySelector("#keyReason");
  document.querySelector("#keyBtn").addEventListener("click", () => {
    const item = keyMap[input.value];
    result.textContent = item.result;
    reason.textContent = item.reason;
  });
}

function setupRelationshipTool() {
  const input = document.querySelector("#relationshipInput");
  const result = document.querySelector("#relationshipResult");
  const reason = document.querySelector("#relationshipReason");
  document.querySelector("#relationshipBtn").addEventListener("click", () => {
    const item = relationshipMap[input.value];
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
  renderExample("library");
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
  setupKeyPicker();
  setupRelationshipTool();
  setupExamples();
  renderPractice();
  renderMistakes();
  renderExamQuestions();
}

init();
