const pipelineExtensionScenarioMap = {
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

const pipelineExtensionExamples = {
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

const pipelineExtensionPractice = [
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

const pipelineExtensionMistakes = [
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

const pipelineExtensionExamQuestions = [
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

const scenarioMap = {
  logical: {
    result: "10110110 LSR #1 = 01011011",
    method: "LSR #1 shifts every ACC bit one place right, discards the rightmost 0 and inserts 0 at the left of the fixed eight-bit result.",
    trap: "LSR is a logical right shift. It does not preserve a negative sign bit and it does not rotate the outgoing bit.",
  },
  arithmetic: {
    result: "10110110 arithmetic right by 1 = 11011011",
    method: "The pattern is signed. Its sign bit is 1, so 1 is copied into the new leftmost position while the rightmost 0 is discarded.",
    trap: "Do not insert 0 on the left of a negative two's-complement value when an arithmetic right shift is specified.",
  },
  cyclic: {
    result: "00110111 cyclic right by 1 = 10011011",
    method: "The rightmost 1 is shifted out and rotated into the new leftmost position. The width remains exactly eight bits.",
    trap: "A cyclic shift does not discard the outgoing bit; it re-enters at the opposite end.",
  },
  device: {
    result: "10100000 OR 00000100 = 10100100",
    method: "The mask has 1 only at bit 2, so OR sets the motor-enable flag while zero mask positions preserve every unrelated control bit.",
    trap: "AND with 00000100 would isolate/test bit 2 and clear the other result positions; it would not set the control bit.",
  },
};

const examples = {
  mask: {
    title: "Example 1: test, set, clear and toggle one bit",
    problem: "Use an AND mask, OR mask and XOR mask on bit 2 of status/control byte 10100100, with the rightmost bit numbered 0.",
    steps: [
      "Test: 10100100 AND 00000100 = 00000100, so bit 2 is set.",
      "Set: 10100000 OR 00000100 = 10100100.",
      "Clear: 10100100 AND 11111011 = 10100000.",
      "Toggle: 10100100 XOR 00000100 = 10100000.",
      "The mask selects the relevant positions; each operation is applied column by column.",
    ],
  },
  shifts: {
    title: "Example 2: compare three right shifts",
    problem: "Shift the fixed eight-bit pattern 10110111 one place right.",
    steps: [
      "Logical right: discard the outgoing 1 and insert 0 on the left, giving 01011011.",
      "Arithmetic right: preserve the sign bit 1 on the left, giving 11011011.",
      "Cyclic right: rotate the outgoing rightmost 1 to the left, giving 11011011.",
      "Arithmetic and cyclic match for this input, but their mechanisms are different.",
      "State width, direction and shift type before calculating.",
    ],
  },
  control: {
    title: "Example 3: monitor an input and control an output",
    problem: "Bit 5 is a door sensor and bit 1 controls an alarm.",
    steps: [
      "AND the status register with 00100000.",
      "A non-zero result means the door-open flag is set.",
      "OR the control register with 00000010 to set the alarm flag.",
      "AND with 11111101 to clear the alarm later.",
      "The sensor supplies input; the actuator performs the physical output commanded by the control bit.",
    ],
  },
  boundary: {
    title: "Example 4: fixed-width overflow boundary",
    problem: "Apply an eight-bit arithmetic left shift to 01000001.",
    steps: [
      "Shift every bit left one place and insert 0 on the right.",
      "The eight-bit result is 10000010; the outgoing leftmost 0 is discarded.",
      "The original signed value is +65, while the result represents -126 in two's complement.",
      "The mathematical doubled value +130 is outside the eight-bit signed range -128 to +127.",
      "Signed overflow occurred even though an eight-bit pattern was produced.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Which operation tests or isolates selected bits?", accepted: ["and"], answer: "AND" },
  { id: "p2", prompt: "Which operation sets selected bits?", accepted: ["or"], answer: "OR" },
  { id: "p3", prompt: "Which operation toggles selected bits?", accepted: ["xor", "exclusive or"], answer: "XOR" },
  { id: "p4", prompt: "What eight-bit mask selects bit 2 when bit 0 is rightmost?", accepted: ["00000100"], answer: "00000100" },
  { id: "p5", prompt: "Calculate 00110110 LSL #1.", accepted: ["01101100"], answer: "01101100" },
  { id: "p6", prompt: "Calculate 10110110 LSR #1.", accepted: ["01011011"], answer: "01011011" },
  { id: "p7", prompt: "Calculate 10110110 arithmetic right by one.", accepted: ["11011011"], answer: "11011011" },
  { id: "p8", prompt: "Calculate 00110111 cyclic right by one.", accepted: ["10011011"], answer: "10011011" },
  { id: "p9", prompt: "Does a cyclic shift discard the outgoing bit? Answer yes or no.", accepted: ["no"], answer: "No; it rotates to the opposite end." },
  { id: "p10", prompt: "Which bit must an arithmetic right shift preserve?", accepted: ["sign bit", "the sign bit", "most significant bit", "msb"], answer: "The sign bit / most significant bit" },
];

const mistakes = [
  { wrong: "LSR #1 preserves the sign bit of a negative value.", fix: "LSR is logical: it shifts ACC right and inserts 0 at the left. An arithmetic right shift preserves the sign bit." },
  { wrong: "AND with 00000100 sets bit 2 without affecting anything else.", fix: "OR with 00000100 sets bit 2. AND with that mask isolates/tests bit 2 and clears all other result positions." },
  { wrong: "A cyclic shift inserts zero into the empty position.", fix: "A cyclic shift rotates the outgoing bit into the empty position at the opposite end. A logical shift inserts zero." },
  { wrong: "If an eight-bit shift produces eight displayed bits, overflow is impossible.", fix: "Fixed width always displays eight result bits, but an arithmetic left shift overflows when the mathematical signed result is outside -128 to +127." },
];


function renderStudentMarkPoints(question) {
  const escape = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
  const guidance = (question.strict || []).join(" ");
  return `<div class="mark-scheme-table" role="table" aria-label="Mark scheme"><div class="mark-scheme-row mark-scheme-head" role="row"><strong role="columnheader">Answer</strong><strong role="columnheader">Guidance</strong><strong role="columnheader">Marks</strong></div>${question.marking.map((point, pointIndex) => `<div class="mark-scheme-row" role="row"><span role="cell">${escape(point.text)}</span><span role="cell">${pointIndex === 0 ? escape(guidance) : ""}</span><strong role="cell">1</strong></div>`).join("")}</div>`;
}
const examQuestions = [
  {
    title: "Question 1",
    marks: "4 marks",
    prompt: "State the exact effects of LSL #n and LSR #n on ACC.",
    answer: "LSL #n shifts all bits in ACC logically left by n places, discards bits beyond the fixed width and inserts zeros on the right. LSR #n shifts all bits in ACC logically right by n places, discards outgoing right bits and inserts zeros on the left.",
    marking: [
      { mark: "B1", text: "LSL shifts ACC left by n places" },
      { mark: "B1", text: "LSL inserts zero in each empty right position" },
      { mark: "B1", text: "LSR shifts ACC right by n places" },
      { mark: "B1", text: "LSR inserts zero in each empty left position" },
    ],
    strict: [
      "Do not accept sign extension for LSR.",
      "Do not retain bits outside the stated fixed width.",
    ],
  },
  {
    title: "Question 2",
    marks: "4 marks",
    prompt: "Compare logical, arithmetic and cyclic right shifts for a fixed-width bit pattern.",
    answer: "A logical right shift inserts zero on the left and discards the outgoing bit. An arithmetic right shift repeats the sign bit. A cyclic right shift rotates the outgoing rightmost bit into the new leftmost position.",
    marking: [
      { mark: "B1", text: "logical right inserts zero on the left" },
      { mark: "B1", text: "arithmetic right repeats/preserves the sign bit" },
      { mark: "B1", text: "cyclic right rotates the outgoing bit to the left" },
      { mark: "B1", text: "distinguishes fill/rotation rules at a fixed width" },
    ],
    strict: [
      "Do not state that arithmetic right always inserts 1; it copies the sign bit.",
      "Do not state that cyclic shifting discards the outgoing bit.",
    ],
  },
  {
    title: "Question 3",
    marks: "5 marks",
    prompt: "A monitoring system reads status register 10100100. Bit 2 indicates a door-open sensor. Demonstrate how an AND mask tests the bit and interpret the result.",
    answer: "The monitor uses 10100100 AND 00000100 = 00000100. AND clears unselected positions and preserves bit 2. Because the result is non-zero, the door-open status bit is set.",
    marking: [
      { mark: "B1", text: "chooses AND" },
      { mark: "B1", text: "uses mask 00000100" },
      { mark: "B1", text: "obtains 00000100" },
      { mark: "B1", text: "explains why only bit 2 is preserved" },
      { mark: "B1", text: "non-zero result means the door-open bit is set" },
    ],
    strict: [
      "Do not award OR as a test operation.",
      "Bit 0 is the rightmost bit.",
    ],
  },
  {
    title: "Question 4",
    marks: "4 marks",
    prompt: "For control byte 10100000, give the operation and mask to set, clear and toggle bit 2 without changing unrelated bits.",
    answer: "Set with OR 00000100, giving 10100100. Clear with AND 11111011. Toggle with XOR 00000100.",
    marking: [
      { mark: "B1", text: "set uses OR 00000100" },
      { mark: "B1", text: "set result 10100100" },
      { mark: "B1", text: "clear uses AND 11111011" },
      { mark: "B1", text: "toggle uses XOR 00000100" },
    ],
    strict: [
      "Do not use AND 00000100 to clear only bit 2.",
      "Award each operation independently.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "Calculate the eight-bit logical right, arithmetic right and cyclic right shifts of 10110111 by one place. Explain each new leftmost bit.",
    answer: "Logical right gives 01011011 because zero enters on the left. Arithmetic right gives 11011011 because the sign bit 1 is copied. Cyclic right gives 11011011 because the outgoing rightmost 1 rotates to the left. The matching last two results arise from different rules.",
    marking: [
      { mark: "B1", text: "logical right result 01011011" },
      { mark: "B1", text: "logical right inserts zero" },
      { mark: "B1", text: "arithmetic right result 11011011 and copies sign bit 1" },
      { mark: "B1", text: "cyclic right result 11011011 and rotates outgoing 1" },
      { mark: "B1", text: "distinguishes arithmetic sign rule from cyclic rotation" },
      { mark: "B1", text: "keeps every result at exactly eight bits" },
    ],
    strict: [
      "Do not infer the rule only from two equal final patterns.",
      "Do not retain a ninth bit.",
    ],
  },
];

function normalise(value) {
  return value.trim().toLowerCase().replace(/[-_\s/]+/g, " ");
}

function setupPrint() {
  document.querySelector("#printBtn").addEventListener("click", () => window.print());
}

function placeCoreBeforeExtension() {
  const extension = document.querySelector("#pipeline-extension");
  for (const id of ["tool", "examples", "practice", "debug", "exam"]) {
    const section = document.getElementById(id);
    if (extension && section) extension.before(section);
  }
}

function setupHook() {
  const feedback = document.querySelector("#hookFeedback");
  const responses = {
    overlap: "Correct. OR with 00000100 sets bit 2 and preserves every other bit.",
    same: "No. AND with 00000100 isolates bit 2 and clears the other positions.",
    never: "No. XOR with a zero mask changes no bits.",
    cache: "No. A shift moves the complete bit pattern instead of setting only bit 2.",
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
    trap.innerHTML = `<strong>Common error:</strong> ${item.trap}`;
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
  renderExample("mask");
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
        <p><strong>Answer:</strong> ${question.answer}</p>
        <h4>Mark scheme</h4>
        ${renderStudentMarkPoints(question)}
      </div>
    </article>
  `).join("");
  setupAnswerToggles(list);
}

placeCoreBeforeExtension();
setupPrint();
setupHook();
setupSimulator();
setupExamples();
renderPractice();
renderMistakes();
renderExamQuestions();
