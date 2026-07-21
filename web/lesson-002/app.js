const placeValues = [128, 64, 32, 16, 8, 4, 2, 1];

const examples = {
  binary: {
    title: "Example 1: 10110110₂ to denary",
    problem: "Convert 10110110₂ to denary.",
    steps: [
      "Write the place values: 128, 64, 32, 16, 8, 4, 2, 1.",
      "Line up the bits: 1 0 1 1 0 1 1 0.",
      "Add only the columns with a 1: 128 + 32 + 16 + 4 + 2.",
      "128 + 32 + 16 + 4 + 2 = 182, so 10110110₂ = 182₁₀.",
    ],
  },
  denary: {
    title: "Example 2: 77₁₀ to 8-bit binary",
    problem: "Convert 77₁₀ to 8-bit binary.",
    steps: [
      "128 does not fit into 77, so write 0.",
      "64 fits: write 1 and subtract 64. Remainder = 13.",
      "32 and 16 do not fit: write 0, 0.",
      "8 fits: write 1. Remainder = 5.",
      "4 fits: write 1. Remainder = 1.",
      "2 does not fit: write 0. 1 fits: write 1.",
      "77₁₀ = 01001101₂.",
    ],
  },
  zero: {
    title: "Example 3: leading zeros",
    problem: "Explain why 00000111₂ and 111₂ have the same value.",
    steps: [
      "00000111₂ counts the columns 4, 2 and 1.",
      "4 + 2 + 1 = 7.",
      "111₂ also counts 4, 2 and 1.",
      "The leading zeros do not change the value; they show that the value is written using 8 bits.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Convert 10110110₂ to denary.", accepted: ["182", "182 denary", "182₁₀"], answer: "182" },
  { id: "p2", prompt: "Convert 01001101₂ to denary.", accepted: ["77", "77 denary", "77₁₀"], answer: "77" },
  { id: "p3", prompt: "Convert 11111111₂ to denary.", accepted: ["255", "255 denary", "255₁₀"], answer: "255" },
  { id: "p4", prompt: "Convert 19₁₀ to 8-bit binary.", accepted: ["00010011", "00010011₂"], answer: "00010011₂" },
  { id: "p5", prompt: "Convert 104₁₀ to 8-bit binary.", accepted: ["01101000", "01101000₂"], answer: "01101000₂" },
  { id: "p6", prompt: "Convert 250₁₀ to 8-bit binary.", accepted: ["11111010", "11111010₂"], answer: "11111010₂" },
  { id: "p7", prompt: "State the largest positive denary integer that can be represented in 8 bits.", accepted: ["255", "255₁₀"], answer: "255" },
  { id: "p8", prompt: "Does 00001010₂ have the same value as 1010₂? Answer yes or no.", accepted: ["yes", "yes same value", "yes, same value"], answer: "Yes. Both represent 10, but only 00001010₂ is 8-bit." },
  { id: "p9", prompt: "State one precise exam keyword connected to Binary place value and denary conversion.", accepted: ["keyword","definition","concept","method"], answer: "Use a precise syllabus keyword, then define or apply it in context." },
  { id: "p10", prompt: "What should an exam answer about Binary place value and denary conversion include besides a keyword?", accepted: ["context","reason","evidence","consequence","example"], answer: "It should include context, reason/evidence, and a clear consequence where relevant." }
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "3 marks",
    prompt: "Convert 10110110₂ to denary. Show your working.",
    answer: "182",
    marking: [
      { mark: "M1", text: "shows correct 8-bit place values, e.g. 128, 64, 32, 16, 8, 4, 2, 1" },
      { mark: "M1", text: "selects/adds the active columns 128 + 32 + 16 + 4 + 2" },
      { mark: "A1", text: "182" },
    ],
    strict: [
      "Do not award M1 for adding all place values without reference to the bit pattern.",
      "Allow FT for arithmetic slip if the active columns are correct.",
      "Base label is not required for the final denary value if the question wording is clear.",
    ],
  },
  {
    title: "Question 2",
    marks: "4 marks",
    prompt: "Convert 77₁₀ to 8-bit binary. Show your method.",
    answer: "01001101₂",
    marking: [
      { mark: "M1", text: "uses 8-bit place values from 128 to 1" },
      { mark: "M1", text: "selects 64, 8, 4 and 1" },
      { mark: "M1", text: "places zeros in non-selected columns, including the leading 0 for 128" },
      { mark: "A1", text: "01001101" },
    ],
    strict: [
      "Do not accept 1001101 as the 8-bit answer; it is missing the leading zero.",
      "Allow A1 if the subscript ₂ is omitted but the binary digits are correct.",
      "Do not award method marks for repeated division if the remainders are written in the wrong order.",
    ],
  },
  {
    title: "Question 3",
    marks: "2 marks",
    prompt: "State the range of unsigned 8-bit binary values in denary.",
    answer: "0 to 255",
    marking: [
      { mark: "B1", text: "minimum value is 0" },
      { mark: "B1", text: "maximum value is 255" },
    ],
    strict: [
      "Accept 00000000₂ to 11111111₂ with denary values stated.",
      "Do not accept -128 to 127; that is a signed range and is not this lesson.",
      "Allow equivalent wording if the technical meaning is clear.",
    ],
  },
  {
    title: "Question 4",
    marks: "3 marks",
    prompt: "Explain why 00001010₂ and 1010₂ have the same denary value but are not written with the same number of bits.",
    answer: "Both have value 10, but 00001010₂ is written with 8 bits while 1010₂ is written with 4 bits.",
    marking: [
      { mark: "B1", text: "identifies that leading zeros do not change the denary value" },
      { mark: "B1", text: "states that both values are 10 / both count 8 + 2" },
      { mark: "B1", text: "states that 00001010 is 8-bit while 1010 is 4-bit" },
    ],
    strict: [
      "Do not accept 'zeros do not matter' unless it is clear that this refers to leading zeros.",
      "Do not award the bit-width mark if the answer only says 'one is longer'.",
      "Allow equivalent wording if the technical meaning is clear.",
    ],
  },
  {
    title: "Question 5",
    marks: "4 marks",
    prompt: "A candidate converts 10000001₂ to 129₁₀. Explain whether the answer is correct.",
    answer: "Correct, because 10000001₂ uses the 128 and 1 columns, and 128 + 1 = 129.",
    marking: [
      { mark: "B1", text: "states that the answer is correct" },
      { mark: "M1", text: "identifies the active columns as 128 and 1" },
      { mark: "A1", text: "calculates 128 + 1 = 129" },
      { mark: "B1", text: "explains that zero columns are not counted" },
    ],
    strict: [
      "Do not award B1 for saying correct without supporting working.",
      "Accept equivalent wording such as 'only the 1 bits contribute to the value'.",
      "Do not discuss signed representation; this question is about positive binary place value.",
      "Allow equivalent wording if the technical meaning is clear.",
    ],
  },
];

function normalise(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function isBinary(value) {
  return /^[01]{1,8}$/.test(value);
}

function pad8(value) {
  return value.toString(2).padStart(8, "0");
}

function binaryToDenary(binary) {
  const padded = binary.padStart(8, "0");
  return padded.split("").reduce((total, bit, index) => total + (bit === "1" ? placeValues[index] : 0), 0);
}

function denaryToBinary(value) {
  let remainder = value;
  const bits = [];
  const steps = [];
  placeValues.forEach((place) => {
    if (place <= remainder) {
      bits.push("1");
      remainder -= place;
      steps.push(`${place} fits: write 1, remainder ${remainder}`);
    } else {
      bits.push("0");
      steps.push(`${place} does not fit: write 0`);
    }
  });
  return { binary: bits.join(""), steps };
}

function renderBitVisual(binary) {
  const visual = document.querySelector("#bitVisual");
  const padded = binary.padStart(8, "0");
  visual.innerHTML = placeValues.map((value, index) => {
    const bit = padded[index];
    return `
      <div class="bit-card ${bit === "1" ? "on" : "off"}">
        <span class="bit-value">${bit}</span>
        <span class="place-value">${value}</span>
      </div>
    `;
  }).join("");
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
      if (button.dataset.hook === "high") {
        feedback.textContent = "Correct. 10110110₂ is 182₁₀, so it is closer to 200.";
      } else if (button.dataset.hook === "unknown") {
        feedback.textContent = "The columns are needed for proof, but the value can be found once the 8-bit row is known.";
      } else {
        feedback.textContent = "Not quite. Count the active columns: 128 + 32 + 16 + 4 + 2.";
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
    const value = input.value.trim();
    if (mode.value === "binaryToDenary") {
      if (!isBinary(value)) {
        result.textContent = "Enter 1 to 8 binary digits using only 0 and 1.";
        method.textContent = "Example input: 10110110";
        renderBitVisual("00000000");
        return;
      }
      const padded = value.padStart(8, "0");
      const denary = binaryToDenary(value);
      const active = padded
        .split("")
        .map((bit, index) => bit === "1" ? placeValues[index] : null)
        .filter((item) => item !== null);
      result.textContent = `${padded}₂ = ${denary}₁₀`;
      method.textContent = active.length ? `Active columns: ${active.join(" + ")} = ${denary}.` : "No active columns: value is 0.";
      renderBitVisual(padded);
      return;
    }

    const denary = Number(value);
    if (!Number.isInteger(denary) || denary < 0 || denary > 255) {
      result.textContent = "Enter a whole number from 0 to 255.";
      method.textContent = "8-bit unsigned binary can represent 0 to 255.";
      renderBitVisual("00000000");
      return;
    }
    const converted = denaryToBinary(denary);
    result.textContent = `${denary}₁₀ = ${converted.binary}₂`;
    method.textContent = converted.steps.join(" | ");
    renderBitVisual(converted.binary);
  }

  mode.addEventListener("change", () => {
    input.value = mode.value === "binaryToDenary" ? "10110110" : "77";
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
  renderExample("binary");
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
    document.querySelector("#practiceFeedback").textContent = `${correct}/${practice.length} correct. Check the columns before checking the arithmetic.`;
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
          <p class="strict-title">Strict marking notes</p>
          <ul class="strict-list">
            ${question.strict.map((note) => `<li>${note}</li>`).join("")}
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
