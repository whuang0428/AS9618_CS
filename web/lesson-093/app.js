const classifierMap = {
  face: {
    topic: "Ethics / privacy / surveillance",
    reason: "Discuss stakeholders, consent, privacy loss, safety benefit, safeguards and a justified judgement.",
  },
  copy: {
    topic: "Copyright and licensing",
    reason: "A licence sets permitted use. Installing beyond the licence terms may infringe copyright.",
  },
  repeat: {
    topic: "Relational design / normalisation",
    reason: "Repeated customer details suggest duplication. Separate customer and purchase data into related tables.",
  },
  group: {
    topic: "SQL aggregate with GROUP BY",
    reason: "The phrase 'in each product category' asks for a grouped summary, such as SUM or COUNT with GROUP BY.",
  },
  verify: {
    topic: "Verification",
    reason: "Checking typed data against a source document is verification, not validation.",
  },
};

const customers = [
  { CustomerID: "C01", Name: "Ada", Region: "North", Points: 1280 },
  { CustomerID: "C02", Name: "Bo", Region: "South", Points: 760 },
  { CustomerID: "C03", Name: "Chen", Region: "North", Points: 1540 },
  { CustomerID: "C04", Name: "Dia", Region: "South", Points: 1110 },
];

function groupByRegion(aggregate, label) {
  const groups = customers.reduce((acc, row) => {
    acc[row.Region] = acc[row.Region] || [];
    acc[row.Region].push(row);
    return acc;
  }, {});
  return Object.entries(groups).map(([Region, rows]) => ({ Region, [label]: aggregate(rows) }));
}

const queryMap = {
  q1: {
    fields: ["Name"],
    rows: customers.filter((row) => row.Points > 1000).map((row) => ({ Name: row.Name })),
  },
  q2: {
    fields: ["Name", "Points"],
    rows: [...customers].sort((a, b) => b.Points - a.Points).map((row) => ({ Name: row.Name, Points: row.Points })),
  },
  q3: {
    fields: ["Region", "COUNT(*)"],
    rows: groupByRegion((rows) => rows.length, "COUNT(*)"),
  },
  q4: {
    fields: ["Region", "SUM(Points)"],
    rows: groupByRegion((rows) => rows.reduce((total, row) => total + row.Points, 0), "SUM(Points)"),
  },
};

const examples = {
  ethics: {
    title: "Example 1: Balanced ethics answer",
    problem: "A school wants to use facial recognition to record attendance. Discuss this decision.",
    steps: [
      "Benefit mark: attendance can be recorded quickly and may improve safeguarding.",
      "Concern mark: biometric data is personal data and misuse could reduce student privacy.",
      "Safeguard mark: use clear consent, limited retention, secure storage and restricted access.",
      "Judgement mark: the system is justified only if the safety benefit is proportionate and safeguards are enforced.",
    ],
  },
  licence: {
    title: "Example 2: Licensing answer",
    problem: "A company copies proprietary software to extra computers without permission.",
    steps: [
      "Copyright protects the software owner's work.",
      "A licence grants permission under stated conditions, such as number of installations.",
      "Installing beyond those terms may breach the licence and infringe copyright.",
      "Open-source software may allow copying, but only under its own licence terms.",
    ],
  },
  design: {
    title: "Example 3: Relational design answer",
    problem: "A flat file repeats customer names and addresses for every purchase.",
    steps: [
      "Problem: repeated customer details cause duplication.",
      "Consequence: if an address changes, copies may become inconsistent.",
      "Improvement: store customer details once in Customer with CustomerID as primary key.",
      "Relationship: store CustomerID as a foreign key in Purchase.",
    ],
  },
  sql: {
    title: "Example 4: SQL answer",
    problem: "Output the total points for each region.",
    steps: [
      "Output the group label: SELECT Region.",
      "Use an aggregate: SUM(Points).",
      "Choose the table: FROM Customer.",
      "Group rows by region: GROUP BY Region.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Which term means a person or group affected by a computing decision?", accepted: ["stakeholder"], answer: "Stakeholder" },
  { id: "p2", prompt: "Which term means permission under conditions to use software?", accepted: ["licence", "license"], answer: "Licence / license" },
  { id: "p3", prompt: "Which right protects original software or creative work from unauthorised copying?", accepted: ["copyright"], answer: "Copyright" },
  { id: "p4", prompt: "Which term describes discarded electronic devices?", accepted: ["e-waste", "ewaste", "electronic waste"], answer: "E-waste / electronic waste" },
  { id: "p5", prompt: "Which key uniquely identifies each record in a table?", accepted: ["primary key", "primary"], answer: "Primary key" },
  { id: "p6", prompt: "Which key creates a relationship by matching a primary key in another table?", accepted: ["foreign key", "foreign"], answer: "Foreign key" },
  { id: "p7", prompt: "Which database design process reduces duplication by separating repeated data?", accepted: ["normalisation", "normalization"], answer: "Normalisation" },
  { id: "p8", prompt: "Which SQL clause filters records?", accepted: ["where"], answer: "WHERE" },
  { id: "p9", prompt: "Which SQL clause forms groups for aggregate summaries?", accepted: ["group by"], answer: "GROUP BY" },
  { id: "p10", prompt: "Which term checks entered data against an original source?", accepted: ["verification"], answer: "Verification" },
];

const mistakes = [
  {
    wrong: "Facial recognition is ethical because it is efficient.",
    fix: "Efficiency is only one benefit. A balanced answer must discuss stakeholders, privacy risk, consent, safeguards and whether the benefit is proportionate.",
  },
  {
    wrong: "Open-source software has no copyright, so anyone can do anything with it.",
    fix: "Open-source software still has copyright. The licence grants permissions and may impose conditions such as attribution or sharing modifications.",
  },
  {
    wrong: "A customer name is a good primary key because every customer has a name.",
    fix: "Names may be duplicated or changed. A primary key must be unique and reliable, so CustomerID is better.",
  },
  {
    wrong: "GROUP BY sorts the output alphabetically.",
    fix: "GROUP BY creates groups for aggregate calculations. ORDER BY sorts the result rows.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "6 marks",
    prompt: "A school plans to use facial recognition to record attendance. Discuss ethical issues involved.",
    answer: "Facial recognition may improve safety and reduce time spent taking attendance, which benefits staff and students. However, facial images are personal/biometric data, so students may lose privacy if data is collected without informed consent or retained for too long. The system may also be unfair if recognition is less accurate for some groups. It is only justified if the school has a clear purpose, gains consent where appropriate, restricts access, stores the data securely, sets a retention limit and offers an alternative method.",
    marking: [
      { mark: "B1", text: "identifies a relevant benefit such as safety/efficiency/attendance accuracy" },
      { mark: "B1", text: "applies benefit to school/staff/students" },
      { mark: "B1", text: "identifies privacy/biometric data/consent concern" },
      { mark: "B1", text: "explains consequence such as misuse, monitoring or unfair treatment" },
      { mark: "B1", text: "gives suitable safeguard such as consent, access control, retention limit or alternative method" },
      { mark: "B1", text: "judges whether facial-recognition attendance is proportionate using attendance benefit, biometric privacy/fairness risk and safeguards" },
    ],
    strict: [
      "Do not award full credit for one-sided 'good because safe' answers.",
      "Allow surveillance or data protection wording if personal data issue is clear.",
      "Do not require reference to a specific law.",
    ],
  },
  {
    title: "Question 2",
    marks: "5 marks",
    prompt: "Explain why copying proprietary software to more computers than allowed by its licence may be a problem.",
    answer: "Copyright protects the software owner's work from unauthorised copying. A proprietary licence gives permission to use the software only under stated conditions, such as a limited number of installations. Copying it to extra computers may breach the licence and infringe copyright, which can lead to legal or financial consequences for the organisation.",
    marking: [
      { mark: "B1", text: "copyright protects software/owner's work from unauthorised copying" },
      { mark: "B1", text: "licence grants permission under conditions" },
      { mark: "B1", text: "condition applied to number of installations/users/computers" },
      { mark: "B1", text: "explains breach/infringement when copied beyond permission" },
      { mark: "B1", text: "valid consequence such as legal action, fines or reputational damage" },
    ],
    strict: [
      "Do not accept 'it is illegal' alone without licence/copyright mechanism.",
      "Allow license spelling.",
      "Do not say open source means no restrictions.",
    ],
  },
  {
    title: "Question 3",
    marks: "6 marks",
    prompt: "A loyalty system stores CustomerName, Address, ProductName and Price in one purchase table, repeated for every purchase. Explain how a relational design could improve this.",
    answer: "Customer details can be stored once in a Customer table with CustomerID as the primary key. Purchase records can store CustomerID as a foreign key, linking each purchase to the correct customer. Product details can be stored once in a Product table with ProductID as the primary key, and Purchase can store ProductID as a foreign key. This reduces duplicated customer/product data and reduces update inconsistencies if an address or price changes.",
    marking: [
      { mark: "B1", text: "identifies Customer table / stores customer details once" },
      { mark: "B1", text: "identifies Product table / stores product details once" },
      { mark: "B1", text: "uses suitable primary key such as CustomerID/ProductID" },
      { mark: "B1", text: "uses foreign keys in Purchase to link related tables" },
      { mark: "B1", text: "explains reduced duplication" },
      { mark: "B1", text: "explains reduced inconsistency/update errors" },
    ],
    strict: [
      "Do not award relationship marks for merely saying 'make more tables' without keys.",
      "Allow Order/Sale table instead of Purchase if relationships are clear.",
      "Do not require a full ER diagram.",
    ],
  },
  {
    title: "Question 4",
    marks: "4 marks",
    prompt: "The Customer table has fields CustomerID, Name, Region and Points. Write an SQL query to output Region and total Points for each Region.",
    answer: "SELECT Region, SUM(Points) FROM Customer GROUP BY Region;",
    marking: [
      { mark: "B1", text: "SELECT Region" },
      { mark: "B1", text: "uses SUM(Points)" },
      { mark: "B1", text: "FROM Customer" },
      { mark: "M1", text: "GROUP BY Region" },
    ],
    strict: [
      "Do not accept COUNT(Points) for total points.",
      "Do not award GROUP BY mark for ORDER BY Region.",
      "Allow field order SUM(Points), Region unless output order is specified.",
    ],
  },
  {
    title: "Question 5",
    marks: "5 marks",
    prompt: "A clerk enters customer details from paper forms into a database. Explain validation and verification, using this scenario.",
    answer: "Validation checks that entered data follows rules before it is accepted, for example checking that CustomerID is present or that Points is numeric and within a valid range. Verification checks that entered data matches the original source, for example proofreading the typed address against the paper form or using double entry. Validation can reject impossible formats, but it cannot prove a plausible address is true; verification helps detect copying errors from the source document.",
    marking: [
      { mark: "B1", text: "defines validation as checking data against rules" },
      { mark: "B1", text: "valid scenario example such as presence/type/range check" },
      { mark: "B1", text: "defines verification as checking against source/original data" },
      { mark: "B1", text: "valid scenario example such as proofreading/double entry against form" },
      { mark: "B1", text: "contrasts validation cannot prove truth with verification checking copying accuracy" },
    ],
    strict: [
      "Do not accept 'validation makes data correct'.",
      "Allow format check for email/postcode if linked to rules.",
      "Do not accept verification as checking password identity in this database-entry context.",
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
    privacy: "Topic: ethics/privacy. First move: identify stakeholders, benefit, concern, safeguard and judgement.",
    key: "Topic: database design. First move: choose a unique and reliable primary key such as CustomerID.",
    sql: "Topic: SQL retrieval. First move: SELECT required fields, FROM table, WHERE Points > 1000.",
    licence: "Topic: copyright/licensing. First move: explain permission under licence conditions.",
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

function setupBuilder() {
  const benefit = document.querySelector("#benefitInput");
  const concern = document.querySelector("#concernInput");
  const safeguard = document.querySelector("#safeguardInput");
  const result = document.querySelector("#builderResult");
  document.querySelector("#buildBtn").addEventListener("click", () => {
    result.innerHTML = `<strong>Built paragraph:</strong> Although the system ${benefit.value}, it ${concern.value}. Therefore, it is justified only if ${safeguard.value}.`;
  });
}

function renderQueryTable(query) {
  const table = queryMap[query];
  const columns = table.fields;
  const rows = table.rows;
  return `
    <div class="mini-result" style="--cols: ${columns.length}">
      <div class="table-row table-head">${columns.map((field) => `<div>${field}</div>`).join("")}</div>
      ${rows.map((row) => `<div class="table-row">${columns.map((field) => `<div>${row[field]}</div>`).join("")}</div>`).join("")}
    </div>
  `;
}

function setupQueryTracer() {
  const input = document.querySelector("#queryInput");
  const result = document.querySelector("#queryResult");
  document.querySelector("#queryBtn").addEventListener("click", () => {
    result.innerHTML = renderQueryTable(input.value);
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
  renderExample("ethics");
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
  setupBuilder();
  setupQueryTracer();
  setupExamples();
  renderPractice();
  renderMistakes();
  renderExamQuestions();
}

init();
