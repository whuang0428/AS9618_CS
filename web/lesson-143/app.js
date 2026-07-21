const rewrites = {
  easy: {
    vague: "Make it easy to use",
    requirement: "Teachers should be able to create a room booking by selecting date, period and room from labelled controls.",
    criterion: "At least 8 out of 10 teachers can create a booking without help in under 2 minutes after one demonstration.",
    test: "Ask 10 teachers to create a sample booking and record completion time and help needed.",
  },
  fast: {
    vague: "Make it fast",
    requirement: "The system should search room availability for a selected day and period.",
    criterion: "Search results should be displayed within 2 seconds for at least 95 out of 100 searches.",
    test: "Run 100 searches using representative data and record response times.",
  },
  safe: {
    vague: "Make it secure",
    requirement: "Only authenticated staff should be able to create or cancel bookings.",
    criterion: "Unauthenticated users and student accounts cannot create, edit or cancel bookings.",
    test: "Attempt booking actions using guest, student and staff accounts and record access results.",
  },
};

const criteriaChecks = {
  vague: {
    verdict: "Weak",
    reason: "Reliable is important, but this sentence does not say what reliability means or how it will be measured.",
    improve: "Example: the system is available for 99% of school hours during a one-month trial.",
  },
  measurable: {
    verdict: "Strong",
    reason: "It gives a measurable target: booking request processed in under 3 seconds.",
    improve: "Add test conditions, such as typical school-day load, for an even stronger criterion.",
  },
  opinion: {
    verdict: "Weak",
    reason: "Beautiful is subjective, so different users may judge it differently.",
    improve: "Example: 8 out of 10 trial users rate the interface at least 4 out of 5 for clarity.",
  },
};

const examples = {
  booking: {
    title: "Example 1: Room booking system",
    rows: [
      ["Vague request", "Teachers should book rooms easily."],
      ["Functional requirement", "Teachers can create, edit and cancel room bookings."],
      ["Success criterion", "A teacher can create a booking in under 2 minutes without help."],
      ["Acceptance test", "Give teachers a sample booking task and record time and help needed."],
    ],
  },
  library: {
    title: "Example 2: Library search system",
    rows: [
      ["Vague request", "Search should be good."],
      ["Functional requirement", "Users can search books by title, author or ISBN."],
      ["Success criterion", "At least 95% of searches return matching results within 2 seconds."],
      ["Acceptance test", "Run a set of known title, author and ISBN searches and record result accuracy and time."],
    ],
  },
  security: {
    title: "Example 3: Staff access control",
    rows: [
      ["Vague request", "The system should be secure."],
      ["Functional requirement", "Only staff accounts can create or cancel bookings."],
      ["Success criterion", "Guest and student accounts are denied booking actions in all test cases."],
      ["Acceptance test", "Attempt create and cancel actions using guest, student and staff accounts."],
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Which lifecycle stage produces the requirements specification?", accepted: ["analysis"], answer: "Analysis." },
  { id: "p2", prompt: "What type of requirement describes what the system must do?", accepted: ["functional"], answer: "Functional requirement." },
  { id: "p3", prompt: "What type of requirement describes qualities such as performance or usability?", accepted: ["non-functional", "non functional"], answer: "Non-functional requirement." },
  { id: "p4", prompt: "What term describes a measurable target used to judge whether the system is successful?", accepted: ["success criterion", "success criteria"], answer: "Success criterion / success criteria." },
  { id: "p5", prompt: "What test checks whether a requirement has been met before acceptance?", accepted: ["acceptance"], answer: "Acceptance test." },
  { id: "p6", prompt: "Is 'easy to use' measurable enough by itself? yes or no", accepted: ["no"], answer: "No. It needs a measurable criterion." },
  { id: "p7", prompt: "Name one method for gathering requirements.", accepted: ["interview", "questionnaire", "observation", "document"], answer: "Interview, questionnaire, observation, or document analysis." },
  { id: "p8", prompt: "Who provides user needs and constraints during analysis?", accepted: ["stakeholder", "user", "client"], answer: "Stakeholders / users / client." },
  { id: "p9", prompt: "Give one measurable word or phrase often useful in success criteria.", accepted: ["seconds", "minutes", "percent", "%", "at least", "within", "under"], answer: "Examples: within 2 seconds, under 2 minutes, at least 95%." },
  { id: "p10", prompt: "Why do success criteria help evaluation?", accepted: ["measure", "compare", "evidence", "judge"], answer: "They provide measurable evidence to compare against objectives." },
];

const mistakes = [
  {
    wrong: "A student writes: 'The system should be good and modern.'",
    fix: "Replace opinion words with measurable criteria, such as task completion time, error rate, uptime or user rating with a threshold.",
  },
  {
    wrong: "A student lists a design feature before saying what users need.",
    fix: "Start with analysis: identify stakeholders, tasks, data and constraints before design choices.",
  },
  {
    wrong: "A student says a success criterion is the same as a functional requirement.",
    fix: "A functional requirement states what the system must do; a success criterion states how success will be judged.",
  },
  {
    wrong: "A student gives an acceptance test but no expected result.",
    fix: "Add expected result, such as access denied, booking created, or results displayed within 2 seconds.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "6 marks",
    prompt: "A school wants a room booking system. Give two functional requirements and one non-functional requirement.",
    answer: "Functional requirements: teachers can create, edit and cancel room bookings; the system rejects a booking if the room is already booked at that time. Non-functional requirement: search results for room availability should display within 2 seconds.",
    marking: [
      { mark: "B1", text: "gives a valid functional requirement linked to booking actions" },
      { mark: "A1", text: "functional requirement is specific to the school booking context" },
      { mark: "B1", text: "gives a second distinct functional requirement" },
      { mark: "A1", text: "second requirement includes a clear rule/action/output" },
      { mark: "B1", text: "gives a valid non-functional requirement such as performance/usability/security" },
      { mark: "A1", text: "non-functional requirement is measurable or scenario-specific" },
    ],
    strict: [
      "Do not award full marks for vague statements such as 'easy' or 'fast' without detail.",
      "Allow equivalent booking-system requirements.",
      "Do not accept implementation details alone as requirements.",
      "FT: if context changes slightly, credit requirements that fit the stated school system.",
    ],
  },
  {
    title: "Question 2",
    marks: "6 marks",
    prompt: "Convert the vague requirement 'the system should be easy to use' into a measurable success criterion and an acceptance test.",
    answer: "Success criterion: at least 8 out of 10 teachers can create a room booking without help in under 2 minutes after one demonstration. Acceptance test: ask 10 teachers to create a sample booking and record whether they complete it, how long it takes and whether help is needed.",
    marking: [
      { mark: "B1", text: "recognises the original requirement is vague" },
      { mark: "M1", text: "success criterion includes a measurable threshold" },
      { mark: "A1", text: "criterion is linked to usability in the booking context" },
      { mark: "B1", text: "acceptance test states a user task" },
      { mark: "M1", text: "acceptance test records evidence such as time/help/completion" },
      { mark: "A1", text: "test evidence matches the success criterion" },
    ],
    strict: [
      "Do not award measurable threshold mark for 'users like it' alone.",
      "Allow different valid thresholds if measurable.",
      "Do not require exactly 10 teachers if sample size and evidence are clear.",
      "FT: acceptance test can follow candidate's measurable criterion.",
    ],
  },
  {
    title: "Question 3",
    marks: "5 marks",
    prompt: "Explain why requirements analysis is important before design and implementation.",
    answer: "Requirements analysis identifies users, tasks, data and constraints. Design should be based on these requirements, otherwise the system may be designed for the wrong problem. Implementation may then build features users do not need, causing rework, extra cost or a system that fails evaluation.",
    marking: [
      { mark: "B1", text: "states analysis identifies requirements/user needs/tasks/constraints" },
      { mark: "M1", text: "explains design should be based on requirements" },
      { mark: "M1", text: "links weak/missing analysis to wrong implementation/features" },
      { mark: "A1", text: "explains consequence such as rework, cost, delay or unsuitable system" },
      { mark: "A1", text: "links to later testing/evaluation or acceptance" },
    ],
    strict: [
      "Do not award consequence mark for vague 'it will be bad'.",
      "Allow stakeholders/users/client as source of requirements.",
      "Do not accept coding first as good practice without justification.",
      "FT: later-stage consequence can follow any clear missed requirement.",
    ],
  },
  {
    title: "Question 4",
    marks: "6 marks",
    prompt: "State three methods of gathering requirements and give one advantage of each.",
    answer: "Interviews allow detailed questions and follow-up. Questionnaires can collect answers from many users quickly. Observation shows how users actually carry out current tasks. Document analysis can reveal existing forms, reports and data rules.",
    marking: [
      { mark: "B1", text: "names interview as a method" },
      { mark: "A1", text: "gives valid interview advantage" },
      { mark: "B1", text: "names questionnaire/survey as a method" },
      { mark: "A1", text: "gives valid questionnaire advantage" },
      { mark: "B1", text: "names observation or document analysis as a method" },
      { mark: "A1", text: "gives valid advantage for third method" },
    ],
    strict: [
      "method and advantage must match.",
      "Allow workshop, prototype feedback or examining current system if explained.",
      "Do not award advantage marks for 'it is better' without reason.",
      "FT: credit any three valid methods with matching advantages.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "A requirement says 'the system should be secure'. Explain why this is weak and improve it with two measurable criteria.",
    answer: "The requirement is weak because secure is vague and does not say what access or protection is needed. Improved criteria: only authenticated staff can create or cancel bookings; after five failed login attempts the account is locked for 10 minutes; all booking changes are recorded with username and timestamp.",
    marking: [
      { mark: "B1", text: "identifies 'secure' as vague/not measurable" },
      { mark: "M1", text: "explains it does not specify access/protection rule" },
      { mark: "A1", text: "first improved criterion is measurable/testable" },
      { mark: "A1", text: "first criterion is security-related" },
      { mark: "A1", text: "second improved criterion is measurable/testable" },
      { mark: "A1", text: "second criterion is distinct and security-related" },
    ],
    strict: [
      "Do not award both improved criteria marks for two versions of the same vague wording.",
      "Allow authentication, authorisation, audit log, backup or lockout criteria if measurable.",
      "Do not require the exact examples in the answer.",
      "FT: criteria can follow a different system context if security meaning is clear.",
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
      <div class="table-row table-head"><div>Step</div><div>Answer</div></div>
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
    nice: { text: "Nice is an opinion. The examiner cannot time or measure it.", correct: false },
    fast: { text: "Correct. It states a user, task and measurable time threshold.", correct: true },
    modern: { text: "Modern is subjective unless you define measurable evidence.", correct: false },
    good: { text: "Good is too vague. Good at what, and how will we prove it?", correct: false },
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

function setupRewriter() {
  const select = document.querySelector("#rewriteSelect");
  const output = document.querySelector("#rewriteOutput");
  const render = () => {
    const item = rewrites[select.value];
    output.innerHTML = `
      <p><strong>Vague request:</strong> ${escapeHtml(item.vague)}</p>
      <p><strong>Requirement:</strong> ${escapeHtml(item.requirement)}</p>
      <p><strong>Success criterion:</strong> ${escapeHtml(item.criterion)}</p>
      <p><strong>Acceptance test:</strong> ${escapeHtml(item.test)}</p>
    `;
  };
  document.querySelector("#rewriteBtn").addEventListener("click", render);
  select.addEventListener("change", render);
  render();
}

function setupCriteriaTool() {
  const select = document.querySelector("#criteriaSelect");
  const output = document.querySelector("#criteriaOutput");
  const render = () => {
    const item = criteriaChecks[select.value];
    output.innerHTML = `
      <p><strong>Verdict:</strong> ${escapeHtml(item.verdict)}</p>
      <p><strong>Reason:</strong> ${escapeHtml(item.reason)}</p>
      <p><strong>Improvement:</strong> ${escapeHtml(item.improve)}</p>
    `;
  };
  document.querySelector("#criteriaBtn").addEventListener("click", render);
  select.addEventListener("change", render);
  render();
}

function renderExample(key) {
  const example = examples[key];
  document.querySelector("#exampleOutput").innerHTML = `
    <article class="example-card">
      <h3>${escapeHtml(example.title)}</h3>
      ${tableMarkup(example.rows)}
    </article>
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
  renderExample("booking");
}

function setupPractice() {
  const container = document.querySelector("#practiceList");
  container.innerHTML = practice.map((item, index) => `
    <article class="practice-card">
      <label for="${item.id}"><strong>${index + 1}.</strong> ${escapeHtml(item.prompt)}</label>
      <div class="practice-row">
        <input id="${item.id}" type="text" autocomplete="off" />
        <button class="check-btn" type="button" data-check="${item.id}">Check</button>
        <button class="answer-toggle" type="button" data-answer="${item.id}">Show answer</button>
      </div>
      <div class="feedback" id="${item.id}-feedback" aria-live="polite"></div>
      <div class="answer-panel hidden" id="${item.id}-answer">${escapeHtml(item.answer)}</div>
    </article>
  `).join("");

  document.querySelectorAll("[data-check]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = practice.find((entry) => entry.id === button.dataset.check);
      const value = normalise(document.querySelector(`#${item.id}`).value);
      const feedback = document.querySelector(`#${item.id}-feedback`);
      const correct = item.accepted.some((answer) => value.includes(answer));
      feedback.textContent = correct ? "Correct." : "Not quite. Reveal the answer and tighten the requirement term.";
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
  const container = document.querySelector("#mistakeList");
  container.innerHTML = mistakes.map((item, index) => `
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
  const container = document.querySelector("#examList");
  container.innerHTML = examQuestions.map((question, index) => `
    <article class="exam-card">
      <div class="exam-head">
        <h3>${escapeHtml(question.title)}</h3>
        <span>${escapeHtml(question.marks)}</span>
      </div>
      <p>${escapeHtml(question.prompt)}</p>
      <button class="ms-toggle" type="button" data-ms="q${index}">Show MS</button>
      <div class="ms-panel hidden" id="q${index}-ms">
        <h4>Answer</h4>
        <p>${escapeHtml(question.answer)}</p>
        <h4>Mark scheme</h4>
        <ul>${question.marking.map((row) => `<li><strong>${escapeHtml(row.mark)}</strong> ${escapeHtml(row.text)}</li>`).join("")}</ul>
        <h4>Strict notes</h4>
        <ul>${question.strict.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}</ul>
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
  setupRewriter();
  setupCriteriaTool();
  setupExamples();
  setupPractice();
  setupMistakes();
  setupExam();
}

init();
