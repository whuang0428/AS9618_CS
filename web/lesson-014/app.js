const recommendations = {
  chat: {
    result: "Use Unicode for text representation.",
    method: "The system must support many languages and symbols. Unicode has a wider character range than ASCII, so messages are less likely to lose meaning.",
  },
  sensor: {
    result: "Use a signed numeric representation with enough range.",
    method: "The temperature range includes negative values, so unsigned-only storage is unsuitable. Choose enough bits to cover -40 to +60 and any required precision.",
  },
  thumbnail: {
    result: "Use reduced resolution and possibly lossy compression.",
    method: "A thumbnail is displayed small, so very high resolution may waste storage and bandwidth. Lossy compression may be acceptable if visible quality remains suitable.",
  },
  archive: {
    result: "Use lossless compression and exact text representation.",
    method: "Legal or official records must be reconstructed exactly. Lossy compression is unsuitable because it permanently removes data.",
  },
};

const examples = {
  sensor: {
    title: "Example 1: temperature sensor logger",
    problem: "A system stores temperatures from -40°C to +60°C. Choose a suitable numeric representation.",
    steps: [
      "The data can be negative, so unsigned representation alone is not suitable.",
      "The representation must cover at least -40 to +60.",
      "If only whole numbers are needed, an integer representation is acceptable.",
      "The justification must mention range and negative values.",
    ],
  },
  chat: {
    title: "Example 2: multilingual chat app",
    problem: "A chat app must support English, Chinese and Arabic text.",
    steps: [
      "ASCII is limited and mainly supports basic English characters.",
      "Unicode supports a much wider range of characters and languages.",
      "Choose Unicode for message text.",
      "The consequence is better compatibility for multilingual communication.",
    ],
  },
  archive: {
    title: "Example 3: legal archive",
    problem: "A legal archive stores scanned documents and text records.",
    steps: [
      "Exact reconstruction is required because the records have legal meaning.",
      "Use lossless compression for documents that must not lose information.",
      "Use suitable character encoding such as Unicode if multilingual text appears.",
      "Avoid lossy compression where it could alter evidence or meaning.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "A text system must support many languages. Choose ASCII or Unicode.", accepted: ["unicode"], answer: "Unicode" },
  { id: "p2", prompt: "A value may be negative. Choose signed or unsigned representation.", accepted: ["signed"], answer: "Signed" },
  { id: "p3", prompt: "A file must be reconstructed exactly. Choose lossless or lossy compression.", accepted: ["lossless"], answer: "Lossless" },
  { id: "p4", prompt: "A website thumbnail must download quickly. Name one parameter that may be reduced.", accepted: ["resolution", "colour depth", "color depth", "image resolution"], answer: "Resolution or colour depth" },
  { id: "p5", prompt: "Which representation can store exactly 0-255 using 8 bits?", accepted: ["unsigned", "8-bit unsigned", "unsigned integer"], answer: "8-bit unsigned integer" },
  { id: "p6", prompt: "For sound, which parameter controls samples per second?", accepted: ["sampling rate", "sample rate"], answer: "Sampling rate" },
  { id: "p7", prompt: "For bitmap images, what does colour depth control?", accepted: ["bits per pixel", "number of colours", "possible colours"], answer: "Bits per pixel / number of possible colours" },
  { id: "p8", prompt: "What should every scenario justification include after a recommendation?", accepted: ["reason", "consequence", "reason and consequence"], answer: "A reason and a consequence" },
  { id: "p9", prompt: "State one precise exam keyword connected to Choosing data representation for a real system.", accepted: ["keyword","definition","concept","method"], answer: "Use a precise syllabus keyword, then define or apply it in context." },
  { id: "p10", prompt: "What should an exam answer about Choosing data representation for a real system include besides a keyword?", accepted: ["context","reason","evidence","consequence","example"], answer: "It should include context, reason/evidence, and a clear consequence where relevant." }
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "4 marks",
    prompt: "A messaging app must store English, Chinese and Arabic messages. Explain why Unicode is more suitable than ASCII.",
    answer: "Unicode supports a much wider range of characters from many languages. ASCII is limited mainly to basic English characters, so it may not represent Chinese or Arabic text correctly.",
    marking: [
      { mark: "B1", text: "Unicode supports a wider range of characters" },
      { mark: "B1", text: "Unicode supports many languages / multilingual text" },
      { mark: "B1", text: "ASCII is limited / mainly basic English characters" },
      { mark: "B1", text: "links the choice to the messaging app requirement" },
    ],
    strict: [
      "Do not accept only 'Unicode is better'.",
      "Do not require specific character codes.",
      "Answer must be scenario-linked.",
      "Allow equivalent wording if the technical meaning is clear.",
    ],
  },
  {
    title: "Question 2",
    marks: "4 marks",
    prompt: "A temperature sensor stores values from -40°C to +60°C. Explain why unsigned 8-bit representation may be unsuitable.",
    answer: "Unsigned 8-bit representation stores values from 0 to 255 only. The sensor may need to store negative values such as -40, so a signed representation or another method that supports negatives is needed.",
    marking: [
      { mark: "B1", text: "unsigned 8-bit range is 0 to 255" },
      { mark: "B1", text: "sensor range includes negative values" },
      { mark: "B1", text: "unsigned cannot represent negative values" },
      { mark: "B1", text: "suggests signed representation / representation with suitable range" },
    ],
    strict: [
      "Do not accept only 'not enough bits' unless range is explained.",
      "Do not require a particular signed format.",
      "Allow equivalent offset representation if clearly explained.",
    ],
  },
  {
    title: "Question 3",
    marks: "4 marks",
    prompt: "A website uses thumbnail images. Explain two ways file size could be reduced and one consequence of each.",
    answer: "Reducing resolution stores fewer pixels, reducing file size but may reduce detail. Reducing colour depth uses fewer bits per pixel, reducing file size but may reduce the range of colours. Lossy compression may also reduce size with some quality loss.",
    marking: [
      { mark: "B1", text: "valid reduction method such as lower resolution / lower colour depth / lossy compression" },
      { mark: "B1", text: "valid consequence linked to that method" },
      { mark: "B1", text: "second valid reduction method" },
      { mark: "B1", text: "valid consequence linked to second method" },
    ],
    strict: [
      "Do not accept vague 'make quality worse' without naming a parameter.",
      "Do not require all three methods.",
      "Consequence can be quality, detail, colour range or transfer time.",
      "Allow equivalent wording if the technical meaning is clear.",
    ],
  },
  {
    title: "Question 4",
    marks: "5 marks",
    prompt: "A hospital archive stores patient documents and scanned images. Discuss suitable compression choices.",
    answer: "Lossless compression is suitable where exact reconstruction is required, such as patient documents and records. Lossy compression may remove data and could alter meaning or evidence, so it is risky for official records. If images are only previews, lossy may be acceptable, but original records should be preserved losslessly.",
    marking: [
      { mark: "B1", text: "identifies exact reconstruction requirement" },
      { mark: "B1", text: "recommends lossless compression for records/documents" },
      { mark: "B1", text: "explains lossy permanently removes data / may alter meaning" },
      { mark: "B1", text: "links choice to hospital/patient archive context" },
      { mark: "B1", text: "balanced point such as lossy acceptable only for previews or non-critical copies" },
    ],
    strict: [
      "Do not accept only 'lossless is better'.",
      "Do not recommend lossy for original legal/medical records without qualification.",
      "Award scenario-linked consequences, not generic definitions alone.",
      "Allow equivalent wording if the technical meaning is clear.",
    ],
  },
  {
    title: "Question 5",
    marks: "3 marks",
    prompt: "Explain why using the highest possible sample rate for every audio recording may be unsuitable.",
    answer: "A higher sampling rate stores more samples per second and can increase quality, but it also increases file size. If the system does not need that quality, it wastes storage and bandwidth.",
    marking: [
      { mark: "B1", text: "higher sampling rate stores more samples per second" },
      { mark: "B1", text: "file size / storage / bandwidth increases" },
      { mark: "B1", text: "may be unnecessary for the purpose / wasteful if quality is not needed" },
    ],
    strict: [
      "Do not accept only 'it costs more'.",
      "Do not confuse with sample resolution.",
      "Answer must mention purpose or requirement.",
      "Allow equivalent wording if the technical meaning is clear.",
    ],
  },
];

function normalise(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
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
      feedback.textContent = button.dataset.hook === "signed"
        ? "Correct. The range includes negative values, so the representation must handle signed values or another negative-value method."
        : "Not the first issue. The negative range is the major clue.";
    });
  });
}

function setupDecisionTool() {
  const select = document.querySelector("#scenarioInput");
  const result = document.querySelector("#recommendResult");
  const method = document.querySelector("#recommendMethod");
  function recommend() {
    const item = recommendations[select.value];
    result.textContent = item.result;
    method.textContent = item.method;
  }
  select.addEventListener("change", recommend);
  document.querySelector("#recommendBtn").addEventListener("click", recommend);
  recommend();
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
  renderExample("sensor");
}

function renderPractice() {
  const list = document.querySelector("#practiceList");
  list.innerHTML = practice.map((item, index) => `
    <div class="practice-item" id="${item.id}">
      <label>${index + 1}. ${item.prompt}</label>
      <div class="practice-row">
        <input type="text" aria-label="${item.prompt}" />
        <span class="mark" aria-live="polite"></span>
      </div>
      <button type="button" class="answer-toggle" data-answer="answer-${item.id}">Show answer</button>
      <div class="answer-panel" id="answer-${item.id}">${item.answer}</div>
    </div>
  `).join("");

  document.querySelectorAll(".answer-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(`#${button.dataset.answer}`);
      target.classList.toggle("visible");
      button.textContent = target.classList.contains("visible")
        ? button.textContent.replace("Show", "Hide")
        : button.textContent.replace("Hide", "Show");
    });
  });
}

function setupPractice() {
  document.querySelector("#checkPractice").addEventListener("click", () => {
    let correct = 0;
    practice.forEach((item) => {
      const container = document.querySelector(`#${item.id}`);
      const input = container.querySelector("input");
      const mark = container.querySelector(".mark");
      const response = normalise(input.value);
      const isCorrect = item.accepted.some((answer) => {
        const expected = normalise(answer);
        return response === expected || response.includes(expected);
      });
      mark.textContent = isCorrect ? "Correct" : "Try again";
      mark.className = `mark ${isCorrect ? "correct" : "incorrect"}`;
      if (isCorrect) correct += 1;
    });
    document.querySelector("#practiceFeedback").textContent = `${correct}/${practice.length} correct. Scenario answers need a recommendation, a reason and a consequence.`;
  });
}

function renderExamQuestions() {
  const list = document.querySelector("#examList");
  list.innerHTML = examQuestions.map((question, index) => {
    const msId = `ms-${index}`;
    return `
      <article class="exam-card">
        <div class="exam-head">
          <h3>${question.title}</h3>
          <span>${question.marks}</span>
        </div>
        <p>${question.prompt}</p>
        <button type="button" class="ms-toggle" data-ms="${msId}">Show MS</button>
        <div class="ms-panel" id="${msId}">
          <h4>CIE-style mark scheme</h4>
          <p><strong>Answer:</strong> ${question.answer}</p>
          <ul>${question.marking.map((point) => `<li><strong>${point.mark}</strong> ${point.text}</li>`).join("")}</ul>
        </div>
      </article>
    `;
  }).join("");

  document.querySelectorAll(".ms-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(`#${button.dataset.ms}`);
      target.classList.toggle("visible");
      button.textContent = target.classList.contains("visible") ? "Hide MS" : "Show MS";
    });
  });
}

function init() {
  setupPrint();
  setupHook();
  setupDecisionTool();
  setupExamples();
  renderPractice();
  setupPractice();
  renderExamQuestions();
}

init();
