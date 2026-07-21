const redundancyMap = {
  courseTitle: {
    result: "Problem: unnecessary redundancy.",
    reason: "CourseTitle depends on CourseID, not on the enrolment row. It should be stored once in a Course table.",
  },
  studentId: {
    result: "Usually acceptable repetition.",
    reason: "StudentID may repeat as a linking value in Enrolment when a student takes several courses. This is not the same as repeating descriptive student facts.",
  },
  orderId: {
    result: "Usually acceptable repetition.",
    reason: "OrderID can repeat in OrderLine to link several items to the same order.",
  },
  tutorEmail: {
    result: "Problem: unnecessary redundancy.",
    reason: "TutorEmail describes the tutor and may be repeated many times. Store it in a Tutor table and link to it.",
  },
  membershipId: {
    result: "Not a redundancy problem.",
    reason: "MembershipID is unique for each membership row, so it is not a repeated descriptive fact.",
  },
};

const anomalyMap = {
  update: {
    result: "Anomaly: update anomaly.",
    reason: "A repeated fact is changed in some copies but not others, leaving inconsistent data.",
  },
  insert: {
    result: "Anomaly: insertion anomaly.",
    reason: "A course fact cannot be stored unless an unrelated enrolment fact also exists.",
  },
  delete: {
    result: "Anomaly: deletion anomaly.",
    reason: "Deleting a row removes the only stored copy of a separate fact such as CourseTitle.",
  },
  atomic: {
    result: "Issue: not in first normal form.",
    reason: "A field should store one atomic value, not a repeating list of phone numbers.",
  },
  validLink: {
    result: "Not an anomaly by itself.",
    reason: "A foreign key such as CourseID may repeat to link many enrolments to one course.",
  },
};

const examples = {
  course: {
    title: "Example 1: Course enrolments",
    problem: "Enrolment(StudentID, StudentName, CourseID, CourseTitle, TutorEmail)",
    steps: [
      "Problem: StudentName repeats when a student takes several courses.",
      "Problem: CourseTitle and TutorEmail repeat for every student on the same course.",
      "Better design: Student(StudentID, StudentName), Course(CourseID, CourseTitle, TutorEmail), Enrolment(StudentID, CourseID).",
      "Effect: updating a course title or tutor email needs one change, reducing inconsistent data.",
    ],
  },
  order: {
    title: "Example 2: Order lines",
    problem: "OrderLine(OrderID, CustomerName, ProductID, ProductName, Quantity, UnitPrice)",
    steps: [
      "CustomerName depends on the customer/order, not each product line.",
      "ProductName and UnitPrice may repeat for every order line containing that product.",
      "Better design separates Customer, Order, Product and OrderLine.",
      "OrderLine keeps linking fields and transaction-specific facts such as Quantity.",
    ],
  },
  phone: {
    title: "Example 3: 1NF issue",
    problem: "Student(StudentID, Name, PhoneNumbers) where PhoneNumbers stores '0207..., 0799..., 0161...'.",
    steps: [
      "The PhoneNumbers field contains a repeating group/list.",
      "This violates the 1NF idea because values are not atomic.",
      "Better design: store one phone number per row in a related StudentPhone table if multiple phone numbers are needed.",
      "This makes searching, updating and validating each phone number clearer.",
    ],
  },
  judge: {
    title: "Example 4: Judgement answer",
    problem: "Explain why normalisation is useful but not magic.",
    steps: [
      "Useful: it reduces unnecessary redundancy and the risk of anomalies.",
      "Useful: it can improve data integrity by storing each fact in one appropriate place.",
      "Limitation: it can make the design more complex because data is split across more tables.",
      "Precise judgement: normalisation is justified when repeated related data creates maintenance risks.",
    ],
  },
};

const practice = [
  {
    id: "p1",
    prompt: "What process organises tables to reduce unnecessary redundancy?",
    accepted: ["normalisation", "normalization"],
    answer: "Normalisation / normalization",
  },
  {
    id: "p2",
    prompt: "What term means unnecessary repeated storage of the same data?",
    accepted: ["redundancy", "data redundancy"],
    answer: "Redundancy / data redundancy",
  },
  {
    id: "p3",
    prompt: "What anomaly happens when repeated data is changed in some rows but not others?",
    accepted: ["update anomaly", "update"],
    answer: "Update anomaly",
  },
  {
    id: "p4",
    prompt: "What anomaly happens when a new fact cannot be stored until another unrelated fact exists?",
    accepted: ["insertion anomaly", "insert anomaly", "insertion"],
    answer: "Insertion anomaly",
  },
  {
    id: "p5",
    prompt: "What anomaly happens when deleting a row removes the only copy of another fact?",
    accepted: ["deletion anomaly", "delete anomaly", "deletion"],
    answer: "Deletion anomaly",
  },
  {
    id: "p6",
    prompt: "In 1NF, should a field store one atomic value or a list?",
    accepted: ["one atomic value", "atomic value", "one value", "single value"],
    answer: "One atomic value",
  },
  {
    id: "p7",
    prompt: "If CourseTitle depends on CourseID, which table should normally store CourseTitle?",
    accepted: ["course", "course table"],
    answer: "Course table",
  },
  {
    id: "p8",
    prompt: "Is repeated foreign key CourseID in Enrolment always a bad redundancy? yes or no.",
    accepted: ["no"],
    answer: "No",
  },
  {
    id: "p9",
    prompt: "What does normalisation usually improve by reducing inconsistent repeated data?",
    accepted: ["data integrity", "integrity"],
    answer: "Data integrity",
  },
  {
    id: "p10",
    prompt: "Can normalisation make a database design more complex by adding tables? yes or no.",
    accepted: ["yes"],
    answer: "Yes",
  },
];

const mistakes = [
  {
    wrong: "Normalisation removes all repeated values.",
    fix: "Normalisation reduces unnecessary repeated facts. Foreign key values may still repeat to link records.",
  },
  {
    wrong: "An update anomaly means the database cannot be updated.",
    fix: "An update anomaly means repeated copies of a fact may be updated inconsistently.",
  },
  {
    wrong: "1NF means every table must have exactly one field.",
    fix: "1NF means fields should store atomic values and avoid repeating groups, not that a table has one field.",
  },
  {
    wrong: "Normalisation is done mainly to make SQL shorter.",
    fix: "Normalisation is mainly about reducing redundancy, avoiding anomalies and improving data integrity. SQL comes later.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "4 marks",
    prompt: "Explain two reasons for normalising a database.",
    answer: "Normalisation reduces unnecessary data redundancy by storing each fact in an appropriate table. It also helps avoid update, insertion and deletion anomalies, which improves data integrity and reduces inconsistent data.",
    marking: [
      { mark: "B1", text: "reduces unnecessary redundancy/repeated data" },
      { mark: "B1", text: "explains storing facts once/in appropriate table" },
      { mark: "B1", text: "avoids anomalies or names update/insertion/deletion anomaly" },
      { mark: "B1", text: "links to improved data integrity/consistency" },
    ],
    strict: [
      "Do not accept vague 'makes it better' without a database-design reason.",
      "Do not accept 'removes all duplicates' without qualification.",
      "Allow normalization spelling.",
    ],
  },
  {
    title: "Question 2",
    marks: "6 marks",
    prompt: "A table stores StudentID, StudentName, CourseID, CourseTitle and TutorEmail for every enrolment. Explain three problems this may cause.",
    answer: "The table repeats CourseTitle and TutorEmail for every student enrolled on the same course, causing redundancy. If TutorEmail changes, some rows may be updated and others missed, causing an update anomaly and inconsistent data. It may also cause an insertion anomaly because a new course may not be stored until a student enrols, or a deletion anomaly if deleting the last enrolment removes the only copy of the course title.",
    marking: [
      { mark: "B1", text: "repeated CourseTitle/TutorEmail or similar redundancy identified" },
      { mark: "B1", text: "redundancy linked to every enrolment/student row" },
      { mark: "B1", text: "update anomaly/inconsistent update identified" },
      { mark: "B1", text: "update problem explained with some rows changed and others not" },
      { mark: "B1", text: "insertion or deletion anomaly identified" },
      { mark: "B1", text: "insertion/deletion problem explained in course/enrolment context" },
    ],
    strict: [
      "Do not award anomaly marks for only listing anomaly names without mechanism.",
      "Do not accept security or backup issues as normalisation problems here.",
      "Allow CourseTitle, TutorEmail or StudentName as repeated facts if context is clear.",
    ],
  },
  {
    title: "Question 3",
    marks: "6 marks",
    prompt: "Suggest a more normalised design for Enrolment(StudentID, StudentName, CourseID, CourseTitle, TutorEmail).",
    answer: "A more normalised design is Student(StudentID, StudentName), Course(CourseID, CourseTitle, TutorEmail) and Enrolment(StudentID, CourseID). StudentID is the primary key in Student and CourseID is the primary key in Course. Enrolment uses StudentID and CourseID as linking fields/foreign keys so the student's name and course details do not need to be repeated in every enrolment row.",
    marking: [
      { mark: "B1", text: "Student table with StudentID and StudentName" },
      { mark: "B1", text: "Course table with CourseID and CourseTitle/TutorEmail" },
      { mark: "B1", text: "Enrolment/linking table with StudentID and CourseID" },
      { mark: "B1", text: "primary key or unique identifier roles described correctly" },
      { mark: "B1", text: "foreign key/linking role described correctly" },
      { mark: "B1", text: "explains reduced repetition of student/course details" },
    ],
    strict: [
      "Do not require exact table names if roles are clear.",
      "Do not award reduced-repetition mark if all descriptive fields remain in Enrolment.",
      "Allow composite key in Enrolment if explained.",
    ],
  },
  {
    title: "Question 4",
    marks: "5 marks",
    prompt: "A field PhoneNumbers stores several phone numbers separated by commas. Explain the normalisation issue and a possible solution.",
    answer: "The field stores a repeating group/list rather than one atomic value, so it does not follow the first normal form idea. This makes individual phone numbers harder to search, update or validate. A solution is to create a related StudentPhone table with one phone number per record, linked to the Student table by StudentID.",
    marking: [
      { mark: "B1", text: "repeating group/list identified" },
      { mark: "B1", text: "atomic value / 1NF idea stated" },
      { mark: "B1", text: "problem such as hard to search/update/validate individual numbers" },
      { mark: "B1", text: "separate related table suggested" },
      { mark: "B1", text: "one phone number per record and linked to Student/StudentID" },
    ],
    strict: [
      "Do not accept only 'use text' as a normalisation solution.",
      "Do not require the formal term 1NF if atomic-value idea is clear.",
      "Allow ContactNumber table or Phone table as equivalent.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "Evaluate whether normalisation is always beneficial.",
    answer: "Normalisation is beneficial because it reduces unnecessary redundancy, avoids update, insertion and deletion anomalies, and improves data integrity. For example, storing tutor email once avoids inconsistent repeated copies. However, normalisation may create more tables and make the design more complex, so retrieving data may require combining related tables. It is most justified when repeated related data is causing maintenance or integrity risks.",
    marking: [
      { mark: "B1", text: "benefit: reduced redundancy" },
      { mark: "B1", text: "benefit: avoids anomalies/improves integrity" },
      { mark: "B1", text: "benefit explained with repeated fact example" },
      { mark: "B1", text: "limitation: more tables/increased complexity" },
      { mark: "B1", text: "limitation explained, e.g. data must be combined from tables" },
      { mark: "B1", text: "concludes whether further normalisation is worthwhile by weighing anomaly reduction against extra tables and query complexity" },
    ],
    strict: [
      "Do not accept 'always good' without limitation.",
      "Do not accept performance claims without clear explanation.",
      "Allow maintainability as a benefit if linked to reduced repeated data.",
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
    update: "Correct. This is an update anomaly risk caused by repeated data.",
    binary: "No. The storage design is messy, not magically base-2.",
    faster: "No. Normalisation is mainly about integrity and redundancy, not automatic speed.",
    format: "No. Font drama is not a database anomaly.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = responses[button.dataset.hook];
    });
  });
}

function setupRedundancyDetector() {
  const input = document.querySelector("#redundancyInput");
  const result = document.querySelector("#redundancyResult");
  const reason = document.querySelector("#redundancyReason");
  document.querySelector("#redundancyBtn").addEventListener("click", () => {
    const item = redundancyMap[input.value];
    result.textContent = item.result;
    reason.textContent = item.reason;
  });
}

function setupAnomalyClassifier() {
  const input = document.querySelector("#anomalyInput");
  const result = document.querySelector("#anomalyResult");
  const reason = document.querySelector("#anomalyReason");
  document.querySelector("#anomalyBtn").addEventListener("click", () => {
    const item = anomalyMap[input.value];
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
  renderExample("course");
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
  setupRedundancyDetector();
  setupAnomalyClassifier();
  setupExamples();
  renderPractice();
  renderMistakes();
  renderExamQuestions();
}

init();
