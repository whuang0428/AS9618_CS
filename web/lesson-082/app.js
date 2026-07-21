const scenarioMap = {
  library: {
    result: "Entities: Student, Book, Loan.",
    reason: "Student and Book are main things; Loan is an event/entity that records the borrowing relationship with attributes such as LoanID and DateBorrowed.",
  },
  clinic: {
    result: "Entities: Patient, Doctor, Appointment.",
    reason: "Appointment is an event linking a patient and a doctor, with attributes such as AppointmentID, Date and Time.",
  },
  shop: {
    result: "Entities: Customer, Order, Product, OrderLine.",
    reason: "OrderLine is useful as a linking entity because an order can contain many products and a product can appear on many orders.",
  },
  club: {
    result: "Entities: Student, Club, Membership.",
    reason: "Membership resolves the many-to-many relationship between Student and Club and can store attributes such as JoinDate.",
  },
  parking: {
    result: "Entities: Employee, ParkingPermit.",
    reason: "The relationship may be optional: an employee may have zero or one permit, and each permit belongs to one employee.",
  },
};

const cardinalityMap = {
  customerOrders: {
    result: "Cardinality: one-to-many.",
    reason: "One customer can place many orders; each order belongs to one customer.",
  },
  studentsClubs: {
    result: "Cardinality: many-to-many.",
    reason: "Many students can join many clubs. A linking entity such as Membership is normally used.",
  },
  orderLines: {
    result: "Cardinality: one-to-many, mandatory on the order line side.",
    reason: "Each order has one or more order lines; each order line belongs to exactly one order.",
  },
  personPassport: {
    result: "Cardinality: one-to-one.",
    reason: "In this simplified system, each person links to one passport and each passport links to one person.",
  },
  studentLoans: {
    result: "Cardinality: one-to-many with optional participation for Student.",
    reason: "A student may have zero or many loans; each loan must refer to exactly one student.",
  },
};

const examples = {
  library: {
    title: "Example 1: Library ER model",
    problem: "A library stores students, books and loans. A student may borrow many books over time.",
    steps: [
      "Entities: Student, Book and Loan.",
      "Student attributes: StudentID, Name, TutorGroup.",
      "Book attributes: BookID, Title, Author.",
      "Loan attributes: LoanID, StudentID, BookID, DateBorrowed, DateReturned.",
      "Cardinality: one Student can have many Loan records; one Book can appear in many Loan records over time.",
    ],
  },
  clinic: {
    title: "Example 2: Clinic appointments",
    problem: "A clinic stores patients, doctors and appointments.",
    steps: [
      "Entities: Patient, Doctor and Appointment.",
      "Appointment is an event entity because it links a patient to a doctor at a date and time.",
      "A patient can have many appointments; each appointment has one patient.",
      "A doctor can have many appointments; each appointment has one doctor.",
    ],
  },
  club: {
    title: "Example 3: Many-to-many relationship",
    problem: "Students can join many clubs and each club can have many students.",
    steps: [
      "Direct Student-to-Club is many-to-many.",
      "Create a linking entity: Membership.",
      "Membership can store StudentID, ClubID and JoinDate.",
      "This converts the design into two one-to-many relationships: Student to Membership, and Club to Membership.",
    ],
  },
  critique: {
    title: "Example 4: Critique weak ER modelling",
    problem: "A student draws PhoneNumber as a separate entity for a simple Student database.",
    steps: [
      "If each student stores only one phone number, PhoneNumber is likely an attribute of Student.",
      "Making it an entity adds unnecessary complexity.",
      "It may become an entity only if the system stores multiple phone numbers, phone types, ownership history or shared contact records.",
      "Exam wording: justify the decision using the scenario, not personal preference.",
    ],
  },
};

const practice = [
  {
    id: "p1",
    prompt: "What term means a thing the database stores data about?",
    accepted: ["entity"],
    answer: "Entity",
  },
  {
    id: "p2",
    prompt: "What term means a property stored about an entity?",
    accepted: ["attribute", "field"],
    answer: "Attribute / field",
  },
  {
    id: "p3",
    prompt: "What term describes how many records in one entity may link to another?",
    accepted: ["cardinality"],
    answer: "Cardinality",
  },
  {
    id: "p4",
    prompt: "In a library model, Student, Book and Loan are examples of what?",
    accepted: ["entities", "entity"],
    answer: "Entities",
  },
  {
    id: "p5",
    prompt: "StudentID and Name are likely attributes of which entity?",
    accepted: ["student"],
    answer: "Student",
  },
  {
    id: "p6",
    prompt: "What relationship exists if one customer can place many orders?",
    accepted: ["one to many", "one-to-many", "1:m", "1 to many"],
    answer: "One-to-many",
  },
  {
    id: "p7",
    prompt: "What relationship exists if students can join many clubs and clubs can have many students?",
    accepted: ["many to many", "many-to-many", "m:n"],
    answer: "Many-to-many",
  },
  {
    id: "p8",
    prompt: "What kind of entity often resolves a many-to-many relationship?",
    accepted: ["linking entity", "link entity", "associative entity", "junction entity", "linking table"],
    answer: "Linking entity / associative entity",
  },
  {
    id: "p9",
    prompt: "In 0..*, does zero mean optional or mandatory?",
    accepted: ["optional"],
    answer: "Optional",
  },
  {
    id: "p10",
    prompt: "Is every noun in a scenario automatically an entity? yes or no.",
    accepted: ["no"],
    answer: "No",
  },
];

const mistakes = [
  {
    wrong: "Every noun in the scenario should be an entity.",
    fix: "Only model a noun as an entity if the system stores separate records about it. Some nouns are attributes.",
  },
  {
    wrong: "PhoneNumber must be an entity because it is important.",
    fix: "Importance does not decide entity status. If it is just one value stored for each student, it is usually an attribute.",
  },
  {
    wrong: "Many-to-many relationships can be left as one direct relationship in a relational database design.",
    fix: "They are usually resolved using a linking entity/table, such as Membership between Student and Club.",
  },
  {
    wrong: "Cardinality means the data type of an attribute.",
    fix: "Cardinality describes how many records in one entity can be associated with records in another entity.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "4 marks",
    prompt: "Define entity and attribute in the context of entity-relationship modelling.",
    answer: "An entity is a thing about which the database stores data, such as Student or Book. An attribute is a property stored about an entity, such as StudentID or Name for a Student.",
    marking: [
      { mark: "B1", text: "entity described as thing/object/person/event/concept about which data is stored" },
      { mark: "M1", text: "valid entity example" },
      { mark: "B1", text: "attribute described as property/field describing an entity" },
      { mark: "A1", text: "valid attribute example linked to an entity" },
    ],
    strict: [
      "Do not accept only 'entity is a table' without stored-data idea.",
      "Do not accept only 'attribute is data' without property/field idea.",
      "Allow table/field wording if entity/attribute meaning is clear.",
      "FT: attribute example can follow the candidate's valid entity example.",
    ],
  },
  {
    title: "Question 2",
    marks: "6 marks",
    prompt: "A library stores data about students, books and loans. Identify three entities and give one suitable attribute for each.",
    answer: "Student is an entity with attributes such as StudentID or Name. Book is an entity with attributes such as BookID, ISBN or Title. Loan is an entity/event with attributes such as LoanID, DateBorrowed, StudentID or BookID.",
    marking: [
      { mark: "B1", text: "Student identified as entity" },
      { mark: "M1", text: "suitable Student attribute" },
      { mark: "B1", text: "Book identified as entity" },
      { mark: "M1", text: "suitable Book attribute" },
      { mark: "B1", text: "Loan identified as entity/event" },
      { mark: "M1", text: "suitable Loan attribute" },
    ],
    strict: [
      "Do not award attribute mark if it belongs mainly to a different entity.",
      "Do not require exact attribute names if scenario meaning is clear.",
      "Allow DateReturned as Loan attribute.",
      "FT: if a candidate uses Borrowing instead of Loan, award if role is clear.",
    ],
  },
  {
    title: "Question 3",
    marks: "6 marks",
    prompt: "Explain the cardinality between Customer and Order if one customer can place many orders and each order is placed by one customer.",
    answer: "The relationship is one-to-many from Customer to Order. One Customer record can be linked to many Order records. Each Order record is linked to exactly one Customer. This means CustomerID would typically be used in Order to identify which customer placed the order.",
    marking: [
      { mark: "B1", text: "one-to-many relationship identified" },
      { mark: "M1", text: "one customer can have many orders" },
      { mark: "M1", text: "each order belongs to one customer" },
      { mark: "B1", text: "direction clear: Customer to Order" },
      { mark: "B1", text: "foreign key/linking field such as CustomerID in Order" },
      { mark: "A1", text: "explanation linked to ER model/database design" },
    ],
    strict: [
      "Do not accept many-to-many for this wording.",
      "Do not award direction mark if the answer is ambiguous about which side is many.",
      "Allow 1:M notation.",
      "FT: foreign-key mark can follow correct cardinality explanation.",
    ],
  },
  {
    title: "Question 4",
    marks: "6 marks",
    prompt: "Students can join many clubs, and each club can have many students. Explain how this relationship can be represented in an ER model.",
    answer: "Student and Club have a many-to-many relationship. This can be represented using a linking entity such as Membership. Membership would include attributes such as StudentID, ClubID and JoinDate. The model then has a one-to-many relationship from Student to Membership and a one-to-many relationship from Club to Membership.",
    marking: [
      { mark: "B1", text: "many-to-many relationship identified" },
      { mark: "B1", text: "linking/associative entity named, such as Membership" },
      { mark: "M1", text: "StudentID included or Student link explained" },
      { mark: "M1", text: "ClubID included or Club link explained" },
      { mark: "B1", text: "attribute of linking entity such as JoinDate/MembershipID" },
      { mark: "A1", text: "explains conversion into two one-to-many relationships" },
    ],
    strict: [
      "Do not accept direct one-to-many only.",
      "Do not require the term associative entity if linking entity/table is clear.",
      "Allow Enrolment as a valid linking entity name.",
      "FT: if the linking entity is valid, accept suitable scenario-specific attributes.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "A designer models Address as a separate entity in a simple Student database where each student has one address. Evaluate this modelling choice.",
    answer: "If the system stores only one address for each student and no separate facts about addresses, Address could be an attribute of Student rather than a separate entity. Making it a separate entity may add unnecessary complexity. However, Address may be a separate entity if several students can share an address, if address history is stored, or if multiple addresses per student are required. The choice depends on the scenario requirements.",
    marking: [
      { mark: "B1", text: "recognises Address may be an attribute of Student in simple case" },
      { mark: "M1", text: "reason: one address per student / no separate address records needed" },
      { mark: "B1", text: "unnecessary complexity identified" },
      { mark: "B1", text: "condition where Address could be an entity, such as shared/multiple/history" },
      { mark: "M1", text: "condition explained using stored records or relationships" },
      { mark: "A1", text: "balanced judgement based on scenario requirements" },
    ],
    strict: [
      "Do not accept 'Address is always an attribute' without considering scenario.",
      "Do not accept 'Address is important so it is an entity' as a reason.",
      "Allow contact details or phone number as parallel explanation if linked back to Address.",
      "FT: judgement can support either model if conditions are explicit.",
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
    student: "Student is an entity, but it is not the relationship event here.",
    book: "Book is an entity, but the borrowing event is more useful for the relationship.",
    loan: "Correct. Loan records the event linking a student and a book.",
    title: "BookTitle is usually an attribute of Book, not an entity or relationship event.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = responses[button.dataset.hook];
    });
  });
}

function setupScenarioParser() {
  const input = document.querySelector("#scenarioInput");
  const result = document.querySelector("#scenarioResult");
  const reason = document.querySelector("#scenarioReason");
  document.querySelector("#scenarioBtn").addEventListener("click", () => {
    const item = scenarioMap[input.value];
    result.textContent = item.result;
    reason.textContent = item.reason;
  });
}

function setupCardinalityChecker() {
  const input = document.querySelector("#cardinalityInput");
  const result = document.querySelector("#cardinalityResult");
  const reason = document.querySelector("#cardinalityReason");
  document.querySelector("#cardinalityBtn").addEventListener("click", () => {
    const item = cardinalityMap[input.value];
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
  setupScenarioParser();
  setupCardinalityChecker();
  setupExamples();
  renderPractice();
  renderMistakes();
  renderExamQuestions();
}

init();
