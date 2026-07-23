const scenarioMap = {
  admin: {
    result: "Best fit: command line interface.",
    method: "An expert user can type a precise command or script to repeat the operation quickly and consistently.",
    trap: "Do not choose GUI only because it looks friendly; repeated expert tasks may be faster with commands.",
  },
  photo: {
    result: "Best fit: graphical user interface.",
    method: "Photo editing benefits from visual feedback, icons, pointer/touch actions and direct manipulation of images.",
    trap: "Do not recommend CLI for a novice visual editing task without a strong reason.",
  },
  atm: {
    result: "Best fit: menu-driven interface.",
    method: "An ATM offers a limited set of safe options such as withdraw, balance and deposit, reducing invalid input.",
    trap: "Do not say menu-driven means the user can type any command.",
  },
  voice: {
    result: "Best fit: natural language interface.",
    method: "The user can speak ordinary language commands, which is useful for hands-free or accessibility-focused interaction.",
    trap: "Do not ignore misinterpretation, noise and ambiguity as limitations.",
  },
  server: {
    result: "Best fit: command line interface.",
    method: "CLI can work well over remote connections, uses little bandwidth and supports precise administrative commands.",
    trap: "Do not require a full graphical desktop for every server task.",
  },
  kiosk: {
    result: "Best fit: menu-driven interface.",
    method: "A kiosk can guide visitors through fixed choices without requiring command knowledge.",
    trap: "Do not assume natural language is best if the set of choices is small and predictable.",
  },
};

const examples = {
  cli: {
    title: "Example 1: CLI for expert administration",
    problem: "A technician needs to rename many files using a repeated pattern.",
    steps: [
      "A command line interface is suitable because commands can include parameters and wildcards.",
      "The task can be automated or repeated with a script.",
      "This is efficient for an expert who knows the command syntax.",
      "A limitation is that commands must be remembered and typing mistakes can cause errors.",
    ],
  },
  gui: {
    title: "Example 2: GUI for a novice editing photos",
    problem: "A novice user needs to crop, rotate and arrange photos.",
    steps: [
      "A GUI is suitable because it uses visual objects such as windows, icons and buttons.",
      "The user can see the photo and manipulate it directly with a mouse or touch.",
      "It is usually easier to learn for common visual tasks.",
      "A limitation is that repetitive batch operations may be slower than using commands.",
    ],
  },
  menu: {
    title: "Example 3: menu-driven ticket machine",
    problem: "A public ticket machine must guide users through buying a train ticket.",
    steps: [
      "A menu-driven interface is suitable because users select from fixed options.",
      "It reduces the need to remember commands.",
      "It can prevent invalid choices by only showing permitted options.",
      "A limitation is that nested menus may be slow if many steps are required.",
    ],
  },
  natural: {
    title: "Example 4: natural language for hands-free control",
    problem: "A driver wants to ask for directions without touching a screen.",
    steps: [
      "A natural language interface is suitable because the user can speak ordinary language.",
      "It supports hands-free interaction and may improve accessibility.",
      "It can be intuitive for simple requests.",
      "A limitation is that noise, accent or ambiguous wording may cause misinterpretation.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Which interface uses typed commands at a prompt?", accepted: ["cli", "command line", "command line interface"], answer: "CLI / command line interface" },
  { id: "p2", prompt: "Which interface uses windows, icons, menus and a pointer?", accepted: ["gui", "graphical user interface", "graphical interface"], answer: "GUI / graphical user interface" },
  { id: "p3", prompt: "Which interface lets users choose from fixed options?", accepted: ["menu driven", "menu-driven", "menu driven interface", "menu-driven interface"], answer: "Menu-driven interface" },
  { id: "p4", prompt: "Which interface uses ordinary spoken or written language?", accepted: ["natural language", "natural language interface", "nli"], answer: "Natural language interface" },
  { id: "p5", prompt: "Which interface is often efficient for expert users and scripts?", accepted: ["cli", "command line", "command line interface"], answer: "CLI" },
  { id: "p6", prompt: "Which interface is common for ATMs and ticket machines?", accepted: ["menu driven", "menu-driven", "menu driven interface", "menu-driven interface"], answer: "Menu-driven interface" },
  { id: "p7", prompt: "Which interface may use more memory and processing power because of visual elements?", accepted: ["gui", "graphical user interface"], answer: "GUI" },
  { id: "p8", prompt: "Name one limitation of natural language interfaces.", accepted: ["misinterpretation", "ambiguous", "ambiguity", "noise", "accent", "may misunderstand", "misunderstand"], answer: "May misinterpret ambiguous language, accents or background noise" },
  { id: "p9", prompt: "Name one advantage of menu-driven interfaces.", accepted: ["reduces errors", "fixed options", "no commands", "guides users", "reduces memorisation", "reduces memorization"], answer: "Guides users with fixed options and reduces memorisation" },
  { id: "p10", prompt: "Does the best interface always depend on the user, task and context? Answer yes or no.", accepted: ["yes"], answer: "Yes" },
];

const mistakes = [
  {
    wrong: "GUI is always best because it has pictures.",
    fix: "GUI is useful for many visual and novice tasks, but CLI may be better for expert users, automation or low-resource remote administration.",
  },
  {
    wrong: "CLI is impossible for users because it has no mouse.",
    fix: "CLI can be efficient for users who know the commands, especially for precise, repeated or automated tasks.",
  },
  {
    wrong: "Menu-driven interfaces let users enter any command they want.",
    fix: "Menu-driven interfaces restrict users to displayed options, which can guide users and reduce invalid input.",
  },
  {
    wrong: "Natural language interfaces always understand exactly what the user means.",
    fix: "Natural language interfaces can misinterpret ambiguous wording, accents, background noise or missing context.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "5 marks",
    prompt: "Compare a command line interface and a graphical user interface.",
    answer: "A command line interface allows the user to type text commands at a prompt. It can be fast for expert users and supports scripts or repeated tasks, but users must remember exact commands and syntax errors can occur. A graphical user interface uses visual objects such as windows, icons, menus and a pointer. It is often easier for novice users and visual tasks, but may use more system resources and can be slower for repetitive expert tasks.",
    marking: [
      { mark: "B1", text: "CLI described as typed/text commands at a prompt" },
      { mark: "B1", text: "valid CLI advantage such as efficiency for experts, scripts or automation" },
      { mark: "B1", text: "valid CLI limitation such as command knowledge/syntax errors" },
      { mark: "B1", text: "GUI described using visual objects such as windows/icons/menus/pointer" },
      { mark: "B1", text: "valid GUI advantage or limitation linked to user/task" },
    ],
    strict: [
      "Do not accept 'CLI is old and GUI is modern' as a technical comparison.",
      "Do not award GUI mark for only saying 'has pictures' without interaction idea.",
      "Allow WIMP terminology for GUI.",
    ],
  },
  {
    title: "Question 2",
    marks: "4 marks",
    prompt: "Explain why a menu-driven interface is suitable for a cash machine.",
    answer: "A menu-driven interface presents a fixed set of options such as withdraw cash, check balance or deposit. Users do not need to remember commands. Invalid choices can be reduced because only available options are shown. The interface can guide many different users through a simple sequence of steps, although it may be slow if many menus are required.",
    marking: [
      { mark: "B1", text: "menu-driven interface presents fixed/displayed options" },
      { mark: "B1", text: "users do not need to remember commands / easier for public users" },
      { mark: "B1", text: "reduces invalid choices/input errors" },
      { mark: "B1", text: "guides users through a simple sequence suitable for a public cash machine" },
    ],
    strict: [
      "Do not accept CLI advantages for this public-user scenario unless justified.",
      "Do not require the exact words cash machine if ATM context is clear.",
      "Allow step-by-step guidance as a valid reason.",
    ],
  },
  {
    title: "Question 3",
    marks: "5 marks",
    prompt: "A company is choosing an interface for technicians managing remote servers. Justify a suitable interface.",
    answer: "A command line interface is suitable because technicians are likely to be expert users who know the commands. CLI can use fewer system resources and less bandwidth than a full graphical desktop, which is useful for remote server access. Commands can be precise and repeated or scripted for administration tasks. A limitation is that commands and syntax must be known, and typing mistakes may cause errors.",
    marking: [
      { mark: "B1", text: "CLI selected as suitable interface" },
      { mark: "B1", text: "technicians/expert users can use known commands" },
      { mark: "B1", text: "uses fewer resources or less bandwidth than GUI" },
      { mark: "B1", text: "supports precise/repeated/scripted administration tasks" },
      { mark: "B1", text: "valid limitation such as command memorisation or syntax errors" },
    ],
    strict: [
      "Do not award full marks for choosing GUI unless scenario-linked reasons are strong.",
      "Do not accept 'CLI is more professional' without mechanism.",
      "Allow remote administration as scenario link.",
    ],
  },
  {
    title: "Question 4",
    marks: "4 marks",
    prompt: "Describe one advantage and one limitation of a natural language interface.",
    answer: "A natural language interface allows users to speak or type instructions using ordinary language. One advantage is that it can be intuitive or hands-free, which can help accessibility or use while driving. One limitation is that it may misinterpret ambiguous wording, accents, background noise or missing context, so the wrong action may be taken.",
    marking: [
      { mark: "B1", text: "natural language interface uses ordinary spoken/written language" },
      { mark: "B1", text: "valid advantage such as intuitive, hands-free or accessible" },
      { mark: "B1", text: "valid limitation such as ambiguity, accent, noise or context" },
      { mark: "B1", text: "limitation consequence explained, such as misunderstanding/wrong action" },
    ],
    strict: [
      "Do not accept 'it talks' without user-language interaction.",
      "Do not accept 'always understands people' as an advantage.",
      "Allow voice interface examples if natural language is clear.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "For each scenario, choose a suitable interface and justify it: expert batch file task; public museum kiosk; novice arranging photos.",
    answer: "For an expert batch file task, a CLI is suitable because typed commands or scripts can carry out repeated operations efficiently. For a public museum kiosk, a menu-driven interface is suitable because visitors can choose from fixed options without learning commands. For a novice arranging photos, a GUI is suitable because visual objects and pointer/touch actions allow direct manipulation of images. In each case the suitability depends on the user's skill and the task.",
    marking: [
      { mark: "B1", text: "CLI selected for expert batch file task" },
      { mark: "B1", text: "CLI justification linked to commands/scripts/repeated operations" },
      { mark: "B1", text: "menu-driven interface selected for public kiosk" },
      { mark: "B1", text: "menu justification linked to fixed options/guided public use" },
      { mark: "B1", text: "GUI selected for novice photo task" },
      { mark: "B1", text: "GUI justification linked to visual/direct manipulation or overall suitability conclusion" },
    ],
    strict: [
      "Do not award selection mark without matching the scenario.",
      "Do not accept a single interface for all scenarios unless each is justified separately.",
      "Allow natural language for kiosk only if a strong accessibility scenario is given.",
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
    cli: "Correct. CLI supports precise repeated commands and scripting for expert users.",
    gui: "Not best here. A GUI may be easy for one file, but batch renaming is often faster with commands.",
    menu: "No. A fixed menu with no batch option would slow the task down.",
    natural: "No. Natural language may be convenient, but vague wording is risky for precise batch operations.",
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
  renderExample("cli");
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
