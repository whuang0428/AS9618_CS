const classifierMap = {
  bitmap: {
    topic: "Section 1: image file size",
    method: "Use width x height x colour depth, then convert bits to bytes and suitable units.",
  },
  packet: {
    topic: "Section 2: packet switching / communication",
    method: "Describe packets, addresses, routing, reassembly and possible different routes.",
  },
  fde: {
    topic: "Section 4: fetch-decode-execute cycle",
    method: "Name registers and describe transfers in sequence: PC, MAR, memory, MDR, CIR.",
  },
  translator: {
    topic: "Section 5: interpreter",
    method: "State that code is translated and executed one statement at a time.",
  },
  licence: {
    topic: "Section 7: ownership and licensing",
    method: "Explain permissions and conditions set by the licence; copyright still applies.",
  },
  sql: {
    topic: "Section 8: SQL aggregate with GROUP BY",
    method: "Use SELECT group field and aggregate, FROM table, GROUP BY group field.",
  },
};

const commandMap = {
  state: {
    shape: "Give one precise point. Do not bury the answer.",
    frame: "Lossless compression allows the original file to be restored exactly.",
  },
  describe: {
    shape: "Say what happens or what it is, usually in sequence.",
    frame: "The address in the PC is copied to the MAR; the instruction is fetched into the MDR; the instruction is copied to the CIR.",
  },
  explain: {
    shape: "Give cause plus consequence. Use because/so that.",
    frame: "MFA requires more than one authentication factor, so a stolen password alone is less likely to allow access.",
  },
  compare: {
    shape: "Pair the differences directly. Mention both items in each point.",
    frame: "A compiler translates the whole program before execution, whereas an interpreter translates and executes one statement at a time.",
  },
  justify: {
    shape: "Choose and defend with scenario-specific reasons.",
    frame: "An SSD is suitable for a tablet because it has no moving parts, making it more resistant to knocks while being carried.",
  },
  evaluate: {
    shape: "Give benefit, concern, safeguard and supported judgement.",
    frame: "Surveillance may improve safety, but it reduces privacy; it is justified only if monitoring is limited, transparent and proportionate.",
  },
};

const topicFacts = {
  encryption: {
    mechanism: "encodes data so it is unreadable without the correct key",
    consequence: "protecting confidentiality if data is intercepted or stolen",
  },
  cache: {
    mechanism: "stores frequently used data and instructions close to the CPU",
    consequence: "reducing slower RAM accesses and improving performance for repeated operations",
  },
  normalisation: {
    mechanism: "separates repeated data into related tables",
    consequence: "reducing duplication and update inconsistencies",
  },
  firewall: {
    mechanism: "filters network traffic using rules such as IP address, port or protocol",
    consequence: "blocking unauthorised or suspicious traffic from reaching the network",
  },
};

const examples = {
  calc: {
    title: "Example 1: Calculation strategy",
    problem: "Calculate the size in bytes of a 640 x 480 bitmap image with 8-bit colour depth.",
    steps: [
      "Topic clue: bitmap file size, Section 1.",
      "Formula: width x height x colour depth.",
      "Substitute: 640 x 480 x 8 = 2 457 600 bits.",
      "Convert: 2 457 600 / 8 = 307 200 bytes.",
      "Exam habit: show the bit-to-byte conversion; do not jump straight to a unit.",
    ],
  },
  processor: {
    title: "Example 2: Processor trace strategy",
    problem: "Describe how the next instruction is fetched.",
    steps: [
      "Topic clue: instruction fetch, Section 4.",
      "Register sequence: PC stores address of next instruction.",
      "Address is copied to MAR; memory returns instruction into MDR.",
      "Instruction is copied to CIR; PC is incremented.",
      "Exam habit: use exact register names, not 'the CPU gets it'.",
    ],
  },
  security: {
    title: "Example 3: Security explanation strategy",
    problem: "Explain how encryption protects data sent over a public network.",
    steps: [
      "Topic clue: encryption, Section 6.",
      "Mechanism: data is encoded using an algorithm/key.",
      "Consequence: intercepted data is unreadable without the key.",
      "Limit: encryption does not by itself prove the sender's identity.",
      "Exam habit: avoid vague 'makes data secure'.",
    ],
  },
  ethics: {
    title: "Example 4: Evaluation strategy",
    problem: "Evaluate using cameras with facial recognition in a town centre.",
    steps: [
      "Topic clue: ethics/privacy/surveillance, Section 7.",
      "Benefit: may help identify missing people or suspects quickly.",
      "Concern: may track innocent people and reduce privacy.",
      "Safeguard: limit purpose, retention and access; be transparent.",
      "Judgement: acceptable only if proportional and carefully controlled.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Which command word usually needs a cause and consequence?", accepted: ["explain"], answer: "Explain" },
  { id: "p2", prompt: "Which command word usually needs paired differences between two items?", accepted: ["compare"], answer: "Compare" },
  { id: "p3", prompt: "Which command word usually needs a supported judgement?", accepted: ["evaluate", "justify"], answer: "Evaluate / justify" },
  { id: "p4", prompt: "Which Paper 1 section contains image, sound and compression?", accepted: ["section 1", "1"], answer: "Section 1" },
  { id: "p5", prompt: "Which Paper 1 section contains packets, protocols and network hardware?", accepted: ["section 2", "2"], answer: "Section 2" },
  { id: "p6", prompt: "Which Paper 1 section contains CPU registers and the FDE cycle?", accepted: ["section 4", "4"], answer: "Section 4" },
  { id: "p7", prompt: "Which Paper 1 section contains OS roles and translators?", accepted: ["section 5", "5"], answer: "Section 5" },
  { id: "p8", prompt: "Which Paper 1 section contains authentication, malware and encryption?", accepted: ["section 6", "6"], answer: "Section 6" },
  { id: "p9", prompt: "Which SQL clause is likely if the question says 'for each category'?", accepted: ["group by"], answer: "GROUP BY" },
  { id: "p10", prompt: "In a calculation answer, what should you include before the final value?", accepted: ["working", "method", "formula", "substitution"], answer: "Working / method / formula" },
];

const mistakes = [
  {
    wrong: "The question says explain, so I wrote the keyword and moved on.",
    fix: "Explain needs mechanism and consequence. Add because/so that and link to the scenario.",
  },
  {
    wrong: "For compare questions, I wrote one paragraph about a compiler and then one about an interpreter.",
    fix: "Pair the differences directly: compiler does X whereas interpreter does Y.",
  },
  {
    wrong: "I saw 'data' and answered with databases, but the question was about data protection ethics.",
    fix: "Use topic clues and command words together. Personal data, consent and monitoring usually point to Section 7 ethics/privacy.",
  },
  {
    wrong: "I skipped units in a file-size calculation because the number was correct.",
    fix: "Cambridge-style marking often rewards method and units. Show formula, conversion and final unit.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "5 marks",
    prompt: "A bitmap image is 800 pixels wide and 600 pixels high. It uses 16-bit colour depth. Calculate the file size in bytes, ignoring metadata.",
    answer: "800 x 600 x 16 = 7 680 000 bits. 7 680 000 / 8 = 960 000 bytes.",
    marking: [
      { mark: "M1", text: "uses width x height x colour depth" },
      { mark: "M1", text: "substitutes 800 x 600 x 16" },
      { mark: "A1", text: "obtains 7 680 000 bits" },
      { mark: "M1", text: "divides by 8 to convert bits to bytes" },
      { mark: "A1", text: "960 000 bytes with suitable unit" },
    ],
    strict: [
      "Do not award final A1 without a byte/bytes unit unless clearly implied by working.",
      "Do not include metadata because the question says to ignore it.",
      "Allow 960 KB only if decimal KB conversion is clearly stated; bytes answer is expected.",
      "Allow FT from the candidate's earlier bit total only when it is subsequently divided by 8 to obtain bytes.",
    ],
  },
  {
    title: "Question 2",
    marks: "4 marks",
    prompt: "Compare how a compiler and an interpreter translate and execute a high-level language program.",
    answer: "A compiler translates the whole source program into object code before execution, whereas an interpreter translates and executes one statement at a time. A compiled program can be run without retranslation, whereas interpreted code needs the interpreter at run time. An interpreter is useful for debugging because errors are found as statements execute.",
    marking: [
      { mark: "B1", text: "compiler translates whole program/source before execution" },
      { mark: "B1", text: "interpreter translates/executes statement by statement" },
      { mark: "B1", text: "compiled program/object code can run without retranslation" },
      { mark: "B1", text: "interpreter useful for debugging or needs interpreter at run time" },
    ],
    strict: [
      "Do not accept assembler as either compiler or interpreter.",
      "Allow line by line for statement by statement.",
      "Do not award comparison mark for two unconnected descriptions.",
    ],
  },
  {
    title: "Question 3",
    marks: "6 marks",
    prompt: "A company sends confidential customer data over a public network. Explain two controls that could reduce risk.",
    answer: "Encryption can encode the data so that intercepted data is unreadable without the correct key, protecting confidentiality. Authentication such as MFA can check the user's identity before access, reducing the chance that a stolen password alone allows unauthorised access. Access rights can also limit data to staff who need it for their role.",
    marking: [
      { mark: "B1", text: "names encryption" },
      { mark: "B1", text: "explains encoded/unreadable without key" },
      { mark: "B1", text: "links encryption to confidentiality during transmission" },
      { mark: "B1", text: "names authentication/MFA or access rights" },
      { mark: "B1", text: "explains mechanism of second control" },
      { mark: "B1", text: "applies second control to reducing unauthorised access/risk" },
    ],
    strict: [
      "Do not award full credit for generic 'use security'.",
      "Allow VPN/HTTPS if encryption mechanism is clear.",
      "Do not treat backup as a confidentiality control unless availability is separately discussed.",
    ],
  },
  {
    title: "Question 4",
    marks: "4 marks",
    prompt: "The Book table has fields BookID, Title, Category and Copies. Write an SQL query to output each Category and the number of books in that Category.",
    answer: "SELECT Category, COUNT(*) FROM Book GROUP BY Category;",
    marking: [
      { mark: "B1", text: "SELECT Category" },
      { mark: "B1", text: "uses COUNT(*) or valid count of records" },
      { mark: "B1", text: "FROM Book" },
      { mark: "M1", text: "GROUP BY Category" },
    ],
    strict: [
      "Do not award GROUP BY mark for ORDER BY Category.",
      "Do not accept SUM(Copies) because the question asks for number of books, not total copies.",
      "Allow COUNT(BookID).",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "A town uses surveillance cameras with facial recognition in public spaces. Evaluate this decision.",
    answer: "The system may improve public safety by helping identify suspects or missing people quickly. However, it may reduce privacy because people are monitored in public and biometric data may be stored or misused. It may also be unfair if recognition accuracy differs between groups. The decision is justified only if use is transparent, data is retained for a limited time, access is restricted and the benefit is proportionate to the privacy impact.",
    marking: [
      { mark: "B1", text: "valid benefit such as safety/crime prevention/finding missing people" },
      { mark: "B1", text: "applies benefit to town/public spaces" },
      { mark: "B1", text: "valid concern such as privacy, surveillance or biometric data misuse" },
      { mark: "B1", text: "explains consequence of concern" },
      { mark: "B1", text: "gives suitable safeguard/condition such as retention limit, transparency or access control" },
      { mark: "B1", text: "judges whether public facial recognition is proportionate using safety benefit, surveillance/false-match harm and operational safeguards" },
    ],
    strict: [
      "Do not award full credit for one-sided safety-only answers.",
      "Allow data protection wording if privacy concern is clear.",
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
  const responses = {
    calc: "Response shape: calculation. Write formula, substitute values, convert units and state final unit.",
    compare: "Response shape: comparison. Pair each difference directly: compiler does X whereas interpreter does Y.",
    sql: "Response shape: SQL. Identify fields, table, filter/group/sort clauses.",
    evaluate: "Response shape: evaluation. Give benefit, concern, safeguard and judgement.",
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
    result.innerHTML = `<strong>${item.topic}</strong><br />${item.method}`;
  });
}

function setupDecoder() {
  const input = document.querySelector("#commandInput");
  const result = document.querySelector("#decodeResult");
  document.querySelector("#decodeBtn").addEventListener("click", () => {
    const item = commandMap[input.value];
    result.innerHTML = `<strong>Expected shape:</strong> ${item.shape}<br /><strong>Frame:</strong> ${item.frame}`;
  });
}

function setupBuilder() {
  const topic = document.querySelector("#topicInput");
  const context = document.querySelector("#contextInput");
  const result = document.querySelector("#builderResult");
  document.querySelector("#buildBtn").addEventListener("click", () => {
    const fact = topicFacts[topic.value];
    result.innerHTML = `<strong>Built answer:</strong> In the ${context.value}, ${topic.value} ${fact.mechanism}, ${fact.consequence}.`;
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
          <p class="wrong"><strong>Weak approach ${index + 1}:</strong> ${item.wrong}</p>
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
  setupClassifier();
  setupDecoder();
  setupBuilder();
  setupExamples();
  renderPractice();
  renderMistakes();
  renderExamQuestions();
}

init();
