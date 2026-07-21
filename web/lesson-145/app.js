const stageScenarios = {
  build: {
    stage: "Implementation",
    reason: "The design is being turned into program modules, files, interfaces and configuration.",
    examTip: "Mention implementation only when the answer is about building, installing or configuring the system.",
  },
  compare: {
    stage: "Testing",
    reason: "The key evidence is actual output compared with expected output for planned test data.",
    examTip: "A strong testing answer names test data, expected result and actual result.",
  },
  fix: {
    stage: "Maintenance",
    reason: "The system has already been released, and a change is being made after delivery.",
    examTip: "Classify the change if possible: corrective, adaptive or perfective.",
  },
  judge: {
    stage: "Evaluation",
    reason: "The final system is being judged against requirements and measurable success criteria.",
    examTip: "Evaluation needs evidence, not just opinions.",
  },
};

const testValues = {
  24: {
    category: "Normal data",
    expected: "Accepted",
    reason: "24 is a typical valid value within the range 1 to 30.",
  },
  30: {
    category: "Boundary / extreme valid data",
    expected: "Accepted",
    reason: "30 is the upper valid limit, so it checks the edge of the rule.",
  },
  31: {
    category: "Boundary invalid data",
    expected: "Rejected",
    reason: "31 is just outside the valid range, so it should trigger validation.",
  },
  text: {
    category: "Abnormal data",
    expected: "Rejected",
    reason: "The value 'many' is the wrong data type for a numeric field.",
  },
};

const examples = {
  testcase: {
    title: "Example 1: Test case with expected result",
    rows: [
      ["Requirement", "NumberOfStudents must be between 1 and the room capacity."],
      ["Test data", "31 when room capacity is 30"],
      ["Expected result", "Reject value and display an error message."],
      ["Exam point", "A test case needs expected result; test data alone is not enough."],
    ],
  },
  changeover: {
    title: "Example 2: Choosing a changeover method",
    rows: [
      ["Scenario", "A school cannot risk losing room bookings during term time."],
      ["Choice", "Parallel running."],
      ["Justification", "The old system remains available while outputs from the new system are checked."],
      ["Trade-off", "It costs more time and staff effort because both systems are used together."],
    ],
  },
  evaluation: {
    title: "Example 3: Evaluation against success criteria",
    rows: [
      ["Success criterion", "A teacher can create a booking in under 2 minutes."],
      ["Evidence", "8 out of 10 teachers met the target in user trials."],
      ["Judgement", "Criterion mostly met; training or interface changes may help the remaining users."],
      ["Exam point", "Evaluation earns marks when evidence is linked to a criterion."],
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Which stage turns the design into a working system?", accepted: ["implementation"], answer: "Implementation." },
  { id: "p2", prompt: "Which stage compares actual output with expected output?", accepted: ["testing", "test"], answer: "Testing." },
  { id: "p3", prompt: "Which stage judges the final system against requirements and success criteria?", accepted: ["evaluation"], answer: "Evaluation." },
  { id: "p4", prompt: "What test data category is a typical valid value?", accepted: ["normal"], answer: "Normal data." },
  { id: "p5", prompt: "What test data category is just at or just outside the valid limit?", accepted: ["boundary"], answer: "Boundary data." },
  { id: "p6", prompt: "What test data category uses an invalid type or invalid value?", accepted: ["abnormal", "erroneous", "invalid"], answer: "Abnormal / erroneous data." },
  { id: "p7", prompt: "What maintenance type fixes faults after release?", accepted: ["corrective"], answer: "Corrective maintenance." },
  { id: "p8", prompt: "What maintenance type changes the system for a new environment or rule?", accepted: ["adaptive"], answer: "Adaptive maintenance." },
  { id: "p9", prompt: "What maintenance type improves performance or usability?", accepted: ["perfective"], answer: "Perfective maintenance." },
  { id: "p10", prompt: "Which changeover method runs old and new systems together?", accepted: ["parallel"], answer: "Parallel running / parallel changeover." },
];

const mistakes = [
  {
    wrong: "A student says one successful run is enough testing.",
    fix: "Correction: testing should be planned with test data, expected results and actual results. One successful run may miss boundary, abnormal and integration faults.",
  },
  {
    wrong: "A student writes 'evaluation means testing the program'.",
    fix: "Correction: testing finds faults by comparing expected and actual results. Evaluation judges whether the finished system meets requirements and success criteria, using evidence.",
  },
  {
    wrong: "A student classifies a new timetable rule after release as corrective maintenance.",
    fix: "Correction: this is adaptive maintenance because the system changes to fit a changed environment or requirement, not just to fix a fault.",
  },
  {
    wrong: "A student recommends direct changeover because it is always best.",
    fix: "Correction: direct changeover is fast and cheaper, but high risk. The best method depends on the scenario, risk tolerance and cost.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "6 marks",
    prompt: "A room booking system is ready to be introduced. Describe two changeover methods and give one advantage of each.",
    answer: "Parallel running means the old and new systems are used together for a period. Its advantage is that outputs can be compared and the old system is still available if the new system fails. Phased changeover means one part of the system is introduced at a time. Its advantage is that faults affect only one part and can be corrected before the next part is introduced.",
    marking: [
      { mark: "B1", text: "identifies a valid changeover method such as parallel, phased, pilot or direct" },
      { mark: "M1", text: "describes how that method works" },
      { mark: "A1", text: "gives a valid advantage linked to that method" },
      { mark: "B1", text: "identifies a second distinct valid changeover method" },
      { mark: "M1", text: "describes how the second method works" },
      { mark: "A1", text: "gives a valid advantage linked to the second method" },
    ],
    strict: [
      "method and advantage must match.",
      "Allow direct, parallel, phased or pilot changeover.",
      "Do not award advantage marks for vague 'it is better' without a reason.",
      "FT: if a method is named unclearly but described correctly, credit the description where appropriate.",
    ],
  },
  {
    title: "Question 2",
    marks: "7 marks",
    prompt: "Create a test plan for the field NumberOfStudents, where the valid range is 1 to 30.",
    answer: "Normal test: 24, expected accepted. Lower boundary test: 1, expected accepted. Upper boundary test: 30, expected accepted. Invalid boundary test: 31, expected rejected. Abnormal test: 'many' or minus 4, expected rejected with an error message.",
    marking: [
      { mark: "B1", text: "includes a normal valid test value" },
      { mark: "A1", text: "gives correct expected result for normal data" },
      { mark: "B1", text: "includes valid boundary or extreme value such as 1 or 30" },
      { mark: "A1", text: "gives correct expected result for valid boundary/extreme value" },
      { mark: "B1", text: "includes invalid boundary or abnormal data such as 31, 0, negative value or text" },
      { mark: "A1", text: "gives correct expected rejection/error result" },
      { mark: "M1", text: "test cases are clearly linked to the stated range 1 to 30" },
    ],
    strict: [
      "test data without expected results cannot earn full marks.",
      "Allow equivalent values if they test the same range rule.",
      "Do not accept 15 as boundary data.",
      "FT: if candidate states a different valid range, credit consistent boundary logic only if the range is explicit.",
    ],
  },
  {
    title: "Question 3",
    marks: "6 marks",
    prompt: "Explain the difference between testing and evaluation in the software development lifecycle.",
    answer: "Testing is used to find faults by running the system or module with planned test data and comparing actual results with expected results. Evaluation is carried out to judge whether the finished system meets the original requirements and success criteria. Testing may provide evidence for evaluation, but evaluation also considers user feedback, performance against criteria and whether the system is fit for purpose.",
    marking: [
      { mark: "B1", text: "states testing uses planned test data or test cases" },
      { mark: "M1", text: "explains testing compares actual and expected results or finds faults" },
      { mark: "B1", text: "states evaluation judges the finished system" },
      { mark: "M1", text: "links evaluation to requirements, objectives or success criteria" },
      { mark: "A1", text: "explains that test evidence can support evaluation" },
      { mark: "A1", text: "gives a valid extra evaluation evidence source such as user feedback or performance data" },
    ],
    strict: [
      "Do not award full marks for treating testing and evaluation as identical.",
      "Allow acceptance testing as a bridge if explained clearly.",
      "Do not accept 'evaluation is checking for errors' alone.",
      "FT: credit context-specific evidence if linked to requirements or success criteria.",
    ],
  },
  {
    title: "Question 4",
    marks: "6 marks",
    prompt: "Classify each maintenance request as corrective, adaptive or perfective: fixing a crash when saving; changing term dates for a new timetable; making search results display faster.",
    answer: "Fixing a crash when saving is corrective maintenance because it fixes a fault. Changing term dates for a new timetable is adaptive maintenance because the system is being changed for a new environment or rule. Making search results display faster is perfective maintenance because it improves performance rather than fixing a fault.",
    marking: [
      { mark: "B1", text: "classifies crash fix as corrective" },
      { mark: "A1", text: "reason links corrective maintenance to fixing a fault" },
      { mark: "B1", text: "classifies new timetable dates as adaptive" },
      { mark: "A1", text: "reason links adaptive maintenance to changed environment/rules" },
      { mark: "B1", text: "classifies faster search as perfective" },
      { mark: "A1", text: "reason links perfective maintenance to improvement" },
    ],
    strict: [
      "Award reason marks only when the explanation matches the classification.",
      "Allow enhancement for perfective if improvement is clear.",
      "Do not accept adaptive for every post-release change.",
      "FT: if one classification is wrong, later independent classifications can still earn marks.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "A success criterion says: '95% of room searches should return results within 2 seconds.' Explain how this could be evaluated after implementation.",
    answer: "A representative set of room searches should be run after implementation, such as searches for different days, rooms and periods. The response time for each search should be recorded and compared with the 2-second target. The percentage meeting the target should be calculated and compared with the 95% success criterion. If fewer than 95% meet the target, the system does not fully meet this criterion and maintenance or optimisation may be needed.",
    marking: [
      { mark: "B1", text: "uses representative searches or suitable test/user tasks" },
      { mark: "M1", text: "records response time or measurable evidence" },
      { mark: "M1", text: "compares results with the 2-second target" },
      { mark: "A1", text: "calculates or judges percentage against 95% criterion" },
      { mark: "A1", text: "states a valid conclusion about whether the criterion is met" },
      { mark: "A1", text: "links failure to possible maintenance, optimisation or improvement" },
    ],
    strict: [
      "Do not award full marks for saying 'ask users if it is fast' without measurement.",
      "Allow automated timing logs or manual timed tests.",
      "Do not require exactly 100 searches if percentage can be judged from sufficient evidence.",
      "FT: candidate may use a different measured sample size if comparison with 95% is clear.",
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
    ship: { text: "One successful run is not enough. It may miss boundary, abnormal and integration faults.", correct: false },
    test: { text: "Correct. Planned testing gives evidence across valid and invalid cases.", correct: true },
    pretty: { text: "A modern interface can still save wrong data. Appearance is not proof of correctness.", correct: false },
    wait: { text: "User feedback matters, but the answer needs planned testing and evidence.", correct: false },
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

function setupStageChooser() {
  const select = document.querySelector("#stageSelect");
  const output = document.querySelector("#stageOutput");
  const render = () => {
    const item = stageScenarios[select.value];
    output.innerHTML = `
      <p><strong>Stage:</strong> ${escapeHtml(item.stage)}</p>
      <p><strong>Reason:</strong> ${escapeHtml(item.reason)}</p>
      <p><strong>Exam tip:</strong> ${escapeHtml(item.examTip)}</p>
    `;
  };
  document.querySelector("#stageBtn").addEventListener("click", render);
  select.addEventListener("change", render);
  render();
}

function setupDataClassifier() {
  const select = document.querySelector("#dataSelect");
  const output = document.querySelector("#dataOutput");
  const render = () => {
    const item = testValues[select.value];
    output.innerHTML = `
      <p><strong>Category:</strong> ${escapeHtml(item.category)}</p>
      <p><strong>Expected result:</strong> ${escapeHtml(item.expected)}</p>
      <p><strong>Reason:</strong> ${escapeHtml(item.reason)}</p>
    `;
  };
  document.querySelector("#dataBtn").addEventListener("click", render);
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
  render("testcase");
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
      feedback.textContent = correct ? "Correct or close enough for this short check." : "Not quite. Use the precise lifecycle or testing keyword.";
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
  setupStageChooser();
  setupDataClassifier();
  setupExamples();
  setupPractice();
  setupMistakes();
  setupExam();
}

document.addEventListener("DOMContentLoaded", init);
