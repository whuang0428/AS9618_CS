const chooserMap = {
  count: { title: "Count pattern", detail: "Use Count <- Count + 1 when the current character matches the target." },
  search: { title: "Search pattern", detail: "Use a Found flag or store the position when the target character is found." },
  validate: { title: "Validation pattern", detail: "Start with Valid <- TRUE and set it to FALSE if any character breaks the rule." },
  build: { title: "Build pattern", detail: "Start with NewString <- \"\" and append selected characters one at a time." },
};

function charAtOneBased(text, position) {
  return text[position - 1];
}

function isVowel(character) {
  return ["A", "E", "I", "O", "U"].includes(character.toUpperCase());
}

function traceString(text, operation) {
  let count = 0;
  let found = false;
  let foundPosition = "-";
  let newString = "";
  const rows = [];

  for (let index = 1; index <= text.length; index += 1) {
    const character = charAtOneBased(text, index);
    let action = "";

    if (operation === "countA") {
      if (character.toUpperCase() === "A") {
        count += 1;
        action = `A found, Count becomes ${count}`;
      } else {
        action = "not A, Count unchanged";
      }
    }

    if (operation === "findE") {
      if (!found && character.toUpperCase() === "E") {
        found = true;
        foundPosition = String(index);
        action = `first E found at position ${index}`;
      } else if (found) {
        action = "already found, flag remains TRUE";
      } else {
        action = "not E, keep searching";
      }
    }

    if (operation === "removeSpaces") {
      if (character !== " ") {
        newString += character;
        action = `append character, NewString = "${newString}"`;
      } else {
        action = "space skipped";
      }
    }

    if (operation === "countVowels") {
      if (isVowel(character)) {
        count += 1;
        action = `vowel found, Count becomes ${count}`;
      } else {
        action = "not a vowel, Count unchanged";
      }
    }

    rows.push([
      String(index),
      character === " " ? "(space)" : character,
      operation === "countA" || operation === "countVowels" ? String(count) : "-",
      operation === "findE" ? String(found).toUpperCase() : "-",
      operation === "findE" ? foundPosition : "-",
      operation === "removeSpaces" ? `"${newString}"` : "-",
      action,
    ]);
  }

  const final =
    operation === "countA" ? `Final count of A: ${count}.` :
    operation === "countVowels" ? `Final vowel count: ${count}.` :
    operation === "findE" ? `Found E: ${String(found).toUpperCase()}, position: ${foundPosition}.` :
    `Final string without spaces: "${newString}".`;

  return {
    headers: ["Index", "Character", "Count", "Found", "Position", "NewString", "Action"],
    rows,
    note: final,
  };
}

function validateDigitsTrace(text) {
  let valid = true;
  const rows = [];
  for (let index = 1; index <= text.length; index += 1) {
    const character = charAtOneBased(text, index);
    const isDigit = character >= "0" && character <= "9";
    if (!isDigit) valid = false;
    rows.push([String(index), character, isDigit ? "digit" : "not digit", String(valid).toUpperCase()]);
  }
  return {
    headers: ["Index", "Character", "Test", "Valid"],
    rows,
    note: valid ? "The string contains only digits." : "The string is invalid because at least one character is not a digit.",
  };
}

const examples = {
  "count-a": {
    title: "Example 1: Count A in DATA",
    problem: "Trace an algorithm that counts the letter A in DATA.",
    trace: traceString("DATA", "countA"),
    points: ["Initialise Count to 0.", "Inspect each character.", "Increment Count only when the character is A."],
  },
  "find-e": {
    title: "Example 2: Find first E in COMPUTER",
    problem: "Trace an algorithm that finds the first E in COMPUTER.",
    trace: traceString("COMPUTER", "findE"),
    points: ["Start with Found <- FALSE.", "Set Found to TRUE when E is found.", "Store the position if the question asks for it."],
  },
  "remove-spaces": {
    title: "Example 3: Build string without spaces",
    problem: "Trace an algorithm that removes spaces from A S LEVEL.",
    trace: traceString("A S LEVEL", "removeSpaces"),
    points: ["Initialise NewString to an empty string.", "Append non-space characters.", "Do not append the skipped space characters."],
  },
  "validate-digits": {
    title: "Example 4: Validate a digit-only string",
    problem: "Trace validation for the string 12A4.",
    trace: validateDigitsTrace("12A4"),
    points: ["Start with Valid <- TRUE.", "Set Valid <- FALSE if any character is not a digit.", "One invalid character is enough to make the whole string invalid."],
  },
};

const practice = [
  { id: "p1", prompt: "What is the first character of DATA using 1-based pseudocode positions?", accepted: ["d"], answer: "D" },
  { id: "p2", prompt: "What is LENGTH(\"DATA\")?", accepted: ["4", "four"], answer: "4" },
  { id: "p3", prompt: "How many A characters are in DATA?", accepted: ["2", "two"], answer: "2" },
  { id: "p4", prompt: "In COMPUTER, what is the position of the first E using 1-based positions?", accepted: ["7"], answer: "7" },
  { id: "p5", prompt: "What should Count be initialised to before counting matching characters?", accepted: ["0", "zero"], answer: "0" },
  { id: "p6", prompt: "What should Found usually be initialised to before searching? TRUE or FALSE.", accepted: ["false"], answer: "FALSE" },
  { id: "p7", prompt: "After removing spaces from A S, what string remains?", accepted: ["as", "a s without space", "a s -> as"], answer: "AS" },
  { id: "p8", prompt: "If a validation algorithm finds one invalid character, should Valid become TRUE or FALSE?", accepted: ["false"], answer: "FALSE" },
  { id: "p9", prompt: "Which variable is used to build a new string in this lesson?", accepted: ["newstring", "new string"], answer: "NewString" },
  { id: "p10", prompt: "Is Java charAt(0) the same notation as Cambridge-style position 1? yes or no.", accepted: ["no"], answer: "No. Java is 0-based; the pseudocode trace here is 1-based." },
];

const mistakes = [
  { wrong: "I started the Cambridge-style loop at 0 and inspected DATA position 0.", fix: "For this lesson's pseudocode trace, use positions 1 to LENGTH(String). Keep Java 0-based indexing separate." },
  { wrong: "I increased Count for every character when asked to count only A.", fix: "Use Count <- Count + 1 only inside the IF that tests Character = \"A\"." },
  { wrong: "I reset Found to FALSE after the target had already been found.", fix: "Once Found is TRUE, leave it TRUE. Do not undo the search result on later characters." },
  { wrong: "I wrote NewString <- Character inside the loop when removing spaces.", fix: "That overwrites earlier characters. Use NewString <- NewString & Character to append." },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "6 marks",
    prompt: "Trace an algorithm that counts the letter A in the string DATA. Show Index, Character and Count after each character is processed.",
    answer: "Index 1 Character D Count 0\nIndex 2 Character A Count 1\nIndex 3 Character T Count 1\nIndex 4 Character A Count 2",
    marking: [
      { mark: "B1", text: "uses positions 1 to 4 / processes each character in DATA" },
      { mark: "B1", text: "shows D with Count unchanged at 0" },
      { mark: "M1", text: "increments Count when first A is processed" },
      { mark: "B1", text: "shows T with Count unchanged" },
      { mark: "M1", text: "increments Count when second A is processed" },
      { mark: "A1", text: "final Count is 2" },
    ],
    strict: [
      "Do not award full marks for final count only when trace is required.",
      "Allow equivalent table layout.",
      "Do not accept counting lowercase/uppercase differently unless question specifies case sensitivity.",
      "Allow FT from the candidate's earlier trace value only when every subsequent step applies the stated algorithm correctly.",
    ],
  },
  {
    title: "Question 2",
    marks: "6 marks",
    prompt: "Write Cambridge-style pseudocode to input a string Word and output how many vowels A, E, I, O or U it contains. Assume uppercase input.",
    answer: "VowelCount <- 0\nFOR Index <- 1 TO LENGTH(Word)\n    Character <- character at position Index\n    IF Character = \"A\" OR Character = \"E\" OR Character = \"I\" OR Character = \"O\" OR Character = \"U\" THEN\n        VowelCount <- VowelCount + 1\n    ENDIF\nNEXT Index\nOUTPUT VowelCount",
    marking: [
      { mark: "B1", text: "initialises VowelCount / Count to 0" },
      { mark: "M1", text: "loops through every character of Word" },
      { mark: "M1", text: "extracts or clearly refers to the current character" },
      { mark: "M1", text: "tests current character against vowels" },
      { mark: "A1", text: "increments count only when vowel condition is true" },
      { mark: "B1", text: "outputs final count after the loop" },
    ],
    strict: [
      "Do not accept adding the character value to the count.",
      "Allow separate IF statements for each vowel if the count is correct.",
      "Do not penalise for omitting lowercase handling because uppercase input is stated.",
    ],
  },
  {
    title: "Question 3",
    marks: "6 marks",
    prompt: "An algorithm should output whether a password contains the character #. Describe a suitable algorithm using a flag.",
    answer: "Set Found <- FALSE. Loop through each character in the password. If the current character is #, set Found <- TRUE. After the loop, output Found or output a suitable message based on Found.",
    marking: [
      { mark: "B1", text: "initialises Found to FALSE" },
      { mark: "B1", text: "loops through each character of the password" },
      { mark: "B1", text: "compares current character with #" },
      { mark: "B1", text: "sets Found to TRUE when # is found" },
      { mark: "B1", text: "does not reset Found to FALSE after it has become TRUE" },
      { mark: "B1", text: "outputs result after processing / based on Found" },
    ],
    strict: [
      "Do not require early termination, but allow it if logically correct.",
      "Allow stores position instead of Boolean flag if presence is still determined.",
      "Do not award comparison mark for checking the whole string equals #.",
    ],
  },
  {
    title: "Question 4",
    marks: "6 marks",
    prompt: "Write pseudocode to create a new string from Text with all spaces removed.",
    answer: "NewString <- \"\"\nFOR Index <- 1 TO LENGTH(Text)\n    Character <- character at position Index\n    IF Character <> \" \" THEN\n        NewString <- NewString & Character\n    ENDIF\nNEXT Index\nOUTPUT NewString",
    marking: [
      { mark: "B1", text: "initialises NewString to empty string" },
      { mark: "M1", text: "loops through each character of Text" },
      { mark: "M1", text: "extracts or tests the current character" },
      { mark: "A1", text: "checks current character is not a space" },
      { mark: "A1", text: "appends non-space character to NewString without overwriting previous characters" },
      { mark: "B1", text: "outputs NewString after the loop" },
    ],
    strict: [
      "Do not award append mark for NewString <- Character because it overwrites previous output.",
      "Allow other clear concatenation notation if used consistently.",
      "Do not require handling tabs or punctuation unless stated.",
    ],
  },
  {
    title: "Question 5",
    marks: "4 marks",
    prompt: "Explain two common errors when translating a string algorithm from Java into Cambridge-style pseudocode.",
    answer: "One common error is copying Java 0-based indexing directly into a pseudocode trace that uses positions 1 to LENGTH(String), causing the first or last character to be missed. Another error is copying Java syntax such as braces, semicolons, charAt or ++ instead of using clear Cambridge-style assignment, loop and IF statements. These errors can make the algorithm harder to mark even if the idea is close.",
    marking: [
      { mark: "B1", text: "identifies Java 0-based indexing issue" },
      { mark: "B1", text: "explains it can miss or shift characters in the trace" },
      { mark: "B1", text: "identifies Java-only syntax issue" },
      { mark: "B1", text: "explains Cambridge-style pseudocode should use clear keywords / assignment" },
    ],
    strict: [
      "Do not require exact phrase 'Cambridge-style' if the distinction is clear.",
      "Allow examples such as charAt(0), braces, semicolons or ++.",
      "Do not award both errors for two examples of the same syntax issue.",
    ],
  },
];

function normalise(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ").replace(/[^a-z0-9#@\\[\\] <>+=.-]/g, "");
}

function tableMarkup(headers, rows) {
  return `
    <div class="result-table" style="--cols: ${headers.length}">
      <div class="table-row table-head">${headers.map((head) => `<div>${head}</div>`).join("")}</div>
      ${rows.map((row) => `<div class="table-row">${row.map((cell) => `<div>${cell}</div>`).join("")}</div>`).join("")}
    </div>
  `;
}

function setupPrint() {
  document.querySelector("#printBtn").addEventListener("click", () => window.print());
}

function setupHook() {
  const feedback = document.querySelector("#hookFeedback");
  const responses = {
    d: "Correct. In this 1-based pseudocode trace, position 1 of DATA is D.",
    a: "A appears at positions 2 and 4. The first character is D.",
    zero: "That is Java-style thinking. This pseudocode trace starts at position 1.",
    all: "String-processing algorithms usually inspect one character at a time when tracing.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = responses[button.dataset.hook];
    });
  });
}

function setupChooser() {
  const input = document.querySelector("#chooserInput");
  const result = document.querySelector("#chooserResult");
  document.querySelector("#chooserBtn").addEventListener("click", () => {
    const item = chooserMap[input.value];
    result.innerHTML = `<strong>${item.title}</strong><span>${item.detail}</span>`;
  });
}

function setupScanner() {
  const textInput = document.querySelector("#textInput");
  const operationInput = document.querySelector("#operationInput");
  const result = document.querySelector("#scanResult");
  document.querySelector("#scanBtn").addEventListener("click", () => {
    const trace = traceString(textInput.value, operationInput.value);
    result.innerHTML = `<p><strong>Text:</strong> "${textInput.value}"</p>${tableMarkup(trace.headers, trace.rows)}<p>${trace.note}</p>`;
  });
}

function renderExample(key) {
  const example = examples[key];
  document.querySelector("#exampleBox").innerHTML = `
    <h3>${example.title}</h3>
    <p><strong>Problem:</strong> ${example.problem}</p>
    ${tableMarkup(example.trace.headers, example.trace.rows)}
    <p>${example.trace.note}</p>
    <ul>${example.points.map((point) => `<li>${point}</li>`).join("")}</ul>
  `;
}

function setupExamples() {
  document.querySelectorAll("[data-example]").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll("[data-example]").forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");
      renderExample(tab.dataset.example);
    });
  });
  renderExample("count-a");
}

function setupPractice() {
  const list = document.querySelector("#practiceList");
  list.innerHTML = practice.map((item) => `
    <article class="practice-item">
      <p><strong>${item.id.toUpperCase()}.</strong> ${item.prompt}</p>
      <div class="practice-row">
        <input id="${item.id}" type="text" autocomplete="off" />
        <button class="primary-button" type="button" data-check="${item.id}">Check</button>
      </div>
      <div class="mark" id="${item.id}-mark" aria-live="polite"></div>
      <button class="answer-toggle" type="button" data-answer="${item.id}">Show answer</button>
      <div class="answer-panel" id="${item.id}-answer">${item.answer}</div>
    </article>
  `).join("");

  list.querySelectorAll("[data-check]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = practice.find((entry) => entry.id === button.dataset.check);
      const value = normalise(document.querySelector(`#${item.id}`).value);
      const accepted = item.accepted.map(normalise);
      const isCorrect = accepted.includes(value);
      const mark = document.querySelector(`#${item.id}-mark`);
      mark.textContent = isCorrect ? "Correct" : "Try again, then use Show answer.";
      mark.className = `mark ${isCorrect ? "correct" : "incorrect"}`;
    });
  });

  list.querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#${button.dataset.answer}-answer`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide answer" : "Show answer";
    });
  });
}

function setupMistakes() {
  const grid = document.querySelector("#mistakeGrid");
  grid.innerHTML = mistakes.map((item, index) => `
    <article>
      <p class="wrong"><strong>Mistake ${index + 1}:</strong> ${item.wrong}</p>
      <button class="answer-toggle" type="button" data-fix="${index}">Show correction</button>
      <div class="answer-panel" id="fix-${index}">${item.fix}</div>
    </article>
  `).join("");

  grid.querySelectorAll("[data-fix]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#fix-${button.dataset.fix}`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide correction" : "Show correction";
    });
  });
}

function setupExam() {
  const list = document.querySelector("#examList");
  list.innerHTML = examQuestions.map((question, index) => `
    <article class="exam-card">
      <div class="exam-head">
        <h3>${question.title}</h3>
        <span>${question.marks}</span>
      </div>
      <p>${question.prompt}</p>
      <button class="ms-toggle" type="button" data-ms="${index}">Show MS</button>
      <div class="ms-panel" id="ms-${index}">
        <p><strong>Indicative answer:</strong></p>
        <pre><code>${question.answer}</code></pre>
        <p><strong>Marking points:</strong></p>
        <ul>${question.marking.map((point) => `<li><strong>${point.mark}</strong> ${point.text}</li>`).join("")}</ul>
        <p><strong>Strict notes:</strong></p>
        <ul>${question.strict.map((note) => `<li>${note}</li>`).join("")}</ul>
      </div>
    </article>
  `).join("");

  list.querySelectorAll("[data-ms]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#ms-${button.dataset.ms}`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide MS" : "Show MS";
    });
  });
}

setupPrint();
setupHook();
setupChooser();
setupScanner();
setupExamples();
setupPractice();
setupMistakes();
setupExam();
