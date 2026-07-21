const examples = {
  fit: {
    title: "Example 1: result fits in 8 bits",
    problem: "Add 00110101₂ and 00010110₂.",
    steps: [
      "Work from the rightmost bit and carry left when a column total is 2 or 3.",
      "00110101₂ is 53₁₀ and 00010110₂ is 22₁₀.",
      "53 + 22 = 75, which is within the unsigned 8-bit range.",
      "The 8-bit binary result is 01001011₂. No overflow occurs.",
    ],
  },
  overflow: {
    title: "Example 2: carry-out overflow",
    problem: "Add 11110000₂ and 00010000₂.",
    steps: [
      "11110000₂ is 240₁₀ and 00010000₂ is 16₁₀.",
      "240 + 16 = 256.",
      "An unsigned 8-bit value can store only 0 to 255.",
      "The written 8-bit result is 00000000₂ with a carry-out of 1, so overflow occurs.",
    ],
  },
  boundary: {
    title: "Example 3: boundary without unsigned overflow",
    problem: "Add 01111111₂ and 00000001₂.",
    steps: [
      "01111111₂ is 127₁₀ and 00000001₂ is 1₁₀.",
      "127 + 1 = 128.",
      "128 can be represented as 10000000₂ in unsigned 8-bit binary.",
      "No unsigned overflow occurs because there is no ninth carry-out.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "00110101₂ + 00010110₂ = ?", accepted: ["01001011", "01001011₂"], answer: "01001011₂, no overflow" },
  { id: "p2", prompt: "11110000₂ + 00010000₂ = ? (8-bit result)", accepted: ["00000000", "00000000₂"], answer: "00000000₂ with carry-out, overflow" },
  { id: "p3", prompt: "01111111₂ + 00000001₂ = ?", accepted: ["10000000", "10000000₂"], answer: "10000000₂, no unsigned overflow" },
  { id: "p4", prompt: "11001010₂ + 01110101₂ = ? (8-bit result)", accepted: ["00111111", "00111111₂"], answer: "00111111₂ with carry-out, overflow" },
  { id: "p5", prompt: "Does 00110101₂ + 00010110₂ overflow? yes/no", accepted: ["no", "no overflow"], answer: "No overflow" },
  { id: "p6", prompt: "Does 11110000₂ + 00010000₂ overflow? yes/no", accepted: ["yes", "overflow", "yes overflow"], answer: "Yes, overflow" },
  { id: "p7", prompt: "What is the largest unsigned 8-bit denary value?", accepted: ["255", "255₁₀"], answer: "255" },
  { id: "p8", prompt: "What does 1 + 1 produce in binary?", accepted: ["10", "10₂", "sum 0 carry 1", "0 carry 1"], answer: "10₂: write 0 and carry 1" },
  { id: "p9", prompt: "State one precise exam keyword connected to Binary addition, carries and overflow.", accepted: ["keyword","definition","concept","method"], answer: "Use a precise syllabus keyword, then define or apply it in context." },
  { id: "p10", prompt: "What should an exam answer about Binary addition, carries and overflow include besides a keyword?", accepted: ["context","reason","evidence","consequence","example"], answer: "It should include context, reason/evidence, and a clear consequence where relevant." }
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "4 marks",
    prompt: "Add 00110101₂ and 00010110₂ using 8-bit binary addition. Show the result.",
    answer: "01001011₂",
    marking: [
      { mark: "M1", text: "aligns both 8-bit binary values correctly" },
      { mark: "M1", text: "shows or applies carries correctly in the low-order columns" },
      { mark: "M1", text: "continues addition correctly across all 8 bits" },
      { mark: "A1", text: "01001011" },
    ],
    strict: [
      "Do not award A1 if the result has fewer than 8 bits and no clear 8-bit context.",
      "Allow FT for one arithmetic slip if the carry method is clear.",
      "No overflow explanation is required unless stated.",
    ],
  },
  {
    title: "Question 2",
    marks: "4 marks",
    prompt: "Add 11110000₂ and 00010000₂. State whether overflow occurs.",
    answer: "00000000₂ with carry-out 1; overflow occurs.",
    marking: [
      { mark: "M1", text: "adds the binary values to produce a carry-out beyond bit 7" },
      { mark: "A1", text: "8-bit result 00000000" },
      { mark: "B1", text: "states that overflow occurs" },
      { mark: "B1", text: "explains that the true result exceeds the unsigned 8-bit range / cannot fit in 8 bits" },
    ],
    strict: [
      "Do not accept only 'there is a carry' as the overflow explanation.",
      "Accept denary support: 240 + 16 = 256, which is greater than 255.",
      "Do not discuss signed two's complement overflow for this question.",
      "Allow equivalent wording if the technical meaning is clear.",
    ],
  },
  {
    title: "Question 3",
    marks: "3 marks",
    prompt: "Explain why an internal carry during binary addition does not always mean overflow.",
    answer: "Internal carries are used in later columns; overflow only occurs if the final result cannot fit in the available bit width.",
    marking: [
      { mark: "B1", text: "states that carries may move from one column to the next during normal addition" },
      { mark: "B1", text: "states that overflow depends on the fixed number of bits / available range" },
      { mark: "B1", text: "gives a valid example or consequence, e.g. no carry-out beyond the leftmost bit means no unsigned overflow" },
    ],
    strict: [
      "Do not accept 'carry is fine but overflow is bad' without technical explanation.",
      "Accept range-based explanation using 0 to 255 for unsigned 8-bit values.",
      "Allow equivalent wording if the technical meaning is clear.",
    ],
  },
  {
    title: "Question 4",
    marks: "4 marks",
    prompt: "Add 11001010₂ and 01110101₂ using 8-bit binary addition and identify overflow.",
    answer: "00111111₂ with a carry-out; overflow occurs.",
    marking: [
      { mark: "M1", text: "shows a correct carry process / carry row" },
      { mark: "A1", text: "8-bit result 00111111" },
      { mark: "B1", text: "identifies a carry-out beyond the 8-bit result" },
      { mark: "B1", text: "states that overflow occurs because the true result is greater than 255 / cannot fit in 8 bits" },
    ],
    strict: [
      "Do not award overflow explanation for saying only 'the leftmost bit is 1'.",
      "Accept denary check: 202 + 117 = 319.",
      "Do not require signed interpretation.",
      "Allow equivalent wording if the technical meaning is clear.",
    ],
  },
  {
    title: "Question 5",
    marks: "3 marks",
    prompt: "A candidate says 01111111₂ + 00000001₂ overflows because the answer is 10000000₂. Explain whether this is correct for unsigned 8-bit addition.",
    answer: "It is not correct. 10000000₂ is 128₁₀ and fits in unsigned 8-bit range, so no overflow occurs.",
    marking: [
      { mark: "B1", text: "states that the candidate is incorrect / no unsigned overflow occurs" },
      { mark: "B1", text: "states that 10000000₂ represents 128 in unsigned binary" },
      { mark: "B1", text: "explains that 128 is within the unsigned 8-bit range / no carry-out occurs" },
    ],
    strict: [
      "Do not accept signed interpretation for this lesson.",
      "Do not award the final mark for saying only 'it still has 8 bits' without range or carry-out reasoning.",
      "Allow equivalent wording if the technical meaning is clear.",
    ],
  },
];

function normalise(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function isByte(value) {
  return /^[01]{8}$/.test(value.trim());
}

function byteToDenary(value) {
  return Number.parseInt(value, 2);
}

function toByte(value) {
  return (value & 255).toString(2).padStart(8, "0");
}

function addBytes(a, b) {
  const aNum = byteToDenary(a);
  const bNum = byteToDenary(b);
  const total = aNum + bNum;
  const result = toByte(total);
  const overflow = total > 255;
  const carryOut = overflow ? "1" : "0";
  const columnTotals = [];
  let carry = 0;
  const resultBits = [];
  const carryIns = [];
  for (let i = 7; i >= 0; i -= 1) {
    carryIns[i] = carry;
    const sum = Number(a[i]) + Number(b[i]) + carry;
    resultBits[i] = String(sum % 2);
    columnTotals[i] = sum;
    carry = sum >= 2 ? 1 : 0;
  }
  return { aNum, bNum, total, result, overflow, carryOut, carryIns, columnTotals, resultBits };
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
      if (button.dataset.hook === "overflow") {
        feedback.textContent = "Correct. A ninth bit cannot be stored in an 8-bit result, so unsigned overflow occurs.";
      } else if (button.dataset.hook === "negative") {
        feedback.textContent = "That is a signed-binary idea. This lesson is unsigned 8-bit addition.";
      } else {
        feedback.textContent = "Not quite. The key issue is fixed width: only eight result bits are available.";
      }
    });
  });
}

function renderAdditionVisual(a, b, data) {
  const visual = document.querySelector("#additionVisual");
  visual.innerHTML = `
    <div class="add-row carry"><span>carry in</span>${data.carryIns.map((carry) => `<b>${carry || ""}</b>`).join("")}</div>
    <div class="add-row"><span>A</span>${a.split("").map((bit) => `<b>${bit}</b>`).join("")}</div>
    <div class="add-row"><span>B</span>${b.split("").map((bit) => `<b>${bit}</b>`).join("")}</div>
    <div class="add-row result"><span>result</span>${data.result.split("").map((bit) => `<b>${bit}</b>`).join("")}</div>
    <div class="carry-out">Carry-out beyond 8 bits: <strong>${data.carryOut}</strong></div>
  `;
}

function setupAdder() {
  const inputA = document.querySelector("#addA");
  const inputB = document.querySelector("#addB");
  const result = document.querySelector("#addResult");
  const method = document.querySelector("#addMethod");

  function add() {
    const a = inputA.value.trim();
    const b = inputB.value.trim();
    if (!isByte(a) || !isByte(b)) {
      result.textContent = "Enter two 8-bit binary values using only 0 and 1.";
      method.textContent = "Example: 00110101 and 00010110.";
      document.querySelector("#additionVisual").innerHTML = "";
      return;
    }
    const data = addBytes(a, b);
    result.textContent = `${a}₂ + ${b}₂ = ${data.result}₂${data.overflow ? " with overflow" : " with no overflow"}`;
    method.textContent = `${data.aNum} + ${data.bNum} = ${data.total}. ${data.total > 255 ? "This exceeds 255, so an unsigned 8-bit overflow occurs." : "This fits in the unsigned 8-bit range."}`;
    renderAdditionVisual(a, b, data);
  }

  inputA.addEventListener("input", add);
  inputB.addEventListener("input", add);
  document.querySelector("#addBtn").addEventListener("click", add);
  add();
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
  renderExample("fit");
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
    document.querySelector("#practiceFeedback").textContent = `${correct}/${practice.length} correct. For overflow questions, include the 8-bit result and the overflow decision.`;
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
setupAdder();
setupExamples();
setupPractice();
setupRevealButtons();
renderExamQuestions();
