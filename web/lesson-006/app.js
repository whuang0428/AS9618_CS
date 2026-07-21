const examples = {
  binary: {
    title: "Example 1: 10.101₂ to denary",
    problem: "Convert 10.101₂ to denary.",
    steps: [
      "Write the active place values: 2, 1/2 and 1/8.",
      "Add them: 2 + 0.5 + 0.125.",
      "The total is 2.625.",
      "So 10.101₂ = 2.625₁₀.",
    ],
  },
  denary: {
    title: "Example 2: 0.625₁₀ to binary",
    problem: "Convert 0.625₁₀ to binary using fractional place values.",
    steps: [
      "Try 1/2: it fits, so write 1 and remainder is 0.125.",
      "Try 1/4: it does not fit, so write 0.",
      "Try 1/8: it fits, so write 1 and remainder is 0.",
      "So 0.625₁₀ = 0.101₂.",
    ],
  },
  precision: {
    title: "Example 3: 0.1₁₀ using four binary fractional bits",
    problem: "Approximate 0.1₁₀ using four fractional bits by truncation.",
    steps: [
      "1/2, 1/4 and 1/8 are too large, so the first three bits are 0.",
      "1/16 = 0.0625 fits, so the fourth bit is 1.",
      "With four fractional bits, the truncated value is 0.0001₂ = 0.0625₁₀.",
      "Representation error is 0.1 - 0.0625 = 0.0375.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Convert 0.1₂ to denary.", accepted: ["0.5", "1/2"], answer: "0.5₁₀" },
  { id: "p2", prompt: "Convert 0.101₂ to denary.", accepted: ["0.625", "5/8"], answer: "0.625₁₀" },
  { id: "p3", prompt: "Convert 10.101₂ to denary.", accepted: ["2.625", "2 5/8"], answer: "2.625₁₀" },
  { id: "p4", prompt: "Convert 0.75₁₀ to binary.", accepted: ["0.11", "0.11₂"], answer: "0.11₂" },
  { id: "p5", prompt: "Convert 0.875₁₀ to binary.", accepted: ["0.111", "0.111₂"], answer: "0.111₂" },
  { id: "p6", prompt: "What is the value of the fourth bit after the binary point?", accepted: ["1/16", "0.0625"], answer: "1/16 or 0.0625" },
  { id: "p7", prompt: "Name the process when extra fractional bits are cut off without rounding.", accepted: ["truncation", "truncate"], answer: "Truncation" },
  { id: "p8", prompt: "Why can limited binary places cause error?", accepted: ["approximation", "representation error", "not exact", "cannot represent exactly"], answer: "The stored value may be an approximation, causing representation error." },
  { id: "p9", prompt: "State one precise exam keyword connected to Binary fractions and precision limits.", accepted: ["keyword","definition","concept","method"], answer: "Use a precise syllabus keyword, then define or apply it in context." },
  { id: "p10", prompt: "What should an exam answer about Binary fractions and precision limits include besides a keyword?", accepted: ["context","reason","evidence","consequence","example"], answer: "It should include context, reason/evidence, and a clear consequence where relevant." }
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "3 marks",
    prompt: "Convert 10.101₂ to denary. Show your working.",
    answer: "10.101₂ = 2 + 1/2 + 1/8 = 2 + 0.5 + 0.125 = 2.625₁₀.",
    marking: [
      { mark: "M1", text: "identifies correct active place values, e.g. 2, 1/2 and 1/8" },
      { mark: "M1", text: "adds active place values correctly" },
      { mark: "A1", text: "2.625" },
    ],
    strict: [
      "Do not accept 10.101 as a denary value.",
      "Allow fraction form 2 5/8 for A1.",
      "Base labels are not required for the final mark if working is unambiguous, but they should be encouraged.",
    ],
  },
  {
    title: "Question 2",
    marks: "3 marks",
    prompt: "Convert 0.625₁₀ to binary.",
    answer: "0.625 = 1/2 + 1/8. The 1/2 and 1/8 columns are 1 and the 1/4 column is 0, so the result is 0.101₂.",
    marking: [
      { mark: "M1", text: "uses 1/2 as the first fractional place and selects it" },
      { mark: "M1", text: "skips 1/4 and selects 1/8, or equivalent repeated-multiplication method" },
      { mark: "A1", text: "0.101" },
    ],
    strict: [
      "Do not accept 0.625 written unchanged as a binary answer.",
      "Allow 0.1010 if trailing zero is clearly only a fixed-width pad.",
    ],
  },
  {
    title: "Question 3",
    marks: "4 marks",
    prompt: "A system stores only four binary fractional bits. Explain why storing 0.1₁₀ may produce a representation error.",
    answer: "0.1₁₀ cannot be represented exactly with four binary fractional places. The stored value is an approximation, so there is a difference between the intended value and the stored value.",
    marking: [
      { mark: "B1", text: "states or implies only a fixed / limited number of fractional bits is available" },
      { mark: "B1", text: "recognises that some denary fractions cannot be represented exactly in binary using that limit" },
      { mark: "B1", text: "explains that the stored value is an approximation" },
      { mark: "B1", text: "links approximation to representation error / difference from intended value" },
    ],
    strict: [
      "Do not accept only 'computers make mistakes'.",
      "Do not require floating-point terminology for this question.",
      "Accept truncation or rounding as a method that may introduce the approximation.",
      "Allow equivalent wording if the technical meaning is clear.",
    ],
  },
  {
    title: "Question 4",
    marks: "4 marks",
    prompt: "Using four fractional bits, approximate 0.3₁₀ by truncation and state the representation error.",
    answer: "0.0100₂ = 0.25₁₀, error = 0.05",
    marking: [
      { mark: "B1", text: "tests fractional place values 1/2, 1/4, 1/8, 1/16" },
      { mark: "B1", text: "selects 1/4 and rejects 1/2, 1/8, 1/16 for truncation after four places" },
      { mark: "B1", text: "0.0100" },
      { mark: "B1", text: "error 0.05" },
    ],
    strict: [
      "Do not award final answer mark for rounded answer 0.0101; the question specifies truncation.",
      "The answer must show four fractional bits or clearly state four-bit truncation.",
    ],
  },
  {
    title: "Question 5",
    marks: "3 marks",
    prompt: "State two differences between truncation and rounding when storing a binary fraction.",
    answer: "Truncation cuts off extra bits; rounding changes the retained value depending on the next bit. Rounding usually gives a closer approximation, but both can still produce representation error.",
    marking: [
      { mark: "B1", text: "truncation discards extra bits without adjustment" },
      { mark: "B1", text: "rounding may adjust the retained bits based on the next bit / nearest value" },
      { mark: "B1", text: "valid comparison, e.g. rounding is often closer but both may be approximate" },
    ],
    strict: [
      "Do not accept 'rounding is always correct'.",
      "Do not accept vague answers such as 'rounding is better' without a reason.",
      "Allow examples if they clearly show the contrast.",
    ],
  },
];

function normalise(value) {
  return value.trim().toLowerCase().replace(/[₀₁₂₂]/g, "").replace(/\s+/g, " ");
}

function parseBinaryFraction(value) {
  const clean = value.trim().replace(/₂/g, "");
  if (!/^[01]+(\.[01]+)?$/.test(clean) && !/^0?\.[01]+$/.test(clean)) {
    return null;
  }
  const [integerPart, fractionalPart = ""] = clean.split(".");
  let total = 0;
  for (let i = 0; i < integerPart.length; i += 1) {
    if (integerPart[integerPart.length - 1 - i] === "1") total += 2 ** i;
  }
  for (let i = 0; i < fractionalPart.length; i += 1) {
    if (fractionalPart[i] === "1") total += 2 ** -(i + 1);
  }
  return { clean, integerPart, fractionalPart, total };
}

function denaryFractionToBinary(value, places) {
  const integerPart = Math.floor(value);
  let fractional = value - integerPart;
  const integerBinary = integerPart.toString(2);
  let bits = "";
  const steps = [];

  for (let i = 1; i <= places; i += 1) {
    const place = 2 ** -i;
    if (fractional + Number.EPSILON >= place) {
      bits += "1";
      fractional -= place;
      steps.push(`Use 1/${2 ** i} (${place}); remainder ${roundForDisplay(fractional)}.`);
    } else {
      bits += "0";
      steps.push(`Skip 1/${2 ** i} (${place}); remainder still ${roundForDisplay(fractional)}.`);
    }
  }

  const stored = integerPart + bits.split("").reduce((sum, bit, index) => {
    return bit === "1" ? sum + 2 ** -(index + 1) : sum;
  }, 0);

  return {
    binary: `${integerBinary}.${bits}`,
    stored,
    error: Math.abs(value - stored),
    exact: Math.abs(value - stored) < 1e-12,
    steps,
  };
}

function roundForDisplay(value) {
  return Number.parseFloat(value.toFixed(10)).toString();
}

function renderBitVisual(binary) {
  const visual = document.querySelector("#bitVisual");
  const [integerPart, fractionalPart = ""] = binary.split(".");
  const cells = [];

  integerPart.split("").forEach((bit, index) => {
    const power = integerPart.length - 1 - index;
    cells.push({ bit, label: `2^${power}`, value: 2 ** power });
  });
  cells.push({ bit: ".", label: "point", value: "." });
  fractionalPart.split("").forEach((bit, index) => {
    const denominator = 2 ** (index + 1);
    cells.push({ bit, label: `2^-${index + 1}`, value: `1/${denominator}` });
  });

  visual.innerHTML = cells.map((cell) => `
    <div class="bit-card ${cell.bit === "1" ? "on" : cell.bit === "." ? "point" : "off"}">
      <span class="bit-value">${cell.bit}</span>
      <span class="place-value">${cell.label}</span>
      <span class="place-value">${cell.value}</span>
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
      if (button.dataset.hook === "half") {
        feedback.textContent = "Correct. 0.1₂ means one half, because the first place after the binary point is 2⁻¹.";
      } else if (button.dataset.hook === "one-tenth") {
        feedback.textContent = "That is the classic trap. In binary, 0.1₂ is not one tenth; it is 1/2.";
      } else {
        feedback.textContent = "The base label gives enough information here. Use the fractional place values.";
      }
    });
  });
}

function setupConverter() {
  const mode = document.querySelector("#convertMode");
  const input = document.querySelector("#convertValue");
  const precision = document.querySelector("#precisionBits");
  const result = document.querySelector("#convertResult");
  const method = document.querySelector("#convertMethod");

  function convert() {
    const raw = input.value.trim();
    const places = Number(precision.value);

    if (mode.value === "binaryToDenary") {
      const parsed = parseBinaryFraction(raw);
      if (!parsed) {
        result.textContent = "Enter a binary value such as 10.101 or 0.11.";
        method.textContent = "Use only 0, 1 and one binary point.";
        renderBitVisual("0.0000");
        return;
      }
      const active = [];
      parsed.integerPart.split("").forEach((bit, index) => {
        if (bit === "1") active.push(`${2 ** (parsed.integerPart.length - 1 - index)}`);
      });
      parsed.fractionalPart.split("").forEach((bit, index) => {
        if (bit === "1") active.push(`1/${2 ** (index + 1)}`);
      });
      result.textContent = `${parsed.clean}₂ = ${roundForDisplay(parsed.total)}₁₀`;
      method.textContent = active.length
        ? `Active place values: ${active.join(" + ")}.`
        : "No active place values; the value is 0.";
      renderBitVisual(parsed.clean.includes(".") ? parsed.clean : `${parsed.clean}.0`);
      return;
    }

    const value = Number(raw);
    if (!Number.isFinite(value) || value < 0 || value > 15.999) {
      result.textContent = "Enter a non-negative denary value less than 16.";
      method.textContent = "This tool keeps the range small so the fractional pattern is visible.";
      renderBitVisual("0.0000");
      return;
    }
    const converted = denaryFractionToBinary(value, places);
    result.textContent = `${value}₁₀ ≈ ${converted.binary}₂ using ${places} fractional bits`;
    method.textContent = `${converted.steps.join(" ")} Stored value ${roundForDisplay(converted.stored)}; error ${roundForDisplay(converted.error)}${converted.exact ? " (exact)." : "."}`;
    renderBitVisual(converted.binary);
  }

  mode.addEventListener("change", () => {
    input.value = mode.value === "binaryToDenary" ? "10.101" : "0.625";
    convert();
  });
  input.addEventListener("input", convert);
  precision.addEventListener("change", convert);
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
      const isCorrect = item.accepted.some((answer) => normalise(answer) === normalise(input.value));
      mark.textContent = isCorrect ? "Correct" : "Try again";
      mark.className = `mark ${isCorrect ? "correct" : "incorrect"}`;
      if (isCorrect) correct += 1;
    });
    document.querySelector("#practiceFeedback").textContent = `${correct}/${practice.length} correct. Check place values before checking the final decimal.`;
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
  setupConverter();
  setupExamples();
  renderPractice();
  setupPractice();
  renderExamQuestions();
}

init();
