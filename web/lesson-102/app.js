const classifierMap = {
  area: {
    title: "Sequence",
    detail: "The steps happen once in a fixed order: input, calculate, output.",
  },
  pass: {
    title: "Selection",
    detail: "A condition chooses between Pass and Resit.",
  },
  five: {
    title: "Count-controlled iteration",
    detail: "Exactly five values are processed, so a FOR loop is suitable.",
  },
  sentinel: {
    title: "Condition-controlled iteration",
    detail: "The loop continues until the sentinel value -1 is entered.",
  },
  countpass: {
    title: "Iteration with nested selection",
    detail: "The algorithm repeats for ten marks and uses IF inside the loop to count passes.",
  },
};

const builderMap = {
  area: "INPUT Length\nINPUT Width\nArea <- Length * Width\nOUTPUT Area",
  pass: "INPUT Mark\nIF Mark >= 50 THEN\n    OUTPUT \"Pass\"\nELSE\n    OUTPUT \"Resit\"\nENDIF",
  total5: "Total <- 0\nFOR Count <- 1 TO 5\n    INPUT Mark\n    Total <- Total + Mark\nNEXT Count\nOUTPUT Total",
  passcount: "PassCount <- 0\nFOR Count <- 1 TO 5\n    INPUT Mark\n    IF Mark >= 50 THEN\n        PassCount <- PassCount + 1\n    ENDIF\nNEXT Count\nOUTPUT PassCount",
};

const examples = {
  sequence: {
    title: "Example 1: Sequence",
    problem: "Calculate the area of a rectangle.",
    structure: "Sequence only: every step happens once in order.",
    code: builderMap.area,
  },
  selection: {
    title: "Example 2: Selection",
    problem: "Output Pass if Mark is at least 50, otherwise Resit.",
    structure: "Selection: IF chooses one branch.",
    code: builderMap.pass,
  },
  iteration: {
    title: "Example 3: Iteration",
    problem: "Input exactly five marks and output the total.",
    structure: "Count-controlled iteration: FOR loop repeats exactly five times.",
    code: builderMap.total5,
  },
  combined: {
    title: "Example 4: Iteration with selection",
    problem: "Input five marks and count how many are at least 50.",
    structure: "Sequence initialises PassCount, FOR repeats input, IF decides whether to increment.",
    code: builderMap.passcount,
  },
};

const practice = [
  { id: "p1", prompt: "Which structure runs steps once in a fixed order?", accepted: ["sequence"], answer: "Sequence" },
  { id: "p2", prompt: "Which structure chooses between actions using a condition?", accepted: ["selection", "if"], answer: "Selection / IF" },
  { id: "p3", prompt: "Which structure repeats steps?", accepted: ["iteration", "loop", "repetition"], answer: "Iteration / loop" },
  { id: "p4", prompt: "Exactly five marks are input. Which loop type is most suitable?", accepted: ["count controlled", "count-controlled", "for", "for loop", "count controlled loop"], answer: "Count-controlled loop / FOR loop" },
  { id: "p5", prompt: "Input continues until -1 is entered. Which loop type is suitable?", accepted: ["condition controlled", "condition-controlled", "while", "while loop", "condition controlled loop"], answer: "Condition-controlled loop / WHILE loop" },
  { id: "p6", prompt: "Which Cambridge keyword starts a selection statement?", accepted: ["if"], answer: "IF" },
  { id: "p7", prompt: "Which Cambridge keyword closes an IF structure?", accepted: ["endif", "end if"], answer: "ENDIF" },
  { id: "p8", prompt: "When an IF is inside a FOR loop, what is the IF called?", accepted: ["nested", "nested selection", "selection nested inside iteration"], answer: "Nested selection / IF inside iteration" },
  { id: "p9", prompt: "Should Java braces be used in the expected Paper 2 pseudocode answer? yes or no.", accepted: ["no"], answer: "No. Use Cambridge-style pseudocode." },
  { id: "p10", prompt: "Name the three basic control structures in this lesson.", accepted: ["sequence selection iteration", "sequence, selection, iteration"], answer: "Sequence, selection and iteration." },
];

const mistakes = [
  {
    wrong: "I used a loop for Length, Width and Area even though each step happens once.",
    fix: "Use sequence. A loop is only needed when steps repeat.",
  },
  {
    wrong: "I wrote Pass and Resit one after the other with no IF.",
    fix: "Use selection. The condition determines which output should happen.",
  },
  {
    wrong: "I used WHILE for exactly five marks but forgot to update Count.",
    fix: "Use a FOR loop for a known count, or update the counter clearly if using WHILE.",
  },
  {
    wrong: "I placed PassCount <- 0 inside the loop.",
    fix: "Initialise PassCount before the loop. Otherwise it resets every iteration.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "5 marks",
    prompt: "Identify whether each task mainly uses sequence, selection or iteration: calculate area from length and width; output Pass/Resit from a mark; input ten scores; input values until -1; count passes from ten marks.",
    answer: "Calculate area uses sequence. Pass/Resit uses selection. Input ten scores uses count-controlled iteration. Input until -1 uses condition-controlled iteration. Count passes from ten marks uses iteration with selection inside the loop.",
    marking: [
      { mark: "B1", text: "area calculation identified as sequence" },
      { mark: "B1", text: "Pass/Resit identified as selection" },
      { mark: "B1", text: "ten scores identified as count-controlled iteration" },
      { mark: "B1", text: "until -1 identified as condition-controlled iteration" },
      { mark: "B1", text: "count passes identified as iteration with selection / nested IF" },
    ],
    strict: [
      "Do not accept iteration for area unless repeated calculations are stated.",
      "Allow loop for iteration.",
      "Do not require the word nested if the combined structure is clear.",
    ],
  },
  {
    title: "Question 2",
    marks: "6 marks",
    prompt: "Write Cambridge-style pseudocode to input a Mark and output Pass if Mark is at least 50, otherwise output Resit. State the control structure used.",
    answer: "INPUT Mark\nIF Mark >= 50 THEN\n    OUTPUT \"Pass\"\nELSE\n    OUTPUT \"Resit\"\nENDIF\n\nThe control structure is selection.",
    marking: [
      { mark: "B1", text: "inputs Mark" },
      { mark: "M1", text: "uses IF with condition Mark >= 50 or equivalent" },
      { mark: "A1", text: "outputs Pass on true branch" },
      { mark: "A1", text: "outputs Resit on false branch" },
      { mark: "B1", text: "uses clear Cambridge-style IF/THEN/ELSE/ENDIF structure" },
      { mark: "B1", text: "identifies structure as selection" },
    ],
    strict: [
      "Do not award style mark for Java-only syntax.",
      "Allow Mark > 49 if integer marks are implied.",
      "Do not require exact output wording if meaning is equivalent.",
    ],
  },
  {
    title: "Question 3",
    marks: "6 marks",
    prompt: "Write Cambridge-style pseudocode to input exactly five marks and output their total. State why iteration is suitable.",
    answer: "Total <- 0\nFOR Count <- 1 TO 5\n    INPUT Mark\n    Total <- Total + Mark\nNEXT Count\nOUTPUT Total\n\nIteration is suitable because the same input-and-add steps are repeated exactly five times.",
    marking: [
      { mark: "B1", text: "initialises Total to 0 before the loop" },
      { mark: "M1", text: "uses a loop that repeats five times" },
      { mark: "M1", text: "inputs Mark inside the loop" },
      { mark: "M1", text: "adds Mark to Total inside the loop" },
      { mark: "A1", text: "outputs Total after the loop" },
      { mark: "B1", text: "explains iteration is suitable because steps repeat / known count" },
    ],
    strict: [
      "Do not award full credit if Total is reset inside the loop.",
      "Allow WHILE with a correctly updated counter.",
      "Do not require exact variable names.",
    ],
  },
  {
    title: "Question 4",
    marks: "5 marks",
    prompt: "A program inputs five marks and counts how many are at least 50. Explain how sequence, selection and iteration are all used.",
    answer: "Sequence is used to initialise PassCount before the loop and to output the final count after the loop. Iteration is used because five marks are input and processed using repeated steps. Selection is used inside the loop to test whether each Mark is at least 50; if true, PassCount is increased.",
    marking: [
      { mark: "B1", text: "identifies initialisation/output as sequence" },
      { mark: "B1", text: "identifies repeated processing of five marks as iteration" },
      { mark: "B1", text: "identifies Mark >= 50 test as selection" },
      { mark: "B1", text: "explains selection occurs inside the loop" },
      { mark: "B1", text: "explains PassCount is updated only when condition is true" },
    ],
    strict: [
      "Do not accept generic definitions only; answer must refer to this problem.",
      "Allow CountPasses or similar variable names.",
      "Do not require full pseudocode.",
    ],
  },
  {
    title: "Question 5",
    marks: "5 marks",
    prompt: "A student uses WHILE for a known five-repetition task and forgets to update Count. Explain the likely error and give a safer structure.",
    answer: "If Count is not updated in a WHILE loop, the loop condition may never become false, causing an infinite loop or incorrect number of repetitions. Since exactly five repetitions are required, a FOR Count <- 1 TO 5 ... NEXT Count loop is safer and clearer.",
    marking: [
      { mark: "B1", text: "identifies missing Count update" },
      { mark: "B1", text: "explains condition may never become false / infinite loop risk" },
      { mark: "B1", text: "recognises five repetitions are known in advance" },
      { mark: "B1", text: "suggests FOR loop / count-controlled loop" },
      { mark: "B1", text: "gives clear Cambridge-style FOR...TO...NEXT idea" },
    ],
    strict: [
      "Do not accept only 'WHILE is wrong' without explanation.",
      "Allow WHILE as a possible solution if Count is correctly updated, but safer structure must be count-controlled.",
      "Do not require complete pseudocode.",
    ],
  },
];

function normalise(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ").replace(/[^a-z0-9, -]/g, "");
}

function setupPrint() {
  document.querySelector("#printBtn").addEventListener("click", () => window.print());
}

function setupHook() {
  const feedback = document.querySelector("#hookFeedback");
  const responses = {
    sequence: "Sequence. These steps happen once in order.",
    selection: "Selection. IF chooses whether the toasting step happens.",
    iteration: "Iteration. The same steps repeat for each order.",
    bad: "Trap. Importance is not a reason for WHILE. Repetition needs a real stopping rule.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = responses[button.dataset.hook];
    });
  });
}

function setupClassifier() {
  const input = document.querySelector("#classifierInput");
  const result = document.querySelector("#classifyResult");
  document.querySelector("#classifyBtn").addEventListener("click", () => {
    const item = classifierMap[input.value];
    result.innerHTML = `<strong>${item.title}</strong><span>${item.detail}</span>`;
  });
}

function setupBuilder() {
  const input = document.querySelector("#builderInput");
  const result = document.querySelector("#builderResult");
  document.querySelector("#buildBtn").addEventListener("click", () => {
    result.innerHTML = `<pre><code>${builderMap[input.value]}</code></pre>`;
  });
}

function renderExample(key) {
  const example = examples[key];
  document.querySelector("#exampleBox").innerHTML = `
    <h3>${example.title}</h3>
    <p><strong>Problem:</strong> ${example.problem}</p>
    <p><strong>Structure:</strong> ${example.structure}</p>
    <pre><code>${example.code}</code></pre>
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
  renderExample("sequence");
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
        <p><strong>Mark scheme:</strong></p>
        <ul>${question.marking.map((point) => `<li><strong>${point.mark}</strong> ${point.text}</li>`).join("")}</ul>
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
setupClassifier();
setupBuilder();
setupExamples();
setupPractice();
setupMistakes();
setupExam();
