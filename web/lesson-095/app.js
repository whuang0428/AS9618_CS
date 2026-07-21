const hookResponses = {
  one: "Expected depth: one precise sentence. Example: A primary key uniquely identifies each record in a table.",
  two: "Expected depth: two linked points. Example: Cache stores frequently used data close to the CPU, so repeated access is faster than using RAM.",
  four: "Expected depth: paired contrasts. Give at least two clear differences, not two separate mini-essays.",
  six: "Expected depth: short plan, then benefit, concern, safeguard and judgement with context.",
};

const planMap = {
  1: {
    time: "30-45 seconds",
    behaviour: "Write one direct term, value or definition. Stop once the mark is earned.",
  },
  2: {
    time: "1-2 minutes",
    behaviour: "Write two distinct points, or one point with mechanism and consequence.",
  },
  3: {
    time: "2-4 minutes",
    behaviour: "Use three brief bullets. Avoid repeating the same point in different words.",
  },
  4: {
    time: "3-5 minutes",
    behaviour: "Plan the points, then write concise linked explanations or paired comparisons.",
  },
  6: {
    time: "6-8 minutes",
    behaviour: "Spend 20 seconds planning, then write distinct points with scenario links.",
  },
};

const triageMap = {
  known: {
    action: "Answer now",
    reason: "Take the mark quickly. Do not expand a 1-mark definition into a paragraph.",
  },
  calc: {
    action: "Answer now with working",
    reason: "A familiar calculation can earn method marks even if the final value goes wrong.",
  },
  blank: {
    action: "Flag and return",
    reason: "After 20 seconds with no topic, protect the rest of the paper and come back later.",
  },
  long: {
    action: "Plan before writing",
    reason: "A 6-mark answer needs distinct points, not a growing paragraph that repeats itself.",
  },
  sql: {
    action: "Write clause skeleton first",
    reason: "SELECT ... FROM ... GROUP BY ... prevents losing the structure while thinking about fields.",
  },
};

const examples = {
  one: {
    title: "Example 1: 1-mark answer",
    problem: "State the purpose of a primary key. [1]",
    steps: [
      "Full-credit answer: A primary key uniquely identifies each record in a table.",
      "Why it works: it uses the key phrase 'uniquely identifies'.",
      "Too much: explaining foreign keys, indexes and validation wastes time.",
    ],
  },
  two: {
    title: "Example 2: 2-mark explanation",
    problem: "Explain why MFA improves account security. [2]",
    steps: [
      "Point 1: MFA requires more than one authentication factor.",
      "Point 2: a stolen password alone is less likely to allow access.",
      "Why it works: mechanism plus consequence in two compact sentences.",
    ],
  },
  calc: {
    title: "Example 3: Calculation answer",
    problem: "Calculate the storage for 10 seconds of mono sound sampled at 8000 Hz with 8-bit resolution. [4]",
    steps: [
      "Formula: sample rate x duration x resolution x channels.",
      "Substitution: 8000 x 10 x 8 x 1 = 640 000 bits.",
      "Conversion: 640 000 / 8 = 80 000 bytes.",
      "Exam habit: include unit and method so FT marks are possible.",
    ],
  },
  six: {
    title: "Example 4: 6-mark answer skeleton",
    problem: "Evaluate using facial recognition for school attendance. [6]",
    steps: [
      "Benefit: faster attendance and possible safeguarding benefit.",
      "Concern: biometric personal data may reduce privacy or be misused.",
      "Safeguard: consent, limited retention, access control and alternative method.",
      "Judgement: justified only if benefits are proportionate and safeguards are enforced.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "What is the 8-bit unsigned binary range?", accepted: ["0-255", "0 to 255", "0 - 255"], answer: "0-255" },
  { id: "p2", prompt: "Which protocol transfers web pages securely?", accepted: ["https"], answer: "HTTPS" },
  { id: "p3", prompt: "Which register stores the address of the next instruction?", accepted: ["pc", "program counter"], answer: "PC / Program Counter" },
  { id: "p4", prompt: "Which translator executes code one statement at a time?", accepted: ["interpreter"], answer: "Interpreter" },
  { id: "p5", prompt: "Which SQL clause filters records?", accepted: ["where"], answer: "WHERE" },
  { id: "p6", prompt: "Which malware encrypts files and demands payment?", accepted: ["ransomware"], answer: "Ransomware" },
  { id: "p7", prompt: "Which key links to a primary key in another table?", accepted: ["foreign key", "foreign"], answer: "Foreign key" },
  { id: "p8", prompt: "Which term means checking entered data against a source document?", accepted: ["verification"], answer: "Verification" },
  { id: "p9", prompt: "Which logic gate outputs 1 when inputs are different?", accepted: ["xor", "exclusive or", "exclusive-or"], answer: "XOR" },
  { id: "p10", prompt: "Which command word usually needs a supported judgement?", accepted: ["evaluate", "justify"], answer: "Evaluate / justify" },
];

const mistakes = [
  {
    wrong: "For a 1-mark definition, I wrote everything I knew about the topic.",
    fix: "Write the essential property only. A primary key uniquely identifies a record; then move on.",
  },
  {
    wrong: "My calculation answer had the final number but no unit or working.",
    fix: "Show formula, substitution, conversion and unit. This protects method and FT marks.",
  },
  {
    wrong: "I spent six minutes on a 2-mark question because I wanted it to be perfect.",
    fix: "Use the mark value as a ceiling. Two marks need two credit-worthy points, then move on.",
  },
  {
    wrong: "My short explanation said 'it is secure' but did not say how.",
    fix: "Add mechanism. For example, encryption encodes data so intercepted data is unreadable without the key.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "4 marks",
    prompt: "A sound file is recorded for 20 seconds at 16 000 samples per second using 8-bit sample resolution and one channel. Calculate the file size in bytes.",
    answer: "16 000 x 20 x 8 x 1 = 2 560 000 bits. 2 560 000 / 8 = 320 000 bytes.",
    marking: [
      { mark: "M1", text: "uses sample rate x duration x sample resolution x channels" },
      { mark: "M1", text: "substitutes 16 000 x 20 x 8 x 1" },
      { mark: "A1", text: "obtains 2 560 000 bits" },
      { mark: "A1", text: "converts to 320 000 bytes with suitable unit" },
    ],
    strict: [
      "Do not award final A1 without byte/bytes unit unless clearly implied by working.",
      "Do not multiply by 2 channels because the question says one channel.",
      "Allow 320 KB only if decimal KB conversion is clearly stated; bytes answer is expected.",
      "Allow FT from the candidate's earlier bit total only when it is subsequently divided by 8 to obtain bytes.",
    ],
  },
  {
    title: "Question 2",
    marks: "3 marks",
    prompt: "Describe three pieces of information that may be included in a packet header.",
    answer: "A packet header may contain the source address, destination address and a sequence number so packets can be routed and reassembled in the correct order.",
    marking: [
      { mark: "B1", text: "source address" },
      { mark: "B1", text: "destination address" },
      { mark: "B1", text: "sequence number / packet number / order information" },
    ],
    strict: [
      "Do not award more than one mark for vague 'address' unless source/destination is distinguished.",
      "Allow checksum/control information as an alternative valid header item.",
      "Do not accept payload data as header information.",
    ],
  },
  {
    title: "Question 3",
    marks: "4 marks",
    prompt: "A processor repeatedly executes the same instructions in a loop. Explain how cache memory can improve performance in this situation.",
    answer: "Cache stores frequently used data and instructions close to or inside the CPU. Cache is faster to access than RAM, so repeated data/instructions can be fetched more quickly. This reduces slower main memory accesses and can improve performance when the program reuses data or instructions.",
    marking: [
      { mark: "B1", text: "cache stores frequently used data/instructions" },
      { mark: "B1", text: "cache is faster/closer to CPU than RAM" },
      { mark: "B1", text: "reduces need to access slower main memory" },
      { mark: "B1", text: "links to improved performance for repeated/reused data or instructions" },
    ],
    strict: [
      "Do not accept cache as the same as RAM.",
      "Allow 'between CPU and RAM' if faster access role is clear.",
      "Do not award full credit for generic 'makes it faster' without mechanism.",
    ],
  },
  {
    title: "Question 4",
    marks: "4 marks",
    prompt: "Compare validation and verification when entering data into a database.",
    answer: "Validation checks that entered data follows rules such as type, range or format, whereas verification checks that entered data matches the original source. Validation may reject an invalid date format, whereas verification may involve proofreading or double entry against a paper form.",
    marking: [
      { mark: "B1", text: "validation checks data against rules" },
      { mark: "B1", text: "verification checks against original/source data" },
      { mark: "B1", text: "valid validation example such as type/range/format/presence" },
      { mark: "B1", text: "valid verification example such as proofreading/double entry and comparative wording" },
    ],
    strict: [
      "Do not accept 'validation proves data is correct'.",
      "Allow spell check only if clearly used as a format/presence rule, not proof of truth.",
      "Do not accept authentication as verification in this data-entry context.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "A school is moving student records to a shared server. Explain three different measures that can protect the records.",
    answer: "Authentication such as MFA can check user identity before access, reducing unauthorised logins. Access rights can restrict student records to staff who need them, limiting unauthorised viewing or editing. Encryption can encode stored or transmitted records so they are unreadable without the correct key if intercepted or stolen. Backups can also allow records to be restored after loss or corruption.",
    marking: [
      { mark: "B1", text: "names valid measure such as authentication/MFA/access rights/encryption/backup" },
      { mark: "B1", text: "explains mechanism of first measure in context" },
      { mark: "B1", text: "names second valid measure" },
      { mark: "B1", text: "explains mechanism of second measure in context" },
      { mark: "B1", text: "names third valid measure" },
      { mark: "B1", text: "explains mechanism of third measure in context" },
    ],
    strict: [
      "Do not award explanation marks for generic 'keeps it safe'.",
      "Allow firewall/anti-malware/audit trails if mechanism is correct and relevant.",
      "Do not count the same measure twice under different wording.",
    ],
  },
];

let timerSeconds = 300;
let timerInitial = 300;
let timerId = null;

function normalise(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ").replace(/ ;$/, ";");
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

function updateTimerDisplay() {
  document.querySelector("#timerDisplay").textContent = formatTime(timerSeconds);
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

function setupTimer() {
  document.querySelectorAll("[data-time]").forEach((button) => {
    button.addEventListener("click", () => {
      timerInitial = Number(button.dataset.time);
      timerSeconds = timerInitial;
      updateTimerDisplay();
    });
  });

  document.querySelector("#startTimer").addEventListener("click", () => {
    if (timerId !== null) return;
    timerId = window.setInterval(() => {
      timerSeconds = Math.max(0, timerSeconds - 1);
      updateTimerDisplay();
      if (timerSeconds === 0) {
        window.clearInterval(timerId);
        timerId = null;
      }
    }, 1000);
  });

  document.querySelector("#pauseTimer").addEventListener("click", () => {
    if (timerId !== null) {
      window.clearInterval(timerId);
      timerId = null;
    }
  });

  document.querySelector("#resetTimer").addEventListener("click", () => {
    if (timerId !== null) {
      window.clearInterval(timerId);
      timerId = null;
    }
    timerSeconds = timerInitial;
    updateTimerDisplay();
  });
}

function setupPlanner() {
  const input = document.querySelector("#markInput");
  const result = document.querySelector("#planResult");
  document.querySelector("#planBtn").addEventListener("click", () => {
    const item = planMap[input.value];
    result.innerHTML = `<strong>Target time:</strong> ${item.time}<br /><strong>Behaviour:</strong> ${item.behaviour}`;
  });
}

function setupTriage() {
  const input = document.querySelector("#triageInput");
  const result = document.querySelector("#triageResult");
  document.querySelector("#triageBtn").addEventListener("click", () => {
    const item = triageMap[input.value];
    result.innerHTML = `<strong>${item.action}</strong><br />${item.reason}`;
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
  renderExample("one");
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
          <p class="wrong"><strong>Weak answer ${index + 1}:</strong> ${item.wrong}</p>
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
  setupTimer();
  setupPlanner();
  setupTriage();
  setupExamples();
  renderPractice();
  renderMistakes();
  renderExamQuestions();
}

init();
