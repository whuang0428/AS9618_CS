const classifierMap = {
  pass: { topic: "Decision requirement", detail: "The plan must compare the mark with the stated pass level and produce one of two required messages." },
  total: { topic: "Fixed quantity", detail: "The plan must account for exactly ten supplied prices and calculate one total." },
  capacity: { topic: "Capacity constraint", detail: "The plan must compare the request with the remaining capacity and reject an oversized request." },
  highest: { topic: "Tracking requirement", detail: "The plan must retain the highest score seen while all supplied scores are considered." },
  validate: { topic: "Range constraint", detail: "The stated range -20 to 50 must be checked before the temperature is accepted for further processing." },
};

const ipocMap = {
  pass: { input: "Mark", process: "Compare Mark with the pass level of 50", output: 'Either "Pass" or "Resit needed"', constraint: "Mark is supplied as an integer from 0 to 100" },
  average: { input: "Five numeric values", process: "Add all five values and divide the total by 5", output: "Average", constraint: "Exactly five values are supplied" },
  valid: { input: "Age", process: "Check whether Age is within the accepted range", output: 'Either "Valid" or "Invalid"', constraint: "Accepted ages are 11 to 18 inclusive" },
  maximum: { input: "Six scores", process: "Compare the supplied scores and retain the largest", output: "Highest score", constraint: "Exactly six scores are supplied" },
};

const examples = {
  pass: { title: "Example 1: pass decision", problem: "A mark produces either Pass or Resit needed.", steps: ["Input: Mark.", "Output: one of the two stated messages.", "Constraint: Mark is an integer from 0 to 100.", "Process: compare Mark with the stated pass level of 50.", "Assumption: one valid mark is supplied."] },
  average: { title: "Example 2: average of five values", problem: "Five values are supplied and their average is required.", steps: ["Input: five numeric values.", "Output: Average.", "Constraint: exactly five values are supplied.", "Process: add the five values, then divide the total by 5.", "Check: the plan accounts for every supplied value and the final division."] },
  validate: { title: "Example 3: accepted age", problem: "State whether an age is within 11 to 18 inclusive.", steps: ["Input: Age.", "Output: Valid or Invalid.", "Constraint: both 11 and 18 are accepted.", "Process: compare the age with both limits.", "Assumption: Age is supplied as a whole number."] },
  max: { title: "Example 4: highest score", problem: "Six supplied scores produce one highest score.", steps: ["Input: six scores.", "Output: Highest score.", "Constraint: exactly six scores are supplied.", "Process: compare the scores while retaining the greatest value.", "Check: no score may be omitted from the plan."] },
};

const practice = [
  { id: "p1", prompt: "What does IPOC stand for?", accepted: ["input process output constraints", "input process output constraint"], answer: "Input, Process, Output, Constraints" },
  { id: "p2", prompt: "Which term describes data supplied to an algorithm?", accepted: ["input", "inputs"], answer: "Input" },
  { id: "p3", prompt: "Which term describes the result produced by an algorithm?", accepted: ["output", "outputs"], answer: "Output" },
  { id: "p4", prompt: "Which term describes a rule or limit such as 0 to 100?", accepted: ["constraint", "constraints"], answer: "Constraint" },
  { id: "p5", prompt: "What term describes something treated as true when planning?", accepted: ["assumption", "assumptions"], answer: "Assumption" },
  { id: "p6", prompt: "Should the required output be defined before choosing a representation? yes or no.", accepted: ["yes"], answer: "Yes" },
  { id: "p7", prompt: "For an average of five values, how many inputs must the plan account for?", accepted: ["5", "five"], answer: "Five" },
  { id: "p8", prompt: "For an accepted range of 11 to 18 inclusive, is 11 accepted? yes or no.", accepted: ["yes"], answer: "Yes" },
  { id: "p9", prompt: "Which IPOC part contains 'calculate the total'?", accepted: ["process", "processing"], answer: "Process" },
  { id: "p10", prompt: "What check confirms that every problem requirement appears in the plan?", accepted: ["completeness", "completeness check", "requirement check"], answer: "A completeness or requirement check" },
];

const mistakes = [
  { wrong: "I planned several calculations but never defined the required result.", fix: "State the output first, then include only processing steps that produce it." },
  { wrong: "I assumed ten values would be supplied, but the problem never says how many.", fix: "Record only supported assumptions. If quantity is unknown, identify it as missing information." },
  { wrong: "My plan says 'process the data' without naming the required transformation.", fix: "Replace vague wording with a precise action such as calculate total, compare with a limit or find the greatest value." },
  { wrong: "The stated range is 0 to 100, but my plan checks only the upper limit.", fix: "Record both the lower and upper limits so the complete constraint is represented." },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "4 marks",
    prompt: "A program receives a Mark and produces Pass when the mark is at least 50. Identify the input, output, process and one constraint.",
    answer: "Input: Mark. Output: Pass or Resit needed. Process: compare Mark with 50 and choose the required message. Constraint: Mark is an integer from 0 to 100.",
    marking: [
      { mark: "B1", text: "identifies Mark as input" },
      { mark: "B1", text: "identifies the required output messages" },
      { mark: "B1", text: "describes comparison with 50" },
      { mark: "B1", text: "states a valid mark range/type constraint" },
    ],
    strict: [
      "Do not accept vague 'number' without linking it to Mark.",
      "Allow equivalent output wording.",
      "Do not award a constraint that merely repeats the output.",
    ],
  },
  {
    title: "Question 2",
    marks: "5 marks",
    prompt: "Construct an IPOC plan for a problem that receives Length and Width and produces the rectangle Area.",
    answer: "Input: Length and Width. Process: multiply Length by Width. Output: Area. Constraints: both dimensions are positive numeric values and use the same unit. Assumption: the shape is a rectangle.",
    marking: [
      { mark: "B1", text: "Length input" },
      { mark: "B1", text: "Width input" },
      { mark: "B1", text: "multiplication process" },
      { mark: "B1", text: "Area output" },
      { mark: "B1", text: "valid constraint or assumption" },
    ],
    strict: [
      "Do not award addition as the area process.",
      "Allow equivalent positive-dimension constraints.",
      "Do not require notation or code.",
    ],
  },
  {
    title: "Question 3",
    marks: "6 marks",
    prompt: "A problem supplies five numbers and requires their average. Describe the inputs, output, constraints and ordered processing steps.",
    answer: "The inputs are five numeric values and the output is their average. Exactly five values are supplied. Add all five values to obtain a total, divide that total by 5, then provide the average.",
    marking: [
      { mark: "B1", text: "identifies five numeric inputs" },
      { mark: "B1", text: "identifies average output" },
      { mark: "B1", text: "states exactly-five constraint" },
      { mark: "B1", text: "adds all values" },
      { mark: "B1", text: "divides total by 5" },
      { mark: "B1", text: "places steps in a coherent order" },
    ],
    strict: [
      "Do not require control-structure notation.",
      "Allow Sum instead of Total.",
      "Do not accept division before the total is formed.",
    ],
  },
  {
    title: "Question 4",
    marks: "5 marks",
    prompt: "A booking system has 30 places. Analyse a request using IPOC and state one assumption that must be confirmed.",
    answer: "Input: RequestedPlaces and PlacesRemaining. Process: compare the request with the remaining capacity and calculate a cost if accepted. Output: accepted/rejected decision and any required cost. Constraint: the request cannot exceed remaining capacity. Assumption to confirm: ticket price or whether partial bookings are allowed.",
    marking: [
      { mark: "B1", text: "identifies booking request input" },
      { mark: "B1", text: "identifies remaining-capacity input" },
      { mark: "B1", text: "describes capacity comparison" },
      { mark: "B1", text: "identifies decision output" },
      { mark: "B1", text: "states a relevant unsupported assumption" },
    ],
    strict: [
      "Do not invent a ticket price as a confirmed fact.",
      "Allow another relevant booking assumption.",
      "Do not require implementation notation.",
    ],
  },
  {
    title: "Question 5",
    marks: "4 marks",
    prompt: "Define an algorithm and explain why 'process the data' alone is not a complete algorithm.",
    answer: "An algorithm is a solution to a problem expressed as a sequence of defined steps. Each step must state an unambiguous action and the sequence must lead from the supplied data to the required result. 'Process the data' does not identify the operation, order or output, so it is not a defined sequence that can be followed.",
    marking: [
      { mark: "B1", text: "states that an algorithm is a solution to a problem" },
      { mark: "B1", text: "states that it is expressed as a sequence of defined steps" },
      { mark: "B1", text: "explains that each step must be unambiguous/capable of being carried out" },
      { mark: "B1", text: "explains that 'process the data' omits the operation, order or required result" },
    ],
    strict: [
      "Do not accept only 'a list of instructions'.",
      "Allow precise equivalent wording for defined/unambiguous steps.",
      "Do not award an example that never defines the term algorithm.",
    ],
  },
];

function normalise(value) { return value.trim().toLowerCase().replace(/\s+/g, " ").replace(/ ;$/, ";"); }
function setupPrint() { document.querySelector("#printBtn").addEventListener("click", () => window.print()); }
function setupHook() {
  const feedback = document.querySelector("#hookFeedback");
  const responses = { input: "Fault: required input or assumption is missing.", output: "Fault: the plan has activity but no defined result.", constraint: "Fault: a required rule or limit is missing.", process: "Fault: the process needs precise ordered actions, not a vague command." };
  document.querySelectorAll("[data-hook]").forEach((button) => button.addEventListener("click", () => { document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected")); button.classList.add("selected"); feedback.textContent = responses[button.dataset.hook]; }));
}
function setupClassifier() {
  const input = document.querySelector("#classifierInput");
  const result = document.querySelector("#classifyResult");
  const show = () => { const item = classifierMap[input.value]; result.innerHTML = `<strong>${item.topic}</strong><br />${item.detail}`; };
  input.addEventListener("change", show); document.querySelector("#classifyBtn").addEventListener("click", show); show();
}
function setupBuilder() {
  const input = document.querySelector("#problemInput"); const result = document.querySelector("#builderResult");
  const show = () => { const item = ipocMap[input.value]; result.innerHTML = `<strong>Input:</strong> ${item.input}<br /><strong>Process:</strong> ${item.process}<br /><strong>Output:</strong> ${item.output}<br /><strong>Constraint:</strong> ${item.constraint}`; };
  input.addEventListener("change", show); document.querySelector("#buildBtn").addEventListener("click", show); show();
}
function renderExample(key) { const example = examples[key]; document.querySelector("#exampleBox").innerHTML = `<h3>${example.title}</h3><p><strong>Problem:</strong> ${example.problem}</p><ol>${example.steps.map((step) => `<li>${step}</li>`).join("")}</ol>`; }
function setupExamples() { document.querySelectorAll("[data-example]").forEach((button) => button.addEventListener("click", () => { document.querySelectorAll("[data-example]").forEach((item) => item.classList.remove("active")); button.classList.add("active"); renderExample(button.dataset.example); })); renderExample("pass"); }
function renderPractice() {
  const list = document.querySelector("#practiceList");
  list.innerHTML = practice.map((item, index) => `<article class="practice-item"><p><strong>${index + 1}.</strong> ${item.prompt}</p><div class="practice-row"><input type="text" id="${item.id}" autocomplete="off" aria-label="Answer for question ${index + 1}" /><span class="mark" id="${item.id}Mark">Not checked</span></div><button class="answer-toggle" type="button" data-answer="${item.id}">Show answer</button><div class="answer-panel" id="${item.id}Answer"><strong>Answer:</strong> ${item.answer}</div></article>`).join("");
  practice.forEach((item) => { const input = document.querySelector(`#${item.id}`); const mark = document.querySelector(`#${item.id}Mark`); input.addEventListener("input", () => { const value = normalise(input.value); const correct = item.accepted.some((answer) => normalise(answer) === value); mark.textContent = value.length === 0 ? "Not checked" : correct ? "Correct" : "Try again"; mark.classList.toggle("correct", correct); mark.classList.toggle("incorrect", value.length > 0 && !correct); }); });
  document.querySelectorAll("[data-answer]").forEach((button) => button.addEventListener("click", () => { const panel = document.querySelector(`#${button.dataset.answer}Answer`); panel.classList.toggle("visible"); button.textContent = panel.classList.contains("visible") ? "Hide answer" : "Show answer"; }));
}
function renderMistakes() { const grid = document.querySelector("#mistakeGrid"); grid.innerHTML = mistakes.map((item, index) => `<article><p class="wrong"><strong>Weak design ${index + 1}:</strong> ${item.wrong}</p><button class="answer-toggle" type="button" data-fix="fix${index}">Show correction</button><div class="answer-panel" id="fix${index}"><strong>Correction:</strong> ${item.fix}</div></article>`).join(""); document.querySelectorAll("[data-fix]").forEach((button) => button.addEventListener("click", () => { const panel = document.querySelector(`#${button.dataset.fix}`); panel.classList.toggle("visible"); button.textContent = panel.classList.contains("visible") ? "Hide correction" : "Show correction"; })); }
function renderExamQuestions() { const list = document.querySelector("#examList"); list.innerHTML = examQuestions.map((question, index) => `<article class="exam-card"><div class="exam-head"><h3>${question.title}</h3><span>${question.marks}</span></div><p>${question.prompt}</p><button class="ms-toggle" type="button" data-ms="ms${index}">Show MS</button><div class="ms-panel" id="ms${index}"><p><strong>Indicative answer:</strong></p><p>${question.answer}</p><h4>Cambridge-style mark scheme</h4><ul>${question.marking.map((mark) => `<li><strong>${mark.mark}:</strong> ${mark.text}</li>`).join("")}</ul></div></article>`).join(""); document.querySelectorAll("[data-ms]").forEach((button) => button.addEventListener("click", () => { const panel = document.querySelector(`#${button.dataset.ms}`); panel.classList.toggle("visible"); button.textContent = panel.classList.contains("visible") ? "Hide MS" : "Show MS"; })); }
function init() { setupPrint(); setupHook(); setupClassifier(); setupBuilder(); setupExamples(); renderPractice(); renderMistakes(); renderExamQuestions(); }
init();
