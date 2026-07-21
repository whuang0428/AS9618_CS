const scenarioMap = {
  single: {
    result: "Most relevant: clock speed and CPU architecture; extra cores may not help much.",
    method: "A single-threaded program mainly runs on one core. A higher clock speed may allow that core to perform more cycles per second, but memory access and architecture still affect real performance.",
    trap: "Do not say four cores make a single-threaded task four times faster.",
  },
  multi: {
    result: "Most relevant: number of cores, if the software can split the work.",
    method: "A video export can often be divided into independent chunks or threads. Multiple cores can process different parts at the same time, reducing total time.",
    trap: "Do not award cores as helpful unless the task can be parallelised.",
  },
  loop: {
    result: "Most relevant: cache, if the same data/instructions are reused.",
    method: "Repeatedly used data may remain in cache. A cache hit lets the CPU access it faster than fetching it from main memory each time.",
    trap: "Do not confuse cache with ordinary storage capacity.",
  },
  large: {
    result: "Most relevant: word length, if larger values are processed as single units.",
    method: "A longer word length can allow the CPU to process larger operands or more bits in one operation, depending on the architecture and data type.",
    trap: "Do not claim longer word length makes every program faster.",
  },
  memory: {
    result: "Most relevant: cache and memory bottleneck.",
    method: "If the CPU often waits for data from main memory, a larger or more effective cache can reduce waiting time when requested data is found in cache.",
    trap: "Do not focus only on clock speed when the CPU is waiting for memory.",
  },
};

const examples = {
  clock: {
    title: "Example 1: clock speed",
    problem: "Explain why increasing clock speed can improve performance, and why it may not double performance.",
    steps: [
      "Clock speed is the number of clock cycles per second.",
      "A higher clock speed can allow more instruction-cycle steps to be performed per second.",
      "However, different CPUs may do different amounts of work per cycle.",
      "The CPU may also wait for memory, cache misses or I/O.",
      "Therefore a higher clock speed can improve performance, but does not guarantee proportional improvement.",
    ],
  },
  cores: {
    title: "Example 2: cores",
    problem: "A CPU changes from 2 cores to 8 cores. Explain when this helps.",
    steps: [
      "More cores allow more instructions or threads to be processed at the same time.",
      "This helps when the workload can be divided into independent tasks.",
      "It also helps when several programs run at once.",
      "A single-threaded program may not use the extra cores fully.",
      "A strong answer links cores to parallel processing, not just 'more is faster'.",
    ],
  },
  cache: {
    title: "Example 3: cache",
    problem: "A loop repeatedly reads the same table. Explain how cache may help.",
    steps: [
      "Cache stores frequently or recently used data/instructions close to the CPU.",
      "If the table data is in cache, the CPU can access it faster than main memory.",
      "This reduces waiting time for memory access.",
      "If the needed data is not in cache, a cache miss occurs and main memory must be used.",
      "The benefit depends on cache hit rate and the program's access pattern.",
    ],
  },
  word: {
    title: "Example 4: word length",
    problem: "Explain why a longer word length can help with some calculations.",
    steps: [
      "Word length is the number of bits processed as a unit.",
      "A longer word can represent larger values or more precision in one word.",
      "Some calculations may need fewer operations if the data fits in one word.",
      "This does not mean every task becomes faster.",
      "The data type, architecture and software must benefit from the larger word.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "What factor is measured in Hz or GHz?", accepted: ["clock speed", "clock frequency"], answer: "Clock speed / clock frequency" },
  { id: "p2", prompt: "What is the small fast memory close to the CPU called?", accepted: ["cache", "cache memory"], answer: "Cache / cache memory" },
  { id: "p3", prompt: "What is the term for processing units that can execute instructions independently?", accepted: ["cores", "cpu cores", "processor cores", "core"], answer: "Cores" },
  { id: "p4", prompt: "What is the number of bits processed as a unit called?", accepted: ["word length", "word size"], answer: "Word length" },
  { id: "p5", prompt: "What is the name for finding requested data in cache?", accepted: ["cache hit", "hit"], answer: "Cache hit" },
  { id: "p6", prompt: "What is the name for not finding requested data in cache?", accepted: ["cache miss", "miss"], answer: "Cache miss" },
  { id: "p7", prompt: "More cores mainly help when work can be split into what kind of tasks?", accepted: ["parallel", "parallel tasks", "parallelisable", "parallelizable", "independent tasks", "threads"], answer: "Parallel / independent tasks or threads" },
  { id: "p8", prompt: "A higher clock speed means more clock cycles per what?", accepted: ["second", "seconds"], answer: "Second" },
  { id: "p9", prompt: "A CPU waiting for slow memory access is an example of what?", accepted: ["bottleneck", "memory bottleneck"], answer: "A bottleneck / memory bottleneck" },
  { id: "p10", prompt: "Does a longer word length always make every program faster? Answer yes or no.", accepted: ["no"], answer: "No" },
];

const mistakes = [
  {
    wrong: "A CPU with twice the clock speed always runs every program twice as fast.",
    fix: "Higher clock speed can increase cycles per second, but performance also depends on architecture, memory access, cache, cores and the workload.",
  },
  {
    wrong: "More cores always make a single program faster.",
    fix: "More cores help only if the program or workload can be divided into parallel tasks or threads.",
  },
  {
    wrong: "Cache is just a bigger version of RAM.",
    fix: "Cache is smaller and faster than RAM. It stores frequently or recently used data/instructions to reduce slow main-memory access.",
  },
  {
    wrong: "Word length is the number of words typed by the programmer.",
    fix: "Word length is the number of bits the CPU can process as a unit, such as the size of a register word.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "5 marks",
    prompt: "Explain how clock speed can affect processor performance and why it does not guarantee that one computer is faster than another.",
    answer: "Clock speed is the number of clock cycles per second. A higher clock speed can allow more instruction-cycle steps to be performed per second, which may improve performance. However, CPUs may have different architectures and may do different amounts of work per cycle. Performance may also be limited by memory access, cache misses, cores or the type of workload, so clock speed alone does not guarantee a faster computer.",
    marking: [
      { mark: "B1", text: "clock speed is cycles per second / frequency of the processor clock" },
      { mark: "B1", text: "higher clock speed can allow more instruction-cycle steps/instructions to be processed per second" },
      { mark: "B1", text: "identifies architecture/work per cycle as another factor" },
      { mark: "B1", text: "identifies a valid bottleneck such as memory/cache/I/O/workload" },
      { mark: "B1", text: "concludes that clock speed alone does not guarantee overall faster performance" },
    ],
    strict: [
      "Do not accept 'clock speed is how fast the computer is' as a definition.",
      "Do not award full marks for vague 'other things matter' without naming a factor.",
      "Allow Hz/GHz as evidence of cycles per second.",
    ],
  },
  {
    title: "Question 2",
    marks: "4 marks",
    prompt: "Explain why increasing the number of cores may improve performance for some tasks but not for others.",
    answer: "More cores provide more independent processing units, so different tasks or threads can be executed in parallel. This can improve performance when software can divide the work, such as video export or several programs running at once. It may not improve a single-threaded program much because that program cannot make full use of the extra cores.",
    marking: [
      { mark: "B1", text: "cores are independent processing units / can execute instructions independently" },
      { mark: "B1", text: "more cores can allow parallel execution of tasks/threads" },
      { mark: "B1", text: "valid scenario where parallelism helps" },
      { mark: "B1", text: "explains limitation for single-threaded or non-parallelisable software" },
    ],
    strict: [
      "Do not accept 'more cores always means faster' for the limitation mark.",
      "Do not require the word thread if independent tasks are clearly described.",
      "Allow multitasking as a valid scenario.",
    ],
  },
  {
    title: "Question 3",
    marks: "5 marks",
    prompt: "A program repeatedly accesses the same instructions and data. Explain how cache memory may improve performance.",
    answer: "Cache is small, fast memory close to the CPU. It stores frequently or recently used instructions and data. If the program requests data that is already in cache, a cache hit occurs and the CPU can access it faster than main memory. This reduces waiting time for memory access. If the data is not in cache, a cache miss occurs and the CPU must access slower main memory.",
    marking: [
      { mark: "B1", text: "cache is small fast memory close to/inside the CPU" },
      { mark: "B1", text: "stores frequently/recently used data or instructions" },
      { mark: "B1", text: "cache hit means requested item is found in cache" },
      { mark: "B1", text: "access from cache is faster than from main memory / reduces waiting time" },
      { mark: "B1", text: "cache miss requires access to slower main memory" },
    ],
    strict: [
      "Do not accept cache as permanent backing storage.",
      "Do not accept 'cache increases RAM size' as a benefit.",
      "Allow 'locality' only if linked to repeated/frequent access.",
    ],
  },
  {
    title: "Question 4",
    marks: "4 marks",
    prompt: "Explain how word length may affect processor performance.",
    answer: "Word length is the number of bits the CPU can process as a unit. A longer word can allow larger data values or more bits to be processed in a single operation. This may improve performance for calculations or data types that benefit from the larger word. However, longer word length does not make all programs faster because the workload and architecture must be able to use it.",
    marking: [
      { mark: "B1", text: "word length is the number of bits processed as a unit / in a word/register" },
      { mark: "B1", text: "larger word can process more bits or larger operands in one operation" },
      { mark: "B1", text: "valid benefit such as larger values, precision or fewer operations for suitable data" },
      { mark: "B1", text: "recognises limitation that not all programs/workloads benefit" },
    ],
    strict: [
      "Do not accept word length as number of characters in a password or source-code word.",
      "Do not award limitation if answer says longer word is always faster.",
      "Allow reference to addressable memory only if linked to architecture/address size.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "A student says: 'Computer A has a higher clock speed, so it must perform better than Computer B.' Discuss this statement.",
    answer: "A higher clock speed can improve performance because the CPU can perform more clock cycles per second. However, this alone is not enough to prove Computer A is faster. Computer B may have more cores and perform better on parallel tasks, a larger or more effective cache reducing main-memory access time, or a word length better suited to the workload. The actual performance depends on the program, CPU architecture and bottlenecks such as memory or I/O, so the statement is too simplistic.",
    marking: [
      { mark: "B1", text: "higher clock speed can improve performance through more cycles per second" },
      { mark: "B1", text: "states that clock speed alone is insufficient for judging performance" },
      { mark: "B1", text: "explains relevance of cores for parallel/multitasking workloads" },
      { mark: "B1", text: "explains relevance of cache reducing memory access time" },
      { mark: "B1", text: "explains relevance of word length or CPU architecture/workload" },
      { mark: "B1", text: "reasoned conclusion that actual performance depends on task and bottlenecks" },
    ],
    strict: [
      "Do not accept a list of factors without linking at least one to performance.",
      "Do not award conclusion if it only repeats 'A is faster'.",
      "Allow other valid factors if tied to the scenario.",
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
    depends: "Correct. More cores help only when the software/workload can use parallel processing.",
    yes: "Not always. A single-threaded task may use only one core heavily.",
    cache: "No. Cache usually helps by reducing slower memory access; removing it is not the secret sauce.",
    word: "No. A 1-bit word length would be a very dramatic way to make life worse.",
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
  renderExample("clock");
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
