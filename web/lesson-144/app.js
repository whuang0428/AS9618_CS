const artefacts = {
  steps: {
    artefact: "Algorithm design",
    reason: "The task is about processing logic: compare the requested room, date and time against existing booking records.",
    warning: "Do not write final Java code as the whole design answer. Cambridge-style pseudocode or a flowchart is better for the design stage.",
  },
  field: {
    artefact: "Data dictionary",
    reason: "The task defines a data item, its type and its format. That belongs in the data dictionary.",
    warning: "Do not confuse a data dictionary with sample records stored in a table.",
  },
  screen: {
    artefact: "Interface design",
    reason: "The task is about what the user sees and uses: controls, navigation, prompts and feedback.",
    warning: "Do not reduce interface design to colours and logos.",
  },
  need: {
    artefact: "Requirements specification",
    reason: "The task states what users need the system to do. It comes before detailed design.",
    warning: "Do not jump to implementation before the requirement is clear.",
  },
};

const fieldDefinitions = {
  RoomID: {
    type: "STRING",
    size: "6 characters",
    format: "one letter followed by digits, such as R102A",
    validation: "not blank; must exist in the room file",
    purpose: "uniquely identifies the room being booked",
  },
  BookingDate: {
    type: "DATE",
    size: "fixed date value",
    format: "YYYY-MM-DD",
    validation: "valid school day; not in the past",
    purpose: "stores the date of the booking",
  },
  StartTime: {
    type: "TIME",
    size: "fixed time value",
    format: "HH:MM using school period start times",
    validation: "must match a valid period start time",
    purpose: "stores when the booking begins",
  },
  StaffID: {
    type: "STRING",
    size: "8 characters",
    format: "staff code",
    validation: "must match an authorised staff record",
    purpose: "identifies the member of staff making the booking",
  },
};

const examples = {
  algorithm: {
    title: "Example 1: Algorithm design for clash checking",
    rows: [
      ["Requirement", "Reject a booking if the room is already booked at the requested time."],
      ["Design artefact", "Pseudocode or flowchart showing how each existing booking is checked."],
      ["Useful detail", "Compare RoomID, BookingDate, StartTime and EndTime; output a clash message if overlap is found."],
      ["Exam point", "Credit is for clear processing logic, not for saying 'the program checks it'."],
    ],
  },
  dictionary: {
    title: "Example 2: Data dictionary entry",
    rows: [
      ["Data item", "NumberOfStudents"],
      ["Type and range", "INTEGER, 1 to room capacity"],
      ["Validation", "must be numeric and cannot exceed the selected room capacity"],
      ["Exam point", "A data dictionary should define field rules, not list many example values."],
    ],
  },
  interface: {
    title: "Example 3: Interface design for booking form",
    rows: [
      ["Screen", "Create room booking"],
      ["Controls", "date picker, period drop-down, room list, submit button"],
      ["Feedback", "availability result and validation messages are shown before saving"],
      ["Exam point", "Interface design includes navigation and user feedback, not just visual style."],
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Which lifecycle stage produces detailed algorithm, data and interface designs?", accepted: ["design"], answer: "Design." },
  { id: "p2", prompt: "Which document lists data item names, data types, sizes, formats and validation rules?", accepted: ["data dictionary", "dictionary"], answer: "Data dictionary." },
  { id: "p3", prompt: "Which design artefact is best for processing steps such as checking for a clash?", accepted: ["algorithm", "pseudocode", "flowchart"], answer: "Algorithm design, such as pseudocode or a flowchart." },
  { id: "p4", prompt: "Which design artefact shows screen layout, input controls, navigation and messages?", accepted: ["interface", "interface design", "screen design"], answer: "Interface design." },
  { id: "p5", prompt: "What data type is most suitable for BookingDate?", accepted: ["date"], answer: "DATE." },
  { id: "p6", prompt: "Why include validation rules in a data dictionary?", accepted: ["consistent", "testing", "validation", "rules", "errors"], answer: "So validation is implemented consistently and can be tested against clear rules." },
  { id: "p7", prompt: "Is 'make it look nice' enough for interface design? yes or no", accepted: ["no"], answer: "No. Interface design should include controls, navigation, prompts, validation and feedback." },
  { id: "p8", prompt: "Is final Java code the same as an algorithm design document? yes or no", accepted: ["no"], answer: "No. Java may implement the design, but the design should describe the logic before coding." },
  { id: "p9", prompt: "The requirement is 'reject double bookings'. Which design artefact should describe the clash-checking logic?", accepted: ["algorithm", "pseudocode", "flowchart"], answer: "An algorithm design, commonly pseudocode or a flowchart." },
  { id: "p10", prompt: "Give one reason design documentation helps maintenance.", accepted: ["understand", "rules", "structure", "future", "changes", "maintain"], answer: "It helps future developers understand existing data rules, algorithms and interface behaviour before changing the system." },
];

const mistakes = [
  {
    wrong: "A student says a data dictionary is a list of all stored records.",
    fix: "Correction: a data dictionary defines metadata about data items, such as name, type, size, format, validation and purpose. It is not the table contents.",
  },
  {
    wrong: "A student writes only 'use blue buttons and a logo' for interface design.",
    fix: "Correction: include controls, labels, navigation, validation messages, error feedback and how users complete the task. Appearance alone is too thin for strong marks.",
  },
  {
    wrong: "A student skips algorithm design because 'the developer can just code it'.",
    fix: "Correction: algorithm design records the processing logic before coding, which reduces ambiguity and supports testing. Java implementation is not a substitute for the design explanation.",
  },
  {
    wrong: "A student mixes requirements and design by saying 'the requirement is to use a drop-down list'.",
    fix: "Correction: the requirement might be 'select a room quickly and accurately'. The drop-down list is a design choice that helps satisfy that requirement.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "6 marks",
    prompt: "A school is designing a room booking system. Describe three design documents that could be produced before implementation.",
    answer: "An algorithm design could describe how the system checks whether a requested room, date and time overlaps an existing booking. A data dictionary could define data items such as RoomID, BookingDate and StaffID, including data type, size, format and validation rules. An interface design could show the booking screen, input controls, navigation and validation messages shown to the user.",
    marking: [
      { mark: "B1", text: "identifies algorithm design / pseudocode / flowchart as a design document" },
      { mark: "B1", text: "describes algorithm design as processing logic or steps in the booking context" },
      { mark: "B1", text: "identifies data dictionary as a design document" },
      { mark: "B1", text: "describes data dictionary contents such as type, size, format or validation" },
      { mark: "B1", text: "identifies interface design / screen design as a design document" },
      { mark: "B1", text: "describes controls, navigation, prompts, messages or user interaction" },
    ],
    strict: [
      "Design documents must be distinct; do not award repeated generic 'plan' statements.",
      "Allow flowchart or structure diagram as algorithm design evidence.",
      "Do not accept final source code alone as a design document.",
    ],
  },
  {
    title: "Question 2",
    marks: "6 marks",
    prompt: "Create suitable data dictionary details for RoomID, BookingDate and NumberOfStudents in a room booking system.",
    answer: "RoomID: STRING, length 6, must not be blank and must match an existing room record. BookingDate: DATE, format YYYY-MM-DD, must be a valid school day and not in the past. NumberOfStudents: INTEGER, range 1 to room capacity, must be numeric and cannot exceed the selected room capacity.",
    marking: [
      { mark: "B1", text: "RoomID has a suitable data type such as STRING" },
      { mark: "A1", text: "RoomID includes size/format and a valid validation rule" },
      { mark: "B1", text: "BookingDate has a suitable type such as DATE" },
      { mark: "A1", text: "BookingDate includes format or date validation" },
      { mark: "B1", text: "NumberOfStudents has a suitable numeric type such as INTEGER" },
      { mark: "A1", text: "NumberOfStudents includes valid range or room-capacity validation" },
    ],
    strict: [
      "Do not award validation marks for vague 'must be correct' without a rule.",
      "Allow alternative reasonable lengths and formats if consistent.",
      "Do not accept sample values only; the answer must describe field definitions.",
    ],
  },
  {
    title: "Question 3",
    marks: "6 marks",
    prompt: "Explain how design documentation can help during implementation, testing and maintenance.",
    answer: "During implementation, design documentation tells developers what data fields, processing logic and interface behaviour to build. During testing, expected validation rules and algorithm behaviour can be compared with actual program output. During maintenance, future developers can understand existing rules and assumptions before changing the system, reducing the risk of introducing faults.",
    marking: [
      { mark: "B1", text: "states design documentation guides implementation" },
      { mark: "B1", text: "explains implementation using fields, algorithms, interface behaviour or structure" },
      { mark: "B1", text: "states design documentation helps testing" },
      { mark: "B1", text: "explains testing by comparing actual behaviour with designed rules or expected results" },
      { mark: "B1", text: "states design documentation helps maintenance" },
      { mark: "B1", text: "explains maintenance using future understanding, safer changes or reduced faults" },
    ],
    strict: [
      "Do not award explanation marks for 'it makes it easier' without saying what becomes easier and why.",
      "Allow references to traceability between requirements, design and tests.",
      "Do not require all three design artefacts if the lifecycle links are clear.",
    ],
  },
  {
    title: "Question 4",
    marks: "6 marks",
    prompt: "A requirement says: 'The system must prevent double bookings.' Describe one algorithm design feature and one interface design feature that could help meet this requirement.",
    answer: "The algorithm design should compare the requested RoomID, date and time interval with existing bookings and set a clash flag or reject the booking if an overlap is found. The interface design could include a Check availability button and display a clear error message before the booking is saved if the room is already booked.",
    marking: [
      { mark: "B1", text: "identifies comparison with existing bookings as part of the algorithm" },
      { mark: "B1", text: "uses relevant fields such as RoomID, date and time interval" },
      { mark: "B1", text: "describes a reject/clash outcome from the algorithm" },
      { mark: "B1", text: "identifies a relevant interface feature such as availability check or disabled submit" },
      { mark: "B1", text: "describes user feedback such as a clear clash/error message" },
      { mark: "B1", text: "links interface behaviour to preventing the invalid booking before saving" },
    ],
    strict: [
      "Do not award full algorithm marks for 'check it' without saying what is checked.",
      "Allow equivalent overlap logic using start and end times.",
      "Do not accept colour-only interface features.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "A draft design document only says: 'The booking screen should be nice and the program should check bookings.' Identify three weaknesses and suggest an improvement for each.",
    answer: "Weakness: 'nice' is subjective. Improvement: specify controls, labels, navigation and error messages for the booking screen. Weakness: 'check bookings' is vague. Improvement: write pseudocode or a flowchart that compares RoomID, date and time with existing records. Weakness: there are no data definitions. Improvement: add a data dictionary for fields such as RoomID, BookingDate and StaffID with types and validation rules.",
    marking: [
      { mark: "B1", text: "identifies subjective or vague interface wording as a weakness" },
      { mark: "B1", text: "improves it with concrete interface design details" },
      { mark: "B1", text: "identifies vague processing/checking as a weakness" },
      { mark: "B1", text: "improves it with algorithm design detail such as pseudocode or flowchart" },
      { mark: "B1", text: "identifies missing data definitions or validation as a weakness" },
      { mark: "B1", text: "improves it with data dictionary content" },
    ],
    strict: [
      "Improvement must match the identified weakness.",
      "Allow other valid weaknesses, such as missing navigation, missing error messages or no link to requirements.",
      "Do not award improvement marks for simply saying 'add more detail' without naming the detail.",
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
    requirements: { text: "Close, but requirements usually state the need. Field type and validation belong in the data dictionary.", correct: false },
    dictionary: { text: "Correct. A data dictionary defines data item type, size, format, validation and purpose.", correct: true },
    interface: { text: "The interface may show a RoomID input, but it should not be the main source of the field rule.", correct: false },
    code: { text: "Java may implement the rule later. It is not the best design artefact for defining the field.", correct: false },
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

function setupArtefactChooser() {
  const select = document.querySelector("#artefactSelect");
  const output = document.querySelector("#artefactOutput");
  const render = () => {
    const item = artefacts[select.value];
    output.innerHTML = `
      <p><strong>Best artefact:</strong> ${escapeHtml(item.artefact)}</p>
      <p><strong>Reason:</strong> ${escapeHtml(item.reason)}</p>
      <p><strong>Exam trap:</strong> ${escapeHtml(item.warning)}</p>
    `;
  };
  document.querySelector("#artefactBtn").addEventListener("click", render);
  select.addEventListener("change", render);
  render();
}

function setupFieldChecker() {
  const select = document.querySelector("#fieldSelect");
  const output = document.querySelector("#fieldOutput");
  const render = () => {
    const item = fieldDefinitions[select.value];
    output.innerHTML = `
      <p><strong>Type:</strong> ${escapeHtml(item.type)}</p>
      <p><strong>Size:</strong> ${escapeHtml(item.size)}</p>
      <p><strong>Format:</strong> ${escapeHtml(item.format)}</p>
      <p><strong>Validation:</strong> ${escapeHtml(item.validation)}</p>
      <p><strong>Purpose:</strong> ${escapeHtml(item.purpose)}</p>
    `;
  };
  document.querySelector("#fieldBtn").addEventListener("click", render);
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
  render("algorithm");
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
      feedback.textContent = correct ? "Correct or close enough for this short check." : "Not quite. Tighten the keyword or reveal the model answer.";
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
  setupArtefactChooser();
  setupFieldChecker();
  setupExamples();
  setupPractice();
  setupMistakes();
  setupExam();
}

document.addEventListener("DOMContentLoaded", init);
