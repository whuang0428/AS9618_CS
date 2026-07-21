const hookResponses = {
  topic: "Error type: topic gap. Repair by identifying the correct concept before rewriting.",
  command: "Error type: command error. Repair by adding the missing judgement required by evaluate/discuss.",
  method: "Error type: method error. Repair by writing the correct formula, trace or SQL skeleton.",
  wording: "Error type: wording issue. Repair by adding mechanism and consequence.",
};

const scoreMap = {
  high: {
    priority: "Precision repair",
    action: "Focus on strict wording, units, command words and scenario links. Small wording changes can recover many marks.",
  },
  middle: {
    priority: "Pattern repair",
    action: "Sort lost marks by section and flaw. Target the two largest patterns before doing more full papers.",
  },
  low: {
    priority: "Core knowledge rebuild",
    action: "Relearn high-frequency basics first: units, network terms, CPU registers, OS/translators, security controls and SQL clauses.",
  },
  timing: {
    priority: "Pacing repair",
    action: "Practise mark-per-minute drills. Flag unknowns early and stop over-writing low-mark questions.",
  },
};

const errorMap = {
  unit: {
    type: "Wording / unit issue",
    repair: "Add the unit and working: for example, 480000 bytes or bits, with conversion shown.",
  },
  compare: {
    type: "Command error",
    repair: "Use a paired contrast: a compiler translates the whole program before execution, whereas an interpreter translates and executes one statement at a time.",
  },
  security: {
    type: "Overclaim / mechanism issue",
    repair: "A firewall filters traffic using rules such as IP address, port or protocol; it cannot stop all hacking or remove malware already installed.",
  },
  sql: {
    type: "SQL method issue",
    repair: "Use SELECT Category, COUNT(*) FROM Book GROUP BY Category; do not use SELECT * for an aggregate summary.",
  },
  ethics: {
    type: "One-sided evaluation",
    repair: "Add privacy concern, safeguards and judgement: surveillance may help safety, but it is justified only if proportionate and controlled.",
  },
};

const rewriteMap = {
  mechanism: {
    encryption: "Encryption encodes data so it is unreadable without the correct key.",
    cache: "Cache stores frequently used data and instructions close to the CPU, reducing slower RAM access.",
    sql: "GROUP BY forms one group for each category so an aggregate such as COUNT can be calculated per group.",
    ethics: "The decision affects stakeholders differently, so both benefit and harm must be explained.",
  },
  context: {
    encryption: "For student records, encryption reduces the impact if data is intercepted on the school network.",
    cache: "For repeated operations on a student tablet, cache may reduce access time for reused instructions.",
    sql: "For the library database, grouping by Category outputs one count for each book category.",
    ethics: "For a school, the judgement must consider students, staff, parents and safeguarding purpose.",
  },
  unit: {
    encryption: "No unit needed; instead check whether the answer names confidentiality or readability.",
    cache: "No unit needed; instead check whether cache is distinguished from RAM.",
    sql: "No unit needed; instead check whether field names and clauses match the requested output.",
    ethics: "No unit needed; instead check whether the final judgement is conditional.",
  },
  judgement: {
    encryption: "Encryption is suitable for confidentiality, but it does not authenticate users by itself.",
    cache: "A larger cache may improve performance only when the program reuses data or instructions.",
    sql: "The query is suitable only if the table and field names match the schema given in the question.",
    ethics: "The decision is justified only if the benefit is proportionate and safeguards are enforced.",
  },
};

const examples = {
  calc: {
    title: "Example 1: Calculation repair",
    problem: "Weak answer: 480000",
    steps: [
      "Diagnosis: missing unit and working, so method marks are not visible.",
      "Repair: write formula, substitute values and convert units.",
      "Corrected model: 800 x 600 x 8 = 3 840 000 bits; 3 840 000 / 8 = 480 000 bytes.",
      "Mark evidence: M1 formula, M1 substitution, A1 bit total, A1 byte conversion/unit.",
    ],
  },
  compare: {
    title: "Example 2: Compare repair",
    problem: "Weak answer: A compiler translates code. An interpreter translates code.",
    steps: [
      "Diagnosis: no paired contrast.",
      "Repair: use whereas and mention both items in one sentence.",
      "Corrected model: A compiler translates the whole program before execution, whereas an interpreter translates and executes one statement at a time.",
      "Mark evidence: B1 compiler, B1 interpreter, A1 comparison wording.",
    ],
  },
  security: {
    title: "Example 3: Security repair",
    problem: "Weak answer: Use a firewall because it stops all hacking.",
    steps: [
      "Diagnosis: overclaim and missing mechanism.",
      "Repair: state what a firewall actually does and one limitation.",
      "Corrected model: A firewall filters incoming and outgoing traffic using rules such as IP address, port or protocol, but it cannot stop a user giving away a password in phishing.",
      "Mark evidence: B1 filtering, M1 rules, A1 limitation.",
    ],
  },
  ethics: {
    title: "Example 4: Evaluation repair",
    problem: "Weak answer: Surveillance is good because it catches criminals.",
    steps: [
      "Diagnosis: one-sided evaluation.",
      "Repair: add stakeholder, concern, safeguard and judgement.",
      "Corrected model: Surveillance may improve public safety, but it reduces privacy for people being monitored; it is justified only if use is transparent, limited and proportionate.",
      "Mark evidence: benefit, concern, safeguard/condition and judgement.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "What term means sorting lost marks by cause?", accepted: ["diagnosis", "diagnose"], answer: "Diagnosis" },
  { id: "p2", prompt: "Which missing item often loses calculation final-answer marks?", accepted: ["unit", "units"], answer: "Unit / units" },
  { id: "p3", prompt: "What must a compare answer include?", accepted: ["paired contrast", "contrast", "paired difference", "difference"], answer: "Paired contrast" },
  { id: "p4", prompt: "Which answer flaw uses words like secure or efficient without saying how?", accepted: ["vague wording", "wording issue", "vague"], answer: "Vague wording / wording issue" },
  { id: "p5", prompt: "Which command word usually needs a final supported conclusion?", accepted: ["evaluate", "discuss", "justify"], answer: "Evaluate / discuss / justify" },
  { id: "p6", prompt: "Which SQL function counts records?", accepted: ["count", "count(*)", "count()"], answer: "COUNT" },
  { id: "p7", prompt: "Which section includes authentication, encryption and firewalls?", accepted: ["section 6", "6"], answer: "Section 6" },
  { id: "p8", prompt: "What mark label often rewards mechanism or method?", accepted: ["m", "m mark", "method mark"], answer: "M mark" },
  { id: "p9", prompt: "What should you do after rewriting a lost answer?", accepted: ["retry", "drill", "practice", "answer similar question"], answer: "Retry a similar question / drill" },
  { id: "p10", prompt: "Which Paper starts after this Paper 1 review block?", accepted: ["paper 2", "2"], answer: "Paper 2" },
];

const mistakes = [
  {
    wrong: "I only wrote down the mock score and moved on.",
    fix: "Classify lost marks by section and error type. The score is less useful than the pattern.",
  },
  {
    wrong: "I copied the mark scheme answer without rewriting my own answer.",
    fix: "Rewrite the answer in your own exam wording, then label the B/M/A evidence.",
  },
  {
    wrong: "I wrote 'revise networking' as my action plan.",
    fix: "Make it specific: redo packet header questions, protocol matching and one WAN/LAN comparison under 12 minutes.",
  },
  {
    wrong: "I decided I am bad at Paper 1 because of one mock.",
    fix: "Separate knowledge gaps from timing and wording issues. Each needs a different repair method.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "5 marks",
    prompt: "A student calculated an image file size and wrote only '960000'. Explain how to improve this answer for a Cambridge-style mark scheme.",
    answer: "The student should show the formula width x height x colour depth, substitute the values, state the bit total if relevant, divide by 8 to convert bits to bytes, and include the final unit such as bytes. This makes method marks visible and avoids losing the final mark for missing units.",
    marking: [
      { mark: "B1", text: "states formula or need to show method" },
      { mark: "B1", text: "substitution/working should be shown" },
      { mark: "B1", text: "identifies bit-to-byte conversion / divide by 8" },
      { mark: "B1", text: "final answer needs suitable unit" },
      { mark: "B1", text: "explains why this protects method/final marks" },
    ],
    strict: [
      "Do not award full credit for 'write more working' without specifying what working.",
      "Do not require a specific image size because values are not given.",
    ],
  },
  {
    title: "Question 2",
    marks: "4 marks",
    prompt: "A mock answer says: 'A compiler translates code. An interpreter translates code.' Rewrite this as a mark-worthy comparison.",
    answer: "A compiler translates the whole source program into object code before execution, whereas an interpreter translates and executes one statement at a time. A compiled program can run without being translated each time, whereas interpreted code normally needs the interpreter at run time. An interpreter can help debugging because errors are found as statements execute.",
    marking: [
      { mark: "B1", text: "compiler translates whole program/source before execution" },
      { mark: "B1", text: "interpreter translates/executes statement by statement" },
      { mark: "B1", text: "compiled program/object code can run without retranslation" },
      { mark: "B1", text: "interpreter needs interpreter at run time or helps debugging" },
    ],
    strict: [
      "Do not accept assembler as either compiler or interpreter.",
      "Allow line by line for statement by statement.",
      "Do not award both comparison marks for two separate non-contrasted descriptions.",
    ],
  },
  {
    title: "Question 3",
    marks: "6 marks",
    prompt: "A student lost marks by writing: 'Use security to protect records.' Rewrite the answer using three specific controls for a school records system.",
    answer: "Authentication such as MFA checks user identity before access, reducing unauthorised logins. Access rights restrict student records to staff who need them, reducing unauthorised viewing or editing. Encryption encodes stored or transmitted records so intercepted or stolen data is unreadable without the correct key.",
    marking: [
      { mark: "B1", text: "names authentication/MFA or another valid control" },
      { mark: "B1", text: "explains mechanism/consequence in school records context" },
      { mark: "B1", text: "names second valid control such as access rights" },
      { mark: "B1", text: "explains mechanism/consequence of second control" },
      { mark: "B1", text: "names third valid control such as encryption/backup/firewall" },
      { mark: "B1", text: "explains mechanism/consequence of third control" },
    ],
    strict: [
      "Do not award credit for repeating 'security' as a control.",
      "Allow backup for availability/data recovery if mechanism is clear.",
      "Do not count the same control twice.",
    ],
  },
  {
    title: "Question 4",
    marks: "5 marks",
    prompt: "A student wrote: SELECT * FROM Book GROUP BY Category. The task was to output each Category and the number of books in that category. Correct the SQL and explain the error.",
    answer: "The corrected query is SELECT Category, COUNT(*) FROM Book GROUP BY Category; The original SELECT * is wrong because a grouped summary should output the grouped field and aggregate result, not every field. COUNT(*) counts records in each category, and GROUP BY Category forms one group for each category.",
    marking: [
      { mark: "B1", text: "SELECT Category" },
      { mark: "B1", text: "uses COUNT(*) or valid count aggregate" },
      { mark: "B1", text: "FROM Book" },
      { mark: "M1", text: "GROUP BY Category" },
      { mark: "A1", text: "explains why SELECT * is unsuitable / grouped aggregate needs group field and aggregate" },
    ],
    strict: [
      "Do not accept ORDER BY instead of GROUP BY.",
      "Allow COUNT(BookID).",
      "Do not accept SUM(Copies) because number of books is requested.",
    ],
  },
  {
    title: "Question 5",
    marks: "7 marks",
    prompt: "A mock answer says: 'Surveillance cameras are good because they catch criminals.' Rewrite it as a balanced evaluation for public facial recognition.",
    answer: "Public facial recognition may improve safety by helping identify suspects or missing people quickly. However, it can reduce privacy because people may be monitored without meaningful consent, and biometric data could be misused or retained too long. It may also be unfair if recognition accuracy differs between groups. The system is justified only if the purpose is clear, use is transparent, access is restricted, retention is limited and the safety benefit is proportionate to the privacy risk.",
    marking: [
      { mark: "B1", text: "identifies valid benefit such as safety/crime prevention/finding missing people" },
      { mark: "B1", text: "applies benefit to public facial recognition" },
      { mark: "B1", text: "identifies privacy/surveillance/consent concern" },
      { mark: "B1", text: "explains privacy consequence such as monitoring/misuse/retention" },
      { mark: "B1", text: "identifies fairness/accuracy/biometric data concern or similar" },
      { mark: "B1", text: "gives safeguard such as transparency, access control or retention limit" },
      { mark: "B1", text: "reaches a conclusion using crime-prevention evidence, surveillance/false-match risk and limits on purpose, access or retention" },
    ],
    strict: [
      "Do not award full credit for one-sided safety-only answers.",
      "Allow data protection wording if privacy issue is clear.",
      "Do not require a named law.",
    ],
  },
];

function normalise(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ").replace(/ ;$/, ";");
}

function setupPrint() {
  document.querySelector("#printBtn").addEventListener("click", () => window.print());
}

function setupHook() {
  const feedback = document.querySelector("#hookFeedback");
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = hookResponses[button.dataset.hook];
    });
  });
}

function setupScore() {
  const input = document.querySelector("#scoreInput");
  const result = document.querySelector("#scoreResult");
  document.querySelector("#scoreBtn").addEventListener("click", () => {
    const item = scoreMap[input.value];
    result.innerHTML = `<strong>${item.priority}</strong><br />${item.action}`;
  });
}

function setupError() {
  const input = document.querySelector("#errorInput");
  const result = document.querySelector("#errorResult");
  document.querySelector("#errorBtn").addEventListener("click", () => {
    const item = errorMap[input.value];
    result.innerHTML = `<strong>${item.type}</strong><br />${item.repair}`;
  });
}

function setupRewrite() {
  const focus = document.querySelector("#focusInput");
  const topic = document.querySelector("#topicInput");
  const result = document.querySelector("#rewriteResult");
  document.querySelector("#rewriteBtn").addEventListener("click", () => {
    result.innerHTML = `<strong>Repair model:</strong> ${rewriteMap[focus.value][topic.value]}`;
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
  renderExample("calc");
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
          <p class="wrong"><strong>Weak review ${index + 1}:</strong> ${item.wrong}</p>
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
  setupScore();
  setupError();
  setupRewrite();
  setupExamples();
  renderPractice();
  renderMistakes();
  renderExamQuestions();
}

init();
