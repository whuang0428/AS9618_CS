const scenarioMap = {
  smooth: {
    result: "Ideal case: the pipeline can stay full after the first few cycles.",
    method: "Independent instructions can occupy fetch, decode and execute at the same time. After the pipeline fills, one instruction may complete in each cycle in this simplified model.",
    trap: "Do not say each instruction skips stages. Each instruction still passes through fetch, decode and execute.",
  },
  data: {
    result: "Data hazard: the pipeline may need to stall.",
    method: "If Instruction 2 needs the result of Instruction 1, it may not be safe to execute until that result is available. The processor may insert a stall or use forwarding in some architectures.",
    trap: "Do not ignore dependencies between instructions just because the pipeline diagram looks tidy.",
  },
  branch: {
    result: "Control hazard: the pipeline may fetch the wrong next instruction.",
    method: "A branch or jump can change the program counter. Instructions fetched before the branch decision may be wrong and may need to be flushed.",
    trap: "Do not assume the CPU always knows the correct next instruction before a branch is resolved.",
  },
  resource: {
    result: "Resource hazard: two stages may compete for the same hardware.",
    method: "If fetch and another stage both need the same memory resource in the same cycle, one stage may have to wait. This reduces the ideal throughput gain.",
    trap: "Do not describe every pipeline slowdown as a data hazard; resource conflicts are a separate idea.",
  },
};

const examples = {
  ideal: {
    title: "Example 1: ideal 3-stage pipeline",
    problem: "Show how three independent instructions can overlap in a fetch-decode-execute pipeline.",
    steps: [
      "Cycle 1: Instruction 1 is fetched.",
      "Cycle 2: Instruction 1 is decoded while Instruction 2 is fetched.",
      "Cycle 3: Instruction 1 is executed, Instruction 2 is decoded and Instruction 3 is fetched.",
      "Cycle 4: Instruction 2 is executed and Instruction 3 is decoded.",
      "Cycle 5: Instruction 3 is executed.",
      "The overlap improves throughput compared with completing each instruction fully before starting the next.",
    ],
  },
  data: {
    title: "Example 2: data hazard",
    problem: "Instruction 1 calculates X. Instruction 2 uses X. Explain the pipeline issue.",
    steps: [
      "Instruction 2 depends on the result of Instruction 1.",
      "If Instruction 2 reaches execute before X is available, it may use the wrong value.",
      "The pipeline may stall until the value is ready.",
      "Some processors use forwarding, but AS answers should still explain the dependency and possible stall.",
      "The ideal one-completion-per-cycle pattern is disrupted.",
    ],
  },
  branch: {
    title: "Example 3: branch/control hazard",
    problem: "A branch instruction may change the next instruction address. Explain why this affects a pipeline.",
    steps: [
      "The fetch stage may already have fetched following instructions.",
      "A branch decision can change the program counter.",
      "If the fetched instructions are not on the correct path, they must be discarded or flushed.",
      "The pipeline needs time to fetch from the correct address.",
      "This lowers the performance gain from pipelining.",
    ],
  },
  compare: {
    title: "Example 4: throughput versus latency",
    problem: "Explain why pipelining can improve performance even though a single instruction still has to pass through every stage.",
    steps: [
      "Latency is the time for one instruction to pass through all stages.",
      "Pipelining does not remove those stages for that instruction.",
      "Throughput is the number of instructions completed in a given time.",
      "By overlapping stages of different instructions, the CPU may complete instructions more frequently.",
      "Therefore pipelining improves throughput rather than making each instruction instant.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "What is the technique of overlapping stages of different instructions called?", accepted: ["pipelining", "instruction pipelining", "pipeline"], answer: "Pipelining / instruction pipelining" },
  { id: "p2", prompt: "Name the three basic instruction-cycle stages used in this lesson.", accepted: ["fetch decode execute", "fetch decode and execute", "fetch-decode-execute", "f d e"], answer: "Fetch, decode and execute" },
  { id: "p3", prompt: "What term means the number of instructions completed per unit time?", accepted: ["throughput"], answer: "Throughput" },
  { id: "p4", prompt: "What term means the time for one instruction to pass through the pipeline?", accepted: ["latency"], answer: "Latency" },
  { id: "p5", prompt: "What is a pause inserted because an instruction cannot continue safely?", accepted: ["stall", "pipeline stall"], answer: "Stall / pipeline stall" },
  { id: "p6", prompt: "What hazard occurs when an instruction needs a result not yet produced by an earlier instruction?", accepted: ["data hazard", "data dependency", "dependency"], answer: "Data hazard / data dependency" },
  { id: "p7", prompt: "What hazard is caused by a branch or jump changing the next instruction?", accepted: ["control hazard", "branch hazard"], answer: "Control hazard / branch hazard" },
  { id: "p8", prompt: "What hazard occurs when two stages need the same hardware at the same time?", accepted: ["resource hazard", "structural hazard"], answer: "Resource hazard / structural hazard" },
  { id: "p9", prompt: "What word describes discarding wrongly fetched instructions from a pipeline?", accepted: ["flush", "flushing", "pipeline flush"], answer: "Flush / pipeline flush" },
  { id: "p10", prompt: "Does pipelining mean one instruction is fetched, decoded and executed all at once? Answer yes or no.", accepted: ["no"], answer: "No" },
];

const mistakes = [
  {
    wrong: "Pipelining means one instruction is fetched, decoded and executed at exactly the same time.",
    fix: "Pipelining overlaps different instructions at different stages. One instruction still passes through the stages in order.",
  },
  {
    wrong: "Pipelining always triples CPU performance in a three-stage pipeline.",
    fix: "Ideal throughput may improve, but fill/drain time, hazards, stalls, branches and resource conflicts reduce the real gain.",
  },
  {
    wrong: "A branch instruction has no effect on the pipeline because the CPU just continues fetching.",
    fix: "A branch may change the program counter. Incorrectly fetched instructions may need to be flushed, causing delay.",
  },
  {
    wrong: "A data hazard is when memory is too small.",
    fix: "A data hazard occurs when an instruction depends on data or a result from a previous instruction that is not ready yet.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "5 marks",
    prompt: "Describe how instruction pipelining can improve processor performance.",
    answer: "Instruction pipelining divides instruction processing into stages such as fetch, decode and execute. Different instructions can be in different stages at the same time, for example one instruction executing while another is being decoded and another is being fetched. Once the pipeline is full, this can increase throughput because instructions may complete more frequently. Each instruction still passes through the required stages.",
    marking: [
      { mark: "B1", text: "pipelining divides instruction processing into stages such as fetch/decode/execute" },
      { mark: "B1", text: "different instructions can be processed in different stages at the same time" },
      { mark: "B1", text: "valid example of overlap such as execute/decode/fetch in same cycle" },
      { mark: "B1", text: "increases throughput / more instructions completed per unit time" },
      { mark: "B1", text: "recognises each instruction still passes through required stages" },
    ],
    strict: [
      "Do not accept that the same instruction is fetched, decoded and executed simultaneously.",
      "Do not award throughput mark for vague 'it is faster' without explaining more completions per time.",
      "Allow three-stage or more detailed pipeline stage examples.",
    ],
  },
  {
    title: "Question 2",
    marks: "4 marks",
    prompt: "Explain the difference between throughput and latency in a pipelined processor.",
    answer: "Latency is the time taken for one instruction to pass through the pipeline stages from fetch to completion. Throughput is the number of instructions completed per unit time. Pipelining can improve throughput by overlapping stages of different instructions, but it does not necessarily reduce the latency of an individual instruction because it still goes through each stage.",
    marking: [
      { mark: "B1", text: "latency is time for one instruction to pass through stages / complete" },
      { mark: "B1", text: "throughput is number of instructions completed per unit time" },
      { mark: "B1", text: "pipelining improves throughput by overlapping different instructions" },
      { mark: "B1", text: "individual instruction still has to pass through stages so latency is not eliminated" },
    ],
    strict: [
      "Do not accept latency as internet delay unless linked to instruction processing.",
      "Do not accept throughput as clock speed alone.",
      "Allow 'rate of completion' for throughput.",
    ],
  },
  {
    title: "Question 3",
    marks: "5 marks",
    prompt: "A branch instruction is in a pipeline. Explain why it may reduce the benefit of pipelining.",
    answer: "A branch instruction may change the program counter and therefore the next instruction to fetch. The pipeline may have already fetched instructions that follow the branch in sequence. If the branch is taken, those fetched instructions may be wrong and must be flushed or discarded. The processor then fetches from the correct address, causing a delay or stall. This reduces the ideal throughput gain from pipelining.",
    marking: [
      { mark: "B1", text: "branch may change the program counter / next instruction address" },
      { mark: "B1", text: "pipeline may have already fetched following instructions" },
      { mark: "B1", text: "wrong instructions may need to be flushed/discarded" },
      { mark: "B1", text: "pipeline may stall or wait while correct instruction is fetched" },
      { mark: "B1", text: "therefore throughput/performance gain is reduced" },
    ],
    strict: [
      "Do not accept 'branch means a tree branch in memory'.",
      "Do not require branch prediction terminology.",
      "Allow control hazard as a named reason if explained.",
    ],
  },
  {
    title: "Question 4",
    marks: "4 marks",
    prompt: "Explain what is meant by a data hazard in a pipeline.",
    answer: "A data hazard occurs when an instruction depends on data or a result from an earlier instruction that has not yet been produced or written back. If the later instruction continues too soon, it may use an incorrect value. The processor may need to stall the pipeline until the value is available, reducing the ideal performance gain.",
    marking: [
      { mark: "B1", text: "data hazard involves dependency between instructions" },
      { mark: "B1", text: "later instruction needs a result/data from an earlier instruction" },
      { mark: "B1", text: "result/data is not yet available" },
      { mark: "B1", text: "pipeline may stall/wait, reducing performance/throughput" },
    ],
    strict: [
      "Do not accept 'data hazard means data is dangerous' without dependency.",
      "Do not require write-back terminology.",
      "Allow data dependency as equivalent if pipeline consequence is described.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "Discuss the statement: 'Pipelining always makes a processor faster.'",
    answer: "Pipelining can make a processor faster by allowing different instructions to be at different stages of the fetch-decode-execute cycle at the same time. This can increase throughput once the pipeline is full. However, it does not make a single instruction skip stages, and the pipeline needs time to fill and drain. Data hazards, branch/control hazards and resource conflicts can cause stalls or flushes. Therefore pipelining can improve performance in suitable conditions, but it does not always achieve the ideal speed-up.",
    marking: [
      { mark: "B1", text: "pipelining overlaps stages of different instructions" },
      { mark: "B1", text: "can increase throughput once pipeline is full" },
      { mark: "B1", text: "single instruction still goes through required stages / latency not removed" },
      { mark: "B1", text: "fill/drain overhead identified" },
      { mark: "B1", text: "valid hazard/stall/flush/resource conflict limitation" },
      { mark: "B1", text: "reasoned conclusion that it can improve performance but not always ideal/guaranteed" },
    ],
    strict: [
      "Do not award full marks for simply saying 'yes, faster'.",
      "Do not require all three hazard types if one valid limitation is explained.",
      "Allow branch hazard, data hazard or structural/resource hazard as valid examples.",
    ],
  },
];

function normalise(value) {
  return value.trim().toLowerCase().replace(/[-_\s/]+/g, " ");
}

function setupPrint() {
  document.querySelector("#printBtn").addEventListener("click", () => window.print());
}

function setupHook() {
  const feedback = document.querySelector("#hookFeedback");
  const responses = {
    overlap: "Correct. Different instructions can occupy different stages during the same cycle.",
    same: "No. One instruction still passes through the stages in order.",
    never: "No. Pipelining allows multiple instructions to be in progress at once.",
    cache: "No. Cache can help instruction fetching, but it is not the definition of pipelining.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = responses[button.dataset.hook];
    });
  });
}

function setupSimulator() {
  const select = document.querySelector("#scenarioInput");
  const result = document.querySelector("#simulateResult");
  const method = document.querySelector("#simulateMethod");
  const trap = document.querySelector("#simulateTrap");
  function simulate() {
    const item = scenarioMap[select.value];
    result.textContent = item.result;
    method.innerHTML = `<strong>Reasoning:</strong> ${item.method}`;
    trap.innerHTML = `<strong>Common trap:</strong> ${item.trap}`;
  }
  select.addEventListener("change", simulate);
  document.querySelector("#simulateBtn").addEventListener("click", simulate);
  simulate();
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
  renderExample("ideal");
}

function setupAnswerToggles(scope = document) {
  scope.querySelectorAll(".answer-toggle, .ms-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(`#${button.dataset.answer}`);
      target.classList.toggle("visible");
      button.textContent = target.classList.contains("visible")
        ? button.textContent.replace("Show", "Hide")
        : button.textContent.replace("Hide", "Show");
    });
  });
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

  list.querySelectorAll(".practice-item").forEach((item) => {
    const data = practice.find((entry) => entry.id === item.id);
    const input = item.querySelector("input");
    const mark = item.querySelector(".mark");
    input.addEventListener("input", () => {
      const value = normalise(input.value);
      if (!value) {
        mark.textContent = "";
        mark.className = "mark";
        return;
      }
      const correct = data.accepted.some((answer) => value === normalise(answer));
      mark.textContent = correct ? "Correct" : "Try again";
      mark.className = correct ? "mark correct" : "mark incorrect";
    });
  });
  setupAnswerToggles(list);
}

function renderMistakes() {
  const list = document.querySelector("#mistakeList");
  list.innerHTML = mistakes.map((item, index) => `
    <article>
      <p><strong class="wrong">Wrong:</strong> ${item.wrong}</p>
      <button type="button" class="answer-toggle" data-answer="mistake-${index}">Show correction</button>
      <div class="answer-panel" id="mistake-${index}">${item.fix}</div>
    </article>
  `).join("");
  setupAnswerToggles(list);
}

function renderExamQuestions() {
  const list = document.querySelector("#examList");
  list.innerHTML = examQuestions.map((question, index) => `
    <article class="exam-card">
      <div class="exam-head">
        <h3>${question.title}</h3>
        <span>${question.marks}</span>
      </div>
      <p>${question.prompt}</p>
      <button type="button" class="ms-toggle" data-answer="ms-${index}">Show MS</button>
      <div class="ms-panel" id="ms-${index}">
        <p><strong>Indicative answer:</strong> ${question.answer}</p>
        <h4>CIE-style mark scheme</h4>
        <ul>${question.marking.map((item) => `<li><strong>${item.mark}</strong> ${item.text}</li>`).join("")}</ul>
        <h4>Strict notes</h4>
        <ul>${question.strict.map((note) => `<li>${note}</li>`).join("")}</ul>
      </div>
    </article>
  `).join("");
  setupAnswerToggles(list);
}

setupPrint();
setupHook();
setupSimulator();
setupExamples();
renderPractice();
renderMistakes();
renderExamQuestions();
