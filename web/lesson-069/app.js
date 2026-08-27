const checkRules = {
  range: {
    test: (value) => Number.isFinite(Number(value)) && Number(value) >= 0 && Number(value) <= 75,
    pass: "Pass: the mark is numeric and within 0-75.",
    fail: "Fail: a range check rejects values outside 0-75, or non-numeric input.",
    limitation: "A mark of 57 passes the rule, but it could still be the wrong mark for that student.",
  },
  length: {
    test: (value) => value.length === 8,
    pass: "Pass: the student ID has exactly 8 characters.",
    fail: "Fail: a length check rejects IDs that are not exactly 8 characters.",
    limitation: "An 8-character ID can still belong to the wrong student.",
  },
  type: {
    test: (value) => /^-?\d+$/.test(value.trim()),
    pass: "Pass: the quantity is a whole number.",
    fail: "Fail: a type check rejects values that are not whole numbers.",
    limitation: "A whole number can still be unrealistic unless range or other checks are also used.",
  },
  format: {
    test: (value) => /^[A-Za-z]{2}\d{4}$/.test(value.trim()),
    pass: "Pass: the input follows two letters then four digits.",
    fail: "Fail: a format check rejects input that does not match the required pattern.",
    limitation: "A correctly formatted code can still be a code that does not exist.",
  },
  presence: {
    test: (value) => value.trim().length > 0,
    pass: "Pass: the required field is not blank.",
    fail: "Fail: a presence check rejects blank required fields.",
    limitation: "Typing 'unknown' may pass presence but still be poor or false data.",
  },
  existence: {
    test: (value) => ["P100", "P200", "P350"].includes(value.trim().toUpperCase()),
    pass: "Pass: the product code exists in the stored practice lookup list.",
    fail: "Fail: an existence check rejects a value that is not found in the specified stored list.",
    limitation: "An existing product code can still be the wrong product code for this transaction.",
  },
  limit: {
    test: (value) => Number.isFinite(Number(value)) && Number(value) <= 10,
    pass: "Pass: the value satisfies the one stated upper limit of 10 MiB.",
    fail: "Fail: an upper limit check rejects a value greater than 10 MiB.",
    limitation: "A limit check uses one upper or lower limit; a range check uses both a lower and an upper bound.",
  },
  checkDigit: {
    test: (value) => /^\d{6}$/.test(value.trim())
      && Number(value.trim()[5]) === [...value.trim().slice(0, 5)].reduce((sum, digit) => sum + Number(digit), 0) % 10,
    pass: "Pass: the final digit matches the digit calculated from the other five digits.",
    fail: "Fail: the calculated check digit does not match the entered final digit.",
    limitation: "A matching check digit detects many entry errors but does not prove that this is the intended identifier.",
  },
};

const verifyMap = {
  password: {
    result: "Verification by double entry / repeat entry.",
    reason: "The second entry is compared with the first to detect typing errors before the value is accepted.",
  },
  paper: {
    result: "Verification by visual check.",
    reason: "A person compares the entered address with the original paper source to detect copying errors.",
  },
  typedTwice: {
    result: "Verification by double entry.",
    reason: "Two entries of the same data are compared. A mismatch suggests a data entry error.",
  },
  copy: {
    result: "Verification by checksum after transfer.",
    reason: "The receiver recalculates a checksum from the received data block and compares it with the transmitted checksum.",
  },
  parityByte: {
    result: "Verification by parity check on a byte.",
    reason: "The receiver checks whether the byte, including its parity bit, has the agreed odd or even parity. A mismatch indicates a likely transmission error.",
  },
  blockParity: {
    result: "Verification by block parity.",
    reason: "Parity is checked across rows and columns of a block of bytes, allowing many single-bit errors to be detected and located.",
  },
};

const examples = {
  range: {
    title: "Example 1: Range check for exam marks",
    problem: "A paper is marked out of 75. A user enters 82.",
    steps: [
      "A range check tests whether the mark is between 0 and 75.",
      "82 is rejected because it is outside the allowed range.",
      "This prevents an impossible mark entering the system.",
      "It would not detect a wrong but possible mark, such as 62 instead of 52.",
    ],
  },
  format: {
    title: "Example 2: Format check for a student code",
    problem: "A student code must use two letters followed by four digits.",
    steps: [
      "A format check tests the pattern of the data.",
      "AB1234 passes because it has two letters then four digits.",
      "A12345 fails because it does not match the required pattern.",
      "A code can pass the format check but still not belong to a real student.",
    ],
  },
  double: {
    title: "Example 3: Double entry for a new password",
    problem: "A website asks users to enter a new password twice.",
    steps: [
      "This is verification because two entries are compared.",
      "If the entries do not match, a typing error is likely.",
      "The method does not check whether the password is strong unless validation rules are also applied.",
      "A user can type the same weak password twice, so the data is verified but still poor.",
    ],
  },
  combined: {
    title: "Example 4: Admissions form using both methods",
    problem: "A school admissions form records date of birth and postcode.",
    steps: [
      "Validation can check date format and whether the date is within a sensible range.",
      "Validation can check the postcode follows an expected format.",
      "Verification can compare the entered data with the original application document.",
      "Both reduce errors, but neither proves the applicant gave truthful information.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Which method checks input against rules before it is accepted?", accepted: ["validation", "data validation"], answer: "Validation / data validation" },
  { id: "p2", prompt: "Which method checks that data has been copied or entered accurately?", accepted: ["verification", "data verification"], answer: "Verification / data verification" },
  { id: "p3", prompt: "Which validation check tests whether a value is between allowed limits?", accepted: ["range", "range check"], answer: "Range check" },
  { id: "p4", prompt: "Which validation check tests the number of characters?", accepted: ["length", "length check"], answer: "Length check" },
  { id: "p5", prompt: "Which validation check tests whether data follows a required pattern?", accepted: ["format", "format check"], answer: "Format check" },
  { id: "p6", prompt: "Which validation check tests whether required data has been entered?", accepted: ["presence", "presence check"], answer: "Presence check" },
  { id: "p7", prompt: "Which validation check can detect common transcription errors in long numbers such as barcodes?", accepted: ["check digit", "check digit check"], answer: "Check digit" },
  { id: "p8", prompt: "Entering data twice and comparing the two entries is what method?", accepted: ["double entry", "verification", "data verification"], answer: "Double entry verification" },
  { id: "p9", prompt: "Can validation prove data is true? Answer yes or no.", accepted: ["no"], answer: "No" },
  { id: "p10", prompt: "Can verification prove the original source data was true? Answer yes or no.", accepted: ["no"], answer: "No" },
  { id: "p11", prompt: "Which check tests one stated maximum or minimum rather than two bounds?", accepted: ["limit", "limit check", "upper limit check", "lower limit check"], answer: "Limit check" },
  { id: "p12", prompt: "Which check confirms that a code is present in a specified stored lookup file?", accepted: ["existence", "existence check"], answer: "Existence check" },
];

const mistakes = [
  {
    wrong: "Validation checks that the data is correct.",
    fix: "Validation checks that data follows rules. It can reject impossible or unsuitable data, but valid data can still be factually wrong.",
  },
  {
    wrong: "Verification is a range check.",
    fix: "A range check is validation. Verification checks that data has been copied or entered accurately, often by comparison.",
  },
  {
    wrong: "A presence check proves the entered email address is real.",
    fix: "A presence check only proves the field is not blank. Format or other checks may be needed, and even then the email may not belong to the user.",
  },
  {
    wrong: "Double entry guarantees the value is true.",
    fix: "Double entry can detect typing differences. If the same wrong value is entered twice, the data can still be false.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "5 marks",
    prompt: "Explain the difference between validation and verification.",
    answer: "Validation checks that input data follows rules before it is accepted, such as a range, length, type or format rule. Verification checks that data has been entered, copied or transferred accurately compared with a source or a second entry. Validation can reject a mark outside 0 to 75, while verification can compare a typed address with the original form. Neither method proves that the original data is true.",
    marking: [
      { mark: "B1", text: "validation checks data against rules/criteria" },
      { mark: "B1", text: "valid validation example, e.g. range/length/type/format/presence" },
      { mark: "B1", text: "verification checks entered/copied/transferred data against source/repeat entry" },
      { mark: "B1", text: "valid verification example, e.g. double entry/visual check/comparison" },
      { mark: "B1", text: "limitation: neither guarantees truth/correctness of original data" },
    ],
    strict: [
      "Do not accept validation and verification as the same process.",
      "Do not award validation mark for only saying 'checks it is correct'.",
      "Allow 'reasonable' for validation only when rule/criteria idea is clear.",
    ],
  },
  {
    title: "Question 2",
    marks: "7 marks",
    prompt: "A school form accepts an age from 3 to 19, a file no larger than 10 MiB, a fixed-format student ID, a required email address and a product code that must already be stored in the product file. Recommend suitable validation checks and distinguish the age rule from the file-size rule.",
    answer: "Age should use a range check because both a lower bound of 3 and an upper bound of 19 apply. File size should use an upper limit check because there is one maximum of 10 MiB. The student ID can use a length check and a format check for its fixed pattern. The email address can use a presence check so it is not blank and a format check for the required pattern. The product code should use an existence check against the stored product file.",
    marking: [
      { mark: "B1", text: "age linked to a range check" },
      { mark: "B1", text: "range check explained as applying lower and upper bounds 3 and 19" },
      { mark: "B1", text: "file size linked to an upper limit check with maximum 10 MiB" },
      { mark: "B1", text: "student ID linked to length and/or format check with its rule explained" },
      { mark: "B1", text: "email linked to a presence check" },
      { mark: "B1", text: "email linked to a format check with an expected pattern" },
      { mark: "B1", text: "product code linked to an existence check against the stored product file" },
    ],
    strict: [
      "Do not award marks for verification methods when validation is requested.",
      "Do not call the one-sided file maximum a two-bound range check.",
      "Do not accept vague 'check it is right' without naming and explaining the rule.",
      "Award each field independently.",
    ],
  },
  {
    title: "Question 3",
    marks: "4 marks",
    prompt: "Describe two verification methods used to reduce data entry errors.",
    answer: "Double entry requires the same data to be entered twice, possibly by the same user or by two different operators. The two entries are compared and a mismatch suggests an input error. A visual check involves comparing the entered data with the original source document or screen. This can detect typing or copying errors, but depends on the person checking carefully.",
    marking: [
      { mark: "B1", text: "double entry described as entering same data twice" },
      { mark: "B1", text: "two entries compared/mismatch detected" },
      { mark: "B1", text: "visual check described as comparing entered data with original/source" },
      { mark: "B1", text: "detects typing/copying/transcription errors" },
    ],
    strict: [
      "Do not accept range/format/type check as verification method.",
      "Do not award comparison mark for only 'enter it carefully'.",
      "Allow proofreading if source comparison is clear.",
    ],
  },
  {
    title: "Question 4",
    marks: "4 marks",
    prompt: "Explain how a check digit can help detect errors in a long number such as a barcode.",
    answer: "A check digit is an extra digit calculated from the other digits in the number using a defined method. When the number is entered or scanned, the system recalculates the check digit and compares it with the entered check digit. If they do not match, the number is likely to contain an error such as a mistyped digit. It can detect many common transcription errors, but it does not prove the number belongs to the correct item.",
    marking: [
      { mark: "B1", text: "check digit described as extra/calculated digit" },
      { mark: "B1", text: "calculated from other digits using a method/algorithm" },
      { mark: "B1", text: "system recalculates and compares with entered/provided check digit" },
      { mark: "B1", text: "mismatch indicates likely input/transcription/scanning error" },
    ],
    strict: [
      "Do not accept check digit as just 'the last digit' without calculated/comparison idea.",
      "Do not require a specific arithmetic algorithm unless question asks for it.",
      "Allow barcode/account number/ISBN examples.",
    ],
  },
  {
    title: "Question 5",
    marks: "7 marks",
    prompt: "Describe how parity check on a byte, block parity and a checksum can detect errors during data transfer.",
    answer: "A parity check adds or uses a parity bit so each received byte should have the agreed odd or even parity; a mismatch indicates a likely error. Block parity arranges bytes as rows and checks parity across rows and columns, so many single-bit errors can be detected and located. For a checksum, the sender calculates a value from the data block and sends it; the receiver recalculates the checksum from the received block and compares the values. These methods detect many errors but do not automatically correct every error.",
    marking: [
      { mark: "B1", text: "byte parity uses a parity bit and an agreed odd/even rule" },
      { mark: "B1", text: "receiver checks parity and a mismatch indicates a likely transfer error" },
      { mark: "B1", text: "block parity applies parity across rows and columns of a block" },
      { mark: "B1", text: "row/column evidence can locate many single-bit errors" },
      { mark: "B1", text: "sender calculates and transmits a checksum for the data block" },
      { mark: "B1", text: "receiver recalculates and compares the checksum" },
      { mark: "B1", text: "methods detect many errors but do not automatically correct every error" },
    ],
    strict: [
      "Do not substitute a validation check digit for a transfer checksum.",
      "Do not merge byte parity and block parity into one unexplained use of the word parity.",
      "Do not claim that error detection automatically corrects the transferred data.",
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
    validation: "Correct. A range rule is being applied before accepting the input.",
    verification: "No. Verification compares entered data with a source or repeated entry.",
    truth: "No. Passing or failing a validation rule does not prove real-world truth.",
    backup: "No. Backup is recovery; this is input checking.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = responses[button.dataset.hook];
    });
  });
}

function setupRuleTester() {
  const type = document.querySelector("#checkType");
  const input = document.querySelector("#checkInput");
  const result = document.querySelector("#checkResult");
  const reason = document.querySelector("#checkReason");
  const defaults = {
    range: "76",
    length: "STU12345",
    type: "12.5",
    format: "AB1234",
    presence: "",
    existence: "P200",
    limit: "12",
    checkDigit: "123455",
  };
  function test() {
    const rule = checkRules[type.value];
    const pass = rule.test(input.value);
    result.textContent = pass ? rule.pass : rule.fail;
    reason.innerHTML = `<strong>Limitation:</strong> ${rule.limitation}`;
  }
  type.addEventListener("change", () => {
    input.value = defaults[type.value];
    test();
  });
  input.addEventListener("input", test);
  document.querySelector("#checkBtn").addEventListener("click", test);
  test();
}

function setupVerifyTool() {
  const select = document.querySelector("#verifyInput");
  const result = document.querySelector("#verifyResult");
  const reason = document.querySelector("#verifyReason");
  function classify() {
    const item = verifyMap[select.value];
    result.textContent = item.result;
    reason.innerHTML = `<strong>Reasoning:</strong> ${item.reason}`;
  }
  select.addEventListener("change", classify);
  document.querySelector("#verifyBtn").addEventListener("click", classify);
  classify();
}

function renderExample(key) {
  const example = examples[key];
  document.querySelector("#exampleBox").innerHTML = `
    <h3>${example.title}</h3>
    <p><strong>Problem:</strong> ${example.problem}</p>
    <ol>${example.steps.map((step) => `<li>${step}</li>`).join("")}</ol>
  `;
}

function setupExamples() {
  document.querySelectorAll(".tab").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderExample(button.dataset.example);
    });
  });
  renderExample("range");
}

function renderPractice() {
  const list = document.querySelector("#practiceList");
  list.innerHTML = practice.map((item) => `
    <article class="practice-item">
      <p><strong>${item.id.toUpperCase()}.</strong> ${item.prompt}</p>
      <div class="practice-row">
        <input type="text" aria-label="Answer for ${item.id}" data-practice="${item.id}" />
        <span class="mark" id="${item.id}Mark">Not checked</span>
      </div>
      <button class="answer-toggle" type="button" data-answer="${item.id}">Show answer</button>
      <div class="answer-panel" id="${item.id}Answer"><strong>Answer:</strong> ${item.answer}</div>
    </article>
  `).join("");

  document.querySelectorAll("[data-practice]").forEach((input) => {
    input.addEventListener("input", () => {
      const item = practice.find((entry) => entry.id === input.dataset.practice);
      const mark = document.querySelector(`#${item.id}Mark`);
      const value = normalise(input.value);
      const correct = item.accepted.some((answer) => value === normalise(answer));
      if (!value) {
        mark.textContent = "Not checked";
        mark.className = "mark";
        return;
      }
      mark.textContent = correct ? "Correct" : "Try again";
      mark.className = correct ? "mark correct" : "mark incorrect";
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
  document.querySelector("#mistakeGrid").innerHTML = mistakes.map((item, index) => `
    <article>
      <p class="wrong"><strong>Wrong:</strong> ${item.wrong}</p>
      <button class="answer-toggle" type="button" data-fix="${index}">Show correction</button>
      <div class="answer-panel" id="fix${index}"><strong>Correction:</strong> ${item.fix}</div>
    </article>
  `).join("");
  document.querySelectorAll("[data-fix]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#fix${button.dataset.fix}`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide correction" : "Show correction";
    });
  });
}

function renderExam() {
  document.querySelector("#examList").innerHTML = examQuestions.map((item, index) => `
    <article class="exam-card">
      <div class="exam-head">
        <h3>${item.title}</h3>
        <span>${item.marks}</span>
      </div>
      <p>${item.prompt}</p>
      <button class="ms-toggle" type="button" data-ms="${index}">Show MS</button>
      <div class="ms-panel" id="ms${index}">
        <h4>Cambridge-style mark scheme</h4>
        <p><strong>Model answer:</strong> ${item.answer}</p>
        <ul>${item.marking.map((mark) => `<li><strong>${mark.mark}</strong> ${mark.text}</li>`).join("")}</ul>
      </div>
    </article>
  `).join("");
  document.querySelectorAll("[data-ms]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#ms${button.dataset.ms}`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide MS" : "Show MS";
    });
  });
}

setupPrint();
setupHook();
setupRuleTester();
setupVerifyTool();
setupExamples();
renderPractice();
renderMistakes();
renderExam();
