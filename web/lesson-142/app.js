const modelAdvice = {
  stable: {
    model: "Waterfall / structured lifecycle",
    reason: "Requirements are stable, so a planned sequence with documentation and sign-off is suitable.",
    warning: "If requirements change late, earlier stages may need expensive rework.",
  },
  uncertain: {
    model: "Iterative or agile-style development",
    reason: "Short cycles and user feedback help refine unclear requirements before too much is built.",
    warning: "The project still needs control; iteration is not an excuse to avoid documentation.",
  },
  critical: {
    model: "Planned lifecycle with strong testing and evaluation",
    reason: "High-risk systems need evidence, traceability and careful testing before release.",
    warning: "Rapid change without control can increase risk.",
  },
};

const orderAdvice = {
  "analysis-design": {
    first: "Analysis usually comes before design.",
    reason: "Design should be based on identified requirements, users and constraints.",
  },
  "design-code": {
    first: "Design usually comes before implementation.",
    reason: "Implementation should follow a planned interface, data and algorithm design.",
  },
  "test-maintain": {
    first: "Testing usually comes before release and maintenance.",
    reason: "Maintenance happens after use or release, while testing checks the system before or during release.",
  },
};

const examples = {
  booking: {
    title: "Example 1: School booking system",
    answer: "Analysis should identify who books rooms, what data is stored, booking rules, conflicts and reports. Design then plans screens, validation, data structures and algorithms. Implementation builds the system. Testing checks requirements such as rejecting double bookings. Evaluation decides whether the system meets user needs, and maintenance fixes faults or adapts to new school rules.",
    points: [
      "Analysis before design prevents guessing requirements.",
      "Testing is linked to a measurable requirement.",
      "Maintenance is not failure; it is controlled change after release.",
    ],
  },
  change: {
    title: "Example 2: Changing requirements",
    answer: "If users discover during testing that they need recurring bookings, the project may return to analysis to refine the requirement and then design to change the data model. This shows the lifecycle can be iterative rather than a fixed one-way checklist.",
    points: [
      "Feedback can move the project back to earlier stages.",
      "A clear requirement change affects design and implementation.",
      "The answer names the trigger: user feedback during testing.",
    ],
  },
  maintenance: {
    title: "Example 3: Maintenance after release",
    answer: "Maintenance may correct faults, adapt the system to new requirements, or improve performance/usability. For example, a booking system may need an update when the school adds weekend bookings. The maintenance log records what changed and why.",
    points: [
      "Corrective maintenance fixes faults.",
      "Adaptive maintenance handles changed requirements or environment.",
      "Perfective maintenance improves usability or performance.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Which lifecycle stage identifies requirements?", accepted: ["analysis"], answer: "Analysis." },
  { id: "p2", prompt: "Which stage plans interfaces, data and algorithms?", accepted: ["design"], answer: "Design." },
  { id: "p3", prompt: "Which stage turns the design into code/modules?", accepted: ["implementation", "coding"], answer: "Implementation." },
  { id: "p4", prompt: "Which stage checks the system against expected results?", accepted: ["testing"], answer: "Testing." },
  { id: "p5", prompt: "Which stage judges whether the completed system meets objectives?", accepted: ["evaluation"], answer: "Evaluation." },
  { id: "p6", prompt: "Which stage fixes, adapts or improves the system after release?", accepted: ["maintenance"], answer: "Maintenance." },
  { id: "p7", prompt: "Which model is most one-way and sequential: waterfall or iterative?", accepted: ["waterfall"], answer: "Waterfall." },
  { id: "p8", prompt: "Which approach uses repeated cycles and feedback?", accepted: ["iterative", "agile"], answer: "Iterative / agile-style development." },
  { id: "p9", prompt: "Name one artefact produced during analysis.", accepted: ["requirements", "specification"], answer: "Requirements specification." },
  { id: "p10", prompt: "True or false: testing can reveal the need to revisit design.", accepted: ["true"], answer: "True." },
];

const mistakes = [
  {
    wrong: "A student writes: 'The lifecycle is analysis, design, code, test, done.'",
    fix: "Add evaluation and maintenance, and explain feedback loops rather than treating the process as finished forever.",
  },
  {
    wrong: "A student says design should happen before requirements are known.",
    fix: "Analysis should identify requirements first; design is based on those requirements.",
  },
  {
    wrong: "A student claims agile means no planning or documentation.",
    fix: "Agile-style development uses short cycles and feedback, but still needs planning, testing and control.",
  },
  {
    wrong: "A student says maintenance only means fixing broken code.",
    fix: "Maintenance can be corrective, adaptive or perfective: fix faults, adapt to change, or improve the system.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "6 marks",
    prompt: "A school wants a new room booking system. Describe the purpose of the analysis, design and testing stages.",
    answer: "Analysis identifies users, requirements and constraints, such as who can book rooms and how double bookings are prevented. Design plans the solution, including interfaces, data storage, validation and algorithms. Testing checks the implemented system against expected results and requirements, such as rejecting a booking conflict.",
    marking: [
      { mark: "B1", text: "states analysis identifies user needs/requirements/constraints" },
      { mark: "B1", text: "gives booking-system analysis example" },
      { mark: "B1", text: "states design plans the solution/interface/data/algorithms" },
      { mark: "B1", text: "gives booking-system design example" },
      { mark: "B1", text: "states testing checks the system against expected results/requirements" },
      { mark: "B1", text: "gives booking-system testing example" },
    ],
    strict: [
      "Do not award example marks for generic examples not linked to the booking system.",
      "Allow 'requirements specification' for analysis artefact.",
      "Do not accept 'testing finds if it is good' without expected results or requirements.",
    ],
  },
  {
    title: "Question 2",
    marks: "6 marks",
    prompt: "Compare waterfall and iterative lifecycle models for a project where user requirements are likely to change.",
    answer: "Waterfall follows planned stages in sequence and works best when requirements are stable. If requirements change late, rework can be costly. Iterative development uses repeated cycles of design, build, test and review, so user feedback can refine requirements earlier. Therefore an iterative model is often more suitable when requirements are uncertain.",
    marking: [
      { mark: "B1", text: "states waterfall follows a planned/sequential set of stages" },
      { mark: "B1", text: "explains waterfall suits stable requirements" },
      { mark: "B1", text: "explains late changes can cause costly rework in waterfall" },
      { mark: "B1", text: "states iterative development uses repeated cycles" },
      { mark: "B1", text: "explains feedback can refine requirements" },
      { mark: "B1", text: "selects iterative as more suitable for changing/uncertain requirements with reason" },
    ],
    strict: [
      "Do not award full marks for saying only 'agile is better'.",
      "Allow agile-style model as an iterative example.",
      "Do not accept waterfall as the best choice for changing requirements without strong justification.",
    ],
  },
  {
    title: "Question 3",
    marks: "5 marks",
    prompt: "Explain why weak analysis can cause problems later in the software development lifecycle.",
    answer: "Weak analysis can miss user requirements or constraints. The design may then be based on wrong assumptions, so implementation builds the wrong features. Testing and evaluation may reveal that the system does not meet user needs, causing rework and extra cost.",
    marking: [
      { mark: "B1", text: "states analysis identifies requirements/user needs/constraints" },
      { mark: "B1", text: "states weak analysis may miss or misunderstand requirements" },
      { mark: "B1", text: "links weak analysis to poor design or wrong implementation" },
      { mark: "B1", text: "links later testing/evaluation to discovering the problem" },
      { mark: "B1", text: "explains consequence such as rework, delay, cost or unsuitable system" },
    ],
    strict: [
      "Do not award consequence mark for vague 'bad system' alone.",
      "Allow client/user needs as equivalent to requirements.",
      "Do not require a named lifecycle model.",
    ],
  },
  {
    title: "Question 4",
    marks: "6 marks",
    prompt: "State three lifecycle artefacts and explain how each is used.",
    answer: "A requirements specification is produced during analysis and states what the system must do. A design specification is produced during design and guides implementation. A test plan/results document is used during testing to compare actual results with expected results and record faults.",
    marking: [
      { mark: "B1", text: "names requirements specification or equivalent" },
      { mark: "B1", text: "explains it states what the system must do" },
      { mark: "B1", text: "names design specification or equivalent" },
      { mark: "B1", text: "explains it guides implementation/design decisions" },
      { mark: "B1", text: "names test plan/results or equivalent" },
      { mark: "B1", text: "explains it records tests/results or compares actual with expected" },
    ],
    strict: [
      "Artefact marks require named documents/outputs, not just stage names.",
      "Allow user documentation or maintenance log with correct use.",
      "Do not award use mark if it repeats the artefact name only.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "A student says the lifecycle always finishes after testing. Explain why this is incorrect.",
    answer: "After testing, the system should be evaluated against objectives and user requirements. It may then be released and maintained. Maintenance can fix faults, adapt the system to new requirements or improve usability/performance. Testing or evaluation can also reveal issues that require returning to design or implementation.",
    marking: [
      { mark: "B1", text: "states evaluation occurs after or alongside testing" },
      { mark: "B1", text: "explains evaluation checks objectives/user requirements" },
      { mark: "B1", text: "states maintenance can happen after release/use" },
      { mark: "B1", text: "gives valid maintenance type/example such as corrective/adaptive/perfective" },
      { mark: "B1", text: "explains feedback may send project back to earlier stages" },
      { mark: "B1", text: "links feedback to design/implementation/requirements rework" },
    ],
    strict: [
      "Do not award full marks for listing stages without explaining why testing is not the end.",
      "Allow post-implementation review for evaluation if meaning is clear.",
      "Do not accept maintenance as only 'using the system'.",
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

function setupPrint() {
  document.querySelector("#printBtn").addEventListener("click", () => window.print());
}

function setupHook() {
  const feedback = document.querySelector("#hookFeedback");
  const messages = {
    code: { text: "Too early. Coding vague wishes usually creates confident wrongness.", correct: false },
    ask: { text: "Correct. Analysis turns vague requests into measurable requirements.", correct: true },
    test: { text: "Testing needs something built and expected results to compare against.", correct: false },
    maintain: { text: "Maintenance happens after release/use, not before requirements are known.", correct: false },
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

function setupModelTool() {
  const select = document.querySelector("#modelSelect");
  const output = document.querySelector("#modelOutput");
  const render = () => {
    const item = modelAdvice[select.value];
    output.innerHTML = `
      <p><strong>Suggested model:</strong> ${escapeHtml(item.model)}</p>
      <p><strong>Reason:</strong> ${escapeHtml(item.reason)}</p>
      <p><strong>Watch out:</strong> ${escapeHtml(item.warning)}</p>
    `;
  };
  document.querySelector("#modelBtn").addEventListener("click", render);
  select.addEventListener("change", render);
  render();
}

function setupOrderTool() {
  const select = document.querySelector("#orderSelect");
  const output = document.querySelector("#orderOutput");
  const render = () => {
    const item = orderAdvice[select.value];
    output.innerHTML = `
      <p><strong>Usually first:</strong> ${escapeHtml(item.first)}</p>
      <p><strong>Reason:</strong> ${escapeHtml(item.reason)}</p>
    `;
  };
  document.querySelector("#orderBtn").addEventListener("click", render);
  select.addEventListener("change", render);
  render();
}

function renderExample(key) {
  const example = examples[key];
  document.querySelector("#exampleOutput").innerHTML = `
    <article class="example-card">
      <h3>${escapeHtml(example.title)}</h3>
      <p>${escapeHtml(example.answer)}</p>
      <ul>${example.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul>
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
      const input = document.querySelector(`#${item.id}`);
      const feedback = document.querySelector(`#${item.id}-feedback`);
      const value = normalise(input.value);
      const correct = item.accepted.some((answer) => value.includes(answer));
      feedback.textContent = correct ? "Correct." : "Not quite. Reveal the answer and tighten the lifecycle term.";
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
  setupModelTool();
  setupOrderTool();
  setupExamples();
  setupPractice();
  setupMistakes();
  setupExam();
}

init();
