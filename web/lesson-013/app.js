const examples = {
  encode: {
    title: "Example 1: RLE encode",
    problem: "Encode AAAAAABBBBCCCCCCCC using run-length encoding.",
    steps: [
      "Count the first run: AAAAAA is 6A.",
      "Count the next run: BBBB is 4B.",
      "Count the final run: CCCCCCCC is 8C.",
      "Compressed form: 6A4B8C.",
    ],
  },
  decode: {
    title: "Example 2: RLE decode",
    problem: "Decode 3A2B1C.",
    steps: [
      "3A means AAA.",
      "2B means BB.",
      "1C means C.",
      "Original data: AAABBC.",
    ],
  },
  dictionary: {
    title: "Example 3: dictionary-style compression",
    problem: "Explain how COMPUTER COMPUTER COMPUTER could be compressed.",
    steps: [
      "The repeated pattern is COMPUTER.",
      "Store COMPUTER once in a dictionary, for example #1 = COMPUTER.",
      "Replace repeated occurrences with #1.",
      "The original can be reconstructed by replacing #1 with COMPUTER.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "RLE encode AAAAAABBBBCCCCCCCC.", accepted: ["6A4B8C", "6a4b8c"], answer: "6A4B8C" },
  { id: "p2", prompt: "RLE encode AAABBCCCC.", accepted: ["3A2B4C", "3a2b4c"], answer: "3A2B4C" },
  { id: "p3", prompt: "Decode 3A2B1C.", accepted: ["AAABBC", "aaabbc"], answer: "AAABBC" },
  { id: "p4", prompt: "Decode 2A3B4C1D.", accepted: ["AABBBCCCCD", "aabbbccccd"], answer: "AABBBCCCCD" },
  { id: "p5", prompt: "Which method stores repeated patterns once and uses references?", accepted: ["dictionary", "dictionary-style compression", "dictionary compression"], answer: "Dictionary-style compression" },
  { id: "p6", prompt: "Is RLE lossless if it can reconstruct the exact original?", accepted: ["yes"], answer: "Yes" },
  { id: "p7", prompt: "Is ABABABAB usually good for simple RLE?", accepted: ["no"], answer: "No" },
  { id: "p8", prompt: "What does the number mean in 6A?", accepted: ["count", "run length", "number of repeats", "six a characters"], answer: "The run length / count." },
  { id: "p9", prompt: "State one precise exam keyword connected to Run-length encoding and dictionary-style compression.", accepted: ["keyword","definition","concept","method"], answer: "Use a precise syllabus keyword, then define or apply it in context." },
  { id: "p10", prompt: "What should an exam answer about Run-length encoding and dictionary-style compression include besides a keyword?", accepted: ["context","reason","evidence","consequence","example"], answer: "It should include context, reason/evidence, and a clear consequence where relevant." }
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "3 marks",
    prompt: "Use run-length encoding to encode AAAAAABBBBCCCCCCCC.",
    answer: "6A4B8C",
    marking: [
      { mark: "B1", text: "correctly encodes six A characters as 6A" },
      { mark: "B1", text: "correctly encodes four B characters as 4B" },
      { mark: "B1", text: "correctly encodes eight C characters as 8C" },
    ],
    strict: [
      "Do not accept 5A4B8C.",
      "Allow equivalent notation such as (6,A)(4,B)(8,C) if unambiguous.",
      "The order of runs must be preserved.",
    ],
  },
  {
    title: "Question 2",
    marks: "3 marks",
    prompt: "Decode the run-length encoded data 3A2B1C.",
    answer: "AAABBC",
    marking: [
      { mark: "B1", text: "expands 3A to AAA" },
      { mark: "B1", text: "expands 2B to BB" },
      { mark: "B1", text: "expands 1C to C / final answer AAABBC" },
    ],
    strict: [
      "Do not accept A3B2C1 unless the question asks for encoded form.",
      "Order must be preserved.",
      "Allow lowercase only if the original data is not case-sensitive in the stated context.",
    ],
  },
  {
    title: "Question 3",
    marks: "4 marks",
    prompt: "Explain why run-length encoding is effective for AAAAAABBBBCCCCCCCC but may be ineffective for ABABABAB.",
    answer: "RLE replaces long repeated runs with count and value, so long runs such as AAAAAA can be shortened to 6A. ABABABAB has very short runs, so each character may need a count and value, which can make the encoded data no smaller or larger.",
    marking: [
      { mark: "B1", text: "RLE represents repeated runs using count and value" },
      { mark: "B1", text: "long runs in AAAAAABBBBCCCCCCCC can be shortened" },
      { mark: "B1", text: "ABABABAB has short / alternating runs" },
      { mark: "B1", text: "encoded form may not be smaller / may be larger due to overhead" },
    ],
    strict: [
      "Do not accept only 'because it repeats'. ABABABAB also repeats, but not as consecutive runs.",
      "The explanation must refer to consecutive runs.",
      "Accept examples such as 1A1B1A1B to show overhead.",
      "Allow equivalent wording if the technical meaning is clear.",
    ],
  },
  {
    title: "Question 4",
    marks: "4 marks",
    prompt: "Describe dictionary-style compression.",
    answer: "Dictionary-style compression finds repeated patterns, stores each repeated pattern once in a dictionary, and replaces later occurrences with shorter references. The original data can be reconstructed using the dictionary and references.",
    marking: [
      { mark: "B1", text: "identifies repeated patterns / sequences" },
      { mark: "B1", text: "stores pattern once in a dictionary / table" },
      { mark: "B1", text: "replaces occurrences with a shorter reference / code / pointer" },
      { mark: "B1", text: "original can be reconstructed using dictionary and references" },
    ],
    strict: [
      "Do not require a named algorithm such as LZW.",
      "Do not accept only 'uses a dictionary' without explaining references.",
      "Accept word, phrase or byte-pattern examples.",
      "Allow equivalent wording if the technical meaning is clear.",
    ],
  },
  {
    title: "Question 5",
    marks: "3 marks",
    prompt: "A candidate says RLE is lossy because it changes the data. Explain why this is incorrect.",
    answer: "RLE changes the representation of the data, not the recovered original data. If decoded correctly, the exact original data can be reconstructed, so RLE is lossless.",
    marking: [
      { mark: "B1", text: "RLE changes representation / encoding" },
      { mark: "B1", text: "decoded data can match the original exactly" },
      { mark: "B1", text: "therefore RLE is lossless" },
    ],
    strict: [
      "Do not accept only 'RLE is lossless' without explanation.",
      "Do not award full marks if exact reconstruction is not mentioned.",
      "Accept 'no data is lost' as equivalent to exact reconstruction.",
      "Allow equivalent wording if the technical meaning is clear.",
    ],
  },
];

function normalise(value) {
  return value.trim().replace(/\s+/g, "").toUpperCase();
}

function rleEncode(input) {
  if (!input) return { output: "", steps: [] };
  const chars = Array.from(input);
  const runs = [];
  let current = chars[0];
  let count = 1;
  for (let i = 1; i < chars.length; i += 1) {
    if (chars[i] === current) {
      count += 1;
    } else {
      runs.push({ count, value: current });
      current = chars[i];
      count = 1;
    }
  }
  runs.push({ count, value: current });
  return {
    output: runs.map((run) => `${run.count}${run.value}`).join(""),
    steps: runs.map((run) => `${run.value.repeat(run.count)} → ${run.count}${run.value}`),
  };
}

function rleDecode(input) {
  const matches = [...input.matchAll(/(\d+)([^\d])/g)];
  if (!matches.length || matches.map((match) => match[0]).join("") !== input) {
    return { output: "", steps: ["Use a format such as 3A2B1C."] };
  }
  return {
    output: matches.map((match) => match[2].repeat(Number(match[1]))).join(""),
    steps: matches.map((match) => `${match[1]}${match[2]} → ${match[2].repeat(Number(match[1]))}`),
  };
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
      if (button.dataset.hook === "runs") {
        feedback.textContent = "Correct. Consecutive repeated runs are exactly what simple RLE wants.";
      } else if (button.dataset.hook === "alternating") {
        feedback.textContent = "It repeats, but not in consecutive runs. Simple RLE would struggle here.";
      } else {
        feedback.textContent = "Not ideal. RLE needs long consecutive runs to shine.";
      }
    });
  });
}

function setupConverter() {
  const mode = document.querySelector("#modeInput");
  const data = document.querySelector("#dataInput");
  const result = document.querySelector("#convertResult");
  const method = document.querySelector("#convertMethod");

  function convert() {
    const value = data.value.trim();
    const converted = mode.value === "encode" ? rleEncode(value) : rleDecode(value);
    result.textContent = converted.output ? converted.output : "No valid output.";
    method.textContent = converted.steps.join("; ");
  }

  mode.addEventListener("change", () => {
    data.value = mode.value === "encode" ? "AAAAAABBBBCCCCCCCC" : "3A2B1C";
    convert();
  });
  data.addEventListener("input", convert);
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
  renderExample("encode");
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
      const response = item.id.startsWith("p5") || item.id.startsWith("p6") || item.id.startsWith("p7") || item.id.startsWith("p8")
        ? input.value.trim().toLowerCase()
        : normalise(input.value);
      const isCorrect = item.accepted.some((answer) => {
        const expected = item.id.startsWith("p5") || item.id.startsWith("p6") || item.id.startsWith("p7") || item.id.startsWith("p8")
          ? answer.toLowerCase()
          : normalise(answer);
        return response === expected || response.includes(expected);
      });
      mark.textContent = isCorrect ? "Correct" : "Try again";
      mark.className = `mark ${isCorrect ? "correct" : "incorrect"}`;
      if (isCorrect) correct += 1;
    });
    document.querySelector("#practiceFeedback").textContent = `${correct}/${practice.length} correct. Check run counts and whether the pattern is consecutive.`;
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
