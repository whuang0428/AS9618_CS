const symbolMap = {
  start: {
    symbol: "Terminator",
    detail: "Use the start/end symbol for the beginning or end of an algorithm.",
  },
  input: {
    symbol: "Input/output",
    detail: "Inputting a mark is data entering the algorithm, so use the input/output symbol.",
  },
  calc: {
    symbol: "Process",
    detail: "An assignment or calculation such as Total <- Total + Mark uses a process box.",
  },
  decision: {
    symbol: "Decision",
    detail: "A condition with Yes/No outcomes uses a decision diamond.",
  },
  output: {
    symbol: "Input/output",
    detail: "Displaying a result is output, so use the input/output symbol.",
  },
};

const structureMap = {
  selection: {
    title: "Selection",
    code: "IF Mark >= 50 THEN\n    OUTPUT \"Pass\"\nELSE\n    OUTPUT \"Resit\"\nENDIF",
    reason: "The algorithm chooses one of two branches.",
  },
  for: {
    title: "Count-controlled iteration",
    code: "FOR Count <- 1 TO 5\n    INPUT Mark\nNEXT Count",
    reason: "The number of repetitions is known before the loop starts.",
  },
  while: {
    title: "Condition-controlled iteration",
    code: "INPUT Number\nWHILE Number <> -1\n    OUTPUT Number\n    INPUT Number\nENDWHILE",
    reason: "The loop continues until a condition changes.",
  },
  sequence: {
    title: "Sequence",
    code: "INPUT Length\nINPUT Width\nArea <- Length * Width\nOUTPUT Area",
    reason: "The steps happen in a fixed order with no branch or loop.",
  },
};

const converterPatterns = {
  pass: "INPUT Mark\nIF Mark >= 50 THEN\n    OUTPUT \"Pass\"\nELSE\n    OUTPUT \"Resit\"\nENDIF",
  valid: "INPUT Age\nIF Age >= 11 AND Age <= 18 THEN\n    OUTPUT \"Valid\"\nELSE\n    OUTPUT \"Invalid\"\nENDIF",
  total: "Total <- 0\nFOR Count <- 1 TO 5\n    INPUT Mark\n    Total <- Total + Mark\nNEXT Count\nOUTPUT Total",
  sentinel: "Total <- 0\nINPUT Number\nWHILE Number <> -1\n    Total <- Total + Number\n    INPUT Number\nENDWHILE\nOUTPUT Total",
};

const examples = {
  pass: {
    title: "Example 1: Pass/resit",
    problem: "Input a mark and output Pass if it is at least 50, otherwise output Resit.",
    flow: ["Terminator: START", "Input/output: INPUT Mark", "Decision: Mark >= 50?", "Yes branch: OUTPUT Pass", "No branch: OUTPUT Resit", "Terminator: END"],
    code: "INPUT Mark\nIF Mark >= 50 THEN\n    OUTPUT \"Pass\"\nELSE\n    OUTPUT \"Resit\"\nENDIF",
  },
  average: {
    title: "Example 2: Average of five marks",
    problem: "Input exactly five marks, calculate the average and output it.",
    flow: ["Process: Total <- 0", "Loop counter controls five repetitions", "Input/output: INPUT Mark", "Process: Total <- Total + Mark", "Process: Average <- Total / 5", "Input/output: OUTPUT Average"],
    code: "Total <- 0\nFOR Count <- 1 TO 5\n    INPUT Mark\n    Total <- Total + Mark\nNEXT Count\nAverage <- Total / 5\nOUTPUT Average",
  },
  sentinel: {
    title: "Example 3: Sentinel loop",
    problem: "Input numbers until -1 is entered, then output the total. Do not include -1.",
    flow: ["Process: Total <- 0", "Input/output: INPUT Number", "Decision: Number <> -1?", "Yes branch: add Number to Total and input again", "No branch: OUTPUT Total"],
    code: "Total <- 0\nINPUT Number\nWHILE Number <> -1\n    Total <- Total + Number\n    INPUT Number\nENDWHILE\nOUTPUT Total",
  },
  validation: {
    title: "Example 4: Age validation",
    problem: "Input an age and output Valid if it is from 11 to 18 inclusive.",
    flow: ["Input/output: INPUT Age", "Decision: Age >= 11 AND Age <= 18?", "Yes branch: OUTPUT Valid", "No branch: OUTPUT Invalid"],
    code: "INPUT Age\nIF Age >= 11 AND Age <= 18 THEN\n    OUTPUT \"Valid\"\nELSE\n    OUTPUT \"Invalid\"\nENDIF",
  },
};

const practice = [
  { id: "p1", prompt: "Which flowchart symbol is used for a yes/no condition?", accepted: ["decision", "diamond", "decision diamond"], answer: "Decision / diamond" },
  { id: "p2", prompt: "Which flowchart symbol is used for INPUT Mark?", accepted: ["input output", "input/output", "io", "parallelogram"], answer: "Input/output symbol, often drawn as a parallelogram." },
  { id: "p3", prompt: "Which pseudocode keyword displays a result?", accepted: ["output"], answer: "OUTPUT" },
  { id: "p4", prompt: "Which keyword closes an IF structure in Cambridge-style pseudocode?", accepted: ["endif", "end if"], answer: "ENDIF" },
  { id: "p5", prompt: "Which structure is used when exactly five values are input?", accepted: ["for", "for loop", "count controlled loop", "count-controlled iteration"], answer: "A count-controlled loop such as FOR...TO...NEXT." },
  { id: "p6", prompt: "Should Java braces be used as the expected Paper 2 pseudocode format? yes or no.", accepted: ["no"], answer: "No. Use Cambridge-style pseudocode." },
  { id: "p7", prompt: "In a flowchart decision, what labels should usually appear on outgoing branches?", accepted: ["yes no", "yes/no", "true false", "true/false"], answer: "Yes/No or True/False." },
  { id: "p8", prompt: "Which symbol is used for Total <- Total + Mark?", accepted: ["process", "process box", "rectangle"], answer: "Process box / rectangle." },
  { id: "p9", prompt: "What indentation shows in pseudocode?", accepted: ["block structure", "which statements are inside", "inside branch", "inside loop", "scope"], answer: "Indentation shows which statements belong inside a branch or loop." },
  { id: "p10", prompt: "Which term describes the arrows showing the next step in a flowchart?", accepted: ["flow line", "flow lines", "arrow", "arrows"], answer: "Flow lines / arrows." },
];

const mistakes = [
  {
    wrong: "I used a process rectangle for Mark >= 50?",
    fix: "Use a decision diamond for a condition with alternative branches.",
  },
  {
    wrong: "My IF statement has ELSE but no ENDIF.",
    fix: "Close the structure with ENDIF so the branch boundaries are clear.",
  },
  {
    wrong: "I used System.out.println in my exam pseudocode answer.",
    fix: "Use OUTPUT in Cambridge-style pseudocode. Java syntax is only support for implementation practice.",
  },
  {
    wrong: "My flowchart decision has two arrows but no Yes/No labels.",
    fix: "Label the outgoing branches so the condition outcomes are unambiguous.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "5 marks",
    prompt: "Name the correct flowchart symbol for each step: start the algorithm, input a mark, calculate Total <- Total + Mark, test Mark >= 50, output Pass.",
    answer: "Start uses a terminator. Input a mark uses an input/output symbol. Total <- Total + Mark uses a process symbol. Mark >= 50 uses a decision symbol. Output Pass uses an input/output symbol.",
    marking: [
      { mark: "B1", text: "start/end identified as terminator" },
      { mark: "B1", text: "input mark identified as input/output" },
      { mark: "B1", text: "calculation/assignment identified as process" },
      { mark: "B1", text: "condition identified as decision" },
      { mark: "B1", text: "output identified as input/output" },
    ],
    strict: [
      "Do not accept process symbol for a condition.",
      "Allow common shape names such as oval for terminator, parallelogram for input/output, rectangle for process and diamond for decision.",
      "Do not require drawn symbols if names are clear.",
    ],
  },
  {
    title: "Question 2",
    marks: "6 marks",
    prompt: "Write Cambridge-style pseudocode to input Age and output Valid if Age is from 11 to 18 inclusive, otherwise output Invalid.",
    answer: "INPUT Age\nIF Age >= 11 AND Age <= 18 THEN\n    OUTPUT \"Valid\"\nELSE\n    OUTPUT \"Invalid\"\nENDIF",
    marking: [
      { mark: "B1", text: "inputs Age" },
      { mark: "M1", text: "uses IF with lower bound Age >= 11" },
      { mark: "M1", text: "uses upper bound Age <= 18 with AND / both conditions required" },
      { mark: "A1", text: "outputs Valid on true branch" },
      { mark: "A1", text: "outputs Invalid on false branch" },
      { mark: "B1", text: "uses clear Cambridge-style structure such as IF/THEN/ELSE/ENDIF" },
    ],
    strict: [
      "Do not award upper-bound method mark for OR in this range check.",
      "Allow equivalent inclusive comparisons such as Age > 10 AND Age < 19 if integer age is clear.",
      "Do not award final style mark for Java-only syntax.",
    ],
  },
  {
    title: "Question 3",
    marks: "6 marks",
    prompt: "A flowchart inputs exactly five marks and outputs their total. Describe the pseudocode structure needed and write a suitable outline.",
    answer: "A count-controlled loop is suitable because exactly five marks are input. Total should be initialised to 0 before the loop. The loop inputs a Mark and adds it to Total five times, then outputs Total.\n\nTotal <- 0\nFOR Count <- 1 TO 5\n    INPUT Mark\n    Total <- Total + Mark\nNEXT Count\nOUTPUT Total",
    marking: [
      { mark: "B1", text: "identifies count-controlled loop / FOR loop" },
      { mark: "B1", text: "initialises Total to 0 before the loop" },
      { mark: "M1", text: "loop repeats five times" },
      { mark: "M1", text: "inputs Mark inside the loop" },
      { mark: "M1", text: "updates Total inside the loop" },
      { mark: "A1", text: "outputs Total after the loop" },
    ],
    strict: [
      "Do not award full credit if Total is initialised inside the loop.",
      "Allow REPEAT/WHILE if it clearly processes exactly five marks using a counter.",
      "Do not require exact variable names.",
    ],
  },
  {
    title: "Question 4",
    marks: "4 marks",
    prompt: "Explain two differences between a flowchart and pseudocode when representing the same algorithm.",
    answer: "A flowchart is a visual representation using symbols and flow lines, while pseudocode is a structured text representation using keywords. A flowchart shows decisions with a decision symbol and labelled branches, while pseudocode shows the same logic using IF, THEN, ELSE and ENDIF. Both can represent the same sequence, selection and iteration.",
    marking: [
      { mark: "B1", text: "states flowchart is visual/uses symbols" },
      { mark: "B1", text: "states pseudocode is structured text/uses keywords" },
      { mark: "B1", text: "flowchart decisions use a decision symbol with labelled branches" },
      { mark: "B1", text: "pseudocode decisions use keywords such as IF...THEN...ELSE...ENDIF" },
    ],
    strict: [
      "Do not accept that one form changes the algorithm result.",
      "Allow discussion of loops if comparison is accurate.",
      "Do not award marks for vague claims such as 'flowcharts are easier' without a representational difference.",
    ],
  },
  {
    title: "Question 5",
    marks: "5 marks",
    prompt: "A student writes Java code with braces and semicolons as an answer to a Cambridge pseudocode question. Explain why this may lose marks and give three Cambridge-style conventions that should be used instead.",
    answer: "Cambridge Paper 2 expects Cambridge-style pseudocode, so Java-only syntax may not match the required notation. Instead, use INPUT for data entry and OUTPUT for display. Use IF condition THEN, ELSE and ENDIF for selection. Use FOR...TO...NEXT or WHILE...ENDWHILE for iteration and indent statements inside branches or loops.",
    marking: [
      { mark: "B1", text: "states Cambridge-style pseudocode is expected" },
      { mark: "B1", text: "identifies Java-only syntax such as braces/semicolons/System.out.println as unsuitable" },
      { mark: "B1", text: "gives one valid convention such as INPUT/OUTPUT" },
      { mark: "B1", text: "gives a second distinct convention such as IF...THEN...ELSE...ENDIF" },
      { mark: "B1", text: "gives a third distinct convention such as FOR...NEXT, WHILE...ENDWHILE or assignment arrow" },
    ],
    strict: [
      "Do not award convention marks for Java syntax examples.",
      "Allow assignment arrow and meaningful identifiers as additional valid Cambridge-style conventions.",
      "Do not say Java is useless; it may support implementation but is not the expected exam pseudocode notation.",
    ],
  },
];

function normalise(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ").replace(/[^a-z0-9/ -]/g, "");
}

function setupPrint() {
  document.querySelector("#printBtn").addEventListener("click", () => window.print());
}

function setupHook() {
  const feedback = document.querySelector("#hookFeedback");
  const responses = {
    start: "Terminator. START and END mark the boundaries of the algorithm.",
    input: "Input/output. The drink code is data entering the algorithm.",
    decision: "Decision. This is a condition with different outcomes.",
    output: "Input/output. Displaying a message is output.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = responses[button.dataset.hook];
    });
  });
}

function setupSymbolTool() {
  const input = document.querySelector("#symbolInput");
  const result = document.querySelector("#symbolResult");
  document.querySelector("#symbolBtn").addEventListener("click", () => {
    const item = symbolMap[input.value];
    result.innerHTML = `<strong>${item.symbol}</strong><span>${item.detail}</span>`;
  });
}

function setupStructureTool() {
  const input = document.querySelector("#structureInput");
  const result = document.querySelector("#structureResult");
  document.querySelector("#structureBtn").addEventListener("click", () => {
    const item = structureMap[input.value];
    result.innerHTML = `
      <strong>${item.title}</strong>
      <span>${item.reason}</span>
      <pre><code>${item.code}</code></pre>
    `;
  });
}

function setupConverter() {
  const input = document.querySelector("#patternInput");
  const result = document.querySelector("#convertResult");
  document.querySelector("#convertBtn").addEventListener("click", () => {
    result.innerHTML = `<pre><code>${converterPatterns[input.value]}</code></pre>`;
  });
}

function renderExample(key) {
  const example = examples[key];
  document.querySelector("#exampleBox").innerHTML = `
    <h3>${example.title}</h3>
    <p><strong>Problem:</strong> ${example.problem}</p>
    <p><strong>Flowchart plan:</strong></p>
    <ol>${example.flow.map((step) => `<li>${step}</li>`).join("")}</ol>
    <p><strong>Cambridge-style pseudocode:</strong></p>
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
  renderExample("pass");
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
setupSymbolTool();
setupStructureTool();
setupConverter();
setupExamples();
setupPractice();
setupMistakes();
setupExam();
