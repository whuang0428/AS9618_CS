const examples = {
  ascii: {
    title: "Example 1: A in ASCII",
    problem: "Explain how the character A can be stored.",
    steps: [
      "A character set gives A a numeric code.",
      "In ASCII, A has denary code 65.",
      "65 can be stored as binary 01000001.",
      "The computer stores the binary value; software displays the character A.",
    ],
  },
  capacity: {
    title: "Example 2: 7-bit vs 8-bit capacity",
    problem: "Calculate how many codes can be represented using 7 bits and 8 bits.",
    steps: [
      "Each bit has 2 possible states.",
      "7 bits gives 2⁷ = 128 possible codes.",
      "8 bits gives 2⁸ = 256 possible codes.",
      "Extended ASCII can therefore include more characters than standard ASCII, but it is still limited.",
    ],
  },
  unicode: {
    title: "Example 3: choosing Unicode",
    problem: "A website stores English, Chinese and Arabic text. Explain why Unicode is suitable.",
    steps: [
      "ASCII mainly supports basic English letters, digits and punctuation.",
      "Unicode supports a much wider range of characters from many languages.",
      "The website needs multilingual text, so Unicode is more suitable.",
      "A precise answer says what Unicode allows, not just that it is 'better'.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "How many possible codes can 7-bit ASCII represent?", accepted: ["128", "2^7", "2⁷"], answer: "128" },
  { id: "p2", prompt: "How many possible codes can extended 8-bit ASCII represent?", accepted: ["256", "2^8", "2⁸"], answer: "256" },
  { id: "p3", prompt: "What is a character set?", accepted: ["maps characters to codes", "a set of characters and codes", "collection of characters and codes"], answer: "A defined collection of characters and their assigned codes." },
  { id: "p4", prompt: "Which is more suitable for multilingual text: ASCII or Unicode?", accepted: ["unicode"], answer: "Unicode" },
  { id: "p5", prompt: "Does changing font change the character code?", accepted: ["no"], answer: "No" },
  { id: "p6", prompt: "Standard ASCII uses how many bits?", accepted: ["7", "7 bits", "seven", "seven bits"], answer: "7 bits" },
  { id: "p7", prompt: "Give one reason Unicode may need more storage than ASCII.", accepted: ["more bits", "more bytes", "more characters", "larger codes"], answer: "It may use more bits/bytes per character because it supports many more characters." },
  { id: "p8", prompt: "Do students need to memorise ASCII codes for this syllabus point?", accepted: ["no"], answer: "No" },
  { id: "p9", prompt: "State one precise exam keyword connected to Character sets: ASCII, extended ASCII and Unicode.", accepted: ["keyword","definition","concept","method"], answer: "Use a precise syllabus keyword, then define or apply it in context." },
  { id: "p10", prompt: "What should an exam answer about Character sets: ASCII, extended ASCII and Unicode include besides a keyword?", accepted: ["context","reason","evidence","consequence","example"], answer: "It should include context, reason/evidence, and a clear consequence where relevant." }
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "3 marks",
    prompt: "Describe how a character is represented in a computer system.",
    answer: "A character set assigns each character a numeric code. The numeric code is stored in binary. Software uses the code to display the correct character.",
    marking: [
      { mark: "B1", text: "states that a character set defines / contains characters" },
      { mark: "B1", text: "states that each character is assigned a numeric code / value" },
      { mark: "B1", text: "states that the code is stored as binary / bits" },
    ],
    strict: [
      "Do not accept only 'characters are stored as text'.",
      "Do not require a specific ASCII code.",
      "Allow examples if the mapping from character to code to binary is clear.",
    ],
  },
  {
    title: "Question 2",
    marks: "4 marks",
    prompt: "Compare standard ASCII and extended ASCII.",
    answer: "Standard ASCII uses 7 bits and can represent 128 codes. Extended ASCII uses 8 bits and can represent 256 codes, allowing extra characters.",
    marking: [
      { mark: "B1", text: "standard ASCII uses 7 bits" },
      { mark: "B1", text: "standard ASCII has 128 possible codes" },
      { mark: "B1", text: "extended ASCII uses 8 bits" },
      { mark: "B1", text: "extended ASCII has 256 possible codes / allows more characters" },
    ],
    strict: [
      "Do not accept 'ASCII has 8 bits' unless clearly referring to extended ASCII.",
      "Do not accept 'extended ASCII stores every language'.",
      "Allow correct powers of two instead of denary totals.",
    ],
  },
  {
    title: "Question 3",
    marks: "4 marks",
    prompt: "A school website must store English, Chinese and Arabic text. Explain why Unicode is more suitable than ASCII.",
    answer: "Unicode supports a much wider range of characters from many languages. ASCII is limited mainly to basic English characters, digits and punctuation. Therefore Unicode is more suitable for multilingual text.",
    marking: [
      { mark: "B1", text: "Unicode supports many more characters / a wider character range" },
      { mark: "B1", text: "Unicode supports characters from many languages" },
      { mark: "B1", text: "ASCII has a limited character set / mainly basic English characters" },
      { mark: "B1", text: "links the choice to multilingual website requirements" },
    ],
    strict: [
      "Do not accept only 'Unicode is newer' or 'Unicode is better'.",
      "Do not require examples of specific code points.",
      "Accept a storage trade-off comment, but it is not required for full marks.",
      "Allow equivalent wording if the technical meaning is clear.",
    ],
  },
  {
    title: "Question 4",
    marks: "3 marks",
    prompt: "Explain why changing a font does not change the character set.",
    answer: "A font controls how characters look when displayed. A character set defines the characters and their codes. Changing appearance does not change the stored code value.",
    marking: [
      { mark: "B1", text: "font controls appearance / visual rendering" },
      { mark: "B1", text: "character set maps characters to codes" },
      { mark: "B1", text: "stored code / character value is not changed by the font" },
    ],
    strict: [
      "Do not accept only 'fonts are styles'.",
      "Allow 'typeface' wording if the distinction from character code is clear.",
      "Do not award full marks unless both appearance and code mapping are addressed.",
    ],
  },
  {
    title: "Question 5",
    marks: "3 marks",
    prompt: "A candidate says that standard ASCII can represent all characters because all data is binary. Explain why this is incorrect.",
    answer: "Although ASCII codes are stored in binary, standard ASCII only has 128 possible codes. A character can only be represented if the character set includes it.",
    marking: [
      { mark: "B1", text: "recognises that all stored character codes are binary / stored using bits" },
      { mark: "B1", text: "states standard ASCII is limited to 128 codes" },
      { mark: "B1", text: "explains that unsupported characters are not included in the character set" },
    ],
    strict: [
      "Do not accept only 'ASCII is old'.",
      "Do not require naming Unicode, although it may be used as a contrast.",
      "Accept '7-bit limitation' as equivalent to 128-code limitation.",
      "Allow equivalent wording if the technical meaning is clear.",
    ],
  },
];

const knownChars = {
  A: { code: 65, binary: "01000001", standardAscii: true, note: "A is in standard ASCII." },
  B: { code: 66, binary: "01000010", standardAscii: true, note: "B is in standard ASCII." },
  a: { code: 97, binary: "01100001", standardAscii: true, note: "Lowercase a has a different code from uppercase A." },
  "?": { code: 63, binary: "00111111", standardAscii: true, note: "? is in standard ASCII." },
  "é": { code: 233, binary: "11101001", standardAscii: false, note: "é is not in standard 7-bit ASCII; it may appear in extended sets or Unicode." },
  "你": { code: 20320, binary: "100111101100000", standardAscii: false, note: "你 requires a wider character set such as Unicode." },
  "€": { code: 8364, binary: "10000010101100", standardAscii: false, note: "€ requires Unicode or another character set that includes it." },
};

function normalise(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function toBinary(value, width = 8) {
  return value.toString(2).padStart(width, "0");
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
      if (button.dataset.hook === "no") {
        feedback.textContent = "Correct. Standard ASCII has only 128 codes and does not include Chinese characters.";
      } else if (button.dataset.hook === "font") {
        feedback.textContent = "A font changes appearance, not whether the character exists in the character set.";
      } else {
        feedback.textContent = "The character must exist in the character set. Binary storage alone is not enough.";
      }
    });
  });
}

function setupInspector() {
  const input = document.querySelector("#charInput");
  const result = document.querySelector("#inspectResult");
  const method = document.querySelector("#inspectMethod");
  const visual = document.querySelector("#byteVisual");

  function inspect() {
    const char = Array.from(input.value.trim())[0] || "A";
    input.value = char;
    const known = knownChars[char];
    const code = known ? known.code : char.codePointAt(0);
    const binary = known ? known.binary : toBinary(code, code <= 255 ? 8 : 16);
    const asciiStatus = code <= 127
      ? "fits in standard ASCII"
      : code <= 255
        ? "does not fit in standard ASCII, but fits in 8-bit range"
        : "requires a wider character set such as Unicode";

    result.textContent = `${char} → denary code ${code} → binary ${binary}`;
    method.textContent = known ? known.note : `This character ${asciiStatus}. You do not need to memorise this code.`;
    visual.innerHTML = binary.split("").map((bit, index) => `
      <div class="bit-card ${bit === "1" ? "on" : "off"}">
        <span class="bit-value">${bit}</span>
        <span class="place-value">bit ${binary.length - 1 - index}</span>
      </div>
    `).join("");
  }

  input.addEventListener("input", inspect);
  document.querySelector("#inspectBtn").addEventListener("click", inspect);
  inspect();
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
  renderExample("ascii");
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
    document.querySelector("#practiceFeedback").textContent = `${correct}/${practice.length} correct. For explanations, name the character set and the limit.`;
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
          <h4>Strict notes</h4>
          <ul>${question.strict.map((note) => `<li>${note}</li>`).join("")}</ul>
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
  setupInspector();
  setupExamples();
  renderPractice();
  setupPractice();
  renderExamQuestions();
}

init();
