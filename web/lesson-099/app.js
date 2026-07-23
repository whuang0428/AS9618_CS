const sorterMap = {
  split: {
    topic: "Decomposition",
    detail: "The large booking problem is being divided into sub-problems that can be planned and tested separately.",
  },
  ignore: {
    topic: "Abstraction",
    detail: "The printed ticket colour does not change the algorithm's input, process, output or constraints.",
  },
  keep: {
    topic: "Abstraction",
    detail: "PlacesLeft is relevant because it changes whether the booking should be accepted or rejected.",
  },
  bad: {
    topic: "Trap",
    detail: "A module should have a useful purpose. Splitting every assignment line creates noise, not a clearer design.",
  },
};

const filterItems = [
  { id: "places", text: "PlacesLeft in an event booking system", keep: true, reason: "It controls whether the booking can be accepted." },
  { id: "poster", text: "Poster colour used to advertise the event", keep: false, reason: "It does not affect the booking algorithm." },
  { id: "age", text: "StudentAge when only ages 11-18 are allowed", keep: true, reason: "It is needed for validation." },
  { id: "desk", text: "The desk where the organiser sits", keep: false, reason: "It is real-world context but not part of the algorithm." },
  { id: "price", text: "TicketPrice used to calculate TotalCost", keep: true, reason: "It affects the calculation and output." },
  { id: "logo", text: "School logo shape on the ticket", keep: false, reason: "It does not change any processing step in the algorithm." },
];

const scenarioPlans = {
  average: {
    title: "Class average from marks",
    modules: ["Input marks", "Validate each mark is 0-100", "Add valid marks to Total", "Calculate Average", "Output Average"],
    abstraction: "Keep marks, number of marks and valid range. Ignore student handwriting, classroom layout and display colour.",
  },
  booking: {
    title: "Event booking with limited places",
    modules: ["Input booking request", "Validate student details", "Check PlacesLeft", "Calculate TotalCost", "Update PlacesLeft", "Output confirmation"],
    abstraction: "Keep requested tickets, price, age rule and places left. Ignore poster design and room decoration.",
  },
  login: {
    title: "Login attempt check",
    modules: ["Input username and password", "Check blank input", "Compare stored username", "Compare stored password", "Output access decision"],
    abstraction: "Keep entered credentials, stored credentials and attempt result. Ignore keyboard colour and background image.",
  },
  shop: {
    title: "Small shop receipt total",
    modules: ["Input item prices", "Validate price is not negative", "Add price to Total", "Apply discount if needed", "Output receipt total"],
    abstraction: "Keep prices, discount rule and total. Ignore shelf position unless the question uses it as an input.",
  },
};

const examples = {
  average: {
    title: "Example 1: Class average",
    problem: "A program inputs 20 marks and outputs the class average.",
    steps: [
      "Decompose: InputMarks, ValidateMark, CalculateTotal, CalculateAverage, OutputAverage.",
      "Abstract: keep Mark, Count, Total, Average and the 0-100 range.",
      "Ignore: student's name if the average only needs marks; desk order; screen colour.",
      "Cambridge-style plan: Total <- 0, repeat 20 times, input Mark, validate Mark, add Mark to Total, then Average <- Total / 20.",
      "Testing focus: a mark of 0, a mark of 100 and an invalid mark such as 101.",
    ],
  },
  booking: {
    title: "Example 2: Event booking",
    problem: "A student books places for an event. The system must reject a booking if there are not enough places.",
    steps: [
      "Decompose: InputRequest, CheckEligibility, CheckPlaces, CalculateCost, UpdatePlaces, OutputDecision.",
      "Abstract: keep RequestedPlaces, PlacesLeft and TicketPrice because they affect decisions and calculations.",
      "Ignore: poster font, exact colour of the ticket and the organiser's desk.",
      "Selection clue: IF RequestedPlaces <= PlacesLeft THEN accept and update PlacesLeft.",
      "Trap: outputting confirmation before checking places creates a false booking.",
    ],
  },
  login: {
    title: "Example 3: Login check",
    problem: "A user enters a username and password. The program outputs Access granted or Access denied.",
    steps: [
      "Decompose: InputCredentials, ValidateNotBlank, CompareUsername, ComparePassword, OutputResult.",
      "Abstract: keep EnteredUsername, EnteredPassword, StoredUsername and StoredPassword.",
      "Ignore: the shape of the login button; it is interface design, not algorithm logic.",
      "Condition: EnteredUsername = StoredUsername AND EnteredPassword = StoredPassword.",
      "Security note: do not print the password as an output.",
    ],
  },
  receipt: {
    title: "Example 4: Receipt total",
    problem: "A shop program inputs item prices until 0 is entered, then outputs the total.",
    steps: [
      "Decompose: InputPrice, CheckSentinel, ValidatePrice, AddToTotal, OutputReceipt.",
      "Abstract: keep Price, Total and sentinel 0.",
      "Ignore: shelf colour and cashier name unless the question makes them required outputs.",
      "Stopping condition: 0 ends input and must not be added to Total.",
      "Trace focus: test with 2.50, 1.50, 0 to output 4.00.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "What term means splitting a problem into smaller sub-problems?", accepted: ["decomposition"], answer: "Decomposition" },
  { id: "p2", prompt: "What term means keeping relevant details and ignoring irrelevant details?", accepted: ["abstraction"], answer: "Abstraction" },
  { id: "p3", prompt: "In a booking system, should PlacesLeft be kept or ignored?", accepted: ["kept", "keep"], answer: "Keep it because it affects whether a booking is accepted." },
  { id: "p4", prompt: "In an average mark algorithm, name one useful sub-problem.", accepted: ["input marks", "inputmarks", "validate marks", "validatemarks", "calculate total", "calculatetotal", "calculate average", "calculateaverage", "output average", "outputaverage", "validate mark", "validatemark"], answer: "Any useful module such as Input marks, Validate marks, Calculate total, Calculate average or Output average." },
  { id: "p5", prompt: "Should poster colour usually be kept in an event-booking algorithm? yes or no.", accepted: ["no"], answer: "No. It normally does not affect the algorithm." },
  { id: "p6", prompt: "Which is a better module name: ProcessData or ValidateMark?", accepted: ["validatemark", "validate mark"], answer: "ValidateMark / Validate mark, because it states a clear purpose." },
  { id: "p7", prompt: "What should you identify before writing sub-problems: required input or decorative detail?", accepted: ["required input", "input", "inputs"], answer: "Required input / inputs." },
  { id: "p8", prompt: "Give one reason decomposition helps testing.", accepted: ["each part can be tested", "test separately", "tested separately", "easier to test", "find errors"], answer: "Each sub-problem can be tested separately, making errors easier to find." },
  { id: "p9", prompt: "Is Java syntax the required Paper 2 pseudocode format? yes or no.", accepted: ["no"], answer: "No. Cambridge-style pseudocode is the exam format." },
  { id: "p10", prompt: "In a receipt algorithm using 0 as a sentinel, should 0 be added to the total? yes or no.", accepted: ["no"], answer: "No. The sentinel stops input and should not be processed as data." },
];

const mistakes = [
  {
    wrong: "I decomposed a program into modules called Part1, Part2 and Part3.",
    fix: "Use meaningful verb-based names such as InputMarks, ValidateMark and CalculateAverage so the purpose is clear.",
  },
  {
    wrong: "I kept the poster colour because it was mentioned in the story.",
    fix: "Only keep a detail if it affects input, processing, output or constraints. Mentioned does not always mean relevant.",
  },
  {
    wrong: "I made every single line of pseudocode a separate module.",
    fix: "A sub-problem should represent a useful task that can be understood and tested, not one tiny statement.",
  },
  {
    wrong: "I started coding the whole solution before deciding the sub-problems.",
    fix: "Plan the sub-problems first. Then write Cambridge-style pseudocode for each part or combine the parts in a clear order.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "4 marks",
    prompt: "A program is required to process event bookings. It must input the number of requested places, check if enough places are available, calculate the total cost and output a booking decision. Decompose this problem into four suitable sub-problems.",
    answer: "Suitable sub-problems include input booking request / requested places, check available places, calculate total cost, update places left and output booking decision. The names should describe the purpose of each part.",
    marking: [
      { mark: "B1", text: "identifies input/request sub-problem" },
      { mark: "B1", text: "identifies check available places / validation sub-problem" },
      { mark: "B1", text: "identifies calculate total cost sub-problem" },
      { mark: "B1", text: "identifies output booking decision/confirmation sub-problem" },
    ],
    strict: [
      "Do not award a mark for vague names such as DoStuff unless purpose is explained.",
      "Allow update PlacesLeft as an additional valid sub-problem.",
      "Do not require procedure syntax.",
    ],
  },
  {
    title: "Question 2",
    marks: "6 marks",
    prompt: "Explain abstraction using the event booking problem. Give two details that should be kept and two details that can be ignored.",
    answer: "Abstraction means selecting details relevant to the algorithm and ignoring irrelevant details. RequestedPlaces and PlacesLeft should be kept because they decide whether the booking is accepted. TicketPrice should also be kept if total cost is required. Poster colour and room decoration can be ignored because they do not change the input, processing, output or constraints.",
    marking: [
      { mark: "B1", text: "defines abstraction as keeping relevant details / ignoring irrelevant details" },
      { mark: "B1", text: "identifies RequestedPlaces or equivalent as relevant" },
      { mark: "B1", text: "identifies PlacesLeft or TicketPrice as relevant" },
      { mark: "B1", text: "identifies a suitable irrelevant detail such as poster colour" },
      { mark: "B1", text: "identifies a second suitable irrelevant detail such as room decoration" },
      { mark: "B1", text: "explains relevance in terms of algorithm logic, not personal preference" },
    ],
    strict: [
      "Do not accept 'important details' alone without saying relevant to the algorithm.",
      "Allow other details if clearly tied to decision, calculation, input or output.",
      "Do not award irrelevant-detail marks for details that affect the stated output.",
    ],
  },
  {
    title: "Question 3",
    marks: "6 marks",
    prompt: "A student decomposes a class-average program into InputMarks, ValidateMark, CalculateTotal, CalculateAverage and OutputAverage. Explain why this decomposition is useful when designing and testing the algorithm.",
    answer: "The decomposition separates the problem into smaller tasks with clear purposes. Input and validation can be checked before marks are used. CalculateTotal and CalculateAverage can be traced with known marks. OutputAverage can be checked against the required output. This makes the algorithm easier to understand, test and correct because errors can be located in one sub-problem.",
    marking: [
      { mark: "B1", text: "states problem is split into smaller tasks/sub-problems" },
      { mark: "B1", text: "links named modules to clear purposes" },
      { mark: "B1", text: "explains validation can be checked before processing" },
      { mark: "B1", text: "explains calculation modules can be traced/tested" },
      { mark: "B1", text: "explains errors can be located/corrected more easily" },
      { mark: "B1", text: "uses the class-average context rather than a generic claim only" },
    ],
    strict: [
      "Do not award repeated vague claims such as 'it is better' without cause.",
      "Allow maintainability/readability if linked to a named sub-problem.",
      "Do not require every listed module to be discussed.",
    ],
  },
  {
    title: "Question 4",
    marks: "5 marks",
    prompt: "A login algorithm uses EnteredUsername, EnteredPassword, StoredUsername and StoredPassword. State whether each is part of the abstraction and explain one detail that should not be included.",
    answer: "All four named values are part of the abstraction because they are required to compare entered credentials with stored credentials. A detail such as the colour of the login button or background image should not be included because it does not affect the comparison or the access decision.",
    marking: [
      { mark: "B1", text: "states EnteredUsername is relevant" },
      { mark: "B1", text: "states EnteredPassword is relevant" },
      { mark: "B1", text: "states stored username/password values are relevant" },
      { mark: "B1", text: "gives a suitable irrelevant interface/detail example" },
      { mark: "B1", text: "explains relevance using comparison/access decision" },
    ],
    strict: [
      "Do not require discussion of hashing/encryption; this is an abstraction question.",
      "Allow credential values/records as a grouped explanation.",
      "Do not accept ignoring passwords because they are private; privacy does not make them irrelevant to this algorithm.",
    ],
  },
  {
    title: "Question 5",
    marks: "5 marks",
    prompt: "Write a short Cambridge-style pseudocode outline for a decomposed mark-processing algorithm using procedures InputMark, ValidateMark and OutputResult. Java syntax is not required.",
    answer: "CALL InputMark(Mark)\nCALL ValidateMark(Mark, IsValid)\nIF IsValid = TRUE THEN\n    CALL OutputResult(Mark)\nELSE\n    OUTPUT \"Invalid mark\"\nENDIF",
    marking: [
      { mark: "B1", text: "uses Cambridge-style CALL/procedure-style outline or clear module calls" },
      { mark: "B1", text: "includes InputMark or input module" },
      { mark: "B1", text: "includes ValidateMark or validation module" },
      { mark: "M1", text: "uses selection based on validation result" },
      { mark: "A1", text: "outputs valid result or invalid message on correct branch" },
    ],
    strict: [
      "Do not penalise if candidate writes PROCEDURE definitions instead of CALL outline, provided modules are clear.",
      "Allow IsValid, Valid or equivalent Boolean flag.",
      "Do not award final style mark for Java-only code.",
    ],
  },
];

function normalise(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ").replace(/[^a-z0-9 ]/g, "");
}

function setupPrint() {
  document.querySelector("#printBtn").addEventListener("click", () => window.print());
}

function setupHook() {
  const feedback = document.querySelector("#hookFeedback");
  const responses = {
    places: "Keep it. PlacesLeft affects whether the booking can be accepted.",
    font: "Ignore it. The poster font does not change the booking algorithm.",
    age: "Keep it if eligibility depends on age. It becomes a validation rule.",
    weather: "Ignore it unless the question explicitly makes weather a condition. Nice photo, not useful logic.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = responses[button.dataset.hook];
    });
  });
}

function setupSorter() {
  const input = document.querySelector("#sorterInput");
  const result = document.querySelector("#sorterResult");
  document.querySelector("#sorterBtn").addEventListener("click", () => {
    const item = sorterMap[input.value];
    result.innerHTML = `<strong>${item.topic}</strong><span>${item.detail}</span>`;
  });
}

function setupFilter() {
  const grid = document.querySelector("#filterGrid");
  grid.innerHTML = filterItems.map((item) => `
    <article class="filter-card">
      <h3>${item.text}</h3>
      <div class="button-row">
        <button type="button" data-filter="${item.id}" data-choice="keep">Keep</button>
        <button type="button" data-filter="${item.id}" data-choice="ignore">Ignore</button>
      </div>
      <p id="filter-${item.id}" aria-live="polite">Choose keep or ignore.</p>
    </article>
  `).join("");

  grid.querySelectorAll("button[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = filterItems.find((entry) => entry.id === button.dataset.filter);
      const chosenKeep = button.dataset.choice === "keep";
      const correct = chosenKeep === item.keep;
      const target = document.querySelector(`#filter-${item.id}`);
      target.innerHTML = `<strong class="${correct ? "mark correct" : "mark incorrect"}">${correct ? "Correct" : "Not quite"}</strong> ${item.reason}`;
    });
  });
}

function setupBuilder() {
  const input = document.querySelector("#scenarioInput");
  const result = document.querySelector("#builderResult");
  document.querySelector("#buildBtn").addEventListener("click", () => {
    const plan = scenarioPlans[input.value];
    result.innerHTML = `
      <strong>${plan.title}</strong>
      <span><strong>Sub-problems:</strong> ${plan.modules.join(" -> ")}</span>
      <span><strong>Abstraction:</strong> ${plan.abstraction}</span>
    `;
  });
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
  document.querySelectorAll("[data-example]").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll("[data-example]").forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");
      renderExample(tab.dataset.example);
    });
  });
  renderExample("average");
}

function setupPractice() {
  const list = document.querySelector("#practiceList");
  list.innerHTML = practice.map((item) => `
    <article class="practice-item">
      <p><strong>${item.id.toUpperCase()}.</strong> ${item.prompt}</p>
      <div class="practice-row">
        <input id="${item.id}" type="text" autocomplete="off" />
        <button class="primary-button" type="button" data-check="${item.id}">Check</button>
      </div>
      <div class="mark" id="${item.id}-mark" aria-live="polite"></div>
      <button class="answer-toggle" type="button" data-answer="${item.id}">Show answer</button>
      <div class="answer-panel" id="${item.id}-answer">${item.answer}</div>
    </article>
  `).join("");

  list.querySelectorAll("[data-check]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = practice.find((entry) => entry.id === button.dataset.check);
      const value = normalise(document.querySelector(`#${item.id}`).value);
      const accepted = item.accepted.map(normalise);
      const isCorrect = accepted.includes(value);
      const mark = document.querySelector(`#${item.id}-mark`);
      mark.textContent = isCorrect ? "Correct" : "Try again, then use Show answer.";
      mark.className = `mark ${isCorrect ? "correct" : "incorrect"}`;
    });
  });

  list.querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#${button.dataset.answer}-answer`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide answer" : "Show answer";
    });
  });
}

function setupMistakes() {
  const grid = document.querySelector("#mistakeGrid");
  grid.innerHTML = mistakes.map((item, index) => `
    <article>
      <p class="wrong"><strong>Mistake ${index + 1}:</strong> ${item.wrong}</p>
      <button class="answer-toggle" type="button" data-fix="${index}">Show correction</button>
      <div class="answer-panel" id="fix-${index}">${item.fix}</div>
    </article>
  `).join("");

  grid.querySelectorAll("[data-fix]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#fix-${button.dataset.fix}`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide correction" : "Show correction";
    });
  });
}

function setupExam() {
  const list = document.querySelector("#examList");
  list.innerHTML = examQuestions.map((question, index) => `
    <article class="exam-card">
      <div class="exam-head">
        <h3>${question.title}</h3>
        <span>${question.marks}</span>
      </div>
      <p>${question.prompt}</p>
      <button class="ms-toggle" type="button" data-ms="${index}">Show MS</button>
      <div class="ms-panel" id="ms-${index}">
        <p><strong>Indicative answer:</strong></p>
        <pre><code>${question.answer}</code></pre>
        <p><strong>Mark scheme:</strong></p>
        <ul>${question.marking.map((point) => `<li><strong>${point.mark}</strong> ${point.text}</li>`).join("")}</ul>
      </div>
    </article>
  `).join("");

  list.querySelectorAll("[data-ms]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#ms-${button.dataset.ms}`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide MS" : "Show MS";
    });
  });
}

setupPrint();
setupHook();
setupSorter();
setupFilter();
setupBuilder();
setupExamples();
setupPractice();
setupMistakes();
setupExam();
