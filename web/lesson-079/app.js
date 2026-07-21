const scenarioMap = {
  singleList: {
    result: "Best choice: flat-file database.",
    reason: "The data is small, single-purpose and unlikely to contain repeated related entities, so one table is simple and sufficient.",
  },
  club: {
    result: "Best choice: relational database.",
    reason: "Members, sessions and fees are related but separate entities. Repeated contact details and regular updates make relational design more suitable.",
  },
  shop: {
    result: "Best choice: relational database.",
    reason: "Customers, orders and products have relationships. Storing customer and product details once reduces redundancy and inconsistency.",
  },
  survey: {
    result: "Best choice: flat-file database.",
    reason: "One row per anonymous respondent may be simple enough if there are no repeated entities or complex updates.",
  },
  clinic: {
    result: "Best choice: relational database.",
    reason: "Patients, appointments, staff and prescriptions are related entities with repeated details, many updates and strong consistency requirements.",
  },
};

const anomalyMap = {
  changedEmail: {
    result: "Problem: update anomaly.",
    reason: "The same fact is stored in several places. Updating only one copy creates inconsistent contact details.",
  },
  newMember: {
    result: "Problem: insertion anomaly.",
    reason: "The structure prevents storing a new member unless a related session row also exists.",
  },
  deleteLast: {
    result: "Problem: deletion anomaly.",
    reason: "Deleting one row removes the only copy of separate member data that should have been stored elsewhere.",
  },
  smallList: {
    result: "No major anomaly in this scenario.",
    reason: "A small one-off list with no repeated related data may be acceptable as a flat file.",
  },
};

const examples = {
  club: {
    title: "Example 1: Club records",
    problem: "A club stores members, contact details, sessions attended and whether fees are paid.",
    steps: [
      "Flat-file issue: member contact details are repeated for every session row.",
      "Consequence: if a phone number changes, every repeated row must be updated or the data becomes inconsistent.",
      "Relational approach: store member details in one Member table and attendance/payment rows in a separate table.",
      "Judgement: relational is more suitable because the data is related, repeated and updated often.",
    ],
  },
  shop: {
    title: "Example 2: Online shop",
    problem: "An online shop stores customers, products and orders.",
    steps: [
      "Customers can place many orders and each order may contain multiple products.",
      "A flat file may repeat customer address and product details across many order rows.",
      "A relational database can store Customer, Product and Order data in separate linked tables.",
      "This reduces redundancy and helps keep prices, addresses and product details consistent.",
    ],
  },
  survey: {
    title: "Example 3: Small survey",
    problem: "A teacher collects anonymous one-time survey answers from 20 students.",
    steps: [
      "There may be one row per response and no repeated student details.",
      "A flat-file structure may be quicker and simpler to create.",
      "A relational database would add design complexity without much benefit.",
      "Judgement: flat-file is acceptable if the dataset remains small and simple.",
    ],
  },
  mistake: {
    title: "Example 4: Weak comparison repair",
    problem: "Weak answer: 'Relational is better because it is more organised.'",
    steps: [
      "Problem: 'more organised' is too vague.",
      "Better: relational databases separate related data into linked tables.",
      "Cause: this reduces repeated storage of the same customer or member details.",
      "Consequence: updates are more consistent because the shared fact can be changed once.",
    ],
  },
};

const practice = [
  {
    id: "p1",
    prompt: "What type of database stores data in a single table?",
    accepted: ["flat file", "flat-file", "flat file database", "flat-file database"],
    answer: "Flat-file database",
  },
  {
    id: "p2",
    prompt: "What type of database stores data in multiple linked tables?",
    accepted: ["relational", "relational database"],
    answer: "Relational database",
  },
  {
    id: "p3",
    prompt: "What term means unnecessary repeated storage of the same data?",
    accepted: ["redundancy", "data redundancy", "redundant data"],
    answer: "Redundancy / data redundancy",
  },
  {
    id: "p4",
    prompt: "What problem occurs when repeated values are changed in some rows but not others?",
    accepted: ["inconsistency", "data inconsistency", "inconsistent data", "update anomaly"],
    answer: "Data inconsistency / update anomaly",
  },
  {
    id: "p5",
    prompt: "Which structure is usually simpler for a small one-off list with no repeated related data?",
    accepted: ["flat file", "flat-file", "flat file database", "flat-file database"],
    answer: "Flat-file database",
  },
  {
    id: "p6",
    prompt: "Which structure is usually better for customers, orders and products?",
    accepted: ["relational", "relational database"],
    answer: "Relational database",
  },
  {
    id: "p7",
    prompt: "What anomaly occurs when deleting a row accidentally removes the only copy of another fact?",
    accepted: ["deletion anomaly", "delete anomaly"],
    answer: "Deletion anomaly",
  },
  {
    id: "p8",
    prompt: "What anomaly occurs when a new entity cannot be stored until another related fact exists?",
    accepted: ["insertion anomaly", "insert anomaly"],
    answer: "Insertion anomaly",
  },
  {
    id: "p9",
    prompt: "Complete: relational design can improve consistency because shared data may be stored ____.",
    accepted: ["once", "only once", "one time"],
    answer: "once",
  },
  {
    id: "p10",
    prompt: "Is a relational database always the best choice for every dataset? yes or no.",
    accepted: ["no"],
    answer: "No",
  },
];

const mistakes = [
  {
    wrong: "A flat-file database is just a text file, so it is not a real database.",
    fix: "A flat-file database is a database structure where data is held in a single table. The exam focus is the single-table structure, not the file extension.",
  },
  {
    wrong: "Relational databases remove all duplication.",
    fix: "Relational design reduces unnecessary redundancy by storing shared facts once, but some repeated linking values may still be used to connect records.",
  },
  {
    wrong: "Relational is better because it is more secure.",
    fix: "Security is mainly a DBMS/access-control issue. For this comparison, explain reduced redundancy, improved consistency, easier updates or relationship handling.",
  },
  {
    wrong: "A flat file is always bad.",
    fix: "A flat file can be suitable for a small, simple, single-purpose dataset with little repeated related data and few updates.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "4 marks",
    prompt: "Describe two differences between a flat-file database and a relational database.",
    answer: "A flat-file database stores data in one table, while a relational database stores data in multiple linked tables. A flat-file database is more likely to repeat related data, whereas a relational database can reduce redundancy by storing shared data once and linking to it where needed.",
    marking: [
      { mark: "B1", text: "flat-file described as one/single table" },
      { mark: "B1", text: "relational described as multiple linked/related tables" },
      { mark: "B1", text: "flat-file linked to repeated data/redundancy" },
      { mark: "B1", text: "relational linked to reduced redundancy or improved consistency" },
    ],
    strict: [
      "Do not accept only 'relational is better' without a stated difference.",
      "Do not award both structure marks if the candidate only says 'different tables' with no link idea.",
      "Allow 'single file/table' for flat-file if the single-table idea is clear.",
    ],
  },
  {
    title: "Question 2",
    marks: "6 marks",
    prompt: "A club currently stores member, session and payment data in one flat-file table. Explain why a relational database may be more suitable.",
    answer: "A relational database may be more suitable because member details, session details and payment records are related but separate types of data. In a flat file, member contact details may be repeated for every session attended, causing redundancy. If a contact detail changes, every repeated row must be updated or inconsistent values may remain. Separating data into linked tables means member details can be stored once and referenced by payment or session records, improving consistency and maintainability.",
    marking: [
      { mark: "B1", text: "identifies separate related data/entities such as members/sessions/payments" },
      { mark: "B1", text: "flat file may repeat member/session/payment details" },
      { mark: "B1", text: "redundancy explained in club context" },
      { mark: "B1", text: "risk of inconsistent data or update anomaly" },
      { mark: "B1", text: "relational linked tables/store shared data once" },
      { mark: "B1", text: "clear consequence such as easier updates/improved consistency/maintainability" },
    ],
    strict: [
      "Do not accept vague 'it is easier' without cause.",
      "Do not award context mark for generic customer/order examples only.",
      "Allow contact details, fees or session data as repeated data examples.",
    ],
  },
  {
    title: "Question 3",
    marks: "4 marks",
    prompt: "Give one advantage and one disadvantage of using a flat-file database for a small school trip list.",
    answer: "An advantage is that a flat-file database is simple and quick to create for a small one-off list, especially if each student appears only once. A disadvantage is that if the same contact details or medical notes are repeated in several rows, updates may be missed and inconsistent data may result. Therefore it is suitable only if the data stays small, simple and has little repetition.",
    marking: [
      { mark: "B1", text: "advantage such as simple/quick/easy to set up" },
      { mark: "B1", text: "advantage linked to small one-off school trip context" },
      { mark: "B1", text: "disadvantage such as repeated data/redundancy/inconsistency" },
      { mark: "B1", text: "disadvantage linked to contact/medical/student detail updates" },
    ],
    strict: [
      "Do not accept 'flat files are cheap' unless linked to simple setup or no complex DBMS need.",
      "Do not award disadvantage for security unless tied to the database structure.",
      "Allow repeated emergency contact or parent phone details.",
    ],
  },
  {
    title: "Question 4",
    marks: "6 marks",
    prompt: "Explain three problems that may occur when related data is stored in one flat-file table.",
    answer: "The table may contain redundancy because the same customer or member details are repeated in many rows. This may cause an update anomaly: if one copy is changed and another is not, the database contains inconsistent values. It may also cause a deletion anomaly: deleting the last row for an order or session could remove the only copy of details about a customer, member or product.",
    marking: [
      { mark: "B1", text: "redundancy/repeated data identified" },
      { mark: "B1", text: "redundancy explained with related data repeated across rows" },
      { mark: "B1", text: "update anomaly/inconsistency identified" },
      { mark: "B1", text: "update problem explained as some copies changed and others not" },
      { mark: "B1", text: "insertion or deletion anomaly identified" },
      { mark: "B1", text: "insertion/deletion problem explained with loss or inability to store a separate fact" },
    ],
    strict: [
      "Do not award three marks for listing three vague 'errors' without explanation.",
      "Do not accept security or backup as structure problems unless linked to flat-file repetition.",
      "Allow insertion anomaly instead of deletion anomaly for the third pair.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "An online shop stores customer name and address on every order row. Discuss whether it should change to a relational database.",
    answer: "Changing to a relational database would help because each customer may place many orders, so storing the name and address on every order row repeats data. If an address changes, a flat file may need many rows to be updated and old rows may become inconsistent. A relational database could store customer details once in a Customer table and link orders to that customer. This improves consistency and makes updates easier. However, if the shop is very small with few orders, the relational design may add unnecessary complexity. Overall, relational is more suitable as the number of customers and orders grows.",
    marking: [
      { mark: "B1", text: "recognises repeated customer details across order rows" },
      { mark: "B1", text: "explains redundancy in online shop context" },
      { mark: "B1", text: "update/inconsistency problem from address changes" },
      { mark: "B1", text: "relational solution: customer details stored once and linked to orders" },
      { mark: "B1", text: "possible disadvantage/condition such as added complexity for very small data" },
      { mark: "B1", text: "recommends whether to adopt the relational design using current data volume, expected growth and repeated customer details" },
    ],
    strict: [
      "Do not accept 'relational is more professional' as a reason.",
      "Do not require exact table names if the linked-table idea is clear.",
      "Allow customer, product or order details as repeated-data examples.",
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
    redundancy: "Correct. Repeated data is the structural issue that can lead to inconsistent updates.",
    password: "No. Weak passwords are a security issue, but not the main flat-file vs relational structure issue.",
    binary: "No. Representation is a different syllabus area.",
    processor: "No. CPU cache has wandered into the wrong classroom.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = responses[button.dataset.hook];
    });
  });
}

function setupScenarioChooser() {
  const input = document.querySelector("#scenarioInput");
  const result = document.querySelector("#scenarioResult");
  const reason = document.querySelector("#scenarioReason");
  document.querySelector("#scenarioBtn").addEventListener("click", () => {
    const item = scenarioMap[input.value];
    result.textContent = item.result;
    reason.textContent = item.reason;
  });
}

function setupAnomalyChecker() {
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
  renderExample("club");
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
  setupScenarioChooser();
  setupAnomalyChecker();
  setupExamples();
  renderPractice();
  renderMistakes();
  renderExamQuestions();
}

init();
