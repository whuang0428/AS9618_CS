const scores = [42, 67, 55, 81, 49];

const builderMap = {
  declare: {
    title: "Declare five integer scores",
    code: "DECLARE Scores : ARRAY[1:5] OF INTEGER",
    reason: "The identifier is Scores, valid indexes are 1 to 5, and each element stores an INTEGER.",
  },
  input: {
    title: "Input all scores",
    code: "FOR Index <- 1 TO 5\n    INPUT Scores[Index]\nNEXT Index",
    reason: "The loop visits each valid index exactly once.",
  },
  output: {
    title: "Output all scores",
    code: "FOR Index <- 1 TO 5\n    OUTPUT Scores[Index]\nNEXT Index",
    reason: "Scores[Index] accesses one element at a time.",
  },
  total: {
    title: "Calculate total",
    code: "Total <- 0\nFOR Index <- 1 TO 5\n    Total <- Total + Scores[Index]\nNEXT Index\nOUTPUT Total",
    reason: "A running total is updated using each array element.",
  },
  search: {
    title: "Linear search for a target",
    code: "Found <- FALSE\nFOR Index <- 1 TO 5\n    IF Scores[Index] = Target THEN\n        Found <- TRUE\n    ENDIF\nNEXT Index\nOUTPUT Found",
    reason: "Each element is compared with Target using its index.",
  },
};

const examples = {
  declare: {
    title: "Example 1: Declare and input",
    problem: "Store five integer scores in a one-dimensional array.",
    rows: [
      ["Declaration", "DECLARE Scores : ARRAY[1:5] OF INTEGER", "sets identifier, bounds and type"],
      ["First valid index", "1", "lower bound"],
      ["Last valid index", "5", "upper bound"],
      ["Input loop", "FOR Index <- 1 TO 5", "matches declared bounds"],
    ],
    code: "DECLARE Scores : ARRAY[1:5] OF INTEGER\n\nFOR Index <- 1 TO 5\n    INPUT Scores[Index]\nNEXT Index",
    points: ["The whole array is Scores.", "Each element is Scores[Index].", "The loop must not visit index 0 or 6."],
  },
  total: {
    title: "Example 2: Total and average",
    problem: "Calculate total and average for five scores.",
    rows: [
      ["Initialise", "Total <- 0", "before loop"],
      ["Traverse", "Index 1 to 5", "each score is included once"],
      ["Update", "Total <- Total + Scores[Index]", "running total"],
      ["Average", "Average <- Total / 5", "after loop"],
    ],
    code: "Total <- 0\nFOR Index <- 1 TO 5\n    Total <- Total + Scores[Index]\nNEXT Index\nAverage <- Total / 5\nOUTPUT Average",
    points: ["Average is calculated after all values are included.", "The divisor matches the number of elements.", "Do not output final average inside the loop unless asked for running averages."],
  },
  search: {
    title: "Example 3: Linear search",
    problem: "Check whether Target appears in Scores[1:5].",
    rows: [
      ["Flag", "Found <- FALSE", "assume target not found yet"],
      ["Compare", "Scores[Index] = Target", "test one element"],
      ["Update", "Found <- TRUE", "target has appeared"],
      ["Output", "OUTPUT Found", "after traversal"],
    ],
    code: "Found <- FALSE\nFOR Index <- 1 TO 5\n    IF Scores[Index] = Target THEN\n        Found <- TRUE\n    ENDIF\nNEXT Index\nOUTPUT Found",
    points: ["This is a linear search.", "Use the index to access each element.", "The flag records whether the target was found."],
  },
  update: {
    title: "Example 4: Update one element",
    problem: "Add 5 bonus marks to the third score.",
    rows: [
      ["Old value", "Scores[3] = 55", "element at index 3"],
      ["Assignment", "Scores[3] <- Scores[3] + 5", "update one element"],
      ["New value", "Scores[3] = 60", "other elements unchanged"],
    ],
    code: "Scores[3] <- Scores[3] + 5",
    points: ["Only index 3 changes.", "The array identifier remains Scores.", "The old element value is used on the right side."],
  },
};

const practice = [
  { id: "p1", prompt: "What structure stores multiple same-type values under one identifier?", accepted: ["array", "one dimensional array", "1d array"], answer: "Array / one-dimensional array." },
  { id: "p2", prompt: "In Scores[3], what is 3 called?", accepted: ["index", "subscript"], answer: "Index / subscript." },
  { id: "p3", prompt: "For DECLARE Scores : ARRAY[1:5] OF INTEGER, is index 0 valid? yes or no.", accepted: ["no"], answer: "No. Valid indexes are 1 to 5." },
  { id: "p4", prompt: "For ARRAY[1:5], how many elements are stored?", accepted: ["5"], answer: "5 elements." },
  { id: "p5", prompt: "Write the first valid index for ARRAY[1:10].", accepted: ["1"], answer: "1." },
  { id: "p6", prompt: "Write the last valid index for ARRAY[1:10].", accepted: ["10"], answer: "10." },
  { id: "p7", prompt: "Which loop keyword is commonly used to traverse a known-size array?", accepted: ["for", "for loop"], answer: "FOR loop." },
  { id: "p8", prompt: "If Scores = 42,67,55,81,49 using indexes 1 to 5, what is Scores[4]?", accepted: ["81"], answer: "81." },
  { id: "p9", prompt: "Does Scores name the whole array or one element?", accepted: ["whole array", "array", "the whole array"], answer: "The whole array." },
  { id: "p10", prompt: "Is Java's index 0 automatically correct for Cambridge pseudocode ARRAY[1:5]? yes or no.", accepted: ["no"], answer: "No. Use the bounds stated in the Cambridge pseudocode question." },
];

const mistakes = [
  {
    wrong: "I wrote OUTPUT Scores when I needed one score.",
    fix: "Use an index to access one element, for example OUTPUT Scores[Index] or OUTPUT Scores[3].",
  },
  {
    wrong: "I looped from 0 to 5 for an array declared ARRAY[1:5].",
    fix: "Match the declared bounds: FOR Index <- 1 TO 5. Index 0 is out of range and index 5 is already included.",
  },
  {
    wrong: "I declared Scores as INTEGER instead of an array.",
    fix: "Use ARRAY bounds and element type: DECLARE Scores : ARRAY[1:5] OF INTEGER.",
  },
  {
    wrong: "I copied Java zero-based indexing into Cambridge pseudocode.",
    fix: "Java support examples often use 0 to length - 1, but Paper 2 pseudocode should follow the array bounds given in the question.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "6 marks",
    prompt: "Declare a one-dimensional array called Scores to store 20 integer marks. Then write pseudocode to input all the marks.",
    answer: "DECLARE Scores : ARRAY[1:20] OF INTEGER\n\nFOR Index <- 1 TO 20\n    INPUT Scores[Index]\nNEXT Index",
    marking: [
      { mark: "B1", text: "uses identifier Scores" },
      { mark: "B1", text: "declares Scores as an ARRAY" },
      { mark: "B1", text: "uses suitable bounds for 20 elements, e.g. 1:20" },
      { mark: "B1", text: "uses INTEGER as element type" },
      { mark: "M1", text: "uses a loop that covers all valid indexes" },
      { mark: "A1", text: "inputs into Scores[Index] or equivalent indexed element" },
    ],
    strict: [
      "Do not award array declaration marks for 20 separate variables.",
      "Allow ARRAY[0:19] only if loop bounds and explanation are consistent.",
      "Do not award input mark for INPUT Scores without indexed access.",
    ],
  },
  {
    title: "Question 2",
    marks: "7 marks",
    prompt: "An array Scores[1:5] stores 42, 67, 55, 81, 49. Trace the total produced by a loop from Index <- 1 TO 5 that adds Scores[Index] to Total.",
    answer: "Total starts at 0. Index 1 adds 42 so Total = 42. Index 2 adds 67 so Total = 109. Index 3 adds 55 so Total = 164. Index 4 adds 81 so Total = 245. Index 5 adds 49 so Total = 294.",
    marking: [
      { mark: "B1", text: "initialises or states Total starts at 0" },
      { mark: "M1", text: "uses Scores[1] = 42 correctly" },
      { mark: "A1", text: "Total = 42 after first iteration" },
      { mark: "A1", text: "Total = 109 after second iteration" },
      { mark: "A1", text: "Total = 164 after third iteration" },
      { mark: "A1", text: "Total = 245 after fourth iteration" },
      { mark: "A1", text: "final Total = 294" },
    ],
    strict: [
      "Award trace marks for values in correct iteration order.",
      "Allow table format.",
      "Do not award final mark if an out-of-range element is included.",
      "Allow FT from the candidate's earlier trace value only when every subsequent step applies the stated algorithm correctly.",
    ],
  },
  {
    title: "Question 3",
    marks: "4 marks",
    prompt: "Explain why Scores[0] is invalid if Scores is declared as ARRAY[1:10] OF INTEGER.",
    answer: "The declaration gives valid indexes from 1 to 10 inclusive. Scores[0] tries to access an element outside these bounds. It is therefore an out-of-range index and does not refer to a valid element of the array.",
    marking: [
      { mark: "B1", text: "states valid lower bound is 1" },
      { mark: "B1", text: "states valid upper bound is 10" },
      { mark: "B1", text: "identifies 0 is outside the declared bounds" },
      { mark: "B1", text: "states Scores[0] does not refer to a valid element" },
    ],
    strict: [
      "Do not accept only 'Java starts at 0' because this question gives Cambridge bounds.",
      "Allow 'subscript' for index.",
      "Do not award valid-element mark if candidate claims Scores[0] is the first element.",
    ],
  },
  {
    title: "Question 4",
    marks: "8 marks",
    prompt: "Write pseudocode to search Names[1:30] for TargetName and output 'Found' if it is present, otherwise output 'Not found'.",
    answer: "Found <- FALSE\nFOR Index <- 1 TO 30\n    IF Names[Index] = TargetName THEN\n        Found <- TRUE\n    ENDIF\nNEXT Index\nIF Found = TRUE THEN\n    OUTPUT \"Found\"\nELSE\n    OUTPUT \"Not found\"\nENDIF",
    marking: [
      { mark: "B1", text: "initialises Found to FALSE" },
      { mark: "M1", text: "loops through valid indexes 1 to 30" },
      { mark: "M1", text: "accesses Names[Index] or equivalent indexed element" },
      { mark: "A1", text: "compares each element with TargetName" },
      { mark: "A1", text: "sets Found to TRUE when a match is found" },
      { mark: "B1", text: "outputs Found message when Found is TRUE" },
      { mark: "B1", text: "outputs Not found message when Found is FALSE" },
      { mark: "B1", text: "uses clear Cambridge-style block structure" },
    ],
    strict: [
      "Do not award comparison mark for comparing Names without an index.",
      "Allow early exit if logic remains correct.",
      "Do not require exact output wording if meaning is clear.",
    ],
  },
  {
    title: "Question 5",
    marks: "4 marks",
    prompt: "A student writes FOR Index <- 1 TO 6 for an array declared Readings : ARRAY[1:5] OF REAL. Explain the error and correct it.",
    answer: "The array has valid indexes 1 to 5. The loop tries to access index 6, which is outside the declared bounds and does not exist. The correction is FOR Index <- 1 TO 5 so every valid element is processed once without out-of-range access.",
    marking: [
      { mark: "B1", text: "states valid indexes are 1 to 5" },
      { mark: "B1", text: "identifies index 6 is outside the bounds" },
      { mark: "B1", text: "gives corrected loop FOR Index <- 1 TO 5" },
      { mark: "B1", text: "explains the corrected loop processes all valid elements without out-of-range access" },
    ],
    strict: [
      "Do not award correction for FOR Index <- 0 TO 4 unless declaration is also changed and justified.",
      "Allow wording 'subscript out of range'.",
      "Do not accept only 'loop is too long' without linking to bounds.",
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
  return value.trim().toLowerCase().replace(/\s+/g, " ").replace(/[^a-z0-9 -]/g, "");
}

function tableMarkup(headers, rows) {
  return `
    <div class="result-table" style="--cols: ${headers.length}">
      <div class="table-row table-head">${headers.map((head) => `<div>${escapeHtml(head)}</div>`).join("")}</div>
      ${rows.map((row) => `<div class="table-row">${row.map((cell) => `<div>${escapeHtml(cell)}</div>`).join("")}</div>`).join("")}
    </div>
  `;
}

function setupPrint() {
  document.querySelector("#printBtn").addEventListener("click", () => window.print());
}

function setupHook() {
  const feedback = document.querySelector("#hookFeedback");
  const responses = {
    many: "It works only until the task changes. Thirty separate variables are awkward to loop over.",
    array: "Correct. One array plus an index scales cleanly.",
    string: "A long string would make numeric access and calculation unnecessarily messy.",
    constant: "A constant cannot store 30 different scores.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = responses[button.dataset.hook];
    });
  });
}

function setupLookup() {
  const result = document.querySelector("#lookupResult");
  document.querySelector("#lookupBtn").addEventListener("click", () => {
    const index = Number(document.querySelector("#indexInput").value);
    if (index < 1 || index > scores.length) {
      result.innerHTML = `<p><strong>Out of range.</strong> Scores is declared as ARRAY[1:5], so index ${index} is not valid.</p>`;
      return;
    }
    result.innerHTML = `<p>Scores[${index}] = <strong>${scores[index - 1]}</strong>.</p>`;
  });
}

function setupBuilder() {
  const input = document.querySelector("#builderInput");
  const result = document.querySelector("#builderResult");
  document.querySelector("#builderBtn").addEventListener("click", () => {
    const item = builderMap[input.value];
    result.innerHTML = `
      <h3>${escapeHtml(item.title)}</h3>
      <pre><code>${escapeHtml(item.code)}</code></pre>
      <p>${escapeHtml(item.reason)}</p>
    `;
  });
}

function renderExample(key) {
  const example = examples[key];
  document.querySelector("#exampleBox").innerHTML = `
    <h3>${escapeHtml(example.title)}</h3>
    <p><strong>Problem:</strong> ${escapeHtml(example.problem)}</p>
    ${tableMarkup(["Step", "Code / value", "Reason"], example.rows)}
    <p><strong>Cambridge-style pseudocode:</strong></p>
    <pre><code>${escapeHtml(example.code)}</code></pre>
    <ul>${example.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul>
  `;
}

function setupExamples() {
  renderExample("declare");
  document.querySelectorAll("[data-example]").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll("[data-example]").forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");
      renderExample(tab.dataset.example);
    });
  });
}

function renderPractice() {
  const container = document.querySelector("#practiceList");
  container.innerHTML = practice.map((item, index) => `
    <article class="practice-item">
      <h3>${index + 1}. ${escapeHtml(item.prompt)}</h3>
      <div class="practice-row">
        <input type="text" id="${item.id}" aria-label="Answer for practice question ${index + 1}" />
        <button class="primary-button" type="button" data-check="${item.id}">Check</button>
      </div>
      <div class="mark" id="${item.id}Mark" aria-live="polite"></div>
      <button class="answer-toggle" type="button" data-answer="${item.id}">Show answer</button>
      <div class="answer-panel" id="${item.id}Answer">${escapeHtml(item.answer)}</div>
    </article>
  `).join("");

  document.querySelectorAll("[data-check]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = practice.find((entry) => entry.id === button.dataset.check);
      const value = normalise(document.querySelector(`#${item.id}`).value);
      const correct = item.accepted.some((answer) => value === normalise(answer));
      const mark = document.querySelector(`#${item.id}Mark`);
      mark.textContent = correct ? "Correct. The array wording is precise." : "Not quite. Check the identifier, index or bounds.";
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
      <h3>Mistake ${index + 1}</h3>
      <p class="wrong">${escapeHtml(item.wrong)}</p>
      <button class="answer-toggle" type="button" data-fix="${index}">Show correction</button>
      <div class="answer-panel" id="fix${index}">${escapeHtml(item.fix)}</div>
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
  const container = document.querySelector("#examList");
  container.innerHTML = examQuestions.map((question, index) => `
    <article class="exam-card">
      <div class="exam-head">
        <h3>${escapeHtml(question.title)}</h3>
        <span>${escapeHtml(question.marks)}</span>
      </div>
      <p>${escapeHtml(question.prompt)}</p>
      <button class="ms-toggle" type="button" data-ms="${index}">Show MS</button>
      <div class="ms-panel" id="ms${index}">
        <p><strong>Indicative answer:</strong></p>
        <pre><code>${escapeHtml(question.answer)}</code></pre>
        <p><strong>Marking points:</strong></p>
        <ul>${question.marking.map((line) => `<li><strong>${escapeHtml(line.mark)}</strong> ${escapeHtml(line.text)}</li>`).join("")}</ul>
        <p><strong>Strict notes:</strong></p>
        <ul>${question.strict.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}</ul>
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
setupLookup();
setupBuilder();
setupExamples();
renderPractice();
renderMistakes();
renderExam();
