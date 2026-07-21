const caseConcepts = {
  capacity: {
    concept: "Functional requirement / testable rule",
    answer: "The system must prevent reservations above capacity. This can later become a boundary test: capacity 20 accepts the 20th reservation but handles the 21st according to the rule.",
    trap: "Do not jump straight to interface colours. This is primarily a rule the system must enforce.",
  },
  field: {
    concept: "Data dictionary",
    answer: "ActivityID should be defined with data type, size, uniqueness and validation. Example: STRING, length 5, not blank, unique.",
    trap: "Do not list example ActivityID values only; define the data item.",
  },
  run: {
    concept: "Parallel changeover",
    answer: "The old and new systems run together, allowing outputs to be compared while the old method remains available.",
    trap: "Do not call it direct changeover; direct would stop the old system immediately.",
  },
  judge: {
    concept: "Evaluation against success criteria",
    answer: "The result gives evidence to compare with a measurable success criterion, such as sign-up completion time.",
    trap: "Do not treat this as testing only. It is a judgement about success using evidence.",
  },
};

const improvedAnswers = {
  easy: {
    weak: "The system should be easy to use.",
    improved: "At least 90% of trial students should reserve a place without help in under 2 minutes.",
    why: "The improved version is measurable and can be evaluated using user trial evidence.",
  },
  test: {
    weak: "Test it to see if it works.",
    improved: "Use planned test cases with normal, boundary and abnormal data; record expected and actual results for each activity sign-up rule.",
    why: "The improved version names test categories and evidence, not just a vague action.",
  },
  maintain: {
    weak: "Maintenance makes it better.",
    improved: "Perfective maintenance could improve the activity search speed after release if evaluation evidence shows users take too long to find activities.",
    why: "The improved version classifies the maintenance type and links it to evidence and consequence.",
  },
};

const examples = {
  requirements: {
    title: "Example 1: Requirement answer annotation",
    rows: [
      ["Question focus", "Improve the vague request: 'students should sign up easily'."],
      ["Mark-worthy answer", "Students should reserve a place from an activity list using StudentID and a confirm button; 90% of trial users should complete the task in under 2 minutes."],
      ["Why it earns marks", "It gives a functional requirement and a measurable success criterion in the scenario."],
      ["Common loss", "Writing 'make it user-friendly' without measurable evidence."],
    ],
  },
  testing: {
    title: "Example 2: Test case annotation",
    rows: [
      ["Rule", "Activity capacity is 20."],
      ["Test case", "Enter the 21st reservation when 20 places are already taken."],
      ["Expected result", "System rejects the reservation or adds the student to the waiting list, depending on the stated rule."],
      ["Why it earns marks", "It uses boundary data and states expected behaviour."],
    ],
  },
  evaluation: {
    title: "Example 3: Evaluation answer annotation",
    rows: [
      ["Evidence", "92% of students completed sign-up in under 2 minutes."],
      ["Criterion", "90% of students should complete sign-up in under 2 minutes."],
      ["Judgement", "The criterion is met because 92% is above the 90% target."],
      ["Consequence", "Further perfective maintenance may still improve the remaining difficult cases."],
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Which stage gathers user needs and success criteria?", accepted: ["analysis"], answer: "Analysis / requirements analysis." },
  { id: "p2", prompt: "Which design artefact defines ActivityID as STRING length 5?", accepted: ["data dictionary", "dictionary"], answer: "Data dictionary." },
  { id: "p3", prompt: "Which design artefact describes how a waiting list is updated?", accepted: ["algorithm", "pseudocode", "flowchart"], answer: "Algorithm design, such as pseudocode or a flowchart." },
  { id: "p4", prompt: "What kind of test data is the 21st reservation when capacity is 20?", accepted: ["boundary"], answer: "Boundary invalid data, because it is just outside the limit." },
  { id: "p5", prompt: "Which changeover method runs old and new systems together?", accepted: ["parallel"], answer: "Parallel changeover / parallel running." },
  { id: "p6", prompt: "Which maintenance type fixes a crash after release?", accepted: ["corrective"], answer: "Corrective maintenance." },
  { id: "p7", prompt: "Which maintenance type adapts the system to a new school timetable?", accepted: ["adaptive"], answer: "Adaptive maintenance." },
  { id: "p8", prompt: "Which maintenance type improves search speed?", accepted: ["perfective"], answer: "Perfective maintenance." },
  { id: "p9", prompt: "Which stage judges whether success criteria were met?", accepted: ["evaluation"], answer: "Evaluation." },
  { id: "p10", prompt: "What should an evaluation answer be based on?", accepted: ["evidence", "criteria", "success criteria", "requirements"], answer: "Evidence compared with requirements or success criteria." },
];

const mistakes = [
  {
    wrong: "A student answers every Section 12 question by listing the lifecycle stages.",
    fix: "Correction: identify the concept being tested first, then answer that concept in the scenario. A list is not enough for explain or evaluate questions.",
  },
  {
    wrong: "A student writes a test case with data but no expected result.",
    fix: "Correction: include test data, expected result and preferably actual result or purpose. Without expected result, the test cannot prove behaviour.",
  },
  {
    wrong: "A student says evaluation is just asking users if they like the system.",
    fix: "Correction: user feedback can be evidence, but evaluation must compare evidence with requirements and success criteria.",
  },
  {
    wrong: "A student classifies all post-release changes as corrective maintenance.",
    fix: "Correction: corrective fixes faults, adaptive responds to environment changes, and perfective improves performance, usability or features.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "6 marks",
    prompt: "A school activity sign-up system is being analysed. Write two functional requirements and one measurable success criterion.",
    answer: "Functional requirements: students can reserve and cancel a place for an activity; staff can create activities and set capacity; the system prevents reservations above capacity or places students on a waiting list. Success criterion: at least 90% of trial students can reserve a place without help in under 2 minutes.",
    marking: [
      { mark: "B1", text: "gives a valid functional requirement for students" },
      { mark: "A1", text: "student requirement is specific to sign-up/reservation/cancellation" },
      { mark: "B1", text: "gives a second distinct valid functional requirement" },
      { mark: "A1", text: "second requirement includes staff, capacity or waiting-list rule in context" },
      { mark: "M1", text: "gives a measurable success criterion with a threshold" },
      { mark: "A1", text: "criterion is linked to the activity sign-up scenario" },
    ],
    strict: [
      "Do not award full marks for vague claims such as 'easy' or 'fast' without measurement.",
      "Allow alternative valid requirements from the case study.",
      "Do not accept interface design choices alone as functional requirements.",
    ],
  },
  {
    title: "Question 2",
    marks: "6 marks",
    prompt: "For an activity with capacity 20, create suitable test cases for the reservation rule.",
    answer: "Normal test: reserve when 12 places are taken, expected accepted. Boundary valid test: reserve the 20th place, expected accepted. Boundary invalid test: attempt the 21st reservation, expected rejected or added to waiting list according to the rule. Abnormal test: enter a non-numeric capacity such as 'many', expected rejected with an error message.",
    marking: [
      { mark: "B1", text: "includes a normal valid test case" },
      { mark: "A1", text: "normal case has correct expected result" },
      { mark: "B1", text: "includes valid boundary case at capacity 20" },
      { mark: "A1", text: "valid boundary case has correct expected result" },
      { mark: "B1", text: "includes invalid boundary or abnormal case" },
      { mark: "A1", text: "invalid or abnormal case has correct expected result" },
    ],
    strict: [
      "Test data alone is insufficient for full credit; expected result is required.",
      "Allow waiting list or rejection for the 21st reservation if the rule is stated consistently.",
      "Do not accept 10 as boundary data.",
    ],
  },
  {
    title: "Question 3",
    marks: "6 marks",
    prompt: "Explain how design documentation could help implement and test the waiting-list feature.",
    answer: "An algorithm design can show the steps for checking whether an activity is full and then adding the student to a waiting list. A data dictionary can define fields such as ActivityID, StudentID, Capacity and WaitingListPosition, including types and validation. Interface design can show the messages displayed when a student is added to the waiting list. These documents guide implementation and provide expected rules for testing.",
    marking: [
      { mark: "B1", text: "mentions algorithm design for waiting-list processing" },
      { mark: "B1", text: "explains algorithm use in implementation or testing" },
      { mark: "B1", text: "mentions data dictionary or field definitions" },
      { mark: "B1", text: "explains data definitions/types/validation in context" },
      { mark: "B1", text: "mentions interface design or user messages" },
      { mark: "B1", text: "links design documentation to implementation or testing evidence" },
    ],
    strict: [
      "Do not award explanation marks for naming documents only.",
      "Allow flowchart or pseudocode as algorithm design.",
      "Do not accept final Java code alone as design documentation.",
    ],
  },
  {
    title: "Question 4",
    marks: "6 marks",
    prompt: "After release, the school asks for three changes: fix a cancellation fault, support a new timetable structure, and make activity search faster. Classify each maintenance type and justify your answer.",
    answer: "Fixing a cancellation fault is corrective maintenance because it fixes an error. Supporting a new timetable structure is adaptive maintenance because the system is changed for a new environment or rule. Making activity search faster is perfective maintenance because it improves performance after release.",
    marking: [
      { mark: "B1", text: "classifies cancellation fault fix as corrective" },
      { mark: "B1", text: "justifies corrective as fixing an error/fault" },
      { mark: "B1", text: "classifies new timetable structure as adaptive" },
      { mark: "B1", text: "justifies adaptive as responding to changed environment/rules" },
      { mark: "B1", text: "classifies faster search as perfective" },
      { mark: "B1", text: "justifies perfective as improving performance/usability/features" },
    ],
    strict: [
      "Classification and justification must match.",
      "Allow enhancement/improvement wording for perfective.",
      "Do not accept 'maintenance' alone without type.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "Evaluation evidence shows that 92% of students completed sign-up in under 2 minutes. The success criterion was 90%. Explain the evaluation judgement and one possible follow-up action.",
    answer: "The criterion is met because 92% is higher than the 90% target. This evidence suggests the system is successful for sign-up speed. However, 8% of students did not meet the target, so the school could review user feedback or logs for those cases. A perfective maintenance change, such as clearer activity filters, may improve the remaining cases.",
    marking: [
      { mark: "B1", text: "compares 92% with the 90% target" },
      { mark: "B1", text: "states the criterion is met" },
      { mark: "B1", text: "uses evidence to support an evaluation judgement" },
      { mark: "B1", text: "recognises remaining users or limitations" },
      { mark: "B1", text: "suggests a valid follow-up action such as feedback/log review" },
      { mark: "B1", text: "links follow-up to maintenance or improvement" },
    ],
    strict: [
      "Do not award comparison mark if the candidate ignores the 90% criterion.",
      "Allow equivalent wording such as 'success criterion has been achieved'.",
      "Do not accept 'users liked it' unless linked to evidence.",
    ],
  },
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalise(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function tableMarkup(rows) {
  return `
    <div class="data-table two-col">
      <div class="table-row table-head"><div>Focus</div><div>Detail</div></div>
      ${rows.map((row) => `<div class="table-row"><div>${escapeHtml(row[0])}</div><div>${escapeHtml(row[1])}</div></div>`).join("")}
    </div>
  `;
}

function setupPrint() {
  document.querySelector("#printBtn").addEventListener("click", () => window.print());
}

function setupHook() {
  const feedback = document.querySelector("#hookFeedback");
  const messages = {
    testing: { text: "Testing comes later. This stem asks how to improve a vague need before design begins.", correct: false },
    analysis: { text: "Correct. This is requirements analysis: make the vague need measurable before design.", correct: true },
    maintenance: { text: "Maintenance is after release. This question is before design.", correct: false },
    changeover: { text: "Changeover is about introducing a completed system, not clarifying user needs.", correct: false },
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      const result = messages[button.dataset.hook];
      feedback.textContent = result.text;
      feedback.className = `feedback ${result.correct ? "correct" : "incorrect"}`;
    });
  });
}

function setupCaseTool() {
  const select = document.querySelector("#caseSelect");
  const output = document.querySelector("#caseOutput");
  const render = () => {
    const item = caseConcepts[select.value];
    output.innerHTML = `
      <p><strong>Concept:</strong> ${escapeHtml(item.concept)}</p>
      <p><strong>Answer:</strong> ${escapeHtml(item.answer)}</p>
      <p><strong>Trap:</strong> ${escapeHtml(item.trap)}</p>
    `;
  };
  document.querySelector("#caseBtn").addEventListener("click", render);
  select.addEventListener("change", render);
  render();
}

function setupAnswerTool() {
  const select = document.querySelector("#answerSelect");
  const output = document.querySelector("#answerOutput");
  const render = () => {
    const item = improvedAnswers[select.value];
    output.innerHTML = `
      <p><strong>Weak:</strong> ${escapeHtml(item.weak)}</p>
      <p><strong>Improved:</strong> ${escapeHtml(item.improved)}</p>
      <p><strong>Why it earns marks:</strong> ${escapeHtml(item.why)}</p>
    `;
  };
  document.querySelector("#answerBtn").addEventListener("click", render);
  select.addEventListener("change", render);
  render();
}

function setupExamples() {
  const output = document.querySelector("#exampleOutput");
  const render = (key) => {
    const item = examples[key];
    output.innerHTML = `<h3>${escapeHtml(item.title)}</h3>${tableMarkup(item.rows)}`;
    document.querySelectorAll("[data-example]").forEach((button) => {
      button.classList.toggle("active", button.dataset.example === key);
    });
  };
  document.querySelectorAll("[data-example]").forEach((button) => {
    button.addEventListener("click", () => render(button.dataset.example));
  });
  render("requirements");
}

function setupPractice() {
  const list = document.querySelector("#practiceList");
  list.innerHTML = practice.map((item, index) => `
    <article class="practice-card">
      <h3>Practice ${index + 1}</h3>
      <p>${escapeHtml(item.prompt)}</p>
      <div class="answer-row">
        <input id="${item.id}" type="text" autocomplete="off" aria-label="Answer for practice ${index + 1}" />
        <button class="check-btn" type="button" data-check="${item.id}">Check</button>
      </div>
      <div class="feedback" id="${item.id}-feedback" aria-live="polite">Enter an answer, then check.</div>
      <button class="answer-toggle" type="button" data-answer="${item.id}">Show answer</button>
      <div class="answer-panel hidden" id="${item.id}-answer">${escapeHtml(item.answer)}</div>
    </article>
  `).join("");

  document.querySelectorAll("[data-check]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = practice.find((entry) => entry.id === button.dataset.check);
      const input = document.querySelector(`#${item.id}`);
      const feedback = document.querySelector(`#${item.id}-feedback`);
      const response = normalise(input.value);
      const correct = item.accepted.some((accepted) => response.includes(accepted));
      feedback.textContent = correct ? "Correct or close enough for this short check." : "Not quite. Identify the Section 12 concept first.";
      feedback.className = `feedback ${correct ? "correct" : "incorrect"}`;
    });
  });

  document.querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#${button.dataset.answer}-answer`);
      const hidden = panel.classList.toggle("hidden");
      button.textContent = hidden ? "Show answer" : "Hide answer";
    });
  });
}

function setupMistakes() {
  const list = document.querySelector("#mistakeList");
  list.innerHTML = mistakes.map((item, index) => `
    <article>
      <h3>Mistake ${index + 1}</h3>
      <p>${escapeHtml(item.wrong)}</p>
      <button class="answer-toggle" type="button" data-fix="m${index}">Show correction</button>
      <div class="answer-panel hidden" id="m${index}-fix">${escapeHtml(item.fix)}</div>
    </article>
  `).join("");

  document.querySelectorAll("[data-fix]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#${button.dataset.fix}-fix`);
      const hidden = panel.classList.toggle("hidden");
      button.textContent = hidden ? "Show correction" : "Hide correction";
    });
  });
}

function setupExam() {
  const list = document.querySelector("#examList");
  list.innerHTML = examQuestions.map((item, index) => `
    <article class="exam-card">
      <div class="exam-head">
        <h3>${escapeHtml(item.title)}</h3>
        <span>${escapeHtml(item.marks)}</span>
      </div>
      <p>${escapeHtml(item.prompt)}</p>
      <button class="ms-toggle" type="button" data-ms="q${index}">Show MS</button>
      <div class="ms-panel hidden" id="q${index}-ms">
        <h4>Indicative answer</h4>
        <p>${escapeHtml(item.answer)}</p>
        <h4>Mark scheme</h4>
        <ul>
          ${item.marking.map((mark) => `<li><strong>${escapeHtml(mark.mark)}</strong> ${escapeHtml(mark.text)}</li>`).join("")}
        </ul>
        <h4>Strict notes</h4>
        <ul>
          ${item.strict.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}
        </ul>
      </div>
    </article>
  `).join("");

  document.querySelectorAll("[data-ms]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#${button.dataset.ms}-ms`);
      const hidden = panel.classList.toggle("hidden");
      button.textContent = hidden ? "Show MS" : "Hide MS";
    });
  });
}

function init() {
  setupPrint();
  setupHook();
  setupCaseTool();
  setupAnswerTool();
  setupExamples();
  setupPractice();
  setupMistakes();
  setupExam();
}

document.addEventListener("DOMContentLoaded", init);
