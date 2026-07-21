const interruptMap = {
  keyboard: {
    result: "Keyboard interrupt: a key press is waiting to be handled.",
    method: "The CPU completes the current instruction, detects the keyboard interrupt, saves PC/register/status information, runs the keyboard ISR to read the key code, restores the saved state and resumes the interrupted program.",
    trap: "Do not say the CPU must constantly ask the keyboard whether a key has been pressed. That describes polling, not interrupt-driven input.",
  },
  timer: {
    result: "Timer interrupt: the operating system can regain control.",
    method: "A timer signal interrupts the running process. The CPU state is saved, the timer ISR runs, and the operating system can update timing information or decide whether another process should run.",
    trap: "Do not turn this into a full scheduling-algorithm answer. At AS Section 4 depth, focus on the interrupt sequence and the purpose of the timer signal.",
  },
  printer: {
    result: "Printer interrupt: the printer reports that it is ready for more data.",
    method: "The CPU saves the current state, runs the printer ISR, sends or prepares the next data item, acknowledges the device and then returns to the interrupted program.",
    trap: "Do not write that a printer interrupt means the printer has failed. Ready and completed events can also generate interrupts.",
  },
  fault: {
    result: "Critical hardware fault: a high-priority interrupt needs urgent handling.",
    method: "A serious fault may use a non-maskable or high-priority interrupt. The CPU saves what it can, runs the appropriate handler, and may shut down, log the event or take protective action.",
    trap: "Do not claim every interrupt is non-maskable. Many routine I/O interrupts can be masked or delayed.",
  },
};

const examples = {
  keyboard: {
    title: "Example 1: keyboard interrupt",
    problem: "A program is calculating while the user presses a key. Trace how the CPU handles the input.",
    steps: [
      "The keyboard controller sends an interrupt signal.",
      "The CPU finishes the current instruction before accepting the interrupt.",
      "The processor state is saved, including the program counter and relevant registers.",
      "The keyboard ISR runs and reads the key code from the device/buffer.",
      "The interrupt is acknowledged or cleared.",
      "The saved state is restored and the original program resumes.",
    ],
  },
  timer: {
    title: "Example 2: timer interrupt",
    problem: "A timer interrupt occurs while a process is running. Explain why this is useful.",
    steps: [
      "A timer produces an interrupt at a regular interval.",
      "The CPU saves the current process state.",
      "The timer ISR runs and updates operating system timing information.",
      "The operating system can decide whether the current process continues or another process should be given CPU time.",
      "The key exam point is that the CPU does not need the running process to voluntarily stop.",
    ],
  },
  polling: {
    title: "Example 3: interrupt versus polling",
    problem: "Compare checking a keyboard every millisecond with using a keyboard interrupt.",
    steps: [
      "Polling means the CPU repeatedly checks keyboard status, even when no key has been pressed.",
      "An interrupt lets the keyboard signal only when an event needs attention.",
      "Interrupts can reduce wasted CPU time for unpredictable input.",
      "Polling may be simpler, but frequent checks can be inefficient.",
      "A strong answer states the device action, the CPU behaviour and the consequence.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "What is the name for a signal that causes the processor to pause normal execution?", accepted: ["interrupt", "an interrupt"], answer: "Interrupt" },
  { id: "p2", prompt: "What does ISR stand for?", accepted: ["interrupt service routine", "an interrupt service routine"], answer: "Interrupt service routine" },
  { id: "p3", prompt: "Before running an ISR, what must the CPU save so it can resume later?", accepted: ["state", "processor state", "cpu state", "program state", "context", "pc registers and flags", "program counter registers and status flags"], answer: "The processor state, such as PC, registers and status flags" },
  { id: "p4", prompt: "Which register must be saved because it holds the address of the next instruction?", accepted: ["pc", "program counter", "the program counter"], answer: "Program counter / PC" },
  { id: "p5", prompt: "What routine handles a specific interrupt?", accepted: ["isr", "interrupt service routine"], answer: "ISR / interrupt service routine" },
  { id: "p6", prompt: "What is the term for repeatedly checking a device status instead of waiting for a signal?", accepted: ["polling"], answer: "Polling" },
  { id: "p7", prompt: "After the ISR finishes, what happens to the saved state?", accepted: ["restored", "it is restored", "state is restored", "processor state is restored", "cpu state is restored"], answer: "It is restored" },
  { id: "p8", prompt: "A timer interrupt can help an OS share CPU time between what?", accepted: ["processes", "tasks", "programs", "processes or tasks", "tasks or processes"], answer: "Processes / tasks" },
  { id: "p9", prompt: "Can all interrupts be ignored or disabled? Answer yes or no.", accepted: ["no"], answer: "No" },
  { id: "p10", prompt: "What type of interrupt cannot normally be ignored: maskable or non-maskable?", accepted: ["non maskable", "non-maskable", "nonmaskable", "non maskable interrupt", "non-maskable interrupt"], answer: "Non-maskable interrupt" },
];

const mistakes = [
  {
    wrong: "An interrupt means the processor has crashed.",
    fix: "An interrupt is a signal requesting attention. It may be caused by normal I/O, a timer, software or a fault; it does not automatically mean a crash.",
  },
  {
    wrong: "The CPU starts the ISR immediately in the middle of the current instruction.",
    fix: "For most maskable interrupts, the CPU finishes the current instruction, then checks and accepts the interrupt.",
  },
  {
    wrong: "The ISR replaces the interrupted program.",
    fix: "The ISR temporarily handles the event. The saved state is restored so the interrupted program can continue, unless the handler decides otherwise.",
  },
  {
    wrong: "Polling and interrupts are the same because both involve devices.",
    fix: "Polling means the CPU repeatedly checks the device. Interrupts let the device signal the CPU when attention is needed.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "5 marks",
    prompt: "Describe the sequence of events when a processor accepts an interrupt.",
    answer: "The processor completes the current instruction, checks or recognises that an interrupt is pending, saves the current processor state such as the program counter, registers and status flags, locates and runs the appropriate interrupt service routine, then restores the saved state and returns to the interrupted program.",
    marking: [
      { mark: "B1", text: "current instruction is completed before the interrupt is serviced" },
      { mark: "B1", text: "interrupt is checked/recognised/accepted by the processor" },
      { mark: "B1", text: "processor state is saved, including valid examples such as PC/registers/status flags" },
      { mark: "B1", text: "appropriate ISR/interrupt handler is located and executed" },
      { mark: "B1", text: "saved state is restored and the original program resumes/returns" },
    ],
    strict: [
      "Do not award full sequence credit if state saving is omitted.",
      "Do not accept 'the CPU stops forever' as resume/return.",
      "Allow context save/context restore as equivalent to processor state saving/restoring.",
    ],
  },
  {
    title: "Question 2",
    marks: "4 marks",
    prompt: "Explain why a processor must save its state before running an interrupt service routine.",
    answer: "The processor state contains the information needed to continue the interrupted program, such as the program counter, registers and status flags. Saving this state before running the ISR prevents the ISR from overwriting important values. After the ISR finishes, the saved state can be restored so the original program can continue from the correct point with the correct data.",
    marking: [
      { mark: "B1", text: "state contains information needed to continue the interrupted program" },
      { mark: "B1", text: "valid examples of state such as PC, registers or status flags" },
      { mark: "B1", text: "prevents loss/overwriting of current program information" },
      { mark: "B1", text: "allows execution to resume from the correct point after the ISR" },
    ],
    strict: [
      "Do not accept vague 'so it remembers things' without linking to continuation/resume.",
      "Do not require stack terminology, but allow stack as where state may be saved.",
      "Allow 'context' for state if clearly processor/program context.",
    ],
  },
  {
    title: "Question 3",
    marks: "5 marks",
    prompt: "Compare interrupt-driven input with polling for handling keyboard input.",
    answer: "With interrupt-driven input, the keyboard sends an interrupt when a key is pressed, so the CPU can continue other work until attention is required. The CPU then saves state, runs the keyboard ISR and resumes. With polling, the CPU repeatedly checks the keyboard status to see whether a key has been pressed. Polling can waste processor time if no input is available, while interrupts are usually more efficient for unpredictable input.",
    marking: [
      { mark: "B1", text: "interrupt-driven input lets the device signal the CPU when an event occurs" },
      { mark: "B1", text: "CPU can do other work until the interrupt occurs" },
      { mark: "B1", text: "interrupt handling involves ISR/state save/resume or equivalent" },
      { mark: "B1", text: "polling means CPU repeatedly checks device/status flag" },
      { mark: "B1", text: "polling may waste CPU time or interrupts can be more efficient for unpredictable events" },
    ],
    strict: [
      "Do not accept 'polling is asking people questions' without device/status context.",
      "Do not award efficiency mark unless CPU time/work is referenced.",
      "Allow a balanced answer that notes polling is simpler for some systems.",
    ],
  },
  {
    title: "Question 4",
    marks: "4 marks",
    prompt: "A printer sends an interrupt to a processor. Explain the role of the interrupt service routine.",
    answer: "The printer interrupt service routine is the handler that deals with the printer event. It may check the printer status, send or prepare the next data item, acknowledge or clear the interrupt and return control to the interrupted program after the processor state is restored.",
    marking: [
      { mark: "B1", text: "ISR is a routine/program/handler for a specific interrupt" },
      { mark: "B1", text: "checks/responds to printer status or printer event" },
      { mark: "B1", text: "performs an appropriate action such as sending/preparing data or clearing/acknowledging interrupt" },
      { mark: "B1", text: "returns control/allows return to interrupted program after handling" },
    ],
    strict: [
      "Do not accept 'the ISR is the interrupt signal' because ISR is a routine, not the signal.",
      "Do not require exact printer-buffer terminology.",
      "Allow 'driver routine' only if the interrupt-handling role is clear.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "Explain interrupt priority and distinguish between maskable and non-maskable interrupts.",
    answer: "Interrupt priority is used when more than one interrupt needs attention, so the processor can handle the most urgent one first. A lower-priority interrupt may wait until a higher-priority interrupt has been serviced. A maskable interrupt can be disabled or delayed by the processor, often because it is less urgent. A non-maskable interrupt cannot normally be ignored and is used for critical events such as serious hardware faults.",
    marking: [
      { mark: "B1", text: "priority ranks interrupts by urgency/importance" },
      { mark: "B1", text: "higher-priority interrupt may be serviced before lower-priority interrupt" },
      { mark: "B1", text: "lower-priority interrupt may wait/be delayed" },
      { mark: "B1", text: "maskable interrupt can be disabled/ignored/delayed" },
      { mark: "B1", text: "non-maskable interrupt cannot normally be ignored/disabled" },
      { mark: "B1", text: "valid critical event example for non-maskable interrupt" },
    ],
    strict: [
      "Do not accept 'priority means faster CPU clock speed'.",
      "Do not accept 'maskable means hidden from the user' unless disabling/delaying is also stated.",
      "Allow NMI abbreviation if expanded or clearly explained.",
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
    save: "Correct. The processor handles the event without losing the current program's place.",
    delete: "No. Interrupts should not destroy the current program. State saving exists for a reason.",
    ignore: "No. Interrupts are used because devices may need attention before the current program naturally finishes.",
    random: "No. The ISR address is found in a controlled way, not by a lucky dip through memory.",
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
  const select = document.querySelector("#interruptInput");
  const result = document.querySelector("#simulateResult");
  const method = document.querySelector("#simulateMethod");
  const trap = document.querySelector("#simulateTrap");
  function simulate() {
    const item = interruptMap[select.value];
    result.textContent = item.result;
    method.innerHTML = `<strong>Trace:</strong> ${item.method}`;
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
  renderExample("keyboard");
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
