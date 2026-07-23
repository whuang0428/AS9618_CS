const examples = {
  negative: {
    title: "Example 1: -23 to 8-bit two’s complement",
    problem: "Represent -23 using 8-bit two’s complement.",
    steps: [
      "Write +23 in 8-bit binary: 00010111.",
      "Invert every bit: 11101000.",
      "Add 1: 11101001.",
      "So -23 is represented as 11101001₂ in 8-bit two’s complement.",
    ],
  },
  decode: {
    title: "Example 2: 11101001₂ to denary",
    problem: "Interpret 11101001₂ as an 8-bit two’s complement value.",
    steps: [
      "The leftmost bit is 1, so the value is negative.",
      "Unsigned value of 11101001₂ is 233.",
      "For 8-bit two’s complement, subtract 256: 233 - 256 = -23.",
      "So 11101001₂ represents -23.",
    ],
  },
  compare: {
    title: "Example 3: the same value in three representations",
    problem: "Represent -23 using sign-and-magnitude, one’s complement and two’s complement.",
    steps: [
      "Sign-and-magnitude: sign bit 1 + magnitude 0010111 gives 10010111₂.",
      "One’s complement: +23 is 00010111, invert bits to get 11101000₂.",
      "Two’s complement: add 1 to one’s complement to get 11101001₂.",
      "Same denary value, different bit patterns.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Convert -23 to 8-bit two’s complement.", accepted: ["11101001", "11101001₂"], answer: "11101001₂" },
  { id: "p2", prompt: "Convert -18 to 8-bit two’s complement.", accepted: ["11101110", "11101110₂"], answer: "11101110₂" },
  { id: "p3", prompt: "Convert -1 to 8-bit two’s complement.", accepted: ["11111111", "11111111₂"], answer: "11111111₂" },
  { id: "p4", prompt: "Interpret 11101001₂ as 8-bit two’s complement.", accepted: ["-23", "negative 23"], answer: "-23" },
  { id: "p5", prompt: "Interpret 10000000₂ as 8-bit two’s complement.", accepted: ["-128", "negative 128"], answer: "-128" },
  { id: "p6", prompt: "What is the 8-bit two’s complement range?", accepted: ["-128 to 127", "-128 to +127"], answer: "-128 to +127" },
  { id: "p7", prompt: "What is one’s complement of 00010111₂?", accepted: ["11101000", "11101000₂"], answer: "11101000₂" },
  { id: "p8", prompt: "How many zero representations does two’s complement have?", accepted: ["1", "one"], answer: "One" },
  { id: "p9", prompt: "State one precise exam keyword connected to Signed binary: sign-and-magnitude, one’s complement and two’s complement.", accepted: ["keyword","definition","concept","method"], answer: "Use a precise syllabus keyword, then define or apply it in context." },
  { id: "p10", prompt: "What should an exam answer about Signed binary: sign-and-magnitude, one’s complement and two’s complement include besides a keyword?", accepted: ["context","reason","evidence","consequence","example"], answer: "It should include context, reason/evidence, and a clear consequence where relevant." }
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "4 marks",
    prompt: "Represent -23 using 8-bit two’s complement. Show your working.",
    answer: "+23 = 00010111₂. Invert all bits to obtain 11101000₂, then add 1: 11101001₂. Therefore -23 is 11101001₂ in 8-bit two's complement.",
    marking: [
      { mark: "B1", text: "writes +23 as 00010111" },
      { mark: "B1", text: "inverts bits to get 11101000" },
      { mark: "B1", text: "adds 1 to the inverted value" },
      { mark: "B1", text: "11101001" },
    ],
    strict: [
      "Do not award answer mark for 11101000; that is one’s complement, not two’s complement.",
      "Allow equivalent subtraction method if it clearly produces the same 8-bit result.",
      "Final answer must have 8 bits.",
    ],
  },
  {
    title: "Question 2",
    marks: "3 marks",
    prompt: "Interpret 11101001₂ as an 8-bit two’s complement integer.",
    answer: "The leading bit is 1, so the value is negative. Invert 11101001₂ to 00010110₂ and add 1 to obtain 00010111₂ = 23. Therefore the value is -23.",
    marking: [
      { mark: "B1", text: "recognises that the leading 1 means the value is negative in two’s complement" },
      { mark: "B1", text: "uses a valid method, e.g. unsigned value 233 then 233 - 256, or invert and add 1" },
      { mark: "B1", text: "-23" },
    ],
    strict: [
      "Do not accept 233; that is the unsigned interpretation.",
      "The representation must be treated as 8-bit.",
    ],
  },
  {
    title: "Question 3",
    marks: "3 marks",
    prompt: "State the range of values represented by 8-bit two’s complement.",
    answer: "An 8-bit two's-complement value has range -2^7 to 2^7 - 1, which is -128 to +127.",
    marking: [
      { mark: "B1", text: "minimum value is -128" },
      { mark: "B1", text: "maximum value is +127 / 127" },
      { mark: "B1", text: "states or implies this is for 8-bit two’s complement" },
    ],
    strict: [
      "Do not accept -127 to +127; that is not the two’s complement range.",
      "Do not accept 0 to 255; that is unsigned 8-bit.",
      "Allow equivalent wording if the technical meaning is clear.",
    ],
  },
  {
    title: "Question 4",
    marks: "4 marks",
    prompt: "Compare one’s complement and two’s complement representation of negative integers.",
    answer: "One’s complement inverts all bits; two’s complement inverts all bits and adds 1. One’s complement has two zeros, while two’s complement has one zero and an extra negative value.",
    marking: [
      { mark: "B1", text: "one’s complement is produced by inverting all bits" },
      { mark: "B1", text: "two’s complement is produced by inverting all bits and adding 1" },
      { mark: "B1", text: "one’s complement has two representations of zero" },
      { mark: "B1", text: "two’s complement has one zero / range includes one extra negative value" },
    ],
    strict: [
      "Do not accept only 'two’s complement is better' without technical detail.",
      "Accept a clear example such as -23: 11101000 vs 11101001.",
      "Allow equivalent wording if the technical meaning is clear.",
    ],
  },
  {
    title: "Question 5",
    marks: "3 marks",
    prompt: "A candidate says that 10000000₂ in 8-bit two’s complement is negative zero. Explain why this is incorrect.",
    answer: "Two's complement has one representation of zero, 00000000₂. In 8-bit two's complement, 10000000₂ represents -128. A separate negative-zero representation occurs in sign-and-magnitude or one's-complement systems, not in two's complement.",
    marking: [
      { mark: "B1", text: "states that two’s complement has only one zero" },
      { mark: "B1", text: "identifies 10000000₂ as -128" },
      { mark: "B1", text: "explains that negative zero belongs to sign-and-magnitude or one’s complement style issues, not two’s complement" },
    ],
    strict: [
      "Do not accept 'because the first bit is 1' as a complete explanation.",
      "Accept range-based explanation: the lowest 8-bit two’s complement value is -128.",
      "Allow equivalent wording if the technical meaning is clear.",
    ],
  },
];

function normalise(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function toByte(value) {
  return (value & 255).toString(2).padStart(8, "0");
}

function invertBits(byte) {
  return byte.split("").map((bit) => bit === "1" ? "0" : "1").join("");
}

function isByte(value) {
  return /^[01]{8}$/.test(value.trim());
}

function twosToDenary(byte) {
  const unsigned = Number.parseInt(byte, 2);
  return byte[0] === "1" ? unsigned - 256 : unsigned;
}

function denaryToTwos(value) {
  return toByte(value);
}

function renderBitVisual(byte) {
  const visual = document.querySelector("#bitVisual");
  visual.innerHTML = byte.split("").map((bit, index) => `
    <div class="bit-card ${index === 0 ? "sign" : ""} ${bit === "1" ? "on" : "off"}">
      <span class="bit-value">${bit}</span>
      <span class="place-value">${index === 0 ? "sign/MSB" : `bit ${7 - index}`}</span>
    </div>
  `).join("");
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
      if (button.dataset.hook === "depends") {
        feedback.textContent = "Best answer. The same bits can be interpreted differently depending on representation.";
      } else if (button.dataset.hook === "twos") {
        feedback.textContent = "Correct if the question states 8-bit two’s complement. Without that context, it is not the only possible interpretation.";
      } else {
        feedback.textContent = "This can be true in one representation, but the exam must specify or imply the representation.";
      }
    });
  });
}

function setupConverter() {
  const mode = document.querySelector("#convertMode");
  const input = document.querySelector("#convertValue");
  const result = document.querySelector("#convertResult");
  const method = document.querySelector("#convertMethod");

  function convert() {
    const raw = input.value.trim();
    if (mode.value === "denaryToTwos") {
      const value = Number(raw);
      if (!Number.isInteger(value) || value < -128 || value > 127) {
        result.textContent = "Enter a whole number from -128 to +127.";
        method.textContent = "8-bit two’s complement range is -128 to +127.";
        renderBitVisual("00000000");
        return;
      }
      const byte = denaryToTwos(value);
      result.textContent = `${value}₁₀ = ${byte}₂`;
      if (value >= 0) {
        method.textContent = `Positive value: write the ordinary 8-bit binary value ${byte}.`;
      } else {
        const magnitude = toByte(Math.abs(value));
        const inverted = invertBits(magnitude);
        method.textContent = `Magnitude ${Math.abs(value)} = ${magnitude}; invert -> ${inverted}; add 1 -> ${byte}.`;
      }
      renderBitVisual(byte);
      return;
    }

    if (!isByte(raw)) {
      result.textContent = "Enter exactly 8 binary digits using only 0 and 1.";
      method.textContent = "Example input: 11101001.";
      renderBitVisual("00000000");
      return;
    }
    const denary = twosToDenary(raw);
    const unsigned = Number.parseInt(raw, 2);
    result.textContent = `${raw}₂ = ${denary}₁₀ in 8-bit two’s complement`;
    method.textContent = raw[0] === "1"
      ? `MSB is 1, so subtract 256 from unsigned value ${unsigned}: ${unsigned} - 256 = ${denary}.`
      : `MSB is 0, so read as positive binary: ${unsigned}.`;
    renderBitVisual(raw);
  }

  mode.addEventListener("change", () => {
    input.value = mode.value === "denaryToTwos" ? "-23" : "11101001";
    convert();
  });
  input.addEventListener("input", convert);
  document.querySelector("#convertBtn").addEventListener("click", convert);
  convert();
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
  renderExample("negative");
}

function renderPractice() {
  const list = document.querySelector("#practiceList");
  list.innerHTML = practice.map((item, index) => `
    <div class="practice-item" id="${item.id}">
      <label>${index + 1}. ${item.prompt}</label>
      <input type="text" aria-label="${item.prompt}" />
      <button type="button" class="answer-toggle" data-answer="answer-${item.id}">Show answer</button>
      <div class="answer-panel" id="answer-${item.id}"><strong>Answer:</strong> ${item.answer}</div>
    </div>
  `).join("");

  document.querySelectorAll(".answer-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(`#${button.dataset.answer}`);
      target.classList.toggle("visible");
      button.textContent = target.classList.contains("visible") ? "Hide answer" : "Show answer";
    });
  });
}

function setupPractice() {
  renderPractice();
  document.querySelector("#checkPractice").addEventListener("click", () => {
    let correct = 0;
    practice.forEach((item) => {
      const row = document.querySelector(`#${item.id}`);
      const student = normalise(row.querySelector("input").value);
      const ok = item.accepted.some((answer) => normalise(answer) === student);
      row.classList.toggle("correct", ok);
      row.classList.toggle("incorrect", !ok);
      if (ok) correct += 1;
    });
    document.querySelector("#practiceFeedback").textContent = `${correct}/${practice.length} correct. Check whether the question asks for one’s complement or two’s complement.`;
  });
}

function setupRevealButtons() {
  document.querySelectorAll(".reveal").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(`#${button.dataset.reveal}`);
      target.classList.toggle("visible");
      const openLabel = button.dataset.openLabel || "Show correction";
      const closeLabel = button.dataset.closeLabel || "Hide correction";
      button.textContent = target.classList.contains("visible") ? closeLabel : openLabel;
    });
  });
}

function renderExamQuestions() {
  const grid = document.querySelector("#examGrid");
  grid.innerHTML = examQuestions.map((question, index) => {
    const msId = `ms-${index + 1}`;
    return `
      <article class="exam-card">
        <h3>${question.title}</h3>
        <p>${question.prompt}</p>
        <p class="marks">[${question.marks}]</p>
        <button type="button" class="ms-toggle" data-ms="${msId}">Show MS</button>
        <div class="marking" id="${msId}">
          <h4>CIE-style mark scheme</h4>
          <p><strong>Expected answer:</strong> ${question.answer}</p>
          <ul class="ms-list">
            ${question.marking.map((point) => `<li><b>${point.mark}</b> ${point.text}</li>`).join("")}
          </ul>
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

setupPrint();
setupHook();
setupConverter();
setupExamples();
setupPractice();
setupRevealButtons();
renderExamQuestions();
