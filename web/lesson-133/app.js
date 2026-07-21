const scenarios = [
  {
    id: "length",
    text: "Check whether a password has at least 8 characters.",
    recommendation: "LENGTH(Password)",
    reason: "LENGTH returns the number of characters, so it can be compared with 8.",
  },
  {
    id: "initials",
    text: "Create a code from the first three letters of a surname.",
    recommendation: "LEFT(Surname, 3)",
    reason: "LEFT extracts a fixed number of characters from the start of the string.",
  },
  {
    id: "extension",
    text: "Check whether a filename ends in .txt.",
    recommendation: "RIGHT(FileName, 4)",
    reason: "RIGHT extracts characters from the end of the string.",
  },
  {
    id: "case",
    text: "Accept y or Y as the same menu response.",
    recommendation: "UCASE(Response)",
    reason: "Convert the response to a common case before comparison.",
  },
];

const examples = {
  length: {
    title: "Example 1: Validate string length",
    problem: "Check whether a password is long enough.",
    rows: [
      ["Input", "Password = \"secure7\"", "7 characters"],
      ["Function", "LENGTH(Password)", "returns 7"],
      ["Comparison", "7 >= 8", "FALSE"],
      ["Output", "\"Too short\"", "validation fails"],
    ],
    code: "INPUT Password\nIF LENGTH(Password) >= 8 THEN\n    OUTPUT \"Accepted\"\nELSE\n    OUTPUT \"Too short\"\nENDIF",
    points: [
      "LENGTH returns an integer.",
      "The returned value is used in a comparison.",
      "Spaces count as characters unless the algorithm removes them first.",
    ],
  },
  mid: {
    title: "Example 2: Extract a substring",
    problem: "Trace MID(\"COMPUTER\", 4, 3).",
    rows: [
      ["Positions", "1:C 2:O 3:M 4:P 5:U 6:T 7:E 8:R", "1-based pseudocode positions"],
      ["Start", "4", "start at P"],
      ["Count", "3", "take P, U, T"],
      ["Returned value", "\"PUT\"", "substring result"],
    ],
    code: "Word <- \"COMPUTER\"\nPart <- MID(Word, 4, 3)\nOUTPUT Part",
    points: [
      "Write positions before extracting.",
      "The third argument is the number of characters in this lesson's convention.",
      "Do not use Java's 0-based indexing here.",
    ],
  },
  case: {
    title: "Example 3: Convert case before comparison",
    problem: "Accept user input y or Y as yes.",
    rows: [
      ["Input", "Response = \"y\"", "lowercase input"],
      ["Function", "UCASE(Response)", "returns \"Y\""],
      ["Comparison", "\"Y\" = \"Y\"", "TRUE"],
    ],
    code: "INPUT Response\nResponse <- UCASE(Response)\nIF Response = \"Y\" THEN\n    OUTPUT \"Continue\"\nENDIF",
    points: [
      "UCASE returns a string.",
      "Assign the returned value if the converted version is needed later.",
      "Case conversion does not validate meaning by itself.",
    ],
  },
  nested: {
    title: "Example 4: Nested built-in functions",
    problem: "Trace LCASE(LEFT(\"NETWORK\", 3)) & \"29\".",
    rows: [
      ["Inner call", "LEFT(\"NETWORK\", 3)", "returns \"NET\""],
      ["Outer call", "LCASE(\"NET\")", "returns \"net\""],
      ["Concatenate", "\"net\" & \"29\"", "returns \"net29\""],
    ],
    code: "Code <- LCASE(LEFT(\"NETWORK\", 3)) & \"29\"\nOUTPUT Code",
    points: [
      "Evaluate inner function calls first.",
      "Then use their returned values in the outer expression.",
      "Keep numeric-looking text in quotes if it is being joined as a string.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "What is LENGTH(\"DATA\")?", accepted: ["4"], answer: "4." },
  { id: "p2", prompt: "What does UCASE(\"exam\") return?", accepted: ["EXAM"], answer: "EXAM." },
  { id: "p3", prompt: "What does LCASE(\"Code\") return?", accepted: ["code"], answer: "code." },
  { id: "p4", prompt: "What does LEFT(\"NETWORK\", 3) return?", accepted: ["NET"], answer: "NET." },
  { id: "p5", prompt: "What does RIGHT(\"NETWORK\", 4) return?", accepted: ["WORK"], answer: "WORK." },
  { id: "p6", prompt: "Using 1-based positions, what does MID(\"COMPUTER\", 4, 3) return?", accepted: ["PUT"], answer: "PUT." },
  { id: "p7", prompt: "What operator is used in this course to concatenate strings: & or DIV?", accepted: ["&", "ampersand"], answer: "&." },
  { id: "p8", prompt: "What does LEFT(UCASE(\"ada\"), 2) return?", accepted: ["AD"], answer: "AD." },
  { id: "p9", prompt: "Java strings use zero-based indexes. Cambridge-style examples here use positions starting at what number?", accepted: ["1", "one"], answer: "1." },
  { id: "p10", prompt: "What does LCASE(LEFT(\"NETWORK\", 3)) & \"29\" return?", accepted: ["net29"], answer: "net29." },
];

const mistakes = [
  {
    wrong: "A student writes Java code name.substring(0, 3) as the Cambridge pseudocode answer.",
    fix: "Use Cambridge-style pseudocode such as LEFT(Name, 3), unless the question specifically asks for Java.",
  },
  {
    wrong: "A student treats LENGTH(\"A B\") as 2 because there are two letters.",
    fix: "The space is also a character, so LENGTH(\"A B\") is 3 unless the algorithm removes spaces first.",
  },
  {
    wrong: "A student traces MID(\"MONITOR\", 2, 3) as \"NIT\" by starting from Java index 2.",
    fix: "Use the stated convention. With 1-based positions and count 3, start at O and return \"ONI\".",
  },
  {
    wrong: "A student writes UCASE(Answer) but then compares the old unconverted variable value.",
    fix: "Assign the returned value, for example Answer <- UCASE(Answer), or compare UCASE(Answer) directly.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "3 marks",
    prompt: "Trace the output.\n\nWord <- \"NETWORK\"\nPart <- LEFT(Word, 3)\nPart <- LCASE(Part)\nOUTPUT Part",
    answer: "LEFT(\"NETWORK\", 3) returns \"NET\". LCASE(\"NET\") returns \"net\". The output is net.",
    marking: [
      { mark: "B1", text: "identifies LEFT(Word, 3) returns NET" },
      { mark: "M1", text: "applies LCASE to NET" },
      { mark: "A1", text: "states final output is net" },
    ],
    strict: [
      "Do not award final output mark for NET.",
      "Allow quotation marks around returned strings.",
      "Do not accept Java method syntax alone.",
      "Allow FT from the candidate's earlier trace value only when every subsequent step applies the stated algorithm correctly.",
    ],
  },
  {
    title: "Question 2",
    marks: "6 marks",
    prompt: "A password must contain at least 8 characters. Write Cambridge-style pseudocode that inputs Password and outputs Accepted or Too short.",
    answer: "INPUT Password\nIF LENGTH(Password) >= 8 THEN\n    OUTPUT \"Accepted\"\nELSE\n    OUTPUT \"Too short\"\nENDIF",
    marking: [
      { mark: "B1", text: "inputs or otherwise obtains Password" },
      { mark: "M1", text: "uses LENGTH(Password) or equivalent string length function" },
      { mark: "A1", text: "compares length with 8 using >= or equivalent at-least logic" },
      { mark: "B1", text: "outputs Accepted when the length requirement is met" },
      { mark: "B1", text: "outputs Too short or equivalent when the requirement is not met" },
      { mark: "A1", text: "uses correct IF/ELSE/ENDIF structure" },
    ],
    strict: [
      "Do not award comparison mark for > 8 because exactly 8 should be accepted.",
      "Allow variable names other than Password if clear.",
      "Do not accept counting only alphabetic letters unless stated in the question.",
    ],
  },
  {
    title: "Question 3",
    marks: "6 marks",
    prompt: "Using positions starting at 1, trace this pseudocode.\n\nCode <- \"COMPUTER\"\nOUTPUT MID(Code, 4, 3)\nOUTPUT RIGHT(Code, 2)",
    answer: "MID(\"COMPUTER\", 4, 3) starts at position 4, P, and returns three characters: PUT. RIGHT(\"COMPUTER\", 2) returns ER.",
    marking: [
      { mark: "B1", text: "uses positions starting at 1" },
      { mark: "M1", text: "identifies position 4 in COMPUTER as P" },
      { mark: "A1", text: "states MID result is PUT" },
      { mark: "M1", text: "identifies RIGHT(Code, 2) extracts the last two characters" },
      { mark: "A1", text: "states RIGHT result is ER" },
      { mark: "B1", text: "presents outputs in the correct order" },
    ],
    strict: [
      "Do not award MID result mark for M in Java index 4 style.",
      "Allow characters shown with or without quotation marks.",
      "Do not accept a single combined output unless both parts are clearly shown.",
    ],
  },
  {
    title: "Question 4",
    marks: "7 marks",
    prompt: "Write pseudocode to input Surname and YearGroup, then create UserID from the first three letters of Surname in lower case followed by YearGroup. Output UserID.",
    answer: "INPUT Surname\nINPUT YearGroup\nUserID <- LCASE(LEFT(Surname, 3)) & YearGroup\nOUTPUT UserID",
    marking: [
      { mark: "B1", text: "inputs or obtains Surname" },
      { mark: "B1", text: "inputs or obtains YearGroup" },
      { mark: "M1", text: "uses LEFT(Surname, 3) or equivalent to extract first three letters" },
      { mark: "A1", text: "converts extracted surname part to lower case" },
      { mark: "M1", text: "concatenates surname part with YearGroup" },
      { mark: "A1", text: "assigns the result to UserID or equivalent" },
      { mark: "B1", text: "outputs UserID" },
    ],
    strict: [
      "Do not award extraction mark for RIGHT(Surname, 3).",
      "Allow conversion before extraction if the final first three letters are lower case.",
      "Do not accept Java String method calls alone as Cambridge pseudocode.",
    ],
  },
  {
    title: "Question 5",
    marks: "4 marks",
    prompt: "A candidate writes Part <- Word.substring(0, 3) in a Cambridge pseudocode answer. Explain the problem and give a corrected Cambridge-style expression.",
    answer: "The problem is that substring(0, 3) is Java-style method syntax and uses zero-based indexes. Cambridge-style pseudocode should use a clear string function such as Part <- LEFT(Word, 3) to get the first three characters.",
    marking: [
      { mark: "B1", text: "identifies substring(0, 3) as Java-style syntax / not Cambridge-style pseudocode" },
      { mark: "M1", text: "explains Java indexes start at 0 or differ from the course pseudocode position convention" },
      { mark: "M1", text: "states the intended result is the first three characters" },
      { mark: "A1", text: "gives corrected expression using LEFT(Word, 3) or equivalent" },
    ],
    strict: [
      "Do not award correction mark for another Java expression.",
      "Allow MID(Word, 1, 3) as an equivalent Cambridge-style correction.",
      "Do not accept only 'syntax error' without explaining the pseudocode/Java difference.",
      "Allow an equivalent variable if it is used consistently.",
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
  return value.trim().toLowerCase().replace(/^["']|["']$/g, "").replace(/\s+/g, " ").replace(/[^a-z0-9&:<>=\[\] %_.-]/g, "");
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
  const messages = {
    mon: "Not quite. Starting at position 2 means start at O, not M.",
    oni: "Correct. Position 2 is O, then take three characters: O, N, I.",
    oni0: "Close start, wrong count. The third argument is 3 characters here, so return ONI.",
    nit: "That looks like a Java-index habit. This pseudocode trace uses positions starting at 1.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = messages[button.dataset.hook];
    });
  });
}

function runStringFunction(text, func, start, count) {
  if (func === "length") return String(text.length);
  if (func === "left") return text.slice(0, count);
  if (func === "right") return count <= text.length ? text.slice(text.length - count) : text;
  if (func === "mid") return text.slice(start - 1, start - 1 + count);
  if (func === "ucase") return text.toUpperCase();
  if (func === "lcase") return text.toLowerCase();
  return "";
}

function setupStringLab() {
  const result = document.querySelector("#labResult");
  document.querySelector("#runBtn").addEventListener("click", () => {
    const text = document.querySelector("#textInput").value;
    const func = document.querySelector("#functionInput").value;
    const start = Number(document.querySelector("#startInput").value);
    const count = Number(document.querySelector("#countInput").value);

    if (text.length === 0) {
      result.textContent = "Enter a non-empty string.";
      return;
    }
    if (!Number.isInteger(start) || !Number.isInteger(count) || start < 1 || count < 1) {
      result.textContent = "Start and n must be positive integers.";
      return;
    }
    if (func === "mid" && start > text.length) {
      result.textContent = "For this lab, the MID start position must be within the string.";
      return;
    }

    const value = runStringFunction(text, func, start, count);
    const call = {
      length: `LENGTH("${text}")`,
      left: `LEFT("${text}", ${count})`,
      right: `RIGHT("${text}", ${count})`,
      mid: `MID("${text}", ${start}, ${count})`,
      ucase: `UCASE("${text}")`,
      lcase: `LCASE("${text}")`,
    }[func];

    result.innerHTML = `
      <p><strong>Function call:</strong> ${escapeHtml(call)}</p>
      <p><strong>Returned value:</strong> ${escapeHtml(value)}</p>
      <p><strong>Note:</strong> A built-in function returns a value, so assign it or use it in an expression.</p>
    `;
  });
}

function setupScenarioChooser() {
  const grid = document.querySelector("#scenarioGrid");
  const feedback = document.querySelector("#scenarioFeedback");
  grid.innerHTML = scenarios
    .map((scenario) => `<button class="choice-card" type="button" data-scenario="${scenario.id}">${escapeHtml(scenario.text)}</button>`)
    .join("");

  grid.querySelectorAll("[data-scenario]").forEach((button) => {
    button.addEventListener("click", () => {
      grid.querySelectorAll("[data-scenario]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      const scenario = scenarios.find((item) => item.id === button.dataset.scenario);
      feedback.innerHTML = `<strong>${escapeHtml(scenario.recommendation)}</strong>: ${escapeHtml(scenario.reason)}`;
    });
  });
}

function setupExamples() {
  const tabs = document.querySelector("#exampleTabs");
  const output = document.querySelector("#exampleOutput");
  const keys = Object.keys(examples);

  function render(key) {
    const example = examples[key];
    tabs.querySelectorAll(".tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.example === key));
    output.innerHTML = `
      <article class="worked-card">
        <h3>${escapeHtml(example.title)}</h3>
        <p>${escapeHtml(example.problem)}</p>
        ${tableMarkup(["Step", "Value / result", "Reason"], example.rows)}
        <pre><code>${escapeHtml(example.code)}</code></pre>
        <ul>${example.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul>
      </article>
    `;
  }

  tabs.innerHTML = keys
    .map((key, index) => `<button class="tab${index === 0 ? " active" : ""}" type="button" data-example="${key}">${escapeHtml(examples[key].title)}</button>`)
    .join("");
  tabs.querySelectorAll("[data-example]").forEach((tab) => tab.addEventListener("click", () => render(tab.dataset.example)));
  render(keys[0]);
}

function setupPractice() {
  const list = document.querySelector("#practiceList");
  list.innerHTML = practice
    .map(
      (item, index) => `
        <article class="practice-card">
          <h3>Practice ${index + 1}</h3>
          <p>${escapeHtml(item.prompt)}</p>
          <div class="practice-controls">
            <input type="text" aria-label="Answer for practice ${index + 1}" data-practice-input="${item.id}" />
            <button class="check-btn" type="button" data-check="${item.id}">Check</button>
          </div>
          <div class="feedback" data-feedback="${item.id}">Type your answer, then check.</div>
          <button class="answer-toggle" type="button" data-answer-toggle="${item.id}">Show answer</button>
          <div class="answer-panel" data-answer="${item.id}" hidden>${escapeHtml(item.answer)}</div>
        </article>
      `,
    )
    .join("");

  list.querySelectorAll("[data-check]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = practice.find((entry) => entry.id === button.dataset.check);
      const input = list.querySelector(`[data-practice-input="${item.id}"]`);
      const feedback = list.querySelector(`[data-feedback="${item.id}"]`);
      const answer = normalise(input.value);
      const correct = item.accepted.some((accepted) => normalise(accepted) === answer);
      feedback.textContent = correct ? "Correct." : "Not quite. Use Show answer and compare the returned value exactly.";
      feedback.classList.toggle("correct", correct);
      feedback.classList.toggle("incorrect", !correct);
    });
  });

  list.querySelectorAll("[data-answer-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = list.querySelector(`[data-answer="${button.dataset.answerToggle}"]`);
      const isHidden = panel.hidden;
      panel.hidden = !isHidden;
      button.textContent = isHidden ? "Hide answer" : "Show answer";
    });
  });
}

function setupMistakes() {
  const grid = document.querySelector("#mistakeGrid");
  grid.innerHTML = mistakes
    .map(
      (item, index) => `
        <article>
          <h3>Mistake ${index + 1}</h3>
          <p>${escapeHtml(item.wrong)}</p>
          <button class="answer-toggle" type="button" data-correction-toggle="${index}">Show correction</button>
          <div class="answer-panel" data-correction="${index}" hidden>${escapeHtml(item.fix)}</div>
        </article>
      `,
    )
    .join("");

  grid.querySelectorAll("[data-correction-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = grid.querySelector(`[data-correction="${button.dataset.correctionToggle}"]`);
      const isHidden = panel.hidden;
      panel.hidden = !isHidden;
      button.textContent = isHidden ? "Hide correction" : "Show correction";
    });
  });
}

function setupExamQuestions() {
  const list = document.querySelector("#examList");
  list.innerHTML = examQuestions
    .map(
      (question, index) => `
        <article class="exam-card">
          <div class="exam-head">
            <h3>${escapeHtml(question.title)}</h3>
            <span>${escapeHtml(question.marks)}</span>
          </div>
          <pre><code>${escapeHtml(question.prompt)}</code></pre>
          <button class="ms-toggle" type="button" data-ms-toggle="${index}">Show MS</button>
          <div class="ms-panel" data-ms="${index}" hidden>
            <h4>Indicative answer</h4>
            <pre><code>${escapeHtml(question.answer)}</code></pre>
            <h4>Marking guidance</h4>
            <ul>${question.marking.map((point) => `<li><strong>${escapeHtml(point.mark)}</strong> ${escapeHtml(point.text)}</li>`).join("")}</ul>
            <h4>Strict notes</h4>
            <ul>${question.strict.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}</ul>
          </div>
        </article>
      `,
    )
    .join("");

  list.querySelectorAll("[data-ms-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = list.querySelector(`[data-ms="${button.dataset.msToggle}"]`);
      const isHidden = panel.hidden;
      panel.hidden = !isHidden;
      button.textContent = isHidden ? "Hide MS" : "Show MS";
    });
  });
}

setupPrint();
setupHook();
setupStringLab();
setupScenarioChooser();
setupExamples();
setupPractice();
setupMistakes();
setupExamQuestions();
