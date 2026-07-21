const scenarioMap = {
  student: {
    result: "Suitable: username and password, with recovery controls.",
    method: "For low to medium risk school portal access, passwords are familiar and cheap to manage. A sensible policy and reset process matter.",
    trap: "Do not demand biometrics for every low-risk system; proportionality is part of good security.",
  },
  bank: {
    result: "Suitable: MFA, such as password plus app/token code.",
    method: "Banking is high risk. A password proves something the user knows, while a token/app code proves something the user has.",
    trap: "Do not call two passwords MFA. MFA needs different factor categories.",
  },
  lab: {
    result: "Suitable: biometric plus card/token, depending on policy.",
    method: "A secure door can use a biometric to verify the person and a token/card to prove possession of an issued credential.",
    trap: "Do not ignore false reject and backup access procedures; authorised staff still need a way in when sensors fail.",
  },
  shared: {
    result: "Suitable: individual login, not a shared password.",
    method: "Each user should authenticate separately so activity can be linked to an account and passwords are not shared.",
    trap: "Detailed permissions are Lesson 066 territory; here the key point is identifying the user before access.",
  },
  remote: {
    result: "Suitable: MFA for remote access.",
    method: "Remote access has higher exposure, so a stolen password alone should not be enough to log in.",
    trap: "Do not say MFA prevents all attacks; it reduces account takeover risk and still needs user education and recovery planning.",
  },
};

const examples = {
  password: {
    title: "Example 1: Password login for a school account",
    problem: "A student logs into a homework portal using a username and password.",
    steps: [
      "The username identifies the claimed account.",
      "The password is a credential: something the user knows.",
      "The system compares the entered password with stored verification data, often a hash rather than plaintext.",
      "Weaknesses include guessing, reuse, sharing, phishing and forgotten passwords.",
    ],
  },
  biometric: {
    title: "Example 2: Fingerprint access to a secure room",
    problem: "Staff place a finger on a scanner before entering a restricted room.",
    steps: [
      "The fingerprint is a biometric: something the user is.",
      "It is quick and cannot be forgotten like a password.",
      "It needs hardware sensors and stored biometric templates.",
      "False reject may block a valid user; false accept may allow an unauthorised user.",
    ],
  },
  token: {
    title: "Example 3: One-time code from an authenticator app",
    problem: "A user enters a changing six-digit code during login.",
    steps: [
      "The code is evidence that the user has the token/app device.",
      "A one-time or time-limited code is harder to reuse later.",
      "It can reduce risk if a password has been stolen.",
      "Limitations include lost devices, dead batteries, clock issues and recovery support.",
    ],
  },
  mfa: {
    title: "Example 4: Password plus phone approval for remote access",
    problem: "A remote worker enters a password and approves a login request on a registered phone.",
    steps: [
      "This is MFA because it combines something known with something possessed.",
      "A stolen password alone is not enough for access.",
      "It reduces the risk of unauthorised access from phishing or password reuse.",
      "It can increase friction and needs fallback procedures if the phone is lost.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "What is the term for verifying that a user is who they claim to be?", accepted: ["authentication"], answer: "Authentication" },
  { id: "p2", prompt: "What is the term for deciding what an authenticated user is allowed to access?", accepted: ["authorisation", "authorization"], answer: "Authorisation / authorization" },
  { id: "p3", prompt: "A password is which factor type: know, have or are?", accepted: ["know", "something you know"], answer: "Something you know" },
  { id: "p4", prompt: "A security token is which factor type: know, have or are?", accepted: ["have", "something you have"], answer: "Something you have" },
  { id: "p5", prompt: "A fingerprint is which factor type: know, have or are?", accepted: ["are", "something you are"], answer: "Something you are" },
  { id: "p6", prompt: "What does MFA stand for?", accepted: ["multi factor authentication", "multi-factor authentication", "multifactor authentication"], answer: "Multi-factor authentication" },
  { id: "p7", prompt: "Does password plus PIN necessarily count as MFA? Answer yes or no.", accepted: ["no"], answer: "No. Both are usually something you know." },
  { id: "p8", prompt: "Name one biometric example.", accepted: ["fingerprint", "face", "facial recognition", "iris", "retina", "voice", "typing pattern"], answer: "Fingerprint, face, iris, retina, voice or typing pattern" },
  { id: "p9", prompt: "Name one limitation of biometrics.", accepted: ["false accept", "false reject", "privacy", "sensor", "cost", "cannot be changed", "template"], answer: "False accept/reject, privacy concerns, sensor cost/failure, stored template risk or cannot easily be changed" },
  { id: "p10", prompt: "Name one limitation of tokens.", accepted: ["lost", "stolen", "damaged", "battery", "unavailable", "forgotten", "network"], answer: "Lost, stolen, damaged, unavailable, dead battery, forgotten device or network/app issue" },
];

const mistakes = [
  {
    wrong: "Authentication and authorisation mean the same thing.",
    fix: "Authentication verifies identity. Authorisation decides what an authenticated identity is allowed to access or do.",
  },
  {
    wrong: "A password plus a PIN is always multi-factor authentication.",
    fix: "Usually both are something the user knows. MFA requires different factor categories, such as password plus token.",
  },
  {
    wrong: "Biometrics are always more secure because they cannot be forgotten.",
    fix: "Biometrics are convenient, but they need sensors, can have false accepts/rejects and cannot be changed easily if compromised.",
  },
  {
    wrong: "MFA makes unauthorised access impossible.",
    fix: "MFA reduces risk because one stolen credential is not enough, but recovery weaknesses, phishing and lost tokens can still cause problems.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "5 marks",
    prompt: "Explain the difference between authentication and authorisation.",
    answer: "Authentication verifies that a user is who they claim to be, for example by checking a password, biometric or token. Authorisation happens after identity is established and determines what the user is allowed to access or do. For example, a user may be authenticated as a student but not authorised to edit examination results.",
    marking: [
      { mark: "B1", text: "authentication verifies identity/claim of user" },
      { mark: "B1", text: "valid authentication credential example, e.g. password/biometric/token" },
      { mark: "B1", text: "authorisation controls permitted access/actions/resources" },
      { mark: "B1", text: "authorisation occurs after or depends on authentication" },
      { mark: "B1", text: "clear scenario example distinguishing identity from permissions" },
    ],
    strict: [
      "Do not accept definitions that make both terms identical.",
      "Do not award authorisation mark for only 'logging in'.",
      "Allow authorization spelling.",
    ],
  },
  {
    title: "Question 2",
    marks: "6 marks",
    prompt: "Compare passwords and biometrics as authentication methods.",
    answer: "A password is something a user knows, while a biometric is something a user is, such as a fingerprint or iris pattern. Passwords are cheap and familiar but can be guessed, reused, shared, phished or forgotten. Biometrics are convenient and cannot be forgotten in the same way, but require sensors and stored templates. Biometrics may also falsely reject valid users or falsely accept unauthorised users, and cannot easily be changed if compromised.",
    marking: [
      { mark: "B1", text: "password classified as something user knows" },
      { mark: "B1", text: "biometric classified as something user is with valid example" },
      { mark: "B1", text: "password advantage such as cheap/familiar/easy to implement/change" },
      { mark: "B1", text: "password limitation such as guessed/reused/shared/phished/forgotten" },
      { mark: "B1", text: "biometric advantage such as convenient/not forgotten/hard to share casually" },
      { mark: "B1", text: "biometric limitation such as sensor/templates/privacy/false accept/false reject/cannot change" },
    ],
    strict: [
      "Do not accept 'biometrics are perfect' as an advantage.",
      "Do not award password limitation for vague 'not safe' without mechanism.",
      "Allow face/fingerprint/iris/voice as biometric examples.",
    ],
  },
  {
    title: "Question 3",
    marks: "4 marks",
    prompt: "Explain why multi-factor authentication can reduce the risk of unauthorised access.",
    answer: "Multi-factor authentication requires evidence from two or more different factor categories, such as a password and a token code. If an attacker steals or guesses the password, they still need the second factor. This reduces the risk of account takeover from password reuse or phishing. However, it does not remove all risk because tokens can be lost, stolen or users may still be tricked.",
    marking: [
      { mark: "B1", text: "MFA uses two or more different factor categories" },
      { mark: "B1", text: "valid example with different categories, e.g. password plus token/biometric" },
      { mark: "B1", text: "stolen/guessed password alone is insufficient" },
      { mark: "B1", text: "risk of unauthorised access/account takeover is reduced" },
    ],
    strict: [
      "Do not accept two passwords as MFA unless a different factor is also present.",
      "Do not accept 'makes it impossible to hack' as the risk explanation.",
      "Allow 2FA as a form of MFA when two different factor categories are used.",
    ],
  },
  {
    title: "Question 4",
    marks: "5 marks",
    prompt: "A company issues hardware tokens for remote login. Describe how tokens support authentication and give two limitations.",
    answer: "A hardware token supports authentication by proving the user has a specific issued device or object. It may generate a one-time code or be inserted/tapped during login. This can be combined with a password as a second factor. Limitations include tokens being lost, stolen, damaged, out of battery or unavailable, and the company needing support procedures for replacement and recovery.",
    marking: [
      { mark: "B1", text: "token classified as something user has/possession factor" },
      { mark: "B1", text: "token use described, e.g. one-time code/insert/tap/registered device" },
      { mark: "B1", text: "can be combined with password as second factor/MFA" },
      { mark: "B1", text: "first valid limitation such as lost/stolen/damaged/battery/unavailable" },
      { mark: "B1", text: "second distinct limitation or support/recovery issue" },
    ],
    strict: [
      "Do not accept token as 'something you know'.",
      "Do not award both limitation marks for repeating 'lost' twice.",
      "Allow software token/app if scenario wording is adapted, but hardware token must remain possession-based.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "For each login method, state the authentication factor and one risk: password; fingerprint scan; app-generated one-time code.",
    answer: "A password is something the user knows; a risk is that it may be guessed, reused, shared, phished or forgotten. A fingerprint scan is something the user is; a risk is false rejection, false acceptance, sensor failure, privacy concern or difficulty changing the biometric if compromised. An app-generated one-time code is something the user has because it is produced by a registered device or app; a risk is that the device may be lost, stolen, unavailable or out of battery.",
    marking: [
      { mark: "B1", text: "password factor identified as something known" },
      { mark: "B1", text: "valid password risk" },
      { mark: "B1", text: "fingerprint factor identified as something user is/biometric" },
      { mark: "B1", text: "valid biometric risk" },
      { mark: "B1", text: "one-time app code factor identified as something user has/possession" },
      { mark: "B1", text: "valid token/app code risk" },
    ],
    strict: [
      "Do not award risk marks for repeating only 'not secure'.",
      "Do not classify app code as something known just because the digits are typed; the code is evidence of possession.",
      "Allow 'fingerprint is biometric' for something user is.",
      "Award each method independently.",
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
    mfa: "Correct. Password is something known; phone code is evidence of something possessed.",
    "two-passwords": "No. Two checks are not automatically two factors. Two passwords are usually the same factor category.",
    authorisation: "No. Authorisation controls permissions after identity is established.",
    encryption: "No. Encryption protects data by encoding it; this scenario verifies identity.",
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

function passwordScore(value) {
  let score = 0;
  const notes = [];
  if (value.length >= 12) {
    score += 2;
    notes.push("Good length.");
  } else if (value.length >= 8) {
    score += 1;
    notes.push("Acceptable length, but longer is better.");
  } else {
    notes.push("Too short for a strong password.");
  }
  if (/[A-Z]/.test(value) && /[a-z]/.test(value)) {
    score += 1;
    notes.push("Uses upper and lower case.");
  }
  if (/\d/.test(value)) {
    score += 1;
    notes.push("Includes a digit.");
  }
  if (/[^A-Za-z0-9]/.test(value)) {
    score += 1;
    notes.push("Includes a symbol.");
  }
  if (/password|qwerty|1234|admin|letmein/i.test(value)) {
    score -= 2;
    notes.push("Contains a predictable pattern.");
  }
  return { score: Math.max(0, score), notes };
}

function setupPasswordTool() {
  const input = document.querySelector("#passwordInput");
  const result = document.querySelector("#passwordResult");
  const advice = document.querySelector("#passwordAdvice");
  function check() {
    const value = input.value;
    if (!value) {
      result.textContent = "Enter a practice password.";
      advice.textContent = "Use a fake example only; never type a real password here.";
      return;
    }
    const { score, notes } = passwordScore(value);
    const label = score >= 5 ? "Stronger" : score >= 3 ? "Moderate" : "Weak";
    result.textContent = `${label} practice password`;
    advice.innerHTML = `<strong>Evidence:</strong> ${notes.join(" ") || "No strong features detected."}`;
  }
  input.addEventListener("input", check);
  document.querySelector("#passwordBtn").addEventListener("click", check);
  check();
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
  renderExample("password");
}

function renderPractice() {
  const list = document.querySelector("#practiceList");
  list.innerHTML = practice.map((item) => `
    <article class="practice-item">
      <p><strong>${item.id.toUpperCase()}.</strong> ${item.prompt}</p>
      <div class="practice-row">
        <input type="text" aria-label="Answer for ${item.id}" data-practice="${item.id}" />
        <span class="mark" id="${item.id}Mark">Not checked</span>
      </div>
      <button class="answer-toggle" type="button" data-answer="${item.id}">Show answer</button>
      <div class="answer-panel" id="${item.id}Answer"><strong>Answer:</strong> ${item.answer}</div>
    </article>
  `).join("");

  document.querySelectorAll("[data-practice]").forEach((input) => {
    input.addEventListener("input", () => {
      const item = practice.find((entry) => entry.id === input.dataset.practice);
      const mark = document.querySelector(`#${item.id}Mark`);
      const value = normalise(input.value);
      const correct = item.accepted.some((answer) => value === normalise(answer));
      if (!value) {
        mark.textContent = "Not checked";
        mark.className = "mark";
        return;
      }
      mark.textContent = correct ? "Correct" : "Try again";
      mark.className = correct ? "mark correct" : "mark incorrect";
    });
  });

  document.querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#${button.dataset.answer}Answer`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide answer" : "Show answer";
    });
  });
}

function renderMistakes() {
  document.querySelector("#mistakeGrid").innerHTML = mistakes.map((item, index) => `
    <article>
      <p class="wrong"><strong>Wrong:</strong> ${item.wrong}</p>
      <button class="answer-toggle" type="button" data-fix="${index}">Show correction</button>
      <div class="answer-panel" id="fix${index}"><strong>Correction:</strong> ${item.fix}</div>
    </article>
  `).join("");
  document.querySelectorAll("[data-fix]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#fix${button.dataset.fix}`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide correction" : "Show correction";
    });
  });
}

function renderExam() {
  document.querySelector("#examList").innerHTML = examQuestions.map((item, index) => `
    <article class="exam-card">
      <div class="exam-head">
        <h3>${item.title}</h3>
        <span>${item.marks}</span>
      </div>
      <p>${item.prompt}</p>
      <button class="ms-toggle" type="button" data-ms="${index}">Show MS</button>
      <div class="ms-panel" id="ms${index}">
        <h4>CIE-style mark scheme</h4>
        <p><strong>Model answer:</strong> ${item.answer}</p>
        <ul>${item.marking.map((mark) => `<li><strong>${mark.mark}</strong> ${mark.text}</li>`).join("")}</ul>
        <h4>Strict notes</h4>
        <ul>${item.strict.map((note) => `<li>${note}</li>`).join("")}</ul>
      </div>
    </article>
  `).join("");
  document.querySelectorAll("[data-ms]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#ms${button.dataset.ms}`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide MS" : "Show MS";
    });
  });
}

setupPrint();
setupHook();
setupSimulator();
setupPasswordTool();
setupExamples();
renderPractice();
renderMistakes();
renderExam();
