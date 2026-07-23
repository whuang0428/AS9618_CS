const hexDigits = "0123456789ABCDEF";

const examples = {
  binary: {
    title: "Example 1: 1101 0110₂ to hexadecimal",
    problem: "Convert 1101 0110₂ to hexadecimal.",
    steps: [
      "Split into 4-bit groups: 1101 and 0110.",
      "1101₂ maps to D₁₆.",
      "0110₂ maps to 6₁₆.",
      "So 1101 0110₂ = D6₁₆.",
    ],
  },
  hex: {
    title: "Example 2: A7₁₆ to binary",
    problem: "Convert A7₁₆ to binary.",
    steps: [
      "A₁₆ is denary 10, so it maps to 1010₂.",
      "7₁₆ maps to 0111₂.",
      "Keep all four bits for each hex digit.",
      "So A7₁₆ = 1010 0111₂.",
    ],
  },
  padding: {
    title: "Example 3: 101101₂ to hexadecimal",
    problem: "Convert 101101₂ to hexadecimal.",
    steps: [
      "Group from the right: 10 1101.",
      "Pad the left group: 0010 1101.",
      "0010₂ maps to 2₁₆ and 1101₂ maps to D₁₆.",
      "So 101101₂ = 2D₁₆.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Convert 11010110₂ to hexadecimal.", accepted: ["d6", "d6₁₆", "0xd6"], answer: "D6₁₆" },
  { id: "p2", prompt: "Convert 11110000₂ to hexadecimal.", accepted: ["f0", "f0₁₆", "0xf0"], answer: "F0₁₆" },
  { id: "p3", prompt: "Convert 10101010₂ to hexadecimal.", accepted: ["aa", "aa₁₆", "0xaa"], answer: "AA₁₆" },
  { id: "p4", prompt: "Convert 101101₂ to hexadecimal.", accepted: ["2d", "2d₁₆", "0x2d"], answer: "2D₁₆" },
  { id: "p5", prompt: "Convert A7₁₆ to binary.", accepted: ["10100111", "1010 0111", "10100111₂", "1010 0111₂"], answer: "1010 0111₂" },
  { id: "p6", prompt: "Convert 3C₁₆ to binary.", accepted: ["00111100", "0011 1100", "00111100₂", "0011 1100₂"], answer: "0011 1100₂" },
  { id: "p7", prompt: "What denary value does the hex digit E represent?", accepted: ["14", "14₁₀", "fourteen"], answer: "14" },
  { id: "p8", prompt: "How many bits are represented by 5 hexadecimal digits?", accepted: ["20", "20 bits"], answer: "20 bits" },
  { id: "p9", prompt: "State one precise exam keyword connected to Hexadecimal notation and binary grouping.", accepted: ["keyword","definition","concept","method"], answer: "Use a precise syllabus keyword, then define or apply it in context." },
  { id: "p10", prompt: "What should an exam answer about Hexadecimal notation and binary grouping include besides a keyword?", accepted: ["context","reason","evidence","consequence","example"], answer: "It should include context, reason/evidence, and a clear consequence where relevant." }
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "3 marks",
    prompt: "Convert 11010110₂ to hexadecimal. Show your grouping.",
    answer: "Group from the right: 1101 0110. 1101₂ = D₁₆ and 0110₂ = 6₁₆, so the result is D6₁₆.",
    marking: [
      { mark: "M1", text: "groups the binary value into nibbles correctly, e.g. 1101 0110" },
      { mark: "M1", text: "converts 1101₂ to D and 0110₂ to 6" },
      { mark: "A1", text: "D6" },
    ],
    strict: [
      "Do not award the grouping mark if the bits are grouped from the wrong side.",
      "Allow final answer without subscript if the value is clearly hexadecimal.",
      "Do not require denary conversion; nibble mapping is sufficient.",
    ],
  },
  {
    title: "Question 2",
    marks: "3 marks",
    prompt: "Convert A7₁₆ to binary.",
    answer: "Convert each hexadecimal digit to four bits: A₁₆ = 1010₂ and 7₁₆ = 0111₂. Therefore A7₁₆ = 1010 0111₂.",
    marking: [
      { mark: "B1", text: "converts A to 1010" },
      { mark: "B1", text: "converts 7 to 0111" },
      { mark: "A1", text: "1010 0111 / 10100111" },
    ],
    strict: [
      "Do not accept 1010 111 as a final answer; each hex digit must map to four bits.",
      "Allow omitted spaces between nibbles.",
      "Allow lower-case a in the working.",
    ],
  },
  {
    title: "Question 3",
    marks: "3 marks",
    prompt: "Convert 101101₂ to hexadecimal. Show how padding is used.",
    answer: "Group from the right and pad the left group: 101101₂ -> 0010 1101₂. 0010₂ = 2₁₆ and 1101₂ = D₁₆, so the result is 2D₁₆.",
    marking: [
      { mark: "M1", text: "groups from the right, e.g. 10 1101" },
      { mark: "M1", text: "pads the left group with leading zeros, e.g. 0010 1101" },
      { mark: "A1", text: "2D" },
    ],
    strict: [
      "Do not accept B or 0B; that uses the leftmost four bits incorrectly.",
      "Padding must be leading zeros, not trailing zeros.",
    ],
  },
  {
    title: "Question 4",
    marks: "3 marks",
    prompt: "Explain why one hexadecimal digit can represent four binary bits.",
    answer: "Four bits can form 16 different patterns, and hexadecimal has 16 digits from 0 to F.",
    marking: [
      { mark: "B1", text: "states that four bits give 16 possible patterns / values 0 to 15" },
      { mark: "B1", text: "states that hexadecimal has 16 digits / symbols 0-9 and A-F" },
      { mark: "B1", text: "links one 4-bit group to one hexadecimal digit" },
    ],
    strict: [
      "Do not accept only 'hex is shorter' without explaining the 4-bit mapping.",
      "Accept 2^4 = 16 as evidence for the first mark.",
      "Allow equivalent wording if the technical meaning is clear.",
    ],
  },
  {
    title: "Question 5",
    marks: "4 marks",
    prompt: "A candidate converts 3C₁₆ to 111100₂. Explain the error and give the correct binary value.",
    answer: "3C₁₆ = 0011 1100₂. The candidate omitted the leading zeros in the 3 nibble.",
    marking: [
      { mark: "B1", text: "identifies that 3 should be written as 0011, not 11" },
      { mark: "B1", text: "converts C to 1100" },
      { mark: "A1", text: "correct binary value 0011 1100 / 00111100" },
      { mark: "B1", text: "explains that each hex digit must be represented by four bits" },
    ],
    strict: [
      "Do not award the final A1 for 111100 alone.",
      "Allow the explanation mark even if the final binary value has no space between nibbles.",
      "Do not discuss signed binary or overflow; this is a notation conversion question.",
    ],
  },
];

function normalise(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function isBinary(value) {
  return /^[01]{1,16}$/.test(value.replace(/\s+/g, ""));
}

function isHex(value) {
  return /^[0-9a-fA-F]{1,4}$/.test(value.replace(/^0x/i, "").replace(/\s+/g, ""));
}

function nibbleToHex(nibble) {
  return hexDigits[Number.parseInt(nibble, 2)];
}

function hexToNibble(hex) {
  return Number.parseInt(hex, 16).toString(2).padStart(4, "0");
}

function groupBinary(binary) {
  const cleaned = binary.replace(/\s+/g, "");
  const padding = (4 - (cleaned.length % 4)) % 4;
  const padded = `${"0".repeat(padding)}${cleaned}`;
  const groups = padded.match(/.{1,4}/g) || [];
  return { cleaned, padding, padded, groups };
}

function binaryToHex(binary) {
  const grouped = groupBinary(binary);
  return {
    ...grouped,
    hex: grouped.groups.map(nibbleToHex).join(""),
  };
}

function hexToBinary(hex) {
  const cleaned = hex.replace(/^0x/i, "").replace(/\s+/g, "").toUpperCase();
  const groups = cleaned.split("").map((digit) => ({
    digit,
    nibble: hexToNibble(digit),
  }));
  return {
    cleaned,
    binary: groups.map((group) => group.nibble).join(""),
    groups,
  };
}

function renderNibbleVisual(groups, labels) {
  const visual = document.querySelector("#nibbleVisual");
  visual.innerHTML = groups.map((group, index) => `
    <div class="nibble-card">
      <span class="nibble-bits">${group}</span>
      <span class="nibble-label">${labels[index]}</span>
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
      if (button.dataset.hook === "hex") {
        feedback.textContent = "Correct for compact copying, as long as you know D6₁₆ maps back to 1101 0110₂.";
      } else if (button.dataset.hook === "depends") {
        feedback.textContent = "Fair. Hex is useful because the mapping is systematic, not because it is magic.";
      } else {
        feedback.textContent = "Check the mapping: D6₁₆ represents the same bit pattern using fewer characters.";
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
    if (mode.value === "binaryToHex") {
      if (!isBinary(value)) {
        result.textContent = "Enter 1 to 16 binary digits using only 0 and 1.";
        method.textContent = "Spaces are allowed between nibbles.";
        renderNibbleVisual(["0000"], ["0"]);
        return;
      }
      const converted = binaryToHex(value);
      result.textContent = `${converted.cleaned}₂ = ${converted.hex}₁₆`;
      method.textContent = converted.padding
        ? `Pad with ${converted.padding} leading zero(s): ${converted.padded}. Groups: ${converted.groups.join(" ")}.`
        : `Groups: ${converted.groups.join(" ")}. Convert each nibble separately.`;
      renderNibbleVisual(converted.groups, converted.groups.map(nibbleToHex));
      return;
    }

    if (!isHex(value)) {
      result.textContent = "Enter 1 to 4 hexadecimal digits using 0-9 and A-F.";
      method.textContent = "Example input: A7 or 0xA7.";
      renderNibbleVisual(["0000"], ["0"]);
      return;
    }
    const converted = hexToBinary(value);
    result.textContent = `${converted.cleaned}₁₆ = ${converted.groups.map((group) => group.nibble).join(" ")}₂`;
    method.textContent = converted.groups.map((group) => `${group.digit}₁₆ = ${group.nibble}₂`).join(" | ");
    renderNibbleVisual(converted.groups.map((group) => group.nibble), converted.groups.map((group) => group.digit));
  }

  mode.addEventListener("change", () => {
    input.value = mode.value === "binaryToHex" ? "11010110" : "A7";
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
    document.querySelector("#practiceFeedback").textContent = `${correct}/${practice.length} correct. Check grouping and keep four bits per hex digit.`;
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
