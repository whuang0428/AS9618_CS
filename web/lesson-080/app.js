const typeMap = {
  phone: {
    result: "Best data type: text/string.",
    reason: "A phone number is an identifier/contact value, not a value for arithmetic. Leading zeroes and symbols may matter.",
  },
  paid: {
    result: "Best data type: Boolean.",
    reason: "The field has only two logical states: TRUE or FALSE.",
  },
  height: {
    result: "Best data type: real/decimal.",
    reason: "The value may contain a fractional part, so Integer would be too restrictive.",
  },
  quantity: {
    result: "Best data type: Integer.",
    reason: "Stock quantity is a whole number that may be used in calculations.",
  },
  appointment: {
    result: "Best data type: date/time.",
    reason: "The value should support date ordering, comparison and validation.",
  },
};

const constraintMap = {
  blankName: {
    result: "Check: presence check.",
    reason: "The rule rejects a blank value where the field must be completed.",
  },
  badMark: {
    result: "Check: range check.",
    reason: "Exam marks should fall within a permitted range such as 0 to 100.",
  },
  badId: {
    result: "Check: length check.",
    reason: "The rule rejects values that are too long or too short for the required field size.",
  },
  badGrade: {
    result: "Check: lookup check.",
    reason: "The value must be one of the allowed values in a defined list.",
  },
  badQuantity: {
    result: "Check: type check.",
    reason: "The field should accept an integer, not text such as 'ten'.",
  },
};

const examples = {
  student: {
    title: "Example 1: Student table design",
    problem: "Choose suitable field details for a Student table.",
    steps: [
      "StudentID: Text, length 5 or fixed school format. It may include a letter and is not used for arithmetic.",
      "Name: Text, suitable field size such as 40 characters, presence check so it cannot be blank.",
      "DateOfBirth: Date/time, with a reasonableness or range check if needed.",
      "FeePaid: Boolean because the value is TRUE or FALSE.",
    ],
  },
  booking: {
    title: "Example 2: Booking table design",
    problem: "A sports centre stores court bookings.",
    steps: [
      "BookingDate should use date/time so bookings can be sorted and compared by date.",
      "NumberOfPlayers should use Integer because it counts whole people.",
      "CourtNumber may use Integer if only numeric courts exist, with a range check such as 1 to 8.",
      "BookingEmail should use Text with a format check if the system checks an email pattern.",
    ],
  },
  phone: {
    title: "Example 3: Phone number trap",
    problem: "A designer chooses Integer for PhoneNumber.",
    steps: [
      "This is weak because phone numbers are not normally used for arithmetic.",
      "Leading zeroes may be removed if stored as a number.",
      "Phone values may include spaces, +, brackets or extension symbols.",
      "Use Text/string, with a length or format check if the required pattern is known.",
    ],
  },
  constraint: {
    title: "Example 4: Constraint answer",
    problem: "Explain why ExamMark should have a range check.",
    steps: [
      "ExamMark should be an Integer or Real depending on whether fractional marks are allowed.",
      "A range check such as 0 to 100 rejects marks outside the permitted range.",
      "This improves data integrity because impossible marks such as 128 cannot be stored.",
      "Do not claim validation proves the mark is correct; 78 could still be mistyped as 87.",
    ],
  },
};

const practice = [
  {
    id: "p1",
    prompt: "What term means one complete row in a database table?",
    accepted: ["record", "tuple", "record tuple"],
    answer: "Record / tuple",
  },
  {
    id: "p2",
    prompt: "What term means one column or attribute in a database table?",
    accepted: ["field", "attribute", "field attribute"],
    answer: "Field / attribute",
  },
  {
    id: "p3",
    prompt: "What data type is best for TRUE/FALSE values?",
    accepted: ["boolean", "bool"],
    answer: "Boolean",
  },
  {
    id: "p4",
    prompt: "What data type is best for a whole-number count such as QuantityInStock?",
    accepted: ["integer", "int"],
    answer: "Integer",
  },
  {
    id: "p5",
    prompt: "What data type is best for a value such as 12.75?",
    accepted: ["real", "decimal", "float", "floating point"],
    answer: "Real / decimal",
  },
  {
    id: "p6",
    prompt: "What data type is usually best for a phone number?",
    accepted: ["text", "string", "alphanumeric"],
    answer: "Text / string",
  },
  {
    id: "p7",
    prompt: "What check rejects a blank required field?",
    accepted: ["presence check", "required", "required check"],
    answer: "Presence check",
  },
  {
    id: "p8",
    prompt: "What check rejects an ExamMark of 128 when marks must be 0 to 100?",
    accepted: ["range check", "range"],
    answer: "Range check",
  },
  {
    id: "p9",
    prompt: "What check rejects StudentID S1234567 when exactly 5 characters are required?",
    accepted: ["length check", "length"],
    answer: "Length check",
  },
  {
    id: "p10",
    prompt: "Do validation constraints prove that accepted data is definitely correct? yes or no.",
    accepted: ["no"],
    answer: "No",
  },
];

const mistakes = [
  {
    wrong: "A field is one row in a table.",
    fix: "A field is a column or attribute. A record/tuple is one complete row.",
  },
  {
    wrong: "PhoneNumber should be Integer because it contains digits.",
    fix: "PhoneNumber should usually be Text/string because it is not used for arithmetic and may need leading zeroes or symbols.",
  },
  {
    wrong: "A range check makes the exam mark correct.",
    fix: "A range check rejects values outside the permitted range. It does not prove that an accepted value was typed correctly.",
  },
  {
    wrong: "Boolean is for any field with two words, such as first name and last name.",
    fix: "Boolean is for two logical states such as TRUE/FALSE, Yes/No or Paid/Not paid.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "4 marks",
    prompt: "Distinguish between a field and a record in a database table. Use an example.",
    answer: "A field is a column or attribute that stores one type of data for each record, such as DateOfBirth. A record is one complete row in a table, such as all the stored details for one student.",
    marking: [
      { mark: "B1", text: "field described as column/attribute" },
      { mark: "M1", text: "field example such as DateOfBirth/Name/FeePaid" },
      { mark: "B1", text: "record described as row/tuple/complete set of details for one entity" },
      { mark: "A1", text: "record example linked to one student/member/item" },
    ],
    strict: [
      "Do not accept answers that swap field and record.",
      "Do not award example marks for examples that are not database table values.",
      "Allow tuple for record and attribute for field.",
      "FT: if the definitions are correct, accept matching examples from any valid table.",
    ],
  },
  {
    title: "Question 2",
    marks: "6 marks",
    prompt: "A school database stores StudentID, Name, PhoneNumber, DateOfBirth and FeePaid. Suggest suitable data types for three of these fields and justify each choice.",
    answer: "StudentID should be Text because it may contain letters and is an identifier rather than a value for arithmetic. PhoneNumber should be Text because leading zeroes and symbols may need to be preserved. DateOfBirth should be Date/time because dates need to be validated, sorted or compared. FeePaid should be Boolean because it has two states, TRUE or FALSE.",
    marking: [
      { mark: "B1", text: "suitable data type for first field" },
      { mark: "M1", text: "justification for first data type linked to field use" },
      { mark: "B1", text: "suitable data type for second field" },
      { mark: "M1", text: "justification for second data type linked to field use" },
      { mark: "B1", text: "suitable data type for third field" },
      { mark: "M1", text: "justification for third data type linked to field use" },
    ],
    strict: [
      "Do not accept Integer for PhoneNumber unless a clear preservation issue is ignored by the mark scheme.",
      "Do not award justification for only repeating the data type name.",
      "Allow string for text and Boolean for FeePaid.",
      "FT: if a field choice is valid, award explanation even if a different valid field is chosen.",
    ],
  },
  {
    title: "Question 3",
    marks: "6 marks",
    prompt: "Explain three validation checks or constraints that could be used in a database table.",
    answer: "A presence check can ensure that a required field such as Name is not left blank. A range check can ensure that a value such as ExamMark is between 0 and 100. A length check can ensure that a StudentID contains the required number of characters. These checks improve data integrity by rejecting invalid entries.",
    marking: [
      { mark: "B1", text: "valid check named, such as presence/range/length/type/format/lookup" },
      { mark: "M1", text: "explanation or example of first check" },
      { mark: "B1", text: "second distinct valid check named" },
      { mark: "M1", text: "explanation or example of second check" },
      { mark: "B1", text: "third distinct valid check named" },
      { mark: "M1", text: "explanation or example of third check" },
    ],
    strict: [
      "Do not award separate B marks for repeated versions of the same check.",
      "Do not accept vague 'checks it is correct' without a rule or example.",
      "Allow constraint wording instead of validation check.",
      "FT: explanation mark can be awarded only when linked to a valid or clearly implied check.",
    ],
  },
  {
    title: "Question 4",
    marks: "5 marks",
    prompt: "A database designer adds a range check of 0 to 100 to an ExamMark field. Explain what this check does and one limitation.",
    answer: "The range check rejects values less than 0 or greater than 100, so impossible marks such as 128 cannot be stored. This helps maintain data integrity because invalid values are prevented. A limitation is that the check does not prove the value is the correct mark; a valid value such as 78 could still be entered when the real mark was 87.",
    marking: [
      { mark: "B1", text: "range check described as value within lower and upper limits" },
      { mark: "M1", text: "specific limits 0 to 100 or invalid mark example used" },
      { mark: "B1", text: "rejects/prevents invalid out-of-range data" },
      { mark: "B1", text: "data integrity consequence" },
      { mark: "A1", text: "limitation that accepted data may still be inaccurate/mistyped" },
    ],
    strict: [
      "Do not accept 'it makes the mark correct' as a limitation-free explanation.",
      "Do not award range marks if no upper/lower limit idea is given.",
      "Allow alternative valid impossible mark examples outside 0 to 100.",
      "FT: limitation mark can follow any valid validation check explanation.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "For a sports booking table, suggest suitable field design choices for BookingDate, CourtNumber and MemberEmail.",
    answer: "BookingDate should use a Date/time data type so bookings can be sorted, compared and checked against valid dates. CourtNumber should use Integer if courts are numbered, with a range check such as 1 to 8 to reject non-existent courts. MemberEmail should use Text/string because it contains letters and symbols, with a format check to reject values that do not match an email pattern.",
    marking: [
      { mark: "B1", text: "BookingDate data type date/time" },
      { mark: "M1", text: "date/time justification such as sort/compare/validate dates" },
      { mark: "B1", text: "CourtNumber integer or suitable numeric type" },
      { mark: "M1", text: "range check or numbered-court justification" },
      { mark: "B1", text: "MemberEmail text/string" },
      { mark: "A1", text: "format check or symbols/letters justification for email" },
    ],
    strict: [
      "Do not accept Real for CourtNumber unless fractional court numbers are justified by the scenario.",
      "Do not require exact range 1 to 8; allow any scenario-consistent court range.",
      "Allow character/string/text for MemberEmail.",
      "FT: if CourtNumber is treated as text, explanation must justify non-arithmetic code-style court labels to earn credit.",
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
    zero: "Correct. Phone numbers are usually stored as text so leading zeroes and symbols are preserved.",
    sum: "No. Adding two phone numbers is how databases ask for a career change.",
    date: "No. A phone number is not a date/time value.",
    image: "No. That would need a different storage approach; it is not the issue here.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = responses[button.dataset.hook];
    });
  });
}

function setupTypeChooser() {
  const input = document.querySelector("#typeInput");
  const result = document.querySelector("#typeResult");
  const reason = document.querySelector("#typeReason");
  document.querySelector("#typeBtn").addEventListener("click", () => {
    const item = typeMap[input.value];
    result.textContent = item.result;
    reason.textContent = item.reason;
  });
}

function setupConstraintChecker() {
  const input = document.querySelector("#constraintInput");
  const result = document.querySelector("#constraintResult");
  const reason = document.querySelector("#constraintReason");
  document.querySelector("#constraintBtn").addEventListener("click", () => {
    const item = constraintMap[input.value];
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
  renderExample("student");
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
  setupTypeChooser();
  setupConstraintChecker();
  setupExamples();
  renderPractice();
  renderMistakes();
  renderExamQuestions();
}

init();
